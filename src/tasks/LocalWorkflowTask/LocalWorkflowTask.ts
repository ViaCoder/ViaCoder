import type {SetAppState,Task,TaskStateBase} from '../../Task.js'
import type {ToolUseContext} from '../../Tool.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {AppState} from '../../state/AppState.js'
import type {WorkflowAgentOptions,WorkflowProgress,WorkflowRunResult} from '../../tools/WorkflowTool/engine.js'
import type {WorkflowPhase} from '../../tools/WorkflowTool/scripts.js'
import {parseWorkflowScript} from '../../tools/WorkflowTool/scripts.js'
import {getAgentTaskRegistry287} from '../../tools/AgentTool/agentAdmission287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {captureWorkflowContext287,getWorkflowExecutionSource287} from '../../tools/WorkflowTool/officialExecution287/runtime.js'

export type LocalWorkflowTaskState=TaskStateBase & {
 type:'local_workflow';script:string;scriptPath?:string;args?:unknown;prompt:string;summary?:string;workflowName:string;title?:string;phases?:WorkflowPhase[];defaultModel?:string;workflowRunId:string;ownerAgentId?:string;spawnerAgentId?:string;workflowProgress:WorkflowProgress[];progressVersion:number;agentCount:number;totalTokens:number;totalToolCalls:number;logs:string[];result?:unknown;error?:string;abortController?:AbortController;agentControllers?:Map<string,AbortController>;evictAfter?:number;rateLimitWait?:{resetsAt:number;resumeAtMs:number;waitingAgents:number};terminal?:{summary?:string;output_file?:string;usage?:{total_tokens:number;tool_uses:number;duration_ms:number}}
}
export type LaunchWorkflowOptions={taskId:string;runId:string;script:string;scriptPath?:string;args?:unknown;workflowName:string;summary:string;title?:string;phases?:WorkflowPhase[];toolUseId?:string;runDirectory:string;setAppState:SetAppState;toolUseContext?:ToolUseContext;canUseTool?:CanUseToolFn;runAgent?:(prompt:string,options:WorkflowAgentOptions,signal:AbortSignal)=>Promise<unknown>;resolveWorkflow?:(name:string)=>Promise<string|undefined>}
// Legacy launch ABI only; production ti/Wt calls this same original jkt directly.
export function launchLocalWorkflowTask(options:LaunchWorkflowOptions):LocalWorkflowTaskState {
 if(!options.toolUseContext||!options.canUseTool)throw Error('Workflow task launch requires the actual tool context and permission owner')
 const parsed=parseWorkflowScript(options.script);if('error'in parsed)throw Error(parsed.error)
 const source=getWorkflowExecutionSource287('chunk-jxy1fa30.js'),compiled=(source.ete as (s:string)=>{ok:boolean;vmScript?:unknown;error?:string})(parsed.scriptBody)
 if(!compiled.ok)throw Error(compiled.error)
 return (source.jkt as (o:object)=>LocalWorkflowTaskState)({taskId:options.taskId,workflowRunId:options.runId,script:options.script,scriptPath:options.scriptPath,args:options.args,meta:parsed.meta,vmScript:compiled.vmScript,toolUseContext:captureWorkflowContext287(options.toolUseContext),canUseTool:options.canUseTool,toolUseId:options.toolUseId,transcriptDir:options.runDirectory,telemetry:{source:'inline',name:(source.T7t as (n:string)=>unknown)(parsed.meta.name),description:(source.k7t as (n:string)=>unknown)(parsed.meta.description),scriptIsVerbatimBuiltIn:false},isResume:false})
}
function registry(setAppState:SetAppState,getAppState?:()=>AppState){return getAgentTaskRegistry287({setAppState,getAppState:getAppState??(()=>{let state:AppState|undefined;setAppState(previous=>{state=previous;return previous});if(!state)throw Error('Workflow task controls require the actual AppState reader');return state})})}
export function killWorkflowTask(taskId:string,setAppState:SetAppState,getAppState?:()=>AppState):boolean {
 return (getOriginalModsLifecycle287().clearLifecycleSource287('chunk-8tmmrx5g.js','O4') as (id:string,r:ReturnType<typeof registry>,reason?:string)=>boolean)(taskId,registry(setAppState,getAppState),'user-stop')
}
export function skipWorkflowAgent(taskId:string,agentId:string,setAppState:SetAppState):boolean {
 return (getWorkflowExecutionSource287('chunk-8tmmrx5g.js').AVe as (id:string,agent:string,r:ReturnType<typeof registry>)=>boolean)(taskId,agentId,registry(setAppState))
}
export function retryWorkflowAgent(taskId:string,agentId:string,setAppState:SetAppState):boolean {
 return (getWorkflowExecutionSource287('chunk-8tmmrx5g.js').TVe as (id:string,agent:string,r:ReturnType<typeof registry>)=>boolean)(taskId,agentId,registry(setAppState))
}
export async function waitForWorkflowTask(taskId:string,context?:ToolUseContext):Promise<WorkflowRunResult|undefined>{
 if(!context)throw Error('Workflow task wait requires the actual taskRegistry context')
 const r=getAgentTaskRegistry287(context)
 for(;;){const task=r.get(taskId);if(!task||task.type!=='local_workflow')return;if(task.status!=='running')return {result:task.result,agentCount:task.agentCount,logs:task.logs,failures:[],durationMs:(task.endTime??Date.now())-task.startTime,error:task.error};await new Promise(resolve=>setTimeout(resolve,20))}
}
export const LocalWorkflowTask:Task={name:'LocalWorkflowTask',type:'local_workflow',async kill(taskId,setAppState,context){killWorkflowTask(taskId,setAppState,context?.getAppState)}}
