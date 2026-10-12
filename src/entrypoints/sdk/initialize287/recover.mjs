import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'

const dir=import.meta.dirname,root=path.resolve(dir,'../../../../../.work/official-modules-2.1.287/darwin-arm64')
const hash=value=>crypto.createHash('sha256').update(value).digest('hex')
const manifestBytes=fs.readFileSync(path.join(root,'manifest.json'))
if(hash(manifestBytes)!=='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5')throw Error('Fixed287 manifest drift')
const manifest=JSON.parse(manifestBytes),rows=[],inputs=new Map()
function input(file){
 if(inputs.has(file))return inputs.get(file)
 const pin=manifest.modules.find(row=>row.path===file),bytes=fs.readFileSync(path.join(root,'raw',file))
 if(!pin||hash(bytes)!==pin.sha256||bytes.length!==pin.length)throw Error('Fixed287 source drift: '+file)
 const text=bytes.toString('utf8'),ast=ts.createSourceFile(file,text,99,true,1)
 if(ast.parseDiagnostics.length)throw Error('Fixed287 parse failure: '+file)
 const result={file,moduleSha256:pin.sha256,text,ast};inputs.set(file,result);return result
}
function cut(source,node,label){
 const start=node.getStart(source.ast),end=node.end,text=source.text.slice(start,end)
 rows.push({file:source.file,moduleSha256:source.moduleSha256,label,start,end,sha256:hash(text),text})
 return text
}
function declaration(file,name){
 const source=input(file)
 for(const statement of source.ast.statements){
  if((ts.isFunctionDeclaration(statement)||ts.isClassDeclaration(statement))&&statement.name?.text===name)return cut(source,statement,name)
  if(ts.isVariableStatement(statement))for(const node of statement.declarationList.declarations)if(node.name.getText(source.ast)===name){
   const keyword=statement.declarationList.flags&ts.NodeFlags.Const?'const':statement.declarationList.flags&ts.NodeFlags.Let?'let':'var'
   return keyword+' '+cut(source,node,name)+';'
  }
 }
 throw Error('Complete original declaration missing: '+file+':'+name)
}
const sdk=input('chunk-j0381q8k.js'),query=sdk.ast.statements.find(n=>ts.isClassDeclaration(n)&&n.name?.text==='Ue')
if(!query)throw Error('Original Query owner missing')
const methodNames=['initialize','buildInitializeRequest','captureSdkMcpServerManifests','connectSdkMcpServer','sendMcpServerMessageToCli']
const methods=methodNames.map(name=>{
 const node=query.members.find(n=>ts.isMethodDeclaration(n)&&n.name.getText(sdk.ast)===name)
 if(!node)throw Error('Complete original Query method missing: '+name)
 return cut(sdk,node,'Ue.'+name)
})
const deps=[
 ...['Ae','Nt','_n','en','Qt'].map(name=>declaration(sdk.file,name)),
 ...['frt','AYt','l'].map(name=>declaration('chunk-49evd8xc.js',name)),
 declaration('chunk-hrhfcbdv.js','N'),
 ...['Qqe','Zqe','SCr'].map(name=>declaration('chunk-0p2fqac8.js',name)),
 declaration('chunk-0rn4hgq0.js','Ide'),
 ...['s','lt'].map(name=>declaration('chunk-f2n7vgt8.js',name)),
 declaration('chunk-4s38z9x2.js','Le'),
 declaration('chunk-brnn4zwp.js','Air'),
].join('\n')
const singletonEmptyPrompt=declaration('chunk-xapeakym.js','qw')
const creator=sdk.ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='es')
if(!creator)throw Error('Original SDK creator missing')
const statements=[0,1,3,5,6,10,11].map(i=>cut(sdk,creator.body.statements[i],'es.statement.'+i))
const config=creator.body.statements[31].declarationList.declarations.find(n=>n.name.getText(sdk.ast)==='bs')
if(!config||!config.initializer.getText(sdk.ast).includes('captureSdkMcpManifests:!Air('))throw Error('Original initialization config missing')
const projection=statements.join('\n')+'\nlet '+cut(sdk,config,'es.bs')+';return bs;'
const body=deps+'\nclass OriginalQueryMethods{\n'+methods.join('\n')+'\n}\nreturn {methods:OriginalQueryMethods.prototype,project:function(e,s,Bn,fO){'+projection+'}};'
const native=`// Generated from fixed npm2.1.287; complete Query methods and stateless dependencies.
import {randomUUID as $fe} from 'node:crypto'
import {posix as mn,win32 as hn} from 'node:path'
${singletonEmptyPrompt}
export {qw as isSingletonEmptySystemPrompt287}
const factory=new Function('t','y','p','_','Y','mn','hn','$fe',${JSON.stringify(body)});
export function createSDKInitialization287(debug,track){
 const source=factory(debug,track,(name,phase,metadata)=>track(name,{...metadata,phase}),JSON.stringify,JSON.parse,mn,hn,$fe);
 return {
  initialize:(owner,options)=>source.methods.initialize.call(owner,options),
  build:(owner,manifests)=>source.methods.buildInitializeRequest.call(owner,manifests),
  capture:owner=>source.methods.captureSdkMcpServerManifests.call(owner),
  connect:(owner,name,config)=>source.methods.connectSdkMcpServer.call(owner,name,config),
  send:(owner,name,message)=>source.methods.sendMcpServerMessageToCli.call(owner,name,message),
  project:(options,context,controller)=>source.project(options,context,()=>controller,()=>Boolean(process.versions.bun)),
 };
}
`
const types=`import type {Transport} from '@modelcontextprotocol/sdk/shared/transport.js'
import type {JSONRPCMessage} from '@modelcontextprotocol/sdk/types.js'
import type {InternalOptions} from '../runtimeTypes.js'
import type {SDKControlInitializeRequest,SDKControlInitializeResponse} from '../controlTypes.js'
export type SDKMcpManifest287={initializeResult:Record<string,unknown>;toolsListResult?:Record<string,unknown>}
export type SDKInitializationConfig287=Omit<SDKControlInitializeRequest,'subtype'|'hooks'|'sdkMcpServers'|'sdkMcpServerConfigs'|'sdkMcpServerManifests'|'jsonSchema'|'skills'>&{skills?:'all'|string[];captureSdkMcpManifests?:boolean}
export type SDKInitializationMethods287={
 initialize(owner:object,options?:{first:boolean}):Promise<SDKControlInitializeResponse>;
 build(owner:object,manifests?:Record<string,SDKMcpManifest287>):SDKControlInitializeRequest;
 capture(owner:object):Promise<Record<string,SDKMcpManifest287>|undefined>;
 connect(owner:object,name:string,config:{instance:{connect(transport:Transport):Promise<void>};timeout?:number}):void;
 send(owner:object,name:string,message:JSONRPCMessage):void;
 project(options:InternalOptions,context:{isSingleUserTurn:boolean},controller:AbortController):SDKInitializationConfig287;
}
export function isSingletonEmptySystemPrompt287(value:unknown):boolean
export function createSDKInitialization287(debug:(message:string,options?:{level?:string})=>void,track:(name:string,metadata:any)=>void):SDKInitializationMethods287
`
const provenance={version:'2.1.287',manifestSha256:hash(manifestBytes),rangeConvention:'UTF-16 end-exclusive',methods:methodNames,rows,adaptation:'Complete original Ue methods on the existing QueryRuntime owner/maps and complete SCr transport. es prompt/config projection statements and bs declaration preserved verbatim; process transport/session-store setup remains separate. Native JSON ports omit profiling wrappers only; existing telemetry-disabled C sink receives original y/p calls. No new state owner, token source, model request or provider eligibility.'}
for(const [name,value]of [['native.js',native],['native.d.ts',types],['provenance.json',JSON.stringify(provenance,null,2)+'\n']]){
 const target=path.join(dir,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==value)throw Error('SDK initialize generated drift: '+name)}else fs.writeFileSync(target,value)
}
console.log(JSON.stringify({rows:rows.length,methods:methodNames,sha256:hash(native),check:process.argv.includes('--check')}))
