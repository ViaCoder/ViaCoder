import React,{useState,useRef,useMemo,useEffect,useCallback,useReducer,useContext,useLayoutEffect,useSyncExternalStore} from 'react'
import {jsx,jsxs} from 'react/jsx-runtime'
import * as compilerRuntime from 'react/compiler-runtime'
import chalk from 'chalk'
import {Box,Text,measureElement,useTerminalViewport,useTerminalFocus} from '../../../ink.js'
import {useScreenReader} from '../../../ink/components/ScreenReaderContext.js'
import {useTerminalSize} from '../../../hooks/useTerminalSize.js'
import {useModalOrTerminalSize,ModalContext} from '../../../context/modalContext.js'
import {useExitOnCtrlCDWithKeybindings} from '../../../hooks/useExitOnCtrlCDWithKeybindings.js'
import {sourceModelSessionController287,createModelSessionControllerPorts287} from './session.js'
export {sourceModelSessionController287} from './session.js'
import {useModelSelectorSearchInput287,createModelSelectorSearchHostPorts287} from './selectorSearchInput.js'
import {useKeybindings} from '../../../keybindings/useKeybinding.js'
import {useAppState,type AppState} from '../../../state/AppState.js'
import {useTheme} from '../../../components/design-system/ThemeProvider.js'
import {Byline} from '../../../components/design-system/Byline.js'
import {KeyboardShortcutHint} from '../../../components/design-system/KeyboardShortcutHint.js'
import {ConfigurableShortcutHint} from '../../../components/ConfigurableShortcutHint.js'
import {Pane} from '../../../components/design-system/Pane.js'
import {originalModelSelectorList287,createModelSelectorListHostPorts287} from './selectorList.js'
import {getTheme,themeColorToAnsi,type ThemeName} from '../../theme.js'
import {isFastModeEnabled,isFastModeAvailable,isFastModeCooldown,FAST_MODE_MODEL_DISPLAY} from '../../fastMode.js'
import {getModelOptions} from '../modelOptions.js'
import {modelDisplayString,parseUserSpecifiedModel} from '../model.js'
import {getClientData} from '../../clientData.js'
import {getModelBehaviorName287} from '../behavior287.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {bindOfficialEffortWc287Imports287,supportsOfficialHookEffort287} from '../effortWc287.js'
import {getSettingsEffortTable,decodeSessionEffort} from '../effortSettings.js'
import {lazySchema} from '../../lazySchema.js'
import {areWorkflowsEnabled} from '../../../tools/WorkflowTool/gate.js'
import {logEvent} from '../../../services/analytics/index.js'
import {onGrowthBookRefresh} from '../../../services/analytics/growthbook.js'
import {getServedCatalogVersion,subscribeServedCatalog} from '../servedCatalog.js'
import {createOfficialModelMenuPorts287,createOfficialModelMenuPolicyPorts287,getOfficialModelMenuPolicy287,getOfficialModelReprobeRuntime287} from '../officialModelPicker287.js'
import {EFFORT_LOW,EFFORT_MEDIUM,EFFORT_HIGH,EFFORT_XHIGH,EFFORT_MAX} from '../../../constants/figures.js'
import {createSelectorRefresh287,createSelectorSelector287,createSelectorStateRef287,createSelectorSession287,createSelectorOptionIdentity287,createSelectorEffort287,createSelectorRatchet287,createSelectorEmptyMessage287,createSelectorLexical287,createSelectorDisplay287,createSelectorTerminal287,type SourceEffortState287} from './selector.native.js'

// Exact original Te default is Object.freeze({}). Public local callers use the
// existing SDK credential selector; explicit private context is never dropped.
const publicContext=Object.freeze({})
export const ModelSelectorRuntimeContext287=React.createContext<{storageV5?:unknown;credentials?:unknown}>(publicContext)
const baseReact={e:jsx,r:jsxs,K:React.Fragment,get s(){return Box},get n(){return Text},g:useState,A:useRef,Q:useMemo,R:useEffect,Uh:useReducer,ce:useCallback,
  w:(compilerRuntime as unknown as {c:(size:number)=>unknown[]}).c}
function sourceAppState(state:AppState):SourceEffortState287 & AppState {
  const owner=getExecutionSession287().modelSelection.mainLoopEffortState()
  return {...state,sessionEffort:owner?.sessionEffort??decodeSessionEffort(state.effortValue),
    settingsEffortTable:owner?.settingsEffortTable??getSettingsEffortTable()}
}
function useSourceAppState<T>(selector:(state:ReturnType<typeof sourceAppState>)=>T):T {
  const state=useAppState(state=>state)
  const adapted=useMemo(()=>sourceAppState(state),[state])
  return selector(adapted)
}
function menuPorts(){return createOfficialModelMenuPorts287()}
function policyFunction(name:string){return (...args:unknown[])=>{
  const fn=getOfficialModelMenuPolicy287()[name]
  if(typeof fn!=='function')throw new Error('Unbound source model selector policy '+name)
  return fn(...args)
}}
function subscribeModelRefresh287(listener:()=>void){const catalog=subscribeServedCatalog(listener),remote=onGrowthBookRefresh(listener);return ()=>{catalog();remote()}}
function Shortcut({chord,action}:{chord:string|string[];action:string}) {
  return <KeyboardShortcutHint shortcut={(Array.isArray(chord)?chord:[chord]).map(value=>({left:'←',right:'→',down:'↓',enter:'Enter',escape:'Esc'}[value]??value)).join('/')} action={action}/>
}
export function createActualModelSelectorPorts287():Record<string,unknown> {
const lexical=createSelectorLexical287({QZ:createOfficialModelMenuPolicyPorts287().QZ})
const effort=createSelectorEffort287({...bindOfficialEffortWc287Imports287(),...lexical,
  El:()=>getOfficialModelMenuPolicy287().El(),Rt:parseUserSpecifiedModel,f:lazySchema,
  nm:areWorkflowsEnabled,
})
const refresh=createSelectorRefresh287({R:useEffect,Uh:useReducer,xp:subscribeModelRefresh287})
const optionIdentity=createSelectorOptionIdentity287(new Proxy({} as Record<string,unknown>,{get:(_,key)=>menuPorts()[String(key)]}))
const display=createSelectorDisplay287({a:process.env,...createSelectorTerminal287({})})

 const stateRef=createSelectorStateRef287(baseReact)
 const ratchet=createSelectorRatchet287({...baseReact,ke:useContext,sn:useLayoutEffect,zL:ModalContext,ve:useTerminalSize,si:measureElement,
  rV:()=>{const [ref,entry]=useTerminalViewport();return [ref,entry,()=>entry.isVisible]}
})
 const emptyMessage=createSelectorEmptyMessage287(baseReact)

  return {...baseReact,...stateRef,...effort,jw:supportsOfficialHookEffort287,...optionIdentity,...sourceModelSessionController287,...ratchet,...emptyMessage,...display,
    $e:originalModelSelectorList287.$e,$r:(model:string)=>getOfficialModelMenuPolicy287().$r(model),Be:getModelBehaviorName287,
    El:()=>getOfficialModelMenuPolicy287().El(),Rt:parseUserSpecifiedModel,
    Fg:useModelSelectorSearchInput287,Qt:useKeybindings,z:useSourceAppState,
    hS:()=>useSourceAppState(effort.kd),al:()=>useAppState(state=>state.settings),
    PI:refresh.PI,
    Te:()=>useContext(ModelSelectorRuntimeContext287),Jn:useTheme,Ze:useScreenReader,nc:useTerminalFocus,
    ve:useTerminalSize,Yo:useModalOrTerminalSize,Ao:useExitOnCtrlCDWithKeybindings,
    UH:modelDisplayString,gMr:getModelOptions,Kd:()=>getClientData(),To:isFastModeEnabled,
    tT:isFastModeAvailable,VPe:isFastModeCooldown,pU:()=>FAST_MODE_MODEL_DISPLAY,
    vbe:()=>Promise.reject(new Error('Bedrock inference profiles are excluded')),
    bootstrapImport287:()=>import('../../../services/api/bootstrap.js').then(module=>({fetchBootstrapData:(storage?:unknown,credentials?:unknown)=>{
      if(storage!==undefined||credentials!==undefined)throw Error('Explicit bootstrap context requires original refresh host')
      return module.fetchBootstrapData()
    }})),
    me:(value:unknown)=>value,i:logEvent,y:logEvent,en:(text:string)=>Bun.stripANSI(text),
    fe:chalk,
    Pn:(color:keyof ReturnType<typeof getTheme>,theme:ThemeName)=>(text:string)=>themeColorToAnsi(getTheme(theme)[color])+text+'\x1b[39m',
    uNt:(text:string)=>text[0]?.toUpperCase()+text.slice(1),
    Sb:'⚠',dL:'May use excessive tokens resulting in long response times or overthinking. Use sparingly for the hardest tasks.',
    K9o:EFFORT_LOW,Gzt:EFFORT_MEDIUM,sYr:EFFORT_HIGH,Y9o:EFFORT_XHIGH,X9o:EFFORT_MAX,
    be:Byline,j:Shortcut,et:ConfigurableShortcutHint,Po:Pane,
  }
}
let sourceSelector287:ReturnType<typeof createSelectorSelector287>|undefined
function getSourceSelector287(){return sourceSelector287??=createSelectorSelector287(createActualModelSelectorPorts287())}
export function OriginalModelSelector287(props:import('./selector.native.js').SourceSelectorProps287){
 return React.createElement(getSourceSelector287().mHe,props)
}
export const originalModelSelector287=new Proxy({mHe:OriginalModelSelector287} as ReturnType<typeof createSelectorSelector287>,{
 get:(target,key)=>key==='mHe'?target.mHe:Reflect.get(getSourceSelector287(),key),
 has:(_target,key)=>Reflect.has(getSourceSelector287(),key),
 ownKeys:()=>Reflect.ownKeys(getSourceSelector287()),
 getOwnPropertyDescriptor:(target,key)=>key==='mHe'?Object.getOwnPropertyDescriptor(target,key):Object.getOwnPropertyDescriptor(getSourceSelector287(),key),
})

/** Host-only bindings for independent raw execution, never generated helpers. */
export function createModelSelectorSourceHostPorts287():Record<string,unknown> {
  return {xp:subscribeModelRefresh287,Uh:useReducer,...menuPorts(),...bindOfficialEffortWc287Imports287(),...createSelectorLexical287({QZ:createOfficialModelMenuPolicyPorts287().QZ}),...createModelSessionControllerPorts287(),...createModelSelectorSearchHostPorts287(),...createModelSelectorListHostPorts287(),
    uQn:(model:string)=>getOfficialModelReprobeRuntime287().uQn(model),pQn:(model:string)=>getOfficialModelReprobeRuntime287().pQn(model),QZ:createOfficialModelMenuPolicyPorts287().QZ,
    ke:useContext,sn:useLayoutEffect,zL:ModalContext,si:measureElement,
    rV:()=>{const [ref,entry]=useTerminalViewport();return [ref,entry,()=>entry.isVisible]},
    ...createActualModelSelectorPorts287(),f:lazySchema,nm:areWorkflowsEnabled,a:process.env,
  }
}
