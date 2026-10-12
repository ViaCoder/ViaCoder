import type { Logger } from '../../vendor/official-desktop/nativeTypes.js'
import { format } from 'util'
import { logForDebugging } from '../debug.js'
import { COMPUTER_USE_MCP_SERVER_NAME } from './common.js'
import { createCliExecutor } from './executor.js'
import { getChicagoSubGates } from './gates.js'
import { getLocalComputerUseAvailability } from './localAvailability.js'
import { requireComputerUseSwift } from './swiftLoader.js'

class DebugLogger implements Logger {
  silly(message: string, ...args: unknown[]): void {
    logForDebugging(format(message, ...args), { level: 'debug' })
  }
  debug(message: string, ...args: unknown[]): void {
    logForDebugging(format(message, ...args), { level: 'debug' })
  }
  info(message: string, ...args: unknown[]): void {
    logForDebugging(format(message, ...args), { level: 'info' })
  }
  warn(message: string, ...args: unknown[]): void {
    logForDebugging(format(message, ...args), { level: 'warn' })
  }
  error(message: string, ...args: unknown[]): void {
    logForDebugging(format(message, ...args), { level: 'error' })
  }
}

type ComputerUseHostAdapter = {
  serverName: string
  logger: Logger
  executor: ReturnType<typeof createCliExecutor>
  ensureOsPermissions: () => Promise<{ granted: true } | { granted: false; accessibility: boolean; screenRecording: boolean }>
  isDisabled: () => boolean
  getSubGates: typeof getChicagoSubGates
  getAutoUnhideEnabled: () => boolean
  cropRawPatch: () => null
}

let cached: ComputerUseHostAdapter | undefined

/**
 * Process-lifetime singleton. Built on the first CU host request. The official
 * executor loads Swift here; input remains lazy until an input operation.
 * Loading failures propagate rather than fabricating a native implementation.
 */
export function getComputerUseHostAdapter(): ComputerUseHostAdapter {
  if (cached) return cached
  cached = {
    serverName: COMPUTER_USE_MCP_SERVER_NAME,
    logger: new DebugLogger(),
    executor: createCliExecutor({
      getMouseAnimationEnabled: () => getChicagoSubGates().mouseAnimation,
      getHideBeforeActionEnabled: () => getChicagoSubGates().hideBeforeAction,
    }),
    ensureOsPermissions: async () => {
      const cu = requireComputerUseSwift()
      const accessibility = cu.tcc.checkAccessibility()
      const screenRecording = cu.tcc.checkScreenRecording()
      return accessibility && screenRecording
        ? { granted: true }
        : { granted: false, accessibility, screenRecording }
    },
    isDisabled: () => !getLocalComputerUseAvailability().enabled,
    getSubGates: getChicagoSubGates,
    // cleanup.ts always unhides at turn end — no user preference to disable it.
    getAutoUnhideEnabled: () => true,

    // Pixel-validation JPEG decode+crop. MUST be synchronous (the package
    // does `patch1.equals(patch2)` directly on the return value). Cowork uses
    // Electron's `nativeImage` (sync); our `image-processor-napi` is
    // sharp-compatible and async-only. Returning null → validation skipped,
    // click proceeds — the designed fallback per `PixelCompareResult.skipped`.
    // The sub-gate defaults to false anyway.
    cropRawPatch: () => null,
  }
  return cached
}
