import type { OAuthTokens } from '../../oauth/types.js'
import type { OAuthRefreshOutcome } from '../../../utils/officialOAuthEngine/runtime.js'
declare class bKe extends Error { constructor() }
declare class Fre extends Error { url: string; constructor(url: string) }
export { bKe as OAuthRefreshLockTimeoutError286, Fre as OAuthAccountOnHoldError286 }
export type OAuthConstructorGuard286 = (ke: boolean, pe: OAuthRefreshOutcome, Ee: OAuthTokens | null) => void
export function createOAuthConstructorGuard286(ports: { pn(): OAuthTokens | null; _i: Map<string,string>; R(feature: string, fallback: boolean): unknown }): OAuthConstructorGuard286
