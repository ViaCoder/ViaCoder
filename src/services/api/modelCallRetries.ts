import {APIError,APIConnectionError,APIUserAbortError} from '@anthropic-ai/sdk'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getFetchRequestState286} from '../../utils/officialFetchRequestState286/runtime.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {logEvent} from '../analytics/index.js'
import {createOfficialModelCallRetry286,createOfficialRetryForeground286,createOfficialOverloaded286} from './officialByteWatchdog286/decision.runtime.js'
export type {ModelCallRetries286} from './officialByteWatchdog286/decision.runtime.js'

// Existing application-owned state, typed live environment, SDK errors and
// intentionally disabled analytics. No alternate credential or policy owner.
export const modelCallRetry286=createOfficialModelCallRetry286({
 a:authEnvironment,wi:getFetchRequestState286,t:logForDebugging,
 R:(name,fallback)=>getFeatureValue_CACHED_MAY_BE_STALE(name,fallback),
 d:logError,
 // These three strings are the original closed retry enums, not user text.
 // Keep the existing disabled analytics leaf/type restriction unchanged.
 i:(name,{end,status,decided,did,spent,limit})=>logEvent(name,{
  end:end as never,status:status as number|undefined,decided:decided as never,
  did:did as never,spent:spent as number,limit:limit as number,
 }),
 c:value=>value,
 Pt:APIError,lu:APIConnectionError,dd:APIUserAbortError,
 O1:createOfficialOverloaded286({Pt:APIError}),
})

export const isForegroundQuery286=createOfficialRetryForeground286()
