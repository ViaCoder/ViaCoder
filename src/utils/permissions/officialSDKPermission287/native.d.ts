import type {z} from 'zod/v4'
import type {Tool,ToolUseContext} from '../../../Tool.js'
import type {CanUseToolFn} from '../../../hooks/useCanUseTool.js'
import type {SDKControlPermissionRequest} from '../../../entrypoints/sdk/controlTypes.js'
import type {PermissionDecision} from '../PermissionResult.js'
import type {Output} from '../PermissionPromptToolResultSchema.js'
export interface SDKPermissionCaller287 {kind:'launcher'|'strict';[key:string]:unknown}
export type SDKPermissionAnswer287=Omit<Extract<Output,{behavior:'allow'}>,'updatedInput'>&{updatedInput?:Record<string,unknown>}|Extract<Output,{behavior:'deny'}>
export type SDKPermissionControlRequest287=SDKControlPermissionRequest&{
 mcp_server?:{name:string;source:string};tool_kind?:'browser';decision_reason_type?:string;decision_reason_code?:string
 matched_ask_rule?:{source:string;tool_name:string;rule_content?:string}
 classifier_approvable?:boolean;suppress_always_allow_rule?:boolean;default_to_no?:boolean;requires_user_interaction?:boolean
}
export interface SDKPermissionHost287 {
 request(request:SDKPermissionControlRequest287,signal:AbortSignal,id:string):Promise<SDKPermissionAnswer287>
 isPending(id:string):boolean
 interruptedAtStreamClose(id:string):boolean
 answeredAtHostDialog(id:string):boolean
 emitPermissionDenied(tool:string,id:string,agent:string|undefined,decision:PermissionDecision):void
 promptShown?:((id:string,details:import('../../sessionState.js').RequiresActionDetails,nested:string|undefined,background:string|undefined)=>void)
 promptSettled(id:string,nested:string|undefined):void
}
export interface SDKPermissionNative287 {
 he(caller:SDKPermissionCaller287,host:SDKPermissionHost287):CanUseToolFn
 ott(caller:SDKPermissionCaller287,result:SDKPermissionAnswer287,tool:Tool,input:Record<string,unknown>,context:ToolUseContext,originalTool?:Tool,suppress?:boolean):PermissionDecision
 fe(tool:Tool,input:Record<string,unknown>,id:string,request:string,options?:{localDisplayOnly?:boolean}):import('../../sessionState.js').RequiresActionDetails
 vie():z.ZodType<SDKPermissionAnswer287>
}
export function createSDKPermissionSdk287(ports:Record<string,unknown>):SDKPermissionNative287
export function createSDKPermissionHelpers287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionRules287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionReason287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionAgent287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionNames287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionAbort287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionAccount287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionIdentity287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionErrors287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionDisabledAttestation287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionMetadata287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionCommandKind287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionSanitize287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionDisplay287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionDelay287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionShutdownWait287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionErrorText287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionTruncateLimit287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionDialogTimeout287(ports:Record<string,unknown>):{Wne():number}
export function createSDKPermissionDialogSchema287(ports:Record<string,unknown>):{j6t():z.ZodType<{behavior:'completed'|'cancelled';result?:unknown}>}
export function createSDKPermissionTabs287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionPermitNarrow287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionSanitizerPrimitives287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionRuleParser287(ports:Record<string,unknown>):Record<string,unknown>
export interface PermissionSessionState287 {
 currentState:import('../../sessionState.js').SessionState
 beginUserDecision():void;endUserDecision():void
 readonly userDecisionPending:boolean;userDecisionsPending:number;readonly waitingOnUser:boolean
 hasPendingAction:boolean;hasTaskSummary:boolean
 mainLoopRefcount:number
 stateChanged:{subscribe(fn:(state:import('../../sessionState.js').SessionState)=>void):()=>void}
 onStateChanged?:(state:import('../../sessionState.js').SessionState,details?:import('../../sessionState.js').RequiresActionDetails)=>void
 onMetadataChanged?:(metadata:import('../../sessionState.js').SessionExternalMetadata)=>void
 onPermissionModeChanged?:(mode:import('../PermissionMode.js').PermissionMode)=>void
 onAutocompactInputsChanged?:()=>void
 onConversationReset?:()=>void
 notifyConversationReset():void
 onInternalMetadataChanged?:(metadata:Record<string,unknown>)=>void
 readonly isWorkerPermissionModeRecordEnabled:boolean
 enableWorkerPermissionModeRecord():void
 notifyInternalMetadataChanged(metadata:Record<string,unknown>):void
 notifyAutocompactInputsChanged():void
 onActiveGoalChanged?:(goal:import('../../goal.js').ActiveGoal|undefined)=>void
 getPendingActionDetails?:(request:string)=>import('../../sessionState.js').RequiresActionDetails[]
 heldRequiresAction?:()=>import('../../sessionState.js').RequiresActionDetails|undefined
 getState():import('../../sessionState.js').SessionState
 notifyStateChanged(state:import('../../sessionState.js').SessionState,details?:import('../../sessionState.js').RequiresActionDetails):void
 notifyMetadataChanged(metadata:import('../../sessionState.js').SessionExternalMetadata):void
 notifyPermissionModeChanged(mode:import('../PermissionMode.js').PermissionMode):void
 notifyActiveGoalChanged(goal:import('../../goal.js').ActiveGoal|undefined):void
 notifyNestedPromptBlocking(id:string):void;notifyNestedPromptUnblocking(id:string):void
 reteeWaitingOnUser():void;republishPendingAction(details:import('../../sessionState.js').RequiresActionDetails):void
 dropNestedBlockedChain(key:string):void
 setMainLoopRefcount(count:number):void
}
export function createSDKPermissionSessionState287(ports:Record<string,unknown>):{t$t:new()=>PermissionSessionState287}
export function createSDKPermissionStrings287(ports:Record<string,unknown>):{re(text:string,size:number):string;la(text:string):string}
export interface SDKPermissionHostMethods287 {
 requestUserDialog(kind:string,payload:Record<string,unknown>,options?:{signal?:AbortSignal;toolUseId?:string;onSettledUnanswered?:(reason:'moved_on'|'deadline')=>void}):Promise<{behavior:'completed';result:unknown}|{behavior:'cancelled'}>
 cancelPendingUserDialogs(kind:string,reason:string):number
 cancelDialogByMachine(id:string,reason:'moved_on'|'deadline'):boolean
 ignoresErrorShapedDialogResponse(request:{request:import('../../../entrypoints/sdk/controlTypes.js').SDKControlRequest;forwarded?:boolean},response:import('../../../entrypoints/sdk/controlTypes.js').SDKControlResponse['response']):boolean
 settleUnknownResponse(response:import('../../../entrypoints/sdk/controlTypes.js').SDKControlResponse,uuid?:string):Promise<void>
 initialize(input:AsyncIterable<string>,replayUserMessages?:boolean,sessionState?:PermissionSessionState287,maxLineChars?:number):void
 trackWrite(message:import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage):import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage
 sampleForSdkSchemaCheck(message:import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage):void
 sdkSchemaFramesKept():boolean;endSdkSchemaStretch():void;armSdkSchemaCheck():void
 write(message:import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage):Promise<void>
 writeAfterInit(message:import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage):void
 heldDueBefore(message:import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage):import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage[]
 heldDueAfter(message:import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage):import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage[]
 writeHeld(messages:import('../../../entrypoints/sdk/controlTypes.js').StdoutMessage[]):Promise<void>
 read():AsyncGenerator<import('../../../entrypoints/sdk/controlTypes.js').StdinMessage|import('../../../entrypoints/agentSdkTypes.js').SDKMessage>
 sendRequest<Response>(request:import('../../../entrypoints/sdk/controlTypes.js').SDKControlRequest['request'],schema:z.Schema,signal?:AbortSignal,options?:{requestId?:string;forwarded?:boolean;deviceHook?:boolean}):Promise<Response>
 sendRequestPendingFirst:SDKPermissionHostMethods287['sendRequest']
 passControlRequestToHost<Response>(request:import('../../../entrypoints/sdk/controlTypes.js').SDKControlRequest['request'],options:{requestId:string;schema:z.Schema<Response>;signal?:AbortSignal}):Promise<Response>
 requestOAuthTokenRefresh():Promise<string|null>
 asksOurHuman(request:{request:import('../../../entrypoints/sdk/controlTypes.js').SDKControlRequest;forwarded?:boolean}):boolean
 ignoresResponseAtShutdown(request:{request:import('../../../entrypoints/sdk/controlTypes.js').SDKControlRequest;forwarded?:boolean},response:import('../../../entrypoints/sdk/controlTypes.js').SDKControlResponse['response']):boolean
 setOnStreamClosedWithParkedQuestion(callback:()=>void):void
 onRequestPending(callback:()=>void):()=>void
 hasPendingRequests():boolean
 setMainLoopLiveness(callback:()=>boolean):void
 enqueueCancelRequest(id:string):void
 createCanUseTool(caller:SDKPermissionCaller287,onPrompt?:((details:import('../../sessionState.js').RequiresActionDetails)=>void)):CanUseToolFn
 permissionPromptHost(onPrompt?:((details:import('../../sessionState.js').RequiresActionDetails)=>void)):SDKPermissionHost287
 emitPermissionDenied:SDKPermissionHost287['emitPermissionDenied']
 settlePermissionPrompt(id:string,nested?:string):void
 settlePublishedPrompt(id:string,retee:boolean):void
 hasPendingPrompt():boolean;hasStandingPrompt():boolean;hasTurnPrompt():boolean
 republishSurvivingPendingAction():void
 flipBackFromRequiresAction():void
}
export function createSDKPermissionSdkHost287(ports:Record<string,unknown>):SDKPermissionHostMethods287

export function createSDKPermissionServerIdentity287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionWrap287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionPromptPredicate287(ports:Record<string,unknown>):Record<string,unknown>

export function createSDKPermissionToolConstants287(ports:Record<string,unknown>):Record<string,unknown>

export function createSDKPermissionRequestAttestation287(ports:Record<string,unknown>):Record<string,unknown>

export interface SDKHostAttestation287 {attestation:{knownOutboundRequestIds:Set<string>;automatedOutboundRequestIds:Set<string>;deviceOutboundRequestIds:Set<string>;elicitationOutboundRequestIds:Set<string>;resolvedPromptRequestIds:Set<string>}}

export function createSDKPermissionShutdownUnwind287(ports:Record<string,unknown>):{Esr(value:boolean):void;XQr():boolean}
export function createSDKPermissionShutdownCaller287(ports:Record<string,unknown>):{ll():void;ul():boolean;$g():void}
export function createSDKPermissionSchemaPaths287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionWireJSON287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionSchemaBrand287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionEventLabel287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionFeatureFailure287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionMainLane287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionPollDrop287(ports:Record<string,unknown>):Record<string,unknown>
export function createSDKPermissionCrossInboundTeardown287(ports:Record<string,unknown>):Record<string,unknown>
export interface SDKHostTeardownIO287 {onCommandLifecycle?:(uuid:string,state:'discarded')=>void}
export interface SDKHostTeardownQueue287 {dequeueAllMatching(predicate:(command:import('../../../types/textInputTypes.js').QueuedCommand)=>boolean):import('../../../types/textInputTypes.js').QueuedCommand[]}
export function createSDKPermissionHostInputTeardown287(ports:Record<string,unknown>):Record<string,unknown>
