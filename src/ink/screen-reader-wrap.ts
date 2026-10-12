// Official 2.1.283 chunk-6sap1w9m.js: qo, iG, vg; chunk-eskkemcf.js:
// zu/X (ANSI-free screen-reader path). Bun is the production width/wrap host.
import { getGraphemeSegmenter } from '../utils/intl.js'
import { expandTabs } from './tabstops.js'
import { stringWidth } from './stringWidth.js'
import { wrapAnsi } from './wrapAnsi.js'

const ambiguousWide = { ambiguousIsNarrow: false } as const
const emojiOrUnassigned = /[\p{Cn}\p{Emoji}]/u
const unreadable = ['[unreadable text]', '[unreadable]', '[?]']
const unrenderable = /^[\p{M}\p{Cc}\p{Cf}]?$/u
const bidiOrTab = /[\t\u061c\u202a-\u202e\u2066-\u2069]/u
const bidi = /[\u061c\u202a-\u202e\u2066-\u2069]/gu
const loneSurrogate = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g
const placeholder = /[\u{F0000}\u{2FA1D}]/gu
const narrowPlaceholder = '\uDB80\uDC00'
const widePlaceholder = '\uD87E\uDE1D'

const bunWidth = (value: string): number => typeof Bun !== 'undefined' && typeof Bun.stringWidth === 'function'
  ? Bun.stringWidth(value, ambiguousWide)
  : stringWidth(value)

/** Official qo; note this intentionally uses ambiguous-wide display cells. */
export function screenReaderPrefixWidth(value: string): number {
  let width = 0
  for (const scalar of value) {
    const point = scalar.codePointAt(0) ?? 0
    width += point > 127 && emojiOrUnassigned.test(scalar)
      ? 2
      : Math.max(1, bunWidth(point >= 55296 && point <= 57343 ? '\uFFFD' : scalar))
  }
  return Math.max(width, bunWidth(value))
}

// Official fp, Tc, Tte combination for a sanitized accessibility string.
export function screenReaderInput(value: string): string {
  if (!bidiOrTab.test(value)) return value
  // iG/Tc leave lone surrogates intact until vg's fp() pass. Replacing them
  // before Tte's tab stops changes the width of text preceding a tab.
  const replaced = value.replace(bidi, '\uFFFD')
  return expandTabs(replaced, 8)
}

/** Official vg, with the local Intl.Segmenter adapter for Sa(). */
export function wrapScreenReaderPrefixed(value: string, columns: number): string[] {
  const replacement = unreadable.find(candidate => screenReaderPrefixWidth(candidate) <= columns) ?? '?'
  const replacementCell = {text: replacement, cells: screenReaderPrefixWidth(replacement)}
  const graphemes: {text: string; cells: number}[] = []
  const wellFormed = typeof value.toWellFormed === 'function'
    ? value.toWellFormed()
    : value.replace(loneSurrogate, '\uFFFD')
  for (const {segment} of getGraphemeSegmenter().segment(wellFormed)) {
    const cells = screenReaderPrefixWidth(segment)
    if (cells <= columns) { graphemes.push({text: segment, cells}); continue }
    const scalars = Array.from(segment)
    const index = scalars.findIndex(scalar => Array.from(getGraphemeSegmenter().segment(`${scalar}a`)).length > 1)
    const scalar = scalars[index] ?? ''
    const scalarCells = screenReaderPrefixWidth(scalar)
    const fit = !unrenderable.test(scalar) && scalarCells <= columns
    if ((!fit || index > 0) && graphemes.at(-1) !== replacementCell) graphemes.push(replacementCell)
    if (fit) {
      graphemes.push({text: scalar, cells: scalarCells})
      if (index < scalars.length - 1) graphemes.push(replacementCell)
    }
  }
  const lines: string[] = []
  let start = 0
  while (start < graphemes.length) {
    let end = start
    let width = 0
    let lastSpace = start
    while (end < graphemes.length && width + graphemes[end]!.cells <= columns) {
      width += graphemes[end]!.cells
      end++
      if (graphemes[end - 1]!.text === ' ') lastSpace = end
    }
    if (end === start) end++
    else if (end < graphemes.length && graphemes[end]!.text !== ' ' && lastSpace > start) end = lastSpace
    lines.push(graphemes.slice(start, end).map(part => part.text).join(''))
    start = end
  }
  return lines
}

/** Official zu/X for ANSI-free accessibility output. */
export function wrapScreenReaderPlain(value: string, columns: number): string {
  if (!(columns > 0)) return value
  if (!/[^\x00-\x7f]/.test(value)) return wrapAnsi(value, columns, {trim: false, hard: true})
  const substitutions: string[] = []
  let substitute = ''
  let changed = false
  for (const {segment} of getGraphemeSegmenter().segment(value)) {
    const headLength = (segment.codePointAt(0) ?? 0) > 65535 ? 2 : 1
    const extraWidth = segment.length > headLength ? stringWidth(segment) : 0
    if (extraWidth === 1 || extraWidth === 2) {
      substitutions.push(segment)
      substitute += extraWidth === 1 ? narrowPlaceholder : widePlaceholder
      changed = true
    } else {
      for (const match of segment.match(placeholder) ?? []) substitutions.push(match)
      substitute += segment
    }
  }
  if (!changed) return wrapAnsi(value, columns, {trim: false, hard: true})
  let index = 0
  return wrapAnsi(substitute, columns, {trim: false, hard: true}).replace(placeholder, () => substitutions[index++] ?? '')
}
