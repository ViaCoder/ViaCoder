import React from 'react'
import {NativeKeybindingContext287} from './KeybindingContextLeaf287.js'
import {randomInt} from 'node:crypto'
import * as compiler from 'react/compiler-runtime'
import {jsx} from 'react/jsx-runtime'
import {TerminalEvent} from '../ink/events/terminal-event.js'
import {dispatcher} from '../ink/reconciler.js'
import {getNativeTipModule287} from '../services/tips/tipsProduction287.js'
import {createOriginalKeybindingSignal287} from './signal287.js'
import {getKeybindingState287} from './state287.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../utils/hooks/outsideRuntime287.js'
import {logForDebugging} from '../utils/debug.js'
import * as source from '../plugins/bundled/officialBuiltinConsumer287/native.js'
import proof from '../plugins/bundled/officialBuiltinConsumer287/provenance.json' with {type:'json'}
type Module=Record<string,any>
const modules:Record<string,Module>={}
const owned=new Set(['chunk-yq5s263e.js','chunk-bv0yr1j4.js','chunk-1ypw9bby.js','chunk-nzck9a32.js','chunk-p50qybax.js','chunk-dhjf7yvr.js'])
export function readNativeKeybindingDependency287(file:string,name:string):any {
 if(file==='crypto'&&name==='randomInt')return randomInt
 if(file==='chunk-4s38z9x2.js'&&name==='Me')return createOriginalKeybindingSignal287
 if(file==='chunk-bgj860b4.js'&&name==='w')return (compiler as unknown as {c(size:number):any[]}).c
 if(file==='chunk-ysm7k028.js'&&name==='e')return jsx
 if(file==='chunk-1y575bx8.js'){
  const hooks:Module={A:React.useRef,g:React.useState,sn:React.useLayoutEffect,ce:React.useCallback,ke:React.useContext,jt:React.createContext,R:React.useEffect}
  if(Object.hasOwn(hooks,name))return hooks[name]
 }
 if(file==='chunk-yq5s263e.js'&&name==='u')return NativeKeybindingContext287
 if(file==='chunk-tf0wpqry.js'){
  if(name==='LP')return getKeybindingState287()
  // R02: original l$t is a pure telemetry publication; no action admission is omitted.
  if(name==='l$t')return ()=>{}
  return getNativeTipModule287(file)[name]
 }
 if(file==='chunk-p50qybax.js'&&name==='Zme')return TerminalEvent
 if(file==='chunk-p50qybax.js'&&name==='tae')return dispatcher
 if(file==='chunk-870yz02b.js'&&name==='b')return Symbol.for('react.memo_cache_sentinel')
 if(file==='chunk-q80zaav8.js'&&name==='t')return logForDebugging
 if(owned.has(file)){
  const value=getNativeKeybindingModule287(file)[name]
  if(value!==undefined)return value
 }
 const lifecycle=getOriginalModsLifecycle287().clearSourceModule287(file)
 if(lifecycle[name]!==undefined)return lifecycle[name]
 const outside=getOutsideHookRuntime287().sourceModule(file)
 if(outside?.[name]!==undefined)return outside[name]
 throw Error('Native keybinding host dependency missing: '+file+':'+name)
}
/** Original namespaces over the existing Ink dispatcher, LP and one provider context. */
export function getNativeKeybindingModule287(file:string):Module {
 if(modules[file])return modules[file]
 if(!owned.has(file))throw Error('Not an owned native keybinding namespace: '+file)
 const group=(proof.groups as Record<string,{factory:string}>)[file]
 const factory=(source as unknown as Record<string,(ports:{get:typeof readNativeKeybindingDependency287})=>Module>)[group.factory]
 return modules[file]=factory({get:readNativeKeybindingDependency287})
}
/** Original uw static root (export): its inactive callbacks and refs are source, not a fake interactive registry. */
export function NativeStaticKeybindingProvider287(props:{children:React.ReactNode}):React.ReactNode {
 return React.createElement(getNativeKeybindingModule287('chunk-1ypw9bby.js').uw,props)
}
