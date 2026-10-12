// Official chunk-wyjbafrm.js:pAt. Never send a compact request after a blocking hook.
export class CompactBlockedByHookError extends Error {}
export function assertCompactNotBlocked(result: {blockedBy?: string}): void {
  if (result.blockedBy) throw new CompactBlockedByHookError(`Compaction blocked by PreCompact hook: ${result.blockedBy}`)
}
