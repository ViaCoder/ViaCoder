import type * as nodeFs from 'node:fs'
import type * as nodeFsPromises from 'node:fs/promises'
import type * as nodePath from 'node:path'
import type * as nodeOs from 'node:os'
import type { PermissionPathAncestry287 } from '../officialFilesystemPaths287/native.js'
import type { AtomicWriter287 } from '../officialAtomicWriter287/native.js'

export type BoundFileIoPlatform287 = 'darwin-arm64' | 'darwin-x64' | 'linux-arm64' | 'linux-x64' | 'win32-arm64' | 'win32-x64'
export interface BoundFileText287 { content: string; encoding: BufferEncoding; lineEndings: 'LF' | 'CRLF' }
export interface BoundFilePin287 {
  ioPath: string
  canonicalPath: string
  readExisting(maxBytes?: number): Promise<BoundFileText287 | null>
  recheckBeforeWrite(): void | Promise<void>
  close(): Promise<void>
}
export interface BoundFileRead287 {
  ioPath: string
  canonicalPath: string
  handle: nodeFsPromises.FileHandle
  close(): Promise<void>
}
export interface BoundFileIdentity287 { dev: bigint; ino: bigint }
export interface BoundFileFs287 {
  cwd(): string
  existsSync(path: string): boolean
  stat(path: string): Promise<nodeFs.Stats>
  lstat(path: string): Promise<nodeFs.Stats>
  statBigint(path: string): Promise<nodeFs.BigIntStats>
  lstatBigint(path: string): Promise<nodeFs.BigIntStats>
  openDirNoFollow(path: string): Promise<void>
  openDirNoFollowSync(path: string): void
  readdir(path: string): Promise<nodeFs.Dirent[]>
  unlink(path: string): Promise<void>
  rmdir(path: string): Promise<void>
  rm(path: string, options?: nodeFs.RmOptions): Promise<void>
  mkdir(path: string, options?: nodeFs.MakeDirectoryOptions): Promise<void>
  readFile(path: string, options: { encoding: BufferEncoding }): Promise<string>
  rename(source: string, target: string): Promise<void>
  realpath(path: string): Promise<string>
  readlink(path: string): Promise<string>
  copyFile(source: string, target: string): Promise<void>
  appendFile(path: string, content: string, options?: { mode?: number }): Promise<void>
  symlink(target: string, path: string, type?: nodeFs.symlink.Type): Promise<void>
  link(source: string, target: string): Promise<void>
  chmod(path: string, mode: nodeFs.Mode): Promise<void>
  statSync(path: string): nodeFs.Stats
  lstatSync(path: string): nodeFs.Stats
  readFileSync(path: string, options: { encoding: BufferEncoding }): string
  readSync(path: string, options: { length: number }): { buffer: Buffer; bytesRead: number }
  appendFileSync(path: string, content: string, options?: { mode?: number }): void
  unlinkSync(path: string): void
  renameSync(source: string, target: string): void
  readlinkSync(path: string): string
  realpathSync(path: string): string
  mkdirSync(path: string, options?: { mode?: number }): void
  readdirSync(path: string): nodeFs.Dirent[]
  rmSync(path: string, options?: nodeFs.RmOptions): void
  createWriteStream(path: string): nodeFs.WriteStream
  readFileBytes(path: string, maxBytes?: number): Promise<Buffer>
  readFileFdGated(path: string, maxBytes: number): Promise<{ content: string; stats: nodeFs.Stats } | null>
}
/** Actual ae callbacks consumed by the existing original atomic writer.
 * Its direct open/lstat/readlink primitives remain owned by that factory.
 * The older atomic declaration uses the broader local FsOperations type,
 * including local extensions which original sy deliberately does not invent.
 */
export type BoundFileAtomicFs287 = Pick<BoundFileFs287, 'stat' | 'rename' | 'unlink'>
export interface BoundFileAtomicPorts287 {
  ae(): BoundFileAtomicFs287
  t(message: string, options?: { level?: 'verbose' | 'debug' | 'info' | 'warn' | 'error' }): void
  j(): {
    record(path: string, dev: number, ino: number, fd: number): void
    identity(path: string): { dev: number; ino: number; fd: number } | undefined
    reset(): void
  }
  m(feature: string, reason: string): void
}
export interface BoundFileIoPorts287 {
  platform: BoundFileIoPlatform287
  fs: typeof nodeFs
  fsPromises: typeof nodeFsPromises
  path: typeof nodePath
  os: Pick<typeof nodeOs, 'homedir'>
  /** The actual platform reader; WSL must remain WSL rather than a false flag. */
  getPlatform(): 'macos' | 'linux' | 'wsl' | 'windows'
  debug(message: string, options?: { level?: 'verbose' | 'debug' | 'info' | 'warn' | 'error' }): void
  /** Real tagged profiling scope, disposed by the original synchronous fs bodies. */
  profileFs(strings: TemplateStringsArray, ...values: (string | number)[]): Disposable
}
export interface BoundFileIo287 {
  pinWrite(path: string, approved: string[], options?: { createParents?: boolean; leaf?: 'replace' }): Promise<BoundFilePin287>
  openRead(path: string, approved: string[], signal?: AbortSignal, identity?: BoundFileIdentity287 | null): Promise<BoundFileRead287>
  resolveApprovedSpellings(path: string): string[]
  takeApprovedSpellings(path: string): string[]
  resolveApproval(path: string): PermissionPathAncestry287
  captureApprovedIdentity(approved: string[]): Promise<BoundFileIdentity287 | null>
  readTextFromHandle(handle: nodeFsPromises.FileHandle, displayPath: string, maxBytes?: number): Promise<BoundFileText287>
  readText(path: string, maxBytes?: number): Promise<BoundFileText287>
  stat(path: string): Promise<nodeFs.Stats>
  mtime(path: string): Promise<number>
  fs: BoundFileFs287
}
export declare function createBoundFileIo287(ports: BoundFileIoPorts287): BoundFileIo287
/** Type-only narrow ae adaptation; delegates the existing platform factory unchanged. */
export declare function createBoundAtomicWriter287(platform: BoundFileIoPlatform287, ports: BoundFileAtomicPorts287): AtomicWriter287
