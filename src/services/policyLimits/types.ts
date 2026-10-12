import { policyResponseKernel } from './response.js'
import type { PolicyResponse } from './official/protocol.js'

/**
 * Schema for the policy limits API response
 * Only blocked policies are included. If a policy key is absent, it's allowed.
 */
export const PolicyLimitsResponseSchema = policyResponseKernel.schema

export type PolicyLimitsResponse = PolicyResponse

/**
 * Result of fetching policy limits
 */
export type PolicyLimitsFetchResult = {
  success: boolean
  restrictions?: PolicyLimitsResponse['restrictions'] | null // null means 304 Not Modified (cache is valid)
  complianceTaints?: string[]
  response?: PolicyLimitsResponse
  signature?: string
  tunnelCredentialEpoch?: number
  etag?: string
  error?: string
  skipRetry?: boolean // If true, don't retry on failure (e.g., auth errors)
}
