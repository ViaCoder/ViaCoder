// Background task entry for auto-dream (memory consolidation subagent).
// Makes the otherwise-invisible forked agent visible in the footer pill and
// Shift+Down dialog. The dream agent itself is unchanged — this is pure UI
// surfacing via the existing task registry.

import { rollbackConsolidationLock } from '../../services/autoDream/consolidationLock.js'
import type { SetAppState, Task, TaskStateBase } from '../../Task.js'
import { createTaskStateBase, generateTaskId } from '../../Task.js'
import { registerTask, updateTaskState } from '../../utils/task/framework.js'
import { emitDreamTaskNotification287 } from '../../utils/sdkEventQueue.js'
import { logEvent, type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'
import { createDreamTasks287, type DreamTaskRegistry287 } from '../../services/autoDream/officialDreamTaskPrompt287/native.js'

// Keep only the N most recent turns for live display.
const originalDreamTasks287 = createDreamTasks287({
  Mw: generateTaskId,
  em: createTaskStateBase,
  y: feature => logEvent('tengu_feature_ok', {feature_name: feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
  m: (feature, error) => logEvent('tengu_feature_bad', {feature_name: feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS, error_code: error as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
  Ii: emitDreamTaskNotification287,
})
/** Muo shares these exact task helpers and the existing AppState registry. */
export const getDreamTaskHelpers287=()=>originalDreamTasks287

// This is a view over AppState, not a second task registry or persistent cache.
function taskRegistry287(setAppState: SetAppState): DreamTaskRegistry287 {
  return {
    register: task => registerTask(task, setAppState),
    update: (id, updater) => updateTaskState<DreamTaskState>(id, setAppState, updater),
  }
}

// A single assistant turn from the dream agent, tool uses collapsed to a count.
export type DreamTurn = {
  text: string
  toolUseCount: number
}

// No phase detection — the dream prompt has a 4-stage structure
// (orient/gather/consolidate/prune) but we don't parse it. Just flip from
// 'starting' to 'updating' when the first Edit/Write tool_use lands.
export type DreamPhase = 'starting' | 'updating'

export type DreamTaskState = TaskStateBase & {
  type: 'dream'
  phase: DreamPhase
  sessionsReviewing: number
  /**
   * Paths observed in Edit/Write tool_use blocks via onMessage. This is an
   * INCOMPLETE reflection of what the dream agent actually changed — it misses
   * any bash-mediated writes and only captures the tool calls we pattern-match.
   * Treat as "at least these were touched", not "only these were touched".
   */
  filesTouched: string[]
  /** Assistant text responses, tool uses collapsed. Prompt is NOT included. */
  turns: DreamTurn[]
  /** Raw Muo write correlation; candidates are not proof of a committed write. */
  writeFeedback287?: { dreamWrote: string[]; mayHaveWritten: string[] }
  abortController?: AbortController
  /** Stashed so kill can rewind the lock mtime (same path as fork-failure). */
  priorMtime: number
  skipTranscript?: boolean
  storageV5?: unknown
}

export function isDreamTask(task: unknown): task is DreamTaskState {
  return originalDreamTasks287.isDreamTask(task)
}

export function registerDreamTask(
  setAppState: SetAppState,
  opts: {
    sessionsReviewing: number
    priorMtime: number
    abortController: AbortController
    storageV5?: unknown
  },
): string {
  return originalDreamTasks287.register(taskRegistry287(setAppState), opts)
}

export function addDreamTurn(
  taskId: string,
  turn: DreamTurn,
  touchedPaths: string[],
  setAppState: SetAppState,
): void {
  originalDreamTasks287.addTurn(taskId, turn, touchedPaths, taskRegistry287(setAppState))
}

/** Raw settlement projection, held only by the existing Task owner. */
export function settleDreamTaskWrites287(
  taskId: string,
  feedback: { dreamWrote: Set<string>; mayHaveWritten: Set<string> },
  setAppState: SetAppState,
): void {
  updateTaskState<DreamTaskState>(taskId, setAppState, task => ({
    ...task,
    writeFeedback287: {
      dreamWrote: [...feedback.dreamWrote],
      mayHaveWritten: [...feedback.mayHaveWritten],
    },
  }))
}

export function completeDreamTask(
  taskId: string,
  setAppState: SetAppState,
): void {
  originalDreamTasks287.complete(taskId, taskRegistry287(setAppState))
}

export function failDreamTask(taskId: string, setAppState: SetAppState): void {
  originalDreamTasks287.fail(taskId, taskRegistry287(setAppState))
}

export const DreamTask: Task = {
  name: 'DreamTask',
  type: 'dream',

  async kill(taskId, setAppState) {
    let priorMtime: number | undefined
    let storageV5: unknown
    updateTaskState<DreamTaskState>(taskId, setAppState, task => {
      if (task.status !== 'running') return task
      task.abortController?.abort()
      priorMtime = task.priorMtime
      storageV5 = task.storageV5
      return {
        ...task,
        status: 'killed',
        endTime: Date.now(),
        notified: true,
        abortController: undefined,
      }
    })
    // Rewind the lock mtime so the next session can retry. Same path as the
    // fork-failure catch in autoDream.ts. If updateTaskState was a no-op
    // (already terminal), priorMtime stays undefined and we skip.
    if (priorMtime !== undefined) {
      await rollbackConsolidationLock(priorMtime, storageV5)
    }
  },
}
