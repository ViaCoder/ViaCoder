import {getGrovePublicApi287,type GrovePublicApi287} from '../../components/grove/officialStartup287/runtime.js'
import {isEssentialTrafficOnly} from '../../utils/privacyLevel.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'














// Cache expiration: 24 hours


export type AccountSettings = {
  grove_enabled: boolean | null
  grove_notice_viewed_at: string | null
}

export type GroveConfig = {
  grove_enabled: boolean
  domain_excluded: boolean
  notice_is_grace_period: boolean
  notice_reminder_frequency: number | null
}

/**
 * Result type that distinguishes between API failure and success.
 * - success: true means API call succeeded (data may still contain null fields)
 * - success: false means API call failed after retry
 */
export type ApiResult<T> = { success: true; data: T } | { success: false }

/**
 * Get the current Grove settings for the user account.
 * Returns ApiResult to distinguish between API failure and success.
 * Uses existing OAuth 401 retry, then returns failure if that doesn't help.
 *
 * Memoized for the session to avoid redundant per-render requests.
 * Cache is invalidated in updateGroveSettings() so post-toggle reads are fresh.
 */
export const getGroveSettings=Object.defineProperty(async(credentials?:CredentialStore):Promise<ApiResult<AccountSettings>>=>isEssentialTrafficOnly()?{success:false}:getGrovePublicApi287().EX(credentials),'cache',{get:()=>getGrovePublicApi287().EX.cache}) as GrovePublicApi287['EX']

/**
 * Mark that the Grove notice has been viewed by the user
 */
export function markGroveNoticeViewed(credentials?:CredentialStore):Promise<void>{return getGrovePublicApi287().mMn(credentials)}

/**
 * Update Grove settings for the user account
 */
export function updateGroveSettings(enabled:boolean,credentials?:CredentialStore):Promise<void>{return getGrovePublicApi287().Dot(enabled,credentials)}

/**
 * Check if user is qualified for Grove (non-blocking, cache-first).
 *
 * This function never blocks on network - it returns cached data immediately
 * and fetches in the background if needed. On cold start (no cache), it returns
 * false and the Grove dialog won't show until the next session.
 */
export function isQualifiedForGrove(storageV5?:unknown,credentials?:CredentialStore):Promise<boolean>{return getGrovePublicApi287().NVe(storageV5,credentials)}

/**
 * Fetch Grove config from API and store in cache
 */


/**
 * Get Grove Statsig configuration from the API.
 * Returns ApiResult to distinguish between API failure and success.
 * Uses existing OAuth 401 retry, then returns failure if that doesn't help.
 */
export const getGroveNoticeConfig=Object.defineProperty(async(credentials?:CredentialStore):Promise<ApiResult<GroveConfig>>=>isEssentialTrafficOnly()?{success:false}:getGrovePublicApi287().Cge(credentials),'cache',{get:()=>getGrovePublicApi287().Cge.cache}) as GrovePublicApi287['Cge']

/**
 * Determines whether the Grove dialog should be shown.
 * Returns false if either API call failed (after retry) - we hide the dialog on API failure.
 */
export function calculateShouldShowGrove(settingsResult:ApiResult<AccountSettings>,configResult:ApiResult<GroveConfig>,showIfAlreadyViewed:boolean):boolean{return getGrovePublicApi287().gMn(settingsResult,configResult,showIfAlreadyViewed)}

export function checkGroveForNonInteractive(credentials?:CredentialStore):Promise<void>{return getGrovePublicApi287().Cgo(credentials)}
