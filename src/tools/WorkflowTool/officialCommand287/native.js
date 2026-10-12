// Complete official 2.1.287 declarations; imports share the existing lifecycle owner.
export function createWorkflowCommandBuilder287(ports){
const {Mh,eB,a,tt,ko,Mt,nm,WP,So,gj,L3,_}=ports;
function eCe(o){let l=ko();return l.workflowAuthoringSkillAvailable??=e(),l.workflowAuthoringSkillAvailable&&!L3(WP)&&(o===void 0||i(o))}
function e(){if(!nm())return!1;if(gj()||Mh())return!1;if(a.CLAUDE_CODE_ENTRYPOINT==="local-agent")return!1;let o=tt().skillOverrides?.[WP];if(o==="off"||o==="user-invocable-only")return!1;let l=eB();if(l!==void 0&&!l.includes(WP))return!1;return!0}
function i(o){return o.some((l)=>Mt(l,So))}
function m(o){return{type:"prompt",name:o.name,description:o.description,hasUserSpecifiedDescription:!0,whenToUse:o.whenToUse,progressMessage:"running dynamic workflow",contentLength:o.script.length,source:o.source==="built-in"?"bundled":o.source,loadedFrom:o.source==="built-in"?"bundled":o.source==="plugin"?"plugin":"skills",...o.source==="plugin"&&{pluginInfo:{pluginManifest:o.pluginManifest,repository:o.plugin,...o.serverPluginId!==void 0&&{serverPluginId:o.serverPluginId}}},kind:"workflow",disableModelInvocation:typeof o.disableModelInvocation==="function"?o.disableModelInvocation():o.disableModelInvocation,async getPromptForCommand(n,t){let s=o.phases?`

Phases:
`+o.phases.map((r)=>`- ${r.title}${r.detail?`: ${r.detail}`:""}`).join(`
`):"",e=n.trim(),i=_(o.name),a=e?`{ name: ${i}, args: ${_(e)} }`:`{ name: ${i} }`,l=eCe(t?.options?.tools)?`

If the user asks you to modify this workflow or write a new script, load the \`${WP}\` skill first.`:"";return[{type:"text",text:`Run the "${o.name}" workflow.

${o.description}${o.whenToUse?`

${o.whenToUse}`:""}${s}

Invoke: Workflow(${a})${l}`}]}}}
return m;
}
