import type { SpinnerMode } from '../components/Spinner/types.js'
import type { AppState } from './AppStateStore.js'

/** Complete 2.1.287 SpinnerStore state shape; REPL producers update these slots. */
export type OfficialRltSpinnerState287 = {
  mode: SpinnerMode
  overrideMessage: string | null
  overrideColor: string | null
  overrideShimmerColor: string | null
  isCompacting: boolean
  compactingHintText: string | null
  compactingStartTime: number | null
  turnEffort: string | null
  turnModel: string | null
  retryStatus: string | null
  thinkingStartedAt: number | null
  outputLimitRecovery: unknown | null
  defaultVerb: string
}

export const DEFAULT_OFFICIAL_RLT_SPINNER_STATE_287: OfficialRltSpinnerState287 = {
  mode: 'responding', overrideMessage: null, overrideColor: null, overrideShimmerColor: null,
  isCompacting: false, compactingHintText: null, compactingStartTime: null, turnEffort: null,
  turnModel: null, retryStatus: null, thinkingStartedAt: null, outputLimitRecovery: null, defaultVerb: '',
}

export type OfficialRltOwnedAppState287 = Pick<AppState, 'officialRltSpinner287' | 'officialRltMainToolUseIDs287'>

/** Functional setter used by the single AppState spinner owner. */
export function updateOfficialRltSpinnerState287<State extends OfficialRltOwnedAppState287, K extends keyof OfficialRltSpinnerState287>(
  previous: State,
  field: K,
  action: OfficialRltSpinnerState287[K] | ((current: OfficialRltSpinnerState287[K]) => OfficialRltSpinnerState287[K]),
): State {
  const spinner = requireOfficialRltSpinnerState287(previous)
  const current = spinner[field] as OfficialRltSpinnerState287[K]
  const next = typeof action === 'function'
    ? (action as (value: OfficialRltSpinnerState287[K]) => OfficialRltSpinnerState287[K])(current)
    : action
  if (Object.is(current, next)) return previous
  return { ...previous, officialRltSpinner287: { ...spinner, [field]: next } } as State
}

/** A missing owner is a wiring error, not an idle/request eligibility value. */
export function requireOfficialRltSpinnerState287(state:OfficialRltOwnedAppState287):OfficialRltSpinnerState287 {
  if(state.officialRltSpinner287===undefined)throw new Error('REPL spinner owner was not initialized')
  return state.officialRltSpinner287
}

export function requireOfficialRltMainToolUseIDs287(state:OfficialRltOwnedAppState287):Set<string> {
  if(state.officialRltMainToolUseIDs287===undefined)throw new Error('REPL main transcript owner was not initialized')
  return state.officialRltMainToolUseIDs287 as Set<string>
}
