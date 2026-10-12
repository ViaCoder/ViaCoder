import type { RecordView } from './records.js'
import { object } from './records.js'

export type ToolPresentation = { name: string; status: '成功' | '失败' | '已拒绝' | '结果未记录'; summary: string }

export function toolResultStatus(block: Record<string, unknown>): ToolPresentation['status'] {
  if (block.is_error !== true) return '成功'
  // Exact default denial emitted by ServeSession.approve and retained in a
  // fork's transcript even when its parent's live approval journal is absent.
  return block.content === 'Denied by user' ? '已拒绝' : '失败'
}

export function isPureToolResultRecord(record: RecordView): boolean {
  return record.kind === 'user' && Boolean(record.blocks?.length) &&
    record.blocks!.every(block => block.type === 'tool_result') && !record.text.trim()
}

export function toolSessionKey(recordId: unknown, sessionId: unknown): string {
  const match = typeof recordId === 'string' ? recordId.match(/^(?:journal|transcript):([^:]+):\d+$/) : null
  return match?.[1] ?? String(sessionId ?? '')
}

function short(value: string): string {
  const line = value.replace(/\s+/g, ' ').trim()
  return line.length > 150 ? `${line.slice(0, 150)}…` : line
}

function textContent(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(item => {
    const block = object(item)
    return block?.type === 'text' && typeof block.text === 'string' ? block.text : ''
  }).filter(Boolean).join('\n')
  return ''
}

export function inputSummary(value: unknown): string {
  const input = object(value)
  if (!input) return typeof value === 'string' ? short(value) : '输入见详情'
  for (const key of ['command', 'file_path', 'path', 'url', 'query', 'pattern', 'description', 'prompt']) {
    if (typeof input[key] === 'string' && input[key].trim()) return short(input[key])
  }
  return Object.keys(input).length ? `${Object.keys(input).slice(0, 4).join('、')} · 输入见详情` : '无输入参数'
}

function resultSummary(block: Record<string, unknown>, toolName?: string): string {
  const body = textContent(block.content)
  if (body.startsWith('<persisted-output>\n')) return '输出已外置保存 · 预览及路径见详情'
  if(toolName==='Read'&&block.is_error!==true&&body.trim()){
    const numberedLines=body.match(/^\s*\d+(?:→|\t)/gm)?.length
    return `读取结果${numberedLines?` · ${numberedLines} 行带行号内容`:''} · 完整输出见详情`
  }
  return body.trim() ? short(body) : Array.isArray(block.content) && block.content.length
    ? `${block.content.length} 个内容块 · 详情见原始输出` : '无输出正文'
}

/** Display-only projection. IDs, failures, and content come from recorded blocks only. */
export function toolPresentations(records: RecordView[]): Map<string, ToolPresentation> {
  const calls = new Map<string, {name: string; summary: string}>()
  const results = new Map<string, Record<string, unknown>>()
  for (const record of records) for (const block of record.blocks ?? []) {
    const session = toolSessionKey(record.event.recordId, record.event.sessionId)
    if (block.type === 'tool_use' && typeof block.id === 'string') calls.set(`${session}:${block.id}`, {
      name: String(block.name ?? '工具调用'), summary: inputSummary(block.input),
    })
    if (block.type === 'tool_result' && typeof block.tool_use_id === 'string') results.set(`${session}:${block.tool_use_id}`, block)
  }
  const presentations = new Map<string, ToolPresentation>()
  for (const [id, call] of calls) {
    const result = results.get(id)
    presentations.set(id, {name:call.name, status:result ? toolResultStatus(result) : '结果未记录', summary:call.summary})
  }
  for (const [id, result] of results) presentations.set(`${id}:result`, {
    name:calls.get(id)?.name ?? '工具结果', status:toolResultStatus(result), summary:resultSummary(result,calls.get(id)?.name),
  })
  return presentations
}

export function presentationForBlock(block: Record<string, unknown>, sessionId: unknown,
  presentations: Map<string, ToolPresentation>): ToolPresentation {
  const id = `${String(sessionId ?? '')}:${String(block.type === 'tool_use' ? block.id ?? '' : block.tool_use_id ?? '')}`
  return presentations.get(block.type === 'tool_result' ? `${id}:result` : id) ?? {
    name: block.type === 'tool_use' ? String(block.name ?? '工具调用') : '工具结果',
    status: block.type === 'tool_result' ? toolResultStatus(block) : '结果未记录',
    summary: block.type === 'tool_use' ? inputSummary(block.input) : resultSummary(block),
  }
}
