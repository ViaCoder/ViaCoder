import {createPrintPermissionModeControlNative287,permissionModeControl287Definitions as definitions} from './permissionModeControl287Native.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import bindings from './permissionModeControl287Bindings.json' with {type:'json'}
import type {AppState} from '../../state/AppStateStore.js'
import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'

export interface PrintPermissionModeCaller287 {
 R(update:(previous:AppState)=>AppState):void
 v():AppState
 Ze(frame:SDKControlRequest,response?:Record<string,unknown>):void
 We(frame:SDKControlRequest,error:string,code?:string):void
 Yo(mode:AppState['toolPermissionContext']['mode']):void
}
/** Lexical view over the real print store, IO and work-secret owner. Supplier
 * lookups use the existing canonical graph, never another state factory. */
export function createPrintPermissionModeControl287(caller:PrintPermissionModeCaller287){
 const moduleBindings=bindings as Record<string,Record<string,{file:string;name:string}>>
 return createPrintPermissionModeControlNative287(caller,(file,definition,host)=>new Proxy(Object.create(null),{
  has(_target,name){return typeof name==='string'&&(
   !!host&&Object.hasOwn(host,name)||definitions[file]?.includes(name)||Object.hasOwn(moduleBindings[file]??{},name))},
  get(_target,name){
   if(name===Symbol.unscopables)return undefined
   if(host&&Object.hasOwn(host,name))return Reflect.get(host,name,host)
   if(typeof name!=='string')throw Error('Invalid original permission lexical key '+String(name))
   const binding=moduleBindings[file]?.[name]??{file,name}
   return definitions[binding.file]?.includes(binding.name)
    ?definition(binding.file,binding.name):getPrintHostSource287(binding.file,binding.name)
  },
 }))
}
