// Exact qDo/VLr source closure from the pinned 2.1.287 corpus.
export function createBashGhRate287(){var lse=/(?:^|[;&|]|\b(?:then|do)\b)\s*gh\s+(?!auth\b|help\b|version\b|alias\b|completion\b|config\b)/
var cse=/API rate limit (?:already )?exceeded|exceeded a secondary rate limit|\bRATE_LIMITED\b/i
var use=60000
class VLr{backoffUntil=0}
function qDo(e,n,r){if(!lse.test(e)||!cse.test(n)||Date.now()<r.backoffUntil)return;return r.backoffUntil=Date.now()+use,"<system-reminder>GitHub API rate limit exceeded (5,000/hr shared across all tools and agents). Run `gh api rate_limit --jq .resources` and sleep until reset before further gh calls. If polling in a loop, use ScheduleWakeup instead of retrying.</system-reminder>"}
return {State:VLr,hint:(command,output,state)=>qDo(command,output,state)} }
export const bashGhRate287=createBashGhRate287()
