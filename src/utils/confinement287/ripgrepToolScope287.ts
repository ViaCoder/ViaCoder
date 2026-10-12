import {AsyncLocalStorage} from 'node:async_hooks'
import type {ChildProcess, ExecFileOptions, SpawnOptions} from 'node:child_process'
import {realpathSync} from 'node:fs'
import {isAbsolute} from 'node:path'
import {quote} from 'shell-quote'
import {assertConfinedFileToolContext287, getConfinedFileToolContext287} from './fileToolIoScope287.js'
// Lazy application ports avoid re-entering canonical assembly at import time.
const getCwd = () => (import.meta.require('../cwd.js') as typeof import('../cwd.js')).getCwd()
const getClaudeTempDir = () => (import.meta.require('../permissions/filesystem.js') as typeof import('../permissions/filesystem.js')).getClaudeTempDir()
const findExecutable = (file: string) => (import.meta.require('../findExecutable.js') as typeof import('../findExecutable.js')).findExecutable(file, []).cmd
const getRipgrepConfig287 = () => (import.meta.require('../ripgrep.js') as typeof import('../ripgrep.js')).getRipgrepConfig287()
const sandbox = () => import.meta.require('../sandbox/sandbox-adapter.js') as typeof import('../sandbox/sandbox-adapter.js')

type Context = NonNullable<ReturnType<typeof getConfinedFileToolContext287>>
type Prepared = {context: Context; executable: string; commands: Map<string, string>}
const prepared = new AsyncLocalStorage<Prepared>()
const key = (file: string, args: readonly string[]) => JSON.stringify([file, args])
const environment = () => ({PATH: '/usr/bin:/bin', HOME: getClaudeTempDir(), TMPDIR: getClaudeTempDir()})

/** Preparation is asynchronous, but the original IO/PJ/IE callback producers
 * still synchronously return a real ChildProcess. No fake process or rewritten
 * search algorithm; same original timeout, buffers, stdin and EAGAIN retry.
 */
export function wrapOriginalRipgrep287(kind: 'search' | 'spawn' | 'execFile' | 'probe', original: (...args: any[]) => any) {
  if (kind === 'search') return async (...args: any[]) => {
    const context = getConfinedFileToolContext287()
    if (!context) return original(...args)
    assertConfinedFileToolContext287(context)
    const [patterns, target, signal] = args as [string[], string, AbortSignal]
    context.policy.preflightPath(target, 'read', getCwd())
    signal.throwIfAborted()
    const config = getRipgrepConfig287()
    if (config.argv0) throw new Error('Confined source ripgrep requires the published executable')
    const executable = realpathSync.native(isAbsolute(config.command) ? config.command : findExecutable(config.command))
    const commands = new Map<string, string>()
    // Both original retry variants are prepared before its synchronous IO arm.
    try {
      for (const threadArgs of [[], ['-j', '1']]) {
        const argv = [...config.args, ...threadArgs, ...patterns, target]
        const wrapped = await sandbox().wrapFixedFileIoCommand287(quote(['exec', executable, ...argv]), [executable], signal)
        commands.set(key(config.command, argv), wrapped)
        assertConfinedFileToolContext287(context)
      }
    } catch (error) {
      if (commands.size) sandbox().SandboxManager.cleanupAfterCommand()
      throw error
    }
    return prepared.run({context, executable, commands}, () => original(...args))
  }
  if (kind === 'probe') return async (file: string, args: string[], options: any) => {
    const scope = prepared.getStore()
    if (!scope) return original(file, args, options)
    // The original first-use probe is fire-and-observe; keep its owner/cache.
    // It only receives the same fixed rg executable and --version.
    if (file !== getRipgrepConfig287().command || args.at(-1) !== '--version') throw new Error('Unexpected confined ripgrep probe')
    const wrapped = await sandbox().wrapFixedFileIoCommand287(quote(['exec', scope.executable, ...args]), [scope.executable], options?.abortSignal ?? scope.context.signal)
    try {
      assertConfinedFileToolContext287(scope.context)
      scope.context.policy.preflightCwd(getCwd())
      return await original('/bin/sh', ['-c', `exec ${wrapped}`], {...options, useCwd: false, cwd: getCwd(), env: environment(), extendEnv: false})
    }
    finally {sandbox().SandboxManager.cleanupAfterCommand()}
  }
  return (file: string, args: string[], options: ExecFileOptions & SpawnOptions, callback?: (...args: any[]) => void): ChildProcess => {
    const scope = prepared.getStore()
    if (!scope) return original(file, args, options, ...(callback ? [callback] : []))
    let released = false
    const release = () => {if (!released) {released = true; sandbox().SandboxManager.cleanupAfterCommand()}}
    try {
      assertConfinedFileToolContext287(scope.context)
      scope.context.policy.preflightCwd(options.cwd?.toString() ?? getCwd())
      options.signal?.throwIfAborted()
      const wrapped = scope.commands.get(key(file, args))
      if (!wrapped) throw new Error('Ripgrep process was not prepared under the fixed workspace policy')
      const child = original('/bin/sh', ['-c', `exec ${wrapped}`], {
        ...options, env: environment(), shell: false,
      }, ...(callback ? [callback] : [])) as ChildProcess
      child.once('close', release)
      child.once('error', release)
      return child
    } catch (error) {release(); throw error}
  }
}
