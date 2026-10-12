export interface ConsentIdentity287 { organizationUuid: string; accountUuid: string }
export interface ConsentRecord287 { accountUuid: string; dangerousSettingsHash: string; updatedAt: number }
export interface ConsentReadResult287 { records: Map<string, ConsentRecord287>; newerVersion: boolean; unreadable: boolean }
export interface PrimerStateKey287 {namespace:'state';id:string}
export interface PrimerReadResult287 { ok: boolean; value?: { items: Array<{ found: boolean; totalBytes: number; value: string }> }; error?: unknown }
export interface PrimerWriteResult287 { ok: boolean; error?: unknown }
export interface HostConsentFilesystem287 {
  lstat(path: string): Promise<{ isFile: boolean } | undefined>
  readTail(path: string, length: number, options: { noFollow: true }): Promise<Buffer>
  atomicWrite(path: string, contents: string, mode: number): Promise<void>
}
export interface ConsentRecordsPorts287 {
  primerEnabled(): boolean
  logging(message: string): void
  hostFilesystem(): HostConsentFilesystem287
  builtins: Record<string, Record<string, unknown>>
}
export interface ConsentStorageV5287 {
  readText?(requests: Array<{key: PrimerStateKey287; offset: number; length: number}>): Promise<PrimerReadResult287>
  write?(key: PrimerStateKey287, value: string, options: { mode: number }): Promise<PrimerWriteResult287>
}
export interface OfficialConsentRecords287 {
  read(primer?: ConsentStorageV5287): Promise<ConsentReadResult287>
  getHash(identity: ConsentIdentity287, primer?: ConsentStorageV5287): Promise<string | null>
  record(identity: ConsentIdentity287, settings: Record<string, unknown>, primer?: ConsentStorageV5287): Promise<void>
}
export function createOfficialConsentRecords287(ports: ConsentRecordsPorts287): OfficialConsentRecords287
