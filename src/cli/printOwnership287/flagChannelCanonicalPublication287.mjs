import ts from 'typescript';import crypto from 'node:crypto';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
/** Source generation only. Add complete raw declarations to pre-existing
 * canonical factories. No new owner for any existing module/business state. */
export function applyFlagChannelCanonicalPublication287(files,delta,publicAliases=[],stateInitializationOrder287=[],omitEmptyImports287=false,latePrimitiveImports287=[]){
 const baseline=files['native.js'],proof=JSON.parse(files['provenance.json']),baselinePorts=JSON.stringify(proof.ports),ast=ts.createSourceFile('native.js',baseline,99,true,1),host=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='createHooksLifecycle287');
 if(!host||ast.parseDiagnostics.length)throw Error('Canonical flag publication parse prerequisite');
 const indices=new Map(proof.modules.map((m,i)=>[m.file,i])),calls=new Map(),factories=new Map(),edits=[],newFactory=[],newCalls=[],newCases=[];
 for(const n of host.body.statements){if(ts.isFunctionDeclaration(n)&&/^module\d+$/.test(n.name?.text??''))factories.set(Number(n.name.text.slice(6)),n);if(ts.isVariableStatement(n))for(const d of n.declarationList.declarations)if(/^m\d+$/.test(d.name.getText(ast))&&ts.isCallExpression(d.initializer)&&/^module\d+$/.test(d.initializer.expression.getText(ast)))calls.set(Number(d.name.getText(ast).slice(1)),{statement:n,decl:d})}
 const baselineIndices=[...indices];
 const finalReturn287=host.body.statements.findLast(ts.isReturnStatement);

 // A new stateful module requires an explicit complete source ordering plan,
 // not lazy/default initialization. Every new module runs once before return,
 // after existing owners; original rows remain in raw declaration order.
 const fresh287=delta.filter(m=>!indices.has(m.file)),stateOrder287=new Map(stateInitializationOrder287.map((r,i)=>[r.file,{...r,index:i}]));
 for(const m of fresh287){
  const order=stateOrder287.get(m.file);
  if(m.rows.some(r=>r.variable||! /^(?:async )?function /.test(r.source))&&!order)throw Error('New canonical state initialization needs explicit source ordering '+m.file);
  if(order){if(order.moduleSha256!==m.moduleSha256||JSON.stringify(order.rows)!==JSON.stringify(m.rows.map(r=>({name:r.name,start:r.start,end:r.end,sha256:r.sha256}))))throw Error('New canonical initialization source pin drift '+m.file);
   for(const b of Object.values(m.bindings)){const target=fresh287.find(r=>r.file===b.file);if(target&&(!stateOrder287.has(target.file)||stateOrder287.get(target.file).index>=order.index))throw Error('New canonical initialization dependency ordering '+m.file+' -> '+target.file)}
  }
 }
 // Order the fresh source factories by the declared dependency plan. Existing
 // canonical indices and factory/call ordering are never changed.
 const acceptedFreshOrder287=['chunk-r7jk65a3.js','chunk-f7ph5dxa.js','chunk-ce86av7y.js','chunk-53vq4h4f.js','chunk-9pwdyydg.js'];
 const legacyIndex287=file=>{const i=acceptedFreshOrder287.indexOf(file);return i<0?Infinity:i};
 delta=[...delta.filter(m=>indices.has(m.file)),...fresh287.sort((a,b)=>legacyIndex287(a.file)-legacyIndex287(b.file))];
 for(const m of delta)if(!indices.has(m.file)){indices.set(m.file,proof.modules.length);proof.modules.push({file:m.file,moduleSha256:m.moduleSha256,moduleLength:m.moduleLength,rows:[],bindings:{},optionalGlobals:[]})}
 const newModulePositions287=new Map(delta.filter(m=>!factories.has(indices.get(m.file))).map(m=>[m.file,stateOrder287.has(m.file)?finalReturn287.getStart(ast):Math.min(finalReturn287.getStart(ast),...delta.filter(other=>factories.has(indices.get(other.file))&&Object.values(other.bindings).some(b=>b.file===m.file)).map(other=>calls.get(indices.get(other.file)).statement.getStart(ast)))]));
 const value=(b,at,fromIndex)=>{
  if(b.port){if(!proof.ports.includes(b.port))throw Error('New canonical production port prerequisite '+b.port);return 'ports['+JSON.stringify(b.port)+']'+(b.member?'['+JSON.stringify(b.member)+']':'')}
  if(b.builtin){const key=b.builtin.module+':'+b.builtin.name;const original=proof.modules.flatMap(m=>Object.entries(m.bindings).filter(([,r])=>r.builtin?.module===b.builtin.module&&r.builtin?.name===b.builtin.name).map(([name])=>({m,name}))).find(({m,name})=>{const i=indices.get(m.file),c=calls.get(i);return c&&c.decl.initializer.arguments[0].properties.some(p=>p.name?.getText(ast)===JSON.stringify(name))});if(!original){
   // Borrow the already imported runtime namespace for a newly selected native
   // export. No second runtime module or business owner is introduced.
   const declaration=ast.statements.find(n=>ts.isImportDeclaration(n)&&n.moduleSpecifier.text.replace(/^node:/,'')===b.builtin.module.replace(/^node:/,'')&&(n.importClause?.name||n.importClause?.namedBindings&&ts.isNamespaceImport(n.importClause.namedBindings)||n.importClause?.namedBindings&&ts.isNamedImports(n.importClause.namedBindings)&&n.importClause.namedBindings.elements.some(e=>e.propertyName?.text==='default')));
   const clause=declaration?.importClause;
   const namespace=clause?.name?.text??(clause?.namedBindings&&ts.isNamespaceImport(clause.namedBindings)?clause.namedBindings.name.text:clause?.namedBindings&&ts.isNamedImports(clause.namedBindings)?clause.namedBindings.elements.find(e=>e.propertyName?.text==='default')?.name.text:undefined);
   if(!namespace)throw Error('Canonical builtin prerequisite '+key);
   return namespace+'['+JSON.stringify(b.builtin.name)+']';
  }const i=indices.get(original.m.file),p=calls.get(i).decl.initializer.arguments[0].properties.find(p=>p.name.getText(ast)===JSON.stringify(original.name));return p.initializer.getText(ast)}
  const i=indices.get(b.file),m=proof.modules[i];if(i===undefined||!m)throw Error('Canonical imported owner prerequisite '+JSON.stringify(b));
  const added=delta.find(r=>r.file===b.file),row=m.rows.find(r=>r.names?.includes(b.name))??added?.rows.find(r=>r.names?.includes(b.name)),binding=m.bindings[b.name]??added?.bindings[b.name];if(!row&&!binding)throw Error('Canonical imported declaration prerequisite '+b.file+':'+b.name);
  if(!calls.has(i)){
   const position=newModulePositions287.get(b.file);
   if(position===undefined)throw Error('New canonical dependency initialization prerequisite '+b.file);
   if(position>at||position===at&&(stateOrder287.has(b.file)&&stateOrder287.has(proof.modules[fromIndex]?.file)?stateOrder287.get(b.file).index>=stateOrder287.get(proof.modules[fromIndex].file).index:i>=fromIndex)){
    if(!row||row.variable||! /^(?:async )?function /.test(row.source))throw Error('Non-callable late canonical import '+b.file+':'+b.name);
    b.lazyFunctionCycle={contract:'call-only borrow fully initialized original function; new module state initializes in explicit order before lifecycle return',target:b.file+':'+b.name};
    return '(...args)=>m'+i+'['+JSON.stringify(b.name)+'](...args)'
   }
   return 'm'+i+'['+JSON.stringify(b.name)+']'
  }
  if(calls.get(i).statement.getStart(ast)>=at){
   const literal=latePrimitiveImports287.find(v=>v.file===b.file&&v.name===b.name&&v.from===proof.modules[fromIndex]?.file);
   if(literal){
    if(row?.sha256!==literal.originalSha256||!row.variable)throw Error('Late primitive original declaration drift');
    const source=ts.createSourceFile('constant.js','var '+row.source+';',99,true,1),declaration=source.statements[0]?.declarationList?.declarations[0];
    if(!declaration||!ts.isStringLiteral(declaration.initializer)||declaration.initializer.text!==literal.value)throw Error('Late primitive literal drift');
    b.latePrimitiveConstant287={originalSha256:row.sha256,value:literal.value,contract:'Original module literal has no assignments after its declaration; equal primitive value, no state or deferred owner'};
    return JSON.stringify(literal.value);
   }
   if(!row||row.variable||! /^(?:async )?function /.test(row.source))throw Error('Non-callable late canonical import '+b.file+':'+b.name);b.lazyFunctionCycle={contract:'call-only borrow same original function, no new state',target:b.file+':'+b.name};return '(...args)=>m'+i+'['+JSON.stringify(b.name)+'](...args)'}
  return 'm'+i+'['+JSON.stringify(b.name)+']'
 };
 for(const m of delta){const i=indices.get(m.file),canonical=proof.modules[i];if(canonical.moduleSha256!==m.moduleSha256)throw Error('Canonical original module SHA prerequisite '+m.file);for(const r of m.rows)if(canonical.rows.some(old=>old.names.some(name=>r.names.includes(name))))throw Error('Duplicate canonical original declaration '+m.file+':'+r.name);for(const name of Object.keys(m.bindings))if(Object.hasOwn(canonical.bindings,name))throw Error('Duplicate canonical original binding '+m.file+':'+name);
  const rows=m.rows.slice().sort((a,b)=>a.start-b.start),decls=rows.map(r=>((r.variable?'var ':'')+r.source+';').replaceAll('import.meta.require("/$bunfs/root/', 'embeddedRequire287("/$bunfs/root/').replaceAll('import("/$bunfs/root/', 'embeddedImport287("/$bunfs/root/')).join('\n'),names=[...rows.flatMap(r=>r.names),...Object.keys(m.bindings)],imports=Object.keys(m.bindings).map(name=>'const '+name+'=imports['+JSON.stringify(name)+'];').join('\n');
  if(!factories.has(i)){const at=newModulePositions287.get(m.file);newFactory.push({at,file:m.file,text:'function module'+i+'(imports){\n'+imports+'\n'+decls+'\nreturn {'+names.join(',')+'};\n}\n'+'const m'+i+'=module'+i+'({'+Object.entries(m.bindings).map(([name,b])=>JSON.stringify(name)+':'+value(b,at,i)).join(',')+'});\n'});newCases.push('case '+JSON.stringify(m.file)+':return m'+i+';')}
  else{const fn=factories.get(i),ret=fn.body.statements.findLast(ts.isReturnStatement),call=calls.get(i);if(!ret||!ts.isObjectLiteralExpression(ret.expression)||!call)throw Error('Same canonical factory ABI prerequisite '+m.file);
   edits.push({at:fn.body.getStart(ast)+1,text:'\n'+imports+'\n'},{at:ret.getStart(ast),text:decls+'\n'},{at:ret.expression.end-1,text:(ret.expression.properties.length?',':'')+names.join(',')});
   const arg=call.decl.initializer.arguments[0];if(!omitEmptyImports287||Object.keys(m.bindings).length)edits.push({at:arg.end-1,text:(arg.properties.length?',':'')+Object.entries(m.bindings).map(([name,b])=>JSON.stringify(name)+':'+value(b,call.statement.getStart(ast),i)).join(',')});
  }
  canonical.rows.push(...rows);Object.assign(canonical.bindings,m.bindings)
 }
 if(newFactory.length){
  // Multiple new suppliers at the return boundary are a single ordered edit;
  // separate prepends at the same offset would reverse their real calls.
  const grouped287=new Map();
  for(const row of newFactory){const group=grouped287.get(row.at)??[];group.push(row);grouped287.set(row.at,group)}
  for(const [at,group]of grouped287){group.sort((a,b)=>(stateOrder287.get(a.file)?.index??Infinity)-(stateOrder287.get(b.file)?.index??Infinity));edits.push({at,text:group.map(row=>row.text).join('')})}
const clear=host.body.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[]).find(n=>n.name.getText(ast)==='clearSourceModule287');const switchNode=clear?.initializer.body.statements.find(ts.isSwitchStatement);if(!switchNode)throw Error('Canonical namespace switch prerequisite');edits.push({at:switchNode.caseBlock.getStart(ast)+1,text:newCases.join('')})}

 const aliasStatements=[],aliasCases=[];
 for(const namespace of publicAliases){
  const namespaceIndex=indices.get(namespace.file),supplier=namespaceIndex===undefined?'Object.create(null)':'m'+namespaceIndex;
  const descriptors=[];
  for(const [alias,b]of Object.entries(namespace.exports)){
   const index=indices.get(b.file),owner=proof.modules[index];if(index===undefined||!owner||!owner.rows.some(r=>r.names.includes(b.name))&&!Object.hasOwn(owner.bindings,b.name))throw Error('Original public alias supplier missing '+namespace.file+':'+alias);
   descriptors.push(JSON.stringify(alias)+':{enumerable:true,get:()=>m'+index+'['+JSON.stringify(b.name)+']}');
  }
  aliasStatements.push('virtualModules287['+JSON.stringify('/$bunfs/root/'+namespace.file)+']=Object.defineProperties('+supplier+', {'+descriptors.join(',')+'});');
  if(namespaceIndex===undefined)aliasCases.push('case '+JSON.stringify(namespace.file)+':return virtualModules287['+JSON.stringify('/$bunfs/root/'+namespace.file)+'];');
 }
 if(aliasStatements.length){const ret=host.body.statements.findLast(ts.isReturnStatement);edits.push({at:ret.getStart(ast),text:aliasStatements.join('\n')+'\n'});if(aliasCases.length){const clear=host.body.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[]).find(n=>n.name.getText(ast)==='clearSourceModule287'),sw=clear?.initializer.body.statements.find(ts.isSwitchStatement);if(!sw)throw Error('Public alias namespace switch prerequisite');edits.push({at:sw.caseBlock.getStart(ast)+1,text:aliasCases.join('')})}}
 let result=baseline;for(const edit of edits.sort((a,b)=>b.at-a.at))result=result.slice(0,edit.at)+edit.text+result.slice(edit.at);
 const parse=ts.createSourceFile('flag-published.js',result,99,true,1);if(parse.parseDiagnostics.length)throw Error('Canonical full source publication parse failure');if(JSON.stringify(proof.ports)!==baselinePorts||baselineIndices.some(([file,i])=>indices.get(file)!==i))throw Error('Canonical accepted owner index/port drift');
 const candidateHost287=parse.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='createHooksLifecycle287');
 const candidateCalls287=new Map(candidateHost287.body.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[]).filter(n=>/^m\d+$/.test(n.name.getText(parse))&&ts.isCallExpression(n.initializer)).map(n=>[Number(n.name.getText(parse).slice(1)),n.getStart(parse)]));
 const lastExistingCall287=Math.max(...baselineIndices.map(([,i])=>candidateCalls287.get(i)));
 let priorStateCall287=lastExistingCall287;
 for(const row of stateInitializationOrder287){const at=candidateCalls287.get(indices.get(row.file));if(at===undefined||at<=priorStateCall287||at>=candidateHost287.body.statements.findLast(ts.isReturnStatement).getStart(parse))throw Error('Generated canonical state initialization order drift '+row.file);priorStateCall287=at}
 for(const [j,file]of acceptedFreshOrder287.entries())if(indices.has(file)&&indices.get(file)!==1100+j)throw Error('Accepted supplemental canonical index drift '+file);
 proof.runtimeAdaptations.flagChannelControls287={contract:'whole original additive closure in same canonical factories after accepted source transports; existing state owners/ports/indices/relative initialization unchanged',baselineSha256:sha(baseline),candidateSha256:sha(result),stateInitializationOrder287,newCanonicalFunctionModules:[...newModulePositions287.keys()].filter(file=>!stateOrder287.has(file)),newCanonicalOrderedModules:[...stateOrder287.keys()],publicAliases,modules:delta.map(m=>({file:m.file,index:indices.get(m.file),rows:m.rows.map(r=>({name:r.name,start:r.start,end:r.end,sha256:r.sha256,moduleSha256:r.moduleSha256})),bindings:m.bindings}))};
 files['native.js']=result;files['provenance.json']=JSON.stringify(proof,null,2)+'\n';
}
