import type {ConnectedMCPServerV2,ConnectedMCPServer,FailedMCPServer,PendingMCPServer,ScopedMcpServerConfig} from '../types.js'
import type {SelectedMcpDiscovery} from '../v2Production.js'
import type {Notification} from '../../../context/notifications.js'
export type RetryResult287=Extract<SelectedMcpDiscovery,{generation:'v2'}>
export type RetryState287=PendingMCPServer|FailedMCPServer|ConnectedMCPServerV2
export type RetryClock287=Pick<import('../../../ink/officialInputClock287/native.js').NativeInkClock287,'now'|'setTimeout'>
export interface McpRetryPorts287 {
 to:{current:Map<string,number>};TX:3;rTe(state:FailedMCPServer):boolean;eft(attempt:number):number;
 te(name:string,message:string):void;Go(name:string,message:string):void;t(message:string):void;
 Do(state:RetryState287):void;Ct:{current:Map<string,()=>void>};Ro:{current:Set<string>};gr():number;
 Ut:RetryClock287;Io(name:string):boolean;Ai():boolean;If(name:string,config:ScopedMcpServerConfig):'managed-policy'|'project-approval'|null;
 Ike(name:string):void;qI(reason:'managed-policy'|'project-approval'):{error:string;errorCode:string};
 Ql():{clearServerCache(name:string,config:ScopedMcpServerConfig):Promise<void>;reconnectMcpServerImpl(name:string,config:ScopedMcpServerConfig,storage?:unknown,credentials?:unknown):Promise<RetryResult287>};
 Se?:unknown;_e?:unknown;qo(result:RetryResult287):void;$o(error:unknown,config:ScopedMcpServerConfig):string;
 $Ht(state:FailedMCPServer,remote:(name:string)=>boolean,feature:(name:string)=>boolean):boolean;
 lHt(name:string):boolean;aHt(name:string):boolean;yN(feature:string,count:number):void;
 ww(config:ScopedMcpServerConfig):boolean;ttr:string;Wr(name:string):string;dfo(type:string):string;mJ:5;No(notification:Notification):void;
}
export function createMcpInitialRetry287(ports:McpRetryPorts287):(state:FailedMCPServer)=>void
export function createMcpCloseRetry287(ports:McpRetryPorts287,client:ConnectedMCPServerV2):()=>void

/** Same original retry closures, using an actual legacy connection/result. */
export interface LegacyMcpRetryPorts287 extends Omit<McpRetryPorts287,'Do'|'Ql'|'qo'> {
 Do(state:PendingMCPServer|FailedMCPServer|ConnectedMCPServer):void;
 Ql():{clearServerCache:McpRetryPorts287['Ql'] extends ()=>infer M ? M extends {clearServerCache:infer F}?F:never:never;reconnectMcpServerImpl:import('../officialLegacyLifecycle287/native.js').LegacyMcpLifecycleRoots287['reconnectMcpServerImpl']};
 qo(result:import('../officialLegacyLifecycle287/native.js').LegacyMcpReconnectResult287):void;
}
export function createMcpInitialRetry287(ports:LegacyMcpRetryPorts287):(state:FailedMCPServer)=>void
export function createMcpCloseRetry287(ports:LegacyMcpRetryPorts287,client:ConnectedMCPServer):()=>void
