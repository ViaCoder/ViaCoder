import type {SearchTool287,SearchOutput287} from '../../utils/officialToolSchema287/native.js'
import {getToolSchemaRuntime287} from '../../utils/toolSchema287.js'
import {resolveMcpAttachmentClients287} from '../../utils/mcpAttachments287.js'
import {captureMcpToolContext287} from '../../services/mcp/toolContext287.js'
import {getToolState287} from '../../utils/toolState287.js'
const call287:SearchTool287['call']=(input,context,canUseTool,parent,progress,options)=>{
 const captured=captureMcpToolContext287(context),view=Object.create(captured) as typeof context
 if(context.options.refreshMcpClients===undefined){
  const opts=Object.create(context.options) as typeof context.options
  Object.defineProperty(opts,'refreshMcpClients',{enumerable:true,value:()=>resolveMcpAttachmentClients287(context.getAppState().mcp.clients,context)})
  Object.defineProperty(view,'options',{enumerable:true,value:opts})
 }
 return getToolSchemaRuntime287().searchTool.call(input,view,canUseTool,parent,progress,options)
}
/** Lazy public read-through avoids the tool-registry cold cycle. The actual
 * definition/create/call/render/schema remain original Pjn/Wt on one owner. */
export const ToolSearchTool:SearchTool287=new Proxy({} as SearchTool287,{
 get(_target,key){if(key==='call')return call287;return Reflect.get(getToolSchemaRuntime287().searchTool,key)},
 has(_target,key){return Reflect.has(getToolSchemaRuntime287().searchTool,key)},
 ownKeys(){return Reflect.ownKeys(getToolSchemaRuntime287().searchTool)},
 getOwnPropertyDescriptor(_target,key){const descriptor=Reflect.getOwnPropertyDescriptor(getToolSchemaRuntime287().searchTool,key);return descriptor&&{...descriptor,configurable:true}},
})
export const inputSchema=()=>ToolSearchTool.inputSchema
export const outputSchema=()=>ToolSearchTool.outputSchema!
export type Output=SearchOutput287
/** Same session YL/jqn that the original runner consumes, including clear. */
export function clearToolSearchDescriptionCache():void {
 const source=getToolSchemaRuntime287()
 getToolState287().get(source.searchDescriptionCache).clear()
}
