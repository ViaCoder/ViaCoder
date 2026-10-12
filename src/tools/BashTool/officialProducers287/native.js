// Generated from pinned official 2.1.287 source; see provenance.json.
export function createBashProducers287(ports){const Yhr=new RegExp(["--write","--fix","--in-place","--auto-correct","\\brun\\s+format\\b","\\brun\\s+fix\\b","\\b(yarn|pnpm)\\s+format\\b","\\blint:file\\b","\\blint:fix\\b","\\bblack\\b","\\bisort\\b","\\bruff\\s+format\\b","\\bcargo\\s+(fmt|fix)\\b","\\brustfmt\\b","\\bgo\\s+fmt\\b","\\bterraform\\s+fmt\\b","\\bdprint\\s+fmt\\b","\\bswiftformat\\b","\\bphpcbf\\b"].join("|"))
async function Xhr(e,n,r){if(!Yhr.test(e))return[];let s=[];return await Promise.all(Array.from(n.entries(),([g,h])=>Eb(g).then((b)=>{if(b>r&&b>h.timestamp)s.push(g)}).catch(()=>{}))),s}
function pJe(e){return e!==void 0&&e.agentType==="subagent"&&e.isAsync===!1}
async function Eb(e){return Math.floor(await ports.statMtimeMs(e))}return{modifiedReadFiles:(command,readFileState,now)=>Xhr(command,readFileState,now),isFinalResponseSubagent:agentContext=>pJe(agentContext)}}
