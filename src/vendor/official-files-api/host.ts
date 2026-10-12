import {isEnvTruthy} from '../../utils/envUtils.js'
import {hasPolicyComplianceTaint} from '../../services/policyLimits/index.js'
export {logForDebugging as t} from '../../utils/debug.js'
export {sleep as Q} from '../../utils/sleep.js'
export {logEvent as i} from '../../services/analytics/index.js'
export {errorMessage as l} from '../../utils/errors.js'
export const y=<T>(value:T)=>value
// Files API has its own version and OAuth beta, independent of messages headers.
export const c$r={header:'files-api-2025-04-14'}
export const $Te={header:'oauth-2025-04-20'}
// Official environment reader exposes provider switches as booleans.
export const a=new Proxy({} as Record<string,boolean>,{get:(_,key)=>isEnvTruthy(process.env[String(key)])})
export const oc=(regime:string)=>hasPolicyComplianceTaint(regime)

// Original batch feature markers use the existing telemetry-disabled C sink.
// They neither create a second feature owner nor enable outgoing analytics.
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS as Marker} from '../../services/analytics/index.js'
export const filesFeatureOk287=(feature:string)=>logEvent('tengu_feature_ok',{feature_name:feature as Marker})
export const filesFeatureSad287=(feature:string,reason:string)=>logEvent('tengu_feature_sad',{feature_name:feature as Marker,error_code:reason as Marker})
export const filesFeatureBad287=(feature:string,reason:string)=>logEvent('tengu_feature_bad',{feature_name:feature as Marker,error_code:reason as Marker})
