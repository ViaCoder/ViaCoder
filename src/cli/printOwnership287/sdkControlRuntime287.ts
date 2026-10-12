import {createPrintSdkSuppliers287,type PrintSdkSuppliers287} from './sdkSuppliers287.js'
import {installPrintSdkFrameNative287,type PrintSdkFrame287} from './sdkFrameNative287.js'
import {getMcpConnectedProducer287,getMcpClientModule287} from '../../services/mcp/connectedProducer287.js'
import {resolveMcpSdkGeneration} from '../../services/mcp/v2Lifecycle.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import type {PrintPluginRefresh287} from './pluginRefresh287Native.js'
import {RemoteIO} from '../remoteIO.js'
import proof from './sdkSuppliersProof287.json' with {type:'json'}
let suppliers287:PrintSdkSuppliers287|undefined
export function getPrintSdkSuppliers287():PrintSdkSuppliers287 {
 if(!suppliers287){
  const receipts=new Map(proof.borrowed.map(row=>[row.file+':'+row.name,row]))
  suppliers287=createPrintSdkSuppliers287(id=>{
   const row=receipts.get(id);if(!row)throw Error('SDK borrow receipt missing '+id)
   if(row.owner==='connected'){
    const slot=getMcpConnectedProducer287().sourceModule(row.file)
    if(!Object.hasOwn(slot,row.name))throw Error('SDK connected source missing '+id)
    return slot[row.name]
   }
   return getPrintHostSource287(row.file,row.name)
  },{})
 }
 return suppliers287
}
/** Install original SDK producer cells once on the existing plugin owner.
 * Original Wo/Xi/Dn and actual Qt/M/Un/Ln/R/IO are not reconstructed. */
export function installPrintSdkControl287(owner:PrintPluginRefresh287,caller:object):PrintSdkFrame287 {
 const suppliers=getPrintSdkSuppliers287(),helpers=suppliers.sources['chunk-xapeakym.js']!
 const adapters={...owner.sdkFrame287,qz:RemoteIO,yn:()=>{
  const modern=resolveMcpSdkGeneration()==='v2',file=modern?'chunk-amg94xhm.js':'chunk-fdjgzr8v.js',name=modern?'gf':'Fd',fn=suppliers.sources[file]?.[name]
  if(typeof fn!=='function')throw Error('Original SDK setup source missing '+file+':'+name)
  return {...getMcpClientModule287(),setupSdkMcpClients:fn}
 }}
 const privateCells=new Set(['wo','pn','Js','Ed','Ps','ze','wn','Tr'])
 // Empty Proxy target is only a lexical scope filter, never a state owner.
 const ports=new Proxy({}, {
  has:(_target,name)=>typeof name==='string'&&!privateCells.has(name)&&(Object.hasOwn(caller,name)||Object.hasOwn(adapters,name)||Object.hasOwn(helpers,name)),
  get(target,name,receiver){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(caller,name))return Reflect.get(caller,name,caller)
   if(Object.hasOwn(adapters,name))return Reflect.get(adapters,name)
   if(typeof name==='string'&&Object.hasOwn(helpers,name))return helpers[name]
   throw Error('Original SDK caller missing '+String(name))
  },
  set(target,name,value,receiver){if(!Object.hasOwn(caller,name))throw Error('Original SDK mutable cell missing '+String(name));return Reflect.set(caller,name,value,caller)},
 })
 return installPrintSdkFrameNative287(owner,ports)
}
