import axios from 'axios'
import { CLAUDE_AI_INFERENCE_SCOPE } from '../../constants/oauth.js'
import { getAnthropicApiKeyWithSource, getClaudeAIOAuthTokens } from '../../utils/auth.js'
import { getAPIProvider, isFirstPartyRequestEndpoint } from '../../utils/model/providers.js'
import { getClaudeCodeUserAgent } from '../../utils/userAgent.js'
import { hasWorkloadIdentityConfiguration } from '../../utils/workloadIdentity.js'
import { createPolicyProtocol } from './official/protocol.js'
export const policyProtocolKernel = createPolicyProtocol({
  Ms: isFirstPartyRequestEndpoint, Nc: hasWorkloadIdentityConfiguration,
  Pe: getAPIProvider, TS: options => getAnthropicApiKeyWithSource(options), Wi: getClaudeCodeUserAgent,
  a: process.env, bC: CLAUDE_AI_INFERENCE_SCOPE, f: () => require('./officialIdentityBindings286.js').getOfficialPolicyPrincipal286().p(),
  gt: axios, ln: () => getClaudeAIOAuthTokens(),
})
export function resetPolicyProtocolForTesting(): void {
  require('./officialIdentityBindings286.js').getOfficialPolicyPrincipal286().p().tunnelSocket = undefined
}
