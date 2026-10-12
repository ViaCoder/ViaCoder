import type { Message, NormalizedMessage } from '../../types/message.js'
import { normalizeMessages } from '../../utils/messages.js'
import { projectTranscriptHistory } from './transcriptDetail.js'

/** UI-only normalization: keep metadata that chat summaries omit, including
 * records with no content blocks. API normalization is intentionally separate.
 */
export function normalizeTranscriptHistory(messages: Message[]): NormalizedMessage[] {
  return projectTranscriptHistory(messages).flatMap<NormalizedMessage>(message => {
    const normalized = normalizeMessages([message])
    // normalizeMessages preserves the record's discriminant. The source and row
    // are correlated here; spreading the two unions otherwise invents impossible
    // system/user combinations (for example boolean isMeta on a user message).
    if (normalized.length) return normalized.map(row => ({...message, ...row}) as NormalizedMessage)
    return [{type: 'system' as const, subtype: 'informational' as const, level: 'info' as const, uuid: message.uuid,
      timestamp: message.timestamp, content: '', transcriptRecord: message}]
  })
}
