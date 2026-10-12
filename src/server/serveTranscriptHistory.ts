import { createReadStream } from 'node:fs'
import {stat,open} from 'node:fs/promises'
import { join, basename } from 'node:path'
import { getClaudeConfigHomeDir } from '../utils/envUtils.js'
import { listSessionsImpl, parseSessionInfoFromLite, type SessionInfo } from '../utils/listSessionsImpl.js'
import { readSessionLite, resolveSessionFilePath, validateUuid } from '../utils/sessionStoragePortable.js'
import { ServeConflict, type ServeEvent, type ServeSnapshot } from './serveSession.js'

/** Hide only generated Web-upload references in the automatic display title.
 * Explicit titles, persisted prompts and ordinary user @paths stay unchanged.
 */
export function transcriptDisplayTitle(info: SessionInfo): string {
  if (info.customTitle !== undefined) return info.customTitle
  const prefix = join(getClaudeConfigHomeDir(), 'uploads', info.sessionId, 'turn-')
  const names: string[] = []
  const title = info.summary.replace(/@"([^"\n]+)"/g, (ref, path: string) => {
    if (!path.startsWith(prefix)) return ref
    names.push(basename(path))
    return ''
  }).trim()
  return names.length ? title || `附件：${names.join('、')}` : info.summary
}

/** Read the existing CLI catalog, not another history database. No worker is
 * created and no transcript is written while listing or viewing history. */
export function transcriptSnapshot(info: SessionInfo): ServeSnapshot {
  return { sessionId:info.sessionId, title:transcriptDisplayTitle(info),
    ...(info.cwd ? {cwd:info.cwd} : {}), createdAt:info.createdAt ?? info.lastModified,
    updatedAt:info.lastModified, historySource:'transcript', lastSeq:0,
    activeOperationId:null,queuedOperationIds:[],pendingApprovalIds:[],pendingElicitationIds:[],
    viewerCount:0,capabilities:null,closed:true,eventSource:'transcript',executorState:{status:'external-unknown',canControl:false} }
}

export async function listTranscriptHistory(): Promise<ServeSnapshot[]> {
  return (await listSessionsImpl()).map(transcriptSnapshot)
}

export async function findTranscriptHistory(id:string): Promise<{
  snapshot:ServeSnapshot; filePath:string
} | undefined> {
  if (!validateUuid(id)) return undefined
  const file = await resolveSessionFilePath(id)
  if (!file) return undefined
  const lite = await readSessionLite(file.filePath)
  if (!lite) return undefined
  const info = parseSessionInfoFromLite(id,lite,file.projectPath)
  return info ? {snapshot:{...transcriptSnapshot(info),historyState:historyStateFromText(lite.head+'\n'+lite.tail)},filePath:file.filePath} : undefined
}

/** Full transcript browsing intentionally does not use the resume loader's
 * compact-boundary truncation. Byte streaming retains pre-compact history and
 * metadata. Line ordinals are stable page IDs; malformed committed records stay
 * visible, and partial trailing writes wait for their newline. The official CLI alone
 * chooses the active message chain when the user explicitly resumes. */
export async function transcriptHistoryPage(filePath:string, after:number, limit:number) {
  if (!Number.isSafeInteger(after) || after < 0 || !Number.isSafeInteger(limit) || limit < 1 || limit > 500)
    throw new ServeConflict('Invalid history page')
  const input=createReadStream(filePath,{encoding:'utf8'})
  // A writer may be midway through a JSONL record. Only newline-committed
  // records receive a cursor; an incomplete tail is retried on the next poll.
  async function* committedLines() {
    let pending = ''
    for await (const chunk of input) {
      pending += chunk
      let end: number
      while ((end = pending.indexOf('\n')) >= 0) {
        const line = pending.slice(0, end)
        pending = pending.slice(end + 1)
        yield line
      }
    }
  }
  const events:ServeEvent[]=[]
  let seq=0,hasMore=false
  try {
    for await (const line of committedLines()) {
      if (!line.trim()) continue
      seq++
      if (seq<=after) continue
      if (events.length===limit) {hasMore=true;break}
      let record:unknown
      try {record=JSON.parse(line)} catch {record={type:'unparsed_transcript_record',raw:line}}
      const row=record && typeof record==='object' && !Array.isArray(record) ? record as Record<string,unknown> : {value:record}
      const timestamp=typeof row.timestamp==='string' ? Date.parse(row.timestamp) : NaN
      events.push({seq,at:Number.isFinite(timestamp)?timestamp:0,
        type:row.type==='user'||row.type==='assistant' ? 'sdk' : 'transcript_record',
        ...(row.type==='user'||row.type==='assistant' ? {message:row} : {record:row}),
        historical:true,...(typeof row.uuid==='string'?{transcriptUuid:row.uuid}:{})})
    }
  } finally {input.destroy()}
  if (seq < after) throw new ServeConflict('Transcript was truncated; confirmed history retained, reopen to inspect')
  const nextCursor=events.at(-1)?.seq ?? after
  return {events,nextCursor,hasMore,lastSeq:hasMore?undefined:seq}
}

export type TranscriptHistoryState = {source:'transcript';model?:string;permissionMode?:string;observedAt?:number}
function observeHistory(state:TranscriptHistoryState,row:Record<string,unknown>) {
  const message=row.message && typeof row.message==='object'?row.message as Record<string,unknown>:undefined
  // Only actual recorded message/metadata fields, never nested tool input.
  if(row.type==='assistant' && typeof message?.model==='string' && !message.model.startsWith('<')) state.model=message.model
  const mode=row.permissionMode ?? (row.type==='permission-mode'?row.mode:undefined)
  if(typeof mode==='string' && ['default','plan','acceptEdits','dontAsk','bypassPermissions','auto'].includes(mode))state.permissionMode=mode
  const at=typeof row.timestamp==='string'?Date.parse(row.timestamp):NaN
  if(Number.isFinite(at))state.observedAt=at
}
function historyStateFromText(text:string):TranscriptHistoryState {
  const state:TranscriptHistoryState={source:'transcript'}
  for(const line of text.split('\n'))try {const row=JSON.parse(line);if(row&&typeof row==='object')observeHistory(state,row)} catch {/* lite head/tail may end mid-record */}
  return state
}
export type HistoryWindow = {limit:number;before?:number;after?:number;through?:number}
export function validateHistoryWindow(query:HistoryWindow):void {
  if(!Number.isSafeInteger(query.limit)||query.limit<1||query.limit>500 || query.before!==undefined&&query.after!==undefined)throw new ServeConflict('Invalid history window')
  for(const n of [query.before,query.after,query.through])if(n!==undefined&&(!Number.isSafeInteger(n)||n<0))throw new ServeConflict('Invalid history cursor')
}
/** Bounded response and fixed committed-line boundary; no second history store.
 * Older-page requests stay within `through`, even while an external writer appends. */
type TranscriptIndex={ino:number;size:number;mtime:number;committed:number;lines:Array<{start:number;end:number}>;
  states:Array<{seq:number;value:TranscriptHistoryState}>;localCommandParents:Map<string,{seq:number;uuid:string}>}
function commandParentKey(row:Record<string,unknown>,uuid:unknown):string {
  return JSON.stringify([uuid,row.parent_tool_use_id??null,row.agent_id??null,row.isSidechain??false])
}
// Offsets only, not a second history database or a retained copy of event bodies.
const indexes=new Map<string,TranscriptIndex>()
const indexFlights=new Map<string,Promise<TranscriptIndex>>()
async function transcriptIndex(filePath:string):Promise<TranscriptIndex>{
  const existing=indexFlights.get(filePath);if(existing)return existing
  const flight=(async()=>{
    const info=await stat(filePath)
    let index=indexes.get(filePath)
    if(index&&index.ino===info.ino&&index.size===info.size&&index.mtime===info.mtimeMs)return index
    if(!index||index.ino!==info.ino||info.size<index.size||info.size===index.size)
      index={ino:info.ino,size:0,mtime:0,committed:0,lines:[],states:[],localCommandParents:new Map()}
    let pending=Buffer.alloc(0),start=index.committed
    let state={...(index.states.at(-1)?.value??{source:'transcript' as const})}
    if(info.size>start){
      const stream=createReadStream(filePath,{start,end:info.size-1})
      try{for await(const chunk of stream){
        pending=Buffer.concat([pending,chunk as Buffer]);let end:number
        while((end=pending.indexOf(10))>=0){
          const line=pending.subarray(0,end).toString('utf8'),next=start+end+1
          if(line.trim()){
            index.lines.push({start,end:next})
            try{const row=JSON.parse(line),before={...state};observeHistory(state,row)
              if(row.type==='system'&&row.subtype==='local_command'&&typeof row.parentUuid==='string'&&typeof row.uuid==='string') {
                const key=commandParentKey(row,row.parentUuid)
                if(!index.localCommandParents.has(key))index.localCommandParents.set(key,{seq:index.lines.length,uuid:row.uuid})
              }
              if(state.model!==before.model||state.permissionMode!==before.permissionMode)
                index.states.push({seq:index.lines.length,value:{...state}})
            }catch{/* malformed rows remain visible when paged */}
          }
          start=next;index.committed=next;pending=pending.subarray(end+1)
        }
      }}finally{stream.destroy()}
    }
    index.size=info.size;index.mtime=info.mtimeMs
    indexes.delete(filePath);indexes.set(filePath,index)
    if(indexes.size>16)indexes.delete(indexes.keys().next().value!)
    return index
  })()
  indexFlights.set(filePath,flight)
  try{return await flight}finally{indexFlights.delete(filePath)}
}
export async function transcriptHistoryWindow(id:string,filePath:string,query:HistoryWindow) {
  validateHistoryWindow(query)
  const index=await transcriptIndex(filePath),through=query.through??index.lines.length
  if(query.after!==undefined&&query.after>through)throw new ServeConflict('Transcript changed below confirmed cursor')
  if(through>index.lines.length)throw new ServeConflict('Transcript changed below history snapshot boundary')
  const upper=Math.min(through,query.before===undefined?through:Math.max(0,query.before-1))
  const first=query.after===undefined?Math.max(0,upper-query.limit):Math.min(query.after,upper)
  const last=Math.min(upper,first+query.limit)
  const events:ServeEvent[]=[]
  const fd=await open(filePath,'r')
  try{for(let i=first;i<last;i++){
    const range=index.lines[i]!,buffer=Buffer.alloc(range.end-range.start)
    let offset=0
    while(offset<buffer.length){const {bytesRead}=await fd.read(buffer,offset,buffer.length-offset,range.start+offset)
      if(!bytesRead)throw new ServeConflict('Transcript changed during history read');offset+=bytesRead}
    const line=buffer.toString('utf8').trimEnd();let record:unknown
    try{record=JSON.parse(line)}catch{record={type:'unparsed_transcript_record',raw:line}}
    const row=record&&typeof record==='object'&&!Array.isArray(record)?record as Record<string,unknown>:{value:record}
    const timestamp=typeof row.timestamp==='string'?Date.parse(row.timestamp):NaN,seq=i+1
    const command=row.type==='user'&&typeof row.uuid==='string'?index.localCommandParents.get(commandParentKey(row,row.uuid)):undefined
    events.push({seq,recordId:`transcript:${id}:${seq}`,at:Number.isFinite(timestamp)?timestamp:0,
      type:row.type==='user'||row.type==='assistant'?'sdk':'transcript_record',
      ...(row.type==='user'||row.type==='assistant'?{message:row}:{record:row}),historical:true,
      ...(typeof row.uuid==='string'?{transcriptUuid:row.uuid}:{}),
      ...(command&&command.seq<=through?{localCommand:{source:'transcript-local-command',resultRecordId:`transcript:${id}:${command.seq}`,resultUuid:command.uuid}}:{})})
  }}finally{await fd.close()}
  const before=events[0]?.seq??0,nextAfter=events.at(-1)?.seq??query.after??0
  const historyState=index.states.findLast(item=>item.seq<=through)?.value??{source:'transcript' as const}
  return {events,eventSource:'transcript' as const,historyState,total:through,through,before,nextAfter,
    hasOlder:before>1,hasMore:nextAfter<through}
}
