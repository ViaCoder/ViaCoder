import { APP_SCOPED_UNAVAILABLE_REASON } from './appScopedHost.js'
export { APP_SCOPED_UNAVAILABLE_REASON } from './appScopedHost.js'
import { dgr, A4o } from '../../vendor/official-desktop/chunk-jyc7p4t5.js'
type ComputerExecutor = ReturnType<typeof dgr>

/** Official npm 2.1.283 executor, with only its imports/host adapted.
 * See official-desktop/host-provenance.json. Factory loads Swift lazily;
 * input binding remains lazy until the first keyboard/mouse call.
 * No native appScoped capability exists in this published CLI executor.
 */
export function createCliExecutor(options: {
  getMouseAnimationEnabled: () => boolean
  getHideBeforeActionEnabled: () => boolean
}): ComputerExecutor {
  if (process.platform !== 'darwin') {
    throw new Error(`createCliExecutor called on ${process.platform}. Computer control is macOS-only.`)
  }
  const executor = dgr(options)
  Object.defineProperty(executor, 'appScopedUnavailableReason', {value: APP_SCOPED_UNAVAILABLE_REASON})
  return executor
}

export async function unhideComputerUseApps(bundleIds: readonly string[]): Promise<void> {
  return A4o(bundleIds)
}
