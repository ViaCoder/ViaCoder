import type { Message, TurnPosition, UserMessage } from '../../types/message.js'
import type { AgentContext } from '../../utils/agentContext.js'
import { logError } from '../../utils/log.js'

// npm 2.1.285 dme/s8/yqe/uFe/Ftn/pBt. A fork boilerplate is a boundary,
// and tool results are not prompts. Use the transcript, never global IDs.
export function findLastPromptIndex(messages: readonly Message[]): number {
  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index]!
    if (message.type !== 'user') continue
    const content = message.message.content
    if (Array.isArray(content) && content.some(block => block?.type === 'text' && typeof block.text === 'string' && block.text.startsWith('<fork-boilerplate>'))) return -1
    if (isPrompt(message)) return index
  }
  return -1
}

function isPrompt(message: UserMessage): boolean {
  if (Array.isArray(message.message.content) && message.message.content.some(block => block.type === 'tool_result')) return false
  return Boolean(message.promptId || message.turnOrigin || !(message.isMeta || message.isVirtual || message.isVisibleInTranscriptOnly))
}

export function getRequestPromptId(messages: readonly Message[], agent?: AgentContext): string | undefined {
  let promptId: string | undefined
  try {
    const message = messages[findLastPromptIndex(messages)]
    promptId = message?.type === 'user' ? message.promptId : undefined
  } catch (error) { logError(error) }
  return promptId ?? (agent?.agentType === 'subagent' && !agent.isMainSession ? agent.parentPromptId : undefined)
}

export function getRequestTurnOrigin(messages: readonly Message[]): string | undefined {
  try {
    const message = messages[findLastPromptIndex(messages)]
    return message?.type === 'user' ? message.turnOrigin : undefined
  } catch (error) { logError(error) }
}

function validIndex(value: unknown, minimum: number): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= minimum && value <= 1e7
}

export function isValidTurnPosition(value: unknown): value is TurnPosition {
  if (typeof value !== 'object' || value === null || !('promptIndex' in value) || !('turnIndex' in value)) return false
  return validIndex(value.promptIndex, 0) && validIndex(value.turnIndex, 1) && value.promptIndex <= value.turnIndex
}

function positionAt(messages: readonly Message[], index: number): TurnPosition | undefined {
  const message = messages[index]
  if (message?.type !== 'user' || !isValidTurnPosition(message.turnPosition)) return
  const {turnIndex} = message.turnPosition
  let {promptIndex} = message.turnPosition
  for (let previous = index - 1; previous >= 0; previous--) {
    const entry = messages[previous]
    if (entry?.type !== 'user' || !isValidTurnPosition(entry.turnPosition)) continue
    if (entry.turnPosition.turnIndex !== turnIndex) break
    promptIndex = Math.max(promptIndex, entry.turnPosition.promptIndex)
  }
  return {promptIndex, turnIndex}
}

export function getRequestTurnPosition(messages: readonly Message[]): TurnPosition | undefined {
  try {
    const index = findLastPromptIndex(messages), message = messages[index]
    return message?.type === 'user' && (message.promptId || message.turnOrigin) ? positionAt(messages, index) : undefined
  } catch (error) { logError(error) }
}

// npm 2.1.285 OCr/Ppr/Mpr. Only automatic/reactive query compaction carries
// the active prompt's provenance. A legacy prompt without a recorded position
// invalidates a stale summary position; a fork boundary does not invent one.
export function inheritCompactSummaryMetadata<T extends UserMessage>(summaries: T[], messages: readonly Message[]): T[] {
  let promptId: string | undefined, turnOrigin: string | undefined, turnPosition: TurnPosition | undefined
  let hasPrompt = true
  try {
    const index = findLastPromptIndex(messages)
    hasPrompt = index !== -1
    const message = messages[index]
    promptId = message?.type === 'user' ? message.promptId : undefined
    turnOrigin = message?.type === 'user' ? message.turnOrigin : undefined
    turnPosition = hasPrompt ? positionAt(messages, index) : undefined
  } catch (error) {
    logError(error)
    promptId = undefined; turnOrigin = undefined; turnPosition = undefined; hasPrompt = true
  }
  const clean = hasPrompt && turnPosition === undefined ? stripCompactTurnPositions(summaries) : summaries
  return fillCompactPromptMetadata(clean, promptId, turnOrigin, turnPosition)
}

function fillCompactPromptMetadata<T extends UserMessage>(messages: T[], promptId?: string, turnOrigin?: string, turnPosition?: TurnPosition): T[] {
  if (promptId === undefined && turnOrigin === undefined && turnPosition === undefined) return messages
  return messages.map(message => {
    const addPrompt = message.promptId === undefined && promptId !== undefined
    const addOrigin = message.turnOrigin === undefined && turnOrigin !== undefined
    const addPosition = message.turnPosition === undefined && turnPosition !== undefined
    return addPrompt || addOrigin || addPosition ? {...message,
      ...addPrompt && {promptId}, ...addOrigin && {turnOrigin}, ...addPosition && {turnPosition}} : message
  })
}

function stripCompactTurnPositions<T extends UserMessage>(messages: T[]): T[] {
  if (!messages.some(message => message.turnPosition !== undefined)) return messages
  return messages.map(message => {
    const copy = {...message}
    delete copy.turnPosition
    return copy
  })
}

function isSessionStart(message: Message): boolean {
  if (message.type !== 'assistant' || message.isApiErrorMessage || message.message.model !== '<synthetic>') return false
  const content = message.message.content
  return (typeof content === 'string' ? content : Array.isArray(content) && content.length === 1 && content[0]?.type === 'text' ? content[0].text : undefined) === 'No response requested.'
}

function latestPosition(messages: readonly Message[]): TurnPosition | 'unknown' | undefined {
  let sawAssistant = false
  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index]!
    if (message.type === 'assistant' && !isSessionStart(message)) sawAssistant = true
    if (message.type !== 'user') continue
    if (isValidTurnPosition(message.turnPosition)) return positionAt(messages, index)
    const content = message.message.content
    if (Array.isArray(content) && content.length === 1 && content[0]?.type === 'text' &&
        (content[0].text === '[Request interrupted by user]' || content[0].text === '[Request interrupted by user for tool use]')) continue
    if (message.isCompactSummary === true || sawAssistant && isPrompt(message)) return 'unknown'
  }
}

// Official OQt: legacy/compacted conversations without recorded counters remain
// unknown. Do not reconstruct or reset them to one from visible message counts.
export function getNextTurnPosition(messages: readonly Message[], origin?: string): TurnPosition | undefined {
  const increment = origin === 'human' ? 1 : 0, position = latestPosition(messages)
  if (position === 'unknown') return
  if (position !== undefined) return position.turnIndex < 1e7
    ? {promptIndex: position.promptIndex + increment, turnIndex: position.turnIndex + 1} : undefined
  return messages.some(message => message.type === 'assistant' && !isSessionStart(message) ||
    message.type === 'user' && message.isCompactSummary === true ||
    message.type === 'system' && message.subtype === 'compact_boundary') ? undefined : {promptIndex: increment, turnIndex: 1}
}

// Official BVe/Uyo/UKt/eFn/zVo; ingress provenance is not derived from prompt text.
export function getInputPromptSource(isNonInteractive: boolean, isMeta?: boolean, callerSource?: string): string {
  if (isMeta || callerSource === 'system') return 'system'
  if (isNonInteractive) return 'sdk'
  return callerSource ?? 'typed'
}

export function getInputTurnOrigin({origin, isMeta, wakeupSource, promptSource, hostInitiator}: {
  origin?: {kind: string; subkind?: string}
  isMeta?: boolean; wakeupSource?: string; promptSource?: string; hostInitiator?: string
}): string {
  if (wakeupSource !== undefined) return 'scheduled'
  let hostOrigin: string | undefined
  if (hostInitiator !== undefined && hostInitiator !== '' && hostInitiator !== 'user') {
    switch (hostInitiator) {
      case 'scheduled-task': hostOrigin = 'scheduled'; break
      case 'sleep-auto-resume': case 'quit-auto-resume': case 'remote-restart-auto-resume': case 'ci-monitor':
        hostOrigin = 'auto_continuation'; break
      case 'dispatch': hostOrigin = 'peer'; break
      default: hostOrigin = 'host_synthetic'
    }
  }
  switch (origin?.kind) {
    case 'human': return hostOrigin ?? 'human'
    case 'auto-continuation': return 'auto_continuation'
    case 'task-notification':
      if (origin.subkind === 'scheduled-trigger') return 'scheduled'
      if (origin.subkind === 'peer-send-message' || origin.subkind === 'projects-relay') return 'peer'
      return 'task_notification'
    case 'peer': case 'channel': case 'coordinator': case 'observer': case 'observer-activity': case 'slack-ping': return 'peer'
    case 'unclassified': return 'host_synthetic'
    case 'plugin': return 'system'
    case undefined: break
  }
  if (isMeta) return 'system'
  if (hostOrigin !== undefined) return hostOrigin
  return promptSource === 'sdk' ? 'sdk' : 'unknown'
}

// npm 2.1.285 QNe/JNe: cache diagnosis links to an API message ID, not a
// request ID, transcript UUID, or locally generated error/notification.
export function getPreviousAPIMessageId(messages: readonly Message[]): string | undefined {
  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index]!
    if (message.type !== 'assistant' || message.isApiErrorMessage) continue
    const id = message.message?.id
    if (message.requestId) {
      if (typeof id === 'string') return id
      continue
    }
    if (!message.isVirtual && typeof id === 'string' && id.startsWith('msg_') &&
        message.message.model !== '<synthetic>') return id
  }
}
