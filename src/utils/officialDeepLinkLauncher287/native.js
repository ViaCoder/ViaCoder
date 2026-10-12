// Complete official 2.1.287 public declarations. Host imports only; no body rewriting.
function create_darwin_arm64(ports){
const process=ports.process;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const _=ports.json;
const t=ports.debug;
const fc=ports.which;
const a=ports.env;
const le=ports.config;
const ST=ports.trackPid;
const Ke=ports.exec;
const vao=ports.parse;
const Dlr=ports.bundleId;
const DKt=ports.knownPaths;
const MKt=ports.existingPaths;
const Vio=ports.lastFetch;
const cgo=ports.pluginPrompt;
const R=ports.realpath;
const T=ports.homedir;
const x=ports.spawn;
const C=ports.basename;
var u=[{name:"iTerm2",bundleId:"com.googlecode.iterm2",app:"iTerm"},{name:"Ghostty",bundleId:"com.mitchellh.ghostty",app:"Ghostty"},{name:"Kitty",bundleId:"net.kovidgoyal.kitty",app:"kitty"},{name:"Alacritty",bundleId:"org.alacritty",app:"Alacritty"},{name:"WezTerm",bundleId:"com.github.wez.wezterm",app:"WezTerm"},{name:"Terminal.app",bundleId:"com.apple.Terminal",app:"Terminal",termProgramAliases:["apple_terminal"]}];
var I=["ghostty","kitty","alacritty","wezterm","gnome-terminal","konsole","xfce4-terminal","mate-terminal","tilix","xterm"];
async function S(){let r=le().deepLinkTerminal;if(r){let e=u.find((i)=>i.app===r);if(e)return{name:e.name,command:e.app}}let n=a.TERM_PROGRAM;if(n){let e=n.replace(/\.app$/i,"").toLowerCase(),i=u.find((s)=>s.app.toLowerCase()===e||s.name.toLowerCase()===e||s.termProgramAliases?.includes(e));if(i)return{name:i.name,command:i.app}}for(let e of u){let{code:i,stdout:s}=await Ke("mdfind",[`kMDItemCFBundleIdentifier == "${e.bundleId}"`],{timeout:5000,useCwd:!1});if(i===0&&s.trim().length>0)return{name:e.name,command:e.app}}for(let e of u){let{code:i}=await Ke("ls",[`/Applications/${e.app}.app`],{timeout:1000,useCwd:!1});if(i===0)return{name:e.name,command:e.app}}return{name:"Terminal.app",command:"Terminal"}}
async function F(){let r=a.TERMINAL;if(r){let e=await fc(r);if(e)return{name:C(r),command:e}}let n=await fc("x-terminal-emulator");if(n)return{name:"x-terminal-emulator",command:n};for(let e of I){let i=await fc(e);if(i)return{name:e,command:i}}return null}
async function A(){let r=await fc("wt.exe");if(r)return{name:"Windows Terminal",command:r};let n=await fc("pwsh.exe");if(n)return{name:"PowerShell",command:n};let e=await fc("powershell.exe");if(e)return{name:"PowerShell",command:e};return{name:"Command Prompt",command:a.ComSpec||`${a.SystemRoot||"C:\\Windows"}\\System32\\cmd.exe`}}
async function M(){switch("darwin"){case"darwin":return S();case"linux":return F();case"win32":return A();default:return null}}
async function h(r,n){let e=await M();if(!e)return t("No terminal emulator detected",{level:"error"}),!1;t(`Launching in terminal: ${e.name} (${e.command})`);let i=["--deep-link-origin"];if(n.repo){if(i.push(`--deep-link-repo=${n.repo}`),n.lastFetchMs!==void 0)i.push(`--deep-link-last-fetch=${n.lastFetchMs}`)}if(n.query)i.push(`--prefill=${n.query}`);switch("darwin"){case"darwin":return k(e,r,i,n);case"linux":return E(e,r,i,n);case"win32":return v(e,r,n);default:return!1}}
async function k(r,n,e,i){let{cwd:s}=i;switch(r.command){case"iTerm":{let o=f(n,i),l=`tell application "iTerm"
  if running then
    create window with default profile
  else
    activate
  end if
  tell current session of current window
    write text ${w(o)}
  end tell
end tell`,{code:c}=await Ke("osascript",["-e",l],{useCwd:!1});if(c===0)return!0;break}case"Terminal":{let o=f(n,i),l=`tell application "Terminal"
  do script ${w(o)}
  activate
end tell`,{code:c}=await Ke("osascript",["-e",l],{useCwd:!1});return c===0}case"Ghostty":{let o=["-na",r.command,"--args","--window-save-state=never"];if(s)o.push(`--working-directory=${s}`);o.push("-e",n,...p(i));let{code:l}=await Ke("open",o,{useCwd:!1});if(l===0)return!0;break}case"Alacritty":{let o=["-na",r.command,"--args"];if(s)o.push("--working-directory",s);o.push("-e",n,...e);let{code:l}=await Ke("open",o,{useCwd:!1});if(l===0)return!0;break}case"kitty":{let o=["-na",r.command,"--args"];if(s)o.push("--directory",s);o.push(n,...e);let{code:l}=await Ke("open",o,{useCwd:!1});if(l===0)return!0;break}case"WezTerm":{let o=["-na",r.command,"--args","start"];if(s)o.push("--cwd",s);o.push("--",n,...e);let{code:l}=await Ke("open",o,{useCwd:!1});if(l===0)return!0;break}}return t(`Failed to launch ${r.name}, falling back to Terminal.app`),k({name:"Terminal.app",command:"Terminal"},n,e,i)}
async function E(r,n,e,i){let{cwd:s}=i,o,l;switch(r.name){case"gnome-terminal":o=s?[`--working-directory=${s}`,"--"]:["--"],o.push(n,...e);break;case"konsole":o=s?["--workdir",s,"-e"]:["-e"],o.push(n,...e);break;case"kitty":o=s?["--directory",s]:[],o.push(n,...e);break;case"wezterm":o=s?["start","--cwd",s,"--"]:["start","--"],o.push(n,...e);break;case"alacritty":o=s?["--working-directory",s,"-e"]:["-e"],o.push(n,...e);break;case"ghostty":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;case"xfce4-terminal":case"mate-terminal":o=s?[`--working-directory=${s}`,"-x"]:["-x"],o.push(n,...e);break;case"tilix":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;default:o=["-e",n,...p(i)],l=s;break}return b(r.command,o,{cwd:l})}
async function v(r,n,e){let i=[],s=p(e),o=e.cwd;switch(r.name){case"Windows Terminal":{let l=(c)=>c.replaceAll(";","\\;");if(o)i.push("-d",l(o));i.push("--",l(n),...s);break}case"PowerShell":{i.push("-NoExit","-Command",`& ${q(n)} ${s.join(" ")}`);break}default:{let l=`${g(n)} ${s.map(g).join(" ")}`;i.push("/d","/v:off","/s","/k",`"${l}"`);break}}return b(r.command,i,{windowsVerbatimArguments:r.name==="Command Prompt",cwd:e.cwd})}
async function b(r,n,e={}){let i=(s)=>new Promise((o)=>{let l=(d)=>{t(`Failed to spawn ${r}: ${d.message}`,{level:"error"}),o(!1)},c;try{c=x(r,n,{detached:!0,stdio:"ignore",windowsHide:!1,cwd:s,windowsVerbatimArguments:e.windowsVerbatimArguments})}catch(d){return l(d)}ST(c.pid),c.once("error",l),c.once("spawn",()=>{c.unref(),o(!0)})});if(await i(e.cwd))return!0;if(e.cwd)return i(void 0);return!1}
var L=/^[A-Za-z0-9 /._=-]+$/;
function p(r){let n=(i)=>Buffer.from(i,"utf8").toString("base64url"),e=["--deep-link-origin"];if(r.repo)e.push(`--deep-link-repo=${r.repo}`);if(r.lastFetchMs!==void 0)e.push(`--deep-link-last-fetch=${r.lastFetchMs}`);if(r.cwd)e.push(`--deep-link-cwd-b64=${n(r.cwd)}`);if(r.query)e.push(`--prefill-b64=${n(r.query)}`);return e}
function f(r,n){let e=p(n).join(" ");if(!L.test(e))throw Error(`Internal error: shell-safe args contain metacharacters: ${e}`);if(/^[A-Za-z0-9/._-]+$/.test(r))return`${r} ${e}`;if(/['\\!$\n]/.test(r))throw Error(`Deep-link launch unsupported: the claude binary path "${r}" contains a single quote, backslash, exclamation mark, dollar sign, or newline, which cannot be portably quoted for every login shell. Reinstall claude to a path without these characters to use deep links with iTerm2 or Terminal.app.`);return`'${r}' ${e}`}
function w(r){return`"${r.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
`,"\\n").replaceAll("\t","\\t")}"`}
function q(r){if(/[\u2018\u2019\u201A\u201B]/.test(r))throw Error("Cannot safely quote a Unicode single-quote variant (U+2018-U+201B) in a PowerShell path; install Windows Terminal (wt.exe).");return`'${r.replaceAll('"',"").replaceAll("'","''")}'`}
function g(r){return`"${r.replace(/[\n\t]/g," ").replace(/["%]/g,"").replace(/(\\+)$/,"$1$1")}"`}
async function D(r){t(`Handling deep link URI: ${r}`);let n;try{n=vao(r)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","parse_failed"),1}t(`Parsed deep link action: ${_(n)}`);let e=await R(process.execPath).catch(()=>process.execPath),i;switch(n.action){case"open":{let{cwd:o,resolvedRepo:l}=await N(n),c=l?await Vio(o):void 0;i={query:n.query,cwd:o,repo:l,lastFetchMs:c?.getTime()};break}case"install-plugin":i={cwd:T(),query:cgo({plugin:n.plugin,marketplaceSource:n.marketplace})};break}let s;try{s=await h(e,i)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","launch_error"),1}if(!s)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),m("deep_link_handle","no_terminal"),1;return y("deep_link_handle"),0}
async function N(r){if(r.cwd)return{cwd:r.cwd};if(r.repo){let n=DKt(r.repo),e=await MKt(n);if(e[0])return t(`Resolved repo ${r.repo} \u2192 ${e[0]}`),{cwd:e[0],resolvedRepo:r.repo};t(`No local clone found for repo ${r.repo}, falling back to home`)}return{cwd:T()}}
return {handle:D,detect:M,launch:h,shellArgs:p,shellCommand:f,mac:k,linux:E,windows:v,spawnDetached:b};
}
function create_darwin_x64(ports){
const process=ports.process;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const _=ports.json;
const t=ports.debug;
const fc=ports.which;
const a=ports.env;
const le=ports.config;
const Sk=ports.trackPid;
const qe=ports.exec;
const vao=ports.parse;
const Llr=ports.bundleId;
const Lqt=ports.knownPaths;
const Mqt=ports.existingPaths;
const Vio=ports.lastFetch;
const cgo=ports.pluginPrompt;
const R=ports.realpath;
const T=ports.homedir;
const x=ports.spawn;
const C=ports.basename;
var u=[{name:"iTerm2",bundleId:"com.googlecode.iterm2",app:"iTerm"},{name:"Ghostty",bundleId:"com.mitchellh.ghostty",app:"Ghostty"},{name:"Kitty",bundleId:"net.kovidgoyal.kitty",app:"kitty"},{name:"Alacritty",bundleId:"org.alacritty",app:"Alacritty"},{name:"WezTerm",bundleId:"com.github.wez.wezterm",app:"WezTerm"},{name:"Terminal.app",bundleId:"com.apple.Terminal",app:"Terminal",termProgramAliases:["apple_terminal"]}];
var I=["ghostty","kitty","alacritty","wezterm","gnome-terminal","konsole","xfce4-terminal","mate-terminal","tilix","xterm"];
async function S(){let r=le().deepLinkTerminal;if(r){let e=u.find((i)=>i.app===r);if(e)return{name:e.name,command:e.app}}let n=a.TERM_PROGRAM;if(n){let e=n.replace(/\.app$/i,"").toLowerCase(),i=u.find((s)=>s.app.toLowerCase()===e||s.name.toLowerCase()===e||s.termProgramAliases?.includes(e));if(i)return{name:i.name,command:i.app}}for(let e of u){let{code:i,stdout:s}=await qe("mdfind",[`kMDItemCFBundleIdentifier == "${e.bundleId}"`],{timeout:5000,useCwd:!1});if(i===0&&s.trim().length>0)return{name:e.name,command:e.app}}for(let e of u){let{code:i}=await qe("ls",[`/Applications/${e.app}.app`],{timeout:1000,useCwd:!1});if(i===0)return{name:e.name,command:e.app}}return{name:"Terminal.app",command:"Terminal"}}
async function F(){let r=a.TERMINAL;if(r){let e=await fc(r);if(e)return{name:C(r),command:e}}let n=await fc("x-terminal-emulator");if(n)return{name:"x-terminal-emulator",command:n};for(let e of I){let i=await fc(e);if(i)return{name:e,command:i}}return null}
async function A(){let r=await fc("wt.exe");if(r)return{name:"Windows Terminal",command:r};let n=await fc("pwsh.exe");if(n)return{name:"PowerShell",command:n};let e=await fc("powershell.exe");if(e)return{name:"PowerShell",command:e};return{name:"Command Prompt",command:a.ComSpec||`${a.SystemRoot||"C:\\Windows"}\\System32\\cmd.exe`}}
async function M(){switch("darwin"){case"darwin":return S();case"linux":return F();case"win32":return A();default:return null}}
async function h(r,n){let e=await M();if(!e)return t("No terminal emulator detected",{level:"error"}),!1;t(`Launching in terminal: ${e.name} (${e.command})`);let i=["--deep-link-origin"];if(n.repo){if(i.push(`--deep-link-repo=${n.repo}`),n.lastFetchMs!==void 0)i.push(`--deep-link-last-fetch=${n.lastFetchMs}`)}if(n.query)i.push(`--prefill=${n.query}`);switch("darwin"){case"darwin":return k(e,r,i,n);case"linux":return E(e,r,i,n);case"win32":return v(e,r,n);default:return!1}}
async function k(r,n,e,i){let{cwd:s}=i;switch(r.command){case"iTerm":{let o=f(n,i),l=`tell application "iTerm"
  if running then
    create window with default profile
  else
    activate
  end if
  tell current session of current window
    write text ${w(o)}
  end tell
end tell`,{code:c}=await qe("osascript",["-e",l],{useCwd:!1});if(c===0)return!0;break}case"Terminal":{let o=f(n,i),l=`tell application "Terminal"
  do script ${w(o)}
  activate
end tell`,{code:c}=await qe("osascript",["-e",l],{useCwd:!1});return c===0}case"Ghostty":{let o=["-na",r.command,"--args","--window-save-state=never"];if(s)o.push(`--working-directory=${s}`);o.push("-e",n,...p(i));let{code:l}=await qe("open",o,{useCwd:!1});if(l===0)return!0;break}case"Alacritty":{let o=["-na",r.command,"--args"];if(s)o.push("--working-directory",s);o.push("-e",n,...e);let{code:l}=await qe("open",o,{useCwd:!1});if(l===0)return!0;break}case"kitty":{let o=["-na",r.command,"--args"];if(s)o.push("--directory",s);o.push(n,...e);let{code:l}=await qe("open",o,{useCwd:!1});if(l===0)return!0;break}case"WezTerm":{let o=["-na",r.command,"--args","start"];if(s)o.push("--cwd",s);o.push("--",n,...e);let{code:l}=await qe("open",o,{useCwd:!1});if(l===0)return!0;break}}return t(`Failed to launch ${r.name}, falling back to Terminal.app`),k({name:"Terminal.app",command:"Terminal"},n,e,i)}
async function E(r,n,e,i){let{cwd:s}=i,o,l;switch(r.name){case"gnome-terminal":o=s?[`--working-directory=${s}`,"--"]:["--"],o.push(n,...e);break;case"konsole":o=s?["--workdir",s,"-e"]:["-e"],o.push(n,...e);break;case"kitty":o=s?["--directory",s]:[],o.push(n,...e);break;case"wezterm":o=s?["start","--cwd",s,"--"]:["start","--"],o.push(n,...e);break;case"alacritty":o=s?["--working-directory",s,"-e"]:["-e"],o.push(n,...e);break;case"ghostty":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;case"xfce4-terminal":case"mate-terminal":o=s?[`--working-directory=${s}`,"-x"]:["-x"],o.push(n,...e);break;case"tilix":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;default:o=["-e",n,...p(i)],l=s;break}return b(r.command,o,{cwd:l})}
async function v(r,n,e){let i=[],s=p(e),o=e.cwd;switch(r.name){case"Windows Terminal":{let l=(c)=>c.replaceAll(";","\\;");if(o)i.push("-d",l(o));i.push("--",l(n),...s);break}case"PowerShell":{i.push("-NoExit","-Command",`& ${q(n)} ${s.join(" ")}`);break}default:{let l=`${g(n)} ${s.map(g).join(" ")}`;i.push("/d","/v:off","/s","/k",`"${l}"`);break}}return b(r.command,i,{windowsVerbatimArguments:r.name==="Command Prompt",cwd:e.cwd})}
async function b(r,n,e={}){let i=(s)=>new Promise((o)=>{let l=(d)=>{t(`Failed to spawn ${r}: ${d.message}`,{level:"error"}),o(!1)},c;try{c=x(r,n,{detached:!0,stdio:"ignore",windowsHide:!1,cwd:s,windowsVerbatimArguments:e.windowsVerbatimArguments})}catch(d){return l(d)}Sk(c.pid),c.once("error",l),c.once("spawn",()=>{c.unref(),o(!0)})});if(await i(e.cwd))return!0;if(e.cwd)return i(void 0);return!1}
var L=/^[A-Za-z0-9 /._=-]+$/;
function p(r){let n=(i)=>Buffer.from(i,"utf8").toString("base64url"),e=["--deep-link-origin"];if(r.repo)e.push(`--deep-link-repo=${r.repo}`);if(r.lastFetchMs!==void 0)e.push(`--deep-link-last-fetch=${r.lastFetchMs}`);if(r.cwd)e.push(`--deep-link-cwd-b64=${n(r.cwd)}`);if(r.query)e.push(`--prefill-b64=${n(r.query)}`);return e}
function f(r,n){let e=p(n).join(" ");if(!L.test(e))throw Error(`Internal error: shell-safe args contain metacharacters: ${e}`);if(/^[A-Za-z0-9/._-]+$/.test(r))return`${r} ${e}`;if(/['\\!$\n]/.test(r))throw Error(`Deep-link launch unsupported: the claude binary path "${r}" contains a single quote, backslash, exclamation mark, dollar sign, or newline, which cannot be portably quoted for every login shell. Reinstall claude to a path without these characters to use deep links with iTerm2 or Terminal.app.`);return`'${r}' ${e}`}
function w(r){return`"${r.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
`,"\\n").replaceAll("\t","\\t")}"`}
function q(r){if(/[\u2018\u2019\u201A\u201B]/.test(r))throw Error("Cannot safely quote a Unicode single-quote variant (U+2018-U+201B) in a PowerShell path; install Windows Terminal (wt.exe).");return`'${r.replaceAll('"',"").replaceAll("'","''")}'`}
function g(r){return`"${r.replace(/[\n\t]/g," ").replace(/["%]/g,"").replace(/(\\+)$/,"$1$1")}"`}
async function D(r){t(`Handling deep link URI: ${r}`);let n;try{n=vao(r)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","parse_failed"),1}t(`Parsed deep link action: ${_(n)}`);let e=await R(process.execPath).catch(()=>process.execPath),i;switch(n.action){case"open":{let{cwd:o,resolvedRepo:l}=await N(n),c=l?await Vio(o):void 0;i={query:n.query,cwd:o,repo:l,lastFetchMs:c?.getTime()};break}case"install-plugin":i={cwd:T(),query:cgo({plugin:n.plugin,marketplaceSource:n.marketplace})};break}let s;try{s=await h(e,i)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","launch_error"),1}if(!s)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),m("deep_link_handle","no_terminal"),1;return y("deep_link_handle"),0}
async function N(r){if(r.cwd)return{cwd:r.cwd};if(r.repo){let n=Lqt(r.repo),e=await Mqt(n);if(e[0])return t(`Resolved repo ${r.repo} \u2192 ${e[0]}`),{cwd:e[0],resolvedRepo:r.repo};t(`No local clone found for repo ${r.repo}, falling back to home`)}return{cwd:T()}}
return {handle:D,detect:M,launch:h,shellArgs:p,shellCommand:f,mac:k,linux:E,windows:v,spawnDetached:b};
}
function create_linux_arm64(ports){
const process=ports.process;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const _=ports.json;
const t=ports.debug;
const uc=ports.which;
const a=ports.env;
const le=ports.config;
const yR=ports.trackPid;
const Je=ports.exec;
const Vio=ports.parse;
const y3t=ports.knownPaths;
const _3t=ports.existingPaths;
const yio=ports.lastFetch;
const Dmo=ports.pluginPrompt;
const R=ports.realpath;
const T=ports.homedir;
const x=ports.spawn;
const C=ports.basename;
var u=[{name:"iTerm2",bundleId:"com.googlecode.iterm2",app:"iTerm"},{name:"Ghostty",bundleId:"com.mitchellh.ghostty",app:"Ghostty"},{name:"Kitty",bundleId:"net.kovidgoyal.kitty",app:"kitty"},{name:"Alacritty",bundleId:"org.alacritty",app:"Alacritty"},{name:"WezTerm",bundleId:"com.github.wez.wezterm",app:"WezTerm"},{name:"Terminal.app",bundleId:"com.apple.Terminal",app:"Terminal",termProgramAliases:["apple_terminal"]}];
var I=["ghostty","kitty","alacritty","wezterm","gnome-terminal","konsole","xfce4-terminal","mate-terminal","tilix","xterm"];
async function S(){let r=le().deepLinkTerminal;if(r){let e=u.find((i)=>i.app===r);if(e)return{name:e.name,command:e.app}}let n=a.TERM_PROGRAM;if(n){let e=n.replace(/\.app$/i,"").toLowerCase(),i=u.find((s)=>s.app.toLowerCase()===e||s.name.toLowerCase()===e||s.termProgramAliases?.includes(e));if(i)return{name:i.name,command:i.app}}for(let e of u){let{code:i,stdout:s}=await Je("mdfind",[`kMDItemCFBundleIdentifier == "${e.bundleId}"`],{timeout:5000,useCwd:!1});if(i===0&&s.trim().length>0)return{name:e.name,command:e.app}}for(let e of u){let{code:i}=await Je("ls",[`/Applications/${e.app}.app`],{timeout:1000,useCwd:!1});if(i===0)return{name:e.name,command:e.app}}return{name:"Terminal.app",command:"Terminal"}}
async function F(){let r=a.TERMINAL;if(r){let e=await uc(r);if(e)return{name:C(r),command:e}}let n=await uc("x-terminal-emulator");if(n)return{name:"x-terminal-emulator",command:n};for(let e of I){let i=await uc(e);if(i)return{name:e,command:i}}return null}
async function A(){let r=await uc("wt.exe");if(r)return{name:"Windows Terminal",command:r};let n=await uc("pwsh.exe");if(n)return{name:"PowerShell",command:n};let e=await uc("powershell.exe");if(e)return{name:"PowerShell",command:e};return{name:"Command Prompt",command:a.ComSpec||`${a.SystemRoot||"C:\\Windows"}\\System32\\cmd.exe`}}
async function M(){switch("linux"){case"darwin":return S();case"linux":return F();case"win32":return A();default:return null}}
async function h(r,n){let e=await M();if(!e)return t("No terminal emulator detected",{level:"error"}),!1;t(`Launching in terminal: ${e.name} (${e.command})`);let i=["--deep-link-origin"];if(n.repo){if(i.push(`--deep-link-repo=${n.repo}`),n.lastFetchMs!==void 0)i.push(`--deep-link-last-fetch=${n.lastFetchMs}`)}if(n.query)i.push(`--prefill=${n.query}`);switch("linux"){case"darwin":return k(e,r,i,n);case"linux":return E(e,r,i,n);case"win32":return v(e,r,n);default:return!1}}
async function k(r,n,e,i){let{cwd:s}=i;switch(r.command){case"iTerm":{let o=f(n,i),l=`tell application "iTerm"
  if running then
    create window with default profile
  else
    activate
  end if
  tell current session of current window
    write text ${w(o)}
  end tell
end tell`,{code:c}=await Je("osascript",["-e",l],{useCwd:!1});if(c===0)return!0;break}case"Terminal":{let o=f(n,i),l=`tell application "Terminal"
  do script ${w(o)}
  activate
end tell`,{code:c}=await Je("osascript",["-e",l],{useCwd:!1});return c===0}case"Ghostty":{let o=["-na",r.command,"--args","--window-save-state=never"];if(s)o.push(`--working-directory=${s}`);o.push("-e",n,...p(i));let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}case"Alacritty":{let o=["-na",r.command,"--args"];if(s)o.push("--working-directory",s);o.push("-e",n,...e);let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}case"kitty":{let o=["-na",r.command,"--args"];if(s)o.push("--directory",s);o.push(n,...e);let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}case"WezTerm":{let o=["-na",r.command,"--args","start"];if(s)o.push("--cwd",s);o.push("--",n,...e);let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}}return t(`Failed to launch ${r.name}, falling back to Terminal.app`),k({name:"Terminal.app",command:"Terminal"},n,e,i)}
async function E(r,n,e,i){let{cwd:s}=i,o,l;switch(r.name){case"gnome-terminal":o=s?[`--working-directory=${s}`,"--"]:["--"],o.push(n,...e);break;case"konsole":o=s?["--workdir",s,"-e"]:["-e"],o.push(n,...e);break;case"kitty":o=s?["--directory",s]:[],o.push(n,...e);break;case"wezterm":o=s?["start","--cwd",s,"--"]:["start","--"],o.push(n,...e);break;case"alacritty":o=s?["--working-directory",s,"-e"]:["-e"],o.push(n,...e);break;case"ghostty":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;case"xfce4-terminal":case"mate-terminal":o=s?[`--working-directory=${s}`,"-x"]:["-x"],o.push(n,...e);break;case"tilix":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;default:o=["-e",n,...p(i)],l=s;break}return b(r.command,o,{cwd:l})}
async function v(r,n,e){let i=[],s=p(e),o=e.cwd;switch(r.name){case"Windows Terminal":{let l=(c)=>c.replaceAll(";","\\;");if(o)i.push("-d",l(o));i.push("--",l(n),...s);break}case"PowerShell":{i.push("-NoExit","-Command",`& ${q(n)} ${s.join(" ")}`);break}default:{let l=`${g(n)} ${s.map(g).join(" ")}`;i.push("/d","/v:off","/s","/k",`"${l}"`);break}}return b(r.command,i,{windowsVerbatimArguments:r.name==="Command Prompt",cwd:e.cwd})}
async function b(r,n,e={}){let i=(s)=>new Promise((o)=>{let l=(d)=>{t(`Failed to spawn ${r}: ${d.message}`,{level:"error"}),o(!1)},c;try{c=x(r,n,{detached:!0,stdio:"ignore",windowsHide:!1,cwd:s,windowsVerbatimArguments:e.windowsVerbatimArguments})}catch(d){return l(d)}yR(c.pid),c.once("error",l),c.once("spawn",()=>{c.unref(),o(!0)})});if(await i(e.cwd))return!0;if(e.cwd)return i(void 0);return!1}
var L=/^[A-Za-z0-9 /._=-]+$/;
function p(r){let n=(i)=>Buffer.from(i,"utf8").toString("base64url"),e=["--deep-link-origin"];if(r.repo)e.push(`--deep-link-repo=${r.repo}`);if(r.lastFetchMs!==void 0)e.push(`--deep-link-last-fetch=${r.lastFetchMs}`);if(r.cwd)e.push(`--deep-link-cwd-b64=${n(r.cwd)}`);if(r.query)e.push(`--prefill-b64=${n(r.query)}`);return e}
function f(r,n){let e=p(n).join(" ");if(!L.test(e))throw Error(`Internal error: shell-safe args contain metacharacters: ${e}`);if(/^[A-Za-z0-9/._-]+$/.test(r))return`${r} ${e}`;if(/['\\!$\n]/.test(r))throw Error(`Deep-link launch unsupported: the claude binary path "${r}" contains a single quote, backslash, exclamation mark, dollar sign, or newline, which cannot be portably quoted for every login shell. Reinstall claude to a path without these characters to use deep links with iTerm2 or Terminal.app.`);return`'${r}' ${e}`}
function w(r){return`"${r.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
`,"\\n").replaceAll("\t","\\t")}"`}
function q(r){if(/[\u2018\u2019\u201A\u201B]/.test(r))throw Error("Cannot safely quote a Unicode single-quote variant (U+2018-U+201B) in a PowerShell path; install Windows Terminal (wt.exe).");return`'${r.replaceAll('"',"").replaceAll("'","''")}'`}
function g(r){return`"${r.replace(/[\n\t]/g," ").replace(/["%]/g,"").replace(/(\\+)$/,"$1$1")}"`}
async function ae(r){t(`Handling deep link URI: ${r}`);let n;try{n=Vio(r)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","parse_failed"),1}t(`Parsed deep link action: ${_(n)}`);let e=await R(process.execPath).catch(()=>process.execPath),i;switch(n.action){case"open":{let{cwd:o,resolvedRepo:l}=await D(n),c=l?await yio(o):void 0;i={query:n.query,cwd:o,repo:l,lastFetchMs:c?.getTime()};break}case"install-plugin":i={cwd:T(),query:Dmo({plugin:n.plugin,marketplaceSource:n.marketplace})};break}let s;try{s=await h(e,i)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","launch_error"),1}if(!s)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),m("deep_link_handle","no_terminal"),1;return y("deep_link_handle"),0}
async function D(r){if(r.cwd)return{cwd:r.cwd};if(r.repo){let n=y3t(r.repo),e=await _3t(n);if(e[0])return t(`Resolved repo ${r.repo} \u2192 ${e[0]}`),{cwd:e[0],resolvedRepo:r.repo};t(`No local clone found for repo ${r.repo}, falling back to home`)}return{cwd:T()}}
return {handle:ae,detect:M,launch:h,shellArgs:p,shellCommand:f,mac:k,linux:E,windows:v,spawnDetached:b};
}
function create_linux_x64(ports){
const process=ports.process;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const _=ports.json;
const t=ports.debug;
const uc=ports.which;
const a=ports.env;
const le=ports.config;
const yA=ports.trackPid;
const Je=ports.exec;
const Kio=ports.parse;
const y3t=ports.knownPaths;
const _3t=ports.existingPaths;
const yio=ports.lastFetch;
const Hmo=ports.pluginPrompt;
const R=ports.realpath;
const T=ports.homedir;
const x=ports.spawn;
const C=ports.basename;
var u=[{name:"iTerm2",bundleId:"com.googlecode.iterm2",app:"iTerm"},{name:"Ghostty",bundleId:"com.mitchellh.ghostty",app:"Ghostty"},{name:"Kitty",bundleId:"net.kovidgoyal.kitty",app:"kitty"},{name:"Alacritty",bundleId:"org.alacritty",app:"Alacritty"},{name:"WezTerm",bundleId:"com.github.wez.wezterm",app:"WezTerm"},{name:"Terminal.app",bundleId:"com.apple.Terminal",app:"Terminal",termProgramAliases:["apple_terminal"]}];
var I=["ghostty","kitty","alacritty","wezterm","gnome-terminal","konsole","xfce4-terminal","mate-terminal","tilix","xterm"];
async function S(){let r=le().deepLinkTerminal;if(r){let e=u.find((i)=>i.app===r);if(e)return{name:e.name,command:e.app}}let n=a.TERM_PROGRAM;if(n){let e=n.replace(/\.app$/i,"").toLowerCase(),i=u.find((s)=>s.app.toLowerCase()===e||s.name.toLowerCase()===e||s.termProgramAliases?.includes(e));if(i)return{name:i.name,command:i.app}}for(let e of u){let{code:i,stdout:s}=await Je("mdfind",[`kMDItemCFBundleIdentifier == "${e.bundleId}"`],{timeout:5000,useCwd:!1});if(i===0&&s.trim().length>0)return{name:e.name,command:e.app}}for(let e of u){let{code:i}=await Je("ls",[`/Applications/${e.app}.app`],{timeout:1000,useCwd:!1});if(i===0)return{name:e.name,command:e.app}}return{name:"Terminal.app",command:"Terminal"}}
async function F(){let r=a.TERMINAL;if(r){let e=await uc(r);if(e)return{name:C(r),command:e}}let n=await uc("x-terminal-emulator");if(n)return{name:"x-terminal-emulator",command:n};for(let e of I){let i=await uc(e);if(i)return{name:e,command:i}}return null}
async function A(){let r=await uc("wt.exe");if(r)return{name:"Windows Terminal",command:r};let n=await uc("pwsh.exe");if(n)return{name:"PowerShell",command:n};let e=await uc("powershell.exe");if(e)return{name:"PowerShell",command:e};return{name:"Command Prompt",command:a.ComSpec||`${a.SystemRoot||"C:\\Windows"}\\System32\\cmd.exe`}}
async function M(){switch("linux"){case"darwin":return S();case"linux":return F();case"win32":return A();default:return null}}
async function h(r,n){let e=await M();if(!e)return t("No terminal emulator detected",{level:"error"}),!1;t(`Launching in terminal: ${e.name} (${e.command})`);let i=["--deep-link-origin"];if(n.repo){if(i.push(`--deep-link-repo=${n.repo}`),n.lastFetchMs!==void 0)i.push(`--deep-link-last-fetch=${n.lastFetchMs}`)}if(n.query)i.push(`--prefill=${n.query}`);switch("linux"){case"darwin":return k(e,r,i,n);case"linux":return E(e,r,i,n);case"win32":return v(e,r,n);default:return!1}}
async function k(r,n,e,i){let{cwd:s}=i;switch(r.command){case"iTerm":{let o=f(n,i),l=`tell application "iTerm"
  if running then
    create window with default profile
  else
    activate
  end if
  tell current session of current window
    write text ${w(o)}
  end tell
end tell`,{code:c}=await Je("osascript",["-e",l],{useCwd:!1});if(c===0)return!0;break}case"Terminal":{let o=f(n,i),l=`tell application "Terminal"
  do script ${w(o)}
  activate
end tell`,{code:c}=await Je("osascript",["-e",l],{useCwd:!1});return c===0}case"Ghostty":{let o=["-na",r.command,"--args","--window-save-state=never"];if(s)o.push(`--working-directory=${s}`);o.push("-e",n,...p(i));let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}case"Alacritty":{let o=["-na",r.command,"--args"];if(s)o.push("--working-directory",s);o.push("-e",n,...e);let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}case"kitty":{let o=["-na",r.command,"--args"];if(s)o.push("--directory",s);o.push(n,...e);let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}case"WezTerm":{let o=["-na",r.command,"--args","start"];if(s)o.push("--cwd",s);o.push("--",n,...e);let{code:l}=await Je("open",o,{useCwd:!1});if(l===0)return!0;break}}return t(`Failed to launch ${r.name}, falling back to Terminal.app`),k({name:"Terminal.app",command:"Terminal"},n,e,i)}
async function E(r,n,e,i){let{cwd:s}=i,o,l;switch(r.name){case"gnome-terminal":o=s?[`--working-directory=${s}`,"--"]:["--"],o.push(n,...e);break;case"konsole":o=s?["--workdir",s,"-e"]:["-e"],o.push(n,...e);break;case"kitty":o=s?["--directory",s]:[],o.push(n,...e);break;case"wezterm":o=s?["start","--cwd",s,"--"]:["start","--"],o.push(n,...e);break;case"alacritty":o=s?["--working-directory",s,"-e"]:["-e"],o.push(n,...e);break;case"ghostty":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;case"xfce4-terminal":case"mate-terminal":o=s?[`--working-directory=${s}`,"-x"]:["-x"],o.push(n,...e);break;case"tilix":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;default:o=["-e",n,...p(i)],l=s;break}return b(r.command,o,{cwd:l})}
async function v(r,n,e){let i=[],s=p(e),o=e.cwd;switch(r.name){case"Windows Terminal":{let l=(c)=>c.replaceAll(";","\\;");if(o)i.push("-d",l(o));i.push("--",l(n),...s);break}case"PowerShell":{i.push("-NoExit","-Command",`& ${q(n)} ${s.join(" ")}`);break}default:{let l=`${g(n)} ${s.map(g).join(" ")}`;i.push("/d","/v:off","/s","/k",`"${l}"`);break}}return b(r.command,i,{windowsVerbatimArguments:r.name==="Command Prompt",cwd:e.cwd})}
async function b(r,n,e={}){let i=(s)=>new Promise((o)=>{let l=(d)=>{t(`Failed to spawn ${r}: ${d.message}`,{level:"error"}),o(!1)},c;try{c=x(r,n,{detached:!0,stdio:"ignore",windowsHide:!1,cwd:s,windowsVerbatimArguments:e.windowsVerbatimArguments})}catch(d){return l(d)}yA(c.pid),c.once("error",l),c.once("spawn",()=>{c.unref(),o(!0)})});if(await i(e.cwd))return!0;if(e.cwd)return i(void 0);return!1}
var L=/^[A-Za-z0-9 /._=-]+$/;
function p(r){let n=(i)=>Buffer.from(i,"utf8").toString("base64url"),e=["--deep-link-origin"];if(r.repo)e.push(`--deep-link-repo=${r.repo}`);if(r.lastFetchMs!==void 0)e.push(`--deep-link-last-fetch=${r.lastFetchMs}`);if(r.cwd)e.push(`--deep-link-cwd-b64=${n(r.cwd)}`);if(r.query)e.push(`--prefill-b64=${n(r.query)}`);return e}
function f(r,n){let e=p(n).join(" ");if(!L.test(e))throw Error(`Internal error: shell-safe args contain metacharacters: ${e}`);if(/^[A-Za-z0-9/._-]+$/.test(r))return`${r} ${e}`;if(/['\\!$\n]/.test(r))throw Error(`Deep-link launch unsupported: the claude binary path "${r}" contains a single quote, backslash, exclamation mark, dollar sign, or newline, which cannot be portably quoted for every login shell. Reinstall claude to a path without these characters to use deep links with iTerm2 or Terminal.app.`);return`'${r}' ${e}`}
function w(r){return`"${r.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
`,"\\n").replaceAll("\t","\\t")}"`}
function q(r){if(/[\u2018\u2019\u201A\u201B]/.test(r))throw Error("Cannot safely quote a Unicode single-quote variant (U+2018-U+201B) in a PowerShell path; install Windows Terminal (wt.exe).");return`'${r.replaceAll('"',"").replaceAll("'","''")}'`}
function g(r){return`"${r.replace(/[\n\t]/g," ").replace(/["%]/g,"").replace(/(\\+)$/,"$1$1")}"`}
async function ae(r){t(`Handling deep link URI: ${r}`);let n;try{n=Kio(r)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","parse_failed"),1}t(`Parsed deep link action: ${_(n)}`);let e=await R(process.execPath).catch(()=>process.execPath),i;switch(n.action){case"open":{let{cwd:o,resolvedRepo:l}=await D(n),c=l?await yio(o):void 0;i={query:n.query,cwd:o,repo:l,lastFetchMs:c?.getTime()};break}case"install-plugin":i={cwd:T(),query:Hmo({plugin:n.plugin,marketplaceSource:n.marketplace})};break}let s;try{s=await h(e,i)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","launch_error"),1}if(!s)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),m("deep_link_handle","no_terminal"),1;return y("deep_link_handle"),0}
async function D(r){if(r.cwd)return{cwd:r.cwd};if(r.repo){let n=y3t(r.repo),e=await _3t(n);if(e[0])return t(`Resolved repo ${r.repo} \u2192 ${e[0]}`),{cwd:e[0],resolvedRepo:r.repo};t(`No local clone found for repo ${r.repo}, falling back to home`)}return{cwd:T()}}
return {handle:ae,detect:M,launch:h,shellArgs:p,shellCommand:f,mac:k,linux:E,windows:v,spawnDetached:b};
}
function create_win32_arm64(ports){
const process=ports.process;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const _=ports.json;
const t=ports.debug;
const pc=ports.which;
const a=ports.env;
const le=ports.config;
const bC=ports.trackPid;
const tt=ports.exec;
const rao=ports.parse;
const k6t=ports.knownPaths;
const E6t=ports.existingPaths;
const Sio=ports.lastFetch;
const Bmo=ports.pluginPrompt;
const R=ports.realpath;
const T=ports.homedir;
const x=ports.spawn;
const C=ports.basename;
var u=[{name:"iTerm2",bundleId:"com.googlecode.iterm2",app:"iTerm"},{name:"Ghostty",bundleId:"com.mitchellh.ghostty",app:"Ghostty"},{name:"Kitty",bundleId:"net.kovidgoyal.kitty",app:"kitty"},{name:"Alacritty",bundleId:"org.alacritty",app:"Alacritty"},{name:"WezTerm",bundleId:"com.github.wez.wezterm",app:"WezTerm"},{name:"Terminal.app",bundleId:"com.apple.Terminal",app:"Terminal",termProgramAliases:["apple_terminal"]}];
var I=["ghostty","kitty","alacritty","wezterm","gnome-terminal","konsole","xfce4-terminal","mate-terminal","tilix","xterm"];
async function S(){let r=le().deepLinkTerminal;if(r){let e=u.find((i)=>i.app===r);if(e)return{name:e.name,command:e.app}}let n=a.TERM_PROGRAM;if(n){let e=n.replace(/\.app$/i,"").toLowerCase(),i=u.find((s)=>s.app.toLowerCase()===e||s.name.toLowerCase()===e||s.termProgramAliases?.includes(e));if(i)return{name:i.name,command:i.app}}for(let e of u){let{code:i,stdout:s}=await tt("mdfind",[`kMDItemCFBundleIdentifier == "${e.bundleId}"`],{timeout:5000,useCwd:!1});if(i===0&&s.trim().length>0)return{name:e.name,command:e.app}}for(let e of u){let{code:i}=await tt("ls",[`/Applications/${e.app}.app`],{timeout:1000,useCwd:!1});if(i===0)return{name:e.name,command:e.app}}return{name:"Terminal.app",command:"Terminal"}}
async function F(){let r=a.TERMINAL;if(r){let e=await pc(r);if(e)return{name:C(r),command:e}}let n=await pc("x-terminal-emulator");if(n)return{name:"x-terminal-emulator",command:n};for(let e of I){let i=await pc(e);if(i)return{name:e,command:i}}return null}
async function A(){let r=await pc("wt.exe");if(r)return{name:"Windows Terminal",command:r};let n=await pc("pwsh.exe");if(n)return{name:"PowerShell",command:n};let e=await pc("powershell.exe");if(e)return{name:"PowerShell",command:e};return{name:"Command Prompt",command:a.ComSpec||`${a.SystemRoot||"C:\\Windows"}\\System32\\cmd.exe`}}
async function M(){switch("win32"){case"darwin":return S();case"linux":return F();case"win32":return A();default:return null}}
async function h(r,n){let e=await M();if(!e)return t("No terminal emulator detected",{level:"error"}),!1;t(`Launching in terminal: ${e.name} (${e.command})`);let i=["--deep-link-origin"];if(n.repo){if(i.push(`--deep-link-repo=${n.repo}`),n.lastFetchMs!==void 0)i.push(`--deep-link-last-fetch=${n.lastFetchMs}`)}if(n.query)i.push(`--prefill=${n.query}`);switch("win32"){case"darwin":return k(e,r,i,n);case"linux":return E(e,r,i,n);case"win32":return v(e,r,n);default:return!1}}
async function k(r,n,e,i){let{cwd:s}=i;switch(r.command){case"iTerm":{let o=f(n,i),l=`tell application "iTerm"
  if running then
    create window with default profile
  else
    activate
  end if
  tell current session of current window
    write text ${w(o)}
  end tell
end tell`,{code:c}=await tt("osascript",["-e",l],{useCwd:!1});if(c===0)return!0;break}case"Terminal":{let o=f(n,i),l=`tell application "Terminal"
  do script ${w(o)}
  activate
end tell`,{code:c}=await tt("osascript",["-e",l],{useCwd:!1});return c===0}case"Ghostty":{let o=["-na",r.command,"--args","--window-save-state=never"];if(s)o.push(`--working-directory=${s}`);o.push("-e",n,...p(i));let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}case"Alacritty":{let o=["-na",r.command,"--args"];if(s)o.push("--working-directory",s);o.push("-e",n,...e);let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}case"kitty":{let o=["-na",r.command,"--args"];if(s)o.push("--directory",s);o.push(n,...e);let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}case"WezTerm":{let o=["-na",r.command,"--args","start"];if(s)o.push("--cwd",s);o.push("--",n,...e);let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}}return t(`Failed to launch ${r.name}, falling back to Terminal.app`),k({name:"Terminal.app",command:"Terminal"},n,e,i)}
async function E(r,n,e,i){let{cwd:s}=i,o,l;switch(r.name){case"gnome-terminal":o=s?[`--working-directory=${s}`,"--"]:["--"],o.push(n,...e);break;case"konsole":o=s?["--workdir",s,"-e"]:["-e"],o.push(n,...e);break;case"kitty":o=s?["--directory",s]:[],o.push(n,...e);break;case"wezterm":o=s?["start","--cwd",s,"--"]:["start","--"],o.push(n,...e);break;case"alacritty":o=s?["--working-directory",s,"-e"]:["-e"],o.push(n,...e);break;case"ghostty":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;case"xfce4-terminal":case"mate-terminal":o=s?[`--working-directory=${s}`,"-x"]:["-x"],o.push(n,...e);break;case"tilix":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;default:o=["-e",n,...p(i)],l=s;break}return b(r.command,o,{cwd:l})}
async function v(r,n,e){let i=[],s=p(e),o=e.cwd;switch(r.name){case"Windows Terminal":{let l=(c)=>c.replaceAll(";","\\;");if(o)i.push("-d",l(o));i.push("--",l(n),...s);break}case"PowerShell":{i.push("-NoExit","-Command",`& ${q(n)} ${s.join(" ")}`);break}default:{let l=`${g(n)} ${s.map(g).join(" ")}`;i.push("/d","/v:off","/s","/k",`"${l}"`);break}}return b(r.command,i,{windowsVerbatimArguments:r.name==="Command Prompt",cwd:e.cwd})}
async function b(r,n,e={}){let i=(s)=>new Promise((o)=>{let l=(d)=>{t(`Failed to spawn ${r}: ${d.message}`,{level:"error"}),o(!1)},c;try{c=x(r,n,{detached:!0,stdio:"ignore",windowsHide:!1,cwd:s,windowsVerbatimArguments:e.windowsVerbatimArguments})}catch(d){return l(d)}bC(c.pid),c.once("error",l),c.once("spawn",()=>{c.unref(),o(!0)})});if(await i(e.cwd))return!0;if(e.cwd)return i(void 0);return!1}
var L=/^[A-Za-z0-9 /._=-]+$/;
function p(r){let n=(i)=>Buffer.from(i,"utf8").toString("base64url"),e=["--deep-link-origin"];if(r.repo)e.push(`--deep-link-repo=${r.repo}`);if(r.lastFetchMs!==void 0)e.push(`--deep-link-last-fetch=${r.lastFetchMs}`);if(r.cwd)e.push(`--deep-link-cwd-b64=${n(r.cwd)}`);if(r.query)e.push(`--prefill-b64=${n(r.query)}`);return e}
function f(r,n){let e=p(n).join(" ");if(!L.test(e))throw Error(`Internal error: shell-safe args contain metacharacters: ${e}`);if(/^[A-Za-z0-9/._-]+$/.test(r))return`${r} ${e}`;if(/['\\!$\n]/.test(r))throw Error(`Deep-link launch unsupported: the claude binary path "${r}" contains a single quote, backslash, exclamation mark, dollar sign, or newline, which cannot be portably quoted for every login shell. Reinstall claude to a path without these characters to use deep links with iTerm2 or Terminal.app.`);return`'${r}' ${e}`}
function w(r){return`"${r.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
`,"\\n").replaceAll("\t","\\t")}"`}
function q(r){if(/[\u2018\u2019\u201A\u201B]/.test(r))throw Error("Cannot safely quote a Unicode single-quote variant (U+2018-U+201B) in a PowerShell path; install Windows Terminal (wt.exe).");return`'${r.replaceAll('"',"").replaceAll("'","''")}'`}
function g(r){return`"${r.replace(/[\n\t]/g," ").replace(/["%]/g,"").replace(/(\\+)$/,"$1$1")}"`}
async function ae(r){t(`Handling deep link URI: ${r}`);let n;try{n=rao(r)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","parse_failed"),1}t(`Parsed deep link action: ${_(n)}`);let e=await R(process.execPath).catch(()=>process.execPath),i;switch(n.action){case"open":{let{cwd:o,resolvedRepo:l}=await D(n),c=l?await Sio(o):void 0;i={query:n.query,cwd:o,repo:l,lastFetchMs:c?.getTime()};break}case"install-plugin":i={cwd:T(),query:Bmo({plugin:n.plugin,marketplaceSource:n.marketplace})};break}let s;try{s=await h(e,i)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","launch_error"),1}if(!s)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),m("deep_link_handle","no_terminal"),1;return y("deep_link_handle"),0}
async function D(r){if(r.cwd)return{cwd:r.cwd};if(r.repo){let n=k6t(r.repo),e=await E6t(n);if(e[0])return t(`Resolved repo ${r.repo} \u2192 ${e[0]}`),{cwd:e[0],resolvedRepo:r.repo};t(`No local clone found for repo ${r.repo}, falling back to home`)}return{cwd:T()}}
return {handle:ae,detect:M,launch:h,shellArgs:p,shellCommand:f,mac:k,linux:E,windows:v,spawnDetached:b};
}
function create_win32_x64(ports){
const process=ports.process;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const _=ports.json;
const t=ports.debug;
const pc=ports.which;
const a=ports.env;
const le=ports.config;
const bC=ports.trackPid;
const tt=ports.exec;
const rao=ports.parse;
const E3t=ports.knownPaths;
const k3t=ports.existingPaths;
const Sio=ports.lastFetch;
const Umo=ports.pluginPrompt;
const R=ports.realpath;
const T=ports.homedir;
const x=ports.spawn;
const C=ports.basename;
var u=[{name:"iTerm2",bundleId:"com.googlecode.iterm2",app:"iTerm"},{name:"Ghostty",bundleId:"com.mitchellh.ghostty",app:"Ghostty"},{name:"Kitty",bundleId:"net.kovidgoyal.kitty",app:"kitty"},{name:"Alacritty",bundleId:"org.alacritty",app:"Alacritty"},{name:"WezTerm",bundleId:"com.github.wez.wezterm",app:"WezTerm"},{name:"Terminal.app",bundleId:"com.apple.Terminal",app:"Terminal",termProgramAliases:["apple_terminal"]}];
var I=["ghostty","kitty","alacritty","wezterm","gnome-terminal","konsole","xfce4-terminal","mate-terminal","tilix","xterm"];
async function S(){let r=le().deepLinkTerminal;if(r){let e=u.find((i)=>i.app===r);if(e)return{name:e.name,command:e.app}}let n=a.TERM_PROGRAM;if(n){let e=n.replace(/\.app$/i,"").toLowerCase(),i=u.find((s)=>s.app.toLowerCase()===e||s.name.toLowerCase()===e||s.termProgramAliases?.includes(e));if(i)return{name:i.name,command:i.app}}for(let e of u){let{code:i,stdout:s}=await tt("mdfind",[`kMDItemCFBundleIdentifier == "${e.bundleId}"`],{timeout:5000,useCwd:!1});if(i===0&&s.trim().length>0)return{name:e.name,command:e.app}}for(let e of u){let{code:i}=await tt("ls",[`/Applications/${e.app}.app`],{timeout:1000,useCwd:!1});if(i===0)return{name:e.name,command:e.app}}return{name:"Terminal.app",command:"Terminal"}}
async function F(){let r=a.TERMINAL;if(r){let e=await pc(r);if(e)return{name:C(r),command:e}}let n=await pc("x-terminal-emulator");if(n)return{name:"x-terminal-emulator",command:n};for(let e of I){let i=await pc(e);if(i)return{name:e,command:i}}return null}
async function A(){let r=await pc("wt.exe");if(r)return{name:"Windows Terminal",command:r};let n=await pc("pwsh.exe");if(n)return{name:"PowerShell",command:n};let e=await pc("powershell.exe");if(e)return{name:"PowerShell",command:e};return{name:"Command Prompt",command:a.ComSpec||`${a.SystemRoot||"C:\\Windows"}\\System32\\cmd.exe`}}
async function M(){switch("win32"){case"darwin":return S();case"linux":return F();case"win32":return A();default:return null}}
async function h(r,n){let e=await M();if(!e)return t("No terminal emulator detected",{level:"error"}),!1;t(`Launching in terminal: ${e.name} (${e.command})`);let i=["--deep-link-origin"];if(n.repo){if(i.push(`--deep-link-repo=${n.repo}`),n.lastFetchMs!==void 0)i.push(`--deep-link-last-fetch=${n.lastFetchMs}`)}if(n.query)i.push(`--prefill=${n.query}`);switch("win32"){case"darwin":return k(e,r,i,n);case"linux":return E(e,r,i,n);case"win32":return v(e,r,n);default:return!1}}
async function k(r,n,e,i){let{cwd:s}=i;switch(r.command){case"iTerm":{let o=f(n,i),l=`tell application "iTerm"
  if running then
    create window with default profile
  else
    activate
  end if
  tell current session of current window
    write text ${w(o)}
  end tell
end tell`,{code:c}=await tt("osascript",["-e",l],{useCwd:!1});if(c===0)return!0;break}case"Terminal":{let o=f(n,i),l=`tell application "Terminal"
  do script ${w(o)}
  activate
end tell`,{code:c}=await tt("osascript",["-e",l],{useCwd:!1});return c===0}case"Ghostty":{let o=["-na",r.command,"--args","--window-save-state=never"];if(s)o.push(`--working-directory=${s}`);o.push("-e",n,...p(i));let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}case"Alacritty":{let o=["-na",r.command,"--args"];if(s)o.push("--working-directory",s);o.push("-e",n,...e);let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}case"kitty":{let o=["-na",r.command,"--args"];if(s)o.push("--directory",s);o.push(n,...e);let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}case"WezTerm":{let o=["-na",r.command,"--args","start"];if(s)o.push("--cwd",s);o.push("--",n,...e);let{code:l}=await tt("open",o,{useCwd:!1});if(l===0)return!0;break}}return t(`Failed to launch ${r.name}, falling back to Terminal.app`),k({name:"Terminal.app",command:"Terminal"},n,e,i)}
async function E(r,n,e,i){let{cwd:s}=i,o,l;switch(r.name){case"gnome-terminal":o=s?[`--working-directory=${s}`,"--"]:["--"],o.push(n,...e);break;case"konsole":o=s?["--workdir",s,"-e"]:["-e"],o.push(n,...e);break;case"kitty":o=s?["--directory",s]:[],o.push(n,...e);break;case"wezterm":o=s?["start","--cwd",s,"--"]:["start","--"],o.push(n,...e);break;case"alacritty":o=s?["--working-directory",s,"-e"]:["-e"],o.push(n,...e);break;case"ghostty":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;case"xfce4-terminal":case"mate-terminal":o=s?[`--working-directory=${s}`,"-x"]:["-x"],o.push(n,...e);break;case"tilix":o=s?[`--working-directory=${s}`,"-e"]:["-e"],o.push(n,...p(i));break;default:o=["-e",n,...p(i)],l=s;break}return b(r.command,o,{cwd:l})}
async function v(r,n,e){let i=[],s=p(e),o=e.cwd;switch(r.name){case"Windows Terminal":{let l=(c)=>c.replaceAll(";","\\;");if(o)i.push("-d",l(o));i.push("--",l(n),...s);break}case"PowerShell":{i.push("-NoExit","-Command",`& ${q(n)} ${s.join(" ")}`);break}default:{let l=`${g(n)} ${s.map(g).join(" ")}`;i.push("/d","/v:off","/s","/k",`"${l}"`);break}}return b(r.command,i,{windowsVerbatimArguments:r.name==="Command Prompt",cwd:e.cwd})}
async function b(r,n,e={}){let i=(s)=>new Promise((o)=>{let l=(d)=>{t(`Failed to spawn ${r}: ${d.message}`,{level:"error"}),o(!1)},c;try{c=x(r,n,{detached:!0,stdio:"ignore",windowsHide:!1,cwd:s,windowsVerbatimArguments:e.windowsVerbatimArguments})}catch(d){return l(d)}bC(c.pid),c.once("error",l),c.once("spawn",()=>{c.unref(),o(!0)})});if(await i(e.cwd))return!0;if(e.cwd)return i(void 0);return!1}
var L=/^[A-Za-z0-9 /._=-]+$/;
function p(r){let n=(i)=>Buffer.from(i,"utf8").toString("base64url"),e=["--deep-link-origin"];if(r.repo)e.push(`--deep-link-repo=${r.repo}`);if(r.lastFetchMs!==void 0)e.push(`--deep-link-last-fetch=${r.lastFetchMs}`);if(r.cwd)e.push(`--deep-link-cwd-b64=${n(r.cwd)}`);if(r.query)e.push(`--prefill-b64=${n(r.query)}`);return e}
function f(r,n){let e=p(n).join(" ");if(!L.test(e))throw Error(`Internal error: shell-safe args contain metacharacters: ${e}`);if(/^[A-Za-z0-9/._-]+$/.test(r))return`${r} ${e}`;if(/['\\!$\n]/.test(r))throw Error(`Deep-link launch unsupported: the claude binary path "${r}" contains a single quote, backslash, exclamation mark, dollar sign, or newline, which cannot be portably quoted for every login shell. Reinstall claude to a path without these characters to use deep links with iTerm2 or Terminal.app.`);return`'${r}' ${e}`}
function w(r){return`"${r.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
`,"\\n").replaceAll("\t","\\t")}"`}
function q(r){if(/[\u2018\u2019\u201A\u201B]/.test(r))throw Error("Cannot safely quote a Unicode single-quote variant (U+2018-U+201B) in a PowerShell path; install Windows Terminal (wt.exe).");return`'${r.replaceAll('"',"").replaceAll("'","''")}'`}
function g(r){return`"${r.replace(/[\n\t]/g," ").replace(/["%]/g,"").replace(/(\\+)$/,"$1$1")}"`}
async function ae(r){t(`Handling deep link URI: ${r}`);let n;try{n=rao(r)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","parse_failed"),1}t(`Parsed deep link action: ${_(n)}`);let e=await R(process.execPath).catch(()=>process.execPath),i;switch(n.action){case"open":{let{cwd:o,resolvedRepo:l}=await D(n),c=l?await Sio(o):void 0;i={query:n.query,cwd:o,repo:l,lastFetchMs:c?.getTime()};break}case"install-plugin":i={cwd:T(),query:Umo({plugin:n.plugin,marketplaceSource:n.marketplace})};break}let s;try{s=await h(e,i)}catch(o){let l=o instanceof Error?o.message:String(o);return console.error(`Deep link error: ${l}`),m("deep_link_handle","launch_error"),1}if(!s)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),m("deep_link_handle","no_terminal"),1;return y("deep_link_handle"),0}
async function D(r){if(r.cwd)return{cwd:r.cwd};if(r.repo){let n=E3t(r.repo),e=await k3t(n);if(e[0])return t(`Resolved repo ${r.repo} \u2192 ${e[0]}`),{cwd:e[0],resolvedRepo:r.repo};t(`No local clone found for repo ${r.repo}, falling back to home`)}return{cwd:T()}}
return {handle:ae,detect:M,launch:h,shellArgs:p,shellCommand:f,mac:k,linux:E,windows:v,spawnDetached:b};
}
const factories={"darwin-arm64":create_darwin_arm64,"darwin-x64":create_darwin_x64,"linux-arm64":create_linux_arm64,"linux-x64":create_linux_x64,"win32-arm64":create_win32_arm64,"win32-x64":create_win32_x64};
export function createDeepLinkLauncher287(ports,platform=process.platform,arch=process.arch){const factory=factories[platform+'-'+arch];if(!factory)throw Error('Unsupported platform: '+platform+'/'+arch);return factory(ports);}
