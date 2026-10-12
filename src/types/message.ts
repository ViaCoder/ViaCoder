import type {ServerMessageFields287} from '../utils/permissions/serverClassifier287/native.js'
/**
 * Recovered internal message contracts, not SDK wire messages.
 * Evidence: utils/messages.ts constructors and normalization, utils/groupToolUses.ts,
 * utils/collapseReadSearch.ts, utils/plans.ts; original UI sourcesContent validates
 * discriminants. Stream events use the installed Anthropic beta protocol types.
 */
import type { APIError } from '@anthropic-ai/sdk'
import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.mjs'
import type { BetaContentBlock, BetaMessage, BetaRawMessageStreamEvent, BetaToolUseBlock } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type { UUID } from 'crypto'
import type { Progress } from '../Tool.js'
import type { HookProgress } from './hooks.js'
import type { PermissionMode } from './permissions.js'
import type { QuotaLimits } from './quotaLimits.js'
import type { ActiveGoal } from '../utils/goal.js'
import type { Attachment } from '../utils/attachments.js'
import type { RefusalProtocolMessage, RefusalRecoveryMetadata } from '../services/api/refusalFallback.js'
import type { SDKAssistantMessageError } from '../entrypoints/sdk/coreTypes.recovered.js'
import type { BranchAction, CommitKind, PrAction } from '../tools/shared/gitOperationTracking.js'

export type MessageOrigin =
  | { kind: 'human' }
  | { kind: 'auto-continuation' }
  | { kind: 'channel'; server: string }
  | { kind: 'coordinator' }
  | { kind: 'observer-activity' }
  | { kind: 'peer'; from: string; senderTaskId?: string; name?: string; body?: string; plugin?: string; handback?: boolean; flagged?: boolean }
  | { kind: 'task-notification'; source?: string; subkind?: string }
export type TurnPosition = { promptIndex: number; turnIndex: number }
export type PartialCompactDirection = 'from' | 'up_to'
export type SystemMessageLevel = 'info' | 'warning' | 'error' | 'suggestion'
type MessageBase = { uuid: UUID; timestamp: string }

export type AssistantMessage = MessageBase & ServerMessageFields287 & {
  type: 'assistant'
  // Original JUt reads the boolean on message_delta, never message_start.
  message: BetaMessage & {resumable?: boolean}
  requestId?: string
  isApiErrorMessage?: boolean
  isVirtual?: true
  apiError?:
    | 'advisor_incompatible' | 'api_key_auth_disabled' | 'autocompact_thrashing'
    | 'consent_unanswered' | 'effort_requires_thinking' | 'invalid_credential_header'
    | 'long_context_credits_required' | 'max_output_tokens' | 'model_requires_usage_credits'
    | 'no_response' | 'org_disabled_credential' | 'pdf_password_protected'
    | 'pdf_too_large' | 'provider_credentials' | 'tool_history_mismatch'
    | 'model_substitution_disabled' | 'no_allowed_fallback' | 'dlp_request_denied'
  apiErrorStatus?: number
  apiErrorIsTransient?: boolean
  quotaLimits?: QuotaLimits
  truncatedAfterOutput?: boolean
  streamWatchdogGaveUp?: boolean
  healsDistinctCarrier?: boolean
  isMeta?: boolean
  resumedFromIncompleteThinking?: boolean
  error?: SDKAssistantMessageError
  errorDetails?: string
  refusalRecovery?: RefusalRecoveryMetadata
  advisorModel?: string
  research?: unknown // claude.ts forwards opaque API research metadata verbatim.
  isUnmetered?: boolean
}
export type UserMessage = MessageBase & {
  type: 'user'
  promptId?: string
  turnOrigin?: string
  turnPosition?: TurnPosition
  promptSource?: string
  message: { role: 'user'; content: string | ContentBlockParam[] }
  isMeta?: true
  isVisibleInTranscriptOnly?: true
  isVirtual?: true
  isCompactSummary?: true
  summarizeMetadata?: { messagesSummarized: number; userContext?: string; direction?: PartialCompactDirection }
  toolUseResult?: unknown
  toolEndsTurn?: boolean
  toolDenialEndsTurn?: boolean
  toolDenialKind?: 'cancelled' | 'interrupted' | 'user-rejected' | 'automode-unavailable' | 'automode-parsing-error' | 'automode-blocked' | 'permission-rule'
  mcpMeta?: { _meta?: Record<string, unknown>; structuredContent?: Record<string, unknown> }
  imagePasteIds?: number[]
  sourceToolAssistantUUID?: UUID
  permissionMode?: PermissionMode
  origin?: MessageOrigin
  planContent?: string
}
export type AttachmentMessage<A extends Attachment = Attachment> = MessageBase & {
  type: 'attachment'
  attachment: A
  rendered?: {content: string | ContentBlockParam[]}[]
  renderedRole?: 'user' | 'system'
  renderedInHumanTurn?: {content: string | ContentBlockParam[]}[]
}
export type ProgressMessage<P extends Progress = Progress> = MessageBase & {
  type: 'progress'; data: P; toolUseID: string; parentToolUseID: string
}
export type StopHookInfo = { command: string; promptText?: string; durationMs?: number }
export type CompactMetadata = {
  trigger: 'manual' | 'auto'
  preTokens: number
  userContext?: string
  messagesSummarized?: number
  preCompactDiscoveredTools?: string[]
  preservedSegment?: { headUuid: UUID; anchorUuid: UUID; tailUuid: UUID }
}
type SystemBase<S extends string> = MessageBase & { type: 'system'; subtype: S; isMeta?: boolean }
export type SystemInformationalMessage = SystemBase<'informational'> & {
  content: string; level: SystemMessageLevel; toolUseID?: string; preventContinuation?: boolean
}
/** Original Gg metadata is carried independently of the rendered command text. */
export type LocalCommandMetadata287 = {
  contextUsage?: Record<string, unknown>
  usageReport?: import('../commands/usage/officialText287/native.js').UsageTextTwin287
  commandRun?: { command: string; args: string }
  commandOutcome?: unknown
}
export type SystemLocalCommandMessage = SystemBase<'local_command'> & LocalCommandMetadata287 & { content: string; level: 'info' }
export type SystemPermissionRetryMessage = SystemBase<'permission_retry'> & { content: string; commands: string[]; level: 'info' }
export type SystemBridgeStatusMessage = SystemBase<'bridge_status'> & { content: string; url: string; upgradeNudge?: string }
export type SystemScheduledTaskFireMessage = SystemBase<'scheduled_task_fire'> & { content: string }
export type SystemStopHookSummaryMessage = SystemBase<'stop_hook_summary'> & {
  hookCount: number; hookInfos: StopHookInfo[]; hookErrors: string[]; preventedContinuation: boolean
  stopReason?: string; hasOutput: boolean; level: SystemMessageLevel; toolUseID?: string
  hookLabel?: string; totalDurationMs?: number
}
export type SystemTurnDurationMessage = SystemBase<'turn_duration'> & {
  durationMs: number; budgetTokens?: number; budgetLimit?: number; budgetNudges?: number; messageCount?: number
}
export type SystemAwaySummaryMessage = SystemBase<'away_summary'> & { content: string }
export type SystemMemorySavedMessage = SystemBase<'memory_saved'> & { writtenPaths: string[]; teamCount?: number; verb?: string }
export type SystemAgentsKilledMessage = SystemBase<'agents_killed'>
export type SystemApiMetricsMessage = SystemBase<'api_metrics'> & {
  ttftMs: number; otps: number; isP50?: boolean; hookDurationMs?: number; turnDurationMs?: number
  toolDurationMs?: number; classifierDurationMs?: number; toolCount?: number; hookCount?: number
  classifierCount?: number; configWriteCount?: number
}
export type SystemCompactBoundaryMessage = SystemBase<'compact_boundary'> & {
  content: string; level: 'info'; compactMetadata: CompactMetadata; logicalParentUuid?: UUID
}
export type SystemMicrocompactBoundaryMessage = SystemBase<'microcompact_boundary'> & {
  content: string; level: 'info'
  microcompactMetadata: { trigger: 'auto'; preTokens: number; tokensSaved: number; compactedToolIds: string[]; clearedAttachmentUUIDs: string[] }
}
export type SystemAPIErrorMessage = SystemBase<'api_error'> & {
  level: 'error'; cause?: Error; error: APIError; retryInMs: number; retryAttempt: number; maxRetries: number
  /** SDK 2.1.284's optional no-response retry telemetry. */
  noResponse?: { waitedMs: number; retryWaitMs: number }
  /** Internal retry lane; the public SDK api_retry event omits this field. */
  source?: 'request_retry' | 'connection_retry'
}
export type SystemFileSnapshotMessage = SystemBase<'file_snapshot'> & {
  content: string; level: 'info'; snapshotFiles: { key: 'plan'; path: string; content: string }[]
}
/** SystemTextMessage.tsx sourcesContent: ThinkingMessage renders message.content. */
export type SystemThinkingMessage = SystemBase<'thinking'> & { content: string }
/** Local refusal recovery protocol, retaining the message UUID invariant. */
export type SystemRefusalMessage = RefusalProtocolMessage & MessageBase
export type SystemMessage =
  | SystemRefusalMessage
  | SystemInformationalMessage | SystemLocalCommandMessage | SystemPermissionRetryMessage
  | SystemBridgeStatusMessage | SystemScheduledTaskFireMessage | SystemStopHookSummaryMessage
  | SystemTurnDurationMessage | SystemAwaySummaryMessage | SystemMemorySavedMessage
  | SystemAgentsKilledMessage | SystemApiMetricsMessage | SystemCompactBoundaryMessage
  | SystemMicrocompactBoundaryMessage | SystemAPIErrorMessage | SystemFileSnapshotMessage | SystemThinkingMessage
export type Message = AssistantMessage | UserMessage | AttachmentMessage | ProgressMessage | SystemMessage
export type NormalizedAssistantMessage<C extends BetaContentBlock = BetaContentBlock> = Omit<AssistantMessage, 'message'> & { message: Omit<BetaMessage, 'content'> & { content: C[] } }
export type NormalizedUserMessage = Omit<UserMessage, 'message'> & { message: { role: 'user'; content: ContentBlockParam[] }; sourceToolUseID?: string }
export type NormalizedMessage = NormalizedAssistantMessage | NormalizedUserMessage | AttachmentMessage | ProgressMessage | SystemMessage
export type HookResultMessage = AttachmentMessage | ProgressMessage<HookProgress>
export type StreamEvent = { type: 'stream_event'; event: BetaRawMessageStreamEvent | {type: 'ping'}; ttftMs?: number;
  thinkingDisplay?: 'summarized' | 'omitted' }
export type ActiveGoalEvent = { type: 'active_goal'; value: ActiveGoal | undefined }
export type RequestStartEvent = { type: 'stream_request_start' }
export type TombstoneMessage = { type: 'tombstone'; message: Message }
export type ToolUseSummaryMessage = MessageBase & { type: 'tool_use_summary'; summary: string; precedingToolUseIds: string[] }

export type GroupedToolUseMessage = {
  type: 'grouped_tool_use'; toolName: string; messages: NormalizedAssistantMessage<BetaToolUseBlock>[]
  results: NormalizedUserMessage[]; displayMessage: NormalizedAssistantMessage<BetaToolUseBlock>
  uuid: string; timestamp: string; messageId: string
}
export type CollapsibleMessage = NormalizedAssistantMessage | NormalizedUserMessage | GroupedToolUseMessage
export type CollapsedReadSearchGroup = MessageBase & {
  type: 'collapsed_read_search'; searchCount: number; readCount: number; listCount: number; replCount: number
  memorySearchCount: number; memoryReadCount: number; memoryWriteCount: number
  readFilePaths: string[]; searchArgs: string[]; latestDisplayHint?: string
  messages: CollapsibleMessage[]; displayMessage: CollapsibleMessage
  teamMemorySearchCount?: number; teamMemoryReadCount?: number; teamMemoryWriteCount?: number
  mcpCallCount?: number; mcpServerNames?: string[]; bashCount?: number; gitOpBashCount?: number
  commits?: { sha: string; kind: CommitKind }[]; pushes?: { branch: string }[]
  branches?: { ref: string; action: BranchAction }[]; prs?: { number: number; url?: string; action: PrAction }[]
  hookTotalMs?: number; hookCount?: number; hookInfos?: StopHookInfo[]
  relevantMemories?: { path: string; content: string; mtimeMs: number }[]
}
export type RenderableMessage = Exclude<NormalizedMessage, ProgressMessage> | GroupedToolUseMessage | CollapsedReadSearchGroup
export type { QueueOperation, QueueOperationMessage } from './messageQueueTypes.js'
