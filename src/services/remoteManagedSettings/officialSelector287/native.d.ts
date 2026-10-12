import type {OAuthTokens} from '../../../services/oauth/types.js'
import type {CredentialStore,ModernSecureStorage} from '../../../utils/officialSecureStorage/runtime.js'
import type {ConsentIdentity} from '../consentState.js'
import type {RemoteOAuthIdentity287} from '../officialAuth287/native.js'
import type {authEnvironment} from '../../../utils/authEnvironment.js'
export interface NativeGateway287 {url:string;jwt:string;unpinned?:boolean}
export interface SelectedRemoteAuth287 {
 headers:Record<string,string>;authType:'gateway_jwt'|'oauth'|'api_key'|'profile'|'none'
 accessToken?:string;credentialOrigin?:string;consentIdentity?:ConsentIdentity
 pinnedFingerprint?:string;profileBearer?:boolean;profileError?:boolean;error?:string;retryable?:boolean
}
export interface SelectorPorts287 {
 environment:Partial<Pick<typeof authEnvironment,'ANTHROPIC_BASE_URL'>>
 storage():Pick<ModernSecureStorage,'readAsync'>;primerEnabled():boolean
 gatewayAuth():NativeGateway287|null|undefined
 profileEligible():boolean;profileRejected():boolean
 apiKey(options:{skipRetrievingKeyFromApiKeyHelper:true}):{key:string|null;source:string}
 subscriber():boolean;enterprise():boolean;tokens():OAuthTokens|null
 oauthIdentity(credentials?:CredentialStore):Promise<RemoteOAuthIdentity287>
 profileIdentity():ConsentIdentity|undefined
 debug:typeof import('../../../utils/debug.js').logForDebugging
 oauthConfig():{BASE_API_URL:string};profileBaseURL():string|undefined
 jsonParse(text:string):unknown
 importWif():Promise<{
 getWIFCredentials():Promise<{baseURL?:string;extraHeaders:Record<string,string>}|null>
 getWIFTokenCache():Promise<{getToken():Promise<string>}|null>
 isWIFTransientExchangeError(error:unknown):boolean
 }>
 builtins:{crypto:typeof import('node:crypto')}
}
export function createRemoteSelector287(ports:SelectorPorts287):{
 authHeaders(credentials?:CredentialStore):Promise<SelectedRemoteAuth287>
 gatewayIdentity(gateway:NativeGateway287,fingerprint?:string):ConsentIdentity|undefined
 gatewayPin(gateway:NativeGateway287,credentials?:CredentialStore):Promise<string|undefined>
}
