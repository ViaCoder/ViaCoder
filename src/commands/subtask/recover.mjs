import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {createRequire} from 'node:module'

const dir=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(dir,'../../..')
const ts=createRequire(import.meta.url)(path.join(repo,'node_modules/typescript/lib/typescript.js'))
const raw=path.resolve(repo,'../.work/official-modules-2.1.287/darwin-arm64/raw')
const hash=text=>crypto.createHash('sha256').update(text).digest('hex')
const expected={
 'chunk-4kt1k32g.js':'e9343334f18c8d42ae671c9916ed9309bbc1b43703daa47cf80c4a835a82337c',
 'chunk-kvyvqe2b.js':'32176a422144bed860dc872f818e74814158da81c93921b8db387ec00b5d7340',
 'chunk-hrhfcbdv.js':'1227551b6344de46fc4f445033bd95d10afb260205a4746eac81c6e866a2ddf6',
 'chunk-ke6n6sdy.js':'eadf53899b2bfd33d04e83de7e1008925efb364dcf03337fcd03437f18af7b14',
 'chunk-mphp7acd.js':'cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384',
}
const sources=new Map(Object.entries(expected).map(([module,sha256])=>{
 const bytes=fs.readFileSync(path.join(raw,module));if(hash(bytes)!==sha256)throw Error('Fixed npm287 module drift: '+module)
 const text=bytes.toString('utf8'),ast=ts.createSourceFile(module,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
 if(ast.parseDiagnostics.length)throw Error('Raw parse failure: '+module)
 return [module,{module,sha256,text,ast}]
}))
function cut(source,node){const start=node.getStart(source.ast),end=node.end;return {start,end,sha256:hash(source.text.slice(start,end)),text:source.text.slice(start,end)}}
function declaration(module,name){
 const source=sources.get(module)
 for(const statement of source.ast.statements){
  if(ts.isFunctionDeclaration(statement)&&statement.name?.text===name)return {source,statement,node:statement,flags:null,kind:'function'}
  if(ts.isVariableStatement(statement))for(const node of statement.declarationList.declarations)if(ts.isIdentifier(node.name)&&node.name.text===name)return {source,statement,node,flags:statement.declarationList.flags,kind:statement.declarationList.flags&ts.NodeFlags.BlockScoped?'block-scoped':'var'}
 }
 throw Error('Original declaration missing: '+module+':'+name)
}
const m=declaration('chunk-4kt1k32g.js','m')
if(m.kind!=='var'||m.statement.declarationList.declarations.length!==1||m.node.getStart(m.source.ast)!==13210||m.node.end!==13613)throw Error('Original m shape/range drift')
const ports=[['QRt','chunk-kvyvqe2b.js'],['pT','chunk-hrhfcbdv.js'],['Ea','chunk-ke6n6sdy.js'],['kf','chunk-mphp7acd.js']]
const imports=m.source.ast.statements.filter(ts.isImportDeclaration).map(node=>cut(m.source,node))
const named=m.source.ast.statements.filter(ts.isImportDeclaration).flatMap(node=>node.importClause?.namedBindings&&ts.isNamedImports(node.importClause.namedBindings)?node.importClause.namedBindings.elements.map(e=>({name:e.name.text,imported:(e.propertyName??e.name).text,module:path.basename(node.moduleSpecifier.text)})):[])
if(named.length!==4||ports.some(([name,module])=>!named.some(p=>p.name===name&&p.imported===name&&p.module===module)))throw Error('Original imports drift')
const exports=m.source.ast.statements.filter(ts.isExportDeclaration)
if(exports.length!==1||exports[0].getText(m.source.ast)!=='export{m as call};')throw Error('Original export drift')
const proof={version:'2.1.287',platform:'darwin-arm64',rangeConvention:'UTF-16 end-exclusive',module:m.source.module,moduleSha256:m.source.sha256,
 declaration:{name:'m',kind:m.kind,declarationListFlags:m.flags,...cut(m.source,m.node)},statement:cut(m.source,m.statement),imports,exports:exports.map(node=>cut(m.source,node)),
 dependencies:ports.map(([name,module])=>{const d=declaration(module,name);return {name,module,moduleSha256:d.source.sha256,kind:d.kind,declarationListFlags:d.flags,...cut(d.source,d.node),owner:"getOriginalModsLifecycle287().clearSourceModule287(module)[name]"}}),
 adaptation:'Original var m statement verbatim; four named dependencies borrowed by reference from the existing canonical owner. Raw side-effect import statements recorded, not independently replayed. return {call:m} preserves the original export reference.'}
const native=`// Generated from fixed npm 2.1.287; original var statement is byte-for-byte intact.\nexport function createSubtaskCommand287(ports){\nconst {QRt,pT,Ea,kf}=ports;\n${proof.statement.text}\nreturn {call:m};\n}\n`
const types=`import type {LocalJSXCommandCall} from '../../types/command.js'\nimport type {CanUseToolFn} from '../../hooks/useCanUseTool.js'\nexport type SubtaskCommandPorts287={\n QRt:(prompt:string,context:Parameters<LocalJSXCommandCall>[1],canUseTool:CanUseToolFn)=>Promise<{agentId:string;name:string}|null>\n pT:string\n Ea:()=>boolean\n kf:CanUseToolFn\n}\nexport function createSubtaskCommand287(ports:SubtaskCommandPorts287):{call:LocalJSXCommandCall}\n`
const official=`// Generated adapter: no second fork/session/approval owner.\nimport {createSubtaskCommand287,type SubtaskCommandPorts287} from './native.js'\nimport {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'\nconst canonical=getOriginalModsLifecycle287()\nexport const subtaskCommandPorts287:SubtaskCommandPorts287={\n${ports.map(([name,module])=>` ${name}:canonical.clearSourceModule287('${module}').${name} as SubtaskCommandPorts287['${name}'],`).join('\n')}\n}\nexport const call=createSubtaskCommand287(subtaskCommandPorts287).call\n`
const generated={'native.js':native,'native.d.ts':types,'official287.ts':official,'provenance.json':JSON.stringify(proof,null,2)+'\n'}
const check=process.argv.includes('--check')
if(process.argv.slice(2).some(arg=>arg!=='--check'))throw Error('Usage: node recover.mjs [--check]')
for(const [file,content]of Object.entries(generated)){const target=path.join(dir,file);if(check){if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==content)throw Error('Generated drift: '+file)}else fs.writeFileSync(target,content)}
console.log(JSON.stringify({mode:check?'check':'generate',moduleSha256:proof.moduleSha256,statementSha256:proof.statement.sha256,dependencyCount:ports.length,files:Object.keys(generated)}))
