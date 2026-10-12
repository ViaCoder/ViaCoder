// Complete fixed 2.1.287 Chrome menu/RPC/admission declarations. Same host owners supplied by runtime.
export function module0(ports){const w=ports.get("chunk-bgj860b4.js","w");const s=ports.get("chunk-jkt292h5.js","s");const n=ports.get("chunk-jkt292h5.js","n");const Z=ports.get("chunk-c9me9cp7.js","Z");const a=ports.get("chunk-mbfze585.js","a");const t=ports.get("chunk-q80zaav8.js","t");const d=ports.get("chunk-amhtwhch.js","d");const ft=ports.get("chunk-nankzm0s.js","ft");const Ae=ports.get("chunk-nankzm0s.js","Ae");const le=ports.get("chunk-nankzm0s.js","le");const Te=ports.get("chunk-038c023k.js","Te");const y=ports.get("chunk-9d2ykxmy.js","y");const m=ports.get("chunk-9d2ykxmy.js","m");const p=ports.get("chunk-9d2ykxmy.js","p");const lH=ports.get("chunk-09m4fzsj.js","lH");const g_e=ports.get("chunk-09m4fzsj.js","g_e");const cH=ports.get("chunk-09m4fzsj.js","cH");const R=ports.get("chunk-1y575bx8.js","R");const A=ports.get("chunk-1y575bx8.js","A");const g=ports.get("chunk-1y575bx8.js","g");const $e=ports.get("chunk-6zne1pwx.js","$e");const Qe=ports.get("chunk-ma5mhf2j.js","Qe");const z=ports.get("chunk-t1n6x7q0.js","z");const he=ports.get("chunk-0smna178.js","he");const gSe=ports.get("chunk-df0597gf.js","gSe");const rn=ports.get("chunk-fqrx4sq8.js","rn");const d8t=ports.get("chunk-g45mcjt4.js","d8t");const Hnt=ports.get("chunk-g45mcjt4.js","Hnt");const FIn=ports.get("chunk-g45mcjt4.js","FIn");const u8t=ports.get("chunk-g45mcjt4.js","u8t");const c8t=ports.get("chunk-8447apg8.js","c8t");const mS=ports.get("chunk-ewha1f47.js","mS");const K=ports.get("chunk-ysm7k028.js","K");const e=ports.get("chunk-ysm7k028.js","e");const r=ports.get("chunk-ysm7k028.js","r");const ac=ports.get("chunk-ag87p919.js","ac");const b=ports.get("chunk-870yz02b.js","b");
function re(G){let o=w(41),{chromeClient:u,onDone:E}=G,[i,I]=g(null),[v,T]=g(null),[Y,ce]=g(!1),x=A(!1),ve;if(o[0]===b)ve=le().chromeExtension?.pairedDeviceId,o[0]=ve;else ve=o[0];let j=ve,ae,k;if(o[1]!==u)ae=()=>(x.current=!1,FIn(u).then((je)=>{if(!x.current)I(je)}).catch((J)=>{if(Hnt(J)){if(p("chrome_browser_picker","bridge_unreachable"),!x.current)I([]);return}if(m("chrome_browser_picker","list_failed"),!x.current)T(Z(J).message)}),()=>{x.current=!0}),k=[u],o[1]=u,o[2]=ae,o[3]=k;else ae=o[2],k=o[3];R(ae,k);let de;if(o[4]!==E)de=function C(c){if(x.current){return}x.current=!0,E(c)},o[4]=E,o[5]=de;else de=o[5];let C=de,O;if(o[6]!==i||o[7]!==u||o[8]!==C||o[9]!==Y)O=function X(_){if(Y){return}ce(!0);let me=i?.find((xe)=>xe.deviceId===_);u8t(u,"select_browser",{deviceId:_}).then(()=>{y("chrome_browser_picker"),C(me?`Now using browser "${me.name}" for Chrome actions.`:void 0)}).catch((Q)=>{m("chrome_browser_picker",Hnt(Q)?"bridge_unreachable":"select_failed"),t(`claude-in-chrome select_browser failed: ${Z(Q).message}`,{level:"error"}),C(`Couldn't switch browser: ${Z(Q).message}`)})},o[6]=i,o[7]=u,o[8]=C,o[9]=Y,o[10]=O;else O=o[10];let X=O;if(v){const f=`Couldn't list connected browsers: ${v}`;let h;if(o[11]!==f)h=e(n,{color:"error",children:f}),o[11]=f,o[12]=h;else h=o[12];let U;if(o[13]!==C||o[14]!==h)U=e(V,{onDone:C,children:h}),o[13]=C,o[14]=h,o[15]=U;else U=o[15];return U}if(i===null){let f;if(o[16]===b)f=e(n,{dimColor:!0,children:"Looking for connected browsers\u2026"}),o[16]=f;else f=o[16];let h;if(o[17]!==C)h=e(V,{onDone:C,children:f}),o[17]=C,o[18]=h;else h=o[18];return h}if(i.length===0){let f;if(o[19]===b)f=e(n,{children:d8t}),o[19]=f;else f=o[19];let h;if(o[20]!==C)h=e(V,{onDone:C,children:f}),o[20]=C,o[21]=h;else h=o[21];return h}const f=i.length===1?"One browser is connected:":`Choose which browser to use (${i.length} connected):`;let h;if(o[22]!==f)h=e(n,{children:f}),o[22]=f,o[23]=h;else h=o[23];const U=Math.min(i.length,5);let ze;if(o[24]!==i){let H;if(o[26]===b)H=(Ie)=>Ie.deviceId===j,o[26]=H;else H=o[26];ze=i.findIndex(H);o[24]=i,o[25]=ze}else ze=o[25];const H=Math.max(0,ze);let ee;if(o[27]!==i||o[28]!==X)ee=(oe)=>{let B=i[oe];if(B)X(B.deviceId)},o[27]=i,o[28]=X,o[29]=ee;else ee=o[29];let D;if(o[30]!==i){let l;if(o[32]===b)l=(N)=>e(rn.Item,{label:N.name,icon:N.deviceId===j?e(Qe,{status:"success","aria-label":"current:"}):void 0,meta:[N.osPlatform??"unknown OS"]},N.deviceId),o[32]=l;else l=o[32];D=i.map(l);o[30]=i,o[31]=D}else D=o[31];let l;if(o[33]!==H||o[34]!==ee||o[35]!==D||o[36]!==U)l=e(rn,{visibleCount:U,defaultFocusIndex:H,onSelect:ee,children:D}),o[33]=H,o[34]=ee,o[35]=D,o[36]=U,o[37]=l;else l=o[37];let P;if(o[38]!==l||o[39]!==h)P=r(s,{flexDirection:"column",gap:1,children:[h,l]}),o[38]=l,o[39]=h,o[40]=P;else P=o[40];return P};
function V(G){let i=w(6),{onDone:u,children:E}=G,I;if(i[0]===b)I=[{value:"back",label:"\u2039 Back"}],i[0]=I;else I=i[0];let v;if(i[1]!==u)v=e($e,{options:I,onChange:()=>u(),onCancel:()=>u(),hideIndexes:!0}),i[1]=u,i[2]=v;else v=i[2];let T;if(i[3]!==E||i[4]!==v)T=r(s,{flexDirection:"column",gap:1,children:[E,v]}),i[3]=E,i[4]=v,i[5]=T;else T=i[5];return T};
function No(Lo){return Lo.mcp.clients};
function Po(Ze){return Ze.name===ac&&Ze.type==="connected"};
function Ao(Vo){return Vo+1};
function Ho(Ko){return Ko+1};
function Mo(Oo){return Oo+1};
function Wo(Uo){return Uo+1};
function Ge(G){let c=w(47),{onDone:u,isExtensionInstalled:E,configEnabled:i,isClaudeAISubscriber:I,isWSL:v}=G,T=z(No),{storageV5:Y}=Te(),[ce,x]=g(0),[o,ve]=g(i??!1),[j,ae]=g(!1),[k,je]=g(E),[J,de]=g("menu"),C;if(c[0]!==T)C=T.find(Po),c[0]=T,c[1]=C;else C=c[1];let O=C,_=O!==void 0,xe;if(c[2]===b)xe=le().chromeExtension?.pairedDeviceName,c[2]=xe;else xe=c[2];let me=xe,Q;if(c[3]===b)Q=function f(X){gSe(X).catch(d)},c[3]=Q;else Q=c[3];let f=Q,h;if(c[4]!==o||c[5]!==Y)h=function oe(U){ze:switch(U){case"install-extension":{x(Ao),ae(!0),f(lH);break ze}case"reconnect":{x(Ho),cH().then((H)=>{if(je(H),H)ae(!1)}).catch(d),f(g_e);break ze}case"manage-permissions":{x(Mo),f(c8t);break ze}case"toggle-default":{let Ie=!o;Ae((ee)=>({...ee,claudeInChromeDefaultEnabled:Ie}),Y),ve(Ie);break ze}case"select-browser":{de("select-browser")}}},c[4]=o,c[5]=Y,c[6]=h;else h=c[6];let oe=h,B;if(c[7]!==o||c[8]!==_||c[9]!==k){B=[];let D=k?"":" (requires extension)";if(!k){let l;if(c[11]===b)l={label:"Install Chrome extension",value:"install-extension"},c[11]=l;else l=c[11];B.push(l)}if(_){let l;if(c[12]===b)l={label:"Select browser\u2026",value:"select-browser"},c[12]=l;else l=c[12];B.push(l)}let l;if(c[13]===b)l=e(n,{children:"Manage permissions"}),c[13]=l;else l=c[13];let N;if(c[14]!==D)N={label:r(K,{children:[l,e(n,{dimColor:!0,children:D})]}),value:"manage-permissions"},c[14]=D,c[15]=N;else N=c[15];let P;if(c[16]===b)P=e(n,{children:"Reconnect extension"}),c[16]=P;else P=c[16];let q;if(c[17]!==D)q={label:r(K,{children:[P,e(n,{dimColor:!0,children:D})]}),value:"reconnect"},c[17]=D,c[18]=q;else q=c[18];const W=`Enabled by default: ${o?"Yes":"No"}`;let ne;if(c[19]!==W)ne={label:W,value:"toggle-default"},c[19]=W,c[20]=ne;else ne=c[20];B.push(N,q,ne);c[7]=o,c[8]=_,c[9]=k,c[10]=B}else B=c[10];let De=v||!I,l;if(c[21]!==u)l=()=>u(),c[21]=u,c[22]=l;else l=c[22];let N;if(c[23]===b)N=e(n,{children:"Claude in Chrome works with the Chrome extension to let you control your browser directly from Claude Code. Navigate websites, fill forms, capture screenshots, record GIFs, and debug with console logs and network requests."}),c[23]=N;else N=c[23];let P;if(c[24]!==v)P=v&&e(n,{color:"error",children:"Claude in Chrome is not supported in WSL at this time."}),c[24]=v,c[25]=P;else P=c[25];let q;if(c[26]!==I)q=!I&&e(n,{color:"error",children:"Claude in Chrome requires a claude.ai subscription."}),c[26]=I,c[27]=q;else q=c[27];let W;if(c[28]!==O||c[29]!==oe||c[30]!==_||c[31]!==De||c[32]!==k||c[33]!==u||c[34]!==B||c[35]!==ce||c[36]!==j||c[37]!==J)W=!De&&r(K,{children:[r(s,{flexDirection:"column",children:[r(n,{children:["Status:"," ",_?e(n,{color:"success",children:"Enabled"}):e(n,{color:"inactive",children:"Disabled"})]}),r(n,{children:["Extension:"," ",k?e(n,{color:"success",children:"Installed"}):e(n,{color:"warning",children:"Not detected"})]}),_&&me?r(n,{children:["Browser: ",e(n,{color:"success",children:me})]}):null]}),J==="select-browser"&&O?e(re,{chromeClient:O,onDone:(Je)=>{if(de("menu"),x(Wo),Je)u(Je)}}):e($e,{options:B,onChange:oe,hideIndexes:!0},ce),j&&r(n,{color:"warning",children:["Once installed, select ",'"Reconnect extension"'," to connect."]}),r(n,{children:[e(n,{dimColor:!0,children:"Usage: "}),e(n,{children:"claude --chrome"}),e(n,{dimColor:!0,children:" or "}),e(n,{children:"claude --no-chrome"})]}),e(n,{dimColor:!0,children:"Site-level permissions are inherited from the Chrome extension. Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."})]}),c[28]=O,c[29]=oe,c[30]=_,c[31]=De,c[32]=k,c[33]=u,c[34]=B,c[35]=ce,c[36]=j,c[37]=J,c[38]=W;else W=c[38];let ne;if(c[39]===b)ne=e(mS,{url:"https://code.claude.com/docs/en/chrome"}),c[39]=ne;else ne=c[39];let ue;if(c[40]!==P||c[41]!==q||c[42]!==W)ue=r(s,{flexDirection:"column",gap:1,children:[N,P,q,W,ne]}),c[40]=P,c[41]=q,c[42]=W,c[43]=ue;else ue=c[43];let Xe;if(c[44]!==ue||c[45]!==l)Xe=e(he,{title:"Claude in Chrome",onCancel:l,color:"chromeYellow",children:ue}),c[44]=ue,c[45]=l,c[46]=Xe;else Xe=c[46];return Xe};
var yn=async function(G){let u=await cH().catch((v)=>(t(`[Claude in Chrome] Extension detection failed: ${v instanceof Error?v.message:String(v)}`,{level:"error"}),!1)),E=le(),i=ft(),I=a.isWslEnvironment();return e(Ge,{onDone:G,isExtensionInstalled:u,configEnabled:E.claudeInChromeDefaultEnabled,isClaudeAISubscriber:i,isWSL:I})};
return {re,V,No,Po,Ao,Ho,Mo,Wo,Ge,yn};}
export function module1(ports){const GN=ports.get("chunk-rgcp4trk.js","GN");const P=ports.get("chunk-c9me9cp7.js","P");const f=ports.get("chunk-5qqrzb2c.js","f");const Y=ports.get("chunk-q80zaav8.js","Y");const t=ports.get("chunk-q80zaav8.js","t");const fCr=ports.get("chunk-9qznrr8y.js","fCr");const zwo=ports.get("chunk-9qznrr8y.js","zwo");const o=ports.get("chunk-aybmj3t4.js","o");const T=ports.get("chunk-aybmj3t4.js","T");const u=ports.get("chunk-aybmj3t4.js","u");
var d=f(()=>u({deviceId:o(),name:o().default("Browser"),osPlatform:o().optional()}));
var d8t="No browsers are connected. Open Chrome with the Claude extension and make sure you're signed in to the same claude.ai account.";
class Wur extends P{constructor(){super(d8t,"claude-in-chrome bridge not reachable")}};
function Hnt(e){return e instanceof Wur};
function Ros(e){if(Hnt(e))return[];throw e};
async function FIn(e){let r=await u8t(e,"list_connected_browsers",{});if(!r)return[];let c=T(d()).safeParse(Y(r));return c.success?c.data:[]};
async function u8t(e,r,c){let a=fCr(),i=await GN(e,{name:r,arguments:c}),n=Array.isArray(i.content)?i.content[0]:void 0,s=n&&typeof n==="object"&&"text"in n&&typeof n.text==="string"?n.text:void 0;if(fCr()!==a&&s!==void 0&&zwo(s))throw t(`claude-in-chrome bridge not reachable: ${s}`,{level:"error"}),new Wur;if(i.isError)throw new P(s||`${r} failed`,"claude-in-chrome tool call failed");return s};
return {d,d8t,Wur,Hnt,Ros,FIn,u8t};}
export function module2(ports){const Zc=ports.get("chunk-df0597gf.js","Zc");
function fCr(){return Zc().disconnectedAnswerCount};
function zwo(n){return Zc().disconnectedAnswerTexts.has(n)};
return {fCr,zwo};}
export function module3(ports){
function GN(e,o,t){return ports.module("chunk-3xgd8dv8.js").mcpClientModule().invokeToolRaw(e.client,o,t)};
return {GN};}
export function module4(ports){const w=ports.get("chunk-bgj860b4.js","w");const n=ports.get("chunk-jkt292h5.js","n");const It=ports.get("chunk-jkt292h5.js","It");const e=ports.get("chunk-ysm7k028.js","e");const r=ports.get("chunk-ysm7k028.js","r");
function mS(a){let l=w(2),{url:o}=a,t;if(l[0]!==o)t=r(n,{dimColor:!0,children:["Learn more: ",e(It,{url:o})]}),l[0]=o,l[1]=t;else t=l[1];return t};
return {mS};}
export function module5(ports){const Ce=ports.get("chunk-bn3p37gv.js","Ce");const Wu=ports.get("chunk-bn3p37gv.js","Wu");const A6e=ports.get("chunk-bn3p37gv.js","A6e");const r4=ports.get("chunk-bn3p37gv.js","r4");const E=ports.get("chunk-c9me9cp7.js","E");const W=ports.get("chunk-c9me9cp7.js","W");const Ht=ports.get("chunk-c9me9cp7.js","Ht");const we=ports.get("chunk-brnn4zwp.js","we");const xr=ports.get("chunk-brnn4zwp.js","xr");const a=ports.get("chunk-mbfze585.js","a");const _=ports.get("chunk-q80zaav8.js","_");const t=ports.get("chunk-q80zaav8.js","t");const d=ports.get("chunk-amhtwhch.js","d");const O=ports.get("chunk-amhtwhch.js","O");const ft=ports.get("chunk-nankzm0s.js","ft");const iJe=ports.get("chunk-nankzm0s.js","iJe");const aZ=ports.get("chunk-nankzm0s.js","aZ");const k=ports.get("chunk-nankzm0s.js","k");const Ae=ports.get("chunk-nankzm0s.js","Ae");const le=ports.get("chunk-nankzm0s.js","le");const Br=ports.get("chunk-9d2ykxmy.js","Br");const Je=ports.get("chunk-fmv8bhm3.js","Je");const on=ports.get("chunk-b5kmgz2n.js","on");const dmt=ports.get("chunk-ejqjra50.js","dmt");const QRe=ports.get("chunk-ejqjra50.js","QRe");const iUe=ports.get("chunk-ejqjra50.js","iUe");const Zc=ports.get("chunk-df0597gf.js","Zc");const JBr=ports.get("chunk-df0597gf.js","JBr");const QBr=ports.get("chunk-df0597gf.js","QBr");const gSe=ports.get("chunk-df0597gf.js","gSe");const Vh=ports.get("chunk-7qtw821h.js","Vh");const ac=ports.get("chunk-ag87p919.js","ac");const lfe=ports.get("chunk-ag87p919.js","lfe");const Ur=ports.get("chunk-kby37ryb.js","Ur");const ZT=ports.get("promises","chmod");const tP=ports.get("promises","mkdir");const nP=ports.get("promises","readFile");const rP=ports.get("promises","writeFile");const GW=ports.get("os","homedir");const bi=ports.get("path","join");const VT=ports.get("promises","lstat");const CW=ports.get("promises","readlink");const OW=ports.get("promises","realpath");const MW=ports.get("path","dirname");const IW=ports.get("path","join");const DW=ports.get("path","resolve");const KT=ports.get("path","sep");const XT=ports.get("promises","readdir");const Lu=ports.get("path","join");const JT=ports.get("chunk-09m4fzsj.js","JT");
function vqn(){return a.CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS===!0&&!r4()};
var LW=KT+IW("claude","versions")+KT;
async function qT(e,n){if(!n.isSymbolicLink())return!1;let r=await CW(e);return DW(MW(e),r).includes(LW)};
async function u$e(e){let n=await OW(e);return n.endsWith(".js")||n.includes("node_modules")};
async function YT(e){if(O()==="windows")return!0;try{let n=await VT(e);if(!n.isSymbolicLink())return!1;return await qT(e,n)||await u$e(e)}catch(n){if(E(n)!==void 0)return!1;throw n}};
var NW=`## Loading deferred tools

If the mcp__claude-in-chrome__* tools are deferred (must be loaded via ToolSearch before use), load every tool you expect to need in ONE ToolSearch call \u2014 the select query accepts a comma-separated list \u2014 never one call per tool. Start with the core set:

${'ToolSearch with query "select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__tabs_close_mcp"'}

${"Add task-specific tools to the same call when the task obviously needs them: read_console_messages / read_network_requests for debugging, form_input for forms, gif_creator for recordings, javascript_tool for page scripting."}`;
var FW=`# Claude in Chrome browser automation

You have access to browser automation tools (mcp__claude-in-chrome__*) for interacting with web pages in Chrome. Follow these guidelines for effective browser automation.

${NW}

## GIF recording

When performing multi-step browser interactions that the user may want to review or share, use mcp__claude-in-chrome__gif_creator to record them.

You must ALWAYS:
* Capture extra frames before and after taking actions to ensure smooth playback
* Name the file meaningfully to help the user identify it later (e.g., "login_process.gif")

## Console log debugging

You can use mcp__claude-in-chrome__read_console_messages to read console output. Console output may be verbose. If you are looking for specific log entries, use the 'pattern' parameter with a regex-compatible pattern. This filters results efficiently and avoids overwhelming output. For example, use pattern: "[MyApp]" to filter for application-specific logs rather than reading all console output.

## Alerts and dialogs

IMPORTANT: Do not trigger JavaScript alerts, confirms, prompts, or browser modal dialogs through your actions. These browser dialogs block all further browser events and will prevent the extension from receiving any subsequent commands. Instead, when possible, use console.log for debugging and then use the mcp__claude-in-chrome__read_console_messages tool to read those log messages. If a page has dialog-triggering elements:
1. Avoid clicking buttons or links that may trigger alerts (e.g., "Delete" buttons with confirmation dialogs)
2. If you must interact with such elements, warn the user first that this may interrupt the session
3. Use mcp__claude-in-chrome__javascript_tool to check for and dismiss any existing dialogs before proceeding

If you accidentally trigger a dialog and lose responsiveness, inform the user they need to manually dismiss it in the browser.

## Avoid rabbit holes and loops

When using browser automation tools, stay focused on the specific task. If you encounter any of the following, stop and ask the user for guidance:
- Unexpected complexity or tangential browser exploration
- Browser tool calls failing or returning errors after 2-3 attempts
- No response from the browser extension
- Page elements not responding to clicks or input
- Pages not loading or timing out
- Unable to complete the browser task despite multiple approaches

Explain what you attempted, what went wrong, and ask how the user would like to proceed. Do not keep retrying the same failing browser action or explore unrelated pages without checking in first.

## Tab context and session startup

IMPORTANT: At the start of each browser automation session, call mcp__claude-in-chrome__tabs_context_mcp first to get information about the user's current browser tabs. Use this context to understand what the user might want to work with before creating new tabs.

Never reuse tab IDs from a previous/other session. Follow these guidelines:
1. Only reuse an existing tab if the user explicitly asks to work with it
2. Otherwise, create a new tab with mcp__claude-in-chrome__tabs_create_mcp
3. If a tool returns an error indicating the tab doesn't exist or is invalid, call tabs_context_mcp to get fresh tab IDs
4. When a tab is closed by the user or a navigation error occurs, call tabs_context_mcp to see what tabs are available`;
function G5e(e){return e?FW:`# Claude in Chrome browser automation

You have access to browser automation tools (mcp__claude-in-chrome__*) for interacting with web pages in Chrome. Follow these guidelines for effective browser automation.

## GIF recording

When performing multi-step browser interactions that the user may want to review or share, use mcp__claude-in-chrome__gif_creator to record them.

You must ALWAYS:
* Capture extra frames before and after taking actions to ensure smooth playback
* Name the file meaningfully to help the user identify it later (e.g., "login_process.gif")

## Console log debugging

You can use mcp__claude-in-chrome__read_console_messages to read console output. Console output may be verbose. If you are looking for specific log entries, use the 'pattern' parameter with a regex-compatible pattern. This filters results efficiently and avoids overwhelming output. For example, use pattern: "[MyApp]" to filter for application-specific logs rather than reading all console output.

## Alerts and dialogs

IMPORTANT: Do not trigger JavaScript alerts, confirms, prompts, or browser modal dialogs through your actions. These browser dialogs block all further browser events and will prevent the extension from receiving any subsequent commands. Instead, when possible, use console.log for debugging and then use the mcp__claude-in-chrome__read_console_messages tool to read those log messages. If a page has dialog-triggering elements:
1. Avoid clicking buttons or links that may trigger alerts (e.g., "Delete" buttons with confirmation dialogs)
2. If you must interact with such elements, warn the user first that this may interrupt the session
3. Use mcp__claude-in-chrome__javascript_tool to check for and dismiss any existing dialogs before proceeding

If you accidentally trigger a dialog and lose responsiveness, inform the user they need to manually dismiss it in the browser.

## Avoid rabbit holes and loops

When using browser automation tools, stay focused on the specific task. If you encounter any of the following, stop and ask the user for guidance:
- Unexpected complexity or tangential browser exploration
- Browser tool calls failing or returning errors after 2-3 attempts
- No response from the browser extension
- Page elements not responding to clicks or input
- Pages not loading or timing out
- Unable to complete the browser task despite multiple approaches

Explain what you attempted, what went wrong, and ask how the user would like to proceed. Do not keep retrying the same failing browser action or explore unrelated pages without checking in first.

## Tab context and session startup

IMPORTANT: At the start of each browser automation session, call mcp__claude-in-chrome__tabs_context_mcp first to get information about the user's current browser tabs. Use this context to understand what the user might want to work with before creating new tabs.

Never reuse tab IDs from a previous/other session. Follow these guidelines:
1. Only reuse an existing tab if the user explicitly asks to work with it
2. Otherwise, create a new tab with mcp__claude-in-chrome__tabs_create_mcp
3. If a tool returns an error indicating the tab doesn't exist or is invalid, call tabs_context_mcp to get fresh tab IDs
4. When a tab is closed by the user or a navigation error occurs, call tabs_context_mcp to see what tabs are available`};
var lH="https://claude.ai/chrome";
var BW="fcoeoabgfenejglbffodgkkbkcdhcgfn";
function $W(){return[BW]};
async function zW(e,n){if(e.length===0)return n?.("[Claude in Chrome] No browser paths to check"),{isInstalled:!1,browser:null};let r=$W();for(let{browser:s,path:h}of e){let g=[];try{g=await XT(h,{withFileTypes:!0})}catch(w){if(Ht(w))continue;throw w}let b=g.filter((w)=>w.isDirectory()).filter((w)=>w.name==="Default"||w.name.startsWith("Profile ")).map((w)=>w.name);if(b.length>0)n?.(`[Claude in Chrome] Found ${s} profiles: ${b.join(", ")}`);for(let w of b)for(let R of r){let A=Lu(h,w,"Extensions",R);try{return await XT(A),n?.(`[Claude in Chrome] Extension ${R} found in ${s} ${w}`),{isInstalled:!0,browser:s}}catch{}}}return n?.("[Claude in Chrome] Extension not found in any browser"),{isInstalled:!1,browser:null}};
async function QT(e,n){return(await zW(e,n)).isInstalled};
var g_e="https://clau.de/chrome/reconnect";
var Db="com.anthropic.claude_code_browser_extension";
var eP=`${Db}.json`;
function sk(){return on("allow_claude_browser_extension")};
function pNt(e){if(!sk())return!1;if(!iJe())return t("[Claude in Chrome] Disabled: OAuth token has no scope accepted by /api/oauth/validate (needs user:profile, user:office, or user:ccr_inference; env-var and setup-token sessions default to user:inference only)"),!1;if(e===!0)return!0;if(e===!1)return!1;if(xr())return!1;if(a.CLAUDE_CODE_ENABLE_CFC===!0)return!0;if(a.CLAUDE_CODE_ENABLE_CFC===!1)return!1;if(Ce()&&!vqn())return!1;let n=le();if(n.claudeInChromeDefaultEnabled!==void 0)return n.claudeInChromeDefaultEnabled;return!1};
function Cqn(){return A6e()!==!1&&a.CLAUDE_CODE_ENABLE_CFC!==!1&&le().claudeInChromeDefaultEnabled===void 0&&Wu()&&ft()&&iJe()};
function Aqn(){let e=le();return e.cachedChromeExtensionInstalled===!0||Boolean(e.chromeExtension?.pairedDeviceId)};
function sLr(e){if(!sk())return!1;let n=Zc();if(n.shouldAutoEnable!==void 0)return n.shouldAutoEnable;return n.shouldAutoEnable=Cqn()&&(YW(e)||Aqn())&&k("tengu_chrome_auto_enable",!1),n.shouldAutoEnable};
function b$e(e){let n=[],r={};if(r4())r.CLAUDE_CHROME_PERMISSION_MODE="skip_all_permission_checks";let s=Object.keys(r).length>0;return(async()=>{let h=dmt()&&!await YT(iUe()),{cmd:g,prefixArgs:b}=QRe({pinToCurrentBinary:h}),w=await qW([g,...b,"--chrome-native-host"]);await KW(w,e)})().catch((h)=>t(`[Claude in Chrome] Failed to install native host: ${h}`,{level:"error"})),Zc().wiredThisSession=!0,{mcpConfig:{[ac]:{...lfe(),...s&&{env:r}}},allowedTools:n,systemPrompt:a.CLAUDE_CODE_DISABLE_CFC_PROMPT===!0?"":G5e(Vh())}};
function lLr(e){let n=e[ac];return n!==void 0&&n.scope==="dynamic"&&aZ(n)};
function cLr(){return Zc().wiredThisSession=!0,{systemPrompt:a.CLAUDE_CODE_DISABLE_CFC_PROMPT===!0?"":G5e(Vh())}};
function WW(){if(O()==="windows"){let n=GW(),r=a.APPDATA||bi(n,"AppData","Local");return[bi(r,"Claude Code","ChromeNativeHost")]}return JBr().map(({path:n})=>n)};
async function KW(e,n){return Br("chrome_native_host_install",async()=>{let r=WW();if(r.length===0)throw Error("Claude in Chrome Native Host not supported on this platform");let s={name:Db,description:"Claude Code Browser Extension Native Host",path:e,type:"stdio",allowed_origins:["chrome-extension://fcoeoabgfenejglbffodgkkbkcdhcgfn/",...[]]},h=_(s,null,2),g=!1,b=!1;for(let w of r){let R=bi(w,eP),A=!1,M=await nP(R,"utf-8").catch((D)=>(A=W(D),null));if(!A)g=!0;if(M===h)continue;try{if(await tP(w,{recursive:!0}),await rP(R,h),t(`[Claude in Chrome] Installed native host manifest at: ${R}`),A)b=!0}catch(D){t(`[Claude in Chrome] Failed to install manifest at ${R}: ${D}`)}}if(O()==="windows"){let w=bi(r[0],eP);VW(w)}if(b&&!g&&!n?.skipReconnectAutoOpen)cH().then((w)=>{if(w)t("[Claude in Chrome] First-time install detected, opening reconnect page in browser"),gSe(g_e).catch(d);else t("[Claude in Chrome] First-time install detected, but extension not installed, skipping reconnect")}).catch((w)=>t(`[Claude in Chrome] Failed to check extension installation during manifest install: ${w}`,{level:"error"}))})};
function VW(e){let n=QBr();for(let{browser:r,key:s}of n){let h=`${s}\\${Db}`;Je("reg",["add",h,"/ve","/t","REG_SZ","/d",e,"/f"]).then((g)=>{if(g.code===0)t(`[Claude in Chrome] Registered native host for ${r} in Windows registry: ${h}`);else t(`[Claude in Chrome] Failed to register native host for ${r} in Windows registry: ${g.stderr}`)})}};
async function qW(e){let n=O(),r=bi(we(),"chrome"),s=n==="windows"?bi(r,"chrome-native-host.bat"):bi(r,"chrome-native-host"),h=n==="windows"?`@echo off
REM Chrome native host wrapper script
REM Generated by Claude Code - do not edit manually
${e.map((b)=>`"${b.replaceAll("%","%%")}"`).join(" ")}
`:`#!/bin/sh
# Chrome native host wrapper script
# Generated by Claude Code - do not edit manually
exec ${Ur(e)}
`;if(await nP(s,"utf-8").catch(()=>null)===h){if(n!=="windows")await ZT(s,493).catch((b)=>t(`[Claude in Chrome] Could not repair wrapper exec bit: ${b}`,{level:"error"}));return s}if(await tP(r,{recursive:!0}),await rP(s,h),n!=="windows")await ZT(s,493);return t(`[Claude in Chrome] Created Chrome native host wrapper script: ${s}`),s};
function YW(e){return cH().then((r)=>{if(!r)return;if(le().cachedChromeExtensionInstalled!==r)Ae((h)=>({...h,cachedChromeExtensionInstalled:r}),e)}).catch((r)=>t(`[Claude in Chrome] Failed to check extension installation during cache refresh: ${r}`,{level:"error"})),le().cachedChromeExtensionInstalled??!1};
async function cH(){let e=JT();if(e.length===0)return t(`[Claude in Chrome] Unsupported platform for extension detection: ${O()}`),!1;return QT(e,t)};
return {sk,pNt,Cqn,Aqn,sLr,vqn,YW,cH,QT,zW,$W,BW,lH,g_e,Db,eP,qT,u$e,YT,NW,FW,G5e,b$e,lLr,cLr,WW,KW,VW,qW,LW};}
export function module6(ports){const WK=ports.get("chunk-a5b8yq96.js","WK");const fn=ports.get("chunk-nankzm0s.js","fn");
function iJe(){return tA(fn()?.scopes)};
function tA(e){return Array.isArray(e)&&(e.includes(WK)||e.includes("user:office")||e.includes("user:ccr_inference"))};
return {iJe,tA};}
export function module7(ports){
var WK="user:profile";
return {WK};}
export function module8(ports){
var c8t="https://clau.de/chrome/permissions";
return {c8t};}
export function module9(ports){const Ce=ports.get("chunk-bn3p37gv.js","Ce");const sk=ports.get("chunk-09m4fzsj.js","sk");
var Ker={name:"chrome",description:"Open Claude in Chrome settings",availability:["claude-ai"],isEnabled:()=>!Ce()&&sk(),policyGate:{policy:"allow_claude_browser_extension"},type:"local-jsx"};
var L8t=Ker;
return {Ker,L8t};}
export function module10(ports){
var ac="claude-in-chrome";
var t="--claude-in-chrome-mcp";
function lfe(){return{type:"stdio",command:process.execPath,args:ports.sourceEntryArgs(t),scope:"dynamic"}};
return {ac,t,lfe};}
export function module11(ports){const y=ports.get("chunk-9d2ykxmy.js","y");const m=ports.get("chunk-9d2ykxmy.js","m");
async function Br(e,r,u){try{let o=await r();return y(e),o}catch(o){throw m(e,u?.(o)??"error"),o}};
return {Br};}
