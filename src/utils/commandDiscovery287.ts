import {createHookEnginePromptCells287} from './hooks/modelSwitch287/engine.js'
import type {Command} from '../types/command.js'
import {OfficialHostCell286} from '../services/policyLimits/officialIdentity286/hostCell.js'
import {relative,isAbsolute,sep} from 'node:path'
import uniqBy from 'lodash-es/uniqBy.js'
import get from 'lodash-es/get.js'
import {createCore287,createNamespace287,createSanitize287,createSpelling287,createSync287,createCache287,createHistory287,createBundledGate287,createSyncOwner287,createSyncGate287,type DiscoveryRegistry287,type DiscoveryPorts287} from './officialPublicCommandDiscovery287/native.js'
import {getCommandRegistry287,commandCapability287,commandDispatch287} from './commandCapability287.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getSettings_DEPRECATED,getSettingsForSource} from './settings/settings.js'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {logError} from './log.js'
import {toError} from './errors.js'
import {getSettingSourceName} from './settings/constants.js'
import commandDiscoveryProof287 from './officialPublicCommandDiscovery287/provenance.json' with {type:'json'}
import {createCommandHook287,createLabels287,createSkillNames287,createBundledList287,createUnicode287,createClip287,createTerminalText287,createPluginLabel287} from './officialPublicCommandDiscovery287/native.js'
import {getIsNonInteractiveSession} from '../bootstrap/state.js'
import {projectConfigTreeCacheKey287} from './projectConfigRoot287.js'
const lazyCommands=()=>require('../commands.js') as typeof import('../commands.js')
const policy=()=>require('../services/policyLimits/index.js') as typeof import('../services/policyLimits/index.js')
const registry=()=>getCommandRegistry287() as DiscoveryRegistry287
const unicode=createUnicode287({}),clip=createClip287({}),terminalText=createTerminalText287({...unicode,...clip}),pluginLabel=createPluginLabel287(unicode)
const labels=createLabels287({}),skillNames=createSkillNames287({ro:registry}),bundledList=createBundledList287({ro:registry})
const feature=(name:string,fallback:unknown)=>(require('../services/analytics/growthbook.js') as typeof import('../services/analytics/growthbook.js')).getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)
const history=createHistory287({U:getExecutionSession287,V:OfficialHostCell286})
const spelling=createSpelling287({}),sanitize=createSanitize287({}),sync=createSync287({}),cache=createCache287({})
export interface CommandSyncFlags287 {skillsSyncVetoed():boolean;replaceSkillsSyncVetoed(value:boolean):void;replaceAccountSkillsSyncEnabled(value:boolean):void}
export const getCommandSyncFlags287=()=>getExecutionSession287().sessionFlags as typeof getExecutionSession287 extends ()=>infer S ? S extends {sessionFlags:infer F}?F&CommandSyncFlags287:never:never
const hostPorts={U:getExecutionSession287,V:OfficialHostCell286}
const syncOwner=createSyncOwner287({...hostPorts,G3t:(value:boolean)=>getCommandSyncFlags287().replaceSkillsSyncVetoed(value),j3t:(value:boolean)=>getCommandSyncFlags287().replaceAccountSkillsSyncEnabled(value)})
const syncGate=createSyncGate287({Rc:()=> (require('./auth.js') as typeof import('./auth.js')).getAuthTokenSource(),Wn:()=>getExecutionSession287().surfaceCapabilities.caps().workspace==='remote'})
const namespaces=createNamespace287({...spelling,...sanitize,...sync,k:feature,x:(info:{repository:string;accountSkillsWrapper?:boolean})=>info.repository==='anthropic-skills@inline'&&info.accountSkillsWrapper===true})
let controller:ReturnType<typeof createCore287>|undefined
let commandHook:ReturnType<typeof createCommandHook287>|undefined
// Public accessor to the original SO.get cell used by G0o. It is host scoped;
// neither history nor command lookup owns another command list.
export const getCommandHistoryDiscovery287=history.state
export const getCommandSyncDiscovery287=syncOwner.state
export const getCommandImmediate287=namespaces.lUe as (command:Command|undefined,args:string,context:'inline'|'fullscreen')=>boolean
export function getCommandDiscoveryRegistry287(){return registry()}
export function createCommandDiscoveryProductionPorts287():DiscoveryPorts287 {
 const skills=()=>require('../skills/loadSkillsDir.js') as typeof import('../skills/loadSkillsDir.js')
 const bundled=()=>require('../skills/bundledSkills.js') as typeof import('../skills/bundledSkills.js')
 const plugins=()=>require('./plugins/loadPluginCommands.js') as typeof import('./plugins/loadPluginCommands.js')
 const builtins=()=>require('../plugins/builtinPlugins.js') as typeof import('../plugins/builtinPlugins.js')
 const builtinRegistry=()=>require('../plugins/bundled/builtinRegistry287.js') as typeof import('../plugins/bundled/builtinRegistry287.js')
 const remembered=()=>{const state=(require('../services/policyLimits/officialIdentityBindings286.js') as typeof import('../services/policyLimits/officialIdentityBindings286.js')).getOfficialPolicyPrincipal286().p();return (state as {verdict?:{rememberedCoreSkills():string[]}}).verdict?.rememberedCoreSkills()??[]}
 const gate=createBundledGate287({a:authEnvironment,tt:getSettings_DEPRECATED,tw:policy().isPolicyAllowed,t:remembered})
 return {...spelling,...sanitize,...sync,...cache,...namespaces,...gate,
  ...terminalText,...pluginLabel,...labels,...skillNames,...bundledList,
  wS:(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js','wS'),
  Yb:createHookEnginePromptCells287({}).Yb,Mh:()=>getExecutionSession287().host.launchOptions.disableSlashCommands(),ro:registry,a:authEnvironment,tt:getSettings_DEPRECATED,ge:getSettingsForSource,ra:get,Ll:uniqBy,ow:getSettingSourceName,
  MU:commandCapability287.builtins,tde:commandCapability287.registerSource,Sce:commandCapability287.availability,vd:commandDispatch287.enabled,
  Ce:getIsNonInteractiveSession,sv:()=>getCommandSyncFlags287().skillsSyncVetoed(),
  // Keep cwd explicit and add the actual launch config tree, never substitute
  // the working directory/project identity with the config override.
  n8:(cwd:string|null)=>cwd===null?cache.n8(cwd):projectConfigTreeCacheKey287(cwd),
  PBt:()=>{const account=(require('./auth.js') as typeof import('./auth.js')).getOauthAccountInfo();return `${authEnvironment.CLAUDE_CODE_ORGANIZATION_UUID??account?.organizationUuid??''}_${account?.accountUuid??authEnvironment.CLAUDE_CODE_ACCOUNT_UUID??''}`},
  Y$t:syncGate.enabled,c_:syncOwner.state,G0o:history.bind,
  jMt:(cwd:string)=>skills().getSkillDirCommands(cwd),Wln:()=>plugins().getPluginSkills(),W4e:()=>plugins().getPluginCommands(),
  jtr:(cwd:string)=> (require('../tools/WorkflowTool/createWorkflowCommand.js') as typeof import('../tools/WorkflowTool/createWorkflowCommand.js')).getWorkflowCommands(cwd),
  jre:()=>bundled().getBundledSkills(),YSn:()=>builtins().getBuiltinPluginSkillCommands(),
  jln:()=>Array.from(getCommandDiscovery287().dynamicState().conditionalSkills.values()),
  qIo:()=> (require('./commandRegistration287.js') as typeof import('./commandRegistration287.js')).getPublicRegistrationSource287().reserved(),NQ:builtinRegistry().readBuiltinPlugins287,
  pH:<T>(rows:T[],predicate:(row:T)=>boolean)=>[rows.filter(predicate),rows.filter(row=>!predicate(row))],
  e1e:sep,Btr:relative,$tr:isAbsolute,as:(error:unknown)=>!!(error as NodeJS.ErrnoException)?.code,d:logError,Z:toError,t:logForDebugging,
  wr:(name:string,value:number)=>logForDebugging(`${name}: ${value}`),i8e:(kind:string,rows:unknown)=>logForDebugging(`${kind} resolution: ${JSON.stringify(rows)}`),
  // Frozen telemetry remains routed to its existing disabled C owner.
  m:(...values:unknown[])=>logForDebugging(values.join(':')),y:(...values:unknown[])=>logForDebugging(values.join(':')),p:(...values:unknown[])=>logForDebugging(values.join(':')),
  rl:(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287('chunk-25eexryw.js','rl'),
 }
}
export function createCommandHookProductionPorts287():Record<string,unknown> {
 const mods=(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
 const pure={...namespaces,...spelling,...sync}
 const imported=Object.fromEntries(commandDiscoveryProof287.groups.commandHook.ports.filter(p=>p.module!=='canonical owner'&&!Object.hasOwn(pure,p.name)).map(p=>[p.name,mods.clearLifecycleSource287(p.module,p.name)]))
 return {...imported,...pure,
  wS:mods.clearLifecycleSource287('chunk-mphp7acd.js','wS'),gvt:mods.clearLifecycleSource287('chunk-mphp7acd.js','gvt'),fa:mods.clearLifecycleSource287('chunk-mphp7acd.js','fa'),
  aRn:(hook:Parameters<ReturnType<typeof createCore287>['installCommandHook']>[0])=>controller!.installCommandHook(hook),
 }
}
export function getCommandDiscovery287(){
 if(controller)return controller
 controller=createCore287(createCommandDiscoveryProductionPorts287())
 try{commandHook=createCommandHook287(createCommandHookProductionPorts287())}catch(error){controller=undefined;throw error}
 // Original _Zn installs yZn once. Registered commands and describe-hook cache
 // are owned by the existing Mods namespace, including its Svt invalidation.
 commandHook.install()
 return controller
}
export function getCommandDescribeHook287(){getCommandDiscovery287();return commandHook!}

