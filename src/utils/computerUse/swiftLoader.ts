import type { ComputerUseAPI } from '../../vendor/official-desktop/nativeTypes.js'
import { loadOfficialSwiftBinding } from '../../vendor/official-desktop/nativeLoader.js'

let cached: ComputerUseAPI | undefined

/**
 * Official 2.1.283 embeds computer-use-swift.node; its JS facade exports
 * binding.computerUse. The pinned local bytes are hash-checked before loading.
 * No global package or environment-supplied native path is searched.
 *
 * Main-queue methods (apps.listInstalled, resolvePrepareCapture) dispatch to DispatchQueue.main
 * and will hang under libuv unless CFRunLoop is pumped — call sites wrap
 * these in drainRunLoop().
 */
export function requireComputerUseSwift(): ComputerUseAPI {
  if (process.platform !== 'darwin') {
    throw new Error('@ant/computer-use-swift is macOS-only')
  }
  // Published 2.1.283 oF/c unwraps binding.computerUse (not the binding root).
  const api = cached ?? loadOfficialSwiftBinding().computerUse
  if (!api) throw new Error('Official Swift binding does not export computerUse')
  return (cached = api)
}

export type { ComputerUseAPI }
