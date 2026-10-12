/** Complete original state; only unrelated backend payload types stay opaque. */
export type ModsProviderTier287 = 'core' | 'builtin' | 'prepend' | 'append' | 'user'
export interface ModsRegistry287<M = unknown> {
  pluginLoad: unknown
  pluginLoadArm: unknown
  pluginLoadCacheOnly: unknown
  pluginLoadCacheOnlyArm: unknown
  commands: unknown
  skills: unknown
  skillsV5: unknown
  agents: unknown
  handedIn: unknown
  outputStyles: unknown
  workflows: unknown
  hookRegistration: unknown
  hookModulesAwaitTrust: boolean
  hookRegistrationInFlight: unknown
  hooksUnknownCause: unknown
  pluginsWithHooks: Set<string>
  hookRegistrationEpoch: number
  hookSwapEpoch: number
  unlatchedAbsentManagedIds: Set<string>
  hookRegistrationArgs: unknown
  hookHotReloadUnsubscribe: unknown
  hookHotReloadSettingsSnapshot: unknown
  hookHotReloadTierSnapshot: unknown
  loadedModules: M[]
  moduleSeats: Map<string, ModsProviderTier287>
  notices: unknown
  openCalls: Map<unknown, unknown>
  spawnProvenance: Map<unknown, unknown>
  registeredAgents: Map<unknown, unknown>
  renderVersions: unknown
  panes: unknown
  pluginState: unknown
  toastClock: unknown
  hoverGroups: unknown
  scrollSites: Map<unknown, unknown>
  focusSites: Map<unknown, unknown>
  focusSiteDraws: unknown
  mountedRasters: Map<unknown, unknown>
  mountedImages: Map<unknown, unknown>
  rasterAdmission: unknown
  uiLogSink: unknown
  pendingUiLog: unknown[]
  armedMonitorKeys: Set<string>
  marketplaces: Map<unknown, unknown>
  marketplaceRefreshesInFlight: Map<unknown, unknown>
  marketplaceHelperMemo: Map<unknown, unknown>
  addDirMarketplacesMemo: unknown
  headlessInstallPass: unknown
  installedPluginsMigrated: boolean
  installedPluginsFile: unknown
  installedPluginsEpoch: number
  installedPluginsSnapshot: unknown
  optionValues: Map<unknown, unknown>
  flaggedPlugins: unknown
  orphanedVersionGlobExclusions: unknown
  recentActivity: unknown[]
  pluginActivityFeatures: Map<unknown, unknown>
  autoUpdateListener: unknown
  commandSourceReresolve: unknown
  pendingAutoUpdateNotification: unknown
  ownInUseMarkerPaths: Set<string>
  ownInUseMarkerHandles: Map<unknown, unknown>
  commandProducerDirsDenied: Set<string>
  commandProducerDirsScannedAt: number
  commandProducerDirsComparable: unknown
  commandProducerDirsNeedCanonicalCandidate: boolean
  commandProducerDirsWslProviderUndeterminable: boolean
  commandProducerDirsChanged: unknown
  inUseMarkerCleanup: unknown
  vouchedManagedPluginIds: Set<string>
  hintedPluginIds: Set<string>
  seenHintPluginIds: Set<string>
  gitAvailable: unknown
  operatorDeclaredMemo: unknown
  marketplaceResolutionNoticesLogged: Set<string>
  marketplaceAdmissionVerdicts: Map<unknown, unknown>
  hiddenRegistryEntries: unknown
  releasedRegistryEntries: unknown
  cacheRootComparableMemo: unknown
  provenLocalRoots: Map<unknown, unknown>
  wslProviderOfPluginsRootMemo: unknown
  inlinePluginRootsComparableMemo: unknown
}
export interface ModsRegistryScope287<M = unknown> {registry: ModsRegistry287<M>}
export interface ModsRegistrySlotOwner287<M = unknown> {
 of(host: object): ModsRegistryScope287<M>
}
/** EXACT chunk-75fy7kb3.js:a boundary for both consumers. */
export type ModsRegistryOwnerReader287<M = unknown> = () => ModsRegistryScope287<M>
export interface ModsRegistryExecutionContext287 {host: object; root: object}
export interface ModsRegistryOwnerPorts287 {
 /** Original chunk-bn3p37gv.js:n; bind genuine current execution session/ALS. */
 executionContext(): ModsRegistryExecutionContext287
}
export interface ModsRegistryOwner287<M = unknown> {
 owner: ModsRegistryOwnerReader287<M>
 registry(): ModsRegistry287<M>
 registryOwner: ModsRegistrySlotOwner287<M>
 RegistryState: new () => ModsRegistryScope287<M>
 RegistryOwner: new (factory: () => ModsRegistryScope287<M>) => ModsRegistrySlotOwner287<M>
 /** Raw s() initializer, NOT an alternative shared owner/read path. */
 createRegistry(): ModsRegistry287<M>
}
export function createModsRegistryOwner287<M = unknown>(ports: ModsRegistryOwnerPorts287): ModsRegistryOwner287<M>
