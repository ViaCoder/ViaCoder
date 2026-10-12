// Restored from official 2.1.283 chunk-7cv26nx2 (EKe/vKe/CMt),
// chunk-hcwfz079 (eJn), and chunk-td7fxg34 (Stop-hook result transitions).
// The existing AppState-backed session hook registry is the host adapter.
import { randomUUID } from 'crypto'
import { getIsNonInteractiveSession, getSessionId, getTotalOutputTokens } from '../bootstrap/state.js'
import type { AppState } from '../state/AppStateStore.js'
import type { AttachmentMessage, Message } from '../types/message.js'
import type { AggregatedHookResult } from './hooks.js'
import { checkHasTrustDialogAccepted } from './config.js'
import { shouldAllowManagedHooksOnly, shouldDisableAllHooksIncludingManaged } from './hooks/hooksConfigSnapshot.js'
import { addSessionHook, getSessionHooks, removeSessionHook } from './hooks/sessionHooks.js'
import {planGoalDeferral, sameGoal, type DeferringTask} from './goalCheckin.js'

export type ActiveGoal = {
  condition: string
  iterations: number
  setAt: number
  origin?: 'user' | 'restored' | string
  tokensAtStart: number
  lastReason?: string
  deferredSince?: number
  checkinCount?: number
  lastDeferralPassAt?: number
  idleCheckinCount?: number
}
type GoalContext = {
  getAppState(): AppState
  setAppState(update: (state: AppState) => AppState): void
  setMessages?(update: (messages: Message[]) => Message[]): void
  agentId?: string
}

export const GOAL_MAX_LENGTH = 4000
export const isGoalClearArgument = (value: string): boolean =>
  new Set(['clear', 'stop', 'off', 'reset', 'none', 'cancel']).has(value.toLowerCase())

export const goalStartPrompt = (condition: string): string =>
  `A session-scoped Stop hook is now active with condition: "${condition}". Briefly acknowledge the goal, then immediately start (or continue) working toward it — treat the condition itself as your directive and do not pause to ask the user what to do. The hook will block stopping until the condition holds. It auto-clears once the condition is met — do not tell the user to run \`/goal clear\` after success; that's only for clearing a goal early.`

export function goalGate(): string | null {
  if (shouldDisableAllHooksIncludingManaged() || shouldAllowManagedHooksOnly())
    return "/goal can't run while hooks are restricted (disableAllHooks or allowManagedHooksOnly is set in settings or by policy)."
  if (!getIsNonInteractiveSession() && !checkHasTrustDialogAccepted())
    return '/goal is only available in trusted workspaces. Restart, accept the trust dialog, and try again.'
  return null
}

export function getGoalPromptHooks(context: GoalContext, sessionId = getSessionId()) {
  return (getSessionHooks(context.getAppState(), sessionId, 'Stop').get('Stop') ?? [])
    .filter(m => m.matcher === '' && m.skillRoot === undefined)
    .flatMap(m => m.hooks).filter(h => h.type === 'prompt')
}

type GoalStatusMessage = AttachmentMessage<Extract<AttachmentMessage['attachment'], {type: 'goal_status'}>>

export function goalSentinel(met: boolean, condition: string): GoalStatusMessage {
  return {type: 'attachment', uuid: randomUUID(), timestamp: new Date().toISOString(),
    attachment: {type: 'goal_status', met, sentinel: true, condition}}
}

export function findActiveGoal(messages: readonly Message[] | undefined): string | null {
  for (let i = (messages?.length ?? 0) - 1; i >= 0; i--) {
    const m = messages![i]
    if (m?.type !== 'attachment' || m.attachment.type !== 'goal_status') continue
    if (m.attachment.met || m.attachment.failed) return null
    const condition = m.attachment.condition
    return typeof condition === 'string' && condition.length > 0 ? condition : null
  }
  return null
}

export function setGoal(condition: string, context: GoalContext): string | null {
  const blocked = goalGate()
  if (blocked !== null) return blocked
  for (const hook of getGoalPromptHooks(context))
    removeSessionHook(context.setAppState, getSessionId(), 'Stop', hook)
  addSessionHook(context.setAppState, getSessionId(), 'Stop', '', {type: 'prompt', prompt: condition})
  context.setAppState(state => ({...state, activeGoal: {
    condition, iterations: 0, setAt: Date.now(), origin: 'user', tokensAtStart: getTotalOutputTokens(),
  }}))
  context.setMessages?.(messages => [...messages, goalSentinel(false, condition)])
  return null
}

export function clearGoal(context: GoalContext): string | null {
  const hooks = getGoalPromptHooks(context)
  const condition = context.getAppState().activeGoal?.condition ?? hooks[0]?.prompt
  if (condition === undefined) return null
  for (const hook of hooks) removeSessionHook(context.setAppState, getSessionId(), 'Stop', hook)
  context.setAppState(state => ({...state, activeGoal: undefined}))
  context.setMessages?.(messages => [...messages, goalSentinel(true, condition)])
  return condition
}

// Official chunk-td7fxg34 xi, using the task predicates from chunk-7vq7s2rp.
// Foreground/observer/main-session tasks are not invented or spawned here.
export function goalDeferringTasks(tasks: AppState['tasks']) {
  const agentTypes = new Set(['local_agent', 'remote_agent', 'in_process_teammate', 'local_workflow'])
  const ended = new Set(['completed', 'failed', 'killed'])
  return Object.values(tasks).filter(task => {
    if (ended.has(task.status)) return false
    if (task.type === 'local_agent' && task.agentType === 'main-session') return false
    if (task.type === 'in_process_teammate' && task.isIdle) return false
    if (task.type === 'remote_agent' && task.isLongRunning) return false
    return task.type === 'local_bash' || agentTypes.has(task.type)
  })
}

/** Remove only the Goal evaluator for this pass; ordinary Stop hooks still
 * execute. Finally restores it unless /clear, /resume or /goal replaced it. */
export function deferGoalWhileTasksRun(context: GoalContext): (() => void) & {checkinText?: string; deferred?: true} {
  const state = context.getAppState(), goal = state.activeGoal, sessionId = getSessionId()
  if (context.agentId || !goal) return () => {}
  const tasks = goalDeferringTasks(state.tasks)
  if (tasks.length === 0) {
    if (goal.deferredSince !== undefined) context.setAppState(current => {
      if (current.activeGoal !== goal) return current
      const {deferredSince, checkinCount, lastDeferralPassAt, ...next} = goal
      return {...current, activeGoal: next}
    })
    return () => {}
  }
  const hook = getGoalPromptHooks(context).find(h => h.prompt === goal.condition)
  if (!hook) return () => {}
  const plan = planGoalDeferral(goal, tasks as DeferringTask[], Date.now())
  context.setAppState(current => current.activeGoal !== goal ? current : {...current, activeGoal: plan.nextGoal})
  removeSessionHook(context.setAppState, sessionId, 'Stop', hook)
  const restore = () => {
    if (getSessionId() === sessionId && sameGoal(context.getAppState().activeGoal, goal) &&
        !getGoalPromptHooks(context).some(h => h.prompt === goal.condition))
      addSessionHook(context.setAppState, sessionId, 'Stop', '', hook)
  }
  return Object.assign(restore, {checkinText: plan.checkinText, deferred: true as const})
}

/** Resume reconstructs the ephemeral hook from the transcript, never settings. */
export function restoreGoal(messages: Message[] | undefined, context: GoalContext, sessionId = getSessionId()): void {
  for (const hook of getGoalPromptHooks(context, sessionId))
    removeSessionHook(context.setAppState, sessionId, 'Stop', hook)
  const condition = findActiveGoal(messages)
  if (condition === null || goalGate() !== null) {
    context.setAppState(state => state.activeGoal === undefined ? state : {...state, activeGoal: undefined})
    return
  }
  addSessionHook(context.setAppState, sessionId, 'Stop', '', {type: 'prompt', prompt: condition})
  context.setAppState(state => ({...state, activeGoal: {
    condition, iterations: 0, setAt: Date.now(), origin: 'restored', tokensAtStart: getTotalOutputTokens(),
  }}))
}

export function restoreGoalState(messages: Message[] | undefined, state: AppState, sessionId = getSessionId()): AppState {
  let next = {...state, sessionHooks: new Map(state.sessionHooks)}
  restoreGoal(messages, {getAppState: () => next, setAppState: update => { next = update(next) }}, sessionId)
  return next
}

export function goalSnapshotForCompact(context: GoalContext, retained: Message[], original: Message[]): GoalStatusMessage | null {
  if (context.agentId) return null
  const goal = context.getAppState().activeGoal
  if (goal) return goalSentinel(false, goal.condition)
  const previous = findActiveGoal(original)
  return previous === null || findActiveGoal(retained) === previous ? null : goalSentinel(true, previous)
}

/** Match the live hook as well as the goal: a late evaluator result must not
 * clear a goal replaced/removed while the evaluator was running. */
export function applyGoalHookResult(context: GoalContext, result: AggregatedHookResult): GoalStatusMessage | undefined {
  if (context.agentId || result.timedOut || result.hook?.type !== 'prompt') return
  const prompt = result.hook.prompt
  const goal = context.getAppState().activeGoal
  if (!goal || goal.condition !== prompt ||
      !getGoalPromptHooks(context).some(h => h.prompt === prompt)) return
  const attachment = result.message?.type === 'attachment' ? result.message.attachment : undefined
  const success = attachment?.type === 'hook_success' && attachment.hookEvent === 'Stop'
  if (!success && !result.blockingError) return
  const iterations = goal.iterations + 1
  if (success) {
    removeSessionHook(context.setAppState, getSessionId(), 'Stop', result.hook)
    context.setAppState(state => ({...state, activeGoal: undefined}))
  } else {
    context.setAppState(state => ({...state, activeGoal: {...goal, iterations, lastReason: result.stopReason}}))
  }
  return {type: 'attachment', uuid: randomUUID(), timestamp: new Date().toISOString(), attachment: {
    type: 'goal_status', met: success && !result.impossible, condition: goal.condition, reason: result.stopReason,
    ...(success && {iterations, durationMs: Date.now() - goal.setAt, tokens: getTotalOutputTokens() - goal.tokensAtStart}),
    ...(result.impossible && {failed: true}),
  }}
}
