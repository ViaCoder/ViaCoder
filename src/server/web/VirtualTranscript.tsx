import React, { useCallback, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { RecordView } from './records.js'

const ESTIMATED_HEIGHT = 112
const OVERSCAN_PX = 900

/** A measured window, not a truncated transcript. Rows outside the viewport remain addressable by ID. */
export type VirtualTranscriptProps = {
  records: RecordView[]
  renderRecord: (record: RecordView) => React.ReactNode
  scrollRef?: React.RefObject<HTMLDivElement | null>
  handleRef?: React.Ref<VirtualTranscriptHandle>
  /** Keep unresolved interactive cards mounted even when outside the window. */
  preserveIds?: ReadonlySet<string>
  resetKey: string
  loading?: boolean
  loadingOlder?: boolean
  hasOlder?: boolean
  onReachStart?: () => void
  onPinnedChange?: (pinned: boolean) => void
  onAnchorChange?: (anchor: { id: string; offset: number } | null) => void
  className?: string
  children?: React.ReactNode
}
export type VirtualTranscriptHandle = { scrollToId: (id: string, align?: 'start' | 'center' | 'end') => boolean;
  scrollToEnd: () => void }

function lowerBound(prefix: number[], value: number): number {
  let low = 0, high = prefix.length - 1
  while (low < high) {
    const mid = (low + high) >>> 1
    if (prefix[mid]! <= value) low = mid + 1
    else high = mid
  }
  return Math.max(0, low - 1)
}

function MeasuredRow({ id, top, onSize, children }: { id: string; top: number;
  onSize: (id: string, height: number) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = ref.current
    if (!element || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(entries => {
      onSize(id, Math.max(1, Math.ceil(entries[0]?.borderBoxSize?.[0]?.blockSize ?? element.getBoundingClientRect().height)))
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [id, onSize])
  return <div ref={ref} data-virtual-id={id} style={{ position: 'absolute', left: 0, right: 0, top,
    minHeight: 1, paddingInline: 'inherit', boxSizing: 'border-box' }}>{children}</div>
}

export function VirtualTranscript({ records, renderRecord, scrollRef, handleRef, preserveIds, resetKey, loading = false,
  loadingOlder = false, hasOlder = false, onReachStart, onPinnedChange, onAnchorChange,
  className = '', children }: VirtualTranscriptProps) {
  const internalRef = useRef<HTMLDivElement>(null)
  const heights = useRef(new Map<string, number>())
  const lastKey = useRef(resetKey)
  const pinned = useRef(true)
  const lastScrollTop = useRef(0)
  const programmaticTarget = useRef<number | null>(null)
  const anchor = useRef<{ id: string; offset: number } | null>(null)
  const [revision, setRevision] = useState(0)
  const [view, setView] = useState({ top: 0, height: 650 })
  const viewportWidth = useRef(0)
  const viewport = () => scrollRef?.current ?? internalRef.current

  if (lastKey.current !== resetKey) {
    lastKey.current = resetKey
    heights.current.clear()
    pinned.current = true
    lastScrollTop.current = 0
    programmaticTarget.current = null
    anchor.current = null
  }

  const ids = useMemo(() => records.map(row => row.id), [records])
  const indexById = useMemo(() => new Map(ids.map((id, index) => [id, index])), [ids])
  const prefix = useMemo(() => {
    const values = new Array<number>(ids.length + 1)
    values[0] = 0
    for (let i = 0; i < ids.length; i++) values[i + 1] = values[i]! + (heights.current.get(ids[i]!) ?? ESTIMATED_HEIGHT)
    return values
  }, [ids, revision])
  const totalHeight = prefix.at(-1) ?? 0
  const start = Math.max(0, Math.min(records.length, lowerBound(prefix, Math.max(0, view.top - OVERSCAN_PX))))
  const end = Math.min(records.length, Math.max(start + 1, lowerBound(prefix, view.top + view.height + OVERSCAN_PX) + 2))
  const mountedIndices = useMemo(() => {
    const indices = new Set<number>()
    for (let index = start; index < end; index++) indices.add(index)
    for (const id of preserveIds ?? []) {
      const index = indexById.get(id)
      if (index !== undefined) indices.add(index)
    }
    return [...indices].sort((a, b) => a - b)
  }, [start, end, preserveIds, indexById])

  const capture = useCallback(() => {
    const el = viewport()
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100
    const programmatic = programmaticTarget.current !== null &&
      Math.abs(el.scrollTop - programmaticTarget.current) < 2
    programmaticTarget.current = null
    // A ResizeObserver may increase scrollHeight without a user scroll. Keep
    // the prior pin in that case; otherwise long rows leave the tail stranded.
    if (atBottom) pinned.current = true
    else if (!programmatic && Math.abs(el.scrollTop - lastScrollTop.current) > 2) pinned.current = false
    lastScrollTop.current = el.scrollTop
    onPinnedChange?.(pinned.current)
    const first = Math.min(records.length - 1, lowerBound(prefix, el.scrollTop))
    const value = !pinned.current && first >= 0 && records[first]
      ? { id: records[first]!.id, offset: prefix[first]! - el.scrollTop } : null
    anchor.current = value
    onAnchorChange?.(value)
    setView({ top: el.scrollTop, height: el.clientHeight })
    if (el.scrollTop < 700 && hasOlder && !loadingOlder) onReachStart?.()
  }, [records, prefix, onPinnedChange, onAnchorChange, hasOlder, loadingOlder, onReachStart, scrollRef])
  useImperativeHandle(handleRef, () => ({
    scrollToId(id, align = 'center') {
      const el = viewport(), index = ids.indexOf(id)
      if (!el || index < 0) return false
      const height = prefix[index + 1]! - prefix[index]!
      const offset = align === 'center' ? (el.clientHeight - height) / 2 : align === 'end' ? el.clientHeight - height : 0
      pinned.current = false
      programmaticTarget.current = Math.max(0, prefix[index]! - offset)
      el.scrollTop = Math.max(0, prefix[index]! - offset)
      capture()
      return true
    },
    scrollToEnd() { const el = viewport(); if (el) { pinned.current = true; programmaticTarget.current = el.scrollHeight;
      el.scrollTop = el.scrollHeight; capture() } },
  }), [ids, prefix, scrollRef, capture])

  // Preserve the first visible record across a prepend or a dynamic-height correction.
  const priorLayout = useRef<{ key: string }>({ key: resetKey })
  useLayoutEffect(() => {
    const el = viewport()
    const previous = priorLayout.current
    if (el) {
      if (previous.key !== resetKey) { programmaticTarget.current = Math.max(0, totalHeight - el.clientHeight);
        el.scrollTop = programmaticTarget.current }
      else if (pinned.current) { programmaticTarget.current = Math.max(0, totalHeight - el.clientHeight);
        el.scrollTop = programmaticTarget.current }
      else if (anchor.current) {
        const index = ids.indexOf(anchor.current.id)
        if (index >= 0) { programmaticTarget.current = Math.max(0, prefix[index]! - anchor.current.offset);
          el.scrollTop = programmaticTarget.current }
      }
      lastScrollTop.current = el.scrollTop
      setView(current => current.top === el.scrollTop && current.height === el.clientHeight
        ? current : { top: el.scrollTop, height: el.clientHeight })
    }
    priorLayout.current = { key: resetKey }
  }, [ids, prefix, resetKey, totalHeight])

  useLayoutEffect(() => {
    const el = viewport()
    if (!el || typeof ResizeObserver === 'undefined') return
    viewportWidth.current = el.clientWidth
    const observer = new ResizeObserver(() => {
      if (el.clientWidth !== viewportWidth.current) {
        viewportWidth.current = el.clientWidth
        // Wrapped text changes height even for rows currently offscreen.
        heights.current.clear()
        setRevision(value => value + 1)
      }
      setView(current => current.height === el.clientHeight && current.top === el.scrollTop
        ? current : { top: el.scrollTop, height: el.clientHeight })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [scrollRef, resetKey])

  const onSize = useCallback((id: string, height: number) => {
    if (heights.current.get(id) === height) return
    heights.current.set(id, height)
    setRevision(value => value + 1)
  }, [])

  return <div ref={element => { internalRef.current = element; if (scrollRef) (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = element }}
    className={`transcript ${className}`.trim()} onScroll={capture} data-virtual-transcript="true"
    style={{ overflowAnchor: 'none' }}>
    {loading && <div className="history-loading" role="status" style={{ position: 'sticky', top: 0, zIndex: 2 }}>正在读取历史…</div>}
    {loadingOlder && <div className="history-older" role="status" style={{ position: 'sticky', top: 0, zIndex: 2,
      minHeight: 28, background: 'var(--canvas, #fff)', textAlign: 'center' }}>正在读取更早记录…</div>}
    <div className="transcript-inner" style={{ position: 'relative', height: totalHeight, paddingBlock: 0 }} data-total-records={records.length} data-rendered-records={mountedIndices.length}>
      {mountedIndices.map(index => {
        const record = records[index]!
        return <MeasuredRow key={record.id} id={record.id} top={prefix[index]!} onSize={onSize}>
          {renderRecord(record)}
        </MeasuredRow>
      })}
    </div>
    {children}
  </div>
}
