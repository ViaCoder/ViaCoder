import type {Tools,ToolUseContext,Tool,ToolPermissionContext} from '../../Tool.js'
import type {Message,UserMessage} from '../../types/message.js'
import type {StickyBetas287} from '../../services/context/officialExecutionOwners287/native.js'
import type {MCPServerConnection,ConnectedMCPServerV2} from '../../services/mcp/types.js'
export type McpLiveClient287=MCPServerConnection|ConnectedMCPServerV2
export interface DeclaredToolSet287 {
 readonly names:readonly string[];
 readonly recordedOnly:Map<string,{entry:unknown;server?:string}>;
 readonly recordOrder:readonly string[];
 has(name:string):boolean;keeps(name:string):boolean;toolFor(name:string):Tool|undefined;
 without(names:Set<string>):DeclaredToolSet287;
 sourceFor(name:string):Tool|{mcpInfo:{serverName:string;toolName:string}}|undefined;
}
export interface McpInstructionsDelta287 {
 addedNames:string[];addedBlocks:string[];addedServerInstructions?:string[];removedNames:string[];
}
export type McpInstructionsAttachment287=McpInstructionsDelta287&{type:'mcp_instructions_delta'}
export interface McpAttachmentContext287 {agentId?:ToolUseContext['agentId'];stickyBetas?:StickyBetas287}
export type McpSnapshotOptions287=Partial<ToolUseContext['options']>&{systemPromptSnapshot?:boolean}
export interface McpAttachmentsPorts287 {
 readonly shared:Readonly<Record<string,unknown>>;
 environment:typeof import('../authEnvironment.js').authEnvironment;
 optimistic():boolean;mcpState():unknown;
 analytics:typeof import('../../services/analytics/index.js').logEvent;
 createUserMessage:typeof import('../messages.js').createUserMessage;
 wrapMessages:typeof import('../messages.js').wrapMessagesInSystemReminder;
}
export interface McpAttachments287 {
 latches(context:McpAttachmentContext287):StickyBetas287|undefined;
 declared(latches:StickyBetas287,messages:Message[],options:McpSnapshotOptions287,tools:Tools,permissions?:ToolPermissionContext):DeclaredToolSet287|undefined;
 instructions(clients:readonly McpLiveClient287[],tools:Tools,model:string,messages?:Message[],declared?:DeclaredToolSet287):McpInstructionsAttachment287[];
 diff(clients:readonly McpLiveClient287[],messages:Message[],clientSide:readonly {serverName:string;block:string}[]):McpInstructionsDelta287|null;
 render(attachment:McpInstructionsAttachment287):UserMessage[];
}
export function createMcpAttachments287(ports:McpAttachmentsPorts287):McpAttachments287
