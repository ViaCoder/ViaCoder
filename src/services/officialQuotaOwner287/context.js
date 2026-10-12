// Exact native long-context quota predicates.
export function createNativeQuotaContext287({a,Be,xa}){
function KP(){return a.CLAUDE_CODE_DISABLE_1M_CONTEXT}
function zd(e){if(KP())return!1;return Gyt(e)}
function Gyt(e){return/\[1m\]/i.test(e)}
function YI(e){let n=kt(e),r=Be(n);if(rv(r))return r;if(n===e)return;let s=Be(e);if(rv(s))return s;return}
function rv(e){let n=kt(e);return xa(n)?.context?.native_1m===!0||n===wbt}
function EKr(e){return YI(e)!==void 0}
function qS(e){return!KP()&&EKr(e)}
function kt(e){return e.replace(/\[1m\]$/i,"")}
var wbt="claude-mythos-preview";
return {zd,qS};
}
