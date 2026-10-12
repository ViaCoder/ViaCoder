// Generated from fixed official 2.1.287 raw; see provenance.json.
// No storage backend or session state is created here.
export function createDreamPolicySource287(ports){
const {o0,Na,Gr,kl,CG,N_t,oz,JQe,C,ic,dt,Jr,co,O8n,BC,No,VUt,dI,Ue,wt,Ot,Sn,$a,Ce}=ports;
const f=Gr;
var L4r=new Set([".git","hooks",".husky",".githooks","node_modules",".vscode",".idea","head","config","objects","refs",".claude","skills","commands","agents",".cargo",".devcontainer",".yarn",".mvn"]),G6t=/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/,N4r=new RegExp(G6t,"g");
function Pc(e){return c(e,!0)}
function c(e,o){let n=e.toLowerCase().replace(/\u0131/g,"i").replace(/\u017f/g,"s"),t=n.replace(N4r,"");return(o?t.replace(/:.*$/,""):t).replace(/[. ]+$/,"")||n}
function F4r(e){return!1}
function aK(e,o,n){let t=e.slice(o.length).split(f),i=t.length-1;for(let r=0;r<t.length;r++){let s=Pc(t[r]);if(L4r.has(s)||F4r(s))return!0;if(r===i&&n?.has(s))return!0}return!1}
function fE(e){return!o0(e)||e.length<3||/^[A-Za-z]:$/.test(e)||kl(e)||e.includes("\x00")}
function nK(e,n=N_t()){if(n===null||!n.endsWith(Gr)||fE(n.replace(/[/\\]+$/,"")))return!1;let r=Na(e);if(!r.startsWith(n))return!1;return!aK(r,n)}
var J=null,Le=null,W=null,xHn="rm|remove-item|ri|del|erase",Je=new RegExp(`^(?:${xHn})$`,"i");
function Qe(e,r){let n=e.trim().match(/"[^"]*"|'[^']*'|\S+/g)??[];if(n.length<2)return;if(!Je.test(n[0]))return;let s=[];for(let o=1;o<n.length;o++){let u=n[o];if(/^-(?:Literal)?Path$/i.test(u))continue;if(u.startsWith("-"))return;let g=u.startsWith('"')&&u.endsWith('"')||u.startsWith("'")&&u.endsWith("'")?u.slice(1,-1):u;if(/[*?[\]$`(){}|;&<>"',]/.test(g))return;if(!Grt(g,r))return;s.push(g)}return s.length>0?s:void 0}
async function Ze(e,r){let n=await CG(e);if(n.kind!=="simple")return;if(n.commands.length!==1)return;let s=n.commands[0];if(!s)return;if(s.argv[0]!=="rm")return;if(s.redirects.length>0)return;if(s.envVars.length>0)return;let o=[],u=!1;for(let g=1;g<s.argv.length;g++){let f=s.argv[g];if(f===void 0)continue;if(!u){if(f==="--"){u=!0;continue}if(f.startsWith("-")){if(f==="-f"||f==="--force")continue;return}}if(/[*?[]/.test(f))return;if(!f.startsWith("/")||!Grt(f,r))return;o.push(f)}return o.length>0?o:void 0}
function Grt(e,r){return e.endsWith(".md")&&nK(e,r)}
function PHn(e,r,{fork:n="dream",onWriteAllowed:s}={}){return async(o,u,g,f,h)=>{if(oz())return C(o,JQe);if(o.name===ic)return{behavior:"allow",updatedInput:u};if(o.name===dt||o.name===Jr||o.name===co){let M=g.getAppState().toolPermissionContext,S=O8n(o,u,M);if(S)return C(o,S.message);if(M.blockReadsOutsideWorkingDirectories===!0){let w=BC(o,u,M);if(w.behavior==="deny"){let b=o.getPath?.(u),Y=No(e).map((F)=>F.endsWith(Ce)?F:F+Ce);if(!(b!==void 0&&!VUt()&&No(b).every((F)=>Y.some((j)=>nK(F,j))))||w.decisionReason.type!=="other"||w.decisionReason.reason!==dI)return C(o,w.message)}}return{behavior:"allow",updatedInput:u}}if(o.name===Ue||o.name===wt){let M=o.inputSchema.safeParse(u);if(M.success){if(o.isReadOnly(M.data))return{behavior:"allow",updatedInput:u};let b=M.data.command;if(typeof b==="string"){if((o.name===Ue?await Ze(b,e):Qe(b,e))!==void 0)return{behavior:"allow",updatedInput:u}}}let S=o.name===Ue;return C(o,`Only read-only shell commands and ${S?"rm (no flags except -f)":"Remove-Item"} of .md files under ${e} (not protected subdirectories like .git or agents) are permitted in this context (${S?"ls, find, grep, cat, stat, wc, head, tail, and similar":"Get-ChildItem, Get-Content, Select-Object -First/-Last, and similar"})`)}if((o.name===Ot||o.name===Sn)&&"file_path"in u){let M=u.file_path;if(typeof M==="string"&&Grt(M,e))return s?.(M,h),{behavior:"allow",updatedInput:u}}let R=$a()?Ue:wt;return C(o,`only ${dt}, ${Jr}, ${co}, read-only ${R}, and ${Ot}/${Sn} within ${e} are allowed`)}}
return {PHn,Ze,Qe,Grt,nK,xHn};
}
export function settleDreamWrites287(N,F,j){
let _=new Set([...N].filter(([b])=>!j||!F.has(b)).map(([,b])=>b)),U=new Set([...N].filter(([b])=>j&&F.has(b)).map(([,b])=>b));
return {dreamWrote:_,mayHaveWritten:U};
}
