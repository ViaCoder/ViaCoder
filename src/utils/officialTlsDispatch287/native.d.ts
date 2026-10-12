export type TlsFetchInit287 = RequestInit & {tls?: unknown; proxy?: unknown; unix?: unknown; compress?: unknown}
export type TlsDispatch287 = (input: RequestInfo | URL, init?: TlsFetchInit287) => Promise<Response>
export type FetchSession287 = {fetch: TlsDispatch287; close(): void}
export type TlsSessionState287 = {fetchSession: {tls: unknown; session: FetchSession287} | null}
export type TlsDispatchPorts287 = {
  Bun: {isStandaloneExecutable?: boolean; FetchSession?: new(options: {tls?: unknown}) => FetchSession287} | undefined
  globalThis: {fetch: TlsDispatch287}
  iA(): object | undefined
  cD(): unknown
  k(): TlsSessionState287
  at(a: unknown, b: unknown): boolean
}
export declare function createNativeTlsDispatch287(ports: TlsDispatchPorts287): {fetch: TlsDispatch287}
