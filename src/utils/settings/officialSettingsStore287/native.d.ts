import type {Signal} from '../../signal.js'
export type NativeParsedSettings287 = {
  settings: Record<string, unknown> | null
  errors: unknown[]
  unfiltered?: Record<string, unknown> | null
  legacy?: Record<string, unknown> | null
  [key: string]: unknown
}
export interface SettingsStore287 {
  enabledSources?:{allowed:readonly string[];result:import('../constants.js').SettingSource[]}
  mergedSettings: unknown | null
  perSource: Map<string, unknown>
  parsedFiles: Map<string, NativeParsedSettings287>
  folderListings: Map<string, string[]>
  managedFileReads: Map<string, unknown>
  primedFiles: Set<string>
  internalWrites: Map<string,number>
  backgroundWorkTail:Promise<void>
  policy: Record<string, unknown>
  epoch: number
  pluginBase: Record<string, unknown> | undefined
  pluginBaseLoaded: boolean
  primer: unknown
  changed: Signal<[string]>
  invalidated: Signal
  repoTierFreeze: {
    tier(source: string): {settings: Record<string, unknown> | null} | undefined
    isHeld(): boolean
    engage(read: () => Map<string, NativeParsedSettings287>, key?: string): {changedSinceLast: boolean; release(): {last: boolean}; abandon(): void}
    whileLive<T>(read: () => T): T
    baselineTier(source: string): NativeParsedSettings287 | undefined
    differingTiers(read: Map<string, NativeParsedSettings287>): string[]
    rebaseline(read: Map<string, NativeParsedSettings287>, sources: string[]): void
  }
  setPluginBase(settings: Record<string, unknown> | undefined): void
  clearPluginBase(): void
  invalidateAll(options?: {userLayer?: 'retain'}): void
  invalidatePolicyLayer(): void
  onInvalidate(listener: () => void): () => void
  seedParsedFile(path: string, source: string, read: NativeParsedSettings287, epoch: number): boolean
  walkReadDiffers(path: string, read: NativeParsedSettings287): boolean
  unseedParsedFile(path: string, source: string, epoch: number): void
  dropDerivedCaches(source: string): void
  primedFolderListing(folder: string): string[] | undefined
  folderListingForPolicyWalk(folder: string): string[] | undefined
  noteWalkListing(folder: string, names: string[]): void
  readonly policyWalkCount: number
  policyInstallVerdict(path: string, read: NativeParsedSettings287, walks: number): 'install' | 'raced' | 'deferred'
  folderInstallVerdict(folder: string, names: string[], walks: number): 'install' | 'raced' | 'deferred'
  seedFolderListing(folder: string, names: string[], epoch: number): boolean
  walkReadManagedFileIn(file: string, folder: string): boolean
  walkRead(path: string): boolean
  hasParsedDropInOutside(folder: string, names: string[]): boolean
  clearFolderListing(folder: string, epoch: number): void
  retainLayer(path: string, read: NativeParsedSettings287): () => void
  dropRetainedLayer(path: string): void
  retainFolderListing(folder: string, names: string[]): () => void
}
export function createSettingsStore287(ports: {
  s: typeof import('node:async_hooks') | undefined
  Or(a: unknown, b: unknown): boolean
  Dt(path: string): string
  Wr(path: string): string
}): {SnapshotStore:new()=>SettingsStore287;HostRegistry:new<T>(make:()=>T)=>{of(host:object):T};normalizeTier(tier:NativeParsedSettings287):NativeParsedSettings287;store(host: object): SettingsStore287; pinPrimer(enabled: boolean): 'pinned' | 'unchanged' | 'conflict'; primerEnabled(): boolean}
