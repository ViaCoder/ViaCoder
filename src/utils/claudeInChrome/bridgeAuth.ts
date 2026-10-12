// Host adapters for official 2.1.283 chunk-geg6jndb z/K/T/R/j.
// Bearer policy reads use chunk-691z7ny1 gDr (one request, no cache mutation).
import axios from 'axios'
import { z } from 'zod/v4'
import { complianceTaintsSchema } from '../../vendor/official-files-api/complianceSchema.js'
import { fileSuffixForOauthConfig, getOauthConfig, OAUTH_BETA_HEADER } from '../../constants/oauth.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { getAPIProvider, isFirstPartyAnthropicBaseUrl } from '../model/providers.js'
import { getClaudeCodeUserAgent } from '../userAgent.js'
import { logForDebugging } from '../debug.js'

export type ChromePolicyDecision =
  | {denied: true; cause: 'parent_org_policy' | 'org_policy'}
  | {denied: false; unverified: string | null; verified: {bearer: string} | null}

const bearerPolicySchema = z.object({
  restrictions: z.record(z.string(), z.object({allowed: z.boolean()})),
  compliance_taints: complianceTaintsSchema as z.ZodType<string[], unknown>,
})

// This is pLt specialized to allow_claude_browser_extension: its catalog has
// serverPopulated=true, deniedUnder=['hipaa'], and no hardBlockUnder. Keep the
// explicit server restriction ahead of inferred regime defaults.
export function browserAllowedByPolicy(policy: z.infer<typeof bearerPolicySchema>, validatedClover: boolean): boolean {
  const restriction = policy.restrictions.allow_claude_browser_extension
  if (restriction) return restriction.allowed
  return !validatedClover || !policy.compliance_taints.includes('hipaa')
}

// Official chunk-geg6jndb T runs before credential refresh (K), and again
// before every bearer policy read (R). Known-denied startup must not refresh.
export function chromePolicyPreflight(
  env: Record<string, string | undefined> = process.env,
): ChromePolicyDecision | null {
  if (env.CLAUDE_CODE_CHROME_MCP_ORG_DENIED) return {denied: true, cause: 'parent_org_policy'}
  if (getAPIProvider() !== 'firstParty') return {denied: false, unverified: 'third_party_provider', verified: null}
  if (!isFirstPartyAnthropicBaseUrl() || fileSuffixForOauthConfig() === '-local-oauth')
    return {denied: false, unverified: 'custom_base_url', verified: null}
  return null
}

export async function resolveChromePolicy(
  bearer?: string, timeoutMs = 10000, env: Record<string, string | undefined> = process.env,
): Promise<ChromePolicyDecision> {
  const preflight = chromePolicyPreflight(env)
  if (preflight) return preflight
  if (!bearer) return {denied: false, unverified: 'no_oauth_token', verified: null}
  try {
    const response = await axios.get(`${getOauthConfig().BASE_API_URL}/api/claude_code/policy_limits`, {
      headers: {'User-Agent': getClaudeCodeUserAgent(), 'Cache-Control': 'no-cache', Pragma: 'no-cache',
        Authorization: `Bearer ${bearer}`, 'anthropic-beta': OAUTH_BETA_HEADER},
      timeout: timeoutMs, validateStatus: status => status >= 200 && status < 300 || status === 304,
    })
    const parsed = bearerPolicySchema.safeParse(response.data)
    if (response.status !== 304 && parsed.success) {
      return browserAllowedByPolicy(parsed.data, getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_validated_clover', false) === true)
        ? {denied: false, unverified: null, verified: {bearer}}
        : {denied: true, cause: 'org_policy'}
    }
  } catch {
    // Do not log an Axios config: it contains the Authorization header.
    logForDebugging('[Claude in Chrome] Organization policy could not be read', {level: 'warn'})
  }
  // The public official host leaves enforcement to the extension if unknown.
  return {denied: false, unverified: 'policy_unverified', verified: null}
}

/** Official chunk-1vt3h958 Gdt/Bd. /api/oauth/profile returns a different
 * shape (account.uuid); bridge identity requires validate's account_uuid.
 */
export async function validateChromeBridgeToken(token: string): Promise<{account_uuid?: string} | undefined> {
  try {
    const response = await axios.post<{account_uuid?: string}>(`${getOauthConfig().BASE_API_URL}/api/oauth/validate`, null, {
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      timeout: 10000,
    })
    return response.data
  } catch {
    // Never log the Axios error/config, which includes the bearer. The official
    // identity callback falls back to the saved account when validate fails.
    logForDebugging('[Claude in Chrome] OAuth token validation failed', {level: 'error'})
    return undefined
  }
}

export function createChromeBearerGate(
  verified: {bearer: string} | null,
  read: (token: string) => Promise<ChromePolicyDecision> = resolveChromePolicy,
) {
  let approved = verified?.bearer
  const denied = new Set<string>()
  return async (bearer: string): Promise<boolean> => {
    if (bearer === approved) return true
    if (denied.has(bearer)) return false
    const decision = await read(bearer)
    if (decision.denied === true) { denied.add(bearer); return false }
    if (decision.verified) approved = decision.verified.bearer
    return true
  }
}

export function createBridgeIdentity(deps: {
  refresh(): Promise<unknown>
  token(): string | undefined
  storedAccount(): string | undefined
  firstParty(): boolean
  profile(token: string): Promise<{account_uuid?: string} | undefined>
  mismatch(): void
}) {
  let cached: {token: string; account: string} | undefined, mismatched = false
  return {
    hasMismatch: () => mismatched,
    getUserId: async () => {
      const persisted = deps.storedAccount()
      if (!deps.firstParty()) { mismatched = false; return persisted }
      await deps.refresh().catch(() => {})
      const token = deps.token()
      if (!token) { mismatched = false; return persisted }
      if (cached?.token !== token) {
        const profile = await deps.profile(token).catch(() => undefined)
        if (!profile?.account_uuid) { mismatched = false; return persisted }
        cached = {token, account: profile.account_uuid.toLowerCase()}
      }
      const different = persisted !== undefined && persisted.toLowerCase() !== cached.account
      if (different && !mismatched) deps.mismatch()
      mismatched = different
      return cached.account
    },
  }
}
