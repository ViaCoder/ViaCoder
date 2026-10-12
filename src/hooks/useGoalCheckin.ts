import {usageLimitIntent, officialUsageLimitWait} from '../services/usageLimitWait.js'
import {useEffect, useRef} from 'react'
import {GoalRecoveryController} from '../utils/goalRecovery.js'
import type {AppStateStore} from '../state/AppStateStore.js'
import type {QueryGuard} from '../utils/QueryGuard.js'
import {getSessionId, onSessionSwitch} from '../bootstrap/state.js'
import {goalDeferringTasks} from '../utils/goal.js'
import {GoalCheckinTimer, type DeferringTask} from '../utils/goalCheckin.js'
import {enqueuePendingNotification, getCommandQueue, removeByFilter, subscribeToCommandQueue} from '../utils/messageQueueManager.js'
import {escapeXml} from '../utils/xml.js'
import {wrapInSystemReminder} from '../utils/messages.js'

// REPL lifetime owns timers; restored/cleared goals cannot leak a wake-up into
// another session. SDK/noninteractive callers never install this hook.
export function useGoalCheckin(store: AppStateStore, guard: QueryGuard, remote: boolean) {
  const recoveryRef = useRef<GoalRecoveryController | null>(null)
  useEffect(() => {
    if (remote) return
    let goal = store.getState().activeGoal, sessionId = getSessionId()
    let outgoingGoal: typeof goal
    // sessionScratch in the official host belongs to a session, not the REPL.
    // A switch signal precedes restoration of AppState: never lend the old
    // goal to either timer (including quota notifications emitted mid-switch).
    const getOwnedGoal = () => {
      const current = store.getState().activeGoal
      return getSessionId() === sessionId && current !== outgoingGoal ? current : undefined
    }
    const isCheckin = (command: ReturnType<typeof getCommandQueue>[number]) =>
      command.origin?.kind === 'task-notification' && command.origin.source === 'goal-checkin'
    const deliver = (text: {summary: string; body: string}) => enqueuePendingNotification({
      mode: 'task-notification', origin: {kind: 'task-notification', source: 'goal-checkin'},
      value: `<task-notification>\n<summary>${escapeXml(text.summary)}</summary>\n</task-notification>\n${wrapInSystemReminder(text.body)}`,
    })
    const recovery = new GoalRecoveryController({
      getGoal: getOwnedGoal,
      hasUsageLimitIntent: usageLimitIntent.hasIntent,
      isBusy: () => guard.isActive,
      hasQueuedCheckin: () => getCommandQueue().some(isCheckin),
      deliver,
    })
    recoveryRef.current = recovery
    const timer = new GoalCheckinTimer({
      getGoal: getOwnedGoal,
      setGoal: (expected, next) => store.setState(state => state.activeGoal !== expected ? state : {...state, activeGoal: next}),
      getTasks: () => goalDeferringTasks(store.getState().tasks) as DeferringTask[],
      isBusy: () => guard.isActive,
      hasQueuedCheckin: () => getCommandQueue().some(isCheckin),
      hasQueuedTaskNotification: () => getCommandQueue().some(command => command.mode === 'task-notification' && command.agentId === undefined),
      deliver,
    })
    const syncSession = () => {
      const currentSession = getSessionId()
      if (currentSession === sessionId) return
      sessionId = currentSession
      outgoingGoal = store.getState().activeGoal
      goal = undefined
      timer.cancel(); recovery.reset(); removeByFilter(isCheckin)
    }
    const sync = () => {
      syncSession()
      const current = getOwnedGoal()
      if (current === goal) return
      if (!current || current.setAt !== goal?.setAt || current.condition !== goal?.condition)
        {removeByFilter(isCheckin); recovery.reset()}
      goal = current
      if (goal && !usageLimitIntent.hasIntent()) {recovery.reconcile(goal); timer.arm(goal)}
      else timer.cancel()
    }
    if (goal && !usageLimitIntent.hasIntent()) timer.arm(goal)
    let quotaOwned = usageLimitIntent.hasIntent()
    const quotaSync = () => {
      syncSession()
      const previouslyOwned = quotaOwned
      quotaOwned = usageLimitIntent.hasIntent()
      if (quotaOwned) {timer.cancel(); recovery.cancel(); removeByFilter(isCheckin)}
      else if (previouslyOwned && goal) timer.arm(goal)
    }
    const offQuota = officialUsageLimitWait.Bdr(quotaSync)
    const offQueue = subscribeToCommandQueue(quotaSync)
    const offSession = onSessionSwitch(syncSession)
    const unsubscribe = store.subscribe(sync)
    return () => {offSession(); offQueue(); offQuota(); unsubscribe(); timer.dispose(); recovery.dispose(); recoveryRef.current = null; removeByFilter(isCheckin)}
  }, [store, guard, remote])
  return recoveryRef
}

export function resetGoalIdleCheckins(store: AppStateStore, recovery?: GoalRecoveryController): void {
  recovery?.reset()
  store.setState(state => {
    if (state.activeGoal?.idleCheckinCount === undefined) return state
    const {idleCheckinCount, ...goal} = state.activeGoal
    return {...state, activeGoal: goal}
  })
}
