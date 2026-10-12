// Exact official 2.1.287 branch; the one-pass loop preserves its continue.
export function createGetSettings287(ports){
const {qm,e,v,rt,jw,jb,kd,Btr,R_,cYe,o_e,jC,Sx,P3,N1,$J,zb,Cr,We,Ze}=ports;
return function dispatch(A){for(let once=0;once<1;once++){if(qm(e)){We(A,"get_settings is not available on this connection");continue}let j=()=>{let ue=v(),J=rt(),ie=jw(J)?jb(J,kd(ue)):void 0,be=Btr(),ve=R_().errors.filter((St)=>St.severity!=="warning").map((St)=>({file:St.file,path:St.path,message:St.message})),pt=cYe();Ze(A,{...be,remote_control_policy_lock_reason:pt??void 0,applied:{model:J,effort:typeof ie==="string"?ie:null,advisor:o_e(ue.advisorModel,J)??null,ultracode:jC(ue.ultracode,J),ultracodeRequested:ue.ultracode===!0,ultracodeAvailable:Sx(J)},errors:ve.length>0?ve:void 0})};if(cYe()!==null&&!P3()&&!N1())Cr(async()=>{await Promise.race([$J(),zb()]),j()});else j()}};
}

export function createSettingsAdvisor287(ports){
const {AE,Fn,Rt,v2,Une,BS,kh,Rh,rl,t}=ports;
function pde(e,n){if(BS())return!0;let r=kh(e),s=Rh(n);if(r===void 0||s===void 0)return!0;return r<=s}
function o_e(e,n){if(!AE()||!e)return;let r=Fn(Rt(e));if(!v2(n)){if(t(`[AdvisorTool] Skipping advisor - base model ${n} does not support advisor`),rl().claim("advisor_unranked_base_warning"))console.warn(`Warning: Advisor disabled \u2014 base model '${n}' has no advisor rank in the model catalog. Switch to a public model alias (opus, sonnet, fable) or set CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL=1.`);return}if(!Une(r)){t(`[AdvisorTool] Skipping advisor - ${r} is not a valid advisor model`);return}if(!pde(n,r)){t(`[AdvisorTool] Skipping advisor - ${r} cannot advise ${n} (advisor must be at least as capable as the base model)`);return}return t(`[AdvisorTool] Server-side tool enabled with ${r} as the advisor model`),r}
return {o_e};
}

export function createSettingsSources287({Ro,Xo,ge,tt}){
function Btr(){Ro();let e=[];for(let n of Xo()){let r=ge(n);if(r&&Object.keys(r).length>0)e.push({source:n,settings:r})}return{effective:tt(),sources:e}}
return {Btr};
}
