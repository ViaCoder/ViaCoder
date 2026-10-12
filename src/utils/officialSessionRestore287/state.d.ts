export interface ResumeHostRegistryConstructor287 {new<T>(factory:()=>T):{of(host:object):T}}

export interface WorktreeResumeFailure287 {worktreePath:string;reason:string;message:string;poisoned:boolean}
export function createResumeState287(ports:{tn(id:unknown):string|null;q():string;Yf(id:string):string;V:ResumeHostRegistryConstructor287}):{source(input:{sourceSessionId?:string;transcriptPath?:string}):void;readSource():{sessionId:string;transcriptPath:string}|null;worktree:{of(host:object):{last:WorktreeResumeFailure287|null;record(value:WorktreeResumeFailure287|null):void}}}
