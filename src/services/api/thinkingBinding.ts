import { APIError } from '@anthropic-ai/sdk/core/error.mjs'

/** Public 2.1.285 pN/yFt/_Ft and sticky-beta operations (evidence in tests). */
export const THINKING_BINDING_BETA = 'thinking-binding-controls-2026-08-01'
export type BindingBehavior = 'drop_block' | 'error'
export {createStickyBetaState, sendBeta, betaWasSent, rejectBeta, getThinkingBindingState, clearThinkingBindingStates} from '../../bootstrap/stickyBetas.js'
export type {StickyBetaState} from '../../bootstrap/stickyBetas.js'

export function parseBindingBehavior(value: unknown): BindingBehavior | undefined {
  switch (value) {case 'drop': return 'drop_block'; case 'block': return 'error'; default: return}
}
export function resolveBindingBehavior(
  firstPartyEndpoint: boolean, envValue: string | undefined, experiment: unknown,
): BindingBehavior | undefined {
  if (!firstPartyEndpoint) return
  return parseBindingBehavior(envValue !== undefined ? envValue : experiment)
}

function hasRejectionMarker(message: string, marker: string): boolean {
  const token = `capability_rejected: ${marker}`
  let start = 0
  for (;;) {
    const index = message.indexOf(token, start)
    if (index === -1) return false
    const next = message[index + token.length]
    if (next === undefined || !/[A-Za-z0-9_:.-]/.test(next)) return true
    start = index + 1
  }
}
function invalidThinkingSignature(message: string): boolean {
  const text = message.toLowerCase().replaceAll('`', '')
  if (text.includes('signature in thinking block')) return true
  if (text.includes('invalid data in redacted_thinking block')) return true
  if (text.includes('thinking.signature') && text.includes('field required')) return true
  return (text.includes('thinking block') || text.includes('redacted_thinking')) &&
    (text.includes('cannot be modified') || text.includes('invalid signature'))
}
/** zAe: only an unsupported protocol field/beta, never a signature/binding error. */
export function isThinkingBindingUnsupported(error: unknown): boolean {
  if (!(error instanceof APIError) || error.status !== 400) return false
  const message = error.message
  if (invalidThinkingSignature(message) || hasRejectionMarker(message, 'thinking_signature')) return false
  const lower = message.toLowerCase()
  if (lower.includes('not created in this conversation') || lower.includes('bound to a different conversation')) return false
  return (message.includes(THINKING_BINDING_BETA) && message.includes('anthropic-beta')) ||
    hasRejectionMarker(message, `beta_header:${THINKING_BINDING_BETA}`) ||
    /thinking\.(adaptive|enabled)\.block_binding(\.prefix_mismatch_behavior)?: Extra inputs are not permitted/.test(message)
}

export function applyThinkingBinding<T extends {type: string}>(
  thinking: T | undefined, behavior: BindingBehavior | undefined, overridden: boolean,
): T | (T & {block_binding: {prefix_mismatch_behavior: BindingBehavior}}) | undefined {
  if (behavior !== undefined && !overridden && (thinking?.type === 'adaptive' || thinking?.type === 'enabled'))
    return {...thinking, block_binding: {prefix_mismatch_behavior: behavior}}
  return thinking
}

/** XIo: sanitize the final merged parameter, including an extra-body override. */
export function sanitizeDisabledThinking<T>(value: T): T | {type: 'disabled'} {
  if (value === null || typeof value !== 'object' || !('type' in value) || value.type !== 'disabled') return value
  return Object.keys(value).some(key => key !== 'type') ? {type: 'disabled'} : value
}
