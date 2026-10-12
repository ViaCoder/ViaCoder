import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {createRequire} from 'node:module'
import {resultTypesFromSource} from '../officialResultSchemas287/typesFromSource.mjs'

const dir=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(dir,'../../../..')
const ts=createRequire(import.meta.url)(path.join(repo,'node_modules/typescript/lib/typescript.js'))
const module='chunk-j0381q8k.js',raw=path.resolve(repo,'../.work/official-modules-2.1.287/darwin-arm64/raw',module)
const hash=value=>crypto.createHash('sha256').update(value).digest('hex')
const bytes=fs.readFileSync(raw),moduleSha256=hash(bytes)
if(moduleSha256!=='887177b815dd0cd1d4d91f9ba6f45c7d571f0e3e5851187904ec96311642b89d')throw Error('Fixed npm287 SDK module drift')
const text=bytes.toString('utf8'),ast=ts.createSourceFile(module,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
if(ast.parseDiagnostics.length)throw Error('Original SDK module parse failure')
const methods=[]
function visit(node){if(ts.isMethodDeclaration(node)&&node.name.getText(ast)==='processControlRequest')methods.push(node);ts.forEachChild(node,visit)}
visit(ast)
if(methods.length!==1)throw Error('Original SDK request method must be unique')
const method=methods[0],methodStart=method.getStart(ast),methodEnd=method.end,methodSha256=hash(text.slice(methodStart,methodEnd))
if(methodStart!==32849||methodEnd!==37426||methodSha256!=='00e0ba89ab9579ff63868428a4278217c63b933c7b03f5cff6dcb8966bcf0c8a')throw Error('Original SDK request method range/body drift')
const branch=method.body.statements.find(node=>ts.isIfStatement(node)&&node.expression.getText(ast)==='e.request.subtype==="can_use_tool"')
if(!branch||!ts.isBlock(branch.thenStatement))throw Error('Complete original can_use_tool block missing')
const block=branch.thenStatement,start=block.getStart(ast),end=block.end,body=text.slice(start,end)
const cut=(source,node)=>({start:node.getStart(source.ast),end:node.end,sha256:hash(source.text.slice(node.getStart(source.ast),node.end)),text:source.text.slice(node.getStart(source.ast),node.end)})
const sdkSource={ast,text,module,moduleSha256}
function blockFor(subtype){
 const found=[]
 function walk(node){if(ts.isIfStatement(node)&&node.expression.getText(ast)===`e.request.subtype===${JSON.stringify(subtype)}`)found.push(node.thenStatement);ts.forEachChild(node,walk)}
 walk(method.body)
 if(found.length!==1||!ts.isBlock(found[0]))throw Error('Unique complete original SDK block missing: '+subtype)
 return cut(sdkSource,found[0])
}
const ignore=cut(sdkSource,method.body.statements[0]),oauth=blockFor('oauth_token_refresh'),secret=blockFor('remote_control_work_secret')
const helperMethods={}
function collectHelpers(node){
 if(ts.isMethodDeclaration(node)&&['handleHookCallbacks','handleMcpControlRequest','handleControlRequest'].includes(node.name.getText(ast)))helperMethods[node.name.getText(ast)]=cut(sdkSource,node)
 ts.forEachChild(node,collectHelpers)
}
collectHelpers(ast)
for(const name of ['handleHookCallbacks','handleMcpControlRequest'])if(!helperMethods[name])throw Error('Complete original SDK helper method missing: '+name)
const requestMethod=helperMethods.handleControlRequest
if(!requestMethod||requestMethod.start!==31673||requestMethod.end!==32713||requestMethod.sha256!=='38cec81a1cb952d523d1fff57e7a7f545362685158468fbe26f6ff922cc3cf93')throw Error('Complete original SDK response envelope drift')
const wholeMethod=text.slice(methodStart,methodEnd)
if(!ignore.text.startsWith('if(Eae.some('))throw Error('Original serving-host ignore gate drift')
const dependencies=[]
function source(file,expected){
 const b=fs.readFileSync(path.join(path.dirname(raw),file));if(hash(b)!==expected)throw Error('Fixed SDK dependency drift: '+file)
 const value=b.toString('utf8'),tree=ts.createSourceFile(file,value,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
 if(tree.parseDiagnostics.length)throw Error('Original dependency parse failure: '+file)
 return {module:file,moduleSha256:expected,ast:tree,text:value}
}
function declaration(source,name){
 for(const statement of source.ast.statements){
  if(ts.isFunctionDeclaration(statement)&&statement.name?.text===name){const result={module:source.module,moduleSha256:source.moduleSha256,name,kind:'function',...cut(source,statement)};dependencies.push(result);return result.text}
  if(ts.isVariableStatement(statement))for(const node of statement.declarationList.declarations)if(ts.isIdentifier(node.name)&&node.name.text===name){
   const flags=statement.declarationList.flags,keyword=flags&ts.NodeFlags.Const?'const':flags&ts.NodeFlags.Let?'let':'var',result={module:source.module,moduleSha256:source.moduleSha256,name,kind:keyword,declarationListFlags:flags,...cut(source,node)};dependencies.push(result);return keyword+' '+result.text+';'
  }
 }
 throw Error('Complete SDK dependency declaration missing: '+name)
}
const dependencyText=[
 declaration(source('chunk-ta5mva11.js','f3b2446f0f3b7b5fb5059d4ff0b8961381691527ec8432e33c5857b58ffb8d88'),'Eae'),
 declaration(source('chunk-0p2fqac8.js','ddcccc2df45f8403ae739e997aa058ccf9737d01b38b69d270ee2d9f559e1748'),'Gtn'),
 declaration(source('chunk-xep95vq1.js','bcca47f9fc106c4beee4a7982339a7596574d78362dceccc83ec5e507c90719c'),'Eo'),
 declaration(source('chunk-xep95vq1.js','bcca47f9fc106c4beee4a7982339a7596574d78362dceccc83ec5e507c90719c'),'OKo'),
 declaration(sdkSource,'Kt'),
].join('\n')
// Preserve the complete incoming permission schema as a type-only view of the
// existing canonical Ao owner, including original closed enums.
const schemaSource=source('chunk-xep95vq1.js','bcca47f9fc106c4beee4a7982339a7596574d78362dceccc83ec5e507c90719c')
const manifestBytes=fs.readFileSync(path.resolve(path.dirname(raw),'../manifest.json'))
if(hash(manifestBytes)!=='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5')throw Error('Fixed287 schema manifest drift')
const manifest=JSON.parse(manifestBytes)
const schemaEnumSource=source('chunk-hrhfcbdv.js',manifest.modules.find(row=>row.path==='chunk-hrhfcbdv.js').sha256)
const zodSource=source('chunk-aybmj3t4.js',manifest.modules.find(row=>row.path==='chunk-aybmj3t4.js').sha256)
const lazyConstructor=zodSource.ast.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='tE')
if(!lazyConstructor)throw Error('Original lazy constructor missing')
const lazyProof={module:zodSource.module,moduleSha256:zodSource.moduleSha256,...cut(zodSource,lazyConstructor)}
const declarations=new Map(),origins=new Map()
for(const input of [schemaSource,schemaEnumSource])for(const statement of input.ast.statements)if(ts.isVariableStatement(statement))for(const node of statement.declarationList.declarations){
 if(!ts.isIdentifier(node.name))continue
 if(input===schemaEnumSource&&!['K8r','FCn'].includes(node.name.text))continue
 declarations.set(node.name.text,node);origins.set(node.name.text,input)
}
const schema=declarations.get('Ao'),schemaProof={module:schemaSource.module,moduleSha256:schemaSource.moduleSha256,...cut(schemaSource,schema)}
if(schemaProof.start!==437471||schemaProof.end!==442575||schemaProof.sha256!=='dad131f831974ef7a740608e239b2bcec2391d56e588ddd676f8c4d717c11f32')throw Error('Complete original permission schema drift')
const permissionTypes=resultTypesFromSource(declarations,['Ao']).replaceAll('OriginalResult_','OriginalPermission_').replace(/export type ResultSuccess287[^\n]*\n(?:export type ResultError287[^\n]*\n)?$/,'')+'export type PermissionRequest287 = OriginalPermission_Ao;\n'
const typeNames=new Set([...permissionTypes.matchAll(/export type OriginalPermission_(\w+) =/g)].map(match=>match[1]))
const schemaTypes=[...declarations].filter(([name])=>typeNames.has(name.replaceAll('$','dollar'))||['K8r','FCn'].includes(name)).map(([name,node])=>{const input=origins.get(name);return {name,module:input.module,moduleSha256:input.moduleSha256,...cut(input,node)}})
const proof={version:'2.1.287',platform:'darwin-arm64',module,moduleSha256,rangeConvention:'UTF-16 end-exclusive',method:{start:methodStart,end:methodEnd,sha256:methodSha256},block:{start,end,sha256:hash(body),text:body},ignore,oauth,secret,dependencies,schema:schemaProof,schemaTypes,lazyConstructor:lazyProof,adaptation:'Whole original permission/OAuth/work-secret blocks and ignore gate verbatim; existing QueryRuntime this, callback owners and no-response sentinel. Original stateless predicates/declarations retained. No new callback, cache, execution owner or token source.'}
proof.incomingMethod={start:methodStart,end:methodEnd,sha256:methodSha256,text:wholeMethod}
proof.helperMethods=helperMethods
proof.adaptation='Whole original incoming method and its hook/MCP helpers verbatim; existing QueryRuntime owns callbacks, pending MCP responses and no-response sentinel. Debug and the existing telemetry-disabled C sink are supplied as lexical ports; no additional callback/cache/token/execution owner.'
const native=`// Generated from fixed npm2.1.287; complete original blocks are unchanged.\n${dependencyText}\nconst permission=new Function(${JSON.stringify('return async function(e,s,ie)'+body)})();\nconst ignore=new Function('Eae','t','e','ie',${JSON.stringify(ignore.text)});\nconst oauth=new Function('OKo',${JSON.stringify('return async function(e,s)'+oauth.text)})(OKo);\nconst secret=new Function('Kt',${JSON.stringify('return async function(e,s)'+secret.text)})(Kt);\nexport function invokeOriginalSDKCanUseTool287(owner,request,signal,noResponse){return permission.call(owner,request,signal,noResponse)}\nexport function invokeOriginalSDKIgnore287(request,noResponse,debug){return ignore(Eae,debug,request,noResponse)}\nexport function isOriginalSDKMcpRequest287(message){return Gtn(message)}\nexport function invokeOriginalSDKOAuthRefresh287(owner,request,signal){return oauth.call(owner,request,signal)}\nexport function invokeOriginalSDKWorkSecret287(owner,request,signal){return secret.call(owner,request,signal)}\n`
const wholeNative=`const incoming=new Function('Eae','Gtn','OKo','Kt','t','i','c','ie',${JSON.stringify('return ('+wholeMethod.replace(/^async processControlRequest/,'async function')+')')});\nconst hook=new Function(${JSON.stringify('return ('+helperMethods.handleHookCallbacks.text.replace(/^handleHookCallbacks/,'function')+')')})();\nconst mcp=new Function(${JSON.stringify('return ('+helperMethods.handleMcpControlRequest.text.replace(/^handleMcpControlRequest/,'function')+')')})();\nexport function invokeOriginalSDKProcessControl287(owner,request,signal,noResponse,debug,track,tag){return incoming(Eae,Gtn,OKo,Kt,debug,track,tag,noResponse).call(owner,request,signal)}\nexport function invokeOriginalSDKHookCallback287(owner,id,input,toolUseID,signal){return hook.call(owner,id,input,toolUseID,signal)}\nexport function invokeOriginalSDKMcpControl287(owner,name,request,transport){return mcp.call(owner,name,request,transport)}\n`
const envelopeNative=`const handleControl=new Function('t','ie','_','l',${JSON.stringify('return ('+requestMethod.text.replace(/^async handleControlRequest/,'async function')+')')});\nexport function invokeOriginalSDKHandleControlRequest287(owner,request,debug,noResponse,serialize,errorText){return handleControl(debug,noResponse,serialize,errorText).call(owner,request)}\n`
const types=`import type {SDKControlRequest,SDKControlMcpMessageRequest} from '../controlTypes.js'\nimport type {PermissionResult} from '../coreTypes.recovered.js'\nimport type {JSONRPCMessage} from '@modelcontextprotocol/sdk/types.js'\nexport function invokeOriginalSDKCanUseTool287<T extends symbol>(owner:object,request:SDKControlRequest,signal:AbortSignal,noResponse:T):Promise<(PermissionResult&{toolUseID:string})|T>\nexport function invokeOriginalSDKIgnore287<T extends symbol>(request:SDKControlRequest,noResponse:T,debug:(message:string)=>void):T|undefined\nexport function isOriginalSDKMcpRequest287(message:JSONRPCMessage):boolean\nexport function invokeOriginalSDKOAuthRefresh287(owner:object,request:SDKControlRequest,signal:AbortSignal):Promise<{accessToken:string|null;reason?:'signed_out'|'identity_changed'|'transient'|'refresh_failed'}>\nexport function invokeOriginalSDKWorkSecret287(owner:object,request:SDKControlRequest,signal:AbortSignal):Promise<{work_secret:string|null}>\nexport function invokeOriginalSDKProcessControl287<T extends symbol>(owner:object,request:SDKControlRequest,signal:AbortSignal,noResponse:T,debug:(message:string)=>void,track:(name:string,metadata:any)=>void,tag:(value:string)=>unknown):Promise<unknown|T>\nexport function invokeOriginalSDKHookCallback287(owner:object,id:string,input:unknown,toolUseID:string|undefined,signal:AbortSignal):Promise<unknown>\nexport function invokeOriginalSDKMcpControl287(owner:object,name:string,request:SDKControlMcpMessageRequest,transport:object):Promise<JSONRPCMessage>\n`
const envelopeTypes="export function invokeOriginalSDKHandleControlRequest287<T extends symbol>(owner:object,request:SDKControlRequest,debug:(message:string,options?:{level:'error'})=>void,noResponse:T,serialize:(value:unknown)=>string,errorText:(error:unknown)=>string):Promise<void>\n"
for(const [name,value] of [['native.js',native+wholeNative+envelopeNative],['native.d.ts',types+envelopeTypes],['requestTypes.ts',permissionTypes],['provenance.json',JSON.stringify(proof,null,2)+'\n']]){
 const target=path.join(dir,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==value)throw Error('Generated SDK permission source drift: '+name)}
 else fs.writeFileSync(target,value)
}
console.log(JSON.stringify({module,methodSha256,blockSha256:proof.block.sha256,start,end,check:process.argv.includes('--check')}))
