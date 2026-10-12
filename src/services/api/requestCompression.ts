import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {logEvent} from '../analytics/index.js'
import {getGlobalConfig, saveGlobalConfig} from '../../utils/config.js'
import {isRunningWithBun} from '../../utils/bundledMode.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {peekPreSettingsEnvironment286} from '../../utils/managedEnv.js'
import {logError} from '../../utils/log.js'
import {createNativeBlockGzip287, type BlockGzipDispatch287} from './officialBlockGzip287/native.js'
import {StreamFirstByteTimeoutError} from './streamWatchdog.js'
import {string as o,number as C,object as u,literal as x} from 'zod/v4'
import {jsonParse} from '../../utils/slowOperations.js'
import {f} from './officialRequestCompression286/nativeMemo.js'
import {createNativeRequestCompression287,createNativeCompressionPadding287,createNativeCompressionEndpoint287,createNativeCompressionRemote287,createNativeCompressionPreparation287} from './officialRequestCompression287/native.js'
import {logForDebugging} from '../../utils/debug.js'
import {getMTLSConfig} from '../../utils/mtls.js'
import {getProxyUrl, shouldBypassProxy} from '../../utils/proxy.js'
import {getFetchRequestState286} from '../../utils/officialFetchRequestState286/runtime.js'
import {
  type CompressionDecision286,
  type GzipRequestState286,
} from './officialRequestCompression286/runtime.js'

export type RequestCompressionRollout = 'api' | 'ccr_worker'
export type RequestCompressionDecision = {
  enabled: boolean
  bodyChars: number | undefined
  reason: string
  level?: number
}

/** The native runtime reads this very same HTTP-WIF request-state owner. */
function nativeState(): GzipRequestState286 {
  return getFetchRequestState286()
}

const nativeCompression = createNativeRequestCompression287({
  a: authEnvironment,
  k: (name, fallback) => getFeatureValue_CACHED_MAY_BE_STALE(name, fallback),
  fO: isRunningWithBun,
  ry: createNativeCompressionEndpoint287(),
  ma: createNativeCompressionRemote287({a: authEnvironment}),
  Hp: getProxyUrl,
  Ph: shouldBypassProxy,
  iA: getMTLSConfig,
  wg: peekPreSettingsEnvironment286,
  Ms: nativeState,
  le: getGlobalConfig,
  async Ae(updater, storageV5) {
    await saveGlobalConfig(updater as Parameters<typeof saveGlobalConfig>[0], storageV5)
  },
  i(event, fields) {
    logEvent(event, fields as Parameters<typeof logEvent>[1])
  },
  t(message, options) { logForDebugging(message, options) },
  p(name) {
    logEvent('tengu_feature_sad', {feature_name: name as never, error_code: 'fell_back' as never})
  },
  y(name) {
    logEvent('tengu_feature_ok', {feature_name: name as never})
  },
  c: String,
  Y: jsonParse,
  f, o, C, u, x,
  now: Date.now,
})
const nativePadding = createNativeCompressionPadding287()
const nativePreparation = createNativeCompressionPreparation287({
  ymt: nativeCompression.Lut,
  dBo: nativeCompression.pMo,
  aBo: nativeCompression.getGzipLevel,
  X1t: nativeCompression.KNt,
  y_t: nativePadding,
  f2r: nativeCompression.SFr,
})

/** Original k9 statements execute before the same SDK transport dispatch. */
export function prepareOriginalCompressionRequest287(
  init: RequestInit | undefined,
  headers: Headers,
  url: string,
  clientRequestId: string | undefined,
  storageV5: unknown,
) {
  return nativePreparation(init, headers, url, clientRequestId, storageV5)
}

/**
 * Native-compatible decision API. `storageV5` must be the request's original
 * storage context; callers that can persist it pass it through unchanged.
 */
export function getRequestCompressionDecision(
  url: string,
  body: unknown,
  rollout: RequestCompressionRollout = 'api',
  storageV5?: unknown,
): RequestCompressionDecision {
  const decision = nativeCompression.Lut(url, body, storageV5, rollout)
  if (decision === undefined) return {enabled: false, bodyChars: undefined, reason: 'not_first_party'}
  const level = decision.gzip ? getGzipRequestBodyLevel() : undefined
  return {enabled: decision.gzip, bodyChars: decision.bodyChars, reason: decision.reason ?? 'enabled', ...(level === undefined ? {} : {level})}
}

/** Official native _Fr response consumer; dispatch is invoked at most once. */
export function handleGzipResponse286(input: {
  res: Response
  dispatch(init: RequestInit): Promise<Response>
  finalInit: RequestInit & {compress?: unknown}
  identityBody: string
  clientRequestId?: string
  storageV5?: unknown
  rollout?: RequestCompressionRollout
}): Promise<Response> {
  return nativeCompression._Fr({...input, storageV5: input.storageV5})
}

/** The transport's unchanged gzip padding algorithm. */
export function appendOfficialCompressionPadding(body: string): string {
  return nativePadding(body)
}

/** Complete original aBo; typed environment keeps explicit value precedence. */
export function getGzipRequestBodyLevel(): number | undefined {
  return nativeCompression.getGzipLevel()
}

/** @deprecated Test-only reset of the shared request-state fixture owner. */
export function resetCompressionStateForTesting(): void {
  const state = nativeState().gzipRequestBody
  state.latchedOff = false
  state.rejectedThisProcess = false
  state.persistedLatchChecked = false
  state.persistedLatchInEffect = false
}

/** Narrow runtime inspection hooks for parity tests, not an alternate state owner. */
export function getNativeCompressionStateForTesting(): GzipRequestState286 {
  return nativeState()
}

export type {CompressionDecision286}

/** Native qJ is the default transport only; explicit SDK fetch overrides bypass
 * it just as T9 does. This factory owns no state: both stages use the existing
 * execution-context request state and block store. */
export function createBlockGzipTransport287(dispatch: BlockGzipDispatch287) {
  return createNativeBlockGzip287({
    a: authEnvironment,
    C: (name, fallback) => getFeatureValue_CACHED_MAY_BE_STALE(name, fallback),
    Ls: getFetchRequestState286,
    N1r: response => nativeCompression.classifyBlockResponse287(response),
    d: logError,
    t: logForDebugging,
    // Keep the local automatic-telemetry policy at the existing leaf sink.
    m: (feature, outcome, fields) => logEvent('tengu_feature_bad', {...fields, feature_name: feature as never, error_code: outcome as never}),
    p: (feature, outcome, fields) => logEvent('tengu_feature_sad', {...fields, feature_name: feature as never, error_code: outcome as never}),
    y: feature => logEvent('tengu_feature_ok', {feature_name: feature as never}),
    sSt: StreamFirstByteTimeoutError,
    JM: dispatch,
  })
}
