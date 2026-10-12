// Pure (non-React) kill helpers for LocalShellTask.
// Extracted so runAgent.ts can kill agent-scoped bash tasks without pulling
// React/Ink into its module graph (same rationale as guards.ts).

import type { AppState } from '../../state/AppState.js'
import type { AgentId } from '../../types/ids.js'
import {killTaskWithGetTask287,killShellTasksForAgentWithGetTask287} from '../../tools/GetTaskTool/killBridge287.js'

type SetAppStateFn = (updater: (prev: AppState) => AppState) => void

export function killTask(taskId: string, setAppState: SetAppStateFn): void {
  killTaskWithGetTask287(taskId,setAppState)
}

/**
 * Kill all running bash tasks spawned by a given agent.
 * Called from runAgent.ts finally block so background processes don't outlive
 * the agent that started them (prevents 10-day fake-logs.sh zombies).
 */
export function killShellTasksForAgent(
  agentId: AgentId,
  getAppState: () => AppState,
  setAppState: SetAppStateFn,
): void {
  killShellTasksForAgentWithGetTask287(agentId,getAppState,setAppState)
}
