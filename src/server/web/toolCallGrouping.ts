import type {ServeEvent} from '../serveSession.js'
import {object, type RecordView} from './records.js'
import {inputSummary, toolResultStatus, toolSessionKey} from './toolPresentation.js'

export type ApprovalLabel = '等待审批' | '已批准' | '已拒绝' | '已取消' | '审批结果未记录'
export type ToolPart = {record:RecordView; block:Record<string,unknown>}
export type ToolCallGroup = {
  key:string; expansionKeys:string[]; sourceLabel?:'子代理'; name:string; summary:string; status:string; calls:ToolPart[]; results:ToolPart[];
  approvals:RecordView[]; events:ServeEvent[]; decisions:Map<string,ApprovalLabel>
}
type Scope = {base:string; generation:string|null; parent:string|null; agent:string|null; operation:string|null}
const string = (value:unknown):string|null => typeof value==='string' && value ? value : null
function scope(event:ServeEvent):Scope {
  const frame=object(event.message), request=object(event.request)
  const origin=typeof event.recordId==='string' ? event.recordId.split(':')[0] : 'session'
  return {base:JSON.stringify([origin,toolSessionKey(event.recordId,event.sessionId??frame?.session_id)]),
    generation:string(event.executorGeneration),
    // SDK frames explicitly identify main vs child. A permission request may
    // omit that information: only an otherwise unique ID may then be attached.
    parent:string(frame?.parent_tool_use_id??request?.parent_tool_use_id) ?? (event.type==='sdk'?'main':null),
    agent:string(frame?.agent_id??request?.agent_id??event.agentId), operation:string(event.operationId)}
}
function compatible(a:Scope,b:Scope) {
  return a.base===b.base && (['generation','parent','agent','operation'] as const)
    .every(key=>a[key]===null||b[key]===null||a[key]===b[key])
}
function identity(s:Scope,id:string) { return JSON.stringify([s.base,s.generation,s.parent,s.agent,s.operation,id]) }
export function approvalKey(event:ServeEvent):string {
  const s=scope(event)
  // permission_resolved.operationId is the answer operation, NOT the tool turn.
  return JSON.stringify([s.base,s.generation,event.requestId])
}
export function approvalDecisions(events:ServeEvent[]):Map<string,ApprovalLabel> {
  const labels=new Map<string,ApprovalLabel>()
  for(const event of events) {
    const key=approvalKey(event)
    if(event.type==='permission_cancelled')labels.set(key,'已取消')
    if(event.type==='permission_resolved' && typeof event.allowed==='boolean')
      labels.set(key,event.allowed?'已批准':'已拒绝')
  }
  return labels
}
export function approvalLabel(record:RecordView, decisions:Map<string,ApprovalLabel>, resolved=false):ApprovalLabel {
  return decisions.get(approvalKey(record.event)) ?? (resolved||record.event.historical===true?'审批结果未记录':'等待审批')
}
export function presentationSourceKeys(record:RecordView):string[] {
  return (record.sourceEvents??[record.event]).map(event=>typeof event.recordId==='string'?event.recordId:
    JSON.stringify([scope(event),event.seq,event.type]))
}
export type ToolGrouping = {records:RecordView[]; groups:Map<string,ToolCallGroup>; rowForRecord:Map<string,string>; decisions:Map<string,ApprovalLabel>}
/** Pure view adapter. No stored state, text matching, executor action or event mutation. */
export function groupToolCalls(records:RecordView[],events:ServeEvent[],options:{full?:boolean;activeOperationId?:string|null;sessionId?:string;activeGeneration?:string}={}):ToolGrouping {
  const decisions=approvalDecisions(events),groups=new Map<string,ToolCallGroup>(),rowForRecord=new Map<string,string>()
  if(options.full)return {records,groups,rowForRecord,decisions}
  type Candidate={group:ToolCallGroup;scope:Scope;id:string;anchor:RecordView}
  const provenScopes=new Map<ServeEvent,Scope>()
  // A history seed and journal may carry the same persisted SDK message UUID.
  // Only aliases present together in sourceEvents establish cross-origin proof;
  // matching tool names, text or a bare session-wide origin switch never do.
  for(const record of records){
    const aliases=new Map<string,ServeEvent[]>()
    for(const event of record.sourceEvents??[]){
      const frame=object(event.message),s=scope(event),uuid=string(frame?.uuid)
      if(event.type!=='sdk'||!uuid)continue
      const key=JSON.stringify([toolSessionKey(event.recordId,event.sessionId??frame?.session_id),frame?.type,uuid,s.parent,s.agent])
      const list=aliases.get(key)??[];list.push(event);aliases.set(key,list)
    }
    for(const list of aliases.values()){
      const journals=list.filter(event=>String(event.recordId).startsWith('journal:'))
      if(journals.length!==1)continue
      const canonical=scope(journals[0]!)
      for(const event of list){const original=scope(event)
        if(compatible({...original,base:canonical.base},canonical))provenScopes.set(event,canonical)
      }
    }
  }
  const eventScope=(event:ServeEvent)=>provenScopes.get(event)??scope(event)
  const byId=new Map<string,Candidate[]>(), candidates:Candidate[]=[]
  const owner=new Map<Record<string,unknown>,Candidate>(), approvalOwner=new Map<string,Candidate>()
  const bucket=(s:Scope,id:string)=>JSON.stringify([s.base,id])
  const create=(record:RecordView,id:string):Candidate=>{
    const s=eventScope(record.event),key=`tool-call:${identity(s,id)}`
    const item={scope:s,id,anchor:record,group:{key,expansionKeys:[],...(s.parent&&s.parent!=='main'||s.agent?{sourceLabel:'子代理' as const}:{}),name:'工具结果',summary:'输入未记录',status:'结果未记录',calls:[],results:[],approvals:[],events:[],decisions} as ToolCallGroup}
    candidates.push(item);const list=byId.get(bucket(s,id))??[];list.push(item);byId.set(bucket(s,id),list);return item
  }
  const unique=(event:ServeEvent,id:string):Candidate|undefined=>{
    const s=eventScope(event),matches=(byId.get(bucket(s,id))??[]).filter(item=>compatible(s,item.scope))
    return matches.length===1?matches[0]:undefined
  }
  const attachEvents=(candidate:Candidate,record:RecordView)=>candidate.group.events.push(...record.sourceEvents??[record.event])
  // Calls first: results can be paged in earlier than their inputs.
  for(const record of records)for(const block of record.blocks??[]) {
    if(block.type!=='tool_use'||typeof block.id!=='string')continue
    const s=eventScope(record.event),id=block.id
    let candidate=(byId.get(bucket(s,id))??[]).find(item=>identity(item.scope,item.id)===identity(s,id))
    candidate??=create(record,id)
    candidate.group.calls.push({record,block});candidate.group.name=String(block.name??'工具调用');candidate.group.summary=inputSummary(block.input)
    owner.set(block,candidate);attachEvents(candidate,record)
  }
  for(const record of records)for(const block of record.blocks??[]) {
    if(block.type!=='tool_result'||typeof block.tool_use_id!=='string')continue
    let candidate=unique(record.event,block.tool_use_id)
    // Ambiguous references stay standalone, not guessed into one of the calls.
    if(!candidate && (byId.get(bucket(eventScope(record.event),block.tool_use_id))??[]).some(item=>compatible(eventScope(record.event),item.scope)))continue
    candidate??=create(record,block.tool_use_id)
    candidate.group.results.push({record,block});owner.set(block,candidate);attachEvents(candidate,record)
  }
  for(const record of records)if(record.event.type==='permission_request') {
    const id=object(record.event.request)?.tool_use_id
    if(typeof id!=='string')continue
    const candidate=unique({...record.event,operationId:undefined},id)
    if(!candidate)continue
    candidate.group.approvals.push(record);approvalOwner.set(record.id,candidate);attachEvents(candidate,record)
  }
  const progress=new Map<Candidate,ServeEvent>(),ended=new Set<string>(),interrupted=new Set<string>(),exited=new Set<string>()
  const turnKey=(event:ServeEvent)=>{const s=eventScope(event);return JSON.stringify([s.base,s.generation,s.operation])}
  const sourceEnds=new Set<string>()
  const sourceTurnKey=(event:ServeEvent)=>{const s=eventScope(event);return JSON.stringify([s.base,s.generation,s.operation,s.parent,s.agent])}
  const byRequest=new Map<string,Candidate[]>()
  for(const item of candidates)for(const approval of item.group.approvals){const key=approvalKey(approval.event);const list=byRequest.get(key)??[];list.push(item);byRequest.set(key,list)}
  const consumedEvents=new Map<ServeEvent,Candidate>(), markerOwners=new Map<string,Candidate>()
  const byTurn=new Map<string,Candidate[]>()
  for(const item of candidates){const key=turnKey(item.anchor.event);const list=byTurn.get(key)??[];list.push(item);byTurn.set(key,list)}
  for(const event of events) {
    if(event.type==='turn_completed'||event.type==='turn_interrupted')ended.add(turnKey(event))
    if(event.type==='turn_interrupted') {
      interrupted.add(turnKey(event))
      const matches=(byTurn.get(turnKey(event))??[]).filter(item=>item.scope.parent==='main'&&!item.scope.agent)
      for(const item of matches)item.group.events.push(event)
      // Only the backend's confirmed marker identity can move a marker into a
      // call, and only when that operation has exactly one main-thread call.
      if(matches.length===1&&typeof event.markerRecordId==='string')markerOwners.set(event.markerRecordId,matches[0]!)
    }
    if(event.type==='process_exit')exited.add(JSON.stringify([eventScope(event).base,eventScope(event).generation]))
    const frame=object(event.message)
    if(event.type==='sdk'&&frame?.type==='result')sourceEnds.add(sourceTurnKey(event))
    if(event.type==='sdk'&&frame?.type==='tool_progress'&&typeof frame.tool_use_id==='string'){
      const item=unique(event,frame.tool_use_id)
      if(item){progress.set(item,event);item.group.events.push(event);consumedEvents.set(event,item)}
    }
    if(event.type==='permission_resolved'||event.type==='permission_cancelled') {
      const matches=byRequest.get(approvalKey(event))??[]
      if(matches.length===1){const item=matches[0]!;item.group.events.push(event);consumedEvents.set(event,item)}
    }
  }
  for(const record of records){
    const owner=typeof record.event.recordId==='string'?markerOwners.get(record.event.recordId):undefined
    if(owner){consumedEvents.set(record.event,owner);attachEvents(owner,record)}
  }
  for(const item of candidates) {
    const group=item.group,labels=group.approvals.map(record=>approvalLabel(record,decisions))
    const lastResult=group.results.at(-1)?.block,wasInterrupted=item.scope.parent==='main'&&!item.scope.agent&&interrupted.has(turnKey(item.anchor.event))
    const pending=labels.includes('等待审批'),denied=labels.includes('已拒绝'),cancelled=labels.includes('已取消')
    const isEnded=ended.has(turnKey(item.anchor.event))||sourceEnds.has(sourceTurnKey(item.anchor.event))||exited.has(JSON.stringify([item.scope.base,item.scope.generation]))
    const awaiting=!isEnded&&item.anchor.event.historical!==true&&Boolean(options.activeOperationId)&&item.scope.operation===options.activeOperationId&&(!options.sessionId||toolSessionKey(item.anchor.event.recordId,item.anchor.event.sessionId)===options.sessionId)&&(!options.activeGeneration||item.scope.generation===options.activeGeneration)
    group.status=lastResult && lastResult.is_error!==true ? '成功'
      : denied?'已拒绝':cancelled?'已取消':wasInterrupted?'已中断':lastResult?toolResultStatus(lastResult)
      : pending&&!isEnded?'等待审批':progress.has(item)&&awaiting?'执行中'
      : awaiting ? labels.includes('已批准')?'已批准 · 等待工具结果':'等待工具结果'
      : labels.includes('已批准')?'已批准 · 结果未记录':'结果未记录'
    if(isEnded||lastResult)for(const approval of group.approvals)if(!decisions.has(approvalKey(approval.event)))decisions.set(approvalKey(approval.event),'审批结果未记录')
    // Keep completion/interruption evidence accessible without claiming that a
    // turn outcome proves any particular tool succeeded or actually started.
    group.events=[...new Set(group.events)].sort((a,b)=>a.seq-b.seq)
    group.expansionKeys=[`${group.key}:details`,...[...group.calls,...group.results].flatMap(part=>(part.record.sourceEvents??[part.record.event]).map(event=>
      `tool-open:${JSON.stringify([event.recordId??[scope(event).base,event.seq],item.id])}`))]
    groups.set(group.key,group)
  }
  const placed=new Set<Candidate>(),output:RecordView[]=[]
  const place=(item:Candidate,record:RecordView)=>{
    if(placed.has(item))return
    placed.add(item);output.push({id:item.group.key,kind:'tool',title:item.group.name,text:'',at:record.at,event:record.event,sourceEvents:item.group.events})
  }
  for(const record of records) {
    const attached=new Set<Candidate>(),remaining=(record.blocks??[]).filter(block=>{
      const item=owner.get(block);if(!item)return true;attached.add(item);return false
    })
    const approval=approvalOwner.get(record.id),eventOwner=consumedEvents.get(record.event)
    if(approval)attached.add(approval)
    if(eventOwner)attached.add(eventOwner)
    const removed=attached.size>0
    // Text and thinking are independent content, even alongside tool blocks.
    if(!removed){
      const admission=record.kind==='user' ? (record.sourceEvents??[record.event]).find(event=>event.type==='turn_queued'||event.type==='client_submission') : undefined
      // Local submission IDs already carry the operation ID. Keep that identity
      // when the journal ACK replaces the optimistic row, without comparing text.
      output.push(admission&&typeof admission.operationId==='string'?{...record,id:`submission:${toolSessionKey(admission.recordId,admission.sessionId??options.sessionId)}:${admission.operationId}`}:record)
    }
    else {
      if(!approval&&!eventOwner&&(remaining.length||record.text.trim()))output.push({...record,blocks:remaining})
      for(const item of attached){place(item,record);rowForRecord.set(record.id,item.group.key)}
    }
  }
  // One weak turn separator, using the operation/source identity, not its text.
  // Every joined event remains reachable through raw inspect/full mode.
  const notices=new Map<string,number>(), compact:RecordView[]=[]
  for(const record of output){
    const frame=object(record.event.message)
    const isNotice=record.kind==='system' && typeof record.event.operationId==='string' &&
      (record.event.type==='turn_interrupted'||record.event.type==='turn_completed'||frame?.type==='result') && !record.blocks?.length
    if(!isNotice){compact.push(record);continue}
    // Non-SDK turn completions refer to main. Normalize that explicit contract.
    const noticeKey=JSON.stringify([eventScope(record.event).base,eventScope(record.event).generation,record.event.operationId,eventScope(record.event).parent??'main',eventScope(record.event).agent])
    const prior=notices.get(noticeKey)
    if(prior===undefined){notices.set(noticeKey,compact.length);compact.push(record);continue}
    const before=compact[prior]!
    compact[prior]={...record,id:before.id,
      text:[...new Set([before.text,record.text].filter(Boolean))].join('\n'),
      sourceEvents:[...new Set([...(before.sourceEvents??[before.event]),...(record.sourceEvents??[record.event])])]}
  }
  return {records:compact,groups,rowForRecord,decisions}
}
