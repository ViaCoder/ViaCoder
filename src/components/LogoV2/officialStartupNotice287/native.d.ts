import type {ZodType} from 'zod/v4'
import type {ExecutionSession287} from '../../../services/context/officialExecutionOwners287/native.js'
import type {GlobalConfig} from '../../../utils/config.js'
import type {SettingSource} from '../../../utils/settings/constants.js'
import type {PolicyLimitsResponse} from '../../../services/policyLimits/types.js'
export interface StartupSetupIssues287 {
 settingsErrorCount:number;lspFailedCount:number;marketplaceIssueCount:number;chromeExtensionIssueCount:number;sandboxIssueCount:number;statuslineIssueCount:number;flaggedPluginCount:number;
 modelDeprecationWarning:{message:string;action:string}|null;
 modelRestrictedWarning:{requested:string;effective:string}|null;
 existingClaudeSubscription:ReturnType<typeof import('../../../utils/auth.js').getSubscriptionType>
}
export interface StartupBridgeDecision287 {
 replBridgeEnabled:boolean;replBridgeAutoOnByDefault:boolean;replBridgeExplicit:boolean;replBridgeOutboundOnly:boolean;
 explicit:{value:boolean|undefined;source:string};autoConnectDefault:{value:boolean;source:string}|undefined;ccrMirrorEnabled:boolean;
 remoteControlFlag:boolean;envRemote:typeof import('../../../utils/authEnvironment.js').authEnvironment.CLAUDE_CODE_REMOTE;isRemoteThinClient:boolean;reattach:boolean;result:'off'|'mirror'|'full'
}
export interface StartupNoticePorts287 {
 builtins:{path:typeof import('node:path')};
 environment:typeof import('../../../utils/authEnvironment.js').authEnvironment;modelDeprecation:(model:string)=>unknown;globalConfig:()=>GlobalConfig;
 oauthTokens:()=>unknown;feature:(name:string,value:boolean)=>boolean;debug:(text:string)=>void;
 provider:()=>string;execution:()=>ExecutionSession287;rootExecution:ExecutionSession287;remote:()=>boolean;
 publishedPolicy:()=>PolicyLimitsResponse|null;policyState:()=>unknown;policyEligible:()=>boolean;hostManaged:()=>unknown;complianceTaint:()=>boolean;
 settingsForSource:(source:SettingSource)=>unknown;settingsPath:(source:SettingSource)=>string|undefined;
 legacyFields:()=>{field(key:string):ZodType|undefined};nativeRequire:(specifier:string)=>{projectSettingsAliasesUserSettings:()=>boolean;getSettingsForSource:StartupNoticePorts287['settingsForSource'];getSecuritySensitiveSettingWithSources:(name:string)=>{source:string;value:unknown}[]}
}
export interface StartupNotice287 {
 deprecation(model:string|undefined):StartupSetupIssues287['modelDeprecationWarning'];
 setupIssues(rawModel:string|null|undefined,resolvedModel:string,restrictedModel?:string|null):StartupSetupIssues287;
 defaultSetupIssues():StartupSetupIssues287;
 legacyField(H:()=>ZodType):ZodType;
 sensitive(key:string):{source:SettingSource;value:unknown}[];
 aliases():boolean;
 explicit():{value:boolean|undefined;source:string};
 autoDefault():{value:boolean;source:string};
 bridge(options:{remoteControlFlag:boolean;isRemoteThinClient:boolean}):StartupBridgeDecision287;
}
export function createStartupNotice287(ports:StartupNoticePorts287):StartupNotice287
