import {createOfficialByteWatchdog286, type ByteWatchdogClock286, type ByteChunkTimes286} from './officialByteWatchdog286/runtime.js'
import {logForDebugging} from '../../utils/debug.js'
import {logForDiagnosticsNoPII} from '../../utils/diagLogs.js'
import {logEvent} from '../analytics/index.js'
import {createOfficialWatchdogConfiguration286} from './officialByteWatchdog286/config.runtime.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {createAuthIntegerReader, createAuthIntegerDefaultReader} from '../../utils/officialAuthEnvironment/runtime.js'
import {getAPIProvider, getAPIProviderForStatsig, isFirstPartyRequestEndpoint, type APIProvider} from '../../utils/model/providers.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {createOfficialFirstHeader286, type FirstHeaderDeadline286} from './officialByteWatchdog286/header.runtime.js'
import {createOfficialRequestDeadline286, createOfficialNoResponseRetry286} from './officialByteWatchdog286/deadline.runtime.js'
import {createOfficialSlowResponseWarning286} from './officialByteWatchdog286/slow.runtime.js'
import {createOfficialEventWatchdog286, createOfficialEventHeartbeat286, type EventWatchdogStatus286} from './officialByteWatchdog286/event.runtime.js'
import {getFetchRequestState286} from '../../utils/officialFetchRequestState286/runtime.js'
export type {NoResponseRetryLedger286} from './officialByteWatchdog286/deadline.runtime.js'

const readApiTimeout = createAuthIntegerDefaultReader()
const officialWatchdogConfiguration = createOfficialWatchdogConfiguration286({
  JM: createAuthIntegerReader(),
  a: authEnvironment,
  R: (feature, fallback) => getFeatureValue_CACHED_MAY_BE_STALE(feature, fallback),
  Us: isFirstPartyRequestEndpoint,
})

// Reuse existing application-owned diagnostic/debug sinks and the intentionally
// disabled automatic analytics leaf. No alternate auth/state/telemetry runtime.
const officialByteWatchdog = createOfficialByteWatchdog286({
  t: logForDebugging,
  te: logForDiagnosticsNoPII,
  i: logEvent,
})
const {oin: StreamIdleTimeoutError, ROt: StreamSuspendedError} = officialByteWatchdog
export {StreamIdleTimeoutError, StreamSuspendedError}

/**
 * Transport watchdogs; byte-body behavior is the complete original 2.1.286 r9.
 *
 * These are transport-level guards, separate from message parsing and retry
 * policy: one guards the response headers (first byte), the other guards an
 * already-open streaming body. An upstream error is preserved; only a silent
 * transport is converted into a typed timeout.
 */

export const streamWatchdogClock286 = officialByteWatchdog.zQ
export const streamEventHeartbeat286 = createOfficialEventHeartbeat286(streamWatchdogClock286)
export type {ByteWatchdogClock286, ByteChunkTimes286, EventWatchdogStatus286}

export function createSlowResponseWarning286(model: string, clock = streamWatchdogClock286) {
  return createOfficialSlowResponseWarning286({
    B: clock, D: {model}, rc: createAuthIntegerReader(), t: logForDebugging,
    i: (event, fields) => logEvent(event, {
      model: fields.model as never, provider: fields.provider as never,
      attempt: fields.attempt as number, elapsed_ms: fields.elapsed_ms as number,
    }), bt: value => value, PA: getAPIProviderForStatsig,
  })
}

export function createStreamEventWatchdog286(input: {
  model: string
  requestId?: string | null
  chunkTimes?: ByteChunkTimes286
  startedAt: number
  clock?: ByteWatchdogClock286
  onRetryStatus?: (status: EventWatchdogStatus286) => void
  release(): void
}) {
  return createOfficialEventWatchdog286({
    D: {model: input.model, onRetryStatus: input.onRetryStatus},
    B: input.clock ?? streamWatchdogClock286,
    lr: input.chunkTimes, ms: input.startedAt, ni: input.requestId, US: input.release,
    a: authEnvironment, He: getAPIProvider,
    kOt: officialWatchdogConfiguration.kOt, uWn: officialWatchdogConfiguration.uWn,
    t: logForDebugging, te: logForDiagnosticsNoPII,
    // Automatic analytics remains disabled by the retained local privacy policy.
    i: (event, fields) => logEvent(event, {
      model: fields.model as never, request_id: fields.request_id as never,
      timeout_ms: fields.timeout_ms as number, tier: fields.tier as never,
    }), bt: model => model, wf: requestId => requestId, _: value => value,
  })
}

const officialFirstHeader = createOfficialFirstHeader286({
  ROt: StreamSuspendedError,
  zQ: officialByteWatchdog.zQ,
  t: logForDebugging,
  i: (event, fields) => logEvent(event, {...fields, provider: fields.provider as ReturnType<typeof getAPIProviderForStatsig>}),
  PA: getAPIProviderForStatsig,
})
const {ASn: StreamFirstByteTimeoutError} = officialFirstHeader
export {StreamFirstByteTimeoutError}

const officialRequestDeadline = createOfficialRequestDeadline286({
  a: authEnvironment,
  wi: getFetchRequestState286,
  He: getAPIProvider,
  hw: officialWatchdogConfiguration.hw,
  gw: officialWatchdogConfiguration.gw,
  Y3: officialWatchdogConfiguration.Y3,
  eQe: readApiTimeout,
})
export const armStreamFirstResponse = officialRequestDeadline.Ako
export const resolveStreamFirstResponseDeadline = officialRequestDeadline.t9
export const noResponseRetry = createOfficialNoResponseRetry286({
  a: authEnvironment, ASn: StreamFirstByteTimeoutError,
})
export function getNoResponseRetryDetails(error: unknown): {waitedMs: number; retryWaitMs: number} | undefined {
  const noResponse = noResponseRetry.ljt(error)
  return noResponse && {waitedMs: officialFirstHeader.o7n(noResponse.deadline), retryWaitMs: noResponse.deadline.retryWindowMs}
}
export function hasByteBodyWatchdog(provider: string): boolean {
  return (officialRequestDeadline.QM(provider) || officialWatchdogConfiguration.gw(provider)) && isByteWatchdogEnabled()
}

/** The peer closed an SSE response before the message reached message_delta. */
export class StreamTruncatedError extends Error {
  readonly code = 'StreamTruncated'

  constructor(message = 'Stream ended before the response was complete') {
    super(message)
    this.name = 'StreamTruncatedError'
  }
}

/** Empty SSE responses are distinct from a valid message with empty content. */
export class StreamNoEventsError extends Error {
  constructor() {
    super('Stream ended without receiving any events')
    this.name = 'StreamNoEventsError'
  }
}

export type StreamWatchdogOptions = {
  enabled?: boolean
  /** Native T9 observes compression responses before wrapping the SSE body. */
  deferBodyWatchdog?: boolean
  provider?: APIProvider | 'gateway'
  routedProvider?: string
  /** Resolved once before dispatch; gzip identity resend shares the same deadline. */
  deadline?: FirstHeaderDeadline286
  idleTimeoutMs?: number
  clock?: ByteWatchdogClock286
}

const MIN_WATCHDOG_MS = 10_000
const MAX_WATCHDOG_MS = 30 * 60 * 1000
const DEFAULT_IDLE_MS = 180_000
export type StreamRetryKind = 'watchdog' | 'connection' | 'none'

/** Walk SDK cause chains and retain the official retry lanes for transport failures. */
export function classifyStreamFailure(error: unknown): StreamRetryKind {
  const seen = new Set<unknown>()
  let current = error
  for (let depth = 0; depth < 6 && current && !seen.has(current); depth++) {
    seen.add(current)
    if (current instanceof Error) {
      if (current.name === 'StreamIdleTimeoutError') return 'watchdog'
      const code = 'code' in current && typeof current.code === 'string'
        ? current.code
        : undefined
      if (code === 'StreamIdleTimeout') return 'watchdog'
      if (
        code === 'StreamSuspended' ||
        code === 'StreamTruncated' ||
        code === 'StreamNoResponse' ||
        ['ECONNRESET', 'EPIPE', 'ConnectionClosed', 'UND_ERR_SOCKET', 'ETIMEDOUT', 'ECONNABORTED', 'ERR_SOCKET_CLOSED'].includes(code ?? '') ||
        current.name === 'StreamNoEventsError'
      ) return 'connection'
      current = 'cause' in current ? current.cause : undefined
    } else {
      break
    }
  }
  return 'none'
}

/** Thinking-only/empty attempts get a bounded fresh-stream retry, never replaying surfaced output. */
export function shouldRetryStreamFailure(
  kind: StreamRetryKind,
  hasSubstantiveOutput: boolean,
  previousRetries: number,
): boolean {
  if (kind === 'none' || hasSubstantiveOutput) return false
  const limit = kind === 'watchdog' ? 1 : 2
  return previousRetries < limit
}

function boundedTimeout(value: number | undefined, fallback: number): number {
  if (!Number.isFinite(value)) return fallback
  return Math.min(MAX_WATCHDOG_MS, Math.max(MIN_WATCHDOG_MS, value!))
}

function getIdleTimeoutMs(provider: APIProvider | 'gateway'): number {
  return officialWatchdogConfiguration.uWn(provider)
}

export function isByteWatchdogEnabled(): boolean {
  return officialWatchdogConfiguration.hw()
}

export function isEventWatchdogEnabled(): boolean {
  return authEnvironment.CLAUDE_ENABLE_STREAM_WATCHDOG ?? true
}

export function getEventWatchdogTimeoutMs(): number {
  return officialWatchdogConfiguration.kOt()
}

export async function fetchWithStreamWatchdogs(
  fetchImpl: typeof fetch,
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  options: StreamWatchdogOptions = {},
): Promise<Response> {
  if (options.enabled === false) return fetchImpl(input, init)

  const provider = options.provider ?? getAPIProvider()
  // Auto-generated transport IDs do not arm a request. Only the query-owned
  // ID registered immediately before SDK dispatch can activate native t9.
  const deadline = 'deadline' in options ? options.deadline
    : resolveStreamFirstResponseDeadline({
        clientRequestId: new Headers(init?.headers).get('x-client-request-id') ?? undefined,
        provider, routedProvider: options.routedProvider ?? provider,
        method: init?.method ?? (input instanceof Request ? input.method : 'GET'),
        url: input instanceof Request ? input.url : String(input), body: init?.body,
      })
  const response = deadline === undefined
    ? await fetchImpl(input, init)
    : await officialFirstHeader.n9(fetchImpl, input, init ?? {}, deadline, options.clock)
  return options.deferBodyWatchdog ? response : applyStreamBodyWatchdog(response, {...options, provider})
}

/** Last-stage body wrapper; keep raw response identity through native gzip
 * rejection handling and preserve the original opt-out and provider gates. */
export function applyStreamBodyWatchdog(response: Response, options: StreamWatchdogOptions = {}): Response {
  if (options.enabled === false) return response
  const provider = options.provider ?? getAPIProvider()
  const idleTimeoutMs = boundedTimeout(options.idleTimeoutMs ?? getIdleTimeoutMs(provider), DEFAULT_IDLE_MS)
  if (
    !hasByteBodyWatchdog(provider) ||
    !response.body ||
    !response.headers.get('content-type')?.toLowerCase().includes('text/event-stream')
  ) return response
  const chunkTimes: ByteChunkTimes286 = {lastAt: 0}
  const wrapped = officialByteWatchdog.zM(
    response,
    wrapResponseBody(response.body, idleTimeoutMs, {
      cfRay: response.headers.get('cf-ray') ?? undefined,
      chunkTimes,
    }, options.clock),
  )
  Object.defineProperty(wrapped, '_chunkTimes', {value: chunkTimes})
  return wrapped
}

export function wrapResponseBody(
  body: ReadableStream<Uint8Array>,
  idleTimeoutMs: number,
  metadata: {cfRay?: string; chunkTimes?: ByteChunkTimes286} = {},
  clock?: ByteWatchdogClock286,
): ReadableStream<Uint8Array> {
  return officialByteWatchdog.r9(body, idleTimeoutMs, metadata.cfRay, metadata.chunkTimes, clock)
}
