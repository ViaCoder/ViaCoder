import { feature } from 'bun:bundle'
import { getOriginalCwd } from '../../bootstrap/state.js'
import { isClaudeInChromeMCPServer } from '../../utils/claudeInChrome/common.js'
import {
  createMcpV2Client,
  type McpV2Transport,
} from '../../vendor/official-mcp-v2/index.mjs'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import { logForDebugging } from '../../utils/debug.js'
import type {
  ConnectedMCPServerV2,
  ScopedMcpServerConfig,
} from './types.js'

const DEFAULT_CONNECT_TIMEOUT_MS = 30_000
const initialIngressUrl = process.env.SESSION_INGRESS_URL ?? process.env.ANTHROPIC_BASE_URL
const CCR_INGRESS_PATHS = ['/v2/session_ingress/shttp/mcp/', '/v2/session_ingress/mcp/ws/', '/v2/ccr-sessions/', '/v1/code/']
const isComputerUseMcpServer = feature('CHICAGO_MCP')
  ? (require('../../utils/computerUse/common.js') as typeof import('../../utils/computerUse/common.js')).isComputerUseMCPServer
  : undefined

export type McpV2Prior =
  | { kind: 'legacy' }
  | { kind: 'modern'; discover: { supportedVersions: string[]; capabilities: Record<string, unknown>; instructions?: string } }

/** Official 2.1.283 chunk-w61ke47p Zo/Nr/no + chunk-4v3gzrwd zl.
 * The ingress URL is captured at startup, as in chunk-jrare64x JC/OE/tUr.
 * A caller's explicit auto override wins before denylist; ordinary third-party
 * hosts are checked by the configured host rule, never a brand whitelist. */
export function getV2Negotiation(
  name: string,
  config: ScopedMcpServerConfig,
  override = process.env.MCP_PROTOCOL_NEGOTIATION,
): { mode: 'legacy' } | { mode: 'auto'; probe: { timeoutMs: number } } {
  const selected = override === 'legacy' || override === 'auto' ? override : undefined
  if (override !== undefined && !selected)
    logForDebugging(`MCP_PROTOCOL_NEGOTIATION=${override} is invalid; expected 'legacy' or 'auto' — ignoring`, { level: 'warn' })
  if (selected === 'legacy') return { mode: 'legacy' }

  const rawTimeout = process.env.MCP_TIMEOUT
  const timeout = rawTimeout && Number(rawTimeout) > 0 ? Math.min(Number(rawTimeout), 2_147_483_647) : 30_000
  const httpProbe = { timeoutMs: Math.min(5000, Math.floor(timeout / 3)) }
  const stdioProbe = { timeoutMs: Math.min(3000, Math.floor(timeout / 3)) }
  const ccrUrl = 'url' in config && typeof config.url === 'string' && isTrustedCcrIngressUrl(config.url)
  const inProcess = isClaudeInChromeMCPServer(name) || isComputerUseMcpServer?.(name) === true
  const kind = inProcess ? 'in-process' : config.type === 'http' && ccrUrl ? 'ccr-proxy' : config.type

  if (selected === 'auto') {
    if (kind !== 'stdio' && kind !== 'http' && kind !== 'claudeai-proxy' && kind !== 'ccr-proxy')
      return { mode: 'legacy' }
    return { mode: 'auto', probe: kind === 'stdio' ? stdioProbe : httpProbe }
  }

  let enabled = false
  switch (kind) {
    case 'http': enabled = getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_mcp_protocol_negotiation_http', true) !== false; break
    case 'claudeai-proxy': enabled = getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_mcp_protocol_negotiation_claudeai', false) === true; break
    case 'stdio': enabled = getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_mcp_protocol_negotiation_stdio', false) === true; break
    case 'ccr-proxy': enabled = getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_mcp_protocol_negotiation_ccr', false) === true; break
  }
  if (!enabled || isNegotiationDenylisted(config)) return { mode: 'legacy' }
  return { mode: 'auto', probe: kind === 'stdio' ? stdioProbe : httpProbe }
}

function isTrustedCcrIngressUrl(url: string): boolean {
  if (!initialIngressUrl) return false
  try {
    const candidate = new URL(url), ingress = new URL(initialIngressUrl)
    const origin = candidate.protocol === 'wss:' ? `https://${candidate.host}` :
      candidate.protocol === 'ws:' ? `http://${candidate.host}` : candidate.origin
    return origin === ingress.origin && CCR_INGRESS_PATHS.some(path => candidate.pathname.includes(path))
  } catch { return false }
}

function isNegotiationDenylisted(config: ScopedMcpServerConfig): boolean {
  const entries = getFeatureValue_CACHED_MAY_BE_STALE<unknown>('tengu_mcp_negotiation_server_denylist', [])
  if (!Array.isArray(entries) || entries.length === 0) return false
  if (entries.includes('*')) return true
  if (!('url' in config) || typeof config.url !== 'string') return false
  const hosts: string[] = []
  try { hosts.push(new URL(config.url).hostname.toLowerCase()) } catch { /* wildcard still handled above */ }
  if (isTrustedCcrIngressUrl(config.url)) {
    try {
      const forwarded = new URL(config.url).searchParams.get('mcp_url')
      if (forwarded) {
        const target = new URL(forwarded)
        if (['http:', 'https:', 'ws:', 'wss:'].includes(target.protocol)) hosts.push(target.hostname.toLowerCase())
      }
    } catch { /* invalid forwarded host is not a match */ }
  }
  return entries.some(entry => typeof entry === 'string' && entry !== '' &&
    hosts.some(host => host === entry.toLowerCase() || host.endsWith(`.${entry.toLowerCase()}`)))
}

export type ConnectV2Options = {
  signal?: AbortSignal
  timeoutMs?: number
  prior?: McpV2Prior
  /** Transport injection for offline fixtures; production always uses the original producer. */
  transport?: McpV2Transport
  negotiationMode?: 'legacy' | 'auto'
}

/**
 * True V2 connection entry selected by the official generation arm in the
 * React owner. Unsupported transports fail closed; no V1 SDK alias is used.
 */
export async function connectToServerV2(
  name: string,
  config: ScopedMcpServerConfig,
  options: ConnectV2Options = {},
): Promise<ConnectedMCPServerV2> {
  if(!options.transport){
    const {getMcpConnectedProducer287,registerMcpConnectedProducer287,adaptNativeModernConnection287}=await import('./connectedProducer287.js');
    registerMcpConnectedProducer287('v2');
    const source=getMcpConnectedProducer287();
    const row=await source.waitForDial(source.dialModern(name,config,undefined,undefined,undefined,undefined,options.signal),{signal:options.signal,timeoutMs:options.timeoutMs,serverName:name,context:'MCP connect'});
    if(row.type!=='connected')throw Error('error'in row?row.error:`MCP server "${name}" requires authentication`);
    return adaptNativeModernConnection287(row);
  }
  if (options.signal?.aborted) throw options.signal.reason
  const negotiation = getV2Negotiation(name, config, options.negotiationMode)
  const timeoutMs = options.timeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS
  const client = createMcpV2Client(
    { name: 'claude-code', version: '2.1.287' },
    {
      capabilities: { roots: {}, elicitation: {} },
      versionNegotiation: negotiation,
    },
  )
  client.setRequestHandler('roots/list', async () => ({
    roots: [{ uri: `file://${getOriginalCwd()}` }],
  }))
  // As in the V1 connection, cover the interval before the React owner
  // installs the interactive handler. A server request never hangs here.
  client.setRequestHandler('elicitation/create', async () => ({ action: 'cancel' }))
  const transport = options.transport
  let closed = false
  let cleaned = false
  const cleanup = async () => {
    if (cleaned) return
    cleaned = true
    closed = true
    try { await client.close() } finally { await transport.close() }
  }
  client.onclose = () => { closed = true }
  let rejectAbort: ((reason?: unknown) => void) | undefined
  const abort = () => {
    void cleanup().catch(() => {})
    rejectAbort?.(options.signal?.reason ?? new DOMException('MCP connection cancelled', 'AbortError'))
  }
  options.signal?.addEventListener('abort', abort, { once: true })
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  try {
    const connect = client.connect(transport, {
      ...(options.prior ? { prior: options.prior } : {}),
      signal: options.signal,
      timeout: timeoutMs,
    })
    await Promise.race([
      connect,
      new Promise<never>((_, reject) => { rejectAbort = reject }),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          void cleanup().catch(() => {})
          reject(new Error(`MCP V2 connection timed out after ${timeoutMs}ms`))
        }, timeoutMs)
      }),
    ])
    if (closed || options.signal?.aborted) throw options.signal?.reason ?? new Error('MCP V2 connection closed during initialization')
    return {
      generation: 'v2', v2Client: client, name, type: 'connected',
      config, capabilities: client.getServerCapabilities() ?? {},
      serverInfo: client.getServerVersion(), instructions: client.getInstructions(),
      // Original modern Et producer fields: read the actual selected SDK,
      // never infer the negotiated era from the generation or config.
      negotiatedProtocolVersion:client.getNegotiatedProtocolVersion(),protocolEra:client.getProtocolEra(),
      cleanup, isClosed: () => closed,
    }
  } catch (error) {
    await cleanup().catch(() => {})
    throw error
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
    options.signal?.removeEventListener('abort', abort)
  }
}
