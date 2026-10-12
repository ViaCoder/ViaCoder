import { getPlanControlResponse } from './getPlan.js'
import type { AppState } from '../../state/AppStateStore.js'
import { transitionPermissionMode } from '../../utils/permissions/permissionSetup.js'
import type { SDKControlResponse } from '../../entrypoints/sdk/controlTypes.js'

type StateHost = { setAppState: (update: (state: AppState) => AppState) => void }

/** Uses the same permission transition as the REPL, not a second permissive mode implementation. */
export function applyWorkerPlanMode(host: StateHost, ultraplan?: boolean): void {
  host.setAppState(state => ({
    ...state,
    toolPermissionContext: {
      ...transitionPermissionMode(state.toolPermissionContext.mode, 'plan', state.toolPermissionContext),
      mode: 'plan',
    },
    ...(ultraplan !== undefined && { isUltraplanMode: ultraplan }),
  }))
}

export function dispatchPlanModeRequest(
  request: { request_id: string; request: { mode: 'plan'; ultraplan?: boolean } },
  host: StateHost,
  emit: (response: SDKControlResponse) => void,
): void {
  try {
    applyWorkerPlanMode(host, request.request.ultraplan)
  } catch {
    emit({ type: 'control_response', response: {
      subtype: 'error', request_id: request.request_id, error: 'Failed to enter plan mode',
    } })
    return
  }
  // ACK only after a successful state commit; a socket write alone is not a mode change.
  emit({ type: 'control_response', response: {
    subtype: 'success', request_id: request.request_id, response: { mode: 'plan' },
  } })
}

/** Ordinary Plan entry/exit and rollback for headless bridge. Advanced modes
 * remain explicitly unsupported here rather than bypassing their policy guards. */
export function createWorkerPlanCallbacks(host: StateHost) {
  return {
    onGetPlan: () => getPlanControlResponse({ isPathHidden: () => true }),
    onSetPermissionMode(mode: string): { ok: true } | { ok: false; error: string } {
      if (mode !== 'plan' && mode !== 'default' && mode !== 'acceptEdits' && mode !== 'dontAsk') {
        return { ok: false, error: 'This bridge supports ordinary Plan mode transitions only' }
      }
      try {
        if (mode === 'plan') applyWorkerPlanMode(host)
        else host.setAppState(state => ({ ...state, toolPermissionContext: {
          ...transitionPermissionMode(state.toolPermissionContext.mode, mode, state.toolPermissionContext), mode,
        } }))
        return { ok: true }
      }
      catch { return { ok: false, error: 'Failed to apply permission mode' } }
    },
  }
}
