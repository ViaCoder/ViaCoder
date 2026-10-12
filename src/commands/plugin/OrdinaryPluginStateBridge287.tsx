import * as React from 'react'
import {AppStoreContext, type AppStateStore} from '../../state/AppState.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {useMcpReconnect,useMcpToggleEnabled} from '../../services/mcp/MCPConnectionManager.js'
import {ordinaryPluginSource287} from '../../utils/plugins/ordinaryPlugin287.js'

/** Original plugin views read the existing AppState store and its original
 * typed views. These providers introduce no state, subscriptions or registry. */
export function OrdinaryPluginStateBridge287({children}:React.PropsWithChildren):React.ReactNode {
 const store=React.useContext(AppStoreContext)
 if(!store)throw new ReferenceError('Plugin views require the existing AppStateProvider')
 // Original xe reads getSnapshot; C's store exposes that same read as getState.
 Object.defineProperty(store,'getSnapshot',{value:store.getState,configurable:true})
 const reconnectMcpServer=useMcpReconnect(),toggleMcpServer=useMcpToggleEnabled()
 const mcpActions=React.useMemo(()=>({reconnectMcpServer,toggleMcpServer}),[reconnectMcpServer,toggleMcpServer])
 const mcpActionContext=ordinaryPluginSource287('chunk-f2cpzzp9.js').JE as React.Context<typeof mcpActions>
 const contexts=ordinaryPluginSource287('chunk-t1n6x7q0.js') as {
  OI:React.Context<AppStateStore>;N0n:React.Context<unknown>;
  M0n:React.Context<unknown>;L0n:React.Context<unknown>
 }
 const plugins=React.useMemo(()=>{
  const JW=ordinaryPluginSource287('chunk-afee8603.js').JW as {over(store:AppStateStore):unknown}
  return JW.over(store)
 },[store])
 const mcp=React.useMemo(()=>{
  const QGe=ordinaryPluginSource287('chunk-3ydwrp4g.js').QGe as {over(store:AppStateStore):unknown}
  return QGe.over(store)
 },[store])
 return <mcpActionContext.Provider value={mcpActions}><contexts.OI.Provider value={store}><contexts.N0n.Provider value={plugins}><contexts.L0n.Provider value={mcp}><contexts.M0n.Provider value={getExecutionSession287()}>{children}</contexts.M0n.Provider></contexts.L0n.Provider></contexts.N0n.Provider></contexts.OI.Provider></mcpActionContext.Provider>
}
