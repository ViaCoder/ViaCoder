import type { SettingsJson } from '../../utils/settings/types.js'
import type { ConsentIdentity } from './consentState.js'

/**
 * Result of fetching remotely managed settings
 */
export type RemoteManagedSettingsFetchResult = {
  success: boolean
  attempts?: number
  settings?: SettingsJson | null // null means 304 Not Modified (cache is valid)
  salvagedSettings?: SettingsJson // Native rulings apply to disk, not the raw active payload
  rulings?: import('../../utils/settings/officialPolicyParser287/native.js').PolicyRuling287[]
  checksum?: string
  uuid?: string
  signature?: string
  consentIdentity?: ConsentIdentity
  error?: string
  errorKind?: string
  httpStatus?: number
  gatewayPinMismatch?: {pinnedFingerprint: string; presentedFingerprint: string}
  errno?: string
  serverErrorType?: string
  serverErrorCode?: string
  serverAuthDenial?: string
  authType?: string
  credentialOrigin?: string
  tokenRefreshOutcome?: import('../../utils/officialOAuthEngine/runtime.js').OAuthRefreshOutcome
  forcedRefreshOutcome?: import('../../utils/officialOAuthEngine/runtime.js').OAuthRefreshOutcome
  retriedAfter401?: boolean
  skipRetry?: boolean // If true, don't retry on failure (e.g., auth errors)
}
