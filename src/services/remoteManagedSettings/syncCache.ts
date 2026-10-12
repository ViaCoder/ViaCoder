/** Official eligibility uses the existing native owner; local injection keeps its live compatibility contract. */

import {
  resetSyncCache as resetLeafCache,
  setEligibility,
  getSettingsPath,
} from './syncCacheState.js'
import { getRemoteManagedSettingsClientInjection } from './clientRuntime.js'
import { gatewayIsAccepted, getInjectedGatewayAuth } from './gateway.js'
import {remoteEligibility287} from './eligibilityBindings287.js'

let cachedPath: string | undefined
let cachedRuntime: ReturnType<typeof getRemoteManagedSettingsClientInjection> | undefined

export function resetSyncCache(): void {
  cachedPath = undefined
  cachedRuntime = undefined
  resetLeafCache()
}

/** Official eligibility and memoization; explicit local injection remains a separate compatibility seam. */
export function isRemoteManagedSettingsEligible(): boolean {
  const path = getSettingsPath()
  const runtime = getRemoteManagedSettingsClientInjection()
  if (cachedPath !== path || cachedRuntime !== runtime) {
    cachedPath = path
    cachedRuntime = runtime
    resetLeafCache()
  }
  // A host-injected gateway is the private-host equivalent of the public
  // first-party eligibility gate. Do this before public provider/base-URL
  // checks so an injected endpoint is not silently discarded as "private".
  try {
    const gateway = getInjectedGatewayAuth(getRemoteManagedSettingsClientInjection().gateway)
    if (gateway) return setEligibility(gatewayIsAccepted(gateway))
  } catch {
    return setEligibility(false)
  }
  return remoteEligibility287.memoizedEligibility()
}
