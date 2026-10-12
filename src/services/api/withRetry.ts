import {isRevokedOAuthToken287} from './officialStreamBoundary287/native.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import {createOfficialProtocolRetry286} from './officialByteWatchdog286/protocol.runtime.js'
import {NPo,$Po} from './officialByteWatchdog286/credential.runtime.js'
import {hasWorkloadIdentityConfiguration} from '../../utils/workloadIdentity.js'
import {publicCredentialRetry286} from './credentialRetry.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {getRetryStatus286, type RetryStatus286} from './retryStatus.js'
import {createOfficialRetryBackoff286} from './officialByteWatchdog286/backoff.runtime.js'
import {createNativeQuotaWindowWait287,type QuotaWindowWaitCallback287} from './officialQuotaWindowWait287/native.js'
import {withLowPriorityAttempt, type LowPriorityAttempt} from '../../utils/lowPriorityRequest.js'
import { createLowPriorityWait, finishLowPriorityWait, isOfficialLowPriorityActive, lowPriorityRetry, waitForLowPriorityCapacity } from '../../utils/lowPriority.js'
import {getAPIProvider, isFirstPartyAnthropicBaseUrl} from '../../utils/model/providers.js'
import { feature } from 'bun:bundle'
import type Anthropic from '@anthropic-ai/sdk'
import {
  APIConnectionError,
  APIError,
  APIUserAbortError,
} from '@anthropic-ai/sdk'
import type { QuerySource } from 'src/constants/querySource.js'
import type { SystemAPIErrorMessage } from 'src/types/message.js'
import { logForDebugging } from 'src/utils/debug.js'
import { logError } from 'src/utils/log.js'
import { createSystemAPIErrorMessage } from 'src/utils/messages.js'
import { getAPIProviderForStatsig } from 'src/utils/model/providers.js'
import {
  clearApiKeyHelperCache,
  clearGcpCredentialsCache,
  handleOAuth401Error,
  getClaudeAIOAuthTokens,
  getAnthropicApiKey,
  isClaudeAISubscriber,
  isEnterpriseSubscriber,
} from '../../utils/auth.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import { errorMessage } from '../../utils/errors.js'
import {
  type CooldownReason,
  isFastModeModelRejected287,
  repairFastModeModelRejection287,
  handleFastModeOverageRejection,
  handleFastModeRejectedByAPI,
  isFastModeCooldown,
  isFastModeEnabled,
  triggerFastModeCooldown,
} from '../../utils/fastMode.js'
import { isNonCustomOpusModel } from '../../utils/model/model.js'
import { disableKeepAlive } from '../../utils/proxy.js'
import { isMTLSReloadError,reloadMTLSAfterFailure } from '../../utils/tlsReload287.js'
import { proxyRetry286 } from '../../utils/proxyAuth.js'
import type { ThinkingConfig } from '../../utils/thinking.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../analytics/index.js'
import {
  checkMockRateLimitError,
  isMockRateLimitError,
} from '../rateLimitMocking.js'
import { REPEATED_529_ERROR_MESSAGE } from './errors.js'
import { extractConnectionErrorDetails } from './errorUtils.js'
import { getFailedClientAuth } from './clientAuth.js'
import {streamWatchdogClock286, getNoResponseRetryDetails, noResponseRetry, type NoResponseRetryLedger286} from './streamWatchdog.js'
import type {ByteWatchdogClock286} from './streamWatchdog.js'
import {waitForRetry286, sleepForStreamRetry286, type RetryWakeSubscription286} from './retryWake.js'

import {modelCallRetry286,isForegroundQuery286,type ModelCallRetries286} from './modelCallRetries.js'

const STALE_CONNECTION_CODES = new Set([
  'ECONNRESET',
  'EPIPE',
  'ConnectionClosed',
  'UND_ERR_SOCKET',
  'ETIMEDOUT',
  'ECONNABORTED',
  'ERR_SOCKET_CLOSED',
  'StreamSuspended',
  'StreamTruncated',
])

export type APIErrorEventSource = 'request_retry' | 'connection_retry'

/**
 * npm 2.1.284 `b0` includes the retry lane on every ordinary retry event.
 * Keep the local SystemAPIErrorMessage contract intact while preserving that
 * wire field for -p, SDK and the Web owner, all of which consume the same
 * generator output.
 */
export function createRetryAPIErrorMessage(
  error: APIError,
  retryInMs: number,
  retryAttempt: number,
  maxRetries: number,
  source: APIErrorEventSource,
): SystemAPIErrorMessage & { source: APIErrorEventSource } {
  const noResponse = getNoResponseRetryDetails(error)
  return {
    ...createSystemAPIErrorMessage(
      error,
      retryInMs,
      retryAttempt,
      maxRetries,
    ),
    source,
    ...(noResponse && { noResponse }),
  }
}

const FLOOR_OUTPUT_TOKENS = 3000
const MAX_529_RETRIES = 3
export const BASE_DELAY_MS = 500

function shouldRetry529(querySource: QuerySource | undefined): boolean {
  return isForegroundQuery286(querySource)
}

// Original typed watchdog switch controls unattended capacity retry. The
// obsolete private feature/env switch is not a second activation path.
const PERSISTENT_MAX_BACKOFF_MS = 5 * 60 * 1000
const PERSISTENT_RESET_CAP_MS = 6 * 60 * 60 * 1000
const HEARTBEAT_INTERVAL_MS = 30_000

function isPersistentRetryEnabled(): boolean {
  return modelCallRetry286.v4() ?? false
}

function isTransientCapacityError(error: unknown): boolean {
  return (
    is529Error(error) || (error instanceof APIError && error.status === 429)
  )
}

function isStaleConnectionError(error: unknown): boolean {
  const details = extractConnectionErrorDetails(error)
  if (!details) return false
  return STALE_CONNECTION_CODES.has(details.code)
}

export interface RetryContext {
  maxTokensOverride?: number
  model: string
  thinkingConfig: ThinkingConfig
  fastMode?: boolean
}

interface RetryOptions {
  credentials?: CredentialStore
  storageV5?: unknown
  maxRetries?: number
  modelCallRetries?: ModelCallRetries286
  model: string
  fallbackModel?: string
  thinkingConfig: ThinkingConfig
  fastMode?: boolean
  /** Original explicit qualification; omitted is not eligibility. */
  modelIsRefusalFallbackTarget?: boolean
  signal?: AbortSignal
  querySource?: QuerySource
  /**
   * Handle a request-scoped protocol incompatibility before normal retry
   * classification. Returning a new repair key retries immediately with the caller's
   * updated request parameters.
   */
  onError?: (error: unknown) => string | null | undefined | Promise<string | null | undefined>
  /**
   * Pre-seed the consecutive 529 counter. Used when this retry loop is a
   * non-streaming fallback after a streaming 529 — the streaming 529 should
   * count toward MAX_529_RETRIES so total 529s-before-fallback is consistent
   * regardless of which request mode hit the overload.
   */
  initialConsecutive529Errors?: number
  /** Query-scoped native budget, shared by retries of the same query only. */
  noResponseRetryLedger?: NoResponseRetryLedger286
  clock?: ByteWatchdogClock286
  random?: () => number
  subscribeRetryWake?: RetryWakeSubscription286
  onRetryStatus?: (status: RetryStatus286) => void
  onQuotaWindowWait?: QuotaWindowWaitCallback287
}

export type RetryStatus = Parameters<NonNullable<RetryOptions['onRetryStatus']>>[0]

export class CannotRetryError extends Error {
  constructor(
    public readonly originalError: unknown,
    public readonly retryContext: RetryContext,
  ) {
    const message = errorMessage(originalError)
    super(message)
    this.name = 'RetryError'

    // Preserve the original stack trace if available
    if (originalError instanceof Error && originalError.stack) {
      this.stack = originalError.stack
    }
  }
}

export class FallbackTriggeredError extends Error {
  constructor(
    public readonly originalModel: string,
    public readonly fallbackModel: string,
  ) {
    super(`Model fallback triggered: ${originalModel} -> ${fallbackModel}`)
    this.name = 'FallbackTriggeredError'
  }
}

export async function* withRetry<T>(
  getClient: () => Promise<Anthropic>,
  operation: (
    client: Anthropic,
    attempt: number,
    context: RetryContext,
  ) => Promise<T>,
  options: RetryOptions,
): AsyncGenerator<SystemAPIErrorMessage, T> {
  const maxRetries = getMaxRetries(options)
  const retryContext: RetryContext = {
    model: options.model,
    thinkingConfig: options.thinkingConfig,
    ...(isFastModeEnabled() && { fastMode: options.fastMode }),
  }
  let client: Anthropic | null = null
  let consecutive529Errors = options.initialConsecutive529Errors ?? 0
  let lastError: unknown
  let reportedMTLSFailure = false
  const protocolRepairKeys = new Set<string>()
  const protocolRetry = createOfficialProtocolRetry286({v4:noResponseRetry.v4,HLt:noResponseRetry.HLt})
  const noResponseRetryLedger = options.noResponseRetryLedger ?? {count: 0}
  let persistentAttempt = 0
  let remoteAuthFailures = 0
  let unchangedOAuthFailures = 0
  const clock = options.clock ?? streamWatchdogClock286
  let retryStatusPublished = false
  const publishRetryStatus = (status: Exclude<RetryStatus286,null>) => {
    retryStatusPublished = true
    options.onRetryStatus?.(status)
  }
  const lowPriorityWait = createLowPriorityWait()
  try {
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    if (options.signal?.aborted) {
      throw new APIUserAbortError()
    }

    if (options.modelCallRetries?.takeApiAttempt() === false) {
      throw new CannotRetryError(new modelCallRetry286.gZ(), retryContext)
    }

    if (retryContext.fastMode && isFastModeModelRejected287(retryContext.model)) {
      retryContext.fastMode = false
    }

    // Capture whether fast mode is active before this attempt
    // (fallback may change the state mid-loop)
    const wasFastModeActive = isFastModeEnabled()
      ? retryContext.fastMode && !isFastModeCooldown()
      : false

    let markedLowPriority = false
    const lowPriorityAttempt: LowPriorityAttempt = {}
    try {
      // Check for mock rate limits (used by /mock-limits command for Ant employees)
      if (process.env.USER_TYPE === 'ant') {
        const mockError = checkMockRateLimitError(
          retryContext.model,
          wasFastModeActive,
        )
        if (mockError) {
          throw mockError
        }
      }

      // Get a fresh client instance on first attempt or after authentication errors
      // - 401 for first-party API authentication failures
      // - 403 "OAuth token has been revoked" (another process refreshed the token)
      // - Bedrock-specific auth errors (403 or CredentialsProviderError)
      // - Vertex-specific auth errors (credential refresh failures, 401)
      // - ECONNRESET/EPIPE: stale keep-alive socket; disable pooling and reconnect
      const isStaleConnection = isStaleConnectionError(lastError)
      if (isMTLSReloadError(lastError)) {
        const rotation = await reloadMTLSAfterFailure(!reportedMTLSFailure)
        if (rotation.reportedFailure) reportedMTLSFailure = true
        if (rotation.attempted) client = null
      }
      if (isStaleConnection) {
        if (
          getFeatureValue_CACHED_MAY_BE_STALE(
            'tengu_disable_keepalive_on_econnreset',
            false,
          )
        ) {
          logForDebugging(
            'Stale connection (ECONNRESET/EPIPE) — disabling keep-alive for retry',
          )
          disableKeepAlive()
        }
      }

      if (
        client === null ||
        publicCredentialRetry286.DLt(lastError, retryContext.model) ||
        isVertexAuthError(lastError) ||
        isStaleConnection
      ) {
        // Official Voe/Hz: recover the failed request's selected identity, not
        // whatever login is now stored. Cloud/untracked/custom/key auth must
        // never refresh an unrelated saved OAuth credential.
        if (
          (lastError instanceof APIError && lastError.status === 401) ||
          isOAuthTokenRevokedError(lastError)
        ) {
          const failedAuth = getFailedClientAuth(client, lastError instanceof APIError ? lastError.headers : undefined)
          if (failedAuth?.kind === 'wif') failedAuth.invalidate()
          else if (failedAuth?.kind === 'oauth') {
            await handleOAuth401Error(failedAuth.token, options.credentials, options.storageV5)
            if (getClaudeAIOAuthTokens()?.accessToken === failedAuth.token) {
              if (filesCredentialSlots.sdkOAuthTokenRefreshCallback() !== null ||
                  !publicCredentialRetry286.FI(lastError) && ++unchangedOAuthFailures >= $Po) {
                throw new CannotRetryError(lastError, retryContext)
              }
            } else unchangedOAuthFailures = 0
          }
        }
        client = await getClient()
      }

      markedLowPriority = getAPIProvider() === 'firstParty' && isFirstPartyAnthropicBaseUrl() &&
        isClaudeAISubscriber() && isOfficialLowPriorityActive()
      const result = await withLowPriorityAttempt(lowPriorityAttempt, () => operation(client!, attempt, retryContext))
      // The native quota owner accounts response headers at the caller.
      // Retry completion only finishes this attempt's capacity wait.
      finishLowPriorityWait(lowPriorityWait, true)
      return result
    } catch (error) {
      if (error instanceof CannotRetryError || error instanceof APIUserAbortError) throw error
      if (options.modelCallRetries?.outOfApiAttempts()) {
        throw new CannotRetryError(error, retryContext)
      }
      lastError = error
      logForDebugging(
        `API error (attempt ${attempt}/${maxRetries + 1}): ${error instanceof APIError ? `${error.status} ${error.message}` : errorMessage(error)}`,
        { level: 'error' },
      )

      // Count the genuine SDK cause before protocol callbacks, exactly once per
      // failed attempt. A new query owns a new ledger; never a session-wide ban.
      if (noResponseRetry.ljt(error) !== undefined) {
        if (!noResponseRetry.v4() && noResponseRetryLedger.count >= noResponseRetry.HLt) {
          throw new CannotRetryError(error, retryContext)
        }
        noResponseRetryLedger.count++
      }

      // Ese: one immediate retry for each distinct protocol repair, without
      // spending the ordinary retry count. API-attempt/no-response limits above
      // still apply; the set belongs only to this invocation, not the session.
      const repairKey = await options.onError?.(error)
      if (repairKey && !protocolRepairKeys.has(repairKey)) {
        protocolRepairKeys.add(repairKey)
        if (error instanceof APIError) {
          const serialized = getRetryStatus286().serializeError(error)
          if (serialized.noResponse) {
            const reportedMax = protocolRetry.NLt(serialized, attempt, maxRetries, noResponseRetryLedger.count)
            publishRetryStatus({kind:'retrying',error:serialized,attempt,maxRetries:reportedMax,retryInMs:0,deadline:clock.now()})
            yield createRetryAPIErrorMessage(error, 0, attempt, reportedMax, 'request_retry')
          }
        }
        attempt--
        continue
      }

      // Official dUn: capacity waits are a separate bounded budget, not part
      // of the ordinary retry count. Run before speed/model retry decisions.
      if (lowPriorityAttempt.markedAtDispatch === false) markedLowPriority = false
      const wasLowPriorityActive = isOfficialLowPriorityActive()
      const lowPriority = lowPriorityRetry(error, markedLowPriority, options.querySource, lowPriorityWait)
      if (lowPriority) {
        publishRetryStatus(getRetryStatus286().createLowPriorityWaiting(
          lowPriority.attempt, lowPriority.delayMs, clock.now() + lowPriority.delayMs))
        if (error instanceof APIError) yield createSystemAPIErrorMessage(error, lowPriority.delayMs, lowPriority.attempt, maxRetries)
        await waitForLowPriorityCapacity(lowPriority.delayMs, options.signal,
          (ms, signal) => sleepForStreamRetry286(ms, signal, clock))
        attempt--
        continue
      }
      if (markedLowPriority && wasLowPriorityActive && !isOfficialLowPriorityActive()) {
        // Budget/weekly/off/ineligible/wall/max-wait terminal decisions must
        // not fall into persistent or ordinary capacity retries afterwards.
        throw new CannotRetryError(error, retryContext)
      }

      // Fast mode fallback: on 429/529, either wait and retry (short delays)
      // or fall back to standard speed (long delays) to avoid cache thrashing.
      // Skip in persistent mode: the short-retry path below loops with fast
      // mode still active, so its `continue` never reaches the attempt clamp
      // and the for-loop terminates. Persistent sessions want the chunked
      // keep-alive path instead of fast-mode cache-preservation anyway.
      if (
        wasFastModeActive &&
        !isPersistentRetryEnabled() &&
        error instanceof APIError &&
        (error.status === 429 || is529Error(error))
      ) {
        // If the 429 is specifically because extra usage (overage) is not
        // available, permanently disable fast mode with a specific message.
        const overageReason = error.headers?.get(
          'anthropic-ratelimit-unified-overage-disabled-reason',
        )
        if (overageReason !== null && overageReason !== undefined) {
          handleFastModeOverageRejection(overageReason)
          retryContext.fastMode = false
          continue
        }

        const retryAfterMs = getRetryAfterMs(error)
        if (retryAfterMs !== null && retryAfterMs < SHORT_RETRY_THRESHOLD_MS) {
          // Short retry-after: wait and retry with fast mode still active
          // to preserve prompt cache (same model name on retry).
          await waitForRetry286(retryAfterMs, options)
          continue
        }
        // Long or unknown retry-after: enter cooldown (switches to standard
        // speed model), with a minimum floor to avoid flip-flopping.
        const cooldownMs = Math.max(
          retryAfterMs ?? DEFAULT_FAST_MODE_FALLBACK_HOLD_MS,
          MIN_COOLDOWN_MS,
        )
        const cooldownReason: CooldownReason = is529Error(error)
          ? 'overloaded'
          : 'rate_limit'
        triggerFastModeCooldown(Date.now() + cooldownMs, cooldownReason)
        if (isFastModeEnabled()) {
          retryContext.fastMode = false
        }
        continue
      }

      // Original iae: qualified speed rejection records before standard-speed retry.
      // Ordinary retry/fallback policy below remains unchanged.
      if (repairFastModeModelRejection287(!!wasFastModeActive, error, retryContext, options)) {
        if (isPersistentRetryEnabled()) attempt--
        continue
      }

      // Fast mode fallback: if the API rejects the fast mode parameter
      // (e.g., org doesn't have fast mode enabled), permanently disable fast
      // mode and retry at standard speed.
      if (wasFastModeActive && isFastModeNotEnabledError(error)) {
        handleFastModeRejectedByAPI()
        retryContext.fastMode = false
        continue
      }

      // Non-foreground sources bail immediately on 529 — no retry amplification
      // during capacity cascades. User never sees these fail.
      if (is529Error(error) && !shouldRetry529(options.querySource)) {
        logEvent('tengu_api_529_background_dropped', {
          query_source:
            options.querySource as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        })
        throw new CannotRetryError(error, retryContext)
      }

      // Track consecutive 529 errors
      if (
        is529Error(error) &&
        // If FALLBACK_FOR_ALL_PRIMARY_MODELS is not set, fall through only if the primary model is a non-custom Opus model.
        // TODO: Revisit if the isNonCustomOpusModel check should still exist, or if isNonCustomOpusModel is a stale artifact of when Claude Code was hardcoded on Opus.
        (process.env.FALLBACK_FOR_ALL_PRIMARY_MODELS ||
          (!isClaudeAISubscriber() && isNonCustomOpusModel(options.model)))
      ) {
        consecutive529Errors++
        if (consecutive529Errors >= MAX_529_RETRIES) {
          // Check if fallback model is specified
          if (options.fallbackModel) {
            logEvent('tengu_api_opus_fallback_triggered', {
              original_model:
                options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              fallback_model:
                options.fallbackModel as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              provider: getAPIProviderForStatsig(),
            })

            // Throw special error to indicate fallback was triggered
            throw new FallbackTriggeredError(
              options.model,
              options.fallbackModel,
            )
          }

          if (
            process.env.USER_TYPE === 'external' &&
            !process.env.IS_SANDBOX &&
            !isPersistentRetryEnabled()
          ) {
            logEvent('tengu_api_custom_529_overloaded_error', {})
            throw new CannotRetryError(
              new Error(REPEATED_529_ERROR_MESSAGE),
              retryContext,
            )
          }
        }
      }

      // Only retry if the error indicates we should
      const persistent =
        isPersistentRetryEnabled() && isTransientCapacityError(error)
      if (attempt > maxRetries && !persistent) {
        const failedAuth = getFailedClientAuth(client, error instanceof APIError ? error.headers : undefined)
        // Ese's separate credential allowance is not an ordinary retry. Only
        // the identity selected for this failed request may renew OAuth/WIF.
        const qualified = !(error instanceof APIError && error.status === 401) ||
          failedAuth?.kind === 'oauth' || publicCredentialRetry286.vse(error) ||
          !getAnthropicApiKey() && hasWorkloadIdentityConfiguration()
        if (!publicCredentialRetry286.DLt(error, retryContext.model) || !qualified ||
            options.modelCallRetries?.takeCredentialRenewal() !== true) {
          throw new CannotRetryError(error, retryContext)
        }
        attempt--
      }
      if (publicCredentialRetry286.FI(error)) {
        if (remoteAuthFailures >= NPo) {
          throw new CannotRetryError(error, retryContext)
        }
        remoteAuthFailures++
      }

      // GCP credential errors aren't always APIError, but can be retried.
      const handledCloudAuthError = handleGcpCredentialError(error)
      if (
        !handledCloudAuthError &&
        (!(error instanceof APIError) || !shouldRetry(error))
      ) {
        throw new CannotRetryError(error, retryContext)
      }

      // Handle max tokens context overflow errors by adjusting max_tokens for the next attempt
      // NOTE: With extended-context-window beta, this 400 error should not occur.
      // The API now returns 'model_context_window_exceeded' stop_reason instead.
      // Keeping for backward compatibility.
      if (error instanceof APIError) {
        const overflowData = parseMaxTokensContextOverflowError(error)
        if (overflowData) {
          const { inputTokens, contextLimit } = overflowData

          const safetyBuffer = 1000
          const availableContext = Math.max(
            0,
            contextLimit - inputTokens - safetyBuffer,
          )
          if (availableContext < FLOOR_OUTPUT_TOKENS) {
            logError(
              new Error(
                `availableContext ${availableContext} is less than FLOOR_OUTPUT_TOKENS ${FLOOR_OUTPUT_TOKENS}`,
              ),
            )
            throw error
          }
          // Ensure we have enough tokens for thinking + at least 1 output token
          const minRequired =
            (retryContext.thinkingConfig.type === 'enabled'
              ? retryContext.thinkingConfig.budgetTokens
              : 0) + 1
          const adjustedMaxTokens = Math.max(
            FLOOR_OUTPUT_TOKENS,
            availableContext,
            minRequired,
          )
          retryContext.maxTokensOverride = adjustedMaxTokens

          logEvent('tengu_max_tokens_context_overflow_adjustment', {
            inputTokens,
            contextLimit,
            adjustedMaxTokens,
            attempt,
          })

          continue
        }
      }

      // For other errors, proceed with normal retry logic
      // Get retry-after header if available
      const retryAfter = getRetryAfter(error)
      let delayMs: number
      let quotaWindowError: APIError | null = null
      if (persistent && error instanceof APIError && error.status === 429) {
        persistentAttempt++
        // Window-based limits (e.g. 5hr Max/Pro) include a reset timestamp.
        // Wait until reset rather than polling every 5 min uselessly.
        const resetDelay = nativeQuotaWindowWait287.resetDelay(error, clock)
        if (resetDelay !== null && error.headers?.get('anthropic-ratelimit-unified-status') === 'rejected') {
          quotaWindowError = error
        }
        delayMs =
          resetDelay ??
          Math.min(
            getRetryDelay(
              persistentAttempt,
              retryAfter,
              PERSISTENT_MAX_BACKOFF_MS,
            options.random,
            ),
            PERSISTENT_RESET_CAP_MS,
          )
      } else if (persistent) {
        persistentAttempt++
        // Retry-After is a server directive and bypasses maxDelayMs inside
        // getRetryDelay (intentional — honoring it is correct). Cap at the
        // 6hr reset-cap here so a pathological header can't wait unbounded.
        delayMs = Math.min(
          getRetryDelay(
            persistentAttempt,
            retryAfter,
            PERSISTENT_MAX_BACKOFF_MS,
            options.random,
          ),
          PERSISTENT_RESET_CAP_MS,
        )
      } else {
        delayMs = getRetryDelay(attempt, retryAfter, undefined, options.random)
      }

      // In persistent mode the for-loop `attempt` is clamped at maxRetries+1;
      // use persistentAttempt for telemetry/yields so they show the true count.
      const reportedAttempt = persistent ? persistentAttempt : attempt
      const reportedMaxRetries = noResponseRetry.NLt(
        {noResponse: getNoResponseRetryDetails(error)}, reportedAttempt, maxRetries, noResponseRetryLedger.count,
      )
      // Ese emits request_retry for dispatch failures, including connection
      // errors. PNt alone emits connection_retry for an opened SSE stream.
      const retrySource: APIErrorEventSource = 'request_retry'
      options.modelCallRetries?.reportHttpFailure(error, 'retry')
      logEvent('tengu_api_retry', {
        attempt: reportedAttempt,
        delayMs: delayMs,
        error: (error as APIError)
          .message as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        status: (error as APIError).status,
        provider: getAPIProviderForStatsig(),
      })

      const finishQuotaWindowWait = nativeQuotaWindowWait287.begin(
        options, quotaWindowError, clock, delayMs, reportedAttempt, maxRetries,
      )
      try {
        if (persistent) {
          if (delayMs > 60_000) {
            logEvent('tengu_api_persistent_retry_wait', {
              status: (error as APIError).status,
              delayMs,
              attempt: reportedAttempt,
              provider: getAPIProviderForStatsig(),
            })
          }
          // Chunk long sleeps so the host sees periodic stdout activity and
          // does not mark the session idle. Each yield surfaces as
          // {type:'system', subtype:'api_retry'} on stdout via QueryEngine.
          let remaining = delayMs
          while (remaining > 0) {
            if (options.signal?.aborted) throw new APIUserAbortError()
            if (error instanceof APIError) {
              publishRetryStatus(getRetryStatus286().createRetrying(error, reportedAttempt, reportedMaxRetries, remaining, clock.now() + remaining))
              yield createRetryAPIErrorMessage(
                error,
                remaining,
                reportedAttempt,
                reportedMaxRetries,
                retrySource,
              )
            }
            const chunk = Math.min(remaining, HEARTBEAT_INTERVAL_MS)
            if (await waitForRetry286(chunk, options)) break
            remaining -= chunk
          }
          // Clamp so the for-loop never terminates. Backoff uses the separate
          // persistentAttempt counter which keeps growing to the 5-min cap.
          if (attempt >= maxRetries) attempt = maxRetries
        } else {
          if (error instanceof APIError) {
            publishRetryStatus(getRetryStatus286().createRetrying(error, attempt, reportedMaxRetries, delayMs, clock.now() + delayMs))
            yield createRetryAPIErrorMessage(
              error,
              delayMs,
              attempt,
              reportedMaxRetries,
              retrySource,
            )
          }
          await waitForRetry286(delayMs, options)
        }
      } finally {
        finishQuotaWindowWait()
      }
    }
  }

  throw new CannotRetryError(lastError, retryContext)
  } finally {
    if (retryStatusPublished) options.onRetryStatus?.(null)
    finishLowPriorityWait(lowPriorityWait)
  }
}

function getRetryAfter(error: unknown): string | null {
  return (
    ((error as { headers?: { 'retry-after'?: string } }).headers?.[
      'retry-after'
    ] ||
      // eslint-disable-next-line eslint-plugin-n/no-unsupported-features/node-builtins
      ((error as APIError).headers as Headers)?.get?.('retry-after')) ??
    null
  )
}

const nativeRetryBackoff286 = createOfficialRetryBackoff286({Math, parseInt, isNaN})
export function getRetryDelay(
  attempt: number,
  retryAfterHeader?: string | null,
  maxDelayMs = 32000,
  random?: () => number,
): number {
  return nativeRetryBackoff286(attempt, retryAfterHeader, maxDelayMs, random)
}

export function parseMaxTokensContextOverflowError(error: APIError):
  | {
      inputTokens: number
      maxTokens: number
      contextLimit: number
    }
  | undefined {
  if (error.status !== 400 || !error.message) {
    return undefined
  }

  if (
    !error.message.includes(
      'input length and `max_tokens` exceed context limit',
    )
  ) {
    return undefined
  }

  // Example format: "input length and `max_tokens` exceed context limit: 188059 + 20000 > 200000"
  const regex =
    /input length and `max_tokens` exceed context limit: (\d+) \+ (\d+) > (\d+)/
  const match = error.message.match(regex)

  if (!match || match.length !== 4) {
    return undefined
  }

  if (!match[1] || !match[2] || !match[3]) {
    logError(
      new Error(
        'Unable to parse max_tokens from max_tokens exceed context limit error message',
      ),
    )
    return undefined
  }
  const inputTokens = parseInt(match[1], 10)
  const maxTokens = parseInt(match[2], 10)
  const contextLimit = parseInt(match[3], 10)

  if (isNaN(inputTokens) || isNaN(maxTokens) || isNaN(contextLimit)) {
    return undefined
  }

  return { inputTokens, maxTokens, contextLimit }
}

// TODO: Replace with a response header check once the API adds a dedicated
// header for fast-mode rejection (e.g., x-fast-mode-rejected). String-matching
// the error message is fragile and will break if the API wording changes.
function isFastModeNotEnabledError(error: unknown): boolean {
  if (!(error instanceof APIError)) {
    return false
  }
  return (
    error.status === 400 &&
    (error.message?.includes('Fast mode is not enabled') ?? false)
  )
}

export function is529Error(error: unknown): boolean {
  if (!(error instanceof APIError)) {
    return false
  }

  // Check for 529 status code or overloaded error in message
  return (
    error.status === 529 ||
    // See below: the SDK sometimes fails to properly pass the 529 status code during streaming
    (error.message?.includes('"type":"overloaded_error"') ?? false)
  )
}

function isOAuthTokenRevokedError(error: unknown): boolean {
  return isRevokedOAuthToken287(error)
}

// google-auth-library can throw plain Error. Match common SDK-level
// credential-failure messages.
function isGoogleAuthLibraryCredentialError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  const msg = error.message
  return (
    msg.includes('Could not load the default credentials') ||
    msg.includes('Could not refresh access token') ||
    msg.includes('invalid_grant')
  )
}

function isVertexAuthError(error: unknown): boolean {
  if (isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX)) {
    // SDK-level: google-auth-library fails in prepareOptions() before the HTTP call
    if (isGoogleAuthLibraryCredentialError(error)) {
      return true
    }
    // Server-side: Vertex returns 401 for expired/invalid tokens
    if (error instanceof APIError && error.status === 401) {
      return true
    }
  }
  return false
}

/**
 * Clear GCP auth caches if appropriate.
 * @returns true if action was taken.
 */
function handleGcpCredentialError(error: unknown): boolean {
  if (isVertexAuthError(error)) {
    clearGcpCredentialsCache()
    return true
  }
  return false
}

function shouldRetry(error: APIError): boolean {
  // Never retry mock errors - they're from /mock-limits command for testing
  if (isMockRateLimitError(error)) {
    return false
  }

  // Persistent mode: 429/529 always retryable, bypass subscriber gates and
  // x-should-retry header.
  if (isPersistentRetryEnabled() && isTransientCapacityError(error)) {
    return true
  }

  // CCR mode: auth is via infrastructure-provided JWTs, so a 401/403 is a
  // transient blip (auth service flap, network hiccup) rather than bad
  // credentials. Bypass x-should-retry:false — the server assumes we'd retry
  // the same bad key, but our key is fine.
  if (
    isEnvTruthy(process.env.CLAUDE_CODE_REMOTE) &&
    (error.status === 401 || error.status === 403)
  ) {
    return true
  }

  // Check for overloaded errors first by examining the message content
  // The SDK sometimes fails to properly pass the 529 status code during streaming,
  // so we need to check the error message directly
  if (error.message?.includes('"type":"overloaded_error"')) {
    return true
  }

  // Check for max tokens context overflow errors that we can handle
  if (parseMaxTokensContextOverflowError(error)) {
    return true
  }

  // Native lMo recognizes even an absent Proxy-Authenticate challenge, then
  // clears the actual cache. The next constructor runs the existing helper;
  // recognition itself neither executes it nor skips normal retry reporting.
  const proxyChallenge = proxyRetry286.UOe(error)
  if (proxyChallenge !== undefined) {
    if (!proxyRetry286.BPe()) return false
    proxyRetry286.VWt(proxyChallenge.proxyAuthenticate)
    return true
  }

  // Note this is not a standard header.
  const shouldRetryHeader = error.headers?.get('x-should-retry')

  // If the server explicitly says whether or not to retry, obey.
  // For Max and Pro users, should-retry is true, but in several hours, so we shouldn't.
  // Enterprise users can retry because they typically use PAYG instead of rate limits.
  if (
    shouldRetryHeader === 'true' &&
    (!isClaudeAISubscriber() || isEnterpriseSubscriber())
  ) {
    return true
  }

  // Ants can ignore x-should-retry: false for 5xx server errors only.
  // For other status codes (401, 403, 400, 429, etc.), respect the header.
  if (shouldRetryHeader === 'false') {
    const is5xxError = error.status !== undefined && error.status >= 500
    if (!(process.env.USER_TYPE === 'ant' && is5xxError)) {
      return false
    }
  }

  if (error instanceof APIConnectionError) {
    return true
  }

  if (!error.status) return false

  // Retry on request timeouts.
  if (error.status === 408) return true

  // Retry on lock timeouts.
  if (error.status === 409) return true

  // Retry on rate limits, but not for ClaudeAI Subscription users
  // Enterprise users can retry because they typically use PAYG instead of rate limits
  if (error.status === 429) {
    return !isClaudeAISubscriber() || isEnterpriseSubscriber()
  }

  // Clear API key cache on 401 and allow retry.
  // OAuth token handling is done in the main retry loop via handleOAuth401Error.
  if (error.status === 401) {
    clearApiKeyHelperCache()
    return true
  }

  if (publicCredentialRetry286.vse(error)) return true

  // Retry on 403 "token revoked" (same refresh logic as 401, see above)
  if (isOAuthTokenRevokedError(error)) {
    return true
  }

  // Retry internal errors.
  if (error.status && error.status >= 500) return true

  return false
}

export function getDefaultMaxRetries(): number {
  return modelCallRetry286.qOe()
}

function getMaxRetries(options: RetryOptions): number {
  return options.maxRetries ?? getDefaultMaxRetries()
}

const DEFAULT_FAST_MODE_FALLBACK_HOLD_MS = 30 * 60 * 1000 // 30 minutes
const SHORT_RETRY_THRESHOLD_MS = 20 * 1000 // 20 seconds
const MIN_COOLDOWN_MS = 10 * 60 * 1000 // 10 minutes

function getRetryAfterMs(error: APIError): number | null {
  const retryAfter = getRetryAfter(error)
  if (retryAfter) {
    const seconds = parseInt(retryAfter, 10)
    if (!isNaN(seconds)) {
      return seconds * 1000
    }
  }
  return null
}

const nativeQuotaWindowWait287 = createNativeQuotaWindowWait287({logError})
