import type {createHotSessionProductionPorts287} from '../../utils/hotSessionController287/runtime.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import poolBindings from './poolPorts.json'
import launchBindings from './launchPorts.json'
import interactiveBindings from './interactivePorts.json'
import type {EnvironmentOwnerSuppliers287} from './types.js'

/** Reuse the installed canonical/outside/resume/hot graph. No native owner is
 * initialized here; unresolved raw state/namespace suppliers remain explicit. */
export function createEnvironmentCloudProductionPorts287(mode:'pool'|'launch'|'interactive',suppliers?:EnvironmentOwnerSuppliers287):Record<string,unknown>{
 const bindings={pool:poolBindings,launch:launchBindings,interactive:interactiveBindings}[mode]
 return createEnvironmentCloudPortsForBindings287(bindings,suppliers)
}
/** The same transport adapter also inspects supplemental UI source roots.
 * It borrows existing owners; callers do not invent a second canonical host. */
export function createEnvironmentCloudPortsForBindings287(bindings:readonly {port:string;file:string;name:string}[],suppliers?:EnvironmentOwnerSuppliers287):Record<string,unknown>{
 // Original import aliases can share one application cut (n/U both resolve
 // the existing execution reader). Install each immutable getter once.
 const uniqueBindings=[...new Map(bindings.map(binding=>[binding.port,binding])).values()]
 const mature=(require('../../utils/hotSessionController287/runtime.js') as {createHotSessionProductionPorts287:typeof createHotSessionProductionPorts287}).createHotSessionProductionPorts287(uniqueBindings)
 const ports:Record<string,unknown>=Object.create(mature)
 // The merged public canonical namespace includes the already-installed
 // supplemental declarations; its original local selector is not an export resolver.
 for(const binding of uniqueBindings.filter(b=>b.port.startsWith('source:'))){
  Object.defineProperty(ports,binding.port,{enumerable:true,get:()=>{
   const namespace=getOriginalModsLifecycle287().clearSourceModule287(binding.file)
   if(!Object.hasOwn(namespace,binding.name))throw Error('Environment canonical declaration not selected: '+binding.file+':'+binding.name)
   return namespace[binding.name]
  }})
 }
 for(const binding of uniqueBindings.filter(b=>b.port.startsWith('requiredOwner:'))){
  Object.defineProperty(ports,binding.port,{enumerable:true,configurable:true,get:()=>{
   const module=getOriginalModsLifecycle287().clearSourceModule287(binding.file)
   if(Object.hasOwn(module,binding.name))return module[binding.name]
   if(suppliers&&Object.hasOwn(suppliers.state,binding.port))return suppliers.state[binding.port]
   throw Error('Original environment same-owner state must be supplied: '+binding.port)
  }})
 }
 const requireExisting=ports.nativeRequire as (specifier:string)=>unknown
 const importExisting=ports.nativeImport as (specifier:string)=>Promise<unknown>
 ports.nativeRequire=(specifier:string)=>{
  if(suppliers?.hasNamespace(specifier))return suppliers.requireNamespace(specifier)
  const module=(require('./uiRuntime.js') as typeof import('./uiRuntime.js')).readEnvironmentUiPublicModule287(specifier)
  return module??(require('./publicNamespaces287.js') as typeof import('./publicNamespaces287.js')).readEnvironmentPublicNamespace287(specifier)??requireExisting(specifier)
 }
 ports.nativeImport=async(specifier:string)=>{
  if(suppliers?.hasNamespace(specifier))return suppliers.importNamespace(specifier)
  // The raw module is a re-export only. Reuse the complete clear lifecycle
  // already installed for /clear, without creating a second cache owner.
  if(specifier==='/$bunfs/root/chunk-0yspv0sq.js'){
   const {getClearSourceModule287}=await import('../../commands/clear/lifecycle287.js')
   const source=getClearSourceModule287('chunk-a09sr9se.js')
   return {clearSessionCaches:source.G_r,dropBashPromptSkillListingPin:source.MMn}
  }
  const published=(require('./publicNamespaces287.js') as typeof import('./publicNamespaces287.js')).readEnvironmentPublicNamespace287(specifier)
  if(published)return published
  if(specifier.startsWith('/$bunfs/root/chunk-'))return getOriginalModsLifecycle287().importPublicSourceModule287(specifier)
  return importExisting(specifier)
 }
 return ports
}
