import React,{useState,useRef,useMemo,useEffect,useCallback,useContext} from 'react'
import {jsx,jsxs} from 'react/jsx-runtime'
import * as runtime from 'react/compiler-runtime'
import {isDeepStrictEqual} from 'node:util'
import chalk from 'chalk'
import figures from 'figures'
import {Box,Text,Ansi,type DOMElement} from '../../../ink.js'
import {useScreenReader} from '../../../ink/components/ScreenReaderContext.js'
import {ClockContext} from '../../../ink/components/ClockContext.js'
import StdinContext from '../../../ink/components/StdinContext.js'
import {useDeclaredCursor} from '../../../ink/hooks/use-declared-cursor.js'
import {getFocusManager} from '../../../ink/focus.js'
import {hitTest} from '../../../ink/hit-test.js'
import {useTerminalSize} from '../../../hooks/useTerminalSize.js'
import {useModalOrTerminalSize} from '../../../context/modalContext.js'
import {useRegisterOverlay} from '../../../context/overlayContext.js'
import {useKeybindings} from '../../../keybindings/useKeybinding.js'
import {normalizeFullWidthDigits,normalizeFullWidthSpace} from '../../stringUtils.js'
import {SelectInputOption} from '../../../components/CustomSelect/select-input-option.js'
import {useShortcutDisplay} from '../../../keybindings/useShortcutDisplay.js'
import {KeyboardShortcutHint} from '../../../components/design-system/KeyboardShortcutHint.js'
import {StatusIcon} from '../../../components/design-system/StatusIcon.js'
import {getSettings_DEPRECATED} from '../../settings/settings.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {logEvent} from '../../../services/analytics/index.js'
import {logForDebugging} from '../../debug.js'
import {getGraphemeSegmenter} from '../../intl.js'
import {createSelectorList287,createSelectorFocusHook287,createSelectorListEvents287,createSelectorText287,createSelectorStrings287,createSelectorHostMap287,createSelectorAccessibility287,createSelectorHidden287} from './selector.native.js'
const base={e:jsx,r:jsxs,K:React.Fragment,g:useState,A:useRef,Q:useMemo,R:useEffect,ce:useCallback,ke:useContext,
 w:(runtime as unknown as {c:(n:number)=>unknown[]}).c}
const expandContext=React.createContext(false) // Exact public original fB default.
const strings=createSelectorStrings287({})
const text=createSelectorText287({...strings,_a:getGraphemeSegmenter})
const hostMap=createSelectorHostMap287({})
const accessibility=createSelectorAccessibility287({...hostMap,U:getExecutionSession287,a:process.env,iC:(flag:string)=>process.argv.includes(flag),tt:()=>getSettings_DEPRECATED()})
function useClock(){const clock=useContext(ClockContext);if(!clock)throw Error('Selector requires Ink clock');return clock}
function useSourceFocusManager(){const host=useContext(StdinContext) as React.ContextType<typeof StdinContext>&{focusManager?:import('../../../ink/focus.js').FocusManager;rootNode?:DOMElement};return {focusDirection:(direction:'up'|'down'|'left'|'right')=>{if(!host.focusManager||!host.rootNode)throw Error('Selector requires original root focus host');return host.focusManager.focusDirection(direction,host.rootNode)}}}
const autofocus=createSelectorFocusHook287({R:useEffect,NT:getFocusManager}).Ug
function nodeText(value:React.ReactNode):string {if(typeof value==='string'||typeof value==='number')return String(value);if(Array.isArray(value))return value.map(nodeText).join('');if(React.isValidElement<{children?:React.ReactNode}>(value))return nodeText(value.props.children);return ''}
export function createModelSelectorListHostPorts287():Record<string,unknown>{
 const hiddenPorts={...base,...text,b:Symbol.for('react.memo_cache_sentinel'),n:Text,
  fB:expandContext,jt:React.createContext,xl:useShortcutDisplay,
  j:({chord,action,...props}:{chord:string;action:string})=><KeyboardShortcutHint shortcut={chord} action={action} {...props}/>}
 const hidden=createSelectorHidden287(hiddenPorts)
 const events=createSelectorListEvents287({...base,nn:useClock,S:(s:string)=>s,t:logForDebugging,i:logEvent,xDe:300})
 return {...base,...strings,...text,...hostMap,...accessibility,...events,...hiddenPorts,...hidden,s:Box,n:Text,po:Ansi,
  U:getExecutionSession287,a:process.env,iC:(flag:string)=>process.argv.includes(flag),tt:()=>getSettings_DEPRECATED(),
  nn:useClock,S:(s:string)=>s,t:logForDebugging,i:logEvent,xDe:300,
  J:figures,fe:chalk,by:React.Children,rc:React.Fragment,jt:React.createContext,sf:React.isValidElement,
  b:Symbol.for('react.memo_cache_sentinel'),ic:isDeepStrictEqual,ua:useRegisterOverlay,
  ao:React.useEffectEvent,Qt:useKeybindings,Ze:useScreenReader,ve:useTerminalSize,Yo:useModalOrTerminalSize,
  NT:getFocusManager,uv:useDeclaredCursor,Ug:autofocus,Xme:useSourceFocusManager,jW:hitTest,
  Fz:normalizeFullWidthSpace,XK:normalizeFullWidthDigits,RR:nodeText,
  ms:strings.ms,ie:(s:string)=>Bun.stringWidth(s,{ambiguousIsNarrow:true}),
  G:<T,>(rows:Iterable<T>,pred:(value:T)=>boolean)=>[...rows].filter(pred).length,
  Qe:StatusIcon,Kme:SelectInputOption,
 }
}
let sourceList287:ReturnType<typeof createSelectorList287>|undefined
function getSourceList287(){return sourceList287??=createSelectorList287(createModelSelectorListHostPorts287())}
// Ink exports finish initialization before the complete original renderer runs.
// This retains one stateless source factory, not a second model policy/cache.
export const originalModelSelectorList287:ReturnType<typeof createSelectorList287>={
 $e:props=>React.createElement(getSourceList287().$e,props),
}
