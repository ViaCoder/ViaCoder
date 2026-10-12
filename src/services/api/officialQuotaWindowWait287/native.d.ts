import type {APIError} from '@anthropic-ai/sdk'
export type QuotaWindowWaitMetadata287 = {retryAtMs:number;attempt:number;maxRetries:number}
export type QuotaWindowWaitCallback287 = (error:APIError,metadata:QuotaWindowWaitMetadata287)=>void|(()=>void)
export declare function createNativeQuotaWindowWait287(ports:{logError:(error:unknown)=>void}):{
 resetDelay(error:Pick<APIError,'headers'>,clock:{now():number}):number|null
 begin(options:{signal?:AbortSignal;onQuotaWindowWait?:QuotaWindowWaitCallback287},error:APIError|null,clock:{now():number},delayMs:number,attempt:number,maxRetries:number):()=>void
}
