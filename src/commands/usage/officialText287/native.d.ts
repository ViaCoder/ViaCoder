import type {UsageQueryResponse} from '../../../cli/control/sessionQueries.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {ExecutionSession287} from '../../../services/context/officialExecutionOwners287/native.js'
import type {ModelUsage} from '../../../entrypoints/agentSdkTypes.js'
export type UsageTextContext287={session:ExecutionSession287;storageV5?:unknown;credentials?:CredentialStore}
export type UsageTextTwin287={session:UsageQueryResponse['session'];rate_limits:{limits:unknown[]|null;extra_usage?:unknown}|null}
export type UsageTextResult287={type:'text';value:string;usageReport?:UsageTextTwin287}
export interface UsageTextPorts287 {
 Ce():boolean;t(message:string,options?:{level:'warn'}):void;I(count:number,noun:string):string;en(value:string):string
 fe:{dim(value:string):string};Bo(session:ExecutionSession287):boolean
 ft():boolean;zp():boolean;ir():string|null;k<T>(name:string,fallback:T):T
 E4r():{safeParse(value:unknown):{success:true;data:UsageTextTwin287}|{success:false;error:{message:string}}}
 Tu(seconds:number,timezone?:boolean,clock?:boolean,date?:boolean):string|undefined
 Bbt(iso:string,timezone?:boolean,clock?:boolean,date?:boolean):string|undefined
 He():string;RN():boolean;gi(cents:number,currency:string):string
 pa():{isUsingOverage?:boolean};VV():{overage?:{utilization:number;resets_at:number}}
 Klt(credentials?:CredentialStore):Promise<{used:number;limit:number;currency:string;utilization:number;period?:'daily'|'weekly'|'monthly';resetsAt?:string}|undefined>
 jce():string;kMe():{allowed:boolean;reason?:string}
 tJt(options:{includeBehaviors:boolean;storageV5?:unknown;credentials?:CredentialStore}):Promise<UsageQueryResponse>
 nP():Record<string,ModelUsage>;Be(model:string):string
}
export declare function createUsageText287(ports:UsageTextPorts287):{
 call(args:string,context:UsageTextContext287):Promise<UsageTextResult287>
 formatRateLimits(reply:UsageQueryResponse):string|null
 formatBehaviors(reply:UsageQueryResponse):string|null
}
