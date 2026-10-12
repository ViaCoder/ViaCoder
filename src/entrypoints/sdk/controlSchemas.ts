import {getOriginalContextResponseSchema287} from '../../utils/contextAnalysis287.js'
import {publicControlRequestSchemas287} from './officialControlRequests287/runtime.js'
import {createMcpCallSchema287} from '../../cli/printOwnership287/mcpCallNative.js'
import {createMcpPermissionOverrideSchema287,type McpPermissionOverrideRequest287} from '../../cli/printOwnership287/mcpPermissionOverride287Native.js'
import {getPrintHostSource287} from '../../cli/printOwnership287/publicHostRuntime287.js'
import {createPrintClaimSchema287} from '../../cli/printOwnership287/native.js'
import {sharedThinkingControlSchema} from '../../server/sharedThinkingState.js'
import {initializeSkillsSchema287} from '../../services/context/officialSessionSkillAllowlist287/native.js'
import {sharedConfigControlSchema} from '../../server/sharedConfigState.js'
/**
 * SDK Control Schemas - Zod schemas for the control protocol.
 *
 * These schemas define the control protocol between SDK implementations and the CLI.
 * Used by SDK builders (e.g., Python SDK) to communicate with the CLI process.
 *
 * SDK consumers should use coreSchemas.ts instead.
 */

import { z } from 'zod/v4'
import {sharedEffortStateSchema} from '../../server/sharedEffortState.js'
import {AGENT_COLORS} from '../../tools/AgentTool/agentColorManager.js'
import { lazySchema } from '../../utils/lazySchema.js'
import {
  AccountInfoSchema,
  AgentDefinitionSchema,
  AgentInfoSchema,
  FastModeStateSchema,
  HookEventSchema,
  HookInputSchema,
  McpServerConfigForProcessTransportSchema,
  McpServerStatusSchema,
  ModelInfoSchema,
  PermissionModeSchema,
  PermissionUpdateSchema,
  SDKMessageSchema,
  SDKPostTurnSummaryMessageSchema,
  SDKStreamlinedTextMessageSchema,
  SDKStreamlinedToolUseSummaryMessageSchema,
  SDKUserMessageSchema,
  SlashCommandSchema,
} from './coreSchemas.js'

// ============================================================================
// External Type Placeholders
// ============================================================================

// JSONRPCMessage from @modelcontextprotocol/sdk - treat as unknown
export const JSONRPCMessagePlaceholder = lazySchema(() => z.unknown())

// ============================================================================
// Hook Callback Types
// ============================================================================

export const SDKHookCallbackMatcherSchema = lazySchema(() =>
  z
    .object({
      matcher: z.string().optional(),
      hookCallbackIds: z.array(z.string()),
      timeout: z.number().optional(),
    })
    .describe('Configuration for matching and routing hook callbacks.'),
)

// ============================================================================
// Control Request Types
// ============================================================================

export const SDKControlInitializeRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('initialize'),
      hooks: z
        .record(HookEventSchema(), z.array(SDKHookCallbackMatcherSchema()))
        .optional(),
      sdkMcpServers: z.array(z.string()).optional(),
      jsonSchema: z.record(z.string(), z.unknown()).optional(),
      systemPrompt: z.string().optional(),
      appendSystemPrompt: z.string().optional(),
      planModeInstructions: z.string().optional(),
      systemPromptSnapshot: z.boolean().optional(),
      appendSubagentSystemPrompt: z.string().optional(),
      excludeDynamicSections: z.boolean().optional(),
      plugins: z.array(z.object({type:z.literal('local'),path:z.string(),skipMcpDiscovery:z.boolean().optional()})).optional(),
      agents: z.record(z.string(), AgentDefinitionSchema()).optional(),
      skills: initializeSkillsSchema287,
      promptSuggestions: z.boolean().optional(),
      agentProgressSummaries: z.boolean().optional(),
      perTaskStopAffordance: z.boolean().optional().describe(
        'Declares that this consumer renders a per-task stop control wired to the `stop_task` control request, so the user can stop an individual background task. When declared, an interrupt on an open-input (interactive stream-json) session spares running background agents/workflows (Stop only aborts the turn). Closed-input exception: a one-shot run (string prompt / -p closes stdin) still kills hold-back tasks at the held-result release regardless of the declaration — with stdin closed, a stop_task control could never be delivered, so the fail-closed kill stands. ABSENCE also fails closed: the interrupt kills background tasks, since the user would otherwise have no way to stop a runaway one. First-attached-client-wins on multi-client sessions; later initializes do not change it.',
      ),
      // Official initialize ignores non-string title values after parsing;
      // runtime li/Uut handling performs the value check.
      title: z.unknown().optional(),
    })
    .describe(
      'Initializes the SDK session with hooks, MCP servers, and agent configuration.',
    ),
)

export const SDKControlInitializeResponseSchema = lazySchema(() =>
  z
    .object({
      commands: z.array(SlashCommandSchema()),
      agents: z.array(AgentInfoSchema()),
      output_style: z.string(),
      available_output_styles: z.array(z.string()),
      models: z.array(ModelInfoSchema()),
      unavailable_models: z.array(ModelInfoSchema()).optional(),
      account: AccountInfoSchema(),
      pid: z
        .number()
        .optional()
        .describe('@internal CLI process PID for tmux socket isolation'),
      fast_mode_state: FastModeStateSchema().optional(),
      // Local SDK enhancement: auto remains outside the official external enum.
      current_permission_mode: z.union([PermissionModeSchema(), z.literal('auto')]).optional(),
      user_output_styles_dir: z.string().optional(),
      hooks_applied: z.boolean().optional(),
      session_state: z.enum(['idle', 'running', 'requires_action']).optional(),
      local_web: z.object({version: z.literal(1), current_model:z.string().optional(), current_model_choice:z.string().optional(), agent_color:z.enum(AGENT_COLORS).nullable().optional(), effort_state:sharedEffortStateSchema.optional(), permission_modes: z.object({bypassPermissions:z.boolean(),auto:z.boolean()}).optional(), controls: z.array(z.enum([
        'local_update_permission_rules', 'local_get_session_title', 'local_public_diff', 'local_public_checkpoints', 'local_public_tasks',
        'local_public_export', 'local_public_branch', 'local_public_tag', 'local_public_memory', 'local_public_effort', 'local_public_color', 'local_public_config', 'local_public_thinking',
      ]))}).optional().describe('Local Web extension capabilities, not official SDK capabilities'),
    })
    .describe(
      'Response from session initialization with available commands, models, and account info.',
    ),
)

export const SDKControlInterruptRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('interrupt'),
      send_now: z.boolean().optional(),
      cancel_queued: z.boolean().optional(),
      message_uuid: z.string().optional(),
    })
    .describe('Interrupts the currently running conversation turn.'),
)


/** Complete original Ao; reuse the existing canonical schema owner. */
export const SDKControlPermissionRequestSchema = lazySchema(() =>
  (getPrintHostSource287('chunk-xep95vq1.js', 'Ao') as () => z.ZodType<import('./controlTypes.js').SDKControlPermissionRequest>)(),
)

export const SDKControlSetPermissionModeRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('set_permission_mode'),
      // Local SDK enhancement; runtime eligibility is checked by the real host.
      mode: z.union([PermissionModeSchema(), z.literal('auto')]),
      ultraplan: z
        .boolean()
        .optional()
        .describe('@internal CCR ultraplan session marker.'),
    })
    .describe('Sets the permission mode for tool execution handling.'),
)

export const SDKControlGetPlanRequestSchema = lazySchema(() =>
  z.object({ subtype: z.literal('get_plan') }),
)

/** Whole original hi. Schema retains the original enum; Qt enforces tightening. */
export const SDKControlSetMcpPermissionModeOverrideRequestSchema = createMcpPermissionOverrideSchema287({
 f:lazySchema,u:z.object,x:z.literal,o:z.string,
 ue:()=>{
  const schema=getPrintHostSource287('chunk-xep95vq1.js','ue') as ()=>z.ZodType<Exclude<McpPermissionOverrideRequest287['mode'],null>>
  return schema()
 },
})

export const SDKControlSetModelRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('set_model'),
      model: z.string().optional(),
    })
    .describe('Sets the model to use for subsequent conversation turns.'),
)

export const SDKControlSetMaxThinkingTokensRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('set_max_thinking_tokens'),
      max_thinking_tokens: z.number().nullable(),
    })
    .describe(
      'Sets the maximum number of thinking tokens for extended thinking.',
    ),
)

export const SDKControlMcpStatusRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('mcp_status'),
    })
    .describe('Requests the current status of all MCP server connections.'),
)

export const SDKControlMcpCallRequestSchema = createMcpCallSchema287({
  f:lazySchema,u:z.object,x:z.literal,o:z.string,de:z.record,se:z.unknown,C:z.number,T:z.array,
})

export const SDKControlMcpStatusResponseSchema = lazySchema(() =>
  z
    .object({
      mcpServers: z.array(McpServerStatusSchema()),
    })
    .describe(
      'Response containing the current status of all MCP server connections.',
    ),
)

export const SDKControlGetContextUsageRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('get_context_usage'),
      detail: z.enum(['summary', 'full']).optional(),
    })
    .describe(
      'Requests a breakdown of current context window usage by category.',
    ),
)

/** Full original bmt: forward-compatible defaults, category kinds, source
 * window and detailed accounting. Shared Web projection uses this same schema. */
export const SDKControlGetContextUsageResponseSchema = lazySchema(() =>
  getOriginalContextResponseSchema287(),
)

export const SDKControlRewindFilesRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('rewind_files'),
      user_message_id: z.string(),
      dry_run: z.boolean().optional(),
    })
    .describe('Rewinds file changes made since a specific user message.'),
)

export const SDKControlRewindFilesResponseSchema = lazySchema(() =>
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

export const SDKControlCancelAsyncMessageRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('cancel_async_message'),
      message_uuid: z.string(),
    })
    .describe(
      'Drops a pending async user message from the command queue by uuid. No-op if already dequeued for execution.',
    ),
)

export const SDKControlCancelAsyncMessageResponseSchema = lazySchema(() =>
  z
    .object({
      cancelled: z.boolean(),
    })
    .describe(
      'Result of a cancel_async_message operation. cancelled=false means the message was not in the queue (already dequeued or never enqueued).',
    ),
)

export const SDKControlSeedReadStateRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('seed_read_state'),
      path: z.string(),
      mtime: z.number(),
    })
    .describe(
      'Seeds the readFileState cache with a path+mtime entry. Use when a prior Read was removed from context (e.g. by snip) so Edit validation would fail despite the client having observed the Read. The mtime lets the CLI detect if the file changed since the seeded Read — same staleness check as the normal path.',
    ),
)

export const SDKHookCallbackRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('hook_callback'),
      callback_id: z.string(),
      input: HookInputSchema(),
      tool_use_id: z.string().optional(),
    })
    .describe('Delivers a hook callback with its input data.'),
)

export const SDKControlMcpMessageRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('mcp_message'),
      server_name: z.string(),
      message: JSONRPCMessagePlaceholder(),
    })
    .describe('Sends a JSON-RPC message to a specific MCP server.'),
)

export const SDKControlMcpSetServersRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('mcp_set_servers'),
      servers: z.record(z.string(), McpServerConfigForProcessTransportSchema()),
    })
    .describe('Replaces the set of dynamically managed MCP servers.'),
)

export const SDKControlMcpSetServersResponseSchema = lazySchema(() =>
  z
    .object({
      added: z.array(z.string()),
      removed: z.array(z.string()),
      errors: z.record(z.string(), z.string()),
    })
    .describe(
      'Result of replacing the set of dynamically managed MCP servers.',
    ),
)

export const SDKControlReloadPluginsRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('reload_plugins'),
    })
    .describe(
      'Reloads plugins from disk and returns the refreshed session components.',
    ),
)

export const SDKControlReloadPluginsResponseSchema = lazySchema(() =>
  z
    .object({
      commands: z.array(SlashCommandSchema()),
      agents: z.array(AgentInfoSchema()),
      plugins: z.array(
        z.object({
          name: z.string(),
          path: z.string(),
          source: z.string().optional(),
        }),
      ),
      mcpServers: z.array(McpServerStatusSchema()),
      error_count: z.number(),
    })
    .describe(
      'Refreshed commands, agents, plugins, and MCP server status after reload.',
    ),
)

export const SDKControlMcpReconnectRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('mcp_reconnect'),
      serverName: z.string(),
    })
    .describe('Reconnects a disconnected or failed MCP server.'),
)

export const SDKControlMcpToggleRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('mcp_toggle'),
      serverName: z.string(),
      enabled: z.boolean(),
    })
    .describe('Enables or disables an MCP server.'),
)


export const SDKControlStopTaskRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('stop_task'),
      // vt validates this at runtime to retain its exact error message.
      task_id: z.unknown(),
    })
    .describe('Stops a running task.'),
)

export const SDKControlBackgroundTasksRequestSchema = lazySchema(() =>
  z.object({ subtype: z.literal('background_tasks'), tool_use_id: z.string().optional() }),
)

export const SDKControlBackgroundTasksResponseSchema = lazySchema(() =>
  z.object({ backgrounded: z.boolean().optional() }),
)

export const SDKControlSetPromptSuggestionsPausedRequestSchema = lazySchema(() =>
  z.object({ subtype: z.literal('set_prompt_suggestions_paused'), paused: z.boolean() }),
)

export const SDKControlApplyFlagSettingsRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('apply_flag_settings'),
      settings: z.record(z.string(), z.unknown()),
    })
    .describe(
      'Merges the provided settings into the flag settings layer, updating the active configuration.',
    ),
)

export const SDKControlGetSettingsRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('get_settings'),
    })
    .describe(
      'Returns the effective merged settings and the raw per-source settings.',
    ),
)

export const SDKControlUpdateSettingsRequestSchema = lazySchema(() =>
  z.object({
    subtype: z.literal('update_settings'),
    source: z.enum(['localSettings', 'userSettings']),
    settings: z.record(z.string(), z.unknown()),
  }),
)

export const SDKControlGetSettingsResponseSchema = lazySchema(() =>
  z
    .object({
      effective: z.record(z.string(), z.unknown()),
      sources: z
        .array(
          z.object({
            source: z.enum([
              'userSettings',
              'projectSettings',
              'localSettings',
              'flagSettings',
              'policySettings',
            ]),
            settings: z.record(z.string(), z.unknown()),
          }),
        )
        .describe(
          'Ordered low-to-high priority — later entries override earlier ones.',
        ),
      applied: z
        .object({
          model: z.string(),
          // String levels only — numeric effort is ant-only and the
          // Zod→proto generator can't emit enum∪number unions.
          effort: z.enum(['low', 'medium', 'high', 'xhigh', 'max']).nullable(),
        })
        .optional()
        .describe(
          'Runtime-resolved values after env overrides, session state, and model-specific defaults are applied. Unlike `effective` (disk merge), these reflect what will actually be sent to the API.',
        ),
    })
    .describe(
      'Effective merged settings plus raw per-source settings in merge order.',
    ),
)

/** Official 2.1.283 _i; transport shape only, not a dialog orchestrator. */
export const SDKControlUserDialogRequestSchema = lazySchema(() =>
  z.object({
    subtype: z.literal('request_user_dialog'),
    dialog_kind: z.string(),
    payload: z.record(z.string(), z.unknown()),
    tool_use_id: z.string().optional(),
  }),
)

export const SDKControlElicitationRequestSchema = lazySchema(() =>
  z
    .object({
      subtype: z.literal('elicitation'),
      mcp_server_name: z.string(),
      message: z.string(),
      mode: z.enum(['form', 'url']).optional(),
      url: z.string().optional(),
      elicitation_id: z.string().optional(),
      requested_schema: z.record(z.string(), z.unknown()).optional(),
    })
    .describe(
      'Requests the SDK consumer to handle an MCP elicitation (user input request).',
    ),
)

export const SDKControlElicitationResponseSchema = lazySchema(() =>
  z
    .object({
      action: z.enum(['accept', 'decline', 'cancel']),
      content: z.record(z.string(), z.unknown()).optional(),
    })
    .describe('Response from the SDK consumer for an elicitation request.'),
)


// ============================================================================
// Control Request/Response Wrappers
// ============================================================================

export const SDKControlChromeBrowserHintsRequestSchema = lazySchema(() =>
  z.object({
    subtype: z.literal('set_chrome_browser_hints'),
    preferredDeviceId: z.string().regex(/^[A-Za-z0-9-]{1,64}$/).nullable().optional(),
    localDeviceIds: z.array(z.string().regex(/^[A-Za-z0-9-]{1,64}$/)).max(32),
    hostPlatform: z.enum(['darwin', 'win32', 'linux']).optional(),
  }),
)

export const SDKControlSessionInfoRequestSchema = lazySchema(() =>
  z.object({subtype: z.enum(['get_session_cost', 'list_models', 'get_binary_version'])}),
)

export const SDKControlUsageRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('get_usage'), skip_behaviors: z.boolean().optional()}),
)

export const SDKControlSideQuestionRequestSchema = lazySchema(() =>
  z.object({
    subtype: z.literal('side_question'),
    question: z.string(),
    history: z.array(z.object({
      question: z.string(), response: z.string(), fallback_notice: z.string().optional(),
    })).optional(),
  }),
)

export const SDKControlReadFileRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('read_file'), path: z.string(),
    max_bytes: z.number().optional(), encoding: z.string().optional()}),
)

export const SDKControlGetSkillsDialogRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('get_skills_dialog')}),
)

export const SDKControlGetSandboxDialogRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('get_sandbox_dialog')}),
)

// Keep runtime parameter validation in yt/handleRenameSession so malformed
// title/source/session_id receive the official error ordering and messages.
export const SDKControlRenameSessionRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('rename_session'), title: z.unknown(), source: z.unknown().optional(), session_id: z.unknown().optional()}),
)

/** Local Web controls; never forwarded as model API requests. */
export const LocalWebControlRequestSchema = lazySchema(() => z.union([
  sharedThinkingControlSchema,
  sharedConfigControlSchema,
  z.object({subtype: z.literal('local_update_permission_rules'), update: z.unknown()}),
  z.object({subtype: z.literal('local_get_session_title'), session_id: z.string().optional()}),
  z.object({subtype: z.literal('local_public_effort'), value:z.string().min(1).max(32).optional(), expectedModel:z.string().min(1).max(256).optional()}),
  z.object({subtype: z.literal('local_public_color'), color:z.union([z.enum(AGENT_COLORS),z.literal('default')]).optional()}),
  z.object({subtype: z.literal('local_public_diff'), path: z.string().min(1).max(4096).optional()}),
  z.object({subtype: z.literal('local_public_doctor')}),
  z.object({subtype: z.literal('local_public_checkpoints')}),
  z.object({subtype: z.literal('local_public_tasks')}),
  z.object({subtype: z.literal('local_public_export')}),
  z.object({subtype: z.literal('local_public_branch'), title: z.string().optional()}),
  z.object({subtype: z.literal('local_public_tag'), tag: z.string(), confirmRemove: z.literal(true).optional()}),
  z.object({subtype: z.literal('local_public_memory'), action: z.enum(['list', 'read', 'write']),
    id: z.string().optional(), content: z.string().optional(), expectedHash: z.string().optional()}),
]).describe('Local Web extensions, not official SDK subtypes'))

export const SDKControlCatalogRequestSchema = lazySchema(() =>
  z.object({subtype: z.enum(['get_hooks_listing', 'list_permission_rules', 'reload_skills', 'reload_output_styles'])}),
)

export const SDKControlMcpReadResourceRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('mcp_read_resource'), serverName: z.string(), uri: z.string()}),
)

export const SDKControlGetWorkspaceDiffRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('get_workspace_diff')}),
)
/** Public hI/Qv request contract. Qv remains the runtime validation producer. */
export const SDKControlForkConversationRequestSchema = lazySchema(() =>
  z.object({subtype:z.literal('fork_conversation'),target_message_uuid:z.string().optional(),title:z.string().optional()}),
)

// Complete pinned original REn; one protocol member, no backend or claim state.
export const SDKControlClaimSessionRequestSchema = createPrintClaimSchema287({
 H:z.boolean,T:z.array,de:z.record,f:lazySchema,o:z.string,se:z.unknown,u:z.object,x:z.literal,
}).schema

/** Original Ci: loop-to-host OAuth refresh RPC, not a client auth command. */
export const SDKControlOAuthTokenRefreshRequestSchema = lazySchema(() =>
  z.object({subtype: z.literal('oauth_token_refresh')}).describe(
    '@internal Request from the CLI subprocess to the SDK host for a fresh OAuth access token after a 401 with no local refresh token.',
  ),
)

/** Public SDK uiHost control requests. These mirror UiHostRequest287 and
 * carry only request payload; callbacks receive the request minus subtype. */
export const SDKControlUiCopyRequestSchema = lazySchema(() => z.object({
  subtype: z.literal('ui_copy'), surface: z.string(), client_id: z.string(),
  plugin: z.string(), text: z.string(),
}))
export const SDKControlUiPromptReadRequestSchema = lazySchema(() => z.object({
  subtype: z.literal('ui_prompt_read'), surface: z.string(), client_id: z.string(),
}))
export const SDKControlUiPromptFillRequestSchema = lazySchema(() => z.object({
  subtype: z.literal('ui_prompt_fill'), surface: z.string(), client_id: z.string(),
  text: z.string(), mode: z.enum(['replace', 'append', 'insert']),
  decorations: z.array(z.unknown()).optional(),
}))
export const SDKControlUiPromptSuggestRequestSchema = lazySchema(() => z.object({
  subtype: z.literal('ui_prompt_suggest'), surface: z.string(), client_id: z.string(),
  text: z.string(),
}))

export const SDKControlRequestInnerSchema = lazySchema(() =>
  z.union([
    ...publicControlRequestSchemas287(),
    SDKControlOAuthTokenRefreshRequestSchema(),
    SDKControlClaimSessionRequestSchema(),
    LocalWebControlRequestSchema(),
    SDKControlRenameSessionRequestSchema(),
    SDKControlUsageRequestSchema(),
    SDKControlSideQuestionRequestSchema(),
    SDKControlReadFileRequestSchema(),
    SDKControlGetSkillsDialogRequestSchema(),
    SDKControlGetSandboxDialogRequestSchema(),
    SDKControlCatalogRequestSchema(),
    SDKControlMcpReadResourceRequestSchema(),
    SDKControlGetWorkspaceDiffRequestSchema(),
    SDKControlForkConversationRequestSchema(),
    SDKControlSessionInfoRequestSchema(),
    SDKControlChromeBrowserHintsRequestSchema(),
    SDKControlInterruptRequestSchema(),
    SDKControlPermissionRequestSchema(),
    SDKControlInitializeRequestSchema(),
    SDKControlSetPermissionModeRequestSchema(),
    SDKControlSetMcpPermissionModeOverrideRequestSchema(),
    SDKControlGetPlanRequestSchema(),
    SDKControlSetModelRequestSchema(),
    SDKControlSetMaxThinkingTokensRequestSchema(),
    SDKControlMcpStatusRequestSchema(),
    SDKControlMcpCallRequestSchema(),
    SDKControlGetContextUsageRequestSchema(),
    SDKHookCallbackRequestSchema(),
    SDKControlMcpMessageRequestSchema(),
    SDKControlRewindFilesRequestSchema(),
    SDKControlCancelAsyncMessageRequestSchema(),
    SDKControlSeedReadStateRequestSchema(),
    SDKControlMcpSetServersRequestSchema(),
    SDKControlReloadPluginsRequestSchema(),
    SDKControlMcpReconnectRequestSchema(),
    SDKControlMcpToggleRequestSchema(),
    SDKControlStopTaskRequestSchema(),
    SDKControlBackgroundTasksRequestSchema(),
    SDKControlSetPromptSuggestionsPausedRequestSchema(),
    SDKControlApplyFlagSettingsRequestSchema(),
    SDKControlGetSettingsRequestSchema(),
    SDKControlUpdateSettingsRequestSchema(),
    SDKControlElicitationRequestSchema(),
    SDKControlUserDialogRequestSchema(),
    SDKControlUiCopyRequestSchema(),
    SDKControlUiPromptReadRequestSchema(),
    SDKControlUiPromptFillRequestSchema(),
    SDKControlUiPromptSuggestRequestSchema(),
  ]),
)

export const SDKControlRequestSchema = lazySchema(() =>
  z.object({
    type: z.literal('control_request'),
    request_id: z.string(),
    request: SDKControlRequestInnerSchema(),
  }),
)

export const ControlResponseSchema = lazySchema(() =>
  z.object({
    pending_permission_requests: z.array(z.lazy(() => SDKControlRequestSchema())).optional(),
    pending_user_dialog_requests: z.array(z.lazy(() => SDKControlRequestSchema())).optional(),
    subtype: z.literal('success'),
    request_id: z.string(),
    response: z.record(z.string(), z.unknown()).optional(),
  }),
)

export const ControlErrorResponseSchema = lazySchema(() =>
  z.object({
    subtype: z.literal('error'),
    request_id: z.string(),
    error: z.string(),
    pending_permission_requests: z
      .array(z.lazy(() => SDKControlRequestSchema()))
      .optional(),
  }),
)

export const SDKControlResponseSchema = lazySchema(() =>
  z.object({
    type: z.literal('control_response'),
    response: z.union([ControlResponseSchema(), ControlErrorResponseSchema()]),
  }),
)

export const SDKControlCancelRequestSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('control_cancel_request'),
      request_id: z.string(),
    })
    .describe('Cancels a currently open control request.'),
)

export const SDKKeepAliveMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('keep_alive'),
    })
    .describe('Keep-alive message to maintain WebSocket connection.'),
)

export const SDKUpdateEnvironmentVariablesMessageSchema = lazySchema(() =>
  z
    .object({
      type: z.literal('update_environment_variables'),
      variables: z.record(z.string(), z.string()),
    })
    .describe('Updates environment variables at runtime.'),
)

// ============================================================================
// Aggregate Message Types
// ============================================================================

export const StdoutMessageSchema = lazySchema(() =>
  z.union([
    SDKMessageSchema(),
    SDKStreamlinedTextMessageSchema(),
    SDKStreamlinedToolUseSummaryMessageSchema(),
    SDKPostTurnSummaryMessageSchema(),
    SDKControlResponseSchema(),
    SDKControlRequestSchema(),
    SDKControlCancelRequestSchema(),
    SDKKeepAliveMessageSchema(),
  ]),
)

export const StdinMessageSchema = lazySchema(() =>
  z.union([
    SDKUserMessageSchema(),
    SDKControlRequestSchema(),
    SDKControlResponseSchema(),
    SDKControlCancelRequestSchema(),
    SDKKeepAliveMessageSchema(),
    SDKUpdateEnvironmentVariablesMessageSchema(),
  ]),
)
