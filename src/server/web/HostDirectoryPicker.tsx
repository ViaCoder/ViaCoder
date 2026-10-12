import React, { useEffect, useRef, useState } from 'react'
import type { HostDirectoryListing, WebAPI } from './client.js'

/** Browse directories on the serve host only; no browser-local file picker or file-content reads. */
export function HostDirectoryPicker({ api, hostname, initialDirectory, onChoose, onClose }: {
  api: WebAPI; hostname: string; initialDirectory: string; onChoose(path: string): void; onClose(): void
}) {
  const [listing, setListing] = useState<HostDirectoryListing | null>(null)
  const [pathInput, setPathInput] = useState(initialDirectory)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')
  const generation = useRef(0)
  const activeRequest = useRef<AbortController | null>(null)
  const load = async (path: string) => {
    activeRequest.current?.abort()
    const controller = new AbortController(), current = ++generation.current
    activeRequest.current = controller
    setPathInput(path)
    setBusy(true); setError('')
    try {
      const next = await api.directories(path, controller.signal)
      if (controller.signal.aborted || current !== generation.current) return
      setListing(next); setPathInput(next.path)
    } catch (cause) { if (!controller.signal.aborted && current === generation.current) setError((cause as Error).message) }
    finally { if (current === generation.current) { activeRequest.current = null; setBusy(false) } }
  }
  useEffect(() => { void load(initialDirectory); return () => { generation.current++; activeRequest.current?.abort(); activeRequest.current = null } }, [api, initialDirectory])
  return <section className="host-directory-picker action-dialog" role="dialog" aria-modal="true" aria-label="选择主机项目目录">
    <header><div><strong>选择项目目录</strong><small>主机 {hostname} · 仅列目录名称</small></div><button className="secondary" onClick={onClose}>关闭</button></header>
    <form onSubmit={event => { event.preventDefault(); void load(pathInput) }}><label>主机绝对路径<input aria-label="主机绝对路径" value={pathInput} onChange={event => setPathInput(event.target.value)} /></label><button className="secondary" disabled={busy || !pathInput}>打开路径</button></form>
    {busy && <p role="status" className="host-directory-loading">正在读取目录…</p>}
    {error && <p role="alert" className="error-text">{error}</p>}
    {error && listing && <p className="host-directory-stale">下方仍是上次成功读取的目录。</p>}
    {listing && <><div className="host-directory-current"><code>{listing.path}</code><button className="primary" disabled={busy} onClick={() => onChoose(listing.path)}>选用此目录</button></div>
      <div className="host-directory-list" role="list" aria-label="主机子目录">
        {listing.parent && <button role="listitem" disabled={busy} onClick={() => void load(listing.parent!)}>.. · 上级目录</button>}
        {listing.directories.map(item => <button key={`${item.name}-${item.path}`} role="listitem" disabled={busy} onClick={() => void load(item.path)}>{item.name}<span>›</span></button>)}
        {!listing.directories.length && <p>此目录下没有可列出的子目录。</p>}
      </div></>}
  </section>
}
