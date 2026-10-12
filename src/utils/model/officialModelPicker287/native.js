// Exact selected 2.1.287 model-picker declarations; external owners are explicit ports.
export function createModelPicker287({vwe,hse,xa,OU,xm,Bu,Sj,eIe,Be,od,RS,Sr,Eq,t_e,ft,Wp,Ct}){
function Or(e){let n=vwe().latest_per_family[e],r=hse.find((g)=>g===n),s=r&&xa(r),h=s&&OU[s.provider_ids.first_party];if(r===void 0||s===void 0||h===void 0)throw Error("model-catalog.json: latest_per_family must name a models[] entry that has a CATALOG_ID_TO_KEY line in configs.ts");return{id:r,displayName:s.display_name,key:h}}
function fM(e){return{sonnet:xm,opus:Bu,haiku:Sj,fable:eIe}[e]()}
function el(e){return Be(fM(e))===Or(e).id}
var Qu="Efficient for routine tasks";
var tl="Best for everyday, complex tasks";
var Ph="Fastest for quick answers";
var ed="Most capable for your hardest and longest-running tasks";
var D3={sonnet:{label:"Sonnet",slogan:Qu,descriptionForModel:"efficient for routine tasks. Generally recommended for most coding tasks",suffix:(e)=>Sr(e,!1)},opus:{label:"Opus",slogan:tl,descriptionForModel:"best for everyday, complex tasks",suffix:Sr},fable:{label:"Fable",slogan:ed,descriptionForModel:"most capable for your hardest and longest-running tasks",suffix:Ih}};
var ZS=" \xB7 Requires usage credits";
function ss(e,n=!1){let{id:r,displayName:s,key:h}=Or(e),g=D3[e],b=od()&&el(e)?e:RS()[h],w=b===e?fM(e):r;return{value:b,label:g.label,description:`${s} \xB7 ${g.slogan}${g.suffix(w,n)}`,descriptionForModel:`${s} - ${g.descriptionForModel}`}}
function Ih(){return!Eq()&&t_e()?ZS:""}
function N3(e,n){let r=pM(e)??Or("fable").displayName,s=ft()?"":Sr(e,n);return{value:"fable",label:"Fable",description:`${r} \xB7 ${ed}${s}${Ih()}`,descriptionForModel:`${r} - most capable for your hardest and longest-running tasks`}}
function F3(e){let n=pM(e);if(n===void 0)return{...ss("fable"),value:e};return{value:e,label:n,description:`${n} \xB7 ${ed}${Ih()}`,descriptionForModel:`${n} - most capable for your hardest and longest-running tasks`}}
function pM(e){let n=xa(Ct(Be(e,{identity:!0})));return n?.family==="fable"?n.display_name:void 0}
function Y3(e=!1,n=!0){return{value:!od()?RS().opus46+"[1m]":"claude-opus-4-6[1m]",label:"Opus 4.6 (1M context)",description:`Opus 4.6 for long sessions${n?Sr("claude-opus-4-6",e):""}`,descriptionForModel:"Opus 4.6 with 1M context window - for long sessions with large codebases"}}
function nM(e=!1){let n=!od(),{id:r,displayName:s,key:h}=Or("opus");return{value:n?RS()[h]+"[1m]":"opus[1m]",label:"Opus (1M context)",description:`${s} for long sessions${Sr(r,e)}`,descriptionForModel:`${s} with 1M context window - for long sessions with large codebases`}}
return {latest:Or,aliasModel:fM,isLatest:el,familyOption:ss,fableOption:N3,customFableOption:F3,opusOneMillionOption:Y3,opusAliasOneMillionOption:nM};
}

// Complete original e8 declaration closure; every source import is supplied by the live application adapter.
export function createOfficialE8Chooser287(ports){
const {$r,AQn,Be,Bu,Cj,Ct,EF,El,Eq,Fn,GF,He,JBe,Jbn,Js,Kb,Kqr,Ny,OU,Poe,Py,RS,Rt,Ry,Sj,W3,Wp,Xh,Yw,_pe,a,bj,eIe,er,fQn,ft,gU,ho,hse,ir,j3,k,kL,kbe,mQn,mpe,od,qbn,t_e,t_t,tt,vwe,wF,wWt,xa,xm,ype,zd}=ports;
var Qu="Efficient for routine tasks";
var tl="Best for everyday, complex tasks";
var Ph="Fastest for quick answers";
var ed="Most capable for your hardest and longest-running tasks";
function I3(e){return qbn(e!=="env"&&Kqr()?"enforced":e)}
function Xu(e){if(ft())return{value:null,label:"Default (recommended)",description:AQn(e)};let{setting:n,attribution:r}=j3(),s=!od(),h=kbe(e,n)&&Ry(n),g=r==="tier"?Sr(h?n:Rt(n),h):"";return{value:null,label:s?"Default":"Default (recommended)",description:`Use the default model (currently ${W3(n)})${g}${I3(r)}`}}
function Ch(){return!od()||GF()||!Js()}
function VS(){return Kb(Bu())}
function qS(){return Kb(xm())}
function Or(e){let n=vwe().latest_per_family[e],r=hse.find((g)=>g===n),s=r&&xa(r),h=s&&OU[s.provider_ids.first_party];if(r===void 0||s===void 0||h===void 0)throw Error("model-catalog.json: latest_per_family must name a models[] entry that has a CATALOG_ID_TO_KEY line in configs.ts");return{id:r,displayName:s.display_name,key:h}}
function fM(e){return{sonnet:xm,opus:Bu,haiku:Sj,fable:eIe}[e]()}
function el(e){return Be(fM(e))===Or(e).id}
function Oh(e,n,r,s){let h=r===void 0?t_t(e):void 0,g=(n==="Sonnet"||n==="Opus")&&zd(e);return{label:r??h??e,description:s??(h!==void 0?`Custom ${n} model (${e})`:`Custom ${n} model${g?" (1M context)":""}`)}}
function XO(){let e=a.ANTHROPIC_DEFAULT_SONNET_MODEL;if(Ch()&&e){let n=zd(e);return{value:"sonnet",...Oh(e,"Sonnet",a.ANTHROPIC_DEFAULT_SONNET_MODEL_NAME,a.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION),descriptionForModel:`${a.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION??`Custom Sonnet model${n?" with 1M context":""}`} (${e})`}}}
function Sr(e,n){return wWt(kbe(n,e),e)}
var D3={sonnet:{label:"Sonnet",slogan:Qu,descriptionForModel:"efficient for routine tasks. Generally recommended for most coding tasks",suffix:(e)=>Sr(e,!1)},opus:{label:"Opus",slogan:tl,descriptionForModel:"best for everyday, complex tasks",suffix:Sr},fable:{label:"Fable",slogan:ed,descriptionForModel:"most capable for your hardest and longest-running tasks",suffix:Ih}};
function ss(e,n=!1){let{id:r,displayName:s,key:h}=Or(e),g=D3[e],b=od()&&el(e)?e:RS()[h],w=b===e?fM(e):r;return{value:b,label:g.label,description:`${s} \xB7 ${g.slogan}${g.suffix(w,n)}`,descriptionForModel:`${s} - ${g.descriptionForModel}`}}
function JO(){return{value:!od()?RS().sonnet46:"claude-sonnet-4-6",label:"Sonnet 4.6",description:"Sonnet 4.6 \xB7 Legacy",descriptionForModel:"Sonnet 4.6 - previous Sonnet version"}}
function QO(){return{value:!od()?RS().sonnet5:"claude-sonnet-5",label:"Sonnet 5",description:"Sonnet 5 \xB7 Previous Sonnet version",descriptionForModel:"Sonnet 5 - previous Sonnet version"}}
function ZO(){let e=a.ANTHROPIC_DEFAULT_FABLE_MODEL;if(Ch()&&e)return{value:"fable",...Oh(e,"Fable",a.ANTHROPIC_DEFAULT_FABLE_MODEL_NAME,a.ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION),descriptionForModel:`${a.ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION??"Custom Fable model"} (${e})`}}
var ZS=" \xB7 Requires usage credits";
function Ih(){return!Eq()&&t_e()?ZS:""}
function eM(){let e=a.ANTHROPIC_DEFAULT_OPUS_MODEL;if(Ch()&&e){let n=zd(e);return{value:"opus",...Oh(e,"Opus",a.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME,a.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION),descriptionForModel:`${a.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION??`Custom Opus model${n?" with 1M context":""}`} (${e})`}}}
function $3(){return{value:RS().opus41,label:"Opus 4.1",description:"Opus 4.1 \xB7 Legacy",descriptionForModel:"Opus 4.1 - legacy version"}}
function U3(){return{value:!od()?RS().opus46:"claude-opus-4-6",label:"Opus 4.6",description:"Opus 4.6 \xB7 Legacy",descriptionForModel:"Opus 4.6 - previous Opus version"}}
function G3(){return{value:!od()?RS().opus47:"claude-opus-4-7",label:"Opus 4.7",description:"Opus 4.7 \xB7 Legacy",descriptionForModel:"Opus 4.7 - previous Opus version"}}
function K3(){return{value:!od()?RS().opus48:"claude-opus-4-8",label:"Opus 4.8",description:"Opus 4.8 \xB7 Legacy",descriptionForModel:"Opus 4.8 - previous Opus version"}}
function q3(){return{value:!od()?RS().opus5:"claude-opus-5",label:"Opus 5",description:"Opus 5 \xB7 Previous Opus version",descriptionForModel:"Opus 5 - previous Opus version"}}
function tM(){return{value:!od()?RS().sonnet46+"[1m]":"claude-sonnet-4-6[1m]",label:"Sonnet 4.6 (1M context)",description:`Sonnet 4.6 for long sessions${Sr("claude-sonnet-4-6",!1)}`,descriptionForModel:"Sonnet 4.6 with 1M context window - for long sessions with large codebases"}}
function XS(){let{id:e,displayName:n}=Or("sonnet"),r={value:"sonnet[1m]",label:`${n} (1M context)`,descriptionForModel:`${n} with 1M context window - for long sessions with large codebases`};if(ft())return{...r,description:`${n} for long sessions`};return{...r,description:`${n} for long sessions${Sr(e,!1)}`}}
function Y3(e=!1,n=!0){return{value:!od()?RS().opus46+"[1m]":"claude-opus-4-6[1m]",label:"Opus 4.6 (1M context)",description:`Opus 4.6 for long sessions${n?Sr("claude-opus-4-6",e):""}`,descriptionForModel:"Opus 4.6 with 1M context window - for long sessions with large codebases"}}
function nM(e=!1){let n=!od(),{id:r,displayName:s,key:h}=Or("opus");return{value:n?RS()[h]+"[1m]":"opus[1m]",label:"Opus (1M context)",description:`${s} for long sessions${Sr(r,e)}`,descriptionForModel:`${s} with 1M context window - for long sessions with large codebases`}}
function rM(){let e=a.ANTHROPIC_DEFAULT_HAIKU_MODEL;if(Ch()&&e)return{value:"haiku",...Oh(e,"Haiku",a.ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME,a.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION),descriptionForModel:`${a.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION??"Custom Haiku model"} (${e})`}}
function oM(){let e=Sj(),n=Yw(e)??"Haiku";return{value:"haiku",label:"Haiku",description:`${n} \xB7 ${Ph}${Sr(e,!1)}`,descriptionForModel:`${n} - fastest for quick answers. Lower cost but less capable than Sonnet.`}}
function tw(){if(ir()==="pro"&&k("tengu_gypsum_kite",!1))return" \xB7 ~2\xD7 usage vs Sonnet";return""}
function nw(e=!1){let{id:n,displayName:r}=Or("opus"),s=e?Sr(n,!1):"";return{value:"opus",label:"Opus",description:`${r} \xB7 ${tl}${tw()}${s}`}}
function lM(){let e=!od(),n=ft()?" \xB7 Draws from usage credits":"",r=n===""?"":Sr("claude-sonnet-4-6",!1);return{value:e?RS().sonnet46+"[1m]":"claude-sonnet-4-6[1m]",label:"Sonnet 4.6 (1M context)",description:`Sonnet 4.6 with 1M context${n}${r}`}}
function cM(){let e=ft()?" \xB7 Draws from usage credits":"",{id:n,displayName:r}=Or("opus"),s=e===""?"":Sr(n,!1);return{value:"opus[1m]",label:"Opus (1M context)",description:`${r} with 1M context${tw()}${e}${s}`}}
function rw(e=!1,n=!1){let r=!od(),s=Bu(),h=Wp(Fn(s))??"Opus",g=e?Sr(s,n):"";return{value:r?RS()[Or("opus").key]+"[1m]":"opus[1m]",label:"Opus (1M context)",description:`${h} with 1M context \xB7 ${tl}${tw()}${g}`,descriptionForModel:`${h} with 1M context - best for everyday, complex tasks`}}
function mM(){return{value:"sonnet",label:"Sonnet",description:`${Wp(Fn(xm()))??"Sonnet"} \xB7 ${Qu}`}}
function uM(){return{value:"haiku",label:"Haiku",description:`${Yw(Sj())??"Haiku"} \xB7 ${Ph}`}}
function JS(e,n,r){let s=Ah(Py()),h=(s==="opus"||s==="sonnet")&&s!==r?[s,r]:[r];for(let g of h)J3(e,g,n);return e}
function J3(e,n,r){let s=n==="opus"&&ype(Bu());if(e.some((g)=>g.value===n||s&&g.value===`${n}[1m]`))return;let h=n==="sonnet"?Q3():Z3(r);e.splice(e.findIndex((g)=>g.value===null)+1,0,h)}
function Q3(){let e=ft();if(el("sonnet"))return e?mM():ss("sonnet");let n=xm(),r=Wp(Fn(n))??"Sonnet";return{value:"sonnet",label:"Sonnet",description:`${r} \xB7 ${Qu}`,descriptionForModel:`${r} - efficient for routine tasks`}}
function Z3(e){let n=ft();if(ype(Bu()))return rw(!n,e);if(el("opus"))return n?nw(!1):ss("opus",e);let r=Bu(),s=Wp(Fn(r))??"Opus",h=n?"":Sr(r,e);return{value:"opus",label:"Opus",description:`${s} \xB7 ${tl}${h}`,descriptionForModel:`${s} - best for everyday, complex tasks`}}
function e8(e=!1){if(ft()){if(Jbn()){let w=[Xu(e)];if(!bj()&&wF()&&!VS())w.push(cM());if(w.push(mM()),EF()&&!qS())w.push(el("sonnet")?XS():lM());return w.push(uM()),JS(w,e,"opus")}let b=[Xu(e)];if(EF()&&!qS())b.push(el("sonnet")?XS():lM());if(ype(Bu()))b.push(rw());else if(b.push(nw(!1)),wF()&&!VS())b.push(cM());return b.push(uM()),JS(b,e,"sonnet")}if(od()){let b=[Xu(e)],w=eM();if(w!==void 0)b.push(w);else if(!bj()&&wF()&&!VS())b.push(nM(e));let R=XO();if(R!==void 0)b.push(R);else if(el("sonnet")){if(b.push(ss("sonnet")),EF()&&!qS())b.push(XS())}else{if(pr(Or("sonnet").key))b.push(ss("sonnet"));if(pr("sonnet5"))b.push(QO());if(b.push(JO()),EF())b.push(tM())}b.push(rM()??oM());let A=ZO();if(A!==void 0)vi(b,A);else if(GF()&&pr(Or("fable").key))vi(b,ss("fable"));return JS(b,e,"opus")}let n=[Xu(e)],r=XO();if(r!==void 0)n.push(r);else{if(pr(Or("sonnet").key))n.push(ss("sonnet"));if(pr("sonnet5"))n.push(QO());if(pr("sonnet46")){if(n.push(JO()),EF())n.push(tM())}}let s=eM();if(s!==void 0)n.push(s);else{if(pr("opus41"))n.push($3());let b=Or("opus").key;if(pr(b)){if(n.push(ss("opus")),wF()&&!Kb(RS()[b]))n.push(nM())}if(pr("opus5"))n.push(q3());if(pr("opus48"))n.push(K3());if(pr("opus47"))n.push(G3());if(pr("opus46")){if(n.push(U3()),wF())n.push(Y3(e))}}let h=rM();if(h!==void 0)n.push(h);else if(pr("haiku45")||pr("haiku35"))n.push(oM());let g=ZO();if(g!==void 0||pr(Or("fable").key))vi(n,g??ss("fable"));return n}
function pr(e){let n=ho[e];if(n[He()]!==null)return!0;return Boolean(tt().modelOverrides?.[n.firstParty])}
function Ju(e){let n=Wp(e);if(!n)return null;let r=Be(e),s=null;if(r.includes("fable"))s={alias:"Fable",aliasModel:eIe(),slogan:ed};else if(r.includes("sonnet"))s={alias:"Sonnet",aliasModel:xm(),slogan:Qu};else if(r.includes("opus"))s={alias:"Opus",aliasModel:Bu(),slogan:tl};else if(r.includes("haiku"))s={alias:"Haiku",aliasModel:Sj(),slogan:Ph};if(!s)return{value:e,label:n,description:`Custom model (${e})`};let h=Wp(s.aliasModel),g=Object.values(ho).map((w)=>Be(w.firstParty)),b=g.indexOf(r);if(h&&b!==-1&&b<g.indexOf(Be(s.aliasModel))&&$r(s.aliasModel))return{value:e,label:n,description:`Newer version available \xB7 select ${s.alias} for ${h}`};return{value:e,label:n,description:`${s.slogan} (${e})`}}
function gM(){return!(er()||{}).availableModels&&gU().size===0&&!mQn()}
function yM(e,n,r){if(typeof n.value!=="string")return r?.(),null;let s=Ct(n.value);if(!Ny(s)||!od())return r?.(),null;let h=fQn(s);if(h===null)return r?.(),null;let g=n.value!==s,b=s==="opus"?wF():s==="sonnet"?EF():!0,R=(g||s==="opus"&&ype(h))&&b&&Poe(h)?`${h}[1m]`:h,A=Be(h,{identity:!0}),M=R!==h;if(e.some((D)=>D!==n&&D.value!==null&&Ct(D.value)!==D.value===M&&Be(Ct(D.value),{identity:!0})===A&&$r(D.value)))return null;if(Ju(R)===null)return r?.(),null;return R}
function Ai(e){return e==="fable"||e==="fable[1m]"||mpe(e)}
function vi(e,n){if(!(typeof n.value==="string"&&Ai(n.value))){e.push(n);return}let r=e.findIndex((K)=>K.value===null);if(r===-1){e.splice(0,0,n);return}let s=Ah(El()),h=e[r+1]?.value,g=e[r+1],b=typeof h==="string"&&g!==void 0?yM(e,g):null,w=(K)=>b!==null&&Be(Ct(K),{identity:!0})===Be(Ct(b),{identity:!0})&&Ct(K)!==K===(Ct(b)!==b)&&$r(K),R=Xh()??kL()??null,A=typeof R==="string"&&w(R)||(er()?.availableModels??[]).some((K)=>w(K.trim()))||JBe().some((K)=>typeof K.value==="string"&&w(K.value))||Cj().some((K)=>typeof K.value==="string"&&w(K.value))||(_pe()?.picker.options??[]).some((K)=>w(K.model.trim())),M=typeof h==="string"&&(gM()||$r(h)||b!==null&&!A),D=typeof h==="string"&&Ny(Ct(h))?Ah(h):null,z=new Set;if(D!==null){if(z.add(D),!M&&s!==null)z.add(s)}else if(s!==null)z.add(s);let j=r+1;while(j<e.length){let K=e[j]?.value;if(typeof K!=="string")break;let X=Ah(K);if(X!==null&&z.has(X)||Ai(K))j++;else break}e.splice(j,0,n)}
function Ah(e){let n=e.toLowerCase();if(n.includes("fable"))return"fable";if(n.includes("opus"))return"opus";if(n.includes("sonnet"))return"sonnet";if(n.includes("haiku"))return"haiku";return null}
return e8;
}

// Complete original s_e/f8 menu assembly closure. e8 and quota decisions bind to their unique existing owners.
export function createOfficialModelMenu287(ports){
const {$H,$r,$x,AQn,Be,Bu,Cj,Ct,D9o,EF,El,Eq,Fn,Gj,Gyt,He,JBe,Js,KQ,KZr,Kb,Kqr,LJn,LM,N,Ny,OU,Obe,Poe,RS,Rt,Ry,Sj,TQn,VQe,VWt,W3,Wp,Xh,Xw,YQn,ZPe,ZX,_pe,a,aWt,bF,bY,bpe,c8,dpe,e8,eIe,er,fQn,ft,gA,gQn,gU,ho,hse,iWt,ir,j3,k,kL,kbe,kp,le,mQn,mU,mpe,oQn,od,pWt,ppe,qE,qbn,sQn,t,t_e,t_t,vwe,wF,wWt,xa,xm,ype,zd}=ports;
function wke(){return t_e()||KZr()}
function e3(){return ir()==="enterprise"&&!VWt()}
function ude(){if(e3())return!0;let e=ir();if(e===null)return!1;return ZX().includes(e)}
function vO(){return k("tengu_saffron_picker_dim",!1)}
function AO(){let e=le().cachedExtraUsageDisabledReason;return e==="org_level_disabled"||e==="overage_not_provisioned"}
function SS(){let e=LJn();if(e!==null)return e;if(!ft())return!1;let n=ir();if(n==="max"||n==="pro")return!0;return YQn()}
var WO="tengu-model-error-overrides";
var KS={};
function M3(e){return N(e)?e:KS}
function KO(e,n){if(typeof n!=="string"||n==="")return;let r=M3(e)[n];return typeof r==="object"&&r!==null?r:void 0}
function VO(e){return YO(e?.block)}
function qO(e){let n=KO(Xw(WO,KS),e),r=VO(n);if(r===null)return null;return YO(n?.pickerHint)??r}
function YO(e){if(typeof e!=="string")return null;let n=e.trim();return n===""?null:n}
function vh({catalog:e,provenance:n}){let r=[],s=new Set,h=(A)=>{if(A===""||s.has(A))return!1;return s.add(A),!0},g=pWt(e),b=new Map;for(let A of iWt){let M=g[A];if(M!==void 0)b.set(kp(M),A)}let w=qE(e),R=n==="served"?[...w.filter((A)=>!sQn(A)),...w.filter(sQn)]:w;for(let A of R){let M=kp(A.id);if(!h(M))continue;r.push({provenance:n,key:M,row:A,selectable:Gyt(e,A),family:aWt(A),aliasFamily:b.get(M)})}return r}
var Qu="Efficient for routine tasks";
var tl="Best for everyday, complex tasks";
var Ph="Fastest for quick answers";
var ed="Most capable for your hardest and longest-running tasks";
function I3(e){return qbn(e!=="env"&&Kqr()?"enforced":e)}
function Xu(e){if(ft())return{value:null,label:"Default (recommended)",description:AQn(e)};let{setting:n,attribution:r}=j3(),s=!od(),h=kbe(e,n)&&Ry(n),g=r==="tier"?Sr(h?n:Rt(n),h):"";return{value:null,label:s?"Default":"Default (recommended)",description:`Use the default model (currently ${W3(n)})${g}${I3(r)}`}}
function Or(e){let n=vwe().latest_per_family[e],r=hse.find((g)=>g===n),s=r&&xa(r),h=s&&OU[s.provider_ids.first_party];if(r===void 0||s===void 0||h===void 0)throw Error("model-catalog.json: latest_per_family must name a models[] entry that has a CATALOG_ID_TO_KEY line in configs.ts");return{id:r,displayName:s.display_name,key:h}}
function fM(e){return{sonnet:xm,opus:Bu,haiku:Sj,fable:eIe}[e]()}
function el(e){return Be(fM(e))===Or(e).id}
function Sr(e,n){return wWt(kbe(n,e),e)}
var D3={sonnet:{label:"Sonnet",slogan:Qu,descriptionForModel:"efficient for routine tasks. Generally recommended for most coding tasks",suffix:(e)=>Sr(e,!1)},opus:{label:"Opus",slogan:tl,descriptionForModel:"best for everyday, complex tasks",suffix:Sr},fable:{label:"Fable",slogan:ed,descriptionForModel:"most capable for your hardest and longest-running tasks",suffix:Ih}};
function ss(e,n=!1){let{id:r,displayName:s,key:h}=Or(e),g=D3[e],b=od()&&el(e)?e:RS()[h],w=b===e?fM(e):r;return{value:b,label:g.label,description:`${s} \xB7 ${g.slogan}${g.suffix(w,n)}`,descriptionForModel:`${s} - ${g.descriptionForModel}`}}
var ZS=" \xB7 Requires usage credits";
function Ih(){return!Eq()&&t_e()?ZS:""}
function L3(e){if(e.disabled===!0||typeof e.value!=="string")return e;let n=$x(Fn(e.value));if(!(e.value==="fable"||e.value==="fable[1m]"||n===VQe||n===D9o))return e;let s=e.description.endsWith(ZS)?e.description.slice(0,-ZS.length):e.description;return{...e,description:`${s}${Ih()}`}}
function N3(e,n){let r=pM(e)??Or("fable").displayName,s=ft()?"":Sr(e,n);return{value:"fable",label:"Fable",description:`${r} \xB7 ${ed}${s}${Ih()}`,descriptionForModel:`${r} - most capable for your hardest and longest-running tasks`}}
function F3(e){let n=pM(e);if(n===void 0)return{...ss("fable"),value:e};return{value:e,label:n,description:`${n} \xB7 ${ed}${Ih()}`,descriptionForModel:`${n} - most capable for your hardest and longest-running tasks`}}
function pM(e){let n=xa(Ct(Be(e,{identity:!0})));return n?.family==="fable"?n.display_name:void 0}
function tw(){if(ir()==="pro"&&k("tengu_gypsum_kite",!1))return" \xB7 ~2\xD7 usage vs Sonnet";return""}
function nw(e=!1){let{id:n,displayName:r}=Or("opus"),s=e?Sr(n,!1):"";return{value:"opus",label:"Opus",description:`${r} \xB7 ${tl}${tw()}${s}`}}
function rw(e=!1,n=!1){let r=!od(),s=Bu(),h=Wp(Fn(s))??"Opus",g=e?Sr(s,n):"";return{value:r?RS()[Or("opus").key]+"[1m]":"opus[1m]",label:"Opus (1M context)",description:`${h} with 1M context \xB7 ${tl}${tw()}${g}`,descriptionForModel:`${h} with 1M context - best for everyday, complex tasks`}}
function X3(){return{value:"opusplan",label:"Opus Plan Mode",description:"Use Opus in plan mode, Sonnet otherwise"}}
function Ju(e){let n=Wp(e);if(!n)return null;let r=Be(e),s=null;if(r.includes("fable"))s={alias:"Fable",aliasModel:eIe(),slogan:ed};else if(r.includes("sonnet"))s={alias:"Sonnet",aliasModel:xm(),slogan:Qu};else if(r.includes("opus"))s={alias:"Opus",aliasModel:Bu(),slogan:tl};else if(r.includes("haiku"))s={alias:"Haiku",aliasModel:Sj(),slogan:Ph};if(!s)return{value:e,label:n,description:`Custom model (${e})`};let h=Wp(s.aliasModel),g=Object.values(ho).map((w)=>Be(w.firstParty)),b=g.indexOf(r);if(h&&b!==-1&&b<g.indexOf(Be(s.aliasModel))&&$r(s.aliasModel))return{value:e,label:n,description:`Newer version available \xB7 select ${s.alias} for ${h}`};return{value:e,label:n,description:`${s.slogan} (${e})`}}
function t8(e){if(!oQn(e))return e;let n=t_t(e.value);return n===void 0?e:{...e,label:n,description:`${e.description} (${e.label})`}}
function r8(e,n,r){if(e===null)return;e.dropped++,e.dropReasons.add(mU(n,r)?"entitlement_denied":o8(n)?"managed_denied":"allowlist_filtered")}
function o8(e){try{return Obe(e)}catch{return!1}}
function s_e(e=!1,n=null){let r=new Set,s=f8(e,n).filter((j)=>{if(j.value===null)return!0;if(r.has(j.value)){if(n!==null)n.duplicates++;return t(`model options: dropping duplicate row "${j.label}" (value ${j.value})`,{level:"warn"}),!1}return r.add(j.value),!0}),{setting:h,attribution:g}=j3(),b=g==="org"?h:null,w=b?Be(b,{identity:!0}):null,R=b?/\[1m\]$/i.test(b):!1,A=w?s.map((j)=>{if(j.value===null||$H(j.value))return j;let K=Rt(j.value);if(Be(K,{identity:!0})!==w||/\[1m\]$/i.test(K)!==R)return j;return{...j,description:`${j.description}${qbn("org")}`}}):s,D=g8(A,n).map((j)=>{if(j.disabled===!0)return j;try{let K=qO(Be(j.value===null?El():Rt(j.value)));if(K!==null){if(n!==null)n.disabledReasons.add("error_override");return{...j,disabled:!0,description:K}}}catch(K){t(`model-error-overrides picker hint failed: ${K}`,{level:"error"})}return j}),z=D.filter((j)=>j.disabled===!0);if(z.length===0)return D;return[...D.filter((j)=>j.disabled!==!0),...z]}
function s8(e,n){let r=bF();if(r===null)return null;let s=vh({catalog:r,provenance:ppe()==="published"?"published":"served"}),h=!c8(),g=[Xu(e)];for(let b of s){let w=a8(b),R=h?i8(w):w;if(R===null){if(n!==null)n.dropped++,n.dropReasons.add("entitlement_denied");continue}if(R.disabled===!0&&n!==null)n.disabledReasons.add(w.disabled===!0&&dpe(b.row)?"not_offered":"server_disabled");g.push(R)}return g}
function i8(e){if(e.disabled===!0||e.value===null)return e;let n=LM(e.value);if(n===null)return e;switch(n.reason){case"disabled":return{...e,disabled:!0,description:n.description};case"absent":return null}}
function a8(e){let{row:n}=e,r=n.confidential===!0,s=gA(n.name??"")||Wp(n.id)||gA(r?TQn(Ct(n.id)):n.id)||"Unknown model",h=QS(bY(n.description??""),n);if(!e.selectable){let w=dpe(n)?gQn:bY(n.selection_notice?.text??n.notice?.text??"");return{value:n.id,label:s,description:(w===""?h:QS(w,n))||"Not available",disabled:!0}}let g=e.aliasFamily??(e.family==="fable"?"fable":void 0);return{value:(g!==void 0&&kp(Rt(g))===e.key?g:void 0)??n.id,label:s,description:h||QS(l8(e.family),n)}}
function QS(e,n){return e}
function l8(e){switch(e){case"opus":return tl;case"sonnet":return Qu;case"haiku":return Ph;case"fable":return ed;default:return""}}
function f8(e,n){let r=s8(e,n),s=r??e8(e),h=a.ANTHROPIC_CUSTOM_MODEL_OPTION;if(h&&!s.some((D)=>D.value===h))s.push({value:h,label:a.ANTHROPIC_CUSTOM_MODEL_OPTION_NAME??t_t(h)??h,description:a.ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION??`Custom model (${h})`,sessionTail:!0});let g=r===null?JBe():[];for(let D of g)if(!s.some((z)=>os(z,D)))vi(s,t8(D));let b=He();if(r===null&&(b==="firstParty"||b==="gateway")){let D=b==="gateway"||Js();for(let z of Cj()){let j=L3(z);if(j.disabled&&!D)continue;if(!s.some((K)=>os(K,j))){if(j.disabled===!0&&n!==null)n.disabledReasons.add("server_disabled");vi(s,j)}}}if(r===null&&b==="firstParty"&&ZPe()&&!s.some((D)=>typeof D.value==="string"&&Ai(D.value)))vi(s,N3(eIe(),e));let{availableModels:w}=er()??{};if(w)for(let D of w){let z=D.trim();if(s.some((X)=>X.value===z))continue;if(z.startsWith("anthropic.")){let X=t_t(z);s.push({value:z,label:X??z,description:X===void 0?"Custom model":`Custom model (${z})`,sessionTail:!0});continue}let j=Ct(z).toLowerCase();if(!od()||!/^claude-[a-z0-9-]+$/.test(j))continue;if(!["opus","sonnet","haiku"].some((X)=>j.includes(X)))continue;if(KQ(z))continue;if(Ct(z)!==z){if(!(j.includes("opus")?wF():j.includes("sonnet")?EF():!0)||bpe(Be(j)))continue}let K=Ju(z);if(K!==null&&!s.some((X)=>os(X,K)))s.push({...K,sessionTail:!0})}s=p8(s,n);let R=null,A=Xh(),M=kL();if(A!==void 0&&A!==null)R=A;else if(M!==void 0&&M!==null)R=M;if(R===null||s.some((D)=>D.value===R))return Us(s,n);else if(R==="opusplan")return Us([...s,X3()],n);else if(Ai(R)){let D={value:R,label:"",description:""},z=s.findIndex((j)=>os(j,D));if(z!==-1)s[z]={...s[z],value:R};else vi(s,{...F3(R),sessionTail:!0});return Us(s,n)}else if(R==="opus"){if(!od()){let z=Bu();return Us(s.map((j)=>j.value===z?{...j,value:"opus"}:j),n)}let D=nw(!1);return Us(s.some((z)=>typeof z.value==="string"&&Ct(z.value)===z.value&&os(z,D))?s:[...s,{...D,sessionTail:!0}],n)}else if(R==="opus[1m]"&&od()){let D=rw(!1);return Us(s.some((z)=>os(z,D))?s:[...s,{...D,sessionTail:!0}],n)}else{let D={value:R,label:"",description:""};if(s.some((z)=>os(z,D)))return Us(s,n);return s.push({...Ju(R)??{value:R,label:R,description:"Custom model"},sessionTail:!0}),Us(s,n)}}
function hMr(e){if(KQ(e)||!$r(e)||LM(e)?.reason==="absent")return!1;let n=Ct(e);if(n===e)return!0;let r=Be(n.toLowerCase());return(r.includes("opus")?wF():r.includes("sonnet")?EF():!0)&&!bpe(r)}
function p8(e,n){let r=_pe();if(!r)return e;let{picker:s}=r,h=r.source==="policySettings",g=new Set,b=[];for(let R of s.options){let A=R.model.trim();if(A===""||g.has(A)||!hMr(A))continue;g.add(A);let M=h8(A,R.label?.trim()||void 0,R.description?.trim()||void 0,h),D=LM(A);if(D?.reason==="disabled"){if(n!==null)n.disabledReasons.add("server_disabled");b.push({...M,disabled:!0,description:D.description});continue}b.push(M)}if(b.length===0)return e;if(n!==null)n.curatedRows=b.length,n.curatedReplaced=s.replaceBuiltInOptions===!0;if(s.replaceBuiltInOptions===!0)return[...e.filter((R)=>R.value===null),...b];let w=[...e];for(let R of b)if(!w.some((A)=>os(A,R)))w.push(R);return w}
function h8(e,n,r,s){let h=Ju(e),g=n??h?.label??e,b=r??(s?`Managed by your organization (${e})`:`Custom model (${e})`);return{value:e,label:g,description:b,descriptionForModel:r?`${r} (${e})`:b}}
function gM(){return!(er()||{}).availableModels&&gU().size===0&&!mQn()}
function yM(e,n,r){if(typeof n.value!=="string")return r?.(),null;let s=Ct(n.value);if(!Ny(s)||!od())return r?.(),null;let h=fQn(s);if(h===null)return r?.(),null;let g=n.value!==s,b=s==="opus"?wF():s==="sonnet"?EF():!0,R=(g||s==="opus"&&ype(h))&&b&&Poe(h)?`${h}[1m]`:h,A=Be(h,{identity:!0}),M=R!==h;if(e.some((D)=>D!==n&&D.value!==null&&Ct(D.value)!==D.value===M&&Be(Ct(D.value),{identity:!0})===A&&$r(D.value)))return null;if(Ju(R)===null)return r?.(),null;return R}
function Us(e,n){if(gM())return e;let r=gU(),s=new Set;return e.flatMap((h)=>{if(h.value===null||$r(h.value))return[h];let g=h.value,b=yM(e,h,()=>r8(n,g,r));if(b===null||s.has(b))return[];let w=Ju(b);if(w===null)return[];return s.add(b),[w]})}
function os(e,n){if(e.value===n.value)return!0;if(typeof e.value!=="string"||typeof n.value!=="string")return!1;let r=dM(e.value),s=dM(n.value);if(r!==void 0&&s!==void 0&&(r===s||r===ew||s===ew))return!0;let h=Rt(e.value);if(Fn(h)!==Fn(Rt(n.value)))return!1;return zd(e.value)===zd(n.value)||Kb(h)}
function Ai(e){return e==="fable"||e==="fable[1m]"||mpe(e)}
var ew="fable:*";
function dM(e){if(e==="fable"||e==="fable[1m]"){let s=Ct(Be(eIe(),{identity:!0}));return xa(s)?.family==="fable"?s:ew}let n=Gj().models.filter((s)=>s.family==="fable").map((s)=>s.id).sort((s,h)=>h.length-s.length);return new RegExp(`(?:^|[./])(${n.join("|")})(?:[-@]\\d{8})?(?:-v\\d+(?::\\d+)?)?(?:\\[[12]m\\])?$`,"i").exec(e)?.[1]?.toLowerCase()}
function g8(e,n){if(!vO()||Eq()||SS()||!AO()||!(wke()||ude()))return e;return e.map((r)=>{if(r.disabled===!0||typeof r.value!=="string"||!Ai(r.value))return r;let s=t_e()?"":" \u2014 requires usage credits";if(n!==null)n.disabledReasons.add("credits_required");return{...r,disabled:!0,label:"Fable (disabled)",description:`${r.description}${s}`}})}
function vi(e,n){if(!(typeof n.value==="string"&&Ai(n.value))){e.push(n);return}let r=e.findIndex((K)=>K.value===null);if(r===-1){e.splice(0,0,n);return}let s=Ah(El()),h=e[r+1]?.value,g=e[r+1],b=typeof h==="string"&&g!==void 0?yM(e,g):null,w=(K)=>b!==null&&Be(Ct(K),{identity:!0})===Be(Ct(b),{identity:!0})&&Ct(K)!==K===(Ct(b)!==b)&&$r(K),R=Xh()??kL()??null,A=typeof R==="string"&&w(R)||(er()?.availableModels??[]).some((K)=>w(K.trim()))||JBe().some((K)=>typeof K.value==="string"&&w(K.value))||Cj().some((K)=>typeof K.value==="string"&&w(K.value))||(_pe()?.picker.options??[]).some((K)=>w(K.model.trim())),M=typeof h==="string"&&(gM()||$r(h)||b!==null&&!A),D=typeof h==="string"&&Ny(Ct(h))?Ah(h):null,z=new Set;if(D!==null){if(z.add(D),!M&&s!==null)z.add(s)}else if(s!==null)z.add(s);let j=r+1;while(j<e.length){let K=e[j]?.value;if(typeof K!=="string")break;let X=Ah(K);if(X!==null&&z.has(X)||Ai(K))j++;else break}e.splice(j,0,n)}
function Ah(e){let n=e.toLowerCase();if(n.includes("fable"))return"fable";if(n.includes("opus"))return"opus";if(n.includes("sonnet"))return"sonnet";if(n.includes("haiku"))return"haiku";return null}
return s_e;
}

export function createModelMenuValidationGate287(ports){
const {$r,Be,Ct,EF,KQ,LM,bpe,wF}=ports;
function hMr(e){if(KQ(e)||!$r(e)||LM(e)?.reason==="absent")return!1;let n=Ct(e);if(n===e)return!0;let r=Be(n.toLowerCase());return(r.includes("opus")?wF():r.includes("sonnet")?EF():!0)&&!bpe(r)}
return {hMr};
}

export function createModelMenuValidation287(ports){
const {$r,Ae,Ape,E,He,Jd,Js,Kjt,Nbn,Qsn,Rt,XPe,Xr,_pe,a,d,d0e,gWt,hMr,i8,l,lse,lt,oHe,pb,rHe,t,t2,wOe,wte,xQe,xt,zj}=ports;
function b(){return Xr().providerCache.validatedModels}
async function ONn(e,o){let r=e.trim();if(!r)return{valid:!1,error:"Model name cannot be empty"};if(!$r(r,o.skipEntitlementDenyOverlay?{skipEntitlementDenyOverlay:!0}:void 0))return{valid:!1,error:`Model '${r}' is not in the list of available models`,notAllowed:!0};if(!o.forceServerProbe){let f=r.toLowerCase();if(zj.includes(f))return{valid:!0};if(r===a.ANTHROPIC_CUSTOM_MODEL_OPTION)return{valid:!0};if(hMr(r)&&_pe()?.picker.options.some((c)=>c.model.trim()===r))return{valid:!0};if(b().has(r))return{valid:!0}}let n=He(),s=a.ANTHROPIC_BASE_URL,i=s&&URL.canParse(s)?new URL(s).hostname:void 0,m=Js()||i!==void 0&&(i==="anthropic.com"||i.endsWith(".anthropic.com")||wOe.some((f)=>new URL(f).hostname===i));if(!(n==="gateway"||n==="firstParty"&&!m)&&/[\s\p{Cc}\p{Cf}]/u.test(r))return{valid:!1,error:`Model '${r}' not found`,notFound:!0};if(o.serverProbe===!1)return{valid:!0};try{return await t2({model:r,max_tokens:1,maxRetries:0,querySource:"model_validation",credentials:o.credentials,timeout:o.timeout,signal:o.signal,messages:[{role:"user",content:[{type:"text",text:"Hi",cache_control:{type:"ephemeral"}}]}]}),b().add(r),{valid:!0}}catch(f){return _(f,r)}}
var S=15000;
async function g(e,o){let r=Xr(),n=r.sessionModelDenyReprobe.generation,s=new AbortController,i=await lt(ONn(e,{forceServerProbe:o.forceServerProbe,skipEntitlementDenyOverlay:o.skipEntitlementDenyOverlay,credentials:o.credentials,timeout:o.deadlineMs,signal:s.signal}),o.deadlineMs);if(i===void 0)return s.abort(),{probe:void 0,accountChanged:!1};let m=r.sessionModelDenyReprobe.generation!==n;if(m)r.providerCache.validatedModels.delete(e.trim());return{probe:i,accountChanged:m}}
async function pEr(e,o,r){if(r===void 0||o.serverProbe===!1)return ONn(e,o);let{probe:n,accountChanged:s}=await g(e,{...o,deadlineMs:r});if(n===void 0||s){let i=i8("model");return{valid:!1,error:`Couldn't confirm model "${pb(e)}" with the API. ${i?`Try again, or run ${i} to see available models.`:"Try again."}`,retryable:!0}}return n}
function rPt(e){let o=e.toLowerCase().trim();return d0e(o)}
function fEr(e){return rPt(e)||gWt(e)?Rt(e):e}
async function Jae(e,o,r){try{if(!$r(e,{skipEntitlementDenyOverlay:!0}))return"denied_by_policy";let n=fEr(e);if(rPt(n))return"denied_by_policy";let s=Xr(),{confirmedEntitlementDenies:i,overturnedEntitlementDenies:m}=s.providerCache,p=XPe(n),f=i.get(p);if(f!==void 0&&Date.now()-f<Kjt)return"denied_by_server";let{probe:c,accountChanged:y}=await g(n,{credentials:r,deadlineMs:S,forceServerProbe:!0,skipEntitlementDenyOverlay:!0});if(c===void 0)return t("[model-access] stale-deny re-probe timed out",{level:"warn"}),"probe_failed";if(!c.valid&&!c.notFound&&!c.permissionDenied)return"probe_failed";if(y)return t("[model-access] stale-deny re-probe answered after the account changed; recording nothing"),c.valid?"overturned":"denied_by_server";if(!c.valid){let u=Date.now();i.set(p,u);for(let v of Ape())if(Nbn(v,e))i.set(XPe(v.apiName),u);return"denied_by_server"}i.delete(p);let h=Date.now();for(let u of Ape())if(Nbn(u,e))m.set(XPe(u.apiName),h);try{await M(e,o)}catch(u){if(E(u)!==void 0)t(`[model-access] stale-deny eviction failed: ${l(u)}`,{level:"warn"});else d(u)}return wte(o,r),"overturned"}catch(n){return d(n),"probe_failed"}}
async function M(e,o){await Ae((r)=>{let n=r.modelAccessCache;if(!n?.length)return r;let s=n.filter((i)=>{if(i==null||typeof i!=="object"||typeof i.apiName!=="string"||typeof i.entitled!=="boolean")return!0;return!Nbn(i,e)});return s.length===n.length?r:{...r,modelAccessCache:s}},o)}
function _(e,o){if(e instanceof oHe){let n=Qsn(o),s=n?`. Try '${n}' instead`:"";return{valid:!1,error:`Model '${o}' not found${s}`,notFound:!0}}if(e instanceof xt){if(e instanceof rHe)return{valid:!1,error:"Authentication failed. Please check your API credentials.",authFailed:!0};if(e instanceof Jd)return{valid:!1,error:"Network error. Please check your internet connection.",retryable:!0};let n=e.error;if(n&&typeof n==="object"&&"type"in n&&n.type==="not_found_error"&&"message"in n&&typeof n.message==="string"&&n.message.includes("model:"))return{valid:!1,error:`Model '${o}' not found`,notFound:!0};if(xQe(e))return{valid:!1,error:`Model '${o}' isn't available for your account`,permissionDenied:!0};let s=e.status===429&&n?.error?.details?.error_code==="credits_required";return{valid:!1,error:`API error: ${lse(e).replace(/[.!?\u2026]+$/,"")} \xB7 model not changed`,...P(e.status)&&{retryable:!0},...s&&{creditsRequired:!0}}}return{valid:!1,error:`Unable to validate model: ${e instanceof Error?e.message:String(e)}`,retryable:!0}}
function P(e){return e===void 0||e===408||e===429||e>=500}
return {ONn,pEr,Jae};
}

export function createModelMenuValidationErrors287(ports){
const {Ee,_Kt,v$,xt}=ports;
function xQe(e){if(!(e instanceof xt)||e.status!==403)return!1;let r=e.message??"";return(e.type==="permission_error"||r.includes('"type":"permission_error"'))&&r.includes("model:")}
var e0e=new Set(["UNABLE_TO_VERIFY_LEAF_SIGNATURE","UNABLE_TO_GET_ISSUER_CERT","UNABLE_TO_GET_ISSUER_CERT_LOCALLY","CERT_SIGNATURE_FAILURE","CERT_NOT_YET_VALID","CERT_HAS_EXPIRED","CERT_REVOKED","CERT_REJECTED","CERT_UNTRUSTED","DEPTH_ZERO_SELF_SIGNED_CERT","SELF_SIGNED_CERT_IN_CHAIN","CERT_CHAIN_TOO_LONG","PATH_LENGTH_EXCEEDED","ERR_TLS_CERT_ALTNAME_INVALID","HOSTNAME_MISMATCH"]);
var Ce=new Set([...e0e,"ERR_TLS_HANDSHAKE_TIMEOUT","ERR_SSL_WRONG_VERSION_NUMBER","ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC"]);
var z="Failed to resolve AWS credentials from the credential provider chain.";
var Xvn="Failed to acquire Google OAuth credentials.";
function lm(e){if(!e||typeof e!=="object")return null;let r=e,n=5,s=0;while(r&&s<n){if(r instanceof Error){if("code"in r&&typeof r.code==="string"){let a=r.code,o=Ce.has(a);return{code:a,message:r.message,isSSLError:o}}if(r.message.startsWith(_Kt))return{code:"ConnectionClosed",message:r.message,isSSLError:!1}}if(r instanceof Error&&"cause"in r&&r.cause!==r)r=r.cause,s++;else break}return null}
function D(e){if(e.includes("<!DOCTYPE html")||e.includes("<html")){let r=e.match(/<title>([^<]+)<\/title>/);if(r&&r[1])return r[1].trim();return""}return e}
function v9r(e){let r=e.message;if(!r)return"";return D(r)}
function O(e){return typeof e==="object"&&e!==null&&"error"in e&&typeof e.error==="object"&&e.error!==null}
function N(e){if(!O(e))return null;let n=e.error,s=n?.error?.message;if(typeof s==="string"&&s.length>0){let o=D(s);if(o.length>0)return o}let a=n?.message;if(typeof a==="string"&&a.length>0){let o=D(a);if(o.length>0)return o}return null}
function lse(e){let r=lm(e);if(r){let{code:a,isSSLError:o}=r;if(a==="StreamSuspended")return"Connection lost while your computer was asleep";if(a==="StreamTruncated")return"Connection closed before the response finished";if(a==="StreamNoResponse")return"No response from API";if(a==="BedrockUnexpectedContentType")return r.message;if(a==="ETIMEDOUT")return"Request timed out. Check your internet connection and proxy settings";if(o){let i=`(${a}). The certificate comes from an authority Claude Code doesn't trust, usually a TLS-inspecting corporate proxy or a gateway signed by a private CA: set NODE_EXTRA_CA_CERTS to that CA bundle, or add it to the system certificate store \xB7 see https://code.claude.com/docs/en/network-config`;switch(a){case"UNABLE_TO_VERIFY_LEAF_SIGNATURE":case"UNABLE_TO_GET_ISSUER_CERT":case"UNABLE_TO_GET_ISSUER_CERT_LOCALLY":return`Unable to connect to API: SSL certificate verification failed ${i}`;case"CERT_HAS_EXPIRED":return"Unable to connect to API: SSL certificate has expired";case"CERT_REVOKED":return"Unable to connect to API: SSL certificate has been revoked";case"DEPTH_ZERO_SELF_SIGNED_CERT":case"SELF_SIGNED_CERT_IN_CHAIN":return`Unable to connect to API: Self-signed certificate detected ${i}`;case"ERR_TLS_CERT_ALTNAME_INVALID":case"HOSTNAME_MISMATCH":return"Unable to connect to API: SSL certificate hostname mismatch";case"CERT_NOT_YET_VALID":return"Unable to connect to API: SSL certificate is not yet valid";default:return`Unable to connect to API: SSL error (${a})`}}}if(e.message===z||e.message===Xvn){let a=v$(e.cause,(o)=>o.message.trim().length>0&&o.message!==z&&o.message!==Xvn);if(a){let o=D(a.message.trim());if(o.length>0)return o}}if(e.message==="Connection error."){let a=r?.code;if(a===void 0)return"Unable to connect to API. Check your internet connection";switch(a){case"ECONNRESET":case"EPIPE":case"ECONNABORTED":case"ConnectionClosed":case"ERR_SOCKET_CLOSED":case"UND_ERR_SOCKET":return`Connection dropped (${a})`;case"ECONNREFUSED":case"ConnectionRefused":return`Connection refused \u2014 a firewall or proxy may be blocking it (${a})`;case"ENOTFOUND":case"EAI_AGAIN":case"FailedToOpenSocket":return`Can't reach the API server \u2014 check your internet or DNS (${a})`;case"ENETUNREACH":case"ENETDOWN":case"EHOSTUNREACH":case"EHOSTDOWN":return`No internet route \u2014 check your connection or VPN (${a})`;case"ERR_PROXY_TUNNEL":return`Couldn't connect through your proxy (${a}) \u2014 the proxy refused the tunnel: check its credentials and that it allows this host`;default:return`Unable to connect to API (${a})`}}if(!e.message)return N(e)??`API error (status ${e.status??"unknown"})`;if(e.message.includes('{"')){let a=N(e);if(a)return e.status?`${e.status} ${a}`:a}let n=v9r(e),s=/^(\d+ )?\s*</.test(e.message);if(n.length===0&&s){if(!e.status)return"API error (status unknown)";let a=Ee[e.status];return a?`${e.status} ${a}`:String(e.status)}if(n!==e.message&&n.length>0){let a=e.status?String(e.status):void 0;return a&&!n.match(/\d+/g)?.includes(a)?`${a} ${n}`:n}return e.message.trimEnd()}
return {xQe,lse};
}

export function createModelMenuValidationText287(ports){
const {}=ports;
function l(n){return n instanceof Error?n.message:String(n)}
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
var _Kt="The socket connection was closed unexpectedly";
function v$(n,e,t=5){let r=n;for(let o=0;o<t;o++){if(!(r instanceof Error))return;if(e(r))return r;r=r.cause}return}
return {l,E,v$,_Kt};
}

export function createModelMenuValidationTimer287(ports){
const {}=ports;
var s=(t,r)=>{let e=setTimeout(t,r);return()=>clearTimeout(e)};
function lt(t,r,e=s){let o=()=>{},n=new Promise((m)=>{o=e(()=>m(void 0),r)});return Promise.race([t,n]).finally(o)}
return {lt};
}

export function createModelMenuValidationHosts287(ports){
const {}=ports;
var wOe=["https://beacon.claude-ai.staging.ant.dev","https://claude.fedstart.com","https://claude-staging.fedstart.com"];
return {wOe};
}

export function createModelMenuValidationFallback287(ports){
const {Gj,OU,RS,a,od,xa}=ports;
var q_t=["fable","opus","sonnet"];
function W5n(e,n){let r=e.split("-").map(Number),s=n.split("-").map(Number);for(let g=0;g<Math.max(r.length,s.length);g++){let h=(s[g]??-1)-(r[g]??-1);if(h!==0)return h}return 0}
function G5n(){return Gj().models.filter((e)=>e.fallback_3p!==void 0).sort((e,n)=>{let r=(g)=>{let h=q_t.indexOf(g);return h===-1?q_t.length:h},s=(g,h)=>g.replace(/^claude-/,"").replace(h,"").replace(/^-|-$/g,"");return r(e.family)-r(n.family)||(e.family<n.family?-1:e.family>n.family?1:0)||W5n(s(e.id,e.family),s(n.id,n.family))}).map((e)=>{let n=e.id.replace(/^claude-/,"");return{needle:n,needleUnderscore:n.replace(/-/g,"_"),fallbackId:e.fallback_3p,family:e.family}})}
function X_t(e){let n=xa(e)?.provider_ids.first_party,r=n!==void 0?OU[n]:void 0;return r!==void 0?RS()[r]:void 0}
function Qsn(e){if(od())return;let n=e.toLowerCase(),r=G5n().find((s)=>n.includes(s.needle)||n.includes(s.needleUnderscore));if(r===void 0)return;if(r.family==="fable"&&xa(r.fallbackId)?.family==="opus")return a.ANTHROPIC_DEFAULT_OPUS_MODEL??X_t(r.fallbackId);return X_t(r.fallbackId)}
return {Qsn};
}

export function createModelMenuPolicy287(ports){
const {$be,$x,Be,Bnr,C,C8o,Cj,Cje,Ct,Doe,Ei,Ewn,Fn,GZr,Gj,He,If,Im,Ipe,Jk,Js,Lp,Lwt,MSt,Ny,OF,OU,P2e,QE,QZ,RS,Rt,Ry,T,T8o,U,V,VWt,Vj,Vs,WZr,Wp,Xo,Xr,Yw,_D,a,aD,aJe,bF,bY,bzt,c8,cI,cL,cc,d0e,eIe,eXr,er,f,fb,fse,ft,g6e,gA,ge,gt,ho,ieo,ir,j8,ja,jnr,jtr,kbe,le,lkn,ny,o,od,pVt,pse,q_,rh,t,t8r,tt,u,ufe,vwn,wWt,we,wu,xa,z7e,zF}=ports;
var Kjt=600000;
function sqr(){return{validatedModels:new Set,confirmedEntitlementDenies:new Map,overturnedEntitlementDenies:new Map,bedrockInferenceProfiles:void 0,inferenceProfileBackingModels:new Map,modelConfigs:new Map,capabilityOverrides:new Map,probeResults:new Map,preconnectFired:!1}}
function Yjt(e){return e.startsWith("anthropic.")}
function iqr(e){if(!e.startsWith("arn:"))return e;let n=e.lastIndexOf("/");if(n===-1)return e;return e.substring(n+1)}
function Ryt(e){let n=iqr(e);for(let r of QZ)if(n.startsWith(`${r}.anthropic.`))return r;return}
function FPe(e,n){let r=Ryt(e);if(r)return e.replace(`${r}.`,`${n}.`);if(Yjt(e))return`${n}.${e}`;return e}
function xyt(e){let n=e??"";if(n.startsWith("us-gov-"))return"us-gov";if(n.startsWith("us-"))return"us";if(n.startsWith("eu-"))return"eu";if(n.startsWith("ap-"))return"apac";return"global"}
function Xjt(e){if(e?.startsWith("us-gov-"))return"us-gov";return a.ANTHROPIC_BEDROCK_REGION_PREFIX??xyt(e)}
function eT(e){return e}
var Sl=Object.keys(ho);
function Zr(e,n){let r=Sl.find((h)=>ho[h][e]!==null),s=e==="bedrock"?Xjt(n??P2e()):void 0,g={};for(let h of Sl){let b=ho[h][e]??(r?ho[r][e]:ho[h].firstParty);g[h]=eT(s?FPe(b,s):b)}return g}
function Jjt(e){let n;try{n=tt().modelOverrides}catch{return e}if(!n)return e;for(let[r,s]of Object.entries(n))if(s===e)return r;return e}
function wl(){if(Lwt()!==null)return;if(He()!=="bedrock"){lkn(Zr(He()));return}If()}
function vt(){let e=Lwt();if(e===null)return wl(),Zr(He());return e}
var Mm=null;
var Tu=null;
function nWt(e,n){if(!Im()||!zF(cc(e)))return!1;if(ny(n,"per_turn_effort",e)===!1)return!1;if(bzt(n,"per_turn_effort",e)!==!0&&Mm?.(n,e)!==!0)return!1;return Tu?.()!==!0}
function L7e(e){return Lp(e,OF)||Lp(e,QE)}
function vbn(e,n){return nWt(e,n)&&!L7e(Ei())}
var Ms=/^[a-z]+-\d/;
var X_=f(()=>u({id:o(),display_name:o().optional(),description:o().nullish()}).strip());
var dD=100;
var fD=f(()=>u({baseUrl:o(),fetchedAt:C(),models:T(X_())}));
function vd(){if(!a.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY)return!1;if(He()!=="firstParty")return!1;if(Js())return!1;if(!a.ANTHROPIC_BASE_URL)return!1;return!0}
function _d(){return q_(we(),"cache")}
function Sd(){return q_(_d(),"gateway-models.json")}
function js(e){let n=fD().safeParse(gt(e,!1));return n.success?n.data:null}
function Bo(){return Xr().gatewayModelsByCachePath}
function J_(e,n=Xr().gatewayModelsStorageV5){let r=Bo();if(r.has(e))return r.get(e)??null;if(n)return null;let s;try{let g=aD(e,"utf-8");s=js(g)}catch{s=null}return r.set(e,s),s}
var Y_=new WeakMap;
function JBe(){if(!vd())return[];let e=J_(Sd());if(!e||e.baseUrl!==a.ANTHROPIC_BASE_URL)return[];let n=Y_.get(e);if(n)return n;let r=e.models.map((s)=>({value:s.id,label:gA(s.display_name??"")||gA(s.id),description:_D(bY(s.description??""),dD)||"From gateway"}));return Y_.set(e,r),r}
function oQn(e){return typeof e.value==="string"&&e.label===gA(e.value)}
var Q_={"claude-opus-4-1":{modelName:"Claude Opus 4.1",retirementDates:{firstParty:null,bedrock:null,vertex:null,foundry:null,anthropicAws:null,anthropicGoogleCloud:null,mantle:null,gateway:null},remappedTo:"the latest Opus"},"claude-opus-4-0":{modelName:"Claude Opus 4",retirementDates:{firstParty:"June 15, 2026",bedrock:"May 31, 2026",vertex:"September 14, 2026",foundry:null,anthropicAws:null,anthropicGoogleCloud:null,mantle:null,gateway:null},remappedTo:"the latest Opus"},"claude-sonnet-4-0":{modelName:"Claude Sonnet 4",retirementDates:{firstParty:"June 15, 2026",bedrock:"October 14, 2026",vertex:"September 14, 2026",foundry:null,anthropicAws:null,anthropicGoogleCloud:null,mantle:null,gateway:null}},"claude-3-opus":{modelName:"Claude 3 Opus",retirementDates:{firstParty:"January 5, 2026",bedrock:"January 15, 2026",vertex:"January 5, 2026",foundry:"January 5, 2026",anthropicAws:null,anthropicGoogleCloud:null,mantle:null,gateway:null}},"claude-3-7-sonnet":{modelName:"Claude 3.7 Sonnet",retirementDates:{firstParty:"February 19, 2026",bedrock:"April 28, 2026",vertex:"May 11, 2026",foundry:"February 19, 2026",anthropicAws:null,anthropicGoogleCloud:null,mantle:null,gateway:null}},"claude-3-5-haiku":{modelName:"Claude 3.5 Haiku",retirementDates:{firstParty:"February 19, 2026",bedrock:null,vertex:null,foundry:null,anthropicAws:null,anthropicGoogleCloud:null,mantle:null,gateway:null}}};
function Ko(e){let n=Be(Ct(e),{identity:!0}),r=He(),s=e.trim().toLowerCase(),g=zd(s)?Ct(s).trim():s,h=od()&&n2e(g)&&e_t(),b=Object.hasOwn(Q_,n)?Q_[n]:void 0;if(b){let v=b.retirementDates[r];if(v||h){let w={kind:"none"};if(h&&b.remappedTo)w={kind:"remap",remappedTo:b.remappedTo};else if(v){let A=new Date(v);w={kind:"retirement",retirementDate:v,isPast:!Number.isNaN(A.getTime())&&A<new Date}}return{isDeprecated:!0,modelName:b.modelName,copy:w}}}return{isDeprecated:!1}}
function Pbn(e){return Ko(e).isDeprecated}
function KQ(e){if(od()&&n2e(Be(Ct(e),{identity:!0}))&&e_t())return!0;let n=Ko(e);if(!n.isDeprecated)return!1;switch(n.copy.kind){case"remap":return!0;case"retirement":return n.copy.isPast;case"none":return!1}}
function l8(e,n){let r=Ct(e).toLowerCase(),s=Vj.find((h)=>h===r);if(s)return s;if(r==="best"||r==="opusplan")return"other";let g=Ct(n).toLowerCase();return Vj.find((h)=>g.includes(h))??"other"}
var iWt=["opus","sonnet","haiku"];
function pD(e){return iWt.includes(e)}
function qE(e){return e.config.models??[]}
function dpe(e){return e.disabled!==!0&&e.section!=="deprecated"}
function aWt(e){let n=e.runtime?.family?.trim().toLowerCase();if(n)return n;let r=l8(e.id,e.id);return r==="other"?void 0:r}
function Ed(e){let n={};for(let r of e){let s=aWt(r);if(pD(s)&&n[s]===void 0)n[s]=r.id}return n}
function YQ(e,n){let r=kp(n);return qE(e).find((s)=>kp(s.id)===r)}
function kp(e){return Fn(e).trim().toLowerCase()}
function kd(){return bF()!==null}
function Fr(){let e=bF();return e===null?[]:qE(e)}
function fy(...e){return py(bF(),e)}
function py(e,n){if(e===null)return;let[r,...s]=n;if(r!==void 0){let g=YQ(e,r)??OD(e,r);if(g!==void 0)return g}for(let g of s){if(g===void 0)continue;let h=YQ(e,g);if(h!==void 0)return h}return}
function OD(e,n){let r=cL().modelKnowledge?.identitySpelling(n);return r===void 0||kp(r)===kp(n)?void 0:YQ(e,r)}
var xD={min:8192,max:1e6};
function Ad(...e){let n=z7e(...e);return dWt(n?.runtime?.max_input_tokens??n?.context_window,xD)}
function hy(...e){let n=z7e(...e);return n===void 0?void 0:aWt(n)}
function _y(){let e=bF()?.state;if(e===void 0)return;let n=e.org_enforced_default_model?.trim();if(n)return{model:n,orgConfigured:!0,enforced:!0};let r=e.model?.trim();if(!r)return;return{model:r,orgConfigured:e.selection_source==="org_configuration"||e.selection_source==="custom_role_configuration",enforced:!1}}
function dWt(e,n){return e!==void 0&&Number.isInteger(e)&&e>=n.min&&e<=n.max?e:void 0}
function pb(e){let n=e.replace(/[^A-Za-z0-9._:/@[\]-]/g,"");if(n.length===0)return"(unrecognized model name)";return n.length>128?`${n.slice(0,128)}\u2026`:n}
function XPe(e){let n=Ct(e.trim().toLowerCase()),r=wu(n);if(r)return vy(r);let s=Be(n,{identity:!0}),g=wu(s);return g?vy(g):s}
function vy({family:e,major:n,minor:r,legacyVersionFirst:s,trailer:g}){let h=r?`${n}-${r}`:`${n}`;return`${s?`claude-${h}-${e}`:`claude-${e}-${h}`}${g??""}`}
function Cy(e){let n=new Set;for(let r of e??[])if(!r.entitled)n.add(XPe(r.apiName));return n}
function MD(){let e;try{e=tt().modelOverrides}catch{e=void 0}return[e,pse()]}
function DD(e,n){for(let r of MD()){if(r===void 0)continue;for(let[s,g]of Object.entries(r)){if(!cI(g,e))continue;if(n.has(XPe(s)))return!0}}return!1}
function mU(e,n){if(n.size===0)return!1;let r=Ct(e.trim().toLowerCase());return(Hn(r)?[r,Ct(Rt(r))]:[r]).some((g)=>n.has(XPe(g))||DD(g,n))}
function Nbn(e,n){return mU(n,Cy([e]))}
function gU(){let e=He();if(e!=="firstParty"&&e!=="gateway")return new Set;let n=Cy(Ape());if(n.size===0)return n;let r=Xr(),{overturnedEntitlementDenies:s}=r.providerCache,{contestedDenies:g}=r.sessionModelDenyReprobe;if(s.size>0||g.size>0){let h=Date.now();for(let[b,v]of s)if(h-v<Kjt)n.delete(b);for(let[b,v]of g)if(v>h)n.delete(b)}return n}
function QBe(){if(He()!=="firstParty")return null;if(c8())return null;return Z7e()}
function fQn(e){let n=Ty(e).next();return n.done===!0?null:n.value}
function*Ty(e){let n=Object.keys(ho);for(let r=n.length-1;r>=0;r--){let s=ho[n[r]].firstParty;if(Lr(Be(s),e)&&$r(s)&&!KQ(s)&&!Pbn(s))yield s}}
function Td(e){let n=Pqr(e).next();return n.done===!0?null:n.value}
function*Pqr(e){if(od()){yield*Ty(e);return}let n=He();if(n==="foundry")return;let r=RS(),s=vt(),g=Object.keys(ho);for(let h=g.length-1;h>=0;h--){let b=g[h],v=ho[b];if(v[n]===null||wu(v.firstParty)?.family!==e||KQ(v.firstParty)||Pbn(v.firstParty))continue;for(let w of new Set([r[b],s[b]]))if(w&&$r(w)){yield w;break}}}
function Lr(e,n){for(let r=e.indexOf(n);r!==-1;r=e.indexOf(n,r+1)){let s=r===0||!/[a-z0-9]/i.test(e[r-1]),g=r+n.length,h=g===e.length||!/[a-z0-9]/i.test(e[g]);if(s&&h)return!0}return!1}
function Hn(e){return rh(e)||gWt(e)}
function qs(e){return qqr(e)}
function ID(e,n,r){if(Hn(e)){if(r){let s=qs(e);if(s!==null)return Lr(s,n);return!rh(e)&&Lr(e,n)}return Lr(Rt(e).toLowerCase(),n)}return Lr(e,n)}
function Sy(e,n){if(!e.startsWith(n))return!1;return e.length===n.length||e[n.length]==="-"}
function ND(e,n){let r=Hn(e)?Ct(Rt(e).toLowerCase()):e;if(Sy(r,n))return!0;if(!n.startsWith("claude-")&&Sy(r,`claude-${n}`))return!0;return!1}
function Ey(e,n){for(let[r,s]of Object.entries(n))if(cI(s,e))return r;return e}
function Ys(e,n){let r=Ct(Rt(e).trim().toLowerCase()),s=qs(e);if(s!==null&&Ct(s)===r)return!0;if(rh(r))return!1;return $r(r,{...n,envFreeAliasResolution:!0})}
var wy=new WeakMap;
function FD(e){let n=wy.get(e);if(n===void 0)n=e.flatMap((r)=>{let{entry:s}=Bnr(r);return s?[s]:[]}),wy.set(e,n);return n}
var LD={entries:[],overrideMaps:[]};
function My(){let e=ge("policySettings"),n=e?.deniedModels;if(n===void 0||n.length===0)return LD;let r=[e?.modelOverrides,pse(),t8r()].filter((s)=>s!==void 0);return{entries:FD(n),overrideMaps:r}}
function mQn(){try{return My().entries.length>0}catch{return!0}}
function ky(e,n){try{return wu(Be(e,n===void 0?{identity:!0}:{identity:!0,overridesMap:n}))}catch{return null}}
function UD(e,n,r){switch(e.kind){case"literal":return n===e.value;case"family":return r?.family===e.family||Lr(n,e.family);case"model":return r!==null&&C8o(e.id,r)}}
function Obe(e){let{entries:n,overrideMaps:r}=My();if(n.length===0)return!1;let s=Fn(e.trim()),g=Fn(Rt(s).trim()),h=new Set([s.toLowerCase(),g.toLowerCase()]);for(let A of r)for(let[R,M]of Object.entries(A))if(wu(M)===null&&[...h].some((D)=>cI(M,D)))h.add(Ct(R.trim().toLowerCase()));let b=Object.assign({},...r),v=(A,R)=>n.some((M)=>UD(M,A,R)),w=(A,R)=>v(R,ky(A))||v(R,ky(A,b));for(let A of h){let R=wu(A);if(R!==null?v(A,R):v(A,null)||w(A,A))return!0}for(let A of new Set([s,g])){let R=A.toLowerCase();if(wu(R)===null&&w(A,R))return!0}return!1}
function BD(){return ge("policySettings")?.availableModelsMatch==="exact"}
function Ay(e,n){if(Hn(e))return null;let r=n?qs(e):Rt(e).trim().toLowerCase();if(r===null)return null;let s=Ct(r);return s===e?null:s}
function HD(e,n,r){let s=pVt(n);if(s.kind==="family")return!0;if(s.kind!=="model")return!1;let g=Hn(e)?r?qs(e)??e:Ct(Rt(e).toLowerCase()):e,h=wu(g);return h!==null&&T8o(s,h,eXr(g,h))}
function Fy(e){let n=ge("policySettings");if(n?.availableModelsMatch!=="exact")return!1;let r=n.availableModels;if(r===void 0||r.every((s)=>pVt(s).kind==="ignored"))return!1;return!$r(e,{allowlist:[...r]})}
function Ly(e){return Obe(e)||Fy(e)}
function $r(e,n){try{if(Obe(e))return!1}catch{return!1}if(n?.allowlist===void 0){try{if(j8())return!1}catch{return!1}if(!n?.skipEntitlementDenyOverlay&&mU(e,gU()))return!1}let r=er()||{},s=n?.allowlist??r.availableModels;if(!s)return!0;if(s.length===0)return!1;let g;try{g=BD()}catch{return!1}let h=(g?s.filter((A)=>pVt(A).kind!=="ignored"):s).map((A)=>Ct(A.trim().toLowerCase()));if(h.length===0)return!1;let b=Ct(e.trim().toLowerCase());if(g){let A=Ay(b,n?.envFreeAliasResolution);if(A!==null&&(Ay(A,n?.envFreeAliasResolution)!==null||!$r(A,n)))return!1}if(h.includes(b)&&!Ny(b)){if(n?.envFreeAliasResolution||!Hn(b)||Ys(b,n))return!0}let v;if(n?.overridesMap!==void 0)v=Ey(e,n.overridesMap);else if(n?.ignoreModelOverrides)v=e;else{let A;try{A=ge("policySettings")}catch{return!1}v=A?.availableModels!==void 0?Ey(e,A.modelOverrides??pse()??{}):Jjt(e)}let w=Ct(v.trim().toLowerCase());if(h.includes(w)){if(!Ny(w)||!jnr(w,h)){if(n?.envFreeAliasResolution||w!==b||!Hn(w)||Ys(w,n))return!0}}for(let A of h)if(Ny(A)&&!jnr(A,h)&&ID(w,A,n?.envFreeAliasResolution))return!0;if(Hn(w)){let A=Ct(Rt(w).toLowerCase());if(h.includes(A))return!0}for(let A of h)if(!Ny(A)&&rh(A)){let R=qqr(A);if(R!==null&&Ct(R)===w)return!0}for(let A of h)if(!Ny(A)&&!rh(A)&&ND(w,A)&&(!g||HD(w,A,n?.envFreeAliasResolution)))return!0;return!1}
function Uy(){let e=le().cachedExtraUsageDisabledReason;if(e===void 0)return!1;if(e===null)return!0;switch(e){case"out_of_credits":return!0;case"overage_not_provisioned":case"org_level_disabled":case"org_level_disabled_until":case"seat_tier_level_disabled":case"member_level_disabled":case"seat_tier_zero_credit_limit":case"group_zero_credit_limit":case"member_zero_credit_limit":case"org_service_level_disabled":case"no_limits_configured":case"fetch_error":case"unknown":return!1;default:return!1}}
function By(){return ft()&&(!!a.ANTHROPIC_UNIX_SOCKET||Js())}
function wF(){if(QP())return!1;if(By())return Uy();return!0}
function EF(){if(QP())return!1;if(By())return Uy();return!0}
var KD=8;
var xd={status:"known"};
var Ky={status:"unknown"};
var gQn="Update Claude Code to use this model";
var $D=256;
function jy(){return{byModel:new Map,offeredRows:void 0,familySpellingTargets:void 0,familySpellingVouchGeneration:void 0}}
function Pd(e){let n=Xr(),r=e.settingsGeneration(),s=n.behavesAsMemo;if(s!==void 0&&s.lookup===e&&s.settingsGeneration===r)return s;let g={lookup:e,settingsGeneration:r,settingsMappingsDeclared:void 0,withoutRows:jy(),byCatalog:new WeakMap};return n.behavesAsMemo=g,g}
function zy(e,n){if(n===null)return e.withoutRows;let r=e.byCatalog.get(n);if(r===void 0)r=jy(),e.byCatalog.set(n,r);return r}
function Md(e){return e.settingsMappingsDeclared??=e.lookup.hasSettingsBehavesAs(),e.settingsMappingsDeclared}
function uWt(e,n){let r=cL().modelKnowledge;if(r===void 0)return xd;let s=Pd(r),g=zy(s,e),h=g.byModel.get(n);if(h!==void 0)return h;let b=GD(e,n,s);if(g.byModel.size>=$D)g.byModel.clear();return g.byModel.set(n,b),b}
function GD(e,n,r){if(r.lookup.isKnown(n))return xd;if(e===null&&!Md(r))return Ky;let s=new Set([kp(n)]),g=Yy(e,n,r,s,0);if(g!==void 0)return{status:"mapped",target:g.target,source:g.source,hops:g.hops};return Vy(e,n,r)?xd:Ky}
function WD(e,n,r){return r.lookup.isKnown(n)||Vy(e,n,r)}
function Vy(e,n,r){return!1}
function Yy(e,n,r,s,g){if(g>=KD)return;for(let h of jD(e,n,r)){let b=kp(h.target);if(b===""||s.has(b))continue;if(WD(e,h.target,r))return{target:h.target,source:h.source,hops:g+1};s.add(b);let v=Yy(e,h.target,r,s,g+1);if(v!==void 0)return{target:v.target,source:h.source,hops:v.hops}}return}
function jD(e,n,r){let s=[],g=zD(n,r),h=e===null?void 0:Gy(g,(b)=>YQ(e,b)?.behaves_as);if(h!==void 0)s.push({target:h,source:"served"});if(Md(r)){let b=Gy(g,(v)=>r.lookup.settingsBehavesAs(v));if(b!==void 0)s.push({target:b,source:"settings"})}return s}
function zD(e,n){let r=n.lookup.identitySpelling(e);return kp(r)===kp(e)?[e]:[e,r]}
function Gy(e,n){for(let r of e){let s=n(r)?.trim()??"";if(s!=="")return s}return}
function qy(e){return uWt(Vs(),e)}
function Jy(e,n){return uWt(e,n.id)}
function Gyt(e,n){return dpe(n)&&Jy(e,n).status!=="unknown"}
function ZBe(e){let n=cL().modelKnowledge;if(n===void 0)return qE(e).filter((s)=>Gyt(e,s));let r=zy(Pd(n),e);return r.offeredRows??=qE(e).filter((s)=>Gyt(e,s)),r.offeredRows}
function pWt(e){return Ed(ZBe(e))}
function Qy(e){let n=bF();return n===null?void 0:pWt(n)[e]}
function Zy(e){return}
function Dd(e){return}
function tb(e){let n=bF();if(n===null)return!1;let r=kp(e);return ZBe(n).some((s)=>kp(s.id)===r)}
function JPe(e){return[a.ANTHROPIC_DEFAULT_FABLE_MODEL,a.ANTHROPIC_DEFAULT_OPUS_MODEL,a.ANTHROPIC_DEFAULT_SONNET_MODEL,a.ANTHROPIC_DEFAULT_HAIKU_MODEL].some((n)=>n!==void 0&&cI(n,e))}
class ob{ladders=new Map;rungIndex=new Map;refused=new Map;answeredAt=new Map;formerHeads=new Set;configured=new Set;sessionFallbacks=[];tierMoveListeners=new Set;checks=new Map;conversationSizes=new Map;failedChecks=new Map}
var VD=new V(()=>new ob);
function Pe(){return VD.of(U().host)}
function nqo(e){let n=Pe().tierMoveListeners;return n.add(e),()=>n.delete(e)}
function na(){return ieo()??{sonnet:a.ANTHROPIC_DEFAULT_SONNET_MODEL!==void 0&&a.ANTHROPIC_DEFAULT_SONNET_MODEL!==a.CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT,opus:a.ANTHROPIC_DEFAULT_OPUS_MODEL!==void 0&&a.ANTHROPIC_DEFAULT_OPUS_MODEL!==a.CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT}}
function Rb(){let e=na(),n=jo().state!=="inactive"||er()?.enforceAvailableModels===!0;return e.sonnet&&!e.opus&&!n}
function ia(e,n){return xa(e)?.family===n}
function QPe(e){return ia(e,"fable")}
function Vyt(e){return ia(e,"mythos")}
function Yyt(e){return Zy(e)?.kind==="unresolved"}
function gWt(e){return Dd(e)!==void 0}
var Zs={fable:{available:ZPe,defaultModel:()=>eIe(),builtinDefault:(e)=>Ud(e)}};
function xb(){let e=Gj().best;if(e!==void 0&&Object.hasOwn(Zs,e)&&Zs[e]?.available())return e;return"opus"}
var X7e="opus55";
function mpe(e){return e.includes("claude-fable-")}
function Xyt(e){return e.includes("claude-mythos-")}
function ZPe(){if(kd()){if(Mb(mpe,Be(eIe(),{identity:!0})))return!1;if(!c8()&&Eb())return!1;if(a.ANTHROPIC_DEFAULT_FABLE_MODEL)return!0;return uI(mpe)}if(Eb())return!1;if(a.ANTHROPIC_DEFAULT_FABLE_MODEL)return!0;switch(He()){case"firstParty":return!0;case"gateway":return lI(mpe);default:return!1}}
function sI(){return Cj().length>0||xqo()}
function lI(e){return Cj().some((n)=>n.disabled!==!0&&typeof n.value==="string"&&e(n.value))}
function Eb(){if(He()!=="firstParty"||!Js())return!1;let e=Cj().filter((r)=>typeof r.value==="string"&&mpe(r.value)),n=Be(eIe(),{identity:!0});return Pb(e,(r)=>Be(String(r.value),{identity:!0})===n,(r)=>r.disabled===!0)}
function Pb(e,n,r){let s=e.filter(n),g=s.length>0?s:e;return g.length>0&&g.every(r)}
function Mb(e,n){if(bF()===null)return!1;let r=Fr().filter((s)=>e(s.id));return Pb(r,(s)=>n!==void 0&&Be(s.id,{identity:!0})===n,(s)=>!dpe(s))}
function SQn(e){if(He()!=="firstParty"||!Js())return!1;let n=(h)=>Vyt(h)?h:void 0,r=e===void 0?void 0:n(Be(e,{identity:!0})),s=(h)=>{let b=h.filter((v)=>v.canonical===r);return(b.length>0?b:h).some((v)=>v.enabled)},g=()=>{let h=bF();return s(Fr().flatMap((b)=>{let v=n(Be(b.id));return v&&h!==null?[{canonical:v,enabled:Gyt(h,b)}]:[]}))};if(c8())return g();if(kd()){if(Mb(Xyt,r))return!1;if(!sI())return g()}return s(Cj().flatMap((h)=>{let b=typeof h.value==="string"?n(Be(h.value,{identity:!0})):void 0;return b?[{canonical:b,enabled:h.disabled!==!0}]:[]}))}
function uI(e){let n=bF();if(n===null)return!1;return Fr().some((r)=>Gyt(n,r)&&e(r.id))}
function d8(e){let n=a.ANTHROPIC_DEFAULT_FABLE_MODEL;if(!n)return!1;return Ct(e)===Ct(n)}
function xy(e,n){return Be(e,n?.identity?{identity:!0}:void 0).startsWith("claude-fable-")||d8(e)}
function LM(e,n){if(He()!=="firstParty"||!Js())return null;let r=d0e(e.toLowerCase().trim())?Rt(e):e,s=n?.ignoreModelOverrides?(A)=>fb(Ct(A.toLowerCase()).trim()):hI,g=s(e),h=s(r),b=fy(e,r,g,h)??Fr().find((A)=>!dpe(A)&&(s(A.id)===g||s(A.id)===h));if(b!==void 0&&!dpe(b))return{reason:"disabled",description:bY(b.selection_notice?.text??b.notice?.text??"")||bY(b.description??"")||"Not available"};if(b!==void 0&&qy(b.id).status==="unknown")return{reason:"disabled",description:gQn,notOffered:!0};if(!c8()){let A=Cj().find((R)=>R.disabled===!0&&typeof R.value==="string"&&(s(R.value)===g||s(R.value)===h));if(A)return{reason:"disabled",description:A.description}}let v=n?.ignoreModelOverrides?fb(r):Be(r,{identity:!0}),w=c8()?Fr().some((A)=>dpe(A)&&(s(A.id)===g||s(A.id)===h)):Cj().some((A)=>A.disabled!==!0&&typeof A.value==="string"&&(s(A.value)===g||s(A.value)===h));if(!w&&!ZPe()&&QPe(v))return{reason:"absent",displayName:Yw(r)??"That model"};if(!w&&!SQn(v)&&Vyt(v))return{reason:"absent",displayName:Yw(r)??"That model"};return null}
function hI(e){return Be(Ct(e.toLowerCase()).trim())}
var yI={firstParty:"first_party",bedrock:"bedrock",vertex:"vertex",foundry:"foundry",anthropicAws:"anthropic_aws",anthropicGoogleCloud:"anthropic_google_cloud",mantle:"mantle",gateway:"gateway"};
function aa(e,n,r=He()){let s=Ib(e,r);return s!==void 0?n[s]:void 0}
function Ib(e,n=He()){let r=Cje(e,yI[n]);if(r===void 0)return;let s=xa(r)?.provider_ids.first_party;return s!==void 0?OU[s]:void 0}
function bI(e,n,r){if(r!=="firstParty"||e!=="opus"&&e!=="sonnet"&&e!=="haiku")return;let s=Qy(e);if(s===void 0)return;let g=s.toLowerCase(),h=Object.hasOwn(OU,g)?OU[g]:void 0;return h!==void 0?n[h]:eT(s)}
function la(e){return bI(e,RS(),He())}
function Nb(e){let n=V0(e);if(n===e)return e;return ja()&&(Kb(n)||vI(n))?n:e}
function vI(e){return!1}
function Ud(e=RS()){let n=aa("fable",e)??e.fable51;return Nb(n)}
function Bu(){let e=a.ANTHROPIC_DEFAULT_OPUS_MODEL;if(e!==void 0)return eT(e);return la("opus")??ln()}
function ln(e=RS()){return aa("opus",e)??e.opus55}
function xm(){let e=a.ANTHROPIC_DEFAULT_SONNET_MODEL;if(e!==void 0)return eT(e);return la("sonnet")??ea()}
function ea(e=RS()){return aa("sonnet",e)??e.sonnet46}
function Sj(){let e=a.ANTHROPIC_DEFAULT_HAIKU_MODEL;if(e!==void 0)return eT(e);return la("haiku")??Bd()}
function Bd(e=RS()){return aa("haiku",e)??e.haiku45}
function $H(e){return e==="opusplan"||e==="haiku"}
function gpe(e){if(e==="opusplan"||e==="opusplan[1m]")return"opus";if(e==="haiku")return"sonnet";return null}
function Hd(e){return!1}
function Kw(e){let n=e.trim().toLowerCase(),r=Ct(n).trim();if(!Ny(r)||!od())return null;let s=gU();if(!(er()||{}).availableModels&&s.size===0&&!mQn())return null;let g=fQn(r);if(g===null||!(Fk(g)??$r(g))||mU(g,s))return null;if(r===n)return g;return(r==="opus"?wF():r==="sonnet"?EF():!0)&&Poe(g)?`${g}[1m]`:g}
function bQn(e){let n=gpe(e);if(n===null||e===void 0||e===null)return null;let r=e==="opusplan[1m]",s=n==="opus"&&!r&&bj(),g;if(n==="opus"){let v=Bu();g=r||ype(v)?CF(v):v}else g=xm();if((Fk(g)??$r(g))&&!mU(g,gU()))return{model:g,clamp:"none"};let b=Kw(n==="opus"?r||s?"opus[1m]":"opus":"sonnet");if(b!==null)return{model:s&&da(b)==="native"?V0(b):b,clamp:"stepDown"};return{model:Rt(e),clamp:"resting"}}
function CF(e){return e.replace(/(\[1m\])+$/i,"")+"[1m]"}
function zbn(){let e=QBe();if(!e)return null;if(!Vbn(e.name)){let n=`Org default model "${e.name}" is not one this build recognizes; using the standard default instead`;if(!et().has(n))et().add(n),t(n,{level:"warn"});return null}return Fb(e.name)}
function EQn(){let e=QBe();if(!e)return null;if(Vbn(e.name)){let n=zbn();return n===null?null:{model:n,kind:"org"}}return{model:Lb(null).setting,kind:"standard"}}
function Vbn(e){return rh(e.toLowerCase())||Moe(e)||vQn(e)}
function vQn(e){return a.ANTHROPIC_CUSTOM_MODEL_OPTION!==void 0&&cI(a.ANTHROPIC_CUSTOM_MODEL_OPTION,e)||JPe(e)||Jjt(e)!==e||Cj().some((n)=>typeof n.value==="string"&&cI(n.value,e))||JBe().some((n)=>typeof n.value==="string"&&cI(n.value,e))||(_pe()?.picker.options.some((n)=>cI(n.model.trim(),e))??!1)}
function Fb(e){let n=Gd(e,null)??e,r=$d(n)??n;return LM(r,{ignoreModelOverrides:!0})===null?r:null}
function Py(){return j3().setting}
function qbn(e){switch(e){case"org":return" \xB7 Org default";case"enforced":case"entitlement":case"managed_deny":return" \xB7 Set by your organization";case"env":return" \xB7 Set by ANTHROPIC_DEFAULT_MODEL";case"served":case"tier":return""}}
function j3(){let e=Ub();if(e!==null&&e.enforced)return{setting:e.setting,attribution:e.attribution};let n=c8(),r=WZr(),s;if(n)s=null;else if(r===void 0){if(s=zbn(),s!==null)g6e(s)}else if(r===null)s=null;else s=Fb(r);if(s!==null)return{setting:s,attribution:"org"};return Lb(e)}
function Lb(e){let n=tIe();if(n!==null)return{setting:n,attribution:"env"};let{setting:r,envFamily:s,concreteBaseline:g}=Hb();if(e!==null&&!SI(s))return{setting:e.setting,attribution:e.attribution};let h=Gd(r,s,g),b=h??r,v=$d(b);if(h!==null)return{setting:v??h,attribution:"enforced"};if(v!==null)return{setting:v,attribution:kI(b)?"managed_deny":"entitlement"};return{setting:b,attribution:"tier"}}
function Ub(){let e=_y();if(e===void 0)return null;if(rh(Ct(e.model.trim().toLowerCase()).trim()))return null;let n=new Set([e.model,Rt(e.model)]);for(let r of n)if(!tb(r)||!$r(r,{ignoreModelOverrides:!0,envFreeAliasResolution:!0})||LM(r,{ignoreModelOverrides:!0})!==null)return null;return{setting:e.model,attribution:e.orgConfigured?"org":"served",enforced:e.enforced}}
function SI(e){if(e===null)return!1;let n=na();return e==="opus"?n.opus:n.sonnet}
function $d(e){let n=gU();if(!(n.size>0&&mU(e,n))&&!ta(e))return null;let s=[{family:"opus",model:Bu()},{family:"sonnet",model:xm()},{family:"haiku",model:Sj()}],g=Be(Rt(e)),h=s.findIndex((w)=>g.includes(w.family)),b=h!==-1?h:xy(Rt(e))?0:1;for(let{family:w,model:A}of s.slice(b)){if($r(A))return A;let R=Td(w);if(R!==null)return R}if(!ta(e))return null;let v=EI();if(v===null)t(`managed settings (deniedModels or an exact-match availableModels) block the default model ${e} and every model it could fall back to`,{level:"warn"});return v}
function EI(){let e,n;try{let r=ge("policySettings");e=r?.availableModels,n=r?.availableModelsMatch==="exact"}catch{return null}for(let r of e??[]){let s=Ct(r.trim().toLowerCase());if(s==="")continue;let g=s.replace(/^claude-/,""),h=Ny(s)?s:n&&Ny(g)?g:null;if(h!==null){let v=Td(h);if(v!==null)return v;continue}if(rh(s)||s==="default")continue;let b=wu(s)!==null?s:wu(`claude-${s}`)!==null?`claude-${s}`:r.trim();if(Fd(b)&&$r(b))return b}return null}
function ta(e){try{return Ly(e)}catch{return!0}}
function kI(e){let n=gU();return!(n.size>0&&mU(e,n))}
function tIe(){let e=GZr(),n=e===void 0?a.ANTHROPIC_DEFAULT_MODEL:e;if(n==null)return null;let r=n.trim().toLowerCase();if(r==="default"||r==="inherit")return null;if($H(Ct(r)))return null;if(Hd(r))return null;if(jo().state!=="inactive"||er()?.enforceAvailableModels===!0)return null;if(!$r(n))return null;if(LM(n,{ignoreModelOverrides:!0})!==null)return null;return n}
function Hb(){let e=(r)=>ype(r)?CF(r):r;if(ft()){if(Jbn())return{setting:e(Bu()),envFamily:"opus"}}else if(od())return{setting:e(Bu()),envFamily:"opus"};let n=He();if(n==="mantle")return{setting:RS()[X7e],envFamily:null,concreteBaseline:String(vt()[X7e])};if(n==="bedrock"||n==="vertex"){if(Rb())return{setting:xm(),envFamily:"sonnet"};return{setting:Bu(),envFamily:"opus"}}return{setting:xm(),envFamily:"sonnet"}}
function Gd(e,n,r){let s=er()||{},{availableModels:g,enforceAvailableModels:h}=s,b={},v=jo();if(v.state==="refused")return null;let w=v.state==="inactive"&&v.cascadeTrusted;if(v.state==="active")g=v.allowlist,h=!0,b=v.overridesMap;else if(!v.cascadeTrusted)return null;if(!h)return null;if(w&&Object.keys(b).length===0&&s.modelOverrides)b=s.modelOverrides;if(!g||g.length===0)return null;let A={overridesMap:b,envFreeAliasResolution:!0,allowlist:g},R={overridesMap:b},M=(_e)=>{let be=fb(Ct(_e));for(let[Oe,ve]of Object.entries(b))if(fb(Ct(Oe))===be)return ve;return},D=(_e,be)=>{let Oe=Ct(_e);if(be?.isConcreteEntry)return _e;let ve=M(Oe);if(!ve?.trim())return _e;ve=ve.trim();{let Te=Ct(ve).trim().toLowerCase(),Ne=zd(ve),Re=rh(Te)?Qs(Te):null;if(Re!==null)ve=Ne?CF(Re):Re;else{let Ge=Te.startsWith("claude-")?Te:`claude-${Te}`;if(n2e(Ge)&&od()){let Nt=ln(vt());ve=Ne?CF(Nt):Nt}}}if(LM(Ct(ve),{ignoreModelOverrides:!0})!==null){let Te=`enforceAvailableModels: the managed modelOverrides target "${ve}" is server-unavailable; using the unmapped candidate`;if(!et().has(Te))et().add(Te),t(Te,{level:"warn"});return _e}if(Oe!==_e)return Poe(ve,R)?CF(ve):V0(ve);if(zd(ve)&&!Poe(ve,R))return V0(ve);return ve},K=null,G=String(e),z=Ct(G.trim().toLowerCase()),j=zd(e),X=z.startsWith("claude-")?z:`claude-${z}`,J=n2e(X)?ln(vt()):Qs(z);if(J!==null){let be=z!==G.trim().toLowerCase()&&Poe(J,R)?CF(J):Ct(J),Oe=Rt(G);if(Ct(Oe)!==Ct(J))K=be;if($r(be,A))if(Ct(Oe)!==Ct(J)){if(LM(be,{ignoreModelOverrides:!0})===null)return D(be)}else return null}else{let _e=vt(),be=AI(_e);if(n!==void 0){if(n!==null){let Oe=be.find(([Ne])=>Ne===n);if(Oe===void 0)throw Error(`steeringVarTable has no row for tier family "${n}"`);let ve=Oe[3],Te=ve();if(typeof Te==="string"&&Ct(Te).toLowerCase()!==z){let Ne=ve();K=j&&Poe(Ne,R)?CF(Ne):Ne}}if(n===null&&r!==void 0&&Ct(r).toLowerCase()!==z)K=r}else{let Oe=(()=>{for(let[,,Te,Ne]of be){let Re=Ne();if(typeof Re==="string"&&Ct(Re).toLowerCase()===z)return Te}return null})(),ve=be;for(let[,Te,Ne,Re]of ve){if(Te===void 0||Ct(Te.trim().toLowerCase())!==z)continue;if(Oe!==null&&Oe<=Ne)continue;{let Ge=Re();K=j&&Poe(Ge,R)?CF(Ge):Ge}break}}if($r(e,A))return null}let Q=[];for(let _e of g){let be=_e.trim();if(!be)continue;let Oe=be.toLowerCase(),ve=Ct(Oe),Te=Qs(ve);if(Te!==null){let xe=Oe!==ve&&Poe(Te,R)?CF(Te):Te;if(Fd(xe)&&$r(xe,A)){if(LM(xe,{ignoreModelOverrides:!0})===null)return D(xe);Q.push(be)}continue}let Ne=Ct(Oe),Re=Ne.startsWith("claude-")?Ne:`claude-${Ne}`;if(n2e(Re)&&od()){let jt=ln(vt()),wn=Oe!==Ne&&Poe(jt,R)?CF(jt):jt;if(LM(wn,{ignoreModelOverrides:!0})===null)return D(wn);Q.push(be);continue}let Ge=He()!=="foundry"&&!Oe.startsWith("claude-")&&Ms.test(Oe),Nt=Ge||He()!=="foundry"&&Oe.startsWith("claude-"),nt=Rt(Ge?`claude-${Oe}`:Nt?Oe:be),vn=Ct(nt).toLowerCase();if(Nt&&!/[-@]\d{8}$/.test(vn)&&fb(vn)!==vn)continue;if(!Fd(nt))continue;let En=!Nt||/[-@]\d{8}$/.test(vn);if($r(nt,A)){if(LM(nt,{ignoreModelOverrides:!0})===null){let jt=V0(nt);if(jt!==nt)return D(Poe(nt,R)?nt:jt,{isConcreteEntry:En});return D(nt,{isConcreteEntry:En})}Q.push(be)}}let te=K!==null?M(K):void 0,pe=te!==void 0&&Ct(te).trim().toLowerCase()===Ct(e).trim().toLowerCase(),ce=K!==null?pe?"tier default is the admin-mapped value \u2014 pinning its canonical builtin (the policy mapping re-applies at the exit)":"user steering detected \u2014 pinning the env-free tier builtin (policy-mapped if applicable)":"keeping the tier default",he=Q.length>0?`enforceAvailableModels: no availableModels entry survived; ${Q.length} entr${Q.length===1?"y was":"ies were"} allowed but skipped as server-unavailable (${Q.join(", ")}); ${ce}`:`enforceAvailableModels: no availableModels entry expands to an allowed model; ${ce}`;if(!et().has(he))et().add(he),t(he,{level:"warn"});return K!==null?D(K):null}
function Poe(e,n){if(Kbn(e,n))return!1;let r=fb(V0(e).trim());if(!r.startsWith("claude-"))return!0;return r.includes("opus")&&od()?bj():!0}
function Kbn(e,n){let r=e.trim(),s=V0(r).trim(),g=fb(s);if(g.startsWith("claude-"))return bpe(g);if(bpe(Be(s,n)))return!0;return s!==r&&n?.overridesMap===void 0&&bpe(Be(r))}
function AI(e){return[["haiku",a.ANTHROPIC_DEFAULT_HAIKU_MODEL,0,()=>Bd(e)],["sonnet",a.ANTHROPIC_DEFAULT_SONNET_MODEL,1,()=>ea(e)],["opus",a.ANTHROPIC_DEFAULT_OPUS_MODEL,2,()=>ln(e)]]}
function et(){return Xr().warnedEnforcementMessages}
function jo(){try{let e=ufe().filter((b)=>!jtr(b)),n=ge("policySettings"),r=(b)=>{if(!n||e.length===0)return;let v=b?"enforceAvailableModels: an admin policy source failed to load; enforcing the surviving admin tier (the failed source may carry a different policy \u2014 fix it to restore full coverage)":"enforceAvailableModels: an admin policy source failed to load and the surviving admin tier carries no model policy \u2014 model enforcement is OFF; the failed source may have carried it";if(!et().has(v))et().add(v),t(v,{level:"warn"})};if(j8()){if(!et().has("enforceAvailableModels: a policy source exists but failed to load; refusing cascade-trust mode (model enforcement from user/project settings is disabled until the policy source is fixed)"))et().add("enforceAvailableModels: a policy source exists but failed to load; refusing cascade-trust mode (model enforcement from user/project settings is disabled until the policy source is fixed)"),t("enforceAvailableModels: a policy source exists but failed to load; refusing cascade-trust mode (model enforcement from user/project settings is disabled until the policy source is fixed)",{level:"warn"});return{state:"refused"}}if(!n)return{state:"inactive",cascadeTrusted:!0};let{availableModels:s,enforceAvailableModels:g,modelOverrides:h}=n;if(e.length===0&&s===void 0&&g===void 0&&h===void 0&&(Jk()==="hkcu"||Jk()==="parent"))return{state:"inactive",cascadeTrusted:!0};if(g&&s===void 0){if(!et().has("enforceAvailableModels: the policy view sets the enforce flag but not availableModels; enforcement is disabled (the flag requires a policy-owned allowlist)"))et().add("enforceAvailableModels: the policy view sets the enforce flag but not availableModels; enforcement is disabled (the flag requires a policy-owned allowlist)"),t("enforceAvailableModels: the policy view sets the enforce flag but not availableModels; enforcement is disabled (the flag requires a policy-owned allowlist)",{level:"warn"});return r(!1),{state:"inactive",cascadeTrusted:!1}}if(g!==!0||s===void 0||s.length===0)return r(!1),{state:"inactive",cascadeTrusted:!1};return r(!0),{state:"active",allowlist:s,overridesMap:h??pse()??{}}}catch(e){let n=`enforceAvailableModels: policy-tier settings read failed; refusing cascade-trust mode: ${e instanceof Error?e.message:String(e)}`;if(!et().has(n))et().add(n),t(n,{level:"warn"});return{state:"refused"}}}
function Fk(e){let n=jo();if(n.state==="refused")return!1;if(n.state==="inactive")return null;let r={allowlist:n.allowlist,overridesMap:n.overridesMap,envFreeAliasResolution:!0};if(!$r(e,r))return!1;let s=e.trim().toLowerCase(),g=/\[1m\]/i.test(s)?Ct(s).trim():s;return!(rh(g)||gWt(g)||od()&&n2e(g))||Ys(g,r)}
function CI(e){return Ct(Rt(e)).toLowerCase()===Ct(El()).toLowerCase()}
function Iy(e){let n=Ct(e.trim().toLowerCase());if($H(n))return!1;if(ta(e))return!1;if(n==="best")return!1;return CI(e)}
function qqr(e){let n=Ct(e),r=Qs(n);if(r!==null)return r.toLowerCase();let s=n.startsWith("claude-")?n:`claude-${n}`;if(od()&&n2e(s))return ln(vt()).toLowerCase();return null}
var TI=new RegExp(`^((${QZ.join("|")})\\.)?(anthropic\\.|claude-)`);
function Fd(e){let n=e.toLowerCase();if(TI.test(n))return!0;if(n.startsWith("arn:aws:bedrock:"))return!0;if(He()==="foundry")return!0;return!1}
function Qs(e){let n=vt();switch(e){case"opus":return ln(n);case"sonnet":return ea(n);case"haiku":return Bd(n);case"fable":return Ud(n);case"opusplan":return ea(n);case"best":{let r=Zs[xb()];return r!==void 0?r.builtinDefault(n):ln(n)}default:return Hd(e)?ln(n):null}}
function Kqr(){let e=Hb();if(Gd(e.setting,e.envFamily,e.concreteBaseline)!==null)return!0;return $d(e.setting)!==null}
function El(){return Rt(Py())}
function Moe(e,n=Be(e)){return Doe(n)||MI(e,n)}
function MI(e,n){return!1}
function Go(e,n,r){if(e===void 0)return;for(let[s,g]of Object.entries(e)){if(!(r?cI(g,n):g===n))continue;let b=fb(s);if(Moe(b,b))return b}return}
function ua(){try{return tt().modelOverrides}catch{return}}
function AQn(e=!1){let{setting:n,attribution:r}=j3();if(r==="served"){let g=Wp(Fn(n))??As(n),h=hy(n)??l8(n,Be(Rt(n))),b=h==="opus"?" \xB7 Best for everyday, complex tasks":h==="sonnet"?" \xB7 Efficient for routine tasks":"",v=kbe(e,n)&&Ry(n)?wWt(!0,n):"";return`${g}${b}${v}`}if(r!=="tier")return`${Wp(Fn(Rt(n)))??As(n)}${qbn(r)}`;if(Jbn()){let g=Bu(),h=Wp(Fn(g))??"Opus",b=kbe(e,g)&&Ry(g);if(ype(g))return`${h} with 1M context \xB7 Best for everyday, complex tasks${b?wWt(!0,g):""}`;return`${h} \xB7 Best for everyday, complex tasks${b?wWt(!0,g):""}`}return`${Wp(Fn(xm()))??"Sonnet"} \xB7 Efficient for routine tasks`}
function Jbn(){if(aJe()||vwn()||VWt())return!0;return(Ipe()||Ewn()||$be())&&!Rb()}
function bj(){if(QP()||$be()||He()!=="firstParty")return!1;if(ft()&&ir()===null)return!1;if(a.ANTHROPIC_DEFAULT_OPUS_MODEL===void 0){let e=la("opus");if(e!==void 0&&da(e)==="never")return!1}return!0}
function ype(e){return bj()&&da(e)==="optIn"}
function Gb(e,n){let r=xa(e);if(!r)return null;let s=n&&r.context?.supports_1m_suffix?" (1M context)":"";return r.display_name+s}
function TQn(e){let[n="",...r]=e.split("-");return[n.slice(0,3)+"*".repeat(Math.max(0,n.length-3)),...r].join("-")}
function _pe(){let e=Xo(),n=fse("modelPicker").find((r)=>e.includes(r.source));return n?{picker:n.value,source:n.source}:void 0}
function II(e){let n=e.trim(),r=_pe()?.picker.options.find((s)=>s.model.trim()===n)?.label?.trim();return r===""?void 0:r}
function As(e){let n=II(e);if(n!==void 0)return n;let r=Fn(e);if($x(r)===null){let g=z7e(r,Be(r,{identity:!0}));if(g!==void 0){let w=gA(g.name??"");if(w)return w;if(g.confidential===!0){let A=gA(TQn(Ct(g.id)));if(A)return A}}let h=(w)=>typeof w.value==="string"&&Fn(w.value)===r,b=JBe().find(h),v=b??(c8()?void 0:Cj().find(h));if(v?.label){if(v===b&&oQn(v))return t_t(v.value)??v.label;return v.label}}let s=Yw(e);if(s)return s;return gA(e)||"unknown model"}
var LI=["claude-opus-4-20250514","claude-opus-4-1-20250805","claude-opus-4-0","claude-opus-4-1"];
function n2e(e){return LI.includes(e)}
function e_t(){return!a.CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP}
function t_t(e){if(He()==="foundry")return;let n=e.trim(),r=n.toLowerCase();if(/\s/.test(r))return;let s=HI(Ct(n));if(s!==void 0)return Gb(s,zd(n))??void 0;let g=r,h=wu(g);if(!h){let b=r.indexOf("claude-");if(b<=0||/[a-z0-9]/.test(r[b-1]??""))return;g=r.slice(b),h=wu(g)}if(!h||h.trailer!==void 0||/-fast(?![a-z0-9])/.test(g.slice(g.lastIndexOf(h.base)+h.base.length)))return;return Yw(zd(g)?g:Ct(g))??void 0}
function HI(e){return Go(ua(),e,!1)??Go(pse(),e,!0)}
function V0(e){return e.replace(/\[1m\]/gi,"")}
function QP(){return a.CLAUDE_CODE_DISABLE_1M_CONTEXT}
function zd(e){if(QP())return!1;return n_t(e)}
function n_t(e){return/\[1m\]/i.test(e)}
function VI(e){let n=Ct(e),r=Be(n);if(ev(r))return r;if(n===e)return;let s=Be(e);if(ev(s))return s;return}
function ev(e){let n=Ct(e);return xa(n)?.context?.native_1m===!0||n===MSt}
function Jqr(e){return VI(e)!==void 0}
function Kb(e){return!QP()&&Jqr(e)}
function bpe(e){return e.includes("claude-3-")||e==="claude-opus-4-0"||e==="claude-opus-4-1"||e==="claude-opus-4-5"||e==="claude-haiku-4-5"}
function wj(e){if(QP())return!1;let n=Be(e);if(bpe(n))return!1;if(xa(n)?.context?.supports_1m_beta)return!0;return zF(cc(e))}
function da(e){if(QP())return"never";let n=Be(e),r=Ad(e,n);if(r!==void 0&&r<1e6)return"never";if(Kb(e))return"native";let s=Be(e,{identity:!0})!==n;if(r!==void 0&&s)return"optIn";return wj(e)?"optIn":"never"}
function xqo(){let e=le();return Array.isArray(e.additionalModelOptionsCache)&&typeof e.additionalModelOptionsAnsweredAt==="number"}
function Ape(){let e=le().modelAccessCache;return(Array.isArray(e)?e:[]).filter((n)=>n!=null&&typeof n==="object"&&typeof n.apiName==="string"&&typeof n.entitled==="boolean")}
function Z7e(){let e=le(),n=e.orgModelDefaultCache;if(n==null||typeof n!=="object"||typeof n.name!=="string"||typeof n.updated_at!=="string"||typeof n.data_source!=="string"||typeof n.override_user_selection!=="boolean")return null;let r=e.oauthAccount?.organizationUuid;if(n.orgUuid!=null&&r!=null&&n.orgUuid!==r)return null;let s=n.name.replace(/[\x00-\x1f\x7f-\x9f]/g,"");return s===n.name?n:{...n,name:s}}
return {$r,gU,mU,fQn,LM,ZPe,KQ,_pe,Obe,pWt,Gyt,bpe,aWt,TQn,oQn,qbn,sqr,JBe,mQn,bj,ype,Poe,Kb,Ad,la,j3,Kqr,qqr,Qs,vt,AQn,pb,Ape,XPe,Nbn,gWt,Py,El,Yyt,Kw,Fk,Iy,$H,zd,Ko,xy,d8,Ub,QBe,EQn,Lb,bQn,vbn,nqo,Pe,jo};
}

export function createModelMenuLexical287(ports){
const {QZ}=ports;
var zj=["sonnet","opus","haiku","fable","best","sonnet[1m]","opus[1m]","fable[1m]","opusplan"];
var Vj=["sonnet","opus","haiku","fable"];
var MSt="claude-mythos-preview";
function rh(e){return zj.includes(e)}
function d0e(e){if(rh(e))return!0;let n=Ct(e);return n!==e&&Ct(n)===n&&rh(n)}
function Ct(e){return e.replace(/\[1m\]$/i,"")}
function cI(e,n){return Ct(e).toLowerCase()===Ct(n).toLowerCase()}
function Fn(e){return e.replace(/\[(1|2)m\]/gi,"")}
function wu(e){let n=e.trim().toLowerCase();if(n===""||/\s/.test(n))return null;n=n.replace(/\[[12]m\]$/,"");let s=n.lastIndexOf("/");if(s!==-1)n=n.slice(s+1);let t=/^(?:([a-z-]+)\.)?anthropic\.(claude-.*)$/.exec(n);if(t){let[,a,l=""]=t;if(a!==void 0&&!QZ.includes(a))return null;n=l}let r=u(n);if(!r)return null;let o=n.slice(r.base.length);if(o!==""&&!/^[-@]/.test(o))return null;let i={family:r.family,major:r.major,legacyVersionFirst:r.legacyVersionFirst,base:r.base};if(r.minor!==void 0)i.minor=r.minor;if(!$8r(o))i.trailer=o;else{let a=/(?:-v\d+@|[-@])(\d{8})/.exec(o)?.[1];if(a!==void 0)i.date=a}return i}
function $8r(e){return/^(?:-fast|-latest)?(?:-v\d{1,3}@\d{8}|[-@]\d{8})?(?:-v\d{1,3}(?::\d{1,3})?)?$/.test(e)}
function u0e(e,n){return e.major-n.major||(e.minor??0)-(n.minor??0)}
function qQe(e,n){return e.family===n.family&&e.legacyVersionFirst===n.legacyVersionFirst&&u0e(e,n)===0}
function u(e){let n=/^claude-([a-z]+)-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?/.exec(e);if(n){let[t,r="",o="",i]=n;return{family:r,major:Number(o),minor:i===void 0?void 0:Number(i),legacyVersionFirst:!1,base:t}}let s=/^claude-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?-([a-z]+)/.exec(e);if(s){let[t,r="",o,i=""]=s;return{family:i,major:Number(r),minor:o===void 0?void 0:Number(o),legacyVersionFirst:!0,base:t}}return null}
return {Vj,rh,d0e,cI,wu,Fn,Ct,qQe,MSt,zj};
}

export function createModelMenuSanitizers287(ports){
const {Nz,re}=ports;
function en(e){return Bun.stripANSI(e)}
var u="\\p{Default_Ignorable_Code_Point}\\u2800";
var SW=`\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\p{Cn}\\u2028\\u2029${u}`;
var p=new RegExp(`[${SW}]+`,"gu");
function nee(e){return Nz(en(e)).replace(p," ")}
function ei(e,n){let r=nee(e);if(n?.drop)r=r.replace(n.drop,"");if(r=r.replace(/\s+/g," ").trim(),n?.maxCodeUnits!==void 0)r=re(r,n.maxCodeUnits).trim();return r}
var r6e=255;
function gA(e){let n=ei(e,{drop:/[`<>]/g}).replace(/\]\(/g,"] (").replace(/!\[/g,"! [").replace(/\]\[/g,"] [").replace(/\]:/g,"] :");return re(n,r6e).trim()}
var Gqt=2048;
function bY(e){let n=ei(e).replace(/\]\(/g,"] (").replace(/!\[/g,"! [").replace(/\]\[/g,"] [").replace(/\]:/g,"] :").replace(/</g,"< ").replace(/\s+/g," ").trim();return re(n,Gqt).trim()}
return {gA,bY};
}

export function createModelMenuDenied287(ports){
const {Ct,Fn,Ny,Vj,qQe,rh,wu}=ports;
function X8(e,n){if(e===n)return 0;let s=e.length,r=n.length,i=Array.from({length:s+1},(d,c)=>Array.from({length:r+1},(p,g)=>c===0?g:g===0?c:0));for(let d=1;d<=s;d++)for(let c=1;c<=r;c++){let p=e[d-1]===n[c-1]?0:1;if(i[d][c]=Math.min(i[d-1][c]+1,i[d][c-1]+1,i[d-1][c-1]+p),d>1&&c>1&&e[d-1]===n[c-2]&&e[d-2]===n[c-1])i[d][c]=Math.min(i[d][c],i[d-2][c-2]+1)}return i[s][r]}
function Oe(e){let n=e.replace(/[\u0000-\u001f\u007f-\u009f]/g,"?");return n.length>128?`${n.slice(0,128)}\u2026`:n}
function Uy(){let e=[...Vj],n=e.pop();return e.length===0?n??"":`${e.join(", ")} or ${n}`}
function ao(e){return e.charAt(0).toUpperCase()+e.slice(1)}
function Bnr(e){let n=e.trim().toLowerCase(),s=Fn(n).trim(),r=s!==n?" Context-size tags such as [1m] are ignored: the entry blocks the model at every context size.":"";if(s==="")return{entry:null,warning:"An empty deniedModels entry was ignored."};if(Ny(s))return{entry:{kind:"family",family:s},...r!==""&&{warning:`"${Oe(e)}" blocks every ${ao(s)} model.${r}`}};if(rh(s)||s==="default")return{entry:null,warning:`"${Oe(e)}" was ignored: it names a different model depending on the release and settings. Name the model instead, for example "claude-opus-5-5".`};let i=wu(s),d=i!==null||s.startsWith("claude-")?s:`claude-${s}`,c=i??(d!==s?wu(d):null);if(c){let p=d.lastIndexOf(c.base),g=p===-1?"":d.slice(p+c.base.length),h=c.trailer===void 0&&g!==""?` "${Oe(g)}" is ignored.`:"";return{entry:{kind:"model",id:c},...(r!==""||h!=="")&&{warning:`"${Oe(e)}" blocks ${zy(c)}.${h}${r}`}}}return{entry:{kind:"literal",value:s},warning:Hy(e,s)}}
function zy(e){let n=ao(e.family);return e.minor===void 0?`every ${n} ${e.major}.x model`:`${n} ${e.major}.${e.minor} in every spelling and snapshot`}
function Hy(e,n){let s=`"${Oe(e)}" blocks only the exact model name "${Oe(n)}"; other spellings of the same model are not blocked.`,r=n.replace(/(\d)\.(\d)/g,"$1-$2");if(r!==n){let d=r.startsWith("claude-")?r:`claude-${r}`;if(wu(d)!==null)return`${s} To block a version, write it with a hyphen: "${Oe(d)}".`}let i=new RegExp(`^(${Vj.join("|")})\\s+(\\d+)(?:\\.(\\d+))?$`).exec(n);if(i){let[,d,c,p]=i;return p!==void 0?`${s} To block a version, write its model ID, for example "claude-${d}-${c}-${p}".`:`${s} To block only version ${c}, write "claude-${d}-${c}-0"; "claude-${d}-${c}" blocks every ${ao(d)} ${c}.x model.`}if(/^[a-z]+$/.test(n)){let d=Vj.find((c)=>X8(n,c)===1);return d!==void 0?`${s} If you meant the ${ao(d)} family, write "${d}".`:`${s} To block a model family other than ${Uy()}, list its versioned IDs.`}return s}
function C8o(e,n){if(e.family!==n.family||e.major!==n.major)return!1;if(e.minor!==void 0&&(n.minor??0)!==e.minor)return!1;if(e.trailer===void 0)return!0;let s=n.trailer??"";return s===e.trailer||s.startsWith(`${e.trailer}-`)}
function pVt(e){let n=Ct(e.trim().toLowerCase());if(n==="")return{kind:"ignored"};if(Ny(n))return{kind:"family",family:n};let s=n.startsWith("claude-")?n.slice(7):"";if(Ny(s))return{kind:"family",family:s};if(rh(n)||n==="default")return{kind:"ignored"};let r=wu(n)!==null||n.startsWith("claude-")?n:`claude-${n}`,i=wu(r);return i!==null?{kind:"model",id:i,latest:eXr(r,i),spelling:r}:{kind:"literal",value:n}}
function Ky(e,n){let s=e.toLowerCase(),r=s.lastIndexOf(n.base);return r===-1?"":s.slice(r+n.base.length)}
function eXr(e,n){return n.trailer===void 0&&Ky(e,n).startsWith("-latest")}
function T8o(e,n,s){return qQe(e.id,n)&&(e.id.trailer??"")===(n.trailer??"")&&(!s||e.latest)}
function jnr(e,n){for(let s of n){if(Ny(s))continue;let r=s.indexOf(e);if(r===-1)continue;let i=r+e.length;if(i===s.length||s[i]==="-")return!0}return!1}
return {Bnr,C8o,jnr,pVt,eXr,T8o};
}

export function createModelMenuTextPrimitives287(ports){
const {}=ports;
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)}
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)}
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")}
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
function Nz(t){if(l&&l(t))return t;return t.replace(a,"")}
function _D(t,n){if(t.length<=n)return t;let e=re(t,n-1),r=e.search(/\s\S*$/),i=r===-1?"":e.slice(0,r).trimEnd();return`${i.length>n/2?i:e.trimEnd()}\u2026`}
return {re,Nz,_D};
}

export function createModelMenuRegions287(ports){
const {}=ports;
var QZ=["us","eu","apac","jp","au","us-gov","global"];
return {QZ};
}

export function createModelMenuCatalogAliases287(ports){
const {Gj}=ports;
function Cje(e,t){let n=Gj().aliases,r=Object.hasOwn(n,e)?n[e]:void 0;if(!r)return;let s=r.per_provider;return(s&&Object.hasOwn(s,t)?s[t]:void 0)??r.default}
return {Cje};
}

export function createModelMenuPolicyErrors287(ports){
const {}=ports;
function i0e(e){return e.filter((n)=>n.severity!=="warning")}
var os=new Set(["EACCES","EPERM"]);
function jtr(e){return e.errorClass==="unreadable"&&e.errno!==void 0&&os.has(e.errno)}
return {i0e,jtr};
}

export function createModelMenuSignal287(ports){
const {wKt}=ports;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}}
return {Me};
}

export function createModelMenuReprobe287(ports){
const {$r,Ape,El,Nbn,Rt,Wi,XPe,Xh,Xr,c,d,i,m,p,pb,t,y}=ports;
var Kjt=600000;
function tS(e,n){return`Model "${pb(e)}" is restricted by your organization's settings. Using ${pb(n)} instead.`}
var yy=60000;
var dQn="session-model-restricted";
function jVo(e){Xr().sessionModelDenyReprobe.reprobe=e}
function by({model:e,rowDenyKeys:n,describeFallbackModel:r}){try{let s=Xr().sessionModelDenyReprobe;if(s.reprobe===void 0||s.refusedModels.has(e))return!1;for(let g of n)s.contestedDenies.set(g,Number.POSITIVE_INFINITY);return PD(s,e,n,r).catch(d),!0}catch(s){return d(s),!1}}
async function PD(e,n,r,s){let g=e.generation;try{t("[model-access] cached deny appeared under the running model; re-asking the server before demoting");let h=await e.reprobe?.(n)??"probe_failed";if(i("tengu_session_model_cached_deny_reprobe",{outcome:c(h)}),h==="probe_failed")p("model_cached_deny_reprobe","probe_failed");else y("model_cached_deny_reprobe",{outcome:c(h)});if(e.generation!==g)return;switch(h){case"probe_failed":{let b=Date.now()+yy;for(let v of r)e.contestedDenies.set(v,b);return}case"overturned":for(let b of r)e.contestedDenies.delete(b);return;case"denied_by_server":case"denied_by_policy":{for(let v of r)e.contestedDenies.delete(v);e.refusedModels.add(n);let b=tS(n,s());Wi({type:"system",subtype:"notification",key:dQn,text:b,priority:"high",color:"warning"}),e.restricted.emit(b);return}}}catch(h){if(d(h),m("model_cached_deny_reprobe","internal_error"),e.generation!==g)return;let b=Date.now()+yy;for(let v of r)e.contestedDenies.set(v,b)}}
function WVo(){let e=Xr();e.providerCache.confirmedEntitlementDenies.clear(),e.providerCache.overturnedEntitlementDenies.clear();let n=e.sessionModelDenyReprobe;n.honoredModels.clear(),n.contestedDenies.clear(),n.refusedModels.clear(),n.generation+=1}
function GVo(e){return Xr().sessionModelDenyReprobe.restricted.subscribe(e)}
function uQn(e){let n=Xr().sessionModelDenyReprobe;if(n.honoredModels.add(e),!n.refusedModels.has(e))return;let r=Date.now();for(let s of n.contestedDenies.values())if(s>r)return;n.refusedModels.delete(e)}
function pQn(e){let n=Xr().sessionModelDenyReprobe;if(n.reprobe===void 0||!n.honoredModels.has(e)||n.refusedModels.has(e)||!$r(e,{skipEntitlementDenyOverlay:!0}))return!1;let{confirmedEntitlementDenies:r}=Xr().providerCache,s=Date.now(),g=[];for(let h of Ape())if(!h.entitled&&Nbn(h,e)){let b=XPe(h.apiName),v=r.get(b);if(v!==void 0&&s-v<Kjt)return n.refusedModels.add(e),!1;g.push(b)}if(g.length===0)return!1;return by({model:e,rowDenyKeys:g,describeFallbackModel:rt})}
function rt(){let e=Xh();if(e!==void 0&&e!==null)return Rt(e);return El()}
return {jVo,by,pQn,uQn,WVo,GVo};
}

export function createModelMenuCatalogLifecycle287(ports){
const {Ct,Fn,Xr,hse,ja,wu,zj}=ports;
function qE(e){return e.config.models??[]}
function Aqr(e){return e.state?.model}
var gD=/^[a-z][a-z0-9]{1,23}$/;
var mD=new Set(zj.map((e)=>Ct(e)));
var hD=new Set([...mD,"default","inherit","latest","fast"]);
function Z_(e,n){let s=(n==="default"?e.runtime?.default_for_family:e.runtime?.fast_default_for_family)?.trim().toLowerCase();return s?s:void 0}
function yD(e){return gD.test(e)&&!hD.has(e)&&!e.includes("claude")}
function vD(e,n){let r=Z_(e,n);return r!==void 0&&yD(r)?r:void 0}
function YQ(e,n){let r=kp(n);return qE(e).find((s)=>kp(s.id)===r)}
function ty(e){let n=new Set;for(let r of qE(e)){if(r.confidential!==!0)continue;n.add(kp(r.id));for(let s of["default","fast"]){let g=vD(r,s);if(g!==void 0)n.add(g)}}return n}
function W7e(e){let n=ty(e);for(let s of e.config.dropped_model_ids??[])n.add(kp(s));let r=Aqr(e);if(r!==void 0&&YQ(e,r)===void 0)n.add(kp(r));return n}
function Obn(e){return e.config.dropped_unidentified_rows===!0}
function kp(e){return Fn(e).trim().toLowerCase()}
function aQn(e,n,r=!1){let s=Xr().servedCatalogActive,g=s?.source==="fallback"?s:void 0;wd({catalog:e,source:e===null?"fallback":"published",fetchedAt:n,stale:r,...g?.fallbackReason!==void 0&&{fallbackReason:g.fallbackReason},...g?.organizationUuid!==void 0&&{organizationUuid:g.organizationUuid}})}
function wd(e){let n=Xr();if(n.servedCatalogActive=e,n.servedCatalogDeactivatedRows=void 0,n.familySpellingVerdicts.clear(),e.catalog!==null)cWt(e.catalog)}
function FVo(){let e=Xr(),n=e.servedCatalogActive;if(n?.source==="served")e.servedCatalogDeactivatedRows=n.catalog??void 0,e.servedCatalogActive={catalog:null,source:"fallback",fetchedAt:void 0,stale:!1};e.servedCatalogPublicIds.clear()}
function ar(e){let n=Xr().servedCatalogMaskedIds;for(let r of e){let s=kp(r);if(s.length>0&&!Nr(s))n.add(s)}}
function cWt(e){if(ar(W7e(e)),Obn(e))Xr().servedCatalogMasksEveryId=!0}
var ay=new Set(hse.flatMap((e)=>wu(e)?.family??[]));
function uy(e){return ay.has(e)}
function Nr(e){return uy(e)}
function ppe(){return Xr().servedCatalogActive?.source}
function bF(){let e=Xr();if(e.servedCatalogSuppressDepth>0)return null;let n=e.servedCatalogActive?.catalog??null;if(n!==null&&!ja())return null;return n}
function Vs(){let e=bF();if(e!==null)return e;let n=Xr(),r=n.servedCatalogDeactivatedRows;if(r===void 0||n.servedCatalogSuppressDepth>0||!ja())return null;return r}
function c8(){return bF()!==null&&Xr().servedCatalogActive?.source==="served"}
return {bF,c8,ppe,Vs,wd,aQn,FVo};
}

// Only previously absent provider/reprobe/gateway fields are installed on the shared model-state owner.
export function createModelMenuStateFields287({sqr,Me}){return {providerCache:sqr(),sessionModelDenyReprobe:{reprobe:void 0,honoredModels:new Set,contestedDenies:new Map,refusedModels:new Set,generation:0,restricted:Me()},gatewayModelsByCachePath:new Map,gatewayModelsStorageV5:void 0,warnedEnforcementMessages:new Set};}

export function createModelMenuCatalogStateFields287(){return {servedCatalogActive:void 0,servedCatalogDeactivatedRows:void 0,familySpellingVerdicts:new Map,servedCatalogMaskedIds:new Set,servedCatalogMasksEveryId:!1,servedCatalogPublicIds:new Map,servedCatalogSuppressDepth:0};}
