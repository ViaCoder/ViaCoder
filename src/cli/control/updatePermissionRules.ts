/** Local Web extension. Uses terminal permission writers; not an official SDK subtype. */
import type {ToolPermissionContext} from '../../Tool.js'
import {permissionUpdateSchema} from '../../utils/permissions/PermissionUpdateSchema.js'
import {applyPermissionUpdate, persistPermissionUpdate, supportsPersistence} from '../../utils/permissions/PermissionUpdate.js'
import {shouldAllowManagedPermissionRulesOnly} from '../../utils/permissions/permissionsLoader.js'
import {permissionRuleValueFromString, permissionRuleValueToString} from '../../utils/permissions/permissionRuleParser.js'
import {getSettingsForSource} from '../../utils/settings/settings.js'
import {isSettingSourceEnabled} from '../../utils/settings/constants.js'
import {handleListPermissionRules} from './permissionRules.js'
import {assertReadableLane, type ControlLane} from './followupCommon.js'

export function updateLocalPermissionRules(request: {update: unknown}, owner: ControlLane & {
  getPermissionContext(): ToolPermissionContext
  updatePermissionContext(update: (context: ToolPermissionContext) => ToolPermissionContext): void
}) {
  assertReadableLane(owner, 'local_update_permission_rules')
  const parsed = permissionUpdateSchema().safeParse(request.update)
  if (!parsed.success || (parsed.data.type !== 'addRules' && parsed.data.type !== 'removeRules'))
    throw Error('local_update_permission_rules requires addRules or removeRules')
  const update = parsed.data
  if (!update.rules.length || update.rules.some(rule => !rule.toolName.trim())) throw Error('At least one non-empty rule is required')
  if (shouldAllowManagedPermissionRulesOnly()) throw Error('Permission rules are managed-only')
  if (supportsPersistence(update.destination) && !isSettingSourceEnabled(update.destination))
    throw Error(`The ${update.destination} source is disabled for this session`)
  if (update.type === 'addRules' && update.destination === 'cliArg') throw Error('Command-line rules are read-only for additions')
  const state = handleListPermissionRules(owner).state
  const normalized = update.rules.map(permissionRuleValueToString)
  if (update.type === 'removeRules' && normalized.some(rule => !state.rules.some(row =>
    row.source === update.destination && row.behavior === update.behavior && row.editability !== 'readonly' &&
    permissionRuleValueToString(permissionRuleValueFromString(row.rule)) === rule)))
    throw Error('Rule is absent or read-only')

  // Terminal AddPermissionRules/deletePermissionRule use this same writer.
  // It logs disk errors, so confirm its result before publishing live authority.
  if (supportsPersistence(update.destination)) {
    persistPermissionUpdate(update)
    const stored = getSettingsForSource(update.destination)?.permissions?.[update.behavior] ?? []
    const keys = new Set(stored.map(rule => permissionRuleValueToString(permissionRuleValueFromString(rule))))
    if (normalized.some(rule => keys.has(rule) !== (update.type === 'addRules')))
      throw Error('Permission rules were not persisted')
    owner.updatePermissionContext(context => applyPermissionUpdate(context, {
      type: 'replaceRules', destination: update.destination, behavior: update.behavior,
      rules: stored.map(permissionRuleValueFromString),
    }))
  } else {
    owner.updatePermissionContext(context => {
      const key = update.behavior === 'allow' ? 'alwaysAllowRules' : update.behavior === 'deny' ? 'alwaysDenyRules' : 'alwaysAskRules'
      const existing = new Set(context[key][update.destination] ?? [])
      return applyPermissionUpdate(context, update.type === 'addRules'
        ? {...update, rules: update.rules.filter(rule => !existing.has(permissionRuleValueToString(rule)))} : update)
    })
  }
  return handleListPermissionRules(owner)
}
