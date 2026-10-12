import type {z} from 'zod/v4'
import type {Tool,ToolUseContext,ValidationResult} from '../../Tool.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {AssistantMessage} from '../../types/message.js'
import type {MessageUpdateLazy} from './toolExecution.js'
import type {OriginalGcoPreParsedFailureConsumer287} from '../../utils/plugins/officialHooksLifecycle287/native.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
type Input287=z.infer<Tool['inputSchema']>
type Coerced287={shapeClass:string;valid:boolean;resultNote?:string}
export type OriginalInputResult287=
 |{ok:true;input:Input287;coerced?:Coerced287}
 |{ok:false;phase:'parse';cause:'schema';error:z.ZodError<Input287>;schemaInput:unknown;coerced?:Coerced287}
 |{ok:false;phase:'parse';cause:'json';raw:string;len:number}
type Parser287=(tool:Tool,input:unknown)=>OriginalInputResult287
function isParser287(value:unknown):value is Parser287{return typeof value==='function'}
export function parseOriginalToolInput287(tool:Tool,input:unknown):OriginalInputResult287 {
 const parser=getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').fxt
 if(!isParser287(parser))throw Error('Original tool input parser fxt is not installed')
 return parser(tool,input)
}
export type OriginalValidationResult287=
 |{ok:false;phase:'validate';verdict:Extract<ValidationResult,{result:false}>;deniedInput:Input287|undefined}
 |{ok:true;callInput:Input287;observableInput:Input287;backfilled:boolean}
/** Same complete pxt: one real validator invocation, same session/host, and a
 * copy for backfilled denial metadata. The actual API input is not mutated. */
export function validateOriginalToolInput287(tool:Tool,input:Input287,context:ToolUseContext,id:string):Promise<OriginalValidationResult287> {
 const validate=getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').pxt
 return validate(tool,input,value=>tool.validateInput?.(value,{...context,toolUseId:id}))
}
/** Actual pxt failures alone enter the same canonical whole original failure
 * block. Its host-only wrapper neither parses nor validates nor executes. */
export function consumeOriginalToolValidationFailure287(tool:Tool,id:string,context:ToolUseContext,parent:AssistantMessage,messageId:string,requestId:string|undefined,mcpType:unknown,mcpUrl:unknown,failure:Extract<OriginalValidationResult287,{ok:false}>):Promise<MessageUpdateLazy[]> {
 const consumer=getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').gcoValidationFailure287
 return consumer(tool,id,context,parent,messageId,requestId,mcpType,mcpUrl,undefined,undefined,failure)
}
type FailureConsumer287=OriginalGcoPreParsedFailureConsumer287
function isFailureConsumer287(value:unknown):value is FailureConsumer287{return typeof value==='function'}
/** The already installed complete gco consumes only its original parse-failure
 * early return. The actual failing fxt object is passed as the explicit host
 * ABI argument18, so this same consumer never reparses the failure;
 * successful input never enters a second tool executor/permission pipeline. */
export function consumeOriginalToolInputFailure287(tool:Tool,id:string,input:unknown,context:ToolUseContext,permission:CanUseToolFn,parent:AssistantMessage,messageId:string,requestId:string|undefined,mcpType:unknown,mcpUrl:unknown,failure:Exclude<OriginalInputResult287,{ok:true}>):Promise<MessageUpdateLazy[]> {
 if(failure.ok!==false)throw Error('Original parse failure consumer requires an actual failed input')
 const consumer=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js','gco')
 if(!isFailureConsumer287(consumer))throw Error('Complete original gco parse-failure consumer is not installed')
 return consumer(tool,id,input,context,permission,parent,messageId,requestId,mcpType,mcpUrl,undefined,undefined,undefined,undefined,undefined,undefined,undefined,failure)
}
