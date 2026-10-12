import type {ToolUseContext,Tools} from '../../Tool.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {CacheSafeParams} from '../forkedAgent.js'
import type {Message} from '../../types/message.js'
import type {SystemPrompt} from '../systemPromptType.js'
export type BtwPrefixContext287=ToolUseContext & {session:ExecutionSession287;getAdvisorSetting():string|undefined;options:ToolUseContext['options'] & {cacheBreakerPhrase?:string}}
export interface BtwPrefixPorts287 {
 JR():CacheSafeParams|null;kA(tools:Tools,model:string):Promise<string[]>;
 kC(session:ExecutionSession287,storage?:unknown,credentials?:unknown):Promise<Record<string,string>>;
 QB(session:ExecutionSession287,phrase?:string):Promise<Record<string,string>>;mi(prompt:string[]):SystemPrompt;
}
export function createBtwPrefix287(ports:BtwPrefixPorts287):{build(context:BtwPrefixContext287):Promise<CacheSafeParams & {advisorModel?:string}>;selectMessages(messages:Message[],stripInProgress?:boolean):Message[]};
