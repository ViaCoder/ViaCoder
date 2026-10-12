import type {MCPServerConnection,ScopedMcpServerConfig} from '../../services/mcp/types.js'
import type {Tool} from '../../Tool.js'
import type {Command} from '../../commands.js'
/** Every cell is the actual existing hI cell, descriptors include Qt/Un/Ln setters. */
export interface OriginalSdkTogglePorts287{
 M:Record<string,ScopedMcpServerConfig>;Qt:MCPServerConnection[];Un:Tool[];Ln:Command[]
 pn:Set<string>;Js:Set<string>;Wo:{closeFor(name:string):Promise<void>}
 ra(configs:Record<string,ScopedMcpServerConfig>,name:string):ScopedMcpServerConfig|undefined
 KV(tools:Tool[],name:string):Tool[];Jte(commands:Command[],name:string):Command[]
 ze():Promise<void>;te(name:string,message:string):void
}
export interface OriginalSdkToggle287{wn(name:string):Promise<void>;Tr(name:string):Promise<MCPServerConnection|undefined>}
export function createOriginalSdkToggle287(ports:OriginalSdkTogglePorts287):OriginalSdkToggle287
