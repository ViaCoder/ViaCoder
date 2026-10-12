import React, {createContext,useCallback,useContext,useEffect,useLayoutEffect,useRef,useState,useSyncExternalStore,type PropsWithChildren,type RefObject} from 'react'
import {Box,useInput,type BoxProps,type DOMElement} from '../../ink.js'
import {useScreenReader as useInkScreenReader} from '../../ink/components/ScreenReaderContext.js'
import {useAlternateViewport} from '../../ink/components/AlternateViewportContext.js'
import {TerminalSizeContext} from '../../ink/components/TerminalSizeContext.js'
import useStdin from '../../ink/hooks/use-stdin.js'
import type {InputEvent} from '../../ink/events/input-event.js'
import type {ClickEvent} from '../../ink/events/click-event.js'
import {nodeCache} from '../../ink/node-cache.js'

/** Pointer capture and scoped main-screen mouse mode are supplied by shared
 * Ink. The screen-reader branch remains a separate renderer capability. */
export const CurrentListHost = Object.freeze({pointerScrollbar:true})
export const useListScreenReader=useInkScreenReader
export const useListAltViewport=useAlternateViewport
export function useListTerminalSize():{rows:number;columns:number} {
  const size=useContext(TerminalSizeContext)
  if(!size)throw Error('List requires an Ink terminal size provider')
  return size
}
export function listLayoutSize(node:DOMElement):{width:number;height:number} {
  return {width:node.yogaNode?.getComputedWidth()??0,height:node.yogaNode?.getComputedHeight()??0}
}
const listeners=new Set<()=>void>()
const subscribe=(fn:()=>void)=>{listeners.add(fn);return()=>{listeners.delete(fn)}}
const notify=()=>{for(const fn of listeners)fn()}
const queueNotify=()=>queueMicrotask(notify)
const ListRoot=createContext<RefObject<DOMElement|null>|null>(null)
/** Recompute a Yoga measurement after each real Ink layout commit. */
export function useListLayoutValue(measure:()=>number|null):number|null {
  const ref=useContext(ListRoot)
  const [value,setValue]=useState<number|null>(null)
  useLayoutEffect(()=>{
    const update=()=>{const next=measure();setValue(previous=>Object.is(previous,next)?previous:next)}
    update()
    return rootOf(ref?.current??null)?.layoutHost?.subscribe(update)
  })
  return value
}
function rootOf(node:DOMElement|null):DOMElement|null {
  while(node?.parentNode)node=node.parentNode
  return node
}
function contains(node:DOMElement|null|undefined,parent:DOMElement|null):boolean {
  if(!parent)return false
  while(node){if(node===parent)return true;node=node.parentNode}
  return false
}
export function ListFocusRoot({children,pointerTracking=true,overflowLines}:PropsWithChildren<{pointerTracking?:boolean;overflowLines?:number}>):React.ReactNode {
  const ref=useRef<DOMElement|null>(null)
  const screenReader=useInkScreenReader()
  const {setRawMode}=useStdin()
  // The numeric screen-reader branch has DOM onKeyDown but no useInput hook.
  // Keep the shared App stdin parser in raw mode while that branch is mounted.
  useLayoutEffect(()=>{
    if(!screenReader)return
    setRawMode(true)
    return ()=>setRawMode(false)
  },[screenReader,setRawMode])
  const [autoTracking,setAutoTracking]=useState(false)
  useLayoutEffect(()=>{
    if(overflowLines===undefined)return
    const update=()=>{
      const height=ref.current?.yogaNode?.getComputedHeight()
      setAutoTracking(height!==undefined&&overflowLines>height)
    }
    update()
    return rootOf(ref.current)?.layoutHost?.subscribe(update)
  },[overflowLines])
  const tracking=overflowLines===undefined?pointerTracking:autoTracking&&pointerTracking
  useEffect(()=>tracking?rootOf(ref.current)?.pointerHost?.acquire():undefined,[tracking])
  return <ListRoot.Provider value={ref}><Box ref={ref} flexDirection="column">{children}</Box></ListRoot.Provider>
}
export function useListFocus(ref:RefObject<DOMElement|null>):boolean {
  return useSyncExternalStore(subscribe,()=>contains(rootOf(ref.current)?.focusManager?.activeElement,ref.current),()=>false)
}
export function useListAutoFocus(ref:RefObject<DOMElement|null>,enabled:boolean,blurWhenDisabled=false):void {
  useEffect(()=>{
    const node=ref.current,manager=rootOf(node)?.focusManager
    if(!node||!manager)return
    if(!enabled){if(blurWhenDisabled&&manager.activeElement===node){manager.blur();notify()}return}
    const restore=()=>{
      const current=ref.current
      if(current&&(!manager.activeElement||contains(current,manager.activeElement)))manager.focus(current)
    }
    manager.focus(node);notify()
    return subscribe(restore)
  },[ref,enabled,blurWhenDisabled])
}
type Direction='up'|'down'|'left'|'right'
type Rect={x:number;y:number;width:number;height:number}
function rectangle(node:DOMElement):Rect|undefined {
  const cached=nodeCache.get(node)
  if(cached)return cached
  const yoga=node.yogaNode
  if(!yoga)return
  let x=yoga.getComputedLeft(),y=yoga.getComputedTop(),parent=node.parentNode
  while(parent){x+=parent.yogaNode?.getComputedLeft()??0;y+=parent.yogaNode?.getComputedTop()??0;parent=parent.parentNode}
  return {x,y,width:yoga.getComputedWidth(),height:yoga.getComputedHeight()}
}
// Official 6sap1w9m mS/$m/ep directional geometry; cachedLayout maps to nodeCache.
function score(a:Rect,b:Rect,direction:Direction):number {
  const horizontal=direction==='left'||direction==='right'
  const sign=direction==='right'||direction==='down'?1:-1
  const distance=(horizontal?b.x+b.width/2-a.x-a.width/2:b.y+b.height/2-a.y-a.height/2)*sign
  if(distance<=0)return Infinity
  const center=horizontal?a.y+a.height/2:a.x+a.width/2,start=horizontal?b.y:b.x,size=horizontal?b.height:b.width
  const gap=center<start?start-center:center>start+size?center-start-size:0
  const overlap=horizontal?Math.max(0,Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)):Math.max(0,Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x))
  return distance+(horizontal?2:0.5)*gap-overlap
}
export function useDirectionalFocus():{focusDirection:(direction:Direction)=>boolean} {
  const ref=useContext(ListRoot)
  return {focusDirection(direction){
    const root=rootOf(ref?.current??null),manager=root?.focusManager
    if(!root||!manager)return false
    if(!manager.activeElement){manager.focusNext(root);notify();return true}
    const rect=rectangle(manager.activeElement)
    if(!rect)return false
    let target:DOMElement|undefined,best=Infinity
    function visit(node:DOMElement):void {
      if(typeof node.attributes.tabIndex==='number'&&node.attributes.tabIndex>=0&&!contains(manager?.activeElement,node)){
        const candidate=rectangle(node),distance=candidate?score(rect!,candidate,direction):Infinity
        if(distance<best){best=distance;target=node}
      }
      for(const child of node.childNodes)if(child.nodeName!=='#text')visit(child)
    }
    visit(root)
    if(!target)return false
    manager.focus(target);notify();return true
  }}
}
type WheelEvent={deltaY:number;stopImmediatePropagation:()=>void}
type ListBoxProps=PropsWithChildren<BoxProps & {onWheel?:(event:WheelEvent)=>void}>
export function ListBox({onWheel,onFocusCapture,onBlurCapture,...props}:ListBoxProps):React.ReactNode {
  const ownRef=useRef<DOMElement|null>(null)
  const setRef=useCallback((node:DOMElement|null)=>{
    ownRef.current=node
    if(typeof props.ref==='function')props.ref(node)
    else if(props.ref)props.ref.current=node
  },[props.ref])
  const focused=useListFocus(ownRef)
  // This Ink exposes wheel as InputEvent rather than DOM onWheel. Preserve the
  // official one-line scroll/cursor clamp; only the focused list consumes it.
  useInput((_input,key,event:InputEvent)=>{
    if(onWheel&&(key.wheelUp||key.wheelDown))onWheel({deltaY:key.wheelUp?-1:1,stopImmediatePropagation:()=>event.stopImmediatePropagation()})
  },{isActive:focused&&onWheel!==undefined})
  return <Box {...props} ref={setRef} onFocusCapture={event=>{onFocusCapture?.(event);queueNotify()}} onBlurCapture={event=>{onBlurCapture?.(event);queueNotify()}}/>
}
export function useStrayClickGuard():(event:ClickEvent)=>boolean {
  const [mountedAt]=useState(()=>performance.now())
  return useCallback((event:ClickEvent)=>{
    // Official Kg/l: an activation click is stray even after mount settle.
    if(!event.isWindowActivation&&performance.now()-mountedAt>=300)return false
    event.dropAsStray()
    return true
  },[mountedAt])
}
