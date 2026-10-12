import type {Tools} from '../../../Tool.js'
import type {SettingSource} from '../../settings/constants.js'
export interface HookMatcherRecord287<H> {
 matcher?:string;hooks:H[];pluginRoot?:string;pluginId?:string;pluginName?:string;
 skillRoot?:string;skillName?:string;projectRoot?:string;deviceOwner?:string;origin?:string
}
export interface HookMatchedRecord287<H> {
 hook:H;pluginRoot?:string;pluginId?:string;pluginName?:string;skillRoot?:string;
 projectRoot?:string;hookSource?:string;matcherIsMatchAll:boolean;matcherTexts?:string[];
 deviceForwarded?:boolean;sdkHost?:boolean
}
export interface HookSessionRegistry287<H> {
 get(id:string,event:string):Map<string,HookMatcherRecord287<H>[]>
 getFunctionHooks(id:string,event:string):Map<string,HookMatcherRecord287<H>[]>
}
export interface HookMatchOptions287<H> {
 managedHooksOnly?:boolean;managedHooksExcluded?:boolean;recordMatchers?:boolean;
 ownSources?:SettingSource[];getToolAliases?():Record<string,string>;
 onPluginMatchersRead?(matchers:HookMatcherRecord287<H>[]):void
}
export interface HookMatcherPorts287<H> {
 registered():Partial<Record<string,HookMatcherRecord287<H>[]>>|null|undefined
 agentHooks():Partial<Record<string,HookMatcherRecord287<H>[]>>|undefined
 snapshot():Partial<Record<string,HookMatcherRecord287<H>[]>>|null
 pluginPolicy:import('../../plugins/officialModsPolicy287/native.js').ModsPolicyRuntime287['policy']
 settingsErrors():readonly (import('../../settings/validation.js').ValidationError & {severity?:string})[]
 settingsPolicyContext():import('../../../services/context/officialModelUsagePolicy287/native.js').PolicyReadContext287
 policyHelperComposition:import('../../../services/context/officialModelUsagePolicy287/native.js').ModelUsagePolicyNative287['readPolicyHelperComposition287']
 policyRecords:import('../../../services/context/officialModelUsagePolicy287/native.js').ModelUsagePolicyNative287['readPolicyRecords287']
 settingsForSource(source:SettingSource):import('../../../services/context/officialModelUsagePolicy287/native.js').PolicyDocument287|null|undefined
 settings():{disableAllHooks?:boolean};
 execution():import('../../../services/context/officialExecutionOwners287/native.js').ExecutionSession287
 legacy():import('../../../services/context/officialExecutionOwners287/native.js').LegacyExecutionContext287|undefined
 canonicalModel(model:string):string;knownCanonicalModel(model:string):boolean;
 findTool:typeof import('../../../Tool.js').findToolByName;
 usesBashTools():boolean;stringify:typeof import('../../slowOperations.js').jsonStringify;
 debug:typeof import('../../debug.js').logForDebugging;
 path:Pick<typeof import('node:path'),'basename'>;util:Pick<typeof import('node:util'),'isDeepStrictEqual'>
}
export function createHookMatcher287<H>(ports:HookMatcherPorts287<H>):{
 managedIds():Set<string>|null
 settingsUnknown():boolean
 configuredMatchers(event:string):HookMatcherRecord287<H>[]
 match(registry:HookSessionRegistry287<H>|undefined,ids:string|string[],event:string,input:{hook_event_name:string;[key:string]:unknown},tools?:Tools,options?:HookMatchOptions287<H>):Promise<HookMatchedRecord287<H>[]>
 gather(registry:HookSessionRegistry287<H>|undefined,ids:string|string[],event:string,options?:HookMatchOptions287<H>):HookMatcherRecord287<H>[]
 query(input:{hook_event_name:string;[key:string]:unknown}):string|undefined
}
