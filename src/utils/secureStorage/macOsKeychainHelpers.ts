/**
 * Lightweight helpers shared between keychainPrefetch.ts and
 * macOsKeychainStorage.ts.
 *
 * This module MUST NOT import execa, execFileNoThrow, or
 * execFileNoThrowPortable. keychainPrefetch.ts fires at the very top of
 * main.tsx (before the ~65ms of module evaluation it parallelizes), and Bun's
 * __esm wrapper evaluates the ENTIRE module when any symbol is accessed —
 * so a heavy transitive import here defeats the prefetch. The execa →
 * human-signals → cross-spawn chain alone is ~58ms of synchronous init.
 *
 * The imports below (envUtils, oauth constants, crypto, os) are already
 * evaluated by startupProfiler.ts at main.tsx:5, so they add no module-init
 * cost when keychainPrefetch.ts pulls this file in.
 */

import { createHash } from 'crypto'
import { homedir, userInfo } from 'os'
import { join } from 'path'
import { getOauthConfig } from 'src/constants/oauth.js'
import { getClaudeConfigHomeDir } from '../envUtils.js'
import { createSecureStorageState } from '../officialSecureStorage/runtime.js'

// Resolve the existing canonical execution host only at a credential operation.
// No process-local fallback host or second credential state is created.
export function getSecureStorageExecutionHost():object {
 return (require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')).getExecutionSession287().host
}
const state = createSecureStorageState({
  cn: getOauthConfig,
  i: createHash,
  j: () => ({ host:getSecureStorageExecutionHost() }),
  l: userInfo,
  o: homedir,
  process,
  u: join,
  we: getClaudeConfigHomeDir,
})

export const CREDENTIALS_SERVICE_SUFFIX = state.serviceSuffix
export const KEYCHAIN_CACHE_TTL_MS = state.ttl
export const KEYCHAIN_FAILURE_CACHE_TTL_MS = state.failureTtl
export const getMacOsKeychainStorageServiceName = state.serviceName
export const getUsername = state.username
export const getKeychainCacheState287 = state.state
// Retain the old property ABI without eagerly loading execution during early
// keychain-prefetch module imports. This facade stores no credential fields.
export const keychainCacheState = new Proxy({} as ReturnType<typeof state.state>, {
 get:(_target,key)=>Reflect.get(state.state(),key),
 set:(_target,key,value)=>Reflect.set(state.state(),key,value),
 ownKeys:()=>Reflect.ownKeys(state.state()),
 getOwnPropertyDescriptor:(_target,key)=>Object.getOwnPropertyDescriptor(state.state(),key),
})
export const clearKeychainCache = state.invalidate
export const expireKeychainCache = state.expire
export const setKeychainHoldsItem = state.holdsItem

export function primeKeychainCacheFromPrefetch(
  stdout: string | null,
  generation = keychainCacheState.generation,
): void {
  state.prime(stdout, generation)
}
