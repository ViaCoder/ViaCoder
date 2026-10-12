import { getGlobalConfig } from './config.js'
import { getEnabledSettingSources } from './settings/constants.js'
import { getPluginSettingsBase } from './settings/settingsCache.js'
import { getEffortModelKey, getSettingsEffortTable, getOrgEffort, resolveSettingsEffort, resolveSessionEffort, type SessionEffort } from './model/effortSettings.js'
import { getServedEffortLevels, getServedDefaultEffort, getServedCapability } from './model/servedCatalog.js'
import { getCanonicalName, getDefaultOpusModel, getMarketingNameForModel } from './model/model.js'
import { getCatalogEntry, getCatalogModelId, getCatalogCapabilityOverride } from './model/catalog.js'
// biome-ignore-all assist/source/organizeImports: ANT-ONLY import markers must not be reordered
import { getSettingsForSource } from './settings/settings.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from 'src/services/analytics/growthbook.js'
import { getAPIProvider } from './model/providers.js'
import { get3PModelCapabilityOverride } from './model/modelSupportOverrides.js'
import type { EffortLevel } from 'src/entrypoints/sdk/runtimeTypes.js'

export type { EffortLevel }
import {EFFORT_LEVELS} from './model/effortLevels.js'
export {EFFORT_LEVELS} from './model/effortLevels.js'

// Transport adapter for official W/te/JF tri-state. Existing model request
// callers already pass this field: undefined=inherit, null=model default,
// string/number=explicit level. null is consumed here, never sent to the API.
export type EffortValue = EffortLevel | number | null

// Capability order follows official chunk-fr7r2xfj.js:Ob/SK/_he/H.
function supportsEffortCapability(model: string, capability: 'effort' | 'max_effort' | 'xhigh_effort'): boolean {
  const providerOverride = get3PModelCapabilityOverride(model, capability)
  if (providerOverride !== undefined) return providerOverride
  const id = getCatalogModelId(getCanonicalName(model))
  if (capability !== 'effort' && getCatalogCapabilityOverride(id, 'effort') === false) return false
  const override = getCatalogCapabilityOverride(id, capability)
  if (override !== undefined) return override && (capability === 'effort' || modelSupportsEffort(model))
  const served = getServedEffortLevels(model, id)
  if (served !== undefined) return capability === 'effort' ? served.length > 0 : served.includes(capability === 'max_effort' ? 'max' : 'xhigh')
  const legacy = ['claude-opus-4-0', 'claude-opus-4-1', 'claude-sonnet-4-0', 'claude-sonnet-4-5', 'claude-haiku-4-5']
  if (capability !== 'effort') legacy.push('claude-opus-4-5')
  if (capability === 'xhigh_effort') legacy.push('claude-opus-4-6', 'claude-sonnet-4-6')
  if (id.includes('claude-3-') || legacy.includes(id)) return false
  if (capability === 'effort' && process.env.CLAUDE_CODE_ALWAYS_ENABLE_EFFORT) return true
  if (getServedCapability(capability, model, id) || getCatalogEntry(id)?.capabilities.includes(capability)) return true
  return getAPIProvider() === 'firstParty' || getAPIProvider() === 'foundry'
}
export function modelSupportsEffort(model: string): boolean {
  return supportsEffortCapability(model, 'effort')
}
export function modelSupportsMaxEffort(model: string): boolean {
  return supportsEffortCapability(model, 'max_effort')
}
export function modelSupportsXHighEffort(model: string): boolean {
  return supportsEffortCapability(model, 'xhigh_effort')
}

// The strictest source wins; a per-model cap replaces that source's global cap.
// Official RMt/Y/pV, including the account-provided cap from bootstrap.
export function getLocalEffortCap(model: string): EffortLevel | null {
  const id = getEffortModelKey(model)
  const caps: EffortLevel[] = []
  const sources = [getPluginSettingsBase(), ...getEnabledSettingSources().map(getSettingsForSource)] as (import('./model/effortSettings.js').EffortSettings | null | undefined)[]
  for (const settings of sources) {
    if (!settings) continue
    const perModel = Object.entries(settings.modelSettings ?? {})
      .filter(([key]) => getEffortModelKey(key) === id)
      .map(([, value]) => value?.maxEffortLevel).filter((value): value is EffortLevel => value !== undefined)
    perModel.sort((a, b) => EFFORT_LEVELS.indexOf(a) - EFFORT_LEVELS.indexOf(b))
    const cap = perModel[0] ?? settings.maxEffortLevel
    if (cap !== undefined) caps.push(cap)
  }
  caps.sort((a, b) => EFFORT_LEVELS.indexOf(a) - EFFORT_LEVELS.indexOf(b))
  return caps[0] === undefined || caps[0] === 'max' ? null : caps[0]
}
export function getEffortCap(model: string): EffortLevel | null {
  const id = getEffortModelKey(model)
  const localCap = getLocalEffortCap(model)
  const caps: EffortLevel[] = localCap === null ? [] : [localCap]
  if (getAPIProvider() === 'firstParty') {
    const entries = getGlobalConfig().modelAccessCache
    const cap = (Array.isArray(entries) ? entries : []).find(entry => entry && typeof entry.apiName === 'string' && typeof entry.entitled === 'boolean' && getEffortModelKey(entry.apiName) === id)?.maxEffortLevel
    if (cap && isEffortLevel(cap)) caps.push(cap)
  }
  caps.sort((a, b) => EFFORT_LEVELS.indexOf(a) - EFFORT_LEVELS.indexOf(b))
  return caps[0] === undefined || caps[0] === 'max' ? null : caps[0]
}
export function clampEffortLevel(value: EffortLevel, model: string): EffortLevel {
  const cap = getEffortCap(model)
  const clamped = cap && EFFORT_LEVELS.indexOf(value) > EFFORT_LEVELS.indexOf(cap) ? cap : value
  if (clamped === 'max' && !modelSupportsMaxEffort(model)) return 'high'
  if (clamped === 'xhigh' && !modelSupportsXHighEffort(model)) return 'high'
  return clamped
}
export function getAvailableEffortLevels(model: string): EffortLevel[] {
  if (!modelSupportsEffort(model)) return []
  return EFFORT_LEVELS.filter(level => clampEffortLevel(level, model) === level)
}

export function isEffortLevel(value: string): value is EffortLevel {
  return (EFFORT_LEVELS as readonly string[]).includes(value)
}

export function parseEffortValue(value: unknown): EffortValue | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined
  }
  if (typeof value === 'number' && isValidNumericEffort(value)) {
    return value
  }
  const input = String(value).toLowerCase()
  const str = input === 'med' ? 'medium' : input
  if (isEffortLevel(str)) {
    return str
  }
  const numericValue = parseInt(str, 10)
  if (!isNaN(numericValue) && isValidNumericEffort(numericValue)) {
    return numericValue
  }
  return undefined
}

/**
 * Numeric values are model-default only and not persisted.
 * 'max' is session-scoped for external users (ants can persist it).
 * Write sites call this before saving to settings so the Zod schema
 * (which only accepts string levels) never rejects a write.
 */
export function toPersistableEffort(
  value: EffortValue | undefined,
): EffortLevel | undefined {
  if (
    value === 'low' ||
    value === 'medium' ||
    value === 'high' ||
    value === 'xhigh'
  ) {
    return value
  }
  return undefined
}

export function getInitialEffortSetting(): EffortLevel | undefined {
  // Do not flatten persisted per-model settings into a session override at
  // startup. resolveAppliedEffort reads the current model's table on every use.
  return undefined
}

/**
 * Decide what effort level (if any) to persist when the user selects a model
 * in ModelPicker. Keeps an explicit prior /effort choice sticky even when it
 * matches the picked model's default, while letting purely-default and
 * session-ephemeral effort (CLI --effort, EffortCallout default) fall through
 * to undefined so it follows future model-default changes.
 *
 * priorPersisted must come from userSettings on disk
 * (getSettingsForSource('userSettings')?.effortLevel), NOT merged settings
 * (project/policy layers would leak into the user's global settings.json)
 * and NOT AppState.effortValue (includes session-scoped sources that
 * deliberately do not write to settings.json).
 */
export function resolvePickerEffortPersistence(
  picked: EffortLevel | undefined,
  modelDefault: EffortLevel,
  priorPersisted: EffortLevel | undefined,
  toggledInPicker: boolean,
): EffortLevel | undefined {
  const hadExplicit = priorPersisted !== undefined || toggledInPicker
  return hadExplicit || picked !== modelDefault ? picked : undefined
}

export function getEffortEnvOverride(): EffortValue | null | undefined {
  const envOverride = process.env.CLAUDE_CODE_EFFORT_LEVEL
  return envOverride?.toLowerCase() === 'unset' ||
    envOverride?.toLowerCase() === 'auto'
    ? null
    : parseEffortValue(envOverride)
}

/**
 * Resolve the effort value that will actually be sent to the API for a given
 * model, following the full precedence chain:
 *   hook → env → turn → explicit session → per-model settings → model default
 *
 * Returns undefined when no effort parameter should be sent (env set to
 * 'unset', or no default exists for the model).
 */
export function resolveAppliedEffort(
  model: string,
  appStateEffortValue: EffortValue | undefined,
  {turnEffort, hookEffortValue, sessionEffort}: {turnEffort?: EffortValue; hookEffortValue?: EffortValue; sessionEffort?: SessionEffort} = {},
): Exclude<EffortValue, null> | undefined {
  if (!modelSupportsEffort(model)) return undefined
  const hasLocalCap = getLocalEffortCap(model) !== null
  if (hookEffortValue != null) {
    const value = typeof hookEffortValue === 'number' && hasLocalCap ? convertEffortValueToLevel(hookEffortValue) : hookEffortValue
    return typeof value === 'string' ? clampEffortLevel(value, model) : value
  }
  const envOverride = getEffortEnvOverride()
  if (envOverride === null && !hasLocalCap) return undefined
  const modelDefault = getDefaultEffortForModel(model)
  const selected = sessionEffort !== undefined
    ? resolveSessionEffort(model, sessionEffort)
    : appStateEffortValue === null ? undefined : appStateEffortValue ?? resolveSettingsEffort(getSettingsEffortTable(), model)
  let resolved = envOverride ?? (envOverride === null ? modelDefault : undefined) ?? turnEffort ?? selected ?? modelDefault
  if (typeof resolved === 'number' && hasLocalCap) resolved = convertEffortValueToLevel(resolved)
  return typeof resolved === 'string' ? clampEffortLevel(resolved, model) : resolved
}

/**
 * Resolve the effort level to show the user. Wraps resolveAppliedEffort
 * with the 'high' fallback (what the API uses when no effort param is sent).
 * Single source of truth for the status bar and /effort output (CC-1088).
 */
export function getDisplayedEffortLevel(
  model: string,
  appStateEffort: EffortValue | undefined,
): EffortLevel {
  const resolved = resolveAppliedEffort(model, appStateEffort) ?? 'high'
  return convertEffortValueToLevel(resolved)
}

/**
 * Build the ` with {level} effort` suffix shown in Logo/Spinner.
 * Returns empty string if the user hasn't explicitly set an effort value.
 * Delegates to resolveAppliedEffort() so the displayed level matches what
 * the API actually receives (including max→high clamp for non-Opus models).
 */
export function getEffortSuffix(
  model: string,
  effortValue: EffortValue | undefined,
): string {
  if (effortValue === undefined) return ''
  const resolved = resolveAppliedEffort(model, effortValue)
  if (resolved === undefined) return ''
  return ` with ${convertEffortValueToLevel(resolved)} effort`
}

export function isValidNumericEffort(value: number): boolean {
  return Number.isInteger(value)
}

export function convertEffortValueToLevel(value: EffortValue): EffortLevel {
  if (typeof value === 'string') {
    // Runtime guard: value may come from remote config (GrowthBook) where
    // TypeScript types can't help us. Coerce unknown strings to 'high'
    // rather than passing them through unchecked.
    return isEffortLevel(value) ? value : 'high'
  }
  if (process.env.USER_TYPE === 'ant' && typeof value === 'number') {
    if (value <= 50) return 'low'
    if (value <= 85) return 'medium'
    if (value <= 100) return 'high'
    return 'max'
  }
  return 'high'
}

/**
 * Get user-facing description for effort levels
 *
 * @param level The effort level to describe
 * @returns Human-readable description
 */
export function getEffortLevelDescription(level: EffortLevel): string {
  switch (level) {
    case 'low':
      return 'Quick, straightforward implementation with minimal overhead'
    case 'medium':
      return 'Balanced approach with standard implementation and testing'
    case 'high':
      return 'Comprehensive implementation with extensive testing and documentation'
    case 'xhigh':
      return 'Deeper reasoning than high, just below maximum'
    case 'max':
      return `Maximum capability with deepest reasoning (${getMarketingNameForModel(getDefaultOpusModel()) ?? 'Opus'} and supported Opus models)`
  }
}

/**
 * Get user-facing description for effort values (both string and numeric)
 *
 * @param value The effort value to describe
 * @returns Human-readable description
 */
export function getEffortValueDescription(value: EffortValue): string {
  if (process.env.USER_TYPE === 'ant' && typeof value === 'number') {
    return `[ANT-ONLY] Numeric effort value of ${value}`
  }

  if (typeof value === 'string') {
    return getEffortLevelDescription(value)
  }
  return 'Balanced approach with standard implementation and testing'
}

export type OpusDefaultEffortConfig = {
  enabled: boolean
  dialogTitle: string
  dialogDescription: string
}

const OPUS_DEFAULT_EFFORT_CONFIG_DEFAULT: OpusDefaultEffortConfig = {
  enabled: true,
  dialogTitle: 'We recommend medium effort for Opus',
  dialogDescription:
    'Effort determines how long Claude thinks for when completing your task. We recommend medium effort for most tasks to balance speed and intelligence and maximize rate limits. Use ultrathink to trigger high effort when needed.',
}

export function getOpusDefaultEffortConfig(): OpusDefaultEffortConfig {
  const config = getFeatureValue_CACHED_MAY_BE_STALE(
    'tengu_grey_step2',
    OPUS_DEFAULT_EFFORT_CONFIG_DEFAULT,
  )
  return {
    ...OPUS_DEFAULT_EFFORT_CONFIG_DEFAULT,
    ...config,
  }
}

// @[MODEL LAUNCH]: Update the default effort levels for new models
export function getDefaultEffortForModel(model: string): Exclude<EffortValue, null> | undefined {
  const id = getCatalogModelId(getCanonicalName(model))
  const orgEffort = getOrgEffort(model)
  if (orgEffort !== undefined) return orgEffort
  // X: remote defaults may arrive as a JSON string; malformed dictionaries
  // must not shadow served or baked defaults.
  let defaults: unknown = getFeatureValue_CACHED_MAY_BE_STALE('tengu_witty_wand', {})
  if (typeof defaults === 'string') {
    try { defaults = JSON.parse(defaults) } catch { defaults = undefined }
  }
  const value = defaults && typeof defaults === 'object' && !Array.isArray(defaults) && Object.hasOwn(defaults, id)
    ? (defaults as Record<string, unknown>)[id] : undefined
  const remote = typeof value === 'string' ? value.trim().toLowerCase() : undefined
  if (remote && isEffortLevel(remote)) return remote
  const served = getServedDefaultEffort(model, id)
  if (served && isEffortLevel(served)) return served
  const baked = getCatalogEntry(id)?.default_effort
  return baked && isEffortLevel(baked) ? baked : 'high'
}
