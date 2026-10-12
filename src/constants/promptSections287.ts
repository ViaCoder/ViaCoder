import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getBakedCatalog287, getBakedCatalogEntry287} from '../utils/model/canonical287.js'
import {createPromptSections287} from './officialPromptSections287/native.js'

export const officialPromptSections287 = createPromptSections287({
  Gj: getBakedCatalog287,
  xa: getBakedCatalogEntry287,
  k: getFeatureValue_CACHED_MAY_BE_STALE,
})
