import {getNullableCwd287} from '../cwd.js'
import {createRequire} from 'node:module'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {createChromeStandalone287,type ChromeStandalone287,type ChromePolicyHelperModule287} from './officialStandalone287/native.js'
import {createMcpConnectedPorts287,getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {createChromeContext287,createChromeServer287} from './runtime287.js'
import {officialInitStorageContext287,officialInitCredentials287} from '../../entrypoints/officialInitContext287/index.js'
import {enableConfigs,flushGlobalConfigWrites,handoffGlobalConfigStorage} from '../config.js'
import {isStorageV5PinnedOn} from '../secureStorage/storageV5.js'
import {getSecureStorage} from '../secureStorage/index.js'
import {sharedTlsMaterial287,tlsMaterialReporters287} from '../sharedTlsMaterial287.js'
import {configureGlobalAgents} from '../proxy.js'
import {getChromeClientCuts287} from './clientCutsRuntime287.js'
import type {ChromeClientCuts287} from './officialClientCuts287/native.js'
import {getSettingsCacheStore287,resetSettingsCache} from '../settings/settingsCache.js'
import {getPolicyParser287} from '../settings/policyParserOwner287.js'
import {ensureMdmSettingsLoaded,getMdmSettings,getHkcuSettings} from '../settings/mdm/settings.js'
import {getModelUsagePolicy287} from '../../services/context/modelUsagePolicy287.js'
import {getOriginalSettingsContext287} from '../settings/settingsReader287.js'
import type {PolicyReadContext287} from '../../services/context/officialModelUsagePolicy287/native.js'
import {loadManagedFileSettings} from '../settings/settings.js'
import {filesNativePolicySources287} from '../../services/api/filesPolicy287.js'
import {applySafeConfigEnvironmentVariables} from '../managedEnv.js'
import {getRemoteManagedSettingsRuntime287} from '../../services/remoteManagedSettings/syncCacheState.js'
import {nativeGatewayRefresh287} from '../../services/remoteManagedSettings/gatewayBindings287.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {logEvent,logEventAsync} from '../../services/analytics/index.js'
import {registerCleanup,runCleanupFunctions} from '../cleanupRegistry.js'
import {flushDebugLogs} from '../debug.js'
import type {GatewayCredential287} from '../../services/remoteManagedSettings/officialGatewayRefresh287/native.js'

const hostRequire=createRequire(import.meta.url)
let runtime:ChromeStandalone287|undefined
/** Read the existing helper owner without constructing or running standalone startup. */
export function getChromePolicyHelperModule287():ChromePolicyHelperModule287 {
 const {getOriginalModsLifecycle287}=require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-f1vb7bx7.js') as unknown as ChromePolicyHelperModule287
}
/** Original runner uses the same canonical helper namespace as direct readers. */
export function getChromeStandalone287():ChromeStandalone287 {
 return runtime??=createChromeStandalone287(createChromeStandalonePorts287())
}
export function createChromeStandalonePorts287():Record<string,unknown> {
 const mcp=createMcpConnectedPorts287(),policy=getModelUsagePolicy287()
 return {...mcp,
  canonicalPolicyModule:getChromePolicyHelperModule287(),
  builtins:new Proxy({}, {get:(_target,id)=>hostRequire(String(id))}),
  settingsStore:getSettingsCacheStore287,resetSettings:resetSettingsCache,
  storagePinned:isStorageV5PinnedOn,enableConfigs,mdmReady:ensureMdmSettingsLoaded,
  mdmSettings:getMdmSettings,hkcuSettings:getHkcuSettings,managedFile:loadManagedFileSettings,
  policyContext:getOriginalSettingsContext287,
  policyRecords:(context:PolicyReadContext287)=>policy.readPolicyRecords287(context),
  remotePolicyRead:(context:PolicyReadContext287)=>policy.remotePolicyRead287(context),
  adminPolicyRead:(context:PolicyReadContext287)=>policy.adminPolicyRead287(context),
  policyOriginFor:(context:PolicyReadContext287)=>policy.policyOriginFor287(context),
  helperPayload:getPolicyParser287().helperPayload287,policyText:getPolicyParser287().text,
  mdmOwner:getPolicyParser287().mdmOwner,optionalCwd:getNullableCwd287,
  nativeImport:async(file:string)=>getChromeStandalone287().dynamicModules[file.replace('/$bunfs/root/','')]??await (mcp.nativeImport as (file:string)=>Promise<unknown>)(file),
  initialSettings:filesNativePolicySources287.c7e,
  managedEnvironment:{applySafeConfigEnvironmentVariables},
  installGatewayPolicy:(read:()=>boolean)=>filesCredentialSlots.replaceGatewayRequiredByHostPolicyReader(read),
  gatewayAuth:()=>filesCredentialSlots.gatewayAuth(),gatewayRequired:()=>filesCredentialSlots.gatewayRequiredByHostPolicy(),
  setGatewayAuth:(auth:GatewayCredential287)=>filesCredentialSlots.replaceGatewayAuth(auth),
  gatewayFromEnvironment:nativeGatewayRefresh287.gatewayFromEnvironment,
  gatewayRefresh:nativeGatewayRefresh287.refreshGateway,
  secureStorage:getSecureStorage,
  remoteOwner:()=>getRemoteManagedSettingsRuntime287().owner(),
  loadCA:sharedTlsMaterial287.loadExtraCACerts,loadMTLS:sharedTlsMaterial287.loadMTLSClientMaterial,
  caCerts:sharedTlsMaterial287.getCACertificates,mtlsConfig:sharedTlsMaterial287.getMTLSConfig,
  configureProxy:configureGlobalAgents,
  initializeDebug:(...args:Parameters<ChromeClientCuts287['initializeDebug']>)=>getChromeClientCuts287().initializeDebug(...args),
  initializeIds:(...args:Parameters<ChromeClientCuts287['initializeIds']>)=>getChromeClientCuts287().initializeIds(...args),
  execFile:(...args:Parameters<ChromeClientCuts287['execFile']>)=>getChromeClientCuts287().execFile(...args),
  // Local canceled-telemetry leaf, not another queue/provider. Original outer
  // Br success/failure events retain their position and have no network sink.
  initializeAnalytics:()=>logEvent('chrome_analytics_disabled',{}),
  telemetryDrain:()=>logEventAsync('chrome_analytics_disabled',{}),
  shutdown:async()=>{await flushGlobalConfigWrites();await runCleanupFunctions();await flushDebugLogs()},
  adoptStorage:officialInitStorageContext287.adopt,credentialsFor:officialInitCredentials287,
  watchConfigStorage:handoffGlobalConfigStorage,
  chromePolicyPrepare:(options:Parameters<ReturnType<typeof getMcpConnectedProducer287>['chromePolicyPrepare']>[0])=>getMcpConnectedProducer287().chromePolicyPrepare(options),
  chromeBearerGate:(verified:Parameters<ReturnType<typeof getMcpConnectedProducer287>['chromeBearerGate']>[0])=>getMcpConnectedProducer287().chromeBearerGate(verified),
  chromeContext:createChromeContext287,
  chromeServer:(context:Parameters<typeof createChromeServer287>[0])=>{
   const {applyChromeLocalTransport287}=require('./mcpServer.js') as typeof import('./mcpServer.js')
   const server=createChromeServer287(applyChromeLocalTransport287(context)),unregister=registerCleanup(()=>server.close())
   const close=server.close.bind(server);server.close=async()=>{try{await close()}finally{unregister()}}
   return server
  },
  stdioTransport:StdioServerTransport,
  success:tlsMaterialReporters287.y,
 }
}
