/** Parse generated command markup only; callers must establish provenance.
 * Keep argument whitespace verbatim, matching the canonical Web projection. */
export function parseLocalCommandText(text:string):string|null {
  const markup=/^<command-name>([^<]*)<\/command-name>\s*<command-message>[^<]*<\/command-message>\s*<command-args>([\s\S]*)<\/command-args>$/.exec(text)
  return markup?[markup[1],markup[2]].filter(Boolean).join(' '):null
}
