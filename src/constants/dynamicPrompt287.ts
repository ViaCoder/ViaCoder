import {getExecutionSession287} from '../services/context/execution287.js'
import {communication287} from './communication287.js'
import {logForDebugging} from '../utils/debug.js'
import {createDynamicPrompt287} from './officialDynamicPrompt287/native.js'
import {authEnvironment} from '../utils/authEnvironment.js'
import {getModelBehaviorName287} from '../utils/model/behavior287.js'
import {getBakedCatalogEntry287,getCanonicalRoot287} from '../utils/model/canonical287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getClientData} from '../utils/clientData.js'
import {logEvent} from '../services/analytics/index.js'

export const officialDynamicPrompt287=createDynamicPrompt287({
 environment:authEnvironment,execution:getExecutionSession287,
 lean:communication287.leanForPrompt,
 ...communication287.promptPolicy,
 debug:logForDebugging,
 behavior:model=>getModelBehaviorName287(model),
 canonicalRoot:getCanonicalRoot287,
 catalogEntry:getBakedCatalogEntry287,
 feature:(name,fallback)=>getFeatureValue_CACHED_MAY_BE_STALE(name,fallback),
 clientData:()=>getClientData(),event:logEvent,
 profileReader:{reader:()=>getClientData()},
})
