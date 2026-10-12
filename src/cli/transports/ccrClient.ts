import {installCCRWorkerState287,invokeCCRWorkerMethod287,getCCRInitErrorConstructor287,detachCCRWorkerPrerequisites287,enqueueCCRClientDurable287,adoptCCRHeartbeatPolicy287,closeCCRInternalSummary287} from './officialWorkerState287/runtime.js'
import type {BatchUploader287} from './officialWorkerState287/types.js'
import { randomUUID } from 'crypto'
import type {
  SDKPartialAssistantMessage,
  StdoutMessage,
} from 'src/entrypoints/sdk/controlTypes.js'
import { decodeJwtExpiry } from '../../bridge/jwtUtils.js'
import { logForDebugging } from '../../utils/debug.js'
import { createCombinedAbortSignal } from '../../utils/combinedAbortSignal.js'
import { logForDiagnosticsNoPII } from '../../utils/diagLogs.js'
import { errorMessage, getErrnoCode } from '../../utils/errors.js'
import { createAxiosInstance } from '../../utils/proxy.js'
import {
  unregisterSessionActivityCallback,
} from '../../utils/sessionActivity.js'
import {
  getSessionIngressAuthHeaders,
  getSessionIngressAuthToken,
} from '../../utils/sessionIngressAuth.js'
import type {
  RequiresActionDetails,
  SessionState,
  SessionWorkerState287,
} from '../../utils/sessionState.js'
import { getClaudeCodeUserAgent, getClaudeCodeClientPlatform } from '../../utils/userAgent.js'
import type { SSETransport, StreamClientEvent } from './SSETransport.js'
import type { WorkerStateUploader } from './WorkerStateUploader.js'

/** Default interval between heartbeat events (20s; server TTL is 60s). */
const DEFAULT_HEARTBEAT_INTERVAL_MS = 20_000
// Official 2.1.283 chunk-qy1nbbfs.js: ve / je. Without probe advertisement,
// the ordinary server-advised interval is bounded to 10s..5min.
const MIN_ADVISED_HEARTBEAT_INTERVAL_MS = 10_000
const MAX_ADVISED_HEARTBEAT_INTERVAL_MS = 300_000

/**
 * stream_event messages accumulate in a delay buffer for up to this many ms
 * before enqueue. Mirrors HybridTransport's batching window. text_delta
 * events for the same content block accumulate into a single full-so-far
 * snapshot per flush — each emitted event is self-contained so a client
 * connecting mid-stream sees complete text, not a fragment.
 */
const STREAM_EVENT_FLUSH_INTERVAL_MS = 100

/** Hoisted axios validateStatus callback to avoid per-request closure allocation. */
function alwaysValidStatus(): boolean {
  return true
}

export type CCRInitFailReason =
  | 'no_auth_headers'
  | 'missing_epoch'
  | 'worker_register_failed'

/** Thrown by initialize(); carries a typed reason for the diag classifier. */
export const CCRInitError=getCCRInitErrorConstructor287()
export type CCRInitError=InstanceType<typeof CCRInitError>

/**
 * Consecutive 401/403 with a VALID-LOOKING token before giving up. An
 * expired JWT short-circuits this (exits immediately — deterministic,
 * retry is futile). This threshold is for the uncertain case: token's
 * exp is in the future but server says 401 (userauth down, KMS hiccup,
 * clock skew). 10 × 20s heartbeat ≈ 200s to ride it out.
 */
const MAX_CONSECUTIVE_AUTH_FAILURES = 10

type EventPayload = {
  uuid: string
  type: string
  [key: string]: unknown
}

type ClientEvent = {
  payload: EventPayload
  ephemeral?: boolean
}

/**
 * Structural subset of a stream_event carrying a text_delta. Not a narrowing
 * of SDKPartialAssistantMessage — RawMessageStreamEvent's delta is a union and
 * narrowing through two levels defeats the discriminant.
 */
type CoalescedStreamEvent = {
  type: 'stream_event'
  uuid: string
  session_id: string
  parent_tool_use_id: string | null
  event: {
    type: 'content_block_delta'
    index: number
    delta: { type: 'text_delta'; text: string }
  }
}

/**
 * Accumulator state for text_delta coalescing. Keyed by API message ID so
 * lifetime is tied to the assistant message — cleared when the complete
 * SDKAssistantMessage arrives (writeEvent), which is reliable even when
 * abort/error paths skip content_block_stop/message_stop delivery.
 */
export type StreamAccumulatorState = {
  /** API message ID (msg_...) → blocks[blockIndex] → chunk array. */
  byMessage: Map<string, string[][]>
  /**
   * {session_id}:{parent_tool_use_id} → active message ID.
   * content_block_delta events don't carry the message ID (only
   * message_start does), so we track which message is currently streaming
   * for each scope. At most one message streams per scope at a time.
   */
  scopeToMessage: Map<string, string>
}

export function createStreamAccumulator(): StreamAccumulatorState {
  return { byMessage: new Map(), scopeToMessage: new Map() }
}

function scopeKey(m: {
  session_id: string
  parent_tool_use_id: string | null
}): string {
  return `${m.session_id}:${m.parent_tool_use_id ?? ''}`
}

/**
 * Accumulate text_delta stream_events into full-so-far snapshots per content
 * block. Each flush emits ONE event per touched block containing the FULL
 * accumulated text from the start of the block — a client connecting
 * mid-stream receives a self-contained snapshot, not a fragment.
 *
 * Non-text-delta events pass through unchanged. message_start records the
 * active message ID for the scope; content_block_delta appends chunks;
 * the snapshot event reuses the first text_delta UUID seen for that block in
 * this flush so server-side idempotency remains stable across retries.
 *
 * Cleanup happens in writeEvent when the complete assistant message arrives
 * (reliable), not here on stop events (abort/error paths skip those).
 */
export function accumulateStreamEvents(
  buffer: SDKPartialAssistantMessage[],
  state: StreamAccumulatorState,
): EventPayload[] {
  const out: EventPayload[] = []
  // chunks[] → snapshot already in `out` this flush. Keyed by the chunks
  // array reference (stable per {messageId, index}) so subsequent deltas
  // rewrite the same entry instead of emitting one event per delta.
  const touched = new Map<string[], CoalescedStreamEvent>()
  for (const msg of buffer) {
    switch (msg.event.type) {
      case 'message_start': {
        const id = msg.event.message.id
        const prevId = state.scopeToMessage.get(scopeKey(msg))
        if (prevId) state.byMessage.delete(prevId)
        state.scopeToMessage.set(scopeKey(msg), id)
        state.byMessage.set(id, [])
        out.push(msg)
        break
      }
      case 'content_block_delta': {
        if (msg.event.delta.type !== 'text_delta') {
          out.push(msg)
          break
        }
        const messageId = state.scopeToMessage.get(scopeKey(msg))
        const blocks = messageId ? state.byMessage.get(messageId) : undefined
        if (!blocks) {
          // Delta without a preceding message_start (reconnect mid-stream,
          // or message_start was in a prior buffer that got dropped). Pass
          // through raw — can't produce a full-so-far snapshot without the
          // prior chunks anyway.
          out.push(msg)
          break
        }
        const chunks = (blocks[msg.event.index] ??= [])
        chunks.push(msg.event.delta.text)
        const existing = touched.get(chunks)
        if (existing) {
          existing.event.delta.text = chunks.join('')
          break
        }
        const snapshot: CoalescedStreamEvent = {
          type: 'stream_event',
          uuid: msg.uuid,
          session_id: msg.session_id,
          parent_tool_use_id: msg.parent_tool_use_id,
          event: {
            type: 'content_block_delta',
            index: msg.event.index,
            delta: { type: 'text_delta', text: chunks.join('') },
          },
        }
        touched.set(chunks, snapshot)
        out.push(snapshot)
        break
      }
      default:
        out.push(msg)
    }
  }
  return out
}

/**
 * Clear accumulator entries for a completed assistant message. Called from
 * writeEvent when the SDKAssistantMessage arrives — the reliable end-of-stream
 * signal that fires even when abort/interrupt/error skip SSE stop events.
 */
export function clearStreamAccumulatorForMessage(
  state: StreamAccumulatorState,
  assistant: {
    session_id: string
    parent_tool_use_id: string | null
    message: { id: string }
  },
): void {
  state.byMessage.delete(assistant.message.id)
  const scope = scopeKey(assistant)
  if (state.scopeToMessage.get(scope) === assistant.message.id) {
    state.scopeToMessage.delete(scope)
  }
}

type RequestResult = { ok: true; data?: unknown } | { ok: false; retryAfterMs?: number; status?: number }

type WorkerEvent = {
  payload: EventPayload
  is_compaction?: boolean
  session_agent_id?: string
}

export type InternalEvent = {
  event_id: string
  event_type: string
  payload: Record<string, unknown>
  event_metadata?: Record<string, unknown> | null
  is_compaction: boolean
  created_at: string
  session_agent_id?: string
}

type ListInternalEventsResponse = {
  data: InternalEvent[]
  next_cursor?: string
}

/**
 * Manages the worker lifecycle protocol with CCR v2:
 * - Epoch management: reads worker_epoch from CLAUDE_CODE_WORKER_EPOCH env var
 * - Runtime state reporting: PUT /sessions/{id}/worker
 * - Heartbeat: POST /sessions/{id}/worker/heartbeat for liveness detection
 *
 * All writes go through this.request().
 */
export class CCRClient {
  private workerEpoch = 0
  private heartbeatIntervalMs: number
  private readonly heartbeatJitterFraction: number
  private heartbeatTimer: NodeJS.Timeout | null = null
  private heartbeatInFlight = false
  private closed = false
  private readonly lifetime = new AbortController()
  private readonly initStateGetOrderingBoundMs: number
  private probeBeatTimer: ReturnType<typeof setTimeout> | null = null
  private pendingProbeBeat = false
  private lastHeartbeatSentAtMs = 0
  private static activityOwner: CCRClient | undefined
  private consecutiveAuthFailures = 0
  private currentState: SessionState | null = null
  private readonly sessionBaseUrl: string
  private readonly sessionId: string
  private readonly http = createAxiosInstance({ keepAlive: true })

  // stream_event delay buffer — accumulates content deltas for up to
  // STREAM_EVENT_FLUSH_INTERVAL_MS before enqueueing (reduces POST count
  // and enables text_delta coalescing). Mirrors HybridTransport's pattern.
  private streamEventBuffer: SDKPartialAssistantMessage[] = []
  private streamEventTimer: ReturnType<typeof setTimeout> | null = null
  // Full-so-far text accumulator. Persists across flushes so each emitted
  // text_delta event carries the complete text from the start of the block —
  // mid-stream reconnects see a self-contained snapshot. Keyed by API message
  // ID; cleared in writeEvent when the complete assistant message arrives.
  private streamTextAccumulator = createStreamAccumulator()

  private readonly workerState!: WorkerStateUploader
  private readonly eventUploader!: BatchUploader287<ClientEvent>
  private readonly internalEventUploader!: BatchUploader287<WorkerEvent>
  private readonly deliveryUploader!: BatchUploader287<{
    eventId: string
    status: 'received' | 'processing' | 'processed'
  }>

  /**
   * Called when the server returns 409 (a newer worker epoch superseded ours).
   * Default: process.exit(1) — correct for spawn-mode children where the
   * parent bridge re-spawns. In-process callers (replBridge) MUST override
   * this to close gracefully instead; exit would kill the user's REPL.
   */
  private readonly onEpochMismatch: () => never

  /**
   * Auth header source. Defaults to the process-wide session-ingress token
   * (CLAUDE_CODE_SESSION_ACCESS_TOKEN env var). Callers managing multiple
   * concurrent sessions with distinct JWTs MUST inject this — the env-var
   * path is a process global and would stomp across sessions.
   */
  private readonly getAuthHeaders: () => Record<string, string>

  constructor(
    transport: SSETransport,
    sessionUrl: URL,
    opts?: {
      onEpochMismatch?: () => never
      heartbeatIntervalMs?: number
      heartbeatJitterFraction?: number
      initStateGetOrderingBoundMs?: number
      reportParkAtInit?:boolean
      initExternalMetadata?:Record<string,unknown>
      initialWorkerStatus?:SessionState
      gatesToolCalls?:boolean
      eventHoldEnabled?:()=>boolean
      internalEventUploader?:{maxBatchBytes?:number;maxConsecutiveFailures?:number;requestTimeoutMs?:number}
      toolCallRowGraceMs?:number
      onDiagnostic?:(message:string,level:'info'|'warn')=>void
      /**
       * Per-instance auth header source. Omit to read the process-wide
       * CLAUDE_CODE_SESSION_ACCESS_TOKEN (single-session callers — REPL,
       * daemon). Required for concurrent multi-session callers.
       */
      getAuthHeaders?: () => Record<string, string>
    },
  ) {
    this.initStateGetOrderingBoundMs = opts?.initStateGetOrderingBoundMs ?? 10_000
    this.onEpochMismatch =
      opts?.onEpochMismatch ??
      (() => {
        // eslint-disable-next-line custom-rules/no-process-exit
        process.exit(1)
      })
    this.heartbeatIntervalMs =
      opts?.heartbeatIntervalMs ?? DEFAULT_HEARTBEAT_INTERVAL_MS
    this.heartbeatJitterFraction = opts?.heartbeatJitterFraction ?? 0
    this.getAuthHeaders = opts?.getAuthHeaders ?? getSessionIngressAuthHeaders
    // Session URL: https://host/v1/code/sessions/{id}
    if (sessionUrl.protocol !== 'http:' && sessionUrl.protocol !== 'https:') {
      throw new Error(
        `CCRClient: Expected http(s) URL, got ${sessionUrl.protocol}`,
      )
    }
    const pathname = sessionUrl.pathname.replace(/\/$/, '')
    this.sessionBaseUrl = `${sessionUrl.protocol}//${sessionUrl.host}${pathname}`
    // Extract session ID from the URL path (last segment)
    this.sessionId = pathname.split('/').pop() || ''

    installCCRWorkerState287(this,sessionUrl,opts)

    // Ack each received client_event so CCR can track delivery status.
    // Wired here (not in initialize()) so the callback is registered the
    // moment new CCRClient() returns — remoteIO must be free to call
    // transport.connect() immediately after without racing the first
    // SSE catch-up frame against an unwired onEventCallback.
    transport.setOnEvent((event: StreamClientEvent) => {
      this.reportDelivery(event.event_id, 'received')
    })
    transport.setOnHeartbeatProbe(() => this.heartbeatNow())
  }

  /**
   * Initialize the session worker:
   * 1. Take worker_epoch from the argument, or fall back to
   *    CLAUDE_CODE_WORKER_EPOCH (set by env-manager / bridge spawner)
   * 2. Report state as 'idle'
   * 3. Start heartbeat timer
   *
   * In-process callers (replBridge) pass the epoch directly — they
   * registered the worker themselves and there is no parent process
   * setting env vars.
   */
  async initialize(epoch?:number):Promise<SessionWorkerState287> {
 const metadata=await invokeCCRWorkerMethod287<Promise<SessionWorkerState287>>(this,'initialize',[epoch])
 CCRClient.activityOwner=this
 return metadata
}

  // Control_requests are marked processed and not re-delivered on
  // restart, so read back what the prior worker wrote.
  private getWorkerState(context='worker_state',includeHearth=false):Promise<{metadata:SessionWorkerState287;projectsAssertion?:unknown;durationMs:number}> {
 return invokeCCRWorkerMethod287(this,'getWorkerState',[context,includeHearth])
}

  /**
   * Send an authenticated HTTP request to CCR. Handles auth headers,
   * 409 epoch mismatch, and error logging. Returns { ok: true } on 2xx.
   * On 429, reads Retry-After (integer seconds) so the uploader can honor
   * the server's backoff hint instead of blindly exponentiating.
   */
  private async request(
    method: 'post' | 'put',
    path: string,
    body: unknown,
    label: string,
    { timeout = 10_000, parseBody = false, signal }: { timeout?: number; parseBody?: boolean; signal?: AbortSignal } = {},
  ): Promise<RequestResult> {
    if (this.closed) return {ok: false}
    const authHeaders = this.getAuthHeaders()
    if (Object.keys(authHeaders).length === 0) return { ok: false }

    try {
      const response = await this.http[method]<unknown>(
        `${this.sessionBaseUrl}${path}`,
        body,
        {
          headers: {
            ...authHeaders,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'anthropic-client-platform': getClaudeCodeClientPlatform(),
            'User-Agent': getClaudeCodeUserAgent(),
          },
          validateStatus: alwaysValidStatus,
          signal: signal ?? this.lifetime.signal,
          timeout,
        },
      )

      if (this.closed) return {ok: false}
      if (response.status >= 200 && response.status < 300) {
        this.consecutiveAuthFailures = 0
        return parseBody ? { ok: true, data: response.data } : { ok: true }
      }
      if (response.status === 409) {
        this.handleEpochMismatch()
      }
      if (response.status === 401 || response.status === 403) {
        // A 401 with an expired JWT is deterministic — no retry will
        // ever succeed. Check the token's own exp before burning
        // wall-clock on the threshold loop.
        const tok = getSessionIngressAuthToken()
        const exp = tok ? decodeJwtExpiry(tok) : null
        if (exp !== null && exp * 1000 < Date.now()) {
          logForDebugging(
            `CCRClient: session_token expired (exp=${new Date(exp * 1000).toISOString()}) — no refresh was delivered, exiting`,
            { level: 'error' },
          )
          logForDiagnosticsNoPII('error', 'cli_worker_token_expired_no_refresh')
          this.onEpochMismatch()
        }
        // Token looks valid but server says 401 — possible server-side
        // blip (userauth down, KMS hiccup). Count toward threshold.
        this.consecutiveAuthFailures++
        if (this.consecutiveAuthFailures >= MAX_CONSECUTIVE_AUTH_FAILURES) {
          logForDebugging(
            `CCRClient: ${this.consecutiveAuthFailures} consecutive auth failures with a valid-looking token — server-side auth unrecoverable, exiting`,
            { level: 'error' },
          )
          logForDiagnosticsNoPII('error', 'cli_worker_auth_failures_exhausted')
          this.onEpochMismatch()
        }
      }
      logForDebugging(`CCRClient: ${label} returned ${response.status}`, {
        level: 'warn',
      })
      logForDiagnosticsNoPII('warn', 'cli_worker_request_failed', {
        method,
        path,
        status: response.status,
      })
      if (response.status === 429) {
        const raw = response.headers?.['retry-after']
        const seconds = typeof raw === 'string' ? parseInt(raw, 10) : NaN
        if (!isNaN(seconds) && seconds >= 0) {
          return { ok: false, retryAfterMs: seconds * 1000, status: response.status }
        }
      }
      return { ok: false, status: response.status }
    } catch (error) {
      logForDebugging(`CCRClient: ${label} failed: ${errorMessage(error)}`, {
        level: 'warn',
      })
      logForDiagnosticsNoPII('warn', 'cli_worker_request_error', {
        method,
        path,
        error_code: getErrnoCode(error),
      })
      return { ok: false }
    }
  }

  /** Report worker state to CCR via PUT /sessions/{id}/worker. */
  reportState(state:SessionState,details?:RequiresActionDetails):void {
 invokeCCRWorkerMethod287(this,'reportState',[state,details])
}

  /** Report external metadata to CCR via PUT /worker. */
  reportMetadata(metadata: Record<string, unknown>): void {
    this.workerState.enqueue({ external_metadata: metadata })
  }

  reportInternalMetadata(metadata:Record<string,unknown>):void {
    invokeCCRWorkerMethod287(this,'reportInternalMetadata',[metadata])
  }
  flushWorkerState():Promise<boolean> { return invokeCCRWorkerMethod287(this,'flushWorkerState') }
  get droppedWorkerStatePatches():number { return invokeCCRWorkerMethod287(this,'droppedWorkerStatePatches') }

  /**
   * Handle epoch mismatch (409 Conflict). A newer CC instance has replaced
   * this one — exit immediately.
   */
  private handleEpochMismatch(): never {
    logForDebugging('CCRClient: Epoch mismatch (409), shutting down', {
      level: 'error',
    })
    logForDiagnosticsNoPII('error', 'cli_worker_epoch_mismatch')
    this.onEpochMismatch()
  }

  /** Start periodic heartbeat. */
  private startHeartbeat(): void {
    this.stopHeartbeat()
    if (this.closed) return
    const schedule = (): void => {
      const jitter =
        this.heartbeatIntervalMs *
        this.heartbeatJitterFraction *
        (2 * Math.random() - 1)
      this.heartbeatTimer = setTimeout(tick, this.heartbeatIntervalMs + jitter)
    }
    const tick = (): void => {
      void this.sendHeartbeat()
      // stopHeartbeat nulls the timer; check after the fire-and-forget send
      // but before rescheduling so close() during sendHeartbeat is honored.
      if (this.heartbeatTimer === null) return
      schedule()
    }
    schedule()
  }

  /** Stop heartbeat timer. */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  /** Official probe path: coalesce in-flight probes and enforce 5s spacing. */
  private heartbeatNow(): void {
    if (this.closed) return
    this.pendingProbeBeat = true
    if (this.heartbeatInFlight || this.probeBeatTimer) return
    const remaining = 5_000 - (Date.now() - this.lastHeartbeatSentAtMs)
    if (remaining > 0) {
      this.probeBeatTimer = setTimeout(() => {
        this.probeBeatTimer = null
        this.heartbeatNow()
      }, remaining)
      return
    }
    this.pendingProbeBeat = false
    void this.sendHeartbeat()
  }

  /** Complete fM.applyShorterIntervalNow, adapted only to TypeScript names. */
  private applyShorterIntervalNow(intervalMs: number): void {
    if (intervalMs >= this.heartbeatIntervalMs) return
    this.heartbeatIntervalMs = intervalMs
    if (this.heartbeatTimer !== null) this.startHeartbeat()
  }

  /** Send a heartbeat via POST /sessions/{id}/worker/heartbeat. */
  private async sendHeartbeat(): Promise<void> {
    if (this.closed || this.heartbeatInFlight) return
    this.heartbeatInFlight = true
    this.lastHeartbeatSentAtMs = Date.now()
    // Official fM.sendHeartbeat: qe=5000, Te=15000, we=5000.
    // Use configured jitter's lower cadence bound, not a random jitter draw.
    const timeoutMs = Math.max(5_000, Math.min(15_000,
      this.heartbeatIntervalMs * (1 - this.heartbeatJitterFraction) - 5_000))
    // Axios HTTP timeout alone can be refreshed by socket activity. This
    // separate signal bounds the entire request/body and still honors close().
    const deadline = createCombinedAbortSignal(this.lifetime.signal, {timeoutMs})
    try {
      const result = await this.request(
        'post',
        '/worker/heartbeat',
        { session_id: this.sessionId, worker_epoch: this.workerEpoch },
        'Heartbeat',
        { timeout: timeoutMs, parseBody: true, signal: deadline.signal },
      )
      if (result.ok === false || this.closed) return
      logForDebugging('CCRClient: Heartbeat sent')
      // fM.sendHeartbeat's baseline response path: probe advertisement and
      // auth-adoption are not enabled here, so its token clamp is identity and
      // maxAdvisedIntervalFor(false) is je. Do not advertise advanced support.
      const data = result.data
      adoptCCRHeartbeatPolicy287(this,data)
      const seconds = data !== null && typeof data === 'object' &&
        'heartbeat_interval_seconds' in data ? data.heartbeat_interval_seconds : undefined
      if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds <= 0) return
      const intervalMs = Math.min(Math.max(seconds * 1000,
        MIN_ADVISED_HEARTBEAT_INTERVAL_MS), MAX_ADVISED_HEARTBEAT_INTERVAL_MS)
      if (intervalMs === this.heartbeatIntervalMs) return
      logForDiagnosticsNoPII('info', 'cli_heartbeat_interval_updated', {
        from_ms: this.heartbeatIntervalMs, to_ms: intervalMs,
      })
      if (intervalMs < this.heartbeatIntervalMs) this.applyShorterIntervalNow(intervalMs)
      else this.heartbeatIntervalMs = intervalMs
    } finally {
      deadline.cleanup()
      this.heartbeatInFlight = false
      if (this.pendingProbeBeat && !this.closed) this.heartbeatNow()
    }
  }

  /**
   * Write a StdoutMessage as a client event via POST /sessions/{id}/worker/events.
   * These events are visible to frontend clients via the SSE stream.
   * Injects a UUID if missing to ensure server-side idempotency on retry.
   *
   * stream_event messages are held in a 100ms delay buffer and accumulated
   * (text_deltas for the same content block emit a full-so-far snapshot per
   * flush). A non-stream_event write flushes the buffer first so downstream
   * ordering is preserved.
   */
  async writeEvent(message: StdoutMessage): Promise<void> {
    if (this.closed) return
    if (message.type === 'stream_event') {
      this.streamEventBuffer.push(message)
      if (!this.streamEventTimer) {
        this.streamEventTimer = setTimeout(
          () => void this.flushStreamEventBuffer(),
          STREAM_EVENT_FLUSH_INTERVAL_MS,
        )
      }
      return
    }
    await this.flushStreamEventBuffer()
    if (message.type === 'assistant') {
      clearStreamAccumulatorForMessage(this.streamTextAccumulator, message)
    }
    const event=this.toClientEvent(message)
    await enqueueCCRClientDurable287(this,message,event)
  }

  /** Wrap a StdoutMessage as a ClientEvent, injecting a UUID if missing. */
  private toClientEvent(message: StdoutMessage): ClientEvent {
    const msg = message as unknown as Record<string, unknown>
    return {
      payload: {
        ...msg,
        uuid: typeof msg.uuid === 'string' ? msg.uuid : randomUUID(),
      } as EventPayload,
    }
  }

  /**
   * Drain the stream_event delay buffer: accumulate text_deltas into
   * full-so-far snapshots, clear the timer, enqueue the resulting events.
   * Called from the timer, from writeEvent on a non-stream message, and from
   * flush(). close() drops the buffer — call flush() first if you need
   * delivery.
   */
  private async flushStreamEventBuffer(): Promise<void> {
    if (this.streamEventTimer) {
      clearTimeout(this.streamEventTimer)
      this.streamEventTimer = null
    }
    if (this.streamEventBuffer.length === 0) return
    const buffered = this.streamEventBuffer
    this.streamEventBuffer = []
    const payloads = accumulateStreamEvents(
      buffered,
      this.streamTextAccumulator,
    )
    await this.eventUploader.enqueue(
      payloads.map(payload => ({ payload, ephemeral: true })),
    )
  }

  /**
   * Write an internal worker event via POST /sessions/{id}/worker/internal-events.
   * These events are NOT visible to frontend clients — they store worker-internal
   * state (transcript messages, compaction markers) needed for session resume.
   */
  async writeInternalEvent(
    eventType: string,
    payload: Record<string, unknown>,
    {
      isCompaction = false,
      agentId,
      preservedEventIds,
    }: {
      isCompaction?: boolean
      agentId?: string
      preservedEventIds?:string[]
    } = {},
  ): Promise<void> {
    return invokeCCRWorkerMethod287(this,'writeInternalEvent',[eventType,payload,{isCompaction,agentId,preservedEventIds}])
  }

  /**
   * Flush pending internal events. Call between turns and on shutdown
   * to ensure transcript entries are persisted.
   */
  flushInternalEvents(): Promise<void> {
    return invokeCCRWorkerMethod287(this,'flushInternalEvents')
  }

  /**
   * Flush pending client events (writeEvent queue). Call before close()
   * when the caller needs delivery confirmation — close() abandons the
   * queue. Resolves once the uploader drains or rejects; returns
   * regardless of whether individual POSTs succeeded (check server state
   * separately if that matters).
   */
  async flush(): Promise<void> {
    await this.flushStreamEventBuffer()
    return this.eventUploader.flush()
  }

  /**
   * Read foreground agent internal events from
   * GET /sessions/{id}/worker/internal-events.
   * Returns transcript entries from the last compaction boundary, or null on failure.
   * Used for session resume.
   */
  async readInternalEvents(): Promise<InternalEvent[] | null> {
    return this.paginatedGet('/worker/internal-events', {}, 'internal_events')
  }

  /**
   * Read all subagent internal events from
   * GET /sessions/{id}/worker/internal-events?subagents=true.
   * Returns a merged stream across all non-foreground agents, each from its
   * compaction point. Used for session resume.
   */
  async readSubagentInternalEvents(): Promise<InternalEvent[] | null> {
    return this.paginatedGet(
      '/worker/internal-events',
      { subagents: 'true' },
      'subagent_events',
    )
  }

  /**
   * Paginated GET with retry. Fetches all pages from a list endpoint,
   * retrying each page on failure with exponential backoff + jitter.
   */
  private async paginatedGet(
    path: string,
    params: Record<string, string>,
    context: string,
  ): Promise<InternalEvent[] | null> {
    const authHeaders = this.getAuthHeaders()
    if (Object.keys(authHeaders).length === 0) return null

    const allEvents: InternalEvent[] = []
    let cursor: string | undefined

    do {
      const url = new URL(`${this.sessionBaseUrl}${path}`)
      for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v)
      }
      if (cursor) {
        url.searchParams.set('cursor', cursor)
      }

      const page = await this.getWithRetry<ListInternalEventsResponse>(
        url.toString(),
        authHeaders,
        context,
      )
      if (!page) return null

      allEvents.push(...(page.data ?? []))
      cursor = page.next_cursor
    } while (cursor)

    logForDebugging(
      `CCRClient: Read ${allEvents.length} internal events from ${path}${params.subagents ? ' (subagents)' : ''}`,
    )
    return allEvents
  }

  /**
   * Single GET request with retry. Returns the parsed response body
   * on success, null if all retries are exhausted.
   */
  private async getWithRetry<T>(
    url: string,
    authHeaders: Record<string, string>,
    context: string,
  ): Promise<T | null> {
    for (let attempt = 1; attempt <= 10; attempt++) {
      if (this.closed) return null
      let response
      try {
        response = await this.http.get<T>(url, {
          headers: {
            ...authHeaders,
            'anthropic-version': '2023-06-01',
            'anthropic-client-platform': getClaudeCodeClientPlatform(),
            'User-Agent': getClaudeCodeUserAgent(),
          },
          validateStatus: alwaysValidStatus,
          timeout: 30_000,
          signal: this.lifetime.signal,
        })
      } catch (error) {
        logForDebugging(
          `CCRClient: GET ${url} failed (attempt ${attempt}/10): ${errorMessage(error)}`,
          { level: 'warn' },
        )
        if (this.closed) return null
        if (attempt < 10) {
          const delay =
            Math.min(500 * 2 ** (attempt - 1), 30_000) + Math.random() * 500
          await this.waitForRetry(delay)
        }
        continue
      }

      if (this.closed) return null
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      if (response.status === 409) {
        this.handleEpochMismatch()
      }
      logForDebugging(
        `CCRClient: GET ${url} returned ${response.status} (attempt ${attempt}/10)`,
        { level: 'warn' },
      )

      if (attempt < 10) {
        const delay =
          Math.min(500 * 2 ** (attempt - 1), 30_000) + Math.random() * 500
        await this.waitForRetry(delay)
      }
    }

    logForDebugging('CCRClient: GET retries exhausted', { level: 'error' })
    logForDiagnosticsNoPII('error', 'cli_worker_get_retries_exhausted', {
      context,
    })
    return null
  }

  /**
   * Report delivery status for a client-to-worker event.
   * POST /v1/code/sessions/{id}/worker/events/delivery (batch endpoint)
   */
  reportDelivery(
    eventId: string,
    status: 'received' | 'processing' | 'processed',
  ): void {
    void this.deliveryUploader.enqueue({ eventId, status })
  }

  /** Get the current epoch (for external use). */
  getWorkerEpoch(): number {
    return this.workerEpoch
  }

  /** Internal-event queue depth — shutdown-snapshot backpressure signal. */
  get internalEventsPending(): number {
    return invokeCCRWorkerMethod287(this,'internalEventsPending')
  }

  /** Local cancellation adapter: closing also interrupts outstanding retry waits. */
  private waitForRetry(ms: number): Promise<void> {
    if (this.closed) return Promise.resolve()
    return new Promise(resolve => {
      const done = () => {
        clearTimeout(timer)
        this.lifetime.signal.removeEventListener('abort', done)
        resolve()
      }
      const timer = setTimeout(done, ms)
      this.lifetime.signal.addEventListener('abort', done, {once: true})
    })
  }

  /** Clean up uploaders and timers. */
  close(): void {
    if (this.closed) return
    this.closed = true
    detachCCRWorkerPrerequisites287(this,CCRClient.activityOwner===this)
    this.lifetime.abort()
    this.stopHeartbeat()
    if (this.probeBeatTimer) clearTimeout(this.probeBeatTimer)
    this.probeBeatTimer = null
    this.pendingProbeBeat = false
    if (CCRClient.activityOwner === this) {
      unregisterSessionActivityCallback()
      CCRClient.activityOwner = undefined
    }
    if (this.streamEventTimer) {
      clearTimeout(this.streamEventTimer)
      this.streamEventTimer = null
    }
    this.streamEventBuffer = []
    this.streamTextAccumulator.byMessage.clear()
    this.streamTextAccumulator.scopeToMessage.clear()
    this.workerState.close()
    this.eventUploader.close()
    closeCCRInternalSummary287(this)
    this.deliveryUploader.close()
  }
}
