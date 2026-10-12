import {createMcpTaskNative287} from './native.js'
import type {Task,TaskStateBase,SetAppState} from '../../Task.js'
import type {AppState} from '../../state/AppState.js'
import {getAgentTaskRegistry287} from '../../tools/AgentTool/agentAdmission287.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
export type McpTaskState=TaskStateBase&{
 type:'mcp_task';serverName:string;toolName:string;mcpTaskId?:string;mcpStatus?:string;pollIntervalMs?:number;
 abortController?:AbortController;driveAbortController?:AbortController;sep2663Cancel?:()=>void;
 protocol?:unknown;ttlExpiresAt?:number;sidecarSessionId?:string;sidecarProjectDir?:string;sidecarWrite?:Promise<unknown>;
 parked?:unknown;onWorkerWakeOutcome?:(outcome:{kind:'stopped'})=>void
}
const native=createMcpTaskNative287({t:logForDebugging,d:logError,c5:(...args)=>{
 // Source c5, directories/FS and optional storage use the existing MCP
 // namespace and pin owner, never another sidecar map or serializer.
 const ns=(require('../../services/mcp/connectedProducer287.js') as typeof import('../../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().dynamicModules['chunk-dyg2mvj3.js']
 const remove=ns?.c5;if(typeof remove!=='function')throw Error('Original MCP c5 export absent')
 return remove(...args) as Promise<void>
}})
function readState(setAppState:SetAppState):AppState {let state:AppState|undefined;setAppState(prev=>{state=prev;return prev});if(!state)throw Error('Task store read did not execute');return state}
export const McpTask:Task={name:native.name,type:native.type,kill:async(id,setAppState,context)=>{
 const registry=getAgentTaskRegistry287({getAppState:context?.getAppState??(()=>readState(setAppState)),setAppState})
 await native.kill(id,registry,undefined,undefined,context?.storageV5)
}}
