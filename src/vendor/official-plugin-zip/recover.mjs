// Copy the complete pinned module; never evaluate the official application.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'

const root = process.argv[2]
if (!root) throw Error('Usage: bun recover.mjs OFFICIAL_2_1_283_ROOT [--check]')
const check = process.argv.includes('--check')
const platform = 'darwin-arm64'
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex')
const manifest = JSON.parse(fs.readFileSync(path.join(root, platform, 'manifest.json'), 'utf8'))
if (manifest.version !== '2.1.283' || manifest.platform !== platform) throw Error('Unexpected official package')
function readPinned(module, hash) {
  const bytes = fs.readFileSync(path.join(root, platform, 'raw', module))
  if (sha(bytes) !== hash || manifest.modules.find(entry => entry.path === module)?.sha256 !== hash) {
    throw Error('Official module hash mismatch: ' + module)
  }
  return bytes
}
const module = 'chunk-zaywha1d.js'
const hash = '41bfff2f84d91d7217905da220a6daa32730cd6df8a3614acddddc36d868c06d'
const writer = readPinned(module, hash)
const callerModule = 'chunk-wyjbafrm.js'
const callerHash = 'd768dbd60e9a07343bfb239ca0dbd56ce06b575e0ee046112bf8b51b5f5ede4b'
const source = ts.createSourceFile(callerModule, readPinned(callerModule, callerHash).toString('utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
const evidence = ['Gq', 'h7t', 'Fan', 's6e', 'x6'].map(symbol => {
  const node = source.statements.find(statement => statement.name?.text === symbol)
  if (!node) throw Error('Missing official symbol: ' + symbol)
  const declaration = node.getText(source)
  return { symbol, sha256: sha(declaration), declaration }
})
const outputs = {
  'write.js': writer,
  'provenance.json': Buffer.from(JSON.stringify({
    version: '2.1.283', platform,
    writer: { module, sha256: hash, output: 'write.js', transformation: 'none; entire module copied byte-for-byte' },
    callers: { module: callerModule, sha256: callerHash, evidence },
    integration: 'Fan level 6 and Unix attrs; s6e skips every symlink; x6 warns on post-publication directory removal failure. Existing local atomic publication and extraction validation retained.',
  }, null, 2) + '\n'),
}
for (const [name, bytes] of Object.entries(outputs)) {
  const target = new URL(name, import.meta.url)
  if (check) {
    if (!fs.readFileSync(target).equals(bytes)) throw Error('Generated file differs: ' + name)
  } else fs.writeFileSync(target, bytes)
}
console.log(`${check ? 'Verified' : 'Generated'} complete official ZIP writer and provenance`)
