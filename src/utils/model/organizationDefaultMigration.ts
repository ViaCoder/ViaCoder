import {getGlobalConfig, saveGlobalConfig} from '../config.js'
import {getEnabledSettingSources, SETTING_SOURCES} from '../settings/constants.js'
import {getSettingsForSource, updateSettingsForSource} from '../settings/settings.js'
import {getOrgModelDefault} from './catalog.js'
import {getOrganizationDefaultModel} from './model.js'
import {getServedCatalog} from './servedCatalog.js'

// Official chunk-fr7r2xfj:Me, invoked only after CLI/session/env selections.
export function applyOrganizationDefaultMigration(model: string | undefined, nonInteractive: boolean): string | undefined {
  const org = getOrgModelDefault(), served = getServedCatalog()
  const enabled = new Set(getEnabledSettingSources()), userEnabled = enabled.has('userSettings')
  const prior = getGlobalConfig().lastSeenOrgDefaultUpdatedAt
  const newer = org && new Date(org.updated_at).getTime() > new Date(prior ?? 0).getTime()
  const mark = () => {
    if (!org) return
    saveGlobalConfig(current => current.lastSeenOrgDefaultUpdatedAt === org.updated_at
      ? current : {...current, lastSeenOrgDefaultUpdatedAt: org.updated_at})
  }
  const source = model ? [...SETTING_SOURCES].reverse().find(source => enabled.has(source) && getSettingsForSource(source)?.model) : undefined
  if (served !== null) {
    if (newer && !nonInteractive && userEnabled) mark()
    if (!served.state?.org_enforced_default_model || getOrganizationDefaultModel() === undefined) return model
    return source === 'policySettings' || source === 'flagSettings' ? model : undefined
  }
  if (!org || getOrganizationDefaultModel() === undefined || source === 'policySettings' || source === 'flagSettings') return model
  if (org.override_user_selection) {
    if (newer && !nonInteractive && userEnabled) mark()
    return undefined
  }
  if (nonInteractive || !userEnabled || !newer) return model
  if (getSettingsForSource('userSettings')?.model) {
    const {error} = updateSettingsForSource('userSettings', {model: undefined})
    if (!error) mark()
    // Official Me drops the current user selection even if persistence fails;
    // the watermark stays old, so the next session retries the migration.
    return source === 'userSettings' ? undefined : model
  }
  mark()
  return model
}
