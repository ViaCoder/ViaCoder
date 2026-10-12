import axios from 'axios'
import * as auth from './auth.js'
import { logForDebugging } from './debug.js'
import { isBareMode } from './envUtils.js'
import { getAPIProvider } from './model/providers.js'
import { getSettings_DEPRECATED, getSettingsForSource } from './settings/settings.js'
import { hasWorkloadIdentityConfiguration } from './workloadIdentity.js'
import { createHttpAuth } from './officialHttpAuth287/runtime.js'
import { authEnvironment } from './authEnvironment.js'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'

// Defer cyclic auth/settings accesses until the operation, never at import.
// Preserve the original credential/storage/callback arguments through recovery.
export const sharedHttpAuth = createHttpAuth({
  Bn:()=>getAPIProvider()==='firstParty', He:getAPIProvider,
  $Yr:name=>filesCredentialSlots.descriptorAnnouncementConsumed(name),
  Wc:()=>hasWorkloadIdentityConfiguration(),
  BS:options=>auth.getAnthropicApiKeyWithSource(options), Xn:()=>getSettings_DEPRECATED(),
  a:authEnvironment, R_:(...args)=>auth.handleOAuth401Error(...args), kr:isBareMode,
  ge:source=>source==='flagSettings'?getSettingsForSource('flagSettings'):null,
  ht:axios, pn:()=>auth.getClaudeAIOAuthTokens(), t:logForDebugging,
})
