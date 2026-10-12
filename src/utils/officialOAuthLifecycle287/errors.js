// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthErrors287(ports){
const {}=ports;
function l(n){return n instanceof Error?n.message:String(n)};
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function ch(n){return Hir(E(n))};
function Hir(n){return n==="EDEADLK"||n==="EINTR"||n==="ENXIO"||n==="ENODEV"||n==="ECANCELED"||n==="ENEEDAUTH"||n==="ESTALE"||n==="EUNKNOWN"||n==="ENOMEM"||n!==void 0&&c(n)};
function c(n){return n==="UNKNOWN"||n.startsWith("Unknown system error")};
function Pu(n,e){if(e?.(n))return!0;if(!n||typeof n!=="object"||!("isAxiosError"in n)||!n.isAxiosError)return!1;let t=n.response?.status;return t===void 0||t===401||t===403||t===429};
return {E,ch,l,Pu};
}
