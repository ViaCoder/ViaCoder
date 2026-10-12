import type {SurfaceIdentity287} from '../../services/context/officialSurfaceIdentity287/native.js'
import type {authEnvironment} from '../../utils/authEnvironment.js'
import type {BehaviorMemoOwner287,CanonicalRoot287} from '../../utils/model/officialModelBehavior287/native.js'
import type {OfficialClientDataRecord286} from '../../utils/officialClientData286/data.runtime.js'
export interface CommunicationPorts287 {
 environment: typeof authEnvironment
 behavior(model:string, options?:{identity?:boolean}):string
 catalogEntry(model:string):{capabilities?:string[]} | undefined
 canonicalRoot():CanonicalRoot287
 clientDataRecord(model?:string):OfficialClientDataRecord286|null
 feature<T>(name:string,fallback:T):T
 provider():string
 mainModel():string
 memoOwner():BehaviorMemoOwner287
 servedOwner():BehaviorMemoOwner287
 execution():{host:object;root:object}
 surface():SurfaceIdentity287
 diskless():boolean
 derivedSurface():string|undefined
 memoize:typeof import('lodash-es').memoize
 debug:typeof import('../../utils/debug.js').logForDebugging
 event:typeof import('../../services/analytics/index.js').logEvent
 sessionId():string
 brief:{isBriefEnabled():boolean}
 nonInteractive():boolean
}
export interface PromptModelPolicy287 {
 reducedDelegationModel(model:string|undefined):boolean
 autonomyModel(model:string|undefined):boolean
 deliveringWorkModel(model:string|undefined):boolean
 correctionsModel(model:string|undefined):boolean
 willowModel(model:string|undefined):boolean
 writingOverride():boolean|undefined
 deliveringWorkContext(behavior:string|undefined):boolean
 autonomyContext(behavior:string|undefined,model:string|undefined):boolean
 cachedFeature<T>(name:string,fallback:T):T
}
export interface CommunicationPrompt287 {
 modelPolicyOwner():{Gr():'forced'|'none'|'cohort'}
 delegationCostsFirst(model:string|undefined):boolean
 readonly promptPolicy:PromptModelPolicy287
 communication(model:string|undefined):string
 modelForPrompt(model:string):string
 modelForPrompt(model:undefined):undefined
 modelForPrompt(model:string|undefined):string|undefined
 lean(model:string|undefined):boolean
 surface():SurfaceIdentity287
 sendUserMessageEnabled():boolean
 setCapabilityLookup(reader:NonNullable<CanonicalRoot287['servedCapabilityLookup']>):void
 setFeatureGateLookup(reader:NonNullable<CanonicalRoot287['featureGateLookup']>):void
}
export function createCommunicationPrompt287(ports:CommunicationPorts287):CommunicationPrompt287
