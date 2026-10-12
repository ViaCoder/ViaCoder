import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { randomUUID } from 'node:crypto'
import { asAgentId } from '../../types/ids.js'
import { getAgentTranscriptPath } from '../../utils/sessionStorage.js'

type UserStopState = { count: number; stopped: boolean }
const states = new Map<string, UserStopState>()

function pathFor(agentId: string): string {
  return `${getAgentTranscriptPath(asAgentId(agentId))}.stop-state.json`
}

export function getAgentUserStopState(agentId: string): UserStopState {
  const path = pathFor(agentId)
  const cached = states.get(path)
  if (cached) return cached
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf8')) as Partial<UserStopState>
    const state = {
      count: Number.isSafeInteger(parsed.count) && (parsed.count ?? 0) >= 0 ? parsed.count! : 0,
      stopped: parsed.stopped === true,
    }
    states.set(path, state)
    return state
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    return { count: 0, stopped: false }
  }
}

function save(agentId: string, state: UserStopState): void {
  const path = pathFor(agentId)
  states.set(path, state)
  mkdirSync(dirname(path), { recursive: true })
  const temporary = `${path}.${randomUUID()}.tmp`
  writeFileSync(temporary, JSON.stringify(state))
  renameSync(temporary, path)
}

export function markAgentUserStopped(agentId: string): UserStopState {
  const previous = getAgentUserStopState(agentId)
  const next = { count: previous.count + 1, stopped: true }
  save(agentId, next)
  return next
}

export function clearAgentUserStopped(agentId: string, expectedCount: number): boolean {
  const current = getAgentUserStopState(agentId)
  if (current.count !== expectedCount) return false
  if (current.stopped) save(agentId, { ...current, stopped: false })
  return true
}
