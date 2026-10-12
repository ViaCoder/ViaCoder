import type {ToolUseContext,ToolPermissionContext,Tools} from '../../../Tool.js'
import type {AssistantMessage,Message} from '../../../types/message.js'
import type {YoloClassifierResult,PermissionDecision,PermissionMode} from '../../../types/permissions.js'
export type ServerVerdict287 = {kind:'none';why:string}|{kind:'per_call';statuses:Map<string,{type:'evaluated';outcome:'flagged'|'not_flagged';explanation?:string}|{type:'skipped'|'unrecognized'}|{type:'unavailable';reason:string}>}
export interface ServerRequest287 {readonly key:string;readonly runKey:string;readonly sentThread:boolean;readonly sentArtifacts:unknown;settle(result:ServerVerdict287):boolean;results():Promise<ServerVerdict287>;settledAt():number|undefined;noteRewrittenCall():void;hasRewrittenCall():boolean;toJSON():undefined}
export interface ServerMessageFields287 {permissionModeAtRequest?:import('../officialPersonConfirm287/native.js').PermissionSnapshot287;serverClassifierRequest?:string;serverClassifierResults?:ServerRequest287;serverClassifierReviewLeftBehind?:ServerRequest287;serverClassifierInputRewritten?:boolean}
export interface AutoModeServerContext287 {context:Record<string,unknown>;git:Record<string,unknown>;artifacts?:unknown}
export interface PendingServerContext287 {tools:Tools;context:Promise<Record<string,unknown>|undefined>;git:Promise<Record<string,unknown>>;cwd:string;startedAt:number}
export type RetryScheduler287=(callback:()=>void,delay:number)=>()=>void
export type UnavailableResult287={kind:'stop';position:number;recorded:boolean}|{kind:'deny';position:number;interrupted:boolean}
export type ClassifierState287={checking:Set<string>;approvals:Map<string,unknown>}
export interface ServerClassifierNative287 {
 permissionVisibility287:{YS():Record<string,unknown>}
 resolveNoVerdict(input:{e:{name:string};D:ToolUseContext&{scheduleTimeout?:RetryScheduler287};w:((update:(state:ClassifierState287)=>ClassifierState287)=>void)|undefined;g:string;xn:boolean;ls:boolean;mr:YoloClassifierResult;Rr:string|undefined;$o:()=>Promise<ServerVerdict287>}):Promise<PermissionDecision|undefined>
 $oe():boolean
 H2t(message:AssistantMessage['message'],tools:Tools):YoloClassifierResult|undefined
 QEt(key:string,options:{runKey:string;signal:AbortSignal;scheduleTimeout?:RetryScheduler287;onWait?:(wait:{position:number;limit:number;delayMs:number}|null)=>void}):Promise<UnavailableResult287>
 iVo(key:string,context:Pick<ToolUseContext,'agentId'|'abortController'|'onRetryStatus'>&{scheduleTimeout?:RetryScheduler287},setter:((update:(state:ClassifierState287)=>ClassifierState287)=>void)|undefined,id:string):Promise<UnavailableResult287>
 JEt(errorKind:string|undefined,perCall:boolean):boolean
 aVo(tool:{name:string},context:Pick<ToolUseContext,'agentId'>,recorded:boolean):PermissionDecision
 tCt(key:string,options?:{artifacts?:unknown;thread?:boolean;agentId?:string}):ServerRequest287
 nCt(request:ServerRequest287,response:unknown,toolIds?:string[]):ServerVerdict287|undefined
 $Pe(request:ServerRequest287):Required<Pick<ServerMessageFields287,'serverClassifierRequest'|'serverClassifierResults'>>
 jPe(request:ServerRequest287):void
 v7(mode:PermissionMode):'off'|'arbiter'|'arbiterWithLocalFallback'
 KHt(mode:string):boolean
 aCt(message:ServerMessageFields287,id:string):Promise<ServerVerdict287>
 cCt(verdict:ServerVerdict287,id:string,fallback:()=>YoloClassifierResult|undefined):YoloClassifierResult
 iCt(mode:string,verdict:ServerVerdict287,id:string):boolean
 D8e(key:string,context:unknown):void
 M$t(input:{autoModeServerContext:AutoModeServerContext287;priorTurnContext:unknown[];systemReminders:unknown[]}):Record<string,unknown>|undefined
 A$t(context:Record<string,unknown>):Record<string,unknown>
 eXe(messages:Message[]):unknown[]
 tXe(messages:Message[],wireMessages:readonly {type?:string;message:{content:unknown}}[]):unknown[]
 Uoe(message:AssistantMessage,id:string,context:ToolUseContext):import('../officialPersonConfirm287/native.js').PermissionSnapshot287|undefined
 Aa(context:ToolUseContext,betas:import('../../../services/context/officialExecutionOwners287/native.js').StickyBetas287):PendingServerContext287|undefined
 Pa(pending:PendingServerContext287|undefined):Promise<AutoModeServerContext287|undefined>
 Ia(context:ToolUseContext):boolean
}
export function createServerClassifierNative287(ports:Record<string,unknown>):ServerClassifierNative287
