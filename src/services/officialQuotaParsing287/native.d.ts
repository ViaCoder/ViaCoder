export interface QuotaParsingPorts287 {
  /** Exact native low-priority limiter gate (_N); not a bool-path approximation. */
  lowPriorityActive:()=>boolean
  lowPriorityOffer:(headers:Headers)=>unknown
  lowPriorityRetryAfterSeconds:(headers:Headers)=>number|undefined
  lowPriorityMaxWaitSeconds:(headers:Headers)=>number|undefined
  globalDate:{now:()=>number}
  overageScopeHeaderName:string
  graceInUseHeaderName:string
}
export interface QuotaStatus287 {status:string;unifiedRateLimitFallbackAvailable:boolean;isUsingOverage:boolean;[key:string]:unknown}
export interface QuotaReadings287 {[key:string]:{utilization?:number;resets_at?:number;surpassedThreshold?:number}|undefined}
export declare function createNativeQuotaParsing287(ports:QuotaParsingPorts287):{
 Zge:(headers:Headers,graceActive:boolean)=>{base:QuotaStatus287;own:QuotaStatus287;readings:QuotaReadings287}
 m4e:(headers:Headers,graceActive:boolean)=>QuotaStatus287
 d4e:(readings:QuotaReadings287)=>Record<string,{utilization:number;resets_at:number}>
 Dgn:(headers:Headers)=>QuotaReadings287
 p4e:(readings:QuotaReadings287,fallbackAvailable:boolean)=>QuotaStatus287|null
 Fle:(reading:unknown)=>boolean;Lgn:(reading:unknown)=>boolean
 S4e:(status:QuotaStatus287,error:unknown)=>QuotaStatus287
 Ugn:(status:QuotaStatus287)=>QuotaStatus287
 kN:(reading:{utilization:number;resets_at:number})=>string
 y4e:(reading:unknown,nowMs:number)=>boolean
 w4e:(headers:Headers)=>string|undefined
 f4e:(headers:Headers)=>Record<string,unknown>
 ehe:(status:QuotaStatus287,upgradePaths:string[]|undefined,previous:QuotaStatus287)=>QuotaStatus287
 zb:readonly (readonly [string,string])[]
 Ogn:number
}
