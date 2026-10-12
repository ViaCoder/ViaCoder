import {isDeepStrictEqual} from 'node:util'
import {createPrintFlagChannelControlsNative287} from './flagChannelControls287Native.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {applyAutoCompactFlagState287} from '../../state/autoCompactState287.js'
import type {AppState} from '../../state/AppStateStore.js'
import bindings from './flagChannelControls287Bindings.json' with {type:'json'}
/** Only a lexical view over existing print/store/IO/queue/forwarding owners. */
export function createPrintFlagChannelControls287(caller:object&{
 R(updater:(state:AppState)=>AppState):void;
}){
 let native:ReturnType<typeof createPrintFlagChannelControlsNative287>
 const adapters={
  QE:isDeepStrictEqual,
  // Complete original yv performs merge/rename/null deletion/no-op/notify logic.
  // Retain the existing original autocompact state projection on the same store;
  // invalid inputs never reach this seam and unadmitted forwarding stays blocked.
  yv:(settings:Record<string,unknown>,readFast:()=>boolean)=>{
   native.sourceApplySettings287(settings,readFast)
   applyAutoCompactFlagState287(settings,caller.R)
  },
 }
 const ports=new Proxy(Object.create(null),{
  has(_target,name){return typeof name==='string'&&(Object.hasOwn(caller,name)||Object.hasOwn(adapters,name)||Object.hasOwn(bindings,name))},
  get(_target,name){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(caller,name))return Reflect.get(caller,name,caller)
   if(Object.hasOwn(adapters,name))return Reflect.get(adapters,name)
   if(typeof name==='string'&&Object.hasOwn(bindings,name)){
    const source=(bindings as Record<string,{file:string;name:string}>)[name]!
    return getPrintHostSource287(source.file,source.name)
   }
   throw Error('Original flag/channel lexical caller missing '+String(name))
  },
  set(_target,name,value){
   if(!Object.hasOwn(caller,name))throw Error('Original flag/channel mutable cell missing '+String(name))
   return Reflect.set(caller,name,value,caller)
  },
 })
 native=createPrintFlagChannelControlsNative287(ports)
 return native
}
