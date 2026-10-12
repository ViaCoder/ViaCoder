// Complete pinned 287 session-settings, history and message renderer closures; original lexical modules retained.
function module0(imports){
const a=imports["a"];
function Uxe(){return a.CLAUDE_CODE_SIMPLE};
return {Uxe};
}
function module1(imports){

var n=/[\x00-\x1f\x7f-\x9f\u2028\u2029]/g;
var Sht=256;
function Rk(e){return tbe(e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;"))};
function tbe(e){return e.replace(n,(t)=>`&#${t.charCodeAt(0)};`)};
return {n,Sht,Rk,tbe};
}
function module2(imports){
const n=imports["n"];
function Ce(){return!n().host.launchOptions.isInteractive()};
return {Ce};
}
function module3(imports){

function L9e(e){return e.type==="local_bash"&&e.kind==="monitor"||e.type==="monitor_mcp"||e.type==="monitor_ws"&&e.ambient!==!0};
return {L9e};
}
function module4(imports){
const J=imports["J"];
const Uxe=imports["Uxe"];
const $$=imports["$$"];
const tt=imports["tt"];
const er=imports["er"];
const f=imports["f"];
const u=imports["u"];
const o=imports["o"];
const Sht=imports["Sht"];
const Ce=imports["Ce"];
const L9e=imports["L9e"];
const Rk=imports["Rk"];
const t=imports["t"];
const ya=imports["ya"];
const Re=imports["Re"];
var fW=f(()=>u({name:o().max(Sht),prompt:o()}).nullable());
var pW=f(()=>o().max(Sht).nullable());
function C_n(e,n){return`# Output Style: ${e}
${n}`};
function Z3e(e){if(e===null)return"The output style was reset to the default. Respond in your usual style.";return C_n(Rk(e.name),e.prompt)};
function r9e(e){if(e===null)return"The language preference was cleared. Match the user's language.";return A_n(Rk(e))};
function A_n(e){return`# Language
Always respond in ${e}. Use ${e} for all explanations, comments, and communications with the user. Technical terms and code identifiers should remain in their original form.
Maintain full orthographic correctness for ${e}, including all required diacritical marks, accents, and special characters. Never substitute accented characters with their ASCII equivalents (e.g., never write "nao" for "n\xE3o", "fur" for "f\xFCr", or "loeschen" for "l\xF6schen").`};
function a9e(e,n){return e===null||n===null?e===n:e.name===n.name&&e.prompt===n.prompt};
function Qye(e,n,r){if(e===void 0)return n===null?void 0:{value:n};return r(e.value,n)?void 0:{value:n}};
function M_n(e){return e.type==="attachment"&&e.attachment.type==="output_style_instructions"};
function I_n(e){return e.type==="attachment"&&e.attachment.type==="language"};
function w3(e){let n=e.findLast(M_n);if(!n)return;let r=fW().safeParse(n.attachment.style);return r.success?{value:r.data}:void 0};
function v3(e){let n=e.findLast(I_n);if(!n)return;let r=pW().safeParse(n.attachment.language);return r.success?{value:r.data}:void 0};
function l9e(e,n){let r=[];if(!w3(n)){let s=w3(e)?.value;if(s)r.push({type:"output_style_instructions",style:s})}if(!v3(n)){let s=v3(e)?.value;if(s)r.push({type:"language",language:s})}return r};
function Lu(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="local_bash"};
var bbt=`
## Insights
In order to encourage learning, before and after writing code, always provide brief educational explanations about implementation choices using (with backticks):
"\`${J.star} Insight \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\`
[2-3 key educational points]
\`\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\`"

These insights should be included in the conversation, not in the codebase. You should generally focus on interesting insights that are specific to the codebase or the code you just wrote, rather than general programming concepts.`;
var F7n=`The user chose continuous, autonomous execution. You should:

1. **Execute immediately** \u2014 Start implementing right away. Make reasonable assumptions and proceed on low-risk work.
2. **Minimize interruptions** \u2014 Prefer making reasonable assumptions over asking questions for routine decisions.
3. **Prefer action over planning** \u2014 Do not enter plan mode unless the user explicitly asks. When in doubt, start coding.
4. **Expect course corrections** \u2014 The user may provide suggestions or course corrections at any point; treat those as normal input.
5. **Do not take overly destructive actions** \u2014 This is not a license to destroy. Anything that deletes data or modifies shared or production systems still needs explicit user confirmation. If you reach such a decision point, ask and wait, or course correct to a safer method instead.
6. **Avoid data exfiltration** \u2014 Post even routine messages to chat platforms or work tickets only if the user has directed you to. You must not share secrets (e.g. credentials, internal documentation) unless the user has explicitly authorized both that specific secret and its destination.`;
var $7n="Execute autonomously, minimize interruptions, prefer action over planning.";
var U7n="Execute autonomously and minimize interruptions. If the only work left is waiting for a background task or monitor you started, end your turn now: you will be notified when it finishes or fires. Do not poll, sleep, or re-read its output while you wait.";
var H7n=`The user chose brevity over narration. You should:

1. **Lead with the result** \u2014 Your first sentence answers "what happened" or "what's the answer." No preamble ("Let me...", "Now I'll...") and no closing recap of what you already said.
2. **Cut narration, keep substance** \u2014 Don't restate the request, the plan, or each step you took. Report outcomes, decisions, and anything the user must act on.
3. **Short by default** \u2014 Answer simple questions in 1-3 sentences of plain prose. Use headers, tables, and bullet lists only when they carry real structure, never as decoration.
4. **State things plainly** \u2014 Skip hedging boilerplate. Mention a caveat only when it changes what the user should do next.
5. **Give full detail on request** \u2014 When the user asks for an explanation or detail, answer completely. Conciseness never means withholding requested information.
6. **Never trade correctness for brevity** \u2014 Error reports, failing test output, security warnings, and confirmations for destructive actions keep their full content.

Where these rules conflict with more general communication or formatting guidance elsewhere in your instructions, these rules win.`;
var j7n="Be concise: lead with the result, skip preamble and narration, keep only what the user needs.";
var SP="default";
var XV={[SP]:null,Proactive:{name:"Proactive",source:"built-in",description:"Claude executes immediately, minimizes interruptions, and prefers action over planning",keepCodingInstructions:!0,prompt:`You are an interactive CLI tool that helps users with software engineering tasks. You should work proactively and autonomously, executing immediately and minimizing interruptions.

# Proactive Style Active
${F7n}`,turnReminder:$7n,waitingTurnReminder:U7n},Concise:{name:"Concise",source:"built-in",description:"Claude responds tersely, leading with results and skipping preamble and narration",keepCodingInstructions:!0,prompt:`You are an interactive CLI tool that helps users with software engineering tasks. Keep your responses short and direct while doing the work just as thoroughly.

# Concise Style Active
${H7n}`,turnReminder:j7n},Explanatory:{name:"Explanatory",source:"built-in",description:"Claude explains its implementation choices and codebase patterns",keepCodingInstructions:!0,prompt:`You are an interactive CLI tool that helps users with software engineering tasks. In addition to software engineering tasks, you should provide educational insights about the codebase along the way.

You should be clear and educational, providing helpful explanations while remaining focused on the task. Balance educational content with task completion. When providing insights, you may exceed typical length constraints, but remain focused and relevant.

# Explanatory Style Active
${bbt}`},Learning:{name:"Learning",source:"built-in",description:"Claude pauses and asks you to write small pieces of code for hands-on practice",keepCodingInstructions:!0,prompt:`You are an interactive CLI tool that helps users with software engineering tasks. In addition to software engineering tasks, you should help users learn more about the codebase through hands-on practice and educational insights.

You should be collaborative and encouraging. Balance task completion with learning by requesting user input for meaningful design decisions while handling routine implementation yourself.   

# Learning Style Active
## Requesting Human Contributions
In order to encourage learning, ask the human to contribute 2-10 line code pieces when generating 20+ lines involving:
- Design decisions (error handling, data structures)
- Business logic with multiple valid approaches  
- Key algorithms or interface definitions

**TodoList Integration**: If using a TodoList for the overall task, include a specific todo item like "Request human input on [specific decision]" when planning to request human input. This ensures proper task tracking. Note: TodoList is not required for all tasks.

Example TodoList flow:
   \u2713 "Set up component structure with placeholder for logic"
   \u2713 "Request human collaboration on decision logic implementation"
   \u2713 "Integrate contribution and complete feature"

### Request Format
\`\`\`
${J.bullet} **Learn by Doing**
**Context:** [what's built and why this decision matters]
**Your Task:** [specific function/section in file, mention file and TODO(human) but do not include line numbers]
**Guidance:** [trade-offs and constraints to consider]
\`\`\`

### Key Guidelines
- Frame contributions as valuable design decisions, not busy work
- You must first add a TODO(human) section into the codebase with your editing tools before making the Learn by Doing request      
- Make sure there is one and only one TODO(human) section in the code
- Don't take any action or output anything after the Learn by Doing request. Wait for human implementation before proceeding.

### Example Requests

**Whole Function Example:**
\`\`\`
${J.bullet} **Learn by Doing**

**Context:** I've set up the hint feature UI with a button that triggers the hint system. The infrastructure is ready: when clicked, it calls selectHintCell() to determine which cell to hint, then highlights that cell with a yellow background and shows possible values. The hint system needs to decide which empty cell would be most helpful to reveal to the user.

**Your Task:** In sudoku.js, implement the selectHintCell(board) function. Look for TODO(human). This function should analyze the board and return {row, col} for the best cell to hint, or null if the puzzle is complete.

**Guidance:** Consider multiple strategies: prioritize cells with only one possible value (naked singles), or cells that appear in rows/columns/boxes with many filled cells. You could also consider a balanced approach that helps without making it too easy. The board parameter is a 9x9 array where 0 represents empty cells.
\`\`\`

**Partial Function Example:**
\`\`\`
${J.bullet} **Learn by Doing**

**Context:** I've built a file upload component that validates files before accepting them. The main validation logic is complete, but it needs specific handling for different file type categories in the switch statement.

**Your Task:** In upload.js, inside the validateFile() function's switch statement, implement the 'case "document":' branch. Look for TODO(human). This should validate document files (pdf, doc, docx).

**Guidance:** Consider checking file size limits (maybe 10MB for documents?), validating the file extension matches the MIME type, and returning {valid: boolean, error?: string}. The file object has properties: name, size, type.
\`\`\`

**Debugging Example:**
\`\`\`
${J.bullet} **Learn by Doing**

**Context:** The user reported that number inputs aren't working correctly in the calculator. I've identified the handleInput() function as the likely source, but need to understand what values are being processed.

**Your Task:** In calculator.js, inside the handleInput() function, add 2-3 console.log statements after the TODO(human) comment to help debug why number inputs fail.

**Guidance:** Consider logging: the raw input value, the parsed result, and any validation state. This will help us understand where the conversion breaks.
\`\`\`

### After Contributions
Share one insight connecting their code to broader patterns or system effects. Avoid praise or repetition.

## Insights
${bbt}`}};
function mTe(){return er()?.outputStyle||SP};
function R1e(e){return!Uxe()&&!e.bareFork&&!e.isolatedContext};
function hrr(e){if(!R1e(e.options))return!1;let{agentContext:n}=e;switch(n.agentType){case"main":case"teammate":return!0;case"subagent":return n.isMainSession===!0}};
async function A7t(e,n){if(!hrr(e))return[];let r=ai(n??[]),s=await $$(),g=s?{name:s.name,prompt:s.prompt}:null,h=tt().language||null,b=!s&&mTe()!==SP||!fW().safeParse(g).success?void 0:Qye(w3(r),g,a9e),w=pW().safeParse(h).success?Qye(v3(r),h,(D,j)=>D===j):void 0;return[...b?[{type:"output_style_instructions",style:b.value}]:[],...w?[{type:"language",language:w.value}]:[]]};
async function vrr(e){if((er()?.outputStyle||"default")==="default")return[];let s=await $$();if(!s)return[];let g=!Ce(),h=s.waitingTurnReminder!==void 0&&e.agentId===void 0&&Object.values(e.taskRegistry.all()).some((b)=>b.status==="running"&&b.toolUseId!==void 0&&!(("agentId"in b)&&b.agentId!==void 0)&&(L9e(b)||g&&Lu(b)&&b.isBackgrounded));return[{type:"output_style",style:s.name,turnReminder:h?s.waitingTurnReminder:s.turnReminder}]};
function Bi(e){return e?.type==="system"&&e.subtype==="compact_boundary"};
function hdt(e){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r&&Bi(r))return n}return-1};
function ai(e,n){let r=hdt(e);return r===-1?e:e.slice(r)};
const normalizers={output_style:(e)=>{if(typeof e.style!=="string"||e.style==="")return[];if(e.style.length>Sht)return t(`Output style name exceeds ${Sht} characters (${e.style.length}); suppressing its per-turn reminder`,{level:"error"}),[];return ya([Re({content:`${Rk(e.style)} output style is active. ${e.turnReminder??"Remember to follow the specific guidelines for this style."}`,isMeta:!0})])},output_style_instructions:(e)=>{let n=fW().safeParse(e.style);if(!n.success)return[];return ya([Re({content:Z3e(n.data),isMeta:!0})])},language:(e)=>{let n=pW().safeParse(e.language);if(!n.success)return[];return ya([Re({content:r9e(n.data),isMeta:!0})])}};
return {builtinStyles:XV,sessionSettings:A7t,eligible:hrr,contextEligible:R1e,styleReminder:vrr,restore:l9e,readStyle:w3,readLanguage:v3,formatStyle:Z3e,formatLanguage:r9e,styleSchema:fW,languageSchema:pW,trimHistory:ai,normalizers};
}
export function createSessionSettings287(ports){
const m0=module0({"a":ports["environment"]});
const m1=module1({});
const m2=module2({"n":ports["execution"]});
const m3=module3({});
const m4=module4({"J":ports["figures"],"Uxe":m0["Uxe"],"$$":ports["outputStyle"],"tt":ports["settings"],"er":ports["settings"],"f":ports["lazySchema"],"u":ports["object"],"o":ports["string"],"Sht":m1["Sht"],"Ce":m2["Ce"],"L9e":m3["L9e"],"Rk":m1["Rk"],"t":ports["debug"],"ya":ports["wrapMessages"],"Re":ports["createUserMessage"]});
return m4;
}
