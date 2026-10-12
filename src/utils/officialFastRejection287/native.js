// Complete public 287 r_ owner/signal/canonical rejection closure.
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
class r_{runtimeState={status:"active"};hasLoggedCooldownExpiry=!1;creditsExhaustedNotifiedThisTurn=!1;orgStatus={status:"pending"};lastPrefetchAt=0;inflightPrefetch=null;cooldownTriggered=Me();cooldownExpired=Me();overageRejection=Me();orgFastModeChange=Me();fastRejectedFallbackModels=new Set;everFastRejectedModels=new Set;fallbackModelFastRejected=Me();fastRejectedFallbackModelsChanged=Me();reset(){this.runtimeState={status:"active"},this.hasLoggedCooldownExpiry=!1,this.creditsExhaustedNotifiedThisTurn=!1,this.orgStatus={status:"pending"},this.fastRejectedFallbackModels.clear(),this.everFastRejectedModels.clear(),this.lastPrefetchAt=0,this.inflightPrefetch=null}enterCooldown(e,n){this.runtimeState={status:"cooldown",resetAt:e,reason:n},this.hasLoggedCooldownExpiry=!1}clearCooldown(){this.runtimeState={status:"active"}}markCooldownExpiryLogged(){this.hasLoggedCooldownExpiry=!0}replaceOrgStatus(e){let n=this.orgStatus;return this.orgStatus=e,n}claimCreditsExhaustedNotice(){if(this.creditsExhaustedNotifiedThisTurn)return!1;return this.creditsExhaustedNotifiedThisTurn=!0,!0}rearmCreditsExhaustedNotice(){this.creditsExhaustedNotifiedThisTurn=!1}beginPrefetchWindow(e,n){if(e-this.lastPrefetchAt<n)return!1;return this.lastPrefetchAt=e,!0}trackInflightPrefetch(e){this.inflightPrefetch=e}clearInflightPrefetch(e){if(this.inflightPrefetch===e)this.inflightPrefetch=null}};

export function createFastModeOwner287(){return new r_;}
export function createFastRejectionKernel287({Xl,Be,xt,d,Z,t,JU,Kc,Rt,Py,Ft,Ry,To,a8,tt,ge,i,c,pr}){
function Ct(e){return e.replace(/\[1m\]$/i,"")};
function Jm(e){return Ct(Be(e,{identity:!0}))};
function mVo(e){let n=Jm(e);if(Xl.everFastRejectedModels.add(n),Xl.fastRejectedFallbackModels.has(n))return;Xl.fastRejectedFallbackModels.add(n),t(`Fast mode rejected for fallback model ${e}; using standard speed for it this session`),Xl.fallbackModelFastRejected.emit(e),Xl.fastRejectedFallbackModelsChanged.emit()};
function $7e(){if(Xl.fastRejectedFallbackModels.size===0)return;Xl.fastRejectedFallbackModels.clear(),Xl.fastRejectedFallbackModelsChanged.emit()};
function zPe(e){return Xl.fastRejectedFallbackModelsChanged.subscribe(e)};
function sWt(e){try{return Xl.fastRejectedFallbackModels.has(Jm(e))}catch(n){return d(Z(n)),!1}};
function QJn(e){try{let n=Jm(e);return Xl.fastRejectedFallbackModels.has(n)||Xl.everFastRejectedModels.has(n)}catch(n){return d(Z(n)),!1}};
function $yt(e){try{return sWt(Rt(e??Py()))}catch(n){return d(Z(n)),!1}};
function kbe(e,n){return!!e&&!$yt(n)};
function fU(){Xl.clearCooldown()};
function Lk(e,n){if(Ft()){if(e===null)return!!n;return!!n&&Ry(e)}if(!Ry(e))return!1;return!!n||Cbn(e)};
function Nk(e,n){if(!!e===n)return;i("tengu_fast_mode_toggled",{enabled:n,source:c(n?"model_switch_restore":"model_switch_downgrade"),remote:Ia()})};
function Cbn(e){if(!To())return!1;if(!tT(e))return!1;if(!Ry(e))return!1;return Abn(tt())};
function Abn(e){if(e.fastMode!==!0)return!1;if(!e.fastModePerSessionOptIn)return!0;if(ge("policySettings")?.fastModePerSessionOptIn===!0)return!1;return ge("flagSettings")?.fastMode===!0};
function tT(e){if(!To())return!1;return a8(e)===null};
function QDe(e,n){if(!(e instanceof xt)||e.status!==400)return!1;try{let r=e.message?.match(/'([^']+)' does not support the `speed` parameter/)?.[1];return r!==void 0&&Jm(r)===Jm(n)}catch(r){return d(Z(r)),!1}};
function c$e(){let e=JU();if(e===void 0||Kc()!==e.fallbackModel)return;return{previousModel:e.previousAppStateModel,fallbackModel:e.fallbackModel}};
function ZOo({requestModel:e,turnRefusalOverride:n,chainStepModel:r,userModel:s}){try{let h=Jm(e),b=Jm(s)!==h&&[n,r].some((R)=>R!==void 0&&Jm(R)===h),w=c$e();return b||w!==void 0&&Jm(w.fallbackModel)===h}catch(h){return d(Z(h)),!1}};
function Ia(){let e=pr();return e?.caps?.controlChannel===!0&&!e.viewerOnly};

return {mVo,$7e,zPe,sWt,QJn,QDe,ZOo,$yt,kbe,fU,Lk,Nk,qualified(un,Yt,h,r){return un&&QDe(Yt,h.model)&&(r.modelIsRefusalFallbackTarget||QJn(h.model));},repair(un,Yt,h,r){if(un&&QDe(Yt,h.model)&&(r.modelIsRefusalFallbackTarget||QJn(h.model))){mVo(h.model),h.fastMode=!1;return true;}return false;}};
}
