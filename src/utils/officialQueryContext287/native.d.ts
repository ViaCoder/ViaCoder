import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {Tools} from '../../Tool.js'
export interface QueryContextMode287 {excludeDynamicSections?:boolean;analysisOnly?:boolean}
export interface QueryContextInput287 extends QueryContextMode287 {
 session:ExecutionSession287;tools:Tools;mainLoopModel:string;customSystemPrompt?:string|readonly string[];
 cacheBreakerPhrase?:string;storageV5?:unknown;credentials?:unknown
}
export interface QueryContextParts287 {defaultSystemPrompt:string[];userContext:Record<string,string>;systemContext:Record<string,string>}
export interface QueryContextPorts287 {
 kA(tools:Tools,model:string,mode:QueryContextMode287):Promise<string[]>;
 kC(session:ExecutionSession287,storage?:unknown,credentials?:unknown):Promise<Record<string,string>>;
 QB(session:ExecutionSession287,cacheBreakerPhrase?:string):Promise<Record<string,string>>;
 M9(model:string):string;
 v2o(model:string,options:Pick<QueryContextMode287,'analysisOnly'>):Promise<string|null>;
}
export interface QueryContext287 {
 fetchSystemPromptParts(input:QueryContextInput287):Promise<QueryContextParts287>;
 getExcludedDynamicSectionsContent(model:string,options?:Pick<QueryContextMode287,'analysisOnly'>):Promise<Record<string,string>>;
 splitExcludedSection(section:string):[string,string]
}
export interface SystemContextPorts287 {
 LF(session:ExecutionSession287):{systemContextByPhrase:Map<string,Promise<Record<string,string>>>};
 a:{readonly CLAUDE_CODE_PERFORCE_MODE?:string|boolean};ne(level:'info',event:string,data?:Record<string,unknown>):void;
 Le(value:string|boolean|undefined):boolean;$a():boolean;Ue:string;wt:string
}
export function createSystemContext287(ports:SystemContextPorts287):{
 getSystemContext(session:ExecutionSession287,cacheBreakerPhrase?:string):Promise<Record<string,string>>;
 buildSystemContext(session:ExecutionSession287,cacheBreakerPhrase?:string):Promise<Record<string,string>>
};
export function createQueryContext287(ports:QueryContextPorts287):QueryContext287;
export const excludedMemorySource287:{readonly file:string;readonly name:string;readonly moduleSha256:string;readonly startCodeUnits:number;readonly endCodeUnits:number;readonly sha256:string;readonly source:string};
