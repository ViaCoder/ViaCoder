import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'
import { isEnvTruthy } from '../envUtils.js'
import {authEnvironment} from '../authEnvironment.js'

export type APIProvider =
  | 'firstParty'
  | 'bedrock'
  | 'vertex'
  | 'foundry'
  | 'anthropicGoogleCloud'

/** Reject the removed provider before any first-party or other-provider fallback. */
export function assertBedrockProviderRemoved(): void {
  if (isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK)) {
    throw new Error('AWS Bedrock provider has been removed; unset CLAUDE_CODE_USE_BEDROCK and choose a configured provider')
  }
}

export function getAPIProvider(): APIProvider {
  assertBedrockProviderRemoved()
  return isEnvTruthy(process.env.CLAUDE_CODE_USE_FOUNDRY)
    ? 'foundry'
    : isEnvTruthy(process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD)
      ? 'anthropicGoogleCloud'
      : isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX)
        ? 'vertex'
        : 'firstParty'
}

export function isUsingAnthropicGoogleCloud(): boolean {
  return isEnvTruthy(process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD)
}

export function getAPIProviderForStatsig(): AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
  return getAPIProvider() as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS
}

/**
 * Check if ANTHROPIC_BASE_URL is the official 2.1.284 first-party messages
 * endpoint. OAuth's staging issuer is a separate auth transport and must not
 * make a custom messages host look like the production API.
 */
export function isFirstPartyAnthropicBaseUrl(): boolean {
  const baseUrl = process.env.ANTHROPIC_BASE_URL
  if (!baseUrl) {
    return true
  }
  try {
    const host = new URL(baseUrl).host
    return host === 'api.anthropic.com'
  } catch {
    return false
  }
}

/**
 * Official 2.1.284 request-level gate (`xs()`): an explicit compatibility
 * flag enables first-party request metadata/transport behavior while the
 * actual configured host remains available through the narrower helper above.
 */
export function isFirstPartyRequestEndpoint(): boolean {
  return authEnvironment._CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL ||
    isFirstPartyAnthropicBaseUrl()
}
