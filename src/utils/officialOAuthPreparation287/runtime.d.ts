import type {OAuthTokens,OAuthProfileResponse} from '../../services/oauth/types.js';
import type {AccountInfo,GlobalConfig} from '../config.js';
import type {CredentialStore,ModernSecureStorage} from '../officialSecureStorage/runtime.js';
export type OAuthIdentity287={accountUuid?:string;organizationUuid?:string};
export type OAuthPreparationOptions287={storageV5?:unknown;credentials?:CredentialStore};
export type OAuthPreparedIdentity287={preserveQuotaAutoResume:boolean;artifactAccount:'same_account'|'account_switch';incomingIdentity:OAuthIdentity287};
export type OAuthAccountWrite287=Pick<AccountInfo,'accountUuid'|'emailAddress'|'displayName'|'fullName'|'seatTier'|'hasExtraUsageEnabled'|'billingType'|'accountCreatedAt'|'subscriptionCreatedAt'|'ccOnboardingFlags'|'claudeCodeTrialEndsAt'|'claudeCodeTrialDurationDays'|'profileFetchedAt'>&{organizationUuid:string|undefined;planDisplayName?:string|null};
export type OAuthInstallResetOptions287=OAuthPreparationOptions287&OAuthPreparedIdentity287&{clearOnboarding:false;preserveInProcessTokens:true;preserveNonAnthropicAuth:true};
export type OAuthPreparationCredentials287={storedIdentity():AccountInfo|undefined;authenticatedIdentity():OAuthIdentity287|undefined;sameIdentity(left:OAuthIdentity287|null|undefined,right:OAuthIdentity287|null|undefined):boolean;credentialBackend(credentials?:CredentialStore):Promise<'none'|'env'|'fd'|'store'>};
export type OAuthPreparationPorts287=OAuthPreparationCredentials287&{
reset(options:OAuthInstallResetOptions287):Promise<void>;stampAccount(value:null):void;fetchProfile(token:string):Promise<OAuthProfileResponse|null|undefined>;storeProfile(account:OAuthAccountWrite287,storageV5?:unknown):void;validatePlan(profile:OAuthProfileResponse):string|null;recordLogin(metadata:{action:'login';success:true;authMethod:'oauth'}):void;
};
export function createOAuthPreparation287(ports:OAuthPreparationPorts287):{prepare(tokens:OAuthTokens,options:OAuthPreparationOptions287):Promise<OAuthPreparedIdentity287>};
export function createOAuthPreparationCredentials287(ports:{
oauthToken():OAuthTokens|null;environment:{CLAUDE_CODE_OAUTH_TOKEN?:string};fdToken():string|null|undefined;backgroundSnapshot():boolean;providerManaged():boolean;storage():Pick<ModernSecureStorage,'readAsync'>;authEnabled():boolean;config():GlobalConfig;authenticatedAccount():OAuthIdentity287|null;
}):OAuthPreparationCredentials287;
export function createOAuthAccountWriter287(ports:{saveConfig(updater:(config:GlobalConfig)=>GlobalConfig,storageV5?:unknown):Promise<void>}):{store(account:OAuthAccountWrite287,storageV5?:unknown):void};
