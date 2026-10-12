import type { UUID } from 'crypto'
import { randomUUID } from 'crypto'
import { getIsNonInteractiveSession, getSessionId } from '../bootstrap/state.js'
import type { SdkWorkflowProgress } from '../types/tools.js'
import type { SDKAssistantMessage, SDKUserMessage } from '../entrypoints/agentSdkTypes.js'
import type {SDKMessage} from '../entrypoints/agentSdkTypes.js'
import { createDreamNotification287 } from '../services/autoDream/officialDreamTaskPrompt287/native.js'
import {createSdkEventEnqueueListener287} from '../cli/printOwnership287/hostCloseNative.js'
import {getExecutionSession287} from '../services/context/execution287.js'

type TaskStartedEvent = {
  type: 'system'
  subtype: 'task_started'
  task_id: string
  tool_use_id?: string
  description: string
  task_type?: string
  workflow_name?: string
  prompt?: string
}

type TaskProgressEvent = {
  type: 'system'
  subtype: 'task_progress'
  task_id: string
  tool_use_id?: string
  description: string
  usage: {
    total_tokens: number
    tool_uses: number
    duration_ms: number
  }
  last_tool_name?: string
  summary?: string
  // Delta batch of workflow state changes. Clients upsert by
  // `${type}:${index}` then group by phaseIndex to rebuild the phase tree,
  // same fold as collectFromEvents + groupByPhase in PhaseProgress.tsx.
  workflow_progress?: SdkWorkflowProgress[]
}

// Emitted when a foreground agent completes without being backgrounded.
// Drained by drainSdkEvents() directly into the output stream — does NOT
// go through the print.ts XML task_notification parser and does NOT trigger
// the LLM loop. Consumers (e.g. VS Code session.ts) use this to remove the
// task from the subagent panel.
type TaskNotificationSdkEvent = {
  type: 'system'
  subtype: 'task_notification'
  task_id: string
  tool_use_id?: string
  status: 'completed' | 'failed' | 'stopped'
  output_file: string
  summary: string
  reason?: string
  resource_links?: readonly unknown[]
  skip_transcript?: boolean
  ambient?: boolean
  usage?: {
    total_tokens: number
    tool_uses: number
    duration_ms: number
  }
}

// Mirrors notifySessionStateChanged. The CCR bridge already receives this
// via its own listener; SDK consumers (scmuxd, VS Code) need the same signal
// to know when the main turn's generator is idle vs actively producing.
// The 'idle' transition fires AFTER heldBackResult flushes and the bg-agent
// do-while loop exits — so SDK consumers can trust it as the authoritative
// "turn is over" signal even when result was withheld for background agents.
type SessionStateChangedEvent = {
  type: 'system'
  subtype: 'session_state_changed'
  state: 'idle' | 'running' | 'requires_action'
}

type UnstampedSystem287<T>=T extends {type:'system'}?Omit<T,'uuid'|'session_id'>:never
export type SdkEvent =
  | import('../commands/clear/resetEvents.js').ConversationResetSdkEvent
  | TaskStartedEvent
  | TaskProgressEvent
  | TaskNotificationSdkEvent
  | SessionStateChangedEvent
  | SDKAssistantMessage
  | SDKUserMessage
  | import('../entrypoints/sdk/coreTypes.js').SDKPartialAssistantMessage
  | UnstampedSystem287<SDKMessage>

const MAX_QUEUE_SIZE = 1000
// Upgrade the existing queue owner with the original listener cell. The
// canonical private-lane Yh/JO is not installed beside this public queue.
const queue={events:[] as SdkEvent[],...createSdkEventEnqueueListener287()}
export function setSdkEventEnqueueListener287(listener:(()=>void)|null):void {
  queue.setEnqueueListener(listener)
}
export function hasQueuedSdkEvent287(predicate:(event:SdkEvent)=>boolean):boolean {
  return queue.events.some(predicate)
}

// Final blocks, lifecycle bookends, and workflow_progress delta batches are
// durable. Only task usage/description progress is a replaceable snapshot.
function isReplaceableProgress(event: SdkEvent): boolean {
  return event.type === 'system' && event.subtype === 'task_progress' &&
    !('workflow_progress' in event && event.workflow_progress?.length)
}

export function enqueueSdkEvent(event: SdkEvent): void {
  // Original Yh qualification: the live REPL bridge consumes this same queue.
  if (!getIsNonInteractiveSession() && !getExecutionSession287().surfaceCapabilities.replBridgeActive()) {
    return
  }
  if (event.type === 'stream_event' && !getIsNonInteractiveSession() && queue.enqueueListener === null) return
  if (queue.events.length >= MAX_QUEUE_SIZE) {
    const expendable = queue.events.findIndex(isReplaceableProgress)
    if (expendable >= 0) queue.events.splice(expendable, 1)
    else if (isReplaceableProgress(event)) return
    // Durable content and lifecycle events may exceed the soft cap until the
    // next headless drain; never silently discard a completed Agent block.
  }
  queue.events.push(event)
  queue.notifyEnqueued()
}

export function drainSdkEvents(): Array<
  SdkEvent & { uuid: UUID; session_id: string }
> {
  if (queue.events.length === 0) {
    return []
  }
  const events = queue.events.splice(0)
  return events.map(e => ({
    ...e,
    uuid: 'uuid' in e ? e.uuid : randomUUID(),
    session_id: getSessionId(),
  }))
}

/**
 * Emit a task_notification SDK event for a task reaching a terminal state.
 *
 * registerTask() always emits task_started; this is the closing bookend.
 * Call this from any exit path that sets a task terminal WITHOUT going
 * through enqueuePendingNotification-with-<task-id> (print.ts parses that
 * XML into the same SDK event, so paths that do both would double-emit).
 * Paths that suppress the XML notification (notified:true pre-set, kill
 * paths, abort branches) must call this directly so SDK consumers
 * (Scuttle's bg-task dot, VS Code subagent panel) see the task close.
 */
export function emitTaskTerminatedSdk(
  taskId: string,
  status: 'completed' | 'failed' | 'stopped',
  opts?: {
    toolUseId?: string
    summary?: string
    outputFile?: string
    usage?: { total_tokens: number; tool_uses: number; duration_ms: number }
  },
): void {
  enqueueSdkEvent({
    type: 'system',
    subtype: 'task_notification',
    task_id: taskId,
    tool_use_id: opts?.toolUseId,
    status,
    output_file: opts?.outputFile ?? '',
    summary: opts?.summary ?? '',
    usage: opts?.usage,
  })
}

// Original Ii/Vh, sharing the existing execution host's terminal claims.
// Resolve this slot only on an actual notification, not during CLI imports.
export const emitDreamTaskNotification287 = createDreamNotification287({
  rr() {
    const { taskFileNative287 } = require('../tools/GetTaskTool/nativeHost.js') as typeof import('../tools/GetTaskTool/nativeHost.js')
    const { getExecutionSession287 } = require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')
    return taskFileNative287.SessionSlot.of(getExecutionSession287().host)
  },
  Wi: enqueueSdkEvent,
})
