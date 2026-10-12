import {createSetCwdMcpRehomeNative287} from './setCwdMcpRehomeNative287.js'
import {getSetCwdSource287} from './setCwdSourcesRuntime287.js'
import {getMcpConnectedProducer287,isNativeModernConnection287} from '../../services/mcp/connectedProducer287.js'
import {resolveMcpSdkGeneration} from '../../services/mcp/v2Lifecycle.js'
import {readLegacyMcpLifecycleClient287} from '../../services/mcp/officialLegacyLifecycle287/readers.js'
import type {AppState} from '../../state/AppState.js'
import type {ToolUseContext} from '../../Tool.js'
import type {PrintMcpClient287,PrintMcpState287} from '../../services/mcp/officialPrintScheduler287/native.js'
import type {ScopedMcpServerConfig} from '../../services/mcp/types.js'
import type {HeadlessMcpV2Owner} from '../../services/mcp/headlessV2Owner.js'
import type {SetCwdMcpDiscovery287,SetCwdMcpRehomePorts287} from './setCwdMcpRehomeNative287.js'
export type SetCwdAppState287=Omit<AppState,'mcp'>&{mcp:PrintMcpState287}
export type SetCwdDynamicMcpState287={clients:PrintMcpClient287[];tools:AppState['mcp']['tools'];configs:Record<string,ScopedMcpServerConfig>}
export interface SetCwdMcpRehomeFrame287 {
 getAppState():SetCwdAppState287
 setAppState(update:(state:SetCwdAppState287)=>SetCwdAppState287):void
 getDynamicMcpState():SetCwdDynamicMcpState287
 setDynamicMcpState(state:SetCwdDynamicMcpState287):void
 messages:readonly {type:string}[]
 storageV5?:ToolUseContext['storageV5'];credentials?:ToolUseContext['credentials']
 authEnvironment:{CLAUDE_CODE_REMOTE?:boolean}
 headlessMcpV2Owner?:HeadlessMcpV2Owner & {controlReconnectLease287():Map<string,object>}
 /** V1's original same-frame uo; required only when there is no V2 host. */
 legacyControlReconnectLease?:Map<string,object>
 registerElicitationHandlers(clients:Extract<PrintMcpClient287,{type:'connected'}>[]):void
 sourceQueue:unknown
}
function source<T>(file:string,name:string):T{return getSetCwdSource287(file,name) as T}
/** Ad/Ni/os/ji retain their whole original bodies, same epoch and live cells. */
export function createSetCwdMcpRehome287(frame:SetCwdMcpRehomeFrame287) {
 const producer=getMcpConnectedProducer287(),owner=frame.headlessMcpV2Owner
 const uo=owner?owner.controlReconnectLease287():frame.legacyControlReconnectLease
 if(!uo)throw Error('set_cwd requires the existing print reconnect lease Map')
 const gf=frame.messages.some((b)=>b.type==='user'||b.type==='assistant')
 const GOt=source<(config:ScopedMcpServerConfig)=>boolean>('chunk-mphp7acd.js','GOt')
 const sde=source<(name:string)=>boolean>('chunk-mphp7acd.js','sde')
 const Jlr=source<(name:string,configs:Record<string,ScopedMcpServerConfig>,row:ScopedMcpServerConfig|undefined,discover:(name:string)=>ScopedMcpServerConfig|null)=>ScopedMcpServerConfig|null|undefined>('chunk-dp67c56j.js','Jlr')
 const b2=source<(name:string)=>ScopedMcpServerConfig|null>('chunk-mphp7acd.js','b2')
 const a=frame.authEnvironment,v=frame.getAppState
 const Yn=a.CLAUDE_CODE_REMOTE?Object.fromEntries(v().mcp.clients.filter((b)=>b.config.scope==="dynamic"&&!("pluginSource"in b.config)&&GOt(b.config)&&!sde(b.name)).map((b)=>[b.name,b.config])):{}
 const kie=source<SetCwdMcpRehomePorts287['kie']>('chunk-dp67c56j.js','kie')
 const modern=resolveMcpSdkGeneration()==='v2',file=modern?'chunk-amg94xhm.js':'chunk-fdjgzr8v.js'
 const reconnect: SetCwdMcpRehomePorts287['yn'] extends ()=>infer Y?Y extends {reconnectMcpServerImpl:infer F}?F:never:never=async(name,config,storageV5,credentials)=>{
  if(modern){
   if(!owner)throw Error('set_cwd modern reconnect requires the same HeadlessMcpV2Owner')
   owner.setConfig(name,config)
   const selected=await owner.lifecycle.reconnect(name,config,{storageV5,credentials})
   const client=selected.client
   if(client.type==='connected'&&!isNativeModernConnection287(client))throw Error('Modern reconnect lost its same source SDK client')
   return {client:client.type==='connected'?(isNativeModernConnection287(client)?client:(()=>{throw Error('Missing native client')})()):client,tools:selected.tools,commands:selected.commands,
    resources:selected.resources,resourceTemplates:selected.resourceTemplates}
  }
  return readLegacyMcpLifecycleClient287().reconnectMcpServerImpl(name,config,storageV5,credentials)
 }
 const yn: SetCwdMcpRehomePorts287['yn']=()=>({areMcpConfigsEqual:producer.configsEqual,
  disposeServerConnectionDetached:source(file,'disposeServerConnectionDetached'),
  reconnectMcpServerImpl:reconnect,reconnectMcpServerDistrusted:source(file,'reconnectMcpServerDistrusted'),
  inertReconnectShape:source(file,'inertReconnectShape')})
 const native=createSetCwdMcpRehomeNative287({yn,Jlr,b2,Yn,kie,
  get Lt(){return frame.getDynamicMcpState()},set Lt(value){frame.setDynamicMcpState(value)},
  v:frame.getAppState,R:frame.setAppState,uo,gr:producer.identityEpoch,
  zR:source('chunk-mphp7acd.js','zR'),I:{storageV5:frame.storageV5,credentials:frame.credentials},
  h3e:source('chunk-z6w3579x.js','h3e'),
  ns:frame.registerElicitationHandlers,Rp:source('chunk-xapeakym.js','Rp'),Q:frame.sourceQueue,
  Kt:source('chunk-hrhfcbdv.js','Kt'),
 })
 return {Ad:native.Ad,gf,uo,yn,native}
}

export function createSetCwdLegacyStoreView287(get:()=>AppState,set:(update:(state:AppState)=>AppState)=>void){
 const sourceState=(state:AppState):SetCwdAppState287=>({...state,mcp:{...state.mcp,clients:state.mcp.clients.map(row=>{
  if(row.type==='v2-connected')throw Error('Print V2 status requires the existing HeadlessMcpV2Owner')
  return row
 })}})
 return {getAppState:()=>sourceState(get()),setAppState:(update:(state:SetCwdAppState287)=>SetCwdAppState287)=>set(prev=>{
  const source=sourceState(prev),next=update(source)
  if(next===source)return prev
  return {...next,mcp:{...next.mcp,clients:next.mcp.clients.map(row=>{
   if(isNativeModernConnection287(row))throw Error('Modern MCP publication requires the existing owner')
   return row
  })}}
 })}
}
