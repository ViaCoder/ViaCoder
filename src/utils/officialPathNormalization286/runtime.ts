/** Generated from verified Claude Code 2.1.286 platform bundles by scripts/official/vendor-path-normalization-286.mjs. */
function darwinXn286(t: string): string {return t.normalize("NFC")}
function linuxXn286(t: string): string {return t}
function windowsPn286(t: string): string {return t}

/** Uses the exact original xn/Pn function body selected for the running OS. */
export function normalizeOriginalCwd286(value: string): string {
  switch (process.platform) {
    case 'darwin': return darwinXn286(value)
    case 'linux': return linuxXn286(value)
    case 'win32': return windowsPn286(value)
    default: return value
  }
}
