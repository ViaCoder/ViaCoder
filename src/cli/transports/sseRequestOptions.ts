import {getProxyFetchOptions, shouldBypassProxy} from '../../utils/proxy.js'
import {getTLSFetchOptions} from '../../utils/mtls.js'

/** Official yi({url}): shared proxy/TLS policy, with URL-specific NO_PROXY.
 * Never set forAnthropicAPI here: its unix socket is NOT a session endpoint.
 * Keep this adaptation local; other proxy.ts consumers retain their contracts.
 */
export function getSSERequestOptions(url: string): ReturnType<typeof getProxyFetchOptions> {
  const options = getProxyFetchOptions()
  if (!shouldBypassProxy(url)) return options
  const {proxy: _proxy, dispatcher: _dispatcher, ...direct} = options
  return {...direct, ...getTLSFetchOptions()}
}
