import axios from 'axios'
import { getOauthConfig } from '../../constants/oauth.js'
import {
  checkAndRefreshOAuthTokenIfNeeded,
  getClaudeAIOAuthTokens,
  getOauthAccountInfo,
  handleOAuth401Error,
  hasProfileScope,
  isClaudeAISubscriber,
} from '../../utils/auth.js'
import { fetchNormalUsage287 } from './usageProduction287.js'
import type { CredentialStore } from '../../utils/officialSecureStorage/runtime.js'
import type { UsageEndpoint287 } from './officialUsage287/runtime.js'
import { getClaudeCodeUserAgent } from '../../utils/userAgent.js'
import { isOAuthTokenExpired } from '../oauth/client.js'

export type RateLimit = {
  utilization: number | null // a percentage from 0 to 100
  resets_at: string | null // ISO 8601 timestamp
}

export type ExtraUsage = {
  is_enabled: boolean
  monthly_limit: number | null
  used_credits: number | null
  utilization: number | null
}

export type Utilization = {
  five_hour?: RateLimit | null
  seven_day?: RateLimit | null
  seven_day_oauth_apps?: RateLimit | null
  seven_day_opus?: RateLimit | null
  seven_day_sonnet?: RateLimit | null
  extra_usage?: ExtraUsage | null
}

export async function fetchUtilization(credentials?: CredentialStore, endpoint: UsageEndpoint287 = 'plain'): Promise<Utilization | null> {
  return fetchNormalUsage287(credentials, endpoint)
}

/** SDK get_usage's explicit, lane-bound OAuth read. No work is scheduled until
 * this function is called by a get_usage request. Keep the credential used by
 * the failed HTTP request so 401 recovery never refreshes another login. */
export interface SessionUsageRequestPorts {
  accountUuid(): string | undefined
  token(): {accessToken: string; expiresAt?: number} | null
  refreshExpired(): Promise<boolean>
  recover401(failedAccessToken: string): Promise<boolean>
  get(url: string, options: {headers: Record<string, string>; timeout: number}): Promise<{data: unknown}>
}

export const productionSessionUsageRequestPorts: SessionUsageRequestPorts = {
  accountUuid: () => getOauthAccountInfo()?.accountUuid,
  token: () => getClaudeAIOAuthTokens(),
  refreshExpired: () => checkAndRefreshOAuthTokenIfNeeded(),
  recover401: handleOAuth401Error,
  get: (url, options) => axios.get(url, options),
}

export async function fetchSessionUsage(ports: SessionUsageRequestPorts = productionSessionUsageRequestPorts): Promise<unknown> {
  if (!isClaudeAISubscriber() || !hasProfileScope()) return {}
  const account = ports.accountUuid()
  if (!account) throw new Error('Usage OAuth account is unavailable')
  const initial = ports.token()
  if (initial?.expiresAt !== undefined && isOAuthTokenExpired(initial.expiresAt)) {
    await ports.refreshExpired()
  }
  const url = `${getOauthConfig().BASE_API_URL}/api/oauth/usage`
  for (let attempt = 0; attempt < 2; attempt++) {
    if (ports.accountUuid() !== account) throw new Error('Usage OAuth account changed')
    const token = ports.token()?.accessToken
    if (!token) throw new Error('Usage OAuth token is unavailable')
    try {
      const response = await ports.get(url, {timeout: 5000, headers: {
        'Content-Type': 'application/json',
        'User-Agent': getClaudeCodeUserAgent(),
        Authorization: `Bearer ${token}`,
      }})
      if (ports.accountUuid() !== account) throw new Error('Usage OAuth account changed')
      return response.data
    } catch (error) {
      if (attempt !== 0 || !axios.isAxiosError(error) || error.response?.status !== 401) throw error
      if (!await ports.recover401(token)) throw error
    }
  }
}
