import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
const repo=path.resolve(import.meta.dirname,'../../..'),corpus=path.resolve(repo,'../.work/official-modules-2.1.287/darwin-arm64'),sha=s=>crypto.createHash('sha256').update(s).digest('hex')
const manifestBytes=fs.readFileSync(path.join(corpus,'manifest.json')),pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(manifestBytes)!==pin)throw Error('Unpinned manifest')
const manifest=JSON.parse(manifestBytes),file='chunk-89m3jf58.js',entry=manifest.modules.find(r=>r.path===file),bytes=fs.readFileSync(path.join(corpus,'raw',file))
if(sha(bytes)!==entry.sha256||bytes.length!==entry.length)throw Error('Unpinned stats module')
const raw=bytes.toString('utf8'),ast=ts.createSourceFile(file,raw,99,true,ts.ScriptKind.JS)
if(ast.parseDiagnostics.length)throw Error('Invalid source')
const names=['n','s','r','IMe','$4'],rows=[]
for(const st of ast.statements)for(const node of ts.isVariableStatement(st)?st.declarationList.declarations:[st])if(node.name&&names.includes(node.name.getText(ast))){const source=node.getText(ast);rows.push({file,name:node.name.getText(ast),start:node.getStart(ast),end:node.end,moduleSha256:entry.sha256,moduleLength:entry.length,source,sha256:sha(source),variable:ts.isVariableDeclaration(node)})}
if(rows.length!==5)throw Error('Incomplete stats declarations')
// Every selected declaration is original, including the one IMe registry.
// Tt is cut to the already installed canonical execution registry constructor.
const native='// Generated complete official 2.1.287 subagent stats; do not edit.\nexport function createSubagentStatsNative287(ports){\nconst Tt=ports.sessionRegistry,d=ports.logError;\n'+rows.map(r=>(r.variable?'var ':'')+r.source+';').join('\n')+'\nreturn {registry:IMe,snapshot:$4};\n}\n'
const proof={version:manifest.version,platform:manifest.platform,manifestSha256:pin,offsetUnit:'UTF-16 code units',roots:{registry:[file,'IMe'],snapshot:[file,'$4']},sourceContracts:{},modules:[{file,moduleSha256:entry.sha256,moduleLength:entry.length,rows,bindings:{Tt:{port:'sessionRegistry',identity:'chunk-bn3p37gv.js:Tt'},d:{port:'logError',identity:'chunk-amhtwhch.js:d'}},initializers:[]}],ports:[{port:'sessionRegistry',identity:'chunk-bn3p37gv.js:Tt'},{port:'logError',identity:'chunk-amhtwhch.js:d'}],nativeSha256:sha(native)}
for(const [name,text]of [['subagentStatsNative287.js',native],['subagentStatsProvenance287.json',JSON.stringify(proof,null,2)+'\n']]){const p=path.join(import.meta.dirname,name);if(process.argv.includes('--check')){if(fs.readFileSync(p,'utf8')!==text)throw Error('Stale '+name)}else fs.writeFileSync(p,text)}
console.log(JSON.stringify({declarations:rows.length,modules:1,nativeSha256:sha(native)}))
