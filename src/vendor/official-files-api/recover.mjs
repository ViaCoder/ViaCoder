import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import ts from 'typescript';
const root=process.argv[2];if(!root)throw Error('Pass pinned darwin-arm64 module directory');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));if(manifest.version!=='2.1.283'||manifest.platform!=='darwin-arm64')throw Error('Wrong pinned source');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex'),records=[];
function select(module,names){const raw=fs.readFileSync(path.join(root,'raw',module),'utf8');if(sha(raw)!==manifest.modules.find(m=>m.path===module)?.sha256)throw Error('Source hash mismatch');const ast=ts.createSourceFile(module,raw,99,true),nodes=new Set();for(const symbol of names){const node=ast.statements.find(s=>s.name?.text===symbol||ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(ast)===symbol));if(!node)throw Error('Missing '+symbol);nodes.add(node)}return [...nodes].map(n=>{const text=n.getText(ast);records.push({module,moduleSha256:sha(raw),symbol:n.name?.text??n.declarationList.declarations.map(d=>d.name.getText(ast)).join(','),sha256:sha(text)});return text}).join('\n')}
const files=select('chunk-hzevqd7x.js',['aJ','UP','x_','P_','xi','Ya','GP','mJ','jP','_J','bJ','Co']);
const issuer=select('chunk-y5k20gt2.js',['Ie']);
const slots=select('chunk-bav4p6fn.js',['wo','y2t','_2t']);
const taints=select('chunk-pc490fd1.js',['n','o','a','e','F4n','SNo','oc','C$','fRe','$4n','m5','wNo']);
const unicode=select('chunk-v4wcnq1g.js',['wt','s','JH']);
const strings=select('chunk-c4grbvgn.js',['re','f','x']);
const normalization=select('chunk-9m6e1078.js',['ee','FKe']);
// Extract this complete property initializer, not a rewritten transform callback.
const policyModule='chunk-9m6e1078.js',policyRaw=fs.readFileSync(path.join(root,'raw',policyModule),'utf8');
const policyAst=ts.createSourceFile(policyModule,policyRaw,99,true);let taintSchema;
function visit(node){if(ts.isPropertyAssignment(node)&&node.name.getText(policyAst)==='compliance_taints'&&node.initializer.getText(policyAst).startsWith('k(ae()).default'))taintSchema=node.initializer.getText(policyAst);ts.forEachChild(node,visit)}
visit(policyAst);if(!taintSchema)throw Error('Missing compliance schema');
records.push({module:policyModule,moduleSha256:sha(policyRaw),symbol:'Ke.compliance_taints',kind:'expression',sha256:sha(taintSchema)});
// Evidence only: full private policy cache host is deliberately NOT presented as recovered.
select(policyModule,['VIo','lLt','Ycn','LDr']);
const dir=new URL('./',import.meta.url), outputs={
 'unicode.js':`// Official npm 2.1.283: complete unchanged declarations.\n${unicode}\nexport {JH};\n`,
 'strings.js':`// Official npm 2.1.283: complete unchanged declarations.\n${strings}\nexport {re};\n`,
 'complianceSchema.js':`// Official npm 2.1.283: unchanged declarations and compliance_taints property initializer.\nimport {array as k,unknown as ae} from 'zod/v4';import {JH} from './unicode.js';import {re} from './strings.js';import {M} from './stateHost.js';\n${normalization}\nexport const complianceTaintsSchema=${taintSchema};\n`,
 'issuer.js':`// Official npm 2.1.283: complete unchanged declarations.\nimport {a} from './host.js';import {wo,y2t,_2t} from './slots.js';\n${issuer}\nexport {Ie};\n`,
 'slots.js':"// Official npm 2.1.286 credential slot factory; existing standalone host facade. Standalone host only.\nimport {createOfficialCredentialSlots} from '../../utils/officialCredentialSlots/runtime.js';\nfunction wo(){return n().host.credentialSlots.gatewayAuth()}\nfunction y2t(){return n().host.credentialSlots.gatewayServerProcess()}\nfunction _2t(){return n().host.credentialSlots.gatewayRequiredByHostPolicy()}\nconst root={host:{credentialSlots:createOfficialCredentialSlots()}};function n(){return root}\nexport {wo,y2t,_2t};\nexport const filesCredentialSlots=root.host.credentialSlots;\n",
 'taints.js':`// Official npm 2.1.283: complete unchanged declarations.\nimport {K,j,Oe,M} from './stateHost.js';\n${taints}\nexport {F4n,SNo,oc,C$,fRe,$4n,m5,wNo};\n`,
};
// Files now has its dedicated manifest-verified 287 generator, never restore 283 over it.
// Never regenerate accepted data/functions in this legacy supplier pass.
const dataProof=JSON.parse(fs.readFileSync(new URL('./files287.provenance.json',import.meta.url),'utf8'));
if(dataProof.version!=='2.1.287')throw Error('Missing canonical287 Files proof');
for(const [name,text] of Object.entries(outputs))fs.writeFileSync(new URL(name,dir),text);
const raw=fs.readFileSync(path.join(root,'raw','chunk-hzevqd7x.js'),'utf8');fs.writeFileSync(new URL('NOTICE',dir),raw.slice(0,raw.indexOf('import')));
fs.writeFileSync(new URL('provenance.json',dir),JSON.stringify({version:manifest.version,platform:manifest.platform,headerDependency:'officialFilesHeaders287 complete 287 H5t closure; getFilesHeaders287 as zP',credentialSlotsDependency:'officialCredentialSlots/runtime.js complete286 factory, same filesCredentialSlots owner',records,files:{...Object.fromEntries(Object.entries(outputs).map(([name,body])=>[name,sha(body)])),'files.js':sha(fs.readFileSync(new URL('./files.js',dir)))},filesProduction287:{source:'files287.provenance.json',policy:'../../services/api/officialFilesPolicy287/provenance.json',scope:'287 data/header/provider guard. Legacy records below retain 283 evidence; no whole machine-source parity claim.'}},null,2)+'\n');
