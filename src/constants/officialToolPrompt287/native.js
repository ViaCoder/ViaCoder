// Original complete tool guidance and source-owned tool names.
export function createToolPrompt287({isReplMode,hasEmbeddedSearch}){
const gM=isReplMode,bE=hasEmbeddedSearch;
function Bao(e){let n=[PE,fk].find((w)=>e.has(w));if(gM()){let w=[n?`Break down and manage your work with the ${n} tool. These tools are helpful for planning your work and helping the user track your progress. Mark each task as completed as soon as you are done with the task. Do not batch up multiple tasks before marking them as completed.`:null].filter((D)=>D!==null);if(w.length===0)return"";return["# Using your tools",...Sm(w)].join(`
`)}let r=bE(),s=e.has(Ue),g=s?Ue:wt,h=[dt,Ot,Sn,...r&&s?[]:[co,Jr]].join(", "),b=[`Prefer dedicated tools over ${g} when one fits (${h}) \u2014 reserve ${g} for shell-only operations.`,n?`Use ${n} to plan and track work. Mark each task completed as soon as it's done; don't batch.`:null,"You can call multiple tools in a single response. If you intend to call multiple tools and there are no dependencies between them, make all independent tool calls in parallel. Maximize use of parallel tool calls where possible to increase efficiency. However, if some tool calls depend on previous calls to inform dependent values, do NOT call these tools in parallel and instead call them sequentially. For instance, if one operation must complete before another starts, run these operations sequentially instead."].filter((w)=>w!==null);return["# Using your tools",...Sm(b)].join(`
`)};
function Sm(e){return e.flatMap((n)=>Array.isArray(n)?n.map((r)=>`  - ${r}`):[` - ${n}`])};
var PE="TaskCreate";
var fk="TodoWrite";
var Ue="Bash";
var wt="PowerShell";
var dt="Read";
var Ot="Edit";
var Sn="Write";
var co="Glob";
var Jr="Grep";
return {tools:Bao};
}
