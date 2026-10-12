import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'
import {resultTypesFromSource} from '../officialResultSchemas287/typesFromSource.mjs'

const root=path.resolve(import.meta.dirname,'../../../../../.work/official-modules-2.1.287/darwin-arm64')
const file='chunk-xep95vq1.js',sha=x=>crypto.createHash('sha256').update(x).digest('hex')
const manifestBytes=fs.readFileSync(root+'/manifest.json'),manifestSha256='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(manifestBytes)!==manifestSha256)throw Error('Control schema manifest drift')
const manifest=JSON.parse(manifestBytes),entry=manifest.modules.find(m=>m.path===file),bytes=fs.readFileSync(root+'/raw/'+file)
if(bytes.length!==entry.length||sha(bytes)!==entry.sha256)throw Error('Control schema module drift')
const ast=ts.createSourceFile(file,bytes.toString(),99,true,ts.ScriptKind.JS)
if(ast.parseDiagnostics.length)throw Error('Control schema parse failure')
const declarations=new Map(ast.statements.flatMap(n=>ts.isVariableStatement(n)?[...n.declarationList.declarations]:[n]).filter(n=>n.name&&ts.isIdentifier(n.name)).map(n=>[n.name.text,n]))
const roots={Io:'get_status',Do:'export_conversation',xo:'get_memory_dialog',Uo:'get_chrome_dialog',Vo:'get_chrome_browsers',jo:'select_chrome_browser',Fo:'list_directory',HJe:'turn_handoff',ai:'register_repo_root',li:'set_cwd',wi:'submit_feedback',IEn:'message_rated'}
const enumFile='chunk-a56phknn.js',enumEntry=manifest.modules.find(m=>m.path===enumFile),enumBytes=fs.readFileSync(root+'/raw/'+enumFile)
if(enumBytes.length!==enumEntry.length||sha(enumBytes)!==enumEntry.sha256)throw Error('Control schema enum module drift')
const enumAst=ts.createSourceFile(enumFile,enumBytes.toString(),99,true,ts.ScriptKind.JS),enumRows=[]
for(const statement of enumAst.statements)if(ts.isVariableStatement(statement))for(const node of statement.declarationList.declarations){
 if(!['r4o','o4o','s4o','i4o','a4o'].includes(node.name.getText(enumAst)))continue
 const source=node.getText(enumAst)
 declarations.set(node.name.getText(enumAst),node)
 enumRows.push({file:enumFile,name:node.name.getText(enumAst),start:node.getStart(enumAst),endExclusive:node.end,moduleSha256:enumEntry.sha256,sha256:sha(source),source})
}
const rows=Object.entries(roots).map(([name,subtype])=>{
 const node=declarations.get(name)
 if(!node||!node.getText(ast).includes('subtype:x('+JSON.stringify(subtype)+')'))throw Error('Control schema root mismatch '+name)
 const source=node.getText(ast)
 return {file,name,subtype,start:node.getStart(ast),endExclusive:node.end,moduleSha256:entry.sha256,sha256:sha(source),source}
})
// Reuse the established source-AST translator, not z.infer under non-strict
// null checking. Type-only dependencies allocate no extra schema/cache owner.
const generated=resultTypesFromSource(declarations,Object.keys(roots)).replaceAll('OriginalResult_','OriginalControl_').replace(/export type ResultSuccess287[^\n]*\nexport type ResultError287[^\n]*\n$/,'')
const types=generated+'export type PublicControlRequest287 = '+Object.keys(roots).map(n=>'OriginalControl_'+n).join(' | ')+';\n'
const emittedNames=new Set([...types.matchAll(/export type (OriginalControl_\w+) =/g)].map(match=>match[1]))
const typeRows=[...declarations].filter(([name])=>emittedNames.has('OriginalControl_'+name.replaceAll('$','dollar'))).map(([name,node])=>{
 const source=node.getText(),origin=enumRows.find(r=>r.name===name)
 return origin??{file,name,start:node.getStart(ast),endExclusive:node.end,moduleSha256:entry.sha256,sha256:sha(source),source}
})
const runtime="// Generated canonical schema view; no new Zod factories or state.\nimport type {z} from 'zod/v4'\nimport type {PublicControlRequest287} from './types.js'\nimport {getPrintHostSource287} from '../../../cli/printOwnership287/publicHostRuntime287.js'\nconst roots="+JSON.stringify(Object.keys(roots))+" as const\nexport function publicControlRequestSchemas287():z.ZodType<PublicControlRequest287>[] {\n return roots.map(name=>(getPrintHostSource287('chunk-xep95vq1.js',name) as ()=>z.ZodType<PublicControlRequest287>)())\n}\n"
const proof={version:'2.1.287',manifestSha256,offsetUnit:'UTF16 end-exclusive',rows,enumRows,typeRows,owner:'existing canonical chunk-xep95vq1 module; no duplicate runtime schemas',typeTransport:'existing AST translator; OriginalResult prefix renamed for independent type namespace; all dependent declarations retained'}
for(const [name,body]of Object.entries({'types.ts':types,'runtime.ts':runtime,'provenance.json':JSON.stringify(proof,null,2)+'\n'})){
 const dest=path.join(import.meta.dirname,name)
 if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==body)throw Error('Control schema generated drift '+name)}else fs.writeFileSync(dest,body)
}
console.log(JSON.stringify({roots:rows.length,check:process.argv.includes('--check'),moduleSha256:entry.sha256}))
