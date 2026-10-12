// GENERATED from pinned 2.1.287 raw source by scripts/official/generate-recap-production-287.mjs.
// The original M/A/b/Mkt bodies are retained; only b() Bun chunk imports are injected ports.
export type OfficialRecap287Ports = Record<string, any>
export function createOfficialRecap287(ports: OfficialRecap287Ports) {
  const {k,p,y,m}=ports
  const JR=ports.getLastCacheSafeParams, IC=ports.runForkedAgent, Re=ports.createUserMessage
  const t=ports.debug
  const h="The user stepped away and is coming back. Recap in under 40 words, 1-2 plain sentences, no markdown. Lead with the overall goal and current task, then the one next action. Skip root-cause narrative, fix internals, secondary to-dos, and em-dash tangents."
  const f=400
  const v="/recap only runs when you ask for it yourself in this session: from the terminal, the Claude app or claude.ai/code, or over Remote Control. A message relayed from Slack, Teams or a project thread, or sent by a routine or another program, can't request it."
  function fChar(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)}
  function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")}
  function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return fChar(r>=55296&&r<=56319?e.slice(0,-1):e)}
  function _D(t,n){if(t.length<=n)return t;let e=re(t,n-1),r=e.search(/\s\S*$/),i=r===-1?"":e.slice(0,r).trimEnd();return`${i.length>n/2?i:e.trimEnd()}\u2026`}
  const rD="__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__"
  function e_e(e){let n=e.split(`
`),r=n.findIndex((g)=>g.trim()===rD);if(r===-1)return[e];let s=n.slice(0,r).join(`
`)+`
`,h=`
`+n.slice(r+1).join(`
`);return[...s.trim()?[s]:[],rD,...h.trim()?[h]:[]]}
  function l(e,n){return Jg(e.flatMap((r)=>r.type==="assistant"&&(n||!r.isApiErrorMessage)?r.message.content:[]).filter((r)=>r.type==="text").map((r)=>("text"in r)?r.text:"").join("")).trim()}
  const Vs=["cc-memory","cc_memory","ccmemory","CC-MEMORY","CC_MEMORY","CCMEMORY"]
const Ks=`(?:${Vs.join("|")})`
const qs="[^>]{0,1024}"
const vn=new RegExp(`</?${Ks}(?=[\\s/>])${qs}>`,"g")
  function Jg(e){return e.replace(vn,"")}
  const dp="command-name"
const yf="command-message"
const iwt="bash-input"
const Qse="bash-stdout"
const VU="bash-stderr"
const id="local-command-stdout"
const Xp="local-command-stderr"
const GK="tick"
const Ru="task-notification"
const g$="teammate-message"
const Jw="[Request interrupted by user]"
const fu="[Request interrupted by user for tool use]"
const Qw="The user doesn't want to take this action right now. STOP what you are doing and wait for the user to tell you how to proceed."
const bv="The user doesn't want to proceed with this tool use. The tool use was rejected (eg. if it was a file edit, the new_string was NOT written to the file). STOP what you are doing and wait for the user to tell you how to proceed."
const $M="No response requested."
const YSe="Another Claude session sent a message"
const KTe=new Set([Jw,fu,Qw,bv,$M])
  function eM287(e){return e.type!=="progress"&&e.type!=="attachment"&&e.type!=="system"&&Array.isArray(e.message.content)&&e.message.content[0]?.type==="text"&&KTe.has(e.message.content[0].text)}
function fo(e,n=""){return e.filter((r)=>r.type==="text").map((r)=>r.text).join(n)}
function Cw(e){if(typeof e==="string")return e;if(Array.isArray(e))return fo(e,`
`).trim()||null;return null}
function yh(e){if(e.type!=="user")return null;let n=e.message.content;return Cw(n)}
function ZAe(e){if(e.startsWith(`<${g$} `))return!0;return e.startsWith(YSe)&&e.startsWith(`<${g$} `,e.indexOf(`
`)+1)}
function Gce(e){if(e.type!=="user")return!1;if(Array.isArray(e.message.content)&&e.message.content[0]?.type==="tool_result")return!1;if(eM(e))return!1;if(e.isMeta)return!1;if(e.isCompactSummary||e.isVisibleInTranscriptOnly)return!1;let n=yh(e)?.trim()??"";if(n.indexOf(`<${id}>`)!==-1||n.indexOf(`<${Xp}>`)!==-1||n.indexOf(`<${Qse}>`)!==-1||n.indexOf(`<${VU}>`)!==-1||n.indexOf(`<${Ru}>`)!==-1||n.indexOf(`<${GK}>`)!==-1||ZAe(n))return!1;return!0}
function KM(e){return e.startsWith(`<${id}>`)||e.startsWith(`<${Xp}>`)||e.startsWith(`<${yf}>`)||e.startsWith(`<${dp}>`)||e.startsWith(`<${iwt}>`)||e.startsWith(`<${Ru}>`)}
function Bi(e){return e?.type==="system"&&e.subtype==="compact_boundary"}
function hdt(e){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r&&Bi(r))return n}return-1}
  function ai287(e,n){let r=hdt(e);return r===-1?e:e.slice(r)}
  const ai=(messages)=>ai287(messages,undefined)
  const eM=(value)=>eM287(value)||ports.cRefusalExcluded(value)
  function qJ(e){return e.dispatchedOverBridge===!0||e.submissionVerifiedSlackHumanTurn===!0}
  function SYe(e){return e.submittedOnLocalStdin===!0&&!qJ(e)}
  function Oy(e){return e?.kind==="human"}
  function M(e){return SYe(e)||Oy(e.submissionOrigin)&&e.submissionVerifiedSlackHumanTurn!==!0}
  async function b(e){if(!e.messages.some((s)=>s.type==="assistant"&&!s.isApiErrorMessage&&!eM(s)||s.type==="user"&&s.isCompactSummary||Gce(s)&&!KM(yh(s)??"")))return null;let[{fetchSystemPromptParts:a},{getToolPermissionContext:i},{getMainLoopModel:t,getRuntimeMainLoopModel:o},{asSystemPrompt:d},{splitSystemPromptAtBoundary:f}]=await Promise.all([ports.importOfficialModule("chunk-d0v1kby0.js"),ports.importOfficialModule("chunk-15fvv0rv.js"),ports.importOfficialModule("chunk-74f1y458.js"),ports.importOfficialModule("chunk-azftzjrk.js"),ports.importOfficialModule("chunk-d7ga10av.js")]),g=i(e),l=o({permissionMode:g.mode,mainLoopModel:t()}),{customSystemPrompt:r,appendSystemPrompt:c}=e.options,{defaultSystemPrompt:C,userContext:h,systemContext:S}=await a({session:e.session,tools:e.options.tools,mainLoopModel:l,customSystemPrompt:r,excludeDynamicSections:e.options.excludeDynamicSections,cacheBreakerPhrase:e.options.cacheBreakerPhrase,analysisOnly:!0,storageV5:e.storageV5,credentials:e.credentials}),_=d([...typeof r==="string"?f(r):Array.isArray(r)?r:C,...c?[c]:[]]),u=e.messages.at(-1),P=ai(u?.type==="assistant"&&u.message.stop_reason===null?e.messages.slice(0,-1):e.messages);return{systemPrompt:_,userContext:h,systemContext:S,toolUseContext:{...e,options:{...e.options,mainLoopModel:l}},forkContextMessages:P,advisorModel:e.getAdvisorSetting()}}
  async function Mkt(e,n){let r=JR();if(!r&&n){if(e.aborted)return{kind:"aborted"};try{r=await n()}catch(i){return t(`[awaySummary] fallback params rebuild failed: ${i}`),{kind:"failed"}}if(e.aborted)return{kind:"aborted"}}if(!r)return t("[awaySummary] no CacheSafeParams saved, skipping"),{kind:"no-turn"};let o=new AbortController;e.addEventListener("abort",()=>o.abort(),{once:!0});try{let{messages:i}=await IC({promptMessages:[Re({content:h})],cacheSafeParams:r,overrides:{abortController:o},canUseTool:async()=>({behavior:"deny",message:"Away summary cannot use tools",decisionReason:{type:"other",reason:"away_summary"}}),querySource:"away_summary",forkLabel:"away_summary",maxTurns:1,skipCacheWrite:!0,skipTranscript:!0});if(e.aborted)return{kind:"aborted"};let u=i.find((c)=>c.type==="assistant"&&c.isApiErrorMessage);if(u)return{kind:"api-error",text:l([u],!0)};let s=l(i,!1),d=s.length>f;if(d){let c=_D(s,f);t(`[awaySummary] recap capped from ${s.length} to ${c.length} chars`),s=c}return s?{kind:"ok",text:s,capped:d}:{kind:"failed"}}catch(i){if(e.aborted)return{kind:"aborted"};return t(`[awaySummary] generation failed: ${i}`),{kind:"failed"}}}
  const A=async(e,n)=>{if(!M(n)&&k("tengu_playful_hare",!0))return{type:"text",value:v};let a=!1,i=!1,t=await Mkt(n.abortController.signal,async()=>{try{let o=await b(n);return a=o!==null,o}catch(o){throw i=!0,o}});switch(t.kind){case"ok":if(t.capped)p("recap_command","capped",{fallback_params:a});else y("recap_command",{fallback_params:a});return{type:"text",value:t.text};case"api-error":return m("recap_command","api_error",{fallback_params:a}),{type:"text",value:t.text,outcome:{kind:"failed"}};case"no-turn":return{type:"text",value:"Nothing to recap yet \u2014 send a message first."};case"aborted":return{type:"text",value:"Recap cancelled."};case"failed":return m("recap_command",i?"fallback_rebuild_failed":"failed",{fallback_params:a}),{type:"text",value:"Couldn't generate a recap. Run with --debug for details.",outcome:{kind:"failed"}}}}
  const w={type:"local",name:"recap",description:"Generate a one-line session recap now",supportsNonInteractive:!0,thinClientDispatch:"post-text",load:()=>Promise.resolve({call:A})}
  return {call:A,descriptor:w,isSourceAllowed:M,buildFallbackParams:b,runOriginalQuery:Mkt,splitSystemPromptAtBoundary:e_e}
}
