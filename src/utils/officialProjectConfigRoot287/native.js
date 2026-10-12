// Generated complete original accessors/config-tree declarations and exact preAction statements.
function unit0(ports){
const n=ports["n"];
function Co(){return n().host.launchOptions.projectConfigRoot()};
function reo(e){n().host.launchOptions.replaceProjectConfigRoot(e)};
return {Co,reo};}
function unit1(ports){
const jS=ports["jS"];
const SR=ports["SR"];
const ca=ports["ca"];
const Ln=ports["Ln"];
function kl(t){return Ln(t)||ca(t)||SR(t)||jS(t)};
return {kl};}
function unit2(ports){
const Co=ports["Co"];
const lr=ports["lr"];
const bs=ports["bs"];
const ap=ports["ap"];
const ET=ports["ET"];
const owe=ports["owe"];
const BRn=ports["BRn"];
const URn=ports["URn"];
const yX=ports["yX"];
const Ht=ports["Ht"];
const E=ports["E"];
const t=ports["t"];
const rzt=ports["rzt"];
const eP=ports["eP"];
const aI=ports["aI"];
const HRn=ports["HRn"];
function WRn(e){let n=rzt(e),r=eP(),s=r===null?null:rzt(r);if(!n||!s)return n;let g=aI(e);if(g&&ap(g)===ap(s))return n;let h=ap(n),b=ap(s);if(h!==b&&h.startsWith(b+HRn))return s;return n};
async function jle(e,n){let r=Co()??n;if(r===null)return[];let s=owe(BRn()).normalize("NFC"),g=WRn(r),h=owe(r),b=[];while(!0){if(ap(h)===ap(s))break;if(b.push(ET(h,".claude",e)),g&&ap(h)===ap(g))break;let j=URn(h);if(j===h)break;h=j}let w=await Promise.all(b.map((j)=>yX(j).then(()=>({claudeSubdir:j,exists:!0}),(z)=>({claudeSubdir:j,exists:!1,error:z})))),D=[];for(let j of w){let{claudeSubdir:z}=j;if(j.exists){D.push(z);continue}let K=j.error;if(Ht(K));else if(E(K)==="ENFILE")t(`getProjectDirsUpToHome: stat ${z} hit ENFILE (system fd-table full); skipping`,{level:"error"});else throw K}return D};
function rwe(e,n,r){if(r===null||Co()!==null)return;let s=lr(r),g=bs(r);if(!s||!g||g===s)return;let h=ap(ET(s,".claude",n));if(e.some((D)=>ap(D)===h))return;let w=ET(g,".claude",n);if(!e.includes(w))e.push(w)};
return {WRn,jle,rwe};}
function unit3(ports){
const iy=ports["iy"];
const fe=ports["fe"];
function Gb(r){console.error(fe.red(r))};
function Yt(r,e="cli_error"){if(r)Gb(r);iy(e),process.exit(1);return};
return {Yt};}
function unit4(ports){
const f=ports["f"];
const c=ports["c"];
let y="exit-cause";
function iy(e,t){let n=t??process.env.CLAUDE_JOB_DIR;if(!n)return;try{f(c(n,y),e)}catch{}};
return {iy};}
function unit5(ports){

function HA(){return Object.create(null)};
function pG(e,n,r){let s=HA();if(e)for(let[g,h]of Object.entries(e))s[g]=r===void 0?{...h,scope:n}:{...h,scope:n,declaredIn:r};return s};
return {HA,pG};}
function unit6(ports){

function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
let u=new Set(["ENOENT","EACCES","EPERM","ENOTDIR","ELOOP","ENAMETOOLONG","EROFS"]);
function Ht(n){return PT(E(n))};
function PT(n){return n!==void 0&&u.has(n)};
return {Ht,E};}
export function createProjectMcpRead287(ports){const {Co,Ee,yPn,hPn,hG,TLt,t,_}=ports;const {HA,pG}=unit5({});return function readProject(n=true){const e="project";{let s=HA(),g=[],h=[],b=Ee(),w=Co()??b;while(w!==yPn(w).root)h.push(w),w=hPn(w);for(let D of h.reverse()){let j=hG(D,".mcp.json"),{config:z,errors:K}=TLt({filePath:j,expandVars:n,scope:"project"});if(!z){let he=K.filter((_e)=>!_e.message.startsWith("MCP config file not found"));if(he.length>0)t(`MCP config errors for ${j}: ${_(he.map((_e)=>_e.message))}`,{level:"error"}),g.push(...he);continue}if(z.mcpServers)Object.assign(s,pG(z.mcpServers,e,b));if(K.length>0)g.push(...K)}return{servers:s,errors:g}}}}
export function createProjectConfigRoot287(ports){
const {Co,reo}=unit0(ports);const {kl}=unit1(ports);const {Ht,E}=unit6({});const {WRn,jle,rwe}=unit2({...ports,Co,Ht,E});const {iy}=unit4(ports);const {Yt:reject}=unit3({...ports,iy});const {Jr,Kr,qr,Zo}=ports;const Yt=ports.Yt??reject;
async function validate(w){let ne=w.getOptionValue("projectConfigRoot");if(typeof ne==="string"){if(!Jr(ne)||kl(ne))return Yt("Error: --project-config-root must be an absolute local path");let M;try{M=await Kr(ne),await(await qr(M)).close()}catch{return Yt("Error: --project-config-root is not an existing directory that this user can list")}if(kl(M))return Yt("Error: --project-config-root resolves to a network location, not a local directory");reo(M)}}
function option(){return (new Zo("--project-config-root <dir>","Read project settings, .mcp.json and the .claude config trees (commands, agents, skills, workflows, routines, output-styles; --routine is refused with this flag) from this directory rather than the working directory (for a session a host starts in a worktree of it)")).hideHelp()}
return {get:Co,set:reo,validate,option,networkPath:kl,stopBoundary:WRn,projectDirs:jle,addWorktreeFallback:rwe,inaccessible:Ht,errno:E};}
