import type { Agent as HttpsAgent } from 'node:https'
import type { LookupFunction } from 'node:net'
import type { SecureContextOptions, ConnectionOptions } from 'node:tls'

export interface OfficialGatewayTransport287Ports {
  proxyConfigured: () => unknown
  proxyBypass: (url: string) => boolean
  certificateAuthority: () => SecureContextOptions['ca']
  mtlsOptions: () => ConnectionOptions | undefined
  debug: (message: string, options?: { level?: string }) => void
  httpsAgent: new (options?: SecureContextOptions & { lookup?: LookupFunction }) => HttpsAgent
  dnsLookup: typeof import('node:dns').lookup
  checkServerIdentity: typeof import('node:tls').checkServerIdentity
}

export interface OfficialGatewayTransport287 {
  spe(fingerprint: string | undefined, url: string): HttpsAgent | undefined
  ZA(fingerprint: string): HttpsAgent
  hbn(url: string, declaredNetwork?: string): HttpsAgent | undefined
  QA(declaredNetwork?: string): LookupFunction
  Qf(network: string, gateway: string, localAddress: string, remoteAddress: string): Error | undefined
  s8(url: URL): string
}

export function createOfficialGatewayTransport287(ports: OfficialGatewayTransport287Ports): OfficialGatewayTransport287
