// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthMemoryReset287(ports){
const {MM,Pn}=ports;
function wHo(e){if(MM())return;Ew(Pn.of(e))};
function Ew(e){e.epoch++,e.withdrawalOwed||=e.held!==void 0,e.held=void 0,e.lastCheck=void 0,e.inflight=void 0,e.inflightFor=void 0,e.kicked=void 0,e.firstWaitSpent=!1,e.failures=0,e.notBefore=void 0,e.subagentMode=void 0,e.answeredForSession=void 0,e.earlyGetsHeldBack=!1};
return {wHo,Ew};
}
