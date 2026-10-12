import {projectSharedEffortResult,sharedEffortStateSchema} from './sharedEffortState.js'
import {computerUseWebAnswer287} from '../utils/computerUse/webApproval287.js'
import {startupKey, type ServeStartupOptions} from './serveStartupOptions.js'
import { randomUUID } from 'node:crypto'
import { prepareWebAttachments } from './serveAttachments.js'
import { ServeJournal } from './serveJournal.js'
import { loadRecoveredServeSessions, RecoveredServeSession } from './recoveredServeSession.js'
import { emitSessionTurnEvent } from './sessionTurnEvents.js'
import { projectChangedCommands, projectPublicCapabilities, projectPublicSystemInit,
  type PublicServeCapabilities } from './serveCapabilities.js'
import type { RemoteMessageContent } from '../utils/teleport/api.js'
import { SDKControlElicitationResponseSchema } from '../entrypoints/sdk/controlSchemas.js'
import { permissionUpdateSchema } from '../utils/permissions/PermissionUpdateSchema.js'
import { outputSchema as permissionPromptOutputSchema } from '../utils/permissions/PermissionPromptToolResultSchema.js'
import type { PermissionUpdate } from '../types/permissions.js'
import { cleanTitle } from '../utils/sessionRename/names.js'
import { projectPermissionRulesResponse } from './servePermissionRules.js'
import type { PermissionRulesState } from '../cli/control/permissionRules.js'
import type { LocalSessionTitleState } from '../cli/control/renameObservation.js'
import { projectLocalTitleResponse } from './serveTitleState.js'
import { projectPublicCommandResult, toSdkPublicCommandControl, validatePublicCommandControl,
  type PublicCommandControl } from './servePublicCommands.js'
import type {
  SessionHostCapabilities,
  SessionHostIdentity,
  SessionHostOwner,
} from './sessionHost.js'

/** One existing CLI stream-json worker is the sole model/session writer. */
export interface ServeTransport {
  start(onFrame: (frame: unknown) => void, onExit: (code: number | null) => void): void
  write(frame: Record<string, unknown>): Promise<void>
  close(): Promise<void>
}

export type ServeEvent = { seq: number; at: number; type: string; [key: string]: unknown }
export type ServeSnapshot = {
  sessionId: string
  launchKey?: string
  historySource?: 'transcript'
  eventSource?: 'transcript' | 'journal'
  historyState?: import('./serveTranscriptHistory.js').TranscriptHistoryState
  executorGeneration?: string
  /** Public client fence for background/cross-host attachment. */
  identity?: SessionHostIdentity
  owner?: SessionHostOwner
  epoch?: number
  hostCapabilities?: SessionHostCapabilities
  executorState?: {status:'starting'|'ready'|'closed'|'external-live'|'external-unknown';canControl:boolean}
  updatedAt?: number
  cwd?: string
  continuedFrom?: string
  title?: string
  titleObservation?: LocalSessionTitleState
  createdAt: number
  lastSeq: number
  activeOperationId: string | null
  queuedOperationIds: string[]
  pendingApprovalIds: string[]
  pendingElicitationIds: string[]
  viewerCount: number
  capabilities: PublicServeCapabilities | null
  closed: boolean
}
export class ServeConflict extends Error {}
export class ServeGone extends Error {}

const MAX_QUEUE = 64
const PAGE_SIZE = 500

type Turn = { dispatched?: boolean; messageUuid: string; queuedSeq: number; operationId: string; content: RemoteMessageContent; source: 'web' | 'terminal'; intent: 'literal' | 'command';
  interruption?: { controlOperationId?: string; markerRecordId?: string; resultError?: boolean; emitted?: boolean } }
type Operation = { fingerprint: string; result: unknown }
type Approval = { requestId: string; toolName: string; input: Record<string, unknown>; consumed: boolean; dialogKind?: 'computer_use_approval' }
type Elicitation = { requestId: string; request: Record<string, unknown>; consumed: boolean }
export type ServeControl = PublicCommandControl
  | { subtype: 'interrupt' }
  | { subtype: 'get_plan' }
  | { subtype: 'list_permission_rules' }
  | { subtype: 'set_model'; model?: string }
  | { subtype: 'set_permission_mode'; mode: 'default' | 'plan' | 'acceptEdits' | 'dontAsk' | 'bypassPermissions' | 'auto' }
  | { subtype: 'rename_session'; title: string }
  | { subtype: 'local_update_permission_rules'; update: Extract<PermissionUpdate, { type: 'addRules' | 'removeRules' }> }
  | { subtype: 'local_get_session_title'; session_id?: string }
type PendingControl = { operationId: string; request: ServeControl; interruptTarget?: Turn | null;
  resolve: (result: ControlResult) => void; reject: (error: Error) => void }
type ControlResult = { operationId: string; accepted: true; response?: { exists: false } | { exists: true; content: string } | { state: PermissionRulesState | LocalSessionTitleState } | Record<string, unknown> }

function frameObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
}
function validContent(value: unknown): value is RemoteMessageContent {
  if (typeof value === 'string') return !!value.trim()
  if (!Array.isArray(value) || !value.length) return false
  return value.every(block => {
    const part = frameObject(block)
    if (part?.type === 'text') return typeof part.text === 'string' &&
      Object.keys(part).every(key => key === 'type' || key === 'text')
    if (part?.type !== 'image' && part?.type !== 'document' && part?.type !== 'local_file') return false
    const source = frameObject(part.source)
    return Object.keys(part).every(key => key === 'type' || key === 'source' ||
      (part.type === 'document' || part.type === 'local_file') && key === 'title' && typeof part.title === 'string') &&
      source?.type === 'base64' && typeof source.data === 'string' &&
      Object.keys(source).every(key => key === 'type' || key === 'data' || key === 'media_type') &&
      (part.type === 'local_file' ? typeof part.title === 'string' && part.title.length > 0 && typeof source.media_type === 'string' :
        part.type === 'document' ? source.media_type === 'application/pdf' :
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(String(source.media_type)))
  })
}

export class ServeSession {
  private journal: ServeJournal
  private readonly listeners = new Set<(event: ServeEvent) => void>()
  private readonly operations = new Map<string, Operation>()
  private readonly queue: Turn[] = []
  private readonly approvals = new Map<string, Approval>()
  private readonly elicitations = new Map<string, Elicitation>()
  private readonly controls = new Map<string, PendingControl>()
  private transportEnded = false
  private stopPromise:Promise<void>|undefined
  private readonly stopCleanups=new Set<()=>Promise<void>>()
  private seq = 0
  readonly executorGeneration = randomUUID()
  private epoch = 1
  private readonly initializeRequestId = randomUUID()
  createdAt = Date.now()
  private systemInit: ReturnType<typeof projectPublicSystemInit> | undefined
  private capabilities: PublicServeCapabilities | null = null
  private title: string | undefined
  private titleObservation: LocalSessionTitleState | undefined
  private titleRefreshTimer: ReturnType<typeof setTimeout> | undefined
  private titleFollowUpAvailable = false
  private ready = false
  private active: Turn | null = null
  private closed = false
  private disposed = false
  private pumping = false
  private writeTail: Promise<void> = Promise.resolve()
  private pendingReset: string | undefined
  private resetting = false
  private readonly resetFrames: unknown[] = []

  constructor(public id: string, readonly cwd: string, private readonly transport: ServeTransport, public continuedFrom?: string, readonly launchKey = startupKey(), initialSeq = 0,
    private readonly rotateSession?: (session: ServeSession, nextId: string) => Promise<void>) {
    this.seq = initialSeq
    this.journal = new ServeJournal(id)
    try { transport.start(frame => this.receive(frame), code => {this.exit(code);void this.stopped()}) }
    catch (error) { this.journal.close(); throw error }
    this.emit('session_started', { sessionId: id, ownerPid: process.pid, cwd, launchKey,
      ownerId: this.executorGeneration, epoch: this.epoch,
      ...(continuedFrom ? { continuedFrom } : {}) })
    void this.write({ type: 'control_request', request_id: this.initializeRequestId,
      request: { subtype: 'initialize' } }).catch(error => this.fail(error))
  }

  get snapshot(): ServeSnapshot {
    return {
      sessionId: this.id, launchKey:this.launchKey, eventSource:'journal',executorGeneration:this.executorGeneration,
      identity: { sessionId: this.id, ownerId: this.executorGeneration, epoch: this.epoch },
      owner: { ownerId: this.executorGeneration, kind: 'local', canControl: this.ready && !this.closed },
      epoch: this.epoch,
      hostCapabilities: { read: true, write: !this.closed, delete: false,
        subscribe: true, control: this.ready && !this.closed, storageV5: false },
      executorState:{status:this.closed?'closed':this.ready?'ready':'starting',canControl:this.ready&&!this.closed},
      cwd: this.cwd,
      ...(this.continuedFrom ? { continuedFrom: this.continuedFrom } : {}),
      ...(this.title ? { title: this.title } : {}),
      ...(this.titleObservation ? { titleObservation: this.titleObservation } : {}),
      createdAt: this.createdAt,
      lastSeq: this.seq,
      activeOperationId: this.active?.operationId ?? null,
      queuedOperationIds: this.queue.map(turn => turn.operationId),
      pendingApprovalIds: [...this.approvals.values()].filter(a => !a.consumed).map(a => a.requestId),
      pendingElicitationIds: [...this.elicitations.values()].filter(a => !a.consumed).map(a => a.requestId),
      viewerCount: this.listeners.size,
      capabilities: this.capabilities,
      closed: this.closed,
    }
  }

  /** Bounded real journal rows for admitted inputs not yet completed. */
  pendingInputEvents(): ServeEvent[] {
    return [...(this.active ? [this.active] : []), ...this.queue].flatMap(turn => this.journal.page(turn.queuedSeq - 1, 1))
  }

  replay(after = 0, limit = PAGE_SIZE): ServeEvent[] {
    if (!Number.isSafeInteger(after) || after < 0 || after > this.seq) throw new ServeConflict('Invalid event cursor')
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > PAGE_SIZE) throw new ServeConflict('Invalid page size')
    return this.journal.page(after, limit)
  }

  historyEvidence(page: ServeEvent[], through = this.seq, after = 0, liveTail: ServeEvent[] = []) {
    return this.journal.historyEvidence(page, through, after, PAGE_SIZE, liveTail)
  }

  /** Replay and listener registration are synchronous, so no event is lost between them. */
  subscribe(after: number, listener: (event: ServeEvent) => void): () => void {
    const target = this.seq
    this.listeners.add(listener)
    try {
      let cursor = after
      while (cursor < target) {
        const page = this.replay(cursor)
        if (!page.length) break
        for (const event of page) {
          if (event.seq > target) break
          listener(event)
        }
        cursor = page.at(-1)!.seq
      }
    } catch (error) { this.listeners.delete(listener); throw error }
    return () => this.listeners.delete(listener)
  }

  enqueueTurn(source: 'web' | 'terminal', operationId: string, content: RemoteMessageContent, intent: 'literal' | 'command' = 'command'): { operationId: string; queued: true } {
    if (!operationId || operationId.length > 128 || !/^[\w.-]+$/.test(operationId)) throw new ServeConflict('Invalid operation ID')
    if (!validContent(content)) throw new ServeConflict('Invalid turn content')
    if (intent !== 'literal' && intent !== 'command') throw new ServeConflict('Invalid turn intent')
    if (source !== 'web' && intent === 'literal') throw new ServeConflict('Literal intent is only available for Web turns')
    // Preserve historical command-turn idempotency keys across upgrades.
    const fingerprint = JSON.stringify(intent === 'literal' ? ['turn', content, 'literal'] : ['turn', content])
    const previous = this.operations.get(operationId) ?? this.journal.getOperation(operationId)
    if (previous) {
      if (previous.fingerprint !== fingerprint) throw new ServeConflict('Operation ID reused with different content')
      return previous.result as { operationId: string; queued: true }
    }
    if (this.closed) throw new ServeGone('Session closed')
    if (this.resetting) throw new ServeConflict('Session identity is changing; reconnect before submitting')
    if (this.queue.length >= MAX_QUEUE) throw new ServeConflict('Session queue capacity reached')
    const result = { operationId, queued: true as const }
    this.journal.putOperation(operationId, fingerprint, result)
    const messageUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(operationId) ? operationId : randomUUID()
    this.queue.push({ source, operationId, content, intent, messageUuid, queuedSeq: this.seq + 1 })
    this.emit('turn_queued', { operationId, messageUuid, source, content, intent, queueDepth: this.queue.length })
    emitSessionTurnEvent({ type: 'user-input', sessionId: this.id })
    void this.pump()
    return result
  }

  async answerApproval(operationId: string, requestId: string, allowed: boolean, updatedInput?: Record<string, unknown>, denyMessage?: string,
    updatedPermissions?: PermissionUpdate[], interrupt?: boolean): Promise<{ operationId: string; accepted: true }> {
    if (!operationId || operationId.length > 128 || !/^[\w.-]+$/.test(operationId)) throw new ServeConflict('Invalid operation ID')
    if (!requestId || typeof allowed !== 'boolean' || (updatedInput !== undefined && !frameObject(updatedInput)) ||
      (denyMessage !== undefined && typeof denyMessage !== 'string') ||
      (interrupt !== undefined && typeof interrupt !== 'boolean') ||
      (allowed && (denyMessage !== undefined || interrupt !== undefined))) throw new ServeConflict('Invalid approval response')
    if (updatedPermissions !== undefined && (!allowed || !Array.isArray(updatedPermissions) ||
      !updatedPermissions.every(update => permissionUpdateSchema().safeParse(update).success))) throw new ServeConflict('Invalid permission updates')
    const approval = this.approvals.get(requestId)
    if (!approval) throw new ServeConflict('Approval is not pending')
    if (approval.dialogKind && this.closed) throw new ServeGone('Session closed')
    const decision = allowed
      ? { behavior: 'allow' as const, updatedInput: updatedInput ?? approval.input,
          ...(updatedPermissions?.length ? { updatedPermissions } : {}) }
      : { behavior: 'deny' as const, message: denyMessage ?? 'Denied by user',
          ...(interrupt === true ? { interrupt: true } : {}) }
    if (approval.dialogKind && (updatedPermissions !== undefined || denyMessage !== undefined || interrupt !== undefined))
      throw new ServeConflict('Computer use dialog does not accept tool permission updates')
    const parsed = approval.dialogKind
      ? {success:true as const, data:computerUseWebAnswer287(approval.input,allowed,updatedInput)}
      : permissionPromptOutputSchema().safeParse(decision)
    if (!parsed.success) throw new ServeConflict('Invalid SDK permission decision')
    const fingerprint = JSON.stringify(['approval', requestId, parsed.data])
    const previous = this.operations.get(operationId) ?? this.journal.getOperation(operationId)
    if (previous) {
      if (previous.fingerprint !== fingerprint) throw new ServeConflict('Operation ID reused with different response')
      return previous.result as Promise<{ operationId: string; accepted: true }>
    }
    if (this.closed) throw new ServeGone('Session closed')
    if (approval.consumed) throw new ServeConflict('Approval is not pending')
    if (allowed && approval.toolName === 'AskUserQuestion') {
      const { validateAskUserAnswer } = await import('./serveAskUser.js')
      await validateAskUserAnswer(approval.input, updatedInput)
      // Dynamic schema loading yields: a competing viewer or the worker may
      // have answered/cancelled meanwhile. Recheck before the atomic claim.
      const afterValidation = this.operations.get(operationId) ?? this.journal.getOperation(operationId)
      if (afterValidation) {
        if (afterValidation.fingerprint !== fingerprint) throw new ServeConflict('Operation ID reused with different response')
        return afterValidation.result as Promise<{ operationId: string; accepted: true }>
      }
      if (this.closed) throw new ServeGone('Session closed')
      if (this.approvals.get(requestId) !== approval || approval.consumed) throw new ServeConflict('Approval is not pending')
    }
    // This synchronous transition is the first-valid-answer gate. Concurrent HTTP
    // handlers cannot send a second control_response, including while write awaits.
    approval.consumed = true
    const result = this.write({
      type: 'control_response',
      response: { subtype: 'success', request_id: requestId,
        response: parsed.data },
    }).then(() => {
      const accepted = { operationId, accepted: true as const }
      this.journal.putOperation(operationId, fingerprint, accepted)
      this.operations.delete(operationId)
      this.emit('permission_resolved', { requestId, operationId, allowed })
      return accepted
    }).catch(error => {
      this.fail(error)
      throw error
    })
    this.operations.set(operationId, { fingerprint, result })
    return result
  }

  async answerElicitation(operationId: string, requestId: string, resultValue: unknown): Promise<{ operationId: string; accepted: true }> {
    if (!operationId || operationId.length > 128 || !/^[\w.-]+$/.test(operationId) || !requestId) throw new ServeConflict('Invalid elicitation response')
    const parsed = SDKControlElicitationResponseSchema().safeParse(resultValue)
    if (!parsed.success) throw new ServeConflict('Invalid SDK elicitation response')
    const result = parsed.data
    const fingerprint = JSON.stringify(['elicitation', requestId, result])
    const previous = this.operations.get(operationId) ?? this.journal.getOperation(operationId)
    if (previous) {
      if (previous.fingerprint !== fingerprint) throw new ServeConflict('Operation ID reused with different response')
      return previous.result as Promise<{ operationId: string; accepted: true }>
    }
    if (this.closed) throw new ServeGone('Session closed')
    const pending = this.elicitations.get(requestId)
    if (!pending || pending.consumed) throw new ServeConflict('Elicitation is not pending')
    if (result.action === 'accept') {
      const { validateElicitationContent } = await import('./serveElicitation.js')
      validateElicitationContent(pending.request, result)
      const afterValidation = this.operations.get(operationId) ?? this.journal.getOperation(operationId)
      if (afterValidation) {
        if (afterValidation.fingerprint !== fingerprint) throw new ServeConflict('Operation ID reused with different response')
        return afterValidation.result as Promise<{ operationId: string; accepted: true }>
      }
      if (this.closed) throw new ServeGone('Session closed')
      if (this.elicitations.get(requestId) !== pending || pending.consumed) throw new ServeConflict('Elicitation is not pending')
    }
    pending.consumed = true // first valid response claims the SDK request ID
    const committed = this.write({ type: 'control_response', response: {
      subtype: 'success', request_id: requestId, response: result,
    } }).then(() => {
      const accepted = { operationId, accepted: true as const }
      this.journal.putOperation(operationId, fingerprint, accepted)
      this.operations.delete(operationId)
      this.emit('elicitation_resolved', { requestId, operationId, action: result.action })
      return accepted
    }).catch(error => { this.fail(error); throw error })
    this.operations.set(operationId, { fingerprint, result: committed })
    return committed
  }

  /** Forward only controls the existing SDK worker implements. A matching
   * control_response is the acknowledgement; a successful stdin write is not. */
  requestControl(operationId: string, request: ServeControl): Promise<ControlResult> {
    if (!operationId || operationId.length > 128 || !/^[\w.-]+$/.test(operationId)) throw new ServeConflict('Invalid operation ID')
    const publicControl = validatePublicCommandControl(request)
    if (!request || (!publicControl && !['interrupt', 'get_plan', 'list_permission_rules', 'set_model', 'set_permission_mode', 'rename_session', 'local_update_permission_rules', 'local_get_session_title'].includes(request.subtype))) throw new ServeConflict('Unsupported control')
    if (publicControl?.subtype.startsWith('local_public_') &&
      !this.capabilities?.localWeb?.controls.some(control => control === publicControl.subtype)) throw new ServeConflict('Worker did not advertise this local command')
    if (request.subtype === 'set_model' && (request.model !== undefined && (!request.model || request.model.length > 256))) throw new ServeConflict('Invalid model')
    if (request.subtype === 'set_permission_mode' && !['default', 'plan', 'acceptEdits', 'dontAsk', 'bypassPermissions', 'auto'].includes(request.mode)) throw new ServeConflict('Unsupported permission mode')
    if (request.subtype === 'set_permission_mode' && request.mode === 'auto' && this.capabilities?.permissionModes?.auto !== true) throw new ServeConflict('Worker does not expose auto permission mode')
    if (request.subtype === 'rename_session' && (typeof request.title !== 'string' || !cleanTitle(request.title))) throw new ServeConflict('Invalid session title')
    if (request.subtype === 'local_update_permission_rules') {
      if (!this.capabilities?.localWeb?.controls.includes(request.subtype)) throw new ServeConflict('Worker does not advertise permission rule editing')
      const update = permissionUpdateSchema().safeParse(request.update)
      if (!update.success || (update.data.type !== 'addRules' && update.data.type !== 'removeRules') || !update.data.rules.length) throw new ServeConflict('Invalid permission rule update')
    }
    if (request.subtype === 'local_get_session_title') {
      if (!this.capabilities?.localWeb?.controls.includes(request.subtype)) throw new ServeConflict('Worker does not advertise title observation')
      if (request.session_id !== undefined && request.session_id !== this.id) throw new ServeConflict('Title query session mismatch')
    }
    const fingerprint = JSON.stringify(['control', request])
    const previous = this.operations.get(operationId) ?? this.journal.getOperation(operationId)
    if (previous) {
      if (previous.fingerprint !== fingerprint) throw new ServeConflict('Operation ID reused with different control')
      return Promise.resolve(previous.result as ControlResult)
    }
    if (this.closed) throw new ServeGone('Session closed')
    if (!this.ready) throw new ServeConflict('Session is not ready')
    if (this.resetting) throw new ServeConflict('Session identity is changing; reconnect before controlling')
    // Capture the target now, never reinterpret a late ACK against this.active.
    const interruptTarget = request.subtype === 'interrupt' ? this.active : undefined
    const targetFields = interruptTarget !== undefined ? { targetOperationId: interruptTarget?.operationId ?? null } : {}
    // A file turn can be cancelled while uploads are being written. It has
    // not reached the worker, so there will be no SDK result to release it.
    // Complete this local admission only; never interrupt a successor.
    if (interruptTarget && !interruptTarget.dispatched) {
      interruptTarget.interruption = { controlOperationId: operationId, emitted: true }
      this.active = null
      const accepted = { operationId, accepted: true as const }
      this.journal.putOperation(operationId, fingerprint, accepted)
      this.emit('control_requested', { operationId, subtype: 'interrupt', ...targetFields })
      this.emit('control_completed', { operationId, subtype: 'interrupt', accepted: true, ...targetFields })
      this.emit('turn_interrupted', { operationId: interruptTarget.operationId, controlOperationId: operationId,
        reason: 'cancelled_before_dispatch' })
      this.emit('turn_completed', { operationId: interruptTarget.operationId, isError: true })
      void this.pump()
      return Promise.resolve(accepted)
    }
    const requestId = randomUUID()
    const result = new Promise<ControlResult>((resolve, reject) => {
      this.controls.set(requestId, { operationId, request, interruptTarget, resolve, reject })
    })
    this.operations.set(operationId, { fingerprint, result })
    this.emit('control_requested', { operationId, subtype: request.subtype, ...targetFields })
    void this.write({ type: 'control_request', request_id: requestId,
      request: request.subtype === 'rename_session' ? { ...request, source: 'host' } :
        publicControl ? toSdkPublicCommandControl(publicControl) : request }, () => {
      if (interruptTarget === undefined) return true
      // A queued write must not interrupt a newly admitted successor (or a
      // turn started after an idle interrupt). Do not send a stale control.
      if (this.active !== interruptTarget) {
        const pending = this.controls.get(requestId)
        this.controls.delete(requestId)
        this.operations.delete(operationId)
        this.emit('control_completed', { operationId, subtype: 'interrupt', accepted: false,
          ...targetFields, reason: 'interrupt_target_ended_before_dispatch' })
        pending?.reject(new ServeConflict('Interrupt target ended before dispatch'))
        return false
      }
      if (interruptTarget) interruptTarget.interruption ??= {}
      return true
    }).catch(error => this.fail(error))
    return result
  }

  private emit(type: string, fields: Record<string, unknown> = {}): void {
    const event: ServeEvent = { seq: ++this.seq, at: Date.now(), type, executorGeneration:this.executorGeneration,
      sessionId: this.id, ownerId: this.executorGeneration, epoch: this.epoch,
      recordId:`journal:${this.id}:${this.seq}`, ...fields }
    this.journal.append(event)
    // A disconnected viewer must not tear down the sole SDK worker.
    for (const listener of this.listeners) {
      try { listener(event) } catch { this.listeners.delete(listener) }
    }
  }

  private write(frame: Record<string, unknown>, beforeWrite?: () => boolean): Promise<void> {
    const next = this.writeTail.then(() => beforeWrite?.() === false ? undefined : this.transport.write(frame))
    this.writeTail = next.catch(() => {})
    return next
  }

  private async pump(): Promise<void> {
    if (this.pumping || this.closed || this.active || !this.ready || this.resetting) return
    this.pumping = true
    try {
      const turn = this.queue.shift()
      if (!turn) return
      this.active = turn
      this.emit('turn_started', { operationId: turn.operationId, source: turn.source })
      const content = turn.source === 'web' || Array.isArray(turn.content) && turn.content.some(block=>block.type==='local_file')
        ? await prepareWebAttachments(this.id, turn.operationId, turn.content, this.cwd)
        : turn.content
      await this.write({ type: 'user', uuid: turn.messageUuid, session_id: '', parent_tool_use_id: null,
        message: { role: 'user', content },
        ...(turn.intent === 'literal' ? { local_web_literal: true } : {}) },
        () => {
          if (this.active !== turn || this.closed || turn.interruption) return false
          turn.dispatched = true
          return true
        })
      if (turn.dispatched) emitSessionTurnEvent({ type: 'input-committed', sessionId: this.id })
    } catch (error) {
      this.fail(error)
    } finally {
      this.pumping = false
      if (!this.closed && !this.active && this.queue.length > 0) void this.pump()
    }
  }

  private receive(value: unknown): void {
    if (this.closed) return
    if (this.resetting) { this.resetFrames.push(value); return }
    const frame = frameObject(value)
    if (!frame || typeof frame.type !== 'string') return
    if (frame.type === 'conversation_reset' && !frame.parent_tool_use_id && frame.session_id !== this.id) {
      // Official SDK distinguishes the UI conversation identity from the
      // persistent storage/session identity. Routes and leases use session_id.
      if (typeof frame.session_id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(frame.session_id)) {
        this.fail(new Error('Invalid canonical conversation reset identity')); return
      }
      this.pendingReset = frame.session_id
    }
    if (frame.type === 'control_response') {
      const response = frameObject(frame.response)
      if (response?.request_id === this.initializeRequestId) {
        if (response.subtype !== 'success') { this.fail(new Error('CLI initialize rejected')); return }
        this.capabilities = projectPublicCapabilities(response.response, this.systemInit)
        this.ready = true
        this.emit('sdk_ready', { capabilities: this.capabilities })
        if (this.capabilities?.localWeb?.controls.includes('local_get_session_title')) this.refreshTitle()
        void this.pump()
      }
      if (typeof response?.request_id === 'string') {
        const pending = this.controls.get(response.request_id)
        if (pending) {
          this.controls.delete(response.request_id)
          const targetFields = pending.interruptTarget !== undefined
            ? { targetOperationId: pending.interruptTarget?.operationId ?? null } : {}
          if (response.subtype === 'success') {
            const plan = pending.request.subtype === 'get_plan' ? frameObject(response.response) : null
            if (pending.request.subtype === 'get_plan' && !(plan?.exists === false ||
              (plan?.exists === true && typeof plan.content === 'string'))) {
              this.operations.delete(pending.operationId)
              pending.reject(new ServeConflict('Invalid SDK plan response'))
              return
            }
            const permissionRules = pending.request.subtype === 'list_permission_rules' || pending.request.subtype === 'local_update_permission_rules'
              ? projectPermissionRulesResponse(response.response) : null
            if ((pending.request.subtype === 'list_permission_rules' || pending.request.subtype === 'local_update_permission_rules') && !permissionRules) {
              this.operations.delete(pending.operationId)
              pending.reject(new ServeConflict('Invalid SDK permission rules response'))
              return
            }
            const titleResponse = pending.request.subtype === 'local_get_session_title'
              ? projectLocalTitleResponse(response.response, this.id) : null
            if (pending.request.subtype === 'local_get_session_title' && !titleResponse) {
              this.operations.delete(pending.operationId)
              pending.reject(new ServeConflict('Invalid SDK title observation'))
              return
            }
            const publicRequest = validatePublicCommandControl(pending.request)
            const publicResponse = publicRequest ? projectPublicCommandResult(publicRequest, response.response) : null
            if (publicRequest && !publicResponse) {
              this.operations.delete(pending.operationId)
              pending.reject(new ServeConflict('Invalid SDK public control response'))
              return
            }
            if (pending.request.subtype === 'local_public_color' && publicResponse && typeof publicResponse.color === 'string') {
              if (this.capabilities) {
                this.capabilities = {...this.capabilities,
                  agentColor: publicResponse.color === 'default' ? null : publicResponse.color as import('../tools/AgentTool/agentColorManager.js').AgentColorName}
                this.emit('capabilities_changed', {capabilities:this.capabilities})
              }
              this.emit('agent_color_changed', {color: publicResponse.color})
            }
            const modeResponse = pending.request.subtype === 'set_permission_mode' ? frameObject(response.response) : null
            const confirmedMode = pending.request.subtype === 'set_permission_mode'
              ? (typeof modeResponse?.mode === 'string' ? modeResponse.mode :
                pending.request.mode === 'auto' ? undefined : pending.request.mode) : undefined
            if (pending.request.subtype === 'set_permission_mode' && (!confirmedMode ||
              (pending.request.mode === 'auto' && confirmedMode !== 'auto') ||
              !['default','plan','acceptEdits','dontAsk','bypassPermissions','auto'].includes(confirmedMode))) {
              this.operations.delete(pending.operationId)
              pending.reject(new ServeConflict('Invalid SDK permission mode response'))
              return
            }
            const modelAck = pending.request.subtype === 'set_model' ? frameObject(frameObject(response.response)?.local_web) : null
            const confirmedModel = modelAck?.version === 1 && typeof modelAck.current_model === 'string' ? modelAck.current_model : undefined
            const result: ControlResult = { operationId: pending.operationId, accepted: true,
              ...(plan?.exists === false ? { response: { exists: false as const } } :
                plan?.exists === true ? { response: { exists: true as const, content: plan.content as string } } :
                  permissionRules ? { response: permissionRules } : titleResponse ? { response: titleResponse } :
                    publicResponse ? { response: publicResponse } : confirmedModel ? {response:{model:confirmedModel}} : confirmedMode ? {response:{mode:confirmedMode}} : {}) }
            const operation = this.operations.get(pending.operationId)
            if (operation) this.journal.putOperation(pending.operationId, operation.fingerprint, result)
            this.operations.delete(pending.operationId)
            if (pending.request.subtype === 'set_permission_mode' && this.capabilities) {
              this.capabilities = { ...this.capabilities, permissionMode: confirmedMode! }
              this.emit('capabilities_changed', { capabilities: this.capabilities })
            }
            const effortResult = pending.request.subtype === 'local_public_effort' ? projectSharedEffortResult(publicResponse) : null
            if (effortResult && this.capabilities) {
              this.capabilities={...this.capabilities,effortState:effortResult.state}
              this.emit('capabilities_changed',{capabilities:this.capabilities})
            }
            if (pending.request.subtype === 'set_model' && this.capabilities) {
              // Local host confirms the effective configured model, not a
              // fabricated model response or a network capability probe.
              const local=frameObject(frameObject(response.response)?.local_web)
              const effort=sharedEffortStateSchema.safeParse(local?.effort_state)
              const {modelPending:_pending,currentModelChoice:_choice,...rest}=this.capabilities
              this.capabilities=local?.version===1&&typeof local.current_model==='string'
                ? {...rest,currentModel:local.current_model,...(effort.success?{effortState:effort.data}:{}),...(typeof local.current_model_choice==='string'?{currentModelChoice:local.current_model_choice}:{})}
                : {...rest,modelPending:pending.request.model??'default'}
              this.emit('capabilities_changed', { capabilities: this.capabilities })
            }
            if (pending.request.subtype === 'rename_session') {
              this.emit('title_requested', { requestedTitle: cleanTitle(pending.request.title) })
              this.titleFollowUpAvailable = true
              this.refreshTitle()
            }
            if (pending.request.subtype === 'local_public_config' && 'update' in pending.request && pending.request.update) this.emit('settings_changed', {})
            if (pending.request.subtype === 'local_public_thinking' && (pending.request.update || pending.request.restore)) this.emit('settings_changed', {})
            if (permissionRules && pending.request.subtype === 'local_update_permission_rules') this.emit('permission_rules_changed', permissionRules)
            if (titleResponse) this.applyTitleObservation(titleResponse.state)
            this.emit('control_completed', { operationId: pending.operationId, subtype: pending.request.subtype, accepted: true, ...targetFields })
            if (pending.interruptTarget?.interruption) {
              pending.interruptTarget.interruption.controlOperationId ??= pending.operationId
              this.emitConfirmedInterruption(pending.interruptTarget)
            }
            pending.resolve(result)
          } else {
            this.operations.delete(pending.operationId)
            // The worker error can contain local paths or account context.
            // Keep raw control_response private, as with initialize.
            this.emit('control_completed', { operationId: pending.operationId, subtype: pending.request.subtype, accepted: false, ...targetFields })
            const publicModeErrors = [
              'Cannot set permission mode to auto',
              'Cannot set permission mode to auto: auto mode disabled by settings',
              'Cannot set permission mode to auto: auto mode is unavailable for your plan',
              'Cannot set permission mode to auto: auto mode unavailable for this model',
              'Cannot set permission mode to bypassPermissions because it is disabled by settings or configuration',
              'Cannot set permission mode to bypassPermissions because the session was not launched with --dangerously-skip-permissions',
            ]
            pending.reject(new ServeConflict(pending.request.subtype === 'set_permission_mode' &&
              typeof response.error === 'string' && publicModeErrors.includes(response.error)
              ? response.error : 'SDK control failed'))
          }
        }
      }
      // SDK control responses can carry account metadata; keep them off Web.
      return
    }
    if (frame.type === 'system' && frame.subtype === 'init') {
      // The raw SDK init contains apiKeySource and local paths. Publish only a
      // narrow capability projection, never the raw frame or account fields.
      this.systemInit = projectPublicSystemInit(frame)
      if (this.capabilities) {
        const { modelPending: _pending, ...withoutPending } = this.capabilities
        const rest = this.systemInit.currentModel ? withoutPending : this.capabilities
        this.capabilities = { ...rest,
          sdkCapabilities: this.systemInit.capabilities, tools: this.systemInit.tools,
          ...(this.systemInit.currentModel ? { currentModel: this.systemInit.currentModel,
            ...(this.systemInit.currentModel !== rest.currentModel ? {currentModelChoice: undefined} : {}) } : {}),
          ...(this.systemInit.permissionMode ? { permissionMode: this.systemInit.permissionMode } : {}) }
        this.emit('capabilities_changed', { capabilities: this.capabilities })
      }
      return
    }
    if (frame.type === 'system' && frame.subtype === 'status' && this.capabilities &&
      typeof frame.permissionMode === 'string' &&
      ['default', 'plan', 'acceptEdits', 'dontAsk', 'bypassPermissions', 'auto'].includes(frame.permissionMode)) {
      if (this.capabilities.permissionMode !== frame.permissionMode) {
        this.capabilities = { ...this.capabilities, permissionMode: frame.permissionMode }
        this.emit('capabilities_changed', { capabilities: this.capabilities })
      }
    }
    if (frame.type === 'assistant' && this.capabilities) {
      const message = frameObject(frame.message)
      if (typeof message?.model === 'string' && message.model && !message.model.startsWith('<') &&
        (this.capabilities.currentModel !== message.model || this.capabilities.modelPending)) {
        const { modelPending: _pending, ...rest } = this.capabilities
        this.capabilities = { ...rest, currentModel: message.model, currentModelChoice: undefined }
        this.emit('capabilities_changed', { capabilities: this.capabilities })
      }
    }
    if (frame.type === 'system' && frame.subtype === 'commands_changed') {
      const commands = projectChangedCommands(frame.commands)
      if (commands && this.capabilities) {
        this.capabilities = { ...this.capabilities, commands }
        this.emit('capabilities_changed', { capabilities: this.capabilities })
      }
      return
    }
    if (frame.type === 'control_request') {
      const request = frameObject(frame.request)
      if (request?.subtype === 'request_user_dialog' && request.dialog_kind === 'computer_use_approval' &&
        typeof frame.request_id === 'string' && frameObject(request.payload)) {
        if (!this.approvals.has(frame.request_id)) {
          const approval: Approval = { requestId:frame.request_id,toolName:'ComputerUseApproval',
            input:frameObject(request.payload)!,consumed:false,dialogKind:'computer_use_approval' }
          this.approvals.set(frame.request_id,approval)
          this.emit('permission_request',{requestId:approval.requestId,toolName:approval.toolName,input:approval.input,request})
        }
        return
      }
      if (request?.subtype === 'can_use_tool' && typeof frame.request_id === 'string') {
        if (!this.approvals.has(frame.request_id)) {
          const approval: Approval = { requestId: frame.request_id,
            toolName: typeof request.tool_name === 'string' ? request.tool_name : 'unknown',
            input: frameObject(request.input) ?? {}, consumed: false }
          this.approvals.set(frame.request_id, approval)
          // Preserve the SDK request for a complete approval record (tool use
          // id, description and suggestions), not just a UI summary.
          this.emit('permission_request', { requestId: approval.requestId, toolName: approval.toolName,
            input: approval.input, request })
        }
        return
      }
      if (request?.subtype === 'elicitation' && typeof frame.request_id === 'string') {
        if (!this.elicitations.has(frame.request_id)) {
          const elicitation: Elicitation = { requestId: frame.request_id, request, consumed: false }
          this.elicitations.set(frame.request_id, elicitation)
          this.emit('elicitation_request', { requestId: elicitation.requestId, request })
        }
        return
      }
    }
    if (frame.type === 'control_cancel_request' && typeof frame.request_id === 'string') {
      const approval = this.approvals.get(frame.request_id)
      if (approval && !approval.consumed) {
        approval.consumed = true
        this.emit('permission_cancelled', { requestId: frame.request_id })
      }
      const elicitation = this.elicitations.get(frame.request_id)
      if (elicitation && !elicitation.consumed) {
        elicitation.consumed = true
        this.emit('elicitation_cancelled', { requestId: frame.request_id })
      }
      return
    }
    const mainSource = typeof frame.parent_tool_use_id !== 'string'
    const interruption = this.active?.interruption
    if (this.active && interruption && mainSource) {
      // Exact SDK markers from createUserInterruptionMessage in utils/messages;
      // not AbortError matching and not sufficient without control ACK + result.
      const content = frameObject(frame.message)?.content
      const text = Array.isArray(content) && content.length === 1 && frameObject(content[0])?.type === 'text'
        ? frameObject(content[0])?.text : undefined
      if (frame.type === 'user' && frame.uuid !== this.active.messageUuid &&
        (text === '[Request interrupted by user]' || text === '[Request interrupted by user for tool use]'))
        interruption.markerRecordId = `journal:${this.id}:${this.seq + 1}`
      if (frame.type === 'result') {
        interruption.resultError = frame.is_error === true
        this.emitConfirmedInterruption(this.active)
      }
    }
    this.emit('sdk', { operationId: this.active?.operationId ?? null, message: frame })
    emitSessionTurnEvent({ type: 'output', sessionId: this.id, message: frame })
    if (frame.type === 'result' && mainSource && this.active) {
      const operationId = this.active.operationId
      const content = typeof this.active.content === 'string' ? this.active.content :
        this.active.content.filter(block => block.type === 'text' && typeof block.text === 'string').map(block => String(block.text)).join(' ')
      const completedColorCommand = frame.is_error !== true && this.active.intent === 'command' && /^\/color(?:\s|$)/i.test(content.trim())
      this.active = null
      for (const approval of this.approvals.values()) {
        if (!approval.consumed) {
          approval.consumed = true
          this.emit('permission_cancelled', { requestId: approval.requestId })
        }
      }
      for (const elicitation of this.elicitations.values()) {
        if (!elicitation.consumed) {
          elicitation.consumed = true
          this.emit('elicitation_cancelled', { requestId: elicitation.requestId })
        }
      }
      this.emit('turn_completed', { operationId, isError: frame.is_error === true })
      // The canonical command has already run and persisted through /color.
      // Read its post-command state from the same worker and project that state
      // to attached TUIs; this control is a getter, never a second writer.
      if (completedColorCommand && this.capabilities?.localWeb?.controls.includes('local_public_color'))
        void this.requestControl(randomUUID(), {subtype:'local_public_color'}).catch(() => {})
      if (this.pendingReset) void this.finishReset()
      else void this.pump()
    }
  }

  private async finishReset(): Promise<void> {
    const nextId = this.pendingReset!
    this.pendingReset = undefined
    this.resetting = true
    try {
      if (!this.rotateSession) throw new Error('Shared conversation reset requires its owning hub')
      await this.rotateSession(this, nextId)
      this.resetting = false
      for (const frame of this.resetFrames.splice(0)) this.receive(frame)
      this.refreshTitle()
      void this.pump()
    } catch (error) { this.resetFrames.length = 0; this.fail(error) }
  }

  /** Move the existing worker, never launch another one. Called by the hub only
   * after it has acquired the new conversation's ownership lease. */
  commitConversationReset(nextId: string): void {
    if (!this.resetting || this.closed) throw new ServeConflict('Conversation reset is no longer pending')
    const oldId = this.id
    const nextJournal = new ServeJournal(nextId)
    this.emit('session_reset', { sessionId: oldId, nextSessionId: nextId,
      movedOperationIds: this.queue.map(turn => turn.operationId) })
    this.listeners.clear()
    this.journal.close()
    this.journal = nextJournal
    this.id = nextId
    this.epoch += 1
    this.seq = 0
    this.createdAt = Date.now()
    this.continuedFrom = undefined
    this.title = undefined
    this.titleObservation = undefined
    if (this.titleRefreshTimer) clearTimeout(this.titleRefreshTimer)
    this.titleRefreshTimer = undefined
    this.approvals.clear(); this.elicitations.clear()
    // A response requested against the old conversation must not change the
    // new conversation's title or settings when it eventually arrives.
    for (const pending of this.controls.values()) pending.reject(new ServeGone('Conversation changed before control acknowledgement'))
    this.controls.clear()
    this.operations.clear()
    this.emit('session_started', { sessionId: nextId, ownerPid: process.pid, cwd: this.cwd,
      launchKey: this.launchKey, resetFrom: oldId, ownerId: this.executorGeneration, epoch: this.epoch })
    this.emit('sdk_ready', { capabilities: this.capabilities })
    for (const turn of this.queue) {
      const fingerprint = JSON.stringify(turn.intent === 'literal' ? ['turn', turn.content, 'literal'] : ['turn', turn.content])
      this.journal.putOperation(turn.operationId, fingerprint, { operationId: turn.operationId, queued: true })
      turn.queuedSeq = this.seq + 1
      this.emit('turn_queued', { operationId: turn.operationId, messageUuid: turn.messageUuid,
        source: turn.source, content: turn.content, intent: turn.intent, queueDepth: this.queue.length, movedFrom: oldId })
    }
  }

  private emitConfirmedInterruption(turn: Turn): void {
    const state = turn.interruption
    if (!state || state.emitted || !state.controlOperationId || !state.markerRecordId || state.resultError !== true) return
    state.emitted = true
    this.emit('turn_interrupted', { operationId: turn.operationId, controlOperationId: state.controlOperationId,
      reason: 'user_interrupt', markerRecordId: state.markerRecordId })
  }

  private refreshTitle(): void {
    if (this.closed || !this.capabilities?.localWeb?.controls.includes('local_get_session_title')) return
    void this.requestControl(randomUUID(), { subtype: 'local_get_session_title', session_id: this.id }).catch(() => {})
  }

  private applyTitleObservation(state: LocalSessionTitleState): void {
    if (this.titleObservation && state.revision < this.titleObservation.revision) return
    if (this.titleRefreshTimer) { clearTimeout(this.titleRefreshTimer); this.titleRefreshTimer = undefined }
    this.titleObservation = state
    if (state.persistence === 'persisted' && state.title !== undefined) this.title = state.title
    this.emit('title_state', { state })
    // The SDK's collision recheck is bounded (3 s); one follow-up observes
    // the final persisted name. No permanent polling or inferred title.
    if (state.status === 'pending' && this.titleFollowUpAvailable) {
      this.titleFollowUpAvailable = false
      this.titleRefreshTimer = setTimeout(() => { this.titleRefreshTimer = undefined; this.refreshTitle() }, 3300)
      this.titleRefreshTimer.unref?.()
    }
  }

  private fail(error: unknown): void {
    if (this.closed) return
    this.emit('transport_error', { message: error instanceof Error ? error.message : String(error) })
    this.exit(null)
    void this.transport.close()
  }

  private exit(code: number | null): void {
    if (this.closed) return
    this.closed = true
    if (this.titleRefreshTimer) clearTimeout(this.titleRefreshTimer)
    const incomplete = [this.active?.operationId, ...this.queue.map(turn => turn.operationId)].filter(Boolean)
    this.queue.length = 0
    this.active = null
    for (const approval of this.approvals.values()) {
      if (!approval.consumed) {
        approval.consumed = true
        this.emit('permission_cancelled', { requestId: approval.requestId })
      }
    }
    for (const elicitation of this.elicitations.values()) {
      if (!elicitation.consumed) {
        elicitation.consumed = true
        this.emit('elicitation_cancelled', { requestId: elicitation.requestId })
      }
    }
    for (const control of this.controls.values()) control.reject(new ServeGone('Session worker exited before control acknowledgement'))
    this.controls.clear()
    this.emit('process_exit', { code, incompleteOperationIds: incomplete })
    emitSessionTurnEvent({ type: 'stopped', sessionId: this.id })
  }

  onStopped(cleanup:(()=>Promise<void>)|undefined):void {
    if(!cleanup)return
    if(this.transportEnded)this.stopPromise=(this.stopPromise??Promise.resolve()).then(cleanup);else this.stopCleanups.add(cleanup)
  }
  private stopped():Promise<void>{
    this.transportEnded=true
    if(!this.stopPromise){
      const cleanups=[...this.stopCleanups];this.stopCleanups.clear()
      this.stopPromise=Promise.all(cleanups.map(cleanup=>cleanup())).then(()=>{})
    }
    return this.stopPromise
  }

  async close(): Promise<void> {
    if (this.disposed) return
    if (!this.closed) this.exit(null)
    await this.transport.close()
    await this.stopped()
    this.journal.close()
    this.disposed = true
  }
}

export class ServeSessionHub {
  private readonly sessions = new Map<string, ServeSession>()
  private readonly recovered: Map<string, RecoveredServeSession>
  constructor(private readonly makeTransport: (id: string, cwd: string, resumeFrom?: string, startup?: ServeStartupOptions) => ServeTransport, private readonly maxSessions = 16,
    recoverJournals = false, private readonly acquireResetOwner?: (id: string, cwd: string) => Promise<(() => Promise<void>) | undefined>,
    private readonly releaseResetOwner?: (id: string) => Promise<void>) {
    this.recovered = recoverJournals ? loadRecoveredServeSessions() : new Map()
  }
  create(cwd: string, resumeFrom?: string, startup?: ServeStartupOptions): ServeSession {
    if ([...this.sessions.values()].filter(session => !session.snapshot.closed).length >= this.maxSessions) {
      throw new ServeConflict('Concurrent session capacity reached')
    }
    const id = randomUUID()
    const session = new ServeSession(id, cwd, this.makeTransport(id, cwd, resumeFrom, startup), resumeFrom, startupKey(startup), 0, (session, nextId) => this.rotate(session, nextId))
    this.sessions.set(id, session)
    return session
  }
  /** Resume a stopped transcript in place; old journal sequence remains monotonic. */
  async resume(id:string,cwd:string,startup?:ServeStartupOptions):Promise<ServeSession> {
    const live=this.sessions.get(id)
    if(live&&!live.snapshot.closed)return live
    if([...this.sessions.values()].filter(s=>!s.snapshot.closed).length>=this.maxSessions)throw new ServeConflict('Concurrent session capacity reached')
    const old=live??this.recovered.get(id),initialSeq=old?.snapshot.lastSeq??0
    if(live)await live.close()
    else this.recovered.get(id)?.close()
    this.sessions.delete(id);this.recovered.delete(id)
    const session=new ServeSession(id,cwd,this.makeTransport(id,cwd,id,startup),undefined,startupKey(startup),initialSeq,(session,nextId)=>this.rotate(session,nextId))
    this.sessions.set(id,session)
    return session
  }
  /** A worker-side /branch has already materialized this transcript UUID.
   * Resume that exact ID; forking again would change the branch's identity. */
  adoptTranscript(id: string, cwd: string, sourceSessionId: string): ServeSession {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
      throw new ServeConflict('Invalid branch transcript ID')
    if (this.sessions.has(id) || this.recovered.has(id)) throw new ServeConflict('Branch session ID already exists')
    if ([...this.sessions.values()].filter(session => !session.snapshot.closed).length >= this.maxSessions)
      throw new ServeConflict('Concurrent session capacity reached')
    const session = new ServeSession(id, cwd, this.makeTransport(id, cwd, id), sourceSessionId, startupKey(), 0, (session,nextId)=>this.rotate(session,nextId))
    this.sessions.set(id, session)
    return session
  }
  private async rotate(session: ServeSession, nextId: string): Promise<void> {
    if (this.sessions.has(nextId) || this.recovered.has(nextId)) throw new ServeConflict('Reset conversation already has an owner or journal')
    const oldId = session.id
    const release = await this.acquireResetOwner?.(nextId, session.cwd)
    try {
      if (session.snapshot.closed || this.sessions.get(oldId) !== session) throw new ServeGone('Reset owner stopped')
      session.commitConversationReset(nextId)
      this.sessions.delete(oldId); this.sessions.set(nextId, session)
      session.onStopped(release)
      const previous = RecoveredServeSession.open(oldId)
      if (previous) this.recovered.set(oldId, previous)
      await this.releaseResetOwner?.(oldId)
    } catch (error) { await release?.(); throw error }
  }
  get(id: string): ServeSession | undefined { return this.sessions.get(id) }
  getRecovered(id: string): RecoveredServeSession | undefined { return this.recovered.get(id) }
  continuedFrom(id: string): ServeSnapshot | undefined {
    return this.list().find(session => session.continuedFrom === id && !session.closed)
  }
  list(): ServeSnapshot[] { return [...this.sessions.values()].map(session => session.snapshot)
    .concat([...this.recovered.values()].map(session => session.snapshot)) }
  async remove(id: string): Promise<boolean> {
    const session = this.sessions.get(id)
    if (!session) return false
    this.sessions.delete(id)
    await session.close()
    return true
  }
  async closeAll(): Promise<void> {
    await Promise.all([...this.sessions.keys()].map(id => this.remove(id)))
    for (const session of this.recovered.values()) session.close()
    this.recovered.clear()
  }
}
