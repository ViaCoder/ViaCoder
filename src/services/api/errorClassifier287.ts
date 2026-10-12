import {APIError} from '@anthropic-ai/sdk/error'
import {createPublicErrorClassifier287, type PublicErrorClassifierPorts287} from './officialErrorClassifier287/native.js'
import {getExecutionSession287} from '../context/execution287.js'
import {getModelBetaProducer287} from '../../utils/modelBetas287.js'
import {getModelBehaviorName287} from '../../utils/model/behavior287.js'
import {getAPIProvider, isFirstPartyAnthropicBaseUrl} from '../../utils/model/providers.js'
import {getAnthropicApiKey} from '../../utils/auth.js'
import {hasWorkloadIdentityConfiguration} from '../../utils/workloadIdentity.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {logForDebugging} from '../../utils/debug.js'
import {wasFastModeModelRejected287} from '../../utils/fastMode.js'
import provenance from './officialErrorClassifier287/provenance.json'

// No new beta registry, host budget or auth/cache owner is constructed here.
export function bindPublicErrorClassifierPorts287(model: string, modelIsRefusalFallbackTarget?: boolean): PublicErrorClassifierPorts287 {
  const producer = getModelBetaProducer287()
  const tokens = Object.fromEntries(provenance.tokens.map(row => {
    if (!row.header) throw new Error(`Missing original beta token ${row.name}`)
    return [row.name, producer.r4r(row.header)]
  }))
  return {
    xt: APIError, Be: getModelBehaviorName287,
    QJn: wasFastModeModelRejected287,
    d: error => logForDebugging(`[response-classifier] ${String(error)}`, {level: 'debug'}),
    Z: error => error,
    cc: () => getAPIProvider(), He: () => getAPIProvider(),
    ko: () => getExecutionSession287().host as unknown as {displayUpdatesProbeFailures?: number},
    a: authEnvironment, tg: isFirstPartyAnthropicBaseUrl,
    nZ: getAnthropicApiKey, fd: hasWorkloadIdentityConfiguration,
    z: {model, modelIsRefusalFallbackTarget}, tokens, token: header => producer.r4r(header), sT: producer.sT,
  }
}
export function createRequestErrorClassifier287(model: string, modelIsRefusalFallbackTarget?: boolean) {
  return createPublicErrorClassifier287(bindPublicErrorClassifierPorts287(model, modelIsRefusalFallbackTarget))
}
