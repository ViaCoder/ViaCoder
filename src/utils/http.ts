/**
 * HTTP utility constants and helpers
 */

import { sharedHttpAuth } from './sharedHttpAuth.js'
import type { HttpAuthHeaders, HttpOAuthRetryOptions } from './officialHttpAuth/runtime.js'
import { getClaudeCodeUserAgent } from './userAgent.js'
import { getWorkload } from './workloadContext.js'
import { authEnvironment } from './authEnvironment.js'

// WARNING: We rely on `claude-cli` in the user agent for log filtering.
// Please do NOT change this without making sure that logging also gets updated!
export function getUserAgent(): string {
  const agentSdkVersion = process.env.CLAUDE_AGENT_SDK_VERSION
    ? `, agent-sdk/${process.env.CLAUDE_AGENT_SDK_VERSION}`
    : ''
  // SDK consumers can identify their app/library via CLAUDE_AGENT_SDK_CLIENT_APP
  // e.g., "my-app/1.0.0" or "my-library/2.1"
  const clientApp = authEnvironment.CLAUDE_AGENT_SDK_CLIENT_APP
    ? `, client-app/${authEnvironment.CLAUDE_AGENT_SDK_CLIENT_APP}`
    : ''
  // Turn-/process-scoped workload tag for cron-initiated requests. 1P-only
  // observability — proxies strip HTTP headers; QoS routing uses cc_workload
  // in the billing-header attribution block instead (see constants/system.ts).
  // getAnthropicClient (client.ts:98) calls this per-request inside withRetry,
  // so the read picks up the same setWorkload() value as getAttributionHeader.
  const workload = getWorkload()
  const workloadSuffix = workload ? `, workload/${workload}` : ''
  // Public npm 2.1.284 UI() uses a build-time literal, not a caller env value.
  return `claude-cli/${MACRO.VERSION} (external, ${authEnvironment.CLAUDE_CODE_ENTRYPOINT ?? 'cli'}${agentSdkVersion}${clientApp}${workloadSuffix})`
}

export function getMCPUserAgent(): string {
  const parts: string[] = []
  if (process.env.CLAUDE_CODE_ENTRYPOINT) {
    parts.push(process.env.CLAUDE_CODE_ENTRYPOINT)
  }
  if (process.env.CLAUDE_AGENT_SDK_VERSION) {
    parts.push(`agent-sdk/${process.env.CLAUDE_AGENT_SDK_VERSION}`)
  }
  if (process.env.CLAUDE_AGENT_SDK_CLIENT_APP) {
    parts.push(`client-app/${process.env.CLAUDE_AGENT_SDK_CLIENT_APP}`)
  }
  const suffix = parts.length > 0 ? ` (${parts.join(', ')})` : ''
  return `claude-code/${MACRO.VERSION}${suffix}`
}

// User-Agent for WebFetch requests to arbitrary sites. `Claude-User` is
// Anthropic's publicly documented agent for user-initiated fetches (what site
// operators match in robots.txt); the claude-code suffix lets them distinguish
// local CLI traffic from claude.ai server-side fetches.
export function getWebFetchUserAgent(): string {
  return `Claude-User (${getClaudeCodeUserAgent()}; +https://support.anthropic.com/)`
}

export type AuthHeaders = HttpAuthHeaders

/**
 * Get authentication headers for API requests
 * Returns either OAuth headers for Max/Pro users or API key headers for regular users
 */
export function getAuthHeaders(options?: {envBearerFallbackFor?: string}): AuthHeaders {
  return sharedHttpAuth.headers(options)
}

export function getResolvedHttpAuthHeaders(options?: {envBearerFallbackFor?: string}): Promise<AuthHeaders> {
  return sharedHttpAuth.resolveHeaders(options)
}

/**
 * Wrapper that handles OAuth 401 errors by force-refreshing the token and
 * retrying once. Addresses clock drift scenarios where the local expiration
 * check disagrees with the server.
 *
 * The request closure is called again on retry, so it should re-read auth
 * (e.g., via getAuthHeaders()) to pick up the refreshed token.
 *
 * Note: bridgeApi.ts has its own DI-injected version — handleOAuth401Error
 * transitively pulls in config.ts (~1300 modules), which breaks the SDK bundle.
 *
 * @param opts.also403Revoked - Also retry on 403 with "OAuth token has been
 *   revoked" body (some endpoints signal revocation this way instead of 401).
 */
export async function withOAuth401Retry<T>(
  request: () => Promise<T>,
  opts?: HttpOAuthRetryOptions,
): Promise<T> {
  return sharedHttpAuth.with401(request, opts)
}
