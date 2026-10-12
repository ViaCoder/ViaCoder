import type {AppState} from '../../../state/AppState.js'
import type {ConnectedMCPServerV2,MCPServerConnection,ScopedMcpServerConfig} from '../types.js'
import type {CachedSettlement287,NativeModernConnection287} from '../officialConnected287/native.js'
export type PrintMcpClient287=NativeModernConnection287|Exclude<MCPServerConnection,{type:'v2-connected'}>
export type PrintMcpState287=Omit<AppState['mcp'],'clients'>&{clients:PrintMcpClient287[];suppressedPluginMcpServers?:string[];suppressedClaudeAiConnectors?:string[]}
export type PrintMcpResult287=Omit<CachedSettlement287,'attemptEpoch'|'client'>&{client:CachedSettlement287['client']|ConnectedMCPServerV2;attemptEpoch?:number}
export interface PrintMcpStateOwner287 {
 getClients():PrintMcpClient287[];getSuppressedPluginServers():string[];
 applyMcpUpdate(update:(state:PrintMcpState287)=>PrintMcpState287):void;
 signal?:AbortSignal;refusesBlockedServers?:boolean
}
export interface PrintMcpClientModule287 {
 areMcpConfigsEqual(a:ScopedMcpServerConfig,b:ScopedMcpServerConfig):boolean;
 getMcpToolsCommandsAndResources(callback:(result:PrintMcpResult287)=>void,configs:Record<string,ScopedMcpServerConfig>,storageV5?:unknown,credentials?:unknown,knownListings?:Record<string,Record<string,unknown>[]>):Promise<void>;
 discardMemoizedConnectResult(name:string,config:ScopedMcpServerConfig):Promise<boolean>;
 awaitEachWithDeadline(promises:readonly Promise<unknown>[],deadlineMs:number):Promise<number>;
 detachAndCloseConnection(client:PrintMcpClient287):Promise<void>;
 dropDiscoveryEntry(name:string,config:ScopedMcpServerConfig):Promise<void>;
 clearServerCache(name:string,config:ScopedMcpServerConfig):Promise<void>;
 disposeServerConnectionDetached(name:string,config:ScopedMcpServerConfig,promise?:Promise<unknown>):void
}
// Scheduling-only ecr flag; not part of persisted MCP config/CLI scope schema.
export type PrintMcpScheduledConfig287=ScopedMcpServerConfig&{alwaysLoad?:boolean}
export interface PrintMcpStartup287 {
 regularMcpConfigs:Record<string,PrintMcpScheduledConfig287>;claudeaiConfigPromise:Promise<Record<string,ScopedMcpServerConfig>>;state:PrintMcpStateOwner287;
 storageV5?:unknown;credentials?:unknown;knownListings?:Record<string,Record<string,unknown>[]>;dialInConnect?:boolean;onDialStart?:()=>void
}
export interface PrintMcpScheduler287 {
 eio(options:PrintMcpStartup287):{connect():Promise<void>};
 ecr(options:{configs:Record<string,PrintMcpScheduledConfig287>;label:string;nonBlocking:boolean;state:PrintMcpStateOwner287;storageV5?:unknown;credentials?:unknown;knownListings?:Record<string,Record<string,unknown>[]>;dialInConnect?:boolean;onDialStart?:()=>void}):Promise<void>;
 k(configs:Record<string,ScopedMcpServerConfig>,label:string,state:PrintMcpStateOwner287,defer?:boolean,storageV5?:unknown,credentials?:unknown,knownListings?:Record<string,Record<string,unknown>[]>,onDialStart?:()=>void):Promise<void>[];
 xxn(state:PrintMcpStateOwner287,result:PrintMcpResult287):'applied'|'refused'|'superseded'|'dropped';
 Pxn(configs:Record<string,ScopedMcpServerConfig>,state:PrintMcpStateOwner287):[string,ScopedMcpServerConfig][];
 bvt(configs:Record<string,ScopedMcpServerConfig>,state:PrintMcpStateOwner287,storageV5?:unknown,publish?:(result:PrintMcpResult287)=>void,initialSettled?:Promise<number>):Promise<void>;
 tio(state:PrintMcpStateOwner287,storageV5?:unknown,credentials?:unknown):{mounted:Promise<'mounted'|'superseded'>;settled:Promise<void>}
}
export function createMcpPrintScheduler287(ports:Record<string,unknown>&{getClientModule():PrintMcpClientModule287}):PrintMcpScheduler287
