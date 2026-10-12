import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import ts from 'typescript'

const out = import.meta.dirname
const repo = path.resolve(out, '../../../..')
const corpus = path.resolve(repo, '../.work/official-modules-2.1.287/darwin-arm64')
const sha = value => createHash('sha256').update(value).digest('hex')
const manifestBytes = fs.readFileSync(path.join(corpus, 'manifest.json'))
const manifest = JSON.parse(manifestBytes)
if (sha(manifestBytes) !== 'ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5' ||
    manifest.version !== '2.1.287' || manifest.platform !== 'darwin-arm64' ||
    manifest.binarySha256 !== '6eab8333fe2121553100d8f40bfada384a3e989b94f947e18ba6677a6fcb41ea') throw Error('Unpinned 287 corpus')
const expected = [
  ['chunk-ydrfyd4r.js', 'he', 810, 816, '9bfaf5e3de02aeccf9494a8629773264ba1c4c00a2df8aa2750758c71215804f'],
  ['chunk-ydrfyd4r.js', 'Be', 817, 897, '82768c30cb5b93799bdf758c4ba52e7c7256802a5f91536da9ae80858fd10dae'],
  ['chunk-ydrfyd4r.js', 'He', 898, 949, 'e9b84b07d88d8933dd2d6f1979af566fee08f9d67456faa58d35ff2203f45b68'],
  ['chunk-ydrfyd4r.js', 'G', 950, 1008, '19eafc245b8b70f609e91ba933fce8d4a7845d7cd91e90b0905cc6010f0c5413'],
  ['chunk-ydrfyd4r.js', 'q', 1009, 1053, 'a99f65b5ecd70877498fb4a9b3181dbe87477c210d7034825c6c737f4a4b58a1'],
  ['chunk-ydrfyd4r.js', 'rYn', 1054, 1255, 'a2714058b81b3da4c3067be5a18b8b066bf6a12e74e0dc6cf98e3564a6c1e575'],
  ['chunk-ydrfyd4r.js', 'Mue', 1618, 1993, '25d33b9cc365ff8fd48eb3e801f0cfbb13c23522142755f02d9365727b503405'],
  ['chunk-ydrfyd4r.js', 'Ze', 1993, 2189, 'fdaf997b2d22b1e10a476d7647e881138840e8ce398ad65f390867d2a11eb58e'],
  ['chunk-ydrfyd4r.js', 'gXe', 2189, 2771, 'd2243b7575c25bd9f4881506dae2d2adf5d2f559c19f1e28fb9440cc710ae206'],
  ['chunk-ydrfyd4r.js', 'C', 2771, 2859, '3e19824d09d2abb9ad521f392b34e2bc8f35077f905c3a020502cb35abc9c9b7'],
  ['chunk-ydrfyd4r.js', 'Ge', 2859, 2967, 'c06b3dc3e212f194ae87b036185afdadc5578be04edb5f763d3b7010965a25ea'],
  ['chunk-mphp7acd.js', 'KHn', 832071, 832347, 'd35272fda0df5a7c1630932866c2749416c624fb365947b44564de980af68c7c'],
  ['chunk-8hqf6tcv.js', 'Se', 619, 632, '76463f1e2606f3e391437450fe1cf7842d9f42b222f10b55176b2c24c3676626'],
  ['chunk-8hqf6tcv.js', 'cb', 633, 657, '10f96d453f3b159b95fab4ed27ce5f7690a3b20728aa7b6c0aca5fc2fca5ea73'],
  ['chunk-8hqf6tcv.js', '$e', 6915, 7349, 'd3fdea91f697e7c07468d38a9c4e5d20b0315ef51a15a8e81b0ea88e88062254'],
  ['chunk-mbfze585.js', 'fO', 1244, 1267, '68ee595a86ac4d669bf088ea298b55a1254007dbb037894404e3dfd50b59fd68'],
  ['chunk-mbfze585.js', 'ku', 1267, 1336, '666addf867fb8840dcb6fbe21b59a832ec49931b17cc7cd2b0b875a1fb80aba3'],
]
const modules = new Map()
function rawModule(file) {
  if (modules.has(file)) return modules.get(file)
  const entry = manifest.modules.find(row => row.path === file)
  const bytes = fs.readFileSync(path.join(corpus, 'raw', file))
  if (!entry || sha(bytes) !== entry.sha256 || bytes.length !== entry.length) throw Error('Raw hash mismatch: ' + file)
  const source = new TextDecoder('utf8', { fatal: true }).decode(bytes)
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const result = { source, ast, entry }
  modules.set(file, result)
  return result
}
const rows = expected.map(([file, name, start, end, digest]) => {
  const { ast, entry } = rawModule(file)
  let found
  for (const statement of ast.statements) {
    for (const node of ts.isVariableStatement(statement) ? statement.declarationList.declarations : [statement]) {
      if (node.name?.text === name) found = node
    }
  }
  if (!found || found.getStart(ast) !== start || found.end !== end || sha(found.getText(ast)) !== digest) throw Error('Declaration mismatch: ' + file + ':' + name)
  return { file, name, start, end, sourceSha256: digest, moduleSha256: entry.sha256, source: found.getText(ast), variable: ts.isVariableDeclaration(found) }
})

// cb/Se and all 92 parser declarations already live in canonical m315.
// Verify the actual selected bodies, not merely a reader's backend claim.
const canonicalDir = path.join(repo, 'src/utils/plugins/officialHooksLifecycle287')
const canonicalProof = JSON.parse(fs.readFileSync(path.join(canonicalDir, 'provenance.json')))
const canonicalNative = fs.readFileSync(path.join(canonicalDir, 'native.js'), 'utf8')
const parserBody = canonicalNative.slice(canonicalNative.indexOf('function module315(imports){'), canonicalNative.indexOf('function module316(imports){'))
const parserRows = canonicalProof.modules.find(row => row.file === 'chunk-8hqf6tcv.js')?.rows
if (parserRows?.length !== 92 || !canonicalNative.includes('case "chunk-8hqf6tcv.js":return m315;')) throw Error('Existing canonical parser selection changed')
for (const row of parserRows) {
  const { source, entry } = rawModule(row.file)
  const original = source.slice(row.start, row.end)
  if (row.moduleSha256 !== entry.sha256 || sha(original) !== row.sha256 || original !== row.source || !parserBody.includes(original)) throw Error('Existing parser body mismatch: ' + row.name)
}
for (const row of rows.filter(row => row.file === 'chunk-mbfze585.js')) {
  const selected = canonicalProof.modules.find(module => module.file === row.file)?.rows.find(selected => selected.name === row.name)
  if (selected?.source !== row.source || selected.sha256 !== row.sourceSha256 || !canonicalNative.includes(row.source)) throw Error('Existing standalone leaf changed: ' + row.name)
}
const restored = rows.slice(0, 12)
const native = `// Generated from pinned official 2.1.287 whole declarations; see provenance.json.\nexport function createBashAutocomplete287(ports){\nconst {cb,fO,ku}=ports;\n${restored.map(row => (row.variable ? 'var ' : '') + row.source + ';').join('\n')}\nreturn {parseCommand:rYn,extractCommandArguments:gXe,loadFigSpec:KHn};\n}\n`
const dts = `import type { TsNode } from '../bashParser.js'\nimport type { ParsedCommandData } from '../parser.js'\nimport type { CommandSpec } from '../registry.js'\nexport interface BashAutocompleteParser287 { parse(source: string, timeoutMs?: number): TsNode | null }\nexport interface BashAutocompletePorts287 { cb(): BashAutocompleteParser287; fO(): boolean; ku(): boolean }\nexport interface BashAutocomplete287 { parseCommand(command: string): Promise<ParsedCommandData | null>; extractCommandArguments(commandNode: TsNode): string[]; loadFigSpec(command: string): Promise<CommandSpec | null> }\nexport declare function createBashAutocomplete287(ports: BashAutocompletePorts287): BashAutocomplete287\n`
const proof = JSON.stringify({
  version: '2.1.287', platform: manifest.platform, manifestSha256: sha(manifestBytes), binarySha256: manifest.binarySha256,
  rangeUnit: 'UTF-16 end-exclusive',
  restored: restored.map(({ source: _source, variable: _variable, ...row }) => row),
  borrowed: rows.slice(12).map(({ source: _source, variable: _variable, ...row }) => row),
  parserSelection: { owner: 'getOriginalModsLifecycle287().clearSourceModule287("chunk-8hqf6tcv.js")', nativeModule: 'm315', cb: 'returns the original Se={parse:$e}', completeSelectedBodies: parserRows.length, rows: parserRows.map(({ file, name, start, end, moduleSha256, sha256 }) => ({ file, name, start, end, moduleSha256, sourceSha256: sha256 })) },
  hostBindings: { cb: 'existing canonical cb() parser, TsNode structural ABI; no second parser copy or private driver', fO: 'existing canonical m28.fO()', ku: 'existing canonical m28.ku()' },
  scope: 'Only parseCommand/extractCommandArguments and loadFigSpec. parseCommandRaw remains on existing getParserModule with unchanged feature, telemetry, abort sentinel and C protections. No Fig dependency installation or canonical graph expansion.',
}, null, 2) + '\n'
for (const [name, contents] of [['native.js', native], ['native.d.ts', dts], ['provenance.json', proof]]) {
  const target = path.join(out, name)
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) throw Error('Generated file differs: ' + target)
  } else fs.writeFileSync(target, contents)
}
console.log(JSON.stringify({ restored: restored.length, borrowedParserBodies: parserRows.length, borrowedStandaloneLeaves: 2, check: process.argv.includes('--check') }))
