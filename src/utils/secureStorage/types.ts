import type { OAuthDiscoveryState } from '@modelcontextprotocol/sdk/client/auth.js'
import type { OAuthTokens } from '../../services/oauth/types.js'

/** Required fields are supplied even by client/discovery-only partial writes. */
export type StoredMcpOAuthTokens = {
  serverName: string
  serverUrl: string
  accessToken: string
  expiresAt: number
  refreshToken?: string
  scope?: string
  clientId?: string
  clientSecret?: string
  stepUpScope?: string
  // Current writers persist only the URLs. Old stores may contain SDK metadata;
  // discoveryState() reads those legacy fields using the installed SDK contract.
  discoveryState?: OAuthDiscoveryState
}

/**
 * Actual storage namespaces read/written by auth, MCP, trustedDevice, and plugin
 * option storage. Empty storage is valid; no catch-all property signature.
 */
export type SecureStorageData = {
  gatewayTrust?: Record<string, string>
  claudeAiOauth?: OAuthTokens
  organizationUuid?: string
  designOauth?: {refreshToken?: string; clientId?: string; [field: string]: unknown}
  enterpriseGateway?: Record<string, unknown>
  coworkRemoteDevice?: Record<string, unknown>
  mcpOAuth?: Record<string, StoredMcpOAuthTokens>
  mcpOAuthClientConfig?: Record<string, { clientSecret?: string }>
  mcpXaaIdp?: Record<string, { idToken: string; expiresAt: number }>
  mcpXaaIdpConfig?: Record<string, { clientSecret: string }>
  pluginSecrets?: Record<string, Record<string, string>>
  trustedDeviceToken?: string
  slackTag?: Record<string, unknown>
}

// The production contract is asynchronous, including mutation under the
// official write lock. Strict-read failure remains distinct from an absent store.
export type { StorageWriteResult as SecureStorageUpdateResult } from '../officialSecureStorage/runtime.js'
export type { ModernSecureStorage as SecureStorage } from '../officialSecureStorage/runtime.js'
