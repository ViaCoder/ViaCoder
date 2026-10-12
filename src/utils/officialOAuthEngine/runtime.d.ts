import type { OAuthTokens } from '../../services/oauth/types.js'
import type { CredentialState, CredentialStateCell, OAuthErrorMetadata, OAuthPersistence } from '../officialOAuthPersistence/runtime.js'
import type { CredentialStore, ModernSecureStorage } from '../officialSecureStorage/runtime.js'
import type { OAuthLeaseRuntime } from '../officialOAuthLease/runtime.js'
import type { AuthEnvironment } from '../officialAuthEnvironment/runtime.js'
import type { ZodString, ZodType } from 'zod'

export type OAuthRefreshOutcome = 'not_needed' | 'no_refresh_token' | 'known_dead_refresh_token' | 'account_on_hold' | 'not_refreshable' | 'refreshed' | 'lock_busy' | 'lock_timeout' | 'lock_error' | 'lock_compromised' | 'refresh_failed'
export type OAuthRefreshOptions = {retryCount?: number; force?: boolean; entryAccessToken?: string; credentials?: CredentialStore; storageV5?: unknown; usesLoginOffFirstParty?: boolean}
export type OAuthLockObservation = {contendedLock: 'current' | 'legacy'; lockAgeMs?: number; mtimeMs?: number}
export type OAuthExchangeOptions = {scopes?: string[];clientId?: string;signal?: AbortSignal;invalidScopeRetried?: boolean;storageV5?: unknown}
export type OAuthRefreshRuntime = {
  outcome(options?: OAuthRefreshOptions): Promise<OAuthRefreshOutcome>
  refresh(options?: OAuthRefreshOptions): Promise<boolean>
  direct(state: CredentialState, retries: number, waitedMs: number, observed: OAuthLockObservation | undefined, force: boolean, accessToken: string | undefined, credentials: CredentialStore | undefined, storageV5: unknown, optedIn?: boolean, takeoverUsed?: boolean): Promise<OAuthRefreshOutcome>
  holdTokens: Map<string,string>
  classify: {invalidGrant(error: unknown): boolean;onHold(error: unknown): boolean;invalidScope(error: unknown): boolean;expected(error: unknown, options: {isDefaultFirstPartyClient: boolean}): boolean}
  observeLock(error: unknown, directory: string): Promise<OAuthLockObservation>
  sameObservation(a: OAuthLockObservation,b: OAuthLockObservation): boolean
  lane(credentials?: CredentialStore,storageV5?: unknown): 'bare' | 'store' | 'backend'
}
export function createOAuthRefreshEngine(ports: {
  $k(state: CredentialState, credentials?: CredentialStore): Promise<void>
  Bn(): boolean
  D8n: OAuthPersistence['clearDead']
  F(): boolean
  Fa(credentials?: CredentialStore): Promise<OAuthTokens | null>
  G2t(data: unknown): {url: string} | null
  GG(): boolean
  I8n: OAuthPersistence['reconcile']
  Jde: CredentialStateCell
  Jhn: OAuthLeaseRuntime['options']
  KT(): void
  Kp: OAuthLeaseRuntime['takeover']
  N5r(scopes: string[]): string[]
  Pde(token: string, options: OAuthExchangeOptions): Promise<OAuthTokens>
  Tf(path: string): Promise<{mtimeMs: number}>
  Vd(error: unknown): OAuthErrorMetadata
  Wa: symbol
  Yk: OAuthLeaseRuntime['legacyPath']
  Z(ms: number): Promise<void>
  _<T>(value: T): T
  _ht: string
  _n(): void
  a: AuthEnvironment
  ae(): {mkdir(path: string): Promise<unknown>}
  bi: Set<string>
  c<T>(value: T): T
  cu(error: unknown): boolean
  d(error: unknown): void
  d0(): string | null | undefined
  f2o: OAuthLeaseRuntime['acquire']
  h1(scopes: string[] | undefined): boolean
  hEn(scopes: string[]): boolean
  hf(path: string): string
  ht: {isAxiosError(error: unknown): boolean}
  i(event: string, metadata: Record<string, unknown>): void
  it<T>(value: T, resetter: (value: T) => void): T
  j(): {host: object}
  l(error: unknown): string
  m(feature: string, error: string): void
  p(feature: string, error: string, metadata?: Record<string, unknown>): void
  r9(): boolean
  t(message: string, options?: {level: 'error'}): void
  zS(): string
  zn(): ModernSecureStorage
}): OAuthRefreshRuntime
export function createOAuthExpectedTransportError(): (error: unknown, predicate?: (error: unknown) => boolean) => boolean
export function createOAuthHoldResponse(ports: {
  J(text: string): unknown
  U(values: ['invalid_grant','access_denied']): ZodType
  cn(): {CLAUDE_AI_ORIGIN: string}
  f<T>(factory: () => T): () => T
  ie(): ZodString
  u(shape: Record<string,ZodType>): ZodType
  x(value: string): ZodType
}): {read(data: unknown): {url:string} | null;url(value: unknown): string;register(reader: ((name: string, defaultValue: boolean) => unknown) | null): ((name: string, defaultValue: boolean) => unknown) | null;defaultUrl: string}
export function createOAuthRefreshScopes(ports: {cn(): {PLUGINS_SCOPE_REGISTERED: boolean}}): {hasInference(scopes: unknown): boolean;refreshScopes(scopes: string[]): string[]}
export function createOAuthResetBinding(): <T>(value: T, resetter: (value: T) => void) => T
