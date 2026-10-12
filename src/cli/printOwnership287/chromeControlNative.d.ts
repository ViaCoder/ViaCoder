import type {ControlMcpConnection} from '../control/mcpConnectionPool.js'
export type ChromeControlRequest287={request_id:string;request:{subtype:string;device_id?:string}}
export type ChromeControlGetter287={
 get(file:'chunk-x5mcrns6.js',name:'qm'):Promise<(host:object)=>boolean>
 get(file:'chunk-f2n7vgt8.js',name:'Dt'):Promise<<T>(promise:Promise<T>,ms:number,message:string)=>Promise<T>>
 get(file:'chunk-nankzm0s.js',name:'le'):Promise<()=>{chromeExtension?:{pairedDeviceId?:string;pairedDeviceName?:string;[key:string]:unknown};[key:string]:unknown}>
 get(file:'chunk-n2zepamy.js',name:'pme'):Promise<(redactsPersistedLane:boolean,subtype:string,error:unknown,options?:{expected?:boolean})=>{error:string}>
 importPublic(specifier:string):Promise<Readonly<Record<string,unknown>>>
 host:object
 mcpClients():ControlMcpConnection[]
 detached(work:()=>Promise<unknown>):void
 success(message:ChromeControlRequest287,response?:unknown):void
 error(message:ChromeControlRequest287,error:string):void
}
export declare function createPrintChromeControlNative287(ports:ChromeControlGetter287): (message:ChromeControlRequest287)=>Promise<boolean>
