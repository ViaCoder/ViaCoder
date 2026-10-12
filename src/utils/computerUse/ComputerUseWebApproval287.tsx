import React, { useState } from 'react'
import { computerUseWebRequest287 } from './webApproval287.js'

/** C DOM presentation of the same original request, not an Ink mock. No grant
 * owner is kept here: the existing service first-answer gate and binder merge
 * remain authoritative. View-only historical records are handled by App. */
export function ComputerUseWebApproval287({ input, onAnswer }: {
  input: unknown; onAnswer(allowed: boolean, answer?: Record<string, unknown>): Promise<void>
}) {
  const request = computerUseWebRequest287.safeParse(input)
  const [busy, setBusy] = useState(false), [error, setError] = useState('')
  const respond = async (allow: boolean) => {
    if (busy) return
    setBusy(true); setError('')
    try {
      const r = request.success ? request.data : undefined
      const answer = allow && r ? {
        granted: r.apps.flatMap(a => a.resolved && !a.alreadyGranted ? [{ ...a.resolved, grantedAt: Date.now() }] : []),
        denied: r.apps.filter(a => !a.resolved).map(a => ({ bundleId: a.requestedName, reason: 'not_installed' })),
        flags: { clipboardRead: r.requestedFlags.clipboardRead === true, clipboardWrite: r.requestedFlags.clipboardWrite === true,
          systemKeyCombos: r.requestedFlags.systemKeyCombos === true },
      } : undefined
      await onAnswer(allow, answer)
    } catch (cause) { setError(String(cause)) }
    finally { setBusy(false) }
  }
  return <section className="ask-card" aria-label="Computer Use 应用审批">
    <strong>Computer Use 请求控制这些应用</strong>
    {request.success ? <>
      {request.data.reason && <p>{request.data.reason}</p>}
      <ul>{request.data.apps.map((a, i) => <li key={i}>{a.resolved?.displayName ?? a.requestedName}
        {a.alreadyGranted ? ' · 已授权' : !a.resolved ? ' · 未找到' : ''}</li>)}</ul>
      <p>额外权限：{Object.entries(request.data.requestedFlags).filter(([, value]) => value).map(([key]) => key).join('、') || '无'}</p>
      <p>平台后端可能捕获所有可见窗口；应用授权不表示其它窗口会被隐藏。</p>
      {request.data.tccState && <p>需在桌面主机授予系统辅助功能和屏幕录制权限；网页审批不会授予操作系统权限。</p>}
    </> : <p>请求格式错误；本页不会授予权限。</p>}
    <button className="primary" disabled={busy || !request.success || Boolean(request.success && request.data.tccState)} onClick={() => void respond(true)}>允许本次请求的应用与权限</button>
    <button className="secondary" disabled={busy} onClick={() => void respond(false)}>拒绝</button>
    {error && <p role="alert">{error}</p>}
  </section>
}
