import type {AgentDefinition} from '../../../tools/AgentTool/loadAgentsDir.js'
import type {ScopedMcpServerConfig,AgentMcpServerConfig287,ConfigScope,McpServerConfig} from '../types.js'
export type AgentMcpConfigIngressOptions287={readonly strictMcpConfig?:boolean;readonly onBlocked?:(names:string[])=>void}
export function readAgentMcpConfigIngress287():(parent:Record<string,ScopedMcpServerConfig>,agent:AgentDefinition|undefined,options?:AgentMcpConfigIngressOptions287)=>Record<string,ScopedMcpServerConfig|AgentMcpServerConfig287>
export function readMcpConfigWriter287():(name:string,config:unknown,scope:ConfigScope,storageV5?:unknown)=>Promise<void>
export function readMcpConfigReservation287():(name:string,options?:{hosted?:boolean;hostCarrier?:boolean;config?:McpServerConfig})=>boolean|undefined
