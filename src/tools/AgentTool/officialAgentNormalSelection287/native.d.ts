import type {AgentDefinition} from '../loadAgentsDir.js'
import type {ToolUseContext,ToolPermissionContext} from '../../../Tool.js'
import type {PermissionRule,PermissionRuleValue} from '../../../types/permissions.js'
export interface AgentNormalSelectionPorts287 {
 availableAgents(agents:AgentDefinition[],allowed:string[]|undefined,permissionContext:ToolPermissionContext,context:ToolUseContext):Promise<AgentDefinition[]>
 normalize(value:string):string
 generalPurposeAvailable(agents:AgentDefinition[],allowed:string[]|undefined):boolean
 parseRule(value:string):PermissionRuleValue
 denyTool(context:ToolPermissionContext,tool:{name:string}):PermissionRule|null
 environment:{CLAUDE_CODE_DISABLE_WEB_FETCH?:boolean}
 policyAllowed(key:string):boolean
 forkGuard(options:{isolation?:string;querySource?:string;messages:ToolUseContext['messages']}):{code:string;message:string}|null
 denyRule(context:ToolPermissionContext,name:string,type:string):PermissionRule|null
 typeList(types:string[]):string
 requiredTypeMessage:string
 generalPurpose:{agentType:string}
 forkType:string
 setAgentColor(type:string,color:NonNullable<AgentDefinition['color']>):void
 telemetry(name:string,fields:Record<string,unknown>):void
 launchMetric(site:string,kind:string):void
}
export interface AgentNormalSelection287 {
 AgentTypeError:new(message:string)=>Error
 toolsFilter(agents:AgentDefinition[],context:ToolPermissionContext):AgentDefinition[]
 toolsDenied(agent:AgentDefinition,context:ToolPermissionContext):boolean
 select(args:{agents:AgentDefinition[];allowedTypes?:string[];permissionContext:ToolPermissionContext;context:ToolUseContext;requested?:string;forkAvailable:boolean;guardOptions:{isolation?:string;querySource?:string;messages:ToolUseContext['messages']}}):Promise<{selected:AgentDefinition;available:AgentDefinition[]}>
}
export function createAgentNormalSelection287(ports:AgentNormalSelectionPorts287):AgentNormalSelection287
