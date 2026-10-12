// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthGatewayRevoke287(ports){
const {$w,OQn,l,ope,s8,sH,spe,t}=ports;
async function Aqo(e,n){try{let r=spe(await ope(s8(new URL(e.url)),n),e.url),s=e.revocationEndpoint??await sH(e.url,r);if(!s){t("[gateway-logout] no revocation endpoint known for this gateway; sign-out ends the session on this machine only",{level:"info"});return}let g=OQn(e.url,s);if(!g){t("[gateway-logout] revocation endpoint is not on the gateway host; skipping the revoke",{level:"warn"});return}await Promise.all([$w(g,{token:e.jwt},r,"session"),...e.idpRefreshToken?[$w(g,{token:e.idpRefreshToken,token_type_hint:"refresh_token"},r,"refresh token")]:[]])}catch(r){t(`[gateway-logout] gateway revoke skipped: ${l(r)}`,{level:"warn"})}};
return {Aqo};
}
