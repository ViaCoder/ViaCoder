import type {AppState} from '../../state/AppState.js'
import type {SetAppState} from '../../Task.js'
import type {ExternalRegistry287} from '../../tools/GetTaskTool/externalNative.js'
import type {PrintDrain287} from '../../tools/GetTaskTool/printLifecycleNative.js'
import type {PrintControlRuntime287,PrintControlQueue287,PrintPrewaitLatch287,PrintSendNowRequest287} from './controlNative.js'
import type {PrintCancellationNative287} from './cancellationNative.js'
import type {StructuredIO} from '../structuredIO.js'
export interface PrintInterruptSessionState287 {getState():string;notifyStateChanged:typeof import('../../utils/sessionState.js').notifySessionStateChanged;heldRequiresAction?:()=>unknown}
export interface PrintParkedPermission287 {
 readonly handledToolUseIds:Set<string>
 seedHandledToolUseIds():void
 readonly retirement:unknown
 holdingParkedPermission():boolean
 inheritedPromptPending():boolean
 inheritedPromptHoldCapable():boolean
 stashedAdoptedParkAnswer?:unknown
 deferredParkedPermissionRescue?:unknown
 parkedPermission?:unknown
 parkedPermissionHeld:boolean
 inheritedPromptOwnsWorkerStatus():boolean
 fire(reason:unknown):void
}
export interface PrintInterruptSweepNative287 {
 declarePerTaskStopAffordance(value:boolean):void
 normalInterrupt(frame:unknown,request:PrintSendNowRequest287):void
 prepareStop():{taskRegistry:ExternalRegistry287;setAppState:SetAppState;storageV5?:unknown}
 pauseAutoReact(registry:ExternalRegistry287,options:{durable:boolean;storageV5?:unknown}):number
 discardArtifactActivity(queue:PrintControlQueue287,options:{leaveArtifactRooms:boolean}):{slug:string;family:string;artifactName?:string;count:number}[]
 emitStopReceipt(stopped:number,discarded:{slug:string;family:string;artifactName?:string;count:number}[]):void
 discardTurn(options?:{keepDetachedToolCalls?:boolean;retireParkedPermission?:boolean;parkedPermissionReason?:string}):void
 discardSuggestion(this:{abortController:AbortController|null;lastEmitted:unknown;pendingSuggestion:unknown}):void
 perTaskStop():boolean
 available():boolean
 keepAlive:{arm():void;disarm(cause:string):void}
 disposeBudget():void
 ParkedPermission:new(options:{io:{sessionState:PrintInterruptSessionState287};drain:PrintDrain287;messageQueue:unknown;store:{getState():AppState;setState:SetAppState};[key:string]:unknown})=>PrintParkedPermission287
}
export type PrintInterruptSweepPorts287 = {
 executionContext:typeof import('../../services/context/execution287.js').getExecutionSession287
 artifactState:PrintCancellationNative287['artifactState']
 artifactSlot:PrintCancellationNative287['artifactSlot']
 cancelHandoffs:PrintCancellationNative287['cancelHandoffs']
 requeueSurvivors:PrintCancellationNative287['requeueSurvivors']
 interruptTurn:PrintControlRuntime287['interrupt'];cancelQueue:PrintControlRuntime287['cancelQueue'];isSendNow:PrintControlRuntime287['isSendNow'];sendNow:PrintControlRuntime287['sendNow']
 registry(getState:()=>AppState,setState:SetAppState):ExternalRegistry287
 getAppState():AppState;setAppState:SetAppState
 options:{maxBudgetUsd?:number;storageV5?:unknown}
 io:Pick<StructuredIO,'outbound'> & {sessionState:PrintInterruptSessionState287} & {onCommandLifecycle(uuid:string,state:'cancelled'):void}
 drain:PrintDrain287;execution:ReturnType<PrintInterruptSweepPorts287['executionContext']>
 messageQueue:PrintControlQueue287 & {enqueuePendingNotification:typeof import('../../utils/messageQueueManager.js').enqueuePendingNotification};prewaitLatch:PrintPrewaitLatch287
 frameIntake:unknown;inputDelivery:{pressWaiting():boolean}
 suggestions:{discard():void};parkedPermissionRetirement:Pick<PrintParkedPermission287,'fire'>
 resume?:{
  turnInterruptionState?:import('../../utils/conversationRecovery.js').TurnInterruptionState
  supersededToolUseIds?:Set<string>;answeredToolUseIds?:Set<string>
  lane:import('./parkLaneNative287.js').PrintParkLane287
 }
 respond(frame:unknown,receipt:unknown):void
} & Record<string,unknown>
export function createPrintInterruptSweepNative287(ports:PrintInterruptSweepPorts287):PrintInterruptSweepNative287
