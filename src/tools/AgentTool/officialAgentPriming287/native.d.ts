import type * as path from 'node:path'
import type {FsOperations} from '../../../utils/fsOperations.js'
import type {MemoryEntryTruncation287} from '../../../memdir/officialMemoryTruncation287/native.js'
import type {ToolUseContext} from '../../../Tool.js'
import type {AgentDefinition} from '../loadAgentsDir.js'
import type {logForDebugging} from '../../../utils/debug.js'
import type {logEvent,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../../services/analytics/index.js'
export type AgentMemoryKey287={namespace:'agentMemory';layer:'user';agentType:string;relPath:string[]}
export interface AgentMemoryStorage287 {
 readText(keys:AgentMemoryKey287[]):Promise<{ok:true;value:{items:({found:true;value:string}|{found:false})[]}}|{ok:false;error:unknown}>
}
export interface AgentPromptParams287 {
 toolUseContext?:Pick<ToolUseContext,'options'|'storageV5'>
 primedAgentMemory?:string
}
export interface AgentMemoryLinesOptions287 {extraGuidelines?:string[];skipIndex?:boolean;inlineTypes?:boolean;includeSkillUpkeep?:boolean;readOnly?:boolean}
export interface AgentPrimingPorts287 {
 qd():boolean;we():string;Wd:string;oe():string;Ve:string;cr():string;
 je:typeof path.join;gm:typeof path.dirname;pm:typeof path.basename;Et:string;Dp():string;
 Jx(value:string):string;aI(path:string):string|null;ae():FsOperations;gY(fs:FsOperations,path:string):string;
 W(error:unknown):boolean;E(error:unknown):string|undefined;Xn(value:string):boolean;
 i:typeof logEvent;c(value:string):AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS;t:typeof logForDebugging;
 vo(displayName:string,memoryDir:string|null,options?:AgentMemoryLinesOptions287):string[];
 Ihn(raw:string):MemoryEntryTruncation287;jQ(raw:string):string;
 ze(dir:string,metadata:Record<string,number|boolean|AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS>):void;
 HHt(prompt:string[],model:string):Promise<string[]>;Nko:string;
}
export interface AgentPriming287 {
 prompt(definition:AgentDefinition,context:Pick<ToolUseContext,'options'|'storageV5'>,model:string):Promise<string[]>;
 prime(definition:Pick<AgentDefinition,'agentType'|'memory'>,storage?:AgentMemoryStorage287):Promise<string|undefined>;
 key(agentType:string,scope:string):AgentMemoryKey287|undefined;
 memoryPrompt(agentType:string,scope:'user'|'project'|'local',storage?:unknown,primed?:string):string;
 directory(agentType:string,scope:'user'|'project'|'local'):string;sanitize(agentType:string):string;
}
export function createAgentPriming287(ports:AgentPrimingPorts287):AgentPriming287;
export function createAgentPromptCaller287(prime:AgentPriming287['prime'],enhance:AgentPrimingPorts287['HHt'],defaultPrompt:string):AgentPriming287['prompt'];
type MemoryPrompt287=AgentPriming287['memoryPrompt'];
export function createPluginAgentPrompt287(qd:()=>boolean,Ohn:MemoryPrompt287,agentType:string,memory:'user'|'project'|'local'|undefined,prompt:string):(params?:AgentPromptParams287)=>string;
export function createJsonAgentPrompt287(qd:()=>boolean,Ohn:MemoryPrompt287,agentType:string,definition:{memory?:'user'|'project'|'local'},prompt:string):(params?:AgentPromptParams287)=>string;
export function createMarkdownAgentPrompt287(qd:()=>boolean,Ohn:MemoryPrompt287,agentType:string,memory:'user'|'project'|'local'|undefined,prompt:string):(params?:AgentPromptParams287)=>string;
