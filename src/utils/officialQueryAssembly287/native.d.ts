import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {Tools} from '../../Tool.js'
import type {SystemPrompt} from '../systemPromptType.js'
import type {MCPServerConnection} from '../../services/mcp/types.js'
export interface QueryAssemblyInput287 {
 session:ExecutionSession287;tools:Tools;runtimeModel:string;mcpClients:readonly MCPServerConnection[];
 customSystemPrompt?:string|readonly string[];appendSystemPrompt?:string;appendSystemPromptHead?:string;
 excludeDynamicSections?:boolean;cacheBreakerPhrase?:string;storageV5?:unknown;credentials?:unknown;
}
export interface QueryAssemblyResult287 {systemPrompt:SystemPrompt;userContext:Record<string,string>;systemContext:Record<string,string>}
export interface QueryAssembly287 {
 assemble(input:QueryAssemblyInput287):Promise<QueryAssemblyResult287>;
 splitCustom(text:string):string[];
 skillSection(tools:Tools):string|null;
 searchSection(tools:Tools):string|null;
 searchMode():{mode_description:string;system_hint:string;web_search_addendum:string}|null;
 appendHead(base:readonly string[],append:string|undefined,head:string,globalScope:boolean):{base:string[];append:string}|undefined;
}
export function createQueryAssembly287(ports:Record<string,unknown>):QueryAssembly287;
