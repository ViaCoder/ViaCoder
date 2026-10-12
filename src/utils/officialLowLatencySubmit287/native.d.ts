import type { QueuePriority, QueuedCommand } from '../../types/textInputTypes.js'
import type { AgentId } from '../../types/ids.js'
import type { Message } from '../../types/message.js'
import type { TaskState } from '../../tasks/types.js'
import type { MutableTask287 } from '../../tools/GetTaskTool/sessionNative.js'
import type { ExecutionSession287 } from '../../services/context/officialExecutionOwners287/native.js'
import type { ForegroundCall287 } from '../../cli/printOwnership287/detachedRuntimeNative.js'
export interface OfficialLowLatencyQueuedCommand287 extends QueuedCommand { screeningPending?: boolean; drainOnly?: boolean; promptSubmitted?: object; skipAttachments?: boolean }
export interface OfficialLowLatencyQueue287 { getCommandQueueSnapshot(): readonly OfficialLowLatencyQueuedCommand287[]; getCommandQueue(): OfficialLowLatencyQueuedCommand287[]; subscribe(listener:()=>void):()=>void; promoteToNow(uuid:string):boolean; demoteFromNow(uuid:string,raisedFrom:QueuePriority):boolean; isFoldInFlight(uuid:string):boolean; isMidTurnFoldSuspended():boolean }
export interface OfficialLowLatencyEvidence287 { isHeldByDialog:boolean; isCompacting:boolean; isToolCallStarting:boolean; isMainRequestAnnounced:boolean }
export interface OfficialLowLatencyTurn287 { agentId?:AgentId; guard:{isActive:boolean;isRunning:boolean;subscribe(listener:()=>void):()=>void}; endsUnmovableShells:boolean; abortController:AbortController|null; readEvidence():OfficialLowLatencyEvidence287; interruptForSubmit?:()=>void }
/** Exact qEt consumers read all() and mutate via update(); no GetTask-only get() bag. */
export interface OfficialLowLatencyTaskRegistry287 { all():TaskState[]; get(id:AgentId):TaskState|undefined; getTranscript(id:AgentId):{messages:Message[];inProgressToolUseIDs:ReadonlySet<string>}|undefined; update(id:string,updater:(task:MutableTask287)=>MutableTask287):void }
/** qEt cTe.peek(session) is keyed by the real execution-session owner. */
export type OfficialLowLatencyTaskSession287 = ExecutionSession287
export interface OfficialLowLatencyConfiguration287 { messageQueue:OfficialLowLatencyQueue287;turn:OfficialLowLatencyTurn287;transcript:{getSnapshot():Message[]};session:OfficialLowLatencyTaskSession287;taskRegistry:OfficialLowLatencyTaskRegistry287;clock:{setTimeout(callback:()=>void,delayMs:number):()=>void};featureName:string }
export type OfficialLowLatencyOutcome287 = { action:'stand_by' }|{action:'wait';reason:'held_by_dialog'|'not_ready'|'behind_earlier'|'compacting'|'moved_result'|'unmovable_grace'|'not_sampling'}|{action:'background'|'interrupt'|'cancel'}
export interface OfficialLowLatencyDecisionInput287 { head:'ended_by_hook'|'not_ready'|'behind_earlier'|'deliverable';hasFoldTakenPrompt:boolean;isLocalTurnActive:boolean;isLocalTurnRunning:boolean;isHeldByDialog:boolean;holderCount:number;unmovableHolderCount:number;isExecuting:boolean;isAwaitingMovedResult:boolean;isBackgroundingDisabled:boolean;isCompacting:boolean;isUnmovableGraceOver:boolean;isMainRequestInFlight:boolean }
export interface OfficialLowLatencyCoordinator287 { sendQueuedNow():boolean;dispose():void }
export interface OfficialLowLatencyAgentCache287 { sendQueuedNow(agentId?:AgentId):boolean;dispose():void }
export interface OfficialLowLatencyAgentCacheConfiguration287 extends Omit<OfficialLowLatencyConfiguration287,'turn'|'messageQueue'|'transcript'> { turn:OfficialLowLatencyTurn287;messageQueue:OfficialLowLatencyQueue287;transcript:{getSnapshot():Message[]} }
export interface OfficialLowLatencyAgentCacheBindings287 { yo(agentId:string):AgentId;Rlt(configuration:OfficialLowLatencyAgentCacheConfiguration287):OfficialLowLatencyEvidence287 }
export type OfficialLowLatencyCaller287 = 'inner'|'turn'|'agent'
export declare function officialLowLatencyCaller287(context:{innerCall?:boolean;agentId?:AgentId}):OfficialLowLatencyCaller287
export interface OfficialLowLatencySourceBindings287 {
 Ge:(agentId?:AgentId)=>AgentId
 p:(featureName:string,outcome:string)=>void; d:(error:unknown)=>void; m:(featureName:string,event:string)=>void
 Za:()=>boolean; YOr:(tasks:TaskState[],registry:OfficialLowLatencyTaskRegistry287)=>TaskState[]
 _N:(id:string,registry:OfficialLowLatencyTaskRegistry287)=>void
 cTe:{peek(session:OfficialLowLatencyTaskSession287):{list():ForegroundCall287[]}|undefined}
 oGo:(feature:string)=>boolean; que:()=>number; t:(message:string)=>void; lFe:(id:string,registry:OfficialLowLatencyTaskRegistry287)=>boolean; ZTo:(calls:ForegroundCall287[])=>number; y:(featureName:string)=>void
 }
export declare const officialLowLatencySubmitSourcePorts287: Readonly<Record<keyof OfficialLowLatencySourceBindings287,{file:string;name:string}>>
export declare function isOfficialEligiblePrompt287(command:OfficialLowLatencyQueuedCommand287):boolean
export declare function evaluateOfficialLowLatencyDecision287(input:OfficialLowLatencyDecisionInput287):OfficialLowLatencyOutcome287
export declare function createOfficialLowLatencySubmit287(ports:OfficialLowLatencySourceBindings287):{Coordinator:new(configuration:OfficialLowLatencyConfiguration287)=>OfficialLowLatencyCoordinator287;create(configuration:OfficialLowLatencyConfiguration287):OfficialLowLatencyCoordinator287;createAgentCache(configuration:OfficialLowLatencyAgentCacheConfiguration287,bindings:OfficialLowLatencyAgentCacheBindings287):OfficialLowLatencyAgentCache287;decide:typeof evaluateOfficialLowLatencyDecision287;transcriptMap(messages:Message[]):Map<string,string>;head(queue:OfficialLowLatencyQueuedCommand287[],tracked:Map<string,{outcome:string;raisedFrom:QueuePriority|null}>,owner:OfficialLowLatencyQueue287,agentId:AgentId):{head:string;uuid:string;priority:QueuePriority}|null;eligibleTasks(tasks:TaskState[],transcriptToolUseIds:Map<string,string>,agentId?:AgentId):TaskState[]}
