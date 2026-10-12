import type {Tool,ToolUseContext} from '../../Tool.js'
import {getExecutionSession287} from '../context/execution287.js'
import {getToolState287} from '../../utils/toolState287.js'
import {getAgentTaskRegistry287} from '../../tools/AgentTool/agentAdmission287.js'
import {resolveMcpAttachmentClients287} from '../../utils/mcpAttachments287.js'

/** Read-through public bridge. Registry/state are the existing AppState and
 * execution owners; no MCP-local task map, permission layer or model default. */
export function captureMcpToolContext287(context:ToolUseContext):ToolUseContext {
 const view=Object.create(context) as ToolUseContext
 for(const [key,get]of Object.entries({
  session:()=>getExecutionSession287(),
  taskRegistry:()=>getAgentTaskRegistry287(context),
  toolState:()=>getToolState287(),
 }))if(!Reflect.has(context,key))Object.defineProperty(view,key,{get,enumerable:true})
 if(context.options.refreshMcpClients===undefined){
  const options=Object.create(context.options) as typeof context.options
  Object.defineProperty(options,'refreshMcpClients',{enumerable:true,value:()=>resolveMcpAttachmentClients287(context.getAppState().mcp.clients,context)})
  Object.defineProperty(view,'options',{enumerable:true,value:options})
 }
 return view
}
const bound=Symbol('original-MCP-public-context-287')
export function bindMcpTools287(tools:Tool[]):Tool[]{
 for(const tool of tools){
  if(Reflect.get(tool,bound))continue
  const call=tool.call
  tool.call=(input,context,canUseTool,parent,progress)=>{
   // Desktop/Chrome have the user's separate full-host authorization. A fixed
   // project root is not their boundary. Keep the original permission callback
   // and host call; file/Shell isolation stays at those tools' actual owners.
   return call(input,captureMcpToolContext287(context),canUseTool,parent,progress)
  }
  Object.defineProperty(tool,bound,{value:true})
 }
 return tools
}
