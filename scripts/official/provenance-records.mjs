// Normalize explicit historical evidence shapes, not inferred feature parity.
import {PLATFORMS} from './version-diff-local.mjs'
import ts from 'typescript'

const pointerPart = value => String(value).replace(/~/g, '~0').replace(/\//g, '~1')
const declarationLists = new Set(['records', 'declarations', 'evidence'])
const moduleLists = new Set(['files', 'modules', 'sources', 'serviceSources'])
const shaPattern = /^[a-f0-9]{64}$/

export function provenanceRecords(document) {
  const rows = []
  function visit(value, pointer, inherited, role) {
    if (!value || typeof value !== 'object') return
    if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) visit(item, `${pointer}/${index}`, inherited, role)
      return
    }
    const platform = value.platform ?? inherited.platform
    const module = value.file ?? value.module ?? inherited.module
    const context = {platform, module}
    const originalModuleHash = value.upstreamSha256 ?? value.sourceSha256
    if (value.provenanceSha256 && value.provenance) {
      rows.push({pointer, kind: 'provenance-link', platform, record: {file: value.provenance, sha256: value.provenanceSha256}})
    } else if (role === 'declaration') {
      let source = value.source
      // Some schemas preserve executable text in `declaration`, others store
      // only comma-separated names there. Never turn those names into bodies.
      if (source === undefined && typeof value.declaration === 'string') {
        const tree = ts.createSourceFile('evidence.js', value.declaration, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
        if (!tree.parseDiagnostics.length && tree.statements.length === 1 &&
          (ts.isFunctionDeclaration(tree.statements[0]) || ts.isClassDeclaration(tree.statements[0]) || ts.isVariableStatement(tree.statements[0]))) source = value.declaration
      }
      rows.push({pointer, kind: 'declaration', platform, record: {...value, file: module, source}})
    } else if (role === 'module' || (originalModuleHash && (value.path || value.file || value.name || value.module))) {
      rows.push({pointer, kind: 'module', platform, record: {...value,
        file: module ?? value.upstreamPath ?? value.path ?? value.name,
        sha256: originalModuleHash ?? value.sha256}})
    } else if (value.expressionSha256) {
      rows.push({pointer, kind: 'expression', platform, record: {...value, file: module, sha256: value.expressionSha256}})
    }
    // LSP evidence records separate named bodies, not their parent module hash.
    for (const [key, digest] of Object.entries(value)) {
      if (!key.endsWith('Sha256') || !shaPattern.test(digest) || typeof value[key.slice(0, -6)] !== 'string') continue
      const symbol = value[key.slice(0, -6)]
      if (['primary', 'configurationResolver', 'reader', 'headerParser'].includes(key.slice(0, -6))) {
        rows.push({pointer: `${pointer}/${pointerPart(key)}`, kind: 'declaration', platform,
          record: {file: module, symbol, sha256: digest}})
      }
    }
    for (const [key, child] of Object.entries(value)) {
      if (!child || typeof child !== 'object') continue
      if (key === 'platforms') {
        for (const [name, entry] of Object.entries(child)) {
          // Family labels (darwin/linux) are not architectures; only an explicit
          // source platform can select one. equivalentSource is not proof.
          const selected = PLATFORMS.includes(name) ? name : PLATFORMS.includes(entry?.source) ? entry.source : undefined
          visit(entry, `${pointer}/${pointerPart(key)}/${pointerPart(name)}`, {...context, platform: selected}, undefined)
        }
      } else visit(child, `${pointer}/${pointerPart(key)}`, context,
        declarationLists.has(key) ? 'declaration' : moduleLists.has(key) || ['writer', 'callers', 'resource'].includes(key) ? 'module' : undefined)
    }
  }
  visit(document, '', {platform: document.platform, module: document.file ?? document.module}, undefined)
  return rows
}
