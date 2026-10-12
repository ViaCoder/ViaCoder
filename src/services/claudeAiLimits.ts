import {quotaSource} from './usageLimitEvents.js'
import { isOfficialLowPriorityActive, officialLowPriority } from '../utils/lowPriority.js'
import {createNativeQuotaOwner287} from './officialQuotaOwner287/native.js'
import {createNativeQuotaParsing287} from './officialQuotaParsing287/native.js'
import {createNativeQuotaGrace287} from './officialQuotaGrace287/native.js'
import {getQuotaCredit287} from '../utils/quotaCredit287.js'
import {hasGatewayInjection} from './remoteManagedSettings/clientRuntime.js'
import {getAPIProvider} from '../utils/model/providers.js'
import {getAgentContext} from '../utils/agentContext.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from './analytics/growthbook.js'
import type {CredentialStore} from '../utils/officialSecureStorage/runtime.js'
import { APIError } from '@anthropic-ai/sdk'
import isEqual from 'lodash-es/isEqual.js'
import { getIsNonInteractiveSession } from '../bootstrap/state.js'
import { getRateLimitTier, getSubscriptionType, getOauthAccountInfo, isClaudeAISubscriber } from '../utils/auth.js'
import { getModelBetas } from '../utils/betas.js'
import { getGlobalConfig, saveGlobalConfig } from '../utils/config.js'
import { logError } from '../utils/log.js'
import { getMainLoopModel, normalizeModelStringForAPI } from '../utils/model/model.js'
import { isEssentialTrafficOnly } from '../utils/privacyLevel.js'
import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from './analytics/index.js'
import { logEvent } from './analytics/index.js'
import { getAPIMetadata } from './api/claude.js'
import { getAnthropicClient } from './api/client.js'
import {
  processRateLimitHeaders,
  shouldProcessRateLimits,
  shouldProcessMockLimits,
} from './rateLimitMocking.js'

// Re-export message functions from centralized location
export {
  getRateLimitErrorMessage,
  getRateLimitWarning,
  getUsingOverageText,
} from './rateLimitMessages.js'

type QuotaStatus = 'allowed' | 'allowed_warning' | 'rejected'

export type LowPriorityOffer = 'treatment' | 'control'
export type LowPriorityStatus =
  | 'active'
  | 'not_needed'
  | 'slot_busy'
  | 'weekly_limit'
  | 'budget_exhausted'
  | 'ineligible'
  | 'off'
  | 'unrecognized'

type RateLimitType =
  | 'five_hour'
  | 'seven_day'
  | 'seven_day_opus'
  | 'seven_day_sonnet'
  | 'seven_day_overage_included'
  | 'overage'

export type { RateLimitType }

const RATE_LIMIT_DISPLAY_NAMES: Record<RateLimitType, string> = {
  five_hour: 'session limit',
  seven_day: 'weekly limit',
  seven_day_opus: 'Opus limit',
  seven_day_sonnet: 'Sonnet limit',
  seven_day_overage_included: 'Fable limit', // Official Afe
  overage: 'extra usage limit',
}

export function getRateLimitDisplayName(type: RateLimitType): string {
  return RATE_LIMIT_DISPLAY_NAMES[type] || type
}

// Reason why overage is disabled/rejected
// These values come from the API's unified limiter
export type OverageDisabledReason =
  | 'overage_not_provisioned' // Overage is not provisioned for this org or seat tier
  | 'org_level_disabled' // Organization doesn't have overage enabled
  | 'org_level_disabled_until' // Organization overage temporarily disabled
  | 'out_of_credits' // Organization has insufficient credits
  | 'seat_tier_level_disabled' // Seat tier doesn't have overage enabled
  | 'member_level_disabled' // Account specifically has overage disabled
  | 'seat_tier_zero_credit_limit' // Seat tier has a zero credit limit
  | 'group_zero_credit_limit' // Resolved group limit has a zero credit limit
  | 'member_zero_credit_limit' // Account has a zero credit limit
  | 'org_service_level_disabled' // Org service specifically has overage disabled
  | 'org_service_zero_credit_limit' // Org service has a zero credit limit
  | 'no_limits_configured' // No overage limits configured for account
  | 'unknown' // Unknown reason, should not happen

export type ClaudeAILimits = {
  status: QuotaStatus
  overageScope?: 'service' | 'channel' | 'group_pool'
  upgradePaths?: string[]
  overageInUse?: boolean
  overagePeriodMonthly?: {utilization: number}
  overagePeriodChannel?: {utilization: number}
  rateLimitGraceActive?: boolean
  errorCode?: 'credits_required'
  canUserPurchaseCredits?: boolean
  hasChargeableSavedPaymentMethod?: boolean
  // unifiedRateLimitFallbackAvailable is currently used to warn users that set
  // their model to Opus whenever they are about to run out of quota. It does
  // not change the actual model that is used.
  unifiedRateLimitFallbackAvailable: boolean
  resetsAt?: number
  rateLimitType?: RateLimitType
  utilization?: number
  overageStatus?: QuotaStatus
  overageResetsAt?: number
  overageDisabledReason?: OverageDisabledReason
  isUsingOverage?: boolean
  surpassedThreshold?: number
  lowPriorityOffer?: LowPriorityOffer
  lowPriorityStatus?: LowPriorityStatus
  lowPriorityRetryAfterSeconds?: number
  lowPriorityMaxWaitSeconds?: number
  lowPriorityBudgetUtilization?: number
  lowPriorityBudgetResetsAt?: number
}

// One native quota owner. The compatibility exports below are views of this
// object; UI subscribers and reset/probe/API callers never maintain a second quota.
function quotaProvider() {return hasGatewayInjection() ? 'gateway' : getAPIProvider()}
function parsing(lowPriorityActive: () => boolean = isOfficialLowPriorityActive) {
  return createNativeQuotaParsing287({
    lowPriorityActive, lowPriorityOffer: officialLowPriority.Mwo,
    lowPriorityRetryAfterSeconds: officialLowPriority.rUn,
    lowPriorityMaxWaitSeconds: officialLowPriority.oUn, globalDate: Date,
    overageScopeHeaderName: 'anthropic-ratelimit-unified-overage-scope',
    graceInUseHeaderName: 'anthropic-ratelimit-unified-overage-in-use',
  })
}
const quotaParsing = parsing()
const QuotaOwner = createNativeQuotaOwner287({
  ...quotaParsing,
  Yge: function () {return createNativeQuotaGrace287({now: () => Date.now(),
    overageStatusHeader: 'anthropic-ratelimit-unified-overage-status',
    overageInUseHeader: 'anthropic-ratelimit-unified-overage-in-use'})},
  Or: isEqual, d: logError, i: logEvent,
  c: (value: unknown) => value, me: (value: unknown) => value ?? undefined,
  Tt: () => isEssentialTrafficOnly(), ft: () => isClaudeAISubscriber(), ke: () => getIsNonInteractiveSession(),
  xt: APIError, JOo: (headers: Headers, atMs: number) => officialLowPriority.jwo(headers, atMs),
  y: (name: string) => logEvent('tengu_feature_ok', {feature_name: name as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
  qv: getRateLimitTier, _N: isOfficialLowPriorityActive,
  Ocn: 'anthropic-ratelimit-unified-overage-status',
  bN: () => getQuotaCredit287().bN(), Ry: (model: string) => getQuotaCredit287().Ry(model),
  mK: () => getQuotaCredit287().mK(), ode: () => getQuotaCredit287().ode(),
  CLt: () => getQuotaCredit287().CLt(), zAn: (value: boolean) => getQuotaCredit287().zAn(value),
  Me: quotaProvider, ar: getSubscriptionType, C: getFeatureValue_CACHED_MAY_BE_STALE,
  CJe: shouldProcessMockLimits, dVo: processRateLimitHeaders,
  le: () => getGlobalConfig(), Te: (...args: Parameters<typeof saveGlobalConfig>) => saveGlobalConfig(...args),
  tD: (options: Parameters<typeof getAnthropicClient>[0]) => getAnthropicClient(options), dl: () => getAgentContext(),
  qQ: (model: string) => getModelBetas(model).map(header => ({header})),
  Ex: normalizeModelStringForAPI, V$e: getAPIMetadata,
  rA: (betas: {header: string}[]) => betas.map(beta => beta.header),
})
const quotaOwner = new QuotaOwner()
// Local usage-host account scope is metadata only; quota windows live solely
// in the native owner. Preserve the existing account-isolation view.
let usageObservationAccount: {accountUuid: string | undefined; epoch: number} | undefined
function rememberUsageAccount(observedAtMs: number) {
  if (quotaOwner.limitsObserved && quotaOwner.lastAppliedObservationAtMs === observedAtMs) {
    usageObservationAccount = {accountUuid: getOauthAccountInfo()?.accountUuid, epoch: quotaOwner.accountEpoch}
  }
}
export function getQuotaOwner287() {return quotaOwner}
export let currentLimits: ClaudeAILimits = quotaOwner.currentLimits
quotaOwner.statusChanged.subscribe(limits => {currentLimits = limits})

type StatusChangeListener = (limits: ClaudeAILimits) => void
class QuotaStatusListeners extends Set<StatusChangeListener> {
  private unsubscribers = new Map<StatusChangeListener, () => void>()
  override add(listener: StatusChangeListener) {
    if (!this.has(listener)) this.unsubscribers.set(listener, quotaOwner.statusChanged.subscribe(listener))
    return super.add(listener)
  }
  override delete(listener: StatusChangeListener) {
    this.unsubscribers.get(listener)?.(); this.unsubscribers.delete(listener)
    return super.delete(listener)
  }
  override clear() {
    for (const unsubscribe of this.unsubscribers.values()) unsubscribe()
    this.unsubscribers.clear(); super.clear()
  }
}
export const statusListeners: Set<StatusChangeListener> = new QuotaStatusListeners()
export function emitStatusChange(limits: ClaudeAILimits) {quotaOwner.emitStatusChange(limits)}
export function getQuotaAccountEpoch() {return quotaOwner.accountEpoch}
export function resetQuotaState() {
  quotaOwner.resetCurrentLimits()
  usageObservationAccount = undefined
  currentLimits = quotaOwner.currentLimits
}
export function resetQuotaGraceState() {quotaOwner.resetGraceState()}
export function resetNearLimitWrapUpState() {quotaOwner.resetNearLimitWrapUpState()}
export function getUsageHeaderObservation() {
  if (!usageObservationAccount || usageObservationAccount.epoch !== quotaOwner.accountEpoch ||
      usageObservationAccount.accountUuid !== getOauthAccountInfo()?.accountUuid) {
    return {lastAppliedObservationAtMs: undefined, currentWindows: {}}
  }
  const currentWindows: Partial<Record<RateLimitType, {utilization: number;resets_at: number}>> = {}
  for (const [type, reading] of Object.entries(quotaOwner.currentWindows(Date.now()))) {
    if (reading?.utilization !== undefined && reading.resets_at !== undefined) currentWindows[type as RateLimitType] = {utilization: reading.utilization, resets_at: reading.resets_at}
  }
  return {lastAppliedObservationAtMs: quotaOwner.lastAppliedObservationAtMs || undefined, currentWindows}
}
export function getRawUtilization() {
  const current: Partial<Record<RateLimitType, {utilization: number;resets_at: number}>> = {}
  for (const [type, reading] of Object.entries(quotaOwner.rawUtilization)) {
    if (reading?.utilization !== undefined && reading.resets_at !== undefined && quotaParsing.y4e(reading, Date.now())) current[type as RateLimitType] = {utilization: reading.utilization, resets_at: reading.resets_at}
  }
  return current
}
export async function checkQuotaStatus(credentials?: CredentialStore, storageV5?: unknown): Promise<void> {
  await quotaOwner.probeQuotaStatus(getMainLoopModel(), credentials, storageV5)
}
export function probeMainModelQuota(model: string, credentials?: CredentialStore, storageV5?: unknown): Promise<ClaudeAILimits | null> {
  return quotaOwner.probeQuotaStatus(model, credentials, storageV5)
}

// Official 2.1.287 parsing closure; the historical 2.1.283 differential
// fixtures also cover its stable public error-display behavior.
// This does not select or change model fallback.
export type QuotaWindowReading = {utilization?: number, resets_at?: number, surpassedThreshold?: number}
export type QuotaReadings = Partial<Record<RateLimitType, QuotaWindowReading>>
export function readQuotaWindows(headers: Headers): QuotaReadings {
  return quotaParsing.Dgn(headers) as QuotaReadings
}

/** chunk-hzevqd7x.js:_h/Mwo/rUn/oUn/yh/Jv. Header validation is independent
 * of the separate low-priority session state machine (not restored here). */
function nonnegativeHeader(headers: globalThis.Headers, name: string): number | undefined {
  const raw = headers?.get(name)
  if (raw == null || raw.trim() === '') return undefined
  const number = Number(raw)
  return Number.isFinite(number) && number >= 0 ? number : undefined
}
export function getLowPriorityOfferHeaders(headers: globalThis.Headers): Partial<ClaudeAILimits> {
  const offer = headers?.get('anthropic-ratelimit-unified-slow-offer')
  if (offer !== 'treatment' && offer !== 'control') return {}
  const retry = nonnegativeHeader(headers, 'anthropic-ratelimit-unified-slow-retry-after')
  const wait = nonnegativeHeader(headers, 'anthropic-ratelimit-unified-slow-max-wait')
  return {lowPriorityOffer: offer,
    ...retry !== undefined && {lowPriorityRetryAfterSeconds: retry},
    ...wait !== undefined && {lowPriorityMaxWaitSeconds: wait}}
}
export function getLowPriorityResponseHeaders(headers: globalThis.Headers): Partial<ClaudeAILimits> {
  const status = headers?.get('anthropic-ratelimit-unified-slow-status')
  const known: LowPriorityStatus[] = ['active', 'not_needed', 'slot_busy', 'weekly_limit', 'budget_exhausted', 'ineligible', 'off']
  const budget = nonnegativeHeader(headers, 'anthropic-ratelimit-unified-slow-budget-utilization')
  return {
    ...getLowPriorityOfferHeaders(headers),
    ...status != null && {lowPriorityStatus: known.includes(status as LowPriorityStatus) ? status as LowPriorityStatus : 'unrecognized'},
    ...budget !== undefined && {lowPriorityBudgetUtilization: Math.min(1, budget)},
  }
}
function overageScope(headers: globalThis.Headers): ClaudeAILimits['overageScope'] {
  const scope = headers?.get?.('anthropic-ratelimit-unified-overage-scope')
  return scope === 'service' || scope === 'channel' || scope === 'group_pool' ? scope : undefined
}

/** Zbe: preserve base vs own-warning distinction. lowPriorityActive is the
 * official XM active phase, not merely the user's requested low-priority flag. */
export function parseQuotaStatusFromHeaders(headers: globalThis.Headers, rateLimitGraceActive = false, lowPriorityActive = isOfficialLowPriorityActive()): {
  base: ClaudeAILimits, own: ClaudeAILimits, readings: QuotaReadings
} {
  return parsing(() => lowPriorityActive).Zge(headers, rateLimitGraceActive) as {
    base: ClaudeAILimits, own: ClaudeAILimits, readings: QuotaReadings
  }
}

/** Rlt. */
export function computeNewLimitsFromHeaders(headers: globalThis.Headers, rateLimitGraceActive = false, lowPriorityActive = isOfficialLowPriorityActive()): ClaudeAILimits {
  return parseQuotaStatusFromHeaders(headers, rateLimitGraceActive, lowPriorityActive).own
}

/** twe/Ilt: structured API credits errors override only their declared fields. */
export function applyQuotaErrorDetails(limits: ClaudeAILimits, error: Pick<APIError, 'error'>): ClaudeAILimits {
  return quotaParsing.S4e(limits as unknown as Parameters<typeof quotaParsing.S4e>[0], error) as ClaudeAILimits
}

/** M7: a fresh snapshot for the actual error, never global currentLimits. */
export function getQuotaLimitsFromError(error: Pick<APIError, 'headers' | 'error'>, lowPriorityActive = isOfficialLowPriorityActive()): ClaudeAILimits {
  const headers = processRateLimitHeaders(error.headers ?? new globalThis.Headers())
  return applyQuotaErrorDetails(computeNewLimitsFromHeaders(headers, false, lowPriorityActive), error)
}

/** Tlt: display selection intentionally differs from the complete M7 snapshot. */
export function getQuotaDisplayLimitsFromError(error: Pick<APIError, 'headers'>): ClaudeAILimits | null {
  const headers = error.headers
  const type = headers?.get?.('anthropic-ratelimit-unified-representative-claim') as RateLimitType | null
  const status = headers?.get?.('anthropic-ratelimit-unified-overage-status') as QuotaStatus | null
  if (!type && !status) return null
  const result: ClaudeAILimits = {status: 'rejected', unifiedRateLimitFallbackAvailable: false, isUsingOverage: false}
  const reset = headers?.get?.('anthropic-ratelimit-unified-reset')
  if (reset) result.resetsAt = Math.round(Number(reset))
  if (type) result.rateLimitType = type
  if (status) result.overageStatus = status
  const overageReset = headers?.get?.('anthropic-ratelimit-unified-overage-reset')
  if (overageReset) result.overageResetsAt = Math.round(Number(overageReset))
  const disabled = headers?.get?.('anthropic-ratelimit-unified-overage-disabled-reason')
  if (disabled) result.overageDisabledReason = disabled as OverageDisabledReason
  const scope = overageScope(headers!)
  if (scope) result.overageScope = scope
  return Object.assign(result, getLowPriorityOfferHeaders(headers!))
}

/** Native nhe/b4e: preserve the request's dispatch epoch and header arrival time. */
export function extractQuotaStatusFromHeaders(
  headers: Headers,
  model = getMainLoopModel(),
  isLongContext = false,
  observedAtMs = Date.now(),
  accountEpoch?: number,
  storageV5?: unknown,
): void {
  if (quotaOwner.isFromPreviousAccount(accountEpoch)) return
  if (!shouldProcessRateLimits(isClaudeAISubscriber()) && quotaProvider() !== 'gateway') {
    // Retain the local account-metadata clearing fix, including allowed-state
    // offer/credit flags. Native state remains the only quota owner.
    quotaOwner.extractQuotaStatusFromHeaders(headers, model, isLongContext, observedAtMs, accountEpoch, storageV5)
    const empty: ClaudeAILimits = {status: 'allowed', unifiedRateLimitFallbackAvailable: false, isUsingOverage: false}
    if (!isEqual(quotaOwner.currentLimits, empty)) quotaOwner.emitStatusChange(empty)
    return
  }
  quotaOwner.extractQuotaStatusFromHeaders(headers, model, isLongContext, observedAtMs, accountEpoch, storageV5)
  rememberUsageAccount(observedAtMs)
}
export function extractGraceStatusFromHeaders(headers: Headers, eligible: boolean, observedAtMs = Date.now(), accountEpoch?: number) {
  quotaOwner.extractGraceStatusFromHeaders(headers, eligible, observedAtMs, accountEpoch)
}
export function extractQuotaStatusFromError(error: APIError, source?: string, observedAtMs = Date.now(), accountEpoch?: number, storageV5?: unknown): void {
  quotaOwner.extractQuotaStatusFromError(error, quotaSource(source), observedAtMs, accountEpoch, storageV5)
}
