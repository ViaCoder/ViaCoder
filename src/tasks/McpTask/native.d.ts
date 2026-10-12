import type {AgentTaskRegistry287} from '../../tools/AgentTool/agentAdmissionNative287.js'
export function createMcpTaskNative287(ports:{t(message:string):void;d(error:unknown):void;c5(id:string,storage:unknown,session?:string,projectDir?:string):Promise<void>}):{
 name:'MCP Task';type:'mcp_task';kill(id:string,registry:AgentTaskRegistry287,unused?:unknown,unused2?:unknown,storage?:unknown):Promise<void>
}
