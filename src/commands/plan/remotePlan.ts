import stripAnsi from 'strip-ansi'
import { boundedRequest, PlanRequestTimeoutError, type ControlRequestOptions, type PlanControlRequest } from './remoteProtocol.js'

export const MODE_PUSH_TIMEOUT_MS = 15_000
export const GET_PLAN_TIMEOUT_MS = 10_000
export const MAX_REMOTE_PLAN_LENGTH = 1_000_000

export interface RemotePlanHost {
  /** Resolve decoded success payload only; reject error/disconnect, never resolve on send. */
  sendControlRequest(request: PlanControlRequest, options: ControlRequestOptions): Promise<unknown>
  /** The session-wide mode synchronizer owns the push; /plan only waits. */
  waitForMode?: (mode: 'plan', options: ControlRequestOptions) => Promise<void>
  sendMessage(content: string, options: { uuid: string }): Promise<boolean>
  /** Connection/conversation epoch; changes invalidate an ACK even before the next microtask. */
  getSessionIdentity?: () => unknown
  getModeIdentity?: () => unknown
  /** Rechecked after rendering to avoid leaking paths when privacy changes. */
  isPathHidden?: () => boolean
}

/** Optional extension until shared command context / REPL owners wire the host. */
export type PlanCommandContextExtension = {
  planRemote?: { kind: 'remote'; host?: RemotePlanHost }
}

type RemotePlanResult =
  | { kind: 'text'; text: string }
  | { kind: 'plan'; content: string; path?: string }

export async function runRemotePlan(options: {
  host?: RemotePlanHost
  enteredPlan: boolean
  args: string
  modeConfirmation?: Promise<void>
  echo: (description: string) => string
  signal?: AbortSignal
  /** Injectable deadlines for isolated offline tests. Production uses official values. */
  timeouts?: { mode: number; plan: number }
}): Promise<RemotePlanResult> {
  const { host, enteredPlan, echo, signal } = options
  const args = options.args.trim()
  const text = (value: string): RemotePlanResult => ({ kind: 'text', text: value })
  if (!host) return text('Remote plan protocol host is not connected. No description was sent; the local plan file was not read.')
  const identity = host.getSessionIdentity?.()
  const modeIdentity = host.getModeIdentity?.()
  const assertCurrent = () => {
    if (host.getSessionIdentity && host.getSessionIdentity() !== identity) throw new Error('Remote conversation changed during Plan request')
    if (host.getModeIdentity && host.getModeIdentity() !== modeIdentity) throw new Error('Remote mode changed during Plan request')
  }
  const request = (payload: PlanControlRequest, timeoutMs: number) => boundedRequest(
    requestSignal => host.sendControlRequest(payload, { timeoutMs, signal: requestSignal }),
    payload.subtype, { timeoutMs, signal },
  )
  const description = enteredPlan && args && args !== 'open' && args !== 'share' ? args : undefined
  // Live CCR/direct hosts share the session-wide synchronizer. Keep the
  // explicit request path only for standalone embedders without that host.
  if (enteredPlan) {
    try {
      const ack = options.modeConfirmation || host.waitForMode
        ? (await (options.modeConfirmation ?? host.waitForMode!('plan', { timeoutMs: options.timeouts?.mode ?? MODE_PUSH_TIMEOUT_MS, signal })), {})
        : await request({ subtype: 'set_permission_mode', mode: 'plan' }, options.timeouts?.mode ?? MODE_PUSH_TIMEOUT_MS)
      if (!ack || typeof ack !== 'object' || Array.isArray(ack) ||
          ('mode' in ack && ack.mode !== undefined && ack.mode !== 'plan')) {
        throw new Error('Invalid set_permission_mode acknowledgment')
      }
      signal?.throwIfAborted()
      assertCurrent()
    } catch (error) {
      if (signal?.aborted) return text(description ? 'Plan request cancelled. Your description was not sent.' : 'Plan request cancelled.')
      // The global synchronizer can already have rolled local state back.
      // Report the missing confirmation, not a mode we no longer own.
      if (!description) return text('The cloud session did not confirm the switch. Remote plan mode is unconfirmed.')
      return text(error instanceof PlanRequestTimeoutError
        ? `The cloud session didn’t confirm the switch in time — your description was not sent: ${args}. Check the current permission mode before trying again.`
        : `The cloud session couldn’t switch to plan mode, so your description was not sent: ${args}`)
    }
  }
  if (description) {
    try {
      assertCurrent()
      const uuid = echo(description)
      if (!await host.sendMessage(args, { uuid })) return text('Plan mode was confirmed, but sending your description failed. It has not been confirmed as delivered.')
      return text('Enabled plan mode')
    } catch {
      return text('Plan mode was confirmed, but sending your description failed. Delivery is unconfirmed; check the session before retrying.')
    }
  }
  if (args.split(/\s+/)[0] === 'open') {
    return text('The plan file lives in the cloud workspace. Use /plan to view it; to change it, tell Claude what to revise, or edit it in the plan approval dialog.')
  }
  try {
    const response = await request({ subtype: 'get_plan' }, options.timeouts?.plan ?? GET_PLAN_TIMEOUT_MS)
    assertCurrent()
    if (!response || typeof response !== 'object' || !('exists' in response) || typeof response.exists !== 'boolean') {
      throw new Error('Malformed get_plan response')
    }
    const plan = response as { exists: boolean; content?: unknown; path?: unknown }
    if (plan.content !== undefined && typeof plan.content !== 'string' || plan.path !== undefined && typeof plan.path !== 'string') {
      throw new Error('Malformed get_plan response')
    }
    if (!plan.exists || !plan.content) return text(enteredPlan ? 'Enabled plan mode' : 'Already in plan mode. No plan written yet.')
    return {
      kind: 'plan',
      content: stripAnsi(plan.content as string).slice(0, MAX_REMOTE_PLAN_LENGTH),
      path: typeof plan.path === 'string' && !host.isPathHidden?.()
        ? stripAnsi(plan.path).replace(/[\r\n]/g, ' ') : undefined,
    }
  } catch (error) {
    if (signal?.aborted) return text('Plan request cancelled.')
    const detail = error instanceof Error ? error.message : String(error)
    return text(detail.includes('Unsupported control request subtype')
      ? 'Viewing plans in cloud sessions needs a newer session runtime.'
      : 'Couldn’t fetch the plan from the cloud session — try again.')
  }
}
