// Proxy, mTLS and CA handling for supported API providers.
import axios, { type AxiosInstance } from 'axios'
import type { LookupOptions } from 'dns'
import type { Agent } from 'http'
import { isIP } from 'node:net'
import { HttpsProxyAgent, type HttpsProxyAgentOptions } from 'https-proxy-agent'
import memoize from 'lodash-es/memoize.js'
import type * as undici from 'undici'
import { getCACertificates } from './caCerts.js'
import { logForDebugging } from './debug.js'
import { isEnvTruthy } from './envUtils.js'
import {createChromeProxy287,type ChromeProxy287} from './claudeInChrome/officialProxy287/native.js'
import {createRequire} from 'node:module'
import {
  getMTLSAgent,
  getMTLSConfig,
  getTLSFetchOptions,
  type TLSConfig,
} from './mtls.js'

// Disable fetch keep-alive after a stale-pool ECONNRESET so retries open a
// fresh TCP connection instead of reusing the dead pooled socket. Sticky for
// the process lifetime — once the pool is known-bad, don't trust it again.
// Works under Bun (native fetch respects keepalive:false for pooling).
// Under Node/undici, keepalive is a no-op for pooling, but undici
// naturally evicts dead sockets from the pool on ECONNRESET.
let keepAliveDisabled = false

export function disableKeepAlive(): void {
  keepAliveDisabled = true
}

export function _resetKeepAliveForTesting(): void {
  keepAliveDisabled = false
}

/**
 * Convert dns.LookupOptions.family to a numeric address family value
 * Handles: 0 | 4 | 6 | 'IPv4' | 'IPv6' | undefined
 */
export function getAddressFamily(options: LookupOptions): 0 | 4 | 6 {
  switch (options.family) {
    case 0:
    case 4:
    case 6:
      return options.family
    case 'IPv6':
      return 6
    case 'IPv4':
    case undefined:
      return 4
    default:
      throw new Error(`Unsupported address family: ${options.family}`)
  }
}

type EnvLike = Record<string, string | undefined>

/**
 * Get the active proxy URL if one is configured
 * Prefers lowercase variants over uppercase (https_proxy > HTTPS_PROXY > http_proxy > HTTP_PROXY)
 * @param env Environment variables to check (defaults to process.env for production use)
 */
export function getProxyUrl(env: EnvLike = process.env): string | undefined {
  return getCanonicalProxy287().proxyUrl(env)
}

/**
 * Get the NO_PROXY environment variable value
 * Combines lowercase and uppercase values, matching the official runtime.
 * @param env Environment variables to check (defaults to process.env for production use)
 */
export function getNoProxy(env: EnvLike = process.env): string | undefined {
  return getCanonicalProxy287().noProxy(env)
}

/**
 * Check if a URL should bypass the proxy based on NO_PROXY environment variable
 * Supports:
 * - Exact hostname matches (e.g., "localhost")
 * - Domain suffix matches with leading dot (e.g., ".example.com")
 * - Wildcard "*" to bypass all
 * - Port-specific matches (e.g., "example.com:8080")
 * - IP addresses (e.g., "127.0.0.1")
 * @param urlString URL to check
 * @param noProxy NO_PROXY value (defaults to getNoProxy() for production use)
 */
export function shouldBypassProxy(urlString: string, noProxy: string | undefined = getNoProxy()): boolean {
  return getCanonicalProxy287().bypass(urlString,noProxy)
}

/**
 * The official fallback-proxy path additionally accepts IP/CIDR entries.
 * Keep this separate from the primary proxy matcher so the outgoing route
 * remains identical to the npm package for the normal Anthropic proxy path.
 */
export function shouldBypassProxyWithCIDR(
  urlString: string,
  noProxy: string | undefined = getNoProxy(),
): boolean {
  if (shouldBypassProxy(urlString, noProxy)) return true
  if (!noProxy) return false
  let hostname: string
  try {
    hostname = new URL(urlString).hostname.replace(/^\[|\]$/g, '')
  } catch {
    return false
  }
  if (isIP(hostname) === 0) return false
  return noProxy.split(/[\s,]+/).filter(Boolean).some(pattern => {
    if (!pattern.includes('/')) return false
    return addressInNetwork(hostname, pattern)
  })
}

/**
 * Create an HttpsProxyAgent with optional mTLS configuration
 * Skips local DNS resolution to let the proxy handle it
 */
function createHttpsProxyAgent(
  proxyUrl: string,
  extra: HttpsProxyAgentOptions<string> = {},
): HttpsProxyAgent<string> {
  const mtlsConfig = getMTLSConfig()
  const caCerts = getCACertificates()

  const agentOptions: HttpsProxyAgentOptions<string> = {
    ...(mtlsConfig && {
      cert: mtlsConfig.cert,
      key: mtlsConfig.key,
      passphrase: mtlsConfig.passphrase,
    }),
    ...(caCerts && { ca: caCerts }),
  }

  if (isEnvTruthy(process.env.CLAUDE_CODE_PROXY_RESOLVES_HOSTS)) {
    // Skip local DNS resolution - let the proxy resolve hostnames
    // This is needed for environments where DNS is not configured locally
    // and instead handled by the proxy (as in sandboxes)
    agentOptions.lookup = (hostname, options, callback) => {
      callback(null, hostname, getAddressFamily(options))
    }
  }

  return new HttpsProxyAgent(proxyUrl, { ...agentOptions, ...extra })
}

/**
 * Axios instance with its own proxy agent. Same NO_PROXY/mTLS/CA
 * resolution as the global interceptor, but agent options stay
 * scoped to this instance.
 */
export function createAxiosInstance(
  extra: HttpsProxyAgentOptions<string> = {},
): AxiosInstance {
  const proxyUrl = getProxyUrl()
  const mtlsAgent = getMTLSAgent()
  const instance = axios.create({ proxy: false })

  if (!proxyUrl) {
    if (mtlsAgent) instance.defaults.httpsAgent = mtlsAgent
    return instance
  }

  const proxyAgent = createHttpsProxyAgent(proxyUrl, extra)
  instance.interceptors.request.use(config => {
    if (config.url && shouldBypassProxy(config.url)) {
      config.httpsAgent = mtlsAgent
      config.httpAgent = mtlsAgent
    } else {
      config.httpsAgent = proxyAgent
      config.httpAgent = proxyAgent
    }
    return config
  })
  return instance
}

/**
 * Get or create a memoized proxy agent for the given URI
 * Now respects NO_PROXY environment variable
 */
export const getProxyAgent = memoize((uri: string): undici.Dispatcher => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const undiciMod = require('undici') as typeof undici
  const mtlsConfig = getMTLSConfig()
  const caCerts = getCACertificates()

  // Use EnvHttpProxyAgent to respect NO_PROXY
  // This agent automatically checks NO_PROXY for each request
  const proxyOptions: undici.EnvHttpProxyAgent.Options & {
    requestTls?: {
      cert?: string | Buffer
      key?: string | Buffer
      passphrase?: string
      ca?: string | string[] | Buffer
    }
  } = {
    // Override both HTTP and HTTPS proxy with the provided URI
    httpProxy: uri,
    httpsProxy: uri,
    noProxy: getNoProxy(),
  }

  // Set both connect and requestTls so TLS options apply to both paths:
  // - requestTls: used by ProxyAgent for the TLS connection through CONNECT tunnels
  // - connect: used by Agent for direct (no-proxy) connections
  if (mtlsConfig || caCerts) {
    const tlsOpts = {
      ...(mtlsConfig && {
        cert: mtlsConfig.cert,
        key: mtlsConfig.key,
        passphrase: mtlsConfig.passphrase,
      }),
      ...(caCerts && { ca: caCerts }),
    }
    proxyOptions.connect = tlsOpts
    proxyOptions.requestTls = tlsOpts
  }

  return new undiciMod.EnvHttpProxyAgent(proxyOptions)
})

/**
 * Build an authenticated per-client dispatcher. The helper output is passed in
 * at the API-client boundary; this module never derives host/server credentials.
 */
function getProxyAuthAgent(uri: string, token: string): undici.Dispatcher {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const undiciMod = require('undici') as typeof undici
  const mtlsConfig = getMTLSConfig()
  const caCerts = getCACertificates()
  const tlsOptions = {
    ...(mtlsConfig && {
      cert: mtlsConfig.cert,
      key: mtlsConfig.key,
      passphrase: mtlsConfig.passphrase,
    }),
    ...(caCerts && { ca: caCerts }),
  }
  return new undiciMod.ProxyAgent({
    uri,
    headers: { 'Proxy-Authorization': token },
    ...(Object.keys(tlsOptions).length > 0 && {
      connect: tlsOptions,
      requestTls: tlsOptions,
    }),
  })
}

/**
 * Get an HTTP agent configured for WebSocket proxy support
 * Returns undefined if no proxy is configured or URL should bypass proxy
 */
export function getWebSocketProxyAgent(url: string): Agent | undefined {
  const proxyUrl = getProxyUrl()

  if (!proxyUrl) {
    return undefined
  }

  // Check if URL should bypass proxy
  if (shouldBypassProxy(url)) {
    return undefined
  }

  return createHttpsProxyAgent(proxyUrl)
}

/**
 * Get the proxy URL for WebSocket connections under Bun.
 * Bun's native WebSocket supports a `proxy` string option instead of Node's `agent`.
 * Returns undefined if no proxy is configured or URL should bypass proxy.
 */
export function getWebSocketProxyUrl(url: string): string | undefined {
  const proxyUrl = getProxyUrl()

  if (!proxyUrl) {
    return undefined
  }

  if (shouldBypassProxy(url)) {
    return undefined
  }

  return proxyUrl
}

/**
 * Get fetch options for the Anthropic SDK with proxy and mTLS configuration
 * Returns fetch options with appropriate dispatcher for proxy and/or mTLS
 *
 * @param opts.forAnthropicAPI - Enables ANTHROPIC_UNIX_SOCKET tunneling. This
 *   env var is set by `claude ssh` on the remote CLI to route API calls through
 *   an ssh -R forwarded unix socket to a local auth proxy. It MUST NOT leak
 *   into non-Anthropic-API fetch paths (MCP HTTP/SSE transports, etc.) or those
 *   requests get misrouted to api.anthropic.com. Only the Anthropic SDK client
 *   should pass `true` here.
 */
export function getProxyFetchOptions(opts?: {
  forAnthropicAPI?: boolean
  hasBodyIdleWatchdog?: boolean
  url?: string
  fallbackProxy?: {
    url: string
    noProxy?: string
    ca?: string | string[] | Buffer
  }
  /** Host/runtime injection equivalent of the official proxy auth cache. */
  proxyAuthToken?: string
}): {
  tls?: TLSConfig
  dispatcher?: undici.Dispatcher
  proxy?: string | { url: string; headers?: Record<string, string> }
  unix?: string
  keepalive?: false
  timeout?: false
} {
  const forceIdleTimeout = process.env.API_FORCE_IDLE_TIMEOUT
  const envTruthy =
    typeof forceIdleTimeout === 'string' &&
    ['1', 'true', 'yes', 'on'].includes(forceIdleTimeout.toLowerCase().trim())
  const envFalsy =
    typeof forceIdleTimeout === 'string' &&
    ['0', 'false', 'no', 'off'].includes(forceIdleTimeout.toLowerCase().trim())
  const hasBodyIdleWatchdog =
    opts?.forAnthropicAPI === true &&
    !envTruthy &&
    (opts.hasBodyIdleWatchdog === true ||
      envFalsy)
  const base = keepAliveDisabled ? ({ keepalive: false } as const) : {}
  const watchdog = hasBodyIdleWatchdog ? ({ timeout: false } as const) : {}

  // ANTHROPIC_UNIX_SOCKET tunnels through the `claude ssh` auth proxy, which
  // hardcodes the upstream to the Anthropic API. Scope to the Anthropic API
  // client so MCP/SSE/other callers don't get their requests misrouted.
  if (opts?.forAnthropicAPI) {
    const unixSocket = process.env.ANTHROPIC_UNIX_SOCKET
    if (unixSocket && typeof Bun !== 'undefined') {
      return { ...base, ...watchdog, unix: unixSocket }
    }
  }

  const proxyUrl = getProxyUrl()

  // If we have a proxy, use the proxy agent (which includes mTLS config)
  if (proxyUrl) {
    if (opts?.url && shouldBypassProxy(opts.url)) {
      return { ...base, ...watchdog, ...getTLSFetchOptions() }
    }
    if (typeof Bun !== 'undefined') {
      // Keep the official transport boundary: Bun receives the configured
      // proxy URL unchanged and owns URL-credential parsing.  Only the
      // optional official proxy-auth-helper value is injected as a header.
      const proxyHeaders = opts.proxyAuthToken
        ? { 'Proxy-Authorization': opts.proxyAuthToken }
        : undefined
      return {
        ...base,
        ...watchdog,
        proxy: proxyHeaders
          ? { url: proxyUrl, headers: proxyHeaders }
          : proxyUrl,
        ...getTLSFetchOptions(),
      }
    }
    return {
      ...base,
      ...watchdog,
      dispatcher: opts.proxyAuthToken
        ? getProxyAuthAgent(proxyUrl, opts.proxyAuthToken)
        : getProxyAgent(proxyUrl),
    }
  }

  if (opts?.fallbackProxy) {
    if (
      opts.url &&
      shouldBypassProxyWithCIDR(opts.url, opts.fallbackProxy.noProxy ?? getNoProxy())
    ) {
      return { ...base, ...watchdog, ...getTLSFetchOptions() }
    }
    const tls = getTLSFetchOptions()
    return {
      ...base,
      ...watchdog,
      proxy: opts.fallbackProxy.url,
      ...(opts.fallbackProxy.ca
        ? { tls: { ...(tls.tls ?? {}), ca: opts.fallbackProxy.ca } }
        : tls),
    }
  }

  // Otherwise, use TLS options directly if available
  return { ...base, ...watchdog, ...getTLSFetchOptions() }
}

function addressInNetwork(address: string, network: string): boolean {
  const [base, bitsText] = network.split('/')
  if (!base || isIP(address) === 0 || isIP(base) !== isIP(address)) return false
  const bits = bitsText === undefined ? undefined : Number(bitsText)
  if (bits !== undefined && !Number.isInteger(bits)) return false
  if (isIP(address) === 4) {
    if (bits !== undefined && (bits < 0 || bits > 32)) return false
    const width = bits ?? 32
    const mask = width === 0 ? 0 : (0xffffffff << (32 - width)) >>> 0
    return (ipv4Int(address) & mask) === (ipv4Int(base) & mask)
  }
  if (bits !== undefined && (bits < 0 || bits > 128)) return false
  const width = bits ?? 128
  const shift = BigInt(128 - width)
  return (ipv6Int(address) >> shift) === (ipv6Int(base) >> shift)
}

function ipv4Int(value: string): number {
  return value
    .split('.')
    .reduce((result, octet) => result * 256 + Number(octet), 0) >>> 0
}

function ipv6Int(value: string): bigint {
  const [head, tail] = value.split('::')
  const left = head ? head.split(':').filter(Boolean) : []
  const right = tail ? tail.split(':').filter(Boolean) : []
  const groups = [
    ...left,
    ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'),
    ...right,
  ]
  return groups.reduce(
    (result, group) => (result << 16n) | BigInt(parseInt(group || '0', 16)),
    0n,
  )
}

/**
 * Configure global HTTP agents for both axios and undici
 * This ensures all HTTP requests use the proxy and/or mTLS if configured
 */
// The original j/ie and invalid-proxy warning set live only in this factory.
// Lazy construction keeps this shared owner cold-import safe with TLS and MCP.
let canonicalProxy287:ChromeProxy287|undefined
export function getCanonicalProxy287():ChromeProxy287 {
  return canonicalProxy287??=createChromeProxy287({
    axios,mtlsAgent:getMTLSAgent,mtlsConfig:getMTLSConfig,caCerts:getCACertificates,
    proxyAgent:getProxyAgent,
    httpsProxyAgent:(url,options)=>new HttpsProxyAgent(url,options),
    require:createRequire(import.meta.url),builtins:{},
  })
}
export function configureGlobalAgents(): void {
  getCanonicalProxy287().configure()
}

/**
 * Clear proxy agent cache.
 */
export function clearProxyCache(): void {
  getProxyAgent.cache.clear?.()
  logForDebugging('Cleared proxy agent cache')
}
