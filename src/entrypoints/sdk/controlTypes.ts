import type {UiHostRequest287} from '../../cli/printOwnership287/publicHostTypes287.js'
import type {PublicControlRequest287} from './officialControlRequests287/types.js'
import type {z} from 'zod/v4';
import type {SDKControlClaimSessionRequestSchema, SDKControlOAuthTokenRefreshRequestSchema} from './controlSchemas.js';
export type SDKControlClaimSessionRequest = z.infer<ReturnType<typeof SDKControlClaimSessionRequestSchema>>;
import type {SharedThinkingControl} from '../../server/sharedThinkingState.js'
import type {SharedConfigControl} from '../../server/sharedConfigState.js'
/** Type-only recovery from controlSchemas.ts; preserves required fields even
 * with strictNullChecks disabled. No runtime schema imports or broad fallback types.
 * See .work/parity-next/types-agent-schema-codegen.cjs for the offline AST translator. */
import type {SharedEffortState} from '../../server/sharedEffortState.js';
import type { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';
import type { HookEvent, AgentDefinition, SlashCommand, AgentInfo, ModelInfo, AccountInfo, FastModeState, PermissionUpdate, PermissionMode, McpServerStatus, HookInput, McpServerConfigForProcessTransport, SDKMessage, SDKStreamlinedTextMessage, SDKStreamlinedToolUseSummaryMessage, SDKPostTurnSummaryMessage, SDKUserMessage } from './coreTypes.recovered.js';
export type SDKHookCallbackMatcher = {
    matcher?: string;
    hookCallbackIds: Array<string>;
    timeout?: number;
};
/** Structural view of complete fixed287 EEn initialize schema. */
export type SDKControlInitializeRequest = {
 subtype: "initialize";
 hooks?: Record<HookEvent, Array<SDKHookCallbackMatcher>>;
 sdkMcpServers?: Array<string>;
 sdkMcpServerConfigs?: Record<string, {timeout?:number}>;
 sdkMcpServerManifests?: Record<string, { initializeResult: Record<string, unknown>; toolsListResult?: Record<string, unknown>; }>;
 sdkMcpServerManifestsOrigin?: "host_per_send";
 jsonSchema?: Record<string, unknown>;
 systemPrompt?: Array<string>;
 appendSystemPrompt?: string;
 systemPromptSnapshot?: boolean;
 planModeInstructions?: string;
 appendSubagentSystemPrompt?: string;
 toolAliases?: Record<string, string>;
 excludeDynamicSections?: boolean;
 agents?: Record<string, AgentDefinition>;
 title?: string;
 skills?: Array<string>;
 webSearchIsolationExemptMcpServers?: Array<string>;
 promptSuggestions?: boolean;
 agentProgressSummaries?: boolean;
 forwardSubagentText?: boolean;
 supportedDialogKinds?: Array<string>;
 perTaskStopAffordance?: boolean;
 rapidFollowupPreempt?: boolean;
 plugins?: Array<{ type: "local"; path: string; skipMcpDiscovery?: boolean; }>;
 workspaceTrust?: { accepted: boolean; directory: string; };
 attachServeRequest?: { workId: string; environmentId: string; };
};

export type SDKControlInitializeResponse = {
    commands: Array<SlashCommand>;
    agents: Array<AgentInfo>;
    output_style: string;
    available_output_styles: Array<string>;
    models: Array<ModelInfo>;
    unavailable_models?: Array<ModelInfo>;
    account: AccountInfo;
    pid?: number;
    fast_mode_state?: FastModeState;
    current_permission_mode?: PermissionMode | 'auto'; // Local SDK enhancement.
    user_output_styles_dir?: string;
    hooks_applied?: boolean;
    session_state?: 'idle' | 'running' | 'requires_action';
    /** Local Web extension capabilities, not official SDK capabilities. */
    local_web?: {version: 1; current_model?: string; current_model_choice?: string; agent_color?: 'red'|'blue'|'green'|'yellow'|'purple'|'orange'|'pink'|'cyan'|null; effort_state?: SharedEffortState; permission_modes?: {bypassPermissions:boolean;auto:boolean}; controls: Array<'local_update_permission_rules' | 'local_get_session_title' | 'local_public_diff' | 'local_public_doctor' | 'local_public_checkpoints' | 'local_public_tasks' | 'local_public_export' | 'local_public_branch' | 'local_public_tag' | 'local_public_memory' | 'local_public_effort' | 'local_public_color' | 'local_public_config' | 'local_public_thinking'>};
};
export type SDKControlInterruptRequest = {
    subtype: 'interrupt';
    send_now?: boolean;
    cancel_queued?: boolean;
    message_uuid?: string;
};
export type SDKControlPermissionRequest = import('./permissionCallback287/requestTypes.js').PermissionRequest287;
export type SDKControlSetPermissionModeRequest = {
    subtype: 'set_permission_mode';
    mode: PermissionMode | 'auto'; // Local SDK enhancement, subject to host eligibility.
    ultraplan?: boolean;
};
export type SDKControlSetMcpPermissionModeOverrideRequest = import('../../cli/printOwnership287/mcpPermissionOverride287Native.js').McpPermissionOverrideRequest287;
export type SDKControlGetPlanRequest = {
    subtype: 'get_plan';
};
export type SDKControlSetModelRequest = {
    subtype: 'set_model';
    model?: string;
};
export type SDKControlSetMaxThinkingTokensRequest = {
    subtype: 'set_max_thinking_tokens';
    max_thinking_tokens: (number) | null;
};
export type SDKControlMcpStatusRequest = {
    subtype: 'mcp_status';
};
export type SDKControlMcpCallRequest = {
    subtype: 'mcp_call';
    tool: string;
    arguments?: Record<string, unknown>;
    expires_at?: string;
    timeout_ms?: number;
    input_files?: Array<{name: string; lane_path: string}>;
    output_files?: Array<{name: string; lane_path: string; if_match?: string}>;
};
export type SDKControlMcpStatusResponse = {
    mcpServers: Array<McpServerStatus>;
};
export type SDKControlGetContextUsageRequest = {
    subtype: 'get_context_usage';
    /** Official 2.1.287 context detail schema; omitted means full. */
    detail?: 'summary' | 'full';
};
export type ContextCategory = {
    name: string;
    tokens: number;
    color: string;
    isDeferred?: boolean;
    kind?: 'free' | 'buffer' | 'deferred' | 'used';
};
export type ContextGridSquare = {
    color: string;
    isFilled: boolean;
    categoryName: string;
    tokens: number;
    percentage: number;
    squareFullness: number;
};
export type SDKControlGetContextUsageResponse = {
    categories: Array<ContextCategory>;
    totalTokens: number;
    maxTokens: number;
    rawMaxTokens: number;
    autocompactSource?: string;
    percentage: number;
    gridRows: Array<Array<ContextGridSquare>>;
    model: string;
    memoryFiles: Array<{
        path: string;
        type: string;
        tokens: number;
    }>;
    mcpTools: Array<{
        name: string;
        serverName: string;
        tokens: number;
        isLoaded?: boolean;
    }>;
    deferredBuiltinTools?: Array<{
        name: string;
        tokens: number;
        isLoaded: boolean;
    }>;
    systemTools?: Array<{
        name: string;
        tokens: number;
    }>;
    systemPromptSections?: Array<{
        name: string;
        tokens: number;
    }>;
    agents: Array<{
        agentType: string;
        source: string;
        tokens: number;
    }>;
    slashCommands?: {
        totalCommands: number;
        includedCommands: number;
        tokens: number;
    };
    skills?: {
        totalSkills: number;
        includedSkills: number;
        tokens: number;
        skillFrontmatter: Array<{
            name: string;
            source: string;
            pluginName?: string;
            tokens: number;
        }>;
    };
    autoCompactThreshold?: number;
    isAutoCompactEnabled: boolean;
    messageBreakdown?: {
        toolCallTokens: number;
        toolResultTokens: number;
        attachmentTokens: number;
        assistantMessageTokens: number;
        userMessageTokens: number;
        redirectedContextTokens?: number;
        unattributedTokens?: number;
        toolCallsByType: Array<{
            name: string;
            callTokens: number;
            resultTokens: number;
        }>;
        attachmentsByType: Array<{
            name: string;
            tokens: number;
        }>;
    };
    apiUsage: ({
        input_tokens: number;
        output_tokens: number;
        cache_creation_input_tokens: number;
        cache_read_input_tokens: number;
    }) | null;
};
export type SDKControlRewindFilesRequest = {
    subtype: 'rewind_files';
    user_message_id: string;
    dry_run?: boolean;
};
export type SDKControlRewindFilesResponse = {
    canRewind: boolean;
    error?: string;
    filesChanged?: Array<string>;
    insertions?: number;
    deletions?: number;
};
export type SDKControlCancelAsyncMessageRequest = {
    subtype: 'cancel_async_message';
    message_uuid: string;
};
export type SDKControlCancelAsyncMessageResponse = {
    cancelled: boolean;
};
export type SDKControlSeedReadStateRequest = {
    subtype: 'seed_read_state';
    path: string;
    mtime: number;
};
export type SDKHookCallbackRequest = {
    subtype: 'hook_callback';
    callback_id: string;
    input: HookInput;
    tool_use_id?: string;
};
export type SDKControlMcpMessageRequest = {
    subtype: 'mcp_message';
    server_name: string;
    message: JSONRPCMessage;
};
export type SDKControlMcpSetServersRequest = {
    subtype: 'mcp_set_servers';
    servers: Record<string, McpServerConfigForProcessTransport>;
};
export type SDKControlMcpSetServersResponse = {
    added: Array<string>;
    removed: Array<string>;
    errors: Record<string, string>;
};
export type SDKControlReloadPluginsRequest = {
    subtype: 'reload_plugins';
};
export type SDKControlReloadPluginsResponse = {
    commands: Array<SlashCommand>;
    agents: Array<AgentInfo>;
    plugins: Array<{
        name: string;
        path: string;
        source?: string;
    }>;
    mcpServers: Array<McpServerStatus>;
    error_count: number;
};
export type SDKControlMcpReconnectRequest = {
    subtype: 'mcp_reconnect';
    serverName: string;
};
export type SDKControlMcpToggleRequest = {
    subtype: 'mcp_toggle';
    serverName: string;
    enabled: boolean;
};
export type SDKControlStopTaskRequest = {
    subtype: 'stop_task';
    task_id: string;
};
export type SDKControlApplyFlagSettingsRequest = {
    subtype: 'apply_flag_settings';
    settings: Record<string, unknown>;
};
export type SDKControlGetSettingsRequest = {
    subtype: 'get_settings';
};
export type SDKControlUpdateSettingsRequest = {
    subtype: 'update_settings';
    source: 'localSettings' | 'userSettings';
    settings: Record<string, unknown>;
};
export type SDKControlGetSettingsResponse = {
    effective: Record<string, unknown>;
    sources: Array<{
        source: 'userSettings' | 'projectSettings' | 'localSettings' | 'flagSettings' | 'policySettings';
        settings: Record<string, unknown>;
    }>;
    applied?: {
        model: string;
        effort: ('low' | 'medium' | 'high' | 'xhigh' | 'max') | null;
    };
};
/** Official 2.1.283 _i: generic SDK-host dialog transport request. */
export type SDKControlUserDialogRequest = {
    subtype: 'request_user_dialog';
    dialog_kind: string;
    payload: Record<string, unknown>;
    tool_use_id?: string;
};

export type SDKControlElicitationRequest = {
    subtype: 'elicitation';
    mcp_server_name: string;
    message: string;
    mode?: 'form' | 'url';
    url?: string;
    elicitation_id?: string;
    requested_schema?: Record<string, unknown>;
};
export type SDKControlElicitationResponse = {
    action: 'accept' | 'decline' | 'cancel';
    content?: Record<string, unknown>;
};
export type SDKControlChromeBrowserHintsRequest = {
    subtype: 'set_chrome_browser_hints';
    preferredDeviceId?: (string) | null;
    localDeviceIds: Array<string>;
    hostPlatform?: 'darwin' | 'win32' | 'linux';
};
/** Complete request fields read and validated by original public Qv. */
export type SDKControlForkConversationRequest = {subtype:'fork_conversation';target_message_uuid?:string;title?:string};
/** Inferred from the same protocol schema used by wire validation. */
export type SDKControlOAuthTokenRefreshRequest = z.infer<ReturnType<typeof SDKControlOAuthTokenRefreshRequestSchema>>;
export type SDKControlRequestInner = PublicControlRequest287 | SDKControlSetMcpPermissionModeOverrideRequest | SDKControlMcpCallRequest | SDKControlOAuthTokenRefreshRequest | SDKControlForkConversationRequest | UiHostRequest287 | SDKControlClaimSessionRequest | SDKControlUserDialogRequest | RecoveredControlRequest | (SDKControlChromeBrowserHintsRequest) | (SDKControlInterruptRequest) | (SDKControlPermissionRequest) | (SDKControlInitializeRequest) | (SDKControlSetPermissionModeRequest) | (SDKControlGetPlanRequest) | (SDKControlSetModelRequest) | (SDKControlSetMaxThinkingTokensRequest) | (SDKControlMcpStatusRequest) | (SDKControlGetContextUsageRequest) | (SDKHookCallbackRequest) | (SDKControlMcpMessageRequest) | (SDKControlRewindFilesRequest) | (SDKControlCancelAsyncMessageRequest) | (SDKControlSeedReadStateRequest) | (SDKControlMcpSetServersRequest) | (SDKControlReloadPluginsRequest) | (SDKControlMcpReconnectRequest) | (SDKControlMcpToggleRequest) | (SDKControlStopTaskRequest) | (SDKControlApplyFlagSettingsRequest) | (SDKControlGetSettingsRequest) | (SDKControlUpdateSettingsRequest) | (SDKControlElicitationRequest);
export type SDKControlRequest = {
    type: 'control_request';
    request_id: string;
    request: SDKControlRequestInner;
};
export type ControlResponse = {
    pending_permission_requests?: Array<SDKControlRequest>;
    pending_user_dialog_requests?: Array<SDKControlRequest>;
    subtype: 'success';
    request_id: string;
    response?: Record<string, unknown>;
};
export type ControlErrorResponse = {
    subtype: 'error';
    request_id: string;
    error: string;
    pending_permission_requests?: Array<SDKControlRequest>;
};
export type SDKControlResponse = {
    type: 'control_response';
    response: (ControlResponse) | (ControlErrorResponse);
};
export type SDKControlCancelRequest = {
    type: 'control_cancel_request';
    request_id: string;
};
export type SDKKeepAliveMessage = {
    type: 'keep_alive';
};
export type SDKUpdateEnvironmentVariablesMessage = {
    type: 'update_environment_variables';
    variables: Record<string, string>;
};
export type SDKTranscriptMirrorMessage287={type:'transcript_mirror';filePath:string;entries:unknown[]};
export type StdoutMessage = SDKTranscriptMirrorMessage287 | (SDKMessage) | (SDKStreamlinedTextMessage) | (SDKStreamlinedToolUseSummaryMessage) | (SDKPostTurnSummaryMessage) | (SDKControlResponse) | (SDKControlRequest) | (SDKControlCancelRequest) | (SDKKeepAliveMessage);
export type StdinMessage = (SDKUserMessage) | (SDKControlRequest) | (SDKControlResponse) | (SDKControlCancelRequest) | (SDKKeepAliveMessage) | (SDKUpdateEnvironmentVariablesMessage);
/** Request variants sent by official 2.1.283 Query (chunk-xwgs2xvp.js)
 * and handled by cli/print.ts, but absent from the checked-in schema subset.
 * This is type-only; the runtime schema still needs a separately owned sync. */
export type SDKControlBackgroundTasksRequest = {
    subtype: 'background_tasks';
    tool_use_id?: string;
};
export type SDKControlBackgroundTasksResponse = {
    backgrounded?: boolean;
};
export type SDKControlSetPromptSuggestionsPausedRequest = {
    subtype: 'set_prompt_suggestions_paused';
    paused: boolean;
};
/** ii, sY and ifn in official 2.1.283 chunk-9r9kpwh0.js. */
export type SDKControlSessionInfoRequest = {subtype: 'get_session_cost' | 'list_models' | 'get_binary_version'};
export type SDKControlUsageRequest = {subtype: 'get_usage'; skip_behaviors?: boolean};
export type SDKControlRenameSessionRequest = {subtype: 'rename_session'; title: string; source?: 'remote' | 'host' | null; session_id?: string};
export type SDKControlCatalogRequest = {
    subtype: 'get_hooks_listing' | 'list_permission_rules' | 'reload_skills' | 'reload_output_styles';
};
export type SDKControlMcpReadResourceRequest = {
    subtype: 'mcp_read_resource';
    serverName: string;
    uri: string;
};
export type SDKControlGetWorkspaceDiffRequest = {subtype: 'get_workspace_diff'};
/** Local Web extensions. Updates are parsed by the existing PermissionUpdateSchema host. */
export type LocalWebControlRequest = {subtype: 'local_update_permission_rules'; update: unknown} |
    {subtype: 'local_get_session_title'; session_id?: string} |
    SharedThinkingControl |
    SharedConfigControl |
    {subtype: 'local_public_effort'; value?: string; expectedModel?: string} |
    {subtype: 'local_public_color'; color?: 'red'|'blue'|'green'|'yellow'|'purple'|'orange'|'pink'|'cyan'|'default'} |
    {subtype: 'local_public_diff'; path?: string} |
    {subtype: 'local_public_doctor' | 'local_public_checkpoints' | 'local_public_tasks' | 'local_public_export'} |
    {subtype: 'local_public_branch'; title?: string} |
    {subtype: 'local_public_tag'; tag: string; confirmRemove?: true} |
    {subtype: 'local_public_memory'; action: 'list' | 'read' | 'write'; id?: string; content?: string; expectedHash?: string};
export type RecoveredControlRequest = LocalWebControlRequest | SDKControlRenameSessionRequest | SDKControlUsageRequest | SDKControlMcpReadResourceRequest | SDKControlGetWorkspaceDiffRequest | SDKControlCatalogRequest | SDKControlSessionInfoRequest | SDKControlBackgroundTasksRequest | SDKControlSetPromptSuggestionsPausedRequest | {
    subtype: 'end_session';
    reason?: string;
} | {
    subtype: 'channel_enable';
    serverName: string;
} | {
    subtype: 'mcp_authenticate';
    serverName: string;
    redirectUri?: string;
} | {
    subtype: 'mcp_clear_auth';
    serverName: string;
} | {
    subtype: 'mcp_oauth_callback_url';
    serverName: string;
    callbackUrl: string;
} | {
    subtype: 'claude_authenticate';
    loginWithClaudeAi?: boolean;
} | {
    subtype: 'claude_oauth_callback';
    authorizationCode: string;
    state: string;
} | {
    subtype: 'claude_oauth_wait_for_completion';
} | {
    subtype: 'generate_session_title';
    description: string;
    persist?: boolean;
} | {
    subtype: 'side_question';
    question: string;
    history?: Array<{ question: string; response: string; fallback_notice?: string }>;
} | {
    subtype: 'read_file';
    path: string;
    max_bytes?: number;
    encoding?: string;
} | {
    subtype: 'get_skills_dialog';
} | {
    subtype: 'get_sandbox_dialog';
} | {
    subtype: 'remote_control';
    enabled: boolean;
    name?: string;
    reattach_session_id?: string;
    keep_session_on_exit?: boolean;
    work_secret?: string;
};
export type { SDKPartialAssistantMessage } from './coreTypes.recovered.js';
