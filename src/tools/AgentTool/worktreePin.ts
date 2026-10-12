import { lstat, readFile, readdir, realpath } from 'node:fs/promises'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { execFileNoThrowWithCwd } from '../../utils/execFileNoThrow.js'
import { findCanonicalGitRoot, gitExe } from '../../utils/git.js'

/** Source-derived from official 2.1.283 yfe/qft/C1n/IQ/Qft/Tpt/Yft.
 * The local host has no private isolation-fence registry, so this verifier
 * accepts a linked git worktree only with an intact registration/back-pointer
 * and rejects an unwitnessed self-owning checkout. */
export type AgentWorktreePin = {
  path: string
  dev: number
  ino: number
  gitDir?: string
  commonDir?: string
}

export class AgentWorktreePinError extends Error {
  constructor(public readonly reason: string, path: string) {
    super(`Worktree ${path} was refused (${reason})`)
    this.name = 'AgentWorktreePinError'
  }
}

function contains(parent: string, child: string): boolean {
  const diff = relative(parent, child)
  return diff === '' || (diff !== '..' && !diff.startsWith(`..${sep}`) && !isAbsolute(diff))
}

async function gitProbe(cwd: string, args: string[]): Promise<string[] | null> {
  // Git's ambient directory overrides would make rev-parse describe another
  // checkout instead of the directory being pinned.
  const { GIT_DIR: _gitDir, GIT_WORK_TREE: _workTree, GIT_COMMON_DIR: _commonDir,
    GIT_INDEX_FILE: _indexFile, ...environment } = process.env
  const result = await execFileNoThrowWithCwd(gitExe(), ['--no-optional-locks', 'rev-parse', ...args], {
    cwd, timeout: 2_000, stdin: 'ignore',
    env: { ...environment, LC_ALL: 'C', GIT_TERMINAL_PROMPT: '0', GIT_ASKPASS: '' },
  })
  if (result.code !== 0) return null
  const lines = result.stdout.trimEnd().split('\n')
  if (lines.some(line => /[\u0000-\u001f\u007f-\u009f]/.test(line))) return null
  return lines
}

async function examineRefStore(gitDir: string, path: string): Promise<void> {
  // Qft/Tpt: inspect top-level entries plus refs recursively; symlinked ref
  // stores and unexaminable over-cap trees cannot certify isolation.
  let budget = 4096
  const scan = async (directory: string, depth: number): Promise<void> => {
    if (depth > 12 || budget <= 0) throw new AgentWorktreePinError('unexaminable-ref-store', path)
    let names: string[]
    try { names = await readdir(directory) }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return
      throw new AgentWorktreePinError('unexaminable-ref-store', path)
    }
    if (names.length > budget) throw new AgentWorktreePinError('unexaminable-ref-store', path)
    for (const name of names) {
      if (--budget < 0) throw new AgentWorktreePinError('unexaminable-ref-store', path)
      const entry = join(directory, name)
      let stat: Awaited<ReturnType<typeof lstat>>
      try { stat = await lstat(entry) }
      catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') continue
        throw new AgentWorktreePinError('unexaminable-ref-store', path)
      }
      if (stat.isSymbolicLink()) throw new AgentWorktreePinError('symlinked-ref-store', path)
      if (stat.isDirectory() && depth > 0) await scan(entry, depth + 1)
    }
  }
  await scan(gitDir, 0)
  await scan(join(gitDir, 'refs'), 1)
}

export async function verifyAgentWorktreePin(path: string, launchAnchors: string[]): Promise<AgentWorktreePin> {
  const absolute = resolve(path)
  let stat: Awaited<ReturnType<typeof lstat>>
  try { stat = await lstat(absolute) }
  catch { throw new AgentWorktreePinError('unverifiable-directory', absolute) }
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new AgentWorktreePinError('not-plain-directory', absolute)
  const tree = await realpath(absolute).catch(() => { throw new AgentWorktreePinError('unverifiable-directory', absolute) })
  const anchors = await Promise.all(launchAnchors.map(async anchor => realpath(anchor).catch(() => resolve(anchor))))
  const protectedRoots = new Set<string>()
  for (const anchor of anchors) {
    if (contains(tree, anchor)) throw new AgentWorktreePinError('pin-is-own-launch-tree', absolute)
    const root = findCanonicalGitRoot(anchor)
    if (root) protectedRoots.add(await realpath(root).catch(() => resolve(root)))
  }
  for (const root of protectedRoots) {
    if (contains(tree, root)) throw new AgentWorktreePinError('pin-is-protected-checkout', absolute)
  }

  const gitEntry = join(absolute, '.git')
  let entryStat: Awaited<ReturnType<typeof lstat>> | undefined
  try { entryStat = await lstat(gitEntry) }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw new AgentWorktreePinError('unverifiable-git-entry', absolute)
  }
  if (entryStat?.isSymbolicLink()) throw new AgentWorktreePinError('symlinked-git-entry', absolute)
  const probe = await gitProbe(absolute, ['--absolute-git-dir', '--show-toplevel', '--git-common-dir', '--is-bare-repository'])
  if (!probe) {
    if (entryStat) throw new AgentWorktreePinError('unverifiable-git-entry', absolute)
    if (findCanonicalGitRoot(absolute)) throw new AgentWorktreePinError('work-tree-elsewhere', absolute)
    return { path: absolute, dev: stat.dev, ino: stat.ino }
  }
  if (!entryStat || probe.length !== 4) throw new AgentWorktreePinError('work-tree-elsewhere', absolute)
  const [rawGitDir, rawTopLevel, rawCommonDir, bare] = probe
  if (!rawGitDir || !rawTopLevel || !rawCommonDir || bare !== 'false') throw new AgentWorktreePinError('unverifiable-git-metadata', absolute)
  const [gitDir, topLevel, commonDir] = await Promise.all([
    realpath(resolve(absolute, rawGitDir)),
    realpath(resolve(absolute, rawTopLevel)),
    realpath(resolve(absolute, rawCommonDir)),
  ]).catch(() => { throw new AgentWorktreePinError('unverifiable-git-metadata', absolute) })
  if (topLevel !== tree) throw new AgentWorktreePinError('work-tree-elsewhere', absolute)
  await examineRefStore(gitDir, absolute)
  for (const root of protectedRoots) {
    const rootsGit = await gitProbe(root, ['--absolute-git-dir'])
    if (rootsGit?.length === 1 && await realpath(resolve(root, rootsGit[0]!)).catch(() => '') === gitDir) {
      throw new AgentWorktreePinError('shared-git-dir', absolute)
    }
  }
  if (gitDir === commonDir) {
    if (protectedRoots.size === 0) throw new AgentWorktreePinError('unwitnessed-self-owning-pin', absolute)
  } else {
    if (!entryStat.isFile() || dirname(gitDir) !== join(commonDir, 'worktrees')) {
      throw new AgentWorktreePinError('invalid-linked-worktree', absolute)
    }
    const entry = await readFile(gitEntry, 'utf8').catch(() => '')
    const match = /^gitdir:\s*(.+)\s*$/i.exec(entry.trim())
    if (!match || await realpath(resolve(absolute, match[1]!)).catch(() => '') !== gitDir) {
      throw new AgentWorktreePinError('invalid-linked-worktree', absolute)
    }
    const backPointer = await readFile(join(gitDir, 'gitdir'), 'utf8').catch(() => '')
    if (!backPointer || await realpath(resolve(gitDir, backPointer.trim())).catch(() => '') !==
        await realpath(gitEntry).catch(() => '')) {
      throw new AgentWorktreePinError('invalid-linked-worktree', absolute)
    }
  }
  return { path: absolute, dev: stat.dev, ino: stat.ino, gitDir, commonDir }
}

export function sameAgentWorktreePin(a: AgentWorktreePin, b: AgentWorktreePin): boolean {
  return a.path === b.path && a.dev === b.dev && a.ino === b.ino &&
    a.gitDir === b.gitDir && a.commonDir === b.commonDir
}
