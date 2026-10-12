function module0(imports){

var fA="user:inference";
function HTn(t){return Array.isArray(t)&&t.includes(fA)};
return {fA,HTn};
}
function module1(imports){
const fn=imports["fn"];
const a=imports["a"];
const sO=imports["sO"];
const Uz=imports["Uz"];
const zn=imports["zn"];
const vl=imports["vl"];
const HTn=imports["HTn"];
function Jl(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST};
async function Zg(e){let n=Mk();if(typeof n==="string")return n;let r=(await zn().readAsync(e))?.claudeAiOauth?.accessToken;return Dk(n,r)};
function Mk(){let e=fn();if(!e?.accessToken)return"none";if(a.CLAUDE_CODE_OAUTH_TOKEN)return"env";let n=sO();if(n&&(!Uz()||Jl()))return"fd";return{bearer:e.accessToken,fdToken:n}};
function Dk({bearer:e,fdToken:n},r){if(r&&r===e)return"store";if(n&&e===n)return"fd";return"none"};
function ft(){if(!vl())return!1;return uU(fn()?.scopes)};
function im(){return fn()?.accessToken!=null};
function c_t(){return fn()?.subscriptionType??null};
function uU(e){return HTn(e)};
return {Jl,Zg,Mk,Dk,ft,im,c_t,uU};
}
function module2(imports){
const im=imports["im"];
const c_t=imports["c_t"];
function CGr(){if(!im())return!1;let e=c_t();return e==="enterprise"||e==="team"};
return {CGr};
}
function module3(imports){
const Qm=imports["Qm"];
const Zg=imports["Zg"];
const oje=imports["oje"];
const ft=imports["ft"];
const CGr=imports["CGr"];
async function G(e){let n=Qm(),r=await Zg(e),s=r==="store"?"stored_login":r==="env"||r==="fd"?"injected_token":void 0;if(r!=="store")return{credentialOrigin:s};return{credentialOrigin:s,consentIdentity:n?.organizationUuid?{organizationUuid:n.organizationUuid,accountUuid:n.accountUuid}:void 0}};
function ye(){let e=oje(),n=Qm();return e?.organizationUuid&&e.accountEmail&&n?.organizationUuid===e.organizationUuid&&n.emailAddress===e.accountEmail&&n.accountUuid?{organizationUuid:e.organizationUuid,accountUuid:n.accountUuid}:void 0};
return {G,ye};
}
export function createRemoteAuth287(ports){
const m0=module0({});
const m1=module1({"fn":ports["tokens"],"a":ports["environment"],"sO":ports["descriptor"],"Uz":ports["backgroundDescriptor"],"zn":ports["storage"],"vl":ports["authEnabled"],"HTn":m0["HTn"]});
const m2=module2({"im":m1["im"],"c_t":m1["c_t"]});
const m3=module3({"Qm":ports["account"],"Zg":m1["Zg"],"oje":ports["profileAccount"],"ft":m1["ft"],"CGr":m2["CGr"]});
return {oauthIdentity:m3["G"],profileIdentity:m3["ye"],subscriber:m1["ft"],enterprise:m2["CGr"],origin:m1["Zg"],metadata:(C,h)=>({authType:C.authType,credentialOrigin:C.credentialOrigin,tokenRefreshOutcome:C.authType==="oauth"?h:void 0})};
}
