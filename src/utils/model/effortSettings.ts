import { resolve } from 'node:path'
import { getGlobalConfig } from '../config.js'
import { getSettingsFilePathForSource, getSettingsForSource } from '../settings/settings.js'
import { getEnabledSettingSources, SETTING_SOURCES, type SettingSource } from '../settings/constants.js'
import { getCatalogModelId, getOrgModelDefault } from './catalog.js'
import { parseModelIdentity, isStandardModelIdentity } from './modelIdentity.js'
import { getCanonicalName, parseUserSpecifiedModel } from './model.js'
import type { EffortLevel, EffortValue } from '../effort.js'

export type EffortSettings = {
  effortLevel?: EffortLevel
  maxEffortLevel?: EffortLevel
  modelSettings?: Record<string, { effortLevel?: EffortLevel; maxEffortLevel?: EffortLevel }>
}
export type EffortSettingsSource = { source: SettingSource; settings: EffortSettings }
export type SettingsEffortTable = {
  default: EffortLevel | undefined
  legacyUserEffort: EffortLevel | undefined
  byModel: Record<string, EffortLevel | undefined>
}
export type SessionEffort = { kind: 'inherit' } | { kind: 'default' } | { kind: 'level'; value: Exclude<EffortValue, null> }
export function decodeSessionEffort(value: EffortValue | undefined): SessionEffort {
  return value === undefined ? {kind: 'inherit'} : value === null ? {kind: 'default'} : {kind: 'level', value}
}
export function encodeSessionEffort(value: SessionEffort): EffortValue | undefined {
  return value.kind === 'inherit' ? undefined : value.kind === 'default' ? null : value.value
}

// 2.1.283 chunk-fr7r2xfj.js:bhe. Identity, not behaves_as; aliases and [1m]
// share a settings key. No network/profile resolution is performed here.
export function getEffortModelKey(model: string): string {
  return getCatalogModelId(getCanonicalName(parseUserSpecifiedModel(model))).replace(/\[1m\]/gi, '')
}

// hOr: low-to-high priority; a --settings path may intentionally repeat a file.
export function getEffortSettingsSources(): EffortSettingsSource[] {
  const enabled = new Set(getEnabledSettingSources())
  const paths = new Set<string>()
  const result: EffortSettingsSource[] = []
  for (const source of SETTING_SOURCES) {
    if (!enabled.has(source)) continue
    const path = getSettingsFilePathForSource(source)
    if (path !== undefined) {
      const absolute = resolve(path)
      if (paths.has(absolute) && source !== 'flagSettings') continue
      paths.add(absolute)
    }
    const settings = getSettingsForSource(source)
    if (settings) result.push({source, settings})
  }
  return result
}
function persistable(value: EffortLevel | undefined): Exclude<EffortLevel, 'max'> | undefined {
  return value === 'max' ? undefined : value
}
export function getOrgEffort(model: string): EffortLevel | undefined {
  const org = getOrgModelDefault()
  const value = org?.default_effort_level
  return org && getEffortModelKey(org.name) === getEffortModelKey(model) &&
    ['low', 'medium', 'high', 'xhigh', 'max'].includes(value ?? '') ? value as EffortLevel : undefined
}

// Direct port of z/K/ql (apart from the unavailable ultracode setting branch).
// Own undefined entries deliberately shadow a legacy/default value.
export function buildSettingsEffortTable(
  sources: readonly EffortSettingsSource[],
  { enforcedModel, unpinnedModels = [], key = getEffortModelKey }: {
    enforcedModel?: string; unpinnedModels?: readonly string[]; key?: (model: string) => string
  } = {},
): SettingsEffortTable {
  let legacy: EffortLevel | undefined
  let top: {level: EffortLevel | undefined} | undefined
  const layers = sources.map(({source, settings}) => {
    const setsTopLevel = source !== 'userSettings' && settings.effortLevel !== undefined
    if (source === 'userSettings') legacy = persistable(settings.effortLevel)
    else if (setsTopLevel) top = {level: persistable(settings.effortLevel)}
    return {source, settings, setsTopLevel}
  }).reverse()
  const maps = layers.map(({settings}) => {
    const map = new Map<string, EffortLevel>()
    for (const [model, entry] of Object.entries(settings.modelSettings ?? {})) {
      if (entry?.effortLevel === undefined) continue
      const id = key(model)
      if (model === id || !map.has(id)) map.set(id, entry.effortLevel)
    }
    return map
  })
  const enforced = enforcedModel === undefined ? undefined : key(enforcedModel)
  const models = new Set<string>(enforced === undefined ? [] : [enforced])
  for (const map of maps) for (const id of map.keys()) models.add(id)
  const byModel: SettingsEffortTable['byModel'] = Object.create(null)
  for (const id of models) {
    if (id === enforced) byModel[id] = undefined
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i]!
      if (id === enforced && layer.source !== 'flagSettings' && layer.source !== 'policySettings') continue
      const perModel = maps[i]!.get(id)
      if (perModel !== undefined) { byModel[id] = persistable(perModel); break }
      if (layer.setsTopLevel) { byModel[id] = persistable(layer.settings.effortLevel); break }
    }
  }
  if (top !== undefined) legacy = undefined
  if (legacy !== undefined) for (const id of unpinnedModels) {
    if (!Object.hasOwn(byModel, id) && !Object.hasOwn(Object.prototype, id)) byModel[id] = undefined
  }
  return {default: top?.level, legacyUserEffort: legacy, byModel}
}

// oe/gOr: legacy user effort does not pin new Claude generations. Unknown
// non-Claude deployments retain the old behavior. Mythos is not enabled here.
const legacyModels = new Set([
  'claude-3-5-haiku', 'claude-3-5-sonnet', 'claude-3-7-sonnet', 'claude-haiku-4-5',
  'claude-sonnet-4-0', 'claude-sonnet-4-5', 'claude-sonnet-4-6', 'claude-sonnet-5',
  'claude-opus-4-0', 'claude-opus-4-1', 'claude-opus-4-5', 'claude-opus-4-6',
  'claude-opus-4-7', 'claude-opus-4-8', 'claude-opus-5', 'claude-fable-5', 'claude-fable-5-1',
])
export function resolveSettingsEffort(table: SettingsEffortTable, model: string): EffortLevel | undefined {
  const id = getEffortModelKey(model)
  if (Object.hasOwn(table.byModel, id)) return table.byModel[id]
  if (table.default !== undefined || table.legacyUserEffort === undefined) return table.default
  return legacyModels.has(id) || !isStandardModelIdentity(parseModelIdentity(id))
    ? table.legacyUserEffort : undefined
}

export function getSettingsEffortTable(): SettingsEffortTable {
  const org = getOrgModelDefault()
  const enforcedModel = org?.override_user_effort && getOrgEffort(org.name) !== undefined ? org.name : undefined
  const config = getGlobalConfig()
  const unpinnedModels: string[] = []
  if (config.firstStartVersion === undefined) {
    if (!config.unpinOpus47LaunchEffort) unpinnedModels.push('claude-opus-4-7')
    if (!config.unpinOpus48LaunchEffort) unpinnedModels.push('claude-opus-4-8')
    if (!config.unpinFable5LaunchEffort) {
      unpinnedModels.push('claude-fable-5')
      const pinned = process.env.ANTHROPIC_DEFAULT_FABLE_MODEL
      if (pinned && !getEffortModelKey(pinned).startsWith('claude-fable-')) unpinnedModels.push(getEffortModelKey(pinned))
    }
  }
  return buildSettingsEffortTable(getEffortSettingsSources(), {enforcedModel, unpinnedModels})
}
export function resolveSessionEffort(
  model: string, session: SessionEffort = {kind: 'inherit'}, table = getSettingsEffortTable(),
): Exclude<EffortValue, null> | undefined {
  if (session.kind === 'level') return session.value
  if (session.kind === 'default') return undefined
  return resolveSettingsEffort(table, model)
}

// chunk-fr7r2xfj.js:se. Command/Picker writers can use this without
// flattening a model choice into the legacy global effortLevel field.
export function getEffortSettingsUpdate(model: string, value: EffortLevel | undefined): {
  effortLevel?: Exclude<EffortLevel, 'max'>;
  modelSettings?: Record<string, {effortLevel?: Exclude<EffortLevel, 'max'>}>
} {
  const id = getEffortModelKey(model)
  return Object.hasOwn(Object.prototype, id)
    ? {effortLevel: persistable(value)}
    : {modelSettings: {[id]: {effortLevel: persistable(value)}}}
}
