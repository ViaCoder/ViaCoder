// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryAttributionKey287(ports){
const {Gwn,q,tn}=ports;
function v_t(e){return tn(e)??void 0};
function pl(){return{agentType:"main",agentId:q()}};
function Rp(e){return e.agentType==="main"};
function uJe(e){return v_t(e&&!Rp(e)&&"turnAttributionKey"in e?e.turnAttributionKey:Gwn())};
return {pl,uJe};
}
