import type {AxiosStatic} from 'axios'
export type TitleWriteResult = 'landed' | 'failed' | 'rejected'
export type TitleWriteOptions = {
  baseUrl?: string
  getAccessToken?: () => string | undefined
  shouldSend?: () => boolean
  userInitiated?: boolean
}
export type TitleWriter = {
  update(sessionId:string,title:string,options?:TitleWriteOptions):Promise<void>
  noteRemoteTitle(sessionId:string,title:string):void
  forget(sessionId:string):void
  hasSent(sessionId:string,title:string):boolean
  isKnownTitle(sessionId:string,title:string):boolean
}
export function createOfficialTitleWriter(ports:{
  errorMessage(error:unknown):string
  diagnostic(event:string,reason:string):void
  debug(message:string):void
  read(sessionId:string,options?:TitleWriteOptions):Promise<{title?:string|null}|null>
  write(sessionId:string,title:string,options?:TitleWriteOptions):Promise<TitleWriteResult>
},options?:{
  burst?:number;refillMs?:number;retryMs?:number
  isOwnTitle?(sessionId:string,title:string):boolean
  onRemoteTitleAdopted?(sessionId:string,title:string):void
}):TitleWriter
export type CodeSessionOptions = {useV2:boolean;orgUUID?:string;trustedDeviceToken?:string}
export type CodeSessionRecord = {id:string;title?:string|null;status?:string;[key:string]:unknown}
export type CodeSessionFailure = number|'invalid'|'timeout'|'error'
export function createOfficialTitleTransport(ports:{
  http:Pick<AxiosStatic,'get'|'put'|'patch'|'isAxiosError'>
  errorMessage(error:unknown):string
  debug(message:string):void
  errorDetail(body:unknown):string|undefined
  toCompatSessionId(id:string):string
  toInfraSessionId(id:string):string
  userAgent():string
  clientPlatform():string
}):{
  get(baseUrl:string,token:string,sessionId:string,timeoutMs:number,options:CodeSessionOptions):Promise<CodeSessionRecord|CodeSessionFailure>
  update(baseUrl:string,token:string,sessionId:string,body:Record<string,unknown>,timeoutMs:number,options:CodeSessionOptions):Promise<number|'invalid'|'timeout'|'error'>
}
