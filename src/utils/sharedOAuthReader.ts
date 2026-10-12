import {stat} from 'node:fs/promises'
import {join} from 'node:path'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import {authEnvironment} from './authEnvironment.js'
import {getOAuthTokenFromFileDescriptor} from './authFileDescriptor.js'
import {clearBetasCaches} from './betas.js'
import {isBareMode} from './envUtils.js'
import {logError} from './log.js'
import {getAPIProvider} from './model/providers.js'
import {createOAuthCredentialReader,type OAuthCredentialReader} from './officialOAuthReader/runtime.js'
import {createOAuthDeadCredential287} from './officialOAuthRefresh287/deadCredential.js'
import type {CredentialStore} from './officialSecureStorage/runtime.js'
import {getSecureStorage} from './secureStorage/index.js'
import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'
import {secureStorageCore} from './secureStorage/officialRuntime.js'
import {getSecureStorageConfigHomeDir} from './secureStorage/storageDirectory.js'
import {isStorageV5PinnedOn} from './secureStorage/storageV5.js'
import {sharedOAuthHandoff} from './sharedOAuthHandoff.js'
import {oauthCredentialState,oauthKnownDeadRefreshTokens,sharedOAuthPersistence} from './sharedOAuthPersistence.js'
import {clearToolSchemaCache} from './toolSchemaCache.js'

// All readers, refreshes and 401 recoveries share the original credential cell.
// Bind after module evaluation; no second memoize layer or copied host state.
let reader: OAuthCredentialReader | undefined
export function getSharedOAuthReader(): OAuthCredentialReader {
 return reader ??= createOAuthCredentialReader({
  Bn:()=>getAPIProvider()==='firstParty',F:isStorageV5PinnedOn,FYr:()=>filesCredentialSlots.oauthScopesFromFd(),
  GG:()=>filesCredentialSlots.oauthTokenFromBgSnapshot(),Jde:oauthCredentialState.state,KT:sharedOAuthPersistence.clearAll,
  Pf:()=>{clearBetasCaches();oauthCredentialState.configurationChanged.of(getSecureStorageExecutionHost()).emit();clearToolSchemaCache()},
  Rf:join,Tf:stat,USe:secureStorageCore.clearCopy,a:authEnvironment,bi:oauthKnownDeadRefreshTokens,d:logError,
  d0:()=>getOAuthTokenFromFileDescriptor(),j:()=>({host:getSecureStorageExecutionHost()}),m7n:sharedOAuthHandoff.oauth,
  r9:isBareMode,zS:getSecureStorageConfigHomeDir,zn:()=>getSecureStorage(),
 })
}

// Original V3/LWt are stateless views of this reader and selected store. In
// particular, an absent token is not equivalent to a known-dead credential.
const deadCredential=createOAuthDeadCredential287({
 Af:tokens=>getSharedOAuthReader().unusable(tokens),
 tl:credentials=>getSharedOAuthReader().async(credentials),
 fn:()=>getSharedOAuthReader().sync(),zn:()=>getSecureStorage(),
})
export function hasDeadOAuthCredentials287(credentials?:CredentialStore):Promise<boolean>{
 return deadCredential.readAsync(credentials)
}
export function hasDeadOAuthCredentialsSync287():boolean{
 return deadCredential.readSync()
}
