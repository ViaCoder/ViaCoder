import type {WorkflowLaunchEvent287} from '../utils/officialWorkflowCarriers287/callerRuntime.js'
import {getPrintUiHostGate287} from './printOwnership287/publicHostRuntime287.js'
import {createSendUiHostRequest287} from './printOwnership287/publicHostNative.js'
import type {UiHostRequest287} from './printOwnership287/publicHostTypes287.js'
import {type Output as PermissionToolOutput,outputSchema as permissionToolOutputSchema} from '../utils/permissions/PermissionPromptToolResultSchema.js'
import {getSDKPermissionHostMethods287,getSDKPermissionRules287} from '../utils/permissions/officialSDKPermission287/runtime.js'
import {isLocalHostRemoteTransport287} from './printOwnership287/hostCloseNative.js'
import {getPermissionOuter287} from '../utils/permissions/permissionOuter287/index.js'
import {createSignal} from '../utils/signal.js'
import type {PermissionSessionState287} from '../utils/permissions/officialSDKPermission287/native.js'
import type {SDKPermissionCaller287} from '../utils/permissions/officialSDKPermission287/native.js'
import { feature } from 'bun:bundle'
import {createClaimIngressNative287,type ClaimIngressHost287} from './printOwnership287/sessionStartNative.js'
import {gracefulShutdown} from '../utils/gracefulShutdown.js'
import type {
  ElicitResult,
  JSONRPCMessage,
} from '@modelcontextprotocol/sdk/types.js'
import { randomUUID } from 'crypto'
import type { AssistantMessage } from 'src//types/message.js'
import type {
  HookInput,
  HookJSONOutput,
  PermissionUpdate,
  SDKMessage,
  SDKUserMessage,
} from 'src/entrypoints/agentSdkTypes.js'
import { SDKControlElicitationResponseSchema } from 'src/entrypoints/sdk/controlSchemas.js'
import type {
  SDKControlRequest,
  SDKControlResponse,
  StdinMessage,
  StdoutMessage,
} from 'src/entrypoints/sdk/controlTypes.js'
import type { CanUseToolFn } from 'src/hooks/useCanUseTool.js'
import type { Tool, ToolUseContext } from 'src/Tool.js'
import { type HookCallback, hookJSONOutputSchema } from 'src/types/hooks.js'
import { logForDebugging } from 'src/utils/debug.js'
import { logForDiagnosticsNoPII } from 'src/utils/diagLogs.js'
import { AbortError, isAbortError } from 'src/utils/errors.js'
import { jsonStringify } from 'src/utils/slowOperations.js'
import { z } from 'zod/v4'
import { notifyCommandLifecycle } from '../utils/commandLifecycle.js'
import { normalizeControlMessageKeys } from '../utils/controlMessageCompat.js'
import {
  notifySessionStateChanged,
  type RequiresActionDetails,
  type SessionWorkerState287,
} from '../utils/sessionState.js'
import { jsonParse } from '../utils/slowOperations.js'
import { Stream } from '../utils/stream.js'

/**
 * Synthetic tool name used when forwarding sandbox network permission
 * requests via the can_use_tool control_request protocol. SDK hosts
 * see this as a normal tool permission prompt.
 */
export const SANDBOX_NETWORK_ACCESS_TOOL_NAME = 'SandboxNetworkAccess'

type PendingRequest<T> = {
  resolve: (result: T) => void
  reject: (error: unknown) => void
  schema?: z.Schema
  forwarded?: boolean
  request: SDKControlRequest
}

/**
 * Provides a structured way to read and write SDK messages from stdio,
 * capturing the SDK protocol.
 */
// Maximum number of resolved tool_use IDs to track. Once exceeded, the oldest
// entry is evicted. This bounds memory in very long sessions while keeping
// enough history to catch duplicate control_response deliveries.
const MAX_RESOLVED_TOOL_USE_IDS = 1000


const claimIngress287=createClaimIngressNative287({ne:logForDiagnosticsNoPII,ke:message=>({type:message.type})})

export class StructuredIO {
  isRemoteTransport():boolean{return isLocalHostRemoteTransport287.call(this)}
  sendUiHostRequest<T>(request:UiHostRequest287,schema:z.Schema<T>,timeout:number):Promise<T|undefined>{
    return createSendUiHostRequest287(getPrintUiHostGate287).call(this,request,schema,timeout) as Promise<T|undefined>
  }
  hostAnswersElicitations = true
  readonly hostOwnsStdinOrigin: boolean = true
  readonly persistsOutboundFrames: boolean = false
  get isHostedWorker(): boolean { return false }
  readonly structuredInput!: AsyncGenerator<StdinMessage | SDKMessage | WorkflowLaunchEvent287>
  private readonly pendingRequests = new Map<string, PendingRequest<unknown>>()
  // Original Cie metadata fields on this same IO (not another pending-request owner).
  private readonly publishedPendingActionDetails=new Map<string,RequiresActionDetails>()
  private readonly backgroundPromptIds=new Set<string>()
  private readonly streamCloseInterruptRequestIds=new Set<string>()
  private readonly hostDialogAttestations=new Map<string,boolean>()
  private readonly timedOutUserDialogs=new Map<string,{dialogKind:string;timedOutAt:number}>()
  private readonly unansweredSettleHandlers=new Map<string,(reason:'moved_on'|'deadline')=>void>()
  readonly sessionState!:PermissionSessionState287
  private readonly requestPending=createSignal()
  private repliesLeftForNextProcess=0
  private onStreamClosedWithParkedQuestion?:()=>void
  private flipBackLeftToUnpublishedAsk=false
  private mainLoopLiveness?:()=>boolean
  private sdkHostHookGeneration = 0
  private retiredHostHookAnswer?: (input: HookInput) => HookJSONOutput

  // CCR external_metadata read back on worker start; null when the
  // transport doesn't restore. Assigned by RemoteIO.
  restoredWorkerState: Promise<SessionWorkerState287 | null> =
    Promise.resolve(null)

  private inputClosed = false
  private unexpectedResponseCallback?: (
    response: SDKControlResponse,
  ) => Promise<void>

  // Tracks tool_use IDs that have been resolved through the normal permission
  // flow (or aborted by a hook). When a duplicate control_response arrives
  // after the original was already handled, this Set prevents the orphan
  // handler from re-processing it — which would push duplicate assistant
  // messages into mutableMessages and cause a 400 "tool_use ids must be unique"
  // error from the API.
  private readonly resolvedToolUseIds = new Set<string>()
  private prependedLines: string[] = []
  private readonly locallyPrependedMessages = new WeakSet<object>()
  private prependWaker:(()=>void)|null=null
  private hasUnconsumedInput=false
  private readonly maxLineChars!:number
  private stallTimer?:ReturnType<typeof setTimeout>
  private stallFired=false
  private readonly createdAt=Date.now()
  private sdkSchemaStretchSampled?:boolean
  private readonly sdkSchemaKept=new Map<string,{frames:number;json:string|undefined}>()
  private sdkSchemaResultWritten=false
  private sdkSchemaCheckTimer?:ReturnType<typeof setTimeout>
  private readonly heldUntilInit:StdoutMessage[]=[]
  resultDelivery?:{stamp(message:StdoutMessage):StdoutMessage}
  onCommandLifecycle?:(uuid:string,state:'discarded'|'started'|'completed')=>void
  private onControlRequestSent?: (request: SDKControlRequest) => void
  private onControlRequestResolved?: (requestId: string) => void

  // sendRequest() and print.ts both enqueue here; the drain loop is the
  // only writer. Prevents control_request from overtaking queued stream_events.
  readonly outbound = new Stream<StdoutMessage>()

  constructor(
    private readonly input: AsyncIterable<string>,
    private readonly replayUserMessages?: boolean,
    sessionState?:PermissionSessionState287,
  ) {
    getSDKPermissionHostMethods287().initialize.call(this,input,replayUserMessages,sessionState)
  }

  /**
   * Records a tool_use ID as resolved so that late/duplicate control_response
   * messages for the same tool are ignored by the orphan handler.
   */
  private trackResolvedToolUseId(request: SDKControlRequest): void {
    if (request.request.subtype === 'can_use_tool') {
      this.resolvedToolUseIds.add(request.request.tool_use_id)
      if (this.resolvedToolUseIds.size > MAX_RESOLVED_TOOL_USE_IDS) {
        // Evict the oldest entry (Sets iterate in insertion order)
        const first = this.resolvedToolUseIds.values().next().value
        if (first !== undefined) {
          this.resolvedToolUseIds.delete(first)
        }
      }
    }
  }

  /** Flush pending internal events. No-op for non-remote IO. Overridden by RemoteIO. */
  flushInternalEvents(): Promise<void> {
    return Promise.resolve()
  }

  // Original Mre base contract; RemoteIO overrides with real confirmation.
  flushSessionState(): Promise<boolean> { return Promise.resolve(true) }

  /** Internal-event queue depth. Overridden by RemoteIO; zero otherwise. */
  get internalEventsPending(): number {
    return 0
  }

  /**
   * Queue a user turn to be yielded before the next message from this.input.
   * Works before iteration starts and mid-stream — read() re-checks
   * prependedLines between each yielded message.
   */
  prependUserMessage(content: string): void {
    claimIngress287.prependUserMessage.call(this as unknown as ClaimIngressHost287,content)
  }

  isLocallyPrependedMessage(message:object):boolean {
    return claimIngress287.isLocallyPrependedMessage.call(this as unknown as ClaimIngressHost287,message)
  }

  private read() {
    return getSDKPermissionHostMethods287().read.call(this)
  }

  private async exitOnFatalInput(message:string):Promise<void> {
    process.stderr.write(message+'\n')
    await gracefulShutdown(1)
  }

  setOnStreamClosedWithParkedQuestion(callback:()=>void):void {getSDKPermissionHostMethods287().setOnStreamClosedWithParkedQuestion.call(this,callback)}
  onRequestPending(callback:()=>void):()=>void {return getSDKPermissionHostMethods287().onRequestPending.call(this,callback)}
  hasPendingRequests():boolean {return getSDKPermissionHostMethods287().hasPendingRequests.call(this)}
  requestUserDialog(...args:Parameters<import('../utils/permissions/officialSDKPermission287/native.js').SDKPermissionHostMethods287['requestUserDialog']>):ReturnType<import('../utils/permissions/officialSDKPermission287/native.js').SDKPermissionHostMethods287['requestUserDialog']>{return getSDKPermissionHostMethods287().requestUserDialog.call(this,...args)}
  cancelPendingUserDialogs(kind:string,reason:string):number{return getSDKPermissionHostMethods287().cancelPendingUserDialogs.call(this,kind,reason)}
  private cancelDialogByMachine(id:string,reason:'moved_on'|'deadline'):boolean{return getSDKPermissionHostMethods287().cancelDialogByMachine.call(this,id,reason)}
  private ignoresErrorShapedDialogResponse(request:PendingRequest<unknown>,response:SDKControlResponse['response']):boolean{return getSDKPermissionHostMethods287().ignoresErrorShapedDialogResponse.call(this,request,response)}
  setMainLoopLiveness(callback:()=>boolean):void {getSDKPermissionHostMethods287().setMainLoopLiveness.call(this,callback)}
  private asksOurHuman(request:PendingRequest<unknown>):boolean {return getSDKPermissionHostMethods287().asksOurHuman.call(this,request)}
  private enqueueCancelRequest(id:string):void {getSDKPermissionHostMethods287().enqueueCancelRequest.call(this,id)}

  getPendingPermissionRequests() {
    return Array.from(this.pendingRequests.values())
      .map(entry => entry.request)
      .filter(pr => pr.request.subtype === 'can_use_tool')
  }

  getPendingUserDialogRequests() {
    return Array.from(this.pendingRequests.values())
      .map(entry => entry.request)
      .filter(request => request.request.subtype === 'request_user_dialog')
  }

  /** Official Mre retirement: resolve conservative schema-checked outputs,
   * not rejection (ordinary callback errors otherwise become {}). AP gates
   * invocation on hostOwnsStdinOrigin and an explicitly supplied hook set.
   */
  retireSdkHostHookCallbacks(answer: (input: HookInput) => HookJSONOutput): number {
    this.sdkHostHookGeneration++
    this.retiredHostHookAnswer = answer
    let count = 0
    for (const [requestId, pending] of Array.from(this.pendingRequests)) {
      const request = pending.request.request
      if (request.subtype !== 'hook_callback') continue
      const output = answer(request.input)
      const parsed = pending.schema ? pending.schema.parse(output) : output
      this.pendingRequests.delete(requestId)
      this.outbound.enqueue({ type: 'control_cancel_request', request_id: requestId })
      pending.resolve(parsed)
      count++
    }
    return count
  }

  setUnexpectedResponseCallback(
    callback: (response: SDKControlResponse) => Promise<void>,
  ): void {
    this.unexpectedResponseCallback = callback
  }

  /**
   * Inject a control_response message to resolve a pending permission request.
   * Used by the bridge to feed permission responses from claude.ai into the
   * SDK permission flow.
   *
   * Also sends a control_cancel_request to the SDK consumer so its canUseTool
   * callback is aborted via the signal — otherwise the callback hangs.
   */
  injectControlResponse(response: SDKControlResponse): boolean {
    const requestId = response.response?.request_id
    if (!requestId) return false
    const request = this.pendingRequests.get(requestId)
    if (!request) return false
    if(this.ignoresErrorShapedDialogResponse(request,response.response))return false
    if(getSDKPermissionHostMethods287().ignoresResponseAtShutdown.call(this,request,response.response))return false
    this.trackResolvedToolUseId(request.request)
    this.pendingRequests.delete(requestId)
    // Cancel the SDK consumer's canUseTool callback — the bridge won.
    void this.write({
      type: 'control_cancel_request',
      request_id: requestId,
    })
    if (response.response.subtype === 'error') {
      request.reject(new Error(response.response.error))
    } else {
      const result = response.response.response
      if (request.schema) {
        try {
          request.resolve(request.schema.parse(result))
        } catch (error) {
          request.reject(error)
        }
      } else {
        request.resolve({})
      }
    }
    return true
  }

  /**
   * Register a callback invoked whenever a can_use_tool control_request
   * is written to stdout. Used by the bridge to forward permission
   * requests to claude.ai.
   */
  setOnControlRequestSent(
    callback: ((request: SDKControlRequest) => void) | undefined,
  ): void {
    this.onControlRequestSent = callback
  }

  /**
   * Register a callback invoked when a can_use_tool control_response arrives
   * from the SDK consumer (via stdin). Used by the bridge to cancel the
   * stale permission prompt on claude.ai when the SDK consumer wins the race.
   */
  setOnControlRequestResolved(
    callback: ((requestId: string) => void) | undefined,
  ): void {
    this.onControlRequestResolved = callback
  }

  private async processLine(
    line: string,
  ): Promise<StdinMessage | SDKMessage | WorkflowLaunchEvent287 | undefined> {
    // Skip empty lines (e.g. from double newlines in piped stdin)
    if (!line) {
      return undefined
    }
    try {
      const message = normalizeControlMessageKeys(jsonParse(line)) as
        | StdinMessage
        | SDKMessage
        | WorkflowLaunchEvent287
      if (message.type === 'keep_alive') {
        // Silently ignore keep-alive messages
        return undefined
      }
      if (message.type === 'update_environment_variables') {
        // Apply environment variable updates directly to process.env.
        // Used by bridge session runner for auth token refresh
        // (CLAUDE_CODE_SESSION_ACCESS_TOKEN) which must be readable
        // by the REPL process itself, not just child Bash commands.
        const keys = Object.keys(message.variables)
        for (const [key, value] of Object.entries(message.variables)) {
          process.env[key] = value
        }
        logForDebugging(
          `[structuredIO] applied update_environment_variables: ${keys.join(', ')}`,
        )
        return undefined
      }
      if (message.type === 'control_response') {
        const pendingAtShutdown=this.pendingRequests.get(message.response.request_id)
        if(pendingAtShutdown&&getSDKPermissionHostMethods287().ignoresResponseAtShutdown.call(this,pendingAtShutdown,message.response))return undefined
        // Close lifecycle for every control_response, including duplicates
        // and orphans — orphans don't yield to print.ts's main loop, so this
        // is the only path that sees them. uuid is server-injected into the
        // payload.
        const uuid =
          'uuid' in message && typeof message.uuid === 'string'
            ? message.uuid
            : undefined
        if (uuid) {
          notifyCommandLifecycle(uuid, 'completed')
        }
        const request = this.pendingRequests.get(message.response.request_id)
        if(request&&this.ignoresErrorShapedDialogResponse(request,message.response))return undefined
        if (!request) {
          if(this.timedOutUserDialogs.has(message.response.request_id)){
            await getSDKPermissionHostMethods287().settleUnknownResponse.call(this,message,uuid)
            return undefined
          }
          // Check if this tool_use was already resolved through the normal
          // permission flow. Duplicate control_response deliveries (e.g. from
          // WebSocket reconnects) arrive after the original was handled, and
          // re-processing them would push duplicate assistant messages into
          // the conversation, causing API 400 errors.
          const responsePayload =
            message.response.subtype === 'success'
              ? message.response.response
              : undefined
          const toolUseID = responsePayload?.toolUseID
          if (
            typeof toolUseID === 'string' &&
            this.resolvedToolUseIds.has(toolUseID)
          ) {
            logForDebugging(
              `Ignoring duplicate control_response for already-resolved toolUseID=${toolUseID} request_id=${message.response.request_id}`,
            )
            return undefined
          }
          if (this.unexpectedResponseCallback) {
            await this.unexpectedResponseCallback(message)
          }
          return undefined // Ignore responses for requests we don't know about
        }
        this.trackResolvedToolUseId(request.request)
        this.pendingRequests.delete(message.response.request_id)
        // Notify the bridge when the SDK consumer resolves a can_use_tool
        // request, so it can cancel the stale permission prompt on claude.ai.
        if (
          request.request.request.subtype === 'can_use_tool' &&
          this.onControlRequestResolved
        ) {
          this.onControlRequestResolved(message.response.request_id)
        }

        if (message.response.subtype === 'error') {
          request.reject(new Error(message.response.error))
          return undefined
        }
        const result = message.response.response
        if (request.schema) {
          try {
            request.resolve(request.schema.parse(result))
          } catch (error) {
            request.reject(error)
          }
        } else {
          request.resolve({})
        }
        // Propagate control responses when replay is enabled
        if (this.replayUserMessages) {
          return message
        }
        return undefined
      }
      if (
        message.type !== 'user' &&
        message.type !== 'control_request' &&
        message.type !== 'control_cancel_request' &&
        message.type !== 'assistant' &&
        message.type !== 'system' &&
        message.type !== 'workflow_launch'
      ) {
        logForDebugging(`Ignoring unknown message type: ${message.type}`, {
          level: 'warn',
        })
        return undefined
      }
      // Original Mre.processLine: server launch frames go intact to Css.
      if (message.type === 'workflow_launch') return message
      if (message.type === 'control_request') {
        if (!message.request) {
          exitWithMessage(`Error: Missing request on control_request`)
        }
        return message
      }
      // Official Mre.processLine forwards only well-formed cancellation IDs;
      // the print loop owns the in-flight request, not the transport.
      if (message.type === 'control_cancel_request') {
        return typeof message.request_id === 'string' ? message : undefined
      }
      if (message.type === 'assistant' || message.type === 'system') {
        return message
      }
      if (message.message.role !== 'user') {
        exitWithMessage(
          `Error: Expected message role 'user', got '${message.message.role}'`,
        )
      }
      return message
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole:: intentional console output
      console.error(`Error parsing streaming input line: ${line}: ${error}`)
      // eslint-disable-next-line custom-rules/no-process-exit
      process.exit(1)
    }
  }

  async write(message: StdoutMessage): Promise<void> {
    await getSDKPermissionHostMethods287().write.call(this,message)
  }
  passControlRequestToHost<Response>(request:SDKControlRequest['request'],options:{requestId:string;schema:z.Schema<Response>;signal?:AbortSignal}):Promise<Response>{
    return getSDKPermissionHostMethods287().passControlRequestToHost.call(this,request,options) as Promise<Response>
  }
  requestOAuthTokenRefresh():Promise<string|null>{
    return getSDKPermissionHostMethods287().requestOAuthTokenRefresh.call(this)
  }
  trackWrite(message:StdoutMessage):StdoutMessage{return getSDKPermissionHostMethods287().trackWrite.call(this,message)}
  sampleForSdkSchemaCheck(message:StdoutMessage):void{getSDKPermissionHostMethods287().sampleForSdkSchemaCheck.call(this,message)}
  sdkSchemaFramesKept():boolean{return getSDKPermissionHostMethods287().sdkSchemaFramesKept.call(this)}
  endSdkSchemaStretch():void{getSDKPermissionHostMethods287().endSdkSchemaStretch.call(this)}
  armSdkSchemaCheck():void{getSDKPermissionHostMethods287().armSdkSchemaCheck.call(this)}
  writeAfterInit(message:StdoutMessage):void{getSDKPermissionHostMethods287().writeAfterInit.call(this,message)}
  private heldDueBefore(message:StdoutMessage):StdoutMessage[]{return getSDKPermissionHostMethods287().heldDueBefore.call(this,message)}
  private heldDueAfter(message:StdoutMessage):StdoutMessage[]{return getSDKPermissionHostMethods287().heldDueAfter.call(this,message)}
  private writeHeld(messages:StdoutMessage[]):Promise<void>{return getSDKPermissionHostMethods287().writeHeld.call(this,messages)}

  private sendRequest<Response>(
    request:SDKControlRequest['request'],schema:z.Schema,signal?:AbortSignal,
    requestIdOrOptions:string|{requestId?:string;forwarded?:boolean;deviceHook?:boolean}=randomUUID(),
  ):Promise<Response> {
    const options=typeof requestIdOrOptions==='string'?{requestId:requestIdOrOptions}:requestIdOrOptions
    return getSDKPermissionHostMethods287().sendRequestPendingFirst.call(this,request,schema,signal,options) as Promise<Response>
  }

  createCanUseTool(onPermissionPrompt?: (details:RequiresActionDetails)=>void,caller:SDKPermissionCaller287=getPermissionOuter287().k6):CanUseToolFn {
    return getSDKPermissionHostMethods287().createCanUseTool.call(this,caller,onPermissionPrompt)
  }
  private permissionPromptHost(onPrompt?: (details:RequiresActionDetails)=>void) {
    return getSDKPermissionHostMethods287().permissionPromptHost.call(this,onPrompt)
  }
  private emitPermissionDenied(...args:Parameters<import('../utils/permissions/officialSDKPermission287/native.js').SDKPermissionHost287['emitPermissionDenied']>):void {
    getSDKPermissionHostMethods287().emitPermissionDenied.call(this,...args)
  }
  private settlePermissionPrompt(id:string,nested?:string):void {getSDKPermissionHostMethods287().settlePermissionPrompt.call(this,id,nested)}
  private settlePublishedPrompt(id:string,retee:boolean):void {getSDKPermissionHostMethods287().settlePublishedPrompt.call(this,id,retee)}
  hasPendingPrompt():boolean{return getSDKPermissionHostMethods287().hasPendingPrompt.call(this)}
  hasStandingPrompt():boolean{return getSDKPermissionHostMethods287().hasStandingPrompt.call(this)}
  hasTurnPrompt():boolean{return getSDKPermissionHostMethods287().hasTurnPrompt.call(this)}
  private republishSurvivingPendingAction():void{getSDKPermissionHostMethods287().republishSurvivingPendingAction.call(this)}
  private flipBackFromRequiresAction():void{getSDKPermissionHostMethods287().flipBackFromRequiresAction.call(this)}

  createHookCallback(callbackId: string, timeout?: number): HookCallback {
    const generation = this.sdkHostHookGeneration
    return {
      type: 'callback',
      timeout,
      callback: async (
        input: HookInput,
        toolUseID: string | null,
        abort: AbortSignal | undefined,
      ): Promise<HookJSONOutput> => {
        if (generation !== this.sdkHostHookGeneration && this.retiredHostHookAnswer) {
          return this.retiredHostHookAnswer(input)
        }
        try {
          const result = await this.sendRequest<HookJSONOutput>(
            {
              subtype: 'hook_callback',
              callback_id: callbackId,
              input,
              tool_use_id: toolUseID || undefined,
            },
            hookJSONOutputSchema(),
            abort,
          )
          return result
        } catch (error) {
          // Official Ye also recognizes Axios cancellation-shaped Error values.
          if (isAbortError(error) || (error instanceof Error && '__CANCEL__' in error && Boolean(error.__CANCEL__))) {
            throw error
          }
          // biome-ignore lint/suspicious/noConsole:: intentional console output
          console.error(`Error in hook callback ${callbackId}:`, error)
          return {}
        }
      },
    }
  }

  /**
   * Sends an elicitation request to the SDK consumer and returns the response.
   */
  async handleElicitation(
    serverName: string,
    message: string,
    requestedSchema?: Record<string, unknown>,
    signal?: AbortSignal,
    mode?: 'form' | 'url',
    url?: string,
    elicitationId?: string,
  ): Promise<ElicitResult> {
    if(!this.hostAnswersElicitations)return {action:'cancel'}
    try {
      const result = await this.sendRequest<ElicitResult>(
        {
          subtype: 'elicitation',
          mcp_server_name: serverName,
          message,
          mode,
          url,
          elicitation_id: elicitationId,
          requested_schema: requestedSchema,
        },
        SDKControlElicitationResponseSchema(),
        signal,
      )
      return result
    } catch {
      return { action: 'cancel' as const }
    }
  }

  /**
   * Creates a SandboxAskCallback that forwards sandbox network permission
   * requests to the SDK host as can_use_tool control_requests.
   *
   * This piggybacks on the existing can_use_tool protocol with a synthetic
   * tool name so that SDK hosts (VS Code, CCR, etc.) can prompt the user
   * for network access without requiring a new protocol subtype.
   */
  createSandboxAskCallback(): (hostPattern: {
    host: string
    port?: number
  }) => Promise<boolean> {
    return async (hostPattern): Promise<boolean> => {
      try {
        const result = await this.sendRequest<PermissionToolOutput>(
          {
            subtype: 'can_use_tool',
            tool_name: SANDBOX_NETWORK_ACCESS_TOOL_NAME,
            input: { host: hostPattern.host },
            tool_use_id: randomUUID(),
            description: `Allow network connection to ${hostPattern.host}?`,
          },
          permissionToolOutputSchema(),
        )
        return result.behavior === 'allow'
      } catch {
        // If the request fails (stream closed, abort, etc.), deny the connection
        return false
      }
    }
  }

  /**
   * Sends an MCP message to an SDK server and waits for the response
   */
  async sendMcpMessage(
    serverName: string,
    message: JSONRPCMessage,
  ): Promise<JSONRPCMessage> {
    const response = await this.sendRequest<{ mcp_response: JSONRPCMessage }>(
      {
        subtype: 'mcp_message',
        server_name: serverName,
        message,
      },
      z.object({
        mcp_response: z.any() as z.Schema<JSONRPCMessage>,
      }),
    )
    return response.mcp_response
  }
}

function exitWithMessage(message: string): never {
  // biome-ignore lint/suspicious/noConsole:: intentional console output
  console.error(message)
  // eslint-disable-next-line custom-rules/no-process-exit
  process.exit(1)
}
