import type {AsyncResource} from 'node:async_hooks'
import type {AppState} from '../../state/AppState.js'
import type {SetAppState,TaskType} from '../../Task.js'
import type {TaskState} from '../../tasks/types.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {ExternalRegistry287} from './externalNative.js'
import type {logForDebugging} from '../../utils/debug.js'
import type {logEvent} from '../../services/analytics/index.js'
import type {SDKResultMessage,ModelUsage} from '../../entrypoints/agentSdkTypes.js'

export interface PrintHeldResultTotals287 {
 totalCostUsd:number;durationApiMs:number;modelUsage:Record<string,ModelUsage>
 usage?:SDKResultMessage['usage'];subagentStats?:unknown
}
export type PrintResultMessage287=SDKResultMessage & {queued_turn_count?:number}
export interface PrintResultCommand287 {mode?:string;agentId?:string;shouldQuery?:boolean;queryHeldForNextTurn?:boolean;handbackPointer?:boolean}
export interface PrintResultController287 {
 sessionMirror:boolean;flushSessionStorage():Promise<void>
 heldBackResults:PrintResultMessage287[];carriedEvalResults:PrintResultMessage287[];pendingPointerResults:Set<string>
 pendingNotificationWaits:Map<string,{firstSeen:number;expired:boolean}>
 holdsResults():boolean
 route(message:PrintResultMessage287,input:{command:PrintResultCommand287}):void|Promise<void>
 release():void|Promise<void>;flushBeforeResult():Promise<void>;emitHeldResults():void
}
export interface PrintResultControllerInput287 {
 drain:PrintDrain287;messageQueue:{peek(predicate:(command:PrintResultCommand287)=>boolean):PrintResultCommand287|undefined}
 toolState:unknown;store:{getState():AppState;setState:SetAppState}
 pendingNotificationWaits:Map<string,{firstSeen:number;expired:boolean}>;storageV5?:unknown
 sessionMirror:boolean;flushSessionStorage():Promise<void>;emit(message:PrintResultMessage287):void
 heldResultTotals():PrintHeldResultTotals287;turnAbortedForShutdown():boolean;shuttingDown():boolean;stopping():boolean
 teardownRequested():boolean;emitPendingSuggestion():void;handbackPointerResults:WeakSet<PrintResultMessage287>
}

export interface PrintDrainState287 {
  running:boolean
  inputClosed:boolean
  abortController:AbortController|undefined
  runPhase:'draining_commands'|'waiting_for_agents'|'finally_flush'|'finally_post_flush'|undefined
}
export interface PrintDrain287 extends PrintDrainState287 {
  turnUnderWay:boolean
  intentBatchInFlight:boolean
  pendingDispatchUuids:string[]
  drainingHandoff:{command:QueuedCommand;running:boolean}|undefined
  endSessionRequested:boolean
  dequeueCount:number
  turnStartClock:{enter(phase:"idle"|"earlier_turn"|"after_turn"|"background_wait"|"entry_joins"|"sdk_mcp_update"|"loop_top"|"session_start_wait"|"first_command"|"mcp_prewait"|"repo_wait"|"turn_joins"|"tool_pool"|"commit"|"after_arm"|"turn_gate"|"turn_open"|"engine_setup"|"tool_reread"|"cwd",at?:number):void;mark(at?:number):{clockId:string;spentMs:number[];controlRequestsMs:number}}
}
export interface PrintAdmission287 {tail:Promise<unknown>;pending:number}
export interface PrintCloseController287 {
  parked:Promise<void>|null
  ownParked:Promise<void>|null
  closeInput<T>(callback:()=>T):Promise<Awaited<T>>
  hasParked():boolean
  parkedUuids():string[]
  cancelParked():string[]
  acceptUserFrame(input:PrintUserFrame287):Promise<void>|void
}
export interface PrintUserFrame287 {
  ownFirstTurnMessage?:boolean
  frame:{uuid?:string;message:{content:unknown};[key:string]:unknown}
  command:QueuedCommand
  parsedAtMs:number
  waits:{dedupMs?:number;flagSettleMs?:number;receiveHookMs?:number;attachments?:{ms:number;count:number;inlinedImages:number;aheadOfFiles:number;stages?:Record<string,number>}}
  admit(queueing?:unknown):boolean|Promise<boolean>
  afterEnqueue?():void
}
export interface PrintIngressQueue287 {
  enqueue(command:QueuedCommand):void
  getCommandQueueLength():number
}
export interface PrintQueue287 {
  peek(predicate:(command:QueuedCommand)=>boolean):QueuedCommand|undefined
  enqueuePendingNotification(command:QueuedCommand):void
  removeByFilter(predicate:(command:QueuedCommand)=>boolean):void
}
export interface PrintSessionState287 {
  getState():string
  notifyStateChanged(state:'idle'):void
  onMetadataChanged?: (metadata:Record<string,unknown>)=>void
}
export interface PrintDetachedCall287 {
  tool:unknown;input:unknown;detachedAt:number
}
export interface PrintDetached287 {
  discardAll():void
  discardAllExcept(ids:ReadonlySet<string>):Set<string>
  discardAllOutside(messages:readonly import('../../types/message.js').Message[]):Set<string>
  outside(messages:readonly import('../../types/message.js').Message[]):Set<string>
  letGo(id:string):void
  wasLetGo(id:string):boolean
  settled(id:string,value:{status:'completed';settledAt:number;data:unknown}|{status:'failed'|'stopped';settledAt:number;text:string}):boolean
  resultQueued(id:string):void
  paintedInPlace(id:string):void
  getSnapshot():ReadonlyMap<string,PrintDetachedCall287 & {status:'running'|'completed'|'failed'|'stopped';data?:unknown;text?:string;resultQueued?:boolean;paintedInPlace?:boolean;settledAt?:number;stopRequested?:boolean}>
  subscribe(listener:()=>void):()=>void
  started(id:string,value:PrintDetachedCall287,stop:(cause:string)=>void):void
  awaitingResult():string[]
  owesResult(now:number):boolean
  ended(id:string):void
  stopRunning(ids?:Set<string>):number
}
export interface PrintParker287 {
 holdsEvalSettles():boolean
  park(input:{drainedThisIteration:boolean}):'again'|'done'|Promise<void>
  windDownDeadline:number|null
  windDownSwept:boolean
  bgWaitFirstIdle:number|null
  bgWaitCeilingExceeded:boolean
}
export interface PrintParkerInput287 {
  drain:PrintDrain287
  messageQueue:PrintQueue287
  io:{sessionState:PrintSessionState287}
  store:{getState():AppState;setState:SetAppState}
  detachedToolCalls:PrintDetached287
  pendingNotificationWaits:Map<string,{firstSeen:number;expired:boolean}>
  ccrRecap:unknown
  maxBudgetUsd:number|undefined
  turnAbortedForShutdown():boolean
  stopping():boolean
  pulseKeepAlive():void
  decideStashedAnswer():void
  onIdleReported():void
}
export interface PrintLifecycleEnvironment287 {
  CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS:number|undefined
  CLAUDE_CODE_BG_TASKS_REPORT_RUNNING:boolean|undefined
  CLAUDE_CODE_REMOTE:boolean
}
export interface PrintWindDownInput287 {
  runningBackgroundTasks:readonly TaskState[];inputClosed:boolean;hasMainThreadQueued:boolean
  hasActiveTeammates:boolean;hasPendingNotification:boolean;holdForArmedMonitors:boolean
  ceilingExceeded:boolean;deadline:number|null;swept:boolean;now:number
}
export interface PrintLifecyclePorts287 {
  isMainThreadAgent(command:QueuedCommand):boolean
  executionContext():ExecutionSession287
  flushSessionStorage():Promise<void>
  admissionSlot287:PrintLifecycleNative287["admissionSlot"]
  admit287:PrintLifecycleNative287["admit"]
  bindCallback:typeof AsyncResource.bind
  mainAgentId():string
  totalCost():number
  dequeueForAgent(predicate:(command:QueuedCommand)=>boolean):void
  analytics:typeof logEvent
  inboxRunPressure():number
  taskImplementation(kind:TaskType):{kill(id:string,registry:ExternalRegistry287,setState:SetAppState,cause:'system',storage?:unknown):Promise<void>}|undefined
  persistAgentStop(id:string,kind:string,storage?:unknown):void
  terminalEvent(id:string,status:'completed'|'failed'|'stopped',details?:{toolUseId?:string;summary?:string;ambient?:boolean;outputFile?:string}):void
  debug:typeof logForDebugging
  diagnostic(level:'info'|'warn',event:string,data?:Record<string,unknown>|(()=>Record<string,unknown>)):void
  logError(error:Error):void
  toError(value:unknown):Error
  shuttingDown():boolean
  teardownUnwindRequested():boolean
  process:Pick<NodeJS.Process,'env'|'stderr'>
  registry(getState:()=>AppState,setState:SetAppState):ExternalRegistry287
  environment:PrintLifecycleEnvironment287
  feature(name:string,fallback:boolean):boolean
  killShell(id:string,registry:ExternalRegistry287):void
  killObserver(id:string,registry:ExternalRegistry287):void
  stopTask(task:TaskState,registry:ExternalRegistry287,setState:SetAppState):Promise<void>
  reportRecap(recap:unknown,state:PrintSessionState287):void
  randomUUID():string
}
export interface PrintDispatchBatch287 {command:QueuedCommand;members:QueuedCommand[];uuids:string[]}
export interface PrintDispatchIntake287 {
 take():PrintDispatchBatch287|undefined;commit(batch:PrintDispatchBatch287):PrintDispatchBatch287|undefined
 start(batch:PrintDispatchBatch287):string[]
 noteTurnEnded(aborted:boolean,command:QueuedCommand,result:PrintResultMessage287):void
 exit():void
}
export interface PrintLifecycleNative287 {
  installMainLoopLiveness(input:{Yt:{inheritedPromptOwnsWorkerStatus():boolean};v():AppState;gs:Map<string,{firstSeen:number;expired:boolean}>;r:{setMainLoopLiveness(callback:()=>boolean):void};qe:PrintDrain287}):()=>boolean
 DispatchIntake:new(input:{messageQueue:import('../../cli/printOwnership287/printDispatchStartNative.js').PrintDispatchQueue287;drain:PrintDrain287;prewaitLatch:import('../../cli/printOwnership287/controlNative.js').PrintPrewaitLatch287;deliveryLedger:{startBatch(uuids:string[]):void};io:{sessionState:{notifyTurnStarting(mode:string,taskId?:string):void};onCommandLifecycle?(uuid:string,state:'cancelled'):void};commandLacksUserIntent(command:QueuedCommand):boolean;revokeCodeliveredFollowups(commands:QueuedCommand[]):void;stopping():boolean;endSessionHead(command:QueuedCommand):boolean;startGate:import('../../cli/printOwnership287/printDispatchStartNative.js').PrintDispatchStart287;deferredToolUsePending?:()=>boolean;holdsEvalSettles():boolean;coalesceTaskNotifications():boolean})=>PrintDispatchIntake287
 queuedTurnCount(queue:Pick<import('../../cli/printOwnership287/printDispatchStartNative.js').PrintDispatchQueue287,'getCommandQueueSnapshot'>):number
  ResultController:new(input:PrintResultControllerInput287)=>PrintResultController287
  refreshHeldResultTotals<T extends {type:string}>(message:T,totals:PrintHeldResultTotals287):T
  inboxSlot:{peek(execution:ExecutionSession287):{renotifyUnfetched(queue:PrintQueue287):void}|undefined}
  decideStashedAnswer(this:{stashedAdoptedParkAnswer?:unknown;fire(answer:unknown):void}):void
  Drain:new()=>PrintDrain287
  // The full original kc is emitted; this production adapter exposes only its
  // close surface. Admission/dedup/queue consumers are independently owned.
  CloseController:new(input:{admissionBarrier():PrintAdmission287;firstTurnGate?:()=>Promise<void>|undefined;messageQueue:PrintIngressQueue287;drain:PrintDrain287;receivedMessageUuids:{has(uuid:string):boolean;track(uuid:string):boolean};io:{onCommandLifecycle?:(uuid:string,state:'queued'|'completed')=>void};kick():void})=>PrintCloseController287
  Parker:new(input:PrintParkerInput287)=>PrintParker287
  admissionSlot:{of(execution:ExecutionSession287):PrintAdmission287}
  detachedSlot:{of(execution:ExecutionSession287):PrintDetached287}
  admit<T>(execution:ExecutionSession287,operation:()=>Promise<T>):Promise<T>
  windDown(tasks:readonly TaskState[],registry:ExternalRegistry287,setState:SetAppState,stopAgents:boolean):void
  policy(input:PrintWindDownInput287):{deadline:number|null;swept:boolean;shouldSweep:boolean}
  pulse(output:{enqueue(value:{type:'keep_alive'}):void},enabled:boolean):()=>void
  remoteSchema:{parse(value:string|undefined):boolean}
  ceilingSchema:{parse(value:string|undefined):number|undefined}
  reportRunningSchema:{parse(value:string|undefined):boolean|undefined}
  createEnvironment(schemas:{CLAUDE_CODE_REMOTE:PrintLifecycleNative287['remoteSchema'];CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS:PrintLifecycleNative287['ceilingSchema'];CLAUDE_CODE_BG_TASKS_REPORT_RUNNING:PrintLifecycleNative287['reportRunningSchema']},prototype:object|null):PrintLifecycleEnvironment287
  markTaskUserStopped(id:string,registry:ExternalRegistry287,storageV5?:unknown):void
  budgetSweep(input:{maxBudgetUsd:number|undefined;abortedForShutdown:boolean;turnAborted:boolean;getAppState():AppState;setAppState:SetAppState;storageV5?:unknown}):boolean
  stopForegroundAgents(input:{taskRegistry:ExternalRegistry287;setAppState:SetAppState;storageV5?:unknown}):void
  stopBackgroundAgents(input:{taskRegistry:ExternalRegistry287;setAppState:SetAppState;shouldStop?:(task:TaskState)=>boolean;storageV5?:unknown}):void
}
export function createPrintLifecycleNative287(ports:PrintLifecyclePorts287):PrintLifecycleNative287
