export type BetaToken287 = Readonly<{name: string; header: string}>
export type BetaCacheGroup287 = {
  allModelBetas: Map<string, BetaToken287[]>
  modelBetas: Map<string, BetaToken287[]>
  bedrockExtraBodyParamsBetas: Map<string, BetaToken287[]>
  midConversationSystem: Map<string, boolean>
}
export type BetaOwner287 = {
  betas: BetaCacheGroup287
  betasCompiledOnly: BetaCacheGroup287
  servedCatalogSuppressDepth: number
  providerCache: {capabilityOverrides: Map<string, unknown>}
}
export interface ModelBetaPorts287 {
  betaRegistry:Map<string,BetaToken287>
  Xr(): BetaOwner287
  a: {CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS?: boolean; DISABLE_INTERLEAVED_THINKING?: boolean;
    USE_API_CONTEXT_MANAGEMENT?: boolean; CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM?: boolean;
    CLAUDE_CODE_DISABLE_1M_CONTEXT?: boolean; ANTHROPIC_BETAS?: string}
  Be(model: string): string
  He(): string
  cc(model: string): string
  zF(provider: string): boolean
  cL(): import('../model/officialModelBehavior287/native.js').CanonicalRoot287
  zQe(capability: string, model: string): boolean | undefined
  xa(model: string): {capabilities: readonly string[]} | undefined
  ol(regime: string): boolean
  ft(): boolean
  uwn(): boolean
  fd(): boolean
  Ce(): boolean
  tt(): {showThinkingSummaries?: boolean}
  k(name: string, fallback: boolean): boolean
  Ano(): Set<BetaToken287>
  od(): boolean
  t(message: string, options: {level: string}): void
}
export interface ModelBetaProducer287 {
  /** Original Im, same live typed environment and compliance taint owner. */
  Im(): boolean
  rK(): boolean
  Qr(): BetaCacheGroup287
  _j<T>(fn: () => T): T
  XQ(): boolean
  iwn(model: string): BetaToken287[]
  eZ(model: string): BetaToken287[]
  Ej(): void
  p8(model: string): boolean
  r4r(header: string): BetaToken287
  q_t(header: string): BetaToken287 | undefined
  sT(tokens: BetaToken287[]): string[]
}
export declare function createOfficialModelBetas287(ports: ModelBetaPorts287): ModelBetaProducer287
