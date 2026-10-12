import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import { getSharedOAuthEngine } from '../../utils/sharedOAuthEngine.js'
import { getClaudeAIOAuthTokens } from '../../utils/auth.js'
import type { OAuthTokens } from '../oauth/types.js'
import type { OAuthRefreshOutcome } from '../../utils/officialOAuthEngine/runtime.js'
import {
  createOAuthConstructorGuard287,
  createOAuthHeldAccountReader287,
  createOAuthHeldAccountError287,
  createOAuthLockTimeoutError287,
} from '../../utils/officialRequestHeaders/official287.js'

export const OAuthAccountOnHoldError287 = createOAuthHeldAccountError287()
export const OAuthRefreshLockTimeoutError287 = createOAuthLockTimeoutError287()

/**
 * Apply the 2.1.287 subscriber constructor guard at the caller-selected
 * constructor boundary. State comes from the existing reader and engine;
 * this adapter owns no token map, singleton, or refresh policy.
 */
export function guardfactory(
  ke: boolean,
  pe: OAuthRefreshOutcome,
  Ee: OAuthTokens | null,
): void {
  createOAuthConstructorGuard287({
    l2e: createOAuthHeldAccountReader287({
      fn: () => getClaudeAIOAuthTokens(),
      gi: getSharedOAuthEngine().holdTokens,
    }),
    ose: OAuthAccountOnHoldError287,
    H5e: OAuthRefreshLockTimeoutError287,
    k: (feature, fallback) =>
      getFeatureValue_CACHED_MAY_BE_STALE(feature, fallback),
  })(ke, pe, Ee)
}
