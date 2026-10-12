import type {ReactNode,Context} from 'react'
export type NativeInkClock287={
 subscribeKeepAlive:(onChange:()=>void)=>()=>void
 subscribeFollower:(onChange:()=>void)=>()=>void
 now:()=>number
 setTickInterval:(ms:number)=>void
 setTimeout:(callback:()=>void,ms:number)=>()=>void
}
export function createInkClockRuntime287(ports:Record<string,unknown>):{createClock:(ms:number)=>NativeInkClock287;ClockProvider:(props:{children:ReactNode})=>ReactNode}
export function createRecentInputClockContext287(jt:typeof import('react').createContext):Context<(()=>number)|null>
export type InputArrivalOwner287={readArrivedAt:number|null}
export function createAppInputNow287(this:InputArrivalOwner287):()=>number
export function createAppInputDispatch287(Ut:{discreteUpdates:Function},sx:Function):(this:InputArrivalOwner287,n:unknown[])=>void

export interface InputBatchMeaning287 {kind:string;name?:string;button?:number}
export function isSoloKeypressBatch287(items:readonly InputBatchMeaning287[]):boolean
export function createKeyboardEventClass287(Base:typeof import("../events/terminal-event.js").TerminalEvent):new(key:import("../parse-keypress.js").ParsedKey,metadata?:{soloKeypress?:boolean})=>import("../events/keyboard-event.js").KeyboardEvent
