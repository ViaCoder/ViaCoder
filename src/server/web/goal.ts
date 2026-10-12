import type { ServeEvent } from '../serveSession.js'

export type GoalView = {
  status: 'unknown' | 'active' | 'none' | 'achieved' | 'failed' | 'ended'
  condition?: string
  iterations?: number
  setAt?: number
  lastReason?: string
  durationMs?: number
  tokens?: number
}
const object = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null

/** Official SDK `active_goal` is control state, not a transcript message.
 * `goal_status` is the only observed proof of success/failure; null alone
 * means the goal ended without an exposed reason. No budget is inferred from
 * tokens_at_start, which is a baseline rather than a Goal limit. */
export function goalViewFromEvents(events: readonly ServeEvent[]): GoalView {
  let view: GoalView = { status: 'unknown' }
  for (const event of events) {
    if (event.type === 'process_exit' && view.status === 'active') {
      view = { ...view, status: 'ended' }
      continue
    }
    if (event.type !== 'sdk') continue
    const message = object(event.message)
    if (message?.type === 'active_goal') {
      if (message.value === null) {
        if (view.status !== 'achieved' && view.status !== 'failed') view = {
          status: view.status === 'active' ? 'ended' : 'none', condition: view.condition,
          iterations: view.iterations, lastReason: view.lastReason,
        }
        continue
      }
      const value = object(message.value)
      if (typeof value?.condition !== 'string' || !Number.isSafeInteger(value.iterations)) continue
      view = { status: 'active', condition: value.condition, iterations: Number(value.iterations),
        ...(Number.isSafeInteger(value.set_at) ? { setAt: Number(value.set_at) } : {}),
        ...(typeof value.last_reason === 'string' ? { lastReason: value.last_reason } : {}),
      }
      continue
    }
    const attachment = message?.type === 'attachment' ? object(message.attachment) : null
    if (attachment?.type !== 'goal_status' || attachment.sentinel === true) continue
    if (typeof attachment.condition !== 'string') continue
    if (attachment.met === true || attachment.failed === true) {
      view = { status: attachment.met === true ? 'achieved' : 'failed', condition: attachment.condition,
        ...(Number.isSafeInteger(attachment.iterations) ? { iterations: Number(attachment.iterations) } : {}),
        ...(typeof attachment.reason === 'string' ? { lastReason: attachment.reason } : {}),
        ...(typeof attachment.durationMs === 'number' ? { durationMs: attachment.durationMs } : {}),
        ...(typeof attachment.tokens === 'number' ? { tokens: attachment.tokens } : {}),
      }
    } else if (view.status === 'active' && view.condition === attachment.condition && typeof attachment.reason === 'string') {
      view = { ...view, lastReason: attachment.reason }
    }
  }
  return view
}
