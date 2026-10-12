// Generated from fixed official 2.1.287. Complete raw bodies; stateless import ports.
export function createUsageText287(p){
const {Ce,t,I,en,fe,Bo,ft,zp,ir,k,E4r,Tu,Bbt,He,RN,gi,pa,VV,Klt,jce,kMe,tJt,nP,Be}=p;
function y(n){let{rate_limits:e,subscription_type:o}=n;if(!e)return null;let a=o==="max"||o==="team"||o===null,s=[{title:"Current session",limit:e.five_hour},{title:"Current week (all models)",limit:e.seven_day},...a?[{title:"Current week (Sonnet only)",limit:e.seven_day_sonnet}]:[],...(e.model_scoped??[]).map((r)=>({title:`Current week (${r.display_name})`,limit:{utilization:r.utilization,resets_at:r.resets_at}}))],i=[];for(let{title:r,limit:l}of s){if(!l||l.utilization===null)continue;let u=l.resets_at?` \xB7 resets ${Bbt(l.resets_at,!0,!0,!0)}`:"";i.push(`${r}: ${Math.floor(l.utilization)}% used${u}`)}return i.length>0?i.join(`
`):null}
function _(n){let{behaviors:e}=n;if(!e)return null;let o=[d("Last 24h",e.day),d("Last 7d",e.week)].filter((a)=>a!==null);if(o.length===0)return null;return[h,"Approximate, based on local sessions on this machine \u2014 does not include other devices or claude.ai. Behaviors are independent characteristics, not a breakdown.","",o.join(`

`)].join(`
`)}
var h="What's contributing to your limits usage?";
function v(n){let e=n.rate_limits,o=E4r().safeParse({session:n.session,rate_limits:e===null?null:{limits:e.limits??null,extra_usage:e.extra_usage}});if(!o.success){t(`usage_report: twin dropped, the usage data failed its schema: ${o.error.message}`,{level:"warn"});return}return o.data}
var G=async(n,e)=>{let o=ir()!==null||zp();if(ft()&&o&&!RN()){let s;if(pa().isUsingOverage)s="You are currently using your overages to power your Claude Code usage. We will automatically switch you back to your subscription rate limits when they reset";else s="You are currently using your subscription to power your Claude Code usage";let i=Ce(),r=kMe(),l=await tJt({includeBehaviors:i&&!Bo(e.session)&&r.allowed,storageV5:e.storageV5,credentials:e.credentials}),u=y(l);if(u)s+=`

${u}`;let c=l.behaviors&&!Bo(e.session)?_(l):null;if(c)s+=`

${c}`;else if(i&&!Bo(e.session)&&!r.allowed&&ft())s+=`

${h}
${r.reason}`;if(k("tengu_amber_lark",!1)){let f=xPo();if(f)s+=`

${fe.dim(f)}`}let p=v(l);return{type:"text",value:s,...p!==void 0&&{usageReport:p}}}let a=en(jce());if(He()==="gateway"){let s=await Klt(e.credentials),i=VV().overage;if(s){a+=`

Spend limit: ${gi(s.used,s.currency)} / ${gi(s.limit,s.currency)} spent${s.period?` ${FHt[s.period]}`:""} (${Math.round(s.utilization)}%)`;let r=s.resetsAt?Tu(Date.parse(s.resetsAt)/1000,!0,!0,!0):void 0;if(r)a+=` \xB7 resets ${r}`}else if(i)a+=`

Spend limit: ${Math.round(i.utilization*100)}% used \xB7 resets ${Tu(i.resets_at,!0,!0,!0)}`}return{type:"text",value:a}},g=8,S={cache_miss:(n)=>`${n}% of your usage hit a >100k-token cache miss`,long_context:(n)=>`${n}% of your usage was at >150k context`,subagent_heavy:(n)=>`${n}% of your usage came from subagent-heavy sessions`,high_parallel:(n)=>`${n}% of your usage was while 4+ sessions ran in parallel`,cron:(n)=>`${n}% of your usage came from sessions active for 8+ hours`};
function d(n,e){let o=e.behaviors.filter((r)=>r.pct>=f_r),a=[m("Top skills",e.skills,(r)=>`/${r}`),m("Top subagents",e.agents),m("Top plugins",e.plugins),m("Top MCP servers",e.mcp_servers)].filter((r)=>r!==null);if(o.length===0&&a.length===0)return null;let s=`${e.request_count} ${I(e.request_count,"request")}`,i=`${e.session_count} ${I(e.session_count,"session")}`;return[`${n} \xB7 ${s} \xB7 ${i}`,...o.map((r)=>`  ${S[r.key](r.pct)}`),...a.map((r)=>`  ${r}`)].join(`
`)}
function m(n,e,o){if(e.length===0)return null;let a=e.slice(0,g).map((i)=>`${o?o(i.name):i.name} ${i.pct}%`).join(", "),s=e.length-g;return`${n}: ${a}${s>0?`, +${s} more`:""}`}
function mUn(e){if(e.includes("fable"))return"fable";if(e.includes("opus"))return"opus";if(e.includes("sonnet"))return"sonnet";if(e.includes("haiku"))return"haiku";return e}
function xPo(){let e=nP(),n=Object.entries(e);if(n.length===0)return null;let r=new Map,s=0,g=0,h=0,b=0;for(let[j,z]of n){let K=mUn(Be(j));r.set(K,(r.get(K)??0)+z.costUSD),s+=z.costUSD,g+=z.inputTokens,h+=z.cacheReadInputTokens,b+=z.cacheCreationInputTokens}let w=[];if(s>0)for(let[j,z]of[...r].sort((K,he)=>he[1]-K[1]))w.push(`${j}: ${Math.round(z/s*100)}%`);let D=g+h+b;if(D>0)w.push(`cache hit: ${Math.round(h/D*100)}%`);return w.length>0?`breakdown \xB7 ${w.join(" \xB7 ")}`:null}
var FHt={daily:"today",weekly:"this week",monthly:"this month"};
var f_r=10;
return {call:G,formatRateLimits:y,formatBehaviors:_};
}
