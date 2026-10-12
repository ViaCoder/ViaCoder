// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyReasonText287(ports){
const {Qpe}=ports;
var zpe="/api/claude_code/policy_limits";
var p="disabled by your organization's policy";
var F="disabled for the rest of this session because an organization with a restricted policy was signed in earlier";
function nSt(e,n,r,o){if(Qpe(r).length>0)return`${e} ${n} ${p}.`;if(o!==void 0)return o;return`${e} ${n} ${p}. Contact your organization admin to enable ${n==="are"?"them":"it"}.`};
function iwe(e,n){return`${e} ${n} ${F}. Restart Claude Code to re-evaluate.`};
function Qoe(e){return`Couldn't verify your organization's policy for ${e.toLowerCase()}. Check your network connection and try again.`};
function NJe(e){return`Couldn't load your organization's policy, which governs ${e.toLowerCase()}. The request for ${zpe} got a 404, which usually means a proxy or gateway between you and the API isn't forwarding that path. Ask your network admin to allow it; \`claude doctor\` (or /status in a session) shows which host was asked.`};
return {nSt,iwe,Qoe,NJe};
}
