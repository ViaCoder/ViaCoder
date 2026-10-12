import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {PolicyReadContext287,ModelUsagePolicyNative287} from '../../services/context/officialModelUsagePolicy287/native.js'
export interface PrintParentPolicyPorts287 {
 M():PolicyReadContext287
 uO:ModelUsagePolicyNative287['readPolicyHelperComposition287']
 tR:ModelUsagePolicyNative287['readPolicyRecords287']
 n():ExecutionSession287
 gt:typeof import('../../utils/json.js').safeParseJSON
 t:typeof import('../../utils/debug.js').logForDebugging
 Ro:typeof import('../../utils/settings/settingsCache.js').resetSettingsCache
}
export interface PrintParentPolicy287 {included():boolean;load(value:string):void;invalid():boolean}
export function createPrintParentPolicy287(ports:PrintParentPolicyPorts287):PrintParentPolicy287
