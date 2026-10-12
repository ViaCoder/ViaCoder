// Complete original 2.1.287 declarations; generated reading view.
export function createTokenWarning287(ports){const {w,z,ice,Vu,kt,fWo,pWo,bm,ole,b,nne,YV,e,n,Le}=ports;
function xDt(Ut){return Ut.autoCompactWindow}
function RDt(Ct){return Ct.remoteAutocompactState}
function iK(h){let Se=w(17),{tokenUsage:v,model:D}=h,N=z(xDt),X=z(RDt),_e;if(Se[0]!==N||Se[1]!==D||Se[2]!==X||Se[3]!==v)_e=ice(v,Vu(D),N,X),Se[0]=N,Se[1]=D,Se[2]=X,Se[3]=v,Se[4]=_e;else _e=Se[4];let Pe=_e,Ie=vM();if(Pe.level==="ok"||Ie){return null}let Oe=Pe.pctLeft,Ne=X?X.enabled:bm(),Ve;if(Se[5]===b)Ve=ole("warning"),Se[5]=Ve;else Ve=Se[5];let qe=Ve,ze=Oe,pt=X?!X.enforced:!nne(Vu(D),N);if(pt){let St;if(Se[6]!==N||Se[7]!==D||Se[8]!==X)St=X?X.effectiveWindow:YV(Vu(D),N),Se[6]=N,Se[7]=D,Se[8]=X,Se[9]=St;else St=Se[9];let ht=St;let yt;if(Se[10]!==ht||Se[11]!==v)yt=Math.round((ht-v)/ht*100),Se[10]=ht,Se[11]=v,Se[12]=yt;else yt=Se[12];ze=Math.max(0,yt)}let bt=pt?`${100-ze}% context used`:`${ze}% until auto-compact`;if(Ne){const St=qe?`${bt} \xB7 ${qe}`:bt;let yt;if(Se[13]!==St)yt=e(n,{dimColor:!0,wrap:"truncate",children:St}),Se[13]=St,Se[14]=yt;else yt=Se[14];return yt}let xt=X!==void 0||Le(process.env.DISABLE_COMPACT);const St=qe?`Context low (${Oe}% remaining) \xB7 ${qe}`:xt?`Context low (${Oe}% remaining)`:`Context low (${Oe}% remaining) \xB7 Run /compact to compact & continue`;let yt;if(Se[15]!==St)yt=e(n,{color:"error",wrap:"truncate",children:St}),Se[15]=St,Se[16]=yt;else yt=Se[16];return yt}
function vM(){return kt(fWo,pWo)}
return {iK,xDt,RDt,vM};}
export function createContextUpgrade287(ports){const {Xh,wF,EF,Kb,Bu,xm}=ports;
function n(){let e=Xh();if(e==="opus"&&wF()&&!Kb(Bu()))return{alias:"opus[1m]",name:"Opus 1M",multiplier:5};else if(e==="sonnet"&&EF()&&!Kb(xm()))return{alias:"sonnet[1m]",name:"Sonnet 1M",multiplier:5};return null}
function ole(e){let t=n();if(!t)return null;switch(e){case"warning":return`/model ${t.alias}`;case"tip":return`Tip: You have access to ${t.name} with ${t.multiplier}x more context`;default:return null}}
return {ole};}
