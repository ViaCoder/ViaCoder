import { z } from 'zod/v4'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { getExecutionSession287 } from '../../services/context/execution287.js'
import { logError } from '../log.js'
import { getGlobalConfig } from '../config.js'
import { safeParseJSON } from '../json.js'
import { getAPIProvider } from './providers.js'
import { getModelBehaviorName287, getModelIdentityName287 } from './behavior287.js'
import { getCatalogCapabilityOverride, getCatalogEntry, getCatalogModelId, getOrgModelDefault } from './catalog.js'
import { get3PModelCapabilityOverride } from './modelSupportOverrides.js'
import { EFFORT_LEVELS, type EffortLevel } from '../effort.js'
import { getServedCapability, getServedDefaultEffort, getServedEffortLevels } from './servedCatalog.js'
import { getEnabledSettingSources, type SettingSource } from '../settings/constants.js'
import { getSettingsForSource } from '../settings/settings.js'
import { parseUserSpecifiedModel } from './model.js'
import { getModelUsagePolicy287 } from '../../services/context/modelUsagePolicy287.js'
import { createOfficialEffortResolver287, createOfficialEffortWc287, createOfficialEffortWc287Helpers287, createOfficialEffortWc287Ny287, type OfficialEffortWc287Ports, type OfficialRequestEffortOptions287 } from './officialEffortWc287/native.js'

function requestEffortUnsupported(model: string): boolean {
  return getExecutionSession287().host.requestLatches.effortUnsupportedModels().has(model)
}

function sourceCapabilityOverride(model: string, capability: string): boolean | undefined {
  if (capability === 'effort' || capability === 'max_effort' || capability === 'xhigh_effort') {
    return get3PModelCapabilityOverride(model, capability)
  }
  return getCatalogCapabilityOverride(model, capability)
}

function providerForModel(_model: string): string {
  // The local provider owner has no gateway/mantle runtime. Do not synthesize
  // those providers; first-party and the configured public foundry owner remain.
  return getAPIProvider()
}

export function bindOfficialEffortWc287Imports287(): OfficialEffortWc287Ports {
  const importedHelpers = createOfficialEffortWc287Helpers287({
    Be: (model, options) => options?.identity ? getModelIdentityName287(model) : getModelBehaviorName287(model),
    le: getGlobalConfig,
  })
  const env = {
    get CLAUDE_CODE_ALWAYS_ENABLE_EFFORT() { return process.env.CLAUDE_CODE_ALWAYS_ENABLE_EFFORT },
    get CLAUDE_CODE_MAX_EFFORT_REMINDER() { return process.env.CLAUDE_CODE_MAX_EFFORT_REMINDER },
    get ANTHROPIC_DEFAULT_FABLE_MODEL() { return process.env.ANTHROPIC_DEFAULT_FABLE_MODEL },
    get CLAUDE_CODE_EFFORT_LEVEL() { return process.env.CLAUDE_CODE_EFFORT_LEVEL },
  }
  const originalNy = createOfficialEffortWc287Ny287({
    zQe: (capability, model) => getCatalogCapabilityOverride(model, capability),
    xa: model => getCatalogEntry(model),
    servedCapabilityLookup: (capability, models) => getServedCapability(capability, ...models),
    featureGateLookup: name => getFeatureValue_CACHED_MAY_BE_STALE<boolean>(name, false),
  })
  return {
    a: env,
    Ape: importedHelpers.Ape,
    Be: (model, options) => options?.identity ? getModelIdentityName287(model) : getModelBehaviorName287(model),
    bkn: requestEffortUnsupported,
    bu: () => getModelUsagePolicy287().allPolicyTiers(),
    cc: providerForModel,
    cQn: (...models) => getServedEffortLevels(...models),
    Ct: importedHelpers.Ct,
    d: error => logError(error),
    Dbe: sourceCapabilityOverride,
    de: z.record,
    ge: (source: SettingSource) => getSettingsForSource(source),
    gt: (value, parseOptions = true) => safeParseJSON(value, parseOptions),
    He: getAPIProvider,
    Jm: importedHelpers.Jm,
    JU: () => getExecutionSession287().modelSelection.refusalFallbackModelLatch() ?? undefined,
    k: <T extends string | boolean | Readonly<Record<string, string | boolean | undefined>>>(name: string, fallback: T): T =>
      getFeatureValue_CACHED_MAY_BE_STALE<T>(name, fallback),
    Kc: () => getExecutionSession287().modelSelection.mainLoopModelOverride(),
    nu: EFFORT_LEVELS,
    ny: originalNy,
    o: z.string,
    Rt: model => parseUserSpecifiedModel(model),
    se: () => z.enum(EFFORT_LEVELS),
    UVo: (...models) => getServedDefaultEffort(...models),
    V0: importedHelpers.V0,
    Xo: getEnabledSettingSources,
    xa: getCatalogEntry,
    Z: importedHelpers.Z,
    Z7e: () => {
      const value = getOrgModelDefault()
      if (value === null) return null
      return {
        name: value.name,
        default_effort_level: value.default_effort_level,
        ...(typeof value.override_user_effort === 'boolean' && {override_user_effort: value.override_user_effort}),
      }
    },
    zF: provider => provider === 'firstParty' || provider === 'foundry',
    zQe: (capability, model) => getCatalogCapabilityOverride(model, capability),
  }
}

export function createBoundOfficialEffortWc287287(): ReturnType<typeof createOfficialEffortWc287> {
  return createOfficialEffortWc287(bindOfficialEffortWc287Imports287())
}

const sourceEffort = createOfficialEffortResolver287(bindOfficialEffortWc287Imports287())

/** Exact 2.1.287 WC→KA→jb closure, bound to current local public first-party owners. */
export function resolveOfficialEffortWc287(
  model: string,
  effort: EffortLevel | number | undefined,
  turnEffort?: EffortLevel | number,
): EffortLevel | number | undefined {
  return sourceEffort.resolve(model, effort, turnEffort)
}

/** Use the same WC owner for Pao, with its live main-loop session snapshot. */
export function resolveOfficialPaoEffortWc287(model: string): EffortLevel | number | undefined {
  const snapshot = getExecutionSession287().modelSelection.mainLoopEffortState()
  const effort = snapshot?.sessionEffort.kind === 'level' ? snapshot.sessionEffort.value : undefined
  return resolveOfficialEffortWc287(model, effort)
}

/** Original hook input capability/level helpers, sharing the same effort owner. */
export const supportsOfficialHookEffort287=sourceEffort.supports
export const resolveOfficialHookEffort287=sourceEffort.hookLevel

/** Original jb request-level output; unlike hook KA it preserves numeric effort. */
export function resolveOfficialSideQueryEffort287(model:string,effort:EffortLevel|number|undefined,options?:OfficialRequestEffortOptions287):EffortLevel|number|undefined {
  return sourceEffort.requestLevel(model,effort,options)
}
