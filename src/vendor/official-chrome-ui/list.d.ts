import type {ReactNode} from 'react'
import type {KeyboardEvent} from '../../ink/events/keyboard-event.js'
export type CompositeListProps={
  children?:ReactNode
  visibleCount?:number
  defaultFocusIndex?:number
  resetKey?:unknown
  onSelect?:(index:number)=>void
  onFocus?:(index:number)=>void
  onRowKeyDown?:(event:KeyboardEvent,index:number)=>void
  isDisabled?:boolean|(()=>boolean)
  wrap?:boolean
  onUpFromFirstItem?:()=>void
  onDownFromLastItem?:()=>void
  declineHomeEnd?:boolean
  overflowHint?:'count'|'glyph'|'none'
  emptyMessage?:string
}
export const vn:((props:CompositeListProps)=>ReactNode)&{
  Item:(props:{label:string|number;description?:string|number;icon?:ReactNode;meta?:Array<string|number>})=>ReactNode
}
export const Kc:((props:CompositeListProps)=>ReactNode)&{
  Item:(props:{children?:ReactNode;lines?:number;declareCursor?:boolean})=>ReactNode
  Heading:(props:{children?:ReactNode})=>ReactNode
}
export const ListViewport:(props:{reserve?:number;children?:ReactNode})=>ReactNode
export function tt(props:{status:'success'|'error'|'warning'|'info'|'pending'|'loading'|'running'|'on'|'off';'aria-label'?:string;withSpace?:boolean}):ReactNode
