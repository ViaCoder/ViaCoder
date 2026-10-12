import type {OAuthTokens} from '../../services/oauth/types.js'
import type {CredentialStore,ModernSecureStorage} from '../officialSecureStorage/runtime.js'
import type {CredentialState,CredentialStateCell} from '../officialOAuthPersistence/runtime.js'
import type {AuthEnvironment} from '../officialAuthEnvironment/runtime.js'
export type OAuthCredentialReader = {
 sync(): OAuthTokens | null
 async(credentials?: CredentialStore): Promise<OAuthTokens | null>
 readAsync(credentials?: CredentialStore): Promise<OAuthTokens | null>
 readSync(): OAuthTokens | null
 check(state: CredentialState,credentials?: CredentialStore): Promise<void>
 recheck(state: CredentialState,credentials?: CredentialStore): Promise<void>
 uncached(state: CredentialState,credentials?: CredentialStore): Promise<void>
 unusable(token: OAuthTokens | null): boolean | undefined
 emit(state: CredentialState): void
 scopes(defaults?: string[]): string[]
}
export function createOAuthCredentialReader(ports: {
 Bn(): boolean;F(): boolean;FYr(): string[] | undefined;GG(): boolean;Jde: CredentialStateCell
 KT(): void;Pf(): void;Rf(...paths: string[]): string;Tf(path: string): Promise<{mtimeMs: number}>;USe(): void
 a: AuthEnvironment;bi: Set<string>;d(error: unknown): void;d0(): string | null | undefined
 j(): {host: object};m7n(credentials: CredentialStore): Promise<string | null | undefined>;r9(): boolean
 zS(): string;zn(): ModernSecureStorage
}): OAuthCredentialReader
