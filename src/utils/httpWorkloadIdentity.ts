import { createHttpWif286 } from './officialHttpWif286/runtime.js'

// The raw official module owns host selection and accessor-level state.
const wif = createHttpWif286()

export const getWIFTokenCache = wif.getWIFTokenCache
export const getWIFCredentials = wif.getWIFCredentials
export const invalidateWIFToken = wif.invalidateWIFToken
export const isWIFTransientExchangeError = wif.isWIFTransientExchangeError
export const resetWIFCredentialState = wif.resetWIFCredentialState
export const getResolvedWIFBaseUrlSnapshot = wif.getResolvedWIFBaseUrlSnapshot

// Synchronous attribution readers share the accessor module's original host cells.
export {getWifAttribution286, getOAuthResetExecutionContext286} from './officialHttpWif286/runtime.js'
