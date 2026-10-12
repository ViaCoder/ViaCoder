import type { LocalSessionTitleState } from '../cli/control/renameObservation.js'

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
}

/** Narrow the local Web title observation; requested_title is never promoted to title. */
export function projectLocalTitleResponse(value: unknown, sessionId: string): { state: LocalSessionTitleState } | null {
  const raw = object(value), state = object(raw?.state)
  if (!state || state.session_id !== sessionId || !Number.isSafeInteger(state.revision) || Number(state.revision) < 0 ||
    !['unobserved', 'pending', 'settled', 'failed'].includes(String(state.status)) ||
    !['persisted', 'memory_only', 'disabled'].includes(String(state.persistence))) return null
  for (const key of ['title', 'name', 'requested_title', 'error'] as const) {
    if (state[key] !== undefined && typeof state[key] !== 'string') return null
  }
  if (state.title !== undefined && state.persistence !== 'persisted') return null
  return { state: {
    session_id: sessionId, revision: state.revision as number,
    status: state.status as LocalSessionTitleState['status'],
    persistence: state.persistence as LocalSessionTitleState['persistence'],
    ...(typeof state.title === 'string' ? { title: state.title } : {}),
    ...(typeof state.name === 'string' ? { name: state.name } : {}),
    ...(typeof state.requested_title === 'string' ? { requested_title: state.requested_title } : {}),
    ...(typeof state.error === 'string' ? { error: state.error } : {}),
  } }
}
