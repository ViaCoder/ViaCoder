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
 initialize:['chunk-xapeakym.js','initializePrintTaskLaunch287'],
 singleShot:['chunk-bn3p37gv.js','zfe'],markInputClosed:['chunk-bn3p37gv.js','Aeo'],inputClosed:['chunk-bn3p37gv.js','k3t'],
}
const cuts = {'chunk-bn3p37gv.js:n':'executionContext'}
let producerSlice
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
  if(producerSlice?.node===node)return {file:m.file,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,name,start:producerSlice.start,end:producerSlice.end,source:producerSlice.source,sha256:sha(producerSlice.source),variable:false,syntheticWrapper:true,originalBody:producerSlice.body};
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
// Keep the exact original streaming classification and Ceo call. The other
// adjacent Eeo/Leo producers belong to the controller's launch bridge scope.
const print=load('chunk-xapeakym.js'),run=print.declarations.get('Kme')
if(!run||!ts.isFunctionDeclaration(run)||!run.body)throw Error('Missing original public runHeadless')
const statements=run.body.statements
const producerIndex=statements.findIndex(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(print.ast)==='de'))
if(producerIndex<0)throw Error('Missing original print input classifier')
const classifier=statements[producerIndex],sequence=statements[producerIndex+1]
if(!ts.isExpressionStatement(sequence))throw Error('Missing original launch sequence')
let call
function findCeo(node){if(ts.isCallExpression(node)&&node.expression.getText(print.ast)==='Ceo'){if(call)throw Error('Ambiguous print Ceo');call=node}ts.forEachChild(node,findCeo)}
findCeo(sequence);if(!call)throw Error('Missing original Ceo producer')
const body=classifier.getText(print.ast)+'\n'+call.getText(print.ast)+';'
const wrapper='function initializePrintTaskLaunch287(r,R){'+body+'}'
const wrapperAst=ts.createSourceFile('owned-wrapper.js',wrapper,99,true,ts.ScriptKind.JS)
producerSlice={node:wrapperAst.statements[0],start:classifier.getStart(print.ast),end:sequence.getEnd(),source:wrapper,body}
print.declarations.set('initializePrintTaskLaunch287',producerSlice.node)
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
const runtime=`// Pinned 2.1.287 print singleShot/inputClosed source producer slice and full helper closure. Host owners are explicit ports.
${selected.map((m,i)=>`function module${i}(imports){
${Object.keys(m.bindings).map(name=>`const ${name}=imports[${JSON.stringify(name)}];`).join('\n')}
${[...m.rows,...m.initializers].sort((a,b)=>a.start-b.start).map(row=>(row.variable?'var ':'')+row.source+';').join('\n')}
return {${m.rows.map(row=>row.name).join(',')}};
}`).join('\n')}
export function createPrintTaskLaunchNative287(ports){
for(const name of ${JSON.stringify([...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))].sort())})if(ports[name]===undefined)throw Error('Missing task registration host port: '+name);
${selected.map((m,i)=>`const m${i}=module${i}({${Object.entries(m.bindings).map(([name,b])=>JSON.stringify(name)+':'+(b.port?`ports[${JSON.stringify(b.port)}]`:`m${index.get(b.file)}[${JSON.stringify(b.name)}]`)).join(',')}});`).join('\n')}
return {${Object.entries(roots).map(([api,[file,name]])=>api+':m'+index.get(file)+'['+JSON.stringify(name)+']').join(',')}};
}
`
const native=ts.transpileModule(runtime,{compilerOptions:{allowJs:true,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,removeComments:false}}).outputText

function contract(file,name) {const r=resolve(load(file),name);return proof(r.m,r.node,r.name)}
function closedConsumer() {
 let call,barrier
 function visit(node){
  if(ts.isCallExpression(node)&&node.expression.getText(print.ast)==='Aeo'){
   if(call)throw Error('Ambiguous original print closed marker');call=node
   let parent=node.parent
   while(parent){if(ts.isCallExpression(parent)&&ts.isPropertyAccessExpression(parent.expression)&&parent.expression.name.text==='closeInput'){barrier=parent;break}parent=parent.parent}
  }
  ts.forEachChild(node,visit)
 }
 visit(print.ast);if(!call||!barrier)throw Error('Original Aeo closeInput barrier missing')
 return {marker:proof(print,call,'AeoCall'),barrier:proof(print,barrier,'closeInput')}
}
const strictStaticAudit=[]
for(const row of manifest.modules.filter(row=>row.path==='cli'||/^chunk-.*\.js$/.test(row.path))){
 const bytes=fs.readFileSync(path.join(corpus,'raw',row.path))
 if(bytes.length!==row.length||sha(bytes)!==row.sha256)throw Error('Unpinned audit module '+row.path)
 const ast=ts.createSourceFile(row.path,new TextDecoder('utf8',{fatal:true}).decode(bytes),99,true,ts.ScriptKind.JS)
 if(!Array.isArray(ast.parseDiagnostics)||ast.parseDiagnostics.length)throw Error('Invalid static audit AST '+row.path)
 function visit(node){
  if(ts.isIdentifier(node)&&node.text==='replaceStrictToolResultPairing'||ts.isStringLiteral(node)&&node.text==='replaceStrictToolResultPairing'){
   const parent=node.parent
   strictStaticAudit.push({file:row.path,moduleSha256:row.sha256,start:node.getStart(ast),end:node.getEnd(),kind:ts.SyntaxKind[parent.kind],source:parent.getText(ast)})
  }
  ts.forEachChild(node,visit)
 }
 visit(ast)
}
const closed=closedConsumer()
const entry=load('chunk-q1842b1c.js')
let headlessImport,headlessCall,headlessExport
function entryVisit(node){
 if(ts.isVariableDeclaration(node)&&ts.isObjectBindingPattern(node.name)&&node.name.elements.some(e=>e.propertyName?.getText(entry.ast)==='runHeadless'&&e.name.getText(entry.ast)==='Ko')){
  if(headlessImport)throw Error('Ambiguous public print import');headlessImport=node
 }
 if(ts.isCallExpression(node)&&node.expression.getText(entry.ast)==='Ko'&&node.arguments[0]?.getText(entry.ast)==='Ve'&&node.arguments[1]?.getText(entry.ast)==='Be'){
  if(headlessCall)throw Error('Ambiguous public print caller');headlessCall=node
 }
 ts.forEachChild(node,entryVisit)
}
entryVisit(entry.ast)
for(const statement of print.ast.statements)if(ts.isExportDeclaration(statement)&&statement.exportClause&&ts.isNamedExports(statement.exportClause))for(const specifier of statement.exportClause.elements)if(specifier.name.text==='runHeadless'&&specifier.propertyName?.text==='Kme')headlessExport=specifier
if(!headlessImport||!headlessCall||!headlessExport)throw Error('Missing actual public print entry chain')
const sourceContracts={
 owner:contract('chunk-bn3p37gv.js','je'),setter:contract('chunk-bn3p37gv.js','Ceo'),policy:contract('chunk-bn3p37gv.js','veo'),reader:contract('chunk-bn3p37gv.js','zfe'),
 closedSetter:contract('chunk-bn3p37gv.js','Aeo'),closedReader:contract('chunk-bn3p37gv.js','k3t'),strictReader:contract('chunk-bn3p37gv.js','P3t'),
 classifier:proof(print,classifier,'printInputClassifier'),launchSequence:proof(print,sequence,'printLaunchSequence'),singleShotCall:proof(print,call,'CeoCall'),
 closedMarker:closed.marker,closeInputBarrier:closed.barrier,
 publicExport:proof(print,headlessExport,'runHeadlessExport'),publicImport:proof(entry,headlessImport,'runHeadlessImport'),publicCaller:proof(entry,headlessCall,'runHeadlessCall'),
}
const strictStaticAuditScope={moduleCount:manifest.modules.filter(row=>row.path==='cli'||/^chunk-.*\.js$/.test(row.path)).length,method:'Pinned AST Identifier/StringLiteral member-name references; no claim about dynamically constructed property names or unpublished code'}
const provenance={version:manifest.version,platform:manifest.platform,manifestSha256:manifestPin,offsetUnit:'UTF-16 code units',roots,sourceContracts,strictStaticAuditScope,strictStaticAudit,modules:selected,ports:[...ports.values()],nativeSha256:sha(native)}
const out=path.join(repo,'src/tools/GetTaskTool')
for(const [name,content] of [['printLaunchNative.js',native],['printLaunchProvenance.json',JSON.stringify(provenance,null,2)+'\n']]) {
 const target=path.join(out,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==content)throw Error('Stale '+target)}
 else {fs.mkdirSync(out,{recursive:true});fs.writeFileSync(target,content)}
}
console.log(JSON.stringify({modules:selected.length,rows:selected.reduce((n,m)=>n+m.rows.length,0),ports:[...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))],nativeSha256:sha(native)}))
