import {feature} from 'bun:bundle'
import type {Permutations} from '../types/utils.js'
import type {AppState} from '../state/AppStateStore.js'
import type {EditablePromptInputMode,PromptInputMode,QueuedCommand} from '../types/textInputTypes.js'
import type {OriginalSessionMessageQueue287} from './plugins/officialHooksLifecycle287/native.js'
import {getExecutionSession287,runWithExecutionSession287} from '../services/context/execution287.js'
import {recordQueueOperation} from './sessionStorage.js'

export type SetAppState = (f:(prev:AppState)=>AppState)=>void

/** All callers share original Dbn.of(session.root). Resolve lazily: importing
 * this facade during lifecycle construction must never instantiate a lifecycle.
 * ZPo transfers pending command references once, resets the prior bootstrap
 * queue, and thereafter returns its already-installed complete zOr owner. */
function source287(){
 return (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().messageQueue287
}
export function getCanonicalMessageQueue287():OriginalSessionMessageQueue287 {
 const source=source287()
 return source.install(adopt=>source.create({adopt,recordOperation:recordQueueOperation}))
}
function invoke<K extends keyof OriginalSessionMessageQueue287>(
 name:K,...args:Parameters<OriginalSessionMessageQueue287[K]>
):ReturnType<OriginalSessionMessageQueue287[K]> {
 const queue=getCanonicalMessageQueue287()
 return Reflect.apply(queue[name],queue,args) as ReturnType<OriginalSessionMessageQueue287[K]>
}
/** C's undefined main lane is only an input ABI. The stored command carries
 * the original Ge identity, so raw producer/consumer predicates see one lane. */
function addressed(command:QueuedCommand):QueuedCommand {
 return command.agentId===undefined?{...command,agentId:source287().currentAgentId()}:command
}
export function enqueue(command:QueuedCommand):void{getCanonicalMessageQueue287().enqueue(addressed(command))}
export function enqueuePendingNotification(command:QueuedCommand,options?:Parameters<OriginalSessionMessageQueue287['enqueuePendingNotification']>[1]):void{getCanonicalMessageQueue287().enqueuePendingNotification(addressed(command),options)}
export function enqueueReportingAdmission(command:QueuedCommand):ReturnType<OriginalSessionMessageQueue287['enqueueReportingAdmission']>{return getCanonicalMessageQueue287().enqueueReportingAdmission(addressed(command))}

/** Subscribe to the concrete queue selected at registration. Cleanup closes
 * over that same original signal; callbacks retain their execution context. */
export function subscribeToCommandQueue(listener:()=>void):()=>void {
 const execution=getExecutionSession287(),queue=getCanonicalMessageQueue287()
 return queue.subscribe(()=>runWithExecutionSession287(execution,listener))
}
export function subscribeToRemovals(listener:(commands:readonly QueuedCommand[])=>void):()=>void {
 const execution=getExecutionSession287(),queue=getCanonicalMessageQueue287()
 return queue.subscribeToRemovals(commands=>runWithExecutionSession287(execution,()=>listener(commands)))
}
export function promoteToNow(...args:Parameters<OriginalSessionMessageQueue287['promoteToNow']>):ReturnType<OriginalSessionMessageQueue287['promoteToNow']>{return invoke('promoteToNow',...args)}
export function demoteFromNow(...args:Parameters<OriginalSessionMessageQueue287['demoteFromNow']>):ReturnType<OriginalSessionMessageQueue287['demoteFromNow']>{return invoke('demoteFromNow',...args)}
export function beginPollEventAdmission(...args:Parameters<OriginalSessionMessageQueue287['beginPollEventAdmission']>):ReturnType<OriginalSessionMessageQueue287['beginPollEventAdmission']>{return invoke('beginPollEventAdmission',...args)}
export function endPollEventAdmission(...args:Parameters<OriginalSessionMessageQueue287['endPollEventAdmission']>):ReturnType<OriginalSessionMessageQueue287['endPollEventAdmission']>{return invoke('endPollEventAdmission',...args)}
export function pollEventAdmissionsPending(...args:Parameters<OriginalSessionMessageQueue287['pollEventAdmissionsPending']>):ReturnType<OriginalSessionMessageQueue287['pollEventAdmissionsPending']>{return invoke('pollEventAdmissionsPending',...args)}
export function isFoldInFlight(...args:Parameters<OriginalSessionMessageQueue287['isFoldInFlight']>):ReturnType<OriginalSessionMessageQueue287['isFoldInFlight']>{return invoke('isFoldInFlight',...args)}
export function registerFoldInFlight(...args:Parameters<OriginalSessionMessageQueue287['registerFoldInFlight']>):ReturnType<OriginalSessionMessageQueue287['registerFoldInFlight']>{return invoke('registerFoldInFlight',...args)}
export function unregisterFoldInFlight(...args:Parameters<OriginalSessionMessageQueue287['unregisterFoldInFlight']>):ReturnType<OriginalSessionMessageQueue287['unregisterFoldInFlight']>{return invoke('unregisterFoldInFlight',...args)}
export function suspendMidTurnFold(...args:Parameters<OriginalSessionMessageQueue287['suspendMidTurnFold']>):ReturnType<OriginalSessionMessageQueue287['suspendMidTurnFold']>{return invoke('suspendMidTurnFold',...args)}
export function isMidTurnFoldSuspended(...args:Parameters<OriginalSessionMessageQueue287['isMidTurnFoldSuspended']>):ReturnType<OriginalSessionMessageQueue287['isMidTurnFoldSuspended']>{return invoke('isMidTurnFoldSuspended',...args)}
export function markCancelPending(...args:Parameters<OriginalSessionMessageQueue287['markCancelPending']>):ReturnType<OriginalSessionMessageQueue287['markCancelPending']>{return invoke('markCancelPending',...args)}
export function consumeCancelPending(...args:Parameters<OriginalSessionMessageQueue287['consumeCancelPending']>):ReturnType<OriginalSessionMessageQueue287['consumeCancelPending']>{return invoke('consumeCancelPending',...args)}
export function consumeCancelPendingAcked(...args:Parameters<OriginalSessionMessageQueue287['consumeCancelPendingAcked']>):ReturnType<OriginalSessionMessageQueue287['consumeCancelPendingAcked']>{return invoke('consumeCancelPendingAcked',...args)}
export function hasCancelPendingAcked(...args:Parameters<OriginalSessionMessageQueue287['hasCancelPendingAcked']>):ReturnType<OriginalSessionMessageQueue287['hasCancelPendingAcked']>{return invoke('hasCancelPendingAcked',...args)}
export function beginInboundIngest(...args:Parameters<OriginalSessionMessageQueue287['beginInboundIngest']>):ReturnType<OriginalSessionMessageQueue287['beginInboundIngest']>{return invoke('beginInboundIngest',...args)}
export function withdrawInboundIngest(...args:Parameters<OriginalSessionMessageQueue287['withdrawInboundIngest']>):ReturnType<OriginalSessionMessageQueue287['withdrawInboundIngest']>{return invoke('withdrawInboundIngest',...args)}
export function setInFlightDrainBatch(...args:Parameters<OriginalSessionMessageQueue287['setInFlightDrainBatch']>):ReturnType<OriginalSessionMessageQueue287['setInFlightDrainBatch']>{return invoke('setInFlightDrainBatch',...args)}
export function clearInFlightDrainBatch(...args:Parameters<OriginalSessionMessageQueue287['clearInFlightDrainBatch']>):ReturnType<OriginalSessionMessageQueue287['clearInFlightDrainBatch']>{return invoke('clearInFlightDrainBatch',...args)}
export function someInFlightDrainCommand(...args:Parameters<OriginalSessionMessageQueue287['someInFlightDrainCommand']>):ReturnType<OriginalSessionMessageQueue287['someInFlightDrainCommand']>{return invoke('someInFlightDrainCommand',...args)}
export function trackSubmission(...args:Parameters<OriginalSessionMessageQueue287['trackSubmission']>):ReturnType<OriginalSessionMessageQueue287['trackSubmission']>{return invoke('trackSubmission',...args)}
export function someSubmissionInFlight(...args:Parameters<OriginalSessionMessageQueue287['someSubmissionInFlight']>):ReturnType<OriginalSessionMessageQueue287['someSubmissionInFlight']>{return invoke('someSubmissionInFlight',...args)}
export function noteTurnAppended(...args:Parameters<OriginalSessionMessageQueue287['noteTurnAppended']>):ReturnType<OriginalSessionMessageQueue287['noteTurnAppended']>{return invoke('noteTurnAppended',...args)}
export function getInFlightDrainBatchStanding(...args:Parameters<OriginalSessionMessageQueue287['getInFlightDrainBatchStanding']>):ReturnType<OriginalSessionMessageQueue287['getInFlightDrainBatchStanding']>{return invoke('getInFlightDrainBatchStanding',...args)}
export function takeInboundEnqueueTurn(...args:Parameters<OriginalSessionMessageQueue287['takeInboundEnqueueTurn']>):ReturnType<OriginalSessionMessageQueue287['takeInboundEnqueueTurn']>{return invoke('takeInboundEnqueueTurn',...args)}
export function getMainThreadQueueLength(...args:Parameters<OriginalSessionMessageQueue287['getMainThreadQueueLength']>):ReturnType<OriginalSessionMessageQueue287['getMainThreadQueueLength']>{return invoke('getMainThreadQueueLength',...args)}
export function getDrainableMainThreadQueueLength(...args:Parameters<OriginalSessionMessageQueue287['getDrainableMainThreadQueueLength']>):ReturnType<OriginalSessionMessageQueue287['getDrainableMainThreadQueueLength']>{return invoke('getDrainableMainThreadQueueLength',...args)}
export function consume(...args:Parameters<OriginalSessionMessageQueue287['consume']>):ReturnType<OriginalSessionMessageQueue287['consume']>{return invoke('consume',...args)}
export function popEditableAt(...args:Parameters<OriginalSessionMessageQueue287['popEditableAt']>):ReturnType<OriginalSessionMessageQueue287['popEditableAt']>{return invoke('popEditableAt',...args)}
export function getCommandQueueSnapshot(...args:Parameters<OriginalSessionMessageQueue287['getCommandQueueSnapshot']>):ReturnType<OriginalSessionMessageQueue287['getCommandQueueSnapshot']>{return invoke('getCommandQueueSnapshot',...args)}
export function getCommandQueue(...args:Parameters<OriginalSessionMessageQueue287['getCommandQueue']>):ReturnType<OriginalSessionMessageQueue287['getCommandQueue']>{return invoke('getCommandQueue',...args)}
export function getCommandQueueLength(...args:Parameters<OriginalSessionMessageQueue287['getCommandQueueLength']>):ReturnType<OriginalSessionMessageQueue287['getCommandQueueLength']>{return invoke('getCommandQueueLength',...args)}
export function hasCommandsInQueue(...args:Parameters<OriginalSessionMessageQueue287['hasCommandsInQueue']>):ReturnType<OriginalSessionMessageQueue287['hasCommandsInQueue']>{return invoke('hasCommandsInQueue',...args)}
export function recheckCommandQueue(...args:Parameters<OriginalSessionMessageQueue287['recheckCommandQueue']>):ReturnType<OriginalSessionMessageQueue287['recheckCommandQueue']>{return invoke('recheckCommandQueue',...args)}
export function dequeue(...args:Parameters<OriginalSessionMessageQueue287['dequeue']>):ReturnType<OriginalSessionMessageQueue287['dequeue']>{return invoke('dequeue',...args)}
export function dequeueAll(...args:Parameters<OriginalSessionMessageQueue287['dequeueAll']>):ReturnType<OriginalSessionMessageQueue287['dequeueAll']>{return invoke('dequeueAll',...args)}
export function peek(...args:Parameters<OriginalSessionMessageQueue287['peek']>):ReturnType<OriginalSessionMessageQueue287['peek']>{return invoke('peek',...args)}
export function dequeueAllMatching(...args:Parameters<OriginalSessionMessageQueue287['dequeueAllMatching']>):ReturnType<OriginalSessionMessageQueue287['dequeueAllMatching']>{return invoke('dequeueAllMatching',...args)}
export function remove(...args:Parameters<OriginalSessionMessageQueue287['remove']>):ReturnType<OriginalSessionMessageQueue287['remove']>{return invoke('remove',...args)}
export function removeByFilter(...args:Parameters<OriginalSessionMessageQueue287['removeByFilter']>):ReturnType<OriginalSessionMessageQueue287['removeByFilter']>{return invoke('removeByFilter',...args)}
export function clearCommandQueue(...args:Parameters<OriginalSessionMessageQueue287['clearCommandQueue']>):ReturnType<OriginalSessionMessageQueue287['clearCommandQueue']>{return invoke('clearCommandQueue',...args)}
export function resetCommandQueue(...args:Parameters<OriginalSessionMessageQueue287['resetCommandQueue']>):ReturnType<OriginalSessionMessageQueue287['resetCommandQueue']>{return invoke('resetCommandQueue',...args)}
export function getCommandsByMaxPriority(...args:Parameters<OriginalSessionMessageQueue287['getCommandsByMaxPriority']>):ReturnType<OriginalSessionMessageQueue287['getCommandsByMaxPriority']>{return invoke('getCommandsByMaxPriority',...args)}
export function enqueuePollEvent287(...args:Parameters<OriginalSessionMessageQueue287['enqueuePollEvent']>):ReturnType<OriginalSessionMessageQueue287['enqueuePollEvent']>{return invoke('enqueuePollEvent',...args)}
export function enqueuePollEventGroup287(...args:Parameters<OriginalSessionMessageQueue287['enqueuePollEventGroup']>):ReturnType<OriginalSessionMessageQueue287['enqueuePollEventGroup']>{return invoke('enqueuePollEventGroup',...args)}
export function countRemainingWakePollEventsAfter287(...args:Parameters<OriginalSessionMessageQueue287['countRemainingWakePollEventsAfter']>):ReturnType<OriginalSessionMessageQueue287['countRemainingWakePollEventsAfter']>{return invoke('countRemainingWakePollEventsAfter',...args)}
export function countWakePollEvents287(...args:Parameters<OriginalSessionMessageQueue287['countPendingWakePollEvents']>):ReturnType<OriginalSessionMessageQueue287['countPendingWakePollEvents']>{return invoke('countPendingWakePollEvents',...args)}
export function takeWakePollEvents287(...args:Parameters<OriginalSessionMessageQueue287['drainPollEventChunk']>):ReturnType<OriginalSessionMessageQueue287['drainPollEventChunk']>{return invoke('drainPollEventChunk',...args)}
export function selectPollEventChunk287(commands:QueuedCommand[]):QueuedCommand[]{return source287().selectPollEvents(commands)}
export function settleDeliveredPollEvents287(commands:readonly QueuedCommand[]):void{source287().settleDelivered(commands)}
export function settleDroppedPollEvents287(commands:readonly QueuedCommand[],reason:string):void{source287().settleDropped(commands,reason)}

// Stateless, accepted C presentation helpers remain unchanged.
const NON_EDITABLE_MODES = new Set<PromptInputMode>([
  'task-notification',
] satisfies Permutations<Exclude<PromptInputMode, EditablePromptInputMode>>)

export function isPromptInputModeEditable(
  mode: PromptInputMode,
): mode is EditablePromptInputMode {
  return !NON_EDITABLE_MODES.has(mode)
}

/**
 * Whether this queued command can be pulled into the input buffer via UP/ESC.
 * System-generated commands (proactive ticks, scheduled tasks, plan
 * verification, channel messages) contain raw XML and must not leak into
 * the user's input.
 */
export function isQueuedCommandEditable(cmd: QueuedCommand): boolean {
  return isPromptInputModeEditable(cmd.mode) && !cmd.isMeta
}

/**
 * Whether this queued command should render in the queue preview under the
 * prompt. Superset of editable — channel messages show (so the keyboard user
 * sees what arrived) but stay non-editable (raw XML).
 */
export function isQueuedCommandVisible(cmd: QueuedCommand): boolean {
  if (
    (feature('KAIROS') || feature('KAIROS_CHANNELS')) &&
    cmd.origin?.kind === 'channel'
  )
    return true
  return isQueuedCommandEditable(cmd)
}


export type PopAllEditableResult=NonNullable<ReturnType<OriginalSessionMessageQueue287['popAllEditable']>>
export function popAllEditable(...args:Parameters<OriginalSessionMessageQueue287['popAllEditable']>):ReturnType<OriginalSessionMessageQueue287['popAllEditable']>{return invoke('popAllEditable',...args)}
// Deprecated API names are views of the same canonical owner, never a cache.
export function subscribeToPendingNotifications(...args:Parameters<typeof subscribeToCommandQueue>):ReturnType<typeof subscribeToCommandQueue>{return subscribeToCommandQueue(...args)}
export function getPendingNotificationsSnapshot(...args:Parameters<typeof getCommandQueueSnapshot>):ReturnType<typeof getCommandQueueSnapshot>{return getCommandQueueSnapshot(...args)}
export function hasPendingNotifications(...args:Parameters<typeof hasCommandsInQueue>):ReturnType<typeof hasCommandsInQueue>{return hasCommandsInQueue(...args)}
export function getPendingNotificationsCount(...args:Parameters<typeof getCommandQueueLength>):ReturnType<typeof getCommandQueueLength>{return getCommandQueueLength(...args)}
export function recheckPendingNotifications(...args:Parameters<typeof recheckCommandQueue>):ReturnType<typeof recheckCommandQueue>{return recheckCommandQueue(...args)}
export function dequeuePendingNotification(...args:Parameters<typeof dequeue>):ReturnType<typeof dequeue>{return dequeue(...args)}
export function resetPendingNotifications(...args:Parameters<typeof resetCommandQueue>):ReturnType<typeof resetCommandQueue>{return resetCommandQueue(...args)}
export function clearPendingNotifications(...args:Parameters<typeof clearCommandQueue>):ReturnType<typeof clearCommandQueue>{return clearCommandQueue(...args)}

export function isSlashCommand(cmd: QueuedCommand): boolean {
  return (
    typeof cmd.value === 'string' &&
    cmd.value.trim().startsWith('/') &&
    !cmd.skipSlashCommands
  )
}
