import type { FollowPhase, SessionSummary } from './client.js'

export type ConnectionPresentation = { label: string; note: string; tone: 'live' | 'idle' | 'error' }

/** Capability and follow transport are independent: polling does not grant control. */
export function connectionPresentation(session: SessionSummary | undefined, phase: FollowPhase | null,
  error: string, hasSelection = Boolean(session)): ConnectionPresentation {
  if (!session) return {label:hasSelection ? error ? '连接失败' : '读取会话' : '未选择会话', note:'', tone:error ? 'error' : 'idle'}
  const canControl = session.executorState?.canControl === true
  const transcript = !canControl && (session.historySource === 'transcript' || session.executorState?.status === 'external-unknown' || session.executorState?.status === 'external-live')
  const note = canControl ? '' : session.executorState?.status === 'external-live' ? '外部执行器正在运行；当前仅查看记录，尚未接入它的共享控制。不会恢复或创建替代执行器。' : session.executorState?.status === 'closed' ? '执行器已结束；可查看记录，或手动恢复同一会话后修改设置。' : transcript
    ? '可查看记录；尚未连接到可交互的执行器。原进程是否仍在运行尚未确认。'
    : session.executorState?.status === 'starting' ? '执行器正在启动，当前暂不可发送。' : '此会话仅可查看历史记录。'
  if (phase === 'failed' || error && phase !== 'history-follow' && phase !== 'stopped' && phase !== 'live')
    return {label:transcript ? '历史更新失败' : '连接失败',note,tone:'error'}
  // Only an explicit follower stop is evidence of completion. A disk transcript
  // has closed:true for control purposes while its external writer is unknown.
  if (phase === 'stopped') return {label:session.executorState?.status === 'external-live' ? '历史跟随已结束' : '历史记录 · 已结束',note,tone:'idle'}
  if (!canControl && session.executorState?.status === 'closed') return {label:'历史记录 · 已结束',note,tone:'idle'}
  if (transcript) return {label:phase === 'loading' ? '读取历史' : '历史记录 · 自动更新',note,tone:'idle'}
  if (!canControl && (session.executorState?.status === 'closed' || session.closed))
    return {label:'历史记录 · 已结束',note,tone:'idle'}
  if (phase === 'loading') return {label:'读取历史',note,tone:'idle'}
  if (phase === 'reconnecting') return {label:'正在重连',note,tone:'idle'}
  if (phase === 'connecting' || !canControl) return {label:'正在连接',note,tone:'idle'}
  if (phase === 'live') return {label:'已连接 · 可发送',note,tone:'live'}
  return {label:'正在连接',note,tone:'idle'}
}
