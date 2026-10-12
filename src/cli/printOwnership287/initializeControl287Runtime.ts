import {randomUUID} from 'node:crypto'
import {createInitializeControlNative287,type InitializeControlNative287} from './initializeControl287Native.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import type {PrintInterruptSweepNative287} from './interruptSweepNative.js'
import bindings from './initializeControl287Bindings.json' with {type:'json'}
import provenance from './initializeControl287Provenance.json' with {type:'json'}

/** Only lexical source routing. Business state stays on the existing canonical
 * session/store/IO and interrupt-sweep owners, never in this empty Proxy. */
export function createPrintInitializeControl287(caller:Pick<PrintInterruptSweepNative287,'declarePerTaskStopAffordance'>):InitializeControlNative287 {
 const sources:Readonly<Record<string,{file:string;name:string}>>=bindings
 const chrome=provenance.dynamicTransport.receipt
 const adapters={
  eo:randomUUID,
  LZr:caller.declarePerTaskStopAffordance,
  // Preserve import's rejection timing and complete original Cp then/catch.
  async loadInitializeModule287(file:string){
   if(file!==chrome.file)throw Error('Unexpected initialize source module '+file)
   return {claudeInChromeDefaultForHost:getPrintHostSource287(chrome.file,chrome.name)}
  },
 }
 const ports=new Proxy(Object.create(null) as object,{
  has(_target,name){return typeof name==='string'&&(Object.hasOwn(adapters,name)||Object.hasOwn(sources,name))},
  get(_target,name){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(adapters,name))return Reflect.get(adapters,name,adapters)
   if(typeof name==='string'&&Object.hasOwn(sources,name)){
    const source=sources[name]!
    return getPrintHostSource287(source.file,source.name)
   }
   throw Error('Original initialize lexical source missing '+String(name))
  },
  set(_target,name){throw Error('Initialize has no mutable lexical business cell '+String(name))},
 })
 return createInitializeControlNative287(ports)
}
