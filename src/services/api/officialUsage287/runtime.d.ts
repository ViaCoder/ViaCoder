import type axios from 'axios'
import type {createHash} from 'node:crypto'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {HttpOAuthRetryOptions} from '../../../utils/officialHttpAuth/runtime.js'
import type {NativeFirstPartyRequestOptions286,NativeFirstPartyResult286} from '../officialFirstTokenDate286/http.runtime.js'
import type {Utilization} from '../usage.js'
export type UsageEndpoint287='plain'|'at_wall'|'cedar_ember'
export type UsageRequest287={
 Gt:{
 get<T=unknown>(path:string,options?:NativeFirstPartyRequestOptions286):Promise<NativeFirstPartyResult286<T>>
 post<T=unknown>(path:string,data?:unknown,options?:NativeFirstPartyRequestOptions286):Promise<NativeFirstPartyResult286<T>>
 put<T=unknown>(path:string,data?:unknown,options?:NativeFirstPartyRequestOptions286):Promise<NativeFirstPartyResult286<T>>
 patch<T=unknown>(path:string,data?:unknown,options?:NativeFirstPartyRequestOptions286):Promise<NativeFirstPartyResult286<T>>
 delete<T=unknown>(path:string,data?:unknown,options?:NativeFirstPartyRequestOptions286):Promise<NativeFirstPartyResult286<T>>
 }
 request<T=unknown>(method:string,path:string,data?:unknown,options?:NativeFirstPartyRequestOptions286):Promise<NativeFirstPartyResult286<T>>
}
export type UsageScope287=<T>(feature:string,run:()=>Promise<T>,classify?:(error:unknown)=>string)=>Promise<T>
export type UsagePorts287={
 U():{host:object}
 In():{accountUuid?:string;organizationUuid?:string}|undefined
 k<T>(feature:string,fallback:T):T
 ft():boolean;zp():boolean;gJe():boolean;jWt():boolean;Xwn():string|null
 $i(options?:{credentials?:CredentialStore;storageV5?:unknown}):Promise<boolean>
 t(message:string,options?:{level:'error'}):void
 uWe:typeof axios.AxiosError;Irr:typeof axios.AxiosHeaders;gd:typeof axios.isAxiosError
 Br:UsageScope287
 E_<T>(request:()=>Promise<T>,options?:HttpOAuthRetryOptions):Promise<T>
 Gt:UsageRequest287['Gt']
 mIe(bearer:string):string
 rm(value?:string,now?:number):number|undefined
 re(text:string,limit:number):string
}
export declare function createUsage287(ports:UsagePorts287):{fetch(credentials?:CredentialStore,endpoint?:UsageEndpoint287):Promise<Utilization>;read(credentials?:CredentialStore,options?:{read?:UsageEndpoint287}):Promise<Utilization>;isAuthRejected(error:unknown):boolean}
export declare function createUsageAuthKey287(ports:{fn:typeof import('../../../utils/auth.js').getClaudeAIOAuthTokens;uU(scopes:unknown):boolean;qN:typeof createHash;At():boolean;He():string;WK:string}):{key():string|null;settleAllowed():boolean;profile():boolean;refreshable():boolean}
// Complete ur closes over these exact existing services; the only published
// IF and the read-only Projects request getter share this factory. The default
// API Gt methods and public host resolution are validated. Ingress/auth producers
// and streaming/tunnel lifecycle beyond the documented cases remain explicit cuts.
export type UsageRequestPorts287=Pick<UsagePorts287,'$i'|'t'|'uWe'> & {
 At():boolean;He():string;Vn():boolean;uU(scopes:unknown):boolean
 fn:typeof import('../../../utils/auth.js').getClaudeAIOAuthTokens
 tl:typeof import('../../../utils/auth.js').getClaudeAIOAuthTokensAsync
 nS:typeof import('../../../utils/auth.js').handleOAuth401Error
 zn:typeof import('../../../utils/secureStorage/index.js').getSecureStorage
 hi:Set<string>
 a:typeof import('../../../utils/authEnvironment.js').authEnvironment
 Dn:typeof import('../../../utils/authEnvironment.js').authEnvironment
 hj:typeof import('../../oauth/client.js').getOrganizationUUID
 lc:typeof import('../../../utils/sessionIngressAuth.js').getSessionIngressAuthToken
 Gfe:typeof import('../../../vendor/official-files-api/slots.js').filesCredentialSlots.sdkOAuthTokenRefreshCallback
 NM:typeof import('../../../utils/sharedHttpAuth.js').sharedHttpAuth.resolveHeaders
 dIe:typeof import('../../../utils/sharedHttpAuth.js').sharedHttpAuth.headers
 q0():string;dn:typeof import('../../../constants/oauth.js').getOauthConfig;cp:string
 UGt:UsageHostInput287['UGt'];gwe:UsageHostInput287['gwe']
 _:typeof JSON.stringify;qN:typeof createHash
 EN:typeof import('node:stream').Readable;JN:typeof import('node:stream').Readable
 rc:typeof import('node:http');Ov:typeof import('node:https');St:typeof axios
 XN:typeof import('node:http').Agent;ge:typeof import('node:https').Agent
 iA:typeof import('../../../utils/mtls.js').getMTLSConfig
 cD:typeof import('../../../utils/caCerts.js').getCACertificates
 d:typeof import('../../../utils/log.js').logError
}
export declare function createUsageRequest287(ports:UsageRequestPorts287):UsageRequest287
export interface UsageHostLaunch287 {ccrSessionUrl():string|undefined;replaceCcrSessionUrl(value:string|undefined):void}
export type UsageHostInput287={UGt():{status:'absent'}|{status:'ok';url:string}|{status:'rejected';code:string;reason:string};gwe(url:URL):URL}
export declare function createUsageHostArgv287(ports:Record<string,never>):(flag:string,argv?:string[])=>string[]
export declare function createUsageHostInput287(ports:{n():{host:{launchOptions:UsageHostLaunch287}};Xse:(flag:string,argv?:string[])=>string[]}):UsageHostInput287
export declare function createUsageText287(ports:Record<string,never>):UsagePorts287['re']
export declare function createUsageRetryAfter287(ports:Record<string,never>):UsagePorts287['rm']
export declare function createUsageScope287(ports:{y(feature:string):void;m(feature:string,reason:string):void}):UsageScope287
export declare function createUsageQualification287(ports:Record<string,never>):{inference(scopes:unknown):boolean;profileScope:string}

// Native public usage consumers; dependency callbacks are runtime adapters,
// not independent state/cache implementations. Status state lives in raw V.of(host).
export type UsageConsumerPorts287=Record<string,((...args:any[])=>any)|object|string|number|symbol>
export declare function createUsageExpectedError287(ports:Record<string,never>):(error:unknown,additional?:(error:unknown)=>boolean)=>boolean
export declare function createUsageClock287(ports:Record<string,never>):(seconds?:number,timezone?:boolean,clock?:boolean,date?:boolean)=>string|undefined
export declare function createUsageEventFields287(ports:Record<string,never>):{c(value:unknown):unknown;me(value:unknown):unknown;Oa(value:readonly string[]):unknown;S(value:unknown):unknown;bn(value:unknown):unknown}
export declare function createUsageGrantField287(ports:{bn:(value:unknown)=>unknown;S:(value:unknown)=>unknown}):(value:unknown)=>unknown
export declare function createUsageRollout287(ports:Record<string,never>):{Zdr(value:unknown):boolean;nDe:string}
export declare function createUsageLabels287(ports:{ir():string|null;ra(object:Record<string,string>,key:string):string|undefined}):{ult(key:string):string;DOt():string}
export declare function createUsageScopedModels287(ports:{k<T>(name:string,fallback:T):T;IS():boolean;Uo(name:string,fallback:unknown):{source:string};Vd():Promise<unknown>;Dt(task:Promise<unknown>,ms:number,message:string):Promise<unknown>;t(message:string,options?:{level:string}):void}):{Gne():string[];BMr():Promise<void>}
export declare function createUsageSnapshot287(ports:UsageConsumerPorts287):{IAo(body:unknown,account?:string,storageV5?:unknown):void;P2n(storageV5?:unknown):unknown;OAo(storageV5?:unknown):unknown;VV():unknown;ZRr():unknown}
export declare function createUsagePublicBody287(ports:Record<string,never>):{mHo(body:unknown):boolean;Sut(body:unknown):boolean;JLt(body:unknown):boolean;gHo(body:unknown):boolean;but(limits:unknown,names:readonly string[]):unknown}
export declare function createUsageSdkReader287(ports:UsageConsumerPorts287):{read(storageV5?:unknown,credentials?:CredentialStore):Promise<import('../../../cli/control/sessionQueries.js').UsageReadResult>;seed(storageV5?:unknown):{utilization:import('../../../cli/control/sessionQueries.js').UsageBody;source:'headers'|'persisted';fetchedAtMs?:number}|null}
export interface UsageLoopFire287 {ts:number;uuid:string;loop:{prompt:string;cron?:string;isDynamic:boolean}}
export interface UsageTranscriptBatch287 {records:import('../../../cli/control/sessionQueries.js').UsageBehaviorRecord[];fires:UsageLoopFire287[]}
export interface UsageTranscriptObserver287 {line(line:Buffer,batch:UsageTranscriptBatch287):void;end(batch:UsageTranscriptBatch287):void}
export type UsageTranscriptRead287=(since:number,record:(record:import('../../../cli/control/sessionQueries.js').UsageBehaviorRecord)=>void,storageV5?:unknown,fire?:(fire:UsageLoopFire287)=>void,observer?:()=>UsageTranscriptObserver287)=>Promise<void>
export declare function createUsageTranscripts287(ports:UsageConsumerPorts287):{read:UsageTranscriptRead287;parse(line:Buffer,start:number,end:number,since:number):import('../../../cli/control/sessionQueries.js').UsageBehaviorRecord|undefined}
export declare function createUsageTranscriptLines287(ports:{K:typeof import('node:fs/promises').open}):{SQr(file:string,chunkSize?:number):AsyncGenerator<Buffer>;zo:typeof JSON.parse}
export declare function createUsageTranscriptText287(ports:Record<string,never>):(text:string,limit:number)=>string
export declare function createUsageBehavior287(ports:{ue(since:number,observe:(record:import('../../../cli/control/sessionQueries.js').UsageBehaviorRecord)=>void,storageV5?:unknown,observeLoop?:(record:unknown)=>void):Promise<void>}):(storageV5?:unknown)=>Promise<import('../../../cli/control/sessionQueries.js').UsageQueryResponse['behaviors']>
export declare function createUsageSdkReply287(ports:UsageConsumerPorts287):(options:{includeBehaviors?:boolean;storageV5?:unknown;credentials?:CredentialStore})=>Promise<import('../../../cli/control/sessionQueries.js').UsageQueryResponse>
export declare function createUsageSdkControl287(ports:{Hr:new(message?:string)=>Error;tJt(options:{includeBehaviors?:boolean;storageV5?:unknown;credentials?:CredentialStore}):Promise<import('../../../cli/control/sessionQueries.js').UsageQueryResponse>}):(request:{skip_behaviors?:unknown},host:{redactsPersistedLane():boolean;storageV5?:unknown;credentials?:CredentialStore})=>Promise<import('../../../cli/control/sessionQueries.js').UsageQueryResponse>
export type UsageProgramLimit287={status:string;resetsAt?:number;rateLimitType?:string;[key:string]:unknown}
export type UsageProgramState287={phase:'idle'|'asking'|'answered'|'failed';[key:string]:unknown}
export type UsageProgramResult287={kind:'answered';status:unknown}|{kind:'failed'|'not_authorized'|'no_profile_scope'}
export interface UsageProgramOwner287 {
 wallCedar(limit:UsageProgramLimit287,credentials?:CredentialStore):void;wallJuniper(limit:UsageProgramLimit287,credentials?:CredentialStore):void
 dialogCedar(limit:UsageProgramLimit287,credentials?:CredentialStore):void;dialogJuniper(limit:UsageProgramLimit287,credentials?:CredentialStore):void
 cedar(credentials?:CredentialStore,options?:{read?:UsageEndpoint287}):Promise<UsageProgramResult287>
 juniper(credentials?:CredentialStore):Promise<UsageProgramResult287>
 askCedar(limit:UsageProgramLimit287,credentials?:CredentialStore,source?:'wall'|'dialog'):Promise<void>
 askJuniper(limit:UsageProgramLimit287,credentials?:CredentialStore,source?:'wall'|'dialog'):Promise<void>
 cedarState():UsageProgramState287;juniperState():UsageProgramState287
 subscribeCedar(listener:()=>void):()=>void;subscribeJuniper(listener:()=>void):()=>void
 cedarOffer(limit:UsageProgramLimit287):UsageCedarOffer287|undefined;juniperOffer(limit:UsageProgramLimit287):unknown
 cedarSpent(limit:UsageProgramLimit287):string|undefined;juniperSpent(limit:UsageProgramLimit287):string|undefined;cedarTokens(offer:UsageCedarOffer287):Record<string,unknown>
 beginCedar(entry:string,credentials?:CredentialStore):Promise<{kind:'confirm';offer:UsageCedarOffer287}|{kind:'answer';result:UsageClaimResult287}>
 claimCedar(entry:string,credentials:CredentialStore|undefined,offer:UsageCedarOffer287):Promise<UsageClaimResult287>
 cancelCedar(entry:string,offer:UsageCedarOffer287):UsageClaimResult287
 claimJuniper(entry:string,credentials?:CredentialStore):Promise<UsageClaimResult287>
 cedarLoading:string;cedarUnavailable:string;anytimeCedarEnabled():boolean;cedarConfirmationNote(offer:UsageCedarOffer287):string|undefined
}
export type UsageCedarOffer287={origin:'wall'|'anytime';grant:{id:string;resetsLeft:number};resetsLeft:number;weeklyResetsAt:string|null;[key:string]:unknown}
export type UsageClaimResult287={outcome:string;text:string}
export declare function createUsageProgramStatus287(ports:UsageConsumerPorts287):UsageProgramOwner287
export declare function createUsageProgramConfig287(ports:{k<T>(name:string,fallback:T):T}):{Ine():boolean;Uye():boolean;e5e():number;fcn():number;rM():Record<string,string>;One():Record<string,string>;Wm(template:string,values:Record<string,unknown>):string;Bzn(template:string,values:Record<string,unknown>):string;zIo():boolean;VIo():boolean;F5():Record<string,string>}
export declare function createUsageProgramEligibility287(ports:UsageConsumerPorts287):{nte(limit:UsageProgramLimit287):boolean;M7t(limit:UsageProgramLimit287):boolean;Tot():string;Aot():boolean;xVe():void;CV(value:string):string}
export declare function createUsageSurfaces287(ports:{n:typeof import('../../context/execution287.js').getExecutionSession287}):{Wu():boolean;Wn():boolean}
export declare function createUsageTimeout287(ports:Record<string,never>):<T>(task:Promise<T>,ms:number)=>Promise<T|undefined>
export declare function createUsageSessionReason287(ports:Record<string,never>):(reason:string)=>boolean
export declare function createUsageOwnLabel287(ports:Record<string,never>):(object:Record<string,string>,key:string)=>string|undefined
export type UsageUiState287={utilization:import('../usage.js').Utilization|null;source:'ok'|'headers'|'persisted'|null;fetchedAtMs?:number;enrichError:string|null}
export declare function createUsageUiLoad287(ports:{FS:(date:Date,options:{now:Date})=>string;h?:unknown;f?:CredentialStore;q(value:boolean):void;V(value:string|null):void;N(value:UsageUiState287|((prior:UsageUiState287)=>UsageUiState287)):void;uMn(storageV5?:unknown,credentials?:CredentialStore):Promise<import('../../../cli/control/sessionQueries.js').UsageReadResult>;JLt(body:unknown):boolean;y(feature:string):void;m(feature:string,reason:string):void;p(feature:string,reason:string):void}):()=>Promise<void>

export declare function createUsageUiDate287(ports:Record<string,never>):(date:Date,options:{now:Date})=>string

export declare function createUsageSchemaBuilder287(ports:Record<string,never>):<T>(build:()=>T)=>()=>T

export declare function createUsageUserFlags287(ports:{a:typeof import('../../../utils/authEnvironment.js').authEnvironment;He():string;n:typeof import('../../context/execution287.js').getExecutionSession287}):{IS():boolean;Pt():boolean}

export declare function createUsageUiRenderer287(ports:UsageConsumerPorts287):(props:{maxWidth:number})=>import('react').ReactNode
export declare function createUsageUiNotices287(ports:UsageConsumerPorts287):()=>{bar:string;text:string;variant?:string}[]
export declare function createUsageUiResetText287(ports:Record<string,never>):(iso:string,timezone?:boolean,clock?:boolean,date?:boolean)=>string|undefined
export declare function createUsageUiLeaf287(ports:UsageConsumerPorts287):import('react').ComponentType<any>
export declare function createUsageUiFormats287(ports:Record<string,never>):(n:number)=>string
export declare function createUsageUiCron287(ports:Record<string,never>):(cron:string,opts?:{utc?:boolean})=>string
export declare function createUsageUiCurrency287(ports:Record<string,never>):(cents:number,currency:string,mode?:string)=>string
export declare function createUsageTranscriptPolicy287(ports:UsageConsumerPorts287):()=>{allowed:boolean;reason?:string}
export declare function createUsageCedarConfirm287(ports:UsageConsumerPorts287):import('react').ComponentType<{offer:UsageCedarOffer287;entry:string;credentials?:CredentialStore;onDone(result:UsageClaimResult287):void}>
export declare function createUsageInputGuard287(ports:UsageConsumerPorts287):{ha(windowMs?:number):()=>boolean;es():{refusedWithin(windowMs?:number):boolean;noteRefused():void;epoch:number};Vy():number;b0n:import('react').ComponentType<any>}
export declare function createUsageConfirmSelect287(ports:UsageConsumerPorts287):import('react').ComponentType<any>
export declare function createUsageMenuActions287(ports:UsageConsumerPorts287):{cedar():void;juniper():void}

export declare function createUsageInputTimer287(ports:UsageConsumerPorts287):(...args:any[])=>any
export declare function createUsageInputFocus287(ports:UsageConsumerPorts287):(...args:any[])=>void
export declare function createUsageInputText287(ports:UsageConsumerPorts287):(value:import('react').ReactNode)=>string

export declare function createUsageTranscriptIoErrors287(ports:Record<string,never>):(error:unknown)=>boolean
