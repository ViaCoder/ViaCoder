import { createContext, useCallback, useContext, useMemo } from 'react'
import { isProgressReportingAvailable, type Progress } from './terminal.js'
import { BEL } from './termio/ansi.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {createTerminalNotification287,type TerminalAnsiSources287} from './officialTerminalNotification287/native.js'

type WriteRaw = (data: string) => void

export const TerminalWriteContext = createContext<WriteRaw | null>(null)

export const TerminalWriteProvider = TerminalWriteContext.Provider

export type TerminalNotification = {
  notifyITerm2: (opts: { message: string; title?: string }) => void
  notifyKitty: (opts: { message: string; title: string; id: number }) => void
  notifyGhostty: (opts: { message: string; title: string }) => void
  notifyBell: () => void
  /**
   * Report progress to the terminal via OSC 9;4 sequences.
   * Supported terminals: ConEmu, Ghostty 1.2.0+, iTerm2 3.6.6+
   * Pass state=null to clear progress.
   */
  progress: (state: Progress['state'] | null, percentage?: number) => void
}

/** Complete original hook, bound to the existing renderer write context. */
export function useTerminalNotification(): TerminalNotification {
  const terminalModule=getOriginalModsLifecycle287().clearSourceModule287('chunk-1y575bx8.js')
  const source:TerminalAnsiSources287={
    $h:terminalModule.$h as TerminalAnsiSources287['$h'],
    ox:terminalModule.ox as TerminalAnsiSources287['ox'],
    zm:terminalModule.zm as TerminalAnsiSources287['zm'],
    Jpt:terminalModule.Jpt as TerminalAnsiSources287['Jpt'],
    Qpt:terminalModule.Qpt as TerminalAnsiSources287['Qpt'],
  }
  return createTerminalNotification287({
    ke:useContext,ce:useCallback,Q:useMemo,zW:TerminalWriteContext,
    ox:source.ox,$h:source.$h,zm:source.zm,dW:BEL,
    bze:isProgressReportingAvailable,Jpt:source.Jpt,Qpt:source.Qpt,
  })()
}
