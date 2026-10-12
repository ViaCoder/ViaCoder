import type {z} from 'zod/v4'
import type {Message} from '../../../types/message.js'
import type {ToolUseContext} from '../../../Tool.js'

export interface EndConversationOutput287 {ended:boolean;message:string}
export interface EndConversationScope287 {
 isNonInteractiveSession:boolean
 agentId?:ToolUseContext['agentId']
 storageV5?:ToolUseContext['storageV5']
 messages():Message[]
 markEndedByModel():void
}
export interface EndConversationDefinition287 {
 name:string;shouldDefer:true;searchHint:string;backgrounding:'never';maxResultSizeChars:number
 readonly inputSchema:z.ZodObject<{}>
 readonly outputSchema:z.ZodObject<{ended:z.ZodBoolean;message:z.ZodString}>
 description():Promise<string>;prompt():Promise<string>;userFacingName():string
 isEnabled():boolean;isReadOnly():true;isConcurrencySafe():false;toAutoClassifierInput():string
 renderToolUseMessage():null
 mapToolResultToToolResultBlockParam(data:EndConversationOutput287,id:string):{tool_use_id:string;type:'tool_result';content:string}
 create(scope:EndConversationScope287):{call(input:{},context:{abort(reason:string):void}):Promise<{data:EndConversationOutput287}>}
}
export interface EndConversationPorts287 {
 yk:string
 f:typeof import('../../../utils/lazySchema.js').lazySchema
 Ve:typeof z.strictObject;u:typeof z.object;H:typeof z.boolean;o:typeof z.string
 Wt(definition:EndConversationDefinition287):EndConversationDefinition287
 Nyt():string|undefined;dFn(model:string):boolean
 i(name:string,metadata:Record<string,unknown>):void
 S(value:string):string
 z0r(id:string,storage:ToolUseContext['storageV5']):Promise<void>
 q():string;t(value:string):void;l(value:unknown):string
 embeddedImport287(path:string):Promise<{gracefulShutdown(code:number,reason:'other',options:{finalMessage:string}):Promise<void>}>
}
export function createEndConversationTool287(ports:EndConversationPorts287):EndConversationDefinition287
