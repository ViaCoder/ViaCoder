import {createProductionSdkClientOuter287} from './sdkClientOuter287.js'
import {hasWorkloadIdentityConfiguration} from '../../utils/workloadIdentity.js'
import type {SdkRequestAgent287,SdkClientOuterInput287} from './officialSdkClientOuter287/native.js'
import {createSdkClientFactoryBindings287} from './sdkClientFactory287.js'
import {createProductionFetchWrapper287,getFetchWrapper287} from './fetchWrapper287.js'
import {nativeGatewayMessages287} from './gatewayMessagesBindings287.js'
import {observePolicyApiResponse287} from '../policyLimits/controllerEvents287.js'
import {getNativeGatewayAuth287} from '../remoteManagedSettings/gatewayBindings287.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {createMessageBearer287,createMessageApiKeySource287,createMessageBareSourceGate287} from '../../utils/officialRequestHeaders/official287.js'
import {createSdkAuthentication287,createSdkAuthInheritance287,createSdkSubscriber287} from '../../utils/officialRequestHeaders/official287.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import {guardfactory as enforceOAuthConstructorOutcome} from './oauthConstructor286.js'
import {captureLowPriorityResponse} from '../../utils/lowPriorityRequest.js'
import {
  getMessageCustomHeaders,
  getMessageProtocolHeaderOverrides,
  getGatewayAuthorizationHeaderOverrides,
  getRequestContextHeaders,
  validateOutgoingHeaders,
} from './requestHeaders.js'
import { resolveBootstrapWorkloadIdentity, invalidateWorkloadIdentityToken } from '../../utils/workloadIdentity.js'
import { CLAUDE_AI_INFERENCE_SCOPE } from '../../constants/oauth.js'
import { trackClientAuth } from './clientAuth.js'
import Anthropic, { type ClientOptions } from '@anthropic-ai/sdk'
import { createOfficialFoundry286 } from './officialFoundry286.js'
import { createRequire } from 'node:module'
import {
  checkAndRefreshOAuthTokenOutcome,
  getAnthropicApiKey,
  getAnthropicApiKeyWithSource,
  getAuthTokenSource,
  getApiKeyFromApiKeyHelper,
  getClaudeAIOAuthTokens,
  isAnthropicAuthEnabled,
  isClaudeAISubscriber,
  refreshGcpCredentialsIfNeeded,
} from 'src/utils/auth.js'
import { getUserAgent } from 'src/utils/http.js'
import { getAgentContext } from '../../utils/agentContext.js'
import {
  assertBedrockProviderRemoved,
  getAPIProvider,
  isFirstPartyRequestEndpoint,
} from 'src/utils/model/providers.js'
import { getProxyFetchOptions } from 'src/utils/proxy.js'
import { getProxyAuthToken } from 'src/utils/proxyAuth.js'
import {
  isLowPriorityModeEnabled,
  observeLowPriorityHeaders,
  syncLowPriorityIdentity,
} from 'src/utils/lowPriority.js'
import {
  getIsNonInteractiveSession,
  getSessionId,
} from '../../bootstrap/state.js'
import { isDebugToStdErr, logForDebugging } from '../../utils/debug.js'
import {
  getVertexRegionForModel,
  isEnvTruthy,
  isBareMode,
} from '../../utils/envUtils.js'
import {
  gatewayIsAccepted,
  getInjectedGatewayAuth,
  type GatewayAuth,
} from '../remoteManagedSettings/gateway.js'
import { getRemoteManagedSettingsClientInjection } from '../remoteManagedSettings/clientRuntime.js'

/**
 * Resolve the URL used by the official 2.1.284 transport selector (`kV`).
 *
 * This URL is used for proxy/NO_PROXY and TLS routing only.  The provider SDK
 * remains the owner of the actual request URL and path rewriting.  Keeping
 * the two concerns separate is important for Vertex rawPredict and Foundry
 * resource paths while still making transport policy observe the same host as
 * the official client.
 */
export function getProviderTransportURL(model?: string): string | undefined {
  assertBedrockProviderRemoved()
  return sdkClientFactory287.transportURL(getAPIProvider(), model)
}

/** Match the public 2.1.284 AnthropicGoogleCloud constructor's URL rules. */
export function getGoogleCloudBaseURL(): string {
  const configured = process.env.ANTHROPIC_GOOGLE_CLOUD_BASE_URL?.trim()
  const project =
    process.env.ANTHROPIC_GOOGLE_CLOUD_PROJECT?.trim() ||
    process.env.GOOGLE_CLOUD_PROJECT?.trim()
  const location = process.env.ANTHROPIC_GOOGLE_CLOUD_LOCATION?.trim() || 'global'
  const workspaceId = process.env.ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID?.trim()
  const skipAuth = isEnvTruthy(process.env.CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH)

  if (!workspaceId && !(skipAuth && configured)) {
    throw new Error(
      'No workspace ID found. Set ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID or provide ANTHROPIC_GOOGLE_CLOUD_BASE_URL with skipped authentication.',
    )
  }
  if (configured) return configured
  if (!project) {
    throw new Error(
      'Set ANTHROPIC_GOOGLE_CLOUD_PROJECT or GOOGLE_CLOUD_PROJECT (or provide ANTHROPIC_GOOGLE_CLOUD_BASE_URL).',
    )
  }
  return `https://claude.googleapis.com/v1alpha/projects/${encodeURIComponent(project)}/locations/${encodeURIComponent(location)}/workspaces/${encodeURIComponent(workspaceId!)}/invoke`
}

function getInjectedMessagesGateway(): GatewayAuth | undefined {
  const injection = getRemoteManagedSettingsClientInjection().gateway
  const gateway = getInjectedGatewayAuth(injection)
  if (!gateway) return undefined
  if (!gatewayIsAccepted(gateway)) {
    throw new Error('Gateway host verdict was not accepted')
  }
  if (!gateway.jwt) throw new Error('Gateway JWT was not injected')
  return gateway
}

function withoutAuthorizationHeader(
  headers: Record<string, string | undefined>,
): Record<string, string | undefined> {
  return Object.fromEntries(
    Object.entries(headers).filter(([name]) => name.toLowerCase() !== 'authorization'),
  )
}

/**
 * Environment variables for different client types:
 *
 * Direct API:
 * - ANTHROPIC_API_KEY: Required for direct API access
 *
 * Foundry (Azure):
 * - ANTHROPIC_FOUNDRY_RESOURCE: Your Azure resource name (e.g., 'my-resource')
 *   For the full endpoint: https://{resource}.services.ai.azure.com/anthropic/v1/messages
 * - ANTHROPIC_FOUNDRY_BASE_URL: Optional. Alternative to resource - provide full base URL directly
 *   (e.g., 'https://my-resource.services.ai.azure.com')
 *
 * Authentication (one of the following):
 * - ANTHROPIC_FOUNDRY_API_KEY: Your Microsoft Foundry API key (if using API key auth)
 * - Azure AD authentication: If no API key is provided, uses DefaultAzureCredential
 *   which supports multiple auth methods (environment variables, managed identity,
 *   Azure CLI, etc.). See: https://docs.microsoft.com/en-us/javascript/api/@azure/identity
 *
 * Vertex AI:
 * - Model-specific region variables (highest priority):
 *   - VERTEX_REGION_CLAUDE_3_5_HAIKU: Region for Claude 3.5 Haiku model
 *   - VERTEX_REGION_CLAUDE_HAIKU_4_5: Region for Claude Haiku 4.5 model
 *   - VERTEX_REGION_CLAUDE_3_5_SONNET: Region for Claude 3.5 Sonnet model
 *   - VERTEX_REGION_CLAUDE_3_7_SONNET: Region for Claude 3.7 Sonnet model
 * - CLOUD_ML_REGION: Optional. The default GCP region to use for all models
 *   If specific model region not specified above
 * - ANTHROPIC_VERTEX_PROJECT_ID: Required. Your GCP project ID
 * - Standard GCP credentials configured via google-auth-library
 *
 * Priority for determining region:
 * 1. Hardcoded model-specific environment variables
 * 2. Global CLOUD_ML_REGION variable
 * 3. Default region from config
 * 4. Fallback region (us-east5)
 */


function createStderrLogger(): ClientOptions['logger'] {
  return {
    error: (msg, ...args) =>
      // biome-ignore lint/suspicious/noConsole:: intentional console output -- SDK logger must use console
      console.error('[Anthropic SDK ERROR]', msg, ...args),
    // biome-ignore lint/suspicious/noConsole:: intentional console output -- SDK logger must use console
    warn: (msg, ...args) => console.error('[Anthropic SDK WARN]', msg, ...args),
    // biome-ignore lint/suspicious/noConsole:: intentional console output -- SDK logger must use console
    info: (msg, ...args) => console.error('[Anthropic SDK INFO]', msg, ...args),
    debug: (msg, ...args) =>
      // biome-ignore lint/suspicious/noConsole:: intentional console output -- SDK logger must use console
      console.error('[Anthropic SDK DEBUG]', msg, ...args),
  }
}


const selectSdkAuthentication = createSdkAuthentication287()
const selectSdkSubscriber = createSdkSubscriber287({fA:CLAUDE_AI_INFERENCE_SCOPE})
const sdkAuthInheritance = createSdkAuthInheritance287()
const sdkClientFactory287 = createSdkClientFactoryBindings287(sdkAuthInheritance)
const configureApiKeyHeaders = createMessageBearer287({
  a: authEnvironment, xr: isBareMode,
  Cb: createMessageBareSourceGate287(),
  Gp: createMessageApiKeySource287({mb: options => getAnthropicApiKeyWithSource(options)}),
  a2e: nonInteractive => getApiKeyFromApiKeyHelper(nonInteractive),
})

export async function getAnthropicClient({
  apiKey,
  maxRetries,
  model,
  fetchOverride,
  source,
  querySource = source,
  agentContext = getAgentContext(),
  promptId,
  permissionContext,
  credentials,
  storageV5,
  signal,
  clock,
}: {
  apiKey?: string
  maxRetries: number
  model?: string
  fetchOverride?: ClientOptions['fetch']
  source?: string
  querySource?: string
  agentContext?: SdkRequestAgent287
  promptId?: string
  permissionContext?: unknown
  credentials?: CredentialStore
  storageV5?: unknown
  signal?: AbortSignal
  clock?: SdkClientOuterInput287['clock']
}): Promise<Anthropic> {
  assertBedrockProviderRemoved()
  const injectedGateway = getInjectedMessagesGateway()
  // Complete 287 ordinary iM. Existing non-ordinary/WIF/host-injected callers
  // retain their own branches; no excluded Google/Vertex waiter is enabled.
  if (!injectedGateway && getNativeAPIProvider287() === 'firstParty' && !hasWorkloadIdentityConfiguration()) {
    return createProductionSdkClientOuter287(sdkAuthInheritance, (fetch, source, _routedProvider, storageV5, clock) =>
      buildFetch(fetch, source, true, {storageV5, clock}))({
      apiKey, maxRetries, model, fetchOverride, source, querySource,
      agentContext: agentContext ?? {agentType:'main'}, promptId, permissionContext,
      credentials, storageV5, signal, clock,
    })
  }
  const containerId = process.env.CLAUDE_CODE_CONTAINER_ID
  const remoteSessionId = process.env.CLAUDE_CODE_REMOTE_SESSION_ID
  // Native _D field Y is raw; QI's User-Agent suffix has a separate typed getter.
  const clientApp = process.env.CLAUDE_AGENT_SDK_CLIENT_APP
  const customHeaders = getMessageCustomHeaders()
  const defaultHeaders: { [key: string]: string | undefined } = {
    // Official chunk-1vt3h958:Et/f7 selects cli-bg only for session kind bg.
    'x-app': authEnvironment.CLAUDE_CODE_SESSION_KIND === 'bg' ? 'cli-bg' : 'cli',
    'User-Agent': getUserAgent(),
    'X-Claude-Code-Session-Id': getSessionId(),
    ...customHeaders,
    ...getMessageProtocolHeaderOverrides(),
    ...(containerId ? { 'x-claude-remote-container-id': containerId } : {}),
    ...(remoteSessionId
      ? { 'x-claude-remote-session-id': remoteSessionId }
      : {}),
    // SDK consumers can identify their app/library for backend analytics
    ...(clientApp ? { 'x-client-app': clientApp } : {}),
    ...getRequestContextHeaders(source, agentContext?.agentType === 'main' ? undefined : agentContext, promptId),
  }

  // Log API client configuration for HFI debugging
  logForDebugging(
    `[API:request] Creating client, ANTHROPIC_CUSTOM_HEADERS present: ${!!process.env.ANTHROPIC_CUSTOM_HEADERS}, has Authorization header: ${!!customHeaders['Authorization']}`,
  )

  // Add additional protection header if enabled via env var
  const additionalProtectionEnabled = authEnvironment.CLAUDE_CODE_ADDITIONAL_PROTECTION
  if (additionalProtectionEnabled) {
    defaultHeaders['x-anthropic-additional-protection'] = 'true'
  }

  // Native _D awaits o9 for every lane before taking the pn/Imn snapshot.
  // Preserve the injected credential/backend identity, not just a bool refresh.
  if (!injectedGateway) nativeGatewayMessages287.preflight()
  const refreshOutcome = await checkAndRefreshOAuthTokenOutcome({credentials,storageV5})
  const nativeGateway = !injectedGateway && getNativeAPIProvider287() === 'gateway'
  const oauthTokens = getClaudeAIOAuthTokens()
  const useSubscriberAuth = selectSdkSubscriber({
    anthropicAuthEnabled:!nativeGateway && isAnthropicAuthEnabled(),oauthScopes:oauthTokens?.scopes,
  })
  let authorizationSource: string | null | undefined
  if (!useSubscriberAuth && !injectedGateway && !getNativeGatewayAuth287()) {
    authorizationSource = await configureApiKeyHeaders(
      defaultHeaders,
      getIsNonInteractiveSession(),
    )
  }
  const customHeaderNames = Object.keys(
    process.env.ANTHROPIC_CUSTOM_HEADERS
      ? Object.fromEntries(
          process.env.ANTHROPIC_CUSTOM_HEADERS
            .split(/\n|\r\n/)
            .map(line => {
              const colon = line.indexOf(':')
              return [colon >= 0 ? line.slice(0, colon).trim() : '', true]
            })
            .filter(([name]) => Boolean(name)),
        )
      : {},
  )
  if (!nativeGateway) validateOutgoingHeaders({
    defaultHeaders,
    authorizationSource: authorizationSource ??
      (customHeaderNames.some(name => name.toLowerCase() === 'authorization')
        ? 'ANTHROPIC_CUSTOM_HEADERS'
        : undefined),
    customHeaderNames,
    envSuppliedHeaderNames: new Set([
      clientApp ? 'x-client-app' : undefined,
      process.env.CLAUDE_CODE_CONTAINER_ID ? 'x-claude-remote-container-id' : undefined,
      process.env.CLAUDE_CODE_REMOTE_SESSION_ID ? 'x-claude-remote-session-id' : undefined,
      'User-Agent',
    ].filter((value): value is string => Boolean(value))),
  })

  // Official 2.1.284 `cV` accepts querySource for the wider query contract,
  // but its transport wrapper `IV` is keyed by the request `source` argument.
  // Keep those two values distinct rather than letting an SDK/Web query label
  // silently replace the transport source.
  const watchdogProvider = nativeGateway ? 'gateway' : getAPIProvider()
  const resolvedFetch = buildFetch(fetchOverride, source, true, {
    gateway: Boolean(injectedGateway) || nativeGateway,
    nativeGateway,
    storageV5,
  })
  // The official proxy-auth helper is a transport concern, not a model
  // provider concern.  Resolve it before provider-specific SDK construction
  // so API, OAuth, Vertex and Foundry transports share the same proxy wire.
  const proxyAuthToken = await getProxyAuthToken()

  const ARGS = sdkClientFactory287.commonOptions({
    headers: defaultHeaders, maxRetries, fetch: resolvedFetch,
    provider: watchdogProvider, model,
  }, options => getProxyFetchOptions({
    ...options,
    url: nativeGateway ? getNativeGatewayAuth287()?.url : injectedGateway?.url ?? options.url,
    proxyAuthToken,
  }) as ClientOptions['fetchOptions'])

  if (nativeGateway) {
    const client = await nativeGatewayMessages287.construct(ARGS)
    return trackClientAuth({kind: 'other'}, resolvedFetch!).bind(client)
  }
  if (injectedGateway) {
    const gatewayHeaders = {
      ...withoutAuthorizationHeader(defaultHeaders),
      ...getGatewayAuthorizationHeaderOverrides(),
      Authorization: `Bearer ${injectedGateway.jwt}`,
    }
    validateOutgoingHeaders({
      authToken: injectedGateway.jwt,
      defaultHeaders: gatewayHeaders,
      authorizationSource: 'injected gateway',
      customHeaderNames,
    })
    const tracked = trackClientAuth(
      { kind: 'other' },
      resolvedFetch!,
    )
    return tracked.bind(new Anthropic({
      ...ARGS,
      apiKey: null,
      authToken: injectedGateway.jwt,
      baseURL: injectedGateway.url,
      defaultHeaders: gatewayHeaders,
      ...(isDebugToStdErr() && { logger: createStderrLogger() }),
    }))
  }
  if (getAPIProvider() === 'anthropicGoogleCloud') {
    // Original 287 path-segment charset gate precedes SDK initialization.
    for (const name of ['ANTHROPIC_GOOGLE_CLOUD_PROJECT', 'ANTHROPIC_GOOGLE_CLOUD_LOCATION',
      'ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID', 'GCLOUD_PROJECT', 'GOOGLE_CLOUD_PROJECT',
      'gcloud_project', 'google_cloud_project'] as const) {
      sdkClientFactory287.validateGooglePath(name, authEnvironment[name])
    }
    const tracked = trackClientAuth({kind:'other'}, resolvedFetch!)
    return tracked.bind(sdkClientFactory287.constructGoogle({...ARGS,fetch:tracked.fetch}))
  }

  if (getAPIProvider() === 'foundry') {
    return await createOfficialFoundry286(apiKey, {...ARGS}) as Anthropic
  }
  if (isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX)) {
    // Refresh GCP credentials if gcpAuthRefresh is configured and credentials are expired
    // This is similar to how we handle AWS credential refresh for Bedrock
    if (!isEnvTruthy(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH)) {
      await refreshGcpCredentialsIfNeeded()
    }

    const { AnthropicVertex } = await import('@anthropic-ai/vertex-sdk')
    // The Vertex SDK resolves its own google-auth-library major (currently 9),
    // while this application also uses major 10. Its GoogleAuth parameter has
    // private class members, so a major-10 instance is not the SDK contract.
    // Resolve from the SDK package rather than injecting the root package.
    type VertexGoogleAuth = NonNullable<ConstructorParameters<typeof AnthropicVertex>[0]['googleAuth']>
    const { GoogleAuth } = createRequire(require.resolve('@anthropic-ai/vertex-sdk'))(
      'google-auth-library',
    ) as { GoogleAuth: new (options: { scopes: string[]; projectId?: string }) => VertexGoogleAuth }
    // TODO: Cache either GoogleAuth instance or AuthClient to improve performance
    // Currently we create a new GoogleAuth instance for every getAnthropicClient() call
    // This could cause repeated authentication flows and metadata server checks
    // However, caching needs careful handling of:
    // - Credential refresh/expiration
    // - Environment variable changes (GOOGLE_APPLICATION_CREDENTIALS, project vars)
    // - Cross-request auth state management
    // See: https://github.com/googleapis/google-auth-library-nodejs/issues/390 for caching challenges

    // Prevent metadata server timeout by providing projectId as fallback
    // google-auth-library checks project ID in this order:
    // 1. Environment variables (GCLOUD_PROJECT, GOOGLE_CLOUD_PROJECT, etc.)
    // 2. Credential files (service account JSON, ADC file)
    // 3. gcloud config
    // 4. GCE metadata server (causes 12s timeout outside GCP)
    //
    // We only set projectId if user hasn't configured other discovery methods
    // to avoid interfering with their existing auth setup

    // Check project environment variables in same order as google-auth-library
    // See: https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/googleauth.ts
    const hasProjectEnvVar =
      process.env['GCLOUD_PROJECT'] ||
      process.env['GOOGLE_CLOUD_PROJECT'] ||
      process.env['gcloud_project'] ||
      process.env['google_cloud_project']

    // Check for credential file paths (service account or ADC)
    // Note: We're checking both standard and lowercase variants to be safe,
    // though we should verify what google-auth-library actually checks
    const hasKeyFile =
      process.env['GOOGLE_APPLICATION_CREDENTIALS'] ||
      process.env['google_application_credentials']

    const googleAuth = isEnvTruthy(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH)
      ? ({
          // Mock GoogleAuth for testing/proxy scenarios
          getClient: () => ({
            getRequestHeaders: () => ({}),
          }),
        } as unknown as VertexGoogleAuth)
      : new GoogleAuth({
          scopes: ['https://www.googleapis.com/auth/cloud-platform'],
          // Only use ANTHROPIC_VERTEX_PROJECT_ID as last resort fallback
          // This prevents the 12-second metadata server timeout when:
          // - No project env vars are set AND
          // - No credential keyfile is specified AND
          // - ADC file exists but lacks project_id field
          //
          // Risk: If auth project != API target project, this could cause billing/audit issues
          // Mitigation: Users can set GOOGLE_CLOUD_PROJECT to override
          ...(hasProjectEnvVar || hasKeyFile
            ? {}
            : {
                projectId: process.env.ANTHROPIC_VERTEX_PROJECT_ID,
              }),
        })

    const vertexArgs: ConstructorParameters<typeof AnthropicVertex>[0] = {
      ...ARGS,
      region: getVertexRegionForModel(model),
      googleAuth,
      ...(isDebugToStdErr() && { logger: createStderrLogger() }),
    }
    validateOutgoingHeaders({
      apiKey: apiKey ?? process.env.ANTHROPIC_API_KEY ?? null,
      defaultHeaders,
      authorizationSource,
      customHeaderNames,
    })
    // we have always been lying about the return type - this doesn't support batching or models
    return new AnthropicVertex(vertexArgs) as unknown as Anthropic
  }

  // Official npm 2.1.283 chunk-hzevqd7x:Hz: a selected API key wins;
  // otherwise ed/Qle/Lke resolve the SAME WIF cache used by bootstrap.
  // Hz passes a token snapshot to the messages SDK, not a second exchanger.
  // Preserve the existing subscriber no-keychain path. Also avoid the legacy
  // CI API-key guard for explicit bearer-only sessions (official fS accepts
  // ANTHROPIC_AUTH_TOKEN); this does not alter the shared OAuth refresh code.
  const bearerOnly = Boolean(process.env.ANTHROPIC_AUTH_TOKEN) && !process.env.ANTHROPIC_API_KEY
  const selectedApiKey = apiKey || (useSubscriberAuth || bearerOnly ? null : getAnthropicApiKey())
  if (!selectedApiKey) {
    const stored = oauthTokens
    const identity = await resolveBootstrapWorkloadIdentity(
      Boolean(stored?.accessToken && stored.scopes?.includes(CLAUDE_AI_INFERENCE_SCOPE)),
    )
    if (identity) {
      // A selected exchange failure propagates; never silently try a different
      // saved identity or send an unauthenticated messages request.
      const token = await identity.cache.getToken()
      validateOutgoingHeaders({
        authToken: token,
        defaultHeaders: { ...defaultHeaders, Authorization: `Bearer ${token}` },
        authorizationSource: 'workload identity',
        customHeaderNames,
      })
      const headers = Object.fromEntries(Object.entries(defaultHeaders)
        .filter(([name]) => name.toLowerCase() !== 'authorization'))
      // Keep the existing per-dispatch wrapper; WIF is not subscriber auth even
      // when a stored Claude login exists underneath an explicit WIF profile.
      const wrappedFetch = buildFetch(fetchOverride, source, false)!
      const tracked = trackClientAuth({ kind: 'wif', token,
        invalidate: () => invalidateWorkloadIdentityToken(identity, token),
      }, wrappedFetch)
      return tracked.bind(new Anthropic({
        ...ARGS,
        apiKey: null,
        authToken: token,
        baseURL: identity.baseURL,
        defaultHeaders: { ...headers, Authorization: `Bearer ${token}`, ...identity.extraHeaders },
        fetch: tracked.fetch,
        ...(isDebugToStdErr() && { logger: createStderrLogger() }),
      }))
    }
  }

  // The official subscriber lane is chosen independently of the explicit
  // constructor key. Its Z$o selector suppresses that key for OAuth subscribers.
  // WIF and provider-specific clients already returned above.
  enforceOAuthConstructorOutcome(useSubscriberAuth, refreshOutcome, oauthTokens)
  const oauthToken = useSubscriberAuth ? oauthTokens?.accessToken : undefined
  const selectedSdkAuth = selectSdkAuthentication({
    isSubscriber: useSubscriberAuth,
    apiKey: selectedApiKey,
    oauthAccessToken: oauthToken,
  })
  validateOutgoingHeaders({
    apiKey: selectedSdkAuth.apiKey,
    authToken: selectedSdkAuth.authToken,
    getApiKeySource: () => {
      const {source} = getAnthropicApiKeyWithSource({skipRetrievingKeyFromApiKeyHelper: true})
      return source === 'none' ? 'unknown' : source
    },
    getAuthTokenSource: () => {
      const {source} = getAuthTokenSource()
      return source === 'CLAUDE_CODE_OAUTH_TOKEN' || source === 'CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR' || source === 'CCR_OAUTH_TOKEN_FILE' ? source : 'claude.ai'
    },
    defaultHeaders,
    authorizationSource,
    customHeaderNames,
  })
  const tracked = trackClientAuth(oauthToken ? { kind: 'oauth', token: oauthToken } : { kind: 'other' }, resolvedFetch!)
  return tracked.bind(sdkClientFactory287.constructFirstParty({
    auth: selectedSdkAuth,
    options: {...ARGS, fetch: tracked.fetch},
  }))
}

export const CLIENT_REQUEST_ID_HEADER = 'x-client-request-id'

export function buildFetch(
  fetchOverride: ClientOptions['fetch'],
  source: string | undefined,
  subscriberAuth = true,
  options: { gateway?: boolean; nativeGateway?: boolean; storageV5?: unknown; clock?: SdkClientOuterInput287['clock'] } = {},
): ClientOptions['fetch'] {
  const provider = options.nativeGateway ? 'gateway' : getAPIProvider()
  const original = createProductionFetchWrapper287(fetchOverride, source, options.gateway ? 'gateway' : provider, options.storageV5, options.clock)
  return async (input, init) => {
    // Retained local identity bookkeeping observes the actual SDK operation;
    // the original k9 owns headers, arming, compression, clocks and body reads.
    const messagePath = getFetchWrapper287().isMessageEndpoint(input)
    const eligible = subscriberAuth && !options.gateway && provider === 'firstParty' && isFirstPartyRequestEndpoint() && isClaudeAISubscriber()
    if (messagePath) syncLowPriorityIdentity(eligible ? new Headers(init?.headers).get('authorization') ?? undefined : undefined, eligible)
    const markedAtDispatch = eligible && messagePath && isLowPriorityModeEnabled()
    const response = await original(input, init)
    if (messagePath) observePolicyApiResponse287(response.headers, false)
    if (eligible && messagePath) {
      observeLowPriorityHeaders(response.headers, false)
      captureLowPriorityResponse(response.headers, markedAtDispatch)
    }
    return response
  }
}
