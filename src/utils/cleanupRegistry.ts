/** Public shutdown hooks delegate to the canonical original 287 q80 owner. */
export type CleanupAction287 = (() => unknown) | Disposable | AsyncDisposable
export type CleanupUnregister287 = (() => void) & Disposable
interface CleanupModule287 {
  _t(action: CleanupAction287): CleanupUnregister287
  uet(): Promise<void>
  mA(): boolean
  se(): {cleanup: {readonly drainStarted: boolean;readonly sizeForTesting: number};preExitFlush: unknown}
}
function original(): CleanupModule287 {
  return require('./plugins/officialHooksLifecycle287/earlyCleanup287.js') as CleanupModule287
}

// Do not create another Set, drain flag, root-host cell or disposal adapter.
// Original De owns normalization, Symbol.dispose, snapshot clearing and
// allSettled/error ordering for every existing CLI/SDK/MCP/Chrome caller.
export function registerCleanup(action: CleanupAction287): CleanupUnregister287 {
  return original()._t(action)
}
export function runCleanupFunctions(): Promise<void> {
  return original().uet()
}
export function hasCleanupStarted(): boolean {
  return original().mA()
}
export function getCleanupOwner287(): ReturnType<CleanupModule287['se']> {
  return original().se()
}
