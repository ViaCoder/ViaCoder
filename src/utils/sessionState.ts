import {getPermissionSessionState287} from './permissions/officialSDKPermission287/sessionStateRuntime.js'
import type {ActiveGoal} from './goal.js'
export type SessionState = 'idle' | 'running' | 'requires_action'

/**
 * Context carried with requires_action transitions so downstream
 * surfaces (CCR sidebar, push notifications) can show what the
 * session is blocked on, not just that it's blocked.
 *
 * Two delivery paths:
 * - tool_name + action_description → RequiresActionDetails proto
 *   (webhook payload, typed, logged in Datadog)
 * - full object → external_metadata.pending_action (queryable JSON
 *   on the Session, lets the frontend iterate on shape without
 *   proto round-trips)
 */
export type RequiresActionDetails = {
  tool_name: string
  /** Human-readable summary, e.g. "Editing src/foo.ts", "Running npm test" */
  action_description: string
  tool_use_id: string
  request_id: string
  /** Raw tool input — the frontend reads from external_metadata.pending_action.input
   * to parse question options / plan content without scanning the event stream. */
  input?: Record<string, unknown>
}

import type { PermissionMode } from './permissions/PermissionMode.js'

// CCR external_metadata keys — push in onChangeAppState, restore in
// externalMetadataToAppState.
export type SessionExternalMetadata = {
  goal?: {condition: string; iterations: number; set_at: number; last_reason: string | null; met: boolean} | null
  permission_mode?: string | null
  is_ultraplan_mode?: boolean | null
  model?: string | null
  pending_actions?: RequiresActionDetails[] | null
  recap?: unknown
  pending_action?: RequiresActionDetails | null
  // Opaque — typed at the emit site. Importing PostTurnSummaryOutput here
  // would leak the import path string into sdk.d.ts via agentSdkBridge's
  // re-export of SessionState.
  post_turn_summary?: unknown
  // Mid-turn progress line from the forked-agent summarizer — fires every
  // ~5 steps / 2min so long-running turns still surface "what's happening
  // right now" before post_turn_summary arrives.
  task_summary?: string | null
}

/** Original worker GET aggregate: never project away private/internal state. */
export type SessionWorkerState287 = {
  external: SessionExternalMetadata | null
  internal: Record<string, unknown> | null
  readFailed?: boolean
  initParkReport?: {
    reported: SessionState
    pendingActionOutstanding?: boolean
  }
}

type SessionStateChangedListener = (
  state: SessionState,
  details?: RequiresActionDetails,
) => void
type SessionMetadataChangedListener = (
  metadata: SessionExternalMetadata,
) => void
type PermissionModeChangedListener = (mode: PermissionMode) => void

let activeGoalListener: ((goal: ActiveGoal | undefined) => void) | null = null
export function setActiveGoalChangedListener(listener: typeof activeGoalListener): void {activeGoalListener = listener;getPermissionSessionState287().onActiveGoalChanged=listener??undefined}
export function notifyActiveGoalChanged(goal: ActiveGoal | undefined): void {getPermissionSessionState287().onActiveGoalChanged=activeGoalListener??undefined;getPermissionSessionState287().notifyActiveGoalChanged(goal)}

let stateListener: SessionStateChangedListener | null = null
let metadataListener: SessionMetadataChangedListener | null = null
let permissionModeListener: PermissionModeChangedListener | null = null

export function setSessionStateChangedListener(
  cb: SessionStateChangedListener | null,
): void {
  stateListener = cb
  getPermissionSessionState287().onStateChanged=cb??undefined
}

export function setSessionMetadataChangedListener(
  cb: SessionMetadataChangedListener | null,
): void {
  metadataListener = cb
  getPermissionSessionState287().onMetadataChanged=cb??undefined
}

/**
 * Register a listener for permission-mode changes from onChangeAppState.
 * Wired by print.ts to emit an SDK system:status message so CCR/IDE clients
 * see mode transitions in real time — regardless of which code path mutated
 * toolPermissionContext.mode (Shift+Tab, ExitPlanMode dialog, slash command,
 * bridge set_permission_mode, etc.).
 */
export function setPermissionModeChangedListener(
  cb: PermissionModeChangedListener | null,
): void {
  permissionModeListener = cb
  getPermissionSessionState287().onPermissionModeChanged=cb??undefined
}

// Original t$t is the only state/metadata owner; legacy listener APIs route to it.
export {getPermissionSessionState287}
export function getSessionState():SessionState{return getPermissionSessionState287().getState()}
export function notifySessionStateChanged(state:SessionState,details?:RequiresActionDetails):void {
 const source=getPermissionSessionState287()
 source.onStateChanged=stateListener??undefined
 source.onMetadataChanged=metadataListener??undefined
 const hadTaskSummary=source.hasTaskSummary
 source.notifyStateChanged(state,details)
 // Existing local C clears task_summary on every idle (original clears only
 // when its hasTaskSummary flag is set). Do not introduce a second state flag.
 if(state==='idle'&&!hadTaskSummary)metadataListener?.({task_summary:null})
}

export function notifySessionMetadataChanged(
  metadata: SessionExternalMetadata,
): void {
  const source=getPermissionSessionState287()
  source.onMetadataChanged=metadataListener??undefined
  source.notifyMetadataChanged(metadata)
}

/**
 * Fired by onChangeAppState when toolPermissionContext.mode changes.
 * Downstream listeners (CCR external_metadata PUT, SDK status stream) are
 * both wired through this single choke point so no mode-mutation path can
 * silently bypass them.
 */
export function notifyPermissionModeChanged(mode: PermissionMode): void {
  const source=getPermissionSessionState287()
  source.onPermissionModeChanged=permissionModeListener??undefined
  source.notifyPermissionModeChanged(mode)
}
