import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {createOriginalManualOAuthRegistry287,type ManualOAuthState287} from './manualOAuthNative287.js'
export {installOriginalManualCallback287,clearOriginalManualCallback287,adoptOriginalManualListener287} from './manualOAuthNative287.js'
export type {ManualCallback287} from './manualOAuthNative287.js'
/** Existing AP-owned qt: no duplicate auth client, callback table, host cache or credentials. */
export function getManualOAuthState287():ManualOAuthState287 {
 return getOutsideHookRuntime287().mcpState() as ManualOAuthState287
}
const original=createOriginalManualOAuthRegistry287({qt:getManualOAuthState287})
export const getOAuthCallbackSubmitter=original.getOAuthCallbackSubmitter
export const setActiveOAuthPromise=original.setActiveOAuthPromise
export const getActiveOAuthPromise=original.getActiveOAuthPromise
