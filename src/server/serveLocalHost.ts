/** Detached loopback owner for a supported interactive CLI launched before a
 * Web facade. This hosts the existing hub/canonical worker, not another query
 * implementation. Viewers may exit independently of an admitted turn. */
import { startServe } from './serve.js'
const service = startServe({ advertiseLocal: true })
let stopping = false
const stop = () => {
  if (stopping) return
  stopping = true
  clearInterval(idle)
  void service.close().then(() => process.exit(0))
}
let lastActive = Date.now()
const idle = setInterval(() => {
  if (service.hub.list().some(session => !session.closed)) lastActive = Date.now()
  else if (Date.now() - lastActive > 60_000) stop()
}, 5000)
process.once('SIGTERM', stop)
process.once('SIGINT', stop)
