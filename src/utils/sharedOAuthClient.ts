import axios from 'axios'
import {z} from 'zod'
import {CLAUDE_AI_INFERENCE_SCOPE,CLAUDE_AI_PLUGINS_SCOPE,OAUTH_BETA_HEADER,getAllOAuthScopes,getFirstPartyRefreshScopes,getOauthConfig} from '../constants/oauth.js'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import {getAnthropicApiKey,getClaudeAIOAuthTokens} from './auth.js'
import {authEnvironment} from './authEnvironment.js'
import {getGlobalConfig,saveGlobalConfig} from './config.js'
import {logForDebugging} from './debug.js'
import {isBareMode} from './envUtils.js'
import {errorMessage} from './errors.js'
import {getUserAgent} from './http.js'
import {logError} from './log.js'
import {createOAuthTransportClassifier,type OAuthClientRuntime} from './officialOAuthClient/runtime.js'
import {createOAuthClient287} from './officialOAuthRefresh287/client.js'
import {createOAuthSchemaLazy} from './officialOAuthLease/runtime.js'
import {oauthHoldResponse} from './sharedOAuthEngine.js'
import {oauthErrorMetadata} from './sharedOAuthPersistence.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../services/analytics/index.js'

const event=(name:string,metadata:Record<string,unknown>)=>logEvent(name,metadata as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS | boolean | number | undefined>)
// Bind only after auth/engine module evaluation. The original transport and
// profile algorithms run unchanged, including awaited native config writes
// and the original storage backend context forwarded by Pde/fUt.
let client: OAuthClientRuntime | undefined
export function getSharedOAuthClient(): OAuthClientRuntime {
 if(client)return client
 const classifier=createOAuthTransportClassifier({Sn:v=>v,_:v=>v,l:errorMessage})
 return client=createOAuthClient287({
  $_:v=>v,AJ:()=>getAnthropicApiKey(),G2t:oauthHoldResponse.read,GG:()=>filesCredentialSlots.oauthTokenFromBgSnapshot(),
  L5r:getAllOAuthScopes,MXe:'account_on_hold',PC:CLAUDE_AI_INFERENCE_SCOPE,Po:getUserAgent,Sr:v=>String(v),
  Te:(updater,storageV5)=>saveGlobalConfig(updater,storageV5),Uu:OAUTH_BETA_HEADER,Vd:oauthErrorMetadata,Xs:classifier.classify,
  _:v=>v,a:authEnvironment,bj:()=>filesCredentialSlots.oauthTokenFromFd(),c:v=>v,ce:()=>getGlobalConfig(),cn:getOauthConfig,
  cu:classifier.expected,d:logError,de:z.string,f:createOAuthSchemaLazy().lazy,hJe:CLAUDE_AI_PLUGINS_SCOPE,ht:axios,i:event,
  kzt:classifier.code,m:(feature,reason)=>event('tengu_feature_bad',{feature_name:feature,error_code:reason}),me:v=>v==null?undefined:v,
  p:(feature,reason)=>event('tengu_feature_sad',{feature_name:feature,error_code:reason}),pn:()=>getClaudeAIOAuthTokens(),r9:isBareMode,t:logForDebugging,ut:z.object,
  y:feature=>event('tengu_feature_ok',{feature_name:feature}),yJe:()=>getFirstPartyRefreshScopes(),
 })
}
