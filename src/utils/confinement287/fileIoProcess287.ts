import {spawn, type ChildProcessWithoutNullStreams} from 'node:child_process'
import {realpathSync} from 'node:fs'
import {createInterface} from 'node:readline'
import {fileURLToPath} from 'node:url'
import {quote} from 'shell-quote'
import {requireExecutionWorkspaceConfinement287} from '../../services/context/execution287.js'
import {getCwd} from '../cwd.js'
import {getClaudeTempDir} from '../permissions/filesystem.js'
import {SandboxManager, wrapFixedFileIoCommand287} from '../sandbox/sandbox-adapter.js'
import type {FileIoError287, FileIoReply287, FileIoRequest287, FileIoText287, FileIoStat287, FileIoIdentityStat287, FileIoRange287} from './fileIoProtocol287.js'
import {normalizeFileIoPrivateAlias287} from './fileIoProtocol287.js'

/** Private tool-call I/O only: one transient process owns its actual directory
 * handle until close. No copied project, background service or session/cache.
 * Integration must supply the canonical original error constructor reviver.
 */
export interface ConfinedFileIo287 {
  readonly canonicalPath: string
  readExisting(maxBytes?: number): Promise<FileIoText287 | null>
  readBytes(maxBytes?: number): Promise<Buffer>
  readChunk(offset: number): Promise<Buffer>
  readAt(offset: number, length: number): Promise<Buffer>
  identityStat(path?: string): Promise<FileIoIdentityStat287>
  realpath(path: string): Promise<string>
  readlink(path: string): Promise<string>
  stat(): Promise<FileIoStat287>
  readRange(offset?: number, limit?: number, maxBytes?: number, options?: {maxSelectedBytes?: number; truncateOnByteLimit?: boolean}): Promise<FileIoRange287>
  mtime(): Promise<number>
  recheckBeforeWrite(): Promise<void>
  write(content: string, encoding: BufferEncoding, lineEndings: 'LF' | 'CRLF'): Promise<number>
  close(): Promise<void>
}

// Exact executable source leaves, not an authority to read their directories.
// Source-distribution installation keeps these files immutable per build.
function runtimeFiles287(): string[] {
  return [
    './fileIoProcessEntry287.ts', './fileIoRuntime.bunfig.toml', './fileIoProtocol287.ts',
    './processPrivilege287.ts', './confinementError287.ts',
    '../officialBoundFileIo287/native.js',
    '../officialFilesystemPaths287/native.js', '../officialReadFileRange287/native.js',
    '../officialAtomicWriter287/platform.ts',
    '../officialAtomicWriter287/native.js',
    ...['darwin-x64', 'linux-arm64', 'linux-x64', 'win32-arm64', 'win32-x64']
      .map(platform => `../officialAtomicWriter287/${platform}/native.js`),
  ].map(path => realpathSync.native(fileURLToPath(new URL(path, import.meta.url))))
}

export async function openConfinedFileIo287(
  input: {path: string; approvedPaths: string[]; createParents?: boolean; leaf?: 'replace'; readOnly?: boolean; checkedIdentity?: {dev: string; ino: string}},
  signal: AbortSignal,
  reviveError: (error: FileIoError287) => Error,
): Promise<ConfinedFileIo287> {
  const policy = requireExecutionWorkspaceConfinement287()
  const cwd = policy.preflightCwd(realpathSync.native(getCwd())).canonicalCandidate
  const normalized = {...input, path: normalizeFileIoPrivateAlias287(input.path),
    approvedPaths: input.approvedPaths.map(normalizeFileIoPrivateAlias287)}
  policy.preflightPath(normalized.path, input.readOnly ? 'read' : 'write', cwd)
  signal.throwIfAborted()
  // There is no currently accepted Windows kernel backend in this product.
  // Do not route it through an unconfined host subprocess.
  if (process.platform !== 'darwin' && process.platform !== 'linux') {
    throw new Error('Required file-I/O sandbox has no supported platform backend')
  }
  const files = runtimeFiles287()
  const entry = files[0]!
  const wrapped = await wrapFixedFileIoCommand287(quote(['exec', process.execPath, '--no-env-file', '--no-macros', `--config=${files[1]!}`, entry]), files, signal)
  let child: ChildProcessWithoutNullStreams
  try {
    if (requireExecutionWorkspaceConfinement287() !== policy) throw new Error('File-I/O execution owner changed')
    signal.throwIfAborted()
    const temporary = getClaudeTempDir()
    child = spawn('/bin/sh', ['-c', `exec ${wrapped}`], {
      cwd, detached: true, stdio: ['pipe', 'pipe', 'pipe'],
      // No inherited OAuth/API keys, SSH agent, project env or preload options.
      env: {PATH: '/usr/bin:/bin', HOME: temporary, TMPDIR: temporary, NODE_ENV: 'production'},
    })
  } catch (error) {
    SandboxManager.cleanupAfterCommand()
    throw error
  }
  let pending: {resolve(value: unknown): void; reject(error: Error): void} | undefined
  let failure: Error | undefined
  let closing: Promise<void> | undefined
  const lines = createInterface({input: child.stdout})
  const stop = () => {
    if (!child.pid) return
    try {process.kill(-child.pid, 'SIGTERM')} catch (error) {
      if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ESRCH')) throw error
    }
  }
  const fail = (error: Error) => {
    failure ??= error
    const current = pending; pending = undefined
    current?.reject(error)
  }
  const abort = () => {
    fail(signal.reason instanceof Error ? signal.reason : new Error('File I/O cancelled'))
    stop()
  }
  // Error frames may include ordinary original errno/path messages, never the
  // request or stderr stream. Bootstrap stderr is deliberately not echoed.
  child.stderr.resume()
  child.stdin.on('error', fail)
  child.on('error', fail)
  const completion = new Promise<void>(resolve => {
    child.once('close', code => {
      signal.removeEventListener('abort', abort)
      lines.close()
      if (code !== 0 || pending) fail(new Error(`Confined file I/O exited (${code ?? 'signal'})`))
      SandboxManager.cleanupAfterCommand()
      resolve()
    })
  })
  lines.on('line', line => {
    const current = pending
    if (!current) {fail(new Error('Unexpected file-I/O response')); stop(); return}
    pending = undefined
    try {
      const reply = JSON.parse(line) as FileIoReply287
      if (reply.ok === true) current.resolve(reply.value)
      else current.reject(reviveError(reply.error))
    } catch {
      const error = new Error('Invalid file-I/O response')
      failure = error; current.reject(error); stop()
    }
  })
  signal.addEventListener('abort', abort, {once: true})
  if (signal.aborted) abort()
  function request(message: FileIoRequest287): Promise<unknown> {
    if (failure) return Promise.reject(failure)
    if (pending) return Promise.reject(new Error('Concurrent file-I/O operation on one handle'))
    policy.assertRootIdentity()
    signal.throwIfAborted()
    return new Promise((resolve, reject) => {
      pending = {resolve, reject}
      child.stdin.write(JSON.stringify(message) + '\n')
    })
  }
  const close = (): Promise<void> => closing ??= (async () => {
    try {
      if (!failure) await request({kind: 'close'})
    } finally {
      child.stdin.end()
      await completion
    }
  })()
  try {
    const opened = await request({kind: 'open', root: policy.root, ...normalized}) as {canonicalPath: string}
    policy.preflightPath(opened.canonicalPath, input.readOnly ? 'read' : 'write', cwd)
    return {
      canonicalPath: opened.canonicalPath,
      readExisting: async maxBytes => await request({kind: 'read', maxBytes}) as FileIoText287 | null,
      readBytes: async maxBytes => Buffer.from(await request({kind: 'readBytes', maxBytes}) as string, 'base64'),
      readChunk: async offset => Buffer.from(await request({kind: 'readChunk', offset}) as string, 'base64'),
      readAt: async (offset, length) => Buffer.from(await request({kind: 'readAt', offset, length}) as string, 'base64'),
      identityStat: async path => await request({kind: 'identityStat', path}) as FileIoIdentityStat287,
      realpath: async path => await request({kind: 'realpath', path}) as string,
      readlink: async path => await request({kind: 'readlink', path}) as string,
      stat: async () => await request({kind: 'stat'}) as FileIoStat287,
      readRange: async (offset, limit, maxBytes, options) => await request({kind: 'range', offset, limit, maxBytes, maxSelectedBytes: options?.maxSelectedBytes, truncateOnByteLimit: options?.truncateOnByteLimit}) as FileIoRange287,
      mtime: async () => await request({kind: 'mtime'}) as number,
      recheckBeforeWrite: async () => {await request({kind: 'recheck'})},
      write: async (content, encoding, lineEndings) => await request({kind: 'write', content, encoding, lineEndings}) as number,
      close,
    }
  } catch (error) {
    stop()
    await completion
    throw error
  }
}
