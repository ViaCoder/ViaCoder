// Complete verified 2.1.287 public interface functions. No state/cache owner is created here.
export function createFastStatusRequest287({dn,Mo,St,cp}){
var rx=1e4;
async function ox(e){let n=`${dn().BASE_API_URL}/api/claude_code_penguin_mode`,r={"User-Agent":Mo(),..."accessToken"in e?{Authorization:`Bearer ${e.accessToken}`,"anthropic-beta":cp}:{"x-api-key":e.apiKey}};return(await St.get(n,{headers:r,timeout:rx})).data};
return ox;
}
export function createCompactHeaders287({He,Js,rdn}){
function ja(){return He()==="firstParty"&&Js()};
var s_t="x-cc-context-compacted";
var i_t="x-cc-compaction-request";
var a_t="x-claude-code-compaction";
var l_t="x-claude-code-context-compacted";
function ojt(e,n,r){if(n===void 0&&r===void 0)return;let s=ja(),g=rdn();if(n!==void 0){if(s)e[s_t]=n;if(g)e[l_t]=n}if(r!==void 0){if(s)e[i_t]=r;if(g)e[a_t]=r}};
return ojt;
}
export function createInterfaceCustomHeaders287({a,ol,t}){
function K_t(e){return e.toLowerCase().includes("afk-mode")};
function qM(){return ol("hipaa")};
function D2e(e=a.ANTHROPIC_CUSTOM_HEADERS??""){let s=[];for(let r of e.split(/\r?\n/)){let n=r.indexOf(":"),i=n===-1?"":r.slice(0,n).trim();if(i)s.push([i,r.slice(n+1).trim()])}return s};
function My(){let e={Authorization:void 0};for(let[s]of D2e())if(s.toLowerCase()==="authorization")e[s]=void 0;return e};
function XH(){let e={},s=qM();for(let[r,n]of D2e()){if(r.toLowerCase()!=="anthropic-beta")continue;let i=n.split(",").map((d)=>d.trim()).filter(Boolean),c=i.filter((d)=>!K_t(d));if(s)e[r]=void 0;else if(c.length!==i.length)e[r]=c.length>0?c.join(","):void 0;else delete e[r]}return e};
function vTn(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e==="claude-desktop"||e==="local-agent"?a.CLAUDE_CODE_DESKTOP_APP_VERSION:void 0};
function _ut(){let e={};for(let[r,s]of D2e()){if(r.toLowerCase()==="anthropic-beta"&&qM()){t("ANTHROPIC_CUSTOM_HEADERS anthropic-beta ignored: experimental betas are disabled by your organization's policy",{level:"debug"});continue}e[r]=s}let n=vTn();if(n&&!Object.keys(e).some((r)=>/^anthropic-client-(platform|version)$/i.test(r)))e["anthropic-client-platform"]="desktop_app",e["anthropic-client-version"]=n;return e};
return {custom:_ut,beta:XH,gatewayAuth:My,compliance:qM};
}
