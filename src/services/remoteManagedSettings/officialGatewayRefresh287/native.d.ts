import type {authEnvironment} from '../../../utils/authEnvironment.js'
import type {CredentialStore,ModernSecureStorage} from '../../../utils/officialSecureStorage/runtime.js'
import type {AxiosInstance} from 'axios'
import type {Agent} from 'node:https'
export interface GatewayCredential287 {
 url:string;jwt:string;expiresAt:number;idpRefreshToken?:string;unpinned?:boolean
 tokenEndpoint?:string;revocationEndpoint?:string;email?:string;hostVerdict?:{verified:boolean;network?:string;vouched?:unknown;reason?:string}|{unresolvedReason:string}
}
export interface GatewayRefreshPorts287 {
 version:string
 environment:Partial<Pick<typeof authEnvironment,'CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST'|'CLAUDE_CODE_USE_GATEWAY'|'ANTHROPIC_BASE_URL'|'ANTHROPIC_AUTH_TOKEN'|'CLAUDE_CODE_REMOTE'|'CLAUDE_CODE_GATEWAY_TOKEN_FILE_DESCRIPTOR'>>
 gatewayAuth():GatewayCredential287|null|undefined
 replaceGatewayAuth(value:GatewayCredential287|null):void
 refreshInFlight():Promise<void>|null
 replaceRefreshInFlight(value:Promise<void>|null):void
 storage():Pick<ModernSecureStorage,'readAsync'|'mutate'>
 primerEnabled():boolean
 descriptorToken():string|null|undefined
 replaceDescriptorToken(token:string|null):void
 consumeSnapshot():void
 isSocket(descriptor:number):boolean
 inheritedDescriptor(descriptor:number,options:{maxBytes:number}):string
 httpAxios:Pick<AxiosInstance,'post'>
 oauthConfig():{BASE_API_URL:string}
 debug:typeof import('../../../utils/debug.js').logForDebugging
 pinnedAgent(fingerprint:string|undefined,url:string):Agent|undefined
}
export interface GatewayRefresh287 {
 httpUserAgent():string
 gatewayAccepted(auth:GatewayCredential287|null|undefined):boolean
 settingsEndpoint():string
 refreshGateway(credentials?:CredentialStore,options?:{force?:boolean}):Promise<void>
 refreshToken(auth:GatewayCredential287,refreshToken:string,credentials?:CredentialStore):Promise<void>
 commitRefresh(auth:GatewayCredential287,refreshToken:string,update:(value:GatewayCredential287)=>GatewayCredential287,credentials?:CredentialStore):Promise<void>
 synchronizeEnvironment():boolean
 gatewayFromEnvironment():boolean
 gatewayDescriptor():string|null|undefined
 pinRead(hostname:string,credentials?:CredentialStore):Promise<string|undefined>
 responseSchema():{safeParse(value:unknown):{success:true;data:{access_token:string;expires_in:number;refresh_token?:string|null;email?:string|null}}|{success:false;error:unknown}}
}
export function createGatewayRefresh287(ports:GatewayRefreshPorts287):GatewayRefresh287
