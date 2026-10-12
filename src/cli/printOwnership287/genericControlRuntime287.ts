import {getPrintHostSource287} from './publicHostRuntime287.js'
import {createPrintLexicalPorts287} from './requesterBridgeRuntime287.js'
import {createOriginalGenericContext287,createOriginalGenericDispatch287,type OriginalGenericCallerPorts287,type GenericDispatchPorts287} from './genericCallerNative287.js'
import {installOriginalPrepareTurn287,type OriginalPrepareHost287,type OriginalPreparePorts287} from './prepareTurnNative287.js'
/** Every original method executes on the same existing lifecycle object. */
export function installPrintPrepareTurn287<T extends object>(lifecycle:T,host:OriginalPrepareHost287){
 for(const key of ['drain','messageQueue','session','stopping','terminalShutdown'] as const){
  if(Object.hasOwn(lifecycle,key)){if(Reflect.get(lifecycle,key)!==host[key])throw Error('Prepare turn owner identity changed '+key)}
  else Object.defineProperty(lifecycle,key,{value:host[key],enumerable:true})
 }
 const source=<K extends keyof OriginalPreparePorts287>(name:K,file:string):OriginalPreparePorts287[K]=>{
  const value=getPrintHostSource287(file,name);if(typeof value!=='function')throw Error('Original prepare source is not callable '+file+':'+name);return value as OriginalPreparePorts287[K]
 }
 // The source getter's selected-local ABI is deliberate, unlike raw ESM aliases.
 return installOriginalPrepareTurn287(lifecycle as T&OriginalPrepareHost287,{
  Xf:source('Xf','chunk-mphp7acd.js'),kHo:source('kHo','chunk-09m4fzsj.js'),
  AHo:source('AHo','chunk-09m4fzsj.js'),THo:source('THo','chunk-09m4fzsj.js'),
  ne:source('ne','chunk-h7xaj2fc.js'),d:source('d','chunk-amhtwhch.js'),
 })
}
/** Main supplies complete current hI locals, including Confucius's real MCP
 * lanes. No context fields are optional and no partial context is cast whole. */
export function createPrintGenericControl287(caller:OriginalGenericCallerPorts287,respond:GenericDispatchPorts287['Qu'],schedule:GenericDispatchPorts287['Cr']){
 const $a=createOriginalGenericContext287(caller)
 const read=<K extends 'Yso'|'Kso'|'kxn'>(name:K):GenericDispatchPorts287[K]=>{
  const value=getPrintHostSource287('chunk-1b45yw62.js',name)
  if(typeof value!=='function')throw Error('Original generic source is not callable '+name)
  return value as GenericDispatchPorts287[K]
 }
 const dispatch=createOriginalGenericDispatch287({$a,Yso:read('Yso'),Kso:read('Kso'),kxn:read('kxn'),Cr:schedule,Qu:respond})
 return {context:$a,dispatch}
}
// Existing lexical provider remains available to Main for source-only helpers;
// actual mutable hI locals must be supplied by the existing print caller.
export const genericSourceLexical287=createPrintLexicalPorts287
