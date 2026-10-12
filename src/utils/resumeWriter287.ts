import {getOriginalModsLifecycle287} from './hooks/modelSwitch287/lifecycleRuntime.js'
import {installOriginalWriterFields287} from './officialResumeController287/writerFields.js'
import type {TranscriptWriterHealth287} from './sessionStorage.js'
import type {LogOption} from '../types/logs.js'
import type {Signal} from './signal.js'
export interface OriginalWriterStore287 {
 sessionMessages(id:string):Promise<Set<import('node:crypto').UUID>>
 clearSessionMessagesCache():void
 primeSessionMessagesCache(id:string,uuids:Iterable<string>):void
 project:object|null;getSessionId():string;writerHealth:TranscriptWriterHealth287;sessionTitleChanged:Signal;sessionAgentNameChanged:Signal
}
export interface MetadataPlan287 {sessionFile:string;entries:Record<string,unknown>[];stamps:{written?:boolean;inFlight?:boolean}[]}
export interface OriginalWriterPrototype287 {
 insertMessageChain(this:object,messages:import('../types/message.js').Message[],sidechain:boolean,agentId?:string,parent?:import('node:crypto').UUID|null,team?:{teamName?:string;agentName?:string},sessionId?:string,foreign?:boolean,storage?:unknown,pulled?:string|null,rows?:unknown):Promise<void>
 appendEntry(this:object,entry:import('../types/logs.js').Entry,sessionId?:string,foreign?:boolean,storage?:unknown,pulled?:string|null,rows?:unknown):Promise<void>
 planReAppendSessionMetadata(this:object,tail:string,skipTitle?:boolean,skipDedupe?:boolean,storage?:unknown,forceStamps?:boolean):MetadataPlan287|null
 reAppendSessionMetadata(this:object,skipTitle?:boolean,skipDedupe?:boolean,forceStamps?:boolean):void
 reAppendSessionMetadataAsync(this:object,skipTitle?:boolean,skipDedupe?:boolean,storage?:unknown,useV5?:boolean):Promise<void>
 normalizeLastPrompt(this:object,text:string):string
 flush(this:object):Promise<void>
 sealTornTailSync(this:object,file:string):void
 fireMirror(this:object,file:string,entries:unknown[]):void
}
/** Public writer and reader resolve the same already-installed original
 * namespace as mounted qPe. No local path map or transcript parser. */
export function getOriginalSidechainSource287<T extends (...args:never[])=>unknown>(module:string,name:string):T {
 const source=getOriginalModsLifecycle287().clearLifecycleSource287(module,name)
 if(typeof source!=='function')throw Error('Original sidechain source missing: '+module+':'+name)
 return source as T
}
export function getOriginalWriterStore287():OriginalWriterStore287 {
 const source=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js','Va')
 if(typeof source!=='function')throw Error('Canonical writer Va missing')
 return source() as OriginalWriterStore287
}
/** Whole original js owns construction/host cleanup registration. */
export function getOriginalWriterActor287():object {
 const source=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js','js')
 if(typeof source!=='function')throw Error('Canonical writer js missing')
 return source() as object
}
export function getOriginalWriterPrototype287():OriginalWriterPrototype287 {
 const source=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js','Wfn')
 if(typeof source!=='function')throw Error('Complete original Wfn missing')
 return source.prototype as OriginalWriterPrototype287
}
/** Attach the original class on the sole production writer, preserving all
 * existing C/IO own methods. Never instantiate a separate native Wfn. */
export function installOriginalWriter287(owner:object,prototype:object){
 const source=getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js')
 const original=getOriginalWriterPrototype287()
 if(Object.getPrototypeOf(prototype)!==original)Object.setPrototypeOf(prototype,original)
 if(typeof source.LL!=='number')throw Error('Original writer backstop threshold missing')
 installOriginalWriterFields287(owner,source.LL)
}
export function filterLocalMetadataC287(plan:MetadataPlan287|null):MetadataPlan287|null {
 // Accepted C: AI title is cache-only; inspectable transcript history remains.
 return plan?{...plan,entries:plan.entries.filter(entry=>entry.type!=='ai-title'&&entry.type!=='history-suppression')}:null
}
export type OriginalRestoreMetadata287=Partial<LogOption>
