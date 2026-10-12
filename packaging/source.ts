import { createHash, randomUUID } from 'node:crypto'
import { chmodSync, copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { MIN_BUN, nativePackages, TARGETS } from './platform.js'

export const MANIFEST = 'release-manifest.json'
export type FileEntry = { path: string; sha256: string; mode: number }
export type Manifest = {
  format: 1; kind: 'source-bun'; version: string; minBun: string
  originalBunLockSHA256?: string
  targets: typeof TARGETS; nativeDependencies: Record<string, Record<string, string>>; files: FileEntry[]
}
/** Normalize only the known mirror's download origin, never resolve versions or
 * regenerate integrity/dependency metadata. Shared workspace locks stay intact. */
export function officialBunLock(text: string): string {
  const lock = Bun.JSON5.parse(text) as { packages?: Record<string, unknown[]> }
  for (const [name, entry] of Object.entries(lock.packages ?? {})) {
    if (typeof entry[1] !== 'string' || !entry[1]) continue
    const url = new URL(entry[1])
    if (url.protocol !== 'https:' || url.username || url.password || url.port ||
        !['registry.npmjs.org', 'registry.npmmirror.com'].includes(url.hostname)) {
      throw Error(`Unsupported locked package origin: ${name}`)
    }
    url.hostname = 'registry.npmjs.org'
    entry[1] = url.href
  }
  return JSON.stringify(lock, null, 2) + '\n'
}
export const hash = (bytes: string | Buffer) => createHash('sha256').update(bytes).digest('hex')
const blocked = new Set(['.git', '.work', 'node_modules', 'tests', '__tests__', '__pycache__', '.claude', '.credentials.json'])
// Windows stores no POSIX execute bit. Keep the source-release intent explicit
// when packing there rather than emitting 0644 for every file from NTFS stats.
const windowsExecutablePaths = new Set(['bin/cc', 'bin/cclaude', 'bin/viacoder', 'install/cc-install', 'install/cc-release'])
export function sourceFileMode(path: string, observedMode: number, platform = process.platform): number {
  if (platform === 'win32') return windowsExecutablePaths.has(path) ? 0o755 : 0o644
  return observedMode & 0o111 ? 0o755 : 0o644
}
export function sourceModeMatches(observedMode: number, expectedMode: number, platform = process.platform): boolean {
  // Win32's chmod/stat contract exposes the owner write bit, not POSIX execute
  // or group/other bits. The manifest still validates the canonical 0644/0755
  // intent; Windows verifies the writable property it can actually represent.
  if (platform === 'win32') return (observedMode & 0o200) === (expectedMode & 0o200)
  return (observedMode & 0o777) === expectedMode
}
function safePath(path: string): void {
  if (!path || path.includes('\\') || path.includes('\0') || path.startsWith('/') ||
      path.split('/').some(p => !p || p === '..' || p === '.' || blocked.has(p) ||
        (p.startsWith('.') && path !== '.env.example'))) throw Error(`Excluded or invalid release path: ${path}`)
}
function file(root: string, path: string): string {
  safePath(path)
  let current = root
  for (const part of path.split('/')) {
    current = join(current, part)
    if (lstatSync(current).isSymbolicLink()) throw Error(`Symlinks are not source payload: ${path}`)
  }
  if (!lstatSync(current).isFile()) throw Error(`Expected regular source file: ${path}`)
  return current
}
function collect(root: string, path: string, paths: string[]): void {
  safePath(path)
  const stat = lstatSync(join(root, path))
  if (stat.isSymbolicLink()) throw Error(`Symlinks are not source payload: ${path}`)
  if (stat.isDirectory()) for (const name of readdirSync(join(root, path)).sort()) collect(root, `${path}/${name}`, paths)
  else if (stat.isFile()) paths.push(path)
  else throw Error(`Unsupported source entry: ${path}`)
}
function validateDependencies(root: string): void {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  const lock = Bun.JSON5.parse(readFileSync(join(root, 'bun.lock'), 'utf8')) as { workspaces?: Record<string, Record<string, Record<string, string>>>; packages?: Record<string, unknown[]> }
  for (const [name, entry] of Object.entries(lock.packages ?? {})) {
    if (typeof entry[1] === 'string' && entry[1] && !entry[1].startsWith('https://registry.npmjs.org/')) {
      throw Error(`Release lock must use official npm: ${name}`)
    }
  }
  for (const group of ['dependencies', 'devDependencies', 'optionalDependencies']) {
    const a = pkg[group] ?? {}, b = lock.workspaces?.['']?.[group] ?? {}
    if (Object.keys(a).length !== Object.keys(b).length || Object.keys(a).some(k => a[k] !== b[k])) {
      throw Error(`package.json / bun.lock ${group} differ; wait for the dependency owner to finish`)
    }
  }
  if (pkg.dependencies?.['@vscode/ripgrep'] !== '1.18.0' || pkg.dependencies?.sharp !== '0.34.5') {
    throw Error('Expected pinned @vscode/ripgrep 1.18.0 and sharp 0.34.5')
  }
  for (const target of TARGETS) for (const [name, version] of Object.entries(nativePackages(target))) {
    if (lock.packages?.[name]?.[0] !== `${name}@${version}`) throw Error(`Missing frozen dependency: ${name}@${version}`)
  }
}
export function createSource(source: string, output: string): string {
  source = resolve(source); output = resolve(output)
  const list = JSON.parse(readFileSync(join(source, 'packaging/files.json'), 'utf8')) as { files: string[]; trees: string[] }
  const paths = [...list.files]
  for (const tree of list.trees) collect(source, tree, paths)
  const files = [...new Set(paths)].sort().map(path => {
    const location = file(source, path)
    return { path, sha256: hash(readFileSync(location)), mode: sourceFileMode(path, lstatSync(location).mode, process.platform) }
  })
  const originalFiles = files.map(entry => ({ ...entry }))
  const sourceLock = readFileSync(file(source, 'bun.lock'), 'utf8')
  const releaseLock = officialBunLock(sourceLock)
  files.find(entry => entry.path === 'bun.lock')!.sha256 = hash(releaseLock)
  const pkg = JSON.parse(readFileSync(file(source, 'package.json'), 'utf8'))
  if (!/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(pkg.version)) throw Error('Invalid release version')
  const manifest: Manifest = { format: 1, kind: 'source-bun', version: pkg.version, minBun: MIN_BUN,
    originalBunLockSHA256: hash(sourceLock),
    targets: TARGETS, nativeDependencies: Object.fromEntries(TARGETS.map(t => [t, nativePackages(t)])), files }
  mkdirSync(output, { recursive: true })
  const stage = join(output, `.pack-${randomUUID()}`)
  const name = `cc-${pkg.version}-source-bun-${hash(JSON.stringify(manifest)).slice(0, 16)}`
  const dest = join(output, name)
  if (existsSync(dest)) throw Error(`Artifact already exists: ${dest}`)
  mkdirSync(stage)
  try {
    for (const entry of files) {
      const destFile = join(stage, entry.path)
      mkdirSync(dirname(destFile), { recursive: true })
      if (entry.path === 'bun.lock') writeFileSync(destFile, releaseLock)
      else copyFileSync(file(source, entry.path), destFile)
      chmodSync(destFile, entry.mode)
    }
    writeFileSync(join(stage, MANIFEST), JSON.stringify(manifest, null, 2) + '\n')
    verifySource(stage)
    // Concurrent edits must not silently produce a mixed package/lock/source snapshot.
    for (const entry of originalFiles) if (hash(readFileSync(file(source, entry.path))) !== entry.sha256) {
      throw Error(`Source changed during packing: ${entry.path}`)
    }
    renameSync(stage, dest)
    return dest
  } finally { if (existsSync(stage)) rmSync(stage, { recursive: true }) } // only our never-running staging directory
}
export function verifySource(root: string, installed = false): Manifest {
  if (lstatSync(join(root, MANIFEST)).isSymbolicLink()) throw Error('Manifest must be a regular file')
  const manifest = JSON.parse(readFileSync(join(root, MANIFEST), 'utf8')) as Manifest
  if (manifest.format !== 1 || manifest.kind !== 'source-bun' || !Array.isArray(manifest.files)) throw Error('Invalid source manifest')
  if (JSON.stringify(manifest.targets) !== JSON.stringify(TARGETS) || manifest.minBun !== MIN_BUN) throw Error('Unsupported release target contract')
  const seen = new Set<string>()
  for (const entry of manifest.files) {
    if (seen.has(entry.path) || ![0o644, 0o755].includes(entry.mode)) throw Error('Invalid file manifest')
    seen.add(entry.path)
    const path = file(root, entry.path)
    const stat = lstatSync(path)
    if (hash(readFileSync(path)) !== entry.sha256 || !sourceModeMatches(stat.mode, entry.mode, process.platform)) throw Error(`Payload mismatch: ${entry.path}`)
  }
  const visit = (dir: string, prefix = '') => {
    for (const name of readdirSync(dir)) {
      const path = prefix + name
      if (!prefix && (name === MANIFEST || (installed && ['node_modules', '.cc-ready.json'].includes(name)))) continue
      safePath(path)
      const stat = lstatSync(join(root, path))
      if (stat.isSymbolicLink()) throw Error(`Unexpected symlink: ${path}`)
      if (stat.isDirectory()) visit(join(root, path), path + '/')
      else if (!stat.isFile() || !seen.has(path)) throw Error(`Unlisted payload: ${path}`)
    }
  }
  visit(root)
  const required = JSON.parse(readFileSync(file(root, 'packaging/files.json'), 'utf8')).files as string[]
  for (const path of required) if (!seen.has(path)) throw Error(`Missing required file: ${path}`)
  if (JSON.parse(readFileSync(file(root, 'package.json'), 'utf8')).version !== manifest.version) throw Error('Version mismatch')
  validateDependencies(root)
  return manifest
}
export function copySource(source: string, dest: string): void {
  const manifest = verifySource(source)
  mkdirSync(dest) // exclusive, new immutable candidate only
  for (const entry of manifest.files) {
    const path = join(dest, entry.path)
    mkdirSync(dirname(path), { recursive: true }); copyFileSync(file(source, entry.path), path); chmodSync(path, entry.mode)
  }
  copyFileSync(join(source, MANIFEST), join(dest, MANIFEST))
  verifySource(dest)
}
