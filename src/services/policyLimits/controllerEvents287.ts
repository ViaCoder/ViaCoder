import {getSecureStorageExecutionHost} from '../../utils/secureStorage/macOsKeychainHelpers.js'
import {oauthCredentialState} from '../../utils/sharedOAuthPersistence.js'
import {OfficialHostCell286} from './officialIdentity286/hostCell.js'
import {createPolicySignal287} from './officialPublic287/signal.js'
import {createPolicyNetwork287} from './officialPublic287/network.js'
import {createPolicyTunnel287} from './officialPublic287/tunnel.js'

const scope = {U: () => ({host:getSecureStorageExecutionHost()}), V:OfficialHostCell286, Me:createPolicySignal287({}).Me}
export const policyNetworkEvents287 = createPolicyNetwork287(scope)
export const policyTunnelEvents287 = createPolicyTunnel287(scope)
/** Original Zzo: subscribe to the existing credential owner, not a copied cache. */
export function subscribePolicyCredentialChanges287(listener:()=>void):()=>void {
 return oauthCredentialState.configurationChanged.of(getSecureStorageExecutionHost()).subscribe(listener)
}
/** Source port for the actual HTTP response consumer. No stored verdict or flags. */
export function observePolicyApiResponse287(headers:Headers, success:boolean):void {
 policyTunnelEvents287.mqr(headers.get(policyTunnelEvents287.Myt) ?? undefined)
 if(success) policyNetworkEvents287.jXn()
}
/** Original aCo/t2 success port: call only after model completion succeeds. */
export function notifyPolicyModelSuccess287():void {policyNetworkEvents287.jXn()}
