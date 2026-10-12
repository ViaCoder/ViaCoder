import {createWorkflowExecutionGraph287} from './native.js'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'

var graph:ReturnType<typeof createWorkflowExecutionGraph287>|undefined
export function getWorkflowExecutionSource287(file:string):Readonly<Record<string,unknown>> {
 graph??=createWorkflowExecutionGraph287((dependency,name)=>{
  if(dependency==='@local/workflow-script-fence')return workflowScriptReadFence287
  if(!dependency.startsWith('chunk-')){
   const native=import.meta.require(dependency) as Record<string,unknown>
   if(name==='*')return native
   if(name==='default')return native.default??native
   if(!Object.hasOwn(native,name))throw Error('Missing Workflow native binding: '+dependency+':'+name)
   return native[name]
  }
  return getOriginalModsLifecycle287().clearLifecycleSource287(dependency,name)
 })
 return graph.source(file)
}

import type {ToolUseContext} from '../../../Tool.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {getAgentTaskRegistry287} from '../../AgentTool/agentAdmission287.js'
import {getToolState287} from '../../../utils/toolState287.js'
import {getAgentContext} from '../../../utils/agentContext.js'
import {pathInAllowedWorkingPath} from '../../../utils/permissions/filesystem.js'
import {getCwd} from '../../../utils/cwd.js'
import {resolve} from 'node:path'
import type {ToolPermissionContext} from '../../../Tool.js'

export type WorkflowToolContext287=ToolUseContext & {session:ReturnType<typeof getExecutionSession287>;taskRegistry:ReturnType<typeof getAgentTaskRegistry287>}
export function captureWorkflowContext287(context:ToolUseContext):WorkflowToolContext287 {
 const view={...context} as WorkflowToolContext287
 for(const [key,get]of Object.entries({session:()=>getExecutionSession287(),taskRegistry:()=>getAgentTaskRegistry287(context),toolState:()=>getToolState287(),agentContext:()=>getAgentContext()??context.dialogAgentContext287??(getOriginalModsLifecycle287().clearLifecycleSource287('chunk-nankzm0s.js','pl') as ()=>object)()}))
  if(!Reflect.has(context,key))Object.defineProperty(view,key,{get,enumerable:true})
 const options={...context.options}
 if(!Reflect.has(context.options,'toolCatalog'))Object.defineProperty(options,'toolCatalog',{enumerable:true,get:()=>import.meta.require('../../../tools.js') as typeof import('../../../tools.js')})
 if(!context.options.runQuery)Object.defineProperty(options,'runQuery',{enumerable:true,get:()=> (import.meta.require('../../../query.js') as typeof import('../../../query.js')).query})
 view.options=options
 return view
}
function workflowScriptReadFence287(path:string,context:{permissions:()=>ToolPermissionContext}):string|null {
 if(!path||path.includes('\0'))return 'Invalid workflow script path'
 return pathInAllowedWorkingPath(resolve(getCwd(),path),context.permissions())?null:`Workflow script path is outside readable working directories: ${path}`
}
