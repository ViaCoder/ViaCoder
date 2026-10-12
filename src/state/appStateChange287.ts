import {randomUUID} from 'node:crypto'
import {unlink} from 'node:fs/promises'
import {join} from 'node:path'
import {AsyncLocalStorage} from 'node:async_hooks'
import * as source from './officialAppStateChange287/native.js'
import proof from './officialAppStateChange287/provenance.json' with {type:'json'}
import type {AppState} from './AppStateStore.js'
import {getExecutionSession287,getLegacyExecutionContext287} from '../services/context/execution287.js'
import {getSurfaceBridgeRuntime287} from '../services/context/surface287.js'
import {getAppStateJobOwner287} from './appStateJobs287.js'
import {getFastStatusSettingsWriter287} from '../utils/settings/fastStatusWriter287.js'
import {authEnvironment} from '../utils/authEnvironment.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getClientData} from '../utils/clientData.js'
import {getNativeAPIProvider287} from '../utils/model/providerSelectionBindings287.js'
import {getSessionIngressAuthToken} from '../utils/sessionIngressAuth.js'
import {getPermissionTrustTrackingOwner287} from '../utils/config.js'
import {getMainLoopModel,parseUserSpecifiedModel} from '../utils/model/model.js'
import {getOfficialModelMenuPolicy287} from '../utils/model/officialModelPicker287.js'
import {createModelSessionControllerPorts287} from '../utils/model/officialModelPicker287/session.js'
import {bindOfficialEffortWc287Imports287,resolveOfficialSideQueryEffort287,resolveOfficialHookEffort287} from '../utils/model/effortWc287.js'
import {resolveMainLoopSessionEffort287} from '../utils/model/officialEffortOwner287.js'
import {decodeSessionEffort,getSettingsEffortTable,type SessionEffort,type SettingsEffortTable} from '../utils/model/effortSettings.js'
import {takeModelChangeSource287} from '../utils/hooks/modelSwitch287/modelChange.js'
import {runOriginalPostModelSwitch287} from '../utils/hooks/modelSwitch287/runtime.js'
import {getRuntimeMemo287} from '../services/context/runtimeMemo287.js'
import {getQuotaOwner287} from '../services/claudeAiLimits.js'
import {getPermissionSessionState287} from '../utils/sessionState.js'
import {errorMessage,toError} from '../utils/errors.js'
import {logError} from '../utils/log.js'
import {logForDebugging} from '../utils/debug.js'
import {clearAwsAuthRefreshThrottle287,clearGcpAuthRefreshState287} from '../utils/conditionalAuthRefreshState287.js'
import {clearApiKeyHelperCache} from '../utils/auth.js'
import {toExternalPermissionMode} from '../utils/permissions/PermissionMode.js'
import {applyConfigEnvironmentVariables} from '../utils/managedEnv.js'
import {enqueueSdkEvent,type SdkEvent} from '../utils/sdkEventQueue.js'
import * as waitHost from '../vendor/official-usage-limit-wait/host.js'
import * as waitGates from '../vendor/official-usage-limit-wait/gates.js'
import {getUsageLimitStateForAppState287} from '../vendor/official-usage-limit-wait/state.js'
import {quotaPromptLookup287} from './quotaResumePrompt287.js'
import * as precomputeSourceKind287 from './officialPrecomputeSourceKind287/native.js'

/** Missing public bindings are visible errors, never inferred eligibility or success. */
export class AppStateSourcePortPending287 extends Error {
 constructor(readonly port:string){super('Original AppState source binding pending: '+port)}
}
const pending=(name:string)=>(..._args:unknown[]):never=>{throw new AppStateSourcePortPending287(name)}
// Resolve from the dependency graph already used by B_r, not another storage,
// policy or artifact actor. A cold AppState import does not initialize that graph.
const clearSource=(file:string,name:string)=>(...args:unknown[])=>{
 const fn=(require('../commands/clear/lifecycle287.js') as typeof import('../commands/clear/lifecycle287.js')).getClearLifecycleBinding287(file,name)
 if(typeof fn!=='function')throw new AppStateSourcePortPending287(file+':'+name)
 return fn(...args)
}
const policy=(name:string)=>(...args:unknown[])=>{
 const fn=getOfficialModelMenuPolicy287()[name]
 if(typeof fn!=='function')throw new AppStateSourcePortPending287('model.'+name)
 return fn(...args)
}
const mcpConnectionOwner=()=>{const native=(require('../services/mcp/connectedProducer287.js') as typeof import('../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().sourceModule('chunk-8f36gf8z.js');if(typeof native.to!=='function')throw new AppStateSourcePortPending287('MCP original connection to');return native.to()}
const mcpRootsV1=source.createAppStateMcpRootsV1287({to:mcpConnectionOwner,t:logForDebugging,Zy:errorMessage})
const mcpRootsV2=source.createAppStateMcpRootsV2287({to:mcpConnectionOwner,t:logForDebugging,Zy:errorMessage})
const access=source.createAppStateModelAccess287({n:getExecutionSession287})
const consent=source.createAppStateConsent287({a:clearSource('chunk-n25r032v.js','a')})
const rootsSource287=()=>{
 const fn=(require('../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287('chunk-dv1kavsv.js','n')
 if(typeof fn!=='function')throw new AppStateSourcePortPending287('chunk-dv1kavsv.js:n')
 return fn()
}
const roots=source.createAppStateRoots287({n:rootsSource287})
/** Same public roots/consent sources, available to actual host registration (not new caches). */
export const appStateRootsOwner287=rootsSource287
export const appStateConsentOwner287=clearSource('chunk-n25r032v.js','a')
const flags=source.createAppStateEventGate287({k:getFeatureValue_CACHED_MAY_BE_STALE})
const permission=source.createAppStatePermission287({Ht:(mode:Parameters<typeof toExternalPermissionMode>[0])=>({external:toExternalPermissionMode(mode)})})
const models=source.createAppStateModelRead287({...createModelSessionControllerPorts287(),Py:policy('Py'),bQn:policy('bQn')})
const effortImports=bindOfficialEffortWc287Imports287()
const effort=source.createAppStateModelEffort287({JU:access.JU,_3t:access._3t,nu:effortImports.nu,Jm:effortImports.Jm,Rt:parseUserSpecifiedModel})
const bridge=source.createAppStateBridgeReport287({Ic:permission.Ic,Vr:getSurfaceBridgeRuntime287})
const bridgeEffort=source.createAppStateBridgeEffort287({Vr:getSurfaceBridgeRuntime287,S5n:flags.S5n,
 kd:(state:SourceAppState287,model:string)=>resolveMainLoopSessionEffort287(state,model,()=>policy('El')()),
 a_n:resolveOfficialHookEffort287,jb:resolveOfficialSideQueryEffort287})
const seed=source.createAppStateClientDataSeed287({oe:getPermissionTrustTrackingOwner287})
// The exact public recheck closure reads the EXISTING usage-limit state. Its
// factory cuts u(), so it cannot initialize a second te/intent/episode cache.
const resume=source.createAppStateResume287({u:getUsageLimitStateForAppState287,
 gpe:waitHost.hce,Xh:waitHost.Mh,rt:getMainLoopModel,zAo:(model:string,credentials?:unknown,storage?:unknown)=>getQuotaOwner287().probeQuotaStatus(model,credentials as never,storage as never),
 qCe:waitGates.pwe,een:waitGates.j5t,aPt:waitGates.Svt,c0e:waitHost.vRe,
 d:logError,i:()=>{},c:(value:unknown)=>value,Aw:waitHost.fb,D:randomUUID,
 CEr:quotaPromptLookup287.CEr,Ev:waitHost.hv,Ge:waitHost.qe,sZ:'cron',y1:waitHost.hF,pzn:waitHost.KNn})
const precomputeSidecar=source.createAppStatePrecomputeSidecar287({
 bFt:join,vFe:clearSource('chunk-mphp7acd.js','vFe'),F:clearSource('chunk-ky674g9x.js','F'),Vx:clearSource('chunk-2ynta9xc.js','Vx'),
 SFt:unlink,k:getFeatureValue_CACHED_MAY_BE_STALE,a:authEnvironment,hR:clearSource('chunk-bn3p37gv.js','hR'),Z2e:clearSource('chunk-yzr5hfaq.js','Z2e')})
const precompute=source.createAppStatePrecompute287({
 Cet:precomputeSourceKind287.Cet,q:()=>getLegacyExecutionContext287()?.sessionId??getExecutionSession287().id,
 Uie:precomputeSidecar.Uie,jie:precomputeSidecar.jie,
 d:logError,t:logForDebugging,i:()=>{},c:(value:unknown)=>value,rs:precomputeSourceKind287.rs})
const setting=source.createAppStateSettingWrite287({hn:(...args:Parameters<ReturnType<typeof getFastStatusSettingsWriter287>['update']>)=>getFastStatusSettingsWriter287().update(...args)})
const ingress=source.createAppStateIngressGate287({lc:getSessionIngressAuthToken})
const fastRestore=source.createAppStateFastRestoreGate287({a:authEnvironment,He:getNativeAPIProvider287,Zvn:ingress.Zvn})
const defaults=source.createAppStateEnvironmentDefaults287({a:authEnvironment,seo:access.seo,YG:source.createAppStateEnvProbed287({a:authEnvironment}).YG})
export type SourceAppState287=AppState&{sessionEffort:SessionEffort;settingsEffortTable:SettingsEffortTable}
export function projectAppStateChange287(change:{newState:AppState;oldState:AppState}):{newState:SourceAppState287;oldState:SourceAppState287}{
 const snapshot=getExecutionSession287().modelSelection.mainLoopEffortState()
 const oldTable=snapshot?.settingsEffortTable??getSettingsEffortTable()
 const nextTable=change.newState.settings===change.oldState.settings?oldTable:getSettingsEffortTable()
 return {oldState:{...change.oldState,sessionEffort:decodeSessionEffort(change.oldState.effortValue),settingsEffortTable:oldTable},
  newState:{...change.newState,sessionEffort:decodeSessionEffort(change.newState.effortValue),settingsEffortTable:nextTable}}
}
export function createAppStateChangeProductionPorts287():Record<string,unknown>{
 return {...Object.fromEntries(Object.keys(proof.groups.AppStateChange.bindings).map(name=>[name,pending(name)])),
  ...Object.fromEntries(['Jp','y3t','yR','Wn'].map(name=>[name,access[name]])),
  ...Object.fromEntries(['BWo','r_n','zWo','fQ','$v'].map(name=>[name,effort[name]])),
  Ic:permission.Ic,o8o:permission.o8o,oxe:bridge.oxe,Hre:bridge.Hre,gX:bridgeEffort.gX,
  YD:models.YD,T5:models.T5,XBo:consent.XBo,Vtn:roots.Vtn,
  ...source.createAppStateTask287({}),
  kRo:takeModelChangeSource287,bKe:(windows:Parameters<ReturnType<typeof getQuotaOwner287>['forgetHeldWindows']>[0])=>getQuotaOwner287().forgetHeldWindows(windows),
  $Pr:(session:Parameters<typeof runOriginalPostModelSwitch287>[0],request:Parameters<typeof runOriginalPostModelSwitch287>[1])=>runOriginalPostModelSwitch287(session,request,activeChange287().newState),
  Flt:source.createAppStateAttributionGate287({ko:getRuntimeMemo287,a:authEnvironment,k:getFeatureValue_CACHED_MAY_BE_STALE}).Flt,
  jKr:getClientData,BKr:seed.BKr,k:getFeatureValue_CACHED_MAY_BE_STALE,rt:getMainLoopModel,El:policy('El'),
  fH:(...args:Parameters<ReturnType<typeof getAppStateJobOwner287>['fH']>)=>getAppStateJobOwner287().fH(...args),sLe:resume.sLe,ITe:precompute.ITe,
  cj:setting.cj,tJe:clearApiKeyHelperCache,HMn:defaults.HMn,
  YBe:fastRestore.YBe,
  ds:clearSource('chunk-nankzm0s.js','ds'),qP:applyConfigEnvironmentVariables,
  // AWS/GCP source invalidators are being exposed by A1 on the existing auth
  // owner. No OAuth clearAll / parallel provider cache is substituted here.
  rJe:clearAwsAuthRefreshThrottle287,a_t:clearGcpAuthRefreshState287,
  iue:flags.iue,Wi:(event:unknown)=>enqueueSdkEvent(event as SdkEvent),
  // pq/M7 require their real optional runtime surface sources; they are only
  // consulted for compact_error, never to default permission event admission.
  ...source.createAppStateFrames287({}),
  yue:clearSource('chunk-p3jvcdtp.js','yue'),pq:clearSource('chunk-mphp7acd.js','pq'),M7:clearSource('chunk-mphp7acd.js','M7'),
  Z:toError,d:logError,t:logForDebugging,
  nativeImport:async(path:string)=>{
   if(path==='/$bunfs/root/chunk-9e4gwhtn.js')return {refreshBootstrapData:(await import('../services/api/bootstrap.js')).publishBootstrapResponse287}
   if(path==='/$bunfs/root/chunk-3xgd8dv8.js')return {mcpClientModule:()=>({notifyMcpRootsListChanged:()=>{const generation=(require('../services/mcp/v2Lifecycle.js') as typeof import('../services/mcp/v2Lifecycle.js')).resolveMcpSdkGeneration();return generation==='v2'?mcpRootsV2.Hp():mcpRootsV1.dd()}})}
   throw new AppStateSourcePortPending287(path)
  },
 }
}
let native:ReturnType<typeof source.createAppStateChange287>|undefined
export function getAppStateChangeProduction287(){return native??=source.createAppStateChange287(createAppStateChangeProductionPorts287())}
/** Synchronous original J4t. No void-fetch adapter, altered await, second store,
 * or settings-model persistence is added to this callback. */
const changeScope287=new AsyncLocalStorage<{newState:AppState;oldState:AppState}>()
function activeChange287(){const current=changeScope287.getStore();if(!current)throw Error('AppState J4t must run in its actual change scope');return current}
export function dispatchAppStateChange287(change:{newState:AppState;oldState:AppState}):void{
 changeScope287.run(change,()=>getAppStateChangeProduction287().J4t(projectAppStateChange287(change),getExecutionSession287(),getPermissionSessionState287(),undefined,undefined))
}
