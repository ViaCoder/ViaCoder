import type {SDKMessage,SDKControlRequestProgressMessage} from '../entrypoints/sdk/coreTypes.js'
import type {SDKControlRequest,SDKControlResponse,SDKControlCancelRequest} from '../entrypoints/sdk/controlTypes.js'
import type {RemoteMessageContent} from '../utils/teleport/api.js'
import type {RemoteSessionConfig} from './RemoteSessionManager.js'

/** Public AHe options. Progress is the complete source frame, not its status. */
export interface CcrControlOptions287 {
 signal?:AbortSignal;timeoutMs?:number;
 onProgress?:(frame:SDKControlRequestProgressMessage)=>void;
 answerExpected?:boolean;background?:boolean;
 awaitWorkerStart?:{onChange(waiting:boolean):void};
 onEchoed?:(metadata:CcrFrameMetadata287)=>void;
}
export interface CcrFrameMetadata287 {source?:'worker'|'client'|'service';replayed?:boolean;sequenceNum?:number;createdAt?:string;ageMs?:number}
export interface CcrManagerConfig287 extends RemoteSessionConfig {
 initialSequenceNum?:number;controlOnly?:boolean;trackSendsInFlight?:boolean;
 keepStreamRedialling?:boolean;keepUndeliveredResponses?:boolean;
 nameToolOnPermissionAllow?:boolean;nameRepositoryTrustAnswers?:boolean;
 ignoreErrorShapedDialogReplies?:boolean;rearmRedeliveredPermissionRequests?:boolean;
 keepOwnModelSwitchBreadcrumb?:boolean;initialPromptUuid?:string;
 onAuth401?:(failedAccessToken:string)=>Promise<boolean>;
}
export type CcrFrame287=SDKMessage|SDKControlRequest|SDKControlResponse|SDKControlCancelRequest
export interface CcrManagerCallbacks287 {
 onMessage(frame:SDKMessage,metadata:CcrFrameMetadata287):void;
 onConnected?():void;onReconnecting?():void;onDisconnected?(reason?:string):void;onError?(error:Error):void;
}
export interface CcrPendingControl287 {
 timer:ReturnType<typeof setTimeout>;timeoutMs:number;subtype:SDKControlRequest['request']['subtype'];
 onProgress?:CcrControlOptions287['onProgress'];removeAbortListener?:()=>void;
}
/** A typed view of the actual original object. No cache or pending store here. */
export interface CcrManager287 {
 readonly pendingControlRequests:ReadonlyMap<string,CcrPendingControl287>;
 connect():void;disconnect():void;reconnect():void;
 sendControlRequest(request:SDKControlRequest['request'],options?:CcrControlOptions287):Promise<unknown>;
 postControlRequest(request:SDKControlRequest['request'],options?:CcrControlOptions287):{
  posted:Promise<{outcome:string}>;response:Promise<unknown>;
 };
 handleMessage(frame:CcrFrame287,metadata?:CcrFrameMetadata287):void;
 sendMessage(content:RemoteMessageContent,options?:{uuid?:string;clearsConversation?:boolean},submittedAtMs?:number):Promise<{ok:true}|{ok:false;reason:string}>;
 cancelSession():void;cancelControlRequest(requestId:string):void;
 beginWorkerStart():void;endWorkerStart():void;
 flushSends(timeoutMs:number):Promise<void>;
 releaseHeldSends(timeoutMs?:number,options?:{exiting?:boolean;final?:boolean}):Promise<{unsent:number;refused:string[];unconfirmed:number;stillHeld:number}>;
}
export type CcrManagerConstructor287=new(config:CcrManagerConfig287,callbacks:CcrManagerCallbacks287)=>CcrManager287
/** The public hook and Un use this same canonical AHe/ye lexical pair. */
export function getPublicCcrManagerConstructor287():CcrManagerConstructor287 {
 const {getOriginalModsLifecycle287}=import.meta.require('../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../utils/hooks/modelSwitch287/lifecycleRuntime.js')
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-er0qmmcm.js').AHe as CcrManagerConstructor287
}
