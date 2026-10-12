export type CachedMCConfig = {
  enabled: boolean
  supportedModels: string[]
  triggerThreshold: number
  keepRecent: number
  systemPromptSuggestSummaries: boolean
}

export type CacheEditsBlock = {
  type: 'cache_edits'
  edits: { type: 'delete'; cache_reference: string }[]
}

export type PinnedCacheEdits = {
  userMessageIndex: number
  block: CacheEditsBlock
}

export type CachedMCState = {
  registeredTools: Set<string>
  toolOrder: string[]
  deletedRefs: Set<string>
  pinnedEdits: PinnedCacheEdits[]
}

export function isCachedMicrocompactEnabled(): boolean {
  return false
}

export function isModelSupportedForCacheEditing(_model: string): boolean {
  return false
}

export function getCachedMCConfig(): CachedMCConfig {
  return {
    enabled: false,
    supportedModels: [],
    triggerThreshold: 0,
    keepRecent: 5,
    systemPromptSuggestSummaries: false,
  }
}

export function createCachedMCState(): CachedMCState {
  return {
    registeredTools: new Set(),
    toolOrder: [],
    deletedRefs: new Set(),
    pinnedEdits: [],
  }
}

export function registerToolResult(
  state: CachedMCState,
  toolUseId: string,
): void {
  state.registeredTools.add(toolUseId)
  state.toolOrder.push(toolUseId)
}

export function registerToolMessage(
  _state: CachedMCState,
  _toolUseIds: string[],
): void {}

export function getToolResultsToDelete(_state: CachedMCState): string[] {
  return []
}

export function createCacheEditsBlock(
  _state: CachedMCState,
  _toolUseIds: string[],
): CacheEditsBlock | null {
  return null
}

export function markToolsSentToAPI(_state: CachedMCState): void {}

export function resetCachedMCState(state: CachedMCState): void {
  state.registeredTools.clear()
  state.toolOrder.length = 0
  state.deletedRefs.clear()
  state.pinnedEdits.length = 0
}
