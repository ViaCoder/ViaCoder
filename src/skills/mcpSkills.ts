import type {Command} from '../types/command.js'
import type {McpSkillsClient287} from './officialMcpSkills287/native.js'
import {getOriginalMcpSkillsModule287} from './mcpSkillsRuntime287.js'
import {getMcpSkillCommandRoot287} from './mcpSkillBuilders.js'
import {getMcpConnectedProducer287} from '../services/mcp/connectedProducer287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
/** Public MCP skills share the full 287 fetcher in the existing AP owner.
 * Eligibility and unadvertised third-party resource projection remain local C. */
const SKILLS_EXTENSION = 'io.modelcontextprotocol/skills'
type SkillClient = McpSkillsClient287
type Observation287 = {status:'supported'|'unsupported'|'partial';promise:Promise<Command[]>|undefined}
const observed = new WeakMap<SkillClient, Observation287>()
const confirmedRoots = new WeakMap<SkillClient,{roots:Set<string>;promise:Promise<Command[]>}>()
function key287(client:SkillClient):string { return getMcpConnectedProducer287().cacheKey(client.name,client.config) }
function currentPromise287(client:SkillClient) { return getOriginalMcpSkillsModule287().mcpSkillsFetcher().fetchForClient.cache.get(key287(client)) }

/** Official F accepts only a syntactically safe SKILL.md URI root. */
function skillResourceRoot(uri: string): string | undefined {
  if (!uri.endsWith('/SKILL.md')) return undefined
  const root = uri.slice(0, -9)
  if (!/^[a-z][a-z0-9+.-]*:\/\/./i.test(root) || /[<>"\s\p{Cc}]/u.test(root)) return undefined
  try { return new URL(root).href.replace(/\/$/, '') } catch { return undefined }
}

/** Confirms a supporting-file URI against a skill loaded from this exact
 * connection. No fetch, cross-server fallback, or arbitrary URL acceptance. */
export function isConfirmedMcpSkillResourceUri(client: SkillClient, uri: string): boolean {
  let normalized: string
  try { normalized = new URL(uri).href } catch { return false }
  const record=confirmedRoots.get(client)
  return !!record&&record.promise===currentPromise287(client)&&[...record.roots].some(root => normalized.startsWith(`${root}/`))
}

export function hasConfirmedMcpSkillResourceRoot(client: SkillClient): boolean {
  const record=confirmedRoots.get(client)
  return !!record&&record.promise===currentPromise287(client)&&record.roots.size>0
}

export type McpSkillsEligibility = 'ready' | 'unknown' | 'client-gated' | 'server-declined'

/** Official han/kb has a global rollout gate. Locally an already-authorized
 * third-party MCP peer may use the read-only optional skills/list method even
 * without advertised capabilities; an absent declaration means unknown. */
export function getMcpSkillsEligibility(capabilities: unknown, serverKind?: string): McpSkillsEligibility {
  const caps = capabilities && typeof capabilities === 'object'
    ? capabilities as { resources?: unknown; extensions?: Record<string, unknown> } : undefined
  if (!caps) return 'unknown'
  if (caps.resources === false || caps.extensions?.[SKILLS_EXTENSION] === false) return 'server-declined'
  if (serverKind === 'claudeai-proxy' || serverKind === undefined) {
    if (getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_mcp_skills', false) !== true) return 'client-gated'
  }
  return caps.resources && caps.extensions?.[SKILLS_EXTENSION] !== undefined ? 'ready' : 'unknown'
}

export function mcpSkillsEnabled(capabilities: unknown, serverKind?: string): boolean {
  const state = getMcpSkillsEligibility(capabilities, serverKind)
  return state === 'ready' || (state === 'unknown' && serverKind !== 'claudeai-proxy' && serverKind !== undefined)
}

export function getMcpSkillsAvailability(client: SkillClient): 'supported' | 'unsupported' | 'partial' | 'unknown' | 'client-gated' {
  const seen = observed.get(client)
  if (seen&&seen.promise===currentPromise287(client)) return seen.status
  const eligibility = getMcpSkillsEligibility(client.capabilities, client.config.type)
  return eligibility === 'server-declined' ? 'unsupported' : eligibility === 'client-gated' ? 'client-gated' : 'unknown'
}

/** Read-only UI/C observations of the original list operation, not another loader/cache. */
export function recordMcpSkillPage287(client:SkillClient,cursor:string|undefined,error?:unknown):void {
  let status:Observation287['status']='supported'
  if(error!==undefined){
    if(cursor!==undefined)status='partial'
    else if(error&&typeof error==='object'&&Reflect.get(error,'code')===-32601)status='unsupported'
    else { observed.delete(client);return }
  }
  observed.set(client,{status,promise:currentPromise287(client)})
}
function sourceCache287() { return getOriginalMcpSkillsModule287().mcpSkillsFetcher().fetchForClient.cache }
export const fetchMcpSkillsForClient = Object.assign(async(client:SkillClient,options?:unknown):Promise<Command[]> => {
  const signalOptions=!!options&&typeof options==='object'&&'signal'in options
  const signal=options&&typeof options==='object'&&'signal'in options&&options.signal instanceof AbortSignal?options.signal:undefined
  signal?.throwIfAborted()
  if(!mcpSkillsEnabled(client.capabilities,client.config.type))return []
  // Public local callers formerly passed {signal}; original Fe's second arg is
  // an optional StorageV5 handle. Never treat the former object as storage.
  const commandsPromise=getOriginalMcpSkillsModule287().fetchMcpSkillsForClient(client,signalOptions?undefined:options)
  const cachePromise=currentPromise287(client)
  const commands=await commandsPromise
  signal?.throwIfAborted()
  if(cachePromise&&cachePromise===currentPromise287(client)){
    const roots=new Set<string>()
    for(const command of commands){
      const resource=getMcpSkillCommandRoot287(command)
      if(resource){
        const root=skillResourceRoot(resource.uri+'/SKILL.md')
        if(root)roots.add(root)
      }
    }
    confirmedRoots.set(client,{roots,promise:cachePromise})
  }
  return commands
},{cache:{
  delete(key:string):boolean { return sourceCache287().delete(key) },
  clear():void { getOriginalMcpSkillsModule287().mcpSkillsFetcher().reset() },
}})
export function invalidateMcpSkillsForServer287(key:string):void {
  getOriginalMcpSkillsModule287().invalidateMcpSkillsForServer(key)
}
export function invalidateMcpSkillsExcept287(keys:Set<string>):void {
  getOriginalMcpSkillsModule287().invalidateMcpSkillsExcept(keys)
}
