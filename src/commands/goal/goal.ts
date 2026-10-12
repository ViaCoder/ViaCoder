import type { LocalCommandCall } from '../../types/command.js'
import { clearGoal, GOAL_MAX_LENGTH, goalStartPrompt, isGoalClearArgument, setGoal } from '../../utils/goal.js'

// Official chunk-d0x49398, call; host state replaces options.activeGoal snapshot.
export const call: LocalCommandCall = async (args, context) => {
  const condition = args.trim()
  if (!condition) {
    const goal = context.getAppState().activeGoal
    if (!goal) return {type: 'text', value: 'No goal set. Usage: `/goal <condition>`'}
    const progress = goal.iterations === 0 ? 'not yet evaluated' : `${goal.iterations} ${goal.iterations === 1 ? 'turn' : 'turns'}`
    return {type: 'text', value: `Goal active: ${goal.condition} (${progress})${goal.lastReason ? `\nLast check: ${goal.lastReason.trim()}` : ''}`}
  }
  if (isGoalClearArgument(condition)) {
    const old = clearGoal(context)
    return {type: 'text', value: old === null ? 'No goal set' : `Goal cleared: ${old}`}
  }
  if (condition.length > GOAL_MAX_LENGTH)
    return {type: 'text', value: `Goal condition is limited to ${GOAL_MAX_LENGTH} characters (got ${condition.length})`}
  const blocked = setGoal(condition, context)
  return blocked !== null ? {type: 'text', value: blocked} :
    {type: 'query', value: `Goal set: ${condition}`, prompt: goalStartPrompt(condition)}
}
