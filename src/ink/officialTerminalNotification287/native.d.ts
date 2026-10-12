import type {Context,useContext,useCallback,useMemo} from 'react'
import type {TerminalNotification} from '../useTerminalNotification.js'

export interface TerminalAnsiSources287 {
  $h:(...parts:(string|number)[])=>string
  ox:(sequence:string)=>string
  zm:Readonly<{ITERM2:number;KITTY:number;GHOSTTY:number}>
  Jpt:Readonly<{PROGRESS:number}>
  Qpt:Readonly<{CLEAR:number;ERROR:number;INDETERMINATE:number;SET:number}>
}
export interface TerminalNotificationPorts287 extends TerminalAnsiSources287 {
  ke:typeof useContext
  ce:typeof useCallback
  Q:typeof useMemo
  zW:Context<((sequence:string)=>void)|null>
  dW:string
  bze:()=>boolean
}
export function createTerminalNotification287(ports:TerminalNotificationPorts287):()=>TerminalNotification
