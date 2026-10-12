export interface MemoryEntryTruncation287 {content:string;lineCount:number;byteCount:number;wasLineTruncated:boolean;wasByteTruncated:boolean}
export declare function truncateMemoryEntrypoint287(content:string):MemoryEntryTruncation287
export declare const memoryEntryLineLimit287:200
export declare const memoryEntrySizeLimit287:25000
export declare const memoryEntryName287:'MEMORY.md'
export declare function truncatePreview287(content:string,length:number):string
