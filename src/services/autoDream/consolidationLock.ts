// Complete official 2.1.287 lock and session-scan declarations share the
// existing Memory path, transcript path and process-pinned StorageV5 decision.
import { mkdir, readFile, readdir, stat, unlink, utimes, writeFile } from 'node:fs/promises'
import { basename, dirname, join, sep } from 'node:path'
import { getOriginalCwd } from '../../bootstrap/state.js'
import { getAutoMemPath } from '../../memdir/paths.js'
import { logForDebugging } from '../../utils/debug.js'
import { errorMessage } from '../../utils/errors.js'
import { isProcessRunning } from '../../utils/genericProcessUtils.js'
import { getProjectDir, getProjectsDir } from '../../utils/sessionStorage.js'
import { validateUuid } from '../../utils/sessionStoragePortable.js'
import { isStorageV5PinnedOn } from '../../utils/secureStorage/storageV5.js'
import { createDreamLock287, type DreamLockStorage287 } from './officialDreamLock287/native.js'

let dreamLock287: ReturnType<typeof createDreamLock287>|undefined
function getDreamLock287() {
  return dreamLock287 ??= createDreamLock287({
  Ee:getOriginalCwd, F:isStorageV5PinnedOn, l:errorMessage, Xs:getAutoMemPath,
  t:logForDebugging, qh:getProjectDir, ga:isProcessRunning,
  P:mkdir, f:readFile, p:stat, v:unlink, D:utimes, k:writeFile, A:join,
  g:readdir, h:stat, ie:basename, u:dirname, Et:sep, Bd:getProjectsDir, iR:validateUuid,
  })
}

// The caller carries the injected object unchanged; no backend is created.
export function readLastConsolidatedAt(root?:string, storage?:unknown):Promise<number> {
  return getDreamLock287().read(root, storage as DreamLockStorage287|undefined)
}
export function tryAcquireConsolidationLock(storage?:unknown):Promise<number|null> {
  return getDreamLock287().acquire(storage as DreamLockStorage287|undefined)
}
export function rollbackConsolidationLock(priorMtime:number,storage?:unknown):Promise<void> {
  return getDreamLock287().rollback(priorMtime,storage as DreamLockStorage287|undefined)
}
export function listSessionsTouchedSince(sinceMs:number,storage?:unknown):Promise<string[]> {
  return getDreamLock287().listSessions(sinceMs,storage as DreamLockStorage287|undefined)
}
export const isDreamStorageProjectKey287=(value:string):boolean=>getDreamLock287().validProjectKey(value)

/**
 * Stamp from manual /dream. Optimistic — fires at prompt-build time,
 * no post-skill completion hook. Best-effort.
 */
export async function recordConsolidation(): Promise<void> {
  try {
    // Memory dir may not exist yet (manual /dream before any auto-trigger).
    await mkdir(getAutoMemPath(), { recursive: true })
    await writeFile(getDreamLock287().lockPath(getAutoMemPath()), String(process.pid))
  } catch (e: unknown) {
    logForDebugging(
      `[autoDream] recordConsolidation write failed: ${(e as Error).message}`,
    )
  }
}
