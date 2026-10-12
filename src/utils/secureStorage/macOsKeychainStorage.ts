import { execa } from 'execa'
import { createSecureKeychain } from '../officialSecureStorage/runtime.js'
import { logForDebugging } from '../debug.js'
import { execFileNoThrow } from '../execFileNoThrow.js'
import { execSyncWithDefaults_DEPRECATED } from '../execFileNoThrowPortable.js'
import { jsonParse, jsonStringify } from '../slowOperations.js'
import {
  CREDENTIALS_SERVICE_SUFFIX, clearKeychainCache,
  getMacOsKeychainStorageServiceName, getUsername,
  KEYCHAIN_CACHE_TTL_MS, KEYCHAIN_FAILURE_CACHE_TTL_MS,
  getKeychainCacheState287, setKeychainHoldsItem,
} from './macOsKeychainHelpers.js'
import { secureStorageCore } from './officialRuntime.js'

const keychain = createSecureKeychain({
  J: jsonParse, Mue: CREDENTIALS_SERVICE_SUFFIX,
  QN: getMacOsKeychainStorageServiceName, Rht: KEYCHAIN_CACHE_TTL_MS,
  S: jsonStringify, Tbe: execSyncWithDefaults_DEPRECATED,
  Wa: secureStorageCore.readFailed,
  _m: (command, args, options) => execa(command, args, {
    ...options, stdio: options.stdio as ['ignore' | 'pipe', 'ignore' | 'pipe', 'ignore' | 'pipe'],
  }),
  d: secureStorageCore.mutate, ok: getUsername, pP: clearKeychainCache,
  qe: (command, args, options) => execFileNoThrow(command, args, {
    timeout: options.timeout, useCwd: options.useCwd,
    preserveOutputOnError: options.preserveOutputOnError,
  }),
  t: logForDebugging, ujt: setKeychainHoldsItem,
  vVr: KEYCHAIN_FAILURE_CACHE_TTL_MS, yG: getKeychainCacheState287,
})

export const macOsKeychainStorage = keychain.storage
const noKeychainLock = Promise.resolve(false)
export function isMacOsKeychainLocked(): Promise<boolean> {
  return process.platform === 'darwin' ? keychain.isLocked() : noKeychainLock
}
