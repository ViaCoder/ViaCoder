import React,{useContext,useMemo,useRef} from 'react'
import * as compilerRuntime287 from 'react/compiler-runtime'
const c=(compilerRuntime287 as unknown as {c(size:number):any[]}).c
import {jsx,jsxs} from 'react/jsx-runtime'
import {Box,Text,Link,Button,useTheme} from '../../ink.js'
import TextInput from '../../components/TextInput.js'
import {getNativeKeybindingModule287} from '../../keybindings/nativeKeybindingHost287.js'
import {useOptionalKeybindingContext} from '../../keybindings/KeybindingContext.js'
import {OfficialRltDialogContext287} from '../../utils/officialRlt287.js'
import {ClockContext} from '../../ink/components/ClockContext.js'
import {useTerminalSize} from '../../hooks/useTerminalSize.js'
import {isFullscreenActive} from '../../utils/fullscreen.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {logForDebugging} from '../../utils/debug.js'
import {errorMessage} from '../../utils/errors.js'
import StdinContext from '../../ink/components/StdinContext.js'
import AppContext from '../../ink/components/AppContext.js'
import useStdin from '../../ink/hooks/use-stdin.js'
import instances from '../../ink/instances.js'
import measureElement from '../../ink/measure-element.js'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import {useAppState,useAppStateStore,AppStoreContext} from '../../state/AppState.js'
import * as source from './officialBuiltinConsumer287/native.js'
import proof from './officialBuiltinConsumer287/provenance.json' with {type:'json'}

/** Readonly message identity view. It does not own a message/history/cache. */
export const NativeAssistantIdentity287=React.createContext<string|undefined>(undefined)
const renderInstance=React.createContext<{component:string;requestId:string}|null>(null)
export const NativeAssistantStaticFrame287=React.createContext(false)
type Props={param:{type:'text';text:string};shouldShowDot:boolean;width?:number|string;messageId?:string;[key:string]:unknown}
type OriginalModule=Record<string,any>
const groups=proof.groups as Record<string,{factory:string;cuts:string[]}>
let publicUIState:OriginalModule|undefined
let focusedRenderer:ReturnType<typeof createNativeAssistantRenderer287>|undefined
const focusedModules=new Set(['chunk-f2cpzzp9.js','chunk-6zne1pwx.js','chunk-d3kya706.js','chunk-ynchm1e0.js','chunk-7j4jtzd4.js'])
/** One original focused surface namespace, including O$. kg's zNt/VNt and
 * hot's ID are imported from their existing owners, never constructed here. */
export function getNativeFocusedUI287(file='chunk-f2cpzzp9.js'):OriginalModule{
 focusedRenderer??=createNativeAssistantRenderer287(undefined,()=>null)
 return focusedRenderer.sourceModule(file)
}
export function readNativeFocusedDependency287(file:string,name:string):unknown{
 focusedRenderer??=createNativeAssistantRenderer287(undefined,()=>null)
 return focusedRenderer.readDependency(file,name)
}
/** Original module state exists once, not once per message/renderer. */
export function getNativePublicUIState287():OriginalModule{
 const ct=getOriginalModsLifecycle287().clearSourceModule287('chunk-x954y317.js').ct
 if(typeof ct!=='function')throw Error('Original UI disposal constructor not bound')
 return publicUIState??=source.createPublicUIState287({jt:React.createContext,ct})
}

/** Full original Qs/xO/H8t/nr/pt on the already-existing Wke render owner.
 * A per-component factory holds only pure functions and a readonly host view;
 * no Mods registry, drawings cache, color cache, session or clock is copied. */
export function NativeAssistantTextSite287({props,core}:{props:Props;core:React.ComponentType<any>}):React.ReactNode{
 const size=useTerminalSize(),clock=useContext(ClockContext)
 const host=useRef({size,width:props.width,clock});host.current={size,width:props.width,clock}
 const modules=useMemo(()=>createNativeAssistantRenderer287(host,core),[core])
 const Component=modules.component
 return <Component {...props}/>
}

/** Pure source namespaces over readonly current Ink host; all render evaluation,
 * registry and cache operations still use the existing canonical Wke/IN owners. */
export function createNativeAssistantRenderer287(host:{current:{size:{columns:number;rows:number};width?:number|string;clock:React.ContextType<typeof ClockContext>}}|undefined,core:React.ComponentType<any>,factories:typeof source=source):{component:React.ComponentType<Props>;sourceModule(file:string):OriginalModule;readDependency(file:string,name:string):unknown}{
  const cells:Record<string,OriginalModule>={}
  const l=getOriginalModsLifecycle287(),outside=getOutsideHookRuntime287()
  const canonical=(file:string,name:string):unknown=>{
   const own=l.clearSourceModule287(file);if(own[name]!==undefined)return own[name]
   const other=outside.sourceModule(file);if(other?.[name]!==undefined)return other[name]
   throw Error('Canonical native render dependency missing: '+file+':'+name)
  }
  const get=(file:string,name:string):unknown=>{
   if(file==='chunk-1y575bx8.js'){
    const hooks:Record<string,unknown>={Q:React.useMemo,R:React.useEffect,A:React.useRef,g:React.useState,ce:React.useCallback,kt:React.useSyncExternalStore,Qc:React.createElement,sn:React.useLayoutEffect,jt:React.createContext,Of:React.memo,Uh:React.useReducer}
    if(name==='ke')return React.useContext
    if(hooks[name])return hooks[name]
   }
   if(file==='chunk-t1n6x7q0.js'&&name==='z')return useAppState
   if(file==='chunk-t1n6x7q0.js'&&name==='OI')return AppStoreContext
   if(file==='chunk-t1n6x7q0.js'&&name==='Tr')return useAppStateStore
   if(file==='chunk-9ttzd4sp.js'&&name==='ID')return (require('../../utils/hotSessionController287/runtime.js') as typeof import('../../utils/hotSessionController287/runtime.js')).getHotSessionLeaves287().draftValueStore
   if(file==='chunk-1y575bx8.js'&&name==='Us')return ()=>instances
   if(file==='chunk-nzck9a32.js'&&name==='nae')return StdinContext
   if(file==='path')return (path as Record<string,unknown>)[name]
   if(file==='fs/promises')return (fsPromises as Record<string,unknown>)[name]
   if(file==='chunk-z8368gas.js'&&name==='xb')return ClockContext
   if(file==='chunk-p50qybax.js'&&name==='VS')return AppContext
   if(file==='chunk-p50qybax.js')return getNativeKeybindingModule287(file)[name]
   if(file==='chunk-038c023k.js'&&name==='Jn')return useTheme
   if(file==='chunk-fvc3vhv1.js'&&name==='zL')return getNativePublicUIState287().zL
   if(file==='chunk-bgj860b4.js'&&name==='w')return c
   if(file==='chunk-ysm7k028.js'&&name==='e')return jsx
   if(file==='chunk-ysm7k028.js'&&name==='r')return jsxs
   if(file==='chunk-yq5s263e.js'&&name==='yl')return useOptionalKeybindingContext
   if(file==='chunk-yq5s263e.js'&&name==='PO')return getNativeKeybindingModule287(file).PO
   if(file==='chunk-sfx0zagn.js'&&name==='ve')return useTerminalSize
   if(file==='chunk-hs5rysex.js'&&name==='sr')return TextInput
   if(file==='chunk-62ct6c99.js'&&name==='Np')return ()=>{
    const store=React.useContext(OfficialRltDialogContext287)
    if(!store)throw ReferenceError('Original public UI action requires the existing DialogStoreContext provider')
    return store
   }
   if(file==='chunk-q80zaav8.js'&&name==='t')return logForDebugging
   if(file==='chunk-c9me9cp7.js'&&name==='l')return errorMessage
   if(file==='chunk-ehgj996x.js'&&name==='Wnt')return NativeAssistantStaticFrame287
   if(file==='chunk-kgfqrfpa.js'&&name==='Jne'&&host)return {get:()=>({conversationColumns:typeof host.current.width==='number'?host.current.width:host.current.size.columns,rows:host.current.size.rows})}
   if(file==='chunk-jkt292h5.js'){
    if(name==='si')return measureElement
    if(name==='ti')return isFullscreenActive
    if(name==='s')return getNativeKeybindingModule287('chunk-nzck9a32.js').yc
    if(name==='n')return Text
    if(name==='It')return Link
    if(name==='VL')return Button
   }
   if(file==='chunk-jwaasbtw.js'){
    if(name==='gc')return {useRenderInput:moduleOf(file).xO,useRenderHook:moduleOf(file)['H$']}
    if(name==='ee')return renderInstance
    const state=getNativePublicUIState287()
    if(Object.hasOwn(state,name))return state[name]
    // Je/Wt/Client/Image/Raster are full selected original functions below.
   }
   if(file==='chunk-nzck9a32.js'){
    if(name==='GW')return (require('../../commands/scrollSpeed/runtime287.js') as typeof import('../../commands/scrollSpeed/runtime287.js')).getScrollSpeedRuntime287().environment
    const module=getNativeKeybindingModule287(file);if(Object.hasOwn(module,name))return module[name]
   }
   if(file==='chunk-5s6b4r7q.js'&&name==='Ym')return core
   if(file==='chunk-mphp7acd.js'&&(name==='fa'||name==='T1t'))return canonical(file,name)
   if(groups[file]?.cuts.includes(name))return canonical(file,name)
   if(groups[file]){const module=moduleOf(file);if(Object.hasOwn(module,name))return module[name]}
   return canonical(file,name)
  }
  function moduleOf(file:string):OriginalModule{
   if(host&&focusedModules.has(file))return getNativeFocusedUI287(file)
   if(cells[file])return cells[file]
   const factory=(factories as unknown as Record<string,(ports:{get:typeof get})=>OriginalModule>)[groups[file].factory]
   return cells[file]=factory({get})
  }
  return {component:moduleOf('chunk-5s6b4r7q.js').Qs as React.ComponentType<Props>,sourceModule:moduleOf,readDependency:get}
}
