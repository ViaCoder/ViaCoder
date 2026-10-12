// Host adaptation of official chunk-td7fxg34.js:Di/Ci/Lu/Go/Yzt.
import {setTimeout, clearTimeout} from 'node:timers'
import {classifyGoalInterruption, fatalCauses, pauseNotices, retryCauses, retryDelays, retryJitter} from '../vendor/official-goal-recovery/recovery.js'
import {getFeatureValue_CACHED_MAY_BE_STALE as flag} from '../services/analytics/growthbook.js'
import type {Terminal} from '../query/transitions.js'
import type {ActiveGoal} from './goal.js'
import {goalCheckinInterval, sameGoal} from './goalCheckin.js'
import {Ry} from '../vendor/official-goal-checkin/chunk-v4wcnq1g.js'
import {UL, Gt} from '../vendor/official-goal-checkin/chunk-v297v4sm.js'
export {classifyGoalInterruption, fatalCauses}

type Notice = {text: string; level: 'info' | 'warning'}
type Timer = ReturnType<typeof setTimeout>
type RecoveryHost = {
  getGoal(): ActiveGoal | undefined
  hasUsageLimitIntent?: () => boolean
  isBusy(): boolean
  hasQueuedCheckin(): boolean
  deliver(text: {summary: string; body: string}): void
  enabled?: () => boolean
  random?: () => number
  setTimer?: (callback: () => void, delay: number) => Timer
  clearTimer?: (timer: Timer) => void
}
export const goalRecoveryEnabled = (): boolean => flag('tengu_pewter_avocet', true) && goalCheckinInterval() !== 0

export class GoalRecoveryController {
  private pending?: Timer
  private streak?: {goalSetAt: number; retries: number; announced?: string}
  private disposed = false
  constructor(private host: RecoveryHost) {}
  cancel(): void {
    if (this.pending !== undefined) (this.host.clearTimer ?? clearTimeout)(this.pending)
    this.pending = undefined
  }
  reset(): void {this.cancel(); this.streak = undefined}
  dispose(): void {this.disposed = true; this.reset()}
  reconcile(goal: ActiveGoal): void {
    if (this.streak && this.streak.goalSetAt !== goal.setAt) this.reset()
  }
  handle(terminal: Terminal, hostOwnsAuth = false, usageLimitIntent = this.host.hasUsageLimitIntent?.()): Notice | undefined {
    const goal = this.host.getGoal()
    if (this.disposed || !goal) {this.reset(); return}
    const decision = classifyGoalInterruption(terminal, hostOwnsAuth)
    if (!decision || decision.kind === 'none') {
      if (terminal.reason !== 'completed' || terminal.goalPass !== undefined) this.reset()
      return
    }
    if (decision.kind === 'stop' || !(this.host.enabled ?? goalRecoveryEnabled)()) {this.reset(); return}
    const matches = this.streak?.goalSetAt === goal.setAt
    const retries = matches ? this.streak!.retries : 0
    const announced = matches ? this.streak!.announced : undefined
    if (decision.kind === 'retry') {
      if (usageLimitIntent) {this.cancel(); return}
      if (matches && (this.pending !== undefined || this.host.hasQueuedCheckin())) return
      const cause = retryCauses[decision.cause]
      if (retries >= retryDelays.length) {
        if (announced === 'gave_up') return
        this.streak = {goalSetAt:goal.setAt, retries, announced:'gave_up'}
        return {text:`Goal paused after ${retryDelays.length} automatic retries · ${cause} · send a message to continue`, level:'warning'}
      }
      this.streak = {goalSetAt:goal.setAt, retries:retries+1}
      const delay = retryDelays[retries]
      this.cancel()
      this.schedule(goal, cause, Math.round(delay * (1 + (this.host.random ?? Math.random)() * retryJitter)))
      return {text:`Goal still active · ${cause} · retrying in ${Math.round(delay / 60000)} min (${retries+1}/${retryDelays.length}) · send a message to retry now`, level:'info'}
    }
    this.cancel()
    const cause = decision.cause === 'usage_limit' && usageLimitIntent ? 'usage_limit_waiting' : decision.cause
    if (announced === cause) return
    this.streak = {goalSetAt:goal.setAt, retries, announced:cause}
    return {text:pauseNotices[cause], level:'info'}
  }
  private schedule(goal: ActiveGoal, cause: string, delay: number): void {
    const fire = () => {
      this.pending = undefined
      if (this.host.hasUsageLimitIntent?.()) return
      if (this.disposed || !sameGoal(this.host.getGoal(), goal) || !(this.host.enabled ?? goalRecoveryEnabled)()) return
      if (this.host.isBusy() || this.host.hasQueuedCheckin()) {this.schedule(goal, cause, 60_000); return}
      this.host.deliver({summary:'Goal check-in: continuing after the last turn ended early',
        body:`Goal check-in: «${Gt(UL(Ry(goal.condition)))}» is still active. The last turn ended before the goal could be evaluated: ${cause}. Continue toward the goal.`})
    }
    this.pending = this.host.setTimer ? this.host.setTimer(fire, delay) : setTimeout(fire, delay)
    this.pending.unref?.()
  }
}
