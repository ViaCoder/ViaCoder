// Read-only verification and caller evidence from the pinned LOCAL package.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
const root=process.argv[2];if(!root)throw Error('Pass local platform directory');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
if(manifest.version!=='2.1.283'||manifest.platform!=='darwin-arm64')throw Error('Wrong source');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const dir=new URL('./',import.meta.url), records=JSON.parse(fs.readFileSync(new URL('provenance.json',dir),'utf8')).records;
const sources=new Map();
function source(name){if(sources.has(name))return sources.get(name);const raw=fs.readFileSync(path.join(root,'raw',name),'utf8');if(sha(raw)!==manifest.modules.find(m=>m.path===name)?.sha256)throw Error(name);const a=ts.createSourceFile(name,raw,99,true);sources.set(name,a);return a}
function node(a,name){return a.statements.find(s=>s.name?.text===name||ts.isVariableStatement(s)&&s.declarationList.declarations.map(d=>d.name.getText(a)).join(',')===name)}
for(const r of records){const a=source(r.module),out=fs.readFileSync(new URL(r.output,dir),'utf8');if(sha(out)!==r.sha256)throw Error(r.output);for(const d of r.declarations){const text=node(a,d.symbol)?.getText(a);if(!text||sha(text)!==d.sha256||!out.includes(text))throw Error(d.symbol)}}
const callers={
 'chunk-mzg9kbjz.js':['Y5','r4e','A7','Vq','wqe'],
 'chunk-eq5f0c7v.js':['rwn','ut','dt','G6t'],
 'chunk-td7fxg34.js':['Di'],
 'chunk-aq5frtkj.js':['kbt'],
 'chunk-wyjbafrm.js':['CJt','ppo','rg','sY','ume'],
 'chunk-8mkwx7mn.js':['wne','_k','vRe'],
 'chunk-18sktzq8.js':['uh'],
 'chunk-1vt3h958.js':['hce','Et','mm','Zy'],
};
const evidence=Object.entries(callers).flatMap(([module,names])=>{const a=source(module);return names.map(symbol=>{const n=node(a,symbol);if(!n)throw Error(symbol);return {module,symbol,moduleSha256:sha(a.text),sha256:sha(n.getText(a))}})});
console.log(JSON.stringify({version:manifest.version,verbatimDeclarations:records.reduce((n,r)=>n+r.declarations.length,0),callerEvidence:evidence},null,2));
