import { URL } from 'url'
import { SSETransport } from './SSETransport.js'

/** Official Pye: normalize the session base before BOTH SSE and CCR use it. */
export function normalizeSessionUrl(url: URL): URL {
  const normalized = new URL(url.href)
  if (normalized.protocol === 'ws:') normalized.protocol = 'http:'
  if (normalized.protocol === 'wss:') normalized.protocol = 'https:'
  if (normalized.protocol !== 'http:' && normalized.protocol !== 'https:') {
    throw new Error(`Unsupported protocol: ${normalized.protocol}`)
  }
  return normalized
}

/** Official Ie → be always composes an SSE reader with a CCR writer.
 * Legacy WS/Hybrid classes remain available to their explicit v1 callers.
 */
export function getTransportForUrl(
  url: URL,
  headers: Record<string, string> = {},
  sessionId?: string,
  refreshHeaders?: () => Record<string, string>,
  sseKeepaliveMaxIntervalSeconds?: () => number,
): SSETransport {
  const sseUrl = normalizeSessionUrl(url)
  sseUrl.pathname = sseUrl.pathname.replace(/\/$/, '') + '/worker/events/stream'
  return new SSETransport(sseUrl, headers, sessionId, refreshHeaders,
    undefined, undefined, sseKeepaliveMaxIntervalSeconds)
}
