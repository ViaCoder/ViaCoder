import type {SharedThinkingHost} from './sharedThinkingState.js'
import type {PublicTask} from './web/publicCommandAdapters.js'
import type {SharedEffortResult} from './sharedEffortState.js'
import type {PermissionRulesState} from '../cli/control/permissionRules.js'
import type {PermissionUpdate} from '../types/permissions.js'
import type {SharedConfigHost} from '../components/Settings/sharedConfig.js'
import type {ContextData} from '../utils/analyzeContext.js'
import type {AgentColorName} from '../tools/AgentTool/agentColorManager.js'

export type SharedRuleUpdate = Extract<PermissionUpdate, {type: 'addRules' | 'removeRules'}>
/** Connected facade services. No fallback to viewer settings/transcripts. */
export interface SharedSessionCommandHost extends SharedConfigHost, SharedThinkingHost {
  contextUsage?(signal?: AbortSignal): Promise<ContextData>
  listTasks(signal?: AbortSignal): Promise<PublicTask[]>
  stopTask(taskId: string, signal?: AbortSignal): Promise<void>
  subscribeTaskChanges(listener: () => void): () => void
  effort(value?: string, signal?: AbortSignal, expectedModel?: string): Promise<SharedEffortResult>
  setModel(model: string | undefined, signal?: AbortSignal): Promise<string>
  setColor(color: AgentColorName | 'default', signal?: AbortSignal): Promise<void>
  rename(title: string, signal?: AbortSignal): Promise<void>
  listPermissionRules(signal?: AbortSignal): Promise<PermissionRulesState>
  updatePermissionRules(update: SharedRuleUpdate, signal?: AbortSignal): Promise<PermissionRulesState>
  subscribePermissionRules(listener: (state: PermissionRulesState) => void): () => void
}
