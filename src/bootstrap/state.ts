import {inlineExtensionsConfig287} from '../services/context/extensionsConfig287.js'
import type {ModelSelection287,ModelSelectionAccessorRuntime287} from '../services/context/officialModelSelectionAccessors287/native.js'
import type {LaunchOptionsAccessorRuntime287} from '../services/context/officialLaunchOptionsAccessors287/native.js'
import type {LaunchOptions287} from '../tools/AgentTool/officialAgentPromptState287/native.js'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import type {ExecutionUserPresence287,CostLedgerOwner287,CostRestore287} from '../services/context/officialExecutionOwners287/native.js'
import type { BetaMessageStreamParams } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import {clearThinkingBindingStates} from './stickyBetas.js'
import type { Attributes, Meter, MetricOptions } from '@opentelemetry/api'
import type { logs } from '@opentelemetry/api-logs'
import type { LoggerProvider } from '@opentelemetry/sdk-logs'
import type { MeterProvider } from '@opentelemetry/sdk-metrics'
import type { BasicTracerProvider } from '@opentelemetry/sdk-trace-base'
import { realpathSync } from 'fs'
import sumBy from 'lodash-es/sumBy.js'
import { cwd } from 'process'
import type { HookEvent, ModelUsage } from 'src/entrypoints/agentSdkTypes.js'
import type { AgentColorName } from 'src/tools/AgentTool/agentColorManager.js'
import type { HookCallbackMatcher } from 'src/types/hooks.js'
import { normalizeOriginalCwd286 } from '../utils/officialPathNormalization286/runtime.js'
// Indirection for browser-sdk build (package.json "browser" field swaps
// crypto.ts for crypto.browser.ts). Pure leaf re-export of node:crypto —
// zero circular-dep risk. Path-alias import bypasses bootstrap-isolation
// (rule only checks ./ and / prefixes); explicit disable documents intent.
// eslint-disable-next-line custom-rules/bootstrap-isolation
import { randomUUID } from 'src/utils/crypto.js'
import type { ModelSetting } from 'src/utils/model/model.js'
import type { ModelStrings } from 'src/utils/model/modelStrings.js'
import type { SettingSource } from 'src/utils/settings/constants.js'
import { resetSettingsCache } from 'src/utils/settings/settingsCache.js'
import type { PluginHookMatcher } from 'src/utils/settings/types.js'
import { createSignal } from 'src/utils/signal.js'

// Union type for registered hooks - can be SDK callbacks or native plugin hooks
type RegisteredHookMatcher = HookCallbackMatcher | PluginHookMatcher
import type {HookRegistryAccessors287,ExecutionHookRegistry287} from '../utils/hooks/officialHooksConfiguration287/registry.js'
import type {HooksSettings} from '../utils/settings/types.js'

import type { SessionId } from 'src/types/ids.js'

// DO NOT ADD MORE STATE HERE - BE JUDICIOUS WITH GLOBAL STATE

// dev: true on entries that came via --dangerously-load-development-channels.
// The allowlist gate checks this per-entry (not the session-wide
// hasDevChannels bit) so passing both flags doesn't let the dev dialog's
// acceptance leak allowlist-bypass to the --channels entries.
export type ChannelEntry =
  | { kind: 'plugin'; name: string; marketplace: string; dev?: boolean }
  | { kind: 'server'; name: string; dev?: boolean }

export type AttributedCounter = {
  add(value: number, additionalAttributes?: Attributes): void
}

type State = {
  originalCwd: string
  // Stable project root - set once at startup (including by --worktree flag),
  // never updated by mid-session EnterWorktreeTool.
  // Use for project identity (history, skills, sessions) not file operations.
  projectRoot: string
  totalCostUSD: number
  totalAPIDuration: number
  totalAPIDurationWithoutRetries: number
  totalToolDuration: number
  turnHookDurationMs: number
  turnToolDurationMs: number
  turnClassifierDurationMs: number
  turnToolCount: number
  turnHookCount: number
  turnClassifierCount: number
  startTime: number
  lastInteractionTime: number
  totalLinesAdded: number
  totalLinesRemoved: number
  hasUnknownModelCost: boolean
  cwd: string
  modelUsage: { [modelName: string]: ModelUsage }
  mainLoopModelOverride: ModelSetting | undefined
  initialMainLoopModel: ModelSetting | undefined
  modelStrings: ModelStrings | null
  isInteractive: boolean
  forkSubagentEnabledSource?: string
  permissionPromptToolName: string | undefined
  kairosActive: boolean
  // When true, ensureToolResultPairing throws on mismatch instead of
  // repairing with synthetic placeholders. HFI opts in at startup so
  // trajectories fail fast rather than conditioning the model on fake
  // tool_results.
  strictToolResultPairing: boolean
  sdkAgentProgressSummariesEnabled: boolean
  userMsgOptIn: boolean
  clientType: string
  sessionSource: string | undefined
  questionPreviewFormat: 'markdown' | 'html' | undefined
  flagSettingsPath: string | undefined
  flagSettingsInline: Record<string, unknown> | null
  allowedSettingSources: SettingSource[]
  // Telemetry state
  meter: Meter | null
  sessionCounter: AttributedCounter | null
  locCounter: AttributedCounter | null
  prCounter: AttributedCounter | null
  commitCounter: AttributedCounter | null
  costCounter: AttributedCounter | null
  tokenCounter: AttributedCounter | null
  codeEditToolDecisionCounter: AttributedCounter | null
  activeTimeCounter: AttributedCounter | null
  statsStore: { observe(name: string, value: number): void } | null
  sessionId: SessionId
  // Parent session ID for tracking session lineage (e.g., plan mode -> implementation)
  parentSessionId: SessionId | undefined
  // Logger state
  loggerProvider: LoggerProvider | null
  eventLogger: ReturnType<typeof logs.getLogger> | null
  // Meter provider state
  meterProvider: MeterProvider | null
  // Tracer provider state
  tracerProvider: BasicTracerProvider | null
  // Agent color state
  agentColorMap: Map<string, AgentColorName>
  agentColorIndex: number
  // Last API request for bug reports
  lastAPIRequest: Omit<BetaMessageStreamParams, 'messages'> | null
  // Messages from the last API request (ant-only; reference, not clone).
  // Captures the exact post-compaction, CLAUDE.md-injected message set sent
  // to the API so /share's serialized_conversation.json reflects reality.
  lastAPIRequestMessages: BetaMessageStreamParams['messages'] | null
  // Last auto-mode classifier request(s) for /share transcript
  lastClassifierRequests: unknown[] | null
  // CLAUDE.md content cached by context.ts for the auto-mode classifier.
  // Breaks the yoloClassifier → claudemd → filesystem → permissions cycle.
  cachedClaudeMdContent: string | null
  // In-memory error log for recent errors
  inMemoryErrorLog: Array<{ error: string; timestamp: string }>
  // Explicit --chrome / --no-chrome flag value (undefined = not set on CLI)
  chromeFlagOverride: boolean | undefined
  // Use cowork_plugins directory instead of plugins (--cowork flag or env var)
  useCoworkPlugins: boolean
  // Session-only bypass permissions mode flag (not persisted)
  sessionBypassPermissionsMode: boolean
  // Session-only flag gating the .claude/scheduled_tasks.json watcher
  // (useScheduledTasks). Set by cronScheduler.start() when the JSON has
  // entries, or by CronCreateTool. Not persisted.
  scheduledTasksEnabled: boolean
  // Session-only cron tasks created via CronCreate with durable: false.
  // Fire on schedule like file-backed tasks but are never written to
  // .claude/scheduled_tasks.json — they die with the process. Typed via
  // SessionCronTask below (not importing from cronTasks.ts keeps
  // bootstrap a leaf of the import DAG).
  sessionCronTasks: SessionCronTask[]
  // Teams created this session via TeamCreate. cleanupSessionTeams()
  // removes these on gracefulShutdown so subagent-created teams don't
  // persist on disk forever (gh-32730). TeamDelete removes entries to
  // avoid double-cleanup. Lives here (not teamHelpers.ts) so
  // resetStateForTests() clears it between tests.
  sessionCreatedTeams: Set<string>
  // Session-only trust flag for home directory (not persisted to disk)
  // When running from home dir, trust dialog is shown but not saved to disk.
  // This flag allows features requiring trust to work during the session.
  sessionTrustAccepted: boolean
  // Session-only flag to disable session persistence to disk
  sessionPersistenceDisabled: boolean
  // Track if user has exited plan mode in this session (for re-entry guidance)
  hasExitedPlanMode: boolean
  // Track if we need to show the plan mode exit attachment (one-time notification)
  needsPlanModeExitAttachment: boolean
  // Track if we need to show the auto mode exit attachment (one-time notification)
  needsAutoModeExitAttachment: boolean
  // Track if LSP plugin recommendation has been shown this session (only show once)
  lspRecommendationShownThisSession: boolean
  // SDK init event state - jsonSchema for structured output
  initJsonSchema: Record<string, unknown> | null
  // Registered hooks - SDK callbacks and plugin native hooks
  registeredHooks: Partial<Record<HookEvent, RegisteredHookMatcher[]>> | null
  // Cache for plan slugs: sessionId -> wordSlug
  planSlugCache: Map<string, string>
  // Track teleported session for reliability logging
  teleportedSessionInfo: {
    isTeleported: boolean
    hasLoggedFirstMessage: boolean
    sessionId: string | null
  } | null
  // Track invoked skills for preservation across compaction
  // Keys are composite: `${agentId ?? ''}:${skillName}` to prevent cross-agent overwrites
  invokedSkills: Map<
    string,
    {
      skillName: string
      skillPath: string
      content: string
      invokedAt: number
      agentId: string | null
    }
  >
  // Track slow operations for dev bar display (ant-only)
  slowOperations: Array<{
    operation: string
    durationMs: number
    timestamp: number
  }>
  // SDK-provided betas (e.g., context-1m-2025-08-07)
  sdkBetas: string[] | undefined
  // Main thread agent type (from --agent flag or settings)
  mainThreadAgentType: string | undefined
  mainThreadAgentHooks?: HooksSettings
  // Remote mode (--remote flag)
  isRemoteMode: boolean
  // True while an inbound-capable REPL bridge handle is attached.
  replBridgeActive: boolean
  // Direct connect server URL (for display in header)
  directConnectServerUrl: string | undefined
  // System prompt section cache state
  systemPromptSectionEpoch: number
  systemPromptSectionCache: Map<string, string | null>
  // Last date emitted to the model (for detecting midnight date changes)
  lastEmittedDate: string | null
  // Additional directories from --add-dir flag (for CLAUDE.md loading)
  additionalDirectoriesForClaudeMd: string[]
  // Channel server allowlist from --channels flag (servers whose channel
  // notifications should register this session). Parsed once in main.tsx —
  // the tag decides trust model: 'plugin' → marketplace verification +
  // allowlist, 'server' → allowlist always fails (schema is plugin-only).
  // Either kind needs entry.dev to bypass allowlist.
  allowedChannels: ChannelEntry[]
  // True if any entry in allowedChannels came from
  // --dangerously-load-development-channels (so ChannelsNotice can name the
  // right flag in policy-blocked messages)
  hasDevChannels: boolean
  // Dir containing the session's `.jsonl`; null = derive from originalCwd.
  sessionProjectDir: string | null
  // Cached prompt cache 1h TTL allowlist from GrowthBook (session-stable)
  // Cached 1h TTL user eligibility (session-stable). Latched on first
  // evaluation so mid-session overage flips don't change the cache_control
  // TTL, which would bust the server-side prompt cache.
  promptCache1hEligible: boolean | null
  // Sticky-on latch for AFK_MODE_BETA_HEADER. Once auto mode is first
  // activated, keep sending the header for the rest of the session so
  // Shift+Tab toggles don't bust the ~50-70K token prompt cache.
  afkModeHeaderLatched: boolean | null
  // Sticky-on latch for FAST_MODE_BETA_HEADER. Once fast mode is first
  // enabled, keep sending the header so cooldown enter/exit doesn't
  // double-bust the prompt cache. The `speed` body param stays dynamic.
  fastModeHeaderLatched: boolean | null
  // Sticky-on latch for the cache-editing beta header. Once cached
  // microcompact is first enabled, keep sending the header so mid-session
  // GrowthBook/settings toggles don't bust the prompt cache.
  cacheEditingHeaderLatched: boolean | null
  // Sticky-off latch for the cache-diagnosis beta when a server rejects it.
  cacheDiagnosisHeaderRefused: boolean
  // Process/session latch for thinking-resumption after a beta rejection.
  thinkingResumptionHeaderRefused: boolean
  // Sticky-on latch for clearing thinking from prior tool loops. Triggered
  // when >1h since last API call (confirmed cache miss — no cache-hit
  // benefit to keeping thinking). Once latched, stays on so the newly-warmed
  // thinking-cleared cache isn't busted by flipping back to keep:'all'.
  thinkingClearLatched: boolean | null
  // Current prompt ID (UUID) correlating a user prompt with subsequent OTel events
  promptId: string | null
  // Last API requestId for the main conversation chain (not subagents).
  // Updated after each successful API response for main-session queries.
  // Read at shutdown to send cache eviction hints to inference.
  lastMainRequestId: string | undefined
  // Timestamp (Date.now()) of the last successful API call completion.
  // Used to compute timeSinceLastApiCallMs in tengu_api_success for
  // correlating cache misses with idle time (cache TTL is ~5min).
  lastApiCompletionTimestamp: number | null
  // Set to true after compaction (auto or manual /compact). Consumed by
  // logAPISuccess to tag the first post-compaction API call so we can
  // distinguish compaction-induced cache misses from TTL expiry.
  pendingPostCompaction: boolean
}

// ALSO HERE - THINK THRICE BEFORE MODIFYING
function getInitialState(): State {
  // Resolve symlinks in cwd to match behavior of shell.ts setCwd
  // This ensures consistency with how paths are sanitized for session storage
  let resolvedCwd = ''
  if (
    typeof process !== 'undefined' &&
    typeof process.cwd === 'function' &&
    typeof realpathSync === 'function'
  ) {
    const rawCwd = cwd()
    try {
      resolvedCwd = normalizeOriginalCwd286(realpathSync(rawCwd))
    } catch {
      // File Provider EPERM on CloudStorage mounts (lstat per path component).
      resolvedCwd = normalizeOriginalCwd286(rawCwd)
    }
  }
  const state: State = {
    originalCwd: resolvedCwd,
    projectRoot: resolvedCwd,
    totalCostUSD: 0,
    totalAPIDuration: 0,
    totalAPIDurationWithoutRetries: 0,
    totalToolDuration: 0,
    turnHookDurationMs: 0,
    turnToolDurationMs: 0,
    turnClassifierDurationMs: 0,
    turnToolCount: 0,
    turnHookCount: 0,
    turnClassifierCount: 0,
    startTime: Date.now(),
    lastInteractionTime: Date.now(),
    totalLinesAdded: 0,
    totalLinesRemoved: 0,
    hasUnknownModelCost: false,
    cwd: resolvedCwd,
    modelUsage: {},
    mainLoopModelOverride: undefined,
    initialMainLoopModel: undefined,
    modelStrings: null,
    isInteractive: false,
    forkSubagentEnabledSource: undefined,
    permissionPromptToolName: undefined,
    kairosActive: false,
    strictToolResultPairing: false,
    sdkAgentProgressSummariesEnabled: false,
    userMsgOptIn: false,
    clientType: 'cli',
    sessionSource: undefined,
    questionPreviewFormat: undefined,
    flagSettingsPath: undefined,
    flagSettingsInline: null,
    allowedSettingSources: [
      'userSettings',
      'projectSettings',
      'localSettings',
      'flagSettings',
      'policySettings',
    ],
    // Telemetry state
    meter: null,
    sessionCounter: null,
    locCounter: null,
    prCounter: null,
    commitCounter: null,
    costCounter: null,
    tokenCounter: null,
    codeEditToolDecisionCounter: null,
    activeTimeCounter: null,
    statsStore: null,
    sessionId: randomUUID() as SessionId,
    parentSessionId: undefined,
    // Logger state
    loggerProvider: null,
    eventLogger: null,
    // Meter provider state
    meterProvider: null,
    tracerProvider: null,
    // Agent color state
    agentColorMap: new Map(),
    agentColorIndex: 0,
    // Last API request for bug reports
    lastAPIRequest: null,
    lastAPIRequestMessages: null,
    // Last auto-mode classifier request(s) for /share transcript
    lastClassifierRequests: null,
    cachedClaudeMdContent: null,
    // In-memory error log for recent errors
    inMemoryErrorLog: [],
    // Explicit --chrome / --no-chrome flag value (undefined = not set on CLI)
    chromeFlagOverride: undefined,
    // Use cowork_plugins directory instead of plugins
    useCoworkPlugins: false,
    // Session-only bypass permissions mode flag (not persisted)
    sessionBypassPermissionsMode: false,
    // Scheduled tasks disabled until flag or dialog enables them
    scheduledTasksEnabled: false,
    sessionCronTasks: [],
    sessionCreatedTeams: new Set(),
    // Session-only trust flag (not persisted to disk)
    sessionTrustAccepted: false,
    // Session-only flag to disable session persistence to disk
    sessionPersistenceDisabled: false,
    // Track if user has exited plan mode in this session
    hasExitedPlanMode: false,
    // Track if we need to show the plan mode exit attachment
    needsPlanModeExitAttachment: false,
    // Track if we need to show the auto mode exit attachment
    needsAutoModeExitAttachment: false,
    // Track if LSP plugin recommendation has been shown this session
    lspRecommendationShownThisSession: false,
    // SDK init event state
    initJsonSchema: null,
    registeredHooks: null,
    // Cache for plan slugs
    planSlugCache: new Map(),
    // Track teleported session for reliability logging
    teleportedSessionInfo: null,
    // Track invoked skills for preservation across compaction
    invokedSkills: new Map(),
    // Track slow operations for dev bar display
    slowOperations: [],
    // SDK-provided betas
    sdkBetas: undefined,
    // Main thread agent type
    mainThreadAgentType: undefined,
    // Remote mode
    isRemoteMode: false,
    replBridgeActive: false,
    // Direct connect server URL
    directConnectServerUrl: undefined,
    // System prompt section cache state
    systemPromptSectionEpoch: 0,
    systemPromptSectionCache: new Map(),
    // Last date emitted to the model
    lastEmittedDate: null,
    // Additional directories from --add-dir flag (for CLAUDE.md loading)
    additionalDirectoriesForClaudeMd: [],
    // Channel server allowlist from --channels flag
    allowedChannels: [],
    hasDevChannels: false,
    // Session project dir (null = derive from originalCwd)
    sessionProjectDir: null,
    // Prompt cache 1h allowlist (null = not yet fetched from GrowthBook)
    // Prompt cache 1h eligibility (null = not yet evaluated)
    promptCache1hEligible: null,
    // Beta header latches (null = not yet triggered)
    afkModeHeaderLatched: null,
    fastModeHeaderLatched: null,
    cacheEditingHeaderLatched: null,
    cacheDiagnosisHeaderRefused: false,
    thinkingResumptionHeaderRefused: false,
    thinkingClearLatched: null,
    // Current prompt ID
    promptId: null,
    lastMainRequestId: undefined,
    lastApiCompletionTimestamp: null,
    pendingPostCompaction: false,
  }

  return state
}

// AND ESPECIALLY HERE
const STATE: State = getInitialState()

export function getSessionId(): SessionId {
  return executionIdentityOwner287 ? executionIdentityOwner287.id() as SessionId : STATE.sessionId
}

export function regenerateSessionId(
  options: { setCurrentAsParent?: boolean } = {},
): SessionId {
  if (executionIdentityOwner287) {
    const outgoingId = getSessionId()
    STATE.planSlugCache.delete(outgoingId)
    const id = executionIdentityOwner287.clear(options) as SessionId
    mirrorExecutionIdentity287()
    return id
  }
  if (options.setCurrentAsParent) {
    STATE.parentSessionId = STATE.sessionId
  }
  // Drop the outgoing session's plan-slug entry so the Map doesn't
  // accumulate stale keys. Callers that need to carry the slug across
  // (REPL.tsx clearContext) read it before calling clearConversation.
  STATE.planSlugCache.delete(STATE.sessionId)
  // Regenerated sessions live in the current project: reset projectDir to
  // null so getTranscriptPath() derives from originalCwd.
  STATE.sessionId = randomUUID() as SessionId
  STATE.sessionProjectDir = null
  sessionSwitched.emit(STATE.sessionId, 'clear')
  return STATE.sessionId
}

export function getParentSessionId(): SessionId | undefined {
  return executionIdentityOwner287 ? executionIdentityOwner287.parentId() as SessionId | undefined : STATE.parentSessionId
}

export type SessionSwitchReason =
  | 'clear' | 'resume' | 'spare_claim' | 'remote_attach'
  | 'cd' | 'hydrate' | 'fork' | 'startup_custom_id'

/**
 * Atomically switch the active session. `sessionId` and `sessionProjectDir`
 * always change together — there is no separate setter for either, so they
 * cannot drift out of sync (CC-34).
 *
 * @param projectDir — directory containing `<sessionId>.jsonl`. Omit (or
 *   pass `null`) for sessions in the current project — the path will derive
 *   from originalCwd at read time. Pass `dirname(transcriptPath)` when the
 *   session lives in a different project directory (git worktrees,
 *   cross-project resume). Every call resets the project dir; it never
 *   carries over from the previous session.
 */
export function switchSession(
  sessionId: SessionId,
  reason: SessionSwitchReason,
  projectDir: string | null = null,
  project?: {originalCwd:string;projectRoot:string;cwd:string} | null,
): void {
  if (executionIdentityOwner287) {
    if (getSessionId() !== sessionId) STATE.planSlugCache.delete(getSessionId())
    executionIdentityOwner287.switch(sessionId, reason, projectDir, project)
    mirrorExecutionIdentity287()
    return
  }
  // Native iy preserves the plan slug on same-ID cd/hydrate notifications.
  if (STATE.sessionId !== sessionId) STATE.planSlugCache.delete(STATE.sessionId)
  STATE.sessionId = sessionId
  STATE.sessionProjectDir = projectDir
  sessionSwitched.emit(sessionId, reason)
}

const sessionSwitched = createSignal<[id: SessionId, reason: SessionSwitchReason]>()

/**
 * Register a callback for every official session event, including same-ID
 * directory moves and hydration. The reason determines request-state cleanup. bootstrap can't import listeners directly (DAG leaf), so
 * callers register themselves. concurrentSessions.ts uses this to keep the
 * PID file's sessionId in sync with --resume.
 */
type BootstrapSessionSwitchListener287 = (id:SessionId,reason:SessionSwitchReason,restored?:RestoredSessionModel287) => void
type RestoredSessionModel287 = {appStateModel:string|undefined;forSessionValue:string|undefined;overrideValue:string|undefined;restoredToExplicitOverride:boolean;fallbackModel:string}
// Registrations made before the native host exists are moved to its original
// root-keyed signal once. Their returned disposer follows the same registration.
const pendingSessionSubscriptions287=new Set<{listener:BootstrapSessionSwitchListener287;dispose:()=>void}>()
export function onSessionSwitch(listener:BootstrapSessionSwitchListener287):()=>void {
  if(executionIdentityOwner287)return executionIdentityOwner287.subscribe(listener)
  const registration={listener,dispose:sessionSwitched.subscribe(listener)}
  pendingSessionSubscriptions287.add(registration)
  return ()=>{registration.dispose();pendingSessionSubscriptions287.delete(registration)}
}

/**
 * Project directory the current session's transcript lives in, or `null` if
 * the session was created in the current project (common case — derive from
 * originalCwd). See `switchSession()`.
 */
/** /cd changes the transcript home, not the conversation or its owners. */
export function relocateSessionProjectDir(projectDir: string): void {
  switchSession(getSessionId(), 'cd', projectDir)
}

export function getSessionProjectDir(): string | null {
  return executionIdentityOwner287 ? executionIdentityOwner287.projectDir() : STATE.sessionProjectDir
}

export function getOriginalCwd(): string {
  return executionIdentityOwner287 ? executionIdentityOwner287.project().originalCwd : STATE.originalCwd
}

/**
 * Get the stable project root directory.
 * Unlike getOriginalCwd(), this is never updated by mid-session EnterWorktreeTool
 * (so skills/history stay stable when entering a throwaway worktree).
 * It IS set at startup by --worktree, since that worktree is the session's project.
 * Use for project identity (history, skills, sessions) not file operations.
 */
export function getProjectRoot(): string {
  return executionIdentityOwner287 ? executionIdentityOwner287.project().projectRoot : STATE.projectRoot
}

export function setOriginalCwd(cwd: string): void {
  if (executionIdentityOwner287) executionIdentityOwner287.updateProject({originalCwd:cwd})
  STATE.originalCwd = normalizeOriginalCwd286(cwd)
}

/**
 * Only for --worktree startup flag. Mid-session EnterWorktreeTool must NOT
 * call this — skills/history should stay anchored to where the session started.
 */
export function setProjectRoot(cwd: string): void {
  if (executionIdentityOwner287) executionIdentityOwner287.updateProject({projectRoot:cwd})
  STATE.projectRoot = normalizeOriginalCwd286(cwd)
}

export function getCwdState(): string {
  return executionIdentityOwner287 ? executionIdentityOwner287.project().cwd : STATE.cwd
}

export function setCwdState(cwd: string): void {
  if (executionIdentityOwner287) executionIdentityOwner287.updateProject({cwd})
  STATE.cwd = normalizeOriginalCwd286(cwd)
}

export function getDirectConnectServerUrl(): string | undefined {
  return STATE.directConnectServerUrl
}

export function setDirectConnectServerUrl(url: string): void {
  STATE.directConnectServerUrl = url
}

// Installed by the cost entrypoint after bootstrap/native initialization.
// Retain an accessor: the existing execution root reset needs no new callback.
let costLedgerOwner287:(()=>CostLedgerOwner287)|undefined
export function installCostLedgerOwner287(
  readOwner:()=>CostLedgerOwner287,
  bootstrapRoot:CostLedgerOwner287,
):void {
  // Called once by the execution initializer with its ready root, never by a
  // first cost read in an arbitrary ALS scope. Preserve early bootstrap cost
  // without creating restored-session budget baselines or another owner.
  const ledger=bootstrapRoot.costLedger
  ledger.restoreSnapshot({
    ...ledger.snapshot(),totalCostUSD:STATE.totalCostUSD,
    totalAPIDuration:STATE.totalAPIDuration,
    totalAPIDurationWithoutRetries:STATE.totalAPIDurationWithoutRetries,
    totalToolDuration:STATE.totalToolDuration,startTime:STATE.startTime,
    totalLinesAdded:STATE.totalLinesAdded,totalLinesRemoved:STATE.totalLinesRemoved,
    hasUnknownModelCost:STATE.hasUnknownModelCost,modelUsage:STATE.modelUsage,
  })
  costLedgerOwner287=readOwner
}

export function addToTotalDurationState(
  duration: number,
  durationWithoutRetries: number,
): void {
  if (costLedgerOwner287) costLedgerOwner287().costLedger.recordApiDuration(duration,durationWithoutRetries)
  else {
    STATE.totalAPIDuration += duration
    STATE.totalAPIDurationWithoutRetries += durationWithoutRetries
  }
}

export function resetTotalDurationStateAndCost_FOR_TESTS_ONLY(): void {
  if (costLedgerOwner287) {
    costLedgerOwner287().costLedger.zeroDurationsAndCostForTests()
    return
  }
  STATE.totalAPIDuration = 0
  STATE.totalAPIDurationWithoutRetries = 0
  STATE.totalCostUSD = 0
}

export function addToTotalCostState(
  cost: number,
  modelUsage: ModelUsage,
  model: string,
): void {
  if (costLedgerOwner287) costLedgerOwner287().costLedger.recordCost(cost,modelUsage,model)
  else {
    STATE.modelUsage[model] = modelUsage
    STATE.totalCostUSD += cost
  }
}

export function getTotalCostUSD(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalCostUSD() : STATE.totalCostUSD
}

export function getTotalAPIDuration(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalAPIDuration() : STATE.totalAPIDuration
}

export function getTotalDuration(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalDuration() : Date.now() - STATE.startTime
}

export function getTotalAPIDurationWithoutRetries(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalAPIDurationWithoutRetries() : STATE.totalAPIDurationWithoutRetries
}

export function getTotalToolDuration(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalToolDuration() : STATE.totalToolDuration
}

export function addToToolDuration(duration: number): void {
  if (costLedgerOwner287) costLedgerOwner287().costLedger.recordToolDuration(duration)
  else STATE.totalToolDuration += duration
  STATE.turnToolDurationMs += duration
  STATE.turnToolCount++
}

export function getTurnHookDurationMs(): number {
  return STATE.turnHookDurationMs
}

export function addToTurnHookDuration(duration: number): void {
  STATE.turnHookDurationMs += duration
  STATE.turnHookCount++
}

export function resetTurnHookDuration(): void {
  STATE.turnHookDurationMs = 0
  STATE.turnHookCount = 0
}

export function getTurnHookCount(): number {
  return STATE.turnHookCount
}

export function getTurnToolDurationMs(): number {
  return STATE.turnToolDurationMs
}

export function resetTurnToolDuration(): void {
  STATE.turnToolDurationMs = 0
  STATE.turnToolCount = 0
}

export function getTurnToolCount(): number {
  return STATE.turnToolCount
}

export function getTurnClassifierDurationMs(): number {
  return STATE.turnClassifierDurationMs
}

export function addToTurnClassifierDuration(duration: number): void {
  STATE.turnClassifierDurationMs += duration
  STATE.turnClassifierCount++
}

export function resetTurnClassifierDuration(): void {
  STATE.turnClassifierDurationMs = 0
  STATE.turnClassifierCount = 0
}

export function getTurnClassifierCount(): number {
  return STATE.turnClassifierCount
}

export function getStatsStore(): {
  observe(name: string, value: number): void
} | null {
  return STATE.statsStore
}

export function setStatsStore(
  store: { observe(name: string, value: number): void } | null,
): void {
  STATE.statsStore = store
}

/**
 * Marks that an interaction occurred.
 *
 * By default the actual Date.now() call is deferred until the next Ink render
 * frame (via flushInteractionTime()) so we avoid calling Date.now() on every
 * single keypress.
 *
 * Pass `immediate = true` when calling from React useEffect callbacks or
 * other code that runs *after* the Ink render cycle has already flushed.
 * Without it the timestamp stays stale until the next render, which may never
 * come if the user is idle (e.g. permission dialog waiting for input).
 */
let interactionTimeDirty = false
// The original ln already owns be. After installation this port only delegates;
// the pre-execution bootstrap baseline is not a second active clock.
let readUserPresenceOwner287:(()=>ExecutionUserPresence287)|undefined
export function installUserPresenceOwner287(read:()=>ExecutionUserPresence287):void {
  readUserPresenceOwner287=read
  interactionTimeDirty=false
}

export function updateLastInteractionTime(immediate?: boolean): void {
  if(readUserPresenceOwner287)return readUserPresenceOwner287().recordInteraction(immediate)
  if (immediate) {
    flushInteractionTime_inner()
  } else {
    interactionTimeDirty = true
  }
}

/**
 * If an interaction was recorded since the last flush, update the timestamp
 * now. Called by Ink before each render cycle so we batch many keypresses into
 * a single Date.now() call.
 */
export function flushInteractionTime(): void {
  if(readUserPresenceOwner287)return readUserPresenceOwner287().flushIfDirty()
  if (interactionTimeDirty) {
    flushInteractionTime_inner()
  }
}

function flushInteractionTime_inner(): void {
  STATE.lastInteractionTime = Date.now()
  interactionTimeDirty = false
}

export function addToTotalLinesChanged(added: number, removed: number): void {
  if (costLedgerOwner287) costLedgerOwner287().costLedger.recordLinesChanged(added,removed)
  else {
    STATE.totalLinesAdded += added
    STATE.totalLinesRemoved += removed
  }
}

export function getTotalLinesAdded(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalLinesAdded() : STATE.totalLinesAdded
}

export function getTotalLinesRemoved(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalLinesRemoved() : STATE.totalLinesRemoved
}

export function getTotalInputTokens(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalInputTokens() : sumBy(Object.values(STATE.modelUsage), 'inputTokens')
}

export function getTotalOutputTokens(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalOutputTokens() : sumBy(Object.values(STATE.modelUsage), 'outputTokens')
}

export function getTotalCacheReadInputTokens(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalCacheReadInputTokens() : sumBy(Object.values(STATE.modelUsage), 'cacheReadInputTokens')
}

export function getTotalCacheCreationInputTokens(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalCacheCreationInputTokens() : sumBy(Object.values(STATE.modelUsage), 'cacheCreationInputTokens')
}

export function getTotalWebSearchRequests(): number {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.totalWebSearchRequests() : sumBy(Object.values(STATE.modelUsage), 'webSearchRequests')
}

let outputTokensAtTurnStart = 0
let currentTurnTokenBudget: number | null = null
export function getTurnOutputTokens(): number {
  return getTotalOutputTokens() - outputTokensAtTurnStart
}
export function getCurrentTurnTokenBudget(): number | null {
  return currentTurnTokenBudget
}
let budgetContinuationCount = 0
export function snapshotOutputTokensForTurn(budget: number | null): void {
  outputTokensAtTurnStart = getTotalOutputTokens()
  currentTurnTokenBudget = budget
  budgetContinuationCount = 0
}
export function getBudgetContinuationCount(): number {
  return budgetContinuationCount
}
export function incrementBudgetContinuationCount(): void {
  budgetContinuationCount++
}

export function setHasUnknownModelCost(): void {
  if (costLedgerOwner287) costLedgerOwner287().costLedger.markUnknownModelCost()
  else STATE.hasUnknownModelCost = true
}

export function hasUnknownModelCost(): boolean {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.hasUnknownModelCost() : STATE.hasUnknownModelCost
}

export function getLastMainRequestId(): string | undefined {
  return executionIdentityOwner287 ? executionIdentityOwner287.journal().lastMainRequestId() : STATE.lastMainRequestId
}

export function setLastMainRequestId(requestId: string): void {
  if (executionIdentityOwner287) executionIdentityOwner287.journal().replaceLastMainRequestId(requestId)
  STATE.lastMainRequestId = requestId
}

export function getLastApiCompletionTimestamp(): number | null {
  return executionIdentityOwner287 ? executionIdentityOwner287.journal().lastApiCompletionTimestamp() : STATE.lastApiCompletionTimestamp
}

export function setLastApiCompletionTimestamp(timestamp: number): void {
  if (executionIdentityOwner287) executionIdentityOwner287.journal().replaceLastApiCompletionTimestamp(timestamp)
  STATE.lastApiCompletionTimestamp = timestamp
}

/** Mark that a compaction just occurred. The next API success event will
 *  include isPostCompaction=true, then the flag auto-resets. */
export function markPostCompaction(): void {
  if (executionIdentityOwner287) executionIdentityOwner287.journal().replacePendingPostCompaction(true)
  STATE.pendingPostCompaction = true
}

/** Consume the post-compaction flag. Returns true once after compaction,
 *  then returns false until the next compaction. */
export function consumePostCompaction(): boolean {
  if (executionIdentityOwner287) {
    const journal = executionIdentityOwner287.journal()
    const was = journal.pendingPostCompaction()
    journal.replacePendingPostCompaction(false)
    STATE.pendingPostCompaction = false
    return was
  }
  const was = STATE.pendingPostCompaction
  STATE.pendingPostCompaction = false
  return was
}

export function getLastInteractionTime(): number {
  if(readUserPresenceOwner287)return readUserPresenceOwner287().lastInteractionTime()
  return STATE.lastInteractionTime
}

// Scroll drain suspension — background intervals check this before doing work
// so they don't compete with scroll frames for the event loop. Set by
// ScrollBox scrollBy/scrollTo, cleared SCROLL_DRAIN_IDLE_MS after the last
// scroll event. Module-scope (not in STATE) — ephemeral hot-path flag, no
// test-reset needed since the debounce timer self-clears.
let scrollDraining = false
let scrollDrainTimer: ReturnType<typeof setTimeout> | undefined
const SCROLL_DRAIN_IDLE_MS = 150

/** Mark that a scroll event just happened. Background intervals gate on
 *  getIsScrollDraining() and skip their work until the debounce clears. */
export function markScrollActivity(): void {
  scrollDraining = true
  if (scrollDrainTimer) clearTimeout(scrollDrainTimer)
  scrollDrainTimer = setTimeout(() => {
    scrollDraining = false
    scrollDrainTimer = undefined
  }, SCROLL_DRAIN_IDLE_MS)
  scrollDrainTimer.unref?.()
}

/** True while scroll is actively draining (within 150ms of last event).
 *  Intervals should early-return when this is set — the work picks up next
 *  tick after scroll settles. */
export function getIsScrollDraining(): boolean {
  return scrollDraining
}

/** Await this before expensive one-shot work (network, subprocess) that could
 *  coincide with scroll. Resolves immediately if not scrolling; otherwise
 *  polls at the idle interval until the flag clears. */
export async function waitForScrollIdle(): Promise<void> {
  while (scrollDraining) {
    // bootstrap-isolation forbids importing sleep() from src/utils/
    // eslint-disable-next-line no-restricted-syntax
    await new Promise(r => setTimeout(r, SCROLL_DRAIN_IDLE_MS).unref?.())
  }
}

export function getModelUsage(): { [modelName: string]: ModelUsage } {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.modelUsage() : STATE.modelUsage
}

export function getUsageForModel(model: string): ModelUsage | undefined {
  return costLedgerOwner287 ? costLedgerOwner287().costLedger.usageForModel(model) : STATE.modelUsage[model]
}

/**
 * Gets the model override set from the --model CLI flag or after the user
 * updates their configured model.
 */
export function getMainLoopModelOverride(): ModelSetting | undefined {
  return modelSelectionAccessors287 ? modelSelectionAccessors287.getMainLoopModelOverride() : STATE.mainLoopModelOverride
}

export function getInitialMainLoopModel(): ModelSetting | undefined {
  return modelSelectionAccessors287 ? modelSelectionAccessors287.getInitialMainLoopModel() : STATE.initialMainLoopModel
}

export function setMainLoopModelOverride(
  model: ModelSetting | undefined,
): void {
  if (modelSelectionAccessors287) modelSelectionAccessors287.setMainLoopModelOverride(model)
  else STATE.mainLoopModelOverride = model
}

export function setInitialMainLoopModel(model: ModelSetting | undefined): void {
  if (modelSelectionAccessors287) modelSelectionAccessors287.setInitialMainLoopModel(model)
  else STATE.initialMainLoopModel = model
}

export function getSdkBetas(): string[] | undefined {
  return STATE.sdkBetas
}

export function setSdkBetas(betas: string[] | undefined): void {
  STATE.sdkBetas = betas
}

export function resetCostState(): void {
  if (costLedgerOwner287) {
    const owner=costLedgerOwner287()
    owner.costLedger.reset(owner.id)
    owner.requestJournal.replacePromptId(null)
    STATE.promptId=null
    return
  }
  STATE.totalCostUSD = 0
  STATE.totalAPIDuration = 0
  STATE.totalAPIDurationWithoutRetries = 0
  STATE.totalToolDuration = 0
  STATE.startTime = Date.now()
  STATE.totalLinesAdded = 0
  STATE.totalLinesRemoved = 0
  STATE.hasUnknownModelCost = false
  STATE.modelUsage = {}
  STATE.promptId = null
}

/**
 * Sets cost state values for session restore.
 * Called by restoreCostStateForSession in cost-tracker.ts.
 */
export function setCostStateForRestore(data:CostRestore287): void {
  if (costLedgerOwner287) {
    const owner=costLedgerOwner287()
    owner.costLedger.restore(data,owner.id)
    return
  }
  const {
    totalCostUSD,
    totalAPIDuration,
    totalAPIDurationWithoutRetries,
    totalToolDuration,
    totalLinesAdded,
    totalLinesRemoved,
    lastDuration,
    modelUsage,
  }=data
  STATE.totalCostUSD = totalCostUSD
  STATE.totalAPIDuration = totalAPIDuration
  STATE.totalAPIDurationWithoutRetries = totalAPIDurationWithoutRetries
  STATE.totalToolDuration = totalToolDuration
  STATE.totalLinesAdded = totalLinesAdded
  STATE.totalLinesRemoved = totalLinesRemoved

  // Restore per-model usage breakdown
  if (modelUsage) {
    STATE.modelUsage = modelUsage
  }

  // Adjust startTime to make wall duration accumulate
  if (lastDuration) {
    STATE.startTime = Date.now() - lastDuration
  }
}

// Only used in tests
export function resetStateForTests(): void {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('resetStateForTests can only be called in tests')
  }
  Object.entries(getInitialState()).forEach(([key, value]) => {
    STATE[key as keyof State] = value as never
  })
  filesCredentialSlots.resetFdCredentialState()
  outputTokensAtTurnStart = 0
  currentTurnTokenBudget = null
  budgetContinuationCount = 0
  sessionSwitched.clear()
  pendingSessionSubscriptions287.clear()
  executionIdentityOwner287=undefined
  readUserPresenceOwner287=undefined
  launchOptionsAccessors287=undefined
  readLaunchOptions287=undefined
  readSettingsSourceOwner287=undefined
  hookRegistryAccessors287=undefined
  modelSelectionAccessors287=undefined
  readSessionTrustOwner287=undefined
  instructionContentAccessors287=undefined
  executionStateResetForTests287?.()
}

// You shouldn't use this directly. See src/utils/model/modelStrings.ts::getModelStrings()
export function getModelStrings(): ModelStrings | null {
  return STATE.modelStrings
}

// You shouldn't use this directly. See src/utils/model/modelStrings.ts
export function setModelStrings(modelStrings: ModelStrings): void {
  STATE.modelStrings = modelStrings
}

// Test utility function to reset model strings for re-initialization.
// Separate from setModelStrings because we only want to accept 'null' in tests.
export function resetModelStringsForTestingOnly() {
  STATE.modelStrings = null
}

export function setMeter(
  meter: Meter,
  createCounter: (name: string, options: MetricOptions) => AttributedCounter,
): void {
  STATE.meter = meter

  // Initialize all counters using the provided factory
  STATE.sessionCounter = createCounter('claude_code.session.count', {
    description: 'Count of CLI sessions started',
  })
  STATE.locCounter = createCounter('claude_code.lines_of_code.count', {
    description:
      "Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed",
  })
  STATE.prCounter = createCounter('claude_code.pull_request.count', {
    description: 'Number of pull requests created',
  })
  STATE.commitCounter = createCounter('claude_code.commit.count', {
    description: 'Number of git commits created',
  })
  STATE.costCounter = createCounter('claude_code.cost.usage', {
    description: 'Cost of the Claude Code session',
    unit: 'USD',
  })
  STATE.tokenCounter = createCounter('claude_code.token.usage', {
    description: 'Number of tokens used',
    unit: 'tokens',
  })
  STATE.codeEditToolDecisionCounter = createCounter(
    'claude_code.code_edit_tool.decision',
    {
      description:
        'Count of code editing tool permission decisions (accept/reject) for Edit, Write, and NotebookEdit tools',
    },
  )
  STATE.activeTimeCounter = createCounter('claude_code.active_time.total', {
    description: 'Total active time in seconds',
    unit: 's',
  })
}

export function getMeter(): Meter | null {
  return STATE.meter
}

export function getSessionCounter(): AttributedCounter | null {
  return STATE.sessionCounter
}

export function getLocCounter(): AttributedCounter | null {
  return STATE.locCounter
}

export function getPrCounter(): AttributedCounter | null {
  return STATE.prCounter
}

export function getCommitCounter(): AttributedCounter | null {
  return STATE.commitCounter
}

export function getCostCounter(): AttributedCounter | null {
  return STATE.costCounter
}

export function getTokenCounter(): AttributedCounter | null {
  return STATE.tokenCounter
}

export function getCodeEditToolDecisionCounter(): AttributedCounter | null {
  return STATE.codeEditToolDecisionCounter
}

export function getActiveTimeCounter(): AttributedCounter | null {
  return STATE.activeTimeCounter
}

export function getLoggerProvider(): LoggerProvider | null {
  return STATE.loggerProvider
}

export function setLoggerProvider(provider: LoggerProvider | null): void {
  STATE.loggerProvider = provider
}

export function getEventLogger(): ReturnType<typeof logs.getLogger> | null {
  return STATE.eventLogger
}

export function setEventLogger(
  logger: ReturnType<typeof logs.getLogger> | null,
): void {
  STATE.eventLogger = logger
}

export function getMeterProvider(): MeterProvider | null {
  return STATE.meterProvider
}

export function setMeterProvider(provider: MeterProvider | null): void {
  STATE.meterProvider = provider
}
export function getTracerProvider(): BasicTracerProvider | null {
  return STATE.tracerProvider
}
export function setTracerProvider(provider: BasicTracerProvider | null): void {
  STATE.tracerProvider = provider
}

// Preserve pre-start undefined and the explicit null supplied by main startup.
let modelSelectionAccessors287:ModelSelectionAccessorRuntime287|undefined
export function installModelSelectionAccessors287(accessors:ModelSelectionAccessorRuntime287,bootstrapRoot:ModelSelection287):void {
  bootstrapRoot.overrideMainLoopModel(STATE.mainLoopModelOverride)
  bootstrapRoot.replaceInitialMainLoopModel(STATE.initialMainLoopModel)
  modelSelectionAccessors287=accessors
}

// Installed once the canonical native root exists. STATE is only the cold
// bootstrap source; after installation every read/write follows the scoped host.
let launchOptionsAccessors287:LaunchOptionsAccessorRuntime287|undefined
let readLaunchOptions287:(()=>LaunchOptions287)|undefined
export function installLaunchOptionsAccessors287(
  accessors:LaunchOptionsAccessorRuntime287,
  readOwner:()=>LaunchOptions287,
  bootstrapRoot:LaunchOptions287,
):void {
  bootstrapRoot.replaceIsInteractive(STATE.isInteractive)
  bootstrapRoot.replacePermissionPromptToolName(STATE.permissionPromptToolName)
  bootstrapRoot.replaceClientType(STATE.clientType)
  bootstrapRoot.replaceSdkAgentProgressSummariesEnabled(STATE.sdkAgentProgressSummariesEnabled)
  bootstrapRoot.replaceStrictToolResultPairing(STATE.strictToolResultPairing)
  bootstrapRoot.replaceSessionBypassPermissionsMode(STATE.sessionBypassPermissionsMode)
  bootstrapRoot.replaceSessionPersistenceDisabled(STATE.sessionPersistenceDisabled)
  bootstrapRoot.replaceScheduledTasksEnabled(STATE.scheduledTasksEnabled)
  launchOptionsAccessors287=accessors
  readLaunchOptions287=readOwner
}

export function getIsNonInteractiveSession(): boolean {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getIsNonInteractiveSession() : !STATE.isInteractive
}

/** Fork policy and context share the original root-scoped ko memo. */
export function getForkSubagentPolicyState287(): Pick<State, 'forkSubagentEnabledSource'> {
  return (require('../services/context/runtimeMemo287.js') as typeof import('../services/context/runtimeMemo287.js')).getRuntimeMemo287()
}

export function getPermissionPromptToolName(): string | undefined {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getPermissionPromptToolName() : STATE.permissionPromptToolName
}

export function setPermissionPromptToolName(value: string | undefined): void {
  if (launchOptionsAccessors287) launchOptionsAccessors287.setPermissionPromptToolName(value)
  else STATE.permissionPromptToolName = value
}

export function getIsInteractive(): boolean {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getIsInteractive() : STATE.isInteractive
}

export function setIsInteractive(value: boolean): void {
  if (launchOptionsAccessors287) launchOptionsAccessors287.setIsInteractive(value)
  else STATE.isInteractive = value
}

export function getClientType(): string {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getClientType() : STATE.clientType
}

export function setClientType(type: string): void {
  if (launchOptionsAccessors287) launchOptionsAccessors287.setClientType(type)
  else STATE.clientType = type
}

export function getSdkAgentProgressSummariesEnabled(): boolean {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getSdkAgentProgressSummariesEnabled() : STATE.sdkAgentProgressSummariesEnabled
}

export function setSdkAgentProgressSummariesEnabled(value: boolean): void {
  if (launchOptionsAccessors287) launchOptionsAccessors287.setSdkAgentProgressSummariesEnabled(value)
  else STATE.sdkAgentProgressSummariesEnabled = value
}

export function getKairosActive(): boolean {
  return STATE.kairosActive
}

export function setKairosActive(value: boolean): void {
  STATE.kairosActive = value
}

export function getStrictToolResultPairing(): boolean {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getStrictToolResultPairing() : STATE.strictToolResultPairing
}

export function setStrictToolResultPairing(value: boolean): void {
  if (readLaunchOptions287) readLaunchOptions287().replaceStrictToolResultPairing(value)
  else STATE.strictToolResultPairing = value
}

// Field name 'userMsgOptIn' avoids excluded-string substrings ('BriefTool',
// 'SendUserMessage' — case-insensitive). All callers are inside feature()
// guards so these accessors don't need their own (matches getKairosActive).
export function getUserMsgOptIn(): boolean {
  return STATE.userMsgOptIn
}

export function setUserMsgOptIn(value: boolean): void {
  STATE.userMsgOptIn = value
}

export function getSessionSource(): string | undefined {
  return STATE.sessionSource
}

export function setSessionSource(source: string): void {
  STATE.sessionSource = source
}

export function getQuestionPreviewFormat(): 'markdown' | 'html' | undefined {
  return STATE.questionPreviewFormat
}

export function setQuestionPreviewFormat(format: 'markdown' | 'html'): void {
  STATE.questionPreviewFormat = format
}

export function getAgentColorMap(): Map<string, AgentColorName> {
  return STATE.agentColorMap
}

export function getFlagSettingsPath(): string | undefined {
  return readSettingsSourceOwner287 ? readSettingsSourceOwner287().flagSettingsPath() : STATE.flagSettingsPath
}

export function setFlagSettingsPath(path: string | undefined): void {
  if(readSettingsSourceOwner287)readSettingsSourceOwner287().replaceFlagSettingsPath(path)
  else STATE.flagSettingsPath = path
}

export function getFlagSettingsInline(): Record<string, unknown> | null {
  return readSettingsSourceOwner287 ? readSettingsSourceOwner287().flagSettingsInline() : STATE.flagSettingsInline
}

export function setFlagSettingsInline(
  settings: Record<string, unknown> | null,
): void {
  if(readSettingsSourceOwner287)readSettingsSourceOwner287().replaceFlagSettingsInline(settings)
  else STATE.flagSettingsInline = settings
}

export function getSessionIngressToken(): string | null | undefined {
  return filesCredentialSlots.sessionIngressToken()
}

export function setSessionIngressToken(token: string | null): void {
  filesCredentialSlots.replaceSessionIngressToken(token)
}

export function getOauthTokenFromFd(): string | null | undefined {
  return filesCredentialSlots.oauthTokenFromFd()
}

export function setOauthTokenFromFd(token: string | null): void {
  filesCredentialSlots.replaceOauthTokenFromFd(token)
}

export function getApiKeyFromFd(): string | null | undefined {
  return filesCredentialSlots.apiKeyFromFd()
}

export function setApiKeyFromFd(key: string | null): void {
  filesCredentialSlots.replaceApiKeyFromFd(key)
}

export function setLastAPIRequest(
  params: Omit<BetaMessageStreamParams, 'messages'> | null,
): void {
  STATE.lastAPIRequest = params
}

export function getLastAPIRequest(): Omit<
  BetaMessageStreamParams,
  'messages'
> | null {
  return STATE.lastAPIRequest
}

export function setLastAPIRequestMessages(
  messages: BetaMessageStreamParams['messages'] | null,
): void {
  STATE.lastAPIRequestMessages = messages
}

export function getLastAPIRequestMessages():
  | BetaMessageStreamParams['messages']
  | null {
  return STATE.lastAPIRequestMessages
}

export function setLastClassifierRequests(requests: unknown[] | null): void {
  STATE.lastClassifierRequests = requests
}

export function getLastClassifierRequests(): unknown[] | null {
  return STATE.lastClassifierRequests
}

let instructionContentAccessors287:import('../services/context/officialInstructionContent287/native.js').InstructionContentAccessors287|undefined
export function installInstructionContentAccessors287(accessors:NonNullable<typeof instructionContentAccessors287>):void {
  instructionContentAccessors287=accessors
}
export function setCachedClaudeMdContent(content: string | null): void {
  if(instructionContentAccessors287)instructionContentAccessors287.set(content)
  else STATE.cachedClaudeMdContent = content
}

export function getCachedClaudeMdContent(): string | null | undefined {
  return instructionContentAccessors287?instructionContentAccessors287.get():STATE.cachedClaudeMdContent
}

export function addToInMemoryErrorLog(errorInfo: {
  error: string
  timestamp: string
}): void {
  const MAX_IN_MEMORY_ERRORS = 100
  if (STATE.inMemoryErrorLog.length >= MAX_IN_MEMORY_ERRORS) {
    STATE.inMemoryErrorLog.shift() // Remove oldest error
  }
  STATE.inMemoryErrorLog.push(errorInfo)
}

export interface SettingsSourceOwner287 {
  flagSettingsPath():string|undefined
  replaceFlagSettingsPath(path:string|undefined):void
  flagSettingsInline():Record<string,unknown>|null
  replaceFlagSettingsInline(value:Record<string,unknown>|null):void
  useCoworkPlugins():boolean
  replaceUseCoworkPlugins(value:boolean):void
  allowedSettingSources():SettingSource[]
  replaceAllowedSettingSources(sources:SettingSource[]):void
}
let readSettingsSourceOwner287:(()=>SettingsSourceOwner287)|undefined
export function installSettingsSourceOwner287(read:()=>SettingsSourceOwner287,bootstrap:SettingsSourceOwner287):void {
  bootstrap.replaceAllowedSettingSources(STATE.allowedSettingSources)
  bootstrap.replaceFlagSettingsPath(STATE.flagSettingsPath)
  bootstrap.replaceFlagSettingsInline(STATE.flagSettingsInline)
  bootstrap.replaceUseCoworkPlugins(STATE.useCoworkPlugins)
  readSettingsSourceOwner287=read
}
export function getAllowedSettingSources(): SettingSource[] {
  return readSettingsSourceOwner287 ? readSettingsSourceOwner287().allowedSettingSources() : STATE.allowedSettingSources
}

export function setAllowedSettingSources(sources: SettingSource[]): void {
  if(readSettingsSourceOwner287)readSettingsSourceOwner287().replaceAllowedSettingSources(sources)
  else STATE.allowedSettingSources = sources
}

export function preferThirdPartyAuthentication(): boolean {
  // IDE extension should behave as 1P for authentication reasons.
  return launchOptionsAccessors287 ? launchOptionsAccessors287.preferThirdPartyAuthentication()
    : getIsNonInteractiveSession() && STATE.clientType !== 'claude-vscode'
}

export function setInlinePlugins(plugins: Array<string>): void {
  inlineExtensionsConfig287.setInlinePlugins(plugins)
}

export function getInlinePlugins(): Array<string> {
  return inlineExtensionsConfig287.getInlinePlugins()
}

export function setInlinePluginsNoMcp(plugins: Array<string>): void {
  inlineExtensionsConfig287.setInlinePluginsNoMcp(plugins)
}

export function getInlinePluginsNoMcp(): Array<string> {
  return inlineExtensionsConfig287.getInlinePluginsNoMcp()
}

export function setInlinePluginUrls(urls: Array<string>): void {
  inlineExtensionsConfig287.setInlinePluginUrls(urls)
}

export function getInlinePluginUrls(): Array<string> {
  return inlineExtensionsConfig287.getInlinePluginUrls()
}

export function setChromeFlagOverride(value: boolean | undefined): void {
  STATE.chromeFlagOverride = value
}

export function getChromeFlagOverride(): boolean | undefined {
  return STATE.chromeFlagOverride
}

export function setUseCoworkPlugins(value: boolean): void {
  if(readSettingsSourceOwner287)readSettingsSourceOwner287().replaceUseCoworkPlugins(value)
  else STATE.useCoworkPlugins = value
  resetSettingsCache()
}

export function getUseCoworkPlugins(): boolean {
  return readSettingsSourceOwner287 ? readSettingsSourceOwner287().useCoworkPlugins() : STATE.useCoworkPlugins
}

export function setSessionBypassPermissionsMode(enabled: boolean): void {
  if (launchOptionsAccessors287) launchOptionsAccessors287.setSessionBypassPermissionsMode(enabled)
  else STATE.sessionBypassPermissionsMode = enabled
}

export function getSessionBypassPermissionsMode(): boolean {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getSessionBypassPermissionsMode() : STATE.sessionBypassPermissionsMode
}

export function setScheduledTasksEnabled(enabled: boolean): void {
  if (launchOptionsAccessors287) launchOptionsAccessors287.setScheduledTasksEnabled(enabled)
  else STATE.scheduledTasksEnabled = enabled
}

export function getScheduledTasksEnabled(): boolean {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.getScheduledTasksEnabled() : STATE.scheduledTasksEnabled
}

export type SessionCronTask = {
  id: string
  cron: string
  prompt: string
  createdAt: number
  recurring?: boolean
  /**
   * When set, the task was created by an in-process teammate (not the team lead).
   * The scheduler routes fires to that teammate's pendingUserMessages queue
   * instead of the main REPL command queue. Session-only — never written to disk.
   */
  agentId?: string
}

export function getSessionCronTasks(): SessionCronTask[] {
  return STATE.sessionCronTasks
}

export function addSessionCronTask(task: SessionCronTask): void {
  STATE.sessionCronTasks.push(task)
}

/**
 * Returns the number of tasks actually removed. Callers use this to skip
 * downstream work (e.g. the disk read in removeCronTasks) when all ids
 * were accounted for here.
 */
export function removeSessionCronTasks(ids: readonly string[]): number {
  if (ids.length === 0) return 0
  const idSet = new Set(ids)
  const remaining = STATE.sessionCronTasks.filter(t => !idSet.has(t.id))
  const removed = STATE.sessionCronTasks.length - remaining.length
  if (removed === 0) return 0
  STATE.sessionCronTasks = remaining
  return removed
}

export interface SessionTrustOwner287 {
  sessionTrustAccepted():boolean
  replaceSessionTrustAccepted(accepted:boolean):void
}
let readSessionTrustOwner287:(()=>SessionTrustOwner287)|undefined
export function installSessionTrustOwner287(read:()=>SessionTrustOwner287,bootstrap:SessionTrustOwner287):void {
  bootstrap.replaceSessionTrustAccepted(STATE.sessionTrustAccepted)
  readSessionTrustOwner287=read
}
export function setSessionTrustAccepted(accepted: boolean): void {
  if(readSessionTrustOwner287)readSessionTrustOwner287().replaceSessionTrustAccepted(accepted)
  else STATE.sessionTrustAccepted = accepted
}

export function getSessionTrustAccepted(): boolean {
  return readSessionTrustOwner287 ? readSessionTrustOwner287().sessionTrustAccepted() : STATE.sessionTrustAccepted
}

export function setSessionPersistenceDisabled(disabled: boolean): void {
  if (launchOptionsAccessors287) launchOptionsAccessors287.setSessionPersistenceDisabled(disabled)
  else STATE.sessionPersistenceDisabled = disabled
}

export function isSessionPersistenceDisabled(): boolean {
  return launchOptionsAccessors287 ? launchOptionsAccessors287.isSessionPersistenceDisabled() : STATE.sessionPersistenceDisabled
}

export function hasExitedPlanModeInSession(): boolean {
  return STATE.hasExitedPlanMode
}

export function setHasExitedPlanMode(value: boolean): void {
  STATE.hasExitedPlanMode = value
}

export function needsPlanModeExitAttachment(): boolean {
  return STATE.needsPlanModeExitAttachment
}

export function setNeedsPlanModeExitAttachment(value: boolean): void {
  STATE.needsPlanModeExitAttachment = value
}

export function handlePlanModeTransition(
  fromMode: string,
  toMode: string,
): void {
  // If switching TO plan mode, clear any pending exit attachment
  // This prevents sending both plan_mode and plan_mode_exit when user toggles quickly
  if (toMode === 'plan' && fromMode !== 'plan') {
    STATE.needsPlanModeExitAttachment = false
  }

  // If switching out of plan mode, trigger the plan_mode_exit attachment
  if (fromMode === 'plan' && toMode !== 'plan') {
    STATE.needsPlanModeExitAttachment = true
  }
}

export function needsAutoModeExitAttachment(): boolean {
  return STATE.needsAutoModeExitAttachment
}

export function setNeedsAutoModeExitAttachment(value: boolean): void {
  STATE.needsAutoModeExitAttachment = value
}

export function handleAutoModeTransition(
  fromMode: string,
  toMode: string,
): void {
  // Auto↔plan transitions are handled by prepareContextForPlanMode (auto may
  // stay active through plan if opted in) and ExitPlanMode (restores mode).
  // Skip both directions so this function only handles direct auto transitions.
  if (
    (fromMode === 'auto' && toMode === 'plan') ||
    (fromMode === 'plan' && toMode === 'auto')
  ) {
    return
  }
  const fromIsAuto = fromMode === 'auto'
  const toIsAuto = toMode === 'auto'

  // If switching TO auto mode, clear any pending exit attachment
  // This prevents sending both auto_mode and auto_mode_exit when user toggles quickly
  if (toIsAuto && !fromIsAuto) {
    STATE.needsAutoModeExitAttachment = false
  }

  // If switching out of auto mode, trigger the auto_mode_exit attachment
  if (fromIsAuto && !toIsAuto) {
    STATE.needsAutoModeExitAttachment = true
  }
}

// LSP plugin recommendation session tracking
export function hasShownLspRecommendationThisSession(): boolean {
  return STATE.lspRecommendationShownThisSession
}

export function setLspRecommendationShownThisSession(value: boolean): void {
  STATE.lspRecommendationShownThisSession = value
}

// SDK init event state
export function setInitJsonSchema(schema: Record<string, unknown>): void {
  STATE.initJsonSchema = schema
}

export function getInitJsonSchema(): Record<string, unknown> | null {
  return STATE.initJsonSchema
}

// Native R/Wz/S$/nKt/Gi/dC/uee/LEe/_kn are installed with the canonical
// session root. STATE only holds pre-initialization bootstrap input.
let hookRegistryAccessors287:HookRegistryAccessors287|undefined
export function installHookRegistryAccessors287(runtime:HookRegistryAccessors287,registry:ExecutionHookRegistry287):void {
  registry.holder().registeredHooks=STATE.registeredHooks
  registry.replaceMainThreadAgentType(STATE.mainThreadAgentType)
  registry.replaceMainThreadAgentHooks(STATE.mainThreadAgentHooks)
  hookRegistryAccessors287=runtime
}
export function notifyHooksChanged287():void {
  if(!hookRegistryAccessors287)throw Error('Execution hooks owner is not initialized')
  hookRegistryAccessors287.notify()
}
export function subscribeHooksChanged287(listener:()=>void):()=>void {
  if(!hookRegistryAccessors287)throw Error('Execution hooks owner is not initialized')
  return hookRegistryAccessors287.subscribe(listener)
}
export function getMainThreadAgentHooks287():HooksSettings|undefined {return hookRegistryAccessors287?hookRegistryAccessors287.agentHooks():STATE.mainThreadAgentHooks}
export function setMainThreadAgentHooks287(value:HooksSettings|undefined):void {
  if(hookRegistryAccessors287)hookRegistryAccessors287.setAgentHooks(value)
  else STATE.mainThreadAgentHooks=value
}

export function registerHookCallbacks(
  hooks: Partial<Record<HookEvent, RegisteredHookMatcher[]>>,
): void {
  if(hookRegistryAccessors287){hookRegistryAccessors287.register(hooks);return}
  if (!STATE.registeredHooks) {
    STATE.registeredHooks = {}
  }

  // `registerHookCallbacks` may be called multiple times, so we need to merge (not overwrite)
  for (const [event, matchers] of Object.entries(hooks)) {
    const eventKey = event as HookEvent
    if (!STATE.registeredHooks[eventKey]) {
      STATE.registeredHooks[eventKey] = []
    }
    STATE.registeredHooks[eventKey]!.push(...matchers)
  }
}

export function getRegisteredHooks(): Partial<
  Record<HookEvent, RegisteredHookMatcher[]>
> | null | undefined {
  return hookRegistryAccessors287?hookRegistryAccessors287.registered():STATE.registeredHooks
}

/** Official print.ts vc: replace only the SDK-host matcher set, even for {}.
 * registerHookCallbacks remains append-only for plugins/internal callers.
 */
export function replaceSdkHostHookCallbacks(
  hooks: Partial<Record<HookEvent, HookCallbackMatcher[]>>,
): void {
  const registered=getRegisteredHooks()
  if (registered) {
    const retained: Partial<Record<HookEvent, RegisteredHookMatcher[]>> = {}
    let removed = false
    for (const [event, matchers] of Object.entries(registered)) {
      const survivors = matchers.filter(m => !('origin' in m && m.origin === 'sdkHost'))
      removed ||= survivors.length !== matchers.length
      if (survivors.length > 0) retained[event as HookEvent] = survivors
    }
    if (removed) {
      clearRegisteredHooks()
      if (Object.keys(retained).length > 0) registerHookCallbacks(retained)
    }
  }
  const replacement: Partial<Record<HookEvent, HookCallbackMatcher[]>> = {}
  for (const [event, matchers] of Object.entries(hooks)) {
    if (matchers.length === 0) continue
    replacement[event as HookEvent] = matchers.map(matcher => ({
      matcher: matcher.matcher ?? undefined,
      hooks: matcher.hooks,
      origin: 'sdkHost',
    }))
  }
  if (Object.keys(replacement).length > 0) registerHookCallbacks(replacement)
}

export function clearRegisteredHooks(): void {
  if(hookRegistryAccessors287){hookRegistryAccessors287.clear();return}
  STATE.registeredHooks = null
}

export function clearRegisteredPluginHooks(): void {
  if(hookRegistryAccessors287){hookRegistryAccessors287.clearPlugins();return}
  if (!STATE.registeredHooks) {
    return
  }

  const filtered: Partial<Record<HookEvent, RegisteredHookMatcher[]>> = {}
  for (const [event, matchers] of Object.entries(STATE.registeredHooks)) {
    // Keep only callback hooks (those without pluginRoot)
    const callbackHooks = matchers.filter(m => !('pluginRoot' in m))
    if (callbackHooks.length > 0) {
      filtered[event as HookEvent] = callbackHooks
    }
  }

  STATE.registeredHooks = Object.keys(filtered).length > 0 ? filtered : null
}

export function resetSdkInitState(): void {
  STATE.initJsonSchema = null
  clearRegisteredHooks()
}

export function getPlanSlugCache(): Map<string, string> {
  return executionIdentityOwner287 ? executionIdentityOwner287.planSlugs() : STATE.planSlugCache
}

export function getSessionCreatedTeams(): Set<string> {
  return STATE.sessionCreatedTeams
}

// Teleported session tracking for reliability logging
export function setTeleportedSessionInfo(info: {
  sessionId: string | null
}): void {
  STATE.teleportedSessionInfo = {
    isTeleported: true,
    hasLoggedFirstMessage: false,
    sessionId: info.sessionId,
  }
}

export function getTeleportedSessionInfo(): {
  isTeleported: boolean
  hasLoggedFirstMessage: boolean
  sessionId: string | null
} | null {
  return STATE.teleportedSessionInfo
}

export function markFirstTeleportMessageLogged(): void {
  if (STATE.teleportedSessionInfo) {
    STATE.teleportedSessionInfo.hasLoggedFirstMessage = true
  }
}

// Invoked skills tracking for preservation across compaction
export type InvokedSkillInfo = {
  skillName: string
  skillPath: string
  content: string
  invokedAt: number
  agentId: string | null
}

export function addInvokedSkill(
  skillName: string,
  skillPath: string,
  content: string,
  agentId: string | null = null,
): void {
  const key = `${agentId ?? ''}:${skillName}`
  STATE.invokedSkills.set(key, {
    skillName,
    skillPath,
    content,
    invokedAt: Date.now(),
    agentId,
  })
}

export function getInvokedSkills(): Map<string, InvokedSkillInfo> {
  return STATE.invokedSkills
}

export function getInvokedSkillsForAgent(
  agentId: string | undefined | null,
): Map<string, InvokedSkillInfo> {
  const normalizedId = agentId ?? null
  const filtered = new Map<string, InvokedSkillInfo>()
  for (const [key, skill] of STATE.invokedSkills) {
    if (skill.agentId === normalizedId) {
      filtered.set(key, skill)
    }
  }
  return filtered
}

export function clearInvokedSkills(
  preservedAgentIds?: ReadonlySet<string>,
): void {
  if (!preservedAgentIds || preservedAgentIds.size === 0) {
    STATE.invokedSkills.clear()
    return
  }
  for (const [key, skill] of STATE.invokedSkills) {
    if (skill.agentId === null || !preservedAgentIds.has(skill.agentId)) {
      STATE.invokedSkills.delete(key)
    }
  }
}

export function clearInvokedSkillsForAgent(agentId: string): void {
  for (const [key, skill] of STATE.invokedSkills) {
    if (skill.agentId === agentId) {
      STATE.invokedSkills.delete(key)
    }
  }
}

// Slow operations tracking for dev bar
const MAX_SLOW_OPERATIONS = 10
const SLOW_OPERATION_TTL_MS = 10000

export function addSlowOperation(operation: string, durationMs: number): void {
  if (process.env.USER_TYPE !== 'ant') return
  // Skip tracking for editor sessions (user editing a prompt file in $EDITOR)
  // These are intentionally slow since the user is drafting text
  if (operation.includes('exec') && operation.includes('claude-prompt-')) {
    return
  }
  const now = Date.now()
  // Remove stale operations
  STATE.slowOperations = STATE.slowOperations.filter(
    op => now - op.timestamp < SLOW_OPERATION_TTL_MS,
  )
  // Add new operation
  STATE.slowOperations.push({ operation, durationMs, timestamp: now })
  // Keep only the most recent operations
  if (STATE.slowOperations.length > MAX_SLOW_OPERATIONS) {
    STATE.slowOperations = STATE.slowOperations.slice(-MAX_SLOW_OPERATIONS)
  }
}

const EMPTY_SLOW_OPERATIONS: ReadonlyArray<{
  operation: string
  durationMs: number
  timestamp: number
}> = []

export function getSlowOperations(): ReadonlyArray<{
  operation: string
  durationMs: number
  timestamp: number
}> {
  // Most common case: nothing tracked. Return a stable reference so the
  // caller's setState() can bail via Object.is instead of re-rendering at 2fps.
  if (STATE.slowOperations.length === 0) {
    return EMPTY_SLOW_OPERATIONS
  }
  const now = Date.now()
  // Only allocate a new array when something actually expired; otherwise keep
  // the reference stable across polls while ops are still fresh.
  if (
    STATE.slowOperations.some(op => now - op.timestamp >= SLOW_OPERATION_TTL_MS)
  ) {
    STATE.slowOperations = STATE.slowOperations.filter(
      op => now - op.timestamp < SLOW_OPERATION_TTL_MS,
    )
    if (STATE.slowOperations.length === 0) {
      return EMPTY_SLOW_OPERATIONS
    }
  }
  // Safe to return directly: addSlowOperation() reassigns STATE.slowOperations
  // before pushing, so the array held in React state is never mutated.
  return STATE.slowOperations
}

export function getMainThreadAgentType(): string | undefined {
  return hookRegistryAccessors287?hookRegistryAccessors287.agentType():STATE.mainThreadAgentType
}

export function setMainThreadAgentType(agentType: string | undefined): void {
  if(hookRegistryAccessors287){hookRegistryAccessors287.setAgentType(agentType);return}
  STATE.mainThreadAgentType = agentType
}

export function getIsRemoteMode(): boolean {
  return STATE.isRemoteMode
}

export function setIsRemoteMode(value: boolean): void {
  STATE.isRemoteMode = value
}

export function isReplBridgeActive(): boolean {
  return STATE.replBridgeActive
}

export function setReplBridgeActive(active: boolean): void {
  STATE.replBridgeActive = active
}

// Installed by the recovered execution host after bootstrap initialization.
// This leaf does not import the native host or any credential/runtime modules.
export interface ExecutionIdentityOwner287 {
  id():string
  parentId():string|undefined
  projectDir():string|null
  project():{originalCwd:string;projectRoot:string;cwd:string}
  updateProject(patch:{originalCwd?:string;projectRoot?:string;cwd?:string}):void
  planSlugs():Map<string,string>
  journal():{
    lastMainRequestId():string|undefined;replaceLastMainRequestId(value:string|undefined):void
    lastApiCompletionTimestamp():number|null;replaceLastApiCompletionTimestamp(value:number):void
    pendingPostCompaction():boolean;replacePendingPostCompaction(value:boolean):void
  }
  switch(id:string,reason:SessionSwitchReason,dir:string|null,project?:{originalCwd:string;projectRoot:string;cwd:string}|null):void
  clear(options:{setCurrentAsParent?:boolean}):string
  subscribe(listener:BootstrapSessionSwitchListener287):()=>void
}
let executionIdentityOwner287:ExecutionIdentityOwner287|undefined
export function installExecutionIdentityOwner287(owner:ExecutionIdentityOwner287):void {
  for(const [id,slug]of STATE.planSlugCache)owner.planSlugs().set(id,slug)
  if(STATE.lastMainRequestId!==undefined)owner.journal().replaceLastMainRequestId(STATE.lastMainRequestId)
  if(STATE.lastApiCompletionTimestamp!==null)owner.journal().replaceLastApiCompletionTimestamp(STATE.lastApiCompletionTimestamp)
  owner.journal().replacePendingPostCompaction(STATE.pendingPostCompaction)
  STATE.planSlugCache.clear()
  executionIdentityOwner287=owner
  for(const registration of pendingSessionSubscriptions287){
    registration.dispose()
    registration.dispose=owner.subscribe(registration.listener)
  }
  pendingSessionSubscriptions287.clear()
}
function mirrorExecutionIdentity287():void {
  if(!executionIdentityOwner287)return
  STATE.sessionId=executionIdentityOwner287.id() as SessionId
  STATE.parentSessionId=executionIdentityOwner287.parentId() as SessionId|undefined
  STATE.sessionProjectDir=executionIdentityOwner287.projectDir()
}
export interface PromptAssemblyOwner287 {
  sections(): Map<string,string|null>
  recordSection(name:string,value:string|null):void
  forgetAllSections():void
  noteInvalidation(reason?:string):void
  epoch():number
}
let promptAssemblyOwner287:(()=>PromptAssemblyOwner287)|undefined
let executionStateResetForTests287:(()=>void)|undefined
/** Rebuild native owners when the existing test-only bootstrap reset replaces all state. */
export function registerExecutionStateResetForTests287(reset:()=>void):void {executionStateResetForTests287=reset}

export function installPromptAssemblyOwner287(readOwner:()=>PromptAssemblyOwner287):void {
  const owner=readOwner()
  for(const [key,value]of STATE.systemPromptSectionCache)owner.recordSection(key,value)
  for(let i=0;i<STATE.systemPromptSectionEpoch;i++)owner.noteInvalidation()
  STATE.systemPromptSectionCache.clear()
  promptAssemblyOwner287=readOwner
}

// System prompt section accessors

export function getSystemPromptSectionCache(): Map<string, string | null> {
  return promptAssemblyOwner287?promptAssemblyOwner287().sections():STATE.systemPromptSectionCache
}

export function setSystemPromptSectionCacheEntry(
  name: string,
  value: string | null,
): void {
  if(promptAssemblyOwner287)promptAssemblyOwner287().recordSection(name,value)
  else STATE.systemPromptSectionCache.set(name,value)
}

export function getSystemPromptSectionEpoch(): number { return promptAssemblyOwner287?promptAssemblyOwner287().epoch():STATE.systemPromptSectionEpoch }

export function clearSystemPromptSectionState(): void {
  if(promptAssemblyOwner287){promptAssemblyOwner287().forgetAllSections();promptAssemblyOwner287().noteInvalidation()}
  else {STATE.systemPromptSectionEpoch++;STATE.systemPromptSectionCache.clear()}
}

// Last emitted date accessors (for detecting midnight date changes)

export function getLastEmittedDate(): string | null {
  return STATE.lastEmittedDate
}

export function setLastEmittedDate(date: string | null): void {
  STATE.lastEmittedDate = date
}

export function getAdditionalDirectoriesForClaudeMd(): string[] {
  return (require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')).getExecutionSession287().host.extensionsConfig.additionalDirectoriesForClaudeMd()
}

export function setAdditionalDirectoriesForClaudeMd(
  directories: string[],
): void {
  ;(require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')).getExecutionSession287().host.extensionsConfig.replaceAdditionalDirectoriesForClaudeMd(directories)
}

export function getAllowedChannels(): ChannelEntry[] {
  return STATE.allowedChannels
}

export function setAllowedChannels(entries: ChannelEntry[]): void {
  STATE.allowedChannels = entries
}

export function getHasDevChannels(): boolean {
  return STATE.hasDevChannels
}

export function setHasDevChannels(value: boolean): void {
  STATE.hasDevChannels = value
}

export function getPromptCache1hAllowlist(): string[] | null {
  return (require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')).getExecutionSession287().host.requestLatches.promptCache1hAllowlist()
}

export function setPromptCache1hAllowlist(allowlist: string[] | null): void {
  ;(require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')).getExecutionSession287().host.requestLatches.replacePromptCache1hAllowlist(allowlist)
}

export function getPromptCache1hEligible(): boolean | null {
  return STATE.promptCache1hEligible
}

export function setPromptCache1hEligible(eligible: boolean | null): void {
  STATE.promptCache1hEligible = eligible
}

export function getAfkModeHeaderLatched(): boolean | null {
  return STATE.afkModeHeaderLatched
}

export function setAfkModeHeaderLatched(v: boolean): void {
  STATE.afkModeHeaderLatched = v
}

export function getFastModeHeaderLatched(): boolean | null {
  return STATE.fastModeHeaderLatched
}

export function setFastModeHeaderLatched(v: boolean): void {
  STATE.fastModeHeaderLatched = v
}

export function getCacheEditingHeaderLatched(): boolean | null {
  return STATE.cacheEditingHeaderLatched
}

export function setCacheEditingHeaderLatched(v: boolean): void {
  STATE.cacheEditingHeaderLatched = v
}

export function getThinkingClearLatched(): boolean | null {
  return STATE.thinkingClearLatched
}

export function setThinkingClearLatched(v: boolean): void {
  STATE.thinkingClearLatched = v
}

/**
 * Reset beta header latches to null. Called on /clear and /compact so a
 * fresh conversation gets fresh header evaluation.
 */
export function clearBetaHeaderLatches(bindingAgentId?: string | null): void {
  // null means the compacting agent is unknown, not the main-thread owner.
  if (bindingAgentId !== null) clearThinkingBindingStates(STATE.sessionId, bindingAgentId)
  STATE.afkModeHeaderLatched = null
  STATE.fastModeHeaderLatched = null
  STATE.cacheEditingHeaderLatched = null
  STATE.cacheDiagnosisHeaderRefused = false
  STATE.thinkingResumptionHeaderRefused = false
  STATE.thinkingClearLatched = null
}

export function getCacheDiagnosisHeaderRefused(): boolean {
  return STATE.cacheDiagnosisHeaderRefused
}

export function setCacheDiagnosisHeaderRefused(v: boolean): void {
  STATE.cacheDiagnosisHeaderRefused = v
}

export function getThinkingResumptionHeaderRefused(): boolean {
  return STATE.thinkingResumptionHeaderRefused
}

export function setThinkingResumptionHeaderRefused(v: boolean): void {
  STATE.thinkingResumptionHeaderRefused = v
}

export function getPromptId(): string | null {
  return STATE.promptId
}

export function setPromptId(id: string | null): void {
  STATE.promptId = id
}
