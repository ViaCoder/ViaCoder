/** Public 2.1.283 Wue → ve/bJr/St/Fr name resolution over the live AppState. */
import type {AppState} from '../../state/AppState.js'
import {isTerminalTaskStatus} from '../../Task.js'
import {isInProcessTeammateTask, type InProcessTeammateTaskState} from '../../tasks/InProcessTeammateTask/types.js'

type Task = AppState['tasks'][string]
type Found = {status: 'found'; id: string; task: Task}
type Ambiguous = {status: 'ambiguous'; message: string; anyLiveCandidate: boolean}
type Missing = {status: 'not_found'}
export type SdkStopTaskResolution = Found | Ambiguous | Missing

// Official chunk-447dcab3.js:Tr; no alias search is attempted for an ID hit.
export function normalizeStopTaskName(value: string): string {
  return value.normalize('NFKC').replace(/[\p{Cc}\p{Cf}]/gu, char => /\s/.test(char) ? char : '')
    .trim().toLowerCase().replace(/\s+/g, '-')
}

function display(value: string): string {
  // Official H$ first removes unpaired surrogates (j6), then control/format
  // characters. re() truncates without leaving a high-surrogate half.
  const wellFormed = value.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '')
  const clean = wellFormed.replace(/[\p{Cc}\p{Cf}]/gu, char => /\s/.test(char) ? char : '')
    .replace(/\s+/g, ' ').trim()
  if (clean.length <= 160) return clean
  const prefix = clean.slice(0, 160)
  return `${/[\uD800-\uDBFF]$/.test(prefix) ? prefix.slice(0, -1) : prefix}…`
}

function loopStillLive(task: Task): boolean {
  return task.type === 'local_agent' && task.status === 'completed' &&
    'keepaliveReasons' in task && task.keepaliveReasons instanceof Set && task.keepaliveReasons.size > 0
}

function isLive(task: Task): boolean {return !isTerminalTaskStatus(task.status) || loopStillLive(task)}

function selectByAgentId(tasks: InProcessTeammateTaskState[], id: string): InProcessTeammateTaskState | undefined {
  let fallback: InProcessTeammateTaskState | undefined
  for (const task of tasks) if (task.identity.agentId === id) {
    if (task.status === 'running') return task
    fallback ??= task
  }
  return fallback
}

function selectByName(tasks: InProcessTeammateTaskState[], predicate: (name: string) => boolean): InProcessTeammateTaskState[] {
  const byAgent = new Map<string, InProcessTeammateTaskState>()
  for (const task of tasks) {
    if (!predicate(task.identity.agentName)) continue
    const old = byAgent.get(task.identity.agentId)
    if (!old || old.status !== 'running' && task.status === 'running') byAgent.set(task.identity.agentId, task)
  }
  const selected = [...byAgent.values()], running = selected.filter(task => task.status === 'running')
  return running.length ? running : selected
}

function namedAgent(state: AppState, predicate: (name: string) => boolean): Task | undefined {
  for (const [name, id] of state.agentNameRegistry) {
    if (!predicate(name)) continue
    const task = state.tasks[id]
    if (task?.type === 'local_agent') return task
  }
  return undefined
}

function teammateAmbiguity(input: string, tasks: InProcessTeammateTaskState[]): Ambiguous {
  return {status: 'ambiguous', message: `Multiple teammates match "${display(input)}": ${tasks.map(task => display(task.identity.agentId)).join(', ')}. Use the full agent ID (name@team).`,
    anyLiveCandidate: tasks.some(isLive)}
}

function crossKindAmbiguity(input: string, tasks: InProcessTeammateTaskState[], agent: Task): Ambiguous {
  return {status: 'ambiguous', message: `"${display(input)}" matches both teammate ${tasks.map(task => display(task.identity.agentId)).join(', ')} and background agent ${display(agent.id)}. Use the full agent ID (name@team) for the teammate or the task ID for the background agent.`,
    anyLiveCandidate: tasks.some(isLive) || isLive(agent)}
}

/** Official precedence: exact task ID, exact teammate ID/name + named agent,
 * then NFKC/case/whitespace-normalized teammate/name. All records are live
 * AppState tasks/agentNameRegistry entries; no private registry is fabricated.
 */
export function resolveSdkStopTask(input: string, state: AppState): SdkStopTaskResolution {
  const direct = state.tasks[input]
  if (direct) return {status: 'found', id: input, task: direct}
  const teammates = Object.values(state.tasks).filter(isInProcessTeammateTask)
  const byId = selectByAgentId(teammates, input)
  const exactTeammates = byId ? [byId] : selectByName(teammates, name => name === input)
  const exactAgent = namedAgent(state, name => name === input)
  if (exactTeammates.length && exactAgent) return crossKindAmbiguity(input, exactTeammates, exactAgent)
  if (exactTeammates.length > 1) return teammateAmbiguity(input, exactTeammates)
  if (exactTeammates.length === 1) return {status: 'found', id: exactTeammates[0]!.id, task: exactTeammates[0]!}
  if (exactAgent) return {status: 'found', id: exactAgent.id, task: exactAgent}

  const normalized = normalizeStopTaskName(input)
  const normalizedTeammates = selectByName(teammates, name => normalizeStopTaskName(name) === normalized)
  const normalizedAgent = namedAgent(state, name => normalizeStopTaskName(name) === normalized)
  if (normalizedTeammates.length && normalizedAgent) return crossKindAmbiguity(input, normalizedTeammates, normalizedAgent)
  if (normalizedTeammates.length > 1) return teammateAmbiguity(input, normalizedTeammates)
  if (normalizedTeammates.length === 1) return {status: 'found', id: normalizedTeammates[0]!.id, task: normalizedTeammates[0]!}
  if (normalizedAgent) return {status: 'found', id: normalizedAgent.id, task: normalizedAgent}
  return {status: 'not_found'}
}
