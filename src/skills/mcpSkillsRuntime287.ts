import {randomBytes} from 'node:crypto'
import {mkdir,rename,rm,writeFile} from 'node:fs/promises'
import {join} from 'node:path'
import {createMcpSkills287,type McpSkillsModule287,type McpSkillsPorts287,type McpSkillsClient287} from './officialMcpSkills287/native.js'
import {getMcpConnectedProducer287} from '../services/mcp/connectedProducer287.js'
import {getMcpDirectoryReadModule287,getMcpSdkErrorClassificationModule287} from '../services/mcp/directoryProtocol287.js'
import {recordMcpSkillCommandRoot287} from './mcpSkillBuilders.js'
import {resolveMcpSdkGeneration} from '../services/mcp/v2Lifecycle.js'

// This memo contains only the original module's immutable closures/constructor.
// All fetching and invalidation still use the sole AP qt().skillsFetcher cell.
var native: McpSkillsModule287 | undefined
function canonicalMember287(file:string,name:string):unknown {
 const owner=require('../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../utils/hooks/modelSwitch287/lifecycleRuntime.js')
 return owner.getOriginalModsLifecycle287().clearLifecycleSource287(file,name)
}
function connectedMember287(file:string,name:string):unknown {
 const value=getMcpConnectedProducer287().sourceModule(file)[name]
 if(value===undefined)throw Error('Original MCP skills dependency missing: '+file+':'+name)
 return value
}
function canonicalRequired287(file:string,name:string):unknown {
 const value=canonicalMember287(file,name)
 if(value===undefined)throw Error('Original MCP skills canonical dependency missing: '+file+':'+name)
 return value
}
export interface McpSkillPage287 {
 skills:{frontmatter?:Record<string,unknown>|null;uri?:string|null;digest?:string|null}[]
 nextCursor?:string|null
}
function listMcpSkillPage287(client:McpSkillsClient287,cursor?:string):Promise<McpSkillPage287> {
 const value=canonicalRequired287('chunk-hrncb059.js','m')
 if(typeof value!=='function')throw Error('Original listMcpSkillPage export is not a function')
 const original=value as (client:McpSkillsClient287,cursor?:string)=>Promise<McpSkillPage287>
 const publicOwner=require('./mcpSkills.js') as typeof import('./mcpSkills.js')
 return original(client,cursor).then(page=>{publicOwner.recordMcpSkillPage287(client,cursor);return page},error=>{publicOwner.recordMcpSkillPage287(client,cursor,error);throw error})
}
function isClaudeAiBearerRejectedError287(error:unknown):boolean {
 const modern=resolveMcpSdkGeneration()==='v2'
 const value=canonicalRequired287(modern?'chunk-1n6y914s.js':'chunk-9m1whw0x.js',modern?'nAe':'bLe')
 if(typeof value!=='function')throw Error('Original bearer-rejection export is not a function')
 return Reflect.apply(value,undefined,[error])===true
}
function originalPorts287():McpSkillsPorts287 {
 const c=(file:string,name:string)=>connectedMember287(file,name)
 const a=(file:string,name:string)=>canonicalRequired287(file,name)
 const outside=require('../utils/hooks/outsideRuntime287.js') as typeof import('../utils/hooks/outsideRuntime287.js')
 const host=outside.createOutsideHookPorts287()
 return {
 observeSkillCommandRoot287:recordMcpSkillCommandRoot287,
 S:c('chunk-n4qghq20.js','S'),c:c('chunk-n4qghq20.js','c'),l:c('chunk-c9me9cp7.js','l'),E:c('chunk-c9me9cp7.js','E'),
 F:c('chunk-ky674g9x.js','F'),i:host.analytics,y:c('chunk-9d2ykxmy.js','y'),m:c('chunk-9d2ykxmy.js','m'),p:c('chunk-9d2ykxmy.js','p'),t:host.debug,
 I:c('chunk-eske5nfz.js','I'),bf:c('chunk-6re9qmwv.js','bf'),sE:c('chunk-6re9qmwv.js','sE'),Go:c('chunk-amhtwhch.js','Go'),te:c('chunk-amhtwhch.js','te'),Zt:c('chunk-dg5e8f95.js','Zt'),
 qt:()=>outside.getOutsideHookRuntime287().mcpState(),xle:c('chunk-3em8heqr.js','xle'),_Se:a('chunk-rgcp4trk.js','_Se'),Hs:a('chunk-ay2eacsw.js','Hs'),
 dx:a('chunk-scey49m3.js','dx'),z2:a('chunk-scey49m3.js','z2'),cUe:a('chunk-scey49m3.js','cUe'),SSe:a('chunk-scey49m3.js','SSe'),gmt:a('chunk-scey49m3.js','gmt'),kgn:a('chunk-scey49m3.js','kgn'),vr:c('chunk-scey49m3.js','vr'),
 eon:a('chunk-r2qc5x11.js','eon'),ton:a('chunk-r2qc5x11.js','ton'),Cvo:a('chunk-r2qc5x11.js','Cvo'),ckr:a('chunk-r2qc5x11.js','ckr'),Avo:a('chunk-r2qc5x11.js','Avo'),Tvo:a('chunk-r2qc5x11.js','Tvo'),kvo:a('chunk-r2qc5x11.js','kvo'),
 l2r:(capabilities:unknown)=>{
   const original=c('chunk-gr2z631p.js','l2r')
   if(typeof original!=='function')throw Error('Original l2r is not callable')
   // Retain only the existing stateless C admission for transparent public peers.
   // The shared public fetch entry still rejects declined/private-ineligible peers.
   return Reflect.apply(original,undefined,[capabilities])===true||(require('./mcpSkills.js') as typeof import('./mcpSkills.js')).getMcpSkillsEligibility(capabilities,'http')==='unknown'
 },Ja:c('chunk-sbndfme5.js','Ja'),C_n:a('chunk-877akt9g.js','C_n'),R2t:a('chunk-877akt9g.js','R2t'),A_n:a('chunk-877akt9g.js','A_n'),T_n:a('chunk-877akt9g.js','T_n'),An:c('chunk-fjmhgxys.js','An'),an:c('chunk-vh4tv488.js','an'),Qx:c('chunk-nc9hhjpp.js','Qx'),zZe:c('chunk-nc9hhjpp.js','zZe'),
 K:randomBytes,z:mkdir,R:rename,x:rm,T:writeFile,b:join,
 mcpClientModuleGateway:{mcpDirectoryReadModule:getMcpDirectoryReadModule287,mcpSdkErrorClassificationModule:getMcpSdkErrorClassificationModule287,mcpSkillsListModule:()=>({listMcpSkillPage:listMcpSkillPage287}),mcpIsListAuthErrorModule:()=>({isClaudeAiBearerRejectedError:isClaudeAiBearerRejectedError287})},
 }
}
export function getOriginalMcpSkillsModule287():McpSkillsModule287 {
 return native??=createMcpSkills287(originalPorts287())
}
