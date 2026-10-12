import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
import type {AppState} from '../../state/AppState.js'
import type {ControlMcpConnection} from '../control/mcpConnectionPool.js'
import type {ToolUseContext,Tools} from '../../Tool.js'
import type {Message} from '../../types/message.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
export interface StatusModule287 {buildStatusSections(input:{credentials:ToolUseContext['credentials'];mainLoopModel:string;mcp:Omit<AppState['mcp'],'clients'>&{clients:ControlMcpConnection[]};permissionMode:AppState['toolPermissionContext']['mode']}):Promise<unknown[]>}
export interface ExportModule287 {exportConversation(input:{session:ExecutionSession287;messages:Message[];tools:Tools;storageV5:ToolUseContext['storageV5']}):Promise<Record<string,unknown>>}
export interface MemoryModule287 {buildMemoryDialogResponse(input:Record<string,unknown>):Promise<Record<string,unknown>>}
export interface PrintControlPorts287 {e:ExecutionSession287;I:Pick<ToolUseContext,'credentials'|'storageV5'>;pr:unknown[];qm(session:ExecutionSession287):boolean;FA:()=>StatusModule287;UA:()=>ExportModule287;qo():string|undefined;rt():string;s2(agents:unknown[]):unknown[];importMemory287():Promise<MemoryModule287>;v():AppState;Co():ControlMcpConnection[];Cr(work:()=>Promise<void>):void;Ze(message:SDKControlRequest,response?:Record<string,unknown>):void;We(message:SDKControlRequest,text:string):void;nr(message:SDKControlRequest,subtype:string,error:unknown):void;projectError(redacted:boolean,subtype:string,error:unknown):{error:string};cu():{messages:Message[];tools:Tools}}
export declare function createPrintStatusExportMemoryNative287(ports:PrintControlPorts287):(message:SDKControlRequest)=>Promise<boolean>
