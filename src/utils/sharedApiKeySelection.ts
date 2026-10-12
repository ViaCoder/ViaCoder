import { preferThirdPartyAuthentication } from '../bootstrap/state.js'
import * as auth from './auth.js'
import { getApiKeyFromFileDescriptor, getOAuthTokenFromFileDescriptor } from './authFileDescriptor.js'
import { getGlobalConfig } from './config.js'
import { isBareMode } from './envUtils.js'
import { getAPIProvider } from './model/providers.js'
import { getSettings_DEPRECATED, getSettingsForSource } from './settings/settings.js'
import { hasWorkloadIdentityConfiguration } from './workloadIdentity.js'
import { createApiKeySelection } from './officialApiKey/runtime.js'
import { authEnvironment } from './authEnvironment.js'

// Original TS/zg/approval closure; defer settings, cached key and descriptor
// reads until selection, including across the auth/portable-module cycle.
export const sharedApiKeySelection = createApiKeySelection({
  Gn:()=>getAPIProvider()==='firstParty', JI:()=>getOAuthTokenFromFileDescriptor(),
  Nc:()=>hasWorkloadIdentityConfiguration(), PWt:preferThirdPartyAuthentication,
  S4n:()=>auth.getApiKeyFromApiKeyHelperCached(), Zn:()=>getSettings_DEPRECATED(),
  a:authEnvironment, ce:()=>getGlobalConfig(), fo:isBareMode,
  ge:source=>source==='flagSettings'?getSettingsForSource('flagSettings'):null,
  mJ:()=>getApiKeyFromFileDescriptor(), w4n:()=>auth.getApiKeyFromConfigOrMacOSKeychain(),
})
