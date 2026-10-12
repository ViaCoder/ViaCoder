import {createNativeEventHandlerTables287} from '../../plugins/bundled/officialBuiltinConsumer287/native.js'
import type { ClickEvent } from './click-event.js'
import type { PointerEvent } from './pointer-event.js'
import type { FocusEvent } from './focus-event.js'
import type { KeyboardEvent } from './keyboard-event.js'
import type { TerminalEvent } from './terminal-event.js'

// These handlers currently have no concrete emitter in the Ink DOM. Keep the
// event contracts anchored to the real dispatcher base type rather than
// importing non-existent runtime modules or inventing payload fields.
export type PasteEvent = TerminalEvent & { readonly type: 'paste' }
export type ResizeEvent = TerminalEvent & { readonly type: 'resize' }

type KeyboardEventHandler = (event: KeyboardEvent) => void
type FocusEventHandler = (event: FocusEvent) => void
type PasteEventHandler = (event: PasteEvent) => void
type ResizeEventHandler = (event: ResizeEvent) => void
type ClickEventHandler = (event: ClickEvent) => void
type HoverEventHandler = () => void

/**
 * Props for event handlers on Box and other host components.
 *
 * Follows the React/DOM naming convention:
 * - onEventName: handler for bubble phase
 * - onEventNameCapture: handler for capture phase
 */
export type EventHandlerProps = {
  onAction?: (event: TerminalEvent & {readonly action:string;consume():void;readonly consumed:boolean}) => void
  onActionCapture?: (event: TerminalEvent & {readonly action:string;consume():void;readonly consumed:boolean}) => void
  onWheel?: (event: TerminalEvent & {readonly deltaY:number}) => void
  onWheelCapture?: (event: TerminalEvent & {readonly deltaY:number}) => void
  onKeyDown?: KeyboardEventHandler
  onKeyDownCapture?: KeyboardEventHandler

  onFocus?: FocusEventHandler
  onFocusCapture?: FocusEventHandler
  onBlur?: FocusEventHandler
  onBlurCapture?: FocusEventHandler

  onPaste?: PasteEventHandler
  onPasteCapture?: PasteEventHandler

  onResize?: ResizeEventHandler

  onClick?: ClickEventHandler
  onPointer?: (event: PointerEvent) => void
  onMouseEnter?: HoverEventHandler
  onMouseLeave?: HoverEventHandler
}

/**
 * Reverse lookup: event type string → handler prop names.
 * Used by the dispatcher for O(1) handler lookup per node.
 */
export const HANDLER_FOR_EVENT: Record<
  string,
  { bubble?: keyof EventHandlerProps; capture?: keyof EventHandlerProps }
> = {
  ...createNativeEventHandlerTables287().Jp,
  // Existing local resize event support is retained alongside original 287 handlers.
  resize: {bubble:'onResize'},
}

/**
 * Set of all event handler prop names, for the reconciler to detect
 * event props and store them in _eventHandlers instead of attributes.
 */
export const EVENT_HANDLER_PROPS = new Set<string>([
  ...createNativeEventHandlerTables287().Jc,
  'onResize',
])
