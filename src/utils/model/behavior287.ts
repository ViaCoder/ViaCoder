import {createModelBehavior287} from './officialModelBehavior287/native.js'
import {canonicalName287, getCanonicalRoot287, isKnownIdentity287} from './canonical287.js'
import {createModelSettingsIdentity287} from './officialModelIdentity287/native.js'
import {getServedCatalogWithDeactivatedRows287, getModelBehaviorMemoOwner287} from './servedCatalog.js'
import {getInitialSettings,getSettingsForSource} from '../settings/settings.js'
import {getEnabledSettingSources, type SettingSource} from '../settings/constants.js'
import {getSettingsPolicyGeneration287} from '../settings/settingsCache.js'

// Identity and behavior are separate: a behavior target never rewrites the API model.
export function getModelIdentityName287(model: string): string {
  return settingsIdentity.resolve(model)
}
const settingsIdentity = createModelSettingsIdentity287({
  fb: canonicalName287,
  Doe: isKnownIdentity287,
  Be: model => getModelBehaviorName287(model),
  tt: getInitialSettings,
})
const behavior = createModelBehavior287({
  cL: getCanonicalRoot287,
  Tb: getModelIdentityName287,
  Doe: isKnownIdentity287,
  fb: canonicalName287,
  Xr: getModelBehaviorMemoOwner287,
  Vs: getServedCatalogWithDeactivatedRows287,
  va: () => ({policy: getSettingsPolicyGeneration287()}),
  Xo: getEnabledSettingSources,
  ge: source => getSettingsForSource(source as SettingSource),
})
export const getModelBehaviorName287 = behavior.canonical
