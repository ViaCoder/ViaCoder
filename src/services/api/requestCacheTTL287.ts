import {createRequestCacheTTL287,type RequestCacheTTL287,type RequestCachePorts287} from './officialRequestCacheTTL287/native.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {getModelBetaProducer287} from '../../utils/modelBetas287.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import {isClaudeAISubscriber} from '../../utils/auth.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {getExecutionSession287} from '../context/execution287.js'
import {getRuntimeMemo287} from '../context/runtimeMemo287.js'
import {currentLimits} from '../claudeAiLimits.js'
import {logEvent} from '../analytics/index.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {createAuthDecoders,createAuthIntegerReader} from '../../utils/officialAuthEnvironment/runtime.js'
let native:RequestCacheTTL287|undefined
// Only source functions are memoized; allowlist/memo/config/limits remain in existing owners.
export function requestCacheTTLPorts287():RequestCachePorts287 {
 return {
  environment:authEnvironment,provider:getNativeAPIProvider287,subscriber:isClaudeAISubscriber,
  settings:getInitialSettings,limits:()=>currentLimits,
  config:getFeatureValue_CACHED_MAY_BE_STALE,
  execution:getExecutionSession287,runtimeMemo:getRuntimeMemo287,
  experimentalAllowed:()=>getModelBetaProducer287().Im(),
  experimentalDisabled:()=>getModelBetaProducer287().rK(),
  decoders:createAuthDecoders({rc:createAuthIntegerReader()}),
  analytics:logEvent,errorLog:logError,debug:(message,options)=>logForDebugging(message,{level:options?.level==='warn'?'warn':'debug'}),
 }
}
export function getRequestCacheTTL287():RequestCacheTTL287 {
 return native??=createRequestCacheTTL287(requestCacheTTLPorts287())
}
