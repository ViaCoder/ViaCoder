// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQuerySystem287(ports){
const {BH,FVn,NQ,QGr}=ports;
var HQ="59cf53e54c78";
function qw(e,n){let s=[4,7,20].map((b)=>e[b]||"0").join(""),h=`${HQ}${s}${n}`;return NQ("sha256").update(h).digest("hex").slice(0,3)};
function Q0(e,n){let r=QGr(n.fingerprint,n.agentContext,void 0,void 0,void 0,void 0,n.forceAttributionHeader&&!BH()?{ignoreEnvOptOut:!0}:void 0);if(!r)return e;return[{type:"text",text:r},...e]};
function GQ(e){let n=e.find((h)=>h.role==="user");if(!n)return"";let r=n.content;if(typeof r==="string")return r;let s=r.find((h)=>h.type==="text");return s?.type==="text"?s.text:""};
function dLr({messages:e,system:n,skipSystemPromptPrefix:r,forceAttributionHeader:s,agentContext:h}){let g=GQ(e),b=qw(g,{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION);return Q0([...r?[]:[{type:"text",text:FVn({isNonInteractive:!1,hasAppendSystemPrompt:!1})}],...Array.isArray(n)?n:n?[{type:"text",text:n}]:[]],{fingerprint:b,agentContext:h,forceAttributionHeader:s})};
return {dLr};
}
