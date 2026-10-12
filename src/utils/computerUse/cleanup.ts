import type { ToolUseContext } from '../../Tool.js'

import { logForDebugging } from '../debug.js'
import { errorMessage } from '../errors.js'
import { withResolvers } from '../withResolvers.js'
import { isComputerUseActiveThisTurn, clearComputerUseActiveThisTurn } from './computerUseLock.js'
import { unregisterEscHotkey } from './escHotkey.js'

// cu.apps.unhide is NOT one of the four @MainActor methods wrapped by
// drainRunLoop's 30s backstop. On abort paths (where the user hit Ctrl+C
// because something was slow) a hang here would wedge the abort. Generous
// timeout — unhide should be ~instant; if it takes 5s something is wrong
// and proceeding is better than waiting. The Swift call continues in the
// background regardless; we just stop blocking on it.
const UNHIDE_TIMEOUT_MS = 5000

/**
 * Turn-end cleanup for the chicago MCP surface: auto-unhide apps that
 * `prepareForAction` hid, then end turn activity; the global lock lasts until process cleanup.
 *
 * Called from three sites: natural turn end (`stopHooks.ts`), abort during
 * streaming (`query.ts` aborted_streaming), abort during tool execution
 * (`query.ts` aborted_tools). All three reach this via dynamic import gated
 * on `feature('CHICAGO_MCP')`. `executor.js` (which pulls both native
 * modules) is dynamic-imported below so non-CU turns don't load native
 * modules just to no-op.
 *
 * No-ops cheaply on non-CU turns: both gate checks are zero-syscall.
 */
export async function cleanupComputerUseAfterTurn(
  ctx: Pick<
    ToolUseContext,
    'getAppState' | 'setAppState' | 'sendOSNotification'
  >,
): Promise<void> {
  const appState = ctx.getAppState()

  const hidden = appState.computerUseMcpState?.hiddenDuringTurn
  if (hidden && hidden.size > 0) {
    const { unhideComputerUseApps } = await import('./executor.js')
    const unhide = unhideComputerUseApps([...hidden]).catch(err =>
      logForDebugging(
        `[Computer Use MCP] auto-unhide failed: ${errorMessage(err)}`,
      ),
    )
    const timeout = withResolvers<void>()
    const timer = setTimeout(timeout.resolve, UNHIDE_TIMEOUT_MS)
    await Promise.race([unhide, timeout.promise]).finally(() =>
      clearTimeout(timer),
    )
    ctx.setAppState(prev =>
      prev.computerUseMcpState?.hiddenDuringTurn === undefined
        ? prev
        : {
            ...prev,
            computerUseMcpState: {
              ...prev.computerUseMcpState,
              hiddenDuringTurn: undefined,
            },
          },
    )
  }

  // Official chunk-td7fxg34: unregister hotkey and clear turn activity,
  // not the process-lifetime lock (chunk-eby0bzvf q owns shutdown release).
  if (!isComputerUseActiveThisTurn()) return

  try {
    unregisterEscHotkey()
  } catch (err) {
    logForDebugging(
      `[Computer Use MCP] unregisterEscHotkey failed: ${errorMessage(err)}`,
    )
  }

  clearComputerUseActiveThisTurn()
  ctx.sendOSNotification?.({
    message: 'Claude is done using your computer',
    notificationType: 'computer_use_exit',
  })
}
