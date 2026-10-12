import {c as w} from 'react/compiler-runtime';
import {useState as g} from 'react';
import {jsx as e,jsxs as r} from 'react/jsx-runtime';
import {getTotalOutputTokens as Mp} from '../../bootstrap/state.js';
import {Box as s,Text as n,useInterval as Vs} from '../../ink.js';
import {useAppState as W} from '../../state/AppState.js';
import {formatDuration as Zt,formatTokens as cr} from '../../utils/format.js';
import {Byline as ye} from '../../components/design-system/Byline.js';
import {Dialog as HostDialog} from '../../components/design-system/Dialog.js';
import {StatusIcon as tt} from '../../components/design-system/StatusIcon.js';
import {KeyboardShortcutHint} from '../../components/design-system/KeyboardShortcutHint.js';
import {GOAL_MAX_LENGTH as Pct,isGoalClearArgument as wKe,goalStartPrompt as Zln,setGoal as EKe,clearGoal as vKe} from '../../utils/goal.js';
import {logEvent} from '../../services/analytics/index.js';
const p=(name,reason)=>logEvent(name,{reason});
const b=Symbol.for('react.memo_cache_sentinel'),hn=Symbol.for('react.early_return_sentinel');
const H1t='◎';
const ge=({inputGuide,...props})=>e(HostDialog,{...props,inputGuide:()=>inputGuide});
const F=({chord,action})=>e(KeyboardShortcutHint,{shortcut:chord==='escape'?'esc':chord,action});
function I(t,n,e=n+"s"){return t===1?n:e}
function et(t,n){let e=t.indexOf(n);return e===-1?t:t.slice(0,e)}
function xr(t){return et(t,`
`)}
function iOr(t){for(let e=t.length-1;e>=0;e--){let n=t[e];if(n?.type!=="attachment"||n.attachment.type!=="goal_status")continue;let o=n.attachment;if(!o.met||o.sentinel)continue;return{condition:o.condition,iterations:o.iterations,durationMs:o.durationMs,tokens:o.tokens}}return null}
function kr(R){let c=w(9),{children:t,hint:i}=R;if(!i){let o;if(c[0]!==t)o=e(n,{dimColor:!0,children:t}),c[0]=t,c[1]=o;else o=c[1];return o}let o;if(c[2]!==t)o=e(n,{dimColor:!0,children:t}),c[2]=t,c[3]=o;else o=c[3];let d;if(c[4]!==i)d=e(n,{dimColor:!0,children:i}),c[4]=i,c[5]=d;else d=c[5];let a;if(c[6]!==o||c[7]!==d)a=r(s,{flexDirection:"column",children:[o,d]}),c[6]=o,c[7]=d,c[8]=a;else a=c[8];return a}
function Y(at){return at.activeGoal}
function Z(lt){return lt+1}
function T(u){let o=w(38),{messages:c,onDone:a}=u,t=W(Y),[,f]=g(0),_;if(o[0]===b)_=()=>f(Z),o[0]=_;else _=o[0];if(Vs(_,t?1000:null),t){const C=Date.now()-t.setAt;let y;if(o[1]!==C)y=Zt(C,{mostSignificantOnly:!0}),o[1]=C,o[2]=y;else y=o[2];let H=y;const m=Mp()-t.tokensAtStart;let h;if(o[3]!==m)h=cr(m),o[3]=m,o[4]=h;else h=o[4];let ot=h;const G=`running ${H}`;let S;if(o[5]!==t.iterations)S=t.iterations>0&&`${t.iterations} ${I(t.iterations,"turn")}`,o[5]=t.iterations,o[6]=S;else S=o[6];const v=`${ot} tokens`;let X;if(o[7]!==G||o[8]!==S||o[9]!==v)X=[G,S,v].filter(Boolean),o[7]=G,o[8]=S,o[9]=v,o[10]=X;else X=o[10];let st=X;const et=`${H1t} Goal active`;const x=st.join(" \xB7 ");let B;if(o[11]===b)B=r(ye,{children:[e(n,{children:"/goal clear to stop early"}),e(F,{chord:"escape",action:"dismiss"})]}),o[11]=B;else B=o[11];let A;if(o[12]!==t.condition)A=e(k,{label:"Goal",children:t.condition}),o[12]=t.condition,o[13]=A;else A=o[13];let D;if(o[14]!==t.lastReason)D=t.lastReason?e(k,{label:"Last check",children:xr(t.lastReason.trim())}):null,o[14]=t.lastReason,o[15]=D;else D=o[15];let M;if(o[16]!==A||o[17]!==D)M=r(s,{flexDirection:"column",children:[A,D]}),o[16]=A,o[17]=D,o[18]=M;else M=o[18];let P;if(o[19]!==a||o[20]!==x||o[21]!==M)P=e(ge,{title:et,subtitle:x,onCancel:a,inputGuide:B,children:M}),o[19]=a,o[20]=x,o[21]=M,o[22]=P;else P=o[22];return P}let C;if(o[23]!==c||o[24]!==a){C=hn;Rt:{let l=iOr(c);if(l){let O=[];if(l.durationMs!==void 0)O.push(Zt(l.durationMs,{mostSignificantOnly:!0}));if(l.iterations!==void 0)O.push(`${l.iterations} ${I(l.iterations,"turn")}`);if(l.tokens!==void 0)O.push(`${cr(l.tokens)} tokens`);let y;if(o[26]===b)y=r(n,{children:[e(tt,{status:"success",withSpace:!0}),"Goal achieved"]}),o[26]=y;else y=o[26];const m=O.join(" \xB7 ");let h;if(o[27]===b)h=r(ye,{children:[e(n,{children:"/goal <condition> to set another"}),e(F,{chord:"escape",action:"dismiss"})]}),o[27]=h;else h=o[27];let G;if(o[28]!==l)G=e(k,{label:"Goal",children:l.condition}),o[28]=l,o[29]=G;else G=o[29];let S;if(o[30]!==a||o[31]!==m||o[32]!==G)S=e(ge,{title:y,subtitle:m,color:"success",onCancel:a,inputGuide:h,children:G}),o[30]=a,o[31]=m,o[32]=G,o[33]=S;else S=o[33];C=S;break Rt}}o[23]=c,o[24]=a,o[25]=C}else C=o[25];if(C!==hn)return C;let y,m;if(o[34]===b)y=e(F,{chord:"escape",action:"dismiss"}),m=e(kr,{hint:"/goal <condition> to set one",children:"No goal set"}),o[34]=y,o[35]=m;else y=o[34],m=o[35];let h;if(o[36]!==a)h=e(ge,{title:"Goal",onCancel:a,inputGuide:y,children:m}),o[36]=a,o[37]=h;else h=o[37];return h}
function k(u){let t=w(7),{label:c,children:a}=u,f;if(t[0]!==c)f=e(s,{flexShrink:0,children:r(n,{dimColor:!0,children:[c,": "]})}),t[0]=c,t[1]=f;else f=t[1];let o;if(t[2]!==a)o=e(s,{flexGrow:1,children:e(n,{wrap:"wrap",children:a})}),t[2]=a,t[3]=o;else o=t[3];let _;if(t[4]!==f||t[5]!==o)_=r(s,{flexDirection:"row",children:[f,o]}),t[4]=f,t[5]=o,t[6]=_;else _=t[6];return _}
const At=async(u,c,a)=>{let t=a.trim();if(t==="")return e(T,{messages:c.messages,onDone:()=>u(void 0,{display:"skip"})});if(wKe(t)){let o=vKe(c);return u(o===null?"No goal set":`Goal cleared: ${o}`,{display:"system"}),null}if(t.length>Pct)return p("goal_set","too_long"),u(`Goal condition is limited to ${Pct} characters (got ${t.length})`,{display:"system"}),null;let f=EKe(t,c);if(f!==null)return u(f,{display:"system"}),null;return u(`Goal set: ${t}`,{shouldQuery:!0,metaMessages:[Zln(t)]}),null};
export {At as call,T as GoalDialog,iOr as lastAchievedGoal};
