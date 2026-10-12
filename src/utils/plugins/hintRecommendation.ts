/**
 * Plugin-hint recommendations.
 *
 * Companion to lspRecommendation.ts: where LSP recommendations are triggered
 * by file edits, plugin hints are triggered by CLIs/SDKs emitting a
 * `<claude-code-hint />` tag to stderr (detected by the Bash/PowerShell tools).
 *
 * State persists in GlobalConfig.claudeCodeHints — a show-once record per
 * plugin and a disabled flag (user picked "don't show again"). Official-
 * marketplace filtering is hardcoded for v1.
 */

import type {ClaudeCodeHint} from '../claudeCodeHints.js'
import {recordOriginalPluginHint287,resolveOriginalPluginHint287,markOriginalHintPluginShown287,disableOriginalHintRecommendations287} from './pluginHintIngress287.js'
import {modsRegistryOwner287} from './modsRegistryOwner287.js'

export type PluginHintRecommendation = {
  pluginId: string
  pluginName: string
  marketplaceName: string
  pluginDescription?: string
  sourceCommand: string
}

/** Submit to the real session feed; original UX/Lbe owns all admission gates. */
export function maybeRecordPluginHint(hint:ClaudeCodeHint):void {recordOriginalPluginHint287(hint)}
/** Test-only reset of the existing Mods hinted-id set. */
export function _resetHintRecommendationForTesting():void {modsRegistryOwner287.registry().hintedPluginIds.clear()}
/** Complete original alias-aware lookup, refusal handling and display name. */
export function resolvePluginHint(hint:ClaudeCodeHint,storageV5?:unknown):Promise<PluginHintRecommendation|null> {return resolveOriginalPluginHint287(hint,storageV5)}
export function markHintPluginShown(id:string,storageV5?:unknown):void {markOriginalHintPluginShown287(id,storageV5)}
export function disableHintRecommendations(storageV5?:unknown):void {disableOriginalHintRecommendations287(storageV5)}
