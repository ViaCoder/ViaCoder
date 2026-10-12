import { filesCredentialSlots } from '../vendor/official-files-api/slots.js'
import { performLogout } from '../commands/logout/logout.js'
import { getOauthProfileFromOauthToken } from '../services/oauth/getOauthProfile.js'
import { storeOAuthAccountInfo } from '../services/oauth/client.js'
import { logEvent, type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../services/analytics/index.js'
import { getClaudeAIOAuthTokens, isAnthropicAuthEnabled } from './auth.js'
import { authEnvironment } from './authEnvironment.js'
import { getOAuthTokenFromFileDescriptor } from './authFileDescriptor.js'
import { getGlobalConfig } from './config.js'
import { getSecureStorage } from './secureStorage/index.js'
import { getSharedOAuthClient } from './sharedOAuthClient.js'
import {createOAuthCredentials287} from './officialOAuthLifecycle287/credentials.js'
import { createOAuthPreparation287 } from './officialOAuthPreparation287/runtime.js'

export const oauthPreparationCredentialPorts287 = {
  fn: getClaudeAIOAuthTokens,
  a: authEnvironment,
  sO: getOAuthTokenFromFileDescriptor,
  Uz: () => filesCredentialSlots.oauthTokenFromBgSnapshot(),
  Jl: () => Boolean(authEnvironment.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST),
  zn: getSecureStorage,
  vl: isAnthropicAuthEnabled,
  le: getGlobalConfig,
  sto: () => filesCredentialSlots.authenticatedAccount(),
}
const originalCredentials = createOAuthCredentials287(oauthPreparationCredentialPorts287)
export const oauthPreparationCredentials287 = {
  storedIdentity: originalCredentials.In,
  authenticatedIdentity: originalCredentials.jH,
  sameIdentity: originalCredentials.w_,
  credentialBackend: originalCredentials.Zg,
}

// Use the same live credential/account owners as API auth. No copied account,
// captured storage backend or additional cache is created by this adapter.
export const oauthInstallPreparation287 = createOAuthPreparation287({
  ...oauthPreparationCredentials287,
  reset: options => performLogout(options),
  stampAccount: account => filesCredentialSlots.stampAuthenticatedAccount(account),
  fetchProfile: token => getOauthProfileFromOauthToken(token),
  storeProfile: (account, storageV5) => storeOAuthAccountInfo(account, storageV5),
  validatePlan: profile => getSharedOAuthClient().validatePlan(profile),
  recordLogin: metadata => logEvent('auth', metadata as unknown as Record<string, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS>),
})
