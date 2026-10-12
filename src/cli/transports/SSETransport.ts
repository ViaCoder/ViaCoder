import axios, { type AxiosError } from 'axios'
import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js'
import { logForDebugging } from '../../utils/debug.js'
import { logForDiagnosticsNoPII } from '../../utils/diagLogs.js'
import { errorMessage } from '../../utils/errors.js'
import { getSessionIngressAuthHeaders } from '../../utils/sessionIngressAuth.js'
import { sleep } from '../../utils/sleep.js'
import { jsonParse, jsonStringify } from '../../utils/slowOperations.js'
import { getClaudeCodeUserAgent, getClaudeCodeClientPlatform } from '../../utils/userAgent.js'
import type { Transport } from './Transport.js'
import {Sbt, type SSEFrame} from '../../vendor/official-session-transports/sse-parser.js'
import {reconcileCredentialHeaders} from '../../vendor/official-session-transports/protocol.js'
import {$1 as drainResponseBody, v9t as RESPONSE_DRAIN_TIMEOUT_MS} from '../../vendor/official-session-transports/response-body.js'
import {getSSERequestOptions} from './sseRequestOptions.js'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const RECONNECT_BASE_DELAY_MS = 1000
const RECONNECT_MAX_DELAY_MS = 30_000
/** Server sends keepalives every 15s; treat connection as dead after 45s of silence. */
const DEFAULT_KEEPALIVE_SECONDS = 15
const MAX_KEEPALIVE_SECONDS = 60
const LIVENESS_GRACE_MS = 30_000

/**
 * HTTP status codes that indicate a permanent server-side rejection.
 * The transport transitions to 'closed' immediately without retrying.
 */
const PERMANENT_HTTP_CODES = new Set([401, 403, 404])

// POST retry configuration (matches HybridTransport)
const POST_MAX_RETRIES = 10
const POST_BASE_DELAY_MS = 500
const POST_MAX_DELAY_MS = 8000
// Official chunk-qy1nbbfs.js:zor — these payload kinds must be server-authored.
const SERVER_ONLY_EVENT_TYPES = new Set(['workflow_launch', 'queued_notification', 'session_notice'])

/** Hoisted axios validateStatus callback to avoid per-request closure allocation. */
function alwaysValidStatus(): boolean {
  return true
}

// ---------------------------------------------------------------------------
// SSE Frame Parser
// ---------------------------------------------------------------------------

/** Compatibility entry point; the stream itself keeps one official decoder.
 * Do not flush at EOF: official _bt.readStream also calls push(), not flush().
 */
export function parseSSEFrames(buffer: string): {frames: SSEFrame[]; remaining: string} {
  const parser = new Sbt()
  return {frames: parser.push(buffer), remaining: parser.buffered()}
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SSETransportState =
  | 'idle'
  | 'connected'
  | 'reconnecting'
  | 'closing'
  | 'closed'

/**
 * Payload for `event: client_event` frames, matching the StreamClientEvent
 * proto message in session_stream.proto. Ephemeral signals are separate from
 * durable client events and must not advance this stream's resumption cursor.
 */
export type StreamClientEvent = {
  event_id: string
  sequence_num: number
  event_type: string
  source: string
  payload: Record<string, unknown>
  created_at: string
}

// ---------------------------------------------------------------------------
// SSETransport
// ---------------------------------------------------------------------------

/**
 * Transport that uses SSE for reading and HTTP POST for writing.
 *
 * Reads events via Server-Sent Events from the CCR v2 event stream endpoint.
 * Writes events via HTTP POST with retry logic (same pattern as HybridTransport).
 *
 * Each `event: client_event` frame carries a StreamClientEvent proto JSON
 * directly in `data:`. The transport extracts `payload` and passes it to
 * `onData` as newline-delimited JSON for StructuredIO consumers.
 *
 * Supports automatic reconnection with exponential backoff and Last-Event-ID
 * for resumption after disconnection.
 */
export class SSETransport implements Transport {
  private state: SSETransportState = 'idle'
  private onData?: (data: string) => void
  private onCloseCallback?: (closeCode?: number) => void
  private onEventCallback?: (event: StreamClientEvent) => void
  private headers: Record<string, string>
  private sessionId?: string
  private refreshHeaders?: () => Record<string, string>
  private readonly getAuthHeaders: () => Record<string, string>

  // SSE connection state
  private abortController: AbortController | null = null
  private lastSequenceNum = 0
  private seenSequenceNums = new Set<number>()

  // Reconnection state
  private hasEverConnected = false
  private onReconnected?: () => void
  private onHeartbeatProbe?: () => void
  private onOwnerPresent?: () => void
  private advertisedMaxIntervalSeconds?: number
  private echoedIntervalSeconds?: number
  private reconnectAttempts = 0
  private reconnectStartTime: number | null = null
  private reconnectTimer: NodeJS.Timeout | null = null

  // Liveness detection
  private livenessTimer: NodeJS.Timeout | null = null

  // POST URL (derived from SSE URL)
  private postUrl: string

  // Runtime epoch for CCR v2 event format

  constructor(
    private readonly url: URL,
    headers: Record<string, string> = {},
    sessionId?: string,
    refreshHeaders?: () => Record<string, string>,
    initialSequenceNum?: number,
    /**
     * Per-instance auth header source. Omit to read the process-wide
     * CLAUDE_CODE_SESSION_ACCESS_TOKEN (single-session callers). Required
     * for concurrent multi-session callers — the env-var path is a process
     * global and would stomp across sessions.
     */
    getAuthHeaders?: () => Record<string, string>,
    private readonly sseKeepaliveMaxIntervalSeconds?: () => number,
  ) {
    this.headers = headers
    this.sessionId = sessionId
    this.refreshHeaders = refreshHeaders
    this.getAuthHeaders = getAuthHeaders ?? getSessionIngressAuthHeaders
    this.postUrl = convertSSEUrlToPostUrl(url)
    // Seed with a caller-provided high-water mark so the first connect()
    // sends from_sequence_num / Last-Event-ID. Without this, a fresh
    // SSETransport always asks the server to replay from sequence 0 —
    // the entire session history on every transport swap.
    if (initialSequenceNum !== undefined && initialSequenceNum > 0) {
      this.lastSequenceNum = initialSequenceNum
    }
    logForDebugging(`SSETransport: SSE URL = ${url.href}`)
    logForDebugging(`SSETransport: POST URL = ${this.postUrl}`)
    logForDiagnosticsNoPII('info', 'cli_sse_transport_initialized')
  }

  /**
   * High-water mark of sequence numbers seen on this stream. Callers that
   * recreate the transport (e.g. replBridge onWorkReceived) read this before
   * close() and pass it as `initialSequenceNum` to the next instance so the
   * server resumes from the right point instead of replaying everything.
   */
  getLastSequenceNum(): number {
    return this.lastSequenceNum
  }

  async connect(): Promise<void> {
    if (this.state !== 'idle' && this.state !== 'reconnecting') {
      logForDebugging(
        `SSETransport: Cannot connect, current state is ${this.state}`,
        { level: 'error' },
      )
      logForDiagnosticsNoPII('error', 'cli_sse_connect_failed')
      return
    }

    this.state = 'reconnecting'
    const connectStartTime = Date.now()
    // Official _bt.connect / De: clamp to 15..60, advertise 3× tolerance.
    const interval = Math.min(MAX_KEEPALIVE_SECONDS, Math.max(
      DEFAULT_KEEPALIVE_SECONDS, Math.floor(Number(this.sseKeepaliveMaxIntervalSeconds?.())),
    ))
    this.advertisedMaxIntervalSeconds = interval > DEFAULT_KEEPALIVE_SECONDS ? interval : undefined
    this.echoedIntervalSeconds = undefined

    // Build SSE URL with sequence number for resumption
    const sseUrl = new URL(this.url.href)
    if (this.lastSequenceNum > 0) {
      sseUrl.searchParams.set('from_sequence_num', String(this.lastSequenceNum))
    }

    if (this.advertisedMaxIntervalSeconds !== undefined) {
      sseUrl.searchParams.set('keepalive_tolerance_seconds', String(3 * this.advertisedMaxIntervalSeconds))
    }

    // Build headers -- use fresh auth headers (supports Cookie for session keys).
    // Remove stale Authorization header from this.headers when Cookie auth is used,
    // since sending both confuses the auth interceptor.
    const authHeaders = this.getAuthHeaders()
    const headers: Record<string, string> = {
      ...this.headers,
      ...authHeaders,
      Accept: 'text/event-stream',
      'anthropic-version': '2023-06-01',
      'anthropic-client-platform': getClaudeCodeClientPlatform(),
      'User-Agent': getClaudeCodeUserAgent(),
    }
    reconcileCredentialHeaders(headers, authHeaders)
    if (this.lastSequenceNum > 0) {
      headers['Last-Event-ID'] = String(this.lastSequenceNum)
    }

    logForDebugging(`SSETransport: Opening ${sseUrl.href}`)
    logForDiagnosticsNoPII('info', 'cli_sse_connect_opening')

    const controller = new AbortController()
    this.abortController = controller

    try {
      // eslint-disable-next-line eslint-plugin-n/no-unsupported-features/node-builtins
      const response = await fetch(sseUrl.href, {
        headers,
        signal: controller.signal,
        ...getSSERequestOptions(sseUrl.href),
      })

      if (!response.ok) {
        await drainResponseBody(response, {timeoutMs: RESPONSE_DRAIN_TIMEOUT_MS})
        if (controller.signal.aborted) return
        const isPermanent = PERMANENT_HTTP_CODES.has(response.status)
        logForDebugging(
          `SSETransport: HTTP ${response.status}${isPermanent ? ' (permanent)' : ''}`,
          { level: 'error' },
        )
        logForDiagnosticsNoPII('error', 'cli_sse_connect_http_error', {
          status: response.status,
        })

        if (isPermanent) {
          this.state = 'closed'
          this.onCloseCallback?.(response.status)
          return
        }

        this.handleConnectionError()
        return
      }

      if (!response.body) {
        logForDebugging('SSETransport: No response body')
        this.handleConnectionError()
        return
      }

      if (controller.signal.aborted) return
      if (this.advertisedMaxIntervalSeconds !== undefined) {
        const echoed = Number(response.headers.get('x-ccr-sse-keepalive-interval-seconds'))
        if (Number.isInteger(echoed) && echoed > 0) {
          this.echoedIntervalSeconds = Math.min(MAX_KEEPALIVE_SECONDS, Math.max(DEFAULT_KEEPALIVE_SECONDS, echoed))
        }
      }

      // Successfully connected
      const connectDuration = Date.now() - connectStartTime
      logForDebugging('SSETransport: Connected')
      logForDiagnosticsNoPII('info', 'cli_sse_connect_connected', {
        duration_ms: connectDuration,
      })

      const wasConnected = this.hasEverConnected
      this.hasEverConnected = true
      this.state = 'connected'
      this.reconnectAttempts = 0
      this.reconnectStartTime = null
      this.resetLivenessTimer()

      if (wasConnected) {
        try { this.onReconnected?.() } catch (error) {
          logForDebugging(`SSETransport: onReconnected handler threw: ${errorMessage(error)}`, {level: 'error'})
        }
      }

      // Read the SSE stream
      await this.readStream(response.body)
    } catch (error) {
      if (this.abortController?.signal.aborted) {
        // Intentional close
        return
      }

      logForDebugging(
        `SSETransport: Connection error: ${errorMessage(error)}`,
        { level: 'error' },
      )
      logForDiagnosticsNoPII('error', 'cli_sse_connect_error')
      this.handleConnectionError()
    }
  }

  /**
   * Read and process the SSE stream body.
   */
  // eslint-disable-next-line eslint-plugin-n/no-unsupported-features/node-builtins
  private async readStream(body: ReadableStream<Uint8Array>): Promise<void> {
    const reader = body.getReader()
    const parser = new Sbt()

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const frames = parser.push(value)

        for (const frame of frames) {
          // Any frame (including keepalive comments) proves the connection is alive
          this.resetLivenessTimer()

          if (frame.id && frame.event !== 'ephemeral_event') {
            const seqNum = parseInt(frame.id, 10)
            if (!isNaN(seqNum)) {
              if (this.seenSequenceNums.has(seqNum)) {
                logForDebugging(
                  `SSETransport: DUPLICATE frame seq=${seqNum} (lastSequenceNum=${this.lastSequenceNum}, seenCount=${this.seenSequenceNums.size})`,
                  { level: 'warn' },
                )
                logForDiagnosticsNoPII('warn', 'cli_sse_duplicate_sequence')
              } else {
                this.seenSequenceNums.add(seqNum)
                // Prevent unbounded growth: once we have many entries, prune
                // old sequence numbers that are well below the high-water mark.
                // Only sequence numbers near lastSequenceNum matter for dedup.
                if (this.seenSequenceNums.size > 1000) {
                  const threshold = this.lastSequenceNum - 200
                  for (const s of this.seenSequenceNums) {
                    if (s < threshold) {
                      this.seenSequenceNums.delete(s)
                    }
                  }
                }
              }
              if (seqNum > this.lastSequenceNum) {
                this.lastSequenceNum = seqNum
              }
            }
          }

          if (frame.event && frame.data) {
            this.handleSSEFrame(frame.event, frame.data)
          } else if (frame.data) {
            // data: without event: — server is emitting the old envelope format
            // or a bug. Log so incidents show as a signal instead of silent drops.
            logForDebugging(
              'SSETransport: Frame has data: but no event: field — dropped',
              { level: 'warn' },
            )
            logForDiagnosticsNoPII('warn', 'cli_sse_frame_missing_event_field')
          }
        }
      }
    } catch (error) {
      if (this.abortController?.signal.aborted) return
      logForDebugging(
        `SSETransport: Stream read error: ${errorMessage(error)}`,
        { level: 'error' },
      )
      logForDiagnosticsNoPII('error', 'cli_sse_stream_read_error')
    } finally {
      reader.releaseLock()
    }

    // Stream ended — reconnect unless we're closing
    if (this.state !== 'closing' && this.state !== 'closed') {
      logForDebugging('SSETransport: Stream ended, reconnecting')
      this.handleConnectionError()
    }
  }

  /**
   * Handle a single SSE frame. The event: field names the variant; data:
   * carries the inner proto JSON directly (no envelope).
   *
   * Only durable client_event messages are delivered to StructuredIO. The
   * ephemeral signals only reach their typed callbacks, never model input or cursor progress.
   */
  private handleSSEFrame(eventType: string, data: string): void {
    if (eventType === 'ephemeral_event') {
      // Official Vt validates {event_type: string}, with unknown keys stripped.
      try {
        const event: unknown = jsonParse(data)
        if (!event || typeof event !== 'object' || !('event_type' in event)) return
        if (event.event_type === 'heartbeat_probe') this.onHeartbeatProbe?.()
        else if (event.event_type === 'owner_present') this.onOwnerPresent?.()
      } catch (error) {
        logForDebugging(`SSETransport: ephemeral event handler failed: ${errorMessage(error)}`, {level: 'error'})
      }
      return
    }
    if (eventType !== 'client_event') {
      logForDebugging(
        `SSETransport: Unexpected SSE event type '${eventType}' on worker stream`,
        { level: 'warn' },
      )
      logForDiagnosticsNoPII('warn', 'cli_sse_unexpected_event_type', {
        event_type: eventType,
      })
      return
    }

    let ev: StreamClientEvent
    try {
      ev = jsonParse(data) as StreamClientEvent
    } catch (error) {
      logForDebugging(
        `SSETransport: Failed to parse client_event data: ${errorMessage(error)}`,
        { level: 'error' },
      )
      return
    }

    const payload = ev.payload
    if (payload && typeof payload === 'object' && 'type' in payload) {
      const sessionLabel = this.sessionId ? ` session=${this.sessionId}` : ''
      logForDebugging(
        `SSETransport: Event seq=${ev.sequence_num} event_id=${ev.event_id} event_type=${ev.event_type} payload_type=${String(payload.type)}${sessionLabel}`,
      )
      logForDiagnosticsNoPII('info', 'cli_sse_message_received')
      // Pass the unwrapped payload as newline-delimited JSON,
      // matching the format that StructuredIO/WebSocketTransport consumers expect
      if (typeof payload.type === 'string' && SERVER_ONLY_EVENT_TYPES.has(payload.type) && ev.event_type !== payload.type) {
        logForDebugging('SSETransport: server-only event type mismatch, dropped', {level: 'warn'})
      } else if (payload.type === 'control_request' && ev.source === 'worker') {
        logForDebugging('SSETransport: worker control_request dropped', {level: 'warn'})
      } else {
        this.onData?.(jsonStringify(payload) + '\n')
      }
    } else {
      logForDebugging(
        `SSETransport: Ignoring client_event with no type in payload: event_id=${ev.event_id}`,
      )
    }

    this.onEventCallback?.(ev)
  }

  /**
   * Official _bt: retry transient failures until close/permanent rejection,
   * with exponential backoff (no elapsed-time give-up deadline).
   */
  private handleConnectionError(): void {
    this.clearLivenessTimer()

    if (this.state === 'closing' || this.state === 'closed') return

    // Abort any in-flight SSE fetch
    this.abortController?.abort()
    this.abortController = null

    const now = Date.now()
    if (!this.reconnectStartTime) {
      this.reconnectStartTime = now
    }

    const elapsed = now - this.reconnectStartTime
    // Clear any existing timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    // Refresh headers before reconnecting
    if (this.refreshHeaders) {
      const freshHeaders = this.refreshHeaders()
      Object.assign(this.headers, freshHeaders)
      reconcileCredentialHeaders(this.headers, freshHeaders)
      logForDebugging('SSETransport: Refreshed headers for reconnect')
    }

    this.state = 'reconnecting'
    this.reconnectAttempts++

    const baseDelay = Math.min(
      RECONNECT_BASE_DELAY_MS * Math.pow(2, this.reconnectAttempts - 1),
      RECONNECT_MAX_DELAY_MS,
    )
    // Add ±25% jitter
    const delay = Math.max(
      0,
      baseDelay + baseDelay * 0.25 * (2 * Math.random() - 1),
    )

    logForDebugging(
      `SSETransport: Reconnecting in ${Math.round(delay)}ms (attempt ${this.reconnectAttempts}, ${Math.round(elapsed / 1000)}s elapsed)`,
    )
    logForDiagnosticsNoPII('error', 'cli_sse_reconnect_attempt', {
      reconnectAttempts: this.reconnectAttempts,
    })

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      void this.connect()
    }, delay)
  }

  /**
   * Bound timeout callback. Hoisted from an inline closure so that
   * resetLivenessTimer (called per-frame) does not allocate a new closure
   * on every SSE frame.
   */
  private readonly onLivenessTimeout = (): void => {
    this.livenessTimer = null
    logForDebugging('SSETransport: Liveness timeout, reconnecting', {
      level: 'error',
    })
    logForDiagnosticsNoPII('error', 'cli_sse_liveness_timeout')
    this.abortController?.abort()
    this.handleConnectionError()
  }

  /**
   * Reset the liveness timer. If no SSE frame arrives within the timeout,
   * treat the connection as dead and reconnect.
   */
  private resetLivenessTimer(): void {
    this.clearLivenessTimer()
    this.livenessTimer = setTimeout(this.onLivenessTimeout, this.keepaliveIntervalMs() + LIVENESS_GRACE_MS)
  }

  private keepaliveIntervalMs(): number {
    return (this.echoedIntervalSeconds ?? this.advertisedMaxIntervalSeconds ?? DEFAULT_KEEPALIVE_SECONDS) * 1000
  }

  /** Official _bt read-stream liveness window (interval + 15 seconds). */
  getReadStreamRecentLivenessWindowMs(): number {
    return this.keepaliveIntervalMs() + 15_000
  }

  private clearLivenessTimer(): void {
    if (this.livenessTimer) {
      clearTimeout(this.livenessTimer)
      this.livenessTimer = null
    }
  }

  // -----------------------------------------------------------------------
  // Write (HTTP POST) — same pattern as HybridTransport
  // -----------------------------------------------------------------------

  async write(message: StdoutMessage): Promise<void> {
    const authHeaders = this.getAuthHeaders()
    if (Object.keys(authHeaders).length === 0) {
      logForDebugging('SSETransport: No session token available for POST')
      logForDiagnosticsNoPII('warn', 'cli_sse_post_no_token')
      return
    }

    const headers: Record<string, string> = {
      ...authHeaders,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'anthropic-client-platform': getClaudeCodeClientPlatform(),
      'User-Agent': getClaudeCodeUserAgent(),
    }

    logForDebugging(
      `SSETransport: POST body keys=${Object.keys(message as Record<string, unknown>).join(',')}`,
    )

    for (let attempt = 1; attempt <= POST_MAX_RETRIES; attempt++) {
      try {
        const response = await axios.post(this.postUrl, message, {
          headers,
          validateStatus: alwaysValidStatus,
        })

        if (response.status === 200 || response.status === 201) {
          logForDebugging(`SSETransport: POST success type=${message.type}`)
          return
        }

        logForDebugging(
          `SSETransport: POST ${response.status} body=${jsonStringify(response.data).slice(0, 200)}`,
        )
        // 4xx errors (except 429) are permanent - don't retry
        if (
          response.status >= 400 &&
          response.status < 500 &&
          response.status !== 429
        ) {
          logForDebugging(
            `SSETransport: POST returned ${response.status} (client error), not retrying`,
          )
          logForDiagnosticsNoPII('warn', 'cli_sse_post_client_error', {
            status: response.status,
          })
          return
        }

        // 429 or 5xx - retry
        logForDebugging(
          `SSETransport: POST returned ${response.status}, attempt ${attempt}/${POST_MAX_RETRIES}`,
        )
        logForDiagnosticsNoPII('warn', 'cli_sse_post_retryable_error', {
          status: response.status,
          attempt,
        })
      } catch (error) {
        const axiosError = error as AxiosError
        logForDebugging(
          `SSETransport: POST error: ${axiosError.message}, attempt ${attempt}/${POST_MAX_RETRIES}`,
        )
        logForDiagnosticsNoPII('warn', 'cli_sse_post_network_error', {
          attempt,
        })
      }

      if (attempt === POST_MAX_RETRIES) {
        logForDebugging(
          `SSETransport: POST failed after ${POST_MAX_RETRIES} attempts, continuing`,
        )
        logForDiagnosticsNoPII('warn', 'cli_sse_post_retries_exhausted')
        return
      }

      const delayMs = Math.min(
        POST_BASE_DELAY_MS * Math.pow(2, attempt - 1),
        POST_MAX_DELAY_MS,
      )
      await sleep(delayMs)
    }
  }

  // -----------------------------------------------------------------------
  // Transport interface
  // -----------------------------------------------------------------------

  isConnectedStatus(): boolean {
    return this.state === 'connected'
  }

  isClosedStatus(): boolean {
    return this.state === 'closed'
  }

  setOnData(callback: (data: string) => void): void {
    this.onData = callback
  }

  setOnClose(callback: (closeCode?: number) => void): void {
    this.onCloseCallback = callback
  }

  setOnHeartbeatProbe(callback: () => void): void {
    this.onHeartbeatProbe = callback
  }

  setOnOwnerPresent(callback: () => void): void {
    this.onOwnerPresent = callback
  }

  setOnReconnected(callback: () => void): void {
    this.onReconnected = callback
  }

  setOnEvent(callback: (event: StreamClientEvent) => void): void {
    this.onEventCallback = callback
  }

  close(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    this.clearLivenessTimer()

    this.state = 'closing'
    this.abortController?.abort()
    this.abortController = null
  }
}

// ---------------------------------------------------------------------------
// URL Conversion
// ---------------------------------------------------------------------------

/**
 * Convert an SSE URL to the HTTP POST endpoint URL.
 * The SSE stream URL and POST URL share the same base; the POST endpoint
 * is at `/events` (without `/stream`).
 *
 * From: https://api.example.com/v2/session_ingress/session/<session_id>/events/stream
 * To:   https://api.example.com/v2/session_ingress/session/<session_id>/events
 */
function convertSSEUrlToPostUrl(sseUrl: URL): string {
  let pathname = sseUrl.pathname
  // Remove /stream suffix to get the POST events endpoint
  if (pathname.endsWith('/stream')) {
    pathname = pathname.slice(0, -'/stream'.length)
  }
  return `${sseUrl.protocol}//${sseUrl.host}${pathname}`
}
