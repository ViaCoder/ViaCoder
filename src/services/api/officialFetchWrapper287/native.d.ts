import type {ByteWatchdogClock286} from '../streamWatchdog.js'
import type {FirstHeaderDeadline286} from '../officialByteWatchdog286/header.runtime.js'
export type Fetch287=(input:RequestInfo|URL,init?:RequestInit)=>Promise<Response>
export interface FetchWrapper287 {
 wrapper(fetchImpl:Fetch287|undefined,source:string|undefined,routedProvider:string|undefined,storageV5:unknown,clock:ByteWatchdogClock286):Fetch287;
 authCacheClock:{lastFullCheck:number|'worker_start'};
 authCacheElapsed(now:number):number|undefined;
 requestIdentity(input:RequestInfo|URL,init?:RequestInit):{method:string;url:string};
 isMessageEndpoint(input:RequestInfo|URL):boolean;
 deadline(input:{clientRequestId?:string;provider:string;routedProvider?:string;method:string;url:string;body:unknown}):FirstHeaderDeadline286|undefined;
 bodyWatchdog(body:ReadableStream<Uint8Array>,timeout:number,cfRay?:string,chunkTimes?:{lastAt:number},clock?:ByteWatchdogClock286):ReadableStream<Uint8Array>;
 sanitizeHeaders(headers:Headers):{auth:string;headers:Record<string,string>};
 clientDataHeader():string|undefined;
}
export function createFetchWrapper287(ports:Record<string,unknown>):FetchWrapper287
