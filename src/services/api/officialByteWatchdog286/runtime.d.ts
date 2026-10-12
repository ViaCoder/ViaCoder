export type ByteWatchdogClock286 = {
  now(): number
  monotonicNow(): number
  setTimeout(callback: () => void, ms: number, options?: {unref?: boolean}): () => void
}
export type ByteChunkTimes286 = {lastAt: number}
declare class IdleError extends Error {
  idleMs: number; bytesReceived: number; ttfbMs: number | undefined
  bodyReadPending: boolean; cfRay: string | undefined; sleptMs: number
  constructor(idleMs: number, bytesReceived?: number, ttfbMs?: number, bodyReadPending?: boolean, cfRay?: string, sleptMs?: number)
}
declare class SuspendedError extends Error {
  code: string; sleptMs: number
  constructor(sleptMs: number)
}
export declare function createOfficialByteWatchdog286(ports: {
  t(message: string, options?: {level: 'warn'}): void
  te(level: 'warn', event: string, data: Record<string, number | boolean | null>): void
  i(event: string, data: Record<string, number | boolean>): void
}): {
  zQ: ByteWatchdogClock286
  r9(body: ReadableStream<Uint8Array>, idleMs: number, cfRay?: string, chunkTimes?: ByteChunkTimes286, clock?: ByteWatchdogClock286): ReadableStream<Uint8Array>
  zM(response: Response, body: ReadableStream<Uint8Array>): Response
  oin: typeof IdleError
  ROt: typeof SuspendedError
}
