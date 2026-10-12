import stripAnsi from 'strip-ansi'

/** Full recorded values, with real line breaks instead of JSON-escaped output.
 * This is display-only: never use it to build API context or system prompts.
 */
export function formatTranscriptValue(value: unknown, indent = ''): string {
  if (typeof value === 'string') return stripAnsi(value)
  if (value === null || typeof value !== 'object') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    return value.map((item, i) => `${indent}[${i}] ${formatTranscriptValue(item, indent + '  ')}`).join('\n')
  }
  const entries = Object.entries(value)
  if (!entries.length) return '{}'
  const fields = entries.map(([key, item]) => `${indent}${key}: ${formatTranscriptValue(item, indent + '  ')}`).join('\n')
  const block = value as {type?: string; thinking?: string}
  if (block.type === 'thinking') {
    return `${indent}${block.thinking ? 'Thinking text returned' : 'Thinking text not returned; metadata only'}\n${fields}`
  }
  if (block.type === 'redacted_thinking') return `${indent}Encrypted thinking (not decrypted)\n${fields}`
  return fields
}

/** Repeated UUIDs can occur across a compaction boundary (messagesToKeep).
 * Keep the latest record, without removing older distinct messages.
 */
export function uniqueTranscriptMessages<T extends {uuid: string}>(messages: readonly T[]): T[] {
  const last = new Map(messages.map((m, i) => [m.uuid, i]))
  return messages.filter((m, i) => last.get(m.uuid) === i)
}

/** Progress is normally omitted by the chat renderer. Project it to a display
 * record only; the source history and API normalization remain untouched.
 */
type TranscriptRecord = {uuid: string; type: string; timestamp?: string}
type ProgressDisplayRecord<T extends TranscriptRecord> = {
  type: 'system'; subtype: 'informational'; level: 'info'
  uuid: T['uuid']; timestamp: T['timestamp']; content: string
}
export function projectTranscriptHistory<T extends TranscriptRecord>(messages: readonly T[]): (T | ProgressDisplayRecord<T>)[] {
  return uniqueTranscriptMessages(messages).map<T | ProgressDisplayRecord<T>>(message => message.type === 'progress'
    ? {type: 'system', subtype: 'informational', level: 'info', uuid: message.uuid,
        timestamp: message.timestamp, content: formatTranscriptValue(message)}
    : message)
}
