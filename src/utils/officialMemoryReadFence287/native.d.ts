import type * as path from 'node:path'
import type {FsOperations} from '../fsOperations.js'
import type {MemoryType} from '../memory/types.js'
import type {MemoryFileInfo} from '../claudemd.js'
import type {MemoryReadBackend287,MemoryReadResult287,MemoryReadKey287} from '../officialMemoryRead287/native.js'
import type {FilesystemResolve287} from '../officialFilesystemPaths287/native.js'
export type MemoryExclusion287=(path:string,type:MemoryType)=>boolean
export type MemoryReadStore287={backend:MemoryReadBackend287;key:MemoryReadKey287}
export interface MemoryReadFencePorts287 {
 path:typeof path;platform():string;filesystem():FsOperations;resolve(fs:FsOperations,path:string):FilesystemResolve287;
 network(path:string):boolean;networkVolume(path:string):boolean;entrypoint():string;
 settings():{claudeMdExcludes?:string[]};originalCwd():string;expand(path:string,base?:string):string;windowsToPosix(path:string):string;
 read(path:string,type:MemoryType,base?:string,store?:MemoryReadStore287):Promise<MemoryReadResult287|null>;
}
export interface MemoryReadFence287 {
 process(path:string,type:MemoryType,seen:Set<string>,external:boolean,depth?:number,parent?:string,store?:MemoryReadStore287,exclude?:MemoryExclusion287):Promise<MemoryFileInfo[]>;
 skipped(path:string,type:MemoryType,seen:Set<string>,exclude?:MemoryExclusion287):MemoryFileInfo[];
 exclusion():MemoryExclusion287;excluded(path:string,type:MemoryType,exclude?:MemoryExclusion287):boolean;
 within(path:string):boolean;normalize(path:string):string;
}
export declare function createMemoryReadFence287(ports:MemoryReadFencePorts287):MemoryReadFence287
