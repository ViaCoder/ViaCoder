import { createElement, type ReactNode, type ComponentType } from 'react'
import { ThemeProvider } from './components/design-system/ThemeProvider.js'
import inkRender, {
  type Instance,
  createRoot as inkCreateRoot,
  type RenderOptions,
  type Root,
} from './ink/root.js'

export type { RenderOptions, Instance, Root }

// The public render/createRoot entrypoints share the original kill-ring
// context. Resolve it at actual render time, never during Ink module boot.
// The handle views Cursor's existing owner; it holds no separate ring/state.
const cursorHandle287 = {
  get state() {
    return (require('./utils/Cursor.js') as typeof import('./utils/Cursor.js')).getSharedKillRingState287()
  },
  dispatch(event: Parameters<typeof import('./utils/Cursor.js').dispatchSharedKillRing287>[0]) {
    (require('./utils/Cursor.js') as typeof import('./utils/Cursor.js')).dispatchSharedKillRing287(event)
  },
}
function KillRingRoot287({children}: {children: ReactNode}): ReactNode {
  const Provider = (require('./utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./utils/hooks/modelSwitch287/lifecycleRuntime.js'))
    .getOriginalModsLifecycle287().clearSourceModule287('chunk-6wk6xet4.js').nrt as ComponentType<{handle: typeof cursorHandle287; children?: ReactNode}>
  return createElement(Provider, {handle: cursorHandle287}, children)
}
function withTheme(node: ReactNode): ReactNode {
  return createElement(KillRingRoot287, null, createElement(ThemeProvider, null, node))
}

export async function render(
  node: ReactNode,
  options?: NodeJS.WriteStream | RenderOptions,
): Promise<Instance> {
  const instance = await inkRender(withTheme(node), options)
  return {
    ...instance,
    rerender: next => instance.rerender(withTheme(next)),
  }
}

export async function createRoot(options?: RenderOptions): Promise<Root> {
  const root = await inkCreateRoot(options)
  return {
    ...root,
    render: node => root.render(withTheme(node)),
  }
}

export { color } from './components/design-system/color.js'
export type { Props as BoxProps } from './components/design-system/ThemedBox.js'
export { default as Box } from './components/design-system/ThemedBox.js'
export type { Props as TextProps } from './components/design-system/ThemedText.js'
export { default as Text } from './components/design-system/ThemedText.js'
export {
  ThemeProvider,
  usePreviewTheme,
  useTheme,
  useThemeSetting,
} from './components/design-system/ThemeProvider.js'
export { Ansi } from './ink/Ansi.js'
export type { Props as AppProps } from './ink/components/AppContext.js'
export type { Props as BaseBoxProps } from './ink/components/Box.js'
export { default as BaseBox } from './ink/components/Box.js'
export type {
  ButtonState,
  Props as ButtonProps,
} from './ink/components/Button.js'
export { default as Button } from './ink/components/Button.js'
export type { Props as LinkProps } from './ink/components/Link.js'
export { default as Link } from './ink/components/Link.js'
export type { Props as NewlineProps } from './ink/components/Newline.js'
export { default as Newline } from './ink/components/Newline.js'
export { NoSelect } from './ink/components/NoSelect.js'
export { RawAnsi } from './ink/components/RawAnsi.js'
export { default as Spacer } from './ink/components/Spacer.js'
export type { Props as StdinProps } from './ink/components/StdinContext.js'
export type { Props as BaseTextProps } from './ink/components/Text.js'
export { default as BaseText } from './ink/components/Text.js'
export type { DOMElement } from './ink/dom.js'
export { ClickEvent } from './ink/events/click-event.js'
export { EventEmitter } from './ink/events/emitter.js'
export { Event } from './ink/events/event.js'
export type { Key } from './ink/events/input-event.js'
export { InputEvent } from './ink/events/input-event.js'
export type { TerminalFocusEventType } from './ink/events/terminal-focus-event.js'
export { TerminalFocusEvent } from './ink/events/terminal-focus-event.js'
export { FocusManager } from './ink/focus.js'
export type { FlickerReason } from './ink/frame.js'
export { useAnimationFrame } from './ink/hooks/use-animation-frame.js'
export { default as useApp } from './ink/hooks/use-app.js'
export { default as useInput } from './ink/hooks/use-input.js'
export { useAnimationTimer, useInterval } from './ink/hooks/use-interval.js'
export { useSelection } from './ink/hooks/use-selection.js'
export { default as useStdin } from './ink/hooks/use-stdin.js'
export { useTabStatus } from './ink/hooks/use-tab-status.js'
export { useTerminalFocus } from './ink/hooks/use-terminal-focus.js'
export { useTerminalTitle } from './ink/hooks/use-terminal-title.js'
export { useTerminalViewport } from './ink/hooks/use-terminal-viewport.js'
export { default as measureElement } from './ink/measure-element.js'
export { supportsTabStatus } from './ink/termio/osc.js'
export { default as wrapText } from './ink/wrap-text.js'
