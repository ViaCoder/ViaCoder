/** SDK-free leaf: also safe for the browser SDK bootstrap dependency graph. */
export type StickyBetaState = {sent: Set<string>; rejected: Set<string>}

export function createStickyBetaState(): StickyBetaState {
  return {sent: new Set(), rejected: new Set()}
}
export function sendBeta(state: StickyBetaState, beta: string): void {
  if (!state.rejected.has(beta)) state.sent.add(beta)
}
export function betaWasSent(state: StickyBetaState, beta: string): boolean {
  return state.sent.has(beta) && !state.rejected.has(beta)
}
export function rejectBeta(state: StickyBetaState, beta: string): void {
  state.sent.delete(beta)
  state.rejected.add(beta)
}

// Adapter for the recovered query path: owners and concurrent agents
// must not share a beta rejection. Explicit callers can supply their own ledger.
const ownerStates = new Map<string, StickyBetaState>()
export function getThinkingBindingState(sessionId: string, agentId?: string): StickyBetaState {
  const key = JSON.stringify([sessionId, agentId ?? null])
  let state = ownerStates.get(key)
  if (!state) {state = createStickyBetaState(); ownerStates.set(key, state)}
  return state
}
export function clearThinkingBindingStates(sessionId?: string, agentId?: string): void {
  if (sessionId === undefined) ownerStates.clear()
  else ownerStates.delete(JSON.stringify([sessionId, agentId ?? null]))
}
