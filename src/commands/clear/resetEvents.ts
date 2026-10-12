import { randomUUID, type UUID } from 'node:crypto'

/** npm 2.1.283: internal query event and external SDK event are different shapes. */
export type ConversationResetEvent = {
  type: 'conversation_reset'
  newConversationId: UUID
}
export type ConversationResetTrigger = 'clear' | 'plan_mode_exit' | 'fresh_session' | 'onboarding'
export type ConversationResetSdkEvent = {
  type: 'conversation_reset'
  new_conversation_id: UUID
  trigger?: ConversationResetTrigger
  user_message_uuid?: string
  timestamp: string
}
export type ClearCommandContextExtension = {
  /** Replaces the legacy setConversationId callback when present. Synchronous UI update. */
  onConversationReset?: (event: ConversationResetEvent) => void
  /** Enqueue the raw SDK event synchronously; do not send it as a transcript message. */
  enqueueConversationReset?: (event: ConversationResetSdkEvent) => void
  resetTrigger?: ConversationResetTrigger
  /** Invocation's user-message UUID, not the last arbitrary transcript message. */
  resetUserMessageUuid?: string
}

const canonicalUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function createConversationResetEvents(options: {
  trigger?: ConversationResetTrigger
  userMessageUuid?: string
} = {}): { query: ConversationResetEvent; sdk: ConversationResetSdkEvent } {
  const id = randomUUID()
  const userUuid = options.trigger === 'clear' && options.userMessageUuid && canonicalUuid.test(options.userMessageUuid)
    ? options.userMessageUuid : undefined
  return {
    query: { type: 'conversation_reset', newConversationId: id },
    sdk: {
      type: 'conversation_reset', new_conversation_id: id,
      ...(options.trigger !== undefined && { trigger: options.trigger }),
      ...(userUuid !== undefined && { user_message_uuid: userUuid }),
      timestamp: new Date().toISOString(),
    },
  }
}

/** Apply at SDK queue drain time, after session rotation, just like other SDK events. */
export function toConversationResetSdkFrame(event: ConversationResetSdkEvent, sessionId: string) {
  return { ...event, uuid: randomUUID(), session_id: sessionId }
}

/** Per-host queue. Keep frame UUIDs stable if a synchronous bridge write fails. */
export class ConversationResetBuffer {
  private pending: Array<{ event: ConversationResetSdkEvent; frame?: ReturnType<typeof toConversationResetSdkFrame> }> = []
  get size(): number { return this.pending.length }
  enqueue = (event: ConversationResetSdkEvent): void => { this.pending.push({ event }) }
  flush(send: (frame: ReturnType<typeof toConversationResetSdkFrame>) => void, sessionId: string): void {
    while (this.pending.length) {
      const item = this.pending[0]!
      item.frame ??= toConversationResetSdkFrame(item.event, sessionId)
      send(item.frame)
      this.pending.shift()
    }
  }
  /** Official L4e: a registered/ready bridge is not necessarily worker-active.
   * Hold the reset AND subsequent transcript until active (outbound mirror exempt). */
  flushForBridge(
    send: (frame: ReturnType<typeof toConversationResetSdkFrame>) => void,
    sessionId: string,
    state: { connected: boolean; sessionActive: boolean; outboundOnly: boolean },
  ): boolean {
    if (!state.connected || (this.size > 0 && !state.sessionActive && !state.outboundOnly)) return false
    this.flush(send, sessionId)
    return true
  }
  drain(sessionId: string): ReturnType<typeof toConversationResetSdkFrame>[] {
    const frames: ReturnType<typeof toConversationResetSdkFrame>[] = []
    this.flush(frame => { frames.push(frame) }, sessionId)
    return frames
  }
}
