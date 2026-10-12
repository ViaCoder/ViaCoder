import type * as fs from 'node:fs'
import type * as promises from 'node:fs/promises'
import type * as path from 'node:path'
import type * as crypto from 'node:crypto'
import type * as events from 'node:events'
import type {MemoryHostRegistryConstructor287} from '../../constants/systemComposerMemoryTracking287.js'
import type {MemoryClientStore287} from '../../constants/systemComposerMemory287.js'
import type {parseFrontmatter} from '../frontmatterParser.js'
import type {normalizeMemoryFrontmatter287} from '../../memdir/officialMemoryFormat287/native.js'
import type {readFileInRange} from '../readFileInRange.js'
import type {MemoryType} from '../../memdir/memoryTypes.js'
export interface MemoryHeader287 {filename:string;filePath:string;mtimeMs:number;modifiedMs:number;description:string|null;type:MemoryType|undefined}
export interface MemoryScanKey287 {namespace:'memory';relPath:string[];projectKey?:string;[name:string]:unknown}
export type MemoryScanResult287<T>={ok:true;value:T}|{ok:false;error:{code:string;telemetryCode?:string}}
export interface MemoryScanBackend287 {
 listRecursive(scope:{namespace:'memory';projectKey:string},options:{cursor?:string;skipKeyStats:true}):Promise<MemoryScanResult287<{items:{key:MemoryScanKey287;viaSymlink?:boolean}[];cursor?:string}>>
 read(requests:{key:MemoryScanKey287;offset:number;length:number}[]):Promise<MemoryScanResult287<{items:{found:boolean;mtimeMs:number;value:Uint8Array;totalBytes:number}[]}>>
}
export interface MemoryDirectoryPorts287 {
 fs:typeof fs;'fs/promises':typeof promises;path:typeof path;crypto:typeof crypto;events:typeof events
 hostRegistry:MemoryHostRegistryConstructor287;stores():readonly MemoryClientStore287[]|null;memoryDirectory():string;memoryBase():string
 frontmatter:typeof parseFrontmatter;normalizeFrontmatter:typeof normalizeMemoryFrontmatter287;readRange:typeof readFileInRange
 debug(message:string,options?:{level:'warn'|'debug'}):void;event(name:string,metadata:{[key:string]:number|boolean|undefined}):void;sad(name:string,code:string):void;ok(name:string):void
}
export interface MemoryDirectoryRuntime287 {
 storageKeyValid(value:string):boolean
 readonly scanStorageListError:new(message:string,safeMessage:string)=>Error
 backfill(host:object,directory:string):Promise<boolean>
 scan(directory:string,signal:AbortSignal,options?:{regularFilesOnly?:boolean},backend?:MemoryScanBackend287):Promise<MemoryHeader287[]>
 publish(directory:string,content:string):Promise<'written'|'exists'|'unwritable'>
 formatIndex(headers:Pick<MemoryHeader287,'filename'|'description'>[]):{content:string;skippedCount:number}
 classify(directory:string):Promise<'exists'|'none'|'candidates'>
}
export declare function createMemoryDirectory287(ports:MemoryDirectoryPorts287):MemoryDirectoryRuntime287
