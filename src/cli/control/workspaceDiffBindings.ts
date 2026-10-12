import {access, lstat, open, readlink, realpath, stat} from 'node:fs/promises'
import {constants as fsConstants} from 'node:fs'
import * as path from 'node:path'
import {execa} from 'execa'
import type {ToolPermissionContext} from '../../Tool.js'
import {FileReadTool} from '../../tools/FileReadTool/FileReadTool.js'
import {getCwd} from '../../utils/cwd.js'
import {getPathsForPermissionCheck} from '../../utils/fsOperations.js'
import {findGitRoot, getGitDir, gitExe} from '../../utils/git.js'
import {checkReadPermissionForTool, matchingRuleForInput} from '../../utils/permissions/filesystem.js'
import {isPathAllowed} from '../../utils/permissions/pathValidation.js'
import {containsVulnerableUncPath} from '../../utils/shell/readOnlyCommandValidation.js'
import {createOfficialContent} from '../../vendor/official-workspace-diff/content.js'
import {createOfficialPatch} from '../../vendor/official-workspace-diff/patch.js'
import {createOfficialSafeRead} from '../../vendor/official-workspace-diff/safe-read.js'
import {createOfficialStats} from '../../vendor/official-workspace-diff/stats.js'

const SESSION_START_MS = Date.now() - Math.floor(process.uptime() * 1000)
const gitOptions = ['-c', 'core.hooksPath=/dev/null', '-c', 'core.fsmonitor=']
const diffOptions = ['--no-color', '--src-prefix=a/', '--dst-prefix=b/', '--submodule=short']
const state = {diffCheckoutIsRepo: new Map<string, boolean>()}
const checkoutState = {repoCheckouts: {baseRefs: undefined as Map<string,string> | undefined,
  checkouts: undefined as Map<string,string> | undefined}}

function cleanEnv() {
  return {...process.env, GIT_TERMINAL_PROMPT: '0', GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_NOSYSTEM: '1', GIT_NO_LAZY_FETCH: '1', GIT_ALLOW_PROTOCOL: 'none'}
}

export async function officialGitExec(file: string, args: string[], options: Record<string, any> = {}) {
  const signal = options.abortSignal as AbortSignal | undefined
  if (signal?.aborted) throw new Error('get_workspace_diff cancelled')
  const result = await execa(file, args, {cwd: options.cwd ?? getCwd(),
    env: {...cleanEnv(), ...options.env}, reject: false, stdin: options.input !== undefined ? 'pipe' : options.stdin ?? 'ignore',
    input: options.input, timeout: options.timeout ?? 5000, maxBuffer: options.maxBuffer ?? 10_000_000,
    cancelSignal: signal})
  if (signal?.aborted) throw new Error('get_workspace_diff cancelled')
  return {stdout: result.stdout ?? '', stderr: result.stderr ?? '', code: result.exitCode ?? 1,
    exitCode: result.exitCode ?? 1}
}

function readable(file: string, context: ToolPermissionContext): boolean {
  if (checkReadPermissionForTool(FileReadTool, {file_path: file}, context).behavior !== 'allow') return false
  return getPathsForPermissionCheck(file).every(spelling =>
    isPathAllowed(spelling, context, 'read').allowed &&
    matchingRuleForInput(spelling, context, 'read', 'ask') === null)
}

async function currentBranch() {
  const result = await officialGitExec(gitExe(), ['--no-optional-locks', 'rev-parse', '--abbrev-ref', 'HEAD'])
  return result.code === 0 ? result.stdout.trim() || 'HEAD' : 'HEAD'
}
async function defaultBranch() {
  const symbolic = await officialGitExec(gitExe(), ['--no-optional-locks', 'symbolic-ref', '--short', 'refs/remotes/origin/HEAD'])
  if (symbolic.code === 0) {
    const name = symbolic.stdout.trim().replace(/^origin\//, '')
    if (name) return name
  }
  for (const name of ['main', 'master']) {
    const ref = await officialGitExec(gitExe(), ['--no-optional-locks', 'show-ref', '--verify', '--quiet', `refs/remotes/origin/${name}`])
    if (ref.code === 0) return name
  }
  return 'main'
}

export function createWorkspaceDiffOracle(context: ToolPermissionContext, signal?: AbortSignal) {
  const Ke = (file: string, args: string[], options: Record<string, any> = {}) =>
    officialGitExec(file, args, {...options, abortSignal: options.abortSignal ?? signal})
  const No = cleanEnv
  let stats: ReturnType<typeof createOfficialStats>
  const cwdHost = {cwd: getCwd}
  const statsBindings = {
    At: path,
    ES: '--ignore-submodules=dirty', Fn: findGitRoot,
    Ft: (cwd: string) => ({env: cleanEnv(), cwd}), Ixe: () => SESSION_START_MS,
    K: class {
      private cache = new WeakMap<object, unknown>()
      constructor(private factory: () => unknown) {}
      of(key: object) {
        if (!this.cache.has(key)) this.cache.set(key, this.factory())
        return this.cache.get(key)
      }
    },
    Ke, N: path.join, No, P: Error,
    Ot: (cwd: string) => ({env: cleanEnv(), cwd}),
    Re: stat, Rt: access, T6: getGitDir, Tt: path.sep,
    X: JSON.parse, Xl: currentBranch, Yd: () => state, Yr: () => checkoutState,
    _: () => {}, a: process.env, c: String, ce: () => cwdHost,
    de: (_executor: unknown, cwd: string, args: string[], sandbox: Record<string, any>, _unused: unknown,
      options: Record<string, any>) => Ke(gitExe(), args, {...options, ...sandbox, cwd}),
    fg: () => findGitRoot(getCwd()), l: () => {}, p: () => {}, t: () => {},
    tC: defaultBranch, tb: findGitRoot,
    wWr: diffOptions, wt: path.isAbsolute, yt: gitExe,
  }
  stats = createOfficialStats(statsBindings)
  const {v4} = createOfficialPatch({})
  const {Kvt,sHe} = createOfficialSafeRead({h: realpath, p: readlink, u: lstat})
  const permissions = {...context, trustedNetworkDirectories: undefined}
  const contentBindings = {
    Kvt, M: (items: string[]) => [...new Set(items)],
    M$n: 1_000_000, N$n: stats.N$n,
    NC: (file: string, policy: ToolPermissionContext) => isPathAllowed(file, policy, 'read'),
    Ptn: stats.Ptn, Ra: matchingRuleForInput,
    Rtn: stats.Rtn, Sst: stats.Sst, TCr: stats.TCr,
    Ttn: ['--no-optional-locks', '-c', 'diff.relative=false', 'diff', ...diffOptions, '--ignore-submodules=dirty'],
    UPt: 400, Uve: 5000, Ve: Ke, bst: stats.bst,
    g1: (original: string, resolved: string) => {
      const pathsToCheck = [...new Set([original, resolved, ...getPathsForPermissionCheck(resolved)])]
      return {ok: pathsToCheck.every(file => !containsVulnerableUncPath(file)), pathsToCheck}
    },
    gSn: fsConstants.O_RDONLY | (fsConstants.O_NONBLOCK ?? 0) | (fsConstants.O_NOCTTY ?? 0) |
      (process.platform === 'darwin' ? 16_777_216 : (fsConstants.O_NOFOLLOW ?? 0)),
    ge: path.basename, h1: (file: string) => containsVulnerableUncPath(file) ? 'network_path' : undefined,
    he: path.dirname, mn: gitOptions, ot: fsConstants, q: realpath, sHe,
    st: open, v4, wWt: async (file: string) => readable(file, context), we: path.join, yt: gitExe,
  }
  const content = createOfficialContent(contentBindings)
  return {stats, content, context: permissions, signal}
}

export async function runOfficialWorkspaceDiff(context: ToolPermissionContext, signal?: AbortSignal) {
  const {stats,content,context: permissions} = createWorkspaceDiffOracle(context, signal)
  const root = await stats.Ptn(signal) // Tt itself calls the pinned Ptn; this preflight only excludes me/ce.
  if (signal?.aborted) throw new Error('get_workspace_diff cancelled')
  if (!root) return {diff: null}
  const response = await content.Tt({}, permissions, {perFileMs: 5000, totalMs: 10000}, root, null, undefined)
  if (signal?.aborted) throw new Error('get_workspace_diff cancelled')
  return response
}
