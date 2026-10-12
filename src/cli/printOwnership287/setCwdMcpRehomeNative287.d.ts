import type { AppState } from '../../state/AppState.js'
import type { Tool } from '../../Tool.js'
import type { Command } from '../../commands.js'
import type { MCPServerConnection, ScopedMcpServerConfig, ServerResource, ServerResourceTemplate } from '../../services/mcp/types.js'
import type {SetCwdAppState287,SetCwdDynamicMcpState287,SetCwdMcpRehomeFrame287} from './setCwdMcpRehomeRuntime287.js'
import type {PrintMcpClient287} from '../../services/mcp/officialPrintScheduler287/native.js'

export type SetCwdMcpDiscovery287={client:PrintMcpClient287;tools:Tool[];commands:Command[];resources?:ServerResource[];resourceTemplates?:ServerResourceTemplate[];attemptEpoch?:number}
export interface SetCwdMcpRehomePorts287 {
 yn():{
  areMcpConfigsEqual(a:ScopedMcpServerConfig,b:ScopedMcpServerConfig):boolean
  disposeServerConnectionDetached(name:string,config:ScopedMcpServerConfig):void
  reconnectMcpServerImpl(name:string,config:ScopedMcpServerConfig,storageV5?:unknown,credentials?:unknown):Promise<SetCwdMcpDiscovery287>
  reconnectMcpServerDistrusted(name:string,config:ScopedMcpServerConfig,storageV5?:unknown,credentials?:unknown):Promise<SetCwdMcpDiscovery287>
  inertReconnectShape(name:string,config:ScopedMcpServerConfig):{client:PrintMcpClient287}
 }
 Yn:Record<string,ScopedMcpServerConfig>
 Jlr(name:string,configs:Record<string,ScopedMcpServerConfig>,row:ScopedMcpServerConfig|undefined,discover:(name:string)=>ScopedMcpServerConfig|null):ScopedMcpServerConfig|null|undefined
 b2(name:string):ScopedMcpServerConfig|null
 Lt:SetCwdDynamicMcpState287
 v():SetCwdAppState287
 R(update:(state:SetCwdAppState287)=>SetCwdAppState287):unknown
 uo:Map<string,object>
 gr():number
 zR():boolean
 I:{storageV5?:unknown;credentials?:unknown}
 kie(stores:{getAppState():SetCwdAppState287;setAppState: SetCwdMcpRehomeFrame287['setAppState'];getDynamicMcpState():SetCwdDynamicMcpState287;setDynamicMcpState:SetCwdMcpRehomeFrame287['setDynamicMcpState']},name:string,result:SetCwdMcpDiscovery287):'applied'|'superseded'|'dropped'
 h3e(config:ScopedMcpServerConfig,attemptEpoch:number|undefined):boolean
 ns(clients:Extract<PrintMcpClient287,{type:'connected'}>[]):void
 Rp(client:Extract<PrintMcpClient287,{type:'connected'}>,queue:unknown):void
 Q:unknown
 Kt(name:string):string
}
export interface SetCwdMcpRehomeNative287 {
 Ad(name:string,config:ScopedMcpServerConfig):Promise<PrintMcpClient287>
 Ni(name:string,config:ScopedMcpServerConfig):void
 os(name:string,config:ScopedMcpServerConfig,options:{distrust:boolean}):Promise<SetCwdMcpDiscovery287>
 ji(name:string,result:SetCwdMcpDiscovery287):PrintMcpClient287
 is(name:string):ScopedMcpServerConfig|null|undefined
 ss():Record<string,ScopedMcpServerConfig>
 Xs(name:string,result:SetCwdMcpDiscovery287):'applied'|'superseded'|'dropped'
}
export declare function createSetCwdMcpRehomeNative287(ports:SetCwdMcpRehomePorts287):SetCwdMcpRehomeNative287
