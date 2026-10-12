import {createTeleportPublic287} from './teleportNative.js'
import bindings from './teleportPorts.json'

/** This is the existing Ii instance, not a new environment factory/session. */
export type EnvironmentTeleportOwner287={
 sourceModule(file:string):Readonly<Record<string,unknown>>|undefined
}
export const teleportPublicSpecifier287='/$bunfs/root/chunk-k5tnqq7s.js'

/** One lazy publication per actual caller's transport frame. No business state
 * is created; original dependencies are borrowed from its installed owners. */
export function createTeleportPublicNamespaceReader287(owner:EnvironmentTeleportOwner287){
 let source:ReturnType<typeof createTeleportPublic287>|undefined
 return (specifier:string):Readonly<Record<string,unknown>>|undefined=>{
  if(specifier!==teleportPublicSpecifier287)return undefined
  if(!source){
   const ports=createTeleportPublicProductionPorts287(owner)
   const importExisting=ports.nativeImport as (specifier:string)=>Promise<unknown>
   ports.nativeImport=async(file:string)=>source?.publicNamespaces[file]??importExisting(file)
   source=createTeleportPublic287(ports)
  }
  return source.publicNamespaces[specifier]
 }
}

/** Same production port adapter, also inspectable without calling teleport. */
export function createTeleportPublicProductionPorts287(owner:EnvironmentTeleportOwner287):Record<string,unknown>{
 const {createEnvironmentCloudPortsForBindings287}=require('../ports.js') as typeof import('../ports.js')
   const borrowed=bindings.filter(b=>!b.port.startsWith('environment:')&&!b.port.startsWith('clear:'))
   const ports=createEnvironmentCloudPortsForBindings287(borrowed)
   for(const binding of bindings.filter(b=>b.port.startsWith('environment:')||b.port.startsWith('clear:'))){
    Object.defineProperty(ports,binding.port,{enumerable:true,get:()=>{
     const module=binding.port.startsWith('environment:')?owner.sourceModule(binding.file):
      (require('../../../commands/clear/lifecycle287.js') as typeof import('../../../commands/clear/lifecycle287.js')).getClearSourceModule287(binding.file)
     if(!module||!Object.hasOwn(module,binding.name))throw Error('Original teleport dependency owner not supplied: '+binding.port)
     return module[binding.name]
    }})
   }
 return ports
}
