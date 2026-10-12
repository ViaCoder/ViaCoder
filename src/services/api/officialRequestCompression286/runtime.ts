import {string as o, number as C, object as u, literal as x} from 'zod/v4'
import {jsonParse} from '../../../utils/slowOperations.js'
import {createNativeRequestCompression286} from './native.js'

export type GzipRollout286 = 'api' | 'ccr_worker' | 'frame_publish'
export type GzipRejection286 = 'non_anthropic_rejection' | 'invalid_json_at_origin'
export type GzipRetryOutcome286 = 'same_rejection' | 'api_response' | 'not_api_response' | 'aborted' | 'network_error'
export type RequestStateMap286 = {
  get(key: string): unknown
  has(key: string): boolean
  set(key: string, value: unknown): unknown
  delete(key: string): boolean
}
export type GzipRequestState286 = {
  gzipRequestBody: {
    latchedOff: boolean
    rejectedThisProcess: boolean
    persistedLatchChecked: boolean
    persistedLatchInEffect: boolean
    telemetryByClientRequestId: RequestStateMap286
    dispatchAtByClientRequestId: RequestStateMap286
  }
  once(key: string): boolean
}
export type CompressionDecision286 = {gzip: boolean; bodyChars: number | undefined; reason?: string}
export type OfficialGzipResponseInput286 = {
  res: Response
  dispatch(init: RequestInit): Promise<Response>
  finalInit: RequestInit & {compress?: unknown}
  identityBody: string
  clientRequestId?: string
  storageV5: unknown
  rollout?: 'api' | 'ccr_worker'
}
export type OfficialRequestCompression286 = Readonly<{
  Lut(url: string, body: unknown, storageV5: unknown, rollout?: 'api' | 'ccr_worker'): CompressionDecision286 | undefined
  _Fr(input: OfficialGzipResponseInput286): Promise<Response>
  pMo(clientRequestId: string | undefined): unknown
  SFr(clientRequestId: string, data: unknown): void
  KNt(rollout?: GzipRollout286): void
  /** Original ne closure, alpha-equivalent to the public 2.1.287 block classifier. */
  classifyBlockResponse287(res: Response): Promise<GzipRejection286 | null>
}>
export type OfficialRequestCompressionPorts286 = Readonly<{
  /** The full existing getFetchRequestState286() object, including outer once(). */
  state(): GzipRequestState286
  firstPartyUrl(url: string): boolean
  gzipEnv(rollout: 'api' | 'ccr_worker'): boolean | undefined
  bunRuntime(): boolean
  minimumBodyChars(rollout: 'api' | 'ccr_worker'): number
  transportExclusion(url: string): string | undefined
  featureEnabled(rollout: 'api' | 'ccr_worker'): boolean
  /** Native ce() has no argument. This adapter passes undefined, never request storageV5. */
  readGlobalConfig(storageV5: unknown): unknown
  updateGlobalConfig(updater: (config: Record<string, unknown>) => Record<string, unknown>, storageV5: unknown): Promise<unknown>
  emit(event: string, fields: Record<string, unknown>): void
  log(message: string, level: 'warn'): void
  featureFallback(name: string, outcome: 'fell_back'): void
  featureSuccessOnce(name: string): void
  safeString(value: unknown): string
  now(): number
}>

/** Bind owners only. All response, schema, retry, latch and telemetry decisions
 * are complete original declarations generated in native.js. */
export function createOfficialRequestCompression286(ports: OfficialRequestCompressionPorts286): OfficialRequestCompression286 {
  return Object.freeze(createNativeRequestCompression286({
    Bh: ports.firstPartyUrl,
    b0: ports.bunRuntime,
    wi: ports.state,
    ce: () => ports.readGlobalConfig(undefined),
    Te: ports.updateGlobalConfig,
    i: ports.emit,
    c: ports.safeString,
    t: (message, options) => ports.log(message, options.level),
    p: ports.featureFallback,
    y: ports.featureSuccessOnce,
    J: jsonParse,
    o, C, u, x,
    F: ports.gzipEnv,
    Q: ports.featureEnabled,
    Y: ports.minimumBodyChars,
    Z: ports.transportExclusion,
    now: ports.now,
  }))
}
