import type { CredentialStore } from '../../utils/officialSecureStorage/runtime.js'
import { publicCommandSourcePort287 as read } from '../../utils/commandCompletionProducers287.js'
import type {
  ReferralCampaign,
  ReferralEligibilityResponse,
  ReferralRedemptionsResponse,
  ReferrerRewardInfo,
} from '../oauth/types.js'

// The original module owns eligibility, validation, and the host-scoped in-flight
// request. These public names are adapters, not a second referral/config cache.
export function fetchReferralEligibility(
  campaign: ReferralCampaign = 'claude_code_guest_pass',
  credentials?: CredentialStore,
): Promise<ReferralEligibilityResponse> {
  return (read('chunk-09m4fzsj.js', 'Lse') as (
    campaign: string, credentials?: CredentialStore,
  ) => Promise<ReferralEligibilityResponse>)(campaign, credentials)
}

export function fetchReferralRedemptions(
  campaign = 'claude_code_guest_pass',
  credentials?: CredentialStore,
): Promise<ReferralRedemptionsResponse> {
  return (read('chunk-09m4fzsj.js', '_Mo') as (
    campaign: string, credentials?: CredentialStore,
  ) => Promise<ReferralRedemptionsResponse>)(campaign, credentials)
}

export function checkCachedPassesEligibility(): {
  eligible: boolean
  needsRefresh: boolean
  hasCache: boolean
} {
  return (read('chunk-09m4fzsj.js', 'i9e') as typeof checkCachedPassesEligibility)()
}

export function formatCreditAmount(reward: ReferrerRewardInfo): string {
  return (read('chunk-09m4fzsj.js', 'jke') as typeof formatCreditAmount)(reward)
}

export function getCachedReferrerReward(): ReferrerRewardInfo | null {
  return (read('chunk-09m4fzsj.js', 'H$e') as typeof getCachedReferrerReward)()
}

export function getCachedRemainingPasses(): number | null {
  return (read('chunk-09m4fzsj.js', '_un') as typeof getCachedRemainingPasses)()
}

export function fetchAndStorePassesEligibility(
  credentials?: CredentialStore,
  storageV5?: unknown,
): Promise<ReferralEligibilityResponse | null> {
  return (read('chunk-09m4fzsj.js', 'lF') as typeof fetchAndStorePassesEligibility)(credentials, storageV5)
}

export function getCachedOrFetchPassesEligibility(
  credentials?: CredentialStore,
  storageV5?: unknown,
): Promise<ReferralEligibilityResponse | null> {
  return (read('chunk-09m4fzsj.js', 'cNr') as typeof getCachedOrFetchPassesEligibility)(credentials, storageV5)
}

export function prefetchPassesEligibility(
  credentials?: CredentialStore,
  storageV5?: unknown,
): Promise<void> {
  return (read('chunk-09m4fzsj.js', 'SMo') as typeof prefetchPassesEligibility)(credentials, storageV5)
}
