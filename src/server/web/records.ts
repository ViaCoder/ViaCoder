import { compareEventPosition } from './sessionState.js'
import type { ServeEvent } from '../serveSession.js'
import {parseLocalCommandText} from '../sharedLocalCommandText.js'

export type RecordView = { id: string; kind: 'user' | 'assistant' | 'tool' | 'system' | 'approval'; title: string;
  text: string; at: number; event: ServeEvent; blocks?: Record<string, unknown>[]; sourceEvents?: ServeEvent[];
  sortSeq?: number; notice?: boolean; status?: string; compactSummary?: boolean }
export function object(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : undefined
}
export function formatValue(value: unknown): string { return typeof value === 'string' ? value : JSON.stringify(value, null, 2) ?? '' }
/** Protocol signatures are never natural-language thinking. */
export function thinkingText(block: Record<string, unknown>): string | null {
  return block.type === 'thinking' && typeof block.thinking === 'string' && block.thinking.trim() ? block.thinking : null
}
function approvalPreview(input: unknown): string {
  const row = object(input)
  if (!row) return typeof input === 'string' ? input : '输入详情见原始事件。'
  const fields = ['command', 'file_path', 'path', 'url', 'query', 'description']
    .flatMap(key => typeof row[key] === 'string' ? [`${key}: ${row[key]}`] : [])
  const summary = fields.join('\n')
  return summary.length > 2000 ? `${summary.slice(0, 2000)}\n…预览已缩短，完整输入见原始事件。`
    : summary || '输入详情见原始事件。'
}
const cache = new WeakMap<ServeEvent, RecordView>()
export function toRecord(event: ServeEvent): RecordView {
  const found = cache.get(event)
  if (found) return found
  const base = { id: typeof event.recordId === 'string' ? event.recordId : String(event.seq), at: event.at, event }
  let record: RecordView
  if (event.type === 'transcript_record') {
    const row = object(event.record)
    if (row?.type === 'system' && row.subtype === 'local_command' && typeof row.content === 'string') {
      const output = /^<local-command-(stdout|stderr)>([\s\S]*)<\/local-command-\1>$/.exec(row.content)
      record = { ...base, kind: 'system', notice: true, title: '本地指令结果', text: output?.[2] ?? row.content }
    } else record = { ...base, kind: 'system', title: String(row?.type ?? '历史元数据'), text: '' }
  } else if (event.type === 'turn_queued') {
    const blocks = Array.isArray(event.content) ? event.content.map(object).filter((b): b is Record<string, unknown> => Boolean(b)) : undefined
    record = { ...base, kind: 'user', title: event.source === 'terminal' ? '来自终端' : '你',
      text: typeof event.content === 'string' ? event.content : blocks
        ? blocks.filter(block => block.type === 'text').map(block => String(block.text ?? '')).join('\n\n')
        : '此历史事件未保存输入正文；保留事件详情。', blocks }
  } else if (event.type === 'permission_request') record = { ...base, kind: 'approval', title: String(event.toolName ?? '工具审批'), text: approvalPreview(event.input) }
  else if (event.type === 'elicitation_request') {
    const request = object(event.request)
    record = { ...base, kind: 'approval', title: 'MCP 输入请求', text: String(request?.message ?? '') }
  } else if (event.type === 'sdk') {
    const frame = object(event.message), message = object(frame?.message)
    const blocks = Array.isArray(message?.content) ? message.content.map(object).filter((b): b is Record<string, unknown> => Boolean(b)) : undefined
    if (frame?.type === 'user' && frame.isMeta === true) {
      record = { ...base, kind: 'system', title: '内部上下文', text: '' }
    } else if (frame?.type === 'assistant' || frame?.type === 'user') {
      const text = typeof message?.content === 'string' ? message.content : blocks?.filter(b => b.type === 'text').map(b => String(b.text ?? '')).join('\n\n') ?? ''
      record = { ...base, kind: frame.type, title: frame.type === 'assistant'
        ? typeof frame.parent_tool_use_id === 'string' ? `Agent · ${frame.parent_tool_use_id.slice(0, 8)}` : 'Claude'
        : blocks?.every(block=>block.type==='tool_result') && blocks.length ? '工具结果' : '你', text, blocks }
    } else if (frame?.type === 'stream_event') {
      const stream = object(frame.event), delta = object(stream?.delta)
      const text = typeof delta?.text === 'string' ? delta.text : typeof delta?.thinking === 'string' ? delta.thinking : ''
      record = { ...base, kind: 'system', title: '流式片段', text }
    } else if (frame?.type === 'system' && frame.subtype === 'api_retry') {
      const attempt=Number(frame.attempt), maximum=Number(frame.max_retries), delay=Number(frame.retry_delay_ms)
      record={...base,kind:'system',notice:true,title:'请求重试',text:
        `${Number.isFinite(attempt)?`第 ${attempt}${Number.isFinite(maximum)?` / ${maximum}`:''} 次重试`:'正在重试'}${Number.isFinite(delay)?` · 等待 ${(delay/1000).toFixed(1)} 秒`:''}${typeof frame.error==='string'?` · ${frame.error}`:''}`}
    } else if (frame?.type === 'tool_progress') record={...base,kind:'system',notice:true,title:'工具运行记录',
      text:`${String(frame.tool_name??'工具')}${typeof frame.elapsed_time_seconds==='number'?` · ${frame.elapsed_time_seconds} 秒`:''}`}
    else if (frame?.type === 'system' && frame.subtype === 'status' && typeof frame.status==='string')
      record={...base,kind:'system',notice:true,title:'执行状态',text:frame.status}
    else if (frame?.type === 'result') record = { ...base, kind: 'system', notice:true, title: frame.is_error === true ? '本轮失败' : '本轮完成', text: typeof frame.result === 'string' ? frame.result : '' }
    else record = { ...base, kind: 'system', title: String(frame?.subtype ?? frame?.type ?? '事件'), text: '' }
  } else {
    const names: Record<string, string> = { session_started: '会话已建立', sdk_ready: '执行器已就绪', turn_started: '开始执行', turn_completed: '回合结束', turn_interrupted: '回合已中断', permission_resolved: '审批已处理', permission_cancelled: '审批已取消', process_exit: '执行器已停止', transport_error: '连接错误' }
    record = { ...base, kind: 'system', title: names[event.type] ?? event.type, text: event.reason === 'service_restart_worker_unavailable'
      ? '服务重启后原执行器不可恢复；原操作未重放。' : typeof event.message === 'string' ? event.message : '' }
  }
  cache.set(event, record)
  return record
}
function streamEvent(event: ServeEvent): Record<string, unknown> | undefined {
  if (event.type !== 'sdk') return undefined
  const frame = object(event.message)
  return frame?.type === 'stream_event' ? object(frame.event) : undefined
}
function assistantMessageId(event: ServeEvent): string | undefined {
  const frame = object(event.message)
  if (event.type !== 'sdk' || frame?.type !== 'assistant') return undefined
  const message = object(frame.message)
  return typeof message?.id === 'string' ? message.id : undefined
}
function isAssistantFrame(event: ServeEvent): boolean {
  return event.type === 'sdk' && object(event.message)?.type === 'assistant'
}
function sourceKey(event: ServeEvent): string {
  const parent = (object(event.message) ?? object(event.record))?.parent_tool_use_id
  return typeof parent === 'string' ? `agent:${parent}` : 'main'
}
function hasContent(record: RecordView): boolean {
  return Boolean(record.text.trim()) || Boolean(record.blocks?.some(block =>
    block.type === 'tool_use' || block.type === 'tool_result' || block.type === 'image' ||
    block.type === 'document' || block.type === 'local_file' || block.type === 'redacted_thinking' || block.type === 'thinking'))
}
/** Normal view is a readable projection; Ctrl+O still maps every committed raw event. */
export function toDisplayRecords(events: ServeEvent[], full = false): RecordView[] {
  if (full) return events.map(toRecord)
  // An explicit builtin command may be handled locally by the SDK and arrive as
  // a synthetic assistant/result pair (without the transcript's local_command
  // parent link). Establish provenance from the same owner's canonical SDK
  // command catalogue + queued operation + synthetic message + successful
  // result. `intent`, slash-shaped text, and zero API duration alone are not
  // sufficient: prompt/skill commands can take the model path.
  const ownerKey = (event: ServeEvent): string | undefined => {
    const frame = object(event.message)
    const generation = event.executorGeneration
    const recordSession = typeof event.recordId === 'string'
      ? /^journal:([^:]+):/.exec(event.recordId)?.[1] : undefined
    const session = event.sessionId ?? frame?.session_id ?? frame?.sessionId ?? recordSession
    return typeof generation === 'string' && typeof session === 'string'
      ? JSON.stringify([session, generation]) : undefined
  }
  const commandCatalogs = new Map<string, {seq:number; names:Set<string>}>()
  const queuedCommands = new Map<string,string>()
  const syntheticMessages = new Map<string,number>()
  const successfulResults = new Map<string,number>()
  const modelOperations = new Set<string>()
  for (const event of events) {
    const owner = ownerKey(event)
    if (!owner) continue
    const capabilities = object(event.capabilities)
    if ((event.type === 'capabilities_changed' || event.type === 'sdk_ready') && Array.isArray(capabilities?.commands)) {
      commandCatalogs.set(owner, {seq:event.seq, names:new Set(capabilities.commands.flatMap(value => {
        const command=object(value)
        return command?.builtin===true && typeof command.name==='string'
          ? [command.name,...(Array.isArray(command.aliases) ? command.aliases.filter((name):name is string=>typeof name==='string') : [])] : []
      }))})
    }
    if (typeof event.operationId !== 'string') continue
    const operation = JSON.stringify([owner,event.operationId])
    if (event.type==='turn_queued' && (event.source==='web' || event.source==='terminal') && event.intent==='command' && typeof event.content==='string') {
      const name=/^\/([A-Za-z0-9_:-]+)(?:\s|$)/.exec(event.content)?.[1]
      if(name)queuedCommands.set(operation,name)
    }
    if(event.type!=='sdk' || sourceKey(event)!=='main')continue
    const frame=object(event.message),message=object(frame?.message)
    if(frame?.type==='assistant') {
      if(message?.model!=='<synthetic>')modelOperations.add(operation)
      else {
        const catalog=commandCatalogs.get(owner),name=queuedCommands.get(operation)
        if(catalog && catalog.seq<event.seq && name && catalog.names.has(name)) syntheticMessages.set(operation,event.seq)
      }
    }
    if(frame?.type==='result' && frame.subtype==='success' && frame.is_error===false)successfulResults.set(operation,event.seq)
  }
  const syntheticLocalCommandOperations = new Set([...syntheticMessages].flatMap(([operation,seq]) =>
    !modelOperations.has(operation) && (successfulResults.get(operation) ?? -1)>seq ? [operation] : []))
  const commandIdentity = (event: ServeEvent, uuid: unknown): string | undefined => {
    const frame = object(event.message) ?? object(event.record)
    if (typeof uuid !== 'string' || frame?.isSidechain === true && !frame.parent_tool_use_id && !frame.agent_id) return undefined
    const session = event.sessionId ?? frame?.session_id ?? frame?.sessionId ?? (typeof event.recordId==='string'?event.recordId.split(':')[1]:undefined) ?? 'legacy'
    return JSON.stringify([session, sourceKey(event), frame?.agent_id ?? null, uuid])
  }
  const localCommands = new Set<string>()
  const localOutputs = new Set<string>()
  const compactSummaries = new Set<string>(), compactCommands = new Set<string>()
  for (const event of events) {
    const row = object(event.record)
    const command=object(event.localCommand),frame=object(event.message)
    if(event.type==='turn_queued' && event.intent==='command' && typeof event.operationId==='string' && typeof event.content==='string' && /^\/compact(?:\s|$)/.test(event.content)) compactCommands.add(`${sourceKey(event)}:${event.operationId}`)
    if(frame?.type==='system' && frame.subtype==='compact_boundary') {
      const anchor=object(object(frame.compact_metadata)?.preserved_segment)?.anchor_uuid
      const key=commandIdentity(event,anchor)
      if(key)compactSummaries.add(key)
    }
    if(event.type==='sdk'&&frame?.type==='user'&&command?.source==='transcript-local-command'&&typeof command.resultRecordId==='string'){
      const key=commandIdentity(event,frame.uuid)
      if(key)localCommands.add(key)
    }
    if (event.type === 'transcript_record' && row?.type === 'system' && row.subtype === 'local_command') {
      const key = commandIdentity(event, row.parentUuid)
      if (key) localCommands.add(key)
      const output = commandIdentity(event, row.uuid)
      if (output) localOutputs.add(output)
    }
  }
  // Match persisted SDK copies and admission echoes by actual message UUID,
  // never by text (identical consecutive user inputs are distinct operations).
  const identities=new Map<string,ServeEvent[]>(), aliases=new Map<ServeEvent,ServeEvent[]>()
  const eventIdentity=(event:ServeEvent):string|undefined=>{
    if(event.type==='turn_queued'){
      const uuid=typeof event.messageUuid==='string'?event.messageUuid:
        typeof event.operationId==='string'&&/^[0-9a-f-]{36}$/i.test(event.operationId)?event.operationId:undefined
      return uuid?`main:user:${uuid}`:undefined
    }
    const frame=object(event.message)
    if(event.type==='sdk' && (frame?.type==='user'||frame?.type==='assistant') && typeof frame.uuid==='string')
      return `${sourceKey(event)}:${frame.type}:${frame.uuid}`
    const record=object(event.record)
    if(event.type==='transcript_record' && record?.type==='system' && record.subtype==='local_command' && typeof record.uuid==='string')
      return `${sourceKey(event)}:assistant:${record.uuid}`
    return undefined
  }
  for(const event of events){
    const id=eventIdentity(event)
    if(id)identities.set(id,[...(identities.get(id)??[]),event])
  }
  const retained=new Set<ServeEvent>()
  for(const copies of identities.values()){
    const queued=copies.filter(event=>event.type==='turn_queued')
    const journal=copies.filter(event=>String(event.recordId).startsWith('journal:'))
    // UUID identifies a cross-source copy, not a SDK update boundary. Keep
    // ALL finals/updates in the winning source, including shared-UUID blocks.
    const primary=queued.length?queued:journal.length?journal:copies
    for(const event of primary){retained.add(event);aliases.set(event,[event])}
    const shadows=copies.filter(event=>!retained.has(event))
    if(shadows.length)aliases.set(primary[0]!,[primary[0]!,...shadows])
  }
  const displayEvents=events.filter(event=>!eventIdentity(event)||retained.has(event))
  const interruptedMarkers=new Set(events.filter(event=>event.type==='turn_interrupted'&&event.reason==='user_interrupt'&&typeof event.markerRecordId==='string').map(event=>event.markerRecordId as string))
  const operationState=new Map<string,string>()
  for(const event of events){
    if(event.type==='session_reset' && Array.isArray(event.movedOperationIds)) {
      for(const id of event.movedOperationIds)if(typeof id==='string'&&operationState.get(id)==='已入队')operationState.set(id,'已移至新会话')
    }
    if(event.type==='process_exit'){
      for(const [id,status] of operationState)if(status==='执行中')operationState.set(id,'执行器已停止')
    }
    if(typeof event.operationId!=='string')continue
    if(event.type==='turn_queued')operationState.set(event.operationId,'已入队')
    if(event.type==='turn_started')operationState.set(event.operationId,'执行中')
    const frame=object(event.message)
    // SDK result can precede turn_completed; stop the activity indicator now.
    if(event.type==='sdk'&&frame?.type==='result'&&sourceKey(event)==='main'&&operationState.get(event.operationId)!=='已中断')
      operationState.set(event.operationId,frame.is_error===true||frame.subtype!=='success'?'执行失败':'本轮已完成')
    if(event.type==='turn_completed'&&operationState.get(event.operationId)!=='已中断')operationState.set(event.operationId,event.isError?'执行失败':'本轮已完成')
    if(event.type==='turn_interrupted')operationState.set(event.operationId,'已中断')
  }
  // A progress frame is historical unless this source still has an active
  // turn and neither its tool result nor its SDK result has arrived. Keep the
  // raw frame unchanged; an ended tool is not evidence the session closed.
  const finishedTools=new Set<string>(), finishedSources=new Set<string>()
  const progressSource=(event:ServeEvent)=>JSON.stringify([event.operationId??null,sourceKey(event)])
  const toolIdentity=(event:ServeEvent,id:string)=>JSON.stringify([progressSource(event),id])
  for(const event of events){
    if(event.type!=='sdk')continue
    const frame=object(event.message)
    if(frame?.type==='result')finishedSources.add(progressSource(event))
    const content=object(frame?.message)?.content
    if(frame?.type==='user'&&Array.isArray(content))for(const value of content){
      const block=object(value)
      if(block?.type==='tool_result'&&typeof block.tool_use_id==='string')finishedTools.add(toolIdentity(event,block.tool_use_id))
    }
  }
  const toolProgressTitle=(event:ServeEvent):string=>{
    const id=object(event.message)?.tool_use_id
    return operationState.get(String(event.operationId))==='执行中' &&
      !finishedSources.has(progressSource(event)) &&
      !(typeof id==='string'&&finishedTools.has(toolIdentity(event,id))) ? '工具运行中' : '工具运行记录'
  }
  const retryRows=new Map<string,number>()
  const compactRows=new Map<string,number>(), endedCompactRows=new Set<string>()
  const rows: RecordView[] = []
  const assistantRowByMessage = new Map<string, number>()
  type Stream = { first: ServeEvent; sourceEvents: ServeEvent[]; id?: string; key: string; text: string[]; thinking: string[];
    blocks: Map<number, Record<string, unknown>>; lastBlockIndex?: number;
    signature?: string; redactedData?: string;
    finalBlocks: Map<number, Record<string, unknown>>; finalEvents: Set<ServeEvent> }
  const streams = new Map<string, Stream>()
  const completedStreams: Stream[] = []
  const unmatchedOpaque = new Map<string, { events: ServeEvent[]; count: number; sortSeq: number }>()
  const keepUnmatchedOpaque = (sourceEvent: ServeEvent, key: string) => {
    // A signature/ciphertext without a message identity is protocol data, not
    // evidence of a relationship to the neighbouring assistant or stream.
    const bucket = Math.floor((sourceEvent.seq - 1) / 512)
    const source = typeof sourceEvent.recordId === 'string'
      ? sourceEvent.recordId.replace(/:\d+$/, '') : String(sourceEvent.sessionId ?? 'legacy')
    const id = `opaque:${source}:${key}:${bucket}`
    const group = unmatchedOpaque.get(id) ?? { events: [], count: 0, sortSeq: (bucket + 1) * 512 }
    group.events.push(sourceEvent)
    group.count++
    unmatchedOpaque.set(id, group)
  }
  const flush = (stream: Stream) => {
    if (stream.id === undefined && !stream.text.length && !stream.thinking.length &&
      (stream.signature !== undefined || stream.redactedData !== undefined)) {
      // Without a message ID, adjacency alone is not evidence that this opaque
      // delta belongs to the preceding final assistant (especially across Agents).
      for (const sourceEvent of stream.sourceEvents) keepUnmatchedOpaque(sourceEvent, stream.key)
      return
    }
    const thought = stream.thinking.join('')
    const indexed = new Map(stream.blocks)
    for (const [index, block] of stream.finalBlocks) indexed.set(index, block)
    const blocks = [...indexed.entries()].sort(([a], [b]) => a - b).map(([, block]) => block)
    if (!blocks.length && (thought || stream.signature !== undefined)) blocks.push({ type: 'thinking',
      ...(thought ? { thinking: thought } : {}), ...(stream.signature !== undefined ? { signature: stream.signature } : {}) })
    if (!blocks.some(block => block.type === 'redacted_thinking') && stream.redactedData !== undefined)
      blocks.push({ type: 'redacted_thinking', data: stream.redactedData })
    const priorIndex = stream.id ? assistantRowByMessage.get(`${stream.key}:${stream.id}`) : undefined
    if (priorIndex !== undefined) {
      const prior = rows[priorIndex]!
      const finalEvents = prior.sourceEvents ?? [prior.event]
      // Finals without a known block index stay intact. Only a matched
      // message/source/block may replace a streamed block.
      for (const final of finalEvents) if (!stream.finalEvents.has(final)) blocks.push(...(toRecord(final).blocks ?? []))
      const sourceEvents = [...new Set([...finalEvents, ...stream.sourceEvents])].sort((a, b) => a.seq - b.seq)
      rows[priorIndex] = { ...prior, blocks,
        text: blocks.filter(block => block.type === 'text').map(block => String(block.text ?? '')).join('\n\n') || prior.text,
        sourceEvents }
      return
    }
    const text = blocks.filter(block => block.type === 'text').map(block => String(block.text ?? '')).join('\n\n')
    if (text || blocks.length) rows.push({ id: `${String(stream.first.recordId ?? stream.first.seq)}:stream`, at: stream.first.at,
      event: stream.first, sourceEvents: stream.sourceEvents, kind: 'assistant',
      title: stream.key === 'main' ? 'Claude · 未完成片段' : 'Agent · 未完成片段', text,
      ...(blocks.length ? { blocks } : {}) })
  }
  for (const event of displayEvents) {
    const key = sourceKey(event)
    const deltaEvent = streamEvent(event)
    if (deltaEvent) {
      let stream = streams.get(key)
      const delta = object(deltaEvent.delta), block = object(deltaEvent.content_block)
      if (!stream?.id && (delta?.type === 'signature_delta' || block?.type === 'redacted_thinking')) {
        keepUnmatchedOpaque(event, key)
        continue
      }
      if (deltaEvent.type === 'message_start' && stream) { completedStreams.push(stream); streams.delete(key); stream = undefined }
      if (!stream) {
        stream = { first: event, sourceEvents: [], text: [], thinking: [], blocks: new Map(), key,
          finalBlocks: new Map(), finalEvents: new Set() }
        streams.set(key, stream)
      }
      stream.sourceEvents.push(event)
      if (deltaEvent.type === 'message_start') {
        const id = object(deltaEvent.message)?.id
        if (typeof id === 'string') stream.id = id
      }
      // The parser initializes block text at content_block_start; only deltas
      // are incremental body text. A start payload must not be concatenated
      // again with later deltas in the fallback preview.
      const explicitIndex = Number.isSafeInteger(deltaEvent.index) ? Number(deltaEvent.index) : undefined
      let index = explicitIndex ?? stream.lastBlockIndex ?? 0
      if (block && typeof block.type === 'string') {
        if (explicitIndex === undefined && stream.blocks.has(index)) index = stream.blocks.size
        stream.blocks.set(index, { ...block })
        stream.lastBlockIndex = index
      }
      if (delta) {
        const type = delta.type === 'thinking_delta' || delta.type === 'signature_delta' ? 'thinking'
          : delta.type === 'text_delta' ? 'text' : undefined
        if (type) {
          const current = stream.blocks.get(index)
          // A delta against ciphertext is retained in raw detail, not converted
          // into plaintext (the production API parser uses the same boundary).
          if (current?.type === 'redacted_thinking') continue
          if (explicitIndex === undefined && current && current.type !== type) index = stream.blocks.size
          const target = stream.blocks.get(index) ?? { type }
          if (delta.type === 'thinking_delta' && typeof delta.thinking === 'string') {
            stream.thinking.push(delta.thinking)
            target.thinking = String(target.thinking ?? '') + delta.thinking
          }
          if (delta.type === 'text_delta' && typeof delta.text === 'string') {
            stream.text.push(delta.text)
            target.text = String(target.text ?? '') + delta.text
          }
          if (delta.type === 'signature_delta' && typeof delta.signature === 'string') {
            stream.signature = delta.signature
            target.signature = delta.signature
          }
          stream.blocks.set(index, target)
          stream.lastBlockIndex = index
        }
      }
      if (block?.type === 'redacted_thinking' && typeof block.data === 'string') stream.redactedData = block.data
      if (deltaEvent.type === 'message_stop') { completedStreams.push(stream); streams.delete(key) }
      // Signatures/ciphertext remain raw data, not displayable thought.
      continue
    }
    if (isAssistantFrame(event)) {
      const pending = streams.get(key)
      if (pending?.id && pending.id === assistantMessageId(event)) {
        const blocks = toRecord(event).blocks ?? []
        const explicitIndex = object(event.message)?.apiBlockIndex
        const index = Number.isSafeInteger(explicitIndex) ? Number(explicitIndex) : pending.lastBlockIndex
        // queryModelWithStreaming yields a one-block final before the raw
        // content_block_stop. Its message ID and the still-active block index
        // establish the association; a final is not a message-stop boundary.
        if (blocks.length === 1 && index !== undefined &&
          (Number.isSafeInteger(explicitIndex) || pending.blocks.get(index)?.type === blocks[0]!.type)) {
          pending.finalBlocks.set(index, blocks[0]!)
          pending.finalEvents.add(event)
        } else if (blocks.length > 1) {
          blocks.forEach((block, index) => pending.finalBlocks.set(index, block))
          pending.finalEvents.add(event)
        }
      }
    } else if (event.type === 'turn_completed' || event.type === 'turn_interrupted' || event.type === 'process_exit') {
      completedStreams.push(...streams.values())
      streams.clear()
    } else if (event.type === 'sdk' && object(event.message)?.type === 'result') {
      const pending = streams.get(key)
      if (pending) { completedStreams.push(pending); streams.delete(key) }
    }
    // SDK compaction keep-alives repeat every 30 seconds. They update one
    // visible phase, not a new chat message. Raw/Ctrl+O remains one row/event.
    const statusFrame=object(event.message)
    if(event.type==='sdk' && statusFrame?.type==='system' && statusFrame.subtype==='status' && typeof event.operationId==='string') {
      const compactKey=progressSource(event), prior=compactRows.get(compactKey)
      if(statusFrame.status==='compacting') {
        if(prior!==undefined) {
          const previous=rows[prior]!
          rows[prior]={...previous,event,sourceEvents:[...(previous.sourceEvents??[previous.event]),event]}
        } else {
          compactRows.set(compactKey,rows.length)
          rows.push({...toRecord(event),sortSeq:event.seq})
        }
        continue
      }
      if(prior!==undefined) {
        const previous=rows[prior]!
        rows[prior]={...previous,sourceEvents:[...(previous.sourceEvents??[previous.event]),event]}
        endedCompactRows.add(previous.id);compactRows.delete(compactKey)
      }
    }
    const row = toRecord(event)
    if (row.kind === 'user' || row.kind === 'assistant' || row.kind === 'approval') {
      if (hasContent(row) || row.kind === 'approval' || event.type === 'turn_queued') {
        const messageId = row.kind === 'assistant' ? assistantMessageId(event) : undefined
        const groupKey = messageId ? `${key}:${messageId}` : undefined
        const priorIndex = groupKey ? assistantRowByMessage.get(groupKey) : undefined
        if (priorIndex !== undefined) {
          const prior = rows[priorIndex]!
          rows[priorIndex] = { ...prior, text: [prior.text, row.text].filter(Boolean).join('\n\n'),
            blocks: [...(prior.blocks ?? []), ...(row.blocks ?? [])],
            sourceEvents: [...(prior.sourceEvents ?? [prior.event]), event] }
        } else {
          if (groupKey) assistantRowByMessage.set(groupKey, rows.length)
          rows.push(row)
        }
      }
    } else if (row.notice) {
      const retry=object(event.message)?.subtype==='api_retry' && typeof event.operationId==='string' ? `${sourceKey(event)}:${event.operationId}` : undefined
      const prior=retry?retryRows.get(retry):undefined
      if(prior!==undefined)rows[prior]={...row,id:rows[prior]!.id,sourceEvents:[...(rows[prior]!.sourceEvents??[rows[prior]!.event]),event]}
      else {if(retry)retryRows.set(retry,rows.length);rows.push(row)}
    } else if (event.type === 'transport_error' || event.type === 'turn_interrupted' || event.type === 'process_exit' ||
      event.type === 'turn_completed' && row.text) rows.push(row)
    // Metadata remains in events and appears individually in Ctrl+O / raw inspect.
  }
  for (const pending of [...completedStreams, ...streams.values()]) flush(pending)
  for (const [id, group] of unmatchedOpaque) rows.push({ id,
    kind: 'system', title: `未关联的思考签名 / 加密块 · ${group.count} 条`, text: '', at: group.events.at(-1)!.at,
    event: group.events.at(-1)!, sourceEvents: group.events, sortSeq: group.sortSeq,
    blocks: [{ type: 'unassociated_opaque', events: group.events }] })
  const assistantBodies=new Map<string,Set<string>>()
  // Local command assistant frames omit terminal newlines that the SDK result
  // keeps. Ignore only those delimiters, never indentation or internal content.
  const resultBody=(text:string)=>text.replace(/(?:\r?\n)+$/, '')
  for(const row of rows)if(row.kind==='assistant'&&typeof row.event.operationId==='string'&&row.text){
    const key=progressSource(row.event),texts=assistantBodies.get(key)??new Set<string>()
    texts.add(resultBody(row.text));assistantBodies.set(key,texts)
  }
  const repeatedSuccess=(row:RecordView)=>{
    const frame=object(row.event.message)
    return row.event.type==='sdk'&&frame?.type==='result'&&frame.subtype==='success'&&frame.is_error===false&&
      typeof row.event.operationId==='string'&&Boolean(resultBody(row.text))&&assistantBodies.get(progressSource(row.event))?.has(resultBody(row.text))
  }
  return rows.map(row=>{
    const frame=object(row.event.message)
    // Only the worker producer can identify a generated model-switch output.
    // A replay flag or matching XML in arbitrary user text is not provenance.
    const modelOutput = row.event.type==='sdk' && frame?.type==='user' && frame.isReplay===true &&
      frame.local_web_command_output==='model' && row.kind==='user'
      ? /^<local-command-stdout>([\s\S]*)<\/local-command-stdout>$/.exec(row.text) : null
    const commandKey=commandIdentity(row.event,frame?.uuid ?? row.event.messageUuid)
    const command=commandKey && localCommands.has(commandKey)
    // Only a persisted system/local_command parent link establishes this as
    // generated command markup. Identical literal user text has no such proof.
    const commandText=command ? parseLocalCommandText(row.text) : null
    return {...row,
    ...(modelOutput?{kind:'system' as const,notice:true,title:'模型已切换',text:modelOutput[1]!,blocks:undefined}:{}),
    ...(row.kind==='user' && (object(row.event.message)?.isCompactSummary===true || commandKey&&compactSummaries.has(commandKey))?{kind:'system' as const,notice:true,title:'上下文摘要',compactSummary:true,blocks:undefined}:{}),
    ...(row.kind==='user' && object(row.event.message)?.isReplay===true && compactCommands.has(`${sourceKey(row.event)}:${row.event.operationId}`) && /^<local-command-stdout>[\s\S]*<\/local-command-stdout>$/.test(row.text)?{kind:'system' as const,notice:true,title:'压缩结果',text:row.text.slice('<local-command-stdout>'.length,-'</local-command-stdout>'.length).trim(),blocks:undefined}:{}),
    ...(command&&row.kind==='user'?{kind:'system' as const,notice:true,title:'本地命令',text:commandText??row.text,blocks:undefined}:{}),
    ...(commandKey&&localOutputs.has(commandKey)&&row.kind==='assistant'?{kind:'system' as const,notice:true,title:'本地指令结果'}:{}),
    ...(row.kind==='user' && row.event.type==='turn_queued' && typeof row.event.operationId==='string' &&
      syntheticLocalCommandOperations.has(JSON.stringify([ownerKey(row.event), row.event.operationId]))
      ? {kind:'system' as const,notice:true,title:'本地命令'}:{}),
    ...(row.kind==='assistant' && row.event.type==='sdk' && object(object(row.event.message)?.message)?.model==='<synthetic>' && typeof row.event.operationId==='string' &&
      syntheticLocalCommandOperations.has(JSON.stringify([ownerKey(row.event), row.event.operationId]))
      ? {kind:'system' as const,notice:true,title:'本地指令结果'}:{}),
    ...(repeatedSuccess(row)?{text:''}:{}),
    ...(row.kind==='user'&&interruptedMarkers.has(row.id)?{kind:'system' as const,title:'用户已中断本轮',text:'',blocks:undefined}:{}),
    ...(row.event.type==='sdk'&&object(row.event.message)?.type==='result'&&sourceKey(row.event)==='main'&&operationState.get(String(row.event.operationId))==='已中断'?{title:'本轮已中断'}:{}),
    ...(row.event.type==='turn_queued'?{status:operationState.get(String(row.event.operationId))}:{}),
    ...(object(row.event.message)?.type==='tool_progress'?{title:toolProgressTitle(row.event)}:{}),
    ...(row.event.type==='sdk'&&object(row.event.message)?.subtype==='status'&&object(row.event.message)?.status==='compacting'?{title:'上下文压缩',text:endedCompactRows.has(row.id)||finishedSources.has(progressSource(row.event))||['本轮已完成','执行失败','已中断','执行器已停止'].includes(operationState.get(String(row.event.operationId))??'')?'压缩阶段已结束':'正在整理上下文…'}:{}),
    ...(object(row.event.message)?.subtype==='api_retry'&&['本轮已完成','执行失败','已中断'].includes(operationState.get(String(row.event.operationId))??'')?{title:'重试记录（已结束）'}:{}),
    sourceEvents:[...new Set((row.sourceEvents??[row.event]).flatMap(event=>aliases.get(event)??[event]))],
  }}).sort((a,b)=>compareEventPosition(a.event,b.event,a.sortSeq??a.event.seq,b.sortSeq??b.event.seq))
}
export function resolvedInteractions(events: ServeEvent[]): Set<string> {
  const resolved = new Set<string>(), pending = new Set<string>()
  for (const event of events) {
    if (event.type === 'permission_request' || event.type === 'elicitation_request') pending.add(String(event.requestId))
    if (['permission_resolved','permission_cancelled','elicitation_resolved','elicitation_cancelled'].includes(event.type)) {
      resolved.add(String(event.requestId)); pending.delete(String(event.requestId))
    }
    if (event.type === 'turn_completed' || event.type === 'process_exit') {
      for (const requestId of pending) resolved.add(requestId)
      pending.clear()
    }
  }
  return resolved
}
