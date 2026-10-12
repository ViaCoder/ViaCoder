import { createHash } from 'node:crypto'
import { getOauthTokenFromFd } from '../bootstrap/state.js'
import { shouldUseClaudeAIAuth } from '../services/oauth/client.js'
import { logEvent, type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../services/analytics/index.js'
import { filesCredentialSlots } from '../vendor/official-files-api/slots.js'
import { getClaudeAIOAuthTokens } from './auth.js'
import { authEnvironment } from './authEnvironment.js'
import { clearBetasCaches } from './betas.js'
import { logForDebugging } from './debug.js'
import { isBareMode } from './envUtils.js'
import { errorMessage } from './errors.js'
import { createOAuthCredentialState, createOAuthErrorCodes, createOAuthErrorMetadata, createOAuthPersistence } from './officialOAuthPersistence/runtime.js'
import { getSecureStorage } from './secureStorage/index.js'
import { clearKeychainCache, getSecureStorageExecutionHost } from './secureStorage/macOsKeychainHelpers.js'
import { secureStorageCore } from './secureStorage/officialRuntime.js'
import { isStorageV5PinnedOn } from './secureStorage/storageV5.js'
import { sleep } from './sleep.js'
import { clearToolSchemaCache } from './toolSchemaCache.js'

// Original persistence and CAS declarations run against the actual selected
// async backend, not a separate refresh snapshot. The wider refresh/host engine
// remains a separate migration gate; this binding owns one execution process.
export const oauthCredentialState = createOAuthCredentialState()
export const oauthKnownDeadRefreshTokens = new Set<string>()
const codes = createOAuthErrorCodes()
export const oauthErrorMetadata = createOAuthErrorMetadata({
  IP: codes.constructor, P7r: codes.frame, Sn: codes.brand, co: codes.code, e: createHash,
})
export const sharedOAuthPersistence = createOAuthPersistence({
  F: isStorageV5PinnedOn,
  GG: () => filesCredentialSlots.oauthTokenFromBgSnapshot(),
  Jde: oauthCredentialState.state,
  Pf: () => {
    // Clear the same original credential cell and retain the local tool-schema
    // optimization; no separate legacy reader cache is maintained.
    getClaudeAIOAuthTokens.cache?.clear?.()
    clearBetasCaches()
    oauthCredentialState.configurationChanged.of(getSecureStorageExecutionHost()).emit()
    clearToolSchemaCache()
  },
  Sn: codes.brand, USe: secureStorageCore.clearCopy, Vd: oauthErrorMetadata, Z: sleep,
  _: codes.brand, a: authEnvironment, bi: oauthKnownDeadRefreshTokens,
  bj: getOauthTokenFromFd, h1: shouldUseClaudeAIAuth,
  i: (event, details) => logEvent(event, details as Record<string, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS | boolean>),
  j: () => ({ host: getSecureStorageExecutionHost() }), l: errorMessage,
  pP: clearKeychainCache, r9: isBareMode, t: logForDebugging,
  vpe: account => filesCredentialSlots.stampAuthenticatedAccount(account),
  zn: () => getSecureStorage(),
})
