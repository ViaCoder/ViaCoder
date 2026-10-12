import type { RenderOptions } from '../ink.js'
import {getTerminalRenderOptions287} from './terminalInput287.js'

/**
 * Returns base render options for Ink, including stdin override when needed.
 * Use this for all render() calls to ensure piped input works correctly.
 *
 * @param exitOnCtrlC - Whether to exit on Ctrl+C (usually false for dialogs)
 */
export function getBaseRenderOptions(
  exitOnCtrlC: boolean = false,
): RenderOptions {
  return getTerminalRenderOptions287(exitOnCtrlC)
}
