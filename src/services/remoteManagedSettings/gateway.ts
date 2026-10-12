import { isIP } from 'node:net'
import { Agent as HttpsAgent, type AgentOptions } from 'node:https'
import { checkServerIdentity } from 'node:tls'
import { createHash } from 'node:crypto'

import type { ConsentIdentity } from './consentState.js'

export type GatewayHostVerdict =
  | {
      verified: true
      basis?: 'listed' | 'network' | 'vouched'
      network?: string
      checkedAt?: number
    }
  | {
      verified: false
      reason: string
      checkedAt?: number
    }
  | {
      unresolvedReason: string
    }

export type GatewayAuth = {
  url: string
  jwt: string
  expiresAt: number
  unpinned?: boolean
  hostVerdict?: GatewayHostVerdict
  pinnedFingerprint?: string
  gatewayIdentity?: string
  tokenEndpoint?: string
  revocationEndpoint?: string
  email?: string
}

export type GatewayClientInjection = {
  getAuth: () => GatewayAuth | null | undefined
  getPinnedFingerprint?: (
    gateway: GatewayAuth,
    requestUrl: string,
  ) => string | null | undefined
  getHostVerdict?: (gateway: GatewayAuth) => GatewayHostVerdict | undefined
}

export type GatewayTransportOptions = {
  httpsAgent?: HttpsAgent
  pinApplied: boolean
  pinSkippedBecauseProxy: boolean
}

export type GatewayHostCheckInput = {
  gatewayUrl: string
  resolvedAddresses: string[]
  declaredNetworks?: string[]
  forceLoginGatewayUrl?: string
  now?: number
}

export type GatewayHostCheckResult = {
  verdict: GatewayHostVerdict
  network?: string
}

export const GATEWAY_SETTINGS_PATH = '/managed/settings'
const GATEWAY_ID_PREFIX = 'gateway:'
const GATEWAY_ID_MAX = 256

/** Resolve the host's current verdict before any eligibility/auth decision. */
export function getInjectedGatewayAuth(injection?: GatewayClientInjection | null): GatewayAuth | null | undefined {
  const gateway = injection?.getAuth()
  if (!gateway) return gateway
  return { ...gateway, hostVerdict: injection?.getHostVerdict?.(gateway) ?? gateway.hostVerdict }
}

export function gatewayIsAccepted(gateway: GatewayAuth | null | undefined): boolean {
  if (!gateway) return false
  if (gateway.unpinned !== true) return true
  const verdict = gateway.hostVerdict
  return Boolean(verdict && 'verified' in verdict && verdict.verified === true)
}

export function gatewaySettingsEndpoint(gateway: GatewayAuth): string {
  const url = new URL(gateway.url)
  return `${url.origin}${url.pathname.replace(/\/+$/, '')}${GATEWAY_SETTINGS_PATH}`
}

export function normalizeFingerprint256(value: string): string {
  return value.replaceAll(':', '').trim().toLowerCase()
}

export function gatewayConsentIdentity(
  gateway: GatewayAuth,
  pinnedFingerprint?: string | null,
): ConsentIdentity | undefined {
  if (!gatewayIsAccepted(gateway)) return undefined
  const url = new URL(gateway.url)
  if (url.protocol !== 'https:' || !pinnedFingerprint) return undefined
  const normalized = normalizeFingerprint256(pinnedFingerprint)
  if (!normalized) return undefined
  const originPath = `${url.origin}${url.pathname === '/' ? '' : url.pathname}`
  const rawAccount = gateway.gatewayIdentity?.trim()
  if (!rawAccount) return undefined
  return {
    organizationUuid: `${GATEWAY_ID_PREFIX}${originPath}#${normalized}`,
    accountUuid:
      rawAccount.length > GATEWAY_ID_MAX
        ? `sha256:${sha256(rawAccount)}`
        : rawAccount,
  }
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

export function createPinnedHttpsAgent(
  fingerprint: string,
  options: AgentOptions = {},
): HttpsAgent {
  const pinned = normalizeFingerprint256(fingerprint)
  return new HttpsAgent({
    ...options,
    rejectUnauthorized: true,
    checkServerIdentity(hostname, certificate) {
      const standardError = checkServerIdentity(hostname, certificate)
      if (standardError) return standardError
      const presented = normalizeFingerprint256(certificate.fingerprint256 ?? '')
      if (presented !== pinned) {
        const error = Object.assign(
          new Error('gateway TLS certificate does not match the pinned fingerprint'),
          {
            code: 'ERR_GATEWAY_CERT_MISMATCH',
            pinnedFingerprint: pinned,
            presentedFingerprint: presented,
          },
        )
        return error
      }
      return undefined
    },
  })
}

export function getGatewayTransportOptions(
  gateway: GatewayAuth,
  requestUrl: string,
  options: {
    proxyConfigured?: boolean
    proxyBypassed?: boolean
    tls?: AgentOptions
  } = {},
): GatewayTransportOptions {
  const fingerprint = gateway.pinnedFingerprint
  if (!fingerprint || new URL(requestUrl).protocol !== 'https:') {
    return { pinApplied: false, pinSkippedBecauseProxy: false }
  }
  if (options.proxyConfigured && !options.proxyBypassed) {
    // This is the same explicit limitation as the official client: the
    // request-level leaf pin is not applied through an HTTPS proxy.
    return { pinApplied: false, pinSkippedBecauseProxy: true }
  }
  return {
    httpsAgent: createPinnedHttpsAgent(fingerprint, options.tls),
    pinApplied: true,
    pinSkippedBecauseProxy: false,
  }
}

export function createPrivateNetworkVerdict(
  input: GatewayHostCheckInput,
): GatewayHostCheckResult {
  const url = new URL(input.gatewayUrl)
  if (input.resolvedAddresses.length === 0) {
    return { verdict: { unresolvedReason: 'gateway address resolution returned no addresses' } }
  }
  if (url.search || url.hash || url.username || url.password) {
    return { verdict: { verified: false, reason: 'gateway URL contains query, fragment, or user information' } }
  }

  if (input.forceLoginGatewayUrl) {
    const forced = new URL(input.forceLoginGatewayUrl)
    const actualPath = trimPath(url.pathname)
    const forcedPath = trimPath(forced.pathname)
    if (forced.origin !== url.origin || (forcedPath !== actualPath && forcedPath !== '')) {
      return {
        verdict: {
          verified: false,
          reason: `managed settings name ${forced.origin}${forcedPath} as the gateway, not ${url.origin}${actualPath}`,
        },
      }
    }
  }

  const declared = input.declaredNetworks ?? []
  const matched = declared.find(network =>
    input.resolvedAddresses.some(address => addressInNetwork(address, network)),
  )
  const outside = input.resolvedAddresses.find(address =>
    matched ? !addressInNetwork(address, matched) : !isPrivateAddress(address),
  )
  if (outside) {
    return {
      verdict: {
        verified: false,
        reason: matched
          ? `gateway address ${outside} is outside declared network ${matched}`
          : `gateway address ${outside} is public or not a recognized private address`,
        checkedAt: input.now,
      },
    }
  }
  return {
    verdict: { verified: true, basis: matched ? 'network' : 'listed', network: matched, checkedAt: input.now },
    network: matched,
  }
}

function trimPath(path: string): string {
  return path.replace(/\/+$/, '')
}

export function isPrivateAddress(value: string): boolean {
  const normalized = value.replace(/^\[|\]$/g, '')
  if (isIP(normalized) === 4) {
    const octets = normalized.split('.').map(Number)
    return (
      octets[0] === 10 ||
      octets[0] === 127 ||
      (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (octets[0] === 192 && octets[1] === 168) ||
      (octets[0] === 169 && octets[1] === 254)
    )
  }
  if (isIP(normalized) === 6) {
    const lower = normalized.toLowerCase()
    return lower === '::1' || lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe8') || lower.startsWith('fe9') || lower.startsWith('fea') || lower.startsWith('feb')
  }
  return false
}

function addressInNetwork(address: string, network: string): boolean {
  const [base, bitsText] = network.split('/')
  const bits = bitsText === undefined ? undefined : Number(bitsText)
  if (bits !== undefined && (!Number.isInteger(bits) || bitsText === '')) return false
  if (isIP(address) === 4 && isIP(base) === 4) {
    if (bits === undefined) return address === base
    if (bits < 0 || bits > 32) return false
    const addressInt = ipv4Int(address)
    const baseInt = ipv4Int(base)
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0
    return (addressInt & mask) === (baseInt & mask)
  }
  if (isIP(address) === 6 && isIP(base) === 6) {
    if (bits === undefined) return address === base
    if (bits < 0 || bits > 128) return false
    const addressInt = ipv6Int(address)
    const baseInt = ipv6Int(base)
    const shift = BigInt(128 - bits)
    return (addressInt >> shift) === (baseInt >> shift)
  }
  return false
}

function ipv4Int(value: string): number {
  return value.split('.').reduce((result, octet) => result * 256 + Number(octet), 0) >>> 0
}

function ipv6Int(value: string): bigint {
  const [head, tail] = value.split('::')
  const left = head ? head.split(':').filter(Boolean) : []
  const right = tail ? tail.split(':').filter(Boolean) : []
  const groups = [...left, ...Array(8 - left.length - right.length).fill('0'), ...right]
  return groups.reduce((result, group) => (result << 16n) | BigInt(parseInt(group || '0', 16)), 0n)
}
