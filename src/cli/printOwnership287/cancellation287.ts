import {executionSessionRegistryConstructor287,getExecutionSession287,getLegacyExecutionContext287} from '../../services/context/execution287.js'
import {getPermissionTrustTrackingOwner287,getGlobalConfig,saveGlobalConfig} from '../../utils/config.js'
import {logEvent} from '../../services/analytics/index.js'
import {logError} from '../../utils/log.js'
import {logForDebugging} from '../../utils/debug.js'
import {createPrintCancellationNative287} from './cancellationNative.js'
import type {PrintClearSurvivors287} from './controlNative.js'
import type {PrintDispatchCommand287} from './dispatchPolicyNative.js'

// One original C/X slot over the canonical execution root, including its full A initializer.
export const printCancellation287=createPrintCancellationNative287({
 executionContext:getExecutionSession287,legacyContext:getLegacyExecutionContext287,
 process,Registry:executionSessionRegistryConstructor287,analytics:logEvent,logError,debug:logForDebugging,
 configOwner:getPermissionTrustTrackingOwner287,getGlobalConfig,saveGlobalConfig,
 // No public local artifact relay transport is installed; no backend is created here.
 emitSummonStatus:undefined,
})
export function requeuePrintCancelSurvivors287(queue:{enqueuePendingNotification(command:PrintDispatchCommand287):void},survivors:PrintClearSurvivors287,stopped:number):void {
 printCancellation287.requeueSurvivors(queue,survivors,stopped)
}
