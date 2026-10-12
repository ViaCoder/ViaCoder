import type {ReactNode} from 'react'
import type {Notification,NotificationSegment} from '../notifications.js'
import {createPinnedNotificationDisplay287} from './native.js'

function canonical287(){
 // Resolve lazily through the existing lifecycle graph to avoid cold-import TDZ.
 const {getOriginalModsLifecycle287}=import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')
 return getOriginalModsLifecycle287()
}
type NotificationHook287={
 addNotification:(content:Notification)=>void
 removeNotification:(key:string)=>void
 processQueue:()=>void
}
type NotificationModule287={
 _o:()=>NotificationHook287
 D:(queue:Notification[])=>Notification|undefined
 D0n:(props:{children:ReactNode})=>ReactNode
 Znt:Record<Notification['priority'],number>
}
function notifications287(){return canonical287().clearSourceModule287('chunk-dx7d4ydg.js') as NotificationModule287}
export function useOfficialNotifications287():NotificationHook287{return notifications287()._o()}
export function nextOfficialNotification287(queue:Notification[]):Notification|undefined{return notifications287().D(queue)}
export function OfficialNotificationProvider287({children}:{children:ReactNode}):ReactNode{return notifications287().D0n({children})}

var display:ReturnType<typeof createPinnedNotificationDisplay287>|undefined
function pinnedDisplay287(){
 if(!display){
  const canonical=canonical287()
  const ports=canonical.clearSourceModule287('chunk-v6xcaj6r.js')
  display=createPinnedNotificationDisplay287({w:ports.w,e:ports.e,r:ports.r,n:ports.n,jme:ports.jme,Sb:canonical.clearSourceModule287('chunk-hrhfcbdv.js').Sb,Znt:notifications287().Znt})
 }
 return display
}
export function renderPinnedNotifications287(pinned:Notification[]):ReactNode[]{
 // Original J1 pinned projection; original pre handles JSX/text/segments/wrap.
 const original=pinnedDisplay287()
 return pinned.slice().sort(original.compare).map(original.item)
}
export function renderNotificationSegments287(segments:NotificationSegment[]):ReactNode{
 const original=canonical287().clearSourceModule287('chunk-v6xcaj6r.js').jme as (props:{segments:NotificationSegment[]})=>ReactNode
 return original({segments})
}
