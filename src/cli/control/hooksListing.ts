import { getRegisteredHooks } from '../../bootstrap/state.js'
import type { AppState } from '../../state/AppState.js'
import { getAllHooks, hookSourceDescriptionDisplayString, type IndividualHookConfig } from '../../utils/hooks/hooksSettings.js'
import { isBareMode } from '../../utils/envUtils.js'
import { getSettingsForSource, getSettings_DEPRECATED, loadManagedFileSettings } from '../../utils/settings/settings.js'
import { getSettingsWithAllErrors } from '../../utils/settings/allErrors.js'
import { isSettingSourceEnabled, SOURCES } from '../../utils/settings/constants.js'
import { getMdmSettings, getHkcuSettings } from '../../utils/settings/mdm/settings.js'
import { isRestrictedToPluginOnly } from '../../utils/settings/pluginOnlyPolicy.js'
import type { HookCommand } from '../../utils/settings/types.js'
import { assertReadableLane, projectSettingsErrors, type ControlLane, type SettingsWireError } from './followupCommon.js'
import { hookMetadata, revealControls, revealControlsSingleLine as line } from './officialDisplay.js'

type HookRowSource = IndividualHookConfig['source'] | 'flagSettings'
type Hook = Omit<IndividualHookConfig, 'source' | 'event'> & {source: HookRowSource; event: string}
export interface HookListingRow {
  event: string; matcher: string; source: string; sourceLabel: string
  pluginName?: string; type: string; displayText: string; commandText: string; contentLabel: string
  condition?: string; timeout?: number; statusMessage?: string; runsOnce?: true
  runsInBackground?: true; disabled?: true
  editable?: {matcher: string; config: HookCommand; headersRedacted?: true}
}
export interface HooksListing {
  events: {name: string; summary: string; supportsMatcher: boolean; hookCount: number}[]
  hooks: HookListingRow[]
  eventCatalog: {name: string; summary: string; supportsMatcher: boolean}[]
  policy: {disabledByPolicy: boolean; managedOnly: boolean; pluginOnly: boolean; allDisabled: boolean; policyHookCount: number; policyUnreadable?: true}
  safeMode?: {managedHooksStillApply: boolean; exitHint: string}
  bareMode?: {exitHint: string}
  errors?: SettingsWireError[]
}
export interface HooksListingOwner extends ControlLane {
  getAppState(): AppState
  /** Only a host that implements safe mode should supply its authoritative state. */
  safeMode?: {managedHooksStillApply: boolean; exitHint: string}
  /** Additional fail-closed managed-source state known only to the owning host. */
  policyUnreadable?(): boolean
  managedPluginIds?: ReadonlySet<string>
}

function identity(hook: HookCommand): string {
  switch (hook.type) {
    case 'command': return hook.command
    case 'prompt': case 'agent': return hook.prompt
    case 'http': return hook.url
  }
}

/** zYr + S/Avn/w: snapshot only; never executes hooks or exposes header values. */
export function handleGetHooksListing(owner: HooksListingOwner): HooksListing {
  assertReadableLane(owner, 'get_hooks_listing')
  const managed = getSettingsForSource('policySettings')
  const settings = getSettings_DEPRECATED()
  const managedOnly = managed?.allowManagedHooksOnly === true
  const disabledByPolicy = managed?.disableAllHooks === true
  const allDisabled = settings.disableAllHooks === true
  const pluginOnly = isRestrictedToPluginOnly('hooks')
  const bare = isBareMode()
  const restricted = managedOnly || (allDisabled && !disabledByPolicy)
  const managedPlugins = owner.managedPluginIds ?? new Set(Object.entries(managed?.enabledPlugins ?? {})
    .filter(([id, enabled]) => enabled === true && id.includes('@')).map(([id]) => id))
  const catalog = hookMetadata([])
  const grouped: Record<string, Record<string, Hook[]>> = Object.create(null)
  for (const event of Object.keys(catalog)) grouped[event] = Object.create(null)
  function append(hook: Hook, normalizeMatcher: boolean) {
    const event = grouped[hook.event]
    if (!event) return
    const matcher = normalizeMatcher && !catalog[hook.event]?.matcherMetadata ? '' : hook.matcher || ''
    ;(event[matcher] ??= []).push(hook)
  }
  // WEo + W_t. Do not synthesize internal callback hooks for external clients.
  for (const hook of getAllHooks(owner.getAppState())) append(hook, true)
  for (const [event, matchers] of Object.entries(getRegisteredHooks() ?? {})) {
    for (const matcher of matchers) if ('pluginRoot' in matcher) {
      for (const config of matcher.hooks) append({event, matcher: matcher.matcher,
        config, source: 'pluginHook', pluginName: matcher.pluginId}, false)
    }
  }
  function enabled(hook: Hook): boolean {
    if (hook.source === 'sessionHook') return !disabledByPolicy && !restricted
    if (bare) return false
    if (hook.source === 'builtinHook') return true
    if (disabledByPolicy) return false
    if (hook.source === 'policySettings') return true
    if (hook.source === 'pluginHook') return !owner.safeMode && (!restricted || managedPlugins.has(hook.pluginName ?? ''))
    return !owner.safeMode && !restricted && !pluginOnly
  }
  function row(hook: Hook): HookListingRow {
    const config = hook.config
    const text = identity(config)
    const editable = hook.source === 'userSettings' || hook.source === 'projectSettings' || hook.source === 'localSettings'
    const redacted = config.type === 'http' && config.headers !== undefined
    const safeConfig = redacted ? {...config, headers: Object.fromEntries(Object.keys(config.headers).map(key => [key, '']))} : config
    return {event: hook.event, matcher: line(hook.matcher ?? ''), source: hook.source,
      sourceLabel: hook.source === 'flagSettings' ? 'Startup settings (--settings option)' :
        hook.source === 'policySettings' ? 'Managed settings (set by your organization)' : hookSourceDescriptionDisplayString(hook.source),
      ...(hook.pluginName !== undefined ? {pluginName: line(hook.pluginName)} : {}),
      type: config.type, displayText: line(config.statusMessage || text), commandText: revealControls(text),
      contentLabel: config.type === 'command' ? 'Command' : config.type === 'http' ? 'URL' :
        config.type === 'prompt' || config.type === 'agent' ? 'Prompt' : 'Definition',
      ...('if' in config && config.if !== undefined ? {condition: line(config.if)} : {}),
      ...(typeof config.timeout === 'number' ? {timeout: config.timeout} : {}),
      ...(config.statusMessage ? {statusMessage: line(config.statusMessage)} : {}),
      ...('once' in config && config.once === true ? {runsOnce: true as const} : {}),
      ...(config.type === 'command' && (config.async === true || config.asyncRewake === true) ? {runsInBackground: true as const} : {}),
      ...(!enabled(hook) ? {disabled: true as const} : {}),
      ...(editable ? {editable: {matcher: hook.matcher ?? '', config: safeConfig, ...(redacted ? {headersRedacted: true as const} : {})}} : {}),
    }
  }
  function extra(event: string, matcher: string): HookListingRow[] {
    return (['flagSettings', 'policySettings'] as const).flatMap(source =>
      (getSettingsForSource(source)?.hooks?.[event as keyof NonNullable<typeof settings.hooks>] ?? [])
        .filter(entry => (entry.matcher ?? '') === matcher)
        .flatMap(entry => entry.hooks.map(config => row({event, matcher, config, source}))),
    )
  }
  const events: HooksListing['events'] = [], hooks: HookListingRow[] = []
  const priority = (source: HookRowSource) => source === 'pluginHook' || source === 'builtinHook' ? 999 : SOURCES.indexOf(source as typeof SOURCES[number])
  for (const [event, metadata] of Object.entries(catalog)) {
    const groups = grouped[event]!
    const matchers = Object.keys(groups).sort((a, b) => {
      const min = (key: string) => Math.min(...groups[key]!.map(h => {
        const p = priority(h.source)
        return p === -1 ? Number.NaN : p
      }))
      const left = min(a), right = min(b)
      return left !== right ? left - right : a.localeCompare(b)
    })
    const rows: HookListingRow[] = []
    const includeExtra = !managedOnly && !pluginOnly
    for (const matcher of matchers) {
      rows.push(...groups[matcher]!.filter(h => h.source === 'sessionHook' || h.source === 'pluginHook' || h.source === 'builtinHook' || isSettingSourceEnabled(h.source)).map(row))
      if (includeExtra) rows.push(...extra(event, matcher))
    }
    if (includeExtra) {
      const remaining = new Set<string>()
      for (const source of ['flagSettings', 'policySettings'] as const) {
        for (const entry of getSettingsForSource(source)?.hooks?.[event as keyof NonNullable<typeof settings.hooks>] ?? []) {
          if (!matchers.includes(entry.matcher ?? '')) remaining.add(entry.matcher ?? '')
        }
      }
      for (const matcher of [...remaining].sort()) rows.push(...extra(event, matcher))
    }
    if (rows.length) { events.push({name: event, summary: metadata.summary, supportsMatcher: !!metadata.matcherMetadata || rows.some(r => r.matcher !== ''), hookCount: rows.length}); hooks.push(...rows) }
  }
  const errors = projectSettingsErrors(getSettingsWithAllErrors().errors)
  const managedErrors = [...getMdmSettings().errors, ...getHkcuSettings().errors, ...loadManagedFileSettings().errors]
  const unreadable = owner.policyUnreadable?.() || projectSettingsErrors(managedErrors).length > 0 || errors.some(e => e.file === 'remote managed settings')
  const policyHookCount = Object.values(managed?.hooks ?? {}).reduce((n, entries) => n + entries.reduce((sum, entry) => sum + entry.hooks.length, 0), 0)
  return {events, hooks, eventCatalog: Object.entries(catalog).map(([name, meta]) => ({name, summary: meta.summary, supportsMatcher: !!meta.matcherMetadata || name === 'FileChanged'})),
    policy: {disabledByPolicy, managedOnly, pluginOnly, allDisabled, policyHookCount, ...(unreadable ? {policyUnreadable: true as const} : {})},
    ...(owner.safeMode ? {safeMode: owner.safeMode} : {}),
    ...(bare ? {bareMode: {exitHint: process.argv.includes('--bare') ? 'restart without --bare' : 'unset CLAUDE_CODE_SIMPLE'}} : {}),
    ...(errors.length ? {errors} : {}),
  }
}
