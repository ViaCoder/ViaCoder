import {getExecutionSession287} from '../../services/context/execution287.js'
import {getModelUsagePolicy287,getModelUsagePolicyContext287} from '../../services/context/modelUsagePolicy287.js'
import {safeParseJSON} from '../../utils/json.js'
import {logForDebugging} from '../../utils/debug.js'
import {resetSettingsCache} from '../../utils/settings/settingsCache.js'
import {createPrintParentPolicy287} from './parentPolicyNative287.js'
// Pure source selector/parser. Each call borrows the existing policy reader
// and current execution host; no settings registry, cache or flag is added.
const parentPolicy287=createPrintParentPolicy287({
 M:getModelUsagePolicyContext287,
 uO:context=>getModelUsagePolicy287().readPolicyHelperComposition287(context),
 tR:context=>getModelUsagePolicy287().readPolicyRecords287(context),
 n:getExecutionSession287,gt:safeParseJSON,t:logForDebugging,Ro:resetSettingsCache,
})
export function parentManagedPolicyIncluded287():boolean {return parentPolicy287.included()}
export function loadParentManagedSettings287(value:string):void {parentPolicy287.load(value)}
export function parentManagedSettingsInvalid287():boolean {return parentPolicy287.invalid()}
