// biome-ignore-all assist/source/organizeImports: ANT-ONLY import markers must not be reordered
import { toolMatchesName, type Tool, type Tools } from './Tool.js'
import {authEnvironment} from './utils/authEnvironment.js'
import { AgentTool } from './tools/AgentTool/AgentTool.js'
import { SkillTool } from './tools/SkillTool/SkillTool.js'
import { BashTool } from './tools/BashTool/BashTool.js'
import { FileEditTool } from './tools/FileEditTool/FileEditTool.js'
import { FileReadTool } from './tools/FileReadTool/FileReadTool.js'
import { FileWriteTool } from './tools/FileWriteTool/FileWriteTool.js'
import { GlobTool } from './tools/GlobTool/GlobTool.js'
import { NotebookEditTool } from './tools/NotebookEditTool/NotebookEditTool.js'
import { WebFetchTool } from './tools/WebFetchTool/WebFetchTool.js'
import { TaskStopTool } from './tools/TaskStopTool/TaskStopTool.js'
import {EndConversationTool} from './tools/EndConversationTool/EndConversationTool.js'
import { BriefTool } from './tools/BriefTool/BriefTool.js'
import { SendUserFileTool } from './tools/SendUserFileTool/SendUserFileTool.js'
// Dead code elimination: conditional import for ant-only tools
/* eslint-disable custom-rules/no-process-env-top-level, @typescript-eslint/no-require-imports */
const REPLTool =
  process.env.USER_TYPE === 'ant'
    ? require('./tools/REPLTool/REPLTool.js').REPLTool
    : null
const SuggestBackgroundPRTool =
  process.env.USER_TYPE === 'ant'
    ? require('./tools/SuggestBackgroundPRTool/SuggestBackgroundPRTool.js')
        .SuggestBackgroundPRTool
    : null
const SleepTool =
  feature('PROACTIVE') || feature('KAIROS')
    ? require('./tools/SleepTool/SleepTool.js').SleepTool
    : null
const cronTools = feature('AGENT_TRIGGERS')
  ? [
      require('./tools/ScheduleCronTool/CronCreateTool.js').CronCreateTool,
      require('./tools/ScheduleCronTool/CronDeleteTool.js').CronDeleteTool,
      require('./tools/ScheduleCronTool/CronListTool.js').CronListTool,
    ]
  : []
const RemoteTriggerTool = feature('AGENT_TRIGGERS_REMOTE')
  ? require('./tools/RemoteTriggerTool/RemoteTriggerTool.js').RemoteTriggerTool
  : null
const MonitorTool = feature('MONITOR_TOOL')
  ? require('./tools/MonitorTool/MonitorTool.js').MonitorTool
  : null
const PushNotificationTool =
  feature('KAIROS') || feature('KAIROS_PUSH_NOTIFICATION')
    ? require('./tools/PushNotificationTool/PushNotificationTool.js')
        .PushNotificationTool
    : null
const SubscribePRTool = feature('KAIROS_GITHUB_WEBHOOKS')
  ? require('./tools/SubscribePRTool/SubscribePRTool.js').SubscribePRTool
  : null
/* eslint-enable custom-rules/no-process-env-top-level, @typescript-eslint/no-require-imports */
import { GetTaskTool } from './tools/GetTaskTool/GetTaskTool.js'
import { WebSearchTool } from './tools/WebSearchTool/WebSearchTool.js'
import { TodoWriteTool } from './tools/TodoWriteTool/TodoWriteTool.js'
import { ExitPlanModeV2Tool } from './tools/ExitPlanModeTool/ExitPlanModeV2Tool.js'
import { TestingPermissionTool } from './tools/testing/TestingPermissionTool.js'
import { GrepTool } from './tools/GrepTool/GrepTool.js'
import { TungstenTool } from './tools/TungstenTool/TungstenTool.js'
// Lazy require to break circular dependency: tools.ts -> TeamCreateTool/TeamDeleteTool -> ... -> tools.ts
/* eslint-disable @typescript-eslint/no-require-imports */
const getTeamCreateTool = () =>
  require('./tools/TeamCreateTool/TeamCreateTool.js')
    .TeamCreateTool as typeof import('./tools/TeamCreateTool/TeamCreateTool.js').TeamCreateTool
const getTeamDeleteTool = () =>
  require('./tools/TeamDeleteTool/TeamDeleteTool.js')
    .TeamDeleteTool as typeof import('./tools/TeamDeleteTool/TeamDeleteTool.js').TeamDeleteTool
const getSendMessageTool = () =>
  require('./tools/SendMessageTool/SendMessageTool.js')
    .SendMessageTool as typeof import('./tools/SendMessageTool/SendMessageTool.js').SendMessageTool
/* eslint-enable @typescript-eslint/no-require-imports */
import { AskUserQuestionTool } from './tools/AskUserQuestionTool/AskUserQuestionTool.js'
import { LSPTool } from './tools/LSPTool/LSPTool.js'
import { ListMcpResourcesTool } from './tools/ListMcpResourcesTool/ListMcpResourcesTool.js'
import { ReadMcpResourceTool } from './tools/ReadMcpResourceTool/ReadMcpResourceTool.js'
import { ToolSearchTool } from './tools/ToolSearchTool/ToolSearchTool.js'
import { EnterPlanModeTool } from './tools/EnterPlanModeTool/EnterPlanModeTool.js'
import { EnterWorktreeTool } from './tools/EnterWorktreeTool/EnterWorktreeTool.js'
import { ExitWorktreeTool } from './tools/ExitWorktreeTool/ExitWorktreeTool.js'
import { ConfigTool } from './tools/ConfigTool/ConfigTool.js'
import { TaskCreateTool } from './tools/TaskCreateTool/TaskCreateTool.js'
import { TaskGetTool } from './tools/TaskGetTool/TaskGetTool.js'
import { TaskUpdateTool } from './tools/TaskUpdateTool/TaskUpdateTool.js'
import { TaskListTool } from './tools/TaskListTool/TaskListTool.js'
import uniqBy from 'lodash-es/uniqBy.js'
import { isToolSearchEnabledOptimistic } from './utils/toolSearch.js'
import {createToolCatalog287,type ToolCatalogPorts287} from './utils/officialToolCatalog287/native.js'
import {toolCatalogQualifiers287} from './utils/toolCatalogQualifiers287.js'
import {ReportFindingsTool287} from './utils/toolCatalogPublicTools287.js'
import {toolSelectionConsumer287 as selectionReaders287} from './utils/toolSelectionConsumer287.js'
import {createPublicToolSelection287,createPublicToolPool287,type PublicToolSelectionPorts287,type ToolSelectionOptions287} from './utils/officialToolCatalog287/selection.js'
// Dead code elimination: conditional import for CLAUDE_CODE_VERIFY_PLAN
/* eslint-disable custom-rules/no-process-env-top-level, @typescript-eslint/no-require-imports */
const VerifyPlanExecutionTool =
  process.env.CLAUDE_CODE_VERIFY_PLAN === 'true'
    ? require('./tools/VerifyPlanExecutionTool/VerifyPlanExecutionTool.js')
        .VerifyPlanExecutionTool
    : null
/* eslint-enable custom-rules/no-process-env-top-level, @typescript-eslint/no-require-imports */
import { SYNTHETIC_OUTPUT_TOOL_NAME } from './tools/SyntheticOutputTool/SyntheticOutputTool.js'
export {
  ALL_AGENT_DISALLOWED_TOOLS,
  CUSTOM_AGENT_DISALLOWED_TOOLS,
  ASYNC_AGENT_ALLOWED_TOOLS,
  COORDINATOR_MODE_ALLOWED_TOOLS,
} from './constants/tools.js'
import { feature } from 'bun:bundle'
// Dead code elimination: conditional import for OVERFLOW_TEST_TOOL
/* eslint-disable custom-rules/no-process-env-top-level, @typescript-eslint/no-require-imports */
const OverflowTestTool = feature('OVERFLOW_TEST_TOOL')
  ? require('./tools/OverflowTestTool/OverflowTestTool.js').OverflowTestTool
  : null
const CtxInspectTool = feature('CONTEXT_COLLAPSE')
  ? require('./tools/CtxInspectTool/CtxInspectTool.js').CtxInspectTool
  : null
const TerminalCaptureTool = feature('TERMINAL_PANEL')
  ? require('./tools/TerminalCaptureTool/TerminalCaptureTool.js')
      .TerminalCaptureTool
  : null
const WebBrowserTool = feature('WEB_BROWSER_TOOL')
  ? require('./tools/WebBrowserTool/WebBrowserTool.js').WebBrowserTool
  : null
const coordinatorModeModule = feature('COORDINATOR_MODE')
  ? (require('./coordinator/coordinatorMode.js') as typeof import('./coordinator/coordinatorMode.js'))
  : null
const SnipTool = feature('HISTORY_SNIP')
  ? require('./tools/SnipTool/SnipTool.js').SnipTool
  : null
const ListPeersTool = feature('UDS_INBOX')
  ? require('./tools/ListPeersTool/ListPeersTool.js').ListPeersTool
  : null
const WorkflowTool = (() => {
  require('./tools/WorkflowTool/bundled/index.js').initBundledWorkflows()
  return require('./tools/WorkflowTool/WorkflowTool.js').WorkflowTool
})()
/* eslint-enable custom-rules/no-process-env-top-level, @typescript-eslint/no-require-imports */
import type { ToolPermissionContext } from './Tool.js'
import { getDenyRuleForTool } from './utils/permissions/permissions.js'
import { isEnvTruthy } from './utils/envUtils.js'
import { isPowerShellToolEnabled } from './utils/shell/shellToolUtils.js'
import { isAgentSwarmsEnabled } from './utils/agentSwarmsEnabled.js'
import {
  REPL_TOOL_NAME,
  REPL_ONLY_TOOLS,
  isReplModeEnabled,
} from './tools/REPLTool/constants.js'
export { REPL_ONLY_TOOLS }
/* eslint-disable @typescript-eslint/no-require-imports */
const getPowerShellTool = () => {
  if (!isPowerShellToolEnabled()) return null
  return (
    require('./tools/PowerShellTool/PowerShellTool.js') as typeof import('./tools/PowerShellTool/PowerShellTool.js')
  ).PowerShellTool
}
/* eslint-enable @typescript-eslint/no-require-imports */

/**
 * Predefined tool presets that can be used with --tools flag
 */
export const TOOL_PRESETS = ['default'] as const

export type ToolPreset = (typeof TOOL_PRESETS)[number]

export function parseToolPreset(preset: string): ToolPreset | null {
  const presetString = preset.toLowerCase()
  if (!TOOL_PRESETS.includes(presetString as ToolPreset)) {
    return null
  }
  return presetString as ToolPreset
}

/**
 * Get the list of tool names for a given preset
 * Filters out tools that are disabled via isEnabled() check
 * @param preset The preset name
 * @returns Array of tool names
 */
export function getToolsForDefaultPreset(): string[] {
  const tools = getAllBaseTools()
  const isEnabled = tools.map(tool => tool.isEnabled())
  return tools.filter((_, i) => isEnabled[i]).map(tool => tool.name)
}

/**
 * Get the complete exhaustive list of all tools that could be available
 * in the current environment (respecting process.env flags).
 * This is the source of truth for ALL tools.
 */
/**
 * NOTE: This MUST stay in sync with https://console.statsig.com/4aF3Ewatb6xPVpCwxb5nA3/dynamic_configs/claude_code_global_system_caching, in order to cache the system prompt across users.
 */
// The exhaustive 287 catalog runs against these existing Tool instances.
// Unimplemented public slots are explicit below, never fabricated Tool objects.
// Private/Cowork/WIP hosts stay excluded by R04; a null slot is not a success.
// FB already belongs to the actual MCP producer. Reuse its complete original
// Wt Tool instance and remote registry; never create a catalog-local copy.
function getMcpResourceDirectoryTool287():Tool {
 return (require('./services/mcp/connectedProducer287.js') as typeof import('./services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().resourceDirectoryTool
}
function originalCatalogTool287(file:string,name:string):Tool {
 const owner=(require('./utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
 const tool=owner.clearSourceModule287(file)[name]
 if(typeof tool!=='object'||tool===null||typeof Reflect.get(tool,'isEnabled')!=='function'||typeof Reflect.get(tool,'name')!=='string')throw new TypeError(`Missing original Tool ${file}:${name}`)
 return tool as Tool
}
function originalMemoryTools287():readonly Tool[] {
 const owner=(require('./utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
 return owner.memoryTools287
}
export function getToolCatalogPorts287():ToolCatalogPorts287<Tool> {
  const qualification=toolCatalogQualifiers287
  return {
    Js:()=>null,Wr:qualification.Wr,cXt:AgentTool,$a:qualification.bashAvailable,
    fi:BashTool,qR:GlobTool,KR:GrepTool,d7:qualification.omittedSearchNames,
    _V:ExitPlanModeV2Tool,Sv:FileReadTool,RC:FileEditTool,hv:FileWriteTool,
    ni:null,vce:NotebookEditTool,go:originalMemoryTools287(),gy:WebFetchTool,mo:TodoWriteTool,
    lo:ReportFindingsTool287,io:WebSearchTool,ze:TaskStopTool,o5:AskUserQuestionTool,
    Io:selectionReaders287.feedbackTool(),Jze:SkillTool,RXt:EnterPlanModeTool,Zs:null,ei:null,Fr:null,
    dk:qualification.dk,mr:TaskCreateTool,gr:TaskGetTool,Tr:TaskUpdateTool,wr:TaskListTool,
    Dr:null,ri:()=>[],Lr:null,Nr:null,HRe:qualification.HRe,ft:LSPTool,
    krt:qualification.krt,nr:EnterWorktreeTool,lr:ExitWorktreeTool,
    kt:getSendMessageTool,ti:()=>originalCatalogTool287('chunk-qwd3a2ch.js','we'),jr:null,Vt:null,Mr:null,ce:null,
    Tt:WorkflowTool,qs:cronTools,Cr:()=>false,Gs:[],to:SleepTool,
    vr:RemoteTriggerTool,Rr:null,Or:null,Xt:null,jt:null,oi:[],xr:null,Vs:[],
    Ar:MonitorTool,eo:BriefTool,Ys:SendUserFileTool,Xs:originalCatalogTool287('chunk-tn83t0jf.js','it'),Qs:originalCatalogTool287('chunk-rn6687xh.js','X'),
    Pr:PushNotificationTool,Ce:null,zr:EndConversationTool,bt:getPowerShellTool,$r:null,Br:null,
    zI:ListMcpResourcesTool,VI:ReadMcpResourceTool,FB:getMcpResourceDirectoryTool287(),a:authEnvironment,
    ht:selectionReaders287.refreshTool(),Vh:isToolSearchEnabledOptimistic,Pjn:ToolSearchTool,zIr:selectionReaders287.waitTool(),Lo:GetTaskTool,
  }
}

export function getAllBaseTools(): Tools {
  const catalog=createToolCatalog287(getToolCatalogPorts287())()
  // This is the finite host projection, not a second registry. Inactive R04
  // slots and still-unported public slots are enumerated in the receipt.
  const tools=catalog.filter((tool):tool is Tool=>tool!==null)
  // Existing source-only optional tool extensions retain their build/account
  // conditions. They are not relabelled as different native pv symbols.
  const extensions:Tool[]=[
    ...(process.env.USER_TYPE==='ant'?[ConfigTool,TungstenTool]:[]),
    ...(SuggestBackgroundPRTool?[SuggestBackgroundPRTool]:[]),
    ...(WebBrowserTool?[WebBrowserTool]:[]),
    ...(OverflowTestTool?[OverflowTestTool]:[]),
    ...(CtxInspectTool?[CtxInspectTool]:[]),
    ...(TerminalCaptureTool?[TerminalCaptureTool]:[]),
    ...(ListPeersTool?[ListPeersTool]:[]),
    ...(isAgentSwarmsEnabled()?[getTeamCreateTool(),getTeamDeleteTool()]:[]),
    ...(VerifyPlanExecutionTool?[VerifyPlanExecutionTool]:[]),
    ...(REPLTool?[REPLTool]:[]),
    ...(SubscribePRTool?[SubscribePRTool]:[]),
    ...(SnipTool?[SnipTool]:[]),
    ...(process.env.NODE_ENV==='test'?[TestingPermissionTool]:[]),
  ]
  return [...tools,...extensions]
}

export function filterToolsByDenyRules<
  T extends {
    name: string
    mcpInfo?: { serverName: string; toolName: string }
  },
>(tools: readonly T[], permissionContext: ToolPermissionContext): T[] {
  return tools.filter(tool => !getDenyRuleForTool(permissionContext, tool))
}

// Complete official HO over this host's existing Tool objects and public
// original readers. No call to canonical pv (that namespace delegates here).
export function getPublicToolSelectionPorts287():PublicToolSelectionPorts287 {
 return {
  a:authEnvironment,Wr:toolCatalogQualifiers287.Wr,gM:selectionReaders287.isRepl,
  rP:selectionReaders287.replRead,zs:selectionReaders287.denyRule,
  Sv:FileReadTool,RC:FileEditTool,hv:FileWriteTool,ce:null,L1:selectionReaders287.canPoll,
  We:{isCoordinatorMode:()=>!!coordinatorModeModule?.isCoordinatorMode()},
  cXt:AgentTool,ze:TaskStopTool,kt:getSendMessageTool,nm:selectionReaders287.canWorkflow,Tt:WorkflowTool,
  Pq:selectionReaders287.deny,bt:getPowerShellTool,$a:toolCatalogQualifiers287.bashAvailable,
  fi:BashTool,zI:ListMcpResourcesTool,VI:ReadMcpResourceTool,FB:getMcpResourceDirectoryTool287(),
  Fi:selectionReaders287.syntheticName(),pv:getAllBaseTools,Mt:toolMatchesName,Ue:BashTool.name,
  ic:selectionReaders287.replName(),Bb:selectionReaders287.primitive,g1t:selectionReaders287.primitiveNames(),
  fct:selectionReaders287.hideFetch,hr:selectionReaders287.fetchName(),bE:toolCatalogQualifiers287.bE,
  qR:GlobTool,KR:GrepTool,Ofn:selectionReaders287.replacements,
  Yxo:selectionReaders287.pending,dFe:selectionReaders287.declared,aG:selectionReaders287.managesPending,
  Qa:selectionReaders287.searchName(),UP:selectionReaders287.waitName(),zIr:selectionReaders287.waitTool(),
 }
}
export const getTools = (permissionContext:ToolPermissionContext,options?:ToolSelectionOptions287):Tools => {
 // Retain the explicit source-only --bare REPL C: it is not a rewritten HO
 // branch or a fallback for a missing original reader.
 if(authEnvironment.CLAUDE_CODE_SIMPLE&&!options?.skipSimpleModeFilter&&!options?.skipReplFilter&&isReplModeEnabled()&&REPLTool){
  const tools:Tool[]=[REPLTool]
  if(coordinatorModeModule?.isCoordinatorMode())tools.push(TaskStopTool,getSendMessageTool())
  return selectionReaders287.deny(tools,permissionContext)
 }
 const tools=createPublicToolSelection287(getPublicToolSelectionPorts287())(permissionContext,options)
 if(!options?.skipReplFilter&&isReplModeEnabled()&&tools.some(tool=>toolMatchesName(tool,REPL_TOOL_NAME))){
  return tools.filter(tool=>!REPL_ONLY_TOOLS.has(tool.name))
 }
 return tools
}

/**
 * Assemble the full tool pool for a given permission context and MCP tools.
 *
 * This is the single source of truth for combining built-in tools with MCP tools.
 * Both REPL.tsx (via useMergedTools hook) and runAgent.ts (for coordinator workers)
 * use this function to ensure consistent tool pool assembly.
 *
 * The function:
 * 1. Gets built-in tools via getTools() (respects mode filtering)
 * 2. Filters MCP tools by deny rules
 * 3. Deduplicates by tool name (built-in tools take precedence)
 *
 * @param permissionContext - Permission context for filtering built-in tools
 * @param mcpTools - MCP tools from appState.mcp.tools
 * @returns Combined, deduplicated array of built-in and MCP tools
 */
export function assembleToolPool(
  permissionContext:ToolPermissionContext,
  mcpTools:Tools,
  options?:ToolSelectionOptions287,
):Tools {
 return createPublicToolPool287({
  HO:getTools,Ll:(tools,key)=>uniqBy(tools,key),eHn:selectionReaders287.filterMcp,
  Pq:selectionReaders287.deny,
 })(permissionContext,mcpTools,options)
}

/**
 * Get all tools including both built-in tools and MCP tools.
 *
 * This is the preferred function when you need the complete tools list for:
 * - Tool search threshold calculations (isToolSearchEnabled)
 * - Token counting that includes MCP tools
 * - Any context where MCP tools should be considered
 *
 * Use getTools() only when you specifically need just built-in tools.
 *
 * @param permissionContext - Permission context for filtering built-in tools
 * @param mcpTools - MCP tools from appState.mcp.tools
 * @returns Combined array of built-in and MCP tools
 */
export function getMergedTools(
  permissionContext: ToolPermissionContext,
  mcpTools: Tools,
): Tools {
  const builtInTools = getTools(permissionContext)
  return [...builtInTools, ...mcpTools]
}
