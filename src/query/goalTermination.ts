import type {Terminal} from './transitions.js'
import type {ToolUseContext} from '../Tool.js'
import {clearGoal, goalSentinel} from '../utils/goal.js'
import {classifyGoalInterruption, fatalCauses} from '../utils/goalRecovery.js'
import {getFeatureValue_CACHED_MAY_BE_STALE as flag} from '../services/analytics/growthbook.js'
import {createSystemMessage} from '../utils/messages.js'
import {hostOwnsAuth} from '../utils/auth.js'
import {truncate} from '../utils/truncate.js'

// Official Di/Ui consumes terminal metadata, never refusal prose or user text.
export function* handleGoalTermination(terminal: Terminal, context: ToolUseContext, source: string) {
  if (context.agentId || !(source === 'sdk' || source.startsWith('repl_main_thread'))) return
  const goal = context.getAppState().activeGoal
  if (!goal || context.abortController.signal.aborted) {context.goalRecovery?.reset(); return}
  const hostManagesAuth = context.goalHostOwnsAuth ?? hostOwnsAuth()
  const decision = classifyGoalInterruption(terminal, hostManagesAuth)
  if (decision?.kind === 'stop') {
    context.goalRecovery?.reset()
    if (!flag('tengu_quartz_pipit', true)) return
    // Yield exactly one terminal sentinel. The caller owns transcript writes.
    clearGoal({getAppState: context.getAppState, setAppState: context.setAppState})
    yield {type: 'active_goal' as const, value: undefined}
    yield goalSentinel(true, goal.condition)
    yield createSystemMessage(`Goal cleared after an unrecoverable error (${fatalCauses[decision.cause].label}): "${truncate(goal.condition, 80, true)}". Run /goal again to continue.`, 'warning')
    return
  }
  if (context.options.isNonInteractiveSession) {context.goalRecovery?.reset(); return}
  const notice = context.goalRecovery?.handle(terminal, hostManagesAuth, context.usageLimitWait?.hasIntent())
  if (notice) yield createSystemMessage(notice.text, notice.level)
}
