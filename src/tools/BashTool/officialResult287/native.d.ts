import type {ToolResultBlockParam} from '@anthropic-ai/sdk/resources/index.mjs'
import type {SessionNative287} from '../../GetTaskTool/sessionNative.js'
export interface BashResultInput287 {
  interrupted: boolean
  stdout: string
  stderr: string
  isImage?: boolean
  backgroundTaskId?: string
  backgroundedByUser?: boolean
  backgroundedToDeliverMessage?: boolean
  backgroundedByTurnAbort?: boolean
  timedOutAfterMs?: number
  backgroundEndsWithFinalResponse?: boolean
  backgroundCwdHint?: string
  structuredContent?: Exclude<ToolResultBlockParam['content'], string | undefined>
  persistedOutputPath?: string
  persistedOutputSize?: number
  staleReadFileStateHint?: string
  ghRateLimitHint?: string
}
export interface BashResultPorts287 {
  taskEnabled(): boolean
  backgroundAnnouncement: SessionNative287['backgroundAnnouncement']
  backgroundText: SessionNative287['backgroundText']
  outputPath(id: string): string
  singleShotPrintSession(): boolean
}
export function createBashResult287(ports: BashResultPorts287): (input: BashResultInput287, toolUseId: string) => ToolResultBlockParam
