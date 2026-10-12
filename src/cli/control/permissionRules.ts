import type { ToolPermissionContext, PermissionRuleValue } from '../../types/permissions.js'
import { getOriginalCwd } from '../../bootstrap/state.js'
import { getSettingsWithSources } from '../../utils/settings/settings.js'
import { getSettingsWithAllErrors } from '../../utils/settings/allErrors.js'
import { shouldAllowManagedPermissionRulesOnly } from '../../utils/permissions/permissionsLoader.js'
import { permissionRuleValueFromString, permissionRuleValueToString } from '../../utils/permissions/permissionRuleParser.js'
import { assertReadableLane, projectSettingsErrors, type ControlLane, type SettingsWireError } from './followupCommon.js'

// Official oke/iY. Additional sources are understood here without modifying the
// shared runtime type or synthesizing rules that the local engine doesn't own.
const sources = ['userSettings', 'projectSettings', 'localSettings', 'flagSettings', 'policySettings',
  'cliArg', 'command', 'session', 'toolsNarrowing', 'mcpServerPolicy', 'hostCredential'] as const
export type RulesSource = typeof sources[number]
type Behavior = 'allow' | 'ask' | 'deny'
export type PermissionRulesContext = Pick<ToolPermissionContext, 'additionalWorkingDirectories'> & {
  alwaysAllowRules: Readonly<Partial<Record<RulesSource, readonly string[]>>>
  alwaysDenyRules: Readonly<Partial<Record<RulesSource, readonly string[]>>>
  alwaysAskRules: Readonly<Partial<Record<RulesSource, readonly string[]>>>
}
export interface PermissionRuleRow {
  behavior: Behavior
  source: RulesSource
  rule: string
  description?: { prefix: string; emphasis?: string; suffix?: string }
  editability: 'persistent' | 'session' | 'readonly'
  notInEffect?: true
}
export interface PermissionRulesState {
  rules: PermissionRuleRow[]
  workspaceDirectories: {path: string; source: string}[]
  originalCwd: string
  managedOnly: boolean
  errors?: SettingsWireError[]
}

/** Official Hht: pure description fragments, not rendered React or normalized rule text. */
function description(value: PermissionRuleValue): PermissionRuleRow['description'] {
  if (value.toolName === 'Bash') {
    if (!value.ruleContent) return {prefix: 'Any Bash command'}
    if (value.ruleContent.endsWith(':*') || value.ruleContent.endsWith(' *')) {
      return {prefix: 'Any Bash command starting with ', emphasis: value.ruleContent.slice(0, -2)}
    }
    return {prefix: 'The Bash command ', emphasis: value.ruleContent}
  }
  if (!value.ruleContent) return {prefix: 'Any use of the ', emphasis: value.toolName, suffix: ' tool'}
  return undefined
}

/** Official R/p/m/h, using the live context's raw strings, not reloaded rules. */
export function buildPermissionRulesWireState(input: {
  context: PermissionRulesContext
  originalCwd: string
  managedOnly: boolean
  settingsSources: ReturnType<typeof getSettingsWithSources>['sources']
  errors: SettingsWireError[]
}): PermissionRulesState {
  const rules: PermissionRuleRow[] = [], seen = new Set<string>()
  function add(behavior: Behavior, source: RulesSource, raw: string, notInEffect = false) {
    const value = permissionRuleValueFromString(raw)
    let editability: PermissionRuleRow['editability'] =
      ['userSettings', 'projectSettings', 'localSettings'].includes(source) ? 'persistent' :
        source === 'cliArg' || source === 'session' ? 'session' : 'readonly'
    if (notInEffect || editability === 'session' && permissionRuleValueToString(value) !== raw) editability = 'readonly'
    const key = `${behavior}\0${source}\0${raw}\0${notInEffect ? 1 : 0}`
    if (seen.has(key)) return
    seen.add(key)
    const desc = description(value)
    rules.push({behavior, source, rule: raw, ...(desc ? {description: desc} : {}), editability,
      ...(notInEffect ? {notInEffect: true as const} : {})})
  }
  for (const [behavior, key] of [['allow', 'alwaysAllowRules'], ['ask', 'alwaysAskRules'], ['deny', 'alwaysDenyRules']] as const) {
    for (const source of sources) for (const raw of input.context[key][source] ?? []) add(behavior, source, raw)
  }
  if (input.managedOnly) for (const {source, settings} of input.settingsSources) {
    if (source === 'policySettings' || !settings.permissions) continue
    for (const behavior of ['allow', 'deny', 'ask'] as const) {
      for (const raw of settings.permissions[behavior] ?? []) add(behavior, source, raw, true)
    }
  }
  return {rules,
    workspaceDirectories: Array.from(input.context.additionalWorkingDirectories.values(), ({path, source}) => ({path, source})),
    originalCwd: input.originalCwd, managedOnly: input.managedOnly,
    ...(input.errors.length ? {errors: input.errors} : {}),
  }
}

export function handleListPermissionRules(owner: ControlLane & {
  getPermissionContext(): PermissionRulesContext
  originalCwd?: string
}): {state: PermissionRulesState} {
  assertReadableLane(owner, 'list_permission_rules')
  const context = owner.getPermissionContext()
  const managedOnly = shouldAllowManagedPermissionRulesOnly()
  const settings = getSettingsWithSources()
  return {state: buildPermissionRulesWireState({context, managedOnly,
    originalCwd: owner.originalCwd ?? getOriginalCwd(), settingsSources: settings.sources,
    errors: projectSettingsErrors(getSettingsWithAllErrors().errors)})}
}
