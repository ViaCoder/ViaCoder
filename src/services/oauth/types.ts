/**
 * OAuth wire/storage contracts recovered from oauth/client.ts, OAuthService,
 * auth.ts and the local official 2.1.284 modules (chunk-f5tnbmwk / chunk-jrn3jnqy).
 * Billing and rate-limit identifiers are server-provided strings: consumers
 * preserve unrecognized values rather than validating a closed enumeration.
 */
// The official typed environment/reader preserves unrecognized values.
export type SubscriptionType = string
export type RateLimitTier = string
export type BillingType = string

export type OAuthTokenExchangeResponse = {
  access_token: string
  expires_in: number
  // Refresh responses may omit this; refreshOAuthToken retains the old token.
  refresh_token?: string
  refresh_token_expires_in?: number
  scope?: string
  account?: { uuid: string; email_address: string }
  organization?: { uuid: string; name?: string }
  workspace?: { id: string; name?: string }
}

/** Optional OAuth client identity and exact authorize scope set for a flow. */
export type OAuthClient = {
  clientId: string
  scopes: string[]
}

export type OAuthTokens = {
  accessToken: string
  // Environment/FD inference-only credentials explicitly supply null; a wire
  // exchange without refresh_token is forwarded as undefined by formatTokens.
  refreshToken: string | null | undefined
  expiresAt: number | null
  scopes: string[]
  subscriptionType: SubscriptionType | null
  rateLimitTier: RateLimitTier | null
  // Present in official 2.1.284; older persisted records/local writers omit them.
  refreshTokenExpiresAt?: number
  clientId?: string
  profile?: OAuthProfileResponse
  tokenAccount?: {
    uuid: string
    emailAddress: string
    organizationUuid?: string
    organizationName?: string
    workspaceId?: string
    workspaceName?: string
  }
}

/** Fields consumed by account installation and profile refresh. */
export type OAuthProfileResponse = {
  account: {
    uuid: string
    email: string
    display_name?: string | null
    full_name?: string | null
    created_at?: string
    has_claude_max?: boolean
    has_claude_pro?: boolean
  }
  organization: {
    uuid: string
    organization_type: string
    rate_limit_tier?: RateLimitTier | null
    billing_type?: BillingType | null
    plan_display_name?: string | null
    has_extra_usage_enabled?: boolean | null
    seat_tier?: string | null
    subscription_created_at?: string | null
    cc_onboarding_flags?: Record<string, unknown> | null
    claude_code_trial_ends_at?: string | null
    claude_code_trial_duration_days?: number | null
  }
}

export type UserRolesResponse = {
  organization_role: string | null
  workspace_role: string | null
  organization_name: string | null
}

// The referral API forwards campaign identifiers supplied by the server. The
// current caller defaults to 'claude_code_guest_pass', not a closed enum.
export type ReferralCampaign = string
export type ReferrerRewardInfo = {
  currency: string
  amount_minor_units: number
}
export type ReferralEligibilityResponse = {
  eligible: boolean
  remaining_passes?: number | null
  referrer_reward?: ReferrerRewardInfo | null
  referral_code_details?: {
    referral_link?: string
    campaign?: ReferralCampaign
  } | null
}
export type ReferralRedemptionsResponse = {
  // The local UI only counts entries; no redemption payload fields are known.
  redemptions?: unknown[]
  limit?: number
}
