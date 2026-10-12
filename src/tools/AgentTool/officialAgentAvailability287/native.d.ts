import type {ModsRegistryOwnerReader287} from '../../../utils/plugins/officialModsRegistryOwner287/native.js'
import type {TypedEnvironment287} from '../../../utils/officialTypedEnvironment287/native.js'
export type ProviderTier287 = 'core' | 'builtin' | 'prepend' | 'append' | 'user'
export interface Provider287 {readonly plugin: string; readonly tier: ProviderTier287}
export interface OfferInput287 {agent: string; description: string; source: string; provider: Provider287}
export interface OfferResult287 {isOffered: boolean}
export type HookRecord287 = Record<string, unknown>
export type SettingSource287 = 'userSettings' | 'projectSettings' | 'localSettings' | 'flagSettings' | 'policySettings'
export interface PluginSettings287 {
 enabledPlugins?: Record<string, boolean>
 prependPlugins?: string[]
 appendPlugins?: string[]
}
export interface PermissionContext287 {
 alwaysDenyRules: Partial<Record<SettingSource287 | 'cliArg' | 'command' | 'session' | 'toolsNarrowing' | 'mcpServerPolicy' | 'hostCredential', readonly string[]>>
 toolAliases?: Record<string, readonly string[]>
}
export interface AvailabilityContext287 {agentId?: string; forRemoteExecution?: boolean; hookCaller?: HookOrigin287}
export type HookOrigin287 = readonly (string | {plugin: string; registration: number})[]
export interface AgentDefinition287 {
 agentType: string; source: string; plugin?: string; tools?: readonly string[]; whenToUse?: string; whenToUseLean?: string; disallowedTools?: readonly string[]; requiredMcpServers?: readonly string[]
 isEnabled?: (context: AvailabilityContext287 | undefined) => unknown
}
export interface HookTraceEntry287 {
 index: number; plugin: string; tier: ProviderTier287; event: string
 outcome: string; ms: number; received: unknown; returned?: unknown; reason?: string
}
export interface HookDiagnostics287 {
 log(message: string, level?: string): void
 hookFailed(event: {plugin: string; environmentId?: number; event: string; reason: string; effect: string; hasOverrun: boolean}): void
}
export interface HookBudgetReading287 {readonly ms: number; readonly remainingMs: number}
export interface HookHandle287 {
 (input?: OfferInput287, signal?: AbortSignal): Promise<OfferResult287>
 signal: AbortSignal; origin: Provider287; event: string
 readonly trace: readonly HookTraceEntry287[]
 readonly budget: HookBudgetReading287
 is(value: unknown): boolean
 to(input: OfferInput287, ...tiers: ProviderTier287[]): Promise<OfferResult287>
}
export interface HandlerRunOptions287 {
 call(input: OfferInput287, signal?: AbortSignal, floors?: readonly HookFloor287[]): Promise<OfferResult287>
 floors: readonly HookFloor287[]; cutAt?: number
}
export interface OfferHandler287 {
 name: string; tier?: ProviderTier287; environmentId?: number
 isCore?: boolean; isManaged?: boolean; answersForEngine?: boolean; budgetMs?: number
 run(input: OfferInput287, next: HookHandle287, options: HandlerRunOptions287): Promise<OfferResult287>
 catch?(error: unknown, next: HookHandle287): Promise<OfferResult287 | undefined>
}
export interface HookSite287 {
 event: string; budgetMs?: number; pinnedKeys?: readonly string[]
 check?(value: unknown, input: unknown, below?: readonly unknown[]): string | undefined
 checkArgument?(value: unknown, input: unknown): string | undefined
 restoreArgument?(value: unknown, input: unknown): unknown
 restoreResult?(value: unknown, below: readonly unknown[], input: unknown): unknown
 stripResult?(value: unknown, below: readonly unknown[]): unknown
 settle?(value: unknown): unknown
}
export interface HookCoreReference287 {
 readonly name: string; readonly isCore: boolean; readonly budgetMs: number
 readonly run: (...args: never[]) => unknown
}
export interface EventImplementation287 {site: HookSite287; core: HookCoreReference287}
export interface HookFloor287 {plugin: string; from: ProviderTier287; to: ProviderTier287}
export interface LoadedModule287 {
 name: string; label: string; tier: ProviderTier287; environmentId: number
 args: {modulePath: string}
 hooks(event: string, leftOut?: readonly number[]): boolean
 matcherFor(event: string, leftOut?: readonly number[]): Record<string, unknown> | undefined
 registrationsFor(event: string): readonly number[]
 status(): {kind: 'live'} | {kind: 'retiring'} | {kind: 'unloaded'; retired?: boolean} | {kind: 'dead'; reason: string}
 enter(): void; leave(): void; leftOut?: readonly number[]
 link?(request: {event: string; leftOut?: readonly number[]; hookOrigin?: HookOrigin287}): OfferHandler287
 hopKey: {
  kind: 'worker' | 'same-thread' | 'native'; nextDispatchId(): number
  dispatch(request: HopRequest287, next: HandlerRunOptions287['call'], signal: AbortSignal): Promise<{result: OfferResult287}>
 }
}
export interface HopRequest287 {
 id: number; event: string; payload: OfferInput287; environments: number[]
 leftOut?: {environmentId: number; registrations: number[]}[]
 origin: Provider287; hookOrigin?: HookOrigin287; raise?: unknown; floors?: HookFloor287[]; cutAt?: number
}
export interface ModsRegistry287 {loadedModules: LoadedModule287[]; vouchedManagedPluginIds: Set<string>; moduleSeats: Map<string,ProviderTier287>}
export interface AvailabilityExecutionContext287 {readonly host: object; readonly root: object}
export interface PluginOrder287 {
 prepend: string[]; append: string[]
 from: {prepend: 'user' | 'policy' | 'none'; append: 'user' | 'policy' | 'none'}
 shadowed: string[]; outermost: string[]; seat: string; shadowedBy?: string
}
export interface PluginPolicy287 {managedIds: readonly string[]; order: PluginOrder287}
export interface Cell287<T> {get(): T | undefined; set(value: T | undefined): void}
export interface AgentAvailabilityPorts287 {
  /** Raw chunk-75fy7kb3.js:a; full cut declaration in provenance. */
  "modsOwner": ModsRegistryOwnerReader287<LoadedModule287>
  /** Raw chunk-hhxhpvxp.js:zs; full cut declaration in provenance. */
  "catalog_zs": HookSite287
  /** Raw chunk-hhxhpvxp.js:Xs; full cut declaration in provenance. */
  "catalog_Xs": HookSite287
  /** Raw chunk-hhxhpvxp.js:hi; full cut declaration in provenance. */
  "catalog_hi": HookSite287
  /** Raw chunk-hhxhpvxp.js:Bs; full cut declaration in provenance. */
  "catalog_Bs": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ks; full cut declaration in provenance. */
  "catalog_Ks": HookSite287
  /** Raw chunk-hhxhpvxp.js:Xi; full cut declaration in provenance. */
  "catalog_Xi": HookSite287
  /** Raw chunk-hhxhpvxp.js:zi; full cut declaration in provenance. */
  "catalog_zi": HookSite287
  /** Raw chunk-hhxhpvxp.js:oa; full cut declaration in provenance. */
  "catalog_oa": HookSite287
  /** Raw chunk-hhxhpvxp.js:ra; full cut declaration in provenance. */
  "catalog_ra": HookSite287
  /** Raw chunk-hhxhpvxp.js:na; full cut declaration in provenance. */
  "catalog_na": HookSite287
  /** Raw chunk-hhxhpvxp.js:ea; full cut declaration in provenance. */
  "catalog_ea": HookSite287
  /** Raw chunk-hhxhpvxp.js:yi; full cut declaration in provenance. */
  "catalog_yi": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ps; full cut declaration in provenance. */
  "catalog_Ps": HookSite287
  /** Raw chunk-hhxhpvxp.js:ui; full cut declaration in provenance. */
  "catalog_ui": HookSite287
  /** Raw chunk-hhxhpvxp.js:li; full cut declaration in provenance. */
  "catalog_li": HookSite287
  /** Raw chunk-hhxhpvxp.js:mi; full cut declaration in provenance. */
  "catalog_mi": HookSite287
  /** Raw chunk-hhxhpvxp.js:ri; full cut declaration in provenance. */
  "catalog_ri": HookSite287
  /** Raw chunk-hhxhpvxp.js:Fs; full cut declaration in provenance. */
  "catalog_Fs": HookSite287
  /** Raw chunk-hhxhpvxp.js:sa; full cut declaration in provenance. */
  "catalog_sa": HookSite287
  /** Raw chunk-hhxhpvxp.js:js; full cut declaration in provenance. */
  "catalog_js": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ms; full cut declaration in provenance. */
  "catalog_Ms": HookSite287
  /** Raw chunk-hhxhpvxp.js:Us; full cut declaration in provenance. */
  "catalog_Us": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ds; full cut declaration in provenance. */
  "catalog_Ds": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ji; full cut declaration in provenance. */
  "catalog_Ji": HookSite287
  /** Raw chunk-hhxhpvxp.js:qi; full cut declaration in provenance. */
  "catalog_qi": HookSite287
  /** Raw chunk-hhxhpvxp.js:gi; full cut declaration in provenance. */
  "catalog_gi": HookSite287
  /** Raw chunk-hhxhpvxp.js:ti; full cut declaration in provenance. */
  "catalog_ti": HookSite287
  /** Raw chunk-hhxhpvxp.js:Wi; full cut declaration in provenance. */
  "catalog_Wi": HookSite287
  /** Raw chunk-hhxhpvxp.js:Fi; full cut declaration in provenance. */
  "catalog_Fi": HookSite287
  /** Raw chunk-hhxhpvxp.js:Vi; full cut declaration in provenance. */
  "catalog_Vi": HookSite287
  /** Raw chunk-hhxhpvxp.js:Di; full cut declaration in provenance. */
  "catalog_Di": HookSite287
  /** Raw chunk-hhxhpvxp.js:$i; full cut declaration in provenance. */
  "catalog_$i": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ui; full cut declaration in provenance. */
  "catalog_Ui": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ki; full cut declaration in provenance. */
  "catalog_Ki": HookSite287
  /** Raw chunk-hhxhpvxp.js:Bi; full cut declaration in provenance. */
  "catalog_Bi": HookSite287
  /** Raw chunk-hhxhpvxp.js:qs; full cut declaration in provenance. */
  "catalog_qs": HookSite287
  /** Raw chunk-hhxhpvxp.js:Zs; full cut declaration in provenance. */
  "catalog_Zs": HookSite287
  /** Raw chunk-hhxhpvxp.js:pa; full cut declaration in provenance. */
  "catalog_pa": HookSite287
  /** Raw chunk-hhxhpvxp.js:aa; full cut declaration in provenance. */
  "catalog_aa": HookSite287
  /** Raw chunk-hhxhpvxp.js:Pi; full cut declaration in provenance. */
  "catalog_Pi": HookSite287
  /** Raw chunk-hhxhpvxp.js:_i; full cut declaration in provenance. */
  "catalog__i": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ci; full cut declaration in provenance. */
  "catalog_Ci": HookSite287
  /** Raw chunk-hhxhpvxp.js:vi; full cut declaration in provenance. */
  "catalog_vi": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ii; full cut declaration in provenance. */
  "catalog_Ii": HookSite287
  /** Raw chunk-hhxhpvxp.js:Ri; full cut declaration in provenance. */
  "catalog_Ri": HookSite287
  /** Raw chunk-hhxhpvxp.js:Hi; full cut declaration in provenance. */
  "catalog_Hi": HookSite287
  /** Raw chunk-hhxhpvxp.js:Vs; full cut declaration in provenance. */
  "catalog_Vs": HookSite287
  /** Raw chunk-hhxhpvxp.js:oi; full cut declaration in provenance. */
  "catalog_oi": HookSite287
  /** Raw chunk-mphp7acd.js:LX; full cut declaration in provenance. */
  "event_LX": EventImplementation287
  /** Raw chunk-mphp7acd.js:NX; full cut declaration in provenance. */
  "event_NX": EventImplementation287
  /** Raw chunk-mphp7acd.js:SF; full cut declaration in provenance. */
  "event_SF": EventImplementation287
  /** Raw chunk-mphp7acd.js:e7; full cut declaration in provenance. */
  "event_e7": EventImplementation287
  /** Raw chunk-mphp7acd.js:t7; full cut declaration in provenance. */
  "event_t7": EventImplementation287
  /** Raw chunk-mphp7acd.js:zX; full cut declaration in provenance. */
  "event_zX": EventImplementation287
  /** Raw chunk-mphp7acd.js:BX; full cut declaration in provenance. */
  "event_BX": EventImplementation287
  /** Raw chunk-mphp7acd.js:$X; full cut declaration in provenance. */
  "event_$X": EventImplementation287
  /** Raw chunk-mphp7acd.js:yG; full cut declaration in provenance. */
  "event_yG": EventImplementation287
  /** Raw chunk-mphp7acd.js:GX; full cut declaration in provenance. */
  "event_GX": EventImplementation287
  /** Raw chunk-mphp7acd.js:UX; full cut declaration in provenance. */
  "event_UX": EventImplementation287
  /** Raw chunk-mphp7acd.js:qX; full cut declaration in provenance. */
  "event_qX": EventImplementation287
  /** Raw chunk-mphp7acd.js:ZX; full cut declaration in provenance. */
  "event_ZX": EventImplementation287
  /** Raw chunk-mphp7acd.js:n7; full cut declaration in provenance. */
  "event_n7": EventImplementation287
  /** Raw chunk-mphp7acd.js:JX; full cut declaration in provenance. */
  "event_JX": EventImplementation287
  /** Raw chunk-mphp7acd.js:QX; full cut declaration in provenance. */
  "event_QX": EventImplementation287
  /** Raw chunk-mphp7acd.js:hDr; full cut declaration in provenance. */
  "event_hDr": EventImplementation287
  /** Raw chunk-mphp7acd.js:lot; full cut declaration in provenance. */
  "event_lot": EventImplementation287
  /** Raw chunk-mphp7acd.js:dot; full cut declaration in provenance. */
  "event_dot": EventImplementation287
  /** Raw chunk-mphp7acd.js:VX; full cut declaration in provenance. */
  "event_VX": EventImplementation287
  /** Raw chunk-mphp7acd.js:KX; full cut declaration in provenance. */
  "event_KX": EventImplementation287
  /** Raw chunk-mphp7acd.js:vot; full cut declaration in provenance. */
  "event_vot": EventImplementation287
  /** Raw chunk-mphp7acd.js:wot; full cut declaration in provenance. */
  "event_wot": EventImplementation287
  /** Raw chunk-mphp7acd.js:nQ; full cut declaration in provenance. */
  "event_nQ": EventImplementation287
  /** Raw chunk-mphp7acd.js:rQ; full cut declaration in provenance. */
  "event_rQ": EventImplementation287
  /** Raw chunk-q80zaav8.js:t; full cut declaration in provenance. */
  "debug": (message: string, options?: {level?: string}) => void
  /** Raw chunk-72fc0rrz.js:nd; full cut declaration in provenance. */
  "diagnostics": () => HookDiagnostics287
  /** Raw chunk-f1vb7bx7.js:ge; full cut declaration in provenance. */
  "settings": (source: SettingSource287) => PluginSettings287 | null
  /** Raw chunk-f1vb7bx7.js:gCn; full cut declaration in provenance. */
  "managedSettingsPresent": () => boolean
  /** Raw chunk-s3exmmq6.js:Xo; full cut declaration in provenance. */
  "enabledSettingSources": () => readonly SettingSource287[]
  /** Raw chunk-nankzm0s.js:ir; full cut declaration in provenance. */
  "organization": () => string | null
  /** Raw chunk-6xrs6gmd.js:Ff; full cut declaration in provenance. */
  "nonDeniableTools": ReadonlySet<string>
  /** Raw chunk-bn3p37gv.js:n; full cut declaration in provenance. */
  "executionContext": () => AvailabilityExecutionContext287
  /** Raw chunk-mbfze585.js:a; full cut declaration in provenance. */
  "environment": TypedEnvironment287
  /** Raw chunk-b5kmgz2n.js:on; full cut declaration in provenance. */
  "toolEnabled": (key: string) => boolean
  /** Raw chunk-m4akk3an.js:pe; full cut declaration in provenance. */
  "permissionContext": (context: AgentListingContext287) => PermissionContext287
  /** Raw chunk-1b21she7.js:AG; full cut declaration in provenance. */
  "leanPrompt": (model: string | undefined) => boolean
  /** Raw chunk-1b21she7.js:M9; full cut declaration in provenance. */
  "modelForPrompt": (model: string | undefined) => string | undefined
  /** Raw chunk-nankzm0s.js:FM; full cut declaration in provenance. */
  "taskMode": () => 'default' | 'no_nudges' | 'counter_steer'
}
export interface InvokeOptions287 {
 core?: {'agent.offer'?: OfferHandler287}
 managed?: {'agent.offer'?: OfferHandler287}
 withheldCore?: {'agent.offer'?: OfferHandler287}
 withoutModuleHandlers?: boolean; only?: string; origin?: HookOrigin287; signal?: AbortSignal; cutAt?: number
 trace?(entries: readonly HookTraceEntry287[]): void
}
export interface AgentToolReference287 {name: string; aliases?: readonly string[]; mcpInfo?: {serverName: string}}
export interface AgentListingContext287 extends AvailabilityContext287 {
 options: {tools: readonly AgentToolReference287[]; agentDefinitions: {activeAgents: readonly AgentDefinition287[]; allowedAgentTypes?: readonly string[]}; mainLoopModel?: string}
}
export interface AgentListingDelta287 {
 type: 'agent_listing_delta'; addedTypes: string[]; addedLines: string[]; builtInTypes: string[]; removedTypes: string[]
 isInitial: boolean; showConcurrencyNote: boolean
}
export type AgentListingHistory287 = readonly (
 {type: 'attachment'; attachment: Partial<Omit<AgentListingDelta287,'type'>> & {type: string}} |
 {type: 'user' | 'assistant' | 'system'}
)[]
export interface AgentAvailability287 {
 listing(context: AgentListingContext287, history?: AgentListingHistory287): Promise<AgentListingDelta287[]>
 serverFilter(agents: readonly AgentDefinition287[], servers: readonly string[]): AgentDefinition287[]
 listingLine(agent: AgentDefinition287, lean: boolean): string
 toolMatcher(tool: AgentToolReference287, name: string): boolean
 mcpServerName(tool: AgentToolReference287): string | undefined
 available(agents: readonly AgentDefinition287[], allowed: readonly string[] | undefined, permissions: PermissionContext287, context?: AvailabilityContext287): Promise<AgentDefinition287[]>
 filter(agents: readonly AgentDefinition287[], permissions: PermissionContext287, toolName: string, context?: AvailabilityContext287): Promise<AgentDefinition287[]>
 offer(agents: readonly AgentDefinition287[], context?: AvailabilityContext287): Promise<AgentDefinition287[]>
 toolFilter(agents: readonly AgentDefinition287[], permissions: PermissionContext287): AgentDefinition287[]
 provider(agent: AgentDefinition287): Provider287
 offerCore: {site: HookSite287; core: OfferHandler287}
 offerSite: HookSite287
 invoke(event: 'agent.offer', options: InvokeOptions287): (input: OfferInput287) => Promise<OfferResult287>
 mods(): ModsRegistry287
 setPolicy: Cell287<PluginPolicy287>
 engineState: Cell287<unknown>
 providerTier(plugin: string, managed: Set<string> | null, order: PluginOrder287): ProviderTier287
 managedPlugins(): Set<string> | null
 pluginOrder(): PluginOrder287
 handlers(event: 'agent.offer', origin?: HookOrigin287, options?: {only?: string; among?: LoadedModule287[]}): OfferHandler287[]
 chain(options: {e: OfferInput287; handlers: OfferHandler287[]; site: HookSite287; signal?: AbortSignal; cutAt?: number; budgetMs?: number; bottom?: (input: OfferInput287, signal: AbortSignal, floors: readonly HookFloor287[]) => Promise<OfferResult287>; origin?: Provider287; floors?: HookFloor287[]; trace?(entries: readonly HookTraceEntry287[]): void}): Promise<OfferResult287>
}
export function createAgentAvailability287(ports: AgentAvailabilityPorts287): AgentAvailability287

/**
 * Minimal source READ view only. No isEnabled contract: that belongs to A and
 * the real act boundary, not Jzn. Extra definition methods/identity are retained.
 */
export interface MinimalListingDefinition287 {
 agentType: string; source: string
 tools?: readonly string[]; disallowedTools?: readonly string[]
 whenToUse?: string; whenToUseLean?: string; requiredMcpServers?: readonly string[]
}
export interface ListingOptions287<A extends MinimalListingDefinition287> {
 options: {
  tools: readonly AgentToolReference287[]
  agentDefinitions: {activeAgents: readonly A[]; allowedAgentTypes?: readonly string[]}
  mainLoopModel?: string
 }
}
/** Six source-qualified boundaries, generic over ACTUAL definitions/permission/context. */
export interface AgentListingPorts287<
 A extends MinimalListingDefinition287 = MinimalListingDefinition287,
 P = unknown,
 C extends ListingOptions287<A> = ListingOptions287<A>
> {
 /** chunk-mphp7acd.js:act — genuine async availability, preserves A identity. */
 available(agents: A[], allowed: readonly string[] | undefined, permissions: P, context: C): Promise<readonly A[]>
 /** chunk-m4akk3an.js:pe — actual permission layers/current context. */
 permissionContext(context: C): P
 /** chunk-1b21she7.js:M9 — resolved model spelling. */
 modelForPrompt(model: string | undefined): string | undefined
 /** chunk-1b21she7.js:AG — receives M9's result. */
 leanPrompt(model: string | undefined): boolean
 /** chunk-nankzm0s.js:FM — original registered taskMode readers. */
 taskMode(): 'default' | 'no_nudges' | 'counter_steer'
 /** chunk-nankzm0s.js:ir — actual subscription reader. */
 subscription(): string | null
}
/**
 * Minimal read view of ACTUAL Message[]: arbitrary progress/local/system/etc
 * records are ignored by original Jzn. Delta fields are raw inputs to wi and
 * Array.isArray, not a new schema or validator.
 */
export interface AgentListingHistoryEntry287 {
 type: string
 attachment?: {type: string; addedLines?: unknown; addedTypes?: unknown; removedTypes?: unknown}
}
export interface AgentListing287<
 A extends MinimalListingDefinition287 = MinimalListingDefinition287,
 C extends ListingOptions287<A> = ListingOptions287<A>
> {
 listing(context: C, history?: readonly AgentListingHistoryEntry287[]): Promise<AgentListingDelta287[]>
 serverFilter(agents: readonly A[], servers: readonly string[]): A[]
 listingLine(agent: A, lean: boolean): string
 toolMatcher(tool: AgentToolReference287, name: string): boolean
 mcpServerName(tool: AgentToolReference287): string | undefined
 stringArray(value: unknown): string[]
}
export function createAgentListing287<
 A extends MinimalListingDefinition287,
 P,
 C extends ListingOptions287<A>
>(ports: AgentListingPorts287<A,P,C>): AgentListing287<A,C>
