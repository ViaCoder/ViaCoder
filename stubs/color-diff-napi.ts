// Compatibility import used by StructuredDiff/HighlightedCode/ThemePicker.
// The public 2.1.283 renderer returns lines (chunk-ee16pmkr H/O), not an
// unconditional null. Reuse the existing local implementation; do not replace
// UI components or their fallback/selection/caching behavior.
// Remaining differences from the newer official renderer are tracked in
// docs/parity/PUBLIC_PATH_AUDIT_20260926.md.
export { ColorDiff, ColorFile, getSyntaxTheme } from '../src/native-ts/color-diff/index.js'
export type { SyntaxTheme } from '../src/native-ts/color-diff/index.js'
