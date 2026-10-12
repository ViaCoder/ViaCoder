import { UnauthorizedError } from '@modelcontextprotocol/sdk/client/auth.js'
import { feature } from 'bun:bundle'
import type { PromptMessage } from '@modelcontextprotocol/sdk/types.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import type { Command } from '../../commands.js'
import type { Tool } from '../../Tool.js'
import { MCPTool } from '../../tools/MCPTool/MCPTool.js'
import { ReadMcpResourceTool } from '../../tools/ReadMcpResourceTool/ReadMcpResourceTool.js'
import { isClaudeInChromeMCPServer } from '../../utils/claudeInChrome/common.js'
import { classifyMcpToolForCollapse } from '../../tools/MCPTool/classifyForCollapse.js'
import { createMcpGenerationSelector } from '../../vendor/official-mcp-v2/index.mjs'
import { jsonStringify } from '../../utils/slowOperations.js'
import { recursivelySanitizeUnicode } from '../../utils/sanitization.js'
import { hasMcpDiscoveryButNoToken } from './auth.js'
import { getAllMcpConfigs, isMcpServerDisabled } from './config.js'
import { buildMcpToolName } from './mcpStringUtils.js'
import { normalizeNameForMCP } from './normalization.js'
import { McpReconnectSupervisor,type OriginalMcpRetryRuntime287 } from './reconnectSupervisor.js'
import {readMcpRetryBindings287,readMcpRetryClock287} from './officialRetry287/readers.js'
import type {RetryClock287,RetryState287,RetryResult287} from './officialRetry287/native.js'
import type { ConnectedMCPServerV2, CachedMCPServer, NeedsAuthMCPServer, ScopedMcpServerConfig, ServerResource } from './types.js'
import { connectToServerV2, type ConnectV2Options } from './v2Connection.js'
import {registerMcpConnectedProducer287,getMcpConnectedProducer287,adaptNativeModernConnection287,memoizeMcpList287} from './connectedProducer287.js'
import { fetchMcpSkillsForClient, hasConfirmedMcpSkillResourceRoot, mcpSkillsEnabled } from '../../skills/mcpSkills.js'

const chromeToolRendering = () =>
  require('../../utils/claudeInChrome/toolRendering.js') as typeof import('../../utils/claudeInChrome/toolRendering.js')
const computerUse = feature('CHICAGO_MCP')
  ? () => require('../../utils/computerUse/wrapper.js') as typeof import('../../utils/computerUse/wrapper.js')
  : undefined
const isComputerUseMCPServer = feature('CHICAGO_MCP')
  ? (require('../../utils/computerUse/common.js') as typeof import('../../utils/computerUse/common.js')).isComputerUseMCPServer
  : undefined

/** Official 2.1.283 references: nm1jfrzb ux (latched arm), dh7k2cqj m
 * (tree tripwire), w61ke47p Ct/nn (dial), to/yo (discovery), Ep/wp (raw
 * requests), ep/qt/Zi (cache/close), and gg4jhzsm Pn (permission shape).
 * This is a typed service lifecycle; it never aliases the V2 SDK as V1. */
export type McpSdkGeneration = 'v1' | 'v2'
const selector = createMcpGenerationSelector({
  getGate: () => ({ value: getFeatureValue_CACHED_MAY_BE_STALE('tengu_brindle_causeway', true), source: 'growthbook' }),
})
export function resolveMcpSdkGeneration(): McpSdkGeneration { return selector.resolve() }

export type V2ConnectionState = ConnectedMCPServerV2 | NeedsAuthMCPServer
export type V2Projection = { connection: ConnectedMCPServerV2; tools: Tool[]; commands: Command[]; resources: ServerResource[] }
type Dial = (name: string, config: ScopedMcpServerConfig, options: ConnectV2Options) => Promise<ConnectedMCPServerV2>

export type V2LifecycleOptions = {
  reconnectSupervisor287?:McpReconnectSupervisor
  /** Owner's authVersion or equivalent; identity changes invalidate every cached dial. */
  getIdentityEpoch: () => unknown
  resolveConfig?: (name: string) => Promise<ScopedMcpServerConfig | undefined>
  isDisabled?: (name: string) => boolean
  isAuthCached?: (name: string, config: ScopedMcpServerConfig) => Promise<boolean>
  markNeedsAuth?: (name: string, config: ScopedMcpServerConfig) => void | Promise<void>
  dial?: Dial
  onConnection?: (name: string, state: V2ConnectionState | { type: 'disconnected' }) => void
  onReconnect?: (result:Extract<import('./v2Production.js').SelectedMcpDiscovery,{generation:'v2'}>) => void
  autoReconnect?: boolean
  retryClock287?:RetryClock287
  onRetryState287?:(state:RetryState287)=>void
  onRetryNotice287?:(notice:import('../../context/notifications.js').Notification)=>void
}

function isAuthenticationError(error: unknown): boolean {
  if (error instanceof UnauthorizedError) return true
  if (!error || typeof error !== 'object') return false
  const value = error as { status?: unknown; code?: unknown; cause?: unknown }
  return value.status === 401 || value.status === 403 || value.code === 401 || value.code === 403 ||
    value.code === '401' || value.code === '403' || (value.cause !== error && isAuthenticationError(value.cause))
}

function awaitWithSignal<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return promise
  signal.throwIfAborted()
  return new Promise<T>((resolve, reject) => {
    const abort = () => { signal.removeEventListener('abort', abort); reject(signal.reason) }
    signal.addEventListener('abort', abort, { once: true })
    promise.then(value => { signal.removeEventListener('abort', abort); resolve(value) },
      error => { signal.removeEventListener('abort', abort); reject(error) })
  })
}

type LifecycleDial287 = Promise<V2ConnectionState> & {owner:McpV2Lifecycle;name:string;config:ScopedMcpServerConfig;key:string;epoch:unknown;abort:AbortController;promise:Promise<V2ConnectionState>;connection?:ConnectedMCPServerV2;settled?:boolean}

export class McpV2Lifecycle {
  private dialCache287(){return getMcpConnectedProducer287().cache().connections as Map<string,LifecycleDial287>}
  private currentDial287(name:string){return [...this.dialCache287().values()].find(dial=>dial.owner===this&&dial.name===name)}
  private discovering = new Map<string, Set<AbortController>>()
  // Per-connection dedupe; `discovering` above separately tracks all still
  // active controllers by name so invalidate also reaches superseded flights.
  private discoveryFlights = new WeakMap<ConnectedMCPServerV2, {
    abort: AbortController; promise: Promise<V2Projection>; waiters: number
  }>()
  private supervisor:McpReconnectSupervisor
  private disposed = false
  private readonly resolveConfig: NonNullable<V2LifecycleOptions['resolveConfig']>
  private readonly isDisabled: NonNullable<V2LifecycleOptions['isDisabled']>
  private readonly isAuthCached: NonNullable<V2LifecycleOptions['isAuthCached']>
  private readonly markNeedsAuth: NonNullable<V2LifecycleOptions['markNeedsAuth']>
  private readonly dial: Dial

  constructor(private readonly options: V2LifecycleOptions) {
    this.supervisor=options.reconnectSupervisor287??new McpReconnectSupervisor()
    this.resolveConfig = options.resolveConfig ?? (async name => (await getAllMcpConfigs()).servers[name])
    this.isDisabled = options.isDisabled ?? isMcpServerDisabled
    this.isAuthCached = options.isAuthCached ?? (async (name, config) => {
      const { isMcpAuthCached } = await import('./client.js')
      return await isMcpAuthCached(name) ||
        ((config.type === 'http' || config.type === 'sse') && hasMcpDiscoveryButNoToken(name, config))
    })
    this.markNeedsAuth = options.markNeedsAuth ?? (async (name, config) => {
      if (config.type !== 'http' && config.type !== 'sse') return
      const { handleRemoteAuthFailure } = await import('./client.js')
      handleRemoteAuthFailure(name, config, config.type)
    })
    this.dial = options.dial ?? connectToServerV2
  }

  private async validated(name: string, config: ScopedMcpServerConfig): Promise<void> {
    if (this.disposed) throw new Error('MCP V2 lifecycle disposed')
    if (this.isDisabled(name)) throw new Error(`MCP server "${name}" is disabled`)
    const current = await this.resolveConfig(name)
    if (!current || current.scope !== config.scope || jsonStringify(current) !== jsonStringify(config))
      throw new Error(`MCP server "${name}" was removed, changed, or blocked by policy`)
  }

  connect(name: string, config: ScopedMcpServerConfig, options: ConnectV2Options = {}): Promise<V2ConnectionState> {
    registerMcpConnectedProducer287('v2')
    if(!this.options.dial&&!options.transport)return this.connectSource287(name,config,options);
    const epoch=this.options.getIdentityEpoch(),key=jsonStringify(config)
    const current=this.currentDial287(name)
    if(current&&current.key===key&&current.epoch===epoch&&(!current.connection||!current.connection.isClosed()))
      return this.validated(name,config).then(()=>awaitWithSignal(current.promise,options.signal))
    const abort = new AbortController()
    const signal = options.signal ? AbortSignal.any([options.signal, abort.signal]) : abort.signal
    let tracked:LifecycleDial287
    const work = (async (): Promise<V2ConnectionState> => {
      signal.throwIfAborted()
      await this.validated(name,config)
      if(current){current.abort.abort(new Error(`MCP server "${name}" connection superseded`));if(current.connection)await current.connection.cleanup()}
      signal.throwIfAborted()
      if (await this.isAuthCached(name, config)) {
        signal.throwIfAborted()
        await this.validated(name, config)
        if (this.options.getIdentityEpoch() !== epoch) throw new Error(`MCP server "${name}" identity changed during connect`)
        const state: NeedsAuthMCPServer = { name, config, type: 'needs-auth' }
        this.options.onConnection?.(name, state)
        return state
      }
      signal.throwIfAborted()
      await this.validated(name, config)
      let connection: ConnectedMCPServerV2
      try {
        connection = await this.dial(name, config, { ...options, signal })
      } catch (error) {
        signal.throwIfAborted()
        if (isAuthenticationError(error)) {
          await this.markNeedsAuth(name, config)
          await this.validated(name, config)
          if (this.options.getIdentityEpoch() !== epoch) throw new Error(`MCP server "${name}" identity changed during connect`)
          const state: NeedsAuthMCPServer = { name, config, type: 'needs-auth' }
          this.options.onConnection?.(name, state)
          return state
        }
        throw error
      }
      if (this.options.getIdentityEpoch() !== epoch || this.disposed || signal.aborted) {
        await connection.cleanup()
        signal.throwIfAborted()
        throw new Error(`MCP server "${name}" identity changed during connect`)
      }
      try { await this.validated(name, config) } catch (error) { await connection.cleanup(); throw error }
      if (signal.aborted || this.options.getIdentityEpoch() !== epoch) {
        await connection.cleanup()
        signal.throwIfAborted()
        throw new Error(`MCP server "${name}" identity changed during connect`)
      }
      const source=getMcpConnectedProducer287()
      if(source.isSuperseded(tracked)||source.cache().connections.get(source.cacheKey(name,config))!==tracked){
        await connection.cleanup()
        throw new Error(`MCP server "${name}" dial superseded`)
      }
      // Native modern cached-row cleanup expects its original modern `client` field.
      Object.defineProperty(connection,'client',{configurable:true,get:()=>connection.v2Client})
      const previousOnclose = connection.v2Client.onclose
      connection.ensureConnectedClient287 = options => this.connect(name, config, {
        signal: options?.signal, timeoutMs: options?.timeoutMs,
      })
      connection.v2Client.onclose = () => {
        previousOnclose?.()
        if (this.currentDial287(name)?.connection !== connection) return
        this.dialCache287().delete(getMcpConnectedProducer287().cacheKey(name,config))
        this.options.onConnection?.(name, { type: 'disconnected' })
        if (this.options.autoReconnect !== false && (config.type === 'http' || config.type === 'sse') && !this.disposed)
          void this.supervisor.start(name, async signal => {
            if (this.options.getIdentityEpoch() !== epoch || signal.aborted) return true
            try {
              const result = await this.connect(name, config, { signal })
              return result.type === 'connected' || result.type === 'needs-auth'
            } catch { return false }
          })
      }
      tracked.connection=connection
      this.options.onConnection?.(name, connection)
      return connection
    })()
    tracked=Object.assign(work,{owner:this,name,config,key,epoch,abort,promise:work})
    this.dialCache287().set(getMcpConnectedProducer287().cacheKey(name,config),tracked)
    void work.then(()=>{tracked.settled=true},()=>{tracked.settled=true})
    return tracked
  }

  /** Original Et Promise remains qt's value. Lifecycle metadata is attached to
   * that exact Promise, never a preinstalled wrapper that Et would await itself. */
  adoptSourceConnection287(connection:ConnectedMCPServerV2):void {
    const source=getMcpConnectedProducer287(),cacheKey=source.cacheKey(connection.name,connection.config),promise=source.cache().connections.get(cacheKey);
    if(!promise||this.disposed)return;
    const previous=this.currentDial287(connection.name);
    if(previous?.connection===connection)return;
    this.supervisor.settledConnected287(connection.name);
    const tracked=Object.assign(promise,{owner:this,name:connection.name,config:connection.config,key:jsonStringify(connection.config),epoch:this.options.getIdentityEpoch(),abort:previous?.abort??new AbortController(),promise,connection}) as LifecycleDial287;
    connection.ensureConnectedClient287=options=>this.connect(connection.name,connection.config,options);
    const onclose=connection.v2Client.onclose;
    connection.v2Client.onclose=()=>{
      // Original Et.onclose evicts qt's dial before returning. Capture ownership
      // first, but let that complete original cleanup run before publication.
      const owned=this.currentDial287(connection.name)===tracked;
      onclose?.();
      if(!owned||this.disposed||tracked.abort.signal.aborted)return;
      const replacement=this.currentDial287(connection.name);
      if(replacement&&replacement!==tracked)return;
      this.options.onConnection?.(connection.name,{type:'disconnected'});
      if(this.options.autoReconnect!==false&&!this.disposed&&(connection.config.type==='http'||connection.config.type==='sse'))
        this.supervisor.startClose287(connection,this.sourceRetryRuntime287(tracked.epoch));
    };
  }

  private sourceRetryRuntime287(epoch:unknown):OriginalMcpRetryRuntime287 {
    const source=getMcpConnectedProducer287()
    return {...readMcpRetryBindings287(),Ut:this.options.retryClock287??readMcpRetryClock287(),
      isCancelled:()=>this.disposed||this.options.getIdentityEpoch()!==epoch,
      Do:state=>this.options.onRetryState287?.(state),
      qo:result=>this.options.onReconnect?.(result),
      No:notice=>this.options.onRetryNotice287?.(notice),
      Ql:()=>({clearServerCache:source.clearServerModern,
        reconnectMcpServerImpl:(name,config,storageV5,credentials)=>this.reconnectSource287(name,config,{storageV5,credentials})}),
    }
  }
  /** Full original TX/rTe case, same existing supervisor and source ho. */
  retryInitialFailure287(result:RetryResult287):void {
    if(result.client.type!=='failed'||this.disposed||this.options.autoReconnect===false||this.isDisabled(result.client.name))return
    this.supervisor.scheduleInitial287(result.client,this.sourceRetryRuntime287(this.options.getIdentityEpoch()))
  }
  /** Complete original modern ho, using the same Et/qt cache and SDK object.
   * Only lifecycle identity/abort and generation carriers belong to this host. */
  reconnect(name:string,config:ScopedMcpServerConfig,options:{signal?:AbortSignal;storageV5?:unknown;credentials?:unknown}={}):Promise<Extract<import('./v2Production.js').SelectedMcpDiscovery,{generation:'v2'}>> {
    this.supervisor.cancel(name)
    return this.reconnectSource287(name,config,options)
  }

  private async reconnectSource287(name:string,config:ScopedMcpServerConfig,options:{signal?:AbortSignal;storageV5?:unknown;credentials?:unknown}):Promise<Extract<import('./v2Production.js').SelectedMcpDiscovery,{generation:'v2'}>> {
    const epoch=this.options.getIdentityEpoch()
    await this.validated(name,config);options.signal?.throwIfAborted()
    for(const abort of this.discovering.get(name)??[])abort.abort(new Error(`MCP server "${name}" reconnecting`))
    const source=getMcpConnectedProducer287()
    const result=await source.sourceModule('chunk-amg94xhm.js').ho(name,config,options.storageV5,options.credentials)
    try {
      options.signal?.throwIfAborted()
      await this.validated(name,config)
      if(this.options.getIdentityEpoch()!==epoch)throw new Error(`MCP server "${name}" identity changed during reconnect`)
    } catch(error) {
      if(result.client.type==='connected')await source.detachModern(result.client)
      throw error
    }
    if(result.client.type!=='connected')return {generation:'v2',...result,client:result.client}
    const connection=adaptNativeModernConnection287(result.client)
    this.adoptSourceConnection287(connection)
    return {generation:'v2',...result,client:connection}
  }

  private async connectSource287(name:string,config:ScopedMcpServerConfig,options:ConnectV2Options):Promise<V2ConnectionState>{
    await this.validated(name,config);options.signal?.throwIfAborted();
    const source=getMcpConnectedProducer287(),epoch=this.options.getIdentityEpoch(),current=this.currentDial287(name);
    if(current&&(current.epoch!==epoch||current.key!==jsonStringify(config)||current.connection?.isClosed()))await this.invalidate(name);
    const promise=source.dialModern(name,config),existing=source.cache().connections.get(source.cacheKey(name,config));
    if(existing!==promise)throw Error(`MCP server "${name}" source cache identity changed`);
    const abort=new AbortController();
    const signal=options.signal?AbortSignal.any([abort.signal,options.signal]):abort.signal;
    // Tag source's Promise before it settles, so epoch cancellation finds it.
    if(!this.currentDial287(name))Object.assign(promise,{owner:this,name,config,key:jsonStringify(config),epoch,abort,promise});
    const row=await source.waitForDial(promise,{signal,timeoutMs:options.timeoutMs,serverName:name,context:'MCP lifecycle connect'});
    if(this.disposed||epoch!==this.options.getIdentityEpoch()||source.isSuperseded(promise)||source.cache().connections.get(source.cacheKey(name,config))!==promise){
      if(row.type==='connected')await row.cleanup();
      throw Error(`MCP server "${name}" identity changed or dial superseded`);
    }
    try{await this.validated(name,config)}catch(error){if(row.type==='connected')await row.cleanup();throw error}
    if(row.type==='failed')throw Error(row.error??`MCP server "${name}" failed to connect`);
    if(row.type==='needs-auth'){this.options.onConnection?.(name,row);return row}
    const connection=adaptNativeModernConnection287(row);
    const adopted=this.currentDial287(name)?.connection===connection;
    this.adoptSourceConnection287(connection);if(!adopted)this.options.onConnection?.(name,connection);return connection;
  }

  async ensure(name: string, config: ScopedMcpServerConfig, options: ConnectV2Options = {}): Promise<ConnectedMCPServerV2> {
    const result = await this.connect(name, config, options)
    if (result.type !== 'connected') throw new Error(`MCP server "${name}" needs authentication`)
    return result
  }

  async markAuthFailure(name: string, config: ScopedMcpServerConfig): Promise<void> {
    await this.invalidate(name)
    await this.markNeedsAuth(name, config)
    this.options.onConnection?.(name, { name, config, type: 'needs-auth' })
  }

  async discover(connection: ConnectedMCPServerV2, options: { signal?: AbortSignal } = {}): Promise<V2Projection> {
    options.signal?.throwIfAborted()
    const current = await this.ensure(connection.name, connection.config)
    let flight = this.discoveryFlights.get(current)
    if (!flight || flight.abort.signal.aborted) {
      const abort = new AbortController()
      const next = { abort, promise: this.discoverOnce(current, abort), waiters: 0 }
      flight = next
      this.discoveryFlights.set(current, next)
      const clearFlight = () => {
        if (this.discoveryFlights.get(current) === next) this.discoveryFlights.delete(current)
      }
      void next.promise.then(clearFlight, clearFlight)
    }
    flight.waiters++
    try { return await awaitWithSignal(flight.promise, options.signal) }
    finally {
      flight.waiters--
      if (flight.waiters === 0 && this.discoveryFlights.get(current) === flight)
        flight.abort.abort(new Error('MCP discovery has no active waiters'))
    }
  }

  private async discoverOnce(current: ConnectedMCPServerV2, abort: AbortController): Promise<V2Projection> {
    const epoch = this.options.getIdentityEpoch()
    const set = this.discovering.get(current.name) ?? new Set<AbortController>()
    set.add(abort)
    this.discovering.set(current.name, set)
    const signal = abort.signal
    try {
      signal.throwIfAborted()
      let tools:Tool[],commands:Command[],resources:ServerResource[]
      try {
        [tools,commands,resources]=await awaitWithSignal(Promise.all([
          fetchV2Tools287(this,current,signal),fetchV2Commands287(this,current,signal),fetchV2Resources287(current,signal),
        ]),signal)
      } catch(error){
        if(isAuthenticationError(error)){
          await this.markAuthFailure(current.name,current.config)
          throw new Error(`MCP server "${current.name}" requires re-authorization`)
        }
        throw error
      }
      signal.throwIfAborted()
      if ((current.name==='windows-computer-use'||current.name==='linux-computer-use')&&
          (tools.some(tool=>tool.mcpInfo?.toolName==='CClaudeCUHost')||
           process.platform==='linux'&&current.name==='linux-computer-use'&&['doctor','list_apps','focused_window'].every(name=>tools.some(tool=>tool.mcpInfo?.toolName===name)))) {
        const platformCu = await import('../../utils/computerUse/platformDiscovery.js')
        tools = await platformCu.projectPlatformComputerUse(current, tools, raw => {
          const source = getMcpConnectedProducer287()
          return source.projectToolsModern(current, raw, Date.now(), 'live', source.projectionSequenceModern(current))
        }, signal)
      }
      const mcpSkills = mcpSkillsEnabled(current.capabilities, current.config.type)
        ? await awaitWithSignal(fetchMcpSkillsForClient(current, { signal: abort.signal }), signal) : []
      signal.throwIfAborted()
      // Discovery is asynchronous: never publish tools from a connection revoked
      // while list requests were in flight.
      if (this.options.getIdentityEpoch() !== epoch || this.currentDial287(current.name)?.connection !== current || current.isClosed())
        throw new Error(`MCP server "${current.name}" changed during discovery`)
      await this.validated(current.name, current.config)
      return {
        connection: current,
        // Preserve the native listing array/WeakMap identity when no local C
        // helper is appended; a spread loses original degraded-list metadata.
        tools:!current.capabilities.resources&&hasConfirmedMcpSkillResourceRoot(current)?[...tools,ReadMcpResourceTool]:tools,
        commands:mcpSkills.length?[...commands,...mcpSkills]:commands,resources,
      }
    } finally {
      set.delete(abort)
      if (set.size === 0 && this.discovering.get(current.name) === set) this.discovering.delete(current.name)
    }
  }

  async invalidate(name: string): Promise<void> {
    for (const abort of this.discovering.get(name) ?? [])
      abort.abort(new Error(`MCP server "${name}" invalidated during discovery`))
    const current=this.currentDial287(name)
    if(current)fetchMcpSkillsForClient.cache.delete(getMcpConnectedProducer287().cacheKey(name,current.config))
    this.supervisor.cancel(name)
    current?.abort.abort(new Error(`MCP server "${name}" invalidated`))
    if(current)getMcpConnectedProducer287().discardModern(name,current.config,current)
    if(current?.connection)await current.connection.cleanup()
  }

  async invalidateAll287():Promise<void>{
    const owned=[...this.dialCache287().values()].filter(dial=>dial.owner===this)
    await Promise.all(owned.map(dial=>this.invalidate(dial.name)))
  }

  async dispose(): Promise<void> {
    if (this.disposed) return
    this.disposed = true
    this.supervisor.cancelAll()
    const owned=[...this.dialCache287().values()].filter(dial=>dial.owner===this)
    for(const dial of owned)dial.abort.abort(new Error('MCP V2 lifecycle disposed'))
    await Promise.all(owned.map(dial=>this.invalidate(dial.name)))
  }
}

function projectV2Prompt(owner: McpV2Lifecycle, connection: ConnectedMCPServerV2, raw: Record<string, unknown>): Command {
  const name = String(raw.name)
  const description = typeof raw.description === 'string' ? raw.description : ''
  const argumentRecords = Array.isArray(raw.arguments) ? raw.arguments : []
  const argNames = argumentRecords.flatMap(argument =>
    argument && typeof argument === 'object' && typeof argument.name === 'string' ? [argument.name] : [])
  return {
    type: 'prompt',
    name: `mcp__${normalizeNameForMCP(connection.name)}__${name}`,
    description,
    hasUserSpecifiedDescription: !!description,
    contentLength: 0,
    isEnabled: () => true,
    isHidden: false,
    isMcp: true,
    progressMessage: 'running',
    userFacingName: () => `${connection.name}:${name} (MCP)`,
    argNames,
    source: 'mcp',
    async getPromptForCommand(args: string) {
      const active = await owner.ensure(connection.name, connection.config)
      const values = args.split(' ')
      const parameters = Object.fromEntries(argNames.flatMap((key, index) =>
        values[index] === undefined ? [] : [[key, values[index]!]]))
      try {
        const result = await active.v2Client.getPrompt({ name, arguments: parameters })
        const { transformResultContent } = await import('./client.js')
        const blocks = await Promise.all(result.messages.map(message =>
          transformResultContent(message.content as PromptMessage['content'], active.name)))
        return blocks.flat()
      } catch (error) {
        if (isAuthenticationError(error)) {
          await owner.markAuthFailure(connection.name, connection.config)
          throw new Error(`MCP server "${connection.name}" requires re-authorization`)
        }
        throw error
      }
    },
  }
}

export function projectV2Tool(_owner:McpV2Lifecycle,connection:ConnectedMCPServerV2|CachedMCPServer,raw:Record<string,unknown>):Tool {
 const source=getMcpConnectedProducer287(),tool=source.projectToolsModern(connection,[raw],Date.now(),'live',source.projectionSequenceModern(connection))[0];
 if(!tool)throw Error(`Original Ps rejected MCP tool ${String(raw.name)}`);
 return tool;
}

export function createMcpV2Lifecycle(options: V2LifecycleOptions): McpV2Lifecycle { return new McpV2Lifecycle(options) }

/** Same full native hn/Nn/xn facades, using the actual V2 connection. */
export const fetchV2Tools287=Object.defineProperty((_owner:McpV2Lifecycle,connection:ConnectedMCPServerV2,signal:AbortSignal)=>awaitWithSignal(getMcpConnectedProducer287().listToolsModern(connection),signal),'cache',{get:()=>getMcpConnectedProducer287().listToolsModern.cache}) as ((_owner:McpV2Lifecycle,connection:ConnectedMCPServerV2,signal:AbortSignal)=>Promise<Tool[]>)&{cache:import('./officialConnected287/native.js').McpConnected287['listToolsModern']['cache']}
export const fetchV2Commands287=Object.defineProperty((_owner:McpV2Lifecycle,connection:ConnectedMCPServerV2,signal:AbortSignal)=>awaitWithSignal(getMcpConnectedProducer287().listCommandsModern(connection),signal),'cache',{get:()=>getMcpConnectedProducer287().listCommandsModern.cache}) as ((_owner:McpV2Lifecycle,connection:ConnectedMCPServerV2,signal:AbortSignal)=>Promise<Command[]>)&{cache:import('./officialConnected287/native.js').McpConnected287['listCommandsModern']['cache']}
export const fetchV2Resources287=Object.defineProperty((connection:ConnectedMCPServerV2,signal:AbortSignal)=>awaitWithSignal(getMcpConnectedProducer287().listResourcesModern(connection),signal),'cache',{get:()=>getMcpConnectedProducer287().listResourcesModern.cache}) as ((connection:ConnectedMCPServerV2,signal:AbortSignal)=>Promise<ServerResource[]>)&{cache:import('./officialConnected287/native.js').McpConnected287['listResourcesModern']['cache']}
