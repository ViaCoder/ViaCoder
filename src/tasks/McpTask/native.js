// Whole original MCP_TASK declaration. Canonical registry/sidecar ports only.
export function createMcpTaskNative287({t,d,c5}){
var T={name:"MCP Task",type:"mcp_task",async kill(a,o,k,l,s){let e=o.get(a),n=e?.type==="mcp_task"?e.sidecarSessionId:void 0,p=e?.type==="mcp_task"?e.sidecarProjectDir:void 0,c=e?.type==="mcp_task"?e.sidecarWrite:void 0;if(e?.type==="mcp_task")e.abortController?.abort(),e.driveAbortController?.abort(),e.sep2663Cancel?.();let i=!1;if(o.update(a,(r)=>{if(r.notified||r.status!=="running")return r;return i=!0,{...r,status:"killed",endTime:Date.now(),parked:void 0,notified:!0}}),i&&e?.type==="mcp_task")try{e.onWorkerWakeOutcome?.({kind:"stopped"})}catch(r){t("McpTask.kill: onWorkerWakeOutcome threw, the stop continues"),d(r)}(async()=>{await c,await c5(a,s,n,p)})().catch((r)=>t(`McpTask.kill deleteMcpTaskMetadata: ${String(r)}`))}};
return T;
}
