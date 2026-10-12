import type * as path from 'node:path'
export interface PathCache287 {clear():void;size():number;delete(key:string):boolean;get(key:string):string|undefined;has(key:string):boolean;set(key:string,value:string):void}
export interface WindowsPathConverter287 {(path:string):string;cache:PathCache287}
export interface PathPorts287 {nullableCwd():string|null;NoProjectDirectoryError:new()=>Error;platform():string;path:Pick<typeof path,'normalize'|'join'|'isAbsolute'|'resolve'>;homedir():string}
export interface PathRuntime287 {expand(path:string,base?:string):string;convert:WindowsPathConverter287;windowsToPosix:WindowsPathConverter287}
export declare function createPathRuntime287(platform:string,ports:PathPorts287):PathRuntime287
