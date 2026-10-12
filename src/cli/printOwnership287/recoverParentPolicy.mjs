import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
const root=path.resolve(import.meta.dirname,'../../../..','.work/official-modules-2.1.287/darwin-arm64')
const sha=value=>crypto.createHash('sha256').update(value).digest('hex')
const manifestBytes=fs.readFileSync(path.join(root,'manifest.json'))
const pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(manifestBytes)!==pin)throw Error('Unpinned parent policy corpus')
const manifest=JSON.parse(manifestBytes),rows=[]
for(const [file,names] of [['chunk-f1vb7bx7.js',['bje']],['chunk-hrhfcbdv.js',['AXr']],['chunk-bn3p37gv.js',['Jeo','Qeo','w6e']],['chunk-3mf1adxf.js',['its']]]){
 const entry=manifest.modules.find(row=>row.path===file),bytes=fs.readFileSync(path.join(root,'raw',file))
 if(!entry||sha(bytes)!==entry.sha256||bytes.length!==entry.length)throw Error('Invalid module '+file)
 const text=bytes.toString(),ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
 if(ast.parseDiagnostics.length)throw Error('Invalid original module '+file)
 for(const name of names){
  const node=ast.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text===name)
  if(!node)throw Error('Missing whole declaration '+name)
  const source=node.getText(ast)
  rows.push({file,name,start:node.getStart(ast),end:node.end,moduleSha256:entry.sha256,moduleLength:entry.length,sha256:sha(source),source})
 }
}
const body='const {M,uO,tR,n,gt,t,Ro}=ports;\n'+rows.map(row=>row.source).join('\n')+'\nreturn {included:bje,load:its,invalid:w6e};'
const outputs={
 'parentPolicyNative287.js':'// Whole original bje/AXr/its and settingsSource accessors; no policy state.\nexport function createPrintParentPolicy287(ports){\n'+body+'\n}\n',
 'parentPolicyProvenance287.json':JSON.stringify({version:manifest.version,platform:manifest.platform,manifestSha256:pin,rows,borrowed:{M:'getModelUsagePolicyContext287',uO:'same modelUsagePolicy.readPolicyHelperComposition287',tR:'same modelUsagePolicy.readPolicyRecords287',n:'getExecutionSession287',gt:'safeParseJSON',t:'logForDebugging',Ro:'resetSettingsCache'}},null,2)+'\n',
}
for(const [file,content]of Object.entries(outputs)){
 const dest=path.join(import.meta.dirname,file)
 if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==content)throw Error('Generated mismatch '+file)}else fs.writeFileSync(dest,content)
}
console.log('Parent policy '+(process.argv.includes('--check')?'check':'generated')+': '+rows.length+' whole declarations; one existing policy/settingsSource owner')
