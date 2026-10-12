import type {SandboxDependencyCheck} from '@anthropic-ai/sandbox-runtime'
import type {ISandboxManager} from '../../utils/sandbox/sandbox-adapter.js'
import type {SettingsJson} from '../../utils/settings/types.js'
export interface SandboxDialog287Response extends Record<string,unknown> {
 supported:boolean;unsupported_reason?:string;locked:boolean;overrides_locked:boolean;
 enabled:boolean;enabled_in_settings:boolean;unavailable_reason?:string;
 mode:'disabled'|'auto-allow'|'regular';auto_allow_available:boolean;
 no_sandbox_allowed:boolean;unsandboxed_fallback:boolean;dependencies:SandboxDependencyCheck;
 excluded_commands:string[];
 restrictions:{fs_deny_read:string[];fs_allow_read:string[];fs_allow_write:string[];fs_deny_write:string[];
 network_allowed_domains:string[];network_denied_domains:string[];network_managed:boolean;
 unix_sockets:string[];allow_all_unix_sockets:boolean;ignored_glob_patterns:string[]};
}
export type SandboxDialogOwner287=Pick<ISandboxManager,
 'isSupportedPlatform'|'isPlatformInEnabledList'|'isSandboxEnabledInSettings'|
 'isSandboxingEnabled'|'getSandboxUnavailableReason'|'areSandboxSettingsLockedByPolicy'|
 'isAutoAllowBashIfSandboxedEnabled'|'areUnsandboxedCommandsAllowed'|'getExcludedCommands'|
 'getLinuxGlobPatternWarnings'> & {
 checkDependenciesAsync():Promise<SandboxDependencyCheck>;
 areUnsandboxedCommandsForbiddenByPolicy():boolean;
 isUnsandboxedFallbackClosedByTrustedTier():boolean;
 isAutoAllowSupported():boolean;
 getConfiguredNetworkAllowances():{allowUnixSockets?:string[];allowAllUnixSockets?:boolean};
 getConfiguredFilesystemGrants():{allowRead:string[];allowWrite:string[]};
}
export interface SandboxDialogPorts287 {
 Ro():void;O():string;je:SandboxDialogOwner287;er():SettingsJson|undefined;
 kre():boolean;GJ():boolean;
}
export interface SandboxDependencyProbe287 {
 ():SandboxDependencyCheck;
 cache:{has(key:undefined):boolean;clear?():void;set(key:undefined,value:SandboxDependencyCheck):unknown};
}
export interface SandboxDependencyPorts287 {
 O():string;jJ():boolean;
 $t():{checkDependenciesProbe:SandboxDependencyProbe287;readonly dependencyProbeGeneration?:number};
 _B:string;wB():SandboxDependencyCheck|undefined;
 b9():{rgPath:string;rgArgs?:string[]};
 Jt:{checkDependenciesAsync(config:{command:string;args?:string[]}):Promise<SandboxDependencyCheck>};
 TB(value:SandboxDependencyCheck):SandboxDependencyCheck;
}
export function createSandboxDialog287(ports:SandboxDialogPorts287):()=>Promise<SandboxDialog287Response>;
export function createSandboxDialogDependencyProbe287(ports:SandboxDependencyPorts287):()=>Promise<SandboxDependencyCheck>;
