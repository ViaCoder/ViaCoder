import type { Message } from '../../types/message.js'

export type RemoteReset = {
  type: 'conversation_reset'
  newConversationId: string
  trigger?: string
  userMessageUuid?: string
}

/** Accept future/missing trigger values; the reset identity is authoritative. */
export function readRemoteReset(value: unknown): RemoteReset | undefined {
  if (!value || typeof value !== 'object' || !('type' in value) || value.type !== 'conversation_reset') return
  const frame = value as Record<string, unknown>
  if (typeof frame.new_conversation_id !== 'string' || !frame.new_conversation_id.trim()) return
  return {
    type: 'conversation_reset', newConversationId: frame.new_conversation_id,
    ...(typeof frame.trigger === 'string' && { trigger: frame.trigger }),
    ...(typeof frame.user_message_uuid === 'string' && { userMessageUuid: frame.user_message_uuid }),
  }
}

/** Connection-scoped bookkeeping; never clear a later user submission on an old/duplicate reset. */
export class RemoteResetTracker {
  private seen = new Set<string>()
  private submissions = new Map<string, { sequence: number; clear: boolean; delivered: boolean }>()
  private sequence = 0
  private lastClearSequence = -1

  noteSubmission(uuid: string | undefined, content: unknown): void {
    if (!uuid) return
    const text = typeof content === 'string' ? content : Array.isArray(content)
      ? content.filter(b => b?.type === 'text').map(b => b.text).join('\n') : ''
    this.submissions.set(uuid, { sequence: ++this.sequence, clear: /^\/(?:clear|reset|new)(?:\s|$)/.test(text.trim()), delivered: false })
    // Bounded like the hook's echo filter. Very old uncorrelated frames fall back
    // to preserving unacknowledged submissions rather than guessing ordering.
    if (this.submissions.size > 2048) this.submissions.delete(this.submissions.keys().next().value!)
  }
  noteDelivered(uuid: string): void {
    const submission = this.submissions.get(uuid)
    if (submission) submission.delivered = true
  }
  forget(uuid: string | undefined): void { if (uuid) this.submissions.delete(uuid) }

  accept(reset: RemoteReset): Set<string> | undefined {
    if (this.seen.has(reset.newConversationId)) return
    this.seen.add(reset.newConversationId)
    if (this.seen.size > 2048) this.seen.delete(this.seen.values().next().value!)
    const own = reset.trigger === 'clear' && reset.userMessageUuid ? this.submissions.get(reset.userMessageUuid) : undefined
    if (own?.clear && own.sequence <= this.lastClearSequence) return
    if (own?.clear) this.lastClearSequence = own.sequence
    const preserved = new Set<string>()
    for (const [uuid, submission] of this.submissions) {
      if (own?.clear ? submission.sequence > own.sequence : !submission.delivered && !submission.clear) preserved.add(uuid)
    }
    return preserved
  }
}

/** Shared by live hooks and wire tests. No hooks, storage rotation or model work here. */
export function consumeRemoteReset(value: unknown, tracker: RemoteResetTracker, ui: {
  setMessages: (update: (messages: Message[]) => Message[]) => void
  clearTransientState: () => void
  onConversationReset?: (id: string) => void
}): boolean {
  const reset = readRemoteReset(value)
  if (!reset) return false
  const preserved = tracker.accept(reset)
  if (!preserved) return true
  ui.setMessages(messages => messages.filter(message => message.type === 'user' && preserved.has(message.uuid)))
  ui.clearTransientState()
  ui.onConversationReset?.(reset.newConversationId)
  return true
}
