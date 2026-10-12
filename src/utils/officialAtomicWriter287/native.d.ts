import type {FsOperations} from '../fsOperations.js'
export interface AtomicStagingRegistry287 {
 record(path:string,dev:number,ino:number,fd:number):void
 identity(path:string):{dev:number;ino:number;fd:number}|undefined
 reset():void
}
export interface AtomicWriteOptions287 {
 encoding?:BufferEncoding;mode?:number;allowSymlink?:boolean;checkParentDir?:boolean
 stagingDir?:string;refuseHardLinkedInPlace?:boolean
}
export interface AtomicWriter287 {
 write(path:string,content:string,options?:AtomicWriteOptions287):Promise<void>
 StagingRegistry:new()=>AtomicStagingRegistry287
 record(path:string,dev:number,ino:number,fd:number):void
 tampered(message:string):never
 SymlinkWriteRefusedError:typeof Error;HardLinkWriteRefusedError:typeof Error;StagingDirTamperedError:typeof Error
}
export function createAtomicWriter287(ports:{ae():FsOperations;t:typeof import('../debug.js').logForDebugging;j():AtomicStagingRegistry287;m(feature:string,reason:string):void}):AtomicWriter287
