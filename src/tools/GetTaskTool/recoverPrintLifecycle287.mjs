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
 DispatchIntake:['chunk-xapeakym.js','Fc'],
 queuedTurnCount:['chunk-mphp7acd.js','YPo'],
 ResultController:['chunk-xapeakym.js','Jc'],
 refreshHeldResultTotals:['chunk-xep95vq1.js','B6t'],
 markTaskUserStopped:['chunk-djhbc0y7.js','zee'],
 CloseController:['chunk-xapeakym.js','kc'],Parker:['chunk-xapeakym.js','Tc'],Drain:['chunk-xapeakym.js','hc'],
 admissionSlot:['chunk-mphp7acd.js','JO'],detachedSlot:['chunk-mphp7acd.js','KS'],
 windDown:['chunk-xapeakym.js','ih'],policy:['chunk-xapeakym.js','sh'],
 createEnvironment:['chunk-mbfze585.js','ZZe'],ceilingSchema:['chunk-mbfze585.js','Hi'],reportRunningSchema:['chunk-mbfze585.js','SE'],remoteSchema:['chunk-mbfze585.js','qp'],
 pulse:['chunk-xapeakym.js','Pp'],
 stopForegroundAgents:['chunk-djhbc0y7.js','_Tt'],budgetSweep:['chunk-xapeakym.js','gl'],admit:['chunk-mphp7acd.js','j_'],stopBackgroundAgents:['chunk-djhbc0y7.js','Gee'],
 inboxSlot:['chunk-1mntk59q.js','Bvr'],
 decideStashedAnswer:['chunk-xapeakym.js','decideStashedAnswer287'],
 installMainLoopLiveness:['chunk-xapeakym.js','installMainLoopLiveness287'],
}
const declaredCuts = {
 'chunk-mphp7acd.js:Ku':'isMainThreadAgent',
 'chunk-bn3p37gv.js:U':'executionContext',
 'chunk-xapeakym.js:Pa':'revokeCodeliveredFollowups',
 'chunk-mphp7acd.js:Nu':'flushSessionStorage',
 'chunk-mphp7acd.js:JO':'admissionSlot287','chunk-mphp7acd.js:j_':'admit287',
 'chunk-q80zaav8.js:t':'debug','chunk-amhtwhch.js:d':'logError','chunk-amhtwhch.js:Z':'toError',
 'chunk-64z3xwk8.js:ne':'diagnostic',
 'chunk-mphp7acd.js:_N':'killShell','chunk-mphp7acd.js:xA':'killObserver',
 'chunk-nankzm0s.js:Ii':'terminalEvent','chunk-9d2ykxmy.js:i':'analytics',
 'chunk-xapeakym.js:PP':'stopTask',
 'chunk-djhbc0y7.js:Uze':'taskImplementation','chunk-djhbc0y7.js:Qr':'persistAgentStop',
 'chunk-mphp7acd.js:Sdt':'dequeueForAgent',
 'chunk-35ny7gy3.js:que':'inboxRunPressure',
 'chunk-w7hy7pqe.js:Gm':'registry','chunk-hne3gr68.js:Dkt':'reportRecap',
 'chunk-mbfze585.js:a':'environment','chunk-mphp7acd.js:zle':'totalCost',
 'chunk-bn3p37gv.js:XQr':'teardownUnwindRequested','chunk-bn3p37gv.js:Ai':'shuttingDown',
 'chunk-mphp7acd.js:Ai':'shuttingDown',
 'chunk-mphp7acd.js:Ge':'mainAgentId','chunk-mphp7acd.js:k':'feature',
 'chunk-4s38z9x2.js:wKt':'bindCallback',
}
const modules = new Map(), ports = new Map()
const methodSlices=new Map()
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
  if(methodSlices.has(node))return {file:m.file,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,name,...methodSlices.get(node),source:node.getText(),sha256:sha(node.getText()),variable:false,syntheticWrapper:true}
  const source = node.getText(m.ast)
  return {file:m.file,name,start:node.getStart(m.ast),end:node.end,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,sha256:sha(source),source,variable:ts.isVariableDeclaration(node)}
}
const cuts={}
for(const [key,port]of Object.entries(declaredCuts)){const colon=key.indexOf(':');const origin=resolve(load(key.slice(0,colon)),key.slice(colon+1));cuts[origin.m.file+':'+origin.name]=port}
const globals = new Set(['undefined','Error','TypeError','String','Number','Boolean','Object','Array','Map','Set','WeakMap','WeakSet','Promise','Date','Math','JSON','RegExp','Symbol','Infinity','NaN','Reflect','parseInt','parseFloat','isNaN','isFinite','Buffer','Uint8Array','Uint16Array','Uint32Array','Int8Array','Int16Array','Int32Array','ArrayBuffer','DataView','Float64Array','performance','setTimeout','clearTimeout','setInterval','clearInterval','queueMicrotask','TextDecoder','TextEncoder','globalThis','global','self','Function','AggregateError'])
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
    const port={'crypto:randomUUID':'randomUUID'}[imp.file+':'+imp.name];
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
const mainModule=load('chunk-xapeakym.js'),stashedClass=mainModule.declarations.get('Cm')
const stashedMethod=stashedClass?.members.find(node=>ts.isMethodDeclaration(node)&&node.name.getText(mainModule.ast)==='decideStashedAnswer')
if(!stashedMethod?.body)throw Error('Missing original stashed-answer method')
const methodBody=stashedMethod.body.getText(mainModule.ast)
const wrapper=ts.createSourceFile('owned-method-wrapper.js','function decideStashedAnswer287()'+methodBody,99,true,ts.ScriptKind.JS).statements[0]
methodSlices.set(wrapper,{start:stashedMethod.getStart(mainModule.ast),end:stashedMethod.end,originalMethod:stashedMethod.getText(mainModule.ast),originalBody:methodBody})
mainModule.declarations.set('decideStashedAnswer287',wrapper)
// Preserve both complete original hI expressions; only their lexical host
// bindings become explicit arguments. The notification waits stay caller-owned.
let idleGate, livenessRegistration
function findLiveness(node){
 if(ts.isVariableDeclaration(node)&&node.name.getText(mainModule.ast)==='Ya'&&node.initializer?.getText(mainModule.ast).includes('Yt.inheritedPromptOwnsWorkerStatus()'))idleGate=node
 if(ts.isExpressionStatement(node)&&node.getText(mainModule.ast).startsWith('r.setMainLoopLiveness('))livenessRegistration=node
 ts.forEachChild(node,findLiveness)
}
findLiveness(mainModule.ast)
if(!idleGate||!livenessRegistration)throw Error('Missing original hI liveness caller')
const livenessWrapper=ts.createSourceFile('liveness-host-wrapper.js',`function installMainLoopLiveness287({Yt,v,gs,r,qe}){var ${idleGate.getText(mainModule.ast)};${livenessRegistration.getText(mainModule.ast)};return Ya}`,99,true,ts.ScriptKind.JS).statements[0]
methodSlices.set(livenessWrapper,{start:idleGate.getStart(mainModule.ast),end:livenessRegistration.end,originalParts:[proof(mainModule,idleGate,'Ya'),proof(mainModule,livenessRegistration,'setMainLoopLiveness')]})
mainModule.declarations.set('installMainLoopLiveness287',livenessWrapper)
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
    // io installs outward export getters; unselected export objects are not
    // part of this closed set of directly returned declarations.
    if(ts.isCallExpression(statement.expression)&&statement.expression.expression.getText(m.ast)==='io'&&statement.expression.arguments[0]&&!m.selected.has(statement.expression.arguments[0].getText(m.ast)))continue
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
const runtime=`// Complete pinned 2.1.287 print controller/scheduler closure. Host leaves are explicit ports.
${selected.map((m,i)=>`function module${i}(imports){
${Object.keys(m.bindings).map(name=>`const ${name}=imports[${JSON.stringify(name)}];`).join('\n')}
${[...m.rows,...m.initializers].sort((a,b)=>a.start-b.start).map(row=>(row.variable?'var ':'')+row.source+';').join('\n')}
return {${m.rows.map(row=>row.name).join(',')}};
}`).join('\n')}
export function createPrintLifecycleNative287(ports){
for(const name of ${JSON.stringify([...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))].sort())})if(ports[name]===undefined)throw Error('Missing print lifecycle host port: '+name);
${selected.map((m,i)=>`const m${i}=module${i}({${Object.entries(m.bindings).map(([name,b])=>JSON.stringify(name)+':'+(b.port?`ports[${JSON.stringify(b.port)}]`:`m${index.get(b.file)}[${JSON.stringify(b.name)}]`)).join(',')}});`).join('\n')}
return {${Object.entries(roots).map(([api,[file,name]])=>api+':'+(cuts[file+':'+name]?'ports['+JSON.stringify(cuts[file+':'+name])+']':'m'+index.get(file)+'['+JSON.stringify(name)+']')).join(',')}};
}
`
const native=ts.transpileModule(runtime,{compilerOptions:{allowJs:true,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,removeComments:false}}).outputText

function contract(file,name) {const r=resolve(load(file),name);return proof(r.m,r.node,r.name)}
const print=load('chunk-xapeakym.js'),closures={}
function nested(node){if((ts.isFunctionDeclaration(node)||ts.isVariableDeclaration(node))&&node.name&&['Df','Af','el','yo'].includes(node.name.getText(print.ast))){const text=node.getText(print.ast);if(text.includes('dh(')||text.includes('new Lc(')||text.includes('new kc(')||text.includes('teardown-now'))closures[node.name.getText(print.ast)]=proof(print,node,node.name.getText(print.ast))}
  if(ts.isVariableDeclaration(node)&&node.name.getText(print.ast)==='Bu'&&node.initializer?.getText(print.ast).startsWith('new Jc('))closures.resultConstruction=proof(print,node,'Bu')
  if(ts.isPropertyAssignment(node)&&['onResult','releaseHeld','holdsResults'].includes(node.name.getText(print.ast))&&/Bu\.(route|release|holdsResults)\(/.test(node.initializer.getText(print.ast)))closures['resultCaller-'+node.name.getText(print.ast)]=proof(print,node,node.name.getText(print.ast))
  ts.forEachChild(node,nested)}
nested(print.ast)
const sourceContracts={...closures,dispatchLoop:contract('chunk-xapeakym.js','Lc'),turnResultCaller:contract('chunk-xapeakym.js','lm'),inputMapping:contract('chunk-xapeakym.js','by'),close:contract('chunk-xapeakym.js','uh'),closeGate:contract('chunk-xapeakym.js','dh'),budget:contract('chunk-xapeakym.js','gl')}
const provenance={version:manifest.version,platform:manifest.platform,manifestSha256:manifestPin,offsetUnit:'UTF-16 code units',roots,sourceContracts,modules:selected,ports:[...ports.values()],nativeSha256:sha(native)}
const out=path.join(repo,'src/tools/GetTaskTool')
for(const [name,content] of [['printLifecycleNative.js',native],['printLifecycleProvenance.json',JSON.stringify(provenance,null,2)+'\n']]) {
 const target=path.join(out,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==content)throw Error('Stale '+target)}
 else {fs.mkdirSync(out,{recursive:true});fs.writeFileSync(target,content)}
}
console.log(JSON.stringify({modules:selected.length,rows:selected.reduce((n,m)=>n+m.rows.length,0),ports:[...new Set(selected.flatMap(m=>Object.values(m.bindings).flatMap(b=>b.port?[b.port]:[])))],nativeSha256:sha(native)}))
