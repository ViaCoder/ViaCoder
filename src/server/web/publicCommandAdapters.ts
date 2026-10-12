import type { ServeSnapshot } from '../serveSession.js'
import { newOperationId, type Capabilities, type Command, type SessionSummary, type WebAPI } from './client.js'
import type { PublicCommandControl } from '../servePublicCommands.js'

/** Public commands rendered by the Web shell. Terminal-only views are not projected. */
export const PUBLIC_COMMANDS = ['help', 'status', 'doctor', 'diff', 'resume', 'session', 'skills', 'plugin',
  'hooks', 'memory', 'branch', 'tag', 'export', 'rewind', 'tasks'] as const
export type PublicCommandName = typeof PUBLIC_COMMANDS[number]
export type PublicCommandRequest = PublicCommandControl

const record = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null

export function executableTextCommand(name: string, capabilities: Capabilities): Command | undefined {
  return capabilities.commands?.find(command => command.name === name && command.supported !== false)
}

export function helpEntries(capabilities: Capabilities): Array<{ name: string; description: string }> {
  const available = (capabilities.commands ?? []).filter(command => command.supported !== false)
  return available.map(command => ({ name: `/${command.name}`, description: command.description ?? '' }))
}

const LOCAL_REQUIREMENT: Partial<Record<PublicCommandName,string>> = {
  rewind:'local_public_checkpoints', doctor:'local_public_doctor', diff:'local_public_diff', tasks:'local_public_tasks', export:'local_public_export',
  memory:'local_public_memory', tag:'local_public_tag', branch:'local_public_branch',
}
export function publicCommandAvailable(name: PublicCommandName, capabilities: Capabilities,
  advertisedControls: readonly string[] = capabilities.localWeb?.controls ?? []): boolean {
  const required = LOCAL_REQUIREMENT[name]
  return !required || advertisedControls.includes(required)
}

export function nextPublicControls(previous: { sessionId:string; controls:readonly string[] },
  sessionId: string, capabilities: Capabilities): { sessionId:string; controls:readonly string[] } {
  if (previous.sessionId !== sessionId) return { sessionId, controls:capabilities.localWeb?.controls ?? [] }
  return capabilities.localWeb?.controls ? { sessionId, controls:capabilities.localWeb.controls } : previous
}

export function publicRequestCurrent(expectedSession: string, expectedRevision: number,
  currentSession: string, currentRevision: number): boolean {
  return expectedSession === currentSession && expectedRevision === currentRevision
}

/** The control route is the existing single worker lane; no management request creates a model turn. */
export async function publicWorkerControl(api: WebAPI, id: string, request: PublicCommandRequest,
  operationId = newOperationId(), signal?: AbortSignal): Promise<unknown> {
  const result = await api.request<{ accepted: boolean; response?: unknown }>(`/v1/sessions/${encodeURIComponent(id)}/controls`, {
    method: 'POST', body: JSON.stringify({ request, operationId }),
  }, signal)
  if (result.accepted !== true) throw new Error('执行器未接受命令')
  return result.response
}

export function publicSessionStatus(session: ServeSnapshot) {
  return {
    会话: session.title || session.sessionId,
    目录: session.cwd ?? '未知',
    状态: session.closed ? '已停止' : session.activeOperationId ? '正在执行' : '空闲',
    排队操作: session.queuedOperationIds.length,
    待审批: session.pendingApprovalIds.length,
    待交互: session.pendingElicitationIds.length,
    已记录事件: session.lastSeq,
  }
}

export function checkedRewindPreview(value: unknown): { canRewind: boolean; filesChanged: string[]; insertions: number; deletions: number; error?: string } {
  const row = record(value)
  if (!row || typeof row.canRewind !== 'boolean' || (row.filesChanged !== undefined &&
    (!Array.isArray(row.filesChanged) || !row.filesChanged.every(file => typeof file === 'string'))))
    throw new Error('执行器返回的回退预览格式无效')
  return { canRewind: row.canRewind, filesChanged: row.filesChanged as string[] ?? [],
    insertions: typeof row.insertions === 'number' ? row.insertions : 0,
    deletions: typeof row.deletions === 'number' ? row.deletions : 0,
    ...(typeof row.error === 'string' ? { error: row.error } : {}) }
}

export type PublicTask = { id:string; type:string; status:string; description:string; startTime:number; endTime?:number; toolUseId?:string }
export function checkedTasks(value: unknown): PublicTask[] {
  const rows = record(value)?.tasks
  if (!Array.isArray(rows)) throw new Error('执行器返回的任务列表格式无效')
  return rows.map(item => {
    const row = record(item)
    if (!row || typeof row.id !== 'string' || typeof row.type !== 'string' ||
      !['pending','running','completed','failed','killed'].includes(String(row.status)) ||
      typeof row.description !== 'string' || typeof row.startTime !== 'number')
      throw new Error('执行器返回的任务行格式无效')
    return { id:row.id, type:row.type, status:row.status as string, description:row.description,
      startTime:row.startTime, ...(typeof row.endTime === 'number' ? { endTime:row.endTime } : {}),
      ...(typeof row.toolUseId === 'string' ? { toolUseId:row.toolUseId } : {}) }
  })
}

export type PublicMemoryFile = { id:string; type:'User'|'Project'; label:string; exists:boolean }
export function checkedMemoryFiles(value: unknown): PublicMemoryFile[] {
  const rows = record(value)?.files
  if (!Array.isArray(rows)) throw new Error('执行器返回的记忆文件列表格式无效')
  return rows.map(item => {
    const row = record(item)
    if (!row || typeof row.id !== 'string' || !['User','Project'].includes(String(row.type)) ||
      typeof row.label !== 'string' || typeof row.exists !== 'boolean') throw new Error('执行器返回的记忆文件行格式无效')
    return { id:row.id, type:row.type as PublicMemoryFile['type'], label:row.label, exists:row.exists }
  })
}

export function checkedMemoryRead(value: unknown): { id:string; content:string; contentHash:string; redacted:boolean } {
  const row = record(value)
  if (!row || typeof row.id !== 'string' || typeof row.content !== 'string' ||
    typeof row.contentHash !== 'string' || typeof row.redacted !== 'boolean') throw new Error('执行器返回的记忆内容格式无效')
  return { id:row.id, content:row.content, contentHash:row.contentHash, redacted:row.redacted }
}

export function checkedTextExport(value: unknown): { filename:string; content:string } {
  const row = record(value)
  if (!row || typeof row.filename !== 'string' || !/^conversation-[\w.-]+\.txt$/.test(row.filename) ||
    typeof row.content !== 'string') throw new Error('执行器返回的导出文件格式无效')
  return { filename:row.filename, content:row.content }
}

export function checkedTagResult(value: unknown): { tag:string; confirmationRequired?:boolean; removed?:boolean } {
  const row = record(value)
  if (!row || typeof row.tag !== 'string' ||
    row.confirmationRequired !== undefined && typeof row.confirmationRequired !== 'boolean' ||
    row.removed !== undefined && typeof row.removed !== 'boolean') throw new Error('执行器返回的标签格式无效')
  return { tag:row.tag, ...(row.confirmationRequired === true ? {confirmationRequired:true} : {}),
    ...(row.removed === true ? {removed:true} : {}) }
}

export function checkedBranchResult(value: unknown): { sessionId:string; title:string } {
  const row = record(value)
  if (!row || typeof row.sessionId !== 'string' || typeof row.title !== 'string')
    throw new Error('执行器返回的分支格式无效')
  return { sessionId:row.sessionId, title:row.title }
}

export async function listResumableSessions(api: WebAPI): Promise<SessionSummary[]> {
  return api.list()
}

export type PublicCheckpoint = {messageId:string;timestamp:string;label:string}
export function checkedCheckpoints(value:unknown):{enabled:boolean;checkpoints:PublicCheckpoint[]} {
  const row=record(value)
  if(!row||typeof row.enabled!=='boolean'||!Array.isArray(row.checkpoints))throw Error('检查点列表格式无效')
  const checkpoints=row.checkpoints.map(item=>{
    const point=record(item)
    if(!point||typeof point.messageId!=='string'||!point.messageId||typeof point.timestamp!=='string'||typeof point.label!=='string')throw Error('检查点记录格式无效')
    return {messageId:point.messageId,timestamp:point.timestamp,label:point.label}
  })
  return {enabled:row.enabled,checkpoints}
}
