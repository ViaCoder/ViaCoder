import type {ToolPermissionContext, Tools} from '../Tool.js'
import type {AgentDefinition, AgentDefinitionsResult} from '../tools/AgentTool/loadAgentsDir.js'
import type {Message} from '../types/message.js'
import type {SettingSource} from './settings/constants.js'
import type {Theme} from './theme.js'
import type {ContextTokenCounter, ContextUsageDetail} from './contextUsageDetail.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {
  analyzeOriginalContext287, countOriginalToolDefinitions287, countOriginalMcpTools287,
  type ContextAnalysisToolContext287, type ContextAnalysisOptions287,
} from './contextAnalysis287.js'

interface ContextCategory {
  name: string
  tokens: number
  color: keyof Theme
  /** When true, these tokens are deferred and don't count toward context usage */
  isDeferred?: boolean
  kind?: 'free' | 'buffer' | 'deferred' | 'used'
}

interface GridSquare {
  color: keyof Theme
  isFilled: boolean
  categoryName: string
  tokens: number
  percentage: number
  squareFullness: number // 0-1 representing how full this individual square is
}

interface MemoryFile {
  path: string
  type: string
  tokens: number
}

interface McpTool {
  name: string
  serverName: string
  tokens: number
  isLoaded?: boolean
}

export interface DeferredBuiltinTool {
  name: string
  tokens: number
  isLoaded: boolean
}

export interface SystemToolDetail {
  name: string
  tokens: number
}

export interface SystemPromptSectionDetail {
  name: string
  tokens: number
}

interface Agent {
  agentType: string
  source: SettingSource | 'built-in' | 'plugin'
  tokens: number
}

interface SlashCommandInfo {
  readonly totalCommands: number
  readonly includedCommands: number
  readonly tokens: number
}

/** Individual skill detail for context display */
interface SkillFrontmatter {
  name: string
  source: SettingSource | 'plugin' | 'built-in' | 'mcp'
  pluginName?: string
  tokens: number
}

/**
 * Information about skills included in the context window.
 */
interface SkillInfo {
  /** Total number of available skills */
  readonly totalSkills: number
  /** Number of skills included within token budget */
  readonly includedSkills: number
  /** Total tokens consumed by skills */
  readonly tokens: number
  /** Individual skill details */
  readonly skillFrontmatter: SkillFrontmatter[]
}

export interface ContextData {
  readonly categories: ContextCategory[]
  readonly totalTokens: number
  readonly maxTokens: number
  readonly rawMaxTokens: number
  readonly autocompactSource?: string
  readonly percentage: number
  readonly gridRows: GridSquare[][]
  readonly model: string
  readonly memoryFiles: MemoryFile[]
  readonly mcpTools: McpTool[]
  /** Ant-only: per-tool breakdown of deferred built-in tools */
  readonly deferredBuiltinTools?: DeferredBuiltinTool[]
  /** Ant-only: per-tool breakdown of always-loaded built-in tools */
  readonly systemTools?: SystemToolDetail[]
  /** Ant-only: per-section breakdown of system prompt */
  readonly systemPromptSections?: SystemPromptSectionDetail[]
  readonly agents: Agent[]
  readonly slashCommands?: SlashCommandInfo
  /** Skill statistics */
  readonly skills?: SkillInfo
  readonly autoCompactThreshold?: number
  readonly isAutoCompactEnabled: boolean
  messageBreakdown?: {
    toolCallTokens: number
    toolResultTokens: number
    attachmentTokens: number
    assistantMessageTokens: number
    userMessageTokens: number
    redirectedContextTokens?: number
    unattributedTokens?: number
    toolCallsByType: Array<{
      name: string
      callTokens: number
      resultTokens: number
    }>
    attachmentsByType: Array<{ name: string; tokens: number }>
  }
  /** Actual token usage from last API response (if available) */
  readonly apiUsage: {
    input_tokens: number
    output_tokens: number
    cache_creation_input_tokens: number
    cache_read_input_tokens: number
  } | null
}

/** Public doctor callers retain their API while using the same original
 * schema/counter/deferral functions as the actual /context analysis. */
export function countToolDefinitionTokens(tools: Tools,
  getToolPermissionContext: () => Promise<ToolPermissionContext>,
  agentInfo: AgentDefinitionsResult | null, model?: string,
  countTokens?: ContextTokenCounter): Promise<number> {
  return countOriginalToolDefinitions287(tools, getToolPermissionContext, agentInfo, model, countTokens)
}

export function countMcpToolTokens(tools: Tools,
  getToolPermissionContext: () => Promise<ToolPermissionContext>,
  agentInfo: AgentDefinitionsResult | null, model: string, messages?: Message[],
  countTokens?: ContextTokenCounter): Promise<{
    mcpToolTokens: number; mcpToolDetails: McpTool[]; deferredToolTokens: number;
    loadedMcpToolNames: Set<string>
  }> {
  return countOriginalMcpTools287(tools, getToolPermissionContext, agentInfo, model, messages, countTokens)
}

/** Full original 287 ran. Positional compatibility is only the public ABI;
 * calculation, prompt composition, snapshots and token accounting are not
 * reimplemented here. The current execution owner is retained. */
export function analyzeContextUsage(messages: Message[], model: string,
  getToolPermissionContext: () => Promise<ToolPermissionContext>, tools: Tools,
  agentDefinitions: AgentDefinitionsResult, terminalWidth?: number,
  toolUseContext?: ContextAnalysisToolContext287,
  mainThreadAgentDefinition?: AgentDefinition, originalMessages?: Message[],
  detail: ContextUsageDetail = 'full',
  options: Pick<ContextAnalysisOptions287, 'session' | 'configuredWindow' | 'excludeDynamicSections'> = {session: getExecutionSession287()},
): Promise<ContextData> {
  return analyzeOriginalContext287(messages, model, getToolPermissionContext, tools, agentDefinitions, {
    ...options, terminalWidth, toolUseContext, mainThreadAgentDefinition, originalMessages, detail,
  })
}
