import {drainOriginalPostModelSwitch287,createPostModelSwitchAttachment287} from './utils/hooks/modelSwitch287/runtime.js'
import {applyOriginalHintClears287,reapplyOriginalHintView287} from './services/api/hintClearConsumer287.js'
import {resolveMcpAttachmentClients287} from './utils/mcpAttachments287.js'
import {originalQueryEffort287,originalQueryClock287} from './services/api/originalQueryAdapter287.js'
import {isOriginalFallbackError287} from './services/api/originalQueryAdapter287.js'
import {getServerClassifier287} from './utils/permissions/serverClassifier287/index.js'
import {getExecutionSession287 as getServerExecutionSession287} from './services/context/execution287.js'
import {executePublicEndTurn287,markPublicTurnAborted287,executePublicTurnEndReactions287} from './query/handbackOuter287/index.js'
import {getExecutionSession287} from './services/context/execution287.js'
import {randomUUID} from 'node:crypto'
import {agentDelivery287} from './tools/SendMessageTool/agentDelivery287.js'
import {sourceToolModel287} from './utils/model/modelTurnSources287.js'
import {isFastModeFallbackTarget287} from './utils/fastMode.js'
import {sourceRunningModel287} from './utils/model/officialModelPicker287/session.js'
import {getOfficialModelValidation287} from './utils/model/officialModelPicker287/validation.js'
import {bindOfficialModelRestrictionNoticeSink287} from './utils/model/officialModelPicker287.js'
import {rollOverRuntimeContext} from './services/context/runtime.js'
// biome-ignore-all assist/source/organizeImports: ANT-ONLY import markers must not be reordered
import type {
  ToolResultBlockParam,
  ToolUseBlock,
} from '@anthropic-ai/sdk/resources/index.mjs'
import type { CanUseToolFn } from './hooks/useCanUseTool.js'
import { FallbackTriggeredError } from './services/api/withRetry.js'
import { stopHookContinuation } from './query/stopHookLimits.js'
import {handleGoalTermination} from './query/goalTermination.js'
import {createArrivalRowsReader287} from './cli/printOwnership287/arrivalStageRuntime287.js'
import {
  calculateTokenWarningState,
  isAutoCompactEnabled,
  type AutoCompactTrackingState,
} from './services/compact/autoCompact.js'
import { buildPostCompactMessages } from './services/compact/compact.js'
import { inheritCompactSummaryMetadata } from './services/api/promptIdentity.js'
import {createQueryContextRouting,contextRoutingInput} from './services/context/routing.js'
/* eslint-disable @typescript-eslint/no-require-imports */
import * as reactiveCompact from './services/compact/reactiveCompact.js'
import { maybeStartCompactPrecompute, invalidateCompactPrecompute,isPreFirstCompactFork287,getQueryCompactLifecycle287,type DeeperPass287 } from './services/compact/precompute.js'
import {getClearSourceModule287} from './commands/clear/lifecycle287.js'
import type { CompactRequestOptions } from './services/compact/request.js'
/* eslint-enable @typescript-eslint/no-require-imports */
import {
  logEvent,
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
} from 'src/services/analytics/index.js'
import { ImageSizeError } from './utils/imageValidation.js'
import { ImageResizeError } from './utils/imageResizer.js'
import { findToolByName, type ToolUseContext } from './Tool.js'
import { asSystemPrompt, type SystemPrompt } from './utils/systemPromptType.js'
import type {
  AssistantMessage,
  AttachmentMessage,
  Message,
  RequestStartEvent,
  StreamEvent,
  ToolUseSummaryMessage,
  ActiveGoalEvent,
  UserMessage,
  TombstoneMessage,
} from './types/message.js'
import { logError } from './utils/log.js'
import {
  PROMPT_TOO_LONG_ERROR_MESSAGE,
  isPromptTooLongMessage,
  getPromptTooLongTokenGap,
} from './services/api/errors.js'
import { logAntError, logForDebugging } from './utils/debug.js'
import {
  createUserMessage,
  createUserInterruptionMessage,
  normalizeMessagesForAPI,
  createSystemMessage,
  createAssistantAPIErrorMessage,
  getMessagesAfterCompactBoundary,
  createToolUseSummaryMessage,
  createMicrocompactBoundaryMessage,
  stripSignatureBlocks,
} from './utils/messages.js'
import { generateToolUseSummary } from './services/toolUseSummary/toolUseSummaryGenerator.js'
import { prependUserContext, appendSystemContext } from './utils/api.js'
import {
  createAttachmentMessage,
  filterDuplicateMemoryAttachments,
  getAttachmentMessages,
  startRelevantMemoryPrefetch,
} from './utils/attachments.js'
/* eslint-disable @typescript-eslint/no-require-imports */
const skillPrefetch = feature('EXPERIMENTAL_SKILL_SEARCH')
  ? (require('./services/skillSearch/prefetch.js') as typeof import('./services/skillSearch/prefetch.js'))
  : null
/* eslint-enable @typescript-eslint/no-require-imports */
import {
  remove as removeFromQueue,
  getCommandsByMaxPriority,
  isSlashCommand,
  settleDeliveredPollEvents287,
  selectPollEventChunk287,
} from './utils/messageQueueManager.js'
import { notifyCommandLifecycle } from './utils/commandLifecycle.js'
import { headlessProfilerCheckpoint } from './utils/headlessProfiler.js'
import {
  getRuntimeMainLoopModel,
  renderModelName,
} from './utils/model/model.js'
import {
  doesMostRecentAssistantMessageExceed200k,
  finalContextTokensFromLastResponse,
  tokenCountWithEstimation,
} from './utils/tokens.js'
import { ESCALATED_MAX_TOKENS } from './utils/context.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from './services/analytics/growthbook.js'
import { SLEEP_TOOL_NAME } from './tools/SleepTool/prompt.js'
import { executePostSamplingHooks } from './utils/hooks/postSamplingHooks.js'
import { executeStopFailureHooks } from './utils/hooks.js'
import type { QuerySource } from './constants/querySource.js'
import { createDumpPromptsFetch } from './services/api/dumpPrompts.js'
import { StreamingToolExecutor } from './services/tools/StreamingToolExecutor.js'
import { queryCheckpoint } from './utils/queryProfiler.js'
import { runTools } from './services/tools/toolOrchestration.js'
import { applyToolResultBudget } from './utils/toolResultStorage.js'
import { recordContentReplacement } from './utils/sessionStorage.js'
import { handleStopHooks } from './query/stopHooks.js'
import { buildQueryConfig } from './query/config.js'
import { productionDeps, type QueryDeps } from './query/deps.js'
import type { Terminal, Continue } from './query/transitions.js'
import { feature } from 'bun:bundle'
import {
  getCurrentTurnTokenBudget,
  getTurnOutputTokens,
  incrementBudgetContinuationCount,
} from './bootstrap/state.js'
import { createBudgetTracker, checkTokenBudget } from './query/tokenBudget.js'
import { count } from './utils/array.js'
import {
  buildRefusalRetrySystemPrompt,
  createRefusalProtocolMessage,
  getRefusalFallbackContent,
  getRefusalFallbackModel,
  getRefusalNoFallbackContent,
  getRefusalRecoveryMetadata,
  isRefusalMessage,
  markModelContextExcluded,
  type RefusalRecoveryState,
} from './services/api/refusalFallback.js'

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-enable @typescript-eslint/no-require-imports */

function* yieldMissingToolResultBlocks(
  assistantMessages: AssistantMessage[],
  errorMessage: string,
) {
  for (const assistantMessage of assistantMessages) {
    // Extract all tool use blocks from this assistant message
    const toolUseBlocks = assistantMessage.message.content.filter(
      content => content.type === 'tool_use',
    ) as ToolUseBlock[]

    // Emit an interruption message for each tool use
    for (const toolUse of toolUseBlocks) {
      yield createUserMessage({
        content: [
          {
            type: 'tool_result',
            content: errorMessage,
            is_error: true,
            tool_use_id: toolUse.id,
          },
        ],
        toolUseResult: errorMessage,
        sourceToolAssistantUUID: assistantMessage.uuid,
      })
    }
  }
}

/**
 * The rules of thinking are lengthy and fortuitous. They require plenty of thinking
 * of most long duration and deep meditation for a wizard to wrap one's noggin around.
 *
 * The rules follow:
 * 1. A message that contains a thinking or redacted_thinking block must be part of a query whose max_thinking_length > 0
 * 2. A thinking block may not be the last message in a block
 * 3. Thinking blocks must be preserved for the duration of an assistant trajectory (a single turn, or if that turn includes a tool_use block then also its subsequent tool_result and the following assistant message)
 *
 * Heed these rules well, young wizard. For they are the rules of thinking, and
 * the rules of thinking are the rules of the universe. If ye does not heed these
 * rules, ye will be punished with an entire day of debugging and hair pulling.
 */
const MAX_OUTPUT_TOKENS_RECOVERY_LIMIT = 3

/**
 * Is this a max_output_tokens error message? If so, the streaming loop should
 * withhold it from SDK callers until we know whether the recovery loop can
 * continue. Yielding early leaks an intermediate error to SDK callers (e.g.
 * cowork/desktop) that terminate the session on any `error` field — the
 * recovery loop keeps running but nobody is listening.
 *
 * Mirrors reactiveCompact.isWithheldPromptTooLong.
 */
function isWithheldMaxOutputTokens(
  msg: Message | StreamEvent | undefined,
): msg is AssistantMessage {
  return msg?.type === 'assistant' && msg.apiError === 'max_output_tokens'
}

export type QueryParams = CompactRequestOptions & {
  promptRenderEpoch?: number
  keepPartialMessageOnAbort?:boolean
  spawnedBySkill?:string
  evictCacheOnComplete?:boolean
  forkPointUuid?:string
  divergesAtMessageId?:string
  messages: Message[]
  systemPrompt: SystemPrompt
  userContext: { [k: string]: string }
  systemContext: { [k: string]: string }
  canUseTool: CanUseToolFn
  toolUseContext: ToolUseContext
  fallbackModel?: string
  /** Official tv → runQuery per-agent cache TTL (not a model/transport probe). */
  agentCacheTtlOverride?: '5m' | '1h'
  stickyBetas?:import('./utils/forkedAgent.js').CacheSafeParams['stickyBetas']
  /** Availability chain supplied only by compact forks; legacy fallback stays intact. */
  compactFallbackModels?: string[]
  querySource: QuerySource
  maxOutputTokensOverride?: number
  maxTurns?: number
  apiAttemptsLeft?: ToolUseContext['apiAttemptsLeft']
  skipCacheWrite?: boolean
  // API task_budget (output_config.task_budget, beta task-budgets-2026-03-13).
  // Distinct from the tokenBudget +500k auto-continue feature. `total` is the
  // budget for the whole agentic turn; `remaining` is computed per iteration
  // from cumulative API usage. See configureTaskBudgetParams in claude.ts.
  taskBudget?: { total: number }
  deps?: QueryDeps
}

// -- query loop state

// Mutable state carried between loop iterations
type State = {
  prevToolDurations?:import('./utils/officialToolSchema287/native.js').QueryToolDuration287[]
  resumeIncompleteThinking?:boolean
  messages: Message[]
  toolUseContext: ToolUseContext
  autoCompactTracking: AutoCompactTrackingState | undefined
  maxOutputTokensRecoveryCount: number
  hasAttemptedReactiveCompact: boolean
  reactiveCompactDeeperPass?:DeeperPass287
  maxOutputTokensOverride: number | undefined
  pendingToolUseSummary: Promise<ToolUseSummaryMessage | null> | undefined
  stopHookActive: boolean | undefined
  stopHookBlockingCount?: number
  turnCount: number
  // Why the previous iteration continued. Undefined on first iteration.
  // Lets tests assert recovery paths fired without inspecting message contents.
  transition: Continue | undefined
}

export async function* query(
  params: QueryParams,
): AsyncGenerator<
  | StreamEvent
  | RequestStartEvent
  | Message
  | TombstoneMessage
  | ToolUseSummaryMessage
  | ActiveGoalEvent
  | import('./Tool.js').ToolQueryControlEvent287,
  Terminal
> {
  // Original runs_turns registration/sink lives for this real query, including
  // return(), throw, and normal completion; no renderer-local provider cache.
  getOfficialModelValidation287()
  const releaseModelNotice=params.toolUseContext.addNotification
    ? bindOfficialModelRestrictionNoticeSink287(params.toolUseContext.addNotification):undefined
  using modelNoticeLifetime={ [Symbol.dispose](){releaseModelNotice?.()} }
  // Original LI owns hi for every query entry (SDK, REPL, Agent and fork).
  // A caller's completed reader is never inherited as the next query's owner.
  using arrivalRowsReader287=createArrivalRowsReader287(params.toolUseContext,params.messages)
  const queryContext287={...params.toolUseContext,arrivalRowsReader287}
  const consumedCommandUuids: string[] = []
  const terminal = yield* arrivalRowsReader287.through(queryLoop({...params,toolUseContext:queryContext287}, consumedCommandUuids))
  yield* handleGoalTermination(terminal, params.toolUseContext, params.querySource)
  // Only reached if queryLoop returned normally. Skipped on throw (error
  // propagates through yield*) and on .return() (Return completion closes
  // both generators). This gives the same asymmetric started-without-completed
  // signal as print.ts's drainCommandQueue when the turn fails.
  for (const uuid of consumedCommandUuids) {
    notifyCommandLifecycle(uuid, 'completed')
  }
  return terminal
}

async function* queryLoop(
  params: QueryParams,
  consumedCommandUuids: string[],
): AsyncGenerator<
  | StreamEvent
  | RequestStartEvent
  | Message
  | TombstoneMessage
  | ToolUseSummaryMessage
  | ActiveGoalEvent
  | import('./Tool.js').ToolQueryControlEvent287,
  Terminal
> {
  const promptRenderEpoch287=params.promptRenderEpoch??getExecutionSession287().promptAssembly.epoch()
  // Immutable params — never reassigned during the query loop.
  const {
    systemPrompt,
    userContext,
    systemContext,
    canUseTool,
    fallbackModel: configuredFallbackModel,
    querySource,
    maxTurns,
    skipCacheWrite,
  } = params
  let fallbackModel = configuredFallbackModel
  // Add only compact's inherited configuration; keep the existing options
  // identity and legacy model-switch behavior intact.
  if (configuredFallbackModel !== undefined) params.toolUseContext.options.fallbackModel = configuredFallbackModel
  const compactFallbacks = params.compactFallbackModels ? [...new Set(params.compactFallbackModels)].filter(m => m !== params.toolUseContext.options.mainLoopModel) : undefined
  let compactFallbackIndex = 0
  const deps = params.deps ?? productionDeps()
  const contextKernel=createQueryContextRouting(userContext,params.toolUseContext)
  let contextRouting=await contextKernel.route(userContext,systemContext,contextRoutingInput(params.toolUseContext),{messages:params.messages,querySource})
  const contextStamp={uuid:deps.uuid,now:()=>new Date().toISOString()}
  const contextForeground=(querySource.startsWith('repl_main_thread')||querySource==='sdk')&&!params.toolUseContext.agentId
  const fastUserModel287=sourceToolModel287.tm(params.toolUseContext)

  // Mutable cross-iteration state. The loop body destructures this at the top
  // of each iteration so reads stay bare-name (`messages`, `toolUseContext`).
  // Continue sites write `state = { ... }` instead of 9 separate assignments.
  let state: State = {
    messages: params.messages,
    toolUseContext: params.toolUseContext,
    maxOutputTokensOverride: params.maxOutputTokensOverride,
    autoCompactTracking: undefined,
    stopHookActive: undefined,
    maxOutputTokensRecoveryCount: 0,
    hasAttemptedReactiveCompact: false,
    turnCount: 1,
    pendingToolUseSummary: undefined,
    transition: undefined,
  }
  const originalCompactCaller287=getQueryCompactLifecycle287()
  const compactCategory287=(getClearSourceModule287('chunk-nankzm0s.js').Ss as (source:string)=>string|undefined)(querySource)
  const compactStickyBetas287=originalCompactCaller287.stickyBetas({e:params,po:compactCategory287})
  using classifierLifetime287=originalCompactCaller287.observerLifetime({f:params.toolUseContext,b:querySource})
  const budgetTracker = feature('TOKEN_BUDGET') ? createBudgetTracker() : null

  // task_budget.remaining tracking across compaction boundaries. Undefined
  // until first compact fires — while context is uncompacted the server can
  // see the full history and handles the countdown from {total} itself (see
  // api/api/sampling/prompt/renderer.py:292). After a compact, the server sees
  // only the summary and would under-count spend; remaining tells it the
  // pre-compact final window that got summarized away. Cumulative across
  // multiple compacts: each subtracts the final context at that compact's
  // trigger point. Loop-local (not on State) to avoid touching the 7 continue
  // sites.
  let taskBudgetRemaining: number | undefined = undefined

  // Snapshot immutable env/statsig/session state once at entry. See QueryConfig
  // for what's included and why feature() gates are intentionally excluded.
  const config = buildQueryConfig()

  // Refusal recovery is local to this query invocation. It never mutates
  // toolUseContext.options.mainLoopModel, so a successful retry cannot make
  // the fallback model sticky for the rest of the session.
  let refusalFallbackAttempted = false
  let refusalRetryPromptActive = false

  // Fired once per user turn — the prompt is invariant across loop iterations,
  // so per-iteration firing would ask sideQuery the same question N times.
  // Consume point polls settledAt (never blocks). `using` disposes on all
  // generator exit paths — see MemoryPrefetch for dispose/telemetry semantics.
  using pendingMemoryPrefetch = startRelevantMemoryPrefetch(
    state.messages,
    state.toolUseContext,
    querySource,
  )

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Destructure state at the top of each iteration. toolUseContext alone
    // is reassigned within an iteration (queryTracking, messages updates);
    // the rest are read-only between continue sites.
    let { toolUseContext } = state
    let resumeIncompleteThinking287=state.resumeIncompleteThinking
    let messages=state.messages
    const {
      autoCompactTracking,
      maxOutputTokensRecoveryCount,
      hasAttemptedReactiveCompact,
      maxOutputTokensOverride,
      pendingToolUseSummary,
      stopHookActive,
      turnCount,
    } = state

    originalCompactCaller287.markTurnActive({vs:classifierLifetime287,w:messages,f:toolUseContext,N:state})

    // Complete original RRo consumer at the main-loop pre-query boundary.
    // Same session/array; subagents and incomplete-thinking resumes do not drain.
    if(compactCategory287==='main'&&!toolUseContext.agentId&&!resumeIncompleteThinking287){
      try {
        for(const batch of await drainOriginalPostModelSwitch287(toolUseContext.session)){
          for(const message of batch.messages){yield message;messages=[...messages,message]}
          if(batch.contexts.length>0){
            const message=createPostModelSwitchAttachment287({type:'hook_additional_context',content:batch.contexts,hookName:'PostModelSwitch',toolUseID:'PostModelSwitch',hookEvent:'PostModelSwitch'},contextStamp)
            yield message;messages=[...messages,message]
          }
        }
      } catch(error){logError(error instanceof Error?error:Error(String(error)))}
    }

    // Skill discovery prefetch — per-iteration (uses findWritePivot guard
    // that returns early on non-write iterations). Discovery runs while the
    // model streams and tools execute; awaited post-tools alongside the
    // memory prefetch consume. Replaces the blocking assistant_turn path
    // that ran inside getAttachmentMessages (97% of those calls found
    // nothing in prod). Turn-0 user-input discovery still blocks in
    // userInputAttachments — that's the one signal where there's no prior
    // work to hide under.
    const pendingSkillPrefetch = skillPrefetch?.startSkillDiscoveryPrefetch(
      null,
      messages,
      toolUseContext,
    )

    yield { type: 'stream_request_start' }

    queryCheckpoint('query_fn_entry')

    // Record query start for headless latency tracking (skip for subagents)
    if (!toolUseContext.agentId) {
      headlessProfilerCheckpoint('query_started')
    }

    // Initialize or increment query chain tracking
    const queryTracking = toolUseContext.queryTracking
      ? {
          chainId: toolUseContext.queryTracking.chainId,
          depth: toolUseContext.queryTracking.depth + 1,
        }
      : {
          chainId: deps.uuid(),
          depth: 0,
        }

    const queryChainIdForAnalytics =
      queryTracking.chainId as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS

    toolUseContext = {
      ...toolUseContext,
      queryTracking,
    }

    let messagesForQuery = [...getMessagesAfterCompactBoundary(messages)]
    messagesForQuery=toolUseContext.arrivalRowsReader287?.withArrivedRows(messagesForQuery)??messagesForQuery
    messagesForQuery=reapplyOriginalHintView287(messagesForQuery,toolUseContext.contentReplacementState)

    let tracking = autoCompactTracking
    const isPreFirstCompactFork=isPreFirstCompactFork287(toolUseContext,tracking,querySource)

    // Enforce per-message budget on aggregate tool result size. Runs BEFORE
    // microcompact — cached MC operates purely by tool_use_id (never inspects
    // content), so content replacement is invisible to it and the two compose
    // cleanly. No-ops when contentReplacementState is undefined (feature off).
    // Persist only for querySources that read records back on resume: agentId
    // routes to sidechain file (AgentTool resume) or session file (/resume).
    // Ephemeral runForkedAgent callers (agent_summary etc.) don't persist.
    const persistReplacements =
      querySource.startsWith('agent:') ||
      querySource.startsWith('repl_main_thread')
    messagesForQuery = await applyToolResultBudget(
      messagesForQuery,
      toolUseContext.contentReplacementState,
      persistReplacements
        ? records =>
            void recordContentReplacement(
              records,
              toolUseContext.agentId,
            ).catch(logError)
        : undefined,
      new Set(
        toolUseContext.options.tools
          .filter(t => !Number.isFinite(t.maxResultSizeChars))
          .map(t => t.name),
      ),
    )

    // Apply snip before microcompact (both may run — they are not mutually exclusive).
    // snipTokensFreed is plumbed to autocompact so its threshold check reflects
    // what snip removed; tokenCountWithEstimation alone can't see it (reads usage
    // from the protected-tail assistant, which survives snip unchanged).
    const snipTokensFreed = 0

    // Apply microcompact before autocompact
    queryCheckpoint('query_microcompact_start')
    const microcompactResult = await deps.microcompact(
      messagesForQuery,
      toolUseContext,
      querySource,
    )
    messagesForQuery = microcompactResult.messages
    // For cached microcompact (cache editing), defer boundary message until after
    // the API response so we can use actual cache_deleted_input_tokens.
    // Gated behind feature() so the string is eliminated from external builds.
    const pendingCacheEdits = feature('CACHED_MICROCOMPACT')
      ? microcompactResult.compactionInfo?.pendingCacheEdits
      : undefined
    queryCheckpoint('query_microcompact_end')

    // Project the collapsed context view and maybe commit more collapses.
    // Runs BEFORE autocompact so that if collapse gets us under the
    // autocompact threshold, autocompact is a no-op and we keep granular
    // context instead of a single summary.
    //
    // Nothing is yielded — the collapsed view is a read-time projection
    // over the REPL's full history. Summary messages live in the collapse
    // store, not the REPL array. This is what makes collapses persist
    // across turns: projectView() replays the commit log on every entry.
    // Within a turn, the view flows forward via state.messages at the
    // continue site (query.ts:1192), and the next projectView() no-ops
    // because the archived messages are already gone from its input.

    queryCheckpoint('query_autocompact_start')
    const { compactionResult, consecutiveFailures, consecutiveRapidRefills,kind:autoCompactKind287 } = await deps.autocompact(
      messagesForQuery,
      toolUseContext,
      originalCompactCaller287.automaticCacheSafeParams({u:systemPrompt,s:userContext,g:systemContext,f:toolUseContext,w:messagesForQuery,lt:compactStickyBetas287,W:params.agentCacheTtlOverride}),
      querySource,
      tracking,
      snipTokensFreed,
    )
    queryCheckpoint('query_autocompact_end')

    if(autoCompactKind287==='rapid_refill_breaker_tripped'){
      const source287=(require('./commands/clear/lifecycle287.js') as typeof import('./commands/clear/lifecycle287.js')).getClearSourceModule287('chunk-w8a1w7ad.js')
      const failure287=(source287.us as (input:{mainLoopModel:string;configuredWindow:typeof toolUseContext.options.autoCompactWindow})=>{content:string;afterShrinkingFallback:boolean})({mainLoopModel:toolUseContext.options.mainLoopModel,configuredWindow:toolUseContext.options.autoCompactWindow})
      // Original normal caller retires before the next host request. No retry,
      // second queue or session-wide ban is introduced by this terminal result.
      const compactMessages287=(require('./commands/clear/lifecycle287.js') as typeof import('./commands/clear/lifecycle287.js')).getClearSourceModule287('chunk-mphp7acd.js')
      const error287=(compactMessages287.ns as (input:{content:string;error:string;apiError:string;now:()=>string;uuid:()=>string})=>AssistantMessage)({content:failure287.content,error:'invalid_request',apiError:'autocompact_thrashing',now:()=>new Date().toISOString(),uuid:deps.uuid})
      yield error287
      void executeStopFailureHooks(error287,toolUseContext)
      return {reason:'rapid_refill_breaker'}
    }

    if (compactionResult) {
      const {
        preCompactTokenCount,
        postCompactTokenCount,
        truePostCompactTokenCount,
        compactionUsage,
      } = compactionResult

      logEvent('tengu_auto_compact_succeeded', {
        originalMessageCount: messages.length,
        compactedMessageCount:
          compactionResult.summaryMessages.length +
          compactionResult.attachments.length +
          compactionResult.hookResults.length,
        preCompactTokenCount,
        postCompactTokenCount,
        truePostCompactTokenCount,
        compactionInputTokens: compactionUsage?.input_tokens,
        compactionOutputTokens: compactionUsage?.output_tokens,
        compactionCacheReadTokens:
          compactionUsage?.cache_read_input_tokens ?? 0,
        compactionCacheCreationTokens:
          compactionUsage?.cache_creation_input_tokens ?? 0,
        compactionTotalTokens: compactionUsage
          ? compactionUsage.input_tokens +
            (compactionUsage.cache_creation_input_tokens ?? 0) +
            (compactionUsage.cache_read_input_tokens ?? 0) +
            compactionUsage.output_tokens
          : 0,

        queryChainId: queryChainIdForAnalytics,
        queryDepth: queryTracking.depth,
      })

      // task_budget: capture pre-compact final context window before
      // messagesForQuery is replaced with postCompactMessages below.
      // iterations[-1] is the authoritative final window (post server tool
      // loops); see #304930.
      if (params.taskBudget) {
        const preCompactContext =
          finalContextTokensFromLastResponse(messagesForQuery)
        taskBudgetRemaining = Math.max(
          0,
          (taskBudgetRemaining ?? params.taskBudget.total) - preCompactContext,
        )
      }

      // Reset on every compact so turnCounter/turnId reflect the MOST RECENT
      // compact. recompactionInfo (autoCompact.ts:190) already captured the
      // old values for turnsSincePreviousCompact/previousCompactTurnId before
      // the call, so this reset doesn't lose those.
      tracking = {
        compacted: true,
        turnId: deps.uuid(),
        turnCounter: 0,
        consecutiveFailures: 0,
        consecutiveRapidRefills,
      }

      rollOverRuntimeContext(messagesForQuery, toolUseContext)
      compactionResult.summaryMessages = inheritCompactSummaryMetadata(compactionResult.summaryMessages, messagesForQuery)
      contextRouting=await contextKernel.retryRoute(contextRouting,userContext,systemContext,contextRoutingInput(toolUseContext),{messages:params.messages,querySource})
      const tailAnnouncements=await contextKernel.keptTail(compactionResult,{routing:contextRouting,toolUseContext:contextRoutingInput(toolUseContext),querySource,resumeActive:resumeIncompleteThinking287,foreground:contextForeground,stamp:contextStamp})
      const postCompactMessages = contextKernel.insert(buildPostCompactMessages(compactionResult),tailAnnouncements)

      for (const message of postCompactMessages) {
        yield message
      }

      // Continue on with the current query call using the post compact messages
      messagesForQuery = postCompactMessages
    } else if (consecutiveFailures !== undefined) {
      // Autocompact failed — propagate failure count so the circuit breaker
      // can stop retrying on the next iteration.
      tracking = {
        ...(tracking ?? { compacted: false, turnId: '', turnCounter: 0 }),
        consecutiveFailures,
      }
    }

    const requestContext=await contextKernel.snapshotGit(messagesForQuery,contextRouting,contextRoutingInput(toolUseContext),contextForeground)
    for(const announcement of contextKernel.announcements(messagesForQuery,requestContext,{querySource,stamp:contextStamp,announcementWalk:toolUseContext.options.announcementWalk})) {
      yield announcement
      messagesForQuery=[...messagesForQuery,announcement]
    }
    // Original Ha/ls/ja share the existing s1/W9e snapshot reader and je cache.
    const toolSearchSource287=(require('./utils/toolSchema287.js') as typeof import('./utils/toolSchema287.js')).getToolSchemaRuntime287()
    const callerContext287:import('./utils/officialToolSchema287/native.js').QueryCallerContext287=toolUseContext
    const advisorPermission287=toolUseContext.getAppState().toolPermissionContext.mode
    const advisorExceeds287=advisorPermission287==='plan'&&doesMostRecentAssistantMessageExceed200k(messagesForQuery)
    const advisorCarrier287=compactStickyBetas287??toolSearchSource287.queryStickyBetas287()
    const advisorQuery287=toolSearchSource287.queryAdvisor287(messagesForQuery,{
      // Original SVe getAdvisorSetting reads this same AppState owner.
      getAdvisorSetting:callerContext287.getAdvisorSetting??(()=>toolUseContext.getAppState().advisorModel),
    },{querySource,resumeActive:resumeIncompleteThinking287,
      configuredRuntimeModel:toolSearchSource287.queryRuntimeModel287({permissionMode:advisorPermission287,mainLoopModel:toolSearchSource287.queryConfiguredModel287(),exceeds200kTokens:advisorExceeds287}),
      runtimeOptionsModel:toolSearchSource287.queryRuntimeModel287({permissionMode:advisorPermission287,mainLoopModel:toolUseContext.options.mainLoopModel,exceeds200kTokens:advisorExceeds287}),
      carrier:advisorCarrier287,toolChangesRide:model=>toolSearchSource287.queryToolChangesRide287(advisorCarrier287,model)})
    if(advisorQuery287.announcement){const announcement=createAttachmentMessage(advisorQuery287.announcement);yield announcement;messagesForQuery=[...messagesForQuery,announcement]}
    const toolSnapshot287=toolSearchSource287.snapshotProject(messagesForQuery,systemPrompt,{options:toolUseContext.options,querySource,resumeActive:resumeIncompleteThinking287,stamp:contextStamp,
      inheritedReminderFold:()=>toolSearchSource287.readPromptSnapshot(messages)?.reminderFold,
      inheritedWireShape:()=>toolSearchSource287.readPromptSnapshot(messages)?.wireShape,
      inheritedEchoWireToolInputs:()=>toolSearchSource287.readPromptSnapshot(messages)?.echoWireToolInputs,
      contextRendering:contextRouting.rendering})
    if(toolSnapshot287.record){yield toolSnapshot287.record;messagesForQuery=[...messagesForQuery,toolSnapshot287.record]}
    const fullSystemPrompt=asSystemPrompt(appendSystemContext(asSystemPrompt([...toolSnapshot287.systemPrompt]),contextRouting.systemContext))
    let inlineToolsDeclared287:import('./utils/officialToolSchema287/native.js').InlineToolDeclaration287[]|undefined
    let promptHeadSent287:import('./utils/officialToolSchema287/native.js').PromptHead287|undefined
    let toolInputCopiesSent287:Map<string,'wire'|'displayed'>|undefined
    let deferredToolsSent287:{entries:import('./utils/officialToolSchema287/native.js').OriginalToolSchema287[];nameOnlyAnnouncements:Set<string>;strippedReferences:Set<string>}|undefined

    if (compactionResult) invalidateCompactPrecompute(toolUseContext)
    maybeStartCompactPrecompute({messages: messagesForQuery,
      cacheSafeParams: {systemPrompt, userContext, systemContext, toolUseContext, forkContextMessages: messagesForQuery,advisorModel:toolUseContext.getAppState().advisorModel,stickyBetas:compactStickyBetas287},
      querySource, autocompactRan: !!compactionResult || consecutiveFailures !== undefined,
      hasAttemptedReactiveCompact, lastTransitionReason: state.transition?.reason,isPreFirstCompactFork,snipTokensFreed,
      agentCacheTtlOverride:params.agentCacheTtlOverride})

    //TODO: no need to set toolUseContext.messages during set-up since it is updated here
    toolUseContext = {
      ...toolUseContext,
      messages: messagesForQuery,
    }

    const attributionEnabled287=compactCategory287==='main'||compactCategory287==='subagent'
    const activeMcpServer287=attributionEnabled287?callerContext287.options.activeMcpServer:undefined
    const activeMcpTool287=attributionEnabled287?callerContext287.options.activeMcpTool:undefined
    toolSearchSource287.queryAttributionReset287(callerContext287.options,attributionEnabled287)

    const useStreamingToolExecution = config.gates.streamingToolExecution
    const turnOwner287=toolSearchSource287.queryTurnOwner287({createStreamingToolExecutor:()=>useStreamingToolExecution?new StreamingToolExecutor(toolUseContext.options.tools,canUseTool,toolUseContext):null,onReset:()=>toolSearchSource287.queryAttributionReset287(toolUseContext.options,compactCategory287==='main'||compactCategory287==='subagent')})
    const assistantMessages=turnOwner287.assistantMessages
    const toolResults=turnOwner287.toolResults
    const yieldedToolResults: Message[] = []
    // @see https://docs.claude.com/en/docs/build-with-claude/tool-use
    // Note: stop_reason === 'tool_use' is unreliable -- it's not always set correctly.
    // Set during streaming whenever a tool_use block arrives — the sole
    // loop-exit signal. If false after streaming, we're done (modulo stop-hook retry).
    const toolUseBlocks=turnOwner287.toolUseBlocks
    // Complete original xl Sr closure, over the same Wa/reset owner.
    const observeToolResult287=function(h:Message){let v=agentDelivery287.BRo(h);if(v)turnOwner287.toolRequestedEndTurn=v;if(h.type!=="attachment")return;if(h.attachment.type==="hook_stopped_continuation")turnOwner287.shouldPreventContinuation=true;else if(h.attachment.type==="hook_deferred_tool")turnOwner287.toolWasDeferred=true}

    queryCheckpoint('query_setup_start')
    let streamingToolExecutor=turnOwner287.streamingToolExecutor

    const appState = toolUseContext.getAppState()
    const permissionMode = appState.toolPermissionContext.mode
    const classifierContext287=getServerClassifier287().Aa(toolUseContext,compactStickyBetas287??getServerExecutionSession287().conversationLatches.stickyBetas())
    let currentModel = getRuntimeMainLoopModel({
      permissionMode,
      // Original SDK tm/C consumes the caller-resolved launch/model layer. A
      // null headless display slot is not a REPL default-clearing command.
      mainLoopModel: querySource==='sdk' ? sourceToolModel287.tm(toolUseContext) : sourceRunningModel287.Qz({
        mainLoopModel:contextForeground?appState.mainLoopModel:toolUseContext.options.mainLoopModel,
        mainLoopModelForSession:contextForeground?appState.mainLoopModelForSession:null,
      }),
      exceeds200kTokens:
        permissionMode === 'plan' &&
        doesMostRecentAssistantMessageExceed200k(messagesForQuery),
    })

    queryCheckpoint('query_setup_end')

    // Create fetch wrapper once per query session to avoid memory retention.
    // Each call to createDumpPromptsFetch creates a closure that captures the request body.
    // Creating it once means only the latest request body is retained (~700KB),
    // instead of all request bodies from the session (~500MB for long sessions).
    // Note: agentId is effectively constant during a query() call - it only changes
    // between queries (e.g., /clear command or session resume).
    const dumpPromptsFetch = config.gates.isAnt
      ? createDumpPromptsFetch(toolUseContext.agentId ?? config.sessionId)
      : undefined

    // Block if we've hit the hard blocking limit (only applies when auto-compact is OFF)
    // This reserves space so users can still run /compact manually
    // Skip this check if compaction just happened - the compaction result is already
    // validated to be under the threshold, and tokenCountWithEstimation would use
    // stale input_tokens from kept messages that reflect pre-compaction context size.
    // Same staleness applies to snip: subtract snipTokensFreed (otherwise we'd
    // falsely block in the window where snip brought us under autocompact threshold
    // but the stale usage is still above blocking limit — before this PR that
    // window never existed because autocompact always fired on the stale count).
    // Also skip for compact/session_memory queries — these are forked agents that
    // inherit the full conversation and would deadlock if blocked here (the compact
    // agent needs to run to REDUCE the token count).
    // Also skip when reactive compact is enabled and automatic compaction is
    // allowed — the preempt's synthetic error returns before the API call,
    // so reactive compact would never see a prompt-too-long to react to.
    // Widened to walrus so RC can act as fallback when proactive fails.
    //
    // Same skip for context-collapse: its recoverFromOverflow drains
    // staged collapses on a REAL API 413, then falls through to
    // reactiveCompact. A synthetic preempt here would return before the
    // API call and starve both recovery paths. The isAutoCompactEnabled()
    // conjunct preserves the user's explicit "no automatic anything"
    // config — if they set DISABLE_AUTO_COMPACT, they get the preempt.
    const collapseOwnsIt = false
    // Hoist media-recovery gate once per turn. Withholding (inside the
    // stream loop) and recovery (after) must agree; CACHED_MAY_BE_STALE can
    // flip during the 5-30s stream, and withhold-without-recover would eat
    // the message. PTL doesn't hoist because its withholding is ungated —
    // it predates the experiment and is already the control-arm baseline.
    const mediaRecoveryEnabled =
      reactiveCompact?.isReactiveCompactEnabled() ?? false
    if (
      !compactionResult &&
      querySource !== 'compact' &&
      querySource !== 'session_memory' &&
      !(
        reactiveCompact?.isReactiveCompactEnabled() && isAutoCompactEnabled()
      ) &&
      !collapseOwnsIt
    ) {
      const warning = calculateTokenWarningState(
        tokenCountWithEstimation(messagesForQuery) - snipTokensFreed,
        toolUseContext.options.mainLoopModel,
      )
      if (warning.level === 'blocked') {
        yield createAssistantAPIErrorMessage({
          content: PROMPT_TOO_LONG_ERROR_MESSAGE,
          error: 'invalid_request',
        })
        return { reason: 'blocking_limit' }
      }
    }

    let attemptWithFallback = true

    queryCheckpoint('query_api_loop_start')
    try {
      while (attemptWithFallback) {
        attemptWithFallback = false
        try {
          // Consume the compact fork's ordered chain before each request. The
          // existing fallback catch and all refusal handling below are unchanged.
          if (compactFallbacks) {
            if (compactFallbacks[compactFallbackIndex] === currentModel) compactFallbackIndex++
            fallbackModel = compactFallbacks[compactFallbackIndex]
          }
          let streamingFallbackOccured = false
          queryCheckpoint('query_api_streaming_start')
          const autoModeServerContext287=await getServerClassifier287().Pa(classifierContext287)
          for await (const message of deps.callModel({
            messages: prependUserContext(messagesForQuery, contextRouting.userContext),
            systemPrompt: refusalRetryPromptActive
              ? asSystemPrompt(buildRefusalRetrySystemPrompt(fullSystemPrompt))
              : fullSystemPrompt,
            thinkingConfig: toolUseContext.options.thinkingConfig,
            tools: toolUseContext.options.tools,
            signal: toolUseContext.abortController.signal,
            options: {
              clock:originalQueryClock287(toolUseContext),
              random:deps.random??Math.random,
              toolSearchStickyBetas:compactStickyBetas287,
              recordedToolDescriptions:toolSnapshot287.toolDescriptions,
              recordedToolEntries:toolSnapshot287.toolEntries,
              recordedToolServers:toolSnapshot287.toolServers,
              recordedWireShape:toolSnapshot287.recordedWireShape,
              recordedCliPrefix:typeof toolSnapshot287.recordedCliPrefix==='string'?toolSnapshot287.recordedCliPrefix:undefined,
              systemPromptSource:toolSnapshot287.source,
              systemPromptSnapshotHash:toolSnapshot287.snapshotHash,
              onPromptHeadSent:head=>{promptHeadSent287=head},
              onToolInputCopiesSent:copies=>{toolInputCopiesSent287=copies},
              recordedDeferredTools:()=>toolSearchSource287.readDeferredRecords(messagesForQuery),
              onInlineToolsDeclared:tools=>{inlineToolsDeclared287=tools},
              onDeferredToolsSent:tools=>{deferredToolsSent287=tools},
              toolPoolRefreshes:toolUseContext.options.refreshTools!==undefined,
              promptRenderEpoch:promptRenderEpoch287,
              mcpClients:resolveMcpAttachmentClients287(toolUseContext.options.mcpClients,toolUseContext),
              withoutToolDescribeHooks:toolUseContext.options.settingsHooksOff,
              autoModeServerContext:autoModeServerContext287,
              ...(autoModeServerContext287!==undefined&&getServerClassifier287().Ia(toolUseContext)&&{serverClassifier:true}),
              async getToolPermissionContext() {
                const appState = toolUseContext.getAppState()
                return appState.toolPermissionContext
              },
              model: currentModel,
              credentials: toolUseContext.credentials,
              storageV5: toolUseContext.storageV5,
              ...(config.gates.fastModeEnabled && {
                fastMode: appState.fastMode,
              }),
              modelIsRefusalFallbackTarget: isFastModeFallbackTarget287({
                requestModel: currentModel, userModel: fastUserModel287,
                turnRefusalOverride: refusalRetryPromptActive ? currentModel : undefined,
                chainStepModel: compactFallbacks && compactFallbackIndex > 0 ? compactFallbacks[compactFallbackIndex - 1] : undefined,
              }),
              toolChoice: undefined,
              isNonInteractiveSession:
                toolUseContext.options.isNonInteractiveSession,
              fallbackModel,
              apiAttemptsLeft: params.apiAttemptsLeft ?? toolUseContext.apiAttemptsLeft,
              onRetryStatus: toolUseContext.onRetryStatus,
              subscribeRetryWake: toolUseContext.subscribeRetryWake,
              onHintClears: event => {
                messagesForQuery=applyOriginalHintClears287(messagesForQuery,event,toolUseContext.readFileState,toolUseContext.contentReplacementState)
              },
              onStreamingFallback: () => {
                streamingFallbackOccured = true
                turnOwner287.toolDurations.length=0
              },
              querySource,
              keepPartialMessageOnAbort:params.keepPartialMessageOnAbort,
              spawnedBySkill:params.spawnedBySkill,
              activeSkill:callerContext287.options.activeSkill,
              activeMcpServer:activeMcpServer287,
              activeMcpTool:activeMcpTool287,
              agents: toolUseContext.options.agentDefinitions.activeAgents,
              allowedAgentTypes:
                toolUseContext.options.agentDefinitions.allowedAgentTypes,
              hasAppendSystemPrompt:
                !!toolUseContext.options.appendSystemPrompt,
              userSystemPrompt:!toolUseContext.agentId&&toolSearchSource287.queryDetailedTracing287()?toolSearchSource287.queryUserSystemPrompt287(toolUseContext.options.customSystemPrompt,toolUseContext.options.appendSystemPrompt):undefined,
              maxOutputTokensOverride,
              fetchOverride: dumpPromptsFetch,
              mcpTools: appState.mcp.tools,
              hasPendingMcpServers: appState.mcp.clients.some(
                c => c.type === 'pending',
              ),
              queryTracking,
              ...originalQueryEffort287(toolUseContext),
              advisorModel:advisorQuery287.advisorModel,
              advisorDeferred:advisorQuery287.advisorDeferred,
              advisorActive:advisorQuery287.advisorActive,
              skipCacheWrite,
              agentCacheTtlOverride: params.agentCacheTtlOverride,
              evictCacheOnComplete:params.evictCacheOnComplete,
              forkPointUuid:params.forkPointUuid,
              divergesAtMessageId:params.divergesAtMessageId,
              isBackgroundAgent:callerContext287.isBackgroundAgent,
              prevToolDurations:state.prevToolDurations,
              resumeIncompleteThinking:resumeIncompleteThinking287,
              compactionRequestKind: params.compactionRequestKind,
              thinkingStripPlan: params.thinkingStripPlan,
              advisorStripPlan: params.advisorStripPlan,
              skipMessageCacheMarkers: params.skipMessageCacheMarkers,
              agentId: toolUseContext.agentId,
              addNotification: toolUseContext.addNotification,
              ...(params.taskBudget && {
                taskBudget: {
                  total: params.taskBudget.total,
                  ...(taskBudgetRemaining !== undefined && {
                    remaining: taskBudgetRemaining,
                  }),
                },
              }),
            },
          })) {
            // We won't use the tool_calls from the first attempt
            // We could.. but then we'd have to merge assistant messages
            // with different ids and double up on full the tool_results
            if (streamingFallbackOccured) {
              // Yield tombstones for orphaned messages so they're removed from UI and transcript.
              // These partial messages (especially thinking blocks) have invalid signatures
              // that would cause "thinking blocks cannot be modified" API errors.
              for (const msg of assistantMessages) {
                yield { type: 'tombstone' as const, message: msg }
              }
              logEvent('tengu_orphaned_messages_tombstoned', {
                orphanedMessageCount: assistantMessages.length,
                queryChainId: queryChainIdForAnalytics,
                queryDepth: queryTracking.depth,
              })

              turnOwner287.reset({clearAssistantMessages:true})
              yieldedToolResults.length = 0

              // Discard pending results from the failed streaming attempt and create
              // a fresh executor. This prevents orphan tool_results (with old tool_use_ids)
              // from being yielded after the fallback response arrives.
              if (streamingToolExecutor) {
                streamingToolExecutor.discard()
                turnOwner287.rebuildStreamingToolExecutor()
                streamingToolExecutor = turnOwner287.streamingToolExecutor
              }
            }
            // Backfill tool_use inputs on a cloned message before yield so
            // SDK stream output and transcript serialization see legacy/derived
            // fields. The original `message` is left untouched for
            // assistantMessages.push below — it flows back to the API and
            // mutating it would break prompt caching (byte mismatch).
            let yieldMessage: typeof message = message
            if (message.type === 'assistant') {
              let clonedContent: typeof message.message.content | undefined
              for (let i = 0; i < message.message.content.length; i++) {
                const block = message.message.content[i]!
                if (
                  block.type === 'tool_use' &&
                  typeof block.input === 'object' &&
                  block.input !== null
                ) {
                  const tool = findToolByName(
                    toolUseContext.options.tools,
                    block.name,
                  )
                  if (tool?.backfillObservableInput) {
                    const originalInput = block.input as Record<string, unknown>
                    const inputCopy = { ...originalInput }
                    tool.backfillObservableInput(inputCopy)
                    // Only yield a clone when backfill ADDED fields; skip if
                    // it only OVERWROTE existing ones (e.g. file tools
                    // expanding file_path). Overwrites change the serialized
                    // transcript and break VCR fixture hashes on resume,
                    // while adding nothing the SDK stream needs — hooks get
                    // the expanded path via toolExecution.ts separately.
                    const addedFields = Object.keys(inputCopy).some(
                      k => !(k in originalInput),
                    )
                    if (addedFields) {
                      clonedContent ??= [...message.message.content]
                      clonedContent[i] = { ...block, input: inputCopy }
                    }
                  }
                }
              }
              if (clonedContent) {
                yieldMessage = {
                  ...message,
                  message: { ...message.message, content: clonedContent },
                }
              }
            }
            // Withhold recoverable errors (prompt-too-long, max-output-tokens)
            // until we know whether recovery (collapse drain / reactive
            // compact / truncation retry) can succeed. Still pushed to
            // assistantMessages so the recovery checks below find them.
            // Either subsystem's withhold is sufficient — they're
            // independent so turning one off doesn't break the other's
            // recovery path.
            //
            // feature() only works in if/ternary conditions (bun:bundle
            // tree-shaking constraint), so the collapse check is nested
            // rather than composed.
            let withheld = false
            if (reactiveCompact?.isWithheldPromptTooLong(message)) {
              withheld = true
            }
            if (
              mediaRecoveryEnabled &&
              reactiveCompact?.isWithheldMediaSizeError(message)
            ) {
              withheld = true
            }
            if (isWithheldMaxOutputTokens(message)) {
              withheld = true
            }
            if (!withheld) {
              yield yieldMessage
            }
            if (message.type === 'attachment') {
              // Original ljt emits normalization/prefix markers. Persist them in
              // this existing request history, not a separate API-only buffer.
              messagesForQuery=[...messagesForQuery,message]
            }
            if (message.type === 'assistant') {
              assistantMessages.push(message)

              const msgToolUseBlocks = message.message.content.filter(
                content => content.type === 'tool_use',
              ) as ToolUseBlock[]
              if (msgToolUseBlocks.length > 0) {
                toolUseBlocks.push(...msgToolUseBlocks)
                turnOwner287.needsFollowUp = true
              }

              if (
                streamingToolExecutor &&
                !toolUseContext.abortController.signal.aborted
              ) {
                for (const toolBlock of msgToolUseBlocks) {
                  streamingToolExecutor.addTool(toolBlock, message)
                }
              }
            }

            if (
              streamingToolExecutor &&
              !toolUseContext.abortController.signal.aborted
            ) {
              for (const result of streamingToolExecutor.getCompletedResults()) {
                if(result.toolDuration)turnOwner287.toolDurations.push(result.toolDuration)
                if (result.event) yield result.event
                if (result.message) {
                  yield result.message
                  observeToolResult287(result.message)
                  if (
                    result.message.type === 'user' ||
                    result.message.type === 'attachment'
                  ) {
                    yieldedToolResults.push(result.message)
                  }
                  if (result.message.type === 'attachment') toolResults.push(result.message)
                  else toolResults.push(
                    ...normalizeMessagesForAPI(
                      [result.message],
                      toolUseContext.options.tools,
                    ).filter(_ => _.type === 'user'),
                  )
                }
              }
            }
          }
          if(assistantMessages.at(-1)&&!assistantMessages.at(-1)!.isApiErrorMessage&&!turnOwner287.needsFollowUp){
            const recordOptions287={options:toolUseContext.options,querySource,stamp:contextStamp,head:promptHeadSent287,toolInputCopies:toolInputCopiesSent287}
            const inlineRecord287=toolSearchSource287.snapshotMerge(messagesForQuery,inlineToolsDeclared287,recordOptions287)
            if(inlineRecord287){yield inlineRecord287;messagesForQuery=[...messagesForQuery,inlineRecord287]}
            const deferredRecord287=toolSearchSource287.deferredRecord(messagesForQuery,deferredToolsSent287,recordOptions287)
            if(deferredRecord287){yield deferredRecord287;messagesForQuery=[...messagesForQuery,deferredRecord287]}
          }
          queryCheckpoint('query_api_streaming_end')

          // A refusal is returned as a normal UI-visible assistant error by
          // claude.ts. Remove only the inference-visible representation and
          // retry the exact same request once with the local fallback model.
          // The original messages remain yielded to the UI/transcript.
          const refusalMessage = assistantMessages.findLast(isRefusalMessage)
          if (refusalMessage) {
            refusalRetryPromptActive = false
            const refusalMetadata = getRefusalRecoveryMetadata(refusalMessage)
            const originalModel =
              refusalMetadata?.original_model ?? currentModel
            const fallbackModel = getRefusalFallbackModel(currentModel)
            const retractedMessageUuids = Array.from(
              new Set(
                [...assistantMessages, ...toolResults, ...yieldedToolResults]
                  .map(message => message.uuid)
                  .filter((uuid): uuid is typeof uuid => typeof uuid === 'string'),
              ),
            )
            const state: RefusalRecoveryState = {
              original_model: originalModel,
              fallback_model: fallbackModel ?? null,
              scope: 'local',
              request_id: refusalMetadata?.request_id ?? null,
              api_refusal_category:
                refusalMetadata?.api_refusal_category ?? null,
              api_refusal_explanation:
                refusalMetadata?.api_refusal_explanation ?? null,
              refused_user_message_uuid:
                messagesForQuery.findLast(
                  message =>
                    message.type === 'user' &&
                    !message.isMeta &&
                    !(
                      Array.isArray(message.message.content) &&
                      message.message.content.some(
                        block => block.type === 'tool_result',
                      )
                    ),
                )?.uuid ?? null,
              retracted_message_uuids: retractedMessageUuids,
              attempt_used: refusalFallbackAttempted,
            }

            for (const message of assistantMessages) {
              markModelContextExcluded(message)
            }
            // Tool results from a refused partial call may already have been
            // yielded to the UI. Exclude them as well, otherwise resume or
            // the next turn can send orphaned tool_result blocks without the
            // rejected tool_use that produced them.
            for (const message of toolResults) {
              markModelContextExcluded(message)
            }
            for (const message of yieldedToolResults) {
              markModelContextExcluded(message)
            }

            if (!refusalFallbackAttempted && fallbackModel) {
              refusalFallbackAttempted = true
              refusalRetryPromptActive = true
              state.attempt_used = true

              yield createRefusalProtocolMessage({
                subtype: 'model_refusal_fallback',
                state,
                content: getRefusalFallbackContent(
                  originalModel,
                  fallbackModel,
                  state.api_refusal_category,
                ),
                isMeta: false,
              }) as Message

              turnOwner287.reset({clearAssistantMessages:true})
              yieldedToolResults.length = 0
              streamingToolExecutor?.discard()
              if (streamingToolExecutor) {
                turnOwner287.rebuildStreamingToolExecutor()
                streamingToolExecutor = turnOwner287.streamingToolExecutor
              }

              currentModel = fallbackModel
              attemptWithFallback = true
              continue
            }

            yield createRefusalProtocolMessage({
              subtype: 'model_refusal_no_fallback',
              state,
              content: getRefusalNoFallbackContent(
                originalModel,
                state.api_refusal_category,
              ),
              isMeta: false,
            }) as Message

            // Never execute tool calls from a refused or incomplete response.
            turnOwner287.reset({clearAssistantMessages:false})
            yieldedToolResults.length = 0
          }

          // The continuation hint is only for the single fallback request.
          // The next tool-follow-up or user turn uses the primary model prompt.
          refusalRetryPromptActive = false

          // Yield deferred microcompact boundary message using actual API-reported
          // token deletion count instead of client-side estimates.
          // Entire block gated behind feature() so the excluded string
          // is eliminated from external builds.
          if (feature('CACHED_MICROCOMPACT') && pendingCacheEdits) {
            const lastAssistant = assistantMessages.at(-1)
            // The API field is cumulative/sticky across requests, so we
            // subtract the baseline captured before this request to get the delta.
            const usage = lastAssistant?.message.usage
            const cumulativeDeleted = usage
              ? ((usage as unknown as Record<string, number>)
                  .cache_deleted_input_tokens ?? 0)
              : 0
            const deletedTokens = Math.max(
              0,
              cumulativeDeleted - pendingCacheEdits.baselineCacheDeletedTokens,
            )
            if (deletedTokens > 0) {
              yield createMicrocompactBoundaryMessage(
                pendingCacheEdits.trigger,
                0,
                deletedTokens,
                pendingCacheEdits.deletedToolIds,
                [],
              )
            }
          }
        } catch (innerError) {
          if ((innerError instanceof FallbackTriggeredError || isOriginalFallbackError287(innerError)) && fallbackModel) {
            // Fallback was triggered - switch model and retry
            if(isOriginalFallbackError287(innerError))fallbackModel=innerError.fallbackModel
            currentModel = fallbackModel
            attemptWithFallback = true

            // Clear assistant messages since we'll retry the entire request
            yield* yieldMissingToolResultBlocks(
              assistantMessages,
              'Model fallback triggered',
            )
            turnOwner287.reset({clearAssistantMessages:true})
            yieldedToolResults.length = 0

            // Discard pending results from the failed attempt and create a
            // fresh executor. This prevents orphan tool_results (with old
            // tool_use_ids) from leaking into the retry.
            if (streamingToolExecutor) {
              streamingToolExecutor.discard()
              turnOwner287.rebuildStreamingToolExecutor()
              streamingToolExecutor = turnOwner287.streamingToolExecutor
            }

            // Update tool use context with new model
            toolUseContext.options.mainLoopModel = fallbackModel

            // Thinking signatures are model-bound: replaying a protected-thinking
            // block (e.g. capybara) to an unprotected fallback (e.g. opus) 400s.
            // Strip before retry so the fallback model gets clean history.
            if (process.env.USER_TYPE === 'ant') {
              messagesForQuery = stripSignatureBlocks(messagesForQuery)
            }

            // Log the fallback event
            logEvent('tengu_model_fallback_triggered', {
              original_model:
                innerError.originalModel as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              fallback_model:
                fallbackModel as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              entrypoint:
                'cli' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
              queryChainId: queryChainIdForAnalytics,
              queryDepth: queryTracking.depth,
            })

            // Yield system message about fallback — use 'warning' level so
            // users see the notification without needing verbose mode
            yield createSystemMessage(
              `Switched to ${renderModelName(innerError.fallbackModel)} due to high demand for ${renderModelName(innerError.originalModel)}`,
              'warning',
            )

            continue
          }
          throw innerError
        }
      }
    } catch (error) {
      logError(error)
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      logEvent('tengu_query_error', {
        assistantMessages: assistantMessages.length,
        toolUses: assistantMessages.flatMap(_ =>
          _.message.content.filter(content => content.type === 'tool_use'),
        ).length,

        queryChainId: queryChainIdForAnalytics,
        queryDepth: queryTracking.depth,
      })

      // Handle image size/resize errors with user-friendly messages
      if (
        error instanceof ImageSizeError ||
        error instanceof ImageResizeError
      ) {
        yield createAssistantAPIErrorMessage({
          content: error.message,
        })
        return { reason: 'image_error' }
      }

      // Generally queryModelWithStreaming should not throw errors but instead
      // yield them as synthetic assistant messages. However if it does throw
      // due to a bug, we may end up in a state where we have already emitted
      // a tool_use block but will stop before emitting the tool_result.
      yield* yieldMissingToolResultBlocks(assistantMessages, errorMessage)

      // Surface the real error instead of a misleading "[Request interrupted
      // by user]" — this path is a model/runtime failure, not a user action.
      // SDK consumers were seeing phantom interrupts on e.g. Node 18's missing
      // Array.prototype.with(), masking the actual cause.
      yield createAssistantAPIErrorMessage({
        content: errorMessage,
      })

      // To help track down bugs, log loudly for ants
      logAntError('Query error', error)
      return { reason: 'model_error', error }
    }

    // Official response-usage arm point (QSr armTrigger=api_response). The
    // background compact uses the full response history, not a foreground pause.
    const compactArmMessage = assistantMessages.at(-1)
    if (compactArmMessage && !compactArmMessage.isApiErrorMessage && !toolUseContext.abortController.signal.aborted) {
      const usage = compactArmMessage.message.usage
      const inputTokens = usage.input_tokens + (usage.cache_creation_input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0)
      maybeStartCompactPrecompute({messages: messagesForQuery,responseMessages:assistantMessages,responseUsage:usage,
        cacheSafeParams: {systemPrompt, userContext, systemContext, toolUseContext, forkContextMessages: messagesForQuery,advisorModel:toolUseContext.getAppState().advisorModel,stickyBetas:compactStickyBetas287},
        querySource, autocompactRan: !!compactionResult || consecutiveFailures !== undefined,
        hasAttemptedReactiveCompact, lastTransitionReason: state.transition?.reason,
        isPreFirstCompactFork,snipTokensFreed,toolUses:toolUseBlocks,agentCacheTtlOverride:params.agentCacheTtlOverride,
        contextTokens: ((require('./utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-1b21she7.js').yx as (value:AssistantMessage['message']['usage'])=>number)(usage),armTrigger: 'api_response', isFinalResponse: !turnOwner287.needsFollowUp,
        estimateGapTokens: inputTokens - tokenCountWithEstimation(messagesForQuery)})
    }

    // Execute post-sampling hooks after model response is complete
    if (assistantMessages.length > 0) {
      void executePostSamplingHooks(
        [...messagesForQuery, ...assistantMessages],
        systemPrompt,
        userContext,
        systemContext,
        toolUseContext,
        querySource,
      )
    }

    // We need to handle a streaming abort before anything else.
    // When using streamingToolExecutor, we must consume getRemainingResults() so the
    // executor can generate synthetic tool_result blocks for queued/in-progress tools.
    // Without this, tool_use blocks would lack matching tool_result blocks.
    if (toolUseContext.abortController.signal.aborted) {
      if (streamingToolExecutor) {
        // Consume remaining results - executor generates synthetic tool_results for
        // aborted tools since it checks the abort signal in executeTool()
        for await (const update of streamingToolExecutor.getRemainingResults()) {
          if (update.event) yield update.event
          if (update.message) {
            yield update.message
          }
        }
      } else {
        yield* yieldMissingToolResultBlocks(
          assistantMessages,
          'Interrupted by user',
        )
      }
      // chicago MCP: auto-unhide + lock release on interrupt. Same cleanup
      // as the natural turn-end path in stopHooks.ts. Main thread only —
      // see stopHooks.ts for the subagent-releasing-main's-lock rationale.
      if (feature('CHICAGO_MCP') && !toolUseContext.agentId) {
        try {
          const { cleanupComputerUseAfterTurn } = await import(
            './utils/computerUse/cleanup.js'
          )
          await cleanupComputerUseAfterTurn(toolUseContext)
        } catch {
          // Failures are silent — this is dogfooding cleanup, not critical path
        }
      }

      // Skip the interruption message for submit-interrupts — the queued
      // user message that follows provides sufficient context.
      if (toolUseContext.abortController.signal.reason !== 'interrupt') {
        yield createUserInterruptionMessage({
          toolUse: false,
        })
      }
      return { reason: 'aborted_streaming' }
    }

    // Yield tool use summary from previous turn — haiku (~1s) resolved during model streaming (5-30s)
    if (pendingToolUseSummary) {
      const summary = await pendingToolUseSummary
      if (summary) {
        yield summary
      }
    }

    if (!turnOwner287.needsFollowUp) {
      const lastMessage = assistantMessages.at(-1)

      // Prompt-too-long recovery: the streaming loop withheld the error
      // (see withheldByCollapse / withheldByReactive above). Try collapse
      // drain first (cheap, keeps granular context), then reactive compact
      // (full summary). Single-shot on each — if a retry still 413's,
      // the next stage handles it or the error surfaces.
      const isWithheld413 =
        lastMessage?.type === 'assistant' &&
        lastMessage.isApiErrorMessage &&
        isPromptTooLongMessage(lastMessage)
      // Media-size rejections (image/PDF/many-image) are recoverable via
      // reactive compact's strip-retry. Unlike PTL, media errors skip the
      // collapse drain — collapse doesn't strip images. mediaRecoveryEnabled
      // is the hoisted gate from before the stream loop (same value as the
      // withholding check — these two must agree or a withheld message is
      // lost). If the oversized media is in the preserved tail, the
      // post-compact turn will media-error again; hasAttemptedReactiveCompact
      // prevents a spiral and the error surfaces.
      const isWithheldMedia =
        mediaRecoveryEnabled &&
        reactiveCompact?.isWithheldMediaSizeError(lastMessage)
      if (isWithheld413) {
        // First: drain all staged context-collapses. Gated on the PREVIOUS
        // transition not being collapse_drain_retry — if we already drained
        // and the retry still 413'd, fall through to reactive compact.
      }
      if ((isWithheld413 || isWithheldMedia) && reactiveCompact) {
        const callerLifecycle=getQueryCompactLifecycle287()
        const deeperPass=state.reactiveCompactDeeperPass??'none'
        const retryGate=callerLifecycle.retryGate({v:!!isWithheld413,No:hasAttemptedReactiveCompact,on:deeperPass,N:state,Ve:tracking})
        if(!hasAttemptedReactiveCompact&&retryGate.rapid.action==='trip'){
          const source287=(require('./commands/clear/lifecycle287.js') as typeof import('./commands/clear/lifecycle287.js')).getClearSourceModule287('chunk-w8a1w7ad.js')
          const content=(source287.us as (input:{mainLoopModel:string;configuredWindow:typeof toolUseContext.options.autoCompactWindow;fallback?:string})=>{content:string})({mainLoopModel:toolUseContext.options.mainLoopModel,configuredWindow:toolUseContext.options.autoCompactWindow,fallback:contextForeground&&isWithheld413?fallbackModel:undefined}).content
          const failure=(getClearSourceModule287('chunk-mphp7acd.js').ns as (input:{content:string;error:string;apiError:string;now:()=>string;uuid:()=>string})=>AssistantMessage)({content,error:'invalid_request',apiError:'autocompact_thrashing',now:contextStamp.now,uuid:deps.uuid})
          yield failure;void executeStopFailureHooks(failure,toolUseContext)
          ;(require('./query/postTurnClient287/index.js') as typeof import('./query/postTurnClient287/index.js')).getPostTurnClient287().queryObservers.uo(toolUseContext,querySource,failure)
          return {reason:'rapid_refill_breaker'}
        }
        const impossibleTerminal=yield* callerLifecycle.impossibleConversation({h:lastMessage!,ne:retryGate.hasAttempted,b:querySource,f:toolUseContext,w:messagesForQuery,H:!!isWithheldMedia,on:deeperPass,I:{now:contextStamp.now,uuid:deps.uuid}})
        if(impossibleTerminal)return impossibleTerminal
        const recovery = await reactiveCompact.recoverReactiveCompact287({
          hasAttempted: retryGate.hasAttempted,
          hasAttemptedReactiveCompact,
          borrowFrom:isPreFirstCompactFork?toolUseContext.precomputeSourceKey:undefined,
          isWithheld413: !!isWithheld413,
          initialTokenGap: isWithheld413 && lastMessage ? getPromptTooLongTokenGap(lastMessage) : undefined,
          querySource,
          aborted: toolUseContext.abortController.signal.aborted,
          messages: messagesForQuery,
          cacheSafeParams: callerLifecycle.reactiveCacheSafeParams({u:systemPrompt,s:userContext,g:systemContext,f:toolUseContext,ot:toolUseContext,w:messagesForQuery,lt:compactStickyBetas287,W:params.agentCacheTtlOverride}),
        })
        const compacted=recovery.result

        if (compacted) {
          // task_budget: same carryover as the proactive path above.
          // messagesForQuery still holds the pre-compact array here (the
          // 413-failed attempt's input).
          if (params.taskBudget) {
            const preCompactContext =
              finalContextTokensFromLastResponse(messagesForQuery)
            taskBudgetRemaining = Math.max(
              0,
              (taskBudgetRemaining ?? params.taskBudget.total) -
                preCompactContext,
            )
          }

          rollOverRuntimeContext(messagesForQuery, toolUseContext)
          compacted.summaryMessages = inheritCompactSummaryMetadata(compacted.summaryMessages, messagesForQuery)
          contextRouting=await contextKernel.retryRoute(contextRouting,userContext,systemContext,contextRoutingInput(toolUseContext),{messages:params.messages,querySource})
          const tailAnnouncements=await contextKernel.keptTail(compacted,{routing:contextRouting,toolUseContext:contextRoutingInput(toolUseContext),querySource,resumeActive:resumeIncompleteThinking287,foreground:contextForeground,stamp:contextStamp})
          const postCompactMessages = contextKernel.insert(buildPostCompactMessages(compacted),tailAnnouncements)
          for (const msg of postCompactMessages) {
            yield msg
          }
          const nextTracking=(getClearSourceModule287('chunk-mphp7acd.js').Qxr as (uuid:string,rapidRefills:number)=>AutoCompactTrackingState)(deps.uuid(),retryGate.consecutiveRapidRefills)
          const originalNext=callerLifecycle.retryState({ue:retryGate.deeper,At:recovery.precomputed,v:!!isWithheld413,on:deeperPass,ut:postCompactMessages,
            Ae:{hasAttemptedReactiveCompact,reactiveCompactDeeperPass:deeperPass},f:toolUseContext,Ve:nextTracking,qe:resumeIncompleteThinking287})
          const next: State = {
            messages: postCompactMessages,
            toolUseContext,
            autoCompactTracking: originalNext.compactTracking,
            resumeIncompleteThinking: originalNext.resumeIncompleteThinking,
            maxOutputTokensRecoveryCount,
            hasAttemptedReactiveCompact: originalNext.guards.hasAttemptedReactiveCompact,
            reactiveCompactDeeperPass: originalNext.guards.reactiveCompactDeeperPass,
            maxOutputTokensOverride: undefined,
            pendingToolUseSummary: undefined,
            stopHookActive: undefined,
            turnCount,
            transition: originalNext.transition,
          }
          state = next
          continue
        }

        // No recovery — surface the withheld error and exit. Do NOT fall
        // through to stop hooks: the model never produced a valid response,
        // so hooks have nothing meaningful to evaluate. Running stop hooks
        // on prompt-too-long creates a death spiral: error → hook blocking
        // → retry → error → … (the hook injects more tokens each cycle).
        const surfaced=callerLifecycle.surfaceFailure({v:!!isWithheld413,Uo:recovery.failure,h:lastMessage!,I:{now:contextStamp.now,uuid:deps.uuid}})
        yield surfaced
        void executeStopFailureHooks(surfaced, toolUseContext)
        ;(require('./query/postTurnClient287/index.js') as typeof import('./query/postTurnClient287/index.js')).getPostTurnClient287().queryObservers.uo(toolUseContext,querySource,surfaced)
        return { reason: isWithheldMedia ? 'image_error' : 'prompt_too_long' }
      }

      // Check for max_output_tokens and inject recovery message. The error
      // was withheld from the stream above; only surface it if recovery
      // exhausts.
      if (isWithheldMaxOutputTokens(lastMessage)) {
        // Escalating retry: if we used the capped 8k default and hit the
        // limit, retry the SAME request at 64k — no meta message, no
        // multi-turn dance. This fires once per turn (guarded by the
        // override check), then falls through to multi-turn recovery if
        // 64k also hits the cap.
        // 3P default: false (not validated on Bedrock/Vertex)
        const capEnabled = getFeatureValue_CACHED_MAY_BE_STALE(
          'tengu_otk_slot_v1',
          false,
        )
        if (
          capEnabled &&
          maxOutputTokensOverride === undefined &&
          !process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS
        ) {
          logEvent('tengu_max_tokens_escalate', {
            escalatedTo: ESCALATED_MAX_TOKENS,
          })
          const next: State = {
            messages: messagesForQuery,
            toolUseContext,
            autoCompactTracking: tracking,
            maxOutputTokensRecoveryCount,
            hasAttemptedReactiveCompact,
            maxOutputTokensOverride: ESCALATED_MAX_TOKENS,
            reactiveCompactDeeperPass:state.reactiveCompactDeeperPass,
            pendingToolUseSummary: undefined,
            stopHookActive: undefined,
            turnCount,
            transition: { reason: 'max_output_tokens_escalate' },
          }
          state = next
          continue
        }

        if (maxOutputTokensRecoveryCount < MAX_OUTPUT_TOKENS_RECOVERY_LIMIT) {
          const resumeThinking287=toolSearchSource287.queryCanResumeThinking287(assistantMessages,getRuntimeMainLoopModel({permissionMode,mainLoopModel:currentModel,exceeds200kTokens:permissionMode==='plan'&&doesMostRecentAssistantMessageExceed200k([...messagesForQuery,...assistantMessages.filter(row=>!row.isApiErrorMessage)])}))
          const recoveryMessage = createUserMessage({
            content:
              `Output token limit hit. Resume directly — no apology, no recap of what you were doing. ` +
              `Pick up mid-thought if that is where the cut happened. Break remaining work into smaller pieces.`,
            isMeta: true,
          })

          const next: State = {
            messages: resumeThinking287?[...messagesForQuery,...assistantMessages.filter(row=>!row.isApiErrorMessage)]:[
              ...messagesForQuery,
              ...assistantMessages,
              recoveryMessage,
            ],
            toolUseContext,
            autoCompactTracking: tracking,
            maxOutputTokensRecoveryCount: maxOutputTokensRecoveryCount + 1,
            resumeIncompleteThinking:resumeThinking287||undefined,
            hasAttemptedReactiveCompact,
            maxOutputTokensOverride: undefined,
            reactiveCompactDeeperPass:state.reactiveCompactDeeperPass,
            pendingToolUseSummary: undefined,
            stopHookActive: undefined,
            turnCount,
            transition: {
              reason: 'max_output_tokens_recovery',
              attempt: maxOutputTokensRecoveryCount + 1,
            },
          }
          state = next
          continue
        }

        // Recovery exhausted — surface the withheld error now.
        yield lastMessage
      }

      // Skip stop hooks when the last message is an API error (rate limit,
      // prompt-too-long, auth failure, etc.). The model never produced a
      // real response — hooks evaluating it create a death spiral:
      // error → hook blocking → retry → error → …
      if (lastMessage?.isApiErrorMessage) {
        void executeStopFailureHooks(lastMessage, toolUseContext)
        // Existing request-local refusal handling remains independent of Goal.
        if (isRefusalMessage(lastMessage)) return {reason: 'completed'}
        return {reason: 'api_error', errorKind: lastMessage.error ?? lastMessage.apiError,
          isTransient: lastMessage.apiErrorIsTransient === true || lastMessage.error === 'overloaded' || lastMessage.error === 'server_error',
          quotaLimits: lastMessage.quotaLimits}
      }

      const stopHookResult = yield* handleStopHooks(
        messagesForQuery,
        assistantMessages,
        systemPrompt,
        userContext,
        systemContext,
        toolUseContext,
        querySource,
        stopHookActive,
        compactStickyBetas287,
      )

      if (stopHookResult.preventContinuation) {
        return { reason: 'stop_hook_prevented' }
      }

      if (stopHookResult.blockingErrors.length > 0) {
        const continuation = stopHookContinuation(turnCount, state.stopHookBlockingCount ?? 0, maxTurns)
        if (continuation.maxTurnsReached) {
          yield createAttachmentMessage({type: 'max_turns_reached', maxTurns, turnCount: continuation.nextTurn})
          return {reason: 'max_turns', turnCount: continuation.nextTurn}
        }
        if (continuation.capReached) {
          yield createSystemMessage(`A hook blocked the turn from ending ${continuation.nextCount} consecutive times — overriding and ending turn. ` +
            'For Stop/SubagentStop hooks, check stop_hook_active in the input and return success while it\'s true. Set CLAUDE_CODE_STOP_HOOK_BLOCK_CAP to raise this limit.', 'warning')
          return {reason: 'completed', goalPass: stopHookResult.goalPass}
        }
        const next: State = {
          messages: [
            ...messagesForQuery,
            ...assistantMessages,
            ...stopHookResult.blockingErrors,
          ],
          toolUseContext,
          autoCompactTracking: tracking,
          maxOutputTokensRecoveryCount: 0,
          // Preserve the reactive compact guard — if compact already ran and
          // couldn't recover from prompt-too-long, retrying after a stop-hook
          // blocking error will produce the same result. Resetting to false
          // here caused an infinite loop: compact → still too long → error →
          // stop hook blocking → compact → … burning thousands of API calls.
          hasAttemptedReactiveCompact,
          maxOutputTokensOverride: undefined,
          reactiveCompactDeeperPass:state.reactiveCompactDeeperPass,
          pendingToolUseSummary: undefined,
          stopHookActive: true,
          stopHookBlockingCount: continuation.nextCount,
          turnCount: continuation.nextTurn,
          transition: { reason: 'stop_hook_blocking' },
        }
        state = next
        continue
      }

      if (feature('TOKEN_BUDGET')) {
        const decision = checkTokenBudget(
          budgetTracker!,
          toolUseContext.agentId,
          getCurrentTurnTokenBudget(),
          getTurnOutputTokens(),
        )

        if (decision.action === 'continue') {
          incrementBudgetContinuationCount()
          logForDebugging(
            `Token budget continuation #${decision.continuationCount}: ${decision.pct}% (${decision.turnTokens.toLocaleString()} / ${decision.budget.toLocaleString()})`,
          )
          state = {
            messages: [
              ...messagesForQuery,
              ...assistantMessages,
              createUserMessage({
                content: decision.nudgeMessage,
                isMeta: true,
              }),
            ],
            toolUseContext,
            autoCompactTracking: tracking,
            maxOutputTokensRecoveryCount: 0,
            hasAttemptedReactiveCompact: false,
            maxOutputTokensOverride: undefined,
            pendingToolUseSummary: undefined,
            stopHookActive: undefined,
            turnCount,
            transition: { reason: 'token_budget_continuation' },
          }
          continue
        }

        if (decision.completionEvent) {
          if (decision.completionEvent.diminishingReturns) {
            logForDebugging(
              `Token budget early stop: diminishing returns at ${decision.completionEvent.pct}%`,
            )
          }
          logEvent('tengu_token_budget_completed', {
            ...decision.completionEvent,
            queryChainId: queryChainIdForAnalytics,
            queryDepth: queryTracking.depth,
          })
        }
      }

      return { reason: 'completed', goalPass: stopHookResult.goalPass }
    }

    let updatedToolUseContext = toolUseContext

    queryCheckpoint('query_tool_execution_start')


    if (streamingToolExecutor) {
      logEvent('tengu_streaming_tool_execution_used', {
        tool_count: toolUseBlocks.length,
        queryChainId: queryChainIdForAnalytics,
        queryDepth: queryTracking.depth,
      })
    } else {
      logEvent('tengu_streaming_tool_execution_not_used', {
        tool_count: toolUseBlocks.length,
        queryChainId: queryChainIdForAnalytics,
        queryDepth: queryTracking.depth,
      })
    }

    const toolUpdates = streamingToolExecutor
      ? streamingToolExecutor.getRemainingResults()
      : runTools(toolUseBlocks, assistantMessages, canUseTool, toolUseContext)

    for await (const update of toolUpdates) {
      if(update.toolDuration)turnOwner287.toolDurations.push(update.toolDuration)
      if (update.event) yield update.event
      if (update.message) {
        yield update.message
        observeToolResult287(update.message)

        if (
          update.message.type === 'user' ||
          update.message.type === 'attachment'
        ) {
          yieldedToolResults.push(update.message)
        }

        if (update.message.type === 'attachment') toolResults.push(update.message)
        else toolResults.push(
          ...normalizeMessagesForAPI(
            [update.message],
            toolUseContext.options.tools,
          ).filter(_ => _.type === 'user'),
        )
      }
      if (update.newContext) {
        updatedToolUseContext = {
          ...update.newContext,
          queryTracking,
        }
      }
    }
    if(assistantMessages.at(-1)&&!assistantMessages.at(-1)!.isApiErrorMessage){
      const recordOptions287={options:toolUseContext.options,querySource,stamp:contextStamp,head:promptHeadSent287,toolInputCopies:toolInputCopiesSent287}
      const inlineRecord287=toolSearchSource287.snapshotMerge(messagesForQuery,inlineToolsDeclared287,recordOptions287)
      if(inlineRecord287){yield inlineRecord287;messagesForQuery=[...messagesForQuery,inlineRecord287]}
      const deferredRecord287=toolSearchSource287.deferredRecord(messagesForQuery,deferredToolsSent287,recordOptions287)
      if(deferredRecord287){yield deferredRecord287;messagesForQuery=[...messagesForQuery,deferredRecord287]}
    }
    queryCheckpoint('query_tool_execution_end')

    // Generate tool use summary after tool batch completes — passed to next recursive call
    let nextPendingToolUseSummary:
      | Promise<ToolUseSummaryMessage | null>
      | undefined
    if (
      config.gates.emitToolUseSummaries &&
      toolUseBlocks.length > 0 &&
      !toolUseContext.abortController.signal.aborted &&
      !toolUseContext.agentId // subagents don't surface in mobile UI — skip the Haiku call
    ) {
      // Extract the last assistant text block for context
      const lastAssistantMessage = assistantMessages.at(-1)
      let lastAssistantText: string | undefined
      if (lastAssistantMessage) {
        const textBlocks = lastAssistantMessage.message.content.filter(
          block => block.type === 'text',
        )
        if (textBlocks.length > 0) {
          const lastTextBlock = textBlocks.at(-1)
          if (lastTextBlock && 'text' in lastTextBlock) {
            lastAssistantText = lastTextBlock.text
          }
        }
      }

      // Collect tool info for summary generation
      const toolUseIds = toolUseBlocks.map(block => block.id)
      const toolInfoForSummary = toolUseBlocks.map(block => {
        // Find the corresponding tool result
        const toolResult = toolResults.find(
          result =>
            result.type === 'user' &&
            Array.isArray(result.message.content) &&
            result.message.content.some(
              content =>
                content.type === 'tool_result' &&
                content.tool_use_id === block.id,
            ),
        )
        const resultContent =
          toolResult?.type === 'user' &&
          Array.isArray(toolResult.message.content)
            ? toolResult.message.content.find(
                (c): c is ToolResultBlockParam =>
                  c.type === 'tool_result' && c.tool_use_id === block.id,
              )
            : undefined
        return {
          name: block.name,
          input: block.input,
          output:
            resultContent && 'content' in resultContent
              ? resultContent.content
              : null,
        }
      })

      // Fire off summary generation without blocking the next API call
      nextPendingToolUseSummary = generateToolUseSummary({
        tools: toolInfoForSummary,
        signal: toolUseContext.abortController.signal,
        isNonInteractiveSession: toolUseContext.options.isNonInteractiveSession,
        lastAssistantText,
      })
        .then(summary => {
          if (summary) {
            return createToolUseSummaryMessage(summary, toolUseIds)
          }
          return null
        })
        .catch(() => null)
    }

    // We were aborted during tool calls
    if (toolUseContext.abortController.signal.aborted) {
      // chicago MCP: auto-unhide + lock release when aborted mid-tool-call.
      // This is the most likely Ctrl+C path for CU (e.g. slow screenshot).
      // Main thread only — see stopHooks.ts for the subagent rationale.
      if (feature('CHICAGO_MCP') && !toolUseContext.agentId) {
        try {
          const { cleanupComputerUseAfterTurn } = await import(
            './utils/computerUse/cleanup.js'
          )
          await cleanupComputerUseAfterTurn(toolUseContext)
        } catch {
          // Failures are silent — this is dogfooding cleanup, not critical path
        }
      }
      // Skip the interruption message for submit-interrupts — the queued
      // user message that follows provides sufficient context.
      if (toolUseContext.abortController.signal.reason !== 'interrupt') {
        yield createUserInterruptionMessage({
          toolUse: true,
        })
      }
      // Check maxTurns before returning when aborted
      const nextTurnCountOnAbort = turnCount + 1
      if (maxTurns && nextTurnCountOnAbort > maxTurns) {
        yield createAttachmentMessage({
          type: 'max_turns_reached',
          maxTurns,
          turnCount: nextTurnCountOnAbort,
        })
      }
      return { reason: 'aborted_tools' }
    }

    if (turnOwner287.toolWasDeferred) {
      markPublicTurnAborted287(toolUseContext,querySource)
      return { reason: 'tool_deferred' }
    }

    // Original no -> It -> hook_stopped ordering, after the entire tool batch.
    if (turnOwner287.shouldPreventContinuation) {
      markPublicTurnAborted287(toolUseContext,querySource)
      yield*executePublicTurnEndReactions287(toolUseContext,[...messagesForQuery,...assistantMessages,...toolResults],{stopHookActive})
      return { reason: 'hook_stopped' }
    }

    // Original BRo -> fc caller ordering: drain ALL tool results first, honour
    // cancellation/hook-prevention, then PostToolBatch and the existing Stop
    // owner without a model re-invoke. Never close a runAgent iterator mid-batch.
    if(turnOwner287.toolRequestedEndTurn){
      yield*executePublicEndTurn287({endTurnSource:turnOwner287.toolRequestedEndTurn,messagesForQuery,assistantMessages,toolResults,toolUseBlocks,systemPrompt,userContext,systemContext,toolUseContext,updatedToolUseContext,querySource,stopHookActive,stickyBetas:compactStickyBetas287,queryChainIdForAnalytics,queryDepth:queryTracking.depth,deps:{uuid:randomUUID,now:Date.now}})
      return {reason:updatedToolUseContext.abortController.signal.aborted?'aborted_tools':'completed'}
    }

    if (tracking?.compacted) {
      tracking.turnCounter++
      logEvent('tengu_post_autocompact_turn', {
        turnId:
          tracking.turnId as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        turnCounter: tracking.turnCounter,

        queryChainId: queryChainIdForAnalytics,
        queryDepth: queryTracking.depth,
      })
    }

    // Be careful to do this after tool calls are done, because the API
    // will error if we interleave tool_result messages with regular user messages.

    // Instrumentation: Track message count before attachments
    logEvent('tengu_query_before_attachments', {
      messagesForQueryCount: messagesForQuery.length,
      assistantMessagesCount: assistantMessages.length,
      toolResultsCount: toolResults.length,
      queryChainId: queryChainIdForAnalytics,
      queryDepth: queryTracking.depth,
    })

    // Get queued commands snapshot before processing attachments.
    // These will be sent as attachments so Claude can respond to them in the current turn.
    //
    // Drain pending notifications. LocalShellTask completions are 'next'
    // (when MONITOR_TOOL is on) and drain without Sleep. Other task types
    // (agent/workflow/framework) still default to 'later' — the Sleep flush
    // covers those. If all task types move to 'next', this branch could go.
    //
    // Slash commands are excluded from mid-turn drain — they must go through
    // processSlashCommand after the turn ends (via useQueueProcessor), not be
    // sent to the model as text. Bash-mode commands are already excluded by
    // INLINE_NOTIFICATION_MODES in getQueuedCommandAttachments.
    //
    // Agent scoping: the queue is a process-global singleton shared by the
    // coordinator and all in-process subagents. Each loop drains only what's
    // addressed to it — main thread drains agentId===undefined, subagents
    // drain their own agentId. User prompts (mode:'prompt') still go to main
    // only; subagents never see the prompt stream.
    // eslint-disable-next-line custom-rules/require-tool-match-name -- ToolUseBlock.name has no aliases
    const sleepRan = toolUseBlocks.some(b => b.name === SLEEP_TOOL_NAME)
    const isMainThread =
      querySource.startsWith('repl_main_thread') || querySource === 'sdk'
    const currentAgentId = toolUseContext.agentId
    const attachmentQueueSnapshot287 = getCommandsByMaxPriority(
      sleepRan ? 'later' : 'next',
    ).filter(cmd => {
      if (isSlashCommand(cmd)) return false
      if (isMainThread) {const session=getExecutionSession287();return cmd.agentId === undefined||cmd.agentId===session.identity.mainAgentId(session.id)}
      // Subagents only drain task-notifications addressed to them — never
      // user prompts, even if someone stamps an agentId on one.
      return (cmd.mode === 'task-notification'||cmd.mode === 'poll-event') && cmd.agentId === currentAgentId
    })

    const pollChunk287=selectPollEventChunk287(attachmentQueueSnapshot287.filter(cmd=>cmd.mode==='poll-event'))
    const queuedCommandsSnapshot=attachmentQueueSnapshot287.filter(cmd=>cmd.mode!=='poll-event'||pollChunk287.includes(cmd))
    let pollCarrierCollected287=false
    for await (const attachment of getAttachmentMessages(
      null,
      updatedToolUseContext,
      null,
      queuedCommandsSnapshot,
      [...messagesForQuery, ...assistantMessages, ...toolResults],
      querySource,
    )) {
      if(attachment.attachment.type==='poll_events')pollCarrierCollected287=true
      yield attachment
      toolResults.push(attachment)
    }

    // Memory prefetch consume: only if settled and not already consumed on
    // an earlier iteration. If not settled yet, skip (zero-wait) and retry
    // next iteration — the prefetch gets as many chances as there are loop
    // iterations before the turn ends. readFileState (cumulative across
    // iterations) filters out memories the model already Read/Wrote/Edited
    // — including in earlier iterations, which the per-iteration
    // toolUseBlocks array would miss.
    if (
      pendingMemoryPrefetch &&
      pendingMemoryPrefetch.settledAt !== null &&
      pendingMemoryPrefetch.consumedOnIteration === -1
    ) {
      const memoryAttachments = filterDuplicateMemoryAttachments(
        await pendingMemoryPrefetch.promise,
        toolUseContext.readFileState,
        pendingMemoryPrefetch.earlierReadsMayBeCleared,
      )
      for (const memAttachment of memoryAttachments) {
        const msg = createAttachmentMessage(memAttachment)
        yield msg
        toolResults.push(msg)
      }
      pendingMemoryPrefetch.consumedOnIteration = turnCount - 1
    }


    // Inject prefetched skill discovery. collectSkillDiscoveryPrefetch emits
    // hidden_by_main_turn — true when the prefetch resolved before this point
    // (should be >98% at AKI@250ms / Haiku@573ms vs turn durations of 2-30s).
    if (skillPrefetch && pendingSkillPrefetch) {
      const skillAttachments =
        await skillPrefetch.collectSkillDiscoveryPrefetch(pendingSkillPrefetch)
      for (const att of skillAttachments) {
        const msg = createAttachmentMessage(att)
        yield msg
        toolResults.push(msg)
      }
    }

    // Remove only commands that were actually consumed as attachments.
    // Prompt and task-notification commands are converted to attachments above.
    const consumedCommands = queuedCommandsSnapshot.filter(
      cmd => cmd.mode === 'prompt' || cmd.mode === 'task-notification'||(cmd.mode==='poll-event'&&pollCarrierCollected287&&!toolUseContext.abortController.signal.aborted),
    )
    if (consumedCommands.length > 0) {
      for (const cmd of consumedCommands) {
        if (cmd.uuid) {
          consumedCommandUuids.push(cmd.uuid)
          notifyCommandLifecycle(cmd.uuid, 'started')
        }
      }
      removeFromQueue(consumedCommands)
      settleDeliveredPollEvents287(consumedCommands)
    }

    // Instrumentation: Track file change attachments after they're added
    const fileChangeAttachmentCount = count(
      toolResults,
      tr =>
        tr.type === 'attachment' && tr.attachment.type === 'edited_text_file',
    )

    logEvent('tengu_query_after_attachments', {
      totalToolResultsCount: toolResults.length,
      fileChangeAttachmentCount,
      queryChainId: queryChainIdForAnalytics,
      queryDepth: queryTracking.depth,
    })

    // Refresh tools between turns so newly-connected MCP servers become available
    if (updatedToolUseContext.options.refreshTools) {
      const refreshedTools = updatedToolUseContext.options.refreshTools()
      if (refreshedTools !== updatedToolUseContext.options.tools) {
        updatedToolUseContext = {
          ...updatedToolUseContext,
          options: {
            ...updatedToolUseContext.options,
            tools: refreshedTools,
          },
        }
      }
    }

    const toolUseContextWithQueryTracking = {
      ...updatedToolUseContext,
      queryTracking,
    }

    // Each time we have tool results and are about to recurse, that's a turn
    const nextTurnCount = turnCount + 1

    // Periodic task summary for `claude ps` — fires mid-turn so a
    // long-running agent still refreshes what it's working on. Gated
    // only on !agentId so every top-level conversation (REPL, SDK, HFI,
    // remote) generates summaries; subagents/forks don't.

    // Check if we've reached the max turns limit
    if (maxTurns && nextTurnCount > maxTurns) {
      yield createAttachmentMessage({
        type: 'max_turns_reached',
        maxTurns,
        turnCount: nextTurnCount,
      })
      return { reason: 'max_turns', turnCount: nextTurnCount }
    }

    queryCheckpoint('query_recursive_call')
    const next: State = {
      messages: [...messagesForQuery, ...assistantMessages, ...toolResults],
      toolUseContext: toolUseContextWithQueryTracking,
      autoCompactTracking: tracking,
      turnCount: nextTurnCount,
      maxOutputTokensRecoveryCount: 0,
      hasAttemptedReactiveCompact: false,
      pendingToolUseSummary: nextPendingToolUseSummary,
      maxOutputTokensOverride: undefined,
      stopHookActive,
      transition: { reason: 'next_turn' },
      prevToolDurations:turnOwner287.toolDurations.length>0?[...turnOwner287.toolDurations]:undefined,
    }
    state = next
  } // while (true)
}
