import fs from 'node:fs'
import crypto from 'node:crypto'
import ts from 'typescript'
import path from 'node:path'
const base=path.resolve(import.meta.dirname,'../../../../.work/official-modules-2.1.287/darwin-arm64'),sha=x=>crypto.createHash('sha256').update(x).digest('hex'),pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5',manifestBytes=fs.readFileSync(base+'/manifest.json')
if(sha(manifestBytes)!==pin)throw Error('Unpinned requester/bridge manifest')
const manifest=JSON.parse(manifestBytes),file='chunk-xapeakym.js',entry=manifest.modules.find(x=>x.path===file),bytes=fs.readFileSync(base+'/raw/'+file)
if(sha(bytes)!==entry.sha256||bytes.length!==entry.length)throw Error('Requester raw module drift')
const source=bytes.toString(),ast=ts.createSourceFile(file,source,99,true,1),hI=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='hI'),rows=[],imports={},top={}
for(const n of ast.statements){if(ts.isImportDeclaration(n)){const b=n.importClause?.namedBindings;if(b&&ts.isNamedImports(b))for(const s of b.elements)imports[s.name.text]={file:n.moduleSpecifier.text.split('/').at(-1),name:(s.propertyName??s.name).text}}if(n.name)top[n.name.getText(ast)]=n;if(ts.isVariableStatement(n))for(const d of n.declarationList.declarations)top[d.name.getText(ast)]=d}
function row(name,local){let n;if(local){function visit(x){if((ts.isVariableDeclaration(x)||ts.isFunctionDeclaration(x))&&x.name?.getText(ast)===name)n=x;ts.forEachChild(x,visit)}visit(hI)}else n=top[name];if(!n)throw Error('Missing requester original '+name);const text=n.getText(ast);rows.push({file,name,start:n.getStart(ast),endExclusive:n.end,sha256:sha(text),source:text,moduleSha256:entry.sha256,moduleLength:entry.length});return ts.isVariableDeclaration(n)?(n.initializer?'const ':'let ')+text+';':text}
function importRow(importName){
 const binding=imports[importName],other=manifest.modules.find(x=>x.path===binding.file),raw=fs.readFileSync(base+'/raw/'+binding.file)
 if(sha(raw)!==other.sha256||raw.length!==other.length)throw Error('Imported tool assembly row drift '+importName)
 const parsed=ts.createSourceFile(binding.file,raw.toString(),99,true,1),node=parsed.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n]).find(n=>n.name?.getText(parsed)===binding.name),text=node.getText(parsed)
 rows.push({file:binding.file,name:importName,start:node.getStart(parsed),endExclusive:node.end,sha256:sha(text),source:text,moduleSha256:other.sha256,moduleLength:other.length})
 return ts.isVariableDeclaration(node)?'const '+text+';':text
}
function recordArrow(start,end){let hit;function visit(n){if(n.getStart(ast)===start&&n.end===end)hit=n;ts.forEachChild(n,visit)}visit(hI);if(!hit||!ts.isArrowFunction(hit))throw Error('Original frame arrow drift');const text=hit.getText(ast);rows.push({file,name:'hI.emitFrame',start,endExclusive:end,sha256:sha(text),source:text,moduleSha256:entry.sha256,moduleLength:entry.length});return text}
function turnOpenAssignment(){let hit;function visit(n){if(ts.isBinaryExpression(n)&&n.getText(ast)==='Iu=!0')hit=n;ts.forEachChild(n,visit)}visit(hI);if(!hit)throw Error('Original metadata turn admission assignment absent');const text=hit.getText(ast);rows.push({file,name:'hI.openMetadataTurn',start:hit.getStart(ast),endExclusive:hit.end,sha256:sha(text),source:text,moduleSha256:entry.sha256,moduleLength:entry.length});return text}
// These listeners close over the SAME requester Fs/Iu/zd/Du/oi/vf cells.
// They are installed by its actual IO caller, never by a second requester.
const pluginWatchBody=[row('_e',true).replace('const _e=JW.over(Te);','const _e=readPluginStoreOwner287();'),row('Sf',true)].join('\n')+'\npce.set(Sf);Qxn();'
const commandSubscriptionsBody=['hb','wf','Ou','yb','Xd','_b','Sb','bf','kb'].map(name=>row(name,true).replace(/^const /,'let ')).join('\n')+'\nreturn {hb,yb,_b,kb,Sf}'
const requestBody=importRow('Juo')+'\n'+['Ne','qo','Wd','Fn','qr','Na','qa','bo','xd','Lp','Zs','Yi','pa','Ip','gf','Gi','Fs','Iu','zd','cn','zi','cu','gu','oi','_f','Dd','vf','au','du','Wp'].map(name=>{const source=row(name,true).replace(/^const /, 'let ');return name==='gf'?source.replace('gf=w.some(', 'gf=Ct.some('):source}).join('\n').replace('let Ne=!1;\n','let Ne=!1;\nlet pluginStoreOwner287;\nfunction readPluginStoreOwner287(){return pluginStoreOwner287??=JW.over(Te)}\n')+'\nreturn {flagSettingsState287:{get Ip(){return Ip},set Ip(value){Ip=value},get pa(){return pa},set pa(value){pa=value},get gf(){return gf}},get Ne(){return Ne},set Ne(value){Ne=value},get pluginStoreOwner287(){return readPluginStoreOwner287()},requester:Wp,toolAssembly287:{assemble:Zs,tools:Yi,allowedAgentTypes:()=>Na,primitiveToolGrant:()=>qa},contextUsageInputs:cu,contextUsage:gu,appendMessages:qr,qualifiedCommands:zi,readModelOverride:qo,bindArrivalEngine(engine){Fn=engine;return ()=>{if(Fn===engine)Fn=void 0}},beforeTurn(){'+turnOpenAssignment()+'},afterTurn:_f,emitFrame:'+recordArrow(438009,438205)+',installCommandSubscriptions(){'+pluginWatchBody+'\n'+commandSubscriptionsBody+'}}'
function sourceExpression(name,body){let hit;function visit(n){if(n.getText(ast)===body)hit=n;ts.forEachChild(n,visit)}visit(hI);if(!hit)throw Error('Original bridge caller expression absent '+name);rows.push({file,name,start:hit.getStart(ast),endExclusive:hit.end,sha256:sha(body),source:body,moduleSha256:entry.sha256,moduleLength:entry.length});return body}
const attachExpression=sourceExpression('hI.attachBridge','sn.attached(kt),ZOe(!0),Q1t(kt,I.storageV5),TFe(()=>ob()?.noHistoryBackfill===!0)')
const identityExpression=sourceExpression('hI.enableBridgeIdentity','sn.setLoginIdentity(await Qb(I.storageV5).catch(()=>{return}))')
// Original Jo is IO-wide, not reset on each enable. Ingress/cancel/sweep are
// owned by this existing lifecycle closure and its actual queue/controller.
const dialogBody='with(p){'+row('y_',false)+';return y_(r,Q)}'
const bridgeBody=[row('Ir',true),row('ga',true),row('ha',true),row('nS',false),row('sn',true),row('Up',true),row('$o',true),row('Dp',true),row('ro',true),row('Gw',true),row('zw',true),row('Yw',true),row('Jo',true),row('Sm',false),row('rw',false)].join('\n')+'\nreturn {attach(kt){'+attachExpression+'},async enable(dialogKinds){const record=sn.armForEnable(dialogKinds);'+identityExpression+';return record},source:{Gw,zw,Yw,sn},journal:sn,announce:$o,disable:Dp,forwardStatus:ro,signature:Up,cancelAsyncMessage:Sm,requestDialog(){return makeDialog(p)},dispose(){Gw();zw();Yw();sn.dispose()},ingress(Je){return {'+[
 member('onInboundMessage',520529,523124),member('onInterrupt',523186,523403),
 member('onStopTask',523404,523525),member('onBackgroundTasks',523526,523613),
 member('onCancelAsyncMessage',523614,523719),
].join(',')+'}}}'
// `with` supplies the actual caller's live lexical cells (e.g. Vt/zr), rather
// than destructuring snapshots or copying original state into a second owner.
const scopeBody=[row('Fe',true),row('No',true),row('Zt',true),row('Sn',true),row('vn',true)].join('\n')+'\nreturn {sessionEnvVars:Fe,toolState:toolState,sessionHooksRegistry:Zt,memorySelector:Sn,isolationLatch:vn,pendingNestedMemoryTriggers:No}';
function member(name,start,end){let hit;function visit(n){if(n.getStart(ast)===start&&n.end===end)hit=n;ts.forEachChild(n,visit)}visit(hI);if(!hit||hit.name?.getText(ast)!==name)throw Error('Original bridge host member drift '+name);const text=hit.getText(ast);rows.push({file,name:'hI.remote.'+name,start,endExclusive:end,sha256:sha(text),source:text,moduleSha256:entry.sha256,moduleLength:entry.length});return text}
const bridgeHostBody=row('bi',true)+'\n'+row('Pi',true)+'\nreturn {'+[
 member('recordAtEnable',519675,519692),member('onDialogKindsDeclared',519779,519849),
 member('getBackfillMessages',519906,519963),member('onGetContextUsage',520011,520031),
 member('workspaceDiffComputeBudget',520229,520258),member('onClientInitialize',520390,520454),
].join(',')+'}'
// JS Function does not parse Bun's source `using` syntax. Translate the intact
// source closure with TS's standard disposal transform; no hand-edited body.
const bridgeRuntime=ts.transpileModule('with(p){'+bridgeBody+'}',{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None},reportDiagnostics:true})
if(bridgeRuntime.diagnostics?.some(d=>d.category===ts.DiagnosticCategory.Error))throw Error('Original ingress disposal transform failed')
const emitted='// Fixed official 2.1.287 complete hI requester/bridge bodies.\n'+
 'const requesterFactory287=new Function("p",'+JSON.stringify('with(p){'+requestBody+'}')+');\n'+
 'const dialogFactory287=new Function("p",'+JSON.stringify(dialogBody)+');\n'+
 'const bridgeFactory287=new Function("p","makeDialog",'+JSON.stringify(bridgeRuntime.outputText)+');\n'+
 'const scopeFactory287=new Function("p",'+JSON.stringify('with(p){'+scopeBody+'}')+');\n'+
 'const bridgeHostFactory287=new Function("p",'+JSON.stringify('with(p){'+bridgeHostBody+'}')+');\n'+
 'export function createPrintScopeState287(ports){return scopeFactory287(ports)}\n'+
 'export function createPrintRequester287(ports){return requesterFactory287(ports)}\n'+
 'export function createPrintBridgeLifecycle287(ports){return bridgeFactory287(ports,dialogFactory287)}\n'+
 'export function createPrintBridgeHostCallbacks287(ports){return bridgeHostFactory287(ports)}\nexport function createPrintRequestDialog287(ports){return dialogFactory287(ports)}\n'
// Only import / top-level references belong in the shared canonical namespace.
// Local hI references are resolved by explicit caller cells, not default stubs.
const sessionProducerNames=['Op','Po','lr','_r','Fo','xp','Fp','vb','Zd','Cb','ju','Db','xb','Ya','Ob','eb','ws','Mp','De']
const bridgeInitializedExpression=sourceExpression('hI.bridgeInitializedEpoch','++Fo')
const sessionProducerBody=sessionProducerNames.map(name=>row(name,true).replace(/^const /,'let ')).join('\n')+'\nreturn {bridgeInitialized(){return '+bridgeInitializedExpression+'},bridgeState:xp,vb,Zd,Cb,ju,Db,xb,Ya,Ob,eb,ws,Mp,De,get Op(){return Op},set Op(value){Op=value},get Po(){return Po},set Po(value){Po=value},get lr(){return lr},set lr(value){lr=value},get _r(){return _r},set _r(value){_r=value}}'
const sessionProducerContent='const sessionProducerFactory287=new Function("p",'+JSON.stringify('with(p){'+sessionProducerBody+'}')+');\nexport function createPrintSessionProducers287(ports){return sessionProducerFactory287(ports)}\n'
const modules={};for(const [name,binding]of Object.entries(imports))modules[name]=binding
for(const name of Object.keys(top))if(!modules[name])modules[name]={file,name}
// Full stateless original kny selector dependencies. Its const tool-name set
// is not a business registry; Zs's bo/Lp/Na/qa stay in requesterFactory only.
const selectionFile='chunk-kny5qk1k.js',selectionEntry=manifest.modules.find(x=>x.path===selectionFile),selectionBytes=fs.readFileSync(base+'/raw/'+selectionFile)
if(sha(selectionBytes)!==selectionEntry.sha256||selectionBytes.length!==selectionEntry.length)throw Error('Tool selection raw drift')
const selectionAst=ts.createSourceFile(selectionFile,selectionBytes.toString(),99,true,1),selectionBindings={}
for(const n of selectionAst.statements.filter(ts.isImportDeclaration))for(const spec of n.importClause?.namedBindings?.elements??[])selectionBindings[spec.name.text]={file:n.moduleSpecifier.text.split('/').at(-1),name:(spec.propertyName??spec.name).text}
const selectionNodes=selectionAst.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n])
const selectionBody=['p','Vlr','c','m5t','qlr','IJo','mvt','gvt'].map(name=>{
 const node=selectionNodes.find(n=>n.name?.getText(selectionAst)===name);if(!node)throw Error('Original tool selector missing '+name)
 const text=node.getText(selectionAst);rows.push({file:selectionFile,name,start:node.getStart(selectionAst),endExclusive:node.end,sha256:sha(text),source:text,moduleSha256:selectionEntry.sha256,moduleLength:selectionEntry.length})
 return ts.isVariableDeclaration(node)?'const '+text+';':text
}).join('\n')
const selectionContent='const toolSelectionFactory287=new Function("ports",'+JSON.stringify('with(ports){'+selectionBody+';return {Vlr,m5t,qlr,IJo,mvt,gvt}}')+');\nexport function createPrintToolSelection287(ports){return toolSelectionFactory287(ports)}\n'
// jVt is a pure cache-key reader. Borrow the existing repository namespace's
// Cu/oe/oo so detection and this key use one canonical host repository cache.
const repositoryFile='chunk-9hktajv8.js',repositoryEntry=manifest.modules.find(x=>x.path===repositoryFile),repositoryBytes=fs.readFileSync(base+'/raw/'+repositoryFile)
if(sha(repositoryBytes)!==repositoryEntry.sha256||repositoryBytes.length!==repositoryEntry.length)throw Error('Repository tool key raw drift')
const repositoryAst=ts.createSourceFile(repositoryFile,repositoryBytes.toString(),99,true,1),repositoryNode=repositoryAst.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='jVt'),repositoryBody=repositoryNode.getText(repositoryAst)
rows.push({file:repositoryFile,name:'jVt',start:repositoryNode.getStart(repositoryAst),endExclusive:repositoryNode.end,sha256:sha(repositoryBody),source:repositoryBody,moduleSha256:repositoryEntry.sha256,moduleLength:repositoryEntry.length})
const repositoryContent='const repositoryToolKeyFactory287=new Function("ports",'+JSON.stringify('with(ports){'+repositoryBody+';return jVt}')+');\nexport function createPrintRepositoryToolKey287(ports){return repositoryToolKeyFactory287(ports)}\n'
// Complete original coordinator barrel: every public alias refers to the
// pre-existing canonical EB namespace; no coordinator state/registry copy.
const coordinatorFile='chunk-3tc44sbx.js',coordinatorEntry=manifest.modules.find(x=>x.path===coordinatorFile),coordinatorBytes=fs.readFileSync(base+'/raw/'+coordinatorFile)
if(sha(coordinatorBytes)!==coordinatorEntry.sha256||coordinatorBytes.length!==coordinatorEntry.length)throw Error('Coordinator public namespace drift')
const coordinatorAst=ts.createSourceFile(coordinatorFile,coordinatorBytes.toString(),99,true,1),coordinatorImports={},toolCoordinatorBindings={}
for(const node of coordinatorAst.statements.filter(ts.isImportDeclaration))for(const spec of node.importClause?.namedBindings?.elements??[])coordinatorImports[spec.name.text]={file:node.moduleSpecifier.text.split('/').at(-1),name:(spec.propertyName??spec.name).text}
for(const node of coordinatorAst.statements.filter(ts.isExportDeclaration)){
 const text=node.getText(coordinatorAst);rows.push({file:coordinatorFile,name:'coordinator.publicExports',start:node.getStart(coordinatorAst),endExclusive:node.end,sha256:sha(text),source:text,moduleSha256:coordinatorEntry.sha256,moduleLength:coordinatorEntry.length})
 for(const spec of node.exportClause?.elements??[])toolCoordinatorBindings[spec.name.text]=coordinatorImports[(spec.propertyName??spec.name).text]
}
if(Object.keys(toolCoordinatorBindings).length!==4||!toolCoordinatorBindings.isCoordinatorMode)throw Error('Coordinator public exports changed')
for(const [alias,binding]of Object.entries(toolCoordinatorBindings)){
 const input=manifest.modules.find(x=>x.path===binding.file),raw=fs.readFileSync(base+'/raw/'+binding.file)
 if(sha(raw)!==input.sha256||raw.length!==input.length)throw Error('Coordinator callee raw drift')
 const parsed=ts.createSourceFile(binding.file,raw.toString(),99,true,1),node=parsed.statements.find(n=>n.name?.getText(parsed)===binding.name),text=node.getText(parsed)
 rows.push({file:binding.file,name:binding.name,publicAlias:alias,start:node.getStart(parsed),endExclusive:node.end,sha256:sha(text),source:text,moduleSha256:input.sha256,moduleLength:input.length,role:'borrowed canonical public coordinator callee'})
}
const singletonFile='chunk-6xrs6gmd.js',singletonEntry=manifest.modules.find(x=>x.path===singletonFile),singletonBytes=fs.readFileSync(base+'/raw/'+singletonFile)
if(sha(singletonBytes)!==singletonEntry.sha256||singletonBytes.length!==singletonEntry.length)throw Error('Permission singleton raw drift')
const singletonAst=ts.createSourceFile(singletonFile,singletonBytes.toString(),99,true,1),singletonNode=singletonAst.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='N2o'),singletonBody=singletonNode.getText(singletonAst)
rows.push({file:singletonFile,name:'N2o',start:singletonNode.getStart(singletonAst),endExclusive:singletonNode.end,sha256:sha(singletonBody),source:singletonBody,moduleSha256:singletonEntry.sha256,moduleLength:singletonEntry.length})
const singletonContent='const singletonToolFilterFactory287=new Function("ports",'+JSON.stringify('with(ports){'+singletonBody+';return N2o}')+');\nexport function createPrintSingletonToolFilter287(ports){return singletonToolFilterFactory287(ports)}\n'
const subscriptionFile='chunk-710jgjjk.js',subscriptionEntry=manifest.modules.find(x=>x.path===subscriptionFile),subscriptionBytes=fs.readFileSync(base+'/raw/'+subscriptionFile)
if(sha(subscriptionBytes)!==subscriptionEntry.sha256||subscriptionBytes.length!==subscriptionEntry.length)throw Error('Coordinator subscription predicate raw drift')
const subscriptionAst=ts.createSourceFile(subscriptionFile,subscriptionBytes.toString(),99,true,1),subscriptionNodes=subscriptionAst.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n])
const subscriptionContent=['W','F','A1o'].map(name=>{
 const node=subscriptionNodes.find(n=>n.name?.getText(subscriptionAst)===name),text=node.getText(subscriptionAst)
 rows.push({file:subscriptionFile,name,start:node.getStart(subscriptionAst),endExclusive:node.end,sha256:sha(text),source:text,moduleSha256:subscriptionEntry.sha256,moduleLength:subscriptionEntry.length})
 return ts.isVariableDeclaration(node)?'const '+text+';':text
}).join('\n')+'\nexport {A1o as readPrintCoordinatorSubscriptionFilter287};\n'
const proof={version:'2.1.287',manifestSha256:pin,offsetUnit:'UTF16 end-exclusive',rows,bindings:modules,toolSelectionBindings:selectionBindings,toolCoordinatorBindings,runtimeAdaptations:{commandRescan:'Yd/Jd/Du borrowed from the same plugin refresh owner through live caller descriptors; complete declarations recorded by recoverPluginRefresh287; no requester-local duplicate rescan promise',flagChannelState:'Ip/pa/gf live accessors from the same requester closure; gf complete pinned initializer w -> Ct transport alias points to the actual adopted mutable history, captured once before input delivery; no new history/model owner',toolSelection:'Original kny l import.meta.require supplied as same canonical coordinator namespace; complete mvt/gvt/IJo/m5t/c/p bodies intact',toolAssembly:'Complete Zs/Yi/bo/xd/Lp in requester lexical scope, reads/writes existing Na/qa; only read-only callable view exported',bridgeClosure:'TypeScript ES2022 standard using disposal transform of intact original closure; IO-wide Jo retained'},lexicalAdapter:'Live actual print caller property bindings; original source bodies unchanged; no second scope/IO/cache. Complete Df not claimed.'}
for(const [name,body]of [['requesterBridgeNative.js',emitted+sessionProducerContent+selectionContent+repositoryContent+singletonContent+subscriptionContent],['requesterBridgeProvenance.json',JSON.stringify(proof,null,2)+'\n']]){const dest=path.join(import.meta.dirname,name);if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==body)throw Error('Requester generated drift '+name)}else fs.writeFileSync(dest,body)}
// Exact public accessor ABI of the original hI cells. pa starts as an
// environment string/undefined and the intact flag branch also assigns false.
// Preserve all adjacent requester/bridge declarations, generate only our facet.
const requesterTypesPath=path.join(import.meta.dirname,'requesterBridgeNative.d.ts');
const requesterTypes=fs.readFileSync(requesterTypesPath,'utf8');
const requesterStateType287='readonly flagSettingsState287:{Ip:{value:string|readonly string[]|undefined}|undefined;pa:string|boolean|undefined;readonly gf:boolean};';
const stateTypePattern=/readonly flagSettingsState287:.*?;(?=readonly toolAssembly287)/;
if(!stateTypePattern.test(requesterTypes))throw Error('Requester state accessor declaration absent');
const nextRequesterTypes=requesterTypes.replace(stateTypePattern,requesterStateType287);
if(process.argv.includes('--check')){if(nextRequesterTypes!==requesterTypes)throw Error('Stale original flag state types')}else fs.writeFileSync(requesterTypesPath,nextRequesterTypes);
console.log(JSON.stringify({sourceRows:rows.length,modules:8,bodySha:sha(emitted+sessionProducerContent+selectionContent+repositoryContent+singletonContent+subscriptionContent)}))
