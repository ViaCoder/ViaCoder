import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {createPrintPublicSubscriptions287,type PrintPublicPorts287} from './publicHostNative.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {Message} from '../../types/message.js'
import type {SDKMessage} from '../../entrypoints/sdk/coreTypes.js'
import {drainSdkEvents} from '../../utils/sdkEventQueue.js'
export function createPrintSdkEventPump287(emit:(frame:ReturnType<typeof drainSdkEvents>[number])=>void):{close():void} {
 const Wh=getPrintHostSource287('chunk-xapeakym.js','Wh') as (host:{drain:typeof drainSdkEvents;emit:typeof emit})=>{close():void}
 return Wh({drain:drainSdkEvents,emit})
}
/** Original ey returns the whole Zh controller. This view creates neither a
 * second suggestion cache nor an extra suggestion-generation task. */
export interface PrintSuggestionController287 {
 setPaused(value:boolean):void;
 onCommand(command:QueuedCommand,input:QueuedCommand['value']):void;
 afterResult(command:QueuedCommand):void;
 emitPending():void;discard():void;abort():void;
 settle():Promise<void>|undefined;
}
export function createPrintSuggestionController287(host:{
 emit(frame:SDKMessage):void;promptSuggestions():boolean|undefined;
 shuttingDown():boolean;holdsResults():boolean;
 messages:Message[];getAppState():import('../../state/AppState.js').AppState;
}):PrintSuggestionController287 {
 const ey=getPrintHostSource287('chunk-xapeakym.js','ey') as (configuration:typeof host)=>PrintSuggestionController287
 return ey(host)
}
/** Canonical source lookup. It neither creates a module owner nor supplies an
 * undefined/default-success port. Two namespaces already reuse original roots. */
export function getPrintHostSource287(file:string,name:string):unknown {
 const lifecycle=getOriginalModsLifecycle287()
 let module:Readonly<Record<string,unknown>>|undefined
 let canonicalError:unknown
 try {module=lifecycle.clearSourceModule287(file)}catch(error){canonicalError=error}
 if(module!==undefined&&module!==null&&Object.hasOwn(module,name))return module[name]
 module=getOutsideHookRuntime287().sourceModule(file)
 if(module===undefined||module===null)throw Error('Original public print namespace missing '+file+':'+name+(canonicalError?' ('+String(canonicalError)+')':''))
 if(!Object.hasOwn(module,name))throw Error('Original public print source missing '+file+':'+name)
 return module[name]
}
export function getPrintUiHostGate287():boolean {
 const gate=getPrintHostSource287('chunk-64z3xwk8.js','LEt')
 if(typeof gate!=='function')throw Error('Original print UI gate is not callable')
 return gate()
}
export function installPrintPublicSubscriptions287(host:Pick<PrintPublicPorts287,'I'|'r'|'Wi'|'Q'|'v'>){
 const rows={h5e:['chunk-09m4fzsj.js','h5e'],Gin:['chunk-mphp7acd.js','Gin'],fi:['chunk-xapeakym.js','fi'],wC:['chunk-xapeakym.js','wC'],_C:['chunk-xapeakym.js','_C'],rk:['chunk-xapeakym.js','rk'],IZo:['chunk-mphp7acd.js','IZo'],P6n:['chunk-mphp7acd.js','P6n'],EIr:['chunk-mphp7acd.js','EIr'],R4r:['chunk-xep95vq1.js','R4r'],x4r:['chunk-xep95vq1.js','x4r'],P4r:['chunk-xep95vq1.js','P4r'],I4r:['chunk-xep95vq1.js','I4r'],Xy:['chunk-xapeakym.js','Xy']} as const
 const source=Object.fromEntries(Object.entries(rows).map(([name,[file,original]])=>[name,getPrintHostSource287(file,original)])) as Pick<PrintPublicPorts287,keyof typeof rows>
 return createPrintPublicSubscriptions287({...source,...host,qz:(require("../remoteIO.js") as typeof import("../remoteIO.js")).RemoteIO,LEt:getPrintUiHostGate287})
}
