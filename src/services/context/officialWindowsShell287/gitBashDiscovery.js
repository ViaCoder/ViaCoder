// Complete pinned 2.1.287 nullable Git Bash discovery function. Native/exec work is injected.
import path from 'node:path'

export function createWindowsGitBashDiscovery287(ports){
 for(const key of ['getOverride','existsSync','findExecutable','warn'])if(typeof ports?.[key]!=='function')throw Error('Missing Windows Git Bash discovery port: '+key);
 const environment287={get CLAUDE_CODE_GIT_BASH_PATH(){return ports.getOverride()}};
 const filesystem287=()=>({existsSync:ports.existsSync});
 const pathWin32287=path.win32;
 const findExecutable287=ports.findExecutable;
 const warn287=ports.warn;
 function discoverGitBashPath287(){let{existsSync:e}=filesystem287();if(environment287.CLAUDE_CODE_GIT_BASH_PATH){let n=pathWin32287.basename(environment287.CLAUDE_CODE_GIT_BASH_PATH).toLowerCase(),o=["bash.exe","sh.exe","bash","sh"].includes(n);if(o&&e(environment287.CLAUDE_CODE_GIT_BASH_PATH))return environment287.CLAUDE_CODE_GIT_BASH_PATH;warn287(`CLAUDE_CODE_GIT_BASH_PATH "${environment287.CLAUDE_CODE_GIT_BASH_PATH}" ${o?"not found":"is not a bash/sh binary"}; falling back to auto-detection`,{level:"warn"})}let r=["C:\\Program Files\\Git\\bin\\bash.exe","C:\\Program Files (x86)\\Git\\bin\\bash.exe"];for(let n of r)if(e(n))return n;let i=findExecutable287("git");if(i){let n=pathWin32287.join(i,"..","..","bin","bash.exe");if(e(n))return n}return null}
 return discoverGitBashPath287;
}

export function createCachedWindowsGitBashPath287(cache,discover){
 if(!cache||typeof discover!=='function')throw Error('Windows Git Bash cache and discovery function are required');
 return function getGitBashPath287(){let e=cache;if(e.gitBashPath===undefined)e.gitBashPath=discover();return e.gitBashPath};
}
