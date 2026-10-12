import type {CredentialStore,ModernSecureStorage} from '../officialSecureStorage/runtime.js';
import type {OAuthTokens} from '../../services/oauth/types.js';
export function createOAuthDeadCredential287(ports:{Af(tokens:OAuthTokens|null):boolean|undefined;tl(credentials?:CredentialStore):Promise<OAuthTokens|null>;fn():OAuthTokens|null;zn():ModernSecureStorage}):{readAsync(credentials?:CredentialStore):Promise<boolean>;readSync():boolean};
