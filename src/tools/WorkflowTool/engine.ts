import type {ToolUseContext} from '../../Tool.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {WorkflowPhase} from './scripts.js'
import {parseWorkflowScript} from './scripts.js'
import {captureWorkflowContext287,getWorkflowExecutionSource287} from './officialExecution287/runtime.js'

export type WorkflowAgentOptions={label?:string;phase?:string;model?:string;schema?:Record<string,unknown>;subagent_type?:string;effort?:string;isolation?:string;agentType?:string;disallowedTools?:string[]}
export type WorkflowProgress=
 | {type:'workflow_log';message:string}
 | {type:'workflow_phase';title:string;index?:number;kind?:string}
 | {type:'workflow_agent';agentId:string;index?:number;label:string;state:'running'|'start'|'progress'|'done'|'error';phaseTitle?:string;phaseIndex?:number;error?:string;tokens?:number;toolCalls?:number;cached?:boolean;skipped?:boolean;resultPreview?:string}
export type WorkflowRunResult={result:unknown;agentCount:number;logs:string[];failures:string[];durationMs:number;error?:string;foreignArtifactContent?:boolean}
export type WorkflowEngineOptions={args?:unknown;signal?:AbortSignal;toolUseContext?:ToolUseContext;canUseTool?:CanUseToolFn;workflowRunId?:string;onAgentController?:(agentId:string,controller:AbortController|null)=>void;onProgress?:(progress:WorkflowProgress)=>void;
 // Retained only as legacy fixture ABI. Production agents run the original Ko
 // via the actual context; this callback is never a replacement Agent owner.
 runAgent?:(prompt:string,options:WorkflowAgentOptions,index:number,signal:AbortSignal)=>Promise<unknown>;resolveWorkflow?:(name:string)=>Promise<string|undefined>;maxDepth?:number}
type Compiled287={ok:true;vmScript:unknown}|{ok:false;error:string}
export async function runWorkflowScript(script:string,options:WorkflowEngineOptions):Promise<WorkflowRunResult>{
 if(!options.toolUseContext||!options.canUseTool)throw Error('Workflow execution requires the actual tool context and permission owner')
 const parsed=parseWorkflowScript(script)
 if('error'in parsed)return {result:null,agentCount:0,logs:[],failures:[],durationMs:0,error:parsed.error}
 const module=getWorkflowExecutionSource287('chunk-jxy1fa30.js'),compiled=(module.ete as (body:string)=>Compiled287)(parsed.scriptBody)
 if(compiled.ok===false)return {result:null,agentCount:0,logs:[],failures:[],durationMs:0,error:compiled.error}
 return (module.Yo as (script:unknown,context:ToolUseContext,canUseTool:CanUseToolFn,options:object)=>Promise<WorkflowRunResult>)(compiled.vmScript,captureWorkflowContext287(options.toolUseContext),options.canUseTool,{args:options.args,workflowRunId:options.workflowRunId,onAgentController:options.onAgentController,onProgress:(event:{type:string;data:WorkflowProgress})=>{if(event.type==='progress')options.onProgress?.(event.data)}})
}
export function getSeedPhaseTitles(phases?:WorkflowPhase[]):string[]{return phases?.map(p=>p.title)??[]}
