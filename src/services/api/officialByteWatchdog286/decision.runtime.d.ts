export type RetryDecision286 = 'retry' | 'fail' | 'useFallbackModel' | 'retryWithoutStreaming' | 'keepPartial'
export type RetryCounts286 = {retries:number; overloaded:number; stalls:number; truncations:number; afterThinkingOnly:number; triedWithoutStreaming:boolean}
export type RetryPolicy286 = {maxRetries:number; maxOverloaded:number; hasFallbackModel:boolean; persistent:boolean | undefined; background:boolean}
export type StreamFailure286 = {kind:'streamFailed'; cause:'denied'|'overloaded'|'stalled'|'truncated'|'connectionLost'|'serverError'|'malformed'|'badRequest'|'unknown'; progress:'nothing'|'started'|'partialOutput'|'thinkingOnly'|'output'; stopReasonReceived:boolean}
export type RetryFailure286 = StreamFailure286 | {kind:'noResponse'} | {kind:'httpError'; status:number; fallbackModelCouldHelp:boolean}
export type ModelCallRetries286 = {
 onStreamFailed(failure:StreamFailure286,nonStreamingAllowed:boolean):RetryDecision286
 undoLastCount():void
 counts():RetryCounts286
 retriesLeft():number
 takeCredentialRenewal():boolean
 takeApiAttempt():boolean
 outOfApiAttempts():boolean
 onWithRetryGaveUp(error:unknown):'retryWithoutStreaming'|'fail'
 reportHttpFailure(error:unknown,actualDecision:RetryDecision286,options?:{fallbackModelCouldHelp?:boolean}):void
}
export declare function createOfficialModelCallRetry286(ports:{
 a:{readonly CLAUDE_CODE_RETRY_WATCHDOG?:boolean;readonly CLAUDE_CODE_MAX_RETRIES?:number}
 wi:()=>{once(key:string):boolean}
 t:(message:string,options?:{level:'warn'})=>void
 R:(name:string,fallback:boolean)=>boolean
 d:(error:unknown)=>void
 i:(name:string,data:Record<string,string|number|undefined>)=>void
 c:(value:string)=>string
 Pt:typeof import('@anthropic-ai/sdk').APIError
 lu:typeof import('@anthropic-ai/sdk').APIConnectionError
 dd:typeof import('@anthropic-ai/sdk').APIUserAbortError
 O1:(error:unknown)=>boolean
}):{
 v4():boolean | undefined
 qOe():number
 YOe(failure:RetryFailure286,counts:RetryCounts286,policy:RetryPolicy286,nonStreamingAllowed?:boolean):{decision:RetryDecision286;counts:RetryCounts286}
 VLt(policy:RetryPolicy286,apiAttemptsLeft?:{count:number}):ModelCallRetries286
 QLt(input:{error:unknown; anyBlockFinished:boolean;anyOutputShown:boolean;anyEvent:boolean;stopReasonReceived:boolean;complete:boolean;denied:boolean;isServerError:boolean;stalled:boolean;isConnectionError:boolean;truncated:boolean;malformed:boolean}):StreamFailure286|undefined
 gZ:new()=>Error
}

export declare function createOfficialRetryForeground286(): (querySource?:string)=>boolean
export declare function createOfficialOverloaded286(ports:{Pt:typeof import('@anthropic-ai/sdk').APIError}): (error:unknown)=>boolean
