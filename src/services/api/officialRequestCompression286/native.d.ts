import type {OfficialRequestCompression286, OfficialRequestCompressionPorts286} from './runtime.js'
export type NativeRequestCompressionPorts286 = {
  Bh: OfficialRequestCompressionPorts286['firstPartyUrl']
  b0: OfficialRequestCompressionPorts286['bunRuntime']
  wi: OfficialRequestCompressionPorts286['state']
  ce(): unknown
  Te: OfficialRequestCompressionPorts286['updateGlobalConfig']
  i: OfficialRequestCompressionPorts286['emit']
  c: OfficialRequestCompressionPorts286['safeString']
  t(message: string, options: {level: 'warn'}): void
  p: OfficialRequestCompressionPorts286['featureFallback']
  y: OfficialRequestCompressionPorts286['featureSuccessOnce']
  J: typeof JSON.parse
  o: typeof import('zod/v4').string
  C: typeof import('zod/v4').number
  u: typeof import('zod/v4').object
  x: typeof import('zod/v4').literal
  F: OfficialRequestCompressionPorts286['gzipEnv']
  Q: OfficialRequestCompressionPorts286['featureEnabled']
  Y: OfficialRequestCompressionPorts286['minimumBodyChars']
  Z: OfficialRequestCompressionPorts286['transportExclusion']
  now: OfficialRequestCompressionPorts286['now']
}
export declare function createNativeRequestCompression286(ports: NativeRequestCompressionPorts286): OfficialRequestCompression286
