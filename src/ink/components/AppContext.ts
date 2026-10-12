import { createContext } from 'react'
import type {DOMElement} from '../dom.js'
import type {FocusManager} from '../focus.js'
import type {NativeInkSubscriptionsOwner287} from '../officialNativeRenderHost287/native.js'
import type {NativeTerminalImages287} from '../nativeTerminalImages287.js'

export type Props = {
  /**
   * Exit (unmount) the whole Ink app.
   */
  readonly exit: (error?: Error) => void
  readonly focusManager?: FocusManager
  readonly rootNode?: DOMElement
  readonly subscribeLayout?: (listener:()=>void)=>()=>void
  readonly subscribeFrames?: NativeInkSubscriptionsOwner287['subscribeFrames']
  readonly subscribeClicks?: NativeInkSubscriptionsOwner287['subscribeClicks']
  readonly subscribeHoverTracked?: NativeInkSubscriptionsOwner287['subscribeHoverTracked']
  readonly isHoverTracked?: NativeInkSubscriptionsOwner287['isHoverTracked']
  readonly retainFinePointer?: ()=>()=>void
  readonly terminalImages?:NativeTerminalImages287
}

/**
 * `AppContext` is a React context, which exposes a method to manually exit the app (unmount).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const AppContext = createContext<Props>({
  exit() {},
})

// eslint-disable-next-line custom-rules/no-top-level-side-effects
AppContext.displayName = 'InternalAppContext'

export default AppContext
