/** Type-only recovery from coreSchemas.ts; preserves required fields even
 * with strictNullChecks disabled. No runtime schema imports or broad fallback types.
 * See .work/parity-next/types-agent-schema-codegen.cjs for the offline AST translator. */
import type { UUID } from 'crypto';
import type {UiSystemEvent287} from '../../cli/printOwnership287/publicHostTypes287.js';
import type {SDKTranscriptMirrorMessage287} from './controlTypes.js';
import type { MessageParam as APIUserMessage } from '@anthropic-ai/sdk/resources/messages/messages.mjs';
import type { BetaMessage as APIAssistantMessage, BetaRawMessageStreamEvent as RawMessageStreamEvent } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs';
import type { NonNullableUsage } from './sdkUtilityTypes.js';
export type ModelUsage = {
    inputTokens: number;
    outputTokens: number;
    cacheReadInputTokens: number;
    cacheCreationInputTokens: number;
    webSearchRequests: number;
    costUSD: number;
    contextWindow: number;
    maxOutputTokens: number;
    thinkingTokens?: number;
    canonicalModel?: string;
    provider?: string;
    costBasis?: 'managed' | 'unknown' | 'list';
};
export type OutputFormatType = 'json_schema';
export type BaseOutputFormat = {
    type: OutputFormatType;
};
export type JsonSchemaOutputFormat = {
    type: 'json_schema';
    schema: Record<string, unknown>;
};
export type OutputFormat = JsonSchemaOutputFormat;
export type ApiKeySource = 'user' | 'project' | 'org' | 'temporary' | 'oauth';
export type ConfigScope = 'local' | 'user' | 'project';
export type SdkBeta = 'context-1m-2025-08-07';
export type ThinkingAdaptive = {
    type: 'adaptive';
    display?: 'summarized' | 'omitted';
};
export type ThinkingEnabled = {
    type: 'enabled';
    budgetTokens?: number;
    display?: 'summarized' | 'omitted';
};
export type ThinkingDisabled = {
    type: 'disabled';
};
export type ThinkingConfig = (ThinkingAdaptive) | (ThinkingEnabled) | (ThinkingDisabled);
export type McpStdioServerConfig = {
    type?: 'stdio';
    command: string;
    args?: Array<string>;
    env?: Record<string, string>;
};
export type McpSSEServerConfig = {
    type: 'sse';
    url: string;
    headers?: Record<string, string>;
};
export type McpHttpServerConfig = {
    type: 'http';
    url: string;
    headers?: Record<string, string>;
};
export type McpSdkServerConfig = {
    type: 'sdk';
    name: string;
};
export type McpServerConfigForProcessTransport = (McpStdioServerConfig) | (McpSSEServerConfig) | (McpHttpServerConfig) | (McpSdkServerConfig);
export type McpClaudeAIProxyServerConfig = {
    type: 'claudeai-proxy';
    url: string;
    id: string;
};
export type McpServerStatusConfig = (McpServerConfigForProcessTransport) | (McpClaudeAIProxyServerConfig);
export type McpServerStatus = {
    name: string;
    status: 'connected' | 'failed' | 'needs-auth' | 'pending' | 'disabled';
    serverInfo?: {
        name: string;
        version: string;
    };
    error?: string;
    error_code?: 'CLAUDEAI_BEARER_REJECTED' | 'FIRST_PARTY_AUTH_REJECTED' | 'APPROVAL_REQUIRED';
    config?: McpServerStatusConfig;
    scope?: string;
    source?: string;
    tools?: Array<{
        name: string;
        description?: string;
        _meta?: Record<string, unknown>;
        annotations?: {
            readOnly?: boolean;
            destructive?: boolean;
            openWorld?: boolean;
        };
    }>;
    capabilities?: {
        experimental?: Record<string, unknown>;
    };
};
export type McpSetServersResult = {
    added: Array<string>;
    removed: Array<string>;
    errors: Record<string, string>;
};
export type PermissionUpdateDestination = 'userSettings' | 'projectSettings' | 'localSettings' | 'session' | 'cliArg';
export type PermissionBehavior = 'allow' | 'deny' | 'ask';
export type PermissionRuleValue = {
    toolName: string;
    ruleContent?: string;
};
export type PermissionUpdate = import('./permissionCallback287/requestTypes.js').OriginalPermission_jt;
export type PermissionDecisionClassification = 'user_temporary' | 'user_permanent' | 'user_reject';
export type PermissionResult = ({
    behavior: 'allow';
    updatedInput?: Record<string, unknown>;
    updatedPermissions?: Array<PermissionUpdate>;
    toolUseID?: string;
    decisionClassification?: PermissionDecisionClassification;
}) | ({
    behavior: 'deny';
    message: string;
    interrupt?: boolean;
    toolUseID?: string;
    decisionClassification?: PermissionDecisionClassification;
});
export type PermissionMode = 'default' | 'acceptEdits' | 'bypassPermissions' | 'plan' | 'dontAsk';
export type HookEvent = (typeof import('../../utils/hooks/officialHookOutput287/events.js').HOOK_EVENTS)[number];
export type BaseHookInput = {
    session_id: string;
    transcript_path: string;
    cwd: string;
    permission_mode?: string;
    agent_id?: string;
    agent_type?: string;
};
export type PreToolUseHookInput = (BaseHookInput) & ({
    hook_event_name: 'PreToolUse';
    tool_name: string;
    tool_input: unknown;
    tool_use_id: string;
});
export type PermissionRequestHookInput = (BaseHookInput) & ({
    hook_event_name: 'PermissionRequest';
    tool_name: string;
    tool_input: unknown;
    permission_suggestions?: Array<PermissionUpdate>;
});
export type PostToolUseHookInput = (BaseHookInput) & ({
    hook_event_name: 'PostToolUse';
    tool_name: string;
    tool_input: unknown;
    tool_response: unknown;
    tool_use_id: string;
});
export type PostToolUseFailureHookInput = (BaseHookInput) & ({
    hook_event_name: 'PostToolUseFailure';
    tool_name: string;
    tool_input: unknown;
    tool_use_id: string;
    error: string;
    is_interrupt?: boolean;
});
export type PermissionDeniedHookInput = (BaseHookInput) & ({
    hook_event_name: 'PermissionDenied';
    tool_name: string;
    tool_input: unknown;
    tool_use_id: string;
    reason: string;
});
export type NotificationHookInput = (BaseHookInput) & ({
    hook_event_name: 'Notification';
    message: string;
    title?: string;
    notification_type: string;
});
export type UserPromptSubmitHookInput = (BaseHookInput) & ({
    hook_event_name: 'UserPromptSubmit';
    prompt: string;
});
export type SessionStartHookInput = (BaseHookInput) & ({
    hook_event_name: 'SessionStart';
    source: 'startup' | 'resume' | 'clear' | 'compact';
    agent_type?: string;
    model?: string;
});
export type SetupHookInput = (BaseHookInput) & ({
    hook_event_name: 'Setup';
    trigger: 'init' | 'maintenance';
});
export type StopHookInput = (BaseHookInput) & ({
    hook_event_name: 'Stop';
    stop_hook_active: boolean;
    last_assistant_message?: string;
});
export type StopFailureHookInput = (BaseHookInput) & ({
    hook_event_name: 'StopFailure';
    error: SDKAssistantMessageError;
    error_details?: string;
    last_assistant_message?: string;
});
export type SubagentStartHookInput = (BaseHookInput) & ({
    hook_event_name: 'SubagentStart';
    agent_id: string;
    agent_type: string;
});
export type SubagentStopHookInput = (BaseHookInput) & ({
    hook_event_name: 'SubagentStop';
    stop_hook_active: boolean;
    agent_id: string;
    agent_transcript_path: string;
    agent_type: string;
    last_assistant_message?: string;
});
export type PreCompactHookInput = (BaseHookInput) & ({
    hook_event_name: 'PreCompact';
    trigger: 'manual' | 'auto';
    custom_instructions: (string) | null;
});
export type PostCompactHookInput = (BaseHookInput) & ({
    hook_event_name: 'PostCompact';
    trigger: 'manual' | 'auto';
    compact_summary: string;
});
export type TeammateIdleHookInput = (BaseHookInput) & ({
    hook_event_name: 'TeammateIdle';
    teammate_name: string;
    team_name: string;
});
export type TaskCreatedHookInput = (BaseHookInput) & ({
    hook_event_name: 'TaskCreated';
    task_id: string;
    task_subject: string;
    task_description?: string;
    teammate_name?: string;
    team_name?: string;
});
export type TaskCompletedHookInput = (BaseHookInput) & ({
    hook_event_name: 'TaskCompleted';
    task_id: string;
    task_subject: string;
    task_description?: string;
    teammate_name?: string;
    team_name?: string;
});
export type ElicitationHookInput = (BaseHookInput) & ({
    hook_event_name: 'Elicitation';
    mcp_server_name: string;
    message: string;
    mode?: 'form' | 'url';
    url?: string;
    elicitation_id?: string;
    requested_schema?: Record<string, unknown>;
});
export type ElicitationResultHookInput = (BaseHookInput) & ({
    hook_event_name: 'ElicitationResult';
    mcp_server_name: string;
    elicitation_id?: string;
    mode?: 'form' | 'url';
    action: 'accept' | 'decline' | 'cancel';
    content?: Record<string, unknown>;
});
export type ConfigChangeHookInput = (BaseHookInput) & ({
    hook_event_name: 'ConfigChange';
    source: 'user_settings' | 'project_settings' | 'local_settings' | 'policy_settings' | 'skills';
    file_path?: string;
});
export type InstructionsLoadedHookInput = (BaseHookInput) & ({
    hook_event_name: 'InstructionsLoaded';
    file_path: string;
    memory_type: 'User' | 'Project' | 'Local' | 'Managed';
    load_reason: 'session_start' | 'nested_traversal' | 'path_glob_match' | 'include' | 'compact';
    globs?: Array<string>;
    trigger_file_path?: string;
    parent_file_path?: string;
});
export type WorktreeCreateHookInput = (BaseHookInput) & ({
    hook_event_name: 'WorktreeCreate';
    name: string;
});
export type WorktreeRemoveHookInput = (BaseHookInput) & ({
    hook_event_name: 'WorktreeRemove';
    worktree_path: string;
});
export type CwdChangedHookInput = (BaseHookInput) & ({
    hook_event_name: 'CwdChanged';
    old_cwd: string;
    new_cwd: string;
});
export type FileChangedHookInput = (BaseHookInput) & ({
    hook_event_name: 'FileChanged';
    file_path: string;
    event: 'change' | 'add' | 'unlink';
});
export type ExitReason = 'clear' | 'resume' | 'logout' | 'prompt_input_exit' | 'other' | 'bypass_permissions_disabled';
export type SessionEndHookInput = (BaseHookInput) & ({
    hook_event_name: 'SessionEnd';
    reason: ExitReason;
});
export type HookInput = (PreToolUseHookInput) | (PostToolUseHookInput) | (PostToolUseFailureHookInput) | (PermissionDeniedHookInput) | (NotificationHookInput) | (UserPromptSubmitHookInput) | (SessionStartHookInput) | (SessionEndHookInput) | (StopHookInput) | (StopFailureHookInput) | (SubagentStartHookInput) | (SubagentStopHookInput) | (PreCompactHookInput) | (PostCompactHookInput) | (PermissionRequestHookInput) | (SetupHookInput) | (TeammateIdleHookInput) | (TaskCreatedHookInput) | (TaskCompletedHookInput) | (ElicitationHookInput) | (ElicitationResultHookInput) | (ConfigChangeHookInput) | (InstructionsLoadedHookInput) | (WorktreeCreateHookInput) | (WorktreeRemoveHookInput) | (CwdChangedHookInput) | (FileChangedHookInput);
// Whole original 287 Hook JSON output types share the generated raw schema.
export type * from '../../utils/hooks/officialHookOutput287/outputTypes.js'

export type PromptRequestOption = {
    key: string;
    label: string;
    description?: string;
};
export type PromptRequest = {
    prompt: string;
    message: string;
    options: Array<PromptRequestOption>;
};
export type PromptResponse = {
    prompt_response: string;
    selected: string;
};
export type SlashCommand = {
    aliases?: string[];
    builtin?: boolean;
    name: string;
    description: string;
    argumentHint: string;
};
export type AgentInfo = {
    name: string;
    description: string;
    model?: string;
};
export type ModelInfo = {
    resolvedModel?: string;
    promoListPrice?: string;
    disabled?: boolean;
    value: string;
    displayName: string;
    description: string;
    supportsEffort?: boolean;
    supportedEffortLevels?: Array<'low' | 'medium' | 'high' | 'xhigh' | 'max'>;
    supportsAdaptiveThinking?: boolean;
    supportsFastMode?: boolean;
    supportsAutoMode?: boolean;
};
export type AccountInfo = {
    email?: string;
    organization?: string;
    subscriptionType?: string;
    tokenSource?: string;
    apiKeySource?: string;
    apiProvider?: 'firstParty' | 'bedrock' | 'vertex' | 'foundry' | 'anthropicGoogleCloud';
};
export type AgentMcpServerSpec = (string) | (Record<string, McpServerConfigForProcessTransport>);
export type AgentDefinition = {
    description: string;
    tools?: Array<string>;
    disallowedTools?: Array<string>;
    prompt: string;
    model?: string;
    mcpServers?: Array<AgentMcpServerSpec>;
    criticalSystemReminder_EXPERIMENTAL?: string;
    skills?: Array<string>;
    initialPrompt?: string;
    maxTurns?: number;
    background?: boolean;
    memory?: 'user' | 'project' | 'local';
    effort?: ('low' | 'medium' | 'high' | 'xhigh' | 'max') | (number);
    permissionMode?: PermissionMode;
};
export type SettingSource = 'user' | 'project' | 'local';
export type SdkPluginConfig = {
    type: 'local';
    path: string;
};
export type RewindFilesResult = {
    canRewind: boolean;
    error?: string;
    filesChanged?: Array<string>;
    insertions?: number;
    deletions?: number;
};
export type SDKAssistantMessageError = 'authentication_failed' | 'billing_error' | 'rate_limit' | 'invalid_request' | 'server_error' | 'unknown' | 'max_output_tokens' | 'oauth_org_not_allowed' | 'account_on_hold' | 'verification_required' | 'overloaded' | 'model_not_found' | 'cloud_credential_error';
export type SDKStatus = ('compacting') | ('requesting') | (null);
export type SDKUserMessageContent = {
    type: 'user';
    message: APIUserMessage;
    parent_tool_use_id: (string) | null;
    /** Local Web worker input only; consumed before query, never model content. */
    local_web_literal?: boolean;
    isSynthetic?: boolean;
    tool_use_result?: unknown;
    priority?: 'now' | 'next' | 'later';
    timestamp?: string;
};
export type SDKUserMessage = (SDKUserMessageContent) & {
    uuid?: UUID;
    session_id?: string;
};
export type SDKUserMessageReplay = (SDKUserMessageContent) & {
    uuid: UUID;
    session_id: string;
    isReplay: true;
    /** Local worker output provenance, not user input or model content. */
    local_web_command_output?: 'model';
};
/** Official 2.1.283 chunk-9r9kpwh0.js k$r; newer than coreSchemas.ts. */
export type SDKRateLimitInfoSchemaOutput = {
    status: 'allowed' | 'allowed_warning' | 'rejected';
    resetsAt?: number;
    rateLimitType?: 'five_hour' | 'seven_day' | 'seven_day_opus' | 'seven_day_sonnet' | 'seven_day_overage_included' | 'overage';
    utilization?: number;
    unifiedWindows?: {
        five_hour?: {
            utilization: number;
            resetsAt: number;
        };
        seven_day?: {
            utilization: number;
            resetsAt: number;
        };
        seven_day_overage_included?: {
            utilization: number;
            resetsAt: number;
        };
    };
    overageStatus?: 'allowed' | 'allowed_warning' | 'rejected';
    overageResetsAt?: number;
    overageDisabledReason?: 'overage_not_provisioned' | 'org_level_disabled' | 'org_level_disabled_until' | 'out_of_credits' | 'seat_tier_level_disabled' | 'member_level_disabled' | 'seat_tier_zero_credit_limit' | 'group_zero_credit_limit' | 'member_zero_credit_limit' | 'org_service_level_disabled' | 'no_limits_configured' | 'fetch_error' | 'unknown';
    isUsingOverage?: boolean;
    overageInUse?: boolean;
    surpassedThreshold?: number;
    rateLimitGraceActive?: boolean;
    overagePeriodMonthly?: {
        utilization: number;
    };
    overagePeriodChannel?: {
        utilization: number;
    };
    limitScope?: 'service' | 'channel' | 'group_pool';
    errorCode?: 'credits_required';
    canUserPurchaseCredits?: boolean;
    hasChargeableSavedPaymentMethod?: boolean;
};
export type SDKAssistantMessage = {
    type: 'assistant';
    message: APIAssistantMessage;
    parent_tool_use_id: (string) | null;
    error?: SDKAssistantMessageError;
    uuid: UUID;
    session_id: string;
};
/** claudeAiLimits.ts and messages/mappers.ts also emit this known local reason.
 * Keep it distinct from the unmodified official schema output rather than
 * coercing the runtime value or widening the discriminator to string. */
export type SDKRateLimitInfo = Omit<SDKRateLimitInfoSchemaOutput, 'overageDisabledReason'> & {
    overageDisabledReason?: SDKRateLimitInfoSchemaOutput['overageDisabledReason'] | 'org_service_zero_credit_limit';
};
export type SDKRateLimitEvent = {
    type: 'rate_limit_event';
    rate_limit_info: SDKRateLimitInfo;
    uuid: UUID;
    session_id: string;
};
export type SDKStreamlinedTextMessage = {
    type: 'streamlined_text';
    text: string;
    session_id: string;
    uuid: UUID;
};
export type SDKStreamlinedToolUseSummaryMessage = {
    type: 'streamlined_tool_use_summary';
    tool_summary: string;
    session_id: string;
    uuid: UUID;
};
export type SDKPermissionDenial = {
    tool_name: string;
    tool_use_id: string;
    tool_input: Record<string, unknown>;
};
export type SDKResultSuccess = import('./officialResultSchemas287/types.js').ResultSuccess287;
export type SDKResultError = import('./officialResultSchemas287/types.js').ResultError287;
export type SDKResultMessage = (SDKResultSuccess) | (SDKResultError);
export type SDKCommandsChangedMessage = {
    type: 'system';
    subtype: 'commands_changed';
    commands: Array<SlashCommand>;
    uuid: UUID;
    session_id: string;
};
export type SDKSystemMessage = {
    type: 'system';
    subtype: 'init';
    capabilities?: Array<string>;
    agents?: Array<string>;
    apiKeySource: ApiKeySource;
    betas?: Array<string>;
    claude_code_version: string;
    cwd: string;
    tools: Array<string>;
    mcp_servers: Array<{
        name: string;
        status: string;
    }>;
    model: string;
    permissionMode: PermissionMode | 'auto'; // Local SDK system/init reports actual Auto state.
    slash_commands: Array<string>;
    output_style: string;
    skills: Array<string>;
    plugins: Array<{
        name: string;
        path: string;
        source?: string;
    }>;
    fast_mode_state?: FastModeState;
    uuid: UUID;
    session_id: string;
};
export type SDKPartialAssistantMessage = {
    type: 'stream_event';
    event: RawMessageStreamEvent | { type: "ping" };
    thinking_display?: 'summarized' | 'omitted';
    parent_tool_use_id: (string) | null;
    uuid: UUID;
    session_id: string;
};
export type SDKCompactBoundaryMessage = {
    type: 'system';
    subtype: 'compact_boundary';
    compact_metadata: {
        trigger: 'manual' | 'auto';
        pre_tokens: number;
        preserved_segment?: {
            head_uuid: UUID;
            anchor_uuid: UUID;
            tail_uuid: UUID;
        };
    };
    uuid: UUID;
    session_id: string;
};
export type SDKStatusMessage = {
    type: 'system';
    subtype: 'status';
    status: SDKStatus;
    permissionMode?: PermissionMode | 'auto'; // Local SDK mode status.
    compact_result?: 'success' | 'failed';
    compact_error?: string;
    uuid: UUID;
    session_id: string;
};
/** Internal compact-event metadata; Ay serializes this to the SDK wire fields. */
export type SDKStatusMetadata = {
    compactResult?: 'success' | 'failed';
    compactError?: string;
};
export type SDKPostTurnSummaryMessage = {
    type: 'system';
    subtype: 'post_turn_summary';
    summarizes_uuid: string;
    status_category: 'blocked' | 'waiting' | 'completed' | 'review_ready' | 'failed';
    status_detail: string;
    is_noteworthy: boolean;
    title: string;
    description: string;
    recent_action: string;
    needs_action: string;
    artifact_urls: Array<string>;
    uuid: UUID;
    session_id: string;
};
export type SDKAPIRetryMessage = {
    type: 'system';
    subtype: 'api_retry';
    attempt: number;
    max_retries: number;
    retry_delay_ms: number;
    error_status: (number) | null;
    error: SDKAssistantMessageError;
    no_response?: { waited_ms: number; retry_wait_ms: number };
    uuid: UUID;
    session_id: string;
};
export type SDKLocalCommandOutputMessage = {
    type: 'system';
    subtype: 'local_command_output';
    content: string;
    uuid: UUID;
    session_id: string;
};
export type SDKHookStartedMessage = {
    type: 'system';
    subtype: 'hook_started';
    hook_id: string;
    hook_name: string;
    hook_event: string;
    uuid: UUID;
    session_id: string;
};
export type SDKHookProgressMessage = {
    type: 'system';
    subtype: 'hook_progress';
    hook_id: string;
    hook_name: string;
    hook_event: string;
    stdout: string;
    stderr: string;
    output: string;
    uuid: UUID;
    session_id: string;
};
export type SDKHookResponseMessage = {
    type: 'system';
    subtype: 'hook_response';
    hook_id: string;
    hook_name: string;
    hook_event: string;
    output: string;
    stdout: string;
    stderr: string;
    exit_code?: number;
    outcome: 'success' | 'error' | 'cancelled';
    uuid: UUID;
    session_id: string;
};
export type SDKToolProgressMessage = {
    type: 'tool_progress';
    tool_use_id: string;
    tool_name: string;
    parent_tool_use_id: (string) | null;
    elapsed_time_seconds: number;
    task_id?: string;
    uuid: UUID;
    session_id: string;
};
export type SDKAuthStatusMessage = {
    type: 'auth_status';
    isAuthenticating: boolean;
    output: Array<string>;
    error?: string;
    uuid: UUID;
    session_id: string;
};
export type SDKFilesPersistedEvent = {
    type: 'system';
    subtype: 'files_persisted';
    files: Array<{
        filename: string;
        file_id: string;
    }>;
    failed: Array<{
        filename: string;
        error: string;
    }>;
    processed_at: string;
    uuid: UUID;
    session_id: string;
};
export type SDKTaskNotificationMessage = {
    type: 'system';
    subtype: 'task_notification';
    task_id: string;
    tool_use_id?: string;
    status: 'completed' | 'failed' | 'stopped';
    output_file: string;
    summary: string;
    usage?: {
        total_tokens: number;
        tool_uses: number;
        duration_ms: number;
    };
    uuid: UUID;
    session_id: string;
};
export type SDKTaskStartedMessage = {
    type: 'system';
    subtype: 'task_started';
    task_id: string;
    tool_use_id?: string;
    description: string;
    task_type?: string;
    workflow_name?: string;
    prompt?: string;
    uuid: UUID;
    session_id: string;
};
export type SDKSessionStateChangedMessage = {
    type: 'system';
    subtype: 'session_state_changed';
    state: 'idle' | 'running' | 'requires_action';
    uuid: UUID;
    session_id: string;
};
export type SDKTaskProgressMessage = {
    type: 'system';
    subtype: 'task_progress';
    task_id: string;
    tool_use_id?: string;
    description: string;
    usage: {
        total_tokens: number;
        tool_uses: number;
        duration_ms: number;
    };
    last_tool_name?: string;
    summary?: string;
    uuid: UUID;
    session_id: string;
};
export type SDKToolUseSummaryMessage = {
    type: 'tool_use_summary';
    summary: string;
    preceding_tool_use_ids: Array<string>;
    uuid: UUID;
    session_id: string;
};
export type SDKElicitationCompleteMessage = {
    type: 'system';
    subtype: 'elicitation_complete';
    mcp_server_name: string;
    elicitation_id: string;
    uuid: UUID;
    session_id: string;
};
export type SDKPromptSuggestionMessage = {
    type: 'prompt_suggestion';
    suggestion: string;
    uuid: UUID;
    session_id: string;
};
export type SDKSessionInfo = {
    sessionId: string;
    summary: string;
    lastModified: number;
    fileSize?: number;
    customTitle?: string;
    firstPrompt?: string;
    gitBranch?: string;
    cwd?: string;
    tag?: string;
    createdAt?: number;
};
export type SDKActiveGoalMessage = {
    type: 'active_goal';
    value: ({
        condition: string;
        iterations: number;
        set_at: number;
        tokens_at_start: number;
        last_reason?: string;
    }) | null;
    uuid: UUID;
    session_id: string;
};
export type SDKConversationResetMessage = {
    type: 'conversation_reset';
    new_conversation_id: UUID;
    uuid: UUID;
    session_id: string;
    trigger?: 'clear' | 'plan_mode_exit' | 'fresh_session' | 'onboarding';
    user_message_uuid?: string;
    timestamp?: string;
};
export type SDKUiSystemMessage = UiSystemEvent287 & {uuid: UUID; session_id: string};
export type SDKAutocompactStateMessage = {
    type:'autocompact_state';
    value:{enabled:boolean;effective_window:number;threshold:number;enforced:boolean;
      source:'env'|'settings'|'clientdata'|'experiment'|'model-default'|'unknown-model'|'auto'};
    uuid:UUID;session_id:string;
};
export type SDKControlRequestProgressMessage = {type:"system";subtype:"control_request_progress";request_id:string;status:"started"|"api_retry";attempt?:number;max_retries?:number;retry_delay_ms?:number;error_status?:number|null;uuid:UUID;session_id:string}

/** Fixed 287 hI.xp / Fp wire event; type-only, no runtime registry. */
export type SDKBridgeStateMessage287 = {
    type:'system';subtype:'bridge_state';
    state:import('../../bridge/replBridge.js').BridgeState|'policy_disabled';
    detail?:string;failure_kind?:string;bridge_epoch?:number;
    uuid:UUID;session_id:string;
};

export type SDKMessage = SDKBridgeStateMessage287 | SDKTranscriptMirrorMessage287 | SDKControlRequestProgressMessage | SDKAutocompactStateMessage | SDKUiSystemMessage | SDKCommandsChangedMessage | (SDKActiveGoalMessage) | (SDKConversationResetMessage) | (SDKAssistantMessage) | (SDKUserMessage) | (SDKUserMessageReplay) | (SDKResultMessage) | (SDKSystemMessage) | (SDKPartialAssistantMessage) | (SDKCompactBoundaryMessage) | (SDKStatusMessage) | (SDKAPIRetryMessage) | (SDKLocalCommandOutputMessage) | (SDKHookStartedMessage) | (SDKHookProgressMessage) | (SDKHookResponseMessage) | (SDKToolProgressMessage) | (SDKAuthStatusMessage) | (SDKTaskNotificationMessage) | (SDKTaskStartedMessage) | (SDKTaskProgressMessage) | (SDKSessionStateChangedMessage) | (SDKFilesPersistedEvent) | (SDKToolUseSummaryMessage) | (SDKRateLimitEvent) | (SDKElicitationCompleteMessage) | (SDKPromptSuggestionMessage);
export type FastModeState = 'off' | 'cooldown' | 'on';
