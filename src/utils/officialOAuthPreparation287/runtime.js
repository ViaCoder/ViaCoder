// Exact official 2.1.287 declarations; alias ports are extraction scaffolding.
export function createOAuthPreparation287(ports){
const In=ports.storedIdentity;
const S_=ports.sameIdentity;
const $H=ports.authenticatedIdentity;
const Zg=ports.credentialBackend;
const Qee=ports.reset;
const Bfe=ports.stampAccount;
const j1e=ports.fetchProfile;
const FWt=ports.storeProfile;
const y7n=ports.validatePlan;
const F_e=ports.recordLogin;
async function Hcr(e,{storageV5:r,credentials:o}){let f=In(),s={accountUuid:e.profile?.account?.uuid??e.tokenAccount?.uuid,organizationUuid:e.profile?.organization?.uuid??e.tokenAccount?.organizationUuid},u=S_(f,s),p=S_($H(),s),g=await Zg(o),A=p&&(g==="env"||g==="fd"||g==="store"&&u)?"same_account":"account_switch";await Qee({clearOnboarding:!1,preserveInProcessTokens:!0,preserveNonAnthropicAuth:!0,storageV5:r,preserveQuotaAutoResume:u,artifactAccount:A,incomingIdentity:s,credentials:o}),Bfe(null);let n=e.profile??await j1e(e.accessToken);if(n?.account&&n.organization)FWt({accountUuid:n.account.uuid,emailAddress:n.account.email,organizationUuid:n.organization.uuid,displayName:n.account.display_name||void 0,fullName:n.account.full_name||void 0,hasExtraUsageEnabled:n.organization.has_extra_usage_enabled??void 0,billingType:n.organization.billing_type??void 0,subscriptionCreatedAt:n.organization.subscription_created_at??void 0,accountCreatedAt:n.account.created_at,ccOnboardingFlags:n.organization.cc_onboarding_flags??{},claudeCodeTrialEndsAt:n.organization.claude_code_trial_ends_at??null,claudeCodeTrialDurationDays:n.organization.claude_code_trial_duration_days??null,seatTier:n.organization.seat_tier??null,planDisplayName:y7n(n),profileFetchedAt:Date.now()},r);else if(e.tokenAccount)FWt({accountUuid:e.tokenAccount.uuid,emailAddress:e.tokenAccount.emailAddress,organizationUuid:e.tokenAccount.organizationUuid},r);return F_e({action:"login",success:!0,authMethod:"oauth"}),{preserveQuotaAutoResume:u,artifactAccount:A,incomingIdentity:s}}
return {prepare:Hcr};
}
export function createOAuthPreparationCredentials287(ports){
const fn=ports.oauthToken;
const a=ports.environment;
const eM=ports.fdToken;
const OV=ports.backgroundSnapshot;
const Xl=ports.providerManaged;
const Gn=ports.storage;
const wl=ports.authEnabled;
const le=ports.config;
const Peo=ports.authenticatedAccount;
async function Zg(e){let n=Nk();if(typeof n==="string")return n;let r=(await Gn().readAsync(e))?.claudeAiOauth?.accessToken;return Fk(n,r)}
function Nk(){let e=fn();if(!e?.accessToken)return"none";if(a.CLAUDE_CODE_OAUTH_TOKEN)return"env";let n=eM();if(n&&(!OV()||Xl()))return"fd";return{bearer:e.accessToken,fdToken:n}}
function Fk({bearer:e,fdToken:n},r){if(r&&r===e)return"store";if(n&&e===n)return"fd";return"none"}
function S_(e,n){return Boolean(e?.accountUuid)&&e?.accountUuid===n?.accountUuid&&(e?.organizationUuid||void 0)===(n?.organizationUuid||void 0)}
function In(){return wl()?le().oauthAccount:void 0}
function $H(){if(!wl())return;return Peo()??void 0}
return {storedIdentity:In,authenticatedIdentity:$H,sameIdentity:S_,credentialBackend:Zg};
}
export function createOAuthAccountWriter287({saveConfig}){
const Te=saveConfig;
function FWt({accountUuid:e,emailAddress:n,organizationUuid:r,displayName:s,fullName:g,hasExtraUsageEnabled:h,billingType:v,accountCreatedAt:S,subscriptionCreatedAt:w,ccOnboardingFlags:T,claudeCodeTrialEndsAt:R,claudeCodeTrialDurationDays:D,seatTier:H,planDisplayName:K,profileFetchedAt:G},z){let j={accountUuid:e,emailAddress:n,organizationUuid:r,hasExtraUsageEnabled:h,billingType:v,accountCreatedAt:S,subscriptionCreatedAt:w,ccOnboardingFlags:T,claudeCodeTrialEndsAt:R,claudeCodeTrialDurationDays:D,seatTier:H,planDisplayName:K??void 0};if(s)j.displayName=s;if(g)j.fullName=g;if(G!==void 0)j.profileFetchedAt=G;Te((Y)=>{if(G===void 0&&Y.oauthAccount?.accountUuid===j.accountUuid&&Y.oauthAccount?.emailAddress===j.emailAddress&&Y.oauthAccount?.organizationUuid===j.organizationUuid&&Y.oauthAccount?.displayName===j.displayName&&Y.oauthAccount?.fullName===j.fullName&&Y.oauthAccount?.hasExtraUsageEnabled===j.hasExtraUsageEnabled&&Y.oauthAccount?.billingType===j.billingType&&Y.oauthAccount?.accountCreatedAt===j.accountCreatedAt&&Y.oauthAccount?.subscriptionCreatedAt===j.subscriptionCreatedAt&&Y.oauthAccount?.claudeCodeTrialEndsAt===j.claudeCodeTrialEndsAt&&Y.oauthAccount?.claudeCodeTrialDurationDays===j.claudeCodeTrialDurationDays&&Y.oauthAccount?.seatTier===j.seatTier&&Y.oauthAccount?.planDisplayName===j.planDisplayName&&JSON.stringify(Y.oauthAccount?.ccOnboardingFlags)===JSON.stringify(j.ccOnboardingFlags))return Y;return{...Y,oauthAccount:{...Y.oauthAccount,...j}}},z)}
return {store:FWt};
}
