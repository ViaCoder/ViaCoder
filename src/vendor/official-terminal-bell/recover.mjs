import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'
import {createHash} from 'node:crypto'
import ts from 'typescript'

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
const pins = {
  'chunk-nvnw4k6z.js': '4a7f6bf6211a059159a807480b342493871c1b4d71aeba37081fabfd08cd92c2',
  'chunk-xqbw5zpz.js': 'bc35a85f2b0dcf423b6adfce25a44f288c8fa10bf5cab99a5bfcba5783a82dfb',
}

/** Pure recovery for offline reproducibility tests; does not invoke commands. */
export function recoverVendor(rawRoot) {
  const index = JSON.parse(fs.readFileSync(path.join(rawRoot, '../index.json'), 'utf8'))
  if (index.version !== '2.1.283' || index.platform !== 'darwin-arm64') throw Error('Expected local official 2.1.283 darwin-arm64 modules')
  const sources = new Map(), modules = []
  for (const [file, expected] of Object.entries(pins)) {
    const bytes = fs.readFileSync(path.join(rawRoot, file)), hash = sha256(bytes)
    if (hash !== expected || hash !== index.modules.find(item => item.path === file)?.sha256) throw Error(`Module hash mismatch: ${file}`)
    sources.set(file, bytes.toString('utf8'))
    modules.push({file, sha256: hash})
  }
  const file = 'chunk-nvnw4k6z.js', source = sources.get(file)
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const declarations = [], functions = new Map()
  // lO/E/I/T prove the public default and selection chain; only w is installed.
  for (const symbol of ['lO', 'E', 'I', 'T', 'w']) {
    const node = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === symbol)
    if (!node) throw Error(`Missing official function: ${symbol}`)
    const start = node.getStart(ast), end = node.end, text = source.slice(start, end)
    declarations.push({file, symbol, start, end, sha256: sha256(text), installed: symbol === 'w'})
    functions.set(symbol, text)
  }
  const artifacts = new Map()
  // Entire self-contained parser, unchanged, including original notices.
  artifacts.set('chunk-xqbw5zpz.js', sources.get('chunk-xqbw5zpz.js'))
  artifacts.set('index.js', `// Official 2.1.283 w; function body unchanged. See provenance.json and NOTICE.\nimport {iQe,h3t} from './chunk-xqbw5zpz.js';\nexport function checkAppleTerminalBell({Ke,t}) {\n${functions.get('w')}\nreturn w();\n}\n`)
  const outputs = [...artifacts].map(([file, text]) => ({file, sha256: sha256(text)}))
  artifacts.set('provenance.json', JSON.stringify({
    version: '2.1.283', platform: 'darwin-arm64', modules, declarations, outputs,
    adaptations: ['Bind official Ke/t to the existing execFileNoThrow/debug host.', 'Retain the complete official plist parser byte for byte; no npm plist or replacement parser.'],
  }, null, 2) + '\n')
  return artifacts
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  if (!process.argv[2]) throw Error('Usage: bun recover.mjs OFFICIAL_RAW_DIRECTORY')
  for (const [file, source] of recoverVendor(process.argv[2])) fs.writeFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), file), source)
}
