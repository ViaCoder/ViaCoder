import {randomUUID} from 'node:crypto'
import {enqueue} from '../../utils/messageQueueManager.js'
import {getLegacyExecutionContext287} from '../context/execution287.js'
import {sharedHttpAuth} from '../../utils/sharedHttpAuth.js'
import axios from 'axios'
import {getNativeFirstPartyRequest287} from './usageProduction287.js'
import {z} from 'zod/v4'
import * as costs from '../../bootstrap/state.js'
import {getOauthAccountInfo,hasProfileScope,isClaudeAISubscriber,getSubscriptionType,getRateLimitTier} from '../../utils/auth.js'
import {isPolicyAllowed} from '../policyLimits/index.js'
import {getSecureStorageExecutionHost} from '../../utils/secureStorage/macOsKeychainHelpers.js'
import {getExecutionSession287} from '../context/execution287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {assertBedrockProviderRemoved,isFirstPartyAnthropicBaseUrl} from '../../utils/model/providers.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {getMainLoopModel} from '../../utils/model/model.js'
import {errorMessage,toError} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {createSignal} from '../../utils/signal.js'
import {getFeatureValue_CACHED_MAY_BE_STALE,getCachedFeatureValueWithSource287,initializeGrowthBook} from '../analytics/growthbook.js'
import {logEvent} from '../analytics/index.js'
import {getQuotaOwner287,getRateLimitDisplayName} from '../claudeAiLimits.js'
import {officialLowPriority} from '../../utils/lowPriority.js'
import {officialUsageLimitWait} from '../usageLimitWait.js'
import {getUsageProduction287} from './usageProduction287.js'
import {createUsagePublicBody287,createUsageSnapshot287,createUsageSdkReader287,createUsageSdkReply287,createUsageSdkControl287,createUsageBehavior287,createUsageProgramConfig287,createUsageProgramEligibility287,createUsageSurfaces287,createUsageProgramStatus287,createUsageTimeout287,createUsageExpectedError287,createUsageClock287,createUsageEventFields287,createUsageGrantField287,createUsageRollout287,createUsageLabels287,createUsageScopedModels287,createUsageSessionReason287,createUsageOwnLabel287,createUsageUiLoad287,createUsageUiDate287,createUsageSchemaBuilder287,createUsageUserFlags287} from './officialUsage287/runtime.js'
import type {UsageRateLimitPorts,SessionUsageHost,UsageReadResult,UsageQueryResponse,UsageBody,UsageSnapshot,UsageBehaviorRecord} from '../../cli/control/sessionQueries.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'

const userFlags=createUsageUserFlags287({a:authEnvironment,He:()=>{assertBedrockProviderRemoved();return getNativeAPIProvider287()},n:getExecutionSession287})
const buildSchema=createUsageSchemaBuilder287({})
export const usageBody287=createUsagePublicBody287({})
const expectedError=createUsageExpectedError287({})
const fields=createUsageEventFields287({}),grantField=createUsageGrantField287(fields),clock=createUsageClock287({}),rollout=createUsageRollout287({})
const labels=createUsageLabels287({ir:getSubscriptionType,ra:createUsageOwnLabel287({})})
export const usageScopedModels287=createUsageScopedModels287({k:getFeatureValue_CACHED_MAY_BE_STALE,
 IS:userFlags.IS,Uo:getCachedFeatureValueWithSource287,
 Vd:initializeGrowthBook,Dt:async(task,ms,message)=>{let timer:ReturnType<typeof setTimeout>|undefined;try{return await Promise.race([task,new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error(message)),ms)})])}finally{clearTimeout(timer)}},t:logForDebugging})
/** No new snapshot/cache: original IAo/P2n/OAo read and publish through the
 * supplied existing config owner, and VV/ZRr read the canonical quota owner. */
export function createUsageRateLimitReader287(ports:UsageRateLimitPorts){
 const snapshot=createUsageSnapshot287({
  In:()=>({accountUuid:ports.accountUuid()}),le:()=>({cachedUsageUtilization:ports.readSnapshot()}),
  Ae:(update,_storageV5)=>ports.writeSnapshot(update({cachedUsageUtilization:ports.readSnapshot()}).cachedUsageUtilization as UsageSnapshot|undefined,_storageV5),
  f:buildSchema,mt:z.object,cn:z.number,ue:z.string,Eo:z.boolean,Qn:z.array,
  yc:ports.quotaOwner??getQuotaOwner287(),
 })
 const reader=createUsageSdkReader287({...snapshot,...usageBody287,
  In:()=>({accountUuid:ports.accountUuid()}),ft:isClaudeAISubscriber,zp:hasProfileScope,
  g0:credentials=>ports.fetchUsage(credentials),Gne:()=>ports.scopedModelDisplayNames(),
  BMr:()=>ports.ensureScopedModelsReady(),_:JSON.stringify,
  // Expected cancellation/held HTTP results use the existing error owner.
  Pu:expectedError,l:errorMessage,t:logForDebugging,d:logError,
 })
 return Object.assign((storageV5=ports.storageV5,credentials=ports.credentials)=>reader.read(storageV5,credentials),{seed:reader.seed})
}
export function getSdkUsageReply287(host:SessionUsageHost,options:{includeBehaviors?:boolean;storageV5?:unknown;credentials?:CredentialStore}):Promise<UsageQueryResponse>{
 const aggregate=createUsageBehavior287({ue:async(since,observe,storageV5,observeLoop)=>{
  if(host.foldUsageRecords)return host.foldUsageRecords(since,observe,storageV5,observeLoop)
  for await(const row of host.scanBehaviorRecords(since))observe(row)
 }})
 const reply=createUsageSdkReply287({...usageBody287,
  ft:isClaudeAISubscriber,zp:hasProfileScope,uMn:(storageV5,credentials)=>host.readRateLimits(storageV5,credentials),
  kMe:()=>({allowed:host.allowsTranscriptScan?host.allowsTranscriptScan():isPolicyAllowed('allow_usage_transcript_scan')}),
  lRt:aggregate,Gne:()=>host.getScopedModelDisplayNames(),
  d:logError,t:logForDebugging,l:errorMessage,
  ah:costs.getTotalCostUSD,_O:costs.getTotalAPIDuration,aie:costs.getTotalDuration,
  REe:costs.getTotalLinesAdded,xEe:costs.getTotalLinesRemoved,nP:costs.getModelUsage,ir:getSubscriptionType,
 })
 return reply(options)
}
export function getSdkUsageControl287(request:{skip_behaviors?:unknown},host:SessionUsageHost,ParameterError:new(message?:string)=>Error):Promise<UsageQueryResponse>{
 const control=createUsageSdkControl287({Hr:ParameterError,tJt:options=>getSdkUsageReply287(host,options)})
 return control(request,{redactsPersistedLane:host.redactsPersistedLane.bind(host),credentials:host.credentials,storageV5:host.storageV5})
}

const programConfig=createUsageProgramConfig287({k:getFeatureValue_CACHED_MAY_BE_STALE})
const surfaces=createUsageSurfaces287({n:getExecutionSession287})
const eligibility=createUsageProgramEligibility287({...surfaces,ft:isClaudeAISubscriber,In:getOauthAccountInfo,
 ja:isFirstPartyAnthropicBaseUrl,Pt:userFlags.Pt,ir:getSubscriptionType,YE:getRateLimitTier,Ev:enqueue,Ge:()=>{const legacy=getLegacyExecutionContext287();const session=getExecutionSession287();return legacy?.sessionId??session.identity.mainAgentId(session.id)},t:randomUUID})
let programOwner:ReturnType<typeof createUsageProgramStatus287>|undefined
export function getUsageProgramPorts287(){
 return {...programConfig,...eligibility,
  U:()=>({host:getSecureStorageExecutionHost()}),Od:costs.onSessionSwitch,Oqe:createUsageSessionReason287({}),Ob:()=>getQuotaOwner287().accountEpoch,Me:createSignal,
  k:getFeatureValue_CACHED_MAY_BE_STALE,...rollout,
  kN:officialLowPriority.NMe,vV:officialUsageLimitWait.TG,sLe:officialUsageLimitWait.Y0e,
  plt:credentials=>getQuotaOwner287().probeQuotaStatus(getMainLoopModel(),credentials),
  lt:createUsageTimeout287({}),zp:hasProfileScope,g0:(credentials,options)=>getUsageProduction287().read(credentials,options),
  Sut:usageBody287.Sut,t:logForDebugging,f:buildSchema,u:z.object,H:z.boolean,B:z.enum,T:z.array,se:z.unknown,o:z.string,C:z.number,de:z.record,
  Z:toError,dqn:error=>getUsageProduction287().isAuthRejected(error),d:logError,
  i:(event,metadata)=>logEvent(event,metadata as Parameters<typeof logEvent>[1]),
  ...fields,ye:grantField,Tu:clock,...labels,
  pa:()=>getQuotaOwner287().currentLimits,Qn:randomUUID,In:getOauthAccountInfo,
  E_:sharedHttpAuth.with401,Gt:getNativeFirstPartyRequest287().Gt,Pu:expectedError,gd:axios.isAxiosError,
  y:(feature:string)=>logEvent('tengu_feature_ok',{}),p:(feature:string,reason:string)=>logEvent('tengu_feature_degraded',{}),
  BD:officialUsageLimitWait.SO,sH:officialLowPriority.K0,
  bKe:(windows:Parameters<ReturnType<typeof getQuotaOwner287>['forgetHeldWindows']>[0])=>getQuotaOwner287().forgetHeldWindows(windows),
  Mhe:(limit:Parameters<ReturnType<typeof getQuotaOwner287>['emitStatusChange']>[0])=>getQuotaOwner287().emitStatusChange(limit),
  rM:programConfig.rM,One:programConfig.One,Wm:programConfig.Wm,Bzn:programConfig.Bzn,
 }
}
export function getUsagePrograms287(){return programOwner??=createUsageProgramStatus287(getUsageProgramPorts287())}
export function getUsageProgramEligibility287(){return eligibility}

export {programConfig as usageProgramConfig287}

/** Full original Settings usage load callback; rendering stays in its existing
 * component. The actual SDK reader and its snapshot/quota/auth owners are shared. */
const uiDate=createUsageUiDate287({})
export function createUsageUiLoader287(context:{credentials?:CredentialStore;storageV5?:unknown},publish:{loading(value:boolean):void;error(value:string|null):void;state:Parameters<typeof createUsageUiLoad287>[0]['N']}){
 const host=require('../../cli/control/usageHost.js').createLocalSessionUsageHost(()=>false,context) as SessionUsageHost
 return createUsageUiLoad287({FS:uiDate,h:context.storageV5,f:context.credentials,q:publish.loading,V:publish.error,N:publish.state,
  uMn:()=>host.readRateLimits(),JLt:usageBody287.JLt,
  y:()=>logEvent('tengu_feature_ok',{}),m:()=>logEvent('tengu_feature_bad',{}),p:()=>logEvent('tengu_feature_degraded',{}),
 })
}
