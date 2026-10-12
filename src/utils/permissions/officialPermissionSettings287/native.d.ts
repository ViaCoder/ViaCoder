import type {PermissionRuleValue} from '../PermissionRule.js'
export type PermissionSettingsSource287='userSettings'|'projectSettings'|'localSettings'|'flagSettings'|'policySettings'
export type PermissionBehavior287='allow'|'deny'|'ask'
export interface PermissionRule287 {source:PermissionSettingsSource287;ruleBehavior:PermissionBehavior287;ruleValue:PermissionRuleValue}
export interface PermissionSettings287 {permissions?:Partial<Record<PermissionBehavior287,string[]>>;[key:string]:unknown}
export interface PermissionSettingsPorts287 {permissionBehaviors:readonly PermissionBehavior287[];evalConfined():boolean;getSettingsForSource(source:PermissionSettingsSource287):PermissionSettings287|null;parseRuleValue(raw:string):PermissionRuleValue;enabledSources():readonly PermissionSettingsSource287[];persistedTrust():boolean;ruleTrustGates():{gateProject:boolean;gateLocal:boolean};reportDroppedAllows(field:string,count:number,files:string[]):void}
export interface PermissionSettings287Api {_G(options?:{strictPersistedTrust?:boolean}):PermissionRule287[];Ju(options?:{strictPersistedTrust?:boolean}):PermissionRule287[];PSe(source:PermissionSettingsSource287):PermissionRule287[];h8n(settings:PermissionSettings287|null,source:PermissionSettingsSource287):PermissionRule287[]}
export function createOfficialPermissionSettings287(ports:PermissionSettingsPorts287):PermissionSettings287Api
