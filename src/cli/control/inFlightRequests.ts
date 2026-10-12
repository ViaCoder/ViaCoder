import {createAbortController} from '../../utils/abortController.js'

/** Official TS (`mo`): request-id scoped cancellation for detached controls.
 * A replacement does not retire its predecessor; only the current owner may
 * remove the entry when it settles. The SDK's abort already rejects locally.
 */
export class InFlightSdkControlRequests {
  private readonly controllers = new Map<string, AbortController>()

  /** Original print mo; the restored control branch uses this same registry. */
  get source287(): Map<string, AbortController> { return this.controllers }

  start(requestId: string): AbortController {
    const controller = createAbortController()
    this.controllers.set(requestId, controller)
    return controller
  }

  cancel(requestId: string, reason: DOMException): boolean {
    const controller = this.controllers.get(requestId)
    controller?.abort(reason)
    return controller !== undefined
  }

  finish(requestId: string, controller: AbortController): void {
    if (this.controllers.get(requestId) === controller) {
      this.controllers.delete(requestId)
    }
  }
}
