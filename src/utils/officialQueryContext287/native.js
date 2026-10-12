// Complete pinned 287 functions. Stateful dependencies belong to the caller.
export function createQueryContext287(ports){
const {kA,kC,QB,M9,v2o}=ports;
async function IDn({session:s,tools:f,mainLoopModel:n,customSystemPrompt:a,excludeDynamicSections:m,cacheBreakerPhrase:g,analysisOnly:r,storageV5:p,credentials:c}){let[l,d,e,o]=await Promise.all([a!==void 0?Promise.resolve([]):kA(f,n,{excludeDynamicSections:m,analysisOnly:r}),kC(s,p,c),a!==void 0?Promise.resolve({}):QB(s,g),m&&a===void 0?Lko(n,{analysisOnly:r}):Promise.resolve({})]);if(m)return{defaultSystemPrompt:l,userContext:{...e,...d,...o},systemContext:{}};return{defaultSystemPrompt:l,userContext:d,systemContext:e}}
async function Lko(e,n={}){let r=await v2o(M9(e),n),s={};if(r){let[g,h]=Yao(r);s[g]=h}return s}
function Yao(e){let n=e.indexOf(`
`),r=n===-1?e:e.slice(0,n);if(!r.startsWith("# "))throw Error(`getExcludedDynamicSectionsContent: expected section body to start with a "# <heading>" line, got "${r}"`);return[r.slice(2),n===-1?"":e.slice(n+1)]}
return {fetchSystemPromptParts:IDn,getExcludedDynamicSectionsContent:Lko,splitExcludedSection:Yao};
}
export const excludedMemorySource287={"file":"chunk-6xrs6gmd.js","name":"v2o","moduleSha256":"f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17","startCodeUnits":147063,"endCodeUnits":147531,"sha256":"df5aef5ed9a9866ed4d97b747667642c0a093da9bbc182281b7d235d9706e490","source":"async function v2o(e,n={},r){let{analysisOnly:s=!1}=n;if(fr(),!_a(e))return XUt(e,n,r);await VH().warmCanonicalWcRoot();let g=Xs(),h=r!==void 0&&await JYe(g)?r:void 0;if(await He(g,h),!s)Wre(!1);ze(g,{memory_type:S(\"auto\"),...s||E8()||a.CLAUDE_COWORK_MEMORY_GUIDELINES?.trim()?{}:{prompt_variant:S(\"base\")}},h);let w=a.CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES,b=[`# ${_o}`,`Memory directory: \\`${g}\\``];if(w)b.push(\"\",w);for(let R of wa())b.push(\"\",R);return b.join(`\n`)}"};
// Full original QB/U0n, sharing the caller's canonical LF owner.
export function createSystemContext287(ports){
const {LF,a,ne,Le,$a,Ue,wt}=ports;
function QB(e,n){let r=LF(e),s=n??"",g=r.systemContextByPhrase.get(s);if(!g)g=U0n(e,n),r.systemContextByPhrase.set(s,g);return g}
async function U0n(e,n){let r=Date.now();return ne("info","system_context_started"),ne("info","system_context_completed",{duration_ms:Date.now()-r,has_injection:n!==void 0}),{...Le(a.CLAUDE_CODE_PERFORCE_MODE)&&{perforceMode:`This is a Perforce workspace. Files not yet opened for edit are read-only; if a file is read-only, run \`p4 edit <file>\` via ${$a()?Ue:wt} to check it out before modifying. Files that are already writable have been opened and can be edited directly.`},...{}}}
return {getSystemContext:QB,buildSystemContext:U0n};
}
