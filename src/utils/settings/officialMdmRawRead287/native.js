// Complete pinned platform raw I/O closures; only builtin ports are supplied.
const factories={
"darwin-arm64":function(ports){const process=ports.process;
const Ie=ports.require;
const s=ports.os.userInfo;
const S=ports.childProcess.execFile;
const p=ports.fs.accessSync;
const k=ports.fs.closeSync;
const E=ports.fs.constants;
const y=ports.fs.openSync;
const w=ports.fs.readSync;
var t="com.anthropic.claudecode",bCn="HKLM\\SOFTWARE\\Policies\\ClaudeCode",wCn="HKCU\\SOFTWARE\\Policies\\ClaudeCode",Szt="Settings",H8r="/usr/bin/plutil",T9o=["-convert","json","-o","-","--"],k9o=["-lint","-s","--"],R9o=5000,ztr=2097152,x9o="/mnt/c/Windows/System32/reg.exe",lL="/mnt/c/Program Files/ClaudeCode";
function DSt(){return!1}
function P9o(){let e="";try{e=s().username}catch{}let r=[];if(e)r.push({path:`/Library/Managed Preferences/${e}/${t}.plist`,label:"per-user managed preferences"});return r.push({path:`/Library/Managed Preferences/${t}.plist`,label:"device-level managed preferences"}),r}
class f{promise=null;start(){if(this.promise)return;this.promise=_Cn()}reset(){this.promise=null}}
var g=new f;
function _(t){if(!t)return{status:"ok",exitCode:0,errno:null,signal:null};let n=t,e=typeof n.signal==="string"&&n.signal?n.signal:null;if(typeof n.code==="string")return{status:"spawn_error",exitCode:null,errno:n.code,signal:null};if(n.killed===!0)return{status:"timeout",exitCode:null,errno:null,signal:e};if(e)return{status:"killed",exitCode:null,errno:null,signal:e};return{status:"exited",exitCode:typeof n.code==="number"?n.code:null,errno:null,signal:null}}
function d(t,n,e){let u=Date.now();return new Promise((o)=>{try{S(t,n,{encoding:"utf-8",timeout:R9o,windowsHide:!0,...e!==void 0&&{maxBuffer:e}},(s,r)=>{o({stdout:r??"",..._(s),durationMs:Date.now()-u})})}catch(s){let r=s.code;o({stdout:"",status:"spawn_error",exitCode:null,errno:typeof r==="string"?r:null,signal:null,durationMs:Date.now()-u})}})}
function m(t){return{status:t.status,exitCode:t.exitCode,errno:t.errno,signal:t.signal,durationMs:t.durationMs}}
function R(t){return t.status==="ok"||t.status==="exited"&&t.exitCode!==null}
function x(t){return t.status==="spawn_error"&&t.errno==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"}
function O(t){let n;try{return n=y(t,"r"),w(n,Buffer.alloc(1),0,1,0),null}catch(e){return{code:e&&typeof e==="object"&&"code"in e?e.code:void 0,message:e instanceof Error?e.message:String(e)}}finally{if(n!==void 0)try{k(n)}catch{}}}
function _Cn(){return(async()=>{{let t=P9o(),e=(await Promise.all(t.map(async({path:o,...s})=>{try{p(o,E.R_OK)}catch(l){let a=l&&typeof l==="object"&&"code"in l?l.code:void 0;if(a==="ENOENT"||a==="ENOTDIR")return null;return{stdout:null,unreadReason:l instanceof Error?l.message:String(l),...typeof a==="string"&&{unreadErrno:a},...s}}let r=await d(H8r,[...T9o,o],ztr);if(!R(r))return{stdout:null,unreadReason:"plutil did not finish converting it",...s};if(r.status==="ok")return{stdout:r.stdout,...s};let c=await d(H8r,[...k9o,o]);if(!R(c))return{stdout:null,unreadReason:"plutil did not finish checking it",...s};if(c.status==="ok")return{stdout:null,unreadReason:"it holds a value plutil cannot convert to JSON (a date or data value)",...s};let i=O(o);if(i!==null){if(i.code==="ENOENT"||i.code==="ENOTDIR")return null;return{stdout:null,unreadReason:i.message,...typeof i.code==="string"&&{unreadErrno:i.code},...s}}return{stdout:"",...s}}))).filter((o)=>o!==null),u=e.findIndex((o)=>o.stdout!==null);return{plistStdouts:u===-1?e:e.slice(0,u+1),hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}}if(DSt())return h(x9o);return{plistStdouts:null,hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}})()}
async function h(t){let n=(o)=>d(t,["query",o,"/v",Szt],ztr),[e,u]=await Promise.all([n(bCn),n(wCn)]);return{plistStdouts:null,hklmStdout:e.status==="ok"?e.stdout:null,...x(e)&&{hklmUnreadReason:`the value exceeds ${ztr/1048576} MiB`},hkcuStdout:u.status==="ok"?u.stdout:null,outcomes:{hklm:m(e),hkcu:m(u)}}}
function R8r(){g.start()}
function x8r(){return g.promise}
return {read:_Cn,start:R8r,promise:x8r,paths:P9o,};},
"darwin-x64":function(ports){const process=ports.process;
const Ie=ports.require;
const s=ports.os.userInfo;
const S=ports.childProcess.execFile;
const p=ports.fs.accessSync;
const k=ports.fs.closeSync;
const E=ports.fs.constants;
const y=ports.fs.openSync;
const w=ports.fs.readSync;
var t="com.anthropic.claudecode",bAn="HKLM\\SOFTWARE\\Policies\\ClaudeCode",wAn="HKCU\\SOFTWARE\\Policies\\ClaudeCode",Szt="Settings",O8r="/usr/bin/plutil",k9o=["-convert","json","-o","-","--"],T9o=["-lint","-s","--"],R9o=5000,ztr=2097152,x9o="/mnt/c/Windows/System32/reg.exe",lD="/mnt/c/Program Files/ClaudeCode";
function LSt(){return!1}
function H9o(){let e="";try{e=s().username}catch{}let r=[];if(e)r.push({path:`/Library/Managed Preferences/${e}/${t}.plist`,label:"per-user managed preferences"});return r.push({path:`/Library/Managed Preferences/${t}.plist`,label:"device-level managed preferences"}),r}
class f{promise=null;start(){if(this.promise)return;this.promise=_An()}reset(){this.promise=null}}
var g=new f;
function _(t){if(!t)return{status:"ok",exitCode:0,errno:null,signal:null};let n=t,e=typeof n.signal==="string"&&n.signal?n.signal:null;if(typeof n.code==="string")return{status:"spawn_error",exitCode:null,errno:n.code,signal:null};if(n.killed===!0)return{status:"timeout",exitCode:null,errno:null,signal:e};if(e)return{status:"killed",exitCode:null,errno:null,signal:e};return{status:"exited",exitCode:typeof n.code==="number"?n.code:null,errno:null,signal:null}}
function d(t,n,e){let u=Date.now();return new Promise((o)=>{try{S(t,n,{encoding:"utf-8",timeout:R9o,windowsHide:!0,...e!==void 0&&{maxBuffer:e}},(s,r)=>{o({stdout:r??"",..._(s),durationMs:Date.now()-u})})}catch(s){let r=s.code;o({stdout:"",status:"spawn_error",exitCode:null,errno:typeof r==="string"?r:null,signal:null,durationMs:Date.now()-u})}})}
function m(t){return{status:t.status,exitCode:t.exitCode,errno:t.errno,signal:t.signal,durationMs:t.durationMs}}
function R(t){return t.status==="ok"||t.status==="exited"&&t.exitCode!==null}
function x(t){return t.status==="spawn_error"&&t.errno==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"}
function O(t){let n;try{return n=y(t,"r"),w(n,Buffer.alloc(1),0,1,0),null}catch(e){return{code:e&&typeof e==="object"&&"code"in e?e.code:void 0,message:e instanceof Error?e.message:String(e)}}finally{if(n!==void 0)try{k(n)}catch{}}}
function _An(){return(async()=>{{let t=H9o(),e=(await Promise.all(t.map(async({path:o,...s})=>{try{p(o,E.R_OK)}catch(l){let a=l&&typeof l==="object"&&"code"in l?l.code:void 0;if(a==="ENOENT"||a==="ENOTDIR")return null;return{stdout:null,unreadReason:l instanceof Error?l.message:String(l),...typeof a==="string"&&{unreadErrno:a},...s}}let r=await d(O8r,[...k9o,o],ztr);if(!R(r))return{stdout:null,unreadReason:"plutil did not finish converting it",...s};if(r.status==="ok")return{stdout:r.stdout,...s};let c=await d(O8r,[...T9o,o]);if(!R(c))return{stdout:null,unreadReason:"plutil did not finish checking it",...s};if(c.status==="ok")return{stdout:null,unreadReason:"it holds a value plutil cannot convert to JSON (a date or data value)",...s};let i=O(o);if(i!==null){if(i.code==="ENOENT"||i.code==="ENOTDIR")return null;return{stdout:null,unreadReason:i.message,...typeof i.code==="string"&&{unreadErrno:i.code},...s}}return{stdout:"",...s}}))).filter((o)=>o!==null),u=e.findIndex((o)=>o.stdout!==null);return{plistStdouts:u===-1?e:e.slice(0,u+1),hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}}if(LSt())return h(x9o);return{plistStdouts:null,hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}})()}
async function h(t){let n=(o)=>d(t,["query",o,"/v",Szt],ztr),[e,u]=await Promise.all([n(bAn),n(wAn)]);return{plistStdouts:null,hklmStdout:e.status==="ok"?e.stdout:null,...x(e)&&{hklmUnreadReason:`the value exceeds ${ztr/1048576} MiB`},hkcuStdout:u.status==="ok"?u.stdout:null,outcomes:{hklm:m(e),hkcu:m(u)}}}
function R8r(){g.start()}
function x8r(){return g.promise}
return {read:_An,start:R8r,promise:x8r,paths:H9o,};},
"linux-arm64":function(ports){const process=ports.process;
const Ie=ports.require;
const d=ports.childProcess.execFile;
var Xkn="HKLM\\SOFTWARE\\Policies\\ClaudeCode",Jkn="HKCU\\SOFTWARE\\Policies\\ClaudeCode",QGt="Settings";
var O5o=5000,KYr=2097152,I5o="/mnt/c/Windows/System32/reg.exe",ZN="/mnt/c/Program Files/ClaudeCode";
function Sbt(){if(process.env.WSL_DISTRO_NAME)return!0;try{let e=Ie("fs").readFileSync("/proc/version","utf8").toLowerCase();return e.includes("microsoft")||e.includes("wsl")}catch{return!1}}
class i{promise=null;start(){if(this.promise)return;this.promise=Ykn()}reset(){this.promise=null}}
var a=new i;
function c(e){if(!e)return{status:"ok",exitCode:0,errno:null,signal:null};let t=e,n=typeof t.signal==="string"&&t.signal?t.signal:null;if(typeof t.code==="string")return{status:"spawn_error",exitCode:null,errno:t.code,signal:null};if(t.killed===!0)return{status:"timeout",exitCode:null,errno:null,signal:n};if(n)return{status:"killed",exitCode:null,errno:null,signal:n};return{status:"exited",exitCode:typeof t.code==="number"?t.code:null,errno:null,signal:null}}
function R(e,t,n){let s=Date.now();return new Promise((o)=>{try{d(e,t,{encoding:"utf-8",timeout:O5o,windowsHide:!0,...n!==void 0&&{maxBuffer:n}},(u,r)=>{o({stdout:r??"",...c(u),durationMs:Date.now()-s})})}catch(u){let r=u.code;o({stdout:"",status:"spawn_error",exitCode:null,errno:typeof r==="string"?r:null,signal:null,durationMs:Date.now()-s})}})}
function l(e){return{status:e.status,exitCode:e.exitCode,errno:e.errno,signal:e.signal,durationMs:e.durationMs}}
function m(e){return e.status==="spawn_error"&&e.errno==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"}
function Ykn(){return(async()=>{if(Sbt())return f(I5o);return{plistStdouts:null,hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}})()}
async function f(e){let t=(o)=>R(e,["query",o,"/v",QGt],KYr),[n,s]=await Promise.all([t(Xkn),t(Jkn)]);return{plistStdouts:null,hklmStdout:n.status==="ok"?n.stdout:null,...m(n)&&{hklmUnreadReason:`the value exceeds ${KYr/1048576} MiB`},hkcuStdout:s.status==="ok"?s.stdout:null,outcomes:{hklm:l(n),hkcu:l(s)}}}
function GYr(){a.start()}
function qYr(){return a.promise}
return {read:Ykn,start:GYr,promise:qYr,};},
"linux-x64":function(ports){const process=ports.process;
const Oe=ports.require;
const d=ports.childProcess.execFile;
var XEn="HKLM\\SOFTWARE\\Policies\\ClaudeCode",JEn="HKCU\\SOFTWARE\\Policies\\ClaudeCode",Q2t="Settings";
var I6o=5000,qYr=2097152,O6o="/mnt/c/Windows/System32/reg.exe",ZD="/mnt/c/Program Files/ClaudeCode";
function Sbt(){if(process.env.WSL_DISTRO_NAME)return!0;try{let e=Oe("fs").readFileSync("/proc/version","utf8").toLowerCase();return e.includes("microsoft")||e.includes("wsl")}catch{return!1}}
class i{promise=null;start(){if(this.promise)return;this.promise=YEn()}reset(){this.promise=null}}
var a=new i;
function c(e){if(!e)return{status:"ok",exitCode:0,errno:null,signal:null};let t=e,n=typeof t.signal==="string"&&t.signal?t.signal:null;if(typeof t.code==="string")return{status:"spawn_error",exitCode:null,errno:t.code,signal:null};if(t.killed===!0)return{status:"timeout",exitCode:null,errno:null,signal:n};if(n)return{status:"killed",exitCode:null,errno:null,signal:n};return{status:"exited",exitCode:typeof t.code==="number"?t.code:null,errno:null,signal:null}}
function R(e,t,n){let s=Date.now();return new Promise((o)=>{try{d(e,t,{encoding:"utf-8",timeout:I6o,windowsHide:!0,...n!==void 0&&{maxBuffer:n}},(u,r)=>{o({stdout:r??"",...c(u),durationMs:Date.now()-s})})}catch(u){let r=u.code;o({stdout:"",status:"spawn_error",exitCode:null,errno:typeof r==="string"?r:null,signal:null,durationMs:Date.now()-s})}})}
function l(e){return{status:e.status,exitCode:e.exitCode,errno:e.errno,signal:e.signal,durationMs:e.durationMs}}
function m(e){return e.status==="spawn_error"&&e.errno==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"}
function YEn(){return(async()=>{if(Sbt())return f(O6o);return{plistStdouts:null,hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}})()}
async function f(e){let t=(o)=>R(e,["query",o,"/v",Q2t],qYr),[n,s]=await Promise.all([t(XEn),t(JEn)]);return{plistStdouts:null,hklmStdout:n.status==="ok"?n.stdout:null,...m(n)&&{hklmUnreadReason:`the value exceeds ${qYr/1048576} MiB`},hkcuStdout:s.status==="ok"?s.stdout:null,outcomes:{hklm:l(n),hkcu:l(s)}}}
function GYr(){a.start()}
function VYr(){return a.promise}
return {read:YEn,start:GYr,promise:VYr,};},
"win32-arm64":function(ports){const process=ports.process;
const De=ports.require;
const c=ports.childProcess.execFile;
var oEn="HKLM\\SOFTWARE\\Policies\\ClaudeCode",sEn="HKCU\\SOFTWARE\\Policies\\ClaudeCode",eqt="Settings";
var N5o=5000,e8r=2097152,L5o="/mnt/c/Windows/System32/reg.exe",nL="/mnt/c/Program Files/ClaudeCode";
function Tbt(){return!1}
class a{promise=null;start(){if(this.promise)return;this.promise=rEn()}reset(){this.promise=null}}
var d=new a;
function R(e){if(!e)return{status:"ok",exitCode:0,errno:null,signal:null};let t=e,n=typeof t.signal==="string"&&t.signal?t.signal:null;if(typeof t.code==="string")return{status:"spawn_error",exitCode:null,errno:t.code,signal:null};if(t.killed===!0)return{status:"timeout",exitCode:null,errno:null,signal:n};if(n)return{status:"killed",exitCode:null,errno:null,signal:n};return{status:"exited",exitCode:typeof t.code==="number"?t.code:null,errno:null,signal:null}}
function m(e,t,n){let s=Date.now();return new Promise((o)=>{try{c(e,t,{encoding:"utf-8",timeout:N5o,windowsHide:!0,...n!==void 0&&{maxBuffer:n}},(u,r)=>{o({stdout:r??"",...R(u),durationMs:Date.now()-s})})}catch(u){let r=u.code;o({stdout:"",status:"spawn_error",exitCode:null,errno:typeof r==="string"?r:null,signal:null,durationMs:Date.now()-s})}})}
function l(e){return{status:e.status,exitCode:e.exitCode,errno:e.errno,signal:e.signal,durationMs:e.durationMs}}
function f(e){return e.status==="spawn_error"&&e.errno==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"}
function rEn(){return(async()=>{{let t=`${process.env.SYSTEMROOT||"C:\\Windows"}\\System32\\reg.exe`;return i(t)}if(Tbt())return i(L5o);return{plistStdouts:null,hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}})()}
async function i(e){let t=(o)=>m(e,["query",o,"/v",eqt],e8r),[n,s]=await Promise.all([t(oEn),t(sEn)]);return{plistStdouts:null,hklmStdout:n.status==="ok"?n.stdout:null,...f(n)&&{hklmUnreadReason:`the value exceeds ${e8r/1048576} MiB`},hkcuStdout:s.status==="ok"?s.stdout:null,outcomes:{hklm:l(n),hkcu:l(s)}}}
function QYr(){d.start()}
function ZYr(){return d.promise}
return {read:rEn,start:QYr,promise:ZYr,};},
"win32-x64":function(ports){const process=ports.process;
const De=ports.require;
const c=ports.childProcess.execFile;
var okn="HKLM\\SOFTWARE\\Policies\\ClaudeCode",skn="HKCU\\SOFTWARE\\Policies\\ClaudeCode",eVt="Settings";
var LYo=5000,e8r=2097152,NYo="/mnt/c/Windows/System32/reg.exe",nN="/mnt/c/Program Files/ClaudeCode";
function Tbt(){return!1}
class a{promise=null;start(){if(this.promise)return;this.promise=rkn()}reset(){this.promise=null}}
var d=new a;
function R(e){if(!e)return{status:"ok",exitCode:0,errno:null,signal:null};let t=e,n=typeof t.signal==="string"&&t.signal?t.signal:null;if(typeof t.code==="string")return{status:"spawn_error",exitCode:null,errno:t.code,signal:null};if(t.killed===!0)return{status:"timeout",exitCode:null,errno:null,signal:n};if(n)return{status:"killed",exitCode:null,errno:null,signal:n};return{status:"exited",exitCode:typeof t.code==="number"?t.code:null,errno:null,signal:null}}
function m(e,t,n){let s=Date.now();return new Promise((o)=>{try{c(e,t,{encoding:"utf-8",timeout:LYo,windowsHide:!0,...n!==void 0&&{maxBuffer:n}},(u,r)=>{o({stdout:r??"",...R(u),durationMs:Date.now()-s})})}catch(u){let r=u.code;o({stdout:"",status:"spawn_error",exitCode:null,errno:typeof r==="string"?r:null,signal:null,durationMs:Date.now()-s})}})}
function l(e){return{status:e.status,exitCode:e.exitCode,errno:e.errno,signal:e.signal,durationMs:e.durationMs}}
function f(e){return e.status==="spawn_error"&&e.errno==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"}
function rkn(){return(async()=>{{let t=`${process.env.SYSTEMROOT||"C:\\Windows"}\\System32\\reg.exe`;return i(t)}if(Tbt())return i(NYo);return{plistStdouts:null,hklmStdout:null,hkcuStdout:null,outcomes:{hklm:null,hkcu:null}}})()}
async function i(e){let t=(o)=>m(e,["query",o,"/v",eVt],e8r),[n,s]=await Promise.all([t(okn),t(skn)]);return{plistStdouts:null,hklmStdout:n.status==="ok"?n.stdout:null,...f(n)&&{hklmUnreadReason:`the value exceeds ${e8r/1048576} MiB`},hkcuStdout:s.status==="ok"?s.stdout:null,outcomes:{hklm:l(n),hkcu:l(s)}}}
function Q5r(){d.start()}
function Z5r(){return d.promise}
return {read:rkn,start:Q5r,promise:Z5r,};}
};
function Mt(e,n,r,s){return{file:e,path:"",message:`Managed settings document (${e}) could not be read: ${n}; none of its settings are in effect.`,severity:r?"warning":"fatal",statusOnly:!0,errorClass:"unreadable",...s!==void 0&&{errno:s},...r&&{userWritable:!0}}}
function xt(e,n="Settings"){let r=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp(`^[ \\t]+${r}[ \\t]+REG_(?:EXPAND_)?SZ[ \\t]+([\\s\\S]*)`,"im"),g=e.match(s)?.[1]?.trimEnd();return g?g:null}
export function createMdmRawRead287(platform,ports){const factory=factories[platform];if(!factory)throw Error('Unsupported MDM platform: '+platform);return factory(ports)}
export {Mt as unreadableManagedDocument287,xt as parseRegistry287};
