import type Anthropic from '@anthropic-ai/sdk'
import type {ClientOptions} from '@anthropic-ai/sdk'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {AgentContext} from '../../../utils/agentContext.js'
import type {ByteWatchdogClock286} from '../../api/streamWatchdog.js'
export type SdkRequestAgent287=AgentContext|{agentType:'main';agentId?:string;isBackgroundAgent?:boolean}
export interface SdkClientOuterInput287 {
 apiKey?:string;maxRetries:number;model?:string;fetchOverride?:ClientOptions['fetch'];source?:string;querySource?:string
 agentContext:SdkRequestAgent287;promptId?:string;permissionContext?:unknown;credentials?:CredentialStore;storageV5?:unknown;signal?:AbortSignal;clock?:ByteWatchdogClock286
}
/** Ports are reads of existing canonical owners, not replacement host state. */
export declare function createSdkClientOuter287(ports:Record<string,unknown>):(input:SdkClientOuterInput287)=>Promise<Anthropic>

export declare function createSdkProjectConfigRoot287(execution:()=>{host:{launchOptions:{projectConfigRoot():string|null}}}):()=>string|null
