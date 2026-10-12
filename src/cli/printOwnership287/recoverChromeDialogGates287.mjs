import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
const here=path.dirname(fileURLToPath(import.meta.url))
const repo=path.resolve(here,'../../..')
const root=path.resolve(repo,'../.work/official-modules-2.1.287/darwin-arm64')
const ts=createRequire(path.join(repo,'package.json'))('typescript')
const sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const manifestBytes=fs.readFileSync(path.join(root,'manifest.json'))
const manifestSha256=sha(manifestBytes)
const expectedManifestSha256='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(manifestSha256!==expectedManifestSha256)throw Error('fixed official 2.1.287 manifest changed')
function sourceFunction(file,name){
 const bytes=fs.readFileSync(path.join(root,'raw',file)),text=bytes.toString('utf8')
 const row=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8')).modules.find(x=>x.path===file)
 if(!row||row.sha256!==sha(bytes))throw Error('official module hash mismatch: '+file)
 const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
 if(ast.parseDiagnostics.length)throw Error('official parse errors: '+file)
 const fn=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name)
 if(!fn)throw Error('missing official function declaration: '+file+':'+name)
 return {text:text.slice(fn.getStart(ast),fn.end),start:fn.getStart(ast),end:fn.end,sha256:sha(bytes)}
}
function sourceVariable(file,name){
 const bytes=fs.readFileSync(path.join(root,'raw',file)),text=bytes.toString('utf8')
 const row=JSON.parse(manifestBytes).modules.find(x=>x.path===file)
 if(!row||row.sha256!==sha(bytes))throw Error('official module hash mismatch: '+file)
 const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
 for(const statement of ast.statements)if(ts.isVariableStatement(statement))
  for(const declaration of statement.declarationList.declarations)
   if(ts.isIdentifier(declaration.name)&&declaration.name.text===name)
    return {text:text.slice(declaration.getStart(ast),declaration.end),start:declaration.getStart(ast),end:declaration.end,sha256:sha(bytes)}
 throw Error('missing official variable: '+file+':'+name)
}
function exportedAs(file,publicName){
 const bytes=fs.readFileSync(path.join(root,'raw',file)),text=bytes.toString('utf8')
 const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
 if(ast.parseDiagnostics.length)throw Error('official parse errors: '+file)
 const exported=new Set()
 for(const statement of ast.statements)if(ts.isExportDeclaration(statement)&&statement.exportClause&&ts.isNamedExports(statement.exportClause))
  for(const item of statement.exportClause.elements)exported.add(item.name.text)
 if(!exported.has(publicName))throw Error('required upstream export absent: '+file+':'+publicName)
 const row=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8')).modules.find(x=>x.path===file)
 if(!row||row.sha256!==sha(bytes))throw Error('official module hash mismatch: '+file)
 return {sha256:sha(bytes),publicName}
}
const kos=sourceFunction('chunk-8447apg8.js','kos')
const permissionsUrl=sourceVariable('chunk-8447apg8.js','c8t')
const dialogUrls=sourceVariable('chunk-8447apg8.js','m')
const e=sourceFunction('chunk-9pwdyydg.js','E')
const o=sourceFunction('chunk-9pwdyydg.js','o')
const sIsWired=sourceFunction('chunk-09m4fzsj.js','S$e')
const restrictedGate=sourceFunction('chunk-bn3p37gv.js','AT')
const launchOptionsSource=fs.readFileSync(path.join(repo,'src/tools/AgentTool/officialAgentPromptState287/native.js'),'utf8')
const restrictedSessionMethod='restrictedSession(){return this.#a}'
const restrictedSessionOffset=launchOptionsSource.indexOf(restrictedSessionMethod)
if(restrictedSessionOffset<0)throw Error('current LaunchOptions runtime does not expose restrictedSession')
const requiredExports={
 'chunk-09m4fzsj.js':['S$e'],
 'chunk-k49nb21r.js':['buildChromeDialogResponse','CHROME_PERMISSIONS_URL'],
 'chunk-9pwdyydg.js':['claudeInChromeDefaultForHost'],
 'chunk-bn3p37gv.js':['AT'],
 'chunk-1dgevehz.js':['CLAUDE_IN_CHROME_MCP_SERVER_NAME'],
 'chunk-0mdf5h9g.js':['callChromeTool','listConnectedBrowsers','noBrowsersWhenUnreachable','isChromeBridgeUnreachable'],
}
const exportProof=Object.fromEntries(Object.entries(requiredExports).map(([file,names])=>[file,names.map(name=>exportedAs(file,name))]))
const helperBody=`const lH=ports.lH,g_e=ports.g_e;\nconst ${permissionsUrl.text};\nconst ${dialogUrls.text};\nconst a=ports.a,t=ports.t,ft=ports.ft,le=ports.le,sk=ports.sk,ac=ports.ac,cH=ports.cH;\n${kos.text}\nconst buildChromeDialogResponse=kos;\nconst CHROME_PERMISSIONS_URL=c8t;\nconst d=ports.d,Zc=ports.Zc,iJe=ports.iJe,yr=ports.yr,AT=ports.AT,yge=ports.yge;\n${sIsWired.text}\n${e.text}\n${o.text}\nreturn {buildChromeDialogResponse,CHROME_PERMISSIONS_URL,claudeInChromeDefaultForHost:E};`
const native=`// Generated mechanically from fixed official 2.1.287 declarations. Do not hand-edit.\nexport function createChromeDialogAndGate287(ports){\n return new Function("ports",${JSON.stringify(helperBody)})(ports);\n}\n`
const dts=`export type ChromeDialogPorts287={\n a:{isWslEnvironment():boolean};t(message:string,options?:{level:string}):void;ft():boolean;le():{chromeExtension?:{pairedDeviceName?:string};claudeInChromeDefaultEnabled?:boolean};sk():boolean;ac:string;cH():Promise<boolean>;lH:string;g_e:string;\n d(error:unknown):void;Zc():{wiredThisSession:boolean};iJe():boolean;yr():boolean;AT():boolean;yge():boolean\n}\nexport declare function createChromeDialogAndGate287(ports:ChromeDialogPorts287):{buildChromeDialogResponse(args:{mcpClients:unknown[];atStartup:(settingOn:boolean)=>Promise<boolean>}):Promise<Record<string,unknown>>;CHROME_PERMISSIONS_URL:string;claudeInChromeDefaultForHost(args?:{settingOn?:boolean}):Promise<boolean>}\n`
const proof={version:'2.1.287',platformArtifact:'darwin-arm64',manifestSha256,offsetUnit:'UTF-16 end-exclusive',exports:exportProof,sources:{'chunk-8447apg8.js':{sha256:kos.sha256,variables:{c8t:{start:permissionsUrl.start,end:permissionsUrl.end,sha256:sha(permissionsUrl.text)},m:{start:dialogUrls.start,end:dialogUrls.end,sha256:sha(dialogUrls.text)}},functions:{kos:{start:kos.start,end:kos.end,sha256:sha(kos.text)}}},'chunk-9pwdyydg.js':{sha256:e.sha256,functions:{E:{start:e.start,end:e.end,sha256:sha(e.text)},o:{start:o.start,end:o.end,sha256:sha(o.text)}}},'chunk-09m4fzsj.js':{sha256:sIsWired.sha256,functions:{S$e:{start:sIsWired.start,end:sIsWired.end,sha256:sha(sIsWired.text)}}},'chunk-bn3p37gv.js':{sha256:restrictedGate.sha256,functions:{AT:{start:restrictedGate.start,end:restrictedGate.end,sha256:sha(restrictedGate.text)}}}},localSource:{file:'src/tools/AgentTool/officialAgentPromptState287/native.js',sha256:sha(launchOptionsSource),method:restrictedSessionMethod,offset:restrictedSessionOffset,typesFile:'src/tools/AgentTool/officialAgentPromptState287/native.d.ts',note:'The minimal d.ts omits this method; the concrete current launch-options class implements it.'},ports:{dialog:{a:'getChromeMenuEnvironment287() => existing readDependency(chunk-mbfze585.js,a) proxy; isWslEnvironment is a function',t:'logForDebugging',ft:'isClaudeAISubscriber',le:'getGlobalConfig',sk:'isPolicyAllowed(allow_claude_browser_extension)',ac:'CLAUDE_IN_CHROME_MCP_SERVER_NAME',cH:'isChromeExtensionInstalled from canonical menu chunk-09m4fzsj',lH:'selected chunk-09m4fzsj constant string',g_e:'selected chunk-09m4fzsj constant string'},gate:{d:'logError',Zc:'getChromeMenuDependency287(chunk-df0597gf.js,Zc), same MCP-connected state owner; exact raw S$e body calls Zc().wiredThisSession',iJe:'hasChromeBridgeScope -> canonical chunk-nankzm0s:iJe',yr:'getChromeStartupRuntime287().yr() exposed from its existing exact yr port',AT:'current execution host launchOptions.restrictedSession; source verified in raw AT and current concrete LaunchOptions class',yge:'getChromeStartupRuntime287().blocked() -> exact existing native yge body'}},transport:{'chunk-1dgevehz.js':'common.ts CLAUDE_IN_CHROME_MCP_SERVER_NAME','chunk-0mdf5h9g.js':'getChromeMenuSource287(chunk-g45mcjt4.js): u8t/FIn/Ros/Hnt; runtime asserts each required export is callable','chunk-k49nb21r.js':'generated exact kos helper with selected URL constants and canonical environment proxy','chunk-9pwdyydg.js':'generated exact E/o helpers with canonical policy/auth/session/startup ports'},generated:{nativeSha256:sha(native),declarationSha256:sha(dts)}}
const outputs={'chromeDialogGatesNative287.js':native,'chromeDialogGatesNative287.d.ts':dts,'chromeDialogGatesProvenance287.json':JSON.stringify(proof,null,2)+'\n'}
for(const [name,data] of Object.entries(outputs)){const p=path.join(here,name);if(process.argv.includes('--check')){if(!fs.existsSync(p)||fs.readFileSync(p,'utf8')!==data)throw Error('stale generated output: '+name)}else fs.writeFileSync(p,data)}
console.log(JSON.stringify({generated:Object.keys(outputs),kosRange:[kos.start,kos.end],E:[e.start,e.end],o:[o.start,o.end],manifestSha256}))
