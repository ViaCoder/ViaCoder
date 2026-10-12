// Official npm 2.1.287 complete advisor leaves; same canonical host/state owners.
function helpers287(read){
const {GVn,BS,kh,Rh}=read("chunk-09m4fzsj.js");
const {Be,Rt,b_}=read("chunk-nankzm0s.js");
function A5e(e){return`${b_(Rt(e))} as the advisor bills to usage credits, which need to be set up for your account.`}
function pde(e,n){if(BS())return!0;let r=kh(e),s=Rh(n);if(r===void 0||s===void 0)return!0;return r<=s}
function r$e(e,n){return Be(Rt(e))===Be(Rt(n))}
function dut(e){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r===void 0||r.type!=="attachment"||r.attachment.type!=="advisor_tool")continue;let s=GVn().safeParse(r.attachment);if(!s.success)continue;return s.data.available?{available:!0,model:s.data.model,toolChange:s.data.toolChange!==void 0,byBase:!1}:{available:!1,model:s.data.model,toolChange:s.data.toolChange!==void 0,byBase:s.data.byBase===!0}}return}
return {dut,r$e,A5e,pde};
}
function attachment287(read){

function U7t(e){if(e===void 0)return;return{model:e.model,viaToolChange:e.toolChange}}
return {U7t};
}
function mutation287(read,helpers,attachment){
const {Ia,pr}=read("chunk-2ynta9xc.js");
const {Fn}=read("chunk-aer2x4hk.js");
const {cut,z5,V6,v2,r9e}=read("chunk-09m4fzsj.js");
const {i}=read("chunk-6hnyhakg.js");
const {S}=read("chunk-n4qghq20.js");
const {Et,W3}=read("chunk-nankzm0s.js");
const {d}=read("chunk-amhtwhch.js");
const {hn}=read("chunk-f1vb7bx7.js");
const {en}=read("chunk-6re9qmwv.js");
const {RL,ly,Ei}=read("chunk-bn3p37gv.js");
const {pde,dut,r$e,A5e}=helpers;
const {U7t}=attachment;
function Yyr(o,n=!1){return`${A5e(o)} Run /model fable${n?" in an interactive terminal session":""} to review and enable, then set it as the advisor.`}
function HVe(o,n,u,f,t=!0,m=!1,s=[]){let l=Ia(),e=o==="off"?void 0:Fn(o),a=e===void 0||cut(e);if(i("tengu_advisor_command",{advisor:e===void 0?S("off"):a?Et(o):z5(e)?S("consent_pending"):S("invalid"),remote:l}),!l&&pr())return"The advisor can't be changed from this client \u2014 this connection is view-only or has no control channel";let c=l?" (this session only)":t?"":" for this session \u2014 run /advisor in the terminal to change your default";if(e===void 0){if(u((r)=>r.advisorModel===void 0?r:{...r,advisorModel:void 0}),l)pr()?.sendControlRequest({subtype:"apply_flag_settings",settings:{advisorModel:null}}).catch(d);else if(b(""),t)hn("userSettings",{advisorModel:void 0},void 0,f);return`Advisor disabled${c}${h(s,void 0,n)}`}if(!a){if(z5(e))return Yyr(e,m);let r=[...V6(),"off"].join(", ");return`${en(W3(e))} cannot be used as an advisor. Valid options: ${r}`}if(u((r)=>r.advisorModel===e?r:{...r,advisorModel:e}),l)pr()?.sendControlRequest({subtype:"apply_flag_settings",settings:{advisorModel:e}}).catch(d);else if(b(e),t)hn("userSettings",{advisorModel:e},void 0,f);let v=en(W3(e)),g=en(W3(n)),p=`Advisor set to ${v}${c}`;if(!v2(n))p+=`
Note: the current main model (${g}) does not support the advisor. It will activate when you switch to a supported main model.`;else if(!pde(n,e))p+=`
Note: ${v} is less capable than the current main model (${g}), so the advisor will not activate. Choose a more capable advisor, or switch to a smaller main model.`;return p+h(s,e,n)}
function h(o,n,u){let f=Ei(),t=f.advisorHeld??U7t(dut(o));if(t===void 0)return"";if(t.refused)return n===void 0?"":`
The API refused the advisor for the current conversation, so it runs without one until /clear or /compact; the setting applies from there and in new conversations.`;let m=r9e(f,u);if(t.model===void 0&&m)return"";if(t.viaToolChange&&(m||t.inFallback!==!0&&t.model!==void 0))return t.model!==void 0&&n!==void 0&&!y(n,t.model)?`
The current conversation keeps ${en(W3(t.model))} as its advisor model until /clear or /compact, so the tool it has already declared stays unchanged; turning the advisor on or off applies right away.`:"";let s=dut(o),l=s!==void 0&&!s.available&&s.toolChange&&!s.byBase,e=t.standby===!0&&s===void 0,a=l||e?void 0:t.model;if(a===n||a!==void 0&&n!==void 0&&y(n,a))return"";return`
The current conversation ${a===void 0?"runs without the advisor":`keeps ${en(W3(a))} as its advisor`} until /clear or /compact, so the prompt it has already sent stays unchanged; the new setting applies from there and in new conversations.`}
function y(o,n){return r$e(o,n)}
function b(o){RL({...ly()??{},advisorModel:o})}
return {HVe,b,h,y,Yyr};
}
function call287(read,mutation){
const {AE,V6}=read("chunk-09m4fzsj.js");
const {Hz,dR}=read("chunk-amhtwhch.js");
const {en}=read("chunk-6re9qmwv.js");
const {W3}=read("chunk-nankzm0s.js");
const {qJ}=read("chunk-scey49m3.js");
const {HVe}=mutation;
async function f(t,e){if(!AE())return{type:"text",value:"The advisor is not available"};let r=`Usage: /advisor <${[...V6(),"off"].join("|")}>`,o=t.trim().toLowerCase();if(!o||Hz.includes(o)||dR.includes(o)){let s=e.getAdvisorSetting();return{type:"text",value:`${s?`Advisor: ${en(W3(s))}`:"Advisor: off"}
${r}`}}let a=!qJ(e);return{type:"text",value:HVe(o==="unset"?"off":o,e.options.mainLoopModel,e.setAppState,e.storageV5,a,!0,e.getMessages?.()??e.messages??[])}}
return {f};
}
function registration287(read,loadAdvisor287){
const {V6,AE}=read("chunk-09m4fzsj.js");
const {Ce}=read("chunk-bn3p37gv.js");
var lWe={type:"local",name:"advisor",supportsNonInteractive:!0,description:"Let Claude consult a stronger model at key moments",get argumentHint(){return`[${[...V6(),"off"].join("|")}]`},isEnabled:()=>Ce()&&AE(),get isHidden(){return!Ce()||!AE()},load:()=>loadAdvisor287()};
return {lWe};
}
export function createAdvisorOriginalCall287(read){const helpers=helpers287(read),attachment=attachment287(read),mutation=mutation287(read,helpers,attachment);return call287(read,mutation).f}
export function createAdvisorOriginalRegistration287({Ce,AE,V6,loadAdvisor287}){return registration287(file=>file==="chunk-bn3p37gv.js"?{Ce}:{AE,V6},loadAdvisor287).lWe}
