export type GitignorePublication287={written:boolean;effective:boolean;reason?:string}
export interface AtomicStaging287 {
 ensure():void
 directories(includeCurrentCwd?:boolean):string[]
 state():{osLinkedRootRealpaths:Map<string,string>;stagingDirGitignoreFired:boolean}
 publishGitignore(pattern:string,cwd?:string):Promise<GitignorePublication287>
}
export function createAtomicStaging287(ports:Record<string,unknown>):AtomicStaging287
