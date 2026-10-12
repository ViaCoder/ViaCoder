export type PublishedTrustRoot287 = {id: string; spkiBase64: string}
export type ClientDataDocument287 = {version: number; entries: Array<{pattern: RegExp; clientData: Record<string,unknown>}>}
export type PublishedFloorMark287 = {version: number; issuedAt: string; recordedAt: number}
export type PublicDocumentSource287 = {
  kind: 'hosted' | 'file' | 'custom_url'; url: string;
  trust: {kind: 'compiled_roots'; roots: readonly PublishedTrustRoot287[]}; cacheKey: string
}
export type PublicDocumentFetchResult287 =
  | {status: 'ok'; documentBytes: Uint8Array; sidecar: unknown; hasSidecar: boolean; sidecarHttpStatus?: number; etag?: string; httpStatus?: number}
  | {status: 'error'; reason: string; httpStatus?: number}
  | {status: 'not_modified'; httpStatus: number}
export type SignatureResult287 = {ok: true; rootId: string} | {ok: false; reason: string}
export type PublicHttp287 = {get(url: string, options: import('axios').AxiosRequestConfig): Promise<import('axios').AxiosResponse>}
export declare function createOfficialDownloadTransport287(ports: {St: PublicHttp287}): {
  $0e(url: string): boolean; n$(url: string): boolean; N2: PublicHttp287; sa: PublicHttp287
}
export type PublishedDocumentReader287 = {
  ien(source: PublicDocumentSource287, options?: {etag?: string; noCache?: boolean}): Promise<PublicDocumentFetchResult287>
  Kst(input: {documentBytes: Uint8Array; sidecar: unknown; roots: readonly PublishedTrustRoot287[]; context?: string}): Promise<SignatureResult287>
  dPt: PublishedTrustRoot287[]
  TEr(source: string): string
  Q(url: string): (options: Record<string,unknown>) => void
  re(bytes: Uint8Array, context?: string): Uint8Array
  oe(bytes: Uint8Array): Promise<string>
}
export declare function createOfficialPublishedDocumentReader287(ports: Record<string,unknown>): PublishedDocumentReader287
export type PublishedFloor287 = {
  aen(key: string): Promise<number>
  Yst(key: string, document: {version: number; issued_at?: string}, now?: number): Promise<void>
  kEr: string
}
export declare function createOfficialPublishedFloor287(ports: Record<string,unknown>): PublishedFloor287
export type ClientDataUrl287 = {
  Ebo(options?: {runsOnAnotherMachine?: boolean}): Promise<string | undefined>
  vbo(): string | undefined
  Cbo(data: Record<string,unknown> | null, model?: string): Record<string,unknown> | null
  Abo(): string | undefined
  S(): {kind: 'unset' | 'invalid_url'} | {kind: 'ok'; source: {url: string; signingContext: string; cacheKey: string; roots: readonly PublishedTrustRoot287[]}}
  w(bytes: Uint8Array): {ok: true; document: ClientDataDocument287} | {ok: false; reason: string}
  E(source: ReturnType<ClientDataUrl287['S']>, remote: boolean): Promise<{document: ClientDataDocument287} | {failure: string; httpStatus?: number}>
}
export declare function createOfficialClientDataUrl287(ports: Record<string,unknown>): ClientDataUrl287
