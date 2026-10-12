import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'

const dir=import.meta.dirname
const corpus=path.resolve(dir,'../../../../.work/official-modules-2.1.287/darwin-arm64')
const sha=value=>crypto.createHash('sha256').update(value).digest('hex')
const manifestBytes=fs.readFileSync(corpus+'/manifest.json'),manifest=JSON.parse(manifestBytes)
if(sha(manifestBytes)!=='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5')throw Error('Unpinned permission manifest')
const files=new Map()
function read(file){
 if(files.has(file))return files.get(file)
 const bytes=fs.readFileSync(corpus+'/raw/'+file)
 if(sha(bytes)!==manifest.modules.find(row=>row.path===file)?.sha256)throw Error('Unpinned permission module '+file)
 const filename=corpus+'/raw/'+file,options={allowJs:true,noLib:true,noResolve:true}
 const program=ts.createProgram([filename],options),ast=program.getSourceFile(filename),checker=program.getTypeChecker()
 if(ast.parseDiagnostics.length)throw Error('Invalid original permission AST '+file)
 const imports={},declarations=new Map()
 for(const node of ast.statements){
  if(ts.isImportDeclaration(node))for(const binding of node.importClause?.namedBindings?.elements??[])imports[binding.name.text]={file:path.basename(node.moduleSpecifier.text),name:(binding.propertyName??binding.name).text}
  if(ts.isFunctionDeclaration(node)&&node.name)declarations.set(node.name.text,node)
  if(ts.isVariableStatement(node))for(const declaration of node.declarationList.declarations)if(ts.isIdentifier(declaration.name))declarations.set(declaration.name.text,declaration)
 }
 const result={file,bytes,ast,checker,imports,declarations};files.set(file,result);return result
}
function evidence(module,node,name,kind){const source=node.getText(module.ast);return {file:module.file,name,kind,start:node.getStart(module.ast),end:node.end,moduleSha256:sha(module.bytes),sha256:sha(source),source,variable:ts.isVariableDeclaration(node)}}
function dependencies(module,node){
 const found=new Map()
 function visit(child){
  if(ts.isIdentifier(child)){
   const parent=child.parent
   if(ts.isPropertyAccessExpression(parent)&&parent.name===child||ts.isPropertyAssignment(parent)&&parent.name===child||ts.isBindingElement(parent)&&parent.propertyName===child)return
   const declarations=module.checker.getSymbolAtLocation(child)?.declarations??[]
   if(declarations.length&&declarations.every(declaration=>declaration.getStart(module.ast)>=node.getStart(module.ast)&&declaration.end<=node.end))return
   if(module.imports[child.text])found.set(child.text,module.imports[child.text])
   else if(module.declarations.has(child.text))found.set(child.text,{file:module.file,name:child.text})
   else if(declarations.length)found.set(child.text,{caller:child.text})
   else if(!['undefined','Error','Object','Map','Array'].includes(child.text))throw Error('Unresolved raw permission identifier '+module.file+':'+child.text)
  }
  ts.forEachChild(child,visit)
 }
 visit(node);return Object.fromEntries(found)
}
const roots={
 'chunk-xapeakym.js':['cp'],
 'chunk-4zgx6txq.js':['Q4','aN','NX','ke'],
 'chunk-hrhfcbdv.js':['KF','Vs','Tg','kh','Sse','gz'],
}
const modules=[],bindings={},rows=[]
for(const [file,names]of Object.entries(roots)){
 const module=read(file),selected=[];bindings[file]={}
 for(const name of names){const node=module.declarations.get(name);if(!node)throw Error('Missing raw permission root '+file+':'+name)
  const row=evidence(module,node,name,'complete-permission-declaration');selected.push(row);rows.push(row)
  Object.assign(bindings[file],dependencies(module,node))
 }
 modules.push({file,rows:selected})
}
const print=read('chunk-xapeakym.js');let branch
function find(node){if(ts.isIfStatement(node)&&node.expression.getText(print.ast)==='A.request.subtype==="set_permission_mode"'){if(branch)throw Error('Ambiguous original permission branch');branch=node}ts.forEachChild(node,find)}find(print.ast)
if(!branch||branch.getStart(print.ast)!==462387||branch.thenStatement.end!==462738)throw Error('Original permission branch identity changed')
const branchRow=evidence(print,branch.thenStatement,'set_permission_mode','complete-control-thenStatement')
// The enclosing AST if also owns the following else-if chain. Pin only the
// complete condition/consequent cut, as in the independent raw receiver.
const originalIf={...evidence(print,branch,'set_permission_mode','complete-if-consequent-source-evidence'),end:branch.thenStatement.end,
 source:print.ast.text.slice(branch.getStart(print.ast),branch.thenStatement.end)}
originalIf.sha256=sha(originalIf.source)
if(originalIf.sha256!=='208af99321778a6177e972c6b63899abfa112bb4be6b6f4f9faf64fac26df920')throw Error('Original complete permission branch changed')
Object.assign(bindings[print.file],dependencies(print,branch.thenStatement))
const callerCells=Object.values(bindings[print.file]).filter(binding=>binding.caller&&binding.caller!=='A').map(binding=>binding.caller).sort()
if(callerCells.join(',')!=='R,We,Yo,Ze')throw Error('Original permission caller ABI changed '+callerCells)
for(const [file,map]of Object.entries(bindings))for(const [alias,binding]of Object.entries(map))if(binding.caller)delete map[alias]

// Dependency leaves with mutable state are borrowed intact from the existing
// canonical source namespace. Never reconstruct De/ele or any store/cache here.
const supplierProofPath=path.resolve(dir,'../../utils/plugins/officialHooksLifecycle287/provenance.json')
const supplierProof=JSON.parse(fs.readFileSync(supplierProofPath,'utf8'))
if(supplierProof.manifestSha256!==sha(manifestBytes))throw Error('Permission canonical supplier baseline mismatch')
const suppliers=[]
for(const map of Object.values(bindings))for(const binding of Object.values(map)){
 if(roots[binding.file]?.includes(binding.name)||suppliers.some(row=>row.file===binding.file&&row.name===binding.name))continue
 const module=read(binding.file),node=module.declarations.get(binding.name)
 if(!node)throw Error('Missing raw permission supplier '+binding.file+':'+binding.name)
 const row=evidence(module,node,binding.name,'same-owner-canonical-supplier')
 const canonical=supplierProof.modules.find(entry=>entry.file===binding.file)?.rows.find(entry=>(entry.names??[entry.name]).includes(binding.name))
 if(!canonical||canonical.start!==row.start||canonical.end!==row.end||canonical.sha256!==row.sha256)throw Error('Missing complete existing canonical supplier '+binding.file+':'+binding.name)
 suppliers.push(row)
}
const writers=[]
function findWriters(node){
 if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&['Ze','We'].includes(node.name.text)&&node.initializer&&
  [447026,447135].includes(node.initializer.getStart(print.ast)))writers.push(evidence(print,node.initializer,node.name.text,'complete-print-lexical-writer-source-evidence'))
 ts.forEachChild(node,findWriters)
}findWriters(print.ast)
if(writers.length!==2)throw Error('Missing original print ACK/error writers')
// Actual We transports the same original xz including optional error_code.
const errorModule=read('chunk-w77dxxmg.js'),errorNode=errorModule.declarations.get('xz')
if(!errorNode)throw Error('Missing original permission error frame')
const errorFrame=evidence(errorModule,errorNode,'xz','same-owner-canonical-error-frame')
const errorCanonical=supplierProof.modules.find(entry=>entry.file===errorModule.file)?.rows.find(entry=>(entry.names??[entry.name]).includes('xz'))
if(!errorCanonical||errorCanonical.sha256!==errorFrame.sha256)throw Error('Missing existing complete xz supplier')
suppliers.push(errorFrame)
const body='with(ports){return function dispatch(A){for(const once of [0]){'+branchRow.source+'}}}'
if(ts.createSourceFile('permission-branch.js',body,99,true,ts.ScriptKind.JS).parseDiagnostics.length)throw Error('Invalid original permission transport')
const constructors=modules.map(module=>({file:module.file,names:module.rows.map(row=>row.name),body:'with(ports){'+module.rows.map(row=>(row.variable?'let ':'')+row.source+';').join('\n')+'return {'+module.rows.map(row=>row.name).join(',')+'};}'}))
for(const module of constructors)if(ts.createSourceFile('permission-module.js',module.body,99,true,ts.ScriptKind.JS).parseDiagnostics.length)throw Error('Invalid permission declarations transport '+module.file)
const native=`// Fixed official 2.1.287. Original complete declarations and thenStatement.
export const permissionModeControl287Definitions=${JSON.stringify(roots)};
const declarations=${JSON.stringify(constructors)};
const factories=declarations.map(({file,names,body})=>({file,names,create:new Function('ports',body)}));
const receive=new Function('ports',${JSON.stringify(body)});
export function createPrintPermissionModeControlNative287(caller,scope){
 // Only immutable function/static-literal namespaces, not permission state.
 const namespaces=new Map();
 function value(file,name){
  const factory=factories.find(entry=>entry.file===file&&entry.names.includes(name));
  if(!factory)throw Error('Missing restored permission declaration '+file+':'+name);
  if(!namespaces.has(file))namespaces.set(file,factory.create(scope(file,value)));
  return namespaces.get(file)[name];
 }
 return {dispatch:receive(scope('chunk-xapeakym.js',value,caller))};
}
`
const types="import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'\nexport const permissionModeControl287Definitions:Readonly<Record<string,readonly string[]>>;\nexport interface PrintPermissionModeControl287 {dispatch(frame:SDKControlRequest):void}\nexport function createPrintPermissionModeControlNative287(caller:object,scope:(file:string,definition:(file:string,name:string)=>unknown,caller?:object)=>object):PrintPermissionModeControl287;\n"
const proof={version:'2.1.287',platform:'darwin-arm64',manifestSha256:sha(manifestBytes),offsetUnit:'UTF-16 end-exclusive',branch:branchRow,originalIf,rows,bindings,callerCells,writers,suppliers,nativeSha256:sha(native),transport:['Whole original thenStatement, single-iteration shell preserves outer continue','Complete cp/Q4/aN and pure/static leaves, no body changes','All stateful gates/plan transitions borrow complete existing getPrintHostSource287 canonical suppliers; no new owner/store/cache','Actual print R/v/Ze/We/Yo; Yo uses the existing work-secret noteModeChoice','Auto alone stays on the pre-existing local SDK/Web extension gate; ordinary Plan uses original branch'],runtimeExecuted:false}
for(const [name,value]of Object.entries({'permissionModeControl287Native.js':native,'permissionModeControl287Native.d.ts':types,'permissionModeControl287Bindings.json':JSON.stringify(bindings,null,2)+'\n','permissionModeControl287Provenance.json':JSON.stringify(proof,null,2)+'\n'})){
 const filename=path.join(dir,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(filename,'utf8')!==value)throw Error('Stale '+name)}else fs.writeFileSync(filename,value)
}
console.log(JSON.stringify({branches:1,declarations:rows.length,sameOwnerSuppliers:suppliers.length,callerCells,nativeSha256:sha(native),runtimeExecuted:false}))
