import type {SDKControlRequest,SDKControlMcpMessageRequest} from '../controlTypes.js'
import type {PermissionResult} from '../coreTypes.recovered.js'
import type {JSONRPCMessage} from '@modelcontextprotocol/sdk/types.js'
export function invokeOriginalSDKCanUseTool287<T extends symbol>(owner:object,request:SDKControlRequest,signal:AbortSignal,noResponse:T):Promise<(PermissionResult&{toolUseID:string})|T>
export function invokeOriginalSDKIgnore287<T extends symbol>(request:SDKControlRequest,noResponse:T,debug:(message:string)=>void):T|undefined
export function isOriginalSDKMcpRequest287(message:JSONRPCMessage):boolean
export function invokeOriginalSDKOAuthRefresh287(owner:object,request:SDKControlRequest,signal:AbortSignal):Promise<{accessToken:string|null;reason?:'signed_out'|'identity_changed'|'transient'|'refresh_failed'}>
export function invokeOriginalSDKWorkSecret287(owner:object,request:SDKControlRequest,signal:AbortSignal):Promise<{work_secret:string|null}>
export function invokeOriginalSDKProcessControl287<T extends symbol>(owner:object,request:SDKControlRequest,signal:AbortSignal,noResponse:T,debug:(message:string)=>void,track:(name:string,metadata:any)=>void,tag:(value:string)=>unknown):Promise<unknown|T>
export function invokeOriginalSDKHookCallback287(owner:object,id:string,input:unknown,toolUseID:string|undefined,signal:AbortSignal):Promise<unknown>
export function invokeOriginalSDKMcpControl287(owner:object,name:string,request:SDKControlMcpMessageRequest,transport:object):Promise<JSONRPCMessage>
export function invokeOriginalSDKHandleControlRequest287<T extends symbol>(owner:object,request:SDKControlRequest,debug:(message:string,options?:{level:'error'})=>void,noResponse:T,serialize:(value:unknown)=>string,errorText:(error:unknown)=>string):Promise<void>
