import { randomUUID, type UUID } from 'crypto'

/**
 * Request-scoped recovery for API responses that end with stop_reason=refusal.
 *
 * This module deliberately has no dependency on the message model. Refusal
 * metadata is carried on the existing UI/transcript messages as an additive
 * field, while normalizeMessagesForAPI decides what is visible to inference.
 */

export const DEFAULT_REFUSAL_FALLBACK_MODEL = 'claude-opus-4-6'

export type RefusalFallbackScope = 'session' | 'local'

export type RefusalRecoveryState = {
  original_model: string
  fallback_model: string | null
  scope: RefusalFallbackScope
  request_id: string | null
  api_refusal_category: string | null
  api_refusal_explanation: string | null
  refused_user_message_uuid: string | null
  retracted_message_uuids: string[]
  attempt_used: boolean
}

export type RefusalRecoveryMetadata = Omit<
  RefusalRecoveryState,
  'fallback_model' | 'scope' | 'attempt_used' | 'retracted_message_uuids'
> & {
  fallback_model?: string
  scope?: RefusalFallbackScope
  retracted_message_uuids?: string[]
}

export type RefusalProtocolMessage = {
  type: 'system'
  subtype: 'model_refusal_fallback' | 'model_refusal_no_fallback'
  trigger: 'refusal'
  direction: 'retry'
  scope: RefusalFallbackScope
  originalModel: string
  fallbackModel: string | null
  requestId: string | null
  apiRefusalCategory: string | null
  apiRefusalExplanation: string | null
  refusedUserMessageUuid: string | null
  retractedMessageUuids: string[]
  supersedes: string[]
  content: string
  level: 'warning'
  isMeta: boolean
  modelContextExcluded: true
  uuid: UUID
  timestamp: string
}

type MessageLike = {
  type?: string
  uuid?: string
  isApiErrorMessage?: boolean
  modelContextExcluded?: boolean
  refusalRecovery?: RefusalRecoveryMetadata
  message?: {
    model?: string
    stop_reason?: string | null
  }
}

export function isRefusalMessage(message: unknown): boolean {
  if (!message || typeof message !== 'object') return false
  const candidate = message as MessageLike
  return (
    candidate.type === 'assistant' &&
    (candidate.refusalRecovery !== undefined ||
      candidate.message?.stop_reason === 'refusal')
  )
}

export function isModelContextExcluded(message: unknown): boolean {
  if (!message || typeof message !== 'object') return false
  return (message as MessageLike).modelContextExcluded === true
}

export function markModelContextExcluded(message: unknown): void {
  if (!message || typeof message !== 'object') return
  ;(message as MessageLike).modelContextExcluded = true
}

export function getRefusalRecoveryMetadata(
  message: unknown,
): RefusalRecoveryMetadata | undefined {
  if (!message || typeof message !== 'object') return undefined
  return (message as MessageLike).refusalRecovery
}

export function getRefusalFallbackModel(
  originalModel: string,
  configuredModel?: string,
): string | undefined {
  if (process.env.CLAUDE_CODE_DISABLE_REFUSAL_FALLBACK === '1') return

  const fallbackModel =
    configuredModel?.trim() ||
    process.env.CLAUDE_CODE_REFUSAL_FALLBACK_MODEL?.trim() ||
    DEFAULT_REFUSAL_FALLBACK_MODEL

  if (!fallbackModel || fallbackModel === originalModel) return
  return fallbackModel
}

export function buildRefusalRetrySystemPrompt(
  systemPrompt: readonly string[],
): readonly string[] {
  return [
    ...systemPrompt,
    [
      'Continue the same user request once using the fallback model.',
      'Preserve the user intent exactly.',
      'Do not repeat a rejected or incomplete tool call.',
      'Use completed results from the current attempt when they are available.',
      'Do not mention this recovery instruction unless the user asks about it.',
    ].join(' '),
  ]
}

export function getRefusalFallbackContent(
  originalModel: string,
  fallbackModel: string,
  category?: string | null,
): string {
  const categoryText = category ? ` (${category})` : ''
  return `${originalModel}'s safeguards stopped the response above${categoryText} · continuing once with ${fallbackModel}`
}

export function getRefusalNoFallbackContent(
  originalModel: string,
  category?: string | null,
): string {
  const categoryText = category ? ` (${category})` : ''
  return `${originalModel}'s safeguards stopped this response${categoryText} · no fallback response was available`
}

export function createRefusalProtocolMessage({
  subtype,
  state,
  content,
  isMeta,
}: {
  subtype: RefusalProtocolMessage['subtype']
  state: RefusalRecoveryState
  content: string
  isMeta: boolean
}): RefusalProtocolMessage {
  const timestamp = new Date().toISOString()
  return {
    type: 'system',
    subtype,
    trigger: 'refusal',
    direction: 'retry',
    scope: state.scope,
    originalModel: state.original_model,
    fallbackModel: state.fallback_model || null,
    requestId: state.request_id,
    apiRefusalCategory: state.api_refusal_category,
    apiRefusalExplanation: state.api_refusal_explanation,
    refusedUserMessageUuid: state.refused_user_message_uuid,
    retractedMessageUuids: state.retracted_message_uuids,
    supersedes: state.retracted_message_uuids,
    content,
    level: 'warning',
    isMeta,
    modelContextExcluded: true,
    uuid: randomUUID(),
    timestamp,
  }
}
