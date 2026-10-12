import {createPrintInterruptSweepNative287,type PrintInterruptSweepPorts287,type PrintParkedPermission287} from './interruptSweepNative.js'
import {printCancellation287} from './cancellation287.js'
import {printDetachedSlot287,type createPrintLifecycle287} from '../../tools/GetTaskTool/printLifecycle287.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import {getGetTaskOwner287} from '../../utils/task/getTaskSession287.js'
import {enqueuePendingNotification,removeByFilter} from '../../utils/messageQueueManager.js'
import {logEvent} from '../../services/analytics/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {logForDebugging} from '../../utils/debug.js'
import {logForDiagnosticsNoPII} from '../../utils/diagLogs.js'
import {logError} from '../../utils/log.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {isShuttingDown} from '../../utils/gracefulShutdown.js'
import {hasCleanupStarted,registerCleanup} from '../../utils/cleanupRegistry.js'
import {PermissionResultSchema} from '../../entrypoints/sdk/coreSchemas.js'

// These leaves require the qualified artifact monitor/durable-ledger producers.
// The full original qS availability initializer remains authoritative; neither
// this adapter nor normal interrupt declares that private capability available.
const qualifiedArtifact287=(leaf:string)=>(..._args:unknown[]):never=>{
 throw Error(`Qualified artifact producer not installed: ${leaf}`)
}
export function createPrintInterruptSweep287(
 lifecycle:ReturnType<typeof createPrintLifecycle287>,
 host:Pick<PrintInterruptSweepPorts287,'getAppState'|'setAppState'|'options'|'io'|'messageQueue'|'prewaitLatch'|'frameIntake'|'inputDelivery'|'suggestions'|'respond'|'resume'>,
 control:Pick<PrintInterruptSweepPorts287,'interruptTurn'|'cancelQueue'|'isSendNow'|'sendNow'>,
){
 const execution=lifecycle.producer.execution
 let permission:PrintParkedPermission287
 const ports:PrintInterruptSweepPorts287={...host,...control,
  execution,executionContext:getExecutionSession287,drain:lifecycle.drain,process,
  artifactState:printCancellation287.artifactState,artifactSlot:printCancellation287.artifactSlot,
  cancelHandoffs:printCancellation287.cancelHandoffs,requeueSurvivors:printCancellation287.requeueSurvivors,
  detachedSlot:printDetachedSlot287,registry:()=>lifecycle.taskRegistry(),
  stopBackgroundAgents:lifecycle.stopBackgroundAgents,stopForegroundAgents:lifecycle.stopForegroundAgents,budgetSweep:lifecycle.budgetSweep,
  taskSession:()=>getGetTaskOwner287().session,
  mainAgentId:()=>getExecutionSession287().identity.mainAgentId(getExecutionSession287().id),
  environment:authEnvironment,feature:getFeatureValue_CACHED_MAY_BE_STALE,
  analytics:logEvent,debug:logForDebugging,logError,
  diagnostic:(level:'info'|'warn',event:string,data:unknown)=>logForDiagnosticsNoPII(level,event,typeof data==='function'?data():data),
  enqueueNotification:enqueuePendingNotification,removeQueueByFilter:removeByFilter,
  shuttingDown:isShuttingDown,remoteInit:qualifiedArtifact287('remote fresh-feature owner'),onExit:registerCleanup,
  permissionResultSchema:PermissionResultSchema,
  parkedPermissionRetirement:{fire:reason=>permission.fire(reason)},
  persistAutoReactLedger:qualifiedArtifact287('Uae'),disarmDurableAutoReact:qualifiedArtifact287('oQt'),persistStoppedSlug:qualifiedArtifact287('oxt'),
  retireLiveSupervisor:qualifiedArtifact287('Xi'),findLiveSupervisor:qualifiedArtifact287('Er'),clearWatchLaunchFlag:qualifiedArtifact287('kLn'),
  qualifiedPushNotice:qualifiedArtifact287('sSe'),removeKeepalive:qualifiedArtifact287('nx'),terminalEvent:qualifiedArtifact287('monitor Ii'),
 }
 const native=createPrintInterruptSweepNative287(ports)
 // Original Cm constructor/fields/fire are restored, replacing the old
 // stashed-answer throw object. This public cold caller has no inherited park
 // seed/rescue: Cm.fire reaches its original !rescue || !permission return.
 // Resume carries the actual deserializer IDs and original lane policy.
 // No cloned permission map or artificial rescue is installed.
 permission=new native.ParkedPermission({io:host.io,drain:lifecycle.drain,messageQueue:host.messageQueue,
  store:{getState:host.getAppState,setState:host.setAppState},
  turnInterruptionState:host.resume?.turnInterruptionState,
  supersededToolUseIds:host.resume?.supersededToolUseIds,
  answeredToolUseIds:host.resume?.answeredToolUseIds,
  lane:host.resume?.lane,
  isShuttingDown,isTerminalShutdown:hasCleanupStarted,
 })
 lifecycle.installParkedPermissionController(permission)
 return {
  interrupt(frame:unknown,request:Parameters<typeof native.normalInterrupt>[1]){
   return runWithExecutionSession287(execution,()=>native.normalInterrupt(frame,request))
  },
  dispose(){native.disposeBudget();native.keepAlive.disarm('session_ending')},
  native,permission,ports,
 }
}
