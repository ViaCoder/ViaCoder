// Official 2.1.283 chunk-td7fxg34, stop_hook_blocking continuation branch.
// This counter belongs to one query invocation, never a session setting.
export function stopHookContinuation(turnCount: number, consecutive: number, maxTurns?: number,
  cap = Number(process.env.CLAUDE_CODE_STOP_HOOK_BLOCK_CAP ?? 8)) {
  const nextTurn = turnCount + 1, nextCount = consecutive + 1
  return {nextTurn, nextCount,
    maxTurnsReached: Boolean(maxTurns && nextTurn > maxTurns),
    capReached: cap > 0 && nextCount > cap}
}
