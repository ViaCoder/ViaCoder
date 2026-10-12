import { useEffect, useLayoutEffect, useId, useRef, useState } from 'react'

export type PermissionPickerMode = 'default' | 'acceptEdits' | 'plan' | 'dontAsk' | 'bypassPermissions' | 'auto'

export type PermissionModePickerProps = {
  /** Stable, actual worker session identity, not a title or capabilities object. */
  sessionId: string
  /** Worker-confirmed mode only; do not optimistically change this prop. */
  currentMode?: string
  busy?: boolean
  disabled?: boolean
  /** Disk/external history has no worker to control. */
  readOnly?: boolean
  availability?: { bypassPermissions?: boolean; auto?: boolean }
  /** Send SDK set_permission_mode to this session; resolve after ACK, reject on error. */
  onChange: (mode: PermissionPickerMode) => Promise<void>
}

const modes: ReadonlyArray<{ mode: PermissionPickerMode; label: string; description: string }> = [
  { mode: 'default', label: '默认', description: '按权限规则执行，需要时请求审批。' },
  { mode: 'acceptEdits', label: '接受编辑', description: '自动批准文件编辑；其他操作仍遵循权限规则。' },
  { mode: 'plan', label: '规划', description: '先分析与规划，不直接执行项目修改。' },
  { mode: 'dontAsk', label: '不询问', description: '不弹出审批；仍需审批的操作直接拒绝，并非跳过权限。' },
  { mode: 'bypassPermissions', label: '跳过权限审批', description: '跳过工具权限审批；仅限执行器已允许的会话，仍受托管限制。' },
  { mode: 'auto', label: 'Auto', description: '由执行器自动评估工具权限；仅在实际资格允许时可用。' },
]

function labelFor(mode?: string): string {
  return modes.find(entry => entry.mode === mode)?.label ?? mode ?? '等待执行器状态'
}

/** Viewport-constrained placement for this menu only; content remains scrollable. */
export function permissionMenuPosition(anchor: {left:number;top:number;bottom:number},
  viewport: {left:number;top:number;width:number;height:number}, contentHeight: number) {
  const edge = 10, gap = 5
  const width = Math.max(1, Math.min(340, viewport.width - edge * 2))
  const below = Math.max(0, viewport.top + viewport.height - edge - anchor.bottom - gap)
  const above = Math.max(0, anchor.top - gap - viewport.top - edge)
  const down = below >= Math.min(contentHeight, 420) || below >= above
  const maxHeight = Math.min(420, down ? below : above)
  const height = Math.min(contentHeight, maxHeight)
  return {
    left: Math.max(viewport.left + edge, Math.min(anchor.left, viewport.left + viewport.width - edge - width)),
    top: Math.max(viewport.top + edge, down ? anchor.bottom + gap : anchor.top - gap - height),
    width, maxHeight,
  }
}

/** The keyed child discards in-flight UI state even on a rapid A → B → A switch. */
export function PermissionModePicker(props: PermissionModePickerProps) {
  if (props.readOnly) return <span className="permission-mode-picker-readonly">权限：{labelFor(props.currentMode)} · 只读历史</span>
  return <WorkerPermissionModePicker key={props.sessionId} {...props} />
}

function WorkerPermissionModePicker({ currentMode, availability, disabled, busy, onChange }: PermissionModePickerProps) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<PermissionPickerMode | null>(null)
  const [error, setError] = useState('')
  const [acknowledged, setAcknowledged] = useState<PermissionPickerMode | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const alive = useRef(true)
  const locked = useRef(false)
  const menuId = useId()
  const unavailable = Boolean(disabled || busy)

  useEffect(() => {
    alive.current = true
    return () => { alive.current = false }
  }, [])

  useEffect(() => { setAcknowledged(null) }, [currentMode])

  useLayoutEffect(() => {
    if (!open || !menu.current || !trigger.current) return
    const element = menu.current, anchor = trigger.current, view = document.defaultView
    if (!view) return
    // Native top layer escapes both the horizontally scrolling header and the
    // settings body's overflow, without moving the menu out of its ARIA owner.
    element.showPopover?.()
    const reposition = () => {
      const visual = view.visualViewport
      const viewport = {left:visual?.offsetLeft ?? 0,top:visual?.offsetTop ?? 0,
        width:visual?.width ?? view.innerWidth,height:visual?.height ?? view.innerHeight}
      const rect = anchor.getBoundingClientRect()
      if (rect.bottom < viewport.top || rect.top > viewport.top + viewport.height ||
        rect.right < viewport.left || rect.left > viewport.left + viewport.width) {
        setOpen(false); return
      }
      element.style.width = `${Math.max(1, Math.min(340, viewport.width - 20))}px`
      const position = permissionMenuPosition(rect, viewport, element.scrollHeight + 2)
      element.style.left = `${position.left}px`
      element.style.top = `${position.top}px`
      element.style.maxHeight = `${position.maxHeight}px`
    }
    reposition()
    view.addEventListener('resize', reposition)
    view.addEventListener('scroll', reposition, true)
    view.visualViewport?.addEventListener('resize', reposition)
    view.visualViewport?.addEventListener('scroll', reposition)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(reposition)
    observer?.observe(anchor); observer?.observe(element)
    return () => {
      observer?.disconnect()
      view.removeEventListener('resize', reposition)
      view.removeEventListener('scroll', reposition, true)
      view.visualViewport?.removeEventListener('resize', reposition)
      view.visualViewport?.removeEventListener('scroll', reposition)
      element.hidePopover?.()
    }
  }, [open])

  function focusOption(button: HTMLButtonElement | null | undefined) {
    button?.focus({preventScroll:true})
    if (!button || !menu.current) return
    // Scroll only the menu, never a header or settings ancestor.
    const item = button.getBoundingClientRect(), box = menu.current.getBoundingClientRect()
    if (item.top < box.top) menu.current.scrollTop -= box.top - item.top
    else if (item.bottom > box.bottom) menu.current.scrollTop += item.bottom - box.bottom
  }

  useEffect(() => {
    if (!open) return
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false)
    }
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
      trigger.current?.focus({preventScroll:true})
    }
    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('keydown', dismissEscape, true)
    const selected = menu.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]:not(:disabled)')
    const first = menu.current?.querySelector<HTMLButtonElement>('[role="menuitemradio"]:not(:disabled)')
    focusOption(selected ?? first)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('keydown', dismissEscape, true)
    }
  }, [open])

  function allowed(mode: PermissionPickerMode): boolean {
    // Older workers omit this capability. Their real control handler remains
    // authoritative; explicit managed/launch denial is never enabled here.
    if (mode === 'bypassPermissions') return availability?.bypassPermissions !== false
    if (mode === 'auto') return availability?.auto === true
    return true
  }

  async function select(mode: PermissionPickerMode) {
    if (!alive.current || locked.current || unavailable || !allowed(mode)) return
    if (mode === currentMode) { setOpen(false); trigger.current?.focus({preventScroll:true}); return }
    locked.current = true
    setPending(mode)
    setError('')
    setAcknowledged(null)
    try {
      await onChange(mode)
      if (!alive.current) return
      // An ACK must not steal focus from a draft edited after dismissing us.
      const returnFocus = menu.current?.contains(document.activeElement)
      setAcknowledged(mode)
      setOpen(false)
      if (returnFocus) trigger.current?.focus({preventScroll:true})
    } catch (cause) {
      if (alive.current) setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      if (alive.current) {
        locked.current = false
        setPending(null)
      }
    }
  }

  return <div className="permission-mode-picker" ref={root} aria-busy={pending !== null}>
    <button type="button" className="secondary permission-mode-picker-trigger" ref={trigger}
      aria-haspopup="menu" aria-expanded={open} aria-controls={menuId}
      disabled={unavailable} onClick={() => setOpen(value => !value)}>
      权限：{labelFor(currentMode)} {pending ? '· 切换中…' : '▾'}
    </button>
    {open && <div id={menuId} popover="manual" className="permission-mode-picker-menu" role="menu" aria-label="权限模式" ref={menu}
      onBlur={event => {
        if (event.relatedTarget instanceof Node && !root.current?.contains(event.relatedTarget)) setOpen(false)
      }}
      onKeyDown={event => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        const buttons = Array.from(menu.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]:not(:disabled)') ?? [])
        const index = buttons.findIndex(button => button === document.activeElement)
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1
          : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length
        focusOption(buttons[next])
      }}>
      {modes.filter(entry => entry.mode !== 'auto' || availability?.auto === true).map(entry => {
        const permitted = allowed(entry.mode)
        const reason = entry.mode === 'bypassPermissions'
          ? availability?.bypassPermissions === false ? '当前执行器未允许此模式（启动资格或配置限制）。'
            : availability?.bypassPermissions === undefined ? '资格尚未公布；选择后由执行器校验，可能拒绝。' : ''
          : ''
        return <button key={entry.mode} type="button" role="menuitemradio" aria-checked={entry.mode === currentMode}
          className="permission-mode-picker-option" disabled={unavailable || pending !== null || !permitted}
          onClick={() => { void select(entry.mode) }}>
          <strong>{entry.label} <code>{entry.mode}</code>{entry.mode === currentMode ? ' ✓' : ''}</strong>
          <small>{entry.description}{reason && ` ${reason}`}</small>
        </button>
      })}
    </div>}
    {pending && <small className="permission-mode-picker-status" role="status">正在请求切换为{labelFor(pending)}，等待执行器确认。</small>}
    {!pending && acknowledged && acknowledged !== currentMode && <small className="permission-mode-picker-status" role="status">执行器已确认请求，等待当前模式同步。</small>}
    {error && <small className="permission-mode-picker-error" role="alert">{error}</small>}
  </div>
}
