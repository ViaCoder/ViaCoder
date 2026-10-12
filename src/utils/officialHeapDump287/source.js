// Complete fixed287 heap/diagnostics/command closures; original raw bodies unchanged.
export function createHeapDump287(platform,ports,builtins){
switch(platform){
case "darwin-arm64":{
const desktop=(()=>{
const O=ports.platform;
const te=builtins["os"]["homedir"];
const ae=ports.fs;
const _=builtins["path"]["join"];
const a=ports.environment;
const t=ports.debug;
const ee=builtins["fs/promises"]["stat"];
async function dc(e){try{return await ee(e),!0}catch{return!1}}
var ye=new Set(["Public","Default","Default User","All Users"]);
async function W8o(){let e=O(),n=te(),r=ae();if(e==="macos")return _(n,"Desktop");if(e==="windows"){let f=a.USERPROFILE?a.USERPROFILE.replaceAll("\\","/"):null;if(f){let s=`/mnt/c${f.replace(/^[A-Z]:/,"")}/Desktop`;if(await dc(s))return s}try{let s=await r.readdir("/mnt/c/Users");for(let u of s){if(ye.has(u.name))continue;let y=_("/mnt/c/Users",u.name,"Desktop");if(await dc(y))return y}}catch(i){t(`Failed to enumerate /mnt/c/Users for Windows desktop path: ${i}`,{level:"error"})}}let o=_(n,"Desktop");if(await dc(o))return o;return n}
return {dc,ye,W8o};
})();
const service=(()=>{
const D=builtins["v8"]["getHeapStatistics"];
const C=builtins["v8"]["getHeapSpaceStatistics"];
const U=builtins["fs/promises"]["readdir"];
const R=builtins["fs/promises"]["readFile"];
const q=ports.session;
const fO=ports.isBun;
const O=ports.platform;
const t=ports.debug;
const W8o=desktop.W8o;
const ae=ports.fs;
const w=builtins["path"]["join"];
const P=builtins["fs/promises"]["writeFile"];
const _=ports.stringify;
const i=ports.telemetry;
const Z=ports.error;
const as=ports.isReadonlyError;
const d=ports.logError;
const k=builtins["fs"]["writeFileSync"];
async function M(u,o=0){let s=process.memoryUsage(),e=D(),n=process.resourceUsage(),m=process.uptime(),l;try{l=C()}catch{}let g=process._getActiveHandles().length,h=process._getActiveRequests().length,r;try{r=(await U("/proc/self/fd")).length}catch{}let c;try{c=await R("/proc/self/smaps_rollup","utf8")}catch{}let f,S,v;try{let{heapStats:p}=await import("bun:jsc"),b=p(!0);f=b.objectTypeCounts,S=b.protectedObjectTypeCounts,v=b.mimalloc||void 0}catch{}let x=s.rss-s.heapUsed,H=m>0?s.rss/m:0,y=H*3600/1048576,a=[];if(e.number_of_detached_contexts>0)a.push(`${e.number_of_detached_contexts} detached context(s) - possible iframe/context leak`);if(g>100)a.push(`${g} active handles - possible timer/socket leak`);if(x>s.heapUsed)a.push("Native memory > heap - leak may be in native addons (node-pty, etc.)");if(y>100)a.push(`High memory growth rate: ${y.toFixed(1)} MB/hour`);if(r&&r>500)a.push(`${r} open file descriptors - possible file/socket leak`);return{timestamp:new Date().toISOString(),sessionId:q(),trigger:u,dumpNumber:o,uptimeSeconds:m,runtime:fO()?"bun":"node",memoryUsage:{heapUsed:s.heapUsed,heapTotal:s.heapTotal,external:s.external,arrayBuffers:s.arrayBuffers,rss:s.rss},memoryGrowthRate:{bytesPerSecond:H,mbPerHour:y},v8HeapStats:{heapSizeLimit:e.heap_size_limit,mallocedMemory:e.malloced_memory,peakMallocedMemory:e.peak_malloced_memory,detachedContexts:e.number_of_detached_contexts,nativeContexts:e.number_of_native_contexts},v8HeapSpaces:l?.map((p)=>({name:p.space_name,size:p.space_size,used:p.space_used_size,available:p.space_available_size})),resourceUsage:{maxRSS:n.maxRSS*(O()==="macos"?1:1024),userCPUTime:n.userCPUTime,systemCPUTime:n.systemCPUTime},activeHandles:g,activeRequests:h,openFileDescriptors:r,analysis:{potentialLeaks:a,recommendation:a.length>0?`WARNING: ${a.length} potential leak indicator(s) found. See potentialLeaks array.`:"No obvious leak indicators. Check heap snapshot for retained objects."},smapsRollup:c,objectTypeCounts:f,protectedObjectTypeCounts:S,mimalloc:v,platform:"darwin",nodeVersion:process.version,ccVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION}}
async function Kyr(u="manual",o=0){try{let s=q(),e=await M(u,o),n=(f)=>(f/1024/1024/1024).toFixed(3);t(`[HeapDump] Memory state:
  heapUsed: ${n(e.memoryUsage.heapUsed)} GB (in snapshot)
  external: ${n(e.memoryUsage.external)} GB (${e.runtime==="bun"?"part of heapUsed, in snapshot":"NOT in snapshot"})
  rss: ${n(e.memoryUsage.rss)} GB (total process)
  ${e.analysis.recommendation}`);let m=await W8o();await ae().mkdir(m);let l=o>0?`-dump${o}`:"",g=`${s}${l}.heapsnapshot`,h=`${s}${l}-diagnostics.json`,r=w(m,g),c=w(m,h);return await P(c,_(e,null,2),{mode:384}),t(`[HeapDump] Diagnostics written to ${c}`),await T(r),t(`[HeapDump] Heap dump written to ${r}`),i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!0}),{success:!0,heapPath:r,diagPath:c,diagnostics:e}}catch(s){let e=Z(s);if(as(e))t(`[HeapDump] Failed to write dump: ${e.message}`,{level:"error"});else d(e);return i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!1}),{success:!1,error:e.message}}}
async function T(u){k(u,Bun.generateHeapSnapshot("v8","arraybuffer"),{mode:384}),Bun.gc(!0)}
return {M,Kyr,T};
})();
const command=(()=>{
const Kyr=service.Kyr;
const Bo=ports.privateConnection;
const t=ports.debug;
const l=builtins["path"]["basename"];
async function x(r,e){let o=await Kyr(),a=Bo(e.session);if(!o.success){if(a)return t(`heapdump failed: ${o.error}`,{level:"error"}),{type:"text",value:"Failed to create heap dump (detail withheld on this connection)"};return{type:"text",value:`Failed to create heap dump: ${o.error}`}}let i=a?l(o.heapPath):o.heapPath,p=a?l(o.diagPath):o.diagPath;if(a)t(`heapdump written: ${o.heapPath} ${o.diagPath}`);let h=[i,p,"",d(o.diagnostics)];return h.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:h.join(`
`)}}
function d(r){let{memoryUsage:e,resourceUsage:o,analysis:a}=r,i=a.potentialLeaks.length?a.potentialLeaks.map((n)=>`  \u26A0 ${n}`).join(`
`):"  (no obvious leak indicators)",p=(n,u)=>`RSS ${s(e.rss)} (peak ${s(o.maxRSS)}) ${n>u?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)"}`;if(r.runtime==="bun"){let n=Math.max(0,e.rss-e.heapUsed);return[p(e.heapUsed,n),`  JS heap          ${s(e.heapUsed).padStart(8)}  in snapshot`,`  strings, buffers ${s(e.external).padStart(8)}  part of the JS heap, in snapshot`,`  outside the heap ${s(n).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}let h=e.external-e.arrayBuffers,c=Math.max(0,e.rss-e.heapTotal-e.external);return[p(e.heapTotal,e.external+c),`  JS heap        ${s(e.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${s(e.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${s(h).padStart(8)}  not in snapshot`,`  unaccounted    ${s(c).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}
function s(r){return`${(r/1073741824).toFixed(2)} GB`}
return {x,d,s};
})();
return {capture:service.M,perform:service.Kyr,call:command.x,format:command.d};
}
case "darwin-x64":{
const desktop=(()=>{
const P=ports.platform;
const te=builtins["os"]["homedir"];
const ae=ports.fs;
const k=builtins["path"]["join"];
const a=ports.environment;
const t=ports.debug;
const ee=builtins["fs/promises"]["stat"];
async function dc(e){try{return await ee(e),!0}catch{return!1}}
var ye=new Set(["Public","Default","Default User","All Users"]);
async function W8o(){let e=P(),n=te(),r=ae();if(e==="macos")return k(n,"Desktop");if(e==="windows"){let f=a.USERPROFILE?a.USERPROFILE.replaceAll("\\","/"):null;if(f){let s=`/mnt/c${f.replace(/^[A-Z]:/,"")}/Desktop`;if(await dc(s))return s}try{let s=await r.readdir("/mnt/c/Users");for(let u of s){if(ye.has(u.name))continue;let y=k("/mnt/c/Users",u.name,"Desktop");if(await dc(y))return y}}catch(i){t(`Failed to enumerate /mnt/c/Users for Windows desktop path: ${i}`,{level:"error"})}}let o=k(n,"Desktop");if(await dc(o))return o;return n}
return {dc,ye,W8o};
})();
const service=(()=>{
const M=builtins["v8"]["getHeapStatistics"];
const D=builtins["v8"]["getHeapSpaceStatistics"];
const U=builtins["fs/promises"]["readdir"];
const R=builtins["fs/promises"]["readFile"];
const K=ports.session;
const f0=ports.isBun;
const P=ports.platform;
const t=ports.debug;
const W8o=desktop.W8o;
const ae=ports.fs;
const w=builtins["path"]["join"];
const C=builtins["fs/promises"]["writeFile"];
const _=ports.stringify;
const i=ports.telemetry;
const Z=ports.error;
const as=ports.isReadonlyError;
const d=ports.logError;
const k=builtins["fs"]["writeFileSync"];
async function T(u,o=0){let s=process.memoryUsage(),e=M(),n=process.resourceUsage(),m=process.uptime(),l;try{l=D()}catch{}let g=process._getActiveHandles().length,h=process._getActiveRequests().length,r;try{r=(await U("/proc/self/fd")).length}catch{}let c;try{c=await R("/proc/self/smaps_rollup","utf8")}catch{}let f,S,v;try{let{heapStats:p}=await import("bun:jsc"),b=p(!0);f=b.objectTypeCounts,S=b.protectedObjectTypeCounts,v=b.mimalloc||void 0}catch{}let x=s.rss-s.heapUsed,H=m>0?s.rss/m:0,y=H*3600/1048576,a=[];if(e.number_of_detached_contexts>0)a.push(`${e.number_of_detached_contexts} detached context(s) - possible iframe/context leak`);if(g>100)a.push(`${g} active handles - possible timer/socket leak`);if(x>s.heapUsed)a.push("Native memory > heap - leak may be in native addons (node-pty, etc.)");if(y>100)a.push(`High memory growth rate: ${y.toFixed(1)} MB/hour`);if(r&&r>500)a.push(`${r} open file descriptors - possible file/socket leak`);return{timestamp:new Date().toISOString(),sessionId:K(),trigger:u,dumpNumber:o,uptimeSeconds:m,runtime:f0()?"bun":"node",memoryUsage:{heapUsed:s.heapUsed,heapTotal:s.heapTotal,external:s.external,arrayBuffers:s.arrayBuffers,rss:s.rss},memoryGrowthRate:{bytesPerSecond:H,mbPerHour:y},v8HeapStats:{heapSizeLimit:e.heap_size_limit,mallocedMemory:e.malloced_memory,peakMallocedMemory:e.peak_malloced_memory,detachedContexts:e.number_of_detached_contexts,nativeContexts:e.number_of_native_contexts},v8HeapSpaces:l?.map((p)=>({name:p.space_name,size:p.space_size,used:p.space_used_size,available:p.space_available_size})),resourceUsage:{maxRSS:n.maxRSS*(P()==="macos"?1:1024),userCPUTime:n.userCPUTime,systemCPUTime:n.systemCPUTime},activeHandles:g,activeRequests:h,openFileDescriptors:r,analysis:{potentialLeaks:a,recommendation:a.length>0?`WARNING: ${a.length} potential leak indicator(s) found. See potentialLeaks array.`:"No obvious leak indicators. Check heap snapshot for retained objects."},smapsRollup:c,objectTypeCounts:f,protectedObjectTypeCounts:S,mimalloc:v,platform:"darwin",nodeVersion:process.version,ccVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js"}.VERSION}}
async function qyr(u="manual",o=0){try{let s=K(),e=await T(u,o),n=(f)=>(f/1024/1024/1024).toFixed(3);t(`[HeapDump] Memory state:
  heapUsed: ${n(e.memoryUsage.heapUsed)} GB (in snapshot)
  external: ${n(e.memoryUsage.external)} GB (${e.runtime==="bun"?"part of heapUsed, in snapshot":"NOT in snapshot"})
  rss: ${n(e.memoryUsage.rss)} GB (total process)
  ${e.analysis.recommendation}`);let m=await W8o();await ae().mkdir(m);let l=o>0?`-dump${o}`:"",g=`${s}${l}.heapsnapshot`,h=`${s}${l}-diagnostics.json`,r=w(m,g),c=w(m,h);return await C(c,_(e,null,2),{mode:384}),t(`[HeapDump] Diagnostics written to ${c}`),await B(r),t(`[HeapDump] Heap dump written to ${r}`),i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!0}),{success:!0,heapPath:r,diagPath:c,diagnostics:e}}catch(s){let e=Z(s);if(as(e))t(`[HeapDump] Failed to write dump: ${e.message}`,{level:"error"});else d(e);return i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!1}),{success:!1,error:e.message}}}
async function B(u){k(u,Bun.generateHeapSnapshot("v8","arraybuffer"),{mode:384}),Bun.gc(!0)}
return {T,qyr,B};
})();
const command=(()=>{
const qyr=service.qyr;
const Bo=ports.privateConnection;
const t=ports.debug;
const l=builtins["path"]["basename"];
async function x(r,e){let o=await qyr(),a=Bo(e.session);if(!o.success){if(a)return t(`heapdump failed: ${o.error}`,{level:"error"}),{type:"text",value:"Failed to create heap dump (detail withheld on this connection)"};return{type:"text",value:`Failed to create heap dump: ${o.error}`}}let i=a?l(o.heapPath):o.heapPath,p=a?l(o.diagPath):o.diagPath;if(a)t(`heapdump written: ${o.heapPath} ${o.diagPath}`);let h=[i,p,"",d(o.diagnostics)];return h.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:h.join(`
`)}}
function d(r){let{memoryUsage:e,resourceUsage:o,analysis:a}=r,i=a.potentialLeaks.length?a.potentialLeaks.map((n)=>`  \u26A0 ${n}`).join(`
`):"  (no obvious leak indicators)",p=(n,u)=>`RSS ${s(e.rss)} (peak ${s(o.maxRSS)}) ${n>u?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)"}`;if(r.runtime==="bun"){let n=Math.max(0,e.rss-e.heapUsed);return[p(e.heapUsed,n),`  JS heap          ${s(e.heapUsed).padStart(8)}  in snapshot`,`  strings, buffers ${s(e.external).padStart(8)}  part of the JS heap, in snapshot`,`  outside the heap ${s(n).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}let h=e.external-e.arrayBuffers,c=Math.max(0,e.rss-e.heapTotal-e.external);return[p(e.heapTotal,e.external+c),`  JS heap        ${s(e.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${s(e.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${s(h).padStart(8)}  not in snapshot`,`  unaccounted    ${s(c).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}
function s(r){return`${(r/1073741824).toFixed(2)} GB`}
return {x,d,s};
})();
return {capture:service.T,perform:service.qyr,call:command.x,format:command.d};
}
case "linux-x64":{
const desktop=(()=>{
const O=ports.platform;
const te=builtins["os"]["homedir"];
const ae=ports.fs;
const _=builtins["path"]["join"];
const a=ports.environment;
const t=ports.debug;
const ee=builtins["fs/promises"]["stat"];
async function Vc(e){try{return await ee(e),!0}catch{return!1}}
var ye=new Set(["Public","Default","Default User","All Users"]);
async function YYo(){let e=O(),n=te(),r=ae();if(e==="macos")return _(n,"Desktop");if(e==="windows"){let f=a.USERPROFILE?a.USERPROFILE.replaceAll("\\","/"):null;if(f){let s=`/mnt/c${f.replace(/^[A-Z]:/,"")}/Desktop`;if(await Vc(s))return s}try{let s=await r.readdir("/mnt/c/Users");for(let u of s){if(ye.has(u.name))continue;let y=_("/mnt/c/Users",u.name,"Desktop");if(await Vc(y))return y}}catch(i){t(`Failed to enumerate /mnt/c/Users for Windows desktop path: ${i}`,{level:"error"})}}let o=_(n,"Desktop");if(await Vc(o))return o;return n}
return {Vc,ye,YYo};
})();
const service=(()=>{
const D=builtins["v8"]["getHeapStatistics"];
const C=builtins["v8"]["getHeapSpaceStatistics"];
const U=builtins["fs/promises"]["readdir"];
const R=builtins["fs/promises"]["readFile"];
const q=ports.session;
const lM=ports.isBun;
const O=ports.platform;
const t=ports.debug;
const YYo=desktop.YYo;
const ae=ports.fs;
const w=builtins["path"]["join"];
const P=builtins["fs/promises"]["writeFile"];
const _=ports.stringify;
const i=ports.telemetry;
const Z=ports.error;
const as=ports.isReadonlyError;
const d=ports.logError;
const k=builtins["fs"]["writeFileSync"];
async function M(u,o=0){let s=process.memoryUsage(),e=D(),n=process.resourceUsage(),m=process.uptime(),l;try{l=C()}catch{}let g=process._getActiveHandles().length,h=process._getActiveRequests().length,r;try{r=(await U("/proc/self/fd")).length}catch{}let c;try{c=await R("/proc/self/smaps_rollup","utf8")}catch{}let f,S,v;try{let{heapStats:p}=await import("bun:jsc"),b=p(!0);f=b.objectTypeCounts,S=b.protectedObjectTypeCounts,v=b.mimalloc||void 0}catch{}let x=s.rss-s.heapUsed,H=m>0?s.rss/m:0,y=H*3600/1048576,a=[];if(e.number_of_detached_contexts>0)a.push(`${e.number_of_detached_contexts} detached context(s) - possible iframe/context leak`);if(g>100)a.push(`${g} active handles - possible timer/socket leak`);if(x>s.heapUsed)a.push("Native memory > heap - leak may be in native addons (node-pty, etc.)");if(y>100)a.push(`High memory growth rate: ${y.toFixed(1)} MB/hour`);if(r&&r>500)a.push(`${r} open file descriptors - possible file/socket leak`);return{timestamp:new Date().toISOString(),sessionId:q(),trigger:u,dumpNumber:o,uptimeSeconds:m,runtime:lM()?"bun":"node",memoryUsage:{heapUsed:s.heapUsed,heapTotal:s.heapTotal,external:s.external,arrayBuffers:s.arrayBuffers,rss:s.rss},memoryGrowthRate:{bytesPerSecond:H,mbPerHour:y},v8HeapStats:{heapSizeLimit:e.heap_size_limit,mallocedMemory:e.malloced_memory,peakMallocedMemory:e.peak_malloced_memory,detachedContexts:e.number_of_detached_contexts,nativeContexts:e.number_of_native_contexts},v8HeapSpaces:l?.map((p)=>({name:p.space_name,size:p.space_size,used:p.space_used_size,available:p.space_available_size})),resourceUsage:{maxRSS:n.maxRSS*(O()==="macos"?1:1024),userCPUTime:n.userCPUTime,systemCPUTime:n.systemCPUTime},activeHandles:g,activeRequests:h,openFileDescriptors:r,analysis:{potentialLeaks:a,recommendation:a.length>0?`WARNING: ${a.length} potential leak indicator(s) found. See potentialLeaks array.`:"No obvious leak indicators. Check heap snapshot for retained objects."},smapsRollup:c,objectTypeCounts:f,protectedObjectTypeCounts:S,mimalloc:v,platform:"linux",nodeVersion:process.version,ccVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"default"}.VERSION}}
async function Hyr(u="manual",o=0){try{let s=q(),e=await M(u,o),n=(f)=>(f/1024/1024/1024).toFixed(3);t(`[HeapDump] Memory state:
  heapUsed: ${n(e.memoryUsage.heapUsed)} GB (in snapshot)
  external: ${n(e.memoryUsage.external)} GB (${e.runtime==="bun"?"part of heapUsed, in snapshot":"NOT in snapshot"})
  rss: ${n(e.memoryUsage.rss)} GB (total process)
  ${e.analysis.recommendation}`);let m=await YYo();await ae().mkdir(m);let l=o>0?`-dump${o}`:"",g=`${s}${l}.heapsnapshot`,h=`${s}${l}-diagnostics.json`,r=w(m,g),c=w(m,h);return await P(c,_(e,null,2),{mode:384}),t(`[HeapDump] Diagnostics written to ${c}`),await T(r),t(`[HeapDump] Heap dump written to ${r}`),i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!0}),{success:!0,heapPath:r,diagPath:c,diagnostics:e}}catch(s){let e=Z(s);if(as(e))t(`[HeapDump] Failed to write dump: ${e.message}`,{level:"error"});else d(e);return i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!1}),{success:!1,error:e.message}}}
async function T(u){k(u,Bun.generateHeapSnapshot("v8","arraybuffer"),{mode:384}),Bun.gc(!0)}
return {M,Hyr,T};
})();
const command=(()=>{
const Hyr=service.Hyr;
const Bo=ports.privateConnection;
const t=ports.debug;
const l=builtins["path"]["basename"];
async function x(r,e){let o=await Hyr(),a=Bo(e.session);if(!o.success){if(a)return t(`heapdump failed: ${o.error}`,{level:"error"}),{type:"text",value:"Failed to create heap dump (detail withheld on this connection)"};return{type:"text",value:`Failed to create heap dump: ${o.error}`}}let i=a?l(o.heapPath):o.heapPath,p=a?l(o.diagPath):o.diagPath;if(a)t(`heapdump written: ${o.heapPath} ${o.diagPath}`);let h=[i,p,"",d(o.diagnostics)];return h.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:h.join(`
`)}}
function d(r){let{memoryUsage:e,resourceUsage:o,analysis:a}=r,i=a.potentialLeaks.length?a.potentialLeaks.map((n)=>`  \u26A0 ${n}`).join(`
`):"  (no obvious leak indicators)",p=(n,u)=>`RSS ${s(e.rss)} (peak ${s(o.maxRSS)}) ${n>u?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)"}`;if(r.runtime==="bun"){let n=Math.max(0,e.rss-e.heapUsed);return[p(e.heapUsed,n),`  JS heap          ${s(e.heapUsed).padStart(8)}  in snapshot`,`  strings, buffers ${s(e.external).padStart(8)}  part of the JS heap, in snapshot`,`  outside the heap ${s(n).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}let h=e.external-e.arrayBuffers,c=Math.max(0,e.rss-e.heapTotal-e.external);return[p(e.heapTotal,e.external+c),`  JS heap        ${s(e.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${s(e.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${s(h).padStart(8)}  not in snapshot`,`  unaccounted    ${s(c).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}
function s(r){return`${(r/1073741824).toFixed(2)} GB`}
return {x,d,s};
})();
return {capture:service.M,perform:service.Hyr,call:command.x,format:command.d};
}
case "linux-arm64":{
const desktop=(()=>{
const I=ports.platform;
const te=builtins["os"]["homedir"];
const ae=ports.fs;
const R=builtins["path"]["join"];
const a=ports.environment;
const t=ports.debug;
const ee=builtins["fs/promises"]["stat"];
async function qc(e){try{return await ee(e),!0}catch{return!1}}
var ye=new Set(["Public","Default","Default User","All Users"]);
async function YYo(){let e=I(),n=te(),r=ae();if(e==="macos")return R(n,"Desktop");if(e==="windows"){let f=a.USERPROFILE?a.USERPROFILE.replaceAll("\\","/"):null;if(f){let s=`/mnt/c${f.replace(/^[A-Z]:/,"")}/Desktop`;if(await qc(s))return s}try{let s=await r.readdir("/mnt/c/Users");for(let u of s){if(ye.has(u.name))continue;let y=R("/mnt/c/Users",u.name,"Desktop");if(await qc(y))return y}}catch(i){t(`Failed to enumerate /mnt/c/Users for Windows desktop path: ${i}`,{level:"error"})}}let o=R(n,"Desktop");if(await qc(o))return o;return n}
return {qc,ye,YYo};
})();
const service=(()=>{
const D=builtins["v8"]["getHeapStatistics"];
const C=builtins["v8"]["getHeapSpaceStatistics"];
const U=builtins["fs/promises"]["readdir"];
const R=builtins["fs/promises"]["readFile"];
const K=ports.session;
const l0=ports.isBun;
const I=ports.platform;
const t=ports.debug;
const YYo=desktop.YYo;
const ae=ports.fs;
const w=builtins["path"]["join"];
const P=builtins["fs/promises"]["writeFile"];
const _=ports.stringify;
const i=ports.telemetry;
const Z=ports.error;
const as=ports.isReadonlyError;
const d=ports.logError;
const k=builtins["fs"]["writeFileSync"];
async function M(u,o=0){let s=process.memoryUsage(),e=D(),n=process.resourceUsage(),m=process.uptime(),l;try{l=C()}catch{}let g=process._getActiveHandles().length,h=process._getActiveRequests().length,r;try{r=(await U("/proc/self/fd")).length}catch{}let c;try{c=await R("/proc/self/smaps_rollup","utf8")}catch{}let f,S,v;try{let{heapStats:p}=await import("bun:jsc"),b=p(!0);f=b.objectTypeCounts,S=b.protectedObjectTypeCounts,v=b.mimalloc||void 0}catch{}let x=s.rss-s.heapUsed,H=m>0?s.rss/m:0,y=H*3600/1048576,a=[];if(e.number_of_detached_contexts>0)a.push(`${e.number_of_detached_contexts} detached context(s) - possible iframe/context leak`);if(g>100)a.push(`${g} active handles - possible timer/socket leak`);if(x>s.heapUsed)a.push("Native memory > heap - leak may be in native addons (node-pty, etc.)");if(y>100)a.push(`High memory growth rate: ${y.toFixed(1)} MB/hour`);if(r&&r>500)a.push(`${r} open file descriptors - possible file/socket leak`);return{timestamp:new Date().toISOString(),sessionId:K(),trigger:u,dumpNumber:o,uptimeSeconds:m,runtime:l0()?"bun":"node",memoryUsage:{heapUsed:s.heapUsed,heapTotal:s.heapTotal,external:s.external,arrayBuffers:s.arrayBuffers,rss:s.rss},memoryGrowthRate:{bytesPerSecond:H,mbPerHour:y},v8HeapStats:{heapSizeLimit:e.heap_size_limit,mallocedMemory:e.malloced_memory,peakMallocedMemory:e.peak_malloced_memory,detachedContexts:e.number_of_detached_contexts,nativeContexts:e.number_of_native_contexts},v8HeapSpaces:l?.map((p)=>({name:p.space_name,size:p.space_size,used:p.space_used_size,available:p.space_available_size})),resourceUsage:{maxRSS:n.maxRSS*(I()==="macos"?1:1024),userCPUTime:n.userCPUTime,systemCPUTime:n.systemCPUTime},activeHandles:g,activeRequests:h,openFileDescriptors:r,analysis:{potentialLeaks:a,recommendation:a.length>0?`WARNING: ${a.length} potential leak indicator(s) found. See potentialLeaks array.`:"No obvious leak indicators. Check heap snapshot for retained objects."},smapsRollup:c,objectTypeCounts:f,protectedObjectTypeCounts:S,mimalloc:v,platform:"linux",nodeVersion:process.version,ccVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js"}.VERSION}}
async function Dyr(u="manual",o=0){try{let s=K(),e=await M(u,o),n=(f)=>(f/1024/1024/1024).toFixed(3);t(`[HeapDump] Memory state:
  heapUsed: ${n(e.memoryUsage.heapUsed)} GB (in snapshot)
  external: ${n(e.memoryUsage.external)} GB (${e.runtime==="bun"?"part of heapUsed, in snapshot":"NOT in snapshot"})
  rss: ${n(e.memoryUsage.rss)} GB (total process)
  ${e.analysis.recommendation}`);let m=await YYo();await ae().mkdir(m);let l=o>0?`-dump${o}`:"",g=`${s}${l}.heapsnapshot`,h=`${s}${l}-diagnostics.json`,r=w(m,g),c=w(m,h);return await P(c,_(e,null,2),{mode:384}),t(`[HeapDump] Diagnostics written to ${c}`),await T(r),t(`[HeapDump] Heap dump written to ${r}`),i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!0}),{success:!0,heapPath:r,diagPath:c,diagnostics:e}}catch(s){let e=Z(s);if(as(e))t(`[HeapDump] Failed to write dump: ${e.message}`,{level:"error"});else d(e);return i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!1}),{success:!1,error:e.message}}}
async function T(u){k(u,Bun.generateHeapSnapshot("v8","arraybuffer"),{mode:384}),Bun.gc(!0)}
return {M,Dyr,T};
})();
const command=(()=>{
const Dyr=service.Dyr;
const Ho=ports.privateConnection;
const t=ports.debug;
const l=builtins["path"]["basename"];
async function x(r,e){let o=await Dyr(),a=Ho(e.session);if(!o.success){if(a)return t(`heapdump failed: ${o.error}`,{level:"error"}),{type:"text",value:"Failed to create heap dump (detail withheld on this connection)"};return{type:"text",value:`Failed to create heap dump: ${o.error}`}}let i=a?l(o.heapPath):o.heapPath,p=a?l(o.diagPath):o.diagPath;if(a)t(`heapdump written: ${o.heapPath} ${o.diagPath}`);let h=[i,p,"",d(o.diagnostics)];return h.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:h.join(`
`)}}
function d(r){let{memoryUsage:e,resourceUsage:o,analysis:a}=r,i=a.potentialLeaks.length?a.potentialLeaks.map((n)=>`  \u26A0 ${n}`).join(`
`):"  (no obvious leak indicators)",p=(n,u)=>`RSS ${s(e.rss)} (peak ${s(o.maxRSS)}) ${n>u?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)"}`;if(r.runtime==="bun"){let n=Math.max(0,e.rss-e.heapUsed);return[p(e.heapUsed,n),`  JS heap          ${s(e.heapUsed).padStart(8)}  in snapshot`,`  strings, buffers ${s(e.external).padStart(8)}  part of the JS heap, in snapshot`,`  outside the heap ${s(n).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}let h=e.external-e.arrayBuffers,c=Math.max(0,e.rss-e.heapTotal-e.external);return[p(e.heapTotal,e.external+c),`  JS heap        ${s(e.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${s(e.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${s(h).padStart(8)}  not in snapshot`,`  unaccounted    ${s(c).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}
function s(r){return`${(r/1073741824).toFixed(2)} GB`}
return {x,d,s};
})();
return {capture:service.M,perform:service.Dyr,call:command.x,format:command.d};
}
case "win32-x64":{
const desktop=(()=>{
const O=ports.platform;
const ne=builtins["os"]["homedir"];
const ae=ports.fs;
const R=builtins["path"]["join"];
const a=ports.environment;
const t=ports.debug;
const te=builtins["fs/promises"]["stat"];
async function zc(e){try{return await te(e),!0}catch{return!1}}
var Oe=new Set(["Public","Default","Default User","All Users"]);
async function e5o(){let e=O(),n=ne(),r=ae();if(e==="macos")return R(n,"Desktop");if(e==="windows"){let u=a.USERPROFILE?a.USERPROFILE.replaceAll("\\","/"):null;if(u){let o=`/mnt/c${u.replace(/^[A-Z]:/,"")}/Desktop`;if(await zc(o))return o}try{let o=await r.readdir("/mnt/c/Users");for(let f of o){if(Oe.has(f.name))continue;let w=R("/mnt/c/Users",f.name,"Desktop");if(await zc(w))return w}}catch(i){t(`Failed to enumerate /mnt/c/Users for Windows desktop path: ${i}`,{level:"error"})}}let s=R(n,"Desktop");if(await zc(s))return s;return n}
return {zc,Oe,e5o};
})();
const service=(()=>{
const D=builtins["v8"]["getHeapStatistics"];
const C=builtins["v8"]["getHeapSpaceStatistics"];
const U=builtins["fs/promises"]["readdir"];
const R=builtins["fs/promises"]["readFile"];
const q=ports.session;
const dM=ports.isBun;
const O=ports.platform;
const t=ports.debug;
const e5o=desktop.e5o;
const ae=ports.fs;
const w=builtins["path"]["join"];
const P=builtins["fs/promises"]["writeFile"];
const _=ports.stringify;
const i=ports.telemetry;
const Z=ports.error;
const ls=ports.isReadonlyError;
const d=ports.logError;
const k=builtins["fs"]["writeFileSync"];
async function M(u,o=0){let s=process.memoryUsage(),e=D(),n=process.resourceUsage(),m=process.uptime(),l;try{l=C()}catch{}let g=process._getActiveHandles().length,h=process._getActiveRequests().length,r;try{r=(await U("/proc/self/fd")).length}catch{}let c;try{c=await R("/proc/self/smaps_rollup","utf8")}catch{}let f,S,v;try{let{heapStats:p}=await import("bun:jsc"),b=p(!0);f=b.objectTypeCounts,S=b.protectedObjectTypeCounts,v=b.mimalloc||void 0}catch{}let x=s.rss-s.heapUsed,H=m>0?s.rss/m:0,y=H*3600/1048576,a=[];if(e.number_of_detached_contexts>0)a.push(`${e.number_of_detached_contexts} detached context(s) - possible iframe/context leak`);if(g>100)a.push(`${g} active handles - possible timer/socket leak`);if(x>s.heapUsed)a.push("Native memory > heap - leak may be in native addons (node-pty, etc.)");if(y>100)a.push(`High memory growth rate: ${y.toFixed(1)} MB/hour`);if(r&&r>500)a.push(`${r} open file descriptors - possible file/socket leak`);return{timestamp:new Date().toISOString(),sessionId:q(),trigger:u,dumpNumber:o,uptimeSeconds:m,runtime:dM()?"bun":"node",memoryUsage:{heapUsed:s.heapUsed,heapTotal:s.heapTotal,external:s.external,arrayBuffers:s.arrayBuffers,rss:s.rss},memoryGrowthRate:{bytesPerSecond:H,mbPerHour:y},v8HeapStats:{heapSizeLimit:e.heap_size_limit,mallocedMemory:e.malloced_memory,peakMallocedMemory:e.peak_malloced_memory,detachedContexts:e.number_of_detached_contexts,nativeContexts:e.number_of_native_contexts},v8HeapSpaces:l?.map((p)=>({name:p.space_name,size:p.space_size,used:p.space_used_size,available:p.space_available_size})),resourceUsage:{maxRSS:n.maxRSS*(O()==="macos"?1:1024),userCPUTime:n.userCPUTime,systemCPUTime:n.systemCPUTime},activeHandles:g,activeRequests:h,openFileDescriptors:r,analysis:{potentialLeaks:a,recommendation:a.length>0?`WARNING: ${a.length} potential leak indicator(s) found. See potentialLeaks array.`:"No obvious leak indicators. Check heap snapshot for retained objects."},smapsRollup:c,objectTypeCounts:f,protectedObjectTypeCounts:S,mimalloc:v,platform:"win32",nodeVersion:process.version,ccVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"B:/~BUN/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"win32"}.VERSION}}
async function Wyr(u="manual",o=0){try{let s=q(),e=await M(u,o),n=(f)=>(f/1024/1024/1024).toFixed(3);t(`[HeapDump] Memory state:
  heapUsed: ${n(e.memoryUsage.heapUsed)} GB (in snapshot)
  external: ${n(e.memoryUsage.external)} GB (${e.runtime==="bun"?"part of heapUsed, in snapshot":"NOT in snapshot"})
  rss: ${n(e.memoryUsage.rss)} GB (total process)
  ${e.analysis.recommendation}`);let m=await e5o();await ae().mkdir(m);let l=o>0?`-dump${o}`:"",g=`${s}${l}.heapsnapshot`,h=`${s}${l}-diagnostics.json`,r=w(m,g),c=w(m,h);return await P(c,_(e,null,2),{mode:384}),t(`[HeapDump] Diagnostics written to ${c}`),await T(r),t(`[HeapDump] Heap dump written to ${r}`),i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!0}),{success:!0,heapPath:r,diagPath:c,diagnostics:e}}catch(s){let e=Z(s);if(ls(e))t(`[HeapDump] Failed to write dump: ${e.message}`,{level:"error"});else d(e);return i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!1}),{success:!1,error:e.message}}}
async function T(u){k(u,Bun.generateHeapSnapshot("v8","arraybuffer"),{mode:384}),Bun.gc(!0)}
return {M,Wyr,T};
})();
const command=(()=>{
const Wyr=service.Wyr;
const Bo=ports.privateConnection;
const t=ports.debug;
const l=builtins["path"]["basename"];
async function x(r,e){let o=await Wyr(),a=Bo(e.session);if(!o.success){if(a)return t(`heapdump failed: ${o.error}`,{level:"error"}),{type:"text",value:"Failed to create heap dump (detail withheld on this connection)"};return{type:"text",value:`Failed to create heap dump: ${o.error}`}}let i=a?l(o.heapPath):o.heapPath,p=a?l(o.diagPath):o.diagPath;if(a)t(`heapdump written: ${o.heapPath} ${o.diagPath}`);let h=[i,p,"",d(o.diagnostics)];return h.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:h.join(`
`)}}
function d(r){let{memoryUsage:e,resourceUsage:o,analysis:a}=r,i=a.potentialLeaks.length?a.potentialLeaks.map((n)=>`  \u26A0 ${n}`).join(`
`):"  (no obvious leak indicators)",p=(n,u)=>`RSS ${s(e.rss)} (peak ${s(o.maxRSS)}) ${n>u?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)"}`;if(r.runtime==="bun"){let n=Math.max(0,e.rss-e.heapUsed);return[p(e.heapUsed,n),`  JS heap          ${s(e.heapUsed).padStart(8)}  in snapshot`,`  strings, buffers ${s(e.external).padStart(8)}  part of the JS heap, in snapshot`,`  outside the heap ${s(n).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}let h=e.external-e.arrayBuffers,c=Math.max(0,e.rss-e.heapTotal-e.external);return[p(e.heapTotal,e.external+c),`  JS heap        ${s(e.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${s(e.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${s(h).padStart(8)}  not in snapshot`,`  unaccounted    ${s(c).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}
function s(r){return`${(r/1073741824).toFixed(2)} GB`}
return {x,d,s};
})();
return {capture:service.M,perform:service.Wyr,call:command.x,format:command.d};
}
case "win32-arm64":{
const desktop=(()=>{
const O=ports.platform;
const ne=builtins["os"]["homedir"];
const ae=ports.fs;
const R=builtins["path"]["join"];
const a=ports.environment;
const t=ports.debug;
const te=builtins["fs/promises"]["stat"];
async function zc(e){try{return await te(e),!0}catch{return!1}}
var Oe=new Set(["Public","Default","Default User","All Users"]);
async function eYo(){let e=O(),n=ne(),r=ae();if(e==="macos")return R(n,"Desktop");if(e==="windows"){let u=a.USERPROFILE?a.USERPROFILE.replaceAll("\\","/"):null;if(u){let o=`/mnt/c${u.replace(/^[A-Z]:/,"")}/Desktop`;if(await zc(o))return o}try{let o=await r.readdir("/mnt/c/Users");for(let f of o){if(Oe.has(f.name))continue;let w=R("/mnt/c/Users",f.name,"Desktop");if(await zc(w))return w}}catch(i){t(`Failed to enumerate /mnt/c/Users for Windows desktop path: ${i}`,{level:"error"})}}let s=R(n,"Desktop");if(await zc(s))return s;return n}
return {zc,Oe,eYo};
})();
const service=(()=>{
const D=builtins["v8"]["getHeapStatistics"];
const C=builtins["v8"]["getHeapSpaceStatistics"];
const U=builtins["fs/promises"]["readdir"];
const R=builtins["fs/promises"]["readFile"];
const V=ports.session;
const dM=ports.isBun;
const O=ports.platform;
const t=ports.debug;
const eYo=desktop.eYo;
const ae=ports.fs;
const w=builtins["path"]["join"];
const P=builtins["fs/promises"]["writeFile"];
const _=ports.stringify;
const i=ports.telemetry;
const Z=ports.error;
const ls=ports.isReadonlyError;
const d=ports.logError;
const k=builtins["fs"]["writeFileSync"];
async function M(u,o=0){let s=process.memoryUsage(),e=D(),n=process.resourceUsage(),m=process.uptime(),l;try{l=C()}catch{}let g=process._getActiveHandles().length,h=process._getActiveRequests().length,r;try{r=(await U("/proc/self/fd")).length}catch{}let c;try{c=await R("/proc/self/smaps_rollup","utf8")}catch{}let f,S,v;try{let{heapStats:p}=await import("bun:jsc"),b=p(!0);f=b.objectTypeCounts,S=b.protectedObjectTypeCounts,v=b.mimalloc||void 0}catch{}let x=s.rss-s.heapUsed,H=m>0?s.rss/m:0,y=H*3600/1048576,a=[];if(e.number_of_detached_contexts>0)a.push(`${e.number_of_detached_contexts} detached context(s) - possible iframe/context leak`);if(g>100)a.push(`${g} active handles - possible timer/socket leak`);if(x>s.heapUsed)a.push("Native memory > heap - leak may be in native addons (node-pty, etc.)");if(y>100)a.push(`High memory growth rate: ${y.toFixed(1)} MB/hour`);if(r&&r>500)a.push(`${r} open file descriptors - possible file/socket leak`);return{timestamp:new Date().toISOString(),sessionId:V(),trigger:u,dumpNumber:o,uptimeSeconds:m,runtime:dM()?"bun":"node",memoryUsage:{heapUsed:s.heapUsed,heapTotal:s.heapTotal,external:s.external,arrayBuffers:s.arrayBuffers,rss:s.rss},memoryGrowthRate:{bytesPerSecond:H,mbPerHour:y},v8HeapStats:{heapSizeLimit:e.heap_size_limit,mallocedMemory:e.malloced_memory,peakMallocedMemory:e.peak_malloced_memory,detachedContexts:e.number_of_detached_contexts,nativeContexts:e.number_of_native_contexts},v8HeapSpaces:l?.map((p)=>({name:p.space_name,size:p.space_size,used:p.space_used_size,available:p.space_available_size})),resourceUsage:{maxRSS:n.maxRSS*(O()==="macos"?1:1024),userCPUTime:n.userCPUTime,systemCPUTime:n.systemCPUTime},activeHandles:g,activeRequests:h,openFileDescriptors:r,analysis:{potentialLeaks:a,recommendation:a.length>0?`WARNING: ${a.length} potential leak indicator(s) found. See potentialLeaks array.`:"No obvious leak indicators. Check heap snapshot for retained objects."},smapsRollup:c,objectTypeCounts:f,protectedObjectTypeCounts:S,mimalloc:v,platform:"win32",nodeVersion:process.version,ccVersion:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"B:/~BUN/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js"}.VERSION}}
async function Wyr(u="manual",o=0){try{let s=V(),e=await M(u,o),n=(f)=>(f/1024/1024/1024).toFixed(3);t(`[HeapDump] Memory state:
  heapUsed: ${n(e.memoryUsage.heapUsed)} GB (in snapshot)
  external: ${n(e.memoryUsage.external)} GB (${e.runtime==="bun"?"part of heapUsed, in snapshot":"NOT in snapshot"})
  rss: ${n(e.memoryUsage.rss)} GB (total process)
  ${e.analysis.recommendation}`);let m=await eYo();await ae().mkdir(m);let l=o>0?`-dump${o}`:"",g=`${s}${l}.heapsnapshot`,h=`${s}${l}-diagnostics.json`,r=w(m,g),c=w(m,h);return await P(c,_(e,null,2),{mode:384}),t(`[HeapDump] Diagnostics written to ${c}`),await T(r),t(`[HeapDump] Heap dump written to ${r}`),i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!0}),{success:!0,heapPath:r,diagPath:c,diagnostics:e}}catch(s){let e=Z(s);if(ls(e))t(`[HeapDump] Failed to write dump: ${e.message}`,{level:"error"});else d(e);return i("tengu_heap_dump",{triggerManual:!0,triggerAuto15GB:!1,dumpNumber:o,success:!1}),{success:!1,error:e.message}}}
async function T(u){k(u,Bun.generateHeapSnapshot("v8","arraybuffer"),{mode:384}),Bun.gc(!0)}
return {M,Wyr,T};
})();
const command=(()=>{
const Wyr=service.Wyr;
const Ho=ports.privateConnection;
const t=ports.debug;
const l=builtins["path"]["basename"];
async function x(r,e){let o=await Wyr(),a=Ho(e.session);if(!o.success){if(a)return t(`heapdump failed: ${o.error}`,{level:"error"}),{type:"text",value:"Failed to create heap dump (detail withheld on this connection)"};return{type:"text",value:`Failed to create heap dump: ${o.error}`}}let i=a?l(o.heapPath):o.heapPath,p=a?l(o.diagPath):o.diagPath;if(a)t(`heapdump written: ${o.heapPath} ${o.diagPath}`);let h=[i,p,"",d(o.diagnostics)];return h.push("","Open the .heapsnapshot in Chrome DevTools \u2192 Memory \u2192 Load to inspect retainers."),{type:"text",value:h.join(`
`)}}
function d(r){let{memoryUsage:e,resourceUsage:o,analysis:a}=r,i=a.potentialLeaks.length?a.potentialLeaks.map((n)=>`  \u26A0 ${n}`).join(`
`):"  (no obvious leak indicators)",p=(n,u)=>`RSS ${s(e.rss)} (peak ${s(o.maxRSS)}) ${n>u?"\u2014 most memory is JS heap (inspect the .heapsnapshot)":"\u2014 most memory is native (NOT in the .heapsnapshot)"}`;if(r.runtime==="bun"){let n=Math.max(0,e.rss-e.heapUsed);return[p(e.heapUsed,n),`  JS heap          ${s(e.heapUsed).padStart(8)}  in snapshot`,`  strings, buffers ${s(e.external).padStart(8)}  part of the JS heap, in snapshot`,`  outside the heap ${s(n).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}let h=e.external-e.arrayBuffers,c=Math.max(0,e.rss-e.heapTotal-e.external);return[p(e.heapTotal,e.external+c),`  JS heap        ${s(e.heapTotal).padStart(8)}  in snapshot`,`  array buffers  ${s(e.arrayBuffers).padStart(8)}  not in snapshot`,`  other external ${s(h).padStart(8)}  not in snapshot`,`  unaccounted    ${s(c).padStart(8)}  not in snapshot (code/JIT/stacks/allocator)`,i].join(`
`)}
function s(r){return`${(r/1073741824).toFixed(2)} GB`}
return {x,d,s};
})();
return {capture:service.M,perform:service.Wyr,call:command.x,format:command.d};
}
default:throw Error('Unsupported heap platform '+platform);
}
}
