import { ERROR_MESSAGE_USER_ABORT } from './compact.js'
import { getCompactPrecompute, withCompactPrecomputeLease } from './precompute.js'
import type { ToolUseContext } from '../../Tool.js'
import type { Message } from '../../types/message.js'
import type { ReactiveSummary } from './reactiveFinalizer.js'
import { getClearLifecycleBinding287, getClearSourceModule287 } from '../../commands/clear/lifecycle287.js'
import { getExecutionSession287 } from '../context/execution287.js'

export type PrecomputedCompactEntry = {
  model?: string
  abortController?: AbortController
  preCompactHookDisplay?: string
  status: 'pending' | 'ready' | 'failed'
  settled: Promise<unknown>
  result?: ReactiveSummary
  precomputedAtUuid?: string
  key?: {rowUuids: string[], instructions?: string}
  replacement?: boolean
  startedAt?: number
  readyDurationMs?: number
  sidecarSessionId?: string
  failure?: {cause: string, [key: string]: unknown}
}
export interface CompactPrecomputeStore {
  get(key: string): PrecomputedCompactEntry | undefined
  remove(key: string): unknown
}
export interface CompactPrecomputeHost {
  precompute: CompactPrecomputeStore
}
const hosts = new WeakMap<object, CompactPrecomputeHost>()
/** Attach the session-owned store without adding fields to shared Tool.ts. */
export function attachCompactPrecompute(context: ToolUseContext, host: CompactPrecomputeHost) {
  hosts.set(context, host)
}

export async function consumeManualPrecompute(context: ToolUseContext, customInstructions: string,
  hookInstructions: string | undefined, messages: Message[], originalRowUuids?: string[]) {
  // I owns the complete 287 miss/rehydrate/wait/consume decision. Its namespace
  // shares clear's canonical store and sidecar writer, not the legacy 283 kernel.
  const consume = getClearLifecycleBinding287('chunk-bpkkwmx3.js', 'I') as
    (context: ToolUseContext, instructions: string, hooks: string | undefined,
      messages: Message[], rowUuids: string[] | undefined) => Promise<any>
  if (customInstructions || hookInstructions) return consume(context, customInstructions, hookInstructions, messages, originalRowUuids)
  const store = hosts.get(context)?.precompute ?? getCompactPrecompute(context, true)!
  const rowUuids = originalRowUuids ?? (getClearSourceModule287('chunk-mphp7acd.js').kHt as
    (messages: Message[]) => string[])(messages)
  return withCompactPrecomputeLease(context, store, async (leased, sessionEnded) => {
    const session = getExecutionSession287()
    const result = await consume(Object.assign({}, leased, {session: store === session.precompute ? session : {precompute: store}}),
      customInstructions, hookInstructions, messages, rowUuids)
    if (sessionEnded()) throw Error(ERROR_MESSAGE_USER_ABORT)
    return result
  })
}
