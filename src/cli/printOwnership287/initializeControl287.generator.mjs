#!/usr/bin/env node
// Complete fixed-287 RI/Cp/Ww/qw on one existing receiver; no product imports/evaluation.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {createRequire,isBuiltin} from 'node:module';
const args=process.argv.slice(2),option=name=>{const i=args.indexOf(name);if(i<0)return;const v=args[i+1];if(!v||v.startsWith('--'))throw Error('Missing '+name);return v};
for(let i=0;i<args.length;i++){if(!['--check','--repo','--corpus','--output-dir'].includes(args[i]))throw Error('Unknown '+args[i]);if(args[i]!=='--check')i++;}
const repo=path.resolve(option('--repo')??path.resolve(import.meta.dirname,'../../..')),dir=path.resolve(option('--corpus')??repo+'/../.work/official-modules-2.1.287/darwin-arm64'),out=path.resolve(option('--output-dir')??import.meta.dirname),check=args.includes('--check');
const ts=createRequire(repo+'/package.json')('typescript'),hash=s=>crypto.createHash('sha256').update(s).digest('hex'),bytes=fs.readFileSync(dir+'/manifest.json'),manifest=JSON.parse(bytes),expected='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5';if(hash(bytes)!==expected)throw Error('Pinned manifest changed');
const maturePath=repo+'/scripts/official/hooks-lifecycle-287.mjs',base=fs.readFileSync(maturePath,'utf8'),modules=new Map();
const bindingNames=new Function('ts','return '+base.slice(base.indexOf('function bindingNames('),base.indexOf('\nfunction read(')))(ts);
const read=new Function('modules','manifest','fs','path','dir','hash','ts','bindingNames','incrementalSupplierSeed287','return '+base.slice(base.indexOf('function read('),base.indexOf('\nconst globals=')))(modules,manifest,fs,path,dir,hash,ts,bindingNames,undefined);
const {free}=new Function('ts',base.slice(base.indexOf('const globals='),base.indexOf('\n\nconst boundaries='))+';return {free};')(ts);
const nativePath=repo+'/src/utils/plugins/officialHooksLifecycle287/native.js',native=fs.readFileSync(nativePath,'utf8'),canonical=new Map();
// Additive publication can emit module factories out of numeric order. Read
// the actual final return of each same-owner factory, not a regex slice ending
// at module(index+1), which can misreport present Chrome source as missing.
const canonicalAst=ts.createSourceFile(nativePath,native,99,true,ts.ScriptKind.JS);
if(canonicalAst.parseDiagnostics.length)throw Error('Invalid canonical namespace AST');
const canonicalHost=canonicalAst.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='createHooksLifecycle287');
if(!canonicalHost?.body)throw Error('Missing canonical owner');
const factoryExports=new Map();
for(const node of canonicalHost.body.statements){
 if(!ts.isFunctionDeclaration(node)||!/^module\d+$/.test(node.name?.text??'')||!node.body)continue;
 const ret=node.body.statements.findLast(ts.isReturnStatement);
 if(!ret?.expression||!ts.isObjectLiteralExpression(ret.expression))throw Error('Invalid canonical factory return');
 factoryExports.set(Number(node.name.text.slice(6)),new Set(ret.expression.properties.map(p=>p.name?.getText(canonicalAst)).filter(Boolean)));
}
for(const match of native.matchAll(/case "(chunk-[^"]+\.js)":return m(\d+);/g))canonical.set(match[1],factoryExports.get(Number(match[2]))??new Set());

const file='chunk-xapeakym.js',m=read(file),rootNames=['RI','Cp','Ww','qw','Bg','Dy'],rows=rootNames.map(name=>{let n=m.decls.get(name);if(!n||!ts.isFunctionDeclaration(n))throw Error('Missing complete root '+name);return{file,name,start:n.getStart(m.ast),end:n.end,sha256:hash(n.getText(m.ast)),moduleSha256:m.entry.sha256,source:n.getText(m.ast),variable:false}}),local=new Set([...rootNames,'Ci']),bindings={},edges=[],builtins={},callerCuts={LZr:{owner:'existing printInterruptSweep287.native',member:'declarePerTaskStopAffordance',original:'chunk-xapeakym.js:LZr'}};
let ciNode;function findCi(node){if(ts.isVariableDeclaration(node)&&node.name.getText(m.ast)==='Ci'&&node.getStart(m.ast)>=376077&&node.end<=536834)ciNode=node;ts.forEachChild(node,findCi)}findCi(m.decls.get('hI'));if(!ciNode)throw Error('Missing exact hI.Ci');rows.push({file,name:'Ci',start:ciNode.getStart(m.ast),end:ciNode.end,sha256:hash(ciNode.getText(m.ast)),moduleSha256:m.entry.sha256,source:ciNode.getText(m.ast),variable:true});
const resolve=(f,n)=>{const md=read(f),node=md.decls.get(n);if(node)return{file:f,name:n,node,md};const imp=md.imports.get(n);if(!imp)throw Error('Unbound '+f+':'+n);if(isBuiltin(imp.file))return{builtin:imp};if(!imp.file.startsWith('chunk-'))throw Error('Unexpected noncanonical import '+f+':'+n+' from '+imp.file);const target=read(imp.file).exports.get(imp.name);if(!target)throw Error('Missing raw exported '+imp.file+':'+imp.name);return resolve(imp.file,target)};
for(const row of rows)for(const name of free((row.variable?'var ':'')+row.source+';')){
 if(local.has(name))continue;const r=resolve(file,name);if(r.builtin){builtins[name]=r.builtin;continue;}const source=r.node.getText(r.md.ast),receipt={file:r.file,name:r.name,start:r.node.getStart(r.md.ast),end:r.node.end,moduleSha256:r.md.entry.sha256,sha256:hash(source),canonicalPresent:canonical.get(r.file)?.has(r.name)??false};
 edges.push({from:file+':'+row.name,lexical:name,to:r.file+':'+r.name});if(Object.hasOwn(callerCuts,name)){callerCuts[name].receipt=receipt;continue;}bindings[name]=receipt;
}
const chrome=read('chunk-9pwdyydg.js'),chromeName=chrome.exports.get('claudeInChromeDefaultForHost');if(!chromeName)throw Error('Missing original Chrome startup export');const chromeNode=chrome.decls.get(chromeName),chromeReceipt={file:chrome.file,name:chromeName,start:chromeNode.getStart(chrome.ast),end:chromeNode.end,moduleSha256:chrome.entry.sha256,sha256:hash(chromeNode.getText(chrome.ast)),canonicalPresent:canonical.get(chrome.file)?.has(chromeName)??false};
const missing=Object.values(bindings).filter(r=>!r.canonicalPresent),unique=[...new Map([...missing,...(!chromeReceipt.canonicalPresent?[chromeReceipt]:[])].map(r=>[r.file+':'+r.name,r])).values()];
let body=rows.map(r=>(r.variable?'var ':'')+r.source+';').join('\n')+'\nreturn {initialize:RI,buildResponse:Cp,seatAgent:Ww,isSingleEmptyPrompt:qw,modelAvailability:Ci,settleBeforeReply:Bg,createModelNotices:Dy};';
// Only Cp's literal dynamic import path transport is relocated; original gates/catch/logic intact.
const dynamic='import("/$bunfs/root/chunk-9pwdyydg.js")';if(body.split(dynamic).length!==2)throw Error('Unexpected Cp dynamic import count');body=body.replace(dynamic,'loadInitializeModule287("chunk-9pwdyydg.js")');
const generated='// Complete original RI/Cp/Ww/qw. No mutable business state or default-success ports.\nconst factory=new Function("ports",'+JSON.stringify('with(ports){\n'+body+'\n}')+');\nexport function createInitializeControlNative287(ports){return factory(ports)}\n';
const proof={version:'2.1.287',platform:'darwin-arm64',manifestSha256:hash(bytes),rangeConvention:'UTF-16 end-exclusive',roots:{initialize:[file,'RI'],buildResponse:[file,'Cp'],seatAgent:[file,'Ww'],isSingleEmptyPrompt:[file,'qw']},rows,edges,bindings,builtins,callerCuts,missingCanonicalRoots:unique,canonicalNative:{path:nativePath,sha256:hash(native)},matureReadAndFree:{path:maturePath,sha256:hash(base)},dynamicTransport:{receipt:chromeReceipt,from:dynamic,to:'loadInitializeModule287("chunk-9pwdyydg.js")',count:1,owner:'existing canonical namespace; dependency module getPrintHostSource287; no eager import'},bodySha256:hash(body),generatedSha256:hash(generated),scope:'Source-prepared whole closure, same borrowed canonical owners. Missing canonical exports require external patch before runtime. No fixtures/providers/native factory executed.'};
const outputs={'initializeControl287Native.js':generated,'initializeControl287Bindings.json':JSON.stringify(bindings,null,2)+'\n','initializeControl287Provenance.json':JSON.stringify(proof,null,2)+'\n'};
for(const[name,content]of Object.entries(outputs)){const p=path.join(out,name);if(check){if(!fs.existsSync(p)||fs.readFileSync(p,'utf8')!==content)throw Error('Generated drift '+p)}else fs.writeFileSync(p,content)}
console.log(JSON.stringify({check,roots:rows.map(r=>[r.name,r.start,r.end,r.sha256]),bindings:Object.keys(bindings).length,missing:unique.map(r=>r.file+':'+r.name),callerCuts}));
