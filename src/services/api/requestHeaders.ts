import {nativeGatewayMessages287} from './gatewayMessagesBindings287.js'
import type { AgentContext } from '../../utils/agentContext.js'
import { getAPIProvider, isFirstPartyRequestEndpoint } from '../../utils/model/providers.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import { oc as hasComplianceTaint } from '../../vendor/official-files-api/taints.js'
import { hasGatewayInjection } from '../remoteManagedSettings/clientRuntime.js'
import { authEnvironment } from '../../utils/authEnvironment.js'
import { createInterfaceCustomHeaders287 } from './officialInterfaceHeaders287/native.js'
import {
  createAgentHeaderEncoding287,
  createPromptIdValidator287,
  createRequestClassification287, createRequestHintGate287,
} from '../../utils/officialRequestHeaders/official287.js'

const officialClassification = createRequestClassification287()
export const encodeAgentHeader = createAgentHeaderEncoding287()
const isOfficialPromptId = createPromptIdValidator287()
export function getRequestClass(source: string | undefined, agent?: AgentContext): string | undefined {
  return officialClassification.requestClass(source, agent ?? {agentType:'main'})
}
const classifyRequestAgentType = officialClassification.agentType
export function getRequestAgentType(source: string | undefined, agent?: AgentContext): string | undefined {
  return classifyRequestAgentType(source, agent ?? {})
}

const officialHintGate = createRequestHintGate287({
  a: authEnvironment,
  ja: () => !hasGatewayInjection() && getAPIProvider() === 'firstParty' && isFirstPartyRequestEndpoint(),
  He: () => hasGatewayInjection() ? 'gateway' : getAPIProvider(),
  k: (flag, fallback) => getFeatureValue_CACHED_MAY_BE_STALE(flag, fallback),
})

export function areRequestHintHeadersEnabled(): boolean | undefined {
  // Preserve rdn's original return through the production triBool environment port.
  return hasGatewayInjection() ? officialHintGate() : nativeGatewayMessages287.hintGate()
}

export function getRequestContextHeaders(source?: string, agent?: AgentContext, promptId?: string): Record<string, string> {
  const headers: Record<string, string> = {}
  const identity = officialClassification.isMain(agent ?? {agentType:'main'}) ? undefined : agent
  if (identity?.agentId) headers['x-claude-code-agent-id'] = encodeAgentHeader(identity.agentId)
  if (identity?.parentAgentId) headers['x-claude-code-parent-agent-id'] = encodeAgentHeader(identity.parentAgentId)
  if (areRequestHintHeadersEnabled()) {
    const requestClass = getRequestClass(source, agent)
    const agentType = getRequestAgentType(source, agent)
    if (requestClass) headers['x-claude-code-request-class'] = requestClass
    if (agentType) headers['x-claude-code-agent-type'] = encodeAgentHeader(agentType)
    if (promptId !== undefined && isOfficialPromptId(promptId) !== null) {
      headers['x-claude-code-prompt-id'] = promptId
    }
  }
  return headers
}

const officialCustomHeaderOverrides = createInterfaceCustomHeaders287({
  a: authEnvironment, ol: hasComplianceTaint, t: () => {}, // Preserve disabled diagnostic C.
})
const officialCompliancePolicy = officialCustomHeaderOverrides.compliance

export const getMessageProtocolHeaderOverrides = officialCustomHeaderOverrides.beta
export const getGatewayAuthorizationHeaderOverrides = officialCustomHeaderOverrides.gatewayAuth
export function getMessageCustomHeaders(hipaa = officialCompliancePolicy()): Record<string, string | undefined> {
  // Keep the existing explicit policy seam; default is the same live taint owner.
  return createInterfaceCustomHeaders287({a: authEnvironment, ol: () => hipaa, t: () => {}}).custom()
}

export type RequestHeaderValidationOptions = {
  apiKey?: string | null
  apiKeySource?: string
  getApiKeySource?: () => string
  authToken?: string | null
  authTokenSource?: string
  getAuthTokenSource?: () => string
  defaultHeaders: Record<string, string | undefined>
  authorizationSource?: string | null
  customHeaderNames?: string[]
  envSuppliedHeaderNames?: Set<string>
}

/** Run the complete official 2.1.287 validator; it does not rewrite headers. */
export function validateOutgoingHeaders({
  apiKey,
  apiKeySource = 'unknown',
  getApiKeySource,
  authToken,
  authTokenSource,
  getAuthTokenSource,
  defaultHeaders,
  authorizationSource = null,
  customHeaderNames = [],
  envSuppliedHeaderNames = new Set(),
}: RequestHeaderValidationOptions): void {
  // The SDK validator and nPo must share the original KG constructor.
  // Resolve lazily after module initialization; no second factory or owner.
  const namespace = (require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-nankzm0s.js')
  const validate = namespace.rQn
  if (typeof validate !== 'function') throw new TypeError('Original outgoing header validator is not connected')
  validate({
    apiKey: apiKey ?? null,
    getApiKeySource: getApiKeySource ?? (() => apiKeySource),
    authToken: authToken ?? null,
    getAuthTokenSource: getAuthTokenSource ?? (() => authTokenSource ?? authorizationSource ?? 'unknown'),
    defaultHeaders,
    authorizationSource,
    customHeaderNames,
    envSuppliedHeaderNames,
  })
}
