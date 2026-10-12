import type {MCPServerConnection,ScopedMcpServerConfig,ServerResource,ServerResourceTemplate} from '../types.js'
import type {Tool} from '../../../Tool.js'
import type {Command} from '../../../commands.js'
import type {McpConnected287,NativeModernConnection287} from '../officialConnected287/native.js'
export interface McpReauthActor287 {subscribe(callback:(name:string,config:ScopedMcpServerConfig)=>void):()=>void;emit(name:string,config:ScopedMcpServerConfig):void}
export type ReauthResult287={client:NativeModernConnection287;tools:Tool[];commands:Command[];resources:ServerResource[];resourceTemplates:ServerResourceTemplate[];replaceOnly:true}
export interface McpReauthPorts287 {
 uhe:McpReauthActor287;gr():number;Ie:{get():{clients:readonly Pick<MCPServerConnection,'name'|'type'|'config'>[]}};
 Ts(client:Pick<MCPServerConnection,'type'>):boolean;Io(name:string):boolean;b1(name:string,config:ScopedMcpServerConfig):boolean;vr(name:string,config:ScopedMcpServerConfig):string;rb():boolean;
 Ql():{clearServerCache:McpConnected287['clearServerModern'];connectToServer:McpConnected287['dialModern'];detachAndCloseConnection:McpConnected287['detachModern'];fetchToolsForClient:McpConnected287['listToolsModern'];fetchCommandsForClient:McpConnected287['listCommandsModern'];fetchResourcesForClient:McpConnected287['listResourcesModern']};
 GS:Pick<typeof import('../../../skills/mcpSkills.js'),'fetchMcpSkillsForClient'>;qo(result:ReauthResult287):void;
 Do(result:Extract<MCPServerConnection,{type:'failed'}>&{replaceOnly:true}):void;Se?:unknown;_e?:unknown;t(message:string,options:{level:'error'}):void;$o(error:unknown,config:ScopedMcpServerConfig):string;
}
export function registerMcpReauth287(ports:McpReauthPorts287):()=>void

/** Full original success listener also consumes the genuine legacy SDK. */
export type LegacyReauthResult287=Omit<ReauthResult287,'client'>&{client:import('../types.js').ConnectedMCPServer}
export interface LegacyMcpReauthPorts287 extends Omit<McpReauthPorts287,'Ql'|'qo'> {
 Ql():{clearServerCache:McpConnected287['clearServerLegacy'];connectToServer:McpConnected287['dialLegacy'];detachAndCloseConnection:McpConnected287['detachLegacy'];fetchToolsForClient:McpConnected287['listToolsLegacy'];fetchCommandsForClient:McpConnected287['listCommandsLegacy'];fetchResourcesForClient:McpConnected287['listResourcesLegacy']};
 qo(result:LegacyReauthResult287):void;
}
export function registerMcpReauth287(ports:LegacyMcpReauthPorts287):()=>void
