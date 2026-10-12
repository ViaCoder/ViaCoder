// Local fixture I/O only. Never follow fixture symlinks or execute fixture code.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {fileURLToPath} from 'node:url'

export const PLATFORMS = Object.freeze(['darwin-arm64', 'darwin-x64', 'linux-arm64', 'linux-x64', 'win32-x64', 'win32-arm64'])
export const sha256 = value => crypto.createHash('sha256').update(value).digest('hex')
export const SOURCE_SHA256 = sha256(fs.readFileSync(fileURLToPath(import.meta.url)))
export const compareText = (a, b) => a < b ? -1 : a > b ? 1 : 0
export const json = value => JSON.stringify(value, null, 2) + '\n'
export function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical)
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]))
  return value
}
export const digestObject = value => sha256(JSON.stringify(canonical(value)))

export function localPath(value) {
  if (typeof value !== 'string' || !value || /^[a-z][a-z\d+.-]*:/i.test(value) || value.includes('\0')) {
    throw Error('Expected a local filesystem path, not a URL')
  }
  return path.resolve(value)
}
export function fixtureRoot(value) {
  const resolved = localPath(value)
  const stat = fs.lstatSync(resolved)
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw Error(`Expected a non-symlink fixture directory: ${resolved}`)
  return fs.realpathSync(resolved)
}
export function relativePath(value) {
  if (typeof value !== 'string' || !value || /[\\\x00-\x1f\x7f:]/.test(value) || path.posix.isAbsolute(value) ||
      value.split('/').some(part => !part || part === '.' || part === '..')) {
    throw Error(`Unsafe extracted path: ${JSON.stringify(value)}`)
  }
  return value
}
export function fixturePath(root, relative) {
  const parts = relativePath(relative).split('/')
  let current = root
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i])
    const stat = fs.lstatSync(current)
    if (stat.isSymbolicLink()) throw Error(`Fixture symlink rejected: ${relative}`)
    if (i < parts.length - 1 && !stat.isDirectory()) throw Error(`Expected fixture directory: ${relative}`)
  }
  return current
}
export function readFixture(root, relative) {
  const file = fixturePath(root, relative)
  if (!fs.lstatSync(file).isFile()) throw Error(`Expected regular fixture file: ${relative}`)
  const fd = fs.openSync(file, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK)
  try {
    const stat = fs.fstatSync(fd)
    if (!stat.isFile()) throw Error(`Expected regular fixture file: ${relative}`)
    return fs.readFileSync(fd)
  } finally { fs.closeSync(fd) }
}
export function inventoryFiles(directory) {
  const root = fixtureRoot(directory)
  const files = []
  function walk(relative = '') {
    const dir = relative ? fixturePath(root, relative) : root
    for (const name of fs.readdirSync(dir).sort(compareText)) {
      const child = relative ? `${relative}/${name}` : name
      const absolute = fixturePath(root, child)
      const stat = fs.lstatSync(absolute)
      if (stat.isDirectory()) walk(child)
      else if (stat.isFile()) {
        const bytes = readFixture(root, child)
        files.push({path: child, sha256: sha256(bytes), length: bytes.length, executable: Boolean(stat.mode & 0o111)})
      } else throw Error(`Special fixture file rejected: ${child}`)
    }
  }
  walk()
  files.sort((a, b) => compareText(a.path, b.path))
  return {fileCount: files.length, totalBytes: files.reduce((n, row) => n + row.length, 0), fileAggregateSha256: digestObject(files), files}
}
export function isWithin(parent, child) {
  const relative = path.relative(parent, child)
  return relative === '' || (!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith(`..${path.sep}`))
}
// Resolve even a not-yet-created output through its existing ancestors.
export function outputPath(value, inputs) {
  const requested = localPath(value)
  let ancestor = requested
  const tail = []
  while (true) {
    try { fs.lstatSync(ancestor); break } catch (error) {
      if (error.code !== 'ENOENT') throw error
      tail.unshift(path.basename(ancestor))
      ancestor = path.dirname(ancestor)
    }
  }
  const resolved = path.join(fs.realpathSync(ancestor), ...tail)
  if (inputs.some(input => isWithin(input, resolved) || isWithin(resolved, input))) {
    throw Error('Output must be outside both fixture trees')
  }
  if (fs.existsSync(resolved)) throw Error(`Output already exists; choose a fresh directory: ${resolved}`)
  return resolved
}

// Keep removed/added paths even when paired as relocations. Relocations are
// one-to-one and require equal bytes AND equal loader/encoding/execute metadata.
export function compareRows(before, after, metadata = []) {
  const old = new Map(before.map(row => [row.path, row]))
  const next = new Map(after.map(row => [row.path, row]))
  const exactPaths = [], changedPaths = [], removedPaths = [], addedPaths = [], metadataChangedPaths = [], contentChangedPaths = []
  for (const name of [...old.keys()].sort(compareText)) {
    const a = old.get(name), b = next.get(name)
    if (!b) { removedPaths.push(name); continue }
    const contentChanged = a.sha256 !== b.sha256 || a.length !== b.length
    const metadataChanged = metadata.some(key => a[key] !== b[key])
    if (contentChanged) contentChangedPaths.push(name)
    if (metadataChanged) metadataChangedPaths.push(name)
    ;(contentChanged || metadataChanged ? changedPaths : exactPaths).push(name)
  }
  for (const name of [...next.keys()].sort(compareText)) if (!old.has(name)) addedPaths.push(name)
  const key = row => JSON.stringify([row.sha256, row.length, ...metadata.map(field => row[field] ?? null)])
  const buckets = new Map()
  for (const name of addedPaths) {
    const hash = key(next.get(name))
    if (!buckets.has(hash)) buckets.set(hash, [])
    buckets.get(hash).push(name)
  }
  const exactRelocations = []
  for (const name of removedPaths) {
    const matches = buckets.get(key(old.get(name)))
    if (matches?.length) exactRelocations.push({from: name, to: matches.shift(), sha256: old.get(name).sha256})
  }
  return {baseline: before.length, candidate: after.length, exactPathCount: exactPaths.length,
    changedPaths, contentChangedPaths, metadataChangedPaths, removedPaths, addedPaths, exactRelocations}
}
