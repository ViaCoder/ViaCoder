// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthCredentials287(ports){
const {Jl,Uz,a,fn,le,sO,sto,vl,zn}=ports;
async function Zg(e){let n=Mk();if(typeof n==="string")return n;let r=(await zn().readAsync(e))?.claudeAiOauth?.accessToken;return Dk(n,r)};
function Mk(){let e=fn();if(!e?.accessToken)return"none";if(a.CLAUDE_CODE_OAUTH_TOKEN)return"env";let n=sO();if(n&&(!Uz()||Jl()))return"fd";return{bearer:e.accessToken,fdToken:n}};
function Dk({bearer:e,fdToken:n},r){if(r&&r===e)return"store";if(n&&e===n)return"fd";return"none"};
function w_(e,n){return Boolean(e?.accountUuid)&&e?.accountUuid===n?.accountUuid&&(e?.organizationUuid||void 0)===(n?.organizationUuid||void 0)};
function In(){return vl()?le().oauthAccount:void 0};
function jH(){if(!vl())return;return sto()??void 0};
return {Zg,w_,In,jH};
}
