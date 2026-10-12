import type { CachedMCConfig } from './cachedMicrocompact.js'

/** Cached microcompact is an Ant-only feature and stays off in local builds. */
export function getCachedMCConfig(): CachedMCConfig {
  return {
    enabled: false,
    supportedModels: [],
    triggerThreshold: 0,
    keepRecent: 5,
    systemPromptSuggestSummaries: false,
  }
}
