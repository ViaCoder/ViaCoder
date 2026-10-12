// Pinned complete public AppState onChange and direct dependencies. Stateful cuts reuse their canonical owners.
export function createAppStateChange287(ports){const {$Pr,$v,BKr,BWo,El,Flt,Fu,HMn,Hre,ITe,Ic,Jp,Lq,M7,MP,T5,Tpn,Vtn,Wi,Wn,XBo,YBe,YD,Z,a_t,bKe,cj,d,ds,fH,fQ,gX,gg,iue,jKr,k,kRo,o8o,oxe,pq,qP,rJe,rZ,r_n,rt,sLe,t,tJe,y3t,yR,yue,zWo}=ports;const nativeImport=ports.nativeImport;
function Tlr(e){return e!=="requesting"&&iue()};
function v(){return!pq()&&!M7()};
function Z6e({status:e,permissionMode:n,compactResult:s,compactError:i}){try{if(!Tlr(e))return;Wi({type:"system",subtype:"status",status:e,...n!==void 0&&{permissionMode:n},...s!==void 0&&{compact_result:s},...i!==void 0&&v()&&{compact_error:i}})}catch(p){d(p)}};
var P="tengu_moonlit_lobster";
function klr(){return k(P,!0)};
function uxn(e){let n=Flt()?jKr():void 0,s=rt();if(e(),n===void 0||rt()===s)return;return BKr(n,{forContextWindow:klr()}),n};
function pxn(e,n,s){return nativeImport("/$bunfs/root/chunk-9e4gwhtn.js").then(({refreshBootstrapData:i})=>i(e,n,{renderedClientData:s})).then(()=>{},(i)=>d(i))};
function J4t({newState:e,oldState:n},s,i,p,g){let c=n.toolPermissionContext.mode,f=e.toolPermissionContext.mode,S=e.proactivityLevel!==n.proactivityLevel;if(c!==f){let r=Ic(c),a=Ic(f);if(r!==a){let l=o8o({rule:"first-entry",prevMode:c,newMode:f,prevUltraplan:n.isUltraplanMode,newUltraplan:e.isUltraplanMode}),m=l.is_ultraplan_mode;if(i?.notifyMetadataChanged(l),i?.isWorkerPermissionModeRecordEnabled)i.notifyInternalMetadataChanged({worker_permission_mode:a});if(oxe(f,m),!i)Z6e({status:null,permissionMode:a})}i?.notifyPermissionModeChanged(f)}if(c!==f)fH("--permission-mode",["--inherit-permission-mode"],T5(f,e.proactivityLevel),void 0,p);if(e.toolPermissionContext!==n.toolPermissionContext)XBo();if(e.toolPermissionContext.additionalWorkingDirectories!==n.toolPermissionContext.additionalWorkingDirectories&&Vtn(e.toolPermissionContext))nativeImport("/$bunfs/root/chunk-3xgd8dv8.js").then((r)=>r.mcpClientModule().notifyMcpRootsListChanged()).catch((r)=>{t(`Failed to notify MCP servers of roots change: ${Z(r).message}`)});if(e.tasks!==n.tasks){if(i){let l=E(n),m=E(e);if(l.length!==m.length||m.some((h,A)=>h.task_id!==l[A]?.task_id))i.notifyInternalMetadataChanged({running_background_tasks:m})}let r=y(n),a=y(e);if(r.length!==a.length||a.some((l,m)=>l.task_id!==r[m]?.task_id||l.description!==r[m]?.description||l.ambient!==r[m]?.ambient))Wi({type:"system",subtype:"background_tasks_changed",tasks:a})}let C=n.toolPermissionContext.alwaysAllowRules.session,_=e.toolPermissionContext.alwaysAllowRules.session;if(C!==_){let r=_?.filter((a)=>!a.startsWith("mcp__"));i?.notifyInternalMetadataChanged({session_allow_rules:r?.length?r:null})}if(e.mainLoopModel!==n.mainLoopModel||e.mainLoopModelForSession!==n.mainLoopModelForSession||e.toolPermissionContext.mode!==n.toolPermissionContext.mode){let r=kRo(s);try{let a=YD(n),l=YD(e);if(a!==l){if(bKe(["seven_day_overage_included"]),!Wn())$Pr(s,{fromModel:a,toModel:l,requestedModel:r.requestedModel,source:r.source});BWo(l)}}catch(a){d(Z(a))}}if(e.mainLoopModel!==n.mainLoopModel){let r=e.mainLoopModel,a=uxn(()=>Jp(r)),l=rt();try{Hre(l)}catch(m){d(Z(m))}gX(l,e),sLe(),ITe(s.precompute,void 0,"model_switch",void 0,p),pxn(p,g,a),i?.notifyMetadataChanged({model:r??El()}),fH("--model",["-m"],r,void 0,p)}if(e.fotwClaim?.phase==="granted"&&n.fotwClaim?.phase!=="granted")sLe();if(!fQ(e.sessionEffort,n.sessionEffort)||e.settingsEffortTable!==n.settingsEffortTable)y3t({sessionEffort:e.sessionEffort,settingsEffortTable:e.settingsEffortTable});if(!fQ(e.sessionEffort,n.sessionEffort)){r_n(),i?.notifyMetadataChanged({effort_level:zWo(e.sessionEffort)}),gX(rt(),e);let r=e.sessionEffort;if(r.kind!=="level")fH("--effort",[],null,void 0,p);else if(typeof r.value==="string"&&$v(r.value))fH("--effort",[],r.value,void 0,p)}if(e.mainLoopModelForSession!==n.mainLoopModelForSession){let r=rt();try{Hre(r)}catch(a){d(Z(a))}if(gX(r,e),YBe()&&(e.mainLoopModelForSession===null||e.mainLoopModelForSession===void 0)&&n.mainLoopModelForSession!==null&&n.mainLoopModelForSession!==void 0&&e.mainLoopModel===n.mainLoopModel)Jp(e.mainLoopModel),i?.notifyMetadataChanged({model:e.mainLoopModel??El()})}if(e.advisorModel!==n.advisorModel)fH("--advisor",[],e.advisorModel??null,void 0,p);if(i&&e.frameUrls!==n.frameUrls&&yue()){let r=MP(e.frameUrls).map(([,a])=>a);if(r.length>0||MP(n.frameUrls).length>0)i.notifyMetadataChanged({artifacts:r.length===0?null:r.map(Tpn)})}if(i&&!R(e.activeGoal,n.activeGoal)){let r=e.activeGoal;if(i.notifyActiveGoalChanged(r),r){let{tokens_at_start:a,...l}=Rlr(r);i.notifyMetadataChanged({goal:{...l,last_reason:l.last_reason??null,met:!1}})}else i.notifyMetadataChanged({goal:null})}if(i&&(e.autoCompactWindow!==n.autoCompactWindow||e.mainLoopModel!==n.mainLoopModel||e.mainLoopModelForSession!==n.mainLoopModelForSession||e.settings!==n.settings))i.notifyAutocompactInputsChanged();if(e.verbose!==n.verbose)cj("verbose",e.verbose,p);if(e.settings!==n.settings){try{if(tJe(),rJe(),a_t(),e.settings.env!==n.settings.env&&ds())qP(),HMn()}catch(r){t(`Failed to apply settings change (clear auth caches / re-apply env): ${Z(r).message}`,{level:"error"})}if(e.settings.outputStyle!==n.settings.outputStyle)yR("output_style")}};
function T(e,n){if(e.type!=="local_bash"&&e.type!=="monitor_mcp"&&e.type!=="monitor_ws")return!1;let s=e.agentId!==void 0?n[e.agentId]:void 0;return s!==void 0&&Fu(s)};
function E(e){return Object.values(e.tasks).filter((n)=>gg(n)&&!Fu(n)&&(n.type==="local_bash"||n.type==="monitor_mcp"||n.type==="monitor_ws"||n.type==="local_agent"||n.type==="local_workflow")).map((n)=>({task_id:n.id,task_type:n.type,description:n.description,...(n.type==="local_bash"||n.type==="monitor_mcp"||n.type==="monitor_ws")&&n.agentId!==void 0&&{owner_agent_id:n.agentId},...n.type==="local_bash"&&n.kind!==void 0&&{shell_kind:n.kind},...n.type==="monitor_ws"&&n.ambient&&{ambient:!0},...T(n,e.tasks)&&{observer_owned:!0}}))};
var F=["condition","setAt","iterations","tokensAtStart","lastReason"];
function Rlr(e){return{condition:e.condition,iterations:e.iterations,set_at:e.setAt,tokens_at_start:e.tokensAtStart,...e.lastReason!==void 0&&{last_reason:e.lastReason}}};
function R(e,n){if(e===n)return!0;if(e===void 0||n===void 0)return!1;return F.every((s)=>e[s]===n[s])};
function y(e){return Object.values(e.tasks).filter((n)=>gg(n)&&!Fu(n)).map((n)=>({task_id:n.id,task_type:n.type,description:n.description,...Lq(n)&&{ambient:!0}}))};
return {J4t,Z6e,Tlr,v,E,T,y,uxn,klr,P,pxn,R,F,Rlr};}
export function createAppStateJob287(ports){const {B,C,E,FLo,H,J,Jt,OKn,O_e,P,Pg,Qe,Qr,R2,S,Si,T,Tn,U,V,Vf,W,W9e,Y,_,_A,a,d,dEe,de,f,hie,i,ih,it,j,l,o,pe,r9,se,so,t,te,tn,u,x}=ports;const nativeImport=ports.nativeImport;
function We(e){if(e===void 0||!e.kinds.includes("session_cron"))return!1;let r=e.wake;if(r===void 0)return!0;return r.fires>=1&&r.keepalive!==!0};
var Ot=/^-|^[A-Za-z][A-Za-z0-9+.-]+:\/\//;
function e9(e){return!Ot.test(e)&&!e.includes("\x00")};
function Rw(e,r){if(!r)return[];return e9(r)?[e,r]:[`${e}=${r}`]};
var E0="(ungrouped)";
var MC="(earlier)";
var Tt=64;
var xt=new Set(["pinned","ungrouped",E0,"past",MC]);
function EFt(e){return xt.has(e.toLowerCase())};
function xKn(e){return ih(e).slice(0,Tt)};
function be(e){if(e===void 0)return;let r=xKn(e);return r&&!EFt(r)?r:void 0};
class Ve{#e=new Map;#t=new Set;#r=new Set;#n=new Set;#o=new Set;peek(e){return this.#e.get(e)}invalidate(e){this.#e.delete(e)}noteAbsent(e){this.#e.delete(e),this.#t.delete(e)}noteRejected(e,r){this.#e.set(e,{mtimeKey:r,state:null})}noteParsed(e,r,n){if(this.#e.size>1000)this.#e.clear();this.#e.set(e,{mtimeKey:r,state:n}),this.#t.delete(e)}noteHit(e){this.#t.delete(e)}shouldReportTransient(e){if(this.#t.has(e))return!1;return this.#t.add(e),!0}shouldReportRecovered(e){if(this.#r.has(e))return!1;return this.#r.add(e),!0}noteCleanRead(e){this.#r.delete(e)}shouldReportPruned(e){if(this.#n.has(e))return!1;return this.#n.add(e),!0}notePruneCandidateLive(e){this.#n.delete(e)}shouldLogSidecarFallback(e){if(this.#o.has(e))return!1;return this.#o.add(e),!0}};
var Xe=new V(()=>new Ve);
var ie=()=>o().transform(_A);
var et=/^[a-f0-9]{8}$/;
var Bt=/^(cse_|session_)[A-Za-z0-9_-]{1,128}$/;
function ae(e,r){return(n)=>{if(r(n))return n;t(`[jobs] dropped malformed ${e} from persisted job state`,{level:"warn"});return}};
var Se=f(()=>u({state:o(),detail:o(),tempo:B(["active","idle","blocked"]).optional().catch(void 0),inFlight:u({tasks:C(),queued:C(),kinds:T(o()),drainableMonitors:C().int().nonnegative().optional(),wake:u({at:C().optional(),reason:o().optional(),fires:C().int().nonnegative(),keepalive:x(!0).optional()}).optional().catch(void 0)}).optional(),selfWake:H().optional().catch(void 0),fan:T(u({id:o().optional(),kind:B(["agent","workflow","shell","monitor","mcp","todo"]).optional().catch(void 0),label:o(),startedAt:C().optional(),doneAt:C().optional(),failed:H().optional(),group:o().optional()})).optional(),budget:u({spent:C(),target:C()}).optional(),tokens:C().optional(),needs_you:H().optional(),needs:o().optional(),block:u({questions:T(u({question:o(),options:T(u({label:o(),description:o()}))}))}).optional(),suggestedReply:o().optional(),needsOverlay:o().optional(),output:de(o(),o()).nullable().default(null),structuredResult:de(o(),se()).optional(),children:T(u({id:o(),href:o(),kind:B(["pr","frame"]).optional().catch(void 0),title:o().optional().catch(void 0)})).nullable().default(null),linkScanOffset:C().default(0),linkScanPath:ie().transform(ae("linkScanPath",(e)=>Qe(e)&&e.endsWith(".jsonl")&&tn(J(e,".jsonl"))!==null)).optional(),template:o(),routine:o().optional(),respawnFlags:T(o()).default([]).transform((e)=>r9(O_e(e))),bgIsolation:B(["none","worktree"]).optional().catch(void 0),providerEnv:de(o(),o()).transform((e)=>{let r=FLo(e);return r&&Qr(OKn(r,"the saved job state (state.json providerEnv)"),_A)}).optional(),sessionPermissionRules:u({allow:T(o()),deny:T(o()),addDirs:T(ie()).optional()}).optional(),memoryToggledOff:H().optional(),autoMemoryOffThisSession:H().optional(),forkSourceAlive:H().optional(),forkBoundaryAt:o().optional(),forkSessionId:o().optional(),forkParentSessionId:o().optional(),interactiveLineage:H().optional(),intent:o(),displayIntent:o().optional(),initialPrompt:o().optional(),queuedPrompt:o().optional(),name:o().optional(),nameSource:B(["user","auto","collision"]).optional().catch(void 0),color:o().optional(),sessionId:ie(),resumeSessionId:o().transform(ae("resumeSessionId",(e)=>tn(e)!==null)).optional(),daemonShort:o().transform(ae("daemonShort",(e)=>et.test(e))).optional(),cliVersion:o().optional(),cwd:ie(),createdAt:o(),updatedAt:o(),firstTerminalAt:o().nullable().default(null),lastTerminalAt:o().optional(),worktreePath:ie().optional(),worktreeBranch:o().optional(),worktreeHookBased:H().optional(),originCwd:ie().optional(),bridgeSessionId:o().transform(ae("bridgeSessionId",(e)=>Bt.test(e))).optional(),bridgeOwnerAccountUuid:o().optional(),bridgeOwnerOrganizationUuid:o().optional(),bridgeNoHistoryBackfill:H().optional(),bridgeOutboundOnly:H().optional(),bridgeSessionGroupingId:o().transform(ae("bridgeSessionGroupingId",(e)=>/^sgrp_[A-Za-z0-9_]{1,128}$/.test(e))).optional(),bridgeSessionSeq:C().transform(ae("bridgeSessionSeq",(e)=>Number.isInteger(e)&&e>=0)).optional(),backend:B(["daemon","peer","remote"]).catch("daemon").default("daemon").transform((e)=>{if(e==="daemon")return e;return t(`[jobs] coerced persisted backend '${e}' to 'daemon' \u2014 peer/remote rows are never written to disk`,{level:"warn"}),"daemon"}),sock:o().optional(),pid:C().optional(),sortOrder:C().optional(),stateSortOrder:C().optional(),group:o().optional(),pinned:H().optional(),reapedMidWorkAt:o().optional(),reapedUnsettledAt:o().optional(),deadEpochReapedAt:o().optional(),sessionIdTaken:H().optional().catch(void 0)}).transform(({needs_you:e,...r})=>{let n=r.bridgeOwnerAccountUuid!==void 0&&!dEe(r.bridgeOwnerAccountUuid)||r.bridgeOwnerOrganizationUuid!==void 0&&!dEe(r.bridgeOwnerOrganizationUuid),s=r.tempo??(e?"blocked":"idle");return{...r,...n&&{bridgeOwnerAccountUuid:void 0,bridgeOwnerOrganizationUuid:void 0},tempo:s,...r.lastTerminalAt===void 0&&i_(r.state)!==null&&s!=="active"&&{lastTerminalAt:r.firstTerminalAt||r.updatedAt}}}));
var Q="state.json";
var G=8388608;
async function ul(e,r,n){let s=r.inFlight?.kinds.includes("session_cron")===!0,p=s&&!r.selfWake&&We(r.inFlight)?{...r,selfWake:!0}:!s&&r.selfWake&&ji(r)?{...r,selfWake:void 0}:r,g=ji(p)?p.lastTerminalAt?p:{...p,lastTerminalAt:p.updatedAt}:p.lastTerminalAt!==void 0?{...p,lastTerminalAt:void 0}:p,{pinned:b,sortOrder:y,stateSortOrder:h,group:w,...z}=g,I=n?W9e(e,[Q]):void 0,v=R2();v.ownStateWriteDepth++;try{if(n&&I){let R=await n.write(I,_(z,null,2),{mode:384,parent:"mustExist"});if(!R.ok){let A=Vf(R.error);throw Object.assign(new P(`[jobs] v5 state write failed: ${it(R.error)}`,"[jobs] v5 state write failed"),A!==void 0?{code:A}:{})}}else await Tn(j(e,Q),_(z,null,2),384)}finally{v.ownStateWriteDepth--,jp(e)}};
function Nl(e){let r=E(e);if(r&&(hie.has(r)||r==="ENOENT")){t(`[jobs] state write failed (${r}): ${l(e)}`,{level:"error"});return}d(e)};
function O(){return Xe.of(U().host)};
function ye(e,r){return r?.onReadFailure==="null"?null:e?.state??null};
function jp(e){O().invalidate(e)};
async function Fr(e,r){return nt(e,r,void 0)};
async function nt(e,r,n){if(r!==void 0&&W9e(e,[Q])!==void 0)return Jt(r,e,n);let s=j(e,Q),p=j(e,"order"),m=j(e,"stateOrder"),g=j(e,"group"),b,y;try{let[w,z,I,v]=await Promise.all([te(s),te(p).catch(()=>null),te(m).catch(()=>null),te(g).catch(()=>null)]);if(!w.isFile()||w.size>G){let A=`rejected:${w.mtimeMs}:${w.size}`;if(O().peek(e)?.mtimeKey===A)return null;return t(`[jobs] skipping ${J(e)}: state.json is ${w.isFile()?`too large (${w.size} bytes)`:"not a regular file"}`,{level:"warn"}),O().noteRejected(e,A),null}let R=(A)=>A!==null&&A.isFile()&&A.size<=G;y={order:R(z),stateOrder:R(I),group:R(v)},b=`${w.mtimeMs}:${y.order?z.mtimeMs:0}:${y.stateOrder?I.mtimeMs:0}:${y.group?v.mtimeMs:0}`}catch(w){if(W(w))return O().noteAbsent(e),null;t(`[jobs] ${J(e)}: state.json stat failed \u2014 ${w instanceof Error?w.message:String(w)}`,{level:"warn"});let z=O().peek(e);if(O().shouldReportTransient(e))i("tengu_bg_state_read_transient",{errno:so(w)??S("unknown"),had_cache:z!==void 0});return ye(z,n)}let h=O().peek(e);if(h?.mtimeKey===b)return O().noteHit(e),h.state;try{let[w,z,I,v]=await Promise.all([pe(s,"utf-8"),y.order?pe(p,"utf-8").catch(()=>null):Promise.resolve(null),y.stateOrder?pe(m,"utf-8").catch(()=>null):Promise.resolve(null),y.group?pe(g,"utf-8").catch(()=>null):Promise.resolve(null)]),R=Y(w),A=Se().safeParse(R);if(!A.success)return t(`[jobs] skipping ${J(e)}: state.json schema validation failed \u2014 ${A.error.message}`,{level:"warn"}),O().noteRejected(e,b),null;let D=z!==null?Number(z):void 0,k=I!==null?Number(I):void 0,N=Se().in.shape,M=R!==null&&typeof R==="object"?Object.entries(R).filter(([re])=>!Object.hasOwn(N,re)):[],L={...Object.fromEntries(M),...A.data};if(Number.isFinite(D))L={...L,sortOrder:D};if(Number.isFinite(k))L={...L,stateSortOrder:k};if(v!==null&&v.trim())L={...L,group:v.trim()};if(L.group!==void 0)L={...L,group:be(L.group)};return O().noteParsed(e,b,L),L}catch(w){if(W(w))return O().noteAbsent(e),null;if(t(`[jobs] ${J(e)}: state.json read/parse failed \u2014 ${w instanceof Error?w.message:String(w)}`,{level:"warn"}),O().shouldReportTransient(e))i("tengu_bg_state_read_transient",{errno:so(w)??S("unknown"),had_cache:h!==void 0});return ye(h,n)}};
function at(e,r){if(r===void 0||!e.name)return!0;if(e.nameSource==="auto"||e.nameSource==="collision")return!0;return r.includes(Si(e.name))};
async function fH(e,r,n,s,p,m,g){let b=a.CLAUDE_JOB_DIR;if(!b||a.CLAUDE_CODE_SESSION_KIND!=="bg")return;await z9e(async()=>{jp(b);let y=await Fr(b,p);if(!y?.respawnFlags)return;if(g&&!g(y.respawnFlags))return;let h=[e,...r],w=(A)=>{let D=[];for(let k=0;k<A.length;k++){let N=A[k];if(h.some((M)=>N===M||N.startsWith(`${M}=`))){if(N.indexOf("=")===-1&&A[k+1]!==void 0)k++;continue}D.push(N)}if(n===null)return D;return[...D,...Rw(e,n)]},z=w(y.respawnFlags);if(z.length===y.respawnFlags.length&&z.every((A,D)=>A===y.respawnFlags[D]))return;jp(b);let I=await Fr(b,p)??y,v=I.respawnFlags??y.respawnFlags;if(g&&!g(v))return;let R=at(I,m);await ul(b,{...I,...R?s:{},respawnFlags:w(v),updatedAt:new Date().toISOString()},p).catch((A)=>{if(!W(A))Nl(A)})})};
var dt=Pg();
function z9e(e){return dt.run("own-state.json",e)};
function i_(e){if(e==="done")return"success";if(e==="failed")return"failure";if(e==="stopped")return"stopped";return null};
function rx(e){return i_(e)!==null};
function ji(e){return rx(e.state)&&e.tempo!=="active"};
return {fH,z9e,dt,jp,O,Xe,Ve,Fr,nt,Q,G,ye,Se,ie,ae,et,Bt,i_,be,xKn,Tt,EFt,xt,E0,MC,Rw,e9,Ot,at,ul,We,ji,rx,Nl};}
export function createAppStateQueue287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var n=5;
function Pg(){let r=new Map;return{run(e,i){let t=(r.get(e)??Promise.resolve()).then(()=>i()),s=t.then(()=>{},()=>{});return r.set(e,s),s.then(()=>{if(r.get(e)===s)r.delete(e)}),t},has(e){return r.has(e)},get size(){return r.size},async settle(){await Promise.all([...r.values()])},async drain(){for(let e=0;e<n;e++){let i=[...r.values()];if(i.length===0)return;await Promise.all(i)}},clearForTest(){r.clear()}}};
return {Pg,n};}
export function createAppStateJobWriteState287(ports){const {Me,U,V}=ports;const nativeImport=ports.nativeImport;
class x{inFlightSnapshot={tasks:0,queued:0,kinds:[],items:[]};inFlightSnapshotChanged=Me();pendingStructuredResult=void 0;relocatedCwd=void 0;ownStateWriteDepth=0;warnedUnknownDisabledSurface=!1;publishInFlightSnapshot(e){this.inFlightSnapshot=e;try{this.inFlightSnapshotChanged.emit()}catch{}}reset(){this.pendingStructuredResult=void 0,this.relocatedCwd=void 0,this.warnedUnknownDisabledSurface=!1,this.publishInFlightSnapshot({tasks:0,queued:0,kinds:[],items:[]})}};
var N=new V(()=>new x);
function R2(){return N.of(U().host)};
return {R2,N,x};}
export function createAppStateJobIdentity287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var d=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function tn(t){if(typeof t!=="string")return null;return d.test(t)?t:null};
return {tn,d};}
export function createAppStateJobUuid287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var ye=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function iR(e){if(typeof e!=="string")return null;return ye.test(e)?e:null};
function dEe(e){return iR(e)!==null};
return {dEe,iR,ye};}
export function createAppStateStringSanitizer287(ports){const {Ar,Nz}=ports;const nativeImport=ports.nativeImport;
function _(e){let n=e.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu,"");return n=n.replace(/[\u200B-\u200F]/g,"").replace(/[\u202A-\u202E]/g,"").replace(/[\u2066-\u2069]/g,"").replace(/[\uFEFF]/g,"").replace(/[\uE000-\uF8FF]/g,""),n};
function bf(e){let n=Nz(e);for(let r=0;r<10;r++){let t=_(n);if(t===n)return n;n=t}return n};
var E=/\p{Default_Ignorable_Code_Point}/gu;
function ih(e){return Ar(bf(e).replace(E,""))};
function Hn(e){return e.replace(/[\p{Cc}\p{Cf}\u2028\u2029]+/gu," ")};
return {Hn,ih,bf,_,E};}
export function createAppStateNameLimit287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var Kk=200;
return {Kk};}
export function createAppStateJobExpectedErrors287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var hie=new Set(["ENOSPC","EDQUOT","ENFILE","EMFILE"]);
return {hie};}
export function createAppStateProviderEnv287(ports){const {Ii}=ports;const nativeImport=ports.nativeImport;
var Qr=Ii;
return {Qr};}
export function createAppStateAttributionGate287(ports){const {a,k,ko}=ports;const nativeImport=ports.nativeImport;
var zYn="tengu_reflective_wolf";
function Flt(){let e=ko();return e.attributionAnnouncementEnabled??=a.CLAUDE_CODE_ATTRIBUTION_ANNOUNCEMENT??k(zYn,!0),e.attributionAnnouncementEnabled};
return {Flt,zYn};}
export function createAppStateAttributionOwner287(ports){const {Tt,U}=ports;const nativeImport=ports.nativeImport;
class e{pinnedFeatureValues;reminderFold;echoWireToolInputs;maxSubagentSpawnDepthFromGrowthBook;decstbmRendererEnabled;forkSubagentEnabledSource;bashFirstDescriptionTrimmed;bashFirstDescriptionTrimmedCompiledOnly;bashPromptSkillCommands;bashPromptCarriesPreShip;coordinatorReadOnlyBashEnabled;coordinatorWorkerOutputTrees;bashActFirstEnabled;defaultFileReadingLimits;suggestRolloutEnabled;sendUserFileDeferred;sessionStartWorkflowSizeGuideline;totalTokensReminderMode;totalTokensReminderBudget;totalTokensReminderAfterUserTurn;silentTurnReminderTurns;clientDataCapabilityLogged;sharedMemoryServedViaTools;tetherLiveGate;threadsEnvOptIn;keptReminderDelivery;keptReminderRetired;clearAtProbeFailures;threadsProbeFailures;displayUpdatesProbeFailures;keptReminderOkLogged;artifactReplPathEnabled;artifactPreviewBrowserSearch;artifactPreviewBrowser;sandboxedAttemptGateEnabled;commandNetworkListsOffered;replGateOn;replGateSource;replTypedEvents;replDrawShare;replConversationResumed;machinesSectionShown;workflowAuthoringSkillAvailable;attributionAnnouncementEnabled;autoModeContextEnabled;serverClassifierShadowEnabled;thirdPartyServerClassifierEnabled;userServerClassifierSwitch;shellDescription;agentProxyNote;keptDeferredToolsEnabled;segmentedTranscript;clear(){for(let o of Object.keys(this))this[o]=void 0}};
var r=new Tt(()=>new e);
function ko(){return r.of(U())};
return {ko,r,e};}
export function createAppStateJobName287(ports){const {Hn,Kk}=ports;const nativeImport=ports.nativeImport;
function a1(e){return[...e.replace(/[\x00-\x1f\x7f-\x9f]/g,"")].slice(0,Kk).join("")};
function Si(e){return a1(Hn(e.trim())).trim()};
return {Si,a1};}
export function createAppStateJobAtomic287(ports){const {E,I,K,L,P,Pe,Te,a,ee,oe,ve,x,xe}=ports;const nativeImport=ports.nativeImport;
var te=!1;
function ne(){return te};
function be(){return!1};
function wor({served:e}){if(!ne())return!1;return e?!1:be()};
var aA=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
function mTn(){return wor({served:!1})};
function EJr(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`};
function ae(e,t){return Object.assign(new P(EJr(e,t),"in-place write refused: the target has other names (a hard link)"),{code:"EMLINK",path:e})};
function hI(e){return`${e}.tmp.${Te(4).toString("hex")}`};
var se=4;
var ce=50;
var ke=Array.from({length:se-1},()=>ce);
function le(e,t,n=se-1){return!1};
var ue=128;
async function Ce(e){try{return((await I(e)).mode&ue)===0}catch{return!1}};
async function c$(e,t,n=ke){let r=!1;for(let o=0;;o++)try{return await e(),r}catch(i){if(le(i,o,n.length)){if(o===0&&t!==void 0&&await Ce(t))throw i;r=!0,await ee(n[o]);continue}throw i}};
function ps(e,t,n=K){return c$(()=>n(e,t),t)};
var fe=67108864;
var qZ=a.O_NONBLOCK;
async function de(e,t,n="darwin"){return(await We(e,t,n)).kind==="pass"};
async function We(e,t,n="darwin"){if(n!=="win32")return{kind:"pass"};try{return{kind:(await I(e)).isFile()?"pass":"refuse"}}catch(r){if(E(r)==="ENOENT")return{kind:t?"pass":"refuse"};return{kind:"failed",error:r}}};
async function Me(e,t=!1){if(!t&&!await de(e,!0))return{kind:"unavailable"};let n;try{n=await L(e,a.O_RDONLY|(t?0:a.O_NOFOLLOW)|qZ)}catch(r){return E(r)==="ENOENT"?{kind:"absent"}:{kind:"unavailable"}}try{let r=await n.stat();if(!r.isFile()||r.size>fe)return{kind:"unavailable"};return{kind:"snapshot",bytes:new Uint8Array(await n.readFile()),mode:r.mode&4095}}catch{return{kind:"unavailable"}}finally{await n.close().catch(()=>{})}};
async function Ye(e,t,n=!1){if(!n&&!await de(e,!0))return!1;let r;try{r=await L(e,a.O_WRONLY|a.O_CREAT|a.O_TRUNC|(n?0:a.O_NOFOLLOW)|qZ,t.mode)}catch{return!1}try{if(!(await r.stat()).isFile())return await r.close().catch(()=>{}),!1;return await r.writeFile(t.bytes),await r.chmod(t.mode).catch(()=>{}),await r.close(),!0}catch{return await r.close().catch(()=>{}),!1}};
function F(e,t,n){try{if(e instanceof Error)e.message=`${e.message}; ${t!==void 0?`new contents preserved at ${t}; `:""}${n==="restored"?"original target restored":n==="removed"?"partial target removed":n==="untouched"?"target untouched":"target left partial \u2014 treat contents as torn"}`,Object.assign(e,{...t!==void 0&&{preservedTmp:t},targetOutcome:n})}catch{}return e};
function uOe(e){let t=E(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"};
class hTn extends Error{target;constructor(e){super("beforePublish refused the write; nothing was published");this.target=e;this.name="PublishRefusedError"}};
async function De(e,t){if(t===void 0)return e;try{await(await L(t,a.O_RDONLY|a.O_DIRECTORY|a.O_NOFOLLOW)).close()}catch(n){switch(E(n)){case"ENOENT":case"ELOOP":case"ENOTDIR":return e;case"EACCES":case"EPERM":if(await Ue(t))return e;throw n;default:throw n}}return xe(t,ve(e))};
async function Ue(e){let t=process.getuid?.();if(t===void 0)return!1;try{return(await I(e)).uid!==t}catch{return!1}};
var C=3;
async function me(e,t){if(t!=="win32")return!1;try{return await I(e),!0}catch(n){return E(n)==="ENOENT"?!1:{cause:n}}};
function W(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})};
async function j(e,t,n){for(let r=1;;r++){let o=hI(e),i=await me(o,t);if(i!==!1){if(r<C)continue;throw W(o,i)}try{return await n(o)}catch(s){if(E(s)==="EEXIST"&&r<C)continue;throw s}}};
async function d$(e,t,n,r="darwin"){return j(e,r,async(o)=>{try{return await oe(o,t,{encoding:"utf8",mode:n,flag:"wx"}),o}catch(i){if(E(i)!=="EEXIST")await x(o).catch(()=>{});throw i}})};
async function Be(e,t,n="darwin"){return j(e,n,async(r)=>({fh:await L(r,n==="win32"?"wx":a.O_WRONLY|a.O_CREAT|a.O_EXCL,t),tmp:r}))};
async function Tn(e,t,n,r){return Kse(e,t,{mode:n,renameFn:r})};
async function Kse(e,t,n){let{mode:r,createMode:o,exactMode:i,flush:s,followSymlinks:f,inPlaceOnTempCreateRefused:c,stagingDir:S,renameFn:w,beforePublish:g}=n,v=r??o,k=()=>{if(g!==void 0&&!g())throw new hTn(e)},y=await De(e,S),A=f===!0?0:a.O_NOFOLLOW,m,T=!1,M=!1,G=async(p)=>{let l=await Me(e,f===!0),h=l.kind==="snapshot"?l:void 0;k();let u=await L(e,a.O_WRONLY|a.O_CREAT|A|qZ,i??v),N;try{N=await u.stat()}catch(_){throw await u.close().catch(()=>{}),T=p!==void 0,F(_,p,"untouched")}let d=N.isCharacterDevice();if(!N.isFile()&&!d)throw await u.close().catch(()=>{}),Object.assign(Error("refusing the in-place arm on a non-regular target"),{code:"ENXIO",path:e});if(!d&&N.nlink>1&&mTn())throw await u.close().catch(()=>{}),ae(e,N.nlink);if(g!==void 0&&!g()){if(await u.close().catch(()=>{}),l.kind==="absent"&&N.size===0&&!d)await x(e).catch(()=>{});throw new hTn(e)}let z=!1;try{if(!d)await u.truncate(0),z=!0;await u.writeFile(t,{encoding:"utf8"});let _=d?void 0:i??(l.kind!=="absent"?r:void 0);if(_!==void 0)await u.chmod(_).catch(()=>{});if(s===!0)try{await u.sync()}catch(Y){if(!uOe(Y))throw Y}await u.close()}catch(_){if(await u.close().catch(()=>{}),!z)throw T=p!==void 0,F(_,p,"untouched");T=p!==void 0;let Ee=h!==void 0&&await Ye(e,h,f===!0)?"restored":await x(e).then(()=>!0,(ye)=>E(ye)==="ENOENT")?"removed":"partial";throw F(_,p,Ee)}let Q=p??m;if(Q!==void 0)await x(Q).catch(()=>{})};try{try{if(i!==void 0||s===!0){let l=await Be(y,i??v),h=l.fh;m=l.tmp;let u=!1,N;try{if(await h.writeFile(t,{encoding:"utf8"}),i!==void 0)try{await h.chmod(i)}catch(d){if(!uOe(d))throw d}if(s===!0)try{await h.sync()}catch(d){if(!uOe(d))throw d}}catch(d){u=!0,N=d}if(!u)M=!0;try{await h.close()}catch(d){if(!u)throw T=!0,F(d,m,"untouched")}if(u)throw N}else m=await d$(y,t,v),M=!0}catch(l){if(c!==!0)throw l;if(M)throw l;if(E(l)!=="EACCES")throw l;if(!await Pe(e).then(()=>!0,()=>!1))throw l;await G(void 0);return}if(m===void 0)throw Error("staging block exited without a staging file");let p=m;try{let l=w??K;await ps(p,e,(h,u)=>(k(),l(h,u)))}catch(l){let h=E(l);if(h===void 0||!aA.has(h))throw l;await G(p)}}catch(p){if(m!==void 0&&!T)await x(m).catch(()=>{});throw p}};
return {Tn,Kse,hTn,De,Ue,Me,de,We,qZ,fe,F,mTn,wor,ne,te,be,ae,EJr,uOe,Ye,Be,j,hI,me,C,W,d$,ps,c$,ke,se,ce,le,Ce,ue,aA};}
export function createAppStatePathSanitizer287(ports){const {}=ports;const nativeImport=ports.nativeImport;
function Ln(t){return/^[\\/]{2}/.test(t)||CD(t)};
function Sa(t){return/(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(t)};
function Rl(t){let e=/^[\\/]{2}wsl(?:\$|\.localhost)[\\/]([^\\/]*)/i.exec(t);return e!==null&&!/^\.{0,2}[. ]*$/.test(e[1]??"")};
function bR(t){if(t.startsWith("\\\\?\\UNC\\"))return"\\\\"+t.slice(8);if(t.startsWith("\\\\?\\")&&t.length>=7&&t[5]===":")return t.slice(4);return t};
function _A(t){if(AI(t)){let e=bR(t).replace(/^([\\/])[\\/]+/,"$1");for(let n=0;n<_n&&CD(e);n++){e=Xt(e).replace(/^([\\/])[\\/]+/,"$1");let r=1;while(e[r]==="?"&&e[r+1]==="?"&&(r+2===e.length||It(e[r+2]))){r+=3;while(It(e[r]))r++}e=e.slice(0,1)+e.slice(r)}return CD(e)?e.slice(0,1):e}return t};
var _n=4;
function It(t){return t==="\\"||t==="/"};
function AI(t){if(/^\\\\\?\\volume\{/i.test(t))return kt(t);if(CD(t))return!0;let e=bR(t);if(e!==t&&kt(e))return!0;return Ln(e)&&!Rl(e)};
function kt(t){return Sa(t)||t.includes("/")};
function CD(t){return Ft.test(t)||t.includes("??")&&Ft.test(Xt(t))};
var Ft=/^[\\/]\?\?[\\/]/;
function Xt(t){return tt.win32?tt.win32.normalize(t):t};
return {_A,AI,kt,Sa,CD,Ft,Xt,bR,Ln,Rl,_n,It};}
export function createAppStateJobFlags287(ports){const {Aht,B_n,KQe,Kj,Le,Tht,_A,t,xCn}=ports;const nativeImport=ports.nativeImport;
var tRe=new Set(["--exec","--model","-m","--permission-mode","--inherit-permission-mode","--proactivity","--agent","--agents","--routine","--effort","--add-dir","--mcp-config","--settings","--setting-sources","--managed-settings","--client-data-url","--system-prompt","--system-prompt-file","--append-system-prompt","--append-system-prompt-file","--system-prompt-snapshot","--append-subagent-system-prompt","--append-subagent-system-prompt-file","--fallback-model","--advisor","--channels","--watch-artifact","--watch-artifact-no-autoreact","--permission-prompt-tool","--permission-prompts","--allowed-tools","--allowedTools","--disallowed-tools","--disallowedTools","--tools","--session-id","--debug-file","-n","--name","--autocompact","--betas","--file","--max-budget-usd","--max-thinking-tokens","--max-turns","--task-budget","--plan-mode-instructions","--plugin-dir","--plugin-dir-no-mcp","--plugin-url","--rewind-files","--thinking","--thinking-display","--remote-control-session-name-prefix","--json-schema"]);
var qpt=new Set([...tRe,"--resume-session-at","--resume-drops-turn","--project-config-root"]);
var Kpt=new Set(["--allowed-tools","--allowedTools","--disallowed-tools","--disallowedTools","--tools","--mcp-config","--betas","--add-dir","--file","--channels"]);
var h=new Set(["--plugin-dir","--plugin-dir-no-mcp","--plugin-url"]);
var xFt=new Set(["--dangerously-skip-permissions","--allow-dangerously-skip-permissions","--strict-mcp-config","--dangerously-allow-browser-network-access","--restricted","--disable-slash-commands","--verbose","--reply-on-resume","--ide","--chrome","--no-chrome","--bare","--brief","--remote-control","--rc","--local"]);
var KFr=new Set(["CLAUDE_CODE_SUBAGENT_MODEL_FORCE","CLAUDE_CODE_HOST_GATEWAY_LINEAGE"]);
var YFr=[...KQe,...xCn,"CLAUDE_CODE_SUBAGENT_MODEL_FORCE"];
var a1e=new Set(["CLAUDE_CONFIG_DIR","CLAUDE_INTERNAL_FC_OVERRIDES",...YFr,"CLAUDE_CODE_CLIENT_DATA_URL",...Kj,"AWS_REGION","AWS_DEFAULT_REGION","ANTHROPIC_BEDROCK_REGION_PREFIX","AWS_PROFILE","AWS_CONFIG_FILE","AWS_SHARED_CREDENTIALS_FILE","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_CLOUD_PROJECT","GCLOUD_PROJECT","CLAUDE_SECURESTORAGE_CONFIG_DIR","CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST","CLAUDE_CODE_HOST_GATEWAY_LINEAGE"]);
function FLo(n){let i={},s=[];for(let[e,r]of Object.entries(n))if(a1e.has(e)&&(!KFr.has(e)||Le(r)))i[e]=r;else s.push(e);if(s.length===0)return n;return t(`[jobs] stripped disallowed providerEnv key(s) from persisted job state: ${s.join(", ")}`,{level:"warn"}),Object.keys(i).length>0?i:void 0};
function OKn(n,i){let{kept:s,dropped:e}=B_n(n);return e.forEach(({name:r,problem:o})=>{try{t(`[jobs] dropped environment entry ${Tht(r)} from ${i}: ${Aht[o]}.`,{level:"warn"})}catch{}}),s};
function O_e(n){let i=[],s=[];for(let e=0;e<n.length;e++){let r=n[e];if(!r.startsWith("-")){s.push(r);continue}let o=r.indexOf("="),a=o===-1?r:r.slice(0,o);if(o!==-1&&!tRe.has(a)&&xFt.has(a)){i.push(a),s.push(r);continue}let l=o===-1&&tRe.has(a),E=o===-1?xFt.has(a)||l&&n[e+1]!==void 0:tRe.has(a),c=E?i:s;if(c.push(r),l&&n[e+1]!==void 0)c.push(n[++e]);if(!E||l&&Kpt.has(a))while(n[e+1]!==void 0&&!n[e+1].startsWith("-"))c.push(n[++e])}if(s.length>0)t(`[jobs] stripped non-allowlisted respawnFlags token(s) from persisted job state: ${s.join(" ")}`,{level:"warn"});return _(i)};
function _(n){let i=[];for(let e=0;e<n.length;e++){let r=n[e],o=r.indexOf("="),a=o===-1?r:r.slice(0,o),l=[r];if(o===-1&&tRe.has(a)&&n[e+1]!==void 0){if(l.push(n[++e]),Kpt.has(a))while(n[e+1]!==void 0&&!n[e+1].startsWith("-"))l.push(n[++e])}i.push({name:a,toks:l})}let s=new Map;for(let e=0;e<i.length;e++){let r=i[e];if(tRe.has(r.name)&&!Kpt.has(r.name)&&!h.has(r.name))s.set(r.name,e)}return i.filter((e,r)=>(s.get(e.name)??r)===r).flatMap((e)=>e.toks)};
function r9(n){let i=[];for(let s=0;s<n.length;s++){let e=n[s];if(e==="--"){for(let o=s;o<n.length;o++)i.push(n[o]);break}let r=e.startsWith("--")?e.indexOf("="):-1;if(r!==-1&&(qpt.has(e.slice(0,r))||d.has(e.slice(0,r)))){i.push(e.slice(0,r+1)+p(e.slice(0,r),e.slice(r+1)));continue}if(/^-[a-zA-Z].+/.test(e)){let o=1;while(o<e.length-1&&HKn.has(`-${e[o]}`))o++;let a=`-${e[o]}`;if(e.length>o+1&&(qpt.has(a)||d.has(a))){i.push(e.slice(0,o+1)+p(a,e.slice(o+1)));continue}if(e.length===o+1&&o>1&&(qpt.has(a)||d.has(a))){if(i.push(e),qpt.has(a)&&n[s+1]!==void 0){if(i.push(p(a,n[++s])),Kpt.has(a))while(n[s+1]!==void 0&&!u(n[s+1]))i.push(p(a,n[++s]))}else if(d.has(a)&&n[s+1]!==void 0&&!u(n[s+1]))i.push(_A(n[++s]));continue}}if(i.push(e),qpt.has(e)&&n[s+1]!==void 0){if(i.push(p(e,n[++s])),Kpt.has(e))while(n[s+1]!==void 0&&!u(n[s+1]))i.push(p(e,n[++s]))}else if(d.has(e)&&n[s+1]!==void 0&&!u(n[s+1]))i.push(_A(n[++s]))}return i};
var g=new Set(["--system-prompt","--append-system-prompt","--append-subagent-system-prompt","--plan-mode-instructions","--name","-n"]);
function p(n,i){return g.has(n)?i:_A(i)};
var d=new Set(["-r","--resume"]);
var HKn=new Set(["-c","-p","-h","-v"]);
function u(n){return n.length>1&&n.startsWith("-")};
return {r9,qpt,tRe,d,p,g,HKn,Kpt,u,O_e,xFt,_,h,FLo,a1e,YFr,KFr,OKn};}
export function createAppStateFlagsPublic287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var W9o=/^$|[=\x00-\x1f\x7f-\x9f]/;
var Kj=["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_VERTEX","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_GATEWAY","ANTHROPIC_FOUNDRY_RESOURCE","ANTHROPIC_VERTEX_PROJECT_ID","ANTHROPIC_AWS_WORKSPACE_ID","ANTHROPIC_GOOGLE_CLOUD_PROJECT","ANTHROPIC_GOOGLE_CLOUD_LOCATION","ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID","CLOUD_ML_REGION"];
var KQe=["ANTHROPIC_MODEL","ANTHROPIC_DEFAULT_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_FABLE_MODEL_NAME","ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_HAIKU_MODEL","ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME","ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_OPUS_MODEL","ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_OPUS_MODEL_NAME","ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_SONNET_MODEL","ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_SONNET_MODEL_NAME","ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_SMALL_FAST_MODEL","ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION","CLAUDE_CODE_SUBAGENT_MODEL","CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT","CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT","CLAUDE_CODE_3P_PROBE_WROTE_HAIKU_DEFAULT","CLAUDE_CODE_3P_SEEDED_SONNET_DEFAULT","CLAUDE_CODE_3P_SEEDED_OPUS_DEFAULT"];
var xCn=["ANTHROPIC_CUSTOM_MODEL_OPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_NAME","ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES"];
return {KQe,xCn,Kj,W9o};}
export function createAppStateJobFlagsData287(ports){const {W9o,ia}=ports;const nativeImport=ports.nativeImport;
function T(e,n){return W9o.test(e)?"invalid-name":typeof n!=="string"?"non-string-value":n.includes("\x00")?"nul-in-value":void 0};
var Aht={"invalid-name":"it isn't a valid environment variable name","non-string-value":"its value isn't a string","nul-in-value":"its value contains a NUL character"};
function B_n(e){let n=Object.entries(e),r=n.flatMap(([o,s])=>{let i=T(o,s);return i===void 0?[]:[{name:o,problem:i}]});if(r.length===0)return{kept:e,dropped:r};let E=new Set(r.map((o)=>o.name));return{kept:Object.fromEntries(n.filter(([o])=>!E.has(o))),dropped:r}};
var N=200;
function b(e){return e===1?"1 character":`${e} characters`};
function g(e){return ia(e).slice(1,-1).replace(/[^\x20-\x7e]/g,(n)=>`\\u${n.charCodeAt(0).toString(16).padStart(4,"0")}`)};
function Tht(e){let n=e.indexOf("="),r=n===-1?e:e.slice(0,n),E=r.length>N,o=`"${g(E?r.slice(0,N):r)}"${E?"\u2026":""}`;return n===-1?o:`${o} (then '=' and ${b(e.length-n-1)}, not shown)`};
return {B_n,T,Tht,N,g,b,Aht};}
export function createAppStateModelAccess287(ports){const {n}=ports;const nativeImport=ports.nativeImport;
function Jp(e){n().modelSelection.overrideMainLoopModel(e)};
function y3t(e){n().modelSelection.replaceMainLoopEffortState(e)};
function JU(){return n().modelSelection.refusalFallbackModelLatch()};
function _3t(e){let{modelSelection:t}=n(),o=t.refusalFallbackModelLatch();if(o!==void 0)t.replaceRefusalFallbackModelLatch({...o,carriedEffort:void 0},e)};
function seo(e){n().host.modelStringsCache.recordAdmin3PSteeringSnapshot(e)};
function Wn(){return n().surfaceCapabilities.caps().workspace==="remote"};
function yR(e){n().promptAssembly.noteInvalidation(e)};
return {Jp,y3t,yR,Wn,JU,_3t,seo};}
export function createAppStateTask287(ports){const {}=ports;const nativeImport=ports.nativeImport;
function Fu(e){return e.type==="local_agent"&&"isObserver"in e&&e.isObserver===!0};
function gg(e){if(e.status!=="running"&&e.status!=="pending")return!1;if("isBackgrounded"in e&&e.isBackgrounded===!1)return!1;return!0};
function Lq(e){return e.skipTranscript===!0||e.type==="monitor_ws"&&e.ambient===!0};
return {gg,Fu,Lq};}
export function createAppStateModelRead287(ports){const {$r,Fk,Iy,Kw,Py,Rt,Yyt,bQn,pQn,uQn}=ports;const nativeImport=ports.nativeImport;
function ZHt(e){return uWt(e,"runs_turns")};
function uWt(e,n){if(e==null)return null;if(Yyt(e))return null;if(Iy(e))return e;let r=Fk(e);if(r??$r(e)){if(r===null&&n==="runs_turns")uQn(e);return e}if(r===null&&n==="runs_turns"&&pQn(e))return e;return Kw(e)};
function eDt(e,n){let r=e??Py();if(n==="plan"){let s=bQn(r);if(s!==null)return s.model}return Rt(r)};
function tDt(e){return ZHt(e.mainLoopModelForSession)??ZHt(e.mainLoopModel)??null};
function YD(e){return eDt(tDt(e),e.toolPermissionContext.mode)};
function T5(e,n){return e};
return {YD,eDt,tDt,ZHt,uWt,T5};}
export function createAppStateModelJournal287(ports){const {gWt}=ports;const nativeImport=ports.nativeImport;
function kRo(e){let n=gWt.of(e),r=n.next??{source:"auto",requestedModel:null};return n.next=void 0,r};
return {kRo};}
export function createAppStateModelEffort287(ports){const {JU,Jm,Rt,_3t,nu}=ports;const nativeImport=ports.nativeImport;
function A(e,n){return Jm(Rt(e))===Jm(Rt(n))};
function r_n(){_3t("effort_change")};
function BWo(e){let n=JU();if(n!==void 0&&!A(e,n.fallbackModel))_3t("model_change")};
function $v(e){return nu.includes(e)};
function zWo(e){return e.kind==="level"?String(e.value):null};
function fQ(e,n){return e===n||e.kind===n.kind&&(e.kind!=="level"||n.kind==="level"&&e.value===n.value)};
return {BWo,A,r_n,zWo,fQ,$v};}
export function createAppStatePermission287(ports){const {Ht}=ports;const nativeImport=ports.nativeImport;
function Ic(e){return Ht(e).external};
function o8o(e){let n=Ic(e.newMode),s=n==="plan"&&Boolean(e.newUltraplan),r=e.rule==="while-latched"?s:s&&Ic(e.prevMode)!=="plan"&&!e.prevUltraplan;return{permission_mode:n,is_ultraplan_mode:r?!0:null}};
return {Ic,o8o};}
export function createAppStateConsent287(ports){const {a}=ports;const nativeImport=ports.nativeImport;
function NUt(){return a().current?.room};
function XBo(){let e=NUt();e?.consentChanged?.(e)};
return {XBo,NUt};}
export function createAppStateRoots287(ports){const {n}=ports;const nativeImport=ports.nativeImport;
function Vtn(o){return n().publish(o)};
return {Vtn};}
export function createAppStateBridgeReport287(ports){const {Ic,Vr}=ports;const nativeImport=ports.nativeImport;
function oxe(e,r){let n=Vr(),o=n.replHandle??n.sdkHostedHandle;if(!o||o.outboundOnly)return;if(n.lastKnownPermissionMode=e,e==="bypassPermissions")return;let s=Ic(e);if(n.lastReportedPermissionMode===s)return;n.lastReportedPermissionMode=s,o.reportMetadata({permission_mode:s,...r!==void 0&&{is_ultraplan_mode:r}})};
function Hre(e){let r=Vr(),n=r.replHandle??r.sdkHostedHandle;if(!n||n.outboundOnly)return;if(r.lastKnownModel=e,r.lastReportedModel===e)return;r.lastReportedModel=e,n.reportMetadata({model:e})};
return {oxe,Hre};}
export function createAppStateBridgeEffort287(ports){const {S5n,Vr,a_n,jb,kd}=ports;const nativeImport=ports.nativeImport;
function Qee(e,r){let o=jb(e,r);return typeof o==="string"?o:null};
function E(e){let r=v();if(!r||!S5n())return;let o=Vr();if(o.lastKnownEffort=e,o.lastReportedEffort===e)return;o.lastReportedEffort=e,r.reportMetadata({effort_level:e})};
function gX(e,r){if(!v())return;let o=a_n(e,kd(r,e));E(o===void 0?null:Qee(e,o))};
function v(){let e=Vr(),r=e.replHandle??e.sdkHostedHandle;return r&&!r.outboundOnly?r:null};
return {gX,v,E,Qee};}
export function createAppStateResume287(ports){const {Aw,CEr,D,Ev,Ge,Xh,aPt,c,c0e,d,een,gpe,i,qCe,rt,sZ,u,zAo}=ports;const nativeImport=ports.nativeImport;
var F="later";
var j="Your claude.ai usage limit has reset. Continue the task you were working on when the limit was reached; do not repeat work that is already complete.";
var H="tengu_lantern_wick_resume_by_model";
var G="Your claude.ai usage is available again before the usage-limit reset. Continue the task you were working on when the limit was reached; do not repeat work that is already complete.";
function M(e){return een(e.autoContinueKeyPresence)};
var ne=2;
async function g(e,t=ne){try{e.autoContinueKeyPresence=await c0e("autoContinueAtUsageLimit",e.storageV5)}catch(o){e.autoContinueKeyPresence="unknowable",d(o)}if(e.autoContinueKeyPresence!=="unknowable")e.revocationRescan="idle",e.revocationRescanGeneration++;if(clearTimeout(e.unknowableRescanTimer),e.autoContinueKeyPresence==="unknowable"&&t>0)e.unknowableRescanTimer=setTimeout((o,n)=>{g(o,n)},e.unknowableRescanDelayMs,e,t-1),e.unknowableRescanTimer.unref?.()};
function R(e,t){e.state=t,e.changed.emit()};
function sLe(){ie(u())};
async function ie(e){if(e.state.phase!=="armed")return;if(e.confirmingMainModel){e.recheckRequestedWhileConfirming=!0;return}e.confirmingMainModel=!0;try{for(;;){if(e.recheckRequestedWhileConfirming=!1,gpe(Xh())!==null)return;let t=rt(),o=e.state,n=await zAo(t,void 0,e.storageV5);if(e.state.phase!=="armed"||h(e))return;if(e.recheckRequestedWhileConfirming||rt()!==t||e.state!==o)continue;if(n===null||!pe(n))return;re(e);return}}catch(t){d(t)}finally{e.confirmingMainModel=!1}};
function re(e){q(e,G),i("tengu_quota_auto_resume_fired",{rearm:e.consecutiveRearms,waited_ms:Math.max(0,Math.round(Date.now()-e.armedAtMs)),early:1}),e.lastObservedMs=null,R(e,{phase:"idle"}),e.events.emit("fired-now")};
function k(e,{keepIfDrained:t=!1}={}){if(e.pendingContinuationUuid===null)return!1;let o=e.pendingContinuationUuid,n=Aw((a)=>a.uuid===o).length>0;if(n||!t)e.pendingContinuationUuid=null,e.changed.emit();return n};
function W(){let e=CEr(H,rt());return e!==void 0&&e.trim()!==""?e:j};
function q(e,t=W()){k(e);let o=D();e.pendingContinuationUuid=o,e.activeTurnClaim=null,e.changed.emit(),Ev({agentId:Ge(),mode:"prompt",priority:F,value:t,uuid:o,origin:{kind:"auto-continuation"},isMeta:!0,skipSlashCommands:!0,workload:sZ})};
function me(e){if(e.episodeArmOrigin!=="auto"||M(e))return e.revocationRescan="idle",!1;if(aPt()===void 0&&e.autoContinueKeyPresence==="unknowable"){if(e.revocationRescan==="idle"){e.revocationRescan="pending";let t=++e.revocationRescanGeneration;return g(e).finally(()=>{if(e.revocationRescan==="pending"&&t===e.revocationRescanGeneration)e.revocationRescan="done"}),!1}if(e.revocationRescan==="pending")return!1}return e.revocationRescan="idle",!0};
function h(e){if(!qCe())return b(e,"killswitch"),!0;if(me(e))return b(e,"setting_off"),!0;return!1};
function b(e,t){i("tengu_quota_auto_resume_cancelled",{reason:c(t)}),v(e),R(e,{phase:"idle"}),e.events.emit(t==="horizon_exceeded"?"horizon-exceeded":t==="rearm_cap"?"cap-exhausted":"disabled")};
function v(e){e.consecutiveRearms=0,e.lastArmedResetsAtSeconds=0,e.episodeArmOrigin="dialog",e.revocationRescan="idle",e.revocationRescanGeneration++,e.takeoverUuids.clear(),e.dispatchingTakeoverUuids.clear(),e.queuedBeforeArmUuids.clear(),e.lastObservedMs=null,e.activeTurnClaim=null;let t=k(e);return e.changed.emit(),t};
function pe(e){return e.status!=="rejected"||e.isUsingOverage===!0||e.overageInUse===!0};
return {sLe,ie,h,b,v,k,R,me,M,g,ne,pe,re,q,W,H,j,F,G};}
export function createAppStatePrecomputeSidecar287(ports){const {F,SFt,Vx,Z2e,a,bFt,hR,k,vFe}=ports;const nativeImport=ports.nativeImport;
var dDe="precompact.json";
function CB(e){return bFt(vFe(e),dDe)};
function wFt(e){return vFt(vFe(e))};
function vFt(e){return e+"."+dDe};
async function Uie(e,n){let r=CB(e),s=wFt(e),g=F()&&n!==void 0?Vx(r):void 0;if(n!==void 0&&g)await n.delete(g).catch(()=>{});else await SFt(r).catch(()=>{});await SFt(s).catch(()=>{})};
function jie(){return k("tengu_amber_packet",!1)&&!Ha()};
function GZo(){return"production"};
function Ha(){return eln()!==null};
function eln(){if(GZo()==="test"&&!a.TEST_ENABLE_SESSION_PERSISTENCE)return"test_env";if(hR())return"explicit_disable";if(a.CLAUDE_CODE_SKIP_PROMPT_HISTORY)return"skip_prompt_history";if(Z2e())return"nested_marker";return null};
return {Uie,CB,dDe,wFt,vFt,jie,Ha,eln,GZo};}
export function createAppStatePrecompute287(ports){const {Cet,Uie,c,d,i,jie,q,rs,t}=ports;const nativeImport=ports.nativeImport;
function OFt(e,n,r){let s=n?.status==="ready"?n.sidecarSessionId:void 0;if(s!==void 0&&s===q())e.enqueueSidecarIo(()=>Uie(s,r),d)};
function Nan(e,n,r){i("tengu_precomputed_compact_discarded",{reason:c(n),ageMs:Math.round(performance.now()-e.startedAt),readyDurationMs:e.readyDurationMs,rehydrated:e.rehydrated===!0,preCompactTokens:e.preCompactTokens,...r!==void 0&&{querySource:rs(r)}}),t(`precomputed compact: discarded (${n}, age ${Math.round(performance.now()-e.startedAt)}ms)`)};
function ITe(e,n,r,s,g){let h=Cet(n),b=e.get(h);if(b?.status==="ready")Nan(b,r,s);b?.abortController.abort(new DOMException(r,"AbortError")),e.remove(h),OFt(e,b,g);let w=h==="main"?q():void 0;if(w!==void 0&&e.hasAttemptedRehydrate(w)&&jie())e.enqueueSidecarIo(()=>Uie(w,g),d);if(r==="subagent_exit")e.forgetSubagentTelemetry(h)};
return {ITe,Nan,OFt};}
export function createAppStateEventGate287(ports){const {k}=ports;const nativeImport=ports.nativeImport;
function iue(){return k("tengu_luminous_seal",!0)};
function S5n(){return k("tengu_copper_kestrel",!0)};
return {iue,S5n};}
export function createAppStateFrames287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var i9="opened:";
function MP(e){return Object.entries(e).filter(([t])=>!t.startsWith(i9))};
function Tpn(e){return{url:e.url,title:e.title,favicon:e.favicon,kind:"frame",updated_at:new Date(e.updatedAt).toISOString()}};
return {MP,i9,Tpn};}
export function createAppStateTrust287(ports){const {Qbe,T0,oe,um,vJe}=ports;const nativeImport=ports.nativeImport;
function ds(){if(fi())return!1;let e=oe();if(e.trustAccepted)return!0;let n=T0();if(n)e.setTrustAccepted(!0);return n};
function fi(){if(Qbe()&&!vJe())return!1;return um()===null};
return {ds,fi};}
export function createAppStateEnvProbed287(ports){const {a}=ports;const nativeImport=ports.nativeImport;
function YG(e){let[n,r]=e==="sonnet"?[a.ANTHROPIC_DEFAULT_SONNET_MODEL,a.CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT]:e==="opus"?[a.ANTHROPIC_DEFAULT_OPUS_MODEL,a.CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT]:[a.ANTHROPIC_DEFAULT_HAIKU_MODEL,a.CLAUDE_CODE_3P_PROBE_WROTE_HAIKU_DEFAULT];return n!==void 0&&n===r};
return {YG};}
export function createAppStateFastRestoreGate287(ports){const {He,Zvn,a}=ports;const nativeImport=ports.nativeImport;
function To(){if(He()!=="firstParty")return!1;return!a.CLAUDE_CODE_DISABLE_FAST_MODE};
function YBe(){return To()&&Zvn()};
return {YBe,To};}
export function createAppStateIngressGate287(ports){const {lc}=ports;const nativeImport=ports.nativeImport;
function Zvn(){return lc()!==null};
return {Zvn};}
export function createAppStateClientDataSeed287(ports){const {oe}=ports;const nativeImport=ports.nativeImport;
function BKr(e,{forContextWindow:n=!1}={}){let r=oe(),s=r.clientDataCacheKeyGetter?.();r.setClientDataWindowSeed(s===void 0?null:{key:s,data:e,forContextWindow:n})};
return {BKr};}
export function createAppStateAnsi287(ports){const {}=ports;const nativeImport=ports.nativeImport;
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
function Nz(t){if(l&&l(t))return t;return t.replace(a,"")};
var oee=/[\x00-\x08\x0E-\x1F\x7F-\x9F]/g;
function Ar(t){return t.replace(oee,"").replace(/\s+/g," ").trim()};
return {Ar,oee,Nz,l,a};}
export function createAppStateResumeProvider287(ports){const {V}=ports;const nativeImport=ports.nativeImport;
class t{#e=null;get provided(){return this.#e!==null}provide(e){this.#e=e}hasIntent(){return this.#e?.()??!1}};
var nen=new V(()=>new t);
return {nen,t};}
export function createAppStateSettingWrite287(ports){const {hn}=ports;const nativeImport=ports.nativeImport;
function cj(n,i,o){hn("userSettings",{[n]:i},void 0,o)};
return {cj};}
export function createAppStateMcpRootsV2287(ports){const {Zy,t,to}=ports;const nativeImport=ports.nativeImport;
function Hp(){for(let e of to().liveClients)e.sendRootsListChanged().catch((n)=>{t(`MCP: failed to send roots/list_changed: ${Zy(n)}`)})};
return {Hp};}
export function createAppStateMcpRootsV1287(ports){const {Zy,t,to}=ports;const nativeImport=ports.nativeImport;
function dd(){for(let e of to().liveClients)e.sendRootsListChanged().catch((r)=>{t(`MCP: failed to send roots/list_changed: ${Zy(r)}`)})};
return {dd};}
export function createAppStateEnvironmentDefaults287(ports){const {YG,a,seo}=ports;const nativeImport=ports.nativeImport;
function HMn(){seo({sonnet:a.ANTHROPIC_DEFAULT_SONNET_MODEL!==void 0&&!YG("sonnet"),opus:a.ANTHROPIC_DEFAULT_OPUS_MODEL!==void 0&&!YG("opus")})};
return {HMn};}
