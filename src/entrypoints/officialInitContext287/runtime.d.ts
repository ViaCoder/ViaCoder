import type { constants } from 'node:fs'
import type * as fs from 'node:fs/promises'
import type * as path from 'node:path'
import type { CredentialStore } from '../../utils/officialSecureStorage/runtime.js'
import type { AtomicPublishOptions } from '../../utils/officialSecureStorage/runtime.js'
import type { StorageV5Backend, StorageV5EnvPin, StorageV5PinDecision } from '../../utils/secureStorage/storageV5.js'
export type InitContextOptions287 = { storageV5EnvPin?: StorageV5EnvPin }
export type InitAdoptedContext287 = { storageV5?: StorageV5Backend; credentials?: CredentialStore }
export function createOfficialInitStorageContext287(ports: {
 F(): boolean
 U7o(value: unknown): StorageV5PinDecision
 t(message: string, metadata: {level: 'warn'}): void
 we(): string
 a: {readonly CLAUDE_CODE_HOVER_REST: boolean | undefined}
 k(name: string, fallback: boolean): unknown
 tResolve: typeof path.resolve
}): {
 prepare(options?: InitContextOptions287): StorageV5EnvPin | undefined
 adopt(pin?: StorageV5EnvPin): StorageV5Backend | undefined
 fromEnv(factory?: () => StorageV5Backend | undefined): StorageV5EnvPin | undefined
}
export function createOfficialInitCredentials287(ports: {
 E(error: unknown): string | undefined
 F(): boolean
 _(value: unknown): string
 ae(): {mkdir(path: string): Promise<unknown>; unlink(path: string): Promise<unknown>}
 Kse(path: string, text: string, options: AtomicPublishOptions): Promise<void>
 yb(): string
 s: typeof constants
 b: typeof fs.lstat
 h: typeof fs.mkdir
 p: typeof fs.open
 H: typeof path.basename
 L: typeof path.dirname
 D: typeof path.isAbsolute
 B: typeof path.join
}): (backend?: StorageV5Backend, directStore?: CredentialStore) => CredentialStore | undefined
export function createOfficialInitCallerContext287(ports: {
 jD(pin?: StorageV5EnvPin): StorageV5Backend | undefined
 bx(backend?: StorageV5Backend): CredentialStore | undefined
 pqr(credentials?: CredentialStore, storageV5?: unknown): Promise<boolean>
 d(error: unknown): void
}): {
 adopt(pin?: StorageV5EnvPin): InitAdoptedContext287
 populate(context: InitAdoptedContext287): Promise<boolean | void>
}
