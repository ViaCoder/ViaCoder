function module0(imports){
const mb=imports["mb"];
function Gp(e={}){try{return mb(e)}catch{return{key:null,source:"none"}}};
return {Gp};
}
function module1(imports){
const uo=imports["uo"];
const _e=imports["_e"];
const Re=imports["Re"];
const Gp=imports["Gp"];
const o_t=imports["o_t"];
const ye=imports["ye"];
const G=imports["G"];
const Qm=imports["Qm"];
const t=imports["t"];
const K0o=imports["K0o"];
async function Xe(e){return(await G(e)).consentIdentity};
var Se="gateway:";
async function J(e){let n=uo();if(n)return _e(n,await Re(n,e).catch(()=>{return}));if(Gp({skipRetrievingKeyFromApiKeyHelper:!0}).key===null&&o_t())return ye();return Xe(e)};
async function q(e,n,r,s){if(!e)return;let g=e.organizationUuid.startsWith(Se)?await J(s):Qm();if(g?.organizationUuid!==e.organizationUuid||g.accountUuid!==e.accountUuid){t("Remote settings: consent identity no longer matches the fetch identity; not recording org consent");return}await K0o(e,n,r)};

return {Xe,Se,J,q};
}
export function createConsentIdentity287(ports){
const m0=module0({"mb":ports["selectApiKey"]});
const m1=module1({"uo":ports["gatewayAuth"],"_e":ports["gatewayIdentity"],"Re":ports["gatewayPin"],"Gp":m0["Gp"],"o_t":ports["profileEligible"],"ye":ports["profileIdentity"],"G":ports["oauthIdentity"],"Qm":ports["storedAccount"],"t":ports["debug"],"K0o":ports["writeRecord"]});
return {liveIdentity:m1["J"],record:m1["q"]};
}
