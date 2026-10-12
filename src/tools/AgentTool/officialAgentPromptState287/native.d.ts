import type {TypedEnvironment287} from '../../../utils/officialTypedEnvironment287/native.js'
import type {CanonicalRoot287} from '../../../utils/model/officialModelBehavior287/native.js'
import type {OfficialClientDataRecord286} from '../../../utils/officialClientData286/data.runtime.js'
export type TaskMode287 = 'default' | 'no_nudges' | 'counter_steer'
export type TaskModeReader287 = () => Record<string, unknown> | null
export type TaskModeFeatureReader287 = (name: string, fallback: null) => unknown
export type ModelFloor287 = (model: string) => TaskMode287 | undefined
export interface TaskModeOwner287 {
  modelSteerFloor: ModelFloor287 | null
  promptModel: string | undefined
  latched: TaskMode287 | undefined
  registerModelFloor(reader: ModelFloor287 | null): ModelFloor287 | null
  recordPromptModel(model: string | undefined): void
  latch(mode: TaskMode287): void
  resetLatch(): void
}
export interface TaskModeReaders287 {
  clientData: TaskModeReader287 | null
  feature: TaskModeFeatureReader287 | null
  registerClientData(reader: TaskModeReader287 | null): TaskModeReader287 | null
  registerFeature(reader: TaskModeFeatureReader287 | null): TaskModeFeatureReader287 | null
}
export interface BackgroundLaunchRule287 {parameterDescription: string}
export interface BackgroundPolicy287 {
  readonly backgroundTasksDisabled: boolean
  readonly unsandboxedCommandsDisabled: boolean
  readonly backgroundDeadlineDisabled: boolean
  readonly backgroundLaunchRule: BackgroundLaunchRule287 | undefined
  disableBackgroundTasks(): void
  disableUnsandboxedCommands(): void
  disableBackgroundDeadline(): void
  installBackgroundLaunchRule(rule: BackgroundLaunchRule287): void
}
// Public minimal view of the COMPLETE original je class; not a reduced reimplementation.
// Strict local reconstruction of the original je print-format getter/setter ABI.
export type PrintOutputFormat287 = 'text' | 'json' | 'stream-json'
export interface LaunchOptions287 {
  printOutputFormat(): PrintOutputFormat287 | null
  replacePrintOutputFormat(value: PrintOutputFormat287 | null): void
  disableSlashCommands(): boolean
  replaceDisableSlashCommands(value: boolean): void
  projectConfigRoot(): string | null
  replaceProjectConfigRoot(value: string | null): void
  userMsgOptIn(): boolean
  replaceUserMsgOptIn(value: boolean): void
  singleShotPrintSession(): boolean
  replaceSingleShotPrintSession(value: boolean): void
  printInputClosed(): boolean
  markPrintInputClosed(): void
  isInteractive(): boolean
  replaceIsInteractive(value: boolean): void
  permissionPromptToolName(): string | undefined
  replacePermissionPromptToolName(value: string | undefined): void
  clientType(): string
  replaceClientType(value: string): void
  sdkAgentProgressSummariesEnabled(): boolean
  replaceSdkAgentProgressSummariesEnabled(value: boolean): void
  strictToolResultPairing(): boolean
  replaceStrictToolResultPairing(value: boolean): void
  sessionBypassPermissionsMode(): boolean
  replaceSessionBypassPermissionsMode(value: boolean): void
  sessionPersistenceDisabled(): boolean
  replaceSessionPersistenceDisabled(value: boolean): void
  scheduledTasksEnabled(): boolean
  replaceScheduledTasksEnabled(value: boolean): void

  toolsOmittedByLaunchList(): Set<string>
  replaceToolsOmittedByLaunchList(value: Set<string>): void
  searchToolsOptIn(): boolean
  replaceSearchToolsOptIn(value: boolean): void
  todoToolsOptIn(): boolean
  replaceTodoToolsOptIn(value: boolean): void
  diskless(): boolean
  replaceDiskless(value: boolean): void
  ccrDerivedSurface(): string | undefined
  replaceCcrDerivedSurface(value: string | undefined): void
  reset(): void
}
export interface ExecutionContext287 {
  root: object
  host: {launchOptions: LaunchOptions287}
  promptAssembly: {forgetAllSections(): void; noteInvalidation(reason?: string): void}
}
export interface AgentPromptStatePorts287 {
  executionContext(): ExecutionContext287
  unlatchStickyBetas(): void
  environment: Pick<TypedEnvironment287, 'CLAUDE_CODE_THISTLE_GREBE' | 'CLAUDE_CODE_MODEL_CAPABILITIES'>
  feature<T>(name: string, fallback: T): T
  behavior(model: string, options?: {identity?: boolean}): string
  clientDataRecord(model?: string): OfficialClientDataRecord286 | null
  canonicalRoot(): CanonicalRoot287
  catalogEntry(model: string): {capabilities: readonly string[]} | undefined
  event: typeof import('../../../services/analytics/index.js').logEvent
}
export interface AgentPromptState287 {
  TaskModeOwner: new () => TaskModeOwner287
  TaskModeReaders: new () => TaskModeReaders287
  BackgroundPolicy: new () => BackgroundPolicy287
  LaunchOptions: new () => LaunchOptions287
  taskMode(): TaskMode287
  taskModeOwner(): TaskModeOwner287
  taskModeSlots: {peek(context: Pick<ExecutionContext287, 'root'>): TaskModeOwner287 | undefined; of(context: Pick<ExecutionContext287, 'root'>): TaskModeOwner287; drop(context: Pick<ExecutionContext287, 'root'>): void}
  readers: TaskModeReaders287
  registerClientData(reader: TaskModeReader287 | null): TaskModeReader287 | null
  registerFeature(reader: TaskModeFeatureReader287 | null): TaskModeFeatureReader287 | null
  registerModelFloor(reader: ModelFloor287 | null): ModelFloor287 | null
  recordPromptModel(model: string | undefined): void
  resetTaskModeLatch(): void
  preparePromptModel(model: string | undefined): void
  invalidatePromptBoundary(reason?: string): void
  backgroundPolicy(): BackgroundPolicy287
  withBackgroundPolicy<T>(policy: BackgroundPolicy287, callback: () => T): T
  disableServeBackground(policy?: BackgroundPolicy287): BackgroundPolicy287
  searchToolsOptIn(): boolean
  replaceSearchToolsOptIn(value: boolean): void
  diskless(): boolean
  derivedSurface(): string | undefined
}
export function createAgentPromptState287(ports: AgentPromptStatePorts287): AgentPromptState287
