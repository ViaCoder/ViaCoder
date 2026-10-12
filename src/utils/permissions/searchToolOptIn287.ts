import {createSearchToolOptIn287} from './officialSearchToolOptIn287/native.js'
import {agentPromptState287} from '../../services/context/agentPromptState287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'

// HEr's explicit CLI opt-in producer writes the same launch owner read by
// the Agent description. The normal default tool pool is not an opt-in.
export const searchToolOptIn287 = createSearchToolOptIn287({
  feature: getFeatureValue_CACHED_MAY_BE_STALE,
  replaceSearchToolsOptIn: agentPromptState287.replaceSearchToolsOptIn,
})
