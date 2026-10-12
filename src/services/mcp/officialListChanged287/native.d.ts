import type {Command} from '../../../commands.js'
import type {Tool} from '../../../Tool.js'
import type {ConnectedMCPServerV2,ConnectedMcpServer,ScopedMcpServerConfig,ServerResource,ServerResourceTemplate} from '../types.js'
import type {McpListCacheView287,McpConnected287} from '../officialConnected287/native.js'
export type ListChangedCause287 = 'reopen_refetch' | undefined
export type ListChangedUpdate287<Client extends ConnectedMcpServer=ConnectedMCPServerV2>=Client&{tools?:Tool[];commands?:Command[];resources?:ServerResource[];resourceTemplates?:ServerResourceTemplate[]}
export type ListChangedRegistration287<Client extends ConnectedMcpServer=ConnectedMCPServerV2>=(client:Client,callback:(cause?:ListChangedCause287)=>Promise<void>)=>void
export interface ListChangedClientModule287<Client extends ConnectedMcpServer=ConnectedMCPServerV2> {
 fetchToolsForClient:McpConnected287['listToolsModern'];fetchCommandsForClient:McpConnected287['listCommandsModern'];fetchResourcesForClient:McpConnected287['listResourcesModern'];
 fetchResourceTemplatesForClient:((client:Client)=>Promise<ServerResourceTemplate[]>)&{cache:McpListCacheView287<ServerResourceTemplate[]>};
 getToolsListErrorForResult:McpConnected287['listToolsError'];getDiscoveryFetchError:McpConnected287['discoveryFetchError'];persistRefreshedToolsIfPresent:McpConnected287['persistRefreshedModern'];
 onMcpToolListChanged:ListChangedRegistration287<Client>;onMcpPromptListChanged:ListChangedRegistration287<Client>;onMcpResourceListChanged:ListChangedRegistration287<Client>;
}
export interface McpListChangedPorts287<Client extends ConnectedMcpServer=ConnectedMCPServerV2> {
 gr():number;ww(config:ScopedMcpServerConfig):boolean;vr(name:string,config:ScopedMcpServerConfig):string;Ql():ListChangedClientModule287<Client>;
 X$(name:string,config:ScopedMcpServerConfig):Promise<string|undefined>;oTe(cause?:ListChangedCause287):string;fJ:'reopen_refetch';
 te(name:string,message:string):void;t(message:string,options?:{level:'warn'}):void;i(name:string,metadata:Record<string,string|number|undefined>):void;S(text:string):string;BM(name:string):string;
 Ca():boolean;rb():boolean;GS:Pick<typeof import('../../../skills/mcpSkills.js'),'fetchMcpSkillsForClient'>&{invalidateMcpSkillsForServer:typeof import('../../../skills/mcpSkills.js')['invalidateMcpSkillsForServer287']};mbe():void;Go(name:string,message:string):void;$o(error:unknown,config:ScopedMcpServerConfig):string;
}
export function createMcpListChanged287<Client extends ConnectedMcpServer=ConnectedMCPServerV2>(ports:McpListChangedPorts287<Client>):(client:Client,publish:(update:ListChangedUpdate287<Client>)=>void,storage?:unknown)=>void
