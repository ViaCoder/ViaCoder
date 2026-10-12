import {getGatewayAuthorizationHeaderOverrides} from './requestHeaders.js'
import {createRequire} from 'node:module'
import Anthropic from '@anthropic-ai/sdk'
import {createSdkClientFactory287,type SdkAuthInheritance287,type SdkClientFactoryPorts287} from './officialSdkClientFactory287/native.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getOauthConfig} from '../../constants/oauth.js'
import {getNativeGatewayAuth287} from '../remoteManagedSettings/gatewayBindings287.js'
import {getVertexRegionForModel} from '../../utils/envUtils.js'
import {getProxyFetchOptions} from '../../utils/proxy.js'
import {isDebugToStdErr} from '../../utils/debug.js'
import {createHeaderValidationErrorBase287} from '../../utils/officialRequestHeaders/official287.js'
import {hasByteBodyWatchdog} from './streamWatchdog.js'
const nativeRequire=createRequire(import.meta.url)
/** Pure original factory helpers. All stateful slots remain the caller's existing owners. */
export function createSdkClientFactoryBindings287(authInheritance:SdkAuthInheritance287){
 return createSdkClientFactory287(sdkClientFactoryPorts287(authInheritance))
}
export function sdkClientFactoryPorts287(authInheritance:SdkAuthInheritance287):SdkClientFactoryPorts287{
 return {
  environment:authEnvironment,oauthConfig:getOauthConfig,gatewayAuth:getNativeGatewayAuth287,
  vertexRegion:getVertexRegionForModel,errorBase:createHeaderValidationErrorBase287(),
  proxyOptions:input=>getProxyFetchOptions(input),bodyWatchdogEnabled:hasByteBodyWatchdog,
  authInheritance,sdkConstructor:Anthropic,debugEnabled:isDebugToStdErr,gatewayAuthOverrides:()=>getGatewayAuthorizationHeaderOverrides(),
  googleAuthModule:()=>nativeRequire('google-auth-library'),sdkError:Anthropic.AnthropicError,
 }
}
