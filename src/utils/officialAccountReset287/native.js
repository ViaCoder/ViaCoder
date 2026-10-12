// Exact native O_t body with the current account-state owner supplied by the production caller.
export function createNativeClientDataSeedClear287(ports){
if(ports.oe===undefined)throw new TypeError("Missing required native client-data seed owner port: oe");
const oe=ports.oe;
function O_t(e){let n=oe();if(e===void 0||n.clientDataWindowSeed?.key===e)n.setClientDataWindowSeed(null)}
return O_t;
}
