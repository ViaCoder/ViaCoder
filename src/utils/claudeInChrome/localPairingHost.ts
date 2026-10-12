import { watch, readdirSync } from 'node:fs'
import type { FSWatcher } from 'node:fs'
import { dirname } from 'node:path'

export type LocalPairingOptions = {
  apiOrigin: string
  getBearer: () => Promise<string | undefined>
  fetchImpl: typeof fetch
  requiredOrg?: string
  onPairingState?: (state: Record<string, unknown>) => void
  // Loopback HTTP is for isolated attestation fixtures only, never inferred.
  allowLoopbackHttp?: boolean
}

/** Host wiring for official H0n/ft + I multiplexer. Crypto/verification/expiry
 * remain in the unmodified official module. No plaintext or bridge fallback.
 */
export function attachLocalPairingHost<T extends Record<string, any>>(
  context: T, options: LocalPairingOptions,
  sockets: { directory: string; paths: () => string[] },
) {
  const origin = new URL(options.apiOrigin)
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname)
  if ((origin.protocol !== 'https:' && !(options.allowLoopbackHttp === true && loopback && origin.protocol === 'http:')) ||
      origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('Local pairing needs a bare HTTPS API origin (explicit loopback fixture excepted)')
  }
  const {bridgeConfig: _bridge, ...nativeContext} = context
  return {
    ...nativeContext,
    getSocketPaths: sockets.paths,
    localPairing: {...options, apiOrigin: origin.origin},
    watchSocketPaths: (onChanged: () => void) => watchLocalPairingSockets(sockets.directory, onChanged),
  }
}

/** Watch only the native-host directory; never read browser profiles. Watching
 * the parent permits recovery when the first host creates the directory later.
 */
export function watchLocalPairingSockets(directory: string, onChanged: () => void): () => void {
  let closed = false
  let watcher: FSWatcher | undefined
  let timer: ReturnType<typeof setTimeout> | undefined
  const reconnect = () => {
    if (closed) return
    clearTimeout(timer)
    timer = setTimeout(() => { watcher?.close(); attach(); onChanged() }, 100)
    timer.unref?.()
  }
  const attach = () => {
    if (closed) return
    try { watcher = watch(directory, {persistent: false}, reconnect) }
    catch {
      try { watcher = watch(dirname(directory), {persistent: false}, reconnect) }
      catch { timer = setTimeout(attach, 1000); timer.unref?.(); return }
    }
    watcher.on('error', reconnect)
  }
  attach()
  // fs.watch may attach before a directory exists or lose a rename event.
  // A bounded local snapshot closes that gap (no browser/profile reads).
  const snapshot = () => { try { return JSON.stringify(readdirSync(directory).sort()) } catch { return null } }
  let previous = snapshot()
  const poll = setInterval(() => {
    const current = snapshot()
    if (current !== previous) { previous = current; reconnect() }
  }, 500)
  poll.unref?.()
  return () => { clearInterval(poll); closed = true; clearTimeout(timer); watcher?.close(); watcher = undefined }
}

/** Recreate the official client's context when credentials change. nt() caches
 * assertions by localPairing object identity, so disconnect alone is not enough.
 * This adapter checks before discovery/tool calls and never logs credentials.
 */
export function createIdentityBoundPairingClient(
  context: Record<string, any>, makeClient: (context: Record<string, any>) => any,
) {
  const options = context.localPairing as LocalPairingOptions
  let client: any, bearer: string | undefined, closed = false
  let notificationHandler: any
  let refreshing: Promise<any> | undefined
  async function refresh() {
    if (closed) throw Error('Local Chrome pairing client is closed')
    let next: string | undefined
    try { next = await options.getBearer() }
    catch { client?.disconnect(); client = undefined; bearer = undefined; throw Error('Local Chrome pairing disabled: identity unavailable') }
    if (closed) throw Error('Local Chrome pairing client is closed')
    if (next !== bearer || !client) {
      client?.disconnect(); client = undefined; bearer = next
      if (!next) return undefined
      const identity = next
      client = makeClient({...context, localPairing: {...options, getBearer: async () => {
        const current = await options.getBearer()
        if (current !== identity) throw Error('Identity changed during local pairing')
        return current
      }}})
      client.setNotificationHandler(notificationHandler)
      client.startProactivePairing?.()
    }
    return client
  }
  const current = () => refreshing ??= refresh().finally(() => { refreshing = undefined })
  return new Proxy({
    setNotificationHandler(handler: any) { notificationHandler = handler; client?.setNotificationHandler(handler) },
    async ensureConnected() { return (await current())?.ensureConnected() ?? false },
    async callTool(...args: any[]) {
      const active = await current()
      if (!active) throw Error('Local Chrome pairing disabled: not_signed_in')
      return active.callTool(...args)
    },
    async startProactivePairing() { await current() },
    disconnect() { closed = true; client?.disconnect(); client = undefined; bearer = undefined },
  }, {get(target, key, receiver) {
    if (key in target) return Reflect.get(target, key, receiver)
    const value = client?.[key]
    return typeof value === 'function' ? value.bind(client) : value
  }})
}
