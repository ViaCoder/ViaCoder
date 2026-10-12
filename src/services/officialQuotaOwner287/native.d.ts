import type {APIError} from '@anthropic-ai/sdk'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import type {ClaudeAILimits, QuotaReadings, QuotaWindowReading, RateLimitType} from '../claudeAiLimits.js'
import type {Signal} from '../../utils/signal.js'
import type {NativeQuotaGrace287} from '../officialQuotaGrace287/native.js'
export type NativeQuotaOwner287 = {
 currentLimits:ClaudeAILimits
 rawUtilization:QuotaReadings
 lastSeenWindows:Partial<Record<RateLimitType,QuotaWindowReading & {observedAtMs:number;upgradePaths?:string[];unifiedRateLimitFallbackAvailable:boolean}>>
 lastAppliedObservationAtMs:number;accountEpoch:number;limitsObserved:boolean
 wrapUp:NativeQuotaGrace287
 statusChanged:Signal<[ClaudeAILimits]>
 overageInUse:Signal<[model:string,isUsingOverage:boolean,longContext:boolean]>
 quotaRejected:Signal<[limits:ClaudeAILimits,source:string]>
 usageLimitWaits:Set<unknown>;usageLimitWaitsChanged:Signal
 isFromPreviousAccount(epoch?:number):boolean
 isStaleObservation(observedAtMs:number):boolean
 currentWindows(nowMs:number):NativeQuotaOwner287['lastSeenWindows']
 resetCurrentLimits():void
 forgetHeldWindows(windows?:RateLimitType[]):void
 emitStatusChange(limits:ClaudeAILimits):void
 restoreLimits(limits:ClaudeAILimits,observed:boolean):void
 probeQuotaStatus(model:string,credentials?:CredentialStore,storageV5?:unknown):Promise<ClaudeAILimits|null>
 extractQuotaStatusFromHeaders(headers:Headers,model:string,isLongContext?:boolean,observedAtMs?:number,accountEpoch?:number,storageV5?:unknown):ClaudeAILimits|null
 extractQuotaStatusFromError(error:APIError,source:string,observedAtMs?:number,accountEpoch?:number,storageV5?:unknown):void
 resetGraceState():void
 resetNearLimitWrapUpState():void
 extractGraceStatusFromHeaders(headers:Headers,eligible:boolean,observedAtMs?:number,epoch?:number):void
 consumePendingNearLimitWrapUpHint():boolean
 beginUsageLimitWait(wait:unknown):()=>void
}
/** Exact class; all free bindings must be supplied by the owning production service. */
export declare function createNativeQuotaOwner287(ports:Record<string,unknown>):new()=>NativeQuotaOwner287
