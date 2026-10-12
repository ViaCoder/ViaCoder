import { useLayoutEffect, type RefObject } from 'react'

/** Always above the entire composer; never flip into the editable input area. */
export function composerCommandMenuPosition(anchor: { left: number; top: number; width: number },
  viewport: { left: number; top: number; width: number; height: number }, contentHeight: number) {
  const edge = 8, gap = 6
  const width = Math.max(1, Math.min(anchor.width, viewport.width - edge * 2))
  const bottom = Math.min(anchor.top - gap, viewport.top + viewport.height - edge)
  const maxHeight = Math.max(0, Math.min(400, bottom - viewport.top - edge))
  return {
    left: Math.max(viewport.left + edge, Math.min(anchor.left, viewport.left + viewport.width - edge - width)),
    top: bottom - Math.min(contentHeight, maxHeight), bottom, width, maxHeight,
  }
}

/** Same native top-layer/visualViewport pattern as existing model and permission menus. */
export function useComposerCommandMenu(open: boolean, menu: RefObject<HTMLElement | null>,
  composer: RefObject<HTMLDivElement | null>, close: (restoreFocus: boolean) => void) {
  useLayoutEffect(() => {
    const element = menu.current, anchor = composer.current, view = document.defaultView
    if (!open || !element || !anchor || !view) return
    element.showPopover?.()
    const reposition = () => {
      const visual = view.visualViewport
      const viewport = { left: visual?.offsetLeft ?? 0, top: visual?.offsetTop ?? 0,
        width: visual?.width ?? view.innerWidth, height: visual?.height ?? view.innerHeight }
      const rect = anchor.getBoundingClientRect()
      const position = composerCommandMenuPosition(rect, viewport, element.scrollHeight)
      element.style.width = `${position.width}px`
      // Bottom anchoring avoids a measure/reflow loop as wrapped results resize.
      element.style.top = 'auto'
      element.style.bottom = `${view.innerHeight - position.bottom}px`
      element.style.left = `${position.left}px`
      element.style.maxHeight = `${position.maxHeight}px`
    }
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return
      if (element.contains(event.target) || anchor.contains(event.target)) return
      if (event.target instanceof Element && event.target.closest('[data-command-menu-trigger]')) return
      close(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      // Keep App's outer Escape handler from closing this panel during IME cancellation.
      if (event.isComposing || event.keyCode === 229) { event.stopPropagation(); return }
      event.preventDefault(); event.stopPropagation(); close(true)
    }
    reposition()
    view.addEventListener('resize', reposition)
    view.addEventListener('scroll', reposition, true)
    view.visualViewport?.addEventListener('resize', reposition)
    view.visualViewport?.addEventListener('scroll', reposition)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(reposition)
    observer?.observe(anchor); observer?.observe(element)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape, true)
    return () => {
      observer?.disconnect()
      view.removeEventListener('resize', reposition)
      view.removeEventListener('scroll', reposition, true)
      view.visualViewport?.removeEventListener('resize', reposition)
      view.visualViewport?.removeEventListener('scroll', reposition)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape, true)
      element.hidePopover?.()
    }
  }, [open, menu, composer, close])
}
