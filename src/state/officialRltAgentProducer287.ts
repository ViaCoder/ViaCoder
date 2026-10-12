import {randomUUID} from 'node:crypto';
import type {ToolUseContext} from '../Tool.js';
import type {ProgressMessage,AssistantMessage,NormalizedUserMessage} from '../types/message.js';
import type {AgentToolProgress} from '../types/tools.js';
import {isBuiltInAgent,type AgentDefinition} from '../tools/AgentTool/loadAgentsDir.js';
// Original Do's entire timer initializer and first two finally statements.
// Existing task/AbortController/stream instances are supplied; no session owner.
export const startOfficialAgentBackgroundHint287=new Function('e','We','setTimeout','clearTimeout',"var Ao=2000;let on=We?void 0:setTimeout((_)=>{if(_.toolUseId)_.emitToolProgress?.({kind:\"background_hint\",toolUseId:_.toolUseId})},Ao,e);return ()=>{if(on)clearTimeout(on);if(e.toolUseId)e.emitToolProgress?.({kind:\"clear\",toolUseId:e.toolUseId});};") as (context:Pick<ToolUseContext,'toolUseId'|'emitToolProgress'>,disabled:boolean,setTimer:typeof setTimeout,clearTimer:typeof clearTimeout)=>()=>void;
// Original ct's full message creator and progress publisher. G is the caller's
// existing trail array, not a parallel copy. Y is its one original row counter.
export const createOfficialForkProgressMessage287=new Function('n','x','B','e','U','Sl','fe',"let Y=0;const me=(A)=>(Y++,{type:\"progress\",data:{message:A,type:\"agent_progress\",prompt:n,agentId:x,agentType:B.agentType,isBuiltIn:B.source===\"built-in\",description:e.description},parentToolUseID:U,toolUseID:`${U}-${Y}`,timestamp:new Date().toISOString(),uuid:fe()});return me;") as (prompt:string,agentId:string,agent:AgentDefinition,command:{description:string},toolUseId:string,isBuiltIn:typeof isBuiltInAgent,uuid:typeof randomUUID)=>(message:AssistantMessage|NormalizedUserMessage)=>ProgressMessage<AgentToolProgress>;
export const createOfficialForkProgressPublisher287=new Function('o','G','U',"const Ce=()=>{o.emitToolProgress?.({kind:\"agent_progress\",toolUseId:U,progressMessages:[...G]})};return Ce;") as (context:Pick<ToolUseContext,'emitToolProgress'>,messages:readonly ProgressMessage[],toolUseId:string)=>()=>void;
