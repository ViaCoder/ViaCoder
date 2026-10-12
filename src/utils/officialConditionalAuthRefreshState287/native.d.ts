export type AuthRefreshSingleFlight287 = {
 runs:Map<unknown,{control:{waiting:boolean;takeoverAsked?:boolean};cancel:AbortController}>
 userWaits():boolean;isWaiting():boolean;askTakeover():void
}
export type AuthRefreshWaiters287 = {
 withStop:number;withoutStop:number;userTurns:number;stop:AbortController
 stoppedWhileWaiting:boolean;takeoverForNextRun?:symbol;singleFlight:AuthRefreshSingleFlight287
 readonly signal:AbortSignal;hasCallers():boolean;takeTakeover():boolean;clearTakeover():void;noteStop():void
 wait<T>(run:()=>Promise<T>,options:{signal?:AbortSignal;userTurn?:boolean},cancelled:T):Promise<T>
}
export type ConditionalRefreshCommon287={inFlight:Promise<boolean>|null;signInFailures:number;singleFlight:AuthRefreshSingleFlight287;waiters:AuthRefreshWaiters287}
export type AwsRefreshState287=ConditionalRefreshCommon287 & {lastRefreshAt:number|null;epoch:number}
export type GcpRefreshState287=ConditionalRefreshCommon287 & {rejectedByApi:boolean}
export type GcpRefreshMemo287=(()=>Promise<boolean>) & {cache:{clear():void}}
export type HostCell287<T>={of(host:object):T}
export type ConditionalAuthRefreshState287={
 pwn:HostCell287<AwsRefreshState287>;MWt:HostCell287<GcpRefreshState287>;mwn:HostCell287<GcpRefreshMemo287>
 rJe():void;a_t():void;nJe():void;f3r():void;$Qn():number;UQn():number
}
export interface ConditionalAuthRefreshStatePorts287 {
 U():{host:object};a:{CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK?:boolean}
 _(value:unknown):string;gK():Promise<boolean>;l(error:unknown):string
 t(message:string,options?:{level:'error'}):void
}
export function createConditionalAuthRefreshState287(ports:ConditionalAuthRefreshStatePorts287):ConditionalAuthRefreshState287
