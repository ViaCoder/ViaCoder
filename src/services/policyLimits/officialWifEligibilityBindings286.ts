import { authEnvironment } from '../../utils/authEnvironment.js'
import { getOAuthTokenFromFileDescriptor as getFdOAuthToken } from '../../utils/authFileDescriptor.js'
import { getClaudeAIOAuthTokens } from '../../utils/auth.js'
import { getAPIProvider } from '../../utils/model/providers.js'
import { getWifAttribution286, getOAuthResetExecutionContext286 } from '../../utils/httpWorkloadIdentity.js'
import { isBareMode } from '../../utils/envUtils.js'
import { getInitialSettings, getSettingsForSource } from '../../utils/settings/settings.js'
import { shouldUseClaudeAIAuth } from '../oauth/client.js'
import { logEvent } from '../analytics/index.js'
import { logForDebugging } from '../../utils/debug.js'
import { OfficialHostCell286 } from './officialIdentity286/hostCell.js'
import { createOfficialPolicyWifEligibility286 } from './officialIdentity286/wifEligibility.js'
import { createOfficialPolicyEntrypoint286 } from './officialIdentity286/wifEntrypoint.js'

const officialEntrypoint = createOfficialPolicyEntrypoint286({ a: authEnvironment })

const eligibilityPorts = {
  a: authEnvironment,
  Bn: () => getAPIProvider() === 'firstParty',
  d0: getFdOAuthToken,
  ge: getSettingsForSource,
  hEn: shouldUseClaudeAIAuth,
  i: logEvent,
  I6o: () => getWifAttribution286().I6o(),
  j: getOAuthResetExecutionContext286,
  kb: () => getWifAttribution286().kb(),
  kr: isBareMode,
  pn: () => getClaudeAIOAuthTokens() ?? undefined,
  q: OfficialHostCell286,
  q2t: () => getWifAttribution286().q2t(),
  t: logForDebugging,
  Xn: getInitialSettings,
  Yc: officialEntrypoint.Yc,
}
const eligibility = createOfficialPolicyWifEligibility286(eligibilityPorts)

/** Real source-bound ports shared with the production workload gate, for rawVM caller comparison. */
export function getOfficialPolicyWifEligibilityPorts286() {
  return eligibilityPorts
}

/** Complete official Wc gate, with original WIF host/state readers shared. */
export function hasOfficialWorkloadIdentityConfiguration286(): boolean {
  return eligibility.Wc()
}

/** Original once-only log state, shared with Wc; never instantiate another host cell. */
export function getOfficialProfileSelectorState286() {
  return eligibility.selectorState
}
