import {feature} from 'bun:bundle'
import {getExecutionSession287} from '../context/execution287.js'
import {createMcpConnected287,type McpConnected287,type EnsureMcpOptions287,type EnsureMcpClient287,type PrepareMcpStdioSpawn287} from './officialConnected287/native.js'
import type {ConnectedMcpServer,ConnectedMCPServerV2,CachedMCPServer,NeedsAuthMCPServer,ScopedMcpServerConfig} from './types.js'
import {jsonStringify} from '../../utils/slowOperations.js'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {getGlobalConfig,getCurrentProjectConfig,saveGlobalConfig} from '../../utils/config.js'
import {peekPreSettingsEnvironment286} from '../../utils/managedEnv.js'
import {AbortError} from '../../utils/errors.js'
import {z} from 'zod/v4'
import * as util from 'node:util'
import * as events from 'node:events'
import mapValues from 'lodash-es/mapValues.js'
import {getIsNonInteractiveSession} from '../../bootstrap/state.js'
import {bindMcpTools287} from './toolContext287.js'
import {getClaudeConfigHomeDir} from '../../utils/envUtils.js'

export interface McpProcessWiring287 {
 registerEnsureConnectedClient(callback:EnsureMcpClient287):void;
 ensureConnectedClient():EnsureMcpClient287|undefined;
}
export interface McpSessionWiring287 {
 acquireClientsAccessor(accessor:()=>readonly unknown[]):()=>void;
 clientsFromAccessor():readonly unknown[]|undefined;
 registerConnectedClientWiring(callback:(client:import('./officialConnected287/native.js').NativeModernConnection287)=>void):void;
 connectedClientWiring():((client:import('./officialConnected287/native.js').NativeModernConnection287)=>void)|undefined;
}
export function getMcpProcessWiring287():McpProcessWiring287 {
 return getExecutionSession287().host.mcpProcessWiring as McpProcessWiring287
}
export function getMcpSessionWiring287():McpSessionWiring287 {
 return getExecutionSession287().mcpSessionWiring as McpSessionWiring287
}
function requiredOwner(name:string):never {throw Error(`Original MCP connected producer requires canonical owner ${name}`)}
const outside=()=>require('../../utils/hooks/outsideRuntime287.js') as typeof import('../../utils/hooks/outsideRuntime287.js')
/** This reads the existing AP-owned I/qt actor. Do not instantiate another
 * source I (it would create a second host WeakMap and discovery state). */
function mcpState287():unknown {
 return outside().getOutsideHookRuntime287().mcpState()
}
const clients=()=>getMcpSessionWiring287().clientsFromAccessor()
/** C pre-spawn seam on the original qo/Rt transport. Unbound transports keep
 * their synchronous spawn timing; no config, prefix or connection is rebuilt. */
export const prepareMcpStdioSpawn287:PrepareMcpStdioSpawn287=(params,signal)=>{
 const {getExecutionWorkspaceConfinement287,requireExecutionWorkspaceConfinement287}=require('../context/execution287.js') as typeof import('../context/execution287.js')
 const fixedPolicy=getExecutionWorkspaceConfinement287()
 if(!fixedPolicy)return undefined
 const validate=()=>{
  if(signal?.aborted)throw signal.reason??Error('MCP stdio cancelled before spawn')
  const policy=requireExecutionWorkspaceConfinement287()
  if(policy!==fixedPolicy)throw Error('Workspace execution policy changed')
  policy.assertRootIdentity()
  const {realpathSync}=require('node:fs') as typeof import('node:fs')
  policy.preflightCwd(realpathSync.native(params.cwd??process.cwd()))
 }
 validate()
 return (async()=>{
  const {SandboxManager}=await import('../../utils/sandbox/sandbox-adapter.js')
  const {quote}=await import('shell-quote')
  await SandboxManager.initialize()
  if(!SandboxManager.isSandboxingEnabled())throw Error(SandboxManager.getSandboxUnavailableReason()??'Required workspace sandbox is unavailable')
  validate()
  const wrapped=await SandboxManager.wrapWithSandbox(quote([params.command,...params.args??[]]),'/bin/sh',undefined,signal)
  let disposed=false
  const dispose=()=>{if(!disposed){disposed=true;SandboxManager.cleanupAfterCommand()}}
  try{validate()}catch(error){dispose();throw error}
  return {params:{...params,command:'/bin/sh',args:['-c',wrapped]},dispose}
 })()
}
/** Host adapters plus explicitly unresolved conditional contracts. No missing
 * policy/cache capability is replaced by an all-allow or empty-success helper. */
export function createMcpConnectedPorts287():Record<string,unknown> {
 const ports=outside().createOutsideHookPorts287()
 const result:Record<string,unknown>={...ports,execution:getExecutionSession287,mcpState:mcpState287,
  prepareMcpStdioSpawn287:(...args:Parameters<PrepareMcpStdioSpawn287>)=>prepareMcpStdioSpawn287(...args),
  toolUseContextProjection287:(context:import('../../Tool.js').ToolUseContext)=>{
   const original=(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287('chunk-1b21she7.js','UYn')
   if(typeof original!=='function')throw Error('Canonical UYn tool context projection is not callable')
   return Reflect.apply(original,undefined,[context])
  },
  subprocessHostRegistry:{of:(host:object)=>(outside().getOutsideHookRuntime287().sourceModule('chunk-8ptzhr8g.js').T as {of(host:object):unknown}).of(host)},
  policyAllowed:(key:string)=>(require('../policyLimits/index.js') as typeof import('../policyLimits/index.js')).isPolicyAllowed(key),
  chromeAjv:()=>require('ajv'),chromeAjvFormats:()=>require('ajv-formats'),
  claudeUserAgent:()=>(require('../../utils/userAgent.js') as typeof import('../../utils/userAgent.js')).getClaudeCodeUserAgent(),
  webSocketProxyUrl:(url:string)=>(require('../../utils/proxy.js') as typeof import('../../utils/proxy.js')).getWebSocketProxyUrl(url),
  sessionSwitchSubscribe:(listener:Parameters<typeof import('../context/execution287.js').executionLifecycle287.subscribeSessionSwitch>[0])=>(require('../context/execution287.js') as typeof import('../context/execution287.js')).executionLifecycle287.subscribeSessionSwitch(listener),
  screenPath:(input:string)=>(require('../../utils/filesystemPathRuntime287.js') as typeof import('../../utils/filesystemPathRuntime287.js')).filesystemPathRuntime287.screen(input),
  readPathCandidates:(input:string)=>(require('../../utils/fsOperations.js') as typeof import('../../utils/fsOperations.js')).getPathsForPermissionCheck(input),
  readPermissionCache:()=>(require('../../utils/permissions/read.js') as typeof import('../../utils/permissions/read.js')).getReadPermissions287().permissionCache(),
  matchPathPermission:(...args:Parameters<import('../../utils/permissions/officialReadPermissions287/native.js').ReadPermissions287['matchPathPermission']>)=>(require('../../utils/permissions/read.js') as typeof import('../../utils/permissions/read.js')).getReadPermissions287().matchPathPermission(...args),
  readDenyRule:(...args:Parameters<import('../../utils/permissions/officialReadPermissions287/native.js').ReadPermissions287['readDenyRule']>)=>(require('../../utils/permissions/read.js') as typeof import('../../utils/permissions/read.js')).getReadPermissions287().readDenyRule(...args),
  readAllowRule:(...args:Parameters<import('../../utils/permissions/officialReadPermissions287/native.js').ReadPermissions287['readAllowRule']>)=>(require('../../utils/permissions/read.js') as typeof import('../../utils/permissions/read.js')).getReadPermissions287().readAllowRule(...args),
  checkFilesystemPermission:(...args:Parameters<import('../../utils/permissions/officialReadPermissions287/native.js').ReadPermissions287['checkFilesystemPermission']>)=>(require('../../utils/permissions/read.js') as typeof import('../../utils/permissions/read.js')).getReadPermissions287().checkFilesystemPermission(...args),
  ws:require('ws'),
  pick:(require('lodash-es/pick.js') as typeof import('lodash-es/pick.js')).default,
  pluginMcpPolicyWaitOwner287:(options:{hasDynamicMcpConfig:boolean;pluginStateReliable:boolean;storageV5?:import('../../Tool.js').ToolUseContext['storageV5']})=>(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-ehx8ff37.js').ML(options),
  mapValues,util,events,process,http:require('node:http'),https:require('node:https'),url:require('node:url'),stream:require('node:stream'),nativeRequire:loadMcpNativeModule287,nativeImport:importMcpNativeModule287,
  builtinComputerUseServer:(name:string)=>feature('CHICAGO_MCP') ? process.platform==='darwin'&&(require('../../utils/computerUse/common.js') as typeof import('../../utils/computerUse/common.js')).isComputerUseMCPServer(name) : false,
  pluginUsed:(pluginId:string)=>outside().getOutsideHookRuntime287().pluginUsed(pluginId),
  clearedResultsCheck:(...args:Parameters<ReturnType<typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js').getOriginalModsLifecycle287>['clearedResultsCheck']>)=>(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearedResultsCheck(...args),
  registerCleanup:(fn:Parameters<typeof import('../../utils/cleanupRegistry.js').registerCleanup>[0])=>(require('../../utils/cleanupRegistry.js') as typeof import('../../utils/cleanupRegistry.js')).registerCleanup(fn),
  cleanupStarted:()=> (require('../../utils/cleanupRegistry.js') as typeof import('../../utils/cleanupRegistry.js')).hasCleanupStarted(),
  mcpServerHeaders:(...args:Parameters<typeof import('./headersHelper.js').getMcpServerHeaders>)=>(require('./headersHelper.js') as typeof import('./headersHelper.js')).getMcpServerHeaders(...args),
  modernSdkClient:(require('../../vendor/official-mcp-v2/index.mjs') as typeof import('../../vendor/official-mcp-v2/index.mjs')).OfficialMcpV2Client,
  modernHttpTransport:(require('../../vendor/official-mcp-v2/index.mjs') as typeof import('../../vendor/official-mcp-v2/index.mjs')).OfficialMcpV2HttpTransport,
  modernSseTransport:(require('../../vendor/official-mcp-v2/index.mjs') as typeof import('../../vendor/official-mcp-v2/index.mjs')).OfficialMcpV2SseTransport,
  legacySdkClient:(require('@modelcontextprotocol/sdk/client/index.js') as typeof import('@modelcontextprotocol/sdk/client/index.js')).Client,
  legacyHttpTransport:(require('@modelcontextprotocol/sdk/client/streamableHttp.js') as typeof import('@modelcontextprotocol/sdk/client/streamableHttp.js')).StreamableHTTPClientTransport,
  legacySseTransport:(require('@modelcontextprotocol/sdk/client/sse.js') as typeof import('@modelcontextprotocol/sdk/client/sse.js')).SSEClientTransport,
  mcpAuthProvider:(require('./auth.js') as typeof import('./auth.js')).ClaudeAuthProvider,
  jsonSchemaValidator:(require('@modelcontextprotocol/sdk/validation/ajv-provider.js') as typeof import('@modelcontextprotocol/sdk/validation/ajv-provider.js')).AjvJsonSchemaValidator,
  webSocketTlsOptions:()=> (require('../../utils/mtls.js') as typeof import('../../utils/mtls.js')).getWebSocketTLSOptions(),
  proxyTlsFetchOptions:async(url:string)=>(require('../../utils/proxy.js') as typeof import('../../utils/proxy.js')).getProxyFetchOptions({url}),
  proxyFetchOptions:(options:Parameters<typeof import('../../utils/proxy.js').getProxyFetchOptions>[0])=>(require('../../utils/proxy.js') as typeof import('../../utils/proxy.js')).getProxyFetchOptions(options),
  refreshOAuthToken:()=> (require('../../utils/auth.js') as typeof import('../../utils/auth.js')).checkAndRefreshOAuthTokenIfNeeded(),
  handleOAuth401:(...args:Parameters<typeof import('../../utils/auth.js').handleOAuth401Error>)=>(require('../../utils/auth.js') as typeof import('../../utils/auth.js')).handleOAuth401Error(...args),
  storageOAuthTokens:()=>requiredOwner('StorageV5 OAuth token reader'),storageAccessToken:()=>requiredOwner('StorageV5 access token reader'),
  mcpUserAgent:()=> (require('../../utils/http.js') as typeof import('../../utils/http.js')).getMCPUserAgent(),
  oauthConfig:()=> (require('../../constants/oauth.js') as typeof import('../../constants/oauth.js')).getOauthConfig(),
  runtimeMemo:()=> (require('../context/runtimeMemo287.js') as typeof import('../context/runtimeMemo287.js')).getRuntimeMemo287(),
  mainLoopModel:()=> (require('../../utils/model/model.js') as typeof import('../../utils/model/model.js')).getMainLoopModel(),
  effortModelKey:(model:string)=>(require('../../utils/model/effortSettings.js') as typeof import('../../utils/model/effortSettings.js')).getEffortModelKey(model),
  bypassDisabled:()=> (require('../../utils/permissions/confirmWithUser.js') as typeof import('../../utils/permissions/confirmWithUser.js')).isConfirmationBypassDisabled287(),
  releaseToolPermissionCall:(...args:Parameters<typeof import('../../utils/permissions/confirmWithUser.js').finishConfirmationPermissionCall287>)=>(require('../../utils/permissions/confirmWithUser.js') as typeof import('../../utils/permissions/confirmWithUser.js')).finishConfirmationPermissionCall287(...args),
  confirmWithUser:(options:Parameters<typeof import('../../utils/permissions/confirmWithUser.js').confirmWithUser>[0])=>(require('../../utils/permissions/confirmWithUser.js') as typeof import('../../utils/permissions/confirmWithUser.js')).confirmWithUser(options),
  performMcpOAuth:(...args:Parameters<typeof import('./auth.js').performMCPOAuthFlow>)=>(require('./auth.js') as typeof import('./auth.js')).performMCPOAuthFlow(...args),
  countTokens:(...args:Parameters<typeof import('../tokenEstimation.js').countMessagesTokensWithAPI>)=>(require('../tokenEstimation.js') as typeof import('../tokenEstimation.js')).countMessagesTokensWithAPI(...args),
  baseHookInput:(...args:Parameters<typeof import('../../utils/hooks/baseHookInput287.js').createBaseHookInput287>)=>(require('../../utils/hooks/baseHookInput287.js') as typeof import('../../utils/hooks/baseHookInput287.js')).createBaseHookInput287(...args),
  outsideHookExecutor:(...args:Parameters<import('../../utils/hooks/officialHooksOutside287/native.js').HooksOutside287['outside']>)=>outside().getOutsideHookRuntime287().outside(...args),
  telemetryAttributes:()=> (require('../../utils/telemetryAttributes.js') as typeof import('../../utils/telemetryAttributes.js')).getTelemetryAttributes(),
  fileSystem:getFsImplementation,
  authoredMcpConfigs:(scope:string,options?:{expandVars?:boolean})=>{
   if(scope!=='project'&&scope!=='local'&&scope!=='user'&&scope!=='enterprise')requiredOwner('authored '+scope+' MCP configuration producer')
   return (require('./config.js') as typeof import('./config.js')).getMcpConfigsByScope(scope,options)
  },
  enterpriseMcpPath:()=> (require('./config.js') as typeof import('./config.js')).getEnterpriseMcpFilePath(),
  parseMcpConfig:(params:Parameters<typeof import('./config.js').parseMcpConfig>[0])=>(require('./config.js') as typeof import('./config.js')).parseMcpConfig(params),
  allMcpConfigs:()=> (require('./config.js') as typeof import('./config.js')).getAllMcpConfigs(),
  apiProvider:()=> (require('../../utils/model/providers.js') as typeof import('../../utils/model/providers.js')).getAPIProvider(),
  firstPartyEndpoint:()=> (require('../../utils/model/providers.js') as typeof import('../../utils/model/providers.js')).isFirstPartyRequestEndpoint(),
  canonicalModel:(model:string)=>(require('../../utils/model/behavior287.js') as typeof import('../../utils/model/behavior287.js')).getModelBehaviorName287(model),
  catalogEntry:(model:string)=>(require('../../utils/model/catalog.js') as typeof import('../../utils/model/catalog.js')).getCatalogEntry(model),
  updateGlobalConfig:(update:Parameters<typeof saveGlobalConfig>[0],storage?:unknown)=>{if(storage!==undefined)requiredOwner('StorageV5 authenticated global-config producer');return saveGlobalConfig(update)},
  transformMcpContent:(...args:Parameters<typeof import('./client.js').transformResultContent>)=>(require('./client.js') as typeof import('./client.js')).transformResultContent(...args),
  listMcpResourcesTool:(require('../../tools/ListMcpResourcesTool/ListMcpResourcesTool.js') as typeof import('../../tools/ListMcpResourcesTool/ListMcpResourcesTool.js')).ListMcpResourcesTool,
  readMcpResourceTool:(require('../../tools/ReadMcpResourceTool/ReadMcpResourceTool.js') as typeof import('../../tools/ReadMcpResourceTool/ReadMcpResourceTool.js')).ReadMcpResourceTool,
  projectMcpStatus:(name:string)=>(require('./utils.js') as typeof import('./utils.js')).getProjectMcpServerStatus(name),
  authStubTools:(name:string,config:ScopedMcpServerConfig)=>getIsNonInteractiveSession()?[]:[(require('../../tools/McpAuthTool/McpAuthTool.js') as typeof import('../../tools/McpAuthTool/McpAuthTool.js')).createMcpAuthTool(name,config)],
  diskless:()=>getExecutionSession287().host.launchOptions.diskless(),
  globalConfig:getGlobalConfig,projectConfig:getCurrentProjectConfig,abortError:AbortError,
  configHome:getClaudeConfigHomeDir,zLiteral:z.literal,zNumber:z.number,zArray:z.array,
  zCustom:z.custom,zIsoDateTime:z.iso.datetime,zBoolean:z.boolean,zUnknown:z.unknown,zLooseObject:z.looseObject,zRecord:z.record,zOptional:z.optional,zLazy:z.lazy,zUnion:z.union,zNull:z.null,
  mcpClientModuleGateway:{mcpTaskWatcherModule:()=>getMcpConnectedProducer287().dynamicModules[(require('./v2Lifecycle.js') as typeof import('./v2Lifecycle.js')).resolveMcpSdkGeneration()==='v2'?'chunk-q6r0xk7e.js':'chunk-ay6r6mwz.js'],mcpClientModule:()=>({discoveryWireSchemas:()=>{
    const {resolveMcpSdkGeneration}=require('./v2Lifecycle.js') as typeof import('./v2Lifecycle.js')
    const source=getMcpConnectedProducer287();return resolveMcpSdkGeneration()==='v2'?source.schemasModern():source.schemasLegacy()
  },ensureConnectedClient:(row:ConnectedMcpServer|CachedMCPServer,options?:EnsureMcpOptions287)=>{
   const ensure=getMcpProcessWiring287().ensureConnectedClient()??requiredOwner('registered connected-client slot');return ensure(row,options)
  },...getMcpClientModule287()}),mcpDirectoryReadModule:()=> (require('./directoryProtocol287.js') as typeof import('./directoryProtocol287.js')).getMcpDirectoryReadModule287(),mcpSdkErrorClassificationModule:()=> (require('./directoryProtocol287.js') as typeof import('./directoryProtocol287.js')).getMcpSdkErrorClassificationModule287()},mcpSkillsModuleGateway:{fetchMcpSkillsForClient:(...args:Parameters<typeof import('../../skills/mcpSkills.js').fetchMcpSkillsForClient>)=>(require('../../skills/mcpSkills.js') as typeof import('../../skills/mcpSkills.js')).fetchMcpSkillsForClient(...args)},mcpSkills:{fetchMcpSkillsForClient:(...args:Parameters<typeof import('../../skills/mcpSkills.js').fetchMcpSkillsForClient>)=>(require('../../skills/mcpSkills.js') as typeof import('../../skills/mcpSkills.js')).fetchMcpSkillsForClient(...args),invalidateMcpSkillsForServer:(key:string)=>(require('../../skills/mcpSkills.js') as typeof import('../../skills/mcpSkills.js')).invalidateMcpSkillsForServer287(key),invalidateMcpSkillsExcept:(keys:Set<string>)=>(require('../../skills/mcpSkills.js') as typeof import('../../skills/mcpSkills.js')).invalidateMcpSkillsExcept287(keys)},
  oauthAccount:()=> (require('../../utils/auth.js') as typeof import('../../utils/auth.js')).getOauthAccountInfo(),
  credentialInstalled:()=> (require('../../utils/auth.js') as typeof import('../../utils/auth.js')).getClaudeAIOAuthTokens()?.accessToken!=null,
  apiKeyWithSource:(options:Parameters<typeof import('../../utils/auth.js').getAnthropicApiKeyWithSource>[0])=>(require('../../utils/auth.js') as typeof import('../../utils/auth.js')).getAnthropicApiKeyWithSource(options),
  preSettingsEnvironment:()=>peekPreSettingsEnvironment286()??requiredOwner('managedEnv pre-settings snapshot capture'),
  isSettingsSourcedEnvValue:(name:string,value:string)=>(require('../../utils/managedEnv.js') as typeof import('../../utils/managedEnv.js')).isSettingsSourcedEnvironmentValue287(name,value),
  filterPolicyEnv:(env:Record<string,string>|undefined,source?:string)=>(require('../../utils/managedEnv.js') as typeof import('../../utils/managedEnv.js')).filterPolicyPredicateEnvironment287(env,source),
  confinedPolicy:()=>(require('../../utils/managedEnv.js') as typeof import('../../utils/managedEnv.js')).isManagedPolicySnapshotOnly287(),
 }
 Object.defineProperty(result,'pluginMcpRegistry',{enumerable:true,get:()=> (require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().mcpServerRegistry})
 return result
}
let runtime:McpConnected287|undefined
export function getMcpConnectedProducer287():McpConnected287 {
 if(runtime)return runtime;
 const source=createMcpConnected287(createMcpConnectedPorts287());
 const chrome=source.dynamicModules['chunk-z87hm33f.js'],originalChromeServer=chrome.createClaudeForChromeMcpServer;
 chrome.createClaudeForChromeMcpServer=(context,client)=>{
  const socket=client??chrome.createChromeSocketClient(context),server=originalChromeServer(context,socket);
  let disposed=false;const dispose=()=>{if(disposed)return;disposed=true;socket.disconnect();if(source.chromeState().bridgeBinding?.socketClient===socket)source.chromeState().bridgeBinding=undefined};
  const onclose=server.onclose;server.onclose=()=>{try{onclose?.()}finally{dispose()}};
  const close=server.close.bind(server);server.close=async()=>{try{await close()}finally{dispose()}};return server;
 };
 for(const key of ['projectToolsModern','projectToolsLegacy'] as const){
  const original=source[key];source[key]=(...args)=>bindMcpTools287(original(...args));
 }
 for(const key of ['listToolsModern','listToolsLegacy'] as const){
  const original=source[key];
  source[key]=Object.assign((...args:Parameters<typeof original>)=>{
   const promise=original(...args);void promise.then(bindMcpTools287,()=>undefined);return promise;
  },{cache:original.cache});
 }
 for(const key of ['discoverModern','discoverLegacy'] as const){
  const original=source[key];source[key]=(callback,...args)=>original(result=>callback({...result,tools:bindMcpTools287(result.tools)}),...args);
 }
 return runtime=source;
}
/** Full original Ctn, bound lazily to the sole qt connection cache. No lodash
 * cache allocation or import-time runtime construction. */
export function memoizeMcpDial287<T extends (...args:any[])=>any>(dial:T,key:(...args:Parameters<T>)=>string){
 let memo:(T&{cache:Pick<Map<string,ReturnType<T>>,'get'|'set'|'has'|'delete'|'clear'>})|undefined
 const get=()=>memo??=getMcpConnectedProducer287().memoizeDial(dial,key,()=>getMcpConnectedProducer287().cache().connections)
 const wrapper=(...args:Parameters<T>):ReturnType<T>=>get()(...args)
 return Object.defineProperty(wrapper,'cache',{get:()=>get().cache}) as T&{cache:Pick<Map<string,ReturnType<T>>,'get'|'set'|'has'|'delete'|'clear'>}
}
/** Exact source Po/Zt initialize only an empty canonical host slot. Selection
 * belongs to the already-latched generation owner; no new gate/cache here. */
export function registerMcpConnectedProducer287(generation:'v1'|'v2'):void {
 const source=getMcpConnectedProducer287()
 if(generation==='v2'){
  const wiring=getMcpSessionWiring287();
  if(!wiring.connectedClientWiring())wiring.registerConnectedClientWiring(row=>{
   const connected=adaptNativeModernConnection287(row);
   const entry=clients()?.find(value=>value&&typeof value==='object'&&'name'in value&&value.name===row.name&&'config'in value&&jsonStringify(value.config)===jsonStringify(row.config));
   if(entry&&typeof entry==='object'&&'mcpLifecycle287'in entry){
    const lifecycle=entry.mcpLifecycle287 as import('./v2Lifecycle.js').McpV2Lifecycle|undefined;
    lifecycle?.adoptSourceConnection287(connected);
   }
  });
  source.registerModern();
 }else source.registerLegacy()
}
/** Original rir/acquire lifetime: an existing accessor wins, release removes
 * only this producer's own lease. The returned array is a live read projection. */
export function acquireMcpHookClients287(accessor:()=>readonly unknown[]):()=>void {
 return getMcpSessionWiring287().acquireClientsAccessor(accessor)
}

/** Original she facade over the same canonical LRU owned by I/to. */
export function memoizeMcpList287<T extends (...args:any[])=>any>(fetch:T,key:(...args:Parameters<T>)=>string,kind:'toolLists'|'commandLists'|'resourceLists'|'resourceTemplateLists'){
 let memo:ReturnType<McpConnected287['memoizeList']>|undefined
 const invoke=(...args:Parameters<T>):ReturnType<T>=>{
  const result=fetch(...args)
  if(!(result instanceof Promise))return result
  const promise=result.catch(error=>{
    const cache=get().cache,cacheKey=key(...args)
    if(cache.get(cacheKey)===promise)cache.delete(cacheKey)
    throw error
  })
  return promise as ReturnType<T>
 }
 const get=()=>memo??=getMcpConnectedProducer287().memoizeList(invoke,key,()=>getMcpConnectedProducer287().cache()[kind])
 const wrapper=(...args:Parameters<T>):ReturnType<T>=>get()(...args)
 return Object.defineProperty(wrapper,'cache',{get:()=>get().cache}) as T&{cache:Pick<Map<string,ReturnType<T>>,'get'|'has'|'delete'|'clear'>&{set(key:string,value:ReturnType<T>):void;size():number}}
}

/** Public SDK status is serialized by complete original b5t/_Ge, not by
 * copying the internal lifecycle discriminator onto the wire. */
export function serializeMcpServerStatuses287(input:{connections:readonly (import('./types.js').ConnectedMcpServer|import('./types.js').CachedMCPServer|Exclude<import('./types.js').MCPServerConnection,{type:'v2-connected'}>)[];tools:readonly import('../../Tool.js').Tool[]}) {
 return getMcpConnectedProducer287().serializeStatus(input)
}
export function getMcpClientModule287(){
 const source=getMcpConnectedProducer287(),modern=(require('./v2Lifecycle.js') as typeof import('./v2Lifecycle.js')).resolveMcpSdkGeneration()==='v2'
 const service=require('./client.js') as typeof import('./client.js')
 return {
  connectToServer:modern?source.dialModern:source.dialLegacy,
  getMcpToolsCommandsAndResources:modern?source.discoverModern:source.discoverLegacy,
  discardMemoizedConnectResult:(...args:Parameters<import('./officialPrintScheduler287/native.js').PrintMcpClientModule287['discardMemoizedConnectResult']>)=>(require('./officialPrintScheduler287/readers.js') as typeof import('./officialPrintScheduler287/readers.js')).readMcpPrintClientPrimitives287(modern).discardMemoizedConnectResult(...args),
  awaitEachWithDeadline:(...args:Parameters<import('./officialPrintScheduler287/native.js').PrintMcpClientModule287['awaitEachWithDeadline']>)=>(require('./officialPrintScheduler287/readers.js') as typeof import('./officialPrintScheduler287/readers.js')).readMcpPrintClientPrimitives287(modern).awaitEachWithDeadline(...args),
  disposeServerConnectionDetached:(...args:Parameters<import('./officialPrintScheduler287/native.js').PrintMcpClientModule287['disposeServerConnectionDetached']>)=>(require('./officialPrintScheduler287/readers.js') as typeof import('./officialPrintScheduler287/readers.js')).readMcpPrintClientPrimitives287(modern).disposeServerConnectionDetached(...args),
  readResourceRaw:modern?source.readResourceRawModern:source.readResourceRawLegacy,
  // Exact public refresh namespace, all backed by the current producer's
  // original initializer, grant/epoch and result-keyed discovery state.
  captureDiscoveryGrantLeg:source.discoveryGrant,
  ensureDiscoveryCacheAccount:modern?source.initializeModern:source.initializeLegacy,
  getMcpIdentityEpoch:source.identityEpoch,
  persistRefreshedToolsIfPresent:modern?source.persistRefreshedModern:source.persistRefreshedLegacy,
  clearServerCache:modern?source.clearServerModern:source.clearServerLegacy,
  dropDiscoveryEntry:modern?source.dropDiscovery:source.dropLegacy,
  detachAndCloseConnection:modern?source.detachModern:source.detachLegacy,
  peekSettledConnection:modern?source.peekModern:source.peekLegacy,
  hasUnsettledDial:modern?source.unsettledModern:source.unsettledLegacy,
  takeSettledCachedDialFailure:modern?source.takeFailureModern:source.takeFailureLegacy,
  getToolsListErrorForResult:source.listToolsError,getDiscoveryFetchError:source.discoveryFetchError,
  fetchToolsForClient:modern?source.listToolsModern:source.listToolsLegacy,
  fetchCommandsForClient:modern?source.listCommandsModern:source.listCommandsLegacy,
  fetchResourcesForClient:modern?source.listResourcesModern:source.listResourcesLegacy,
  persistLiveListing:modern?source.persistModern:source.persistLegacy,areMcpConfigsEqual:source.configsEqual,
  reconnectMcpServerImpl:async(name:string,config:ScopedMcpServerConfig,storageV5?:unknown,credentials?:unknown)=>{
   if(!modern)return service.reconnectMcpServerImpl(name,config)
   const row=clients()?.find((value)=>value&&typeof value==='object'&&'name'in value&&value.name===name&&'config'in value&&getMcpConnectedProducer287().configsEqual(value.config as ScopedMcpServerConfig,config)) as {mcpLifecycle287?:import('./v2Lifecycle.js').McpV2Lifecycle}|undefined
   const owner=row?.mcpLifecycle287??requiredOwner('same lifecycle for cached retry')
   return owner.reconnect(name,config,{storageV5,credentials})
  },
 }
}


/** Actual lazy owners for original literal dynamic-import namespaces. No server,
 * SDK, or transport is created by this resolver. The original Et/$e creates them.
 * The common naming predicate stays original; launcher compile-feature controls
 * reachability of the Darwin-only native branch on other platforms. */
export async function importMcpNativeModule287(specifier:string):Promise<unknown> {
 if(specifier==='/$bunfs/root/chunk-3da658yd.js')return import('../../utils/computerUse/mcpServer.js')
 if(specifier==='/$bunfs/root/chunk-c55v3bvq.js')return import('./InProcessTransport.js')
 const file=specifier.replace('/$bunfs/root/','');
 if(['chunk-19f3z1s7.js','chunk-7eyrbz6k.js','chunk-z87hm33f.js','chunk-y05pa6gs.js','chunk-kd5efewf.js','chunk-xnfg6na3.js'].includes(file))return getMcpConnectedProducer287().dynamicModules[file]
 return requiredOwner('original dynamic-import namespace '+specifier)
}

function loadMcpNativeModule287(specifier:string):unknown {
 if(!specifier.startsWith('/$bunfs/root/'))return require(specifier)
 const file=specifier.slice('/$bunfs/root/'.length)
 if(file==='chunk-vpw1fhah.js')return {default:require('ajv/dist/2020.js').default}
 if(['chunk-dyg2mvj3.js','chunk-frfqk3ee.js','chunk-4tgewp7y.js','chunk-beqz80va.js','chunk-vyg6da4q.js','chunk-q6r0xk7e.js','chunk-ay6r6mwz.js','chunk-qz95tynj.js'].includes(file))
  return new Proxy({}, {get(_target,key){return getMcpConnectedProducer287().dynamicModules[file]?.[String(key)]??requiredOwner('native module export '+file+':'+String(key))}})
 if(file==='chunk-zmnwds52.js')return require('../../utils/claudeInChrome/toolRendering.js')
 if(file==='chunk-caetv0cw.js')return require('../../utils/computerUse/wrapper.js')
 return new Proxy({}, {get(_target,key){return requiredOwner('conditional native module '+file+':'+String(key))}})
}

/** Generation carrier only: original row and genuine V2 SDK identity survive. */
export function adaptNativeModernConnection287(row:import('./officialConnected287/native.js').NativeModernConnection287):ConnectedMCPServerV2&import('./officialConnected287/native.js').NativeModernConnection287 {
 return Object.assign(row,{generation:'v2' as const,v2Client:row.client,isClosed:()=>row.client.transport===undefined});
}

export function isNativeModernConnection287(row:unknown):row is import('./officialConnected287/native.js').NativeModernConnection287 {
 return !!row&&typeof row==='object'&&'type'in row&&row.type==='connected'&&'client'in row&&!!row.client&&typeof row.client==='object'&&'getProtocolEra'in row.client&&typeof row.client.getProtocolEra==='function';
}
