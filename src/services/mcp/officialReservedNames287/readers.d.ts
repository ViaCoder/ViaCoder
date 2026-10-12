import type {ScopedMcpServerConfig} from '../types.js'
export type McpReservedNameRefusal287={name:string;scope:string}
export function readMcpReservedNames287():{
 Axo(host?:object):McpReservedNameRefusal287[];
 Txo(first:readonly McpReservedNameRefusal287[],second:readonly McpReservedNameRefusal287[]):McpReservedNameRefusal287[];
 vxo(refusal:McpReservedNameRefusal287,host?:object):boolean;
 T6n<T extends {scope:string}>(servers:Record<string,T>,cliOwned:Record<string,ScopedMcpServerConfig>):{servers:Record<string,T>;refused:McpReservedNameRefusal287[]};
 Tan(name:string):boolean;Swe(configs:Record<string,ScopedMcpServerConfig>):boolean;
 Cxo(clients:readonly {name:string;config:ScopedMcpServerConfig}[]):boolean
}
export function readMcpBuiltinName287():(name:string)=>boolean
