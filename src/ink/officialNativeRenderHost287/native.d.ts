import type {DOMElement} from '../dom.js'
import type {ClickEvent} from '../events/click-event.js'
import type {NativeTerminalImages287} from '../nativeTerminalImages287.js'
export interface NativeInkSubscriptionsOwner287 {readonly terminalImages?:NativeTerminalImages287;hoverTrackedListeners:Set<()=>void>;subscribeHoverTracked(listener:()=>void):()=>void;isHoverTracked():boolean;frameListeners:Set<()=>void>;subscribeFrames(listener:()=>void):()=>void;tellFrameListeners():void;clickListeners:Set<(target:DOMElement|null,event:ClickEvent|null)=>void>;subscribeClicks(listener:(target:DOMElement|null,event:ClickEvent|null)=>void):()=>void;tellClickedNowhere():void}
export function installNativeRenderSubscriptions287(owner:NativeInkSubscriptionsOwner287):void
