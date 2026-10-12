import {createLocalUsageTranscriptReader287,parseUsageTranscriptLine287} from '../../services/api/usageTranscripts287.js'
import type {UsageTranscriptRead287} from '../../services/api/officialUsage287/runtime.js'
import {createUsageRateLimitReader287,getSdkUsageControl287} from '../../services/api/usageConsumers287.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import {z} from 'zod'
import {
  getModelUsage, getTotalAPIDuration, getTotalCostUSD, getTotalDuration,
  getTotalLinesAdded, getTotalLinesRemoved,
} from '../../bootstrap/state.js'
import {formatTotalCost} from '../../cost-tracker.js'
import {isPolicyAllowed} from '../../services/policyLimits/index.js'
import {getSubscriptionType, hasProfileScope, isClaudeAISubscriber} from '../../utils/auth.js'
import {modelSupportsAutoMode} from '../../utils/betas.js'
import {logForDebugging} from '../../utils/debug.js'
import {EFFORT_LEVELS, modelSupportsEffort, modelSupportsMaxEffort, modelSupportsXHighEffort} from '../../utils/effort.js'
import {isFastModeSupportedByModel} from '../../utils/fastMode.js'
import {logError} from '../../utils/log.js'
import {getDefaultMainLoopModel, parseUserSpecifiedModel} from '../../utils/model/model.js'
import {getModelOptions} from '../../utils/model/modelOptions.js'
import {modelSupportsAdaptiveThinking} from '../../utils/thinking.js'

// Official 2.1.283 chunk-kgv54n2e.js Be/qe/$e/Ue. See the Round10 audit for
// complete-module hashes, pqt/g and model/behavior projection evidence.
export const SESSION_QUERY_SUBTYPES = ['get_usage', 'get_session_cost', 'list_models', 'get_binary_version'] as const
export type SessionQuerySubtype = typeof SESSION_QUERY_SUBTYPES[number]
export class SessionQueryParameterError extends Error {}
export function isSessionQuerySubtype(value: unknown): value is SessionQuerySubtype {
  return typeof value === 'string' && SESSION_QUERY_SUBTYPES.some(subtype => subtype === value)
}

/** JSON usage body is intentionally preserved, including unknown future fields. */
export type UsageBody = Record<string, unknown>
export type UsageReadResult =
  | {status: 'ok'; utilization: UsageBody}
  | {status: 'seeded'; utilization: UsageBody; seedSource?: 'headers' | 'persisted'; seedFetchedAtMs?: number;rateLimitedVia?: 'envelope'|'http_429'|null;responseBody?:string}
  | {status: 'empty_response' | 'unavailable';rateLimitedVia?: 'envelope'|'http_429'|null;responseBody?:string}

/** Normalized records emitted by official ue's storage-bound transcript reader.
 * No transcript text, prompts or credentials belong in this read-only boundary.
 */
export interface UsageBehaviorRecord {
  ts: number
  sessionId: string
  cached: number
  cacheCreate: number
  uncached: number
  output: number
  modelTier: number
  uuid?: string
  model?: string
  isSubagent?: boolean
  attributionAgent?: string | null
  attributionSkill?: string | null
  attributionPlugin?: string | null
  attributionMcpServer?: string | null
  loop?: {prompt:string;cron?:string;isDynamic:boolean}
  loopFireTs?: number
  loopShares?: {loop:{prompt:string;cron?:string;isDynamic:boolean};fireTs:number;share:number}[]
}

/** Bind to the actual session/storage lane, never to an unrelated global login.
 * KAn includes fresh/persisted/header snapshots and scoped-model readiness; this
 * handler deliberately does not replace that with an unqualified HTTP fetch.
 */
export interface SessionUsageHost {
  credentials?:CredentialStore
  storageV5?:unknown
  allowsTranscriptScan?():boolean
  redactsPersistedLane(): boolean
  readRateLimits(storageV5?:unknown,credentials?:CredentialStore): Promise<UsageReadResult>
  seedRateLimits?(storageV5?:unknown):{utilization:UsageBody;source:'headers'|'persisted';fetchedAtMs?:number}|null
  getScopedModelDisplayNames(): readonly string[]
  scanBehaviorRecords(sinceMs: number): AsyncIterable<UsageBehaviorRecord>
  foldUsageRecords?:UsageTranscriptRead287
  now?(): number
}

type NamedShare = {name: string; pct: number}
export type BehaviorKey = 'cache_miss' | 'long_context' | 'subagent_heavy' | 'high_parallel' | 'cron'
export interface UsageBehaviorWindow {
  request_count: number
  session_count: number
  behaviors: {key: BehaviorKey; pct: number; count: number}[]
  agents: NamedShare[]
  skills: NamedShare[]
  plugins: NamedShare[]
  mcp_servers: NamedShare[]
}
export interface UsageQueryResponse {
  session: {
    total_cost_usd: number
    total_api_duration_ms: number
    total_duration_ms: number
    total_lines_added: number
    total_lines_removed: number
    model_usage: ReturnType<typeof getModelUsage>
  }
  subscription_type: ReturnType<typeof getSubscriptionType>
  rate_limits_available: boolean
  rate_limits: UsageBody | null
  behaviors: {day: UsageBehaviorWindow; week: UsageBehaviorWindow} | null
}

const DAY = 86_400_000, WEEK = 7 * DAY
function accumulator() {
  return {
    totalCost: 0, requestCount: 0, cacheMissCost: 0, cacheMissCount: 0, longCtxCost: 0, longCtxCount: 0,
    sessions: new Map<string, {cost: number; subCost: number; subCount: number; hours: Set<number>}>(),
    buckets: new Map<number, {sids: Set<string>; cost: number; count: number}>(),
    agents: new Map<string, number>(), skills: new Map<string, number>(),
    plugins: new Map<string, number>(), mcpServers: new Map<string, number>(),
  }
}
type Accumulator = ReturnType<typeof accumulator>
function addNamed(map: Map<string, number>, key: string | null | undefined, cost: number) {
  if (key) map.set(key, (map.get(key) ?? 0) + cost)
}
// Official chunk-m8zvc9bg.js bn/ee/N. These are cost weights, not billed USD.
function addRecord(state: Accumulator, row: UsageBehaviorRecord) {
  const cost = (row.cached + row.uncached * 10 + row.cacheCreate * 12.5 + row.output * 50) * row.modelTier
  state.totalCost += cost; state.requestCount++
  if (row.attributionAgent) addNamed(state.agents, row.attributionSkill ?? row.attributionAgent, cost)
  else addNamed(state.skills, row.attributionSkill, cost)
  addNamed(state.plugins, row.attributionPlugin, cost)
  addNamed(state.mcpServers, row.attributionMcpServer, cost)
  if (row.uncached > 100_000) {state.cacheMissCost += cost; state.cacheMissCount++}
  if (row.cached + row.cacheCreate + row.uncached > 150_000) {state.longCtxCost += cost; state.longCtxCount++}
  let session = state.sessions.get(row.sessionId)
  if (!session) {session = {cost: 0, subCost: 0, subCount: 0, hours: new Set()}; state.sessions.set(row.sessionId, session)}
  session.cost += cost
  if (row.isSubagent) {session.subCost += cost; session.subCount++}
  session.hours.add(Math.floor(row.ts / 3_600_000))
  const bucketKey = Math.floor(row.ts / 300_000)
  let bucket = state.buckets.get(bucketKey)
  if (!bucket) {bucket = {sids: new Set(), cost: 0, count: 0}; state.buckets.set(bucketKey, bucket)}
  bucket.sids.add(row.sessionId); bucket.cost += cost; bucket.count++
}
function namedShares(map: Map<string, number>, total: number): NamedShare[] {
  if (!map.size || total === 0) return []
  return [...map].sort((a, b) => b[1] - a[1]).map(([name, cost]) => ({name, pct: Math.round(cost / total * 100)})).filter(row => row.pct > 0)
}
// Official ne/k -> g: >=10% BEFORE rounding; categories can overlap (>100%).
function projectWindow(state: Accumulator): UsageBehaviorWindow {
  let parallelCost = 0, parallelCount = 0, subCost = 0, subCount = 0, cronCost = 0, cronCount = 0
  for (const bucket of state.buckets.values()) if (bucket.sids.size >= 4) {parallelCost += bucket.cost; parallelCount += bucket.count}
  for (const session of state.sessions.values()) {
    if (session.subCount >= 3 || session.cost > 0 && session.subCost / session.cost > 0.5) {subCost += session.cost; subCount++}
    if (session.hours.size >= 8) {cronCost += session.cost; cronCount++}
  }
  const categories: {key: BehaviorKey; cost: number; count: number}[] = [
    {key: 'cache_miss', cost: state.cacheMissCost, count: state.cacheMissCount},
    {key: 'long_context', cost: state.longCtxCost, count: state.longCtxCount},
    {key: 'subagent_heavy', cost: subCost, count: subCount},
    {key: 'high_parallel', cost: parallelCost, count: parallelCount},
    {key: 'cron', cost: cronCost, count: cronCount},
  ]
  categories.sort((a, b) => b.cost - a.cost)
  return {
    request_count: state.requestCount, session_count: state.sessions.size,
    behaviors: categories.filter(row => state.totalCost > 0 && row.cost / state.totalCost * 100 >= 10)
      .map(row => ({key: row.key, pct: Math.round(row.cost / state.totalCost * 100), count: row.count})),
    agents: namedShares(state.agents, state.totalCost), skills: namedShares(state.skills, state.totalCost),
    plugins: namedShares(state.plugins, state.totalCost), mcp_servers: namedShares(state.mcpServers, state.totalCost),
  }
}
/** Official Kbt rolling windows. Loops-only events do not enter the SDK g shape. */
export async function aggregateUsageBehaviors(records: AsyncIterable<UsageBehaviorRecord>, now: number) {
  const day = accumulator(), week = accumulator()
  for await (const row of records) {
    if (row.ts < now - WEEK) continue
    addRecord(week, row)
    if (row.ts >= now - DAY) addRecord(day, row)
  }
  return {day: projectWindow(day), week: projectWindow(week)}
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function modelScope(value: unknown): Record<string, unknown> | undefined {
  if (!isRecord(value) || !isRecord(value.scope) || !isRecord(value.scope.model)) return
  return value.scope.model
}
// Official MC/$it/QEo + pqt projection, including null-vs-zero and seeded limits.
export function projectUsageRateLimits(result: UsageReadResult, displayNames: readonly string[]): UsageBody | null {
  if (result.status !== 'ok' && result.status !== 'seeded') return null
  const usage = result.utilization
  let scoped: {display_name: string; utilization: unknown; resets_at: unknown}[] | undefined
  try {
    const names = displayNames.map(name => name.toLowerCase())
    scoped = names.length && Array.isArray(usage.limits) ? usage.limits.flatMap((limit: unknown) => {
      const model = modelScope(limit)
      if (!isRecord(limit) || limit.kind !== 'weekly_scoped' || typeof model?.display_name !== 'string' || !names.includes(model.display_name.toLowerCase())) return []
      return [{display_name: model.display_name, utilization: limit.percent ?? null,
        resets_at: typeof limit.resets_at === 'number' ? new Date(limit.resets_at * 1000).toISOString() : limit.resets_at ?? null}]
    }) : []
  } catch (error) { logForDebugging(`model_scoped projection failed: ${error instanceof Error ? error.message : String(error)}`, {level: 'error'}) }
  const {limits: _limits, ...withoutLimits} = usage
  const body = result.status === 'seeded' ? withoutLimits : usage
  if (scoped && scoped.length > 0) return {...body, model_scoped: scoped}
  const hasScopedOrMalformedEntry = Array.isArray(usage.limits) && usage.limits.some((limit: unknown) =>
    typeof limit !== 'object' || limit === null || isRecord(limit) && isRecord(limit.scope) && limit.scope.model != null)
  const explicitlyEmpty = scoped !== undefined && result.status === 'ok' &&
    (usage.five_hour != null || usage.seven_day != null) && Array.isArray(usage.limits) && !hasScopedOrMalformedEntry
  return explicitlyEmpty ? {...body, model_scoped: []} : body
}

export async function handleGetUsage(request: {skip_behaviors?: unknown}, host: SessionUsageHost,
  ParameterError: new(message?:string)=>Error = SessionQueryParameterError): Promise<UsageQueryResponse> {
  return getSdkUsageControl287(request,host,ParameterError)
}

export function handleGetSessionCost(): {text: string} {
  return {text: Bun.stripANSI(formatTotalCost())}
}

export function handleListModels() {
  // Keep the real picker/provider/allowlist gates. Do not expose raw catalog rows
  // or reuse initialize's stale modelInfos snapshot. Jme dedup/order, then HY.
  const seen = new Set<string>()
  const options = getModelOptions().filter(option => {
    if (option.value === null) return true
    if (seen.has(option.value)) return false
    seen.add(option.value); return true
  })
  return {models: [...options.filter(option => option.disabled !== true), ...options.filter(option => option.disabled === true)].map(option => {
    const value = option.value === null ? 'default' : option.value
    const resolvedModel = value === 'default' ? getDefaultMainLoopModel() : parseUserSpecifiedModel(value)
    return {
      value, resolvedModel, displayName: option.label, description: option.description,
      ...('promoListPrice' in option && typeof option.promoListPrice === 'string' ? {promoListPrice: option.promoListPrice} : {}),
      ...(modelSupportsEffort(resolvedModel) ? {supportsEffort: true as const, supportedEffortLevels: EFFORT_LEVELS.filter(level =>
        (level !== 'max' || modelSupportsMaxEffort(resolvedModel)) && (level !== 'xhigh' || modelSupportsXHighEffort(resolvedModel)))} : {}),
      ...(modelSupportsAdaptiveThinking(resolvedModel) ? {supportsAdaptiveThinking: true as const} : {}),
      ...(isFastModeSupportedByModel(option.value) ? {supportsFastMode: true as const} : {}),
      ...(modelSupportsAutoMode(resolvedModel) ? {supportsAutoMode: true as const} : {}),
      ...(option.disabled ? {disabled: true as const} : {}),
    }
  })}
}

export function handleGetBinaryVersion(): {version: string; buildTime: string} {
  // Ue + public-build SL()==="". Report this running source build, not a
  // fabricated upstream build timestamp or a Git/package/network query.
  return {version: MACRO.VERSION, buildTime: MACRO.BUILD_TIME}
}

/** Return the handler body only. Main owns request_id and control_response/error
 * framing, claim/initialization eligibility and redacted unexpected errors.
 */
export async function handleSessionQuery(request: unknown, host: SessionUsageHost) {
  if (!isRecord(request) || !isSessionQuerySubtype(request.subtype)) throw new SessionQueryParameterError('Unsupported session query subtype')
  switch (request.subtype) {
    case 'get_usage': return handleGetUsage({skip_behaviors: request.skip_behaviors}, host)
    case 'get_session_cost': return handleGetSessionCost()
    case 'list_models': return handleListModels()
    case 'get_binary_version': return handleGetBinaryVersion()
  }
}

/** Public compatibility exports delegate to the complete 287 parser/FS reader. */
export const parseUsageBehaviorLine=parseUsageTranscriptLine287
export async function* scanLocalUsageBehaviorRecords(projectsDir:string,sinceMs:number):AsyncGenerator<UsageBehaviorRecord>{
 const records:UsageBehaviorRecord[]=[]
 await createLocalUsageTranscriptReader287(()=>projectsDir).read(sinceMs,record=>records.push(record))
 yield* records
}

const persistedWindow = z.object({utilization: z.number().nullable(), resets_at: z.string().nullable()}).passthrough()
// Official C0n validates persisted snapshots more strictly than fresh responses.
const persistedUsage = z.object({
  five_hour: persistedWindow.nullish(), seven_day: persistedWindow.nullish(), seven_day_oauth_apps: persistedWindow.nullish(),
  seven_day_opus: persistedWindow.nullish(), seven_day_sonnet: persistedWindow.nullish(), cinder_cove: persistedWindow.nullish(),
  extra_usage: z.object({is_enabled: z.boolean(), monthly_limit: z.number().nullable(), used_credits: z.number().nullable(),
    utilization: z.number().nullable(), currency: z.string().nullish(), disabled_reason: z.string().nullish()}).passthrough().nullish(),
  limits: z.array(z.object({kind: z.string(), group: z.string(), percent: z.number(), resets_at: z.string().nullable(),
    severity: z.string(), is_active: z.boolean(), scope: z.object({model: z.object({display_name: z.string()}).passthrough().nullish(),
      surface: z.object({display_name: z.string()}).passthrough().nullish()}).passthrough().nullish()}).passthrough()).nullish(),
}).passthrough()
const usageSnapshot = z.object({fetchedAtMs: z.number(), accountUuid: z.string().optional(), utilization: persistedUsage})
export type UsageSnapshot = z.infer<typeof usageSnapshot>
type HeaderWindow = {utilization: number; resets_at: number}
/** Primitive lane-bound ports for R/uqt/KAn; the reader below owns real cache,
 * validation, account-race, freshness, fallback and scoped-header reconstruction.
 * fetchUsage must use the lane's OAuth client (official sI/PC 401 refresh), not
 * a model request. No network, writes or background jobs occur at construction.
 */
export interface UsageRateLimitPorts {
  accountUuid(): string | undefined
  readSnapshot(): unknown
  writeSnapshot(snapshot: UsageSnapshot | undefined,storageV5?:unknown): void
  lastAppliedObservationAtMs(): number | undefined
  readHeaderWindows(): {five_hour?: HeaderWindow; seven_day?: HeaderWindow; seven_day_overage_included?: HeaderWindow}
  credentials?:CredentialStore
  storageV5?:unknown
  quotaOwner?:ReturnType<typeof import('../../services/claudeAiLimits.js').getQuotaOwner287>
  fetchUsage(credentials?:CredentialStore): Promise<unknown>
  scopedModelDisplayNames(): readonly string[]
  ensureScopedModelsReady(): Promise<void>
  now?(): number
}
const usageKeys = ['five_hour', 'seven_day', 'seven_day_oauth_apps', 'seven_day_opus', 'seven_day_sonnet', 'cinder_cove', 'extra_usage', 'limits']
export function createUsageRateLimitReader(ports: UsageRateLimitPorts): () => Promise<UsageReadResult> {
  return createUsageRateLimitReader287(ports)
}
export function createSessionUsageHost(options: {
  redactsPersistedLane(): boolean
  rateLimits: UsageRateLimitPorts
  /** Explicit lane choice: legacy projects root OR the v5 storage reader. */
  transcripts: {projectsDir: string} | {scanBehaviorRecords(sinceMs: number): AsyncIterable<UsageBehaviorRecord>}
}): SessionUsageHost {
  const reader=createUsageRateLimitReader287(options.rateLimits)
  return {
    credentials:options.rateLimits.credentials,storageV5:options.rateLimits.storageV5,
    redactsPersistedLane: () => options.redactsPersistedLane(),
    readRateLimits: reader,seedRateLimits:reader.seed,
    getScopedModelDisplayNames: () => options.rateLimits.scopedModelDisplayNames(),
    now: () => options.rateLimits.now?.() ?? Date.now(),
    ...('projectsDir' in options.transcripts?{foldUsageRecords:createLocalUsageTranscriptReader287(()=> (options.transcripts as {projectsDir:string}).projectsDir).read}:{}),
    scanBehaviorRecords: sinceMs => 'projectsDir' in options.transcripts
      ? scanLocalUsageBehaviorRecords(options.transcripts.projectsDir, sinceMs)
      : options.transcripts.scanBehaviorRecords(sinceMs),
  }
}
