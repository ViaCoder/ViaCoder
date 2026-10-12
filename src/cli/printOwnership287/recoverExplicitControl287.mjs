#!/usr/bin/env node
// Fixed287 complete print control helpers/branches. Default landing is this directory.
// --check is strictly read-only. Optional paths support external staging, not production fallbacks.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {createRequire,isBuiltin} from 'node:module';
const args=process.argv.slice(2),check=args.includes('--check');
const option=name=>{const at=args.indexOf(name);if(at<0)return undefined;const value=args[at+1];if(!value||value.startsWith('--'))throw Error('Missing value '+name);return value};
const known=new Set(['--check','--repo','--corpus','--output-dir']);
for(let i=0;i<args.length;i++){if(!known.has(args[i]))throw Error('Unknown argument '+args[i]);if(args[i]!=='--check')i++;}
const repo=path.resolve(option('--repo')??path.resolve(import.meta.dirname,'../../..'));
const dir=path.resolve(option('--corpus')??path.resolve(repo,'../.work/official-modules-2.1.287/darwin-arm64'));
const out=path.resolve(option('--output-dir')??import.meta.dirname);
const ts=createRequire(path.join(repo,'package.json'))('typescript'),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const bytes=fs.readFileSync(path.join(dir,'manifest.json')),manifest=JSON.parse(bytes);
const expectedManifestSha256='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5';
if(hash(bytes)!==expectedManifestSha256)throw Error('Fixed287 manifest drift');
const runtimeFile='explicitControlRuntime287.ts',runtime=fs.readFileSync(path.join(out,runtimeFile),'utf8');
const runtimeSha256='b5bf8796d5a3a652b34588a6247f9c246d4b253b52e386faf60c61f4e6c8b7f1';
if(hash(runtime)!==runtimeSha256)throw Error('Accepted typed runtime changed; review before regenerating provenance');

function recoverHelpers287(){
const modules=new Map();
// Same declaration index and checker-backed free-reference algorithm as canonical generator.
const base=fs.readFileSync(repo+'/scripts/official/hooks-lifecycle-287.mjs','utf8');
const bindingNames=new Function('ts','return '+base.slice(base.indexOf('function bindingNames('),base.indexOf('\nfunction read(')))(ts);
const read=new Function('modules','manifest','fs','path','dir','hash','ts','bindingNames','return '+base.slice(base.indexOf('function read('),base.indexOf('\nconst globals=')))(modules,manifest,fs,path,dir,hash,ts,bindingNames);
const {free}=new Function('ts',base.slice(base.indexOf('const globals='),base.indexOf('\n\nconst boundaries='))+';return {free};')(ts);
const nativePath=repo+'/src/utils/plugins/officialHooksLifecycle287/native.js',native=fs.readFileSync(nativePath,'utf8'),canonical=new Map();
for(const match of native.matchAll(/case "(chunk-[^"]+\.js)":return m(\d+);/g)){
 const index=Number(match[2]),start=native.indexOf(`function module${index}(imports){`),end=native.indexOf(`function module${index+1}(imports){`,start);
 const body=native.slice(start,end<0?native.indexOf('export ',start):end),returns=[...body.matchAll(/return \{([^}]+)\};/g)];
 const names=(returns.at(-1)?.[1]??'').split(',').map(x=>x.trim());canonical.set(match[1],new Set(names));
}
const roots={'chunk-tf63hv0k.js':['txn','q4t','J6e'],'chunk-gf9kpcg4.js':['submitDraftFromRequest'],'chunk-xapeakym.js':['buildUltrareviewOutcomeMessages']};
const edges=[],recover=new Map(),boundaries=new Map(),builtins=new Map();
function bind(file,name){
 const key=file+':'+name;if(boundaries.has(key)||builtins.has(key)||recover.has(key))return;
 const m=read(file);
 if(key==='chunk-2ynta9xc.js:Kx'){const n=m.decls.get(name);boundaries.set(key,{file,name,owner:'getIsGit',original:{start:n.getStart(m.ast),end:n.end,source:n.getText(m.ast),sha256:hash(n.getText(m.ast)),moduleSha256:m.entry.sha256}});return;}
 if(canonical.get(file)?.has(name)){boundaries.set(key,{file,name});return;}
 const n=m.decls.get(name);
 if([...recover.values()].some(r=>r.file===file&&r.names.includes(name)))return;
 if(n){
  const text=n.getText(m.ast),row={file,name,names:bindingNames(n.name),start:n.getStart(m.ast),end:n.end,moduleSha256:m.entry.sha256,sha256:hash(text),source:text,variable:ts.isVariableDeclaration(n)};
  recover.set(key,row);if(file==='chunk-tf63hv0k.js'&&name==='vlr'){const target=read('chunk-h4hpfzhs.js');for(const exportName of ['Zip','ZipDeflate'])bind(target.file,target.exports.get(exportName));row.transport={from:'import("/$bunfs/root/chunk-h4hpfzhs.js")',to:'loadExplicitDependency287("/$bunfs/root/chunk-h4hpfzhs.js")',count:1};}for(const dep of free((row.variable?'var ':'')+text+';')){edges.push({from:key,to:file+':'+dep});bind(file,dep);}return;
 }
 const imp=m.imports.get(name);if(!imp)throw Error('Unbound '+key);
 if(isBuiltin(imp.file)){builtins.set(key,{file:imp.file,name:imp.name});return;}
 const t=read(imp.file),targetName=t.exports.get(imp.name);if(!targetName)throw Error('Missing raw export '+imp.file+':'+imp.name);bind(imp.file,targetName);
 m.bindings.set(name,{file:imp.file,name:targetName});
 // Each local alias is a lazy binding, not a redeclaration of the state owner.
}
for(const[file,names]of Object.entries(roots))for(const name of names){const m=read(file);bind(file,m.exports.get(name)??name);}
// Required fflate table mutations: source expressions/loops, not a whole module.
const zip=read('chunk-h4hpfzhs.js');
for(const n of zip.ast.statements){
 if(![1184,1253,1776,1807,1840,1873,1919].includes(n.getStart(zip.ast)))continue;
 const source=n.getText(zip.ast),name='@init-'+n.getStart(zip.ast),key=zip.file+':'+name;
 const row={file:zip.file,name,names:[],start:n.getStart(zip.ast),end:n.end,moduleSha256:zip.entry.sha256,sha256:hash(source),source,variable:false};recover.set(key,row);
 for(const dep of free(source))bind(zip.file,dep);
}
const byFile=new Map();for(const row of recover.values()){if(!byFile.has(row.file))byFile.set(row.file,[]);byFile.get(row.file).push(row)}
// A recovered variable may be a memo/cache/owner. Report it for explicit scope review.
const proof={version:'2.1.287',manifestSha256:hash(bytes),canonicalNativeSha256:hash(native),roots,boundaries:[...boundaries.values()],builtins:[...builtins].map(([key,value])=>({key,...value})),modules:[...byFile].map(([file,rows])=>({file,rows})),edges};

const sourceMappings={};
for(const[file,rows]of byFile){
 const m=read(file),locals=new Set(rows.flatMap(r=>r.names)),names=new Set();
 for(const r of rows)for(const n of free((r.variable?'var ':'')+r.source+';'))if(!locals.has(n))names.add(n);
 sourceMappings[file]=Object.fromEntries([...names].map(name=>{
  const key=file+':'+name;if(boundaries.has(key))return [name,{source:boundaries.get(key)}];
  if(builtins.has(key))return [name,{builtin:builtins.get(key)}];
  const binding=m.bindings.get(name);if(binding){const target=boundaries.get(binding.file+':'+binding.name);return [name,target?{source:target}:{module:binding}];}
  throw Error('Unmapped local '+key);
 }));
 if(rows.some(r=>r.transport))sourceMappings[file].loadExplicitDependency287={dynamic:true};
}
const builtinModules=[...new Set([...builtins.values()].map(b=>b.file))];
const imports=builtinModules.map((file,i)=>`import * as builtin${i} from ${JSON.stringify(file)};`).join('\n');
const factoryBodies=Object.fromEntries([...byFile].map(([file,rows])=>{
 const body='with(imports){\n'+rows.sort((a,b)=>a.start-b.start).map(r=>(r.variable?'var ':'')+(r.transport?r.source.replace(r.transport.from,r.transport.to):r.source)+';').join('\n')+'\nreturn {'+rows.flatMap(r=>r.names).join(',')+'};}';
 new Function('imports',body);return [file,body];
}));
const generated=`// Exact whole declarations; only missing helpers. All existing actors are borrowed.\n${imports}\nconst builtinModules={${builtinModules.map((file,i)=>JSON.stringify(file)+':builtin'+i).join(',')}};\nconst factoryBodies=${JSON.stringify(factoryBodies,null,2)};\nconst mappings=${JSON.stringify(sourceMappings,null,2)};\nexport function createPrintExplicitHelpers287(readSource){\n const instances=new Map();\n function module(file){\n  if(instances.has(file))return instances.get(file);\n  const bindings=mappings[file];\n  const values=new Proxy({}, {has:(_target,name)=>typeof name==='string'&&Object.hasOwn(bindings,name),get:(_target,name)=>{\n   if(typeof name!=='string'||!Object.hasOwn(bindings,name))return undefined;\n   const b=bindings[name];\n   if(b.dynamic)return async(specifier)=>{if(specifier!=='/$bunfs/root/chunk-h4hpfzhs.js')throw Error('Unexpected feedback compression dependency '+specifier);const zip=module('chunk-h4hpfzhs.js');return {Zip:zip.tn,ZipDeflate:zip.nn};};\n   if(b.source)return readSource(b.source.file,b.source.name);\n   if(b.builtin)return b.builtin.name==='*'?builtinModules[b.builtin.file]:builtinModules[b.builtin.file][b.builtin.name];\n   return module(b.module.file)[b.module.name];\n  }});\n  const result=new Function('imports',factoryBodies[file])(values);instances.set(file,result);return result;\n }\n return {source:(file,name)=>{const value=module(file);if(!Object.hasOwn(value,name))throw Error('Recovered helper not selected '+file+':'+name);return value[name];}};\n}\n`;
// Verify every canonical binding against actual factory return fields, not raw exports.
const canonicalChecks=[...boundaries.values()].filter(b=>!b.owner).map(b=>({...b,actualSelected:canonical.get(b.file)?.has(b.name)===true}));
if(canonicalChecks.some(b=>!b.actualSelected))throw Error('Unselected source boundary');
return {native:generated,proof,transport:{version:'2.1.287',roots,canonicalChecks,ownerBoundaries:[...boundaries.values()].filter(b=>b.owner),helperNativeSha256:hash(generated),staticBuiltinModules:builtinModules,lazy:true}};
}

function recoverBranches287(){
const file='chunk-xapeakym.js',source=fs.readFileSync(dir+'/raw/'+file,'utf8'),entry=JSON.parse(bytes).modules.find(m=>m.path===file);
if(hash(source)!==entry.sha256)throw Error('Fixed287 raw drift');
const names=['submit_feedback','ultrareview_launch','message_rated'],rows=names.map(subtype=>{
 const start=source.indexOf(`}else if(A.request.subtype===\"${subtype}\"){`)+1;if(start===0)throw Error('missing original branch '+subtype);
 const end=source.indexOf('}else if(A.request.subtype=',start)+1,body=source.slice(start,end);if(end===0)throw Error('missing end '+subtype);
 return {subtype,start,end,sha256:hash(body),body};
});
const nativeBodies=Object.fromEntries(rows.map(r=>[r.subtype,r.body]));
const from='await import("/$bunfs/root/chunk-gf9kpcg4.js")',to='await loadOriginalModule287("chunk-gf9kpcg4.js")';
if(nativeBodies.submit_feedback.split(from).length!==2)throw Error('draft-import cardinality');nativeBodies.submit_feedback=nativeBodies.submit_feedback.replace(from,to);
const body=`if (!A || !A.request || !["submit_feedback","ultrareview_launch","message_rated"].includes(A.request.subtype)) return false;\nfor (const __controlRequestSlot of [0]) { if (false) {} ${Object.values(nativeBodies).join('\n')} }\nreturn true;`;
new Function('ports',`with (ports) { return function(A) { ${body} } }`);
const native=`// GENERATED from exact fixed287 hI branches. Only the draft import is transported.\nconst printExplicitControlBranches287=Object.freeze(${JSON.stringify(nativeBodies,null,2)});\nexport {printExplicitControlBranches287};\nexport function createPrintExplicitControlDispatcher287(ports){\n const body=${JSON.stringify(body)};\n return new Function('ports',\`with (ports) { return function(A) { \${body} } }\`)(ports);\n}\n`;
return {native,rows,transport:{from,to,count:1},file,moduleSha256:entry.sha256,body,nativeBodies};
}

const helper=recoverHelpers287(),branch=recoverBranches287();
const helpersDts='export declare function createPrintExplicitHelpers287(readSource:(file:string,name:string)=>unknown):{\n source(file:string,name:string):unknown\n}\n';
const branchesDts='export declare const printExplicitControlBranches287:Readonly<Record<string,string>>\nexport declare function createPrintExplicitControlDispatcher287(ports:object):(request:import(\'../../entrypoints/sdk/controlTypes.js\').SDKControlRequest)=>boolean\n';
const destination='src/cli/printOwnership287/';
const generatedSources={
 'explicitHelpersNative287.js':helper.native,
 'explicitHelpersNative287.d.ts':helpersDts,
 'print-explicit-control.native.js':branch.native,
 'print-explicit-control.native.d.ts':branchesDts,
};
const finalSources=Object.entries({...generatedSources,[runtimeFile]:runtime}).map(([file,text])=>({file:destination+file,sha256:hash(text),bytes:Buffer.byteLength(text)}));
function parseNative(file,text){
 const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
 if(ast.parseDiagnostics.length)throw Error('Generated syntax errors '+file);
 return ast;
}
function namedDeclaration(ast,name){
 for(const statement of ast.statements)if(ts.isVariableStatement(statement))for(const n of statement.declarationList.declarations)if(n.name.getText(ast)===name)return n;
 throw Error('Generated declaration absent '+name);
}
function literalTable(ast,object){
 if(!ts.isObjectLiteralExpression(object))throw Error('Expected literal table');
 const rows=new Map();
 for(const n of object.properties){
  if(!ts.isPropertyAssignment(n)||!ts.isStringLiteral(n.name)||!ts.isStringLiteral(n.initializer))throw Error('Expected exact string table property');
  if(rows.has(n.name.text))throw Error('Duplicate generated table key '+n.name.text);
  rows.set(n.name.text,n.initializer);
 }
 return rows;
}
function rawRow287(file,start,end,sha256,source){
 const entry=manifest.modules.find(m=>m.path===file),bytes=fs.readFileSync(path.join(dir,'raw',file));
 if(!entry||bytes.length!==entry.length||hash(bytes)!==entry.sha256)throw Error('Original module drift '+file);
 const raw=new TextDecoder('utf8',{fatal:true}).decode(bytes).slice(start,end);
 if(raw!==source||hash(raw)!==sha256)throw Error('Original range mismatch '+file+':'+start);
 return {file,moduleSha256:entry.sha256,start,end,sha256};
}
function transform287(source,transport){
 if(!transport)return source;
 if(transport.count!==1||source.split(transport.from).length!==2)throw Error('Forward transport cardinality');
 return source.replace(transport.from,transport.to);
}
function inverse287(source,transport){
 if(!transport)return source;
 if(transport.count!==1||source.split(transport.to).length!==2)throw Error('Inverse transport cardinality');
 return source.replace(transport.to,transport.from);
}
/** Bind both decoded Function body coordinates and the actual generated JS literal.
 * Exact inverse rejects substring-only evidence and checks transported raw bytes. */
function generatedBinding287(ast,text,literal,decodedStart,expected,raw,transport,kind){
 if(!ts.isStringLiteral(literal))throw Error('Expected string literal binding');
 const decodedEnd=decodedStart+expected.length;
 if(literal.text.slice(decodedStart,decodedEnd)!==expected)throw Error('Decoded generated binding mismatch '+kind);
 const start=literal.getStart(ast)+1+(JSON.stringify(literal.text.slice(0,decodedStart)).length-2);
 const end=start+(JSON.stringify(expected).length-2),encoded=text.slice(start,end);
 const decoded=JSON.parse('"'+encoded+'"');
 if(decoded!==expected||inverse287(decoded,transport)!==raw)throw Error('Generated-to-raw inverse mismatch '+kind);
 return {file:destination+ast.fileName,sourceSha256:hash(text),kind,
  literalStart:literal.getStart(ast),literalEnd:literal.end,
  start,end,encodedSha256:hash(encoded),decodedStart,decodedEnd,decodedSha256:hash(decoded),
  forwardExact:true,inverseExact:true};
}
const helperAst=parseNative('explicitHelpersNative287.js',helper.native);
const helperLiterals=literalTable(helperAst,namedDeclaration(helperAst,'factoryBodies').initializer);
const helperModules=helper.proof.modules.map(m=>{
 const literal=helperLiterals.get(m.file);if(!literal)throw Error('Helper factory missing '+m.file);
 const rows=[...m.rows].sort((a,b)=>a.start-b.start);let cursor='with(imports){\n'.length;
 const boundRows=rows.map(row=>{
  const raw=rawRow287(row.file,row.start,row.end,row.sha256,row.source);
  const emitted=transform287(row.source,row.transport),prefix=row.variable?'var ':'';
  const binding=generatedBinding287(helperAst,helper.native,literal,cursor+prefix.length,emitted,row.source,row.transport,'factoryBodies['+m.file+']');
  cursor+=prefix.length+emitted.length+2; // semicolon + newline emitted after every original node
  return {...row,raw,generatedBindings:[binding]};
 });
 const exact='with(imports){\n'+rows.map(row=>(row.variable?'var ':'')+transform287(row.source,row.transport)+';').join('\n')+'\nreturn {'+rows.flatMap(row=>row.names).join(',')+'};}';
 if(literal.text!==exact)throw Error('Whole helper factory changed '+m.file);
 return {...m,rows:boundRows,factoryDecodedSha256:hash(exact)};
});
if(helperModules.length!==helperLiterals.size)throw Error('Unaccounted helper factory');
const branchAst=parseNative('print-explicit-control.native.js',branch.native);
const tableInit=namedDeclaration(branchAst,'printExplicitControlBranches287').initializer;
if(!ts.isCallExpression(tableInit)||tableInit.expression.getText(branchAst)!=='Object.freeze')throw Error('Branch table wrapper changed');
const branchLiterals=literalTable(branchAst,tableInit.arguments[0]);
const dispatcher=branchAst.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='createPrintExplicitControlDispatcher287');
const dispatcherBody=dispatcher?.body?.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[]).find(n=>n.name.getText(branchAst)==='body')?.initializer;
if(!dispatcherBody||dispatcherBody.text!==branch.body)throw Error('Actual dispatcher body changed');
let branchCursor=branch.body.indexOf(branch.nativeBodies.submit_feedback);
const branchRows=branch.rows.map(row=>{
 const raw=rawRow287(branch.file,row.start,row.end,row.sha256,row.body);
 const transport=row.subtype==='submit_feedback'?branch.transport:undefined;
 const emitted=transform287(row.body,transport),literal=branchLiterals.get(row.subtype);
 if(!literal||literal.text!==emitted)throw Error('Whole native branch changed '+row.subtype);
 const table=generatedBinding287(branchAst,branch.native,literal,0,emitted,row.body,transport,'branchTable['+row.subtype+']');
 const dispatched=generatedBinding287(branchAst,branch.native,dispatcherBody,branchCursor,emitted,row.body,transport,'actualDispatcherBody['+row.subtype+']');
 branchCursor+=emitted.length+1;
 return {...row,file:branch.file,moduleSha256:branch.moduleSha256,raw,...(transport?{transport}:{}),generatedBindings:[table,dispatched]};
});
if(branchLiterals.size!==branchRows.length)throw Error('Unaccounted native branch');
const generatorFile=destination+'recoverExplicitControl287.mjs',generatorSha256=hash(fs.readFileSync(import.meta.filename));
const common={version:'2.1.287',manifestSha256:hash(bytes),offsetUnit:'UTF-16 end-exclusive',
 generator:{file:generatorFile,sha256:generatorSha256},finalSources,
 scope:'mechanically restored client source; provenance does not claim runtime invocation or full production acceptance'};
const helpersProvenance={...common,...helper.proof,modules:helperModules,
 generated:{file:destination+'explicitHelpersNative287.js',sha256:hash(helper.native)},
 transport:helper.transport,
 forwardInverse:{bindings:helperModules.flatMap(m=>m.rows).length,allForwardExact:true,allInverseExact:true},
 branchProvenance:destination+'print-explicit-control.provenance287.json'};
const branchProvenance={...common,file:branch.file,moduleSha256:branch.moduleSha256,rows:branchRows,
 generated:{file:destination+'print-explicit-control.native.js',sha256:hash(branch.native),dispatcherBodySha256:hash(branch.body)},
 forwardInverse:{branches:branchRows.length,bindings:branchRows.length*2,tableAndActualDispatcherBound:true,allForwardExact:true,allInverseExact:true},
 helpersProvenance:destination+'explicitHelpersProvenance287.json',
 telemetry:'existing logEvent no-op C; explicit feedback client transport preserved'};
const outputs={...generatedSources,
 'explicitHelpersProvenance287.json':JSON.stringify(helpersProvenance,null,2)+'\n',
 'print-explicit-control.provenance287.json':JSON.stringify(branchProvenance,null,2)+'\n',
};
if(check){
 // Validate every output before reporting green. No mkdir/write/temp artifact in this branch.
 for(const[file,data]of Object.entries(outputs))if(fs.readFileSync(path.join(out,file),'utf8')!==data)throw Error('Stale generated output '+file);
}else{
 fs.mkdirSync(out,{recursive:true});
 for(const[file,data]of Object.entries(outputs))fs.writeFileSync(path.join(out,file),data);
}
console.log(JSON.stringify({version:'2.1.287',mode:check?'check-read-only':'generate',
 outputs:Object.keys(outputs).map(file=>destination+file),helperBindings:helpersProvenance.forwardInverse.bindings,
 branchBindings:branchProvenance.forwardInverse.bindings,allForwardExact:true,allInverseExact:true}));
