// Generated from verified raw AST; Foundry-only schema, original decoder port.
// @ts-nocheck -- complete original declarations, no body rewriting.
export function createOfficialFoundryEnvironment286({D,process,base={}}) {
function gKo(n){if(typeof n==="boolean")return n?"1":"0";return String(n)}
var mt=D.str();
var Io=D.bool();
var ji=D.str();
var Zi=D.str();
function gJe(t,o){let _=Object.create(o);for(let[E,r]of Object.entries(t)){let e=_,s;Object.defineProperty(_,E,{get:()=>{let n=process.env[E];if(n!==e)s=r.parse(n),e=n;return s},enumerable:!0,configurable:!0})}return Object.defineProperties(_,{set:{value:(E,r)=>{process.env[E]=gKo(r)}},unset:{value:(E)=>{delete process.env[E]}}}),_}
return gJe({ANTHROPIC_FOUNDRY_AUTH_TOKEN:mt,CLAUDE_CODE_SKIP_FOUNDRY_AUTH:Io,ANTHROPIC_FOUNDRY_RESOURCE:ji,ANTHROPIC_FOUNDRY_BASE_URL:Zi},base)
}
