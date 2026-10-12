// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryErrors287(ports){
const {S,sL,xt}=ports;
function CZ(e){if(!(e instanceof xt))return!1;let r=e.message??"";return e.status===403&&r.includes("OAuth token has been revoked")||e.status===401&&r.includes("OAuth access token has been revoked")};
function q(e){return e instanceof xt&&e.status===503&&e.headers?.get("x-should-retry")==="false"};
function gtr(e){return q(e)?S("headerless_decline"):S("headerless_retryable_503")};
function htr(e){return q(e)?0:sL(1)};
return {CZ,gtr,htr};
}
