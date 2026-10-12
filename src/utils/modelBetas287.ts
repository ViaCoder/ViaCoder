import {createOfficialModelBetas287, type BetaOwner287, type BetaToken287, type ModelBetaPorts287} from './officialModelBetas287/native.js'
import {getNativeAPIProvider287} from './model/providerSelectionBindings287.js'
import {getModelBehaviorName287} from './model/behavior287.js'
import {getCatalogCapabilityOverride, getCatalogEntry} from './model/catalog.js'
import {getServedCapability} from './model/servedCatalog.js'
import {getCanonicalRoot287} from './model/canonical287.js'
import type {CanonicalRoot287} from './model/officialModelBehavior287/native.js'
import {isFirstPartyRequestEndpoint} from './model/providers.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getAnthropicApiKey, isClaudeAISubscriber} from './auth.js'
import {hasWorkloadIdentityConfiguration} from './workloadIdentity.js'
import {authEnvironment} from './authEnvironment.js'
import {getInitialSettings} from './settings/settings.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {oc as hasComplianceTaint} from '../vendor/official-files-api/taints.js'
import {logForDebugging} from './debug.js'

// Xr is the SAME original model-state/cache owner as bootstrap and f8/s_e.
// Initialization is lazy: no eager owner getter inside the import cycle.
export function getModelBetaOwner287(): BetaOwner287 {
  const picker=require('./model/officialModelPicker287.js') as typeof import('./model/officialModelPicker287.js')
  // Full raw yA provider/reprobe fields are initialized on the existing Xr.
  // The cold beta reader must not require UI/bootstrap to run first.
  const owner=picker.getOfficialModelPickerProviderOwner287() as ReturnType<typeof picker.getOfficialModelPickerProviderOwner287>&Partial<BetaOwner287>
  if(typeof owner.servedCatalogSuppressDepth!=='number')throw new TypeError('Missing canonical servedCatalogSuppressDepth')
  owner.betas ??= getModelBetaProducer287().Qr()
  owner.betasCompiledOnly ??= getModelBetaProducer287().Qr()
  return owner as BetaOwner287
}
function supportedProvider(): string {
  const provider = getNativeAPIProvider287()
  if (provider !== 'firstParty' && provider !== 'foundry') {
    throw new Error(`Model beta producer excludes ${provider} transport (R04)`)
  }
  // Raw He is a provider read, not a picker/cache initializer. Xr remains
  // owned by getModelBehaviorMemoOwner287; policy checks must not reset it.
  return provider
}
function canonicalRoot(): CanonicalRoot287 {
  const root = getCanonicalRoot287() as CanonicalRoot287
  root.servedCapabilityLookup ??= (capability, models) => getServedCapability(capability, ...models)
  root.featureGateLookup ??= name => getFeatureValue_CACHED_MAY_BE_STALE(name, false)
  return root
}
export function bindModelBetaPorts287(): ModelBetaPorts287 {
  const owner=(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
  const registry=owner.clearSourceModule287('chunk-xep95vq1.js').Wi
  if(!(registry instanceof Map)||!registry.size)throw new TypeError('Missing canonical beta registry')
  for(const token of registry.values())if(typeof token!=='object'||token===null||typeof token.name!=='string'||typeof token.header!=='string')throw new TypeError('Invalid canonical beta token')
  return {
  betaRegistry:registry,
  Xr: getModelBetaOwner287,
  a: authEnvironment,
  Be: model => getModelBehaviorName287(model),
  He: supportedProvider,
  cc: () => supportedProvider(),
  zF: provider => provider === 'firstParty' || provider === 'foundry',
  cL: canonicalRoot,
  zQe: (capability, model) => getCatalogCapabilityOverride(model, capability),
  xa: model => getCatalogEntry(model),
  ol: regime => hasComplianceTaint(regime),
  ft: () => isClaudeAISubscriber(),
  uwn: () => getAnthropicApiKey() !== null,
  fd: () => hasWorkloadIdentityConfiguration(),
  Ce: () => !getExecutionSession287().host.launchOptions.isInteractive(),
  tt: () => getInitialSettings(),
  k: (name, fallback) => getFeatureValue_CACHED_MAY_BE_STALE(name, fallback),
  // Full original Je already implements these methods. Narrow the existing
  // host interface here; do not add a parallel refused-header collection.
  Ano: () => (getExecutionSession287().host.requestLatches as unknown as {
    refusedBetaHeaders(): Set<BetaToken287>
  }).refusedBetaHeaders(),
  od: () => isFirstPartyRequestEndpoint(),
  t: (message, options) => logForDebugging(message, {level: options.level === 'debug' ? 'debug' : 'info'}),
} }
let producer:ReturnType<typeof createOfficialModelBetas287>|undefined
export const getModelBetaProducer287=()=>producer??=createOfficialModelBetas287(bindModelBetaPorts287())

// Hoisted callables are required by the existing betas/model/auth import cycle.
// .cache is a live getter onto original token Maps, not a parallel header cache.
export function getAllModelBetas287(model: string): string[] {
  supportedProvider(); return getModelBetaProducer287().sT(getModelBetaProducer287().iwn(model))
}
export function getModelBetas287(model: string): string[] {
  supportedProvider(); return getModelBetaProducer287().sT(getModelBetaProducer287().eZ(model))
}
export namespace getAllModelBetas287 { export declare const cache: Map<string, BetaToken287[]> }
export namespace getModelBetas287 { export declare const cache: Map<string, BetaToken287[]> }
function cache(field: 'allModelBetas' | 'modelBetas') {
  const owner = getModelBetaOwner287()
  return (getModelBetaProducer287().XQ() ? owner.betasCompiledOnly : owner.betas)[field]
}
Object.defineProperty(getAllModelBetas287, 'cache', {get: () => cache('allModelBetas')})
Object.defineProperty(getModelBetas287, 'cache', {get: () => cache('modelBetas')})
export function clearModelBetas287(): void { getModelBetaProducer287().Ej() }
