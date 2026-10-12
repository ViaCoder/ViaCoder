/**
 * Minimal module for firing macOS keychain reads in parallel with main.tsx
 * module evaluation, same pattern as startMdmRawRead() in settings/mdm/rawRead.ts.
 *
 * isRemoteManagedSettingsEligible() reads two separate keychain entries
 * SEQUENTIALLY via sync execSync during applySafeConfigEnvironmentVariables():
 *   1. "Claude Code-credentials" (OAuth tokens)  — ~32ms
 *   2. "Claude Code" (legacy API key)            — ~33ms
 * Sequential cost: ~65ms on every macOS startup.
 *
 * Firing both here lets the subprocesses run in parallel with the ~65ms of
 * main.tsx imports. ensureKeychainPrefetchCompleted() is awaited alongside
 * ensureMdmSettingsLoaded() in main.tsx preAction — nearly free since the
 * subprocesses finish during import evaluation. Sync read() and
 * getApiKeyFromConfigOrMacOSKeychain() then hit their caches.
 *
 * Imports stay minimal: child_process + macOsKeychainHelpers.ts (NOT
 * macOsKeychainStorage.ts — that pulls in execa → human-signals →
 * cross-spawn, ~58ms of synchronous module init). The helpers file's own
 * import chain (envUtils, oauth constants, crypto) is already evaluated by
 * startupProfiler.ts at main.tsx:5, so no new module-init cost lands here.
 */

import { execFile } from 'child_process'
import { isBareMode } from '../envUtils.js'
import {
  CREDENTIALS_SERVICE_SUFFIX,
  getMacOsKeychainStorageServiceName,
  getUsername,
  keychainCacheState,
  primeKeychainCacheFromPrefetch,
} from './macOsKeychainHelpers.js'

const KEYCHAIN_PREFETCH_TIMEOUT_MS = 10_000

// Shared with auth.ts getApiKeyFromConfigOrMacOSKeychain() so it can skip its
// sync spawn when the prefetch already landed. Distinguishing "not started" (null)
// from "completed with no key" ({ stdout: null }) lets the sync reader only
// trust a completed prefetch.
let legacyApiKeyPrefetch: { stdout: string | null } | null = null

let prefetchPromise: Promise<void> | null = null

type SpawnResult = { stdout: string | null } | null

function spawnSecurity(serviceName: string): Promise<SpawnResult> {
  return new Promise(resolve => {
    try {
      execFile(
        'security',
        ['find-generic-password', '-a', getUsername(), '-w', '-s', serviceName],
        {
          encoding: 'utf-8',
          timeout: KEYCHAIN_PREFETCH_TIMEOUT_MS,
          windowsHide: true,
        },
        (err, stdout) => {
          // Match the native prefetch policy: timeout leaves the cache alone,
          // while a completed read error is a known empty result. A synchronous
          // spawn failure (for example OS policy EPERM) is handled below and
          // also leaves the cache alone so the normal sync path can retry.
          // biome-ignore lint/nursery/noFloatingPromises: resolve() is not a floating promise
          resolve(
            err && 'killed' in err && err.killed
              ? null
              : { stdout: err ? null : stdout?.trim() || null },
          )
        },
      )
    } catch {
      // execFile can throw before it registers the callback (sandbox/OS denial,
      // invalid executable, etc.). Native startup treats that as a skipped
      // prefetch, not a fatal startup error; preserve the sync fallback.
      resolve(null)
    }
  })
}

/**
 * Fire both keychain reads in parallel. Called at main.tsx top-level
 * immediately after startMdmRawRead(). Non-darwin is a no-op.
 */
export function startKeychainPrefetch(): void {
  if (process.platform !== 'darwin' || prefetchPromise || isBareMode()) return

  // Fire both subprocesses immediately (non-blocking). They run in parallel
  // with each other AND with main.tsx imports. The await in Promise.all
  // happens later via ensureKeychainPrefetchCompleted().
  const generation = keychainCacheState.generation
  const oauthSpawn = spawnSecurity(
    getMacOsKeychainStorageServiceName(CREDENTIALS_SERVICE_SUFFIX),
  )
  const legacySpawn = spawnSecurity(getMacOsKeychainStorageServiceName())

  prefetchPromise = Promise.all([oauthSpawn, legacySpawn]).then(
    ([oauth, legacy]) => {
      // A skipped/denied/timed-out spawn must not shadow the regular reader's
      // retry. A completed read with no item is a known empty result and is
      // safely cached, matching the native client.
      if (oauth) primeKeychainCacheFromPrefetch(oauth.stdout, generation)
      if (legacy) legacyApiKeyPrefetch = { stdout: legacy.stdout }
    },
  )
}

/**
 * Await prefetch completion. Called in main.tsx preAction alongside
 * ensureMdmSettingsLoaded() — nearly free since subprocesses finish during
 * the ~65ms of main.tsx imports. Resolves immediately on non-darwin.
 */
export async function ensureKeychainPrefetchCompleted(): Promise<void> {
  if (prefetchPromise) await prefetchPromise
}

/**
 * Consumed by getApiKeyFromConfigOrMacOSKeychain() in auth.ts before it
 * falls through to sync execSync. Returns null if prefetch hasn't completed.
 */
export function getLegacyApiKeyPrefetchResult(): {
  stdout: string | null
} | null {
  return legacyApiKeyPrefetch
}

/**
 * Clear prefetch result. Called alongside getApiKeyFromConfigOrMacOSKeychain
 * cache invalidation so a stale prefetch doesn't shadow a fresh write.
 */
export function clearLegacyApiKeyPrefetch(): void {
  legacyApiKeyPrefetch = null
}
