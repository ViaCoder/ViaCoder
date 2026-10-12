import {catalog} from '../../vendor/official-model-catalog/catalog.js'
import {getCredentialCacheGeneration, getRateLimitTier, getSubscriptionType, isClaudeAISubscriber, isMaxSubscriber, isTeamPremiumSubscriber} from '../auth.js'
import {formatModelPricing} from '../modelCost.js'
import {CANONICAL_ID_TO_KEY, ALL_MODEL_CONFIGS} from './configs.js'
import {getCatalogEntry} from './catalog.js'
import {getDefaultFableModel, getDefaultHaikuModel, getDefaultOpusModel, getDefaultSonnetModel, getMarketingNameForModel, getCanonicalName, getOpus46PricingSuffix, getUserSpecifiedModelSetting} from './model.js'
import {getModelStrings} from './modelStrings.js'
import {createModelPicker287, type OfficialModelPicker287Ports} from './officialModelPicker287/native.js'
import {createOfficialE8Chooser287, createOfficialModelMenu287, createModelMenuPolicy287, createModelMenuLexical287, createModelMenuSanitizers287, createModelMenuDenied287, createModelMenuTextPrimitives287, createModelMenuRegions287, createModelMenuStateFields287, createModelMenuCatalogAliases287, createModelMenuPolicyErrors287, createModelMenuSignal287, createModelMenuReprobe287, type ModelRestrictionNotice287, type ModelMenuDiagnostics287, type ProviderCache287, type SessionModelDenyReprobe287} from './officialModelPicker287/native.js'
import {getAPIProvider, isFirstPartyRequestEndpoint} from './providers.js'
import {getSettings_DEPRECATED, getInitialSettings, getSettingsForSource} from '../settings/settings.js'
import {getGlobalConfig} from '../config.js'
import {checkOpus1mAccess, checkSonnet1mAccess} from './check1mAccess.js'
import {getQuotaCredit287} from '../quotaCredit287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getMainLoopModelOverride, getModelStrings as getModelStringsState, setModelStrings as setModelStringsState} from '../../bootstrap/state.js'
import {createSelectorHostMap287} from './officialModelPicker287/selector.native.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {lazySchema} from '../lazySchema.js'
import {isFastModeSupportedByModel} from '../fastMode.js'
import {getModelBehaviorName287} from './behavior287.js'
import {getNativeAPIProvider287} from './providerSelectionBindings287.js'
import {getServedCatalog, getServedModelRow, getModelBehaviorMemoOwner287, getServedCatalogWithDeactivatedRows287, isActiveServedModelCatalog287, getModelCatalogSource287} from './servedCatalog.js'
import {getCanonicalRoot287, canonicalName287, isKnownIdentity287} from './canonical287.js'
import type {PolicyReadError287} from '../../services/context/officialModelUsagePolicy287/native.js'
import {getModelUsagePolicy287, getModelUsagePolicyContext287} from '../../services/context/modelUsagePolicy287.js'
import {getSettingsCacheStore287} from '../settings/settingsCache.js'
import {getEnabledSettingSources, type SettingSource} from '../settings/constants.js'
import {parseUserSpecifiedModel} from './model.js'
import {getClaudeConfigHomeDir} from '../envUtils.js'
import {safeParseJSON} from '../json.js'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {z} from 'zod/v4'
import {logForDebugging} from '../debug.js'
import {AsyncResource} from 'node:async_hooks'
import {logError} from '../log.js'
import {logEvent} from '../../services/analytics/index.js'

export const officialModelPickerPorts287: OfficialModelPicker287Ports = {
  vwe: () => catalog,
  hse: catalog.models.map(row => row.id),
  xa: id => getCatalogEntry(id),
  OU: CANONICAL_ID_TO_KEY,
  xm: getDefaultSonnetModel,
  Bu: getDefaultOpusModel,
  Sj: getDefaultHaikuModel,
  eIe: getDefaultFableModel,
  Be: getCanonicalName,
  od: () => ['firstParty', 'anthropicGoogleCloud', 'gateway'].includes(apiProvider()),
  RS: getModelStrings,
  Sr: (model, fastMode = false) => {
    const canonical = getCanonicalName(model)
    const row = getCatalogEntry(canonical)
    if (!row) return ''
    if (row.family === 'opus' && fastMode && canonical === 'claude-opus-4-6') return getOpus46PricingSuffix(true)
    const pricing = catalog.pricing_tiers[row.pricing]
    return pricing ? ` · ${formatModelPricing({inputTokens: pricing.input, outputTokens: pricing.output,
      promptCacheWriteTokens: pricing.cache_write_5m, promptCacheReadTokens: pricing.cache_read,
      webSearchRequests: pricing.web_search})}` : ''
  },
  Eq: () => getQuotaCredit287().mK(),
  t_e: () => getQuotaCredit287().ode(),
  ft: isClaudeAISubscriber,
  Wp: getMarketingNameForModel,
  Ct: model => model.replace(/\[1m\]$/i, ''),
}

const picker = createModelPicker287(officialModelPickerPorts287)
export const getOfficialLatestModelFamily287 = picker.latest
export const isOfficialLatestModelFamily287 = picker.isLatest
export const getOfficialModelFamilyOption287 = picker.familyOption
export const getOfficialFableOption287 = (fastMode = false) => picker.fableOption(getDefaultFableModel(), fastMode)
export const getOfficialCustomFableOption287 = picker.customFableOption
export const getOfficialOpusOneMillionOption287 = picker.opusOneMillionOption
export const getOfficialOpusAliasOneMillionOption287 = picker.opusAliasOneMillionOption

// Re-export selected source metadata for independent production-caller assertions.
export function getOfficialCatalogModelLabel287(model: string): string | undefined {
  const row = getCatalogEntry(getCanonicalName(model))
  return row?.display_name
}

const apiProvider = () => { getAPIProvider(); return getNativeAPIProvider287() }
const modelConfigByName = ALL_MODEL_CONFIGS as Record<string, {firstParty: string; [key: string]: unknown}>
const chooserEnv = new Proxy({} as Record<string, string | undefined>, {
  get: (_target, property) => typeof property === 'string' ? process.env[property] : undefined,
})
export const officialE8Ports287: Record<string, unknown> = {
  $r: (model: string, options?: Record<string, unknown>) => getOfficialModelMenuPolicy287().$r(model, options),
  AQn: (fastMode = false) => getOfficialModelMenuPolicy287().AQn(fastMode),
  Be: (model: string, options?: {identity?: boolean}) => getModelBehaviorName287(model, options),
  Bu: (...args: Parameters<typeof getDefaultOpusModel>) => getDefaultOpusModel(...args),
  Cj: () => getGlobalConfig().additionalModelOptionsCache ?? [],
  Ct: (model: string) => model.replace(/\[1m\]$/i, ''),
  EF: (...args: Parameters<typeof checkSonnet1mAccess>) => checkSonnet1mAccess(...args),
  El: () => getOfficialModelMenuPolicy287().El(),
  Eq: () => getQuotaCredit287().mK(),
  Fn: (model: string) => model.replace(/\[(1|2)m\]/gi, ''),
  GF: () => apiProvider() === 'anthropicGoogleCloud',
  He: (...args: Parameters<typeof apiProvider>) => apiProvider(...args),
  Js: (...args: Parameters<typeof isFirstPartyRequestEndpoint>) => isFirstPartyRequestEndpoint(...args),
  Kb: (model: string) => getOfficialModelMenuPolicy287().Kb(model),
  // Enforced steering is separate from access to a 1M context window.
  Kqr: () => getOfficialModelMenuPolicy287().Kqr(),
  Ny: (family: string) => ['sonnet', 'opus', 'haiku', 'fable'].includes(family),
  OU: CANONICAL_ID_TO_KEY,
  Poe: (model: string) => getOfficialModelMenuPolicy287().Poe(model),
  Py: () => getOfficialModelMenuPolicy287().Py(),
  RS: (...args: Parameters<typeof getModelStrings>) => getModelStrings(...args),
  Rt: (model: string) => parseUserSpecifiedModel(model),
  Ry: (...args: Parameters<typeof isFastModeSupportedByModel>) => isFastModeSupportedByModel(...args),
  Sj: (...args: Parameters<typeof getDefaultHaikuModel>) => getDefaultHaikuModel(...args),
  W3: (model: string) => getMarketingNameForModel(model) ?? model,
  Wp: (...args: Parameters<typeof getMarketingNameForModel>) => getMarketingNameForModel(...args),
  Xh: (...args: Parameters<typeof getUserSpecifiedModelSetting>) => getUserSpecifiedModelSetting(...args),
  Yw: (model: string) => getMarketingNameForModel(model),
  a: chooserEnv,
  bj: () => getOfficialModelMenuPolicy287().bj(),
  eIe: (...args: Parameters<typeof getDefaultFableModel>) => getDefaultFableModel(...args),
  er: () => getSettings_DEPRECATED(),
  f: lazySchema,
  ft: (...args: Parameters<typeof isClaudeAISubscriber>) => isClaudeAISubscriber(...args),
  ho: modelConfigByName,
  hse: catalog.models.map(row => row.id),
  ir: (...args: Parameters<typeof getSubscriptionType>) => getSubscriptionType(...args),
  k: (...args: Parameters<typeof getFeatureValue_CACHED_MAY_BE_STALE>) => getFeatureValue_CACHED_MAY_BE_STALE(...args),
  kL: (...args: Parameters<typeof getMainLoopModelOverride>) => getMainLoopModelOverride(...args),
  mpe: (model: string) => model.includes('claude-fable-'),
  od: () => ['firstParty', 'anthropicGoogleCloud', 'gateway'].includes(apiProvider()),
  qbn: (source: string) => getOfficialModelMenuPolicy287().qbn(source),
  t_e: () => getQuotaCredit287().ode(),
  // Pass the real settings owner lazily: this module participates in a cold
  // import cycle through modelOptions -> settings -> model picker.
  tt: () => getInitialSettings(),
  vwe: () => catalog,
  wF: (...args: Parameters<typeof checkOpus1mAccess>) => checkOpus1mAccess(...args),
  wWt: (credit: boolean, model: string) => {
    const canonical = getCanonicalName(model)
    if (canonical === 'claude-opus-4-6' && credit) return getOpus46PricingSuffix(true)
    const row = getCatalogEntry(canonical)
    const pricing = row && catalog.pricing_tiers[row.pricing]
    return pricing ? ` ${formatModelPricing({inputTokens: pricing.input, outputTokens: pricing.output,
      promptCacheWriteTokens: pricing.cache_write_5m, promptCacheReadTokens: pricing.cache_read,
      webSearchRequests: pricing.web_search})}` : ''
  },
  xa: (id: string) => getCatalogEntry(id),
  xm: (...args: Parameters<typeof getDefaultSonnetModel>) => getDefaultSonnetModel(...args),
  ype: (model: string) => getOfficialModelMenuPolicy287().ype(model),
  zd: (model: string) => /\[1m\]$/i.test(model),
  JBe: () => getOfficialModelMenuPolicy287().JBe(),
  Jbn: () => isMaxSubscriber() || isTeamPremiumSubscriber(),
  VWt: () => getQuotaCredit287().Pzt(),
  YE: (...args: Parameters<typeof getRateLimitTier>) => getRateLimitTier(...args),
  _pe: () => getOfficialModelMenuPolicy287()._pe(),
  fQn: (family: string) => getOfficialModelMenuPolicy287().fQn(family),
  gU: () => getOfficialModelMenuPolicy287().gU(),
  j3: () => getOfficialModelMenuPolicy287().j3(),
  kbe: (fastMode: boolean, model: string) => fastMode && !isFastModeSupportedByModel(model),
  mQn: () => getOfficialModelMenuPolicy287().mQn(),
  t_t: (model: string) => getMarketingNameForModel(model),
}

export function createOfficialE8ChooserAdapter287(overrides: Record<string, unknown> = {}) {
  return createOfficialE8Chooser287({...officialE8Ports287, $r: (model: string, options?: Record<string, unknown>) => getOfficialModelMenuPolicy287().$r(model, options), ...overrides})
}

// Bind the complete imported policy closure to shared state/settings/catalog
// owners. These are ports, not a second bootstrap model-access store.
type PickerState287 = ReturnType<typeof getModelBehaviorMemoOwner287> & {
  providerCache?: ProviderCache287
  sessionModelDenyReprobe?: SessionModelDenyReprobe287
  gatewayModelsByCachePath?: Map<string, unknown>
  gatewayModelsStorageV5?: unknown
  modelRestrictionNoticeSink287?: (notice: ModelRestrictionNotice287) => void
  warnedEnforcementMessages?: Set<string>
  modelPickerProviderScope287?: string
}
const restrictionSignal = createModelMenuSignal287({wKt: callback => AsyncResource.bind(callback)})
export function getOfficialModelPickerProviderOwner287() {
  const owner = getModelBehaviorMemoOwner287() as PickerState287
  const account = getGlobalConfig().oauthAccount
  const scope = JSON.stringify([getCredentialCacheGeneration(), account?.accountUuid, account?.organizationUuid,
    apiProvider(), process.env.ANTHROPIC_BASE_URL])
  if (owner.modelPickerProviderScope287 !== scope || !owner.providerCache || !owner.sessionModelDenyReprobe || !owner.gatewayModelsByCachePath) {
    const previous = owner.sessionModelDenyReprobe
    // Invalidate in-flight PD/g receipts before changing identity. Keep the
    // original signal/registration, as WVo does, rather than leaving a stale
    // object whose generation can still authorize a late receipt.
    if (previous) { previous.generation++; previous.honoredModels.clear(); previous.contestedDenies.clear(); previous.refusedModels.clear() }
    const initial = createModelMenuStateFields287({sqr: () => getOfficialModelMenuPolicy287().sqr(), Me: restrictionSignal.Me})
    if (previous) initial.sessionModelDenyReprobe = previous
    owner.providerCache = initial.providerCache
    owner.sessionModelDenyReprobe = initial.sessionModelDenyReprobe
    owner.gatewayModelsByCachePath = initial.gatewayModelsByCachePath
    owner.warnedEnforcementMessages = initial.warnedEnforcementMessages
    owner.modelPickerProviderScope287 = scope
  }
  return owner as PickerState287 & Required<Pick<PickerState287, 'providerCache' | 'sessionModelDenyReprobe' | 'gatewayModelsByCachePath'>>
}
/** Explicit port for auth/bootstrap invalidation. Both readers and error/reprobe
 * producers must use this same owner, never clear a shadow deny map. */
export function clearOfficialModelPickerProviderCache287(): void {
  const owner = getOfficialModelPickerProviderOwner287()
  getOfficialModelReprobeRuntime287().WVo()
  const initial = createModelMenuStateFields287({sqr: () => getOfficialModelMenuPolicy287().sqr(), Me: restrictionSignal.Me})
  owner.providerCache = initial.providerCache
  owner.gatewayModelsByCachePath.clear()
}

// Existing execution owner methods; the public owner type is intentionally
// narrower than its recovered pe/qe constructors. Do not keep parallel latches.
type SteeringSelectionOwner287 = {
  resolvedOrgDefault(): string | null | undefined
  replaceResolvedOrgDefault(value: string | null | undefined): void
  initialEnvDefaultModel(): string | null | undefined
}
type SteeringStringsOwner287 = {admin3PSteeringSnapshot(): {sonnet: boolean; opus: boolean} | null}
function steeringSelectionOwner287() {
  return getExecutionSession287().modelSelection as unknown as SteeringSelectionOwner287
}
const catalogAliases = createModelMenuCatalogAliases287({Gj: () => catalog})
const policyErrors = createModelMenuPolicyErrors287({})
const textPrimitives = createModelMenuTextPrimitives287({})
const regions = createModelMenuRegions287({})
const lexical = createModelMenuLexical287(regions)
const sanitizers = createModelMenuSanitizers287(textPrimitives)
const denied = createModelMenuDenied287({...lexical, Ny: (family: string) => ['opus','sonnet','haiku','fable'].includes(family)})
let menuPolicy: ReturnType<typeof createModelMenuPolicy287> | undefined
function readSource287(source: string) {
  const policy = getModelUsagePolicy287()
  return source === 'policySettings'
    ? policy.readSource('policySettings', getModelUsagePolicyContext287())
    : getSettingsForSource(source as SettingSource)
}
function readPolicyDenyOverrides287(): Record<string, string> | undefined {
  // Force the existing original policy resolver to fill its own paired cache.
  const store = getSettingsCacheStore287()
  if (store.policy.deniedModelsOverrides === undefined) getModelUsagePolicy287().resolvePolicy(getModelUsagePolicyContext287())
  return (store.policy.deniedModelsOverrides as {value?: Record<string, string>} | undefined)?.value
}
export function createOfficialModelMenuPolicyPorts287(): Record<string, unknown> {
  return {
    ...officialE8Ports287, ...textPrimitives, ...regions, ...lexical, ...sanitizers, ...denied, ...catalogAliases, ...policyErrors,
    Xr: getOfficialModelPickerProviderOwner287,U:getExecutionSession287,V:createSelectorHostMap287({}).V,
    cL: () => getCanonicalRoot287(),
    Doe: isKnownIdentity287,
    t: logForDebugging,
    fb: (model: string) => canonicalName287(model),
    bF: () => getServedCatalog(),
    Vs: () => getServedCatalogWithDeactivatedRows287(),
    // Original provenance distinguishes authoritative served from published rows.
    c8: isActiveServedModelCatalog287,
    le: () => getGlobalConfig(),
    Xo: () => getEnabledSettingSources(),
    ge: readSource287,
    fse: (key: string) => ['policySettings','flagSettings','userSettings'].flatMap(source => {
      const value = readSource287(source)?.[key]
      return value === undefined ? [] : [{source,value}]
    }),
    pse: () => getModelUsagePolicy287().policyOverrides(),
    t8r: readPolicyDenyOverrides287,
    j8: () => getModelUsagePolicy287().adminLoadBlocked(),
    // Raw vt/Qs/qqr resolve env-free aliases from the EXISTING host table,
    // before user steering/modelOverrides. Current Rt remains the live parser.
    Lwt: () => getModelStringsState(),
    lkn: (table: ReturnType<typeof getModelStrings>) => setModelStringsState(table),
    ieo: () => (getExecutionSession287().host.modelStringsCache as SteeringStringsOwner287).admin3PSteeringSnapshot(),
    WZr: () => steeringSelectionOwner287().resolvedOrgDefault(),
    g6e: (model: string) => steeringSelectionOwner287().replaceResolvedOrgDefault(model),
    GZr: () => steeringSelectionOwner287().initialEnvDefaultModel(),
    Gj: () => catalog,
    ja: () => apiProvider() === 'firstParty' && isFirstPartyRequestEndpoint(),
    ufe: () => {
      getModelUsagePolicy287().adminLoadBlocked()
      const cached = getSettingsCacheStore287().policy.adminLoadErrors as PolicyReadError287[] | undefined
      return policyErrors.i0e(cached ?? getModelUsagePolicy287().resolvePolicy(getModelUsagePolicyContext287()).errors)
    },
    Jk: () => getModelUsagePolicy287().policyOrigin(),
    aJe: () => getSubscriptionType() === 'max',
    vwn: () => getSubscriptionType() === 'team' && getRateLimitTier() === 'default_claude_max_5x',
    Ipe: () => getSubscriptionType() === 'enterprise',
    Ewn: () => getSubscriptionType() === 'team',
    $be: () => getSubscriptionType() === 'pro',
    If: () => { throw new Error('Bedrock model initialization is excluded') },
    P2e: () => { throw new Error('Bedrock region selection is excluded') },
    f: lazySchema,
    u: z.object, o: z.string, C: z.number, T: z.array,
    we: () => getClaudeConfigHomeDir(), q_: join, aD: readFileSync,
    gt: safeParseJSON,
    z7e: (...models: (string | undefined)[]) => getServedModelRow(...models),
    cc: apiProvider,
    $x: (model: string) => Object.values(ALL_MODEL_CONFIGS).find(row => Object.values(row).some(value => typeof value === 'string' && value.toLowerCase() === model.toLowerCase())) ?? null,
    zF: (provider = apiProvider()) => ['firstParty','anthropicGoogleCloud','foundry','mantle'].includes(provider),

  }
}
export function getOfficialModelMenuPolicy287() {
  return menuPolicy ??= createModelMenuPolicy287(createOfficialModelMenuPolicyPorts287())
}
export function createOfficialModelMenuPorts287(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const policy = getOfficialModelMenuPolicy287()
  const ports: Record<string, unknown> = {
    ...officialE8Ports287, ...lexical, ...sanitizers, ...policy,
    e8: createOfficialE8ChooserAdapter287(),
    $H: (model: string) => model === 'opusplan' || model === 'haiku',
    $x: (model: string) => Object.values(ALL_MODEL_CONFIGS).find(row => Object.values(row).some(value => typeof value === 'string' && value.toLowerCase() === model.toLowerCase())) ?? null,
    VQe: ALL_MODEL_CONFIGS.fable5, D9o: ALL_MODEL_CONFIGS.fable51,
    Gj: () => catalog,
    // ZX delegates to the already installed quota-credit owner and its cache.
    ZX: () => getQuotaCredit287().r3(),
    KZr: () => getQuotaCredit287().getAccountCreditLatches().fableCreditsRequired(),
    LJn: () => null, // The original 287 LJn declaration returns null.
    N: (value: unknown) => typeof value === 'object' && value !== null && !Array.isArray(value),
    Xw: (key: string, fallback: unknown) => getFeatureValue_CACHED_MAY_BE_STALE(key, fallback),
    YQn: () => ['admin','billing','owner','primary_owner'].includes(getGlobalConfig().oauthAccount?.organizationRole ?? ''),
    bF: () => getServedCatalog(),
    c8: isActiveServedModelCatalog287,
    ppe: getModelCatalogSource287,
    le: () => getGlobalConfig(),
    dpe: (row: {disabled?: boolean; section?: string}) => row.disabled !== true && row.section !== 'deprecated',
    sQn: (row: {section?: string}) => row.section === 'overflow',
    qE: (served: {config: {models?: unknown[]}}) => served.config.models ?? [],
    kp: (model: string) => lexical.Fn(model).trim().toLowerCase(),
    iWt: ['opus','sonnet','haiku'],
    gQn: 'Update Claude Code to use this model',
    t: logForDebugging,
  }
  return {...ports, ...overrides}
}
export function createOfficialModelMenuAdapter287(overrides: Record<string, unknown> = {}) {
  const ports = createOfficialModelMenuPorts287(overrides)
  // Both functions see the same caller-supplied source ports in differential
  // tests; normal callers see only the live owners assembled above.
  if (!Object.hasOwn(overrides, 'e8')) ports.e8 = createOfficialE8Chooser287(ports)
  return createOfficialModelMenu287(ports)
}
export function getOfficialModelMenu287(fastMode = false, diagnostics: ModelMenuDiagnostics287 | null = null) {
  return createOfficialModelMenuAdapter287()(fastMode, diagnostics)
}

// The original producer and UI observer share exactly Xr's maps and signal.
// Network registration belongs to the startup/validation caller (jVo); a pure
// menu read must not secretly probe the API. No fallback entitlement is made.
let reprobeRuntime: ReturnType<typeof createModelMenuReprobe287> | undefined
export function getOfficialModelReprobeRuntime287() {
  return reprobeRuntime ??= createModelMenuReprobe287({
    ...createOfficialModelMenuPolicyPorts287(), ...getOfficialModelMenuPolicy287(),
    Xr: getOfficialModelPickerProviderOwner287,
    Wi: (notice: ModelRestrictionNotice287) => {
      const notify = getOfficialModelPickerProviderOwner287().modelRestrictionNoticeSink287
      if (!notify) throw new Error('Model restriction notification consumer is not mounted')
      notify(notice)
    },
    c: (value: string) => value,
    d: logError,
    i: logEvent,
    p: (feature: string, reason: string) => getModelUsagePolicy287().pricingIgnored(feature, reason),
    m: (feature: string, reason: string) => getModelUsagePolicy287().pricingError(feature, reason),
    y: (event: string, details: Record<string, unknown>) => logEvent(event, details as never),
  })
}
export function bindOfficialModelRestrictionNoticeSink287(notify:(notice:ModelRestrictionNotice287)=>void):()=>void {
  const owner=getOfficialModelPickerProviderOwner287(),previous=owner.modelRestrictionNoticeSink287
  owner.modelRestrictionNoticeSink287=notify
  return ()=>{if(owner.modelRestrictionNoticeSink287===notify)owner.modelRestrictionNoticeSink287=previous}
}
export function mountOfficialModelRestrictionNoticeConsumer287(notify: (notice: ModelRestrictionNotice287) => void,
  listener: (text: string) => void): () => void {
  const owner = getOfficialModelPickerProviderOwner287()
  const previous = owner.modelRestrictionNoticeSink287
  owner.modelRestrictionNoticeSink287 = notify
  const unsubscribe = getOfficialModelReprobeRuntime287().GVo(listener)
  return () => {
    unsubscribe()
    if (owner.modelRestrictionNoticeSink287 === notify) owner.modelRestrictionNoticeSink287 = previous
  }
}
