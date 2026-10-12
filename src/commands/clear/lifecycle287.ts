import {AsyncLocalStorage} from 'node:async_hooks'
import {getProjectsApi287,getProjectsContext287} from '../../services/context/projects287.js'
import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {createClearLifecycleNative287,type ClearInput287} from './officialClear287/native.js'
import {createClearDependencies287} from './officialClear287/dependencies.js'
import cuts from './officialClear287/productionCuts.json' with {type:'json'}
import proof from './officialClear287/provenance.json' with {type:'json'}
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getRootExecutionSession287,getExecutionSession287} from '../../services/context/execution287.js'
import {getRuntimeMemo287} from '../../services/context/runtimeMemo287.js'
import * as bootstrap from '../../bootstrap/state.js'
import * as storage from '../../utils/sessionStorage.js'
import {getToolState287} from '../../utils/toolState287.js'
import {getAgentTaskRegistry287} from '../../tools/AgentTool/agentAdmission287.js'
import {subagentStats287} from '../../tools/AgentTool/subagentStats287.js'
import {printDetachedSlot287} from '../../tools/GetTaskTool/printLifecycle287.js'
import {getPostTurnClient287} from '../../query/postTurnClient287/index.js'
import {getClaimContextOwner287} from '../../context.js'
import {getSessionStartDateOwner287} from '../../constants/common.js'
import {removeByFilter} from '../../utils/messageQueueManager.js'
import {setCwd} from '../../utils/Shell.js'
import {getCwd} from '../../utils/cwd.js'
import {isLocalAgentTask} from '../../tasks/LocalAgentTask/LocalAgentTask.js'
import {isInProcessTeammateTask} from '../../tasks/InProcessTeammateTask/types.js'
import {isLocalShellTask} from '../../tasks/LocalShellTask/guards.js'
import {createEmptyAttributionState} from '../../utils/commitAttribution.js'
import {getCurrentWorktreeSession} from '../../utils/worktree.js'
import {clearAllPlanSlugs} from '../../utils/plans.js'
import {asAgentId} from '../../types/ids.js'
import {evictTaskOutput,initTaskOutputAsSymlink} from '../../utils/task/diskOutput.js'
import {getHookExecutionEngine287,executeHooksOutsideREPL,createBaseHookInput,getSessionEndHookTimeoutMs} from '../../utils/hooks.js'
import {getSessionHooks,getSessionFunctionHooks,getSessionHookCallback,clearSessionHooks} from '../../utils/hooks/sessionHooks.js'
import type {HookEvent} from '../../entrypoints/agentSdkTypes.js'
import {clearSessionEnvVars} from '../../utils/sessionEnvVars.js'
import {getOriginalOAuthLifecycle287} from '../../utils/officialOAuthLifecycle287/productionBinding.js'
import {getAppStateJobOwner287} from '../../state/appStateJobs287.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import type {AppState} from '../../state/AppState.js'
import type {Message} from '../../types/message.js'
import type {UUID} from 'node:crypto'
import type {FileStateCache} from '../../utils/fileStateCache.js'
import type {ClearCommandContextExtension,ConversationResetSdkEvent} from './resetEvents.js'

export type ClearContext287=ClearCommandContextExtension & {
 setMessages:(update:(messages:Message[])=>Message[])=>void;readFileState:FileStateCache;
 getAppState?:()=>AppState;setAppState?:(update:(state:AppState)=>AppState)=>void;
 setConversationId?:(id:UUID)=>void;clearedSessionTitle?:string;
 discoveredSkillNames?:Set<string>;loadedNestedMemoryPaths?:Set<string>;
 session?:ClearInput287['session'];toolState?:ClearInput287['toolState'];
 sessionEnvVars?:ClearInput287['sessionEnvVars'];memorySelector?:ClearInput287['memorySelector'];
 // Tool contexts carry the opaque host registry; validate its original read ABI
 // once at this boundary, retaining the supplied owner and method receivers.
 sessionHooksRegistry?:object;dialogStore?:ClearInput287['dialogStore'];
 isolationLatch?:ClearInput287['isolationLatch'];taskRegistry?:ClearInput287['taskRegistry'];
 storageV5?:unknown;credentials?:unknown;deferSessionStartHooks?:ClearInput287['deferSessionStartHooks'];
 releaseDeferredSessionStartHooks?:ClearInput287['releaseDeferredSessionStartHooks'];
}
function assertClearSessionHooksRegistry287(value:object):asserts value is NonNullable<ClearInput287['sessionHooksRegistry']> {
 if(!('get' in value)||typeof value.get!=='function'||!('getFunctionHooks' in value)||typeof value.getFunctionHooks!=='function')
  throw Error('Clear sessionHooksRegistry is missing its original get/getFunctionHooks ABI')
}
// Stable stateless ABI constructors: toolState keeps the original single cache
// identity while these leaves clear the existing local-C producer stores.
class ClearWebFetchCache287 {clear(){(require('../../tools/WebFetchTool/utils.js') as typeof import('../../tools/WebFetchTool/utils.js')).clearWebFetchCache()}}
class ClearToolSearchDescriptionCache287 {clear(){(require('../../tools/ToolSearchTool/ToolSearchTool.js') as typeof import('../../tools/ToolSearchTool/ToolSearchTool.js')).clearToolSearchDescriptionCache()}}
const moduleName=(path:string)=>path.split('/').at(-1)!
const call=(value:unknown,...args:unknown[])=>{if(typeof value!=='function')throw Error('Original clear port is not callable');return value(...args)}
const clearScope287=new AsyncLocalStorage<{values:Record<string,unknown>;nativeRequire(file:string):unknown;nativeImport(file:string):Promise<unknown>}>()
let sharedCutDefaults287:Record<string,unknown>={}
let sharedScopeDefaults287:NonNullable<ReturnType<typeof clearScope287.getStore>>|undefined
let sharedDependencies287:ReturnType<typeof createClearDependencies287>|undefined
function scopedCut287(key:string,value:unknown):unknown {
 if(typeof value==='function')return (...args:unknown[])=>call((clearScope287.getStore()?.values??sharedCutDefaults287)[key],...args)
 return new Proxy(Object.create(null) as object,{get(_target,property){const live=(clearScope287.getStore()?.values??sharedCutDefaults287)[key];if(live===undefined)throw Error('Clear application scope missing: '+key);const slot=Reflect.get(Object(live),property);return typeof slot==='function'?slot.bind(live):slot}})
}
/** No business owner is installed by this adapter: all cuts resolve existing writers. */
function createClearDependencyScope287(context?:Partial<ClearContext287>) {
 if(context&&!sharedDependencies287)createClearDependencyScope287()
 const session=context?.session??getExecutionSession287()
 const invocation=()=>{if(!context)throw Error('Clear invocation port used outside its actual caller');return context}
 const requireLocal=<T>(path:string)=>require(path) as T
 const publicCaches=()=>({
  image:requireLocal<typeof import('../../utils/imageStore.js')>('../../utils/imageStore.js'),
  ingress:requireLocal<typeof import('../../services/api/sessionIngress.js')>('../../services/api/sessionIngress.js'),
  repository:requireLocal<typeof import('../../utils/detectRepository.js')>('../../utils/detectRepository.js'),
  git:requireLocal<typeof import('../../utils/git/gitFilesystem.js')>('../../utils/git/gitFilesystem.js'),
 })
 const canonical=()=>getOriginalModsLifecycle287()
 let sdk:ConversationResetSdkEvent|undefined
 const cutValues:Record<string,unknown>={
  rootExecution:new Proxy(Object.create(null) as object,{get(_target,key){const root=getRootExecutionSession287(),value=Reflect.get(root,key);return typeof value==='function'?value.bind(root):value}}),artifactSlot:()=>requireLocal<typeof import('../../services/context/artifactOwner287.js')>('../../services/context/artifactOwner287.js').artifactSource287.a(),artifactState:()=>requireLocal<typeof import('../../services/context/artifactOwner287.js')>('../../services/context/artifactOwner287.js').artifactSource287.X(),artifactPresence:()=>requireLocal<typeof import('../../services/context/artifactOwner287.js')>('../../services/context/artifactOwner287.js').artifactSource287.yxe(),
  compactPreferences:(...args:unknown[])=>call(canonical().clearLifecycleSource287('chunk-5vkjwxk2.js','Vo'),...args),
  compactFork287:(...args:Parameters<typeof import('../../utils/forkedAgent.js').runForkedAgent>)=>requireLocal<typeof import('../../utils/forkedAgent.js')>('../../utils/forkedAgent.js').runForkedAgent(...args),
  reactiveSummary287:(...args:unknown[])=>call(requireLocal<typeof import('../../services/compact/reactiveRuntime.js')>('../../services/compact/reactiveRuntime.js').createReactiveKernel287().xie,...args),
  q:bootstrap.getSessionId,Ee:bootstrap.getOriginalCwd,cr:()=>session.project?.projectRoot??getCwd(),Ce:()=>!!context?.enqueueConversationReset||bootstrap.getIsNonInteractiveSession(),
  zQr:bootstrap.regenerateSessionId,JZr:(storageV5:Parameters<ClearInput287['session']['costLedger']['runSaver']>[0])=>session.costLedger.runSaver(storageV5,getExecutionSession287().root.costLedger),
  y6e:()=>{session.costLedger.reset(session.id);session.requestJournal.replacePromptId(null)},
  a:authEnvironment,t:logForDebugging,d:logError,y:()=>{},vsn:()=>{}, // frozen local telemetry C
  Wi:(event:ConversationResetSdkEvent)=>{sdk=event;invocation().enqueueConversationReset?.(event)},
  kn:isLocalAgentTask,_p:isInProcessTeammateTask,Lu:isLocalShellTask,G:(items:unknown[],predicate:(item:unknown)=>boolean)=>items.filter(predicate).length,
  K5e:createEmptyAttributionState,Qu:(id:string)=>void evictTaskOutput(id),Rf:setCwd,Aw:removeByFilter,
  _ye:getSessionEndHookTimeoutMs,
  hookExecute:(options:Parameters<ReturnType<typeof getHookExecutionEngine287>['PA']>[0])=>getHookExecutionEngine287().PA(options),
  hookOutside:(options:Parameters<typeof executeHooksOutsideREPL>[0])=>executeHooksOutsideREPL(options),
  sessionEnvironmentReset:()=> (require('../../utils/sessionEnvironment.js') as typeof import('../../utils/sessionEnvironment.js')).invalidateSessionEnvCache(),
  watcher:{initialize:(...args:Parameters<typeof import('../../utils/hooks/fileChangedWatcher.js').initializeFileChangedWatcher>)=>(require('../../utils/hooks/fileChangedWatcher.js') as typeof import('../../utils/hooks/fileChangedWatcher.js')).initializeFileChangedWatcher(...args),setEnvHookNotifier:(...args:Parameters<typeof import('../../utils/hooks/fileChangedWatcher.js').setEnvHookNotifier>)=>(require('../../utils/hooks/fileChangedWatcher.js') as typeof import('../../utils/hooks/fileChangedWatcher.js')).setEnvHookNotifier(...args),updateWatchPaths:(paths:string[])=>(require('../../utils/hooks/fileChangedWatcher.js') as typeof import('../../utils/hooks/fileChangedWatcher.js')).updateWatchPaths(paths),addWatchPaths:(paths:string[])=>(require('../../utils/hooks/fileChangedWatcher.js') as typeof import('../../utils/hooks/fileChangedWatcher.js')).addWatchPaths287(paths),onCwdChanged:(...args:Parameters<typeof import('../../utils/hooks/fileChangedWatcher.js').onCwdChangedForHooks>)=>(require('../../utils/hooks/fileChangedWatcher.js') as typeof import('../../utils/hooks/fileChangedWatcher.js')).onCwdChangedForHooks(...args),dispose:()=> (require('../../utils/hooks/fileChangedWatcher.js') as typeof import('../../utils/hooks/fileChangedWatcher.js')).resetFileChangedWatcherForTesting()},
  pluginsCacheOnly:(storageV5?:unknown,credentials?:unknown)=>(require('../../utils/plugins/pluginLoader.js') as typeof import('../../utils/plugins/pluginLoader.js')).loadAllPluginsCacheOnly(storageV5,credentials),
  loadHooks:(storageV5?:unknown,credentials?:unknown)=>(require('../../utils/hooks/modelSwitch287/registration.js') as typeof import('../../utils/hooks/modelSwitch287/registration.js')).retryModelSwitchHookRegistration287(storageV5,credentials),
  commands:(cwd:string|null,options?:unknown)=>(require('../../utils/commandDiscovery287.js') as typeof import('../../utils/commandDiscovery287.js')).getCommandDiscovery287().commands(cwd,options),
  hookBase:(execution:{id:string},_cwd:string,permissionMode?:string,caller?:Parameters<typeof createBaseHookInput>[2])=>createBaseHookInput(permissionMode,execution.id,caller),
  Dc:storage.getTranscriptPath,au:storage.getTranscriptPath,Yf:storage.getTranscriptPathForSession,
  xf:storage.getCurrentSessionTitle,$ce:()=>Reflect.get(storage.getClearSessionMetadataOwner287(),'currentSessionAgentName'),
  dq:bootstrap.isSessionPersistenceDisabled,cq:storage.resetSessionFilePointer,
  d2:(id:UUID,title:string,path?:string)=>storage.saveCustomTitle(id,title,path),
  vye:(id:UUID,name:string,path?:string)=>storage.saveAgentName(id,name,path),ZD:storage.cacheSessionTitle,
  m1:storage.saveMode,d0:storage.saveWorktreeState,Uc:getCurrentWorktreeSession,
  xTe:(id:string)=>void initTaskOutputAsSymlink(id,storage.getAgentTranscriptPath(asAgentId(id))),
  js:storage.getClearSessionMetadataOwner287,Va:()=>({sessionTitleChanged:storage.sessionTitleChanged,sessionAgentNameChanged:storage.sessionAgentNameChanged,clearSessionMessagesCache:storage.clearSessionMessagesCache}),
  OC:(path:string,entry:Record<string,unknown>)=>storage.appendClearMetadataEntry287(path,entry),
  KS:printDetachedSlot287,IMe:subagentStats287.registry,LBt:{of:getSessionStartDateOwner287},
  ko:getRuntimeMemo287,h6r:{of:()=>getPostTurnClient287().cache.Ie()},
  Msn:(execution:ClearInput287['session'])=>getClaimContextOwner287().reset(execution),
  Dbt:()=>{requireLocal<typeof import('../../utils/git.js')>('../../utils/git.js').getIsGit.cache.clear?.();requireLocal<typeof import('../../context.js')>('../../context.js').getGitStatus.cache.clear()},
  Hae:requireLocal<typeof import('../../hooks/fileSuggestions.js')>('../../hooks/fileSuggestions.js').clearFileSuggestionCaches,
  z_r:(clear:()=>void)=>clear(),
  f0:()=>{requireLocal<typeof import('../../commands.js')>('../../commands.js').clearCommandsCache();requireLocal<typeof import('../../tools/SkillTool/prompt.js')>('../../tools/SkillTool/prompt.js').clearPromptCache()},
  ANt:{peek:()=>({clear:()=>requireLocal<typeof import('../../services/api/promptCacheBreakDetection.js')>('../../services/api/promptCacheBreakDetection.js').resetPromptCacheBreakDetection()})},
  eHt:(_execution:unknown,reason:'session_start')=>requireLocal<typeof import('../../utils/claudemd.js')>('../../utils/claudemd.js').resetGetMemoryFilesCache(reason),
  nTo:()=>publicCaches().ingress.clearAllSessions(),
  tho:()=>requireLocal<typeof import('../../hooks/useSwarmPermissionPoller.js')>('../../hooks/useSwarmPermissionPoller.js').clearAllPendingCallbacks(),
  UVt:()=>publicCaches().repository.clearRepositoryCaches(),
  w_o:()=>requireLocal<typeof import('../../services/api/dumpPrompts.js')>('../../services/api/dumpPrompts.js').clearAllDumpState(),
  QVt:()=>publicCaches().git.clearResolveGitDirCache(),
  dIo:()=>requireLocal<typeof import('../../skills/loadSkillsDir.js')>('../../skills/loadSkillsDir.js').clearDynamicSkills(),
  Bln:async()=>{const cwd=bootstrap.getOriginalCwd();if(cwd===(session.project?.projectRoot??getCwd()))return;const dirs=await call(canonical().clearLifecycleSource287('chunk-mphp7acd.js','jle'),'skills',cwd);if(!Array.isArray(dirs)||!dirs.every(dir=>typeof dir==='string'))throw Error('Original skills ancestry returned invalid directories');await requireLocal<typeof import('../../skills/loadSkillsDir.js')>('../../skills/loadSkillsDir.js').addSkillDirectories(dirs)},
  rko:()=>requireLocal<typeof import('../../services/MagicDocs/magicDocs.js')>('../../services/MagicDocs/magicDocs.js').clearTrackedMagicDocs(),
  vpe:()=>call(getOriginalOAuthLifecycle287().resetPorts.vpe),
  qt:()=>getOutsideHookRuntime287().mcpState(),
  AWr:clearAllPlanSlugs,
  Pre:(connection:{client:{onclose:unknown}},onclose:unknown)=>{connection.client.onclose=onclose},
  N9:()=>{}, // existing telemetry sender remains disabled
  u_t:(update:unknown)=>{if(update)requireLocal<typeof import('../../utils/classifierApprovals.js')>('../../utils/classifierApprovals.js').clearClassifierApprovals()},
  ZT:(execution:ClearInput287['session'],reason:string)=>getClaimContextOwner287().invalidate(execution,reason),
  Mat:()=>getProjectsApi287().pas(),B0n:()=>getProjectsContext287().IBn(),bPo:storage.clearSessionMessagesCache,
  Fr:(...args:Parameters<ReturnType<typeof getAppStateJobOwner287>['Fr']>)=>getAppStateJobOwner287().Fr(...args),
  ul:(...args:Parameters<ReturnType<typeof getAppStateJobOwner287>['ul']>)=>getAppStateJobOwner287().ul(...args),
  jp:(...args:Parameters<ReturnType<typeof getAppStateJobOwner287>['jp']>)=>getAppStateJobOwner287().jp(...args),
  Nl:(...args:Parameters<ReturnType<typeof getAppStateJobOwner287>['Nl']>)=>getAppStateJobOwner287().Nl(...args),
  GIr:()=>getMcpConnectedProducer287().dynamicModules['chunk-2zrgwjvv.js'],
 }
 if(!sharedDependencies287)sharedCutDefaults287=cutValues
 const cutMap=new Map(cuts.map(row=>[row.file+':'+row.name,row.application]))
 const nativeRequire=(file:string)=>{
  if(file==='/$bunfs/root/chunk-3tc44sbx.js')return requireLocal<typeof import('../../coordinator/coordinatorMode.js')>('../../coordinator/coordinatorMode.js')
  if(file==='/$bunfs/root/chunk-3xgd8dv8.js')return {mcpClientModule:()=>requireLocal<typeof import('../../services/mcp/client.js')>('../../services/mcp/client.js')}
  const module=getMcpConnectedProducer287().dynamicModules[moduleName(file)];if(module)return module
  throw Error('Original clear optional namespace not installed: '+file)
 }
 const nativeImport=async(file:string)=>{
  if(file==='/$bunfs/root/chunk-m63p6f9t.js')return {WebFetchCache:ClearWebFetchCache287}
  if(file==='/$bunfs/root/chunk-7rq2cvsh.js'){return dependencies.namespace('chunk-7rq2cvsh.js')}
  if(file==='/$bunfs/root/chunk-87jvhhxm.js')return {ToolSearchDescriptionCache:ClearToolSearchDescriptionCache287}
  if(file==='/$bunfs/root/chunk-jz49fewx.js')return import('../../tools/AgentTool/loadAgentsDir.js')
  throw Error('Original clear dynamic namespace not installed: '+file)
 }
 if(!sharedDependencies287)sharedScopeDefaults287={values:cutValues,nativeRequire,nativeImport}
 const createDependencies=()=>createClearDependencies287({cut:(file,name)=>{const key=cutMap.get(file+':'+name);if(key===undefined||!Object.hasOwn(cutValues,key))throw Error('Original clear application cut not connected: '+file+':'+name);return scopedCut287(key,cutValues[key])},shared:(file,name)=>canonical().clearLifecycleSource287(file,name),nativeRequire:(file)=>(clearScope287.getStore()??sharedScopeDefaults287)!.nativeRequire(file),nativeImport:(file)=>(clearScope287.getStore()??sharedScopeDefaults287)!.nativeImport(file)})
 const dependencies=clearScope287.run({values:cutValues,nativeRequire,nativeImport},()=>sharedDependencies287??=createDependencies())
 return {session,dependencies,nativeRequire,nativeImport,scope:{values:cutValues,nativeRequire,nativeImport},sdk:()=>sdk}
}

export function createClearProduction287(context:Partial<ClearContext287>) {
 const binding=createClearDependencyScope287(context)
 const {session,dependencies,nativeRequire,nativeImport,scope}=binding
 const requireLocal=<T>(path:string)=>require(path) as T
 const beforeResetAppState=async()=>{const connections=context.getAppState?.().mcp.v2Clients??[];for(const connection of connections)connection.v2Client.onclose=undefined;await Promise.all(connections.map(connection=>connection.cleanup().catch(logError)))}
 const namespace=(file:string)=>{
  const group=proof.groups.find(group=>group.file===file);if(!group)throw Error('Unknown clear namespace '+file)
  const imports:Record<string,unknown>={nativeRequire,nativeImport,beforeResetAppState};for(const imp of group.imports){const origin=moduleName(imp.file),module=origin==='crypto'?require('node:crypto') as Record<string,unknown>:dependencies.namespace(origin);
   const target=imp.name
   imports[imp.local]=module[target]
  }return imports
 }
 const native=clearScope287.run(scope,()=>createClearLifecycleNative287({namespace}))
 const originalGet=context.getAppState
 const projectState=(state:AppState):AppState=>{
  const image=requireLocal<typeof import('../../utils/imageStore.js')>('../../utils/imageStore.js');let paths:Map<number,string>|undefined
  image.updateStoredImagePaths287(current=>{paths=current;return current})
  return {...state,storedImagePaths:paths,imageDescriptions:Reflect.get(state,'imageDescriptions')??new Map(),displayedMessageContent:Reflect.get(state,'displayedMessageContent')??{},webBrowser:Reflect.get(state,'webBrowser')??call(dependencies.namespace('chunk-6yxjcy08.js').Fwr)} as AppState
 }
 const getAppState=originalGet?()=>projectState(originalGet()):undefined
 const setAppState=context.setAppState?((update:(state:AppState)=>AppState)=>context.setAppState!(old=>{
  const next=update(projectState(old))
  if(Reflect.get(next,'storedImagePaths')!==undefined)requireLocal<typeof import('../../utils/imageStore.js')>('../../utils/imageStore.js').updateStoredImagePaths287(()=>Reflect.get(next,'storedImagePaths'))
  const canonical=projectState(next)
  if(next.tasks===old.tasks)return canonical
  for(const task of Object.values(old.tasks))if('isBackgrounded'in task&&task.isBackgrounded===false&&task.status==='running'){
   if(isLocalShellTask(task)&&task.cleanupTimeoutId)clearTimeout(task.cleanupTimeoutId)
   if('unregisterCleanup'in task)task.unregisterCleanup?.()
  }
  return {...canonical,mcp:{clients:[],v2Clients:[],tools:[],commands:[],resources:{},resourceTemplates:{},sessionResetKey:old.mcp.sessionResetKey,pluginReconnectKey:old.mcp.pluginReconnectKey}}
 })):undefined
 const suppliedSessionHooksRegistry=context.sessionHooksRegistry
 if(suppliedSessionHooksRegistry)assertClearSessionHooksRegistry287(suppliedSessionHooksRegistry)
 const sessionHooksRegistry=suppliedSessionHooksRegistry??(context.getAppState&&context.setAppState?{
  get:(id:string,event:string)=>getSessionHooks(context.getAppState!(),id,event as HookEvent),
  getFunctionHooks:(id:string,event:string)=>getSessionFunctionHooks(context.getAppState!(),id,event as HookEvent),
  getEntry:(id:string,event:string,matcher:string,hook:Parameters<typeof getSessionHookCallback>[4])=>getSessionHookCallback(context.getAppState!(),id,event as HookEvent,matcher,hook),
  clear:(id:string)=>clearSessionHooks(context.setAppState!,id),
 }:undefined)
 const run=(input:ClearInput287)=>({async *[Symbol.asyncIterator]():AsyncGenerator<{type:'conversation_reset';newConversationId:string},void>{const generator=clearScope287.run(scope,()=>native.B_r(input));while(true){const next=await clearScope287.run(scope,()=>generator.next());if(next.done===true)return;yield next.value}}})
 return {native,run,sdk:binding.sdk,input:{...context,getAppState,setAppState,session,sessionHooksRegistry,toolState:context.toolState??getToolState287(session),sessionEnvVars:context.sessionEnvVars??{clear:clearSessionEnvVars},taskRegistry:context.taskRegistry??(context.getAppState&&context.setAppState?getAgentTaskRegistry287({getAppState:context.getAppState,setAppState:context.setAppState}):undefined)} as ClearInput287}
}

/** Same dependency namespace as the actual B_r caller. Constructing it does not
 * run clear, install another artifact actor, start hooks, or rotate a session. */
export function getClearSourceModule287(file:string):Readonly<Record<string,unknown>> {
 if(!sharedDependencies287)createClearDependencyScope287()
 return clearScope287.run(clearScope287.getStore()??sharedScopeDefaults287!,()=>sharedDependencies287!.namespace(file))
}

/** Bind the actual compact caller to the existing clear dependency cuts. The
 * callback (including its async continuations) uses this invocation's session,
 * storage and public owners; namespace lookup does not replace the active scope.
 * This adapter does not allocate a graph, invoke clear or rotate a session. */
// Compact binds invocation/session ports, not the clear-only registry.reset ABI.
// Extra caller fields remain on the same view; nothing is stripped or copied.
export function runWithCompactLifecycleContext287<T>(context:Omit<Partial<ClearContext287>,'sessionHooksRegistry'>,callback:()=>T):T {
 const binding=createClearDependencyScope287(context)
 return clearScope287.run(binding.scope,callback)
}

export function getClearLifecycleBinding287(file:string,name:string):unknown {
 const source=getClearSourceModule287(file);if(!Object.hasOwn(source,name))throw Error(`Original clear export not selected: ${file}:${name}`);return source[name]
}

/** Complete original H5, same host startup state and PA/AP owners. */
export function runSessionStartHooks287(session:ClearInput287['session'],source:'startup'|'resume'|'fork'|'clear'|'compact',options:{sessionId?:string;sessionTitle?:string;agentType?:string;model?:string;forceSyncExecution?:boolean;resumedMessages?:Message[];storageV5?:unknown;credentials?:unknown;signal?:AbortSignal;orphaned?:AbortSignal;agentContext?:unknown;newPluginsOnly?:unknown}={}):Promise<import('../../types/message.js').HookResultMessage[]> {
 const binding=createClearDependencyScope287({session})
 return clearScope287.run(binding.scope,()=>call(binding.dependencies.namespace('chunk-mphp7acd.js').H5,session,source,options))
}
