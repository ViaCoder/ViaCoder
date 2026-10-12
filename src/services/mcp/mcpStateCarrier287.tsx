import React,{useState} from 'react'
import type {AppState,AppStateStore} from '../../state/AppStateStore.js'
import type {MCPServerConnection,ConnectedMCPServerV2} from './types.js'
import {adaptNativeModernConnection287,getMcpConnectedProducer287,isNativeModernConnection287} from './connectedProducer287.js'
import {projectMcpResourceHelperTools} from './resourceToolProjection.js'
import {readMcpStateCarrier287,type McpCarrierState287,type McpCarrierHostState287,type McpCarrierClient287} from './officialMcpStateCarrier287/readers.js'

/** A read/write lens onto the existing AppStore, not a new store/cache. The
 * local V2 UI discriminator is lowered only here; SDK/Tool identity survives. */
export function sourceMcpCarrierState287(state:AppState):McpCarrierHostState287 {
 return {...state,mcp:{...state.mcp,clients:state.mcp.clients.map(row=>{
  if(row.type!=='v2-connected')return row
  const live=state.mcp.v2Clients.find(client=>client.name===row.name&&getMcpConnectedProducer287().configsEqual(client.config,row.config))
  if(!isNativeModernConnection287(live))throw Error('MCP status lost its actual native V2 owner')
  return live
 })}}
}
export function lowerMcpCarrierState287(state:McpCarrierState287):AppState['mcp'] {
 const v2Clients:ConnectedMCPServerV2[]=[]
 const clients:MCPServerConnection[]=state.clients.map(row=>{
  if(!isNativeModernConnection287(row))return row
  const pointer=row.v2Connection
  const live=pointer&&isNativeModernConnection287(pointer)&&pointer.client===row.client
   ?pointer:adaptNativeModernConnection287(row)
  v2Clients.push(live)
  return {name:row.name,type:'v2-connected',generation:'v2',config:row.config,
   capabilities:row.capabilities,serverInfo:row.serverInfo,instructions:row.instructions}
 })
 const mcp={...state,clients,v2Clients}
 return {...mcp,tools:projectMcpResourceHelperTools(mcp)}
}
export function nativeMcpQueueClient287(client:MCPServerConnection&{v2Connection?:ConnectedMCPServerV2|null}):McpCarrierClient287 {
 if(client.type!=='v2-connected')return client
 if(!isNativeModernConnection287(client.v2Connection))throw Error('Queued MCP V2 update needs the same native SDK row')
 return {...client.v2Connection,v2Connection:client.v2Connection}
}
export function McpStateProvider287({store,children}:{store:AppStateStore;children:React.ReactNode}):React.ReactNode {
 const {QGe,L0n}=readMcpStateCarrier287()
 const [carrier]=useState(()=>QGe.over({
  getState:()=>sourceMcpCarrierState287(store.getState()),
  setState:update=>store.setState(prev=>{
   const source=sourceMcpCarrierState287(prev),next=update(source)
   if(source===next)return prev
   return {...prev,mcp:lowerMcpCarrierState287(next.mcp)}
  }),
 }))
 return <L0n.Provider value={carrier}>{children}</L0n.Provider>
}
