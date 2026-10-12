import {basename,normalize} from 'node:path'
import {randomUUID} from 'node:crypto'
import {types as utilTypes} from 'node:util'
import {z} from 'zod/v4'
import {getExecutionSession287} from '../../context/execution287.js'
import {usesBashTools287} from '../../context/runtime.js'
import {getRuntimeMemo287} from '../../context/runtimeMemo287.js'
import {getMemoryReadPolicy287,memoryHostRegistryConstructor287,isPublicAutoMemoryEnabled287} from '../../../constants/systemComposerMemory287.js'
import {getMcpConnectedProducer287} from '../../mcp/connectedProducer287.js'
import {getMemoryUpdates287,publishBackgroundMemoryUpdate287} from '../../../utils/memoryUpdates287.js'
import {runForkedAgent,createCacheSafeParams} from '../../../utils/forkedAgent.js'
import {createUserMessage,createMemorySavedMessage,findLastCompactBoundaryIndex} from '../../../utils/messages.js'
import {scanMemoryFiles} from '../../../memdir/memoryScan.js'
import {getMemoryDirectoryRuntime287} from '../../../memdir/memoryDirectoryRuntime287.js'
import {getAutoMemPath} from '../../../memdir/paths.js'
import {isTeamMemoryEnabled,isTeamMemPath} from '../../../memdir/teamMemPaths.js'
import {createAutoDreamCanUseTool,isDreamMemoryMarkdownPath} from '../../autoDream/autoDreamToolPolicy.js'
import {authEnvironment} from '../../../utils/authEnvironment.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../analytics/growthbook.js'
import {logEvent} from '../../analytics/index.js'
import {sanitizeToolNameForAnalytics} from '../../analytics/metadata.js'
import {logForDebugging} from '../../../utils/debug.js'
import {logForDiagnosticsNoPII} from '../../../utils/diagLogs.js'
import {errorMessage} from '../../../utils/errors.js'
import {lazySchema} from '../../../utils/lazySchema.js'
import {safeParseJSON} from '../../../utils/json.js'
import {expandPath} from '../../../utils/path.js'
import {getIsNonInteractiveSession,getSessionId} from '../../../bootstrap/state.js'
import {getAPIProvider} from '../../../utils/model/providers.js'
import {oc as hasComplianceTaint} from '../../../vendor/official-files-api/taints.js'
import {tokenCountWithEstimation} from '../../../utils/tokens.js'
import {createAbortController} from '../../../utils/abortController.js'
import {getMainLoopActivityPressure287} from '../../../utils/sessionActivity.js'
import {createAgentId} from '../../../utils/uuid.js'
import {getDenyRules,getAskRules} from '../../../utils/permissions/permissions.js'
import {createSideQueryBetaGates287} from '../../../utils/officialSideQuery287/betaGates.js'
import {createExtractMemories287,type ExtractMemories287} from './native.js'
import {createExtractGates287} from './gates.js'
import {createExtractSkipCache287} from './skipCache.js'
import {createExtractMcpConstants287} from './mcpConstants.js'
import {createExtractMatching287} from './matching.js'
import {createExtractContext287} from './context.js'
import {createExtractManifest287} from './manifest.js'
import {createExtractVersions287} from './versions.js'
import {createExtractVersionSanitize287} from './versionSanitize.js'
import {createExtractVersionStripSequences287} from './versionStripSequences.js'
import {createExtractVersionInvisible287} from './versionInvisible.js'
import {createExtractVersionConstants287} from './versionConstants.js'
import {createExtractVersionWellFormed287} from './versionWellFormed.js'
import type {REPLHookContext} from '../../../utils/hooks/postSamplingHooks.js'

export const extractFactories287={native:createExtractMemories287,gates:createExtractGates287,skipCache:createExtractSkipCache287,mcpConstants:createExtractMcpConstants287,matching:createExtractMatching287,context:createExtractContext287,manifest:createExtractManifest287,versions:createExtractVersions287,versionSanitize:createExtractVersionSanitize287,versionStripSequences:createExtractVersionStripSequences287,versionInvisible:createExtractVersionInvisible287,versionConstants:createExtractVersionConstants287,versionWellFormed:createExtractVersionWellFormed287}
const event=(name:string,data:Record<string,unknown>)=>logEvent(name,data as never)
const ok=(name:string)=>event('tengu_feature_ok',{feature_name:name})
const sad=(name:string,code:string)=>event('tengu_feature_sad',{feature_name:name,error_code:code})
const fail=(name:string):never=>{throw Error(`extractMemories287 requires existing source owner: ${name}`)}
/** Mutable source Pn.of(host) slot, not a copy of its held snapshot. */
export interface ExtractMemoryHeldState287 {held?:{versions:Record<string,string>;[field:string]:unknown}}
const canonicalHeldState=(host:object):ExtractMemoryHeldState287=>
 (require('../../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().memoryContextSlot.of(host)
let heldStateAccessor:(host:object)=>ExtractMemoryHeldState287=canonicalHeldState
/** The context owner hands in its existing Pn accessor. No registry, held data,
 * default snapshot or private backend is created in this consumer. */
export function bindExtractMemoryHeldState287(accessor:(host:object)=>ExtractMemoryHeldState287):void {heldStateAccessor=accessor}
export function createExtractMemoryProductionPorts287(f=extractFactories287):Record<string,any>{
 const constants=f.mcpConstants({})
 const gates=f.gates({...constants,a:authEnvironment,k:getFeatureValue_CACHED_MAY_BE_STALE,Ce:getIsNonInteractiveSession,YU:randomUUID,
  sS:(url:string)=>getMcpConnectedProducer287().isCcrGatewayUrl(url),Vp:(config:unknown)=>getMcpConnectedProducer287().isCliOwnedMcpConfig(config),
  gt:safeParseJSON,f:lazySchema,Ve:z.looseObject,B:z.enum,H:z.boolean,u:z.object,o:z.string,aS:z.int})
 const beta=createSideQueryBetaGates287({a:authEnvironment,ol:hasComplianceTaint,He:getAPIProvider,GF:(p:string)=>['anthropicAws','anthropicGoogleCloud'].includes(p)})
 const manifest=f.manifest({bqn:(dir:string,signal:AbortSignal,options:{regularFilesOnly?:boolean},storage?:Parameters<typeof scanMemoryFiles>[3])=>scanMemoryFiles(dir,signal,options,storage),Ib:getMemoryDirectoryRuntime287().scanStorageListError,y:ok,p:sad})
 const {Nz}=f.versionWellFormed({}),{bf}=f.versionStripSequences({Nz}),{M2e}=f.versionInvisible({})
 const {DM}=f.versionSanitize({bf,M2e}),{JA}=f.versionConstants({})
 const versions=f.versions({Pn:{of:(host:object)=>heldStateAccessor(host)},II:utilTypes,JA,SJe:constants.Pvn,DM,ne:logForDiagnosticsNoPII})
 return {...gates,...f.matching({}),...f.context({hdt:findLastCompactBoundaryIndex}),...manifest,...f.skipCache({Im:beta.Im,k:getFeatureValue_CACHED_MAY_BE_STALE}),
  V:memoryHostRegistryConstructor287,a:authEnvironment,k:getFeatureValue_CACHED_MAY_BE_STALE,
  q:getSessionId,a4:()=>getExecutionSession287().requestJournal.promptIndex(),
  hA:()=>getExecutionSession287().sessionFlags.memoryToggledOff(),AT:()=>getExecutionSession287().host.launchOptions.restrictedSession(),
  yr:()=>require('../../../utils/envUtils.js').isBareMode(),
  Kue:()=>(getExecutionSession287().surfaceCapabilities as unknown as {mainQueryRunning():boolean}).mainQueryRunning()||getMainLoopActivityPressure287()>0,
  pr:()=>getExecutionSession287().surfaceCapabilities.caps().remote,
  oz:()=>{const flags=getExecutionSession287().sessionFlags;return flags.memoryToggledOff()||flags.autoMemoryOffThisSession()},
  qd:isPublicAutoMemoryEnabled287,a3:()=>getMemoryReadPolicy287().readFenceBlocked287(),
  vhn:()=>getRuntimeMemo287().sharedMemoryServedViaTools??false,z1:isTeamMemoryEnabled,QN:isTeamMemPath,
  agt:()=>getFeatureValue_CACHED_MAY_BE_STALE('tengu_gorse_fathom',false),Xs:getAutoMemPath,
  X0:(path:string)=>{const dir=getAutoMemPath();return dir!==null&&normalize(path).startsWith(dir)},
  aq:createCacheSafeParams,IC:(...args:Parameters<typeof runForkedAgent>)=>runForkedAgent(...args),Re:createUserMessage,Aln:createMemorySavedMessage,
  OXt:publishBackgroundMemoryUpdate287,pDt:(...args:Parameters<ReturnType<typeof getMemoryUpdates287>['refresh']>)=>getMemoryUpdates287().refresh(...args),
  PHn:(root:string)=>createAutoDreamCanUseTool(root,undefined),Grt:isDreamMemoryMarkdownPath,
  Xe:expandPath,G:(values:any[],predicate:(value:any)=>boolean)=>values.filter(predicate).length,L:<T>(values:T[])=>[...new Set(values)],
  I:(count:number,singular:string,plural:string)=>count===1?singular:plural,Ne:basename,Wd:'MEMORY.md',Bn:createAbortController,Dg:createAgentId,
  jm:tokenCountWithEstimation,i:event,t:(...args:Parameters<typeof logForDebugging>)=>logForDebugging(...args),y:ok,m:sad,p:sad,c:(value:unknown)=>value,l:errorMessage,Nn:sanitizeToolNameForAnalytics,
  $a:usesBashTools287,Ue:'Bash',wt:'PowerShell',dt:'Read',Jr:'Grep',co:'Glob',Ot:'Edit',Sn:'Write',Qa:'ToolSearch',ic:'REPL',p_:'memory_list',Nf:'memory_read',kc:'memory_write',
  JQe:'Memory is paused for this session; only the user can turn it back on.',Su:getDenyRules,zh:getAskRules,
  Z2:(...args:unknown[])=>{const owner=require('../../../utils/permissions/read.js').getReadPermissions287();return owner.backgroundMemoryRuleMatches287?.(...args)??fail('Z2')},
  ...versions,
 }
}
let runner:ExtractMemories287|undefined
let productionPorts:ReturnType<typeof createExtractMemoryProductionPorts287>|undefined
export function getExtractMemoryProductionPorts287(){return productionPorts??=createExtractMemoryProductionPorts287()}
export function getExtractMemories287():ExtractMemories287{return runner??=createExtractMemories287(getExtractMemoryProductionPorts287())}
export function toExtractMemoryContext287(context:REPLHookContext):REPLHookContext{
 const tool=context.toolUseContext as REPLHookContext['toolUseContext']&{session?:ReturnType<typeof getExecutionSession287>}
 if(tool.session)return context
 // Real fork contexts inherit setters/cache/tool state. Spreading them drops
 // those fields; only hand in the canonical session through an inherited view.
 return {...context,toolUseContext:Object.assign(Object.create(tool),{session:getExecutionSession287()})}
}
