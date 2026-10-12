// Auto mode state functions — lives in its own module so callers can
// conditionally require() it on feature('TRANSCRIPT_CLASSIFIER').

// Same original host-scoped xns/LF/RKo already selected by Mods lifecycle.
// Resolve lazily to avoid the permissions/Hooks import SCC, not a second V.
export function getAutoModeStateOwner287() {
  return (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().autoModeOwner()
}

export function setAutoModeActive(active: boolean): void {
  getAutoModeStateOwner287().setActive(active)
}

export function isAutoModeActive(): boolean {
  return getAutoModeStateOwner287().active
}

export function setAutoModeFlagCli(passed: boolean): void {
  getAutoModeStateOwner287().setFlagCli(passed)
}

export function getAutoModeFlagCli(): boolean {
  return getAutoModeStateOwner287().flagCli
}

export function setAutoModeCircuitBroken(broken: boolean): void {
  getAutoModeStateOwner287().setCircuitBroken(broken)
}

export function isAutoModeCircuitBroken(): boolean {
  return getAutoModeStateOwner287().circuitBroken
}

export function _resetForTesting(): void {
  const state = getAutoModeStateOwner287()
  // Preserve this test facade's existing three-field reset, not unrelated RKo
  // onboarding/account/fallback fields owned by other source producers.
  state.setActive(false)
  state.setFlagCli(false)
  state.setCircuitBroken(false)
}
