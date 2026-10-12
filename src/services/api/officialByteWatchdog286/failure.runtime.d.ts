import type {APIError} from '@anthropic-ai/sdk'
export declare function createOfficialStreamFailurePredicates286(ports:{Pt:typeof APIError}):{
  vIo(input:{previous?:object;closedContentBlocks:WeakSet<object>;started:object}):boolean
  jOe(error:unknown):boolean
  tB(block:{type?:unknown}):boolean
  Qm(error:unknown):{code:string;message:string;isSSLError:boolean}|null
  D1:Set<string>
  vM:Set<string>
  x9:new(blockState:string)=>Error & {blockState:string}
  CF(error:unknown):boolean
  iBe(error:unknown):boolean
  Tht(error:unknown):boolean
  cjt:new()=>Error
  d7n:new()=>Error & {code:'StreamTruncated'}
  serverError(error:unknown):boolean
  fallbackBlock(block:{type?:unknown}):boolean
  denied(error:unknown):boolean
  connectionFlags(error:unknown):{connectionDetails:{code:string;message:string;isSSLError:boolean}|null;isStaleConnection:boolean;isConnectionError:boolean}
  MalformedStreamError:new(blockState:string)=>Error & {blockState:string}
  TruncatedStreamError:new()=>Error & {code:'StreamTruncated'}
  NoEventsError:new()=>Error
  malformedStream(error:unknown):boolean
}
