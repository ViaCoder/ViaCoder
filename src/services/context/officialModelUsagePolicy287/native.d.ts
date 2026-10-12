import type {SettingsStore287} from '../../../utils/settings/officialSettingsStore287/native.js'
import type {SettingSource} from '../../../utils/settings/constants.js'
import type {ModelUsagePolicyPorts287,ModelUsageSettings287,ModelUsagePorts287} from '../officialModelUsage287/native.js'
import type {ExecutionSession287} from '../officialExecutionOwners287/native.js'
import type {RemoteOwnerState287,RemoteLoadStatus287} from '../../remoteManagedSettings/officialOwner287/native.js'
import type {EffortSettings} from '../../../utils/model/effortSettings.js'

export interface PolicyDocument287 extends ModelUsageSettings287,EffortSettings {[key:string]:unknown}
export interface PolicyReadError287 {
 path:string;message:string;file?:string;severity?:string;statusOnly?:boolean;startupFatal?:boolean
 errorClass?:string;errno?:string;userWritable?:boolean;onlySubstitutes?:boolean;[key:string]:unknown
}
export interface PolicyRead287 {
 settings:PolicyDocument287|null;errors:PolicyReadError287[]
 documentHasPolicyContent?:boolean;loadState?:'absent'|'loaded'|'didNotLoad'
 userWritable?:boolean;onlySubstitutes?:boolean;servedSnapshot?:boolean
}
export interface PolicyReadContext287 {
 store:SettingsStore287;cwd:string;allowedSources:string[];hostManagedProvider:boolean
 parentManaged:PolicyDocument287|null|undefined
 wslInherits?:()=>boolean
 file():PolicyRead287;mdm():PolicyRead287;hkcu():PolicyRead287
 helper?:()=>PolicyDocument287|null
 helperArmedFromRemote?:()=>boolean|undefined
 helperArmedFromUserWritableBase?:()=>boolean|undefined
 helperMergesOutput?:()=>boolean|undefined
 helperWarnings?:()=>PolicyReadError287[]
 credentialHelperKeysFrom(source:SettingSource):'as_read'|'none'|'machine_admin'
}
export interface ModelUsagePolicyReadPorts287 {
 context():PolicyReadContext287
 settingsStore():SettingsStore287
 mdm():PolicyRead287
 helperArmedFromUserWritableBase():boolean|undefined
 managedFile(context:PolicyReadContext287):PolicyRead287
 parsePolicy(value:Record<string,unknown>,source:string):PolicyRead287
 readUncached(source:SettingSource,context:PolicyReadContext287):PolicyDocument287|null
 platform:typeof import('../../../utils/platform.js').getPlatform
 filesystem:typeof import('../../../utils/fsOperations.js').getFsImplementation
 debug:typeof import('../../../utils/debug.js').logForDebugging
 environment:typeof import('../../../utils/authEnvironment.js').authEnvironment
 remoteOwner():RemoteOwnerState287
 remoteSettings():PolicyDocument287|null
 rawRemoteSettings():PolicyDocument287|null
 remoteLoadStatus():RemoteLoadStatus287|undefined
 remoteSnapshotEnabled():boolean
 mergeWith:typeof import('lodash-es/mergeWith.js').default
 isEqual:typeof import('lodash-es/isEqual.js').default
 omit:typeof import('lodash-es/omit.js').default
 pick:typeof import('lodash-es/pick.js').default
 memoize<T>(factory:()=>T):()=>T
 executionContext():ExecutionSession287
 logEvent:typeof import('../../analytics/index.js').logEvent
}
export interface ModelUsagePolicyNative287 extends ModelUsagePolicyPorts287,Pick<ModelUsagePorts287,'pricingIgnored'|'pricingError'> {
 remotePolicyRead287(context:PolicyReadContext287):PolicyRead287
 adminPolicyRead287(context:PolicyReadContext287):PolicyRead287
 policyOriginFor287(context:PolicyReadContext287):string|null
 credentialHelperPolicy287(context:PolicyReadContext287):PolicyDocument287|null
 mdmPolicyRead(context:PolicyReadContext287):PolicyRead287
 resolvePolicy(context:PolicyReadContext287):PolicyRead287
 readSource(source:SettingSource,context:PolicyReadContext287):PolicyDocument287|null
 credentialsFrom(source:SettingSource):'as_read'|'none'|'machine_admin'
 parentManaged():PolicyDocument287|null|undefined
 allPolicyTiers():readonly PolicyDocument287[]
 readPolicyRecords287(context:PolicyReadContext287):{admin:PolicyDocument287|null;parentSlice:PolicyDocument287|null;tiers:PolicyDocument287[];present:{remote:boolean;mdm:boolean;file:boolean};parentIncluded:boolean;heldEmpty:boolean}
 readPolicyHelperComposition287(context:PolicyReadContext287):{composes:'none'}|{composes:'tier'|'remoteSlot';helper:PolicyDocument287;mergedOver:string|null}
}
export function createModelUsagePolicy287(ports:ModelUsagePolicyReadPorts287):ModelUsagePolicyNative287
