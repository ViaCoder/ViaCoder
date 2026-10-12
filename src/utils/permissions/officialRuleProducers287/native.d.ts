export interface ParsedBase287 {kept:string[];excluded:Set<string>;bare:boolean;detached:string[];scoped:string[]}
export interface OfficialPermissionRuleHelpers287 {parseList(values:readonly string[]):string[];formatRule(rule:{toolName:string;ruleContent?:string}):string;parseRule(value:string):{toolName:string;ruleContent?:string};validateAllow(toolName:string):{error:string;suggestion:string}|null;preset(value:string):string|null;parseBase(values:string[]):ParsedBase287;normalize(toolName:string):string}
export interface TypedHostLaunch287 {replaceTodoToolsOptIn(value:boolean):void}
export interface PermissionRuleProducersPorts287 {ruleHelpers:OfficialPermissionRuleHelpers287;hostLaunch:TypedHostLaunch287}
export interface PermissionRuleProducers287 {todoToolNames:readonly string[];initializeTodoToolOptIn(allowedToolsCli:readonly string[],baseToolsCli?:readonly string[]):{allowed:string[];base:ParsedBase287;kept:string[];isPreset:boolean;warnings:string[]}}
export function createPermissionRuleProducers287(ports:PermissionRuleProducersPorts287):PermissionRuleProducers287
