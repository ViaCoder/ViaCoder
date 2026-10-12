import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
const corpus=path.resolve(import.meta.dirname,'../../../../.work/official-modules-2.1.287/darwin-arm64')
const sha=value=>crypto.createHash('sha256').update(value).digest('hex')
const manifestBytes=fs.readFileSync(path.join(corpus,'manifest.json'))
const pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(manifestBytes)!==pin)throw Error('287 park lane manifest changed')
const manifest=JSON.parse(manifestBytes),file='chunk-xapeakym.js',entry=manifest.modules.find(row=>row.path===file)
const raw=fs.readFileSync(path.join(corpus,'raw',file))
if(raw.length!==entry.length||sha(raw)!==entry.sha256)throw Error('287 park lane raw changed')
const text=raw.toString('utf8'),ast=ts.createSourceFile(file,text,99,true,1)
if(ast.parseDiagnostics.length)throw Error('Invalid original park lane source')
const rows=['kT','A_'].map(name=>{
 const node=ast.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text===name)
 if(!node)throw Error('Missing original park lane declaration '+name)
 const source=text.slice(node.getStart(ast),node.end)
 return {file,name,start:node.getStart(ast),endExclusive:node.end,moduleSha256:entry.sha256,sha256:sha(source),source}
})
const output='// Complete original 2.1.287 print park-lane policy, same typed environment owner.\nexport function createPrintParkLane287(a){\n'+rows.map(row=>row.source).join('\n')+'\nreturn A_();\n}\n'
const proof={version:'2.1.287',manifestSha256:pin,offsetUnit:'UTF16 end-exclusive',rows,port:'a = existing authEnvironment; no flags, timers, credentials or state owner allocated'}
for(const[name,value]of [['parkLaneNative287.js',output],['parkLaneProvenance287.json',JSON.stringify(proof,null,2)+'\n']]){
 const dest=path.join(import.meta.dirname,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==value)throw Error('Generated park lane changed '+name)}else fs.writeFileSync(dest,value)
}
console.log(JSON.stringify({declarations:rows.length,manifestSha256:pin,check:process.argv.includes('--check')}))
