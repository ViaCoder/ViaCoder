import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {createRequire} from 'node:module';const ts=createRequire(new URL('../../../package.json',import.meta.url))('typescript');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const repo=path.resolve(new URL('../../..',import.meta.url).pathname);process.chdir(repo);
const corpus=path.resolve('../.work/official-modules-2.1.287/darwin-arm64'),manifestBytes=fs.readFileSync(corpus+'/manifest.json');if(sha(manifestBytes)!=='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5')throw Error('manifest');const manifest=JSON.parse(manifestBytes);
const sharedProof=JSON.parse(fs.readFileSync('src/utils/plugins/officialHooksLifecycle287/provenance.json','utf8'));
const cuts=Object.fromEntries(sharedProof.modules.flatMap(m=>m.rows.filter(r=>!r.statement).flatMap(r=>(r.names??[r.name]).map(name=>[m.file+':'+name,'source:'+m.file+':'+name]))));
// Thin-client admission is identity-based. Adopt the canonical registration,
// set and full predicate together, including snapshots emitted before these
// declarations were installed in sharedProof; never reconstruct another set.
for(const name of ['nYo','fBe','jzn','PHr'])cuts['chunk-mphp7acd.js:'+name]='source:chunk-mphp7acd.js:'+name;
// Adopt canonical application bindings as well as selected declarations.
// Omitting these would reconstruct config/OAuth/runtime cells behind the class.
for(const m of sharedProof.modules)for(const binding of Object.values(m.bindings??{}))if(binding.port&&binding.origin?.file&&binding.origin?.name)cuts[binding.origin.file+':'+binding.origin.name]='sharedPort:'+binding.port;
const outsideProof=JSON.parse(fs.readFileSync('src/utils/hooks/officialHooksOutside287/provenance.json','utf8'));
for(const m of outsideProof.modules)for(const row of m.rows??[])for(const name of row.names??[row.name])if(name&&!row.statement&&!cuts[m.file+':'+name])cuts[m.file+':'+name]='outside:'+m.file+':'+name;

const resumeProof=JSON.parse(fs.readFileSync('src/utils/officialResumeController287/provenance.json','utf8'));
for(const m of resumeProof.modules)for(const row of m.rows??[])for(const name of row.exportNames??[row.name])if(name&&!row.statement&&!cuts[m.file+':'+name])cuts[m.file+':'+name]='resume:'+m.file+':'+name;
const restoreProof=JSON.parse(fs.readFileSync('src/utils/officialSessionRestore287/provenance.json','utf8'));
for(const row of restoreProof.rows)if(!cuts[row.file+':'+row.name])cuts[row.file+':'+row.name]='restore:'+row.file+':'+row.name;
const switchProof=JSON.parse(fs.readFileSync('src/utils/hooks/modelSwitch287/provenance.json','utf8'));
for(const name of switchProof.groups.flow.roots)cuts[switchProof.groups.flow.module+':'+name]='modelSwitch:'+switchProof.groups.flow.module+':'+name;

// Canonical supplemental modules are merged into existing namespaces, not new owners.
for(const file of ['controlFilesProof287.json','controlGenericProof287.json']){
 const p=JSON.parse(fs.readFileSync('src/utils/plugins/officialHooksLifecycle287/'+file,'utf8'));
 for(const m of p.modules)for(const r of m.rows)for(const n of r.names??r.exportNames??[r.name])if(n&&!r.statement&&!cuts[m.file+':'+n])cuts[m.file+':'+n]='source:'+m.file+':'+n;
 for(const m of p.modules)for(const [n,b]of Object.entries(m.bindings??{}))if(b.port&&b.origin?.file&&b.origin?.name&&!cuts[b.origin.file+':'+b.origin.name])cuts[b.origin.file+':'+b.origin.name]='sharedPort:'+b.port;
}
const hotProof=JSON.parse(fs.readFileSync('src/utils/hotSessionController287/closure/provenance.json','utf8'));
for(const m of hotProof.modules)for(const r of m.rows)for(const n of r.exportNames??[r.name])if(n&&!cuts[m.file+':'+n])cuts[m.file+':'+n]='hot:'+m.file+':'+n;
// Existing hot ABI ports are reused verbatim, including execution owners.
for(const p of hotProof.ports)if(p.file&&p.name&&!cuts[p.file+':'+p.name])cuts[p.file+':'+p.name]=p.port;
for(const [f,n]of [['chunk-2ynta9xc.js','nn'],['chunk-09m4fzsj.js','pDo']])cuts[f+':'+n]='requiredOwner:'+f+':'+n;
for(const n of ['Ii'])delete cuts['chunk-q1842b1c.js:'+n];
for(const n of ['pHr','Rzn','zln','F4o'])delete cuts['chunk-mphp7acd.js:'+n];
function names(node){return ts.isIdentifier(node)?[node.text]:node.elements.flatMap(element=>element.name?names(element.name):[])}
const modules = new Map(), ports = new Map()
function load(file) {
  if (modules.has(file)) return modules.get(file)
  const entry = manifest.modules.find(row => row.path === file)
  if (!entry) throw Error('Module outside corpus: ' + file)
  const bytes = fs.readFileSync(path.join(corpus, 'raw', file))
  if (sha(bytes) !== entry.sha256 || bytes.length !== entry.length) throw Error('Invalid raw hash: ' + file)
  const ast = ts.createSourceFile(file, new TextDecoder('utf8', {fatal: true}).decode(bytes), 99, true, ts.ScriptKind.JS)
  if (ast.parseDiagnostics.length) throw Error('Invalid raw AST: ' + file)
  const declarations = new Map(), imports = new Map(), exports = new Map()
  for (const statement of ast.statements) {
    for (const node of ts.isVariableStatement(statement) ? statement.declarationList.declarations : [statement]) if (node.name) for(const name of names(node.name)) declarations.set(name,node)
    if(ts.isImportDeclaration(statement)&&statement.importClause?.name)imports.set(statement.importClause.name.text,{file:statement.moduleSpecifier.text,name:'default'});
    if(ts.isImportDeclaration(statement)&&statement.importClause?.namedBindings&&ts.isNamespaceImport(statement.importClause.namedBindings))imports.set(statement.importClause.namedBindings.name.text,{file:statement.moduleSpecifier.text,name:'*'});
    if (ts.isImportDeclaration(statement) && statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) for (const b of statement.importClause.namedBindings.elements) imports.set(b.name.text, {file:statement.moduleSpecifier.text.startsWith('/$bunfs/')?path.basename(statement.moduleSpecifier.text):statement.moduleSpecifier.text, name: (b.propertyName ?? b.name).text})
    if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) for (const b of statement.exportClause.elements) exports.set(b.name.text, (b.propertyName ?? b.name).text)
  }
  const result = {file, entry, ast, declarations, imports, exports, selected: new Map(), bindings: new Map(), initializers: []}
  modules.set(file, result); return result
}
function resolve(module, name) {

  if (module.declarations.has(name)) return {module, name, node: module.declarations.get(name)}
  const origin = module.imports.get(name)
  if (!origin && module.ast.text.includes('typeof '+name)) return {ambient:name};
  if (!origin) throw Error('Missing raw declaration: ' + module.file + ':' + name)
  if (!origin.file.startsWith('chunk-')) return {builtin: origin.name, builtinModule: origin.file}

  const target = load(origin.file)
  return resolve(target, target.exports.get(origin.name) ?? origin.name)
}
function literalFalse(expression){return expression.kind===ts.SyntaxKind.FalseKeyword||(ts.isPrefixUnaryExpression(expression)&&expression.operator===ts.SyntaxKind.ExclamationToken&&ts.isNumericLiteral(expression.operand)&&expression.operand.text==='1')}
function proof(module, node, name) {
  const source = node.getText(module.ast)
  const deadBranches=[];function visit(n){if(ts.isIfStatement(n)&&literalFalse(n.expression))deadBranches.push({start:n.thenStatement.getStart(module.ast),end:n.thenStatement.end,sha256:sha(n.thenStatement.getText(module.ast))});ts.forEachChild(n,visit)}visit(node);
  return {file: module.file, name, start: node.getStart(module.ast), end: node.end, moduleLength: module.entry.length, moduleSha256: module.entry.sha256, sha256: sha(source), source, variable: ts.isVariableDeclaration(node),...(deadBranches.length?{dependencyOnlyLiteralFalseBranches:deadBranches}:{})}
}
// j/W are original lodash guarded CommonJS ambients (typeof j/typeof W), not a manufactured value.
const globals = new Set(['fetch','ports','Intl','atob','btoa','navigator','Bun','URL','URLSearchParams','TextDecoder','TextEncoder','Boolean','JSON', 'Object', 'WeakMap', 'Set', 'Map', 'String', 'Array', 'undefined', 'Error', 'Number', 'Math', 'Promise','Date','WeakSet','RegExp','Infinity','Symbol','BigInt','BigInt64Array','BigUint64Array','Buffer','process','setImmediate','clearImmediate','setTimeout','clearTimeout','setInterval','clearInterval','performance','AggregateError','TypeError','RangeError','ReferenceError','Uint8Array','Int32Array','AbortController','AbortSignal','structuredClone','global','globalThis','self','window','exports','module','require','Function','eval','Reflect','NaN','parseFloat','isNaN','Proxy','queueMicrotask','DOMException','Headers','Response','Request','FormData','ReadableStream','DataView','ArrayBuffer','SharedArrayBuffer','Float64Array','Int8Array','Uint16Array','Uint32Array','Error','SyntaxError','console','decodeURI','encodeURI','decodeURIComponent','encodeURIComponent','escape','unescape','parseInt','isFinite'])
function dependencies(source) {
  const text = 'export function closure(){' + source + '}', ast = ts.createSourceFile('closure.js', text, 99, true, ts.ScriptKind.JS)
  const host = {getSourceFile: n => n === 'closure.js' ? ast : undefined, getDefaultLibFileName: () => '', writeFile() {}, getCurrentDirectory: () => '/', getCanonicalFileName: n => n, useCaseSensitiveFileNames: () => true, getNewLine: () => '\n', fileExists: n => n === 'closure.js', readFile: n => n === 'closure.js' ? text : undefined}
  const checker = ts.createProgram(['closure.js'], {allowJs: true, noResolve: true, noLib: true}, host).getTypeChecker(), free = new Set()
  function visit(n) {
    // Bun's published conditional-compilation residue can mention a name
    // scoped only in a stripped branch. Do not invent a host port for that
    // unreachable read. This changes dependency analysis, never emitted body.
    if(ts.isIfStatement(n)&&literalFalse(n.expression)){if(n.elseStatement)visit(n.elseStatement);return}
    if (ts.isIdentifier(n) && !checker.getSymbolAtLocation(n) && !globals.has(n.text)
      && !(ts.isLabeledStatement(n.parent)&&n.parent.label===n)
      && !(ts.isBreakStatement(n.parent)&&n.parent.label===n)
      && !(ts.isPropertyAccessExpression(n.parent) && n.parent.name === n)
      && !(ts.isPropertyAssignment(n.parent) && n.parent.name === n)
      && !(ts.isBindingElement(n.parent) && n.parent.propertyName === n)
      && !(ts.isMethodDeclaration(n.parent) && n.parent.name === n)
      && !(ts.isPropertyDeclaration(n.parent) && n.parent.name === n)) free.add(n.text)
    ts.forEachChild(n, visit)
  }
  visit(ast); return [...free]
}
function bind(module, name) {
  const origin = resolve(module, name)
  if(origin.ambient)return;
  if(origin.cutImport){module.bindings.set(name,{port:origin.cutImport.port});ports.set(module.file+':'+name,{...origin.cutImport});return}
  if (origin.builtin) {module.bindings.set(name, origin); return}
  const identity = origin.module.file + ':' + origin.name
  if (cuts[identity]) {
    module.bindings.set(name, {port: cuts[identity], identity})
    ports.set(identity, {port: cuts[identity], ...proof(origin.module, origin.node, origin.name)})
    return
  }
  if (origin.module !== module) {
    bind(origin.module, origin.name); module.bindings.set(name, {file: origin.module.file, name: origin.name}); return
  }
  if ([...module.selected.values()].some(row=>row.start===origin.node.getStart(module.ast)&&row.end===origin.node.end)) return
  // The full ordinary WJ/IJ input dispatcher exceeded the old 4000 bound in
  // a complete-source inspect. Keep a finite source-graph bound,
  // rather than truncating a complete public method into partial helpers.
  if([...modules.values()].reduce((n,m)=>n+m.selected.size,0)>8000)throw Error('Bounded closure exceeds8000 at '+identity);
  const row = {...proof(module,origin.node,name),exportNames:names(origin.node.name)};
  const macroPattern=/\{ISSUES_EXPLAINER:"report the issue at https:\/\/github\.com\/anthropics\/claude-code\/issues",PACKAGE_URL:[^}]+\}/g;
  const emitted=row.source.replace(macroPattern,'(ports.productMetadata)');
  if(emitted!==row.source)row.emittedSource=emitted;


  module.selected.set(name, row)
  for (const ref of dependencies((row.variable ? 'var ' : '') + (row.emittedSource??row.source) + ';')) try{bind(module,ref)}catch(error){error.message+='\nFrom '+module.file+':'+name+' -> '+ref;throw error}
}





const roots={interactiveCaller:['chunk-q1842b1c.js','Ii'],launchInteractive:['chunk-mphp7acd.js','pHr'],checkTeleport:['chunk-mphp7acd.js','Rzn'],teleportRequirements:['chunk-mphp7acd.js','zln'],gitAvailable:['chunk-mphp7acd.js','F4o']};
const mode=process.argv.includes('--prepare')?'prepare':process.argv.includes('--ui')?'ui':process.argv.includes('--pool')?'pool':process.argv.includes('--launch')?'launch':'interactive';
const uiNamespaces=new Map();
if(mode==='ui'){
 for(const key of Object.keys(roots))delete roots[key];
 for(const file of ['chunk-q5snsasf.js','chunk-52qah382.js','chunk-xktw65wp.js','chunk-adakrekc.js','chunk-tggwvf1v.js']){
  const m=load(file);uiNamespaces.set(file,[...m.exports]);
  for(const [exported,local]of m.exports)roots[file+':'+exported]=[file,local];
 }
}
if(mode==='pool')for(const key of Object.keys(roots))delete roots[key];
if(mode==='launch')delete roots.interactiveCaller;
if(mode==='prepare'){
 for(const key of Object.keys(roots))delete roots[key];
 roots.appendPromptHead=['chunk-dgp2yyqt.js','Gs'];
}
for(const [file,name] of Object.values(roots))bind(load(file),name);
const q=load('chunk-q1842b1c.js'),lr=q.declarations.get('lr');let pool;
function findPool(node){if(ts.isIfStatement(node)&&node.expression.getText(q.ast)==='et!==null')pool=node;ts.forEachChild(node,findPool)}findPool(lr);
if(!pool||pool.getStart(q.ast)!==45147||pool.end!==47440)throw Error('pool arm range');
const poolRecord={...proof(q,pool,'poolHeadlessArm'),exportNames:['poolHeadlessArm']};
// Full pool arm only; prepared frame aliases come from lr's original destructure.
const destructure=lr.body.statements.find(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>ts.isObjectBindingPattern(d.name)&&d.initializer?.getText(q.ast)==='n'));
if(!destructure)throw Error('lr prepared destructure');
const poolSource='async function poolHeadlessArm(n,e,s){'+destructure.getText(q.ast)+'\n'+poolRecord.source+'}';
if(mode!=='launch'&&mode!=='ui'&&mode!=='prepare'){
for(const ref of dependencies(poolSource))bind(q,ref);
q.selected.set('poolHeadlessArm',{...poolRecord,source:poolRecord.source,emittedSource:poolSource,poolFrameDestructure:recordDestructure(destructure),variable:false});
function recordDestructure(n){return proof(q,n,'lrPreparedFrame')}
roots.poolHeadlessArm=['chunk-q1842b1c.js','poolHeadlessArm'];
}
// Only executable top-level writes to selected constructors. Nested function
// writes belong to their declaration and must not root unrelated namespaces.
function writtenRoots(expression){
 if(ts.isBinaryExpression(expression)) {
  if(expression.operatorToken.kind===ts.SyntaxKind.CommaToken)return [...writtenRoots(expression.left),...writtenRoots(expression.right)];
  if(expression.operatorToken.kind===ts.SyntaxKind.EqualsToken&&ts.isPropertyAccessExpression(expression.left)) {
   let target=expression.left.expression;while(ts.isPropertyAccessExpression(target))target=target.expression;
   return ts.isIdentifier(target)?[target.text]:[];
  }
 }
 return [];
}
let changed=true;while(changed){changed=false;for(const m of modules.values())for(const st of m.ast.statements){
 if(!ts.isExpressionStatement(st))continue;
 const target=writtenRoots(st.expression).find(name=>[...m.selected.values()].some(row=>row.exportNames.includes(name)));
 if(!target||m.initializers.some(r=>r.start===st.getStart(m.ast)))continue;
 m.initializers.push({...proof(m,st,'initializer:'+target),exportNames:[]});changed=true;
 for(const ref of dependencies(st.getText(m.ast)))bind(m,ref);
}}
const ordered=[],done=new Set,active=new Set;
function order(m){if(done.has(m.file))return;if(active.has(m.file))throw Error('cycle '+m.file);active.add(m.file);for(const b of m.bindings.values())if(b.file)order(load(b.file));active.delete(m.file);done.add(m.file);ordered.push(m)}
for(const m of modules.values())if(m.selected.size)order(m);
const ids=new Map(ordered.map((m,i)=>[m.file,i]));
function rootValue(file,n){if(n==='poolHeadlessArm')return 'm'+ids.get(file)+'["poolHeadlessArm"]';const o=resolve(load(file),n);if(o.builtin)return 'ports.builtins['+JSON.stringify(o.builtinModule)+']'+((o.builtin==='*'||o.builtin==='default')?'':'['+JSON.stringify(o.builtin)+']');if(o.ambient)return o.ambient;const role=cuts[o.module?.file+':'+o.name];if(role)return 'ports['+JSON.stringify(role)+']';return 'm'+ids.get(o.module.file)+'['+JSON.stringify(o.name)+']'}
const code=ordered.map((m,i)=>'function module'+i+'(imports){\n'+[...m.bindings.keys()].map(n=>'const '+n+'=imports['+JSON.stringify(n)+'];').join('\n')+'\n'+[...m.selected.values(),...m.initializers].sort((a,b)=>a.start-b.start).map(r=>(r.variable?'var ':'')+(r.emittedSource??r.source)+';').join('\n')+'\nreturn {'+[...m.selected.values()].flatMap(r=>r.exportNames).join(',')+'};\n}').join('\n')+'\n'+ordered.map((m,i)=>'const m'+i+'=module'+i+'({'+[...m.bindings].map(([n,b])=>JSON.stringify(n)+':'+(b.port?'ports['+JSON.stringify(b.port)+']':b.builtin?'ports.builtins['+JSON.stringify(b.builtinModule)+']'+((b.builtin==='*'||b.builtin==='default')?'':'['+JSON.stringify(b.builtin)+']'):'m'+ids.get(b.file)+'['+JSON.stringify(b.name)+']')).join(',')+'});'+(['chunk-s3fkzx5j.js'].includes(m.file)?'\nports.installLiteralNamespace287('+JSON.stringify('/$bunfs/root/'+m.file)+',{default:m'+i+'['+JSON.stringify(m.exports.get('default'))+']});':'')).join('\n')+'\nreturn {'+Object.entries(roots).map(([a,[file,n]])=>JSON.stringify(a)+':'+rootValue(file,n)).join(',')+(mode==='ui'?','+JSON.stringify('publicNamespaces')+':{'+[...uiNamespaces].map(([file,exports])=>JSON.stringify('/$bunfs/root/'+file)+':{'+exports.map(([exported,local])=>JSON.stringify(exported)+':'+rootValue(file,local)).join(',')+'}').join(',')+'}':'')+','+JSON.stringify('sourceModule')+':file=>({' + ordered.map((m,i)=>JSON.stringify(m.file)+':m'+i).join(',')+'})[file]};';
const out=process.env.ENV_CLOUD_OUT_287??'src/cli/environmentCloud287';
const literalNamespaces=[...new Set([...ordered.flatMap(m=>[...m.selected.values()].flatMap(r=>[...r.source.matchAll(/(?:import\(|import\.meta\.require\()"(\/\$bunfs\/root\/chunk-[^"]+)"/g)].map(x=>x[1])))])];
const provenance={mode,literalNamespaces,requiredSameOwnerPorts:[...ports.values()].filter(p=>p.port.startsWith('requiredOwner:')).map(p=>({file:p.file,name:p.name,port:p.port})),version:'2.1.287',manifestSha256:sha(manifestBytes),rangeConvention:'UTF-16 end-exclusive',roots,modules:ordered.map(m=>({file:m.file,rows:[...m.selected.values()],initializers:m.initializers,bindings:Object.fromEntries(m.bindings)})),ports:[...ports.values()]};
const info={declarations:ordered.reduce((n,m)=>n+m.selected.size,0),modules:ordered.length,ports:[...ports.values()].map(p=>({port:p.port,file:p.file,name:p.name})),selected:ordered.map(m=>({file:m.file,rows:[...m.selected.values()].map(r=>({name:r.name,variable:r.variable,start:r.start,end:r.end}))}))};
if(process.argv.includes('--inspect')){console.log(JSON.stringify(info,null,2));process.exit(0)}
fs.mkdirSync(out,{recursive:true});
for(const [name,value]of Object.entries({[mode+'Native.js']:'// Complete original environment callers; existing canonical/host owners only.\nexport function '+({prepare:'createEnvironmentPreparation287',ui:'createEnvironmentUiNamespaces287',pool:'createPoolCloudCaller287',launch:'createEnvironmentLaunchHelpers287',interactive:'createEnvironmentCloudCallers287'})[mode]+'(ports){return new Function("ports",'+JSON.stringify(code.replaceAll('import.meta.require','ports.nativeRequire').replaceAll('import(', 'ports.nativeImport(')) + ')(ports)}\n',[mode+'Ports.json']:JSON.stringify([...ports.values()].map(p=>({port:p.port,file:p.file,name:p.name})),null,2)+'\n',[mode+'Proof.json']:JSON.stringify(provenance,null,2)+'\n'})){if(process.argv.includes('--check')){if(fs.readFileSync(out+'/'+name,'utf8')!==value)throw Error(name)}else fs.writeFileSync(out+'/'+name,value)}
console.log(JSON.stringify({declarations:info.declarations,modules:info.modules,ports:info.ports.length}));
