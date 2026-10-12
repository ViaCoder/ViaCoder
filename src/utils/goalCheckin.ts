// Official 2.1.283 chunk-td7fxg34: yi/bi/Ti/hi/Hn/qo/Ou/Yzt.
// The timer owner below adapts sessionScratch to this host's REPL lifetime.
import {getFeatureValue_CACHED_MAY_BE_STALE as flag} from '../services/analytics/growthbook.js'
import {setTimeout, clearTimeout} from 'node:timers'
import {goalCheckinDelay, goalCheckinText, idleCheckinsPaused, goalDeferralWindow, sameGoal} from '../vendor/official-goal-checkin/checkin.js'
export {goalCheckinDelay, goalCheckinText, idleCheckinsPaused, goalDeferralWindow, sameGoal}
import type {ActiveGoal} from './goal.js'

export type DeferringTask = {
  id: string; type: string; startTime: number; description: string; command?: string; kind?: string
}
export function goalCheckinInterval(): number {
  if (!flag('tengu_saffron_wren', true)) return 0
  const minutes = process.env.CLAUDE_CODE_GOAL_CHECKIN_MINUTES
  const parsed = minutes === undefined || minutes.trim() === '' ? 30 : Number(minutes)
  return (Number.isFinite(parsed) && parsed >= 0 ? parsed : 30) * 60_000
}
export function planGoalDeferral(goal: ActiveGoal, tasks: DeferringTask[], now: number, interval = goalCheckinInterval()) {
  if (interval === 0) return {nextGoal: goal, checkinText: undefined}
  const window = goalDeferralWindow(goal, tasks, now, interval)
  const elapsed = now - window.deferredSince
  if (elapsed < goalCheckinDelay(interval, window.checkinCount))
    return {nextGoal: {...goal, deferredSince: window.deferredSince, checkinCount: window.checkinCount, lastDeferralPassAt: now}, checkinText: undefined}
  return {nextGoal: {...goal, deferredSince: now, checkinCount: window.checkinCount + 1, lastDeferralPassAt: now},
    checkinText: goalCheckinText(goal.condition, elapsed, tasks).body}
}

type Timer = ReturnType<typeof setTimeout>
type CheckinHost = {
  getGoal(): ActiveGoal | undefined
  setGoal(expected: ActiveGoal, next: ActiveGoal): void
  getTasks(): DeferringTask[]
  isBusy(): boolean
  hasQueuedCheckin(): boolean
  hasQueuedTaskNotification(): boolean
  deliver(message: {summary: string; body: string}): void
  now?: () => number
  interval?: () => number
  setTimer?: (callback: () => void, delay: number) => Timer
  clearTimer?: (timer: Timer) => void
}
export class GoalCheckinTimer {
  private pending?: Timer
  private disposed = false
  private now: () => number
  private interval: () => number
  constructor(private host: CheckinHost) {
    this.now = host.now ?? Date.now
    this.interval = host.interval ?? goalCheckinInterval
  }
  cancel(): void {
    if (this.pending !== undefined) (this.host.clearTimer ?? clearTimeout)(this.pending)
    this.pending = undefined
  }
  dispose(): void {this.disposed = true; this.cancel()}
  arm(goal: ActiveGoal): void {
    this.cancel()
    const interval = this.interval()
    if (this.disposed || interval === 0 || goal.deferredSince === undefined) return
    const elapsed = idleCheckinsPaused(goal) ? 0 : this.now() - goal.deferredSince
    this.schedule(goal, Math.min(2_147_483_647, Math.max(60_000, goalCheckinDelay(interval, goal.checkinCount ?? 0) - elapsed)))
  }
  private schedule(goal: ActiveGoal, delay: number): void {
    const callback = () => this.fire(goal)
    this.pending = this.host.setTimer ? this.host.setTimer(callback, delay) : setTimeout(callback, delay)
    this.pending.unref?.()
  }
  private fire(expected: ActiveGoal): void {
    this.pending = undefined
    if (this.disposed) return
    const goal = this.host.getGoal(), interval = this.interval()
    if (!goal || !sameGoal(goal, expected) || goal.deferredSince === undefined || interval === 0) return
    if (idleCheckinsPaused(goal)) {this.arm(goal); return}
    if (this.host.isBusy() || this.host.hasQueuedCheckin()) {this.schedule(goal, 60_000); return}
    const tasks = this.host.getTasks()
    if (!tasks.length && this.host.hasQueuedTaskNotification()) {this.schedule(goal, 60_000); return}
    const now = this.now(), window = goalDeferralWindow(goal, tasks, now, interval)
    if (window.isNewRun) {
      const next = {...goal, deferredSince: now, checkinCount: 0, lastDeferralPassAt: now}
      this.host.setGoal(goal, next); this.arm(next); return
    }
    const next = {...goal, deferredSince: now, checkinCount: window.checkinCount + 1,
      lastDeferralPassAt: now, idleCheckinCount: (goal.idleCheckinCount ?? 0) + 1}
    this.host.setGoal(goal, next)
    const text = goalCheckinText(goal.condition, now - window.deferredSince, tasks)
    if (idleCheckinsPaused(next)) {
      text.summary += ' · idle check-ins paused until your next message'
      text.body += " Claude Code won't wake this session for another check-in until the user sends a message, so say clearly where things stand."
    }
    this.host.deliver(text)
    this.arm(next)
  }
}
