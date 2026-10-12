import type {Message} from '../../types/message.js'
import type {PermissionDecision} from '../../types/permissions.js'
import {classifyDreamToolDenial287,type DreamToolDenialKind287} from './officialDreamFeedback287/denial.js'

/**
 * The public host currently drops Re.toolDenialKind. Retain the actual permission
 * decision by tool-use ID until its real result reaches Dream's original De.
 * This is fork-local transport correlation, not another permission/task cache.
 */
export function createDreamToolDenialFeedback287() {
 const pending=new Map<string,DreamToolDenialKind287>()
 return {
  recordDecision(id:string,decision:PermissionDecision):void {
   if(decision.behavior==='allow')pending.delete(id)
   else pending.set(id,classifyDreamToolDenial287(decision))
  },
  prepareMessage(message:Message):Message & {toolDenialKind?:unknown} {
   if(message.type!=='user'||typeof message.message.content==='string')return message
   const results=message.message.content.filter(block=>block.type==='tool_result')
   // Actual runToolUse emits one primary tool result per user message. Do not
   // infer a whole-message denial for a mixed/batched host transport frame.
   if(results.length!==1)return message
   const result=results[0]!
   const kind=pending.get(result.tool_use_id)
   pending.delete(result.tool_use_id)
   if('toolDenialKind' in message&&message.toolDenialKind!==undefined)return message
   if(kind===undefined||result.is_error!==true)return message
   return {...message,toolDenialKind:kind}
  },
 }
}
