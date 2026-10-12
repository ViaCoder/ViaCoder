import {createBaseToolNarrowing287} from './officialBaseToolNarrowing287/native.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getPlatform} from '../platform.js'
import {logForDebugging} from '../debug.js'

export const baseToolNarrowing287=createBaseToolNarrowing287({
 feature:getFeatureValue_CACHED_MAY_BE_STALE,
 platform:getPlatform,
 executionContext:getExecutionSession287,
 debugTelemetry:message=>logForDebugging(String(message)),
})
