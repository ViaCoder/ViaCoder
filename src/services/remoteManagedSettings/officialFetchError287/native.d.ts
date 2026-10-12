import type {RemoteManagedSettingsFetchResult} from '../types.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {OAuth401Options} from '../../../utils/officialOAuthRecovery/runtime.js'
import type {ConsentIdentity} from '../consentState.js'
export type FetchFailureContext287={
 checksum?:string;forcedRefreshAttempt?:boolean;credentials?:CredentialStore;accessToken?:string;profileBearer?:boolean;consentIdentity?:ConsentIdentity
 metadata?:Partial<RemoteManagedSettingsFetchResult>
 retry(checksum?:string,forcedRefreshAttempt?:boolean,credentials?:CredentialStore):Promise<RemoteManagedSettingsFetchResult>
}
export type FetchFailurePorts287={
 t:typeof import('../../../utils/debug.js').logForDebugging
 nS(token:string,credentials?:CredentialStore,storage?:unknown,options?:OAuth401Options):Promise<boolean>
 fn():{accessToken?:string}|null|undefined
 importWif():Promise<{getWIFTokenCache():Promise<{getToken():Promise<string>}|null>;invalidateWIFToken(token:string):void|Promise<void>}>
 i(name:string,data:Record<string,unknown>):void;o5o(value:boolean):void
}
export function createRemoteFetchError287(ports:FetchFailurePorts287):(error:unknown,context:FetchFailureContext287)=>Promise<RemoteManagedSettingsFetchResult>
