import type {AccountInfo} from '../config.js';
import type {OAuthTokens} from '../../services/oauth/types.js';
import type {CredentialStore,ModernSecureStorage} from '../officialSecureStorage/runtime.js';
import type {OAuthIdentity287} from '../officialOAuthPreparation287/runtime.js';
export interface OAuthCredentialSourcePorts287 {fn():OAuthTokens|null;a:{readonly CLAUDE_CODE_OAUTH_TOKEN?:string};sO():string|null;Uz():boolean;Jl():boolean;zn():Pick<ModernSecureStorage,'readAsync'>;vl():boolean;le():{oauthAccount?:AccountInfo};sto():OAuthIdentity287|null}
export function createOAuthCredentials287(ports:OAuthCredentialSourcePorts287):{Zg(credentials?:CredentialStore):Promise<'env'|'fd'|'store'|'none'>;w_(left:OAuthIdentity287|null|undefined,right:OAuthIdentity287|null|undefined):boolean;In():AccountInfo|undefined;jH():OAuthIdentity287|undefined};
