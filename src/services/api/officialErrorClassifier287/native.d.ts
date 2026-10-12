import type {APIError} from '@anthropic-ai/sdk/error'
import type {BetaToken287} from '../../../utils/officialModelBetas287/native.js'
export interface PublicErrorClassifierPorts287 {
  xt: typeof APIError
  Be(model: string, options: {identity: boolean}): string
  QJn(model: string): boolean
  d(error: unknown): void
  Z(error: unknown): unknown
  cc(model: string): string
  ko(): {displayUpdatesProbeFailures?: number}
  He(): string
  a: {ANTHROPIC_UNIX_SOCKET?: string}
  tg(): boolean
  nZ(): string | null
  fd(): boolean
  z: {model: string; modelIsRefusalFallbackTarget?: boolean}
  sT(tokens: BetaToken287[]): string[]
  token(header: string): BetaToken287
  tokens: Record<string, BetaToken287>
}
export interface PublicErrorClassifier287 {
  MVe(error: unknown): boolean
  bC(error: unknown): boolean
  XL(error: unknown): boolean
  OVe(error: unknown): string | undefined
  BH(): boolean
  AUt(error: unknown): boolean
  QDe(error: unknown, model: string): boolean
  updateRequest(headers: string[]): void
  state(): 'idle' | 'retrying' | 'spent'
  markSuccess(): void
  predicates: Record<string, (error: unknown, ...args: any[]) => unknown>
}
export declare function createPublicErrorClassifier287(ports: PublicErrorClassifierPorts287): PublicErrorClassifier287
export declare function createPublicFastRejectedPredicate287(ports: {
  Xl: {fastRejectedFallbackModels: Set<string>; everFastRejectedModels: Set<string>}
  Jm(model: string): string; d(error: unknown): void; Z(error: unknown): unknown
}): (model: string) => boolean
