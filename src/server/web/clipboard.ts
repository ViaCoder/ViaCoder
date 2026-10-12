export type CopyResult = 'copied' | 'failed'

/** Must be called directly from the click: the HTTP fallback needs its user gesture. */
export async function copyText(value: string): Promise<CopyResult> {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.clipboard?.writeText === 'function') {
      await navigator.clipboard.writeText(value)
      return 'copied'
    }
    // Do not retry a rejected async API via execCommand: its gesture may have expired.
    return legacyCopy(value) ? 'copied' : 'failed'
  } catch {
    return 'failed'
  }
}

function legacyCopy(value: string): boolean {
  if (typeof document === 'undefined' || !document.body || typeof document.execCommand !== 'function') return false
  const active = document.activeElement as HTMLElement | null
  const input = active && /^(INPUT|TEXTAREA)$/.test(active.tagName) ? active as HTMLInputElement | HTMLTextAreaElement : null
  const inputSelection = input && input.selectionStart !== null
    ? { start: input.selectionStart, end: input.selectionEnd, direction: input.selectionDirection } : null
  const selection = document.getSelection()
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : []
  const direction = selection && { anchor: selection.anchorNode, anchorOffset: selection.anchorOffset, focus: selection.focusNode, focusOffset: selection.focusOffset }
  const scroll = active && { left: active.scrollLeft, top: active.scrollTop }
  const area = document.createElement('textarea')
  area.value = value
  area.readOnly = true
  area.tabIndex = -1
  // Rendered, selectable, but not in document flow; prevent iOS input zoom and scrolling.
  area.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;font-size:16px;pointer-events:none;'
  // A textarea normalizes CRLF. Supply the original string during the native copy event.
  const originalText = (event: ClipboardEvent) => {
    if (event.clipboardData) {
      event.clipboardData.setData('text/plain', value)
      event.preventDefault()
    }
  }
  area.addEventListener('copy', originalText)
  try {
    document.body.appendChild(area)
    area.focus({ preventScroll: true })
    area.select()
    area.setSelectionRange(0, area.value.length)
    return document.execCommand('copy') === true
  } finally {
    area.removeEventListener('copy', originalText)
    area.remove()
    // Restore even on false/throw; never change the actual composer value.
    if (active?.isConnected) {
      active.focus({ preventScroll: true })
      if (input && inputSelection) input.setSelectionRange(inputSelection.start, inputSelection.end, inputSelection.direction ?? undefined)
      if (scroll) { active.scrollLeft = scroll.left; active.scrollTop = scroll.top }
    }
    if (selection) {
      selection.removeAllRanges()
      for (const range of ranges) selection.addRange(range)
      if (ranges.length === 1 && direction?.anchor && direction.focus && typeof selection.setBaseAndExtent === 'function') {
        selection.setBaseAndExtent(direction.anchor, direction.anchorOffset, direction.focus, direction.focusOffset)
      }
    }
  }
}
