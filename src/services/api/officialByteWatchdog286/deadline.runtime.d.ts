import type {FirstHeaderDeadline286} from './header.runtime.js'
export type NoResponseRetryLedger286 = {count: number}
export declare function createOfficialRequestDeadline286(ports: {
  a: {readonly CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK: boolean}
  wi(): {streamFirstByteArmedRequestIds: {get(id: string): unknown; set(id: string, value: {escalated: boolean}): unknown; delete(id: string): boolean}}
  He(): string
  hw(): boolean
  gw(provider?: string): boolean
  Y3(provider?: string): number
  eQe(value: unknown, fallback: number): number
}): {
  Ako(id: string, options: {escalated: boolean}): void
  Q3(id: string | undefined): {escalated: boolean} | undefined
  t9(input: {clientRequestId?: string; provider: string; routedProvider?: string; method: string; url: string; body: unknown}): FirstHeaderDeadline286 | undefined
  QM(provider?: string): boolean
  WM(provider?: string): boolean
  pWn(provider?: string): boolean
}
export declare function createOfficialNoResponseRetry286(ports: {
  a: {readonly CLAUDE_CODE_RETRY_WATCHDOG: boolean}
  ASn: new(deadline: FirstHeaderDeadline286, sleptMs: number) => Error & {deadline: FirstHeaderDeadline286; sleptMs: number}
}): {
  ljt(error: unknown): (Error & {deadline: FirstHeaderDeadline286; sleptMs: number}) | undefined
  v4(): boolean
  NLt(error: {noResponse?: unknown}, attempt: number, maximum: number, used: number, remaining?: number): number
  HLt: number
}
