import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'

const here=path.dirname(fileURLToPath(import.meta.url))
const repo=path.resolve(here,'../../..')
const root=path.resolve(repo,'../.work/official-modules-2.1.287/darwin-arm64')
const require=createRequire(path.join(repo,'package.json'))
const ts=require('typescript')
const sha=value=>crypto.createHash('sha256').update(value).digest('hex')
const manifestBytes=fs.readFileSync(path.join(root,'manifest.json'))
const manifest=JSON.parse(manifestBytes)
const manifestSha256=sha(manifestBytes)
const expectedManifestSha256='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(manifestSha256!==expectedManifestSha256)throw Error('fixed official 2.1.287 manifest changed')
const rawFile=path.join(root,'raw/chunk-xapeakym.js')
const rawBytes=fs.readFileSync(rawFile)
const raw=rawBytes.toString('utf8')
const sourceFile=ts.createSourceFile('chunk-xapeakym.js',raw,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
const errors=sourceFile.parseDiagnostics
if(errors.length)throw Error(`287 raw source parse errors: ${errors.length}`)
const hI=sourceFile.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='hI')
if(!hI)throw Error('official hI declaration absent')
const hIStart=hI.getStart(sourceFile),hIEnd=hI.end
const markers={
 dialog:'else if(A.request.subtype==="get_chrome_dialog")',
 browser:'else if(A.request.subtype==="get_chrome_browsers"||A.request.subtype==="select_chrome_browser")',
 next:'else if(A.request.subtype==="get_sandbox_dialog")',
 nr:'nr=function(b,D,K,ce={}){We(b,pme(qm(e),D,K,ce).error)}',
 timeout:'var CA=15000',
}
const exactlyOnce=(text,needle,label)=>{const first=text.indexOf(needle);if(first<0||text.indexOf(needle,first+needle.length)>=0)throw Error(`${label} marker count is not exactly one`);return first}
const dialogAt=exactlyOnce(raw.slice(hIStart,hIEnd),markers.dialog,'get_chrome_dialog')+hIStart
const browserAt=exactlyOnce(raw.slice(hIStart,hIEnd),markers.browser,'get_chrome_browsers/select_chrome_browser')+hIStart
const nextAt=exactlyOnce(raw.slice(hIStart,hIEnd),markers.next,'next control branch')+hIStart
if(!(dialogAt<browserAt&&browserAt<nextAt))throw Error('Chrome branch order differs from 2.1.287')
const branchRaw=raw.slice(dialogAt,nextAt)
const nrAt=exactlyOnce(raw.slice(hIStart,hIEnd),markers.nr,'original nr closure')+hIStart
const nrEnd=nrAt+markers.nr.length
const nrRaw=raw.slice(nrAt,nrEnd)
const timeoutAt=raw.indexOf(markers.timeout)
if(timeoutAt<0||timeoutAt>hIStart)throw Error('original Chrome timeout literal not found before hI')
const timeoutMatch=/var CA=(\d+)/.exec(raw.slice(timeoutAt,timeoutAt+markers.timeout.length))
if(!timeoutMatch)throw Error('original CA timeout value not parseable')
const timeoutMs=Number(timeoutMatch[1])

const moduleSha=file=>{
 const bytes=fs.readFileSync(path.join(root,'raw',file))
 const entry=manifest.modules.find(row=>row.path===file)
 const digest=sha(bytes)
 if(!entry||entry.sha256!==digest)throw Error(`official manifest/module hash mismatch: ${file}`)
 return {bytes,text:bytes.toString('utf8'),sha256:digest}
}
function exportedNames(file,text){
 const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
 if(ast.parseDiagnostics.length)throw Error(`source parse error for ${file}`)
 const names=new Set()
 for(const statement of ast.statements){
  if(ts.isExportDeclaration(statement)&&statement.exportClause&&ts.isNamedExports(statement.exportClause))
   for(const item of statement.exportClause.elements)names.add(item.name.text)
  if((ts.isFunctionDeclaration(statement)||ts.isClassDeclaration(statement))&&statement.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword)&&statement.name)names.add(statement.name.text)
  if(ts.isVariableStatement(statement)&&statement.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword))
   for(const declaration of statement.declarationList.declarations)if(ts.isIdentifier(declaration.name))names.add(declaration.name.text)
 }
 return names
}
const exportRequirements={
 'chunk-k49nb21r.js':['buildChromeDialogResponse'],
 'chunk-9pwdyydg.js':['claudeInChromeDefaultForHost'],
 'chunk-1dgevehz.js':['CLAUDE_IN_CHROME_MCP_SERVER_NAME'],
 'chunk-0mdf5h9g.js':['callChromeTool','listConnectedBrowsers','noBrowsersWhenUnreachable','isChromeBridgeUnreachable'],
 'chunk-x5mcrns6.js':['qm'],
 'chunk-f2n7vgt8.js':['Dt'],
 'chunk-nankzm0s.js':['le'],
 'chunk-n2zepamy.js':['pme'],
}
const moduleProof={}
const staticImportTargets={qm:['chunk-x5mcrns6.js','qm'],Dt:['chunk-f2n7vgt8.js','Dt'],le:['chunk-nankzm0s.js','le'],pme:['chunk-n2zepamy.js','pme']}
const staticImports=new Map()
for(const statement of sourceFile.statements){
 if(!ts.isImportDeclaration(statement)||!statement.importClause?.namedBindings||!ts.isNamedImports(statement.importClause.namedBindings))continue
 const specifier=statement.moduleSpecifier.text
 const file=path.basename(specifier)
 for(const item of statement.importClause.namedBindings.elements){
  const local=item.name.text,imported=(item.propertyName??item.name).text
  staticImports.set(local,{file,name:imported})
 }
}
const staticImportProof={}
for(const [local,[file,name]]of Object.entries(staticImportTargets)){
 const actual=staticImports.get(local)
 if(!actual||actual.file!==file||actual.name!==name)throw Error(`official hI static import mismatch for ${local}`)
 staticImportProof[local]={file:actual.file,exportName:actual.name}
}
for(const [file,names]of Object.entries(exportRequirements)){
 const source=moduleSha(file),exports=exportedNames(file,source.text)
 for(const name of names)if(!exports.has(name))throw Error(`not exported by fixed 287 source: ${file}:${name}`)
 moduleProof[file]={sha256:source.sha256,requiredExports:names}
}
// These are the three dynamic imports embedded in the exact upstream branch.
const imports=[...branchRaw.matchAll(/import\("\/\$bunfs\/root\/(chunk-[a-z0-9]+\.js)"\)/g)].map(match=>match[1])
const expectedDynamic=['chunk-k49nb21r.js','chunk-9pwdyydg.js','chunk-1dgevehz.js','chunk-0mdf5h9g.js']
for(const file of expectedDynamic)if(!imports.includes(file))throw Error(`original branch dynamic import missing: ${file}`)
for(const file of imports)if(!expectedDynamic.includes(file))throw Error(`unreviewed dynamic import in branch: ${file}`)
const dynamicProof={}
for(const [file,names]of Object.entries(exportRequirements))if(expectedDynamic.includes(file))dynamicProof[file]=moduleProof[file]
const rawBranchSource=branchRaw
const originalContinueCount=(branchRaw.match(/continue}/g)||[]).length
if(originalContinueCount!==3)throw Error(`unexpected hI continue count: ${originalContinueCount}`)
let executableBranch=branchRaw.replace(/^else if\(/,'if(')
 .replaceAll('import("/$bunfs/root/','importPublic("/$bunfs/root/')
 .replaceAll('continue}','return true}')
if((executableBranch.match(/\bcontinue\b/g)||[]).length!==0)throw Error('control-flow continuation remained in standalone native')
const nrExpression=nrRaw.replace(/^nr=/,'')
const factoryBody=`return async function dispatchChromeControl287(A){
  const subtype=A.request.subtype;
  if(subtype!=="get_chrome_dialog"&&subtype!=="get_chrome_browsers"&&subtype!=="select_chrome_browser")return false;
  const [qm,Dt,le,pme]=await Promise.all([
   ports.get("chunk-x5mcrns6.js","qm"),
   ports.get("chunk-f2n7vgt8.js","Dt"),
   ports.get("chunk-nankzm0s.js","le"),
   ports.get("chunk-n2zepamy.js","pme"),
  ]);
  const e=ports.host;
  const Co=()=>ports.mcpClients();
  const Cr=work=>ports.detached(work);
  const Ze=ports.success;
  const We=ports.error;
  const nr=${nrExpression};
  const CA=${timeoutMs};
  const importPublic=ports.importPublic;
  with(ports){
   ${executableBranch}
  }
  return true;
}`
const native=`// Generated by generate.mjs from official 2.1.287 hI control branches. Do not hand-edit.\nexport function createPrintChromeControlNative287(ports){\n const dispatch=new Function("ports",${JSON.stringify(factoryBody)});\n return dispatch(ports);\n}\n`
const dts=`import type {ControlMcpConnection} from '../control/mcpConnectionPool.js'\nexport type ChromeControlRequest287={request_id:string;request:{subtype:string;device_id?:string}}\nexport type ChromeControlGetter287={\n get(file:'chunk-x5mcrns6.js',name:'qm'):Promise<(host:object)=>boolean>\n get(file:'chunk-f2n7vgt8.js',name:'Dt'):Promise<<T>(promise:Promise<T>,ms:number,message:string)=>Promise<T>>\n get(file:'chunk-nankzm0s.js',name:'le'):Promise<()=>{chromeExtension?:{pairedDeviceId?:string;pairedDeviceName?:string;[key:string]:unknown};[key:string]:unknown}>\n get(file:'chunk-n2zepamy.js',name:'pme'):Promise<(redactsPersistedLane:boolean,subtype:string,error:unknown,options?:{expected?:boolean})=>{error:string}>\n importPublic(specifier:string):Promise<Readonly<Record<string,unknown>>>\n host:object\n mcpClients():ControlMcpConnection[]\n detached(work:()=>Promise<unknown>):void\n success(message:ChromeControlRequest287,response?:unknown):void\n error(message:ChromeControlRequest287,error:string):void\n}\nexport declare function createPrintChromeControlNative287(ports:ChromeControlGetter287): (message:ChromeControlRequest287)=>Promise<boolean>\n`
const proof={
 version:'2.1.287',platformArtifact:'darwin-arm64',manifestSha256,offsetUnit:'UTF-16 end-exclusive',
 source:{file:'chunk-xapeakym.js',sha256:sha(rawBytes),hIRange:{start:hIStart,end:hIEnd},
  branches:[{subtypes:['get_chrome_dialog'],start:dialogAt,end:browserAt},{subtypes:['get_chrome_browsers','select_chrome_browser'],start:browserAt,end:nextAt}],
  branchSha256:sha(rawBranchSource),nrClosure:{start:nrAt,end:nrEnd,sha256:sha(nrRaw)},timeoutLiteral:{source:'var CA=15000',value:timeoutMs}},
 dynamicImportModules:dynamicProof,staticGetterModules:Object.fromEntries(Object.entries(moduleProof).filter(([file])=>!expectedDynamic.includes(file))),staticImportBindings:staticImportProof,
 transformations:[
  'branch source bytes are sliced directly from the fixed hI declaration; no operation body is rewritten by hand',
  'initial else-if is changed to if only to make the extracted chain stand-alone',
  'dynamic import specifier is transported through the existing canonical importPublicSourceModule287 getter',
  'the three original loop continue statements become handled-route returns in this standalone dispatcher',
  'hI local nr closure is copied exactly; host response/scheduler/client-list ports bind the existing print owner',
 ],
 generated:{nativeSha256:sha(native),declarationSha256:sha(dts),parseDiagnostics:0},
}
const outputs={'chromeControlNative.js':native,'chromeControlNative.d.ts':dts,'chromeControlProvenance.json':JSON.stringify(proof,null,2)+'\n'}
const nativeAst=ts.createSourceFile('native.js',native,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
if(nativeAst.parseDiagnostics.length)throw Error(`generated native syntax errors: ${nativeAst.parseDiagnostics.length}`)
const probe=ts.createSourceFile('branch-probe.js',`async function probe(A){${executableBranch};return true}`,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
if(probe.parseDiagnostics.length)throw Error(`extracted branch syntax errors: ${probe.parseDiagnostics.length}`)
for(const [name,contents]of Object.entries(outputs)){
 const target=path.join(here,name)
 if(process.argv.includes('--check')){
  if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==contents)throw Error(`generated output stale: ${name}`)
 }else fs.writeFileSync(target,contents)
}
console.log(JSON.stringify({branches:3,upstreamSourceSha256:sha(rawBytes),branchSha256:sha(rawBranchSource),modules:Object.keys(moduleProof).length,generatedNativeSha256:sha(native),parseDiagnostics:0,check:process.argv.includes('--check')}))
