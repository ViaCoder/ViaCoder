import type {authEnvironment} from '../../utils/authEnvironment.js'
import type {PromptModelPolicy287 as importPolicy287} from '../officialCommunication287/native.js'
import type {CanonicalRoot287} from '../../utils/model/officialModelBehavior287/native.js'
export interface DynamicPromptPorts287 extends importPolicy287 {
 execution():{host:{launchOptions:{searchToolsOptIn():boolean}}}
 lean(model:string|undefined):boolean
 debug:typeof import('../../utils/debug.js').logForDebugging
 environment:typeof authEnvironment
 behavior(model:string):string
 canonicalRoot():CanonicalRoot287
 catalogEntry(model:string):{capabilities?:string[]}|undefined
 feature<T>(name:string,fallback:T):T
 clientData():Record<string,unknown>|null
 event(name:string,payload:{len?:number;fromClientData:boolean}):void
 profileReader:{reader:(()=>Record<string,unknown>|null)|null}
}
export interface DynamicPrompt287 {
 bare():boolean
 taskContinuity(behaviorModel:string):string|null
 identity(originalModel:string):string|null
 strictJSON():boolean
 readonly jsonValueRule:string
 parameterJSON(promptModel:string):string|null
 heronRecord():{value:string;fromClientData:boolean}|null
 heronGuidance():string|null
 actionCaution(model:string|undefined):string|null
 willow(model:string|undefined):string|null
 autonomy(behavior:string|undefined,model:string|undefined):string|null
 actDontRederive():boolean
 readonly reducedDelegationRule:string
 readonly reducedDelegationAlt:string
 readonly deliveringWork:string
 readonly corrections:string
 readonly actRule:string
 working(lean:boolean):null
 reducedDelegationModel(model:string|undefined):boolean
 deliveringWorkModel(model:string|undefined):boolean
 fableDefaultModel(model:string):boolean
 readonly steerDelegation:string
 readMainLoopCanonical():string|undefined
 searchToolsOptIn():boolean
 correctionsModel(model:string|undefined):boolean
 deliveringWorkContext(behavior:string|undefined):boolean
}
export function createDynamicPrompt287(ports:DynamicPromptPorts287):DynamicPrompt287
