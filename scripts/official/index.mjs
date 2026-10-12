#!/usr/bin/env node
// Static AST inventory; never imports or executes extracted application code.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {fileURLToPath} from 'node:url';
import {fixtureRoot, readFixture, sha256} from './version-diff-local.mjs';

export function buildModuleIndex(directory) {
const root = fixtureRoot(directory), manifestBytes = readFixture(root, 'manifest.json');
const manifest = JSON.parse(manifestBytes);
const index = {schemaVersion: 2, version: manifest.version, platform: manifest.platform,
  manifestSha256: sha256(manifestBytes),
  binarySha256: manifest.binarySha256, entryPoint: manifest.entryPoint,
  scope: 'Hash-verified complete module denominator and top-level declaration/import/export syntax evidence. No runtime reachability, feature completeness or parity claim.',
  assets: [], modules: [], commands: [], runtimeReferences: [], unresolvedDynamicImports: [], parseErrors: []};
const paths = new Set();
for (const record of manifest.modules) {
  if (paths.has(record.path)) throw Error(`Duplicate manifest module: ${record.path}`);
  paths.add(record.path);
  const bytes = readFixture(root, `raw/${record.path}`);
  if (sha256(bytes) !== record.sha256 || bytes.length !== record.length) throw Error(`Module integrity mismatch: ${record.path}`);
  if (record.loader !== 1) { index.assets.push({path: record.path, sha256: record.sha256, length: bytes.length, loader: record.loader}); continue; }
  const text = new TextDecoder('utf-8', {fatal: true}).decode(bytes).replace(/\0+$/, '');
  const ast = ts.createSourceFile(record.path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const imports = new Set(), importBindings = [], exports = [], declarations = [];
  const anchor = node => ({module: record.path, moduleSha256: record.sha256, start: node.getStart(ast), end: node.end, sourceSha256: sha256(node.getText(ast))});
  for (const statement of ast.statements) {
    const nodes = ts.isVariableStatement(statement) ? statement.declarationList.declarations : [statement];
    for (const node of nodes) if (ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
      declarations.push({...anchor(node), name: node.name?.getText(ast), kind: ts.SyntaxKind[node.kind], classification: 'declaration-only; consumer-and-conditions-unmapped'});
    }
    if (ts.isExportDeclaration(statement)) exports.push({...anchor(statement), clause: statement.exportClause?.getText(ast), from: statement.moduleSpecifier?.getText(ast)});
    if (ts.isExportAssignment(statement)) exports.push({...anchor(statement), expression: statement.expression.getText(ast)});
    if (statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) exports.push({...anchor(statement), declaration: true});
  }
  for (const d of ast.parseDiagnostics) index.parseErrors.push({module: record.path, start: d.start,
    message: ts.flattenDiagnosticMessageText(d.messageText, '\n')});
  function visit(node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) { imports.add(node.moduleSpecifier.text); importBindings.push({...anchor(node), from: node.moduleSpecifier.text, clause: node.importClause?.getText(ast)}); }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.add(node.moduleSpecifier.text);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      if (node.arguments[0] && (ts.isStringLiteral(node.arguments[0]) || ts.isNoSubstitutionTemplateLiteral(node.arguments[0]))) imports.add(node.arguments[0].text);
      else index.unresolvedDynamicImports.push({...anchor(node), expression: node.getText(ast), classification: 'computed import; requires caller tracing'});
    }
    if (ts.isPropertyAccessExpression(node) && (node.expression.getText(ast) === 'Bun' || node.expression.getText(ast) === 'Bun.ant')) {
      index.runtimeReferences.push({...anchor(node), symbol: node.getText(ast)});
    }
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(ast).replace(/^['"]|['"]$/g, ''), p.initializer]));
      const name = props.get('name'), type = props.get('type');
      if (name && type && ts.isStringLiteral(name) && ts.isStringLiteral(type) && ['local', 'local-jsx', 'prompt'].includes(type.text)) {
        const fields = Object.fromEntries(['description', 'aliases', 'isEnabled', 'isHidden', 'load', 'call', 'supportsNonInteractive', 'thinClientDispatch', 'argumentHint'].filter(k => props.has(k)).map(k => [k, props.get(k).getText(ast)]));
        index.commands.push({...anchor(node), name: name.text, type: type.text, ...fields,
          status: 'registration-found; availability-and-behavior-not-yet-verified'});
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  index.modules.push({path: record.path, sha256: record.sha256, length: bytes.length, imports: [...imports].sort(), importBindings, exports, declarations});
}
const available = new Set(manifest.modules.map(m => m.name));
index.unresolvedBunImports = [...new Set(index.modules.flatMap(m => m.imports))].filter(i => i.startsWith('/$bunfs/') && !available.has(i));
return index;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
const [directory, destination] = process.argv.slice(2);
if (!directory || !destination) throw new Error('Usage: node index.mjs EXTRACTED_DIR OUTPUT_JSON');
const index = buildModuleIndex(directory);
fs.writeFileSync(destination, JSON.stringify(index, null, 2) + '\n');
console.log(JSON.stringify({platform: index.platform, modules: index.modules.length,
  assets: index.assets.length, declarations: index.modules.reduce((count, module) => count + module.declarations.length, 0),
  commands: new Set(index.commands.map(c => c.name)).size, unresolvedDynamicImports: index.unresolvedDynamicImports.length, parseErrors: index.parseErrors.length,
  unresolvedBunImports: index.unresolvedBunImports.length}));
if (index.parseErrors.length || index.unresolvedBunImports.length) process.exitCode = 1;
}
