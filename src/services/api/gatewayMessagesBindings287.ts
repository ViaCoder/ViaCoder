import Anthropic from '@anthropic-ai/sdk'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {isFirstPartyRequestEndpoint} from '../../utils/model/providers.js'
import {isDebugToStdErr} from '../../utils/debug.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {getNativeGatewayAuth287,nativeGatewayRefresh287} from '../remoteManagedSettings/gatewayBindings287.js'
import {createGatewayMessages287} from './officialGatewayMessages287/native.js'

// Keep the original shared credential/refresh owner. This binding is separate
// from the explicit local host-injection contract; neither copies the other.
export const nativeGatewayMessages287 = createGatewayMessages287({
 environment: authEnvironment,
 provider: getNativeAPIProvider287,
 gatewayAuth: getNativeGatewayAuth287,
 refreshGateway: () => nativeGatewayRefresh287.refreshGateway(),
 gatewayFromEnvironment: nativeGatewayRefresh287.gatewayFromEnvironment,
 sdkConstructor: Anthropic,
 debugEnabled: isDebugToStdErr,
 firstPartyRequest: () => getNativeAPIProvider287() === 'firstParty' && isFirstPartyRequestEndpoint(),
 featureValue: (name,fallback) => getFeatureValue_CACHED_MAY_BE_STALE(name,fallback),
 execution: () => ({host: {credentialSlots: filesCredentialSlots}}),
})
