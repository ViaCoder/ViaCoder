// Complete original 287 disposable-log cleanup and readonly log paths.
export function createCleanupLogs287(ports){
const {ae,we,Ee,tee,W,Ht,ch,t,d,$_,h}=ports;
const cache=(()=>{const {o,E,l,c,T}=ports;
var a=E.homedir();
var m=E.tmpdir();
var b=(e)=>{let r=o.join(a,"Library");return{data:o.join(r,"Application Support",e),config:o.join(r,"Preferences",e),cache:o.join(r,"Caches",e),log:o.join(r,"Logs",e),temp:o.join(m,e)}};
var M=(e)=>{let r=c.APPDATA||o.join(a,"AppData","Roaming"),n=c.LOCALAPPDATA||o.join(a,"AppData","Local");return{data:o.join(n,e,"Data"),config:o.join(r,e,"Config"),cache:o.join(n,e,"Cache"),log:o.join(n,e,"Log"),temp:o.join(m,e)}};
var N=(e)=>{let r=o.basename(a);return{data:o.join(c.XDG_DATA_HOME||o.join(a,".local","share"),e),config:o.join(c.XDG_CONFIG_HOME||o.join(a,".config"),e),cache:o.join(c.XDG_CACHE_HOME||o.join(a,".cache"),e),log:o.join(c.XDG_STATE_HOME||o.join(a,".local","state"),e),temp:o.join(m,r,e)}};
function g(e,{suffix:r="nodejs"}={}){if(typeof e!=="string")throw TypeError(`Expected a string, got ${typeof e}`);if(r)e+=`-${r}`;if(l.platform==="darwin")return b(e);if(l.platform==="win32")return M(e);return N(e)}
var L=g("claude-cli");
var _=200;
function h(e){let r=e.replace(/[^a-zA-Z0-9]/g,"-");if(r.length<=_)return r;return`${r.slice(0,_)}-${Math.abs(tee(e)).toString(36)}`}
function FTn(){try{return ae().cwd()}catch{return Ee()}}
function f(){return T(L.cache,h(FTn()))}
var iet={baseLogs:()=>f(),errors:()=>T(f(),"errors"),mcpLogs:(e)=>T(f(),`mcp-logs-${h(e)}`)};
return iet;
})();
const iet=cache;
function ot(t,n){let e=t.indexOf(n);return e===-1?t:t.slice(0,e)}
function _(){return{messages:0,errors:0,filesRetainedFresh:0,filesPastCutoff:0}}
function M(e,r){return{messages:e.messages+r.messages,errors:e.errors+r.errors,filesRetainedFresh:e.filesRetainedFresh+r.filesRetainedFresh,filesPastCutoff:e.filesPastCutoff+r.filesPastCutoff}}
function Ae(e){let r=ot(e,".").replace(/T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/,"T$1:$2:$3.$4Z");return new Date(r)}
function Pge(e){return Ht(e)||ch(e)}
async function ue(e,r,n){let s=_();try{let a=await ae().readdir(e);for(let p of a)try{if(Ae(p.name)<r)if(await ae().unlink(h(e,p.name)),n)s.messages++;else s.errors++}catch(w){t(`Failed to clean up file ${p.name} in ${e}: ${w}`,{level:"error"})}}catch(a){if(W(a));else if(Pge(a))t(`cleanup readdir ${e} failed: ${a.code}`,{level:"error"});else d(a)}return s}
async function Me(){let e=ae(),r=$_();if(r===null)return _();let n=iet.errors(),s=iet.baseLogs(),a=await ue(n,r,!1);try{let p;try{p=await e.readdir(s)}catch{return a}let w=p.filter((m)=>m.isDirectory()&&m.name.startsWith("mcp-logs-")).map((m)=>h(s,m.name));for(let m of w)a=M(a,await ue(m,r,!0)),await T(m,e)}catch(p){if(W(p));else if(Pge(p))t(`cleanup mcp-logs scan failed: ${p.code}`,{level:"error"});else d(p)}return a}
async function x(e,r,n,s,a=r,p){let w;try{w=await n.stat(e)}catch(m){if(W(m))return!1;throw m}if(!(w.mtime<r))return s.filesRetainedFresh++,!1;if(p!==void 0&&await p(e,w))return!1;try{await n.unlink(e)}catch(m){if(W(m))return!1;if(w.mtime<a)s.filesPastCutoff++;throw m}return!0}
async function z(e,r){try{return(await r.lstat(e)).isDirectory()}catch{return!1}}
async function T(e,r){if(!await z(e,r))return;try{await r.rmdir(e)}catch{}}
async function At(){let e=$_(),r=_();if(e===null)return r;let n=ae(),s=h(we(),"debug"),a;try{a=await n.readdir(s)}catch{return r}for(let p of a){if(p.name==="latest"||!p.isFile())continue;try{if(await x(h(s,p.name),e,n,r))r.messages++}catch{r.errors++}}return r}
return {messageLogs:Me,debugLogs:At,dateFromName:Ae,paths:iet};
}
