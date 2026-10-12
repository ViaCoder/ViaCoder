import * as path from 'node:path'
import {AsyncLocalStorage} from 'node:async_hooks'
import {memoize} from 'lodash-es'
import {z} from 'zod'
import {filesystemPathRuntime287} from './filesystemPathRuntime287.js'
import {getRestoreWorktree287} from './resumeWorktree287.js'
import {createResumeState287} from './officialSessionRestore287/state.js'
import {createSessionRestore287,type ResumeHookCarrier287} from './officialSessionRestore287/native.js'
import type {ResumeLoadResult,ResumeRestoreContext287} from './sessionRestore.js'
import type {Message} from '../types/message.js'
import {getExecutionSession287,runWithExecutionSession287} from '../services/context/execution287.js'
import {markBannerRestored287} from '../components/LogoV2/bannerProduction287.js'
import {getSessionId,getOriginalCwd,getMainLoopModelOverride,setMainLoopModelOverride,setMainThreadAgentType,switchSession} from '../bootstrap/state.js'
import {asSessionId} from '../types/ids.js'
import {getOfficialModelMenuPolicy287} from './model/officialModelPicker287.js'
import {getModelBehaviorName287} from './model/behavior287.js'
import {parseUserSpecifiedModel,getUserSpecifiedModelSetting} from './model/model.js'
import {getAPIProvider} from './model/providers.js'
import {ALL_MODEL_CONFIGS} from './model/configs.js'
import {selectMainThreadAgentHooks287} from './hooks/mainThreadAgentHooks287.js'
import {getOriginalModsLifecycle287} from './hooks/modelSwitch287/lifecycleRuntime.js'
import {getAgentDefinitionsWithOverrides,getActiveAgentsFromList} from '../tools/AgentTool/loadAgentsDir.js'
import {isPathTrusted} from './config.js'
import {findPermissionMode} from './permissions/permissionModeCli287.js'
import {hasPolicyComplianceTaint} from '../services/policyLimits/index.js'
import {createSystemMessage} from './messages.js'
import {logForDebugging} from './debug.js'
import {logError} from './log.js'
import {logEvent} from '../services/analytics/index.js'
import {logForDiagnosticsNoPII} from './diagLogs.js'
import {restoreTranscriptCosts287} from '../services/context/costPersistence287.js'
import {renameRecordingForSession} from './asciicast.js'
import {resetSessionFilePointer,adoptResumedSessionFile,restoreSessionMetadata,recordContentReplacement,saveMode,getTranscriptPathForSession,getCurrentSessionTitle,cacheSessionTitle,cacheSessionAgentName,getResumeHookMetadataOwner287} from './sessionStorage.js'
import {validateUuid} from './sessionStoragePortable.js'
import {restoreGoal} from './goal.js'
import {restoreResumeName287,getResumeRename287} from './resumeRename287.js'
import {cleanTitle} from './sessionRename/names.js'
import {getSessionRenameRegistry} from './sessionRename/host.js'
import {isStorageV5PinnedOn} from './secureStorage/storageV5.js'
import type {AppState} from '../state/AppState.js'

let state:ReturnType<typeof createResumeState287>|undefined
export function getResumeState287(){return state??=createResumeState287({tn:validateUuid,q:getSessionId,Yf:getTranscriptPathForSession,V:getOriginalModsLifecycle287().clearSourceModule287('chunk-bn3p37gv.js').V as import('./officialSessionRestore287/state.js').ResumeHostRegistryConstructor287})}
const policy=(name:string)=>(...args:unknown[])=>{const fn=getOfficialModelMenuPolicy287()[name];if(typeof fn!=='function')throw Error('Restore model source port '+name);return fn(...args)}
function sharedResumeSource287(file:string,name:string,...args:unknown[]):unknown {
 const fn=getOriginalModsLifecycle287().clearSourceModule287(file)[name]
 if(typeof fn!=='function')throw Error('Resume source owner export missing: '+file+':'+name)
 return fn(...args)
}
/** Stateless full source engine; every stateful leaf reads the current canonical owner. */
const restoreContext287=new AsyncLocalStorage<ResumeRestoreContext287>()
export function withResumeRestoreContext287<T>(context:ResumeRestoreContext287,run:()=>T):T{return runWithExecutionSession287(context.session??getExecutionSession287(),()=>restoreContext287.run(context,run))}
export function createSessionRestoreProductionPorts287(context?:ResumeRestoreContext287) {
 const restoredWorktree=()=>require('./sessionRestore.js') as typeof import('./sessionRestore.js')
 return {
  f:memoize,o:z.string,u:z.object,UEe:filesystemPathRuntime287.automountRoot,w$:filesystemPathRuntime287.isNetworkBrowsePath,OVe:markBannerRestored287,Nt:createSystemMessage,
  ay:(id:string,reason:'resume',dir:string|null)=>switchSession(asSessionId(id),reason,dir),
  C5t:renameRecordingForSession,cq:resetSessionFilePointer,
  $Te:async(input:ResumeLoadResult)=>{restoreSessionMetadata(getSessionRestoreBody287().forkMetadata(input,{stripWorktreeSession:true,stripRelocatedCwd:true}))},
  Sne:recordContentReplacement,f1:restoreSessionMetadata,
  Bce:restoreTranscriptCosts287,
  rve:(owner:ReturnType<ReturnType<typeof getResumeState287>['worktree']['of']>,value:ResumeLoadResult['worktreeSession'])=>{const result=getRestoreWorktree287().restore(value);owner.record(result);return result},
  Itt:(failure:import('./officialSessionRestore287/state.js').WorktreeResumeFailure287)=>getRestoreWorktree287().warning(failure),get w4(){return getResumeState287().worktree},
  m1:saveMode,F:isStorageV5PinnedOn,Nce:async()=>{throw Error('StorageV5 resume backend is not installed')},Lce:adoptResumedSessionFile,
  wme:async(cwd:string,cli:import('../tools/AgentTool/loadAgentsDir.js').AgentDefinition[])=>{getAgentDefinitionsWithOverrides.cache.clear?.();const definitions=await getAgentDefinitionsWithOverrides(cwd);const allAgents=[...definitions.allAgents,...cli];return {...definitions,allAgents,activeAgents:getActiveAgentsFromList(allAgents)}},
  Ee:getOriginalCwd,Se:path.resolve,ne:path.win32,tt:path,
  wEe:(cwd:string)=>getRestoreWorktree287().ancestry(cwd),
  U_t:isPathTrusted,r0:getAgentDefinitionsWithOverrides,uee:setMainThreadAgentType,xHe:selectMainThreadAgentHooks287,
  T6:(agents:import('../tools/AgentTool/loadAgentsDir.js').AgentDefinition[],type:string)=>agents.find(agent=>agent.agentType===type),
  t:logForDebugging,p:(event:string,outcome:string)=>logForDebugging(`[${event}] ${outcome}`),Hn:(text:string)=>text,cLe:{agentType:'Explore'},
  Kc:getMainLoopModelOverride,Rt:parseUserSpecifiedModel,Iy:policy('Iy'),$r:(model:string)=>getOfficialModelMenuPolicy287().$r(model),Jp:setMainLoopModelOverride,
  kh:findPermissionMode,ol:hasPolicyComplianceTaint,a:process.env,
  nIe:()=>getUserSpecifiedModelSetting()==null&&getOfficialModelMenuPolicy287().j3().attribution==='env',od:()=>['firstParty','anthropicGoogleCloud','gateway'].includes(getAPIProvider()),
  L9o:Object.values(ALL_MODEL_CONFIGS).map(row=>row.firstParty),Be:getModelBehaviorName287,Fn:(model:string)=>model.replace(/\[(1|2)m\]/gi,''),Ma:'<synthetic>',Xh:getUserSpecifiedModelSetting,Ct:(model:string)=>model.replace(/\[1m\]/gi,''),
  $H:policy('$H'),KQ:policy('KQ'),zd:policy('zd'),wj:(model:string)=>(require('./context.js') as typeof import('./context.js')).modelSupports1M(model),
  Jae:(model:string,storage?:unknown,credentials?:unknown)=>(require('./model/officialModelPicker287/validation.js') as typeof import('./model/officialModelPicker287/validation.js')).getOfficialModelValidation287().Jae(model,storage,credentials),
  i:(event:string,fields:Record<string,unknown>)=>logEvent(event,fields as Parameters<typeof logEvent>[1]),c:(value:string)=>value,me:(value:string|undefined)=>value,
  // Frozen C: preserve existing refusal/fallback transcript and latch behavior.
  // These are C cuts, not reconstructed/claimed original Ptt/nve/tve producers.
  Ptt:(_messages:Message[])=>undefined,nve:(_messages:Message[],_fork:boolean)=>undefined,
  tve:(_messages:Message[],model:string)=>{setMainLoopModelOverride(model);return model},
  Pe:(input:ResumeLoadResult)=>restoredWorktree().computeRestoredAttributionState(input),
  Fde:restoreResumeName287,
  H5:(...args:Parameters<typeof import('../commands/clear/lifecycle287.js').runSessionStartHooks287>)=>(require('../commands/clear/lifecycle287.js') as typeof import('../commands/clear/lifecycle287.js')).runSessionStartHooks287(...args),
  i1:getExecutionSession287,q:getSessionId,xf:getCurrentSessionTitle,
  // Existing local diagnostic sink; frozen telemetry C is not re-enabled.
  wr:(event:string,duration:number,started:number)=>logForDiagnosticsNoPII('info',event,{duration_ms:duration,started_at:started}),
  bie:()=>sharedResumeSource287('chunk-mphp7acd.js','bie'),
  ml:()=>sharedResumeSource287('chunk-yzr5hfaq.js','ml'),Si:cleanTitle,A1e:(name:string,current:string|undefined)=>getSessionRenameRegistry()?getResumeRename287().held(name,current):undefined,
  ZD:cacheSessionTitle,jTe:cacheSessionAgentName,js:getResumeHookMetadataOwner287,
  Va:()=>sharedResumeSource287('chunk-mphp7acd.js','Va'),eS:(...args:unknown[])=>sharedResumeSource287('chunk-mphp7acd.js','eS',...args),
  E:(value:unknown)=>sharedResumeSource287('chunk-c9me9cp7.js','E',value),l:(value:unknown)=>sharedResumeSource287('chunk-c9me9cp7.js','l',value),ej:path.basename,Ha:()=>sharedResumeSource287('chunk-mphp7acd.js','Ha'),d:logError,
  Yln:(surface:string)=>logForDebugging(`[sessionRestore] interrupted turn: ${surface}`),
  Oxn:(input:{sourceSessionId?:string;transcriptPath?:string})=>getResumeState287().source(input),
  nJ:()=>{const invocation=context??restoreContext287.getStore();if(!invocation)throw Error('Resume context required for Goal/session hooks');return invocation.initialState.sessionHooks},
  re:path.dirname,l4:(id:unknown)=>typeof id==='string'&&id.length>0&&/^[A-Za-z0-9_-]+$/.test(id),tn:validateUuid,
  Bn:()=>new AbortController(),Qte:logError,
  LF:()=>{const source=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-xep95vq1.js','LF');if(typeof source!=='function')throw Error('Canonical LF is not installed');return source()},
  nativeImport:async(specifier:string)=>{
   if(specifier==='/$bunfs/root/chunk-sn191mdq.js')return getSessionRestoreBody287().autoMode
   if(specifier==='/$bunfs/root/chunk-5v3372cv.js')return import('./permissions/permissionSetup.js')
   throw Error('Unbound restore dynamic import '+specifier)
  },
  nativeRequire:(specifier:string)=>{
   if(specifier!=='/$bunfs/root/chunk-cd74mtad.js')throw Error('Unbound restore namespace '+specifier)
   return {restoreGoalFromTranscript:(messages:Message[],setState:(update:(state:AppState)=>AppState)=>void)=>setState(state=>{let next=state;restoreGoal(messages,{getAppState:()=>next,setAppState:update=>{next=update(next)}});return next})}
  },
 }
}
let pure:ReturnType<typeof createSessionRestore287>|undefined
export function getSessionRestoreBody287(){return pure??=createSessionRestore287(createSessionRestoreProductionPorts287())}
export function resumeHooksPromise287(carrier:ResumeHookCarrier287|undefined):Promise<import('../types/message.js').HookResultMessage[]>|undefined{return carrier?.promise}
