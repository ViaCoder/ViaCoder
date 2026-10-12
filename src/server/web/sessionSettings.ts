import type { Capabilities, SessionSummary } from './client.js'
import type { ServeEvent } from '../serveSession.js'

/** Only events newer than the snapshot may override its executor-confirmed state. */
export function currentExecutorCapabilities(session: SessionSummary | undefined, events: ServeEvent[]): Capabilities {
  if (session?.executorState?.canControl !== true) return {}
  const event = session.executorGeneration && [...events].reverse().find(item =>
    item.executorGeneration === session.executorGeneration && item.seq > session.lastSeq &&
    (item.type === 'sdk_ready' || item.type === 'capabilities_changed'))
  return (event && event.capabilities || session.capabilities || {}) as Capabilities
}

/** Request lifetime fence, not a cache: invalidates even on A → B → A or close → reopen. */
export function createRequestScope() {
  let keys: readonly unknown[] = [], revision = 0
  return {
    update(next: readonly unknown[]) {
      if (next.length !== keys.length || next.some((key, i) => !Object.is(key, keys[i]))) {
        keys = next; revision++
      }
      return revision
    },
    capture() { const owner = revision; return () => owner === revision },
  }
}

/** Closed history is resumable; external-unknown is not evidence of process exit. */
export function sessionSettingsAccess(session: SessionSummary | undefined) {
  const canControl = session?.executorState?.canControl === true
  const canResume = !canControl && session?.executorState?.status === 'closed'
  const canBranch = canResume || canControl && Boolean(
    (session?.capabilities as Capabilities | null)?.localWeb?.controls.includes('local_public_branch'))
  return {canControl, canResume, canBranch}
}

export function readonlySettingsReason(session: SessionSummary): string {
  switch (session.executorState?.status) {
    case 'closed': return '执行器已结束，恢复此会话后可修改设置。'
    case 'starting': return '执行器启动中，设置暂不可修改。'
    case 'external-live': return '外部执行器正在运行，当前仅查看记录，尚未接入共享控制。'
    case 'external-unknown': return '当前仅查看记录，尚未确认外部执行器状态。'
    default: return '当前仅查看记录，连接可交互执行器后可修改设置。'
  }
}
