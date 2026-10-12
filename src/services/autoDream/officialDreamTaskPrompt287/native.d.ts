import type { DreamTaskState, DreamTurn } from '../../../tasks/DreamTask/DreamTask.js'
import type { TaskStateBase } from '../../../Task.js'

export type DreamTaskRegistry287 = {
  register(task: DreamTaskState): void
  update(id: string, updater: (task: DreamTaskState) => DreamTaskState): void
}
export type DreamTermination287 = {
  type: 'system'
  subtype: 'task_notification'
  task_id: string
  tool_use_id?: string
  status: 'completed' | 'failed' | 'stopped'
  reason?: string
  output_file: string
  summary: string
  usage?: {total_tokens: number; tool_uses: number; duration_ms: number}
  resource_links?: readonly unknown[]
  skip_transcript?: boolean
  ambient?: boolean
}
export type DreamTerminationOptions287 = {
  toolUseId?: string
  reason?: string
  outputFile?: string
  summary?: string
  usage?: DreamTermination287['usage']
  resourceLinks?: readonly unknown[]
  skipTranscript?: boolean
  ambient?: boolean
}
export declare function createDreamNotification287(ports: {
  rr(): {terminalEmitClaims: Set<string>}
  Wi(event: DreamTermination287): void
}): (id: string, status: DreamTermination287['status'], options?: DreamTerminationOptions287) => void
export declare function createDreamPrompt287(ports: {
  OPe: string; Wd: string; NH: number; p_: string; Nf: string; kc: string
}): (memory: string, transcripts: string, extra: string, team?: boolean, account?: boolean, shared?: boolean) => string
export declare function createDreamTasks287(ports: {
  Mw(type: 'dream'): string
  em(id: string, type: 'dream', description: string): TaskStateBase
  y(feature: string): void
  m(feature: string, error: string): void
  Ii(id: string, status: DreamTermination287['status'], options?: DreamTerminationOptions287): void
}): {
  isDreamTask(task: unknown): task is DreamTaskState
  register(registry: DreamTaskRegistry287, options: {
    sessionsReviewing: number; priorMtime: number; abortController: AbortController; storageV5?: unknown
  }): string
  addTurn(id: string, turn: DreamTurn, paths: string[], registry: DreamTaskRegistry287): void
  complete(id: string, registry: DreamTaskRegistry287): void
  fail(id: string, registry: DreamTaskRegistry287): void
}
