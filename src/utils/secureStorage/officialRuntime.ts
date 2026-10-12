import { AsyncLocalStorage } from 'node:async_hooks'
import { constants } from 'node:fs'
import { chmod, lstat, open, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import { basename, join } from 'node:path'
import { createSecureAtomicPublisher, createSecureStorageCore } from '../officialSecureStorage/runtime.js'
import { errorMessage, getErrnoCode } from '../errors.js'
import { getFsImplementation } from '../fsOperations.js'
import { lock } from '../lockfile.js'
import { jsonParse, jsonStringify } from '../slowOperations.js'
import { logForDebugging } from '../debug.js'
import { getSecureStorageExecutionHost } from './macOsKeychainHelpers.js'
import { getSecureStorageConfigHomeDir } from './storageDirectory.js'
import { isStorageV5PinnedOn } from './storageV5.js'
import { logEvent, type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'

export const secureAtomicPublisher = createSecureAtomicPublisher({
  Fe: basename, I: lstat, L: open,
  Pe: stat, Z: ms => new Promise(resolve => setTimeout(resolve, ms)),
  a: constants, be: randomBytes, ie: rename, oe: writeFile, process,
  v: getErrnoCode, ve: join, x: unlink,
})

export const secureStorageCore = createSecureStorageCore({
  Dn: secureAtomicPublisher.write, F: isStorageV5PinnedOn, J: jsonParse,
  Qi: lock, S: jsonStringify, Z: join, ae: getFsImplementation,
  j: () => ({ host: getSecureStorageExecutionHost() }), l: errorMessage,
  m: (feature_name, error_code) => logEvent('tengu_feature_bad', { feature_name: feature_name as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS, error_code: error_code as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS }),
  ne: join,
  p: (feature_name, error_code) => logEvent('tengu_feature_sad', { feature_name: feature_name as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS, error_code: error_code as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS }),
  re: chmod, t: logForDebugging, v: getErrnoCode,
  y: feature_name => logEvent('tengu_feature_ok', { feature_name: feature_name as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS }),
  z: AsyncLocalStorage, zS: getSecureStorageConfigHomeDir,
})
