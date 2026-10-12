import chalk from 'chalk'
import { createHash } from 'node:crypto'
import { hasWorkloadIdentityConfiguration } from './workloadIdentity.js'
import {authEnvironment} from './authEnvironment.js'
import { sharedHttpAuth } from './sharedHttpAuth.js'
import { sharedApiKeySelection } from './sharedApiKeySelection.js'
import { sharedApiKeyHelper } from './sharedApiKeyHelper.js'
import { sharedOAuthPersistence,oauthCredentialState,oauthErrorMetadata } from './sharedOAuthPersistence.js'
import {getSharedOAuthReader} from './sharedOAuthReader.js'
import { getSharedOAuthEngine } from './sharedOAuthEngine.js'
import { getSharedOAuthRecovery } from './sharedOAuthRecovery.js'
import type {OAuth401Options} from './officialOAuthRecovery/runtime.js'
import type {OAuthRefreshOptions} from './officialOAuthEngine/runtime.js'
import type { CredentialStore, StorageWriteResult } from './officialSecureStorage/runtime.js'
import { exec } from 'child_process'
import { execa } from 'execa'
import {
  CLAUDE_AI_PROFILE_SCOPE,
} from 'src/constants/oauth.js'
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from 'src/services/analytics/index.js'
import { getAPIProvider } from 'src/utils/model/providers.js'
import {
  getIsNonInteractiveSession,
} from '../bootstrap/state.js'
import {
  getMockSubscriptionType,
  shouldUseMockSubscription,
} from '../services/mockRateLimits.js'
import {
  shouldUseClaudeAIAuth,
} from '../services/oauth/client.js'
import { getOauthProfileFromOauthToken } from '../services/oauth/getOauthProfile.js'
import type { OAuthTokens, SubscriptionType } from '../services/oauth/types.js'
import {
  getApiKeyFromFileDescriptor,
  getOAuthTokenFromFileDescriptor,
} from './authFileDescriptor.js'
import {
  maybeRemoveApiKeyFromMacOSKeychainThrows,
  normalizeApiKeyForConfig,
} from './authPortable.js'
import { AwsAuthStatusManager } from './awsAuthStatusManager.js'
import {
  type AccountInfo,
  checkHasTrustDialogAccepted,
  getGlobalConfig,
  saveGlobalConfig,
} from './config.js'
import { logAntError, logForDebugging } from './debug.js'
import {
  getClaudeConfigHomeDir,
  isBareMode,
  isEnvTruthy,
} from './envUtils.js'
import { errorMessage } from './errors.js'
import { execSyncWithDefaults_DEPRECATED } from './execFileNoThrow.js'
import { logError } from './log.js'
import {conditionalAuthRefreshState287,clearGcpAuthRefreshState287} from './conditionalAuthRefreshState287.js'
import { getSecureStorage } from './secureStorage/index.js'
import {
  clearLegacyApiKeyPrefetch,
  getLegacyApiKeyPrefetchResult,
} from './secureStorage/keychainPrefetch.js'
import {
  clearKeychainCache, getSecureStorageExecutionHost,
  getMacOsKeychainStorageServiceName,
  getUsername,
} from './secureStorage/macOsKeychainHelpers.js'
import {
  getSettings_DEPRECATED,
  getSettingsForSource,
} from './settings/settings.js'
import { sleep } from './sleep.js'
import {
  createApiKeySave_darwin_arm64_286,
  createApiKeySave_darwin_x64_286,
  createApiKeySave_linux_arm64_286,
  createApiKeySave_linux_x64_286,
  createApiKeySave_win32_arm64_286,
  createApiKeySave_win32_x64_286,
  createApiKeyCache_darwin_arm64_286,
  createApiKeyCache_darwin_x64_286,
  createApiKeyCache_linux_arm64_286,
  createApiKeyCache_linux_x64_286,
  createApiKeyCache_win32_arm64_286,
  createApiKeyCache_win32_x64_286,
  createApiKeyHashError286,
  createApiKeyKeychainErrorClass286,
  createApiKeyResponseListSanitizer286,
  createApiKeySanitizeError286,
} from './officialApiKeyCreate/runtime.js'
import { jsonParse } from './slowOperations.js'
import {
  createApiKeyRead_darwin_arm64_287,
  createApiKeyRead_darwin_x64_287,
  createApiKeyRead_linux_arm64_287,
  createApiKeyRead_linux_x64_287,
  createApiKeyRead_win32_arm64_287,
  createApiKeyRead_win32_x64_287,
} from './officialApiKeyRead287/native.js'

/**
 * CCR and Claude Desktop spawn the CLI with OAuth and should never fall back
 * to the user's ~/.claude/settings.json API-key config (apiKeyHelper,
 * env.ANTHROPIC_API_KEY, env.ANTHROPIC_AUTH_TOKEN). Those settings exist for
 * the user's terminal CLI, not managed sessions. Without this guard, a user
 * who runs `claude` in their terminal with an API key sees every CCD session
 * also use that key — and fail if it's stale/wrong-org.
 */
function isManagedOAuthContext(): boolean {
  return (
    isEnvTruthy(process.env.CLAUDE_CODE_REMOTE) ||
    process.env.CLAUDE_CODE_ENTRYPOINT === 'claude-desktop'
  )
}

/** Whether we are supporting direct 1P auth. */
// this code is closely related to getAuthTokenSource
export function isAnthropicAuthEnabled(): boolean {
  return sharedHttpAuth.authEnabled()
}

/** Where the auth token is being sourced from, if any. */
// this code is closely related to isAnthropicAuthEnabled
export function getAuthTokenSource() {
  // --bare: API-key-only. apiKeyHelper (from --settings) is the only
  // bearer-token-shaped source allowed. OAuth env vars, FD tokens, and
  // keychain are ignored.
  if (isBareMode()) {
    if (getConfiguredApiKeyHelper()) {
      return { source: 'apiKeyHelper' as const, hasToken: true }
    }
    return { source: 'none' as const, hasToken: false }
  }

  if (process.env.ANTHROPIC_AUTH_TOKEN && !isManagedOAuthContext()) {
    return { source: 'ANTHROPIC_AUTH_TOKEN' as const, hasToken: true }
  }

  if (process.env.CLAUDE_CODE_OAUTH_TOKEN) {
    return { source: 'CLAUDE_CODE_OAUTH_TOKEN' as const, hasToken: true }
  }

  // Check for OAuth token from file descriptor (or its CCR disk fallback)
  const oauthTokenFromFd = getOAuthTokenFromFileDescriptor()
  if (oauthTokenFromFd) {
    // getOAuthTokenFromFileDescriptor has a disk fallback for CCR subprocesses
    // that can't inherit the pipe FD. Distinguish by env var presence so the
    // org-mismatch message doesn't tell the user to unset a variable that
    // doesn't exist. Call sites fall through correctly — the new source is
    // !== 'none' (cli/handlers/auth.ts → oauth_token) and not in the
    // isEnvVarToken set (auth.ts:1844 → generic re-login message).
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR) {
      return {
        source: 'CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR' as const,
        hasToken: true,
      }
    }
    return {
      source: 'CCR_OAUTH_TOKEN_FILE' as const,
      hasToken: true,
    }
  }

  // Check if apiKeyHelper is configured without executing it
  // This prevents security issues where arbitrary code could execute before trust is established
  const apiKeyHelper = getConfiguredApiKeyHelper()
  if (apiKeyHelper && !isManagedOAuthContext()) {
    return { source: 'apiKeyHelper' as const, hasToken: true }
  }

  const oauthTokens = getClaudeAIOAuthTokens()
  if (shouldUseClaudeAIAuth(oauthTokens?.scopes) && oauthTokens?.accessToken) {
    return { source: 'claude.ai' as const, hasToken: true }
  }

  return { source: 'none' as const, hasToken: false }
}

export type ApiKeySource =
  | 'ANTHROPIC_API_KEY'
  | 'apiKeyHelper'
  | '/login managed key'
  | 'none'

export function getAnthropicApiKey(): null | string {
  const { key } = getAnthropicApiKeyWithSource()
  return key
}

export function hasAnthropicApiKeyAuth(): boolean {
  const { key, source } = getAnthropicApiKeyWithSource({
    skipRetrievingKeyFromApiKeyHelper: true,
  })
  return key !== null && source !== 'none'
}

export function getAnthropicApiKeyWithSource(
  opts: { skipRetrievingKeyFromApiKeyHelper?: boolean } = {},
): { key: string | null; source: ApiKeySource } {
  return sharedApiKeySelection.select(opts)
}

/**
 * Get the configured apiKeyHelper from settings.
 * In bare mode, only the --settings flag source is consulted — apiKeyHelper
 * from ~/.claude/settings.json or project settings is ignored.
 */
export function getConfiguredApiKeyHelper(): string | undefined {
  return sharedApiKeySelection.helper()
}

// Official 2.1.286 helper state machine. Credential-generation invalidation
// stays local because API clients also use it to invalidate credential snapshots.
let credentialCacheGeneration = 0

export function getCredentialCacheGeneration(): number {
  return credentialCacheGeneration
}

export function calculateApiKeyHelperTTL(): number {
  return sharedApiKeyHelper.ttl()
}

export function getApiKeyHelperElapsedMs(): number {
  return sharedApiKeyHelper.elapsed()
}

export function getApiKeyHelperPending(): Promise<string | null> | null {
  return sharedApiKeyHelper.pending()
}

export function getApiKeyHelperLastFailure(): string | null {
  return sharedApiKeyHelper.lastFailure()
}

export function getApiKeyFromApiKeyHelper(
  isNonInteractiveSession: boolean,
): Promise<string | null> {
  return sharedApiKeyHelper.fetch(isNonInteractiveSession)
}

export function getApiKeyFromApiKeyHelperCached(): string | null {
  return sharedApiKeyHelper.cached()
}

export function clearApiKeyHelperCache(): void {
  credentialCacheGeneration++
  sharedApiKeyHelper.clear()
}

export function prefetchApiKeyFromApiKeyHelperIfSafe(
  isNonInteractiveSession: boolean,
): void {
  if (sharedApiKeyHelper.canPrefetch()) {
    void getApiKeyFromApiKeyHelper(isNonInteractiveSession)
  }
}

/**
 * Get the configured gcpAuthRefresh from settings
 */
function getConfiguredGcpAuthRefresh(): string | undefined {
  const mergedSettings = getSettings_DEPRECATED() || {}
  return mergedSettings.gcpAuthRefresh
}

/**
 * Check if the configured gcpAuthRefresh comes from project settings
 */
export function isGcpAuthRefreshFromProjectSettings(): boolean {
  const gcpAuthRefresh = getConfiguredGcpAuthRefresh()
  if (!gcpAuthRefresh) {
    return false
  }

  const projectSettings = getSettingsForSource('projectSettings')
  const localSettings = getSettingsForSource('localSettings')
  return (
    projectSettings?.gcpAuthRefresh === gcpAuthRefresh ||
    localSettings?.gcpAuthRefresh === gcpAuthRefresh
  )
}

/** Short timeout for the GCP credentials probe. Without this, when no local
 *  credential source exists (no ADC file, no env var), google-auth-library falls
 *  through to the GCE metadata server which hangs ~12s outside GCP. */
const GCP_CREDENTIALS_CHECK_TIMEOUT_MS = 5_000

/**
 * Check if GCP credentials are currently valid by attempting to get an access token.
 * This uses the same authentication chain that the Vertex SDK uses.
 */
export async function checkGcpCredentialsValid(): Promise<boolean> {
  try {
    // Dynamically import to avoid loading google-auth-library unnecessarily
    const { GoogleAuth } = await import('google-auth-library')
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    })
    const probe = (async () => {
      const client = await auth.getClient()
      await client.getAccessToken()
    })()
    const timeout = sleep(GCP_CREDENTIALS_CHECK_TIMEOUT_MS).then(() => {
      throw new GcpCredentialsTimeoutError('GCP credentials check timed out')
    })
    await Promise.race([probe, timeout])
    return true
  } catch {
    return false
  }
}

/**
 * Run gcpAuthRefresh to perform interactive authentication (e.g., gcloud auth application-default login)
 * Streams output in real-time for user visibility
 */
export async function runGcpAuthRefresh(): Promise<boolean> {
  const gcpAuthRefresh = getConfiguredGcpAuthRefresh()

  if (!gcpAuthRefresh) {
    return false // Not configured, treat as success
  }

  // SECURITY: Check if gcpAuthRefresh is from project settings
  if (isGcpAuthRefreshFromProjectSettings()) {
    // Check if trust has been established for this project
    // Pass true to indicate this is a dangerous feature that requires trust
    const hasTrust = checkHasTrustDialogAccepted()
    if (!hasTrust && !getIsNonInteractiveSession()) {
      const error = new Error(
        `Security: gcpAuthRefresh executed before workspace trust is confirmed. If you see this message, post in ${MACRO.FEEDBACK_CHANNEL}.`,
      )
      logAntError('gcpAuthRefresh invoked before trust check', error)
      logEvent('tengu_gcpAuthRefresh_missing_trust', {})
      return false
    }
  }

  try {
    logForDebugging('Checking GCP credentials validity for auth refresh')
    const isValid = await checkGcpCredentialsValid()
    if (isValid) {
      logForDebugging(
        'GCP credentials are valid, skipping auth refresh command',
      )
      return false
    }
  } catch {
    // Credentials check failed, proceed with refresh
  }

  return refreshGcpAuth(gcpAuthRefresh)
}

// Timeout for GCP auth refresh command (3 minutes).
// Long enough for browser-based auth flows, short enough to prevent indefinite hangs.
const GCP_AUTH_REFRESH_TIMEOUT_MS = 3 * 60 * 1000

export function refreshGcpAuth(gcpAuthRefresh: string): Promise<boolean> {
  logForDebugging('Running GCP auth refresh command')
  // Start tracking authentication status. AwsAuthStatusManager is cloud-provider-agnostic
  // despite the name — print.ts emits its updates as generic SDK 'auth_status' messages.
  const authStatusManager = AwsAuthStatusManager.getInstance()
  authStatusManager.startAuthentication()

  return new Promise(resolve => {
    const refreshProc = exec(gcpAuthRefresh, {
      timeout: GCP_AUTH_REFRESH_TIMEOUT_MS,
    })
    refreshProc.stdout!.on('data', data => {
      const output = data.toString().trim()
      if (output) {
        // Add output to status manager for UI display
        authStatusManager.addOutput(output)
        // Also log for debugging
        logForDebugging(output, { level: 'debug' })
      }
    })

    refreshProc.stderr!.on('data', data => {
      const error = data.toString().trim()
      if (error) {
        authStatusManager.setError(error)
        logForDebugging(error, { level: 'error' })
      }
    })

    refreshProc.on('close', (code, signal) => {
      if (code === 0) {
        logForDebugging('GCP auth refresh completed successfully')
        authStatusManager.endAuthentication(true)
        void resolve(true)
      } else {
        const timedOut = signal === 'SIGTERM'
        const message = timedOut
          ? chalk.red(
              'GCP auth refresh timed out after 3 minutes. Run your auth command manually in a separate terminal.',
            )
          : chalk.red(
              'Error running gcpAuthRefresh (in settings or ~/.claude.json):',
            )
        // biome-ignore lint/suspicious/noConsole:: intentional console output
        console.error(message)
        authStatusManager.endAuthentication(false)
        void resolve(false)
      }
    })
  })
}

/**
 * Refresh GCP authentication if needed.
 * This function checks if credentials are valid and runs the refresh command if not.
 * Memoized with TTL to avoid excessive refresh attempts.
 */
export const refreshGcpCredentialsIfNeeded = Object.assign(
  () => conditionalAuthRefreshState287.mwn.of(getSecureStorageExecutionHost())(),
  {cache: {clear: clearGcpAuthRefreshState287}},
)

export function clearGcpCredentialsCache(): void {
  clearGcpAuthRefreshState287()
}

/**
 * Prefetches GCP credentials only if workspace trust has already been established.
 * This allows us to start the potentially slow GCP commands early for trusted workspaces
 * while maintaining security for untrusted ones.
 *
 * Returns void to prevent misuse - use refreshGcpCredentialsIfNeeded() to actually refresh.
 */
export function prefetchGcpCredentialsIfSafe(): void {
  // Check if gcpAuthRefresh is configured
  const gcpAuthRefresh = getConfiguredGcpAuthRefresh()

  if (!gcpAuthRefresh) {
    return
  }

  // Check if gcpAuthRefresh is from project settings
  if (isGcpAuthRefreshFromProjectSettings()) {
    // Only prefetch if trust has already been established
    const hasTrust = checkHasTrustDialogAccepted()
    if (!hasTrust && !getIsNonInteractiveSession()) {
      // Don't prefetch - wait for trust to be established first
      return
    }
  }

  // Safe to prefetch - either not from project settings or trust already established
  void refreshGcpCredentialsIfNeeded()
}

/** Legacy main.tsx entry retained until that owned branch is removed. */
export function prefetchAwsCredentialsAndBedRockInfoIfSafe(): void {
  // The protected main entry still calls this for selected Bedrock. Fail before
  // reading settings or spawning a credential command, even for direct callers.
  throw new Error('AWS Bedrock provider has been removed')
}

/** @private Use {@link getAnthropicApiKey} or {@link getAnthropicApiKeyWithSource} */
export const getApiKeyFromConfigOrMacOSKeychain = Object.assign(
  (): { key: string; source: ApiKeySource } | null => {
    const platform = `${process.platform}-${process.arch}`
    return apiKeyReadByPlatform.get(platform)?.() ?? null
  },
  { cache: { clear: clearNativeApiKeyReadCache } },
)

const clearApiKeySaveCaches = () => {
  getApiKeyFromConfigOrMacOSKeychain.cache.clear?.()
  clearLegacyApiKeyPrefetch()
}
const keychainErrorClass = createApiKeyKeychainErrorClass286({object:Object})
const sanitizeKeychainError = createApiKeySanitizeError286({object:Object})
const hashKeychainError = createApiKeyHashError286({e:createHash,Sn:(value:string)=>value,object:Object})
const sanitizeApiKeyResponseLists = createApiKeyResponseListSanitizer286({object:Object})
const apiKeySharedPorts = {
  an: hashKeychainError,
  c: <T>(value: T) => value,
  i: (name: string, metadata: Record<string, unknown>) =>
    logEvent(name, metadata as Record<string, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS | boolean | number | undefined>),
  j: () => ({ host: getSecureStorageExecutionHost() }),
  l: errorMessage,
  mi: sanitizeApiKeyResponseLists,
  t: (message: string, options?: { level: 'error' }) =>
    logForDebugging(message, options),
}
const apiKeyWritePortsByPlatform = {
  'darwin-arm64': {
    ...apiKeySharedPorts,
    PUe: sanitizeKeychainError, QN: getMacOsKeychainStorageServiceName,
    Te: saveGlobalConfig, _m: execa, bGo: keychainErrorClass,
    ok: getUsername, p7n: clearApiKeySaveCaches,
    q: createApiKeyCache_darwin_arm64_286({}),
    xC: async (command: string, options: { reject: false }) => {
      const result = await execa(command, { shell: true, reject: options.reject })
      return { exitCode: result.exitCode, stderr: result.stderr }
    },
  },
  'darwin-x64': {
    ...apiKeySharedPorts,
    HUe: sanitizeKeychainError, K: createApiKeyCache_darwin_x64_286({}),
    QN: getMacOsKeychainStorageServiceName, _m: execa,
    bGo: keychainErrorClass, ke: saveGlobalConfig, oT: getUsername,
    p7n: clearApiKeySaveCaches,
    xA: async (command: string, options: { reject: false }) => {
      const result = await execa(command, { shell: true, reject: options.reject })
      return { exitCode: result.exitCode, stderr: result.stderr }
    },
  },
  'linux-arm64': {
    ...apiKeySharedPorts,
    I7n: clearApiKeySaveCaches, J1e: getMacOsKeychainStorageServiceName,
    MY: getUsername, Nqo: keychainErrorClass, Re: saveGlobalConfig,
    THe: sanitizeKeychainError,
    q: createApiKeyCache_linux_arm64_286({}), rg: execa,
  },
  'linux-x64': {
    ...apiKeySharedPorts,
    Ae: saveGlobalConfig, DVo: keychainErrorClass,
    J1e: getMacOsKeychainStorageServiceName, MY: getUsername,
    O7n: clearApiKeySaveCaches, kBe: sanitizeKeychainError,
    V: createApiKeyCache_linux_x64_286({}), rg: execa,
  },
  'win32-arm64': {
    ...apiKeySharedPorts,
    Ce: saveGlobalConfig, G7: getMacOsKeychainStorageServiceName,
    IJn: clearApiKeySaveCaches, LGo: keychainErrorClass,
    THe: sanitizeKeychainError, XF: getUsername,
    q: createApiKeyCache_win32_arm64_286({}), ng: execa,
  },
  'win32-x64': {
    ...apiKeySharedPorts,
    Ce: saveGlobalConfig, G7: getMacOsKeychainStorageServiceName,
    IJn: clearApiKeySaveCaches, NGo: keychainErrorClass,
    TBe: sanitizeKeychainError, XH: getUsername,
    V: createApiKeyCache_win32_x64_286({}), ng: execa,
  },
}
const apiKeyReaderCommon = {
  U: () => ({ host: getSecureStorageExecutionHost() }),
  B: () => ({ host: getSecureStorageExecutionHost() }),
  f8: isBareMode,
  Xl: () => Boolean(authEnvironment.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST),
  le: getGlobalConfig,
}
const darwinArmApiKeyReader = createApiKeyRead_darwin_arm64_287({
  ...apiKeyReaderCommon,
  Jl: apiKeyReaderCommon.Xl,
  wtr: getLegacyApiKeyPrefetchResult,
  jF: getMacOsKeychainStorageServiceName,
  iEe: execSyncWithDefaults_DEPRECATED,
  Xk: getUsername,
  t: (message: string, options: { level: 'error' }) => logForDebugging(message, options),
  U: () => ({ host: getSecureStorageExecutionHost() }),
  f8: isBareMode,
})
const darwinX64ApiKeyReader = createApiKeyRead_darwin_x64_287({
  ...apiKeyReaderCommon,
  Jl: apiKeyReaderCommon.Xl,
  wtr: getLegacyApiKeyPrefetchResult,
  jF: getMacOsKeychainStorageServiceName,
  iEe: execSyncWithDefaults_DEPRECATED,
  XT: getUsername,
  t: (message: string, options: { level: 'error' }) => logForDebugging(message, options),
  U: () => ({ host: getSecureStorageExecutionHost() }),
  f8: isBareMode,
})
const apiKeyReadCells287 = new Map<string,(host:object)=>import('./officialApiKeyRead287/native.js').ApiKeyReadCell>([
  ['darwin-arm64',darwinArmApiKeyReader.cell],['darwin-x64',darwinX64ApiKeyReader.cell],
])
const apiKeyReadByPlatform = new Map<string, () => { key: string; source: ApiKeySource } | null>([
  ['darwin-arm64', darwinArmApiKeyReader.read],
  ['darwin-x64', darwinX64ApiKeyReader.read],
  ...(['linux-arm64','linux-x64','win32-arm64','win32-x64'] as const).map((platform) => {
    const create = {
      'linux-arm64': createApiKeyRead_linux_arm64_287,
      'linux-x64': createApiKeyRead_linux_x64_287,
      'win32-arm64': createApiKeyRead_win32_arm64_287,
      'win32-x64': createApiKeyRead_win32_x64_287,
    }[platform]
    const reader=create(apiKeyReaderCommon)
    apiKeyReadCells287.set(platform,reader.cell)
    return [platform, reader] as const
  }),
])
/** Existing selected-platform source cell on the current canonical host. */
export function getCanonicalApiKeyReadCell287(host:object=getSecureStorageExecutionHost()):import('./officialApiKeyRead287/native.js').ApiKeyReadCell {
  const platform=`${process.platform}-${process.arch}`,cell=apiKeyReadCells287.get(platform)
  if(!cell)throw new Error('No original API-key reader cell for platform '+platform)
  return cell(host)
}
function clearNativeApiKeyReadCache(): void {
  getCanonicalApiKeyReadCell287().clear()
}

const apiKeySaveByPlatform = new Map<string, (apiKey: string, storageV5?: unknown) => Promise<void>>([
  ['darwin-arm64', createApiKeySave_darwin_arm64_286(apiKeyWritePortsByPlatform['darwin-arm64'])],
  ['darwin-x64', createApiKeySave_darwin_x64_286(apiKeyWritePortsByPlatform['darwin-x64'])],
  ['linux-arm64', createApiKeySave_linux_arm64_286(apiKeyWritePortsByPlatform['linux-arm64'])],
  ['linux-x64', createApiKeySave_linux_x64_286(apiKeyWritePortsByPlatform['linux-x64'])],
  ['win32-arm64', createApiKeySave_win32_arm64_286(apiKeyWritePortsByPlatform['win32-arm64'])],
  ['win32-x64', createApiKeySave_win32_x64_286(apiKeyWritePortsByPlatform['win32-x64'])],
])

export async function saveApiKey(apiKey: string, storageV5?: unknown): Promise<void> {
  const platform = `${process.platform}-${process.arch}`
  const save = apiKeySaveByPlatform.get(platform)
  if (!save) throw new Error(`Unsupported API key save platform: ${platform}`)
  await save(apiKey, storageV5)
}

export function isCustomApiKeyApproved(apiKey: string): boolean {
  const config = getGlobalConfig()
  const normalizedKey = normalizeApiKeyForConfig(apiKey)
  return (
    config.customApiKeyResponses?.approved?.includes(normalizedKey) ?? false
  )
}

export async function removeApiKey(storageV5?: unknown): Promise<void> {
  await maybeRemoveApiKeyFromMacOSKeychain()

  // Also remove from config instead of returning early, for older clients
  // that set keys before we supported keychain.
  await saveGlobalConfig(current => ({
    ...current,
    primaryApiKey: undefined,
  }), storageV5)

  // Clear memo cache
  getApiKeyFromConfigOrMacOSKeychain.cache.clear?.()
  clearLegacyApiKeyPrefetch()
}

async function maybeRemoveApiKeyFromMacOSKeychain(): Promise<void> {
  try {
    await maybeRemoveApiKeyFromMacOSKeychainThrows()
  } catch (e) {
    logError(e)
  }
}

// Function to store OAuth tokens in secure storage
export function saveOAuthTokensIfNeeded(
  tokens: OAuthTokens,
  credentials?: CredentialStore,
): Promise<StorageWriteResult> {
  return sharedOAuthPersistence.save(tokens, credentials)
}

// Preserve the public cache.clear surface used by existing commands; it clears
// the one original host cell, not an additional memoization map.
export const getClaudeAIOAuthTokens = Object.assign(
  (): OAuthTokens | null => getSharedOAuthReader().sync(),
  {cache: {clear: () => sharedOAuthPersistence.clear()}},
)

export function clearOAuthTokenCache(): void {
  credentialCacheGeneration++
  sharedOAuthPersistence.clear()
  clearKeychainCache()
}

export function invalidateOAuthCacheIfDiskChanged(credentials?: CredentialStore): Promise<void> {
  return getSharedOAuthReader().check(oauthCredentialState.state.of(getSecureStorageExecutionHost()),credentials)
}

// Complete original 286 qH/R_ recovery, including lane/subscriber callbacks.
export function handleOAuth401Error(
  failedAccessToken: string,
  credentials?: CredentialStore,
  storageV5?: unknown,
  options?: OAuth401Options,
): Promise<boolean> {
  return getSharedOAuthRecovery().recover(failedAccessToken,credentials,storageV5,options)
}

export function getClaudeAIOAuthTokensAsync(credentials?: CredentialStore): Promise<OAuthTokens | null> {
  return getSharedOAuthReader().async(credentials)
}

// Official 286 outcome and lane deduplication; no local retry recursion.
export function checkAndRefreshOAuthTokenIfNeeded(
  retryCount = 0,
  force = false,
  entryAccessToken?: string,
): Promise<boolean> {
  return getSharedOAuthEngine().refresh({retryCount,force,entryAccessToken})
}

export function checkAndRefreshOAuthTokenOutcome(options: OAuthRefreshOptions = {}) {
  return getSharedOAuthEngine().outcome(options)
}

export function isClaudeAISubscriber(): boolean {
  if (!isAnthropicAuthEnabled()) {
    return false
  }

  return shouldUseClaudeAIAuth(getClaudeAIOAuthTokens()?.scopes)
}

/**
 * Check if the current OAuth token has the user:profile scope.
 *
 * Real /login tokens always include this scope. Env-var and file-descriptor
 * tokens use CLAUDE_CODE_OAUTH_SCOPES when provided and otherwise default to
 * ['user:inference']. Use this to gate calls to profile-scoped endpoints so
 * service key sessions don't generate 403 storms against /api/oauth/profile,
 * bootstrap, etc.
 */
export function hasProfileScope(): boolean {
  return (
    getClaudeAIOAuthTokens()?.scopes?.includes(CLAUDE_AI_PROFILE_SCOPE) ?? false
  )
}

export function is1PApiCustomer(): boolean {
  // 1P API customers are users who are NOT:
  // 1. Claude.ai subscribers (Max, Pro, Enterprise, Team)
  // 2. Vertex AI users
  // 3. AWS Bedrock users
  // 4. Foundry users

  // Exclude Vertex, Bedrock, and Foundry customers
  if (
    isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK) ||
    isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX) ||
    isEnvTruthy(process.env.CLAUDE_CODE_USE_FOUNDRY) ||
    isEnvTruthy(process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD)
  ) {
    return false
  }

  // Exclude Claude.ai subscribers
  if (isClaudeAISubscriber()) {
    return false
  }

  // Everyone else is an API customer (OAuth API customers, direct API key users, etc.)
  return true
}

/**
 * Gets OAuth account information when Anthropic auth is enabled.
 * Returns undefined when using external API keys or third-party services.
 */
export function getOauthAccountInfo(): AccountInfo | undefined {
  return isAnthropicAuthEnabled() ? getGlobalConfig().oauthAccount : undefined
}

/**
 * Checks if overage/extra usage provisioning is allowed for this organization.
 * This mirrors the logic in apps/claude-ai `useIsOverageProvisioningAllowed` hook as closely as possible.
 */
export function isOverageProvisioningAllowed(): boolean {
  const accountInfo = getOauthAccountInfo()
  const billingType = accountInfo?.billingType

  // Must be a Claude subscriber with a supported subscription type
  if (!isClaudeAISubscriber() || !billingType) {
    return false
  }

  // only allow Stripe and mobile billing types to purchase extra usage
  if (
    billingType !== 'stripe_subscription' &&
    billingType !== 'stripe_subscription_contracted' &&
    billingType !== 'apple_subscription' &&
    billingType !== 'google_play_subscription'
  ) {
    return false
  }

  return true
}

// Returns whether the user has Opus access at all, regardless of whether they
// are a subscriber or PayG.
export function hasOpusAccess(): boolean {
  const subscriptionType = getSubscriptionType()

  return (
    subscriptionType === 'max' ||
    subscriptionType === 'enterprise' ||
    subscriptionType === 'team' ||
    subscriptionType === 'pro' ||
    // subscriptionType === null covers both API users and the case where
    // subscribers do not have subscription type populated. For those
    // subscribers, when in doubt, we should not limit their access to Opus.
    subscriptionType === null
  )
}

export function getSubscriptionType(): SubscriptionType | null {
  // Check for mock subscription type first (ANT-only testing)
  if (shouldUseMockSubscription()) {
    return getMockSubscriptionType()
  }

  if (!isAnthropicAuthEnabled()) {
    return null
  }
  const oauthTokens = getClaudeAIOAuthTokens()
  if (!oauthTokens) {
    return null
  }

  return oauthTokens.subscriptionType ?? null
}

export function isMaxSubscriber(): boolean {
  return getSubscriptionType() === 'max'
}

export function isTeamSubscriber(): boolean {
  return getSubscriptionType() === 'team'
}

export function isTeamPremiumSubscriber(): boolean {
  return (
    getSubscriptionType() === 'team' &&
    getRateLimitTier() === 'default_claude_max_5x'
  )
}

export function isEnterpriseSubscriber(): boolean {
  return getSubscriptionType() === 'enterprise'
}

export function isProSubscriber(): boolean {
  return getSubscriptionType() === 'pro'
}

export function getRateLimitTier(): string | null {
  if (!isAnthropicAuthEnabled()) {
    return null
  }
  const oauthTokens = getClaudeAIOAuthTokens()
  if (!oauthTokens) {
    return null
  }

  return oauthTokens.rateLimitTier ?? null
}

export function getSubscriptionName(): string {
  const subscriptionType = getSubscriptionType()
  const planDisplayName = getOauthAccountInfo()?.planDisplayName

  if (subscriptionType === 'pro' && planDisplayName) {
    return `Claude ${planDisplayName}`
  }

  switch (subscriptionType) {
    case 'enterprise':
      return 'Claude Enterprise'
    case 'team':
      return 'Claude Team'
    case 'max':
      return 'Claude Max'
    case 'pro':
      return 'Claude Pro'
    default:
      return 'Claude API'
  }
}

/** Check if using third-party services (Bedrock or Vertex or Foundry) */
export function isUsing3PServices(): boolean {
  return !!(
    isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK) ||
    isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX) ||
    isEnvTruthy(process.env.CLAUDE_CODE_USE_FOUNDRY) ||
    isEnvTruthy(process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD)
  )
}

/**
 * Get the configured otelHeadersHelper from settings
 */
function getConfiguredOtelHeadersHelper(): string | undefined {
  const mergedSettings = getSettings_DEPRECATED() || {}
  return mergedSettings.otelHeadersHelper
}

/**
 * Check if the configured otelHeadersHelper comes from project settings (projectSettings or localSettings)
 */
export function isOtelHeadersHelperFromProjectOrLocalSettings(): boolean {
  const otelHeadersHelper = getConfiguredOtelHeadersHelper()
  if (!otelHeadersHelper) {
    return false
  }

  const projectSettings = getSettingsForSource('projectSettings')
  const localSettings = getSettingsForSource('localSettings')
  return (
    projectSettings?.otelHeadersHelper === otelHeadersHelper ||
    localSettings?.otelHeadersHelper === otelHeadersHelper
  )
}

// Cache for debouncing otelHeadersHelper calls
let cachedOtelHeaders: Record<string, string> | null = null
let cachedOtelHeadersTimestamp = 0
const DEFAULT_OTEL_HEADERS_DEBOUNCE_MS = 29 * 60 * 1000 // 29 minutes

export function getOtelHeadersFromHelper(): Record<string, string> {
  const otelHeadersHelper = getConfiguredOtelHeadersHelper()

  if (!otelHeadersHelper) {
    return {}
  }

  // Return cached headers if still valid (debounce)
  const debounceMs = parseInt(
    process.env.CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS ||
      DEFAULT_OTEL_HEADERS_DEBOUNCE_MS.toString(),
  )
  if (
    cachedOtelHeaders &&
    Date.now() - cachedOtelHeadersTimestamp < debounceMs
  ) {
    return cachedOtelHeaders
  }

  if (isOtelHeadersHelperFromProjectOrLocalSettings()) {
    // Check if trust has been established for this project
    const hasTrust = checkHasTrustDialogAccepted()
    if (!hasTrust) {
      return {}
    }
  }

  try {
    const result = execSyncWithDefaults_DEPRECATED(otelHeadersHelper, {
      timeout: 30000, // 30 seconds - allows for auth service latency
    })
      ?.toString()
      .trim()
    if (!result) {
      throw new Error('otelHeadersHelper did not return a valid value')
    }

    const headers = jsonParse(result)
    if (
      typeof headers !== 'object' ||
      headers === null ||
      Array.isArray(headers)
    ) {
      throw new Error(
        'otelHeadersHelper must return a JSON object with string key-value pairs',
      )
    }

    // Validate all values are strings
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value !== 'string') {
        throw new Error(
          `otelHeadersHelper returned non-string value for key "${key}": ${typeof value}`,
        )
      }
    }

    // Cache the result
    cachedOtelHeaders = headers as Record<string, string>
    cachedOtelHeadersTimestamp = Date.now()

    return cachedOtelHeaders
  } catch (error) {
    logError(
      new Error(
        `Error getting OpenTelemetry headers from otelHeadersHelper (in settings): ${errorMessage(error)}`,
      ),
    )
    throw error
  }
}

function isConsumerPlan(plan: SubscriptionType): plan is 'max' | 'pro' {
  return plan === 'max' || plan === 'pro'
}

export function isConsumerSubscriber(): boolean {
  const subscriptionType = getSubscriptionType()
  return (
    isClaudeAISubscriber() &&
    subscriptionType !== null &&
    isConsumerPlan(subscriptionType)
  )
}

export type UserAccountInfo = {
  subscription?: string
  tokenSource?: string
  apiKeySource?: ApiKeySource
  organization?: string
  email?: string
}

export function getAccountInformation() {
  const apiProvider = getAPIProvider()
  // Only provide account info for first-party Anthropic API
  if (apiProvider !== 'firstParty') {
    return undefined
  }
  const { source: authTokenSource } = getAuthTokenSource()
  const accountInfo: UserAccountInfo = {}
  if (
    authTokenSource === 'CLAUDE_CODE_OAUTH_TOKEN' ||
    authTokenSource === 'CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR'
  ) {
    accountInfo.tokenSource = authTokenSource
  } else if (isClaudeAISubscriber()) {
    accountInfo.subscription = getSubscriptionName()
  } else {
    accountInfo.tokenSource = authTokenSource
  }
  const { key: apiKey, source: apiKeySource } = getAnthropicApiKeyWithSource()
  if (apiKey) {
    accountInfo.apiKeySource = apiKeySource
  }

  // We don't know the organization if we're relying on an external API key or auth token
  if (
    authTokenSource === 'claude.ai' ||
    apiKeySource === '/login managed key'
  ) {
    // Get organization name from OAuth account info
    const orgName = getOauthAccountInfo()?.organizationName
    if (orgName) {
      accountInfo.organization = orgName
    }
  }
  const email = getOauthAccountInfo()?.emailAddress
  if (
    (authTokenSource === 'claude.ai' ||
      apiKeySource === '/login managed key') &&
    email
  ) {
    accountInfo.email = email
  }
  return accountInfo
}

/**
 * Result of org validation — either success or a descriptive error.
 */
export type OrgValidationResult =
  | { valid: true }
  | { valid: false; message: string; reason?:'managed_settings_invalid'|'provider_not_allowed'|'org_pin_api_key_conflict'|'org_verify_failed'|'org_pin_mismatch';policyUnreadable?:boolean }

/**
 * Validate that the active OAuth token belongs to the organization required
 * by `forceLoginOrgUUID` in managed settings. Returns a result object
 * rather than throwing so callers can choose how to surface the error.
 *
 * Fails closed: if `forceLoginOrgUUID` is set and we cannot determine the
 * token's org (network error, missing profile data), validation fails.
 */
export async function validateForceLoginOrg(credentials?:CredentialStore):Promise<OrgValidationResult> {
  const namespace=(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-nankzm0s.js');
  const original=namespace.TF;
  if(typeof original!=='function')throw Error('Original OAuth organization validation source not connected: TF');
  return (original as (credentials?:CredentialStore)=>Promise<OrgValidationResult>)(credentials)
}

class GcpCredentialsTimeoutError extends Error {}

// Official 2.1.283 host credential callback slot and Wze predicate. The file
// adapter is initialized lazily by bootstrap, never by importing auth.ts.
export { getHostAuthTokenRefreshCallback, setHostAuthTokenRefreshCallback,
  hostOwnsAuth, initializeHostCredentials } from './hostCredentials.js'
