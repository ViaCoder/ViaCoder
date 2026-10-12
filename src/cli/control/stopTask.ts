/** Public SDK stop_task adapter for the running AppState task registry.
 * Official 2.1.283 vt → xIe: validate first, await cancellation, then ACK.
 * Private storageV5/agent-sidecar writes are not represented here.
 */
import type {AppState} from '../../state/AppState.js'
import type {SetAppState} from '../../Task.js'
import {isTerminalTaskStatus} from '../../Task.js'
import {InProcessTeammateTask} from '../../tasks/InProcessTeammateTask/InProcessTeammateTask.js'
import {StopTaskError, stopTask} from '../../tasks/stopTask.js'
import {errorMessage} from '../../utils/errors.js'
import {resolveSdkStopTask} from './stopTaskRegistry.js'

export class SdkStopTaskError extends Error {readonly expected = true}
export type SdkStopTaskHost = {
  getAppState(): AppState
  setAppState: SetAppState
  redactsPersistedLane(): boolean
  /** Production passes the real task engine; tests can hold its completion. */
  stop: typeof stopTask
  /** Original sge user-source zee writer, supplied by the canonical print owner. */
  markTaskUserStopped?(id: string): void
}

/** Empty object is the official success body. No ACK until stop() resolves. */
export async function handleSdkStopTask(request: {task_id?: unknown}, host: SdkStopTaskHost): Promise<Record<string, never>> {
  if (typeof request.task_id !== 'string') throw new SdkStopTaskError('stop_task: task_id must be a string')
  const input = request.task_id
  const resolution = resolveSdkStopTask(input, host.getAppState())
  if (resolution.status === 'not_found') return {}
  if (resolution.status === 'ambiguous') {
    if (!resolution.anyLiveCandidate) return {}
    throw new SdkStopTaskError(resolution.message)
  }
  const id = resolution.id, initialStatus = resolution.task.status
  const label = id === input ? id : `${input} (${id})`
  if (resolution.task.type === 'in_process_teammate' && initialStatus !== 'running') {
    if (isTerminalTaskStatus(initialStatus)) return {}
    throw new SdkStopTaskError(`Task ${label} is not running (status: ${initialStatus})`)
  }
  try {
    if(initialStatus === 'running') host.markTaskUserStopped?.(id)
    // The ordinary engine owns all its registered task kinds. Its current
    // public dispatch table omits in-process teammates, although their real
    // Task.kill implementation is reachable; use that implementation here.
    if (resolution.task.type === 'in_process_teammate') await InProcessTeammateTask.kill(id, host.setAppState)
    else await host.stop(id, {getAppState: host.getAppState, setAppState: host.setAppState})
  } catch (error) {
    if (error instanceof StopTaskError) {
      if (error.code === 'not_found') return {}
      if (error.code === 'not_running') {
        const status = initialStatus ?? host.getAppState().tasks[id]?.status
        if (status && isTerminalTaskStatus(status)) return {}
      }
      // Official uPe preserves Or (typed task refusal) even on persisted
      // redacted lanes; only unexpected backend errors become generic.
      if (error.code === 'not_running') throw new SdkStopTaskError(`Task ${label} is not running (status: ${host.getAppState().tasks[id]?.status ?? initialStatus})`)
      throw new SdkStopTaskError(errorMessage(error))
    }
    throw new SdkStopTaskError(host.redactsPersistedLane() ? 'stop_task failed' : errorMessage(error))
  }
  return {}
}
