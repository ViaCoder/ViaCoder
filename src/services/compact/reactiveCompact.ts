import { isReactiveCompactEnabled } from './gates.js'
export { isReactiveCompactEnabled } from './gates.js'
import { consumeAutomaticPrecompute } from './precompute.js'
import type {ToolUseContext} from '../../Tool.js'
import type { Message, AssistantMessage, StreamEvent } from '../../types/message.js'
import type { CacheSafeParams } from '../../utils/forkedAgent.js'
import { isPromptTooLongMessage, isMediaSizeErrorMessage } from '../api/errors.js'
import { isAutoCompactEnabled } from './autoCompact.js'
import { createReactiveKernel287 } from './reactiveRuntime.js'
import { type ReactiveSummary } from './reactiveFinalizer.js'
import { type CompactionResult } from './compact.js'
import { runPostCompactCleanup } from './postCompactCleanup.js'
import { suppressCompactWarning } from './compactWarningState.js'
import { setLastSummarizedMessageId } from '../SessionMemory/sessionMemoryUtils.js'
import {dispatchReactiveCompact287,summarizeAndFinalizeReactive287,emitCompactEvent287} from './reactiveDispatcher287.js'

export type ReactiveFailureReason = 'too_few_groups' | 'aborted' | 'exhausted' | 'error' | 'media_unstrippable'
export type ReactiveOutcome = {ok: true, result: CompactionResult} | {ok: false, reason: ReactiveFailureReason, detail?: string}
export interface ReactiveOptions {
  customInstructions?: string
  trigger?: 'manual' | 'auto'
  initialTokenGap?: number
  querySource?: string
  userWaitStartedAt?: number
  allowLastResort?: boolean
  skipMessageCacheMarkers?: boolean
  thresholdSource?: string
  manualPrecomputeReuse?: string
  precomputedKind?: string
  precomputedFailureCause?: string
  onResponseLength?: (event: {type: 'response_length', op: 'reset' | 'add', delta?: number}) => void
}

// Official manual entry T always uses GSr after precompute; it has no
// reactive-only experiment gate. Preserve the existing local SM fast path.
export function isReactiveOnlyMode(): boolean { return true }
export function isWithheldPromptTooLong(message: Message | StreamEvent): boolean {
  return message.type === 'assistant' && isPromptTooLongMessage(message as AssistantMessage)
}
export function isWithheldMediaSizeError(message: Message | StreamEvent): boolean {
  return message.type === 'assistant' && isMediaSizeErrorMessage(message as AssistantMessage)
}

/** Executable official 287 xie -> Jwo retry/summarization closure. Injection is
 * per invocation: tests never patch the global model transport. */
export async function summarizeReactive(messages: Message[], cacheSafeParams: CacheSafeParams,
  options: ReactiveOptions = {}, hostOverrides: Record<string, unknown> = {}): Promise<
    {ok: true, result: ReactiveSummary} | {ok: false, reason: ReactiveFailureReason, detail?: string, [key: string]: unknown}
  > {
  const kernel = createReactiveKernel287(hostOverrides)
  const context = cacheSafeParams.toolUseContext
  const onCompactEvent = context.onCompactEvent ?? ((event: any) => {
    if (event.type === 'stream_mode') context.setStreamMode?.(event.mode)
    if (event.type === 'sdk_status') context.setSDKStatus?.(event.status)
    if (event.type === 'compact_progress') context.onCompactProgress?.(event.event)
  })
  return kernel.xie(messages, {...cacheSafeParams, toolUseContext: {...context, onCompactEvent}}, {
    customInstructions: options.customInstructions, initialTokenGap: options.initialTokenGap,
    compactionRequestKind: kernel.Mie(options.trigger ?? 'auto', options.thresholdSource),
    allowFallback: options.allowLastResort !== false,
    onResponseLength: options.onResponseLength,
    skipMessageCacheMarkers: options.skipMessageCacheMarkers,
  })
}

/** Complete287 HIr caller; summarizeReactive above is the protected B158 API. */
export async function reactiveCompactOnPromptTooLong(messages:Message[],cacheSafeParams:CacheSafeParams,
 options:ReactiveOptions={}):Promise<ReactiveOutcome> {
 return summarizeAndFinalizeReactive287(messages,cacheSafeParams,{...options,allowLastResort:options.allowLastResort}) as Promise<ReactiveOutcome>
}

/** Preserve the local nullable return contract around the original W6n envelope. */
export async function tryReactiveCompact(params:{
 hasAttempted:boolean;querySource?:string;aborted:boolean;messages:Message[];cacheSafeParams:CacheSafeParams;
 initialTokenGap?:number;thresholdSource?:string;isWithheld413?:boolean;precomputeTrigger?:'ptl'|'threshold';
 hasAttemptedReactiveCompact?:boolean;borrowFrom?:string;
}):Promise<CompactionResult|null> {
 return (await recoverReactiveCompact287(params)).result
}
/** Expose the original At receipt to the actual query guards, not a second
 * compact cache. A precomputed swap does not spend the full-summary attempt. */
export async function recoverReactiveCompact287(params:Parameters<typeof tryReactiveCompact>[0]):Promise<{result:CompactionResult|null;precomputed?:unknown;failure?:{reason:string;detail?:string}}> {
 // Retained local-C disabled/auxiliary entry gates; OIr applies the complete
 // original public gate inside the dispatcher, including precomputed exemption.
 if(params.hasAttempted||params.aborted||params.querySource==='compact'||
  ['prompt_suggestion','away_summary','agent_summary','narration'].includes(params.querySource??'')||
  !isAutoCompactEnabled()||!isReactiveCompactEnabled())return {result:null}
 const context=params.cacheSafeParams.toolUseContext,userWaitStartedAt=performance.now()
 const cached=await consumeAutomaticPrecompute(context,params.messages,params.querySource??'repl_main_thread',params.hasAttemptedReactiveCompact??params.hasAttempted,params.isWithheld413!==false,params.precomputeTrigger,{detectedAt:userWaitStartedAt,borrowFrom:params.borrowFrom})
 if(context.abortController.signal.aborted||cached?.outcome.kind==='aborted'){
  if(cached?.emittedEarlyCompactStart){emitCompactEvent287(context,{type:'compact_progress',event:{type:'compact_end'}});emitCompactEvent287(context,{type:'sdk_status',status:null})}
  return {result:null}
 }
 const outcome=await dispatchReactiveCompact287({...params,precomputed:cached?.swap,precomputeOutcome:cached?.outcome,
  userWaitStartedAt,allowLastResort:params.isWithheld413!==false,
  onNotification:notification=>{if(context.addNotification)context.addNotification(notification as Parameters<NonNullable<ToolUseContext['addNotification']>>[0]);else context.onCompactEvent?.({type:'notification',notification})},
  onResponseLength:event=>context.setResponseLength?.(length=>event.op==='reset'?0:length+(event.delta??0))})
 if(!outcome.result){
  if(cached?.emittedEarlyCompactStart){emitCompactEvent287(context,{type:'compact_progress',event:{type:'compact_end'}});emitCompactEvent287(context,{type:'sdk_status',status:null})}
  return {result:null,precomputed:cached?.swap,...outcome.failure&&{failure:outcome.failure}}
 }
 // Pce has already retired the real precompute pointer and original caches.
 // Retain only the separate local-C memory/microcompact/presentation cleanup.
 setLastSummarizedMessageId(undefined);runPostCompactCleanup(params.querySource as Parameters<typeof runPostCompactCleanup>[0])
 if(params.querySource===undefined||params.querySource==='sdk'||params.querySource.startsWith('repl_main_thread'))suppressCompactWarning()
 return {result:outcome.result,precomputed:cached?.swap}
}
