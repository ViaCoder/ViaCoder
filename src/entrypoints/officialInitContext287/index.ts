import { constants } from 'node:fs'
import { lstat, mkdir, open } from 'node:fs/promises'
import { basename, dirname, isAbsolute, join, resolve } from 'node:path'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { populateOAuthAccountInfoIfNeeded } from '../../services/oauth/client.js'
import { authEnvironment } from '../../utils/authEnvironment.js'
import { logForDebugging } from '../../utils/debug.js'
import { getClaudeConfigHomeDir } from '../../utils/envUtils.js'
import { getErrnoCode } from '../../utils/errors.js'
import { getFsImplementation } from '../../utils/fsOperations.js'
import { logError } from '../../utils/log.js'
import { secureAtomicPublisher } from '../../utils/secureStorage/officialRuntime.js'
import { getSecureStorageConfigHomeDir } from '../../utils/secureStorage/storageDirectory.js'
import { isStorageV5PinnedOn, recordHoverRestDecision } from '../../utils/secureStorage/storageV5.js'
import { jsonStringify } from '../../utils/slowOperations.js'
import {
 createOfficialInitCallerContext287,
 createOfficialInitCredentials287,
 createOfficialInitStorageContext287,
} from './runtime.js'
export type { InitContextOptions287 } from './runtime.js'

// All business state stays in the existing pin/config/credential owners. These
// closures contain only original stateless helpers and a direct IO handle.
export const officialInitStorageContext287 = createOfficialInitStorageContext287({
 F: isStorageV5PinnedOn,
 // Raw F7n owns warning/order semantics; raw U7o only receives boolean identity.
 U7o: value => recordHoverRestDecision(value === true),
 t: (message, metadata) => logForDebugging(message, metadata),
 we: () => getClaudeConfigHomeDir(), a: authEnvironment,
 k: (name, fallback) => getFeatureValue_CACHED_MAY_BE_STALE(name, fallback),
 tResolve: resolve,
})
export const officialInitCredentials287 = createOfficialInitCredentials287({
 E: getErrnoCode, F: isStorageV5PinnedOn, _: jsonStringify,
 ae: getFsImplementation,
 Kse: (file, text, options) => secureAtomicPublisher.publish(file, text, options),
 yb: getSecureStorageConfigHomeDir, s: constants, b: lstat, h: mkdir, p: open,
 H: basename, L: dirname, D: isAbsolute, B: join,
})
export const officialInitCallerContext287 = createOfficialInitCallerContext287({
 jD: pin => officialInitStorageContext287.adopt(pin),
 bx: backend => officialInitCredentials287(backend),
 pqr: (credentials, storageV5) => populateOAuthAccountInfoIfNeeded(credentials, storageV5),
 d: error => logError(error),
})
