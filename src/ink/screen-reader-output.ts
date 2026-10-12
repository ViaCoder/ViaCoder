// Source-derived terminal writer from npm 2.1.283 chunk-6sap1w9m.js
// _Ie.onRenderScreenReader; process-wide AX timing/queue state is supplied
// by screen-reader-state.ts and the Ink root schedules its deferred renders.
import { getGraphemeSegmenter } from '../utils/intl.js'
import type { DOMElement } from './dom.js'
import { LayoutDisplay } from './layout/node.js'
import { renderScreenReaderTree, sanitizeScreenReaderText, type PreserveRange } from './screen-reader-tree.js'
import { stringWidth } from './stringWidth.js'
import {screenReaderInput, screenReaderPrefixWidth, wrapScreenReaderPlain, wrapScreenReaderPrefixed} from './screen-reader-wrap.js'

const csi = (body: string) => `\x1b[${body}`
const horizontalAbsolute = (column: number) => csi(`${column}G`)
const columnStart = csi('G')
const relative = (x: number, y: number) =>
  (x < 0 ? csi(`${-x}D`) : x > 0 ? csi(`${x}C`) : '') +
  (y < 0 ? csi(`${-y}A`) : y > 0 ? csi(`${y}B`) : '')
const clearTail = (count: number) => {
  if (count <= 0) return ''
  let output = ''
  for (let i = 0; i < count; i++) {
    output += csi('2K')
    if (i < count - 1) output += csi('1A')
  }
  return output + columnStart
}
const graphemeBoundary = (value: string, index: number) => {
  if (index <= 0) return true
  for (const part of getGraphemeSegmenter().segment(value)) {
    if (part.index === index) return true
    if (part.index > index) return false
  }
  return index >= value.length
}

// Official cf/ftr maps a declared DOM cursor to its accessibility text offset.
export function screenReaderCursorOffset(node: DOMElement, target: DOMElement, role?: string, depth = 0): number | null {
  if (depth >= 256) return null
  if (node === target) return 0
  if (node.accessibility?.hidden || node.isHidden || node.yogaNode?.getDisplay() === LayoutDisplay.None) return null
  const metadata = node.accessibility
  if (metadata?.label !== undefined) return null
  if (node.nodeName !== 'ink-box' && node.nodeName !== 'ink-root') return null
  const inherited = metadata?.role ?? role
  let prefix = 0
  if (metadata?.state) {
    const states = Object.keys(metadata.state).filter(key => metadata.state?.[key])
    if (states.length) prefix += `(${states.join(', ')}) `.length
  }
  if (metadata?.role && metadata.role !== role) prefix += `${metadata.role}: `.length
  const direction = node.style.flexDirection ?? 'row'
  const reverse = direction === 'row-reverse' || direction === 'column-reverse'
  const children = node.childNodes.filter(child => renderScreenReaderTree(child, inherited, depth + 1).text !== '')
  if (reverse) children.reverse()
  let offset = 0
  for (const child of children) {
    if (child.nodeName === '#text') { offset += renderScreenReaderTree(child, inherited, depth + 1).text.length + 1; continue }
    const found = screenReaderCursorOffset(child, target, inherited, depth + 1)
    if (found !== null) return prefix + offset + found
    offset += renderScreenReaderTree(child, inherited, depth + 1).text.length + 1
  }
  return null
}

type Park = {row: number; col: number}
export class ScreenReaderOutput {
  lines: string[] = []
  park: Park = {row: 0, col: 0}
  declared = false
  anchor: 'clean' | 'lastRowAnchored' | 'broken' = 'clean'
  preParked = false
  deferredMs = 0
  reset(): void { this.lines = []; this.park = {row: 0, col: 0}; this.declared = false; this.anchor = 'clean'; this.preParked = false; this.deferredMs = 0 }

  render(root: DOMElement, columns: number, rows: number, cursor?: {node: DOMElement; relativeX: number; relativeY: number} | null, options: {announcements?: string[]; preParkMs?: number} = {}): string {
    const {text, preserveRanges, rowPrefixRanges} = renderScreenReaderTree(root)
    const merged: PreserveRange[] = []
    for (const [start, end] of [...preserveRanges].sort((a, b) => a[0] - b[0])) {
      const last = merged.at(-1)
      if (last && start <= last[1]) last[1] = Math.max(last[1], end)
      else merged.push([start, end])
    }
    const logical = text === '' ? [] : text.split('\n')
    const next: string[] = []
    const starts: number[] = []
    let offset = 0
    for (const line of logical) {
      const end = offset + line.length
      const preserve = offset + line.trimEnd().length < end && merged.some(([a, b]) => a < end && end <= b)
      const prefix = rowPrefixRanges.find(([a, b]) => line === '' ? a <= offset && offset <= b : a < end && offset < b)?.[2] ?? ''
      const shownPrefix = columns - screenReaderPrefixWidth(prefix) >= 2 ? prefix : ''
      starts.push(next.length)
      if (line === '') next.push(shownPrefix.trimEnd())
      else {
        const wrapped = prefix === '' || columns < 2
          ? wrapScreenReaderPlain(line, columns).split('\n')
          : wrapScreenReaderPrefixed(screenReaderInput(line), columns - screenReaderPrefixWidth(shownPrefix))
        for (let i = 0; i < wrapped.length; i++) {
          const value = preserve && i === wrapped.length - 1 ? wrapped[i] : wrapped[i].trimEnd()
          next.push(value === '' ? shownPrefix.trimEnd() : shownPrefix + value)
        }
      }
      offset = end + 1
    }
    let declaration: Park | null = null
    if (cursor) {
      const pos = screenReaderCursorOffset(root, cursor.node)
      if (pos !== null) {
        const before = text.slice(0, pos)
        const logicalRow = before.split('\n').length - 1 + cursor.relativeY
        if (logicalRow >= 0 && logicalRow < starts.length) {
          const start = before.lastIndexOf('\n') + 1
          const logicalColumn = (cursor.relativeY === 0 ? stringWidth(text.slice(start, pos)) : 0) + cursor.relativeX
          const wrappedRow = columns > 0 ? Math.floor(logicalColumn / columns) : 0
          declaration = {row: Math.max(0, Math.min(starts[logicalRow] + wrappedRow, next.length - 1)), col: Math.max(0, columns > 0 ? logicalColumn % columns : logicalColumn)}
        }
      }
    }
    let announcementStart = -1
    for (const raw of options.announcements ?? []) {
      const announcement = sanitizeScreenReaderText(raw)
      if (announcement === '') continue
      for (const line of announcement.split('\n')) {
        if (announcementStart === -1) announcementStart = next.length
        if (line === '') next.push('')
        else for (const part of wrapScreenReaderPlain(line, columns).split('\n')) next.push(part.trimEnd())
      }
    }
    const previous = this.lines
    const bottom = Math.max(0, next.length - 1)
    const park = declaration ?? {row: bottom, col: stringWidth(next[bottom] ?? '')}
    let first = 0
    while (first < Math.min(previous.length, next.length) && previous[first] === next[first]) first++
    if (announcementStart !== -1 && first > announcementStart) first = announcementStart
    const same = first === previous.length && first === next.length
    const oldPark = this.park
    if (same && park.row === oldPark.row && park.col === oldPark.col) {
      this.declared = declaration !== null
      if (this.preParked) {this.preParked = false; this.deferredMs = 0; return horizontalAbsolute(park.col + 1)}
      return ''
    }
    const anchored = this.anchor === 'clean' || this.anchor === 'lastRowAnchored' && first === previous.length - 1 && oldPark.row === first && park.row === first
    if (!same && announcementStart === -1 && !this.preParked && anchored && previous.length === next.length && first >= previous.length - rows && oldPark.row >= previous.length - rows && next[first].startsWith(previous[first]) && !next[first].includes('\t') && next.slice(first + 1).every((value, i) => value === previous[first + 1 + i])) {
      const suffix = next[first].slice(previous[first].length)
      const width = stringWidth(previous[first])
      if (suffix && stringWidth(String.fromCodePoint(suffix.codePointAt(0)!)) > 0 && width + stringWidth(suffix) === stringWidth(next[first]) && graphemeBoundary(next[first], previous[first].length)) {
        const output = (first !== oldPark.row ? relative(0, first - oldPark.row) : '') + horizontalAbsolute(width + 1) + suffix + horizontalAbsolute(park.col + 1) + (park.row !== first ? relative(0, park.row - first) : '')
        this.lines = next; this.park = park; this.declared = declaration !== null
        return output
      }
    }
    if (!same && announcementStart === -1 && !this.preParked && anchored && previous.length === next.length && first >= previous.length - rows && previous[first].startsWith(next[first]) && !previous[first].includes('\t') && previous.slice(first + 1).every((value, i) => value === next[first + 1 + i])) {
      const suffix = previous[first].slice(next[first].length)
      const width = stringWidth(next[first])
      if (suffix && stringWidth(String.fromCodePoint(suffix.codePointAt(0)!)) > 0 && width + stringWidth(suffix) === stringWidth(previous[first]) && graphemeBoundary(previous[first], next[first].length) && (!/\s/.test(suffix) || /^\s+$/.test(suffix)) && declaration && this.declared && oldPark.row === first && oldPark.col === stringWidth(previous[first])) {
        const output = horizontalAbsolute(width + 1) + csi('K') + horizontalAbsolute(park.col + 1) + (park.row !== first ? relative(0, park.row - first) : '')
        this.lines = next; this.park = park; this.declared = true
        return output
      }
    }
    if (!same && announcementStart === -1 && !this.preParked && (options.preParkMs ?? 0) > 0) {
      this.preParked = true
      this.deferredMs = options.preParkMs ?? 0
      return columnStart
    }
    const oldBottom = Math.max(0, previous.length - 1)
    const moveToBottom = oldPark.row !== oldBottom ? relative(0, oldBottom - oldPark.row) : ''
    const oldTop = previous.length - rows
    const beyondVisible = oldTop > first && oldTop >= next.length || first === next.length && first > 0 && oldTop === first
    if (oldTop > first && oldTop < next.length) first = oldTop
    const clear = clearTail(previous.length - first)
    const tail = next.slice(first).join('\n')
    let body: string
    if (same) body = ''
    else if (first === previous.length) body = first > 0 ? `\n${tail}` : tail
    else if (first === next.length) body = first > 0 ? clear + relative(0, -1) : clear
    else body = clear + tail
    const end = horizontalAbsolute(park.col + 1) + (park.row !== bottom ? relative(0, park.row - bottom) : '')
    this.lines = next; this.park = park; this.declared = declaration !== null
    this.preParked = false; this.deferredMs = 0
    if (!same) {
      const changed = next.length - first
      const last = park.row === next.length - 1
      const shrunk = next.length < previous.length
      const shortBefore = previous.length <= rows
      if (beyondVisible) this.anchor = 'broken'
      else if (changed >= Math.min(next.length, rows)) this.anchor = 'clean'
      else if (changed > 0) {
        if (this.anchor === 'broken') this.anchor = last ? 'lastRowAnchored' : 'broken'
        else if (this.anchor === 'lastRowAnchored') { if (!last) this.anchor = 'broken' }
        else if (shrunk && !shortBefore) this.anchor = last ? 'lastRowAnchored' : 'broken'
      } else if (this.anchor === 'lastRowAnchored') this.anchor = 'broken'
      else if (shrunk && this.anchor === 'clean' && !shortBefore) this.anchor = last ? 'lastRowAnchored' : 'broken'
    } else if (this.anchor === 'lastRowAnchored' && (oldPark.row !== oldBottom || park.row !== bottom)) this.anchor = 'broken'
    return moveToBottom + body + end
  }
}
