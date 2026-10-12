import type * as fs from 'node:fs/promises'
export interface DreamStorageKey287 {
  namespace:string;projectKey:string;relPath?:string[];sessionId?:string
}
export type DreamStorageResult287<T>={ok:true;value:T}|{ok:false;error:{code:string}}
export type DreamLockItem287={found:false}|{found:true;value:string;version:unknown;mtimeMs:number}
/** Exact caller protocol, not a private backend implementation. */
export interface DreamLockStorage287 {
  readText(keys:DreamStorageKey287[]):Promise<DreamStorageResult287<{items:DreamLockItem287[]}>>
  updateText(key:DreamStorageKey287,updater:(value:{version:unknown}|undefined)=>{write:string;result?:boolean}|{skip:true;result:boolean},options?:{publishDiscipline:'inPlace'}):Promise<DreamStorageResult287<{result?:boolean}>>
  delete(key:DreamStorageKey287):Promise<DreamStorageResult287<unknown>>
  listEntries(scope:DreamStorageKey287,options:{skipScopeStats:boolean;skipKeyStats?:boolean;cursor?:string}):Promise<DreamStorageResult287<{items:{kind:string;key:DreamStorageKey287;mtimeMs?:number}[];cursor?:string}>>
}
export interface DreamLockRuntime287 {
  read(root?:string,storage?:DreamLockStorage287):Promise<number>
  acquire(storage?:DreamLockStorage287):Promise<number|null>
  rollback(prior:number,storage?:DreamLockStorage287):Promise<void>
  listSessions(since:number,storage?:DreamLockStorage287):Promise<string[]>
  acquireAt(root:string,storage?:DreamLockStorage287):Promise<number|null>
  rollbackAt(root:string,prior:number,storage?:DreamLockStorage287):Promise<void>
  lockPath(root:string):string
  memoryProjectKey(root:string):string|undefined
  validProjectKey(value:string):boolean
}
export declare function createDreamLock287(ports:{
  Ee():string;F():boolean;l(error:unknown):string;Xs():string;t(text:string):void;
  qh(cwd:string):string;ga(pid:number):boolean;
  P:typeof fs.mkdir;f:typeof fs.readFile;p:typeof fs.stat;v:typeof fs.unlink;D:typeof fs.utimes;k:typeof fs.writeFile;
  A:(...parts:string[])=>string;g:typeof fs.readdir;h:typeof fs.stat;ie:(path:string)=>string;
  u:(path:string)=>string;Et:string;Bd():string;iR(id:unknown):string|null;
}):DreamLockRuntime287
