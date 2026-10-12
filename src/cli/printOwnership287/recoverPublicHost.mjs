import fs from 'node:fs'
import crypto from 'node:crypto'
import ts from 'typescript'
import path from 'node:path'
const corpus=path.resolve(import.meta.dirname,'../../../../.work/official-modules-2.1.287/darwin-arm64'),sha=x=>crypto.createHash('sha256').update(x).digest('hex'),bytes=fs.readFileSync(corpus+'/manifest.json'),pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(bytes)!==pin)throw Error('Unpinned public print manifest')
const manifest=JSON.parse(bytes),modules=new Map(),rows=[]
function load(file){if(modules.has(file))return modules.get(file);const bytes=fs.readFileSync(corpus+'/raw/'+file),entry=manifest.modules.find(x=>x.path===file);if(!entry||sha(bytes)!==entry.sha256||bytes.length!==entry.length)throw Error('Public print raw pin '+file);const text=bytes.toString(),ast=ts.createSourceFile(file,text,99,true,1),m={file,text,ast,moduleSha256:entry.sha256,moduleLength:entry.length};if(ast.parseDiagnostics.length)throw Error('Raw parse '+file);modules.set(file,m);return m}
function record(m,n,name){if(!n)throw Error('Public print source absent '+name);const source=n.getText(m.ast);rows.push({file:m.file,name,start:n.getStart(m.ast),endExclusive:n.end,sha256:sha(source),source,moduleSha256:m.moduleSha256,moduleLength:m.moduleLength});return source}
const m=load('chunk-xapeakym.js'),hI=m.ast.statements.find(x=>ts.isFunctionDeclaration(x)&&x.name?.text==='hI')
function local(name){let hit;function walk(n){if((ts.isFunctionDeclaration(n)||ts.isVariableDeclaration(n))&&n.name?.getText(m.ast)===name)hit=n;ts.forEachChild(n,walk)}walk(hI);return record(m,hit,name)}
const declarations=['Xw','wb','bb','Pb','Rb','Tb','Mb'].map(name=>'const '+local(name)+';').join('\n'),ta=local('ta'),Pf=local('Pf')
const io=load('chunk-64z3xwk8.js'),cls=io.ast.statements.find(x=>ts.isClassDeclaration(x)&&x.name?.text==='Cie'),method=record(io,cls.members.find(x=>x.name?.getText(io.ast)==='sendUiHostRequest'),'Cie.sendUiHostRequest')
const hooks=load('chunk-mphp7acd.js'),hookBodies=['kTo','oEe','Ec'].map(name=>record(hooks,hooks.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name),name)).join('\n')
const statusBody=record(m,m.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='Ay'),'Ay')
const resultDeliveryBody=record(m,m.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='oS'),'oS')
// Original outer delivery owner and both writer ports are source references,
// not a second delivery instance emitted into the native factory.
for(const [name,start,end]of [['oS-owner-reference',358560,358567],['oS-IO-writer-reference',358571,358590],['oS-outer-writer-reference',372554,372588]]){
 let node;function find(n){if(n.getStart(m.ast)===start&&n.end===end)node=n;else if(n.pos<=start&&n.end>=end)ts.forEachChild(n,find)}find(m.ast);record(m,node,name)
}
const schema=load('chunk-xep95vq1.js');let statusSchema;function findStatusSchema(n){if(ts.isVariableDeclaration(n)&&n.name.getText(schema.ast)==='_F')statusSchema=n;ts.forEachChild(n,findStatusSchema)}findStatusSchema(schema.ast);record(schema,statusSchema,'_F')
const wireNames=['XF','me','QF','ho','FF','YF','WF','$F','JF','ZF','eY'],wireRows=new Map();function findWire(n){if(ts.isVariableDeclaration(n)&&wireNames.includes(n.name.getText(schema.ast)))wireRows.set(n.name.getText(schema.ast),n);ts.forEachChild(n,findWire)}findWire(schema.ast)
const wireBody=wireNames.map(name=>'const '+record(schema,wireRows.get(name),name)+';').join('\n')
let autocompactSchema;function findAutocompact(n){if(ts.isVariableDeclaration(n)&&n.name.getText(schema.ast)==='_o')autocompactSchema=n;ts.forEachChild(n,findAutocompact)}findAutocompact(schema.ast)
const autocompactBody='const '+record(schema,autocompactSchema,'_o')+';'
const remote=load('chunk-f2cpzzp9.js');let seedAutocompact,clearAutocompact;
function findRemoteAutocompact(n){if(ts.isIfStatement(n)&&n.expression.getText(remote.ast)==='h.seedAutocompactState!==void 0')seedAutocompact=n;if(ts.isArrowFunction(n)&&n.getText(remote.ast)==='(Nr)=>Nr.remoteAutocompactState===void 0?Nr:{...Nr,remoteAutocompactState:void 0}')clearAutocompact=n;ts.forEachChild(n,findRemoteAutocompact)}findRemoteAutocompact(remote.ast)
const seedBody=record(remote,seedAutocompact,'useRemoteSession.seedAutocompactState'),clearBody=record(remote,clearAutocompact,'useRemoteSession.clearAutocompactState')
const side=load('chunk-6bs6skca.js'),sideBody=['Bur','s8t'].map(name=>record(side,side.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name),name)).join('\n')
let progressSchema;function findProgress(n){if(ts.isVariableDeclaration(n)&&n.name.getText(schema.ast)==='SF')progressSchema=n;ts.forEachChild(n,findProgress)}findProgress(schema.ast)
const progressBody='const '+record(schema,progressSchema,'SF')+';'
const progressWriter=local('Bb')
// Per-request ingress cells, not another request registry. Retain the complete
// original scheduling functions and terminal selector over the same IO port.
let controlCr,controlSl,controlUr,controlInline
function findControlLifecycle(n){
 if(ts.isVariableDeclaration(n)&&n.name.getText(m.ast)==='Cr'){
  controlCr=n
  const block=n.parent.parent.parent
  for(const statement of block.statements??[])if(ts.isVariableStatement(statement))for(const declaration of statement.declarationList.declarations)if(declaration.name.getText(m.ast)==='ur'&&declaration.initializer?.getText(m.ast)==='!1')controlUr=declaration
 }
 if(ts.isVariableDeclaration(n)&&n.name.getText(m.ast)==='sl')controlSl=n
 if(ts.isIfStatement(n)&&n.expression.getText(m.ast)==='sr&&!ur')controlInline=n
 ts.forEachChild(n,findControlLifecycle)
}
findControlLifecycle(hI)
const controlCrBody=record(m,controlCr,'control.Cr'),controlSlBody=record(m,controlSl,'control.sl'),controlUrBody=record(m,controlUr,'control.ur'),controlInlineBody=record(m,controlInline,'control.inline-finally')
const controlAgBody=record(m,m.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='Ag'),'Ag')
// Original fork guard and keep-alive lease close over the existing IO, drain,
// parked-permission controller and canonical queue, not a shadow state owner.
const forkLocals=[]
function findForkLocals(n){if(ts.isVariableDeclaration(n)&&[448524,454985,455034,455056,455170].includes(n.getStart(m.ast)))forkLocals.push(n);ts.forEachChild(n,findForkLocals)}
findForkLocals(hI)
if(forkLocals.length!==5)throw Error('Original fork local closure drift')
const forkBodies=forkLocals.map(n=>'const '+record(m,n,'fork.'+n.name.getText(m.ast))+';').join('\n')
let forkReason
function findForkReason(n){if(ts.isPropertyAssignment(n)&&n.name.getText(m.ast)==='blockedReason'&&n.initializer.getText(m.ast)==='()=>Oe()||Q.getDrainableMainThreadQueueLength()>0?gp[Ke()]:null')forkReason=n.initializer;ts.forEachChild(n,findForkReason)}
findForkReason(hI)
const forkReasonBody=record(m,forkReason,'fork.blockedReason')
let forkNames
function findForkNames(n){if(ts.isVariableDeclaration(n)&&n.name.getText(m.ast)==='gp'&&n.getText(m.ast).includes('commands_queued'))forkNames=n;ts.forEachChild(n,findForkNames)}
findForkNames(m.ast)
const forkNamesBody=record(m,forkNames,'fork.gp'),forkGateBody=record(m,m.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='bc'),'fork.bc')
const terminal=load('chunk-f9b5rem8.js')
const terminalDeclarations=['p','o','Y9t','vR'].map(name=>{
 let found
 function find(n){if((ts.isFunctionDeclaration(n)||ts.isClassDeclaration(n)||ts.isVariableDeclaration(n))&&n.name?.getText(terminal.ast)===name)found=n;ts.forEachChild(n,find)}
 find(terminal.ast)
 const body=record(terminal,found,'terminal.'+name)
 return ts.isVariableDeclaration(found)?'var '+body+';':body
}).join('\n')
const terminalSize=load('chunk-j3y05f4x.js')
let terminalSizeKey
function findTerminalSizeKey(n){if(ts.isVariableDeclaration(n)&&n.name.getText(terminalSize.ast)==='Rot')terminalSizeKey=n;ts.forEachChild(n,findTerminalSizeKey)}
findTerminalSizeKey(terminalSize.ast)
const terminalSizeKeyBody=record(terminalSize,terminalSizeKey,'terminal.Rot'),terminalSizeBody=record(terminalSize,terminalSize.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='sgo'),'terminal.sgo')
const startup=load('chunk-q1842b1c.js')
let existingCloudBlock
function findExistingCloud(n){if(ts.isIfStatement(n)&&n.expression.getText(startup.ast)==='D'&&n.thenStatement.getText(startup.ast).includes('attachRemote'))existingCloudBlock=n.thenStatement;ts.forEachChild(n,findExistingCloud)}
findExistingCloud(startup.ast)
const existingCloudBody=record(startup,existingCloudBlock,'Ii.existing-cloud-D')
// Only the original literal module loader changes here: it resolves the same
// canonical public modules, while createRoot/vR retain the current host ABI.
const existingCloudRuntimeBody=existingCloudBody.replaceAll(/import\("\/\$bunfs\/root\/(chunk-[^"]+)"\)/g,'load("$1")')
// The manually typed host boundary reads the actual original owner declaration;
// execution287 is a runtime facade and does not re-export that type. Check the
// ABI alongside generated bodies rather than silently resurrecting the facade.
const hostTypes=fs.readFileSync(path.join(import.meta.dirname,'publicHostNative.d.ts'),'utf8')
if(hostTypes.includes("import('../../services/context/execution287.js').ExecutionSession287"))throw Error('ExecutionSession287 must come from officialExecutionOwners287/native.js')
if(!hostTypes.includes("import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287"))throw Error('Missing original execution owner type boundary')
const printArm=startup.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='lr')
const existingHeadless=printArm.body.statements.find(n=>ts.isIfStatement(n)&&n.expression.getText(startup.ast)==='B!==null')
const headlessCloudBody=record(startup,existingHeadless.thenStatement,'lr.existing-cloud-B')
const headlessCloudRuntimeBody=headlessCloudBody.replaceAll(/import\("\/\$bunfs\/root\/(chunk-[^"]+)"\)/g,'load("$1")')
// The serving arm is the complete first statement, including its admission
// gate and initialization prefix. It is not the ordinary B send contract.
const servingArm=printArm.body.statements.find(n=>ts.isIfStatement(n)&&n.expression.getText(startup.ast)==='yeo(ie??"text"),fZo(),_e')
const servingBody=record(startup,servingArm,'lr.headless-cloud-prefix')
const servingRuntimeBody=servingBody.replaceAll(/import\("\/\$bunfs\/root\/(chunk-[^"]+)"\)/g,'load("$1")')
const content=`// Generated fixed-287 complete public producer initializers; no owner cloned.\nexport function createPrintPublicSubscriptions287(p){\nconst {I,r,qz,Wi,h5e,Gin,fi,wC,_C,rk,IZo,R4r,x4r,P4r,I4r,P6n,LEt,Xy,Q,v,EIr}=p;\nlet ya=true,Uu=0;\n${ta}\nconst ${Pf};\n${declarations}\nreturn {get live(){return ya},set live(value){ya=value},source:{wb,Pb,Rb,Tb,bb,Xw,Mb},closeUi(){ya=false;wb();Pb();Rb();Tb();bb();},closeComposer(){EIr();Xw();},closeTaskMetadata:Mb,active:ta,panesRevision:()=>Uu};\n}\nexport function createSendUiHostRequest287(LEt){return ({${method}}).sendUiHostRequest}\nexport function createAsyncHookFinalizer287({tz,YQ,Wi,t}){${hookBodies}\nreturn kTo}\n`
const resultDeliveryContent=`export function createPrintResultDelivery287(){${resultDeliveryBody}\nreturn oS()}\n`
const statusContent=`export function createSdkStatusSerializer287({q,ER}){${statusBody}\nreturn Ay}\n`
const wireContent=`export function createPrintUiWireSchemas287({f,u,x,T,o,_,C,B,H}){${wireBody}\nreturn [FF,YF,WF,$F,JF,ZF,eY]}\n`
const autocompactContent=`export function createSdkAutocompactSchema287({f,u,x,o,_,C,B,H}){${autocompactBody}\nreturn _o}\nexport function seedRemoteAutocompact287({h,Uo,i,S,c}){${seedBody}}\nexport function clearRemoteAutocompact287(setState){setState(${clearBody})}\n`
const sideContent=`export function createSdkSideQuestionControl287({Bn,JR,ai,urt}){${sideBody}\nreturn s8t}\nexport function createSdkControlProgressSchema287({f,u,x,o,_,C,B}){${progressBody}\nreturn SF}\nexport function createSdkControlProgressWriter287({i,c,ht,eo,q}){const ${progressWriter};return Bb}\n`
const controlContent=`export function shouldCompleteSdkIngress287(e){${controlAgBody}\nreturn Ag(e)}\nexport function createSdkControlLifecycle287({r,sr,d}){let ${controlUrBody};let ${controlCrBody},${controlSlBody};return {Cr,sl,completeInline(){${controlInlineBody}},get detached(){return ur}}}\n`
const forkContent=`export function createSdkForkControlHost287({ht,r,Yt,Q,qe,a,v,aQe}){${forkGateBody}\nconst ${forkNamesBody};\n${forkBodies}\nreturn {lease:Xa,blockedReason:${forkReasonBody}}}\n`
const terminalContent=`export function createTerminalInputOwner287({Le,i,kqt,t,DOe,pu,Zm,sgo,a,s,process}){${terminalDeclarations}\nreturn {Y9t,vR}}\nexport function createTerminalSizeRestore287({a,process}){var ${terminalSizeKeyBody};\n${terminalSizeBody}\nreturn sgo}\n`
const cloudContent=`export function createExistingCloudAttachCaller287({i,ye,fn,ee,e,N,Pe,Ue,B,x,se,pe,l,Kn,Eqt,vR,wFt,K,load,process}){return async function attachExistingCloud(D)${existingCloudRuntimeBody}}\n`
const headlessCloudContent=`export function createExistingCloudPrintCaller287({ime,U,TF,pHe,Vs,zb,j_e,V2,Yt,Be,ie,i,c,Rx,l,Rm,Mpe,Npe,js,_,process,oc,Kn,load,n}){return async function printExistingCloud(B)${headlessCloudRuntimeBody}}\n`
const servingContent=`export function createHeadlessCloudServingCaller287({yeo,fZo,x9r,Yt,ime,U,AEe,qP,jj,un,Ki,zEe,Ym,xr,sme,load}){return async function serveHeadlessCloud(n,e){let {headlessCloud:_e,outputFormat:ie,session:Ve,cloudAttachId:B}=n;${servingRuntimeBody}}}\n`
const proof={version:'2.1.287',manifestSha256:pin,offsetUnit:'UTF16 end-exclusive',rows,ports:'Read same canonical Hooks namespace; I/r/Q/v/emit are actual print caller references; no original gate forced. Ay q/ER are existing session ID and UUID caller ports. _F is wire schema evidence, not an extra runtime owner.',completeDf:false}
for(const [name,body]of [['publicHostNative.js',content+statusContent+wireContent+resultDeliveryContent+autocompactContent+sideContent+controlContent+forkContent+terminalContent+cloudContent+headlessCloudContent+servingContent],['publicHostProvenance.json',JSON.stringify(proof,null,2)+'\n']]){const file=path.join(import.meta.dirname,name);if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==body)throw Error('Public print generated drift '+name)}else fs.writeFileSync(file,body)}
console.log(JSON.stringify({restored:rows.length,modules:modules.size,completeDf:false}))
