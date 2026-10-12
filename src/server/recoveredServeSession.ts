import { existingServeJournalIds, ServeJournal } from './serveJournal.js'
import { ServeConflict, type ServeEvent, type ServeSnapshot } from './serveSession.js'
import type { PublicServeCapabilities } from './serveCapabilities.js'
import type { LocalSessionTitleState } from '../cli/control/renameObservation.js'
import type { SessionHostCapabilities, SessionHostIdentity, SessionHostOwner } from './sessionHost.js'

const PAGE_SIZE = 500

/** A dead CLI worker has no SDK reattach contract. Preserve its numbered
 * journal, explicitly terminate unresolved work, and expose history read-only. */
export class RecoveredServeSession {
  private readonly journal: ServeJournal
  readonly id: string
  readonly snapshot: ServeSnapshot

  private constructor(id: string, journal: ServeJournal, snapshot: ServeSnapshot) {
    this.id = id; this.journal = journal; this.snapshot = snapshot
  }

  static open(id: string): RecoveredServeSession | undefined {
    const journal = new ServeJournal(id)
    try {
      let cursor = 0
      let started: ServeEvent | undefined
      let exited = false
      let capabilities: PublicServeCapabilities | null = null
      let title: string | undefined
      let titleObservation: LocalSessionTitleState | undefined
      let cwd: string | undefined
      let continuedFrom: string | undefined
      const pendingApprovals = new Set<string>(), pendingElicitations = new Set<string>()
      const unfinishedTurns = new Set<string>()
      for (;;) {
        const page = journal.page(cursor, PAGE_SIZE)
        if (!page.length) break
        for (const event of page) {
          cursor = event.seq
          if (event.type === 'session_started') {
            started = event
            exited = false
            pendingApprovals.clear();pendingElicitations.clear();unfinishedTurns.clear()
            capabilities = null
            if (typeof event.cwd === 'string') cwd = event.cwd
            if (typeof event.continuedFrom === 'string') continuedFrom = event.continuedFrom
          }
          if (event.type === 'process_exit' || event.type === 'session_reset') exited = true
          if (event.type === 'title_state' && event.state && typeof event.state === 'object') {
            const state = event.state as LocalSessionTitleState
            if (state.session_id === id && Number.isSafeInteger(state.revision)) {
              titleObservation = state
              if (state.persistence === 'persisted' && typeof state.title === 'string') title = state.title
            }
          }
          if (event.type === 'sdk_ready' || event.type === 'capabilities_changed') {
            if (event.capabilities && typeof event.capabilities === 'object') capabilities = event.capabilities as PublicServeCapabilities
          }
          if (event.type === 'turn_queued' && typeof event.operationId === 'string') unfinishedTurns.add(event.operationId)
          if (event.type === 'turn_completed' && typeof event.operationId === 'string') unfinishedTurns.delete(event.operationId)
          if (event.type === 'permission_request' && typeof event.requestId === 'string') pendingApprovals.add(event.requestId)
          if ((event.type === 'permission_resolved' || event.type === 'permission_cancelled') && typeof event.requestId === 'string') pendingApprovals.delete(event.requestId)
          if (event.type === 'elicitation_request' && typeof event.requestId === 'string') pendingElicitations.add(event.requestId)
          if ((event.type === 'elicitation_resolved' || event.type === 'elicitation_cancelled') && typeof event.requestId === 'string') pendingElicitations.delete(event.requestId)
        }
      }
      // Older journals did not record a service owner. Do not infer death or
      // steal ownership of a possibly live session.
      if (!started || !Number.isSafeInteger(started.ownerPid)) { journal.close(); return undefined }
      const pid = Number(started.ownerPid)
      if (!exited && pid > 0 && isProcessAlive(pid)) { journal.close(); return undefined }
      if (!exited) {
        const append = (type: string, fields: Record<string, unknown>) => journal.append({ seq: ++cursor, at: Date.now(), type, ...fields })
        for (const requestId of pendingApprovals) append('permission_cancelled', { requestId, reason: 'service_restart_worker_unavailable' })
        for (const requestId of pendingElicitations) append('elicitation_cancelled', { requestId, reason: 'service_restart_worker_unavailable' })
        for (const operationId of unfinishedTurns) append('turn_interrupted', { operationId, reason: 'service_restart_worker_unavailable' })
        append('process_exit', { code: null, reason: 'service_restart_worker_unavailable', incompleteOperationIds: [...unfinishedTurns] })
      }
      const ownerId = typeof started.ownerId === 'string' && started.ownerId.length > 0
        ? started.ownerId
        : typeof started.executorGeneration === 'string' && started.executorGeneration.length > 0
          ? started.executorGeneration : `legacy:${id}`
      const epoch = Number.isSafeInteger(started.epoch) && Number(started.epoch) >= 0 ? Number(started.epoch) : 1
      const identity: SessionHostIdentity = { sessionId: id, ownerId, epoch }
      const owner: SessionHostOwner = { ownerId, kind: 'unknown', canControl: false }
      const hostCapabilities: SessionHostCapabilities = {
        read: true, write: false, delete: false, subscribe: true, control: false, storageV5: false,
      }
      return new RecoveredServeSession(id, journal, {
        sessionId: id, ...(cwd ? { cwd } : {}), ...(continuedFrom ? { continuedFrom } : {}),
        ...(title ? { title } : {}), ...(titleObservation ? { titleObservation } : {}), createdAt: started.at, lastSeq: cursor,
        activeOperationId: null, queuedOperationIds: [], pendingApprovalIds: [], pendingElicitationIds: [],
        viewerCount: 0, capabilities, closed: true,eventSource:'journal',
        executorState:{status:'closed',canControl:false},
        ...(typeof started.executorGeneration==='string'?{executorGeneration:started.executorGeneration}:{}),
        identity, owner, epoch, hostCapabilities,
      })
    } catch (error) { journal.close(); throw error }
  }

  replay(after = 0, limit = PAGE_SIZE): ServeEvent[] {
    if (!Number.isSafeInteger(after) || after < 0 || after > this.snapshot.lastSeq) throw new ServeConflict('Invalid event cursor')
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > PAGE_SIZE) throw new ServeConflict('Invalid page size')
    return this.journal.page(after, limit)
  }
  historyEvidence(page: ServeEvent[], through = this.snapshot.lastSeq, after = 0) {
    return this.journal.historyEvidence(page, through, after)
  }
  close(): void { this.journal.close() }
}

function isProcessAlive(pid: number): boolean {
  try { process.kill(pid, 0); return true }
  catch (error) { return (error as NodeJS.ErrnoException).code !== 'ESRCH' }
}

export function loadRecoveredServeSessions(): Map<string, RecoveredServeSession> {
  const sessions = new Map<string, RecoveredServeSession>()
  for (const id of existingServeJournalIds()) {
    try {
      const recovered = RecoveredServeSession.open(id)
      if (recovered) sessions.set(id, recovered)
    } catch { /* A damaged journal is not a recoverable session. */ }
  }
  return sessions
}
