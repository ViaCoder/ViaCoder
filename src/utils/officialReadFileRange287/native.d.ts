import type * as fs from 'node:fs'
import type * as promises from 'node:fs/promises'
import type * as stream from 'node:stream'
import type * as stringDecoder from 'node:string_decoder'
export interface ReadFileRangeResult287 {
 content:string;lineCount:number;totalLines:number;totalBytes:number;readBytes:number;mtimeMs:number;truncatedByBytes:boolean
}
export interface ReadFileRangeOptions287 {
 truncateOnByteLimit?:boolean;maxSelectedBytes?:number;handle?:promises.FileHandle;handleStats?:fs.Stats
}
export interface FileTooLargeError287 extends Error {sizeInBytes:number;maxSizeBytes:number}
export interface SelectedRangeTooLargeError287 extends Error {selectedBytes:number;maxSelectedBytes:number}
export interface ReadFileRangeRuntime287 {
 readRange(file:string,offset?:number,maxLines?:number,maxBytes?:number,signal?:AbortSignal,options?:ReadFileRangeOptions287):Promise<ReadFileRangeResult287>
 fileTooLarge:new(size:number,limit:number)=>FileTooLargeError287
 selectedTooLarge:new(size:number,limit:number)=>SelectedRangeTooLargeError287
}
export declare function createReadFileRange287(ports:{fs:typeof fs;'fs/promises':typeof promises;stream:typeof stream;string_decoder:typeof stringDecoder}):ReadFileRangeRuntime287
