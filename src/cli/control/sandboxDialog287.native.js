// Generated from fixed official 2.1.287 raw; original function bodies unchanged.
export function createSandboxDialog287(p){
 const {Ro,O,je,er,kre,GJ}=p;
function s(n){return n.replace("Run /sandbox install, or see https://code.claude.com/docs/en/sandboxing.","See https://code.claude.com/docs/en/sandboxing.")}
async function y(){Ro();let n=O(),a=je.isSupportedPlatform(),b=je.isPlatformInEnabledList(),o=a&&b,t=o?void 0:!a?n==="wsl"?"wsl1":"platform":"excluded_platform",d=o?await je.checkDependenciesAsync():{errors:[],warnings:[]},l=je.isSandboxEnabledInSettings(),r=je.isSandboxingEnabled(),i=je.getSandboxUnavailableReason(),c=je.areSandboxSettingsLockedByPolicy(),p=c||je.areUnsandboxedCommandsForbiddenByPolicy()||je.isUnsandboxedFallbackClosedByTrustedTier(),g=je.isAutoAllowBashIfSandboxedEnabled(),w=!l?"disabled":g?"auto-allow":"regular",e=er()?.sandbox,m=je.getConfiguredNetworkAllowances(),u=je.getConfiguredFilesystemGrants();return{supported:o,...t!==void 0&&{unsupported_reason:t},locked:c,overrides_locked:p,enabled:r,enabled_in_settings:l,...i!==void 0&&{unavailable_reason:s(i)},mode:w,auto_allow_available:je.isAutoAllowSupported(),no_sandbox_allowed:!GJ(),unsandboxed_fallback:je.areUnsandboxedCommandsAllowed(),dependencies:{errors:d.errors.map(s),warnings:d.warnings.map(s)},excluded_commands:je.getExcludedCommands(),restrictions:{fs_deny_read:e?.filesystem?.denyRead??[],fs_allow_read:u.allowRead,fs_allow_write:u.allowWrite,fs_deny_write:e?.filesystem?.denyWrite??[],network_allowed_domains:e?.network?.allowedDomains??[],network_denied_domains:e?.network?.deniedDomains??[],network_managed:kre(),unix_sockets:m.allowUnixSockets??[],allow_all_unix_sockets:m.allowAllUnixSockets===!0,ignored_glob_patterns:r?je.getLinuxGlobPatternWarnings():[]}}}
 return y;
}
export function createSandboxDialogDependencyProbe287(p){
 const {O,jJ,$t,_B,wB,b9,Jt,TB}=p;
function Zm(){if(O()==="windows"&&!jJ())return{errors:["Windows sandbox is not enabled"],warnings:[]};let{checkDependenciesProbe:e}=$t(),r=e();if(r.errors.includes(_B))e.cache.clear?.();return r}
async function jee(){let e=$t();if(O()!=="windows"||!jJ()||e.checkDependenciesProbe.cache.has(void 0))return Zm();let r=wB();if(r)return r;let n=e.dependencyProbeGeneration,{rgPath:s,rgArgs:h}=b9(),g=await Jt.checkDependenciesAsync({command:s,args:h}),b=TB(g);if(n===e.dependencyProbeGeneration)e.checkDependenciesProbe.cache.set(void 0,b);return b}
 return jee;
}
