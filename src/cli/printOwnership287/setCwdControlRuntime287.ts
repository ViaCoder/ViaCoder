import {randomUUID} from 'node:crypto'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {getCwd} from '../../utils/cwd.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {resolveMcpSdkGeneration} from '../../services/mcp/v2Lifecycle.js'
import {createSetCwdReceiverRuntime287} from './setCwdReceiverRuntime287.js'
import {createSetCwdControlFrameNative287} from './setCwdControlFrameNative287.js'
import {createSetCwdMcpRehome287,type SetCwdMcpRehomeFrame287} from './setCwdMcpRehomeRuntime287.js'
import {getSetCwdSource287} from './setCwdSourcesRuntime287.js'
import proof from './setCwdControlFrameProvenance287.json' with {type:'json'}
import type {ClaimRelocationHost287} from './relocation.js'
import type {PrintDrain287} from '../../tools/GetTaskTool/printLifecycleNative.js'
import type {PrintParkedPermission287} from './interruptSweepNative.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
import type {PrintPluginRefresh287} from './pluginRefresh287Native.js'
export interface PrintSetCwdControlHost287 extends SetCwdMcpRehomeFrame287,ClaimRelocationHost287 {
 session:ReturnType<typeof getExecutionSession287>
 options:Pick<import('../../Tool.js').ToolUseContext,'storageV5'|'credentials'>&{permissionPromptToolName?:string;permissionPromptToolServerName?:string;permissionPromptToolBinding?:import('./permissionPromptNative287.js').PrintPermissionPromptBinding287}
 drain:PrintDrain287
 permission:Pick<PrintParkedPermission287,'inheritedPromptPending'>
 queue:{getMainThreadQueueLength():number;enqueue(command:QueuedCommand):void}
 subscribe:import('../../state/store.js').Store<import('../../state/AppState.js').AppState>['subscribe']
 refresh:Pick<PrintPluginRefresh287,'Ga'|'ea'>
 startupOwner:{noteServersStartedSinceKick(names:Iterable<string>):void}
 startupDeadlineMs:number|undefined
 success(request:SDKControlRequest,response?:Record<string,unknown>):void
 error(request:SDKControlRequest,error:string):void
}
/** A single original frame lifetime; the same live AppStore/MCP pool/queue,
 * Cm, startup owner, launch Nd, and transcript/config/watcher/trust writer.
 * Private-host conditions remain raw; no synthetic storage/credentials. */
export function createPrintSetCwdControl287(host:PrintSetCwdControlHost287){
 const receiver=createSetCwdReceiverRuntime287(host)
 const mcp=createSetCwdMcpRehome287(host)
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.bindings
 const sources:Record<string,unknown>={}
 for(const [name,row]of Object.entries(bindings)){
  if(name==='eo'||name==='oe'||name==='Ee')continue
  Object.defineProperty(sources,name,{enumerable:true,get:()=>getSetCwdSource287(row.file,row.name)})
 }
 const ports=Object.defineProperties({},Object.getOwnPropertyDescriptors(sources))
 Object.defineProperties(ports,{
  e:{value:host.session},I:{value:host.options},w:{get:()=>host.messages},gf:{value:mcp.gf},
  qe:{value:host.drain},Q:{value:host.queue},Yt:{value:host.permission},
  v:{value:host.getAppState},R:{value:host.setAppState},U:{value:host.subscribe},
  Lt:{get:host.getDynamicMcpState},Ad:{value:mcp.Ad},
  Nd:{get:()=>host.startupDeadlineMs},ni:{get:()=>host.startupOwner},
  Ga:{value:host.refresh.Ga},ea:{value:host.refresh.ea},
  We:{get:()=>host.error},Ze:{value:host.success},
  eo:{value:randomUUID},Ee:{value:getOriginalCwd},oe:{value:getCwd},
  yn:{value:()=>({...mcp.yn(),clearServerCache:resolveMcpSdkGeneration()==='v2'
   ?getMcpConnectedProducer287().clearServerModern:getMcpConnectedProducer287().clearServerLegacy})},
  load:{value:async(file:string)=>{
   if(file!=='chunk-x4sedf8c.js')throw Error('Unexpected original cwd dynamic module '+file)
   return receiver
  }},
 })
 const frame=createSetCwdControlFrameNative287(ports)
 return {...frame,reconnect:mcp.Ad,lease:mcp.uo,mcpControlLanes287:mcp.native}
}
