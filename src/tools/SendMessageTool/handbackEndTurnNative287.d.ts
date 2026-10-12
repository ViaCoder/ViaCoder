import type {ToolUseContext} from '../../Tool.js'
import type {AggregatedHookResult} from '../../utils/hooks.js'
import type {HookEvent} from '../../entrypoints/agentSdkTypes.js'
import type {HookExecutionOptions287} from '../../utils/hooks/modelSwitch287/engine.js'
export type PostToolBatchCall287={tool_name:string;tool_input:unknown;tool_use_id:string;tool_response?:unknown}
export type EndTurnContext287=ToolUseContext&{session:HookExecutionOptions287['session'];sessionHooksRegistry:{has(id:string,event:HookEvent):boolean}}
export function createHandbackEndTurnNative287(ports:Record<string,unknown>):{
 postToolBatch(calls:PostToolBatchCall287[],id:string,context:EndTurnContext287,mode:string,signal:AbortSignal,timeout?:number):AsyncGenerator<AggregatedHookResult>
 managedWebAgent(context:{agentType?:string;isBuiltIn?:boolean;subagentName?:string}):boolean
 presence(event:HookEvent,registry:EndTurnContext287['sessionHooksRegistry'],scope:string):boolean
 timeout:number
 parentScopes(context:EndTurnContext287,event:HookEvent,sessionId:string):string[]
}
