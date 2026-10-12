// Original 287 credential/config phases. Whole logout/cache/host restoration remains separate.
export function createOAuthCredentialClear287(ports){
const Gn=ports.storage;
const Me=ports.provider;
const Gk=ports.revoke;
const t=ports.debug;
const d=ports.report;
const dXr=ports.writeLock;
const JYo=ports.alreadyLocked;
const Pc=ports.readFailed;
const a=ports.environment;
const FB=ports.setFd;
const S9=ports.setGateway;
const Bfe=ports.stampAccount;
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function lh(n){return dir(E(n))}
function l(n){return n instanceof Error?n.message:String(n)}
function dir(n){return n==="EDEADLK"||n==="EINTR"||n==="ENXIO"||n==="ENODEV"||n==="ECANCELED"||n==="ENEEDAUTH"||n==="ESTALE"||n==="EUNKNOWN"||n==="ENOMEM"||n!==void 0&&c(n)}
function c(n){return n==="UNKNOWN"||n.startsWith("Unknown system error")}
async function Q(e,r){for(let n=0;n<2;n++){let s=await(e.readAsyncStrict?.(r)??e.readAsync(r));if(s!==Pc)return s?.coworkRemoteDevice}d(Error("logout: secure storage could not be read, so the device identity is not carried across the wipe"));return}
async function Z(e,r,n){let s;for(let c=0;c<2;c++)try{let u=await e.mutate(()=>({coworkRemoteDevice:r}),n);if(u.success)return;if(s=Error("logout: the device identity could not be written back after the credential wipe"),!u.transient)break}catch(u){s=u}d(s)}
async function clear({preserveNonAnthropicAuth:n=false,credentials:g}={}){let w=Gn();if(n){if(Me()==="firstParty"){w.invalidateCache?.();let p=(await w.readAsync(g))?.designOauth;if(p?.refreshToken)await Gk(p.refreshToken,p.clientId)}await w.mutate((p)=>{let i={...p};return delete i.claudeAiOauth,delete i.organizationUuid,delete i.trustedDeviceToken,delete i.enterpriseGateway,delete i.designOauth,i},g).catch((p)=>{let i=E(p);if(i==="EPERM"||i==="ENOENT"||lh(p)){t(`[performLogout] re-login secure-storage prune failed (${i}): ${l(p)}`,{level:"error"});return}d(p)})}else{let p=!1,i=async()=>{p=!0;let m=await Q(w,g);if(await w.delete(g),m&&Object.keys(m).length>0)await Z(w,m,g)};await dXr(i).catch((m)=>{if(p)throw m;return d(m),JYo(i)})}}
async function revokeExisting({preserveInProcessTokens:r=false,credentials:g}={}){if(!r&&Me()==="firstParty"){let p=Gn();p.invalidateCache?.();let i=await p.readAsync(g),m=i?.claudeAiOauth;if(m?.refreshToken)await Gk(m.refreshToken,m.clientId);let C=i?.designOauth;if(C?.refreshToken)await Gk(C.refreshToken,C.clientId)}}
function clearInProcess({preserveInProcessTokens:r=false}={}){if(!r)a.unset("CLAUDE_CODE_OAUTH_TOKEN"),FB(null);}
function clearSlots(){S9(null),Bfe(null);}
return {clear,revokeExisting,clearInProcess,clearSlots};
}
export function createOAuthConfigClear287(){
function wi(n){if(!Array.isArray(n))return[];return n.every((e)=>typeof e==="string")?n:n.filter((e)=>typeof e==="string")}
function KO(e){let n=e.customApiKeyResponses;return{approved:wi(n?.approved),rejected:wi(n?.rejected)}}
const Rot="subscription-switch";
return (e=false)=>(p)=>{let i={...p};if(e){if(i.hasCompletedOnboarding=!1,i.subscriptionNoticeCount=0,i.hasAvailableSubscription=!1,i.customApiKeyResponses!==void 0)i.customApiKeyResponses={approved:[],rejected:KO(i).rejected};let m=Rot;if(i.seenNotifications?.[m]!==void 0){let{[m]:C,...x}=i.seenNotifications;i.seenNotifications=x}}return i.oauthAccount=void 0,i.additionalModelOptionsCache=void 0,i.additionalModelOptionsAnsweredAt=void 0,i.additionalModelCostsCache=void 0,i.modelAccessCache=void 0,i.orgModelDefaultCache=void 0,i.cachedArtifactRoster=void 0,i.artifactRosterDenied=void 0,i.lastSeenOrgDefaultUpdatedAt=void 0,i.clientDataCache=void 0,i.clientDataCacheSlots=void 0,i.autoCompactWindowsCache=void 0,i.cachedUsageUtilization=void 0,i.metricsStatusCache=void 0,i.metricsStatusCacheByPrincipal=void 0,i.githubWebConnectionStatusCache=void 0,i.startupPrefetchedAt=void 0,i};
}
export function createOAuthRevoker287(ports){
const _t=ports.http;
const dn=ports.config;
const y=ports.ok;
const t=ports.debug;
const p=ports.sad;
async function Gk(e,n){try{await _t.post(`${dn().TOKEN_URL}/revoke`,{token:e,token_type_hint:"refresh_token",client_id:n??dn().CLIENT_ID},{headers:{"Content-Type":"application/json"},timeout:5000}),y("oauth_token_revoke")}catch(r){let s=_t.isAxiosError(r)?r.response?.status:void 0;t(`OAuth token revoke failed (status=${s??"network"}); continuing with local logout.`),p("oauth_token_revoke",`http_${s??"network"}`)}}
return Gk;
}
