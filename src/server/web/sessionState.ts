import type { ServeEvent } from '../serveSession.js'
import type { SessionSummary } from './client.js'

/**
 * Resolve the display label from the same authority order used by rename:
 * persisted snapshot first, then a confirmed worker name while its executor is
 * still live. requested_title is intent only and is never a display value.
 */
export function sessionDisplayTitle(session: SessionSummary | undefined): string | undefined {
  if (!session) return undefined
  if (session.title !== undefined && session.title !== '') return session.title
  const observation = session.titleObservation
  if (!session.closed && session.executorState?.canControl && observation?.status === 'settled') {
    if (observation.persistence === 'persisted' && observation.title) return observation.title
    if (observation.persistence === 'memory_only' && observation.name) return observation.name
  }
  if (!session.closed && session.executorState?.canControl &&
    (observation?.status === 'pending' || observation?.status === 'failed')) return session.confirmedMemoryTitle
  return undefined
}

export function sessionTitleSaveStatus(session: SessionSummary | undefined): string | undefined {
  const observation = session?.titleObservation
  if (!observation) return undefined
  if (observation.status === 'pending') return '标题保存中'
  if (observation.status === 'failed') return `标题保存失败：${observation.error ?? '原因未知'}`
  if (observation.status === 'settled' && observation.persistence === 'persisted') return '标题已保存'
  if (observation.status === 'settled' && observation.persistence === 'memory_only')
    return session && !session.closed && session.executorState?.canControl && !session.title && observation.name
      ? '临时名称 · 尚未保存' : '标题尚未保存'
  return undefined
}

/** Keep confirmed journal rows while a reconnect or an older list response is in flight. */
export function mergeJournalEvents(previous: ServeEvent[], batch: ServeEvent[]): ServeEvent[] {
  if (!batch.length) return previous
  const last = previous.at(-1)
  if (last && batch.every((event,index) => eventSpace(event)===eventSpace(last) && event.seq>last.seq &&
    (index===0 || event.seq>batch[index-1]!.seq))) return [...previous,...batch]
  const identity=(event:ServeEvent)=>event.recordId??`${eventSpace(event)}:${event.seq}`
  const known=new Set(previous.map(identity))
  const fresh=batch.filter(event=>{const key=identity(event);if(known.has(key))return false;known.add(key);return true})
  return fresh.length ? [...previous,...fresh].sort(compareEventPosition) : previous
}

export function mergeSessionSnapshots(previous: SessionSummary[], incoming: SessionSummary[]): SessionSummary[] {
  const existing = new Map(previous.map(session => [session.sessionId, session]))
  const merged = incoming.map(session => {
    const old = existing.get(session.sessionId)
    if (!old) return session
    // A worker can resume under the same session ID. `closed` is not monotonic:
    // a newer executor generation supersedes the previous process_exit.
    const stale = old.executorGeneration && session.executorGeneration
      ? old.executorGeneration !== session.executorGeneration &&
        (session.updatedAt ?? session.createdAt) < (old.updatedAt ?? old.createdAt)
      : Boolean(old.executorGeneration && !session.executorGeneration)
    // A delayed list must not roll back an observed title revision or a newer
    // sequence. Unknown capability state is not evidence that a worker closed.
    const ownerChanged = !stale && Boolean(old.executorGeneration && session.executorGeneration &&
      old.executorGeneration !== session.executorGeneration)
    const titleObservation = !ownerChanged && old.titleObservation && (stale ||
      (!session.titleObservation || old.titleObservation.revision > session.titleObservation.revision)
      ) ? old.titleObservation : session.titleObservation
    const latest = stale ? old : session.lastSeq < old.lastSeq &&
      session.executorGeneration === old.executorGeneration ? old : session
    const sameOwner = Boolean(old.executorGeneration && latest.executorGeneration &&
      old.executorGeneration === latest.executorGeneration)
    const liveOwner = sameOwner && !latest.closed && latest.executorState?.canControl
    const confirmedMemoryTitle = liveOwner && titleObservation?.status === 'settled' &&
      titleObservation.persistence === 'memory_only' && titleObservation.name
      ? titleObservation.name
      : liveOwner && (titleObservation?.status === 'pending' || titleObservation?.status === 'failed')
        ? old.confirmedMemoryTitle ?? (old.titleObservation?.status === 'settled' &&
          old.titleObservation.persistence === 'memory_only' ? old.titleObservation.name : undefined)
        : undefined
    return {
      ...old, ...latest,
      lastSeq: Math.max(old.lastSeq, session.lastSeq),
      closed: latest.closed,
      capabilities: latest.capabilities ?? old.capabilities,
      titleObservation,
      ...(titleObservation?.persistence === 'persisted' && titleObservation.title !== undefined
        ? { title: titleObservation.title } : {}),
      confirmedMemoryTitle,
    }
  })
  const seen = new Set(merged.map(session => session.sessionId))
  return [...merged, ...previous.filter(session => !seen.has(session.sessionId))]
}

/** Sequence values are meaningful only within their persisted source. */
function eventSpace(event:ServeEvent):string {return typeof event.recordId==='string'?event.recordId.replace(/:\d+$/,''):'legacy'}
export function compareEventPosition(a:ServeEvent,b:ServeEvent,aSeq=a.seq,bSeq=b.seq):number {
 const left=eventSpace(a),right=eventSpace(b)
 if(left===right)return aSeq-bSeq
 // Disk history precedes the independently numbered live-journal overlay.
 if(left.startsWith('transcript:')!==right.startsWith('transcript:'))return left.startsWith('transcript:')?-1:1
 return a.at-b.at || left.localeCompare(right) || aSeq-bSeq
}
