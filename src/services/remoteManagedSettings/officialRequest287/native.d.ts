import type {RemoteManagedSettingsFetchResult} from '../types.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {authEnvironment} from '../../../utils/authEnvironment.js'
import type {PolicyParser287} from '../../../utils/settings/officialPolicyParser287/native.js'
export interface RemoteRequestContext287 {background?:boolean;singleAttempt?:boolean;credentials?:CredentialStore}
export type RemoteUserAgentEnvironment287=Partial<Pick<typeof authEnvironment,
 'CLAUDE_CODE_ENTRYPOINT'|'CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST'|'CLAUDE_CODE_USE_GATEWAY'|
 'CLAUDE_CODE_HOST_GATEWAY_LINEAGE'|'CLAUDE_CODE_HOST_CREDS_FILE'|'CLAUDE_AGENT_SDK_CLIENT_APP'>>
export interface RemoteRequestPorts287 {
 version:string;environment:RemoteUserAgentEnvironment287
 fetch(checksum?:string,forcedRefresh?:boolean,credentials?:CredentialStore):Promise<RemoteManagedSettingsFetchResult>
 gateway():unknown
 payload:PolicyParser287['payload']
 consent(credentials?:CredentialStore):Promise<RemoteManagedSettingsFetchResult['consentIdentity']>
 debug:typeof import('../../../utils/debug.js').logForDebugging
 builtins:{'async_hooks':typeof import('node:async_hooks');'fs/promises':typeof import('node:fs/promises')}
}
export interface RemoteRequest287 {
 retry(checksum?:string,context?:RemoteRequestContext287):Promise<RemoteManagedSettingsFetchResult>
 mock(credentials?:CredentialStore):Promise<RemoteManagedSettingsFetchResult|null>
 gatewayUserAgent():string;userAgent():string;codeUserAgent():string;isDesktop():boolean
 withWorkload<T>(workload:string,operation:()=>T):T
 clock:{now():number;monotonicNow():number;setTimeout(callback:()=>void,delay:number,options?:{unref?:boolean}):()=>void}
}
export function createRemoteRequest287(ports:RemoteRequestPorts287):RemoteRequest287
