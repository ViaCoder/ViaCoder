import type {Tool,ToolPermissionContext,Tools} from '../../Tool.js'
import type {AgentDefinition} from '../../tools/AgentTool/loadAgentsDir.js'
export type CatalogPermissions287=ToolPermissionContext&{restricted?:boolean}
export interface ToolSelectionOptions287 {
 skipSimpleModeFilter?:boolean
 skipReplFilter?:boolean
 activeAgents?:readonly AgentDefinition[]
 machineMcpTools?:Tools
}
export interface PublicToolSelectionPorts287 {
 a:{readonly CLAUDE_CODE_SIMPLE:boolean}
 Wr():Tool|null;gM():boolean;rP():boolean;zs(context:CatalogPermissions287,tool:Pick<Tool,'name'>):object|null
 Sv:Tool;RC:Tool;hv:Tool;ce:Tool|null;L1():boolean;We:{isCoordinatorMode():boolean}
 cXt:Tool;ze:Tool;kt():Tool;nm():boolean;Tt:Tool
 Pq(tools:Tools,context:CatalogPermissions287):Tool[]
 bt():Tool|null;$a():boolean;fi:Tool;zI:Tool;VI:Tool;FB:Tool;Fi:string
 pv():Tools;Mt(tool:Tool,name:string):boolean;Ue:string;ic:string
 Bb(tool:Tool,names:ReadonlySet<string>):boolean;g1t:ReadonlySet<string>
 fct(tools:Tools,context:CatalogPermissions287,options:{activeAgents?:readonly AgentDefinition[]}):boolean
 hr:string;bE():boolean;qR:Tool;KR:Tool;Ofn(names:string[]):Tool[]
 Yxo():boolean;dFe():boolean;aG(tools:Tools):boolean;Qa:string;UP:string;zIr:Tool
}
export interface PublicToolPoolPorts287 {
 HO(permissions:CatalogPermissions287,options?:ToolSelectionOptions287):Tools
 Ll(tools:Tools,key:'name'):Tool[]
 eHn(tools:Tools,all?:Tools):Tool[]
 Pq(tools:Tools,permissions:CatalogPermissions287):Tool[]
}
export function createPublicToolSelection287(ports:PublicToolSelectionPorts287):(permissions:CatalogPermissions287,options?:ToolSelectionOptions287)=>Tool[]
export function createPublicToolPool287(ports:PublicToolPoolPorts287):(permissions:CatalogPermissions287,mcpTools:Tools,options?:ToolSelectionOptions287)=>Tool[]
