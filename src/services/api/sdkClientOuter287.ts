import Anthropic,{type ClientOptions} from '@anthropic-ai/sdk'
import {createSdkClientOuter287,type SdkClientOuterInput287} from './officialSdkClientOuter287/native.js'
import {createSdkClientFactoryBindings287} from './sdkClientFactory287.js'
import type {SdkAuthInheritance287} from './officialSdkClientFactory287/native.js'
import {createAgentHeaderEncoding287,createPromptIdValidator287,createRequestClassification287,createSdkSubscriber287,createSdkAuthentication287,createMessageBearer287,createMessageApiKeySource287,createMessageBareSourceGate287,createOAuthHeldAccountReader287} from '../../utils/officialRequestHeaders/official287.js'
import {getMessageCustomHeaders,getMessageProtocolHeaderOverrides,areRequestHintHeadersEnabled,validateOutgoingHeaders} from './requestHeaders.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {getNativeGatewayAuth287} from '../remoteManagedSettings/gatewayBindings287.js'
import {getExecutionSession287} from '../context/execution287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getUserAgent} from '../../utils/http.js'
import {getSessionId,getIsNonInteractiveSession} from '../../bootstrap/state.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {checkAndRefreshOAuthTokenOutcome,getClaudeAIOAuthTokens,getAnthropicApiKey,getAnthropicApiKeyWithSource,getAuthTokenSource,getApiKeyFromApiKeyHelper,isAnthropicAuthEnabled} from '../../utils/auth.js'
import {hasDeadOAuthCredentials287} from '../../utils/sharedOAuthReader.js'
import {getSharedOAuthEngine} from '../../utils/sharedOAuthEngine.js'
import {isBareMode} from '../../utils/envUtils.js'
import {CLAUDE_AI_INFERENCE_SCOPE} from '../../constants/oauth.js'
import {hasWorkloadIdentityConfiguration} from '../../utils/workloadIdentity.js'
import {getProxyAuthToken} from '../../utils/proxyAuth.js'
import {getProxyFetchOptions} from '../../utils/proxy.js'
import {assertInferenceProviderAvailable287} from './filesPolicy287.js'
import {getFetchRequestState286} from '../../utils/officialFetchRequestState286/runtime.js'
import {logForDebugging,isDebugToStdErr} from '../../utils/debug.js'
import {logEvent} from '../analytics/index.js'
import {hasByteBodyWatchdog,streamWatchdogClock286} from './streamWatchdog.js'
import {OAuthAccountOnHoldError287,OAuthRefreshLockTimeoutError287} from './oauthConstructor286.js'
import {trackClientAuth} from './clientAuth.js'

/** One source outer, passed the SAME zk that existing provider constructors use.
 * buildFetch remains the canonical k9/C adapter, not a parallel dispatcher. */
export function sdkClientOuterPorts287(authInheritance:SdkAuthInheritance287,fetchWrapper:(fetch:ClientOptions['fetch'],source:string|undefined,routedProvider:string|undefined,storageV5:unknown,clock:SdkClientOuterInput287['clock'])=>ClientOptions['fetch']):Record<string,unknown>{
 const pure=createSdkClientFactoryBindings287(authInheritance)
 const classification=createRequestClassification287(),apiKeySource=createMessageApiKeySource287({mb:getAnthropicApiKeyWithSource})
 let proxyAuthToken:string|undefined
 // Original G0e executes before Di. Capture its returned primitive only for this
 // constructor call; the actual helper/cache/challenge stays in proxyAuth.ts.
 return {
  environment:authEnvironment,clock:streamWatchdogClock286,execution:getExecutionSession287,sessionId:getSessionId,userAgent:getUserAgent,
  isMain:classification.isMain,hintGate:areRequestHintHeadersEnabled,requestClass:classification.requestClass,agentType:classification.agentType,
  customHeaders:getMessageCustomHeaders,protocolHeaders:getMessageProtocolHeaderOverrides,encodeAgent:createAgentHeaderEncoding287(),promptId:createPromptIdValidator287(),debug:logForDebugging,
  provider:getNativeAPIProvider287,gatewayAuth:getNativeGatewayAuth287,refresh:checkAndRefreshOAuthTokenOutcome,tokens:getClaudeAIOAuthTokens,
  subscriber:createSdkSubscriber287({fA:CLAUDE_AI_INFERENCE_SCOPE}),anthropicAuthEnabled:isAnthropicAuthEnabled,
  bearer:createMessageBearer287({a:authEnvironment,xr:isBareMode,Cb:createMessageBareSourceGate287(),Gp:apiKeySource,a2e:getApiKeyFromApiKeyHelper}),nonInteractive:getIsNonInteractiveSession,
  proxyAuth:async()=>{proxyAuthToken=await getProxyAuthToken()},fetchWrapper,
  assertProvider:assertInferenceProviderAvailable287,requestState:getFetchRequestState286,
  featureOk:(_name:string)=>logEvent('tengu_feature_ok',{}),integerDefault:pure.integerDefault,
  proxyOptions:(input:Parameters<typeof getProxyFetchOptions>[0])=>getProxyFetchOptions({...input,proxyAuthToken}),
  watchdog:hasByteBodyWatchdog,transportURL:pure.transportURL,authInheritance,
  wifEligible:hasWorkloadIdentityConfiguration,apiKey:getAnthropicApiKey,deadCredential:hasDeadOAuthCredentials287,
  stripAuthorization:pure.stripAuthorization,
  heldAccount:()=>createOAuthHeldAccountReader287({fn:getClaudeAIOAuthTokens,gi:getSharedOAuthEngine().holdTokens})(),heldError:OAuthAccountOnHoldError287,lockError:OAuthRefreshLockTimeoutError287,
  feature:getFeatureValue_CACHED_MAY_BE_STALE,authentication:createSdkAuthentication287(),validateHeaders:validateOutgoingHeaders,apiKeySource,authTokenSource:getAuthTokenSource,
  debugEnabled:isDebugToStdErr,logger:pure.logger,
  // Keep existing recovery attribution C around the SAME installed SDK. No SDK
  // resolver, refresh engine, token cache, or transport is reconstructed here.
  sdkConstructor:function sdkConstructor(options:ClientOptions){
    const tokens=getClaudeAIOAuthTokens(),selected=options.authToken&&options.authToken===tokens?.accessToken?{kind:'oauth' as const,token:options.authToken}:{kind:'other' as const}
    if(!options.fetch)throw new TypeError('Original iM k9 fetch missing')
    const tracked=trackClientAuth(selected,options.fetch)
    return tracked.bind(new Anthropic({...options,fetch:tracked.fetch}))
  },
 }
}
export function createProductionSdkClientOuter287(authInheritance:SdkAuthInheritance287,fetchWrapper:Parameters<typeof sdkClientOuterPorts287>[1]){
 return createSdkClientOuter287(sdkClientOuterPorts287(authInheritance,fetchWrapper))
}
