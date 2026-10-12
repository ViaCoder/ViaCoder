import type {ExecutionSession287,LegacyExecutionContext287} from '../../services/context/officialExecutionOwners287/native.js'
import type {PrintCloseController287,PrintDrain287} from '../../tools/GetTaskTool/printLifecycleNative.js'
import type {PrintDispatchCommand287} from './dispatchPolicyNative.js'
export interface PrintClearSurvivors287 {disclosures:PrintDispatchCommand287[];staleRows:PrintDispatchCommand287[];watchLifecycle:PrintDispatchCommand287[]}
export interface PrintControlQueue287 {
 getCommandQueueSnapshot():readonly PrintDispatchCommand287[]
 isFoldInFlight(uuid:string):boolean
 hasCancelPendingAcked(uuid:string):boolean
 markCancelPending(uuid:string,options?:{terminalEmitted?:boolean}):boolean
 consumeCancelPending(uuid:string):boolean
 consumeCancelPendingAcked(uuid:string):boolean
 removeByFilter(predicate:(command:PrintDispatchCommand287)=>boolean,options?:{reason:string}):PrintDispatchCommand287[]
 getCommandQueue():PrintDispatchCommand287[]
 subscribeToRemovals(listener:(removed:readonly PrintDispatchCommand287[])=>void):()=>void
}
export interface PrintControlInput287 {
 messageQueue:PrintControlQueue287;drain:PrintDrain287
 frameIntake:Pick<PrintCloseController287,'parkedUuids'|'cancelParked'|'hasParked'>
 // $y passes this through, km(false) does not touch it. Full cancel receipt
 // consumers require the actual wm owner; no substitute latch is constructed.
 prewaitLatch?:{clearIfNothingPending():void}
 io:{onCommandLifecycle?:(uuid:string,state:'cancelled')=>void}
 pressed?:string|null;standsFor?:(uuid:string)=>string|undefined;deliver?:()=>boolean
}
export interface PrintControlPorts287 {
 executionContext():ExecutionSession287
 legacyContext():LegacyExecutionContext287|undefined
 noteStop():void
 midTurnFoldCommitted():boolean
 analytics:typeof import('../../services/analytics/index.js').logEvent
 logError:typeof import('../../utils/log.js').logError
 revokeCodeliveredFollowups(commands:PrintDispatchCommand287[]):void
 cancelArtifactHandoffs(commands:PrintDispatchCommand287[]):PrintClearSurvivors287
}
export interface PrintSendNowRequest287 {subtype:'interrupt';send_now?:boolean;cancel_queued?:boolean;message_uuid?:string}
export interface PrintSendNowReceipt287 {still_queued:string[];send_now:'delivering'|'nothing_waiting'|'stopped'}
export interface PrintControlRuntime287 {
 cancelQueue(input:Omit<PrintControlInput287,'frameIntake'>&{cancelQueued:boolean;frameIntake?:PrintControlInput287['frameIntake']}):{receipt:{still_queued:string[];cancelled?:string[]};clearSurvivors:PrintClearSurvivors287}
 commitBatch(this:PrintBatchCommitHost287,batch:PrintBatch287):PrintBatch287|undefined
 sendNow(input:PrintControlInput287):PrintSendNowReceipt287
 interrupt(input:{drain:PrintDrain287;prewaitLatch:PrintPrewaitLatch287}):void
 isSendNow(request:PrintSendNowRequest287):boolean
 commandLacksUserIntent(command:PrintDispatchCommand287):boolean
 prewaitLatch:new(input:{messageQueue:Pick<PrintControlQueue287,'getCommandQueue'|'subscribeToRemovals'>;commandLacksUserIntent:(command:PrintDispatchCommand287)=>boolean})=>PrintPrewaitLatch287
 abortReason(cause:'remote-cancel'|'shutdown'):DOMException
}
export interface PrintBatch287 {command:PrintDispatchCommand287;members:PrintDispatchCommand287[];uuids:string[]}
export interface PrintBatchCommitHost287 {messageQueue:PrintControlQueue287;prewaitLatch:PrintPrewaitLatch287;io:PrintControlInput287['io'];revokeCodeliveredFollowups(commands:PrintDispatchCommand287[]):void}
export interface PrintPrewaitLatch287 {
 reset():void
 interruptBeforeArm():void
 isDoomBoundary(head:PrintDispatchCommand287,next:PrintDispatchCommand287):boolean
 parkBatch(value:boolean):void
 dropParkedBatch():void
 consumeAtArm(commands:readonly PrintDispatchCommand287[],firstTurn:boolean):boolean
 clearIfNothingPending():void
 dispose():void
}
export declare function createPrintControlRuntime287(ports:PrintControlPorts287):PrintControlRuntime287
