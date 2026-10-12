import {emitCompactEvent287} from './reactiveDispatcher287.js'
import type { ToolUseContext } from '../../Tool.js'
import type { Message,AssistantMessage } from '../../types/message.js'
import type { CacheSafeParams } from '../../utils/forkedAgent.js'
import { getSessionId, getSdkBetas, onSessionSwitch } from '../../bootstrap/state.js'
import { getContextWindowForModel } from '../../utils/context.js'
import { getMaxOutputTokensForModel } from '../api/claude.js'
import { isAutoCompactEnabled, getEffectiveContextWindowSize } from './autoCompact.js'
import {getClearSourceModule287,runWithCompactLifecycleContext287} from '../../commands/clear/lifecycle287.js'
import { getExecutionSession287 } from '../context/execution287.js'
import type { ExecutionSession287 } from '../context/officialExecutionOwners287/native.js'
import type { CompactPrecomputeStore, PrecomputedCompactEntry } from './manualPrecompute.js'
import {createQueryCompactLifecycle287,type QueryCompactCallerPorts287,type DeeperPass287} from './officialQueryCompact287/native.js'

/** Stateless original caller stages; all policy, grouping and pending state
 * remain on the already-installed canonical namespaces/execution root. */
export function getQueryCompactLifecycle287(overrides:Partial<QueryCompactCallerPorts287>={}) {
 const source=getClearSourceModule287('chunk-mphp7acd.js')
 const shared=(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-1b21she7.js')
 const post=()=>require('../../query/postTurnClient287/index.js') as typeof import('../../query/postTurnClient287/index.js')
 const identity=(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
 const betas=identity.clearSourceModule287('chunk-bn3p37gv.js')
 return createQueryCompactLifecycle287({...source,Nue:shared.Nue,EY:betas.EY,mR:betas.mR,Ei:betas.Ei,
  St:()=>post().getPostTurnJobExports287(),xc:()=>post().getPostTurnClient287().admission.xc(),
  pFe:(message:AssistantMessage,context:ToolUseContext)=>{void (require('../../utils/hooks.js') as typeof import('../../utils/hooks.js')).executeStopFailureHooks(message,context)},
  uo:(context:ToolUseContext,querySource:string,message:AssistantMessage)=>post().getPostTurnClient287().queryObservers.uo(context,querySource,message),
  go:(context:ToolUseContext)=>post().getPostTurnClient287().queryObservers.go(context),no:(context:ToolUseContext,querySource:string)=>post().getPostTurnClient287().queryObservers.no(context,querySource),
  of:()=>callOriginalIdentity287(identity.clearSourceModule287('chunk-1jqp49rh.js').of),KM:identity.clearSourceModule287('chunk-xep95vq1.js').KM,
  ...overrides} as QueryCompactCallerPorts287)
}
function callOriginalIdentity287(fn:unknown):unknown {if(typeof fn!=='function')throw Error('Original job identity reader is not installed');return fn()}
export function isPreFirstCompactFork287(context:ToolUseContext,tracking:import('./autoCompact.js').AutoCompactTrackingState|undefined,querySource:string):boolean {
 return getQueryCompactLifecycle287().isPreFirstCompactFork({f:context,Ve:tracking,b:querySource})
}
export type {DeeperPass287}

export interface CompactRuntimeStore extends CompactPrecomputeStore {
  byAgent: Map<string, PrecomputedCompactEntry>
  put(key: string, entry: PrecomputedCompactEntry): void
  nextAttemptNumber(key: string): number
  consecutiveCountedFailures(key: string): number
  recordCountedFailure(key: string): number
  clearCountedFailures(key: string): void
  recordVeto(key: string, prompt: string): void
  isVetoedUnder(key: string, prompt: string): boolean
  latchArmGateEvent(key: string): boolean
}
// Query, AppState model changes and clear resolve the same recovered session
// precompute. The lease is UI cancellation state, not another compact store.
// A withProject fork shares the root; independent executors keep their leases.
const sessionOwners = new WeakMap<CompactRuntimeStore, {root: ExecutionSession287, id: string}>()
const sessionSignals = new WeakMap<CompactPrecomputeStore, AbortSignal>()
type PrecomputeLease = {id: string, store: CompactRuntimeStore, controller: AbortController}
const activeOwners = new WeakMap<ExecutionSession287, PrecomputeLease>()
function retireActiveStore(root: ExecutionSession287) {
  const previous = activeOwners.get(root)
  activeOwners.delete(root)
  if (!previous) return
  const entries = [...previous.store.byAgent.values()]
  previous.store.byAgent.clear()
  previous.controller.abort('session_changed')
  // Removing before abort makes official Aoe's pointer check reject late work.
  for (const entry of entries) entry.abortController?.abort('session_changed')
}
onSessionSwitch(id => {
  const root = getExecutionSession287().root
  const active = activeOwners.get(root)
  if (!active || active.id === id) return
  retireActiveStore(root)
})
export function getCompactPrecompute(context: ToolUseContext, create = false): CompactRuntimeStore | undefined {
  const session = getExecutionSession287(), root = session.root, id = session.id
  if (context.compactPrecompute) {
    const owner = sessionOwners.get(context.compactPrecompute)
    if (owner === undefined || owner.root === root && owner.id === id) return context.compactPrecompute
    delete context.compactPrecompute
  }
  let active = activeOwners.get(root)
  if (active && active.id !== id) {
    retireActiveStore(root)
    active = undefined
  }
  const store = session.precompute as CompactRuntimeStore
  // A restored/source-created entry exists before a local lease is requested.
  // Reading it does not arm new speculative work or allocate another store.
  if (!active && (create || store.byAgent.size > 0)) {
    active = {id, store, controller: new AbortController()}
    activeOwners.set(root, active)
    sessionOwners.set(store, {root, id})
    sessionSignals.set(store, active.controller.signal)
  }
  if (active) context.compactPrecompute = active.store
  return active?.store
}
/** Only the implicit active-session store has a session lifetime. Explicit
 * fork/fixture stores remain owned by their caller. Foreground cancellation
 * wakes ZSr but deliberately leaves speculative work running for the next turn. */
export async function withCompactPrecomputeLease<T>(context: ToolUseContext, store: CompactPrecomputeStore,
  work: (context: ToolUseContext, sessionEnded: () => boolean) => Promise<T>): Promise<T> {
  const session = sessionSignals.get(store)
  if (!session) return work(context, () => false)
  const controller = new AbortController()
  const signal = AbortSignal.any([context.abortController.signal, session])
  const abort = () => controller.abort(signal.reason)
  if (signal.aborted) abort()
  else signal.addEventListener('abort', abort, {once: true})
  try {return await work({...context, abortController: controller}, () => session.aborted)}
  finally {signal.removeEventListener('abort', abort)}
}
export function invalidateCompactPrecompute(context: ToolUseContext, reason = 'post_compact_cleanup') {
  const store = getCompactPrecompute(context), key = context.agentId ?? 'main'
  store?.get(key)?.abortController?.abort(reason)
  store?.remove(key)
}
function kernel() {
  // Complete287 bodies and all stateful dependencies come from clear's single
  // canonical namespace. No old283 kernel, sidecar cache or summary factory.
  return getClearSourceModule287('chunk-mphp7acd.js') as Record<string, (...args:any[])=>any>
}
function withStore(context: ToolUseContext, store: CompactRuntimeStore) {
  const execution=getExecutionSession287()
  // An explicit caller-owned store remains supported by C; only the ABI view
  // overrides this reference, with all other execution fields read through.
  const session=execution.precompute===store?execution:new Proxy(execution,{get(target,key){if(key==='precompute')return store;const value=Reflect.get(target,key);return typeof value==='function'?value.bind(target):value}})
  return {...context, session,
    // Original nEo silences the unified callback, while the local UI also has legacy setters.
    setStreamMode: undefined, setResponseLength: undefined, onCompactProgress: undefined, setSDKStatus: undefined}
}
/** Query calls at the official post-autocompact estimate point. BIr owns its
 * pending task and never blocks the foreground request. No caller-injected fixture. */
export function maybeStartCompactPrecompute(input: {
  messages: Message[], cacheSafeParams: CacheSafeParams, querySource: string,
  autocompactRan: boolean, hasAttemptedReactiveCompact: boolean, lastTransitionReason?: string,
  contextTokens?: number, armTrigger?: 'estimate' | 'api_response', estimateGapTokens?: number, isFinalResponse?: boolean,
  isPreFirstCompactFork?:boolean, responseMessages?:AssistantMessage[], responseUsage?:AssistantMessage['message']['usage'],
  snipTokensFreed?:number, toolUses?:readonly unknown[],
  agentCacheTtlOverride?:'5m'|'1h',
}): boolean {
  const context = input.cacheSafeParams.toolUseContext
  if (!isAutoCompactEnabled() || input.querySource === 'compact' || context.abortController.signal.aborted ||
      ['prompt_suggestion', 'away_summary', 'agent_summary', 'narration'].includes(input.querySource)) return false
  const core = kernel()
  // Existing local C does not speculate at subagent estimate/final-turn points.
  if ((getClearSourceModule287('chunk-nankzm0s.js').Ss as (source:string)=>string)(input.querySource) === 'subagent' && (input.armTrigger !== 'api_response' || input.isFinalResponse)) {
    invalidateCompactPrecompute(context, input.isFinalResponse ? 'subagent_exit' : 'subagent_estimate')
    // Retain C retirement, then run the original UIr -> FIr latch/diagnostic.
    // FIr does not arm work or cancel a task; returning here lost that caller.
  }
  const store = getCompactPrecompute(context, true)!, key = context.agentId ?? 'main'
  const old = store.get(key)
  if (old && (old.model !== context.options.mainLoopModel ||
    !input.messages.some(m => m.uuid === old.precomputedAtUuid) ||
    old.key && !(getClearSourceModule287('chunk-bn3p37gv.js').rkn as Function)(old.key, core.kHt(input.messages), undefined))) {
    invalidateCompactPrecompute(context, old.model !== context.options.mainLoopModel ? 'model_switch' : 'boundary_uuid_missing')
  }
  const facts = {...core.Vu(context.options.mainLoopModel,getSdkBetas()),
    // Existing local third-party/window and output-cap C remain authoritative.
    contextWindow:getContextWindowForModel(context.options.mainLoopModel,getSdkBetas()),maxOutputTokens:getMaxOutputTokensForModel(context.options.mainLoopModel)}
  const caller=withStore(context,store)
  let armed=false
  const lifecycle=getQueryCompactLifecycle287({BIr:(args:unknown)=>{armed=core.BIr(args);return armed},
    // Preserve the existing explicit token-estimate API; actual query estimate
    // passes no override, so the original jm(bytesPerToken)-snip expression runs.
    jm:(messages:Message[],bytesPerToken?:number)=>input.armTrigger!=='api_response'&&input.contextTokens!==undefined&&messages===input.messages?input.contextTokens+(input.snipTokensFreed??0):core.jm(messages,bytesPerToken)})
  const stage={ws:input.autocompactRan,No:input.hasAttemptedReactiveCompact,N:{transition:input.lastTransitionReason===undefined?undefined:{reason:input.lastTransitionReason}},
    ur:input.isPreFirstCompactFork??false,b:input.querySource,w:input.messages,qt:facts,In:input.snipTokensFreed??0,f:caller,
    po:(getClearSourceModule287('chunk-nankzm0s.js').Ss as (source:string)=>string)(input.querySource),
    u:input.cacheSafeParams.systemPrompt,s:input.cacheSafeParams.userContext,g:input.cacheSafeParams.systemContext,
    lt:input.cacheSafeParams.stickyBetas,W:input.agentCacheTtlOverride}
  runWithCompactLifecycleContext287(caller,()=>input.armTrigger==='api_response'
    ?lifecycle.response({...stage,Q:input.responseMessages??[],to:input.contextTokens??core.jm(input.messages),
      be:input.responseUsage??input.responseMessages?.at(-1)?.message.usage??{},vt:[...(input.toolUses??(input.isFinalResponse?[]:[true]))]})
    :lifecycle.estimate(stage))
  if (armed) {
    const entry = store.get(key)!
    entry.model = context.options.mainLoopModel
    // BIr installs the key only after completion; retaining the input key while
    // pending allows rewinds to cancel obsolete work before it finishes.
    entry.key = (getClearSourceModule287('chunk-bn3p37gv.js').Aet as Function)(core.kHt(input.messages), undefined)
  }
  return armed
}
export interface AutomaticPrecomputeCaller287 {
 detectedAt?:number
 borrowFrom?:string
 onResponseLength?:(event:{type:'response_length';op:'reset'|'add';delta?:number})=>void
}
export async function consumeAutomaticPrecompute(context: ToolUseContext, messages: Message[], querySource: string,
  hasAttempted: boolean, isWithheld413: boolean, trigger: 'ptl' | 'threshold' = 'ptl', options:AutomaticPrecomputeCaller287={}) {
  const store = getCompactPrecompute(context)
  if (!store) return undefined
  const onCompactEvent = context.onCompactEvent ?? (event=>emitCompactEvent287(context,event))
  const onResponseLength=options.onResponseLength??(event=>context.setResponseLength?.(length=>event.op==='reset'?0:length+(event.delta??0)))
  return withCompactPrecomputeLease(context, store, async (leased, sessionEnded) => {
    const caller={...withStore(leased,store),onCompactEvent}
    const result = await runWithCompactLifecycleContext287(caller,()=>kernel().WIr({toolUseContext: caller, messages,
      querySource, hasAttemptedReactiveCompact: hasAttempted, isWithheld413, trigger,
      detectedAt: options.detectedAt??performance.now(),borrowFrom:options.borrowFrom,onResponseLength}))
    return sessionEnded() ? {...result, outcome: {kind: 'aborted'}, swap: undefined} : result
  })
}
