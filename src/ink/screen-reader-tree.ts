// Source-derived from npm 2.1.283 chunk-6sap1w9m.js Zl/BC/Is/Gs/Ks.
// Only the host's DOM and ANSI-strip adapter differ from the official body.
import stripAnsi from 'strip-ansi'
import type { DOMElement, DOMNode } from './dom.js'
import { LayoutDisplay } from './layout/node.js'

export type PreserveRange = [number, number]
export type RowPrefixRange = [number, number, string]
export type ScreenReaderTree = {text: string; preserveRanges: PreserveRange[]; rowPrefixRanges: RowPrefixRange[]}
const emptyPreserve: PreserveRange[] = []
const emptyPrefixes: RowPrefixRange[] = []
const empty: ScreenReaderTree = {text: '', preserveRanges: emptyPreserve, rowPrefixRanges: emptyPrefixes}
const maxDepth = 256
const controlCharacters = /[\x00-\x08\x0b-\x1f\x7f-\x9f\u061c\u202a-\u202e\u2066-\u2069]/

export function sanitizeScreenReaderText(value: string): string {
  if (!controlCharacters.test(value)) return value
  const stripped = value.split('\n').map(part => stripAnsi(part)).join('\n')
  let result = ''
  for (let i = 0; i < stripped.length; i++) {
    const code = stripped.charCodeAt(i)
    if (code < 32) {
      if (code === 9 || code === 10) result += stripped[i]
    } else if (code === 127 || code >= 128 && code <= 159) {
      continue
    } else if (code === 1564 || code >= 8234 && code <= 8238 || code >= 8294 && code <= 8297) {
      result += '\uFFFD'
    } else {
      result += stripped[i]
    }
  }
  return result
}

function shiftPreserve(current: PreserveRange[], ranges: PreserveRange[], offset: number): PreserveRange[] {
  if (ranges.length === 0) return current
  const next = current === emptyPreserve ? [] : [...current]
  for (const [start, end] of ranges) next.push([start + offset, end + offset])
  return next
}
function shiftPrefixes(current: RowPrefixRange[], ranges: RowPrefixRange[], offset: number): RowPrefixRange[] {
  if (ranges.length === 0) return current
  const next = current === emptyPrefixes ? [] : [...current]
  for (const [start, end, prefix] of ranges) next.push([start + offset, end + offset, prefix])
  return next
}

/** Official BC: join visible children by the box flex axis and order. */
export function renderScreenReaderBox(node: DOMElement, inheritedRole?: string, depth = 0): ScreenReaderTree {
  const direction = node.style.flexDirection ?? 'row'
  const column = direction === 'column' || direction === 'column-reverse'
  const reverse = direction === 'row-reverse' || direction === 'column-reverse'
  const separator = column ? '\n' : ' '
  const children: ScreenReaderTree[] = []
  for (const child of node.childNodes) {
    const result = renderScreenReaderTree(child, inheritedRole, depth + 1)
    if (result.text !== '') children.push(result)
  }
  if (reverse) children.reverse()
  let text = ''
  let preserveRanges = emptyPreserve
  let rowPrefixRanges = emptyPrefixes
  for (const child of children) {
    if (text !== '') text += separator
    if (child.preserveRanges.length) preserveRanges = shiftPreserve(preserveRanges, child.preserveRanges, text.length)
    if (child.rowPrefixRanges.length) rowPrefixRanges = shiftPrefixes(rowPrefixRanges, child.rowPrefixRanges, text.length)
    text += child.text
  }
  return {text, preserveRanges, rowPrefixRanges}
}

/** Official Zl: DOM accessibility text, independent of the visual framebuffer. */
export function renderScreenReaderTree(node: DOMNode, inheritedRole?: string, depth = 0): ScreenReaderTree {
  if (depth >= maxDepth) return empty
  if (node.nodeName === '#text') return {text: sanitizeScreenReaderText(node.nodeValue), preserveRanges: emptyPreserve, rowPrefixRanges: emptyPrefixes}
  const metadata = node.accessibility
  if (metadata?.hidden || node.isHidden || node.yogaNode?.getDisplay() === LayoutDisplay.None) return empty
  let text = ''
  let preserveRanges = emptyPreserve
  let rowPrefixRanges = emptyPrefixes
  if (metadata?.label !== undefined) {
    text = sanitizeScreenReaderText(metadata.label)
  } else if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text' || node.nodeName === 'ink-link') {
    for (const child of node.childNodes) {
      const result = renderScreenReaderTree(child, metadata?.role ?? inheritedRole, depth + 1)
      if (result.preserveRanges.length) preserveRanges = shiftPreserve(preserveRanges, result.preserveRanges, text.length)
      if (result.rowPrefixRanges.length) rowPrefixRanges = shiftPrefixes(rowPrefixRanges, result.rowPrefixRanges, text.length)
      text += result.text
    }
  } else if (node.nodeName === 'ink-box' || node.nodeName === 'ink-root') {
    const result = renderScreenReaderBox(node, metadata?.role ?? inheritedRole, depth)
    text = result.text
    preserveRanges = result.preserveRanges
    rowPrefixRanges = result.rowPrefixRanges
  }
  if (metadata?.state) {
    const states = Object.keys(metadata.state).filter(key => metadata.state?.[key])
    if (states.length) {
      const prefix = `(${states.join(', ')}) `
      text = prefix + text
      preserveRanges = shiftPreserve(emptyPreserve, preserveRanges, prefix.length)
      rowPrefixRanges = shiftPrefixes(emptyPrefixes, rowPrefixRanges, prefix.length)
    }
  }
  if (metadata?.role && metadata.role !== inheritedRole && metadata.role !== 'blockquote') {
    const prefix = `${metadata.role}: `
    text = prefix + text
    preserveRanges = shiftPreserve(emptyPreserve, preserveRanges, prefix.length)
    rowPrefixRanges = shiftPrefixes(emptyPrefixes, rowPrefixRanges, prefix.length)
  }
  if (metadata?.preserveWhitespace && text !== '') preserveRanges = [[0, text.length]]
  if (metadata?.role === 'blockquote' && text !== '') rowPrefixRanges = [[0, text.length, '> ']]
  return {text, preserveRanges, rowPrefixRanges}
}
