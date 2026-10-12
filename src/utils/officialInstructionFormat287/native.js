// Whole pinned 287 declarations; no state or duplicate Memory owner here.
export function createInstructionFormatter287({E8,k,jQ}) {
function RJ(e){if(!E8())return e;return e.filter((n)=>n.type!=="AutoMem")}
function L0n(e){if((e.type==="Project"||e.type==="Local")&&k("tengu_paper_halyard",!1))return!1;return Boolean(e.content)}
function xJ(e,n){return e.filter((r)=>(!n||n(r.type))&&L0n(r))}
const ws="Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.";
function Ts(e){switch(e){case"Project":return" (project instructions, checked into the codebase)";case"Local":return" (user's private project instructions, not checked in)";case"AutoMem":return" (user's auto-memory, persists across conversations)";case"Managed":return" (organization-managed policy instructions)";case"User":return" (user's private global instructions for all projects)"}}
function Z7n(e){return e.map((t)=>`Contents of ${t.path}${Ts(t.type)}:

`+(t.type==="AutoMem"?jQ(t.content).trim():t.content.trim())).join(`

`)}
function CPe(e){let t=Z7n(e);return t===""?"":`${ws}

${t}`}
return {filterInjectedMemoryFiles:RJ,filterInstructions:xJ,formatInstructions:CPe};
}
