// Complete pinned 287 MCP attachment, declared-tool and message renderer closures; original lexical modules retained.
function module0(imports){
const Ut=imports["Ut"];
function Eet(e){e.declaredToolsDecided=!0};
function r3t(e,t){if(e.declaredTools===void 0)e.declaredTools=t;Eet(e)};
return {Eet,r3t,Ut};
}
function module1(imports){
const uf=imports["uf"];
const Uo=imports["Uo"];
const Be=imports["Be"];
function k(e,n){return Uo(e,n).value};
return {k,uf,Uo,Be};
}
function module2(imports){
const a=imports["a"];

return {a};
}
function module3(imports){
const oj=imports["oj"];
const Mt=imports["Mt"];
const a=imports["a"];
function Uxe(){return a.CLAUDE_CODE_SIMPLE};
return {Uxe,oj,Mt,a};
}
function module4(imports){
const us=imports["us"];

return {us};
}
function module5(imports){

var Fi="StructuredOutput";
var UP="WaitForMcpServers";
return {Fi,UP};
}
function module6(imports){

var Qa="ToolSearch";
return {Qa};
}
function module7(imports){
const ol=imports["ol"];

return {ol};
}
function module8(imports){
const i=imports["i"];

return {i};
}
function module9(imports){
const Wut=imports["Wut"];
const Eet=imports["Eet"];
const uf=imports["uf"];
const oj=imports["oj"];
const Mt=imports["Mt"];
const us=imports["us"];
const k=imports["k"];
const Fi=imports["Fi"];
const UP=imports["UP"];
const Qa=imports["Qa"];
const ol=imports["ol"];
const A$e=imports["A$e"];
const But=imports["But"];
const hde=imports["hde"];
const r3t=imports["r3t"];
const i=imports["i"];
const ILr=imports["ILr"];
var ZHo=`**IMPORTANT: If the Chrome browser tools are deferred (must be loaded via ToolSearch before use), load them with ToolSearch before calling them, and batch every tool you expect to need into ONE ToolSearch call (the select query accepts a comma-separated list). Do NOT load tools one at a time; each separate ToolSearch call wastes a full round-trip.**

Start a browser task whose tools are not yet loaded with a single call loading the core set:

ToolSearch with query "select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__tabs_close_mcp"

Add task-specific tools to the same call when the task obviously needs them: read_console_messages / read_network_requests for debugging, form_input for forms, gif_creator for recordings, javascript_tool for page scripting. Only issue a second ToolSearch if the task later needs a tool you did not anticipate.`;
function Mke(){return uf()};
function J5e(e){if(e.agentId&&!e.stickyBetas)return;return ILr(e.stickyBetas)};
function Qne(e,n,{servers:r,entries:s}=Zne,h){let g=new Map(n.map((X)=>[X.name,X])),b,w=()=>(b??=oj()??null,b??void 0),R=(X)=>{let J=w()?.find((te)=>Mt(te,X))?.underlyingV1ToolName;return J===void 0?void 0:g.get(J)},A=new Map,M=new Map,D=0,z=0,j=0,K=[...e];for(let X of K){let J=g.get(X)??R(X);if(J===void 0){let ce=s?.get(X),Q=r?.get(X);if(ce===void 0||ire(X,Q,w()))continue;if(ere(X,Q,w(),n))M.set(X,{entry:ce,server:Q});else{let fe=tre(X,w(),h);if(fe==="launch_omitted")M.set(X,{entry:ce,server:Q}),j++;else if(fe==="gate_off"){if(M.set(X,{entry:ce,server:Q}),D++,nre(X,w()))z++}}continue}A.set(J.name,J);let te=J.underlyingV1ToolName===void 0?void 0:g.get(J.underlyingV1ToolName);if(te!==void 0)A.set(te.name,te)}for(let X of n)if(X.underlyingV1ToolName!==void 0&&A.has(X.underlyingV1ToolName))A.set(X.name,X);for(let X of A.keys())M.delete(X);return A.size===0&&M.size===0?void 0:{held:new hde(n.filter((X)=>A.has(X.name)),{only:M,order:K}),recorded:K.length,gateOff:D,needsUser:z,launchOmitted:j}};
function Bqn(e,n,r,{latch:s,permissionContext:h}){let g=Wut(e);if(g!==void 0||e.declaredToolsDecided)return g;if(s)Eet(e);if(e.declaredTools!==void 0||!Mke())return;let b=n(),w=b===void 0?void 0:Qne(b.names,r,b,h);if(w===void 0||!s)return w?.held;return r3t(e,w.held),i("tengu_declared_tool_set_from_record",{recorded:w.recorded,held:w.held.names.length-w.held.recordedOnly.size,heldByName:w.held.recordedOnly.size,heldGateOff:w.gateOff,heldNeedsUser:w.needsUser,heldLaunchOmitted:w.launchOmitted}),w.held};
var Zne={servers:void 0,entries:void 0};
function ere(e,n,r,s){if(e===Fi)return!1;if(n!==void 0)return!0;if(us(e)!==null)return!1;if(e===UP&&!s.some((h)=>Mt(h,Qa)))return!0;return r!==void 0&&!r.some((h)=>Mt(h,e))};
function tre(e,n,r){if(r===void 0||n===void 0)return;if(e===Fi||e===UP||us(e)!==null)return;let s=n.find((h)=>h.name===e);if(s===void 0||s.isMcp===!0)return;if(!ore()||ol("hipaa"))return;if(A$e(r,s))return But(r,s)?"launch_omitted":void 0;if(s.isEnabled())return;return"gate_off"};
function nre(e,n){return n?.find((r)=>r.name===e)?.requiresUserInteraction?.()===!0};
var rre="tengu_gleaming_cupcake";
function ore(){return k(rre,!0)};
var sre="tengu_joyful_anchor";
function ire(e,n,r){if(Pg(e,n))return!1;let s=k(sre,null);if(!Array.isArray(s)||s.length===0)return!1;let h=r?.find((g)=>Mt(g,e));return s.some((g)=>typeof g==="string"&&(g===e||h!==void 0&&Mt(h,g)))};
function Pg(e,n){return n!==void 0||us(e)!==null};
return {ZHo,Mke,J5e,Qne,Bqn,Zne,ere,tre,nre,rre,ore,sre,ire,Pg,Wut,Eet,uf,oj,Mt,us,k,Fi,UP,Qa,ol,A$e,But,hde,r3t,i,ILr};
}
function module10(imports){
const iSe=imports["iSe"];
const LJ=imports["LJ"];

return {iSe,LJ};
}
function module11(imports){
const d=imports["d"];

return {d};
}
function module12(imports){

var Ox="computer-use";
return {Ox};
}
function module13(imports){
const He=imports["He"];

return {He};
}
function module14(imports){
const Fn=imports["Fn"];

return {Fn};
}
function module15(imports){
const k=imports["k"];
const He=imports["He"];
const Fn=imports["Fn"];
function uYn(e,r){let o=/^claude-([a-z]+)-(\d+(?:-\d+)*)$/.exec(e),i=o?.[1],l=o?.[2];if(!i||!l)return!1;let n=r.find(([s])=>s===i)?.[1];if(!n)return!1;let c=l.split("-").map(Number);for(let s=0;s<Math.max(c.length,n.length);s++){let f=(c[s]??0)-(n[s]??0);if(f!==0)return f>0}return!0};
var _=["claude-3-5-haiku","claude-3-haiku"];
var E=[["opus",[4,5]],["sonnet",[4,5]],["haiku",[4,5]]];
function cQ(e){if(He()!=="vertex")return!1;let r=Fn(e).replace(/[@-]\d{8}$/,"");if(/^claude-3(-|$)/.test(r))return!0;return/^claude-(opus|sonnet|haiku)-\d/.test(r)&&!uYn(r,E)};
function g(){try{let e=k("tengu_tool_search_unsupported_models",null);if(Array.isArray(e))return e}catch{}return _};
function dQ(e){let r=e.toLowerCase(),o=g();for(let i of o)if(r.includes(i.toLowerCase()))return!1;return!0};
return {uYn,_,E,cQ,g,dQ,k,He,Fn};
}
function module16(imports){

var ac="claude-in-chrome";
return {ac};
}
function module17(imports){
const wi=imports["wi"];

return {wi};
}
function module18(imports){
const Ts=imports["Ts"];

return {Ts};
}
function module19(imports){
const Pg=imports["Pg"];

return {Pg};
}
function module20(imports){
const ior=imports["ior"];

return {ior};
}
function module21(imports){
const ee=imports["ee"];

return {ee};
}
function module22(imports){
const Bqn=imports["Bqn"];
const a=imports["a"];
const Uxe=imports["Uxe"];
const s1=imports["s1"];
const Mke=imports["Mke"];
const Mt=imports["Mt"];
const Qa=imports["Qa"];
const hde=imports["hde"];
const iSe=imports["iSe"];
const d=imports["d"];
const J5e=imports["J5e"];
const Ox=imports["Ox"];
const Vh=imports["Vh"];
const dQ=imports["dQ"];
const cQ=imports["cQ"];
const Be=imports["Be"];
const kTe=imports["kTe"];
const ac=imports["ac"];
const LJ=imports["LJ"];
const ZHo=imports["ZHo"];
const wi=imports["wi"];
const Ts=imports["Ts"];
const qt=imports["qt"];
const Pg=imports["Pg"];
const ior=imports["ior"];
const ee=imports["ee"];
const Ut=imports["Ut"];
const i=imports["i"];
const ya=imports["ya"];
const Re=imports["Re"];
function Ohe(e,n){return _Ke(n)?s1(e):void 0};
function _Ke(e){if(e.systemPromptSnapshot===!1)return!1;return e.systemPromptSnapshot===!0||a.CLAUDE_CODE_SESSION_KIND==="bg"||a.CLAUDE_CODE_REMOTE||!Uxe()};
function Ca(){return Tlt()===void 0};
function Tlt(){let e=_P();if(Ut())e.offLatched="diskless";if(e.offLatched!==void 0)return e.offLatched;let n=rlo(e);if(n!==void 0&&(n==="env-disabled"||e.killSwitch!==void 0))e.offLatched=n;return n};
function rlo(e){if(a.MCP_DISCOVERY_CACHE===!1)return"env-disabled";let n=e.killSwitch?.();if(n===!1)return"kill-switch";if(a.MCP_DISCOVERY_CACHE!==!0&&n!==!0)return"not-enabled";return};
class bRt{accountResolver;lastResolvedAccountToken=void 0;killSwitch;offLatched=void 0;storage;storageV5;filePathMemo=new Map;pathWrites=Pg();#e=null;flushCleanup;admissionPurgedKeySets=new Set;eraResolver=()=>"legacy";deleteGenerationByCacheKey=new Map;readGateForTest;constructor(e){this.storage=e?.storage??new ior,this.storageV5=e?.storageV5,this.accountResolver=e?.accountResolver,this.killSwitch=e?.killSwitch}serializeWrite(e,n){let r=this.#e;if(r===null)return this.pathWrites.run(e,n);return this.pathWrites.run(e,()=>r.then(n))}async drain(e){if(this.pathWrites.size===0)return;await Promise.race([this.pathWrites.settle(),ee(e,void 0,{unref:!0})])}async dispose(e){try{await this.drain(e)}finally{this.flushCleanup?.(),this.flushCleanup=void 0}}succeed(e){if(e.pathWrites.size===0)return;let n=e.pathWrites.settle().then(()=>{if(this.#e===n)this.#e=null});this.#e=n}};
function _P(){let e=qt();if(e.discoveryCacheStore===null)e.discoveryCacheStore=new bRt;return e.discoveryCacheStore};
var wRt=`You have a computer-use MCP available (tools named \`mcp__computer-use__*\`). It lets you take screenshots of the user's desktop and control it with mouse clicks, keyboard input, and scrolling.

**Pick the right tool for the app.** Each tier trades speed/precision against coverage:

1. **Dedicated MCP for the app** \u2014 if the task is in an app that has its own MCP (Slack, Gmail, Calendar, Linear, etc.) and that MCP is connected, use it. API-backed tools are fast and precise.
2. **Chrome MCP** (\`mcp__claude-in-chrome__*\`) \u2014 if the target is a web app and there's no dedicated MCP for it, use the browser tools. DOM-aware, much faster than clicking pixels. If the Chrome extension isn't connected, ask the user to install it rather than falling through to computer use.
3. **Computer use** \u2014 for native desktop apps (Maps, Notes, Finder, Photos, System Settings, any third-party native app) and cross-app workflows. Computer use IS the right tool here \u2014 don't decline a native-app task just because there's no dedicated MCP for it.

This is about what's available, not error handling \u2014 if a dedicated MCP tool errors, debug or report it rather than silently retrying via a slower tier.

**Look before you assert.** If the user asks about app state (what's open, what's connected, what an app can do), take a screenshot and check before answering. Don't answer from memory \u2014 the user's setup or app version may differ from what you expect. If you're about to say an app doesn't support an action, that claim should be grounded in what you just saw on screen, not general knowledge. Similarly, \`list_granted_applications\` or a fresh \`screenshot\` is cheaper than a wrong assertion about what's running.

**Loading via ToolSearch \u2014 load in bulk, not one-by-one:** if computer-use tools are in the deferred list, load them ALL in a single ToolSearch call: \`{ query: "computer-use", max_results: 30 }\`. The keyword search matches the server-name substring in every tool name, so one query returns the entire toolkit. Don't use \`select:\` for individual tools \u2014 that's one round-trip per tool.

**Access flow:** before any computer-use action you must call \`request_access\` with the list of applications you need. The user approves each application explicitly, and you may need to call it again mid-task if you discover you need another application. Finder is an application like any other: clicking the desktop, the Dock, or a Finder window (including Go to Folder) requires a Finder grant. The menu bar does not, as long as the app that is frontmost is one you already have access to.

**Tiered apps:** some apps are granted at a restricted tier based on their category \u2014 the tier is displayed in the approval dialog and returned in the \`request_access\` response:
- **Browsers** (Safari, Chrome, Firefox, Edge, Arc, etc.) \u2192 tier **"read"**: visible in screenshots, but clicks and typing are blocked. You can read what's already on screen. For navigation, clicking, or form-filling, use the claude-in-chrome MCP (tools named \`mcp__claude-in-chrome__*\`; load via ToolSearch if deferred).
- **Terminals and IDEs** (Terminal, iTerm, VS Code, JetBrains, etc.) \u2192 tier **"click"**: visible and left-clickable, but typing, key presses, right-click, modifier-clicks, and drag-drop are blocked. You can click a Run button or scroll test output, but cannot type into the editor or integrated terminal, cannot right-click (the context menu has Paste), and cannot drag text onto them. For shell commands, use the Bash tool.
- **Everything else** \u2192 tier **"full"**: no restrictions.

The tier is enforced by the frontmost-app check: if a tier-"read" app is in front, \`left_click\` returns an error; if a tier-"click" app is in front, \`type\` and \`right_click\` return errors. The error tells you what tier the app has and what to do instead. \`open_application\` works at any tier \u2014 bringing an app forward is a read-level operation.

**Link safety \u2014 treat links in emails and messages as suspicious by default.**
- **Never click web links with computer-use tools.** If you encounter a link in a native app (Mail, Messages, a PDF, etc.), do NOT \`left_click\` it. Open the URL via the claude-in-chrome MCP instead.
- **See the full URL before following any link.** Visible link text can be misleading \u2014 hover or inspect to get the real destination.
- **Links from emails, messages, or unknown-sender documents are suspicious by default.** If the destination URL is at all unfamiliar or looks off, ask the user for confirmation before proceeding.
- **Inside the Chrome extension** you can click links with the extension's tools, but the suspicion check still applies \u2014 verify unfamiliar URLs with the user.

**Financial actions - do not execute trades or move money.** Budgeting and accounting apps (Quicken, YNAB, QuickBooks, etc.) are granted at full tier so you can categorize transactions, generate reports, and help the user organize their finances. But never execute a trade, place an order, send money, or initiate a transfer on the user's behalf - always ask the user to perform those actions themselves.`;
var cre=[{serverName:Ox,block:wRt}];
function vRt(e,n,r){let s=new Map,g=0,h=0;for(let _e of n){if(_e.type!=="attachment")continue;if(g++,_e.attachment.type!=="mcp_instructions_delta")continue;if(h++,Array.isArray(_e.attachment.addedBlocks)){let ke=_e.attachment.addedNames,be=_e.attachment.addedBlocks,ve=_e.attachment.addedServerInstructions;if(Array.isArray(ke))ke.forEach((Te,xe)=>{if(typeof Te!=="string")return;let Pe=Array.isArray(ve)?ve[xe]:void 0;s.set(Te,typeof be[xe]!=="string"?"":typeof Pe==="string"?Pe:void 0)})}for(let ke of wi(_e.attachment.removedNames))s.delete(ke)}let b=e.filter(Ts),w=new Set(b.map((_e)=>_e.name)),D=TMe(b,r),j=new Map;for(let _e of b)if(_e.instructions)j.set(_e.name,_e.instructions);let z=Ca(),K=[];for(let[_e,ke]of D){let be=j.get(_e)??"";if(!s.has(_e)){K.push({name:_e,block:ke,server:be});continue}let ve=s.get(_e);if(z&&be!==""&&ve!==void 0&&ve!==be)K.push({name:_e,block:ke,server:be})}let he=[];for(let _e of s.keys())if(!w.has(_e))he.push(_e);if(K.length===0&&he.length===0)return null;return i("tengu_mcp_instructions_pool_change",{addedCount:K.length,removedCount:he.length,priorAnnouncedCount:s.size,clientSideCount:r.length,messagesLength:n.length,attachmentCount:g,midCount:h}),K.sort((_e,ke)=>_e.name.localeCompare(ke.name)),{addedNames:K.map((_e)=>_e.name),addedBlocks:K.map((_e)=>_e.block),...z&&{addedServerInstructions:K.map((_e)=>_e.server)},removedNames:he.sort()}};
function TMe(e,n){let r=new Map;for(let g of e)if(g.instructions)r.set(g.name,`## ${g.name}
${g.instructions}`);let s=new Set(e.map((g)=>g.name));for(let g of n){if(!s.has(g.serverName))continue;let h=r.get(g.serverName);r.set(g.serverName,h?`${h}

${g.block}`:`## ${g.serverName}
${g.block}`)}return r};
function XFt(e){return e.isMcp===!0&&e.alwaysLoad===!0&&e.mcpInfo?.scope==="claudeai"};
function Wie(e,n,r){if(e.declaredToolsDecided||!Mke()||!n.some(XFt)||!n.some((s)=>Mt(s,Qa)))return;return new hde(n.filter((s)=>!r(s)&&!XFt(s)))};
function Srr(e,n){return Wie(e,n,iSe)};
function Xzn(e,n,r,s,g){try{return Bqn(e,()=>{let h=Ohe(n,r);return h&&{names:h.toolDescriptions.keys(),servers:h.toolServers,entries:h.toolEntries}},s,{latch:!1,permissionContext:g})??Srr(e,s)}catch(h){d(h);return}};
function BHr(e,n,r,s,g){let h=[...cre];if(Vh()&&dQ(r)&&!cQ(Be(r))&&kTe(n)&&n.some((w)=>w.mcpInfo?.serverName===ac&&LJ(w,g,n)))h.push({serverName:ac,block:ZHo});let b=vRt(e,s??[],h);if(!b)return[];return[{type:"mcp_instructions_delta",...b}]};
var cP="This is ambient context \u2014 do not narrate it to the user unless they ask or it is directly relevant to their request.";
function render(e){switch(e.type){case"mcp_instructions_delta":{let s=wi(e.addedBlocks),g=wi(e.addedNames),h=wi(e.removedNames),b=[];if(s.length>0&&g.length>0)b.push(`# MCP Server Instructions

The following MCP servers have provided instructions for how to use their tools and resources:

${s.join(`

`)}`);if(h.length>0)b.push(`The following MCP servers have disconnected. Their instructions above no longer apply:
${h.join(`
`)}`),b.push(cP);if(b.length===0)return[];return ya([Re({content:b.join(`

`),isMeta:!0})])}}}
return {declared:Xzn,latches:J5e,instructions:BHr,diff:vRt,render};
}
export function createMcpAttachments287(ports){
const m0=module0({"Ut":ports.shared["chunk-bn3p37gv.js:Ut"]});
const m1=module1({"uf":ports.shared["chunk-nankzm0s.js:uf"],"Uo":ports.shared["chunk-nankzm0s.js:Uo"],"Be":ports.shared["chunk-nankzm0s.js:Be"]});
const m2=module2({"a":ports["environment"]});
const m3=module3({"oj":ports.shared["chunk-1b21she7.js:oj"],"Mt":ports.shared["chunk-1b21she7.js:Mt"],"a":m2["a"]});
const m4=module4({"us":ports.shared["chunk-x695d2rs.js:us"]});
const m5=module5({});
const m6=module6({});
const m7=module7({"ol":ports.shared["chunk-chme4mqf.js:ol"]});
const m8=module8({"i":ports["analytics"]});
const m9=module9({"Wut":ports.shared["chunk-09m4fzsj.js:Wut"],"Eet":m0["Eet"],"uf":m1["uf"],"oj":m3["oj"],"Mt":m3["Mt"],"us":m4["us"],"k":m1["k"],"Fi":m5["Fi"],"UP":m5["UP"],"Qa":m6["Qa"],"ol":m7["ol"],"A$e":ports.shared["chunk-09m4fzsj.js:A$e"],"But":ports.shared["chunk-09m4fzsj.js:But"],"hde":ports.shared["chunk-09m4fzsj.js:hde"],"r3t":m0["r3t"],"i":m8["i"],"ILr":ports.shared["chunk-09m4fzsj.js:ILr"]});
const m10=module10({"iSe":ports.shared["chunk-5dn0d281.js:iSe"],"LJ":ports.shared["chunk-5dn0d281.js:LJ"]});
const m11=module11({"d":ports.shared["chunk-amhtwhch.js:d"]});
const m12=module12({});
const m13=module13({"He":ports.shared["chunk-wz6xag6e.js:He"]});
const m14=module14({"Fn":ports.shared["chunk-aer2x4hk.js:Fn"]});
const m15=module15({"k":m1["k"],"He":m13["He"],"Fn":m14["Fn"]});
const m16=module16({});
const m17=module17({"wi":ports.shared["chunk-h3rrxdgy.js:wi"]});
const m18=module18({"Ts":ports.shared["chunk-hrhfcbdv.js:Ts"]});
const m19=module19({"Pg":ports.shared["chunk-v8yhm36h.js:Pg"]});
const m20=module20({"ior":ports.shared["chunk-m59srz4k.js:ior"]});
const m21=module21({"ee":ports.shared["chunk-f2n7vgt8.js:ee"]});
const m22=module22({"Bqn":m9["Bqn"],"a":ports["environment"],"Uxe":m3["Uxe"],"s1":ports.shared["chunk-mphp7acd.js:s1"],"Mke":m9["Mke"],"Mt":m3["Mt"],"Qa":m6["Qa"],"hde":m9["hde"],"iSe":m10["iSe"],"d":m11["d"],"J5e":m9["J5e"],"Ox":m12["Ox"],"Vh":ports["optimistic"],"dQ":m15["dQ"],"cQ":m15["cQ"],"Be":m1["Be"],"kTe":ports.shared["chunk-mphp7acd.js:kTe"],"ac":m16["ac"],"LJ":m10["LJ"],"ZHo":m9["ZHo"],"wi":m17["wi"],"Ts":m18["Ts"],"qt":ports["mcpState"],"Pg":m19["Pg"],"ior":m20["ior"],"ee":m21["ee"],"Ut":m0["Ut"],"i":m8["i"],"ya":ports["wrapMessages"],"Re":ports["createUserMessage"]});
return m22;
}
