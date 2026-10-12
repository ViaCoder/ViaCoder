import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
const out=import.meta.dirname,corpus=path.resolve(out,'../../../../.work/official-modules-2.1.287/darwin-arm64'),sha=s=>crypto.createHash('sha256').update(s).digest('hex')
const bytes=fs.readFileSync(path.join(corpus,'manifest.json')),manifest=JSON.parse(bytes),pin='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(bytes)!==pin)throw Error('Unpinned corpus')
const rows=[]
for(const [file,name]of [['chunk-t2h010j6.js','tb'],['chunk-xapeakym.js','hd']]){
 const raw=fs.readFileSync(path.join(corpus,'raw',file));if(sha(raw)!==manifest.modules.find(m=>m.path===file).sha256)throw Error('Module pin '+file)
 const ast=ts.createSourceFile(file,raw.toString(),99,true,1),node=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);if(!node)throw Error('Declaration missing '+name)
 rows.push({file,name,start:node.getStart(ast),end:node.end,moduleSha256:sha(raw),sha256:sha(node.getText(ast)),source:node.getText(ast)})
}
const artifacts={'dispatchPolicyNative.js':rows.map(r=>r.source+';').join('\n')+'\nexport {hd as commandLacksUserIntent287};\n','dispatchPolicyProvenance.json':JSON.stringify({manifestSha256:pin,rows},null,2)+'\n'}
for(const[name,body]of Object.entries(artifacts)){const file=path.join(out,name);if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==body)throw Error('Generator mismatch '+name)}else fs.writeFileSync(file,body)}
console.log('Dispatch policy '+(process.argv.includes('--check')?'check':'generated')+': 2 complete declarations')
