import type {PermissionSessionState287} from '../utils/permissions/officialSDKPermission287/native.js'
import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js'
import { PassThrough } from 'stream'
import { URL } from 'url'
import { getSessionId } from '../bootstrap/state.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../services/analytics/growthbook.js'
import { getPollIntervalConfig } from '../bridge/pollConfig.js'
import { registerCleanup } from '../utils/cleanupRegistry.js'
import { setCommandLifecycleListener } from '../utils/commandLifecycle.js'
import { isDebugMode, logForDebugging } from '../utils/debug.js'
import { logForDiagnosticsNoPII } from '../utils/diagLogs.js'
import { errorMessage } from '../utils/errors.js'
import { gracefulShutdown } from '../utils/gracefulShutdown.js'
import { logError } from '../utils/log.js'
import { writeToStdout } from '../utils/process.js'
import { getSessionIngressAuthToken } from '../utils/sessionIngressAuth.js'
import {
  setSessionMetadataChangedListener,
  setSessionStateChangedListener,
  getPermissionSessionState287,
} from '../utils/sessionState.js'
import {
  registerInternalEventIO,
} from '../utils/sessionStorage.js'
import { ndjsonSafeStringify } from './ndjsonSafeStringify.js'
import { StructuredIO } from './structuredIO.js'
import {isRemoteHostTransport287} from './printOwnership287/hostCloseNative.js'
import { CCRClient, CCRInitError } from './transports/ccrClient.js'
import { SSETransport } from './transports/SSETransport.js'
import { getTransportForUrl, normalizeSessionUrl } from './transports/transportUtils.js'

// commandLifecycle/sessionState listeners are process-global today. Keep a
// single owner token so an old RemoteIO close cannot clear a successor's hooks.
let lifecycleListenerOwner: RemoteIO | null = null

/**
 * Bidirectional streaming for SDK mode with session tracking
 * Uses the official SSE reader + CCR worker writer
 */
export class RemoteIO extends StructuredIO {
  override isRemoteTransport():boolean{return isRemoteHostTransport287.call(this)}
  override readonly hostOwnsStdinOrigin: boolean = false
  override readonly persistsOutboundFrames: boolean = true
  private url: URL
  private transport: SSETransport
  private inputStream: PassThrough
  private readonly isBridge: boolean = false
  private readonly isDebug: boolean = false
  private ccrClient: CCRClient
  private closed = false
  private closePromise: Promise<void> | null = null
  private internalEventIO: ReturnType<typeof registerInternalEventIO> | null = null
  private unregisterCleanup: (() => void) | undefined
  private keepAliveTimer: ReturnType<typeof setInterval> | null = null
  private readonly stateChanged287:NonNullable<PermissionSessionState287['onStateChanged']> =
    (state,details)=>this.ccrClient.reportState(state,details)
  private readonly metadataChanged287:NonNullable<PermissionSessionState287['onMetadataChanged']> =
    metadata=>this.ccrClient.reportMetadata(metadata)
  private readonly internalMetadataChanged287:NonNullable<PermissionSessionState287['onInternalMetadataChanged']> =
    metadata=>this.ccrClient.reportInternalMetadata(metadata)

  constructor(
    streamUrl: string,
    initialPrompt?: AsyncIterable<string>,
    replayUserMessages?: boolean,
    sessionState?:PermissionSessionState287,
  ) {
    const inputStream = new PassThrough({ encoding: 'utf8' })
    super(inputStream, replayUserMessages,sessionState)
    this.inputStream = inputStream
    this.url = normalizeSessionUrl(new URL(streamUrl))

    // Prepare headers with session token if available
    const headers: Record<string, string> = {}
    const sessionToken = getSessionIngressAuthToken()
    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`
    } else {
      logForDebugging('[remote-io] No session ingress token available', {
        level: 'error',
      })
    }

    // Add environment runner version if available (set by Environment Manager)
    const erVersion = process.env.CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION
    if (erVersion) {
      headers['x-environment-runner-version'] = erVersion
    }

    // Provide a callback that re-reads the session token dynamically.
    // When the parent process refreshes the token (via token file or env var),
    // the transport can pick it up on reconnection.
    const refreshHeaders = (): Record<string, string> => {
      const h: Record<string, string> = {}
      const freshToken = getSessionIngressAuthToken()
      if (freshToken) {
        h['Authorization'] = `Bearer ${freshToken}`
      }
      const freshErVersion = process.env.CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION
      if (freshErVersion) {
        h['x-environment-runner-version'] = freshErVersion
      }
      return h
    }

    // Get appropriate transport based on URL protocol
    this.transport = getTransportForUrl(
      this.url,
      headers,
      getSessionId(),
      refreshHeaders,
      () => getFeatureValue_CACHED_MAY_BE_STALE<number>(
        'tengu_ccr_sse_keepalive_max_interval_s', 0),
    )

    // Set up data callback
    this.isBridge = process.env.CLAUDE_CODE_ENVIRONMENT_KIND === 'bridge'
    this.isDebug = isDebugMode()
    this.transport.setOnData((data: string) => {
      this.inputStream.write(data)
      if (this.isBridge && this.isDebug) {
        writeToStdout(data.endsWith('\n') ? data : data + '\n')
      }
    })

    // Set up close callback to handle connection failures
    this.transport.setOnClose(() => {
      // Terminal stream rejection ends input and all worker resources.
      void this.close()
    })

    // Official Ie always pairs be/_bt with fM. Wire ACKs before opening SSE.
    {
      this.ccrClient = new CCRClient(this.transport, this.url)
      const init = this.ccrClient.initialize()
      this.restoredWorkerState = init.catch(() => null)
      init.catch((error: unknown) => {
        if (this.closed) return
        logForDiagnosticsNoPII('error', 'cli_worker_lifecycle_init_failed', {
          reason: error instanceof CCRInitError ? error.reason : 'unknown',
        })
        logError(
          new Error(`CCRClient initialization failed: ${errorMessage(error)}`),
        )
        void gracefulShutdown(1, 'other')
      })

      // Register internal event writer for transcript persistence.
      // When set, sessionStorage writes transcript messages as CCR v2
      // internal events instead of v1 Session Ingress.
      this.internalEventIO = registerInternalEventIO(
        (eventType, payload, options) => this.ccrClient.writeInternalEvent(eventType, payload, options),
        () => this.ccrClient.readInternalEvents(),
        () => this.ccrClient.readSubagentInternalEvents(),
      )

      const LIFECYCLE_TO_DELIVERY = {
        started: 'processing',
        completed: 'processed',
      } as const
      setCommandLifecycleListener((uuid, state) => {
        this.ccrClient.reportDelivery(uuid, LIFECYCLE_TO_DELIVERY[state])
      })
      // Original qz publishes into this Cie receiver's t$t, not another IO.
      this.sessionState.onStateChanged=this.stateChanged287
      this.sessionState.onMetadataChanged=this.metadataChanged287
      this.sessionState.onInternalMetadataChanged=this.internalMetadataChanged287
      // Preserve the existing legacy notifier C only for its exact source cell.
      if(this.sessionState===getPermissionSessionState287()){
        setSessionStateChangedListener(this.stateChanged287)
        setSessionMetadataChangedListener(this.metadataChanged287)
      }
      lifecycleListenerOwner = this
    }

    // Official RemoteIO opens SSE alongside initialize(), unlike Rn bridge.
    // All callbacks (including CCR received ACKs) are wired synchronously.
    void this.transport.connect()

    // Push a silent keep_alive frame on a fixed interval so upstream
    // proxies and the session-ingress layer don't GC an otherwise-idle
    // remote control session. The keep_alive type is filtered before
    // reaching any client UI (Query.ts drops it; structuredIO.ts drops it;
    // web/iOS/Android never see it in their message loop). Interval comes
    // from GrowthBook (tengu_bridge_poll_interval_config
    // session_keepalive_interval_v2_ms, default 120s); 0 = disabled.
    // Bridge-only: fixes Envoy idle timeout on bridge-topology sessions
    // (#21931). byoc workers ran without this before #21931 and do not
    // need it — different network path.
    const keepAliveIntervalMs =
      getPollIntervalConfig().session_keepalive_interval_v2_ms
    if (this.isBridge && keepAliveIntervalMs > 0) {
      this.keepAliveTimer = setInterval(() => {
        logForDebugging('[remote-io] keep_alive sent')
        void this.write({ type: 'keep_alive' }).catch(err => {
          logForDebugging(
            `[remote-io] keep_alive write failed: ${errorMessage(err)}`,
          )
        })
      }, keepAliveIntervalMs)
      this.keepAliveTimer.unref?.()
    }

    // Register for graceful shutdown cleanup
    this.unregisterCleanup = registerCleanup(() => this.close())

    // If initial prompt is provided, send it through the input stream
    if (initialPrompt) {
      // Convert the initial prompt to the input stream format.
      // Chunks from stdin may already contain trailing newlines, so strip
      // them before appending our own to avoid double-newline issues that
      // cause structuredIO to parse empty lines. String() handles both
      // string chunks and Buffer objects from process.stdin.
      const stream = this.inputStream
      void (async () => {
        for await (const chunk of initialPrompt) {
          if (this.closed) break
          stream.write(String(chunk).replace(/\n$/, '') + '\n')
        }
      })()
    }
  }

  override flushInternalEvents(): Promise<void> {
    return this.closePromise ?? this.ccrClient.flushInternalEvents()
  }

  override async flushSessionState(): Promise<boolean> {
    const dropped=this.ccrClient.droppedWorkerStatePatches
    return await this.ccrClient.flushWorkerState() && this.ccrClient.droppedWorkerStatePatches===dropped
  }

  override get internalEventsPending(): number {
    return this.ccrClient.internalEventsPending
  }

  /**
   * Send output to the transport.
   * In bridge mode, control_request messages are always echoed to stdout so the
   * bridge parent can detect permission requests. Other messages are echoed only
   * in debug mode.
   */
  async write(message: StdoutMessage): Promise<void> {
    if (this.closed) return
    await this.ccrClient.writeEvent(message)
    if (this.isBridge) {
      if (message.type === 'control_request' || this.isDebug) {
        writeToStdout(ndjsonSafeStringify(message) + '\n')
      }
    }
  }

  /** Official RemoteIO forwarding surface. Presence is not model input. */
  setOnOwnerPresent(callback: () => void): void {
    this.transport.setOnOwnerPresent(callback)
  }

  /** Drain the captured Project and internal uploader before closing them.
   * Transport/input close immediately; cleanup callers can await the promise.
   */
  close(): Promise<void> {
    if (this.closed) return this.closePromise ?? Promise.resolve()
    this.closed = true
    if (lifecycleListenerOwner === this) {
      setCommandLifecycleListener(null)
      lifecycleListenerOwner = null
    }
    if(this.sessionState.onStateChanged===this.stateChanged287){
      if(this.sessionState===getPermissionSessionState287())setSessionStateChangedListener(null)
      else this.sessionState.onStateChanged=undefined
    }
    if(this.sessionState.onMetadataChanged===this.metadataChanged287){
      if(this.sessionState===getPermissionSessionState287())setSessionMetadataChangedListener(null)
      else this.sessionState.onMetadataChanged=undefined
    }
    if(this.sessionState.onInternalMetadataChanged===this.internalMetadataChanged287){
      this.sessionState.onInternalMetadataChanged=undefined
    }
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer)
      this.keepAliveTimer = null
    }
    const registration = this.internalEventIO
    this.closePromise = Promise.resolve().then(async () => {
      try {
        // An older instance does not drain or detach a successor's Project
        // writer. Its own CCR uploader may still have accepted events.
        if (registration?.isCurrent()) await registration.flushProject()
        await this.ccrClient.flushWorkerState()
        await this.ccrClient.flushInternalEvents()
        await this.ccrClient.flush()
      } catch (error) {
        logError(new Error(`RemoteIO internal event drain failed: ${errorMessage(error)}`))
      } finally {
        registration?.dispose()
        this.ccrClient.close()
        this.unregisterCleanup?.()
        this.unregisterCleanup = undefined
      }
    })
    this.transport.close()
    this.inputStream.end()
    return this.closePromise
  }
}
