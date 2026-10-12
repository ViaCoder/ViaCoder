import type {HttpAuthHeaders} from '../../../utils/officialHttpAuth/runtime.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
export type NativeFirstPartyFailureReason286='essential-traffic-only'|'data-residency'|'no-auth'
export type NativeFirstPartyResult286<T=unknown>={ok:true;data:T;status:number;response:any;sentAuthFingerprint?:string|null}|{ok:false;reason:NativeFirstPartyFailureReason286;detail?:string}
export type NativeFirstPartyRequestOptions286={auth?:'async'|'none'|'optional'|'claude-ai-oauth'|'teleport-org'|'session-jwt';credentials?:CredentialStore;storageV5?:unknown;timeout?:number;refreshOAuth?:boolean;recoverOAuth401?:boolean;isBackground?:boolean;isRouteOwned401?:(data:unknown)=>boolean;validateStatus?:(status:number)=>boolean;headers?:Record<string,string>;host?:string;[key:string]:any}
export type NativeFirstPartyHttp286Ports=Readonly<{
 AC:any
 Bn:any
 CO:any
 Fa:any
 Fv:any
 He:any
 Hi:(options:{credentials?:CredentialStore;storageV5?:unknown})=>Promise<boolean>
 JN:any
 OF:any
 QD:()=>Promise<HttpAuthHeaders>
 QI:any
 RF:any
 R_:(token:string,credentials?:CredentialStore,storageV5?:unknown)=>Promise<boolean>
 S:any
 Spe:any
 TF:any
 Uu:any
 Vl:any
 Wv:(host:string)=>string
 a:any
 be:any
 bi:Set<string>
 d:any
 dxe:()=>HttpAuthHeaders
 h1:any
 h2:any
 ht:any
 i2e:any
 kn:any
 lc:any
 pn:any
 t:any
 xt:any
 zn:any
}>
export declare function createOfficialFirstPartyHttp286(ports:NativeFirstPartyHttp286Ports):{Wt:{get<T=unknown>(path:string,options?:NativeFirstPartyRequestOptions286):Promise<NativeFirstPartyResult286<T>>};request<T=unknown>(method:string,path:string,data?:unknown,options?:NativeFirstPartyRequestOptions286,retried?:boolean):Promise<NativeFirstPartyResult286<T>>;recover(token:string,options:NativeFirstPartyRequestOptions286):Promise<'retry'|null|{ok:false;reason:'no-auth';detail:string}>}
export declare function createOfficialFirstTokenDateErrors286():{expected(error:unknown,predicate?:(error:unknown)=>boolean):boolean;message(error:unknown):string}
