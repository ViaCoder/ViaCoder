import type { createHash } from 'node:crypto'
import type { OAuthTokens } from '../../services/oauth/types.js'
import type { CredentialStore, ModernSecureStorage, StorageWriteResult } from '../officialSecureStorage/runtime.js'
import type { AuthEnvironment } from '../officialAuthEnvironment/runtime.js'
import type { OAuthRefreshOutcome } from '../officialOAuthEngine/runtime.js'

export interface CredentialSignal {
  subscribe(listener: () => void): () => void
  emit(): void
  clear(): void
}
export type CredentialState = {
  value: OAuthTokens | null | undefined
  promise: Promise<OAuthTokens | null> | null
  lastCredentialsMtimeMs: number
  lastCredentialsVersion: unknown
  lastKeychainAccessToken: string | null
  lastUnusableTokenRecheckAt: number
  lastOwnSavedAccessToken: string | null
  credentialsChangedOnDisk: CredentialSignal
  pending401Handlers: Map<string, {promise: Promise<boolean>;forcedOutcome?: OAuthRefreshOutcome}>
  pendingRefreshChecks: Record<'bare' | 'store' | 'backend', Promise<unknown> | null>
  pendingOptedInRefreshChecks: Record<'bare' | 'store' | 'backend', Promise<unknown> | null>
  clear(): void
  resetChangeCheck(): void
}
export type CredentialStateCell = { of(host: object): CredentialState }
export function createOAuthCredentialState(): { state: CredentialStateCell; signal(): CredentialSignal; configurationChanged: { of(host: object): CredentialSignal } }
export type OAuthErrorMetadata = Record<string, string>
export function createOAuthErrorCodes(): {
  brand<T>(value: T): T
  code(error: unknown): string | undefined
  constructor(name: unknown): string | undefined
  frame(name: string): string | undefined
}
export function createOAuthErrorMetadata(ports: {
  IP(name: unknown): string | undefined
  P7r(name: string): string | undefined
  Sn<T>(value: T): T
  co(error: unknown): string | undefined
  e: typeof createHash
}): (error: unknown) => OAuthErrorMetadata
export type OAuthSaveOutcome = 'saved' | 'save_failed' | 'adopted_sibling'
export type OAuthPersistence = {
  save(tokens: OAuthTokens, credentials?: CredentialStore): Promise<StorageWriteResult>
  reconcile(options: {
    isCompromised(): boolean
    postedRefreshToken: string
    refreshedTokens: OAuthTokens
    credentials?: CredentialStore
  }): Promise<OAuthSaveOutcome>
  clearDead(refreshToken: string, credentials?: CredentialStore): Promise<void>
  merge(previous: OAuthTokens | null | undefined, next: OAuthTokens): OAuthTokens
  prime(credentials: CredentialStore, previous?: Promise<OAuthTokens | null> | null): Promise<void>
  clear(): void
  clearAll(): void
}
export function createOAuthPersistence(ports: {
  F(): boolean
  GG(): boolean
  Jde: CredentialStateCell
  Pf(): void
  Sn<T>(value: T): T
  USe(): void
  Vd(error: unknown): OAuthErrorMetadata
  Z(ms: number): Promise<void>
  _<T>(value: T): T
  a: AuthEnvironment
  bi: Set<string>
  bj(): string | null | undefined
  h1(scopes: string[] | undefined): boolean
  i(event: string, metadata: Record<string, string | boolean>): void
  j(): { host: object }
  l(error: unknown): string
  pP(): void
  r9(): boolean
  t(message: string, options: { level: 'error' }): void
  vpe(account: null): void
  zn(): ModernSecureStorage
}): OAuthPersistence
