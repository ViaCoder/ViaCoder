import * as os from 'node:os'
import * as fsSync from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { lstat, readFile, readlink, realpath, rmdir, unlink } from 'node:fs/promises'
import { z } from 'zod'
import { logEvent } from '../services/analytics/index.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../services/analytics/growthbook.js'
import { logForDebugging } from './debug.js'
import { errorMessage, getErrnoCode } from './errors.js'
import { execFileNoThrow } from './execFileNoThrow.js'
import { getFsImplementation } from './fsOperations.js'
import * as lockfile from './lockfile.js'
import { logError } from './log.js'
import { createOAuthReleaseHandler, createOAuthSchemaLazy, createOAuthLeaseErrorFilter } from './officialOAuthLease/runtime.js'
import {createOAuthRefreshLease287} from './officialOAuthRefresh287/lease.js'
import { createOAuthPlatformProbes, selectOAuthNativePlatform } from './officialOAuthPlatform/runtime.js'
import { getPlatform } from './platform.js'
import { getSecureStorageExecutionHost } from './secureStorage/macOsKeychainHelpers.js'
import { secureAtomicPublisher } from './secureStorage/officialRuntime.js'
import { jsonParse, jsonStringify } from './slowOperations.js'

// Use declarations from this exact OS/architecture package, not Darwin probes
// with platform labels changed. Bun FFI retains its native loader/CIM fallback.
export const oauthProcessProbes = createOAuthPlatformProbes(
  selectOAuthNativePlatform(process.platform, process.arch), {
    platform: getPlatform, host: () => ({host: getSecureStorageExecutionHost()}),
    exec: (file, args, options) => execFileNoThrow(file, args, options),
    errno: getErrnoCode, fs: () => ({...getFsImplementation(), readlink}),
    path, os, fsSync, fsPromises, requireModule: createRequire(import.meta.url),
    debug: logForDebugging,
  },
)
export const oauthPidIdentity = oauthProcessProbes.identity
export const sharedOAuthLease = createOAuthRefreshLease287({
  C: z.number, Dn: secureAtomicPublisher.write, Dt: createOAuthLeaseErrorFilter(),
  EC: join, F: lstat, Gxe: oauthPidIdentity.space, J: jsonParse,
  Qi: (file, options) => lockfile.lock(file, options), Rf: join, S: jsonStringify,
  SC: unlink, Tb: oauthProcessProbes.ownStart, U: readFile,
  Xm: oauthProcessProbes.gone, d: logError, f: createOAuthSchemaLazy().lazy, gr: lstat,
  i: logEvent, l: errorMessage, mht: oauthProcessProbes.trustedPidView,
  o: z.string, pC: rmdir, pH: realpath, process,
  qUe: oauthProcessProbes.zombie, rk: oauthPidIdentity.domain, t: logForDebugging,
  u: z.object, v: getErrnoCode,
  vs: cell => cell.of(getSecureStorageExecutionHost()),
  wE: oauthProcessProbes.sameStart, zxe: oauthProcessProbes.validPid,
})
sharedOAuthLease.featureReader.register(getFeatureValue_CACHED_MAY_BE_STALE)

export const releaseOAuthLease = createOAuthReleaseHandler({i: logEvent, t: logForDebugging})
