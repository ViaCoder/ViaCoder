// Complete original staging creation/identity registration and gitignore publication; same canonical atomic registry.
import {join as builtin0} from "node:path";
import {homedir as builtin1} from "node:os";
import {isAbsolute as builtin2} from "node:path";
import {dirname as builtin3} from "node:path";
import {mkdir as builtin4} from "node:fs/promises";
import {readFile as builtin5} from "node:fs/promises";
import {appendFile as builtin6} from "node:fs/promises";
import {writeFile as builtin7} from "node:fs/promises";
import {resolve as builtin8} from "node:path";
import {closeSync as builtin9} from "node:fs";
import {openSync as builtin10} from "node:fs";
import {constants as builtin11} from "node:fs";
import {lstatSync as builtin12} from "node:fs";
import {unlinkSync as builtin13} from "node:fs";
import {mkdirSync as builtin14} from "node:fs";
import {rmdirSync as builtin15} from "node:fs";
import {fstatSync as builtin16} from "node:fs";
function module0(imports){

var bL=".cc-writes";
return {bL};
}
function module1(imports){

function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
return {E};
}
function module2(imports){
const oe=imports["oe"];
const J7r=imports["J7r"];
const Je=imports["Je"];
const Ve=imports["Ve"];
const vt=imports["vt"];
const Lt=imports["Lt"];
const a=imports["a"];
const $r=imports["$r"];
const xr=imports["xr"];
const kr=imports["kr"];
const t=imports["t"];
const Mr=imports["Mr"];
const E=imports["E"];
const Ur=imports["Ur"];
async function Rtr(e,n){let{code:r}=await Je("git",["check-ignore","--",e],{preserveOutputOnError:!1,cwd:n});return r===0};
async function Gr(e){let{stdout:n,code:r}=await Je("git",["config","--global","--get","core.excludesfile"],{preserveOutputOnError:!1,cwd:e});return Wr(r===0?n:"")};
function Wr(e){let n=e.trim();if(n){if(n==="~"||n.startsWith("~/"))return Ve(vt(),n.slice(2));if(Lt(n))return n}let r=a.XDG_CONFIG_HOME;if(r&&Lt(r))return Ve(r,"git","ignore");return Ve(vt(),".config","git","ignore")};
async function xtr(e,n=oe()){try{if(!await J7r(n))return{written:!1,effective:!1};let r=e.replaceAll("\\","/"),s=`**/${r}`,g=r.endsWith("/")?`${r}sample-file.txt`:r;if(await Rtr(g,n))return{written:!1,effective:!0};let h=await Gr(n),R=$r(h);await xr(R,{recursive:!0});try{if((await kr(h,{encoding:"utf-8"})).includes(s)){let b=await wt(g,n)?"already_tracked":"excludesfile_not_read";return t(`[gitignore] '${s}' already present in ${h} but git check-ignore reports not-ignored \u2014 ${Ht(b,g)}`,{level:"warn"}),{written:!1,effective:!1,reason:b}}await Mr(h,`
${s}
`)}catch(I){if(E(I)==="ENOENT")await Ur(h,`${s}
`,"utf-8");else throw I}if(!await Rtr(g,n)){let I=await wt(g,n)?"already_tracked":"excludesfile_not_read";return t(`[gitignore] wrote '${s}' to ${h} but git check-ignore still reports not-ignored \u2014 ${Ht(I,g)}`,{level:"warn"}),{written:!0,effective:!1,reason:I}}return{written:!0,effective:!0}}catch(r){return t(`Failed to add gitignore entry to global gitignore: ${r instanceof Error?r.message:String(r)}`,{level:"error"}),{written:!1,effective:!1}}};
async function wt(e,n){let{code:r}=await Je("git",["ls-files","--error-unmatch","--",e],{preserveOutputOnError:!1,cwd:n});return r===0};
function Ht(e,n){return e==="already_tracked"?`'${n}' is tracked in the index; gitignore rules do not apply to tracked files`:"core.excludesfile may point elsewhere"};
return {Rtr,Gr,Wr,xtr,wt,Ht};
}
function module3(imports){
const Qe=imports["Qe"];
const bL=imports["bL"];
const Ee=imports["Ee"];
const tP=imports["tP"];
const cr=imports["cr"];
const we=imports["we"];
const Zn=imports["Zn"];
const Hr=imports["Hr"];
const Cr=imports["Cr"];
const Ft=imports["Ft"];
const Pa=imports["Pa"];
const Vo=imports["Vo"];
const ms=imports["ms"];
const E=imports["E"];
const Is=imports["Is"];
const pee=imports["pee"];
const Ba=imports["Ba"];
const XO=imports["XO"];
const t=imports["t"];
const p=imports["p"];
const Wm=imports["Wm"];
const F8o=imports["F8o"];
const RZe=imports["RZe"];
const xtr=imports["xtr"];
const y=imports["y"];
const m=imports["m"];
function OE(e){return Qe(e,".claude",bL)};
function fB(e=!0){let r=new Set;if(r.add(OE(Ee())),e)r.add(OE(tP()));r.add(OE(cr())),r.add(Qe(we(),bL));let n=Zn("localSettings");if(n)r.add(Hr(Cr(n),bL));return[...r]};
function BE(e){Ba(Cr(e),{recursive:!0}),Ba(e,{recursive:!0,mode:448})};
function Rm(e){try{return Pa(Vo(Cr(e),ms.O_RDONLY|ms.O_DIRECTORY|ms.O_NOFOLLOW)),!0}catch(r){let n=E(r);return n!=="ELOOP"&&n!=="ENOTDIR"}};
function pB(){for(let r of fB(!Ft())){if(!Rm(r))continue;let n=!1;try{if(!Is(r).isDirectory()){if(!Rm(r))continue;pee(r),BE(r),n=!0}else try{Pa(Vo(r,ms.O_RDONLY|ms.O_DIRECTORY)),n=!0}catch{try{if(!Rm(r))continue;XO(r),BE(r),n=!0}catch{}}}catch{try{if(!Rm(r))continue;BE(r),n=!0}catch(s){t(`ensureAtomicWriteStagingDirs: failed to create ${r}: ${s}`),p("sandbox_exec","atomic_write_staging_dir_create_failed")}}try{let s=Vo(r,ms.O_RDONLY|ms.O_DIRECTORY|ms.O_NOFOLLOW);try{let h=Wm(s);F8o(r,h.dev,h.ino,s)}catch(h){throw Pa(s),h}}catch(s){if(n)RZe(`Staging dir ${r} was just established but identity-record open failed (${E(s)??s})`)}}let e=mB();if(!e.stagingDirGitignoreFired)e.stagingDirGitignoreFired=!0,xtr(`.claude/${bL}/`,Ee()).then((r)=>{if(!r.written)return;if(r.effective)y("gitignore_global_rule");else if(r.reason==="already_tracked")p("gitignore_global_rule",r.reason);else m("gitignore_global_rule",r.reason??"write_ineffective")})};
var Uee;
function mB(){return Uee??={osLinkedRootRealpaths:new Map,stagingDirGitignoreFired:!1}};
return {OE,fB,BE,Rm,pB,Uee,mB};
}
export function createAtomicStaging287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"oe":ports["cwd"],"J7r":ports["inGitRepo"],"Je":ports["exec"],"Ve":builtin0,"vt":builtin1,"Lt":builtin2,"a":ports["environment"],"$r":builtin3,"xr":builtin4,"kr":builtin5,"t":ports["debug"],"Mr":builtin6,"E":m1["E"],"Ur":builtin7});
const m3=module3({"Qe":builtin8,"bL":m0["bL"],"Ee":ports["originalCwd"],"tP":ports["cwd"],"cr":ports["projectRoot"],"we":ports["configHome"],"Zn":ports["settingsPath"],"Hr":builtin0,"Cr":builtin3,"Ft":ports["remoteWorkspace"],"Pa":builtin9,"Vo":builtin10,"ms":builtin11,"E":m1["E"],"Is":builtin12,"pee":builtin13,"Ba":builtin14,"XO":builtin15,"t":ports["debug"],"p":ports["sad"],"Wm":builtin16,"F8o":ports["record"],"RZe":ports["tampered"],"xtr":m2["xtr"],"y":ports["ok"],"m":ports["bad"]});
return {"ensure":m3.pB,"directories":m3.fB,"state":m3.mB,"publishGitignore":m2.xtr};
}
