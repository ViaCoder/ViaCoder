import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import type {AgentTaskRegistry287} from '../../tools/AgentTool/agentAdmissionNative287.js'
import type {RemoteAgentTaskState} from './RemoteAgentTask.js'

export type RemoteRestoreInput287 = {
  abortController: AbortController
  taskRegistry: Pick<AgentTaskRegistry287, 'register'>
  storageV5?: unknown
  credentials?: CredentialStore
}
export type RemoteRestoredState287 = Omit<RemoteAgentTaskState, 'log'>
export function createRemoteAgentRestoreNative287(ports: Readonly<Record<string, unknown>>):
  (input: Omit<RemoteRestoreInput287, 'taskRegistry'> & {
    taskRegistry: {register(task: RemoteRestoredState287): void}
  }) => Promise<void>
