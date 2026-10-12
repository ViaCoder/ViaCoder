import memoize from 'lodash-es/memoize.js'
import {writeSync} from 'fs'
import type {ExitReason} from 'src/entrypoints/agentSdkTypes.js'
import type {AppState} from '../state/AppState.js'
import type {InitAdoptedContext287} from '../entrypoints/officialInitContext287/runtime.js'
import instances from '../ink/instances.js'
import {DISABLE_KITTY_KEYBOARD,DISABLE_MODIFY_OTHER_KEYS} from '../ink/termio/csi.js'
import {DBP,DFE,DISABLE_MOUSE_TRACKING,EXIT_ALT_SCREEN,SHOW_CURSOR} from '../ink/termio/dec.js'
import {CLEAR_ITERM2_PROGRESS,CLEAR_TAB_STATUS,CLEAR_TERMINAL_TITLE,supportsTabStatus,wrapForMultiplexer} from '../ink/termio/osc.js'
import {isEnvTruthy} from './envUtils.js'
import {hookRegistrationGate287} from './hooks/modelSwitch287/registrationGate.js'
import {publicCommandSourcePort287 as read} from './commandCompletionProducers287.js'

function cleanupTerminalModes(): void {
  if (!process.stdout.isTTY) {
    return
  }

  try {
    // Disable mouse tracking FIRST, before the React unmount tree-walk.
    // The terminal needs a round-trip to process this and stop sending
    // events; doing it now (not after unmount) gives that time while
    // we're busy unmounting. Otherwise events arrive during cooked-mode
    // cleanup and either echo to the screen or leak to the shell.
    writeSync(1, DISABLE_MOUSE_TRACKING)
    // Exit alt screen FIRST so printResumeHint() (and all sequences below)
    // land on the main buffer.
    //
    // Unmount Ink directly rather than writing EXIT_ALT_SCREEN ourselves.
    // Ink registered its unmount with signal-exit, so it will otherwise run
    // AGAIN inside forceExit() → process.exit(). Two problems with letting
    // that happen:
    //   1. If we write 1049l here and unmount writes it again later, the
    //      second one triggers another DECRC — the cursor jumps back over
    //      the resume hint and the shell prompt lands on the wrong line.
    //   2. unmount()'s onRender() must run with altScreenActive=true (alt-
    //      screen cursor math) AND on the alt buffer. Exiting alt-screen
    //      here first makes onRender() scribble a REPL frame onto main.
    // Calling unmount() now does the final render on the alt buffer,
    // unsubscribes from signal-exit, and writes 1049l exactly once.
    const inst = instances.get(process.stdout)
    if (inst?.isAltScreenActive) {
      try {
        inst.unmount()
      } catch {
        // Reconciler/render threw — fall back to manual alt-screen exit
        // so printResumeHint still hits the main buffer.
        writeSync(1, EXIT_ALT_SCREEN)
      }
    }
    // Catches events that arrived during the unmount tree-walk.
    // detachForShutdown() below also drains.
    inst?.drainStdin()
    // Mark the Ink instance unmounted so signal-exit's deferred ink.unmount()
    // early-returns instead of sending redundant EXIT_ALT_SCREEN sequences
    // (from its writeSync cleanup block + AlternateScreen's unmount cleanup).
    // Those redundant sequences land AFTER printResumeHint() and clobber the
    // resume hint on tmux (and possibly other terminals) by restoring the
    // saved cursor position. Safe to skip full unmount: this function already
    // sends all the terminal-reset sequences, and the process is exiting.
    inst?.detachForShutdown()
    // Disable extended key reporting — always send both since terminals
    // silently ignore whichever they don't implement
    writeSync(1, DISABLE_MODIFY_OTHER_KEYS)
    writeSync(1, DISABLE_KITTY_KEYBOARD)
    // Disable focus events (DECSET 1004)
    writeSync(1, DFE)
    // Disable bracketed paste mode
    writeSync(1, DBP)
    // Show cursor
    writeSync(1, SHOW_CURSOR)
    // Clear iTerm2 progress bar - prevents lingering progress indicator
    // that can cause bell sounds when returning to the terminal tab
    writeSync(1, CLEAR_ITERM2_PROGRESS)
    // Clear tab status (OSC 21337) so a stale dot doesn't linger
    if (supportsTabStatus()) writeSync(1, wrapForMultiplexer(CLEAR_TAB_STATUS))
    // Clear terminal title so the tab doesn't show stale session info.
    // Respect CLAUDE_CODE_DISABLE_TERMINAL_TITLE — if the user opted out of
    // title changes, don't clear their existing title on exit either.
    if (!isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_TERMINAL_TITLE)) {
      if (process.platform === 'win32') {
        process.title = ''
      } else {
        writeSync(1, CLEAR_TERMINAL_TITLE)
      }
    }
  } catch {
    // Terminal may already be gone (e.g., SIGHUP after terminal close).
    // Ignore write errors since we're exiting anyway.
  }
}

/** Standalone /tui only: reuse the same terminal teardown without exiting. */
export function cleanupTerminalForRelaunch(): void { cleanupTerminalModes() }

/** Public exits borrow the original host-scoped APo, also used by /exit.
 * No second shutdown state, signal registry, timer or worktree-removal owner.
 * Only terminal teardown is C: it uses the actual enhanced Ink instance.
 */
export type WorktreeRemoval287 = {path:string;run():Promise<string>;ignoresHangup?:boolean;budgetMs?:number}
export type ShutdownOptions287 = {
 removeWorktree?:WorktreeRemoval287
 suppressResumeHint?:boolean
 finalMessage?:string
 getAppState?:()=>AppState
 setAppState?:(f:(prev:AppState)=>AppState)=>void
}
interface ShutdownOwner287 {
 install(handles?:InitAdoptedContext287):void
 shutdown(code?:number,reason?:ExitReason,options?:ShutdownOptions287):Promise<void>
 shutdownSync(code?:number,reason?:ExitReason):void
 isShuttingDown():boolean
 getPendingShutdown():Promise<void>|undefined
 markPrintModeSignalHandlersRegistered():void
 disarmTimers():void
 shutdownInProgress:boolean
 resumeHintPrinted:boolean
 resumeHintOmitsWorktree:boolean
 worktreeRemoval:WorktreeRemoval287|undefined
 pendingShutdown:Promise<void>|undefined
}
const terminalHooks287={cleanupTerminalModes,drainStdin:()=>instances.get(process.stdout)?.drainStdin()}
export function bindTerminalShutdownHooks287(uiMounted?:boolean):void {
 const terminal=read('chunk-1y575bx8.js','v') as {setHooks(hooks:typeof terminalHooks287):void;setUiMounted(value:boolean):void}
 terminal.setHooks(terminalHooks287)
 if(uiMounted!==undefined)terminal.setUiMounted(uiMounted)
}
export function getGracefulShutdownOwner287():ShutdownOwner287 {
 bindTerminalShutdownHooks287()
 return (read('chunk-mphp7acd.js','$_') as ()=>ShutdownOwner287)()
}
export const setupGracefulShutdown=memoize((handles?:InitAdoptedContext287)=>getGracefulShutdownOwner287().install(handles))
export function gracefulShutdown(exitCode=0,reason:ExitReason='other',options?:ShutdownOptions287):Promise<void>{
 return getGracefulShutdownOwner287().shutdown(exitCode,reason,options)
}
export function gracefulShutdownSync(exitCode=0,reason:ExitReason='other',_options?:Pick<ShutdownOptions287,'getAppState'|'setAppState'>):void{
 getGracefulShutdownOwner287().shutdownSync(exitCode,reason)
}
export function markPrintModeSignalHandlersRegistered287():void {getGracefulShutdownOwner287().markPrintModeSignalHandlersRegistered()}
export function isShuttingDown():boolean {return getGracefulShutdownOwner287().isShuttingDown()}
export function getPendingShutdownForTesting():Promise<void>|undefined {return getGracefulShutdownOwner287().getPendingShutdown()}
/** Tests reset the existing scoped instance; never replace it with a new owner. */
export function resetShutdownState():void {
 const owner=getGracefulShutdownOwner287();owner.disarmTimers();owner.shutdownInProgress=false
 owner.resumeHintPrinted=false;owner.resumeHintOmitsWorktree=false;owner.worktreeRemoval=undefined;owner.pendingShutdown=undefined
 hookRegistrationGate287.Hi.committed=false
}
