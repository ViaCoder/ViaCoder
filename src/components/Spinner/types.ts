/** Exact modes emitted by utils/messages.ts handleMessage and consumed by
 * SpinnerAnimationRow.tsx (also present in its embedded original source). */
export type SpinnerMode = 'requesting' | 'responding' | 'thinking' | 'tool-input' | 'tool-use'

/** Spinner/utils.ts interpolateColor, hueToRgb and parseRGB constructors. */
export type RGBColor = { r: number; g: number; b: number }
