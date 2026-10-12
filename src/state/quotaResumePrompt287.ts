import {createQuotaPromptLookup287,createQuotaResumeText287} from './officialQuotaResumePrompt287/native.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getModelBehaviorName287} from '../utils/model/behavior287.js'
import {it} from '../vendor/official-usage-limit-wait/host.js'

// Read the existing model/feature owners at call time. No cached prompt, quota
// episode, eligibility override, or new system message is introduced here.
export const quotaPromptLookup287=createQuotaPromptLookup287({k:getFeatureValue_CACHED_MAY_BE_STALE,Be:getModelBehaviorName287})
export const quotaResumeText287=createQuotaResumeText287({CEr:quotaPromptLookup287.CEr,rt:()=>it()})
