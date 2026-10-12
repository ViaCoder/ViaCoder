import {createTeleportChooser287} from './chooserNative.js'
import bindings from './chooserPorts.json'
import type {EnvironmentOwnerSuppliers287} from '../types.js'
import {createTeleportPublic287} from '../teleportPublic287/teleportNative.js'
import {createTeleportPublicProductionPorts287,type EnvironmentTeleportOwner287} from '../teleportPublic287/runtime.js'

/** One original k5 instance and one original chooser closure per actual Ii
 * transport frame. All caches/session/config/context borrow accepted owners. */
export function createTeleportRootNamespaceReader287(owner:EnvironmentTeleportOwner287,suppliers?:EnvironmentOwnerSuppliers287){
 let teleport:ReturnType<typeof createTeleportPublic287>|undefined
 let chooser:ReturnType<typeof createTeleportChooser287>|undefined
 let chooserNamespaces:Record<string,Readonly<Record<string,unknown>>>|undefined
 const originalTeleport=()=>{
  if(!teleport){
   const ports=createTeleportPublicProductionPorts287(owner)
   const previous=ports.nativeImport as (specifier:string)=>Promise<unknown>
   ports.nativeImport=async file=>suppliers?.hasNamespace(file)?suppliers.importNamespace(file):read(file)??previous(file)
   teleport=createTeleportPublic287(ports)
  }
  return teleport
 }
 const originalChooser=()=>{
  if(!chooser){
   const {createEnvironmentCloudPortsForBindings287}=require('../ports.js') as typeof import('../ports.js')
   const borrowed=bindings.filter(b=>!b.port.startsWith('environment:')&&!b.port.startsWith('teleport:')&&!b.port.startsWith('clear:'))
   const ports=createEnvironmentCloudPortsForBindings287(borrowed,suppliers)
   for(const b of bindings.filter(b=>!borrowed.includes(b))){
    Object.defineProperty(ports,b.port,{enumerable:true,get:()=>{
     const module=b.port.startsWith('environment:')?owner.sourceModule(b.file):b.port.startsWith('teleport:')?originalTeleport().sourceModule(b.file):
      (require('../../../commands/clear/lifecycle287.js') as typeof import('../../../commands/clear/lifecycle287.js')).getClearSourceModule287(b.file)
     if(!module||!Object.hasOwn(module,b.name))throw Error('Original teleport chooser owner not supplied: '+b.port)
     return module[b.name]
    }})
   }
   const previous=ports.nativeImport as (specifier:string)=>Promise<unknown>
   ports.nativeImport=async file=>suppliers?.hasNamespace(file)?suppliers.importNamespace(file):read(file)??previous(file)
   chooser=createTeleportChooser287(ports)
   chooserNamespaces={
    '/$bunfs/root/chunk-gj668m21.js':{TeleportResumeWrapper:chooser.TeleportResumeWrapper},
    '/$bunfs/root/chunk-adakrekc.js':{
     ...(require('../uiRuntime.js') as typeof import('../uiRuntime.js')).readEnvironmentUiPublicModule287('/$bunfs/root/chunk-adakrekc.js'),
     launchTeleportResumeWrapper:chooser.launchTeleportResumeWrapper,
    },
   }
  }
  return chooser
 }
 const read=(specifier:string):Readonly<Record<string,unknown>>|undefined=>{
  switch(specifier){
   case '/$bunfs/root/chunk-k5tnqq7s.js':return originalTeleport().publicNamespaces[specifier]
   case '/$bunfs/root/chunk-gj668m21.js':
   case '/$bunfs/root/chunk-adakrekc.js':originalChooser();return chooserNamespaces![specifier]
   default:return undefined
  }
 }
 return read
}
