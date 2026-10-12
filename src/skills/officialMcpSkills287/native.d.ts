import type {Command} from '../../commands.js'
import type {ConnectedMCPServer,ConnectedMCPServerV2} from '../../services/mcp/types.js'
import type {NativeModernConnection287} from '../../services/mcp/officialConnected287/native.js'
export type McpSkillsClient287=ConnectedMCPServer|ConnectedMCPServerV2|NativeModernConnection287
export interface McpSkillsFetcher287 {
 fetchForClient:((client:McpSkillsClient287,storageV5?:unknown)=>Promise<Command[]>)&{cache:Pick<Map<string,Promise<Command[]>>,'get'|'has'|'delete'|'clear'|'set'>}
 invalidate(key:string):void
 invalidateExcept(keys:Set<string>):void
 reset():void
}
export interface McpSkillsModule287 {
 McpSkillsFetcher:new()=>McpSkillsFetcher287
 fetchMcpSkillsForClient(client:McpSkillsClient287,storageV5?:unknown):Promise<Command[]>
 invalidateMcpSkillsForServer(key:string):void
 invalidateMcpSkillsExcept(keys:Set<string>):void
 mcpSkillsFetcher():McpSkillsFetcher287
}
export type McpSkillsPorts287=Record<"S"|"c"|"l"|"E"|"F"|"i"|"y"|"m"|"p"|"t"|"I"|"bf"|"sE"|"Go"|"te"|"Zt"|"qt"|"xle"|"_Se"|"Hs"|"dx"|"z2"|"cUe"|"SSe"|"gmt"|"kgn"|"vr"|"eon"|"ton"|"Cvo"|"ckr"|"Avo"|"Tvo"|"kvo"|"l2r"|"Ja"|"C_n"|"R2t"|"A_n"|"T_n"|"An"|"an"|"Qx"|"zZe"|"K"|"z"|"R"|"x"|"T"|"b"|'mcpClientModuleGateway',unknown>&{observeSkillCommandRoot287(command:Command,root:Readonly<{server:string;uri:string}>):void}
export function createMcpSkills287(ports:McpSkillsPorts287):McpSkillsModule287
