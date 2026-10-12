import type {ByteWatchdogClock286} from './runtime.js'
export type FirstHeaderDeadline286 = {escalated: boolean; firstWindowMs: number; retryWindowMs: number}
declare class NoResponseError extends Error {
  deadline: FirstHeaderDeadline286
  sleptMs: number
  code: string
  constructor(deadline: FirstHeaderDeadline286, sleptMs: number)
}
export declare function createOfficialFirstHeader286(ports: {
  ROt: new(sleptMs: number) => Error
  zQ: ByteWatchdogClock286
  t(message: string, options: {level: 'error'}): void
  PA(): string
  i(event: string, fields: {provider: string; timeout_ms: number; slept_ms: number; suspended: boolean; escalated: boolean}): void
}): {
  n9(fetchImpl: (input: RequestInfo | URL, init: RequestInit) => Promise<Response>, input: RequestInfo | URL, init: RequestInit, deadline: FirstHeaderDeadline286, clock?: ByteWatchdogClock286): Promise<Response>
  ASn: typeof NoResponseError
  o7n(deadline: FirstHeaderDeadline286): number
}
