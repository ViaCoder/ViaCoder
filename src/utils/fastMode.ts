import {createFastStatusLifecycle287} from './officialFastStatus287/native.js'
import {authEnvironment} from './authEnvironment.js'
import {getNativeAPIProvider287} from './model/providerSelectionBindings287.js'
import {getSessionIngressAuthToken} from './sessionIngressAuth.js'
import {jsonParse} from './slowOperations.js'
import {updateFastStatusSettings287} from './settings/fastStatusWriter287.js'
import axios from 'axios'
import {createFastStatusRequest287} from '../services/api/officialInterfaceHeaders287/native.js'
import {getClaudeCodeUserAgent} from './userAgent.js'
import { getOauthConfig, OAUTH_BETA_HEADER } from 'src/constants/oauth.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from 'src/services/analytics/growthbook.js'
import {
  getIsNonInteractiveSession,
  getKairosActive,
  preferThirdPartyAuthentication,
} from '../bootstrap/state.js'
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../services/analytics/index.js'
import {
  getAnthropicApiKey,
  getClaudeAIOAuthTokens,
  handleOAuth401Error,
} from './auth.js'
import { isInBundledMode } from './bundledMode.js'
import { getGlobalConfig, saveGlobalConfig } from './config.js'
import { logForDebugging } from './debug.js'
import { isEnvTruthy } from './envUtils.js'
import {
  getDefaultMainLoopModelSetting,
  isOpus1mMergeEnabled,
  type ModelSetting,
  parseUserSpecifiedModel,
} from './model/model.js'
import { getAPIProvider } from './model/providers.js'
import { isEssentialTrafficOnly } from './privacyLevel.js'
import {
  getInitialSettings,
  getSettingsForSource,
  updateSettingsForSource,
} from './settings/settings.js'
import {APIError} from '@anthropic-ai/sdk/error'
import {getExecutionSession287, executionRecommendationGates287} from '../services/context/execution287.js'
import {getModelBehaviorName287} from './model/behavior287.js'
import {createFastModeOwner287, createFastRejectionKernel287, type FastModeOwner287} from './officialFastRejection287/native.js'

// The original r_ owns runtime/org/prefetch/signals AND both rejection collections.
// Attach once to the existing canonical host; no module-local parallel cache.
export function getFastModeOwner287(): FastModeOwner287 {
  const host = getExecutionSession287().host as unknown as {fastModeRuntime287?: FastModeOwner287}
  return host.fastModeRuntime287 ??= createFastModeOwner287()
}
// Lazy ports avoid importing an execution/model owner during cyclic initialization.
const liveFastOwner287 = new Proxy({} as FastModeOwner287, {
  get(_target, key) { return Reflect.get(getFastModeOwner287(), key) },
  set(_target, key, value) { return Reflect.set(getFastModeOwner287(), key, value) },
})
/** Readonly getter of the existing canonical live host view; no new owner/proxy. */
export function getCanonicalFastRuntimeView287(): FastModeOwner287 { return liveFastOwner287 }
const fastRejection287 = createFastRejectionKernel287({
  Xl: liveFastOwner287,
  Be: (model, options) => getModelBehaviorName287(model, options),
  xt: APIError, Z: error => error,
  JU: () => getExecutionSession287().modelSelection.refusalFallbackModelLatch() ?? undefined,
  Kc: () => getExecutionSession287().modelSelection.mainLoopModelOverride(),
  Rt: parseUserSpecifiedModel, Py: getDefaultMainLoopModelSetting,
  Ft: () => executionRecommendationGates287.Ft(),
  // Preserve local supported-model C; this is not an original Ry restoration.
  Ry: isFastModeSupportedByModel, To: isFastModeEnabled,
  a8: () => getFastModeUnavailableReason(), tt: getInitialSettings,
  ge: source => getSettingsForSource(source),
  i: (name, data) => logEvent(name, {...data, source: data.source as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
  c: value => value,
  pr: () => getExecutionSession287().surfaceCapabilities.caps().remote as {caps?: {controlChannel?: boolean}; viewerOnly?: boolean} | null,
  d: error => logForDebugging(`[fast-mode] ${String(error)}`, {level: 'debug'}),
  t: message => logForDebugging(message),
})
export const shouldRetainFastModeForModel287 = fastRejection287.Lk
export const isFastModeForModelActive287 = fastRejection287.kbe
export const notifyFastModeModelSwitch287 = fastRejection287.Nk
export const isSelectedFastModeModelRejected287 = fastRejection287.$yt
export const isFastModeFallbackTarget287 = fastRejection287.ZOo
export const markFastModeModelRejected287 = fastRejection287.mVo
export const clearFastModeModelRejections287 = fastRejection287.$7e
export const isFastModeModelRejected287 = fastRejection287.sWt
export const wasFastModeModelRejected287 = fastRejection287.QJn
export const repairFastModeModelRejection287 = fastRejection287.repair
export const onFastModeModelRejectionsChanged287 = fastRejection287.zPe

export function isFastModeEnabled(): boolean {
  return !isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_FAST_MODE)
}

export function isFastModeAvailable(): boolean {
  if (!isFastModeEnabled()) {
    return false
  }
  return getFastModeUnavailableReason() === null
}

type AuthType = 'oauth' | 'api-key'

function getDisabledReasonMessage(
  disabledReason: FastModeDisabledReason,
  authType: AuthType,
): string {
  switch (disabledReason) {
    case 'free':
      return authType === 'oauth'
        ? 'Fast mode requires a paid subscription'
        : 'Fast mode unavailable during evaluation. Please purchase credits.'
    case 'preference':
      return 'Fast mode has been disabled by your organization'
    case 'extra_usage_disabled':
      // Only OAuth users can have extra_usage_disabled; console users don't have this concept
      return 'Fast mode requires extra usage billing · /extra-usage to enable'
    case 'network_error':
      return 'Fast mode unavailable due to network connectivity issues'
    case 'unknown':
      return 'Fast mode is currently unavailable'
  }
}

export function getFastModeUnavailableReason(): string | null {
  const fastOwner287 = getFastModeOwner287()
  if (!isFastModeEnabled()) {
    return 'Fast mode is not available'
  }

  const statigReason = getFeatureValue_CACHED_MAY_BE_STALE(
    'tengu_penguins_off',
    null,
  )
  // Statsig reason has priority over other reasons.
  if (statigReason !== null) {
    logForDebugging(`Fast mode unavailable: ${statigReason}`)
    return statigReason
  }

  // Previously, fast mode required the native binary (bun build). This is no
  // longer necessary, but we keep this option behind a flag just in case.
  if (
    !isInBundledMode() &&
    getFeatureValue_CACHED_MAY_BE_STALE('tengu_marble_sandcastle', false)
  ) {
    return 'Fast mode requires the native binary · Install from: https://claude.com/product/claude-code'
  }

  // Not available in the SDK unless explicitly opted in via --settings.
  // Assistant daemon mode is exempt — it's first-party orchestration, and
  // kairosActive is set before this check runs (main.tsx:~1626 vs ~3249).
  if (
    getIsNonInteractiveSession() &&
    preferThirdPartyAuthentication() &&
    !getKairosActive()
  ) {
    const flagFastMode = getSettingsForSource('flagSettings')?.fastMode
    if (!flagFastMode) {
      const reason = 'Fast mode is not available in the Agent SDK'
      logForDebugging(`Fast mode unavailable: ${reason}`)
      return reason
    }
  }

  // Only available for 1P (not Bedrock/Vertex/Foundry)
  if (getAPIProvider() !== 'firstParty') {
    const reason = 'Fast mode is not available on Bedrock, Vertex, or Foundry'
    logForDebugging(`Fast mode unavailable: ${reason}`)
    return reason
  }

  if (fastOwner287.orgStatus.status === 'disabled') {
    if (
      fastOwner287.orgStatus.reason === 'network_error' ||
      fastOwner287.orgStatus.reason === 'unknown'
    ) {
      // The org check can fail behind corporate proxies that block the
      // endpoint. We add CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS=1 to
      // bypass this check in the CC binary. This is OK since we have
      // another check in the API to error out when disabled by org.
      if (isEnvTruthy(process.env.CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS)) {
        return null
      }
    }
    const authType: AuthType =
      getClaudeAIOAuthTokens() !== null ? 'oauth' : 'api-key'
    const reason = getDisabledReasonMessage(fastOwner287.orgStatus.reason, authType)
    logForDebugging(`Fast mode unavailable: ${reason}`)
    return reason
  }

  return null
}

// @[MODEL LAUNCH]: Update supported Fast Mode models.
export const FAST_MODE_MODEL_DISPLAY = 'Opus 5.5'

export function getFastModeModel(): string {
  return 'opus' + (isOpus1mMergeEnabled() ? '[1m]' : '')
}

export function getInitialFastModeSetting(model: ModelSetting): boolean {
  if (!isFastModeEnabled()) {
    return false
  }
  if (!isFastModeAvailable()) {
    return false
  }
  if (!isFastModeSupportedByModel(model)) {
    return false
  }
  const settings = getInitialSettings()
  // If per-session opt-in is required, fast mode starts off each session
  if (settings.fastModePerSessionOptIn) {
    return false
  }
  return settings.fastMode === true
}

export function isFastModeSupportedByModel(
  modelSetting: ModelSetting,
): boolean {
  if (!isFastModeEnabled()) {
    return false
  }
  const model = modelSetting ?? getDefaultMainLoopModelSetting()
  const parsedModel = parseUserSpecifiedModel(model)
  return parsedModel.toLowerCase().includes('opus-4-6')
}

// --- Fast mode runtime state ---
// Separate from user preference (settings.fastMode). This tracks the actual
// operational state: whether we're actively sending fast speed or in cooldown
// after a rate limit.

export type FastModeRuntimeState =
  | { status: 'active' }
  | { status: 'cooldown'; resetAt: number; reason: CooldownReason }

// --- Cooldown event listeners ---
export type CooldownReason = 'rate_limit' | 'overloaded'

export const onCooldownTriggered = (listener: (resetAt: number, reason: CooldownReason) => void) => getFastModeOwner287().cooldownTriggered.subscribe(listener)
export const onCooldownExpired = (listener: () => void) => getFastModeOwner287().cooldownExpired.subscribe(listener)

export function getFastModeRuntimeState(): FastModeRuntimeState {
  const fastOwner287 = getFastModeOwner287()
  if (
    fastOwner287.runtimeState.status === 'cooldown' &&
    Date.now() >= fastOwner287.runtimeState.resetAt
  ) {
    if (isFastModeEnabled() && !fastOwner287.hasLoggedCooldownExpiry) {
      logForDebugging('Fast mode cooldown expired, re-enabling fast mode')
      fastOwner287.hasLoggedCooldownExpiry = true
      fastOwner287.cooldownExpired.emit()
    }
    fastOwner287.runtimeState = { status: 'active' }
  }
  return fastOwner287.runtimeState
}

export function triggerFastModeCooldown(
  resetTimestamp: number,
  reason: CooldownReason,
): void {
  const fastOwner287 = getFastModeOwner287()
  if (!isFastModeEnabled()) {
    return
  }
  fastOwner287.runtimeState = { status: 'cooldown', resetAt: resetTimestamp, reason }
  fastOwner287.hasLoggedCooldownExpiry = false
  const cooldownDurationMs = resetTimestamp - Date.now()
  logForDebugging(
    `Fast mode cooldown triggered (${reason}), duration ${Math.round(cooldownDurationMs / 1000)}s`,
  )
  logEvent('tengu_fast_mode_fallback_triggered', {
    cooldown_duration_ms: cooldownDurationMs,
    cooldown_reason:
      reason as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  })
  fastOwner287.cooldownTriggered.emit(resetTimestamp, reason)
}

export function clearFastModeCooldown(): void {
  fastRejection287.fU()
}

/**
 * Called when the API rejects a fast mode request (e.g., 400 "Fast mode is
 * not enabled for your organization"). Permanently disables fast mode using
 * the same flow as when the prefetch discovers the org has it disabled.
 */
export function handleFastModeRejectedByAPI(): void {
  const fastOwner287 = getFastModeOwner287()
  if (fastOwner287.orgStatus.status === 'disabled') {
    return
  }
  fastOwner287.orgStatus = { status: 'disabled', reason: 'preference' }
  updateSettingsForSource('userSettings', { fastMode: undefined })
  saveGlobalConfig(current => ({
    ...current,
    penguinModeOrgEnabled: false,
  }))
  fastOwner287.orgFastModeChange.emit(false)
}

// --- Overage rejection listeners ---
// Fired when a 429 indicates fast mode was rejected because extra usage
// (overage billing) is not available. Distinct from org-level disabling.

export const onFastModeOverageRejection = (listener: (message: string) => void) => getFastModeOwner287().overageRejection.subscribe(listener)

function getOverageDisabledMessage(reason: string | null): string {
  switch (reason) {
    case 'out_of_credits':
      return 'Fast mode disabled · extra usage credits exhausted'
    case 'org_level_disabled':
    case 'org_service_level_disabled':
      return 'Fast mode disabled · extra usage disabled by your organization'
    case 'org_level_disabled_until':
      return 'Fast mode disabled · extra usage spending cap reached'
    case 'member_level_disabled':
      return 'Fast mode disabled · extra usage disabled for your account'
    case 'seat_tier_level_disabled':
    case 'seat_tier_zero_credit_limit':
    case 'member_zero_credit_limit':
      return 'Fast mode disabled · extra usage not available for your plan'
    case 'overage_not_provisioned':
    case 'no_limits_configured':
      return 'Fast mode requires extra usage billing · /extra-usage to enable'
    default:
      return 'Fast mode disabled · extra usage not available'
  }
}

function isOutOfCreditsReason(reason: string | null): boolean {
  return reason === 'org_level_disabled_until' || reason === 'out_of_credits'
}

/**
 * Called when a 429 indicates fast mode was rejected because extra usage
 * is not available. Permanently disables fast mode (unless the user has
 * ran out of credits) and notifies with a reason-specific message.
 */
export function handleFastModeOverageRejection(reason: string | null): void {
  const fastOwner287 = getFastModeOwner287()
  const message = getOverageDisabledMessage(reason)
  logForDebugging(
    `Fast mode overage rejection: ${reason ?? 'unknown'} — ${message}`,
  )
  logEvent('tengu_fast_mode_overage_rejected', {
    overage_disabled_reason: (reason ??
      'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  })
  // Disable fast mode permanently unless the user has ran out of credits
  if (!isOutOfCreditsReason(reason)) {
    updateSettingsForSource('userSettings', { fastMode: undefined })
    saveGlobalConfig(current => ({
      ...current,
      penguinModeOrgEnabled: false,
    }))
  }
  fastOwner287.overageRejection.emit(message)
}

export function isFastModeCooldown(): boolean {
  return getFastModeRuntimeState().status === 'cooldown'
}

export function getFastModeState(
  model: ModelSetting,
  fastModeUserEnabled: boolean | undefined,
): 'off' | 'cooldown' | 'on' {
  const enabled =
    isFastModeEnabled() &&
    isFastModeAvailable() &&
    !!fastModeUserEnabled &&
    isFastModeSupportedByModel(model)
  if (enabled && isFastModeCooldown()) {
    return 'cooldown'
  }
  if (enabled) {
    return 'on'
  }
  return 'off'
}

// Disabled reason returned by the API. The API is the canonical source for why
// fast mode is disabled (free account, admin preference, extra usage not enabled).
export type FastModeDisabledReason =
  | 'free'
  | 'preference'
  | 'extra_usage_disabled'
  | 'network_error'
  | 'unknown'

// Org eligibility lives on the same original r_ owner as runtime/rejections.
// Listeners notified when org-level fast mode status changes

export const onOrgFastModeChanged = (listener: (enabled: boolean) => void) => getFastModeOwner287().orgFastModeChange.subscribe(listener)

type FastModeResponse = {
  enabled: boolean
  disabled_reason: FastModeDisabledReason | null
}

// Full ox/rx; prefetch auth selection, recovery, and r_ remain their existing owners.
const fetchFastModeStatus = createFastStatusRequest287<FastModeResponse>({
  dn: getOauthConfig, Mo: getClaudeCodeUserAgent, cp: OAUTH_BETA_HEADER, St: axios,
})

// Complete original admission/publisher/prefetch closure. Mutable cells remain on r_.
const fastStatusLifecycle287 = createFastStatusLifecycle287({
  a: authEnvironment, He: getNativeAPIProvider287, At: isEssentialTrafficOnly,
  lc: getSessionIngressAuthToken, Y: jsonParse, nZ: getAnthropicApiKey,
  Xl: liveFastOwner287, le: getGlobalConfig, ox: fetchFastModeStatus,
  fn: () => getClaudeAIOAuthTokens(), nS: (...args) => handleOAuth401Error(...args),
  hn: (source, settings, _options, storageV5) => updateFastStatusSettings287(source, settings, storageV5),
  Ae: (updater, storageV5) => saveGlobalConfig(current => updater(current) as typeof current, storageV5),
  St: axios, t: logForDebugging, i: (name, data) => logEvent(name, data),
})
export const resolveFastModeStatusFromCache = fastStatusLifecycle287.resolve
export const prefetchFastModeStatus = fastStatusLifecycle287.prefetch
