import {setOriginalCwd,setProjectRoot} from '../../bootstrap/state.js'
import {getCwd} from '../cwd.js'
import {setCwd} from '../Shell.js'
import {isStorageV5PinnedOn} from '../secureStorage/storageV5.js'
import type {StorageV5Backend} from '../secureStorage/storageV5.js'
import {logForDebugging} from '../debug.js'
import {validateDeepLinkCwd287,validateDeepLinkQuery287} from './parseDeepLink.js'
import {createDeepLinkStartup287,type DeepLinkStartupPorts287,type DeepLinkStartupOptions287} from '../officialDeepLinkLauncher287/startup.js'
function source(file:string):Readonly<Record<string,unknown>> {
 return (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}
/** All reset/init calls are the canonical production settings/plugin/session owners. */
export function createDeepLinkStartupProductionPorts287():DeepLinkStartupPorts287 {
 return {
  edr:validateDeepLinkQuery287,Zcr:validateDeepLinkCwd287,
  // Complete original zf leaf: process cwd first, then Shell/bootstrap identities.
  zf(e){process.chdir(e);try{process.cwd()}catch{}},Rf:setCwd,vT:setOriginalCwd,jfe:setProjectRoot,oe:getCwd,
  CIe:()=> (source('chunk-nankzm0s.js').CIe as DeepLinkStartupPorts287['CIe'])(),
  C6t:()=> (source('chunk-nankzm0s.js').C6t as DeepLinkStartupPorts287['C6t'])(),
  Whe:()=> (source('chunk-mphp7acd.js').Whe as DeepLinkStartupPorts287['Whe'])(),
  Ro:options=> (source('chunk-s3exmmq6.js').Ro as DeepLinkStartupPorts287['Ro'])(options),
  yy:reason=> (source('chunk-mphp7acd.js').yy as DeepLinkStartupPorts287['yy'])(reason),F:isStorageV5PinnedOn,
  j2t:storage=> (source('chunk-jkge483z.js').j2t as DeepLinkStartupPorts287['j2t'])(storage),
  WFe:(storage,reason)=> (source('chunk-mphp7acd.js').WFe as DeepLinkStartupPorts287['WFe'])(storage,reason),
  z7r:()=> (source('chunk-2ynta9xc.js').z7r as DeepLinkStartupPorts287['z7r'])(),
  MG:options=> (source('chunk-n3ptvp2f.js').MG as DeepLinkStartupPorts287['MG'])(options),
  Kl:{cache:{clear:()=> (source('chunk-epk29mef.js').Kl as DeepLinkStartupPorts287['Kl']).cache.clear?.()}},
  X_:storage=> (source('chunk-epk29mef.js').X_ as DeepLinkStartupPorts287['X_'])(storage),t:logForDebugging,
 }
}
const apply=createDeepLinkStartup287(createDeepLinkStartupProductionPorts287())
export function applyDeepLinkStartup287(options:DeepLinkStartupOptions287,storage:StorageV5Backend|undefined,startupInitialized:()=>boolean):Promise<void> {
 return apply(options,storage,startupInitialized)
}
