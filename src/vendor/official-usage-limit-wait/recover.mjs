import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
import {fileURLToPath} from 'node:url';
const root=process.argv[2];
if(!root) throw Error('Pass local pinned platform directory');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
if(manifest.version!=='2.1.283'||manifest.platform!=='darwin-arm64') throw Error('Wrong source');
const dir=path.dirname(fileURLToPath(import.meta.url)), sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const modules=[['chunk-r6te8jtn.js','intent.js'],['chunk-4akyf8px.js','gates.js'],['chunk-a7h398es.js','state.js']];
const records=[];
for(const [name,out] of modules){
 const raw=fs.readFileSync(path.join(root,'raw',name),'utf8');
 if(sha(raw)!==manifest.modules.find(m=>m.path===name)?.sha256)throw Error('Source changed '+name);
 const ast=ts.createSourceFile(name,raw,99,true,ts.ScriptKind.JS), declarations=[];
 let output='// Official npm 2.1.283: entire module declarations unchanged; imports adapted. See NOTICE.\n';
 for(const s of ast.statements){
  let text=s.getText(ast);
  if(ts.isImportDeclaration(s)){
   const original=s.moduleSpecifier.text;
   const target=modules.find(([n])=>original.endsWith('/'+n));
   text=text.replace(original, target?'./'+target[1]:original==='crypto'?'node:crypto':'./host.js');
  }else if(!ts.isExportDeclaration(s)) declarations.push({symbol:s.name?.text??s.declarationList?.declarations.map(d=>d.name.getText(ast)).join(','),sha256:sha(text)});
  output+=text+'\n';
 }
 fs.writeFileSync(path.join(dir,out),output);
 records.push({module:name,output:out,moduleSha256:sha(raw),sha256:sha(output),declarations});
 if(out==='state.js')fs.writeFileSync(path.join(dir,'NOTICE'),raw.slice(0,raw.indexOf('import')));
}
fs.writeFileSync(path.join(dir,'provenance.json'),JSON.stringify({version:manifest.version,records},null,2)+'\n');
console.log(records.map(r=>({file:r.output,declarations:r.declarations.length})));
