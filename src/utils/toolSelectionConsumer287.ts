import type {Tool,ToolPermissionContext,Tools} from '../Tool.js'
import {bindMcpTools287} from '../services/mcp/toolContext287.js'
import type {AgentDefinition} from '../tools/AgentTool/loadAgentsDir.js'
const source=()=> (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
function originalCall(file:string,name:string,args:readonly unknown[]=[]):unknown {
 const fn=source().clearSourceModule287(file)[name]
 if(typeof fn!=='function')throw new TypeError(`Missing original tool-selection ABI ${file}:${name}`)
 return fn(...args)
}
function originalBoolean(file:string,name:string,args:readonly unknown[]=[]):boolean {
 const result=originalCall(file,name,args)
 if(typeof result!=='boolean')throw new TypeError(`Invalid original tool-selection boolean ${file}:${name}`)
 return result
}
function originalString(file:string,name:string):string {
 const result=source().clearSourceModule287(file)[name]
 if(typeof result!=='string')throw new TypeError(`Invalid original tool-selection name ${file}:${name}`)
 return result
}
function bindPublicTool287(tool:Tool):Tool {bindMcpTools287([tool]);return tool}
export const toolSelectionConsumer287={
 waitTool:():Tool=>bindPublicTool287(source().clearSourceModule287('chunk-mphp7acd.js').zIr),
 feedbackTool:():Tool=>bindPublicTool287(source().clearSourceModule287('chunk-djhbc0y7.js').Io),
 refreshTool:():Tool=>bindPublicTool287(source().clearSourceModule287('chunk-djhbc0y7.js').ht),
 deny(tools:Tools,context:ToolPermissionContext):Tool[]{return source().clearSourceModule287('chunk-09m4fzsj.js').Pq([...tools],context)},
 replacements(names:string[]):Tool[]{return source().clearSourceModule287('chunk-dec2r715.js').Ofn(names)},
 filterMcp(tools:Tools,all:Tools=tools):Tool[]{return source().clearSourceModule287('chunk-djhbc0y7.js').eHn([...tools],[...all])},
 pending:()=>source().clearSourceModule287('chunk-mphp7acd.js').Yxo(),
 declared:()=>source().clearSourceModule287('chunk-mphp7acd.js').dFe(),
 isRepl:()=>originalBoolean('chunk-t2h010j6.js','gM'),
 replRead:()=>originalBoolean('chunk-bn3p37gv.js','rP'),
 canWorkflow:()=>originalBoolean('chunk-980njedm.js','nm'),
 canPoll:()=>originalBoolean('chunk-t2h010j6.js','L1'),
 managesPending:(tools:Tools)=>originalBoolean('chunk-t2h010j6.js','aG',[tools]),
 hideFetch:(tools:Tools,context:ToolPermissionContext,options:{activeAgents?:readonly AgentDefinition[]})=>originalBoolean('chunk-mphp7acd.js','fct',[tools,context,options]),
 primitive:(tool:Tool,names:ReadonlySet<string>)=>originalBoolean('chunk-1b21she7.js','Bb',[tool,names]),
 denyRule(context:ToolPermissionContext,tool:Pick<Tool,'name'>):object|null {
  const value=originalCall('chunk-6xrs6gmd.js','zs',[context,tool])
  if(value===null)return null
  if(typeof value!=='object'||value===null)throw new TypeError('Invalid original tool deny rule')
  return value
 },
 primitiveNames():ReadonlySet<string>{
  const names=source().clearSourceModule287('chunk-t2h010j6.js').g1t
  if(!(names instanceof Set)||![...names].every(name=>typeof name==='string'))throw new TypeError('Invalid original primitive Tool names')
  return names
 },
 syntheticName:()=>originalString('chunk-t2h010j6.js','Fi'),
 replName:()=>originalString('chunk-a6fqs976.js','ic'),
 fetchName:()=>originalString('chunk-gqh744nd.js','hr'),
 searchName:()=>originalString('chunk-tec7csgr.js','Qa'),
 waitName:()=>originalString('chunk-t2h010j6.js','UP'),
}
