import type { ChildProcess } from 'node:child_process'
import { realpathSync } from 'node:fs'
import { quote } from 'shell-quote'
import { getExecutionWorkspaceConfinement287, requireExecutionWorkspaceConfinement287 } from '../../services/context/execution287.js'

export type OriginalModsProcessInput287 = {
  command: string
  args: string[]
  cwd: string
  env?: Record<string, string>
  hasInput: boolean
}

/** C boundary only. Original Hre still owns spawning, environment, streams,
 * process groups and cancellation; reuse the existing mandatory OS sandbox. */
export async function spawnWithWorkspaceBoundary287(
  input: OriginalModsProcessInput287,
  spawnOriginal: (input: OriginalModsProcessInput287) => ChildProcess,
  signal?: AbortSignal,
): Promise<{ child: ChildProcess }> {
  const policy = getExecutionWorkspaceConfinement287()
  if (!policy) return { child: spawnOriginal(input) }
  const validate = () => {
    if (requireExecutionWorkspaceConfinement287() !== policy) throw new Error('Workspace execution policy changed')
    policy.assertRootIdentity()
    policy.preflightCwd(realpathSync.native(input.cwd))
    if (signal?.aborted) throw signal.reason ?? new Error('Command cancelled')
  }
  validate()
  const { SandboxManager } = await import('../sandbox/sandbox-adapter.js')
  await SandboxManager.initialize()
  validate()
  const command = await SandboxManager.wrapWithSandbox(quote([input.command, ...input.args]), '/bin/sh', undefined, signal)
  validate()
  let cleaned = false
  const cleanup = () => {
    if (cleaned) return
    cleaned = true
    SandboxManager.cleanupAfterCommand()
  }
  try {
    const child = spawnOriginal({ ...input, command: '/bin/sh', args: ['-c', command] })
    child.once('close', cleanup)
    child.once('error', cleanup)
    // execa children are thenables. Box them: an async return must not await
    // the child into its final result before the original stream owner binds.
    return { child }
  } catch (error) {
    cleanup()
    throw error
  }
}
