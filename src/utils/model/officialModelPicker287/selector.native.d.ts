import type {ComponentType,ReactNode,Dispatch,SetStateAction} from 'react'
import type {EffortLevel} from '../../effort.js'
import type {SessionEffort,SettingsEffortTable} from '../effortSettings.js'
import type {ModelOption} from '../modelOptions.js'
export type SourceSelectorProps287={initial:string|null;sessionModel?:string|null;onSelect:(model:string|null,effort:EffortLevel|undefined)=>void;onSetDefault?:(model:string|null)=>void;onCancel?:()=>void;isStandaloneCommand?:boolean;showFastModeNotice?:boolean;headerText?:string;options?:ModelOption[]}
export type SourceEffortState287={sessionEffort:SessionEffort;settingsEffortTable:SettingsEffortTable;mainLoopModel?:string}
export function createSelectorSelector287(ports:Record<string,unknown>):{mHe:ComponentType<SourceSelectorProps287>;jte:(options:{canEnter:boolean;startInSearchMode?:boolean})=>{isSearchMode:boolean;query:string;handleKeyDown:(event:unknown)=>void;handlePaste:(event:unknown)=>void;enterSearchMode:()=>void};oOe:(options:ModelOption[],query:string)=>ModelOption[];tOe:(level:EffortLevel,direction:'left'|'right',levels:readonly EffortLevel[],max:boolean,xhigh:boolean)=>EffortLevel;$V:(value:string|undefined)=>{supportsEffort:boolean;supportsMax:boolean;supportsXHigh:boolean;capLevels:EffortLevel[];defaultEffort:EffortLevel};$y:(value:string|undefined)=>string|undefined}
export function createSelectorStateRef287(ports:Record<string,unknown>):{Cc:<T>(value:T|(()=>T))=>[T,Dispatch<SetStateAction<T>>,()=>T]}
export function createSelectorSession287(ports:Record<string,unknown>):{ZHt:(model:string|null|undefined)=>string|null;tDt:(state:{mainLoopModel?:string|null;mainLoopModelForSession?:string|null})=>string|null;vTe:(session:string|null|undefined,initial:string|null)=>string|null;uWt:(model:string|null|undefined,lane:'idle_base'|'runs_turns')=>string|null}
export function createSelectorOptionIdentity287(ports:Record<string,unknown>):{sdn:(options:ModelOption[],model:string)=>string|undefined}
export function createSelectorEffort287(ports:Record<string,unknown>):{B9:(model:string)=>EffortLevel;ZYn:(effort:EffortLevel,model:string)=>boolean;kd:(state:SourceEffortState287,model?:string|null)=>EffortLevel|number|undefined;$ue:(model:string)=>EffortLevel[];jw:(model:string)=>boolean;pQ:(model:string)=>boolean;xXe:(model:string)=>boolean;jC:(enabled:boolean|undefined,model:string)=>boolean;eoe:()=>unknown;b3:(effort:EffortLevel,model:string)=>EffortLevel;aF:(effort:unknown)=>EffortLevel}
export function createSelectorRatchet287(ports:Record<string,unknown>):{eV:ComponentType<{children?:ReactNode;lock?:'always'|'offscreen';restartKey?:unknown}>}
export function createSelectorEmptyMessage287(ports:Record<string,unknown>):{qr:ComponentType<{children?:ReactNode;hint?:ReactNode}>}
export function createSelectorLexical287(ports:Record<string,unknown>):{qj:(model:string)=>boolean;wu:(model:string)=>string}

export function createSelectorDisplay287(ports:Record<string,unknown>):{L8t:()=>boolean}
export function createSelectorTerminal287(ports:Record<string,unknown>):{lk:unknown}
export function createSelectorText287(ports:Record<string,unknown>):{eOe:(count:number,unit?:string)=>string;tOe:(count:number)=>number;zZ:(options?:unknown)=>unknown;Au:(text:string,columns:number,options?:unknown)=>string;nt:(text:string,columns:number)=>string}
export function createSelectorCursor287(ports:Record<string,unknown>):{Ui:unknown}
export function createSelectorListEvents287(ports:Record<string,unknown>):{Ky:()=>unknown;Ynt:()=>unknown}
export function createSelectorList287(ports:Record<string,unknown>):{$e:ComponentType<Record<string,unknown>>}
export type SearchOptions287={isActive:boolean;onExit:()=>void;onCancel?:()=>void;onExitUp?:()=>void;onExitDown?:()=>void;columns?:number;passthroughCtrlKeys?:string[];initialQuery?:string;backspaceExitsOnEmpty?:boolean;multiline?:boolean;honorEditorMode?:boolean}
export type SearchState287={query:string;queryRef:{current:string};setQuery:(value:string)=>void;cursorOffset:number;cursorOffsetRef:{current:number};handleKeyDown:(event:import('../../../ink/events/keyboard-event.js').KeyboardEvent)=>void;handlePaste:(event:{text:string;preventDefault:()=>void})=>void;setCursorOffset:(offset:number)=>void}
export function createSelectorSearch287(ports:Record<string,unknown>):{Fg:(props:SearchOptions287)=>SearchState287}
export function createSelectorHostMap287(ports:Record<string,unknown>):{V:unknown}
export function createSelectorWarnings287(ports:Record<string,unknown>):{rl:()=>{claim:(key:string)=>boolean}}
export function createSelectorAccessibility287(ports:Record<string,unknown>):{MJe:()=>boolean}

export function createSelectorRunning287(ports:Record<string,unknown>):{Qz:(state:{mainLoopModel?:string|null;mainLoopModelForSession?:string|null})=>string}
export interface OriginalFocusManager287 {
 activeElement:import('../../../ink/dom.js').DOMElement|null
 subscribe(listener:()=>void):()=>void
 notify():void
 focus(node:import('../../../ink/dom.js').DOMElement):void
 resolveScope(node:import('../../../ink/dom.js').DOMElement):import('../../../ink/dom.js').DOMElement
 blur():void
 handleNodeRemoved(node:import('../../../ink/dom.js').DOMElement,root:import('../../../ink/dom.js').DOMElement):void
 pushAutoFocusFallback(node:import('../../../ink/dom.js').DOMElement):void
 handleAutoFocus(node:import('../../../ink/dom.js').DOMElement):void
 handleClickFocus(node:import('../../../ink/dom.js').DOMElement):void
 focusNext(root:import('../../../ink/dom.js').DOMElement):void
 focusPrevious(root:import('../../../ink/dom.js').DOMElement):void
 focusDirection(direction:'up'|'down'|'left'|'right',root:import('../../../ink/dom.js').DOMElement):boolean
 moveFocus(direction:1|-1,root:import('../../../ink/dom.js').DOMElement):void
}
export function createSelectorFocus287(ports:{Sze:typeof import('../../../ink/events/event.js').Event}):{zpr:{new(dispatch:(target:import('../../../ink/dom.js').DOMElement,event:import('../../../ink/events/focus-event.js').FocusEvent)=>boolean):OriginalFocusManager287;prototype:OriginalFocusManager287}}

export function createSelectorRefresh287(ports:Record<string,unknown>):{PI:()=>number}
export function createSelectorHidden287(ports:Record<string,unknown>):{ph:ComponentType<{count:number;unit?:string;expandable?:boolean;hiddenChars?:number}>}

export function createSelectorStrings287(ports:Record<string,unknown>):{I:(count:number,singular:string,plural?:string)=>string;ms:(text:string,count:number)=>string}

export function createSelectorFocusHook287(ports:Record<string,unknown>):{Ug:(ref:import('react').RefObject<import('../../../ink/dom.js').DOMElement|null>,active:boolean,blur?:boolean)=>void}
