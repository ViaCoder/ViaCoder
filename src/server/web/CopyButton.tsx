import React, { useLayoutEffect, useRef, useState } from 'react'
import { copyText, type CopyResult } from './clipboard.js'

export function CopyButton({ value, label = '复制', className }: { value: string; label?: string; className?: string }) {
  const [feedback, setFeedback] = useState<CopyResult | 'pending' | null>(null)
  const generation = useRef(0), busy = useRef(false)
  useLayoutEffect(() => {
    generation.current++
    busy.current = false
    setFeedback(null)
    return () => { generation.current++; busy.current = false }
  }, [value])
  const copy = () => {
    if (busy.current) return
    busy.current = true
    const request = generation.current
    // Invoke before yielding; legacy copying must remain within this user gesture.
    const result = copyText(value)
    setFeedback('pending')
    void result.then(outcome => {
      if (request !== generation.current) return
      busy.current = false
      setFeedback(outcome)
    })
  }
  return <><button type="button" className={className} aria-busy={feedback === 'pending'}
    onPointerDown={event => { if (event.button === 0) event.preventDefault() }}
    onClick={copy} aria-live="polite">{feedback === 'copied' ? '已复制' : feedback === 'pending' ? '复制中…' : label}</button>
    {feedback === 'failed' && <details style={{ maxWidth: '100%', minWidth: 0 }}>
      <summary role="alert" style={{ fontSize: 12 }}>复制失败，请手动选择原文复制</summary>
      <textarea aria-label={`${label}：手动复制原文`} readOnly value={value} rows={4}
        style={{ width: '100%', boxSizing: 'border-box', fontSize: 16 }} />
    </details>}</>
}
