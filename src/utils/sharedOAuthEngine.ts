import axios from 'axios'
import {stat} from 'node:fs/promises'
import {resolve} from 'node:path'
import {z} from 'zod'
import {getOauthConfig} from '../constants/oauth.js'
import {logEvent, type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../services/analytics/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {refreshOAuthToken, shouldUseClaudeAIAuth} from '../services/oauth/client.js'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import {getClaudeAIOAuthTokensAsync} from './auth.js'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {isBareMode} from './envUtils.js'
import {errorMessage} from './errors.js'
import {getFsImplementation} from './fsOperations.js'
import {getOAuthTokenFromFileDescriptor} from './authFileDescriptor.js'
import {logError} from './log.js'
import {getAPIProvider} from './model/providers.js'
import type {OAuthRefreshRuntime} from './officialOAuthEngine/runtime.js'
import {createOAuthExpectedTransportError,createOAuthHoldResponse,createOAuthRefreshScopes,createOAuthResetBinding} from './officialOAuthEngine/runtime.js'
import {createOAuthRefreshEngine287} from './officialOAuthRefresh287/engine.js'
import {createOAuthSchemaLazy} from './officialOAuthLease/runtime.js'
import {getSecureStorage} from './secureStorage/index.js'
import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'
import {secureStorageCore} from './secureStorage/officialRuntime.js'
import {getSecureStorageConfigHomeDir} from './secureStorage/storageDirectory.js'
import {isStorageV5PinnedOn} from './secureStorage/storageV5.js'
import {sharedOAuthLease} from './sharedOAuthLease.js'
import {getSharedOAuthReader} from './sharedOAuthReader.js'
import {oauthCredentialState,oauthErrorMetadata,oauthKnownDeadRefreshTokens,sharedOAuthPersistence} from './sharedOAuthPersistence.js'
import {sleep} from './sleep.js'
import {jsonParse} from './slowOperations.js'

const recordEvent=(event:string,details:Record<string,unknown>)=>logEvent(event,details as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS|boolean|number|undefined>)
export const oauthHoldResponse=createOAuthHoldResponse({J:jsonParse,U:z.enum,cn:getOauthConfig,f:createOAuthSchemaLazy().lazy,ie:z.string,u:z.object,x:z.literal})
oauthHoldResponse.register(getFeatureValue_CACHED_MAY_BE_STALE)
const scopes=createOAuthRefreshScopes({cn:getOauthConfig})
const identity=createOAuthResetBinding()
// Complete original287 gl/m8/$i use the existing canonical reader/host cell.
// The original ipe exchange is wired through the same sharedOAuthClient owner.
// Auth, storage and the lease refer back to each other. Bind the original
// factory once at first use, after module initialization; never copy state.
let engine: OAuthRefreshRuntime | undefined
export function getSharedOAuthEngine(): OAuthRefreshRuntime {
 return engine ??= createOAuthRefreshEngine287({
  $k:(state,credentials)=>getSharedOAuthReader().check(state,credentials),
  Bn:()=>getAPIProvider()==='firstParty',D8n:sharedOAuthPersistence.clearDead,
  F:isStorageV5PinnedOn,Fa:credentials=>getClaudeAIOAuthTokensAsync(credentials),
  G2t:oauthHoldResponse.read,GG:()=>filesCredentialSlots.oauthTokenFromBgSnapshot(),
  I8n:sharedOAuthPersistence.reconcile,Jde:oauthCredentialState.state,
  Jhn:sharedOAuthLease.options,KT:sharedOAuthPersistence.clearAll,Kp:sharedOAuthLease.takeover,
  N5r:scopes.refreshScopes,Pde:(token,options)=>refreshOAuthToken(token,options),Tf:stat,
  Vd:oauthErrorMetadata,Wa:secureStorageCore.readFailed,Yk:sharedOAuthLease.legacyPath,
  Z:sleep,_:value=>value,_ht:oauthHoldResponse.defaultUrl,
  _n:()=>filesCredentialSlots.stampAuthenticatedAccount(null),a:authEnvironment,
  ae:getFsImplementation,bi:oauthKnownDeadRefreshTokens,c:value=>value,
  cu:createOAuthExpectedTransportError(),d:logError,d0:()=>getOAuthTokenFromFileDescriptor(),
  f2o:directory=>sharedOAuthLease.acquire(directory),h1:shouldUseClaudeAIAuth,hEn:scopes.hasInference,
  hf:resolve,ht:axios,i:recordEvent,it:identity,j:()=>({host:getSecureStorageExecutionHost()}),
  l:errorMessage,m:(feature,error)=>recordEvent('tengu_feature_bad',{feature_name:feature,error_code:error}),
  p:(feature,error,details)=>recordEvent('tengu_feature_sad',{feature_name:feature,error_code:error,...details}),
  r9:isBareMode,t:logForDebugging,zS:getSecureStorageConfigHomeDir,zn:()=>getSecureStorage(),
})
}
