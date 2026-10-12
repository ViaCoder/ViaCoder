import type {AuthDecoders} from '../officialAuthEnvironment/runtime.js'
export type TypedEnvironment287 = {
  readonly AGENT_PROXY_AUTH_TOKEN: string | undefined
  readonly ANTHROPIC_API_KEY: string | undefined
  readonly ANTHROPIC_AUTH_TOKEN: string | undefined
  readonly ANTHROPIC_AWS_API_KEY: string | undefined
  readonly ANTHROPIC_FEDERATION_RULE_ID: string | undefined
  readonly ANTHROPIC_FOUNDRY_API_KEY: string | undefined
  readonly ANTHROPIC_FOUNDRY_AUTH_TOKEN: string | undefined
  readonly ANTHROPIC_ORGANIZATION_ID: string | undefined
  readonly ANTHROPIC_PROFILE: string | undefined
  readonly ANTHROPIC_WORKSPACE_ID: string | undefined
  readonly AWS_BEARER_TOKEN_BEDROCK: string | undefined
  readonly AWS_CONTAINER_CREDENTIALS_FULL_URI: string | undefined
  readonly AWS_CONTAINER_CREDENTIALS_RELATIVE_URI: string | undefined
  readonly AWS_ROLE_ARN: string | undefined
  readonly AWS_WEB_IDENTITY_TOKEN_FILE: string | undefined
  readonly CLAUDE_CODE_ACCOUNT_TAGGED_ID: string | undefined
  readonly CLAUDE_CODE_ACCOUNT_UUID: string | undefined
  readonly CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR: string | undefined
  readonly CLAUDE_CODE_API_KEY_HELPER_TTL_MS: number | undefined
  readonly CLAUDE_CODE_AUTH_FAIL_EXIT_MS: number | undefined
  readonly CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_CUSTOM_OAUTH_URL: string | undefined
  readonly CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID: string | undefined
  readonly CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER: boolean
  readonly CLAUDE_CODE_FEDERATION_CACHE_DIR: string | undefined
  readonly CLAUDE_CODE_GATEWAY_TOKEN_FILE_DESCRIPTOR: string | undefined
  readonly CLAUDE_CODE_HFI_BEARER_TOKEN: string | undefined
  readonly CLAUDE_CODE_HOST_AUTH_ENV_VAR: string | undefined
  readonly CLAUDE_CODE_HOST_AUTH_REFRESH_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_HOST_CREDS_FILE: string | undefined
  readonly CLAUDE_CODE_OAUTH_401_WAIT_MS: number | undefined
  readonly CLAUDE_CODE_OAUTH_CLIENT_ID: string | undefined
  readonly CLAUDE_CODE_OAUTH_REFRESH_TOKEN: string | undefined
  readonly CLAUDE_CODE_OAUTH_SCOPES: string | undefined
  readonly CLAUDE_CODE_OAUTH_TOKEN: string | undefined
  readonly CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR: string | undefined
  readonly CLAUDE_CODE_ORGANIZATION_UUID: string | undefined
  readonly CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS: number | undefined
  readonly CLAUDE_CODE_RATE_LIMIT_TIER: string | undefined
  readonly CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH: boolean
  readonly CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH: boolean
  readonly CLAUDE_CODE_SESSION_ACCESS_TOKEN: string | undefined
  readonly CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH: boolean
  readonly CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH: boolean
  readonly CLAUDE_CODE_SKIP_AWS_CRED_CACHE: boolean
  readonly CLAUDE_CODE_SKIP_BEDROCK_AUTH: boolean
  readonly CLAUDE_CODE_SKIP_FOUNDRY_AUTH: boolean
  readonly CLAUDE_CODE_SKIP_MANTLE_AUTH: boolean
  readonly CLAUDE_CODE_SKIP_VERTEX_AUTH: boolean
  readonly CLAUDE_CODE_SUBSCRIPTION_TYPE: string | undefined
  readonly CLAUDE_CODE_USER_EMAIL: string | undefined
  readonly CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR: string | undefined
  readonly CLAUDE_LOCAL_OAUTH_API_BASE: string | undefined
  readonly CLAUDE_LOCAL_OAUTH_APPS_BASE: string | undefined
  readonly CLAUDE_LOCAL_OAUTH_CONSOLE_BASE: string | undefined
  readonly CLAUDE_SESSION_INGRESS_TOKEN_FILE: string | undefined
  readonly CLAUDE_TRUSTED_DEVICE_TOKEN: string | undefined
  readonly CLOUDSDK_AUTH_ACCESS_TOKEN: string | undefined
  readonly ENVIRONMENT_SERVICE_KEY: string | undefined
  readonly MCP_CLIENT_SECRET: string | undefined
  readonly MCP_XAA_IDP_CLIENT_SECRET: string | undefined
  readonly USE_LOCAL_OAUTH: boolean
  readonly USE_STAGING_OAUTH: boolean
  readonly AGENT_PROXY_URL: string | undefined
  readonly ANTHROPIC_AWS_BASE_URL: string | undefined
  readonly ANTHROPIC_AWS_WORKSPACE_ID: string | undefined
  readonly ANTHROPIC_BASE_URL: string | undefined
  readonly ANTHROPIC_BEDROCK_BASE_URL: string | undefined
  readonly ANTHROPIC_BEDROCK_MANTLE_BASE_URL: string | undefined
  readonly ANTHROPIC_BEDROCK_REGION_PREFIX: string | undefined
  readonly ANTHROPIC_BEDROCK_SERVICE_TIER: string | undefined
  readonly ANTHROPIC_FOUNDRY_BASE_URL: string | undefined
  readonly ANTHROPIC_FOUNDRY_RESOURCE: string | undefined
  readonly ANTHROPIC_GOOGLE_CLOUD_BASE_URL: string | undefined
  readonly ANTHROPIC_GOOGLE_CLOUD_LOCATION: string | undefined
  readonly ANTHROPIC_GOOGLE_CLOUD_PROJECT: string | undefined
  readonly ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID: string | undefined
  readonly ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION: string | undefined
  readonly ANTHROPIC_UNIX_SOCKET: string | undefined
  readonly ANTHROPIC_VERTEX_BASE_URL: string | undefined
  readonly ANTHROPIC_VERTEX_PROJECT_ID: string | undefined
  readonly AWS_ACCESS_KEY_ID: string | undefined
  readonly AWS_CONFIG_FILE: string | undefined
  readonly AWS_DEFAULT_REGION: string | undefined
  readonly AWS_ENDPOINT_URL: string | undefined
  readonly AWS_ENDPOINT_URL_BEDROCK: string | undefined
  readonly AWS_ENDPOINT_URL_BEDROCK_RUNTIME: string | undefined
  readonly AWS_ENDPOINT_URL_STS: string | undefined
  readonly AWS_PROFILE: string | undefined
  readonly AWS_REGION: string | undefined
  readonly AWS_SECRET_ACCESS_KEY: string | undefined
  readonly AWS_SESSION_TOKEN: string | undefined
  readonly AWS_SHARED_CREDENTIALS_FILE: string | undefined
  readonly AWS_USE_FIPS_ENDPOINT: string | undefined
  readonly CCR_AGENT_PROXY_CA_CERT_B64: string | undefined
  readonly CCR_AGENT_PROXY_ENABLED: boolean
  readonly CCR_AGENT_PROXY_FRAME_HOSTS: string | undefined
  readonly CCR_AGENT_PROXY_INCLUDE_HOSTS: string | undefined
  readonly CCR_AGENT_PROXY_NO_PROXY_LOCAL_ONLY: boolean
  readonly CCR_AGENT_PROXY_RECEIVE_GATE_DISABLED: boolean
  readonly CCR_AGENT_PROXY_RELAY_MODE: string | undefined
  readonly CCR_AGENT_PROXY_UPLOAD_GATE_DISABLED: boolean
  readonly CCR_ENABLE_BUNDLE: boolean
  readonly CCR_FORCE_BUNDLE: boolean
  readonly CCR_ON_BRANCH_DEFAULT_GUARD: string | undefined
  readonly CLAUDE_CODE_AGENT_PROXY_GH_SHIM: boolean
  readonly CLAUDE_CODE_AGENT_PROXY_GIT_CONFIG: boolean
  readonly CLAUDE_CODE_AGENT_PROXY_GIT_HOSTS: string | undefined
  readonly CLAUDE_CODE_API_BASE_URL: string | undefined
  readonly CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY: boolean
  readonly CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_GB_BASE_URL: string | undefined
  readonly CLAUDE_CODE_GB_REFRESH_INTERVAL_MS: number | undefined
  readonly CLAUDE_CODE_HOST_GATEWAY_LINEAGE: boolean
  readonly CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST: boolean
  readonly CLAUDE_CODE_PROXY_RESOLVES_HOSTS: boolean
  readonly CLAUDE_CODE_SIMULATE_PROXY_USAGE: boolean
  readonly CLAUDE_CODE_SKIP_HFI_VERSION_CHECK: boolean
  readonly CLAUDE_CODE_USE_ANTHROPIC_AWS: boolean
  readonly CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD: boolean
  readonly CLAUDE_CODE_USE_BEDROCK: boolean
  readonly CLAUDE_CODE_USE_FOUNDRY: boolean
  readonly CLAUDE_CODE_USE_GATEWAY: boolean
  readonly CLAUDE_CODE_USE_MANTLE: boolean
  readonly CLAUDE_CODE_USE_VERTEX: boolean
  readonly CLAUDE_GATEWAY_ALLOW_LOOPBACK: boolean
  readonly CLAUDE_GATEWAY_DRAIN_TIMEOUT_MS: number | undefined
  readonly CLAUDE_GATEWAY_LOG_LEVEL: string | undefined
  readonly CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY: boolean
  readonly CLOUD_ML_REGION: string | undefined
  readonly _CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL: boolean
  readonly ANTHROPIC_CUSTOM_MODEL_OPTION: string | undefined
  readonly ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION: string | undefined
  readonly ANTHROPIC_CUSTOM_MODEL_OPTION_NAME: string | undefined
  readonly ANTHROPIC_DEFAULT_FABLE_MODEL: string | undefined
  readonly ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION: string | undefined
  readonly ANTHROPIC_DEFAULT_FABLE_MODEL_NAME: string | undefined
  readonly ANTHROPIC_DEFAULT_HAIKU_MODEL: string | undefined
  readonly ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION: string | undefined
  readonly ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME: string | undefined
  readonly ANTHROPIC_DEFAULT_MODEL: string | undefined
  readonly ANTHROPIC_DEFAULT_OPUS_MODEL: string | undefined
  readonly ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION: string | undefined
  readonly ANTHROPIC_DEFAULT_OPUS_MODEL_NAME: string | undefined
  readonly ANTHROPIC_DEFAULT_SONNET_MODEL: string | undefined
  readonly ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION: string | undefined
  readonly ANTHROPIC_DEFAULT_SONNET_MODEL_NAME: string | undefined
  readonly ANTHROPIC_MODEL: string | undefined
  readonly ANTHROPIC_SMALL_FAST_MODEL: string | undefined
  readonly CLAUDE_CODE_3P_PROBE_WROTE_HAIKU_DEFAULT: string | undefined
  readonly CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT: string | undefined
  readonly CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT: string | undefined
  readonly CLAUDE_CODE_3P_SEEDED_OPUS_DEFAULT: string | undefined
  readonly CLAUDE_CODE_3P_SEEDED_SONNET_DEFAULT: string | undefined
  readonly CLAUDE_CODE_ALWAYS_ENABLE_EFFORT: boolean
  readonly CLAUDE_CODE_AUTO_MODE_MODEL: string | undefined
  readonly CLAUDE_CODE_BG_CLASSIFIER_MODEL: string | undefined
  readonly CLAUDE_CODE_CLIENT_DATA_URL: string | undefined
  readonly CLAUDE_CODE_DISABLE_1M_CONTEXT: boolean
  readonly CLAUDE_CODE_DISABLE_EXPLORE_INHERIT_CAP: boolean
  readonly CLAUDE_CODE_DISABLE_FAST_MODE: boolean
  readonly CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP: boolean
  readonly CLAUDE_CODE_DISABLE_MODEL_ACCESS_FALLBACK: boolean
  readonly CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT: boolean
  readonly CLAUDE_CODE_EFFORT_LEVEL: string | undefined
  readonly CLAUDE_CODE_MAX_EFFORT_REMINDER: boolean | undefined
  readonly CLAUDE_CODE_MODEL_CATALOG: string | undefined
  readonly CLAUDE_CODE_MODEL_CATALOG_URL: string | undefined
  readonly CLAUDE_CODE_NO_MODEL_FALLBACK: boolean
  readonly CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS: boolean
  readonly CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK: boolean
  readonly CLAUDE_CODE_SKIP_MODEL_ACCESS_MEMORY: boolean
  readonly CLAUDE_CODE_SUBAGENT_MODEL: string | undefined
  readonly CLAUDE_CODE_SUBAGENT_MODEL_FORCE: boolean
  readonly FALLBACK_FOR_ALL_PRIMARY_MODELS: string | undefined
  readonly CLAUDE_AX_PREPARK_MS: number | undefined
  readonly CLAUDE_AX_SCREEN_READER: boolean | undefined
  readonly CLAUDE_AX_STARTUP_QUIET_MS: number | undefined
  readonly CLAUDE_CHROME_CLASSIFIER_FLOOR: boolean | undefined
  readonly CLAUDE_CODE_ACCESSIBILITY: boolean
  readonly CLAUDE_CODE_ACT_DONT_REDERIVE: boolean | undefined
  readonly CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT: boolean
  readonly CLAUDE_CODE_AMBER_ASTROLABE: boolean
  readonly CLAUDE_CODE_ARTIFACT_ASSETS: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_COMMENTS: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_COMMENTS_AUTOREACT: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_COMMENT_FAST_ACK: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_COMMENT_FAST_ACK_FIXED: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_COMMENT_RESPONDER: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_DB: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_DB_STR_REPLACE: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_DELETE: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_FRESH_READ: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_HOT: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_MULTI_FILE: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_OPENING_PREFETCH: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_OPEN_ACTION: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_PATH_PIN: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_PIN: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_PRESENCE: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_PREVIEW: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_QUICKSTART: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_REPL: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_ROOM: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_SHARE: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_START_KIT: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_TEXT_VARIANT: string | undefined
  readonly CLAUDE_CODE_ARTIFACT_TOOLSET: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_TYPES: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_TYPE_CATALOG: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_TYPE_CLOUD_CREATE: boolean | undefined
  readonly CLAUDE_CODE_ARTIFACT_VERIFY: boolean | undefined
  readonly CLAUDE_CODE_ATTRIBUTION_ANNOUNCEMENT: boolean | undefined
  readonly CLAUDE_CODE_AUTO_CONNECT_IDE: boolean | undefined
  readonly CLAUDE_CODE_AUTO_MODE_SERVER: string | undefined
  readonly CLAUDE_CODE_BASALT_COVE: boolean
  readonly CLAUDE_CODE_BASH_EDIT_DIFF: boolean | undefined
  readonly CLAUDE_CODE_BASH_OUTPUT_AUDIENCE_NOTE: boolean | undefined
  readonly CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR: boolean
  readonly CLAUDE_CODE_BG_TASKS_REPORT_RUNNING: boolean | undefined
  readonly CLAUDE_CODE_BISON_CAIRN: boolean | undefined
  readonly CLAUDE_CODE_BREEZY_HORIZON: string | undefined
  readonly CLAUDE_CODE_BUBBLEWRAP: boolean
  readonly CLAUDE_CODE_CCR_EARLY_HYDRATE_PREFETCH: boolean
  readonly CLAUDE_CODE_CCR_EARLY_PLUGINS_SYNC: boolean
  readonly CLAUDE_CODE_CCR_EARLY_REMOTE_CONNECT: boolean
  readonly CLAUDE_CODE_CCR_EARLY_SKILLS_SYNC: boolean
  readonly CLAUDE_CODE_CCR_FOLD_FIRST_TURN_RESCAN: boolean
  readonly CLAUDE_CODE_CCR_SKIP_FRESH_MIGRATIONS: boolean
  readonly CLAUDE_CODE_CHILD_SESSION: boolean
  readonly CLAUDE_CODE_CHROME_MCP_ORG_DENIED: boolean
  readonly CLAUDE_CODE_COLD_COMPACT: boolean
  readonly CLAUDE_CODE_COORDINATOR_FORCE_WORKER_INHERIT_MODEL: boolean
  readonly CLAUDE_CODE_COWORK_FRAME_ARTIFACTS: boolean
  readonly CLAUDE_CODE_COZY_TEAPOT: string | undefined
  readonly CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING: boolean
  readonly CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION: boolean
  readonly CLAUDE_CODE_DISABLE_ADVISOR_TOOL: boolean
  readonly CLAUDE_CODE_DISABLE_AGENT_VIEW: boolean
  readonly CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN: boolean
  readonly CLAUDE_CODE_DISABLE_ARTIFACT: boolean
  readonly CLAUDE_CODE_DISABLE_ATTACHMENTS: boolean
  readonly CLAUDE_CODE_DISABLE_ATTRIBUTION_CROSS_REPO: boolean
  readonly CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK: boolean
  readonly CLAUDE_CODE_DISABLE_AUTO_MEMORY: boolean
  readonly CLAUDE_CODE_DISABLE_AWAITING_USER_IDLE: boolean
  readonly CLAUDE_CODE_DISABLE_BACKGROUND_TASKS: boolean
  readonly CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_DEFAULT: boolean
  readonly CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD: boolean
  readonly CLAUDE_CODE_DISABLE_BG_EXIT_HANDOFF: boolean
  readonly CLAUDE_CODE_DISABLE_BUNDLED_SKILLS: boolean
  readonly CLAUDE_CODE_DISABLE_CFC_PROMPT: boolean
  readonly CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL: boolean
  readonly CLAUDE_CODE_DISABLE_CLAUDE_CODE_SKILL: boolean
  readonly CLAUDE_CODE_DISABLE_CLAUDE_MDS: boolean
  readonly CLAUDE_CODE_DISABLE_CRON: boolean
  readonly CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT: boolean
  readonly CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS: boolean
  readonly CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS: boolean
  readonly CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY: boolean
  readonly CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING: boolean
  readonly CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS: boolean | undefined
  readonly CLAUDE_CODE_DISABLE_LAUNCH_COMPOSER: boolean
  readonly CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND: boolean
  readonly CLAUDE_CODE_DISABLE_MEMORY_BULK_INFLATE: boolean
  readonly CLAUDE_CODE_DISABLE_MEMORY_MASS_DELETE_HOLD: boolean
  readonly CLAUDE_CODE_DISABLE_MEMORY_PERIODIC_RESYNC: boolean
  readonly CLAUDE_CODE_DISABLE_MEMORY_RO_UNSAVED_NOTICE: boolean
  readonly CLAUDE_CODE_DISABLE_MEMORY_STREAM_LIST: boolean
  readonly CLAUDE_CODE_DISABLE_MOUSE: boolean | undefined
  readonly CLAUDE_CODE_DISABLE_MOUSE_CLICKS: boolean | undefined
  readonly CLAUDE_CODE_DISABLE_NESTED_CHAIN_IDLE: boolean
  readonly CLAUDE_CODE_DISABLE_NESTED_USER_REPAIR: boolean
  readonly CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: boolean
  readonly CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK: boolean
  readonly CLAUDE_CODE_DISABLE_NOTIFICATION_PRESENCE_CHECK: boolean
  readonly CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL: boolean
  readonly CLAUDE_CODE_DISABLE_ORG_MEMORY: boolean
  readonly CLAUDE_CODE_DISABLE_PERMISSION_PROMPT_NOTIFY_HOOKS: boolean
  readonly CLAUDE_CODE_DISABLE_POLICY_SKILLS: boolean
  readonly CLAUDE_CODE_DISABLE_POWERSHELL_CMD_RM_DENY: boolean
  readonly CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP: boolean
  readonly CLAUDE_CODE_DISABLE_REFUSAL_FALLBACK: boolean
  readonly CLAUDE_CODE_DISABLE_REFUSAL_RETRY: boolean
  readonly CLAUDE_CODE_DISABLE_STARTUP_WORK_GATE: boolean
  readonly CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT: boolean
  readonly CLAUDE_CODE_DISABLE_TERMINAL_TITLE: boolean
  readonly CLAUDE_CODE_DISABLE_THINKING: boolean
  readonly CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL: boolean
  readonly CLAUDE_CODE_DISABLE_WEB_FETCH: boolean
  readonly CLAUDE_CODE_DISABLE_WINDOWS_SHELL_LAUNCHER: boolean
  readonly CLAUDE_CODE_DISABLE_WORKFLOWS: boolean
  readonly CLAUDE_CODE_EDITOR_CODELIVERY: boolean
  readonly CLAUDE_CODE_ELEGANT_MEADOW: boolean | undefined
  readonly CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT: boolean
  readonly CLAUDE_CODE_ENABLE_AWAY_SUMMARY: boolean
  readonly CLAUDE_CODE_ENABLE_BACKGROUND_PLUGIN_REFRESH: boolean
  readonly CLAUDE_CODE_ENABLE_CFC: boolean | undefined
  readonly CLAUDE_CODE_ENABLE_DESIGN_SYNC: boolean
  readonly CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL: boolean
  readonly CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL: boolean
  readonly CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING: boolean | undefined
  readonly CLAUDE_CODE_ENABLE_LAUNCH_COMPOSER: boolean
  readonly CLAUDE_CODE_ENABLE_MENU_KIND_LANES: boolean
  readonly CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION: boolean | undefined
  readonly CLAUDE_CODE_ENABLE_REFRESH_MCP_TOOLS: boolean
  readonly CLAUDE_CODE_ENABLE_REMOTE_RECAP: boolean | undefined
  readonly CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING: boolean
  readonly CLAUDE_CODE_ENABLE_TASKS: boolean | undefined
  readonly CLAUDE_CODE_ENABLE_TODO_TOOLS: boolean
  readonly CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT: boolean
  readonly CLAUDE_CODE_ENABLE_XAA: boolean
  readonly CLAUDE_CODE_EVAL_INTERVIEW_SESSION: boolean
  readonly CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: boolean
  readonly CLAUDE_CODE_EXPERIMENTAL_OBSERVER_AGENTS: boolean
  readonly CLAUDE_CODE_FLEETVIEW_SIMPLE: boolean
  readonly CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM: boolean
  readonly CLAUDE_CODE_FORCE_SESSION_PERSISTENCE: boolean
  readonly CLAUDE_CODE_FORCE_STRIKETHROUGH: boolean
  readonly CLAUDE_CODE_FORCE_TERMINAL_IMAGES: boolean
  readonly CLAUDE_CODE_FORCE_WINDOWS_CREDMAN: string | undefined
  readonly CLAUDE_CODE_FORK_SUBAGENT: boolean | undefined
  readonly CLAUDE_CODE_FORWARD_SUBAGENT_TEXT: boolean
  readonly CLAUDE_CODE_FORWARD_USER_INTENT: boolean
  readonly CLAUDE_CODE_GATEWAY_HINT_HEADERS: boolean | undefined
  readonly CLAUDE_CODE_GB_DISK_CACHE_WHEN_TELEMETRY_OFF: boolean
  readonly CLAUDE_CODE_GENTLE_PARASOL: string | undefined
  readonly CLAUDE_CODE_GLOB_HIDDEN: boolean
  readonly CLAUDE_CODE_GLOB_NO_IGNORE: boolean
  readonly CLAUDE_CODE_GORSE_PLOVER: boolean
  readonly CLAUDE_CODE_GROWTHBOOK_KICK_FROM_INIT: boolean
  readonly CLAUDE_CODE_HARBOR_KITE: string | undefined
  readonly CLAUDE_CODE_HARBOR_KITE_CLOUD: boolean
  readonly CLAUDE_CODE_HARBOR_KITE_PACING_OFF: boolean
  readonly CLAUDE_CODE_HIDE_CWD: boolean
  readonly CLAUDE_CODE_HOOKS_SAME_THREAD: boolean
  readonly CLAUDE_CODE_HOST_SCHEDULED_RUN: boolean
  readonly CLAUDE_CODE_HOVER_REST: boolean | undefined
  readonly CLAUDE_CODE_HUMBLE_HAMMOCK: boolean | undefined
  readonly CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL: boolean
  readonly CLAUDE_CODE_IDE_SKIP_VALID_CHECK: boolean
  readonly CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES: boolean
  readonly CLAUDE_CODE_INLINE_TOOLS: boolean | undefined
  readonly CLAUDE_CODE_INTRO_FRAME: boolean | undefined
  readonly CLAUDE_CODE_JUNIPER_SUNDIAL: number | undefined
  readonly CLAUDE_CODE_KB_COHESION_FIXES: boolean
  readonly CLAUDE_CODE_LANTERN_PRISM: boolean
  readonly CLAUDE_CODE_LARCH_CISTERN: boolean
  readonly CLAUDE_CODE_MEMORY_PUSH_DELETE_MODE: string | undefined
  readonly CLAUDE_CODE_MODEL_CAPABILITIES: string | undefined
  readonly CLAUDE_CODE_NANKEEN_KESTREL: boolean
  readonly CLAUDE_CODE_NATIVE_CURSOR: boolean
  readonly CLAUDE_CODE_NEW_INIT: boolean
  readonly CLAUDE_CODE_NONBLOCKING_STDOUT: boolean | undefined
  readonly CLAUDE_CODE_NO_FLICKER: boolean | undefined
  readonly CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE: boolean
  readonly CLAUDE_CODE_PARSED_WILLOW: boolean | undefined
  readonly CLAUDE_CODE_PEWTER_OWL: boolean | undefined
  readonly CLAUDE_CODE_PEWTER_OWL_TOOL: boolean | undefined
  readonly CLAUDE_CODE_PLAN_MODE_REQUIRED: boolean
  readonly CLAUDE_CODE_PLUGIN_BINARY_ASSETS: boolean
  readonly CLAUDE_CODE_PLUGIN_DIRS: string | undefined
  readonly CLAUDE_CODE_PLUGIN_DIR_WATCH: boolean | undefined
  readonly CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE: boolean
  readonly CLAUDE_CODE_PLUGIN_PREFER_HTTPS: boolean
  readonly CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE: boolean
  readonly CLAUDE_CODE_POLISHED_DEWDROP: string | undefined
  readonly CLAUDE_CODE_POLL_EVENTS: boolean
  readonly CLAUDE_CODE_POLL_EVENT_DECLARATIONS: string | undefined
  readonly CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY: boolean
  readonly CLAUDE_CODE_PROACTIVE: boolean
  readonly CLAUDE_CODE_PROJECTS_SESSION: boolean
  readonly CLAUDE_CODE_PROMPT_CACHE_TTL: string | undefined
  readonly CLAUDE_CODE_PROPAGATE_TRACEPARENT: boolean
  readonly CLAUDE_CODE_REFUSAL_FALLBACK_CATCH_ALL: boolean | undefined
  readonly CLAUDE_CODE_REMOTE_TOOLS_FORWARD: boolean
  readonly CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN: boolean
  readonly CLAUDE_CODE_REPORT_FINDINGS: boolean
  readonly CLAUDE_CODE_RUSTLING_PIXEL: string | undefined
  readonly CLAUDE_CODE_SEND_FEEDBACK: boolean | undefined
  readonly CLAUDE_CODE_SESSION_ATTENDED: boolean | undefined
  readonly CLAUDE_CODE_SILENT_TURN_REMINDER: boolean | undefined
  readonly CLAUDE_CODE_SILENT_TURN_REMINDER_TEXT: string | undefined
  readonly CLAUDE_CODE_SILENT_TURN_REMINDER_TURNS: number | undefined
  readonly CLAUDE_CODE_SKILL_PROPOSALS: boolean
  readonly CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS: boolean
  readonly CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS_EXCEPT: string | undefined
  readonly CLAUDE_CODE_SKIP_PROJECT_BACKFILL: boolean
  readonly CLAUDE_CODE_SKIP_PROMPT_HISTORY: boolean
  readonly CLAUDE_CODE_SKIP_REPO_UPLOAD: boolean
  readonly CLAUDE_CODE_SQUISHY_NEWT: boolean | undefined
  readonly CLAUDE_CODE_STELLAR_DRIFT: boolean | undefined
  readonly CLAUDE_CODE_SUBAGENT_CACHE_EVICT: boolean
  readonly CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL: string | undefined
  readonly CLAUDE_CODE_SUPPRESS_SESSION_ATTRIBUTION: boolean
  readonly CLAUDE_CODE_SYNC_PLUGINS: boolean
  readonly CLAUDE_CODE_SYNC_PLUGIN_INSTALL: boolean
  readonly CLAUDE_CODE_SYNC_SKILLS: boolean
  readonly CLAUDE_CODE_TAG_ISMETA_MESSAGES: boolean
  readonly CLAUDE_CODE_THINKING_DISPLAY_UPDATES: boolean | undefined
  readonly CLAUDE_CODE_THISTLE_GREBE: string | undefined
  readonly CLAUDE_CODE_THRIFTY_SONIC: boolean | undefined
  readonly CLAUDE_CODE_TOASTY_THIMBLE: string | undefined
  readonly CLAUDE_CODE_TODO_REMINDER_MODE: string | undefined
  readonly CLAUDE_CODE_TOTAL_TOKENS_REMINDER: string | undefined
  readonly CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN: boolean | undefined
  readonly CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET: number | undefined
  readonly CLAUDE_CODE_TRANSCRIPT_LOCAL_GC: boolean | undefined
  readonly CLAUDE_CODE_TURN_UPDATES: boolean | undefined
  readonly CLAUDE_CODE_TWO_STAGE_CLASSIFIER: boolean
  readonly CLAUDE_CODE_USE_COWORK_PLUGINS: boolean
  readonly CLAUDE_CODE_USE_NATIVE_FILE_SEARCH: boolean
  readonly CLAUDE_CODE_USE_POWERSHELL_TOOL: boolean | undefined
  readonly CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS: number | undefined
  readonly CLAUDE_CODE_WEBFETCH_DEADLINE_MS: number | undefined
  readonly CLAUDE_CODE_WEBFETCH_USE_CCR_PROXY: boolean
  readonly CLAUDE_CODE_WEBSEARCH_USE_CCR_PROXY: boolean
  readonly CLAUDE_CODE_WEB_FETCH_AGENT: boolean | undefined
  readonly CLAUDE_CODE_WEB_SEARCH_FAST_ARG: boolean | undefined
  readonly CLAUDE_CODE_WHIMSICAL_ELEPHANT: boolean | undefined
  readonly CLAUDE_CODE_WILLOW_TERN: boolean
  readonly CLAUDE_CODE_WISE_COMET: boolean | undefined
  readonly CLAUDE_CODE_WORKFLOWS: boolean | undefined
  readonly CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS: number | undefined
  readonly CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS: number | undefined
  readonly CLAUDE_CODE_WORKFLOW_SIZE_WARNING_AGENTS: number | undefined
  readonly CLAUDE_CODE_WORKFLOW_SIZE_WARNING_TOKENS: number | undefined
  readonly CLAUDE_DISABLE_ADOPT: boolean
  readonly CLAUDE_IMPORT_CONVERSATIONS: boolean
  readonly CLAUDE_RUNNER_DISABLE_AWAITING_ACTION_OVERRIDE: boolean
  readonly CLAUDE_WORKFLOW_NAME_ONLY: boolean
  readonly DISABLE_AUTOUPDATER: boolean
  readonly DISABLE_AUTO_COMPACT: boolean
  readonly DISABLE_BRIEF_MODE_STOP_HOOK: boolean
  readonly DISABLE_BUG_COMMAND: boolean
  readonly DISABLE_COST_WARNINGS: boolean
  readonly DISABLE_DOCTOR_COMMAND: boolean
  readonly DISABLE_ERROR_REPORTING: boolean
  readonly DISABLE_EXTRA_USAGE_COMMAND: boolean
  readonly DISABLE_FEEDBACK_COMMAND: boolean
  readonly DISABLE_GROWTHBOOK: boolean
  readonly DISABLE_INSTALL_GITHUB_APP_COMMAND: boolean
  readonly DISABLE_INTERLEAVED_THINKING: boolean
  readonly DISABLE_LOGIN_COMMAND: boolean
  readonly DISABLE_LOGOUT_COMMAND: boolean
  readonly DISABLE_PROMPT_CACHING: boolean
  readonly DISABLE_PROMPT_CACHING_FABLE: boolean
  readonly DISABLE_PROMPT_CACHING_HAIKU: boolean
  readonly DISABLE_PROMPT_CACHING_MYTHOS: boolean
  readonly DISABLE_PROMPT_CACHING_OPUS: boolean
  readonly DISABLE_PROMPT_CACHING_SONNET: boolean
  readonly DISABLE_TELEMETRY: boolean
  readonly DISABLE_UPDATES: boolean
  readonly DISABLE_UPGRADE_COMMAND: boolean
  readonly EMBEDDED_SEARCH_TOOLS: boolean
  readonly ENABLE_BETA_TRACING_DETAILED: boolean
  readonly ENABLE_CLAUDEAI_MCP_SERVERS: boolean | undefined
  readonly ENABLE_ENHANCED_TELEMETRY_BETA: boolean
  readonly ENABLE_LOCKLESS_UPDATES: boolean
  readonly ENABLE_LSP_TOOL: boolean
  readonly ENABLE_MCP_LARGE_OUTPUT_FILES: boolean | undefined
  readonly ENABLE_PID_BASED_VERSION_LOCKING: boolean | undefined
  readonly ENABLE_PROMPT_CACHING_1H: boolean
  readonly ENABLE_PROMPT_CACHING_1H_BEDROCK: boolean
  readonly ENABLE_SESSION_BACKGROUNDING: boolean
  readonly ENABLE_SESSION_PERSISTENCE: boolean
  readonly ENABLE_TOOL_SEARCH: string | undefined
  readonly FORCE_AUTOUPDATE_PLUGINS: boolean
  readonly FORCE_CODE_TERMINAL: boolean
  readonly FORCE_PROMPT_CACHING_5M: boolean
  readonly FORCE_VCR: boolean
  readonly INK_SCREEN_READER: boolean
  readonly USE_API_CONTEXT_MANAGEMENT: boolean
  readonly ALL_PROXY: string | undefined
  readonly ANTHROPIC_BETAS: string | undefined
  readonly ANTHROPIC_CUSTOM_HEADERS: string | undefined
  readonly API_FORCE_IDLE_TIMEOUT: number | undefined
  readonly API_TIMEOUT_MS: number | undefined
  readonly CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_ATTRIBUTION_HEADER: string | undefined
  readonly CLAUDE_CODE_CERT_STORE: string | undefined
  readonly CLAUDE_CODE_CLIENT_CERT: string | undefined
  readonly CLAUDE_CODE_CLIENT_KEY: string | undefined
  readonly CLAUDE_CODE_CLIENT_KEY_PASSPHRASE: string | undefined
  readonly CLAUDE_CODE_DISABLE_MTLS_RELOAD_ON_STALE_CONNECTION: boolean
  readonly CLAUDE_CODE_EAGER_FLUSH: boolean
  readonly CLAUDE_CODE_EXTRA_BODY: string | undefined
  readonly CLAUDE_CODE_EXTRA_METADATA: string | undefined
  readonly CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS: number | undefined
  readonly CLAUDE_CODE_FORCE_SYNC_OUTPUT: boolean
  readonly CLAUDE_CODE_GZIP_CCR_REQUEST_BODIES: boolean | undefined
  readonly CLAUDE_CODE_GZIP_REQUEST_BODIES: boolean | undefined
  readonly CLAUDE_CODE_GZIP_REQUEST_BODY_BLOCKS: number | undefined
  readonly CLAUDE_CODE_GZIP_REQUEST_BODY_LEVEL: number | undefined
  readonly CLAUDE_CODE_MAX_CONTEXT_TOKENS: number | undefined
  readonly CLAUDE_CODE_MAX_OUTPUT_TOKENS: number | undefined
  readonly CLAUDE_CODE_MAX_RETRIES: number | undefined
  readonly CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY: number | undefined
  readonly CLAUDE_CODE_MAX_TURNS: string | undefined
  readonly CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES: number | undefined
  readonly CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS: number | undefined
  readonly CLAUDE_CODE_RETRY_WATCHDOG: boolean
  readonly CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS: number | undefined
  readonly CLAUDE_ENABLE_BYTE_WATCHDOG: boolean | undefined
  readonly CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK: boolean
  readonly CLAUDE_ENABLE_STREAM_WATCHDOG: boolean | undefined
  readonly CLAUDE_MOCK_HEADERLESS_429: boolean
  readonly CLAUDE_SLOW_FIRST_BYTE_MS: number | undefined
  readonly CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS: number | undefined
  readonly CLAUDE_STREAM_IDLE_TIMEOUT_MS: number | undefined
  readonly HTTPS_PROXY: string | undefined
  readonly HTTP_PROXY: string | undefined
  readonly MAX_MCP_OUTPUT_TOKENS: number | undefined
  readonly MAX_STRUCTURED_OUTPUT_RETRIES: number | undefined
  readonly MAX_THINKING_TOKENS: number | undefined
  readonly NO_PROXY: string | undefined
  readonly all_proxy: string | undefined
  readonly http_proxy: string | undefined
  readonly https_proxy: string | undefined
  readonly no_proxy: string | undefined
  readonly ALACRITTY_LOG: string | undefined
  readonly ALLUSERSPROFILE: string | undefined
  readonly ANDROID_HOME: string | undefined
  readonly ANDROID_SDK_ROOT: string | undefined
  readonly APPDATA: string | undefined
  readonly APP_URL: string | undefined
  readonly AWS_CA_BUNDLE: string | undefined
  readonly AWS_EXECUTION_ENV: string | undefined
  readonly AWS_LAMBDA_FUNCTION_NAME: string | undefined
  readonly AZURE_FUNCTIONS_ENVIRONMENT: string | undefined
  readonly BAT_THEME: string | undefined
  readonly BROWSER: string | undefined
  readonly BUILDKITE: string | undefined
  readonly BUN_CHROME_PATH: string | undefined
  readonly BUN_INSTALL: string | undefined
  readonly CARGO_HTTP_CAINFO: string | undefined
  readonly CDPATH: string | undefined
  readonly CF_PAGES: string | undefined
  readonly CIRCLECI: string | undefined
  readonly CLOUDSDK_ACTIVE_CONFIG_NAME: string | undefined
  readonly CLOUDSDK_CONFIG: string | undefined
  readonly CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE: string | undefined
  readonly CODER: string | undefined
  readonly CODER_WORKSPACE_NAME: string | undefined
  readonly CODESPACES: string | undefined
  readonly COLORFGBG: string | undefined
  readonly COLORTERM: string | undefined
  readonly COMPUTERNAME: string | undefined
  readonly COMSPEC: string | undefined
  readonly CONTAINER_SANDBOX_MOUNT_POINT: string | undefined
  readonly CURL_CA_BUNDLE: string | undefined
  readonly CURSOR_TRACE_ID: string | undefined
  readonly ComSpec: string | undefined
  readonly ConEmuANSI: string | undefined
  readonly ConEmuPID: string | undefined
  readonly ConEmuTask: string | undefined
  readonly DAYTONA_WS_ID: string | undefined
  readonly DEMO_VERSION: string | undefined
  readonly DENO_CERT: string | undefined
  readonly DENO_DEPLOYMENT_ID: string | undefined
  readonly DISPLAY: string | undefined
  readonly DO_NOT_TRACK: string | undefined
  readonly DYNO: string | undefined
  readonly EDITOR: string | undefined
  readonly FORCE_COLOR: string | undefined
  readonly GCLOUD_PROJECT: string | undefined
  readonly GCM_INTERACTIVE: string | undefined
  readonly GH_CONFIG_DIR: string | undefined
  readonly GH_ENTERPRISE_TOKEN: string | undefined
  readonly GH_HOST: string | undefined
  readonly GH_REPO: string | undefined
  readonly GH_TOKEN: string | undefined
  readonly GITHUB_ACTIONS: string | undefined
  readonly GITHUB_ACTION_INPUTS: string | undefined
  readonly GITHUB_ACTION_PATH: string | undefined
  readonly GITHUB_ACTOR: string | undefined
  readonly GITHUB_ACTOR_ID: string | undefined
  readonly GITHUB_ENTERPRISE_TOKEN: string | undefined
  readonly GITHUB_ENV: string | undefined
  readonly GITHUB_EVENT_NAME: string | undefined
  readonly GITHUB_EVENT_PATH: string | undefined
  readonly GITHUB_REPOSITORY: string | undefined
  readonly GITHUB_REPOSITORY_ID: string | undefined
  readonly GITHUB_REPOSITORY_OWNER: string | undefined
  readonly GITHUB_REPOSITORY_OWNER_ID: string | undefined
  readonly GITHUB_TOKEN: string | undefined
  readonly GITHUB_WORKSPACE: string | undefined
  readonly GITLAB_CI: string | undefined
  readonly GITPOD_WORKSPACE_ID: string | undefined
  readonly GIT_ASKPASS: string | undefined
  readonly GIT_CONFIG_COUNT: string | undefined
  readonly GIT_CONFIG_GLOBAL: string | undefined
  readonly GIT_CONFIG_NOSYSTEM: string | undefined
  readonly GIT_SSH_COMMAND: string | undefined
  readonly GIT_SSL_CAINFO: string | undefined
  readonly GIT_SSL_CAPATH: string | undefined
  readonly GIT_TERMINAL_PROMPT: string | undefined
  readonly GNOME_TERMINAL_SERVICE: string | undefined
  readonly GOOGLE_APPLICATION_CREDENTIALS: string | undefined
  readonly GOOGLE_CLOUD_PROJECT: string | undefined
  readonly GOOGLE_CLOUD_WORKSTATIONS: string | undefined
  readonly GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: string | undefined
  readonly HEX_CACERTS_PATH: string | undefined
  readonly HISTFILE: string | undefined
  readonly HOME: string | undefined
  readonly HOMEDRIVE: string | undefined
  readonly HOMEPATH: string | undefined
  readonly HOMESHARE: string | undefined
  readonly HTTPLIB2_CA_CERTS: string | undefined
  readonly HUB_CONFIG: string | undefined
  readonly INTELLIJ_TERMINAL_COMMAND_BLOCKS: string | undefined
  readonly INTELLIJ_TERMINAL_COMMAND_BLOCKS_REWORKED: string | undefined
  readonly IS_DEMO: string | undefined
  readonly IS_SANDBOX: string | undefined
  readonly ITERM_SESSION_ID: string | undefined
  readonly JAVA_HOME: string | undefined
  readonly JAVA_TOOL_OPTIONS: string | undefined
  readonly KITTY_WINDOW_ID: string | undefined
  readonly KONSOLE_VERSION: string | undefined
  readonly KUBERNETES_SERVICE_HOST: string | undefined
  readonly K_SERVICE: string | undefined
  readonly LANG: string | undefined
  readonly LC_ALL: string | undefined
  readonly LC_TERMINAL: string | undefined
  readonly LC_TIME: string | undefined
  readonly LOCALAPPDATA: string | undefined
  readonly MSYSTEM: string | undefined
  readonly NETLIFY: string | undefined
  readonly NIX_SSL_CERT_FILE: string | undefined
  readonly NODE_EXTRA_CA_CERTS: string | undefined
  readonly NODE_OPTIONS: string | undefined
  readonly NO_COLOR: string | undefined
  readonly NoDefaultCurrentDirectoryInExePath: string | undefined
  readonly OneDrive: string | undefined
  readonly OneDriveCommercial: string | undefined
  readonly OneDriveConsumer: string | undefined
  readonly P4PORT: string | undefined
  readonly PATH: string | undefined
  readonly PATHEXT: string | undefined
  readonly PIP_CERT: string | undefined
  readonly PLAYWRIGHT_BROWSERS_PATH: string | undefined
  readonly PREFIX: string | undefined
  readonly PROGRAMDATA: string | undefined
  readonly PROJECT_DOMAIN: string | undefined
  readonly PWD: string | undefined
  readonly ProgramData: string | undefined
  readonly ProgramFiles: string | undefined
  readonly RENDER: string | undefined
  readonly REPL_ID: string | undefined
  readonly REPL_SLUG: string | undefined
  readonly REQUESTS_CA_BUNDLE: string | undefined
  readonly RUNNER_ENVIRONMENT: string | undefined
  readonly RUNNER_OS: string | undefined
  readonly SAFEUSER: string | undefined
  readonly SESSIONNAME: string | undefined
  readonly SHELL: string | undefined
  readonly SPACE_CREATOR_USER_ID: string | undefined
  readonly SSH_AUTH_SOCK: string | undefined
  readonly SSH_CLIENT: string | undefined
  readonly SSH_CONNECTION: string | undefined
  readonly SSH_TTY: string | undefined
  readonly SSL_CERT_DIR: string | undefined
  readonly SSL_CERT_FILE: string | undefined
  readonly STY: string | undefined
  readonly SUDO_GID: number | undefined
  readonly SUDO_UID: number | undefined
  readonly SUDO_USER: string | undefined
  readonly SYSTEMROOT: string | undefined
  readonly SystemRoot: string | undefined
  readonly TEMP: string | undefined
  readonly TERM: string | undefined
  readonly TERMINAL: string | undefined
  readonly TERMINAL_EMULATOR: string | undefined
  readonly TERMINATOR_UUID: string | undefined
  readonly TERMUX_VERSION: string | undefined
  readonly TERM_PROGRAM: string | undefined
  readonly TERM_PROGRAM_VERSION: string | undefined
  readonly TILIX_ID: string | undefined
  readonly TMP: string | undefined
  readonly TMPDIR: string | undefined
  readonly TMUX: string | undefined
  readonly TMUX_PANE: string | undefined
  readonly TRACEPARENT: string | undefined
  readonly TRACESTATE: string | undefined
  readonly USER: string | undefined
  readonly USERNAME: string | undefined
  readonly USERPROFILE: string | undefined
  readonly USE_BUILTIN_RIPGREP: string | undefined
  readonly UV_THREADPOOL_SIZE: string | undefined
  readonly VERCEL: string | undefined
  readonly VISUAL: string | undefined
  readonly VSCODE_GIT_ASKPASS_MAIN: string | undefined
  readonly VTE_VERSION: string | undefined
  readonly WAYLAND_DISPLAY: string | undefined
  readonly WEBSITE_SITE_NAME: string | undefined
  readonly WEBSITE_SKU: string | undefined
  readonly WSL_DISTRO_NAME: string | undefined
  readonly WSL_INTEROP: string | undefined
  readonly WT_SESSION: string | undefined
  readonly XDG_CACHE_HOME: string | undefined
  readonly XDG_CONFIG_HOME: string | undefined
  readonly XDG_DATA_HOME: string | undefined
  readonly XDG_RUNTIME_DIR: string | undefined
  readonly XDG_STATE_HOME: string | undefined
  readonly XTERM_VERSION: string | undefined
  readonly ZDOTDIR: string | undefined
  readonly ZED_TERM: string | undefined
  readonly ZELLIJ: string | undefined
  readonly __CFBundleIdentifier: string | undefined
  readonly gcloud_project: string | undefined
  readonly google_application_credentials: string | undefined
  readonly google_cloud_project: string | undefined
  readonly ANT_CLAUDE_CODE_METRICS_ENDPOINT: string | undefined
  readonly ANT_OTEL_EXPORTER_OTLP_ENDPOINT: string | undefined
  readonly ANT_OTEL_EXPORTER_OTLP_HEADERS: string | undefined
  readonly ANT_OTEL_EXPORTER_OTLP_PROTOCOL: string | undefined
  readonly ANT_OTEL_LOGS_EXPORTER: string | undefined
  readonly ANT_OTEL_METRICS_EXPORTER: string | undefined
  readonly ANT_OTEL_RESOURCE_ATTRIBUTES: string | undefined
  readonly ANT_OTEL_TRACES_EXPORTER: string | undefined
  readonly BETA_TRACING_ENDPOINT: string | undefined
  readonly CLAUDE_CODE_BENCH_LIVE_COUNTS: boolean
  readonly CLAUDE_CODE_BYOC_ENABLE_DATADOG: boolean
  readonly CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS: number | undefined
  readonly CLAUDE_CODE_DD_ERROR_TRACKING_FLUSH_INTERVAL_MS: number | undefined
  readonly CLAUDE_CODE_DEBUG_LOGS_DIR: string | undefined
  readonly CLAUDE_CODE_DEBUG_LOG_LEVEL: string | undefined
  readonly CLAUDE_CODE_DEBUG_REPAINTS: boolean
  readonly CLAUDE_CODE_DIAGNOSTICS_FILE: string | undefined
  readonly CLAUDE_CODE_ENHANCED_TELEMETRY_BETA: boolean
  readonly CLAUDE_CODE_FRAME_TIMING_LOG: string | undefined
  readonly CLAUDE_CODE_FRAME_TIMING_SAMPLE_EVERY: number | undefined
  readonly CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH: number | undefined
  readonly CLAUDE_CODE_OTEL_DIAG_STDERR: boolean
  readonly CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS: number | undefined
  readonly CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_PERFETTO_TRACE: string | undefined
  readonly CLAUDE_CODE_PERFETTO_WRITE_INTERVAL_S: number | undefined
  readonly CLAUDE_CODE_PROFILE_STARTUP: boolean
  readonly CLAUDE_CODE_SESSION_LOG: string | undefined
  readonly CLAUDE_CODE_TEE_SDK_STDOUT: boolean
  readonly CLAUDE_CODE_TERMINAL_RECORDING: string | undefined
  readonly CLAUDE_DEBUG: boolean
  readonly CLAUDE_PTY_RECORD: string | undefined
  readonly DEBUG: string | undefined
  readonly DEBUG_CLAUDE_AGENT_SDK: boolean
  readonly DEBUG_SDK: boolean
  readonly OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: number | undefined
  readonly OTEL_EXPORTER_OTLP_ENDPOINT: string | undefined
  readonly OTEL_EXPORTER_OTLP_HEADERS: string | undefined
  readonly OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: string | undefined
  readonly OTEL_EXPORTER_OTLP_LOGS_HEADERS: string | undefined
  readonly OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: string | undefined
  readonly OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: string | undefined
  readonly OTEL_EXPORTER_OTLP_METRICS_HEADERS: string | undefined
  readonly OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: string | undefined
  readonly OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string | undefined
  readonly OTEL_EXPORTER_OTLP_PROTOCOL: string | undefined
  readonly OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: string | undefined
  readonly OTEL_EXPORTER_OTLP_TRACES_HEADERS: string | undefined
  readonly OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: string | undefined
  readonly OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: number | undefined
  readonly OTEL_LOGS_EXPORTER: string | undefined
  readonly OTEL_LOGS_EXPORT_INTERVAL: number | undefined
  readonly OTEL_LOG_ASSISTANT_RESPONSES: boolean | undefined
  readonly OTEL_LOG_MANAGED_SETTINGS: boolean
  readonly OTEL_LOG_RAW_API_BODIES: boolean
  readonly OTEL_LOG_TOOL_CONTENT: boolean
  readonly OTEL_LOG_TOOL_DETAILS: boolean
  readonly OTEL_LOG_USER_PROMPTS: boolean
  readonly OTEL_METRICS_EXPORTER: string | undefined
  readonly OTEL_METRIC_EXPORT_INTERVAL: number | undefined
  readonly OTEL_RESOURCE_ATTRIBUTES: string | undefined
  readonly OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: number | undefined
  readonly OTEL_TRACES_EXPORTER: string | undefined
  readonly OTEL_TRACES_EXPORT_INTERVAL: number | undefined
  readonly AI_AGENT: boolean
  readonly ALLOW_ANT_COMPUTER_USE_MCP: boolean
  readonly ANTHROPIC_CONFIG_DIR: string | undefined
  readonly BASH_MAX_OUTPUT_LENGTH: number | undefined
  readonly CCR_SESSION_PROFILE: boolean
  readonly CLAUBBIT: boolean
  readonly CLAUDECODE: boolean
  readonly CLAUDE_AFK_COUNTDOWN_MS: number | undefined
  readonly CLAUDE_AFK_TIMEOUT_MS: number | undefined
  readonly CLAUDE_AFTER_LAST_COMPACT: string | undefined
  readonly CLAUDE_AGENTS_SELECT: string | undefined
  readonly CLAUDE_AGENT_SDK_CLIENT_APP: string | undefined
  readonly CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS: boolean
  readonly CLAUDE_AGENT_SDK_DISABLE_MCP_MANIFESTS: boolean
  readonly CLAUDE_AGENT_SDK_MCP_NO_PREFIX: boolean
  readonly CLAUDE_AGENT_SDK_VERSION: string | undefined
  readonly CLAUDE_ARTIFACT_HOST_GRANT: string | undefined
  readonly CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS: number | undefined
  readonly CLAUDE_AUTOCOMPACT_PCT_OVERRIDE: string | undefined
  readonly CLAUDE_AUTO_BACKGROUND_TASKS: boolean
  readonly CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR: boolean
  readonly CLAUDE_BG_AUTH_SNAPSHOT_PATH: string | undefined
  readonly CLAUDE_BG_AUTO_MEMORY_OFF: string | undefined
  readonly CLAUDE_BG_BACKEND: string | undefined
  readonly CLAUDE_BG_CLAIM_AUTH: string | undefined
  readonly CLAUDE_BG_DISPATCHER_RATE_LIMIT_TIER: string | undefined
  readonly CLAUDE_BG_DISPATCHER_SUBSCRIPTION_TYPE: string | undefined
  readonly CLAUDE_BG_ISOLATION: string | undefined
  readonly CLAUDE_BG_MEMORY_TOGGLED_OFF: string | undefined
  readonly CLAUDE_BG_POST_CLEAR_RESPAWN: boolean
  readonly CLAUDE_BG_PTY_AUTH: string | undefined
  readonly CLAUDE_BG_RENDEZVOUS_SOCK: string | undefined
  readonly CLAUDE_BG_RV_AUTH: string | undefined
  readonly CLAUDE_BG_SESSION_PERMISSION_RULES: string | undefined
  readonly CLAUDE_BG_SOCKET_TOKENS_PATH: string | undefined
  readonly CLAUDE_BG_SOURCE: string | undefined
  readonly CLAUDE_BG_STARTUP_WEDGE_MS: number | undefined
  readonly CLAUDE_BG_TCC_DISCLAIMED: string | undefined
  readonly CLAUDE_BG_WORKSPACE_TRUSTED: boolean
  readonly CLAUDE_BRIDGE_BASE_URL: string | undefined
  readonly CLAUDE_BRIDGE_OAUTH_TOKEN: string | undefined
  readonly CLAUDE_BRIDGE_REATTACH_GROUPING: string | undefined
  readonly CLAUDE_BRIDGE_REATTACH_NO_BACKFILL: boolean
  readonly CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY: boolean
  readonly CLAUDE_BRIDGE_REATTACH_OWNER_ACCT: string | undefined
  readonly CLAUDE_BRIDGE_REATTACH_OWNER_ORG: string | undefined
  readonly CLAUDE_BRIDGE_REATTACH_SEQ: number | undefined
  readonly CLAUDE_BRIDGE_REATTACH_SESSION: string | undefined
  readonly CLAUDE_BRIDGE_SESSION_INGRESS_URL: string | undefined
  readonly CLAUDE_CHROME_PAIRED_DEVICE_ID: string | undefined
  readonly CLAUDE_CHROME_PERMISSION_MODE: string | undefined
  readonly CLAUDE_CHROME_TAB_GROUP_KEY: string | undefined
  readonly CLAUDE_CLIENT_PRESENCE_FILE: string | undefined
  readonly CLAUDE_CODE_ACTION: string | undefined
  readonly CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD: string | undefined
  readonly CLAUDE_CODE_ADDITIONAL_PROTECTION: boolean
  readonly CLAUDE_CODE_ADOPT_UNDERIVABLE_PARKED_PERMISSION: boolean
  readonly CLAUDE_CODE_AGENT: string | undefined
  readonly CLAUDE_CODE_APPEND_PROMPT_HEAD: string | undefined
  readonly CLAUDE_CODE_ARTIFACT: string | undefined
  readonly CLAUDE_CODE_ARTIFACTS_API_BASE_URL: string | undefined
  readonly CLAUDE_CODE_ARTIFACTS_API_TOKEN: string | undefined
  readonly CLAUDE_CODE_ARTIFACT_ASSET_BASE_URL: string | undefined
  readonly CLAUDE_CODE_ARTIFACT_AUTO_OPEN: string | undefined
  readonly CLAUDE_CODE_ARTIFACT_LIVE_BASE_URL: string | undefined
  readonly CLAUDE_CODE_ARTIFACT_SYNC_BASE_URL: string | undefined
  readonly CLAUDE_CODE_ARTIFACT_VIEWER_BASE_URL: string | undefined
  readonly CLAUDE_CODE_ATTRIBUTION_STATUS_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_AUTO_COMPACT_WINDOW: string | undefined
  readonly CLAUDE_CODE_AUTO_MODE_EXTERNAL_PERMISSIONS: boolean
  readonly CLAUDE_CODE_AUTO_MODE_TIER: string | undefined
  readonly CLAUDE_CODE_BASE_REF: string | undefined
  readonly CLAUDE_CODE_BASE_REFS: string | undefined
  readonly CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE: string | undefined
  readonly CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT: boolean
  readonly CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT: boolean
  readonly CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS: boolean
  readonly CLAUDE_CODE_BRIDGE_MCP_CARRIER: string | undefined
  readonly CLAUDE_CODE_BRIDGE_OWNER_ACCOUNT_UUID: string | undefined
  readonly CLAUDE_CODE_BRIDGE_OWNER_ORG_UUID: string | undefined
  readonly CLAUDE_CODE_BRIDGE_PROMPT_SHA256: string | undefined
  readonly CLAUDE_CODE_BRIDGE_SESSION_ID: string | undefined
  readonly CLAUDE_CODE_BRIDGE_SOURCE_DIR: string | undefined
  readonly CLAUDE_CODE_BRIEF: boolean
  readonly CLAUDE_CODE_BRIEF_UPLOAD: boolean
  readonly CLAUDE_CODE_CCR_SURFACE: string | undefined
  readonly CLAUDE_CODE_CLASSIFIER_SUMMARY: string | undefined
  readonly CLAUDE_CODE_CONFIG_PROBE: boolean
  readonly CLAUDE_CODE_CONTAINER_ID: string | undefined
  readonly CLAUDE_CODE_COORDINATOR_SKILL_GUIDANCE: boolean
  readonly CLAUDE_CODE_DAEMON_COLD_START: boolean
  readonly CLAUDE_CODE_DECSTBM: string | undefined
  readonly CLAUDE_CODE_DESKTOP_APP_VERSION: string | undefined
  readonly CLAUDE_CODE_DEV_RAW_CHANGELOG_URL: string | undefined
  readonly CLAUDE_CODE_DISABLE_ATTRIBUTION_BASELINE_REUSE: boolean
  readonly CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP: boolean
  readonly CLAUDE_CODE_DISABLE_HOOK_FORWARDING: boolean
  readonly CLAUDE_CODE_DISABLE_PLUGIN_FORWARDING: boolean
  readonly CLAUDE_CODE_DISABLE_TURN_HANDOFF: boolean
  readonly CLAUDE_CODE_DISABLE_VITALS_EMITTER: boolean
  readonly CLAUDE_CODE_DISABLE_WORKING_SYNC: boolean
  readonly CLAUDE_CODE_DONT_INHERIT_ENV: boolean
  readonly CLAUDE_CODE_DOWNLOAD_DEADLINE_MS_FOR_TESTING: string | undefined
  readonly CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS: boolean
  readonly CLAUDE_CODE_EMIT_STARTUP_TIMING: boolean
  readonly CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES: boolean
  readonly CLAUDE_CODE_ENTRYPOINT: string | undefined
  readonly CLAUDE_CODE_ENVIRONMENT_KIND: string | undefined
  readonly CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION: string | undefined
  readonly CLAUDE_CODE_EVAL_CONFINED: boolean
  readonly CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER: boolean
  readonly CLAUDE_CODE_EXIT_AFTER_STOP_DELAY: number | undefined
  readonly CLAUDE_CODE_FLAG_FETCH_WAIT_MS: number | undefined
  readonly CLAUDE_CODE_FOOTER_INDICATOR: string | undefined
  readonly CLAUDE_CODE_FORCE_BRIDGE: boolean
  readonly CLAUDE_CODE_FORCE_EVALUATE_MEMORY: boolean
  readonly CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL: boolean
  readonly CLAUDE_CODE_FORCE_MEMORY_SURVEY: boolean
  readonly CLAUDE_CODE_FORCE_TIP_ID: string | undefined
  readonly CLAUDE_CODE_GIT_BASH_PATH: string | undefined
  readonly CLAUDE_CODE_GLOB_TIMEOUT_SECONDS: number | undefined
  readonly CLAUDE_CODE_GOAL_CHECKIN_MINUTES: number | undefined
  readonly CLAUDE_CODE_HIDE_SETTINGS_HINT: string | undefined
  readonly CLAUDE_CODE_HOLD_REPORT_PARK_AT_INIT: boolean
  readonly CLAUDE_CODE_HOME_SEED_HOLD_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_HOME_SEED_VERDICT_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_HOST_PLATFORM: string | undefined
  readonly CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD: boolean
  readonly CLAUDE_CODE_HOST_SESSION_ID: string | undefined
  readonly CLAUDE_CODE_IDE_HOST_OVERRIDE: string | undefined
  readonly CLAUDE_CODE_IDLE_THRESHOLD_MINUTES: number | undefined
  readonly CLAUDE_CODE_IDLE_TOKEN_THRESHOLD: number | undefined
  readonly CLAUDE_CODE_IS_COWORK: boolean
  readonly CLAUDE_CODE_LEGACY_BUNDLE: boolean
  readonly CLAUDE_CODE_LOOP_KEEPALIVE: boolean | undefined
  readonly CLAUDE_CODE_LOOP_PERSISTENT: boolean
  readonly CLAUDE_CODE_MANAGED_SETTINGS_PATH: string | undefined
  readonly CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS: number | undefined
  readonly CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH: number | undefined
  readonly CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH: number | undefined
  readonly CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION: number | undefined
  readonly CLAUDE_CODE_MCP_ALLOWLIST_ENV: string | undefined
  readonly CLAUDE_CODE_MCP_APPS_HOST: boolean
  readonly CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS: number | undefined
  readonly CLAUDE_CODE_MCP_CONNECTOR_PREWAIT_MS: number | undefined
  readonly CLAUDE_CODE_MCP_MEMORY_CGROUP: string | undefined
  readonly CLAUDE_CODE_MCP_PREWAIT_SERVERS: string | undefined
  readonly CLAUDE_CODE_MCP_PREWAIT_SERVERS_MS: number | undefined
  readonly CLAUDE_CODE_MCP_STARTUP_WAIT_MS: number | undefined
  readonly CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT: number | undefined
  readonly CLAUDE_CODE_MEMORY_SUBAGENT_APPEND: boolean
  readonly CLAUDE_CODE_MOCK_REMOTE_SETTINGS: string | undefined
  readonly CLAUDE_CODE_MOCK_TRIAL: boolean
  readonly CLAUDE_CODE_OVERRIDE_DATE: string | undefined
  readonly CLAUDE_CODE_PARKED_PERMISSION_WAIT_MS: number | undefined
  readonly CLAUDE_CODE_PARKED_RUN_BEFORE_CLEAR: boolean
  readonly CLAUDE_CODE_PARKED_STOP_RETIRES: boolean
  readonly CLAUDE_CODE_PERFORCE_MODE: string | undefined
  readonly CLAUDE_CODE_PLAN_V2_AGENT_COUNT: number | undefined
  readonly CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT: number | undefined
  readonly CLAUDE_CODE_PLUGIN_ATTRIBUTION: string | undefined
  readonly CLAUDE_CODE_PLUGIN_CACHE_DIR: string | undefined
  readonly CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_PLUGIN_SEED_DIR: string | undefined
  readonly CLAUDE_CODE_POST_TURN_MEMORY: boolean
  readonly CLAUDE_CODE_POST_TURN_MEMORY_CONFIG: string | undefined
  readonly CLAUDE_CODE_POST_TURN_MEMORY_SYNC: boolean
  readonly CLAUDE_CODE_POWERUP_ONBOARDING: string | undefined
  readonly CLAUDE_CODE_PROJECT_DIR_NAME: string | undefined
  readonly CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_QUESTION_EXTENDED: boolean
  readonly CLAUDE_CODE_QUESTION_OPTIONAL_DESCRIPTIONS: boolean
  readonly CLAUDE_CODE_QUESTION_PREVIEW_FORMAT: string | undefined
  readonly CLAUDE_CODE_RELAUNCH_HOME_TRUST: string | undefined
  readonly CLAUDE_CODE_RELAUNCH_TERMINAL_SIZE: string | undefined
  readonly CLAUDE_CODE_REMOTE: boolean
  readonly CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE: string | undefined
  readonly CLAUDE_CODE_REMOTE_HERMETIC_MODE: boolean
  readonly CLAUDE_CODE_REMOTE_MEMORY_DIR: string | undefined
  readonly CLAUDE_CODE_REMOTE_RAW_EVENTS_FILE: string | undefined
  readonly CLAUDE_CODE_REMOTE_SEND_KEEPALIVES: boolean
  readonly CLAUDE_CODE_REMOTE_SESSION_ID: string | undefined
  readonly CLAUDE_CODE_REMOTE_SESSION_ORIGIN: string | undefined
  readonly CLAUDE_CODE_REMOTE_SETTINGS_PATH: string | undefined
  readonly CLAUDE_CODE_REMOTE_SETTINGS_POLL_MS: number | undefined
  readonly CLAUDE_CODE_REPL: boolean | undefined
  readonly CLAUDE_CODE_REPO_CHECKOUTS: string | undefined
  readonly CLAUDE_CODE_RESTRICTED: boolean
  readonly CLAUDE_CODE_RESULT_NONCE: string | undefined
  readonly CLAUDE_CODE_RESUME_FROM_SESSION: string | undefined
  readonly CLAUDE_CODE_RESUME_INTERRUPTED_TURN: boolean
  readonly CLAUDE_CODE_RESUME_INTERRUPTED_TURN_MAX_AGE_MS: string | undefined
  readonly CLAUDE_CODE_RESUME_PROMPT: string | undefined
  readonly CLAUDE_CODE_RESUME_REASON: string | undefined
  readonly CLAUDE_CODE_RESUME_SOURCE_ALIVE: string | undefined
  readonly CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: number | undefined
  readonly CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: number | undefined
  readonly CLAUDE_CODE_RESUME_TOLERATES_CONTEXT_APPENDS: boolean
  readonly CLAUDE_CODE_SAFE_MODE: boolean
  readonly CLAUDE_CODE_SANDBOXED: boolean
  readonly CLAUDE_CODE_SCRIPT_CAPS: number | undefined
  readonly CLAUDE_CODE_SCROLL_SPEED: string | undefined
  readonly CLAUDE_CODE_SDK_READS_SESSION_STATE: boolean
  readonly CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_SESSION_ID: string | undefined
  readonly CLAUDE_CODE_SESSION_KIND: string | undefined
  readonly CLAUDE_CODE_SESSION_NAME: string | undefined
  readonly CLAUDE_CODE_SESSION_ORIGIN: string | undefined
  readonly CLAUDE_CODE_SESSION_START_ANNOUNCEMENTS_BEFORE_PROMPT: boolean
  readonly CLAUDE_CODE_SHELL: string | undefined
  readonly CLAUDE_CODE_SHELL_PREFIX: string | undefined
  readonly CLAUDE_CODE_SIMPLE: boolean
  readonly CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT: string | undefined
  readonly CLAUDE_CODE_SKILL_ATTRIBUTION: string | undefined
  readonly CLAUDE_CODE_SPAWN_TIMESTAMP_MS: number | undefined
  readonly CLAUDE_CODE_SSE_PORT: number | undefined
  readonly CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING: string | undefined
  readonly CLAUDE_CODE_STARTUP_FAILURE_RESULTS: boolean
  readonly CLAUDE_CODE_STOP_HOOK_BLOCK_CAP: number | undefined
  readonly CLAUDE_CODE_SUBPROCESS_ENV_SCRUB: boolean | undefined
  readonly CLAUDE_CODE_SUPERVISED: boolean
  readonly CLAUDE_CODE_SYNC_PLUGINS_BUFFERED_DOWNLOAD: boolean
  readonly CLAUDE_CODE_SYNC_PLUGINS_DOWNLOAD_STALL_MS: number | undefined
  readonly CLAUDE_CODE_SYNC_PLUGINS_INSTALL_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_SYNC_PLUGINS_MCP_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_SYNC_REUSE_WITHIN_MS: number | undefined
  readonly CLAUDE_CODE_SYNC_SESSION_REFS: boolean
  readonly CLAUDE_CODE_SYNC_SKILLS_INSTALL_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_SYNTAX_HIGHLIGHT: string | undefined
  readonly CLAUDE_CODE_SYSTEM_PROMPT_GB_FEATURE: string | undefined
  readonly CLAUDE_CODE_TAGS: string | undefined
  readonly CLAUDE_CODE_TASK_LIST_ID: string | undefined
  readonly CLAUDE_CODE_TEAM_TEARDOWN_PARK_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_TERMINAL_MCP_TOOLS: string | undefined
  readonly CLAUDE_CODE_TEST_ALLOW_REAL_NETWORK: boolean
  readonly CLAUDE_CODE_TEST_FIXTURES_ROOT: string | undefined
  readonly CLAUDE_CODE_TEST_FORCE_DENY: string | undefined
  readonly CLAUDE_CODE_TEST_NO_GIT_BASH: string | undefined
  readonly CLAUDE_CODE_TEST_NO_PWSH: string | undefined
  readonly CLAUDE_CODE_TMPDIR: string | undefined
  readonly CLAUDE_CODE_TMUX_PREFIX: string | undefined
  readonly CLAUDE_CODE_TMUX_PREFIX_CONFLICTS: boolean
  readonly CLAUDE_CODE_TMUX_SESSION: string | undefined
  readonly CLAUDE_CODE_TMUX_TRUECOLOR: string | undefined
  readonly CLAUDE_CODE_TOOL_MEMORY_CGROUP_EXCLUDE: string | undefined
  readonly CLAUDE_CODE_TOOL_MEMORY_LIMIT: string | undefined
  readonly CLAUDE_CODE_TRIGGER_ID: string | undefined
  readonly CLAUDE_CODE_TUI_JUST_SWITCHED: string | undefined
  readonly CLAUDE_CODE_TUI_TRIAL: string | undefined
  readonly CLAUDE_CODE_ULTRAREVIEW_PREFLIGHT_FIXTURE: string | undefined
  readonly CLAUDE_CODE_ULTRAREVIEW_QUOTA_FIXTURE: string | undefined
  readonly CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS: number | undefined
  readonly CLAUDE_CODE_VOICE_FORWARD_INTERIMS_TYPED: boolean
  readonly CLAUDE_CODE_WORKER_CHECKIN_SCHEDULE: string | undefined
  readonly CLAUDE_CODE_WORKER_EPOCH: number | undefined
  readonly CLAUDE_CODE_WORKSPACE_HOST_PATHS: string | undefined
  readonly CLAUDE_CONFIG_DIR: string | undefined
  readonly CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES: string | undefined
  readonly CLAUDE_COWORK_MEMORY_GUIDELINES: string | undefined
  readonly CLAUDE_COWORK_MEMORY_INDEX_CONTENT: string | undefined
  readonly CLAUDE_COWORK_MEMORY_PATH_OVERRIDE: string | undefined
  readonly CLAUDE_ENV_FILE: string | undefined
  readonly CLAUDE_FORCE_DISPLAY_SURVEY: boolean
  readonly CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME: string | undefined
  readonly CLAUDE_INTERNAL_FC_OVERRIDES: string | undefined
  readonly CLAUDE_JOB_DIR: string | undefined
  readonly CLAUDE_MEMORY_STORES: string | undefined
  readonly CLAUDE_PROJECT_UUID: string | undefined
  readonly CLAUDE_PTY_HEARTBEAT_MS: number | undefined
  readonly CLAUDE_PTY_HOST_EXEC: string | undefined
  readonly CLAUDE_PTY_ORPHAN_CHECK_MS: number | undefined
  readonly CLAUDE_RELAUNCH_SESSION_ADD_DIRS: string | undefined
  readonly CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX: string | undefined
  readonly CLAUDE_REMOTE_WORKFLOW_ARGS: string | undefined
  readonly CLAUDE_REMOTE_WORKFLOW_SCRIPT: string | undefined
  readonly CLAUDE_RUNNER_ACTIVITY_FD: number | undefined
  readonly CLAUDE_RUNNER_FETCH_DEPTH: string | undefined
  readonly CLAUDE_SECURESTORAGE_CONFIG_DIR: string | undefined
  readonly CLAUDE_SERVE_DRAIN_TIMEOUT_MS: number | undefined
  readonly CLAUDE_SNIP: string | undefined
  readonly CLAUDE_SSH_LOCAL_BINARY: string | undefined
  readonly CLAUDE_SSH_VERSION: string | undefined
  readonly CLAUDE_STAGE_FILE_ROOT: string | undefined
  readonly CLAUDE_TMPDIR: string | undefined
  readonly LOCAL_BRIDGE: boolean
  readonly MCP_CONNECTION_NONBLOCKING: boolean | undefined
  readonly MCP_CONNECT_TIMEOUT_MS: number | undefined
  readonly MCP_DISCOVERY_CACHE: boolean | undefined
  readonly MCP_DISCOVERY_CACHE_MAX_STALE_S: number | undefined
  readonly MCP_DISCOVERY_CACHE_STRIKES: number | undefined
  readonly MCP_DISCOVERY_CACHE_TTL_S: number | undefined
  readonly MCP_OAUTH_CALLBACK_PORT: number | undefined
  readonly MCP_OAUTH_CLIENT_METADATA_URL: string | undefined
  readonly MCP_PROTOCOL_NEGOTIATION: string | undefined
  readonly MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE: number | undefined
  readonly MCP_SDK_GENERATION: string | undefined
  readonly MCP_SERVER_CONNECTION_BATCH_SIZE: number | undefined
  readonly MCP_TIMEOUT: number | undefined
  readonly MCP_TOOL_TIMEOUT: number | undefined
  readonly MCP_TRUNCATION_PROMPT_OVERRIDE: string | undefined
  readonly SDK_NATIVE_BIN: string | undefined
  readonly SESSION_INGRESS_URL: string | undefined
  readonly SLASH_COMMAND_TOOL_CHAR_BUDGET: number | undefined
  readonly SYSTEM_REMINDER_MEMORY_CONTEXT: boolean
  readonly TEST_ENABLE_SESSION_PERSISTENCE: boolean
  readonly ULTRAPLAN_PROMPT_FILE: string | undefined
  readonly VCR_RECORD: boolean
  readonly VITALS_EMITTER_BIN: string | undefined
  readonly VOICE_STREAM_BASE_URL: string | undefined
  set(name:string,value:unknown):void
  unset(name:string):void
}
export function createTypedEnvironment287(ports:{D:AuthDecoders;process:{env:NodeJS.ProcessEnv};parent:object}):TypedEnvironment287
