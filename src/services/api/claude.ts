import {createPostTurnCacheAttemptRecorder287} from '../../query/postTurnClient287/index.js'
import {createToolSearchResponse287,createToolSearchStream287,serializeToolSearchMessages287} from './toolSearchRequest287.js'
import {getRequestCacheTTL287} from './requestCacheTTL287.js'
import {getSystemCacheSerializer287} from './systemCache287.js'
import type {SystemCacheTextBlock287} from './officialSystemCache287/native.js'
import {getServerClassifier287,isServerClassifierRefused287} from '../../utils/permissions/serverClassifier287/index.js'
import type {AutoModeServerContext287,ServerRequest287} from '../../utils/permissions/serverClassifier287/native.js'
import {getModelBetaProducer287} from '../../utils/modelBetas287.js'
import {getExecutionSession287} from '../context/execution287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getRetryStatus286} from './retryStatus.js'
import {notifyPolicyModelSuccess287} from '../policyLimits/controllerEvents287.js'
import {createStreamBoundary287,isHiddenStreamBlock287} from './officialStreamBoundary287/native.js'
import {streamFailurePredicates286,StreamMalformedEventError286,partialStreamFinal286,isOverloadedStreamError286} from './streamFailure.js'
import {modelCallRetry286,isForegroundQuery286,type ModelCallRetries286} from './modelCallRetries.js'
import {sleepForStreamRetry286} from './retryWake.js'
import {sleep} from '../../utils/sleep.js'
import {THINKING_BINDING_BETA, applyThinkingBinding, betaWasSent, getThinkingBindingState,
  isThinkingBindingUnsupported, rejectBeta, resolveBindingBehavior, sanitizeDisabledThinking, sendBeta, type StickyBetaState} from './thinkingBinding.js'
import {getRemoteManagedSettingsClientInjection, hasGatewayInjection} from '../remoteManagedSettings/clientRuntime.js'
import {createSystemAPIErrorMessage} from '../../utils/messages.js'
import {createLowPriorityWait, finishLowPriorityWait, observeLowPriorityHeaders, isOfficialLowPriorityActive, lowPriorityRetry, waitForLowPriorityCapacity} from '../../utils/lowPriority.js'
import { getCompactStripPlans, applyCompactStripPlans, getCompactRequestHeaders, type CompactRequestOptions } from '../compact/request.js'
import type {
  BetaContentBlock,
  BetaContentBlockParam,
  BetaJSONOutputFormat,
  BetaMessage,
  BetaMessageDeltaUsage,
  BetaMessageStreamParams,
  BetaOutputConfig,
  BetaRawMessageStreamEvent,
  BetaStopReason,
  BetaToolChoiceAuto,
  BetaToolChoiceTool,
  BetaToolResultBlockParam,
  BetaToolUnion,
  BetaUsage,
  BetaMessageParam as MessageParam,
} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type { TextBlockParam } from '@anthropic-ai/sdk/resources/index.mjs'
import type { Stream } from '@anthropic-ai/sdk/streaming.mjs'
import { randomUUID } from 'crypto'
import {
  getAPIProvider,
  isFirstPartyAnthropicBaseUrl,
  isFirstPartyRequestEndpoint,
} from 'src/utils/model/providers.js'
import {
  getAttributionHeader,
  getCLISyspromptPrefix,
} from '../../constants/system.js'
import {
  getEmptyToolPermissionContext,
  type QueryChainTracking,
  type Tool,
  type ToolPermissionContext,
  type Tools,
  toolMatchesName,
} from '../../Tool.js'
import type { AgentDefinition } from '../../tools/AgentTool/loadAgentsDir.js'
import {
  type ConnectorTextBlock,
  type ConnectorTextDelta,
  isConnectorTextBlock,
} from '../../types/connectorText.js'
import type {
  AssistantMessage,
  Message,
  StreamEvent,
  SystemAPIErrorMessage,
  UserMessage,
} from '../../types/message.js'
import {
  type CacheScope,
  logAPIPrefix,
  toolToAPISchema,
} from '../../utils/api.js'
import { getOauthAccountInfo } from '../../utils/auth.js'
import {
  getMergedBetas,
  getModelBetas,
} from '../../utils/betas.js'
import { getOrCreateUserID } from '../../utils/config.js'
import {
  CAPPED_DEFAULT_MAX_TOKENS,
  getModelMaxOutputTokens,
  getSonnet1mExpTreatmentEnabled,
} from '../../utils/context.js'
import { resolveAppliedEffort } from '../../utils/effort.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import { getInitialSettings } from '../../utils/settings/settings.js'
import { oc as hasComplianceTaint } from '../../vendor/official-files-api/taints.js'
import { errorMessage } from '../../utils/errors.js'
import { computeFingerprintFromMessages } from '../../utils/fingerprint.js'
import { captureAPIRequest, logError } from '../../utils/log.js'
import {
  createAssistantAPIErrorMessage,
  createUserMessage,
  ensureToolResultPairing,
  normalizeContentFromAPI,
  normalizeMessagesForAPI,
  sanitizeErrorToolResultContent,
  stripAdvisorBlocks,
  stripCallerFieldFromAssistantMessage,
  stripToolReferenceBlocksFromUserMessage,
} from '../../utils/messages.js'
import {
  getDefaultOpusModel,
  getDefaultSonnetModel,
  getSmallFastModel,
  isNonCustomOpusModel,
} from '../../utils/model/model.js'
import {
  asSystemPrompt,
  type SystemPrompt,
} from '../../utils/systemPromptType.js'
import { tokenCountFromLastAPIResponse } from '../../utils/tokens.js'
import { getDynamicConfig_BLOCKS_ON_INIT } from '../analytics/growthbook.js'
import {
  currentLimits,
  getQuotaAccountEpoch,
  getQuotaOwner287,
  getQuotaLimitsFromError,
  extractGraceStatusFromHeaders,
  extractQuotaStatusFromError,
  extractQuotaStatusFromHeaders,
} from '../claudeAiLimits.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import type {QuotaWindowWaitMetadata287} from './officialQuotaWindowWait287/native.js'
import {quotaSource} from '../usageLimitEvents.js'
import {createNativeQuotaContext287} from '../officialQuotaOwner287/context.js'
import {is1mContextDisabled} from '../../utils/context.js'
import {getCatalogEntry} from '../../utils/model/catalog.js'
import {getCanonicalName} from '../../utils/model/model.js'
import { getAPIContextManagement } from '../compact/apiMicrocompact.js'

const quotaContext = createNativeQuotaContext287({a: {get CLAUDE_CODE_DISABLE_1M_CONTEXT() {return is1mContextDisabled()}}, Be: getCanonicalName, xa: getCatalogEntry})
function quotaLongContext(model: string, usage: {input_tokens?: number;cache_read_input_tokens?: number|null;cache_creation_input_tokens?: number|null}) {
  return (quotaContext.zd(model) || quotaContext.qS(model)) &&
    (usage.input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0) + (usage.cache_creation_input_tokens ?? 0) > 200_000
}
function quotaGraceEligible(source: string) {
  return source.startsWith('repl_main_thread') || source === 'sdk' || source.startsWith('agent:') || source === 'hook_agent'
}

function beginQuotaWindowWait(error: APIError, metadata: QuotaWindowWaitMetadata287, source: string,
  model: string, epoch: number, clock: {now(): number}, isSubagent: boolean, storageV5?: unknown) {
  const scope = isSubagent ? 'other' : source
  extractQuotaStatusFromError(error, scope, clock.now(), epoch, storageV5)
  return getQuotaOwner287().beginUsageLimitWait({route: quotaSource(scope), querySource: source, model,
    rateLimitType: getQuotaLimitsFromError(error).rateLimitType, ...metadata})
}

/* eslint-disable @typescript-eslint/no-require-imports */
const autoModeStateModule = feature('TRANSCRIPT_CLASSIFIER')
  ? (require('../../utils/permissions/autoModeState.js') as typeof import('../../utils/permissions/autoModeState.js'))
  : null

import type {RetryStatus} from './withRetry.js'
import { feature } from 'bun:bundle'
import type { ClientOptions } from '@anthropic-ai/sdk'
import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
} from '@anthropic-ai/sdk/error'
import {
  armStreamFirstResponse,
  type NoResponseRetryLedger286,
  createStreamEventWatchdog286,
  createSlowResponseWarning286,
  streamWatchdogClock286,
  streamEventHeartbeat286,
  type ByteWatchdogClock286,
  type ByteChunkTimes286,
  type EventWatchdogStatus286,
  StreamIdleTimeoutError,
} from './streamWatchdog.js'
import {
  getAfkModeHeaderLatched,
  getCacheDiagnosisHeaderRefused,
  getCacheEditingHeaderLatched,
  getFastModeHeaderLatched,
  getLastApiCompletionTimestamp,
  getPromptCache1hAllowlist,
  getSessionId,
  getThinkingResumptionHeaderRefused,
  getThinkingClearLatched,
  setAfkModeHeaderLatched,
  setCacheDiagnosisHeaderRefused,
  setCacheEditingHeaderLatched,
  setFastModeHeaderLatched,
  setLastMainRequestId,
  setPromptCache1hAllowlist,
  setThinkingResumptionHeaderRefused,
  setThinkingClearLatched,
} from 'src/bootstrap/state.js'
import {
  AFK_MODE_BETA_HEADER,
  CACHE_DIAGNOSIS_BETA_HEADER,
  CONTEXT_1M_BETA_HEADER,
  CONTEXT_MANAGEMENT_BETA_HEADER,
  EFFORT_BETA_HEADER,
  EXTENDED_CACHE_TTL_BETA_HEADER,
  FAST_MODE_BETA_HEADER,
  PROMPT_CACHING_SCOPE_BETA_HEADER,
  REDACT_THINKING_BETA_HEADER,
  STRUCTURED_OUTPUTS_BETA_HEADER,
  TASK_BUDGETS_BETA_HEADER,
  THINKING_DISPLAY_UPDATES_BETA_HEADER,
  THINKING_RESUMPTION_BETA_HEADER,
} from 'src/constants/betas.js'
import type { QuerySource } from 'src/constants/querySource.js'
import type { Notification } from 'src/context/notifications.js'
import { addToTotalSessionCost } from 'src/cost-tracker.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from 'src/services/analytics/growthbook.js'
import type { AgentId } from 'src/types/ids.js'
import {
  ADVISOR_TOOL_INSTRUCTIONS,
  getExperimentAdvisorModels,
  isAdvisorEnabled,
  isValidAdvisorModel,
  modelSupportsAdvisor,
} from 'src/utils/advisor.js'
import { getAgentContext, type AgentContext } from 'src/utils/agentContext.js'
import { getPreviousAPIMessageId, getRequestPromptId, getRequestTurnOrigin, getRequestTurnPosition } from './promptIdentity.js'
import { isClaudeAISubscriber } from 'src/utils/auth.js'
import {
  getToolSearchBetaHeader,
  modelSupportsISP,
  modelSupportsStructuredOutputs,
  shouldUseCacheDiagnosis,
  shouldUseThinkingResumption,
  shouldIncludeFirstPartyOnlyBetas,
} from 'src/utils/betas.js'
import { CLAUDE_IN_CHROME_MCP_SERVER_NAME } from 'src/utils/claudeInChrome/common.js'
import { CHROME_TOOL_SEARCH_INSTRUCTIONS } from 'src/utils/claudeInChrome/prompt.js'
import { getMaxThinkingTokensForModel } from 'src/utils/context.js'
import { logForDebugging } from 'src/utils/debug.js'
import { logForDiagnosticsNoPII } from 'src/utils/diagLogs.js'
import { type EffortValue, modelSupportsEffort } from 'src/utils/effort.js'
import {
  isFastModeModelRejected287,
  isFastModeAvailable,
  isFastModeCooldown,
  isFastModeEnabled,
  isFastModeSupportedByModel,
} from 'src/utils/fastMode.js'
import { returnValue } from 'src/utils/generators.js'
import { headlessProfilerCheckpoint } from 'src/utils/headlessProfiler.js'
import { isMcpInstructionsDeltaEnabled } from 'src/utils/mcpInstructionsDelta.js'
import { calculateUSDCost } from 'src/utils/modelCost.js'
import { endQueryProfile, queryCheckpoint } from 'src/utils/queryProfiler.js'
import {
  canRequestThinkingDisplay,
  modelSupportsAdaptiveThinking,
  modelSupportsThinking,
  resolveThinkingDisplay,
  withThinkingDisplay,
  type ThinkingConfig,
} from 'src/utils/thinking.js'
import {
  extractDiscoveredToolNames,
  isDeferredToolsDeltaEnabled,
  isToolSearchEnabled,
} from 'src/utils/toolSearch.js'
import { API_MAX_MEDIA_PER_REQUEST } from '../../constants/apiLimits.js'
import { ADVISOR_BETA_HEADER } from '../../constants/betas.js'
import {
  formatDeferredToolLine,
  isDeferredTool,
  TOOL_SEARCH_TOOL_NAME,
} from '../../tools/ToolSearchTool/prompt.js'
import { count } from '../../utils/array.js'
import { insertBlockAfterToolResults } from '../../utils/contentArray.js'
import { validateBoundedIntEnvVar } from '../../utils/envValidation.js'
import { safeParseJSON } from '../../utils/json.js'
import {
  normalizeModelStringForAPI,
  parseUserSpecifiedModel,
} from '../../utils/model/model.js'
import {
  startSessionActivity,
  stopSessionActivity,
  getBackgroundActivityAgentId287,
} from '../../utils/sessionActivity.js'
import { jsonStringify } from '../../utils/slowOperations.js'
import {
  endLLMRequestSpan,
  isBetaTracingEnabled,
  type LLMRequestNewContext,
  startLLMRequestSpan,
} from '../../utils/telemetry/sessionTracing.js'
/* eslint-enable @typescript-eslint/no-require-imports */
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../analytics/index.js'
import {
  consumePendingCacheEdits,
  getPinnedCacheEdits,
  markToolsSentToAPIState,
  pinCacheEdits,
} from '../compact/microCompact.js'
import { getInitializationStatus } from '../lsp/manager.js'
import { isToolFromMcpServer } from '../mcp/utils.js'
import { withStreamingVCR, withVCR } from '../vcr.js'
import { CLIENT_REQUEST_ID_HEADER, getAnthropicClient } from './client.js'
import {
  API_ERROR_MESSAGE_PREFIX,
  CUSTOM_OFF_SWITCH_MESSAGE,
  getAssistantMessageFromError,
  getErrorMessageIfRefusal,
} from './errors.js'
import { createRequestErrorClassifier287 } from './errorClassifier287.js'
import {isRefusalMessage,isModelContextExcluded,type RefusalRecoveryMetadata} from './refusalFallback.js'
import {
  EMPTY_USAGE,
  type GlobalCacheStrategy,
  logAPIError,
  logAPIQuery,
  logAPISuccessAndDuration,
  type NonNullableUsage,
} from './logging.js'
import {
  CACHE_TTL_1HOUR_MS,
  checkResponseForCacheBreak,
  recordPromptState,
} from './promptCacheBreakDetection.js'
import {
  CannotRetryError,
  FallbackTriggeredError,
  createRetryAPIErrorMessage,
  is529Error,
  type RetryContext,
  getRetryDelay,
  withRetry,
} from './withRetry.js'

// Define a type that represents valid JSON values
type JsonValue = string | number | boolean | null | JsonObject | JsonArray
type JsonObject = { [key: string]: JsonValue }
type JsonArray = JsonValue[]

/**
 * Assemble the extra body parameters for the API request, based on the
 * CLAUDE_CODE_EXTRA_BODY environment variable if present.
 *
 * @returns A JSON object representing the extra body parameters.
 */
export function getExtraBodyParams(): JsonObject {
  // Parse user's extra body parameters first
  const extraBodyStr = process.env.CLAUDE_CODE_EXTRA_BODY
  let result: JsonObject = {}

  // Official 2.1.284 does not forward this escape hatch when the current
  // organization has disabled experimental betas (the same compliance taint
  // used by the beta-header path).
  if (extraBodyStr && hasComplianceTaint('hipaa')) {
    logForDebugging(
      'CLAUDE_CODE_EXTRA_BODY ignored: experimental betas are disabled by your organization policy',
    )
  } else if (extraBodyStr) {
    try {
      // Parse as JSON, which can be null, boolean, number, string, array or object
      const parsed = safeParseJSON(extraBodyStr)
      // We expect an object with key-value pairs to spread into API parameters
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        // Shallow clone — safeParseJSON is LRU-cached and returns the same
        // object reference for the same string. Mutating `result` below
        // would poison the cache, causing stale values to persist.
        result = { ...(parsed as JsonObject) }
      } else {
        logForDebugging(
          `CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${extraBodyStr}`,
          { level: 'error' },
        )
      }
    } catch (error) {
      logForDebugging(
        `Error parsing CLAUDE_CODE_EXTRA_BODY: ${errorMessage(error)}`,
        { level: 'error' },
      )
    }
  }

  // Keep this byte-for-byte with the 2.1.284 Wq helper.  In particular,
  // afk-mode is only emitted by the auto-mode lane; accepting it from the
  // general extra-body escape hatch changes the request beta fingerprint.
  for (const key of ['betas', 'anthropic_beta']) {
    if (!(key in result)) continue
    const values = String(result[key])
      .split(',')
      .map(value => value.trim())
      .filter(Boolean)
    const filtered = values.filter(
      value => !value.toLowerCase().includes('afk-mode'),
    )
    if (filtered.length !== values.length) {
      logForDebugging(
        `CLAUDE_CODE_EXTRA_BODY ${key}: dropped afk-mode beta from general request body`,
        { level: 'warn' },
      )
      if (filtered.length > 0) result[key] = filtered.join(',')
      else delete result[key]
    }
  }

  // The server-side metadata contract does not accept the internal `tk`
  // field when it is supplied through the user-controlled JSON body.  The
  // official client removes only that field and preserves the rest.
  const metadata = result.metadata
  if (
    metadata !== null &&
    typeof metadata === 'object' &&
    !Array.isArray(metadata) &&
    typeof metadata.user_id === 'string'
  ) {
    const parsedUserId = safeParseJSON(metadata.user_id, false)
    if (
      parsedUserId !== null &&
      typeof parsedUserId === 'object' &&
      !Array.isArray(parsedUserId) &&
      'tk' in parsedUserId
    ) {
      const { tk: _removed, ...sanitizedUserId } = parsedUserId as Record<
        string,
        unknown
      >
      result.metadata = {
        ...metadata,
        user_id: jsonStringify(sanitizedUserId),
      } as JsonObject
    }
  }

  // Anti-distillation: send fake_tools opt-in for 1P CLI only
  if (
    feature('ANTI_DISTILLATION_CC')
      ? process.env.CLAUDE_CODE_ENTRYPOINT === 'cli' &&
        shouldIncludeFirstPartyOnlyBetas() &&
        getFeatureValue_CACHED_MAY_BE_STALE(
          'tengu_anti_distill_fake_tool_injection',
          false,
        )
      : false
  ) {
    result.anti_distillation = ['fake_tools']
  }

  return result
}

export function getPromptCachingEnabled(model: string): boolean {
  // Global disable takes precedence
  if (isEnvTruthy(process.env.DISABLE_PROMPT_CACHING)) return false

  // Check if we should disable for small/fast model
  if (isEnvTruthy(process.env.DISABLE_PROMPT_CACHING_HAIKU)) {
    const smallFastModel = getSmallFastModel()
    if (model === smallFastModel) return false
  }

  // Check if we should disable for default Sonnet
  if (isEnvTruthy(process.env.DISABLE_PROMPT_CACHING_SONNET)) {
    const defaultSonnet = getDefaultSonnetModel()
    if (model === defaultSonnet) return false
  }

  // Check if we should disable for default Opus
  if (isEnvTruthy(process.env.DISABLE_PROMPT_CACHING_OPUS)) {
    const defaultOpus = getDefaultOpusModel()
    if (model === defaultOpus) return false
  }

  return true
}

export function getCacheControl(options: {
  scope?: CacheScope
  querySource?: QuerySource
  agentCacheTtlOverride?: '5m' | '1h'
  cacheTtl?: '1h'
} = {}): {type: 'ephemeral'; ttl?: '1h'; scope?: CacheScope} {
  const ttl = 'cacheTtl' in options ? options.cacheTtl :
    getRequestCacheTTL287().select(options.querySource, {agentCacheTtlOverride: options.agentCacheTtlOverride}).ttl === '1h' ? '1h' : undefined
  return getSystemCacheSerializer287().cacheControl({scope: options.scope, ttl})
}

/**
 * Determines if 1h TTL should be used for prompt caching.
 *
 * An explicit per-agent TTL or environment override is chosen first; absent
 * those, the subscriber/experiment allowlist determines the 1h TTL.
 *
 * GrowthBook config shape: { allowlist: string[] }
 * Patterns support trailing '*' for prefix matching.
 * Examples:
 * - { allowlist: ["repl_main_thread*", "sdk"] } — main thread + SDK only
 * - { allowlist: ["repl_main_thread*", "sdk", "agent:*"] } — also subagents
 * - { allowlist: ["*"] } — all sources
 *
 * The allowlist is cached in the canonical host requestLatches for session stability — prevents mixed
 * TTLs when GrowthBook's disk cache updates mid-request.
 */
function should1hCacheTTL(querySource?: QuerySource, agentCacheTtlOverride?: '5m' | '1h'): boolean {
  return getRequestCacheTTL287().is1h(querySource, {agentCacheTtlOverride})
}

/**
 * Configure effort parameters for API request.
 *
 */
function configureEffortParams(
  effortValue: EffortValue | undefined,
  outputConfig: BetaOutputConfig,
  extraBodyParams: Record<string, unknown>,
  betas: string[],
  model: string,
): void {
  if (!modelSupportsEffort(model) || 'effort' in outputConfig) {
    return
  }

  if (effortValue === undefined) {
    betas.push(EFFORT_BETA_HEADER)
  } else if (typeof effortValue === 'string') {
    // Send string effort level as is
    // The installed SDK typings lag the current API's xhigh value.
    outputConfig.effort = effortValue as BetaOutputConfig['effort']
    betas.push(EFFORT_BETA_HEADER)
  } else if (process.env.USER_TYPE === 'ant') {
    // Numeric effort override - ant-only (uses anthropic_internal)
    const existingInternal =
      (extraBodyParams.anthropic_internal as Record<string, unknown>) || {}
    extraBodyParams.anthropic_internal = {
      ...existingInternal,
      effort_override: effortValue,
    }
  }
}

// output_config.task_budget — API-side token budget awareness for the model.
// Stainless SDK types don't yet include task_budget on BetaOutputConfig, so we
// define the wire shape locally and cast. The API validates on receipt; see
// api/api/schemas/messages/request/output_config.py:12-39 in the monorepo.
// Beta: task-budgets-2026-03-13 (EAP, claude-strudel-eap only as of Mar 2026).
type TaskBudgetParam = {
  type: 'tokens'
  total: number
  remaining?: number
}

export function configureTaskBudgetParams(
  taskBudget: Options['taskBudget'],
  outputConfig: BetaOutputConfig & { task_budget?: TaskBudgetParam },
  betas: string[],
): void {
  if (
    !taskBudget ||
    'task_budget' in outputConfig ||
    !shouldIncludeFirstPartyOnlyBetas()
  ) {
    return
  }
  outputConfig.task_budget = {
    type: 'tokens',
    total: taskBudget.total,
    ...(taskBudget.remaining !== undefined && {
      remaining: taskBudget.remaining,
    }),
  }
  if (!betas.includes(TASK_BUDGETS_BETA_HEADER)) {
    betas.push(TASK_BUDGETS_BETA_HEADER)
  }
}

export function getAPIMetadata() {
  // https://docs.google.com/document/d/1dURO9ycXXQCBS0V4Vhl4poDBRgkelFc5t2BNPoEgH5Q/edit?tab=t.0#heading=h.5g7nec5b09w5
  let extra: JsonObject = {}
  const extraStr = process.env.CLAUDE_CODE_EXTRA_METADATA
  if (extraStr) {
    const parsed = safeParseJSON(extraStr, false)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      extra = parsed as JsonObject
    } else {
      logForDebugging(
        `CLAUDE_CODE_EXTRA_METADATA env var must be a JSON object, but was given ${extraStr}`,
        { level: 'error' },
      )
    }
  }

  return {
    user_id: jsonStringify({
      ...extra,
      device_id: getOrCreateUserID(),
      // Only include OAuth account UUID when actively using OAuth authentication
      account_uuid: getOauthAccountInfo()?.accountUuid ?? '',
      session_id: getSessionId(),
    }),
  }
}

export async function verifyApiKey(
  apiKey: string,
  isNonInteractiveSession: boolean,
  credentials?: CredentialStore,
  storageV5?: unknown,
): Promise<boolean> {
  // Complete nPo shares iae/Zd and the canonical header validator's KG owner.
  return (require('../../utils/toolSchema287.js') as typeof import('../../utils/toolSchema287.js')).getToolSchemaRuntime287().verifyAPIKey287(apiKey, isNonInteractiveSession, credentials, storageV5)
}

export function userMessageToMessageParam(
  message: UserMessage, addCache = false, enablePromptCaching: boolean,
  querySource?: QuerySource, agentCacheTtlOverride?: '5m' | '1h',
): MessageParam {
  const ttl = addCache && enablePromptCaching ? getCacheControl({querySource, agentCacheTtlOverride}).ttl : undefined
  return getRequestCacheTTL287().userMessage(message, addCache, enablePromptCaching, ttl)
}

export function assistantMessageToMessageParam(
  message: AssistantMessage, addCache = false, enablePromptCaching: boolean,
  querySource?: QuerySource, agentCacheTtlOverride?: '5m' | '1h',
): MessageParam {
  const ttl = addCache && enablePromptCaching ? getCacheControl({querySource, agentCacheTtlOverride}).ttl : undefined
  return getRequestCacheTTL287().assistantMessage(message, addCache, enablePromptCaching, ttl, getRequestCacheTTL287().whitespaceUnstampable())
}

function hasResumableThinkingBlocks(messages: Message[]): boolean {
  return messages.some(
    message =>
      message.type === 'assistant' &&
      Array.isArray(message.message.content) &&
      message.message.content.some(
        block =>
          block.type === 'redacted_thinking' ||
          (block.type === 'thinking' &&
            'signature' in block &&
            typeof block.signature === 'string' &&
            block.signature.length > 0),
      ),
  )
}

export type Options = CompactRequestOptions & {
  onHintClears?:(event:import('../../utils/officialToolSchema287/native.js').OriginalHintClears287)=>void
  agentContext?:import('./officialSdkClientOuter287/native.js').SdkRequestAgent287
  serverClassifier?: boolean
  autoModeServerContext?: AutoModeServerContext287
  credentials?: CredentialStore
  storageV5?: unknown
  getToolPermissionContext: () => Promise<ToolPermissionContext>
  model: string
  toolChoice?: BetaToolChoiceTool | BetaToolChoiceAuto | undefined
  isNonInteractiveSession: boolean
  extraToolSchemas?: BetaToolUnion[]
  maxOutputTokensOverride?: number
  fallbackModel?: string
  onStreamingFallback?: () => void
  querySource: QuerySource
  agents: AgentDefinition[]
  allowedAgentTypes?: string[]
  hasAppendSystemPrompt: boolean
  fetchOverride?: ClientOptions['fetch']
  clock?: ByteWatchdogClock286
  random?: () => number
  onRetryStatus?: (status: EventWatchdogStatus286 | RetryStatus) => void
  subscribeRetryWake?: import('./retryWake.js').RetryWakeSubscription286
  apiAttemptsLeft?: {count: number}
  enablePromptCaching?: boolean
  skipCacheWrite?: boolean
  temperatureOverride?: number
  effortValue?: EffortValue
  turnEffort?: EffortValue
  promptRenderEpoch?: number
  mcpTools: Tools
  /** Existing generation-specific MCP rows used by original vDo/EDo. */
  mcpClients?: readonly import('../../utils/officialMcpAttachments287/native.js').McpLiveClient287[]
  hasPendingMcpServers?: boolean
  queryTracking?: QueryChainTracking
  agentId?: AgentId // Only set for subagents
  outputFormat?: BetaJSONOutputFormat
  fastMode?: boolean
  modelIsRefusalFallbackTarget?: boolean
  advisorModel?: string
  addNotification?: (notif: Notification) => void
  // API-side task budget (output_config.task_budget). Distinct from the
  // tokenBudget.ts +500k auto-continue feature — this one is sent to the API
  // so the model can pace itself. `remaining` is computed by the caller
  // (query.ts decrements across the agentic loop).
  taskBudget?: { total: number; remaining?: number }
  agentCacheTtlOverride?: '5m' | '1h'
  forkPointUuid?: string
  stickyBetas?: StickyBetaState
  /** Original request recording inputs; kept separate from thinking C latches. */
  toolSearchStickyBetas?:import('../context/officialExecutionOwners287/native.js').StickyBetas287
  withoutToolDescribeHooks?:boolean
  toolPoolRefreshes?:boolean
  recordedToolDescriptions?:Map<string,string>
  recordedToolEntries?:Map<string,import('../../utils/officialToolSchema287/native.js').OriginalToolSchema287>
  recordedToolServers?:Map<string,string>
  recordedWireShape?:unknown
  recordedCliPrefix?:string
  systemPromptSource?: import('../../utils/officialToolSchema287/native.js').SnapshotProjection287['source']
  systemPromptSnapshotHash?: import('../../utils/officialToolSchema287/native.js').SnapshotProjection287['snapshotHash']
  echoWireToolInputs?:boolean
  /** Original request-only selector; ordinary thinking C defaults are unchanged. */
  resumeIncompleteThinking?:boolean
  keepPartialMessageOnAbort?:boolean
  spawnedBySkill?:string
  activeSkill?:string
  activeMcpServer?:string
  activeMcpTool?:string
  userSystemPrompt?:string
  advisorDeferred?:boolean
  advisorActive?:boolean
  prevToolDurations?:import('../../utils/officialToolSchema287/native.js').QueryToolDuration287[]
  evictCacheOnComplete?:boolean
  divergesAtMessageId?:string
  isBackgroundAgent?:boolean
  onPromptHeadSent?:(head:import('../../utils/officialToolSchema287/native.js').PromptHead287)=>void
  onToolInputCopiesSent?:(copies:Map<string,'wire'|'displayed'>)=>void
  recordedDeferredTools?:()=>import('../../utils/officialToolSchema287/native.js').RecordedDeferredTools287
  onDeferredToolsSent?:(tools:{entries:import('../../utils/officialToolSchema287/native.js').OriginalToolSchema287[];nameOnlyAnnouncements:Set<string>;strippedReferences:Set<string>})=>void
  onInlineToolsDeclared?:(tools:import('../../utils/officialToolSchema287/native.js').InlineToolDeclaration287[])=>void
}

export async function queryModelWithoutStreaming({
  messages,
  systemPrompt,
  thinkingConfig,
  tools,
  signal,
  options,
}: {
  messages: Message[]
  systemPrompt: SystemPrompt
  thinkingConfig: ThinkingConfig
  tools: Tools
  signal: AbortSignal
  options: Options
}): Promise<AssistantMessage> {
  if(getAPIProvider()==='firstParty'&&isFirstPartyAnthropicBaseUrl()) {
    const {queryOriginalSingle287}=await import('./singleQuery287.js')
    return queryOriginalSingle287({messages,systemPrompt,thinkingConfig,tools,signal,options})
  }
  // Store the assistant message but continue consuming the generator to ensure
  // logAPISuccessAndDuration gets called (which happens after all yields)
  let assistantMessage: AssistantMessage | undefined
  for await (const message of withStreamingVCR(messages, async function* () {
    yield* queryModel(
      messages,
      systemPrompt,
      thinkingConfig,
      tools,
      signal,
      options,
    )
  })) {
    if (message.type === 'assistant') {
      assistantMessage = message
    }
  }
  if (!assistantMessage) {
    // If the signal was aborted, throw APIUserAbortError instead of a generic error
    // This allows callers to handle abort scenarios gracefully
    if (signal.aborted) {
      throw new APIUserAbortError()
    }
    throw new Error('No assistant message found')
  }
  return assistantMessage
}

export async function* queryModelWithStreaming({
  messages,
  systemPrompt,
  thinkingConfig,
  tools,
  signal,
  options,
}: {
  messages: Message[]
  systemPrompt: SystemPrompt
  thinkingConfig: ThinkingConfig
  tools: Tools
  signal: AbortSignal
  options: Options
}): AsyncGenerator<
  import('./originalQueryAdapter287.js').ApiQueryMessage287,
  void
> {
  return yield* withStreamingVCR(messages, async function* () {
    yield* queryModel(
      messages,
      systemPrompt,
      thinkingConfig,
      tools,
      signal,
      options,
    )
  })
}

/**
 * Determines if an LSP tool should be deferred (tool appears with defer_loading: true)
 * because LSP initialization is not yet complete.
 */
function shouldDeferLspTool(tool: Tool): boolean {
  if (!('isLsp' in tool) || !tool.isLsp) {
    return false
  }
  const status = getInitializationStatus()
  // Defer when pending or not started
  return status.status === 'pending' || status.status === 'not-started'
}

/**
 * Per-attempt timeout for non-streaming fallback requests, in milliseconds.
 * Reads API_TIMEOUT_MS when set so slow backends and the streaming path
 * share the same ceiling.
 *
 * Remote sessions default to 120s to stay under CCR's container idle-kill
 * (~5min) so a hung fallback to a wedged backend surfaces a clean
 * APIConnectionTimeoutError instead of stalling past SIGKILL.
 *
 * Otherwise defaults to 300s — long enough for slow backends without
 * approaching the API's 10-minute non-streaming boundary.
 */
function getNonstreamingFallbackTimeoutMs(): number {
  const override = parseInt(process.env.API_TIMEOUT_MS || '', 10)
  if (override) return override
  return isEnvTruthy(process.env.CLAUDE_CODE_REMOTE) ? 120_000 : 300_000
}

/**
 * Helper generator for non-streaming API requests.
 * Encapsulates the common pattern of creating a withRetry generator,
 * iterating to yield system messages, and returning the final BetaMessage.
 */
export async function* executeNonStreamingRequest(
  clientOptions: {
    model: string
    credentials?: CredentialStore
    storageV5?: unknown
    fetchOverride?: Options['fetchOverride']
    source: string
    compactionRequestKind?: string
    agentContext?: AgentContext
    promptId?: string
  },
  retryOptions: {
    maxRetries?: number
    modelCallRetries?: ModelCallRetries286
    model: string
    fallbackModel?: string
    thinkingConfig: ThinkingConfig
    fastMode?: boolean
    modelIsRefusalFallbackTarget?: boolean
    signal: AbortSignal
    initialConsecutive529Errors?: number
    noResponseRetryLedger?: NoResponseRetryLedger286
    querySource?: QuerySource
    onRetryStatus?: (status: RetryStatus) => void
    clock?: ByteWatchdogClock286
    random?: () => number
    subscribeRetryWake?: import('./retryWake.js').RetryWakeSubscription286
    onError?: (error: unknown) => string | undefined
  },
  paramsFromContext: (context: RetryContext) => BetaMessageStreamParams,
  onAttempt: (attempt: number, start: number, maxOutputTokens: number) => void,
  captureRequest: (params: BetaMessageStreamParams) => void,
  /**
   * Request ID of the failed streaming attempt this fallback is recovering
   * from. Emitted in tengu_nonstreaming_fallback_error for funnel correlation.
   */
  originatingRequestId?: string | null,
  onCompletedResponse287?:(response:BetaMessage,params:BetaMessageStreamParams)=>void,
  toolSearchMessageWire287?:()=>import('./toolSearchRequest287.js').ToolSearchMessageWire287[]|undefined,
): AsyncGenerator<SystemAPIErrorMessage, BetaMessage> {
  const fallbackTimeoutMs = getNonstreamingFallbackTimeoutMs()
  const quotaClock = retryOptions.clock ?? streamWatchdogClock286
  let quotaEpoch = getQuotaAccountEpoch()
  const generator = withRetry(
    () =>
      getAnthropicClient({
        maxRetries: 0,
        model: clientOptions.model,
        fetchOverride: clientOptions.fetchOverride,
        source: clientOptions.source,
        agentContext: clientOptions.agentContext,
        promptId: clientOptions.promptId,
        credentials: clientOptions.credentials,
        storageV5: clientOptions.storageV5,
      }),
    async (anthropic, attempt, context) => {
      const start = Date.now()
      quotaEpoch = getQuotaAccountEpoch()
      const retryParams = paramsFromContext(context)
      captureRequest(retryParams)
      onAttempt(attempt, start, retryParams.max_tokens)

      const adjustedParams = adjustParamsForNonStreaming(
        retryParams,
        MAX_NON_STREAMING_TOKENS,
      )

      try {
        // biome-ignore lint/plugin: non-streaming API call
        const body287={...adjustedParams,model:normalizeModelStringForAPI(adjustedParams.model)}
        const request287={signal:retryOptions.signal,timeout:fallbackTimeoutMs,headers:getCompactRequestHeaders(clientOptions.compactionRequestKind)}
        const wire287=toolSearchMessageWire287?.()
        const completed=await (wire287===undefined?anthropic.beta.messages.create(body287,request287):createToolSearchResponse287(anthropic.beta.messages,body287,request287,wire287)).withResponse()
        const message = completed.data as BetaMessage
        onCompletedResponse287?.(message,retryParams)
        extractQuotaStatusFromHeaders(completed.response.headers, context.model,
          quotaLongContext(context.model, message.usage), (retryOptions.clock ?? streamWatchdogClock286).now(), quotaEpoch, clientOptions.storageV5)
        return message
      } catch (err) {
        // User aborts are not errors — re-throw immediately without logging
        if (err instanceof APIUserAbortError) throw err

        // Instrumentation: record when the non-streaming request errors (including
        // timeouts). Lets us distinguish "fallback hung past container kill"
        // (no event) from "fallback hit the bounded timeout" (this event).
        logForDiagnosticsNoPII('error', 'cli_nonstreaming_fallback_error')
        logEvent('tengu_nonstreaming_fallback_error', {
          model:
            clientOptions.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
          error:
            err instanceof Error
              ? (err.name as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS)
              : ('unknown' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS),
          attempt,
          timeout_ms: fallbackTimeoutMs,
          request_id: (originatingRequestId ??
            'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        })
        throw err
      }
    },
    {
      maxRetries: retryOptions.maxRetries,
      modelCallRetries: retryOptions.modelCallRetries,
      model: retryOptions.model,
      credentials: clientOptions.credentials,
      storageV5: clientOptions.storageV5,
      fallbackModel: retryOptions.fallbackModel,
      thinkingConfig: retryOptions.thinkingConfig,
      ...(isFastModeEnabled() && { fastMode: retryOptions.fastMode }),
      modelIsRefusalFallbackTarget: retryOptions.modelIsRefusalFallbackTarget,
      signal: retryOptions.signal,
      initialConsecutive529Errors: retryOptions.initialConsecutive529Errors,
      noResponseRetryLedger: retryOptions.noResponseRetryLedger,
      querySource: retryOptions.querySource,
      onError: retryOptions.onError,
      onRetryStatus: retryOptions.onRetryStatus,
      onQuotaWindowWait: (error, metadata) => beginQuotaWindowWait(error, metadata, clientOptions.source,
        retryOptions.model, quotaEpoch, quotaClock, !!clientOptions.agentContext, clientOptions.storageV5),
      clock: retryOptions.clock,
      random: retryOptions.random,
      subscribeRetryWake: retryOptions.subscribeRetryWake,
    },
  )

  let e
  try {
    do {
      e = await generator.next()
      if (!e.done && e.value.type === 'system') yield e.value
    } while (!e.done)
    return e.value as BetaMessage
  } catch (error) {
    const cause = error instanceof CannotRetryError ? error.originalError : error
    if (cause instanceof APIError) extractQuotaStatusFromError(cause,
      clientOptions.agentContext ? 'other' : clientOptions.source, quotaClock.now(), quotaEpoch, clientOptions.storageV5)
    throw error
  } finally {
    // A forwarding consumer can return while the inner retry is suspended at
    // a status yield. Close that generator so its native wait lease is disposed.
    await generator.return(undefined as never)
  }
}

/**
 * Extracts the request ID from the most recent assistant message in the
 * conversation. Used to link consecutive API requests in analytics so we can
 * join them for cache-hit-rate analysis and incremental token tracking.
 *
 * Deriving this from the message array (rather than global state) ensures each
 * query chain (main thread, subagent, teammate) tracks its own request chain
 * independently, and rollback/undo naturally updates the value.
 */
function getPreviousRequestIdFromMessages(
  messages: Message[],
): string | undefined {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i]!
    if (msg.type === 'assistant' && msg.requestId) {
      return msg.requestId
    }
  }
  return undefined
}

// The transcript can hold stable and beta SDK content blocks, including
// tool-reference blocks that are not themselves BetaContentBlockParam. Media
// stripping only inspects the common discriminant; it never converts blocks.
function isMedia(block: { type: string }): boolean {
  return block.type === 'image' || block.type === 'document'
}

function isToolResult(
  block: BetaContentBlockParam,
): block is BetaToolResultBlockParam {
  return block.type === 'tool_result'
}

/**
 * Ensures messages contain at most `limit` media items (images + documents).
 * Strips oldest media first to preserve the most recent.
 */
export function stripExcessMediaItems(
  messages: (UserMessage | AssistantMessage)[],
  limit: number,
): (UserMessage | AssistantMessage)[] {
  let toRemove = 0
  for (const msg of messages) {
    if (!Array.isArray(msg.message.content)) continue
    for (const block of msg.message.content) {
      if (isMedia(block)) toRemove++
      if (isToolResult(block) && Array.isArray(block.content)) {
        for (const nested of block.content) {
          if (isMedia(nested)) toRemove++
        }
      }
    }
  }
  toRemove -= limit
  if (toRemove <= 0) return messages

  return messages.map(msg => {
    if (toRemove <= 0) return msg
    const content = msg.message.content
    if (!Array.isArray(content)) return msg

    const before = toRemove
    const stripped = content
      .map(block => {
        if (
          toRemove <= 0 ||
          !isToolResult(block) ||
          !Array.isArray(block.content)
        )
          return block
        const filtered = block.content.filter(n => {
          if (toRemove > 0 && isMedia(n)) {
            toRemove--
            return false
          }
          return true
        })
        return filtered.length === block.content.length
          ? block
          : { ...block, content: filtered }
      })
      .filter(block => {
        if (toRemove > 0 && isMedia(block)) {
          toRemove--
          return false
        }
        return true
      })

    return before === toRemove
      ? msg
      : {
          ...msg,
          message: { ...msg.message, content: stripped },
        }
  }) as (UserMessage | AssistantMessage)[]
}

// A bounded capacity replay keeps only one attempt's message/stream buffers.
// Retrying recursively here would retain the full conversation per wait.
const LOW_PRIORITY_STREAM_RETRY = Symbol('low-priority-stream-retry')
const STALE_STREAM_RETRY = Symbol('stale-stream-retry')
async function* queryModel(
  messages: Message[], systemPrompt: SystemPrompt, thinkingConfig: ThinkingConfig,
  tools: Tools, signal: AbortSignal, options: Options,
): AsyncGenerator<import('./originalQueryAdapter287.js').ApiQueryMessage287, void> {
  // Select one controller before constructing the retained compatible-endpoint C loop.
  if(getAPIProvider()==='firstParty'&&isFirstPartyAnthropicBaseUrl()) {
    const {queryOriginalModel287}=await import('./originalQueryAdapter287.js')
    return yield* queryOriginalModel287(messages,systemPrompt,thinkingConfig,tools,signal,options)
  }
  const wait = createLowPriorityWait()
  const noResponseRetryLedger: NoResponseRetryLedger286 = {count: 0}
  const modelCallRetries = modelCallRetry286.VLt({
    maxRetries: modelCallRetry286.qOe(), maxOverloaded: 3,
    hasFallbackModel: Boolean(options.fallbackModel),
    persistent: modelCallRetry286.v4(), background: !isForegroundQuery286(options.querySource),
  }, options.apiAttemptsLeft)
  try {
    while (true) {
      const outcome = yield* queryModelAttempt(
        messages, systemPrompt, thinkingConfig, tools, signal, options, wait, noResponseRetryLedger, modelCallRetries,
      )
      if (outcome === LOW_PRIORITY_STREAM_RETRY || outcome === STALE_STREAM_RETRY) continue
      return
    }
  } finally { finishLowPriorityWait(wait) }
}

async function* queryModelAttempt(
  messages: Message[],
  systemPrompt: SystemPrompt,
  thinkingConfig: ThinkingConfig,
  tools: Tools,
  signal: AbortSignal,
  options: Options,
  lowPriorityStreamWait = createLowPriorityWait(),
  noResponseRetryLedger: NoResponseRetryLedger286,
  modelCallRetries: ModelCallRetries286,
): AsyncGenerator<
  StreamEvent | AssistantMessage | SystemAPIErrorMessage,
  void | typeof LOW_PRIORITY_STREAM_RETRY | typeof STALE_STREAM_RETRY
> {
  const agentContext = getAgentContext()
  const activityAgentId287 = getBackgroundActivityAgentId287(agentContext)
  const promptId = getRequestPromptId(messages, agentContext)
  const turnOrigin = getRequestTurnOrigin(messages)
  const turnPosition = getRequestTurnPosition(messages)

  // Check cheap conditions first — the off-switch await blocks on GrowthBook
  // init (~10ms). For non-Opus models (haiku, sonnet) this skips the await
  // entirely. Subscribers don't hit this path at all.
  if (
    !isClaudeAISubscriber() &&
    isNonCustomOpusModel(options.model) &&
    (
      await getDynamicConfig_BLOCKS_ON_INIT<{ activated: boolean }>(
        'tengu-off-switch',
        {
          activated: false,
        },
      )
    ).activated
  ) {
    logEvent('tengu_off_switch_query', {})
    yield getAssistantMessageFromError(
      new Error(CUSTOM_OFF_SWITCH_MESSAGE),
      options.model,
    )
    return
  }

  // Derive previous request ID from the last assistant message in this query chain.
  // This is scoped per message array (main thread, subagent, teammate each have their own),
  // so concurrent agents don't clobber each other's request chain tracking.
  // Also naturally handles rollback/undo since removed messages won't be in the array.
  const previousRequestId = getPreviousRequestIdFromMessages(messages)

  const resolvedModel = options.model

  queryCheckpoint('query_tool_schema_build_start')
  const isAgenticQuery =
    options.querySource.startsWith('repl_main_thread') ||
    options.querySource.startsWith('agent:') ||
    options.querySource === 'sdk' ||
    options.querySource === 'hook_agent' ||
    options.querySource === 'verification_agent'
  const betas = getMergedBetas(options.model, { isAgenticQuery })

  const previousAPIMessageId = getPreviousAPIMessageId(messages)
  const cacheDiagnosisEnabled = shouldUseCacheDiagnosis()
  const stickyBetas = options.stickyBetas ?? getThinkingBindingState(getSessionId(), options.agentId ?? agentContext?.agentId)
  // 2.1.287's unclaimed-updates recovery applies only to an explicit beta
  // opt-in. Use the existing per-session/agent sticky-beta owner so a
  // rejected header is not reintroduced on later turns.
  if (betas.includes(THINKING_DISPLAY_UPDATES_BETA_HEADER)) {
    sendBeta(stickyBetas, THINKING_DISPLAY_UPDATES_BETA_HEADER)
  }
  const bindingEndpoint = getAPIProvider() === 'firstParty' &&
    (!!process.env._CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL || isFirstPartyAnthropicBaseUrl())
  let bindingBehavior: ReturnType<typeof resolveBindingBehavior>
  let bindingEnabled = false
  // The official query treats a failed host/config lookup as no binding
  // negotiation, not an authentication failure or a reason to change host.
  try {
    const gatewayURL = hasGatewayInjection() && process.env.ANTHROPIC_BASE_URL === undefined
      ? getRemoteManagedSettingsClientInjection().gateway?.getAuth()?.url : undefined
    const gatewayAllowsBinding = !gatewayURL || new URL(gatewayURL).host === 'api.anthropic.com'
    if (!(thinkingConfig.type === 'disabled' && thinkingConfig.mechanical === true) &&
        !process.env.CLAUDE_CODE_SIMULATE_PROXY_USAGE && gatewayAllowsBinding &&
        getAPIProvider() === 'firstParty' && shouldIncludeFirstPartyOnlyBetas() && !hasComplianceTaint('hipaa')) {
      if (thinkingConfig.type !== 'disabled') {
        bindingBehavior = resolveBindingBehavior(bindingEndpoint, process.env.CLAUDE_CODE_POLISHED_DEWDROP,
          bindingEndpoint && process.env.CLAUDE_CODE_POLISHED_DEWDROP === undefined
            ? getFeatureValue_CACHED_MAY_BE_STALE('tengu_polished_dewdrop', '') : undefined)
        if (bindingBehavior !== undefined || bindingEndpoint) sendBeta(stickyBetas, THINKING_BINDING_BETA)
      }
      bindingEnabled = betaWasSent(stickyBetas, THINKING_BINDING_BETA)
    }
  } catch (error) {
    logError(error)
    bindingBehavior = undefined
    bindingEnabled = false
  }

  // Always send the advisor beta header when advisor is enabled, so
  // non-agentic queries (compact, side_question, extract_memories, etc.)
  // can parse advisor server_tool_use blocks already in the conversation history.
  if (isAdvisorEnabled()) {
    betas.push(ADVISOR_BETA_HEADER)
  }

  let advisorModel: string | undefined
  if (isAgenticQuery && isAdvisorEnabled()) {
    let advisorOption = options.advisorModel

    const advisorExperiment = getExperimentAdvisorModels()
    if (advisorExperiment !== undefined) {
      if (
        normalizeModelStringForAPI(advisorExperiment.baseModel) ===
        normalizeModelStringForAPI(options.model)
      ) {
        // Override the advisor model if the base model matches. We
        // should only have experiment models if the user cannot
        // configure it themselves.
        advisorOption = advisorExperiment.advisorModel
      }
    }

    if (advisorOption) {
      const normalizedAdvisorModel = normalizeModelStringForAPI(
        parseUserSpecifiedModel(advisorOption),
      )
      if (!modelSupportsAdvisor(options.model)) {
        logForDebugging(
          `[AdvisorTool] Skipping advisor - base model ${options.model} does not support advisor`,
        )
      } else if (!isValidAdvisorModel(normalizedAdvisorModel)) {
        logForDebugging(
          `[AdvisorTool] Skipping advisor - ${normalizedAdvisorModel} is not a valid advisor model`,
        )
      } else {
        advisorModel = normalizedAdvisorModel
        logForDebugging(
          `[AdvisorTool] Server-side tool enabled with ${advisorModel} as the advisor model`,
        )
      }
    }
  }

  // Fixed287 full request ToolSearch block: same je/schema/cache and real
  // StickyBetas actor. The thinking-binding C state above remains independent.
  const toolDescriptionSource287=(require('../../utils/toolSchema287.js') as typeof import('../../utils/toolSchema287.js')).getToolSchemaRuntime287()
  const originalSticky287=options.toolSearchStickyBetas??getExecutionSession287().conversationLatches.stickyBetas()
  const betaProducer287=(require('../../utils/modelBetas287.js') as typeof import('../../utils/modelBetas287.js')).getModelBetaProducer287()
  const toolSearchBetas287=betas.map(betaProducer287.r4r)
  const toolSearchPlan287=await toolDescriptionSource287.searchRequestPlan(messages,tools,{...options,stickyBetas:originalSticky287},originalSticky287,toolSearchBetas287)
  betas.splice(0,betas.length,...betaProducer287.sT(toolSearchPlan287.betas))
  const useToolSearch=toolSearchPlan287.enabled,filteredTools=toolSearchPlan287.tools,deferredToolNames=toolSearchPlan287.deferredNames

  // Determine if cached microcompact is enabled for this model.
  // Computed once here (in async context) and captured by paramsFromContext.
  // The beta header is also captured here to avoid a top-level import of the
  // ant-only CACHE_EDITING_BETA_HEADER constant.
  let cachedMCEnabled = false
  let cacheEditingBetaHeader = ''
  if (feature('CACHED_MICROCOMPACT')) {
    const {
      isCachedMicrocompactEnabled,
      isModelSupportedForCacheEditing,
      getCachedMCConfig,
    } = await import('../compact/cachedMicrocompact.js')
    const betas = await import('src/constants/betas.js')
    cacheEditingBetaHeader = betas.CACHE_EDITING_BETA_HEADER
    const featureEnabled = isCachedMicrocompactEnabled()
    const modelSupported = isModelSupportedForCacheEditing(options.model)
    cachedMCEnabled = featureEnabled && modelSupported
    const config = getCachedMCConfig()
    logForDebugging(
      `Cached MC gate: enabled=${featureEnabled} modelSupported=${modelSupported} model=${options.model} supportedModels=${jsonStringify(config.supportedModels)}`,
    )
  }

  const useGlobalCacheFeature = getSystemCacheSerializer287().globalScope()
  const willDefer=toolSearchPlan287.defer
  const needsToolBasedCacheMarker=toolSearchPlan287.needsToolBasedCacheMarker
  const globalCacheStrategy:GlobalCacheStrategy=toolSearchPlan287.globalCacheStrategy
  let toolSchemas=toolSearchPlan287.schemas

  queryCheckpoint('query_tool_schema_build_end')

  // Normalize messages before building system prompt (needed for fingerprinting)
  // Instrumentation: Track message count before normalization
  logEvent('tengu_api_before_normalize', {
    preNormalizedMessageCount: messages.length,
  })

  queryCheckpoint('query_message_normalization_start')
  const compactStripPlans = getCompactStripPlans(messages, options)
  // Original VUt owns ordinary 1P and experimental normalization together.
  // Retained C only projects excluded/refused transcript rows and sanitizes
  // persisted error tool results; it never changes the stored history.
  const originalNormalization287=getAPIProvider()==='firstParty'&&isFirstPartyAnthropicBaseUrl()
    ?toolDescriptionSource287.normalizeOriginalRequest(messages.filter(message=>!isModelContextExcluded(message)&&!isRefusalMessage(message)),{
      model:options.model,tools:toolSearchPlan287.placementTools,betas:toolSearchPlan287.betas,useToolSearch,
      resumeIncompleteThinking:options.resumeIncompleteThinking,echoWireToolInputs:options.echoWireToolInputs,
      nameOnlyAnnouncements:originalSticky287.nameOnlyAnnouncements,deferredWireToolNames:toolSearchPlan287.keptDeferredNames,
      byValueNames:toolSearchPlan287.byValueNames,withoutAttachmentHooks:options.withoutToolDescribeHooks,
      midConvLatchedOff:(require('../../utils/toolSchema287.js') as typeof import('../../utils/toolSchema287.js')).isOriginalMidConvRejected287(originalSticky287),
      keepForeignThinking:(require('../../utils/toolSchema287.js') as typeof import('../../utils/toolSchema287.js')).getOriginalKeepForeignThinking287(),
      advisorModel,stripWebSearch:originalSticky287.webSearchHistoryRejected,
      thinkingStripPlan:compactStripPlans.thinking,advisorStripPlan:compactStripPlans.advisor,
      ingestPool:{tools,...toolDescriptionSource287.requestOwnIngest(options.querySource)&&{ownRequest:{mcpServersPending:options.hasPendingMcpServers===true}}},
    })
    :undefined
  let messagesForAPI=originalNormalization287===undefined
    ?applyCompactStripPlans(normalizeMessagesForAPI(messages,filteredTools),compactStripPlans)
    :sanitizeErrorToolResultContent(originalNormalization287.messagesForAPI.filter((message):message is UserMessage|AssistantMessage=>message.type!=='api_system'))
  queryCheckpoint('query_message_normalization_end')
  // Keep the already-accepted compatible-endpoint C path unchanged: it
  // selected full wv only when the explicit byValue protocol was negotiated.
  const compatibleNormalization287={thinkingStripPlan:compactStripPlans.thinking,advisorStripPlan:compactStripPlans.advisor,preserveTrailingThinking:options.resumeIncompleteThinking,surfaceLateToolAdditions:toolSearchPlan287.lateToolsEnabled,nameOnlyAnnouncements:originalSticky287.nameOnlyAnnouncements,deferredWireToolNames:toolSearchPlan287.keptDeferredNames,withoutAttachmentHooks:options.withoutToolDescribeHooks,echoWireToolInputs:toolDescriptionSource287.echoWireInputs(messages,options.echoWireToolInputs),ingestPool:{tools,...toolDescriptionSource287.requestOwnIngest(options.querySource)&&{ownRequest:{mcpServersPending:options.hasPendingMcpServers===true}}}}
  let toolSearchWireMessages287=originalNormalization287!==undefined
    ?originalNormalization287.messagesForAPI.map(message=>message.type==='api_system'?message:sanitizeErrorToolResultContent([message])[0]!)
    :toolSearchPlan287.byValueEnabled&&toolSearchPlan287.lateToolsEnabled&&toolSearchPlan287.byValueNames.size>0
      ?toolDescriptionSource287.normalizeToolSearchMessages(messages,toolSearchPlan287.placementTools,options.model,{...compatibleNormalization287,inlineToolDefinitions:toolSearchPlan287.byValueNames})
      :undefined
  const toolSearchRecovery287=toolSearchWireMessages287===undefined?undefined:toolDescriptionSource287.createToolSearchRecovery287(messages,tools,options,originalSticky287,toolSearchPlan287,{
    betas:toolSearchPlan287.betas,messages:toolSearchWireMessages287,tools:toolSchemas,
    inlineToolsFallback:originalNormalization287!==undefined?originalNormalization287.inlineToolsFallback??undefined:()=>toolDescriptionSource287.normalizeToolSearchMessages(messages,toolSearchPlan287.placementTools,options.model,{...compatibleNormalization287,nameOnlyAnnouncements:new Set([...originalSticky287.nameOnlyAnnouncements,...toolSearchPlan287.byValueNames])}),
    toolChangeFallback:originalNormalization287!==undefined?originalNormalization287.toolChangeFallback??undefined:()=>toolDescriptionSource287.normalizeToolSearchMessages(messages,toolSearchPlan287.placementTools,options.model,{...compatibleNormalization287,surfaceLateToolAdditions:false,advisorToolChanges:false}),
    midConvFallback:originalNormalization287!==undefined?originalNormalization287.midConvFallback??undefined:()=>toolDescriptionSource287.normalizeToolSearchMessages(messages,toolSearchPlan287.placementTools,undefined,compatibleNormalization287),
  })
  const handleToolSearchProtocolAPIError287=(error:unknown):string|undefined=>{
    const repair=toolSearchRecovery287?.onError(error)
    if(repair){toolSearchWireMessages287=toolSearchRecovery287!.messages;toolSchemas=toolSearchRecovery287!.tools;allTools.splice(0,allTools.length,...toolSchemas,...extraToolSchemas);betas.splice(0,betas.length,...betaProducer287.sT(toolSearchRecovery287!.betas))}
    return repair
  }
  const serializeToolSearchWire287=()=>{
    if(toolSearchWireMessages287===undefined)return undefined
    const indices:number[]=[]
    const wire=serializeToolSearchMessages287(toolSearchWireMessages287,enablePromptCaching&&!options.skipMessageCacheMarkers,requestCacheTtl,options.skipCacheWrite,options.forkPointUuid,toolSearchRecovery287?.proxyDemoted,indices)
    toolSearchRecovery287?.setWire(wire,indices)
    return wire
  }

  toolDescriptionSource287.sendToolInputCopies287(messages,options)

  // Model-specific post-processing: strip tool-search-specific fields if the
  // selected model doesn't support tool search.
  //
  // Why is this needed in addition to normalizeMessagesForAPI?
  // - normalizeMessagesForAPI uses isToolSearchEnabledNoModelCheck() because it's
  //   called from ~20 places (analytics, feedback, sharing, etc.), many of which
  //   don't have model context. Adding model to its signature would be a large refactor.
  // - This post-processing uses the model-aware isToolSearchEnabled() check
  // - This handles mid-conversation model switching (e.g., Sonnet → Haiku) where
  //   stale tool-search fields from the previous model would cause 400 errors
  //
  // Note: For assistant messages, normalizeMessagesForAPI already normalized the
  // tool inputs, so stripCallerFieldFromAssistantMessage only needs to remove the
  // 'caller' field (not re-normalize inputs).
  if (!useToolSearch) {
    messagesForAPI = messagesForAPI.map(msg => {
      switch (msg.type) {
        case 'user':
          // Strip tool_reference blocks from tool_result content
          return stripToolReferenceBlocksFromUserMessage(msg)
        case 'assistant':
          // Strip 'caller' field from tool_use blocks
          return stripCallerFieldFromAssistantMessage(msg)
        default:
          return msg
      }
    })
  }

  // Repair tool_use/tool_result pairing mismatches that can occur when resuming
  // remote/teleport sessions. Inserts synthetic error tool_results for orphaned
  // tool_uses and strips orphaned tool_results referencing non-existent tool_uses.
  messagesForAPI = ensureToolResultPairing(messagesForAPI)

  if (
    shouldUseThinkingResumption(options.model) &&
    hasResumableThinkingBlocks(messagesForAPI) &&
    !betas.includes(THINKING_RESUMPTION_BETA_HEADER)
  ) {
    betas.push(THINKING_RESUMPTION_BETA_HEADER)
  }

  // Strip advisor blocks — the API rejects them without the beta header.
  if (!betas.includes(ADVISOR_BETA_HEADER)) {
    messagesForAPI = stripAdvisorBlocks(messagesForAPI)
  }

  // Strip excess media items before making the API call.
  // The API rejects requests with >100 media items but returns a confusing error.
  // Rather than erroring (which is hard to recover from in Cowork/CCD), we
  // silently drop the oldest media items to stay within the limit.
  messagesForAPI = stripExcessMediaItems(
    messagesForAPI,
    API_MAX_MEDIA_PER_REQUEST,
  )

  // Instrumentation: Track message count after normalization
  logEvent('tengu_api_after_normalize', {
    postNormalizedMessageCount: messagesForAPI.length,
  })

  // Official ljt attributes VUt.messagesPreNormalize, before metadata is merged.
  const fingerprint = computeFingerprintFromMessages(
    (originalNormalization287?.messagesPreNormalize ?? messages).filter(
      (message): message is UserMessage | AssistantMessage => message.type === 'user' || message.type === 'assistant',
    ),
  )

  // When the delta attachment is enabled, deferred tools are announced
  // via persisted deferred_tools_delta attachments instead of this
  // ephemeral prepend (which busts cache whenever the pool changes).
  if (useToolSearch && !isDeferredToolsDeltaEnabled()) {
    const deferredToolList = tools
      .filter(t => deferredToolNames.has(t.name))
      .map(formatDeferredToolLine)
      .sort()
      .join('\n')
    if (deferredToolList) {
      messagesForAPI = [
        createUserMessage({
          content: `<available-deferred-tools>\n${deferredToolList}\n</available-deferred-tools>`,
          isMeta: true,
        }),
        ...messagesForAPI,
      ]
    }
  }

  // Chrome tool-search instructions: when the delta attachment is enabled,
  // these are carried as a client-side block in mcp_instructions_delta
  // (attachments.ts) instead of here. This per-request sys-prompt append
  // busts the prompt cache when chrome connects late.
  const hasChromeTools = filteredTools.some(t =>
    isToolFromMcpServer(t.name, CLAUDE_IN_CHROME_MCP_SERVER_NAME),
  )
  const injectChromeHere =
    useToolSearch && hasChromeTools && !isMcpInstructionsDeltaEnabled()

  // filter(Boolean) works by converting each element to a boolean - empty strings become false and are filtered out.
  systemPrompt = asSystemPrompt(
    [
      getAttributionHeader(fingerprint, agentContext, previousRequestId, promptId, turnOrigin, turnPosition),
      getCLISyspromptPrefix({
        isNonInteractive: options.isNonInteractiveSession,
        hasAppendSystemPrompt: options.hasAppendSystemPrompt,
      }),
      ...systemPrompt,
      ...(advisorModel ? [ADVISOR_TOOL_INSTRUCTIONS] : []),
      ...(injectChromeHere ? [CHROME_TOOL_SEARCH_INSTRUCTIONS] : []),
    ].filter(Boolean),
  )

  // Prepend system prompt block for easy API identification
  logAPIPrefix(systemPrompt)

  const enablePromptCaching =
    options.enablePromptCaching ?? getPromptCachingEnabled(options.model)
  const requestCacheSelection = getRequestCacheTTL287().select(options.querySource, {agentCacheTtlOverride: options.agentCacheTtlOverride})
  const requestCacheTtl = requestCacheSelection.ttl === '1h' ? '1h' : undefined
  const system = buildSystemPromptBlocks(systemPrompt, enablePromptCaching, {
    skipGlobalCacheForSystemPrompt: needsToolBasedCacheMarker,
    querySource: options.querySource,
    agentCacheTtlOverride: options.agentCacheTtlOverride,
    cacheTtl: requestCacheTtl,
  })
  const useBetas = betas.length > 0

  // Build minimal context for detailed tracing (when beta tracing is enabled)
  // Note: The actual new_context message extraction is done in sessionTracing.ts using
  // hash-based tracking per querySource (agent) from the messagesForAPI array
  const extraToolSchemas = [...(options.extraToolSchemas ?? [])]
  if (advisorModel) {
    // Server tools must be in the tools array by API contract. Appended after
    // toolSchemas (which carries the cache_control marker) so toggling /advisor
    // only churns the small suffix, not the cached prefix.
    extraToolSchemas.push({
      type: 'advisor_20260301',
      name: 'advisor',
      model: advisorModel,
    } as unknown as BetaToolUnion)
  }
  const allTools = [...toolSchemas, ...extraToolSchemas]

  const isFastMode =
    isFastModeEnabled() &&
    isFastModeAvailable() &&
    !isFastModeCooldown() &&
    isFastModeSupportedByModel(options.model) &&
    !!options.fastMode

  // Sticky-on latches for dynamic beta headers. Each header, once first
  // sent, keeps being sent for the rest of the session so mid-session
  // toggles don't change the server-side cache key and bust ~50-70K tokens.
  // Latches are cleared on /clear and /compact via clearBetaHeaderLatches().
  // Per-call gates (isAgenticQuery, querySource===repl_main_thread) stay
  // per-call so non-agentic queries keep their own stable header set.

  let afkHeaderLatched = getAfkModeHeaderLatched() === true
  if (feature('TRANSCRIPT_CLASSIFIER')) {
    if (
      !afkHeaderLatched &&
      isAgenticQuery &&
      shouldIncludeFirstPartyOnlyBetas() &&
      (autoModeStateModule?.isAutoModeActive() ?? false)
    ) {
      afkHeaderLatched = true
      setAfkModeHeaderLatched(true)
    }
  }

  let fastModeHeaderLatched = getFastModeHeaderLatched() === true
  if (!fastModeHeaderLatched && isFastMode) {
    fastModeHeaderLatched = true
    setFastModeHeaderLatched(true)
  }

  let cacheEditingHeaderLatched = getCacheEditingHeaderLatched() === true
  if (feature('CACHED_MICROCOMPACT')) {
    if (
      !cacheEditingHeaderLatched &&
      cachedMCEnabled &&
      getAPIProvider() === 'firstParty' &&
      options.querySource === 'repl_main_thread'
    ) {
      cacheEditingHeaderLatched = true
      setCacheEditingHeaderLatched(true)
    }
  }

  // Only latch from agentic queries so a classifier call doesn't flip the
  // main thread's context_management mid-turn.
  let thinkingClearLatched = getThinkingClearLatched() === true
  if (!thinkingClearLatched && isAgenticQuery) {
    const lastCompletion = getLastApiCompletionTimestamp()
    if (
      lastCompletion !== null &&
      Date.now() - lastCompletion > CACHE_TTL_1HOUR_MS
    ) {
      thinkingClearLatched = true
      setThinkingClearLatched(true)
    }
  }

  const effort = resolveAppliedEffort(options.model, options.effortValue)

  if (feature('PROMPT_CACHE_BREAK_DETECTION')) {
    // Exclude defer_loading tools from the hash -- the API strips them from the
    // prompt, so they never affect the actual cache key. Including them creates
    // false-positive "tool schemas changed" breaks when tools are discovered or
    // MCP servers reconnect.
    const toolsForCacheDetection = allTools.filter(
      t => !('defer_loading' in t && t.defer_loading),
    )
    // Capture everything that could affect the server-side cache key.
    // Pass latched header values (not live state) so break detection
    // reflects what we actually send, not what the user toggled.
    recordPromptState({
      system,
      toolSchemas: toolsForCacheDetection,
      querySource: options.querySource,
      model: options.model,
      agentId: options.agentId,
      fastMode: fastModeHeaderLatched,
      globalCacheStrategy,
      betas,
      autoModeActive: afkHeaderLatched,
      isUsingOverage: currentLimits.isUsingOverage ?? false,
      cachedMCEnabled: cacheEditingHeaderLatched,
      effortValue: effort,
      extraBodyParams: getExtraBodyParams(),
    })
  }

  const newContext: LLMRequestNewContext | undefined = isBetaTracingEnabled()
    ? {
        systemPrompt: systemPrompt.join('\n\n'),
        querySource: options.querySource,
        tools: jsonStringify(allTools),
      }
    : undefined

  // Capture the span so we can pass it to endLLMRequestSpan later
  // This ensures responses are matched to the correct request when multiple requests run in parallel
  const llmSpan = startLLMRequestSpan(
    options.model,
    newContext,
    messagesForAPI,
    isFastMode,
  )

  const startIncludingRetries = Date.now()
  let start = Date.now()
  let attemptNumber = 0
  const attemptStartTimes: number[] = []
  let stream: Stream<BetaRawMessageStreamEvent> | undefined = undefined
  let streamRequestId: string | null | undefined = undefined
  let clientRequestId: string | undefined = undefined
  // eslint-disable-next-line eslint-plugin-n/no-unsupported-features/node-builtins -- Response is available in Node 18+ and is used by the SDK
  let streamResponse: Response | undefined = undefined

  const requestClock = options.clock ?? streamWatchdogClock286
  const postTurnCacheAttempt287 = createPostTurnCacheAttemptRecorder287({agentContext, querySource: options.querySource, forkPointUuid: options.forkPointUuid, clock: requestClock, ttl: requestCacheTtl})
  let postTurnRequestAt287 = 0
  const slowResponseWarning = createSlowResponseWarning286(options.model, requestClock)

  // Release all stream resources to prevent native memory leaks.
  // The Response object holds native TLS/socket buffers that live outside the
  // V8 heap (observed on the Node.js/npm path; see GH #32920), so we must
  // explicitly cancel and release it regardless of how the generator exits.
  function releaseStreamResources(): void {
    slowResponseWarning.clear()
    cleanupStream(stream)
    stream = undefined
    if (streamResponse) {
      streamResponse.body?.cancel().catch(() => {})
      streamResponse = undefined
    }
  }

  // Consume pending cache edits ONCE before paramsFromContext is defined.
  // paramsFromContext is called multiple times (logging, retries), so consuming
  // inside it would cause the first call to steal edits from subsequent calls.
  const consumedCacheEdits = cachedMCEnabled ? consumePendingCacheEdits() : null
  const consumedPinnedEdits = cachedMCEnabled ? getPinnedCacheEdits() : []

  // Capture the betas sent in the last API request, including the ones that
  // were dynamically added, so we can log and send it to telemetry.
  let lastRequestBetas: string[] | undefined
  let thinkingDisplayUpdatesRetrying = false
  const responseErrorClassifier287 = createRequestErrorClassifier287(options.model, options.modelIsRefusalFallbackTarget)
  function handleThinkingBindingAPIError(error: unknown): string | undefined {
    if (!bindingEnabled || !lastRequestBetas?.includes(THINKING_BINDING_BETA) || !isThinkingBindingUnsupported(error)) return undefined
    bindingEnabled = false
    bindingBehavior = undefined
    rejectBeta(stickyBetas, THINKING_BINDING_BETA)
    logForDebugging('[thinking-binding] unsupported protocol; retrying without the field and beta')
    return 'retry:thinking-binding-controls'
  }
  let appliedThinkingDisplay: 'summarized' | 'omitted' | undefined

  // Original ljt request-local holder: never serialized and not a session cache.
  let serverRequest287:ServerRequest287|undefined
  let serverContext287:Record<string,unknown>|undefined
  let serverRequested287=false
  const serverBeta287=getModelBetaProducer287().q_t('dangerous-tool-use-2026-09-03')
  function adoptServerResponse287(response:unknown,params:{tools?:unknown[];betas?:string[]},thread=false):void {
    if(serverRequest287)getServerClassifier287().jPe(serverRequest287)
    const sent=serverRequested287 && (params.tools?.length??0)>0 && !authEnvironment.CLAUDE_CODE_SIMULATE_PROXY_USAGE && !!serverBeta287 && (params.betas??[]).includes(serverBeta287.header)
    serverRequest287=sent?getServerClassifier287().tCt(randomUUID(),{artifacts:serverContext287?.artifacts,thread,agentId:options.agentId}):undefined
    if(serverRequest287&&serverContext287)getServerClassifier287().D8e(serverRequest287.key,getServerClassifier287().A$t(serverContext287))
    // Streaming verdicts settle at message_delta, nonstream at completed response.
    if(serverRequest287&&response!==undefined)getServerClassifier287().nCt(serverRequest287,response,
      typeof response==='object'&&response!==null&&'content'in response&&Array.isArray(response.content)?response.content.flatMap(block=>block.type==='tool_use'&&typeof block.id==='string'?[block.id]:[]):undefined)
  }
  const paramsFromContext = (retryContext: RetryContext) => {
    const betasParams = betas.filter(
      beta =>
        !(
          beta === CACHE_DIAGNOSIS_BETA_HEADER &&
          getCacheDiagnosisHeaderRefused()
        ) &&
        !(
          beta === THINKING_RESUMPTION_BETA_HEADER &&
          getThinkingResumptionHeaderRefused()
        ) &&
        !(beta === THINKING_DISPLAY_UPDATES_BETA_HEADER &&
          (thinkingDisplayUpdatesRetrying ||
            !betaWasSent(stickyBetas, THINKING_DISPLAY_UPDATES_BETA_HEADER))),
    )

    // Append 1M beta dynamically for the Sonnet 1M experiment.
    if (
      !betasParams.includes(CONTEXT_1M_BETA_HEADER) &&
      getSonnet1mExpTreatmentEnabled(retryContext.model)
    ) {
      betasParams.push(CONTEXT_1M_BETA_HEADER)
    }

    serverContext287=options.serverClassifier===true&&options.autoModeServerContext!==undefined
      ?getServerClassifier287().M$t({autoModeServerContext:options.autoModeServerContext,priorTurnContext:getServerClassifier287().eXe(messages),systemReminders:getServerClassifier287().tXe(messages,messagesForAPI)})
      :undefined
    serverRequested287=options.serverClassifier===true&&serverContext287!==undefined&&getServerClassifier287().$oe()&&!!serverBeta287&&!(originalSticky287.rejected as Set<unknown>).has(serverBeta287)&&!isServerClassifierRefused287()
    if(serverRequested287&&serverBeta287)(originalSticky287.sent as Set<unknown>).add(serverBeta287)
    if(serverBeta287&&(originalSticky287.sent as Set<unknown>).has(serverBeta287)&&!betasParams.includes(serverBeta287.header))betasParams.push(serverBeta287.header)
    const extraBodyParams = getExtraBodyParams()

    const outputConfig: BetaOutputConfig = {
      ...((extraBodyParams.output_config as BetaOutputConfig) ?? {}),
    }

    configureEffortParams(
      effort,
      outputConfig,
      extraBodyParams,
      betasParams,
      options.model,
    )

    configureTaskBudgetParams(
      options.taskBudget,
      outputConfig as BetaOutputConfig & { task_budget?: TaskBudgetParam },
      betasParams,
    )

    // Merge outputFormat into extraBodyParams.output_config alongside effort
    // Requires structured-outputs beta header per SDK (see parse() in messages.mjs)
    if (options.outputFormat && !('format' in outputConfig)) {
      outputConfig.format = options.outputFormat as BetaJSONOutputFormat
      // Add beta header if not already present and provider supports it
      if (
        modelSupportsStructuredOutputs(options.model) &&
        !betasParams.includes(STRUCTURED_OUTPUTS_BETA_HEADER)
      ) {
        betasParams.push(STRUCTURED_OUTPUTS_BETA_HEADER)
      }
    }

    // Retry context gets preference because it tries to course correct if we exceed the context window limit
    const maxOutputTokens =
      retryContext?.maxTokensOverride ||
      options.maxOutputTokensOverride ||
      getMaxOutputTokensForModel(options.model)

    const hasThinking =
      thinkingConfig.type !== 'disabled' &&
      !isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_THINKING)
    const display = resolveThinkingDisplay(
      thinkingConfig,
      getInitialSettings().showThinkingSummaries,
      canRequestThinkingDisplay({
        thinkingEnabled: hasThinking,
        modelSupportsThinking: modelSupportsThinking(retryContext.model),
        modelSupportsInterleavedThinking: modelSupportsISP(retryContext.model),
        firstPartyBetaEligible: shouldIncludeFirstPartyOnlyBetas(),
        hipaa: hasComplianceTaint('hipaa'),
      }),
      getAPIProvider() === 'firstParty' && isFirstPartyAnthropicBaseUrl(),
    )
    appliedThinkingDisplay = display
    // Official DT removes the older redact-thinking beta whenever a display
    // value is applied. The display field now expresses the requested form.
    if (display) {
      const redactionIndex = betasParams.indexOf(REDACT_THINKING_BETA_HEADER)
      if (redactionIndex >= 0) betasParams.splice(redactionIndex, 1)
    }
    let thinking: BetaMessageStreamParams['thinking'] | undefined = undefined

    // IMPORTANT: Do not change the adaptive-vs-budget thinking selection below
    // without notifying the model launch DRI and research. This is a sensitive
    // setting that can greatly affect model quality and bashing.
    if (hasThinking && modelSupportsThinking(options.model)) {
      if (
        !isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING) &&
        modelSupportsAdaptiveThinking(options.model)
      ) {
        // For models that support adaptive thinking, always use adaptive
        // thinking without a budget.
        thinking = withThinkingDisplay({ type: 'adaptive' }, display) satisfies BetaMessageStreamParams['thinking']
      } else {
        // For models that do not support adaptive thinking, use the default
        // thinking budget unless explicitly specified.
        let thinkingBudget = getMaxThinkingTokensForModel(options.model)
        if (
          thinkingConfig.type === 'enabled' &&
          thinkingConfig.budgetTokens !== undefined
        ) {
          thinkingBudget = thinkingConfig.budgetTokens
        }
        thinkingBudget = Math.min(maxOutputTokens - 1, thinkingBudget)
        thinking = withThinkingDisplay({
          budget_tokens: thinkingBudget,
          type: 'enabled',
        }, display) satisfies BetaMessageStreamParams['thinking']
      }
    }

    // Get API context management strategies if enabled
    const contextManagement = getAPIContextManagement({
      hasThinking,
      isRedactThinkingActive: betasParams.includes(REDACT_THINKING_BETA_HEADER),
      clearAllThinking: thinkingClearLatched,
    })

    const enablePromptCaching =
      options.enablePromptCaching ?? getPromptCachingEnabled(retryContext.model)

    // Fast mode: header is latched session-stable (cache-safe), but
    // `speed='fast'` stays dynamic so cooldown still suppresses the actual
    // fast-mode request without changing the cache key.
    let speed: BetaMessageStreamParams['speed']
    const isFastModeForRetry =
      isFastModeEnabled() &&
      isFastModeAvailable() &&
      !isFastModeCooldown() &&
      isFastModeSupportedByModel(options.model) &&
      !!retryContext.fastMode &&
      !isFastModeModelRejected287(retryContext.model)
    if (isFastModeForRetry) {
      speed = 'fast'
    }
    if (fastModeHeaderLatched && !betasParams.includes(FAST_MODE_BETA_HEADER)) {
      betasParams.push(FAST_MODE_BETA_HEADER)
    }

    // AFK mode beta: latched once auto mode is first activated. Still gated
    // by isAgenticQuery per-call so classifiers/compaction don't get it.
    if (feature('TRANSCRIPT_CLASSIFIER')) {
      if (
        afkHeaderLatched &&
        shouldIncludeFirstPartyOnlyBetas() &&
        isAgenticQuery &&
        !betasParams.includes(AFK_MODE_BETA_HEADER)
      ) {
        betasParams.push(AFK_MODE_BETA_HEADER)
      }
    }

    if (bindingEnabled) {
      if (!betasParams.includes(THINKING_BINDING_BETA)) betasParams.push(THINKING_BINDING_BETA)
      thinking = applyThinkingBinding(thinking, bindingBehavior, 'thinking' in extraBodyParams)
    }

    // Official 285 appends request-scoped cache betas after the thinking and
    // output controls, not to the memoized model beta list.
    if (
      getModelBetaProducer287().Im() &&
      requestCacheTtl === '1h' &&
      !betasParams.includes(EXTENDED_CACHE_TTL_BETA_HEADER)
    ) betasParams.push(EXTENDED_CACHE_TTL_BETA_HEADER)

    // Cache editing beta: header is latched session-stable; useCachedMC
    // (controls cache_edits body behavior) stays live so edits stop when
    // the feature disables but the header doesn't flip.
    const useCachedMC =
      cachedMCEnabled &&
      getAPIProvider() === 'firstParty' &&
      options.querySource === 'repl_main_thread'
    if (
      cacheEditingHeaderLatched &&
      getAPIProvider() === 'firstParty' &&
      options.querySource === 'repl_main_thread' &&
      !betasParams.includes(cacheEditingBetaHeader)
    ) {
      betasParams.push(cacheEditingBetaHeader)
      logForDebugging(
        'Cache editing beta header enabled for cached microcompact',
      )
    }

    // Re-evaluate the diagnosis rejection on every attempt.
    const cacheDiagnosisActive = cacheDiagnosisEnabled && !getCacheDiagnosisHeaderRefused()
    if (cacheDiagnosisActive && !betasParams.includes(CACHE_DIAGNOSIS_BETA_HEADER))
      betasParams.push(CACHE_DIAGNOSIS_BETA_HEADER)

    // Only send temperature when thinking is disabled — the API requires
    // temperature: 1 when thinking is enabled, which is already the default.
    const temperature = !hasThinking
      ? (options.temperatureOverride ?? 1)
      : undefined

    lastRequestBetas = betasParams

    const params = {
      model: normalizeModelStringForAPI(options.model),
      messages: addCacheBreakpoints(
        messagesForAPI,
        enablePromptCaching && !options.skipMessageCacheMarkers,
        options.querySource,
        useCachedMC,
        consumedCacheEdits,
        consumedPinnedEdits,
        options.skipCacheWrite,
        options.agentCacheTtlOverride,
        {cacheTtl: requestCacheTtl, forkPointUuid: options.forkPointUuid},
      ),
      system,
      tools: allTools,
      ...(serverRequested287&&serverContext287!==undefined&&{auto_mode_context:serverContext287}),
      tool_choice: options.toolChoice,
      ...(useBetas && { betas: betasParams }),
      metadata: getAPIMetadata(),
      max_tokens: maxOutputTokens,
      thinking,
      ...(temperature !== undefined && { temperature }),
      ...(contextManagement &&
        useBetas &&
        betasParams.includes(CONTEXT_MANAGEMENT_BETA_HEADER) && {
          context_management: contextManagement,
        }),
      ...extraBodyParams,
      ...(Object.keys(outputConfig).length > 0 && {
        output_config: outputConfig,
      }),
      ...(speed !== undefined && { speed }),
      ...(cacheDiagnosisActive && (isAgenticQuery || options.forkPointUuid !== undefined) &&
        useBetas && !process.env.CLAUDE_CODE_SIMULATE_PROXY_USAGE && {
          diagnostics: {previous_message_id: previousAPIMessageId ?? null},
        }),
    }
    params.thinking = sanitizeDisabledThinking(params.thinking)
    return params
  }

  // Compute log scalars synchronously so the fire-and-forget .then() closure
  // captures only primitives instead of paramsFromContext's full closure scope
  // (messagesForAPI, system, allTools, betas — the entire request-building
  // context), which would otherwise be pinned until the promise resolves.
  {
    const queryParams = paramsFromContext({
      model: options.model,
      thinkingConfig,
    })
    const logMessagesLength = queryParams.messages.length
    const logBetas = useBetas ? (queryParams.betas ?? []) : []
    const logThinkingType = queryParams.thinking?.type ?? 'disabled'
    const logEffortValue = queryParams.output_config?.effort
    void options.getToolPermissionContext().then(permissionContext => {
      logAPIQuery({
        model: options.model,
        messagesLength: logMessagesLength,
        temperature: options.temperatureOverride ?? 1,
        betas: logBetas,
        permissionMode: permissionContext.mode,
        querySource: options.querySource,
        queryTracking: options.queryTracking,
        thinkingType: logThinkingType,
        effortValue: logEffortValue,
        fastMode: isFastMode,
        previousRequestId,
      })
    })
  }

  const newMessages: AssistantMessage[] = []
  let ttftMs = 0
  let partialMessage: BetaMessage | undefined = undefined
  const contentBlocks: (BetaContentBlock | ConnectorTextBlock)[] = []
  let usage: NonNullableUsage = EMPTY_USAGE
  let costUSD = 0
  let stopReason: BetaStopReason | null = null
  let didFallBackToNonStreaming = false
  let fallbackMessage: AssistantMessage | undefined
  let maxOutputTokens = 0
  let responseHeaders: globalThis.Headers | undefined = undefined
  let research: unknown = undefined
  let isFastModeRequest = isFastMode // Keep separate state as it may change if falling back
  let isAdvisorInProgress = false
  let lowPriorityStreamMarked = false
  let streamRetryStatusPublished = false
  let quotaAccountEpoch = getQuotaAccountEpoch()
  let quotaHeadersObservedAt = requestClock.now()

  try {
    startSessionActivity('api_call', activityAgentId287)
    queryCheckpoint('query_client_creation_start')
    const generator = withRetry(
      () =>
        getAnthropicClient({
          maxRetries: 0, // Disabled auto-retry in favor of manual implementation
          model: options.model,
          fetchOverride: options.fetchOverride,
          source: options.querySource,
          credentials: options.credentials,
          storageV5: options.storageV5,
          agentContext,
          promptId,
        }),
      async (anthropic, attempt, context) => {
        postTurnCacheAttempt287.reset()
        attemptNumber = attempt
        isFastModeRequest = context.fastMode ?? false
        const attemptStartedAt = requestClock.monotonicNow()
        start = Date.now()
        attemptStartTimes.push(start)
        // Client has been created by withRetry's getClient() call. This fires
        // once per attempt; on retries the client is usually cached (withRetry
        // only calls getClient() again after auth errors), so the delta from
        // client_creation_start is meaningful on attempt 1.
        queryCheckpoint('query_client_creation_end')

        const params = paramsFromContext(context)
        captureAPIRequest(params, options.querySource) // Capture for bug reports

        maxOutputTokens = params.max_tokens

        // Fire immediately before the fetch is dispatched. .withResponse() below
        // awaits until response headers arrive, so this MUST be before the await
        // or the "Network TTFB" phase measurement is wrong.
        queryCheckpoint('query_api_request_sent')
        postTurnRequestAt287 = requestClock.now()
        if (!options.agentId) {
          headlessProfilerCheckpoint('api_request_sent')
        }

        // Generate and track client request ID so timeouts (which return no
        // server request ID) can still be correlated with server logs.
        // First-party only — 3P providers don't log it (inc-4029 class).
        clientRequestId =
          getAPIProvider() === 'firstParty' && isFirstPartyRequestEndpoint()
            ? randomUUID()
            : undefined

        if (clientRequestId) armStreamFirstResponse(clientRequestId, {escalated: noResponseRetryLedger.count > 0})

        // Use raw stream instead of BetaMessageStream to avoid O(n²) partial JSON parsing
        // BetaMessageStream calls partialParse() on every input_json_delta, which we don't need
        // since we handle tool input accumulation ourselves
        // biome-ignore lint/plugin: main conversation loop handles attribution separately
        quotaAccountEpoch = getQuotaAccountEpoch()
        lowPriorityStreamMarked = getAPIProvider() === 'firstParty' && isFirstPartyAnthropicBaseUrl() &&
          isClaudeAISubscriber() && isOfficialLowPriorityActive()
        slowResponseWarning.start(attemptStartedAt, attempt)
        const requestOptions287={signal,headers:{...getCompactRequestHeaders(options.compactionRequestKind),...(clientRequestId?{[CLIENT_REQUEST_ID_HEADER]:clientRequestId}:{})}}
        const toolSearchWire287=serializeToolSearchWire287()
        const pendingRequest287=toolSearchWire287===undefined
          ?anthropic.beta.messages.create({...params,stream:true},requestOptions287)
          :createToolSearchStream287(anthropic.beta.messages,params,requestOptions287,toolSearchWire287)
        const result=await pendingRequest287.withResponse().catch(error=>{slowResponseWarning.clear();throw error})

        queryCheckpoint('query_response_headers_received')
        streamRequestId = result.request_id
        adoptServerResponse287(undefined,params)
        streamResponse = result.response
        quotaHeadersObservedAt = requestClock.now()
        return result.data
      },
      {
        model: options.model,
        credentials: options.credentials,
        storageV5: options.storageV5,
        fallbackModel: options.fallbackModel,
        thinkingConfig,
        ...(isFastModeEnabled() ? { fastMode: isFastMode } : false),
        modelIsRefusalFallbackTarget: options.modelIsRefusalFallbackTarget,
        signal,
        querySource: options.querySource,
        noResponseRetryLedger,
        maxRetries: modelCallRetries.retriesLeft(),
        modelCallRetries,
        onRetryStatus: options.onRetryStatus,
        onQuotaWindowWait: (error, metadata) => beginQuotaWindowWait(error, metadata, options.querySource,
          options.model, quotaAccountEpoch, requestClock, !!options.agentId, options.storageV5),
        clock: requestClock, random: options.random,
        subscribeRetryWake: options.subscribeRetryWake,
        onError: error => {
          const bindingRepair = handleThinkingBindingAPIError(error)
          if (bindingRepair) return bindingRepair
          const toolSearchRepair287=handleToolSearchProtocolAPIError287(error)
          if(toolSearchRepair287)return toolSearchRepair287
          if (!(error instanceof APIError)) return undefined
          responseErrorClassifier287.updateRequest(lastRequestBetas ?? [])
          const displayUpdatesRepair = responseErrorClassifier287.OVe(error)
          if (displayUpdatesRepair) {
            thinkingDisplayUpdatesRetrying = true
            logForDebugging('[thinking-display-updates] server rejected beta; retrying without it')
            return displayUpdatesRepair
          }
          if (
            error.status === 400 &&
            betas.includes(THINKING_RESUMPTION_BETA_HEADER) &&
            !getThinkingResumptionHeaderRefused() &&
            error.message.includes(THINKING_RESUMPTION_BETA_HEADER)
          ) {
            setThinkingResumptionHeaderRefused(true)
            logForDebugging(
              '[thinking-resumption] server rejected beta; retrying without it for this session',
            )
            return 'retry:thinking-resumption-beta'
          }
          if (
            error.status === 400 &&
            cacheDiagnosisEnabled &&
            !getCacheDiagnosisHeaderRefused() &&
            error.message.includes(CACHE_DIAGNOSIS_BETA_HEADER)
          ) {
            setCacheDiagnosisHeaderRefused(true)
            logForDebugging(
              '[cache-diagnosis] server rejected beta; retrying without it for this conversation',
            )
            return 'retry:cache-diagnosis-beta'
          }
          return undefined
        },
      },
    )

    let e
    try {
      do {
        e = await generator.next()
        // API errors have no stream controller.
        if (!('controller' in e.value)) yield e.value
      } while (!e.done)
    } finally {
      await generator.return(undefined as never)
    }
    stream = e.value as Stream<BetaRawMessageStreamEvent>

    // reset state
    newMessages.length = 0
    ttftMs = 0
    partialMessage = undefined
    contentBlocks.length = 0
    usage = EMPTY_USAGE
    stopReason = null
    isAdvisorInProgress = false

    // The transport owns the first-byte and SSE byte watchdogs. The official
    // client also keeps an event-level timer for streams whose event parser is
    // idle even though the underlying response remains open.
    let streamIdleAborted = false
    let streamWatchdogFiredAt: number | null = null
    const eventClock = requestClock
    const chunkTimes = (streamResponse as (Response & {_chunkTimes?: ByteChunkTimes286}) | undefined)?._chunkTimes
    const eventWatchdog = createStreamEventWatchdog286({
      model: options.model, requestId: streamRequestId, chunkTimes,
      startedAt: eventClock.monotonicNow(), clock: eventClock,
      onRetryStatus: options.onRetryStatus,
      release: () => {
        streamIdleAborted = eventWatchdog.fired
        streamWatchdogFiredAt = eventWatchdog.firedAt
        releaseStreamResources()
      },
    })
    const pendingStreamOutput: (StreamEvent | AssistantMessage)[] = []
    let hasSubstantiveStreamOutput = false
    // Protocol progress is distinct from the retained local display buffer.
    // Original PNt qs/Xi/Zs/Gi/El/hk: each actual attempt owns fresh state.
    let streamAnyEvent = false
    let streamAnyBlockFinished = false
    let streamAnyOutputShown = false
    let activeStreamBlock: number | null = null
    let streamEnvelopeOpen = false
    let streamHiddenBlock = false
    // Accessor view of this attempt, not another stream-state owner.
    const closeInterruptedStream287=createStreamBoundary287({
      get envelopeOpen(){return streamEnvelopeOpen},set envelopeOpen(v){streamEnvelopeOpen=v},
      get activeBlock(){return activeStreamBlock},set activeBlock(v){activeStreamBlock=v},
      get hiddenBlock(){return streamHiddenBlock},set hiddenBlock(v){streamHiddenBlock=v},
    })
    let streamTerminal = false
    const completedStreamBlocks = new WeakSet<object>()
    async function* flushPendingStreamOutput(): AsyncGenerator<
      StreamEvent | AssistantMessage,
      void
    > {
      const buffered = pendingStreamOutput.splice(0)
      for (const output of buffered) yield output
    }
    function isSubstantiveStreamPart(part: BetaRawMessageStreamEvent): boolean {
      if (part.type === 'content_block_start') {
        const block = part.content_block
        if (block.type === 'thinking' || block.type === 'redacted_thinking') return false
        if (block.type === 'text') return block.text.length > 0
        if (block.type === 'tool_use' || block.type === 'server_tool_use') {
          return Object.keys(block.input ?? {}).length > 0
        }
        return true
      }
      if (part.type === 'content_block_delta') {
        const delta = part.delta as {
          type: string
          text?: string
          partial_json?: string
          connector_text?: string
        }
        if (delta.type === 'thinking_delta' || delta.type === 'signature_delta') return false
        const content = delta.text ?? delta.partial_json ?? delta.connector_text
        if (content !== undefined) return content.length > 0
        return true
      }
      if (part.type === 'content_block_stop') {
        const block = contentBlocks[part.index]
        return Boolean(block && block.type !== 'thinking' && block.type !== 'redacted_thinking')
      }
      return false
    }
    const clearStreamIdleTimers = eventWatchdog.MH
    function armEventWatchdog(): void {
      eventWatchdog.setAdvisorActive(isAdvisorInProgress)
      eventWatchdog.KA()
    }

    try {
      // stream in and accumulate state
      let isFirstChunk = true
      let lastEventTime: number | null = null // Set after first chunk to avoid measuring TTFB as a stall
      const STALL_THRESHOLD_MS = 30_000 // 30 seconds
      let totalStallTime = 0
      let stallCount = 0
      // Start before the first parsed event so a byte-dribbling or malformed
      // SSE body cannot keep the event parser alive without producing events.
      armEventWatchdog()

      let consecutivePings = 0
      for await (const part of streamEventHeartbeat286.KMo(stream, chunkTimes, undefined, eventClock)) {
        if (part.type === 'ping') {
          consecutivePings++
          if (consecutivePings <= streamEventHeartbeat286.qMo) armEventWatchdog()
          else if (!eventWatchdog.enabled || eventWatchdog.fired) continue
          yield {type: 'stream_event', event: part}
          continue
        }
        consecutivePings = 0
        if (!hasSubstantiveStreamOutput && isSubstantiveStreamPart(part)) {
          hasSubstantiveStreamOutput = true
          yield* flushPendingStreamOutput()
        }
        const now = Date.now()

        // Detect and log streaming stalls (only after first event to avoid counting TTFB)
        if (lastEventTime !== null) {
          const timeSinceLastEvent = now - lastEventTime
          if (timeSinceLastEvent > STALL_THRESHOLD_MS) {
            stallCount++
            totalStallTime += timeSinceLastEvent
            logForDebugging(
              `Streaming stall detected: ${(timeSinceLastEvent / 1000).toFixed(1)}s gap between events (stall #${stallCount})`,
              { level: 'warn' },
            )
            logEvent('tengu_streaming_stall', {
              stall_duration_ms: timeSinceLastEvent,
              stall_count: stallCount,
              total_stall_time_ms: totalStallTime,
              event_type:
                part.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              model:
                options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              request_id: (streamRequestId ??
                'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
            })
          }
        }
        lastEventTime = now
        armEventWatchdog()

        if (isFirstChunk) {
          slowResponseWarning.clear()
          logForDebugging('Stream started - received first chunk')
          queryCheckpoint('query_first_chunk_received')
          if (!options.agentId) {
            headlessProfilerCheckpoint('first_chunk')
          }
          endQueryProfile()
          isFirstChunk = false
        }

        switch (part.type) {
          case 'message_start': {
            streamEnvelopeOpen = true
            activeStreamBlock = null
            streamHiddenBlock = false
            partialMessage = part.message
            ttftMs = Date.now() - start
            usage = updateUsage(usage, part.message?.usage)
            // Capture research from message_start if available (internal only).
            // Always overwrite with the latest value.
            if (
              process.env.USER_TYPE === 'ant' &&
              'research' in (part.message as unknown as Record<string, unknown>)
            ) {
              research = (part.message as unknown as Record<string, unknown>)
                .research
            }
            break
          }
          case 'content_block_start':
            if (!part.content_block || typeof part.content_block !== 'object') {
              streamTerminal = false
              throw new StreamMalformedEventError286('unreadable')
            }
            if (streamFailurePredicates286.vIo({previous:contentBlocks[part.index],
                closedContentBlocks:completedStreamBlocks,started:part.content_block})) {
              throw new StreamMalformedEventError286('closed')
            }
            streamTerminal = false
            activeStreamBlock = part.index
            streamHiddenBlock = isHiddenStreamBlock287(part.content_block.type)
            if (part.content_block.type !== 'thinking' && part.content_block.type !== 'redacted_thinking' &&
                !streamFailurePredicates286.fallbackBlock(part.content_block)) streamAnyOutputShown = true
            switch (part.content_block.type) {
              case 'tool_use':
                contentBlocks[part.index] = {
                  ...part.content_block,
                  input: '',
                }
                break
              case 'server_tool_use':
                contentBlocks[part.index] = {
                  ...part.content_block,
                  input: '' as unknown as { [key: string]: unknown },
                }
                if ((part.content_block.name as string) === 'advisor') {
                  isAdvisorInProgress = true
                  logForDebugging(`[AdvisorTool] Advisor tool called`)
                  logEvent('tengu_advisor_tool_call', {
                    model:
                      options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                    advisor_model: (advisorModel ??
                      'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                  })
                }
                break
              case 'text':
                contentBlocks[part.index] = {
                  ...part.content_block,
                  // awkwardly, the sdk sometimes returns text as part of a
                  // content_block_start message, then returns the same text
                  // again in a content_block_delta message. we ignore it here
                  // since there doesn't seem to be a way to detect when a
                  // content_block_delta message duplicates the text.
                  text: '',
                }
                break
              case 'thinking':
                contentBlocks[part.index] = {
                  ...part.content_block,
                  // also awkward
                  thinking: '',
                  // initialize signature to ensure field exists even if signature_delta never arrives
                  signature: '',
                }
                break
              default:
                // even more awkwardly, the sdk mutates the contents of text blocks
                // as it works. we want the blocks to be immutable, so that we can
                // accumulate state ourselves.
                contentBlocks[part.index] = { ...part.content_block }
                if (
                  (part.content_block.type as string) === 'advisor_tool_result'
                ) {
                  isAdvisorInProgress = false
                  logForDebugging(`[AdvisorTool] Advisor tool result received`)
                }
                break
            }
            break
          case 'content_block_delta': {
            const contentBlock = contentBlocks[part.index]
            const delta = part.delta as typeof part.delta | ConnectorTextDelta
            if (!contentBlock || !completedStreamBlocks.has(contentBlock)) streamTerminal = false
            if (!contentBlock || completedStreamBlocks.has(contentBlock)) {
              logEvent('tengu_streaming_error', {
                error_type:
                  'content_block_not_found_delta' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                part_type:
                  part.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                part_index: part.index,
              })
              throw new StreamMalformedEventError286(contentBlock ? 'closed' : 'unstarted')
            }
            if (!delta || typeof delta !== 'object' || typeof delta.type !== 'string') {
              throw new StreamMalformedEventError286('unreadable')
            }
            if (
              feature('CONNECTOR_TEXT') &&
              delta.type === 'connector_text_delta'
            ) {
              if (contentBlock.type !== 'connector_text') {
                logEvent('tengu_streaming_error', {
                  error_type:
                    'content_block_type_mismatch_connector_text' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                  expected_type:
                    'connector_text' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                  actual_type:
                    contentBlock.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                })
                throw new Error('Content block is not a connector_text block')
              }
              contentBlock.connector_text += delta.connector_text
            } else {
              switch (delta.type) {
                case 'citations_delta':
                  // TODO: handle citations
                  break
                case 'input_json_delta':
                  if (
                    contentBlock.type !== 'tool_use' &&
                    contentBlock.type !== 'server_tool_use'
                  ) {
                    logEvent('tengu_streaming_error', {
                      error_type:
                        'content_block_type_mismatch_input_json' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      expected_type:
                        'tool_use' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      actual_type:
                        contentBlock.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                    })
                    throw new StreamMalformedEventError286('unreadable')
                  }
                  if (typeof contentBlock.input !== 'string') {
                    logEvent('tengu_streaming_error', {
                      error_type:
                        'content_block_input_not_string' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      input_type:
                        typeof contentBlock.input as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                    })
                    throw new StreamMalformedEventError286('unreadable')
                  }
                  if (typeof contentBlock.input !== 'string' || typeof delta.partial_json !== 'string') throw new StreamMalformedEventError286('unreadable')
                  contentBlock.input += delta.partial_json
                  break
                case 'text_delta':
                  if (contentBlock.type !== 'text') {
                    logEvent('tengu_streaming_error', {
                      error_type:
                        'content_block_type_mismatch_text' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      expected_type:
                        'text' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      actual_type:
                        contentBlock.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                    })
                    throw new StreamMalformedEventError286('unreadable')
                  }
                  if (typeof delta.text !== 'string') throw new StreamMalformedEventError286('unreadable')
                  contentBlock.text += delta.text
                  break
                case 'signature_delta':
                  if (
                    feature('CONNECTOR_TEXT') &&
                    contentBlock.type === 'connector_text'
                  ) {
                    if (typeof delta.signature !== 'string') throw new StreamMalformedEventError286('unreadable')
                  contentBlock.signature = delta.signature
                    break
                  }
                  if (contentBlock.type !== 'thinking') {
                    logEvent('tengu_streaming_error', {
                      error_type:
                        'content_block_type_mismatch_thinking_signature' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      expected_type:
                        'thinking' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      actual_type:
                        contentBlock.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                    })
                    throw new StreamMalformedEventError286('unreadable')
                  }
                  if (typeof delta.signature !== 'string') throw new StreamMalformedEventError286('unreadable')
                  contentBlock.signature = delta.signature
                  break
                case 'thinking_delta':
                  // Fixed official 2.1.283 ignores a thought delta against a
                  // redacted block; it is not displayable text.
                  if (contentBlock.type === 'redacted_thinking') break
                  if (contentBlock.type !== 'thinking') {
                    logEvent('tengu_streaming_error', {
                      error_type:
                        'content_block_type_mismatch_thinking_delta' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      expected_type:
                        'thinking' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      actual_type:
                        contentBlock.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                    })
                    throw new StreamMalformedEventError286('unreadable')
                  }
                  if (typeof delta.thinking !== 'string') throw new StreamMalformedEventError286('unreadable')
                  contentBlock.thinking += delta.thinking
                  break
              }
            }
            // Capture research from content_block_delta if available (internal only).
            // Always overwrite with the latest value.
            if (process.env.USER_TYPE === 'ant' && 'research' in part) {
              research = (part as { research: unknown }).research
            }
            break
          }
          case 'content_block_stop': {
            const contentBlock = contentBlocks[part.index]
            if (!contentBlock || !completedStreamBlocks.has(contentBlock)) streamTerminal = false
            if (!contentBlock || completedStreamBlocks.has(contentBlock)) {
              logEvent('tengu_streaming_error', {
                error_type:
                  'content_block_not_found_stop' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                part_type:
                  part.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                part_index: part.index,
              })
              throw new StreamMalformedEventError286(contentBlock ? 'closed' : 'unstarted')
            }
            activeStreamBlock = null
            streamHiddenBlock = false
            if (!partialMessage) {
              logEvent('tengu_streaming_error', {
                error_type:
                  'partial_message_not_found' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                part_type:
                  part.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              })
              throw new Error('Message not found')
            }
            const m: AssistantMessage = {
              message: {
                ...partialMessage,
                content: normalizeContentFromAPI(
                  [contentBlock] as BetaContentBlock[],
                  tools,
                  options.agentId,
                ),
              },
              requestId: streamRequestId ?? undefined,
              type: 'assistant',
              uuid: randomUUID(),
              timestamp: new Date().toISOString(),
              ...(process.env.USER_TYPE === 'ant' &&
                research !== undefined && { research }),
              ...(advisorModel && { advisorModel }),
              ...(serverRequest287&&getServerClassifier287().$Pe(serverRequest287)),
            }
            newMessages.push(m)
            completedStreamBlocks.add(contentBlock)
            if (m.message.content.some(block => !streamFailurePredicates286.fallbackBlock(block))) {
              streamAnyBlockFinished = true
              if (m.message.content.some(block => block.type !== 'thinking' && block.type !== 'redacted_thinking' &&
                  !streamFailurePredicates286.fallbackBlock(block))) streamAnyOutputShown = true
            }
            if (
              !hasSubstantiveStreamOutput &&
              (contentBlock.type === 'thinking' || contentBlock.type === 'redacted_thinking')
            ) {
              pendingStreamOutput.push(m)
            } else {
              yield m
            }
            break
          }
          case 'message_delta': {
            if (!part.delta || typeof part.delta !== 'object') {
              streamTerminal = false
              throw new StreamMalformedEventError286('unreadable')
            }
            if(serverRequest287&&'safeguard_results'in part.delta)getServerClassifier287().nCt(serverRequest287,part.delta,
              contentBlocks.flatMap(block=>block?.type==='tool_use'&&typeof block.id==='string'?[block.id]:[]))
            usage = updateUsage(usage, part.usage)
            // Capture research from message_delta if available (internal only).
            // Always overwrite with the latest value. Also write back to
            // already-yielded messages since message_delta arrives after
            // content_block_stop.
            if (
              process.env.USER_TYPE === 'ant' &&
              'research' in (part as unknown as Record<string, unknown>)
            ) {
              research = (part as unknown as Record<string, unknown>).research
              for (const msg of newMessages) {
                msg.research = research
              }
            }

            // Write final usage and stop_reason back to the last yielded
            // message. Messages are created at content_block_stop from
            // partialMessage, which was set at message_start before any tokens
            // were generated (output_tokens: 0, stop_reason: null).
            // message_delta arrives after content_block_stop with the real
            // values.
            //
            // IMPORTANT: Use direct property mutation, not object replacement.
            // The transcript write queue holds a reference to message.message
            // and serializes it lazily (100ms flush interval). Object
            // replacement ({ ...lastMsg.message, usage }) would disconnect
            // the queued reference; direct mutation ensures the transcript
            // captures the final values.
            if (typeof part.delta.stop_reason === 'string') {
              stopReason = part.delta.stop_reason
              streamTerminal = true
            }

            const stopDetails = (
              part.delta as unknown as {
                stop_details?: {
                  category?: string | null
                  explanation?: string | null
                } | null
              }
            ).stop_details
            const refusalRecovery: RefusalRecoveryMetadata | undefined =
              stopReason === 'refusal'
                ? {
                    original_model: options.model,
                    request_id: streamRequestId ?? null,
                    api_refusal_category: stopDetails?.category ?? null,
                    api_refusal_explanation:
                      stopDetails?.explanation ?? null,
                    refused_user_message_uuid: null,
                    scope: 'local',
                    retracted_message_uuids: [],
                  }
                : undefined

            const lastMsg = newMessages.at(-1)
            if (lastMsg) {
              lastMsg.message.usage = usage
              lastMsg.message.stop_reason = stopReason
              if (refusalRecovery) {
                ;(lastMsg as unknown as { refusalRecovery: RefusalRecoveryMetadata }).refusalRecovery =
                  refusalRecovery
                ;(
                  lastMsg.message as unknown as {
                    stop_details?: { category?: string | null; explanation?: string | null }
                  }
                ).stop_details = stopDetails ?? undefined
              }
            }

            // Update cost
            const costUSDForPart = calculateUSDCost(resolvedModel, usage)
            costUSD += addToTotalSessionCost(
              costUSDForPart,
              usage,
              options.model,
            )

            const refusalMessage = getErrorMessageIfRefusal(
              part.delta.stop_reason,
              options.model,
              refusalRecovery,
            )
            if (refusalMessage) {
              yield refusalMessage
            }

            if (stopReason === 'max_tokens') {
              logEvent('tengu_max_tokens_reached', {
                max_tokens: maxOutputTokens,
              })
              yield createAssistantAPIErrorMessage({
                content: `${API_ERROR_MESSAGE_PREFIX}: Claude's response exceeded the ${
                  maxOutputTokens
                } output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.`,
                apiError: 'max_output_tokens',
                error: 'max_output_tokens',
              })
            }

            if (stopReason === 'model_context_window_exceeded') {
              logEvent('tengu_context_window_exceeded', {
                max_tokens: maxOutputTokens,
                output_tokens: usage.output_tokens,
              })
              // Reuse the max_output_tokens recovery path — from the model's
              // perspective, both mean "response was cut off, continue from
              // where you left off."
              yield createAssistantAPIErrorMessage({
                content: `${API_ERROR_MESSAGE_PREFIX}: The model has reached its context window limit.`,
                apiError: 'max_output_tokens',
                error: 'max_output_tokens',
              })
            }
            break
          }
          case 'message_stop':
            streamEnvelopeOpen = false
            activeStreamBlock = null
            streamHiddenBlock = false
            break
        }

        eventWatchdog.setAdvisorActive(isAdvisorInProgress)
        streamAnyEvent = true
        const streamEvent: StreamEvent = {
          type: 'stream_event',
          event: part,
          ...(part.type === 'message_start' ? { ttftMs } : undefined),
          ...(appliedThinkingDisplay && (part.type === 'message_start' ||
            part.type === 'content_block_start' && part.content_block.type === 'thinking' ||
            part.type === 'content_block_delta' && part.delta.type === 'thinking_delta')
            ? { thinkingDisplay: appliedThinkingDisplay } : undefined),
        }
        if (hasSubstantiveStreamOutput) yield streamEvent
        else pendingStreamOutput.push(streamEvent)
      }
      // Clear the idle timeout watchdog now that the stream loop has exited
      clearStreamIdleTimers()

      // If the stream was aborted by our idle timeout watchdog, fall back to
      // non-streaming retry rather than treating it as a completed stream.
      if (streamIdleAborted) {
        // Instrumentation: proves the for-await exited after the watchdog fired
        // (vs. hung forever). exit_delay_ms measures abort propagation latency:
        // 0-10ms = abort worked; >>1000ms = something else woke the loop.
        const exitDelayMs =
          streamWatchdogFiredAt !== null
            ? Math.round(eventClock.monotonicNow() - streamWatchdogFiredAt)
            : -1
        logForDiagnosticsNoPII(
          'info',
          'cli_stream_loop_exited_after_watchdog_clean',
        )
        logEvent('tengu_stream_loop_exited_after_watchdog', {
          request_id: (streamRequestId ??
            'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
          exit_delay_ms: exitDelayMs,
          exit_path:
            'clean' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
          model:
            options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        })
        // Prevent double-emit: this throw lands in the catch block below,
        // whose exit_path='error' probe guards on streamWatchdogFiredAt.
        streamWatchdogFiredAt = null
        throw new Error('Stream idle timeout - no chunks received')
      }

      if (signal.aborted) {
        yield* flushPendingStreamOutput()
        return
      }
      if (streamEnvelopeOpen && activeStreamBlock !== null) throw new streamFailurePredicates286.TruncatedStreamError()
      if (!partialMessage || newMessages.length === 0 && !stopReason) throw new streamFailurePredicates286.NoEventsError()
      if (streamEnvelopeOpen && !(stopReason !== null && streamTerminal)) throw new streamFailurePredicates286.TruncatedStreamError()

      // Thinking-only messages are held until a clean stop reason arrives so
      // a failed empty/thinking attempt can be retried without transcript dupes.
      yield* flushPendingStreamOutput()

      // Log summary if any stalls occurred during streaming
      if (stallCount > 0) {
        logForDebugging(
          `Streaming completed with ${stallCount} stall(s), total stall time: ${(totalStallTime / 1000).toFixed(1)}s`,
          { level: 'warn' },
        )
        logEvent('tengu_streaming_stall_summary', {
          stall_count: stallCount,
          total_stall_time_ms: totalStallTime,
          model:
            options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
          request_id: (streamRequestId ??
            'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        })
      }

      // Check if the cache actually broke based on response tokens
      if (feature('PROMPT_CACHE_BREAK_DETECTION')) {
        void checkResponseForCacheBreak(
          options.querySource,
          usage.cache_read_input_tokens,
          usage.cache_creation_input_tokens,
          messages,
          options.agentId,
          streamRequestId,
        )
      }

      finishLowPriorityWait(lowPriorityStreamWait, true)
      // Process fallback percentage header and quota status if available
      // streamResponse is set when the stream is created in the withRetry callback above
      // TypeScript's control flow analysis can't track that streamResponse is set in the callback
      // eslint-disable-next-line eslint-plugin-n/no-unsupported-features/node-builtins
      const resp = streamResponse as unknown as Response | undefined
      if (resp) {
        if (getAPIProvider() === 'firstParty' && isFirstPartyAnthropicBaseUrl() && isClaudeAISubscriber()) observeLowPriorityHeaders(resp.headers, false)
        extractGraceStatusFromHeaders(resp.headers, quotaGraceEligible(options.querySource), quotaHeadersObservedAt, quotaAccountEpoch)
        extractQuotaStatusFromHeaders(resp.headers, options.model, quotaLongContext(options.model, usage), quotaHeadersObservedAt, quotaAccountEpoch, options.storageV5)
        // Store headers for gateway detection
        responseHeaders = resp.headers
      }
    } catch (streamingError) {
      slowResponseWarning.clear()
      // Clear the idle timeout watchdog on error path too
      clearStreamIdleTimers()

      // Preserve the local refusal completion boundary and all its metadata.
      // Other failures consume the original protocol classifier/controller.
      if (stopReason === 'refusal') {
        yield* flushPendingStreamOutput()
      } else {
      if (streamingError instanceof APIUserAbortError) {
        if (signal.aborted) {
          yield* flushPendingStreamOutput()
          throw streamingError
        }
        if (!streamIdleAborted) streamingError = new APIConnectionTimeoutError({message: 'Request timed out'})
      }
      if (!streamIdleAborted && streamingError instanceof StreamIdleTimeoutError) streamIdleAborted = true
      const connection = streamFailurePredicates286.connectionFlags(streamingError)
      const malformed = streamFailurePredicates286.malformedStream(streamingError)
      const serverError = isOverloadedStreamError286(streamingError) ||
        streamFailurePredicates286.serverError(streamingError) ||
        streamingError instanceof APIError && streamingError.type === 'api_error'
      const denied = streamFailurePredicates286.denied(streamingError) ||
        streamFailurePredicates286.Tht(streamingError) ||
        streamFailurePredicates286.CF(streamingError)
      const disableFallback =
        ((getFeatureValue_CACHED_MAY_BE_STALE('tengu_watchdog_skip_nonstreaming_fallback', false) ||
          isEnvTruthy(process.env.CLAUDE_CODE_REMOTE)) && streamIdleAborted) ||
        isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK) ||
        getFeatureValue_CACHED_MAY_BE_STALE('tengu_disable_streaming_to_non_streaming_fallback', false)
      const failure = modelCallRetry286.QLt({
        error: streamingError, isServerError: serverError, stalled: streamIdleAborted,
        isConnectionError: connection.isConnectionError,
        truncated: connection.connectionDetails?.code === 'StreamTruncated', malformed, denied,
        anyEvent: streamAnyEvent, anyBlockFinished: streamAnyBlockFinished, anyOutputShown: streamAnyOutputShown,
        stopReasonReceived: stopReason !== null,
        complete: stopReason !== null && streamTerminal && activeStreamBlock === null,
      })
      const decision = failure === undefined ? 'keepPartial' : modelCallRetries.onStreamFailed(failure, !disableFallback)
      const counts = modelCallRetries.counts()
      const thinkingOverload = failure?.progress === 'thinkingOnly' && failure.cause === 'overloaded' && !failure.stopReasonReceived
      const partialBranch = failure === undefined || failure.progress === 'output' ||
        failure.progress === 'thinkingOnly' && !thinkingOverload

      if (partialBranch && decision === 'keepPartial') {
        yield* flushPendingStreamOutput()
        if (stopReason !== null && streamTerminal && activeStreamBlock === null) {
          // Complete stop boundary: do not replay finished text/tools.
          if (hasSubstantiveStreamOutput) yield* closeInterruptedStream287()
        } else {
          const hasTool = newMessages.some(message => message.message.content.some(block => block.type === 'tool_use'))
          stopReason = hasTool ? 'tool_use' : 'end_turn'
          for (const message of newMessages) {
            message.message.usage = usage
            message.message.stop_reason = stopReason
          }
          yield partialStreamFinal286({
            hasOutput: streamAnyOutputShown, stalled: streamIdleAborted, serverError,
            malformed, unstartedBlock: streamingError instanceof StreamMalformedEventError286 && streamingError.blockState === 'unstarted',
            suspended: connection.connectionDetails?.code === 'StreamSuspended', hasTool,
          })
          yield* closeInterruptedStream287()
        }
      } else {
      // Official low-priority wait has its own budget; undo the ordinary
      // stream decision only after the native capacity wait is accepted.
      if (lowPriorityStreamMarked && isOverloadedStreamError286(streamingError) && !streamAnyOutputShown) {
        const active = isOfficialLowPriorityActive()
        const waiting = lowPriorityRetry(streamingError, true, options.querySource, lowPriorityStreamWait)
        if (waiting && !modelCallRetries.outOfApiAttempts()) {
          modelCallRetries.undoLastCount()
          if (hasSubstantiveStreamOutput) yield* closeInterruptedStream287()
          releaseStreamResources()
          yield createSystemAPIErrorMessage(streamingError as APIError, waiting.delayMs, waiting.attempt, 0)
          streamRetryStatusPublished = true
          options.onRetryStatus?.(getRetryStatus286().createLowPriorityWaiting(waiting.attempt, waiting.delayMs, requestClock.now() + waiting.delayMs))
          await sleepForStreamRetry286(waiting.delayMs, signal, requestClock)
          return LOW_PRIORITY_STREAM_RETRY
        }
        if (active && !isOfficialLowPriorityActive()) throw streamingError
      }
      if (decision === 'retry') {
        const retryAttempt = failure?.cause === 'overloaded' ? counts.overloaded :
          failure?.cause === 'stalled' ? counts.stalls :
          failure?.progress === 'thinkingOnly' ? counts.afterThinkingOnly : counts.retries
        const retryDelayMs = failure?.cause === 'stalled' ? 0 :
          failure?.progress === 'thinkingOnly' && !serverError ? 100 * counts.afterThinkingOnly :
          getRetryDelay(retryAttempt, undefined, undefined, options.random)
        if (hasSubstantiveStreamOutput) yield* closeInterruptedStream287()
        if (retryDelayMs > 0) {
          const retryError = streamingError instanceof APIError ? streamingError : new APIConnectionError({cause: streamingError instanceof Error ? streamingError : undefined})
          if (failure?.cause === 'overloaded' || (connection.isConnectionError && failure?.progress !== 'thinkingOnly')) {
            const maximum = failure?.cause === 'overloaded' ? 2 : modelCallRetry286.qOe()
            streamRetryStatusPublished = true
            const status = getRetryStatus286().createRetrying(retryError, retryAttempt, maximum, retryDelayMs, requestClock.now() + retryDelayMs)
            if (failure?.cause === 'overloaded') status.error.rateLimits = null
            options.onRetryStatus?.(status)
            if (connection.isConnectionError && failure?.progress !== 'thinkingOnly') {
              yield createRetryAPIErrorMessage(retryError,retryDelayMs,retryAttempt,maximum,'connection_retry')
            }
          }
          await sleepForStreamRetry286(retryDelayMs, signal, requestClock)
        }
        releaseStreamResources()
        return STALE_STREAM_RETRY
      }
      yield* flushPendingStreamOutput()
      if (decision === 'useFallbackModel' && options.fallbackModel) {
        throw new FallbackTriggeredError(options.model, options.fallbackModel)
      }
      if (decision !== 'retryWithoutStreaming') throw streamingError
      if (hasSubstantiveStreamOutput) yield* closeInterruptedStream287()

      logForDebugging(
        `Error streaming, falling back to non-streaming mode: ${errorMessage(streamingError)}`,
        { level: 'error' },
      )
      // Original Zf records a partial attempt before the non-streaming fallback.
      if (partialMessage) postTurnCacheAttempt287.record(usage, postTurnRequestAt287)
      didFallBackToNonStreaming = true
      if (options.onStreamingFallback) {
        options.onStreamingFallback()
      }

      logEvent('tengu_streaming_fallback_to_non_streaming', {
        model:
          options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        error:
          streamingError instanceof Error
            ? (streamingError.name as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS)
            : (String(
                streamingError,
              ) as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS),
        attemptNumber,
        maxOutputTokens,
        thinkingType:
          thinkingConfig.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        fallback_disabled: false,
        request_id: (streamRequestId ??
          'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        fallback_cause: (streamIdleAborted
          ? 'watchdog'
          : 'other') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      })

      // Fall back to non-streaming mode with retries.
      // If the streaming failure was itself a 529, count it toward the
      // consecutive-529 budget so total 529s-before-model-fallback is the
      // same whether the overload was hit in streaming or non-streaming mode.
      // This is a speculative fix for https://github.com/anthropics/claude-code/issues/1513
      // Instrumentation: proves executeNonStreamingRequest was entered (vs. the
      // fallback event firing but the call itself hanging at dispatch).
      logForDiagnosticsNoPII('info', 'cli_nonstreaming_fallback_started')
      logEvent('tengu_nonstreaming_fallback_started', {
        request_id: (streamRequestId ??
          'unknown') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        model:
          options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        fallback_cause: (streamIdleAborted
          ? 'watchdog'
          : 'other') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      })
      postTurnRequestAt287 = requestClock.now()
      const result = yield* executeNonStreamingRequest(
        { model: options.model, source: options.querySource, compactionRequestKind: options.compactionRequestKind, agentContext, promptId, fetchOverride: options.fetchOverride, credentials: options.credentials, storageV5: options.storageV5 },
        {
          model: options.model,
          fallbackModel: options.fallbackModel,
          thinkingConfig,
          ...(isFastModeEnabled() && { fastMode: isFastMode }),
        modelIsRefusalFallbackTarget: options.modelIsRefusalFallbackTarget,
          signal,
          initialConsecutive529Errors: is529Error(streamingError) ? 1 : 0,
          querySource: options.querySource,
          noResponseRetryLedger,
          maxRetries: modelCallRetries.retriesLeft(),
          modelCallRetries,
          onRetryStatus: options.onRetryStatus,
          clock: requestClock, random: options.random,
          subscribeRetryWake: options.subscribeRetryWake,
          onError:error=>handleThinkingBindingAPIError(error)??handleToolSearchProtocolAPIError287(error),
        },
        paramsFromContext,
        (attempt, _startTime, tokens) => {
          attemptNumber = attempt
          maxOutputTokens = tokens
        },
        params => captureAPIRequest(params, options.querySource),
        streamRequestId,
        adoptServerResponse287,
        serializeToolSearchWire287,
      )

      const m: AssistantMessage = {
        message: {
          ...result,
          content: normalizeContentFromAPI(
            result.content,
            tools,
            options.agentId,
          ),
        },
        ...(serverRequest287&&getServerClassifier287().$Pe(serverRequest287)),
        requestId: streamRequestId ?? undefined,
        type: 'assistant',
        uuid: randomUUID(),
        timestamp: new Date().toISOString(),
        ...(process.env.USER_TYPE === 'ant' &&
          research !== undefined && {
            research,
          }),
        ...(advisorModel && {
          advisorModel,
        }),
      }
      newMessages.push(m)
      fallbackMessage = m
      postTurnCacheAttempt287.reset()
      yield m
      }
      }
    } finally {
      clearStreamIdleTimers()
    }
  } catch (errorFromRetry) {
    // FallbackTriggeredError must propagate to query.ts, which performs the
    // actual model switch. Swallowing it here would turn the fallback into a
    // no-op — the user would just see "Model fallback triggered: X -> Y" as
    // an error message with no actual retry on the fallback model.
    if (errorFromRetry instanceof FallbackTriggeredError) {
      throw errorFromRetry
    }

    // Check if this is a 404 error during stream creation that should trigger
    // non-streaming fallback. This handles gateways that return 404 for streaming
    // endpoints but work fine with non-streaming. Before v2.1.8, BetaMessageStream
    // threw 404s during iteration (caught by inner catch with fallback), but now
    // with raw streams, 404s are thrown during creation (caught here).
    const is404StreamCreationError =
      !didFallBackToNonStreaming &&
      errorFromRetry instanceof CannotRetryError &&
      modelCallRetries.onWithRetryGaveUp(errorFromRetry.originalError) === 'retryWithoutStreaming'

    if (is404StreamCreationError) {
      // 404 is thrown at .withResponse() before streamRequestId is assigned,
      // and CannotRetryError means every retry failed — so grab the failed
      // request's ID from the error header instead.
      const failedRequestId =
        (errorFromRetry.originalError as APIError | undefined)?.requestID ?? 'unknown'
      logForDebugging(
        'Streaming endpoint returned 404, falling back to non-streaming mode',
        { level: 'warn' },
      )
      didFallBackToNonStreaming = true
      if (options.onStreamingFallback) {
        options.onStreamingFallback()
      }

      logEvent('tengu_streaming_fallback_to_non_streaming', {
        model:
          options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        error:
          '404_stream_creation' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        attemptNumber,
        maxOutputTokens,
        thinkingType:
          thinkingConfig.type as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        request_id:
          failedRequestId as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        fallback_cause:
          '404_stream_creation' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      })

      try {
        // Fall back to non-streaming mode
        postTurnRequestAt287 = requestClock.now()
        const result = yield* executeNonStreamingRequest(
          { model: options.model, source: options.querySource, compactionRequestKind: options.compactionRequestKind, agentContext, promptId, fetchOverride: options.fetchOverride, credentials: options.credentials, storageV5: options.storageV5 },
          {
            model: options.model,
            fallbackModel: options.fallbackModel,
            thinkingConfig,
            ...(isFastModeEnabled() && { fastMode: isFastMode }),
            modelIsRefusalFallbackTarget: options.modelIsRefusalFallbackTarget,
            signal,
            noResponseRetryLedger,
            maxRetries: modelCallRetries.retriesLeft(),
            modelCallRetries,
            onRetryStatus: options.onRetryStatus,
            clock: requestClock, random: options.random,
            subscribeRetryWake: options.subscribeRetryWake,
            onError:error=>handleThinkingBindingAPIError(error)??handleToolSearchProtocolAPIError287(error),
          },
          paramsFromContext,
          (attempt, _startTime, tokens) => {
            attemptNumber = attempt
            maxOutputTokens = tokens
          },
          params => captureAPIRequest(params, options.querySource),
          failedRequestId,
          adoptServerResponse287,
          serializeToolSearchWire287,
        )

        const m: AssistantMessage = {
          message: {
            ...result,
            content: normalizeContentFromAPI(
              result.content,
              tools,
              options.agentId,
            ),
          },
          ...(serverRequest287&&getServerClassifier287().$Pe(serverRequest287)),
          requestId: streamRequestId ?? undefined,
          type: 'assistant',
          uuid: randomUUID(),
          timestamp: new Date().toISOString(),
          ...(process.env.USER_TYPE === 'ant' &&
            research !== undefined && { research }),
          ...(advisorModel && { advisorModel }),
        }
        newMessages.push(m)
        fallbackMessage = m
        postTurnCacheAttempt287.reset()
        yield m

        // Continue to success logging below
      } catch (fallbackError) {
        // Propagate model-fallback signal to query.ts (see comment above).
        if (fallbackError instanceof FallbackTriggeredError) {
          throw fallbackError
        }

        // Fallback also failed, handle as normal error
        logForDebugging(
          `Non-streaming fallback also failed: ${errorMessage(fallbackError)}`,
          { level: 'error' },
        )

        let error = fallbackError
        let errorModel = options.model
        if (fallbackError instanceof CannotRetryError) {
          error = fallbackError.originalError
          errorModel = fallbackError.retryContext.model
        }

        // The nonstreaming attempt applies quota errors with its own dispatch
        // epoch inside executeNonStreamingRequest; do not replay an older epoch.
        const requestId =
          streamRequestId ||
          (error instanceof APIError ? error.requestID : undefined) ||
          (error instanceof APIError
            ? (error.error as { request_id?: string })?.request_id
            : undefined)

        logAPIError({
          error,
          model: errorModel,
          messageCount: messagesForAPI.length,
          messageTokens: tokenCountFromLastAPIResponse(messagesForAPI),
          durationMs: Date.now() - start,
          durationMsIncludingRetries: Date.now() - startIncludingRetries,
          attempt: attemptNumber,
          requestId,
          clientRequestId,
          didFallBackToNonStreaming,
          queryTracking: options.queryTracking,
          querySource: options.querySource,
          llmSpan,
          fastMode: isFastModeRequest,
          previousRequestId,
        })

        if (error instanceof APIUserAbortError) {
          releaseStreamResources()
          return
        }

        yield getAssistantMessageFromError(error, errorModel, {
          messages,
          messagesForAPI,
        })
        releaseStreamResources()
        return
      }
    } else {
      // Original error handling for non-404 errors
      logForDebugging(`Error in API request: ${errorMessage(errorFromRetry)}`, {
        level: 'error',
      })

      let error = errorFromRetry
      let errorModel = options.model
      if (errorFromRetry instanceof CannotRetryError) {
        error = errorFromRetry.originalError
        errorModel = errorFromRetry.retryContext.model
      }

      // Extract quota status from error headers if it's a rate limit error
      if (error instanceof APIError && !didFallBackToNonStreaming) {
        extractQuotaStatusFromError(error, options.agentId ? 'subagent' : options.querySource, requestClock.now(), quotaAccountEpoch, options.storageV5)
      }

      // Extract requestId from stream, error header, or error body
      const requestId =
        streamRequestId ||
        (error instanceof APIError ? error.requestID : undefined) ||
        (error instanceof APIError
          ? (error.error as { request_id?: string })?.request_id
          : undefined)

      logAPIError({
        error,
        model: errorModel,
        messageCount: messagesForAPI.length,
        messageTokens: tokenCountFromLastAPIResponse(messagesForAPI),
        durationMs: Date.now() - start,
        durationMsIncludingRetries: Date.now() - startIncludingRetries,
        attempt: attemptNumber,
        requestId,
        clientRequestId,
        didFallBackToNonStreaming,
        queryTracking: options.queryTracking,
        querySource: options.querySource,
        llmSpan,
        fastMode: isFastModeRequest,
        previousRequestId,
      })

      // Don't yield an assistant error message for user aborts
      // The interruption message is handled in query.ts
      if (error instanceof APIUserAbortError) {
        releaseStreamResources()
        return
      }

      yield getAssistantMessageFromError(error, errorModel, {
        messages,
        messagesForAPI,
      })
      releaseStreamResources()
      return
    }
  } finally {
    if(serverRequest287)getServerClassifier287().jPe(serverRequest287)
    if (streamRetryStatusPublished) options.onRetryStatus?.(null)
    stopSessionActivity('api_call', activityAgentId287)
    // Must be in the finally block: if the generator is terminated early
    // via .return() (e.g. consumer breaks out of for-await-of, or query.ts
    // encounters an abort), code after the try/finally never executes.
    // Without this, the Response object's native TLS/socket buffers leak
    // until the generator itself is GC'd (see GH #32920).
    releaseStreamResources()

    // Non-streaming fallback cost: the streaming path tracks cost in the
    // message_delta handler before any yield. Fallback pushes to newMessages
    // then yields, so tracking must be here to survive .return() at the yield.
    if (fallbackMessage) {
      const fallbackUsage = fallbackMessage.message.usage
      usage = updateUsage(EMPTY_USAGE, fallbackUsage)
      stopReason = fallbackMessage.message.stop_reason
      const fallbackCost = calculateUSDCost(resolvedModel, fallbackUsage)
      costUSD += addToTotalSessionCost(
        fallbackCost,
        fallbackUsage,
        options.model,
      )
    }
    if (partialMessage || fallbackMessage) postTurnCacheAttempt287.record(usage, postTurnRequestAt287)
  }

  // DVe is called only after the whole request attempt has completed
  // successfully, not when message_stop is merely observed. Error paths return
  // or throw before this point, so a failed beta-free retry remains probeable.
  if (responseErrorClassifier287.state() === 'retrying') {
    responseErrorClassifier287.markSuccess()
    rejectBeta(stickyBetas, THINKING_DISPLAY_UPDATES_BETA_HEADER)
    logForDebugging(
      '[thinking] a request was refused with thinking.display updates and went through without it; it is not sent again in this conversation.',
      { level: 'warn' },
    )
    logEvent('tengu_beta_400_healed', {
      beta: [THINKING_DISPLAY_UPDATES_BETA_HEADER] as unknown as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      model: options.model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      provider: getAPIProvider() as unknown as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      unclaimed: true,
    })
  }

  // Mark all registered tools as sent to API so they become eligible for deletion
  if (feature('CACHED_MICROCOMPACT') && cachedMCEnabled) {
    markToolsSentToAPIState()
  }

  // Track the last requestId for the main conversation chain so shutdown
  // can send a cache eviction hint to inference. Exclude backgrounded
  // sessions (Ctrl+B) which share the repl_main_thread querySource but
  // run inside an agent context — they are independent conversation chains
  // whose cache should not be evicted when the foreground session clears.
  if (
    streamRequestId &&
    !getAgentContext() &&
    (options.querySource.startsWith('repl_main_thread') ||
      options.querySource === 'sdk')
  ) {
    setLastMainRequestId(streamRequestId)
  }

  // Precompute scalars so the fire-and-forget .then() closure doesn't pin the
  // full messagesForAPI array (the entire conversation up to the context window
  // limit) until getToolPermissionContext() resolves.
  const logMessageCount = messagesForAPI.length
  const logMessageTokens = tokenCountFromLastAPIResponse(messagesForAPI)
  void options.getToolPermissionContext().then(permissionContext => {
    // Original o0t -> aCo: the whole request succeeded, not merely HTTP/SSE.
    notifyPolicyModelSuccess287()
    logAPISuccessAndDuration({
      model:
        newMessages[0]?.message.model ?? partialMessage?.model ?? options.model,
      preNormalizedModel: options.model,
      usage,
      start,
      startIncludingRetries,
      attempt: attemptNumber,
      messageCount: logMessageCount,
      messageTokens: logMessageTokens,
      requestId: streamRequestId ?? null,
      stopReason,
      ttftMs,
      didFallBackToNonStreaming,
      querySource: options.querySource,
      headers: responseHeaders,
      costUSD,
      queryTracking: options.queryTracking,
      permissionMode: permissionContext.mode,
      // Pass newMessages for beta tracing - extraction happens in logging.ts
      // only when beta tracing is enabled
      newMessages,
      llmSpan,
      globalCacheStrategy,
      requestSetupMs: start - startIncludingRetries,
      attemptStartTimes,
      fastMode: isFastModeRequest,
      previousRequestId,
      betas: lastRequestBetas,
    })
  })

  // Defensive: also release on normal completion (no-op if finally already ran).
  releaseStreamResources()
}

/**
 * Cleans up stream resources to prevent memory leaks.
 * @internal Exported for testing
 */
export function cleanupStream(
  stream: Stream<BetaRawMessageStreamEvent> | undefined,
): void {
  if (!stream) {
    return
  }
  try {
    // Abort the stream via its controller if not already aborted
    if (!stream.controller.signal.aborted) {
      stream.controller.abort()
    }
  } catch {
    // Ignore - stream may already be closed
  }
}

/**
 * Updates usage statistics with new values from streaming API events.
 * Note: Anthropic's streaming API provides cumulative usage totals, not incremental deltas.
 * Each event contains the complete usage up to that point in the stream.
 *
 * Input-related tokens (input_tokens, cache_creation_input_tokens, cache_read_input_tokens)
 * are typically set in message_start and remain constant. message_delta events may send
 * explicit 0 values for these fields, which should not overwrite the values from message_start.
 * We only update these fields if they have a non-null, non-zero value.
 */
export function updateUsage(
  usage: Readonly<NonNullableUsage>,
  partUsage: (BetaMessageDeltaUsage & Partial<Pick<BetaUsage,
    'cache_creation' | 'service_tier' | 'inference_geo' | 'speed'>>) | undefined,
): NonNullableUsage {
  if (!partUsage) {
    return { ...usage }
  }
  // Official 285 uee: message_delta can carry a positive split without its
  // aggregate. A zero split must not erase message_start cache accounting.
  const split = partUsage.cache_creation
  const cacheCreationTokens = (split?.ephemeral_1h_input_tokens ?? 0) +
    (split?.ephemeral_5m_input_tokens ?? 0)
  return {
    input_tokens:
      partUsage.input_tokens !== null && partUsage.input_tokens > 0
        ? partUsage.input_tokens
        : usage.input_tokens,
    cache_creation_input_tokens:
      partUsage.cache_creation_input_tokens !== null &&
      partUsage.cache_creation_input_tokens > 0
        ? partUsage.cache_creation_input_tokens
        : cacheCreationTokens > 0 ? cacheCreationTokens : usage.cache_creation_input_tokens,
    cache_read_input_tokens:
      partUsage.cache_read_input_tokens !== null &&
      partUsage.cache_read_input_tokens > 0
        ? partUsage.cache_read_input_tokens
        : usage.cache_read_input_tokens,
    output_tokens: partUsage.output_tokens ?? usage.output_tokens,
    output_tokens_details: {
      thinking_tokens: partUsage.output_tokens_details?.thinking_tokens ?? usage.output_tokens_details.thinking_tokens,
    },
    server_tool_use: {
      web_search_requests:
        partUsage.server_tool_use?.web_search_requests ??
        usage.server_tool_use.web_search_requests,
      web_fetch_requests:
        partUsage.server_tool_use?.web_fetch_requests ??
        usage.server_tool_use.web_fetch_requests,
    },
    service_tier: partUsage.service_tier ?? usage.service_tier,
    cache_creation: cacheCreationTokens > 0 ? {
      ephemeral_1h_input_tokens: split?.ephemeral_1h_input_tokens ?? usage.cache_creation.ephemeral_1h_input_tokens,
      ephemeral_5m_input_tokens: split?.ephemeral_5m_input_tokens ?? usage.cache_creation.ephemeral_5m_input_tokens,
    } : {...usage.cache_creation},
    // cache_deleted_input_tokens: returned by the API when cache editing
    // deletes KV cache content, but not in SDK types. Kept off NonNullableUsage
    // so the string is eliminated from external builds by dead code elimination.
    // Uses the same > 0 guard as other token fields to prevent message_delta
    // from overwriting the real value with 0.
    ...(feature('CACHED_MICROCOMPACT')
      ? {
          cache_deleted_input_tokens:
            (partUsage as unknown as { cache_deleted_input_tokens?: number })
              .cache_deleted_input_tokens != null &&
            (partUsage as unknown as { cache_deleted_input_tokens: number })
              .cache_deleted_input_tokens > 0
              ? (partUsage as unknown as { cache_deleted_input_tokens: number })
                  .cache_deleted_input_tokens
              : ((usage as unknown as { cache_deleted_input_tokens?: number })
                  .cache_deleted_input_tokens ?? 0),
        }
      : {}),
    inference_geo: partUsage.inference_geo ?? usage.inference_geo,
    iterations: partUsage.iterations ?? usage.iterations,
    speed: (partUsage as BetaUsage).speed ?? usage.speed,
    fallback_credit: partUsage.fallback_credit ?? usage.fallback_credit,
  }
}

/**
 * Accumulates usage from one message into a total usage object.
 * Used to track cumulative usage across multiple assistant turns.
 */
export function accumulateUsage(
  totalUsage: Readonly<NonNullableUsage>,
  messageUsage: Readonly<NonNullableUsage>,
): NonNullableUsage {
  return {
    input_tokens: totalUsage.input_tokens + messageUsage.input_tokens,
    cache_creation_input_tokens:
      totalUsage.cache_creation_input_tokens +
      messageUsage.cache_creation_input_tokens,
    cache_read_input_tokens:
      totalUsage.cache_read_input_tokens + messageUsage.cache_read_input_tokens,
    output_tokens: totalUsage.output_tokens + messageUsage.output_tokens,
    output_tokens_details: {
      thinking_tokens: totalUsage.output_tokens_details.thinking_tokens + messageUsage.output_tokens_details.thinking_tokens,
    },
    server_tool_use: {
      web_search_requests:
        totalUsage.server_tool_use.web_search_requests +
        messageUsage.server_tool_use.web_search_requests,
      web_fetch_requests:
        totalUsage.server_tool_use.web_fetch_requests +
        messageUsage.server_tool_use.web_fetch_requests,
    },
    service_tier: messageUsage.service_tier, // Use the most recent service tier
    cache_creation: {
      ephemeral_1h_input_tokens:
        totalUsage.cache_creation.ephemeral_1h_input_tokens +
        messageUsage.cache_creation.ephemeral_1h_input_tokens,
      ephemeral_5m_input_tokens:
        totalUsage.cache_creation.ephemeral_5m_input_tokens +
        messageUsage.cache_creation.ephemeral_5m_input_tokens,
    },
    // See comment in updateUsage — field is not on NonNullableUsage to keep
    // the string out of external builds.
    ...(feature('CACHED_MICROCOMPACT')
      ? {
          cache_deleted_input_tokens:
            ((totalUsage as unknown as { cache_deleted_input_tokens?: number })
              .cache_deleted_input_tokens ?? 0) +
            ((
              messageUsage as unknown as { cache_deleted_input_tokens?: number }
            ).cache_deleted_input_tokens ?? 0),
        }
      : {}),
    inference_geo: messageUsage.inference_geo, // Use the most recent
    iterations: messageUsage.iterations, // Use the most recent
    speed: messageUsage.speed, // Use the most recent
    fallback_credit: messageUsage.fallback_credit ?? totalUsage.fallback_credit,
  }
}

function isToolResultBlock(
  block: unknown,
): block is { type: 'tool_result'; tool_use_id: string } {
  return (
    block !== null &&
    typeof block === 'object' &&
    'type' in block &&
    (block as { type: string }).type === 'tool_result' &&
    'tool_use_id' in block
  )
}

type CachedMCEditsBlock = {
  type: 'cache_edits'
  edits: { type: 'delete'; cache_reference: string }[]
}

type CachedMCPinnedEdits = {
  userMessageIndex: number
  block: CachedMCEditsBlock
}

// Exported for testing cache_reference placement constraints
export function addCacheBreakpoints(
  messages: (UserMessage | AssistantMessage)[],
  enablePromptCaching: boolean,
  querySource?: QuerySource,
  useCachedMC = false,
  newCacheEdits?: CachedMCEditsBlock | null,
  pinnedEdits?: CachedMCPinnedEdits[],
  skipCacheWrite = false,
  agentCacheTtlOverride?: '5m' | '1h',
  requestCache?: {cacheTtl?: '1h'; forkPointUuid?: string},
): MessageParam[] {
  const cacheTtl = requestCache && 'cacheTtl' in requestCache ? requestCache.cacheTtl :
    enablePromptCaching ? getCacheControl({querySource, agentCacheTtlOverride}).ttl : undefined
  const result = getRequestCacheTTL287().messages(messages, enablePromptCaching, cacheTtl,
    skipCacheWrite, requestCache?.forkPointUuid)

  if (!useCachedMC) {
    return result
  }

  // Track all cache_references being deleted to prevent duplicates across blocks.
  const seenDeleteRefs = new Set<string>()

  // Helper to deduplicate a cache_edits block against already-seen deletions
  const deduplicateEdits = (block: CachedMCEditsBlock): CachedMCEditsBlock => {
    const uniqueEdits = block.edits.filter(edit => {
      if (seenDeleteRefs.has(edit.cache_reference)) {
        return false
      }
      seenDeleteRefs.add(edit.cache_reference)
      return true
    })
    return { ...block, edits: uniqueEdits }
  }

  // Re-insert all previously-pinned cache_edits at their original positions
  for (const pinned of pinnedEdits ?? []) {
    const msg = result[pinned.userMessageIndex]
    if (msg && msg.role === 'user') {
      if (!Array.isArray(msg.content)) {
        msg.content = [{ type: 'text', text: msg.content as string }]
      }
      const dedupedBlock = deduplicateEdits(pinned.block)
      if (dedupedBlock.edits.length > 0) {
        insertBlockAfterToolResults(msg.content, dedupedBlock)
      }
    }
  }

  // Insert new cache_edits into the last user message and pin them
  if (newCacheEdits && result.length > 0) {
    const dedupedNewEdits = deduplicateEdits(newCacheEdits)
    if (dedupedNewEdits.edits.length > 0) {
      for (let i = result.length - 1; i >= 0; i--) {
        const msg = result[i]
        if (msg && msg.role === 'user') {
          if (!Array.isArray(msg.content)) {
            msg.content = [{ type: 'text', text: msg.content as string }]
          }
          insertBlockAfterToolResults(msg.content, dedupedNewEdits)
          // Pin so this block is re-sent at the same position in future calls
          pinCacheEdits(i, newCacheEdits)

          logForDebugging(
            `Added cache_edits block with ${dedupedNewEdits.edits.length} deletion(s) to message[${i}]: ${dedupedNewEdits.edits.map(e => e.cache_reference).join(', ')}`,
          )
          break
        }
      }
    }
  }

  // Add cache_reference to tool_result blocks that are within the cached prefix.
  // Must be done AFTER cache_edits insertion since that modifies content arrays.
  if (enablePromptCaching) {
    // Find the last message containing a cache_control marker
    let lastCCMsg = -1
    for (let i = 0; i < result.length; i++) {
      const msg = result[i]!
      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block && typeof block === 'object' && 'cache_control' in block) {
            lastCCMsg = i
          }
        }
      }
    }

    // Add cache_reference to tool_result blocks that are strictly before
    // the last cache_control marker. The API requires cache_reference to
    // appear "before or on" the last cache_control — we use strict "before"
    // to avoid edge cases where cache_edits splicing shifts block indices.
    //
    // Create new objects instead of mutating in-place to avoid contaminating
    // blocks reused by secondary queries that use models without cache_editing support.
    if (lastCCMsg >= 0) {
      for (let i = 0; i < lastCCMsg; i++) {
        const msg = result[i]!
        if (msg.role !== 'user' || !Array.isArray(msg.content)) {
          continue
        }
        let cloned = false
        for (let j = 0; j < msg.content.length; j++) {
          const block = msg.content[j]
          if (block && isToolResultBlock(block)) {
            if (!cloned) {
              msg.content = [...msg.content]
              cloned = true
            }
            msg.content[j] = Object.assign({}, block, {
              cache_reference: block.tool_use_id,
            })
          }
        }
      }
    }
  }

  return result
}

export function buildSystemPromptBlocks(
  systemPrompt: SystemPrompt,
  enablePromptCaching: boolean,
  options?: {
    skipGlobalCacheForSystemPrompt?: boolean
    querySource?: QuerySource
    agentCacheTtlOverride?: '5m' | '1h'
    cacheTtl?: '1h'
  },
): SystemCacheTextBlock287[] {
  // Original tFo/XDr/D6; TTL stays in the existing request-level owner.
  return getSystemCacheSerializer287().blocks(systemPrompt, enablePromptCaching, {
    skipGlobalCacheForSystemPrompt: options?.skipGlobalCacheForSystemPrompt,
    cacheTtl: options && 'cacheTtl' in options ? options.cacheTtl : enablePromptCaching ? getCacheControl({
      querySource: options?.querySource,
      agentCacheTtlOverride: options?.agentCacheTtlOverride,
    }).ttl : undefined,
  })
}

type HaikuOptions = Omit<Options, 'model' | 'getToolPermissionContext'>

export async function queryHaiku({
  systemPrompt = asSystemPrompt([]),
  userPrompt,
  outputFormat,
  signal,
  options,
}: {
  systemPrompt: SystemPrompt
  userPrompt: string
  outputFormat?: BetaJSONOutputFormat
  signal: AbortSignal
  options: HaikuOptions
}): Promise<AssistantMessage> {
  if(getAPIProvider()==='firstParty'&&isFirstPartyAnthropicBaseUrl()) {
    const {queryOriginalSmall287}=await import('./singleQuery287.js')
    return queryOriginalSmall287({systemPrompt,userPrompt,outputFormat,signal,options})
  }
  const result = await withVCR(
    [
      createUserMessage({
        content: systemPrompt.map(text => ({ type: 'text', text })),
      }),
      createUserMessage({
        content: userPrompt,
      }),
    ],
    async () => {
      const messages = [
        createUserMessage({
          content: userPrompt,
        }),
      ]

      const result = await queryModelWithoutStreaming({
        messages,
        systemPrompt,
        thinkingConfig: { type: 'disabled' },
        tools: [],
        signal,
        options: {
          ...options,
          model: getSmallFastModel(),
          enablePromptCaching: options.enablePromptCaching ?? false,
          outputFormat,
          async getToolPermissionContext() {
            return getEmptyToolPermissionContext()
          },
        },
      })
      return [result]
    },
  )
  // We don't use streaming for Haiku so this is safe
  return result[0]! as AssistantMessage
}

type QueryWithModelOptions = Omit<Options, 'getToolPermissionContext'>

/**
 * Query a specific model through the Claude Code infrastructure.
 * This goes through the full query pipeline including proper authentication,
 * betas, and headers - unlike direct API calls.
 */
export async function queryWithModel({
  systemPrompt = asSystemPrompt([]),
  userPrompt,
  outputFormat,
  signal,
  options,
}: {
  systemPrompt: SystemPrompt
  userPrompt: string
  outputFormat?: BetaJSONOutputFormat
  signal: AbortSignal
  options: QueryWithModelOptions
}): Promise<AssistantMessage> {
  if(getAPIProvider()==='firstParty'&&isFirstPartyAnthropicBaseUrl()) {
    const {queryOriginalWithModel287}=await import('./singleQuery287.js')
    return queryOriginalWithModel287({systemPrompt,userPrompt,outputFormat,signal,options})
  }
  const result = await withVCR(
    [
      createUserMessage({
        content: systemPrompt.map(text => ({ type: 'text', text })),
      }),
      createUserMessage({
        content: userPrompt,
      }),
    ],
    async () => {
      const messages = [
        createUserMessage({
          content: userPrompt,
        }),
      ]

      const result = await queryModelWithoutStreaming({
        messages,
        systemPrompt,
        thinkingConfig: { type: 'disabled' },
        tools: [],
        signal,
        options: {
          ...options,
          enablePromptCaching: options.enablePromptCaching ?? false,
          outputFormat,
          async getToolPermissionContext() {
            return getEmptyToolPermissionContext()
          },
        },
      })
      return [result]
    },
  )
  return result[0]! as AssistantMessage
}

// Non-streaming requests have a 10min max per the docs:
// https://platform.claude.com/docs/en/api/errors#long-requests
// The SDK's 21333-token cap is derived from 10min × 128k tokens/hour, but we
// bypass it by setting a client-level timeout, so we can cap higher.
export const MAX_NON_STREAMING_TOKENS = 64_000

/**
 * Adjusts thinking budget when max_tokens is capped for non-streaming fallback.
 * Ensures the API constraint: max_tokens > thinking.budget_tokens
 *
 * @param params - The parameters that will be sent to the API
 * @param maxTokensCap - The maximum allowed tokens (MAX_NON_STREAMING_TOKENS)
 * @returns Adjusted parameters with thinking budget capped if needed
 */
export function adjustParamsForNonStreaming<
  T extends {
    max_tokens: number
    thinking?: BetaMessageStreamParams['thinking']
  },
>(params: T, maxTokensCap: number): T {
  const cappedMaxTokens = Math.min(params.max_tokens, maxTokensCap)

  // Adjust thinking budget if it would exceed capped max_tokens
  // to maintain the constraint: max_tokens > thinking.budget_tokens
  const adjustedParams = { ...params }
  if (
    adjustedParams.thinking?.type === 'enabled' &&
    adjustedParams.thinking.budget_tokens
  ) {
    adjustedParams.thinking = {
      ...adjustedParams.thinking,
      budget_tokens: Math.min(
        adjustedParams.thinking.budget_tokens,
        cappedMaxTokens - 1, // Must be at least 1 less than max_tokens
      ),
    }
  }

  return {
    ...adjustedParams,
    max_tokens: cappedMaxTokens,
  }
}

function isMaxTokensCapEnabled(): boolean {
  // 3P default: false (not validated on Bedrock/Vertex)
  return getFeatureValue_CACHED_MAY_BE_STALE('tengu_otk_slot_v1', false)
}

export function getMaxOutputTokensForModel(model: string): number {
  const maxOutputTokens = getModelMaxOutputTokens(model)

  // Slot-reservation cap: drop default to 8k for all models. BQ p99 output
  // = 4,911 tokens; 32k/64k defaults over-reserve 8-16× slot capacity.
  // Requests hitting the cap get one clean retry at 64k (query.ts
  // max_output_tokens_escalate). Math.min keeps models with lower native
  // defaults (e.g. claude-3-opus at 4k) at their native value. Applied
  // before the env-var override so CLAUDE_CODE_MAX_OUTPUT_TOKENS still wins.
  const defaultTokens = isMaxTokensCapEnabled()
    ? Math.min(maxOutputTokens.default, CAPPED_DEFAULT_MAX_TOKENS)
    : maxOutputTokens.default

  const result = validateBoundedIntEnvVar(
    'CLAUDE_CODE_MAX_OUTPUT_TOKENS',
    process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS,
    defaultTokens,
    maxOutputTokens.upperLimit,
  )
  return result.effective
}
