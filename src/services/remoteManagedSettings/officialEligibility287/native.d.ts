import type {authEnvironment} from '../../../utils/authEnvironment.js'
import type {GatewayCredential287} from '../officialGatewayRefresh287/native.js'
import type {OAuthTokens} from '../../oauth/types.js'
export interface RemoteEligibilityPorts287 {
 environment:Partial<Pick<typeof authEnvironment,'CLAUDE_CODE_REMOTE'|'CLAUDE_CODE_REMOTE_HERMETIC_MODE'|'CLAUDE_CODE_ENTRYPOINT'|'CLAUDE_CODE_EVAL_CONFINED'|'ANTHROPIC_BASE_URL'>>
 gatewayAuth():GatewayCredential287|null|undefined
 provider():string
 requestEndpointEnabled():boolean
 profileEligible():boolean
 profileBaseURL():string|undefined
 oauthConfig():{BASE_API_URL:string}
 apiKey(options:{skipRetrievingKeyFromApiKeyHelper:true}):{key:string|null;source:string}
 tokens():Pick<OAuthTokens,'accessToken'|'subscriptionType'>|null
 cacheOverride():string|undefined
 eligibilityMemo():boolean|undefined
 recordEligibility(value:boolean,reason?:string):boolean
 setSnapshotOnly(value:boolean):void
 debug:typeof import('../../../utils/debug.js').logForDebugging
}
export interface RemoteEligibility287 {
 eligibility():{eligible:boolean;ineligibleReason?:string}
 memoizedEligibility():boolean
 profileHostMatches(url?:string):boolean
 hermeticRemote():boolean|undefined
 subscriptionEligible():boolean
}
export function createRemoteEligibility287(ports:RemoteEligibilityPorts287):RemoteEligibility287
