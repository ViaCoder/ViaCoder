import type {APIConnectionError, APIError} from '@anthropic-ai/sdk'

/** Exact closure bindings for the recovered predicates; no owner/state is created here. */
export interface CredentialRetry286Ports {
  a: {CLAUDE_CODE_REMOTE?: boolean}
  Bn: () => boolean
  gE: () => string | undefined
  hre: () => boolean
  UOe: (error: unknown) => unknown
  BPe: () => unknown
  /** Upstream AWS and Google implementations are deliberately outside this port. */
  WOe: (error: unknown, model: string) => boolean
  SF: (error: unknown) => boolean
}

export declare const NPo: 2
export declare const $Po: 2
export declare function createOfficialCredentialRetry286(ports: CredentialRetry286Ports): {
  FI(error: unknown): boolean | undefined
  vse(error: unknown): boolean
  DLt(error: unknown, model: string): boolean
  VJ(error: unknown): boolean
  readonly APIError: typeof APIError
  readonly APIConnectionError: typeof APIConnectionError
}
