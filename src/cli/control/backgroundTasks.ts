import type { AppState } from '../../state/AppState.js'
import type { SetAppState } from '../../Task.js'
import { backgroundAll, backgroundByToolUseId } from '../../tasks/LocalShellTask/LocalShellTask.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import type { SDKControlBackgroundTasksResponse } from '../../entrypoints/sdk/controlTypes.js'

/** Official azn + Mt: null/empty means all; malformed input never backgrounds work. */
export function handleBackgroundTasks(
  request: { tool_use_id?: unknown },
  getAppState: () => AppState,
  setAppState: SetAppState,
): SDKControlBackgroundTasksResponse {
  const id = request.tool_use_id
  if (id != null && typeof id !== 'string') {
    throw new Error('background_tasks: tool_use_id must be a string')
  }
  if (isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS)) {
    throw new Error('Background tasks are disabled in this session.')
  }
  if (typeof id === 'string' && id !== '') return { backgrounded: backgroundByToolUseId(id, getAppState, setAppState) }
  backgroundAll(getAppState, setAppState)
  return {}
}
