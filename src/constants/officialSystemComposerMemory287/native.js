// Generated from pinned 2.1.287 AST; only the verified memory_static closure.
import { memoryFrontmatter287, memoryAccessGuidance287 } from '../../memdir/officialMemoryFormat287/native.js';
export function createOfficialSystemComposerMemory287(ports) {
  const AG = ports.communication.lean;
  const Ae = ports.Ae;
  const At = ports.At;
  const GZn = ports.GZn;
  const HKr = ports.HKr;
  const Hu = ports.Hu;
  const J0 = ports.J0;
  const Jbe = ports.Jbe;
  const Js = ports.Js;
  const Nc = ports.Nc;
  const Qu = ports.Qu;
  const U = ports.U;
  const Wn = ports.Wn;
  const Xo = ports.Xo;
  const YC = ports.YC;
  const a = ports.a;
  const ar = ports.ar;
  const ci = ports.ci;
  const dbe = ports.dbe;
  const ds = ports.ds;
  const ft = ports.ft;
  const g8 = ports.g8;
  const ge = ports.ge;
  const im = ports.im;
  const k = ports.k;
  const kKr = ports.kKr;
  const lc = ports.lc;
  const le = ports.le;
  const mPe = ports.mPe;
  const oZr = ports.oZr;
  const okn = ports.okn;
  const on = ports.on;
  const process = ports.process;
  const qbe = ports.qbe;
  const qd = ports.qd;
  const rU = ports.rU;
  const rm = ports.rm;
  const sz = ports.sz;
  const um = ports.um;
  const yr = ports.yr;
  const ea = memoryFrontmatter287, Pn = memoryAccessGuidance287;
var fA="user:inference";
var WK="user:profile";
function Ac(){if(qbe())return;if(!Js())return"base_url";if(!ft())return"not_claude_ai";if(!im())return"no_token";if(!(g8(fA)&&g8(WK)))return"scope";return}
function gi(){return Ac()===void 0}
function hi(){if(a.CLAUDE_CODE_DISABLE_ORG_MEMORY)return!1;if(yr())return!1;if(!k("tengu_haze_glass",!1))return!1;if(process.env.CLAUDE_MEMORY_STORES?.trim())return!1;if(lc()!==null)return!1;return gi()&&(ft()||qbe())}
function cn(){if(!hi())return"closed";if(dbe()){if(mPe())return"closed"}else if(rU())return"held";return on("allow_memory_sync")?"open":"closed"}
function er(){return hi()&&rU()}
function $s(e){if(Wn())return"files";let n=oZr();if(!sz()){if(e&&n===null)okn(!1);return"files"}if(n!==null)return n?"tools":"files";if(a.CLAUDE_CODE_REMOTE&&a.CLAUDE_CODE_REMOTE_MEMORY_DIR!==void 0||Jbe()||a.CLAUDE_COWORK_MEMORY_GUIDELINES!==void 0||GZn())return okn(!1),"files";let r=k("tengu_linen_orbit",!1)||cn()!=="closed"||er();if(r||e)okn(r);return r?"tools":"files"}
function fr(){return $s(!0)}
function Cxe(){return Xo().some((e)=>ge(e)?.permissions?.blockReadsOutsideWorkingDirectories===!0)}
function dgt(){if(!ar.value&&Cxe())ar.value=!0;return ar.value}
var zoe={allowedTools:[],mcpContextUris:[],mcpServers:{},enabledMcpjsonServers:[],disabledMcpjsonServers:[],hasTrustDialogAccepted:!1,hasClaudeMdExternalIncludesApproved:!1,hasClaudeMdExternalIncludesWarningShown:!1};
function nd(e){let n=YC();Ae((r)=>{if(r.projects?.[n]?.localSettingsSeenGitTracked===!0)return r;return{...r,projects:{...r.projects,[n]:{...r.projects?.[n]??zoe,localSettingsSeenGitTracked:!0}}}},e)}
function td(){return le().projects?.[YC()]?.localSettingsSeenGitTracked===!0}
function Thn(e){let n=um();if(n===null)return["projectSettings","localSettings"];let r=Qu.of(U().host),s=J0({onIndeterminate:"tracked"});if(s&&ds()){if(r.markTracked(n),!r.persistIssued(n)&&HKr())r.markPersistIssued(n),nd(e)}return s||r.isTracked(n)||td()?["projectSettings","localSettings"]:["projectSettings"]}
function VUt(){let e=kKr();return e!==void 0&&Thn().includes(e)}
function a3(){return dgt()&&VUt()}
function rWr(){return rm.of(U().host).hasTeamStore()}
function z1(){if(!qd())return!1;return rWr()}
function Le(){return Nc.of(U().host)}
function KYe(){return Le().getStores()}
function Ze(){return Hu.of(U().host)}
function YYe(){return Ze().decisionRunEverStarted}
function Wh(){return Le().decision}
function uo(){return $s(!1)}
function Cue(){return uo()==="tools"}
function un(){return cn()==="open"}
function Aue(){if(!Cue())return!1;if(At())return!1;if(!un())return!1;return ci().orgMemoryRead!==!1}
function Ns(){return(KYe().length>0||YYe()&&Wh().state==="undecided")&&Aue()}
function _a(e){if(!qd()||a3())return!1;if(z1())return!1;if(Ns())return!1;if(AG(e))return!1;return!0}
var Wd="MEMORY.md";
var whn=["user","feedback","project","reference"];
var lgt=ea(whn);
function pn(t){let e=t/1024;if(e<1)return`${t} bytes`;if(e<1024)return`${e.toFixed(1).replace(/\.0$/,"")}KB`;let r=e/1024;if(r<1024)return`${r.toFixed(1).replace(/\.0$/,"")}MB`;return`${(r/1024).toFixed(1).replace(/\.0$/,"")}GB`}
var BQ=4096;
var Tn=`Keep each memory file under ${pn(BQ)} including frontmatter (recall shows only the first ${pn(BQ)}) and the description to one specific line; when a file outgrows that, split or summarize it rather than continuing it in a second file.`;
var ta=[];
var kn=["- Keep the name, description, and type fields in memory files up-to-date with the content","- Organize memory semantically by topic, not chronologically","- Update or remove memories that turn out to be wrong or outdated","- Do not write duplicate memories. First check if there is an existing memory you can update before writing a new one."];
var NH=200;
function Rt(e){let{skipIndex:n,heading:r="## How to save memories",file:s="memory to its own file (e.g., `user_role.md`, `feedback_testing.md`)",index:g=`\`${Wd}\``}=e;return n?[r,"",`Write each ${s} using this frontmatter format:`,"",...lgt,"",`- ${Tn}`,...ta,...kn]:[r,"","Saving a memory is a two-step process:","",`**Step 1** \u2014 write the ${s} using this frontmatter format:`,"",...lgt,"",`**Step 2** \u2014 add a pointer to that file in ${g}. \`${Wd}\` is an index, not a memory \u2014 each entry should be one line, under ~150 characters: \`- [Title](file.md) \u2014 one-line hook\`. It has no frontmatter. Never write memory content directly into \`${Wd}\`.`,"",`- \`${Wd}\` is always loaded into your conversation context \u2014 lines after ${NH} will be truncated, so keep the index concise`,...ta,...kn]}
var OPe="This directory already exists \u2014 write to it directly with the Write tool (do not run mkdir or check for its existence).";
var Kd=[];
var Ehn=["## Types of memory","","There are several discrete types of memory that you can store in your memory system:","","<types>","<type>","    <name>user</name>","    <description>Contain information about the user's role, goals, responsibilities, and knowledge. Great user memories help you tailor your future behavior to the user's preferences and perspective. Your goal in reading and writing these memories is to build up an understanding of who the user is and how you can be most helpful to them specifically. For example, you should collaborate with a senior software engineer differently than a student who is coding for the very first time. Keep in mind, that the aim here is to be helpful to the user. Avoid writing memories about the user that could be viewed as a negative judgement or that are not relevant to the work you're trying to accomplish together.</description>","    <when_to_save>When you learn any details about the user's role, preferences, responsibilities, or knowledge</when_to_save>","    <how_to_use>When your work should be informed by the user's profile or perspective. For example, if the user is asking you to explain a part of the code, you should answer that question in a way that is tailored to the specific details that they will find most valuable or that helps them build their mental model in relation to domain knowledge they already have.</how_to_use>","    <examples>","    user: I'm a data scientist investigating what logging we have in place","    assistant: [saves user memory: user is a data scientist, currently focused on observability/logging]","","    user: I've been writing Go for ten years but this is my first time touching the React side of this repo","    assistant: [saves user memory: deep Go expertise, new to React and this project's frontend \u2014 frame frontend explanations in terms of backend analogues]","    </examples>","</type>","<type>","    <name>feedback</name>","    <description>Guidance the user has given you about how to approach work \u2014 both what to avoid and what to keep doing. These are a very important type of memory to read and write as they allow you to remain coherent and responsive to the way you should approach work in the project. Record from failure AND success: if you only save corrections, you will avoid past mistakes but drift away from approaches the user has already validated, and may grow overly cautious.</description>",`    <when_to_save>Any time the user corrects your approach ("no not that", "don't", "stop doing X") OR confirms a non-obvious approach worked ("yes exactly", "perfect, keep doing that", accepting an unusual choice without pushback). Corrections are easy to notice; confirmations are quieter \u2014 watch for them. In both cases, save what is applicable to future conversations, especially if surprising or not obvious from the code. Include *why* so you can judge edge cases later.</when_to_save>`,"    <how_to_use>Let these memories guide your behavior so that the user does not need to offer the same guidance twice.</how_to_use>","    <body_structure>Lead with the rule itself, then a **Why:** line (the reason the user gave \u2014 often a past incident or strong preference) and a **How to apply:** line (when/where this guidance kicks in). Knowing *why* lets you judge edge cases instead of blindly following the rule.</body_structure>",...Kd,"    <examples>","    user: don't mock the database in these tests \u2014 we got burned last quarter when mocked tests passed but the prod migration failed","    assistant: [saves feedback memory: integration tests must hit a real database, not mocks. Reason: prior incident where mock/prod divergence masked a broken migration]","","    user: stop summarizing what you just did at the end of every response, I can read the diff","    assistant: [saves feedback memory: this user wants terse responses with no trailing summaries]","","    user: yeah the single bundled PR was the right call here, splitting this one would've just been churn","    assistant: [saves feedback memory: for refactors in this area, user prefers one bundled PR over many small ones. Confirmed after I chose this approach \u2014 a validated judgment call, not a correction]","    </examples>","</type>","<type>","    <name>project</name>","    <description>Information that you learn about ongoing work, goals, initiatives, bugs, or incidents within the project that is not otherwise derivable from the code or git history. Project memories help you understand the broader context and motivation behind the work the user is doing within this working directory.</description>",'    <when_to_save>When you learn who is doing what, why, or by when. These states change relatively quickly so try to keep your understanding of this up to date. Always convert relative dates in user messages to absolute dates when saving (e.g., "Thursday" \u2192 "2026-03-05"), so the memory remains interpretable after time passes.</when_to_save>',"    <how_to_use>Use these memories to more fully understand the details and nuance behind the user's request and make better informed suggestions.</how_to_use>","    <body_structure>Lead with the fact or decision, then a **Why:** line (the motivation \u2014 often a constraint, deadline, or stakeholder ask) and a **How to apply:** line (how this should shape your suggestions). Project memories decay fast, so the why helps future-you judge whether the memory is still load-bearing.</body_structure>","    <examples>","    user: we're freezing all non-critical merges after Thursday \u2014 mobile team is cutting a release branch","    assistant: [saves project memory: merge freeze begins 2026-03-05 for mobile release cut. Flag any non-critical PR work scheduled after that date]","","    user: the reason we're ripping out the old auth middleware is that legal flagged it for storing session tokens in a way that doesn't meet the new compliance requirements","    assistant: [saves project memory: auth middleware rewrite is driven by legal/compliance requirements around session token storage, not tech-debt cleanup \u2014 scope decisions should favor compliance over ergonomics]","    </examples>","</type>","<type>","    <name>reference</name>","    <description>Stores pointers to where information can be found in external systems. These memories allow you to remember where to look to find up-to-date information outside of the project directory.</description>","    <when_to_save>When you learn about resources in external systems and their purpose. For example, that bugs are tracked in a specific project in Linear or that feedback can be found in a specific Slack channel.</when_to_save>","    <how_to_use>When the user references an external system or information that may be in an external system.</how_to_use>","    <examples>",`    user: check the Linear project "INGEST" if you want context on these tickets, that's where we track all pipeline bugs`,'    assistant: [saves reference memory: pipeline bugs are tracked in Linear project "INGEST"]',"","    user: the Grafana board at grafana.internal/d/api-latency is what oncall watches \u2014 if you're touching request handling, that's the thing that'll page someone","    assistant: [saves reference memory: grafana.internal/d/api-latency is the oncall latency dashboard \u2014 check it when editing request-path code]","    </examples>","</type>","</types>",""];
function Qjr(){return k("tengu_ochre_finch",!1)}
var Yd={user:"the user's role, expertise, or working preferences",feedback:"a correction or confirmation of how you should approach work. Confirmations ('yes, good call') are quieter than corrections \u2014 watch for them",project:"ongoing work, deadlines, or decisions not derivable from code or git history",reference:"where to find information in an external system (issue tracker, dashboard, channel)"};
var Jjr="memory-types";
function Vd(e){return["## Types of memory","","Save a memory when you learn one of the following \u2014 pick the matching `type:`:","",...e.map((n)=>`- **${n}** \u2014 ${Yd[n]}`),"",`Invoke the \`${Jjr}\` skill for scope, body structure and examples once you've decided to save.`,""]}
function St(e,n=whn){return Qjr()?Vd(n):e}
var vt=["## What NOT to save in memory","","- Code patterns, conventions, architecture, file paths, or project structure \u2014 these can be derived by reading the current project state.","- Git history, recent changes, or who-changed-what \u2014 `git log` / `git blame` are authoritative.","- Debugging solutions or fix recipes \u2014 the fix is in the code; the commit message has the context.","- Anything already documented in CLAUDE.md files.","- Ephemeral task details: in-progress work, temporary state, current conversation context.","","These exclusions apply even when the user explicitly asks you to save. If they ask you to save a PR list or activity summary, ask what was *surprising* or *non-obvious* about it \u2014 that is the part worth keeping."];
function agt(){return k("tengu_gorse_fathom",!1)}
var Rn="When you save a `feedback` memory because the user corrected how you ran a repeatable step \u2014 how you verified, committed, opened a PR, or used a project skill \u2014 fold the same correction into the project skill that drives that step (`.claude/skills/<name>/SKILL.md`): a terse, general edit, so the next session gets it right unprompted. Edit existing skill files only; never create one \u2014 a new project skill silently shadows a same-named built-in skill. The single exception is verify, because how a project verifies changes is project-specific: put a verify correction in the `.claude/skills/verify/SKILL.md` closest to the code it covers \u2014 the repo root for repo-wide corrections, a subproject directory (e.g. `ios/.claude/skills/verify/SKILL.md`) for corrections that only apply to that subtree \u2014 and if that file does not exist, create it. Each correction lives in exactly one skill file: the closest-scoped one, never duplicated at broader scopes.";
var Zd=["## Project skill upkeep","",Rn,""];
function bt(){return agt()?Zd:[]}
var DUe=["## Before recommending from memory","","A memory that names a specific function, file, or flag is a claim that it existed *when the memory was written*. It may have been renamed, removed, or never merged. Before recommending it:","","- If the memory names a file path: check the file exists.","- If the memory names a function or flag: grep for it.","- If the user is about to act on your recommendation (not just asking about history), verify first.","",'"The memory says X exists" is not the same as "X exists now."',"","A memory that summarizes repo state (activity logs, architecture snapshots) is frozen in time. If the user asks about *recent* or *current* state, prefer `git log` or reading the code over recalling the snapshot."];
var u8n="tengu_salt_marsh";
function En(){return k(u8n,!1)}
function kt(){if(!En())return[];return["## Citing memories","",'Whenever you use or cite content from a memory in communication with the user, always wrap the entire sentence in <cc-memory filenames="{comma separated list of memory file names}">{sentence that references 1 or more memories}</cc-memory> tags. For example: <cc-memory filenames="testing-scripts.md">From a previously saved memory, I see that the command to run tests in this project is `bun test`</cc-memory>',"","Only do this in your reply text to the user \u2014 never inside tool inputs such as plans, todo items, or question options.",""]}
function vo(e,n,r){let{extraGuidelines:s,skipIndex:g=!1,inlineTypes:h=!1,includeSkillUpkeep:w=!0,readOnly:b=!1}=r??{},R=b?[]:Rt({skipIndex:g}),M=b?"This memory is read-only this session \u2014 you cannot save new memories to it.":OPe;return[`# ${e}`,"",n?`You have a persistent, file-based memory system at \`${n}\`. ${M}`:`You have a persistent, file-based memory system. The directory path is provided in your session context. ${M}`,"",...b?[]:["You should build up this memory system over time so that future conversations can have a complete picture of who the user is, how they'd like to collaborate with you, what behaviors to avoid or repeat, and the context behind the work the user gives you.","","If the user explicitly asks you to remember something, save it immediately as whichever type fits best. If they ask you to forget something, find and remove the relevant entry.",""],...h?Ehn:St(Ehn),...vt,"",...R.length>0?[...R,""]:[],...w?bt():[],...Pn,"",...DUe,"",...kt(),"## Memory and other forms of persistence","Memory is one of several persistence mechanisms available to you as you assist the user in a given conversation. The distinction is often that memory can be recalled in future conversations and should not be used for persisting information that is only useful within the scope of the current conversation.","- When to use or update a plan instead of memory: If you are about to start a non-trivial implementation task and would like to reach alignment with the user on your approach you should use a Plan rather than saving this information to memory. Similarly, if you already have a plan within the conversation and you have changed your approach persist that change by updating the plan rather than saving a memory.","- When to use or update tasks instead of memory: When you need to break your work in current conversation into discrete steps or keep track of your progress use tasks instead of saving to memory. Tasks are great for persisting information about the work that needs to be done in the current conversation, but memory should be reserved for information that will be useful in future conversations.","",...s??[],""]}
var _o="auto memory";
function E2o(e){if(fr(),!_a(e))return null;return vo(_o,null,{skipIndex:!1}).join(`
`)}
  return { E2o, memoryStatic: E2o, memoryLines: vo };
}
