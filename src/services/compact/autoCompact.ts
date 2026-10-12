import { isOfficialAutoCompactEnabled } from './gates.js'
import { getClearSourceModule287 } from '../../commands/clear/lifecycle287.js'
import { feature } from 'bun:bundle'
import { markPostCompaction } from 'src/bootstrap/state.js'
import { getSdkBetas } from '../../bootstrap/state.js'
import type { QuerySource } from '../../constants/querySource.js'
import type { ToolUseContext } from '../../Tool.js'
import type { Message } from '../../types/message.js'
import { getContextWindowForModel } from '../../utils/context.js'
import { getInitialSettings } from '../../utils/settings/settings.js'
import { logForDebugging } from '../../utils/debug.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import type { CacheSafeParams } from '../../utils/forkedAgent.js'
import { tokenCountWithEstimation } from '../../utils/tokens.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import { getMaxOutputTokensForModel } from '../api/claude.js'
import { notifyCompaction } from '../api/promptCacheBreakDetection.js'
import { setLastSummarizedMessageId } from '../SessionMemory/sessionMemoryUtils.js'
import {
  type CompactionResult,
  type RecompactionInfo,
} from './compact.js'
import { runPostCompactCleanup } from './postCompactCleanup.js'
import { trySessionMemoryCompaction } from './sessionMemoryCompact.js'

/** Same whole original xHt used by /autocompact; no second parser. */
export function parseAutoCompactWindow(
  value: string,
): number | 'auto' | undefined {
  const {getOriginalModsLifecycle287}=require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')
  const source = getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js')
  return (source.xHt as (value:string)=>number|'auto'|undefined)(value)
}

export type AutoCompactWindow = {
  window: number
  configured: number
  source: 'env' | 'settings' | 'clientdata' | 'experiment' | 'model-default' | 'unknown-model' | 'auto'
}
/** Same original Vu/wE owner used by the command and automatic dispatcher.
 * Retain the existing local model/window facts, as in precompute/autoCompact.
 */
export function resolveAutoCompactWindow(model: string, override = getInitialSettings().autoCompactWindow): AutoCompactWindow {
  const source = getClearSourceModule287('chunk-mphp7acd.js')
  const betas = getSdkBetas()
  const facts = {
    ...(source.Vu as (model:string,betas:ReturnType<typeof getSdkBetas>)=>Record<string,unknown>)(model,betas),
    contextWindow:getContextWindowForModel(model,betas),
  }
  return (source.wE as (facts:Record<string,unknown>,override:number|undefined,betas:ReturnType<typeof getSdkBetas>)=>AutoCompactWindow)(facts,override,betas)
}

// Returns the selected context window minus the max output tokens for the model.
export function getEffectiveContextWindowSize(model: string): number {
  const source=getClearSourceModule287('chunk-mphp7acd.js')
  return (source.YV as (facts:Record<string,unknown>,window:number|undefined)=>number)(getCompactModelFacts287(model),getInitialSettings().autoCompactWindow)
}

export function getCompactModelFacts287(model:string):Record<string,unknown> {
  const source=getClearSourceModule287('chunk-mphp7acd.js')
  return {...(source.Vu as (model:string,betas:ReturnType<typeof getSdkBetas>)=>Record<string,unknown>)(model,getSdkBetas()),
    contextWindow:getContextWindowForModel(model,getSdkBetas()),maxOutputTokens:getMaxOutputTokensForModel(model)}
}

export type AutoCompactTrackingState = {
  compacted: boolean
  turnCounter: number
  // Unique ID per turn
  turnId: string
  // Consecutive autocompact failures. Reset on success.
  // Used as a circuit breaker to stop retrying when the context is
  // irrecoverably over the limit (e.g., prompt_too_long).
  consecutiveFailures?: number
  consecutiveRapidRefills?: number
}

export const AUTOCOMPACT_BUFFER_TOKENS = 13_000
export const WARNING_THRESHOLD_BUFFER_TOKENS = 20_000
export const ERROR_THRESHOLD_BUFFER_TOKENS = 20_000
export const MANUAL_COMPACT_BUFFER_TOKENS = 3_000

// Stop trying autocompact after this many consecutive failures.
// BQ 2026-03-10: 1,279 sessions had 50+ consecutive failures (up to 3,272)
// in a single session, wasting ~250K API calls/day globally.
const MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3

export function getAutoCompactThreshold(model: string): number {
  const source=getClearSourceModule287('chunk-mphp7acd.js')
  return (source.VNe as (facts:Record<string,unknown>,window:number|undefined)=>number)(getCompactModelFacts287(model),getInitialSettings().autoCompactWindow)
}

export type TokenWarningState287 = {level:'ok'} | {level:'warn'|'compact'|'blocked';pctLeft:number}

export function calculateTokenWarningState(
  tokenUsage: number,
  model: string,
  window=getInitialSettings().autoCompactWindow,
  remote?:import('../../state/AppStateStore.js').AppState['remoteAutocompactState'],
): TokenWarningState287 {
  const source=getClearSourceModule287('chunk-mphp7acd.js')
  return (source.ice as (usage:number,facts:Record<string,unknown>,window:number|undefined,remote?:import('../../state/AppStateStore.js').AppState['remoteAutocompactState'])=>TokenWarningState287)(tokenUsage,getCompactModelFacts287(model),window,remote)
}

export function isAutoCompactEnabled(): boolean {
  return isOfficialAutoCompactEnabled()
}

export async function shouldAutoCompact(
  messages: Message[],
  model: string,
  querySource?: QuerySource,
  // Snip removes messages but the surviving assistant's usage still reflects
  // pre-snip context, so tokenCountWithEstimation can't see the savings.
  // Subtract the rough-delta that snip already computed.
  snipTokensFreed = 0,
): Promise<boolean> {
  // Recursion guards. session_memory and compact are forked agents that
  // would deadlock.
  if (querySource === 'session_memory' || querySource === 'compact') {
    return false
  }
  // marble_origami is the ctx-agent — if ITS context blows up and
  // autocompact fires, runPostCompactCleanup calls resetContextCollapse()
  // which destroys the MAIN thread's committed log (module-level state
  // shared across forks). Inside feature() so the string DCEs from
  // external builds (it's in excluded-strings.txt).


  if (!isAutoCompactEnabled()) {
    return false
  }

  // Reactive-only mode: suppress proactive autocompact, let reactive compact
  // catch the API's prompt-too-long. feature() wrapper keeps the flag string
  // out of external builds (REACTIVE_COMPACT is ant-only).
  // Note: returning false here also means autoCompactIfNeeded never reaches
  // trySessionMemoryCompaction in the query loop — the /compact call site
  // still tries session memory first. Revisit if reactive-only graduates.
  if (feature('REACTIVE_COMPACT')) {
    if (getFeatureValue_CACHED_MAY_BE_STALE('tengu_cobalt_raccoon', false)) {
      return false
    }
  }

  // Context-collapse mode: same suppression. Collapse IS the context
  // management system when it's on — the 90% commit / 95% blocking-spawn
  // flow owns the headroom problem. Autocompact firing at effective-13k
  // (~93% of effective) sits right between collapse's commit-start (90%)
  // and blocking (95%), so it would race collapse and usually win, nuking
  // granular context that collapse was about to save. Gating here rather
  // than in isAutoCompactEnabled() keeps reactiveCompact alive as the 413
  // fallback (it consults isAutoCompactEnabled directly) and leaves
  // sessionMemory + manual /compact working.
  //
  // Consult isContextCollapseEnabled (not the raw gate) so the
  // CLAUDE_CONTEXT_COLLAPSE env override is honored here too. require()
  // inside the block breaks the init-time cycle (this file exports
  // getEffectiveContextWindowSize which collapse's index imports).


  const tokenCount = tokenCountWithEstimation(messages) - snipTokensFreed
  const threshold = getAutoCompactThreshold(model)
  const effectiveWindow = getEffectiveContextWindowSize(model)

  logForDebugging(
    `autocompact: tokens=${tokenCount} threshold=${threshold} effectiveWindow=${effectiveWindow}${snipTokensFreed > 0 ? ` snipFreed=${snipTokensFreed}` : ''}`,
  )

  const warning = calculateTokenWarningState(
    tokenCount,
    model,
  )

  return warning.level === 'compact' || warning.level === 'blocked'
}

export async function autoCompactIfNeeded(
  messages: Message[],
  toolUseContext: ToolUseContext,
  cacheSafeParams: CacheSafeParams,
  querySource?: QuerySource,
  tracking?: AutoCompactTrackingState,
  snipTokensFreed?: number,
): Promise<{
  wasCompacted: boolean
  kind?:string
  compactionResult?: CompactionResult
  consecutiveFailures?: number
  consecutiveRapidRefills?: number
}> {
  if (isEnvTruthy(process.env.DISABLE_COMPACT)) {
    return { wasCompacted: false }
  }

  // Circuit breaker: stop retrying after N consecutive failures.
  // Without this, sessions where context is irrecoverably over the limit
  // hammer the API with doomed compaction attempts on every turn.
  if (
    tracking?.consecutiveFailures !== undefined &&
    tracking.consecutiveFailures >= MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES
  ) {
    return { wasCompacted: false }
  }

  const model = toolUseContext.options.mainLoopModel
  const shouldCompact = await shouldAutoCompact(
    messages,
    model,
    querySource,
    snipTokensFreed,
  )

  // The legacy estimate gates only the retained session-memory C. Original
  // NIr/$vo below owns normal eligibility, including the per-context window.

  const recompactionInfo: RecompactionInfo = {
    isRecompactionInChain: tracking?.compacted === true,
    turnsSincePreviousCompact: tracking?.turnCounter ?? -1,
    previousCompactTurnId: tracking?.turnId,
    autoCompactThreshold: getAutoCompactThreshold(model),
    querySource,
  }

  // EXPERIMENT: Try session memory compaction first
  const sessionMemoryResult = shouldCompact ? await trySessionMemoryCompaction(
    messages,
    toolUseContext.agentId,
    recompactionInfo.autoCompactThreshold,
  ) : undefined
  if (sessionMemoryResult) {
    // Reset lastSummarizedMessageId since session memory compaction prunes messages
    // and the old message UUID will no longer exist after the REPL replaces messages
    setLastSummarizedMessageId(undefined)
    runPostCompactCleanup(querySource)
    // Reset cache read baseline so the post-compact drop isn't flagged as a
    // break. compactConversation does this internally; SM-compact doesn't.
    // BQ 2026-03-01: missing this made 20% of tengu_prompt_cache_break events
    // false positives (systemPromptChanged=true, timeSinceLastAssistantMsg=-1).
    if (feature('PROMPT_CACHE_BREAK_DETECTION')) {
      notifyCompaction(querySource ?? 'compact', toolUseContext.agentId)
    }
    markPostCompaction()
    return {
      wasCompacted: true,
      compactionResult: sessionMemoryResult,
    }
  }

  // Complete287 NIr now owns the actual automatic dispatcher and its original
  // threshold/rapid-refill/hook/failure contract. Session-memory C above retains
  // precedence; current source/window C and the per-root cancellation lease stay.
  const {dispatchAutomaticCompact287}=await import('./reactiveDispatcher287.js')
  const {getClearSourceModule287}=await import('../../commands/clear/lifecycle287.js')
  const {consumeAutomaticPrecompute}=await import('./precompute.js')
  const source=getClearSourceModule287('chunk-mphp7acd.js')
  const facts={...(source.Vu as (model:string,betas:string[])=>Record<string,unknown>)(model,getSdkBetas()),
    contextWindow:getContextWindowForModel(model,getSdkBetas()),maxOutputTokens:getMaxOutputTokensForModel(model)}
  const outcome=await dispatchAutomaticCompact287(messages,toolUseContext,facts,cacheSafeParams,querySource,tracking,snipTokensFreed,
    async input=>{const p=input as {toolUseContext:ToolUseContext;messages:Message[];querySource:string;trigger:'ptl'|'threshold'} & import('./precompute.js').AutomaticPrecomputeCaller287
      return consumeAutomaticPrecompute(p.toolUseContext,p.messages,p.querySource,false,false,p.trigger,p)})
  if(outcome.kind!=='compacted')return {wasCompacted:false,kind:outcome.kind,...(outcome.consecutiveFailures!==undefined?{consecutiveFailures:outcome.consecutiveFailures}:{})}
  setLastSummarizedMessageId(undefined);runPostCompactCleanup(querySource)
  return {wasCompacted:true,kind:outcome.kind,compactionResult:outcome.result,consecutiveFailures:0,consecutiveRapidRefills:outcome.consecutiveRapidRefills}
}
