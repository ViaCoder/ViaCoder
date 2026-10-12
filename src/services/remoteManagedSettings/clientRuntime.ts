import type { RemotePolicyStorage287 } from './officialOwner287/native.js'
import type { ConsentInjection } from './consentState.js'
import type { GatewayClientInjection } from './gateway.js'
import type { SignedCacheInjection } from './signedCache.js'

export type RemoteManagedSettingsClientInjection = {
  storageV5?: RemotePolicyStorage287
  gateway?: GatewayClientInjection | null
  signedCache?: SignedCacheInjection
  consent?: ConsentInjection
  now?: () => number
}

let current: RemoteManagedSettingsClientInjection = {}

export function getRemoteManagedSettingsClientInjection(): RemoteManagedSettingsClientInjection {
  return current
}

/** Whether the host selected the Gateway transport for this client runtime. */
export function hasGatewayInjection(): boolean {
  return current.gateway !== undefined && current.gateway !== null
}

/**
 * Host-owned state enters through this seam. The default is deliberately
 * empty: no credentials, trust roots, verdicts, or server identity are
 * invented by the public client.
 */
export function installRemoteManagedSettingsClientInjection(
  injection: RemoteManagedSettingsClientInjection,
): () => void {
  const previous = current
  current = injection
  return () => {
    current = previous
  }
}

export function resetRemoteManagedSettingsClientInjection(): void {
  current = {}
}
