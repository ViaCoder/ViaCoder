import {createPrintStatusExportMemoryNative287,type PrintControlPorts287} from './statusExportMemoryNative287.js'
import {createOfficialControlClosure287} from './officialControlClosures287.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import stripAnsi from 'strip-ansi'
import {streamRenderedMessages} from '../../utils/exportRenderer.js'
import type {Message} from '../../types/message.js'
import type {ToolUseContext,Tools} from '../../Tool.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'

/** Existing render owner, one native dispatcher and one closure graph per print run. */
export function createRecoveredStatusExportMemoryDispatch287(ports:Omit<PrintControlPorts287,'FA'|'UA'|'importMemory287'>){
 const exportMessagesRenderer287=async(session:ExecutionSession287,messages:Message[],tools:Tools,options:{columns?:number;storageV5?:ToolUseContext['storageV5'];welcomeHeader?:boolean})=>{
  const chunks:string[]=[]
  await streamRenderedMessages(messages,tools,chunk=>{chunks.push(stripAnsi(chunk))},{session,...options})
  return chunks.join('')
 }
 const recovered=createOfficialControlClosure287((file,name)=>getPrintHostSource287(file,name),{exportMessagesRenderer287})
 const statusModule287=Object.freeze({get buildStatusSections(){return recovered.buildStatusSections}})
 const exportModule287=Object.freeze({get exportConversation(){return recovered.exportConversation}})
 const memoryModule287=Object.freeze({get buildMemoryDialogResponse(){return recovered.buildMemoryDialogResponse}})
 // Keep the original host instance and its live accessor properties (notably pr).
 const runtimePorts=Object.defineProperties({},Object.getOwnPropertyDescriptors(ports)) as PrintControlPorts287
 Object.defineProperties(runtimePorts,{
  FA:{value:()=>{void statusModule287.buildStatusSections;return statusModule287},enumerable:true},
  UA:{value:()=>{void exportModule287.exportConversation;return exportModule287},enumerable:true},
  importMemory287:{value:async()=>{void memoryModule287.buildMemoryDialogResponse;return memoryModule287},enumerable:true},
 })
 return createPrintStatusExportMemoryNative287(runtimePorts)
}
