import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
import type {PrintMcpClient287} from '../../services/mcp/officialPrintScheduler287/native.js'
import type {ScopedMcpServerConfig} from '../../services/mcp/types.js'
import type {SetCwdMcpDiscovery287,SetCwdMcpRehomeNative287} from '../printOwnership287/setCwdMcpRehomeNative287.js'
import type {SetCwdAppState287,SetCwdDynamicMcpState287} from '../printOwnership287/setCwdMcpRehomeRuntime287.js'

type McpClearAuthRequest287=Extract<SDKControlRequest['request'],{subtype:'mcp_clear_auth'}>
type PolicyReason287='managed-policy'|string|null|undefined
type RemoteMcpConfig287=Extract<ScopedMcpServerConfig,{type:'sse'|'http'}>

export interface McpClearAuthPorts287 {
 is(name:string):ScopedMcpServerConfig|null|undefined
 hostClients():readonly {name:string;config:ScopedMcpServerConfig}[]
 getAppState():SetCwdAppState287
 getDynamicMcpState():SetCwdDynamicMcpState287
 revokeServerTokens(name:string,config:RemoteMcpConfig287):Promise<unknown>
 areMcpConfigsEqual(a:ScopedMcpServerConfig,b:ScopedMcpServerConfig):boolean
 clearServerCache(name:string,config:ScopedMcpServerConfig):Promise<void>
 dropDiscoveryEntry(name:string,config:ScopedMcpServerConfig):Promise<void>
 afterDiscoveryCleanup(work:Promise<void>):Promise<void>
 discoveryEnabled():boolean
 policyBlocked(name:string,config:ScopedMcpServerConfig):boolean
 disabled(name:string):boolean
 policyReason(name:string,config:ScopedMcpServerConfig):PolicyReason287
 policyError(reason:PolicyReason287):Record<string,unknown>
 identityEpoch():number
 lanes:Pick<SetCwdMcpRehomeNative287,'Ni'|'os'|'ji'|'Xs'>
 error(frame:SDKControlRequest,error:string):void
 success(frame:SDKControlRequest,response?:Record<string,unknown>):void
 serverName(value:string):string
}

/** Original hI.mcp_clear_auth control branch on the existing print MCP owners. */
export function createMcpClearAuth287(ports:McpClearAuthPorts287) {
 return async function dispatchMcpClearAuth287(frame:SDKControlRequest):Promise<boolean> {
  const request=frame.request
  if(request.subtype!=='mcp_clear_auth')return false
  const {serverName}=request as McpClearAuthRequest287
  const configured=ports.is(serverName)??ports.hostClients().find(row=>row.name===serverName)?.config??null
  const appClient=ports.getAppState().mcp.clients.find(row=>row.name===serverName)
  const dynamicClient=ports.getDynamicMcpState().clients.find(row=>row.name===serverName)
  const currentClient=appClient??dynamicClient
  const currentConfig=currentClient?.config
  const config=configured??currentConfig??null

  const revokeBothApplicableConfigs=async(selected:RemoteMcpConfig287)=>{
   await ports.revokeServerTokens(serverName,selected)
   if(currentConfig&&currentConfig!==selected&&
      (currentConfig.type==='sse'||currentConfig.type==='http')&&
      !ports.areMcpConfigsEqual(currentConfig,selected))
    await ports.revokeServerTokens(serverName,currentConfig)
  }

  if(!config){ports.error(frame,`Server not found: ${ports.serverName(serverName)}`);return true}
  if(config.type!=='sse'&&config.type!=='http'){
   ports.error(frame,`Cannot clear auth for server type "${config.type}"`);return true
  }

  if(!configured||ports.policyBlocked(serverName,config)||ports.disabled(serverName)){
   await revokeBothApplicableConfigs(config)
   const currentClient=ports.getAppState().mcp.clients.find(row=>row.name===serverName)??ports.getDynamicMcpState().clients.find(row=>row.name===serverName)
   if(currentClient&&currentClient.type!=='disabled'){
    await ports.clearServerCache(serverName,currentClient.config)
    if(ports.discoveryEnabled())await ports.afterDiscoveryCleanup(ports.dropDiscoveryEntry(serverName,currentClient.config))
    const reason=ports.policyReason(serverName,currentClient.config)
    const client:PrintMcpClient287=reason==='managed-policy'
     ?{name:serverName,type:'failed',config:currentClient.config,...ports.policyError(reason)} as PrintMcpClient287
     :ports.disabled(serverName)
      ?{name:serverName,type:'disabled',config:currentClient.config}
      :reason
       ?{name:serverName,type:'failed',config:currentClient.config,...ports.policyError(reason)} as PrintMcpClient287
       :{name:serverName,type:'failed',config:currentClient.config,error:'Authentication cleared'}
    ports.lanes.Xs(serverName,{client,tools:[],commands:[],attemptEpoch:ports.identityEpoch()})
   }
   ports.success(frame,{})
   return true
  }

  await revokeBothApplicableConfigs(config)
  ports.lanes.Ni(serverName,config)
  const result:SetCwdMcpDiscovery287=await ports.lanes.os(serverName,config,{distrust:true})
  ports.lanes.ji(serverName,result)
  ports.success(frame,{})
  return true
 }
}
