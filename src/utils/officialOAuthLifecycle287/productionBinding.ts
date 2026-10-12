import {z} from 'zod/v4'
import {createOAuthInstall287, type OAuthInstallPorts287} from './install.js'
import {createOAuthReset287, type OAuthResetPorts287} from './reset.js'
import {createOAuthArtifact287} from './artifact.js'
import {createOAuthDbIdentity287} from './dbIdentity.js'
import {createOAuthArtifactServed287} from './artifactServed.js'
import {createOAuthGithub287} from './github.js'
import {createOAuthMemoryReset287} from './memoryReset.js'
import {createOAuthSourceGates287} from './sourceGates.js'
import {createOAuthConfigHelpers287} from './configHelpers.js'
import {createOAuthStrings287} from './strings.js'
import {createOAuthErrors287} from './errors.js'
import {createOAuthNotification287} from './notification.js'
import {createOAuthMetricsReset287} from './metricsReset.js'
import {createOAuthTtl287} from './ttl.js'
import {createOAuthMetricsLabel287} from './metricsLabel.js'
import {createOAuthPathReset287} from './pathReset.js'
import {createOAuthGatewayWait287} from './gatewayWait.js'
import {createOAuthModelReset287} from './modelReset.js'
import {createOAuthGatewayRevoke287} from './gatewayRevoke.js'
import {createOAuthContinuation287} from './continuation.js'
import type {CredentialStore} from '../officialSecureStorage/runtime.js'

// Required public source hand-in for the gateway-qualified branch. The
// ordinary personal client never fabricates a gateway transport/account.
export interface OAuthGatewayLogoutSource287 {
 s8(url:URL):unknown;ope(target:unknown,credentials?:CredentialStore):Promise<unknown>;
 spe(options:unknown,url:string):unknown;sH(url:string,options:unknown):Promise<string|undefined>;
 OQn(base:string,endpoint:string):string|undefined;
 $w(url:string,body:{token:string;token_type_hint?:string},options:unknown,kind:string):Promise<void>;
}
const orgMemorySourceNames287=['$f','G','Kwn','ci','mJe','qbe','yr'] as const
export type OAuthOrgMemorySource287=Record<typeof orgMemorySourceNames287[number],(...args:unknown[])=>unknown>
let orgMemorySource:OAuthOrgMemorySource287|undefined
export function handInOAuthOrgMemorySource287(source:OAuthOrgMemorySource287):void{orgMemorySource=source}
function orgMemorySource287(key:typeof orgMemorySourceNames287[number]):(...args:unknown[])=>unknown {
 const fn=orgMemorySource?.[key]
 if(!fn)throw Error('Original org-memory source port has not been handed in: '+key)
 return fn
}
// The frozen telemetry C never activates the metrics check producer. Retain
// its full source interface for an explicit host hand-in, without an HTTP
// collector, fabricated metrics flag or default-success status.
export type OAuthMetricsSource287=Pick<import('./metricsReset.js').OAuthMetricsResetPorts287,'E_'|'Gt'|'NM'|'Ope'|'dn'>
let metricsSource:OAuthMetricsSource287|undefined
export function handInOAuthMetricsSource287(source:OAuthMetricsSource287):void{metricsSource=source}
function metricsSource287():OAuthMetricsSource287{if(!metricsSource)throw Error('Frozen telemetry C: metrics producer source not activated');return metricsSource}
let gatewaySource:OAuthGatewayLogoutSource287|undefined
export function handInOAuthGatewayLogoutSource287(source:OAuthGatewayLogoutSource287):void{gatewaySource=source}
function gateway():OAuthGatewayLogoutSource287 {
 if(!gatewaySource)throw Error('Original OAuth gateway logout source has not been handed in')
 return gatewaySource
}

// Resolve the already-existing owners lazily. Importing auth must not eagerly
// initialize bootstrap/Mods/context or snapshot a credential backend.
function auth(){return require('../auth.js') as typeof import('../auth.js')}
function config(){return require('../config.js') as typeof import('../config.js')}
function slots(){return (require('../../vendor/official-files-api/slots.js') as typeof import('../../vendor/official-files-api/slots.js')).filesCredentialSlots}
function execution(){return require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')}
function storage(){return (require('../secureStorage/index.js') as typeof import('../secureStorage/index.js')).getSecureStorage()}
function storageCore(){return (require('../secureStorage/officialRuntime.js') as typeof import('../secureStorage/officialRuntime.js')).secureStorageCore}
function persistence(){return (require('../sharedOAuthPersistence.js') as typeof import('../sharedOAuthPersistence.js')).sharedOAuthPersistence}
function credentials(){return (require('../oauthInstallPreparation287.js') as typeof import('../oauthInstallPreparation287.js')).oauthPreparationCredentials287}
function models(){return require('../model/officialModelPicker287.js') as typeof import('../model/officialModelPicker287.js')}
function oauth(){return require('../../services/oauth/client.js') as typeof import('../../services/oauth/client.js')}
function events(){return require('../../services/analytics/index.js') as typeof import('../../services/analytics/index.js')}
function limits(){return require('../../services/claudeAiLimits.js') as typeof import('../../services/claudeAiLimits.js')}
const debug=(...args:Parameters<typeof import('../debug.js')['logForDebugging']>)=> (require('../debug.js') as typeof import('../debug.js')).logForDebugging(...args)
const report=(error:unknown)=> (require('../log.js') as typeof import('../log.js')).logError(error)
const pinned=()=> (require('../secureStorage/storageV5.js') as typeof import('../secureStorage/storageV5.js')).isStorageV5PinnedOn()
const environment=()=> (require('../authEnvironment.js') as typeof import('../authEnvironment.js')).authEnvironment
const sleep=(ms:number)=> (require('../sleep.js') as typeof import('../sleep.js')).sleep(ms)
const event=(name:string,data:Record<string,unknown>={})=>events().logEvent(name,data as never)
const success=(name:string)=>event('tengu_feature_ok',{feature_name:name})
const sad=(name:string,reason:string)=>event('tengu_feature_sad',{feature_name:name,error_code:reason})
const originalErrors=createOAuthErrors287({})
const notification=createOAuthNotification287({})
const configHelpers=createOAuthConfigHelpers287(createOAuthStrings287({}))

let lifecycle:ReturnType<typeof createProduction>|undefined
function createProduction(){
 const U=execution().getExecutionSession287,Tt=execution().executionSessionRegistryConstructor287
 const V=(require('../../services/policyLimits/officialIdentity286/hostCell.js') as typeof import('../../services/policyLimits/officialIdentity286/hostCell.js')).OfficialHostCell286
 // New previously-absent *original* optional cells only. Do not create A(),
 // the private artifact graph, or another credential/model/permission cache.
 const artifact=createOAuthArtifact287({a:()=> (require('../../services/context/artifactOwner287.js') as typeof import('../../services/context/artifactOwner287.js')).getArtifactSlot287(),t:debug,l:originalErrors.l,ee:sleep})
 const dbIdentity=createOAuthDbIdentity287({V})
 const artifactServed=createOAuthArtifactServed287({Tt})
 const Gt={get:(...args:Parameters<ReturnType<typeof import('../../services/api/usageProduction287.js')['getNativeFirstPartyRequest287']>['Gt']['get']>)=>
  (require('../../services/api/usageProduction287.js') as typeof import('../../services/api/usageProduction287.js')).getNativeFirstPartyRequest287().Gt.get(...args)}
 const github=createOAuthGithub287({V,Gt,le:()=>config().getGlobalConfig(),Ae:(...args:Parameters<typeof import('../config.js')['saveGlobalConfig']>)=>config().saveGlobalConfig(...args),
  d:report,a:environment(),In:()=>credentials().storedIdentity(),$k:()=> (require('../../services/policyLimits/officialIdentityBindings286.js') as typeof import('../../services/policyLimits/officialIdentityBindings286.js')).principalPorts287.$k(),
  f:(require('../lazySchema.js') as typeof import('../lazySchema.js')).lazySchema,u:z.object,o:z.string,B:z.enum,
  k:(...args:Parameters<typeof import('../../services/analytics/growthbook.js')['getFeatureValue_CACHED_MAY_BE_STALE']>)=> (require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')).getFeatureValue_CACHED_MAY_BE_STALE(...args),p:sad,y:success})
 const gates=createOAuthSourceGates287({a:environment()})
 const wait=createOAuthGatewayWait287({})
 // MM itself is already bound by the full Projects qualification owner.
 const memory=createOAuthMemoryReset287({MM:()=> (require('../../services/context/projects287.js') as typeof import('../../services/context/projects287.js')).getProjectQualification287().MM(),
  Pn:{of:(host:object)=> (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().memoryContextSlot.of(host)}})
 const toolDescriptions=()=> (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().toolDescriptionOwner287
 const model=createOAuthModelReset287({Xr:()=>models().getOfficialModelPickerProviderOwner287(),Wn:()=>toolDescriptions().cache(),pH:()=>toolDescriptions().forgetDeferrals()})
 const pathReset=createOAuthPathReset287({
    $f:(...args:unknown[])=>orgMemorySource287('$f')(...args),
  G:(...args:unknown[])=>orgMemorySource287('G')(...args),
  Kwn:(...args:unknown[])=>orgMemorySource287('Kwn')(...args),
  ci:(...args:unknown[])=>orgMemorySource287('ci')(...args),
  mJe:(...args:unknown[])=>orgMemorySource287('mJe')(...args),
  qbe:(...args:unknown[])=>orgMemorySource287('qbe')(...args),
  yr:(...args:unknown[])=>orgMemorySource287('yr')(...args),
  U,V,Gt,t:debug,l:originalErrors.l,a:environment(),
  f:(require('../lazySchema.js') as typeof import('../lazySchema.js')).lazySchema,u:z.object,o:z.string,B:z.enum,C:z.number,se:z.unknown,
  Me:(require('../../services/policyLimits/officialPublic287/signal.js') as typeof import('../../services/policyLimits/officialPublic287/signal.js')).createPolicySignal287({}).Me,
  c:(value:unknown)=>value,S:(value:unknown)=>value,i:event,y:success,m:sad,p:sad,
  on:(name:string)=> (require('../../services/policyLimits/publicBindings287.js') as typeof import('../../services/policyLimits/publicBindings287.js')).getPolicyPublicClient287().on(name),
  dbe:()=> (require('../../services/policyLimits/publicBindings287.js') as typeof import('../../services/policyLimits/publicBindings287.js')).getPolicyPublicClient287().dbe(),
  mPe:()=> (require('../../services/policyLimits/publicBindings287.js') as typeof import('../../services/policyLimits/publicBindings287.js')).getPolicyPublicClient287().mPe(),
  rU:()=> (require('../../services/policyLimits/publicBindings287.js') as typeof import('../../services/policyLimits/publicBindings287.js')).getPolicyPublicClient287().rU(),
  In:()=>credentials().storedIdentity(),ft:()=>auth().isClaudeAISubscriber(),im:()=>Boolean(auth().getClaudeAIOAuthTokens()?.accessToken),
  g8:(scope:string)=>auth().getClaudeAIOAuthTokens()?.scopes?.includes(scope)===true,
  Js:()=> (require('../model/providers.js') as typeof import('../model/providers.js')).isFirstPartyRequestEndpoint(),
  fA:'user:inference',WK:'user:profile',lc:()=> (require('../sessionIngressAuth.js') as typeof import('../sessionIngressAuth.js')).getSessionIngressAuthToken(),
  ee:sleep,k:(...args:Parameters<typeof import('../../services/analytics/growthbook.js')['getFeatureValue_CACHED_MAY_BE_STALE']>)=> (require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')).getFeatureValue_CACHED_MAY_BE_STALE(...args),
 })
 const revoke=createOAuthGatewayRevoke287({t:debug,l:originalErrors.l,
  s8:(...args:Parameters<OAuthGatewayLogoutSource287['s8']>)=>gateway().s8(...args),
  ope:(...args:Parameters<OAuthGatewayLogoutSource287['ope']>)=>gateway().ope(...args),
  spe:(...args:Parameters<OAuthGatewayLogoutSource287['spe']>)=>gateway().spe(...args),
  sH:(...args:Parameters<OAuthGatewayLogoutSource287['sH']>)=>gateway().sH(...args),
  OQn:(...args:Parameters<OAuthGatewayLogoutSource287['OQn']>)=>gateway().OQn(...args),
  $w:(...args:Parameters<OAuthGatewayLogoutSource287['$w']>)=>gateway().$w(...args)})
 const ttl=createOAuthTtl287({_:JSON.stringify,t:debug})
 const metrics=createOAuthMetricsReset287({U,V,aY:ttl.aY,t:debug,l:originalErrors.l,y:success,m:sad,
  E_:(...args:unknown[])=>metricsSource287().E_(...args),
  Gt:{get:(...args:unknown[])=>metricsSource287().Gt.get(...args)},
  NM:()=>metricsSource287().NM(),Ope:(...args:unknown[])=>metricsSource287().Ope(...args),
  Tj:createOAuthMetricsLabel287({}).Tj,dn:()=>metricsSource287().dn()})
 const common={aIe:()=>{persistence().clear();(require('../toolSchemaCache.js') as typeof import('../toolSchemaCache.js')).clearToolSchemaCache()},F:pinned,t:debug,d:report,...originalErrors,
  qfe:(value:null)=>slots().stampAuthenticatedAccount(value),a:environment(),
  Ae:(...args:Parameters<typeof import('../config.js')['saveGlobalConfig']>)=>config().saveGlobalConfig(...args),
  y:success}
 const resetPorts:OAuthResetPorts287={...common,...notification,...configHelpers,
  ZBo:artifact.ZBo,QBo:artifact.QBo,rvo:dbIdentity.rvo,$Bo:artifactServed.$Bo,wHo:memory.wHo,
  WVo:model.WVo,FVo:model.FVo,vpe:model.vpe,Aqo:revoke.Aqo,U$:github.U$,k9:pathReset.k9,xgo:metrics.xgo,
  U,Pt:gates.Pt,zn:storage,He:()=> (require('../model/providers.js') as typeof import('../model/providers.js')).getAPIProvider(),
  Ka:storageCore().readFailed,bwe:()=>storageCore().clearCopy(),_9r:operation=>storageCore().withWriteLock(operation),L5o:operation=>storageCore().alreadyLocked(operation),
  loadTelemetry:()=>import('../telemetry/instrumentation.js'),
  oU:()=> (require('../../bridge/trustedDevice.js') as typeof import('../../bridge/trustedDevice.js')).clearTrustedDeviceTokenCache(),
  W_t:()=>config().clearClientDataWindowSeed287(),Ej:()=> (require('../betas.js') as typeof import('../betas.js')).clearBetasCaches(),
  Xr:()=>models().getOfficialModelPickerProviderOwner287(),
    Ms:()=> (require('../officialFetchRequestState286/runtime.js') as typeof import('../officialFetchRequestState286/runtime.js')).getFetchRequestState286(),
  $Xe:()=> (require('../officialFetchRequestState286/runtime.js') as typeof import('../officialFetchRequestState286/runtime.js')).clearGzipBlockStore287(),

  hU:()=> (require('../user.js') as typeof import('../user.js')).resetUserCache(),
  ZT:(session,reason)=> (require('../../context.js') as typeof import('../../context.js')).getClaimContextOwner287().invalidate(session,reason),
  rz:()=> (require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')).refreshGrowthBookAfterAuthChange(),
  Cge:(require('../../services/api/grove.js') as typeof import('../../services/api/grove.js')).getGroveNoticeConfig,
  EX:(require('../../services/api/grove.js') as typeof import('../../services/api/grove.js')).getGroveSettings,
  cRt:(storageV5:unknown)=> (require('../../services/remoteManagedSettings/index.js') as typeof import('../../services/remoteManagedSettings/index.js')).clearRemoteManagedSettingsCache(storageV5 as Parameters<typeof import('../../services/remoteManagedSettings/index.js')['clearRemoteManagedSettingsCache']>[0]),
  GGr:()=> (require('../../services/policyLimits/index.js') as typeof import('../../services/policyLimits/index.js')).clearPolicyLimitsCache(),
  VAo:()=>limits().resetQuotaGraceState(),qAo:()=>limits().resetNearLimitWrapUpState(),
  BD:reason=> (require('../../services/usageLimitWait.js') as typeof import('../../services/usageLimitWait.js')).cancelUsageLimitWait(reason),
  sH:reason=> (require('../lowPriority.js') as typeof import('../lowPriority.js')).officialLowPriority.K0(reason),
  xOo:()=> (require('../lowPriority.js') as typeof import('../lowPriority.js')).officialLowPriority.Fwo(),wsn:()=>limits().resetQuotaState(),
  qC:(...args:Parameters<typeof import('../oauthClearPhases287.js')['revokeOAuthToken287']>)=> (require('../oauthClearPhases287.js') as typeof import('../oauthClearPhases287.js')).revokeOAuthToken287(...args),
  DEe:()=>slots().gatewayRefreshInFlight(),lt:wait.lt,
  ZU:token=>slots().replaceOauthTokenFromFd(token),m3r:(storageV5:unknown)=>auth().removeApiKey(storageV5),
  b:options=> (require('../oauthProfileClear287.js') as typeof import('../oauthProfileClear287.js')).oauthProfileClear287.clear(options as never),
  kY:value=>slots().replaceGatewayAuth(value),
  g6e:value=> (U().modelSelection as unknown as {replaceResolvedOrgDefault(value:undefined):void}).replaceResolvedOrgDefault(value),
 }
 const reset=createOAuthReset287(resetPorts)
 const continuation=createOAuthContinuation287({PQo:(storageV5?:unknown,credentials?:CredentialStore)=>
  (require('../../services/api/bootstrap.js') as typeof import('../../services/api/bootstrap.js')).publishBootstrapResponse287(storageV5,credentials)})
 const installPorts:OAuthInstallPorts287={...common,...continuation,...reset,
  process,le:()=>config().getGlobalConfig(),Gt,
  In:()=>credentials().storedIdentity(),jH:()=>credentials().authenticatedIdentity(),Zg:store=>credentials().credentialBackend(store),w_:(left,right)=>credentials().sameIdentity(left,right),
  tl:store=>auth().getClaudeAIOAuthTokensAsync(store),
  KBe:token=> (require('../../services/oauth/getOauthProfile.js') as typeof import('../../services/oauth/getOauthProfile.js')).getOauthProfileFromOauthToken(token),
  tWt:(...args:Parameters<typeof import('../../services/oauth/client.js')['storeOAuthAccountInfo']>)=>oauth().storeOAuthAccountInfo(...args),FJn:profile=>(require('../sharedOAuthClient.js') as typeof import('../sharedOAuthClient.js')).getSharedOAuthClient().validatePlan(profile),
  z_e:metadata=>event('auth',metadata),zQn:(...args:Parameters<typeof import('../auth.js')['saveOAuthTokensIfNeeded']>)=>auth().saveOAuthTokensIfNeeded(...args),Uk:()=>auth().clearOAuthTokenCache(),
  EW:()=>slots().oauthTokenFromFd(),ZU:token=>slots().replaceOauthTokenFromFd(token),Wwt:value=>slots().replaceOauthTokenFromBgSnapshot(value),
  Hr:(require('../officialOAuthSaveOutcome287/runtime.js') as typeof import('../officialOAuthSaveOutcome287/runtime.js')).OAuthLoginStorageError287,
  O:()=> (require('../platform.js') as typeof import('../platform.js')).getPlatform(),
  i:event,ptr:'Warning: Storing credentials in plaintext.',GQn:'Failed to save OAuth tokens',c:value=>value,S:value=>value,m:sad,
  eWt:(...args:Parameters<typeof import('../../services/oauth/client.js')['fetchAndStoreUserRoles']>)=>oauth().fetchAndStoreUserRoles(...args),uU:scopes=>oauth().shouldUseClaudeAIAuth(scopes),
  uqr:(...args:Parameters<typeof import('../../services/oauth/client.js')['createAndStoreApiKey']>)=>oauth().createAndStoreApiKey(...args),
 }
 return {install:createOAuthInstall287(installPorts),reset,installPorts,resetPorts,artifact,dbIdentity,artifactServed,github,pathReset,metrics}
}
export function getOriginalOAuthLifecycle287(){return lifecycle??=createProduction()}
