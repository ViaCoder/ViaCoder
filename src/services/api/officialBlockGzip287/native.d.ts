import type {FetchRequestState286,GzipBlockStore287} from '../../../utils/officialFetchRequestState286/runtime.js'
import type {FirstHeaderDeadline286} from '../officialByteWatchdog286/header.runtime.js'
import type {ByteWatchdogClock286} from '../officialByteWatchdog286/runtime.js'
export type BlockGzipInit287=RequestInit & {compress?:'gzip'|{encoding:'gzip';level?:number}}
export type BlockGzipDispatch287=(input:RequestInfo|URL,init?:BlockGzipInit287)=>Promise<Response>
export type BlockGzipPorts287={
 a:{readonly CLAUDE_CODE_GZIP_REQUEST_BODY_BLOCKS?:number}
 C(name:string,fallback:number):number
 Ls():FetchRequestState286
 N1r(res:Response):Promise<'non_anthropic_rejection'|'invalid_json_at_origin'|null>
 d(error:unknown):void
 t(message:string,options:{level:'warn'}):void
 m(feature:string,outcome:string,fields?:Record<string,unknown>):void
 p(feature:string,outcome:string,fields?:Record<string,unknown>):void
 y(feature:string):void
 sSt:new(deadline:FirstHeaderDeadline286,sleptMs:number)=>Error
 JM:BlockGzipDispatch287
}
export declare function createNativeBlockGzip287(ports:BlockGzipPorts287):{
 fetch:BlockGzipDispatch287
 handleResponse(res:Response,resend:()=>Promise<Response>):Promise<Response>
 prepare(init:BlockGzipInit287|undefined,clock?:ByteWatchdogClock286):Promise<{init:BlockGzipInit287|undefined;afterResponse?:(res:Response|undefined)=>void}>
 clock:ByteWatchdogClock286
 clear(store:GzipBlockStore287):void
}
