// Offline recovery only. Run with Bun, passing the pinned extracted platform dir.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

const source = process.argv[2];
if (!source) throw Error('Pass the local official-modules-2.1.283/darwin-arm64 directory');
const output = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
if (manifest.version !== '2.1.283' || manifest.platform !== 'darwin-arm64') throw Error('Wrong official fixture');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const files = [];
function read(name) {
  const record = manifest.modules.find(m => m.path === name);
  const bytes = fs.readFileSync(path.join(source, 'raw', name));
  if (!record || sha(bytes) !== record.sha256) throw Error(`Unverified source: ${name}`);
  return {bytes, record};
}
for (const name of ['computer-use-swift.node', 'computer-use-input.node']) {
  const {bytes, record} = read(name);
  const relative = `native/darwin-arm64/${name}`;
  fs.mkdirSync(path.dirname(path.join(output, relative)), {recursive: true});
  fs.writeFileSync(path.join(output, relative), bytes);
  files.push({path: relative, source: name, upstreamSha256: record.sha256, sha256: sha(bytes)});
}
const name = 'chunk-jyc7p4t5.js';
const {bytes, record} = read(name);
const original = bytes.toString('utf8');
const replacements = {
  'chunk-63ryp0ar.js': "import { errorMessage as l } from '../../utils/errors.js';",
  'chunk-9nbfnb6f.js': "import { sleep as Q } from '../../utils/sleep.js'; import { withNativeTimeout as Nt } from './executorHost.js';",
  'chunk-3rswxk6s.js': "import { logForDebugging as t } from '../../utils/debug.js';",
  'chunk-pez7h27x.js': "import { execFileNoThrow as Ke } from '../../utils/execFileNoThrow.js';",
  'chunk-dvxa9rje.js': "import { getExecutorRuntime as Xg } from './executorHost.js';",
  'chunk-yxdq9by1.js': "import { requireComputerUseSwift as oF } from '../../utils/computerUse/swiftLoader.js'; import { drainRunLoop as Hse } from '../../utils/computerUse/drainRunLoop.js'; import { notifyExpectedEscape as fgr } from '../../utils/computerUse/escHotkey.js';",
  'chunk-0jkfjjj6.js': "import { loadOfficialInputBinding as xMr } from './nativeLoader.js';",
  'chunk-561p5r65.js': "import { xAt, Ttt } from './chunk-561p5r65.js';",
  'chunk-9r9kpwh0.js': "import { CLI_HOST_BUNDLE_ID as D$r, getTerminalBundleId as BMo, CLI_CU_CAPABILITIES as lfn } from '../../utils/computerUse/common.js';",
  'chunk-s44f4n2c.js': "import { v, Te } from '../official-chrome/chunk-s44f4n2c.js';",
};
const ast = ts.createSourceFile(name, original, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const edits = [];
for (const statement of ast.statements) {
  if (!ts.isImportDeclaration(statement)) continue;
  const replacement = replacements[path.basename(statement.moduleSpecifier.text)];
  if (!replacement) throw Error(`Unreviewed import ${statement.moduleSpecifier.text}`);
  edits.push({start: statement.getStart(ast), end: statement.end, replacement});
}
let recovered = original;
for (const edit of edits.reverse()) recovered = recovered.slice(0, edit.start) + edit.replacement + recovered.slice(edit.end);
fs.writeFileSync(path.join(output, name), recovered);
files.push({path: name, source: name, upstreamSha256: record.sha256, sha256: sha(recovered)});
fs.writeFileSync(path.join(output, 'host-provenance.json'), JSON.stringify({
  version: manifest.version, platform: manifest.platform, binarySha256: manifest.binarySha256,
  transformation: 'Native bytes unchanged; executor imports only adapted. All executor declarations and function bodies unchanged.', files,
}, null, 2) + '\n');
const symbols = {
  'chunk-x81d715s.js': ['v4o', 'Ffr', '$fr', 'Ufr', 'Bfr'],
  'chunk-geg6jndb.js': ['z'],
  'chunk-v9rwtrx0.js': ['iXt', 'vAt', 'igr', 'ft', 'ie', 'te', 'ue', 'K', 'Oe', 'on', 'nt'],
  'chunk-ck2pm2pp.js': ['QIn', 'Hao', 'I'],
  'chunk-yxdq9by1.js': ['c', 'oF', 'Hse', 'Clo', 'Alo', 'fgr'],
  'chunk-jyc7p4t5.js': ['M', 'c', 'dgr', 'A4o'],
  'chunk-crht2na0.js': ['b', 'B', 'U'],
  'chunk-yzv9vjk3.js': ['cgr', 'Qo', 'de', '_n', 'dXt', 'je', 'Fo'],
  'chunk-eby0bzvf.js': ['_lo', 'Slo', 'cXt', 'blo', 'wlo', 'q'],
  'chunk-mn08nqq5.js': ['uXt', 'r', 'o'],
  'chunk-9r9kpwh0.js': ['sfn'],
  'chunk-r4xrzyvn.js': ['vP'],
  'chunk-td7fxg34.js': ['yo'],
};
const evidence = [];
for (const [module, names] of Object.entries(symbols)) {
  const {bytes, record} = read(module);
  const ast = ts.createSourceFile(module, bytes.toString('utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  for (const symbol of names) {
    const statement = ast.statements.find(s => s.name?.text === symbol ||
      ts.isVariableStatement(s) && s.declarationList.declarations.some(d => d.name.getText(ast) === symbol));
    if (!statement) throw Error(`Missing official symbol ${module}:${symbol}`);
    evidence.push({module, symbol, moduleSha256: record.sha256,
      declarationSha256: sha(statement.getText(ast))});
  }
}
fs.writeFileSync(path.join(output, 'host-evidence.json'), JSON.stringify({
  version: manifest.version, platform: manifest.platform,
  source: 'Local official npm module table only; no network or sourcemap replacement', evidence,
}, null, 2) + '\n');
console.log(JSON.stringify({files: files.length, version: manifest.version}));
