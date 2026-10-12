import { lstat, mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import lockfile from 'proper-lockfile'
import { getSessionId } from '../../bootstrap/state.js'
import { registerCleanup } from '../cleanupRegistry.js'
import { getClaudeConfigHomeDir } from '../envUtils.js'

type Lock = {sessionId: string; pid: number; acquiredAt: number}
export type AcquireResult = {kind: 'acquired'; fresh: boolean} | {kind: 'blocked'; by: string}
export type CheckResult = {kind: 'free'} | {kind: 'held_by_self'} | {kind: 'blocked'; by: string}
let unregisterCleanup: (() => void) | undefined
let localOwner: Lock | undefined, activeThisTurn = false
let queue: Promise<unknown> = Promise.resolve()

// Official chunk-eby0bzvf:cXt/blo/wlo. Turn activity != process ownership.
export function isComputerUseActiveThisTurn() { return activeThisTurn }
export function markComputerUseActiveThisTurn() {
  if (activeThisTurn) return false
  activeThisTurn = true
  return true
}
export function clearComputerUseActiveThisTurn() { activeThisTurn = false }
export function isLockHeldLocally() { return unregisterCleanup !== undefined }
const lockPath = () => join(getClaudeConfigHomeDir(), 'computer-use.lock')
const same = (a: Lock, b: Lock) => a.pid === b.pid && a.sessionId === b.sessionId && a.acquiredAt === b.acquiredAt
const self = (lock: Lock) => localOwner ? same(lock, localOwner) : lock.pid === process.pid && lock.sessionId === getSessionId()
function alive(pid: number) {
  try { process.kill(pid, 0); return true }
  catch (e) { return (e as NodeJS.ErrnoException).code !== 'ESRCH' }
}
async function read(): Promise<Lock | undefined> {
  try {
    const s = await lstat(lockPath())
    if (!s.isFile() || s.isSymbolicLink()) throw Error('Computer use lock is not a regular file')
    const value = JSON.parse(await readFile(lockPath(), 'utf8'))
    if (!value || typeof value.sessionId !== 'string' || !Number.isInteger(value.pid) || value.pid <= 0 ||
        typeof value.acquiredAt !== 'number') throw Error('Malformed computer use lock')
    return value
  } catch (e) { if ((e as NodeJS.ErrnoException).code === 'ENOENT') return; throw e }
}
/** Guard all local check/recover/create/release sequences. Keep the official
 * computer-use.lock shape and O_EXCL so published CLI peers still see ownership.
 * Unlike upstream's old corrupt-file recovery, malformed/symlink locks fail
 * closed; they are not evidence of a dead owner. StorageV5 is not implemented.
 */
function guarded<T>(operation: () => Promise<T>): Promise<T> {
  const work = queue.then(async () => {
    const directory = getClaudeConfigHomeDir()
    await mkdir(directory, {recursive: true})
    const release = await lockfile.lock(directory, {realpath: false,
      lockfilePath: join(directory, 'computer-use-host.guard'),
      retries: {retries: 100, minTimeout: 10, maxTimeout: 50}, stale: 30000,
    })
    try { return await operation() } finally { await release() }
  })
  queue = work.catch(() => {})
  return work
}
export function checkComputerUseLock(): Promise<CheckResult> {
  return guarded(async () => {
    const existing = await read()
    if (!existing) return {kind: 'free'}
    if (self(existing)) return {kind: 'held_by_self'}
    if (alive(existing.pid)) return {kind: 'blocked', by: existing.sessionId}
    await unlink(lockPath())
    return {kind: 'free'}
  })
}
export function tryAcquireComputerUseLock(): Promise<AcquireResult> {
  return guarded(async () => {
    const existing = await read()
    if (existing && self(existing)) return {kind: 'acquired', fresh: false}
    if (existing && alive(existing.pid)) return {kind: 'blocked', by: existing.sessionId}
    if (existing) await unlink(lockPath())
    const owner = {sessionId: getSessionId(), pid: process.pid, acquiredAt: Date.now()}
    try { await writeFile(lockPath(), JSON.stringify(owner), {flag: 'wx', mode: 0o600}) }
    catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'EEXIST') return {kind: 'blocked', by: (await read())?.sessionId ?? 'unknown'}
      throw e
    }
    localOwner = owner
    unregisterCleanup?.()
    unregisterCleanup = registerCleanup(async () => { await releaseComputerUseLock() })
    return {kind: 'acquired', fresh: true}
  })
}
export function releaseComputerUseLock(): Promise<boolean> {
  return guarded(async () => {
    const owner = localOwner
    unregisterCleanup?.(); unregisterCleanup = undefined
    localOwner = undefined; activeThisTurn = false
    const existing = await read()
    // Session rotation is allowed; ownership replacement is not.
    if (!existing || !owner || !same(existing, owner)) return false
    await unlink(lockPath())
    return true
  })
}
