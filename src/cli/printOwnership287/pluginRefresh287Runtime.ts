import {createPrintPluginRefreshNative287,type PrintPluginRefresh287} from './pluginRefresh287Native.js'
import {createPrintLexicalPorts287} from './requesterBridgeRuntime287.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {getMcpConnectedProducer287,getMcpClientModule287} from '../../services/mcp/connectedProducer287.js'
import {resolveMcpSdkGeneration} from '../../services/mcp/v2Lifecycle.js'
import {refreshActivePlugins} from '../../utils/plugins/refresh.js'
import {getCommandDiscovery287} from '../../utils/commandDiscovery287.js'
import {selectNonInteractiveCommands} from '../../commands/noninteractive/index.js'
import proof from './pluginRefresh287Provenance.json' with {type:'json'}

/** No refresh/cache/client owner is constructed here. Original print-local
 * counters and jp own the existing caller's Cs serialized apply and pools. */
export function createPrintPluginRefresh287(caller:object):PrintPluginRefresh287 {
 const lexical=createPrintLexicalPorts287(caller)
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.bindings
 const adapters={
  // Preserve the established C non-Ink adapters, without dropping storage.
  yp:async(cwd:string,storage?:unknown)=>selectNonInteractiveCommands(await getCommandDiscovery287().commands(cwd,storage)),
  NO:refreshActivePlugins,bp:process.cwd,yn:()=>{
   const owner=getMcpConnectedProducer287()
   const modern=resolveMcpSdkGeneration()==='v2'
   return {...getMcpClientModule287(),seedMcpIdentityCheck:owner.sourceModule(modern?'chunk-amg94xhm.js':'chunk-fdjgzr8v.js')[modern?'tf':'wd']}
  },
 }
 const ports=new Proxy(caller,{
  has(target,name){return typeof name==='string'&&(Object.hasOwn(target,name)||Object.hasOwn(adapters,name)||Object.hasOwn(bindings,name)||name in lexical)},
  get(target,name,receiver){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(target,name))return Reflect.get(target,name,receiver)
   if(Object.hasOwn(adapters,name))return Reflect.get(adapters,name)
   if(typeof name==='string'&&Object.hasOwn(bindings,name)){
    const source=bindings[name]!
    // jso and sGe must use the connected producer's selected namespace:
    // restoring another instance would duplicate its discovery/client cache.
    return source.file==='chunk-1b45yw62.js'
     ?getMcpConnectedProducer287().sourceModule(source.file)[source.name]
     :getPrintHostSource287(source.file,source.name)
   }
   return Reflect.get(lexical,name)
  },
  set(target,name,value,receiver){
   if(!Object.hasOwn(target,name))throw Error('Original plugin refresh mutable cell missing '+String(name))
   return Reflect.set(target,name,value,receiver)
  },
 })
 return createPrintPluginRefreshNative287(ports)
}
