import {createConditionalAuthRefreshState287} from './officialConditionalAuthRefreshState287/native.js'
import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'
import {authEnvironment} from './authEnvironment.js'
import {jsonStringify} from './slowOperations.js'
import {logForDebugging} from './debug.js'
import {errorMessage} from './errors.js'
// One canonical conditional refresh state owner per execution host. These are
// AWS/GCP state cells, never ordinary OAuth's reader/lease/persistence cache.
// R04: provider refresh remains its existing conditional source, not a new SDK,
// metadata probe, provider backend or startup qualification override.
export const conditionalAuthRefreshState287=createConditionalAuthRefreshState287({
 U:()=>({host:getSecureStorageExecutionHost()}),a:authEnvironment,_:jsonStringify,
 gK:()=> (require('./auth.js') as typeof import('./auth.js')).runGcpAuthRefresh(),
 t:logForDebugging,l:errorMessage,
})
export const clearAwsAuthRefreshThrottle287=conditionalAuthRefreshState287.rJe
export const clearGcpAuthRefreshState287=conditionalAuthRefreshState287.a_t
export const noteConditionalAuthRefreshStop287=conditionalAuthRefreshState287.nJe
