import type { ServeEvent, ServeSnapshot } from '../serveSession.js'
import type { RemoteMessageContent } from '../../utils/teleport/api.js'
import type { PermissionUpdate } from '../../types/permissions.js'
import type { PermissionRulesState } from '../../cli/control/permissionRules.js'
import type { LocalSessionTitleState } from '../../cli/control/renameObservation.js'
import type { SharedEffortState } from '../sharedEffortState.js'
import {
  acceptSessionHostEvent,
  assertSessionHostIdentity,
  type SessionHostCapabilities,
  type SessionHostIdentity,
  type SessionHostOwner,
  type SessionHostSnapshot,
} from '../sessionHost.js'

export type Command = { name: string; description?: string; argumentHint?: string; supported?: boolean; reason?: string }
export type Capabilities = { commands?: Command[]; models?: Array<{ value?: string; displayName?: string }>;
  permissionMode?: string; permissionModes?: {bypassPermissions?:boolean;auto?:boolean}; currentModel?: string; currentModelChoice?: string; modelPending?: string; effortState?: SharedEffortState;
  localWeb?: {version:1;controls:Array<'local_update_permission_rules'|'local_get_session_title'|
    'local_public_diff'|'local_public_doctor'|'local_public_checkpoints'|'local_public_tasks'|'local_public_export'|'local_public_branch'|
    'local_public_tag'|'local_public_memory'|'local_public_effort'|'local_public_color'|'local_public_config'>}; [key: string]: unknown }
export type WebControl = { subtype: 'interrupt' } | { subtype: 'get_plan' } | { subtype: 'list_permission_rules' } |
  { subtype: 'set_model'; model?: string } |
  { subtype: 'local_public_effort'; value?: string; expectedModel?: string } |
  { subtype: 'local_public_color'; color: 'red'|'blue'|'green'|'yellow'|'purple'|'orange'|'pink'|'cyan'|'default' } |
  { subtype: 'set_permission_mode'; mode: 'default' | 'plan' | 'acceptEdits' | 'dontAsk' | 'bypassPermissions' | 'auto' } |
  { subtype: 'rename_session'; title: string } |
  { subtype: 'local_get_session_title'; session_id?: string } |
  { subtype: 'local_update_permission_rules'; update: {
    type: 'addRules' | 'removeRules'; behavior: 'allow' | 'ask' | 'deny';
    destination: 'userSettings' | 'projectSettings' | 'localSettings' | 'session' | 'cliArg';
    rules?: Array<{ toolName: string; ruleContent?: string }>; ruleText?: string
  } }
export type SessionSummary = ServeSnapshot & { title?: string; updatedAt?: number; confirmedMemoryTitle?: string }

/** Old transcript-only snapshots intentionally have no live host identity. */
export function projectSessionHostSnapshot(session: SessionSummary): SessionHostSnapshot | undefined {
  if (!session.identity || !session.owner || !session.hostCapabilities) return undefined
  return {
    identity: session.identity,
    owner: session.owner as SessionHostOwner,
    capabilities: session.hostCapabilities as SessionHostCapabilities,
    closed: session.closed,
  }
}
export type HostInfo = { hostname: string; initialDirectory: string }
export type HostDirectoryListing = { path: string; parent: string | null;
  directories: Array<{ name: string; path: string }> }
export type HistoryPage = { journal?: {events:ServeEvent[];after:number;evidence?:{nextAfter:number;hasMore:boolean}}; events: ServeEvent[]; hasOlder: boolean; hasMore: boolean; before: number;
  nextAfter: number; total: number; through: number; eventSource: 'transcript' | 'journal' }
export type HistoryPageQuery = { limit?: number; before?: number; after?: number; through?: number; evidenceAfter?:number; evidenceThrough?:number }
export type FollowPhase = 'loading' | 'connecting' | 'live' | 'reconnecting' | 'history-follow' | 'stopped' | 'failed'
// getRandomValues also works on the explicitly supported HTTP LAN origins;
// crypto.randomUUID is restricted to secure contexts in browsers.
export function newOperationId(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('')
}
export function selectContiguousEvents(cursor: number, events: ServeEvent[]): { cursor: number; events: ServeEvent[] } {
  const fresh: ServeEvent[] = []
  for (const event of events) {
    if (!event || !Number.isSafeInteger(event.seq) || typeof event.type !== 'string' || !Number.isFinite(event.at)) throw Error('收到无效的会话事件')
    if (event.seq <= cursor) continue
    if (event.seq !== cursor + 1) throw Error(`记录序号不连续（${cursor} → ${event.seq}），正在重新同步`)
    fresh.push(event); cursor = event.seq
  }
  return { cursor, events: fresh }
}
export class WebRequestError extends Error {
  constructor(message: string, readonly status: number) { super(message) }
}
export class WebAPI {
  constructor(readonly token = '', readonly base = '') {}
  async request<T>(path: string, init: RequestInit = {}, signal?: AbortSignal): Promise<T> {
    const response = await fetch(this.base + path, { ...init, signal, headers: {
      'content-type': 'application/json', ...(this.token ? { authorization: `Bearer ${this.token}` } : {}), ...init.headers,
    } })
    const result = await response.json()
    if (!response.ok) throw new WebRequestError(result.error ?? `HTTP ${response.status}`, response.status)
    return result as T
  }
  async list(signal?: AbortSignal): Promise<SessionSummary[]> {
    const result = await this.request<{ sessions: SessionSummary[] }>('/v1/sessions', {}, signal)
    return result.sessions
  }
  async history(id: string, signal?: AbortSignal): Promise<ServeEvent[]> {
    const events: ServeEvent[] = []
    let cursor = 0
    for (;;) {
      const page = await this.request<{events:ServeEvent[];nextCursor:number;hasMore:boolean}>(
        `/v1/sessions/${id}/events?after=${cursor}&limit=500`, {}, signal)
      const accepted = selectContiguousEvents(cursor, page.events)
      events.push(...accepted.events); cursor = accepted.cursor
      if (page.nextCursor !== cursor || (page.hasMore && !page.events.length)) throw Error('历史记录分页不连续')
      if (!page.hasMore) return events
    }
  }
  /** Tail-first bounded history; `through` freezes a prepend walk while new rows arrive. */
  async historyPage(id: string, query: HistoryPageQuery = {}, signal?: AbortSignal): Promise<HistoryPage> {
    const limit = query.limit ?? 80
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > 500 ||
      (query.before !== undefined && query.after !== undefined)) throw Error('无效的历史分页参数')
    const params = new URLSearchParams({ limit: String(limit) })
    for (const key of ['before', 'after', 'through', 'evidenceAfter', 'evidenceThrough'] as const) {
      const value = query[key]
      if (value !== undefined) {
        if (!Number.isSafeInteger(value) || value < 0) throw Error('无效的历史游标')
        params.set(key, String(value))
      }
    }
    const page = await this.request<HistoryPage>(`/v1/sessions/${encodeURIComponent(id)}/history?${params}`, {}, signal)
    if (!Array.isArray(page.events) || !Number.isSafeInteger(page.through) || !Number.isSafeInteger(page.total) ||
      typeof page.hasOlder !== 'boolean' || typeof page.hasMore !== 'boolean' ||
      !['journal', 'transcript'].includes(page.eventSource)) throw Error('历史记录分页格式无效')
    let last = 0
    for (const event of page.events) {
      if (!event || !Number.isSafeInteger(event.seq) || event.seq <= last || typeof event.type !== 'string' ||
        !Number.isFinite(event.at)) throw Error('历史记录分页次序无效')
      last = event.seq
    }
    if (page.journal !== undefined) {
      const journal = page.journal
      if (!journal || !Number.isSafeInteger(journal.after) || journal.after < 0 || !Array.isArray(journal.events)) throw Error('实时历史游标格式无效')
      let lastJournal = 0
      for (const event of journal.events) {
        if (!event || !Number.isSafeInteger(event.seq) || event.seq <= lastJournal || event.seq > journal.after ||
          typeof event.type !== 'string' || !Number.isFinite(event.at)) throw Error('实时历史次序无效')
        lastJournal = event.seq
      }
      const evidence=journal.evidence
      if(evidence && (!Number.isSafeInteger(evidence.nextAfter)||evidence.nextAfter<0||evidence.nextAfter>journal.after||typeof evidence.hasMore!=='boolean'||
        evidence.hasMore&&evidence.nextAfter<=(query.evidenceAfter??0))) throw Error('历史证据分页游标无效')
    }
    if (query.before !== undefined && page.events.some(event => event.seq >= query.before!) ||
      query.after !== undefined && page.events.some(event => event.seq <= query.after!) ||
      page.events.some(event => event.seq > page.through)) throw Error('历史记录游标越界')
    return page
  }
  /** Related historical witnesses have their own cursor; never advance follow. */
  async *historyEvidencePages(id:string, first:HistoryPage, query:HistoryPageQuery, signal?:AbortSignal):AsyncGenerator<ServeEvent[]> {
    let page=first
    while(page.journal?.evidence?.hasMore && !signal?.aborted){
      page=await this.historyPage(id,{...query,through:first.through,evidenceThrough:first.journal!.after,
        evidenceAfter:page.journal.evidence.nextAfter},signal)
      if(signal?.aborted)return
      if(page.eventSource!==first.eventSource||page.journal?.after!==first.journal!.after)throw Error('历史证据来源已改变')
      yield page.journal.events
    }
  }
  host(signal?: AbortSignal) { return this.request<HostInfo>('/v1/host', {}, signal) }
  async sessionHost(id: string, signal?: AbortSignal): Promise<SessionHostSnapshot | undefined> {
    return projectSessionHostSnapshot(await this.request<SessionSummary>(`/v1/sessions/${encodeURIComponent(id)}`, {}, signal))
  }
  recordedOutput(sessionId: string, recordId: string, index: number, signal?: AbortSignal) {
    const query = new URLSearchParams({recordId,index:String(index)})
    return this.request<{recordId:string;index:number;content:string}>(`/v1/sessions/${encodeURIComponent(sessionId)}/recorded-output?${query}`, {}, signal)
  }
  directories(path?: string, signal?: AbortSignal) { return this.request<HostDirectoryListing>(`/v1/directories${path === undefined ? '' : `?path=${encodeURIComponent(path)}`}`, {}, signal) }
  create(cwd: string) { return this.request<SessionSummary>('/v1/sessions', { method: 'POST', body: JSON.stringify({ cwd }) }) }
  continueSession(id: string, cwd?: string) { return this.request<SessionSummary>(`/v1/sessions/${id}/continue`, { method: 'POST', ...(cwd === undefined ? {} : {body: JSON.stringify({cwd})}) }) }
  branchSession(id: string, title?: string, operationId = newOperationId()) {
    return this.request<SessionSummary>(`/v1/sessions/${id}/branch`, {method:'POST',body:JSON.stringify({operationId,...(title === undefined ? {} : {title})})})
  }
  async turn(id: string, operationId: string, content: RemoteMessageContent, intent?: 'literal' | 'command') {
    const result=await this.request<{operationId:string;queued:boolean}>(`/v1/sessions/${id}/turns`, { method: 'POST', body: JSON.stringify({ operationId, content, source: 'web', ...(intent ? {intent} : {}) }) })
    if(result.operationId!==operationId || result.queued!==true)throw Error('提交确认格式异常；结果未知，请核对会话后重试')
    return result
  }
  approve(id: string, requestId: string, allowed: boolean, updatedInput: Record<string, unknown>, updatedPermissions?: PermissionUpdate[],
    denial?: { message?: string; interrupt?: boolean }) {
    return this.request(`/v1/sessions/${id}/approvals`, { method: 'POST', body: JSON.stringify({ operationId: newOperationId(), requestId, allowed,
      updatedInput, ...(updatedPermissions?.length ? { updatedPermissions } : {}),
      ...(!allowed && denial?.message !== undefined ? { denyMessage: denial.message } : {}),
      ...(!allowed && denial?.interrupt === true ? { interrupt: true } : {}) }) })
  }
  answerElicitation(id: string, requestId: string, action: 'accept' | 'decline' | 'cancel', content?: Record<string, unknown>) {
    return this.request(`/v1/sessions/${id}/interactions`, { method: 'POST', body: JSON.stringify({
      operationId: newOperationId(), requestId, action, ...(content === undefined ? {} : { content }),
    }) })
  }
  control(id: string, request: WebControl, operationId = newOperationId()) {
    return this.request<{ operationId: string; accepted: true; response?: unknown }>(`/v1/sessions/${id}/controls`,
      { method: 'POST', body: JSON.stringify({ operationId, request }) })
  }
  async getPlan(id: string): Promise<{ exists: false } | { exists: true; content: string }> {
    const result = await this.control(id, { subtype: 'get_plan' })
    const value = result.response
    if (value && typeof value === 'object' && 'exists' in value) {
      if (value.exists === false) return { exists: false }
      if (value.exists === true && 'content' in value && typeof value.content === 'string') return { exists: true, content: value.content }
    }
    throw new Error('执行器返回的计划格式无效')
  }
  async listPermissionRules(id: string): Promise<PermissionRulesState> {
    const result = await this.control(id, { subtype: 'list_permission_rules' })
    const value = result.response
    if (value && typeof value === 'object' && 'state' in value && value.state &&
      typeof value.state === 'object' && 'rules' in value.state && Array.isArray(value.state.rules)) {
      return value.state as PermissionRulesState
    }
    throw new Error('执行器返回的权限规则格式无效')
  }
  async updatePermissionRules(id: string, update: Extract<WebControl, { subtype: 'local_update_permission_rules' }>['update']): Promise<PermissionRulesState> {
    const result = await this.control(id, { subtype: 'local_update_permission_rules', update })
    const value = result.response
    if (value && typeof value === 'object' && 'state' in value && value.state && typeof value.state === 'object' && 'rules' in value.state && Array.isArray(value.state.rules)) return value.state as PermissionRulesState
    throw new Error('执行器返回的权限规则格式无效')
  }
  async titleState(id: string): Promise<LocalSessionTitleState> {
    const result = await this.control(id, { subtype: 'local_get_session_title', session_id: id })
    const value = result.response
    if (value && typeof value === 'object' && 'state' in value && value.state && typeof value.state === 'object' && 'session_id' in value.state && value.state.session_id === id) return value.state as LocalSessionTitleState
    throw new Error('执行器返回的标题状态格式无效')
  }
  /** Numbered pages and a cursor-following socket, never replay model operations. */
  follow(id: string, receive: (events: ServeEvent[]) => void, state: (status: string, phase?: FollowPhase) => void, fail: (error: Error) => void,
    fromCursor = 0): () => void {
    const controller = new AbortController()
    let cursor = fromCursor, stopped = false, socket: WebSocket | undefined, retry: ReturnType<typeof setTimeout> | undefined
    let hostIdentity: SessionHostIdentity | undefined
    const path = `/v1/sessions/${id}`
    let attempted = false
    const status = (phase: FollowPhase, label: string) => state(label, phase)
    const accept = (events: ServeEvent[]) => {
      if (stopped) return
      const batch = selectContiguousEvents(cursor, events)
      const accepted = batch.events.filter(event => {
        const candidate = typeof event.sessionId === 'string' && typeof event.ownerId === 'string' &&
          Number.isSafeInteger(event.epoch)
          ? { sessionId: event.sessionId, ownerId: event.ownerId, epoch: event.epoch as number }
          : undefined
        if (!candidate) return true
        if (!hostIdentity) { hostIdentity = candidate; return true }
        const next = acceptSessionHostEvent(hostIdentity, {
          type: event.type, sessionId: candidate.sessionId, ownerId: candidate.ownerId, epoch: candidate.epoch,
        })
        if (!next) return false
        hostIdentity = next
        return true
      })
      if (accepted.length) receive(accepted)
      cursor = batch.cursor
    }
    const connect = async () => {
      status(attempted ? 'reconnecting' : 'connecting', attempted ? '正在重连' : '读取历史')
      attempted = true
      try {
        for (;;) {
          const page = await this.request<{ events: ServeEvent[]; hasMore: boolean; nextCursor: number }>(`${path}/events?after=${cursor}&limit=500`, {}, controller.signal)
          accept(page.events)
          if (stopped) return
          if (page.nextCursor !== cursor || (page.hasMore && !page.events.length)) throw Error('历史记录分页不连续')
          if (!page.hasMore) break
        }
        if (stopped) return
        const snapshot = await this.request<SessionSummary>(path, {}, controller.signal)
        const host = projectSessionHostSnapshot(snapshot)
        if (host) {
          if (hostIdentity) assertSessionHostIdentity(hostIdentity, host.identity)
          hostIdentity = host.identity
        }
        if (snapshot.closed) {
          if (snapshot.historySource === 'transcript') {
            status('history-follow', '只读跟随 · 外部进程状态未知')
            retry = setTimeout(connect, 1500)
          } else { status('stopped', '已停止 · 历史只读'); retry = setTimeout(connect, 3000) }
          return
        }
        const url = new URL(this.base + `${path}/ws?after=${cursor}`, location.href)
        url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
        const opened = new WebSocket(url, [this.token ? `cc.serve.${this.token}` : 'cc.serve'])
        socket = opened
        opened.onopen = () => { if (!stopped && socket === opened) status('live', '实时同步') }
        opened.onmessage = event => {
          if (stopped || socket !== opened) return
          try { accept([JSON.parse(String(event.data))]) }
          catch (error) { if (!stopped) fail(error as Error); opened.close() }
        }
        opened.onclose = () => { if (socket !== opened) return; socket = undefined
          if (!stopped) { status('reconnecting', '连接中断'); retry = setTimeout(connect, 1500) } }
      } catch (error) {
        if (stopped) return
        status('failed', '同步失败'); fail(error as Error)
        // Preserve the accepted cursor and rows. Re-fetch on temporary transport
        // failure, never re-send a user/model operation; terminal HTTP rejection
        // stays visible instead of silently looping.
        if (!(error instanceof WebRequestError) || error.status >= 500)
          retry = setTimeout(connect, 1500)
      }
    }
    void connect()
    return () => { stopped = true; controller.abort(); clearTimeout(retry); socket?.close() }
  }
}
