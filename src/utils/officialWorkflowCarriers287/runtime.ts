import {createWorkflowCarrierGraph287} from './native.js'
import type {LocalCommandModule} from '../../types/command.js'
import {getWorkflowExecutionSource287} from '../../tools/WorkflowTool/officialExecution287/runtime.js'
import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'

let graph:ReturnType<typeof createWorkflowCarrierGraph287>|undefined
// One recovered module graph. LDn itself is the original canonical V slot
// constructor and keys every handoff by the actual execution host.
export function getWorkflowCarrierSourceModule287(file:string):Readonly<Record<string,unknown>> {
 graph??=createWorkflowCarrierGraph287((dependency,name)=>{
  if(!dependency.startsWith('chunk-')){
   if(!['crypto','path','fs/promises'].includes(dependency))throw Error('Unexpected workflow carrier native dependency: '+dependency)
   const native=import.meta.require(dependency) as Record<string,unknown>
   if(!Object.hasOwn(native,name))throw Error('Missing workflow carrier native binding: '+dependency+':'+name)
   return native[name]
  }
  // Fermat's production engine namespace owns all five original function ports.
  // Resolve at use; no copied engine, task registry, or LDn handoff slot.
  if(dependency==='chunk-jxy1fa30.js'){
   const engine=getWorkflowExecutionSource287(dependency)
   if(!Object.hasOwn(engine,name))throw Error('Missing original workflow engine binding: '+name)
   return engine[name]
  }
  return getOriginalModsLifecycle287().clearLifecycleSource287(dependency,name)
 })
 return graph.source(file)
}

export function getWorkflowCarrierCommandModule287(file:'chunk-bv1f34vz.js'|'chunk-cj1qnkqv.js'):LocalCommandModule {
 const module=getWorkflowCarrierSourceModule287(file)
 if(typeof module.call!=='function')throw Error('Original workflow carrier call missing: '+file)
 return {call:module.call as LocalCommandModule['call']}
}

// Main's remote inbound/resume caller must consume this same module, hence the
// exact LDn slot used by workflow-launch-exec. Merely exporting is not admission.
export interface WorkflowLaunchAdmission287 {
 Ess(record?:unknown):unknown
 vss(record:unknown):unknown
 Css(event:unknown,runtime:unknown):Promise<void>
 Ass(runtime:unknown):Promise<void>
 LDn:{of(host:object):{stash(key:string,handoff:unknown):void;take(key:string):unknown}}
 wss:string
}
export function getWorkflowLaunchAdmission287():WorkflowLaunchAdmission287 {
 return getWorkflowCarrierSourceModule287('chunk-8asv9fve.js') as unknown as WorkflowLaunchAdmission287
}
