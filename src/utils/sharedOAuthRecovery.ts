import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../services/analytics/index.js'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import {getClaudeAIOAuthTokensAsync} from './auth.js'
import {authEnvironment} from './authEnvironment.js'
import {getOAuthTokenFromFileDescriptor} from './authFileDescriptor.js'
import {logForDebugging} from './debug.js'
import {isBareMode} from './envUtils.js'
import {logError} from './log.js'
import {getAPIProvider} from './model/providers.js'
import type {OAuth401Runtime} from './officialOAuthRecovery/runtime.js'
import {createOAuth401Recovery287} from './officialOAuthRefresh287/recovery.js'
import {getSecureStorage} from './secureStorage/index.js'
import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'
import {isStorageV5PinnedOn} from './secureStorage/storageV5.js'
import {getSharedOAuthEngine} from './sharedOAuthEngine.js'
import {oauthCredentialState,sharedOAuthPersistence} from './sharedOAuthPersistence.js'
import {sleep} from './sleep.js'
import {sharedOAuthHandoff} from './sharedOAuthHandoff.js'
export {sharedOAuthHandoff} from './sharedOAuthHandoff.js'

const event=(name:string,metadata:Record<string,unknown>)=>logEvent(name,metadata as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS | boolean | number | undefined>)
let recovery: OAuth401Runtime | undefined
export function getSharedOAuthRecovery(): OAuth401Runtime {
 return recovery ??= createOAuth401Recovery287({
  Bn:()=>getAPIProvider()==='firstParty',F:isStorageV5PinnedOn,Fa:credentials=>getClaudeAIOAuthTokensAsync(credentials),
  GG:()=>filesCredentialSlots.oauthTokenFromBgSnapshot(),G_t:scopes=>filesCredentialSlots.replaceOauthScopesFromFd(scopes),
  Hi:options=>getSharedOAuthEngine().refresh(options),Jde:oauthCredentialState.state,KT:sharedOAuthPersistence.clearAll,
  Spe:()=>filesCredentialSlots.sdkOAuthTokenRefreshCallback(),Z:sleep,_n:()=>filesCredentialSlots.stampAuthenticatedAccount(null),a:authEnvironment,
  d:logError,d0:()=>getOAuthTokenFromFileDescriptor(),i:event,iU:token=>filesCredentialSlots.replaceOauthTokenFromFd(token),
  j:()=>({host:getSecureStorageExecutionHost()}),m:(feature,reason)=>event('tengu_feature_bad',{feature_name:feature,error_code:reason}),
  m7n:sharedOAuthHandoff.oauth,o9:options=>getSharedOAuthEngine().outcome(options),r9:isBareMode,t:logForDebugging,
  y:feature=>event('tengu_feature_ok',{feature_name:feature}),zn:()=>getSecureStorage(),
 })
}
