import type { BetaUsage as Usage } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from 'src/services/analytics/index.js'
import { logEvent } from 'src/services/analytics/index.js'
import { setHasUnknownModelCost } from '../bootstrap/state.js'
import { isFastModeEnabled } from './fastMode.js'
import { catalog } from '../vendor/official-model-catalog/catalog.js'
import { getGlobalConfig } from './config.js'
import { getClientData } from './clientData.js'
import { getAPIProvider } from './model/providers.js'
import { getCatalogModelId } from './model/catalog.js'
import {getModelIdentityName287} from './model/behavior287.js'
import {
  CLAUDE_3_5_HAIKU_CONFIG,
  CLAUDE_3_5_V2_SONNET_CONFIG,
  CLAUDE_3_7_SONNET_CONFIG,
  CLAUDE_HAIKU_4_5_CONFIG,
  CLAUDE_OPUS_4_1_CONFIG,
  CLAUDE_OPUS_4_5_CONFIG,
  CLAUDE_OPUS_4_6_CONFIG,
  CLAUDE_OPUS_4_7_CONFIG,
  CLAUDE_OPUS_4_8_CONFIG,
  CLAUDE_OPUS_5_CONFIG,
  CLAUDE_OPUS_5_5_CONFIG,
  CLAUDE_OPUS_4_CONFIG,
  CLAUDE_FABLE_5_CONFIG,
  CLAUDE_FABLE_5_1_CONFIG,
  CLAUDE_SONNET_4_5_CONFIG,
  CLAUDE_SONNET_4_6_CONFIG,
  CLAUDE_SONNET_4_CONFIG,
  CLAUDE_SONNET_5_CONFIG,
} from './model/configs.js'
import {
  firstPartyNameToCanonical,
  getCanonicalName,
  getDefaultMainLoopModelSetting,
  type ModelShortName,
} from './model/model.js'

// @see https://platform.claude.com/docs/en/about-claude/pricing
export type ModelCosts = {
  inputTokens: number
  outputTokens: number
  promptCacheWriteTokens: number
  promptCacheWrite1hTokens?: number
  promptCacheReadTokens: number
  webSearchRequests: number
}

// Standard pricing tier for Sonnet models: $3 input / $15 output per Mtok
export const COST_TIER_3_15 = {
  inputTokens: 3,
  outputTokens: 15,
  promptCacheWriteTokens: 3.75,
  promptCacheReadTokens: 0.3,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

export const COST_TIER_2_10 = {
  inputTokens: 2,
  outputTokens: 10,
  promptCacheWriteTokens: 2.5,
  promptCacheReadTokens: 0.2,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing tier for Opus 4/4.1: $15 input / $75 output per Mtok
export const COST_TIER_15_75 = {
  inputTokens: 15,
  outputTokens: 75,
  promptCacheWriteTokens: 18.75,
  promptCacheReadTokens: 1.5,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing tier for Opus 4.5: $5 input / $25 output per Mtok
export const COST_TIER_5_25 = {
  inputTokens: 5,
  outputTokens: 25,
  promptCacheWriteTokens: 6.25,
  promptCacheReadTokens: 0.5,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

export const COST_TIER_4_20 = {
  inputTokens: 4,
  outputTokens: 20,
  promptCacheWriteTokens: 5,
  promptCacheReadTokens: 0.2,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

export const COST_TIER_10_50 = {
  inputTokens: 10,
  outputTokens: 50,
  promptCacheWriteTokens: 12.5,
  promptCacheReadTokens: 1,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

export const COST_TIER_10_50_CACHE_READ_0_25 = {
  ...COST_TIER_10_50,
  promptCacheReadTokens: 0.25,
} as const satisfies ModelCosts

// Fast mode pricing for Opus 4.6: $30 input / $150 output per Mtok
export const COST_TIER_30_150 = {
  inputTokens: 30,
  outputTokens: 150,
  promptCacheWriteTokens: 37.5,
  promptCacheWrite1hTokens: 60,
  promptCacheReadTokens: 3,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing for Haiku 3.5: $0.80 input / $4 output per Mtok
export const COST_HAIKU_35 = {
  inputTokens: 0.8,
  outputTokens: 4,
  promptCacheWriteTokens: 1,
  promptCacheReadTokens: 0.08,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing for Haiku 4.5: $1 input / $5 output per Mtok
export const COST_HAIKU_45 = {
  inputTokens: 1,
  outputTokens: 5,
  promptCacheWriteTokens: 1.25,
  promptCacheReadTokens: 0.1,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

const DEFAULT_UNKNOWN_MODEL_COST = COST_TIER_5_25

/**
 * Get the cost tier for Opus 4.6 based on fast mode.
 */
export function getOpus46CostTier(fastMode: boolean): ModelCosts {
  if (isFastModeEnabled() && fastMode) {
    return COST_TIER_30_150
  }
  return COST_TIER_5_25
}

// @[MODEL LAUNCH]: Add a pricing entry for the new model below.
// Costs from https://platform.claude.com/docs/en/about-claude/pricing
// Web search cost: $10 per 1000 requests = $0.01 per request
const LEGACY_MODEL_COSTS: Record<ModelShortName, ModelCosts> = {
  [firstPartyNameToCanonical(CLAUDE_3_5_HAIKU_CONFIG.firstParty)]:
    COST_HAIKU_35,
  [firstPartyNameToCanonical(CLAUDE_HAIKU_4_5_CONFIG.firstParty)]:
    COST_HAIKU_45,
  [firstPartyNameToCanonical(CLAUDE_3_5_V2_SONNET_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_3_7_SONNET_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_SONNET_4_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_SONNET_4_5_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_SONNET_4_6_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_CONFIG.firstParty)]: COST_TIER_15_75,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_1_CONFIG.firstParty)]:
    COST_TIER_15_75,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_5_CONFIG.firstParty)]:
    COST_TIER_5_25,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_6_CONFIG.firstParty)]:
    COST_TIER_5_25,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_7_CONFIG.firstParty)]:
    COST_TIER_5_25,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_8_CONFIG.firstParty)]:
    COST_TIER_5_25,
  [firstPartyNameToCanonical(CLAUDE_OPUS_5_CONFIG.firstParty)]: COST_TIER_5_25,
  [firstPartyNameToCanonical(CLAUDE_OPUS_5_5_CONFIG.firstParty)]:
    COST_TIER_4_20,
  [firstPartyNameToCanonical(CLAUDE_SONNET_5_CONFIG.firstParty)]:
    COST_TIER_2_10,
  [firstPartyNameToCanonical(CLAUDE_FABLE_5_CONFIG.firstParty)]:
    COST_TIER_10_50,
  [firstPartyNameToCanonical(CLAUDE_FABLE_5_1_CONFIG.firstParty)]:
    COST_TIER_10_50_CACHE_READ_0_25,
}

// Official chunk-1vt3h958.js:gC/em/Fte. Pricing is sourced from the baked
// catalog, including cache TTL prices; adding metadata does not enable a model.
export const MODEL_COSTS: Record<ModelShortName, ModelCosts> = Object.assign(Object.create(null), LEGACY_MODEL_COSTS,
  Object.fromEntries(catalog.models.flatMap(model => {
    const pricing = typeof model.pricing === 'string' ? catalog.pricing_tiers[model.pricing] : model.pricing
    if (!pricing) return []
    return [[model.id, {inputTokens: pricing.input, outputTokens: pricing.output,
      promptCacheWriteTokens: pricing.cache_write_5m, promptCacheWrite1hTokens: pricing.cache_write_1h,
      promptCacheReadTokens: pricing.cache_read, webSearchRequests: pricing.web_search}]]
  })))

function cachedCosts(model: string, canonical: string): ModelCosts | undefined {
  const costs = getGlobalConfig().additionalModelCostsCache
  if (!costs) return
  for (const key of [model, canonical]) {
    if (!Object.hasOwn(costs, key)) continue
    const value = costs[key]
    if (value && ['inputTokens', 'outputTokens', 'promptCacheWriteTokens', 'promptCacheReadTokens', 'webSearchRequests']
      .every(field => typeof value[field as keyof ModelCosts] === 'number' && Number.isFinite(value[field as keyof ModelCosts]) && value[field as keyof ModelCosts]! >= 0) &&
      (value.promptCacheWrite1hTokens === undefined || Number.isFinite(value.promptCacheWrite1hTokens) && value.promptCacheWrite1hTokens >= 0)) return value
  }
}

// Official chunk-1vt3h958.js:SC/nm/Jl/rm: one-step identity mapping,
// first-party only, seconds (not ms), strict expiry, baked price target only.
export function getPromotionPricingModel(model: string, usage?: Pick<Usage, 'speed'>): string | undefined {
  if (getAPIProvider() !== 'firstParty' || usage?.speed === 'fast') return undefined
  const promotions = getClientData()?.alder_ford
  if (!promotions || typeof promotions !== 'object' || Array.isArray(promotions)) return undefined
  const id = getCatalogModelId(getModelIdentityName287(model.replace(/\[(1|2)m\]/gi, '')))
  if (!Object.hasOwn(promotions, id)) return undefined
  const row = (promotions as Record<string, unknown>)[id]
  if (!row || typeof row !== 'object' || Array.isArray(row)) return undefined
  const {as, ends_at} = row as {as?: unknown; ends_at?: unknown}
  if (typeof as !== 'string' || typeof ends_at !== 'number' || !Number.isFinite(ends_at) ||
      ends_at <= 0 || ends_at >= 100_000_000_000 || Date.now() >= ends_at * 1000 ||
      !Object.hasOwn(MODEL_COSTS, as)) return undefined
  return as
}

// Use the shared original behavior graph, not an independent served-only walk.
function getCostCanonicalName(model: string): string {
  return getCatalogModelId(getCanonicalName(model))
}

/**
 * Calculates the USD cost based on token usage and model cost configuration
 */
function tokensToUSDCost(modelCosts: ModelCosts, usage: Usage): number {
  // Official mC/d5e: split cache writes by TTL, apply geographic inference
  // premium only to tokens, not web search. Never double-count 1h tokens.
  const cacheTokens = usage.cache_creation_input_tokens ?? 0
  const cache1h = Math.min(usage.cache_creation?.ephemeral_1h_input_tokens ?? 0, cacheTokens)
  const cacheCost = modelCosts.promptCacheWrite1hTokens !== undefined && cache1h > 0
    ? (cache1h * modelCosts.promptCacheWrite1hTokens + (cacheTokens - cache1h) * modelCosts.promptCacheWriteTokens) / 1_000_000
    : cacheTokens * modelCosts.promptCacheWriteTokens / 1_000_000
  const tokenCost = (
    (usage.input_tokens / 1_000_000) * modelCosts.inputTokens +
    (usage.output_tokens / 1_000_000) * modelCosts.outputTokens +
    ((usage.cache_read_input_tokens ?? 0) / 1_000_000) *
      modelCosts.promptCacheReadTokens +
    cacheCost
  )
  return tokenCost * (usage.inference_geo === 'us' ? 1.1 : 1) +
    (usage.server_tool_use?.web_search_requests ?? 0) * modelCosts.webSearchRequests
}

export function getModelCosts(model: string, usage: Usage): ModelCosts {
  const shortName = getCostCanonicalName(model)
  const identity = getCatalogModelId(getModelIdentityName287(model))
  const promotional = getPromotionPricingModel(model, usage)
  if (promotional !== undefined) return MODEL_COSTS[promotional]!
  if (identity !== shortName) {
    const explicit = cachedCosts(model.replace(/\[1m\]$/i, ''), identity)
    if (explicit) return explicit
  }
  // Account for the response's actual speed, not the current UI toggle.
  if (usage.speed === 'fast') {
    if (shortName === 'claude-opus-5-5') return {inputTokens: 8, outputTokens: 40, promptCacheWriteTokens: 10, promptCacheWrite1hTokens: 16, promptCacheReadTokens: 0.4, webSearchRequests: 0.01}
    if (shortName === 'claude-opus-4-8' || shortName === 'claude-opus-5') return {...COST_TIER_10_50, promptCacheWrite1hTokens: 20}
    if (shortName === 'claude-opus-4-6' || shortName === 'claude-opus-4-7') return COST_TIER_30_150
  }

  const costs = MODEL_COSTS[shortName] ?? cachedCosts(model, shortName)
  if (!costs) {
    trackUnknownModelCost(model, shortName)
    return (
      MODEL_COSTS[getCanonicalName(getDefaultMainLoopModelSetting())] ??
      DEFAULT_UNKNOWN_MODEL_COST
    )
  }
  return costs
}

function trackUnknownModelCost(model: string, shortName: ModelShortName): void {
  logEvent('tengu_unknown_model_cost', {
    model: model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    shortName:
      shortName as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  })
  setHasUnknownModelCost()
}

// Calculate the cost of a query in US dollars.
// If the model's costs are not found, use the default model's costs.
export function calculateUSDCost(resolvedModel: string, usage: Usage): number {
  const modelCosts = getModelCosts(resolvedModel, usage)
  return tokensToUSDCost(modelCosts, usage)
}

/**
 * Calculate cost from raw token counts without requiring a full BetaUsage object.
 * Useful for side queries (e.g. classifier) that track token counts independently.
 */
export function calculateCostFromTokens(
  model: string,
  tokens: {
    inputTokens: number
    outputTokens: number
    cacheReadInputTokens: number
    cacheCreationInputTokens: number
  },
): number {
  const usage: Usage = {
    input_tokens: tokens.inputTokens,
    output_tokens: tokens.outputTokens,
    cache_read_input_tokens: tokens.cacheReadInputTokens,
    cache_creation_input_tokens: tokens.cacheCreationInputTokens,
  } as Usage
  return calculateUSDCost(model, usage)
}

function formatPrice(price: number): string {
  // Format price: integers without decimals, others with 2 decimal places
  // e.g., 3 -> "$3", 0.8 -> "$0.80", 22.5 -> "$22.50"
  if (Number.isInteger(price)) {
    return `$${price}`
  }
  return `$${price.toFixed(2)}`
}

/**
 * Format model costs as a pricing string for display
 * e.g., "$3/$15 per Mtok"
 */
export function formatModelPricing(costs: ModelCosts): string {
  return `${formatPrice(costs.inputTokens)}/${formatPrice(costs.outputTokens)} per Mtok`
}

/**
 * Get formatted pricing string for a model
 * Accepts either a short name or full model name
 * Returns undefined if model is not found
 */
export function getModelPricingString(model: string): string | undefined {
  const shortName = getCostCanonicalName(model)
  const identity = getCatalogModelId(getModelIdentityName287(model))
  const promotional = getPromotionPricingModel(model)
  const explicit = identity !== shortName ? cachedCosts(model.replace(/\[1m\]$/i, ''), identity) : undefined
  const costs = (promotional === undefined ? explicit : MODEL_COSTS[promotional]) ?? MODEL_COSTS[shortName] ?? cachedCosts(model, identity)
  if (!costs) return undefined
  return formatModelPricing(costs)
}
