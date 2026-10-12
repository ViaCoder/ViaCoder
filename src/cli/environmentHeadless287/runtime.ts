import {createEnvironmentHeadless287} from './native.js'
import bindings from './ports.json'
import {createEnvironmentCloudPortsForBindings287} from '../environmentCloud287/ports.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {PreparedEnvironmentHeadless287} from './types.js'
let client:ReturnType<typeof createEnvironmentHeadless287>|undefined;
/** One lazy publication of original absent declarations. Every existing
 * canonical/IO/session/queue and credential cell is borrowed, not rebuilt. */
export function getEnvironmentHeadless287(){
 if(client)return client;
 const ports=createEnvironmentCloudPortsForBindings287(bindings);
 const importExisting=ports.nativeImport as (specifier:string)=>Promise<unknown>;
 ports.nativeImport=async(specifier:string)=>{
  const local=client?.publicNamespaces[specifier];
  if(local){
   if(specifier==='/$bunfs/root/chunk-wes8v52x.js')return {...await getOriginalModsLifecycle287().importPublicSourceModule287(specifier),...local};
   return local;
  }
  return importExisting(specifier);
 };
 return client=createEnvironmentHeadless287(ports);
}
export function runPreparedEnvironmentHeadless287(prepared:PreparedEnvironmentHeadless287,options:Record<string,unknown>):Promise<void>{
 const original=getEnvironmentHeadless287();
 if(prepared.headlessCloud)return original.headlessCreateArm(prepared,options);
 if(prepared.headlessCloudPrint)return original.headlessPrintArm(prepared,options);
 // Admission belongs to original Is. Never turn an unsupported cloud create
 // into a local print turn or the old positional interactive helper.
 throw Error('No original non-pool headless cloud launch was admitted');
}
