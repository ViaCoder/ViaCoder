import {InVirtualListContext} from '../messageActions.js'
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import * as React from 'react'
import * as asyncHooks from 'node:async_hooks'
import * as childProcess from 'node:child_process'
import * as crypto from 'node:crypto'
import * as util from 'node:util'
import * as buffer from 'node:buffer'
import * as timersPromises from 'node:timers/promises'
import * as url from 'node:url'
import {createRequire} from 'node:module'
import {useExecutionSession287} from '../../context/executionProject287.js'
import {AppStoreContext} from '../../state/AppState.js'
import {getRootExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {getNativeFirstPartyRequest287} from '../../services/api/usageProduction287.js'
import {getUsageProgramEligibility287} from '../../services/api/usageConsumers287.js'
import {getOauthConfig} from '../../constants/oauth.js'
import {logForDebugging} from '../../utils/debug.js'
import {getRemoteManagedSettingsRuntime287} from '../../services/remoteManagedSettings/syncCacheState.js'
import {isPolicyAllowed} from '../../services/policyLimits/index.js'
import {getModelUsagePolicy287} from '../../services/context/modelUsagePolicy287.js'
import {getAuthTokenSource,getAnthropicApiKeyWithSource,getApiKeyFromConfigOrMacOSKeychain,getClaudeAIOAuthTokens} from '../../utils/auth.js'
import {getSecureStorage} from '../../utils/secureStorage/index.js'
import {getSettingsForSource,getSettingsFilePathForSource} from '../../utils/settings/settings.js'
import {getSettingsCacheStore287} from '../../utils/settings/settingsCache.js'
import {getFastStatusSettingsWriter287} from '../../utils/settings/fastStatusWriter287.js'
import {getMemoryFilesForSession287} from '../../utils/claudemd.js'
import {parseMcpConfig} from '../../services/mcp/config.js'
import {getOfficialModelMenuPolicy287,getOfficialModelReprobeRuntime287,officialModelPickerPorts287,createOfficialModelMenuPolicyPorts287} from '../../utils/model/officialModelPicker287.js'
import {getModelBehaviorName287} from '../../utils/model/behavior287.js'
import {getCanonicalDebugInstance287} from '../../utils/debug.js'
import {Markdown} from '../Markdown.js'
import {createBannerProductionPorts287,getBannerRuntime287} from './bannerProduction287.js'
import {createBannerNotices287,type BannerNotices287} from './officialBannerNotices287/native.js'
const nativeRequireHost287=createRequire(import.meta.url)
function modelPolicy(name:string,...args:unknown[]):unknown {const f=getOfficialModelMenuPolicy287()[name];if(typeof f!=='function')throw Error('Original notice model port '+name+' is not installed');return f(...args)}
export function createBannerNoticePorts287(){
 return {
  ...createBannerProductionPorts287(),InVirtualListContext,
  builtins:{fs,'fs/promises':fsPromises,path,os,process,async_hooks:asyncHooks,child_process:childProcess,crypto,util,buffer,'timers/promises':timersPromises,url},
  nativeRequire:nativeRequireHost287,
  sourceSession:()=>useExecutionSession287((session:ExecutionSession287)=>session),
  AppStoreContext,Children:React.Children,Fragment:React.Fragment,isValidElement:React.isValidElement,
  oneShotContext:getBannerRuntime287().oneShotContext,
  rootHostCell:(registry:{of(host:object):unknown})=>registry.of(getRootExecutionSession287().host),
  firstPartyRequest:getNativeFirstPartyRequest287().Gt,
  oauthConfig:getOauthConfig,
  usageLimitEligible:(limit:{resetsAt?:number;rateLimitType?:string;status:string})=>getUsageProgramEligibility287().nte(limit),
  remoteSettingsOwner:()=>getRemoteManagedSettingsRuntime287().owner(),
  policyAllowed:isPolicyAllowed,
  readMemoryFiles:getMemoryFilesForSession287,
  enterpriseMcpOwner:()=>{
   const owner=(require('../../services/mcp/connectedProducer287.js') as typeof import('../../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().sourceModule('chunk-mphp7acd.js')
   const read=owner.Unt as (()=>{fatalErrors():{path?:string;message:string}[];reset():void})|undefined
   if(typeof read!=='function')throw Error('Original canonical enterprise MCP owner is not exported')
   return read()
  },
  parseMcpConfig,authTokenSource:getAuthTokenSource,apiKeySource:getAnthropicApiKeyWithSource,savedApiKey:getApiKeyFromConfigOrMacOSKeychain,
  oauthTokens:getClaudeAIOAuthTokens,secureStorage:getSecureStorage,settingsForSource:getSettingsForSource,
  modelAllowed:(model:string,options?:Record<string,unknown>)=>getOfficialModelMenuPolicy287().$r(model,options),
  modelDeny:(model:string)=>getOfficialModelReprobeRuntime287().pQn(model),
  modelPredicateKw:(...args:unknown[])=>modelPolicy('Kw',...args),modelBehavior:getModelBehaviorName287,
  catalogEntry:officialModelPickerPorts287.xa,
  managedProvider:(provider?:string)=>{const fn=createOfficialModelMenuPolicyPorts287().zF;if(typeof fn!=='function')throw Error('Original provider predicate missing');return fn(provider)},
  modelProvider:()=>{const fn=createOfficialModelMenuPolicyPorts287().cc;if(typeof fn!=='function')throw Error('Original provider reader missing');return fn()},
  effectivePluginConfig:()=>getModelUsagePolicy287().allPolicyTiers(),
  helperArmedFromUserWritableBase:()=> (require('../../utils/claudeInChrome/standaloneRuntime287.js') as typeof import('../../utils/claudeInChrome/standaloneRuntime287.js')).getChromePolicyHelperModule287().czt(),
  debugMode:()=>getCanonicalDebugInstance287().isDebugMode(),debugToStderr:()=>getCanonicalDebugInstance287().toStderr,debugPath:()=>getCanonicalDebugInstance287().filePath,
  // iO is the original live merged-settings slot, not a new eager read/cache.
  policySettings:()=>getSettingsCacheStore287().mergedSettings,
  Markdown,defaultFable:officialModelPickerPorts287.eIe,
  policyModelOverrides:()=>{getSettingsForSource('policySettings');const paired=getSettingsCacheStore287().policy.pairedModelOverrides as {value:Record<string,string>|undefined}|undefined;return paired?.value},
  writeSettings:(...args:Parameters<ReturnType<typeof getFastStatusSettingsWriter287>['update']>)=>getFastStatusSettingsWriter287().update(...args),
  settingsPath:getSettingsFilePathForSource,
 }
}
export type BannerNoticePorts287=ReturnType<typeof createBannerNoticePorts287>
let runtime:(BannerNotices287 & {limitWallPromo287:{subscribe:BannerNotices287['limitWallSubscribe287'];enabled:BannerNotices287['limitWallEnabled287'];kickoff:BannerNotices287['limitWallKickoff287'];config:BannerNotices287['limitWallConfig287'];open:BannerNotices287['limitWallOpen287'];shown:BannerNotices287['limitWallShown287'];dismiss:BannerNotices287['limitWallDismiss287']}})|undefined
// These four display bodies remain the accepted LocalStartupHints C. Excluding
// their P registry entries avoids duplicate output without changing qualifications,
// normal warning/promo arbitration, or a second announcement owner.
export const LOCAL_BANNER_HINT_IDS287=new Set(['debug-mode','tmux-session','emergency-tip','company-announcement'])
export function getBannerNotices287(){
 if(runtime)return runtime
 const generated=createBannerNotices287(createBannerNoticePorts287())
 runtime=Object.assign(generated,{limitWallPromo287:{
  subscribe:generated.limitWallSubscribe287,enabled:generated.limitWallEnabled287,
  kickoff:generated.limitWallKickoff287,config:generated.limitWallConfig287,
  open:generated.limitWallOpen287,shown:generated.limitWallShown287,dismiss:generated.limitWallDismiss287,
 }})
 const definitions=runtime.sourceDefinitions as import('./officialBannerNotices287/native.js').BannerNoticeDefinition287[]
 for(let i=definitions.length-1;i>=0;i--)if(LOCAL_BANNER_HINT_IDS287.has(definitions[i]!.id))definitions.splice(i,1)
 return runtime
}
