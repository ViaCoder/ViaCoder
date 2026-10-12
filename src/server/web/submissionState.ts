import type {RemoteMessageContent} from '../../utils/teleport/api.js'
import type {ServeEvent} from '../serveSession.js'
import {object,type RecordView} from './records.js'
export type LocalSubmission={id:string;content:RemoteMessageContent;at:number;phase:'pending'|'accepted'|'rejected'|'unknown'}
/** Local display only: never an executor queue, never persisted or auto-retried. */
export function submissionRecords(submissions:LocalSubmission[],events:ServeEvent[]):RecordView[]{
 const admitted=new Set(events.filter(e=>e.type==='turn_queued').map(e=>e.operationId))
 const labels={pending:'正在提交 · 尚未确认',accepted:'已入队 · 等待实时同步',rejected:'提交失败 · 草稿已保留',unknown:'提交结果未知 · 草稿已保留，可核对后重试'}
 return submissions.filter(item=>!admitted.has(item.id)).map(item=>{
  const blocks=Array.isArray(item.content)?item.content.map(object).filter((b):b is Record<string,unknown>=>Boolean(b)):undefined
  return {id:`submission:${item.id}`,kind:'user',title:'你',at:item.at,status:labels[item.phase],
   text:typeof item.content==='string'?item.content:blocks?.filter(b=>b.type==='text').map(b=>String(b.text??'')).join('\n\n')??'',blocks,
   event:{seq:0,at:item.at,type:'client_submission',operationId:item.id,phase:item.phase,local:true}}
 })
}
