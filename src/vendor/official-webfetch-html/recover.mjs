import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'
import {createHash} from 'node:crypto'
import ts from 'typescript'

const sha256 = value => createHash('sha256').update(value).digest('hex')
const pins = {
  'chunk-wyjbafrm.js': 'd768dbd60e9a07343bfb239ca0dbd56ce06b575e0ee046112bf8b51b5f5ede4b',
  'chunk-qht6ejf7.js': '86a10d2851634de831396bbd1adf844e08208a51ded8f8d535f336ab0ae4bbd6',
  'chunk-s44f4n2c.js': '2d0b1bc10a683bb8bd83b12c072c5b69dff2935c0a9386e377bbb129823481c4',
}

/** Return reproducible artifacts in memory; tests need not write any files. */
export function recoverVendor(rawRoot) {
  const index = JSON.parse(fs.readFileSync(path.join(rawRoot, '../index.json'), 'utf8'))
  if (index.version !== '2.1.283' || index.platform !== 'darwin-arm64') throw Error('Expected official 2.1.283 darwin-arm64 modules')
  const sources = new Map(), modules = []
  for (const [file, pin] of Object.entries(pins)) {
    const bytes = fs.readFileSync(path.join(rawRoot, file)), hash = sha256(bytes)
    if (hash !== index.modules.find(record => record.path === file)?.sha256 || (pin && hash !== pin)) throw Error(`Official module hash mismatch: ${file}`)
    sources.set(file, bytes.toString('utf8'))
    modules.push({file, sha256: hash})
  }
  const file = 'chunk-wyjbafrm.js', source = sources.get(file)
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const names = ['t8n', '__t', 'n8n', 'sRt'], bodies = [], declarations = []
  for (const name of names) {
    let node, variable = false
    for (const statement of ast.statements) {
      if (ts.isVariableStatement(statement)) {
        const found = statement.declarationList.declarations.find(item => item.name.getText(ast) === name)
        if (found) { node = found; variable = true; break }
      } else if (statement.name?.getText(ast) === name) { node = statement; break }
    }
    if (!node) throw Error(`Missing official declaration: ${name}`)
    const start = node.getStart(ast), end = node.end, text = source.slice(start, end)
    declarations.push({file, symbol: name, start, end, sha256: sha256(text)})
    bodies.push((variable ? 'var ' : '') + text.replaceAll('/$bunfs/root/chunk-qht6ejf7.js', './chunk-qht6ejf7.js') + (variable ? ';' : ''))
  }
  const artifacts = new Map()
  artifacts.set('chunk-s44f4n2c.js', sources.get('chunk-s44f4n2c.js'))
  // Keep the entire official Turndown + DOM implementation. Only relocate its
  // one import; no npm substitute, parser stub, source map or function rewrite.
  artifacts.set('chunk-qht6ejf7.js', sources.get('chunk-qht6ejf7.js').replaceAll('/$bunfs/root/chunk-s44f4n2c.js', './chunk-s44f4n2c.js'))
  artifacts.set('index.js', `// Official npm 2.1.283 declarations. See provenance.json and NOTICE.\nexport function createOfficialHTMLConverter({t}) {\n${bodies.join('\n')}\nreturn {convert:sRt};\n}\n`)
  const outputs = [...artifacts].map(([file, source]) => ({file, sha256: sha256(source)}))
  artifacts.set('provenance.json', JSON.stringify({
    version: '2.1.283', platform: 'darwin-arm64', modules, declarations, outputs,
    adaptations: ['Relocate two bunfs import specifiers to sibling files.', 'Bind official debug logger t through a factory; retain the official lazy singleton and function bodies.'],
  }, null, 2) + '\n')
  return artifacts
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  if (!process.argv[2]) throw Error('Usage: bun recover.mjs OFFICIAL_RAW_DIRECTORY')
  const output = path.dirname(fileURLToPath(import.meta.url))
  for (const [file, source] of recoverVendor(process.argv[2])) fs.writeFileSync(path.join(output, file), source)
}
