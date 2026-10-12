// Generated from pinned 2.1.287 Win32 source declarations; only imported identifiers are ports.
var shellDescriptionNotice287="Bash tool also available for POSIX scripts \u2014 each takes its own syntax";

export function createOfficialWindowsShell287(host){
 for(const key of ['getPlatform','getOSName','getGitBashPath','getPowerShellToolSetting','getFeatureValue','getShell','getCache'])if(typeof host?.[key]!=='function')throw Error('Missing Windows shell getter binding: '+key);
 const environment={get platform(){return host.getPlatform()},get SHELL(){return host.getShell()},get CLAUDE_CODE_USE_POWERSHELL_TOOL(){return host.getPowerShellToolSetting()}};
 const getOSName=host.getOSName,getGitBashPath=host.getGitBashPath,getFeatureValue=host.getFeatureValue,getCache=host.getCache;
 function Ta(){if(getOSName()!=="windows")return!0;return getGitBashPath()!==null}
 function Yb(){let e=environment.CLAUDE_CODE_USE_POWERSHELL_TOOL;if(getOSName()!=="windows")return e===!0;if(e!==void 0)return e;if(getGitBashPath()===null)return!0;return getFeatureValue("tengu_cobalt_ridge",!1)}
 function shellDescription287(){let e=environment.SHELL||"unknown",n=e.includes("zsh")?"zsh":e.includes("bash")?"bash":e;if(environment.platform==="win32"){if(!Ta())return"PowerShell";if(Yb())return`PowerShell (primary); ${shellDescriptionNotice287}.`;return n}return n}
 function cachedShellDescription287(){let e=getCache();return e.shellDescription??=shellDescription287(),e.shellDescription}
 return {Ta,Yb,shellDescription:cachedShellDescription287};
}
