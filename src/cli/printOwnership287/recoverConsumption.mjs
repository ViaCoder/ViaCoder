import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
const base=path.resolve(import.meta.dirname,'../../../../.work/official-modules-2.1.287/darwin-arm64'),sha=x=>crypto.createHash('sha256').update(x).digest('hex')
const manifestBytes=fs.readFileSync(base+'/manifest.json'),pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(manifestBytes)!==pin)throw Error('Consumption manifest drift')
const manifest=JSON.parse(manifestBytes),file='chunk-xapeakym.js',entry=manifest.modules.find(x=>x.path===file),bytes=fs.readFileSync(base+'/raw/'+file)
if(sha(bytes)!==entry.sha256||bytes.length!==entry.length)throw Error('Consumption module drift')
const ast=ts.createSourceFile(file,bytes.toString(),99,true,1),owner=ast.statements.find(n=>n.name?.text==='TS'),rows=[]
const local=name=>owner.body.statements.find(n=>n.name?.text===name),top=name=>ast.statements.find(n=>n.name?.text===name)
function record(name,node,role='production'){if(!node)throw Error('Consumption source missing '+name);const source=node.getText(ast);rows.push({name,file,start:node.getStart(ast),endExclusive:node.end,sha256:sha(source),moduleSha256:entry.sha256,moduleLength:entry.length,source,role});return source}
const funcs=['Fa','Ws','Qs'].map(n=>record(n,local(n))).join('\n')+'\n'+['Al','gS','jT','WT'].map(n=>record(n,top(n))).join('\n')
record('_y',top('_y'),'canonical-source-reference');
record('Ml',top('Ml'),'canonical-source-reference-whole-input-and-query-context');
const xr=local('Xr');record('Xr',xr,'full-source-reference-prefix-C-boundary')
const start=xr.body.statements.find(n=>ts.isVariableStatement(n)&&n.declarationList.declarations[0].name.getText(ast)==='ru').getStart(ast),end=xr.body.statements.at(-1).end,tail=bytes.toString().slice(start,end)
const xrDecls=xr.body.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[])
const echo=['dn','Gr','$n','es','Ys'].map(name=>'let '+record('Xr.'+name,xrDecls.find(n=>n.name.getText(ast)===name))+';').join('\n')
rows.push({name:'Xr.preparedConsumption',file,start,endExclusive:end,sha256:sha(tail),moduleSha256:entry.sha256,moduleLength:entry.length,source:tail,role:'production-prepared-turn-continuation'})
const bindings={}
for(const n of ast.statements.filter(ts.isImportDeclaration))for(const spec of n.importClause?.namedBindings?.elements??[])bindings[spec.name.text]={file:n.moduleSpecifier.text.split('/').at(-1),name:spec.propertyName?.text??spec.name.text}
for(const n of ast.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n]))if(n.name&&ts.isIdentifier(n.name))bindings[n.name.text]??={file,name:n.name.text}
const body='with(p){'+funcs+'\nasync function* consume(dt,De,Pt){'+echo+'\n'+tail+'}\nreturn {consume,recordSystem:Fa,recordRefusal:Ws,initialize:Qs}}'
// The complete entry includes its prepared continuation in the same lexical
// owner. The caller must not instantiate the earlier split stage/feed beside it.
const wholeEntry=record('TS',owner,'production-whole-input-owner')
const wholeRuntime=ts.transpileModule('with(p){'+wholeEntry+';return TS(e)}',{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None},reportDiagnostics:true})
if(wholeRuntime.diagnostics?.some(d=>d.category===ts.DiagnosticCategory.Error))throw Error('Whole TS disposal transform failed')
// Audit every source dependency needed by the whole continuation, not only the
// currently exercised branch. Caller cells remain explicit runtime-owned ports.
const closure=ts.createSourceFile('closure.js','function closure(){'+funcs+'\nasync function* consume(dt,De,Pt){'+echo+'\n'+tail+'}}',99,true,1)
const host={getSourceFile:n=>n==='closure.js'?closure:undefined,getDefaultLibFileName:()=>'',writeFile(){},getCurrentDirectory:()=> '/',getCanonicalFileName:n=>n,useCaseSensitiveFileNames:()=>true,getNewLine:()=> '\n',fileExists:n=>n==='closure.js',readFile:n=>n==='closure.js'?closure.text:undefined}
const checker=ts.createProgram(['closure.js'],{allowJs:true,noLib:true,noResolve:true},host).getTypeChecker(),free=new Set()
function visit(n){if(ts.isIdentifier(n)&&!checker.getSymbolAtLocation(n)&&Object.hasOwn(bindings,n.text)&&!(ts.isPropertyAccessExpression(n.parent)&&n.parent.name===n)&&!(ts.isPropertyAssignment(n.parent)&&n.parent.name===n))free.add(n.text);ts.forEachChild(n,visit)}visit(closure)
const explicitCallerBindings=new Set(['HT','ps']) // Runtime UUID primitive and same raw arrival duration owner.
const canonicalConsumptionBindings=Object.fromEntries([...free].filter(name=>!explicitCallerBindings.has(name)).sort().map(name=>[name,bindings[name]]))
const native='// Exact 287 prepared continuation and complete same-owner TS entry.\nconst factory=new Function("p",'+JSON.stringify(body)+');\nconst wholeFactory=new Function("p",'+JSON.stringify(wholeRuntime.outputText)+');\nexport function createPrintConsumption287(p){return factory(p)}\nexport function createWholePrintInput287(p){return wholeFactory(p)}\n'
for(const[name,text]of [['consumptionNative.js',native],['consumptionProvenance.json',JSON.stringify({version:'2.1.287',manifestSha256:pin,offsetUnit:'UTF16 end-exclusive',scope:'Whole original TS includes input prefix and prepared tail; same canonical Ml/Ctt/_y/Q6e and explicit C input/query boundary. Legacy prepared helper is not instantiated on production QueryEngine path.',rows,bindings,canonicalConsumptionBindings},null,2)+'\n']]){const destination=path.join(import.meta.dirname,name);if(process.argv.includes('--check')){if(fs.readFileSync(destination,'utf8')!==text)throw Error(name)}else fs.writeFileSync(destination,text)}
console.log(JSON.stringify({records:rows.length,nativeSha256:sha(native)}))
