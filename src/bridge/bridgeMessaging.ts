/**
 * Shared transport-layer helpers for bridge message handling.
 *
 * Extracted from replBridge.ts so both the env-based core (initBridgeCore)
 * and the env-less core (initEnvLessBridgeCore) can use the same ingress
 * parsing, control-request handling, and echo-dedup machinery.
 *
 * Everything here is pure — no closure over bridge-specific state. All
 * collaborators (transport, sessionId, UUID sets, callbacks) are passed
 * as params.
 */

import { randomUUID } from 'crypto'
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js'
import type {
  SDKControlRequest,
  SDKControlResponse,
} from '../entrypoints/sdk/controlTypes.js'
import type { SDKResultSuccess } from '../entrypoints/sdk/coreTypes.js'
import { logEvent } from '../services/analytics/index.js'
import { EMPTY_USAGE } from '../services/api/emptyUsage.js'
import type { Message } from '../types/message.js'
import { normalizeControlMessageKeys } from '../utils/controlMessageCompat.js'
import { logForDebugging } from '../utils/debug.js'
import { stripDisplayTagsAllowEmpty } from '../utils/displayTags.js'
import { errorMessage } from '../utils/errors.js'
import type { PermissionMode } from '../utils/permissions/PermissionMode.js'
import { jsonParse } from '../utils/slowOperations.js'
import type { ReplBridgeTransport } from './replBridgeTransport.js'
import { getPrintHostSource287 } from '../cli/printOwnership287/publicHostRuntime287.js'

// ─── Type guards ─────────────────────────────────────────────────────────────

/** Type predicate for parsed WebSocket messages. SDKMessage is a
 *  discriminated union on `type` — validating the discriminant is
 *  sufficient for the predicate; callers narrow further via the union. */
export function isSDKMessage(value: unknown): value is SDKMessage {
  return (
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    typeof value.type === 'string'
  )
}

/** Type predicate for control_response messages from the server. */
export function isSDKControlResponse(
  value: unknown,
): value is SDKControlResponse {
  return (
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'control_response' &&
    'response' in value
  )
}

/** Type predicate for control_request messages from the server. */
export function isSDKControlRequest(
  value: unknown,
): value is SDKControlRequest {
  return (
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'control_request' &&
    'request_id' in value &&
    'request' in value
  )
}

/**
 * True for message types that should be forwarded to the bridge transport.
 * The server only wants user/assistant turns and slash-command system events;
 * everything else (tool_result, progress, etc.) is internal REPL chatter.
 */
export function isEligibleBridgeMessage(m: Message): boolean {
  // Virtual messages (REPL inner calls) are display-only — bridge/SDK
  // consumers see the REPL tool_use/result which summarizes the work.
  if ((m.type === 'user' || m.type === 'assistant') && m.isVirtual) {
    return false
  }
  return (
    m.type === 'user' ||
    m.type === 'assistant' ||
    (m.type === 'system' && m.subtype === 'local_command')
  )
}

/**
 * Extract title-worthy text from a Message for onUserMessage. Returns
 * undefined for messages that shouldn't title the session: non-user, meta
 * (nudges), tool results, compact summaries, non-human origins (task
 * notifications, channel messages), or pure display-tag content
 * (<ide_opened_file>, <session-start-hook>, etc.).
 *
 * Synthetic interrupts ([Request interrupted by user]) are NOT filtered here —
 * isSyntheticMessage lives in messages.ts (heavy import, pulls command
 * registry). The initialMessages path in initReplBridge checks it; the
 * writeMessages path reaching an interrupt as the *first* message is
 * implausible (an interrupt implies a prior prompt already flowed through).
 */
export function extractTitleText(m: Message): string | undefined {
  if (m.type !== 'user' || m.isMeta || m.toolUseResult || m.isCompactSummary)
    return undefined
  if (m.origin && m.origin.kind !== 'human') return undefined
  const content = m.message.content
  let raw: string | undefined
  if (typeof content === 'string') {
    raw = content
  } else {
    for (const block of content) {
      if (block.type === 'text') {
        raw = block.text
        break
      }
    }
  }
  if (!raw) return undefined
  const clean = stripDisplayTagsAllowEmpty(raw)
  return clean || undefined
}

// ─── Ingress routing ─────────────────────────────────────────────────────────

/**
 * Parse an ingress WebSocket message and route it to the appropriate handler.
 * Ignores messages whose UUID is in recentPostedUUIDs (echoes of what we sent)
 * or in recentInboundUUIDs (re-deliveries we've already forwarded — e.g.
 * server replayed history after a transport swap lost the seq-num cursor).
 */
export function handleIngressMessage(
  data: string,
  recentPostedUUIDs: BoundedUUIDSet,
  recentInboundUUIDs: BoundedUUIDSet,
  onInboundMessage: ((msg: SDKMessage) => void | Promise<void>) | undefined,
  onPermissionResponse?: ((response: SDKControlResponse) => void) | undefined,
  onControlRequest?: ((request: SDKControlRequest) => void) | undefined,
): void {
  try {
    const parsed: unknown = normalizeControlMessageKeys(jsonParse(data))

    // control_response is not an SDKMessage — check before the type guard
    if (isSDKControlResponse(parsed)) {
      logForDebugging('[bridge:repl] Ingress message type=control_response')
      onPermissionResponse?.(parsed)
      return
    }

    // control_request from the server (initialize, set_model, can_use_tool).
    // Must respond promptly or the server kills the WS (~10-14s timeout).
    if (isSDKControlRequest(parsed)) {
      logForDebugging(
        `[bridge:repl] Inbound control_request subtype=${parsed.request.subtype}`,
      )
      onControlRequest?.(parsed)
      return
    }

    if (!isSDKMessage(parsed)) return

    // Check for UUID to detect echoes of our own messages
    const uuid =
      'uuid' in parsed && typeof parsed.uuid === 'string'
        ? parsed.uuid
        : undefined

    if (uuid && recentPostedUUIDs.has(uuid)) {
      logForDebugging(
        `[bridge:repl] Ignoring echo: type=${parsed.type} uuid=${uuid}`,
      )
      return
    }

    // Defensive dedup: drop inbound prompts we've already forwarded. The
    // SSE seq-num carryover (lastTransportSequenceNum) is the primary fix
    // for history-replay; this catches edge cases where that negotiation
    // fails (server ignores from_sequence_num, transport died before
    // receiving any frames, etc).
    if (uuid && recentInboundUUIDs.has(uuid)) {
      logForDebugging(
        `[bridge:repl] Ignoring re-delivered inbound: type=${parsed.type} uuid=${uuid}`,
      )
      return
    }

    logForDebugging(
      `[bridge:repl] Ingress message type=${parsed.type}${uuid ? ` uuid=${uuid}` : ''}`,
    )

    if (parsed.type === 'user') {
      if (uuid) recentInboundUUIDs.add(uuid)
      logEvent('tengu_bridge_message_received', {
        is_repl: true,
      })
      // Fire-and-forget — handler may be async (attachment resolution).
      void onInboundMessage?.(parsed)
    } else {
      logForDebugging(
        `[bridge:repl] Ignoring non-user inbound message: type=${parsed.type}`,
      )
    }
  } catch (err) {
    logForDebugging(
      `[bridge:repl] Failed to parse ingress message: ${errorMessage(err)}`,
    )
  }
}

// ─── Server-initiated control requests ───────────────────────────────────────

/** Original xGo host ABI, distinct from SDK Query callbacks. All optional
 * functions/maps are supplied by the existing caller; no task/cancel owner is
 * allocated here. Missing callbacks retain the original unavailable verdict. */
export type BridgeControlVerdict287 =
  | { ok: true; notices?: string[] }
  | { ok: false; error: string; code?: string }
export type BridgeSideQuestionRequest287 = {
  question: string
  history?: { question: string; response: string; fallback_notice?: string }[]
}
export type BridgeSideQuestionResult287 = { response: string | null; synthetic?: boolean }
export type ServerControlRequestHandlers = {
  transport: ReplBridgeTransport | null
  sessionId: string
  outboundOnly?: boolean
  getInitializeState?: () => Record<string, unknown>
  getCommands?: () => unknown[]
  reportsInboundReadReceipts?: () => boolean
  getPendingPrompts?: () => SDKControlRequest[]
  onInterrupt?: () => void
  onDialogKindsDeclared?: (kinds: string[]) => void
  onClientInitialize?: () => void
  onSetModel?: (model: string | undefined) => BridgeControlVerdict287 | void | Promise<BridgeControlVerdict287 | void>
  onSetMaxThinkingTokens?: (maxTokens: number | null, thinkingDisplay?: 'summarized' | 'omitted' | 'highlights' | null) => BridgeControlVerdict287 | void | Promise<BridgeControlVerdict287 | void>
  onGetPlan?: () => Promise<{ exists: boolean; content?: string; path?: string }>
  onSetPermissionMode?: (mode: PermissionMode) => BridgeControlVerdict287
  onStopTask?: (taskId: string) => Promise<void>
  onBackgroundTasks?: (toolUseId?: string) => boolean
  onCancelAsyncMessage?: (messageUuid: string) => boolean
  onSideQuestion?: (request: BridgeSideQuestionRequest287, context: {
    signal: AbortSignal; onProgress: (progress: Record<string, unknown>) => void
  }) => Promise<BridgeSideQuestionResult287>
  onApplyFlagSettings?: (settings: Record<string, unknown>) => BridgeControlVerdict287
  onRenameSession?: (title: string) => BridgeControlVerdict287
  onSetColor?: (color: unknown) => BridgeControlVerdict287
  onFileSuggestions?: (query: string) => Promise<unknown[]>
  onReadFile?: (path: string, maxBytes?: number, encoding?: string) => Promise<unknown>
  onGetWorkspaceDiff?: (signal: AbortSignal) => Promise<unknown>
  onGetContextUsage?: (options: { detail?: unknown }) => Promise<unknown>
  onMcpAuthenticate?: (serverName: string, redirectUri?: string) => Promise<unknown>
  onMcpOauthCallbackUrl?: (serverName: string, callbackUrl: string) => Promise<unknown>
  onMcpReconnect?: (serverName: string) => Promise<unknown>
  onMcpSetServers?: (servers: Record<string, unknown>) =>
    | { ok: true; added: unknown[]; removed: unknown[]; errors: Record<string, unknown>; unknownServerCount?: number }
    | { ok: false; error: string }
  onForkConversation?: (request: unknown, context: { promptPending: boolean; requestId: string }) => Promise<unknown>
  hasPendingPrompts?: () => boolean
  cancellableRequests?: Map<string, AbortController>
  writeFrame?: (frame: SDKControlResponse | Record<string, unknown>) => unknown
  answerSharedControlRequest?: (request: SDKControlRequest['request']) =>
    | { subtype: 'success'; response?: unknown }
    | { subtype: 'error'; error: string }
    | undefined
    | Promise<{ subtype: 'success'; response?: unknown } | { subtype: 'error'; error: string } | undefined>
  setModelVerdictDeadlineMs?: number
  sideQuestionDeadlineMs?: number
}

/** Both legacy cores pass their actual optional callbacks through this ABI.
 * Ordinary production REPL/print zi/hmo roots are not rerouted here. */
export type BridgeControlCallbacks287 = Omit<ServerControlRequestHandlers, 'transport' | 'sessionId'>

/** Official 2.1.287 chunk-4shr1gvc xGo [9044,21880), body SHA256
 * e63d6278dbd5c817e56fbc3171c50750971991eb66d63bad38a1c927e6d9b26c.
 * Reuse the complete existing canonical closure and its dependencies. */
export function handleServerControlRequest(
  request: SDKControlRequest,
  handlers: ServerControlRequestHandlers,
): void {
  const original = getPrintHostSource287('chunk-4shr1gvc.js', 'xGo')
  if (typeof original !== 'function') throw new Error('Original complete bridge xGo is not callable')
  if (request.request.subtype !== 'get_plan') {
    (original as (request: SDKControlRequest, handlers: ServerControlRequestHandlers) => void)(request, handlers)
    return
  }

  // Existing local C: get_plan is not an original xGo subtype. Let the
  // original receiver retain null transport, shutdown and outbound-only gates;
  // ordinary admitted reads keep the existing real plan callback/error frame.
  const gate = getPrintHostSource287('chunk-4shr1gvc.js', 'Dr')
  if (typeof gate !== 'function') throw new Error('Original bridge shutdown gate is not callable')
  if (!handlers.transport || handlers.outboundOnly || (gate as () => boolean)()) {
    (original as (request: SDKControlRequest, handlers: ServerControlRequestHandlers) => void)(request, handlers)
    return
  }
  const { transport, sessionId, onGetPlan } = handlers
  const send = (payload: SDKControlResponse['response']) => {
    const frame = { type: 'control_response' as const, response: payload, session_id: sessionId }
    return transport.write(frame)
  }
  void Promise.resolve().then(() => {
    if (!onGetPlan) throw new Error('get_plan is not supported by this host')
    return onGetPlan()
  }).then(
    plan => send({ subtype: 'success', request_id: request.request_id, response: plan }),
    () => send({ subtype: 'error', request_id: request.request_id,
      error: onGetPlan ? 'Failed to read the session plan' : 'get_plan is not supported by this host' }),
  ).catch(error => logForDebugging(`[bridge:repl] get_plan response write failed: ${errorMessage(error)}`))
}

// ─── Result message (for session archival on teardown) ───────────────────────

/**
 * Build a minimal `SDKResultSuccess` message for session archival.
 * The server needs this event before a WS close to trigger archival.
 */
export function makeResultMessage(sessionId: string): SDKResultSuccess {
  return {
    type: 'result',
    subtype: 'success',
    duration_ms: 0,
    duration_api_ms: 0,
    is_error: false,
    num_turns: 0,
    result: '',
    stop_reason: null,
    total_cost_usd: 0,
    usage: { ...EMPTY_USAGE },
    modelUsage: {},
    permission_denials: [],
    session_id: sessionId,
    uuid: randomUUID(),
  }
}

// ─── BoundedUUIDSet (echo-dedup ring buffer) ─────────────────────────────────

/**
 * FIFO-bounded set backed by a circular buffer. Evicts the oldest entry
 * when capacity is reached, keeping memory usage constant at O(capacity).
 *
 * Messages are added in chronological order, so evicted entries are always
 * the oldest. The caller relies on external ordering (the hook's
 * lastWrittenIndexRef) as the primary dedup — this set is a secondary
 * safety net for echo filtering and race-condition dedup.
 */
export class BoundedUUIDSet {
  private readonly capacity: number
  private readonly ring: (string | undefined)[]
  private readonly set = new Set<string>()
  private writeIdx = 0

  constructor(capacity: number) {
    this.capacity = capacity
    this.ring = new Array<string | undefined>(capacity)
  }

  add(uuid: string): void {
    if (this.set.has(uuid)) return
    // Evict the entry at the current write position (if occupied)
    const evicted = this.ring[this.writeIdx]
    if (evicted !== undefined) {
      this.set.delete(evicted)
    }
    this.ring[this.writeIdx] = uuid
    this.set.add(uuid)
    this.writeIdx = (this.writeIdx + 1) % this.capacity
  }

  has(uuid: string): boolean {
    return this.set.has(uuid)
  }

  clear(): void {
    this.set.clear()
    this.ring.fill(undefined)
    this.writeIdx = 0
  }
}
