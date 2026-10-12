import type * as undici from 'undici'
import {getCACertificates} from './caCerts.js'
import {logForDebugging} from './debug.js'
import {sharedTlsMaterial287} from './sharedTlsMaterial287.js'

export type MTLSConfig = {cert?:string;key?:string;passphrase?:string}
export type TLSConfig = MTLSConfig & {ca?:string|string[]|Buffer}

export const getMTLSConfig=sharedTlsMaterial287.getMTLSConfig
export const getMTLSAgent=sharedTlsMaterial287.getMTLSAgent
export const clearMTLSCache=sharedTlsMaterial287.clearMTLSCache
export const configureGlobalMTLS=sharedTlsMaterial287.configureGlobalMTLS
export const getWebSocketTLSOptions=sharedTlsMaterial287.getWebSocketTLSOptions
export const loadMTLSClientMaterial=sharedTlsMaterial287.loadMTLSClientMaterial

export function getTLSFetchOptions(): {
  tls?: TLSConfig
  dispatcher?: undici.Dispatcher
} {
  const mtlsConfig = getMTLSConfig()
  const caCerts = getCACertificates()

  if (!mtlsConfig && !caCerts) {
    return {}
  }

  const tlsConfig: TLSConfig = {
    ...mtlsConfig,
    ...(caCerts && { ca: caCerts }),
  }

  if (typeof Bun !== 'undefined') {
    return { tls: tlsConfig }
  }
  logForDebugging('TLS: Created undici agent with custom certificates')
  // Create a custom undici Agent with TLS options. Lazy-required so that
  // the ~1.5MB undici package is only loaded when mTLS/CA certs are configured.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const undiciMod = require('undici') as typeof undici
  const agent = new undiciMod.Agent({
    connect: {
      cert: tlsConfig.cert,
      key: tlsConfig.key,
      passphrase: tlsConfig.passphrase,
      ...(tlsConfig.ca && { ca: tlsConfig.ca }),
    },
    pipelining: 1,
  })

  return { dispatcher: agent }
}
