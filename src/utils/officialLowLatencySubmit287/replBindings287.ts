import { logEvent } from '../../services/analytics/index.js'
import { getExecutionSession287, runWithExecutionSession287 } from '../../services/context/execution287.js'
import type { ExecutionSession287 } from '../../services/context/officialExecutionOwners287/native.js'
import type { AppState } from '../../state/AppState.js'
import type { SetAppState } from '../../Task.js'
import type { TaskState } from '../../tasks/types.js'
import { asAgentId } from '../../types/ids.js'
import { backgroundAgentTask } from '../../tasks/LocalAgentTask/LocalAgentTask.js'
import { backgroundShellTaskForLowLatency287 } from '../../tasks/LocalShellTask/LocalShellTask.js'
import { killTaskWithGetTask287 } from '../../tools/GetTaskTool/killBridge287.js'
import { captureGetTaskProducer287 } from '../../utils/task/getTaskSession287.js'
import { logForDebugging } from '../../utils/debug.js'
import { logError } from '../../utils/log.js'
import { getMainLoopActivityPressure287, sessionActivity287 } from '../sessionActivity.js'
import { isBackgroundTasksDisabled287 } from '../task/getTaskSession287.js'
import type { OfficialLowLatencySourceBindings287 } from './native.js'
import { officialLowLatencyForegroundBindings287 } from './foregroundOwner287.js'

export interface OfficialLowLatencyReplOwner287 {
  execution: ExecutionSession287
  getAppState(): AppState
  setAppState: SetAppState
}

/** Bind qEt's imported actions to the existing REPL/task/tool owners. */
export function createOfficialLowLatencyReplBindings287(
  owner: OfficialLowLatencyReplOwner287,
): OfficialLowLatencySourceBindings287 {
  const getAppState = owner.getAppState
  const setAppState = owner.setAppState
  const execution = owner.execution
  const producer = runWithExecutionSession287(execution, () => captureGetTaskProducer287())
  return {
    Ge: () => asAgentId(execution.identity.mainAgentId(execution.id)),
    // Local builds deliberately disable product analytics at the shared
    // analytics owner; preserve that owner rather than inventing a sink.
    p: (_featureName, _outcome) => logEvent('tengu_feature_sad', {}),
    d: error => logError(error),
    m: (_featureName, _event) => logEvent('tengu_feature_bad', {}),
    Za: () => runWithExecutionSession287(execution, () => isBackgroundTasksDisabled287(execution)),
    YOr: (tasks: TaskState[]) => runWithExecutionSession287(execution, () => tasks.filter(task =>
      task.type === 'local_bash' &&
      backgroundShellTaskForLowLatency287(task.id, getAppState, setAppState),
    )),
    _N: (id: string) => killTaskWithGetTask287(id, setAppState, producer),
    cTe: officialLowLatencyForegroundBindings287.cTe,
    oGo: feature => feature === 'api_call' && runWithExecutionSession287(execution, () =>
      (sessionActivity287.owner().currentStateOrNull()?.activeReasons.get('api_call') ?? 0) > 0),
    que: () => runWithExecutionSession287(execution, getMainLoopActivityPressure287),
    t: message => logForDebugging(message),
    lFe: (id: string) => backgroundAgentTask(id, getAppState, setAppState),
    ZTo: officialLowLatencyForegroundBindings287.ZTo,
    y: _featureName => logEvent('tengu_feature_ok', {}),
  }
}

/** The caller must pass the same session instance used by the active turn. */
export function assertOfficialLowLatencyExecutionOwner287(
  owner: OfficialLowLatencyReplOwner287,
): void {
  if (getExecutionSession287() !== owner.execution) {
    throw new Error('Low-latency REPL owner does not match the active execution session')
  }
}
