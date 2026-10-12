import type { UUID } from 'crypto'
import { getSessionId } from '../../bootstrap/state.js'
import type { ToolUseContext } from '../../Tool.js'
import {
  AGENT_COLORS,
  type AgentColorName,
} from '../../tools/AgentTool/agentColorManager.js'
import type {
  LocalJSXCommandContext,
  LocalJSXCommandOnDone,
} from '../../types/command.js'
import {
  getTranscriptPath,
  saveAgentColor,
} from '../../utils/sessionStorage.js'
import { isTeammate } from '../../utils/teammate.js'

const RESET_ALIASES = ['default', 'reset', 'none', 'gray', 'grey'] as const

export function normalizeSessionColor(value: string): AgentColorName | 'default' | null {
  const normalized = value.trim().toLowerCase()
  if (RESET_ALIASES.includes(normalized as (typeof RESET_ALIASES)[number])) return 'default'
  return AGENT_COLORS.includes(normalized as AgentColorName) ? normalized as AgentColorName : null
}

/** The single persistence and live-state writer used by the command and its owner control. */
export async function applySessionColor(
  color: AgentColorName | 'default',
  setAppState: ToolUseContext['setAppState'],
): Promise<void> {
  if (isTeammate()) {
    throw new Error('Cannot set color: This session is a swarm teammate. Teammate colors are assigned by the team leader.')
  }
  if (color !== 'default' && !AGENT_COLORS.includes(color)) {
    throw new Error(`Invalid color "${String(color)}". Available colors: ${AGENT_COLORS.join(', ')}, default`)
  }
  const sessionId = getSessionId() as UUID
  const fullPath = getTranscriptPath()
  await saveAgentColor(sessionId, color, fullPath)
  setAppState(prev => ({
    ...prev,
    standaloneAgentContext: {
      ...prev.standaloneAgentContext,
      name: prev.standaloneAgentContext?.name ?? '',
      color: color === 'default' ? undefined : color,
    },
  }))
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  context: ToolUseContext & LocalJSXCommandContext,
  args: string,
): Promise<null> {
  // Teammates cannot set their own color
  if (isTeammate()) {
    onDone(
      'Cannot set color: This session is a swarm teammate. Teammate colors are assigned by the team leader.',
      { display: 'system' },
    )
    return null
  }

  if (!args || args.trim() === '') {
    const colorList = AGENT_COLORS.join(', ')
    onDone(`Please provide a color. Available colors: ${colorList}, default`, {
      display: 'system',
    })
    return null
  }

  const colorArg = args.trim().toLowerCase()
  const color = normalizeSessionColor(colorArg)
  if (color === null) {
    const colorList = AGENT_COLORS.join(', ')
    onDone(`Invalid color "${colorArg}". Available colors: ${colorList}, default`, {
      display: 'system',
    })
    return null
  }

  const shared = context.commandRuntime?.sharedSession
  if (shared) {
    try {
      await shared.setColor(color, context.abortController.signal)
      onDone(color === 'default' ? 'Session color reset to default' : `Session color set to: ${color}`, {display: 'system'})
    } catch (error) {
      onDone(`Color change failed: ${error instanceof Error ? error.message : String(error)}`, {display: 'system'})
    }
    return null
  }

  // Handle reset to default (gray)
  if (color === 'default') {
    await applySessionColor(color, context.setAppState)
    onDone('Session color reset to default', { display: 'system' })
    return null
  }
  await applySessionColor(color, context.setAppState)

  onDone(`Session color set to: ${color}`, { display: 'system' })
  return null
}
