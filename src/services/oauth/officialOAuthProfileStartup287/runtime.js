// Generated from verified official 2.1.287 declarations. Existing owners are explicit lazy ports.
export function createOfficialOAuthProfileStartup287(ports){
  const {a,le,$i,t,tWt,ft,zp,fn,KBe,xr,n,FJn}=ports;
  var UK=86400000;
  function Jl(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST};
  function f8(){if(!xr())return!1;return!0};
  function EW(){return n().host.credentialSlots.oauthTokenFromFd()};
  function Uz(){return n().host.credentialSlots.oauthTokenFromBgSnapshot()};
  function zWt(){if(f8()||a.CLAUDE_CODE_OAUTH_TOKEN||Jl())return!1;return!(EW()&&!Uz())};
  function _A(e){return zWt()?FJn(e):le().oauthAccount?.planDisplayName??null};
  async function pqr(e,n){let r=a.CLAUDE_CODE_ACCOUNT_UUID,s=a.CLAUDE_CODE_USER_EMAIL,g=a.CLAUDE_CODE_ORGANIZATION_UUID,h=r&&s&&g?{accountUuid:r,emailAddress:s,organizationUuid:g}:null;if(h&&!le().oauthAccount)tWt(h,n);await $i({credentials:e,storageV5:n});let b=le(),v=b.oauthAccount?.profileFetchedAt,w=v!==void 0&&Date.now()-v<UK;if(b.oauthAccount&&b.oauthAccount.billingType!==void 0&&b.oauthAccount.accountCreatedAt!==void 0&&b.oauthAccount.subscriptionCreatedAt!==void 0&&b.oauthAccount.ccOnboardingFlags!==void 0&&w||!ft()||!zp())return!1;let A=fn();if(!A?.accessToken)return!1;let R=await KBe(A.accessToken);if(!R?.account||!R.organization)return!1;if(h)t("OAuth profile fetch succeeded, overriding env var account info",{level:"info"});return tWt({accountUuid:R.account.uuid,emailAddress:R.account.email,organizationUuid:R.organization.uuid,displayName:R.account.display_name||void 0,fullName:R.account.full_name||void 0,hasExtraUsageEnabled:R.organization.has_extra_usage_enabled??!1,billingType:R.organization.billing_type??void 0,accountCreatedAt:R.account.created_at,subscriptionCreatedAt:R.organization.subscription_created_at??void 0,ccOnboardingFlags:R.organization.cc_onboarding_flags??{},claudeCodeTrialEndsAt:R.organization.claude_code_trial_ends_at??null,claudeCodeTrialDurationDays:R.organization.claude_code_trial_duration_days??null,seatTier:R.organization.seat_tier??null,planDisplayName:_A(R),profileFetchedAt:Date.now()},n),!0};
  return pqr;
}
