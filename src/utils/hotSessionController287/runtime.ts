import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as crypto from 'node:crypto'
import * as processModule from 'node:process'
import * as util from 'node:util'
import * as os from 'node:os'
import * as asyncHooks from 'node:async_hooks'
import * as childProcess from 'node:child_process'
import {isBuiltin} from 'node:module'
import {getToolState287} from '../toolState287.js'
import {createHotEngineFactory287,type HotEngine287} from './engineNative.js'
import engineAliases from './enginePorts.json'
import {createHotEngineFeed287,createHotPendingQueryReader287} from './engineFeed.js'
import {getOfficialTypedDialogCallees287} from '../officialRlt287.js'
import {createHotSessionClasses287,type HotSessionInput287,type HotSessionController287,type HotReplScopeInput287,type HotReplScope287,type HotDraftInput287,type HotDraftController287,type HotDraftValueStore287,type HotDraftStash287,type HotPromptHostInput287,type HotPromptHost287,type HotScrollPin287} from './native.js'
import {createHotSessionClosure287} from './closure/native.js'
import type {LocalJSXCommand,LocalCommandModule} from '../../types/command.js'
import leaves from './closure/sourcePorts.json'
import aliases from './sourcePorts.json'
import {createModsLifecycleProductionPorts287,getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../hooks/outsideRuntime287.js'
import {sourceModelSwitch287} from '../hooks/modelSwitch287/runtime.js'
import {getResumeController287} from '../resumeController287.js'
import {createSessionRestoreProductionPorts287,getSessionRestoreBody287} from '../sessionRestoreBody287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {getExecutionSession287,getLegacyExecutionContext287,getRootExecutionSession287,executionSessionRegistryConstructor287,runWithExecutionSession287} from '../../services/context/execution287.js'
import {getResumeHookMetadataOwner287} from '../sessionStorage.js'
import {normalizeMessages,normalizeAttachmentForAPI,isCompactBoundaryMessage} from '../messages.js'
import {logEvent} from '../../services/analytics/index.js'
import {loadAllPlugins,loadAllPluginsCacheOnly} from '../plugins/pluginLoader.js'
import {retryModelSwitchHookRegistration287,clearModelSwitchPluginCache287} from '../hooks/modelSwitch287/registration.js'
import {resolveAgentTools} from '../../tools/AgentTool/agentToolUtils.js'
import {getTools} from '../../tools.js'
import {FileReadTool} from '../../tools/FileReadTool/FileReadTool.js'
import {FileWriteTool} from '../../tools/FileWriteTool/FileWriteTool.js'
import {FileEditTool} from '../../tools/FileEditTool/FileEditTool.js'
import {GlobTool} from '../../tools/GlobTool/GlobTool.js'
import {GrepTool} from '../../tools/GrepTool/GrepTool.js'
import {BashTool} from '../../tools/BashTool/BashTool.js'
import {NotebookEditTool} from '../../tools/NotebookEditTool/NotebookEditTool.js'
import {WebFetchTool} from '../../tools/WebFetchTool/WebFetchTool.js'
import {verifyApiKey} from '../../services/api/claude.js'
import {restoreRemoteAgentTasks287} from '../../tasks/RemoteAgentTask/remoteRestore287.js'
import {QueryGuard} from '../QueryGuard.js'
import {createHotSpinnerAdopterFactory287,type HotSpinnerStore287} from './spinnerAdopterNative.js'
import spinnerAdopterProof287 from './spinnerAdopterProvenance.json'
import {requireOfficialRltSpinnerState287} from '../../state/officialRltSpinner287.js'

const invocation=new asyncHooks.AsyncLocalStorage<HotSessionInput287>()
function readInvocation(){const input=invocation.getStore();if(!input)throw Error('Hot controller requires its actual mounted session/store');return input}
/** The factory is stateless except its original actor slots. Stateful source
 * cuts refer to the already-installed Mods/PA/restoration owners. */
export function createHotSessionProductionPorts287(bindings:typeof leaves=leaves):Record<string,unknown>{
 const restored=createSessionRestoreProductionPorts287(),literalNamespaces=new Map<string,unknown>();let canonicalSharedPorts:ReturnType<typeof createModsLifecycleProductionPorts287>|undefined
 const ports:Record<string,unknown>={
  engineFactory:(input:Parameters<ReturnType<typeof createHotEngineFactory287>>[0])=>getProductionHotEngineFactory287()(input),
  queryEngineRun:(...args:Parameters<typeof import('../../query.js').query>)=>(require('../../query.js') as typeof import('../../query.js')).query(...args),
  memoryFiles:(...args:Parameters<typeof import('../claudemd.js').getMemoryFilesForSession287>)=>(require('../claudemd.js') as typeof import('../claudemd.js')).getMemoryFilesForSession287(...args),
  sdkClient:(...args:Parameters<typeof import('../../services/api/client.js').getAnthropicClient>)=>(require('../../services/api/client.js') as typeof import('../../services/api/client.js')).getAnthropicClient(...args),
  get sandboxManager(){
   // The actual manager now exposes the complete original 287 warning ABI.
   // Share that owner with MCP serve; no per-reader facade or warning cells.
   return (require('../sandbox/sandbox-adapter.js') as typeof import('../sandbox/sandbox-adapter.js')).SandboxManager
  },
  artifactLiveHostBoundary:()=>{throw Error('Live artifact workspace host is not installed (R04)')},
  resumeAgentExecutor:(...args:Parameters<typeof import('../../tools/AgentTool/resumeAgent.js').resumeAgentBackground>)=>(require('../../tools/AgentTool/resumeAgent.js') as typeof import('../../tools/AgentTool/resumeAgent.js')).resumeAgentBackground(...args),
  renderInk:(...args:Parameters<typeof import('../../ink.js').render>)=>(require('../../ink.js') as typeof import('../../ink.js')).render(...args),
  // Accepted C: cancel the entire automatic glyph telemetry collector.
  // Existing platform C/real opener and installed QR package, not new services or state.
  desktopInstallStatus287:()=> (require('../desktopDeepLink.js') as typeof import('../desktopDeepLink.js')).getDesktopInstallStatus(),
  desktopOpenCurrent287:()=> (require('../desktopDeepLink.js') as typeof import('../desktopDeepLink.js')).openCurrentSessionInDesktop(),
  desktopDownloadUrl287:()=> (require('../../components/DesktopHandoff.js') as typeof import('../../components/DesktopHandoff.js')).getDownloadUrl(),
  sessionQrToString287:(text:string,options:{type:'utf8';errorCorrectionLevel:'L';margin:number})=> (require('qrcode') as typeof import('qrcode')).toString(text,options),
  glyphTelemetry:()=>{},
  sessionTitle:(...args:Parameters<typeof import('../sessionTitle.js').generateSessionTitle>)=>(require('../sessionTitle.js') as typeof import('../sessionTitle.js')).generateSessionTitle(...args),
  installLiteralNamespace287:(specifier:string,namespace:unknown)=>literalNamespaces.set(specifier,namespace),
  'tool:Read':FileReadTool,'tool:Write':FileWriteTool,'tool:Edit':FileEditTool,'tool:Glob':GlobTool,'tool:Grep':GrepTool,'tool:Bash':BashTool,'tool:NotebookEdit':NotebookEditTool,'tool:WebFetch':WebFetchTool,
  typedDialogD:getOfficialTypedDialogCallees287().D,typedDialogT:getOfficialTypedDialogCallees287().T,
  builtins:new Proxy<Record<string,unknown>>({fs,'fs/promises':fsPromises,path,crypto,process:processModule,util,os,async_hooks:asyncHooks,child_process:childProcess,'path/win32':path.win32},{get:(modules,key)=>{
   if(typeof key!=='string')return undefined
   if(Object.hasOwn(modules,key))return modules[key]
   if(!isBuiltin(key))throw Error('Unregistered hot native builtin '+key)
   return require(key) as unknown
  }}),
  storageV5MigrationBoundary:()=>{throw Error('StorageV5 migration host is not installed (R04)')},
  commandReader:(cwd:string,storage:unknown)=>(require('../commandDiscovery287.js') as typeof import('../commandDiscovery287.js')).getCommandDiscovery287().commands(cwd,storage),get recapCommand(){return (require('../../commands/recap/index.js') as typeof import('../../commands/recap/index.js')).default},resolveAgentTools,initialToolRegistry:getTools,verifyApiKey,productMetadata:MACRO,session:getExecutionSession287,legacyExecution:getLegacyExecutionContext287,rootExecution:getRootExecutionSession287(),sessionRegistry:executionSessionRegistryConstructor287,
  normalizeMessages,normalizeAttachment:normalizeAttachmentForAPI,preserveFallbackC:(messages:unknown)=>messages,
  metadataOwner:getResumeHookMetadataOwner287,analytics:logEvent,
  pluginCacheOnly:loadAllPluginsCacheOnly,pluginLoad:loadAllPlugins,hookRegistration:retryModelSwitchHookRegistration287,pluginClear:clearModelSwitchPluginCache287,
  // Original qMt/V6o receives the actual registry, storage and credentials.
  // C polling/log projection still uses this very AppStore; no second task owner.
  restoreRemoteTasks:(options:Parameters<typeof restoreRemoteAgentTasks287>[0])=>{const input=readInvocation();return restoreRemoteAgentTasks287(options,{abortController:options.abortController,getAppState:input.store.getState,setAppState:input.store.setState})},
  nativeRequire:(specifier:string)=>{
   if(literalNamespaces.has(specifier))return literalNamespaces.get(specifier)
   // Shared original text assets also serve deferred clients; no duplicate assets/cache.
   const resources=require('../plugins/officialHooksLifecycle287/embeddedResources287.js') as typeof import('../plugins/officialHooksLifecycle287/embeddedResources287.js')
   if(resources.hasEmbeddedTextResource287(specifier))return resources.requireEmbeddedTextResource287(specifier)
   const builtins=ports.builtins as Record<string,unknown>;if(Object.hasOwn(builtins,specifier))return builtins[specifier]
   if(isBuiltin(specifier))return require(specifier) as unknown

   if(specifier==='/$bunfs/root/chunk-fgp2pfm6.js'){const eligible=getHotSessionLeaves287().isArtifactToolEligible;if(typeof eligible!=='function')throw Error('Original artifact eligibility source not installed');return {isArtifactToolEligible:eligible}}
   if(specifier==='/$bunfs/root/chunk-3tc44sbx.js')return require('../../coordinator/coordinatorMode.js') as typeof import('../../coordinator/coordinatorMode.js')
   if(specifier==='/$bunfs/root/chunk-98tn1pps.js')return require('../../tools/PowerShellTool/PowerShellTool.js') as typeof import('../../tools/PowerShellTool/PowerShellTool.js')
   // xc4 only re-exports the complete y1t8 declarations. B77 already installed
   // their stateful Project owner; exposing it avoids a second kept-detail cell.
   if(specifier==='/$bunfs/root/chunk-xc4mv6z7.js')return Object.defineProperties({},Object.fromEntries(Object.entries({forgetKeptProjectDetail:'IBn',getProjectContextBlock:'uas',retryProjectContextWhenPolicyLands:'das',safeInline:'n1'} as const).map(([exportName,name])=>[exportName,{enumerable:true,get:()=>(require('../../services/context/projects287.js') as typeof import('../../services/context/projects287.js')).getProjectsContext287()[name]}])))
   return restored.nativeRequire(specifier)
  },
  nativeImport:async(specifier:string)=>{
   // Original Joo/Ci lazy public client imports borrow this same factory's
   // existing canonical leaves. No private workspace or second flag owner.
   const artifactImports:Record<string,readonly [string,string]>={
    '/$bunfs/root/chunk-tv06v0ct.js':['initializeGrowthBook','headlessArtifactWarmFlags'],
    '/$bunfs/root/chunk-w7h5k08q.js':['isArtifactFetchEnabled','headlessArtifactFetchEnabled'],
    '/$bunfs/root/chunk-3b4yxh25.js':['listRegisteredSessionRecords','headlessArtifactSessionRecords'],
    '/$bunfs/root/chunk-xqmhrz3g.js':['isShuttingDown','headlessArtifactIsShuttingDown'],
   }
   const artifactImport=artifactImports[specifier]
   if(artifactImport){const [name,root]=artifactImport,value=getHotSessionLeaves287()[root];if(typeof value!=='function')throw Error('Original artifact client import not installed '+specifier);return {[name]:value}}
   if(specifier==='/$bunfs/root/chunk-akgv8qbe.js')return require('../asciicast.js') as typeof import('../asciicast.js')
   if(specifier==='/$bunfs/root/chunk-bjz56zsm.js'){
    const call=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-bjz56zsm.js','l')
    if(typeof call!=='function')throw Error('Original powerup command source is not installed')
    return {call}
   }
   return restored.nativeImport(specifier)
  },
 }
 for(const binding of bindings){const [role,file,name]=binding.port.split(':');if(role==='tool')continue;Object.defineProperty(ports,binding.port,{enumerable:true,get:()=>{
  let value:unknown
  if(role==='sharedPort'&&file==='executeOutsideHooks')value=getOutsideHookRuntime287().outside
  else if(role==='sharedPort'){const source=canonicalSharedPorts??=createModsLifecycleProductionPorts287();if(!Object.hasOwn(source,file!))throw Error('Canonical hot application port not installed '+binding.port);value=Reflect.get(source,file!)}
  else if(role==='source')value=getOriginalModsLifecycle287().clearLifecycleSource287(file!,name!)
  else if(role==='hot'){const module=getHotSessionLeaves287().sourceModule(file!);if(!module||!Object.hasOwn(module,name!))throw Error('Original hot dialog dependency not installed '+binding.port);value=module[name!]}
  else if(role==='outside'){const module=getOutsideHookRuntime287().sourceModule(file!);if(!Object.hasOwn(module,name!))throw Error('Hot outside declaration not selected '+binding.port);value=module[name!]}
  else if(role==='resume'){const module=getResumeController287().sourceModule(file!);if(!module||!Object.hasOwn(module,name!))throw Error('Hot resume declaration not selected '+binding.port);value=module[name!]}
  else if(role==='restore')value=getSessionRestoreBody287().sourceBinding(file!,name!)
  else if(role==='restorePort'){if(!Object.hasOwn(restored,name!))throw Error('Hot restore producer not selected '+binding.port);value=Reflect.get(restored,name!)}
  else if(role==='modelSwitch'){if(!Object.hasOwn(sourceModelSwitch287,name!))throw Error('Hot ModelSwitch producer not selected '+binding.port);value=Reflect.get(sourceModelSwitch287,name!)}
  // An actually selected original `var c`/`void 0` is a genuine build gate,
  // not an uninstalled declaration. Source namespace getters check ownership.
  return value
 }})}
 return ports
}
let source:ReturnType<typeof createHotSessionClosure287>|undefined
export function getHotSessionLeaves287(){return source??=createHotSessionClosure287(createHotSessionProductionPorts287())}
const originalDialogExports287={autocompact:'autocompactDialogCall',bug:'bugDialogCall','pro-trial-expired':'proTrialExpiredDialogCall','release-notes':'releaseNotesDialogCall',desktop:'desktopDialogCall','remote-env':'remoteEnvDialogCall',session:'sessionDialogCall','web-setup':'webSetupDialogCall',advisor:'advisorDialogCall',artifacts:'artifactsDialogCall','auto-mode-setup':'autoModeDialogCall','cloud-plugins':'cloudPluginsDialogCall','autofix-pr':'autofixPrDialogCall','design-login':'designLoginDialogCall',ultraplan:'ultraplanDialogCall'} as const
let originalDialogs287:ReturnType<typeof import('./dialogCommands/native.js').createOriginalDialogCommands287>|undefined
/** Transport the complete deferred modules to the same registry object. */
function readOriginalDialogCommands287():NonNullable<typeof originalDialogs287>{
 if(!originalDialogs287){
  const {createOriginalDialogCommands287}=require('./dialogCommands/native.js') as typeof import('./dialogCommands/native.js')
  const bindings=require('./dialogCommands/sourcePorts.json') as typeof leaves
  originalDialogs287=createOriginalDialogCommands287(createHotSessionProductionPorts287(bindings))
 }
 return originalDialogs287
}
export function loadOriginalDialogCommand287(name:keyof typeof originalDialogExports287):Awaited<ReturnType<NonNullable<LocalJSXCommand['load']>>>{
 return {call:readOriginalDialogCommands287()[originalDialogExports287[name]]}
}
/** The headless original Y shares the exact same published dependency factory. */
export function loadOriginalAutoModeSetupTextCommand287():LocalCommandModule{
 return {call:readOriginalDialogCommands287().autoModeTextCall}
}
/** Original nJ/XI actor adopts the existing AppStore session Map. The WeakMap
 * caches only the stable actor identity; no parallel hook storage is created. */
const hotHookRegistries287=new WeakMap<import('../../state/AppStateStore.js').AppStateStore,HotSessionHooksRegistry287>()
export type HotSessionHooksRegistry287=import('../../commands/goal/goalContext287.js').GoalSessionHooks287 & {
 sessions:import('../../state/AppStateStore.js').AppState['sessionHooks'];
 clear(id:string):void;has(id:string,event:import('../../entrypoints/agentSdkTypes.js').HookEvent):boolean;
 getFunctionHooks(id:string,event:import('../../entrypoints/agentSdkTypes.js').HookEvent):ReturnType<typeof import('../hooks/sessionHooks.js').getSessionFunctionHooks>;
}
export function getProductionHotSessionHooksRegistry287(store:import('../../state/AppStateStore.js').AppStateStore):HotSessionHooksRegistry287 {
 const current=hotHookRegistries287.get(store);if(current)return current
 const factory=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-09m4fzsj.js','nJ')
 if(typeof factory!=='function')throw Error('Original session hook registry nJ is not installed')
 const registry=factory() as HotSessionHooksRegistry287
 Object.defineProperty(registry,'sessions',{configurable:true,enumerable:true,get:()=>store.getState().sessionHooks})
 hotHookRegistries287.set(store,registry)
 return registry
}
export function createHotSessionClassPorts287(overrides:Record<string,unknown>={}){
 const leaves=getHotSessionLeaves287(),declared=new Set(aliases.map(p=>p.alias))
 const namespace=new Proxy<Record<string,unknown>>({}, {
  has:(_target,key)=>typeof key==='string'&&(declared.has(key)||key==='nativeRequire'||key==='nativeImport'),
  get:(_target,key)=>{
   if(key===Symbol.unscopables)return undefined
   if(typeof key!=='string')return undefined
   if(key==='nativeRequire'||key==='nativeImport')return createHotSessionProductionPorts287()[key]
   if(!Object.hasOwn(leaves,key))throw Error('Uninstalled hot capability '+key)
   const value=Object.hasOwn(overrides,key)?overrides[key]:leaves[key]
   return value
  },
 })
 return namespace
}
export function createProductionHotReplScope287(input:HotReplScopeInput287,dialogTransport:unknown):HotReplScope287{
 // Constructor ports adopt the already-live source transport and tool-state
 // owner. RW remains the sole read-file/cache, Memory selector and scope actor.
 const {ReplSessionScope}=createHotSessionClasses287(createHotSessionClassPorts287({Vxe:()=>dialogTransport,YL:class{constructor(){return getToolState287(input.session)}}}))
 const scope=runWithExecutionSession287(input.session,()=>new ReplSessionScope(input))
 // React/store callbacks do not inherit the constructor's AsyncLocalStorage
 // frame. Capture the selected session at this native ABI boundary; original
 // methods, returned snapshots, subscription releases and actor slots stay put.
 bindHotSessionCalls287(scope,input.session)
 bindHotSessionCalls287(scope.sessionBinding,input.session)
 for(const key of ['composer','transcript']){
  const value=scope.sessionBinding[key]
  if(value!==null&&typeof value==='object')bindHotSessionCalls287(value,input.session)
 }
 return scope
}
function bindHotSessionCalls287(target:object,session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287):void {
 // AsyncGenerator.next lives two prototype levels up, unlike class methods.
 // Capture that actual inherited ABI too; otherwise SDK callers resume Q6e
 // under the ambient root host after construction. No actor/queue is copied.
 const chain:object[]=[target]
 for(let prototype=Object.getPrototypeOf(target);prototype&&prototype!==Object.prototype;prototype=Object.getPrototypeOf(prototype))chain.push(prototype)
 const fields=new Set(chain.flatMap(value=>Reflect.ownKeys(value)))
 for(const key of fields){
  if(key==='constructor')continue
  const descriptor=chain.map(value=>Object.getOwnPropertyDescriptor(value,key)).find(value=>value!==undefined)
  if(!descriptor)continue
  if(typeof descriptor.value==='function'){
   const original=descriptor.value as (...args:unknown[])=>unknown
   Object.defineProperty(target,key,{...descriptor,value:(...args:unknown[])=>runWithExecutionSession287(session,()=>original.apply(target,args))})
  }else if(descriptor.get){
   const read=descriptor.get
   Object.defineProperty(target,key,{...descriptor,get:()=>runWithExecutionSession287(session,()=>read.call(target))})
  }
 }
}
export function createProductionHotSessionController287(input:HotSessionInput287):HotSessionController287{
 const leaves=getHotSessionLeaves287()
 // Preserve the complete original command descriptor; only its literal module
 // import ABI resolves to the existing compact owner and its lease/C wrapper.
 const {SessionController}=createHotSessionClasses287(createHotSessionClassPorts287({ZKe:{...(leaves.ZKe as object),load:()=>import('../../commands/compact/compact.js')}}))
 const controller=runWithExecutionSession287(input.session,()=>new SessionController(input))
 bindHotSessionCalls287(controller,input.session)
 const resume=controller.resume,subscribe=controller.subscribe
 // Context adapter only: the original whole arrow, fields and private owner
 // remain on this instance, including _publish and restoration ordering.
 controller.subscribe=listener=>runWithExecutionSession287(input.session,()=>subscribe(listener))
 controller.resume=(id,log,entrypoint)=>runWithExecutionSession287(input.session,()=>invocation.run(input,()=>resume(id,log,entrypoint)))
 const compact=controller.compactConversation
 controller.compactConversation=options=>runWithExecutionSession287(input.session,()=>invocation.run(input,()=>compact(options)))
 const start=controller.start,onInit=controller.onInit
 controller.onInit=()=>runWithExecutionSession287(input.session,()=>invocation.run(input,()=>onInit()))
 controller.start=()=>{
  const stop=runWithExecutionSession287(input.session,()=>invocation.run(input,()=>start()))
  return ()=>runWithExecutionSession287(input.session,()=>invocation.run(input,stop))
 }
 return controller
}

/** Complete original kq adopts the existing SandboxManager. bq.start owns
 * its subscription/stop; the screen only supplies its actual prompt queue. */
export function createProductionHotSandbox287(input:import('./native.js').HotSandboxInput287,session=getExecutionSession287()):import('./native.js').HotSandbox287 {
 const {SandboxController}=createHotSessionClasses287(createHotSessionClassPorts287())
 const owner=runWithExecutionSession287(session,()=>new SandboxController(input))
 bindHotSessionCalls287(owner,session)
 return owner
}

/** C's public startup still supplies a promise. Mct owns the cancellation
 * generation/placement; bq alone lands it, including after session switches. */
export function createProductionHotPendingHooks287(promise:Promise<import('../../types/message.js').HookResultMessage[]>,session=getExecutionSession287()):import('./native.js').HotPendingHooks287 {
 const make=getHotSessionLeaves287().Mct as (placement:'head',run:(signal:AbortSignal)=>typeof promise)=>import('./native.js').HotPendingHooks287
 return runWithExecutionSession287(session,()=>make('head',()=>promise))
}

/** The original flr tail used by kee and the print arrival owner. Native IJ
 * and bq share this one tail; begin is the original randomUUID ABI. */
export function createProductionHotTurnEvents287(transcript:import('./native.js').HotTranscript287,session=getExecutionSession287()) {
 const {getPrintHostSource287}=require('../../cli/printOwnership287/publicHostRuntime287.js') as typeof import('../../cli/printOwnership287/publicHostRuntime287.js')
 const make=getPrintHostSource287('chunk-n2zepamy.js','flr') as (deliver:(rows:import('../../types/message.js').Message[])=>void)=>{enqueue(name:string,read:()=>Promise<import('../../types/message.js').Message[]>):void;reset():void;sever():void;settled():Promise<unknown>}
 const tail=runWithExecutionSession287(session,()=>make(rows=>transcript.apply({type:'append',messages:rows})))
 bindHotSessionCalls287(tail,session)
 return {tail,turnEvents:{begin:crypto.randomUUID,enqueue:tail.enqueue}}
}

export function getHotDraftValueStore287(session=getExecutionSession287()):HotDraftValueStore287{
 const read=getHotSessionLeaves287().draftValueStore as (session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287)=>HotDraftValueStore287
 return read(session)
}
export function createProductionHotDraft287(input:Omit<HotDraftInput287,'valueStore'>,session=getExecutionSession287(),initialValue?:string):HotDraftController287{
 const valueStore=getHotDraftValueStore287(session)
 if(initialValue!==undefined)(getHotSessionLeaves287().draftSetValue as (store:HotDraftValueStore287,value:string)=>void)(valueStore,initialValue)
 const {DraftController}=createHotSessionClasses287(createHotSessionClassPorts287())
 return runWithExecutionSession287(session,()=>new DraftController({...input,valueStore}))
}
export function setHotDraftStash287(session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287,value:HotDraftStash287|undefined):void {
 const write=getHotSessionLeaves287().draftSetStash as (store:HotDraftValueStore287,value:HotDraftStash287|null)=>void
 write(getHotDraftValueStore287(session),value??null)
}
export function createProductionHotPromptHost287(input:HotPromptHostInput287):HotPromptHost287{
 const {PromptSubmitController}=createHotSessionClasses287(createHotSessionClassPorts287())
 const host=new PromptSubmitController(input);bindHotSessionCalls287(host,input.session??getExecutionSession287());return host
}

/** WJ/AH and print consume this one complete original Ctt dispatcher.
 * The source root is installed with --all-public, never a legacy fallback. */
export function processHotUserInput287(input:import('./native.js').HotUserInput287):Promise<import('./native.js').HotUserInputResult287>{
 const dispatch=getHotSessionLeaves287().processInput
 if(typeof dispatch!=='function')throw Error('Complete hot Ctt dispatcher has not been installed')
 const session=input.context.session??getExecutionSession287()
 return runWithExecutionSession287(session,()=>dispatch(input)) as Promise<import('./native.js').HotUserInputResult287>
}

/** Local C presentation callers still pass the previous UI-only parameter.
 * Ctt uses the mounted RW localJsx/requestDialog instead; translate only that
 * ABI and its old attachment boolean, keeping the complete native dispatch. */
export const processReplHotUserInput287:typeof import('../processUserInput/processUserInput.js').processUserInput=({setToolJSX:_setToolJSX,skipAttachments,...input})=>processHotUserInput287({...input,skipAttachments:skipAttachments?'all':undefined})

/** Source names only. All methods retain their existing command/poll owner. */
export function getProductionHotMessageQueue287(){
 const queue=require('../messageQueueManager.js') as typeof import('../messageQueueManager.js')
 return {...queue,subscribe:queue.subscribeToCommandQueue,countPendingWakePollEvents:queue.countWakePollEvents287,countRemainingWakePollEventsAfter:queue.countRemainingWakePollEventsAfter287}
}

let engineFactory:ReturnType<typeof createHotEngineFactory287>|undefined
export function getProductionHotEngineFactory287(){
 if(engineFactory)return engineFactory
 const names=new Set(engineAliases.map(binding=>binding.alias))
 const namespace=new Proxy<Record<string,unknown>>({}, {
  has:(_target,key)=>typeof key==='string'&&(names.has(key)||key==='nativeRequire'||key==='nativeImport'),
  get:(_target,key)=>{
   if(key===Symbol.unscopables)return undefined
   if(typeof key!=='string')return undefined
   if(key==='nativeRequire'||key==='nativeImport')return createHotSessionProductionPorts287()[key]
   const leaves=getHotSessionLeaves287(),root='engine_'+key
   if(!Object.hasOwn(leaves,root))throw Error('Unmounted hot engine capability '+key)
   return leaves[root]
  },
 })
 return engineFactory=createHotEngineFactory287(namespace)
}
/** Same source Q6e/ALS ABI for print TS and REPL; no SDK serialization wrapper. */
export function createProductionSdkEngine287(input:import('./engineNative.js').HotEngineOptions287,session=getExecutionSession287()):HotEngine287 {
 const engine=runWithExecutionSession287(session,()=>getProductionHotEngineFactory287()(input))
 bindHotSessionCalls287(engine,session)
 return engine
}
export function getHotEngineQueueConstructor287():new<T>()=>AsyncIterable<T>&{enqueue(value:T):void;done():void} {
 return getHotSessionLeaves287().engine_Pw as new<T>()=>AsyncIterable<T>&{enqueue(value:T):void;done():void}
}
export interface HotEngineFeed287 {input:null|{enqueue(packet:import('./engineNative.js').HotEnginePacket287):void;done():void};pendingQueryParams:import('../../query.js').QueryParams[];readLock:{acquire():Promise<()=>void>}}
export function createProductionHotEngine287(input:{session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287;store:import('../../state/AppStateStore.js').AppStateStore;scope:HotReplScope287}){
 const leaves=getHotSessionLeaves287()
 const lock=leaves.engineReadLock as ()=>HotEngineFeed287['readLock']
 const feed=createHotEngineFeed287(lock)
 const readPendingQueryParams=createHotPendingQueryReader287(feed)
 const create=leaves.createSessionEngine as (input:{store:import('../../state/AppStateStore.js').AppStateStore;scope:HotReplScope287;readPendingQueryParams:typeof readPendingQueryParams})=>HotEngine287
 const engine=runWithExecutionSession287(input.session,()=>create({...input,readPendingQueryParams}))
 bindHotSessionCalls287(engine,input.session)
 return {engine,feed,readPendingQueryParams}
}
/** kee's atomic engine/IJ/YJ initialization. The engine's pending-params
 * callback closes over IJ itself: no stand-alone second engineFeed survives.
 * QueryGuard is the existing C admission ABI, owned once by IJ's constructor.
 * The main transcript's actual React/C projection remains the sole writer. */
export function createProductionHotTurnBootstrap287(input:{
 session:ExecutionSession287;store:import('../../state/AppStateStore.js').AppStateStore;scope:HotReplScope287;
 presentation:'inline'|'fullscreen';clock:import('../../ink/components/ClockContext.js').Clock;
 initialMessages:import('../../types/message.js').Message[];initialExternalLoading:boolean;
 preserveCompactHistory?:boolean;
 onTimingChange(update:Record<string,unknown>):void;
 adoptContext?(original:import('../../utils/processUserInput/processUserInput.js').ProcessUserInputContext,messages:import('../../types/message.js').Message[],newMessages:import('../../types/message.js').Message[],controller:AbortController,model:string):import('../../utils/processUserInput/processUserInput.js').ProcessUserInputContext;
 project(next:import('../../types/message.js').Message[],previous:import('../../types/message.js').Message[]):void;
}) {
 return runWithExecutionSession287(input.session,()=>{
  const leaves=getHotSessionLeaves287(),source=getOriginalModsLifecycle287();
  const {TurnController,Transcript}=createHotSessionClasses287(createHotSessionClassPorts287({cSe:QueryGuard}));
  let turn:import('./native.js').HotTurnController287,transcript:import('./native.js').HotTranscript287;
  const readPendingQueryParams=()=>turn.readPendingQueryParams();
  const create=leaves.createSessionEngine as (options:{store:import('../../state/AppStateStore.js').AppStateStore;scope:HotReplScope287;readPendingQueryParams:typeof readPendingQueryParams})=>HotEngine287;
  const engine=create({store:input.store,scope:input.scope,readPendingQueryParams});
  bindHotSessionCalls287(engine,input.session);
  const probe=source.clearLifecycleSource287('chunk-nzck9a32.js','GAt') as ()=>boolean;
  const visible=source.clearLifecycleSource287('chunk-1ypw9bby.js','RPn') as (reduced:boolean|undefined,probe:boolean)=>boolean;
  const terminalProbe=probe();
  const frameNotifier=source.clearLifecycleSource287('chunk-fvc3vhv1.js','Wpr') as import('./native.js').HotTurnInput287['frameNotifier'];
  turn=new TurnController({engine,ownsEngine:true,presentation:input.presentation,
   initialExternalLoading:input.initialExternalLoading,initialHaikuTitleAttempted:input.initialMessages.length>0,
   onTimingChange:input.onTimingChange,frameNotifier,
   stream:{scheduleTimeout:input.clock.setTimeout,isStreamingTextVisible:()=>visible(input.store.getState().settings.prefersReducedMotion,terminalProbe),getTranscriptLength:()=>transcript.getSnapshot().length},
  });
  bindHotSessionCalls287(turn,input.session);bindHotSessionCalls287(turn.stream,input.session);
  // IJ.run and its public context builder share this very original method.
  // Adopt only its result, so C retry/thinking/history fields are not bypassed
  // by the full native run path (nor maintained in a second context cache).
  if(input.adoptContext){
   const contextOwner=turn as typeof turn&{_buildToolUseContextWith(host:unknown,messages:import('../../types/message.js').Message[],newMessages:import('../../types/message.js').Message[],controller:AbortController,model:string):import('../../utils/processUserInput/processUserInput.js').ProcessUserInputContext};
   const build=contextOwner._buildToolUseContextWith;
   contextOwner._buildToolUseContextWith=(host,messages,newMessages,controller,model)=>input.adoptContext!(build(host,messages,newMessages,controller,model),messages,newMessages,controller,model);
  }
  transcript=new Transcript({initial:input.initialMessages,project:(next,previous)=>{
   turn.stream.trackTranscriptWrite(previous,next);input.project(next,previous);
  }});
  bindHotSessionCalls287(transcript,input.session);
  if(input.preserveCompactHistory){
   const keep=transcript.keep;
   // Frozen C: visible history is not the active API context. Native IJ uses
   // these two compact operations; preserve the same YJ rows, while query's
   // existing latest-boundary slice still selects model-facing messages.
   transcript.keep=(change,buffered)=>{
    if(change.type==='replace-all'&&change.messages.some(isCompactBoundaryMessage))
     return keep({type:'append',messages:change.messages},buffered);
    if(change.type==='remove-uuids-and-append'&&isCompactBoundaryMessage(change.message))
     return keep({type:'append',messages:[change.message]},buffered);
    return keep(change,buffered);
   };
  }
  return {engine,turn,transcript,feed:turn.engineFeed,readPendingQueryParams};
 });
}

export interface HotPermissionRelays287 {
 readonly bridge:unknown;readonly channel:unknown;
 connectBridge(value:unknown):void;disconnectBridge():void;setChannel(value:unknown):void;
}
/** Full FRe/Frr selects capabilities and callbacks from the existing clients.
 * Its wrapper is stateless; it never creates another transport or manager. */
export function selectProductionHotRemote287(input:{
 direct:{isRemoteMode:boolean};ccr:{isRemoteMode:boolean};ccrViewerOnly?:boolean;ccrSessionId?:string;
},session=getExecutionSession287()):import('./native.js').HotRemoteTransport287['activeRemote'] {
 return runWithExecutionSession287(session,()=>{
  const source=getOriginalModsLifecycle287();
  const select=source.clearSourceModule287('chunk-f2cpzzp9.js').FRe as (value:typeof input&{ssh:unknown})=>import('./native.js').HotRemoteTransport287['activeRemote'];
  return select({...input,ssh:source.clearSourceModule287('chunk-2ynta9xc.js').Lrr});
 });
}
/** One original DDn is shared by IJ's dialogs and the mounted PZe bridge. */
export function createProductionHotPermissionRelays287(session=getExecutionSession287()):HotPermissionRelays287 {
 return runWithExecutionSession287(session,()=>{
  const create=getOriginalModsLifecycle287().clearSourceModule287('chunk-f2cpzzp9.js').rvo as ()=>HotPermissionRelays287;
  return create();
 });
}
export interface HotBridgeCallbacks287 {
 sendBridgeResult(result?:unknown):void;
 stampBridgeReply(value:{assistantUuid:string;userMessageUuid:string}):void;
}
/** Calls the whole original bSe/PZe hook against the actual host owners.
 * The original hook owns handle/lifecycle refs; this adapter stores none. */
export function useProductionHotBridge287(input:{
 turn:import('./native.js').HotTurnController287;transcript:import('./native.js').HotTranscript287;
 scope:HotReplScope287;permissionRelays:HotPermissionRelays287;transport:import('./native.js').HotRemoteTransport287;
 spawnThinkingConfig:import('../thinking.js').ThinkingConfig;thinkingDisplayFlag?:boolean;
 customSystemPrompt?:string;appendSystemPrompt?:string;
},session=getExecutionSession287()):HotBridgeCallbacks287 {
 return runWithExecutionSession287(session,()=>{
  const useBridge=getOriginalModsLifecycle287().clearSourceModule287('chunk-f2cpzzp9.js').bSe as (value:typeof input)=>HotBridgeCallbacks287;
  return useBridge(input);
 });
}

/** Transitional C event-name view of the same complete mSe; no metric or
 * progress state lives in this adapter. Native IJ callers use mSe directly. */
export function getHotTurnStreamCView287(stream:import('./native.js').HotTurnStream287){
 return {
  subscribe:stream.subscribe,getSnapshot:stream.getSnapshot,emitToolProgress:stream.emitToolProgress,
  clearToolProgress:()=>stream.clearToolProgress(),showDrainedShellLine:(input:string,verbose:boolean)=>stream.showDrainedShellLine(input,verbose),
  sweepResolvedToolProgress:(messages:readonly unknown[])=>stream._sweepResolvedToolProgress(messages),
  get isMainResponseStreaming(){return stream.isMainResponseStreaming},
  record:(event:import('../officialRlt287.js').OfficialRltApiMetricEvent287)=>stream.recordApiMetricsEvent(event),
  observe(event:{type:string;ttftMs?:number;event?:{type:string;usage?:{output_tokens?:number}}}){
   if(event.type!=='stream_event')return;
   const raw=event.event;
   if(raw?.type==='message_start'&&event.ttftMs!=null)stream.recordApiMetricsEvent({type:'start',ttftMs:event.ttftMs});
   else if(raw?.type==='content_block_start')stream.recordApiMetricsEvent({type:'content_block_start'});
   else if(raw?.type==='message_delta'&&raw.usage?.output_tokens!=null)stream.recordApiMetricsEvent({type:'end',outputTokens:raw.usage.output_tokens});
  },
  reset:()=>stream.reset(),
 };
}

/** Whole xpr adopts the actual C AppState slots. The immutable projection
 * snapshot contains references only (like commandQueue's UI snapshot); its
 * setters always commit to AppState, never to another spinner map/store. */
export function createProductionHotSpinnerStore287(store:import('../../state/AppStateStore.js').AppStateStore,session:ExecutionSession287):HotSpinnerStore287 {
 type Spinner=import('../../state/officialRltSpinner287.js').OfficialRltSpinnerState287;
 type Task=ReturnType<typeof store.getState>['tasks'][string]&{officialRltSpinner287?:Spinner};
 const source=getOriginalModsLifecycle287();
 const mainId=source.clearLifecycleSource287('chunk-bn3p37gv.js','Ge') as ()=>string;
 let projectedState:ReturnType<typeof store.getState>|undefined,projectedId:string|undefined,snapshot:Readonly<Record<string,Spinner>>;
 const read=()=>runWithExecutionSession287(session,()=>{
  const state=store.getState(),id=mainId();
  if(state===projectedState&&id===projectedId)return snapshot;
  const rows:Record<string,Spinner>={[id]:requireOfficialRltSpinnerState287(state)};
  for(const [key,task] of Object.entries(state.tasks)){
   const value=(task as Task).officialRltSpinner287;if(value!==undefined&&key!==id)rows[key]=value;
  }
  projectedState=state;projectedId=id;return snapshot=Object.freeze(rows);
 });
 const write:HotSpinnerStore287['setState']=update=>runWithExecutionSession287(session,()=>{
  const previous=read(),next=update(previous);if(next===previous)return;
  const id=mainId();store.setState(state=>{
   let tasks=state.tasks,main=state.officialRltSpinner287;
   for(const key of new Set([...Object.keys(previous),...Object.keys(next)])){
    if(previous[key]===next[key])continue;
    if(key===id){if(next[key]===undefined)throw Error('Main spinner cannot be evicted while its REPL is mounted');main=next[key];continue;}
    const task=tasks[key] as Task|undefined;if(!task){if(next[key]===undefined)continue;throw Error('Spinner event has no actual task owner: '+key);}
    const {officialRltSpinner287:_previous,...remaining}=task;
    const nextTask:Task=next[key]===undefined?remaining:{...task,officialRltSpinner287:next[key]};
    tasks={...tasks,[key]:nextTask};
   }
   return tasks===state.tasks&&main===state.officialRltSpinner287?state:{...state,tasks,officialRltSpinner287:main};
  });
 });
 const adopted={getState:read,getSnapshot:read,setState:write,subscribe:store.subscribe};
 const bindings=new Proxy<Record<string,unknown>>({Ls:()=>adopted},{
  has:(_target,key)=>typeof key==='string'&&(key==='Ls'||Object.hasOwn(spinnerAdopterProof287.bindings,key)),
  get:(target,key)=>{
   if(key===Symbol.unscopables)return undefined;if(key==='Ls')return target.Ls;
   const binding=spinnerAdopterProof287.bindings[key as keyof typeof spinnerAdopterProof287.bindings];
   if(!binding)throw Error('Uninstalled spinner source binding '+String(key));return source.clearLifecycleSource287(binding.file,binding.name);
  },
 });
 const spinner=runWithExecutionSession287(session,()=>createHotSpinnerAdopterFactory287(bindings)());
 bindHotSessionCalls287(spinner,session);bindHotSessionCalls287(spinner.main,session);
 const bind=spinner.bind;spinner.bind=id=>{const methods=bind(id);bindHotSessionCalls287(methods,session);return methods};
 return spinner;
}
export function readProductionHotEngine287(input:{session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287;engine:HotEngine287;feed:HotEngineFeed287;turnInput:import('../../query.js').QueryParams;newMessages:import('../../types/message.js').Message[];onQueryEvent:(event:Parameters<typeof import('../messages.js').handleMessageFromStream>[0])=>void;addNotification:import('../../Tool.js').ToolUseContext['addNotification'];onRead?:()=>void}){
 const read=getHotSessionLeaves287().readSessionEngine as (data:typeof input)=>Promise<Record<string,unknown>|undefined>
 return runWithExecutionSession287(input.session,()=>read(input))
}

/** Original YJ owns conversation writes; React/AppState is its projection. */
export function createProductionHotTranscript287(input:{initial:import('../../types/message.js').Message[];project(next:import('../../types/message.js').Message[],previous:import('../../types/message.js').Message[]):void},session=getExecutionSession287()):import('./native.js').HotTranscript287 {
 const {Transcript}=createHotSessionClasses287(createHotSessionClassPorts287())
 const transcript=runWithExecutionSession287(session,()=>new Transcript(input))
 bindHotSessionCalls287(transcript,session)
 return transcript
}

/** Original RJ owns the viewport lease and reveal outcome. Messages supplies
 * the actual committed-list handle; absent/filtered rows stay unknown. */
export function createProductionHotScrollPin287(input:ConstructorParameters<ReturnType<typeof createHotSessionClasses287>['ScrollPin']>[0],session=getExecutionSession287()):import('./native.js').HotScrollPin287 {
 const {ScrollPin}=createHotSessionClasses287(createHotSessionClassPorts287())
 const scroll=runWithExecutionSession287(session,()=>new ScrollPin(input))
 bindHotSessionCalls287(scroll,session)
 return scroll
}

/** Adjacent actors from the same complete official hot factory; callers supply
 * live owners, not replacement gesture/chrome/transport state. */
export function createProductionHotAdjoiningOwner287<K extends 'GestureController'|'ChromeController'|'TitleController'|'IdleNudge'|'TransportController'>(kind:K,input:Record<string,unknown>,session=getExecutionSession287()):InstanceType<ReturnType<typeof createHotSessionClasses287>[K]> {
 const Constructor=createHotSessionClasses287(createHotSessionClassPorts287())[kind];
 const owner=runWithExecutionSession287(session,()=>new Constructor(input));bindHotSessionCalls287(owner,session);
 return owner as InstanceType<ReturnType<typeof createHotSessionClasses287>[K]>;
}
