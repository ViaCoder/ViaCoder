import type {CacheSafeParams} from '../../utils/forkedAgent.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
export interface CacheJournalRequest287 {at:number;ttl:'5m'|'1h';inputTokens:number;cacheReadTokens:number;cacheCreationTokens:number}
export interface CacheJournalSummary287 {lastRequest:CacheJournalRequest287|null;lastActivityAt:number|null;expiresAt:number|null;warm:boolean;requests:number;hits:number;misses:number}
export interface CacheJournal287 {record(key:string,entry:CacheJournalRequest287):unknown;summary(key:string,now:number):CacheJournalSummary287;touch(key:string,at:number):void;expectDrop(key:string,at:number):void;attribute(key:string,value:unknown):void;clear(key?:string):void}
export interface ClassifierJobState287 {credentials:unknown;storageV5:unknown;latestAsk:string;capturedIntent:string;inFlight:Promise<unknown>|null;bridgeWriteChain:Promise<unknown>;onClassified?:((result:unknown,midturn:boolean)=>void)|null;lastMsgCount:number;[field:string]:unknown}
export interface PostTurnClientNative287 {
 queryObservers:{go(context:unknown):ClassifierJobState287|null;no(context:unknown,querySource:string):void;uo(context:unknown,querySource:string,message:unknown):void}
 classificationMainAgentPredicate(agent:{agentType:string}):boolean
 optionalDaemon():{server:undefined|{disarmStartupWedgeWatchdog():void}}
 bridgeSignals:{zGn:{of(host:object):{subscribe(listener:(value:unknown)=>void):()=>void;emit(value:unknown):void}}}
 admission:{Pt():boolean;xc():boolean}
 timing:{Dt<T>(promise:Promise<T>,timeoutMs:number,message:string):Promise<T>}
 snapshot:{Han(params:CacheSafeParams|null):void;JR():CacheSafeParams|null;BNt():boolean;z6n():CacheSafeParams|null;cvo():boolean;W9n(config:{mode:string;minTokens:number},summary:CacheJournalSummary287,lateMs:number,tokens:number,savedAt:number,prefix:()=>boolean):string|null;q9n(host:null|{refusal():Promise<string|null>},logOnly:boolean):Promise<string>;Ijn:{of(session:ExecutionSession287):{host:null|{refusal():Promise<string|null>;compact():Promise<unknown>};arm(at:number,predicate:()=>boolean):void}}}
 cache:{Ts:new()=>CacheJournal287;Ie():CacheJournal287;oBe(key?:string,now?:number):CacheJournalSummary287;zjo(key:string,request:CacheJournalRequest287):unknown;ks(key:string,value:unknown):void;OYn(key:string,at:number):void;EXe(key?:string,at?:number):void;HYn(key?:string):unknown;IYn(usage:CacheAttemptUsage287):'1h'|'5m'|undefined;Z1:string;Tk:number;g3:number}
 classification:Record<string,unknown>
 jobs:Record<string,unknown>
 projects:Record<string,unknown>
 job:{Rn(options?:{credentials?:unknown;storageV5?:unknown}):ClassifierJobState287;Dn(state:ClassifierJobState287,ask?:string):void;vn(messages:readonly unknown[]):string|undefined;ut(...args:unknown[]):Promise<void>;Fn(...args:unknown[]):void;xn(...args:unknown[]):void;Bn(...args:unknown[]):void;We(...args:unknown[]):Promise<unknown>;nt(state:ClassifierJobState287):()=>void;In(...args:unknown[]):string;Le(...args:unknown[]):Promise<unknown>;Nn(...args:unknown[]):Promise<void>;ot(...args:unknown[]):Promise<unknown>;Te(...args:unknown[]):string;je(...args:unknown[]):Promise<unknown>;tt(...args:unknown[]):Promise<unknown>;Ln(value:unknown):void;pe(...args:unknown[]):string;se(...args:unknown[]):unknown;ye(...args:unknown[]):void;ne:number}
}
export function createPostTurnClientNative287(ports:Record<string,unknown>):PostTurnClientNative287

export interface CacheAttemptUsage287 {input_tokens:number;cache_read_input_tokens:number;cache_creation_input_tokens:number;cache_creation?:{ephemeral_1h_input_tokens?:number;ephemeral_5m_input_tokens?:number}|null}
export function createPostTurnAttemptRecorderNative287(ports:{Rp(agent:{agentType:string}):boolean;z:{agentContext:{agentType:string};querySource:string;forkPointUuid?:string};K:{now():number};xp:'1h'|undefined;zjo(key:string,request:CacheJournalRequest287):unknown;Z1:string;IYn(usage:CacheAttemptUsage287):'1h'|'5m'|undefined;OYn(key:string,at:number):void}):{main:boolean;reset():void;record(usage:CacheAttemptUsage287,startedAt:number):void}
