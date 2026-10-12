import type {Command} from '../../types/command.js'
import type {CommandRegistry287} from '../officialPublicCommandCapability287/native.js'
export interface DynamicSkillState287 {dynamicSkillDirs:Set<string>;dynamicSkills:Map<string,Command>;conditionalSkills:Map<string,Command>;activatedConditionalSkillNames:Set<string>;refusedReservedNames:Map<string,{name:string;path?:string;change:string}>}
export interface DiscoveryRegistry287 extends CommandRegistry287 {
 skillDirCommands:Map<string,Promise<Command[]>>;loadedCommands:Map<string,Promise<Command[]>>;skillToolCommands:Map<string,Promise<Command[]>>;slashCommandToolSkills:Map<string,Promise<Command[]>>
 dynamicSkillStates:Map<unknown,DynamicSkillState287>;dynamicSkillStateKey():unknown
 attachedFolderSkills?:()=>Command[];fallbackShadowTelemetryLogged:Set<string>;bundledSkills:Command[];dynamicSkillsLoaded:{subscribe(listener:()=>void):()=>void;emit():void}
 reservedSpellingsFor(commands:Command[],create:()=>Set<string>):Set<string>
 markLoadedResultMissingTrustedNames(commands:Command[]):void;loadedResultIsMissingTrustedNames(commands:Command[]):boolean
 refusedReservedSkillNames():{name:string;change:string}[]
}
export type DiscoveryPorts287=Record<string,unknown>&{ro():DiscoveryRegistry287;jtr(cwd:string,options?:unknown):Promise<Command[]>}
export interface CommandDiscovery287 {installCommandHook(hook:{hooked(commands:Command[]):Promise<Command[]>;isHooked():boolean}|null):void;skillTool(cwd:string,options?:unknown):Promise<Command[]>;slashSkills(cwd:string,options?:unknown):Promise<Command[]>;discover(cwd:string|null,options?:unknown):Promise<Command[]>;commands(cwd:string|null,options?:unknown):Promise<Command[]>;load(cwd:string|null,options?:unknown):Promise<Command[]>;skills(cwd:string|null,options?:unknown):Promise<{skillDirCommands:Command[];pluginSkills:Command[];bundledSkills:Command[];builtinPluginSkills:Command[];trustedNamesFailedToLoad:boolean}>;key(cwd:string|null):string;mode(command:Command):'on'|'name-only'|'off'|'user-invocable-only';description(command:Command):string;owner(command:Command):'builtin'|'plugin'|'mcp'|'user'|undefined;project(commands:readonly Command[]):{name:string;description:string;argumentHint:string;aliases?:string[];builtin?:true}[];projectOne(command:Command):ReturnType<CommandDiscovery287['project']>[number];dynamicState():DynamicSkillState287;pluginCommands:{list():{plugin:string;spec:{name:string}}[];ownerOf(name:string):string|undefined;specOf(name:string):unknown;register(plugin:string,spec:{name:string}):void;forget(plugin:string):boolean}}
export function createCore287(ports:DiscoveryPorts287):CommandDiscovery287
export function createNamespace287(ports:Record<string,unknown>):Record<'Lo'|'Ire'|'gmt'|'cUe'|'v9n'|'q1t'|'z2'|'SSe'|'ZUo'|'lUe',(...args:any[])=>any>
export function createSpelling287(ports:Record<string,unknown>):{N0(value:string):string}
export function createSanitize287(ports:Record<string,unknown>):{nbe(value:string):string}
export function createSync287(ports:Record<string,unknown>):{Eyt(value:string):string;Gjt(value:string):boolean;hF(value:string):string;HPe:string[]}
export function createCache287(ports:Record<string,unknown>):{t8<T>(map:Map<string,T>,key:string,create:()=>T):T;n8(value:string|null):string}
export function createHistory287(ports:Record<string,unknown>):{bind(get:()=>Command[]):void;state():{get:()=>Command[]}}
export function createBundledGate287(ports:Record<string,unknown>):{dbn(settings?:unknown):string;DJn(command:Command,settings:unknown):boolean}
export const commandMetadataSymbols287:readonly {symbol:string;name:string;type:string}[]

export function createSyncOwner287(ports:Record<string,unknown>):{state():{placeholders:Map<string,Command>;listedSkills:Map<string,{command?:Command;withheld?:boolean}>;reset():void}}
export function createSyncGate287(ports:Record<string,unknown>):{enabled():boolean}
export function createClaims287(ports:Record<string,unknown>):{state():{claim(name:string):boolean;has(name:string):boolean;claimIfChanged(name:string,value:unknown):boolean}}

export function createRegistrationGates287(ports:Record<string,unknown>):{JS():boolean;Uq():boolean}
export function createUnicode287(ports:Record<string,unknown>):{hD(value:string,replacement:string,options?:{keepNewlines?:boolean;keepEmojiJoiners?:boolean}):string;Hn(value:string):string}
export function createClip287(ports:Record<string,unknown>):{re(value:string,limit:number):string;Nz(value:string):string}
export function createLabels287(ports:Record<string,unknown>):{gK:string}
export function createSkillNames287(ports:{ro():DiscoveryRegistry287}):{CJn(disabled?:Set<string>):string[]}
export function createBundledList287(ports:{ro():DiscoveryRegistry287}):{FUt():Command[]}
export function createTerminalText287(ports:Record<string,unknown>):{ze(value:string,limit?:number):string;sl(value:string,limit?:number):string}
export function createPluginLabel287(ports:Record<string,unknown>):{hf(value:{name:string;source?:string;displayName?:string;manifest?:{displayName?:string}}):string}

export function createAuthQualification287(ports:{Vn():boolean;ft():boolean;mb(options:{skipRetrievingKeyFromApiKeyHelper:true}):{key:string|null;source:string}}):{IWt():boolean;c2e():boolean}
export function createLoginRegistration287(ports:{IWt():boolean;a:unknown}):{createLogin():Command}
export function createRemoteLabel287(ports:Record<string,never>):{S9:string}
export function createManagedRemote287(ports:{iO():unknown}):{N1():boolean}
export function createAnalyticsToken287(ports:Record<string,never>):{c(value:unknown):unknown}
export function createUpsell287(ports:{N1():boolean;S9:string;i:(...args:any[])=>unknown;c(value:unknown):unknown;Rc():{source:string};Gp(options:{skipRetrievingKeyFromApiKeyHelper:true}):{source:string};Ce():boolean;k(name:string,fallback:boolean):boolean;Js():boolean;c2e():boolean;ft():boolean}):{B8t:Command[]}

export function createCommandHook287(ports:Record<string,unknown>):{install():void;hook:{hooked(commands:Command[]):Promise<Command[]>;isHooked():boolean}}
