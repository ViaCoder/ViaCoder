import {remoteConsentRecords287} from './consentBindings287.js'
import {createConsentIdentity287} from './officialConsentIdentity287/native.js'
/**
 * Remote Managed Settings Service
 *
 * Manages fetching, caching, and validation of remote-managed settings
 * for enterprise customers. Uses checksum-based validation to minimize
 * network traffic and provides graceful degradation on failures.
 *
 * Eligibility:
 * - Console users (API key): All eligible
 * - OAuth/profile/host eligibility follows the pinned original f/KP gates
 * - API fails open (non-blocking) - if fetch fails, continues without remote settings
 * - API returns empty settings for users without managed settings
 */

import axios from 'axios'
import * as requestAsyncHooks from 'node:async_hooks'
import * as requestFs from 'node:fs/promises'
import {createRemoteRequest287} from './officialRequest287/native.js'
import {createRemoteSelector287} from './officialSelector287/native.js'
import {remoteProfileEligibility287} from './profileEligibilityBindings287.js'
import {nativeGatewayRefresh287,nativeGatewayTransport287,getNativeGatewayAuth287} from './gatewayBindings287.js'
import {createRemoteAuth287,type RemoteMetadata287} from './officialAuth287/native.js'
import {getGlobalConfig} from '../../utils/config.js'
import {getSecureStorage} from '../../utils/secureStorage/index.js'
import {getOAuthTokenFromFileDescriptor} from '../../utils/authFileDescriptor.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import cloneDeep from 'lodash-es/cloneDeep.js'
import omitBy from 'lodash-es/omitBy.js'
import * as policyNet from 'node:net'
import * as policyPath from 'node:path'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {createPolicyParser287} from '../../utils/settings/officialPolicyParser287/native.js'
import {createRemoteFetchError287} from './officialFetchError287/native.js'
import {createRemoteFetch287} from './officialFetch287/native.js'
import {getWifAttribution286} from '../../utils/httpWorkloadIdentity.js'
import {logEvent} from '../analytics/index.js'
import { createHash } from 'crypto'
import * as requestCrypto from 'node:crypto'
import { getOauthConfig } from '../../constants/oauth.js'
import {
  checkAndRefreshOAuthTokenOutcome,
  isAnthropicAuthEnabled,
  getAnthropicApiKeyWithSource,
  getClaudeAIOAuthTokens,
  handleOAuth401Error,
} from '../../utils/auth.js'
import { registerCleanup } from '../../utils/cleanupRegistry.js'
import { logForDebugging } from '../../utils/debug.js'
import { settingsChangeDetector } from '../../utils/settings/changeDetector.js'
import {
  type SettingsJson,
} from '../../utils/settings/types.js'
import { jsonStringify } from '../../utils/slowOperations.js'
import { getProxyUrl, shouldBypassProxy } from '../../utils/proxy.js'
import { getWebSocketTLSOptions } from '../../utils/mtls.js'

import {
  checkManagedSettingsSecurity,
  handleSecurityCheckResult,
  isManagedSettingsSecurityReviewPending,
} from './securityCheck.jsx'
import { isRemoteManagedSettingsEligible, resetSyncCache } from './syncCache.js'
import {
  getRemoteManagedSettingsSyncFromCache,
  getRawRemoteManagedSettingsCache,
  getRemoteManagedSettingsIneligibleReason,
  getRemoteManagedSettingsLoadStatus,
  getRemoteManagedSettingsRuntime287,
  setRemoteManagedSettingsLoadStatus,
  isRemoteManagedSettingsCacheVerified,
  getConsentedSettingsFromCache,
  getSettingsPath,
  setSessionCache,
} from './syncCacheState.js'
import {
  type RemoteManagedSettingsFetchResult,
} from './types.js'
import {
  gatewayConsentIdentity,
  gatewayIsAccepted,
  gatewaySettingsEndpoint,
  getGatewayTransportOptions,
  getInjectedGatewayAuth,
  type GatewayAuth,
} from './gateway.js'
import {
  shadowVerifySignedCache,
  signedCacheRoots,
  signatureHeaderValue,
  verifySignedCache,
} from './signedCache.js'
import {
  consentIdentityEquals,
  dangerousSettingsHash,
  type ConsentIdentity,
} from './consentState.js'
import {
  getRemoteManagedSettingsClientInjection,
} from './clientRuntime.js'
import { saveRemoteSettings287, clearRemoteSettings287, writeRemoteSignature287 } from './cachePersistence287.js'
import { createRemoteLoadReporter287 } from './officialOwner287/native.js'
import {isSettingsPrimerEnabled287} from '../../utils/settings/settingsCache.js'
import { resetSettingsCache } from '../../utils/settings/settingsCache.js'
import { extractDangerousSettings, matchesConsentHash } from '../../vendor/official-managed-consent/logic.js'

export {
  installRemoteManagedSettingsClientInjection,
  resetRemoteManagedSettingsClientInjection,
} from './clientRuntime.js'
export type { RemoteManagedSettingsClientInjection } from './clientRuntime.js'

const remotePolicyParser = createPolicyParser287({
  clone:cloneDeep,omitBy,environment:authEnvironment,debug:logForDebugging,
  builtins:{net:policyNet,path:policyPath},
})

// Complete source retry/backoff and UA helpers share one native workload cell.
// Gateway auth/refresh/transport use the existing shared native slot below.
export const remoteRequestRuntime287 = createRemoteRequest287({
  version:MACRO.VERSION,environment:authEnvironment,fetch:fetchRemoteManagedSettings,
  gateway:()=>getInjectedGatewayAuth(getRemoteManagedSettingsClientInjection().gateway) ?? getNativeGatewayAuth287(),
  payload:remotePolicyParser.payload,consent:()=>resolveConsentIdentity(),debug:logForDebugging,
  builtins:{'async_hooks':requestAsyncHooks,'fs/promises':requestFs},
})

// Original credential origin adjudication reads the existing shared reader and
// storage. Descriptor flags remain on the host's existing credential slots.
const remoteAuthRuntime287=createRemoteAuth287({
 environment:authEnvironment,tokens:()=>getClaudeAIOAuthTokens(),account:()=>getGlobalConfig().oauthAccount,
 storage:()=>getSecureStorage(),descriptor:getOAuthTokenFromFileDescriptor,
 backgroundDescriptor:()=>filesCredentialSlots.oauthTokenFromBgSnapshot(),authEnabled:()=>isAnthropicAuthEnabled(),
 profileAccount:()=>getWifAttribution286().XUe(),
})

function createNativeRemoteSelector287() {
  return createRemoteSelector287({
    environment:authEnvironment,storage:getSecureStorage,primerEnabled:isSettingsPrimerEnabled287,
    gatewayAuth:getNativeGatewayAuth287,
    profileEligible:remoteProfileEligibility287.remoteProfileEligible,
    profileRejected:()=>getWifAttribution286().H6o(),apiKey:options=>getAnthropicApiKeyWithSource(options),
    subscriber:remoteAuthRuntime287.subscriber,enterprise:remoteAuthRuntime287.enterprise,
    tokens:()=>getClaudeAIOAuthTokens(),oauthIdentity:remoteAuthRuntime287.oauthIdentity,
    profileIdentity:remoteAuthRuntime287.profileIdentity,debug:logForDebugging,
    oauthConfig:getOauthConfig,profileBaseURL:()=>getWifAttribution286().$Xe(),jsonParse:JSON.parse,
    importWif:()=>import('../../utils/httpWorkloadIdentity.js'),builtins:{crypto:requestCrypto},
  })
}

export const remoteConsentIdentity287=createConsentIdentity287({
 gatewayAuth:getNativeGatewayAuth287,
 gatewayPin:(gateway,credentials)=>createNativeRemoteSelector287().gatewayPin(gateway,credentials),
 gatewayIdentity:(gateway,fingerprint)=>createNativeRemoteSelector287().gatewayIdentity(gateway,fingerprint),
 profileEligible:remoteProfileEligibility287.remoteProfileEligible,
 profileIdentity:remoteAuthRuntime287.profileIdentity,oauthIdentity:remoteAuthRuntime287.oauthIdentity,
 storedAccount:()=>getGlobalConfig().oauthAccount,
 writeRecord:remoteConsentRecords287.record,
 selectApiKey:options=>getAnthropicApiKeyWithSource(options),debug:logForDebugging,
})

const remoteLoadReporter = createRemoteLoadReporter287({
  KP:isRemoteManagedSettingsEligible, aVt:getRemoteManagedSettingsIneligibleReason,
  pAn:setRemoteManagedSettingsLoadStatus, uI:getRemoteManagedSettingsLoadStatus,
  wb:isRemoteManagedSettingsCacheVerified, Ro:resetSettingsCache,
})

// Constants
const SETTINGS_TIMEOUT_MS = 10000 // 10 seconds for settings fetch
const POLLING_INTERVAL_MS = 60 * 60 * 1000 // 1 hour

// Background polling state
let pollingIntervalId: ReturnType<typeof setInterval> | null = null

// Promise that resolves when initial remote settings loading completes
// This allows other systems to wait for remote settings before initializing
let loadingCompletePromise: Promise<void> | null = null
let loadingCompleteResolve: (() => void) | null = null

// Timeout for the loading promise to prevent deadlocks if loadRemoteManagedSettings() is never called
// (e.g., in Agent SDK tests that don't go through main.tsx)
const LOADING_PROMISE_TIMEOUT_MS = 30000 // 30 seconds

// The official client keeps a second barrier for callers that need the first
// fetch attempt itself to settle, rather than merely waiting for a cached
// policy to become available. Keep the two signals separate: a valid cache may
// release the load barrier immediately while the conditional request remains
// in flight.
let fetchSettledPromise: Promise<void> | null = null
let fetchSettledResolve: (() => void) | null = null
let loadingBackstopId: ReturnType<typeof setTimeout> | null = null
let loadingBackstopReleased = false

// Login/logout may reset the cache while an older request is still in flight.
// Results from the older generation must not repopulate the new session.
let cacheGeneration = 0
let signedCacheShadowChecked = false

function isGatewayInjected(): boolean {
  return Boolean(getRemoteManagedSettingsClientInjection().gateway?.getAuth())
}

async function resolveConsentIdentity(
  candidate?: ConsentIdentity,
): Promise<ConsentIdentity | undefined> {
  if (candidate) return candidate
  const injection = getRemoteManagedSettingsClientInjection()
  if (!injection.consent && !injection.gateway) return remoteConsentIdentity287.liveIdentity()
  try {
    const live = await injection.consent?.resolveLiveIdentity?.()
    if (live) return live
  } catch (error) {
    logForDebugging(
      `Remote settings: consent identity unavailable - ${error instanceof Error ? error.message : 'unknown error'}`,
    )
  }
  return undefined
}

async function readConsentRecord(
  identity: ConsentIdentity | undefined,
): Promise<import('./consentState.js').ConsentRecord | null> {
  const consent = getRemoteManagedSettingsClientInjection().consent
  if (!identity || !consent) return null
  try {
    const record = await consent.read(identity)
    return record && consentIdentityEquals(record.identity, identity)
      ? record
      : null
  } catch (error) {
    logForDebugging(
      `Remote settings: consent record unavailable - ${error instanceof Error ? error.message : 'unknown error'}`,
    )
    return null
  }
}

async function recordConsent(
  identity: ConsentIdentity | undefined,
  settings: SettingsJson,
  isCurrent: () => boolean = () => true,
): Promise<void> {
  const consent = getRemoteManagedSettingsClientInjection().consent
  if (!identity) return
  if (!consent) {
    if (!getRemoteManagedSettingsClientInjection().gateway && isCurrent()) await remoteConsentIdentity287.record(identity,settings,
      getRemoteManagedSettingsClientInjection().storageV5)
    return
  }
  try {
    const liveIdentity = consent.resolveLiveIdentity
      ? await consent.resolveLiveIdentity()
      : identity
    if (!isCurrent() || !consentIdentityEquals(identity, liveIdentity)) {
      logForDebugging(
        'Remote settings: consent identity changed during fetch; not recording org consent',
      )
      return
    }
    await consent.write({
      identity,
      dangerousSettingsHash: dangerousSettingsHash(settings),
      recordedAt: getRemoteManagedSettingsClientInjection().now?.() ?? Date.now(),
    })
  } catch (error) {
    logForDebugging(
      `Remote settings: consent record write failed - ${error instanceof Error ? error.message : 'unknown error'}`,
    )
  }
}

async function acceptInjectedSignedResponse(
  settings: SettingsJson,
  signature: string | undefined,
  identity: ConsentIdentity | undefined,
): Promise<boolean> {
  // Public managed settings retain their historical unsigned behavior. Once
  // a gateway host is injected, a response carrying settings must prove its
  // signed-cache envelope with host-injected roots; a missing signature is
  // never promoted to an accepted cache entry.
  const runtime = getRemoteManagedSettingsClientInjection()
  if (!runtime.gateway?.getAuth()) return true
  if (!signature || !identity) return false
  const result = verifySignedCache({
    kind: 'managed-settings',
    jws: signature,
    orgUuid: identity.organizationUuid,
    accountUuid: identity.accountUuid,
    workspaceUuid: identity.workspaceUuid,
    bodySha: computeChecksumFromSettings(settings),
    roots: signedCacheRoots(runtime.signedCache),
  })
  if (result.result !== 'valid') {
    logForDebugging(
      `Remote settings: injected gateway response rejected by signed-cache verifier (${result.result})`,
    )
    return false
  }
  return true
}

function clearLoadingBackstop(): void {
  if (loadingBackstopId !== null) {
    clearTimeout(loadingBackstopId)
    loadingBackstopId = null
  }
}

function releaseLoadBarrier(): void {
  loadingCompleteResolve?.()
  loadingCompleteResolve = null
}

function releaseAllBarriers(): void {
  clearLoadingBackstop()
  releaseLoadBarrier()
  fetchSettledResolve?.()
  fetchSettledResolve = null
}

function createLoadingBarriers(): void {
  if (loadingCompletePromise || fetchSettledPromise) return

  loadingBackstopReleased = false
  loadingCompletePromise = new Promise(resolve => {
    loadingCompleteResolve = resolve
  })
  fetchSettledPromise = new Promise(resolve => {
    fetchSettledResolve = resolve
  })

  const expectedFetchResolve = fetchSettledResolve
  loadingBackstopId = setTimeout(() => {
    // A cache reset can replace the active barrier. An old timer must never
    // release a newer login/session's barrier.
    if (fetchSettledResolve !== expectedFetchResolve) return
    if (isManagedSettingsSecurityReviewPending()) {
      logForDebugging(
        'Remote settings: Loading promise timeout deferred — consent dialog pending',
      )
      loadingBackstopId = null
      return
    }
    logForDebugging(
      'Remote settings: Loading promise timed out, resolving anyway (load and fetch barriers)',
    )
    loadingBackstopReleased = true
    releaseAllBarriers()
  }, LOADING_PROMISE_TIMEOUT_MS)
  loadingBackstopId.unref?.()
}

/**
 * Initialize the loading promise for remote managed settings
 * This should be called early (e.g., in init.ts) to allow other systems
 * to await remote settings loading even if loadRemoteManagedSettings()
 * hasn't been called yet.
 *
 * Only creates the promise if the user is eligible for remote settings.
 * Includes a timeout to prevent deadlocks if loadRemoteManagedSettings() is never called.
 */
export function initializeRemoteManagedSettingsLoadingPromise(): void {
  if (isRemoteManagedSettingsEligible()) createLoadingBarriers()
}

/**
 * Get the remote settings API endpoint
 * Uses the OAuth config base API URL
 */
function getRemoteManagedSettingsEndpoint(gateway?: GatewayAuth) {
  return gateway
    ? gatewaySettingsEndpoint(gateway)
    : `${getOauthConfig().BASE_API_URL}/api/claude_code/settings`
}

/**
 * Recursively sort all keys in an object to match Python's json.dumps(sort_keys=True)
 */
function sortKeysDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortKeysDeep)
  }
  if (obj !== null && typeof obj === 'object') {
    const sorted: Record<string, unknown> = {}
    for (const key of Object.keys(obj).sort()) {
      sorted[key] = sortKeysDeep((obj as Record<string, unknown>)[key])
    }
    return sorted
  }
  return obj
}

/**
 * Compute checksum from settings content for HTTP caching
 * Must match server's Python: json.dumps(settings, sort_keys=True, separators=(",", ":"))
 * Exported for testing to verify compatibility with server-side implementation
 */
export function computeChecksumFromSettings(settings: SettingsJson): string {
  const sorted = sortKeysDeep(settings)
  // No spaces after separators to match Python's separators=(",", ":")
  const normalized = jsonStringify(sorted)
  const hash = createHash('sha256').update(normalized).digest('hex')
  return `sha256:${hash}`
}

/**
 * Check if the current user is eligible for remote managed settings
 * This is the public API for other systems to check eligibility
 * Used to determine if they should wait for remote settings to load
 */
export function isEligibleForRemoteManagedSettings(): boolean {
  return isRemoteManagedSettingsEligible()
}

/**
 * Wait for the initial remote settings loading to complete
 * Returns immediately if:
 * - User is not eligible for remote settings
 * - Loading has already completed
 * - Loading was never started
 */
export async function waitForRemoteManagedSettingsToLoad(): Promise<void> {
  if (loadingCompletePromise) {
    await loadingCompletePromise
  }
}

/** Wait until the initial network fetch settles, even when cache released the load barrier. */
export async function waitForRemoteManagedSettingsFetchToSettle(): Promise<void> {
  if (fetchSettledPromise) await fetchSettledPromise
}

/** Exposed for startup diagnostics and deterministic offline verification. */
export function wasRemoteManagedSettingsLoadingBackstopReleased(): boolean {
  return loadingBackstopReleased
}

type RemoteSettingsAuthType = 'api_key' | 'oauth' | 'profile' | 'gateway' | 'gateway_jwt' | 'none'

type RemoteSettingsAuth = {
  headers: Record<string, string>
  authType: RemoteSettingsAuthType
  accessToken?: string
  profileBearer?: boolean
  gateway?: GatewayAuth
  pinnedFingerprint?:string
  consentIdentity?: ConsentIdentity
  credentialOrigin?: string
  error?: string
  retryable?: boolean
}

/**
 * Get auth headers for remote settings without calling getSettings()
 * This avoids circular dependencies during settings loading
 * Supports both API key and OAuth authentication
 */
async function getRemoteSettingsAuthHeaders(credentials?:CredentialStore): Promise<RemoteSettingsAuth> {
  const gatewayInjection = getRemoteManagedSettingsClientInjection().gateway
  const injectedGateway = getInjectedGatewayAuth(gatewayInjection)
  if (injectedGateway) {
    if (!gatewayIsAccepted(injectedGateway)) {
      return {
        headers: {},
        authType: 'gateway',
        error: 'Gateway host verdict was not accepted',
      }
    }
    if (!injectedGateway.jwt) {
      return {
        headers: {},
        authType: 'gateway',
        error: 'Gateway JWT was not injected',
      }
    }
    const pinnedFingerprint =
      gatewayInjection?.getPinnedFingerprint?.(
        injectedGateway,
        gatewaySettingsEndpoint(injectedGateway),
      ) ?? injectedGateway.pinnedFingerprint
    const hostVerdict = injectedGateway.hostVerdict
    const gateway = {
      ...injectedGateway,
      pinnedFingerprint,
      hostVerdict,
    }
    return {
      headers: { Authorization: `Bearer ${gateway.jwt}` },
      authType: 'gateway',
      accessToken: gateway.jwt,
      gateway,
      consentIdentity: gatewayConsentIdentity(gateway, pinnedFingerprint),
    }
  }

  // The existing injected gateway above retains its local transport contract.
  // The default host uses the shared native slot; the explicit local seam stays separate.

  return createNativeRemoteSelector287().authHeaders(credentials)
}

/**
 * Fetch remote settings with retry logic and exponential backoff
 * Uses existing codebase retry utilities for consistency
 */
async function fetchWithRetry(
  cachedChecksum?: string,
  background = false,
): Promise<RemoteManagedSettingsFetchResult> {
  return remoteRequestRuntime287.retry(cachedChecksum,{background})
}

/**
 * Fetch the full remote settings (single attempt, no retries)
 * Optionally pass a cached checksum for ETag-based caching
 */
async function fetchInjectedGatewaySettingsC(
  cachedChecksum?: string,
  forcedRefreshAttempt = false,
  credentials?:CredentialStore,
): Promise<RemoteManagedSettingsFetchResult> {
  let usedAccessToken: string | undefined
  let usedAuthType: RemoteSettingsAuthType = 'none'
  let usedProfileBearer = false
  let usedConsentIdentity: ConsentIdentity | undefined
  let requestMetadata:RemoteMetadata287={}
  try {
    const gatewayConfigured = Boolean(
      getRemoteManagedSettingsClientInjection().gateway?.getAuth(),
    )
    // Public OAuth uses the existing original outcome engine. The injected
    // gateway's separate refresh owner is not replaced with a fake callback.
    const refreshOutcome=gatewayConfigured?undefined:await checkAndRefreshOAuthTokenOutcome({credentials})
    if (!gatewayConfigured) await nativeGatewayRefresh287.refreshGateway(credentials)
    const authHeaders = await getRemoteSettingsAuthHeaders(credentials)
    requestMetadata=remoteAuthRuntime287.metadata(authHeaders,refreshOutcome)
    if (authHeaders.error) {
      // Auth errors should not be retried - return a special flag to skip retries
      return {
        success: false,
        error:
          authHeaders.authType === 'profile'
            ? authHeaders.error
            : `Authentication required for remote settings`,
        errorKind: authHeaders.authType === 'profile' ? 'profile_credential_error' : 'no_auth_available',
        ...requestMetadata,
        skipRetry: authHeaders.authType === 'gateway' || !authHeaders.retryable,
      }
    }
    usedAccessToken = authHeaders.accessToken
    usedAuthType = authHeaders.authType
    usedProfileBearer = Boolean(authHeaders.profileBearer)
    usedConsentIdentity = authHeaders.consentIdentity

    const endpoint = authHeaders.gateway
      ? getRemoteManagedSettingsEndpoint(authHeaders.gateway)
      : nativeGatewayRefresh287.settingsEndpoint()
    const headers: Record<string, string> = {
      ...authHeaders.headers,
      'User-Agent': remoteRequestRuntime287.userAgent(),
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    }

    // Add If-None-Match header for ETag-based caching
    if (cachedChecksum) {
      headers['If-None-Match'] = `"${cachedChecksum}"`
    }

    const nativeVerdict=getNativeGatewayAuth287()?.hostVerdict
    const nativeAgent=authHeaders.gateway?undefined:nativeGatewayTransport287.spe(authHeaders.pinnedFingerprint,endpoint) ??
      (nativeVerdict && 'verified' in nativeVerdict && nativeVerdict.verified && !('vouched' in nativeVerdict)
        ? nativeGatewayTransport287.hbn(endpoint,nativeVerdict.network) : undefined)
    const gatewayTransport = authHeaders.gateway
      ? getGatewayTransportOptions(authHeaders.gateway, endpoint, {
          proxyConfigured: getProxyUrl() !== undefined,
          proxyBypassed: shouldBypassProxy(endpoint),
          tls: getWebSocketTLSOptions(),
        })
      : undefined

    const response = await axios.get(endpoint, {
      headers,
      timeout: SETTINGS_TIMEOUT_MS,
      ...((gatewayTransport?.httpsAgent ?? nativeAgent)
        ? { httpsAgent: gatewayTransport?.httpsAgent ?? nativeAgent }
        : {}),
      // Allow 204, 304, and 404 responses without treating them as errors.
      // 204/404 are returned when no settings exist for the user or the feature flag is off.
      validateStatus: status =>
        status === 200 || status === 204 || status === 304 || status === 404,
    })

    // A 304 only validates a cache when this request actually supplied its
    // validator. Treat an unconditional 304 as a terminal protocol error
    // rather than silently replacing an unknown cache with empty settings.
    if (response.status === 304 && !cachedChecksum) {
      logForDebugging('Remote settings: 304 to an unconditional request')
      return {
        success: false,
        error: 'Unexpected 304 Not Modified',
        errorKind: 'unknown_error', httpStatus: 304,
        skipRetry: true,
        ...requestMetadata,
      }
    }

    // Handle 304 Not Modified - cached version is still valid
    if (response.status === 304) {
      logForDebugging('Remote settings: Using cached settings (304)')
      return {
        success: true,
        settings: null, // Signal that cache is valid
        checksum: cachedChecksum,
        signature: signatureHeaderValue(
          response.headers as unknown as Record<string, unknown>,
        ),
        consentIdentity: authHeaders.consentIdentity,
        ...requestMetadata,
      }
    }

    // Handle 204 No Content / 404 Not Found - no settings exist or feature flag is off.
    // Return empty object (not null) so callers don't fall back to cached settings.
    if (response.status === 204 || response.status === 404) {
      logForDebugging(`Remote settings: No settings found (${response.status})`)
      return {
        success: true,
        settings: {},
        checksum: undefined,
        consentIdentity: authHeaders.consentIdentity,
        ...requestMetadata,
      }
    }

    const parsed = remotePolicyParser.responseSchema().safeParse(
      response.data,
    )
    if (parsed.success === false) {
      logForDebugging(
        `Remote settings: Invalid response format - ${parsed.error.message}`,
      )
      return {
        success: false,
        error: 'Invalid remote settings format',
        errorKind: 'parse_error',
        skipRetry: true,
        ...requestMetadata,
      }
    }

    const payload = remotePolicyParser.payload(parsed.data.settings, 'remote managed settings')
    if ('ruledEmpty' in payload) return {...payload.ruledEmpty,...requestMetadata}

    logForDebugging('Remote settings: Fetched successfully')
    return {
      success: true,
      settings: payload.settings,
      salvagedSettings: payload.salvagedSettings,
      checksum: parsed.data.checksum,
      uuid: parsed.data.uuid,
      signature: signatureHeaderValue(
        response.headers as unknown as Record<string, unknown>,
      ),
      consentIdentity: authHeaders.consentIdentity,
      ...requestMetadata,
    }
  } catch (error) {
    // The original catch owns error decisions and changed-token recovery. These
    // ports connect it to the existing OAuth/WIF owners; no second cache exists.
    const handle = createRemoteFetchError287({
      t: logForDebugging, i: logEvent,
      o5o: value => getWifAttribution286().O6o(value),
      nS: async (token, credentials, storage, options) => {
        if (usedAuthType === 'gateway') {
          return (await getRemoteSettingsAuthHeaders(credentials)).accessToken !== token
        }
        return handleOAuth401Error(token, credentials, storage, options)
      },
      fn: () => usedAuthType === 'gateway'
        ? (() => {const gateway=getInjectedGatewayAuth(getRemoteManagedSettingsClientInjection().gateway);return gateway ? {accessToken:gateway.jwt} : null})()
        : getClaudeAIOAuthTokens(),
      importWif: () => import('../../utils/httpWorkloadIdentity.js'),
    })
    return handle(error, {
      checksum: cachedChecksum, forcedRefreshAttempt, credentials,
      accessToken: usedAccessToken, profileBearer: usedProfileBearer,
      consentIdentity: usedConsentIdentity, metadata: requestMetadata,
      retry: fetchRemoteManagedSettings,
    })
  }
}
async function fetchRemoteManagedSettings(
  cachedChecksum?: string,
  forcedRefreshAttempt = false,
  credentials?:CredentialStore,
): Promise<RemoteManagedSettingsFetchResult> {
  // Only the existing explicit injected Gateway keeps its accepted local C
  // transport/rotation boundary. Default native requests execute whole we.
  if (getRemoteManagedSettingsClientInjection().gateway) {
    return fetchInjectedGatewaySettingsC(cachedChecksum, forcedRefreshAttempt, credentials)
  }
  return nativeRemoteFetch287(cachedChecksum, forcedRefreshAttempt, credentials)
}
const nativeRemoteFetch287 = createRemoteFetch287({
  t: logForDebugging, m8: checkAndRefreshOAuthTokenOutcome,
  vj: nativeGatewayRefresh287.refreshGateway,
  Ye: credentials => createNativeRemoteSelector287().authHeaders(credentials),
  qe: nativeGatewayRefresh287.settingsEndpoint,
  f$: remoteRequestRuntime287.isDesktop, We: remoteRequestRuntime287.gatewayUserAgent,
  Mo: remoteRequestRuntime287.codeUserAgent, uo: getNativeGatewayAuth287,
  spe: nativeGatewayTransport287.spe, hbn: nativeGatewayTransport287.hbn, St: axios,
  ue: remotePolicyParser.responseSchema, fe: remotePolicyParser.payload,
  nS: handleOAuth401Error,
  fn: () => getClaudeAIOAuthTokens(), i: logEvent,
  o5o: value => getWifAttribution286().O6o(value),
  importWif: () => import('../../utils/httpWorkloadIdentity.js'),
})

/**
 * Save remote settings to file
 * Stores raw settings JSON (checksum is computed on-demand when needed)
 */
async function saveSettings(
  settings: SettingsJson,
  signature?: string,
  path = getSettingsPath(),
  signedCache = getRemoteManagedSettingsClientInjection().signedCache,
  storageV5 = getRemoteManagedSettingsClientInjection().storageV5,
): Promise<void> {
  await saveRemoteSettings287(settings,signature,path,signedCache,storageV5)
}

/**
 * Clear all remote settings (session, persistent, and stop polling)
 */
export async function clearRemoteManagedSettingsCache(storageV5?: ReturnType<typeof getRemoteManagedSettingsClientInjection>['storageV5']): Promise<void> {
  const runtime=getRemoteManagedSettingsClientInjection()
  await clearRemoteSettings287(getSettingsPath(),runtime.signedCache,storageV5===undefined?runtime.storageV5:storageV5,{
    stopPolling:stopBackgroundPolling,
    resetRemote:()=>{
      // Supersede in-flight fetches on this same owner before native I/O.
      cacheGeneration += 1
      signedCacheShadowChecked = false
      resetSyncCache()
    },
    resetSettings:resetSettingsCache,
    detachBarrier:()=>()=>{
      releaseAllBarriers()
      loadingCompletePromise = null
      fetchSettledPromise = null
      loadingBackstopReleased = false
    },
  })
}

/**
 * Fetch and load remote settings with file caching
 * Internal function that handles the full load/fetch logic
 * Fails open - returns null if fetch fails and no cache exists
 */
async function fetchAndLoadRemoteManagedSettings(
  background = false,
): Promise<SettingsJson | null> {
  if (!isRemoteManagedSettingsEligible()) {
    return null
  }

  if (getRemoteManagedSettingsRuntime287().snapshotEnabled()) {
    logForDebugging('Remote settings: confined evaluation child — serving the harness-written policy snapshot, no fetch')
    const settings = getRemoteManagedSettingsSyncFromCache()
    remoteLoadReporter.settle({settings,fetchSucceeded:true})
    return settings
  }

  const fetchGeneration = cacheGeneration
  const cachePath = getSettingsPath()
  const runtime = getRemoteManagedSettingsClientInjection()
  const customCacheFlow = Boolean(runtime.consent || runtime.gateway || runtime.signedCache || runtime.now)
  const nativeEpochAtStart = getRemoteManagedSettingsRuntime287().resetEpoch()
  const gatewayAtStart = getInjectedGatewayAuth(runtime.gateway)
  const isCurrent = () => {
    if ((!customCacheFlow && getRemoteManagedSettingsRuntime287().resetEpoch() !== nativeEpochAtStart) ||
      cacheGeneration !== fetchGeneration || getSettingsPath() !== cachePath ||
      getRemoteManagedSettingsClientInjection() !== runtime) return false
    try {
      const gateway = getInjectedGatewayAuth(runtime.gateway)
      return gatewayAtStart
        ? Boolean(gateway && gateway.url === gatewayAtStart.url &&
          gateway.gatewayIdentity === gatewayAtStart.gatewayIdentity && gatewayIsAccepted(gateway))
        : !gateway
    } catch { return false }
  }

  // Load cached settings from file. Gateway caches are held out of the
  // active session until their signed sidecar is verified.
  let cachedSettings = getRawRemoteManagedSettingsCache()
  const gatewayInjected = isGatewayInjected()
  if (gatewayInjected && cachedSettings) {
    setSessionCache(null)
    const cachedIdentity = await resolveConsentIdentity()
    const cachedVerification = await shadowVerifySignedCache({
      kind: 'managed-settings',
      cachePath,
      orgUuid: cachedIdentity?.organizationUuid,
      accountUuid: cachedIdentity?.accountUuid,
      workspaceUuid: cachedIdentity?.workspaceUuid,
      bodySha: computeChecksumFromSettings(cachedSettings),
      roots: signedCacheRoots(
        getRemoteManagedSettingsClientInjection().signedCache,
      ),
      injection: getRemoteManagedSettingsClientInjection().signedCache,
    })
    if (!isCurrent()) return null
    if (cachedVerification.result === 'valid') {
      setSessionCache(cachedSettings)
    } else {
      logForDebugging(
        `Remote settings: injected gateway cache withheld (${cachedVerification.result})`,
      )
      cachedSettings = null
    }
  }

  // Compute checksum locally from cached settings for HTTP caching validation
  const cachedChecksum = cachedSettings
    ? computeChecksumFromSettings(cachedSettings)
    : undefined

  if (cachedSettings && !signedCacheShadowChecked) {
    signedCacheShadowChecked = true
    void resolveConsentIdentity()
      .then(cachedIdentity => isCurrent() ?
        shadowVerifySignedCache({
          kind: 'managed-settings',
          cachePath,
          orgUuid: cachedIdentity?.organizationUuid,
          accountUuid: cachedIdentity?.accountUuid,
          workspaceUuid: cachedIdentity?.workspaceUuid,
          bodySha: cachedChecksum ?? '',
          roots: signedCacheRoots(
            getRemoteManagedSettingsClientInjection().signedCache,
          ),
          injection: getRemoteManagedSettingsClientInjection().signedCache,
        }) : undefined,
      )
      .catch(error => {
        logForDebugging(
          `Remote settings: signed-cache shadow verification failed - ${error instanceof Error ? error.message : 'unknown error'}`,
        )
      })
  }

  try {
    // Fetch settings from API with retry logic
    const result = await fetchWithRetry(cachedChecksum, background)

    if (!isCurrent()) {
      logForDebugging(
        'Remote settings: Cache was reset during this fetch; discarding its result',
      )
      return null
    }

    if (!result.success) {
      // On fetch failure, use stale file if available (graceful degradation)
      if (cachedSettings) {
        logForDebugging(
          'Remote settings: Using stale cache after fetch failure',
        )
        setSessionCache(cachedSettings)
      }
      remoteLoadReporter.settle({settings:cachedSettings,fetchSucceeded:false,failure:result.errorKind === 'ruled_empty'
        ? {errorKind:'ruled_empty',message:result.error ?? 'ruled empty',rulings:result.rulings ?? []}
        : remoteLoadReporter.failure(result)})
      return cachedSettings
    }

    // The native 304 fast path requires the exact consented payload, not
    // merely a raw/verified cache. Keep the established injected-host branch.
    if (result.settings === null && cachedSettings &&
      (customCacheFlow || cachedSettings === getConsentedSettingsFromCache())) {
      logForDebugging('Remote settings: Cache still valid (304 Not Modified)')
      setSessionCache(cachedSettings,false,{verified:true})
      if (!getRemoteManagedSettingsRuntime287().diskWritesDisabled()) {
        await writeRemoteSignature287(
          cachePath,
          result.signature,
          getRemoteManagedSettingsClientInjection().signedCache,
        )
        if (!customCacheFlow) {
          const reset = !isCurrent()
          await getRemoteManagedSettingsRuntime287().signatureAfterReset(cachePath, reset)
          if (reset) return null
        }
      }
      if (isCurrent()) remoteLoadReporter.settle({settings:cachedSettings,fetchSucceeded:true})
      return cachedSettings
    }

    // Save new settings to file (only if non-empty)
    const newSettings = customCacheFlow
      ? result.settings || {}
      : result.settings ?? cachedSettings ?? {}
    const hasContent = Object.keys(newSettings).length > 0

    if (hasContent) {
      const consentIdentity = runtime.consent || runtime.gateway
        ? await resolveConsentIdentity(result.consentIdentity)
        : result.consentIdentity
      if (
        !(await acceptInjectedSignedResponse(
          newSettings,
          result.signature,
          consentIdentity,
        ))
      ) {
        logForDebugging(
          'Remote settings: injected gateway payload was not applied because its signed-cache proof was absent or invalid',
        )
        return cachedSettings
      }
      const consentRecord = await readConsentRecord(consentIdentity)
      const consentHash = runtime.consent || runtime.gateway ? consentRecord?.dangerousSettingsHash : consentIdentity
        ? await remoteConsentRecords287.getHash(consentIdentity,runtime.storageV5)
        : null
      if (!isCurrent()) return null
      // Check for dangerous settings changes before applying
      const securityResult =
        consentHash != null &&
        matchesConsentHash(consentHash, extractDangerousSettings(newSettings),
          typeof newSettings.claudeMd === 'string' ? newSettings.claudeMd : undefined)
          ? 'no_check_needed'
          : await checkManagedSettingsSecurity(getConsentedSettingsFromCache(), newSettings)
      if (!isCurrent()) {
        logForDebugging(
          'Remote settings: Cache was reset during security review; discarding its result',
        )
        return null
      }
      if (!handleSecurityCheckResult(securityResult)) {
        // User rejected - don't apply settings, return cached or null
        logForDebugging(
          'Remote settings: User rejected new settings, using cached settings',
        )
        remoteLoadReporter.settle({settings:cachedSettings,fetchSucceeded:true})
        return cachedSettings
      }

      setSessionCache(newSettings, securityResult !== 'deferred_non_interactive', {
        verified:true, consentDeferred:securityResult === 'deferred_non_interactive',
      })
      if (securityResult === 'deferred_non_interactive') {
        logForDebugging(
          'Remote settings: Applied for this non-interactive run; consent deferred — not persisting the disk cache as consented',
        )
      } else {
        await recordConsent(consentIdentity, newSettings, isCurrent)
        if (!isCurrent()) return null
        await saveSettings(
          result.salvagedSettings ?? newSettings,
          result.salvagedSettings === undefined && (customCacheFlow || result.settings !== null)
            ? result.signature : undefined,
          cachePath,runtime.signedCache,runtime.storageV5,
        )
        if (!isCurrent()) return null
        logForDebugging('Remote settings: Applied new settings successfully')
      }
      if (isCurrent()) remoteLoadReporter.settle({settings:newSettings,fetchSucceeded:true})
      return newSettings
    }

    // Empty settings (204/404 response) are persisted as an empty sentinel.
    // This matches the official cache semantics and gives the next request a
    // deterministic validator rather than reviving an older stale file.
    setSessionCache(newSettings, true, {verified:true})
    await recordConsent(runtime.consent || runtime.gateway ? await resolveConsentIdentity(result.consentIdentity) : result.consentIdentity, newSettings, isCurrent)
    if (!isCurrent()) return null
    await saveSettings({},result.signature,cachePath,runtime.signedCache,runtime.storageV5)
    if (isCurrent()) remoteLoadReporter.settle({settings:newSettings,fetchSucceeded:true})
    logForDebugging('Remote settings: Saved empty sentinel (204/404 response)')
    return newSettings
  } catch {
    if (!isCurrent()) return null
    // On any error, use stale file if available (graceful degradation)
    if (cachedSettings) {
      logForDebugging('Remote settings: Using stale cache after error')
      setSessionCache(cachedSettings)
    }
    remoteLoadReporter.settle({settings:cachedSettings,fetchSucceeded:false,failure:remoteLoadReporter.unexpected()})
    return cachedSettings
  }
}

/**
 * Load remote settings during CLI initialization
 * Fails open - if fetch fails, continues without remote settings
 * Also starts background polling to pick up settings changes mid-session
 *
 * This function sets up a promise that other systems can await via
 * waitForRemoteManagedSettingsToLoad() to ensure they don't initialize
 * until remote settings have been fetched.
 */
export async function loadRemoteManagedSettings(): Promise<void> {
  // Set up the promise for other systems to wait on
  // Only if the user is eligible for remote settings AND promise not already set up
  // (initializeRemoteManagedSettingsLoadingPromise may have been called earlier)
  if (isRemoteManagedSettingsEligible()) createLoadingBarriers()

  // Cache-first: if we have cached settings on disk, apply them and unblock
  // waiters immediately. The fetch still runs below; notifyChange fires once,
  // after the fetch, as before. Saves the ~77ms fetch-wait on print-mode startup.
  // getRemoteManagedSettingsSyncFromCache has the eligibility guard and populates
  // the session cache internally — no need to call setSessionCache here.
  const gatewayInjected = isGatewayInjected()
  if (
    !gatewayInjected &&
    getRemoteManagedSettingsSyncFromCache() &&
    loadingCompleteResolve
  ) {
    releaseLoadBarrier()
  }
  if (gatewayInjected) setSessionCache(null)

  try {
    const settings = await fetchAndLoadRemoteManagedSettings(false)

    // Start background polling to pick up settings changes mid-session
    if (isRemoteManagedSettingsEligible()) {
      startBackgroundPolling()
    }

    // Trigger hot-reload if settings were loaded (new or from cache).
    // notifyChange resets the settings cache internally before iterating
    // listeners — env vars, telemetry, and permissions update on next read.
    if (settings !== null) {
      settingsChangeDetector.notifyChange('policySettings')
    }
  } finally {
    // Always resolve both barriers, even if fetch failed (fail-open).
    releaseAllBarriers()
  }
}

/**
 * Refresh remote settings asynchronously (for auth state changes)
 * This is used when login/logout occurs
 * Fails open - if fetch fails, continues without remote settings
 */
export async function refreshRemoteManagedSettings(): Promise<void> {
  // Clear caches first
  await clearRemoteManagedSettingsCache()

  // If not enabled, notify that policy settings changed (to empty)
  if (!isRemoteManagedSettingsEligible()) {
    settingsChangeDetector.notifyChange('policySettings')
    return
  }

  // Try to load new settings (fails open if fetch fails)
  await fetchAndLoadRemoteManagedSettings(false)
  logForDebugging('Remote settings: Refreshed after auth change')

  // A login/logout refresh must restore the hourly poller cleared above.
  startBackgroundPolling()

  // Notify listeners. notifyChange resets the settings cache internally;
  // this triggers hot-reload (AppState update, env var application, etc.)
  settingsChangeDetector.notifyChange('policySettings')
}

/**
 * Background polling callback - fetches settings and triggers hot-reload if changed
 */
async function pollRemoteSettings(): Promise<void> {
  if (!isRemoteManagedSettingsEligible()) {
    return
  }

  // Get current cached settings for comparison
  const prevCache = getRemoteManagedSettingsSyncFromCache()
  const previousSettings = prevCache ? jsonStringify(prevCache) : null

  try {
    await fetchAndLoadRemoteManagedSettings(true)

    // Check if settings actually changed
    const newCache = getRemoteManagedSettingsSyncFromCache()
    const newSettings = newCache ? jsonStringify(newCache) : null
    if (newSettings !== previousSettings) {
      logForDebugging('Remote settings: Changed during background poll')
      settingsChangeDetector.notifyChange('policySettings')
    }
  } catch {
    // Don't fail closed for background polling - just continue
  }
}

/**
 * Start background polling for remote settings
 * Polls every hour to pick up settings changes mid-session
 */
export function startBackgroundPolling(): void {
  if (pollingIntervalId !== null) {
    return
  }

  if (!isRemoteManagedSettingsEligible()) {
    return
  }

  pollingIntervalId = setInterval(() => {
    void pollRemoteSettings()
  }, POLLING_INTERVAL_MS)
  pollingIntervalId.unref()

  // Register cleanup to stop polling on shutdown
  registerCleanup(async () => stopBackgroundPolling())
}

/**
 * Stop background polling for remote settings
 */
export function stopBackgroundPolling(): void {
  if (pollingIntervalId !== null) {
    clearInterval(pollingIntervalId)
    pollingIntervalId = null
  }
}
