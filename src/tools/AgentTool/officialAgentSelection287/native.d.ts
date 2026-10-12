import type {Message} from '../../../types/message.js'
import type {ToolPermissionContext} from '../../../Tool.js'
import type {PermissionRule} from '../../../utils/permissions/PermissionRule.js'
import type {AgentDefinition, BuiltInAgentDefinition} from '../loadAgentsDir.js'
export interface AgentSelectionPorts287 {
 environment:{CLAUDE_CODE_FORK_SUBAGENT?:boolean}
 nonInteractive():boolean
 coordinator():boolean
 sessionMemo():{forkSubagentEnabledSource?:string}
 telemetry(event:string,metadata:{source:string}):void
 identity(value:string):string
 denyRule(context:ToolPermissionContext,name:string,type:string):PermissionRule|null
 generalPurpose:{agentType:string}
}
export interface AgentSelection287 {
 availability(agents:AgentDefinition[],allowed:string[]|undefined,options:{toolPermissionContext:ToolPermissionContext;scriptCall:boolean}):{available:boolean;denyRule:PermissionRule|null}
 generalPurposeAvailable(agents:AgentDefinition[],allowed?:string[]):boolean
 guard(options:{isolation?:string;querySource?:string;messages:Message[]}):{code:string;message:string}|null
 matchAgent(agents:AgentDefinition[],available:AgentDefinition[],requested:string):AgentDefinition|undefined
 normalize(value:string):string
 requiredTypeMessage:string
 formatTypes(types:string[]):string
 forkEnabled():boolean
 scriptForkEnabled():boolean
 forkDefinition:BuiltInAgentDefinition
 isForkChild(messages:Message[]):boolean
}
export function createAgentSelection287(ports:AgentSelectionPorts287):AgentSelection287
