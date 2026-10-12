import type {PolicySignedCacheKind287} from './signature.js'
export type PolicyBearerAttribution287={sent:false;reason:string}|{sent:true;latencyMs:number;outcome:{ok:true;data:unknown}|{ok:false;reason:string;status?:number}}
export type PolicyLiveIdentity287={state:'resolved';bearer:string;orgUuid:string;accountUuid?:string;latencyMs:number}|{state:'not_applicable';bearer:string}|{state:'unresolved';bearer:string;reason:string;latencyMs?:number;httpStatus?:number}
export interface PolicyCredentialStatusInput287 {
 errorCode?:string;httpStatus?:number;serverErrorType?:string;serverErrorCode?:string;serverAuthDenial?:string
 authUnavailableReason?:string;authType?:string;credentialOrigin?:string;tokenRefreshOutcome?:string;forcedRefreshOutcome?:string;noResponse?:boolean;injectedTokenRecovery?:string
}
export declare function createPolicyDiagnostics287(ports:Record<string,unknown>):{
 Dht(error:unknown):{serverErrorType?:string;serverErrorCode?:string;serverAuthDenial?:string}
 Y_n(input:PolicyCredentialStatusInput287):'unknown'|'dead'|'live';zXe(error:unknown):string
 K2t(callback:()=>void,delay:number,options?:{unref?:boolean}):{[Symbol.dispose]():void}
 zGr(snapshot:Record<string,unknown>):void;$G(domain:string,state:Record<string,unknown>):void
 Mht(domain:string,result:string,options?:{since?:number;supersede?:boolean}):void
 q_n(ports:{bearerKind():string;attributeBearer():Promise<PolicyBearerAttribution287>;featureValue(name:string,defaultValue:boolean):boolean}):Promise<PolicyLiveIdentity287>
 K_n(options:{kind:PolicySignedCacheKind287;cachePath:string;bodySha:string;readStoredAccount():{organizationUuid?:string;accountUuid?:string;workspaceUuid?:string}|null|undefined;resolveLiveIdentity():Promise<PolicyLiveIdentity287>}):void
}
