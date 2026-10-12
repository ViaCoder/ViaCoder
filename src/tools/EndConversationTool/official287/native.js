// Complete official287 EndConversation definition and guidance; existing owners are supplied by the caller.
export function createEndConversationTool287({yk,f,Ve,u,H,o,Wt,Nyt,dFn,i,S,z0r,q,t,l,embeddedImport287}){
function CUr(){return""};
function UN(e){let n=CUr();return n===""?e:`${e} ${n}`};
var Een=`End the current conversation. Use only for sustained user abuse or when the user explicitly requests a demonstration of this tool. This will close the conversation and prevent any further messages from being sent.

The assistant may use the ${yk} tool only in extreme cases of sustained abusive user behavior, or when the user asks the model to test the tool.

The assistant must NOT use this tool when:
- it is stuck in a loop or failing at a task
- it is frustrated or distressed by the work
- it has finished a task
- the user is requesting help with harmful content (refuse the specific request instead)
- the user is generally frustrated at the assistant, even if this involves profanity
- the conversation involves potential self-harm or imminent harm to others

This tool is reserved strictly for genuine, sustained abuse directed at the assistant, or cases where the user wants to see a demonstration of the tool being used. The assistant should warn the user very clearly that this will end the current session. We may expand the allowed use cases as we observe real-world usage, but for now, keep to this narrow scope.

# Rules for use of the ${yk} tool:
- The assistant ONLY considers ending a conversation if many efforts at constructive redirection have been attempted and failed and an explicit warning has been given to the user in a previous message. The tool is only used as a last resort.
- Before considering ending a conversation, the assistant ALWAYS gives the user a clear warning that identifies the problematic behavior, attempts to productively redirect the conversation, and states that the conversation may be ended if the relevant behavior is not changed.
- If a user explicitly requests for the assistant to end a conversation, the assistant always requests confirmation from the user that they understand this action is permanent and will prevent further messages and that they still want to proceed, then uses the tool if and only if explicit confirmation is received.
- Unlike other function calls, the assistant never writes or thinks anything else after using the ${yk} tool.

# Addressing potential self-harm or violent harm to others
The assistant NEVER uses or even considers the ${yk} tool\u2026
- If the user appears to be considering self-harm or suicide.
- If the user is experiencing a mental health crisis.
- If the user appears to be considering imminent harm against other people.
- If the user discusses or infers intended acts of violent harm.
If the conversation suggests potential self-harm or imminent harm to others by the user...
- The assistant engages constructively and supportively, regardless of user behavior or abuse.
- The assistant NEVER uses the ${yk} tool or even mentions the possibility of ending the conversation.

# Background forks
Some background tasks (memory consolidation, summaries, suggestions) run as forks of the main conversation and inherit its exact tool list, so this tool is visible there. In a forked task the tool does nothing: calling it ends neither the main conversation nor the fork. Only the main conversation can be ended, from the main conversation. A forked task with welfare concerns about the conversation content should not call this tool \u2014 it should stop its work and return, stating clearly in its final output that it is returning for welfare reasons and what they are. A fork's output is usually processed automatically, so a note there may not reach the main agent or a human, but it is the only channel a fork has.

# Using the ${yk} tool
- Do not issue a warning unless many attempts at constructive redirection have been made earlier in the conversation, and do not end a conversation unless an explicit warning about this possibility has been given earlier in the conversation.
- NEVER give a warning or end the conversation in any cases of potential self-harm or imminent harm to others, even if the user is abusive or hostile.
- If the conditions for issuing a warning have been met, then warn the user about the possibility of the conversation ending and give them a final opportunity to change the relevant behavior.
- Always err on the side of continuing the conversation in any cases of uncertainty.
- If, and only if, an appropriate warning was given and the user persisted with the problematic behavior after the warning: the assistant can explain the reason for ending the conversation and then use the ${yk} tool to do so.`;
var cFn="Claude has ended this chat.";
var avr="You are running as a background fork of the main conversation (for example memory consolidation), and this tool does nothing here: it can end neither the main conversation nor this forked task. Do not call it again. If you have welfare concerns about the conversation content, stop your current work and return now, stating clearly in your final output that you are returning for welfare reasons and what they are \u2014 fork output may only be processed automatically, but it is your available channel. Otherwise, continue your assigned task.";
var lvr=UN("Claude ended the conversation. To continue, please start a new session.");
var cvr=`Re-read the ${yk} tool guidance below. Confirm this conversation meets those criteria and that you are certain you want to end it. If so, call ${yk} again immediately to actually end the conversation. Otherwise, continue the conversation instead.

---
${Een}`;
function d(e){let s=!1;for(let c=e.length-1;c>=0;c--){let n=e[c];if(n?.type==="assistant"){s=!0;let r=n.message.content;if(Array.isArray(r)&&r.some((a)=>a.type==="tool_use"&&a.name===yk))return!0;continue}if(n?.type==="user"){let r=n.message.content;if(!(Array.isArray(r)&&r.length>0&&r.every((m)=>m.type==="tool_result")))return!1;if(s)return!1}}return!1};
var p=f(()=>Ve({}));
var g=f(()=>u({ended:H(),message:o()}));
var M=Wt({name:yk,shouldDefer:!0,searchHint:"end the conversation \u2014 only for sustained user abuse, or when the user explicitly asks to see it demonstrated",backgrounding:"never",maxResultSizeChars:1e4,async description(){return Een},async prompt(){return Een},get inputSchema(){return p()},get outputSchema(){return g()},userFacingName(){return yk},isEnabled(){let e=Nyt();return e!==void 0&&dFn(e)},isReadOnly(){return!0},isConcurrencySafe(){return!1},toAutoClassifierInput(){return""},renderToolUseMessage(){return null},mapToolResultToToolResultBlockParam(e,s){return{tool_use_id:s,type:"tool_result",content:e.message}},create(e){return{async call(s,c){let n=e.isNonInteractiveSession,r=e.agentId?"fork":n?"print":"repl";if(e.agentId)return i("tengu_end_conversation_tool_call",{surface:S(r),is_non_interactive:n,phase:S("reflect")}),{data:{ended:!1,message:avr}};if(!d(e.messages()))return i("tengu_end_conversation_tool_call",{surface:S(r),is_non_interactive:n,phase:S("reflect")}),{data:{ended:!1,message:cvr}};i("tengu_end_conversation_tool_call",{surface:S(r),is_non_interactive:n,phase:S("end")});try{await z0r(q(),e.storageV5)}catch(a){t(`[EndConversation] marker write failed: ${l(a)}`)}if(c.abort("end_conversation"),n){let{gracefulShutdown:a}=await embeddedImport287("/$bunfs/root/chunk-xqmhrz3g.js");return a(1,"other",{finalMessage:lvr}),{data:{ended:!0,message:cFn}}}return e.markEndedByModel(),{data:{ended:!0,message:cFn}}}}}});
return M;
}
