/** Official 287 host-scoped activity owner; existing API/tool/transport callers share it. */
import {createSessionActivity287,type ActivityReason287} from './officialSessionActivity287/native.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {registerCleanup} from './cleanupRegistry.js'
import {logForDiagnosticsNoPII} from './diagLogs.js'
import {authEnvironment} from './authEnvironment.js'

export type SessionActivityReason=ActivityReason287
export const sessionActivity287=createSessionActivity287({
 U:()=>getExecutionSession287(),_t:registerCleanup,a:authEnvironment,ne:logForDiagnosticsNoPII,
})
export const registerSessionActivityCallback=sessionActivity287.register
export const unregisterSessionActivityCallback=sessionActivity287.unregister
export const sendSessionActivitySignal=sessionActivity287.signal
export const startSessionActivity=sessionActivity287.start
export const stopSessionActivity=sessionActivity287.stop
export const getBackgroundActivityAgentId287=sessionActivity287.backgroundAgentId
export const getMainLoopActivityPressure287=sessionActivity287.pressure
export const registerMainLoopActivityListener287=sessionActivity287.onMainLoop
export const parkSessionActivityOnUser287=sessionActivity287.park
export const isSessionActivityParkedOnUser287=sessionActivity287.isParked
export function isSessionActivityTrackingActive():boolean{
 return sessionActivity287.owner().currentStateOrNull()?.activityCallback!=null
}
