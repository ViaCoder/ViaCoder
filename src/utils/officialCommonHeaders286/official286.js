// Generated from hash-verified Claude Code 2.1.286 AST declarations; bodies are original source text.
export function createNativeSessionRole286({a}) {
function UN(){let e=a.CLAUDE_CODE_SESSION_KIND;if(e==="bg"||e==="daemon"||e==="daemon-worker")return e;return}
function Rt(){return UN()==="bg"}
return Rt;
}
export function createNativeUserAgent286({Ug,a}) {
function z8n(){return Ug.getStore()?.workload}
function QI(){let e=process.env.CLAUDE_AGENT_SDK_VERSION?`, agent-sdk/${process.env.CLAUDE_AGENT_SDK_VERSION}`:"",n=a.CLAUDE_AGENT_SDK_CLIENT_APP?`, client-app/${a.CLAUDE_AGENT_SDK_CLIENT_APP}`:"",r=z8n(),s=r?`, workload/${r}`:"";return`claude-cli/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.286",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-09-30T15:45:16Z",GIT_SHA:"f344a08993bbba4fc1ea9b295245324610f02c58",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION} (external, ${a.CLAUDE_CODE_ENTRYPOINT??"cli"}${e}${n}${s})`}
return QI;
}
export function getNativeSessionHeaderName286() {
var Nmt="X-Claude-Code-Session-Id";
return Nmt;
}
export function createNativeSessionIdAccessor286({S,b}) {
function n(){return b()?.session??S}
function c(){let e=b();return e?.session?void 0:e}
function V(){return c()?.sessionId??n().id}
return V;
}
export function createCommonHeaders286({Nmt,QI,Rt,V}) {
function dw(){return{"x-app":Rt()?"cli-bg":"cli","User-Agent":QI(),[Nmt]:V()}}
return dw;
}
