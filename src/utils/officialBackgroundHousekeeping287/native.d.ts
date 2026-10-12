import type {StorageV5Backend,StorageV5Key} from '../secureStorage/storageV5.js'
export interface HousekeepingHost287 {backgroundHousekeeping:{claim():boolean;claimStagingReap():boolean}}
export type HousekeepingTimer287={unref():unknown}
export interface HousekeepingPorts287 {
 F():boolean;De:{state(name:string):StorageV5Key};we():string
 Y(path:string):Promise<{mtimeMs:number}>;N(...paths:string[]):string
 z(path:string,text:string):Promise<unknown>;t(message:string,options?:{level:import('../debug.js').DebugLogLevel}):unknown;d(error:unknown):unknown
 Zmr(host:HousekeepingHost287):unknown;Muo(host:HousekeepingHost287):unknown
 D(storage?:StorageV5Backend):unknown;Wu():boolean;Hg():number
 wso(storage?:StorageV5Backend):unknown;NBn():Promise<unknown>;fSr(storage?:StorageV5Backend):Promise<unknown>
 pSr(path:string,owner:HousekeepingHost287['backgroundHousekeeping']):Promise<unknown>;uSr(storage:StorageV5Backend):Promise<unknown>
 js():{sessionFile:string|null};My(path:string):StorageV5Key|undefined
 wfn(path:string,atime:Date,mtime:Date):Promise<unknown>
 setTimeout(callback:()=>unknown,delay:number):HousekeepingTimer287
 setInterval(callback:(storage?:StorageV5Backend)=>unknown,delay:number,storage?:StorageV5Backend):HousekeepingTimer287
}
export function createHousekeepingMarkers287(ports:{De:{state(name:string):StorageV5Key};we():string;t(message:string,options?:{level:import('../debug.js').DebugLogLevel}):unknown;i(name:string,metadata:Record<string,unknown>):unknown;j:typeof import('node:fs/promises');h(...paths:string[]):string}):Pick<HousekeepingPorts287,'pSr'|'uSr'>
export interface BackgroundHousekeeping287 {
 start(host:HousekeepingHost287,storage?:StorageV5Backend):Promise<void>
 isRecentCleanup(storage?:StorageV5Backend):Promise<boolean>
 touchSession(storage?:StorageV5Backend):void
 isQuietFsError(error:unknown):boolean;hasNumericErrno(error:unknown):boolean
}
export function createBackgroundHousekeeping287(ports:HousekeepingPorts287):BackgroundHousekeeping287
