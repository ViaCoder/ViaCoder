import type {ToolUseContext} from '../../Tool.js'
import type {ContextData} from '../../utils/analyzeContext.js'
import {
  collectOriginalContext287, callOriginalContext287, formatOriginalContext287,
  type CollectContextDataInput287,
} from '../../utils/contextAnalysis287.js'

/** Original cte is shared by the slash command and SDK control request.
 * It owns boundary selection, snapshot/MCP inputs and configured window. */
export function collectContextData(context: CollectContextDataInput287): Promise<ContextData> {
  return collectOriginalContext287(context)
}

export function call(args: string, context: ToolUseContext): Promise<{
  type: 'text'; value: string; contextUsage: Record<string, unknown>
}> {
  return callOriginalContext287(args, {...context, getMcp: () => context.getAppState().mcp})
}

export const formatContextAsMarkdownTable = formatOriginalContext287
