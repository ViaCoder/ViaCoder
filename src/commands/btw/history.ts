import type {BtwRetryState287} from './officialRetry287/native.js'
import { getSessionId } from '../../bootstrap/state.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {
  getTerminalFocusState,
  subscribeTerminalFocus,
} from '../../ink/terminal-focus-state.js'

export type BtwExchange = {
  question: string
  response: string
  fallbackNotice?: string
}

export type BtwOutcome =
  | { response: string; synthetic: boolean }
  | { error: string }
  | null

export type BtwInFlight = {
  question: string
  settled: Promise<BtwOutcome>
  abort(): void
  state: 'running' | 'settled'
  retry?: BtwRetryState287
  onRetry?: (retry: BtwRetryState287) => void
  outcome?: BtwOutcome
  landed?: BtwExchange
}

/** The official 2.1.283 history keeps only the latest twenty exchanges. */
export class BtwHistory {
  exchanges: BtwExchange[] = []
  inFlightQuestions: BtwInFlight[] = []
  private pendingReopen: { owners: Set<object>; cancel: () => void } | null = null
  reopenAway = false
  private reopener: (() => boolean) | null = null

  append(question: string, response: string, fallbackNotice?: string): void {
    this.exchanges = [
      ...this.exchanges,
      { question, response, ...(fallbackNotice && { fallbackNotice }) },
    ].slice(-20)
  }

  replace(exchanges: BtwExchange[]): void {
    this.exchanges = exchanges
  }

  get inFlight(): BtwInFlight | null {
    return this.inFlightQuestions.at(-1) ?? null
  }

  pendingBesidesTop(): BtwInFlight[] {
    return this.inFlightQuestions.slice(0, -1)
  }

  setInFlight(question: BtwInFlight): void {
    if (!this.inFlightQuestions.includes(question)) {
      this.inFlightQuestions = [...this.inFlightQuestions, question]
    }
  }

  clearInFlight(question: BtwInFlight): void {
    if (this.inFlightQuestions.includes(question)) {
      this.inFlightQuestions = this.inFlightQuestions.filter(item => item !== question)
    }
  }

  get reopenPending(): boolean {
    return this.pendingReopen !== null
  }

  armReopen(owner: object): void {
    if (this.pendingReopen) {
      this.pendingReopen.owners.add(owner)
      return
    }
    // Official Ee/E use the host's attacher-capabilities observer. The local
    // terminal-focus signal is the available equivalent; the main UI supplies
    // the actual reopener with setReopener().
    let wasAway = getTerminalFocusState() === 'blurred'
    this.reopenAway = wasAway
    const cancel = subscribeTerminalFocus(() => {
      const focus = getTerminalFocusState()
      if (focus === 'blurred') {
        wasAway = true
        this.reopenAway = true
      } else if (focus === 'focused' && wasAway) {
        wasAway = false
        queueMicrotask(() => this.tryAutoReopen())
      }
    })
    this.pendingReopen = { owners: new Set([owner]), cancel }
  }

  clearPendingReopen(owner?: object): void {
    const pending = this.pendingReopen
    if (!pending) {
      this.reopenAway = false
      return
    }
    if (owner !== undefined) {
      pending.owners.delete(owner)
      if (pending.owners.size > 0) return
    }
    pending.cancel()
    this.pendingReopen = null
    this.reopenAway = false
  }

  setReopener(reopener: (() => boolean) | null): void {
    this.reopener = reopener
    if (reopener && this.reopenAway && getTerminalFocusState() === 'focused') {
      queueMicrotask(() => this.tryAutoReopen())
    }
  }

  get hasReopener(): boolean {
    return this.reopener !== null
  }

  reopenNow(): boolean {
    return this.reopener?.() ?? false
  }

  /** Called after attention returns; a failed host attempt remains pending. */
  tryAutoReopen(): boolean {
    if (!this.pendingReopen || !this.reopenAway) return false
    if (!this.reopenNow()) return false
    this.clearPendingReopen()
    return true
  }
}

// Default production history is the complete original Fe on the execution
// session. Retain the existing foreground-focus UI adaptation on that same
// object; data, in-flight tasks and fork inheritance remain original-owned.
const adaptedHistories = new WeakSet<object>()
const histories = new Map<string, BtwHistory>()

export function getBtwHistoryForSession287(session:ExecutionSession287 = getExecutionSession287()):BtwHistory {
  const history = session.btwHistory as BtwHistory
  if (!adaptedHistories.has(history)) {
    for (const method of ['armReopen', 'setReopener', 'tryAutoReopen'] as const) {
      Object.defineProperty(history, method, {value: BtwHistory.prototype[method], configurable: true})
    }
    adaptedHistories.add(history)
  }
  return history
}

export function getBtwHistory(sessionId: string = getSessionId()): BtwHistory {
  const session = getExecutionSession287()
  if (sessionId === session.id) return getBtwHistoryForSession287(session)
  // Explicit non-current IDs are used by detached legacy UI callers; they do
  // not replace the canonical current-session owner or its fork data.
  let history = histories.get(sessionId)
  if (!history) {
    history = new BtwHistory()
    histories.set(sessionId, history)
  }
  return history
}
