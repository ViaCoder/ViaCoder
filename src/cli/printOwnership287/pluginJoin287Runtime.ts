import {createPrintPluginJoinNative287,type PrintPluginJoin287} from './pluginJoin287Native.js'
import {createPrintLexicalPorts287} from './requesterBridgeRuntime287.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import proof from './pluginJoin287Provenance.json' with {type:'json'}

/** Live descriptors, including Ms, belong to the existing print caller.
 * Only the original print-local startup closure is allocated here; plugin
 * configs, installation, session sync, IO and the writer retain their owners. */
export function createPrintPluginJoin287(caller:object):PrintPluginJoin287 {
 const lexical=createPrintLexicalPorts287(caller)
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.bindings
 const ports=new Proxy(caller,{
  has(target,name){return typeof name==='string'&&(Object.hasOwn(target,name)||Object.hasOwn(bindings,name)||name in lexical)},
  get(target,name,receiver){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(target,name))return Reflect.get(target,name,receiver)
   if(typeof name==='string'&&Object.hasOwn(bindings,name)){
    const source=bindings[name]!
    return getPrintHostSource287(source.file,source.name)
   }
   return Reflect.get(lexical,name)
  },
  set(target,name,value,receiver){
   if(!Object.hasOwn(target,name))throw Error('Original plugin join mutable cell missing '+String(name))
   return Reflect.set(target,name,value,receiver)
  },
 })
 const join=createPrintPluginJoinNative287(ports)
 // gb reads Eu from this exact object; no lookup into another namespace and
 // no wrapper/default-success promise. Concurrent callers share raw Eu's za.
 Object.defineProperty(caller,'Eu',{value:join.Eu,enumerable:true})
 return join
}
