import { AsyncLocalStorage } from 'async_hooks'
import { getCwdState, getOriginalCwd } from '../bootstrap/state.js'
import {getExecutionSession287,getLegacyExecutionContext287} from '../services/context/execution287.js'

const cwdOverrideStorage = new AsyncLocalStorage<string>()

/**
 * Run a function with an overridden working directory for the current async context.
 * All calls to pwd()/getCwd() within the function (and its async descendants) will
 * return the overridden cwd instead of the global one. This enables concurrent
 * agents to each see their own working directory without affecting each other.
 */
export function runWithCwdOverride<T>(cwd: string, fn: () => T): T {
  return cwdOverrideStorage.run(cwd, fn)
}

/**
 * Get the current working directory
 */
export function pwd(): string {
  return cwdOverrideStorage.getStore() ?? getCwdState()
}

/**
 * Get the current working directory or the original working directory if the current one is not available
 */
export function getCwd(): string {
  try {
    return pwd()
  } catch {
    return getLegacyExecutionContext287()?.originalCwd ?? getOriginalCwd()
  }
}

/** Original Lm/um null boundary, using the existing CWD override and session. */
export function getNullableCwd287():string|null {
  if(cwdOverrideStorage.getStore()===undefined&&getLegacyExecutionContext287()?.originalCwd===undefined&&getExecutionSession287().project===null)return null
  return getCwd()
}
