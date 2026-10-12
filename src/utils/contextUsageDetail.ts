import type {Anthropic} from '@anthropic-ai/sdk'

export type ContextUsageDetail = 'summary' | 'full'
/** Optional counter ABI for callers such as doctor. Actual context accounting
 * uses the complete original ran/Glo graph, not legacy local math helpers. */
export type ContextTokenCounter = (
  messages: Anthropic.Beta.Messages.BetaMessageParam[],
  tools: Anthropic.Beta.Messages.BetaToolUnion[],
) => Promise<number | null>
