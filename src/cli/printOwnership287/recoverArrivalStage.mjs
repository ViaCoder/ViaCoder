import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
const base=path.resolve(import.meta.dirname,'../../../../.work/official-modules-2.1.287/darwin-arm64')
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),manifestBytes=fs.readFileSync(base+'/manifest.json')
const pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(manifestBytes)!==pin)throw Error('Arrival manifest changed')
const file='chunk-xapeakym.js',entry=JSON.parse(manifestBytes).modules.find(x=>x.path===file),bytes=fs.readFileSync(base+'/raw/'+file)
if(sha(bytes)!==entry.sha256||bytes.length!==entry.length)throw Error('Arrival module changed')
const ast=ts.createSourceFile(file,bytes.toString(),99,true,1),owner=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='TS'),rows=[]
function record(name,n,role='production'){if(!n)throw Error('Arrival source missing '+name);const source=n.getText(ast);rows.push({name,file,start:n.getStart(ast),endExclusive:n.end,sha256:sha(source),source,moduleSha256:entry.sha256,moduleLength:entry.length,role});return source}
function decl(name){let result;for(const n of owner.body.statements){if(ts.isFunctionDeclaration(n)&&n.name?.text===name)result=n;if(ts.isVariableStatement(n))for(const d of n.declarationList.declarations)if(d.name.getText(ast)===name)result=d}return result}
function find(text,predicate=()=>true){let result;function visit(n){if(n.getText(ast)===text&&predicate(n))result=n;ts.forEachChild(n,visit)}visit(owner);return result}
const functions=['to','Yt','Ft','xo','qe','Ur','Sr','Oo'].map(name=>record(name,decl(name))).join('\n')
const controller=record('he',decl('he'))+';'
const lifecycle=['ge','fe','Se','gs'].map(name=>record(name,decl(name))).join('\n')
const bindAbort=record('bindExternalAbort',find('e.abortController?.signal.addEventListener("abort",fe,{once:!0}),ge()',ts.isBinaryExpression))
const unbindAbort=record('unbindExternalAbort',find('e.abortController?.signal.removeEventListener("abort",fe)',ts.isCallExpression))
const settleDefault='const '+record('BT',ast.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n]).find(n=>n.name?.getText(ast)==='BT'))+';'
const duration=record('ps',ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='ps'))
const cells=['Wr','Gt','Or','Zr','Ne','et','bt','dr','ir','Xt'].map(name=>'let '+record(name,decl(name))+';').join('\n')
const append=record('appendMessages',find('(dt)=>{if(Zr!==void 0)Zr.push(...dt);else if(Or!==void 0)Or.push({rows:dt,isAnswered:!1});else Yt(dt)}',ts.isArrowFunction))
const replace=record('setMessages',find('(xe)=>{let co=xe(s);if(co!==s){if(co.length===0)g.cut();s.length=0,s.push(...co)}}',ts.isArrowFunction))
const apply=record('applyMessageOp',find('(xe)=>{let co=($i)=>{let Po=V4t(s,$i);if(Po!==s)s.length=0,s.push(...Po)},Dn=z4t(xe,co),bo=Dn===void 0?g.behindAppends(()=>co(xe)):iq(g,Dn.rows,{keep:Dn.keep});if(bo instanceof Promise)bo.catch(d)}',ts.isArrowFunction))
const beginGuard=record('busyGuard',find('if(Wr)throw Error("headless session: a turn is already in flight");',ts.isIfStatement))
const enter=record('enter',find('Wr=!0',ts.isBinaryExpression))
const hold=record('hold',find('Or=[]',ts.isBinaryExpression))
const defer=record('defer',find('if(uf())Zr=[];',ts.isIfStatement))
const writer=record('writer',find('fS({conversation:s,messages:qr,persistSession:Fr,storageV5:e.storageV5})',ts.isCallExpression))
const input=record('input',find('Fn=await iq(g,Nr)',ts.isVariableDeclaration))
const transformed=record('transformedInput',find('if(Fn!==Nr)Nr.splice(0,Nr.length,...Fn);',ts.isIfStatement))
const install=record('installWriter',find('Gt=Fr?Rr:void 0',ts.isBinaryExpression))
const complete=['Ft()','Gt=void 0','xo(!1)','Zr=void 0','Wr=!1','_xo()'].map((text,index)=>record('complete.'+index,find(text))).join(',')
record('fS',ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='fS'),'canonical-reference')
for(const [other,names]of [['chunk-n2zepamy.js',['V4t','z4t']],['chunk-mphp7acd.js',['iq','lnn']]]){
 const m=JSON.parse(manifestBytes).modules.find(x=>x.path===other),b=fs.readFileSync(base+'/raw/'+other)
 if(sha(b)!==m.sha256||b.length!==m.length)throw Error('Arrival dependency module drift '+other)
 const a=ts.createSourceFile(other,b.toString(),99,true,1)
 for(const name of names){const n=a.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);if(!n)throw Error('Arrival dependency absent '+name);const source=n.getText(a);rows.push({name,file:other,start:n.getStart(a),endExclusive:n.end,sha256:sha(source),source,moduleSha256:m.sha256,moduleLength:m.length,role:'canonical-reference'})}
}
// Canonical reader/turn/public append functions are references, never new owners.
for(const [other,names]of [
 ['chunk-w8a1w7ad.js',['hi','Pd','Ur','wd','Id','zn']],
 ['chunk-n2zepamy.js',['AJo','flr','mlr','TJo']],
 ['chunk-5ne43w2c.js',['Fbr','Un','qn','On','Ms','Tt']],
 ['chunk-30tbytby.js',['jt','vt']],
]){
 const m=JSON.parse(manifestBytes).modules.find(x=>x.path===other),b=fs.readFileSync(base+'/raw/'+other)
 if(sha(b)!==m.sha256||b.length!==m.length)throw Error('Arrival reader module drift '+other)
 const a=ts.createSourceFile(other,b.toString(),99,true,1)
 const declarations=a.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n])
 for(const name of names){const n=declarations.find(n=>n.name?.getText(a)===name);if(!n)throw Error('Arrival reader source absent '+name);const source=n.getText(a);rows.push({name:'reader.'+name,file:other,start:n.getStart(a),endExclusive:n.end,sha256:sha(source),source,moduleSha256:m.sha256,moduleLength:m.length,role:'canonical-reference'})}
}
record('caller.io',(()=>{let result;function visit(n){if(ts.isVariableDeclaration(n)&&n.getText(ast)==='io=dye({keep:(b)=>{Ct.push(...b)},rows:()=>Ct,list:Ct,isHookable:!0})')result=n;ts.forEachChild(n,visit)}visit(ast);return result})(),'canonical-caller-reference')
for(const [name,text,predicate]of [
 ['span','No={before:s.at(-1)?.uuid,next:void 0}',ts.isVariableDeclaration],
 ['turnEvents','bt=AJo((dt)=>{Ne.push(...dt)})',ts.isVariableDeclaration],
 ['turnBegin','ua=qe("turn.start",()=>mlr({turnEvents:bt,newMessages:Nr,input:typeof dt==="string"?dt:void 0,signal:Pt.signal,abort:()=>Pt.abort(fl("turn-abort"))}),void 0)',ts.isVariableDeclaration],
 ['turnComplete','Fbr({turnEvents:bt,turnId:ua,transcript:{getSnapshot:()=>s},span:No,durationMs:ps(br,performance.now()),isAborted:Pt.signal.aborted})',ts.isCallExpression],
])record('caller.'+name,find(text,predicate),'canonical-caller-reference')
const linkPrevious=record('linkPreviousSpan',find('for(let xe of Xt)xe.next=No;',ts.isForOfStatement))
const linkCurrent=record('linkCurrentSpan',find('Xt.clear(),Xt.add(No)',ts.isBinaryExpression))
const retireSpan=record('retireSpan',find('Xt.delete(No)',ts.isCallExpression))
const body='with(p){'+settleDefault+'\n'+cells+'\n'+functions+'\n'+duration+'\nlet he,controllerInstalled=!1;'+lifecycle+'\nfunction initializeController(){if(!controllerInstalled){'+controller+bindAbort+';controllerInstalled=!0}}let Xr;return {async *submitMessage(dt,De,runner){'+beginGuard+'initializeController();Xr=runner;yield* gs(dt,De)},interrupt(reason){initializeController();Se(reason)},controller(){initializeController();return he},disposeController(){initializeController();'+unbindAbort+';he.abort(fl("remote-cancel"))},linkTurnSpan(No){'+linkPrevious+linkCurrent+'},retireTurnSpan(No){'+retireSpan+'},turnEvents:bt,flushTurnNotes:Sr,finalizeView:Oo,optionalPhase:qe,duration:ps,keepArrivedRows:to,appendMessages:'+append+',setMessages:'+replace+',applyMessageOp:'+apply+',async appendInput(Nr){let '+input+';'+transformed+'},enter(){'+beginGuard+enter+'},hold(){'+hold+'},release:Ft,prepare(qr,Fr){'+defer+'const Rr='+writer+';'+install+';return Rr},finish(){'+complete+'}}}'
const output='// Fixed official 2.1.287 TS arrival phase; complete source bodies, live owner ports.\nconst factory=new Function("p",'+JSON.stringify(body)+');\nexport function createArrivalStage287(ports){return factory(ports)}\n'
for(const [name,text]of [['arrivalStageNative.js',output],['arrivalStageProvenance.json',JSON.stringify({version:'2.1.287',manifestSha256:pin,offsetUnit:'UTF16 end-exclusive',rows,scope:'TS arrival phase only; full TS/query not claimed'},null,2)+'\n']]){const p=path.join(import.meta.dirname,name);if(process.argv.includes('--check')){if(fs.readFileSync(p,'utf8')!==text)throw Error('Arrival generated drift')}else fs.writeFileSync(p,text)}
console.log(JSON.stringify({rows:rows.length,sha256:sha(output)}))
