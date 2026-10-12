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
const roots={declarePerTaskStopAffordance:['chunk-bn3p37gv.js','LZr'],pauseAutoReact:['chunk-45c66d1k.js','Lae'],discardArtifactActivity:['chunk-ebwzk0dw.js','zae'],emitStopReceipt:['chunk-ebwzk0dw.js','r6'],prepareStop:['chunk-xapeakym.js','Qs'],discardTurn:['chunk-xapeakym.js','Gu'],perTaskStop:['chunk-bn3p37gv.js','S3t'],ParkedPermission:['chunk-xapeakym.js','Cm'],keepAlive:['chunk-xapeakym.js','Ws'],disposeBudget:['chunk-xapeakym.js','Oo'],normalInterrupt:['chunk-xapeakym.js','$e'],available:['chunk-evbqn32b.js','qS']}
const declaredCuts={
 'chunk-n25r032v.js:X':'artifactState',
 'chunk-xapeakym.js:Ky':'interruptTurn','chunk-xapeakym.js:km':'cancelQueue','chunk-xapeakym.js:KZe':'isSendNow','chunk-xapeakym.js:$y':'sendNow',
 'chunk-ebwzk0dw.js:KQt':'requeueSurvivors',
 'chunk-nankzm0s.js:rr':'taskSession',
 'chunk-bn3p37gv.js:U':'executionContext','chunk-bn3p37gv.js:n':'executionContext','chunk-bn3p37gv.js:c':'legacyContext',
 'chunk-q80zaav8.js:t':'debug','chunk-amhtwhch.js:d':'logError',
 'chunk-6hnyhakg.js:i':'analytics','chunk-9d2ykxmy.js:i':'analytics',
 'chunk-ebwzk0dw.js:v':'cancelHandoffs',
 'chunk-n25r032v.js:a':'artifactSlot',
 'chunk-fbt60b3p.js:sSe':'qualifiedPushNotice',
 'chunk-w7hy7pqe.js:nx':'removeKeepalive',
 'chunk-w7hy7pqe.js:Gm':'registry',
 'chunk-ebwzk0dw.js:Ii':'terminalEvent',
 'chunk-mphp7acd.js:KS':'detachedSlot',
 'chunk-45c66d1k.js:Ge':'mainAgentId',
 'chunk-h7xaj2fc.js:ne':'diagnostic',
 'chunk-64z3xwk8.js:vie':'permissionResultSchema',
'chunk-xapeakym.js:ff':'remoteInit',
 'chunk-mphp7acd.js:Mi':'enqueueNotification','chunk-mphp7acd.js:Aw':'removeQueueByFilter',
 'chunk-8f02nerv.js:Uae':'persistAutoReactLedger','chunk-8f02nerv.js:oQt':'disarmDurableAutoReact','chunk-8f02nerv.js:oxt':'persistStoppedSlug',
 'chunk-45c66d1k.js:Xi':'retireLiveSupervisor','chunk-45c66d1k.js:Er':'findLiveSupervisor',
 'chunk-vnjpgehp.js:kLn':'clearWatchLaunchFlag',
 'chunk-mbfze585.js:a':'environment','chunk-nankzm0s.js:k':'feature',
 'chunk-djhbc0y7.js:Gee':'stopBackgroundAgents','chunk-djhbc0y7.js:_Tt':'stopForegroundAgents',
 'chunk-xapeakym.js:gl':'budgetSweep',
 'chunk-xapeakym.js:Ai':'shuttingDown','chunk-xep95vq1.js:Dr':'terminalShutdown',
 'chunk-q80zaav8.js:_t':'onExit',
 'chunk-nankzm0s.js:oe':'configOwner','chunk-nankzm0s.js:le':'getGlobalConfig','chunk-nankzm0s.js:Ae':'saveGlobalConfig',
}
const localPorts={v:'getAppState',R:'setAppState',I:'options',r:'io',qe:'drain',e:'execution',Q:'messageQueue',On:'suggestions',Yt:'parkedPermissionRetirement',dt:'prewaitLatch',yo:'frameIntake',si:'inputDelivery',Ze:'respond'}



const modules = new Map(), ports = new Map(), methodSlices=new WeakMap()
function bindingNames(node) {
 if(ts.isIdentifier(node))return [node.text];
 return node.elements.flatMap(e=>ts.isOmittedExpression(e)?[]:bindingNames(e.name));
}
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
    for (const node of ts.isVariableStatement(statement) ? statement.declarationList.declarations : [statement]) if (node.name) for(const name of bindingNames(node.name))declarations.set(name,node)
    if (ts.isImportDeclaration(statement) && statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) for (const item of statement.importClause.namedBindings.elements) imports.set(item.name.text, {file:path.basename(statement.moduleSpecifier.text), specifier:statement.moduleSpecifier.text, name:(item.propertyName??item.name).text})
    if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) for (const item of statement.exportClause.elements) exports.set(item.name.text, (item.propertyName??item.name).text)
  }
  if(file==='chunk-xapeakym.js'){
    const starts={'$e':455326,Qs:379168,Gu:453573,Fa:378445,Oo:378393,Ws:378958,Wn:378390,Xr:378284};
    function select(n){if(ts.isVariableDeclaration(n)&&n.name&&starts[n.name.getText(ast)]===n.getStart(ast))declarations.set(n.name.getText(ast),n);ts.forEachChild(n,select)}select(ast)
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
  if(methodSlices.has(node)){const slice=methodSlices.get(node),source=node.getText();return {file:m.file,name,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,...slice,source,emittedSource:source,sha256:sha(source),variable:false,syntheticWrapper:true}}
  const source = node.getText(m.ast)
  const emittedSource=source
  return {emittedSource,file:m.file,name,start:node.getStart(m.ast),end:node.end,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,sha256:sha(source),source,variable:ts.isVariableDeclaration(node)}
}
const cuts={}
for(const [key,port]of Object.entries(declaredCuts)){const colon=key.indexOf(':');const origin=resolve(load(key.slice(0,colon)),key.slice(colon+1));cuts[origin.m.file+':'+origin.name]=port}
const globals = new Set(['AbortSignal','SuppressedError','console','DOMException','AbortController','WeakRef','SharedArrayBuffer','URL','undefined','Error','TypeError','String','Number','Boolean','Object','Array','Map','Set','WeakMap','WeakSet','Promise','Date','Math','JSON','RegExp','Symbol','Infinity','NaN','Reflect','parseInt','parseFloat','isNaN','isFinite','Buffer','Uint8Array','Uint16Array','Uint32Array','Int8Array','Int16Array','Int32Array','ArrayBuffer','DataView','Float64Array','performance','setTimeout','clearTimeout','setInterval','clearInterval','queueMicrotask','TextDecoder','TextEncoder','globalThis','global','self','Function','AggregateError'])
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
  if(m.file==='chunk-xapeakym.js'&&localPorts[name]){m.bindings.set(name,{port:localPorts[name],local:true});return}
  if(name==='process') {m.bindings.set(name,{port:'process'});return}
  const imp=m.imports.get(name);
  if(imp && !imp.file.startsWith('chunk-')) {
    m.bindings.set(name,{builtin:imp.specifier,name:imp.name});return;
  }
  const origin=resolve(m,name),identity=origin.m.file+':'+origin.name
  if(cuts[identity]) {
    m.bindings.set(name,{port:cuts[identity],identity})
    ports.set(identity,{port:cuts[identity],...proof(origin.m,origin.node,origin.name)})
    return
  }
  if(origin.m!==m) {bind(origin.m,origin.name);m.bindings.set(name,{file:origin.m.file,name:origin.name});return}
  const row=proof(m,origin.node,name);m.selected.set(name,row)
  for(const ref of dependencies((row.variable?'var ':'')+row.emittedSource+';')) {
    try {bind(m,ref)} catch(error){error.message+='\nvia '+identity;throw error}
  }
}

const mainModule=load('chunk-xapeakym.js'),suggestionClass=mainModule.declarations.get('Zh')
const discardMethod=suggestionClass?.members.find(n=>ts.isMethodDeclaration(n)&&n.name.getText(mainModule.ast)==='discard')
if(!discardMethod?.body)throw Error('Missing original Zh.discard')
const wrapper=ts.createSourceFile('discard-method.js','function discardSuggestion287'+discardMethod.getText(mainModule.ast).slice('discard'.length),99,true,ts.ScriptKind.JS).statements[0]
methodSlices.set(wrapper,{start:discardMethod.getStart(mainModule.ast),end:discardMethod.end,originalMethod:discardMethod.getText(mainModule.ast)})
mainModule.declarations.set('discardSuggestion287',wrapper)
roots.discardSuggestion=['chunk-xapeakym.js','discardSuggestion287']
for(const [api,[file,name]]of Object.entries(roots)){const o=resolve(load(file),name);roots[api]=[o.m.file,o.name];bind(o.m,o.name)}
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
  return {file,moduleSha256:m.entry.sha256,moduleLength:m.entry.length,rows:[...new Map([...m.selected.values()].map(r=>[r.start,r])).values()].sort((a,b)=>a.start-b.start),bindings:Object.fromEntries(m.bindings),initializers:m.initializers.sort((a,b)=>a.start-b.start)}
})

const index=new Map(ordered.map((file,i)=>[file,i]));let result=[]
const builtins=[...new Set(selected.flatMap(m=>Object.values(m.bindings).filter(b=>b.builtin).map(b=>b.builtin)))],libIndex=new Map(builtins.map((s,i)=>[s,i]))
for(const spec of builtins)result.push(`import * as lib${libIndex.get(spec)} from ${JSON.stringify(spec)};`)
for(const m of selected){let text=`function module${index.get(m.file)}(imports){\n`;for(const[name,b]of Object.entries(m.bindings)){if(b.builtin)text+=`const ${name}=lib${libIndex.get(b.builtin)}[${JSON.stringify(b.name)}];\n`;else text+=`const ${name}=imports[${JSON.stringify(name)}];\n`}text+=[...m.rows,...m.initializers].sort((a,b)=>a.start-b.start).map(r=>(r.variable?'var ':'')+r.emittedSource+';').join('\n')+'\n';text+='return {'+[...load(m.file).selected.keys()].join(',')+'};\n}';result.push(text)}
result.push('export function createPrintInterruptSweepNative287(ports){')
for(const m of selected){const b=Object.entries(m.bindings).filter(([,b])=>!b.builtin).map(([name,b])=>JSON.stringify(name)+':'+(b.port?'ports['+JSON.stringify(b.port)+']':`m${index.get(b.file)}[${JSON.stringify(b.name)}]`)).join(',');result.push(`const m${index.get(m.file)}=module${index.get(m.file)}({${b}});`)}
result.push('return {'+Object.entries(roots).map(([api,[file,name]])=>JSON.stringify(api)+':'+`m${index.get(file)}[${JSON.stringify(name)}]`).join(',')+'};\n}')
const callerProofs=[]
function findInterruptCaller(node){
 if(ts.isVariableDeclaration(node)&&node.name.getText(load('chunk-xapeakym.js').ast)==='$e'&&node.initializer&&ts.isArrowFunction(node.initializer)&&node.initializer.getText(load('chunk-xapeakym.js').ast).includes('cancelQueued:nt.cancel_queued===!0'))callerProofs.push(proof(load('chunk-xapeakym.js'),node,'interruptCaller'))
 if(ts.isVariableDeclaration(node)&&node.name.getText(load('chunk-xapeakym.js').ast)==='Bs'&&node.initializer?.getText(load('chunk-xapeakym.js').ast).startsWith('{mode:"prompt",agentId:Ge(),value:ad,'))callerProofs.push(proof(load('chunk-xapeakym.js'),node,'stdinCommand'))
 if(ts.isClassDeclaration(node)&&['Fc','_l'].includes(node.name?.text))callerProofs.push(proof(load('chunk-xapeakym.js'),node,node.name.text))
 ts.forEachChild(node,findInterruptCaller)
}
findInterruptCaller(load('chunk-xapeakym.js').ast)
if(callerProofs.filter(row=>row.name==='interruptCaller').length!==1||callerProofs.filter(row=>row.name==='stdinCommand').length!==1)throw Error('Original interrupt/stdin caller proof is not unique')
const provenance={version:'2.1.287',platform:'darwin-arm64',binarySha256:manifest.binarySha256,manifestSha256:manifestPin,roots,modules:selected,ports:[...ports.values()],builtins,callerProofs}
const outputs={'interruptSweepNative.js':result.join('\n')+'\n','interruptSweepProvenance.json':JSON.stringify(provenance,null,2)+'\n'}
for(const[name,text]of Object.entries(outputs)){const dest=path.join(import.meta.dirname,name);if(process.argv.includes('--check')){if(!fs.existsSync(dest)||fs.readFileSync(dest,'utf8')!==text)throw Error('Print control runtime generator mismatch '+name)}else fs.writeFileSync(dest,text)}
console.log('Print control runtime '+(process.argv.includes('--check')?'check':'generated')+': '+selected.reduce((n,m)=>n+m.rows.length,0)+' declarations, '+selected.length+' modules, '+ports.size+' source ports')
