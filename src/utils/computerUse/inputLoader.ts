import type { ComputerUseInput, ComputerUseInputAPI } from '../../vendor/official-desktop/nativeTypes.js'
import { loadOfficialInputBinding } from '../../vendor/official-desktop/nativeLoader.js'

let cached: ComputerUseInputAPI | undefined

/**
 * Official 2.1.283 wraps the bundled NAPI exports with isSupported: true.
 * Loading is platform-gated and hash-checked before the binding is admitted.
 *
 * The package exports a discriminated union on `isSupported` — narrowed here
 * once so callers get the bare `ComputerUseInputAPI` without re-checking.
 *
 * key()/keys() dispatch enigo work onto DispatchQueue.main via
 * dispatch2::run_on_main, then block a tokio worker on a channel. Under
 * Electron (CFRunLoop drains the main queue) this works; under libuv
 * (Node/bun) the main queue never drains and the promise hangs. The executor
 * calls these inside drainRunLoop().
 */
export function requireComputerUseInput(): ComputerUseInputAPI {
  if (cached) return cached
  const input = { isSupported: true, ...loadOfficialInputBinding() } as ComputerUseInput
  if (!input.isSupported) {
    throw new Error('@ant/computer-use-input is not supported on this platform')
  }
  return (cached = input)
}
