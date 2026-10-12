import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
const base=path.resolve(import.meta.dirname,'../../../../.work/official-modules-2.1.287/darwin-arm64')
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),bytes=fs.readFileSync(base+'/manifest.json')
const pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(bytes)!==pin)throw Error('Stream manifest drift')
const manifest=JSON.parse(bytes),rows=[]
function load(file){const entry=manifest.modules.find(x=>x.path===file),b=fs.readFileSync(base+'/raw/'+file);if(sha(b)!==entry.sha256||b.length!==entry.length)throw Error('Stream module drift');return{file,entry,ast:ts.createSourceFile(file,b.toString(),99,true,1)}}
const m=load('chunk-xapeakym.js'),owner=m.ast.statements.find(x=>ts.isFunctionDeclaration(x)&&x.name?.text==='TS')
function record(name,n){if(!n)throw Error('Source stream missing '+name);const source=n.getText(m.ast);rows.push({name,file:m.file,start:n.getStart(m.ast),endExclusive:n.end,sha256:sha(source),source,moduleSha256:m.entry.sha256,moduleLength:m.entry.length});return source}
function decl(name){return owner.body.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n]).find(n=>n.name?.getText(m.ast)===name)}
function find(text,predicate){let found;function visit(n){if(found)return;if(predicate(n)&&n.getText(m.ast)===text){found=n;return}ts.forEachChild(n,visit)}visit(owner);if(!found)throw Error(text);return found}
const cells=['Pe','Q','Ue','_e'].map(name=>'let '+record(name,decl(name))+';').join('\n')
const take=record('Te',decl('Te')),drain=record('Wn',decl('Wn'))
const start=record('streamInput',find('_e.streamInput(Ue).catch(d)',ts.isCallExpression))
const send=record('enqueue',find('Ue.enqueue({type:"user",message:{role:"user",content:dt},parent_tool_use_id:null,origin:De?.origin})',ts.isCallExpression))
const clear=record('clearTurnThrow',find('Te()',ts.isCallExpression))
const next=record('next',find('_e.next()',ts.isCallExpression))
const done=record('done',find('if(co)throw Error("headless session: the engine loop ended before the turn result");',ts.isIfStatement))
const inputDone=record('inputDone',find('Ue.done()',ts.isCallExpression))
const returned=record('return',find('_e.return(void 0).catch(d)',ts.isCallExpression))
const source='with(p){'+cells+'\n'+take+'\n'+drain+'\n'+start+';return {engine:_e,prepare(params,dt,De){if(Pe!==null)throw Error("headless session: prepared turn still pending");Pe=params;'+clear+';'+send+'},async next(){let {value:xe,done:co}=await '+next+';'+done+'return xe},takeTurnThrow:Te,drain:Wn,close(){'+inputDone+';return '+returned+'}}}'
const outer=m.ast.statements.find(x=>ts.isFunctionDeclaration(x)&&x.name?.text==='hI')
function findOuter(text,predicate){let found;function visit(n){if(predicate(n)&&n.getText(m.ast)===text)found=n;ts.forEachChild(n,visit)}visit(outer);if(!found)throw Error(text);return found}
const sent=record('remote.sent',findOuter('r.setOnControlRequestSent((wt)=>{kt.sendControlRequest(wt)})',ts.isCallExpression))
const replay=record('remote.pendingReplay',findOuter('for(let wt of[...r.getPendingPermissionRequests(),...r.getPendingUserDialogRequests()])kt.sendControlRequest(wt);',ts.isForOfStatement))
const resolved=record('remote.resolved',findOuter('r.setOnControlRequestResolved((wt)=>{kt.sendControlCancelRequest(wt)})',ts.isCallExpression))
const snapshot=record('remote.snapshot',findOuter('St=Ct.slice()',ts.isVariableDeclaration))
const initial=record('remote.initialSnapshot',findOuter('J=St.length>0?St:void 0,dn=J',ts.isBinaryExpression))
const release=record('remote.clearSnapshot',findOuter('if(ft==="connected"&&J!==void 0&&dn===J)dn=void 0;',ts.isIfStatement))
const output='// Original TS input cells and complete Te/Wn; Q6e and Pw are canonical shared owners.\nexport function createPrintStreamInput287(p){return new Function("p",'+JSON.stringify(source)+')(p)}\n'+
 'export function installPrintBridgeRequests287(r,kt){'+sent+';'+replay+resolved+'}\n'+
 'export function createPrintBridgeSnapshot287(p){return new Function("p",'+JSON.stringify('with(p){let J;let '+snapshot+';'+initial+';return {messages:J,stateChanged(ft){'+release+'},failed(){if(dn===J)dn=void 0}}}')+')(p)}\n'
for(const[name,text]of [['streamInputNative.js',output],['streamInputProvenance.json',JSON.stringify({version:'2.1.287',manifestSha256:pin,offsetUnit:'UTF16 end-exclusive',scope:'TS input/next/abandonment cells; not full TS/Df',rows},null,2)+'\n']]){const dest=path.join(import.meta.dirname,name);if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==text)throw Error(name)}else fs.writeFileSync(dest,text)}
console.log(JSON.stringify({rows:rows.length,sha256:sha(output)}))
