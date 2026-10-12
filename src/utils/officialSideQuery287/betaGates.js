// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryBetaGates287(ports){
const {GF,He,a,ol}=ports;
function Yoe(){let e=He();return e==="firstParty"||GF(e)||e==="foundry"};
function rK(){return a.CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS||qM()};
function qM(){return ol("hipaa")};
function Im(){return Yoe()&&!rK()};
return {Im,rK};
}
