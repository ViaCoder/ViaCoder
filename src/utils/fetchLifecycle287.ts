import {onSessionSwitch} from '../bootstrap/state.js'
import {getFetchRequestState286} from './officialFetchRequestState286/runtime.js'
import {createNativeFetchLifecycle287} from './officialFetchLifecycle287/native.js'

/** Original Fzo, subscribed at the successful init tail just as in native B. */
export const registerFetchLifecycle287 = createNativeFetchLifecycle287({
  Id: onSessionSwitch,
  Ls: getFetchRequestState286,
})
