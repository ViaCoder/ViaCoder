import type {ConnectedMCPServer,FailedMCPServer,NeedsAuthMCPServer,ScopedMcpServerConfig,ServerResource,ServerResourceTemplate} from '../types.js'
import type {Tool} from '../../../Tool.js'
import type {Command} from '../../../commands.js'
import type {ListChangedRegistration287} from '../officialListChanged287/native.js'
export type LegacyMcpReconnectResult287={client:ConnectedMCPServer|NeedsAuthMCPServer|FailedMCPServer;tools:Tool[];commands:Command[];resources?:ServerResource[];resourceTemplates?:ServerResourceTemplate[]}
export interface LegacyMcpLifecycleRoots287 {
 onMcpToolListChanged:ListChangedRegistration287<ConnectedMCPServer>;
 onMcpPromptListChanged:ListChangedRegistration287<ConnectedMCPServer>;
 onMcpResourceListChanged:ListChangedRegistration287<ConnectedMCPServer>;
 getToolsListErrorForResult(result:unknown):unknown;
 reconnectMcpServerImpl(name:string,config:ScopedMcpServerConfig,storage?:unknown,credentials?:unknown):Promise<LegacyMcpReconnectResult287>;
}
export function createLegacyMcpLifecycleRoots287(ports:Record<string,unknown>):LegacyMcpLifecycleRoots287
