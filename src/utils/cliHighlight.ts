/// <reference lib="dom" />

export type {CliHighlight} from '../vendor/official-highlight/index.js'
import type {CliHighlight} from '../vendor/official-highlight/index.js'

// Shared lazy load for Markdown and code previews. The official registry loads
// only the requested language and its declared sublanguages, not every grammar.
let cliHighlightPromise: Promise<CliHighlight> | undefined

export function getCliHighlightPromise(): Promise<CliHighlight> {
  return cliHighlightPromise ??= import('../vendor/official-highlight/index.js').then(m => m.nM())
}

export async function getLanguageName(filePath: string): Promise<string> {
  const {JVe} = await import('../vendor/official-highlight/registry.js')
  return JVe(filePath)
}
