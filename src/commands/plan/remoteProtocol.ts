import { randomUUID } from 'node:crypto'

/** Official npm 2.1.283 control_request/control_response subset, not an SDK host. */
export type RemotePermissionMode = 'default' | 'plan' | 'acceptEdits' | 'dontAsk' | 'bypassPermissions'
export type PlanControlRequest =
  | { subtype: 'set_permission_mode'; mode: RemotePermissionMode }
  | { subtype: 'get_plan' }

export type ControlRequestOptions = { timeoutMs: number; signal?: AbortSignal }
export type PlanControlFrame = {
  type: 'control_request'
  request_id: string
  request: PlanControlRequest
}

/** Positive local write failure, distinct from an ambiguous response timeout. */
export class PlanControlNotDeliveredError extends Error {
  constructor() { super('Control request was not delivered'); this.name = 'PlanControlNotDeliveredError' }
}

export class PlanRequestTimeoutError extends Error {
  constructor(readonly subtype: PlanControlRequest['subtype']) {
    super(`${subtype} timed out`)
    this.name = 'PlanRequestTimeoutError'
  }
}

/** A timeout cancels the local wait, not an already-applied remote mode change. */
export async function boundedRequest<T>(
  run: (signal: AbortSignal) => Promise<T>,
  subtype: PlanControlRequest['subtype'],
  options: ControlRequestOptions,
): Promise<T> {
  const controller = new AbortController()
  const abort = () => controller.abort(options.signal?.reason)
  options.signal?.addEventListener('abort', abort, { once: true })
  if (options.signal?.aborted) abort()
  const timer = setTimeout(() => controller.abort(new PlanRequestTimeoutError(subtype)), options.timeoutMs)
  let onAbort: () => void = () => {}
  try {
    controller.signal.throwIfAborted()
    return await Promise.race([
      new Promise<never>((_, reject) => {
        onAbort = () => reject(controller.signal.reason)
        controller.signal.addEventListener('abort', onAbort, { once: true })
      }),
      Promise.resolve().then(() => {
        controller.signal.throwIfAborted()
        return run(controller.signal)
      }),
    ])
  } finally {
    clearTimeout(timer)
    controller.signal.removeEventListener('abort', onAbort)
    options.signal?.removeEventListener('abort', abort)
  }
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Transport-neutral correlator. sendFrame only writes bytes; it NEVER confirms
 * a mode push. Only a matching success control_response resolves the request.
 * One instance per remote connection; dispose it on disconnect/session change.
 */
export class PlanControlClient {
  private pending = new Map<string, {
    resolve: (value: unknown) => void
    reject: (error: unknown) => void
  }>()
  private closed = false

  constructor(private readonly sendFrame: (frame: PlanControlFrame) => void) {}

  get pendingCount(): number { return this.pending.size }

  request(request: PlanControlRequest, options: ControlRequestOptions): Promise<unknown> {
    if (this.closed) return Promise.reject(new Error('Plan control connection is closed'))
    return boundedRequest(signal => new Promise((resolve, reject) => {
      const id = randomUUID()
      const cleanup = () => {
        this.pending.delete(id)
        signal.removeEventListener('abort', abort)
      }
      const fail = (error: unknown) => { cleanup(); reject(error) }
      const abort = () => fail(signal.reason)
      signal.addEventListener('abort', abort, { once: true })
      this.pending.set(id, {
        resolve: value => { cleanup(); resolve(value) },
        reject: fail,
      })
      try {
        signal.throwIfAborted()
        if (this.closed) throw new Error('Plan control connection is closed')
        this.sendFrame({ type: 'control_request', request_id: id, request })
      } catch (error) { fail(error) }
    }), request.subtype, options)
  }

  /** Called by the host only for frames from this connection's trusted worker. */
  receive(frame: unknown): boolean {
    if (!record(frame) || frame.type !== 'control_response' || !record(frame.response)) return false
    const response = frame.response
    if (typeof response.request_id !== 'string') return false
    const pending = this.pending.get(response.request_id)
    if (!pending) return false
    if (response.subtype === 'success' && (response.response === undefined || record(response.response))) {
      pending.resolve(response.response ?? {})
    } else if (response.subtype === 'error' && typeof response.error === 'string') {
      pending.reject(new Error(response.error))
    } else {
      pending.reject(new Error('Malformed plan control_response'))
    }
    return true
  }

  dispose(reason = new Error('Plan control connection disconnected')): void {
    this.closed = true
    for (const pending of [...this.pending.values()]) pending.reject(reason)
  }
}
