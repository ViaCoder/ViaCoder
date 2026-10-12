import {STATUS_CODES} from 'node:http'
import {createOfficialRetryStatusDto286} from './officialByteWatchdog286/status.runtime.js'
import {StreamFirstByteTimeoutError} from './streamWatchdog.js'

// Native DTO uses the same first-header Error constructor as actual transport;
// creating another ASn class here would lose its causal noResponse details.
let native: ReturnType<typeof createOfficialRetryStatusDto286> | undefined
// Defer cyclic module reads until a request, like the shared auth bindings.
export function getRetryStatus286() {
  return native ??= createOfficialRetryStatusDto286({ASn:StreamFirstByteTimeoutError,Ee:STATUS_CODES})
}
export type {RetryStatus286,RetryStatusError286} from './officialByteWatchdog286/status.runtime.js'
