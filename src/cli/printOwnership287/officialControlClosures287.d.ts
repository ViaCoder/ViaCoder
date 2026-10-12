import type {StatusModule287,ExportModule287,MemoryModule287} from './statusExportMemoryNative287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {ToolUseContext,Tools} from '../../Tool.js'
import type {Message} from '../../types/message.js'
export interface OriginalControlClosures287 {
 buildStatusSections:StatusModule287['buildStatusSections']
 exportConversation:ExportModule287['exportConversation']
 buildMemoryDialogResponse:MemoryModule287['buildMemoryDialogResponse']
}
export declare function createOfficialControlClosure287(canonical:(file:string,exportName:string)=>unknown,ports:{exportMessagesRenderer287(session:ExecutionSession287,messages:Message[],tools:Tools,options:{columns?:number;storageV5?:ToolUseContext['storageV5'];welcomeHeader?:boolean}):Promise<string>}):OriginalControlClosures287
