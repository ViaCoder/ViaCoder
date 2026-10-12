import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import * as net from 'node:net'
import * as dns from 'node:dns'
import * as crypto from 'node:crypto'
import * as utilTypes from 'node:util/types'
import * as asyncHooks from 'node:async_hooks'
import * as childProcess from 'node:child_process'
import {context,trace,propagation,defaultTextMapSetter} from '@opentelemetry/api'
import {enqueuePendingNotification} from '../messageQueueManager.js'
import {getEnabledSettingSources} from '../settings/constants.js'
import {getSettingsCacheStore287} from '../settings/settingsCache.js'
import {findGitBashPath} from '../windowsPaths.js'
import {getCurrentSpan,isEnhancedTelemetryEnabled,isBetaTracingEnabled} from '../telemetry/sessionTracing.js'
import {z} from 'zod/v4'
import {APIUserAbortError} from '@anthropic-ai/sdk'
import axios from 'axios'
import omit from 'lodash-es/omit.js'
import omitBy from 'lodash-es/omitBy.js'
import pick from 'lodash-es/pick.js'
import snakeCase from 'lodash-es/snakeCase.js'
import memoize from 'lodash-es/memoize.js'
import {createHooksOutside287,type HooksOutside287,type HookProcessBoundaryWrapper287} from './officialHooksOutside287/native.js'
import {getExecutionSession287,getLegacyExecutionContext287,getRootExecutionSession287,executionSessionRegistryConstructor287,getExecutionWorkspaceConfinement287,requireExecutionWorkspaceConfinement287} from '../../services/context/execution287.js'
import {getSurfaceIdentity287} from '../../services/context/surface287.js'
import {authEnvironment} from '../authEnvironment.js'
import {modsRegistryOwner287} from '../plugins/modsRegistryOwner287.js'
import {createModsPolicy287} from '../plugins/officialModsPolicy287/native.js'
import {getModelUsagePolicy287,getModelUsagePolicyContext287} from '../../services/context/modelUsagePolicy287.js'
import {getInitialSettings} from '../settings/settings.js'
import {logForDebugging} from '../debug.js'
import {logForDiagnosticsNoPII} from '../diagLogs.js'
import {logEvent} from '../../services/analytics/index.js'
import {logOTelEvent} from '../telemetry/events.js'
import {isEssentialTrafficOnly} from '../privacyLevel.js'
import {jsonStringify,jsonParse} from '../slowOperations.js'
import {lazySchema} from '../lazySchema.js'
import {hookOutputParser287} from './outputParser287.js'
import {hookResultProcessor287} from './resultProcessor287.js'
import {createCombinedAbortSignal} from '../combinedAbortSignal.js'
import {startSessionActivity,stopSessionActivity} from '../sessionActivity.js'
import {subprocessEnv,getSubprocessEnvPolicyOwner287} from '../subprocessEnv.js'
import {wrapSpawn} from '../ShellCommand.js'
import {TaskOutput} from '../task/TaskOutput.js'
import {pathExists} from '../file.js'
import {getPlatform} from '../platform.js'
import {getCachedPowerShellPath} from '../shell/powershellDetection.js'
import {DEFAULT_HOOK_SHELL} from '../shell/shellProvider.js'
import {getPluginDataDir} from '../plugins/pluginDirectories.js'
import {getHookEnvFilePath} from '../sessionEnvironment.js'
import {getProxyUrl,shouldBypassProxy} from '../proxy.js'
import {registerPendingAsyncHook} from './AsyncHookRegistry.js'
import {emitHookResponse,startHookProgressInterval} from './hookEvents.js'
import {registrationCommitted287,waitHookRegistration287} from './modelSwitch287/registrationGate.js'
import {modelSwitchErrors287} from './modelSwitch287/errors.js'
const hooks=()=>import.meta.require('../hooks.js') as typeof import('../hooks.js')
/** Share the existing stateless tracing supplier with tool deferral. */
export function getHookTraceparent287():string|undefined {
   if(!isEnhancedTelemetryEnabled()&&!isBetaTracingEnabled())return undefined
   const span=getCurrentSpan();if(!span)return undefined
   const id=span.spanContext().traceId;if(!id||id==='00000000000000000000000000000000')return undefined
   const carrier:Record<string,string>={};propagation.inject(trace.setSpan(context.active(),span),carrier,defaultTextMapSetter);return carrier.traceparent
}
/** Local C only: called inside original IB, after its real cwd/shell resolution
 * and any explicit xe transformation, before any child exists. */
async function mandatoryHookProcessWrapper287(input:Parameters<HookProcessBoundaryWrapper287>[0]):ReturnType<HookProcessBoundaryWrapper287>{
 const owner=getExecutionSession287()
 const policy=getExecutionWorkspaceConfinement287()
 if(!policy)return undefined
 const validate=()=>{
  if(getExecutionSession287()!==owner||getExecutionWorkspaceConfinement287()!==policy||requireExecutionWorkspaceConfinement287()!==policy)
   throw Error('Hook workspace execution owner changed')
  policy.assertRootIdentity()
  policy.preflightCwd(fs.realpathSync.native(input.cwd))
 }
 validate()
 if(input.signal.aborted)return undefined
 const {SandboxManager}=await import('../sandbox/sandbox-adapter.js')
 const {quote}=await import('shell-quote')
 let command=input.wrappedCommand
 if(command===undefined){
  if(input.exec)command=quote([input.exec[0],...input.exec[1]])
  else if(input.shell==='powershell'){
   const executable=await getCachedPowerShellPath()
   if(!executable)throw Error('Hook requires PowerShell but no PowerShell executable was found on PATH')
   // Original Isn() argv, including execution-policy preference and -Command.
   // PowerShell source remains one literal argument, never parsed as POSIX sh.
   command=quote([executable,...input.powerShellArgs])
  }else command=input.command
 }
 await SandboxManager.initialize()
 if(input.signal.aborted)return undefined
 const wrapped=await SandboxManager.wrapWithSandbox(command,'/bin/sh',undefined,input.signal)
 let attached=false,cleaned=false
 const cleanup=()=>{if(!cleaned){cleaned=true;SandboxManager.cleanupAfterCommand()}}
 try{validate()}catch(error){cleanup();throw error}
 return {
  command:wrapped,
  attach(result){
   try{
    const settled=result.then(cleanup,cleanup)
    attached=true
    void settled.catch(error=>logForDebugging(`Hook sandbox cleanup failed: ${String(error)}`,{level:'error'}))
   }catch(error){cleanup();throw error}
  },
  [Symbol.dispose](){if(!attached)cleanup()},
 }
}
/** Bind existing owners lazily: a cold Hooks import does not create another
 * execution root, registration cell, settings policy or active-hooks store. */
export function createOutsideHookPorts287():Record<string,unknown>{
 const ports:Record<string,unknown>={
  fs,'promises':fsPromises,path,os,net,dns,crypto,types:utilTypes,async_hooks:asyncHooks,child_process:childProcess,'path/win32':path.win32,
  execution:getExecutionSession287,legacy:getLegacyExecutionContext287,
  rootExecution:{get host(){return getRootExecutionSession287().host},get hookRegistry(){return getRootExecutionSession287().hookRegistry}},sessionRegistry:executionSessionRegistryConstructor287,
  // Keep the existing host registry, but resolve its exported callback at use:
  // config may register root cleanup before surface287 finishes initialization.
  surfaceRegistry:{of:(...args:Parameters<typeof getSurfaceIdentity287>)=>getSurfaceIdentity287(...args)},environment:authEnvironment,
  registrationCommitted:(...args:Parameters<typeof registrationCommitted287>)=>registrationCommitted287(...args),registrationWait:(...args:Parameters<typeof waitHookRegistration287>)=>waitHookRegistration287(...args),
  mods:()=>modsRegistryOwner287.registry(),modsEngine:()=>createModsPolicy287().engineState(),
  settingsPolicyContext:getModelUsagePolicyContext287,settingsStore:getSettingsCacheStore287,allowedSettingSources:getEnabledSettingSources,
  gitBashPath:(...args:Parameters<typeof findGitBashPath>)=>findGitBashPath(...args),enqueuePendingNotification,
  traceparent:getHookTraceparent287,
  policyHelperComposition:(context:Parameters<ReturnType<typeof getModelUsagePolicy287>['readPolicyHelperComposition287']>[0])=>getModelUsagePolicy287().readPolicyHelperComposition287(context),
  policyRecords:(context:Parameters<ReturnType<typeof getModelUsagePolicy287>['readPolicyRecords287']>[0])=>getModelUsagePolicy287().readPolicyRecords287(context),
  settingsForSource:(source:Parameters<ReturnType<typeof getModelUsagePolicy287>['readSource']>[0])=>getModelUsagePolicy287().readSource(source,getModelUsagePolicyContext287()),
  initialSettings:getInitialSettings,
  match:(...args:Parameters<ReturnType<ReturnType<typeof hooks>['getHookMatcher287']>['match']>)=>hooks().getHookMatcher287().match(...args),
  trustAccepted:()=>!hooks().shouldSkipHookDueToTrust(),activeHooksStore:()=>hooks().getActiveHooksStore287(),
  debug:logForDebugging,diagnostics:logForDiagnosticsNoPII,analytics:logEvent,otel:logOTelEvent,
  essentialOnly:isEssentialTrafficOnly,stringify:jsonStringify,parse:(...args:Parameters<typeof jsonParse>)=>jsonParse(...args),
  featureFlag:(name:string,fallback:unknown)=>(import.meta.require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')).getFeatureValue_CACHED_MAY_BE_STALE(name,fallback),
  omit,omitBy,pick,snakeCase,memoize,lazySchema,zObject:z.object,zEnum:z.enum,zString:z.string,
  commandParser:(...args:Parameters<typeof hookOutputParser287.commandParser>)=>hookOutputParser287.commandParser(...args),httpParser:(...args:Parameters<typeof hookOutputParser287.httpParser>)=>hookOutputParser287.httpParser(...args),terminalSequence:(...args:Parameters<typeof hookResultProcessor287.terminalSequence>)=>hookResultProcessor287.terminalSequence(...args),
  combinedAbort:createCombinedAbortSignal,startKeepalive:(...args:Parameters<typeof startSessionActivity>)=>startSessionActivity(...args),stopKeepalive:(...args:Parameters<typeof stopSessionActivity>)=>stopSessionActivity(...args),
  // The raw consumer only constructs this port; return the actual TaskOutput
  // instance after its module finishes, without a replacement class/state.
  subprocessEnv,wrapSpawn,mandatoryProcessWrapper:(...args:Parameters<HookProcessBoundaryWrapper287>)=>mandatoryHookProcessWrapper287(...args),TaskOutput:function(...args:ConstructorParameters<typeof TaskOutput>){return new TaskOutput(...args)},platform:getPlatform,pathExists,powershell:getCachedPowerShellPath,hookShell:()=>DEFAULT_HOOK_SHELL,
  pluginDataDir:getPluginDataDir,hookEnvFile:getHookEnvFilePath,proxyUrl:getProxyUrl,bypassProxy:shouldBypassProxy,
  httpClient:(import.meta.require('axios') as typeof import('axios')).default,progressInterval:startHookProgressInterval,registerAsync:registerPendingAsyncHook,emitResponse:emitHookResponse,
  hooksError:(import.meta.require('./modelSwitch287/errors.js') as typeof import('./modelSwitch287/errors.js')).modelSwitchErrors287.Oe,sdkUserAbortError:APIUserAbortError,controlStreamClosedError:(import.meta.require('./modelSwitch287/errors.js') as typeof import('./modelSwitch287/errors.js')).modelSwitchErrors287.Hl,telemetrySafeError:(import.meta.require('./modelSwitch287/errors.js') as typeof import('./modelSwitch287/errors.js')).modelSwitchErrors287.P,
  firstParty:()=> (import.meta.require('../model/providers.js') as typeof import('../model/providers.js')).getAPIProvider()==='firstParty',
  oauthEnabled:()=> (import.meta.require('../auth.js') as typeof import('../auth.js')).isClaudeAISubscriber(),
  oauthTokens:()=> (import.meta.require('../auth.js') as typeof import('../auth.js')).getClaudeAIOAuthTokens(),
  apiKey:()=> (import.meta.require('../auth.js') as typeof import('../auth.js')).getAnthropicApiKey(),
  mcpGeneration:()=> (import.meta.require('../../services/mcp/v2Lifecycle.js') as typeof import('../../services/mcp/v2Lifecycle.js')).resolveMcpSdkGeneration(),
  invokeMcp:(connection:Parameters<typeof import('../../services/mcp/connectionAccess.js').getConnectedMcpClient>[0],request:unknown,options:unknown)=>{
   // Local V2 connections expose v2Client; use the existing discriminator,
   // never cast the modern client as a V1 SDK or retry it through another tree.
   const access=(import.meta.require('../../services/mcp/connectionAccess.js') as typeof import('../../services/mcp/connectionAccess.js')).getConnectedMcpClient(connection)
   const runtime=getOutsideHookRuntime287()
   return access.generation==='v2'?runtime.invokeModern(access.client,request,options):runtime.invokeLegacy(access.client,request,options)
  },
  secureStorage:()=> (import.meta.require('../secureStorage/index.js') as typeof import('../secureStorage/index.js')).getSecureStorage(),
  sandboxProxy:async()=>{
   const {SandboxManager}=await import('../sandbox/sandbox-adapter.js')
   if(!SandboxManager.isSandboxingEnabled())return undefined
   await SandboxManager.waitForNetworkInitialization()
   const port=SandboxManager.getProxyPort();if(!port)return undefined
   const token=(SandboxManager as typeof SandboxManager&{getProxyAuthToken():string|undefined}).getProxyAuthToken()
   return {host:'127.0.0.1',port,protocol:'http',...(token?{auth:{username:'srt',password:token}}:{})}
  },
 }
 // Original C is the shared Ae, not a fresh environment-scrub latch.
 Object.defineProperty(ports,'subprocessScrubState',{enumerable:true,get:getSubprocessEnvPolicyOwner287})
 return ports
}
var outside:HooksOutside287|undefined
export function getOutsideHookRuntime287():HooksOutside287{return outside??=createHooksOutside287(createOutsideHookPorts287())}
