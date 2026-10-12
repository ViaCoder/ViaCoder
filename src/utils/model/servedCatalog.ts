import { z } from 'zod'
import type {BehaviorMemoOwner287} from './officialModelBehavior287/native.js'
import { getGlobalConfig } from '../config.js'
import { getCredentialCacheGeneration } from '../auth.js'
import { getAPIProvider, isFirstPartyAnthropicBaseUrl } from './providers.js'
import { getCatalogModelId } from './catalog.js'
import {getNativeAPIProvider287} from './providerSelectionBindings287.js'
import {catalog as bakedCatalog} from '../../vendor/official-model-catalog/catalog.js'
import {createModelMenuCatalogStateFields287, createModelMenuCatalogLifecycle287, createModelMenuLexical287, createModelMenuRegions287, type ModelCatalogOwnerFields287} from './officialModelPicker287/native.js'

// npm 2.1.283 chunk-hzevqd7x.js:BQ/$Q/HQ/ZI/Ynn/R3e. This is a
// model-selector response, NOT bootstrap.client_data or /v1/models metadata.
const runtimeSchema = z.object({
  max_input_tokens: z.number().optional(), max_output_tokens: z.number().optional(),
  default_output_tokens: z.number().optional(), effort_levels: z.array(z.string()).optional(),
  default_effort: z.string().optional(), capabilities: z.array(z.string()).optional(),
  family: z.string().optional(), knowledge_cutoff: z.string().optional(),
  default_for_family: z.string().optional(), fast_default_for_family: z.string().optional(),
  image_limits: z.object({max_width: z.number().optional().catch(undefined),
    max_height: z.number().optional().catch(undefined)}).loose().nullish().catch(undefined),
}).loose()
const noticeSchema = z.object({title: z.string().nullish(), text: z.string().nullish(),
  cta: z.object({copy: z.string().nullish(), intent: z.string().nullish(), redirect_hint: z.string().nullish()}).loose().nullish(),
  is_dismissible: z.boolean().nullish()}).loose()
const optionSchema = z.object({id: z.string().optional(), name: z.string().optional(), description: z.string().optional()}).loose()
const rowSchema = z.object({
  id: z.string(), name: z.string().optional(), short_name: z.string().optional(), description: z.string().optional(),
  section: z.string().optional(), disabled: z.boolean().optional(), confidential: z.boolean().optional(),
  notice: noticeSchema.nullish(), selection_notice: noticeSchema.nullish(),
  badge: z.object({message: z.string().optional(), variant: z.string().optional()}).loose().nullish(),
  tooltip: z.object({content: z.string().optional()}).loose().nullish(),
  capabilities: z.record(z.string(), z.boolean()).optional(),
  thinking: z.object({type: z.string().optional(), description: z.string().optional(),
    effort_options: z.array(optionSchema).optional(), mode_options: z.array(optionSchema).optional(),
    always_on: z.boolean().optional()}).loose().optional(),
  fast_mode: z.object({}).loose().optional(), hard_limit: z.number().optional(), context_window: z.number().optional(),
  quick_select: z.boolean().optional(), runtime: runtimeSchema.optional(), behaves_as: z.string().nullish(),
}).loose()
const stateSchema = z.object({id: z.string(), model: z.string().optional(), selection_source: z.string().optional(),
  org_enforced_default_model: z.string().optional(), thinking: z.unknown().optional(), thinking_by_model: z.unknown().optional()}).loose()
export const servedCatalogResponseSchema = z.object({
  model_selector_config: z.array(z.object({id: z.string(), models: z.array(z.unknown()).optional(),
    description: z.string().optional(), auto_compact_window: z.number().optional()}).loose()).optional(),
  model_selector_state: z.array(stateSchema).optional(), organization_uuid: z.string().optional(), resolution: z.string().optional(),
}).loose()
export type ServedModelRow = z.infer<typeof rowSchema>
export type ServedCatalog = {
  surface: 'cc' | 'ccr' | 'ccd'
  config: {id: string; models?: ServedModelRow[]; dropped_model_ids?: string[];
    dropped_confidential_ids?: string[]; dropped_unidentified_rows?: boolean}
  state?: z.infer<typeof stateSchema>
}
export const servedCatalogCacheSchema = z.object({
  surface: z.enum(['cc', 'ccr', 'ccd']),
  config: z.object({id: z.string(), models: z.array(rowSchema).optional(),
    dropped_model_ids: z.array(z.string()).max(64).optional(),
    dropped_confidential_ids: z.array(z.string()).max(64).optional(), dropped_unidentified_rows: z.boolean().optional()}),
  state: stateSchema.optional(),
})
export function parseServedCatalogResponse(value: unknown, surface: ServedCatalog['surface'] = 'cc'): ServedCatalog | null | undefined {
  const parsed = servedCatalogResponseSchema.safeParse(value)
  if (!parsed.success) return undefined
  const config = parsed.data.model_selector_config?.find(row => row.id === surface)
  if (!config) return null
  const models: ServedModelRow[] = [], dropped: string[] = [], confidential: string[] = []
  let unidentified = false
  for (const row of config.models ?? []) {
    const result = rowSchema.safeParse(row)
    if (result.success) { models.push(result.data); continue }
    const raw = row as {id?: unknown; confidential?: unknown} | null
    if (typeof raw?.id !== 'string' || !normalize(raw.id) || dropped.length >= 64) { unidentified = true; continue }
    dropped.push(raw.id)
    if (raw.confidential === true) confidential.push(raw.id)
  }
  return {surface, config: {id: config.id, ...(config.models !== undefined && {models}),
    ...(dropped.length > 0 && {dropped_model_ids: [...new Set(dropped)]}),
    ...(confidential.length > 0 && {dropped_confidential_ids: [...new Set(confidential)]}),
    ...(unidentified && {dropped_unidentified_rows: true})},
    state: parsed.data.model_selector_state?.find(row => row.id === surface)}
}
function normalize(model: string): string { return model.replace(/\[(1|2)m\]/gi, '').trim().toLowerCase() }
function scope(): string {
  const account = getGlobalConfig().oauthAccount
  return JSON.stringify([getCredentialCacheGeneration(), account?.accountUuid, account?.organizationUuid,
    process.env.ANTHROPIC_BASE_URL, process.env.CLAUDE_CODE_ENTRYPOINT, process.env.CLAUDE_CODE_REMOTE])
}
const state: BehaviorMemoOwner287 & ModelCatalogOwnerFields287 & {modelCatalogScope287?: string; version: number} = {...createModelMenuCatalogStateFields287(), version: 0}
const catalogLexical = createModelMenuLexical287(createModelMenuRegions287({}))
const catalogLifecycle = createModelMenuCatalogLifecycle287({...catalogLexical,
  Xr: () => state, hse: bakedCatalog.models.map(row => row.id),
  ja: () => { getAPIProvider(); return getNativeAPIProvider287() === 'firstParty' && isFirstPartyAnthropicBaseUrl() },
})
export function getModelBehaviorMemoOwner287(): BehaviorMemoOwner287 { return state }
const listeners = new Set<() => void>()
export function subscribeServedCatalog(listener: () => void): () => void { listeners.add(listener); return () => { listeners.delete(listener) } }
export function getServedCatalogVersion(): number { return state.version }
function changed(): void { state.version++; for (const listener of listeners) listener() }
// Served refresh and verified published readers write this exact same slot.
// These are original wd/aQn/FVo transitions, not a second active catalog cache.
export function setServedCatalog(catalog: ServedCatalog | null): void {
  state.modelCatalogScope287 = scope()
  catalogLifecycle.wd({catalog, source: catalog === null ? 'fallback' : 'served', fetchedAt: Date.now(), stale: false})
  changed()
}
/** Input must already be verified by the published-document reader. This
 * publisher neither bypasses signature validation nor invents row eligibility. */
export function publishPublishedModelCatalog287(catalog: ServedCatalog | null, fetchedAt: number, stale = false): void {
  state.modelCatalogScope287 = scope()
  catalogLifecycle.aQn(catalog, fetchedAt, stale)
  changed()
}
export function deactivateServedModelCatalog287(): void { catalogLifecycle.FVo(); changed() }
export function clearServedCatalog(): void {
  state.servedCatalogActive = undefined; state.servedCatalogDeactivatedRows = undefined
  state.modelCatalogScope287 = undefined; changed()
}
export function getServedCatalog(): ServedCatalog | null {
  return state.modelCatalogScope287 === scope() ? catalogLifecycle.bF() : null
}
export function getServedCatalogWithDeactivatedRows287(): ServedCatalog | null {
  return state.modelCatalogScope287 === scope() ? catalogLifecycle.Vs() : null
}
export function isActiveServedModelCatalog287(): boolean {
  return state.modelCatalogScope287 === scope() && catalogLifecycle.c8()
}
export function getModelCatalogSource287(): 'served' | 'published' | 'fallback' | undefined {
  return state.modelCatalogScope287 === scope() ? catalogLifecycle.ppe() : undefined
}
// chunk-1vt3h958.js:t_/r7/lo/VVn/VHo/r_: exact spelling first, then
// identity and canonical candidates. Never substring-match served rows.
export function getServedModelRow(...candidates: (string | undefined)[]): ServedModelRow | undefined {
  const rows = getServedCatalog()?.config.models
  if (!rows) return undefined
  for (const candidate of candidates) {
    if (candidate === undefined) continue
    const id = normalize(candidate)
    const row = rows.find(entry => normalize(entry.id) === id)
    if (row) return row
    const canonical = getCatalogModelId(id)
    if (canonical !== id) {
      const identity = rows.find(entry => normalize(entry.id) === canonical)
      if (identity) return identity
    }
  }
  return undefined
}
export function getServedEffortLevels(...models: string[]): string[] | undefined {
  return getServedModelRow(...models)?.runtime?.effort_levels?.map(level => level.trim().toLowerCase())
}
export function getServedDefaultEffort(...models: string[]): string | undefined {
  return getServedModelRow(...models)?.runtime?.default_effort?.trim().toLowerCase()
}
export function getServedCapability(capability: string, ...models: string[]): true | undefined {
  return getServedModelRow(...models)?.runtime?.capabilities?.some(value => value.trim().toLowerCase() === capability)
    ? true : undefined
}
