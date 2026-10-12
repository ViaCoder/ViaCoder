import * as React from 'react'
import {createConfigUiComplete287,type OriginalConfigUiProps287, type ConfigSetting287} from '../../utils/officialPublicCommandDiscovery287/completions.js'
import {commandCallbackPorts287,getConfigWriterController287} from '../../utils/commandCallbackWriters287.js'
import {publicCommandSourcePort287} from '../../utils/commandCompletionProducers287.js'
import {useAppState,useSetAppState,useAppStateStore} from '../../state/AppState.js'
import {useTheme,useThemeSetting} from '../../ink.js'
import {useTabHeaderFocus} from '../design-system/Tabs.js'
import {getAutoUpdaterDisabledReason,formatAutoUpdaterDisabledReason} from '../../utils/config.js'
import {persistUiSettings287} from '../../utils/settings/uiPersistence287.js'
import {logEvent} from '../../services/analytics/index.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {LocalJSXCommandContext} from '../../types/command.js'
import {getSharedKillRingState287,dispatchSharedKillRing287} from '../../utils/Cursor.js'

export type ConfigInteractiveProps287=Omit<OriginalConfigUiProps287,'mcpClients'|'messages'|'unclaimedPaneClick'> & {context:LocalJSXCommandContext}
/** This provider is a readonly ABI view of the mounted product store. It owns
 * no AppState, credentials, settings, theme or command/plugin cache. */
export function ConfigInteractive287(props:ConfigInteractiveProps287){
 const store=useAppStateStore(),view=React.useMemo(()=>({getSnapshot:store.getState,getState:store.getState,setState:store.setState,subscribe:store.subscribe}),[store])
 const host=React.useRef(props);host.current=props
 const session=()=>(host.current.context as LocalJSXCommandContext&{session?:ExecutionSession287}).session??getExecutionSession287()
 const body=React.useMemo(()=>{
  const ports=Object.defineProperties({},Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(commandCallbackPorts287('configUi'))).map(([name,descriptor])=>[name,{...descriptor,configurable:true}]))),writer=getConfigWriterController287()
  const replacements:Record<string,unknown>={
   Te:()=>({storageV5:host.current.context.storageV5,credentials:host.current.context.credentials}),
   _r:session,dv:session,
   z:useAppState,En:useSetAppState,Tr:useAppStateStore,Jn:useTheme,Qie:useThemeSetting,uh:useTabHeaderFocus,
   _Nn:writer.sourceInputs,yNn:writer.notificationKeys,Ywr:writer.grantBlockerMessages,Nxt:writer.readGlobal,SNn:writer.pluginRows,Uxt:writer.display,NZt:writer.decorate,Bxt:writer.change,Xwr:writer.labels,
   Tqe:(inputs:Record<string,any>)=>{
    const result=writer.descriptors(inputs)
    return {...result,settings:result.settings.map((row:ConfigSetting287)=>{
     // Keep the accepted C thinking preference/persistence order and the
     // development updater stop. All other rows retain their original body.
     if(row.id==='thinking')return {...row,onChange:async(enabled:boolean)=>{
      inputs.setAppState((state:import('../../state/AppStateStore.js').AppState)=>({...state,thinkingEnabled:enabled}))
      let error:Error|undefined
      const saved=await persistUiSettings287('userSettings',{alwaysThinkingEnabled:enabled?undefined:false},undefined,value=>{error=value})
      if(!saved)return {error}
      logEvent('tengu_thinking_toggled',{enabled})
     }}
     const reason=getAutoUpdaterDisabledReason()
     if(row.id==='autoUpdatesChannel'&&reason)return {...row,value:'disabled',lock:{source:'managed',reason:formatAutoUpdaterDisabledReason(reason)}}
     return row
    })}
   },
  }
  for(const [name,value]of Object.entries(replacements))Object.defineProperty(ports,name,{enumerable:true,value})
  Object.defineProperty(ports,'requireCommandModule287',{value:(module:string)=>{
   if(module==='/$bunfs/root/chunk-tnwx1mmk.js')return {isBriefEntitled:publicCommandSourcePort287('chunk-q1yatwsf.js','wen')}
   throw Error('Unknown interactive config source module '+module)
  }})
  return createConfigUiComplete287(ports).Config
 },[])
 const stateModule=publicCommandSourcePort287('chunk-t1n6x7q0.js','OI') as React.Context<unknown>
 const sessionModule=publicCommandSourcePort287('chunk-t1n6x7q0.js','M0n') as React.Context<unknown>
 // The published Fg and nested text editors require the same original
 // context. Its handle is a view of the existing Cursor owner, not a second
 // renderer-local ring. Keep the complete source hooks in both paths.
 const killRingContext=publicCommandSourcePort287('chunk-6wk6xet4.js','l') as React.Context<unknown>
 const killRing=React.useMemo(()=>({get state(){return getSharedKillRingState287()},dispatch:dispatchSharedKillRing287}),[])
 // The original click subscription cancels pending text/enum editors. Route
 // actual pane bubbling clicks to its subscribers; no second business queue.
 const click=React.useMemo(()=>{
  const listeners=new Set<()=>void>()
  return {subscribe(listener:()=>void){listeners.add(listener);return()=>listeners.delete(listener)},emit(){for(const listener of listeners)listener()}}
 },[])
 const Box=(require('../../ink.js') as typeof import('../../ink.js')).Box
 return <stateModule.Provider value={view}><sessionModule.Provider value={session()}><killRingContext.Provider value={killRing}><Box onClick={()=>click.emit()}>{React.createElement(body,{...props,mcpClients:props.context.options.mcpClients,messages:props.context.messages,unclaimedPaneClick:click})}</Box></killRingContext.Provider></sessionModule.Provider></stateModule.Provider>
}
