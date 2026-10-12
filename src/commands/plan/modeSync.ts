import {
  boundedRequest, PlanControlNotDeliveredError, PlanRequestTimeoutError,
  type ControlRequestOptions, type PlanControlRequest, type RemotePermissionMode,
} from './remoteProtocol.js'

// Official 2.1.283 chunk-mzg9kbjz.js w8/Sxe/Mxe: retries are convergence
// only, and only for positive non-delivery, NEVER an ambiguous ACK timeout.
export const MODE_CONVERGENCE_DELAYS_MS = [1000, 3000, 9000] as const
export const MODE_CONTROL_TIMEOUT_MS = 10_000
export function remotePermissionMode(value: unknown): value is RemotePermissionMode {
  return typeof value === 'string' && ['default', 'plan', 'acceptEdits', 'dontAsk', 'bypassPermissions'].includes(value)
}

type Waiter = { mode: RemotePermissionMode; resolve: () => void; reject: (error: unknown) => void }
type Push = { version: number; mode: RemotePermissionMode; controller: AbortController; broadcastSeq: number }
export type ModeSyncOptions = {
  initialMode: string
  send: (request: PlanControlRequest, options: ControlRequestOptions) => Promise<unknown>
  apply: (mode: RemotePermissionMode) => void
  notice?: (message: string) => void
  readOnly?: boolean
  connectPolicy?: 'plan' | 'current'
  requestTimeoutMs?: number
  retryDelaysMs?: readonly number[]
}

/** Session-scoped ordinary-mode coordinator. The store is the sole local intent
 * source; worker broadcasts are applied with no echo. Transport ACKs are scoped
 * to an intent version, not merely to a mode name (plan→default→plan is distinct). */
export class RemoteModeSync {
  private mode: string
  private online = false
  private disposed = false
  private changedLocally = false
  private identity = {}
  getIdentity(): object { return this.identity }
  private version = 0
  private epoch = 0
  private applying = false
  private push?: Push
  private retry?: ReturnType<typeof setTimeout>
  private waiters = new Set<Waiter>()
  private ack?: { mode: RemotePermissionMode; version: number }
  private broadcast?: RemotePermissionMode
  private broadcastSeq = 0
  private lastError?: unknown

  constructor(private readonly options: ModeSyncOptions) { this.mode = options.initialMode }
  get pendingWaiters(): number { return this.waiters.size }
  get retryScheduled(): boolean { return this.retry !== undefined }

  private stop(error: unknown, keepMode?: RemotePermissionMode): void {
    this.version++
    this.identity = {}
    this.ack = undefined
    const push = this.push; this.push = undefined
    push?.controller.abort(error)
    if (this.retry !== undefined) clearTimeout(this.retry)
    this.retry = undefined
    for (const waiter of [...this.waiters]) if (waiter.mode !== keepMode) waiter.reject(error)
  }

  localModeChanged(mode: string): void {
    if (this.disposed || mode === this.mode) return
    const previous = this.mode
    this.mode = mode
    if (this.applying) return
    this.changedLocally = true
    this.lastError = undefined
    this.stop(new Error('Permission mode request superseded'), remotePermissionMode(mode) ? mode : undefined)
    if (!this.online || this.options.readOnly || !remotePermissionMode(mode)) return
    this.start(mode, remotePermissionMode(previous) ? previous : 'default', false, 0)
  }

  connected(): void {
    if (this.disposed || this.online) return
    this.epoch++
    this.online = true
    this.lastError = undefined
    this.stop(new Error('Remote connection replaced'))
    if (!this.options.readOnly && remotePermissionMode(this.mode) &&
        (this.options.connectPolicy === 'current' || this.mode === 'plan' || this.changedLocally)) {
      this.start(this.mode, 'default', false, 0)
    }
  }
  disconnected(): void {
    this.epoch++
    this.online = false
    this.stop(new Error('Remote mode sync disconnected'))
  }
  conversationReset(): void {
    this.epoch++
    this.lastError = undefined
    this.stop(new Error('Remote conversation was reset'))
  }
  dispose(): void { this.disposed = true; this.disconnected() }

  /** Register before a local /plan transition. An already-current ACK can also
   * satisfy a later subscriber, but broadcasts alone never release a description. */
  waitForMode(mode: RemotePermissionMode, options: ControlRequestOptions): Promise<void> {
    if (options.signal?.aborted) return Promise.reject(options.signal.reason)
    if (this.disposed || !this.online) return Promise.reject(new Error('Remote mode sync is not connected'))
    if (this.options.readOnly) return Promise.reject(new Error('This remote session is read-only'))
    if (this.ack?.mode === mode && this.ack.version === this.version && this.mode === mode) return Promise.resolve()
    if (this.mode === mode && this.lastError && !this.push && !this.retry) return Promise.reject(this.lastError)
    const epoch = this.epoch, version = this.mode === mode ? this.version : this.version + 1
    return boundedRequest(signal => new Promise<void>((resolve, reject) => {
      const finish = (error?: unknown) => {
        this.waiters.delete(waiter); signal.removeEventListener('abort', abort)
        if (error !== undefined) reject(error); else resolve()
      }
      const waiter: Waiter = { mode, resolve: () => finish(), reject: error => finish(error) }
      const abort = () => finish(signal.reason)
      // boundedRequest starts in a microtask: ACK/reset can precede registration.
      if (this.disposed || !this.online) { reject(new Error('Remote mode sync disconnected')); return }
      if (this.epoch !== epoch || this.version !== version || this.mode !== mode) { reject(new Error('Permission mode request superseded')); return }
      if (this.ack?.mode === mode && this.ack.version === this.version) { resolve(); return }
      if (this.lastError && !this.push && !this.retry) { reject(this.lastError); return }
      signal.addEventListener('abort', abort, { once: true }); this.waiters.add(waiter)
    }), 'set_permission_mode', options)
  }

  /** Only canonical system permissionMode broadcasts are accepted. */
  receive(frame: unknown): void {
    if (!this.online || !frame || typeof frame !== 'object') return
    const value = frame as Record<string, unknown>
    if (value.type !== 'system' || !remotePermissionMode(value.permissionMode) || this.disposed) return
    const mode = value.permissionMode
    this.broadcast = mode; this.broadcastSeq++
    // During an explicit press, preserve intent until its correlated response.
    // Record competing broadcasts for rollback instead of reposting stale state.
    if (this.push && this.retry === undefined) return
    if (mode === this.mode && this.retry === undefined) return
    this.stop(new Error('Remote permission mode changed'))
    this.lastError = undefined
    this.adopt(mode)
  }

  private adopt(mode: RemotePermissionMode): void {
    this.applying = true
    try { this.options.apply(mode); this.mode = mode }
    catch (error) { this.lastError = error; this.options.notice?.(`Remote mode ${mode} was not adopted locally.`) }
    finally { this.applying = false }
  }
  private settle(mode: RemotePermissionMode, error?: unknown): void {
    for (const waiter of [...this.waiters]) if (waiter.mode === mode) {
      if (error !== undefined) waiter.reject(error); else waiter.resolve()
    }
  }

  private start(mode: RemotePermissionMode, fallback: RemotePermissionMode, convergence: boolean, attempt: number): void {
    if (!this.online || this.disposed || this.options.readOnly || this.mode !== mode) return
    const push: Push = { mode, version: this.version, controller: new AbortController(), broadcastSeq: this.broadcastSeq }
    this.push = push
    const current = () => !this.disposed && this.online && this.push === push && this.version === push.version && this.mode === mode
    const timeoutMs = this.options.requestTimeoutMs ?? MODE_CONTROL_TIMEOUT_MS
    // Promise.resolve catches synchronous host failures too.
    void boundedRequest(signal => this.options.send({ subtype: 'set_permission_mode', mode }, { timeoutMs, signal }),
      'set_permission_mode', { timeoutMs, signal: push.controller.signal }).then(ack => {
      if (!current()) return
      if (!ack || typeof ack !== 'object' || Array.isArray(ack) || ('mode' in ack && ack.mode !== undefined && ack.mode !== mode)) {
        throw new Error('Invalid set_permission_mode acknowledgment')
      }
      this.push = undefined; this.lastError = undefined
      this.ack = { mode, version: this.version }; this.settle(mode)
      // A different broadcast received during the press is not an ACK and may
      // be older than it; do not overwrite a successful newer local intent.
    }).catch(error => {
      if (!current()) return
      this.push = undefined; this.lastError = error; this.settle(mode, error)
      if (convergence) {
        if (error instanceof PlanControlNotDeliveredError) {
          const delay = (this.options.retryDelaysMs ?? MODE_CONVERGENCE_DELAYS_MS)[attempt]
          if (delay !== undefined) {
            const version = this.version, sequence = this.broadcastSeq
            this.retry = setTimeout(() => {
              this.retry = undefined
              if (this.version !== version || this.broadcastSeq !== sequence) return
              this.start(mode, fallback, true, attempt + 1)
            }, delay)
            return
          }
        }
        this.options.notice?.(`Remote mode ${mode} is unconfirmed; convergence stopped.`)
        return
      }
      this.options.notice?.(error instanceof PlanRequestTimeoutError
        ? `Remote mode ${mode} timed out; the worker may still apply it. Your Plan description was not sent.`
        : `Remote mode ${mode} was not confirmed. Your Plan description was not sent.`)
      if (this.broadcastSeq > push.broadcastSeq && this.broadcast === mode) return
      // Prefer the worker's observed state. Never automatically raise permission
      // to bypassPermissions after a failure; local policy still validates apply.
      const target = this.broadcast ?? fallback
      const landing = target === 'bypassPermissions' ? 'default' : target
      this.stop(error)
      this.adopt(landing)
      if (this.mode === landing) this.start(landing, landing, true, 0)
    })
  }
}
