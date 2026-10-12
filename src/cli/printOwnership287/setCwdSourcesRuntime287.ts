import {getPrintHostSource287} from './publicHostRuntime287.js'
import {readLegacyMcpLifecycleClient287} from '../../services/mcp/officialLegacyLifecycle287/readers.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {createSetCwdSuppliersNative287} from './setCwdSuppliersNative287.js'
import map from './setCwdSourceMap287.json' with {type:'json'}
import proof from './setCwdSuppliersProvenance287.json' with {type:'json'}
const connectedFiles=new Set(['chunk-dp67c56j.js','chunk-z6w3579x.js','chunk-amg94xhm.js','chunk-fdjgzr8v.js'])
function canonical(file:string,local:string):unknown {
 // Already restored original vo, bound by the accepted reader to the same legacy producer.
 if(file==='chunk-fdjgzr8v.js'&&local==='vo')return readLegacyMcpLifecycleClient287().reconnectMcpServerImpl
 const namespace=connectedFiles.has(file)?getMcpConnectedProducer287().sourceModule(file):undefined
 if(namespace!==undefined){
  if(!Object.hasOwn(namespace,local)||namespace[local]===undefined)throw Error(`Canonical MCP source missing ${file}:${local}`)
  return namespace[local]
 }
 return getPrintHostSource287(file,local)
}
// Only previously unselected original declarations. All selected cut dependencies
// are getters into the already selected canonical owners. In particular UVe is
// the first recovery of that original registry, with original host V, not a
// second dev-intent state/cache. No raw barrel or dynamic Bunfs import.
let suppliers:Readonly<Record<string,unknown>>|undefined
function recovered(){
 if(suppliers)return suppliers
 const ports:Record<string,unknown>={}
 for(const row of proof.ports)Object.defineProperty(ports,row.port,{enumerable:true,get:()=>canonical(row.file,row.name)})
 suppliers=createSetCwdSuppliersNative287(ports)
 return suppliers
}
export function getSetCwdSource287(file:string,name:string):unknown {
 const key=file+':'+name
 if(Object.hasOwn(proof.roots,key)){
  const value=recovered()[key]
  if(value===undefined)throw Error('Recovered original cwd source missing '+key)
  return value
 }
 const row=(map as Readonly<Record<string,{localName:string}>>)[key]
 return canonical(file,row?.localName??name)
}
