import type {z} from 'zod/v4'
import type {Tool,ToolUseContext} from '../../Tool.js'
import {captureWorkflowContext287,getWorkflowExecutionSource287} from './officialExecution287/runtime.js'
export {WORKFLOW_TOOL_NAME} from './constants.js'

// Original ti/Wt owns the complete input coercion, prompts, validation,
// permission rules, resume admission, launch and result contract. Only capture
// the existing AppState/taskRegistry/execution owners at the legacy public ABI.
export type WorkflowInput287={script?:string;name?:string;description?:string;title?:string;args?:unknown;scriptPath?:string;resumeFromRunId?:string}
export type WorkflowOutput287={status:'async_launched'|'remote_launched';taskId:string;taskType?:'local_workflow'|'remote_agent';workflowName?:string;runId?:string;summary?:string;transcriptDir?:string;scriptPath?:string;sessionUrl?:string;warning?:string;error?:string}
type WorkflowTool287=Tool<z.ZodType<WorkflowInput287>,WorkflowOutput287>
function original():WorkflowTool287 {return getWorkflowExecutionSource287('chunk-t1k2p0jf.js').WorkflowTool as WorkflowTool287}
export const WorkflowTool:WorkflowTool287=new Proxy({} as WorkflowTool287,{
 get(_target,key){
  const tool=original(),value=Reflect.get(tool,key)
  if(['call','validateInput','checkPermissions','permissionCheckFailureDecision'].includes(String(key))&&typeof value==='function')
   return (input:unknown,context:ToolUseContext,...args:unknown[])=>Reflect.apply(value,tool,[input,captureWorkflowContext287(context),...args])
  return value
 },
 ownKeys:()=>Reflect.ownKeys(original()),
 getOwnPropertyDescriptor(_target,key){const d=Reflect.getOwnPropertyDescriptor(original(),key);return d?{...d,configurable:true}:undefined},
 has:(_target,key)=>Reflect.has(original(),key),
})
