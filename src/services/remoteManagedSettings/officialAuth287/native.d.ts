import type {OAuthTokens} from '../../../services/oauth/types.js'
import type {AccountInfo} from '../../../utils/config.js'
import type {ModernSecureStorage,CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {authEnvironment} from '../../../utils/authEnvironment.js'
import type {ConsentIdentity} from '../consentState.js'
import type {RemoteManagedSettingsFetchResult} from '../types.js'
import type {OAuthRefreshOutcome} from '../../../utils/officialOAuthEngine/runtime.js'
export type RemoteCredentialOrigin287='stored_login'|'injected_token'
export type RemoteOAuthIdentity287={credentialOrigin?:RemoteCredentialOrigin287;consentIdentity?:ConsentIdentity}
export type RemoteMetadata287=Pick<RemoteManagedSettingsFetchResult,'authType'|'credentialOrigin'|'tokenRefreshOutcome'>
export interface RemoteAuthPorts287 {
 environment:Partial<Pick<typeof authEnvironment,'CLAUDE_CODE_OAUTH_TOKEN'|'CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST'>>
 tokens():OAuthTokens|null
 account():Pick<AccountInfo,'organizationUuid'|'accountUuid'|'emailAddress'>|undefined
 storage():Pick<ModernSecureStorage,'readAsync'>
 descriptor():string|null|undefined
 backgroundDescriptor():boolean
 authEnabled():boolean
 profileAccount():{organizationUuid?:string;accountEmail?:string}|undefined
}
export interface RemoteAuth287 {
 oauthIdentity(credentials?:CredentialStore):Promise<RemoteOAuthIdentity287>
 profileIdentity():ConsentIdentity|undefined
 subscriber():boolean;enterprise():boolean
 origin(credentials?:CredentialStore):Promise<'none'|'env'|'fd'|'store'>
 metadata(auth:{authType:string;credentialOrigin?:string},refresh?:OAuthRefreshOutcome):RemoteMetadata287
}
export function createRemoteAuth287(ports:RemoteAuthPorts287):RemoteAuth287
