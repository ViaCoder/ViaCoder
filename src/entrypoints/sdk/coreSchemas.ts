/**
 * SDK Core Schemas - Zod schemas for serializable SDK data types.
 *
 * These schemas are the single source of truth for SDK data types.
 * TypeScript types are generated from these schemas and committed for IDE support.
 *
 * @see scripts/generate-sdk-types.ts for type generation
 */

import { z } from 'zod/v4'
import {createResultSchemas287} from './officialResultSchemas287/native.js'
import {getPrintHostSource287} from '../../cli/printOwnership287/publicHostRuntime287.js'
import { lazySchema } from '../../utils/lazySchema.js'
import {createHookOutputSchemas287} from '../../utils/hooks/officialHookOutput287/schema.js'
import {createPrintUiWireSchemas287,createSdkAutocompactSchema287,createSdkControlProgressSchema287} from '../../cli/printOwnership287/publicHostNative.js'

// ============================================================================
// Usage & Model Types
// ============================================================================

export const ModelUsageSchema = lazySchema(() =>
  z.object({
    inputTokens: z.number().int(),
    outputTokens: z.number().int(),
    thinkingTokens: z.number().int().optional().describe(
      'Thinking tokens, already counted inside outputTokens. Counts only turns run on CLI versions that record this field: absent when none did, and partial for a resumed session that began on an older version.',
    ),
    cacheReadInputTokens: z.number().int(),
    cacheCreationInputTokens: z.number().int(),
    webSearchRequests: z.number().int(),
    costUSD: z.number(),
    contextWindow: z.number().int(),
    maxOutputTokens: z.number().int(),
    canonicalModel: z.string().optional().describe(
      "Canonical model id used for the pricing lookup (e.g. 'claude-opus-4-7'). May differ from the raw model string this entry is keyed by (provider-specific ids, aliases).",
    ),
    provider: z.string().optional().describe(
      "API provider that served this model (e.g. 'firstParty', 'bedrock', 'vertex', 'foundry', 'anthropicAws', 'mantle', 'gateway').",
    ),
    costBasis: z.enum(['list', 'managed', 'unknown']).optional().describe(
      "Which price table the most recent request for this model was priced at: Claude Code's built-in list prices ('list'), the organization's managed-settings modelPricing rates or multiplier ('managed'), or neither ('unknown' — no pricing row and no built-in price matched the model ID, so costUSD is a guess at the default model's rate). Overwritten per request like canonicalModel, so a consumer that differences the cumulative costUSD per turn gets that turn's basis. Absent until this process has priced a request for the model (e.g. right after --resume) and on builds that predate the field; treat as 'list'.",
    ),
  }),
)

// ============================================================================
// Output Format Types
// ============================================================================

export const OutputFormatTypeSchema = lazySchema(() => z.literal('json_schema'))

export const BaseOutputFormatSchema = lazySchema(() =>
  z.object({
    type: OutputFormatTypeSchema(),
  }),
)

export const JsonSchemaOutputFormatSchema = lazySchema(() =>
  z.object({
    type: z.literal('json_schema'),
    schema: z.record(z.string(), z.unknown()),
  }),
)

export const OutputFormatSchema = lazySchema(() =>
  JsonSchemaOutputFormatSchema(),
)

// ============================================================================
// Config Types
// ============================================================================

export const ApiKeySourceSchema = lazySchema(() =>
  z.enum(['user', 'project', 'org', 'temporary', 'oauth']),
)

export const ConfigScopeSchema = lazySchema(() =>
  z.enum(['local', 'user', 'project']).describe('Config scope for settings.'),
)

export const SdkBetaSchema = lazySchema(() =>
  z.literal('context-1m-2025-08-07'),
)

export const ThinkingAdaptiveSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('adaptive'),
      display: z.enum(['summarized', 'omitted']).optional(),
    })
    .describe('Claude decides when and how much to think (current Opus models).'),
)

export const ThinkingEnabledSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('enabled'),
      budgetTokens: z.number().optional(),
      display: z.enum(['summarized', 'omitted']).optional(),
    })
    .describe('Fixed thinking token budget (older models)'),
)

export const ThinkingDisabledSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('disabled'),
    })
    .describe('No extended thinking'),
)

export const ThinkingConfigSchema = lazySchema(() =>
  z
    .union([
      ThinkingAdaptiveSchema(),
      ThinkingEnabledSchema(),
      ThinkingDisabledSchema(),
    ])
    .describe(
      "Controls Claude's thinking/reasoning behavior. When set, takes precedence over the deprecated maxThinkingTokens.",
    ),
)

// ============================================================================
// MCP Server Config Types (serializable only)
// ============================================================================

export const McpStdioServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('stdio').optional(), // Optional for backwards compatibility
    command: z.string(),
    args: z.array(z.string()).optional(),
    env: z.record(z.string(), z.string()).optional(),
  }),
)

export const McpSSEServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('sse'),
    url: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
  }),
)

export const McpHttpServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('http'),
    url: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
  }),
)

export const McpSdkServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('sdk'),
    name: z.string(),
  }),
)

export const McpServerConfigForProcessTransportSchema = lazySchema(() =>
  z.union([
    McpStdioServerConfigSchema(),
    McpSSEServerConfigSchema(),
    McpHttpServerConfigSchema(),
    McpSdkServerConfigSchema(),
  ]),
)

export const McpClaudeAIProxyServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('claudeai-proxy'),
    url: z.string(),
    id: z.string(),
  }),
)

// Broader config type for status responses (includes claudeai-proxy which is output-only)
export const McpServerStatusConfigSchema = lazySchema(() =>
  z.union([
    McpServerConfigForProcessTransportSchema(),
    McpClaudeAIProxyServerConfigSchema(),
  ]),
)

export const McpServerStatusSchema = lazySchema(() =>
  (require('../../services/mcp/connectedProducer287.js') as typeof import('../../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().statusSchema(),
)

export const McpSetServersResultSchema = lazySchema(() =>
  z
    .object({
      added: z.array(z.string()).describe('Names of servers that were added'),
      removed: z
        .array(z.string())
        .describe('Names of servers that were removed'),
      errors: z
        .record(z.string(), z.string())
        .describe(
          'Map of server names to error messages for servers that failed to connect',
        ),
    })
    .describe('Result of a setMcpServers operation.'),
)

// ============================================================================
// Permission Types
// ============================================================================

export const PermissionUpdateDestinationSchema = lazySchema(() =>
  z.enum([
    'userSettings',
    'projectSettings',
    'localSettings',
    'session',
    'cliArg',
  ]),
)

export const PermissionBehaviorSchema = lazySchema(() =>
  z.enum(['allow', 'deny', 'ask']),
)

export const PermissionRuleValueSchema = lazySchema(() =>
  z.object({
    toolName: z.string(),
    ruleContent: z.string().optional(),
  }),
)

/** Complete original jt, shared with canonical incoming permission asks. */
export const PermissionUpdateSchema = lazySchema(() =>
  (getPrintHostSource287('chunk-xep95vq1.js', 'jt') as () => z.ZodType<import('./coreTypes.recovered.js').PermissionUpdate>)(),
)

export const PermissionDecisionClassificationSchema = lazySchema(() =>
  z
    .enum(['user_temporary', 'user_permanent', 'user_reject'])
    .describe(
      'Classification of this permission decision for telemetry. SDK hosts ' +
        'that prompt users (desktop apps, IDEs) should set this to reflect ' +
        'what actually happened: user_temporary for allow-once, user_permanent ' +
        'for always-allow (both the click and later cache hits), user_reject ' +
        'for deny. If unset, the CLI infers conservatively (temporary for ' +
        'allow, reject for deny). The vocabulary matches tool_decision OTel ' +
        'events (monitoring-usage docs).',
    ),
)

export const PermissionResultSchema = lazySchema(() =>
  z.union([
    z.object({
      behavior: z.literal('allow'),
      // Optional - may not be provided if hook sets permission without input modification
      updatedInput: z.record(z.string(), z.unknown()).optional(),
      updatedPermissions: z.array(PermissionUpdateSchema()).optional(),
      toolUseID: z.string().optional(),
      decisionClassification:
        PermissionDecisionClassificationSchema().optional(),
    }),
    z.object({
      behavior: z.literal('deny'),
      message: z.string(),
      interrupt: z.boolean().optional(),
      toolUseID: z.string().optional(),
      decisionClassification:
        PermissionDecisionClassificationSchema().optional(),
    }),
  ]),
)

export const PermissionModeSchema = lazySchema(() =>
  z
    .enum(['default', 'acceptEdits', 'bypassPermissions', 'plan', 'dontAsk'])
    .describe(
      'Permission mode for controlling how tool executions are handled. ' +
        "'default' - Standard behavior, prompts for dangerous operations. " +
        "'acceptEdits' - Auto-accept file edit operations. " +
        "'bypassPermissions' - Bypass all permission checks (requires allowDangerouslySkipPermissions). " +
        "'plan' - Planning mode, no actual tool execution. " +
        "'dontAsk' - Don't prompt for permissions, deny if not pre-approved.",
    ),
)


// ============================================================================
// Hook Types
// ============================================================================

import {HOOK_EVENTS} from '../../utils/hooks/officialHookOutput287/events.js'
export {HOOK_EVENTS}

export const HookEventSchema = lazySchema(() => z.enum(HOOK_EVENTS))

export const BaseHookInputSchema = lazySchema(() =>
  z.object({
    session_id: z.string(),
    transcript_path: z.string(),
    cwd: z.string(),
    permission_mode: z.string().optional(),
    agent_id: z
      .string()
      .optional()
      .describe(
        'Subagent identifier. Present only when the hook fires from within a subagent ' +
          '(e.g., a tool called by an AgentTool worker). Absent for the main thread, ' +
          'even in --agent sessions. Use this field (not agent_type) to distinguish ' +
          'subagent calls from main-thread calls.',
      ),
    agent_type: z
      .string()
      .optional()
      .describe(
        'Agent type name (e.g., "general-purpose", "code-reviewer"). Present when the ' +
          'hook fires from within a subagent (alongside agent_id), or on the main thread ' +
          'of a session started with --agent (without agent_id).',
      ),
  }),
)

// Use .and() instead of .extend() to preserve BaseHookInput & {...} in generated types
export const PreToolUseHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('PreToolUse'),
      tool_name: z.string(),
      tool_input: z.unknown(),
      tool_use_id: z.string(),
    }),
  ),
)

export const PermissionRequestHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('PermissionRequest'),
      tool_name: z.string(),
      tool_input: z.unknown(),
      permission_suggestions: z.array(PermissionUpdateSchema()).optional(),
    }),
  ),
)

export const PostToolUseHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('PostToolUse'),
      tool_name: z.string(),
      tool_input: z.unknown(),
      tool_response: z.unknown(),
      tool_use_id: z.string(),
    }),
  ),
)

export const PostToolUseFailureHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('PostToolUseFailure'),
      tool_name: z.string(),
      tool_input: z.unknown(),
      tool_use_id: z.string(),
      error: z.string(),
      is_interrupt: z.boolean().optional(),
    }),
  ),
)

export const PermissionDeniedHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('PermissionDenied'),
      tool_name: z.string(),
      tool_input: z.unknown(),
      tool_use_id: z.string(),
      reason: z.string(),
    }),
  ),
)

export const NotificationHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('Notification'),
      message: z.string(),
      title: z.string().optional(),
      notification_type: z.string(),
    }),
  ),
)

export const UserPromptSubmitHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('UserPromptSubmit'),
      prompt: z.string(),
    }),
  ),
)

export const SessionStartHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('SessionStart'),
      source: z.enum(['startup', 'resume', 'clear', 'compact']),
      agent_type: z.string().optional(),
      model: z.string().optional(),
    }),
  ),
)

export const SetupHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('Setup'),
      trigger: z.enum(['init', 'maintenance']),
    }),
  ),
)

export const StopHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('Stop'),
      stop_hook_active: z.boolean(),
      last_assistant_message: z
        .string()
        .optional()
        .describe(
          'Text content of the last assistant message before stopping. ' +
            'Avoids the need to read and parse the transcript file.',
        ),
    }),
  ),
)

export const StopFailureHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('StopFailure'),
      error: SDKAssistantMessageErrorSchema(),
      error_details: z.string().optional(),
      last_assistant_message: z.string().optional(),
    }),
  ),
)

export const SubagentStartHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('SubagentStart'),
      agent_id: z.string(),
      agent_type: z.string(),
    }),
  ),
)

export const SubagentStopHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('SubagentStop'),
      stop_hook_active: z.boolean(),
      agent_id: z.string(),
      agent_transcript_path: z.string(),
      agent_type: z.string(),
      last_assistant_message: z
        .string()
        .optional()
        .describe(
          'Text content of the last assistant message before stopping. ' +
            'Avoids the need to read and parse the transcript file.',
        ),
    }),
  ),
)

export const PreCompactHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('PreCompact'),
      trigger: z.enum(['manual', 'auto']),
      custom_instructions: z.string().nullable(),
    }),
  ),
)

export const PostCompactHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('PostCompact'),
      trigger: z.enum(['manual', 'auto']),
      compact_summary: z
        .string()
        .describe('The conversation summary produced by compaction'),
    }),
  ),
)

export const TeammateIdleHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('TeammateIdle'),
      teammate_name: z.string(),
      team_name: z.string(),
    }),
  ),
)

export const TaskCreatedHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('TaskCreated'),
      task_id: z.string(),
      task_subject: z.string(),
      task_description: z.string().optional(),
      teammate_name: z.string().optional(),
      team_name: z.string().optional(),
    }),
  ),
)

export const TaskCompletedHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('TaskCompleted'),
      task_id: z.string(),
      task_subject: z.string(),
      task_description: z.string().optional(),
      teammate_name: z.string().optional(),
      team_name: z.string().optional(),
    }),
  ),
)

export const ElicitationHookInputSchema = lazySchema(() =>
  BaseHookInputSchema()
    .and(
      z.object({
        hook_event_name: z.literal('Elicitation'),
        mcp_server_name: z.string(),
        message: z.string(),
        mode: z.enum(['form', 'url']).optional(),
        url: z.string().optional(),
        elicitation_id: z.string().optional(),
        requested_schema: z.record(z.string(), z.unknown()).optional(),
      }),
    )
    .describe(
      'Hook input for the Elicitation event. Fired when an MCP server requests user input. Hooks can auto-respond (accept/decline) instead of showing the dialog.',
    ),
)

export const ElicitationResultHookInputSchema = lazySchema(() =>
  BaseHookInputSchema()
    .and(
      z.object({
        hook_event_name: z.literal('ElicitationResult'),
        mcp_server_name: z.string(),
        elicitation_id: z.string().optional(),
        mode: z.enum(['form', 'url']).optional(),
        action: z.enum(['accept', 'decline', 'cancel']),
        content: z.record(z.string(), z.unknown()).optional(),
      }),
    )
    .describe(
      'Hook input for the ElicitationResult event. Fired after the user responds to an MCP elicitation. Hooks can observe or override the response before it is sent to the server.',
    ),
)

export const CONFIG_CHANGE_SOURCES = [
  'user_settings',
  'project_settings',
  'local_settings',
  'policy_settings',
  'skills',
] as const

export const ConfigChangeHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('ConfigChange'),
      source: z.enum(CONFIG_CHANGE_SOURCES),
      file_path: z.string().optional(),
    }),
  ),
)

export const INSTRUCTIONS_LOAD_REASONS = [
  'session_start',
  'nested_traversal',
  'path_glob_match',
  'include',
  'compact',
] as const

export const INSTRUCTIONS_MEMORY_TYPES = [
  'User',
  'Project',
  'Local',
  'Managed',
] as const

export const InstructionsLoadedHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('InstructionsLoaded'),
      file_path: z.string(),
      memory_type: z.enum(INSTRUCTIONS_MEMORY_TYPES),
      load_reason: z.enum(INSTRUCTIONS_LOAD_REASONS),
      globs: z.array(z.string()).optional(),
      trigger_file_path: z.string().optional(),
      parent_file_path: z.string().optional(),
    }),
  ),
)

export const WorktreeCreateHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('WorktreeCreate'),
      name: z.string(),
    }),
  ),
)

export const WorktreeRemoveHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('WorktreeRemove'),
      worktree_path: z.string(),
    }),
  ),
)

export const CwdChangedHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('CwdChanged'),
      old_cwd: z.string(),
      new_cwd: z.string(),
    }),
  ),
)

export const FileChangedHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('FileChanged'),
      file_path: z.string(),
      event: z.enum(['change', 'add', 'unlink']),
    }),
  ),
)

export const EXIT_REASONS = [
  'clear',
  'resume',
  'logout',
  'prompt_input_exit',
  'other',
  'bypass_permissions_disabled',
] as const

export const ExitReasonSchema = lazySchema(() => z.enum(EXIT_REASONS))

export const SessionEndHookInputSchema = lazySchema(() =>
  BaseHookInputSchema().and(
    z.object({
      hook_event_name: z.literal('SessionEnd'),
      reason: ExitReasonSchema(),
    }),
  ),
)

export const HookInputSchema = lazySchema(() =>
  z.union([
    PreToolUseHookInputSchema(),
    PostToolUseHookInputSchema(),
    PostToolUseFailureHookInputSchema(),
    PermissionDeniedHookInputSchema(),
    NotificationHookInputSchema(),
    UserPromptSubmitHookInputSchema(),
    SessionStartHookInputSchema(),
    SessionEndHookInputSchema(),
    StopHookInputSchema(),
    StopFailureHookInputSchema(),
    SubagentStartHookInputSchema(),
    SubagentStopHookInputSchema(),
    PreCompactHookInputSchema(),
    PostCompactHookInputSchema(),
    PermissionRequestHookInputSchema(),
    SetupHookInputSchema(),
    TeammateIdleHookInputSchema(),
    TaskCreatedHookInputSchema(),
    TaskCompletedHookInputSchema(),
    ElicitationHookInputSchema(),
    ElicitationResultHookInputSchema(),
    ConfigChangeHookInputSchema(),
    InstructionsLoadedHookInputSchema(),
    WorktreeCreateHookInputSchema(),
    WorktreeRemoveHookInputSchema(),
    CwdChangedHookInputSchema(),
    FileChangedHookInputSchema(),
  ]),
)

// All output entrypoints share complete original AJ/TJ/rJ, not a legacy union.
const originalHookOutputSchemas287=createHookOutputSchemas287(()=>PermissionUpdateSchema())
export const AsyncHookJSONOutputSchema=originalHookOutputSchemas287.async
export const SyncHookJSONOutputSchema=originalHookOutputSchemas287.sync
export const HookJSONOutputSchema=originalHookOutputSchemas287.output
export const PreToolUseHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PreToolUse'))
export const UserPromptSubmitHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('UserPromptSubmit'))
export const UserPromptExpansionHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('UserPromptExpansion'))
export const SessionStartHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('SessionStart'))
export const SetupHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('Setup'))
export const PreModelSwitchHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PreModelSwitch'))
export const PostModelSwitchHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PostModelSwitch'))
export const SubagentStartHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('SubagentStart'))
export const PostToolUseHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PostToolUse'))
export const PostToolUseFailureHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PostToolUseFailure'))
export const PostToolBatchHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PostToolBatch'))
export const StopHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('Stop'))
export const SubagentStopHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('SubagentStop'))
export const PermissionDeniedHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PermissionDenied'))
export const NotificationHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('Notification'))
export const PermissionRequestHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('PermissionRequest'))
export const ElicitationHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('Elicitation'))
export const ElicitationResultHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('ElicitationResult'))
export const CwdChangedHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('CwdChanged'))
export const FileChangedHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('FileChanged'))
export const WorktreeCreateHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('WorktreeCreate'))
export const MessageDisplayHookSpecificOutputSchema=lazySchema(()=>originalHookOutputSchemas287.specific('MessageDisplay'))

export const PromptRequestOptionSchema = lazySchema(() =>
  z.object({
    key: z
      .string()
      .describe('Unique key for this option, returned in the response'),
    label: z.string().describe('Display text for this option'),
    description: z
      .string()
      .optional()
      .describe('Optional description shown below the label'),
  }),
)

export const PromptRequestSchema = lazySchema(() =>
  z.object({
    prompt: z
      .string()
      .describe(
        'Request ID. Presence of this key marks the line as a prompt request.',
      ),
    message: z.string().describe('The prompt message to display to the user'),
    options: z
      .array(PromptRequestOptionSchema())
      .describe('Available options for the user to choose from'),
  }),
)

export const PromptResponseSchema = lazySchema(() =>
  z.object({
    prompt_response: z
      .string()
      .describe('The request ID from the corresponding prompt request'),
    selected: z.string().describe('The key of the selected option'),
  }),
)

// ============================================================================
// Skill/Command Types
// ============================================================================

export const SlashCommandSchema = lazySchema(() =>
  z
    .object({
      name: z.string().describe('Skill name (without the leading slash)'),
      aliases: z.array(z.string()).optional(),
      builtin: z.boolean().optional(),
      description: z.string().describe('Description of what the skill does'),
      argumentHint: z
        .string()
        .describe('Hint for skill arguments (e.g., "<file>")'),
    })
    .describe(
      'Information about an available skill (invoked via /command syntax).',
    ),
)

export const AgentInfoSchema = lazySchema(() =>
  z
    .object({
      name: z.string().describe('Agent type identifier (e.g., "Explore")'),
      description: z.string().describe('Description of when to use this agent'),
      model: z
        .string()
        .optional()
        .describe(
          "Model alias this agent uses. If omitted, inherits the parent's model",
        ),
    })
    .describe(
      'Information about an available subagent that can be invoked via the Task tool.',
    ),
)

export const ModelInfoSchema = lazySchema(() =>
  z
    .object({
      value: z.string().describe('Model identifier to use in API calls'),
      resolvedModel: z.string().optional(),
      promoListPrice: z.string().optional(),
      disabled: z.boolean().optional(),
      displayName: z.string().describe('Human-readable display name'),
      description: z
        .string()
        .describe("Description of the model's capabilities"),
      supportsEffort: z
        .boolean()
        .optional()
        .describe('Whether this model supports effort levels'),
      supportedEffortLevels: z
        .array(z.enum(['low', 'medium', 'high', 'xhigh', 'max']))
        .optional()
        .describe('Available effort levels for this model'),
      supportsAdaptiveThinking: z
        .boolean()
        .optional()
        .describe(
          'Whether this model supports adaptive thinking (Claude decides when and how much to think)',
        ),
      supportsFastMode: z
        .boolean()
        .optional()
        .describe('Whether this model supports fast mode'),
      supportsAutoMode: z
        .boolean()
        .optional()
        .describe('Whether this model supports auto mode'),
    })
    .describe('Information about an available model.'),
)

export const AccountInfoSchema = lazySchema(() =>
  z
    .object({
      email: z.string().optional(),
      organization: z.string().optional(),
      subscriptionType: z.string().optional(),
      tokenSource: z.string().optional(),
      apiKeySource: z.string().optional(),
      apiProvider: z
        .enum(['firstParty', 'bedrock', 'vertex', 'foundry', 'anthropicGoogleCloud'])
        .optional()
        .describe(
          'Active API backend. Anthropic OAuth login only applies when "firstParty"; for 3P providers the other fields are absent and auth is external (AWS creds, gcloud ADC, etc.).',
        ),
    })
    .describe("Information about the logged in user's account."),
)

// ============================================================================
// Agent Definition Types
// ============================================================================

export const AgentMcpServerSpecSchema = lazySchema(() =>
  z.union([
    z.string(),
    z.record(z.string(), McpServerConfigForProcessTransportSchema()),
  ]),
)

export const AgentDefinitionSchema = lazySchema(() =>
  z
    .object({
      description: z
        .string()
        .describe('Natural language description of when to use this agent'),
      tools: z
        .array(z.string())
        .optional()
        .describe(
          'Array of allowed tool names. If omitted, inherits all tools from parent',
        ),
      disallowedTools: z
        .array(z.string())
        .optional()
        .describe('Array of tool names to explicitly disallow for this agent'),
      prompt: z.string().describe("The agent's system prompt"),
      model: z
        .string()
        .optional()
        .describe(
          "Model alias (e.g. 'sonnet', 'opus', 'haiku', 'fable') or full model ID (e.g. 'claude-opus-5-5'). If omitted or 'inherit', uses the main model",
        ),
      mcpServers: z.array(AgentMcpServerSpecSchema()).optional(),
      criticalSystemReminder_EXPERIMENTAL: z
        .string()
        .optional()
        .describe('Experimental: Critical reminder added to system prompt'),
      skills: z
        .array(z.string())
        .optional()
        .describe('Array of skill names to preload into the agent context'),
      initialPrompt: z
        .string()
        .optional()
        .describe(
          'Auto-submitted as the first user turn when this agent is the main thread agent. Slash commands are processed. Prepended to any user-provided prompt.',
        ),
      maxTurns: z
        .number()
        .int()
        .positive()
        .optional()
        .describe(
          'Maximum number of agentic turns (API round-trips) before stopping',
        ),
      background: z
        .boolean()
        .optional()
        .describe(
          'Run this agent as a background task (non-blocking, fire-and-forget) when invoked',
        ),
      memory: z
        .enum(['user', 'project', 'local'])
        .optional()
        .describe(
          "Scope for auto-loading agent memory files. 'user' - ~/.claude/agent-memory/<agentType>/, 'project' - .claude/agent-memory/<agentType>/, 'local' - .claude/agent-memory-local/<agentType>/",
        ),
      effort: z
        .union([
          z.enum(['low', 'medium', 'high', 'xhigh', 'max']),
          z.number().int(),
        ])
        .optional()
        .describe(
          'Reasoning effort level for this agent. Either a named level or an integer',
        ),
      permissionMode: PermissionModeSchema()
        .optional()
        .describe(
          'Permission mode controlling how tool executions are handled',
        ),
    })
    .describe(
      'Definition for a custom subagent that can be invoked via the Agent tool.',
    ),
)

// ============================================================================
// Settings Types
// ============================================================================

export const SettingSourceSchema = lazySchema(() =>
  z
    .enum(['user', 'project', 'local'])
    .describe(
      'Source for loading filesystem-based settings. ' +
        "'user' - Global user settings (~/.claude/settings.json). " +
        "'project' - Project settings (.claude/settings.json). " +
        "'local' - Local settings (.claude/settings.local.json).",
    ),
)

export const SdkPluginConfigSchema = lazySchema(() =>
  z
    .object({
      type: z
        .literal('local')
        .describe("Plugin type. Currently only 'local' is supported"),
      path: z
        .string()
        .describe('Absolute or relative path to the plugin directory'),
    })
    .describe('Configuration for loading a plugin.'),
)

// ============================================================================
// Rewind Types
// ============================================================================

export const RewindFilesResultSchema = lazySchema(() =>
  z
    .object({
      canRewind: z.boolean(),
      error: z.string().optional(),
      filesChanged: z.array(z.string()).optional(),
      insertions: z.number().optional(),
      deletions: z.number().optional(),
    })
    .describe('Result of a rewindFiles operation.'),
)

// ============================================================================
// External Type Placeholders
// ============================================================================
//
// These schemas use z.unknown() as placeholders for external types.
// The generation script uses TypeOverrideMap to output the correct TS type references.
// This allows us to define SDK message types in Zod while maintaining proper typing.

/** Placeholder for APIUserMessage from @anthropic-ai/sdk */
export const APIUserMessagePlaceholder = lazySchema(() => z.unknown())

/** Placeholder for APIAssistantMessage from @anthropic-ai/sdk */
export const APIAssistantMessagePlaceholder = lazySchema(() => z.unknown())

/** Placeholder for RawMessageStreamEvent from @anthropic-ai/sdk */
export const RawMessageStreamEventPlaceholder = lazySchema(() => z.unknown())

/** Placeholder for UUID from crypto */
export const UUIDPlaceholder = lazySchema(() => z.string())

/** Placeholder for NonNullableUsage (mapped type over Usage) */
export const NonNullableUsagePlaceholder = lazySchema(() => z.unknown())

// ============================================================================
// SDK Message Types
// ============================================================================

export const SDKAssistantMessageErrorSchema = lazySchema(() =>
  z.enum([
    'authentication_failed',
    'oauth_org_not_allowed',
    'account_on_hold',
    'verification_required',
    'billing_error',
    'rate_limit',
    'overloaded',
    'invalid_request',
    'model_not_found',
    'server_error',
    'unknown',
    'max_output_tokens',
    'cloud_credential_error',
  ]),
)

export const SDKStatusSchema = lazySchema(() =>
  z.union([z.literal('compacting'), z.literal('requesting'), z.null()]),
)

// SDKUserMessage content without uuid/session_id
const SDKUserMessageContentSchema = lazySchema(() =>
  z.object({
    type: z.literal('user'),
    message: APIUserMessagePlaceholder(),
    parent_tool_use_id: z.string().nullable(),
    local_web_literal: z.boolean().optional(),
    isSynthetic: z.boolean().optional(),
    tool_use_result: z.unknown().optional(),
    priority: z.enum(['now', 'next', 'later']).optional(),
    timestamp: z
      .string()
      .optional()
      .describe(
        'ISO timestamp when the message was created on the originating process. Older emitters omit it; consumers should fall back to receive time.',
      ),
  }),
)

export const SDKUserMessageSchema = lazySchema(() =>
  SDKUserMessageContentSchema().extend({
    uuid: UUIDPlaceholder().optional(),
    session_id: z.string().optional(),
  }),
)

export const SDKUserMessageReplaySchema = lazySchema(() =>
  SDKUserMessageContentSchema().extend({
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
    isReplay: z.literal(true),
    local_web_command_output: z.literal('model').optional(),
  }),
)

export const SDKRateLimitInfoSchema = lazySchema(() =>
  z
    .object({
      status: z.enum(['allowed', 'allowed_warning', 'rejected']),
      resetsAt: z.number().optional(),
      rateLimitType: z
        .enum([
          'five_hour',
          'seven_day',
          'seven_day_opus',
          'seven_day_sonnet',
          'overage',
        ])
        .optional(),
      utilization: z.number().optional(),
      overageStatus: z
        .enum(['allowed', 'allowed_warning', 'rejected'])
        .optional(),
      overageResetsAt: z.number().optional(),
      overageDisabledReason: z
        .enum([
          'overage_not_provisioned',
          'org_level_disabled',
          'org_level_disabled_until',
          'out_of_credits',
          'seat_tier_level_disabled',
          'member_level_disabled',
          'seat_tier_zero_credit_limit',
          'group_zero_credit_limit',
          'member_zero_credit_limit',
          'org_service_level_disabled',
          'org_service_zero_credit_limit',
          'no_limits_configured',
          'unknown',
        ])
        .optional(),
      isUsingOverage: z.boolean().optional(),
      surpassedThreshold: z.number().optional(),
    })
    .describe('Rate limit information for claude.ai subscription users.'),
)

export const SDKAssistantMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('assistant'),
    message: APIAssistantMessagePlaceholder(),
    parent_tool_use_id: z.string().nullable(),
    error: SDKAssistantMessageErrorSchema().optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKRateLimitEventSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('rate_limit_event'),
      rate_limit_info: SDKRateLimitInfoSchema(),
      uuid: UUIDPlaceholder(),
      session_id: z.string(),
    })
    .describe('Rate limit event emitted when rate limit info changes.'),
)

export const SDKStreamlinedTextMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('streamlined_text'),
      text: z
        .string()
        .describe('Text content preserved from the assistant message'),
      session_id: z.string(),
      uuid: UUIDPlaceholder(),
    })
    .describe(
      '@internal Streamlined text message - replaces SDKAssistantMessage in streamlined output. Text content preserved, thinking and tool_use blocks removed.',
    ),
)

export const SDKStreamlinedToolUseSummaryMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('streamlined_tool_use_summary'),
      tool_summary: z
        .string()
        .describe('Summary of tool calls (e.g., "Read 2 files, wrote 1 file")'),
      session_id: z.string(),
      uuid: UUIDPlaceholder(),
    })
    .describe(
      '@internal Streamlined tool use summary - replaces tool_use blocks in streamlined output with a cumulative summary string.',
    ),
)

export const SDKPermissionDenialSchema = lazySchema(() =>
  z.object({
    tool_name: z.string(),
    tool_use_id: z.string(),
    tool_input: z.record(z.string(), z.unknown()),
  }),
)

const resultSchemas287=createResultSchemas287({f:lazySchema,u:z.object,x:z.literal,o:z.string,C:z.number,H:z.boolean,se:z.unknown,T:z.array,de:z.record,B:z.enum,Fe:z.union,Wo:z.discriminatedUnion,Ve:z.strictObject,pt:z.looseObject})
export const SDKResultSuccessSchema = resultSchemas287.success
export const SDKResultErrorSchema = resultSchemas287.error

export const SDKResultMessageSchema = lazySchema(() =>
  z.union([SDKResultSuccessSchema(), SDKResultErrorSchema()]),
)

export const SDKSystemMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('init'),
    capabilities: z.array(z.string()).optional(),
    agents: z.array(z.string()).optional(),
    apiKeySource: ApiKeySourceSchema(),
    betas: z.array(z.string()).optional(),
    claude_code_version: z.string(),
    cwd: z.string(),
    tools: z.array(z.string()),
    mcp_servers: z.array(
      z.object({
        name: z.string(),
        status: z.string(),
      }),
    ),
    model: z.string(),
    permissionMode: z.union([PermissionModeSchema(), z.literal('auto')]), // Local SDK system/init enhancement.
    slash_commands: z.array(z.string()),
    output_style: z.string(),
    skills: z.array(z.string()),
    plugins: z.array(
      z.object({
        name: z.string(),
        path: z.string(),
        source: z
          .string()
          .optional()
          .describe(
            '@internal Plugin source identifier in "name\\@marketplace" format. Sentinels: "name\\@inline" for --plugin-dir, "name\\@builtin" for built-in plugins.',
          ),
      }),
    ),
    fast_mode_state: FastModeStateSchema().optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKPartialAssistantMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('stream_event'),
    event: RawMessageStreamEventPlaceholder(),
    parent_tool_use_id: z.string().nullable(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKCompactBoundaryMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('compact_boundary'),
    compact_metadata: z.object({
      trigger: z.enum(['manual', 'auto']),
      pre_tokens: z.number(),
      preserved_segment: z
        .object({
          head_uuid: UUIDPlaceholder(),
          anchor_uuid: UUIDPlaceholder(),
          tail_uuid: UUIDPlaceholder(),
        })
        .optional()
        .describe(
          'Relink info for messagesToKeep. Loaders splice the preserved ' +
            'segment at anchor_uuid (summary for suffix-preserving, ' +
            'boundary for prefix-preserving partial compact) so resume ' +
            'includes preserved content. Unset when compaction summarizes ' +
            'everything (no messagesToKeep).',
        ),
    }),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKStatusMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('status'),
    status: SDKStatusSchema(),
    permissionMode: z.union([PermissionModeSchema(), z.literal('auto')]).optional(), // Local SDK mode status.
    compact_result: z.enum(['success', 'failed']).optional(),
    compact_error: z.string().optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKPostTurnSummaryMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('system'),
      subtype: z.literal('post_turn_summary'),
      summarizes_uuid: z.string(),
      status_category: z.enum([
        'blocked',
        'waiting',
        'completed',
        'review_ready',
        'failed',
      ]),
      status_detail: z.string(),
      is_noteworthy: z.boolean(),
      title: z.string(),
      description: z.string(),
      recent_action: z.string(),
      needs_action: z.string(),
      artifact_urls: z.array(z.string()),
      uuid: UUIDPlaceholder(),
      session_id: z.string(),
    })
    .describe(
      '@internal Background post-turn summary emitted after each assistant turn. summarizes_uuid points to the assistant message this summarizes.',
    ),
)

export const SDKAPIRetryMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('system'),
      subtype: z.literal('api_retry'),
      attempt: z.number(),
      max_retries: z.number(),
      retry_delay_ms: z.number(),
      error_status: z.number().nullable(),
      error: SDKAssistantMessageErrorSchema(),
      no_response: z.object({
        waited_ms: z.number(),
        retry_wait_ms: z.number(),
      }).optional(),
      uuid: UUIDPlaceholder(),
      session_id: z.string(),
    })
    .describe(
      'Emitted when an API request fails with a retryable error and will be retried after a delay. error_status is null for connection errors (e.g. timeouts) that had no HTTP response.',
    ),
)

export const SDKLocalCommandOutputMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('system'),
      subtype: z.literal('local_command_output'),
      content: z.string(),
      uuid: UUIDPlaceholder(),
      session_id: z.string(),
    })
    .describe(
      'Output from a local slash command (e.g. /voice, /cost). Displayed as assistant-style text in the transcript.',
    ),
)

export const SDKHookStartedMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('hook_started'),
    hook_id: z.string(),
    hook_name: z.string(),
    hook_event: z.string(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKHookProgressMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('hook_progress'),
    hook_id: z.string(),
    hook_name: z.string(),
    hook_event: z.string(),
    stdout: z.string(),
    stderr: z.string(),
    output: z.string(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKHookResponseMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('hook_response'),
    hook_id: z.string(),
    hook_name: z.string(),
    hook_event: z.string(),
    output: z.string(),
    stdout: z.string(),
    stderr: z.string(),
    exit_code: z.number().optional(),
    outcome: z.enum(['success', 'error', 'cancelled']),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKToolProgressMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('tool_progress'),
    tool_use_id: z.string(),
    tool_name: z.string(),
    parent_tool_use_id: z.string().nullable(),
    elapsed_time_seconds: z.number(),
    task_id: z.string().optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKAuthStatusMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('auth_status'),
    isAuthenticating: z.boolean(),
    output: z.array(z.string()),
    error: z.string().optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKFilesPersistedEventSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('files_persisted'),
    files: z.array(
      z.object({
        filename: z.string(),
        file_id: z.string(),
      }),
    ),
    failed: z.array(
      z.object({
        filename: z.string(),
        error: z.string(),
      }),
    ),
    processed_at: z.string(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKTaskNotificationMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('task_notification'),
    task_id: z.string(),
    tool_use_id: z.string().optional(),
    status: z.enum(['completed', 'failed', 'stopped']),
    output_file: z.string(),
    summary: z.string(),
    usage: z
      .object({
        total_tokens: z.number(),
        tool_uses: z.number(),
        duration_ms: z.number(),
      })
      .optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKTaskStartedMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('task_started'),
    task_id: z.string(),
    tool_use_id: z.string().optional(),
    description: z.string(),
    task_type: z.string().optional(),
    workflow_name: z
      .string()
      .optional()
      .describe(
        "meta.name from the workflow script (e.g. 'spec'). Only set when task_type is 'local_workflow'.",
      ),
    prompt: z.string().optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKSessionStateChangedMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('system'),
      subtype: z.literal('session_state_changed'),
      state: z.enum(['idle', 'running', 'requires_action']),
      uuid: UUIDPlaceholder(),
      session_id: z.string(),
    })
    .describe(
      "Mirrors notifySessionStateChanged. 'idle' fires after heldBackResult flushes and the bg-agent do-while exits — authoritative turn-over signal.",
    ),
)


export const SDKTaskProgressMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('system'),
    subtype: z.literal('task_progress'),
    task_id: z.string(),
    tool_use_id: z.string().optional(),
    description: z.string(),
    usage: z.object({
      total_tokens: z.number(),
      tool_uses: z.number(),
      duration_ms: z.number(),
    }),
    last_tool_name: z.string().optional(),
    summary: z.string().optional(),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKToolUseSummaryMessageSchema = lazySchema(() =>
  z.object({
    type: z.literal('tool_use_summary'),
    summary: z.string(),
    preceding_tool_use_ids: z.array(z.string()),
    uuid: UUIDPlaceholder(),
    session_id: z.string(),
  }),
)

export const SDKElicitationCompleteMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('system'),
      subtype: z.literal('elicitation_complete'),
      mcp_server_name: z.string(),
      elicitation_id: z.string(),
      uuid: UUIDPlaceholder(),
      session_id: z.string(),
    })
    .describe(
      'Emitted when an MCP server confirms that a URL-mode elicitation is complete.',
    ),
)

/** @internal */
export const SDKPromptSuggestionMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('prompt_suggestion'),
      suggestion: z.string(),
      uuid: UUIDPlaceholder(),
      session_id: z.string(),
    })
    .describe(
      'Predicted next user prompt, emitted after each turn when promptSuggestions is enabled.',
    ),
)

// ============================================================================
// Session Listing Types
// ============================================================================

export const SDKSessionInfoSchema = lazySchema(() =>
  z
    .object({
      sessionId: z.string().describe('Unique session identifier (UUID).'),
      summary: z
        .string()
        .describe(
          'Display title for the session: custom title, auto-generated summary, or first prompt.',
        ),
      lastModified: z
        .number()
        .describe('Last modified time in milliseconds since epoch.'),
      fileSize: z
        .number()
        .optional()
        .describe(
          'File size in bytes. Only populated for local JSONL storage.',
        ),
      customTitle: z
        .string()
        .optional()
        .describe('User-set session title via /rename.'),
      firstPrompt: z
        .string()
        .optional()
        .describe('First meaningful user prompt in the session.'),
      gitBranch: z
        .string()
        .optional()
        .describe('Git branch at the end of the session.'),
      cwd: z.string().optional().describe('Working directory for the session.'),
      tag: z.string().optional().describe('User-set session tag.'),
      createdAt: z
        .number()
        .optional()
        .describe(
          "Creation time in milliseconds since epoch, extracted from the first entry's timestamp.",
        ),
    })
    .describe('Session metadata returned by listSessions and getSessionInfo.'),
)

// Official 2.1.283 chunk-9r9kpwh0:on. Control state, not a transcript entry.
export const SDKActiveGoalMessageSchema = lazySchema(() => z.object({
  type: z.literal('active_goal'),
  value: z.object({condition: z.string(), iterations: z.number().int(), set_at: z.number().int(),
    tokens_at_start: z.number().int(), last_reason: z.string().optional()}).nullable(),
  uuid: UUIDPlaceholder(), session_id: z.string(),
}))

// Official 2.1.283 conversation-reset bookend; not a transcript message.
export const SDKConversationResetMessageSchema = lazySchema(() => z.object({
  type: z.literal('conversation_reset'),
  new_conversation_id: UUIDPlaceholder(),
  uuid: UUIDPlaceholder(),
  session_id: z.string(),
  trigger: z.enum(['clear', 'plan_mode_exit', 'fresh_session', 'onboarding']).optional(),
  user_message_uuid: z.string().optional(),
  timestamp: z.string().optional(),
}))

export const SDKCommandsChangedMessageSchema = lazySchema(() => z.object({
  type: z.literal('system'),
  subtype: z.literal('commands_changed'),
  commands: z.array(SlashCommandSchema()),
  uuid: UUIDPlaceholder(),
  session_id: z.string(),
}))

const printUiWireSchemas287=createPrintUiWireSchemas287({f:lazySchema,u:z.object,x:z.literal,T:z.array,o:z.string,_:z.string,C:z.number,B:z.enum,H:z.boolean})
export const SDKAutocompactStateMessageSchema=createSdkAutocompactSchema287({f:lazySchema,u:z.object,x:z.literal,o:z.string,_:UUIDPlaceholder,C:z.number,B:z.enum,H:z.boolean})
export const SDKControlRequestProgressMessageSchema=createSdkControlProgressSchema287({f:lazySchema,u:z.object,x:z.literal,o:z.string,_:UUIDPlaceholder,C:z.number,B:z.enum})
export const SDKMessageSchema = lazySchema(() =>
  z.union([
    SDKAutocompactStateMessageSchema(),
    SDKControlRequestProgressMessageSchema(),
    SDKCommandsChangedMessageSchema(),
    SDKActiveGoalMessageSchema(),
    SDKConversationResetMessageSchema(),
    SDKAssistantMessageSchema(),
    SDKUserMessageSchema(),
    SDKUserMessageReplaySchema(),
    SDKResultMessageSchema(),
    SDKSystemMessageSchema(),
    SDKPartialAssistantMessageSchema(),
    SDKCompactBoundaryMessageSchema(),
    SDKStatusMessageSchema(),
    SDKAPIRetryMessageSchema(),
    SDKLocalCommandOutputMessageSchema(),
    SDKHookStartedMessageSchema(),
    SDKHookProgressMessageSchema(),
    SDKHookResponseMessageSchema(),
    SDKToolProgressMessageSchema(),
    SDKAuthStatusMessageSchema(),
    SDKTaskNotificationMessageSchema(),
    SDKTaskStartedMessageSchema(),
    SDKTaskProgressMessageSchema(),
    SDKSessionStateChangedMessageSchema(),
    SDKFilesPersistedEventSchema(),
    SDKToolUseSummaryMessageSchema(),
    SDKRateLimitEventSchema(),
    SDKElicitationCompleteMessageSchema(),
    SDKPromptSuggestionMessageSchema(),
    ...printUiWireSchemas287.map(schema=>schema()),
  ]),
)

export const FastModeStateSchema = lazySchema(() =>
  z
    .enum(['off', 'cooldown', 'on'])
    .describe(
      'Fast mode state: off, in cooldown after rate limit, or actively enabled.',
    ),
)
