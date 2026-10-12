import type {ToolUseContext,Tool} from '../../../Tool.js'
import type {Message} from '../../../types/message.js'
export interface ReplRequesterBinding287 {
 surface:'terminal';refreshContext():void;model():string;messages():Message[];tools():readonly Tool[];
 commands():unknown[];mcpServers():string[];toolContext(signal:AbortController):ToolUseContext
 [capability:string]:unknown
}
export interface ReplRequesterScreenHost287 {
 mainLoopModel:string;getMessages():Message[];
 buildToolUseContext(messages:Message[],newMessages:Message[],controller:AbortController,model:string):ToolUseContext
 canUseTool:unknown;[field:string]:unknown
}
export interface ReplRequesterHost287 {sessionBinding:ReplRequesterBinding287;bindHost(host:ReplRequesterScreenHost287):void;requireHost():ReplRequesterScreenHost287}
export function createReplRequesterHostClass287(ports:Record<string,unknown>):new(existing:Record<string,unknown>,h:{refreshContext():void})=>ReplRequesterHost287
export function createReplContextRefresh287(invalidate:(session:import('../../../services/context/officialExecutionOwners287/native.js').ExecutionSession287,reason:string)=>void,session:import('../../../services/context/officialExecutionOwners287/native.js').ExecutionSession287):()=>void
