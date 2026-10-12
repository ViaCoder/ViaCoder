/**
 * Claude Code hints protocol.
 *
 * CLIs and SDKs running under Claude Code can emit a self-closing
 * `<claude-code-hint />` tag to stderr (merged into stdout by the shell
 * tools). The harness scans tool output for these tags, strips them before
 * the output reaches the model, and surfaces an install prompt to the
 * user — no inference, no proactive execution.
 *
 * This file projects the complete original parser and current-session owner for
 * the pending hint. The original owner has one pending slot — we surface
 * at most one prompt per session, so there's no reason to accumulate.
 * React subscribes via useSyncExternalStore.
 *
 * See docs/claude-code-hints.md for the vendor-facing spec.
 */

import {extractOriginalClaudeCodeHints287,parseOriginalHintAttributes287,originalHintCommandToken287,getPendingHintOwner287} from './plugins/pluginHintIngress287.js'

export type ClaudeCodeHintType = 'plugin'

export type ClaudeCodeHint = {
  /** Spec version declared by the emitter. Unknown versions are dropped. */
  v: number
  /** Hint discriminator. v1 defines only `plugin`. */
  type: ClaudeCodeHintType
  /**
   * Hint payload. For `type: 'plugin'`: a `name@marketplace` slug
   * matching the form accepted by `parsePluginIdentifier`.
   */
  value: string
  /**
   * First token of the shell command that produced this hint. Shown in the
   * install prompt so the user can spot a mismatch between the tool that
   * emitted the hint and the plugin it recommends.
   */
  sourceCommand: string
}

/**
 * Scan shell tool output for hint tags, returning the parsed hints and
 * the output with hint lines removed. The stripped output is what the
 * model sees — hints are a harness-only side channel.
 *
 * @param output - Raw command output (stdout with stderr interleaved).
 * @param command - The command that produced the output; its first
 *   whitespace-separated token is recorded as `sourceCommand`.
 */
export function extractClaudeCodeHints(output:string,command:string):{hints:ClaudeCodeHint[];stripped:string} {
 return extractOriginalClaudeCodeHints287(output,command)
}
function parseAttrs(body:string):Record<string,string>{return parseOriginalHintAttributes287(body)}
function firstCommandToken(command:string):string{return originalHintCommandToken287(command)}

// ============================================================================
// Pending-hint store (useSyncExternalStore interface)
//
// Single-slot: write wins if the slot is already full (a CLI that emits on
// every invocation would otherwise pile up). The dialog is shown at most
// once per session; after that, setPendingHint becomes a no-op.
//
// Actual tool callers submit to the existing bounded original De buffer.
// Complete original UX drains it through Lbe's public gates and owns offer;
// this projection does not create an admission cache or a second queue.
// ============================================================================

// Public compatibility reads/writes project the original current-session De.
// Shell/SDK producers submit; the complete original UX drains and owns offer.
export function setPendingHint(hint:ClaudeCodeHint):void {getPendingHintOwner287().offer(hint)}
export function clearPendingHint():void {getPendingHintOwner287().dismiss()}
export function markShownThisSession():void {getPendingHintOwner287().markShown()}
export function subscribeToPendingHint(listener:()=>void):()=>void {return getPendingHintOwner287().subscribe(listener)}
export function getPendingHintSnapshot():ClaudeCodeHint|null {return getPendingHintOwner287().getSnapshot()}
export function hasShownHintThisSession():boolean {return getPendingHintOwner287().shownThisSession}
/** Test-only reset of the actual existing slot; no queue/signal is allocated. */
export function _resetClaudeCodeHintStore():void {const owner=getPendingHintOwner287();owner.dismiss();owner.takeSubmitted();owner.shownThisSession=false}

export const _test = {
  parseAttrs,
  firstCommandToken,
}
