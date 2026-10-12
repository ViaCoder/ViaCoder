import type { AsyncLocalStorage } from 'node:async_hooks'
import type { createHash } from 'node:crypto'
import type { SecureStorageData } from '../secureStorage/types.js'

export type StorageWriteResult = { success: boolean; warning?: string; transient?: boolean; keychainLocked?: boolean }
export type StorageReadOptions = { inaccessibleAs?: 'absent' | 'failure' | 'failureIfTransient'; unreadableFileAs?: 'failure' }
export type CredentialReadResult =
  | { state: 'present'; data: SecureStorageData }
  | { state: 'absent' | 'corrupt' | 'refused-symlink' | 'read-failed' }
export interface CredentialStore {
  fromStoreCopy?: boolean
  probeCredentials(): Promise<{ state: string; version?: unknown }>
  readCredentials(): Promise<CredentialReadResult>
  readCredentialsStrict(): Promise<CredentialReadResult>
  writeCredentials(data: SecureStorageData): Promise<{ state: 'written' | 'read-failed' | 'refused-symlink' }>
  deleteCredentials(): Promise<{ state: 'deleted' | 'read-failed' | 'refused-symlink' }>
  readHandoffCredential(path: string, options: {symlinkAtPath: 'follow' | 'refuse'}): Promise<{state: 'present';contents: string} | {state: 'absent'} | {state: 'read-failed';code?: string}>
  writeHandoffCredential(path: string, contents: string): Promise<{state: 'written'} | {state: 'read-failed';code?: string}>
  discardSpentCredentialFile(path: string): Promise<void>
}
export type StrictStorageRead = SecureStorageData | null | symbol
export interface AsyncSecureStorage {
  name: string
  osGuarded?: boolean
  read(context?: {fromStoreCopy?: boolean}): SecureStorageData | null
  readAsync(context?: CredentialStore): Promise<SecureStorageData | null>
  readAsyncStrict?(context?: CredentialStore, options?: StorageReadOptions): Promise<StrictStorageRead>
  invalidateCache?(): void
  mutate?(updater: (current: SecureStorageData) => SecureStorageData, context?: CredentialStore): Promise<StorageWriteResult>
  update(data: SecureStorageData, context?: CredentialStore): Promise<StorageWriteResult>
  delete(context?: CredentialStore): Promise<boolean>
}
export interface ModernSecureStorage extends AsyncSecureStorage {
  readAsyncStrict(context?: CredentialStore, options?: StorageReadOptions): Promise<StrictStorageRead>
  invalidateCache(): void
  mutate(updater: (current: SecureStorageData) => SecureStorageData, context?: CredentialStore): Promise<StorageWriteResult>
}
export type KeychainState = {
  cache: { data: SecureStorageData | null; cachedAt: number }
  generation: number
  readInFlight: Promise<SecureStorageData | null> | null
  lastReadFailure: number | null
  keychainHoldsItem: boolean
  lastKnown: unknown
  legacyApiKeyPrefetch: unknown
}
export type StorageState = {
  serviceSuffix: string
  home(): string
  serviceName(suffix?: string): string
  username(): string
  ttl: number
  state(): KeychainState
  failureTtl: number
  expire(): void
  invalidate(): void
  prime(stdout: string | null, generation: number, state?: KeychainState): void
  holdsItem(state: KeychainState, present: boolean, generation: number): void
}
export function createSecureStorageState(ports: {
  cn(): { OAUTH_FILE_SUFFIX: string }
  i: typeof createHash
  j(): { host: object }
  l(): { username: string }
  o(): string
  process: { env: NodeJS.ProcessEnv }
  u(...paths: string[]): string
  we(): string
}): StorageState
export type StorageFilesystem = {
  mkdir(path: string): Promise<unknown>
  readFile(path: string, options: { encoding: 'utf8' }): Promise<string>
  readFileSync(path: string, options: { encoding: 'utf8' }): string
  unlink(path: string): Promise<unknown>
}
export type StorageCore = {
  readFailed: symbol
  fallbackLegs: symbol
  mutate(storage: AsyncSecureStorage, updater: (current: SecureStorageData) => SecureStorageData, context?: CredentialStore): Promise<StorageWriteResult>
  withWriteLock<T>(operation: () => Promise<T>): Promise<T>
  alreadyLocked<T>(operation: () => Promise<T>): Promise<T>
  createFallback(primary: AsyncSecureStorage, secondary: AsyncSecureStorage): ModernSecureStorage
  plaintext: ModernSecureStorage
  copyState(): { copy?: { storagePath: string; text: string | null }; generation: number }
  clearCopy(): void
}
export function createSecureStorageCore(ports: {
  Dn(path: string, text: string, mode: number): Promise<unknown>
  F(): boolean
  J(text: string): SecureStorageData
  Qi(path: string, options: { realpath: false; retries: { retries: number; minTimeout: number; maxTimeout: number }; stale: number; onCompromised(error: unknown): void }): Promise<() => Promise<void>>
  S(data: SecureStorageData): string
  Z(...paths: string[]): string
  ae(): StorageFilesystem
  j(): { host: object }
  l(error: unknown): string
  m(event: string, reason: string): void
  ne(...paths: string[]): string
  p(event: string, reason: string): void
  re(path: string, mode: number): Promise<unknown>
  t(message: string, options?: { level: 'warn' }): void
  v(error: unknown): string | undefined
  y(event: string): void
  z: typeof AsyncLocalStorage
  zS(): string
}): StorageCore
export function createSecureKeychain(ports: {
  J(text: string): SecureStorageData
  Mue: string
  QN(suffix?: string): string
  Rht: number
  S(data: SecureStorageData): string
  Tbe(command: string, options: { timeout: number }): string | null
  Wa: symbol
  _m(command: string, args: string[], options: { input?: string; stdio: string[]; reject: false; timeout: number }): Promise<{ exitCode?: number; timedOut?: boolean }>
  d: StorageCore['mutate']
  ok(): string
  pP(): void
  qe(command: string, args: string[], options: { timeout: number; useCwd: false; preserveOutputOnError?: false }): Promise<{ stdout: string; code: number }>
  t(message: string, options?: { level: 'warn' }): void
  ujt: StorageState['holdsItem']
  vVr: number
  yG(): KeychainState
}): { storage: ModernSecureStorage; isLocked(): Promise<boolean> }
export type AtomicPublishOptions = {
  mode?: number
  createMode?: number
  exactMode?: number
  flush?: boolean
  followSymlinks?: boolean
  inPlaceOnTempCreateRefused?: boolean
  stagingDir?: string
  renameFn?: typeof import('node:fs/promises').rename
  beforePublish?: () => boolean
}
export function createSecureAtomicPublisher(ports: {
  Fe: typeof import('node:path').basename
  I: typeof import('node:fs/promises').lstat
  L: typeof import('node:fs/promises').open
  Pe: typeof import('node:fs/promises').stat
  Z(ms: number): Promise<void>
  a: typeof import('node:fs').constants
  be: typeof import('node:crypto').randomBytes
  ie: typeof import('node:fs/promises').rename
  oe: typeof import('node:fs/promises').writeFile
  process: Pick<NodeJS.Process, 'getuid'>
  v(error: unknown): string | undefined
  ve: typeof import('node:path').join
  x: typeof import('node:fs/promises').unlink
}): {
  write(path: string, text: string, mode?: number, renameFn?: AtomicPublishOptions['renameFn']): Promise<void>
  publish(path: string, text: string, options: AtomicPublishOptions): Promise<void>
}
