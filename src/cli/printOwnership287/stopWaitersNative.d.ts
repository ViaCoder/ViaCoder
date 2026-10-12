import type {ExecutionSession287,ExecutionHost287} from '../../services/context/officialExecutionOwners287/native.js'
export interface PrintAuthWaitRun287 {control:{waiting:boolean;takeoverAsked?:boolean};cancel:AbortController}
export interface PrintAuthSingleFlight287 {
 runs:Map<string,PrintAuthWaitRun287>
 userWaits():boolean
 isWaiting():boolean
 askTakeover():void
}
export interface PrintAuthWaiters287 {
 withStop:number;withoutStop:number;userTurns:number;stop:AbortController
 stoppedWhileWaiting:boolean;takeoverForNextRun:symbol|undefined
 readonly signal:AbortSignal;singleFlight:PrintAuthSingleFlight287
 hasCallers():boolean;takeTakeover():boolean;clearTakeover():void;noteStop():void
 wait<T>(operation:()=>Promise<T>,options:{signal?:AbortSignal;userTurn?:boolean},fallback:T):Promise<T>
}
export interface PrintAuthStopState287 {inFlight:Promise<unknown>|null;signInFailures:number;singleFlight:PrintAuthSingleFlight287;waiters:PrintAuthWaiters287}
export interface PrintStopWaitersPorts287 {
 executionContext():ExecutionSession287
 environment:{readonly CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK:boolean}
 debug:typeof import('../../utils/debug.js').logForDebugging
}
export interface PrintStopWaitersRuntime287 {
 noteStop():void
 awsStopOwner:{of(host:ExecutionHost287):PrintAuthStopState287&{rejectedByApi:boolean}}
 gcpStopOwner:{of(host:ExecutionHost287):PrintAuthStopState287&{lastRefreshAt:number|null;epoch:number}}
}
export declare function createPrintStopWaitersRuntime287(ports:PrintStopWaitersPorts287):PrintStopWaitersRuntime287
