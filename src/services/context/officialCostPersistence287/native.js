// Generated from pinned official 2.1.287 raw; UTF-16 provenance alongside.
export function createCostPersistence287(ports) {
const {executionContext:n,root:v,project:js,saveProject:$f,mapValues:Qr,sumBy:kEe,sessionId:q,totalCost:ah,apiDuration:_O,apiDurationWithoutRetries:Csr,toolDuration:Asr,linesAdded:REe,linesRemoved:xEe,totalDuration:aie,startTime:$Oe,modelUsage:nP,unknownCost:ksr,inputTokens:Twt,outputTokens:vf,cacheCreationTokens:Rwt,cacheReadTokens:kwt,webSearchRequests:gZr,shuttingDown:Ai,restore:neo,sdkBetas:Qp,contextWindow:pf,maxOutputTokens:QQ,logError:d,number:cn,string:ue,object:mt,record:Cg,literal:Ip,boolean:Eo}=ports;
class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}};
var _rr=new i;
function f(e){return _rr.lazy(e)};
function yJe(){let e={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION.match(/^\d+\.\d+\.\d+(?:-[a-z]+)?/);return e?e[0]:void 0};
function XZr(e){v.costLedger.registerSaver(e)};
function JZr(e){n().costLedger.runSaver(e,v.costLedger)};
function QZr(e){v.costLedger.registerTranscriptRecorder(e)};
function ZZr(e,t){n().costLedger.runTranscriptRecorder(e,t,v.costLedger)};
function eeo(){let e=n();return e.costLedger.belongsTo(e.id)};
function teo(){let e=n();e.costLedger.scopeTo(e.id)};
var T3e=1000000000000000;
var tyn=1e9;
var ayn=Object.keys({inputTokens:!0,outputTokens:!0,cacheReadInputTokens:!0,cacheCreationInputTokens:!0});
var myn=T3e;
var c3=f(()=>{let e=cn().nonnegative().finite().max(T3e);return mt({type:Ip("cost-state"),sessionId:ue(),totalCostUSD:e.max(tyn),totalAPIDuration:e,totalAPIDurationWithoutRetries:e,totalToolDuration:e,totalLinesAdded:e,totalLinesRemoved:e,totalDuration:e,startTime:e,modelUsage:Cg(ue().regex(/^[^\p{Cc}\p{Cf}]+$/u),mt({inputTokens:e,outputTokens:e,thinkingTokens:e.optional(),cacheReadInputTokens:e,cacheCreationInputTokens:e,webSearchRequests:e,costUSD:e})).refine((n)=>ayn.every((r)=>kEe(Object.values(n),r)<=myn)),hasUnknownModelCost:Eo().optional()})});
function CMt(){if(!eeo())return;return{type:"cost-state",sessionId:q(),totalCostUSD:ah(),totalAPIDuration:_O(),totalAPIDurationWithoutRetries:Csr(),totalToolDuration:Asr(),totalLinesAdded:REe(),totalLinesRemoved:xEe(),totalDuration:aie(),startTime:$Oe(),modelUsage:Qr(nP(),(e)=>({inputTokens:e.inputTokens,outputTokens:e.outputTokens,thinkingTokens:e.thinkingTokens,cacheReadInputTokens:e.cacheReadInputTokens,cacheCreationInputTokens:e.cacheCreationInputTokens,webSearchRequests:e.webSearchRequests,costUSD:e.costUSD})),hasUnknownModelCost:ksr()}};
function Bce(e){let n=e.costState;if(!n)return teo(),!1;return neo({totalCostUSD:n.totalCostUSD,totalAPIDuration:n.totalAPIDuration,totalAPIDurationWithoutRetries:n.totalAPIDurationWithoutRetries,totalToolDuration:n.totalToolDuration,totalLinesAdded:n.totalLinesAdded,totalLinesRemoved:n.totalLinesRemoved,lastDuration:n.totalDuration,startTime:n.startTime,modelUsage:Qr(n.modelUsage,(r,s)=>({...r,contextWindow:pf(s,Qp()),maxOutputTokens:QQ(s).default})),hasUnknownModelCost:n.hasUnknownModelCost}),!0};
function cdt(e,n){let r=CMt();if(r)ZZr(r,n);$f(GEe(e),n)};
function GEe(e){let n={lastCost:ah(),lastAPIDuration:_O(),lastAPIDurationWithoutRetries:Csr(),lastToolDuration:Asr(),lastDuration:aie(),lastStartTime:$Oe(),lastLinesAdded:REe(),lastLinesRemoved:xEe(),lastTotalInputTokens:Twt(),lastTotalOutputTokens:vf(),lastTotalCacheCreationInputTokens:Rwt(),lastTotalCacheReadInputTokens:kwt(),lastTotalWebSearchRequests:gZr(),lastFpsAverage:e?.averageFps,lastFpsLow1Pct:e?.low1PctFps,lastGracefulShutdown:Ai(),lastVersionBase:yJe(),lastModelUsage:Qr(nP(),(r)=>({inputTokens:r.inputTokens,outputTokens:r.outputTokens,thinkingTokens:r.thinkingTokens,cacheReadInputTokens:r.cacheReadInputTokens,cacheCreationInputTokens:r.cacheCreationInputTokens,webSearchRequests:r.webSearchRequests,costUSD:r.costUSD})),lastSessionId:q()};return(r)=>({...r,...n})};
function fUn(e){cdt(void 0,e)};
function YZo(e,n){js().appendEntry(e,e.sessionId,void 0,n).catch(d)};
XZr(fUn);QZr(YZo);
return {save:cdt,snapshot:CMt,restore:Bce,schema:c3,projectSaver:GEe,runSaver:JZr};
}
