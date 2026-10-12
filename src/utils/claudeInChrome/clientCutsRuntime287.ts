import {createRequire} from 'node:module'
import {createChromeClientCuts287,type ChromeClientCuts287} from './officialClientCuts287/native.js'
import {authEnvironment} from '../authEnvironment.js'
import {onExit} from 'signal-exit'
const hostRequire=createRequire(import.meta.url)
const execution=()=> (require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')).getExecutionSession287()
const config=()=>require('../config.js') as typeof import('../config.js')
const cleanup=()=>require('../cleanupRegistry.js') as typeof import('../cleanupRegistry.js')
let runtime:ChromeClientCuts287|undefined
/** One source owner for public debug and conditional Chrome initialization. */
export function getChromeClientCuts287():ChromeClientCuts287 {
 return runtime??=createChromeClientCuts287(createChromeClientCutsPorts287())
}
export function createChromeClientCutsPorts287():Record<string,unknown> {
 return {
  builtins:new Proxy({}, {get:(_target,id)=>hostRequire(String(id))}),
  nativeRequire:hostRequire,
  resolveHostCell:<T>(cell:{of(host:object):T})=>cell.of(execution().host),
  sessionId:()=>execution().id,diskless:()=>execution().host.launchOptions.diskless(),
  configHome:()=>(require('../envUtils.js') as typeof import('../envUtils.js')).getClaudeConfigHomeDir(),
  configState:()=>config().getGeneratedIdentityOwner287(),configRead:()=>config().getGlobalConfig(),configSave:(...args:Parameters<typeof import('../config.js').saveGlobalConfig>)=>config().saveGlobalConfig(...args),
  storagePinned:()=>(require('../secureStorage/storageV5.js') as typeof import('../secureStorage/storageV5.js')).isStorageV5PinnedOn(),
  fileSystem:()=>(require('../fsOperations.js') as typeof import('../fsOperations.js')).getFsImplementation(),
  registerCleanup:(fn:()=>Promise<void>)=>cleanup().registerCleanup(fn),cleanupStarted:()=>cleanup().hasCleanupStarted(),
  // Existing canonical signal-exit subscriber (same global emitter), including
  // the original alwaysLast ordering and exact unsubscribe handle.
  registerExit:onExit,
  platform:()=>(require('../platform.js') as typeof import('../platform.js')).getPlatform(),environment:authEnvironment,
  // The complete original Ga and its host cells already belong to outside
  // hooks. Resolve lazily only when the original Je option requests cgroups.
  toolMemoryCgroup:(kind:string)=>{
   const owner=(require('../hooks/outsideRuntime287.js') as typeof import('../hooks/outsideRuntime287.js')).getOutsideHookRuntime287().sourceModule('chunk-1nayt2j6.js')
   const original=owner.Ga as (kind:string)=>Record<string,unknown>
   return original(kind)
  },
  // Frozen telemetry C: retain call positions through the existing canceled
  // leaf, without introducing a sender, identifying strings or event queue.
  analytics:(name:string,_metadata:unknown)=>(require('../../services/analytics/index.js') as typeof import('../../services/analytics/index.js')).logEvent(name,{}),
  featureOk:(_name:string)=>(require('../../services/analytics/index.js') as typeof import('../../services/analytics/index.js')).logEvent('tengu_feature_ok',{}),
  featureSad:(_name:string,_reason:string)=>(require('../../services/analytics/index.js') as typeof import('../../services/analytics/index.js')).logEvent('tengu_feature_sad',{}),
  errorLog:(error:unknown)=>(require('../log.js') as typeof import('../log.js')).logError(error),
 }
}
