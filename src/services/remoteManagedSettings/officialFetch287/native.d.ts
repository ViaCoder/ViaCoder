import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {RemoteManagedSettingsFetchResult} from '../types.js'
import type {SelectedRemoteAuth287} from '../officialSelector287/native.js'
import type {FetchFailurePorts287} from '../officialFetchError287/native.js'
import type {PolicyParser287} from '../../../utils/settings/officialPolicyParser287/native.js'

export interface RemoteFetchPorts287 extends FetchFailurePorts287 {
 m8:typeof import('../../../utils/auth.js').checkAndRefreshOAuthTokenOutcome
 vj:typeof import('../gatewayBindings287.js').nativeGatewayRefresh287.refreshGateway
 Ye(credentials?:CredentialStore):Promise<SelectedRemoteAuth287>
 qe():string
 f$():boolean;We():string;Mo():string
 uo:typeof import('../gatewayBindings287.js').getNativeGatewayAuth287
 spe:typeof import('../gatewayBindings287.js').nativeGatewayTransport287.spe
 hbn:typeof import('../gatewayBindings287.js').nativeGatewayTransport287.hbn
 St:Pick<typeof import('axios').default,'get'>
 ue:PolicyParser287['responseSchema']
 fe:PolicyParser287['payload']
}
export type RemoteFetch287=(checksum?:string,forcedRefreshAttempt?:boolean,credentials?:CredentialStore)=>Promise<RemoteManagedSettingsFetchResult>
export function createRemoteFetch287(ports:RemoteFetchPorts287):RemoteFetch287
