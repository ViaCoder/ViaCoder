// @bun @bytecode
// Claude Code is a Beta product per Anthropic's Commercial Terms of Service.
// By using Claude Code, you agree that all code acceptance or rejection decisions you make,
// and the associated conversations in context, constitute Feedback under Anthropic's Commercial Terms,
// and may be used to improve Anthropic's products, including training models.
// You are responsible for reviewing any code suggestions before use.

// (c) Anthropic PBC. All rights reserved. Use is subject to the Legal Agreements outlined here: https://code.claude.com/docs/en/legal-and-compliance.

// Version: 2.1.283
import{ZU}from"./runtime.js";import{TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS as P}from"../../utils/errors.js";import{lazySchema as f}from"../../utils/lazySchema.js";import{jsonParse as X}from"../../utils/slowOperations.js";import{o,k,u}from"../official-chrome/chunk-wm5xk7n8.js";var i=f(()=>u({deviceId:o(),name:o().default("Browser"),osPlatform:o().optional()}));async function Rwn(n){let e=await gGt(n,"list_connected_browsers",{});if(!e)return[];let t=k(i()).safeParse(X(e));return t.success?t.data:[]}async function gGt(n,e,t){let s=await ZU(n,{name:e,arguments:t}),r=Array.isArray(s.content)?s.content[0]:void 0,c=r&&typeof r==="object"&&"text"in r&&typeof r.text==="string"?r.text:void 0;if(s.isError)throw new P(c||`${e} failed`,"claude-in-chrome tool call failed");return c}
export{Rwn,gGt};
