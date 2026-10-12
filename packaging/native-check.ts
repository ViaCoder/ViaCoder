// Runs only inside the isolated verification process, on the destination host.
import { createRequire } from 'node:module'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, realpathSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { desktopNativeFiles, hostTarget, nativePackages } from './platform.js'
const require = createRequire(import.meta.url)
const root = realpathSync(join(import.meta.dir, '..'))
const target = hostTarget()
const expected = nativePackages(target)
for (const [name, version] of Object.entries(expected)) {
  const pkg = JSON.parse(readFileSync(join(root, 'node_modules', name, 'package.json'), 'utf8'))
  if (pkg.version !== version) throw Error(`Wrong platform dependency: ${name}@${pkg.version}`)
}
if (target.startsWith('darwin-')) {
  const provenance = JSON.parse(readFileSync(join(root, 'src/vendor/official-desktop/host-provenance.json'), 'utf8'))
  if (provenance.version !== '2.1.287') throw Error('Wrong official desktop native source version')
  for (const asset of desktopNativeFiles(target)) {
    const relative = asset.replace('src/vendor/official-desktop/', '')
    const entry = provenance.files.find((file: {path: string}) => file.path === relative)
    if (!entry) throw Error(`Missing official desktop native provenance: ${relative}`)
    const bytes = readFileSync(join(root, asset))
    if (createHash('sha256').update(bytes).digest('hex') !== entry.sha256)
      throw Error(`Official desktop native payload hash mismatch: ${relative}`)
  }
}
if (JSON.parse(readFileSync(join(root, 'node_modules/@vscode/ripgrep/package.json'), 'utf8')).version !== '1.18.0') throw Error('Wrong ripgrep wrapper')

const { rgPath } = await import('@vscode/ripgrep')
const expectedRg = realpathSync(join(root, `node_modules/@vscode/ripgrep-${hostTarget()}/bin`, hostTarget().startsWith('win32-') ? 'rg.exe' : 'rg'))
const actualRg = realpathSync(rgPath)
const samePath = process.platform === 'win32'
  ? actualRg.toLowerCase() === expectedRg.toLowerCase()
  : actualRg === expectedRg
if (!samePath) throw Error(`ripgrep resolved outside the pinned platform package: ${rgPath}`)
const sharp = require('sharp')
if (require('sharp/package.json').version !== '0.34.5') throw Error('Wrong sharp version')
const bytes = await sharp({ create: { width: 2, height: 2, channels: 4, background: '#ff0000' } }).png().toBuffer()
const result = await sharp(bytes).metadata()
if (result.width !== 2 || result.height !== 2 || result.format !== 'png') throw Error('sharp native roundtrip failed')
// The public lazy cache-cleanup path imports cacache. CLI --help alone does
// not load that dependency graph or detect an incorrectly hoisted minipass.
const cacache = require('cacache')
const cache = mkdtempSync(join(tmpdir(), 'cc-release-cacache-'))
try {
  await cacache.put(cache, 'offline-verification', '中文🧪')
  if ((await cacache.get(cache, 'offline-verification')).data.toString() !== '中文🧪') throw Error('cacache roundtrip failed')
  const keys: string[] = []
  for await (const entry of cacache.ls.stream(cache)) keys.push(entry.key)
  if (keys.length !== 1 || keys[0] !== 'offline-verification') throw Error('cacache enumeration failed')
  await cacache.rm.entry(cache, 'offline-verification')
  if (await cacache.get.info(cache, 'offline-verification') !== null) throw Error('cacache removal failed')
} finally { rmSync(cache, { recursive: true, force: true }) }
console.log(JSON.stringify({ target, rgPath, sharp: '0.34.5', png: bytes.length,
  cacache: require('cacache/package.json').version, cacheRoundtrip: true }))
