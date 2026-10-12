import {createOfficialProfileEligibility287} from './officialProfileEligibility287/native.js'
import {getOfficialPolicyWifEligibilityPorts286,getOfficialProfileSelectorState286} from '../policyLimits/officialWifEligibilityBindings286.js'
import {isBareMode} from '../../utils/envUtils.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {getOAuthTokenFromFileDescriptor} from '../../utils/authFileDescriptor.js'
import {getAnthropicApiKeyWithSource,getConfiguredApiKeyHelper,getClaudeAIOAuthTokens} from '../../utils/auth.js'
import {getWifAttribution286,getOAuthResetExecutionContext286} from '../../utils/httpWorkloadIdentity.js'
import {logEvent} from '../analytics/index.js'
import {logForDebugging} from '../../utils/debug.js'
import {authEnvironment} from '../../utils/authEnvironment.js'

// Profile adjudication shares the existing SDK credential owner and once-log cell.
export const remoteProfileEligibility287 = createOfficialProfileEligibility287({
  environment:()=>authEnvironment, configuredProfile:()=>getWifAttribution286().I6o(),
  apiKeyOnlyMode:isBareMode,
  remoteOrGatewayAuth:()=>authEnvironment.CLAUDE_CODE_REMOTE || getOfficialPolicyWifEligibilityPorts286().Yc(),
  descriptor:()=>getOAuthTokenFromFileDescriptor(),apiKeyHelper:()=>getConfiguredApiKeyHelper(),
  anthropicEndpointEnabled:()=>getAPIProvider()==='firstParty',
  selectorState:{of:host=>getOfficialProfileSelectorState286().of(host)},execution:getOAuthResetExecutionContext286,
  profilePrecedence:()=>getWifAttribution286().kb(),tokens:()=>getClaudeAIOAuthTokens(),
  implicitProfileUserOAuth:()=>getWifAttribution286().q2t(),profileAuthType:()=>getWifAttribution286().FXe(),
  debug:logForDebugging,analytics:logEvent,selectApiKey:options=>getAnthropicApiKeyWithSource(options),
})

