import { realpathSync } from 'node:fs'
import type { ExecutionSession287 } from './officialExecutionOwners287/native.js'
import type { CleanupUnregister287 } from '../../utils/cleanupRegistry.js'
import { ConfinementPolicyError287 } from '../../utils/confinement287/confinementError287.js'
import { createWorkspacePolicy287 } from '../../utils/confinement287/workspacePolicy287.js'
import type {
  PathPreflight287, WorkspacePolicy287, WorkspacePolicyInput287,
} from '../../utils/confinement287/workspacePolicy287.js'

export type WorkspaceConfinementInitialization287 = Omit<WorkspacePolicyInput287, 'sessionId'>

// Attached capability/lifetime ONLY. No session IDs, project copies, current-cwd
// cells, registry constructor or new execution owner. Native .root is the key.
type RootBinding287 = Readonly<{
  policy: WorkspacePolicy287
  unregisterCleanup: CleanupUnregister287
}>
const bindings = new WeakMap<ExecutionSession287, RootBinding287>()

function invalid(): never {
  throw new ConfinementPolicyError287('INVALID_WORKSPACE_POLICY')
}

function canonicalDirectory(path: string): string {
  try { return realpathSync.native(path) } catch {
    throw new ConfinementPolicyError287('PATH_UNAVAILABLE')
  }
}

/** Optional presence lookup for trusted initialization/UI, NOT an execution gate. */
export function getWorkspaceConfinement287(session: ExecutionSession287): WorkspacePolicy287 | undefined {
  return bindings.get(session.root)?.policy
}

function selectedScope(session: ExecutionSession287): { policy: WorkspacePolicy287; cwd: string } {
  const policy = getWorkspaceConfinement287(session)
  if (!policy) invalid() // Never synthesize policy from cwd/env/skip.
  policy.assertRootIdentity()
  const project = session.project
  if (!project) invalid()
  // Project views/cd may narrow the working context, never the fixed authority.
  // Canonicalize original owner paths so an initial selected alias stays usable
  // only while it still resolves inside the immutable directory authority.
  policy.preflightCwd(canonicalDirectory(project.projectRoot))
  policy.preflightCwd(canonicalDirectory(project.originalCwd))
  const cwd = policy.preflightCwd(canonicalDirectory(project.cwd)).canonicalCandidate
  return { policy, cwd }
}

/** Explicit TRUSTED bootstrap only; binding is once per original root lifetime. */
export function initializeWorkspaceConfinement287(
  session: ExecutionSession287,
  input: WorkspaceConfinementInitialization287,
): WorkspacePolicy287 {
  const owner = session.root
  if (session !== owner || bindings.has(owner) || !owner.project) invalid()
  // Resolve the real cleanup port only at trusted initialization. Importing
  // execution287 (or closing its unbound test-reset root) must not pull the
  // canonical Mods lifecycle graph into module evaluation.
  const { registerCleanup, hasCleanupStarted } = require('../../utils/cleanupRegistry.js') as typeof import('../../utils/cleanupRegistry.js')
  if (hasCleanupStarted()) throw new ConfinementPolicyError287('POLICY_CLOSED')
  // The actual native owner supplies identity; callers cannot forge sessionId.
  const policy = createWorkspacePolicy287({ ...input, sessionId: owner.id })
  let unregister: CleanupUnregister287 | undefined
  try {
    if (canonicalDirectory(owner.project.projectRoot) !== policy.root.canonicalPath) invalid()
    policy.preflightCwd(canonicalDirectory(owner.project.originalCwd))
    policy.preflightCwd(canonicalDirectory(owner.project.cwd))
    // Existing canonical cleanup registry. Capture THIS owner, never whichever
    // AsyncLocalStorage context happens to be selected when shutdown drains.
    unregister = registerCleanup(() => closeWorkspaceConfinement287(owner))
    bindings.set(owner, Object.freeze({ policy, unregisterCleanup: unregister }))
    return policy
  } catch (error) {
    unregister?.()
    policy.close()
    throw error
  }
}

/** Unbound/closed/outside-project contexts stop here; no permissive fallback. */
export function requireWorkspaceConfinement287(session: ExecutionSession287): WorkspacePolicy287 {
  return selectedScope(session).policy
}

/** Before original /cd writer. Does not mutate native project/session fields. */
export function preflightWorkspaceCwd287(session: ExecutionSession287, directory: string): PathPreflight287 {
  // Use the bound authority directly: a trusted correction can recover a cwd
  // that an unguarded original writer already moved outside. No root expansion.
  const policy = getWorkspaceConfinement287(session)
  if (!policy) invalid()
  return policy.preflightCwd(directory)
}

/** Relative path base is the selected ORIGINAL project view, not process.cwd. */
export function preflightWorkspacePath287(
  session: ExecutionSession287, path: string, access: 'read' | 'write',
): PathPreflight287 {
  const { policy, cwd } = selectedScope(session)
  return policy.preflightPath(path, access, cwd)
}

/** Real root teardown only. Clearing/re-identifying or dropping a view is NOT teardown. */
export function closeWorkspaceConfinement287(owner: ExecutionSession287): void {
  if (owner !== owner.root) invalid()
  const binding = bindings.get(owner)
  if (!binding) return
  // Captured real unregister; no cleanup module lookup for unbound teardown.
  try { binding.policy.close() } finally { binding.unregisterCleanup() }
  // Keep the closed capability attached: the same owner cannot rebind/widen
  // after teardown. WeakMap releases metadata when the actual root is collected.
}
