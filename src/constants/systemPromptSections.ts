import {
  clearBetaHeaderLatches,
  getSystemPromptSectionCache,
  getSystemPromptSectionEpoch,
  setSystemPromptSectionCacheEntry,
} from '../bootstrap/state.js'
import {createPromptRegistry287,createPromptResolver287} from './officialPromptRegistry287/native.js'
import {agentPromptState287} from '../services/context/agentPromptState287.js'

const resolver = createPromptResolver287<string | null>()
const registry = createPromptRegistry287<string | null>({
  sections: getSystemPromptSectionCache,
  recordSection: setSystemPromptSectionCacheEntry,
  epoch: getSystemPromptSectionEpoch,
  resolvePromptSection: resolver.resolvePromptSection,
})

export const setPromptSectionResolver287 = resolver.setPromptSectionResolver
export const setPromptSectionInvalidator287 = resolver.setPromptSectionInvalidator
export const invalidatePromptSections287 = resolver.invalidatePromptSections

type ComputeFn = () => string | null | Promise<string | null>

type SystemPromptSection = {
  name: string
  compute: ComputeFn
  cacheBreak: boolean
}

/**
 * Create a memoized system prompt section.
 * Computed once, cached until /clear or /compact.
 */
export function systemPromptSection(
  name: string,
  compute: ComputeFn,
): SystemPromptSection {
  return registry.defineSection(name, compute)
}

/**
 * Create a volatile system prompt section that recomputes every turn.
 * This WILL break the prompt cache when the value changes.
 * Requires a reason explaining why cache-breaking is necessary.
 */
export function DANGEROUS_uncachedSystemPromptSection(
  name: string,
  compute: ComputeFn,
  _reason: string,
): SystemPromptSection {
  return { name, compute, cacheBreak: true }
}

/**
 * Resolve all system prompt sections, returning prompt strings.
 */
export function resolveSystemPromptSections(
  sections: SystemPromptSection[],
  options?: {isStored?: boolean; hookOrigin?: unknown},
): Promise<(string | null)[]> {
  return registry.resolvePromptSections(sections, options)
}

/**
 * Clear all system prompt section state. Called on /clear and /compact.
 * Also resets beta header latches so a fresh conversation gets fresh
 * evaluation of AFK/fast-mode/cache-editing headers.
 */
export function clearSystemPromptSections(bindingAgentId?: string | null): void {
  agentPromptState287.invalidatePromptBoundary()
  clearBetaHeaderLatches(bindingAgentId)
}

/** Same original iwe projection used by the complete outer composer. */
export const toSystemPromptRecords287 = registry.toScopedRecords
