import { catalog } from '../../vendor/official-model-catalog/catalog.js'
import { getGlobalConfig } from '../config.js'
import { getAPIProvider } from './providers.js'

export function getCatalogEntry(model: string) {
  const id = model.toLowerCase().replace(/\[1m\]/gi, '')
  return catalog.models.find(entry => entry.id === id || Object.values(entry.provider_ids).some(value => value?.toLowerCase() === id))
}
export function getCatalogModelId(model: string): string {
  const id = model.toLowerCase().replace(/\[1m\]/gi, '')
  return getCatalogEntry(model)?.id ?? (id === 'claude-opus-4' || id === 'claude-sonnet-4' ? id + '-0' : id)
}
// Port of chunk-y5k20gt2.js:Y9e: ordered, model-scoped capability overrides.
export function getCatalogCapabilityOverride(model: string, capability: string): boolean | undefined {
  const setting = process.env.CLAUDE_CODE_MODEL_CAPABILITIES
  if (setting === undefined) return undefined
  const id = getCatalogModelId(model)
  let value: boolean | undefined
  for (const clause of setting.split(';')) {
    const eq = clause.indexOf('=')
    if (eq !== -1) {
      const pattern = clause.slice(0, eq).trim()
      if (!pattern || !(pattern.endsWith('*') ? id.startsWith(pattern.slice(0, -1)) : id === pattern)) continue
    }
    for (const field of (eq === -1 ? clause : clause.slice(eq + 1)).split(',')) {
      const token = field.trim()
      const enabled = !token.startsWith('-')
      if ((enabled ? token : token.slice(1)) === capability) value = enabled
    }
  }
  return value
}
export function getOrgModelDefault() {
  if (getAPIProvider() !== 'firstParty') return null
  const config = getGlobalConfig()
  const value = config.orgModelDefaultCache
  if (!value || typeof value !== 'object' || typeof value.name !== 'string' ||
      typeof value.updated_at !== 'string' || typeof value.data_source !== 'string' ||
      typeof value.override_user_selection !== 'boolean') return null
  const org = config.oauthAccount?.organizationUuid
  if (value.orgUuid != null && org != null && value.orgUuid !== org) return null
  return {...value, name: value.name.replace(/[\x00-\x1f\x7f-\x9f]/g, '')}
}
