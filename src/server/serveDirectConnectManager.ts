import {projectSharedConfig,type SharedConfigControl} from './sharedConfigState.js'
import {ThinkingRequestSuperseded,projectSharedThinking,type SharedThinkingChange,type SharedThinkingControl,type SharedThinkingResult} from './sharedThinkingState.js'
import type {SharedConfigUpdate} from '../components/Settings/sharedConfig.js'
import {taskListChanged} from './sharedTaskEvents.js'
import {checkedTasks, type PublicTask} from './web/publicCommandAdapters.js'
import {projectSharedEffortResult,sharedEffortStateSchema} from './sharedEffortState.js'
import type {SharedEffortResult} from './sharedEffortState.js'
import { randomUUID } from 'node:crypto'
import type { PlanControlRequest, ControlRequestOptions } from '../commands/plan/remoteProtocol.js'
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js'
import type { SDKControlElicitationRequest } from '../entrypoints/sdk/controlTypes.js'
import type { RemotePermissionResponse } from '../remote/RemoteSessionManager.js'
import type { PermissionUpdate } from '../types/permissions.js'
import type { RemoteMessageContent } from '../utils/teleport/api.js'
import type { DirectConnectCallbacks } from './directConnectManager.js'
import type { ServeEvent, ServeSnapshot } from './serveSession.js'
import {parseLocalCommandText} from './sharedLocalCommandText.js'
import type { PermissionRulesState } from '../cli/control/permissionRules.js'
import type { SharedRuleUpdate } from './sharedSessionCommandHost.js'
import { projectPermissionRulesResponse } from './servePermissionRules.js'
import {SDKControlGetContextUsageResponseSchema} from '../entrypoints/sdk/controlSchemas.js'
import {AGENT_COLORS} from '../tools/AgentTool/agentColorManager.js'
import type {ContextData} from '../utils/analyzeContext.js'
import {computerUseWebRequest287} from '../utils/computerUse/webApproval287.js'

export type ServeDirectConnectConfig = {
  seedAutocompactState?:import('../remote/autocompactState287.js').RemoteAutocompactState287
  protocol: 'serve'
  serverUrl: string
  sessionId: string
  authToken?: string
}

/** Existing REPL renderer adapter, not a second SDK/model engine. Every write
 * goes through the one-writer service's authenticated HTTP operation path. */
export class ServeDirectConnectSessionManager {
  private ws: WebSocket | null = null
  private closed = false
  private connected = false
  private workerReady = false
  private cursor = 0
  private executorGeneration: string | undefined
  private snapshotSeq = 0
  private readonly ownTurns = new Set<string>()
  private readonly hydratedTranscriptBodies = new Map<string, Set<string>>()
  private readonly hydratedTranscriptCommands = new Map<string, string>()
  private hydratedTranscriptJournalThrough = 0
  private readonly pendingApprovals = new Set<string>()
  private readonly userDialogControllers = new Map<string, AbortController>()
  private readonly identity = {}
  private preferencesResetPending = false
  private settingsAvailable = false
  private thinkingAvailable = false
  private thinkingRevision = 0
  private thinkingRead: Promise<SharedThinkingResult> | undefined
  private thinkingWriting = false
  private thinkingRefreshAgain = false
  private settingsRevision = 0
  private settingsRefresh: Promise<void> | undefined
  private settingsRefreshAgain = false
  private readonly settingsListeners = new Set<() => void>()
  private readonly taskListeners = new Set<() => void>()
  private readonly ruleListeners = new Set<(state: PermissionRulesState) => void>()
  constructor(private readonly config: ServeDirectConnectConfig, private readonly callbacks: DirectConnectCallbacks) {}

  private get base(): URL { return new URL(this.config.serverUrl) }
  private get path(): string { return `/v1/sessions/${this.config.sessionId}` }
  private async request(path: string, init: RequestInit = {}): Promise<Response> {
    const headers: Record<string, string> = { 'content-type': 'application/json' }
    if (this.config.authToken) headers.authorization = `Bearer ${this.config.authToken}`
    const response = await fetch(new URL(path, this.base), { ...init, headers: { ...headers, ...init.headers } })
    if (!response.ok) throw new Error(`Shared session HTTP ${response.status}`)
    return response
  }

  connect(): void { void this.bootstrap().catch(error => this.fail(error)) }
  private async bootstrap(): Promise<void> {
    const sessionId = this.config.sessionId
    if (!/^[0-9a-f-]{36}$/.test(this.config.sessionId)) throw new Error('Invalid shared session ID')
    const snapshot = await (await this.request(this.path)).json() as Pick<ServeSnapshot, 'closed' | 'executorGeneration' | 'executorState' | 'lastSeq' | 'capabilities' | 'continuedFrom' | 'historyState'>
    if (this.closed || this.config.sessionId !== sessionId) return
    if (snapshot.closed === true) throw new Error('Shared session worker exited')
    this.executorGeneration = snapshot.executorGeneration
    this.snapshotSeq = snapshot.lastSeq ?? 0
    this.receiveCapabilities(snapshot.capabilities)
    this.workerReady = snapshot.executorState?.status === 'ready' && snapshot.executorState.canControl
    // Resume replaces the owner and may drop continuedFrom. The canonical
    // transcript signal survives that lifecycle; /history confirms its source.
    if (snapshot.historyState?.source === 'transcript' || typeof snapshot.continuedFrom === 'string') {
      this.hydratedTranscriptJournalThrough = this.snapshotSeq
      await this.hydrateInheritedTranscript(sessionId)
    }
    if (this.closed || this.config.sessionId !== sessionId) return
    for (;;) {
      const response = await this.request(`${this.path}/events?after=${this.cursor}&limit=500`)
      const page = await response.json() as { events?: ServeEvent[]; nextCursor?: number; hasMore?: boolean }
      if (!Array.isArray(page.events) || typeof page.hasMore !== 'boolean') throw new Error('Invalid shared session history')
      for (const event of page.events) this.receiveEvent(event)
      if (this.closed || this.config.sessionId !== sessionId) return
      if (page.nextCursor !== this.cursor || (page.hasMore && !page.events.length)) throw new Error('Shared session history gap')
      if (!page.hasMore) break
    }
    if (this.closed || this.config.sessionId !== sessionId) return
    const url = new URL(`${this.path}/ws?after=${this.cursor}`, this.base)
    url.protocol = this.base.protocol === 'https:' ? 'wss:' : 'ws:'
    const protocol = this.config.authToken ? `cc.serve.${this.config.authToken}` : 'cc.serve'
    const ws = new WebSocket(url, [protocol])
    this.ws = ws
    ws.addEventListener('open', () => {
      if (this.closed || this.ws !== ws) return
      this.notifyConnectedIfReady()
    })
    ws.addEventListener('message', event => {
      if (this.closed || this.ws !== ws) return
      try { this.receiveEvent(JSON.parse(String(event.data))) }
      catch (error) { this.fail(error) }
    })
    ws.addEventListener('error', () => { if (!this.closed && this.ws === ws) this.fail(new Error('Shared session WebSocket error')) })
    ws.addEventListener('close', () => { if (!this.closed && this.ws === ws) this.fail(new Error('Shared session WebSocket closed; history can be replayed on a new attach')) })
  }

  private async hydrateInheritedTranscript(sessionId:string):Promise<void> {
    const object=(value:unknown):Record<string,unknown>|undefined=>
      value!==null&&typeof value==='object'&&!Array.isArray(value)?value as Record<string,unknown>:undefined
    type HistoryPage={events?:ServeEvent[];before?:number;through?:number;hasOlder?:boolean;eventSource?:string;
      journal?:{events:ServeEvent[];evidence?:{nextAfter:number;hasMore:boolean}}}
    const rows:ServeEvent[]=[]
    const journalBodies=new Set<string>()
    let before:number|undefined,through:number|undefined
    for(;;){
      const query=new URLSearchParams({limit:'500',evidenceThrough:String(this.hydratedTranscriptJournalThrough)})
      if(before!==undefined)query.set('before',String(before))
      if(through!==undefined)query.set('through',String(through))
      let page:HistoryPage,evidenceAfter=0
      for(;;){
        page=await (await this.request(`${this.path}/history?${query}`)).json() as HistoryPage
        // No transcript source means this session has no inherited disk history.
        if(page.eventSource!=='transcript')return
        if(!Array.isArray(page.events)||typeof page.hasOlder!=='boolean')throw new Error('Invalid inherited transcript history')
        if(through===undefined)through=page.through
        if(evidenceAfter===0)rows.push(...page.events)
        // Exact journal mirrors retain their original SDK replay, including
        // stream frames followed by the assistant final that clears them.
        for(const event of page.journal?.events??[]){
          const message=event.message as SDKMessage|undefined
          if(event.seq<=this.hydratedTranscriptJournalThrough&&event.type==='sdk'&&message&&
            (message.type==='user'||message.type==='assistant')&&'uuid' in message&&typeof message.uuid==='string')
            journalBodies.add(JSON.stringify([message.uuid,this.transcriptBodyKey(message)]))
        }
        const evidence=page.journal?.evidence
        if(!evidence?.hasMore)break
        if(!Number.isSafeInteger(evidence.nextAfter)||evidence.nextAfter<=evidenceAfter)
          throw new Error('Inherited transcript evidence gap')
        evidenceAfter=evidence.nextAfter
        query.set('evidenceAfter',String(evidenceAfter))
        if(through!==undefined)query.set('through',String(through))
      }
      if(!page.hasOlder)break
      const next=page.before
      if(!Number.isSafeInteger(next)||next!<1||next===before)throw new Error('Inherited transcript history gap')
      before=next
    }
    if(this.closed||this.config.sessionId!==sessionId)return
    // Transcript UUIDs can repeat across compact-boundary copies. Keep the
    // latest canonical row and emit in transcript order, just as history view.
    const unique=new Map<string,{event:ServeEvent;ordinal:number}>()
    rows.forEach((event,ordinal)=>{
      if(event.type!=='sdk')return
      const message=event.message as SDKMessage|undefined
      // The canonical history converter emits only user/assistant display
      // messages as SDK events. Keep this boundary explicit: transcript
      // records such as resets and control/state rows are never callbacks.
      if(!message||typeof message!=='object'||(message.type!=='user'&&message.type!=='assistant'))return
      const messageUuid='uuid' in message&&typeof message.uuid==='string'?message.uuid:undefined
      const uuid=messageUuid??`sequence:${event.seq}:${ordinal}`
      if(messageUuid){
        const bodies=this.hydratedTranscriptBodies.get(messageUuid)??new Set<string>()
        bodies.add(this.transcriptBodyKey(message))
        this.hydratedTranscriptBodies.set(messageUuid,bodies)
      }
      const previous=unique.get(uuid)
      if(!previous||event.seq>previous.event.seq||event.seq===previous.event.seq&&ordinal>previous.ordinal)
        unique.set(uuid,{event,ordinal})
    })
    for(const [uuid,{event}] of [...unique.entries()].sort(([,a],[,b])=>a.event.seq-b.event.seq||a.ordinal-b.ordinal)){
      if(this.closed||this.config.sessionId!==sessionId)return
      if(journalBodies.has(JSON.stringify([uuid,this.transcriptBodyKey(event.message as SDKMessage)]))){
        this.hydratedTranscriptBodies.delete(uuid)
        continue
      }
      // Local commands have no SDK user echo: the transcript stores generated
      // XML while turn_queued stores slash text. Reuse the shared text parser
      // only with canonical result provenance, scoped to the main conversation.
      const frame=object(event.message),command=object(event.localCommand)
      if(frame?.type==='user'&&typeof frame.uuid==='string'&&frame.parent_tool_use_id==null&&
        frame.agent_id==null&&frame.isSidechain!==true&&frame.isMeta!==true&&
        command?.source==='transcript-local-command'&&typeof command.resultUuid==='string'&&command.resultUuid&&
        typeof command.resultRecordId==='string'&&command.resultRecordId){
        const content=object(frame.message)?.content
        const commandText=typeof content==='string'?parseLocalCommandText(content):null
        if(commandText!==null&&commandText!==content&&commandText.startsWith('/'))
          this.hydratedTranscriptCommands.set(frame.uuid,commandText)
      }
      this.callbacks.onMessage(event.message as SDKMessage, {renderUser:true})
    }
  }

  private transcriptBodyKey(message:SDKMessage):string {
    return JSON.stringify([message.type,(message as {message?:unknown}).message])
  }

  private isHydratedTranscriptOverlap(event:ServeEvent,message:SDKMessage):boolean {
    if(event.seq>this.hydratedTranscriptJournalThrough||!('uuid' in message)||typeof message.uuid!=='string')return false
    return this.hydratedTranscriptBodies.get(message.uuid)?.has(this.transcriptBodyKey(message))===true||
      (event.type==='turn_queued'&&event.intent==='command'&&event.messageUuid===message.uuid&&
        typeof event.content==='string'&&this.hydratedTranscriptCommands.get(message.uuid)===event.content)
  }

  private notifyConnectedIfReady(): void {
    // Transport open is not the worker's initialize ACK. Initial mode sync
    // must wait for both, including attach while a canonical worker starts.
    if (this.closed || this.connected || !this.workerReady || this.ws?.readyState !== WebSocket.OPEN) return
    this.connected = true
    this.callbacks.onConnected?.()
    this.refreshPreferences()
    this.refreshThinking()
  }

  private receiveCapabilities(capabilities: ServeSnapshot['capabilities']): void {
    this.settingsAvailable = capabilities?.localWeb?.controls.includes('local_public_config') === true
    this.thinkingAvailable = capabilities?.localWeb?.controls.includes('local_public_thinking') === true
    if (typeof capabilities?.currentModel === 'string' && capabilities.currentModel)
      this.callbacks.onSessionModel?.(capabilities.currentModel)
    const effort=sharedEffortStateSchema.safeParse(capabilities?.effortState)
    if(effort.success)this.callbacks.onSessionEffort?.(effort.data)
    if (capabilities && Object.hasOwn(capabilities, 'agentColor'))
      this.callbacks.onSessionColor?.(capabilities.agentColor ?? undefined)
  }
  private receiveEvent(event: ServeEvent): void {
    if (!event || !Number.isSafeInteger(event.seq) || typeof event.type !== 'string') throw new Error('Invalid shared session event')
    if (event.seq <= this.cursor) return // HTTP/WS replay overlap.
    if (event.seq !== this.cursor + 1) throw new Error(`Shared session event gap after ${this.cursor}`)
    this.cursor = event.seq
    if (event.type === 'agent_color_changed') {
      const color = (event as {color?: unknown}).color
      if (color === 'default' || AGENT_COLORS.includes(color as import('../tools/AgentTool/agentColorManager.js').AgentColorName))
        this.callbacks.onSessionColor?.(color === 'default' ? undefined : color as import('../tools/AgentTool/agentColorManager.js').AgentColorName)
    }
    if (event.seq > this.snapshotSeq && (event.type === 'turn_completed' || event.type === 'settings_changed')) {
      this.refreshPreferences()
      this.refreshThinking()
      for (const listener of this.settingsListeners) listener()
    }
    if (event.seq > this.snapshotSeq && taskListChanged(event,this.executorGeneration)) {
      for (const listener of this.taskListeners) listener()
    }
    if ((event.type === 'capabilities_changed' || event.type === 'sdk_ready') && event.seq > this.snapshotSeq &&
      event.executorGeneration === this.executorGeneration) {
      this.receiveCapabilities(event.capabilities as ServeSnapshot['capabilities'])
    }
    if (event.type === 'sdk_ready' && event.executorGeneration === this.executorGeneration) {
      // Same-UUID replay may include a previous worker's ready/exit pair.
      this.workerReady = true
      this.notifyConnectedIfReady()
    } else if (event.type === 'sdk') {
      const message = event.message as SDKMessage
      if (!message || typeof message !== 'object' || typeof message.type !== 'string') throw new Error('Invalid SDK event')
      if(this.isHydratedTranscriptOverlap(event,message))return
      // Restoring the archived pre-clear conversation is a new owner. Its old
      // reset is audit history, not an instruction to clear this viewer again.
      if (message.type === 'conversation_reset' && event.executorGeneration !== this.executorGeneration) return
      if (message.type === 'conversation_reset') {this.preferencesResetPending=true;++this.settingsRevision}
      this.callbacks.onMessage(message)
    } else if (event.type === 'turn_queued' && typeof event.operationId === 'string') {
      if (!this.ownTurns.has(event.operationId) && (typeof event.content === 'string' || Array.isArray(event.content))) {
        const message = { type: 'user', uuid: typeof event.messageUuid === 'string' ? event.messageUuid : event.operationId,
          message: { role: 'user', content: Array.isArray(event.content)
            ? event.content.map(block=>block.type==='local_file'
              ? {type:'text',text:`[Attached file: ${String(block.title)}]`} : block)
            : event.content }, parent_tool_use_id: null,
          session_id: this.config.sessionId } as SDKMessage
        if(!this.isHydratedTranscriptOverlap(event,message))this.callbacks.onMessage(message, { renderUser: true })
      }
      this.ownTurns.delete(event.operationId)
    } else if (event.type === 'permission_request' && typeof event.requestId === 'string') {
      if (this.pendingApprovals.has(event.requestId)) return
      const request = event.request as Parameters<DirectConnectCallbacks['onPermissionRequest']>[0]
      // A shared Web computer-use card is a user dialog, not can_use_tool.
      // Do not feed its payload into the ordinary terminal permission parser.
      if (event.toolName === 'ComputerUseApproval' && (event.request as {subtype?:string})?.subtype === 'request_user_dialog') {
        const input=computerUseWebRequest287.parse(event.input),controller=new AbortController()
        this.pendingApprovals.add(event.requestId)
        this.userDialogControllers.set(event.requestId,controller)
        if(this.callbacks.onUserDialog) {
          const id=event.requestId
          void this.callbacks.onUserDialog(input,id,controller.signal).then(async result=>{
            if(controller.signal.aborted||this.closed||!this.pendingApprovals.has(id))return
            await this.request(`${this.path}/approvals`,{method:'POST',body:JSON.stringify({operationId:randomUUID(),requestId:id,allowed:true,updatedInput:result})})
          }).catch(error=>{if(!controller.signal.aborted)this.callbacks.onError?.(error instanceof Error?error:new Error(String(error)))})
        }
        return
      }
      if (!request || request.subtype !== 'can_use_tool') throw new Error('Invalid permission request')
      this.pendingApprovals.add(event.requestId)
      this.callbacks.onPermissionRequest(request, event.requestId)
    } else if ((event.type === 'permission_resolved' || event.type === 'permission_cancelled') && typeof event.requestId === 'string') {
      this.userDialogControllers.get(event.requestId)?.abort()
      this.userDialogControllers.delete(event.requestId)
      this.pendingApprovals.delete(event.requestId)
      this.callbacks.onPermissionResolved?.(event.requestId)
    } else if (event.type === 'elicitation_request' && typeof event.requestId === 'string') {
      const request = event.request as SDKControlElicitationRequest
      if (!request || request.subtype !== 'elicitation') throw new Error('Invalid elicitation request')
      this.callbacks.onElicitationRequest?.(request, event.requestId)
    } else if ((event.type === 'elicitation_resolved' || event.type === 'elicitation_cancelled') && typeof event.requestId === 'string') {
      this.callbacks.onElicitationResolved?.(event.requestId)

    } else if (event.type === 'permission_rules_changed') {
      const projected = projectPermissionRulesResponse(event)
      if (projected) for (const listener of this.ruleListeners) listener(projected.state)
    } else if (event.type === 'title_state' && event.state && typeof event.state === 'object') {
      const state = event.state as {session_id?:unknown;persistence?:unknown;title?:unknown}
      if (state.session_id === this.config.sessionId && state.persistence === 'persisted' && typeof state.title === 'string')
        this.callbacks.onSessionTitle?.(state.title)
    } else if (event.type === 'session_reset' && event.executorGeneration === this.executorGeneration &&
      typeof event.nextSessionId === 'string' && /^[0-9a-f-]{36}$/.test(event.nextSessionId)) {
      const previous = this.ws
      this.ws = null
      previous?.close()
      this.config.sessionId = event.nextSessionId
      this.preferencesResetPending=false
      this.cursor = 0
      this.snapshotSeq = 0
      this.hydratedTranscriptJournalThrough = 0
      this.hydratedTranscriptBodies.clear()
      this.hydratedTranscriptCommands.clear()
      this.workerReady = false
      this.connected = false
      this.pendingApprovals.clear()
      for(const controller of this.userDialogControllers.values())controller.abort()
      this.userDialogControllers.clear()
      this.connect()
    } else if (event.type === 'process_exit' &&
      (!this.executorGeneration || event.executorGeneration === this.executorGeneration)) {
      // Same-UUID resume keeps the old journal and monotonic cursor. An exit
      // from an earlier worker is history, not the new owner's lifecycle.
      this.fail(new Error('Shared session worker exited'))
    }
  }

  private fail(value: unknown): void {
    if (this.closed) return
    this.callbacks.onError?.(value instanceof Error ? value : new Error(String(value)))
    this.disconnect(true)
  }
  disconnect(notify = false): void {
    if (this.closed) return
    this.closed = true
    this.ws?.close()
    this.ws = null
    this.connected = false
    for(const controller of this.userDialogControllers.values())controller.abort()
    this.userDialogControllers.clear()
    this.pendingApprovals.clear()
    for (const listener of this.settingsListeners) listener()
    this.settingsListeners.clear()
    this.ruleListeners.clear()
    for (const listener of this.taskListeners) listener()
    this.taskListeners.clear()
    if (notify) this.callbacks.onDisconnected?.()
  }
  isConnected(): boolean { return this.connected && !this.closed }
  getPlanIdentity(): object | undefined { return this.isConnected() ? this.identity : undefined }

  private refreshPreferences(): void {
    if (!this.settingsAvailable || !this.isConnected() || this.preferencesResetPending) return
    if (this.settingsRefresh) {this.settingsRefreshAgain=true;return}
    const sessionId=this.config.sessionId,generation=this.executorGeneration
    this.settingsRefresh=this.getSettings().then(()=>{},error=>{
      if(!this.closed && !this.preferencesResetPending && sessionId===this.config.sessionId && generation===this.executorGeneration)this.callbacks.onError?.(error instanceof Error?error:new Error(String(error)))
    }).finally(()=>{
      this.settingsRefresh=undefined
      if(this.settingsRefreshAgain){this.settingsRefreshAgain=false;this.refreshPreferences()}
    })
  }
  subscribeSettingsChanges(listener: () => void): () => void {
    this.settingsListeners.add(listener)
    return () => {this.settingsListeners.delete(listener)}
  }
  private refreshThinking():void {
    if(!this.thinkingAvailable || !this.isConnected() || this.preferencesResetPending)return
    if(this.thinkingRead || this.thinkingWriting){this.thinkingRefreshAgain=true;return}
    const sessionId=this.config.sessionId,generation=this.executorGeneration
    const pending=this.thinking(),revision=this.thinkingRevision
    void pending.catch(error=>{
      if(!(error instanceof ThinkingRequestSuperseded) && !this.closed && !this.preferencesResetPending &&
        sessionId===this.config.sessionId && generation===this.executorGeneration && revision===this.thinkingRevision)
        this.callbacks.onError?.(error instanceof Error?error:new Error(String(error)))
    })
  }
  async thinking(change:SharedThinkingChange={},signal?:AbortSignal):Promise<SharedThinkingResult> {
    signal?.throwIfAborted()
    if(!this.thinkingAvailable)throw Error('Owner thinking controls are not available')
    const mutation=Boolean(change.update||change.restore)
    if(this.thinkingWriting)throw Error('Owner thinking update is pending')
    if(!mutation&&this.thinkingRead){const result=await this.thinkingRead;signal?.throwIfAborted();return result}
    const revision=++this.thinkingRevision,sessionId=this.config.sessionId,generation=this.executorGeneration
    if(mutation)this.thinkingWriting=true
    const current=()=>!this.closed&&!this.preferencesResetPending&&sessionId===this.config.sessionId&&generation===this.executorGeneration&&revision===this.thinkingRevision
    const request=(async()=>{
      let response:Awaited<ReturnType<typeof this.control>>
      try{response=await this.control({subtype:'local_public_thinking',...change},this.commandSignal())}
      catch(error){if(!current())throw new ThinkingRequestSuperseded();throw error}
      if(!current())throw new ThinkingRequestSuperseded()
      const result=projectSharedThinking(response.response)
      if(!result)throw Error('Owner thinking was not confirmed')
      this.callbacks.onSessionThinking?.(result.state)
      return result
    })()
    if(!mutation)this.thinkingRead=request
    try{const result=await request;signal?.throwIfAborted();return result}
    finally{
      if(mutation)this.thinkingWriting=false
      else if(this.thinkingRead===request)this.thinkingRead=undefined
      if(this.thinkingRefreshAgain&&!this.thinkingRead&&!this.thinkingWriting){this.thinkingRefreshAgain=false;this.refreshThinking()}
    }
  }
  async getSettings(signal?: AbortSignal) {
    const revision=++this.settingsRevision,sessionId=this.config.sessionId,generation=this.executorGeneration
    const result=await this.control({subtype:'local_public_config'},this.commandSignal(signal))
    const snapshot=projectSharedConfig(result.response)
    if(!snapshot)throw Error('Shared owner preferences were not confirmed')
    if (!this.closed && !this.preferencesResetPending && sessionId===this.config.sessionId && generation===this.executorGeneration && revision===this.settingsRevision) this.callbacks.onSessionPreferences?.(snapshot.effective)
    return snapshot
  }
  async updateSettings(update: SharedConfigUpdate,signal?: AbortSignal) {
    const revision=++this.settingsRevision,sessionId=this.config.sessionId,generation=this.executorGeneration
    const result=await this.control({subtype:'local_public_config',update},this.commandSignal(signal))
    const snapshot=projectSharedConfig(result.response)
    if(!snapshot)throw Error('Shared owner preferences were not confirmed')
    if (!this.closed && !this.preferencesResetPending && sessionId===this.config.sessionId && generation===this.executorGeneration && revision===this.settingsRevision) this.callbacks.onSessionPreferences?.(snapshot.effective)
    return snapshot
  }
  subscribeTaskChanges(listener: () => void): () => void {
    this.taskListeners.add(listener)
    return () => { this.taskListeners.delete(listener) }
  }
  async listTasks(signal?: AbortSignal): Promise<PublicTask[]> {
    const result = await this.control({subtype:'local_public_tasks'}, this.commandSignal(signal))
    return checkedTasks(result.response)
  }
  async contextUsage(signal?: AbortSignal): Promise<ContextData> {
    signal?.throwIfAborted()
    if (!this.isConnected()) throw new Error('Shared session is not connected')
    const sessionId = this.config.sessionId, generation = this.executorGeneration
    // The official full collector may wait for token counting; do not apply
    // the short settings-write timeout or substitute the viewer's empty state.
    const result = await this.control({subtype:'get_context_usage', detail:'full'}, signal)
    if (!this.isConnected() || this.preferencesResetPending || sessionId !== this.config.sessionId || generation !== this.executorGeneration)
      throw new Error('Shared session changed before context confirmation')
    const data = SDKControlGetContextUsageResponseSchema().parse(result.response)
    return data as ContextData
  }
  async stopTask(taskId: string, signal?: AbortSignal): Promise<void> {
    const result = await this.control({subtype:'stop_task',task_id:taskId}, this.commandSignal(signal))
    if (result.accepted !== true) throw new Error('Shared task stop was not acknowledged')
  }
  subscribePermissionRules(listener: (state: PermissionRulesState) => void): () => void {
    this.ruleListeners.add(listener)
    return () => { this.ruleListeners.delete(listener) }
  }
  private commandSignal(signal?: AbortSignal): AbortSignal {
    if (!this.isConnected()) throw new Error('Shared session is not connected')
    return AbortSignal.any([AbortSignal.timeout(15000), ...(signal ? [signal] : [])])
  }
  async effort(value?: string, signal?: AbortSignal, expectedModel?: string): Promise<SharedEffortResult> {
    const result=await this.control({subtype:'local_public_effort',value,expectedModel},this.commandSignal(signal))
    const projected=projectSharedEffortResult(result.response)
    if(!projected)throw Error('Shared effort was not confirmed; refresh before retrying')
    return projected
  }
  async setModel(model: string | undefined, signal?: AbortSignal): Promise<string> {
    const result = await this.control({subtype: 'set_model', model}, this.commandSignal(signal))
    const response = result.response as {model?: unknown} | undefined
    if (typeof response?.model !== 'string' || !response.model) throw new Error('Shared model change was not confirmed; refresh before retrying')
    // The event stream, not this HTTP response, owns display ordering. Another
    // viewer may already have changed the model while this ACK was in flight.
    return response.model
  }
  async setColor(color: import('../tools/AgentTool/agentColorManager.js').AgentColorName | 'default', signal?: AbortSignal): Promise<void> {
    const result = await this.control({subtype: 'local_public_color', color}, this.commandSignal(signal))
    if (result.accepted !== true || (result.response as {color?: unknown} | undefined)?.color !== color)
      throw new Error('Shared color change was not confirmed; refresh before retrying')
  }
  async rename(title: string, signal?: AbortSignal): Promise<void> {
    const result = await this.control({subtype: 'rename_session', title}, this.commandSignal(signal))
    if (result.accepted !== true) throw new Error('Shared rename was not acknowledged')
  }
  async listPermissionRules(signal?: AbortSignal): Promise<PermissionRulesState> {
    const result = await this.control({subtype: 'list_permission_rules'}, this.commandSignal(signal))
    const projected = projectPermissionRulesResponse(result.response)
    if (!projected) throw new Error('Shared permission rules were not confirmed')
    return projected.state
  }
  async updatePermissionRules(update: SharedRuleUpdate, signal?: AbortSignal): Promise<PermissionRulesState> {
    const result = await this.control({subtype: 'local_update_permission_rules', update}, this.commandSignal(signal))
    const projected = projectPermissionRulesResponse(result.response)
    if (!projected) throw new Error('Shared permission update was not confirmed; refresh before retrying')
    return projected.state
  }

  async sendMessage(content: RemoteMessageContent, opts?: { uuid?: string }): Promise<boolean> {
    if (!this.isConnected()) return false
    const operationId = opts?.uuid ?? randomUUID()
    this.ownTurns.add(operationId)
    try {
      await this.request(`${this.path}/turns`, { method: 'POST', body: JSON.stringify({ operationId, source: 'terminal', content }) })
      return true
    } catch (error) {
      this.ownTurns.delete(operationId)
      throw error
    }
  }
  respondToPermissionRequest(requestId: string, result: RemotePermissionResponse & { updatedPermissions?: PermissionUpdate[]; interrupt?: boolean }): void {
    void this.request(`${this.path}/approvals`, { method: 'POST', body: JSON.stringify({
      operationId: randomUUID(), requestId, allowed: result.behavior === 'allow',
      ...(result.behavior === 'allow' ? { updatedInput: result.updatedInput,
        ...(result.updatedPermissions?.length ? { updatedPermissions: result.updatedPermissions } : {}) } :
        { denyMessage: result.message, ...(result.interrupt === true ? { interrupt: true } : {}) }),
    }) }).catch(error => this.callbacks.onError?.(error instanceof Error ? error : new Error(String(error))))
  }
  respondToElicitation(requestId: string, result: { action: 'accept' | 'decline' | 'cancel'; content?: Record<string, unknown> }): void {
    void this.request(`${this.path}/interactions`, { method: 'POST', body: JSON.stringify({
      operationId: randomUUID(), requestId, ...result,
    }) }).catch(error => this.callbacks.onError?.(error instanceof Error ? error : new Error(String(error))))
  }
  sendInterrupt(): void {
    void this.control({ subtype: 'interrupt' }).catch(error => this.callbacks.onError?.(error instanceof Error ? error : new Error(String(error))))
  }
  requestPlanControl(request: PlanControlRequest, options: ControlRequestOptions): Promise<unknown> {
    if (request.subtype === 'set_permission_mode' && request.mode === 'bypassPermissions') return Promise.reject(new Error('Shared service does not expose this permission mode'))
    return this.control(request, options.signal).then(result => request.subtype === 'get_plan' ? result.response : {})
  }
  private async control(request: SharedThinkingControl | SharedConfigControl | { subtype: 'interrupt' } | PlanControlRequest |
    {subtype:'get_context_usage'; detail:'full'} |
    {subtype:'local_public_tasks'} | {subtype:'stop_task';task_id:string} |
    {subtype:'local_public_effort';value?:string;expectedModel?:string} | {subtype:'local_public_color';color?:import('../tools/AgentTool/agentColorManager.js').AgentColorName|'default'} | {subtype: 'set_model'; model?: string} | {subtype: 'rename_session'; title: string} | {subtype: 'list_permission_rules'} |
    {subtype: 'local_update_permission_rules'; update: SharedRuleUpdate}, signal?: AbortSignal): Promise<{ accepted: true; response?: unknown }> {
    const response = await this.request(`${this.path}/controls`, { method: 'POST', signal,
      body: JSON.stringify({ operationId: randomUUID(), request }) })
    return response.json() as Promise<{ accepted: true; response?: unknown }>
  }
}
