import type {FsOperations} from '../fsOperations.js'
import type {DebugLogLevel} from '../debug.js'
export interface CleanupLogResult287 {messages:number;errors:number;filesRetainedFresh:number;filesPastCutoff:number}
export interface CleanupLogsPorts287 {
 ae():FsOperations;we():string;Ee():string;tee(value:string):number
 W(error:unknown):boolean;Ht(error:unknown):boolean;ch(error:unknown):boolean
 t(message:string,options?:{level:DebugLogLevel}):unknown;d(error:unknown):unknown
 $_():Date|null;o:typeof import('node:path');E:typeof import('node:os');l:typeof import('node:process');c:NodeJS.ProcessEnv
 T:typeof import('node:path').join;h:typeof import('node:path').join
}
export interface CleanupLogs287 {
 messageLogs():Promise<CleanupLogResult287>;debugLogs():Promise<CleanupLogResult287>;dateFromName(value:string):Date
 paths:{baseLogs():string;errors():string;mcpLogs(serverName:string):string}
}
export function createCleanupLogs287(ports:CleanupLogsPorts287):CleanupLogs287
