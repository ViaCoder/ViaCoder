import type {StorageV5Backend} from '../secureStorage/storageV5.js'
export interface DeepLinkStartupOptions287 {deepLinkOrigin?:boolean;prefillB64?:string;deepLinkCwdB64?:string;prefill?:string}
export interface DeepLinkStartupPorts287 {
 edr(text:string):string;Zcr(path:string):void;zf(path:string):void;Rf(path:string):void
 vT(path:string):void;jfe(path:string):void;oe():string;CIe():void;C6t():void;Whe():void
 Ro(options?:{userLayer?:'retain'}):void;yy(reason:string):void;F():boolean
 j2t(storage:StorageV5Backend):Promise<(()=>void)|undefined>;WFe(storage:StorageV5Backend|undefined,reason:string):unknown
 z7r():void;MG(options?:{userLayer?:'retain'}):void;Kl:{cache:{clear?():void}};X_(storage?:StorageV5Backend):Promise<void>
 t(message:string,options:{level:'error'}):void
}
export function createDeepLinkStartup287(ports:DeepLinkStartupPorts287):(options:DeepLinkStartupOptions287,storage:StorageV5Backend|undefined,startupInitialized:()=>boolean)=>Promise<void>
