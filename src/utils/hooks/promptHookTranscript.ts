// Official 2.1.283 chunk-wyjbafrm.js: bCo/wCo/vCo.
import type { AssistantMessage, Message } from '../../types/message.js'
import { groupMessagesByApiRound } from '../../services/compact/grouping.js'
import { roughTokenCountEstimationForMessage } from '../../services/tokenEstimation.js'
import { has1mContext, modelSupports1M } from '../context.js'
import { createUserMessage, SYNTHETIC_MODEL } from '../messages.js'
import { getTokenCountFromUsage } from '../tokens.js'

export function trimPromptHookTranscript(messages: Message[], model: string, fraction = 0.5): Message[] {
  const budget = Math.floor((has1mContext(model) || modelSupports1M(model) ? 1e6 : 200000) * fraction)
  const last = messages.findLast((m): m is AssistantMessage => m.type === 'assistant' && m.message.usage &&
    m.message.model !== SYNTHETIC_MODEL && m.isUnmetered !== true)
  if (!last || getTokenCountFromUsage(last.message.usage) <= budget) return messages
  const groups = groupMessagesByApiRound(messages)
  let count = 0
  let start = groups.length
  for (let i = groups.length - 1; i >= 0; i--) {
    const size = Math.ceil(groups[i]!.reduce((total, message) => total +
      (message.type === 'assistant' || message.type === 'user'
        ? roughTokenCountEstimationForMessage(message) : JSON.stringify(message).length / 4), 0))
    if (start < groups.length && count + size > budget) break
    count += size
    start = i
  }
  const kept = groups.slice(start).flat()
  const dropped = messages.length - kept.length
  if (dropped <= 0) return messages
  return [createUserMessage({content: `[Earlier conversation truncated to fit the hook evaluator's context window — ${dropped} earlier messages omitted. Evaluate the condition against the recent transcript below; if the required evidence may be in the omitted prefix, return {"ok": false, "reason": "insufficient evidence in transcript"}.]`}), ...kept]
}
