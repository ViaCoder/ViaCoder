import {createSystemCache287, type SystemCacheSerializer287} from './officialSystemCache287/native.js'
import {getModelBetaProducer287} from '../../utils/modelBetas287.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {CLI_SYSPROMPT_PREFIXES} from '../../constants/system.js'
import {logEvent} from '../analytics/index.js'

let serializer: SystemCacheSerializer287 | undefined
// Lazy only for import-cycle ordering. No policy cache, taints, request or TTL state here.
export function getSystemCacheSerializer287(): SystemCacheSerializer287 {
  return serializer ??= createSystemCache287({
    provider: getNativeAPIProvider287,
    experimentalAllowed: () => getModelBetaProducer287().Im(),
    environment: authEnvironment,
    prefixes: CLI_SYSPROMPT_PREFIXES,
    analytics: (name, attributes) => logEvent(name, attributes),
  })
}
