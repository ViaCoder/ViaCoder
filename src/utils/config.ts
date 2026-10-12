import { feature } from 'bun:bundle'
import { randomBytes } from 'crypto'
import memoize from 'lodash-es/memoize.js'
import { join, resolve } from 'path'
import { getOriginalCwd, getSessionTrustAccepted } from '../bootstrap/state.js'
import { getAutoMemEntrypoint } from '../memdir/paths.js'
import { logEvent, type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../services/analytics/index.js'
import type { McpServerConfig } from '../services/mcp/types.js'
import type {
  BillingType,
  ReferralEligibilityResponse,
} from '../services/oauth/types.js'
import { getCwd } from '../utils/cwd.js'
import { registerCleanup } from './cleanupRegistry.js'
import {ConfigState, bindConfigWriter} from './officialConfigWriter/bindings.js'
import {createNativeClientDataSeedClear287} from './officialAccountReset287/native.js'
import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'
import {isStorageV5PinnedOn} from './secureStorage/storageV5.js'
import { logForDebugging } from './debug.js'
import { getGlobalClaudeFile } from './env.js'
import { getClaudeConfigHomeDir, isEnvTruthy } from './envUtils.js'
import { findCanonicalGitRoot } from './git.js'
import { safeParseJSON } from './json.js'
import type { MemoryType } from './memory/types.js'
import { normalizePathForConfigKey } from './path.js'
import { getEssentialTrafficOnlyReason } from './privacyLevel.js'
import { getManagedFilePath } from './settings/managedPath.js'
import type { ThemeSetting } from './theme.js'

/* eslint-disable @typescript-eslint/no-require-imports */
const teamMemPaths = feature('TEAMMEM')
  ? (require('../memdir/teamMemPaths.js') as typeof import('../memdir/teamMemPaths.js'))
  : null
const ccrAutoConnect = feature('CCR_AUTO_CONNECT')
  ? (require('../bridge/bridgeEnabled.js') as typeof import('../bridge/bridgeEnabled.js'))
  : null

/* eslint-enable @typescript-eslint/no-require-imports */
import type { ImageDimensions } from './imageResizer.js'
import type { ModelOption } from './model/modelOptions.js'
import type { BootstrapResponse } from '../services/api/bootstrap.js'
import type {ModelCosts} from './modelCost.js'
import type { ClientDataSlot } from '../services/api/bootstrapCache.js'


// Image dimension info for coordinate mapping (only set when image was resized)
export type PastedContent = {
  id: number // Sequential numeric ID
  type: 'text' | 'image'
  content: string
  mediaType?: string // e.g., 'image/png', 'image/jpeg'
  filename?: string // Display name for images in attachment slot
  dimensions?: ImageDimensions
  sourcePath?: string // Original file path for images dragged onto the terminal
}

export interface SerializedStructuredHistoryEntry {
  display: string
  pastedContents?: Record<number, PastedContent>
  pastedText?: string
}
export interface HistoryEntry {
  display: string
  pastedContents: Record<number, PastedContent>
}

export type ReleaseChannel = 'stable' | 'latest'

export type ProjectConfig = {
  hasUsedRemoteSession?: boolean
  allowedTools: string[]
  mcpContextUris: string[]
  mcpServers?: Record<string, McpServerConfig>
  lastAPIDuration?: number
  lastAPIDurationWithoutRetries?: number
  lastToolDuration?: number
  lastCost?: number
  lastDuration?: number
  lastLinesAdded?: number
  lastLinesRemoved?: number
  lastTotalInputTokens?: number
  lastTotalOutputTokens?: number
  lastTotalCacheCreationInputTokens?: number
  lastTotalCacheReadInputTokens?: number
  lastTotalWebSearchRequests?: number
  lastFpsAverage?: number
  lastFpsLow1Pct?: number
  lastSessionId?: string
  lastModelUsage?: Record<
    string,
    {
      inputTokens: number
      outputTokens: number
      thinkingTokens?: number
      cacheReadInputTokens: number
      cacheCreationInputTokens: number
      webSearchRequests: number
      costUSD: number
    }
  >
  lastSessionMetrics?: Record<string, number>
  exampleFiles?: string[]
  exampleFilesGeneratedAt?: number

  // Trust dialog settings
  hasTrustDialogAccepted?: boolean

  hasCompletedProjectOnboarding?: boolean
  projectOnboardingSeenCount: number
  hasClaudeMdExternalIncludesApproved?: boolean
  hasClaudeMdExternalIncludesWarningShown?: boolean
  // MCP server approval fields - migrated to settings but kept for backward compatibility
  enabledMcpjsonServers?: string[]
  disabledMcpjsonServers?: string[]
  enableAllProjectMcpServers?: boolean
  // List of disabled MCP servers (all scopes) - used for enable/disable toggle
  disabledMcpServers?: string[]
  // Opt-in list for built-in MCP servers that default to disabled
  enabledMcpServers?: string[]
  // Worktree session management
  activeWorktreeSession?: {
    originalCwd: string
    worktreePath: string
    worktreeName: string
    originalBranch?: string
    sessionId: string
    hookBased?: boolean
  }
  /** Spawn mode for `claude remote-control` multi-session. Set by first-run dialog or `w` toggle. */
  remoteControlSpawnMode?: 'same-dir' | 'worktree'
}

const DEFAULT_PROJECT_CONFIG: ProjectConfig = {
  allowedTools: [],
  mcpContextUris: [],
  mcpServers: {},
  enabledMcpjsonServers: [],
  disabledMcpjsonServers: [],
  hasTrustDialogAccepted: false,
  projectOnboardingSeenCount: 0,
  hasClaudeMdExternalIncludesApproved: false,
  hasClaudeMdExternalIncludesWarningShown: false,
}

export type InstallMethod = 'local' | 'native' | 'global' | 'unknown'

export {
  EDITOR_MODES,
  NOTIFICATION_CHANNELS,
} from './configConstants.js'

import type { EDITOR_MODES, NOTIFICATION_CHANNELS } from './configConstants.js'

export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number]

export type AccountInfo = {
  accountUuid: string
  emailAddress: string
  organizationUuid?: string
  organizationName?: string | null // added 4/23/2025, not populated for existing users
  organizationRole?: string | null
  workspaceRole?: string | null
  // Populated by /api/oauth/profile
  displayName?: string
  fullName?: string
  planDisplayName?: string
  profileFetchedAt?: number
  hasExtraUsageEnabled?: boolean
  billingType?: BillingType | null
  accountCreatedAt?: string
  subscriptionCreatedAt?: string
  ccOnboardingFlags?: Record<string, unknown>
  claudeCodeTrialEndsAt?: string | null
  claudeCodeTrialDurationDays?: number | null
  organizationType?: string | null
  organizationRateLimitTier?: string | null
  userRateLimitTier?: string | null
  seatTier?: string | null
}

// TODO: 'emacs' is kept for backward compatibility - remove after a few releases
export type EditorMode = 'emacs' | (typeof EDITOR_MODES)[number]

export type DiffTool = 'terminal' | 'auto'

export type OutputStyle = string

export type GlobalConfig = {
  hasRemoteEnvironment?: boolean
  /** Untrusted persisted usage snapshot; the usage host validates its schema before reuse. */
  cachedUsageUtilization?: unknown
  /**
   * @deprecated Use settings.apiKeyHelper instead.
   */
  apiKeyHelper?: string
  projects?: Record<string, ProjectConfig>
  numStartups: number
  installMethod?: InstallMethod
  autoUpdates?: boolean
  // Flag to distinguish protection-based disabling from user preference
  autoUpdatesProtectedForNative?: boolean
  // Session count when Doctor was last shown
  doctorShownAtSession?: number
  userID?: string
  machineID?: string // Original 287 AJe, same persisted identity document.
  theme: ThemeSetting
  hasCompletedOnboarding?: boolean
  // Tracks the last version that reset onboarding, used with MIN_VERSION_REQUIRING_ONBOARDING_RESET
  lastOnboardingVersion?: string
  // Tracks the last version for which release notes were seen, used for managing release notes
  lastReleaseNotesSeen?: string
  // Timestamp when changelog was last fetched (content stored in ~/.claude/cache/changelog.md)
  changelogLastFetched?: number
  // @deprecated - Migrated to ~/.claude/cache/changelog.md. Keep for migration support.
  cachedChangelog?: string
  mcpServers?: Record<string, McpServerConfig>
  // claude.ai MCP connectors that have successfully connected at least once.
  // Used to gate "connector unavailable" / "needs auth" startup notifications:
  // a connector the user has actually used is worth flagging when it breaks,
  // but an org-configured connector that's been needs-auth since day one is
  // something the user has demonstrably ignored and shouldn't nag about.
  claudeAiMcpEverConnected?: string[]
  preferredNotifChannel: NotificationChannel
  /**
   * @deprecated. Use the Notification hook instead (docs/hooks.md).
   */
  customNotifyCommand?: string
  verbose: boolean
  briefTranscript?: boolean
  customApiKeyResponses?: {
    approved?: string[]
    rejected?: string[]
  }
  primaryApiKey?: string // Primary API key for the user when no environment variable is set, set via oauth (TODO: rename)
  hasAcknowledgedCostThreshold?: boolean
  hasSeenUndercoverAutoNotice?: boolean // ant-only: whether the one-time auto-undercover explainer has been shown
  hasSeenUltraplanTerms?: boolean // ant-only: whether the one-time CCR terms notice has been shown in the ultraplan launch dialog
  hasResetAutoModeOptInForDefaultOffer?: boolean // ant-only: one-shot migration guard, re-prompts churned auto-mode users
  oauthAccount?: AccountInfo
  iterm2KeyBindingInstalled?: boolean // Legacy - keeping for backward compatibility
  editorMode?: EditorMode
  bypassPermissionsModeAccepted?: boolean
  hasUsedBackslashReturn?: boolean
  autoScrollEnabled?: boolean
  externalEditorContext?: boolean
  showMessageTimestamps?: boolean
  autoCompactEnabled: boolean // Controls whether auto-compact is enabled
  showTurnDuration: boolean // Controls whether to show turn duration message (e.g., "Cooked for 1m 6s")
  /**
   * @deprecated Use settings.env instead.
   */
  env: { [key: string]: string } // Environment variables to set for the CLI
  hasSeenTasksHint?: boolean // Whether the user has seen the tasks hint
  hasUsedStash?: boolean // Whether the user has used the stash feature (Ctrl+S)
  hasUsedBackgroundTask?: boolean // Whether the user has backgrounded a task (Ctrl+B)
  queuedCommandUpHintCount?: number // Counter for how many times the user has seen the queued command up hint
  diffTool?: DiffTool // Which tool to use for displaying diffs (terminal or vscode)

  // Terminal setup state tracking
  iterm2SetupInProgress?: boolean
  iterm2BackupPath?: string // Path to the backup file for iTerm2 preferences
  appleTerminalBackupPath?: string // Path to the backup file for Terminal.app preferences
  appleTerminalSetupInProgress?: boolean // Whether Terminal.app setup is currently in progress

  // Key binding setup tracking
  shiftEnterKeyBindingInstalled?: boolean // Whether Shift+Enter key binding is installed (for iTerm2 or VSCode)
  optionAsMetaKeyInstalled?: boolean // Whether Option as Meta key is installed (for Terminal.app)

  // IDE configurations
  autoConnectIde?: boolean // Whether to automatically connect to IDE on startup if exactly one valid IDE is available
  autoInstallIdeExtension?: boolean // Whether to automatically install IDE extensions when running from within an IDE

  // IDE dialogs
  hasIdeOnboardingBeenShown?: Record<string, boolean> // Map of terminal name to whether IDE onboarding has been shown
  ideHintShownCount?: number // Number of times the /ide command hint has been shown
  hasIdeAutoConnectDialogBeenShown?: boolean // Whether the auto-connect IDE dialog has been shown

  tipsHistory: {
    [tipId: string]: number // Key is tipId, value is the numStartups when tip was last shown
  }

  // /buddy companion soul — bones regenerated from userId on read. See src/buddy/.
  companion?: import('../buddy/types.js').StoredCompanion
  companionMuted?: boolean

  // Feedback survey tracking
  feedbackSurveyState?: {
    lastShownTime?: number
  }

  // Transcript share prompt tracking ("Don't ask again")
  transcriptShareDismissed?: boolean

  // Memory usage tracking
  memoryUsageCount: number // Number of times user has added to memory

  // Sonnet-1M configs
  hasShownS1MWelcomeV2?: Record<string, boolean> // Whether the Sonnet-1M v2 welcome message has been shown per org
  // Cache of Sonnet-1M subscriber access per org - key is org ID
  // hasAccess means "hasAccessAsDefault" but the old name is kept for backward
  // compatibility.
  s1mAccessCache?: Record<
    string,
    { hasAccess: boolean; hasAccessNotAsDefault?: boolean; timestamp: number }
  >
  // Cache of Sonnet-1M PayG access per org - key is org ID
  // hasAccess means "hasAccessAsDefault" but the old name is kept for backward
  // compatibility.
  s1mNonSubscriberAccessCache?: Record<
    string,
    { hasAccess: boolean; hasAccessNotAsDefault?: boolean; timestamp: number }
  >

  // Guest passes eligibility cache per org - key is org ID
  passesEligibilityCache?: Record<
    string,
    ReferralEligibilityResponse & { timestamp: number }
  >

  // Grove config cache per account - key is account UUID
  groveConfigCache?: Record<
    string,
    { grove_enabled: boolean; timestamp: number }
  >

  // Guest passes upsell tracking
  passesUpsellSeenCount?: number // Number of times the guest passes upsell has been shown
  hasVisitedPasses?: boolean // Whether the user has visited /passes command
  passesLastSeenRemaining?: number // Last seen remaining_passes count — reset upsell when it increases

  // Overage credit grant upsell tracking (keyed by org UUID — multi-org users).
  // Inlined shape (not import()) because config.ts is in the SDK build surface
  // and the SDK bundler can't resolve CLI service modules.
  overageCreditGrantCache?: Record<
    string,
    {
      info: {
        available: boolean
        eligible: boolean
        granted: boolean
        amount_minor_units: number | null
        currency: string | null
      }
      timestamp: number
    }
  >
  overageCreditUpsellSeenCount?: number // Number of times the overage credit upsell has been shown
  hasVisitedExtraUsage?: boolean // Whether the user has visited /extra-usage — hides credit upsells

  // Voice mode notice tracking
  voiceNoticeSeenCount?: number // Number of times the voice-mode-available notice has been shown
  voiceLangHintShownCount?: number // Number of times the /voice dictation-language hint has been shown
  voiceLangHintLastLanguage?: string // Resolved STT language code when the hint was last shown — reset count when it changes
  voiceFooterHintSeenCount?: number // Number of sessions the "hold X to speak" footer hint has been shown

  // Opus 1M merge notice tracking
  opus1mMergeNoticeSeenCount?: number // Number of times the opus-1m-merge notice has been shown

  // Experiment enrollment notice tracking (keyed by experiment id)
  experimentNoticesSeenCount?: Record<string, number>

  // OpusPlan experiment config
  hasShownOpusPlanWelcome?: Record<string, boolean> // Whether the OpusPlan welcome message has been shown per org

  // Queue usage tracking
  promptQueueUseCount: number // Number of times use has used the prompt queue

  // Btw usage tracking
  btwUseCount: number // Number of times user has used /btw

  // Plan mode usage tracking
  lastPlanModeUse?: number // Timestamp of last plan mode usage

  // Subscription notice tracking
  subscriptionNoticeCount?: number // Number of times the subscription notice has been shown
  hasAvailableSubscription?: boolean // Cached result of whether user has a subscription available
  subscriptionUpsellShownCount?: number // Number of times the subscription upsell has been shown (deprecated)
  recommendedSubscription?: string // Cached config value from Statsig (deprecated)

  // Todo feature configuration
  todoFeatureEnabled: boolean // Whether the todo feature is enabled
  showExpandedTodos?: boolean // Whether to show todos expanded, even when empty
  showSpinnerTree?: boolean // Whether to show the teammate spinner tree instead of pills

  // First start time tracking
  firstStartTime?: string // ISO timestamp when Claude Code was first started on this machine

  messageIdleNotifThresholdMs: number // How long the user has to have been idle to get a notification that Claude is done generating

  githubActionSetupCount?: number // Number of times the user has set up the GitHub Action
  slackAppInstallCount?: number // Number of times the user has clicked to install the Slack app

  // File checkpointing configuration
  fileCheckpointingEnabled: boolean

  // Terminal progress bar configuration (OSC 9;4)
  terminalProgressBarEnabled: boolean

  // Terminal tab status indicator (OSC 21337). When on, emits a colored
  // dot + status text to the tab sidebar and drops the spinner prefix
  // from the title (the dot makes it redundant).
  showStatusInTerminalTab?: boolean

  // Push-notification toggles (set via /config). Default off — explicit opt-in required.
  taskCompleteNotifEnabled?: boolean
  inputNeededNotifEnabled?: boolean
  agentPushNotifEnabled?: boolean

  // Claude Code usage tracking
  claudeCodeFirstTokenDate?: string // ISO timestamp of the user's first Claude Code OAuth token

  // Model switch callout tracking (ant-only)
  modelSwitchCalloutDismissed?: boolean // Whether user chose "Don't show again"
  modelSwitchCalloutLastShown?: number // Timestamp of last shown (don't show for 24h)
  modelSwitchCalloutVersion?: string

  // Effort callout tracking - shown once for Opus 4.6 users
  effortCalloutDismissed?: boolean // v1 - legacy, read to suppress v2 for Pro users who already saw it
  effortCalloutV2Dismissed?: boolean

  // Remote callout tracking - shown once before first bridge enable
  remoteDialogSeen?: boolean

  // Cross-process backoff for initReplBridge's oauth_expired_unrefreshable skip.
  // `expiresAt` is the dedup key — content-addressed, self-clears when /login
  // replaces the token. `failCount` caps false positives: transient refresh
  // failures (auth server 5xx, lock errors) get 3 retries before backoff kicks
  // in, mirroring useReplBridge's MAX_CONSECUTIVE_INIT_FAILURES. Dead-token
  // accounts cap at 3 config writes; healthy+transient-blip self-heals in ~210s.
  bridgeOauthDeadExpiresAt?: number
  bridgeOauthDeadFailCount?: number

  // Desktop upsell startup dialog tracking
  desktopUpsellSeenCount?: number // Total showings (max 3)
  desktopUpsellDismissed?: boolean // "Don't ask again" picked

  // Idle-return dialog tracking
  idleReturnDismissed?: boolean // "Don't ask again" picked

  // Opus 4.5 Pro migration tracking
  opusProMigrationComplete?: boolean
  opusProMigrationTimestamp?: number

  // Sonnet 4.5 1m migration tracking
  sonnet1m45MigrationComplete?: boolean

  // Opus 4.0/4.1 → current Opus migration (shows one-time notif)
  legacyOpusMigrationTimestamp?: number

  // Sonnet 4.5 → 4.6 migration (pro/max/team premium)
  sonnet45To46MigrationTimestamp?: number

  // Cached statsig gate values
  cachedStatsigGates?: {
    [gateName: string]: boolean
  }

  // Cached statsig dynamic configs
  cachedDynamicConfigs?: { [configName: string]: unknown }

  // Cached GrowthBook feature values
  cachedGrowthBookFeatures?: { [featureName: string]: unknown }

  // Local GrowthBook overrides (ant-only, set via /config Gates tab).
  // Checked after env-var overrides but before the real resolved value.
  growthBookOverrides?: { [featureName: string]: unknown }

  // Emergency tip tracking - stores the last shown tip to prevent re-showing
  lastShownEmergencyTip?: string

  // File picker gitignore behavior
  respectGitignore: boolean // Whether file picker should respect .gitignore files (default: true). Note: .ignore files are always respected

  // Copy command behavior
  copyFullResponse: boolean // Whether /copy always copies the full response instead of showing the picker

  // Fullscreen in-app text selection behavior
  copyOnSelect?: boolean // Auto-copy to clipboard on mouse-up (undefined → true; lets cmd+c "work" via no-op)

  // GitHub repo path mapping for teleport directory switching
  // Key: "owner/repo" (lowercase), Value: array of absolute paths where repo is cloned
  githubRepoPaths?: Record<string, string[]>

  // Terminal emulator to launch for claude-cli:// deep links. Captured from
  // TERM_PROGRAM during interactive sessions since the deep link handler runs
  // headless (LaunchServices/xdg) with no TERM_PROGRAM set.
  deepLinkTerminal?: string

  // iTerm2 it2 CLI setup
  iterm2It2SetupComplete?: boolean // Whether it2 setup has been verified
  preferTmuxOverIterm2?: boolean // User preference to always use tmux over iTerm2 split panes

  // Skill usage tracking for autocomplete ranking
  skillUsage?: Record<string, { usageCount: number; lastUsedAt: number }>
  // Official marketplace auto-install tracking
  officialMarketplaceAutoInstallAttempted?: boolean // Whether auto-install was attempted
  officialMarketplaceAutoInstalled?: boolean // Whether auto-install succeeded
  officialMarketplaceAutoInstallFailReason?:
    | 'policy_blocked'
    | 'git_unavailable'
    | 'gcs_unavailable'
    | 'unknown' // Reason for failure if applicable
  officialMarketplaceAutoInstallRetryCount?: number // Number of retry attempts
  officialMarketplaceAutoInstallLastAttemptTime?: number // Timestamp of last attempt
  officialMarketplaceAutoInstallNextRetryTime?: number // Earliest time to retry again

  // Claude in Chrome settings
  hasCompletedClaudeInChromeOnboarding?: boolean // Whether Claude in Chrome onboarding has been shown
  claudeInChromeDefaultEnabled?: boolean // Whether Claude in Chrome is enabled by default (undefined means platform default)
  cachedChromeExtensionInstalled?: boolean // Cached result of whether Chrome extension is installed

  // Chrome extension pairing state (persisted across sessions)
  chromeExtension?: {
    pairedDeviceId?: string
    pairedDeviceName?: string
  }

  // LSP plugin recommendation preferences
  lspRecommendationDisabled?: boolean // Disable all LSP plugin recommendations
  lspRecommendationNeverPlugins?: string[] // Plugin IDs to never suggest
  lspRecommendationIgnoredCount?: number // Track ignored recommendations (stops after 5)

  // Claude Code hint protocol state (<claude-code-hint /> tags from CLIs/SDKs).
  // Nested by hint type so future types (docs, mcp, ...) slot in without new
  // top-level keys.
  claudeCodeHints?: {
    // Plugin IDs the user has already been prompted for. Show-once semantics:
    // recorded regardless of yes/no response, never re-prompted. Capped at
    // 100 entries to bound config growth — past that, hints stop entirely.
    plugin?: string[]
    // User chose "don't show plugin installation hints again" from the dialog.
    disabled?: boolean
  }

  // Permission explainer configuration
  permissionExplainerEnabled?: boolean // Enable Haiku-generated explanations for permission requests (default: true)

  // Teammate spawn mode: 'auto' | 'tmux' | 'iterm2' | 'in-process'
  teammateMode?: 'auto' | 'tmux' | 'iterm2' | 'in-process' // How to spawn teammates (default: 'auto')
  // Model for new teammates when the tool call doesn't pass one.
  // undefined = hardcoded Opus (backward-compat); null = leader's model; string = model alias/ID.
  teammateDefaultModel?: string | null

  // PR status footer configuration (feature-flagged via GrowthBook)
  prStatusFooterEnabled?: boolean // Show PR review status in footer (default: true)

  // Tmux live panel visibility (ant-only, toggled via Enter on tmux pill)
  tungstenPanelVisible?: boolean

  // Cached org-level fast mode status from the API.
  // Used to detect cross-session changes and notify users.
  penguinModeOrgEnabled?: boolean

  // Epoch ms when background refreshes last ran (fast mode, quota, passes, client data).
  // Used with tengu_cicada_nap_ms to throttle API calls
  startupPrefetchedAt?: number

  // Run Remote Control at startup (requires BRIDGE_MODE)
  // undefined = use default (see getRemoteControlAtStartup() for precedence)
  remoteControlAtStartup?: boolean

  // Cached extra usage disabled reason from the last API response
  // undefined = no cache, null = extra usage enabled, string = disabled reason.
  cachedExtraUsageDisabledReason?: string | null
  fableOverageConsentV2?: Record<string, boolean>

  // Auto permissions notification tracking (ant-only)
  autoPermissionsNotificationCount?: number // Number of times the auto permissions notification has been shown

  // Speculation configuration (ant-only)
  speculationEnabled?: boolean // Whether speculation is enabled (default: true)


  // Client data for server-side experiments (fetched during bootstrap).
  clientDataCache?: Record<string, unknown> | null

  // Additional model options for the model picker (fetched during bootstrap).
  additionalModelOptionsCache?: ModelOption[]
  additionalModelOptionsAnsweredAt?: number
  clientDataCacheSlots?: Record<string, ClientDataSlot>
  additionalModelCostsCache?: Record<string, ModelCosts>
  modelAccessCache?: NonNullable<BootstrapResponse['model_access']>
  orgModelDefaultCache?: (NonNullable<BootstrapResponse['org_model_default']> & { orgUuid?: string }) | null
  lastSeenOrgDefaultUpdatedAt?: string
  firstStartVersion?: string
  unpinOpus47LaunchEffort?: boolean
  unpinOpus48LaunchEffort?: boolean
  unpinFable5LaunchEffort?: boolean
  autoCompactWindowsCache?: Record<string, unknown> | null

  // Disk cache for /api/claude_code/organizations/metrics_enabled.
  // Org-level settings change rarely; persisting across processes avoids a
  // cold API call on every `claude -p` invocation.
  metricsStatusCache?: {
    enabled: boolean
    timestamp: number
  }

  // Version of the last-applied migration set. When equal to
  // CURRENT_MIGRATION_VERSION, runMigrations() skips all sync migrations
  // (avoiding 11× saveGlobalConfig lock+re-read on every startup).
  migrationVersion?: number
}

/**
 * Factory for a fresh default GlobalConfig. Used instead of deep-cloning a
 * shared constant — the nested containers (arrays, records) are all empty, so
 * a factory gives fresh refs at zero clone cost.
 */
function createDefaultGlobalConfig(): GlobalConfig {
  return {
    numStartups: 0,
    installMethod: undefined,
    autoUpdates: undefined,
    theme: 'dark',
    preferredNotifChannel: 'auto',
    verbose: false,
    editorMode: 'normal',
    autoCompactEnabled: true,
    autoScrollEnabled: true,
    externalEditorContext: false,
    showMessageTimestamps: false,
    briefTranscript: false,
    showTurnDuration: true,
    hasSeenTasksHint: false,
    hasUsedStash: false,
    hasUsedBackgroundTask: false,
    queuedCommandUpHintCount: 0,
    diffTool: 'auto',
    customApiKeyResponses: {
      approved: [],
      rejected: [],
    },
    env: {},
    tipsHistory: {},
    memoryUsageCount: 0,
    promptQueueUseCount: 0,
    btwUseCount: 0,
    todoFeatureEnabled: true,
    showExpandedTodos: false,
    messageIdleNotifThresholdMs: 60000,
    autoConnectIde: false,
    autoInstallIdeExtension: true,
    fileCheckpointingEnabled: true,
    terminalProgressBarEnabled: true,
    cachedDynamicConfigs: {},
    cachedGrowthBookFeatures: {},
    respectGitignore: true,
    copyFullResponse: false,
  }
}

export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = createDefaultGlobalConfig()

export const GLOBAL_CONFIG_KEYS = [
  'apiKeyHelper',
  'installMethod',
  'autoUpdates',
  'autoUpdatesProtectedForNative',
  'theme',
  'verbose',
  'briefTranscript',
  'preferredNotifChannel',
  'shiftEnterKeyBindingInstalled',
  'editorMode',
  'hasUsedBackslashReturn',
  'autoCompactEnabled',
  'showTurnDuration',
  'diffTool',
  'env',
  'tipsHistory',
  'todoFeatureEnabled',
  'showExpandedTodos',
  'messageIdleNotifThresholdMs',
  'autoConnectIde',
  'autoInstallIdeExtension',
  'fileCheckpointingEnabled',
  'terminalProgressBarEnabled',
  'showStatusInTerminalTab',
  'taskCompleteNotifEnabled',
  'inputNeededNotifEnabled',
  'agentPushNotifEnabled',
  'respectGitignore',
  'claudeInChromeDefaultEnabled',
  'hasCompletedClaudeInChromeOnboarding',
  'lspRecommendationDisabled',
  'lspRecommendationNeverPlugins',
  'lspRecommendationIgnoredCount',
  'copyFullResponse',
  'copyOnSelect',
  'permissionExplainerEnabled',
  'prStatusFooterEnabled',
  'remoteControlAtStartup',
  'remoteDialogSeen',
] as const

export type GlobalConfigKey = (typeof GLOBAL_CONFIG_KEYS)[number]

export function isGlobalConfigKey(key: string): key is GlobalConfigKey {
  return GLOBAL_CONFIG_KEYS.includes(key as GlobalConfigKey)
}

export const PROJECT_CONFIG_KEYS = [
  'allowedTools',
  'hasTrustDialogAccepted',
  'hasCompletedProjectOnboarding',
] as const

export type ProjectConfigKey = (typeof PROJECT_CONFIG_KEYS)[number]

/**
 * Check if the user has already accepted the trust dialog for the cwd.
 *
 * This function traverses parent directories to check if a parent directory
 * had approval. Accepting trust for a directory implies trust for child
 * directories.
 *
 * @returns Whether the trust dialog has been accepted (i.e. "should not be shown")
 */
export function resetTrustDialogAcceptedCacheForTesting(): void {
  nativeConfigState.setTrustAccepted(false)
}

export function checkHasTrustDialogAccepted(): boolean {
  // Share the exact ConfigState latch consumed by official permission trust
  // (ds/OE). False is deliberately not cached so mid-session acceptance is seen.
  if (nativeConfigState.trustAccepted) return true
  const accepted = computeTrustDialogAccepted()
  if (accepted) nativeConfigState.setTrustAccepted(true)
  return accepted
}

function computeTrustDialogAccepted(): boolean {
  // Official T0 short-circuits sandboxed sessions before session or disk trust.
  if (isEnvTruthy(process.env.CLAUDE_CODE_SANDBOXED)) return true

  // Check session-level trust (for home directory case where trust is not persisted)
  // When running from home dir, trust dialog is shown but acceptance is stored
  // in memory only. This allows hooks and other features to work during the session.
  if (getSessionTrustAccepted()) {
    return true
  }

  const config = getGlobalConfig()

  // Always check where trust would be saved (git root or original cwd)
  // This is the primary location where trust is persisted by saveCurrentProjectConfig
  const projectPath = getProjectPathForConfig()
  const projectConfig = config.projects?.[projectPath]
  if (projectConfig?.hasTrustDialogAccepted) {
    return true
  }

  // Now check from current working directory and its parents
  // Normalize paths for consistent JSON key lookup
  let currentPath = normalizePathForConfigKey(getOriginalCwd())

  // Traverse all parent directories
  while (true) {
    const pathConfig = config.projects?.[currentPath]
    if (pathConfig?.hasTrustDialogAccepted) {
      return true
    }

    const parentPath = normalizePathForConfigKey(resolve(currentPath, '..'))
    // Stop if we've reached the root (when parent is same as current)
    if (parentPath === currentPath) {
      break
    }
    currentPath = parentPath
  }

  return false
}

/**
 * Check trust for an arbitrary directory (not the session cwd).
 * Walks up from `dir`, returning true if any ancestor has trust persisted.
 * Unlike checkHasTrustDialogAccepted, this does NOT consult session trust or
 * the memoized project path — use when the target dir differs from cwd (e.g.
 * /assistant installing into a user-typed path).
 */
export function isPathTrusted(dir: string): boolean {
  const config = getGlobalConfig()
  let currentPath = normalizePathForConfigKey(resolve(dir))
  while (true) {
    if (config.projects?.[currentPath]?.hasTrustDialogAccepted) return true
    const parentPath = normalizePathForConfigKey(resolve(currentPath, '..'))
    if (parentPath === currentPath) return false
    currentPath = parentPath
  }
}

// We have to put this test code here because Jest doesn't support mocking ES modules :O
const TEST_GLOBAL_CONFIG_FOR_TESTING: GlobalConfig = {
  ...DEFAULT_GLOBAL_CONFIG,
  autoUpdates: false,
}
const TEST_PROJECT_CONFIG_FOR_TESTING: ProjectConfig = {
  ...DEFAULT_PROJECT_CONFIG,
}

export function isProjectConfigKey(key: string): key is ProjectConfigKey {
  return PROJECT_CONFIG_KEYS.includes(key as ProjectConfigKey)
}

/**
 * Detect whether writing `fresh` would lose auth/onboarding state that the
 * in-memory cache still has. This happens when `getConfig` hits a corrupted
 * or truncated file mid-write (from another process or a non-atomic fallback)
 * and returns DEFAULT_GLOBAL_CONFIG. Writing that back would permanently
 * wipe auth. See GH #3117.
 */
function wouldLoseAuthState(fresh: {
  oauthAccount?: unknown
  hasCompletedOnboarding?: boolean
}): boolean {
  const cached = nativeConfigState.cache.config
  if (!cached) return false
  const lostOauth =
    cached.oauthAccount !== undefined && fresh.oauthAccount === undefined
  const lostOnboarding =
    cached.hasCompletedOnboarding === true &&
    fresh.hasCompletedOnboarding !== true
  return lostOauth || lostOnboarding
}

// Production writes use the original async queue, atomic publisher and native
// backend handoff. Test-only in-memory settings retain synchronous notification.
export function saveGlobalConfig(
  updater: (currentConfig: GlobalConfig) => GlobalConfig,
  storageV5?: unknown,
): Promise<void> {
  if (process.env.NODE_ENV === 'test' && storageV5 === undefined) {
    const config = updater(TEST_GLOBAL_CONFIG_FOR_TESTING)
    if (config !== TEST_GLOBAL_CONFIG_FOR_TESTING) {
      Object.assign(TEST_GLOBAL_CONFIG_FOR_TESTING, config)
      notifyGlobalConfigChanges({...TEST_GLOBAL_CONFIG_FOR_TESTING})
    }
    return Promise.resolve()
  }
  return nativeConfigWriter().save(updater, storageV5)
}

// Original jM/Nc boolean result, exposed from this same writer/queue.
export function trySaveGlobalConfig287(updater:(currentConfig:GlobalConfig)=>GlobalConfig,storageV5?:unknown):Promise<boolean> {
  return nativeConfigWriter().trySave(updater,storageV5)
}

// One authoritative cache and queue for both global and project writes.
const nativeConfigState = new ConfigState({
  now: Date.now, testGlobalConfig: TEST_GLOBAL_CONFIG_FOR_TESTING,
  testProjectConfig: TEST_PROJECT_CONFIG_FOR_TESTING,
})
export type PermissionTrustTrackingOwner287 = Pick<
  InstanceType<typeof ConfigState>,
  'trustAccepted' | 'localSettingsGitTracked' |
  'setTrustAccepted' | 'setLocalSettingsGitTracked'
>
/** The original trust/cache owner shared with the 2.1.287 permission closure. */
export function getPermissionTrustTrackingOwner287(): PermissionTrustTrackingOwner287 {
  return nativeConfigState
}
/** Original GM/AJe/xj share this exact cache and write queue. */
export function getGeneratedIdentityOwner287(): Pick<InstanceType<typeof ConfigState>,
  'generatedUserID' | 'generatedMachineID' | 'setGeneratedUserID' |
  'setGeneratedMachineID' | 'writeQueues'> {
  return nativeConfigState
}
// Native O_t must operate on the same private owner as reads and writes.
export const clearClientDataWindowSeed287 = createNativeClientDataSeedClear287({
  oe: () => nativeConfigState,
})
let writer: ReturnType<typeof bindConfigWriter> | undefined
function nativeConfigWriter(): ReturnType<typeof bindConfigWriter> {
  return writer ??= bindConfigWriter({
    state: () => nativeConfigState, host: getSecureStorageExecutionHost,
    file: getGlobalClaudeFile, home: getClaudeConfigHomeDir,
    project: getProjectPathForConfig, storageV5: isStorageV5PinnedOn,
    // Standalone CLI host only; injected host launchOptions is a remaining
    // explicit integration boundary, not inferred from environment variables.
    diskless: () => false,
    debug: logForDebugging,
    event: (name, metadata) => logEvent(name, metadata as Parameters<typeof logEvent>[1]),
    featureSad: (feature, reason) => logEvent('tengu_feature_sad', {
      feature_name: feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      error_code: reason as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    }),
  })
}

/** Read-only view of the client-data hooks owned by the existing ConfigState.
 * This deliberately exposes no setter and creates no parallel config owner.
 */
export function getClientDataHooks286(): Readonly<Pick<
  InstanceType<typeof ConfigState>,
  'clientDataCacheKeyGetter' | 'clientDataWindowSeed' | 'clientDataReadGate' |
  'clientDataStrictReadGate' | 'clientDataStaleMatchGetter' | 'clientDataOverride'
>> {
  const state = nativeConfigState
  return {
    clientDataCacheKeyGetter: state.clientDataCacheKeyGetter,
    clientDataWindowSeed: state.clientDataWindowSeed,
    clientDataReadGate: state.clientDataReadGate,
    clientDataStrictReadGate: state.clientDataStrictReadGate,
    clientDataStaleMatchGetter: state.clientDataStaleMatchGetter,
    clientDataOverride: state.clientDataOverride,
  }
}

/** Install the official bootstrap module's key getter on the existing owner. */
export function registerClientDataCacheKeyGetter286(getter: (model?: string) => string): void {
  nativeConfigState.setClientDataCacheKeyGetter(getter)
}
export function flushGlobalConfigWrites(): Promise<void> {
  return nativeConfigState.writeQueues.drain()
}
export function getGlobalConfigWriteCount(): number {
  return nativeConfigState.writeGeneration
}

export const CONFIG_WRITE_DISPLAY_THRESHOLD = 20

function reportConfigCacheStats(): void {
  const {hits, misses} = nativeConfigState.takeCacheStats()
  const total = hits + misses
  if (total > 0) logEvent('tengu_config_cache_stats', {
    cache_hits: hits, cache_misses: misses, hit_rate: hits / total,
  })
}
registerCleanup(async () => {
  await flushGlobalConfigWrites()
  reportConfigCacheStats()
})

// Local UI subscribers observe the same refreshed cache as execution getters.
// No extra watcher or polling loop is created for a mounted Config dialog.
const globalConfigListeners = new Set<(config: GlobalConfig) => void>()
export function subscribeGlobalConfigChanges(listener: (config: GlobalConfig) => void): () => void {
  globalConfigListeners.add(listener)
  return () => { globalConfigListeners.delete(listener) }
}
function notifyGlobalConfigChanges(config: GlobalConfig): void {
  for (const listener of globalConfigListeners) listener(config)
}

nativeConfigState.installed.subscribe(() => {
  if (nativeConfigState.cache.config) notifyGlobalConfigChanges(nativeConfigState.cache.config)
})

// The official synchronous accessor only reads the installed cache after the
// async enable gate. It never performs a second startup read or adds a watcher.
export function getGlobalConfig(): GlobalConfig {
  if (process.env.NODE_ENV === 'test') return TEST_GLOBAL_CONFIG_FOR_TESTING
  return nativeConfigWriter().readCache()
}

/**
 * Returns the effective value of remoteControlAtStartup. Precedence:
 *   1. User's explicit config value (always wins — honors opt-out)
 *   2. CCR auto-connect default (ant-only build, GrowthBook-gated)
 *   3. false (Remote Control must be explicitly opted into)
 */
export function getRemoteControlAtStartup(): boolean {
  const explicit = getGlobalConfig().remoteControlAtStartup
  if (explicit !== undefined) return explicit
  if (feature('CCR_AUTO_CONNECT')) {
    if (ccrAutoConnect?.getCcrAutoConnectDefault()) return true
  }
  return false
}

export function getCustomApiKeyStatus(
  truncatedApiKey: string,
): 'approved' | 'rejected' | 'new' {
  const config = getGlobalConfig()
  if (config.customApiKeyResponses?.approved?.includes(truncatedApiKey)) {
    return 'approved'
  }
  if (config.customApiKeyResponses?.rejected?.includes(truncatedApiKey)) {
    return 'rejected'
  }
  return 'new'
}

export type ConfigEnableOptions = {
  fileWatchFallback?: boolean
  writersWithoutBackend?: 'memory'
}
export function enableConfigs(storageV5?: unknown, options?: ConfigEnableOptions): Promise<void> {
  if (process.env.NODE_ENV === 'test' && storageV5 === undefined) {
    nativeConfigState.allowReading()
    nativeConfigState.markEnableSettled()
    return Promise.resolve()
  }
  return nativeConfigWriter().enable(storageV5,options)
}

export function handoffGlobalConfigStorage(storageV5?: unknown): Promise<void> {
  return nativeConfigWriter().handoff(storageV5)
}
export function getGlobalConfigUncached(storageV5?: unknown): Promise<GlobalConfig | undefined> {
  return nativeConfigWriter().readUncached(storageV5)
}

// Memoized function to get the project path for config lookup
export const getProjectPathForConfig = memoize((): string => {
  const originalCwd = getOriginalCwd()
  const gitRoot = findCanonicalGitRoot(originalCwd)

  if (gitRoot) {
    // Normalize for consistent JSON keys (forward slashes on all platforms)
    // This ensures paths like C:\Users\... and C:/Users/... map to the same key
    return normalizePathForConfigKey(gitRoot)
  }

  // Not in a git repo
  return normalizePathForConfigKey(resolve(originalCwd))
})

export function getCurrentProjectConfig(): ProjectConfig {
  if (process.env.NODE_ENV === 'test') {
    return TEST_PROJECT_CONFIG_FOR_TESTING
  }

  const absolutePath = getProjectPathForConfig()
  const config = getGlobalConfig()

  if (!config.projects) {
    return DEFAULT_PROJECT_CONFIG
  }

  const projectConfig = config.projects[absolutePath] ?? DEFAULT_PROJECT_CONFIG
  // Not sure how this became a string
  // TODO: Fix upstream
  if (typeof projectConfig.allowedTools === 'string') {
    projectConfig.allowedTools =
      (safeParseJSON(projectConfig.allowedTools) as string[]) ?? []
  }

  return projectConfig
}

export function saveCurrentProjectConfig(
  updater: (currentConfig: ProjectConfig) => ProjectConfig,
  storageV5?: unknown,
): Promise<void> {
  if (process.env.NODE_ENV === 'test' && storageV5 === undefined) {
    const config = updater(TEST_PROJECT_CONFIG_FOR_TESTING)
    if (config !== TEST_PROJECT_CONFIG_FOR_TESTING) Object.assign(TEST_PROJECT_CONFIG_FOR_TESTING, config)
    return Promise.resolve()
  }
  return nativeConfigWriter().saveProject(updater, storageV5).then(() => undefined)
}

export function isAutoUpdaterDisabled(): boolean {
  return getAutoUpdaterDisabledReason() !== null
}

/**
 * Returns true if plugin autoupdate should be skipped.
 * This checks if the auto-updater is disabled AND the FORCE_AUTOUPDATE_PLUGINS
 * env var is not set to 'true'. The env var allows forcing plugin autoupdate
 * even when the auto-updater is otherwise disabled.
 */
export function shouldSkipPluginAutoupdate(): boolean {
  return (
    isAutoUpdaterDisabled() &&
    !isEnvTruthy(process.env.FORCE_AUTOUPDATE_PLUGINS)
  )
}

export type AutoUpdaterDisabledReason =
  | { type: 'development' }
  | { type: 'env'; envVar: string }
  | { type: 'config' }

export function formatAutoUpdaterDisabledReason(
  reason: AutoUpdaterDisabledReason,
): string {
  switch (reason.type) {
    case 'development':
      return 'development build'
    case 'env':
      return `${reason.envVar} set`
    case 'config':
      return 'config'
  }
}

export function getAutoUpdaterDisabledReason(): AutoUpdaterDisabledReason | null {
  if (process.env.NODE_ENV === 'development') {
    return { type: 'development' }
  }
  if (isEnvTruthy(process.env.DISABLE_AUTOUPDATER)) {
    return { type: 'env', envVar: 'DISABLE_AUTOUPDATER' }
  }
  const essentialTrafficEnvVar = getEssentialTrafficOnlyReason()
  if (essentialTrafficEnvVar) {
    return { type: 'env', envVar: essentialTrafficEnvVar }
  }
  const config = getGlobalConfig()
  if (
    config.autoUpdates === false &&
    (config.installMethod !== 'native' ||
      config.autoUpdatesProtectedForNative !== true)
  ) {
    return { type: 'config' }
  }
  return null
}

export function getOrCreateUserID(): string {
  const config = getGlobalConfig()
  if (config.userID) {
    return config.userID
  }

  const userID = randomBytes(32).toString('hex')
  saveGlobalConfig(current => ({ ...current, userID }))
  return userID
}

export function recordFirstStartTime(): void {
  const config = getGlobalConfig()
  if (!config.firstStartTime) {
    const firstStartTime = new Date().toISOString()
    saveGlobalConfig(current => ({
      ...current,
      firstStartTime: current.firstStartTime ?? firstStartTime,
    }))
  }
}

export function getMemoryPath(memoryType: MemoryType): string {
  const cwd = getOriginalCwd()

  switch (memoryType) {
    case 'User':
      return join(getClaudeConfigHomeDir(), 'CLAUDE.md')
    case 'Local':
      return join(cwd, 'CLAUDE.local.md')
    case 'Project':
      return join(cwd, 'CLAUDE.md')
    case 'Managed':
      return join(getManagedFilePath(), 'CLAUDE.md')
    case 'AutoMem':
      return getAutoMemEntrypoint()
  }
  // TeamMem is only a valid MemoryType when feature('TEAMMEM') is true
  if (feature('TEAMMEM')) {
    return teamMemPaths!.getTeamMemEntrypoint()
  }
  return '' // unreachable in external builds where TeamMem is not in MemoryType
}

export function getManagedClaudeRulesDir(): string {
  return join(getManagedFilePath(), '.claude', 'rules')
}

export function getUserClaudeRulesDir(): string {
  return join(getClaudeConfigHomeDir(), 'rules')
}

// Exported for testing only
export const _getConfigForTesting = (file: string, defaults: () => GlobalConfig, strict?: boolean) => nativeConfigWriter().read(file,defaults,strict)
export const _wouldLoseAuthStateForTesting = wouldLoseAuthState
export function _setGlobalConfigCacheForTesting(
  config: GlobalConfig | null,
): void {
  nativeConfigState.cache.config = config
  nativeConfigState.cache.mtime = config ? Date.now() : 0
}
