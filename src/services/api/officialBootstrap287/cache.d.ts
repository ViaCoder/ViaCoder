import type {BootstrapContext} from '../bootstrapCache.js'
export type BootstrapClientDataHookOwner287 = {
  setClientDataReadGate(value: () => boolean): void
  setClientDataStrictReadGate(value: () => boolean): void
  setClientDataOverride(value: (data: Record<string, unknown> | null, model?: string) => Record<string, unknown> | null): void
  setClientDataStaleMatchGetter(value: () => {entrypoint: string | null; model: string; org: string | null} | null): void
}
export type BootstrapBetaCache287 = {
  allModelBetas: Map<string, unknown>
  modelBetas: Map<string, unknown>
  bedrockExtraBodyParamsBetas: Map<string, unknown>
  midConversationSystem: Map<string, unknown>
}
export type BootstrapModelCacheOwner287 = {
  providerCache: {overturnedEntitlementDenies: Map<string, number>}
  betas?: BootstrapBetaCache287
  betasCompiledOnly?: BootstrapBetaCache287
  clientDataUrl?: {document?: {version: number; entries: Array<{pattern: RegExp; clientData: Record<string, unknown>}>}}
}
export function createOfficialBootstrapHooks287(ports: {
  He(): string
  a: {readonly ANTHROPIC_AWS_BASE_URL?: string}
  d(error: unknown): void
  v(): BootstrapContext
  oe(): BootstrapClientDataHookOwner287
  Cbo(data: Record<string, unknown> | null, model?: string): Record<string, unknown> | null
}): () => void
export function createOfficialBootstrapCacheMaintenance287(ports: {Xr(): BootstrapModelCacheOwner287}): {Ej(): void; oqr(): void}
export function createOfficialBootstrapClientDataOverride287(ports: {
  Xr(): BootstrapModelCacheOwner287
  Fn(model: string): string
  rt(): string
}): (data: Record<string, unknown> | null, model?: string) => Record<string, unknown> | null

export function createOfficialBootstrapSlotHelpers287(ports: {c0: typeof import('node:crypto').createHash}): {
  VZn(context: BootstrapContext): string
  F_t(value: unknown): boolean
  dKo<T extends {data: unknown; at: number}>(slots: Record<string,T> | undefined, key: string, slot: T): Record<string,T>
  cKo: number
  Pu(error: unknown, extraClassifier?: (error: unknown) => boolean): boolean
}
