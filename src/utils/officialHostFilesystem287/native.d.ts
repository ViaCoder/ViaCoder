export interface OfficialHostFileStat287 {
  isSymbolicLink: boolean
  isFile: boolean
  isDirectory: boolean
  mtimeMs: number
  nlink: number
}

export interface OfficialHostDirectoryEntry287 {
  name: string
  isDirectory: boolean
  isFile: boolean
}

export interface OfficialHostFilesystem287 {
  read(path: string): Promise<string>
  readBytes(path: string): Promise<Buffer>
  write(path: string, contents: string, mode?: number): Promise<void>
  mkdir(path: string, mode?: number): Promise<void>
  atomicWrite(path: string, contents: string, mode?: number): Promise<void>
  delete(path: string): Promise<void>
  list(path: string): Promise<string[]>
  append(path: string, contents: string, mode?: number): Promise<void>
  writeExclusive(path: string, contents: string, mode?: number): Promise<void>
  writeBytesExclusive(path: string, contents: Uint8Array, mode?: number): Promise<void>
  copy(source: string, target: string): Promise<void>
  stat(path: string): Promise<{ mtimeMs: number }>
  lstat(path: string): Promise<OfficialHostFileStat287 | undefined>
  listEntries(path: string): Promise<OfficialHostDirectoryEntry287[]>
  readRange(path: string, offset: number, length: number): Promise<Buffer>
  readTail(path: string, maxBytes: number, options?: { noFollow?: boolean }): Promise<Buffer>
}

export declare class ior implements OfficialHostFilesystem287 {
  read(path: string): Promise<string>
  readBytes(path: string): Promise<Buffer>
  write(path: string, contents: string, mode?: number): Promise<void>
  mkdir(path: string, mode?: number): Promise<void>
  atomicWrite(path: string, contents: string, mode?: number): Promise<void>
  delete(path: string): Promise<void>
  list(path: string): Promise<string[]>
  append(path: string, contents: string, mode?: number): Promise<void>
  writeExclusive(path: string, contents: string, mode?: number): Promise<void>
  writeBytesExclusive(path: string, contents: Uint8Array, mode?: number): Promise<void>
  copy(source: string, target: string): Promise<void>
  stat(path: string): Promise<{ mtimeMs: number }>
  lstat(path: string): Promise<OfficialHostFileStat287 | undefined>
  listEntries(path: string): Promise<OfficialHostDirectoryEntry287[]>
  readRange(path: string, offset: number, length: number): Promise<Buffer>
  readTail(path: string, maxBytes: number, options?: { noFollow?: boolean }): Promise<Buffer>
}
export declare function Bt(): OfficialHostFilesystem287
export declare function withHostFilesystem287<T>(filesystem: OfficialHostFilesystem287, callback: () => T): T
