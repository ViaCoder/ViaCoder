
import type {SurfaceIdentity287} from '../../../services/context/officialSurfaceIdentity287/native.js'
import type {TypedEnvironment287} from '../../../utils/officialTypedEnvironment287/native.js'
import type {BehaviorMemoOwner287,CanonicalRoot287} from '../../../utils/model/officialModelBehavior287/native.js'
import type {OfficialClientDataRecord286} from '../../../utils/officialClientData286/data.runtime.js'
import type {AsyncLocalStorage} from 'node:async_hooks'

export type AgentTaskMode287 = 'default' | 'no_nudges' | 'counter_steer'
export type AgentPromptEnvironment287 = Pick<TypedEnvironment287, "CLAUDE_CODE_BREEZY_HORIZON" | "CLAUDE_CODE_DISABLE_BACKGROUND_TASKS" | "CLAUDE_CODE_ENTRYPOINT" | "CLAUDE_CODE_EVAL_CONFINED" | "CLAUDE_CODE_MODEL_CAPABILITIES" | "CLAUDE_CODE_REMOTE" | "CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT" | "CLAUDE_CODE_SUBAGENT_MODEL_FORCE" | "CLAUDE_CODE_THISTLE_GREBE">
export interface AgentTaskModeOwner287 {
  latched?: AgentTaskMode287
  promptModel?: string
  modelSteerFloor: ((model: string) => AgentTaskMode287 | undefined) | null
  latch(mode: AgentTaskMode287): void
}
export interface AgentPromptPorts287 {
  environment: AgentPromptEnvironment287
  forkEnabled(): boolean
  behavior(model: string, options?: {identity?: boolean}): string
  catalogEntry(model: string): {capabilities: readonly string[]} | undefined
  canonicalRoot(): CanonicalRoot287
  clientDataRecord(model?: string): OfficialClientDataRecord286 | null
  feature<T>(name: string, fallback: T): T
  provider(): string
  mainModel(): string
  memoOwner(): BehaviorMemoOwner287
  servedOwner(): BehaviorMemoOwner287
  execution(): {host: object; root: object}
  surface(): SurfaceIdentity287
  diskless(): boolean
  derivedSurface(): string | undefined
  memoize: typeof import('lodash-es').memoize
  debug: typeof import('../../../utils/debug.js').logForDebugging
  event: typeof import('../../../services/analytics/index.js').logEvent
  sessionId(): string
  subscription(): string | null
  taskModeOwner(): AgentTaskModeOwner287
  taskModeReaders: {clientData: (() => Record<string, unknown> | null) | null; feature: ((name: string, fallback: null) => unknown) | null}
  backgroundPolicy(): {backgroundTasksDisabled: boolean; backgroundLaunchRule?: {parameterDescription: string}}
  bareMode(): boolean
  currentAgentScope: Pick<AsyncLocalStorage<object>, 'getStore'>
  teamContext(): {dynamicTeamContext?: {agentId?: string; teamName?: string} | null}
  hasWorktreeCreateHook(): boolean
  canonicalWorktreeRoot(cwd: string): string | null
  cwd(): string
  searchToolsOptIn(): boolean
  platform(): 'windows' | 'macos' | 'linux' | 'wsl' | 'unknown'
  gitBashPath(): string | null
  hasAccessToken(): boolean
  projectConfig(): {hasUsedRemoteSession?: boolean}
  globalConfig(): {hasRemoteEnvironment?: boolean}
}
export interface AgentDescriptionArgs287 {
  model: string | undefined
  isCoordinator: boolean
  forkAvailable: boolean
  generalPurposeAvailable: boolean
  leanPrompt?: boolean
  delegationCostsFirst?: boolean
  delegationCostsFirstText?: string
}
export interface AgentPrompt287 {
  description(args: AgentDescriptionArgs287): Promise<string>
  agentToolSection(isLean: boolean): string | null
}
export function createAgentPrompt287(ports: AgentPromptPorts287): AgentPrompt287

export type OfficialAgentPromptPorts287 = Readonly<{
  Sn: string
  _Rt(model: string): string | null
}>
export function createOfficialAgentPrompt287(ports: OfficialAgentPromptPorts287): (
  existingSystemPrompt: readonly string[],
  resolvedModel: string,
) => Promise<string[]>
