import {isDeepStrictEqual} from 'node:util'
import {getCACertificates} from './caCerts.js'
import {getMTLSConfig} from './mtls.js'
import {sharedTlsMaterial287} from './sharedTlsMaterial287.js'
import {createNativeTlsDispatch287, type TlsDispatchPorts287, type TlsDispatch287} from './officialTlsDispatch287/native.js'

// Reuse the credential execution host, not a second per-client/global pool.
// The raw standalone dispatch stays intact; public Bun uses the same resolved
// TLS defaults on its existing native fetch pool.
const runtimeBun = typeof Bun === 'undefined' ? undefined : Bun as unknown as TlsDispatchPorts287['Bun']
const transport = createNativeTlsDispatch287({
  Bun: runtimeBun,
  globalThis,
  iA: getMTLSConfig,
  cD: getCACertificates,
  k: sharedTlsMaterial287.mtlsState,
  at: isDeepStrictEqual,
})

export const sharedTlsFetch287: TlsDispatch287 = (input, init) => {
  // Official FetchSession inherits kbt() defaults for HEAD as well as Messages.
  // Without that runtime API, a default-CA HEAD and custom-CA POST otherwise
  // occupy different native TLS pools. Do not replace an explicit request TLS
  // policy, impersonate standalone, or introduce another fetch/session owner.
  if (!runtimeBun || (runtimeBun.isStandaloneExecutable && runtimeBun.FetchSession) || init?.tls !== undefined) {
    return transport.fetch(input, init)
  }
  const mtls = getMTLSConfig(), ca = getCACertificates()
  if (!mtls && !ca) return transport.fetch(input, init)
  return transport.fetch(input, {...init, tls: {...mtls, ...(ca && {ca})}})
}
