// biome-ignore-all assist/source/organizeImports: ANT-ONLY import markers must not be reordered
/**
 * Ensure that any model codenames introduced here are also added to
 * scripts/excluded-strings.txt to avoid leaking them. Wrap any codename string
 * literals with process.env.USER_TYPE === 'ant' for Bun to remove the codenames
 * during dead code elimination
 */
import { catalog } from '../../vendor/official-model-catalog/catalog.js'
import {canonicalName287} from './canonical287.js'
import {modelPromptMetadata287} from './promptMetadata287.js'
import {getModelBehaviorName287} from './behavior287.js'
import {getOfficialModelMenuPolicy287} from './officialModelPicker287.js'
import { getCatalogEntry, getOrgModelDefault } from './catalog.js'
import { getGlobalConfig } from '../config.js'
import { getServedCatalog, getServedModelRow } from './servedCatalog.js'
import { servedRowLabel } from './servedPicker.js'
import { applyOrganizationDefaultMigration } from './organizationDefaultMigration.js'
import { getIsNonInteractiveSession, getMainLoopModelOverride } from '../../bootstrap/state.js'
import {
  getSubscriptionType,
  isClaudeAISubscriber,
  isMaxSubscriber,
  isProSubscriber,
  isTeamPremiumSubscriber,
} from '../auth.js'
import {
  has1mContext,
  is1mContextDisabled,
  modelSupports1M,
} from '../context.js'
import { isEnvTruthy } from '../envUtils.js'
import { getModelStrings } from './modelStrings.js'
import { CANONICAL_ID_TO_KEY, type CanonicalModelId } from './configs.js'
import { formatModelPricing, getOpus46CostTier } from '../modelCost.js'
import { getSettingsForSource, getSettings_DEPRECATED } from '../settings/settings.js'
import type { PermissionMode } from '../permissions/PermissionMode.js'
import { getAPIProvider, isFirstPartyAnthropicBaseUrl } from './providers.js'
import { LIGHTNING_BOLT } from '../../constants/figures.js'
import { isModelAllowed } from './modelAllowlist.js'
import { type ModelAlias, isModelAlias } from './aliases.js'
import { capitalize } from '../stringUtils.js'
import {
  getAntModelOverrideConfig,
  resolveAntModel,
} from './antModels.js'

export type ModelShortName = string
export type ModelName = string
export type ModelSetting = ModelName | ModelAlias | null

export function getSmallFastModel(): ModelName {
  return process.env.ANTHROPIC_SMALL_FAST_MODEL || getDefaultHaikuModel()
}

export function isNonCustomOpusModel(model: ModelName): boolean {
  return (
    model === getModelStrings().opus40 ||
    model === getModelStrings().opus41 ||
    model === getModelStrings().opus45 ||
    model === getModelStrings().opus46 ||
    model === getModelStrings().opus47 ||
    model === getModelStrings().opus48 ||
    model === getModelStrings().opus5 ||
    model === getModelStrings().opus55
  )
}

/**
 * Helper to get the model from /model (including via /config), the --model flag, environment variable,
 * or the saved settings. The returned value can be a model alias if that's what the user specified.
 * Undefined if the user didn't configure anything, in which case we fall back to
 * the default (null).
 *
 * Priority order within this function:
 * 1. Model override during session (from /model command) - highest priority
 * 2. Model override at startup (from --model flag)
 * 3. ANTHROPIC_MODEL environment variable
 * 4. Settings (from user's saved settings)
 */
export function getUserSpecifiedModelSetting(): ModelSetting | undefined {
  let specifiedModel: ModelSetting | undefined

  const modelOverride = getMainLoopModelOverride()
  if (modelOverride !== undefined) {
    specifiedModel = modelOverride
  } else {
    const settings = getSettings_DEPRECATED() || {}
    specifiedModel = process.env.ANTHROPIC_MODEL || applyOrganizationDefaultMigration(settings.model || undefined, getIsNonInteractiveSession())

  }

  // Ignore the user-specified model if it's not in the availableModels allowlist.
  if (specifiedModel && !isModelAllowed(specifiedModel)) {
    return undefined
  }

  return specifiedModel
}

/**
 * Get the main loop model to use for the current session.
 *
 * Model Selection Priority Order:
 * 1. Model override during session (from /model command) - highest priority
 * 2. Model override at startup (from --model flag)
 * 3. ANTHROPIC_MODEL environment variable
 * 4. Settings (from user's saved settings)
 * 5. Built-in default
 *
 * @returns The resolved model name to use
 */
export function getMainLoopModel(): ModelName {
  const model = getUserSpecifiedModelSetting()
  if (model !== undefined && model !== null) {
    return parseUserSpecifiedModel(model)
  }
  return getDefaultMainLoopModel()
}

export function getBestModel(): ModelName {
  return getDefaultFableModel()
}

// npm 2.1.284 aUe → hh → As. Resolve aliases through the whole official
// catalog, preserving provider fallbacks and settings-based provider IDs.
function getBakedFamilyModel(family: keyof typeof catalog.aliases): ModelName | undefined {
  const provider = getAPIProvider()
  const alias = catalog.aliases[family]
  const overrides = 'per_provider' in alias ? alias.per_provider as Record<string, string> : undefined
  const id = overrides && Object.hasOwn(overrides, provider) ? overrides[provider]! : alias.default
  const canonical = getCatalogEntry(id)?.provider_ids.first_party
  const key = canonical === undefined ? undefined : CANONICAL_ID_TO_KEY[canonical as CanonicalModelId]
  return key === undefined ? undefined : getModelStrings()[key]
}

export function getDefaultOpusModel(): ModelName {
  return process.env.ANTHROPIC_DEFAULT_OPUS_MODEL ?? getBakedFamilyModel('opus') ?? getModelStrings().opus55
}

export function getDefaultSonnetModel(): ModelName {
  return process.env.ANTHROPIC_DEFAULT_SONNET_MODEL ?? getBakedFamilyModel('sonnet') ?? getModelStrings().sonnet46
}

export function getDefaultFableModel(): ModelName {
  return process.env.ANTHROPIC_DEFAULT_FABLE_MODEL ?? getBakedFamilyModel('fable') ?? getModelStrings().fable51
}

export function getDefaultHaikuModel(): ModelName {
  return process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL ?? getBakedFamilyModel('haiku') ?? getModelStrings().haiku45
}

/**
 * Get the model to use for runtime, depending on the runtime context.
 * @param params Subset of the runtime context to determine the model to use.
 * @returns The model to use
 */
export function getRuntimeMainLoopModel(params: {
  permissionMode: PermissionMode
  mainLoopModel: string
  exceeds200kTokens?: boolean
}): ModelName {
  const { permissionMode, mainLoopModel, exceeds200kTokens = false } = params

  // opusplan uses Opus in plan mode without [1m] suffix.
  if (
    getUserSpecifiedModelSetting() === 'opusplan' &&
    permissionMode === 'plan' &&
    !exceeds200kTokens
  ) {
    return getDefaultOpusModel()
  }

  // sonnetplan by default
  if (getUserSpecifiedModelSetting() === 'haiku' && permissionMode === 'plan') {
    return getDefaultSonnetModel()
  }

  return mainLoopModel
}

/**
 * Get the default main loop model setting.
 *
 * This handles the built-in default:
 * - Opus for Max and Team Premium users
 * - the current Sonnet alias for all other first-party users (including Team Standard, Pro, Enterprise)
 *
 * @returns The default model setting to use
 */
// Official _un/Sun/th/kV: use only recognized, permitted org/served
// defaults. Metadata does not make an unavailable family selectable.
export function getOrganizationDefaultModel(): ModelName | undefined {
  const served = getServedCatalog()
  const org = served === null ? getOrgModelDefault() : null
  const value = served?.state?.org_enforced_default_model?.trim() || served?.state?.model?.trim() || org?.name.trim()
  if (!value || /(?:^|-)mythos(?:-|$)/i.test(value) || served !== null && isModelAlias(value.toLowerCase())) return undefined
  const resolved = parseUserSpecifiedModel(value)
  const row = getServedModelRow(value, resolved)
  const recognized = isModelAlias(value.toLowerCase()) || getCatalogEntry(getCanonicalName(resolved)) !== undefined ||
    (row?.behaves_as != null && !/(?:^|-)mythos(?:-|$)/i.test(row.behaves_as) && getCatalogEntry(getCanonicalName(row.behaves_as)) !== undefined) ||
    getGlobalConfig().additionalModelOptionsCache?.some(option => !option.disabled && option.value?.toLowerCase() === value.toLowerCase()) ||
    Object.values(getInitialSettingsForModelOverrides()).some(model => model.toLowerCase() === value.toLowerCase())
  if (!recognized || row?.disabled || row?.section === 'deprecated' || !isModelAllowed(resolved)) return undefined
  const access = getGlobalConfig().modelAccessCache
  if (Array.isArray(access) && access.length > 0 && !access.some(entry => entry.entitled &&
    getCanonicalName(entry.apiName) === getCanonicalName(resolved))) return undefined
  return value
}
function getInitialSettingsForModelOverrides(): Record<string, string> {
  return getSettings_DEPRECATED().modelOverrides ?? {}
}

export function getDefaultMainLoopModelSetting(): ModelName | ModelAlias {
  // Keep the established ANT-only flag override. Public Default selection and
  // its menu description must share original j3/Py, including managed/default
  // steering and deny fallbacks, rather than a second hand-written tier choice.
  if (process.env.USER_TYPE === 'ant') {
    const org = getOrganizationDefaultModel()
    if (org !== undefined) return org
    return getAntModelOverrideConfig()?.defaultModel ?? getDefaultOpusModel() + '[1m]'
  }
  return getOfficialModelMenuPolicy287().Py()
}

/**
 * Synchronous operation to get the default main loop model to use
 * (bypassing any user-specified values).
 */
export function getDefaultMainLoopModel(): ModelName {
  return parseUserSpecifiedModel(getDefaultMainLoopModelSetting())
}

// @[MODEL LAUNCH]: Add a canonical name mapping for the new model below.
/**
 * Pure string-match that strips date/provider suffixes from a first-party model
 * name. Input must already be a 1P-format ID (e.g. 'claude-3-7-sonnet-20250219',
 * 'us.anthropic.claude-opus-4-6-v1:0'). Does not touch settings, so safe at
 * module top-level (see MODEL_COSTS in modelCost.ts).
 */
export function firstPartyNameToCanonical(name: ModelName): ModelShortName {
  return canonicalName287(name)
}

/**
 * Maps a full model string to a shorter canonical version that's unified across 1P and 3P providers.
 * For example, 'claude-3-5-haiku-20241022' and 'us.anthropic.claude-3-5-haiku-20241022-v1:0'
 * would both be mapped to 'claude-3-5-haiku'.
 * @param fullModelName The full model name (e.g., 'claude-3-5-haiku-20241022')
 * @returns The short name (e.g., 'claude-3-5-haiku') if found, or the original name if no mapping exists
 */
export function getCanonicalName(fullModelName: ModelName): ModelShortName {
  // Resolve overridden model IDs (e.g. Bedrock ARNs) back to canonical names.
  // resolved is always a 1P-format ID, so firstPartyNameToCanonical can handle it.
  return getModelBehaviorName287(fullModelName)
}

// @[MODEL LAUNCH]: Update the default model description strings shown to users.
export function getClaudeAiUserDefaultModelDescription(
  fastMode = false,
): string {
  const opusName = getMarketingNameForModel(getDefaultOpusModel()) ?? 'Opus'
  const sonnetName = getMarketingNameForModel(getDefaultSonnetModel()) ?? 'Sonnet'
  if (isMaxSubscriber() || isTeamPremiumSubscriber()) {
    if (isOpus1mMergeEnabled()) {
      return `${opusName} with 1M context · Best for everyday, complex tasks${fastMode ? getOpus46PricingSuffix(true) : ''}`
    }
    return `${opusName} · Best for everyday, complex tasks${fastMode ? getOpus46PricingSuffix(true) : ''}`
  }
  return `${sonnetName} · Efficient for routine tasks`
}

export function renderDefaultModelSetting(
  setting: ModelName | ModelAlias,
): string {
  if (setting === 'opusplan') {
    const opusName = getMarketingNameForModel(getDefaultOpusModel()) ?? 'Opus'
    const sonnetName = getMarketingNameForModel(getDefaultSonnetModel()) ?? 'Sonnet'
    return `${opusName} in plan mode, else ${sonnetName}`
  }
  return renderModelName(parseUserSpecifiedModel(setting))
}

export function getOpus46PricingSuffix(fastMode: boolean): string {
  if (getAPIProvider() !== 'firstParty') return ''
  const pricing = formatModelPricing(getOpus46CostTier(fastMode))
  const fastModeIndicator = fastMode ? ` (${LIGHTNING_BOLT})` : ''
  return ` ·${fastModeIndicator} ${pricing}`
}

export function isOpus1mMergeEnabled(): boolean {
  if (
    is1mContextDisabled() ||
    isProSubscriber() ||
    getAPIProvider() !== 'firstParty'
  ) {
    return false
  }
  // Fail closed when a subscriber's subscription type is unknown. The VS Code
  // config-loading subprocess can have OAuth tokens with valid scopes but no
  // subscriptionType field (stale or partial refresh). Without this guard,
  // isProSubscriber() returns false for such users and the merge leaks
  // opus[1m] into the model dropdown — the API then rejects it with a
  // misleading "rate limit reached" error.
  if (isClaudeAISubscriber() && getSubscriptionType() === null) {
    return false
  }
  return true
}

export function renderModelSetting(setting: ModelName | ModelAlias): string {
  if (setting === 'opusplan') {
    return 'Opus Plan'
  }
  if (isModelAlias(setting)) {
    return capitalize(setting)
  }
  return renderModelName(setting)
}

// @[MODEL LAUNCH]: Add display name cases for the new model (base + [1m] variant if applicable).
/**
 * Returns a human-readable display name for known public models, or null
 * if the model is not recognized as a public model.
 */
export function getPublicModelDisplayName(model: ModelName): string | null {
  switch (model) {
    case getModelStrings().fable51 + '[1m]':
      return 'Fable 5.1 (1M context)'
    case getModelStrings().fable5 + '[1m]':
      return 'Fable 5 (1M context)'
    case getModelStrings().fable51:
      return 'Fable 5.1'
    case getModelStrings().fable5:
      return 'Fable 5'
    case getModelStrings().opus55:
      return 'Opus 5.5'
    case getModelStrings().opus5:
      return 'Opus 5'
    case getModelStrings().opus48:
      return 'Opus 4.8'
    case getModelStrings().opus47:
      return 'Opus 4.7'
    case getModelStrings().opus46:
      return 'Opus 4.6'
    case getModelStrings().opus46 + '[1m]':
      return 'Opus 4.6 (1M context)'
    case getModelStrings().opus45:
      return 'Opus 4.5'
    case getModelStrings().opus41:
      return 'Opus 4.1'
    case getModelStrings().opus40:
      return 'Opus 4'
    case getModelStrings().sonnet46 + '[1m]':
      return 'Sonnet 4.6 (1M context)'
    case getModelStrings().sonnet55 + '[1m]':
      return 'Sonnet 5.5 (1M context)'
    case getModelStrings().sonnet55:
      return 'Sonnet 5.5'
    case getModelStrings().sonnet5 + '[1m]':
      return 'Sonnet 5 (1M context)'
    case getModelStrings().sonnet5:
      return 'Sonnet 5'
    case getModelStrings().sonnet46:
      return 'Sonnet 4.6'
    case getModelStrings().sonnet45 + '[1m]':
      return 'Sonnet 4.5 (1M context)'
    case getModelStrings().sonnet45:
      return 'Sonnet 4.5'
    case getModelStrings().sonnet40:
      return 'Sonnet 4'
    case getModelStrings().sonnet40 + '[1m]':
      return 'Sonnet 4 (1M context)'
    case getModelStrings().sonnet37:
      return 'Sonnet 3.7'
    case getModelStrings().sonnet35:
      return 'Sonnet 3.5'
    case getModelStrings().haiku45:
      return 'Haiku 4.5'
    case getModelStrings().haiku35:
      return 'Haiku 3.5'
    default:
      return null
  }
}

function maskModelCodename(baseName: string): string {
  // Mask only the first dash-separated segment (the codename), preserve the rest
  // e.g. capybara-v2-fast → cap*****-v2-fast
  const [codename = '', ...rest] = baseName.split('-')
  const masked =
    codename.slice(0, 3) + '*'.repeat(Math.max(0, codename.length - 3))
  return [masked, ...rest].join('-')
}

export function renderModelName(model: ModelName): string {
  const publicName = getPublicModelDisplayName(model)
  if (publicName) {
    return publicName
  }
  if (process.env.USER_TYPE === 'ant') {
    const resolved = parseUserSpecifiedModel(model)
    const antModel = resolveAntModel(model)
    if (antModel) {
      const baseName = antModel.model.replace(/\[1m\]$/i, '')
      const masked = maskModelCodename(baseName)
      const suffix = has1mContext(resolved) ? '[1m]' : ''
      return masked + suffix
    }
    if (resolved !== model) {
      return `${model} (${resolved})`
    }
    return resolved
  }
  return model
}

/**
 * Returns a safe author name for public display (e.g., in git commit trailers).
 * Returns "Claude {ModelName}" for publicly known models, or "Claude ({model})"
 * for unknown/internal models so the exact model name is preserved.
 *
 * @param model The full model name
 * @returns "Claude {ModelName}" for public models, or "Claude ({model})" for non-public models
 */
export function getPublicModelName(model: ModelName): string {
  const publicName = getPublicModelDisplayName(model)
  if (publicName) {
    return `Claude ${publicName}`
  }
  return `Claude (${model})`
}

/**
 * Returns a full model name for use in this session, possibly after resolving
 * a model alias.
 *
 * This function intentionally does not support version numbers to align with
 * the model switcher.
 *
 * Supports [1m] suffix on any model alias (e.g., haiku[1m], sonnet[1m]) to enable
 * 1M context window without requiring each variant to be in MODEL_ALIASES.
 *
 * @param modelInput The model alias or name provided by the user.
 */
export function parseUserSpecifiedModel(
  modelInput: ModelName | ModelAlias,
): ModelName {
  const modelInputTrimmed = modelInput.trim()
  const normalizedModel = modelInputTrimmed.toLowerCase()

  const has1mTag = has1mContext(normalizedModel)
  const modelString = has1mTag
    ? normalizedModel.replace(/\[1m]$/i, '').trim()
    : normalizedModel

  if (isModelAlias(modelString)) {
    switch (modelString) {
      case 'opusplan':
        return getDefaultSonnetModel() + (has1mTag ? '[1m]' : '') // Sonnet is default, Opus in plan mode
      case 'sonnet':
        return getDefaultSonnetModel() + (has1mTag ? '[1m]' : '')
      case 'haiku':
        return getDefaultHaikuModel() + (has1mTag ? '[1m]' : '')
      case 'fable':
        return getDefaultFableModel() + (has1mTag ? '[1m]' : '')
      case 'opus':
        return getDefaultOpusModel() + (has1mTag ? '[1m]' : '')
      case 'best':
        return getBestModel()
      default:
    }
  }

  // Opus 4/4.1 are no longer available on the first-party API (same as
  // Claude.ai) — silently remap to the current Opus default. The 'opus'
  // alias already resolves to 4.6, so the only users on these explicit
  // strings pinned them in settings/env/--model/SDK before 4.5 launched.
  // Custom Anthropic-compatible endpoints may transparently forward the
  // original model ID; only the actual first-party origin owns this remap.
  if (
    getAPIProvider() === 'firstParty' &&
    isFirstPartyAnthropicBaseUrl() &&
    isLegacyOpusFirstParty(modelString) &&
    isLegacyModelRemapEnabled()
  ) {
    return getDefaultOpusModel() + (has1mTag ? '[1m]' : '')
  }

  if (process.env.USER_TYPE === 'ant') {
    const has1mAntTag = has1mContext(normalizedModel)
    const baseAntModel = normalizedModel.replace(/\[1m]$/i, '').trim()

    const antModel = resolveAntModel(baseAntModel)
    if (antModel) {
      const suffix = has1mAntTag ? '[1m]' : ''
      return antModel.model + suffix
    }

    // Fall through to the alias string if we cannot load the config. The API calls
    // will fail with this string, but we should hear about it through feedback and
    // can tell the user to restart/wait for flag cache refresh to get the latest values.
  }

  // Preserve original case for custom model names (e.g., Azure Foundry deployment IDs)
  // Only strip [1m] suffix if present, maintaining case of the base model
  if (has1mTag) {
    return modelInputTrimmed.replace(/\[1m\]$/i, '').trim() + '[1m]'
  }
  return modelInputTrimmed
}

/**
 * Resolves a skill's `model:` frontmatter against the current model, carrying
 * the `[1m]` suffix over when the target family supports it.
 *
 * A skill author writing `model: opus` means "use opus-class reasoning" — not
 * "downgrade to 200K". If the user is on opus[1m] at 230K tokens and invokes a
 * skill with `model: opus`, passing the bare alias through drops the effective
 * context window from 1M to 200K, which trips autocompact at 23% apparent usage
 * and surfaces "Context limit reached" even though nothing overflowed.
 *
 * We only carry [1m] when the target actually supports it (sonnet/opus). A skill
 * with `model: haiku` on a 1M session still downgrades — haiku has no 1M variant,
 * so the autocompact that follows is correct. Skills that already specify [1m]
 * are left untouched.
 */
export function resolveSkillModelOverride(
  skillModel: string,
  currentModel: string,
): string {
  if (has1mContext(skillModel) || !has1mContext(currentModel)) {
    return skillModel
  }
  // modelSupports1M matches on canonical IDs for the current Opus, Sonnet, and Fable families;
  // a bare 'opus' alias falls through getCanonicalName unmatched. Resolve first.
  if (modelSupports1M(parseUserSpecifiedModel(skillModel))) {
    return skillModel + '[1m]'
  }
  return skillModel
}

const LEGACY_OPUS_FIRSTPARTY = [
  'claude-opus-4-20250514',
  'claude-opus-4-1-20250805',
  'claude-opus-4-0',
  'claude-opus-4-1',
]

function isLegacyOpusFirstParty(model: string): boolean {
  return LEGACY_OPUS_FIRSTPARTY.includes(model)
}

/**
 * Opt-out for the legacy Opus 4.0/4.1 → current Opus remap.
 */
export function isLegacyModelRemapEnabled(): boolean {
  return !isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP)
}

export function modelDisplayString(model: ModelSetting): string {
  if (model === null) {
    if (process.env.USER_TYPE === 'ant') {
      return `Default for Ants (${renderDefaultModelSetting(getDefaultMainLoopModelSetting())})`
    } else if (isClaudeAISubscriber()) {
      return `Default (${getClaudeAiUserDefaultModelDescription()})`
    }
    return `Default (${getDefaultMainLoopModel()})`
  }
  const resolvedModel = parseUserSpecifiedModel(model)
  const served = getServedModelRow(model, resolvedModel)
  if (served && (served.name || served.short_name || served.confidential)) return servedRowLabel(served)
  return model === resolvedModel ? resolvedModel : `${model} (${resolvedModel})`
}

// @[MODEL LAUNCH]: Add a marketing name mapping for the new model below.
export function getMarketingNameForModel(modelId: string): string | undefined {
  return modelPromptMetadata287.marketingName(modelId)
}

export function normalizeModelStringForAPI(model: string): string {
  return model.replace(/\[(1|2)m\]/gi, '')
}
