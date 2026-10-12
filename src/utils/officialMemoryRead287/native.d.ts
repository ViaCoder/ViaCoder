import type {FsOperations} from '../fsOperations.js'
import type {MemoryType} from '../memory/types.js'
import type {getExecutionSession287} from '../../services/context/execution287.js'
import type {MemoryHostRegistryConstructor287} from '../../constants/systemComposerMemoryTracking287.js'
import type {logEvent} from '../../services/analytics/index.js'
export interface MemoryReadResult287 {info:{path:string;type:MemoryType;content:string;globs?:string[];contentDiffersFromDisk:boolean;rawContent?:string}|null;includePaths:string[]}
export interface MemoryReadState287 {memoryReadEacces:boolean;memoryReadFailed:boolean;skip:boolean;rulesWalk:boolean}
export type MemoryReadKey287=string|{namespace:string;[field:string]:unknown}
export interface MemoryReadBackend287 {read(requests:{key:MemoryReadKey287;offset:number;length:number}[]):Promise<{ok:false;error:{code:string;telemetryCode?:string}}|{ok:true;value:{items:{found:boolean;totalBytes:number;value:Uint8Array}[]}}>}
export interface MemoryReaderPorts287 {V:MemoryHostRegistryConstructor287;U:typeof getExecutionSession287;ae:()=>FsOperations;t:(message:string)=>void;we:()=>string;i:typeof logEvent;uat:(raw:string,path:string,type:MemoryType,includeBase?:string)=>MemoryReadResult287}
export interface MemoryFileReader287 {
 mat(path:string,type:MemoryType,includeBase?:string):Promise<MemoryReadResult287>
 mat(path:string,type:MemoryType,includeBase:string|undefined,store:{backend:MemoryReadBackend287;key:MemoryReadKey287}):Promise<MemoryReadResult287|null>
 rO(fs:Pick<FsOperations,'stat'|'readFile'>,path:string,limit:number,onSkipped?:(stat:Awaited<ReturnType<FsOperations['stat']>>)=>void):Promise<string|null>
 w0n(store:{backend:MemoryReadBackend287;key:MemoryReadKey287}):Promise<{kind:'absent'}|{kind:'error';code:string|undefined}|{kind:'skipped';isDirectory:boolean}|{kind:'content';content:string}>
 wEe():MemoryReadState287;kJ:number
}
export declare function createMemoryFileReader287(ports:MemoryReaderPorts287):MemoryFileReader287
