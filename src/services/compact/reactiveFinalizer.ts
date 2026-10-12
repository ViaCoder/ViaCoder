import type { CacheSafeParams } from '../../utils/forkedAgent.js'
import type { Message } from '../../types/message.js'
import type { CompactionResult } from './compact.js'
import { getClearLifecycleBinding287, runWithCompactLifecycleContext287 } from '../../commands/clear/lifecycle287.js'
import { toAttachmentAssemblerContext287, runWithAttachmentAssemblerContext287 } from '../../utils/attachmentAssembler287.js'

export interface ReactiveSummary {
  summaryMessages: Message[]
  summaryText: string
  messagesToPreserve: Message[]
  totalUsage: any
  attempt: number
  totalGroups: number
  groupsPreserved: number
  splitKind: 'round' | 'summarize_all'
  headTruncations: number
  forkAssistantMessageCount: number
}
export interface FinalizeReactiveParams {
  compactResult: ReactiveSummary
  messagesToPreserve: Message[]
  preCompactMessages: Message[]
  cacheSafeParams: CacheSafeParams
  trigger: 'manual' | 'auto'
  startTime: number
  precomputed?: boolean
  thresholdSource?: string
  manualPrecomputeReuse?: string
  precomputeTelemetry?: {statusAtPTL: string; leadMs: number; totalMs: number; borrowed: boolean; messagesSinceTokens: number}
  preCompactTokens?: number
  querySource?: string
  mainChainTailAtStart?: unknown
  cacheCold?: boolean
}

function adaptedContext(context: CacheSafeParams['toolUseContext']) {
  const onCompactEvent = context.onCompactEvent ?? ((event: {type: string; event?: unknown}) => {
    if (event.type === 'compact_progress') context.onCompactProgress?.(event.event as Parameters<NonNullable<typeof context.onCompactProgress>>[0])
  })
  // Enumerable ABI view of the existing session/task/agent/MCP owners, not copies.
  return toAttachmentAssemblerContext287({...context, onCompactEvent})
}

/** Complete original G6n, including Iie/svo/XOe and journal/metadata consumers. */
export async function finalizeReactiveCompact(params: FinalizeReactiveParams): Promise<{ok: true, result: CompactionResult}> {
  const context = params.cacheSafeParams.toolUseContext
  // Retained local-C nested-memory dedup is separate from original memorySelector.
  context.loadedNestedMemoryPaths?.clear()
  const view = adaptedContext(context)
  return runWithAttachmentAssemblerContext287(view, () => runWithCompactLifecycleContext287(view, () => {
    const finalize = getClearLifecycleBinding287('chunk-mphp7acd.js', 'G6n') as
      (input: FinalizeReactiveParams) => Promise<{ok: true, result: CompactionResult}>
    return finalize({...params, cacheSafeParams: {...params.cacheSafeParams, toolUseContext: view}})
  }))
}

/** Complete original DIr; an existing core boundary suppresses duplicate hooks. */
export async function finalizeCompactReplacement(params: Omit<FinalizeReactiveParams, 'compactResult' | 'messagesToPreserve'> & {
  replacement: Message[], coreBoundary?: CompactionResult['boundaryMarker'], compactionKind?: string
}): Promise<CompactionResult> {
  const context = params.cacheSafeParams.toolUseContext
  if (!params.coreBoundary) context.loadedNestedMemoryPaths?.clear()
  const view = adaptedContext(context)
  return runWithAttachmentAssemblerContext287(view, () => runWithCompactLifecycleContext287(view, () => {
    const finalize = getClearLifecycleBinding287('chunk-mphp7acd.js', 'DIr') as
      (input: typeof params) => Promise<CompactionResult>
    return finalize({...params, cacheSafeParams: {...params.cacheSafeParams, toolUseContext: view}})
  }))
}
