// Official 2.1.287 complete desktop CLI and Darwin outbound closure.
export function createDesktopCli287(ports){
const process=ports.process;
async function importModule(file){switch(file){case "/$bunfs/root/chunk-3b4yxh25.js":return {"listAllLiveSessions":ports["source:chunk-b5mvcpdr.js:g9"]};case "/$bunfs/root/chunk-9rny2egg.js":return {"ownPidDomain":ports["source:chunk-ez1bv1jr.js:eC"]};case "/$bunfs/root/chunk-yje5xmam.js":return {"getJobDir":ports["source:chunk-1jqp49rh.js:Lr"],"readJobState":ports["source:chunk-1jqp49rh.js:Fr"]};default:throw Error("Desktop dependency outside selected closure: "+file)}}
function module0(imports){
const xfe=imports["xfe"];
const Dp=imports["Dp"];
const mXo=imports["mXo"];
const S=imports["S"];
const yJr=imports["yJr"];
const de=imports["de"];
const oh=imports["oh"];
const fXo=imports["fXo"];
const te=imports["te"];
const ui=imports["ui"];
const Rfe=imports["Rfe"];
const b=imports["b"];
function mrs(e,n){return[n]};
async function _Jr(e,n){return(await xfe(e,n))[0]};
async function Sor(e,n,r,t,i=Dp()){let a=`${e}.jsonl`,o=t&&r!==void 0&&r.isKeySegment(e)?mXo(r):void 0,u=o===void 0?void 0:{source:o,hoverRestOn:t};async function c(p,l){let f=S(p,a);if(o){let d=yJr(p,o.isKeySegment);if(d!==void 0){try{let y=await o.backend.stat(o.transcriptKey(d,e));if(y.ok){let m=y.value.storedBytes??y.value.size;if(m>0)return{filePath:f,projectPath:l,fileSize:m}}}catch{}return}}try{let d=await de(f);if(d.size>0)return{filePath:f,projectPath:l,fileSize:d.size}}catch{}return}if(n){let p=await oh(n,fXo(r,t)),l=new Set;for(let f of mrs(n,p))for(let d of await xfe(f,u,i)){let y=d;if(l.has(y))continue;l.add(y);let m=await c(d,f);if(m)return m}for(let{worktreePath:f,projectDir:d}of await te(p,u,i)){let y=await c(d,f);if(y)return y}return}if(o){let p=new Map;try{if((await ui((d)=>o.backend.listEntries({namespace:"transcript"},d!==void 0?{cursor:d}:void 0),(d)=>{for(let y of d){let m=Rfe(y,o.isKeySegment);if(m===void 0)continue;let h=y.kind==="scope"&&y.mtimeMs!==void 0?y.mtimeMs:Number.NEGATIVE_INFINITY,g=p.get(m);if(g===void 0)p.set(m,{projectKey:m,mtimeMs:h});else if(h>g.mtimeMs)g.mtimeMs=h}})).status==="error")return}catch{return}let l=[...p.values()];l.sort((f,d)=>f.mtimeMs!==d.mtimeMs?d.mtimeMs-f.mtimeMs:f.projectKey<d.projectKey?-1:f.projectKey>d.projectKey?1:0);for(let{projectKey:f}of l){let d=await c(S(i,f),void 0);if(d)return d}return}let s;try{s=await b(i)}catch{return}for(let p of s){let l=await c(S(i,p),void 0);if(l)return l}return};
return {_Jr,Sor,mrs};
}
function module1(imports){
const dYo=imports["dYo"];
const Ft=imports["Ft"];
const Ee=imports["Ee"];
const _Jr=imports["_Jr"];
const kv=imports["kv"];
const P1=imports["P1"];
const qh=imports["qh"];
const zTe=imports["zTe"];
const Ufn=imports["Ufn"];
const Yme=imports["Yme"];
const US=imports["US"];
const kpn=imports["kpn"];
const tVe=imports["tVe"];
const nVe=imports["nVe"];
const p6=imports["p6"];
const hp=imports["hp"];
const i=imports["i"];
const Opn=imports["Opn"];
function Zce(){return dYo()&&!Ft()};
async function aHr({storageV5:e,forkSession:n,onNewestRunningInBackground:r}){let s=G0r(void 0,e),g,h=new Set;try{let{listAllLiveSessions:b}=await importModule("/$bunfs/root/chunk-3b4yxh25.js"),{ownPidDomain:w}=await importModule("/$bunfs/root/chunk-9rny2egg.js"),[D,j]=await Promise.all([b(e,{rejectUnreadable:!0}),w()]);if(D.every((z)=>z.kind==="interactive"||z.kind&&z.sessionId)){g=new Set;for(let z of D){if(z.kind==="interactive"||!z.sessionId)continue;if(g.add(z.sessionId),z.pidDomain!==void 0&&z.pidDomain!==j)h.add(z.sessionId)}}}catch{}return wPo(await s,(b)=>{if(b.bookkeepingOnly)return!1;if(!n&&b.continuedInSessionId!==void 0&&g?.has(b.continuedInSessionId))return r?.({sessionId:b.continuedInSessionId,provable:!h.has(b.continuedInSessionId)}),"stop";if(b.superseded)return!1;if(n)return!0;let w=hp(b);if(w!==void 0&&g?.has(w))return!1;if(g===void 0&&(b.sessionKind||b.continuedInSessionId!==void 0))return!1;return!0},e)};
async function oSr(e){let n=new Map,r=0;for(let b of e){let w=hp(b);if(w){let D=(n.get(w)||0)+1;n.set(w,D),r=Math.max(D,r)}}if(r<=1)return;let s=Array.from(n.values()).filter((b)=>b>1),g=s.length,h=s.reduce((b,w)=>b+w,0);i("tengu_session_forked_branches_fetched",{total_sessions:n.size,sessions_with_branches:g,max_branches_per_session:Math.max(...s),avg_branches_per_session:Math.round(h/g),total_transcript_count:e.length})};
async function G0r(e,n){let r=Ee(),s=await _Jr(r,kv(P1(n)))??qh(r),[g,h]=await Promise.all([zTe(s,e,r,n),Ufn(r,n)]),b=g;if(e!==void 0&&g.length===e&&await Yme(g,r,n)){let w=await zTe(s,void 0,r,n),D=Buffer.alloc(US),j=[];for(let z of w)if(!await kpn(z,r,D,n)){if(j.push(z),j.length===e)break}b=j}if(tVe.test(r)&&await Yme(b,r,n))b=await nVe(r,s,e,!1,void 0,n);if(h.length>0){let w=(await Promise.all(h.map((D)=>zTe(D,e,void 0,n)))).flat().map((D)=>({...D,isAlias:!0}));if(b=p6(b.concat(w)),e!==void 0)b=b.slice(0,e)}return await oSr(b),b};
async function wPo(e,n,r){let s=Buffer.alloc(US);for(let g of e){let h=await Opn(g,s,r);if(!h)continue;let b=n(h);if(b==="stop")return null;if(b)return h}return null};
return {Zce,aHr,G0r,oSr,wPo};
}
function module2(imports){

function e8e(e,{canFork:n}={canFork:!0}){if(e.provable)return`Your most recent conversation is running in the background (session ${e.sessionId}). Use \`claude agents\` to find and attach to it, or \`claude --resume\` to pick another session.`;let r=n?", or add --fork-session to branch off a copy":"";return`Your most recent conversation moved to a background session (${e.sessionId}) registered from another machine or container, so this one can't tell whether it is still running. Use \`claude --resume\` to pick a session${r}.`};
return {e8e};
}
function module3(imports){
const lDe=imports["lDe"];
const ON=imports["ON"];
const Ht=imports["Ht"];
const t=imports["t"];
const l=imports["l"];
const d=imports["d"];
const gO=imports["gO"];
const Ar=imports["Ar"];
const nt=imports["nt"];
var c=60;
var p=/["\u02BA\u02EE\u05F4\u201C-\u201F\u2033\u2036\u301D-\u301F\uFF02]/g;
function Rnt(e){let n=gO(Ar(e)).replace(p,"'");return`"${nt(n,c)}"`};
function Wie({title:e,holder:n,canFork:o,handoff:s}){let{jobId:i}=n,r=e?Rnt(e):"That session",a=i?`Run \`claude attach ${i}\` to open it, or \`claude stop ${i}\` first to resume it here.`:"Run `claude agents` to find it and open it, or stop it there first to resume it here.",u=o?" Add --fork-session to branch off a copy instead.":"";return`${r} is running in the background${i?` (${i})`:""}.${AIn(s)} ${a}${u}`};
async function S4(e,n){let o=(await lDe(e)).find((i)=>i.kind!=="interactive");if(!o)return null;let s=o.jobId!==void 0&&ON.test(o.jobId)&&await m(o.jobId,e,n)?o.jobId:void 0;return{kind:o.kind,jobId:s}};
async function m(e,n,o){try{let{getJobDir:s,readJobState:i}=await importModule("/$bunfs/root/chunk-yje5xmam.js"),r=await i(s(e),o),a=n.toLowerCase();return r!==null&&(r.sessionId.toLowerCase()===a||r.resumeSessionId?.toLowerCase()===a)}catch(s){if(Ht(s))t(`[resume] job state unreadable: ${l(s)}`,{level:"warn"});else d(s);return!1}};
function AIn(e){switch(e?.reason){case void 0:case"not_openable":return"";case"prompt_undelivered":return{queued:" Your prompt was saved and will be sent to it when it restarts.",unconfirmed:` Your prompt may not have reached it: ${e.detail}.`,failed:` Your prompt was not sent to it: ${e.detail}.`}[e.delivery];case"open_failed":return e.promptSent?` Your prompt was sent to it, but it could not be opened here: ${e.detail}.`:` It could not be opened here: ${e.detail}.`}};
return {S4,m,Wie,Rnt,p,c,AIn};
}
function module4(imports){
const Ke=imports["Ke"];
const dc=imports["dc"];
const k=imports["k"];
const PS=imports["PS"];
const t=imports["t"];
const Lt=imports["Lt"];
const Mr=imports["Mr"];
var JDn="1.1.9669";
function v(){let e=[process.argv[1]||"",process.execPath||""].map((o)=>o.replaceAll("\\","/")),n=["/build-ant/","/build-ant-native/","/build-external/","/build-external-native/"];return e.some((o)=>n.some((r)=>o.includes(r)))};
function a(e,n,o={}){let r=new URL(`${e}://${n}`);for(let[s,i]of Object.entries(o))r.searchParams.set(s,i);return r.toString()};
function y(e,n){switch(e.kind){case"resume":return a(n,"resume",{session:e.sessionId});case"new-session":return`${a(n,"code/new")}?folder=${encodeURIComponent(e.folder)}`}};
var p={appPath:"/Applications/Claude.app",openByPath:!1};
async function l(){return p};
async function m(e){let{code:n,stdout:o}=await Ke("defaults",["read",`${e.appPath}/Contents/Info.plist`,"CFBundleShortVersionString"]);if(n!==0)return null;let r=o.trim();return r.length>0?r:null};
function h(e){let n=k.coerce(e);return n!==null&&PS(n.version,JDn)};
async function C(){let e=await l(),n=await m(e);if(!e.openByPath||n!==null&&h(n))return{app:e,version:n};let o=await m(p);return o===null?null:{app:{appPath:p.appPath,openByPath:!0},version:o}};
async function x(e){return!1};
var g='application id "com.github.Electron"';
async function u(){if(v()){if((await Ke("osascript",["-e",`${g} is running`],{timeout:5000})).stdout.trim()==="true")return"claude-dev"}return await O()?"claude":null};
async function O(){{let e=await l();return e.openByPath||dc(e.appPath)}return x("claude")};
async function Gyr(){let e=await u();if(e===null)return{status:"not-installed"};if(e==="claude-dev")return{status:"ready",version:"unknown",scheme:e};let n,o;try{{let r=await C();if(!r)return{status:"not-installed"};({app:o,version:n}=r)}}catch{return{status:"ready",version:"unknown",scheme:e}}if(!n)return{status:"ready",version:"unknown",scheme:e,macApp:o};if(!h(n))return{status:"version-too-old",version:n};return{status:"ready",version:n,scheme:e,macApp:o}};
var S=200;
function D(e,n){let{code:o,exitCode:r,stderr:s,error:i,timedOut:A,maxBufferExceeded:P}=n;if(o===0)return{opened:!0};let c=s||i;if(t(`Deep link opener ${e} failed: code ${o}, exitCode ${r??"undefined"}${c?`: ${c}`:""}`),A)return{opened:!1,detail:`\`${e}\` timed out`};if(P)return{opened:!1,detail:`\`${e}\` printed too much output`};let d=r===void 0?`\`${e}\` failed`:`\`${e}\` exited ${r}`,f=Lt(Mr(s.trim())||(r===void 0?i:"")||"",S).replace(/\.+$/,"");return{opened:!1,detail:f.length===0?d:`${d}: ${f}`}};
async function w(e,n){t(`Opening deep link: ${e}`);{if(e.startsWith("claude-dev:"))return D("osascript",await Ke("osascript",["-e","on run argv","-e",`tell ${g} to open location (item 1 of argv)`,"-e","end run",e]));let r=n??await l();return D("open",await Ke("open",r.openByPath?["-a",r.appPath,e]:[e]))}return{opened:!1,detail:"no deep link opener for darwin"}};
async function zyr(e){let n=await Gyr();if(n.status==="not-installed")return{success:!1,reason:"not_installed",error:"Claude Desktop is not installed. Install it from https://claude.ai/download"};if(n.status==="version-too-old")return{success:!1,reason:"outdated",error:`Claude Desktop ${n.version} is too old. Update to ${JDn} or later.`};let o=y(e,n.scheme),r=await w(o,n.macApp);if(!r.opened)return{success:!1,reason:"open_failed",error:`Couldn't open Claude Desktop (${r.detail}). Open Claude Desktop and try again.`,deepLinkUrl:o};return{success:!0,deepLinkUrl:o}};
return {zyr,Gyr,u,v,g,O,l,p,x,C,m,h,JDn,y,a,w,D,S};
}
function module5(imports){
const Gb=imports["Gb"];
const Xt=imports["Xt"];
const wx=imports["wx"];
const Le=imports["Le"];
const Zce=imports["Zce"];
const ft=imports["ft"];
const aHr=imports["aHr"];
const e8e=imports["e8e"];
const hp=imports["hp"];
const iR=imports["iR"];
const P1=imports["P1"];
const F=imports["F"];
const Sor=imports["Sor"];
const Ee=imports["Ee"];
const lDe=imports["lDe"];
const oe=imports["oe"];
const S4=imports["S4"];
const Wie=imports["Wie"];
const zyr=imports["zyr"];
const xn=imports["xn"];
const ss=imports["ss"];
const c=imports["c"];
var g="Run `claude --resume` to pick a session, then /desktop inside it.";
var E=new Set(["desktop","continue","resume","debug","debugToStderr","debugFile","verbose"]);
async function K({continue:a,resume:i,nonInteractive:_,suppliedOptions:D,prompt:f,pipedStdin:S,pendingConnect:C,pendingSsh:w,storageV5:d}){if(_)return n("non_interactive","--desktop opens the Claude Desktop app and can't run non-interactively (`--print`, `--sdk-url`, `--init-only`, or redirected output).");let r=D.filter(({key:e})=>!E.has(e)).map(({flag:e})=>`\`${e}\``);if(C)r.push("a `cc://` connect URL");if(w)r.push("`claude ssh`");let u=r.pop();if(u!==void 0){let e=r.length>0?`${r.join(", ")} or ${u}`:u;return n("flag_conflict",`--desktop only opens the Claude Desktop app; it can't be combined with ${e}.`)}let p=wx(),m=Le(p.CLAUDE_CODE_RESTRICTED)?"a restricted session: CLAUDE_CODE_RESTRICTED":Le(p.CLAUDE_CODE_SAFE_MODE)?"safe mode: CLAUDE_CODE_SAFE_MODE":Le(p.CLAUDE_CODE_SIMPLE)?"bare mode: CLAUDE_CODE_SIMPLE":void 0;if(m!==void 0)return n("restricted",`--desktop can't open the Claude Desktop app from ${m} wouldn't apply to the session the app starts.`);if(f!==void 0&&f!=="")return n("prompt_unsupported","--desktop doesn't take a prompt yet. Run `claude --desktop`, then type it in the app.");if(S)return n("stdin_not_tty","--desktop doesn't take piped or redirected input yet. Run `claude --desktop` on its own, then type in the app.");if(!Zce())return n("unsupported_platform","--desktop isn't available on this platform. It works on macOS and Windows (x64).");if(!ft())return n("not_subscriber","--desktop requires signing in with a Claude account. Run `claude auth login` to sign in.");let k=a?"continue":i!==void 0?"resume":"new",t;switch(k){case"continue":{let e,o=await aHr({storageV5:d,forkSession:!1,onNewestRunningInBackground:(h)=>{e=h}});if(e)return n("session_live",e8e(e,{canFork:!1}));let s=o?hp(o):void 0;if(!o||!s)return n("session_not_found","No session in this directory to continue. Run `claude --desktop` to start a new one in Claude Desktop.");t={kind:"resume",sessionId:s};break}case"resume":{if(i===!0)return n("resume_without_id","`--desktop --resume` needs a session ID. Pass one, or use `--desktop --continue` for the most recent session in this directory.");let e=iR(i);if(!e)return n("resume_not_uuid",`\`--desktop --resume\` takes a session ID, not a name or path. ${g}`);let o=P1(d),s=F();if(!(await Sor(e,Ee(),o,s)??await Sor(e,void 0,o,s))&&(await lDe(e,{rejectUnreadable:!0}).catch(()=>[])).length===0)return n("session_not_found",`No session found with ID ${e}. ${g}`);t={kind:"resume",sessionId:e};break}case"new":t={kind:"new-session",folder:oe()};break}if(t.kind==="resume"){let e;try{e=await lDe(t.sessionId,{rejectUnreadable:!0})}catch{return n("registry_unreadable","Couldn't check whether that session is in use. Try again.")}if(e.some((s)=>s.kind==="interactive"))return n("session_live",`Session ${t.sessionId} is open in another terminal. Run /desktop there instead.`);let[o]=e;if(o){let s=await S4(t.sessionId,d)??{kind:o.kind,jobId:void 0};return n("session_live",Wie({holder:s,canFork:!1}))}}let l=await zyr(t);if(!l.success)return n(l.reason,l.error);return process.stdout.write(t.kind==="resume"?`Opening session ${t.sessionId} in Claude Desktop
`:`Opening ${xn(t.folder)} in Claude Desktop
`),await ss("desktop_cli_launch",{mode:c(k)}),0};
async function n(a,i){return Gb(i),await Xt("desktop_cli_launch",a),1};
return {K,n,E,g};
}
function module6(imports){

function xo(n){let e=new Map;for(let s of n.options){let r=s.attributeName();if(e.has(r)||n.getOptionValueSource(r)!=="cli")continue;let g=n.getOptionValue(r),h=n.options.find((b)=>b.attributeName()===r&&b.negate===(g===!1))??s;e.set(r,{flag:h.long??h.flags,key:r,value:g})}return[...e.values()]};
return {xo};
}
const m0=module0({"xfe":ports["source:chunk-t6xmn86v.js:xfe"],"Dp":ports["source:chunk-t6xmn86v.js:Dp"],"mXo":ports["source:chunk-t6xmn86v.js:mXo"],"S":ports.builtins["path"]["join"],"yJr":ports["source:chunk-t6xmn86v.js:yJr"],"de":ports.builtins["fs/promises"]["stat"],"oh":ports["source:chunk-t6xmn86v.js:oh"],"fXo":ports["source:chunk-t6xmn86v.js:fXo"],"te":ports["source:chunk-t6xmn86v.js:te"],"ui":ports["source:chunk-rjzag4e0.js:ui"],"Rfe":ports["source:chunk-t6xmn86v.js:Rfe"],"b":ports.builtins["fs/promises"]["readdir"]});
const m1=module1({"dYo":ports["desktopPlatform"],"Ft":ports["source:chunk-2ynta9xc.js:Ft"],"Ee":ports["source:chunk-bn3p37gv.js:Ee"],"_Jr":m0["_Jr"],"kv":ports["source:chunk-fft5zm4p.js:kv"],"P1":ports["source:chunk-fft5zm4p.js:P1"],"qh":ports["source:chunk-13899ncf.js:qh"],"zTe":ports["source:chunk-mphp7acd.js:zTe"],"Ufn":ports["source:chunk-mphp7acd.js:Ufn"],"Yme":ports["source:chunk-mphp7acd.js:Yme"],"US":ports["source:chunk-t6xmn86v.js:US"],"kpn":ports["source:chunk-mphp7acd.js:kpn"],"tVe":ports["source:chunk-mphp7acd.js:tVe"],"nVe":ports["source:chunk-mphp7acd.js:nVe"],"p6":ports["source:chunk-mphp7acd.js:p6"],"hp":ports["source:chunk-mphp7acd.js:hp"],"i":ports["telemetry"],"Opn":ports["source:chunk-mphp7acd.js:Opn"]});
const m2=module2({});
const m3=module3({"lDe":ports["source:chunk-nemzqqyb.js:lDe"],"ON":ports["source:chunk-1jqp49rh.js:ON"],"Ht":ports["source:chunk-c9me9cp7.js:Ht"],"t":ports["debug"],"l":ports["source:chunk-c9me9cp7.js:l"],"d":ports["source:chunk-amhtwhch.js:d"],"gO":ports["source:chunk-eske5nfz.js:gO"],"Ar":ports["source:chunk-eske5nfz.js:Ar"],"nt":ports["source:chunk-m59srz4k.js:nt"]});
const m4=module4({"Ke":ports["exec"],"dc":ports["exists"],"k":ports["semver"],"PS":ports["gte"],"t":ports["debug"],"Lt":ports["source:chunk-db6pdgvs.js:Lt"],"Mr":ports["source:chunk-eske5nfz.js:Mr"]});
const m5=module5({"Gb":ports["error"],"Xt":ports["featureFailure"],"wx":ports["source:chunk-2z1m9v0n.js:wx"],"Le":ports["source:chunk-4s38z9x2.js:Le"],"Zce":m1["Zce"],"ft":ports["subscriber"],"aHr":m1["aHr"],"e8e":m2["e8e"],"hp":ports["source:chunk-mphp7acd.js:hp"],"iR":ports["source:chunk-t6xmn86v.js:iR"],"P1":ports["source:chunk-fft5zm4p.js:P1"],"F":ports["source:chunk-ky674g9x.js:F"],"Sor":m0["Sor"],"Ee":ports["source:chunk-bn3p37gv.js:Ee"],"lDe":ports["source:chunk-nemzqqyb.js:lDe"],"oe":ports["cwd"],"S4":m3["S4"],"Wie":m3["Wie"],"zyr":ports.openDesktop,"xn":ports["source:chunk-6xrs6gmd.js:xn"],"ss":ports["featureSuccess"],"c":ports["source:chunk-n4qghq20.js:c"]});
const m6=module6({});
return {"launch":m5["K"],"installStatus":m4["Gyr"],"open":m4["zyr"],"suppliedOptions":m6["xo"]};
}
