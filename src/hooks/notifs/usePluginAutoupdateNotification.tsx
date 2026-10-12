import * as React from 'react'
import {useEffect,useRef,useState} from 'react'
import type {ToolUseContext} from '../../Tool.js'
import type {ScopedMcpServerConfig} from '../../services/mcp/types.js'
import {useAppStateStore} from '../../state/AppState.js'
import {useNotifications,type Notification} from '../../context/notifications.js'
import {Text} from '../../ink.js'

export type PluginAutoupdateContextGetter287=()=>Pick<ToolUseContext,'storageV5'|'credentials'> & {options:Pick<ToolUseContext['options'],'mainLoopModel'> & {dynamicMcpConfig?:Record<string,ScopedMcpServerConfig>}}
type EffectInput287={store:ReturnType<typeof useAppStateStore>;storageV5:unknown;credentials:unknown}
interface PluginAutoupdateEffect287 {
 deps(input:EffectInput287):unknown[]
 setup(): (input:EffectInput287,latest:()=>{
  mainLoopModel:string;dynamicMcpConfig?:Record<string,ScopedMcpServerConfig>;addNotification(content:Notification|SegmentNotice287):void
 })=>void|(()=>void)
}
interface SegmentNotice287 {
 key:string;segments:Array<{text:string;color?:React.ComponentProps<typeof Text>['color'];dim?:boolean}>
 priority:'low'|'medium'|'high'|'immediate';timeoutMs?:number
}
function originalEffect287():PluginAutoupdateEffect287 {
 return (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js'))
  .getOriginalModsLifecycle287().clearSourceModule287('chunk-f2cpzzp9.js').Wot as PluginAutoupdateEffect287
}
/** Complete original Wot owns pending pins/refusals, sequence and reload
 * effects. Only terminal segment presentation borrows the existing C renderer.
 * Context is read after host binding by effects, never eagerly during render. */
export function usePluginAutoupdateNotification(getContext:PluginAutoupdateContextGetter287):void {
 const store=useAppStateStore(),{addNotification}=useNotifications()
 const latest=useRef({getContext,addNotification});latest.current={getContext,addNotification}
 const [original]=useState(()=>{const declaration=originalEffect287();return {deps:declaration.deps,run:declaration.setup()}})
 // React lifetime bookkeeping only. Plugin sequence/notices/reload state remain
 // inside the full original Wot closure; compare its own dependency selector.
 const binding=useRef<{deps:unknown[];dispose:(()=>void)|undefined}|undefined>(undefined)
 useEffect(()=>{
  const context=latest.current.getContext()
  const input={store,storageV5:context.storageV5,credentials:context.credentials},deps=original.deps(input)
  if(binding.current&&deps.length===binding.current.deps.length&&deps.every((value,index)=>Object.is(value,binding.current!.deps[index])))return
  binding.current?.dispose?.()
  const dispose=original.run(input,()=>{
   const current=latest.current.getContext()
   return {mainLoopModel:current.options.mainLoopModel,dynamicMcpConfig:current.options.dynamicMcpConfig,addNotification:(notice:Notification|SegmentNotice287)=>{
    // Display-only adaptation: original text/colors/dim/ordering and key stay
    // intact, with the real notification writer and no second toast queue.
    if('segments'in notice){const {segments,...metadata}=notice;latest.current.addNotification({...metadata,jsx:<>{segments.map((segment,index)=><Text key={index} color={segment.color} dimColor={segment.dim}>{segment.text}</Text>)}</>})}
    else latest.current.addNotification(notice)
   }}
  })
  binding.current={deps,dispose:typeof dispose==='function'?dispose:undefined}
 })
 useEffect(()=>()=>{binding.current?.dispose?.();binding.current=undefined},[])
}
