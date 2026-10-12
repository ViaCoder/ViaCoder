import {po} from '../official-goal-checkin/chunk-v4wcnq1g.js';
function E7n(e){return{condition:e.condition,iterations:e.iterations,set_at:e.setAt,tokens_at_start:e.tokensAtStart,...e.lastReason!==void 0&&{last_reason:e.lastReason}}}
function T(e,i){if(e===i)return!0;if(e===void 0||i===void 0)return!1;return L.every((s)=>e[s]===i[s])}
const L=["condition","setAt","iterations","tokensAtStart","lastReason"];
function mXe(e){if(!e)return;if(typeof e.condition!=="string"||!Number.isSafeInteger(e.iterations)||e.iterations<0||!Number.isSafeInteger(e.set_at)||e.set_at<0||!Number.isSafeInteger(e.tokens_at_start)||e.tokens_at_start<0||e.last_reason!==void 0&&typeof e.last_reason!=="string")return;return{condition:po(e.condition,{maxCodeUnits:4000}),iterations:e.iterations,setAt:e.set_at,tokensAtStart:e.tokens_at_start,...e.last_reason!==void 0&&{lastReason:po(e.last_reason,{maxCodeUnits:512})}}}
export {E7n as encodeGoal, mXe as decodeGoal, T as equalGoals};
