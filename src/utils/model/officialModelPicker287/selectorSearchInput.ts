import React,{useState,useRef,useMemo,useCallback,useSyncExternalStore} from 'react'
import {useTerminalSize} from '../../../hooks/useTerminalSize.js'
import {getSharedKillRingState287,dispatchSharedKillRing287} from '../../Cursor.js'
import {getGraphemeSegmenter,getWordSegmenter,firstGrapheme,lastGrapheme} from '../../intl.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {getInitialSettings,getSettingsForSource} from '../../settings/settings.js'
import {getEnabledSettingSources} from '../../settings/constants.js'
import {getGlobalConfig} from '../../config.js'
import {logError} from '../../log.js'
import {logEvent} from '../../../services/analytics/index.js'
import {createSelectorText287,createSelectorStrings287,createSelectorCursor287,createSelectorSearch287,createSelectorWarnings287,createSelectorHostMap287} from './selector.native.js'
const strings=createSelectorStrings287({})
const text=createSelectorText287({...strings,_a:getGraphemeSegmenter})
const hostMap=createSelectorHostMap287({})
const warnings=createSelectorWarnings287({...hostMap,U:getExecutionSession287})
export function createModelSelectorSearchHostPorts287():Record<string,unknown> {
 return {...strings,...text,g:useState,A:useRef,Q:useMemo,ce:useCallback,ve:useTerminalSize,
  _a:getGraphemeSegmenter,cJr:getWordSegmenter,kfe:firstGrapheme,pW:lastGrapheme,
  iY:(s:string)=>[...getGraphemeSegmenter().segment(s)].length,
  ie:(s:string)=>Bun.stringWidth(s,{ambiguousIsNarrow:true}),P:Error,d:logError,
  ...hostMap,...warnings,U:getExecutionSession287,
  Qto:()=>vimOwner().vimSharedState(),
  Zto:(value:unknown)=>vimOwner().replaceVimSharedState(value),
  RDe:()=>({get state(){return getSharedKillRingState287()},dispatch:dispatchSharedKillRing287}),
  mze:(state:ReturnType<typeof getSharedKillRingState287>)=>state.ring[0]??'',
  sYt:(state:ReturnType<typeof getSharedKillRingState287>)=>state.mode.type==='yanked'&&state.ring.length>1
   ? {text:state.ring[(state.mode.index+1)%state.ring.length]??'',start:state.mode.start,length:state.mode.length}:null,
  xe:<T,S>(buffer:{subscribe:(f:()=>void)=>()=>void;getSnapshot:()=>T}|undefined,select:(s:T)=>S)=>useSyncExternalStore(buffer?buffer.subscribe:()=>()=>{},buffer?()=>select(buffer.getSnapshot()):()=>undefined),
  Vt:(s:string,needle:string,start=0)=>{let count=0,index=s.indexOf(needle,start);while(index!==-1){count++;index=s.indexOf(needle,index+1)}return count},
  ADe:(s:string)=>/^[\p{L}\p{N}\p{M}_]$/u.test(s),lze:(s:string)=>/\s/.test(s),cze:(s:string)=>s.length>0&&!/\s/.test(s)&&! /^[\p{L}\p{N}\p{M}_]$/u.test(s),
  tut:(s:string)=>s.startsWith('[Image'),y:logEvent,
  Qk:(name:string)=>getEnabledSettingSources().map(source=>(getSettingsForSource(source) as Record<string,unknown>|null)?.[name]).filter(value=>value!==undefined).reverse(),
  Vo:(name:string,fallback:unknown)=>({value:(getInitialSettings() as Record<string,unknown>)[name]??(getGlobalConfig() as unknown as Record<string,unknown>)[name]??fallback}),
  cfo:({nextValue,value,cursorOffset,mode}:{nextValue:string;value:string;cursorOffset:number;mode:string})=>cursorOffset===0&&nextValue.startsWith('!')&&mode!=='bash'&&(nextValue.length===value.length+1||value.length===0),
 }
}
function vimOwner(){return getExecutionSession287().sessionScratch as unknown as {vimSharedState:()=>unknown;replaceVimSharedState:(value:unknown)=>void}}
const ports=createModelSelectorSearchHostPorts287()
const cursor=createSelectorCursor287(ports)
export const originalModelSelectorSearch287=createSelectorSearch287({...ports,...cursor})
export const useModelSelectorSearchInput287=originalModelSelectorSearch287.Fg
