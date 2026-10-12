import {getOriginalMcpAttachments287} from './mcpAttachments287.js'
import type {McpInstructionsDelta287} from './officialMcpAttachments287/native.js'
import type {MCPServerConnection} from '../services/mcp/types.js'
import type {Message} from '../types/message.js'
import {isEnvDefinedFalsy,isEnvTruthy} from './envUtils.js'
export type McpInstructionsDelta=McpInstructionsDelta287
export type ClientSideInstruction={serverName:string;block:string}
/** BHr is unconditional in 287. Keep the explicit local override, not the
 * superseded default-false feature gate which loses ordinary instructions. */
export function isMcpInstructionsDeltaEnabled():boolean {
 if(isEnvTruthy(process.env.CLAUDE_CODE_MCP_INSTR_DELTA))return true
 if(isEnvDefinedFalsy(process.env.CLAUDE_CODE_MCP_INSTR_DELTA))return false
 return true
}
export function getMcpInstructionsDelta(clients:MCPServerConnection[],messages:Message[],clientSide:ClientSideInstruction[]):McpInstructionsDelta|null {
 return getOriginalMcpAttachments287().diff(clients,messages,clientSide)
}
