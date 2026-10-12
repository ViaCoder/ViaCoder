import type { CoordinateMode, CuSubGates } from '@ant/computer-use-mcp/types'

import { getDynamicConfig_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { getSubscriptionType } from '../auth.js'
import { evaluateChicagoAvailability } from './gatePolicy.js'

type ChicagoConfig = CuSubGates & {
  enabled: boolean
  coordinateMode: CoordinateMode
  maskFailClosed: boolean
  adaptiveResolution: boolean
}

const DEFAULTS: ChicagoConfig = {
  enabled: false,
  pixelValidation: false,
  clipboardPasteMultiline: true,
  mouseAnimation: true,
  hideBeforeAction: true,
  autoTargetDisplay: true,
  clipboardGuard: true,
  maskFailClosed: true,
  adaptiveResolution: false,
  coordinateMode: 'pixels',
}

// Spread over defaults so a partial JSON ({"enabled": true} alone) inherits the
// rest. The generic on getDynamicConfig is a type assertion, not a validator —
// GB returning a partial object would otherwise surface undefined fields.
function readConfig(): ChicagoConfig {
  return {
    ...DEFAULTS,
    ...getDynamicConfig_CACHED_MAY_BE_STALE<Partial<ChicagoConfig>>(
      'tengu_malort_pedway',
      DEFAULTS,
    ),
  }
}

/** The published gate has no employee/env bypass. Keep entrypoints stopped
 * until an authoritative compliance source (oc in the official host) is wired.
 * No credentials or network are read to fabricate that missing decision here.
 */
export function getChicagoAvailability() {
  return evaluateChicagoAvailability({platform: process.platform, arch: process.arch,
    get tier() { return getSubscriptionType() },
    get rolloutEnabled() { return readConfig().enabled },
    complianceTaints: undefined,
  })
}

export function getChicagoEnabled(): boolean {
  return getChicagoAvailability().enabled
}

export function getChicagoSubGates(): CuSubGates {
  const { enabled: _e, coordinateMode: _c, ...subGates } = readConfig()
  return subGates
}

// Frozen at first read — setup.ts builds tool descriptions and executor.ts
// scales coordinates off the same value. A live read here lets a mid-session
// GB flip tell the model "pixels" while transforming clicks as normalized.
let frozenCoordinateMode: CoordinateMode | undefined
export function getChicagoCoordinateMode(): CoordinateMode {
  frozenCoordinateMode ??= readConfig().coordinateMode
  return frozenCoordinateMode
}
