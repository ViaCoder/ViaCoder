import type {StorageV5Key,StorageV5Result,StorageV5Backend} from '../secureStorage/storageV5.js'
export interface DeepLinkStorage287 extends Pick<StorageV5Backend,'write'|'delete'> {stat(key:StorageV5Key):Promise<StorageV5Result<{mtimeMs:number}>>}
export interface DeepLinkPorts287 {
 errno(error:unknown):unknown;errorCode(error:unknown):string|undefined;storagePinned():boolean
 featureSuccess(name:string):unknown;featureFailure(name:string,code:string):unknown;debug(message:string,options?:{level:'warn'}):unknown
 configHome():string;keys:{state(name:string):StorageV5Key};which(name:string):Promise<string|null|undefined>
 exec(file:string,args:string[],options:{useCwd:false}):Promise<{code:number;stdout:string}>
 stablePath():string;settings():{disableDeepLinkRegistration?:string};protocol:string;dataHome():string
 fs:typeof import('node:fs/promises');os:typeof import('node:os');path:typeof import('node:path')
}
export interface DeepLinkProtocol287 {ensure(storage?:DeepLinkStorage287):Promise<void>;register(binary?:string):Promise<void>;current(binary:string):Promise<boolean>;resolve():Promise<string>}
export function createDeepLinkProtocol287(ports:DeepLinkPorts287,platform?:string,arch?:string):DeepLinkProtocol287
