import {APIError as InstalledSdkAPIError287,APIUserAbortError as InstalledSdkUserAbortError287,APIConnectionError as InstalledSdkConnectionError287,APIConnectionTimeoutError as InstalledSdkConnectionTimeoutError287} from '@anthropic-ai/sdk/error'
import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as os from 'node:os'
import * as util from 'node:util'
import * as path from 'node:path'
import * as asyncHooks from 'node:async_hooks'
import * as url from 'node:url'
import mapValues from 'lodash-es/mapValues.js'
import proof from './officialToolSchema287/provenance.json' with {type:'json'}
import {createToolSchema287,type ToolSchemaPorts287,type ToolSchemaRuntime287} from './officialToolSchema287/native.js'
let runtime:ToolSchemaRuntime287|undefined
const lifecycle=()=> (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
function sourceFunction287(file:string,name:string):(...args:unknown[])=>unknown {
 const value=lifecycle().clearSourceModule287(file)[name]
 if(typeof value!=='function')throw new TypeError(`Missing canonical ToolSearch source ${file}:${name}`)
 return value as (...args:unknown[])=>unknown
}
const customEndpoint287=()=>{
 const provider=require('./model/providers.js') as typeof import('./model/providers.js')
 return provider.getAPIProvider()==='firstParty'&&!provider.isFirstPartyAnthropicBaseUrl()
}
export function toolSearchMode287():'tst'|'tst-auto'|'standard' {
 const result=sourceFunction287('chunk-7qtw821h.js','zgt')()
 if(result!=='tst'&&result!=='tst-auto'&&result!=='standard')throw new TypeError('Invalid original ToolSearch mode')
 return result
}
/** Existing compatible-endpoint C changes only the endpoint capability policy. */
export function toolSearchModelSupported287(model:string):boolean {
 return customEndpoint287()||Boolean(sourceFunction287('chunk-7qtw821h.js','dQ')(model))
}
export function toolSearchOptimistic287():boolean {
 if(customEndpoint287())return sourceFunction287('chunk-7qtw821h.js','zgt')()!=='standard'
 return Boolean(sourceFunction287('chunk-7qtw821h.js','Vh')())
}
/** Same original sticky/token and memo owners; no copied rejection or preference state. */
export function isOriginalMidConvRejected287(latches:import('../services/context/officialExecutionOwners287/native.js').StickyBetas287):boolean {
 const token=(require('./modelBetas287.js') as typeof import('./modelBetas287.js')).getModelBetaProducer287().q_t('mid-conversation-system-2026-04-07')
 if(token===undefined)throw new TypeError('Missing original mid-conversation token')
 return Boolean(sourceFunction287('chunk-bn3p37gv.js','Lp')(latches,token))
}
export function getOriginalKeepForeignThinking287():'none'|'all'|'upgrade' {
 const value=(require('../commands/clear/lifecycle287.js') as typeof import('../commands/clear/lifecycle287.js')).getClearSourceModule287('chunk-mphp7acd.js').R0t
 if(typeof value!=='function')throw new TypeError('Missing original foreign-thinking owner')
 const result=value();if(result!=='none'&&result!=='all'&&result!=='upgrade')throw new TypeError('Invalid original foreign-thinking preference')
 return result
}
/** Original host/read/model owners are read lazily, including cold tool imports. */
export function toolSchemaProductionPorts287():ToolSchemaPorts287 {
 const model=()=>require('./modelBetas287.js') as typeof import('./modelBetas287.js')
 const communication=(require('../constants/communication287.js') as typeof import('../constants/communication287.js')).communication287
 const growthbook=require('../services/analytics/growthbook.js') as typeof import('../services/analytics/growthbook.js')
 const execution=require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')
 const schemaOwner=lifecycle().toolSchemaBindings287,description=schemaOwner.descriptionOwner
 const z=(require('zod/v4') as typeof import('zod/v4')).z
 const tokens=Object.fromEntries(proof.ports.filter(row=>row.port.startsWith('betaToken|')).map(row=>{const value=model().getModelBetaProducer287().q_t(row.port.slice(10));if(!value)throw new TypeError('Missing canonical beta '+row.port);return [row.port,value]}))
 const values=Object.fromEntries(proof.ports.filter(row=>row.port.startsWith('canonicalValue|')||row.port.startsWith('canonicalClear|')).map(row=>{
  const ns=row.port.startsWith('canonicalClear|')
   ?(require('../commands/clear/lifecycle287.js') as typeof import('../commands/clear/lifecycle287.js')).getClearSourceModule287(row.file)
   :lifecycle().clearSourceModule287(row.file)
  if(!Object.hasOwn(ns,row.name))throw new TypeError('Missing canonical API source value '+row.file+':'+row.name)
  return [row.port,ns[row.name]]
 }))
 const shared=Object.fromEntries(proof.ports.filter(row=>row.port.startsWith('canonical|')).map(row=>[row.port,sourceFunction287(row.file,row.name)]))
 return {...shared,...values,...tokens,
  sdkApiError:InstalledSdkAPIError287,sdkUserAbortError:InstalledSdkUserAbortError287,sdkConnectionError:InstalledSdkConnectionError287,sdkConnectionTimeoutError:InstalledSdkConnectionTimeoutError287,
  betaFromHeader:model().getModelBetaProducer287().r4r,experimentalAllowed:model().getModelBetaProducer287().Im,
  promptSnapshotReader:sourceFunction287('chunk-mphp7acd.js','s1'),
  attachmentRenderer:(attachment:Parameters<typeof import('./messages.js').normalizeAttachmentForAPI>[0])=>(require('./messages.js') as typeof import('./messages.js')).normalizeAttachmentForAPI(attachment),
  attachmentNormalizer:(attachment:Parameters<typeof import('./messages.js').normalizeAttachmentForAPI>[0])=>(require('./messages.js') as typeof import('./messages.js')).normalizeAttachmentForAPI(attachment),
  sourceUniqBy:sourceFunction287('chunk-09m4fzsj.js','Ll'),
  sourceCapability:sourceFunction287('chunk-wz6xag6e.js','ny'),sourceServedCapability:sourceFunction287('chunk-wz6xag6e.js','bzt'),sourceCapabilityOverride:sourceFunction287('chunk-wz6xag6e.js','L8r'),sourceAdvancedTools:sourceFunction287('chunk-nankzm0s.js','p8'),sourceCanonicalModel:sourceFunction287('chunk-nankzm0s.js','V0'),sourceMidConversationGate:sourceFunction287('chunk-nankzm0s.js','Ebn'),
  authPrecedence:sourceFunction287('chunk-8ptzhr8g.js','ew'),authInferenceEnabled:sourceFunction287('chunk-nankzm0s.js','BH'),inferenceScopes:sourceFunction287('chunk-nankzm0s.js','BWt'),oauthTokens:sourceFunction287('chunk-nankzm0s.js','fn'),
  listingFingerprint:sourceFunction287('chunk-09m4fzsj.js','vOo'),
  installedAccount:sourceFunction287('chunk-nankzm0s.js','In'),storedAccount:sourceFunction287('chunk-nankzm0s.js','Qm'),selectedAuth:sourceFunction287('chunk-nankzm0s.js','$k'),
  smallModel:sourceFunction287('chunk-nankzm0s.js','xS'),configuredMainModel:sourceFunction287('chunk-nankzm0s.js','xm'),
  lazySchema:(require('./lazySchema.js') as typeof import('./lazySchema.js')).lazySchema,
  globalConfig:()=> (require('./config.js') as typeof import('./config.js')).getGlobalConfig(),
  zObject:z.object,zString:z.string,zNumber:z.number,zArray:z.array,
  toolSearchPrompt:()=> (require('../tools/ToolSearchTool/prompt.js') as typeof import('../tools/ToolSearchTool/prompt.js')).getPrompt(),
  buildTool:(...args:unknown[])=>{
   const original=(require('../services/mcp/connectedProducer287.js') as typeof import('../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().sourceModule('chunk-1b21she7.js').Wt
   if(typeof original!=='function')throw new TypeError('Missing canonical Wt tool factory')
   return original(...args)
  },
  searchMode:sourceFunction287('chunk-7qtw821h.js','zgt'),searchOptimistic:toolSearchOptimistic287,searchModelSupported:toolSearchModelSupported287,
  declaredAvailability:sourceFunction287('chunk-09m4fzsj.js','Lke'),declaredSet:sourceFunction287('chunk-09m4fzsj.js','Wut'),declaredClass:lifecycle().clearSourceModule287('chunk-09m4fzsj.js').hde,
  deploymentCapability:sourceFunction287('chunk-09m4fzsj.js','a_e'),
  contextWindow:sourceFunction287('chunk-nankzm0s.js','pf'),
  deniedHelperModel:sourceFunction287('chunk-nankzm0s.js','Hbe'),mainModel:sourceFunction287('chunk-nankzm0s.js','rt'),
  requestBetas:model().getModelBetaProducer287().eZ,modelApiName:sourceFunction287('chunk-nankzm0s.js','Tx'),modelProvider:sourceFunction287('chunk-wz6xag6e.js','cc'),betaStrings:(...args:Parameters<ReturnType<typeof import('./modelBetas287.js').getModelBetaProducer287>['sT']>)=>model().getModelBetaProducer287().sT(...args),
  sdkClient:(...args:Parameters<typeof import('../services/api/client.js').getAnthropicClient>)=> (require('../services/api/client.js') as typeof import('../services/api/client.js')).getAnthropicClient(...args),
  tokenCountVcr:(...args:Parameters<typeof import('../services/vcr.js').withTokenCountVCR>)=> (require('../services/vcr.js') as typeof import('../services/vcr.js')).withTokenCountVCR(...args),
  excludedBedrockCount:()=>{throw new Error('Bedrock token counting is excluded by R04')},
  artifactSlot:(require('../services/context/artifactOwner287.js') as typeof import('../services/context/artifactOwner287.js')).artifactSource287.a,
  artifactState:(require('../services/context/artifactOwner287.js') as typeof import('../services/context/artifactOwner287.js')).artifactSource287.X,
  builtins:{crypto,fs,'fs/promises':fsPromises,os,util,path,async_hooks:asyncHooks,url},mapValues,
  environment:(require('./authEnvironment.js') as typeof import('./authEnvironment.js')).authEnvironment,
  execution:execution.getExecutionSession287,
  runtimeMemo:(require('../services/context/runtimeMemo287.js') as typeof import('../services/context/runtimeMemo287.js')).getRuntimeMemo287,
  catalogEntry:(require('./model/canonical287.js') as typeof import('./model/canonical287.js')).getBakedCatalogEntry287,
  behavior:(require('./model/behavior287.js') as typeof import('./model/behavior287.js')).getModelBehaviorName287,
  provider:(require('./model/providerSelectionBindings287.js') as typeof import('./model/providerSelectionBindings287.js')).getNativeAPIProvider287,
  firstPartyEndpoint:(require('./model/providers.js') as typeof import('./model/providers.js')).isFirstPartyRequestEndpoint,
  modelForPrompt:communication.modelForPrompt,lean:communication.leanForPrompt,
  promptPolicyOwner:communication.modelPolicyOwner,delegationCostsFirst:communication.delegationCostsFirst,
  allBetas:(...args:Parameters<ReturnType<typeof import('./modelBetas287.js').getModelBetaProducer287>['iwn']>)=>model().getModelBetaProducer287().iwn(...args),
  suppressCatalog:(...args:Parameters<ReturnType<typeof import('./modelBetas287.js').getModelBetaProducer287>['_j']>)=>model().getModelBetaProducer287()._j(...args),catalogSuppressed:(...args:Parameters<ReturnType<typeof import('./modelBetas287.js').getModelBetaProducer287>['XQ']>)=>model().getModelBetaProducer287().XQ(...args),
  experimentalDisabled:(...args:Parameters<ReturnType<typeof import('./modelBetas287.js').getModelBetaProducer287>['rK']>)=>model().getModelBetaProducer287().rK(...args),
  autoModeOwner:lifecycle().autoModeOwner,
  subscriber:(require('./auth.js') as typeof import('./auth.js')).isClaudeAISubscriber,
  subscription:(require('./auth.js') as typeof import('./auth.js')).getSubscriptionType,
  editTool:(require('../tools/FileEditTool/FileEditTool.js') as typeof import('../tools/FileEditTool/FileEditTool.js')).FileEditTool,
  bashTool:(require('../tools/BashTool/BashTool.js') as typeof import('../tools/BashTool/BashTool.js')).BashTool,
  config:growthbook.getFeatureValue_CACHED_MAY_BE_STALE,configWithSource:growthbook.getCachedFeatureValueWithSource287,
  cachedOrBlockingGate:growthbook.checkGate_CACHED_OR_BLOCKING,
  jsonStringify:(require('./slowOperations.js') as typeof import('./slowOperations.js')).jsonStringify,
  zodSchema:(require('./zodToJsonSchema.js') as typeof import('./zodToJsonSchema.js')).zodToJsonSchema,
  debug:(require('./debug.js') as typeof import('./debug.js')).logForDebugging,
  errorLog:(require('./log.js') as typeof import('./log.js')).logError,
  analytics:(require('../services/analytics/index.js') as typeof import('../services/analytics/index.js')).logEvent,
  briefToolName:(require('../tools/BriefTool/prompt.js') as typeof import('../tools/BriefTool/prompt.js')).BRIEF_TOOL_NAME,
  forkModule:require('../tools/AgentTool/forkSubagent.js') as typeof import('../tools/AgentTool/forkSubagent.js'),
  deferralOf:description.deferralOf,describedOnce:description.describedOnce,
  nonDeferrableTools:schemaOwner.nonDeferrableTools,lateBuiltinDeferral:schemaOwner.lateBuiltinDeferral,remoteFileDeferral:schemaOwner.remoteFileDeferral,
  cache:schemaOwner.cacheFacade,resolveDescription:description.resolveToolDescription,
  recordDeferral:description.recordDeferral,isDescribeHooked:description.isToolDescribeHooked,
  setDescribeResolver:description.setToolDescribeResolver,setDescribePresence:description.setToolDescribePresence,
  protocolGate:schemaOwner.protocolGate,hasHook:schemaOwner.hasHook,runHook:schemaOwner.runHook,
  mcpApproval:schemaOwner.mcpApproval,mcpServerRegistry:lifecycle().mcpServerRegistry,
  canonicalPluginName:lifecycle().pluginStorageAliases287.canonicalName,
  modsRegistry:lifecycle().registry,canonicalPluginId:lifecycle().pluginStorageAliases287.canonical,pluginIdAliases:lifecycle().pluginStorageAliases287.aliases,
  managedPlugins:lifecycle().registration.DN,pluginOrder:lifecycle().registration.jq,
  loadPlugins:(require('./plugins/pluginLoader.js') as typeof import('./plugins/pluginLoader.js')).loadAllPluginsCacheOnly,
  pluginMcpConfig:(require('./plugins/mcpPluginIntegration.js') as typeof import('./plugins/mcpPluginIntegration.js')).getPluginMcpServers,
 }
}
export function getToolSchemaRuntime287():ToolSchemaRuntime287 {
 return runtime??=createToolSchema287(toolSchemaProductionPorts287())
}
