/** Full native remote-settings persistence, on the existing owner and captured config home. */
import * as path from 'node:path'
import {open,writeFile,rm,unlink} from 'node:fs/promises'
import {getErrnoCode,errorMessage} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {jsonStringify} from '../../utils/slowOperations.js'
import {isSettingsPrimerEnabled287} from '../../utils/settings/settingsCache.js'
import {getRemoteManagedSettingsRuntime287} from './syncCacheState.js'
import {clearSignedCacheSidecars,writeSignedCacheSignature,type SignedCacheInjection} from './signedCache.js'
import {createRemoteCacheWriter287,createRemoteCacheClearer287,type RemotePolicy287,type RemotePolicyStorage287} from './officialOwner287/native.js'

function bindings(cachePath:string,signatureHooks:SignedCacheInjection|undefined){
 const runtime=getRemoteManagedSettingsRuntime287()
 return {
  F:isSettingsPrimerEnabled287,oA:runtime.cacheOverride,De:runtime.artifacts,Sfe:runtime.helperConsentName,
  it:runtime.formatStorageFailure,Vje:runtime.notifyWritten,
  PZ:()=>cachePath,dAn:()=>path.join(path.dirname(cachePath),runtime.helperConsentName),
  t:logForDebugging,l:errorMessage,
  async uPe(p:string,signature?:string){
   // Preserve the established injected-host signature contract, not a public-file fallback.
   try{await writeRemoteSignature287(p,signature,signatureHooks)}catch(error){
    logForDebugging(`Remote settings: Failed to save signed-cache metadata - ${errorMessage(error)}`)
   }
  },
  async X2t(p:string){
   if(!signatureHooks?.deleteSignature&&!signatureHooks?.deleteAcceptedIat)return runtime.clearSignatures(p)
   try{await clearSignedCacheSidecars(p,signatureHooks)}catch{/* Existing injected cleanup is best-effort. */}
  },
 }
}

export async function saveRemoteSettings287(
 settings:RemotePolicy287,signature:string|undefined,cachePath:string,
 signatureHooks:SignedCacheInjection|undefined,storage:RemotePolicyStorage287|undefined,
):Promise<void>{
 const runtime=getRemoteManagedSettingsRuntime287()
 const write=createRemoteCacheWriter287({...bindings(cachePath,signatureHooks),
  cVt:runtime.diskWritesDisabled,_:jsonStringify,zYr:runtime.helperConsentHash,Ie:open,Be:writeFile,
 })
 await write(settings,storage,signature)
}

export async function clearRemoteSettings287(
 cachePath:string,signatureHooks:SignedCacheInjection|undefined,storage:RemotePolicyStorage287|undefined,
 controls:{stopPolling():void;resetRemote():void;resetSettings():void;detachBarrier():()=>void},
):Promise<void>{
 const clear=createRemoteCacheClearer287({...bindings(cachePath,signatureHooks),
  aJt:controls.stopPolling,A3:controls.resetRemote,Ro:controls.resetSettings,I:()=>({detachBarrier:controls.detachBarrier}),
  Le:rm,He:unlink,W:error=>getErrnoCode(error)==='ENOENT',
 })
 await clear(storage)
}

/** Same public signature primitive for successful conditional responses and the saver. */
export async function writeRemoteSignature287(cachePath:string,signature:string|undefined,signatureHooks:SignedCacheInjection|undefined):Promise<void>{
 if(signatureHooks?.writeSignature||signatureHooks?.deleteSignature){
  await writeSignedCacheSignature(cachePath,signature,signatureHooks)
  return
 }
 await getRemoteManagedSettingsRuntime287().writeSignature(cachePath,signature)
}
