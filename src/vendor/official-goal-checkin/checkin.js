// Official 2.1.283 selected functions, bodies unchanged.
import {Ad} from './chunk-c4grbvgn.js';
import {Ry} from './chunk-v4wcnq1g.js';
import {Gt,UL} from './chunk-v297v4sm.js';
const xu=2,Iu=3,wu=120,mfn='Goal check-in: «';
const labels={local_agent:"subagent",local_workflow:"workflow",local_bash:"shell",monitor_mcp:"monitor",monitor_ws:"monitor",mcp_task:"MCP task",in_process_teammate:"teammate",dream:"dream",auto_mode_scan:"auto-mode scan",remote_agent:"cloud session"};
const c3e=e=>labels[e]??e;
function yi(e,o){return e*2**Math.min(o,xu)}
function hi(e,o,n){let r=Math.max(1,Math.round(o/60000)),u=Ri(e);if(n.length===0)return{summary:"Goal check-in: background work no longer running",body:`${u} is still active. Its evaluation was deferred for ${r} min while background work ran, and that work is no longer running (it finished or was stopped without reporting back). Continue toward the goal.`};let s=n.map((b)=>{let k=b.type==="local_bash"&&b.kind==="monitor",h=k?"monitor":c3e(b.type),E=b.type==="local_bash"&&!k?b.command:b.description;return Gt(Ad(`- ${b.id} \xB7 ${h} \xB7 ${Ei(E)}`,wu))});return{summary:"Goal check-in: background work still running",body:`${u} is still active, and evaluation has been deferred for ${r} min because background work is still running:
${s.join(`
`)}
Check on their progress (e.g. read their output). If they are progressing, say so briefly and keep waiting; if they are stuck or no longer needed, fix or stop them and continue toward the goal.`}}
function Hn(e){return(e.idleCheckinCount??0)>=Iu}
function bi(e,o,n,r){if(e.deferredSince===void 0)return{deferredSince:n,checkinCount:0,isNewRun:!0};let u=Math.min(...o.map((b)=>b.startTime)),s=e.lastDeferralPassAt!==void 0&&Number.isFinite(u)&&u>e.lastDeferralPassAt&&n-e.lastDeferralPassAt>r;return s?{deferredSince:n,checkinCount:0,isNewRun:s}:{deferredSince:e.deferredSince,checkinCount:e.checkinCount??0,isNewRun:s}}
function Ei(e){return UL(Ry(e))}
function Ri(e){return`${mfn}${Gt(Ei(e))}\xBB`}
function vi(e,o){return e!==void 0&&e.setAt===o.setAt&&e.condition===o.condition}
export {yi as goalCheckinDelay,hi as goalCheckinText,Hn as idleCheckinsPaused,bi as goalDeferralWindow,vi as sameGoal};
