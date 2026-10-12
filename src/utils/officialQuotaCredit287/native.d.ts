export type QuotaCreditLatches287 = {
  longContext1mCreditsBlocked(): boolean
  replaceLongContext1mCreditsBlocked(value: boolean): void
  fableCreditsRequired(): boolean
  replaceFableCreditsRequired(value: boolean): void
  reset(): void
}
export type QuotaCreditExecutionContext287 = {
  readonly root: object
  host: {accountCreditLatches: QuotaCreditLatches287}
  fableConsentSlots: {
    sessionConsentKey(): string | null
    fableConsentSessionFallback(): boolean
  }
}
export type NativeCreditsOnlyCache287 = {creditsOnlyTiers: null | {raw: unknown; parsed: string[]}}
/** These names intentionally mirror native lexical symbols used by the exact
 * declarations. No alternate host, latch, or consent owner is constructed. */
export type QuotaCreditNativePorts287 = {
  In(): {accountUuid?: string; organizationUuid?: string; billingType?: string; seatTier?: string | null} | null | undefined
  Be(model: string, options?: {identity: true}): string
  a: {ANTHROPIC_DEFAULT_FABLE_MODEL?: string}
  Me(): string
  ft(): boolean
  qv(): string | null
  ar(): string | null
  kts(): string | null
  C(flag: string, fallback: string[]): unknown
  DS(): NativeCreditsOnlyCache287
  n3(): {safeParse(value: unknown): {success: true; data: string[]} | {success: false}}
  t(message: string, options: {level: 'warn'}): void
  le(): {fableOverageConsentV2?: Record<string, boolean>}
  n(): QuotaCreditExecutionContext287
}
export type NativeQuotaCredit287 = {
  bN(): boolean
  Ry(model: string, options?: {identity?: boolean}): boolean
  mK(): boolean
  ode(): boolean
  CLt(): boolean
  zAn(value: boolean): void
  FS(): string | null
  Pzt(): boolean
  o3(): boolean
  r3(): string[]
  lsr(): boolean
  SZr(): string | null
  kt(model: string): string
  n8(model: string): boolean
  getAccountCreditLatches(): QuotaCreditLatches287
}
export declare function createNativeQuotaCredit287(ports: QuotaCreditNativePorts287): NativeQuotaCredit287
/** Uses real local auth, catalog, GrowthBook, config, Zod, debug, and shared
 * execution-context APIs. DS uses a root-keyed missing promo substate; the
 * context root, not the shallow per-call context object, owns its lifetime. */
export declare function createCurrentQuotaCredit287Adapter(ports: {
  DS: () => NativeCreditsOnlyCache287
}): NativeQuotaCredit287
export type RootQuotaCreditPromoCache287 = (() => NativeCreditsOnlyCache287) & {drop(context: {root: object}): void}
export declare function createRootQuotaCreditPromoCache287(getContext: () => {root: object}): RootQuotaCreditPromoCache287
export declare function getQuotaCredit287(): NativeQuotaCredit287
