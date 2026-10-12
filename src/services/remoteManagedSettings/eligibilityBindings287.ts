import {authEnvironment} from '../../utils/authEnvironment.js'
import {getClaudeAIOAuthTokens,getAnthropicApiKeyWithSource} from '../../utils/auth.js'
import {getWifAttribution286} from '../../utils/httpWorkloadIdentity.js'
import {getOauthConfig} from '../../constants/oauth.js'
import {isFirstPartyRequestEndpoint} from '../../utils/model/providers.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {logForDebugging} from '../../utils/debug.js'
import {getNativeGatewayAuth287} from './gatewayBindings287.js'
import {remoteProfileEligibility287} from './profileEligibilityBindings287.js'
import {getRemoteManagedSettingsRuntime287} from './syncCacheState.js'
import {createRemoteEligibility287} from './officialEligibility287/native.js'

// Read the existing native owner, including config-home isolation. No eligibility mirror.
export const remoteEligibility287=createRemoteEligibility287({
 environment:authEnvironment,gatewayAuth:getNativeGatewayAuth287,
 provider:()=>getNativeAPIProvider287(),requestEndpointEnabled:isFirstPartyRequestEndpoint,
 profileEligible:remoteProfileEligibility287.remoteProfileEligible,
 profileBaseURL:()=>getWifAttribution286().$Xe(),oauthConfig:getOauthConfig,
 apiKey:options=>getAnthropicApiKeyWithSource(options),tokens:()=>getClaudeAIOAuthTokens(),
 cacheOverride:()=>getRemoteManagedSettingsRuntime287().cacheOverride(),
 eligibilityMemo:()=>getRemoteManagedSettingsRuntime287().owner().eligibilityMemo,
 recordEligibility:(value,reason)=>{getRemoteManagedSettingsRuntime287().owner().recordEligibility(value,{memoize:true,ineligibleReason:reason});return value},
 setSnapshotOnly:value=>getRemoteManagedSettingsRuntime287().setSnapshot(value),debug:logForDebugging,
})
