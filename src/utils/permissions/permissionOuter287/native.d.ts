import type {Tool,ToolUseContext} from '../../../Tool.js'
import type {Message,AssistantMessage} from '../../../types/message.js'
import type {PermissionDecision} from '../PermissionResult.js'
import type {ExecutionSession287} from '../../../services/context/officialExecutionOwners287/native.js'
import type {CacheSafeParams} from '../../forkedAgent.js'
export interface CanonicalPostTurnOwners287 {
 snapshotState():{last:{params:CacheSafeParams|null;savedAt:number|null;sessionModel:string|null;resolvedAdvisor:string|undefined;sessionId:string|null;promptForSessionModel:boolean};rootId:string;root:ExecutionSession287}
 readSnapshot():CacheSafeParams|null
 classifierQueue():{enqueue<T>(key:string,run:(progress:{transcriptStatePublished():void;stageOneDone():void})=>Promise<T>,receipt:(info:unknown)=>void,options?:{cachePrefix?:string;commitTurn?:{place(wait:Promise<void>,release:()=>void):void}}):Promise<T>;recordClassifiedCall(id:string):void;isRecordedClassifiedCall(id:string):boolean;readonly size:number;reset():void}
 classifierSupport():{record(id:string,text:string):void;linesFor(id:string):string|undefined;forget(id:string):void;reset():void}
}
export interface PermissionOuterNative287 {
 kf:import("../../../hooks/useCanUseTool.js").CanUseToolFn
 T7(tool:Tool,input:Record<string,unknown>,context:ToolUseContext,message:AssistantMessage,id:string,caller:{kind:"launcher"}|{kind:string},hookUpdatedInput?:unknown,extra?:unknown):Promise<PermissionDecision>
 P2o(context:Pick<ToolUseContext,'abortController'> & {requestDialog?:unknown;storageV5?:unknown;isBackgroundAgent?:boolean}):Promise<'continue'|'interrupt'>
 Hin():boolean
 HKt(request:()=>Promise<'continue'|'continue_unacknowledged'|'interrupt'>):Promise<'continue'|'interrupt'>
 V$e(pending:Promise<'continue'|'interrupt'>,signal:AbortSignal):Promise<'continue'|'interrupt'>
 readonly k6:{readonly kind:"launcher"}
 bP(tool:Tool,input:Record<string,unknown>,context:ToolUseContext,options?:{crashIsObjection?:boolean;hookUpdatedInput?:unknown}):Promise<PermissionDecision|null>
 SWn(id:string,tool:Tool,input:Record<string,unknown>,decision:PermissionDecision,caller:{kind:string},context:ToolUseContext):Promise<PermissionDecision|null>
 eVo(...args:unknown[]):Promise<PermissionDecision|null>
 eVt(ask:import("../PermissionResult.js").PermissionAskDecision,reason:import("../PermissionResult.js").PermissionDecisionReason,context:ToolUseContext,config:{enabled:boolean;showDialog:boolean;timeoutMs:number;maxDialogTimeouts:number}):PermissionDecision
 lVo(state:import("../denialTracking.js").DenialTrackingState,reason:string,message:AssistantMessage,tool:Tool,ask:import("../PermissionResult.js").PermissionAskDecision,context:ToolUseContext,auto:boolean,deny:import("../PermissionResult.js").PermissionDenyDecision):PermissionDecision|null
 FKt():(()=>void)&{restartDeadline():void}

 oVo(tool:Tool,input:Record<string,unknown>,context:ToolUseContext,message:AssistantMessage,id:string,setChecking?:unknown,hookUpdatedInput?:unknown,extra?:unknown):Promise<PermissionDecision>
 hVt(tool:Tool,input:Record<string,unknown>,context:ToolUseContext,hookUpdatedInput?:unknown,review?:unknown):Promise<PermissionDecision>
 LPr(request:{tool:Tool;input:Record<string,unknown>;context:ToolUseContext;toolUseID:string;evaluate():Promise<PermissionDecision>},messageId:string):Promise<PermissionDecision>
}
export function createPermissionOuterNative287(ports:Record<string,unknown>):PermissionOuterNative287

/** Exact existing Je/ve source methods, only this consumer ABI; no owner fields added. */
export interface OriginalClassifierFallbackLatches287 {
 serverClassifierFallbackChoice():Promise<'continue'|'interrupt'>|undefined
 setServerClassifierFallbackChoice(value:Promise<'continue'|'interrupt'>):void
 clearServerClassifierFallbackChoice():void
}
export interface OriginalClassifierDialogCapabilities287 {
 sdkDialogHostActive():boolean
 sdkSupportedDialogKinds():readonly string[]|undefined
}
