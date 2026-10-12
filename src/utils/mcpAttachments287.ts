import {authEnvironment} from './authEnvironment.js'
import {isEnvDefinedFalsy} from './envUtils.js'
import {createMcpAttachments287,type McpAttachments287,type McpAttachmentsPorts287,type McpAttachmentContext287,type McpLiveClient287} from './officialMcpAttachments287/native.js'
import type {ToolUseContext,Tools} from '../Tool.js'
import type {Message} from '../types/message.js'
import type {ConnectedMCPServerV2} from '../services/mcp/types.js'
let source:McpAttachments287|undefined
const lifecycle=()=> (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
/** These are the existing Mods lexical classes/policies and existing qt/to
 * host discovery slot, not another policy, transport, snapshot or latch owner. */
export function createMcpAttachmentProductionPorts287():McpAttachmentsPorts287{return {
 shared:lifecycle().mcpAttachmentBindings,environment:authEnvironment,
 optimistic:()=>lifecycle().deferredToolSearchOptimistic(),
 mcpState:()=> (require('./hooks/outsideRuntime287.js') as typeof import('./hooks/outsideRuntime287.js')).getOutsideHookRuntime287().mcpState(),
 analytics:(...args)=> (require('../services/analytics/index.js') as typeof import('../services/analytics/index.js')).logEvent(...args),
 createUserMessage:(...args)=> (require('./messages.js') as typeof import('./messages.js')).createUserMessage(...args),
 wrapMessages:(...args)=> (require('./messages.js') as typeof import('./messages.js')).wrapMessagesInSystemReminder(...args),
}}
export function getOriginalMcpAttachments287():McpAttachments287{return source??=createMcpAttachments287(createMcpAttachmentProductionPorts287())}
/** The local UI status row is not an original connected client. Resolve it
 * only to its real generation-specific row on the existing session lease/pool.
 * Unavailable rows stay unavailable; no status mutation or V2→V1 cast. */
export function resolveMcpAttachmentClients287(clients:readonly McpLiveClient287[],context?:ToolUseContext):readonly McpLiveClient287[]{
 if(!clients.some(row=>row.type==='v2-connected'))return clients
 const mcp=require('../services/mcp/connectedProducer287.js') as typeof import('../services/mcp/connectedProducer287.js')
 const isV2=(row:unknown):row is ConnectedMCPServerV2=>typeof row==='object'&&row!==null&&Reflect.get(row,'type')==='connected'&&'v2Client'in row&&'name'in row&&'config'in row
 const pool=context?.options.mcpV2Clients??mcp.getMcpSessionWiring287().clientsFromAccessor()?.filter(isV2)??context?.getAppState().mcp.v2Clients
 return clients.map(row=>row.type==='v2-connected'?pool?.find(candidate=>candidate.name===row.name&&mcp.getMcpConnectedProducer287().configsEqual(candidate.config,row.config))??row:row)
}
export function getMcpInstructionsAttachment287(clients:readonly McpLiveClient287[],tools:Tools,model:string,messages:Message[]|undefined,context?:ToolUseContext){
 // Preserve the explicit existing local opt-out. The old stale GrowthBook
 // default-false gate is absent from original BHr and must not hide the pool.
 if(isEnvDefinedFalsy(process.env.CLAUDE_CODE_MCP_INSTR_DELTA))return []
 const native=getOriginalMcpAttachments287()
 const actor:McpAttachmentContext287=context??{}
 const latches=native.latches(actor)
 const trimmed=()=> (require('./sessionSettings287.js') as typeof import('./sessionSettings287.js')).getOriginalSessionSettings287().trimHistory(messages??[])
 const permissions=()=>context===undefined?undefined:(require('../services/mcp/connectedProducer287.js') as typeof import('../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().toolPermissions(context)
 const declared=latches===undefined?undefined:native.declared(latches,trimmed(),context?.options??{tools,mainLoopModel:model},tools,permissions())
 return native.instructions(resolveMcpAttachmentClients287(clients,context),tools,model,messages,declared)
}
