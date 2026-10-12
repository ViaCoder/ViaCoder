// Complete pinned official 2.1.287 extract lifecycle; see provenance.json.
export function createExtractGates287(ports){
const {B,Ce,H,Pvn,Ve,Vp,XIe,YU,a,aS,cje,f,gt,k,o,sS,u}=ports;
function QS(e){return e==="cited_turn"?"cited_turn":e==="contiguous"?"contiguous":"off"};
var ni=cje;
var SJe=Pvn;
var qU=/^\/v2\/ccr-sessions\/[A-Za-z0-9_-]+\/memory\/mcp$/;
var wKr="a471caf9-e559-5ad8-836c-4e5972877185";
var EKr=`${SJe}write`;
var vKr=new Set(["read","write","str_replace","append"].map((e)=>`${SJe}${e}`));
var sEn=new Set(["write","str_replace","append","delete"].map((e)=>`${SJe}${e}`));
var eE=f(()=>({attachments:H().default(!0),instruction_files:H().default(!0),first_window:B(["full","ignore_session_start_blocks"]).default("full")}));
var tE={attachments:!0,instruction_files:!0,first_window:"full"};
var nE=f(()=>B(["window","last5","none"]).default("window"));
var QU=49152;
var rE=f(()=>u({instruction:o().min(1).max(QU),every_n_turns:aS().min(1).max(100).default(5),max_turns:aS().min(1).max(8).default(4),idle_flush_s:aS().min(0).max(86400).default(120),extract_transport:B(["tools","text","tools_cached"]).default("tools"),thinking_strip:nE().catch("window"),stale_note:H().catch(!1),role_line_scan:u(eE()).default(tE),person_files_writable:H().default(!1),person_files_typed_evidence:B(["cited_turn","contiguous"]).optional(),typed_origin:B(["presume"]).optional(),cited_shared_word:B(["refuse"]).optional(),cite_span:B(["floor"]).optional()}));
var e0=f(()=>rE().extend({role_line_scan:Ve(eE()).default(tE),thinking_strip:nE()}));
function v2e(){if(!a.CLAUDE_CODE_POST_TURN_MEMORY)return null;return t0("hosted")};
function t0(e="dry_run_harness"){let r=(e==="hosted"?rE():e0()).safeParse(gt(a.CLAUDE_CODE_POST_TURN_MEMORY_CONFIG,!1));if(!r.success)return null;let s=a.CLAUDE_CODE_POST_TURN_MEMORY_SYNC;return{instruction:r.data.instruction,everyNTurns:s?1:r.data.every_n_turns,maxTurns:r.data.max_turns,idleFlushSeconds:s?0:r.data.idle_flush_s,staleNote:r.data.stale_note,sync:s,extractTransport:r.data.extract_transport,thinkingStrip:r.data.thinking_strip,roleLineScan:{attachments:r.data.role_line_scan.attachments,instructionFiles:r.data.role_line_scan.instruction_files,firstWindow:r.data.role_line_scan.first_window},personFilesWritable:r.data.person_files_writable,personFilesTypedEvidence:QS(r.data.person_files_typed_evidence),personFilesTypedStampedOnly:r.data.typed_origin!=="presume",personFilesCitedSharedWordRefused:r.data.cited_shared_word==="refuse",personFilesCiteSinceFloor:r.data.cite_span==="floor"}};
function b6t(e){if(e?.name!==ni||e.config.scope!=="dynamic"||Vp(e.config)||!("url"in e.config)||typeof e.config.url!=="string"||!sS(e.config.url))return!1;let n;try{n=new URL(e.config.url)}catch{return!1}if(n.username!==""||n.password!==""||n.hash!=="")return!1;if(qU.test(n.pathname))return n.search==="";let r=n.searchParams.getAll("toolbox_mcp_server_id");return XIe.test(n.pathname)&&r.length===1&&r[0]===wKr};
function CKr(e){return e?.find((n)=>n.name===ni)};
var dZ="anthropic/memory.caller";
var sE="anthropic/memory.pass_id";
var AKr="memextract";
function lKo(e=YU()){return{[dZ]:AKr,[sE]:e}};
function A2e(){if(v2e()!==null)return!0;if(!k("tengu_passport_quail",!1))return!1;return!Ce()||k("tengu_slate_thimble",!1)};
return {v2e,A2e,CKr,b6t,sEn,vKr,lKo,EKr};
}
