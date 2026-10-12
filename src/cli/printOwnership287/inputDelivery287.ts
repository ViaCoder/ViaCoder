import type {AppState} from '../../state/AppState.js'
import type {SetAppState} from '../../Task.js'
import type {Message} from '../../types/message.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {PrintDrain287} from '../../tools/GetTaskTool/printLifecycleNative.js'
import {getExecutionSession287,getLegacyExecutionContext287} from '../../services/context/execution287.js'
import {createOfficialLowLatencySubmit287} from '../../utils/officialLowLatencySubmit287/native.js'
import {createOfficialLowLatencyReplBindings287} from '../../utils/officialLowLatencySubmit287/replBindings287.js'
import {isOfficialMidTurnFoldCommitted287} from '../../utils/officialLowLatencyQueue287/native.js'
import {getCommandQueue,getCommandQueueSnapshot,subscribeToCommandQueue,promoteToNow,demoteFromNow,isFoldInFlight,isMidTurnFoldSuspended} from '../../utils/messageQueueManager.js'
import {getGetTaskFeatureState287} from '../../utils/task/getTaskSession287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {updateTaskState} from '../../utils/task/framework.js'
import {isLocalAgentTask} from '../../tasks/LocalAgentTask/LocalAgentTask.js'
import {logEvent} from '../../services/analytics/index.js'
import {logError} from '../../utils/log.js'
import {createPrintInputDeliveryRuntime287} from './inputDeliveryNative.js'
export function createPrintInputDelivery287(host:{getAppState():AppState;setAppState:SetAppState;messages():Message[];drain:PrintDrain287}) {
 const execution=getExecutionSession287()
 // Pm creates exactly one qEt; this is A2's original class, not a second engine.
 const bindings=createOfficialLowLatencyReplBindings287({execution,getAppState:host.getAppState,setAppState:host.setAppState})
 const submit=createOfficialLowLatencySubmit287(bindings)
 const native=createPrintInputDeliveryRuntime287({Coordinator:submit.Coordinator,
  midTurnFoldCommitted:isOfficialMidTurnFoldCommitted287,executionContext:getExecutionSession287,legacyContext:getLegacyExecutionContext287,
  analytics:logEvent,logError,
  feature:<T>(name:string,fallback:T):T=>{const pinned=getGetTaskFeatureState287(execution).pinnedFeatureValues;return pinned?.has(name)?pinned.get(name) as T:getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)},
 })
 const mainId=()=>bindings.Ge()
 const project=(commands:ReturnType<typeof getCommandQueue>)=>commands.map(c=>c.agentId===undefined?{...c,agentId:mainId()}:c)
 const delivery=new native.Delivery({messageQueue:{getCommandQueue:()=>project(getCommandQueue()),getCommandQueueSnapshot:()=>project([...getCommandQueueSnapshot()]),subscribe:subscribeToCommandQueue,promoteToNow,demoteFromNow,isFoldInFlight,isMidTurnFoldSuspended},drain:host.drain,enabled:native.enabled,transcript:{getSnapshot:host.messages},session:execution,
  taskRegistry:{get:id=>host.getAppState().tasks[id],getTranscript:id=>{const task=host.getAppState().tasks[id];if(!isLocalAgentTask(task))return undefined;const messages=task.messages??[];return {messages,inProgressToolUseIDs:new Set(submit.transcriptMap(messages).keys())}},all:()=>Object.values(host.getAppState().tasks),update:(id,updater)=>updateTaskState(id,host.setAppState,updater)},
  clock:{setTimeout:(callback,delay)=>{const timer=setTimeout(callback,delay);return()=>clearTimeout(timer)}},
 })
 // Local main-lane commands omit agentId; raw Pm/B7/Xf expects Ge().
 // Use the same identity-only view as the queue port, and copy back only the
 // original Pm priority mutation before the canonical queue publishes it.
 function takeBeforeEnqueue(command:QueuedCommand):void {
  const view=project([command])[0]!
  delivery.takeBeforeEnqueue(view)
  command.priority=view.priority
 }
 // Original Xf is also the print idle/re-entry predicate: passive detached
 // cancellation notices must not restart an empty Fc drain forever at EOF.
 return {delivery,humanOrigin:native.humanOrigin,takeBeforeEnqueue,isMainThread:(command:QueuedCommand)=>native.isMainThread(project([command])[0]!)}
}
