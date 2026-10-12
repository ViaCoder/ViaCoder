import {AsyncLocalStorage} from 'node:async_hooks'
import type {ToolUseContext} from '../Tool.js'
import type {Message} from '../types/message.js'
import type {QueuedCommand} from '../types/textInputTypes.js'
import type {PastedContent} from './config.js'
import type {IDESelection} from '../hooks/useIdeSelection.js'
import type {Attachment} from './attachments.js'
import type {StickyBetas287} from '../services/context/officialExecutionOwners287/native.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getAgentTaskRegistry287} from '../tools/AgentTool/agentAdmission287.js'
import {getAgentContext} from './agentContext.js'
import {countRemainingWakePollEventsAfter287} from './messageQueueManager.js'

export interface AttachmentAssemblerOptions287 {
 skipSkillDiscovery?:boolean;isRegularUserPrompt?:boolean;deliveredTurnStart?:boolean;
 conversationLatches?:StickyBetas287;inputMentionsOnly?:boolean;
 isHumanTypedPrompt?:boolean;preExpansionInput?:string;pastedContents?:Record<number,PastedContent>;
 heldAppend?:boolean;suppressWorkflowKeyword?:boolean;planSlugSeed?:string;
}
export type AttachmentAssemblerContext287=ToolUseContext & {
 readonly session:ReturnType<typeof getExecutionSession287>;
 readonly taskRegistry:ReturnType<typeof getAgentTaskRegistry287>;
 readonly agentContext:ReturnType<typeof getAgentContext>|ToolUseContext['dialogAgentContext287'];
 readonly messageQueue:{countRemainingWakePollEventsAfter(commands:readonly QueuedCommand[]):number};
 getMcp():ReturnType<ToolUseContext['getAppState']>['mcp'];
}
const scope=new AsyncLocalStorage<ToolUseContext>()
/** Only for legacy leaves whose original ABI receives tools/session rather than the full context. */
export function getAttachmentAssemblerContext287():ToolUseContext {
 const context=scope.getStore();if(!context)throw Error('Attachment producer called outside its collector context');return context
}
/** A view of the existing context. All own fields remain enumerable so original
 * Vor's child spread retains them; state/cache/registry values are never cloned. */
export function toAttachmentAssemblerContext287(context:ToolUseContext):AttachmentAssemblerContext287 {
 const view=Object.create(context) as AttachmentAssemblerContext287
 const fields:PropertyDescriptorMap={}
 for(const key of Object.keys(context))fields[key]={enumerable:true,get:()=>Reflect.get(context,key)}
 Object.assign(fields,{
  session:{enumerable:true,get:getExecutionSession287},
  taskRegistry:{enumerable:true,get:()=>getAgentTaskRegistry287(context)},
  agentContext:{enumerable:true,get:()=>context.dialogAgentContext287??getAgentContext()},
  messageQueue:{enumerable:true,value:{countRemainingWakePollEventsAfter:countRemainingWakePollEventsAfter287}},
  getMcp:{enumerable:true,value:()=>context.getAppState().mcp},
 })
 Object.defineProperties(view,fields);return view
}
export function runWithAttachmentAssemblerContext287<T>(context:ToolUseContext,callback:()=>T):T{return scope.run(context,callback)}
export function collectOfficialAttachments287(input:string|null,context:ToolUseContext,selection:IDESelection|null,queued:QueuedCommand[],messages?:Message[],querySource?:string,options?:AttachmentAssemblerOptions287):Promise<Attachment[]> {
 return runWithAttachmentAssemblerContext287(context,()=>{
  const {getOriginalModsLifecycle287}=require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')
  return getOriginalModsLifecycle287().attachmentAssembler.collect(input,toAttachmentAssemblerContext287(context),selection,queued,messages,querySource,options)
 })
}

/** New public 287 variants emitted by the recovered scheduler. Existing
 * attachment variants and their frozen/C normalization stay untouched. */
export interface PollEventsAttachment287 {
 type:'poll_events';envelopes:string[];kinds:string[];media?:import('@anthropic-ai/sdk/resources/messages.mjs').ContentBlockParam[][];remainingWakeCount:number;timestamp?:string;provenance:unknown[];declared?:({kind:string;at?:string;fields:object}|null)[];userRoleGuard?:boolean;deliveredVia?:'poll_tool';
}
export type OriginalAssemblerAttachment287=
 |PollEventsAttachment287
 |import('./attachments.js').PDFReferenceAttachment
 |{type:'at_mention_reference';mentions:string[]}
 |{type:'selected_lines_in_diff';lineCount:number;content:string;filePath?:string}
 |{type:'peer_mention';mention:string;status:'resolved'|'ask';candidates:{token:string;where:string}[];total:number}
 |{type:'skill_mention';skillName:string}
 |{type:'sandbox_instructions';content:string}
 |{type:'artifact_opening_prefetch';content:string;kind?:string;slug?:string}
 |{type:'silent_turn_reminder';text:string}
 |{type:'workflow_keyword_request'}
 |{type:'ultra_effort_enter';reminderType:'full'|'sparse'}
 |{type:'ultra_effort_exit'}
 |{type:'tool_hosts_correction';lines:string[]}
 |{type:'tool_hosts_notice';lines:string[]}
 |{type:'workflow_size_guideline_change';size:string}
 |{type:'tool_search_usage_reminder';undiscoveredToolNames:string[];undiscoveredCount:number}
 |{type:'mcp_dropped_tools_delta';addedEntries:string[]}
export function normalizeOriginalAssemblerAttachment287(attachment:OriginalAssemblerAttachment287){
 const {getOriginalModsLifecycle287}=require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')
 return getOriginalModsLifecycle287().attachmentAssembler.normalizers[attachment.type](attachment)
}
