// Complete fixed287 browser-opening closures. Generated from independently pinned raw declarations.
export function createBrowserOpener287(platform,ports){
switch(platform){
case "darwin-arm64":{
const Xd=ports.capabilities;
const a=ports.environment;
const Ke=ports.execute;
const O=ports.platform;
var f={useCwd:!0,useToolMemoryCgroup:!1};
function g(r){let e;try{e=new URL(r)}catch(o){throw Error(`Invalid URL format: ${r}`)}if(e.protocol!=="http:"&&e.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${e.protocol}`)}
function p(){return O()==="linux"&&!a.DISPLAY&&!a.WAYLAND_DISPLAY}
async function cAr(r){try{g(r)}catch(e){return{ok:!1,reason:"invalid_url",detail:e instanceof Error?e.message:String(e)}}return m(r)}
async function ls(r){return(await cAr(r)).ok}
async function m(r){try{let e=Xd()?.browser,o=e!==void 0?e??void 0:a.BROWSER,n="darwin";if(!o&&p())return{ok:!1,reason:"no_display"};return y(await Ke(o||"open",[r],f))}catch(e){return{ok:!1,reason:"unknown",detail:e instanceof Error?e.message:String(e)}}}
function y(r){if(r.code===0)return{ok:!0};let e=r.error??"",o=r.stderr||e||`exit ${r.code}`;if(r.code===127||e.includes("ENOENT"))return{ok:!1,reason:"opener_missing",detail:o};if(e.includes("ETIMEDOUT")||e.includes("timed out"))return{ok:!1,reason:"timeout",detail:o};if(e.includes("EACCES")||e.includes("EPERM"))return{ok:!1,reason:"spawn_error",detail:o};if(r.code>0)return{ok:!1,reason:"nonzero_exit",detail:o};return{ok:!1,reason:"unknown",detail:o}}
return {open:ls,openDetailed:cAr};
}
case "darwin-x64":{
const Xd=ports.capabilities;
const a=ports.environment;
const qe=ports.execute;
const P=ports.platform;
var f={useCwd:!0,useToolMemoryCgroup:!1};
function g(r){let e;try{e=new URL(r)}catch(o){throw Error(`Invalid URL format: ${r}`)}if(e.protocol!=="http:"&&e.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${e.protocol}`)}
function p(){return P()==="linux"&&!a.DISPLAY&&!a.WAYLAND_DISPLAY}
async function cCr(r){try{g(r)}catch(e){return{ok:!1,reason:"invalid_url",detail:e instanceof Error?e.message:String(e)}}return m(r)}
async function ls(r){return(await cCr(r)).ok}
async function m(r){try{let e=Xd()?.browser,o=e!==void 0?e??void 0:a.BROWSER,n="darwin";if(!o&&p())return{ok:!1,reason:"no_display"};return y(await qe(o||"open",[r],f))}catch(e){return{ok:!1,reason:"unknown",detail:e instanceof Error?e.message:String(e)}}}
function y(r){if(r.code===0)return{ok:!0};let e=r.error??"",o=r.stderr||e||`exit ${r.code}`;if(r.code===127||e.includes("ENOENT"))return{ok:!1,reason:"opener_missing",detail:o};if(e.includes("ETIMEDOUT")||e.includes("timed out"))return{ok:!1,reason:"timeout",detail:o};if(e.includes("EACCES")||e.includes("EPERM"))return{ok:!1,reason:"spawn_error",detail:o};if(r.code>0)return{ok:!1,reason:"nonzero_exit",detail:o};return{ok:!1,reason:"unknown",detail:o}}
return {open:ls,openDetailed:cCr};
}
case "linux-x64":{
const Xd=ports.capabilities;
const a=ports.environment;
const Je=ports.execute;
const O=ports.platform;
var f={useCwd:!0,useToolMemoryCgroup:!1};
function g(r){let e;try{e=new URL(r)}catch(o){throw Error(`Invalid URL format: ${r}`)}if(e.protocol!=="http:"&&e.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${e.protocol}`)}
function p(){return O()==="linux"&&!a.DISPLAY&&!a.WAYLAND_DISPLAY}
async function jTr(r){try{g(r)}catch(e){return{ok:!1,reason:"invalid_url",detail:e instanceof Error?e.message:String(e)}}return m(r)}
async function ls(r){return(await jTr(r)).ok}
async function m(r){try{let e=Xd()?.browser,o=e!==void 0?e??void 0:a.BROWSER,n="linux";if(!o&&p())return{ok:!1,reason:"no_display"};return y(await Je(o||"xdg-open",[r],f))}catch(e){return{ok:!1,reason:"unknown",detail:e instanceof Error?e.message:String(e)}}}
function y(r){if(r.code===0)return{ok:!0};let e=r.error??"",o=r.stderr||e||`exit ${r.code}`;if(r.code===127||e.includes("ENOENT"))return{ok:!1,reason:"opener_missing",detail:o};if(e.includes("ETIMEDOUT")||e.includes("timed out"))return{ok:!1,reason:"timeout",detail:o};if(e.includes("EACCES")||e.includes("EPERM"))return{ok:!1,reason:"spawn_error",detail:o};if(r.code>0)return{ok:!1,reason:"nonzero_exit",detail:o};return{ok:!1,reason:"unknown",detail:o}}
return {open:ls,openDetailed:jTr};
}
case "linux-arm64":{
const Xd=ports.capabilities;
const a=ports.environment;
const Je=ports.execute;
const I=ports.platform;
var f={useCwd:!0,useToolMemoryCgroup:!1};
function g(r){let e;try{e=new URL(r)}catch(o){throw Error(`Invalid URL format: ${r}`)}if(e.protocol!=="http:"&&e.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${e.protocol}`)}
function p(){return I()==="linux"&&!a.DISPLAY&&!a.WAYLAND_DISPLAY}
async function jTr(r){try{g(r)}catch(e){return{ok:!1,reason:"invalid_url",detail:e instanceof Error?e.message:String(e)}}return m(r)}
async function ls(r){return(await jTr(r)).ok}
async function m(r){try{let e=Xd()?.browser,o=e!==void 0?e??void 0:a.BROWSER,n="linux";if(!o&&p())return{ok:!1,reason:"no_display"};return y(await Je(o||"xdg-open",[r],f))}catch(e){return{ok:!1,reason:"unknown",detail:e instanceof Error?e.message:String(e)}}}
function y(r){if(r.code===0)return{ok:!0};let e=r.error??"",o=r.stderr||e||`exit ${r.code}`;if(r.code===127||e.includes("ENOENT"))return{ok:!1,reason:"opener_missing",detail:o};if(e.includes("ETIMEDOUT")||e.includes("timed out"))return{ok:!1,reason:"timeout",detail:o};if(e.includes("EACCES")||e.includes("EPERM"))return{ok:!1,reason:"spawn_error",detail:o};if(r.code>0)return{ok:!1,reason:"nonzero_exit",detail:o};return{ok:!1,reason:"unknown",detail:o}}
return {open:ls,openDetailed:jTr};
}
case "win32-x64":{
const Xd=ports.capabilities;
const a=ports.environment;
const tt=ports.execute;
const O=ports.platform;
function h(e){let r;try{r=new URL(e)}catch(o){throw Error(`Invalid URL format: ${e}`)}if(r.protocol!=="http:"&&r.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${r.protocol}`)}
function d(){return O()==="linux"&&!a.DISPLAY&&!a.WAYLAND_DISPLAY}
async function YTr(e){try{h(e)}catch(r){return{ok:!1,reason:"invalid_url",detail:r instanceof Error?r.message:String(r)}}return m(e)}
async function cs(e){return(await YTr(e)).ok}
async function m(e){try{let r=Xd()?.browser,o=r!==void 0?r??void 0:a.BROWSER,n="win32";if(!o&&d())return{ok:!1,reason:"no_display"};if(o)return f(await tt(o,[e]));return f(await tt("rundll32",["url,OpenURL",e],{}))}catch(r){return{ok:!1,reason:"unknown",detail:r instanceof Error?r.message:String(r)}}}
function f(e){if(e.code===0)return{ok:!0};let r=e.error??"",o=e.stderr||r||`exit ${e.code}`;if(e.code===127||r.includes("ENOENT"))return{ok:!1,reason:"opener_missing",detail:o};if(r.includes("ETIMEDOUT")||r.includes("timed out"))return{ok:!1,reason:"timeout",detail:o};if(r.includes("EACCES")||r.includes("EPERM"))return{ok:!1,reason:"spawn_error",detail:o};if(e.code>0)return{ok:!1,reason:"nonzero_exit",detail:o};return{ok:!1,reason:"unknown",detail:o}}
return {open:cs,openDetailed:YTr};
}
case "win32-arm64":{
const Xd=ports.capabilities;
const a=ports.environment;
const tt=ports.execute;
const O=ports.platform;
function h(e){let r;try{r=new URL(e)}catch(o){throw Error(`Invalid URL format: ${e}`)}if(r.protocol!=="http:"&&r.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${r.protocol}`)}
function d(){return O()==="linux"&&!a.DISPLAY&&!a.WAYLAND_DISPLAY}
async function YTr(e){try{h(e)}catch(r){return{ok:!1,reason:"invalid_url",detail:r instanceof Error?r.message:String(r)}}return m(e)}
async function cs(e){return(await YTr(e)).ok}
async function m(e){try{let r=Xd()?.browser,o=r!==void 0?r??void 0:a.BROWSER,n="win32";if(!o&&d())return{ok:!1,reason:"no_display"};if(o)return f(await tt(o,[e]));return f(await tt("rundll32",["url,OpenURL",e],{}))}catch(r){return{ok:!1,reason:"unknown",detail:r instanceof Error?r.message:String(r)}}}
function f(e){if(e.code===0)return{ok:!0};let r=e.error??"",o=e.stderr||r||`exit ${e.code}`;if(e.code===127||r.includes("ENOENT"))return{ok:!1,reason:"opener_missing",detail:o};if(r.includes("ETIMEDOUT")||r.includes("timed out"))return{ok:!1,reason:"timeout",detail:o};if(r.includes("EACCES")||r.includes("EPERM"))return{ok:!1,reason:"spawn_error",detail:o};if(e.code>0)return{ok:!1,reason:"nonzero_exit",detail:o};return{ok:!1,reason:"unknown",detail:o}}
return {open:cs,openDetailed:YTr};
}
default:throw Error('Unsupported browser platform '+platform);
}
}
