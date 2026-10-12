import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'

const repo = path.resolve(import.meta.dirname, '../../..')
const corpus = path.resolve(repo, '../.work/official-modules-2.1.287/darwin-arm64')
const sha = value => crypto.createHash('sha256').update(value).digest('hex')
const manifestBytes = fs.readFileSync(path.join(corpus, 'manifest.json'))
const manifest = JSON.parse(manifestBytes.toString())
const manifestPin = 'ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if (sha(manifestBytes) !== manifestPin || manifest.version !== '2.1.287' || manifest.platform !== 'darwin-arm64') throw Error('Unpinned task-registration corpus')
const roots = {
  Session: ['chunk-nankzm0s.js', 'zh'], SessionSlot: ['chunk-nankzm0s.js','zO'], snapshot: ['chunk-mphp7acd.js', 'cN'],
  backgroundAnnouncement:['chunk-mphp7acd.js','k2n'], backgroundText:['chunk-mphp7acd.js','s6n'],
  readTail: ['chunk-p54b66vv.js', 'hUe'], withdraw: ['chunk-mphp7acd.js', 'Cmr'], claimShellNotification:['chunk-mphp7acd.js','r3'],
}
// Only external owners/runtime libraries are cut. Every pure task/gate helper is recovered.
const cuts = {
  'chunk-1b21she7.js:Wt': 'registerTool',
  'chunk-mphp7acd.js:hy':'notificationQueue',
  'chunk-bn3p37gv.js:Ge':'mainAgentId',
  'chunk-nankzm0s.js:rr': 'taskSession',
  'chunk-vz8a844r.js:ko': 'featureState',
  'chunk-nankzm0s.js:k': 'featureValue',
  'chunk-mbfze585.js:a': 'environment',
  'chunk-bn3p37gv.js:n': 'executionContext',
  'chunk-f4hr5xjf.js:xk': 'backgroundPolicy',
  'chunk-yzr5hfaq.js:JC': 'agentContext',
  'chunk-bhm9m1rw.js:Ggo': 'persistedLookup',
  'chunk-p54b66vv.js:Sp': 'outputPath',
  'chunk-amhtwhch.js:d':'logError',
  'chunk-q80zaav8.js:t': 'debug',
  'chunk-6hnyhakg.js:i': 'telemetry',
}
for (const [name, port] of Object.entries({o:'stringSchema',u:'objectSchema',Ve:'strictObjectSchema',Wo:'discriminatedUnionSchema',T:'arraySchema',x:'literalSchema',H:'booleanSchema',C:'numberSchema'})) cuts['chunk-aybmj3t4.js:'+name] = port
const modules = new Map(), ports = new Map()
function load(file) {
  if (modules.has(file)) return modules.get(file)
  const entry = manifest.modules.find(row => row.path === file)
  if (!entry) throw Error('Module outside pinned corpus: '+file)
  const bytes = fs.readFileSync(path.join(corpus, 'raw', file))
  if (sha(bytes) !== entry.sha256 || bytes.length !== entry.length) throw Error('Invalid module: '+file)
  const ast = ts.createSourceFile(file, new TextDecoder('utf8', {fatal:true}).decode(bytes), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  if (!Array.isArray(ast.parseDiagnostics) || ast.parseDiagnostics.length) throw Error('Invalid or missing actual parser diagnostics: '+file)
  const declarations = new Map(), imports = new Map(), exports = new Map()
  for (const statement of ast.statements) {
    for (const node of ts.isVariableStatement(statement) ? statement.declarationList.declarations : [statement]) if (node.name) declarations.set(node.name.getText(ast), node)
    if (ts.isImportDeclaration(statement) && statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) for (const item of statement.importClause.namedBindings.elements) imports.set(item.name.text, {file:path.basename(statement.moduleSpecifier.text), name:(item.propertyName??item.name).text})
    if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) for (const item of statement.exportClause.elements) exports.set(item.name.text, (item.propertyName??item.name).text)
  }
  const m = {file,entry,ast,declarations,imports,exports,selected:new Map(),bindings:new Map(),initializers:[]}
  modules.set(file,m); return m
}
function resolve(m,name) {
  if (m.declarations.has(name)) return {m,name,node:m.declarations.get(name)}
  const imported = m.imports.get(name)
  if (!imported) throw Error('Unresolved '+m.file+':'+name)
  if (!imported.file.startsWith('chunk-')) throw Error('Unclassified external import '+JSON.stringify(imported))
  const target = load(imported.file)
  return resolve(target,target.exports.get(imported.name)??imported.name)
}
function proof(m,node,name) {
  const source = node.getText(m.ast)
  return {file:m.file,name,start:node.getStart(m.ast),end:node.end,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,sha256:sha(source),source,variable:ts.isVariableDeclaration(node)}
}
const globals = new Set(['undefined','Error','TypeError','String','Number','Boolean','Object','Array','Map','Set','WeakMap','WeakSet','Promise','Date','Math','JSON','RegExp','Symbol','Infinity','NaN','Reflect','parseInt','parseFloat','isNaN','isFinite','Buffer','Uint8Array','Uint16Array','Uint32Array','Int8Array','Int16Array','Int32Array','ArrayBuffer','DataView','TextDecoder','TextEncoder','globalThis','global','self','Function','AggregateError'])
function dependencies(source) {
  const text = 'export function closure(){'+source+'}', ast = ts.createSourceFile('closure.js',text,99,true,ts.ScriptKind.JS)
  const host = {getSourceFile:n=>n==='closure.js'?ast:undefined,getDefaultLibFileName:()=>'',writeFile(){},getCurrentDirectory:()=> '/',getCanonicalFileName:n=>n,useCaseSensitiveFileNames:()=>true,getNewLine:()=> '\n',fileExists:n=>n==='closure.js',readFile:n=>n==='closure.js'?text:undefined}
  const checker=ts.createProgram(['closure.js'],{allowJs:true,noResolve:true,noLib:true},host).getTypeChecker(),refs=new Set()
  function visit(n) {
    if(ts.isIdentifier(n)&&!checker.getSymbolAtLocation(n)&&!globals.has(n.text)
      &&!(ts.isPropertyAccessExpression(n.parent)&&n.parent.name===n)
      &&!(ts.isPropertyAssignment(n.parent)&&n.parent.name===n)
      &&!(ts.isBindingElement(n.parent)&&n.parent.propertyName===n)
      &&!(ts.isMethodDeclaration(n.parent)&&n.parent.name===n)
      &&!(ts.isPropertyDeclaration(n.parent)&&n.parent.name===n)) refs.add(n.text)
    ts.forEachChild(n,visit)
  }
  visit(ast);return [...refs]
}
function bind(m,name) {
  if(m.bindings.has(name)||m.selected.has(name))return
  if(name==='process') {m.bindings.set(name,{port:'process'});return}
  const imp=m.imports.get(name);
  if(imp && !imp.file.startsWith('chunk-')) {
    const port={'fs:constants':'fsConstants','promises:lstat':'lstat','promises:open':'open'}[imp.file+':'+imp.name];
    if(!port)throw Error('Unclassified library '+JSON.stringify(imp));
    m.bindings.set(name,{port});return;
  }
  const origin=resolve(m,name),identity=origin.m.file+':'+origin.name
  if(cuts[identity]) {
    m.bindings.set(name,{port:cuts[identity],identity})
    ports.set(identity,{port:cuts[identity],...proof(origin.m,origin.node,origin.name)})
    return
  }
  if(origin.m!==m) {bind(origin.m,origin.name);m.bindings.set(name,{file:origin.m.file,name:origin.name});return}
  const row=proof(m,origin.node,name);m.selected.set(name,row)
  for(const ref of dependencies((row.variable?'var ':'')+row.source+';')) {
    try {bind(m,ref)} catch(error){error.message+='\nvia '+identity;throw error}
  }
}
if(process.argv.includes('--origins')) {for(const [key,port] of Object.entries(cuts)){const sep=key.indexOf(':');const r=resolve(load(key.slice(0,sep)),key.slice(sep+1));console.log(r.m.file+':'+r.name,port,r.node.getText(r.m.ast).slice(0,240))}process.exit(0)}
for(const [api,[file,name]] of Object.entries(roots)){const origin=resolve(load(file),name);roots[api]=[origin.m.file,origin.name]}
for(const [file,name] of Object.values(roots))bind(load(file),name)

// Retain standalone initialization that references this slice. Bind every free
// dependency of each initializer before generating a module factory.
let changed = true
while (changed) {
  changed = false
  for (const m of modules.values()) for (const statement of m.ast.statements) {
    if (!ts.isExpressionStatement(statement) || m.initializers.some(row=>row.start===statement.getStart(m.ast))) continue
    const refs = dependencies(statement.getText(m.ast))
    if (!refs.some(name=>m.selected.has(name))) continue
    const row = proof(m,statement,'<initializer>'); m.initializers.push(row); changed=true
    for (const ref of refs) bind(m,ref)
  }
}
const ordered=[],visited=new Set(),visiting=new Set()
function order(file) {
  if(visited.has(file))return
  if(visiting.has(file))throw Error('Unresolved initialization cycle '+file)
  visiting.add(file)
  for(const binding of load(file).bindings.values())if(binding.file)order(binding.file)
  visiting.delete(file);visited.add(file);ordered.push(file)
}
for(const [file]of Object.values(roots))order(file)
const selected=ordered.map(file=>{
  const m=load(file)
  return {file,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,rows:[...m.selected.values()].sort((a,b)=>a.start-b.start),bindings:Object.fromEntries(m.bindings),initializers:m.initializers.sort((a,b)=>a.start-b.start)}
})
const index=new Map(ordered.map((file,i)=>[file,i]))
const runtime=`// Complete pinned 2.1.287 GetTask definition/helpers. Host owners are explicit ports.
${selected.map((m,i)=>`function module${i}(imports){
${Object.keys(m.bindings).map(name=>`const ${name}=imports[${JSON.stringify(name)}];`).join('\n')}
${[...m.rows,...m.initializers].sort((a,b)=>a.start-b.start).map(row=>(row.variable?'var ':'')+row.source+';').join('\n')}
return {${m.rows.map(row=>row.name).join(',')}};
}`).join('\n')}
export function createGetTaskSessionNative287(ports){
for(const name of ${JSON.stringify([...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))].sort())})if(ports[name]===undefined)throw Error('Missing task registration host port: '+name);
${selected.map((m,i)=>`const m${i}=module${i}({${Object.entries(m.bindings).map(([name,b])=>JSON.stringify(name)+':'+(b.port?`ports[${JSON.stringify(b.port)}]`:`m${index.get(b.file)}[${JSON.stringify(b.name)}]`)).join(',')}});`).join('\n')}
return {${Object.entries(roots).map(([api,[file,name]])=>api+':m'+index.get(file)+'['+JSON.stringify(name)+']').join(',')}};
}
`
const native=ts.transpileModule(runtime,{compilerOptions:{allowJs:true,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,removeComments:false}}).outputText

function contract(file,name) {const r=resolve(load(file),name);return proof(r.m,r.node,r.name)}
function bashFormatterContract() {
 const m=load('chunk-mphp7acd.js');let method
 function visit(node){if(ts.isMethodDeclaration(node)&&node.name?.getText(m.ast)==='mapToolResultToToolResultBlockParam'&&node.getText(m.ast).includes('k2n('))method=node;ts.forEachChild(node,visit)}
 visit(m.ast);if(!method)throw Error('Original Bash formatter not found')
 return proof(m,method,'Bash.mapToolResultToToolResultBlockParam')
}
const sourceContracts={bashFormatter:bashFormatterContract(),hostSession:contract('chunk-nankzm0s.js','rr'),featureOwner:contract('chunk-vz8a844r.js','ko'),backgroundPolicy:contract('chunk-f4hr5xjf.js','xk'),pool:contract('chunk-djhbc0y7.js','pv'),completion:contract('chunk-mphp7acd.js','xqe'),kill:contract('chunk-mphp7acd.js','_N')}
const provenance={version:manifest.version,platform:manifest.platform,manifestSha256:manifestPin,offsetUnit:'UTF-16 code units',roots,sourceContracts,modules:selected,ports:[...ports.values()],nativeSha256:sha(native)}
const out=path.join(repo,'src/tools/GetTaskTool')
for(const [name,content] of [['sessionNative.js',native],['sessionProvenance.json',JSON.stringify(provenance,null,2)+'\n']]) {
 const target=path.join(out,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==content)throw Error('Stale '+target)}
 else {fs.mkdirSync(out,{recursive:true});fs.writeFileSync(target,content)}
}
console.log(JSON.stringify({modules:selected.length,rows:selected.reduce((n,m)=>n+m.rows.length,0),ports:[...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))],nativeSha256:sha(native)}))
