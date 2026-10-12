import {useLayoutEffect,type RefObject} from 'react'
import {permissionMenuPosition} from './PermissionModePicker.js'

/** Reuse the permission menu's tested viewport geometry and native top layer. */
export function useAnchoredPopover(open:boolean,menu:RefObject<HTMLDivElement|null>,trigger:RefObject<HTMLButtonElement|null>,close:()=>void) {
  useLayoutEffect(()=>{
    if(!open||!menu.current||!trigger.current)return
    const element=menu.current,anchor=trigger.current,view=document.defaultView
    if(!view)return
    element.showPopover?.()
    const reposition=()=>{
      const visual=view.visualViewport
      const viewport={left:visual?.offsetLeft??0,top:visual?.offsetTop??0,width:visual?.width??view.innerWidth,height:visual?.height??view.innerHeight}
      const rect=anchor.getBoundingClientRect()
      if(rect.bottom<viewport.top||rect.top>viewport.top+viewport.height||rect.right<viewport.left||rect.left>viewport.left+viewport.width){close();return}
      element.style.width=`${Math.max(1,Math.min(340,viewport.width-20))}px`
      const position=permissionMenuPosition(rect,viewport,element.scrollHeight+2)
      element.style.left=`${position.left}px`;element.style.top=`${position.top}px`;element.style.maxHeight=`${position.maxHeight}px`
    }
    reposition()
    view.addEventListener('resize',reposition);view.addEventListener('scroll',reposition,true)
    view.visualViewport?.addEventListener('resize',reposition);view.visualViewport?.addEventListener('scroll',reposition)
    const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(reposition)
    observer?.observe(anchor);observer?.observe(element)
    return ()=>{
      observer?.disconnect();view.removeEventListener('resize',reposition);view.removeEventListener('scroll',reposition,true)
      view.visualViewport?.removeEventListener('resize',reposition);view.visualViewport?.removeEventListener('scroll',reposition)
      element.hidePopover?.()
    }
  },[open,menu,trigger,close])
}
