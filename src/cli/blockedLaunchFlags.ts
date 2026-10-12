/** Launch flags intentionally unavailable in the local release. */
export const BLOCKED_LAUNCH_FLAGS = ['--safe-mode', '--restricted'] as const

export type BlockedLaunchFlag = (typeof BLOCKED_LAUNCH_FLAGS)[number]

/**
 * Finds a blocked option before Commander or any startup hook runs.
 * Arguments after `--` are prompt text and are not treated as options.
 */
export function findBlockedLaunchFlag(
  argv: readonly string[],
): BlockedLaunchFlag | undefined {
  const end = argv.indexOf('--')
  const options = end === -1 ? argv : argv.slice(0, end)
  for (const arg of options) {
    const flag = BLOCKED_LAUNCH_FLAGS.find(
      candidate => arg === candidate || arg.startsWith(`${candidate}=`),
    )
    if (flag) return flag
  }
  return undefined
}

export function blockedLaunchFlagMessage(flag: BlockedLaunchFlag): string {
  return `Error: ${flag} is blocked in cclaude 2.1.287; this local release does not implement the official ${flag} startup policy chain.`
}
