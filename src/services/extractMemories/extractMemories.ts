/** Complete original 287 host-scoped memory extraction lifecycle. */
import {getExecutionSession287} from '../context/execution287.js'
import {createAutoDreamCanUseTool} from '../autoDream/autoDreamToolPolicy.js'
import {getExtractMemories287,toExtractMemoryContext287,getExtractMemoryProductionPorts287} from './officialExtractMemories287/bindings.js'
import type {AppendMemorySaved287} from './officialExtractMemories287/native.js'
import type {REPLHookContext} from '../../utils/hooks/postSamplingHooks.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'

/** Same full original PHn permission and shared read fence, not a second owner. */
export function createAutoMemCanUseTool(memoryDir:string):CanUseToolFn {
 return createAutoDreamCanUseTool(memoryDir,undefined)
}
export function initExtractMemories(host:object=getExecutionSession287().host):void {getExtractMemories287().Zmr(host)}
export async function executeExtractMemories(context:REPLHookContext,appendSystemMessage?:AppendMemorySaved287):Promise<void>{
 await getExtractMemories287().Qos(toExtractMemoryContext287(context),appendSystemMessage)
}
export function drainPendingExtraction(host?:object,timeoutMs?:number):Promise<void>
export function drainPendingExtraction(timeoutMs?:number):Promise<void>
export async function drainPendingExtraction(hostOrTimeout?:object|number,timeoutMs?:number):Promise<void>{
 const host=typeof hostOrTimeout==='object'?hostOrTimeout:getExecutionSession287().host
 await getExtractMemories287().Zos(host,typeof hostOrTimeout==='number'?hostOrTimeout:timeoutMs)
}
export function isLaptopExtractDispatched287(host:object=getExecutionSession287().host):boolean{return getExtractMemories287().Xos(host)}
export function isLaptopExtractSync287(host:object=getExecutionSession287().host):boolean{return getExtractMemories287().Jos(host)}
/** Full original A2e, including valid post-turn configuration admission. */
export function isExtractModeActive287():boolean{return getExtractMemoryProductionPorts287().A2e()}
export function getPostTurnMemoryConfig287():{
 instruction:string;everyNTurns:number;maxTurns:number;idleFlushSeconds:number;staleNote:boolean;sync:boolean|undefined;
 extractTransport:'tools'|'text'|'tools_cached';thinkingStrip:'window'|'last5'|'none';
 roleLineScan:{attachments:boolean;instructionFiles:boolean;firstWindow:'full'|'ignore_session_start_blocks'};
 personFilesWritable:boolean;personFilesTypedEvidence:'off'|'cited_turn'|'contiguous';personFilesTypedStampedOnly:boolean;
 personFilesCitedSharedWordRefused:boolean;personFilesCiteSinceFloor:boolean
}|null{return getExtractMemoryProductionPorts287().v2e()}
