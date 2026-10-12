import type { ServeEvent } from '../serveSession.js'
import type { RecordView } from './records.js'
import { object } from './records.js'

export type RecordedOutputReference = { recordId: string; index: number }

function persistedPath(content: unknown): string | null {
  if (typeof content !== 'string' || !content.startsWith('<persisted-output>\n')) return null
  return content.match(/^Output too large [^\n]* Full output saved to: ([^\n]+)$/m)?.[1] ?? null
}

function rawRow(event: ServeEvent): Record<string, unknown> | undefined {
  return event.type === 'sdk' ? object(event.message) : object(event.record)
}

function eventReferences(event: ServeEvent): Array<{reference: RecordedOutputReference; toolUseId?: string; content?: unknown}> {
  const recordId = event.recordId
  if (typeof recordId !== 'string') return []
  const row = rawRow(event)
  if (!row) return []
  const blocks = object(row.message)?.content
  const results = Array.isArray(blocks) ? blocks.map(object).filter((block): block is Record<string, unknown> => Boolean(block) && block?.type === 'tool_result') : []
  const paths = new Set<string>()
  const extraPath = object(row.toolUseResult)?.persistedOutputPath
  if (typeof extraPath === 'string') paths.add(extraPath)
  for (const result of results) { const path = persistedPath(result.content); if (path) paths.add(path) }
  const ordered = [...paths]
  return results.flatMap(result => {
    const path = persistedPath(result.content) ?? (results.length === 1 && typeof extraPath === 'string' ? extraPath : null)
    const index = path ? ordered.indexOf(path) : -1
    return index < 0 ? [] : [{ reference:{recordId,index},
      toolUseId:typeof result.tool_use_id === 'string' ? result.tool_use_id : undefined,content:result.content }]
  })
}

export function recordedOutputReferencesFromEvents(events: ServeEvent[]): RecordedOutputReference[] {
  const seen = new Set<string>()
  return events.flatMap(event => eventReferences(event)).flatMap(item => {
    const key = `${item.reference.recordId}:${item.reference.index}`
    if (seen.has(key)) return []
    seen.add(key)
    return [item.reference]
  })
}

export function recordedOutputReferences(record: RecordView): RecordedOutputReference[] {
  return recordedOutputReferencesFromEvents(record.sourceEvents ?? [record.event])
}

/** Find the original source event, never synthesize an ID from a grouped row. */
export function recordedOutputReferenceForBlock(record: RecordView, block: Record<string, unknown>): RecordedOutputReference | null {
  if (block.type !== 'tool_result') return null
  const source = (record.sourceEvents ?? [record.event]).flatMap(event => eventReferences(event))
  const exact = source.find(item => item.toolUseId === block.tool_use_id && item.content === block.content)
  return (exact ?? source.find(item => item.toolUseId === block.tool_use_id))?.reference ?? null
}

export function hasPersistedOutputMarker(block: Record<string, unknown>): boolean {
  return block.type === 'tool_result' && typeof block.content === 'string' && block.content.startsWith('<persisted-output>\n')
}
