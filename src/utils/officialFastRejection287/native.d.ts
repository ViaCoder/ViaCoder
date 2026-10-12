import type {APIError} from '@anthropic-ai/sdk/error'
import type {Signal} from '../signal.js'
export type FastCooldownReason287='rate_limit'|'overloaded'
export type FastRuntimeState287={status:'active'}|{status:'cooldown';resetAt:number;reason:FastCooldownReason287}
export type FastDisabledReason287='free'|'preference'|'extra_usage_disabled'|'network_error'|'unknown'
export type FastOrgStatus287={status:'pending'}|{status:'enabled'}|{status:'disabled';reason:FastDisabledReason287;source?:'guess'|'server'}
export interface FastModeOwner287 {
 runtimeState:FastRuntimeState287;hasLoggedCooldownExpiry:boolean;creditsExhaustedNotifiedThisTurn:boolean
 orgStatus:FastOrgStatus287;lastPrefetchAt:number;inflightPrefetch:Promise<void>|null
 cooldownTriggered:Signal<[number,FastCooldownReason287]>;cooldownExpired:Signal<[]>
 overageRejection:Signal<[string]>;orgFastModeChange:Signal<[boolean]>
 fastRejectedFallbackModels:Set<string>;everFastRejectedModels:Set<string>
 fallbackModelFastRejected:Signal<[string]>;fastRejectedFallbackModelsChanged:Signal<[]>
 reset():void;enterCooldown(resetAt:number,reason:FastCooldownReason287):void;clearCooldown():void
 markCooldownExpiryLogged():void;replaceOrgStatus(status:FastOrgStatus287):FastOrgStatus287
 claimCreditsExhaustedNotice():boolean;rearmCreditsExhaustedNotice():void
 beginPrefetchWindow(now:number,interval:number):boolean;trackInflightPrefetch(promise:Promise<void>):void;clearInflightPrefetch(promise:Promise<void>):void
}
export function createFastModeOwner287():FastModeOwner287
export function createFastRejectionKernel287(ports:{
 Xl:FastModeOwner287;Be(model:string,options:{identity:boolean}):string;xt:typeof APIError
 JU():{previousAppStateModel?:string|null;fallbackModel:string}|undefined;Kc():string|null|undefined
 Rt(model:string):string;Py():string;Ft():boolean;Ry(model:string|null):boolean;To():boolean;a8(model?:string|null):string|null
 tt():{fastMode?:boolean;fastModePerSessionOptIn?:boolean};ge(source:'policySettings'|'flagSettings'):{fastMode?:boolean;fastModePerSessionOptIn?:boolean}|null|undefined
 i(name:string,data:{enabled:boolean;source:string;remote:boolean}):void;c(value:string):string;pr():{caps?:{controlChannel?:boolean};viewerOnly?:boolean}|null
 d(error:unknown):void;Z(error:unknown):unknown;t(message:string):void
}):{
 $yt(model:string|null|undefined):boolean;kbe(fastMode:boolean|undefined,model:string|null|undefined):boolean
 fU():void;Lk(model:string|null,fastMode:boolean|undefined):boolean;Nk(before:boolean|undefined,after:boolean):void
 mVo(model:string):void;$7e():void;zPe(listener:()=>void):()=>void;sWt(model:string):boolean;QJn(model:string):boolean
 ZOo(input:{requestModel:string;turnRefusalOverride?:string;chainStepModel?:string;userModel:string}):boolean
 QDe(error:unknown,model:string):boolean
 qualified(active:boolean,error:unknown,context:{model:string;fastMode?:boolean},options:{modelIsRefusalFallbackTarget?:boolean}):boolean
 repair(active:boolean,error:unknown,context:{model:string;fastMode?:boolean},options:{modelIsRefusalFallbackTarget?:boolean}):boolean
}
