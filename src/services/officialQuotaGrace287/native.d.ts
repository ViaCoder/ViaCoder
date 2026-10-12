export type QuotaGraceZone287 = {resetsAt?: number; rateLimitType?: string; extraUsageStatus?: string; [key: string]: unknown}
export type QuotaGraceParseResult287 = {limiterRan: boolean; zone?: QuotaGraceZone287 | null; covered?: boolean}
export type QuotaGraceHeaders287 = {get(name: string): string | null}
export type QuotaGraceParserPorts287 = {
  /** Exact constants imported by the official quota owner, not caller-selected substitute keys. */
  overageStatusHeader: 'anthropic-ratelimit-unified-overage-status'
  overageInUseHeader: 'anthropic-ratelimit-unified-overage-in-use'
}
export type QuotaGracePorts287 = QuotaGraceParserPorts287 & {
  /** Owning module's Date.now() in Unix epoch milliseconds. */
  now: () => number
}
export type NativeQuotaGraceParser287 = (headers: QuotaGraceHeaders287, observedAtMs: number) => QuotaGraceParseResult287
export type NativeQuotaGrace287 = {
  zone: QuotaGraceZone287 | null; covered: boolean; turnNote: 'none' | 'owed' | 'taken' | 'placed'; fenceMs: number
  getZone(nowMs?: number): QuotaGraceZone287 | null
  applyResponse(responseHeaders: QuotaGraceHeaders287, observedAtMs: number): void
  dropEndedZone(nowMs: number): void
  onRefused(): void
  leave(nowMs?: number): void
  onMainTurnStart(): void
  takeTurnNote(nowMs?: number): boolean
  markStartNotePlaced(): void
  continueAfterWrapUpAt(nowMs?: number): {resetsAt: number; rateLimitType?: string} | null
  subagentNoteDue(nowMs?: number): boolean
}
export declare function createNativeQuotaGraceParser287(ports: QuotaGraceParserPorts287): NativeQuotaGraceParser287
export declare function createNativeQuotaGrace287(ports: QuotaGracePorts287): NativeQuotaGrace287
