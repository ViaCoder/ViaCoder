import type * as fs from 'node:fs'
import type * as os from 'node:os'
import type * as childProcess from 'node:child_process'
export type ManagedReadOutcome287={status:'ok'|'spawn_error'|'timeout'|'killed'|'exited';exitCode:number|null;errno:string|null;signal:string|null;durationMs:number}
export type ManagedPlistRead287=({stdout:string;unreadReason?:never;unreadErrno?:never}|{stdout:null;unreadReason:string;unreadErrno?:string})&{label:string;userWritable?:boolean}
export type RawManagedRead287={plistStdouts:ManagedPlistRead287[]|null;hklmStdout:string|null;hklmUnreadReason?:string;hkcuStdout:string|null;outcomes:{hklm:ManagedReadOutcome287|null;hkcu:ManagedReadOutcome287|null}}
export type ManagedReadError287={file:string;path:string;message:string;severity:'warning'|'fatal';statusOnly:true;errorClass:'unreadable';errno?:string;userWritable?:true}
export type MdmRawPorts287={process:Pick<NodeJS.Process,'env'>;fs:Pick<typeof fs,'accessSync'|'closeSync'|'constants'|'openSync'|'readSync'>;os:Pick<typeof os,'userInfo'>;childProcess:Pick<typeof childProcess,'execFile'>;require:(name:string)=>unknown}
export type MdmRawReader287={read():Promise<RawManagedRead287>;start():void;promise():Promise<RawManagedRead287>|null;paths?:()=>Array<{path:string;label:string}>}
export function createMdmRawRead287(platform:string,ports:MdmRawPorts287):MdmRawReader287
export function parseRegistry287(stdout:string,valueName?:string):string|null
export function unreadableManagedDocument287(file:string,reason:string,userWritable?:boolean,errno?:string):ManagedReadError287
