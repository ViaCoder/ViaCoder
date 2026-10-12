import { DIAMOND_OPEN } from '../../constants/figures.js'
import { AgentTool } from '../../tools/AgentTool/AgentTool.js'
import { isForkSubagentEnabled } from '../../tools/AgentTool/forkSubagent.js'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { createAssistantMessage } from '../../utils/messages.js'
import { hasPermissionsToUseTool } from '../../utils/permissions/permissions.js'

/** The slash entry reuses AgentTool's real async fork lifecycle and task registry. */
export const call: LocalJSXCommandCall = async (onDone, context, args) => {
  const directive = args.trim()
  if (!directive) {
    onDone('Usage: /fork <directive>', { display: 'system' })
    return null
  }
  if (!isForkSubagentEnabled()) {
    onDone('Forking is not available in this session.', { display: 'system' })
    return null
  }

  const description = directive.replace(/\s+/g, ' ').slice(0, 50)
  const parent = createAssistantMessage({ content: '', isVirtual: true })
  const result = await AgentTool.call(
    { description, prompt: directive },
    context,
    context.canUseTool ?? hasPermissionsToUseTool,
    parent,
  )
  if (result.data.status !== 'async_launched') {
    onDone('Fork did not start a background task.', { display: 'system' })
    return null
  }
  onDone(`${DIAMOND_OPEN} forked ${description} (${result.data.agentId.slice(-4)})`, {
    display: 'system',
  })
  return null
}
