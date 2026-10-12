import uniqBy from 'lodash-es/uniqBy.js'
import {acquireMcpHookClients287,getMcpConnectedProducer287} from './connectedProducer287.js'
import type { Store } from '../../state/store.js'
import type { AppState } from '../../state/AppState.js'
import { getSessionId } from '../../bootstrap/state.js'
import { logError } from '../../utils/log.js'
import { createMcpAuthTool } from '../../tools/McpAuthTool/McpAuthTool.js'
import { filterMcpServersByPolicy, isMcpServerDisabled } from './config.js'
import { getMcpPrefix } from './mcpStringUtils.js'
import { commandBelongsToServer, hashMcpConfig } from './utils.js'
import { createMcpV2Lifecycle, resolveMcpSdkGeneration, type McpV2Lifecycle } from './v2Lifecycle.js'
import type { SelectedMcpDiscovery } from './v2Production.js'
import type {ConnectedMCPServerV2, MCPServerConnection, ScopedMcpServerConfig } from './types.js'
import { fetchMcpSkillsForClient,invalidateMcpSkillsForServer287 } from '../../skills/mcpSkills.js'
import {createMcpListChanged287} from './officialListChanged287/native.js'
import {readMcpListChangeBindings287,readMcpListChangeClient287} from './officialListChanged287/readers.js'
import {getMcpClientModule287} from './connectedProducer287.js'
import {logForDebugging} from '../../utils/debug.js'
import {clearSkillIndexCache} from '../skillSearch/localSearch.js'
import { projectMcpResourceHelperTools } from './resourceToolProjection.js'
import {adaptNativeModernConnection287,isNativeModernConnection287} from './connectedProducer287.js'
import {createMcpPrintScheduler287,type PrintMcpScheduler287,type PrintMcpState287,type PrintMcpStateOwner287,type PrintMcpStartup287} from './officialPrintScheduler287/native.js'
import {readMcpPrintSchedulerBindings287,readMcpPrintClientPrimitives287} from './officialPrintScheduler287/readers.js'

/** ABI lowering only; connection identity and lifetime stay in the native
 * producer and existing HeadlessMcpV2Owner, including deferred settlement. */
export function lowerPrintDynamicMcpState287(state:{clients:import('./officialPrintScheduler287/native.js').PrintMcpClient287[];tools:AppState['mcp']['tools'];configs:Record<string,ScopedMcpServerConfig>}){
  return {...state,
    clients:state.clients.map(row=>isNativeModernConnection287(row)
      ?projectHeadlessV2Status({generation:'v2',client:adaptNativeModernConnection287(row),tools:[],commands:[]})
      :row),
    v2Clients:state.clients.filter(isNativeModernConnection287).map(adaptNativeModernConnection287),
  }
}

/** The production -p startup batch shared with the offline entry test. V1
 * results stay on the existing callback; V2 results publish a real runtime. */
export async function connectHeadlessMcpBatch(
  store: Store<AppState>,
  owner: HeadlessMcpV2Owner,
  configs: Record<string, ScopedMcpServerConfig>,
  cachedTools287?:Record<string,Record<string,unknown>[]>,
): Promise<void> {
  if (Object.keys(configs).length === 0) return
  const sessionId = getSessionId()
  for (const [name, config] of Object.entries(configs)) owner.setConfig(name, config)
  store.setState(prev => ({ ...prev, mcp: { ...prev.mcp,
    clients: [...prev.mcp.clients, ...Object.entries(configs).map(([name, config]) =>
      Object.defineProperties({name,type:'pending' as const,config},{mcpLifecycle287:{value:owner.lifecycle},ensureConnectedClient287:{value:(options?:import('./officialConnected287/native.js').EnsureMcpOptions287)=>owner.lifecycle.connect(name,config,{signal:options?.signal,timeoutMs:options?.timeoutMs})}}))],
  } }))
  const { getMcpToolsCommandsAndResources } = await import('./client.js')
  await getMcpToolsCommandsAndResources(({ client, tools, commands }) => {
    if (getSessionId() !== sessionId) return
    store.setState(prev => ({ ...prev, mcp: { ...prev.mcp,
      clients: prev.mcp.clients.some(c => c.name === client.name)
        ? prev.mcp.clients.map(c => c.name === client.name ? client : c)
        : [...prev.mcp.clients, client],
      tools: uniqBy([...prev.mcp.tools, ...tools], 'name'),
      commands: uniqBy([...prev.mcp.commands, ...commands], 'name'),
    } }))
  }, configs, { v2Lifecycle: owner.lifecycle, onV2Result: result => {
    if (getSessionId() === sessionId) owner.publish(result)
  } },cachedTools287)
}

export function projectHeadlessV2Status(result: Extract<SelectedMcpDiscovery, { generation: 'v2' }>): MCPServerConnection {
  const client = result.client
  return client.type === 'connected'
    ? { name: client.name, type: 'v2-connected', generation: 'v2', config: client.config,
        capabilities: client.capabilities, serverInfo: client.serverInfo, instructions: client.instructions }
    : client
}

/** -p owner for the same real V2 lifecycle used by React. The SDK-hosted
 * transport remains separately owned by print.ts; no V2→V1 client alias. */
export class HeadlessMcpV2Owner {
  readonly lifecycle: McpV2Lifecycle
  private readonly configs = new Map<string, ScopedMcpServerConfig>()
  private disposed = false
  private resetKey: number
  private resetWork: Promise<void> = Promise.resolve()
  private readonly unsubscribe: () => void
  private readonly releaseHookClients: () => void
  private readonly releaseCachedAdopt:()=>void
  private readonly releaseIdentity:()=>void
  // Original print uo claim-token Map [394296,394687): active controls only,
  // not another connection/discovery cache.
  private readonly controlReconnects287=new Map<string,object>()
  private readonly printAbort287=new AbortController()
  private printScheduler287?:PrintMcpScheduler287
  private cachedControls287?:{getDynamicMcpState:()=>{clients:unknown[];tools:readonly import('../../Tool.js').Tool[]};setDynamicMcpState:(state:any)=>void;isRunEnding:()=>boolean}
  private readonly cachedCatchUp287:()=>void

  constructor(private readonly store: Store<AppState>) {
    this.releaseHookClients=acquireMcpHookClients287(()=>{
      const {clients,v2Clients}=store.getState().mcp
      const rows=[...clients.filter(client=>client.type!=='v2-connected'),...v2Clients]
      for(const row of rows)if(this.configs.has(row.name)&&!Object.hasOwn(row,'mcpLifecycle287'))Object.defineProperty(row,'mcpLifecycle287',{configurable:true,get:()=>this.lifecycle})
      return rows
    })
    this.resetKey = store.getState().mcp.sessionResetKey
    this.lifecycle = createMcpV2Lifecycle({
      getIdentityEpoch: () => `${getSessionId()}:${store.getState().authVersion}`,
      onRetryState287:state=>{
        if(this.disposed)return
        if(state.type==='pending')store.setState(prev=>({...prev,mcp:{...prev.mcp,clients:prev.mcp.clients.map(client=>client.name===state.name?state:client)}}))
        else if(state.type==='failed')this.publish({generation:'v2',client:state,tools:[],commands:[],resources:[],resourceTemplates:[]})
      },
      resolveConfig: async name => {
        const config = this.configs.get(name)
        if (!config || isMcpServerDisabled(name)) return undefined
        return filterMcpServersByPolicy({ [name]: config }).allowed[name]
      },
      onReconnect: result => this.publish(result),
      onConnection: (name, state) => {
        if (this.disposed) return
        const current = store.getState().mcp.clients.find(client => client.name === name)
        if (!current || current.type === 'pending' || current.type === 'disabled' || current.type === 'cached') return
        if (state.type === 'disconnected') {
          this.publish({ generation: 'v2', client: { name, config: current.config, type: 'failed' }, tools: [], commands: [] })
        } else if (state.type === 'needs-auth') {
          this.publish({ generation: 'v2', client: state,
            tools: [createMcpAuthTool(name, state.config)], commands: [] })
        } else if (store.getState().mcp.v2Clients.find(client => client.name === name) !== state) {
          void import('./v2Production.js').then(({ discoverSelectedMcpServer }) =>
            discoverSelectedMcpServer(name, state.config, this.lifecycle)).then(result => {
              if (result.generation === 'v2') this.publish(result)
            }).catch(() => {
              this.publish({ generation: 'v2', client: { name, config: state.config, type: 'failed' }, tools: [], commands: [] })
            })
        }
      },
    })
    const source=getMcpConnectedProducer287()
    const consumer=source.cachedConsumer({
      getAppState:()=>this.sourceAppState287(store.getState()),
      setAppState:update=>{
        let connected:ConnectedMCPServerV2[]=[]
        store.setState(current=>{
          const next=update(this.sourceAppState287(current))
          const clients=next.mcp.clients as (ConnectedMCPServerV2|MCPServerConnection)[]
          connected=clients.filter((client):client is ConnectedMCPServerV2=>client.type==='connected'&&'v2Client'in client)
          return {...next,mcp:{...next.mcp,clients:clients.map(client=>client.type==='connected'&&'v2Client'in client?projectHeadlessV2Status({generation:'v2',client,tools:[],commands:[]}):client),v2Clients:connected}}
        })
        for(const client of connected)this.registerListChanged(client)
      },
      getDynamicMcpState:()=>this.cachedControls287?.getDynamicMcpState()??{clients:[],tools:[]},
      setDynamicMcpState:state=>{if(!this.cachedControls287)throw Error('MCP cached settlement needs the actual dynamic print owner');this.cachedControls287.setDynamicMcpState(state)},
      isControlReconnectInFlight:name=>this.controlReconnects287.has(name),
      ownsCachedRow:name=>this.configs.has(name),isRunEnding:()=>this.disposed||!!this.cachedControls287?.isRunEnding(),
      onRetryRejected:(_name,error)=>logError(error),
    })
    this.releaseCachedAdopt=consumer.subscribe()
    this.cachedCatchUp287=consumer.catchUp
    this.releaseIdentity=source.bindIdentityHandler(()=>{
      if(this.disposed)return
      const rows=[...this.configs].map(([name,config])=>({name,config}))
      const affected=rows.filter(row=>source.identityScoped(row.config))
      const keep=new Set(rows.filter(row=>!source.identityScoped(row.config)).map(row=>source.cacheKey(row.name,row.config)))
      const clear=resolveMcpSdkGeneration()==='v2'?Promise.all(affected.map(row=>this.lifecycle.invalidate(row.name))):Promise.all(affected.map(row=>source.clearServerLegacy(row.name,row.config)))
      void clear.then(()=>{
        const evict=resolveMcpSdkGeneration()==='v2'?source.evictModern:source.evictLegacy
        evict(keep,source.identityShouldBump(rows))
        return connectHeadlessMcpBatch(store,this,Object.fromEntries(affected.map(row=>[row.name,row.config])))
      }).catch(logError)
    })
    this.unsubscribe = store.subscribe(() => {
      const key = store.getState().mcp.sessionResetKey
      if (this.disposed || key === this.resetKey) return
      this.resetKey = key
      this.resetWork = this.resetWork.catch(() => {}).then(() => this.reconnectAfterClear())
    })
  }

  private sourceAppState287(state:AppState){
    return {...state,mcp:{...state.mcp,clients:state.mcp.clients.map(row=>row.type==='v2-connected'?state.mcp.v2Clients.find(client=>client.name===row.name&&getMcpConnectedProducer287().configsEqual(client.config,row.config))??row:row)}}
  }
  bindCachedControls287(controls:NonNullable<HeadlessMcpV2Owner['cachedControls287']>):void {
    this.cachedControls287=controls;this.cachedCatchUp287()
  }
  controlReconnectLease287():Map<string,object>{return this.controlReconnects287}
  async withControlReconnect287<T>(name:string,run:()=>Promise<T>):Promise<T>{
    const claim={};this.controlReconnects287.set(name,claim)
    try{return await run()}finally{if(this.controlReconnects287.get(name)===claim)this.controlReconnects287.delete(name)}
  }

  /** The React hook observes this epoch itself; headless has no hook render.
   * Drain it before print snapshots the next turn's tool and connection pool. */
  async waitForReset(): Promise<void> {
    await this.resetWork
  }

  private async reconnectAfterClear(): Promise<void> {
    if (this.disposed) return
    await Promise.all([...this.configs.keys()].map(name => this.lifecycle.invalidate(name)))
    // A dynamic mcp_set_servers removal can race the close; redial only the
    // authoritative configs that still exist after invalidation settles.
    const configs = Object.fromEntries([...this.configs].filter(([, config]) => config.type !== 'sdk'))
    if (this.disposed || !Object.keys(configs).length) return
    await connectHeadlessMcpBatch(this.store, this, configs)
  }

  /** bh/io reads and writes the existing AppStore. Native SDK rows are exposed
   * by identity; only the UI status projection is lowered at the same writer. */
  private sourceMcpState287(state:AppState):PrintMcpState287 {
    return {...state.mcp,clients:state.mcp.clients.map(row=>{
      if(row.type!=='v2-connected')return row
      const connected=state.mcp.v2Clients.find(client=>client.name===row.name&&getMcpConnectedProducer287().configsEqual(client.config,row.config))
      if(!isNativeModernConnection287(connected))throw Error('Print MCP status lost its same native SDK owner')
      return connected
    })}
  }
  private applyPrintMcpUpdate287(update:(state:PrintMcpState287)=>PrintMcpState287,commitTop?:(state:AppState)=>AppState):void {
    if(this.disposed)return
    const connected:ConnectedMCPServerV2[]=[]
    this.store.setState(prev=>{
      const current=this.sourceMcpState287(prev),next=update(current)
      if(next===current)return commitTop?commitTop(prev):prev
      const clients=next.clients.map(row=>{
        this.setConfig(row.name,row.config)
        if(isNativeModernConnection287(row)){
          const connection=adaptNativeModernConnection287(row)
          connected.push(connection)
          return projectHeadlessV2Status({generation:'v2',client:connection,tools:[],commands:[]})
        }
        if(row.type==='pending'&&!Object.hasOwn(row,'mcpLifecycle287'))Object.defineProperties(row,{mcpLifecycle287:{value:this.lifecycle},ensureConnectedClient287:{value:(options?:import('./officialConnected287/native.js').EnsureMcpOptions287)=>this.lifecycle.connect(row.name,row.config,{signal:options?.signal,timeoutMs:options?.timeoutMs})}})
        return row
      })
      const mcp={...next,clients,v2Clients:connected}
      return {...(commitTop?commitTop(prev):prev),mcp:{...mcp,tools:projectMcpResourceHelperTools(mcp)}}
    })
    for(const connection of connected){this.setConfig(connection.name,connection.config);this.lifecycle.adoptSourceConnection287(connection);this.registerListChanged(connection)}
  }
  private printStateOwner287():PrintMcpStateOwner287 {
    return {getClients:()=>this.sourceMcpState287(this.store.getState()).clients,
      getSuppressedPluginServers:()=>this.sourceMcpState287(this.store.getState()).suppressedPluginMcpServers??[],
      applyMcpUpdate:update=>this.applyPrintMcpUpdate287(update),signal:this.printAbort287.signal}
  }
  /** Source jso/qp borrows this existing store and its accepted native→C
   * projection/adoption boundary. This view owns no state or connection. */
  pluginApplyStoreView287(){
    type SourceState=Omit<AppState,'mcp'>&{mcp:PrintMcpState287}
    return {
      getAppState:():SourceState=>{const state=this.store.getState();return {...state,mcp:this.sourceMcpState287(state)}},
      sourceDynamicState:(state:{clients:MCPServerConnection[];v2Clients?:ConnectedMCPServerV2[];tools:Readonly<AppState['mcp']['tools']>;configs:Record<string,ScopedMcpServerConfig>})=>({
        ...state,clients:state.clients.map(row=>{
          if(row.type!=='v2-connected')return row
          const connected=state.v2Clients?.find(client=>client.name===row.name&&getMcpConnectedProducer287().configsEqual(client.config,row.config))
          if(!isNativeModernConnection287(connected))throw Error('Print dynamic MCP status lost its same native SDK owner')
          return connected
        }),
      }),
      setAppState:(update:(state:SourceState)=>SourceState):void=>{
        let nextTop=this.store.getState()
        this.applyPrintMcpUpdate287(mcp=>{
          const prev=this.store.getState(),source={...prev,mcp},next=update(source)
          if(next===source){nextTop=prev;return mcp}
          const {mcp:nextMcp,...rest}=next
          nextTop={...prev,...rest}
          return nextMcp
        },()=>nextTop)
      },
      lowerDynamicState:lowerPrintDynamicMcpState287,
    }
  }
  private getPrintScheduler287():PrintMcpScheduler287 {
    return this.printScheduler287??=createMcpPrintScheduler287({...readMcpPrintSchedulerBindings287(),getClientModule:()=>{
      const modern=resolveMcpSdkGeneration()==='v2'
      return {...getMcpClientModule287(),...readMcpPrintClientPrimitives287(modern),
        getMcpToolsCommandsAndResources:async(callback,configs,storageV5,credentials,knownListings)=>{
          // Original Fa carries its attemptEpoch into xxn. Use the selected
          // production presenter to retain the existing desktop C lowering.
          const {getMcpToolsCommandsAndResources}=await import('./client.js')
          const carry=(result:import('./officialPrintScheduler287/native.js').PrintMcpResult287)=>{
            callback(result)
            const current=this.sourceMcpState287(this.store.getState()).clients.find(row=>row.name===result.client.name)
            if(current!==result.client||result.resources===undefined&&result.resourceTemplates===undefined)return
            this.applyPrintMcpUpdate287(prev=>({...prev,
              resources:result.resources===undefined?prev.resources:{...prev.resources,[current.name]:result.resources},
              resourceTemplates:result.resourceTemplates===undefined?prev.resourceTemplates:{...prev.resourceTemplates,[current.name]:result.resourceTemplates}}))
          }
          await getMcpToolsCommandsAndResources(carry,configs,{v2Lifecycle:this.lifecycle,onV2Result:carry,storageV5,credentials},knownListings)
        }}
    }})
  }
  connectPrintStartup287(options:Omit<PrintMcpStartup287,'state'>):Promise<void> {
    for(const [name,config]of Object.entries(options.regularMcpConfigs))this.setConfig(name,config)
    return this.getPrintScheduler287().eio({...options,state:this.printStateOwner287()}).connect()
  }
  connectPrintBatch287(configs:Record<string,ScopedMcpServerConfig>,label:string,storageV5?:unknown,credentials?:unknown):Promise<void> {
    for(const [name,config]of Object.entries(configs))this.setConfig(name,config)
    return this.getPrintScheduler287().ecr({configs,label,nonBlocking:false,state:this.printStateOwner287(),storageV5,credentials})
  }

  setConfig(name: string, config: ScopedMcpServerConfig): void {
    this.configs.set(name, config)
  }

  /** Consult the existing owner registry before a delayed dynamic removal is projected. */
  hasConfig(name: string): boolean {
    return this.configs.has(name)
  }

  async remove(name: string): Promise<void> {
    this.configs.delete(name)
    await this.lifecycle.invalidate(name)
  }

  publish(result: Omit<Extract<SelectedMcpDiscovery, { generation: 'v2' }>, 'tools'|'commands'> & {tools?:AppState['mcp']['tools'];commands?:AppState['mcp']['commands']}): void {
    if (this.disposed) return
    const { client, tools, commands, resources,resourceTemplates } = result
    if (client.type === 'connected' && client.isClosed()) return
    const canonical = this.configs.get(client.name)
    if (!canonical || canonical.scope !== client.config.scope ||
      hashMcpConfig(canonical) !== hashMcpConfig(client.config) ||
      (isMcpServerDisabled(client.name) && client.type !== 'failed')) return
    const status = projectHeadlessV2Status({...result,tools:tools??[],commands:commands??[]})
    this.store.setState(prev => {
      const prefix = getMcpPrefix(client.name)
      const otherTools = prev.mcp.tools.filter(tool => !tool.name.startsWith(prefix))
      const otherCommands = prev.mcp.commands.filter(command => !commandBelongsToServer(command, client.name))
      const nextResources = { ...prev.mcp.resources }
      if (resources !== undefined) {
        if (resources.length) nextResources[client.name] = resources
        else delete nextResources[client.name]
      } else if(client.type!=='connected') delete nextResources[client.name]
      const nextTemplates=resourceTemplates===undefined&&client.type==='connected'
        ? prev.mcp.resourceTemplates
        : {...prev.mcp.resourceTemplates,[client.name]:resourceTemplates??[]}
      const mcp = {
        ...prev.mcp,
        clients: [...prev.mcp.clients.filter(item => item.name !== client.name), status],
        v2Clients: [...prev.mcp.v2Clients.filter(item => item.name !== client.name),
          ...(client.type === 'connected' ? [client] : [])],
        tools: tools===undefined?prev.mcp.tools:[...otherTools, ...tools].filter((tool, index, all) => all.findIndex(item => item.name === tool.name) === index),
        commands: commands===undefined?prev.mcp.commands:[...otherCommands, ...commands],
        resources: nextResources,resourceTemplates:nextTemplates,
      }
      return { ...prev, mcp: { ...mcp, tools: projectMcpResourceHelperTools(mcp) } }
    })
    if (client.type === 'connected'&&(tools!==undefined&&commands!==undefined)) this.registerListChanged(client)
  }

  private registerListChanged(client: Extract<SelectedMcpDiscovery, { generation: 'v2' }>['client']): void {
    if (client.type !== 'connected') return
    const register=createMcpListChanged287({
      ...readMcpListChangeBindings287(),
      Ql:()=>({...getMcpClientModule287(),...readMcpListChangeClient287()}),
      t:logForDebugging,
      GS:{fetchMcpSkillsForClient,invalidateMcpSkillsForServer:invalidateMcpSkillsForServer287},
      mbe:clearSkillIndexCache,
    })
    register(client,update=>{
      if(this.disposed||client.isClosed()||this.store.getState().mcp.v2Clients.find(row=>row.name===client.name)!==client)return
      this.publish({generation:'v2',client,tools:update.tools,commands:update.commands,
        resources:update.resources,resourceTemplates:update.resourceTemplates})
    })
  }

  async dispose(): Promise<void> {
    this.disposed = true
    this.printAbort287.abort()
    this.releaseHookClients();this.releaseCachedAdopt();this.releaseIdentity()
    this.unsubscribe()
    await this.lifecycle.dispose()
  }
}
