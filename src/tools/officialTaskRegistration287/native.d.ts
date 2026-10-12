import type * as z from 'zod/v4'
export interface GetTaskInput287 {taskId: string}
export interface TaskBase287 {taskId: string; statusMessage: string; createdAt: string; lastUpdatedAt: string}
export type TaskResult287 = TaskBase287 & (
  | {status: 'working'}
  | {status: 'completed'; result: {content: {type: 'text'; text: string}[]; isError: boolean}}
  | {status: 'failed'; error: {code: number; message: string}}
  | {status: 'cancelled'}
)
export interface OutputTail287 {content: string; omittedBytes: number}
export type ShellStatus287 = 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'killed'
export interface HostTask287 {
  id: string; type: string; status: ShellStatus287; agentId?: string; kind?: string
  startTime: number; endTime?: number; outputFile: string; isAdopted?: boolean
  result?: {code?: number; interrupted?: boolean}
}
export interface KnownTask287 {hostName: string; callId: string; agentId?: string}
export interface KnownTasks287 {
  started(taskId: string, record: KnownTask287): void
  find(taskId: string, agentId?: string): KnownTask287 | undefined
}
export type KnownTasksConstructor287 = new () => KnownTasks287
export interface ToolState287 {get<T>(actor: new () => T): T}
export interface TaskSnapshot287 {snapshot: TaskResult287; agentId?: string; fetched: boolean}
export interface TaskRegistry287 {get(taskId: string): HostTask287 | undefined}
export interface TaskSession287 {
  bashTaskSnapshots: Map<string, TaskSnapshot287>
  countBashTaskGet(taskId: string): number
  countBashTaskGetInResponse(responseId: string, taskId: string, statusKey: string): number
  markBashTaskSnapshotFetched(taskId: string): void
  withdrawShellNotification?: (taskId: string, agentId: string | undefined, registry: TaskRegistry287) => (() => void) | undefined
}
export interface AgentContext287 {agentType: string; isAsync?: boolean}
export interface ToolContext287 {
  agentId?: string; agentContext?: AgentContext287
  taskRegistry: TaskRegistry287; toolState: ToolState287
}
export interface GetTaskCall287 {
  signal: AbortSignal; innerCall?: boolean
  parentMessage?: {message: {id?: string}}
}
export type Validation287 = {result: true} | {result: false; message: string; errorCode: number}
export interface GetTaskInstance287 {
  validateInput(input: GetTaskInput287): Promise<Validation287>
  call(input: GetTaskInput287, call: GetTaskCall287): Promise<{data: TaskResult287}>
}
export interface GetTaskDefinition287 {
  name: 'GetTask'; searchHint: string; backgrounding: 'never'; maxResultSizeChars: number
  description(): Promise<string>; prompt(): Promise<string>
  readonly inputSchema: z.ZodType<GetTaskInput287>
  readonly outputSchema: z.ZodType<TaskResult287>
  userFacingName(): string; isEnabled(): boolean; isConcurrencySafe(): boolean; isReadOnly(): boolean
  toAutoClassifierInput(input: GetTaskInput287): string
  renderToolUseMessage(input: GetTaskInput287, options: {toolUseResult?: unknown; verbose?: boolean; isTranscriptMode?: boolean}): string | null
  extractSearchText(): string
  create(context: ToolContext287): GetTaskInstance287
  mapToolResultToToolResultBlockParam(result: unknown, toolUseId: string): {type: 'tool_result'; tool_use_id: string; content: string | undefined}
}
export interface TaskRegistrationPorts287 {
  registerTool(definition: GetTaskDefinition287): GetTaskDefinition287
  stringSchema: typeof z.string; objectSchema: typeof z.object; strictObjectSchema: typeof z.strictObject
  discriminatedUnionSchema: typeof z.discriminatedUnion; arraySchema: typeof z.array
  literalSchema: typeof z.literal; booleanSchema: typeof z.boolean; numberSchema: typeof z.number
  taskSession(): TaskSession287
  featureState(): {pinnedFeatureValues?: Map<string, unknown>}
  featureValue(name: string, fallback: boolean): unknown
  backgroundPolicy(): {backgroundTasksDisabled?: boolean}
  environment: {CLAUDE_CODE_DISABLE_BACKGROUND_TASKS?: boolean}
  process: {argv: string[]; env: {CLAUDE_CODE_SIMPLE?: string; BASH_DEFAULT_TIMEOUT_MS?: string; BASH_MAX_TIMEOUT_MS?: string}}
  executionContext(): {host: {launchOptions: {strictToolResultPairing(): boolean; singleShotPrintSession(): boolean}}}
  agentContext(): {agentId: string} | undefined
  persistedLookup(taskId: string, agentId: string | undefined, toolState: ToolState287, signal: AbortSignal): Promise<TaskResult287 | undefined>
  readOutputTail(taskId: string, maxBytes: number): Promise<OutputTail287>
  debug(message: string, options?: {level?: string}): void
  telemetry(event: string, metadata: Record<string, unknown>): void
}
export interface TaskRegistration287 {
  tool: GetTaskDefinition287; enabled(): boolean; taskSchema(): z.ZodType<TaskResult287>
  currentAgent(context: Pick<ToolContext287, 'agentId'>): string | undefined
  ownsTask(currentAgent: string | undefined, taskAgent: string | undefined): boolean
  knownTasks: KnownTasksConstructor287
  isBackgroundTasksDisabled(): boolean
}
export function createTaskRegistration287(ports: TaskRegistrationPorts287): TaskRegistration287
