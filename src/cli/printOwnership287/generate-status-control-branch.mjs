import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
const here=import.meta.dirname
function locateRepo(start){for(let cursor=start;;cursor=path.dirname(cursor)){if(fs.existsSync(path.join(cursor,'package.json'))&&fs.existsSync(path.join(cursor,'src/cli/printOwnership287/publicHostRuntime287.ts')))return cursor;const child=path.join(cursor,'claude-code-haha');if(fs.existsSync(path.join(child,'package.json'))&&fs.existsSync(path.join(child,'src/cli/printOwnership287/publicHostRuntime287.ts')))return child;if(path.dirname(cursor)===cursor)return undefined}}
const repo=locateRepo(here);if(!repo)throw Error('repository root not found from generator location')
const corpus=path.join(path.dirname(repo),'.work/official-modules-2.1.287/darwin-arm64')
const sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const manifestBytes=fs.readFileSync(path.join(corpus,'manifest.json'))
const manifestSha='ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5'
if(sha(manifestBytes)!==manifestSha)throw Error('official manifest pin mismatch')
const manifest=JSON.parse(manifestBytes)
function raw(file){const bytes=fs.readFileSync(path.join(corpus,'raw',file));const row=manifest.modules.find(x=>x.path===file);if(!row||row.sha256!==sha(bytes)||row.length!==bytes.length)throw Error('official module pin mismatch: '+file);return {text:bytes.toString(),sha256:row.sha256,length:row.length}}
const main=raw('chunk-xapeakym.js')
const startText='else if(A.request.subtype==="get_status")',endText='else if(A.request.subtype==="get_skills_dialog")'
const start=main.text.indexOf(startText),end=main.text.indexOf(endText,start)
if(start<0||end<0)throw Error('original hI interval missing')
const original=main.text.slice(start,end)
for(const token of ['FA?.()','UA?.()','qm(e)','chunk-fvvgkcpa.js','buildMemoryDialogResponse','s2(pr)','dreamRunning'])if(!original.includes(token))throw Error('original contract missing '+token)
const providerRows=[['FA','FA=()=>import.meta.require("/$bunfs/root/chunk-d6fc85mz.js")',349700],['UA','UA=()=>import.meta.require("/$bunfs/root/chunk-c1et2wab.js")',349761]]
for(const [name,needle,offset] of providerRows)if(main.text.indexOf(needle)!==offset)throw Error('provider initializer drift '+name)
const start16=Buffer.byteLength(main.text.slice(0,start),'utf16le')/2,end16=Buffer.byteLength(main.text.slice(0,end),'utf16le')/2
const memoryImport='await import("/$bunfs/root/chunk-fvvgkcpa.js")'
if(original.split(memoryImport).length!==2)throw Error('expected exactly one memory import')
const portBody=original.replace(memoryImport,'await importMemory287()')
const continueCount=(portBody.match(/continue/g)||[]).length
if(continueCount!==3)throw Error('expected three original connection-gate continues; found '+continueCount)
let transported=portBody.replace(/continue/g,'return true')
const boundaries=[['nr(j,\"get_status\",ue)}})}else if(A.request.subtype===\"export_conversation\")','nr(j,\"get_status\",ue)}});return true}else if(A.request.subtype===\"export_conversation\")'],['nr(J,\"export_conversation\",ie)}})}else if(A.request.subtype===\"get_memory_dialog\")','nr(J,\"export_conversation\",ie)}});return true}else if(A.request.subtype===\"get_memory_dialog\")']]
for(const [before,after] of boundaries){if(!transported.includes(before))throw Error('dispatch boundary drift');transported=transported.replace(before,after)}
const memoryTail='catch(j){nr(A,\"get_memory_dialog\",j)}}'
if(!transported.endsWith(memoryTail))throw Error('memory branch tail drift')
transported=transported.slice(0,-memoryTail.length)+memoryTail.replace('j)}}','j)}return true}')
const native=`// Mechanically generated from the exact fixed-287 hI interval; only transport rewrites are applied.\n// Original FA/UA sync calls remain sync; importMemory287 is the exact fvvgkcpa module provider.\nconst factory=new Function("ports",\`return async function dispatchPrintControl287(A){with(ports){if(false){}${transported}return false}}\`);\nexport function createPrintStatusExportMemoryNative287(ports){return factory(ports)}\n`
const dts=`import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'\nimport type {AppState} from '../../state/AppState.js'\nimport type {ControlMcpConnection} from '../control/mcpConnectionPool.js'\nimport type {ToolUseContext,Tools} from '../../Tool.js'\nimport type {Message} from '../../types/message.js'\nimport type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'\nexport interface StatusModule287 {buildStatusSections(input:{credentials:ToolUseContext['credentials'];mainLoopModel:string;mcp:Omit<AppState['mcp'],'clients'>&{clients:ControlMcpConnection[]};permissionMode:AppState['toolPermissionContext']['mode']}):Promise<unknown[]>}\nexport interface ExportModule287 {exportConversation(input:{session:ExecutionSession287;messages:Message[];tools:Tools;storageV5:ToolUseContext['storageV5']}):Promise<Record<string,unknown>>}\nexport interface MemoryModule287 {buildMemoryDialogResponse(input:Record<string,unknown>):Promise<Record<string,unknown>>}\nexport interface PrintControlPorts287 {e:ExecutionSession287;I:Pick<ToolUseContext,'credentials'|'storageV5'>;pr:unknown[];qm(session:ExecutionSession287):boolean;FA:()=>StatusModule287;UA:()=>ExportModule287;qo():string|undefined;rt():string;s2(agents:unknown[]):unknown[];importMemory287():Promise<MemoryModule287>;v():AppState;Co():ControlMcpConnection[];Cr(work:()=>Promise<void>):void;Ze(message:SDKControlRequest,response?:Record<string,unknown>):void;We(message:SDKControlRequest,text:string):void;nr(message:SDKControlRequest,subtype:string,error:unknown):void;projectError(redacted:boolean,subtype:string,error:unknown):{error:string};cu():{messages:Message[];tools:Tools}}\nexport declare function createPrintStatusExportMemoryNative287(ports:PrintControlPorts287):(message:SDKControlRequest)=>Promise<boolean>\n`
const modules=[]
for(const [file,exportName,role] of [['chunk-xapeakym.js','hI','original branch source'],['chunk-d6fc85mz.js','buildStatusSections','FA required target'],['chunk-c1et2wab.js','exportConversation','UA required target'],['chunk-fvvgkcpa.js','buildMemoryDialogResponse','direct memory import target'],['chunk-mphp7acd.js','s2','active-agent projection'],['chunk-x5mcrns6.js','qm','connection gate'],['chunk-n2zepamy.js','pme','error projection']]){const r=raw(file);modules.push({file,sha256:r.sha256,bytes:r.length,export:exportName,role})}
const files={'statusExportMemoryBranches287.txt':original+'\n','statusExportMemoryNative287.js':native,'statusExportMemoryNative287.d.ts':dts}
const proof={version:'2.1.287',manifestSha256:manifestSha,source:{file:'chunk-xapeakym.js',moduleSha256:main.sha256,utf16Start:start16,utf16EndExclusive:end16,branchSha256:sha(Buffer.from(original)),providerInitializers:providerRows.map(([name,initializer,utf16Offset])=>({name,initializer,utf16Offset,scope:'top-level variable declaration'})),transforms:[{from:'continue',to:'return true',count:continueCount,reason:'branch dispatch transport only'},{from:memoryImport,to:'await importMemory287()',count:1,reason:'required exact fvvgkcpa export provider; no generic module loader'}]},modules,generated:Object.fromEntries(Object.entries(files).map(([n,s])=>[n,{sha256:sha(Buffer.from(s)),bytes:Buffer.byteLength(s)}]))}
proof.schema='status-export-memory-branch-recovery-287';proof.branchSource={path:'statusExportMemoryBranches287.txt',sha256:sha(Buffer.from(files['statusExportMemoryBranches287.txt']))};proof.generatedNative={path:'statusExportMemoryNative287.js',sha256:sha(Buffer.from(native))};files['statusExportMemoryBranchProvenance287.json']=JSON.stringify(proof,null,2)+'\n'
for(const [name,content] of Object.entries(files)){const p=path.join(here,name);if(process.argv.includes('--check')){if(!fs.existsSync(p)||fs.readFileSync(p,'utf8')!==content)throw Error('artifact drift '+name)}else fs.writeFileSync(p,content)}
console.log(`generated production status-control branch/native (${original.length} chars), ${modules.length} pinned modules, ${continueCount} gate transport rewrites`)
