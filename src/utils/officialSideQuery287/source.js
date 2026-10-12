// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQuerySource287(ports){
const {}=ports;
var Eqr={repl_main_thread:!0,"repl_main_thread:outputStyle:custom":!0,"repl_main_thread:outputStyle:Concise":!0,"repl_main_thread:outputStyle:Proactive":!0,"repl_main_thread:outputStyle:Explanatory":!0,"repl_main_thread:outputStyle:Learning":!0,sdk:!0};
var Hh=new Set([...Object.keys(Eqr),"agent:custom","agent:default","agent:builtin","compact","hook_agent","hook_prompt","side_question","web_search_tool","web_fetch_apply","repl_sampling","auto_mode","compact_fab_check","auto_mode_critique","auto_mode_setup_propose","chrome_mcp","artifact_comment_reply"]);
function cpe(e){if(e===void 0)return!0;if(e.startsWith("agent:"))return!0;return Hh.has(e)};
function Ss(e){if(e===void 0)return;if(e.startsWith("repl_main_thread")||e==="sdk")return"main";if(e.startsWith("agent:")||e==="hook_agent")return"subagent";return"auxiliary"};
function U3(e){return e==="auto_mode"||e==="auto_mode_investigator"||!1};
return {cpe,U3,Ss};
}
