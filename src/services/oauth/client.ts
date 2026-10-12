import {getSharedOAuthClient} from '../../utils/sharedOAuthClient.js'
import {createOAuthAccountWriter287, type OAuthAccountWrite287} from '../../utils/officialOAuthPreparation287/runtime.js'
import {createOfficialOAuthProfileStartup287} from './officialOAuthProfileStartup287/runtime.js'
import {getSharedOAuthEngine} from '../../utils/sharedOAuthEngine.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {isBareMode} from '../../utils/envUtils.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
// OAuth client for handling authentication flows with Claude services
import axios from 'axios'
import { z } from 'zod'
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from 'src/services/analytics/index.js'
import {
  CLAUDE_AI_INFERENCE_SCOPE,
  getOauthConfig,
} from '../../constants/oauth.js'
import {
  getClaudeAIOAuthTokens,
  hasProfileScope,
  isClaudeAISubscriber,
  saveApiKey,
} from '../../utils/auth.js'
import { oauthErrorMetadata } from '../../utils/sharedOAuthPersistence.js'
import {
  createApiKeyCreate286,
  createApiKeyTruncate286,
} from '../../utils/officialApiKeyCreate/runtime.js'
import type { AccountInfo } from '../../utils/config.js'
import { getGlobalConfig, saveGlobalConfig } from '../../utils/config.js'
import { logForDebugging } from '../../utils/debug.js'
import { getUserAgent } from '../../utils/http.js'
import { getOauthProfileFromOauthToken } from './getOauthProfile.js'
import type {
  BillingType,
  OAuthClient,
  OAuthProfileResponse,
  OAuthTokenExchangeResponse,
  OAuthTokens,
} from './types.js'

export function getValidatedPlanDisplayName(value: unknown): string | undefined {
  return getSharedOAuthClient().validatePlan({organization:{plan_display_name:value}}) ?? undefined
}

/**
 * Check if the user has Claude.ai authentication scope
 * @private Only call this if you're OAuth / auth related code!
 */
export function shouldUseClaudeAIAuth(scopes: string[] | undefined): boolean {
  return Boolean(scopes?.includes(CLAUDE_AI_INFERENCE_SCOPE))
}

export function parseScopes(scopeString?: string): string[] {
  return getSharedOAuthClient().scopes(scopeString)
}
export type AuthorizeOptions = {
 codeChallenge: string;state: string;port: number;isManual: boolean
 loginWithClaudeAi?: boolean;inferenceOnly?: boolean;orgUUID?: string;loginHint?: string;loginMethod?: string;oauthClient?: OAuthClient
}
export function buildAuthUrl(options: AuthorizeOptions): string {
 return getSharedOAuthClient().authorize(options)
}

export type ExchangeCodeForTokensOptions = {
  state: string
  codeVerifier: string
  port: number
  useManualRedirect?: boolean
  expiresIn?: number
  clientId?: string
}

export type RefreshOAuthTokenOptions = {
  scopes?: string[]
  expiresIn?: number
  clientId?: string
  skipProfileFetch?: boolean
  signal?: AbortSignal
  /** Official caller marks the enlarged-scope attempt when a narrow fallback is eligible. */
  invalidScopeRetried?: boolean
  telemetryContext?: string
  storageV5?: unknown
}

// Native error/transport/profile declarations own these operations. The
// native options carry the persistence context; its legacy writer remains an
// explicit production migration boundary.
export function isOAuthInvalidScopeError(error: unknown): boolean {
 return getSharedOAuthClient().invalidScope(error)
}
export function exchangeCodeForTokens(code: string,options: ExchangeCodeForTokensOptions): Promise<OAuthTokenExchangeResponse> {
 return getSharedOAuthClient().exchange(code,options)
}
export function refreshOAuthToken(token: string,options?: RefreshOAuthTokenOptions): Promise<OAuthTokens> {
 return getSharedOAuthClient().refresh(token,options)
}
export function fetchAndStoreUserRoles(token: string,storageV5?: unknown): Promise<void> {
 return getSharedOAuthClient().roles(token,storageV5)
}

const createApiKey = createApiKeyCreate286({
  Pa: 'API Error',
  XXe: 1000,
  f: <T>(factory: () => T) => {
    let value: T | undefined
    return () => value ??= factory()
  },
  o: z.string,
  ou: axios.isAxiosError,
  re: createApiKeyTruncate286({}),
  u: z.object,
  x: z.literal,
  Po: getUserAgent,
  Vd: (error: unknown) => oauthErrorMetadata(error),
  _: (value: string) => value,
  cn: getOauthConfig,
  d2o: (apiKey: string, storageV5?: unknown) => saveApiKey(apiKey, storageV5),
  ht: axios,
  i: (name: string, metadata: Record<string, unknown>) => logEvent(name, metadata as Record<string, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS | boolean | number | undefined>),
  m: (feature: string, reason: string) => logEvent('tengu_feature_bad', {feature_name:feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,error_code:reason as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
  object: Object,
  y: (feature: string) => logEvent('tengu_feature_ok', {feature_name:feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
})

export function createAndStoreApiKey(
  accessToken: string,
  storageV5?: unknown,
): Promise<string | null> {
  return createApiKey(accessToken, storageV5)
}

export function isOAuthTokenExpired(expiresAt: number | null): boolean {
  if (expiresAt === null) {
    return false
  }

  const bufferTime = 5 * 60 * 1000
  const now = Date.now()
  const expiresWithBuffer = now + bufferTime
  return expiresWithBuffer >= expiresAt
}

export function fetchProfileInfo(accessToken: string): Promise<import('../../utils/officialOAuthClient/runtime.js').OAuthProfileInfo> {
 return getSharedOAuthClient().profile(accessToken)
}

/**
 * Gets the organization UUID from the OAuth access token
 * @returns The organization UUID or null if not authenticated
 */
export async function getOrganizationUUID(): Promise<string | null> {
  // Check global config first to avoid unnecessary API call
  const globalConfig = getGlobalConfig()
  const orgUUID = globalConfig.oauthAccount?.organizationUuid
  if (orgUUID) {
    return orgUUID
  }

  // Fall back to fetching from profile (requires user:profile scope)
  const accessToken = getClaudeAIOAuthTokens()?.accessToken
  if (accessToken === undefined || !hasProfileScope()) {
    return null
  }
  const profile = await getOauthProfileFromOauthToken(accessToken)
  const profileOrgUUID = profile?.organization?.uuid
  if (!profileOrgUUID) {
    return null
  }
  return profileOrgUUID
}

/**
 * Populate the OAuth account info if it has not already been cached in config.
 * @returns Whether or not the oauth account info was populated.
 */
const populateOAuthAccountInfo287 = createOfficialOAuthProfileStartup287({
  a: authEnvironment,
  le: () => getGlobalConfig(),
  // Original $i resolves m8's outcome to a boolean; this canonical owner
  // already exposes that contract, including the credentials/backend lane.
  $i: options => getSharedOAuthEngine().refresh(options),
  t: logForDebugging,
  tWt: (account, storageV5) => storeOAuthAccountInfo(account, storageV5),
  ft: () => isClaudeAISubscriber(),
  zp: () => hasProfileScope(),
  fn: () => getClaudeAIOAuthTokens(),
  KBe: async token => getOauthProfileFromOauthToken(token),
  xr: () => isBareMode(),
  // Original EW/Uz read the existing slots, not the descriptor reader (which
  // could prime them). Keep lookup lazy and do not construct another cache.
  n: () => ({host: {credentialSlots: filesCredentialSlots}}),
  FJn: profile => getValidatedPlanDisplayName(profile.organization.plan_display_name) ?? null,
})

export async function populateOAuthAccountInfoIfNeeded(
  credentials?: CredentialStore,
  storageV5?: unknown,
): Promise<boolean> {
  return populateOAuthAccountInfo287(credentials, storageV5)
}

const accountWriter287 = createOAuthAccountWriter287({
  saveConfig: (updater, storageV5) => saveGlobalConfig(updater, storageV5),
})

/** Original account DTO/write/equality logic over the existing config owner. */
export function storeOAuthAccountInfo(account: OAuthAccountWrite287, storageV5?: unknown): void {
  accountWriter287.store(account, storageV5)
}
