import type {AppState} from '../../state/AppState.js'
import type {SetAppState} from '../../Task.js'
import {isLocalShellTask} from '../../tasks/LocalShellTask/guards.js'
import {logError} from '../../utils/log.js'
import {dequeueAllMatching} from '../../utils/messageQueueManager.js'
import {enqueueSdkEvent} from '../../utils/sdkEventQueue.js'
import {appendTaskOutput,evictTaskOutput,getTaskOutputPath} from '../../utils/task/diskOutput.js'
import {updateTaskState} from '../../utils/task/framework.js'
import {captureGetTaskProducer287,getTaskShellProducer287,type GetTaskProducer287} from '../../utils/task/getTaskSession287.js'
import {runWithExecutionSession287} from '../../services/context/execution287.js'
import {getTaskDebug287} from './nativeHost.js'
import {createGetTaskExternalNative287,type ExternalRegistry287} from './externalNative.js'

/** This is a view of the actual AppState registry, not a second task store.
 * Keep the local cleanup hooks around the original source state transition. */
function registry287(setAppState:SetAppState,getAppState?:()=>AppState):ExternalRegistry287 {
  const registry:ExternalRegistry287={
    all(){
      if(getAppState)return getAppState().tasks
      let tasks:AppState['tasks']|undefined
      setAppState(state=>{tasks=state.tasks;return state})
      if(!tasks)throw Error('GetTask kill requires a synchronous AppState owner')
      return tasks
    },
    get(id){return registry.all()[id]},
    update(id,updater){updateTaskState(id,setAppState,task=>{
      const next=updater(task)
      if(next!==task&&isLocalShellTask(task)&&task.status==='running'&&next.status==='killed'){
        task.unregisterCleanup?.()
        if(task.cleanupTimeoutId)clearTimeout(task.cleanupTimeoutId)
        return {...next,unregisterCleanup:undefined,cleanupTimeoutId:undefined}
      }
      return next
    })},
  }
  return registry
}

function native287(producer:GetTaskProducer287,killTask:(id:string,registry:ExternalRegistry287)=>void) {
  return createGetTaskExternalNative287({
    taskSession:()=>producer.owner.session,enabled:()=>producer.owner.registration.enabled(),
    enqueueHostEvent:enqueueSdkEvent,appendOutput:appendTaskOutput,
    evictOutput(id){void evictTaskOutput(id)},outputPath:getTaskOutputPath,
    debug:getTaskDebug287,logError,killTask,dequeueForAgent:dequeueAllMatching,
  })
}

/** Original Ii/Vh bookend, using exactly the captured host claim set. */
export function emitTaskTerminal287(producer:GetTaskProducer287,id:string,status:'completed'|'failed'|'stopped',details?:{toolUseId?:string;summary?:string;ambient?:boolean;outputFile?:string}):void {
  runWithExecutionSession287(producer.execution,()=>native287(producer,(nextId,nextRegistry)=>killFromRegistry287(nextId,nextRegistry)).emitTerminal(id,status,details))
}

/** Full original _N / Ii / Vh / cN, bound to the spawn owner. Caller adapters
 * retain existing local cleanup behavior; no process-tree claim is made here. */
export function killTaskWithGetTask287(id:string,setAppState:SetAppState,captured?:GetTaskProducer287):void {
  killFromRegistry287(id,registry287(setAppState),captured)
}
function killFromRegistry287(id:string,registry:ExternalRegistry287,captured?:GetTaskProducer287):void {
  const task=registry.get(id)
  const producer=captured??(isLocalShellTask(task)&&task.shellCommand?getTaskShellProducer287(task.shellCommand):captureGetTaskProducer287())
  runWithExecutionSession287(producer.execution,()=>{
    native287(producer,(nextId,nextRegistry)=>killFromRegistry287(nextId,nextRegistry)).killShell(id,registry)
  })
}

/** Original Fs chooses running local shells of exactly this agent and purges
 * its real queue. Each _N call resolves that shell's captured host separately. */
export function killShellTasksForAgentWithGetTask287(agentId:string,getAppState:()=>AppState,setAppState:SetAppState):void {
  const producer=captureGetTaskProducer287(),registry=registry287(setAppState,getAppState)
  native287(producer,(id,sourceRegistry)=>killFromRegistry287(id,sourceRegistry)).killForAgent(agentId,registry)
}

/** Original print dh -> uh source consumer. The stream owner must supply its
 * actual shutdown/transport state; this is not an idle-turn or /clear hook. */
export function killShellTasksAtStreamClose287(context:{shuttingDown:boolean;remoteTransport:boolean},getAppState:()=>AppState,setAppState:SetAppState):void {
  const producer=captureGetTaskProducer287(),registry=registry287(setAppState,getAppState)
  const native=native287(producer,(id,sourceRegistry)=>killFromRegistry287(id,sourceRegistry))
  if(native.shouldCloseShells(context))native.closeShells(registry)
}
/** Reuse the already recovered full dh in this GetTask source view. This is a
 * stateless predicate, not another canonical lifecycle or shell owner. */
export function shouldCloseShellTasksAtStreamClose287(context:{shuttingDown:boolean;remoteTransport:boolean}):boolean {
  const producer=captureGetTaskProducer287()
  return native287(producer,(id,sourceRegistry)=>killFromRegistry287(id,sourceRegistry)).shouldCloseShells(context)
}
/** Df has already evaluated original dh; invoke the same original uh directly,
 * retaining captured shell ownership and the local cleanup hooks. */
export function closeShellTasksWithGetTask287(getAppState:()=>AppState,setAppState:SetAppState):void {
  const producer=captureGetTaskProducer287(),registry=registry287(setAppState,getAppState)
  native287(producer,(id,sourceRegistry)=>killFromRegistry287(id,sourceRegistry)).closeShells(registry)
}
