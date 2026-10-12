export interface SessionGuidance287Ports {
 nonInteractive():boolean
 execution():{host:{extensionsConfig:{sessionSkillAllowlist():readonly string[]|undefined}}}
 environment:Pick<import('../../utils/officialTypedEnvironment287/native.js').TypedEnvironment287,'CLAUDE_CODE_ENTRYPOINT'|'CLAUDE_CODE_REMOTE'|'CLAUDE_CODE_DISABLE_BUNDLED_SKILLS'>
 embeddedSearch():boolean
 agentToolSection(lean:boolean):string|null
 agentsEnabled():boolean
 forkEnabled():boolean
 exploreAgent:{readonly agentType:string}
 taskMode():'default'|'no_nudges'|'counter_steer'
 reviewAvailable():boolean
 settings():Readonly<Record<string,unknown>>
}
export interface SessionGuidance287 {
 guidance(tools:ReadonlySet<string>,skills:readonly {readonly name:string}[],lean:boolean,excludeDynamicSections:boolean):string|null
 cloudScope():boolean
 skillAllowlist():readonly string[]|undefined
 bundledSkillsDisabled(settings?:Readonly<Record<string,unknown>>):boolean
}
export function createOfficialSessionGuidance287(ports:SessionGuidance287Ports):SessionGuidance287
