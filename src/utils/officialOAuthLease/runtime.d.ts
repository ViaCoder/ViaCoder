import type { LockOptions } from 'proper-lockfile'
import type { ZodNumber, ZodString, ZodType } from 'zod'
import type { Stats, Dirent } from 'node:fs'

export type OAuthLease = { isCompromised(): boolean; signal: AbortSignal; release(): Promise<void> }
export type OAuthTakeoverOutcome = 'disabled' | 'no_owner_record' | 'record_mismatch' | 'foreign_pid_space' | 'pid_view_untrusted' | 'holder_not_proven_gone' | 'legacy_lock_held' | 'lock_changed' | 'taken_over' | 'remove_failed' | 'probe_failed'
export type OAuthLockOwner = {pid: number; procStart?: string; pidDomain: string; pidSpace: string; lockBirthtimeMs: number; legacyLockBirthtimeMs?: number}
export type OAuthLeaseRuntime = {
  acquire(directory: string): Promise<OAuthLease>
  options(directory: string, onCompromised?: (error: Error) => void): LockOptions & {lockfilePath: string}
  legacyPath(directory: string): Promise<string>
  takeover(options: {claudeDir: string; lockfilePath: string; legacyLockfilePath: string; watchedMtimeMs: number}): Promise<OAuthTakeoverOutcome>
  record(directory: string): Promise<OAuthLockOwner | null>
  held: {of(host: object): {held: number; released: {resolve(): void} | null}}
  featureReader: {reader: ((name: string, defaultValue: boolean) => unknown) | null; register(reader: (name: string, defaultValue: boolean) => unknown): unknown}
}
export function createOAuthRefreshLease(ports: {
  C(): ZodNumber
  Dn(path: string, text: string): Promise<void>
  Dt(error: unknown): boolean
  EC(...paths: string[]): string
  F(path: string): Promise<Stats>
  Gxe(): string
  J(text: string): unknown
  Qi(path: string, options: LockOptions): Promise<() => Promise<void>>
  Rf(...paths: string[]): string
  S(value: unknown): string
  SC(path: string): Promise<void>
  Tb(): Promise<string | undefined>
  U(path: string, encoding: 'utf8'): Promise<string>
  Xm(pid: number): boolean
  d(error: unknown): void
  f<T>(factory: () => T): () => T
  gr(path: string): Promise<Stats>
  i(event: string, metadata: Record<string, never>): void
  l(error: unknown): string
  mht(): Promise<boolean>
  o(): ZodString
  pC(path: string): Promise<void>
  pH(path: string): Promise<string>
  process: Pick<NodeJS.Process, 'pid'>
  qUe(pid: number): Promise<boolean>
  rk(): Promise<string>
  t(message: string, options?: {level: 'error'}): void
  u(shape: Record<string, ZodType>): ZodType
  v(error: unknown): string | undefined
  vs<T>(cell: {of(host: object): T}): T
  wE(pid: number, start: string): Promise<boolean | undefined>
  zxe(pid: number): boolean
}): OAuthLeaseRuntime
export type OAuthProcessRuntime = {
  ownStart(): Promise<string | undefined>
  start(pid: number, options?: {skipCache?: boolean; env?: NodeJS.ProcessEnv}): Promise<string | undefined>
  validPid(pid: number): boolean
  gone(pid: number): boolean
  zombie(pid: number): Promise<boolean>
  trustedPidView(): Promise<boolean>
  sameStart(pid: number, start: string): Promise<boolean | undefined>
}
export function createOAuthProcessProbes(ports: {
  H2e(state: string | undefined): boolean
  O(): 'macos' | 'linux' | 'windows' | 'wsl' | string
  O6t(text: string): string | undefined
  Ze(file: string, args: string[], options: {timeout: number; env?: NodeJS.ProcessEnv; extendEnv?: boolean}): Promise<{code: number; stdout: string}>
  ae(): {readFile(path: string, options: {encoding: 'utf8'}): Promise<string>; readlink(path: string): Promise<string>; readdir(path: string): Promise<Dirent[]>}
  j(): {host: object}
  process: Pick<NodeJS.Process, 'pid' | 'kill' | 'env'>
  v(error: unknown): string | undefined
  yIe(file: string, path: string): string | null
}): OAuthProcessRuntime
export function createProcessStatusParser(): {state(text: string): string | undefined; isZombie(state: string | undefined): boolean}
export function createOAuthPidIdentity(ports: {
  O(): string
  i(): string
  o(): string
  r(path: string, encoding: 'utf8'): Promise<string>
  s(path: string): Promise<string>
}): {domain(): Promise<string>; space(): string}
export function createOAuthExecutableLookup(ports: {
  Et(path: string): boolean
  K: string
}): (file: string, path: string) => string | null
export function createOAuthLeaseErrorFilter(): (error: unknown) => boolean

export function createOAuthSchemaLazy(): {lazy<T>(factory: () => T): () => T; manager: {builtCount(): number; releaseBuiltSince(count: number): void; reset(): void}}

export function createOAuthReleaseHandler(ports: {
  i(event: string, metadata: Record<string, never>): void
  t(message: string, options: {level: 'error'}): void
}): (lease: OAuthLease) => Promise<void>
