import axios from 'axios'
import * as http from 'node:http'
import * as https from 'node:https'
import {Readable} from 'node:stream'
import {createHash} from 'node:crypto'
import {getOauthConfig,OAUTH_BETA_HEADER} from '../../constants/oauth.js'
import {getClaudeAIOAuthTokens,getClaudeAIOAuthTokensAsync,handleOAuth401Error,getOauthAccountInfo} from '../../utils/auth.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {sharedHttpAuth} from '../../utils/sharedHttpAuth.js'
import {getSharedOAuthEngine} from '../../utils/sharedOAuthEngine.js'
import {oauthKnownDeadRefreshTokens} from '../../utils/sharedOAuthPersistence.js'
import {getSecureStorage} from '../../utils/secureStorage/index.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {assertBedrockProviderRemoved} from '../../utils/model/providers.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {isEssentialTrafficOnly} from '../../utils/privacyLevel.js'
import {getUserAgent} from '../../utils/http.js'
import {getSessionIngressAuthToken} from '../../utils/sessionIngressAuth.js'
import {getCACertificates} from '../../utils/caCerts.js'
import {getMTLSConfig} from '../../utils/mtls.js'
import {logError} from '../../utils/log.js'
import {logForDebugging} from '../../utils/debug.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {logEvent} from '../analytics/index.js'
import {getOrganizationUUID} from '../oauth/client.js'
import {getExecutionSession287} from '../context/execution287.js'
import {createUsage287,createUsageQualification287,createUsageAuthKey287,createUsageRequest287,createUsageHostArgv287,createUsageHostInput287,createUsageText287,createUsageRetryAfter287,createUsageScope287,type UsageEndpoint287,type UsageRequest287,type UsageHostLaunch287} from './officialUsage287/runtime.js'
import {getSecureStorageExecutionHost} from '../../utils/secureStorage/macOsKeychainHelpers.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'

// Deferred binding avoids auth/config import cycles; all credentials, recovery,
// dead-refresh state, TLS material and feature reads are canonical existing owners.
let owner:ReturnType<typeof createUsage287>|undefined
let requestOwner:UsageRequest287|undefined
const provider=()=>{assertBedrockProviderRemoved();return getNativeAPIProvider287()}
export function getUsageProduction287(){
 if(owner)return owner
 const refresh=(options:{credentials?:CredentialStore;storageV5?:unknown}={})=>getSharedOAuthEngine().refresh(options)
 const qualification=createUsageQualification287({})
 const common={fn:getClaudeAIOAuthTokens,uU:qualification.inference,qN:createHash,At:isEssentialTrafficOnly,He:provider}
 const key=createUsageAuthKey287({...common,WK:qualification.profileScope})
 const hostInput=createUsageHostInput287({Xse:createUsageHostArgv287({}),n:()=>({host:{launchOptions:getExecutionSession287().host.launchOptions as unknown as UsageHostLaunch287}})})
 const scope=createUsageScope287({
  // Frozen analytics C: Br still executes/classifies/rethrows its business task.
  y:()=>logEvent('tengu_feature_ok',{}),m:()=>logEvent('tengu_feature_bad',{}),
 })
 const request=requestOwner??=createUsageRequest287({...common,
  $i:refresh,hi:oauthKnownDeadRefreshTokens,a:authEnvironment,Dn:authEnvironment,
  tl:getClaudeAIOAuthTokensAsync,zn:getSecureStorage,Vn:()=>provider()==='firstParty',
  hj:getOrganizationUUID,lc:getSessionIngressAuthToken,t:logForDebugging,cp:OAUTH_BETA_HEADER,
  Gfe:()=>filesCredentialSlots.sdkOAuthTokenRefreshCallback(),
  NM:()=>sharedHttpAuth.resolveHeaders(),dIe:()=>sharedHttpAuth.headers(),q0:getUserAgent,
  _:JSON.stringify,uWe:axios.AxiosError,EN:Readable,rc:http,Ov:https,St:axios,
  // Complete Lv/Dv select the actual launch host. No qualification bypass or
  // copied gateway credential: provider/auth read their existing shared owners.
  dn:getOauthConfig,...hostInput,XN:http.Agent,nS:handleOAuth401Error,d:logError,JN:Readable,
  iA:getMTLSConfig,cD:getCACertificates,ge:https.Agent,
 })
// Full raw g0/Tie owns only in-flight at_wall reads. Identity and credentials
 // are supplied by the same canonical auth host; IF retains its one cache/latch.
 owner=createUsage287({
  U:()=>({host:getSecureStorageExecutionHost()}),In:getOauthAccountInfo,
  k:getFeatureValue_CACHED_MAY_BE_STALE,ft:()=>sharedHttpAuth.subscriber(),zp:key.profile,
  gJe:key.settleAllowed,$i:refresh,t:logForDebugging,Xwn:key.key,
  uWe:axios.AxiosError,Irr:axios.AxiosHeaders,Br:scope,jWt:key.refreshable,
  E_:sharedHttpAuth.with401,Gt:request.Gt,gd:axios.isAxiosError,mIe:(bearer:string)=>createHash('sha256').update(bearer).digest('hex'),
  rm:createUsageRetryAfter287({}),re:createUsageText287({}),
 })
 return owner
}
export const fetchNormalUsage287=(credentials?:CredentialStore,endpoint:UsageEndpoint287='plain')=>getUsageProduction287().read(credentials,{read:endpoint})

/** The same complete ur/Gt factory used by IF; no second HTTP/auth state.
 * Construction is deferred and does not send a request or qualify an account. */
export function getNativeFirstPartyRequest287():Readonly<UsageRequest287>{
 getUsageProduction287()
 return requestOwner!
}
