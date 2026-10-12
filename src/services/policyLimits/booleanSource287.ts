import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import { createPolicyBooleanSource287 } from './officialPublic287/booleanSource.js'
// Original Am/Cm(k) reader interface. Reuse the existing public cached-feature
// reader; no private evaluation service, second feature cache or fake verdict.
export const policyBooleanSource287 = createPolicyBooleanSource287((name, fallback) =>
  getFeatureValue_CACHED_MAY_BE_STALE<unknown>(name, fallback))
