import * as fs from 'node:fs'
import * as net from 'node:net'
import * as path from 'node:path'
import * as os from 'node:os'
import * as crypto from 'node:crypto'
import * as processModule from 'node:process'
import {z} from 'zod/v4'
import type {Tool,ToolPermissionContext} from '../../Tool.js'
import type {PermissionDecision,PermissionAskDecision} from '../../types/permissions.js'
import {filesystemPathRuntime287 as paths} from '../filesystemPathRuntime287.js'
import {createReadPermissions287,type ReadPermissions287} from './officialReadPermissions287/native.js'

// This public reader restores BC and its original helpers, NOT a renamed legacy
// checkReadPermissionForTool. All host dependencies are live existing owners.
function execution(){return (import.meta.require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')).getExecutionSession287()}
function bootstrap(){return import.meta.require('../../bootstrap/state.js') as typeof import('../../bootstrap/state.js')}
function memory(){return import.meta.require('../../constants/systemComposerMemory287.js') as typeof import('../../constants/systemComposerMemory287.js')}
function pathRuntime(){return import.meta.require('../pathRuntime287.js') as typeof import('../pathRuntime287.js')}
function filesystem(){return (import.meta.require('../fsOperations.js') as typeof import('../fsOperations.js')).getFsImplementation()}
function policy(){return (import.meta.require('../../services/context/modelUsagePolicy287.js') as typeof import('../../services/context/modelUsagePolicy287.js')).getModelUsagePolicy287()}
function policyContext(){return (import.meta.require('../../services/context/modelUsagePolicy287.js') as typeof import('../../services/context/modelUsagePolicy287.js')).getModelUsagePolicyContext287()}
// Fresh original read-context view, sharing the existing policy/settings owner.
// Never clone its store, cache, policy records or helper state.
function readContext287(){
 const source=execution().host.settingsSource as {
  flagSettingsPath():string|undefined;flagSettingsInline():Record<string,unknown>|null
  flagSettingsExpectedContent():string|undefined;flagSettingsFilePinnedContent():string|undefined
  useCoworkPlugins():boolean
 }
 return {...policyContext(),cwd:(require('../cwd.js') as typeof import('../cwd.js')).getNullableCwd287(),
  projectConfigDir:(execution().host.launchOptions as unknown as {projectConfigRoot():string|null}).projectConfigRoot()??undefined,
  flagPath:source.flagSettingsPath(),flagInline:source.flagSettingsInline(),
  flagExpectedContent:source.flagSettingsExpectedContent()??source.flagSettingsFilePinnedContent(),
  coworkPlugins:source.useCoworkPlugins()}
}
const unbound=(name:string):never=>{throw new Error(`Original public read policy requires canonical owner ${name}`)}
export type ReadPermissionContext287=ToolPermissionContext & {
 restricted?:boolean;blockReadsOutsideWorkingDirectories?:boolean;servedCall?:boolean
 trustedNetworkDirectories?:ReadonlyMap<string,readonly string[]>
}

/** Exposed for independent raw execution against the SAME actual host inputs. */
export function getReadPermissionPorts287():Record<string,unknown> {
 const growthbook=()=>require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')
 const configHome=()=> (require('../envUtils.js') as typeof import('../envUtils.js')).getClaudeConfigHomeDir()
 const paused=()=>{const s=execution().sessionFlags;return s.memoryToggledOff()||s.autoMemoryOffThisSession()}
 const getAutoDir=()=> (require('../../memdir/paths.js') as typeof import('../../memdir/paths.js')).getAutoMemPath()
 return {
  builtins:{fs,path,os,crypto,net,process:processModule},
  sourceModule:(file:string)=>{if(file==='/$bunfs/root/chunk-8cecavkx.js')return (require('../../tools/EndConversationTool/deferredHint287.js') as typeof import('../../tools/EndConversationTool/deferredHint287.js')).endConversationHint287;return unbound('early read module '+file)},
  sandboxManager:(require('../sandbox/sandbox-adapter.js') as typeof import('../sandbox/sandbox-adapter.js')).SandboxManager,
  sandboxOwner:()=> (require('../sandbox/sandbox-adapter.js') as typeof import('../sandbox/sandbox-adapter.js')).SandboxManager,
  // Lazy view of the one original Ae instance owned by subprocessEnv. No
  // state lives on this facade; construction must not re-enter readOwner.
  subprocessScrubState:{
   get scrubEnabledLatched(){return (require('../subprocessEnv.js') as typeof import('../subprocessEnv.js')).getSubprocessEnvPolicyOwner287().scrubEnabledLatched},
   setScrubEnabledLatched(value:boolean){(require('../subprocessEnv.js') as typeof import('../subprocessEnv.js')).getSubprocessEnvPolicyOwner287().setScrubEnabledLatched(value)},
  },
  za:paths.permissionAncestry,No:paths.readPathCandidates,Sf:paths.ancestry,bo:paths.resolve,
  networkAnchorCrossing:paths.networkAnchorCrossing,uncAnchorCrossing:paths.uncAnchorCrossing,
  networkVolume:paths.isNetworkVolumePath,automountRoot:paths.automountRoot,
  Ln:paths.isUncPath,ca:paths.isAutomountPath,O_:paths.isNetRootPath,SR:paths.isNetworkBrowsePath,
  jS:paths.isKernelNamespacePath,Rl:paths.isLocalWslPath,CD:paths.isNtDevicePath,Sa:paths.hasAmbiguousDotSegment,
  Xe:(value:string,base?:string)=>pathRuntime().expandPath287(value,base),
  jx:(value:string)=>pathRuntime().windowsPathToPosixPath287(value),Z8:(value:string)=>pathRuntime().posixPathToWindowsPath287(value),
  U:execution,a:(require('../authEnvironment.js') as typeof import('../authEnvironment.js')).authEnvironment,
  ae:filesystem,O:()=> (require('../platform.js') as typeof import('../platform.js')).getPlatform(),
  we:configHome,SD:()=>bootstrap().getFlagSettingsPath(),Ee:()=>bootstrap().getOriginalCwd(),
  oe:()=> (require('../cwd.js') as typeof import('../cwd.js')).getCwd(),cr:()=>bootstrap().getProjectRoot(),
  iz:()=>process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR||configHome(),q:()=>bootstrap().getSessionId(),
  Ut:()=>execution().host.launchOptions.diskless(),Co:()=> (execution().host.launchOptions as unknown as {projectConfigRoot():string|null}).projectConfigRoot(),
  GOe:()=>(execution().host.settingsSource as {flagAgentsFilePaths():string[]}).flagAgentsFilePaths(),
  k:(name:string,fallback:boolean)=>growthbook().getFeatureValue_CACHED_MAY_BE_STALE(name,fallback),
  Rs:(actor:{of(host:object):unknown})=>actor.of(execution().host),
  dS:()=>(execution().mcpSessionWiring as {clientsFromAccessor():unknown[]}).clientsFromAccessor(),
  // Private Projects/Web eligibility requires feature-origin metadata; the
  // current public GrowthBook owner exposes values only. Do not invent payload
  // provenance or treat a missing native metadata getter as eligibility.
  Uo:(name:string,fallback:unknown)=>{
   const owner=growthbook() as unknown as {getFeatureValueWithSource287?:(name:string,fallback:unknown)=>unknown}
   return owner.getFeatureValueWithSource287?.(name,fallback)??unbound('GrowthBook.getFeatureValueWithSource287')
  },autoModeActive:()=> (require('./autoModeState.js') as typeof import('./autoModeState.js')).isAutoModeActive(),
  gKr:()=>unbound('GrowthBook.hasUsedNonDefaultHost'),
  settingsStore:()=> (require('../settings/settingsCache.js') as typeof import('../settings/settingsCache.js')).getSettingsCacheStore287(),
  policyRecords:(ctx:import('../../services/context/officialModelUsagePolicy287/native.js').PolicyReadContext287)=>policy().readPolicyRecords287(ctx),
  helperComposition:(ctx:import('../../services/context/officialModelUsagePolicy287/native.js').PolicyReadContext287)=>policy().readPolicyHelperComposition287(ctx),
  M:readContext287,ge:(source:import('../settings/constants.js').SettingSource)=>policy().readSource(source,policyContext()),
  bu:()=>policy().allPolicyTiers(),allPolicyTiers:()=>policy().allPolicyTiers(),
  t:(message:string,options?:{level:'debug'|'info'|'warn'|'error'})=>(require('../debug.js') as typeof import('../debug.js')).logForDebugging(message,options),
  i:(require('../../services/analytics/index.js') as typeof import('../../services/analytics/index.js')).logEvent,
  oz:paused,X0:(value:string)=>{const dir=getAutoDir();return dir!==null&&path.normalize(value).startsWith(dir)},N_t:getAutoDir,
  VUt:()=>memory().getMemoryReadPolicy287().readFenceDirectoryBlocked287(),
  Jbe:()=> (require('../../memdir/paths.js') as typeof import('../../memdir/paths.js')).hasAutoMemPathOverride(),
  xKr:(value:string)=>{const dir=memory().getSystemComposerMemoryDirectoryOwner287().resolveOwnProjectDir();return dir!==undefined&&getReadPermissions287().isMemoryPath(value,dir)&&memory().isPublicAutoMemoryEnabled287()},
  qh:(cwd:string)=>(require('../sessionStorage.js') as typeof import('../sessionStorage.js')).getProjectDir(cwd),
  Oue:(id?:import('../../types/ids.js').SessionId)=>(require('../plans.js') as typeof import('../plans.js')).getPlanSlug(id),
  Kl:()=> (require('../plans.js') as typeof import('../plans.js')).getPlansDirectory(),
  lS:()=> (require('../toolResultStorage.js') as typeof import('../toolResultStorage.js')).getToolResultsDir(),
  // Original Ak/Ep are local functions in the SAME read runtime, sharing TG.
  tempDiagnostic:(_level:string,event:string,data:Parameters<typeof import('../../services/analytics/index.js').logEvent>[1])=>(require('../../services/analytics/index.js') as typeof import('../../services/analytics/index.js')).logEvent(event,data),
  SZe:()=> (require('../settings/managedPath.js') as typeof import('../settings/managedPath.js')).getManagedSettingsDropInDir(),
  // Enterprise WSL machine-policy inheritance is not installed in this app.
  // The optional existing context is authoritative; never manufacture false.
  IU:()=>{const fn=(policyContext() as {wslInherits?:()=>boolean}).wslInherits;if(!fn)return unbound('settings.wslInherits');return fn()},
  pluginRegistry:()=> (require('../plugins/modsRegistryOwner287.js') as typeof import('../plugins/modsRegistryOwner287.js')).modsRegistryOwner287.registry(),
  rL:()=> (require('../httpWorkloadIdentity.js') as typeof import('../httpWorkloadIdentity.js')).getWifAttribution286().SM(),
  wg:()=> (require('../managedEnv.js') as typeof import('../managedEnv.js')).peekPreSettingsEnvironment286(),
  q9:()=> (require('../managedEnv.js') as typeof import('../managedEnv.js')).getAppliedGlobalConfigEnvironment287(),
  He:()=> (require('../model/providers.js') as typeof import('../model/providers.js')).getAPIProvider(),
  At:()=> (require('../privacyLevel.js') as typeof import('../privacyLevel.js')).isEssentialTrafficOnly(),
  vl:()=> (require('../auth.js') as typeof import('../auth.js')).isAnthropicAuthEnabled(),
  fn:()=> (require('../auth.js') as typeof import('../auth.js')).getClaudeAIOAuthTokens(),
  ew:()=> (require('../httpWorkloadIdentity.js') as typeof import('../httpWorkloadIdentity.js')).getWifAttribution286().kb(),wifReadState:{of:()=> (require('../httpWorkloadIdentity.js') as typeof import('../httpWorkloadIdentity.js')).getWifAttribution286().readProtectionState287()},nZ:()=> (require('../auth.js') as typeof import('../auth.js')).getAnthropicApiKey(),fd:()=> (require('../workloadIdentity.js') as typeof import('../workloadIdentity.js')).hasWorkloadIdentityConfiguration(),
  zod_object:z.object,zod_string:z.string,zod_array:z.array,zod_unknown:z.unknown,
  zod_union:z.union,zod_literal:z.literal,zod_looseObject:z.looseObject,zod_boolean:z.boolean,zod_number:z.number,zod_enum:z.enum,zod_record:z.record,
  surface:()=> (require('../../services/context/surface287.js') as typeof import('../../services/context/surface287.js')).getSurfaceIdentity287(),
 }
}
// Same original reader cell, callable during cold cyclic module evaluation.
var readOwner:ReadPermissions287|undefined
export function getReadPermissions287():ReadPermissions287 {
 return readOwner??=createReadPermissions287(getReadPermissionPorts287())
}
export function checkReadDefense287(tool:Tool,input:Record<string,unknown>,context:ReadPermissionContext287,spellings?:string[]):PermissionAskDecision|null {
 return getReadPermissions287().O8n(tool,input,context,spellings)
}
export function checkReadPermission287(tool:Tool,input:Record<string,unknown>,context:ReadPermissionContext287):PermissionDecision {
 return getReadPermissions287().BC(tool,input,context)
}
