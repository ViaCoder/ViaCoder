import axios from 'axios'
import {statSync} from 'node:fs'
import {unlink,utimes,writeFile} from 'node:fs/promises'
import {getOauthConfig,CLAUDE_AI_INFERENCE_SCOPE,OAUTH_BETA_HEADER} from '../../constants/oauth.js'
import {checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens,getClaudeAIOAuthTokensAsync,getAnthropicApiKeyWithSource,getAuthTokenSource,getOauthAccountInfo,getConfiguredApiKeyHelper,isClaudeAISubscriber,isAnthropicAuthEnabled} from '../../utils/auth.js'
import {getResolvedHttpAuthHeaders,withOAuth401Retry,getUserAgent} from '../../utils/http.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {getAPIProvider,isFirstPartyRequestEndpoint} from '../../utils/model/providers.js'
import {isStorageV5PinnedOn} from '../../utils/secureStorage/storageV5.js'
import {getSecureStorageExecutionHost} from '../../utils/secureStorage/macOsKeychainHelpers.js'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {classifyAxiosError,errorMessage,getErrnoCode,isENOENT} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {logEvent} from '../analytics/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {registerCleanup} from '../../utils/cleanupRegistry.js'
import {sleep,withTimeout} from '../../utils/sleep.js'
import {getRetryDelay} from '../api/withRetry.js'
import {getProxyUrl,shouldBypassProxy} from '../../utils/proxy.js'
import {uniq} from '../../utils/array.js'
import {SNo} from '../../vendor/official-files-api/taints.js'
import {hasWorkloadIdentityConfiguration} from '../../utils/workloadIdentity.js'
import {OfficialHostCell286} from './officialIdentity286/hostCell.js'
import {getOfficialPolicyPrincipal286,principalPorts287} from './officialIdentityBindings286.js'
import {getPolicyPublicClient287} from './publicBindings287.js'
import {policyResponseKernel} from './response.js'
import {policySignature287,policyBoundedRead287,getPolicyDiagnostics287} from './controllerPrimitives287.js'
import {policyNetworkEvents287,policyTunnelEvents287,subscribePolicyCredentialChanges287} from './controllerEvents287.js'
import {createPolicyController287} from './officialPublic287/controller.js'
import {createPolicyLoopback287} from './officialPublic287/loopback.js'
import {createPolicySourceUrl287} from './officialPublic287/sourceUrl.js'
import {createPolicyStorageErrors287} from './officialPublic287/storageErrors.js'
import {createPolicyErrorGate287} from './officialPublic287/errorGate.js'
import {createPolicyCredentialMetadata287} from './officialPublic287/credentialMetadata.js'
import type {PolicyBearerAttribution287} from './officialPublic287/diagnostics.js'

/** Attribution is a complete public source interface, not a private backend. */
export interface PolicyBearerAttributionSource287 {attributeBearer(credentials?:unknown):Promise<PolicyBearerAttribution287>}
let attributionSource:PolicyBearerAttributionSource287|undefined
export function registerPolicyBearerAttributionSource287(source:PolicyBearerAttributionSource287):void{attributionSource=source}

export function bindPolicyControllerPorts287():Record<string,unknown>{
 const native=getPolicyPublicClient287(),principal=getOfficialPolicyPrincipal286()
 const source=getAuthTokenSource
 const metadata=createPolicyCredentialMetadata287({a:authEnvironment,Gfe:()=>filesCredentialSlots.sdkOAuthTokenRefreshCallback(),Rc:source,vl:isAnthropicAuthEnabled,IWt:()=>Boolean(getAnthropicApiKeyWithSource({skipRetrievingKeyFromApiKeyHelper:true}).key)})
 const errorGate=createPolicyErrorGate287({...native,Rc:source,im:()=>getClaudeAIOAuthTokens()?.accessToken!=null,g8:(scope:string)=>getClaudeAIOAuthTokens()?.scopes?.includes(scope)===true,fA:CLAUDE_AI_INFERENCE_SCOPE,vh:getConfiguredApiKeyHelper})
 return {...native,...policySignature287,...policyBoundedRead287,...getPolicyDiagnostics287(),...metadata,...errorGate,...policyNetworkEvents287,...policyTunnelEvents287,...createPolicyStorageErrors287({}),
 U:()=>({host:getSecureStorageExecutionHost()}),V:OfficialHostCell286,
 R3:principal.xq,goe:principal.Kne,hoe:principal.Yne,RM:principal.jD,izr:principal.rBr,i7n:principal.Z4n,
 ijt:policyResponseKernel.parse,Uht:policyResponseKernel.rawResponse,GXn:policyResponseKernel.lossyCount,Dwe:policyResponseKernel.checksum,
 d:logError,t:logForDebugging,l:errorMessage,E:getErrnoCode,W:isENOENT,Ws:classifyAxiosError,
 Dt:withTimeout,ee:sleep,F:isStorageV5PinnedOn,_:JSON.stringify,ae:getFsImplementation,rt:writeFile,et:unlink,tt:utimes,Ze:statSync,
 i:logEvent,c:(v:unknown)=>v,me:(v:unknown)=>v,p:(feature:string,error:string,more:object={})=>logEvent('tengu_feature_sad',{feature_name:feature as never,error_code:error as never,...more}),m:(feature:string,error:string,more:object={})=>logEvent('tengu_feature_bad',{feature_name:feature as never,error_code:error as never,...more}),y:(feature:string)=>logEvent('tengu_feature_ok',{feature_name:feature as never}),
 Qm:getOauthAccountInfo,k:getFeatureValue_CACHED_MAY_BE_STALE,G:(values:unknown[],predicate:(v:unknown)=>boolean)=>values.filter(predicate).length,L:uniq,
 Zzo:subscribePolicyCredentialChanges287,tl:getClaudeAIOAuthTokensAsync,$k:principalPorts287.$k,
 He:getAPIProvider,m3o:()=>require('./booleanSource287.js').policyBooleanSource287.servedTrue('tengu_steady_marshmallow'),f3o:'tengu_steady_marshmallow',
 _t:registerCleanup,fn:getClaudeAIOAuthTokens,tg:isFirstPartyRequestEndpoint,a:authEnvironment,
 KE:()=>require('../../utils/sharedHttpAuth.js').sharedHttpAuth.envBearer(),vh:getConfiguredApiKeyHelper,
 PWt:()=>{const key=getAnthropicApiKeyWithSource().key;if(!key||!key.trim())return'none';if(!key.startsWith('sk-ant-'))return'non_sk_ant';const prefix=key.slice(7,12);return prefix==='api03'?'sk_ant_api03':prefix==='api02'?'sk_ant_api02':prefix==='admin'?'sk_ant_admin':'sk_ant_other'},Rc:source,
 R5o:(value:string)=>value==='hipaa', // raw named immutable taint set: HIPAA
 nzr:SNo,De:{state:(id:string)=>({namespace:'state',id})},
 Hp:getProxyUrl,Ph:shouldBypassProxy,xK:createPolicySourceUrl287({}).xK,hL:createPolicyLoopback287({}).hL,
 dn:getOauthConfig,zpe:'/api/claude_code/policy_limits',sL:getRetryDelay,NM:getResolvedHttpAuthHeaders,
 e6t:()=>require('./booleanSource287.js').policyBooleanSource287.servedTrue('tengu_copper_kite'),m8:checkAndRefreshOAuthTokenIfNeeded,E_:withOAuth401Retry,
 $Wt:new Set(['lock_timeout','lock_busy','lock_error']),H6e:(status:number|undefined)=>status!==undefined&&status>=400&&status<500&&status!==408&&status!==409&&status!==429,
 St:axios,Mo:getUserAgent,mb:getAnthropicApiKeyWithSource,fd:hasWorkloadIdentityConfiguration,ft:isClaudeAISubscriber,cp:OAUTH_BETA_HEADER,
 GWt:(credentials?:unknown)=>{if(!attributionSource)throw Error('Policy requires the canonical OAuth bearer attribution source');return attributionSource.attributeBearer(credentials)},
 }
}
let factory:ReturnType<typeof createPolicyController287>|undefined
export function getPolicyControllerFactory287(){return factory??=createPolicyController287(bindPolicyControllerPorts287())}
export function getPolicyController287(){return getPolicyControllerFactory287().A()}
