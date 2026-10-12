export type OfficialModelPicker287Ports = {
  vwe(): {latest_per_family: Record<string, string>}
  hse: readonly string[]
  xa(id: string): {display_name: string; provider_ids: {first_party: string}} | undefined
  OU: Record<string, string | undefined>
  xm(): string
  Bu(): string
  Sj(): string
  eIe(): string
  Be(model: string, options?: {identity?: boolean}): string
  od(): boolean
  RS(): Record<string, string>
  Sr(model: string, fastMode?: boolean): string
  Eq(): boolean
  t_e(): boolean
  ft(): boolean
  Wp(model: string): string | undefined
  Ct(model: string): string
}
export type OfficialFamilyOption287 = {value: string; label: string; description: string; descriptionForModel: string}
export function createModelPicker287(ports: OfficialModelPicker287Ports): {
  latest(family: string): {id: string; displayName: string; key: string}
  aliasModel(family: string): string
  isLatest(family: string): boolean
  familyOption(family: 'sonnet' | 'opus' | 'fable', fastMode?: boolean): OfficialFamilyOption287
  fableOption(model: string, fastMode?: boolean): OfficialFamilyOption287
  customFableOption(model: string): OfficialFamilyOption287
  opusOneMillionOption(fastMode?: boolean, includePricing?: boolean): OfficialFamilyOption287
  opusAliasOneMillionOption(fastMode?: boolean): OfficialFamilyOption287
}
export type OriginalE8ModelOption287 = {
  value: string | null
  label: string
  description: string
  descriptionForModel?: string
  [key: string]: unknown
}
/** Imported symbols are bound by the app adapter to existing catalog,
 * subscription, entitlement, settings, provider, and model-string owners. */
export declare function createOfficialE8Chooser287<P extends Record<string, unknown>>(
  ports: P,
): (fastMode?: boolean) => OriginalE8ModelOption287[]

export type ModelMenuDiagnostics287 = {
  duplicates: number
  dropped: number
  dropReasons: Set<string>
  disabledReasons: Set<string>
  curatedRows: number
  curatedReplaced: boolean
}
export declare function createOfficialModelMenu287(ports: Record<string, unknown>):
  (fastMode?: boolean, diagnostics?: ModelMenuDiagnostics287 | null) => OriginalE8ModelOption287[]
export type ProviderCache287 = {
  validatedModels: Set<string>
  confirmedEntitlementDenies: Map<string, number>
  overturnedEntitlementDenies: Map<string, number>
  bedrockInferenceProfiles?: unknown
  inferenceProfileBackingModels: Map<string, unknown>
  modelConfigs: Map<string, unknown>
  capabilityOverrides: Map<string, unknown>
  probeResults: Map<string, unknown>
  preconnectFired: boolean
}
export type SessionModelDenyReprobe287 = {
  reprobe?: (model: string) => Promise<ModelReprobeOutcome287>
  honoredModels: Set<string>
  contestedDenies: Map<string, number>
  refusedModels: Set<string>
  generation: number
  restricted: ModelRestrictionSignal287
}
export declare function createModelMenuPolicy287(ports: Record<string, unknown>): Record<string, unknown> & {
  $r(model: string, options?: Record<string, unknown>): boolean
  Py(): string
  El(): string
  AQn(fastMode?: boolean): string
  j3(): {setting: string; attribution: string}
  Kqr(): boolean
  qqr(model: string): string | null
  Qs(model: string): string | null
  vt(): Record<string, string>
  pb(model: string): string
  Ape(): {apiName: string; entitled: boolean}[]
  XPe(model: string): string
  Nbn(entry: {apiName: string; entitled: boolean}, model: string): boolean
  gWt(model: string): boolean
  gU(): Set<string>
  mU(model: string, denies: Set<string>): boolean
  fQn(family: string): string | null
  _pe(): {picker: import('../officialModelBehavior287/native.js').ModelPicker287; source: string} | undefined
  qbn(source: string): string | undefined
  Kb(model: string): boolean
  Poe(model: string): boolean
  bj(): boolean
  ype(model: string): boolean
  JBe(): OriginalE8ModelOption287[]
  mQn(): boolean
  jo(): {state:string;[field:string]:unknown}
  sqr(): ProviderCache287
}
export declare function createModelMenuLexical287(ports: Record<string, unknown>): Record<string, unknown> & {
  Ct(model: string): string
  Fn(model: string): string
}
export declare function createModelMenuSanitizers287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuDenied287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuTextPrimitives287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuRegions287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuStateFields287(ports: {sqr(): ProviderCache287; Me(): ModelRestrictionSignal287}): {
  providerCache: ProviderCache287
  sessionModelDenyReprobe: SessionModelDenyReprobe287
  gatewayModelsByCachePath: Map<string, unknown>
  gatewayModelsStorageV5?: unknown
  warnedEnforcementMessages: Set<string>
}

export declare function createModelMenuCatalogAliases287(ports: Record<string, unknown>): {Cje(family: string, provider: string): string | undefined}
export declare function createModelMenuPolicyErrors287(ports: Record<string, unknown>): {i0e<T extends {severity?: string}>(errors: T[]): T[]; jtr(error: {errorClass?: string; errno?: string}): boolean}

export type ModelReprobeOutcome287 = 'probe_failed' | 'overturned' | 'denied_by_server' | 'denied_by_policy'
export type ModelRestrictionSignal287 = {subscribe(listener: (text: string) => void): () => void; emit(text: string): void; clear(): void}
export declare function createModelMenuSignal287(ports: {wKt<T extends (...args: never[]) => unknown>(callback: T): T}): {Me(): ModelRestrictionSignal287}
export type ModelRestrictionNotice287 = {type: 'system'; subtype: 'notification'; key: string; text: string; priority: 'high'; color: 'warning'}
export declare function createModelMenuReprobe287(ports: Record<string, unknown>): {
  jVo(probe: (model: string) => Promise<ModelReprobeOutcome287>): void
  by(input: {model: string; rowDenyKeys: string[]; describeFallbackModel(): string}): boolean
  pQn(model: string): boolean
  uQn(model: string): void
  WVo(): void
  GVo(listener: (text: string) => void): () => void
}

export type ModelCatalogActive287 = {catalog: import('../servedCatalog.js').ServedCatalog | null;
  source: 'served' | 'published' | 'fallback'; fetchedAt?: number; stale: boolean; fallbackReason?: string; organizationUuid?: string}
export type ModelCatalogOwnerFields287 = {servedCatalogActive?: ModelCatalogActive287;
  servedCatalogDeactivatedRows?: import('../servedCatalog.js').ServedCatalog; familySpellingVerdicts: Map<string, unknown>;
  servedCatalogMaskedIds: Set<string>; servedCatalogMasksEveryId: boolean; servedCatalogPublicIds: Map<string, string>;
  servedCatalogSuppressDepth: number}
export declare function createModelMenuCatalogStateFields287(): ModelCatalogOwnerFields287
export declare function createModelMenuCatalogLifecycle287(ports: Record<string, unknown>): {
  bF(): import('../servedCatalog.js').ServedCatalog | null
  c8(): boolean
  ppe(): ModelCatalogActive287['source'] | undefined
  Vs(): import('../servedCatalog.js').ServedCatalog | null
  wd(active: ModelCatalogActive287): void
  aQn(catalog: import('../servedCatalog.js').ServedCatalog | null, fetchedAt: number, stale?: boolean): void
  FVo(): void
}

export type ModelValidationResult287 = {valid: boolean; error?: string; notAllowed?: boolean; notFound?: boolean; permissionDenied?: boolean; authFailed?: boolean; retryable?: boolean; creditsRequired?: boolean}
export type ModelValidationOptions287 = {skipEntitlementDenyOverlay?: boolean; forceServerProbe?: boolean; serverProbe?: boolean; credentials?: unknown; timeout?: number; signal?: AbortSignal}
export declare function createModelMenuValidation287(ports: Record<string, unknown>): {
  ONn(model: string, options: ModelValidationOptions287): Promise<ModelValidationResult287>
  pEr(model: string, options: ModelValidationOptions287, deadline?: number): Promise<ModelValidationResult287>
  Jae(model: string, storage?: unknown, credentials?: unknown): Promise<ModelReprobeOutcome287>
}
export declare function createModelMenuValidationText287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuValidationTimer287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuValidationHosts287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuValidationErrors287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuValidationFallback287(ports: Record<string, unknown>): Record<string, unknown>
export declare function createModelMenuValidationGate287(ports: Record<string, unknown>): {hMr(model: string): boolean}
