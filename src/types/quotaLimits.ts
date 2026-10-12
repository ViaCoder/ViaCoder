/** Official 2.1.283 chunk-wyjbafrm.js: Zbe/Rlt/M7/twe (parsed quota
 * response headers), and chunk-9r9kpwh0.js: SDK rate-limit schema k$r.
 * Header-sourced reason/type strings are open on the internal object: the
 * parser deliberately preserves unknown server values for forward compatibility.
 */
export type QuotaLimits = {
  status: 'allowed' | 'allowed_warning' | 'rejected'
  resetsAt?: number
  unifiedRateLimitFallbackAvailable?: boolean
  rateLimitType?: string
  utilization?: number
  overageStatus?: 'allowed' | 'allowed_warning' | 'rejected'
  overageResetsAt?: number
  overageDisabledReason?: string
  overageScope?: 'service' | 'channel' | 'group_pool'
  upgradePaths?: string[]
  isUsingOverage?: boolean
  overageInUse?: boolean
  surpassedThreshold?: number
  rateLimitGraceActive?: boolean
  overagePeriodMonthly?: { utilization: number }
  overagePeriodChannel?: { utilization: number }
  unifiedWindows?: {
    five_hour?: { utilization: number; resetsAt: number }
    seven_day?: { utilization: number; resetsAt: number }
    seven_day_overage_included?: { utilization: number; resetsAt: number }
  }
  errorCode?: 'credits_required'
  canUserPurchaseCredits?: boolean
  hasChargeableSavedPaymentMethod?: boolean
}
