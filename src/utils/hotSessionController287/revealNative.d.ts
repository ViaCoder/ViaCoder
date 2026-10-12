import type {RefObject} from 'react'
import type {DOMElement} from '../../ink/dom.js'
import type {ScrollBoxHandle} from '../../ink/components/ScrollBox.js'
import type {RenderableMessage} from '../../types/message.js'
import type {Clock} from '../../ink/components/ClockContext.js'
export interface HotRevealHandle287 {
 reveal(uuid:string,block?:'start'|'center'|'end'|'nearest'):Promise<boolean>|null
 release():void
}
export interface HotRevealRows287 {messages:RenderableMessage[];getItemElement(index:number):DOMElement|null;scrollToIndex(index:number):void}
export function createHotTranscriptRevealHook287(ports:Record<string,unknown>):(
 viewport:{readonly handle:ScrollBoxHandle|null},rows:RefObject<HotRevealRows287>,ref:RefObject<HotRevealHandle287|null>|undefined,clock:Clock
)=>{onLayout(mountMissing:boolean):void;release():void}
