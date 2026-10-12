import type { ToolUseContext } from '../../Tool.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { isAgentStopPending } from '../../tasks/LocalAgentTask/LocalAgentTask.js'
import {getSubagentStatsOwner287} from './subagentStats287.js'

// Official 2.1.283 chunk-3qcnxvnw:ho checks wd(agentContext) >= fE() before
// dispatch. The local subagent context uses zero-based queryTracking.depth, so
// an already-running first-level agent has spawn depth one.
export function assertAgentSpawnAllowed(context: ToolUseContext): void {
  // Official fE reads the typed env field (D.int({ min: 1,
  // digitsOnly: true })). Invalid/empty values become undefined and fall
  // through to the experiment; parseInt-style prefixes and fractions do not.
  const raw = process.env.CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH
  const configured = raw !== undefined && /^[+-]?\d+$/.test(raw.trim())
    ? Number(raw.trim())
    : undefined
  const experiment = getFeatureValue_CACHED_MAY_BE_STALE('tengu_hazel_trellis', 3)
  const maxDepth = configured !== undefined && Number.isInteger(configured) && configured >= 1
    ? configured
    : Number.isInteger(experiment) && experiment >= 1 ? experiment : 3
  const depth = context.agentId === undefined
    ? 0
    : Math.max(1, (context.queryTracking?.depth ?? 0) + 1)
  if (depth >= maxDepth) {
    getSubagentStatsOwner287().recordRefused('depth_limit')
    throw new Error(`Subagent nesting limit reached (depth ${depth} of ${maxDepth}). Complete this task directly using your tools instead of spawning another agent.`)
  }
  if (context.agentId !== undefined && isAgentStopPending(context.agentId)) {
    throw new Error('This agent has been stopped and its stop is still completing; it cannot launch new agents.')
  }
}
