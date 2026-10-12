import {createPoolCloudCaller287} from './poolNative.js'
import {createEnvironmentLaunchHelpers287} from './launchNative.js'
import {createEnvironmentCloudCallers287} from './interactiveNative.js'
import {createEnvironmentCloudProductionPorts287} from './ports.js'
import {createTeleportRootNamespaceReader287} from './teleportRoot287/runtime.js'
import {createTeleportModelMetadata287} from './teleportRoot287/metadataNative.js'
import metadataBindings from './teleportRoot287/metadataPorts.json'
import type {PreparedPoolHeadless287,PreparedEnvironmentInteractive287,EnvironmentActionOptions287,EnvironmentOwnerSuppliers287} from './types.js'

/** The action owner supplies its existing prepared frame verbatim. No second
 * client, executor, session, registration or local model turn is constructed. */
export function runPreparedPoolHeadless287(prepared:PreparedPoolHeadless287,options:EnvironmentActionOptions287):Promise<void>{
 if(prepared.poolId===null)throw Error('Environment pool arm requires the original normalized poolId')
 return createPoolCloudCaller287(createEnvironmentCloudProductionPorts287('pool')).poolHeadlessArm(prepared,options,undefined)
}
export function getEnvironmentLaunchHelpers287(){
 return createEnvironmentLaunchHelpers287(createEnvironmentCloudProductionPorts287('launch'))
}
/** Full original Ii, including branches not selected by this bounded caller.
 * Required same-owner state/namespace producers are deliberately not replaced. */
export function runPreparedEnvironmentInteractive287(prepared:PreparedEnvironmentInteractive287,options:EnvironmentActionOptions287,suppliers?:EnvironmentOwnerSuppliers287):Promise<void>{
 if(prepared.remote===null&&!prepared.teleport)throw Error('This caller requires an original normalized remote create or interactive teleport preparation')
 const ports=createEnvironmentCloudProductionPorts287('interactive',suppliers)
 const caller=createEnvironmentCloudCallers287(ports)
 const readTeleport=createTeleportRootNamespaceReader287(caller,suppliers)
 const requireExisting=ports.nativeRequire as (specifier:string)=>unknown
 ports.nativeRequire=(specifier:string)=>{
  if(suppliers?.hasNamespace(specifier))return requireExisting(specifier)
  return readTeleport(specifier)??requireExisting(specifier)
 }
 const importExisting=ports.nativeImport as (specifier:string)=>Promise<unknown>
 ports.nativeImport=async(specifier:string)=>{
  if(suppliers?.hasNamespace(specifier))return importExisting(specifier)
  return readTeleport(specifier)??importExisting(specifier)
 }
 return caller.interactiveCaller(prepared,options,undefined,undefined)
}

/** Whole original goo metadata readers, not a second model-selection owner.
 * Source: dgp Yc/Vc/qc/Xc/Qs/ea. Their imported readers borrow canonical
 * state; iGe is the already-restored 8tp session-restore predicate. */
let preparedModelMetadata287:{Qs():unknown;ea:unknown;iGe():boolean;Wn():boolean}|undefined
export function getEnvironmentPreparedModelProvenance287(
 normalized:{cloudAttachId:string|null;poolId:string|null;remote:string|null;projectBrowse:unknown;teleport:string|true|null},
 options:EnvironmentActionOptions287,isNonInteractiveSession:boolean,
):unknown{
 if(!preparedModelMetadata287){
  const {createEnvironmentCloudPortsForBindings287}=require('./ports.js') as typeof import('./ports.js')
  preparedModelMetadata287=createTeleportModelMetadata287(createEnvironmentCloudPortsForBindings287(metadataBindings))
 }
 const {Qs,ea,iGe,Wn}=preparedModelMetadata287
 const {cloudAttachId:Bt,poolId:eo,remote:It,projectBrowse:En,teleport:Cn}=normalized
 const o=options,K=isNonInteractiveSession
 const Pi=Boolean(o.continue||o.resume||!K&&o.fromPr||Cn)
 // Exact goo Ni and $i/Hi conditions, retaining the original resume qualifier.
 const Ni=Bt===null&&eo===null&&It===null&&!(Pi&&!iGe())
 const $i=Bt===null&&eo===null&&It===null&&!Wn()&&En===null,Hi=!$i?void 0:Ni?Qs():ea
 return Hi
}
