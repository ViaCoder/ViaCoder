import './ownerMethods287.js'
import {sourceModelAdmission287,modelAdmissionSlot287} from '../../utils/model/modelAdmissionOwner287.js'
import {getMainLoopActivityPressure287} from '../../utils/sessionActivity.js'
import {asAgentId} from '../../types/ids.js'
import {AsyncResource} from 'node:async_hooks'
import {randomUUID} from 'node:crypto'
import type {AppState} from '../../state/AppState.js'
import type {SetAppState,TaskType} from '../../Task.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {TaskState} from '../../tasks/types.js'
import type {ExternalRegistry287} from './externalNative.js'
import {isLocalShellTask} from '../../tasks/LocalShellTask/guards.js'
import {getTaskByType} from '../../tasks.js'
import {killAsyncAgent} from '../../tasks/LocalAgentTask/LocalAgentTask.js'
import {markAgentUserStopped} from '../AgentTool/userStopState.js'
import {getTotalCostUSD} from '../../bootstrap/state.js'
import {getTotalAPIDuration,getModelUsage} from '../../cost-tracker.js'
import {flushSessionStorage} from '../../utils/sessionStorage.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import {captureGetTaskProducer287,getTaskShellProducer287,getGetTaskFeatureState287} from '../../utils/task/getTaskSession287.js'
import {killTaskWithGetTask287,killShellTasksAtStreamClose287,emitTaskTerminal287} from './killBridge287.js'
import {updateTaskState} from '../../utils/task/framework.js'
import {peek,dequeueAllMatching,enqueuePendingNotification,removeByFilter,getCommandQueue,getCommandQueueLength,enqueue} from '../../utils/messageQueueManager.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {logEvent} from '../../services/analytics/index.js'
import {logForDebugging} from '../../utils/debug.js'
import {logForDiagnosticsNoPII} from '../../utils/diagLogs.js'
import {logError} from '../../utils/log.js'
import {toError} from '../../utils/errors.js'
import {isShuttingDown} from '../../utils/gracefulShutdown.js'
import {registrationCommitted287} from '../../utils/hooks/modelSwitch287/registrationGate.js'
import {subagentStats287} from '../AgentTool/subagentStats287.js'
import {createPrintDispatchStartNative287,type PrintDispatchQueue287} from '../../cli/printOwnership287/printDispatchStartNative.js'
import {printCancellation287} from '../../cli/printOwnership287/cancellation287.js'
import {getSessionState,notifySessionStateChanged} from '../../utils/sessionState.js'
import {createPrintLifecycleNative287,type PrintLifecycleEnvironment287,type PrintDrainState287,type PrintParker287,type PrintUserFrame287,type PrintLifecyclePorts287,type PrintResultController287,type PrintResultMessage287} from './printLifecycleNative.js'

function registry(getState:()=>AppState,setState:SetAppState):ExternalRegistry287 {
  return {all:()=>getState().tasks,get:id=>getState().tasks[id],update:(id,updater)=>updateTaskState(id,setState,updater)}
}
function taskImplementation(kind:TaskType) {
  const task=getTaskByType(kind)
  if(!task)return undefined
  return {async kill(id:string,_registry:ExternalRegistry287,setState:SetAppState,_cause:'system'){
    if(kind==='local_agent')killAsyncAgent(id,setState,false,_cause)
    else await task.kill(id,setState)
  }}
}
let flags:PrintLifecycleEnvironment287
const environment:PrintLifecycleEnvironment287={
  get CLAUDE_CODE_REMOTE(){return flags.CLAUDE_CODE_REMOTE},
  get CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS(){return flags.CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS},
  get CLAUDE_CODE_BG_TASKS_REPORT_RUNNING(){return flags.CLAUDE_CODE_BG_TASKS_REPORT_RUNNING},
}
// Single factory instance: original JO/KS use Tt.of(execution.root), so their
// slots must not be regenerated per run, print invocation, host, or /clear.
export const printLifecyclePorts287:PrintLifecyclePorts287={
  executionContext:getExecutionSession287,
  isMainThreadAgent:command=>command.agentId===undefined||command.agentId===printLifecyclePorts287.mainAgentId(),
  flushSessionStorage,
  bindCallback:AsyncResource.bind,randomUUID,
  admissionSlot287:modelAdmissionSlot287,admit287:sourceModelAdmission287.j_,
  mainAgentId:()=>{const e=getExecutionSession287();return e.identity.mainAgentId(e.id)},
  totalCost:getTotalCostUSD,dequeueForAgent:dequeueAllMatching,
  analytics:logEvent,taskImplementation,
  inboxRunPressure:getMainLoopActivityPressure287,
  persistAgentStop:id=>{markAgentUserStopped(id)},
  terminalEvent:(id,status,details)=>emitTaskTerminal287(captureGetTaskProducer287(),id,status,details),
  debug:logForDebugging,diagnostic:(level,event,data)=>logForDiagnosticsNoPII(level,event,typeof data==='function'?data():data),
  logError,toError,shuttingDown:isShuttingDown,
  teardownUnwindRequested:()=>getExecutionSession287().sessionFlags.teardownUnwindRequested(),
  process,registry:ownedRegistry,environment,
  feature:(name,fallback)=>{
    const fixture=getGetTaskFeatureState287().pinnedFeatureValues
    return fixture?.has(name)?fixture.get(name)===true:getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)
  },
  killShell:(id,r)=>killTaskWithGetTask287(id,setterForRegistry(r)),
  killObserver:(id,r)=>killAsyncAgent(id,setterForRegistry(r),false,'system'),
  stopTask:async(task,r,setState)=>{await taskImplementation(task.type)?.kill(task.id,r,setState,'system')},
  // Local StructuredIO has no recap generation producer. Preserve the real
  // original first guard rather than advertising/modeling private generation.
  reportRecap:(_recap,state)=>{
    if(!state.onMetadataChanged)return
    throw Error('Qualified print recap producer requires its original host callback')
  },
}
const native=createPrintLifecycleNative287(printLifecyclePorts287)
// Read the already installed canonical Hooks startup-marker slots lazily;
// print owns no additional A6/JV/YKe cache or state.
export const printDispatchStartPorts287={
  mainAgentId:printLifecyclePorts287.mainAgentId,isMainThreadAgent:printLifecyclePorts287.isMainThreadAgent,
  get startUuids(){return (require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().markers.A6},
  get startJoin(){return (require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().markers.JV},
  get aheadUuids(){return (require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().markers.YKe},
}
let dispatchStartOwner287:ReturnType<typeof createPrintDispatchStartNative287>|undefined
function getDispatchStartOwner287(){return dispatchStartOwner287??=createPrintDispatchStartNative287(printDispatchStartPorts287)}
// Original KS is shared with the detached tool producer; no second factory.
export const printDetachedSlot287=native.detachedSlot
flags=native.createEnvironment({CLAUDE_CODE_REMOTE:native.remoteSchema,CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS:native.ceilingSchema,CLAUDE_CODE_BG_TASKS_REPORT_RUNNING:native.reportRunningSchema},null)

// Associate only concrete registry views with their actual existing setter.
// No second task store; original ih/PP/_N use this registry throughout.
const registrySetters=new WeakMap<ExternalRegistry287,SetAppState>()
function setterForRegistry(r:ExternalRegistry287):SetAppState {
  const set=registrySetters.get(r)
  if(!set)throw Error('Print lifecycle requires its concrete AppState registry owner')
  return set
}
function ownedRegistry(getState:()=>AppState,setState:SetAppState):ExternalRegistry287 {
  const r=registry(getState,setState);registrySetters.set(r,setState);return r
}

export interface PrintLifecycleHost287 {
  getAppState():AppState
  setAppState:SetAppState
  state:PrintDrainState287
  maxBudgetUsd:number|undefined
  remoteTransport():boolean
  output:{enqueue(value:{type:'keep_alive'}):void}
  receivedMessageUuids:{has(uuid:string):boolean;track(uuid:string):boolean}
  onCommandLifecycle?:(uuid:string,state:'queued'|'completed')=>void
  firstTurnGate?():Promise<void>|undefined
  beforeBackgroundWait287?():void
  kick():void
}
export function createPrintLifecycle287(host:PrintLifecycleHost287) {
  const producer=captureGetTaskProducer287()
  const withOwner=<T>(fn:()=>T)=>runWithExecutionSession287(producer.execution,fn)
  function belongs(task:TaskState):boolean {
    return !isLocalShellTask(task)||!task.shellCommand||getTaskShellProducer287(task.shellCommand).owner.host===producer.owner.host
  }
  const getState=()=>withOwner(()=>{
    const state=host.getAppState()
    return {...state,tasks:Object.fromEntries(Object.entries(state.tasks).filter(([,task])=>belongs(task)))}
  })
  const setState:SetAppState=updater=>withOwner(()=>host.setAppState(prev=>{
    const own=Object.fromEntries(Object.entries(prev.tasks).filter(([,task])=>belongs(task)))
    const foreign=Object.fromEntries(Object.entries(prev.tasks).filter(([,task])=>!belongs(task)))
    const next=updater({...prev,tasks:own})
    return {...next,tasks:{...foreign,...next.tasks}}
  }))
  const drain=new native.Drain()
  // Canonical existing print scalars remain canonical for frozen consumers.
  // Source controller accesses exactly those values via descriptors; original
  // hc clock/counter/other state is intact, not hand-reimplemented.
  Object.defineProperties(drain,Object.getOwnPropertyDescriptors(host.state))
  const controller=new native.CloseController({
    admissionBarrier:()=>native.admissionSlot.of(producer.execution),firstTurnGate:host.firstTurnGate,drain,
    messageQueue:{enqueue,getCommandQueueLength},receivedMessageUuids:host.receivedMessageUuids,
    io:{onCommandLifecycle:host.onCommandLifecycle},kick:host.kick,
  })
  let parkedPermissionController:{stashedAdoptedParkAnswer?:unknown;fire(reason:unknown):void;inheritedPromptOwnsWorkerStatus():boolean}|undefined
  const waits=new Map<string,{firstSeen:number;expired:boolean}>()
  let parker:PrintParker287|undefined
  let closing:Promise<void>|undefined
  let resultController:PrintResultController287|undefined
  return {
    producer,drain,controller,
    installResultController(input:{emit(message:PrintResultMessage287):void;emitPendingSuggestion():void;sessionMirror?:boolean;handbackPointerResults?:WeakSet<PrintResultMessage287>}){
      if(resultController)throw Error('Print result controller already installed')
      const handbackPointerResults=input.handbackPointerResults??new WeakSet<PrintResultMessage287>()
      resultController=withOwner(()=>new native.ResultController({drain,
        messageQueue:{peek:predicate=>peek(command=>predicate({...command,agentId:command.agentId??producer.execution.identity.mainAgentId(producer.execution.id)}))},
        toolState:producer.owner.toolState,store:{getState,setState},pendingNotificationWaits:waits,
        sessionMirror:input.sessionMirror===true,flushSessionStorage,
        emit:input.emit,emitPendingSuggestion:input.emitPendingSuggestion,handbackPointerResults,
        heldResultTotals:()=>({totalCostUsd:getTotalCostUSD(),durationApiMs:getTotalAPIDuration(),modelUsage:getModelUsage(),usage:undefined,subagentStats:subagentStats287.snapshot(producer.execution)}),
        turnAbortedForShutdown:()=>drain.abortController?.signal.aborted===true&&isShuttingDown(),
        shuttingDown:isShuttingDown,stopping:()=>isShuttingDown()||registrationCommitted287(),teardownRequested:()=>producer.execution.sessionFlags.teardownUnwindRequested(),
      }))
      const active=resultController
      return {controller:active,handbackPointerResults,pendingNotificationWaits:waits,
        holdsResults:()=>withOwner(()=>active.holdsResults()),
        route:(...args:Parameters<PrintResultController287['route']>)=>withOwner(()=>active.route(...args)),
        release:()=>withOwner(()=>active.release()),
      }
    },
    // Full original B6t: a completed held result keeps its original outcome,
    // but release reads the same canonical cost/API/model totals as its caller.
    refreshHeldResultTotals<T extends {type:string}>(message:T){
      return withOwner(()=>native.refreshHeldResultTotals(message,{totalCostUsd:getTotalCostUSD(),durationApiMs:getTotalAPIDuration(),modelUsage:getModelUsage()}))
    },
    createDispatchIntake(input:{messageQueue:PrintDispatchQueue287;prewaitLatch:import('../../cli/printOwnership287/controlNative.js').PrintPrewaitLatch287;commandLacksUserIntent(command:QueuedCommand):boolean;deferredToolUsePending?:()=>boolean;holdsEvalSettles():boolean;notifyCommandLifecycle(uuid:string,state:'cancelled'|'started'):void}){
      // Original main-lane predicate uses the canonical identity adapter.
      // All head/follower objects stay the very same queue references.
      const queue=input.messageQueue
      const startNative=getDispatchStartOwner287()
      const stopping=()=>isShuttingDown()
      const startGate=new startNative.StartGate(queue,stopping)
      const dispatch=withOwner(()=>new native.DispatchIntake({messageQueue:queue,drain,prewaitLatch:input.prewaitLatch,
        deliveryLedger:{startBatch:uuids=>{for(const uuid of uuids)input.notifyCommandLifecycle(uuid,'started')}},
        io:{sessionState:{notifyTurnStarting:(mode,taskId)=>startNative.notifyTurnStarting.call({},mode,taskId)},onCommandLifecycle:(uuid,state)=>input.notifyCommandLifecycle(uuid,state)},
        commandLacksUserIntent:input.commandLacksUserIntent,revokeCodeliveredFollowups:printCancellation287.revokeCodeliveredFollowups,
        stopping,endSessionHead:command=>startNative.endSessionHead(command),startGate,
        deferredToolUsePending:input.deferredToolUsePending,holdsEvalSettles:input.holdsEvalSettles,
        coalesceTaskNotifications:()=>printLifecyclePorts287.feature('tengu_swirling_meteor',true),
      }))
      return {dispatch,async take(){const wait=withOwner(()=>startGate.waitForHead(()=>command=>drain.endSessionRequested?startNative.endSessionHead(command):startNative.isMainThread(command)));if(wait)await wait;return withOwner(()=>dispatch.take())},queuedTurnCount:()=>withOwner(()=>native.queuedTurnCount({getCommandQueueSnapshot:input.messageQueue.getCommandQueueSnapshot}))}
    },
    resultStopping:()=>isShuttingDown()||registrationCommitted287(),
    taskRegistry:()=>ownedRegistry(getState,setState),
    stopBackgroundAgents:native.stopBackgroundAgents,
    stopForegroundAgents:native.stopForegroundAgents,
    budgetSweep:native.budgetSweep,
    markTaskUserStopped(id:string){
      const r=ownedRegistry(getState,setState),task=r.get(id)
      // Original sge validates the installed task implementation before zee.
      // The existing stop dispatcher retains its typed unsupported-task error.
      if(task&&getTaskByType(task.type))withOwner(()=>native.markTaskUserStopped(id,r))
    },
    installParkedPermissionController(value:NonNullable<typeof parkedPermissionController>){
      if(parkedPermissionController&&parkedPermissionController!==value)throw Error('Print parked permission controller is already installed')
      parkedPermissionController=value
    },
    installMainLoopLiveness(io:{setMainLoopLiveness(callback:()=>boolean):void}){
      if(!parkedPermissionController)throw Error('Print liveness requires the actual parked permission controller')
      const permission=parkedPermissionController
      return withOwner(()=>native.installMainLoopLiveness({Yt:permission,v:getState,gs:waits,
        r:{setMainLoopLiveness:callback=>io.setMainLoopLiveness(()=>withOwner(callback))},qe:drain}))
    },
    holdsEvalSettles:()=>parker?.holdsEvalSettles()??false,
    admissionBarrier:()=>native.admissionSlot.of(producer.execution),
    acceptUserFrame(frame:PrintUserFrame287){return controller.acceptUserFrame(frame)},
    waitForInputOperation<T>(work:Promise<T>):Promise<T>{return withOwner(()=>native.admit(producer.execution,()=>work))},
    openRun(){
      parker=withOwner(()=>new native.Parker({drain,
        messageQueue:{peek:predicate=>peek(command=>predicate({...command,agentId:command.agentId??asAgentId(producer.execution.identity.mainAgentId(producer.execution.id))})),enqueuePendingNotification,removeByFilter},
        io:{sessionState:{getState:getSessionState,notifyStateChanged:notifySessionStateChanged}},
        store:{getState,setState},
        detachedToolCalls:native.detachedSlot.of(producer.execution),pendingNotificationWaits:waits,
        ccrRecap:producer.execution.ccrRecap,maxBudgetUsd:host.maxBudgetUsd,
        turnAbortedForShutdown:()=>drain.abortController?.signal.aborted===true&&isShuttingDown(),
        stopping:isShuttingDown,pulseKeepAlive:native.pulse(host.output,environment.CLAUDE_CODE_REMOTE),
        decideStashedAnswer:()=>{if(parkedPermissionController)native.decideStashedAnswer.call(parkedPermissionController)},
        onIdleReported:()=>native.inboxSlot.peek(producer.execution)?.renotifyUnfetched({peek,enqueuePendingNotification,removeByFilter}),
      }))
    },
    async park(drainedThisIteration:boolean):Promise<boolean>{
      if(!parker)throw Error('Print parker requires the actual run-entry initializer')
      const active=parker
      const parked=withOwner(()=>active.park({drainedThisIteration}))
      if(typeof parked!=="string")host.beforeBackgroundWait287?.()
      const result=await parked
      return result!=='done'
    },
    closeInput<T>(callback:()=>T):Promise<Awaited<T>> {return withOwner(()=>controller.closeInput(callback))},
    closeStream(finish:()=>Promise<void>,options?:{shellCloseOwnedByDf:boolean}):Promise<void>{
      return closing??=withOwner(async()=>{
        await finish()
        // Original Df: hooks/control/events settle, dh->uh, event close, done.
        // Caller closes the real event/output stream only after this returns.
        if(!options?.shellCloseOwnedByDf)killShellTasksAtStreamClose287({shuttingDown:isShuttingDown(),remoteTransport:host.remoteTransport()},getState,setState)
      })
    },
  }
}
