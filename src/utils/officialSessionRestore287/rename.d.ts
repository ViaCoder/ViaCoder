export interface ResumeRename287 {
 restore(name:string|undefined,storage:undefined,options?:{autoOnly?:boolean;yieldToLaterRestore?:boolean;source?:import('../sessionRename/names.js').NameSource;deps?:{whenRegistered():Promise<boolean>;listLive():Promise<import('../sessionRename/names.js').LiveName[]>;slug?():string}}):Promise<void>
 resolve(name:string,moment:'rename'|'recheck',deps?:{whenRegistered():Promise<boolean>;listLive():Promise<import('../sessionRename/names.js').LiveName[]>;slug?():string},base?:string):Promise<{name:string;yielded:boolean}>
 held(name:string,currentName:string|undefined):string|undefined
}
export function createResumeRename287(ports:ReturnType<typeof import('../resumeRename287.js').createResumeRenamePorts287>):ResumeRename287
