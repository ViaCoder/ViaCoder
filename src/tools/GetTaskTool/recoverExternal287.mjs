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
  killShell:['chunk-mphp7acd.js','_N'], killForAgent:['chunk-5ne43w2c.js','Fs'],
  synchronousAgent:['chunk-nankzm0s.js','pJe'],
  closeShells:['chunk-xapeakym.js','uh'],shouldCloseShells:['chunk-xapeakym.js','dh'],
  emitTerminal:['chunk-nankzm0s.js','Ii'],
}
// Runtime owners/host I/O only. Recover _N, Fs, Ii/Vh and all pure helpers.
const cuts = {
  'chunk-nankzm0s.js:rr':'taskSession',
  'chunk-ebcyvbxn.js:BN':'enabled',
  'chunk-nankzm0s.js:Wi':'enqueueHostEvent',
  'chunk-p54b66vv.js:uxe':'appendOutput',
  'chunk-p54b66vv.js:Qu':'evictOutput',
  'chunk-p54b66vv.js:Sp':'outputPath',
  'chunk-amhtwhch.js:d':'logError',
  'chunk-q80zaav8.js:t':'debug',
  'chunk-mphp7acd.js:Sdt':'dequeueForAgent',
}
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
  // Fs must route each task through its captured producer, not one ambient host.
  if(['chunk-5ne43w2c.js','chunk-xapeakym.js'].includes(m.file) && name==='_N') {
    m.bindings.set(name,{port:'killTask',identity})
    ports.set(m.file+':'+name,{port:'killTask',...proof(origin.m,origin.node,origin.name)})
    return
  }
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
export function createGetTaskExternalNative287(ports){
for(const name of ${JSON.stringify([...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))].sort())})if(ports[name]===undefined)throw Error('Missing task registration host port: '+name);
${selected.map((m,i)=>`const m${i}=module${i}({${Object.entries(m.bindings).map(([name,b])=>JSON.stringify(name)+':'+(b.port?`ports[${JSON.stringify(b.port)}]`:`m${index.get(b.file)}[${JSON.stringify(b.name)}]`)).join(',')}});`).join('\n')}
return {${Object.entries(roots).map(([api,[file,name]])=>api+':m'+index.get(file)+'['+JSON.stringify(name)+']').join(',')}};
}
`
const native=ts.transpileModule(runtime,{compilerOptions:{allowJs:true,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,removeComments:false}}).outputText

function contract(file,name) {const r=resolve(load(file),name);return proof(r.m,r.node,r.name)}
function contextShape(file,isAsync) {
 const m=load(file);let found
 function visit(node){
  if(ts.isObjectLiteralExpression(node) && node.properties.some(p=>ts.isPropertyAssignment(p)&&p.name.getText(m.ast)==='agentType'&&p.initializer.getText(m.ast)==='"subagent"')
    && node.properties.some(p=>ts.isPropertyAssignment(p)&&p.name.getText(m.ast)==='isAsync'&&p.initializer.getText(m.ast)===(isAsync?'!0':'!1'))) {
    if(found)throw Error('Ambiguous original context shape '+file);found=node
  }
  ts.forEachChild(node,visit)
 }
 visit(m.ast);if(!found)throw Error('Missing original context shape '+file)
 return proof(m,found,isAsync?'asyncLaunchContext':'syncLaunchContext')
}
const sourceContracts={
 registry:contract('chunk-djhbc0y7.js','qW'),pool:contract('chunk-djhbc0y7.js','pv'),
 getTools:contract('chunk-djhbc0y7.js','HO'),assembleToolPool:contract('chunk-djhbc0y7.js','ETt'),
 kill:contract('chunk-mphp7acd.js','_N'),killForAgent:contract('chunk-5ne43w2c.js','Fs'),
 printWindDown:contract('chunk-xapeakym.js','ih'),printClose:contract('chunk-xapeakym.js','uh'),printCloseGate:contract('chunk-xapeakym.js','dh'),
 syncLaunch:contextShape('chunk-xmc0bp9s.js',false),asyncLaunch:contextShape('chunk-xmc0bp9s.js',true),
 resumeLaunch:contextShape('chunk-wnsb5bq3.js',true),
}
const provenance={version:manifest.version,platform:manifest.platform,manifestSha256:manifestPin,offsetUnit:'UTF-16 code units',roots,sourceContracts,modules:selected,ports:[...ports.values()],nativeSha256:sha(native)}
const out=path.join(repo,'src/tools/GetTaskTool')
for(const [name,content] of [['externalNative.js',native],['externalProvenance.json',JSON.stringify(provenance,null,2)+'\n']]) {
 const target=path.join(out,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==content)throw Error('Stale '+target)}
 else {fs.mkdirSync(out,{recursive:true});fs.writeFileSync(target,content)}
}
console.log(JSON.stringify({modules:selected.length,rows:selected.reduce((n,m)=>n+m.rows.length,0),ports:[...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))],nativeSha256:sha(native)}))
