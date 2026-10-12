import { closeSync, constants, fstatSync, lstatSync, openSync, realpathSync, statSync } from 'node:fs'
import type { BigIntStats } from 'node:fs'
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path'
import { ConfinementPolicyError287, getErrnoCode287 } from './confinementError287.js'
import { assertNonAdministrator287 } from './processPrivilege287.js'
import type { ExecutionEntry287, WindowsTokenCapability287 } from './processPrivilege287.js'

export type DirectoryIdentity287 = Readonly<{
  canonicalPath: string
  device: string
  inode: string
}>

/** Trusted session-creation inputs only; NEVER derive these from project env/settings. */
export type WorkspacePolicyInput287 = Readonly<{
  sessionId: string
  workspaceRoot: string
  userHome: string
  // Required even when empty: include ALL broker-configured/custom credential roots.
  credentialRoots: readonly string[]
  entry: ExecutionEntry287
  windowsTokenCapability?: WindowsTokenCapability287
}>

export type PathPreflight287 = Readonly<{
  kind: 'path-preflight-only'
  canonicalCandidate: string
  exists: boolean
}>

export interface WorkspacePolicy287 {
  readonly sessionId: string
  readonly root: DirectoryIdentity287
  assertRootIdentity(): void
  preflightCwd(directory: string): PathPreflight287
  preflightPath(path: string, access: 'read' | 'write', cwd?: string): PathPreflight287
  /** Trusted synchronous native bootstrap ONLY; no tool RPC/serialization of the fd. */
  withRootDirectoryHandle<T>(consume: (fd: number) => T): T
  close(): void
}

function fail(code: ConstructorParameters<typeof ConfinementPolicyError287>[0]): never {
  throw new ConfinementPolicyError287(code)
}

function checkPath(value: string): void {
  // Reject '..' rather than normalize away symlink/.. kernel semantics.
  if (typeof value !== 'string' || !value || value.includes('\0') ||
      value.split(process.platform === 'win32' ? /[\\/]/ : /\//).includes('..')) {
    fail('INVALID_WORKSPACE_POLICY')
  }
  if (process.platform === 'win32' &&
      (/^[\\/]{2}[?.]/.test(value) || value.replace(/^[A-Za-z]:[\\/]/, '').includes(':'))) {
    fail('INVALID_WORKSPACE_POLICY') // device namespaces, ADS, drive-relative paths
  }
}

function absoluteInput(value: string): string {
  checkPath(value)
  if (!isAbsolute(value)) fail('INVALID_WORKSPACE_POLICY')
  return resolve(value)
}

function within(root: string, path: string): boolean {
  const remainder = relative(root, path)
  return remainder === '' || (!isAbsolute(remainder) && remainder !== '..' &&
    !remainder.startsWith(`..${sep}`))
}

function sameIdentity(stats: BigIntStats, root: DirectoryIdentity287): boolean {
  return stats.isDirectory() && stats.dev.toString() === root.device &&
    stats.ino.toString() === root.inode
}

// Canonicalize the closest EXISTING ancestor; dangling symlinks are errors,
// not nonexistent paths to be climbed past. No file contents are read.
export function canonicalPathPreflight287(path: string): { canonical: string; exists: boolean } {
  const suffix: string[] = []
  let ancestor = path
  for (;;) {
    try {
      const metadata = lstatSync(ancestor)
      const canonical = realpathSync.native(ancestor)
      if (suffix.length && !(metadata.isDirectory() ||
          (metadata.isSymbolicLink() && statSync(canonical).isDirectory()))) {
        fail('PATH_UNAVAILABLE')
      }
      return { canonical: join(canonical, ...suffix), exists: suffix.length === 0 }
    } catch (error) {
      if (error instanceof ConfinementPolicyError287) throw error
      if (getErrnoCode287(error) !== 'ENOENT') fail('PATH_UNAVAILABLE')
      // lstat succeeded on a dangling symlink: realpath's ENOENT must stop.
      try { lstatSync(ancestor); fail('PATH_UNAVAILABLE') } catch (probe) {
        if (getErrnoCode287(probe) !== 'ENOENT') fail('PATH_UNAVAILABLE')
      }
      const parent = dirname(ancestor)
      if (parent === ancestor) fail('PATH_UNAVAILABLE')
      suffix.unshift(ancestor.slice(parent.length + (parent.endsWith(sep) ? 0 : 1)))
      ancestor = parent
    }
  }
}

const HOME_CREDENTIAL_DIRECTORIES = [
  '.claude', '.cclaude', '.ssh', '.aws', '.azure', '.kube', '.gnupg',
  '.config/gcloud', '.config/gh', '.config/cclaude', '.local/share/keyrings',
] as const

/**
 * Fixed session authority, independent of cwd/skip/add-dir/project env.
 * All path methods are PRECHECKS ONLY: realpath/stat/open sequences can race.
 * This object is not a kernel sandbox and cannot confine same-process code.
 */
export function createWorkspacePolicy287(input: WorkspacePolicyInput287): WorkspacePolicy287 {
  const entry = input.entry
  const suppliedCapability = input.windowsTokenCapability
  let capability: WindowsTokenCapability287 | undefined
  if (suppliedCapability) {
    try {
      if (typeof suppliedCapability.queryCurrentProcessToken !== 'function') {
        fail('PRIVILEGE_CHECK_UNAVAILABLE')
      }
      capability = Object.freeze({
        kind: suppliedCapability.kind,
        queryCurrentProcessToken: suppliedCapability.queryCurrentProcessToken.bind(suppliedCapability),
      })
    } catch { fail('PRIVILEGE_CHECK_UNAVAILABLE') }
  }
  assertNonAdministrator287(entry, capability)
  if (typeof input.sessionId !== 'string' || !input.sessionId ||
      !Array.isArray(input.credentialRoots)) fail('INVALID_WORKSPACE_POLICY')
  const sessionId = input.sessionId
  const requestedRoot = absoluteInput(input.workspaceRoot)
  const requestedHome = absoluteInput(input.userHome)
  const credentialInputs = [
    ...HOME_CREDENTIAL_DIRECTORIES.map(path => join(requestedHome, path)),
    ...input.credentialRoots.map(absoluteInput),
  ]
  let fd: number | undefined
  try {
    const canonicalPath = realpathSync.native(requestedRoot)
    const canonicalHome = realpathSync.native(requestedHome)
    const selectedDirectory = statSync(canonicalPath, { bigint: true })
    if (!selectedDirectory.isDirectory()) fail('INVALID_WORKSPACE_POLICY')
    if (!statSync(canonicalHome).isDirectory()) fail('INVALID_WORKSPACE_POLICY')
    if (canonicalPath === parse(canonicalPath).root ||
        within(canonicalPath, requestedHome) || within(canonicalPath, canonicalHome)) {
      fail('FORBIDDEN_WORKSPACE_ROOT')
    }
    const credentialRoots = Object.freeze(credentialInputs.flatMap(path =>
      [path, canonicalPathPreflight287(path).canonical]))
    if (credentialRoots.some(path => within(canonicalPath, path) || within(path, canonicalPath))) {
      fail('FORBIDDEN_WORKSPACE_ROOT')
    }
    // Retain a directory fd so the bound inode stays live until session teardown.
    // This does not close the initialization/path-use race; OS adapter must bind
    // its real handle, enforce beneath/no-links semantics and verify identity.
    fd = openSync(canonicalPath, constants.O_RDONLY |
      (constants.O_DIRECTORY ?? 0) | (constants.O_NOFOLLOW ?? 0))
    const pinnedFd = fd
    const metadata = fstatSync(pinnedFd, { bigint: true })
    if (!metadata.isDirectory()) fail('INVALID_WORKSPACE_POLICY')
    const root: DirectoryIdentity287 = Object.freeze({
      canonicalPath, device: metadata.dev.toString(), inode: metadata.ino.toString(),
    })
    if (!sameIdentity(selectedDirectory, root)) fail('WORKSPACE_IDENTITY_CHANGED')
    let closed = false
    function assertRootIdentity(): void {
      if (closed) fail('POLICY_CLOSED')
      assertNonAdministrator287(entry, capability)
      try {
        const current = lstatSync(canonicalPath, { bigint: true })
        if (!sameIdentity(current, root) || !sameIdentity(fstatSync(pinnedFd, { bigint: true }), root) ||
            realpathSync.native(canonicalPath) !== canonicalPath) {
          fail('WORKSPACE_IDENTITY_CHANGED')
        }
      } catch (error) {
        if (error instanceof ConfinementPolicyError287) throw error
        fail('WORKSPACE_IDENTITY_CHANGED')
      }
    }
    function inspect(path: string, allowMissing: boolean): PathPreflight287 {
      checkPath(path)
      if (!within(canonicalPath, path)) fail('PATH_OUTSIDE_WORKSPACE')
      const result = canonicalPathPreflight287(path)
      if (!within(canonicalPath, result.canonical) ||
          credentialRoots.some(denied => within(denied, result.canonical))) {
        fail('PATH_OUTSIDE_WORKSPACE')
      }
      if (!allowMissing && !result.exists) fail('PATH_UNAVAILABLE')
      assertRootIdentity()
      return Object.freeze({ kind: 'path-preflight-only', canonicalCandidate: result.canonical,
        exists: result.exists })
    }
    function preflightCwd(directory: string): PathPreflight287 {
      assertRootIdentity()
      checkPath(directory)
      const result = inspect(resolve(canonicalPath, directory), false)
      try {
        if (!statSync(result.canonicalCandidate).isDirectory()) fail('PATH_UNAVAILABLE')
      } catch { fail('PATH_UNAVAILABLE') }
      return result
    }
    assertRootIdentity()
    return Object.freeze({
      sessionId, root, assertRootIdentity, preflightCwd,
      preflightPath(path: string, access: 'read' | 'write', cwd = canonicalPath): PathPreflight287 {
        assertRootIdentity()
        checkPath(path)
        if (access !== 'read' && access !== 'write') fail('INVALID_WORKSPACE_POLICY')
        const base = preflightCwd(cwd).canonicalCandidate
        return inspect(resolve(base, path), access === 'write')
      },
      withRootDirectoryHandle<T>(consume: (fd: number) => T): T {
        assertRootIdentity()
        const result = consume(pinnedFd)
        assertRootIdentity()
        return result
      },
      close(): void {
        if (closed) return
        closed = true
        closeSync(pinnedFd)
      },
    })
  } catch (error) {
    if (fd !== undefined) closeSync(fd)
    if (error instanceof ConfinementPolicyError287) throw error
    fail('INVALID_WORKSPACE_POLICY')
  }
}
