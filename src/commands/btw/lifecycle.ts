import { createAbortController } from '../../utils/abortController.js'
import { logForDebugging } from '../../utils/debug.js'
import { errorMessage } from '../../utils/errors.js'
import type { SideQuestionResult } from '../../utils/sideQuestion.js'
import type { BtwHistory, BtwInFlight, BtwOutcome } from './history.js'

/** One producer owns each running question; panels only attach to its result. */
export function startOrAdoptBtwQuestion(
  history: BtwHistory,
  question: string,
  run: (controller: AbortController) => Promise<SideQuestionResult>,
): BtwInFlight {
  const existing = history.inFlightQuestions.find(
    item => item.state === 'running' && item.question === question,
  )
  if (existing) return existing

  const controller = createAbortController()
  let resolveSettled!: (outcome: BtwOutcome) => void
  const settled = new Promise<BtwOutcome>(resolve => { resolveSettled = resolve })
  const task: BtwInFlight = {
    question,
    settled,
    state: 'running',
    abort: () => controller.abort(),
  }
  history.setInFlight(task)

  void (async () => {
    let outcome: BtwOutcome
    try {
      // Cancellation wins even if a host runner ignores its signal briefly.
      const cancelled = new Promise<null>(resolve => {
        if (controller.signal.aborted) resolve(null)
        else controller.signal.addEventListener('abort', () => resolve(null), { once: true })
      })
      const result = await Promise.race([
        Promise.resolve().then(() =>
          controller.signal.aborted ? null : run(controller),
        ),
        cancelled,
      ])
      outcome = result === null || controller.signal.aborted || result.aborted
        ? null
        : result.response
          ? { response: result.response, synthetic: result.synthetic === true }
          : { error: 'No response received' }
    } catch (error) {
      outcome = controller.signal.aborted
        ? null
        : { error: errorMessage(error) || 'Failed to get response' }
    }

    task.state = 'settled'
    task.outcome = outcome
    if (outcome && 'response' in outcome && !outcome.synthetic) {
      const landed = history.exchanges.at(-1)
      if (landed?.question === question && landed.response === outcome.response) {
        task.landed = landed
      }
    } else {
      history.clearPendingReopen(task)
    }
    history.clearInFlight(task)
    resolveSettled(outcome)
  })()

  return task
}

/** Hiding an unfinished panel must not stop its producer. */
export function detachBtwPanel(history: BtwHistory, task: BtwInFlight): void {
  if (task.state === 'running') history.armReopen(task)
}

export function adoptBtwPanel(history: BtwHistory, task: BtwInFlight): void {
  history.clearPendingReopen(task)
}

/** Explicit dismissal cancels only this side-question controller. */
export function cancelBtwQuestion(history: BtwHistory, task: BtwInFlight): void {
  if (task.state === 'running') task.abort()
  history.clearPendingReopen(task)
}

export type BtwReopenState = {
  isExiting: boolean
  hasAttacher: boolean
  hasActiveModal: boolean
  hasActiveLocalJsxUI: boolean
  guardActive: boolean
  isLoading: boolean
}

/**
 * Official mke/REPL reopener: consume an ended session, defer while a modal or
 * local JSX owns input, and don't dispatch into external loading without a
 * live local query guard. A live parent query may still run /btw immediately.
 */
export function registerBtwReopener(
  history: BtwHistory,
  getState: () => BtwReopenState,
  submitBtw: () => Promise<void>,
): () => void {
  history.setReopener(() => {
    const state = getState()
    if (state.isExiting) return true
    if (!state.hasAttacher || state.hasActiveModal || state.hasActiveLocalJsxUI) return false
    if (!state.guardActive && state.isLoading) return false
    try {
      void submitBtw().catch(error => {
        logForDebugging(`[btw] automatic reopen failed: ${String(error)}`, { level: 'error' })
      })
      return true
    } catch (error) {
      logForDebugging(`[btw] automatic reopen failed: ${String(error)}`, { level: 'error' })
      return false
    }
  })
  return () => history.setReopener(null)
}
